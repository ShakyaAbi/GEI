import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gei.org' },
    update: {},
    create: {
      email: 'admin@gei.org',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin'
    }
  });
  console.log('Created admin user:', admin.email);

  // Create research categories
  const categories = [
    { name: 'Artificial Intelligence', slug: 'ai', description: 'Machine learning, neural networks, and cognitive computing systems' },
    { name: 'Quantum Computing', slug: 'quantum', description: 'Quantum algorithms, quantum information processing, and quantum technologies' },
    { name: 'Climate Science', slug: 'climate', description: 'Environmental monitoring, climate modeling, and sustainability research' },
    { name: 'Robotics', slug: 'robotics', description: 'Autonomous systems, human-robot interaction, and robotic applications' },
    { name: 'Biotechnology', slug: 'biotech', description: 'Genetic engineering, synthetic biology, and biomedical applications' },
    { name: 'Energy Systems', slug: 'energy', description: 'Renewable energy, energy storage, and smart grid technologies' }
  ];

  for (const category of categories) {
    await prisma.researchCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
  }
  console.log(`Created ${categories.length} research categories`);

  // Create authors
  const authors = [
    { name: 'Dr. Sarah Chen', email: 'sarah.chen@gei.edu', affiliation: 'GEI Research Center', bio: 'Director & Principal Investigator specializing in AI and machine learning' },
    { name: 'Dr. Michael Rodriguez', email: 'michael.rodriguez@gei.edu', affiliation: 'GEI Research Center', bio: 'Senior Research Scientist in quantum computing and information theory' },
    { name: 'Dr. Emma Thompson', email: 'emma.thompson@gei.edu', affiliation: 'GEI Research Center', bio: 'Associate Director focusing on climate science and environmental modeling' },
    { name: 'Dr. James Wilson', email: 'james.wilson@gei.edu', affiliation: 'GEI Research Center', bio: 'Principal Investigator in robotics and autonomous systems' },
    { name: 'Dr. Lisa Park', email: 'lisa.park@gei.edu', affiliation: 'GEI Research Center', bio: 'Research Scientist in biotechnology and genetic engineering' },
    { name: 'Dr. David Kumar', email: 'david.kumar@gei.edu', affiliation: 'GEI Research Center', bio: 'Senior Researcher in energy systems and renewable technologies' }
  ];

  for (const author of authors) {
    await prisma.author.upsert({
      where: { email: author.email },
      update: {},
      create: author
    });
  }
  console.log(`Created ${authors.length} authors`);

  // Create program areas
  const programAreas = [
    {
      name: 'Climate Action',
      slug: 'climate-action',
      description: 'Building climate resilience in vulnerable communities through innovative adaptation strategies, sustainable practices, and community-centered solutions that protect lives and livelihoods.',
      seoTitle: 'Climate Action Programs | GEI',
      seoDescription: 'Discover our comprehensive climate action initiatives that help communities adapt to climate change and build resilience for the future.',
      orderIndex: 1
    },
    {
      name: 'Water & Sanitation',
      slug: 'water-sanitation',
      description: 'Ensuring access to clean water and sustainable sanitation systems for underserved communities through innovative technologies and community-centered approaches.',
      seoTitle: 'Water & Sanitation Programs | GEI',
      seoDescription: 'Learn about our water and sanitation programs that provide clean water access and improve health outcomes in communities worldwide.',
      orderIndex: 2
    },
    {
      name: 'Renewable Energy',
      slug: 'renewable-energy',
      description: 'Developing sustainable energy solutions that reduce carbon emissions and provide reliable power access to remote and underserved communities.',
      seoTitle: 'Renewable Energy Programs | GEI',
      seoDescription: 'Explore our renewable energy initiatives that bring clean, sustainable power to communities while protecting the environment.',
      orderIndex: 3
    },
    {
      name: 'Forest Conservation',
      slug: 'forest-conservation',
      description: 'Protecting and restoring forest ecosystems through community-based conservation, sustainable forestry practices, and biodiversity preservation.',
      seoTitle: 'Forest Conservation Programs | GEI',
      seoDescription: 'Discover our forest conservation efforts that protect biodiversity and support sustainable livelihoods in forest communities.',
      orderIndex: 4
    }
  ];

  for (const area of programAreas) {
    await prisma.programArea.upsert({
      where: { slug: area.slug },
      update: {},
      create: area
    });
  }
  console.log(`Created ${programAreas.length} program areas`);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });