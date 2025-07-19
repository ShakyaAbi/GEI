# 🐳 Docker Deployment Guide

This guide covers how to deploy the GEI Website using Docker containers for different environments.

## 📋 Prerequisites

- Docker installed on your system
- Docker Compose installed
- Git repository cloned locally

## 🚀 Quick Start

### 1. Development Environment

```bash
# Copy environment template
cp env.example docker.env.development

# Edit the environment file with your settings
nano docker.env.development

# Deploy using the script
./docker-deploy.sh development
```

### 2. Production Environment

```bash
# Copy environment template
cp env.example docker.env.production

# Edit the environment file with your production settings
nano docker.env.production

# Deploy using the script
./docker-deploy.sh production
```

### 3. Test Environment

```bash
# Copy environment template
cp env.example docker.env.test

# Edit the environment file with your test settings
nano docker.env.test

# Deploy using the script
./docker-deploy.sh test
```

## 📁 Environment Files

### `docker.env.development`
- Development environment configuration
- Uses localhost URLs
- Includes Prisma Studio access
- Less strict security settings

### `docker.env.production`
- Production environment configuration
- Uses HTTPS URLs
- Strict security settings
- Optimized for performance

### `docker.env.test`
- Testing environment configuration
- Separate database and ports
- Isolated from development/production

## 🏗️ Docker Compose Files

### `docker-compose.yml` (Development)
- Full stack with database
- Exposes all ports for debugging
- Includes Prisma Studio
- Volume mounts for hot reloading

### `docker-compose.prod.yml` (Production)
- Production-ready configuration
- Nginx reverse proxy
- SSL support
- Isolated database access
- Optimized for security

### `docker-compose.test.yml` (Testing)
- Isolated test environment
- Different ports to avoid conflicts
- Separate database
- No external dependencies

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development`, `production`, `test` |
| `PORT` | Application port | `5000` |
| `POSTGRES_DB` | Database name | `gei_dev`, `gei_prod` |
| `POSTGRES_USER` | Database user | `geiuser` |
| `POSTGRES_PASSWORD` | Database password | `secure-password` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `DOMAIN` | Domain for CORS | `https://yourdomain.com` |
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_USER` | SMTP username | `your-email@gmail.com` |
| `SMTP_PASS` | SMTP password | `your-app-password` |

### Database Configuration

The application uses PostgreSQL with the following default settings:

- **Development**: `gei_dev` database on port `5432`
- **Production**: `gei_prod` database on port `5432` (localhost only)
- **Test**: `gei_test` database on port `5433`

### Port Configuration

| Environment | Application | Database | Prisma Studio |
|-------------|-------------|----------|---------------|
| Development | `5000` | `5432` | `5555` |
| Production | `80/443` | `5432` | N/A |
| Test | `5001` | `5433` | N/A |

## 🚀 Deployment Commands

### Using the Deployment Script

```bash
# Development
./docker-deploy.sh development

# Production
./docker-deploy.sh production

# Test
./docker-deploy.sh test
```

### Manual Docker Commands

```bash
# Build and start
docker-compose -f docker-compose.yml up -d --build

# View logs
docker-compose -f docker-compose.yml logs -f

# Stop containers
docker-compose -f docker-compose.yml down

# Remove volumes
docker-compose -f docker-compose.yml down -v
```

## 🔍 Monitoring and Debugging

### View Logs

```bash
# All services
docker-compose -f docker-compose.yml logs -f

# Specific service
docker-compose -f docker-compose.yml logs -f app

# Database logs
docker-compose -f docker-compose.yml logs -f db
```

### Health Checks

```bash
# Check application health
curl http://localhost:5000/api/health

# Check container status
docker-compose -f docker-compose.yml ps

# Check database connection
docker-compose -f docker-compose.yml exec db pg_isready -U geiuser
```

### Database Operations

```bash
# Run migrations
docker-compose -f docker-compose.yml exec app npx prisma migrate deploy

# Seed database
docker-compose -f docker-compose.yml exec app node prisma/seed.js

# Open Prisma Studio
# Visit: http://localhost:5555
```

## 🔒 Security Considerations

### Production Security

1. **Strong Passwords**: Use strong, unique passwords for all services
2. **Environment Variables**: Never commit sensitive data to version control
3. **Network Isolation**: Production database only accessible from localhost
4. **SSL/TLS**: Always use HTTPS in production
5. **Regular Updates**: Keep Docker images and dependencies updated

### Environment File Security

```bash
# Add to .gitignore
echo "docker.env.*" >> .gitignore
echo ".env" >> .gitignore
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using the port
   sudo lsof -i :5000
   
   # Use different ports in environment file
   PORT=5001
   ```

2. **Database Connection Issues**
   ```bash
   # Check database container
   docker-compose -f docker-compose.yml logs db
   
   # Test connection
   docker-compose -f docker-compose.yml exec db pg_isready -U geiuser
   ```

3. **Permission Issues**
   ```bash
   # Fix upload directory permissions
   sudo chown -R 1000:1000 uploads/
   ```

4. **Memory Issues**
   ```bash
   # Increase Docker memory limit
   # In Docker Desktop: Settings > Resources > Memory
   ```

### Reset Everything

```bash
# Stop and remove everything
docker-compose -f docker-compose.yml down -v

# Remove all images
docker system prune -a

# Rebuild from scratch
./docker-deploy.sh development
```

## 📊 Performance Optimization

### Production Optimizations

1. **Multi-stage Build**: Dockerfile uses multi-stage build for smaller images
2. **Health Checks**: Built-in health checks for all services
3. **Resource Limits**: Configure memory and CPU limits
4. **Caching**: Optimized layer caching in Dockerfile
5. **Compression**: Gzip compression enabled in production

### Resource Configuration

```yaml
# Add to docker-compose.prod.yml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
        reservations:
          memory: 512M
          cpus: '0.25'
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Docker Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          echo "${{ secrets.DOCKER_ENV }}" > docker.env.production
          ./docker-deploy.sh production
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/) 