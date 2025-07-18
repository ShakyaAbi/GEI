import express from 'express';
import prisma from '../prisma/client.js';
import { authenticateToken } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator'; // New import

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
    res.status(500).json({ error: true, message: 'Server error: Failed to fetch program areas.' });
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
    res.status(500).json({ error: true, message: 'Server error: Failed to fetch program area.' });
  }
});

// Create program area (authenticated)
router.post('/', authenticateToken, [
  body('name').notEmpty().withMessage('Name is required'),
  body('slug').notEmpty().withMessage('Slug is required').matches(/^[a-z0-9-]+$/).withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
  body('description').optional(),
  body('heroImage').optional(),
  body('hero_image').optional(),
  body('seoTitle').optional(),
  body('seoDescription').optional(),
  body('orderIndex').optional().isInt().withMessage('Order index must be a number'),
  body('icon').optional(),
  body('iconUrl').optional(),
  body('icon_url').optional(),
], async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: true, 
        message: 'Admin privileges required' 
      });
    }

    // Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: true, 
        message: 'Validation error', 
        errors: errors.array() 
      });
    }

    let { 
      name, slug, description, heroImage, hero_image, 
      seoTitle, seoDescription, orderIndex, icon, iconUrl, icon_url 
    } = req.body;

    // Handle snake_case to camelCase mapping
    heroImage = heroImage || hero_image;
    iconUrl = iconUrl || icon_url;
    
    // Check for duplicate slug
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { slug }
    });
    
    if (existingProgramArea) {
      return res.status(400).json({ 
        error: true, 
        message: 'A program area with this slug already exists' 
      });
    }
    
    // Create program area with explicit type casting
    const programArea = await prisma.programArea.create({
      data: {
        name: String(name),
        slug: String(slug),
        description: description ? String(description) : null,
        heroImage: heroImage ? String(heroImage) : null,
        seoTitle: seoTitle ? String(seoTitle) : null,
        seoDescription: seoDescription ? String(seoDescription) : null,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0,
        icon: icon ? String(icon) : null,
        iconUrl: iconUrl ? String(iconUrl) : null
      }
    });
    
    res.status(201).json({ 
      error: false, 
      message: 'Program area created successfully',
      data: mapHeroImageField(programArea) 
    });
  } catch (error) {
    console.error('Create program area error:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to create program area',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update program area (authenticated)
router.put('/:id', authenticateToken, [
  body('name').notEmpty().withMessage('Name is required').optional(),
  body('slug').notEmpty().withMessage('Slug is required').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { id } = req.params;
    let { 
      name, slug, description, heroImage, hero_image, 
      seoTitle, seoDescription, orderIndex, icon, iconUrl, icon_url 
    } = req.body;
    // Map hero_image (snake_case) to heroImage (camelCase) if present
    if (!heroImage && hero_image) heroImage = hero_image;
    if (!iconUrl && icon_url) iconUrl = icon_url;
    
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
        orderIndex: orderIndex ? parseInt(orderIndex) : 0,
        icon: icon || null,
        iconUrl: iconUrl || null
      }
    });
    
    res.json({ error: false, data: mapHeroImageField(programArea) });
  } catch (error) {
    console.error('Update program area error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to update program area.' });
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
    
    res.status(204).send(); // Standardize 204 response
  } catch (error) {
    console.error('Delete program area error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: true, message: 'Program area not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete program area.' });
  }
});

// Add team member to program area (authenticated)
router.post('/:id/team-members', authenticateToken, [
  body('name').notEmpty().withMessage('Name is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { id } = req.params;
    const { name, title, role, image, email, bio, orderIndex } = req.body;
    
    // Validate required fields
    // if (!name) {
    //   return res.status(400).json({ error: true, message: 'Name is required' });
    // }
    
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
    res.status(500).json({ error: true, message: 'Server error: Failed to add team member.' });
  }
});

// Update team member in program area (authenticated)
router.put('/:programAreaId/team-members/:memberId', authenticateToken, [
  body('name').notEmpty().withMessage('Name is required').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { programAreaId, memberId } = req.params;
    const { name, title, role, image, email, bio, orderIndex } = req.body;
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id: programAreaId }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }

    // Check if team member exists
    const existingMember = await prisma.programAreaTeamMember.findUnique({
      where: { id: memberId }
    });

    if (!existingMember) {
      return res.status(404).json({ error: true, message: 'Team member not found' });
    }

    // Update team member
    const updatedMember = await prisma.programAreaTeamMember.update({
      where: { id: memberId },
      data: {
        name: name || existingMember.name,
        title: title || existingMember.title,
        role: role || existingMember.role,
        image: image || existingMember.image,
        email: email || existingMember.email,
        bio: bio || existingMember.bio,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : existingMember.orderIndex
      }
    });

    res.json({ error: false, data: updatedMember });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to update team member.' });
  }
});

// Delete team member from program area (authenticated)
router.delete('/:programAreaId/team-members/:memberId', authenticateToken, async (req, res) => {
  try {
    const { programAreaId, memberId } = req.params;
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id: programAreaId }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }

    // Check if team member exists
    const existingMember = await prisma.programAreaTeamMember.findUnique({
      where: { id: memberId }
    });

    if (!existingMember) {
      return res.status(404).json({ error: true, message: 'Team member not found' });
    }

    // Delete team member
    await prisma.programAreaTeamMember.delete({
      where: { id: memberId }
    });
    
    res.status(204).send(); // Standardize 204 response
  } catch (error) {
    console.error('Delete team member error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: true, message: 'Team member not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete team member.' });
  }
});

// Add partner to program area (authenticated)
router.post('/:id/partners', authenticateToken, [
  body('name').notEmpty().withMessage('Name is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { id } = req.params;
    const { name, logo, website, description, orderIndex } = req.body;
    
    // Validate required fields
    // if (!name) {
    //   return res.status(400).json({ error: true, message: 'Name is required' });
    // }
    
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
    res.status(500).json({ error: true, message: 'Server error: Failed to add partner.' });
  }
});

// Update partner in program area (authenticated)
router.put('/:programAreaId/partners/:partnerId', authenticateToken, [
  body('name').notEmpty().withMessage('Name is required').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { programAreaId, partnerId } = req.params;
    const { name, logo, website, description, orderIndex } = req.body;
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id: programAreaId }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }

    // Check if partner exists
    const existingPartner = await prisma.programAreaPartner.findUnique({
      where: { id: partnerId }
    });

    if (!existingPartner) {
      return res.status(404).json({ error: true, message: 'Partner not found' });
    }

    // Update partner
    const updatedPartner = await prisma.programAreaPartner.update({
      where: { id: partnerId },
      data: {
        name: name || existingPartner.name,
        logo: logo || existingPartner.logo,
        website: website || existingPartner.website,
        description: description || existingPartner.description,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : existingPartner.orderIndex
      }
    });

    res.json({ error: false, data: updatedPartner });
  } catch (error) {
    console.error('Update partner error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to update partner.' });
  }
});

// Delete partner from program area (authenticated)
router.delete('/:programAreaId/partners/:partnerId', authenticateToken, async (req, res) => {
  try {
    const { programAreaId, partnerId } = req.params;
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id: programAreaId }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }

    // Check if partner exists
    const existingPartner = await prisma.programAreaPartner.findUnique({
      where: { id: partnerId }
    });

    if (!existingPartner) {
      return res.status(404).json({ error: true, message: 'Partner not found' });
    }

    // Delete partner
    await prisma.programAreaPartner.delete({
      where: { id: partnerId }
    });
    
    res.status(204).send(); // Standardize 204 response
  } catch (error) {
    console.error('Delete partner error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: true, message: 'Partner not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete partner.' });
  }
});

// Add image to program area (authenticated)
router.post('/:id/images', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { url, altText, orderIndex } = req.body;
    if (!url) {
      return res.status(400).json({ error: true, message: 'URL is required' });
    }
    const image = await prisma.programAreaImage.create({
      data: {
        programAreaId: id,
        url,
        altText,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0
      }
    });
    res.status(201).json({ error: false, data: image });
  } catch (error) {
    console.error('Add image error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to add image.' });
  }
});

// Delete image from program area (authenticated)
router.delete('/:programAreaId/images/:imageId', authenticateToken, async (req, res) => {
  try {
    const { programAreaId, imageId } = req.params;
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id: programAreaId }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }

    // Check if image exists
    const existingImage = await prisma.programAreaImage.findUnique({
      where: { id: imageId }
    });

    if (!existingImage) {
      return res.status(404).json({ error: true, message: 'Image not found' });
    }

    // Delete image
    await prisma.programAreaImage.delete({
      where: { id: imageId }
    });
    
    res.status(204).send(); // Standardize 204 response
  } catch (error) {
    console.error('Delete image error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: true, message: 'Image not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete image.' });
  }
});

// Add document to program area (authenticated)
router.post('/:id/documents', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { url, altText, orderIndex } = req.body;
    if (!url) {
      return res.status(400).json({ error: true, message: 'URL is required' });
    }
    const document = await prisma.programAreaDocument.create({
      data: {
        programAreaId: id,
        url,
        altText,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0
      }
    });
    res.status(201).json({ error: false, data: document });
  } catch (error) {
    console.error('Add document error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to add document.' });
  }
});

// Delete document from program area (authenticated)
router.delete('/:programAreaId/documents/:documentId', authenticateToken, async (req, res) => {
  try {
    const { programAreaId, documentId } = req.params;
    
    // Check if program area exists
    const existingProgramArea = await prisma.programArea.findUnique({
      where: { id: programAreaId }
    });
    
    if (!existingProgramArea) {
      return res.status(404).json({ error: true, message: 'Program area not found' });
    }

    // Check if document exists
    const existingDocument = await prisma.programAreaDocument.findUnique({
      where: { id: documentId }
    });

    if (!existingDocument) {
      return res.status(404).json({ error: true, message: 'Document not found' });
    }

    // Delete document
    await prisma.programAreaDocument.delete({
      where: { id: documentId }
    });
    
    res.status(204).send(); // Standardize 204 response
  } catch (error) {
    console.error('Delete document error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: true, message: 'Document not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete document.' });
  }
});

// --- Program Area Features CRUD ---

// Get all features for a program area
router.get('/:id/features', async (req, res) => {
  try {
    const { id } = req.params;
    const features = await prisma.programAreaFeature.findMany({
      where: { programAreaId: id },
      orderBy: { orderIndex: 'asc' }
    });
    res.json({ error: false, data: features });
  } catch (error) {
    console.error('Get program area features error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Create a feature for a program area (authenticated)
router.post('/:id/features', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, image, orderIndex } = req.body;
    if (!title) {
      return res.status(400).json({ error: true, message: 'Title is required' });
    }
    const feature = await prisma.programAreaFeature.create({
      data: {
        programAreaId: id,
        title,
        subtitle,
        description,
        image,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0
      }
    });
    res.status(201).json({ error: false, data: feature });
  } catch (error) {
    console.error('Create program area feature error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Update a feature (authenticated)
router.put('/features/:featureId', authenticateToken, async (req, res) => {
  try {
    const { featureId } = req.params;
    const { title, subtitle, description, image, orderIndex } = req.body;
    const feature = await prisma.programAreaFeature.update({
      where: { id: featureId },
      data: {
        title,
        subtitle,
        description,
        image,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : undefined
      }
    });
    res.json({ error: false, data: feature });
  } catch (error) {
    console.error('Update program area feature error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Delete a feature (authenticated)
router.delete('/features/:featureId', authenticateToken, async (req, res) => {
  try {
    const { featureId } = req.params;
    await prisma.programAreaFeature.delete({ where: { id: featureId } });
    res.json({ error: false, message: 'Feature deleted successfully' });
  } catch (error) {
    console.error('Delete program area feature error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

export default router;