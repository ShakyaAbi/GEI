
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting GEI seed...');

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
      {
        name: 'Artificial Intelligence for Public Health',
        slug: 'ai-public-health',
        description: 'Leveraging AI and machine learning to advance healthcare delivery, disease surveillance, and community-level insights.'
      },
      {
        name: 'Quantum Technology & Systems',
        slug: 'quantum-tech',
        description: 'Emerging quantum applications for global development, including secure communications and environmental modeling.'
      },
      {
        name: 'Climate and Planetary Health',
        slug: 'climate-planetary-health',
        description: 'Cross-cutting climate research on adaptation, mitigation, air quality, and ecological resilience.'
      },
      {
        name: 'Human-Centered Robotics',
        slug: 'human-robotics',
        description: 'Autonomous systems for environmental monitoring, health logistics, and disaster response.'
      },
      {
        name: 'Biotechnology & Genomics',
        slug: 'biotech-genomics',
        description: 'Equitable innovations in genetic research, diagnostics, and biosystems for underserved populations.'
      },
      {
        name: 'Sustainable Energy & Smart Grids',
        slug: 'sustainable-energy',
        description: 'Renewable energy research, smart grid systems, and low-carbon community solutions.'
      }
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
      {
        name: 'Dr. Sarah Chen',
        email: 'sarah.chen@gei.edu',
        affiliation: 'GEI Behavioral Science & AI Lab',
        bio: 'Leads the application of artificial intelligence in behavior-driven health and development research.'
      },
      {
        name: 'Dr. Michael Rodriguez',
        email: 'michael.rodriguez@gei.edu',
        affiliation: 'GEI Quantum Systems Research Hub',
        bio: 'Expert in computational physics and quantum systems for low-resource innovations.'
      },
      {
        name: 'Dr. Emma Thompson',
        email: 'emma.thompson@gei.edu',
        affiliation: 'GEI Climate Resilience Center',
        bio: 'Designs community-based climate monitoring and early warning systems in high-altitude regions.'
      },
      {
        name: 'Dr. James Wilson',
        email: 'james.wilson@gei.edu',
        affiliation: 'GEI Robotics & Diagnostics Lab',
        bio: 'Focuses on robotics for maternal-child health delivery and logistics in remote geographies.'
      },
      {
        name: 'Dr. Lisa Park',
        email: 'lisa.park@gei.edu',
        affiliation: 'GEI Life Sciences Division',
        bio: 'Biotechnologist working on nutritional genomics and maternal health diagnostics.'
      },
      {
        name: 'Dr. David Kumar',
        email: 'david.kumar@gei.edu',
        affiliation: 'GEI Renewable Energy Division',
        bio: 'Develops low-cost solar and biomass solutions for off-grid communities.'
      }
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
        name: 'Climate Resilience & Action',
        slug: 'climate-resilience',
        description: 'Accelerating climate adaptation and disaster preparedness for vulnerable communities through ecosystem restoration, resilient infrastructure, and risk data integration.',
        seoTitle: 'Climate Resilience & Action | GEI Programs',
        seoDescription: 'Explore GEI’s community-driven climate resilience programs that tackle the frontlines of climate vulnerability through innovation and inclusion.',
        orderIndex: 1
      },
      {
        name: 'Water, Sanitation & Hygiene (WASH)',
        slug: 'wash',
        description: 'Deploying community-led and tech-enabled solutions to ensure universal access to clean water and improved sanitation in underserved and high-altitude regions.',
        seoTitle: 'WASH Programs | GEI',
        seoDescription: 'Discover GEI’s pioneering WASH initiatives that address water quality, sanitation infrastructure, and hygiene behavior change.',
        orderIndex: 2
      },
      {
        name: 'Renewable Energy & Green Innovation',
        slug: 'green-energy',
        description: 'Empowering remote areas with sustainable energy through decentralized solar mini-grids, clean cookstoves, and training local green technicians.',
        seoTitle: 'Renewable Energy for Development | GEI',
        seoDescription: 'Learn how GEI transforms energy access through inclusive and clean energy innovations.',
        orderIndex: 3
      },
      {
        name: 'Forest and Ecosystem Conservation',
        slug: 'ecosystem-conservation',
        description: 'Preserving critical biodiversity through traditional land-use practices, reforestation, permaculture, and indigenous-led forest governance.',
        seoTitle: 'Community Forest & Ecosystem Conservation | GEI',
        seoDescription: 'GEI integrates community forestry, ecological restoration, and conservation education to preserve vital ecosystems.',
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
  } catch (error) {
    console.error('Error during GEI seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
