# ----------- FRONTEND BUILD STAGE -----------
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Install frontend dependencies and build
COPY package.json package-lock.json ./
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY tailwind.config.js postcss.config.js vite.config.ts ./
COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY .env ./
RUN npm install
RUN npm run build

# ----------- BACKEND BUILD STAGE -----------
FROM node:18-alpine AS backend-builder

WORKDIR /app

# Install PostgreSQL client tools for database health checks
RUN apk add --no-cache postgresql-client

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY prisma/ ./prisma/
# Generate Prisma client with proper environment
RUN npx prisma generate

# Copy backend source code
COPY backend/ ./backend/
COPY .env ./

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/dist ./backend/dist

# Copy uploads and scripts
COPY uploads/ ./uploads/
COPY scripts/ ./scripts/

# Copy entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Create logs directory
RUN mkdir -p logs

EXPOSE 5000

WORKDIR /app/backend

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Use the entrypoint script
ENTRYPOINT ["/app/docker-entrypoint.sh"]