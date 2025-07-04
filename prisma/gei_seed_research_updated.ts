
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
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

    // Updated research categories
    const categories = [
      {
        name: 'Digital Health & Artificial Intelligence',
        slug: 'digital-health-ai',
        description: 'Harnessing AI and digital tools to strengthen health systems, improve service delivery, and personalize care in low-resource settings.'
      },
      {
        name: 'Climate Science & Planetary Health',
        slug: 'climate-science-planetary-health',
        description: 'Investigating the intersection of environmental degradation, climate change, and human health to inform policy and adaptive solutions.'
      },
      {
        name: 'Green Technologies & Energy Innovation',
        slug: 'green-tech-energy',
        description: 'Designing and deploying sustainable technologies such as solar energy, water purification, and eco-waste systems for community development.'
      },
      {
        name: 'Maternal, Newborn & Child Health',
        slug: 'mnch',
        description: 'Advancing equitable and respectful healthcare for mothers and children through systems strengthening, innovation, and outreach.'
      },
      {
        name: 'Nutrition, Anemia & Micronutrient Research',
        slug: 'nutrition-anemia',
        description: 'Addressing malnutrition and iron deficiency through diagnostics, supplementation strategies, and food-based solutions.'
      },
      {
        name: 'Behavioral Science & Social Innovation',
        slug: 'behavioral-science',
        description: 'Applying behavioral insights and human-centered design to drive sustainable health, nutrition, and climate-related behavior change.'
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

    // Sample publication
    const sampleCategory = await prisma.researchCategory.findFirst({
      where: { slug: 'climate-science-planetary-health' }
    });

    const sampleAuthors = await Promise.all([
      prisma.author.upsert({
        where: { email: 'aisha.green@gei.edu' },
        update: {},
        create: {
          name: 'Dr. Aisha Green',
          email: 'aisha.green@gei.edu',
          affiliation: 'GEI Climate Research Division',
          bio: 'Leads studies on health vulnerability mapping and environmental adaptation across South Asia.'
        }
      }),
      prisma.author.upsert({
        where: { email: 'jonas.mei@gei.edu' },
        update: {},
        create: {
          name: 'Dr. Jonas Mei',
          email: 'jonas.mei@gei.edu',
          affiliation: 'GEI Environmental Analytics Lab',
          bio: 'Expert in geospatial data analytics and predictive modeling for planetary health research.'
        }
      })
    ]);

    const publication = await prisma.publication.create({
      data: {
        title: 'Forecasting Climate Health Risk Hotspots in the Himalayan Region',
        abstract: 'Using geospatial datasets and health systems mapping, this study identifies emerging risk zones for heat-related illnesses, malnutrition, and infectious disease outbreaks in high-altitude communities.',
        journal: 'Journal of Planetary Health and Resilience',
        publicationYear: 2024,
        publicationType: 'Journal Article',
        doi: '10.5678/gei.2024.climate01',
        pdfUrl: 'https://example.com/publications/himalayan-climate-risk.pdf',
        citations: 0,
        categoryId: sampleCategory?.id,
        isFeatured: true,
        publicationAuthors: {
          create: [
            { authorId: sampleAuthors[0].id, authorOrder: 1 },
            { authorId: sampleAuthors[1].id, authorOrder: 2 }
          ]
        }
      }
    });

    console.log('Sample publication created');
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Some data already exists, skipping duplicates...');
    } else {
      console.error('Error during seeding:', error);
      process.exit(1);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
