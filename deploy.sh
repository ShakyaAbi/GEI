#!/bin/bash

# GEI Website Deployment Script
# Usage: ./deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
DOMAIN=${2:-yourdomain.com}

echo "🚀 Starting deployment for $ENVIRONMENT environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Create SSL directory if it doesn't exist
mkdir -p ssl

# Check if SSL certificates exist
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    print_warning "SSL certificates not found. Creating self-signed certificates for development..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ssl/key.pem \
        -out ssl/cert.pem \
        -subj "/C=US/ST=State/L=City/O=Organization/CN=$DOMAIN"
fi

# Load environment variables
if [ -f ".env" ]; then
    print_status "Loading environment variables..."
    export $(cat .env | grep -v '^#' | xargs)
else
    print_error ".env file not found. Please create one with your configuration."
    exit 1
fi

# Update domain in nginx.conf
print_status "Updating domain configuration..."
sed -i "s/yourdomain.com/$DOMAIN/g" nginx.conf

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans || true

# Remove old images to free up space
print_status "Cleaning up old Docker images..."
docker image prune -f

# Build and start containers
print_status "Building and starting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for database to be ready
print_status "Waiting for database to be ready..."
sleep 30

# Check if containers are running
print_status "Checking container status..."
docker-compose -f docker-compose.prod.yml ps

# Run database migrations
print_status "Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T app npx prisma migrate deploy

# Seed database if needed
if [ "$SEED_DATABASE" = "true" ]; then
    print_status "Seeding database..."
    docker-compose -f docker-compose.prod.yml exec -T app node prisma/seed.js
fi

# Health check
print_status "Performing health check..."
sleep 10
if curl -f http://localhost/api/health > /dev/null 2>&1; then
    print_status "✅ Application is healthy!"
else
    print_warning "⚠️  Health check failed. Check logs with: docker-compose -f docker-compose.prod.yml logs"
fi

print_status "🎉 Deployment completed successfully!"
print_status "Your website should be available at: https://$DOMAIN"
print_status "To view logs: docker-compose -f docker-compose.prod.yml logs -f"
print_status "To stop: docker-compose -f docker-compose.prod.yml down" 