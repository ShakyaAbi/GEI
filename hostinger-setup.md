# Hostinger Server Setup Guide

## Step 1: Access Your Hostinger VPS/Cloud Server

1. **Login to Hostinger Control Panel**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Access Your VPS/Cloud Server**
   - Navigate to "VPS" or "Cloud" section
   - Find your server and click "Manage"
   - Use the provided SSH credentials to connect

3. **SSH Connection**
   ```bash
   ssh root@your-server-ip
   ```

## Step 2: Update System and Install Dependencies

```bash
# Update system packages
apt update && apt upgrade -y

# Install essential packages
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose (if not included)
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Add current user to docker group
usermod -aG docker $USER

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Install Nginx (optional, for additional reverse proxy)
apt install -y nginx

# Install Certbot for SSL certificates
apt install -y certbot python3-certbot-nginx
```

## Step 3: Configure Firewall

```bash
# Install UFW if not present
apt install -y ufw

# Allow SSH
ufw allow ssh

# Allow HTTP and HTTPS
ufw allow 80
ufw allow 443

# Allow your application port (if needed)
ufw allow 5000

# Enable firewall
ufw enable
```

## Step 4: Create Application Directory

```bash
# Create application directory
mkdir -p /opt/gei-website
cd /opt/gei-website

# Clone your repository (if using Git)
git clone https://github.com/yourusername/gei-website.git .

# Or upload files via SCP/SFTP
# scp -r ./your-project-files root@your-server-ip:/opt/gei-website/
```

## Step 5: Set Up SSL Certificate

```bash
# Stop nginx temporarily
systemctl stop nginx

# Get SSL certificate from Let's Encrypt
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates to application directory
mkdir -p /opt/gei-website/ssl
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/gei-website/ssl/cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/gei-website/ssl/key.pem

# Set proper permissions
chmod 600 /opt/gei-website/ssl/*
```

## Step 6: Configure Environment Variables

```bash
# Create production environment file
nano /opt/gei-website/.env
```

Add your production environment variables:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://geiuser:your-secure-password@db:5432/gei?schema=public
JWT_SECRET=your-super-secure-jwt-secret-key-here
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE=15728640
VITE_API_URL=https://yourdomain.com/api
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_RECEIVER=contact@yourdomain.com
DB_PASSWORD=your-secure-database-password
```

## Step 7: Deploy Application

```bash
# Make scripts executable
chmod +x deploy.sh backup.sh

# Deploy the application
./deploy.sh production yourdomain.com
```

## Step 8: Set Up Automatic SSL Renewal

```bash
# Create renewal script
cat > /opt/gei-website/renew-ssl.sh << 'EOF'
#!/bin/bash
certbot renew --quiet
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/gei-website/ssl/cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/gei-website/ssl/key.pem
chmod 600 /opt/gei-website/ssl/*
docker-compose -f /opt/gei-website/docker-compose.prod.yml restart nginx
EOF

chmod +x /opt/gei-website/renew-ssl.sh

# Add to crontab for automatic renewal
(crontab -l 2>/dev/null; echo "0 12 * * * /opt/gei-website/renew-ssl.sh") | crontab -
```

## Step 9: Set Up Automatic Backups

```bash
# Add backup to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * cd /opt/gei-website && ./backup.sh daily") | crontab -
(crontab -l 2>/dev/null; echo "0 3 * * 0 cd /opt/gei-website && ./backup.sh weekly") | crontab -
(crontab -l 2>/dev/null; echo "0 4 1 * * cd /opt/gei-website && ./backup.sh monthly") | crontab -
```

## Step 10: Monitor and Maintain

```bash
# View application logs
docker-compose -f docker-compose.prod.yml logs -f

# Check container status
docker-compose -f docker-compose.prod.yml ps

# Monitor system resources
htop

# Check disk usage
df -h

# Check Docker disk usage
docker system df
```

## Troubleshooting

### Common Issues:

1. **Port already in use:**
   ```bash
   netstat -tulpn | grep :80
   netstat -tulpn | grep :443
   ```

2. **Docker permission issues:**
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **SSL certificate issues:**
   ```bash
   certbot certificates
   certbot renew --dry-run
   ```

4. **Database connection issues:**
   ```bash
   docker-compose -f docker-compose.prod.yml logs db
   docker-compose -f docker-compose.prod.yml exec db psql -U geiuser -d gei
   ```

## Security Recommendations

1. **Change default passwords**
2. **Regular security updates**
3. **Monitor logs for suspicious activity**
4. **Use strong JWT secrets**
5. **Enable firewall rules**
6. **Regular backups**
7. **Monitor resource usage** 