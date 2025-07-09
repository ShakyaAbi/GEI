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
        description: 'Research on poverty alleviation through sustainable livelihoods, women empowerment, green jobs, and community business development.'
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
    
    const publications = [
      {
        title: 'Scaling Water Purification Technologies in High-Altitude Nepal',
        abstract: 'This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.',
        journal: 'Journal of Environmental Health Innovation',
        publicationYear: 2023,
        publicationType: 'Journal Article',
        doi: '10.1234/gei.2023.001',
        pdfUrl: 'https://example.com/papers/water-purification-nepal.pdf',
        citations: 12,
        categorySlug: 'environmental-innovation'
      },
      {
        title: 'Community-Based Approaches to Anemia Management in Rural Nepal',
        abstract: 'This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.',
        journal: 'Maternal and Child Nutrition Review',
        publicationYear: 2022,
        publicationType: 'Peer-Reviewed Article',
        doi: '10.1234/gei.2022.002',
        pdfUrl: 'https://example.com/papers/anemia-community-nepal.pdf',
        citations: 18,
        categorySlug: 'mnch'
      },
      {
        title: 'Green Job Creation through Waste-to-Value Innovation in Nepal',
        abstract: "The study explores how GEI's eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.",
        journal: 'Journal of Sustainable Economic Development',
        publicationYear: 2024,
        publicationType: 'White Paper',
        doi: '10.1234/gei.2024.003',
        pdfUrl: 'https://example.com/papers/waste-to-value.pdf',
        citations: 7,
        categorySlug: 'economic-development'
      },
      {
        title: 'Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings',
        abstract: "This publication documents GEI's validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.",
        journal: 'Global Health Diagnostics Journal',
        publicationYear: 2023,
        publicationType: 'Journal Article',
        doi: '10.1234/gei.2023.004',
        pdfUrl: 'https://example.com/papers/non-invasive-anemia.pdf',
        citations: 25,
        categorySlug: 'mnch'
      },
      {
        title: 'Climate-Resilient Health Infrastructure: Lessons from the Kolti Hospital Project',
        abstract: "GEI's partnership in designing and planning the Kolti Referral Hospital demonstrates how climate-smart health infrastructure can bridge access gaps in remote districts.",
        journal: 'International Journal of Health Systems & Climate',
        publicationYear: 2024,
        publicationType: 'Case Study',
        doi: '10.1234/gei.2024.005',
        pdfUrl: 'https://example.com/papers/kolti-climate-resilient-hospital.pdf',
        citations: 14,
        categorySlug: 'environmental-innovation'
      }
    ];
    
    // Create publications with associated category
    for (const pub of publications) {
      const category = await prisma.researchCategory.findUnique({
        where: { slug: pub.categorySlug }
      });
    
      if (category) {
        await prisma.publication.create({
          data: {
            title: pub.title,
            abstract: pub.abstract,
            journal: pub.journal,
            publicationYear: pub.publicationYear,
            publicationType: pub.publicationType,
            doi: pub.doi,
            pdfUrl: pub.pdfUrl,
            citations: pub.citations,
            categoryId: category.id,
            isFeatured: true
          }
        });
      }
    }

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
        seoDescription: 'Explore GEI's innovations in water purification, air quality improvement, and sustainable waste management.',
        orderIndex: 1
      },
      {
        name: 'Health Capacity Building',
        slug: 'health-capacity',
        description: 'Improving maternal and child health through infrastructure upgrades, anemia management, safe delivery training, and diagnostics innovation.',
        seoTitle: 'Maternal & Child Health Programs | GEI',
        seoDescription: 'Discover GEI's maternal and child health programs, including nutrition, anemia prevention, and newborn care.',
        orderIndex: 2
      },
      {
        name: 'Sustainable Economic Development',
        slug: 'economic-development',
        description: 'Creating community-based green businesses, promoting women-led cooperatives, eco-tourism, and permaculture in underserved regions.',
        seoTitle: 'Community Development & Livelihoods | GEI',
        seoDescription: 'Learn how GEI supports sustainable income generation, permaculture farming, and women's economic empowerment.',
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

    // Add dummy projects for each program area
    const allAreas = await prisma.programArea.findMany();
    const projects = [
      // Environmental
      {
        title: 'Smart Water Purification Pilot',
        description: 'Deploying modular water purification systems in rural communities to ensure access to clean drinking water.',
        programAreaSlug: 'environmental-green-tech'
      },
      {
        title: 'Urban Air Quality Monitoring Network',
        description: 'Establishing a real-time air quality sensor network in urban centers to track and reduce pollution.',
        programAreaSlug: 'environmental-green-tech'
      },
      {
        title: 'Community Forest Restoration Project',
        description: 'Engaging local communities in reforestation and sustainable forest management.',
        programAreaSlug: 'environmental-green-tech'
      },
      // Health
      {
        title: 'Maternal Health Outreach Program',
        description: 'Providing maternal health education and services to remote and underserved populations.',
        programAreaSlug: 'health-capacity'
      },
      {
        title: 'School Nutrition & Anemia Awareness',
        description: 'Implementing school-based nutrition and anemia screening programs for children.',
        programAreaSlug: 'health-capacity'
      },
      {
        title: 'Community Health Worker Training',
        description: 'Training local health workers in essential maternal and child health practices.',
        programAreaSlug: 'health-capacity'
      },
      // Economic
      {
        title: 'Eco-Friendly Handicraft Cooperative',
        description: 'Supporting women-led cooperatives to produce and market eco-friendly handicrafts.',
        programAreaSlug: 'economic-development'
      },
      {
        title: 'Green Startups Incubator',
        description: 'Mentoring and funding green startups focused on sustainability and community impact.',
        programAreaSlug: 'economic-development'
      },
      {
        title: 'Women's Microenterprise Fund',
        description: 'Providing microloans and business training to women entrepreneurs in rural areas.',
        programAreaSlug: 'economic-development'
      }
    ];

    for (const project of projects) {
      const area = allAreas.find(a => a.slug === project.programAreaSlug);
      if (area) {
        await prisma.project.create({
          data: {
            title: project.title,
            description: project.description,
            program_area_id: area.id
          }
        });
      }
    }
    console.log(`Created ${projects.length} dummy projects`);
  } catch (error) {
    console.error('Error during GEI seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
