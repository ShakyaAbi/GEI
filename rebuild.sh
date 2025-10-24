#!/bin/bash
echo "🔄 Stopping containers..."
docker-compose -f docker-compose.prod.yml down

echo "🗑️  Removing old build..."
rm -rf frontend/dist

echo "🔨 Rebuilding (no cache)..."
docker-compose -f docker-compose.prod.yml build --no-cache app

echo "🚀 Starting containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "📋 Checking logs..."
docker-compose -f docker-compose.prod.yml logs app --tail=20

echo "✅ Done! Clear your browser cache with Ctrl+Shift+R"