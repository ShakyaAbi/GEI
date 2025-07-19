# GoDaddy DNS Configuration - Quick Reference

## 🎯 Quick Setup Steps

### 1. Get Your Server IP
```bash
# On your Hostinger server
curl -s ifconfig.me
```

### 2. GoDaddy DNS Configuration

1. **Login to GoDaddy**
   - Go to: https://godaddy.com
   - Click "Sign In"

2. **Access Domain Management**
   - Click "My Products" or "Domains"
   - Find your domain → Click "Manage"

3. **Access DNS Settings**
   - Click "DNS" or "Manage DNS"

4. **Add DNS Records**

#### **A Record (Root Domain)**
```
Type: A
Name: @ (or leave blank)
Value: YOUR_HOSTINGER_SERVER_IP
TTL: 600
```

#### **A Record (WWW)**
```
Type: A
Name: www
Value: YOUR_HOSTINGER_SERVER_IP
TTL: 600
```

### 3. Example Configuration
```
Type    Name    Value               TTL
A       @       123.456.789.012     600
A       www     123.456.789.012     600
```

## 🔧 On Your Hostinger Server

### Run Domain Setup Script
```bash
# SSH into your server
ssh root@your-server-ip

# Navigate to your application
cd /opt/gei-website

# Run domain setup (replace with your domain)
./setup-domain.sh yourdomain.com
```

### Manual Configuration (if needed)
```bash
# Update nginx configuration
sed -i "s/yourdomain.com/YOUR_ACTUAL_DOMAIN/g" nginx.conf

# Update environment variables
sed -i "s|VITE_API_URL=.*|VITE_API_URL=https://YOUR_ACTUAL_DOMAIN/api|g" .env

# Get SSL certificate
certbot certonly --standalone -d YOUR_ACTUAL_DOMAIN -d www.YOUR_ACTUAL_DOMAIN

# Redeploy
./deploy.sh production YOUR_ACTUAL_DOMAIN
```

## ⏱️ DNS Propagation Timeline

- **Local**: 5-30 minutes
- **Global**: 24-48 hours (usually much faster)

## 🔍 Check DNS Propagation

### Online Tools
- https://www.whatsmydns.net/
- https://dnschecker.org/
- https://toolbox.googleapps.com/apps/dig/

### Command Line
```bash
# Check from your local machine
nslookup yourdomain.com
dig yourdomain.com

# Check from different DNS servers
dig @8.8.8.8 yourdomain.com
dig @1.1.1.1 yourdomain.com
```

## 🧪 Test Your Domain

```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://yourdomain.com

# Test HTTPS
curl -I https://yourdomain.com

# Test www subdomain
curl -I https://www.yourdomain.com
```

## 🚨 Common Issues

### Domain Not Resolving
- ✅ Check DNS propagation
- ✅ Verify GoDaddy DNS settings
- ✅ Wait longer for propagation

### SSL Certificate Errors
- ✅ Ensure domain points to server IP
- ✅ Check nginx configuration
- ✅ Verify SSL certificate is valid

### Website Not Loading
- ✅ Check if application is running
- ✅ Verify firewall settings
- ✅ Check application logs

## 📞 Support Commands

```bash
# Check application status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check SSL certificate
certbot certificates

# Monitor domain
./monitor-domain.sh
```

## ✅ Success Checklist

- [ ] GoDaddy DNS records configured
- [ ] A records pointing to server IP
- [ ] DNS propagation completed
- [ ] SSL certificate installed
- [ ] Website accessible via HTTPS
- [ ] All features working
- [ ] Monitoring set up

## 🎉 Your Website URL

Once everything is configured:
- **https://yourdomain.com**
- **https://www.yourdomain.com** 