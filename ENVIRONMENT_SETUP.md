# Environment Setup Guide

## 📁 Environment Files Overview

You have several environment files for different purposes:

### **For Testing (No SSL Required):**
- `env.test` - ✅ **Use this for testing**
- `.envss` - Your existing test configuration

### **For Production (With SSL):**
- `env.production` - Production configuration with HTTPS

## 🧪 Testing Environment Setup

### Option 1: Use the Test Environment File (Recommended)

```bash
# Copy the test environment file
cp env.test .env

# Or use it directly with the test script
./test-deploy.sh
```

### Option 2: Use Your Existing .envss File

```bash
# Rename your existing file
cp .envss .env

# Run test deployment
./test-deploy.sh
```

## ✅ Your Current Environment Files Analysis

### **env.test** (✅ Perfect for Testing)
```env
# ✅ HTTP API URL (no SSL required)
VITE_API_URL=http://localhost:5000/api

# ✅ Database configuration
DATABASE_URL=postgresql://geiuser:geipassword@db:5432/gei?schema=public

# ✅ JWT secret (secure)
JWT_SECRET=Qw3rty!9zXcVbN7mLpOiUjK1hGfDsA4eR

# ✅ All other configurations
```

### **env.production** (For Production with SSL)
```env
# 🔒 HTTPS API URL (requires SSL)
VITE_API_URL=https://yourdomain.com/api

# ✅ Same database and JWT configuration
```

## 🚀 Quick Test Setup

### 1. **Create .env file for testing:**
```bash
# Copy test environment
cp env.test .env
```

### 2. **Update SMTP settings (optional):**
```bash
# Edit the .env file
nano .env

# Update these lines with your email:
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=your-actual-app-password
SMTP_FROM=your-actual-email@gmail.com
CONTACT_RECEIVER=your-actual-contact@email.com
```

### 3. **Run test deployment:**
```bash
./test-deploy.sh
```

## 🔧 Environment File Comparison

| Setting | Testing | Production |
|---------|---------|------------|
| **VITE_API_URL** | `http://localhost:5000/api` | `https://yourdomain.com/api` |
| **SSL Required** | ❌ No | ✅ Yes |
| **Domain Required** | ❌ No | ✅ Yes |
| **Port** | 5000 | 80/443 |
| **Database** | ✅ Same | ✅ Same |
| **JWT** | ✅ Same | ✅ Same |

## 🎯 What You Need to Update

### **For Testing (Optional):**
- `SMTP_USER` - Your Gmail address
- `SMTP_PASS` - Your Gmail app password
- `SMTP_FROM` - Your sender email
- `CONTACT_RECEIVER` - Where contact forms send to

### **For Production (Required):**
- `VITE_API_URL` - Your domain with HTTPS
- `SMTP_*` - All email settings
- `JWT_SECRET` - Change to a more secure secret

## 🧪 Testing Without Email

If you don't want to set up email for testing:

```env
# Comment out or remove SMTP settings
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# SMTP_FROM=your-email@gmail.com
# CONTACT_RECEIVER=contact@gei.org
```

## 🔒 Security Notes

### **For Testing:**
- ✅ `JWT_SECRET` is fine for testing
- ✅ Database password is fine for testing
- ⚠️ Don't use real email passwords in test files

### **For Production:**
- 🔒 Change `JWT_SECRET` to a secure random string
- 🔒 Use strong database passwords
- 🔒 Use real email credentials
- 🔒 Never commit `.env` files to git

## 🚀 Quick Commands

### **Start Testing:**
```bash
cp env.test .env
./test-deploy.sh
```

### **Start Production:**
```bash
cp env.production .env
# Update domain in .env
./deploy.sh production yourdomain.com
```

### **Check Current Environment:**
```bash
# See what environment file is being used
ls -la .env*

# Check environment variables
cat .env
```

## ✅ Your Environment Files Are Perfect!

**For testing:** Your `env.test` file is ✅ **perfect** for testing without SSL!

**Key points:**
- ✅ HTTP API URL (no SSL required)
- ✅ All database settings correct
- ✅ JWT secret is secure
- ✅ Upload settings configured
- ✅ Ready for testing

**Just run:**
```bash
cp env.test .env
./test-deploy.sh
```

Your website will be available at `http://localhost:5000` for testing! 🎉 