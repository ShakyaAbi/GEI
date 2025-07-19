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

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY prisma/ ./prisma/
RUN npx prisma generate

# Copy backend source code
COPY backend/ ./backend/
COPY .env ./

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/dist ./backend/dist

# Copy uploads and scripts
COPY uploads/ ./uploads/
COPY scripts/ ./scripts/

EXPOSE 5000

WORKDIR /app/backend

# Run migrations and start the server
CMD ["sh", "-c", "npx prisma migrate deploy --schema=../prisma/schema.prisma && node server.js"]