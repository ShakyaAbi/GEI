#!/bin/bash

cd /root/GEI

echo "================================"
echo "🔄 Stopping containers..."
echo "================================"
docker compose -f docker-compose.prod.yml down

echo ""
echo "================================"
echo "🔨 Rebuilding (no cache)..."
echo "================================"
docker compose -f docker-compose.prod.yml build --no-cache app

echo ""
echo "================================"
echo "🚀 Starting containers..."
echo "================================"
docker compose -f docker-compose.prod.yml up -d

echo ""
echo "⏳ Waiting 10 seconds for services to start..."
sleep 10

echo ""
echo "================================"
echo "📊 Container Status:"
echo "================================"
docker compose -f docker-compose.prod.yml ps

echo ""
echo "================================"
echo "📋 Backend Logs (Last 50 lines):"
echo "================================"
docker logs gei-website-prod --tail=50

echo ""
echo "✅ Done!"
echo ""
echo "Quick log commands:"
echo "  backend: docker logs gei-website-prod --tail=50"
echo "  database: docker logs gei-db-prod --tail=50"
echo "  nginx:   docker logs gei-nginx --tail=50"