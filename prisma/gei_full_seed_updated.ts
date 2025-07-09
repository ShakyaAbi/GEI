
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
        name: 'Environmental Health & Innovation',
        slug: 'environmental-innovation',
        description: 'Research on water and air pollution, waste management, and clean technology innovations for community health and sustainability.'
      },
      {
        name: 'Maternal, Neonatal & Child Health',
        slug: 'mnch',
        description: 'Studies on maternal and child health, nutrition, and anemia including safe childbirth, essential newborn care, and health systems strengthening.'
      },
      {
        name: 'Inclusive Economic Development',
        slug: 'economic-development',
        description: 'Research on poverty alleviation through sustainable livelihoods, women’s empowerment, green jobs, and community business development.'
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
        name: 'Dr. Bernhard Fassl',
        email: 'bernhard.fassl@gei.org',
        affiliation: 'Global Environmental and Health Initiative',
        bio: 'Founder of GEI and expert in global pediatric care, health system strengthening, and climate-health integration. Leads initiatives in hospital capacity building and medical innovation.'
      },
      {
        name: 'Dr. Allison Judkins',
        email: 'allison.judkins@gei.org',
        affiliation: 'GEI Research Department',
        bio: 'Head of Research at GEI, specializing in health equity, monitoring and evaluation, and evidence-based systems design for maternal and newborn health.'
      },
      {
        name: 'Rabin Nepal',
        email: 'rabin.nepal@gei.org',
        affiliation: 'GEI Public Health Division',
        bio: 'GEI Public Health Manager in Nepal, leading community-based assessments, anemia prevention programs, and maternal health capacity building.'
      },
      {
        name: 'Bibek Lamichhane',
        email: 'bibek.lamichhane@gei.org',
        affiliation: 'GEI Asia Regional Office',
        bio: 'President of GEI Asia and Head of Public Health. Expert in health systems, rural care access, and training program cascades in South Asia.'
      },
      {
        name: 'Suyog Shrestha',
        email: 'suyog.shrestha@gei.org',
        affiliation: 'GEI Green Innovation Team',
        bio: 'President of Green Job Creation, overseeing clean energy, permaculture, plastic reuse, and environmental technology pilots in Nepal.'
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

    // Create updated program areas
    const programAreas = [
      {
        name: 'Environmental Sustainability & Green Innovation',
        slug: 'environmental-green-tech',
        description: 'GEI pioneers clean technologies including water purification, air pollution mitigation, and waste recycling to improve environmental health.',
        seoTitle: 'Environmental Innovation | GEI',
        seoDescription: 'Explore GEI’s innovations in water purification, air quality improvement, and sustainable waste management.',
        orderIndex: 1
      },
      {
        name: 'Health Capacity Building',
        slug: 'health-capacity',
        description: 'Improving maternal and child health through infrastructure upgrades, anemia management, safe delivery training, and diagnostics innovation.',
        seoTitle: 'Maternal & Child Health Programs | GEI',
        seoDescription: 'Discover GEI’s maternal and child health programs, including nutrition, anemia prevention, and newborn care.',
        orderIndex: 2
      },
      {
        name: 'Sustainable Economic Development',
        slug: 'economic-development',
        description: 'Creating community-based green businesses, promoting women-led cooperatives, eco-tourism, and permaculture in underserved regions.',
        seoTitle: 'Community Development & Livelihoods | GEI',
        seoDescription: 'Learn how GEI supports sustainable income generation, permaculture farming, and women’s economic empowerment.',
        orderIndex: 3
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
