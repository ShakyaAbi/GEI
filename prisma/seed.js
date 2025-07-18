import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting GEI seed...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin22', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin21@gei.org' },
      update: {},
      create: {
        email: 'admin21@gei.org',
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
        seoDescription: 'Explore GEI\'s innovations in water purification, air quality improvement, and sustainable waste management.',
        orderIndex: 1
      },
      {
        name: 'Health Capacity Building',
        slug: 'health-capacity',
        description: 'Improving maternal and child health through infrastructure upgrades, anemia management, safe delivery training, and diagnostics innovation.',
        seoTitle: 'Maternal & Child Health Programs | GEI',
        seoDescription: 'Discover GEI\'s maternal and child health programs, including nutrition, anemia prevention, and newborn care.',
        orderIndex: 2
      },
      {
        name: 'Sustainable Economic Development',
        slug: 'economic-development',
        description: 'Creating community-based green businesses, promoting women-led cooperatives, eco-tourism, and permaculture in underserved regions.',
        seoTitle: 'Community Development & Livelihoods | GEI',
        seoDescription: 'Learn how GEI supports sustainable income generation, permaculture farming, and women\'s economic empowerment.',
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

    // Add comprehensive GEI projects based on the project activities document
    const allAreas = await prisma.programArea.findMany();
    const projects = [
      // I. SUSTAINABLE HEALTH CAPACITY BUILDING ACCHAM and BAJURA
      {
        title: 'Sustainable Health Capacity Building - Accham and Bajura',
        description: 'Implementing sustainable basic health systems strengthening and capacity building in rural Nepal through public-private-academic partnerships.',
        overview: `## Overview

**Populations in rural, impoverished areas worldwide do not have access to quality health services, resulting in preventable morbidity and mortality. Women and children are particularly vulnerable.**

### Project Highlights
- **"Adopt" 2 districts in rural Nepal**
- **Model for sustainable, systematic healthcare capacity building**
- **Public-private-academic partnership**

### 2024 Achievements
- Comprehensive health facility evaluation
- Addressed gaps in health service delivery, customized to each facility
- **500+ community health workers trained**
- **14/28 health posts upgraded to functional birthing centers**
- Health management staff trained in quality and logistics

Health facilities are now able to provide basic preventive and life-saving care.`,
        location: 'Accham and Bajura Districts, Nepal',
        duration: '2024-2025',
        status: 'active',
        budget: '$500,000',
        beneficiaries: '500+ community health workers, 28 health facilities',
        impactMetrics: ['500+ trained health workers', '28 health posts upgraded', '14 birthing centers functional'],
        programAreaSlug: 'health-capacity',
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        slug: 'sustainable-health-capacity-building-accham-bajura'
      },
      
      // II. KOLTI HOSPITAL PROJECT
      {
        title: 'Kolti Referral Hospital - Western Nepal',
        description: 'Upgrading the current Primary Health Center in Kolti to a 50-bed hospital providing emergency surgical, maternity, pediatric and general medical services.',
        overview: `## Overview

**Goal:** Upgrade the current Primary Health Center in Kolti to a **50-bed hospital** providing emergency surgical, maternity, pediatric, and general medical services to a population of **225,000**.

### Key Features
- **Public-private-academic partnership**
- **Location:** Kolti, Budhinanda municipality
- **Partners:** 17 municipalities from 4 districts
- **Integration:** Linked with Dhulikhel Hospital outreach centers
- **Community Development Center:** Economic, agricultural, and educational programs

### Services
- **CEONC:** Comprehensive emergency obstetric, neonatal intensive care
- **Emergency room:** Trauma, cardiovascular, obstetric, dental
- **General medical:** Laboratory, radiology, skilled care, operating room
- **Preventive:** Prenatal, postnatal, nutrition, cancer screening, dental
- **Community health programs**

### Financing
- **Capital investment:** $2–2.5 million
- **Annual operating costs:** $300,000–$400,000
- **50% construction and all operational costs covered by government after construction**

### 2025 Activities
- Hospital operations planning
- Financial feasibility assessment
- Secure commitments from local and central government
- Community engagement and planning`,
        location: 'Kolti, Budhinanda Municipality, Western Nepal',
        duration: '2025-2027',
        status: 'active',
        budget: '$2.5 million',
        beneficiaries: '225,000 population across 17 municipalities',
        impactMetrics: ['50-bed hospital', 'Emergency services', 'Maternal care', 'Pediatric care'],
        programAreaSlug: 'health-capacity',
        startDate: '2025-01-01',
        endDate: '2027-12-31',
        slug: 'kolti-referral-hospital-western-nepal'
      },
      
      // III. CLEAN WATER & WASTE MANAGEMENT SYSTEMS
      {
        title: 'Clean Water & Waste Management Systems',
        description: 'Implementing affordable water filtration and treatment modalities to address water contamination issues in Nepal.',
        overview: `## Overview

**Reliable access to clean water is a basic requirement for health, well-being, and development.**

### Progress (2024)
- **Water purification plant completed at Dhulikhel Hospital**
- First hospital in Nepal to offer safe drinking water to patients and staff
- **180,000 liters/day** of purified water produced
- **Cost-effective:** $90,000 total cost
- No chemicals used—modular local filters only

### 2025 Plans
1. **Water quality certification** (Nepal Academy of Science and Technology)
2. **Public water kiosks** at hospital entrance
3. **Commercial sales** to local businesses, hotels, restaurants
4. **Expansion:** Explore partnership with Kathmandu University for campus water supply

### Environmental Impact
- Reduces bottled water use and plastic waste
- Model for scale-up in Nepal and beyond`,
        location: 'Dhulikhel Hospital, Nepal',
        duration: '2024-2026',
        status: 'active',
        budget: '$90,000',
        beneficiaries: 'Hospital patients and staff, local community',
        impactMetrics: ['180,000 liters/day', 'First hospital water plant', 'Cost-effective solution'],
        programAreaSlug: 'environmental-green-tech',
        startDate: '2024-01-01',
        endDate: '2026-12-31',
        slug: 'clean-water-waste-management-systems'
      },
      
      // IV. NOVEL ECONOMIC INITIATIVES
      {
        title: 'Novel Economic Initiatives and Income Generation',
        description: 'Creating green, sustainable economies using locally available resources and connecting rural economies to markets.',
        overview: `## Background

**Poverty and lack of economic opportunity are root causes of poor health, education, and malnutrition in underserved communities.**

### Approach
- Develop replicable models for green, sustainable economies
- Use local resources and connect rural economies to markets
- Invest in permaculture, ecotourism, and commercial goods production
- Launch community health outreach programs

### Activities
- **Permaculture farming**
- **Agrotourism & ecovillage development**
- **Community health promotion** (training, screening, referral)

### Baseline Economic Surveys
- **Helambu, Accham, Bajura**
- 54% of boys and 45% of girls attend school regularly
- Average annual income per person: NRs 7,003 (USD 55)
- 76% of households have no savings or disposable income
- Farmers lack access to marketplaces

### Impact
- Economic surveys completed
- Permaculture training
- Community health programs launched`,
        location: 'Helambu, Accham, Bajura Districts, Nepal',
        duration: '2024-2026',
        status: 'active',
        budget: '$200,000',
        beneficiaries: '150+ households, local communities',
        impactMetrics: ['Economic surveys completed', 'Permaculture training', 'Community health programs'],
        programAreaSlug: 'economic-development',
        startDate: '2024-01-01',
        endDate: '2026-12-31',
        slug: 'novel-economic-initiatives-income-generation'
      },
      
      // V. CENTER FOR HEALTH, AGROTOURISM AND COMMUNITY ECONOMIC DEVELOPMENT
      {
        title: 'Center for Health, Agrotourism and Community Economic Development',
        description: 'Building green, sustainable economies in Nepal through integrated community development approaches.',
        overview: `## Background

**Rural municipalities in Western Nepal face challenges in development, economic output, health, and education.**

### Baseline Survey (2024)
- **Accham and Bajura**: Unique resources (pure water, fertile land, natural beauty)
- **Challenges:**
  - Lack of unified regional economic development
  - Underutilized natural resources
  - Endemic poverty and malnutrition
  - Mass migration due to lack of opportunity

### Project Goals
1. Connect people to local industrial and economic activities
2. Launch and expand economic opportunities
3. Build knowledge in agriculture, water management, and eco-tourism
4. Preserve traditional culture
5. Improve health outcomes and service quality

### Components
- Permaculture agricultural programs
- Investment in green agriculture (olive, apple, rice, millet, potato)
- Reforestation, water treatment, waste management
- Economic development center, microloan program
- Health and environment promotion

### Community Contributions
- Building donation and maintenance
- 13 hectares for agriculture training
- Transport logistics and sales connections
- Community integration and personnel`,
        location: 'Upper Karnali Region, Nepal',
        duration: '2024-2027',
        status: 'active',
        budget: '$300,000',
        beneficiaries: 'Local communities in Upper Karnali region',
        impactMetrics: ['13 hectares land', 'Permaculture training', 'Economic development center'],
        programAreaSlug: 'economic-development',
        startDate: '2024-01-01',
        endDate: '2027-12-31',
        slug: 'center-health-agrotourism-community-economic-development'
      },
      
      // VI. GEI RESEARCH - ANEMIA PREVENTION
      {
        title: 'Innovation in Anemia Prevention, Treatment and Screening',
        description: 'Pilot testing of AI-powered screening tool to detect and manage anemia in Nepal using cast iron cookpots.',
        overview: `## Overview

**In 2025, GEI will pilot a novel, AI-powered anemia screening tool in Nepal, combined with a new approach to treat and prevent anemia using cast iron cookpots.**

### 2024 Findings
- Screening is intermittent and limited
- Community screening uses "color cards" (inaccurate)
- IFA (iron-folic-acid) provided, but no follow-up
- Anemia distribution is not uniform; high-risk areas need long-term programs

### Baseline Screening Results
- **Nuwakot:** 1659 screened, 68% anemia overall
- **Solukhumbhu:** 830 screened, 64% anemia overall
- **Humla:** 159 screened, 22% anemia overall

### The Tool
- **Monere.ai**: AI-powered anemia screening app (NiADA)
- Non-invasive, smartphone-based, 5-second test
- No need for expensive or invasive equipment

### Pilot Study Design
1. Validate NiADA vs. lab results
2. Qualitative research and household surveys
3. Test cast iron pots for anemia reduction

### Significance
- Low-cost, community-based screening
- Immediate policy impact via collaboration with Nepal National Health Research Council`,
        location: 'Nuwakot, Solukhumbhu, Humla Districts, Nepal',
        duration: '2025-2026',
        status: 'active',
        budget: '$150,000',
        beneficiaries: '3,000+ screened individuals',
        impactMetrics: ['AI screening tool validation', 'Cast iron cookpot intervention', 'Community-based screening'],
        programAreaSlug: 'health-capacity',
        startDate: '2025-01-01',
        endDate: '2026-12-31',
        slug: 'innovation-anemia-prevention-treatment-screening'
      },
      
      // VII. HELAMBU LIVELIHOOD PROJECT
      {
        title: 'Helambu Livelihood Project',
        description: 'Building economic capacity through social entrepreneurship and sustainable finance programs in Helambu municipality.',
        overview: `## Baseline Evaluation (2024)

- 150 households surveyed
- 54% of boys and 45% of girls attend school regularly
- 30–45% of household members are illiterate
- Average annual income per person: NRs 7,003 (USD 55)
- 76% of households have no savings or disposable income
- Some farmers sell products from home, earning ~$30/mo

## 2025 Project Steps
1. **Build economic capacity** of Melamchi Gang (MG) and Ichok residents
2. **Social entrepreneurship program**
3. **Sustainable finance program** ($44,500 fund for loans)
4. **Dairy and ghee production** for local market

### Deliverables
- Social Welfare Council approval
- Baseline economic survey
- Training for local co-ops
- Community entrepreneurial management
- Perpetual fund for loans
- Dairy/ghee production and market access`,
        location: 'Helambu Municipality, Nepal',
        duration: '2024-2026',
        status: 'active',
        budget: '$44,500',
        beneficiaries: '150+ households in Helambu',
        impactMetrics: ['Dairy cow operation', 'Sustainable finance program', 'Community co-ops'],
        programAreaSlug: 'economic-development',
        startDate: '2024-01-01',
        endDate: '2026-12-31',
        slug: 'helambu-livelihood-project'
      },
      
      // VIII. MATERNAL NEONATAL TRAINING PROGRAM
      {
        title: 'Maternal Neonatal Training Program - Humla and Nuwakot',
        description: 'Building case management skills among health workers and care capacity in rural health facilities to manage IHE and postpartum hemorrhage.',
        overview: `## Introduction

**Neonatal and maternal mortality remain a significant priority for Nepal, especially in remote regions.**

### Project Goal
- Build case management skills among health workers
- Improve care capacity in rural health facilities for IHE and postpartum hemorrhage
- Implement Training of Trainers (TOT) for Helping Babies Breathe and Helping Mother’s Survive (HBB/HMS)
- Disseminate knowledge to frontline care workers in Nuwakot, Accham, and Bajura

### Activities
1. **Care and service gap definition** (baseline survey)
   - Completed in Accham and Bajura
   - Scheduled in Nuwakot (2025)
2. **Skills package implementation**
   - Training centers at district hospitals
   - Master trainer courses (Nuwakot: Jan 2025, Kolti PHC: Fall 2025)
3. **Skills upgrading for health workers**
   - Batches of 10–15 rural health workers trained (2025–2026)
   - 28 facilities upgraded in Accham and Bajura; 10 in Nuwakot
   - 170+ management committee members trained (Accham/Bajura)
   - 500+ community health volunteers trained (Accham/Bajura); Nuwakot pending (2025)`,
        location: 'Humla, Nuwakot, Accham, Bajura Districts, Nepal',
        duration: '2024-2026',
        status: 'active',
        budget: '$300,000',
        beneficiaries: '500+ health workers, 38 health facilities',
        impactMetrics: ['HBB/HMS training', '38 facilities upgraded', '500+ health workers trained'],
        programAreaSlug: 'health-capacity',
        startDate: '2024-01-01',
        endDate: '2026-12-31',
        slug: 'maternal-neonatal-training-program-humla-nuwakot'
      }
    ];

    for (const project of projects) {
      const area = allAreas.find(a => a.slug === project.programAreaSlug);
      if (area) {
        await prisma.project.upsert({
          where: { slug: project.slug },
          update: {
            title: project.title,
            description: project.description,
            overview: project.overview,
            location: project.location,
            duration: project.duration,
            status: project.status,
            budget: project.budget,
            beneficiaries: project.beneficiaries,
            impactMetrics: project.impactMetrics,
            programAreaId: area.id,
            startDate: project.startDate ? new Date(project.startDate) : null,
            endDate: project.endDate ? new Date(project.endDate) : null
          },
          create: {
            title: project.title,
            description: project.description,
            overview: project.overview,
            location: project.location,
            duration: project.duration,
            status: project.status,
            budget: project.budget,
            beneficiaries: project.beneficiaries,
            impactMetrics: project.impactMetrics,
            programAreaId: area.id,
            startDate: project.startDate ? new Date(project.startDate) : null,
            endDate: project.endDate ? new Date(project.endDate) : null,
            slug: project.slug
          }
        });
      }
    }
    console.log(`Upserted ${projects.length} comprehensive GEI projects with Markdown support`);
  } catch (error) {
    console.error('Error during GEI seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
