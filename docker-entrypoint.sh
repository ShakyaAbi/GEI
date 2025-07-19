#!/bin/sh

# Docker entrypoint script for GEI Website
# Handles Prisma database connection and migration issues

set -e

echo "🚀 Starting GEI Website..."

# Function to wait for database
wait_for_database() {
    echo "⏳ Waiting for database to be ready..."
    
    # Extract database connection details from DATABASE_URL
    DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
    DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
    DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
    DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
    
    # Default values if parsing fails
    DB_HOST=${DB_HOST:-db}
    DB_PORT=${DB_PORT:-5432}
    DB_NAME=${DB_NAME:-gei}
    DB_USER=${DB_USER:-geiuser}
    
    echo "📊 Database connection: $DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"
    
    # Wait for database to be ready
    until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME"; do
        echo "⏳ Database not ready yet, waiting..."
        sleep 2
    done
    
    echo "✅ Database is ready!"
}

# Function to run Prisma migrations
run_migrations() {
    echo "🔄 Running Prisma migrations..."
    
    # Set proper working directory for Prisma
    cd /app
    
    # Generate Prisma client (in case it wasn't generated during build)
    echo "🔧 Generating Prisma client..."
    npx prisma generate
    
    # Run migrations
    echo "📦 Running database migrations..."
    npx prisma migrate deploy --schema=./prisma/schema.prisma
    
    echo "✅ Migrations completed!"
}

# Function to seed database (optional)
seed_database() {
    if [ "$SEED_DATABASE" = "true" ]; then
        echo "🌱 Seeding database..."
        cd /app
        node prisma/seed.js
        echo "✅ Database seeded!"
    fi
}

# Function to validate environment
validate_environment() {
    echo "🔍 Validating environment..."
    
    # Check required environment variables
    if [ -z "$DATABASE_URL" ]; then
        echo "❌ DATABASE_URL is not set"
        exit 1
    fi
    
    if [ -z "$JWT_SECRET" ]; then
        echo "❌ JWT_SECRET is not set"
        exit 1
    fi
    
    echo "✅ Environment validation passed!"
}

# Main execution
main() {
    echo "🔧 Initializing GEI Website..."
    
    # Validate environment
    validate_environment
    
    # Wait for database
    wait_for_database
    
    # Run migrations
    run_migrations
    
    # Seed database if requested
    seed_database
    
    # Change to backend directory
    cd /app/backend
    
    echo "🚀 Starting server..."
    exec node server.js
}

# Run main function
main "$@" 