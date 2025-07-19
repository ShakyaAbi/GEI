# Testing Your Website Without SSL

## 🧪 Quick Test Setup (No SSL Required)

You can test your website locally or on your server without SSL certificates. This is perfect for development and initial testing.

## 🚀 Quick Start

### Option 1: Local Testing (Recommended for Development)

```bash
# Test locally first
./test-deploy.sh
```

This will:
- ✅ Start your application on `http://localhost:5000`
- ✅ No SSL certificate required
- ✅ Database and all features working
- ✅ Perfect for development and testing

### Option 2: Server Testing (No Domain Required)

```bash
# SSH into your Hostinger server
ssh root@your-server-ip

# Clone your repository
git clone https://github.com/ShakyaAbi/GEI.git /opt/gei-website
cd /opt/gei-website

# Run test deployment
./test-deploy.sh
```

Your website will be available at:
- **http://your-server-ip:5000**

## 🔍 What You Can Test Without SSL

### ✅ **All Features Work:**
- Website frontend
- API endpoints
- Database operations
- File uploads
- User authentication
- Contact forms
- All pages and functionality

### ✅ **Access Methods:**
- **Local:** `http://localhost:5000`
- **Server IP:** `http://your-server-ip:5000`
- **API:** `http://localhost:5000/api`

## 🛠️ Testing Commands

### Start Testing Environment
```bash
# Start test deployment
./test-deploy.sh

# Or manually
docker-compose -f docker-compose.test.yml up -d
```

### Check Status
```bash
# View running containers
docker-compose -f docker-compose.test.yml ps

# View logs
docker-compose -f docker-compose.test.yml logs -f

# Health check
curl http://localhost:5000/api/health
```

### Stop Testing Environment
```bash
# Stop containers
docker-compose -f docker-compose.test.yml down
```

## 🌐 Testing Your Website

### 1. **Open Your Browser**
- Go to: `http://localhost:5000` (local) or `http://your-server-ip:5000` (server)

### 2. **Test All Features**
- ✅ Homepage loads
- ✅ Navigation works
- ✅ All pages accessible
- ✅ Contact forms work
- ✅ File uploads work
- ✅ Admin login works
- ✅ Database operations work

### 3. **Test API Endpoints**
```bash
# Health check
curl http://localhost:5000/api/health

# Publications
curl http://localhost:5000/api/publications

# Program areas
curl http://localhost:5000/api/program-areas
```

## 🔧 Configuration Differences

### Test Configuration (`docker-compose.test.yml`)
- ✅ **No nginx** (direct app access)
- ✅ **No SSL** (HTTP only)
- ✅ **Port 5000** exposed directly
- ✅ **Simpler setup** for testing

### Production Configuration (`docker-compose.prod.yml`)
- ✅ **Nginx reverse proxy**
- ✅ **SSL certificates**
- ✅ **Port 80/443** (standard web ports)
- ✅ **Full production setup**

## 📊 When to Use Each Setup

### Use Test Setup When:
- 🧪 **Development and testing**
- 🔧 **Debugging issues**
- 🚀 **Quick deployment**
- 💻 **Local development**
- 🧪 **Feature testing**

### Use Production Setup When:
- 🌐 **Going live with domain**
- 🔒 **Need HTTPS security**
- 📈 **Production deployment**
- 🌍 **Public access**
- 🔐 **SSL certificate required**

## 🚨 Important Notes

### Security Considerations
- ⚠️ **HTTP is not secure** - data transmitted in plain text
- ⚠️ **Not suitable for production** with sensitive data
- ⚠️ **Use only for testing** and development

### Browser Warnings
- Modern browsers may show "Not Secure" warnings
- This is normal for HTTP connections
- Ignore these warnings for testing purposes

## 🔄 Switching to Production

When you're ready to go live:

1. **Set up your domain** (GoDaddy + Hostinger)
2. **Use production deployment:**
   ```bash
   ./deploy.sh production yourdomain.com
   ```
3. **SSL will be automatically configured**

## 🎯 Testing Checklist

- [ ] Website loads on `http://localhost:5000`
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Contact forms functional
- [ ] File uploads work
- [ ] Admin login works
- [ ] Database operations successful
- [ ] API endpoints responding
- [ ] No critical errors in logs

## 🆘 Troubleshooting

### Common Issues:

1. **Port 5000 already in use:**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :5000
   
   # Kill the process or change port in docker-compose.test.yml
   ```

2. **Database connection issues:**
   ```bash
   # Check database logs
   docker-compose -f docker-compose.test.yml logs db
   
   # Check if database is ready
   docker-compose -f docker-compose.test.yml exec db pg_isready -U geiuser -d gei
   ```

3. **Application not starting:**
   ```bash
   # Check application logs
   docker-compose -f docker-compose.test.yml logs app
   
   # Check container status
   docker-compose -f docker-compose.test.yml ps
   ```

## 🎉 Success!

Once testing is complete:
- ✅ Your website works correctly
- ✅ All features are functional
- ✅ Ready for production deployment
- ✅ Can proceed with domain and SSL setup

**Next step:** When ready for production, follow the `DEPLOYMENT_GUIDE.md` for full SSL setup with your domain! 