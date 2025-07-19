import { PrismaClient } from '@prisma/client';

// Create a singleton instance of the Prisma client with proper configuration
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
});

// Handle connection issues
prisma.$connect()
  .then(() => {
    console.log('✅ Prisma client connected to database');
  })
  .catch((error) => {
    console.error('❌ Failed to connect to database:', error);
    // Don't exit here, let the application handle the error
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;