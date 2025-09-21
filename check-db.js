// Simple test to check vectorDocument table
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Checking vectorDocument table...');
    
    // Count documents
    const count = await prisma.vectorDocument.count();
    console.log('Count:', count);
    
    // Get first few documents
    const docs = await prisma.vectorDocument.findMany({
      take: 3,
      select: {
        id: true,
        content: true,
        createdAt: true,
      }
    });
    console.log('Sample docs:', docs);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Database error:', error);
    await prisma.$disconnect();
  }
}

checkDatabase();