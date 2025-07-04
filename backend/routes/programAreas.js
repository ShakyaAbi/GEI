import express from 'express';
import prisma from '../prisma/client.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Utility to map project fields for frontend compatibility
function mapProjectFields(project) {
  if (!project) return project;
  const obj = typeof project.toJSON === 'function' ? project.toJSON() : project;
  const { heroImage, programAreaId, impactMetrics, ...rest } = obj;
  return {
    ...rest,
    hero_image: heroImage,
    program_area_id: programAreaId,
    impact_metrics: impactMetrics,
  };
}

// Utility to map heroImage to hero_image in responses
function mapHeroImageField(programArea) {
  if (!programArea) return programArea;
  const obj = typeof programArea.toJSON === 'function' ? programArea.toJSON() : programArea;
  const { heroImage, projects, ...rest } = obj;
  return {
    ...rest,
    hero_image: heroImage,
    ...(projects ? { projects: projects.map(mapProjectFields) } : {}),
  };
}

// Get all program areas
router.get('/', async (req, res) => {
  try {
    const { limit, offset } = req.query;
    
    const programAreas = await prisma.programArea.findMany({
      include: {
        _count: {
          select: { projects: true }
        }
      },
      orderBy: {
        orderIndex: 'asc'
      },
      skip: offset ? parseInt(offset) : undefined,
      take: limit ? parseInt(limit) : undefined
    });
    
    // Map the response to include project count
    const mappedProgramAreas = programAreas.map(area => ({
      ...mapHeroImageField(area),
      projectCount: area._count.projects
    }));
    
    res.json({ error: false, data: mappedProgramAreas });
  } catch (error) {
    console.error('Get program areas error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Get program area by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const programArea = await prisma.programArea.findUnique({
      where: { slug },
      include: {
        teamMembers: {
          orderBy: {
            orderIndex: 'asc'
          }
        },
        partners: {
          orderBy: {
            orderIndex: 'asc'
          }
        },
        projects: {
          include: {
            media: true
          },
          orderBy: {
            orderIndex: 'asc'
          }
        }
      }
    });
    
    if (!programArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }
    
    res.json({ error: false, data: mapHeroImageField(programArea) });
  } catch (error) {
    console.error('Get program area error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Create program area (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  try {
    let { 
      name, slug, description, heroImage, hero_image, 
      seoTitle, seoDescription, orderIndex 
    } = req.body;
    // Map hero_image (snake_case) to heroImage (camelCase) if present
    if (!heroImage && hero_image) heroImage = hero_image;
    
    // Validate required fields
    if (!name || !slug) {
      return res.status(400).json({ error: true, message: 'Name and slug are required' });
    }
    
    // Check if slug already exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { slug }
    });
    
    if (existingProgramArea) {
      return res.status(400).json({ error: true, message: 'Slug already exists' });
    }
    
    // Create program area
    const programArea = await prisma.programArea.create({
      data: {
        name,
        slug,
        description,
        heroImage,
        seoTitle,
        seoDescription,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0
      }
    });
    
    res.status(201).json({ error: false, data: mapHeroImageField(programArea) });
  } catch (error) {
    console.error('Create program area error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Update program area (authenticated)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    let { 
      name, slug, description, heroImage, hero_image, 
      seoTitle, seoDescription, orderIndex 
    } = req.body;
    // Map hero_image (snake_case) to heroImage (camelCase) if present
    if (!heroImage && hero_image) heroImage = hero_image;
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }
    
    // Check if slug already exists (if changing slug)
    if (slug !== existingProgramArea.slug) {
      const slugExists = await prisma.programArea.findUnique({
        where: { slug }
      });
      
      if (slugExists) {
        return res.status(400).json({ error: true, message: 'Slug already exists' });
      }
    }
    
    // Update program area
    const programArea = await prisma.programArea.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        heroImage,
        seoTitle,
        seoDescription,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0
      }
    });
    
    res.json({ error: false, data: mapHeroImageField(programArea) });
  } catch (error) {
    console.error('Update program area error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Delete program area (authenticated)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }
    
    // Delete program area (will cascade delete related records)
    await prisma.programArea.delete({
      where: { id }
    });
    
    res.json({ error: false, message: 'Program area deleted successfully' });
  } catch (error) {
    console.error('Delete program area error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Add team member to program area (authenticated)
router.post('/:id/team-members', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, role, image, email, bio, orderIndex } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: true, message: 'Name is required' });
    }
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }
    
    // Create team member
    const teamMember = await prisma.programAreaTeamMember.create({
      data: {
        programAreaId: id,
        name,
        title,
        role,
        image,
        email,
        bio,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0
      }
    });
    
    res.status(201).json({ error: false, data: teamMember });
  } catch (error) {
    console.error('Add team member error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Add partner to program area (authenticated)
router.post('/:id/partners', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo, website, description, orderIndex } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: true, message: 'Name is required' });
    }
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }
    
    // Create partner
    const partner = await prisma.programAreaPartner.create({
      data: {
        programAreaId: id,
        name,
        logo,
        website,
        description,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0
      }
    });
    
    res.status(201).json({ error: false, data: partner });
  } catch (error) {
    console.error('Add partner error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

export default router;