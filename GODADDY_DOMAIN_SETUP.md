# Complete Guide: Connecting GoDaddy Domain to Hostinger Server

## 🎯 Overview

This guide will walk you through connecting your GoDaddy domain to your Hostinger server. We'll cover DNS configuration, domain pointing, and verification.

## 📋 Prerequisites

- GoDaddy domain (active and paid)
- Hostinger VPS/Cloud server with public IP
- SSH access to your Hostinger server
- Your website deployed on Hostinger (following the previous deployment guide)

## 🔍 Step 1: Get Your Hostinger Server Information

### 1.1 Find Your Server IP Address

1. **Login to Hostinger Control Panel**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Get Server IP**
   - Navigate to "VPS" or "Cloud" section
   - Click on your server
   - Note down the **Public IP Address**

3. **Verify Server is Running**
   ```bash
   # SSH into your server
   ssh root@your-server-ip
   
   # Check if your application is running
   docker-compose -f docker-compose.prod.yml ps
   
   # Test if the server responds
   curl -I http://localhost
   ```

### 1.2 Test Your Server Locally

```bash
# Test HTTP (port 80)
curl -I http://your-server-ip

# Test HTTPS (port 443) - might fail without SSL
curl -I https://your-server-ip
```

## 🌐 Step 2: Configure GoDaddy DNS Settings

### 2.1 Access GoDaddy Domain Manager

1. **Login to GoDaddy**
   - Go to https://godaddy.com
   - Click "Sign In" and enter your credentials

2. **Access Domain Management**
   - Click "My Products" or "Domains"
   - Find your domain and click "Manage"

3. **Access DNS Settings**
   - In the domain management page, look for "DNS" or "Manage DNS"
   - Click on "DNS" or "Manage DNS"

### 2.2 Configure DNS Records

You'll need to add/modify these DNS records:

#### **A Record (Main Domain)**
```
Type: A
Name: @ (or leave blank)
Value: YOUR_HOSTINGER_SERVER_IP
TTL: 600 (or 1 hour)
```

#### **A Record (WWW Subdomain)**
```
Type: A
Name: www
Value: YOUR_HOSTINGER_SERVER_IP
TTL: 600 (or 1 hour)
```

#### **CNAME Record (Optional - for www)**
```
Type: CNAME
Name: www
Value: yourdomain.com
TTL: 600 (or 1 hour)
```

### 2.3 Step-by-Step DNS Configuration

1. **Add A Record for Root Domain**
   - Click "Add" or "+" to add a new record
   - Select "A" as the record type
   - Leave the "Name" field blank or enter "@"
   - Enter your Hostinger server IP in the "Value" field
   - Set TTL to 600 seconds (1 hour)
   - Click "Save"

2. **Add A Record for WWW**
   - Click "Add" again
   - Select "A" as the record type
   - Enter "www" in the "Name" field
   - Enter your Hostinger server IP in the "Value" field
   - Set TTL to 600 seconds
   - Click "Save"

3. **Remove Conflicting Records**
   - Look for any existing A or CNAME records for "@" or "www"
   - Delete or modify them to point to your Hostinger IP

### 2.4 Example DNS Configuration

Here's what your DNS records should look like:

```
Type    Name    Value               TTL
A       @       123.456.789.012     600
A       www     123.456.789.012     600
```

## 🔧 Step 3: Update Your Application Configuration

### 3.1 Update Nginx Configuration

SSH into your Hostinger server and update the nginx configuration:

```bash
# SSH into your server
ssh root@your-server-ip

# Navigate to your application directory
cd /opt/gei-website

# Edit nginx configuration
nano nginx.conf
```

Replace `yourdomain.com` with your actual GoDaddy domain:

```nginx
# In the server blocks, replace:
server_name yourdomain.com www.yourdomain.com;

# With your actual domain:
server_name your-actual-domain.com www.your-actual-domain.com;
```

### 3.2 Update Environment Variables

```bash
# Edit your environment file
nano .env
```

Update these variables:
```env
VITE_API_URL=https://your-actual-domain.com/api
SMTP_FROM=your-email@your-actual-domain.com
CONTACT_RECEIVER=contact@your-actual-domain.com
```

### 3.3 Update SSL Certificate

```bash
# Stop nginx temporarily
docker-compose -f docker-compose.prod.yml stop nginx

# Get new SSL certificate for your domain
certbot certonly --standalone -d your-actual-domain.com -d www.your-actual-domain.com

# Copy new certificates
cp /etc/letsencrypt/live/your-actual-domain.com/fullchain.pem ssl/cert.pem
cp /etc/letsencrypt/live/your-actual-domain.com/privkey.pem ssl/key.pem
chmod 600 ssl/*

# Restart nginx
docker-compose -f docker-compose.prod.yml start nginx
```

## ⏱️ Step 4: Wait for DNS Propagation

DNS changes can take time to propagate globally:

- **Local propagation**: 5-30 minutes
- **Global propagation**: 24-48 hours (usually much faster)

### 4.1 Check DNS Propagation

You can check propagation using these tools:

1. **Online DNS Checkers:**
   - https://www.whatsmydns.net/
   - https://dnschecker.org/
   - https://toolbox.googleapps.com/apps/dig/

2. **Command Line Check:**
   ```bash
   # Check from your local machine
   nslookup yourdomain.com
   dig yourdomain.com
   
   # Check from different locations
   dig @8.8.8.8 yourdomain.com
   dig @1.1.1.1 yourdomain.com
   ```

### 4.2 Test Domain Connection

```bash
# Test HTTP
curl -I http://yourdomain.com

# Test HTTPS (after SSL is configured)
curl -I https://yourdomain.com

# Test www subdomain
curl -I http://www.yourdomain.com
curl -I https://www.yourdomain.com
```

## 🔒 Step 5: Configure SSL Certificate

### 5.1 Update SSL Renewal Script

```bash
# Edit the SSL renewal script
nano renew-ssl.sh
```

Update the domain name:
```bash
#!/bin/bash
certbot renew --quiet
cp /etc/letsencrypt/live/your-actual-domain.com/fullchain.pem /opt/gei-website/ssl/cert.pem
cp /etc/letsencrypt/live/your-actual-domain.com/privkey.pem /opt/gei-website/ssl/key.pem
chmod 600 /opt/gei-website/ssl/*
docker-compose -f /opt/gei-website/docker-compose.prod.yml restart nginx
```

### 5.2 Redeploy Application

```bash
# Redeploy with new domain configuration
./deploy.sh production your-actual-domain.com
```

## 🧪 Step 6: Verify Everything Works

### 6.1 Test Your Website

1. **Open your browser and visit:**
   - `http://yourdomain.com` (should redirect to HTTPS)
   - `https://yourdomain.com`
   - `http://www.yourdomain.com` (should redirect to HTTPS)
   - `https://www.yourdomain.com`

2. **Check for:**
   - ✅ Website loads correctly
   - ✅ HTTPS redirect works
   - ✅ SSL certificate is valid
   - ✅ All pages and features work
   - ✅ Contact forms work
   - ✅ File uploads work

### 6.2 Test API Endpoints

```bash
# Test API health endpoint
curl https://yourdomain.com/api/health

# Test other API endpoints
curl https://yourdomain.com/api/publications
```

### 6.3 Check SSL Certificate

```bash
# Check certificate details
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Or use online tools:
# https://www.ssllabs.com/ssltest/
```

## 🔧 Step 7: Advanced Configuration (Optional)

### 7.1 Set Up Email (MX Records)

If you want to use your domain for email:

1. **Add MX Record in GoDaddy:**
   ```
   Type: MX
   Name: @
   Value: mail.yourdomain.com (or your email provider)
   Priority: 10
   TTL: 3600
   ```

2. **Add TXT Record for SPF:**
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.google.com ~all
   TTL: 3600
   ```

### 7.2 Set Up Subdomains

For additional subdomains (like `api.yourdomain.com`):

1. **Add A Record:**
   ```
   Type: A
   Name: api
   Value: YOUR_HOSTINGER_SERVER_IP
   TTL: 600
   ```

2. **Update nginx.conf to handle subdomain**

### 7.3 Configure CDN (Optional)

For better performance, consider using Cloudflare:

1. **Sign up for Cloudflare**
2. **Add your domain to Cloudflare**
3. **Update nameservers in GoDaddy to Cloudflare nameservers**
4. **Configure DNS records in Cloudflare**

## 🚨 Troubleshooting

### Common Issues:

1. **Domain not resolving:**
   ```bash
   # Check DNS propagation
   nslookup yourdomain.com
   dig yourdomain.com
   
   # Wait longer for propagation
   # Check GoDaddy DNS settings
   ```

2. **SSL certificate errors:**
   ```bash
   # Check certificate
   certbot certificates
   
   # Renew certificate
   certbot renew
   
   # Check nginx configuration
   docker-compose -f docker-compose.prod.yml logs nginx
   ```

3. **Website not loading:**
   ```bash
   # Check if application is running
   docker-compose -f docker-compose.prod.yml ps
   
   # Check logs
   docker-compose -f docker-compose.prod.yml logs
   
   # Check firewall
   ufw status
   ```

4. **HTTPS redirect not working:**
   - Check nginx configuration
   - Verify SSL certificate is valid
   - Check if port 443 is open

### DNS Propagation Check Commands:

```bash
# Check from multiple DNS servers
dig @8.8.8.8 yourdomain.com
dig @1.1.1.1 yourdomain.com
dig @208.67.222.222 yourdomain.com

# Check specific record types
dig A yourdomain.com
dig AAAA yourdomain.com
dig CNAME www.yourdomain.com
```

## 📊 Monitoring Your Domain

### 7.1 Set Up Domain Monitoring

```bash
# Create a simple monitoring script
cat > monitor-domain.sh << 'EOF'
#!/bin/bash
DOMAIN="yourdomain.com"
LOG_FILE="/opt/gei-website/domain-monitor.log"

echo "$(date): Checking $DOMAIN" >> $LOG_FILE

# Check HTTP
if curl -f -s http://$DOMAIN > /dev/null; then
    echo "$(date): HTTP OK" >> $LOG_FILE
else
    echo "$(date): HTTP FAILED" >> $LOG_FILE
fi

# Check HTTPS
if curl -f -s https://$DOMAIN > /dev/null; then
    echo "$(date): HTTPS OK" >> $LOG_FILE
else
    echo "$(date): HTTPS FAILED" >> $LOG_FILE
fi
EOF

chmod +x monitor-domain.sh

# Add to crontab for monitoring
(crontab -l 2>/dev/null; echo "*/5 * * * * /opt/gei-website/monitor-domain.sh") | crontab -
```

### 7.2 SSL Certificate Monitoring

```bash
# Check SSL certificate expiration
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

## ✅ Final Checklist

- [ ] GoDaddy DNS records configured correctly
- [ ] A records pointing to Hostinger server IP
- [ ] DNS propagation completed
- [ ] SSL certificate installed and valid
- [ ] Website accessible via HTTPS
- [ ] All features working correctly
- [ ] Email configuration (if needed)
- [ ] Monitoring set up
- [ ] Backup procedures working

## 🎉 Success!

Your GoDaddy domain is now connected to your Hostinger server! Your website should be accessible at:

- **https://yourdomain.com**
- **https://www.yourdomain.com**

## 📞 Support

If you encounter issues:

1. **Check DNS propagation** using online tools
2. **Verify GoDaddy DNS settings** are correct
3. **Check Hostinger server** is running properly
4. **Review logs** for any errors
5. **Contact support** if needed

Remember: DNS changes can take time to propagate globally, so be patient if it doesn't work immediately! 