#!/bin/bash

# GEI Website Backup Script
# Usage: ./backup.sh [daily|weekly|monthly]

set -e

BACKUP_TYPE=${1:-daily}
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="gei_backup_${BACKUP_TYPE}_${DATE}"

echo "🔄 Starting backup: $BACKUP_NAME"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Database backup
print_status "Backing up database..."
docker-compose -f docker-compose.prod.yml exec -T db pg_dump -U geiuser gei > "$BACKUP_DIR/${BACKUP_NAME}_database.sql"

# Uploads backup
print_status "Backing up uploads..."
tar -czf "$BACKUP_DIR/${BACKUP_NAME}_uploads.tar.gz" -C uploads .

# Create backup manifest
cat > "$BACKUP_DIR/${BACKUP_NAME}_manifest.txt" << EOF
Backup Information
==================
Date: $(date)
Type: $BACKUP_TYPE
Database: ${BACKUP_NAME}_database.sql
Uploads: ${BACKUP_NAME}_uploads.tar.gz

Files:
- ${BACKUP_NAME}_database.sql
- ${BACKUP_NAME}_uploads.tar.gz
- ${BACKUP_NAME}_manifest.txt

To restore database:
docker-compose -f docker-compose.prod.yml exec -T db psql -U geiuser gei < ${BACKUP_NAME}_database.sql

To restore uploads:
tar -xzf ${BACKUP_NAME}_uploads.tar.gz -C uploads/
EOF

# Compress everything
print_status "Compressing backup..."
tar -czf "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" \
    -C "$BACKUP_DIR" \
    "${BACKUP_NAME}_database.sql" \
    "${BACKUP_NAME}_uploads.tar.gz" \
    "${BACKUP_NAME}_manifest.txt"

# Clean up individual files
rm "$BACKUP_DIR/${BACKUP_NAME}_database.sql"
rm "$BACKUP_DIR/${BACKUP_NAME}_uploads.tar.gz"
rm "$BACKUP_DIR/${BACKUP_NAME}_manifest.txt"

# Keep only recent backups (adjust retention as needed)
print_status "Cleaning up old backups..."

case $BACKUP_TYPE in
    daily)
        # Keep 7 daily backups
        find "$BACKUP_DIR" -name "gei_backup_daily_*.tar.gz" -mtime +7 -delete
        ;;
    weekly)
        # Keep 4 weekly backups
        find "$BACKUP_DIR" -name "gei_backup_weekly_*.tar.gz" -mtime +28 -delete
        ;;
    monthly)
        # Keep 12 monthly backups
        find "$BACKUP_DIR" -name "gei_backup_monthly_*.tar.gz" -mtime +365 -delete
        ;;
esac

print_status "✅ Backup completed: $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
print_status "Backup size: $(du -h "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" | cut -f1)" 