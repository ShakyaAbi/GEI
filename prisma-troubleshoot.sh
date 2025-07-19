#!/bin/bash

# Prisma Troubleshooting Script for GEI Website
# Usage: ./prisma-troubleshoot.sh [development|production|test]

set -e

ENVIRONMENT=${1:-development}

echo "🔧 Prisma Troubleshooting for $ENVIRONMENT environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check if Docker containers are running
check_containers() {
    print_step "Checking Docker containers..."
    
    case $ENVIRONMENT in
        "development")
            if ! docker ps | grep -q "gei-db"; then
                print_error "Database container is not running"
                return 1
            fi
            if ! docker ps | grep -q "gei-website"; then
                print_error "Application container is not running"
                return 1
            fi
            ;;
        "production")
            if ! docker ps | grep -q "gei-db-prod"; then
                print_error "Production database container is not running"
                return 1
            fi
            if ! docker ps | grep -q "gei-website-prod"; then
                print_error "Production application container is not running"
                return 1
            fi
            ;;
        "test")
            if ! docker ps | grep -q "gei-db-test"; then
                print_error "Test database container is not running"
                return 1
            fi
            if ! docker ps | grep -q "gei-website-test"; then
                print_error "Test application container is not running"
                return 1
            fi
            ;;
    esac
    
    print_status "All containers are running"
}

# Function to check database connection
check_database() {
    print_step "Checking database connection..."
    
    case $ENVIRONMENT in
        "development")
            if docker exec gei-db pg_isready -U geiuser -d gei; then
                print_status "Database connection is healthy"
            else
                print_error "Database connection failed"
                return 1
            fi
            ;;
        "production")
            if docker exec gei-db-prod pg_isready -U geiuser -d gei; then
                print_status "Database connection is healthy"
            else
                print_error "Database connection failed"
                return 1
            fi
            ;;
        "test")
            if docker exec gei-db-test pg_isready -U geiuser -d gei_test; then
                print_status "Database connection is healthy"
            else
                print_error "Database connection failed"
                return 1
            fi
            ;;
    esac
}

# Function to check Prisma client
check_prisma_client() {
    print_step "Checking Prisma client..."
    
    case $ENVIRONMENT in
        "development")
            CONTAINER="gei-website"
            ;;
        "production")
            CONTAINER="gei-website-prod"
            ;;
        "test")
            CONTAINER="gei-website-test"
            ;;
    esac
    
    if docker exec $CONTAINER test -f /app/node_modules/.prisma/client/index.js; then
        print_status "Prisma client is generated"
    else
        print_warning "Prisma client not found, regenerating..."
        docker exec $CONTAINER npx prisma generate
    fi
}

# Function to check migrations
check_migrations() {
    print_step "Checking database migrations..."
    
    case $ENVIRONMENT in
        "development")
            CONTAINER="gei-website"
            ;;
        "production")
            CONTAINER="gei-website-prod"
            ;;
        "test")
            CONTAINER="gei-website-test"
            ;;
    esac
    
    # Check if migrations table exists
    if docker exec $CONTAINER npx prisma migrate status --schema=../prisma/schema.prisma; then
        print_status "Migrations are up to date"
    else
        print_warning "Migration issues detected, attempting to fix..."
        docker exec $CONTAINER npx prisma migrate deploy --schema=../prisma/schema.prisma
    fi
}

# Function to reset Prisma
reset_prisma() {
    print_step "Resetting Prisma..."
    
    case $ENVIRONMENT in
        "development")
            CONTAINER="gei-website"
            ;;
        "production")
            CONTAINER="gei-website-prod"
            ;;
        "test")
            CONTAINER="gei-website-test"
            ;;
    esac
    
    print_warning "This will reset the Prisma client and regenerate it"
    read -p "Continue? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker exec $CONTAINER rm -rf /app/node_modules/.prisma
        docker exec $CONTAINER npx prisma generate
        print_status "Prisma client reset complete"
    else
        print_status "Reset cancelled"
    fi
}

# Function to check environment variables
check_environment() {
    print_step "Checking environment variables..."
    
    case $ENVIRONMENT in
        "development")
            CONTAINER="gei-website"
            ;;
        "production")
            CONTAINER="gei-website-prod"
            ;;
        "test")
            CONTAINER="gei-website-test"
            ;;
    esac
    
    # Check key environment variables
    DATABASE_URL=$(docker exec $CONTAINER printenv DATABASE_URL)
    JWT_SECRET=$(docker exec $CONTAINER printenv JWT_SECRET)
    NODE_ENV=$(docker exec $CONTAINER printenv NODE_ENV)
    
    if [ -z "$DATABASE_URL" ]; then
        print_error "DATABASE_URL is not set"
        return 1
    else
        print_status "DATABASE_URL is set"
    fi
    
    if [ -z "$JWT_SECRET" ]; then
        print_error "JWT_SECRET is not set"
        return 1
    else
        print_status "JWT_SECRET is set"
    fi
    
    print_status "NODE_ENV is set to: $NODE_ENV"
}

# Function to show logs
show_logs() {
    print_step "Showing recent logs..."
    
    case $ENVIRONMENT in
        "development")
            docker logs --tail=50 gei-website
            ;;
        "production")
            docker logs --tail=50 gei-website-prod
            ;;
        "test")
            docker logs --tail=50 gei-website-test
            ;;
    esac
}

# Main troubleshooting function
main() {
    print_step "Starting Prisma troubleshooting..."
    
    # Check containers
    if ! check_containers; then
        print_error "Container check failed. Please start the containers first."
        exit 1
    fi
    
    # Check environment variables
    if ! check_environment; then
        print_error "Environment check failed."
        exit 1
    fi
    
    # Check database connection
    if ! check_database; then
        print_error "Database check failed."
        exit 1
    fi
    
    # Check Prisma client
    check_prisma_client
    
    # Check migrations
    check_migrations
    
    print_status "Troubleshooting complete!"
    
    # Show menu for additional actions
    echo
    print_step "Additional actions:"
    echo "1. Show recent logs"
    echo "2. Reset Prisma client"
    echo "3. Exit"
    
    read -p "Choose an option (1-3): " choice
    
    case $choice in
        1)
            show_logs
            ;;
        2)
            reset_prisma
            ;;
        3)
            print_status "Exiting..."
            ;;
        *)
            print_error "Invalid option"
            ;;
    esac
}

# Run main function
main "$@" 