#!/bin/bash

# GEI Website Docker Setup Script
echo "🚀 Setting up GEI Website with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install it and try again."
    exit 1
fi

echo "📦 Building and starting containers..."
docker-compose up -d --build

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "🗄️ Running database migrations..."
docker-compose exec app npx prisma migrate deploy

echo "🌱 Seeding database..."
docker-compose exec app node prisma/seed.js

echo "✅ Setup complete!"
echo ""
echo "🌐 Your GEI website is now running at: http://localhost:5000"
echo "📊 Database is accessible at: localhost:5432"
echo ""
echo "📝 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart services: docker-compose restart"
echo "  - Access app container: docker-compose exec app sh"
echo "  - Access database: docker-compose exec db psql -U geiuser -d gei" 