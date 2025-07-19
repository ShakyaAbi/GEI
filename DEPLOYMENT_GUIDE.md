# Complete Website Deployment Guide - Hostinger with Docker

## 🚀 Quick Start Checklist

- [ ] Hostinger VPS/Cloud hosting plan
- [ ] Domain name (optional but recommended)
- [ ] SSH access to server
- [ ] Git repository (optional)

## 📋 Pre-Deployment Steps

### 1. Prepare Your Application

1. **Update Environment Variables**
   - Copy `env.production` to `.env` and update with your values
   - Replace `yourdomain.com` with your actual domain
   - Set secure passwords for database and JWT

2. **Update Domain Configuration**
   - Replace `yourdomain.com` in `nginx.conf` with your domain
   - Update `VITE_API_URL` in environment variables

3. **Test Locally**
   ```bash
   # Test the production build locally
   docker-compose -f docker-compose.prod.yml up --build
   ```

## 🖥️ Server Setup on Hostinger

### Step 1: Access Your Server

1. **Login to Hostinger Control Panel**
   - Go to https://hpanel.hostinger.com
   - Navigate to VPS/Cloud section
   - Click "Manage" on your server

2. **Connect via SSH**
   ```bash
   ssh root@your-server-ip
   ```

### Step 2: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install additional tools
apt install -y curl wget git unzip certbot python3-certbot-nginx ufw

# Configure firewall
ufw allow ssh
ufw allow 80
ufw allow 443
ufw enable
```

### Step 3: Upload Your Application

**Option A: Using Git (Recommended)**
```bash
mkdir -p /opt/gei-website
cd /opt/gei-website
git clone https://github.com/yourusername/gei-website.git .
```

**Option B: Using SCP**
```bash
# From your local machine
scp -r ./your-project-files root@your-server-ip:/opt/gei-website/
```

### Step 4: Configure SSL Certificate

```bash
cd /opt/gei-website

# Get SSL certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates
mkdir -p ssl
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
chmod 600 ssl/*
```

### Step 5: Set Environment Variables

```bash
# Create production environment file
nano .env
```

Add your production configuration:
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

### Step 6: Deploy Application

```bash
# Make scripts executable
chmod +x deploy.sh backup.sh

# Deploy
./deploy.sh production yourdomain.com
```

## 🔧 Post-Deployment Configuration

### 1. Set Up Automatic SSL Renewal

```bash
# Create renewal script
cat > renew-ssl.sh << 'EOF'
#!/bin/bash
certbot renew --quiet
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/gei-website/ssl/cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/gei-website/ssl/key.pem
chmod 600 /opt/gei-website/ssl/*
docker-compose -f /opt/gei-website/docker-compose.prod.yml restart nginx
EOF

chmod +x renew-ssl.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "0 12 * * * /opt/gei-website/renew-ssl.sh") | crontab -
```

### 2. Set Up Automatic Backups

```bash
# Add backup schedules
(crontab -l 2>/dev/null; echo "0 2 * * * cd /opt/gei-website && ./backup.sh daily") | crontab -
(crontab -l 2>/dev/null; echo "0 3 * * 0 cd /opt/gei-website && ./backup.sh weekly") | crontab -
(crontab -l 2>/dev/null; echo "0 4 1 * * cd /opt/gei-website && ./backup.sh monthly") | crontab -
```

### 3. Monitor Your Application

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check status
docker-compose -f docker-compose.prod.yml ps

# Monitor resources
htop
df -h
docker system df
```

## 🛠️ Management Commands

### Application Management

```bash
# Start application
docker-compose -f docker-compose.prod.yml up -d

# Stop application
docker-compose -f docker-compose.prod.yml down

# Restart application
docker-compose -f docker-compose.prod.yml restart

# View logs
docker-compose -f docker-compose.prod.yml logs -f app

# Update application
git pull
./deploy.sh production yourdomain.com
```

### Database Management

```bash
# Access database
docker-compose -f docker-compose.prod.yml exec db psql -U geiuser -d gei

# Run migrations
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

# Seed database
docker-compose -f docker-compose.prod.yml exec app node prisma/seed.js

# Backup database
./backup.sh daily
```

### SSL Certificate Management

```bash
# Check certificate status
certbot certificates

# Test renewal
certbot renew --dry-run

# Manual renewal
./renew-ssl.sh
```

## 🔍 Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   # Check logs
   docker-compose -f docker-compose.prod.yml logs
   
   # Check container status
   docker-compose -f docker-compose.prod.yml ps
   ```

2. **Database connection issues**
   ```bash
   # Check database logs
   docker-compose -f docker-compose.prod.yml logs db
   
   # Test database connection
   docker-compose -f docker-compose.prod.yml exec db pg_isready -U geiuser -d gei
   ```

3. **SSL certificate issues**
   ```bash
   # Check certificate
   certbot certificates
   
   # Renew certificate
   certbot renew
   ```

4. **Port conflicts**
   ```bash
   # Check what's using ports
   netstat -tulpn | grep :80
   netstat -tulpn | grep :443
   ```

### Performance Optimization

1. **Enable Docker build cache**
   ```bash
   docker-compose -f docker-compose.prod.yml build --no-cache
   ```

2. **Clean up Docker resources**
   ```bash
   docker system prune -a
   docker volume prune
   ```

3. **Monitor resource usage**
   ```bash
   docker stats
   htop
   ```

## 🔒 Security Checklist

- [ ] Changed default database passwords
- [ ] Set strong JWT secret
- [ ] Enabled firewall (UFW)
- [ ] SSL certificate installed
- [ ] Regular backups configured
- [ ] Automatic security updates enabled
- [ ] Log monitoring set up

## 📊 Monitoring and Maintenance

### Daily Tasks
- Check application logs for errors
- Monitor disk space usage
- Verify backups are running

### Weekly Tasks
- Review security logs
- Update system packages
- Check SSL certificate status

### Monthly Tasks
- Review backup retention
- Update application dependencies
- Performance analysis

## 🆘 Support

If you encounter issues:

1. Check the logs: `docker-compose -f docker-compose.prod.yml logs`
2. Verify configuration files
3. Test connectivity: `curl -I https://yourdomain.com`
4. Check system resources: `htop`, `df -h`

## 📝 Notes

- Keep your `.env` file secure and never commit it to version control
- Regularly update your application and dependencies
- Monitor your server's resource usage
- Set up proper logging and monitoring
- Test your backup and restore procedures regularly

Your website should now be live at `https://yourdomain.com`! 🎉 