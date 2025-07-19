#!/bin/bash

# GoDaddy Domain Setup Script for Hostinger
# Usage: ./setup-domain.sh yourdomain.com

set -e

DOMAIN=${1:-""}

if [ -z "$DOMAIN" ]; then
    echo "❌ Error: Please provide your domain name"
    echo "Usage: ./setup-domain.sh yourdomain.com"
    exit 1
fi

echo "🌐 Setting up domain: $DOMAIN"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Get server IP
SERVER_IP=$(curl -s ifconfig.me)
print_status "Server IP: $SERVER_IP"

print_step "1. Updating nginx configuration..."
# Update nginx.conf with new domain
sed -i "s/yourdomain.com/$DOMAIN/g" nginx.conf
print_status "✅ Nginx configuration updated"

print_step "2. Updating environment variables..."
# Update .env file
if [ -f ".env" ]; then
    sed -i "s|VITE_API_URL=.*|VITE_API_URL=https://$DOMAIN/api|g" .env
    sed -i "s|SMTP_FROM=.*|SMTP_FROM=your-email@$DOMAIN|g" .env
    sed -i "s|CONTACT_RECEIVER=.*|CONTACT_RECEIVER=contact@$DOMAIN|g" .env
    print_status "✅ Environment variables updated"
else
    print_warning "⚠️  .env file not found. Please update manually."
fi

print_step "3. Stopping nginx for SSL certificate..."
# Stop nginx to free port 80 for certbot
docker-compose -f docker-compose.prod.yml stop nginx || true

print_step "4. Obtaining SSL certificate..."
# Get SSL certificate
if certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN; then
    print_status "✅ SSL certificate obtained"
else
    print_error "❌ Failed to obtain SSL certificate"
    print_warning "Make sure your domain DNS is pointing to this server IP: $SERVER_IP"
    exit 1
fi

print_step "5. Copying SSL certificates..."
# Create ssl directory if it doesn't exist
mkdir -p ssl

# Copy certificates
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/cert.pem
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/key.pem
chmod 600 ssl/*
print_status "✅ SSL certificates copied"

print_step "6. Updating SSL renewal script..."
# Create/update SSL renewal script
cat > renew-ssl.sh << EOF
#!/bin/bash
certbot renew --quiet
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /opt/gei-website/ssl/cert.pem
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /opt/gei-website/ssl/key.pem
chmod 600 /opt/gei-website/ssl/*
docker-compose -f /opt/gei-website/docker-compose.prod.yml restart nginx
EOF

chmod +x renew-ssl.sh
print_status "✅ SSL renewal script updated"

print_step "7. Redeploying application..."
# Redeploy with new domain
./deploy.sh production $DOMAIN
print_status "✅ Application redeployed"

print_step "8. Testing domain..."
# Wait a moment for services to start
sleep 10

# Test domain
if curl -f -s https://$DOMAIN > /dev/null; then
    print_status "✅ Domain is accessible via HTTPS"
else
    print_warning "⚠️  Domain not accessible yet. DNS propagation may take time."
fi

print_step "9. Setting up monitoring..."
# Create domain monitoring script
cat > monitor-domain.sh << EOF
#!/bin/bash
DOMAIN="$DOMAIN"
LOG_FILE="/opt/gei-website/domain-monitor.log"

echo "\$(date): Checking \$DOMAIN" >> \$LOG_FILE

# Check HTTP
if curl -f -s http://\$DOMAIN > /dev/null; then
    echo "\$(date): HTTP OK" >> \$LOG_FILE
else
    echo "\$(date): HTTP FAILED" >> \$LOG_FILE
fi

# Check HTTPS
if curl -f -s https://\$DOMAIN > /dev/null; then
    echo "\$(date): HTTPS OK" >> \$LOG_FILE
else
    echo "\$(date): HTTPS FAILED" >> \$LOG_FILE
fi
EOF

chmod +x monitor-domain.sh

# Add monitoring to crontab
(crontab -l 2>/dev/null; echo "*/5 * * * * /opt/gei-website/monitor-domain.sh") | crontab -
print_status "✅ Domain monitoring set up"

print_step "10. DNS Configuration Instructions..."
echo ""
echo "🌐 GoDaddy DNS Configuration Required:"
echo "======================================"
echo "1. Login to GoDaddy: https://godaddy.com"
echo "2. Go to 'My Products' > 'Domains'"
echo "3. Click 'Manage' on your domain: $DOMAIN"
echo "4. Click 'DNS' or 'Manage DNS'"
echo "5. Add these DNS records:"
echo ""
echo "   Type: A"
echo "   Name: @ (or leave blank)"
echo "   Value: $SERVER_IP"
echo "   TTL: 600"
echo ""
echo "   Type: A"
echo "   Name: www"
echo "   Value: $SERVER_IP"
echo "   TTL: 600"
echo ""
echo "6. Remove any conflicting A or CNAME records"
echo ""
echo "⏱️  DNS propagation can take 5-30 minutes"
echo "🔍 Check propagation: https://www.whatsmydns.net/"
echo ""

print_status "🎉 Domain setup completed!"
print_status "Your website will be available at: https://$DOMAIN"
print_status "Monitor logs: docker-compose -f docker-compose.prod.yml logs -f"
print_status "Check domain status: ./monitor-domain.sh" 