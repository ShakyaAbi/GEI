#!/bin/bash

# GEI Website Test Deployment Script (No SSL)
# Usage: ./test-deploy.sh

set -e

echo "🧪 Starting test deployment (no SSL required)..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Load environment variables
if [ -f "env.test" ]; then
    print_status "Loading test environment variables..."
    export $(cat env.test | grep -v '^#' | xargs)
elif [ -f ".env" ]; then
    print_status "Loading environment variables..."
    export $(cat .env | grep -v '^#' | xargs)
else
    print_warning "No environment file found. Using default values for testing."
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose -f docker-compose.test.yml down --remove-orphans || true

# Remove old images to free up space
print_status "Cleaning up old Docker images..."
docker image prune -f

# Build and start containers
print_status "Building and starting containers..."
docker-compose -f docker-compose.test.yml up -d --build

# Wait for database to be ready
print_status "Waiting for database to be ready..."
sleep 30

# Check if containers are running
print_status "Checking container status..."
docker-compose -f docker-compose.test.yml ps

# Run database migrations
print_status "Running database migrations..."
docker-compose -f docker-compose.test.yml exec -T app npx prisma migrate deploy

# Seed database if needed
if [ "$SEED_DATABASE" = "true" ]; then
    print_status "Seeding database..."
    docker-compose -f docker-compose.test.yml exec -T app node prisma/seed.js
fi

# Health check
print_status "Performing health check..."
sleep 10
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    print_status "✅ Application is healthy!"
else
    print_warning "⚠️  Health check failed. Check logs with: docker-compose -f docker-compose.test.yml logs"
fi

print_status "🎉 Test deployment completed successfully!"
print_status "Your website is available at: http://localhost:5000"
print_status "API endpoints: http://localhost:5000/api"
print_status "To view logs: docker-compose -f docker-compose.test.yml logs -f"
print_status "To stop: docker-compose -f docker-compose.test.yml down"
print_status ""
print_warning "⚠️  This is HTTP only - no SSL certificate required for testing!"
print_warning "⚠️  For production, use the full deployment with SSL." 