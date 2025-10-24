#!/bin/sh
set -e

# Run Prisma migrations
npx prisma migrate deploy

# Start the server
exec node server.js #!/bin/sh
set -e

echo "Starting GEI application..."

# Wait for database to be ready
echo "Waiting for database..."
while ! pg_isready -h db -p 5432 -U geiuser; do
  echo "Database not ready, waiting..."
  sleep 2
done

echo "Database is ready!"

# Run Prisma migrations
echo "Running migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Seed database (optional, only on first run)
# npx prisma db seed

echo "Starting server..."
# Start the server
exec node server.js