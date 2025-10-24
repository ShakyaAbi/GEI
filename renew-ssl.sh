#!/bin/bash
echo "Starting SSL certificate renewal..."
docker-compose -f /root/GEI/docker-compose.prod.yml stop nginx
certbot renew --quiet --standalone
cp /etc/letsencrypt/live/geiglobal.org/fullchain.pem /root/GEI/ssl/cert.pem
cp /etc/letsencrypt/live/geiglobal.org/privkey.pem /root/GEI/ssl/key.pem
chmod 644 /root/GEI/ssl/cert.pem
chmod 600 /root/GEI/ssl/key.pem
docker-compose -f /root/GEI/docker-compose.prod.yml up -d nginx
echo "SSL certificate renewal completed!"
