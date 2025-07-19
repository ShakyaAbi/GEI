# 🔧 Prisma Docker Troubleshooting Guide

This guide covers common Prisma issues when running in Docker containers and how to fix them.

## 🚨 Common Prisma Docker Issues

### 1. **Database Connection Issues**

**Symptoms:**
- `P1001: Can't reach database server`
- `Connection refused`
- `ECONNREFUSED`

**Causes:**
- Database container not ready
- Wrong database URL
- Network connectivity issues
- Database not accepting connections

**Solutions:**
```bash
# Check if database container is running
docker ps | grep postgres

# Check database logs
docker logs gei-db

# Test database connection
docker exec gei-db pg_isready -U geiuser -d gei

# Use the troubleshooting script
./prisma-troubleshoot.sh development
```

### 2. **Prisma Client Generation Issues**

**Symptoms:**
- `Cannot find module '@prisma/client'`
- `Prisma Client is not generated`
- `Schema not found`

**Causes:**
- Client not generated during build
- Wrong working directory
- Missing schema file

**Solutions:**
```bash
# Regenerate Prisma client
docker exec gei-website npx prisma generate

# Check if client exists
docker exec gei-website ls -la /app/node_modules/.prisma/client/

# Reset Prisma client completely
docker exec gei-website rm -rf /app/node_modules/.prisma
docker exec gei-website npx prisma generate
```

### 3. **Migration Issues**

**Symptoms:**
- `Migration failed`
- `Database schema is out of sync`
- `Table already exists`

**Causes:**
- Migrations run before database is ready
- Schema mismatch
- Concurrent migration attempts

**Solutions:**
```bash
# Check migration status
docker exec gei-website npx prisma migrate status --schema=../prisma/schema.prisma

# Run migrations manually
docker exec gei-website npx prisma migrate deploy --schema=../prisma/schema.prisma

# Reset database (WARNING: This will delete all data)
docker exec gei-website npx prisma migrate reset --schema=../prisma/schema.prisma
```

### 4. **Environment Variable Issues**

**Symptoms:**
- `DATABASE_URL is not set`
- `Invalid database URL`
- `Connection string malformed`

**Causes:**
- Environment variables not loaded
- Wrong variable names
- Missing .env file

**Solutions:**
```bash
# Check environment variables
docker exec gei-website printenv | grep -E "(DATABASE_URL|JWT_SECRET|NODE_ENV)"

# Verify .env file is copied
docker exec gei-website ls -la /app/.env

# Check Docker Compose environment
docker-compose config
```

### 5. **Permission Issues**

**Symptoms:**
- `Permission denied`
- `Cannot write to directory`
- `Access denied`

**Causes:**
- File ownership issues
- Volume mount permissions
- Container user permissions

**Solutions:**
```bash
# Fix upload directory permissions
sudo chown -R 1000:1000 uploads/

# Check container user
docker exec gei-website whoami

# Fix volume permissions
docker exec gei-website chown -R node:node /app/uploads
```

## 🛠️ Troubleshooting Tools

### 1. **Automated Troubleshooting Script**

```bash
# Run comprehensive troubleshooting
./prisma-troubleshoot.sh development

# For production
./prisma-troubleshoot.sh production

# For test environment
./prisma-troubleshoot.sh test
```

### 2. **Manual Debugging Commands**

```bash
# Check container status
docker ps

# View application logs
docker logs gei-website

# View database logs
docker logs gei-db

# Execute commands in container
docker exec -it gei-website sh

# Check Prisma client
docker exec gei-website npx prisma --version
```

### 3. **Database Debugging**

```bash
# Connect to database
docker exec -it gei-db psql -U geiuser -d gei

# List tables
\dt

# Check migrations table
SELECT * FROM "_prisma_migrations";

# Test connection
docker exec gei-db pg_isready -U geiuser -d gei
```

## 🔄 Reset Procedures

### 1. **Complete Reset (Development)**

```bash
# Stop all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Remove images
docker system prune -a

# Rebuild and start
./docker-deploy.sh development
```

### 2. **Prisma Client Reset**

```bash
# Remove Prisma client
docker exec gei-website rm -rf /app/node_modules/.prisma

# Regenerate client
docker exec gei-website npx prisma generate

# Restart application
docker restart gei-website
```

### 3. **Database Reset**

```bash
# Reset database (WARNING: Deletes all data)
docker exec gei-website npx prisma migrate reset --schema=../prisma/schema.prisma

# Or recreate database container
docker-compose down
docker volume rm project_postgres_data
docker-compose up -d
```

## 📋 Pre-deployment Checklist

Before deploying, ensure:

- [ ] Database container is running and healthy
- [ ] Environment variables are properly set
- [ ] Prisma client is generated
- [ ] Migrations are up to date
- [ ] Upload directory has proper permissions
- [ ] Network connectivity is working

## 🔍 Debugging Steps

### Step 1: Check Container Status
```bash
docker ps
```

### Step 2: Check Environment Variables
```bash
docker exec gei-website printenv | grep -E "(DATABASE_URL|JWT_SECRET|NODE_ENV)"
```

### Step 3: Check Database Connection
```bash
docker exec gei-db pg_isready -U geiuser -d gei
```

### Step 4: Check Prisma Client
```bash
docker exec gei-website ls -la /app/node_modules/.prisma/client/
```

### Step 5: Check Migrations
```bash
docker exec gei-website npx prisma migrate status --schema=../prisma/schema.prisma
```

### Step 6: Check Application Logs
```bash
docker logs gei-website --tail=50
```

## 🚀 Quick Fixes

### Fix 1: Database Connection
```bash
# Restart database container
docker restart gei-db

# Wait for it to be ready
docker exec gei-db pg_isready -U geiuser -d gei
```

### Fix 2: Prisma Client
```bash
# Regenerate client
docker exec gei-website npx prisma generate

# Restart application
docker restart gei-website
```

### Fix 3: Migrations
```bash
# Run migrations
docker exec gei-website npx prisma migrate deploy --schema=../prisma/schema.prisma
```

### Fix 4: Environment Variables
```bash
# Restart with proper environment
docker-compose down
docker-compose up -d
```

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the logs**: `docker logs gei-website`
2. **Run troubleshooting**: `./prisma-troubleshoot.sh development`
3. **Check this guide** for specific error messages
4. **Verify your environment** matches the examples

## 🔗 Useful Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/) 