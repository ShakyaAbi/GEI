#!/bin/bash
cd /root/GEI
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build --no-cache app
docker compose -f docker-compose.prod.yml up -d
echo "Backend rebuilt and restarted!"
