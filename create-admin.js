import bcrypt from 'bcryptjs';
import prisma from './prisma/client.js';

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@geiglobal.org',
        password: hashedPassword,
        name: 'Administrator'
      }
    });
    console.log('Admin created successfully:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
