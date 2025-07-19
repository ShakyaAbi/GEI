#!/bin/bash

# Docker Deployment Script for GEI Website
# Usage: ./docker-deploy.sh [development|production|test]

set -e

ENVIRONMENT=${1:-development}

echo "🐳 Starting Docker deployment for $ENVIRONMENT environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
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

# Set environment file based on environment
ENV_FILE="docker.env.$ENVIRONMENT"
COMPOSE_FILE="docker-compose.yml"

case $ENVIRONMENT in
    "development")
        COMPOSE_FILE="docker-compose.yml"
        print_status "Using development configuration"
        ;;
    "production")
        COMPOSE_FILE="docker-compose.prod.yml"
        print_status "Using production configuration"
        ;;
    "test")
        COMPOSE_FILE="docker-compose.test.yml"
        print_status "Using test configuration"
        ;;
    *)
        print_error "Invalid environment. Use: development, production, or test"
        exit 1
        ;;
esac

# Check if environment file exists
if [ ! -f "$ENV_FILE" ]; then
    print_warning "Environment file $ENV_FILE not found. Creating from template..."
    cp env.example "$ENV_FILE"
    print_warning "Please edit $ENV_FILE with your configuration before continuing."
    exit 1
fi

# Load environment variables
print_step "Loading environment variables from $ENV_FILE..."
export $(cat "$ENV_FILE" | grep -v '^#' | xargs)

# Stop existing containers
print_step "Stopping existing containers..."
docker-compose -f "$COMPOSE_FILE" down --remove-orphans || true

# Remove old images to free up space
print_step "Cleaning up old Docker images..."
docker image prune -f

# Build and start containers
print_step "Building and starting containers..."
docker-compose -f "$COMPOSE_FILE" up -d --build

# Wait for database to be ready
print_step "Waiting for database to be ready..."
sleep 30

# Check if containers are running
print_step "Checking container status..."
docker-compose -f "$COMPOSE_FILE" ps

# Run database migrations
print_step "Running database migrations..."
docker-compose -f "$COMPOSE_FILE" exec -T app npx prisma migrate deploy

# Seed database if needed (only for development)
if [ "$ENVIRONMENT" = "development" ] && [ "$SEED_DATABASE" = "true" ]; then
    print_step "Seeding database..."
    docker-compose -f "$COMPOSE_FILE" exec -T app node prisma/seed.js
fi

# Health check
print_step "Performing health check..."
sleep 10

# Get the correct port for health check
case $ENVIRONMENT in
    "development")
        HEALTH_URL="http://localhost:5000/api/health"
        ;;
    "production")
        HEALTH_URL="http://localhost/api/health"
        ;;
    "test")
        HEALTH_URL="http://localhost:5001/api/health"
        ;;
esac

if curl -f "$HEALTH_URL" > /dev/null 2>&1; then
    print_status "✅ Application is healthy!"
else
    print_warning "⚠️  Health check failed. Check logs with: docker-compose -f $COMPOSE_FILE logs"
fi

# Display access information
print_step "Deployment completed!"
case $ENVIRONMENT in
    "development")
        print_status "🌐 Development server: http://localhost:5000"
        print_status "📊 Prisma Studio: http://localhost:5555"
        ;;
    "production")
        print_status "🌐 Production server: https://yourdomain.com"
        ;;
    "test")
        print_status "🧪 Test server: http://localhost:5001"
        ;;
esac

print_status "📋 To view logs: docker-compose -f $COMPOSE_FILE logs -f"
print_status "🛑 To stop: docker-compose -f $COMPOSE_FILE down" 