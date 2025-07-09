import express from 'express';
import prisma from '../prisma/client.js';
import { authenticateToken } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Utility to map fields for frontend compatibility
function mapProjectFields(project) {
  if (!project) return project;
  const obj = typeof project.toJSON === 'function' ? project.toJSON() : project;
  const {
    heroImage, programAreaId, impactMetrics, ...rest
  } = obj;
  return {
    ...rest,
    hero_image: heroImage,
    program_area_id: programAreaId,
    impact_metrics: impactMetrics,
  };
}

// Utility to map project content fields for frontend compatibility
function mapProjectContentFields(content) {
  if (!content) return content;
  const obj = typeof content.toJSON === 'function' ? content.toJSON() : content;
  const { contentType, orderIndex, isPublished, ...rest } = obj;
  return {
    ...rest,
    content_type: contentType,
    order_index: orderIndex,
    is_published: isPublished,
  };
}

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { programAreaId, status, limit, offset } = req.query;
    
    // Build query
    const where = {};
    
    if (programAreaId) {
      where.programAreaId = programAreaId;
    }
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    // Execute query
    const projects = await prisma.project.findMany({
      where,
      include: {
        programArea: true,
        media: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset ? parseInt(offset) : undefined,
      take: limit ? parseInt(limit) : undefined
    });
    
    res.json({ error: false, data: projects.map(mapProjectFields) });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        programArea: true,
        media: true,
        stakeholders: true,
        updates: {
          orderBy: {
            updateDate: 'desc'
          }
        },
        customFields: true
      }
    });
    
    if (!project) {
      return res.status(404).json({ error: true, message: 'Project not found' });
    }
    
    res.json({ error: false, data: mapProjectFields(project) });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Get project by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        programArea: true,
        media: true,
        stakeholders: true,
        updates: {
          orderBy: {
            updateDate: 'desc'
          }
        },
        customFields: true
      }
    });
    
    if (!project) {
      return res.status(404).json({ error: true, message: 'Project not found' });
    }
    
    res.json({ error: false, data: mapProjectFields(project) });
  } catch (error) {
    console.error('Get project by slug error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Create project (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  try {
    let { 
      title, description, location, duration, status, budget, 
      beneficiaries, impactMetrics, programAreaId, program_area_id, orderIndex,
      startDate, endDate, slug, heroImage, hero_image, image, project_content
    } = req.body;
    
    // Map hero_image (snake_case) to heroImage (camelCase) if present
    if (!heroImage && hero_image) heroImage = hero_image;
    
    // Map program_area_id (snake_case) to programAreaId (camelCase) if present
    if (!programAreaId && program_area_id) programAreaId = program_area_id;
    
    // Map impact_metrics (snake_case) to impactMetrics (camelCase) if present
    if (!impactMetrics && req.body.impact_metrics) impactMetrics = req.body.impact_metrics;
    
    // Fix budget: always save as string
    if (budget !== undefined && budget !== null) budget = String(budget);
    
    // Fix duration: always save as string
    if (duration !== undefined && duration !== null) duration = String(duration);
    
    // Fix startDate/endDate: parse as Date if string
    if (startDate) startDate = new Date(startDate);
    if (endDate) endDate = new Date(endDate);
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: true, message: 'Title is required' });
    }
    
    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        location,
        duration,
        status: status || 'active',
        budget,
        beneficiaries,
        impactMetrics: impactMetrics || [],
        programAreaId,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0,
        startDate: startDate || null,
        endDate: endDate || null,
        slug,
        heroImage,
        image
      }
    });
    
    // Attach project_content to response if present (for demo, not DB)
    const responseProject = { ...mapProjectFields(project) };
    if (project_content) responseProject.project_content = project_content;
    res.status(201).json({ error: false, data: responseProject });
  } catch (error) {
    console.error('Create project error:', error);
    if (error.code === 'P2002') {
      // Prisma unique constraint failed
      return res.status(400).json({ error: true, message: 'A project with this slug or unique field already exists.' });
    }
    if (error.message) {
      return res.status(500).json({ error: true, message: error.message });
    }
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Update project (authenticated)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    let { 
      title, description, location, duration, status, budget, 
      beneficiaries, impactMetrics, programAreaId, program_area_id, orderIndex,
      startDate, endDate, slug, heroImage, hero_image, image, project_content
    } = req.body;
    
    // Map hero_image (snake_case) to heroImage (camelCase) if present
    if (!heroImage && hero_image) heroImage = hero_image;
    
    // Map program_area_id (snake_case) to programAreaId (camelCase) if present
    if (!programAreaId && program_area_id) programAreaId = program_area_id;
    
    // Map impact_metrics (snake_case) to impactMetrics (camelCase) if present
    if (!impactMetrics && req.body.impact_metrics) impactMetrics = req.body.impact_metrics;
    
    // Fix budget: always save as string
    if (budget !== undefined && budget !== null) budget = String(budget);
    
    // Fix duration: always save as string
    if (duration !== undefined && duration !== null) duration = String(duration);
    
    // Fix startDate/endDate: parse as Date if string
    if (startDate) startDate = new Date(startDate);
    if (endDate) endDate = new Date(endDate);
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return res.status(404).json({ error: true, message: 'Project not found' });
    }
    
    // Check if slug already exists (if changing slug)
    if (slug && slug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug }
      });
      
      if (slugExists) {
        return res.status(400).json({ error: true, message: 'Slug already exists' });
      }
    }
    
    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        location,
        duration,
        status,
        budget,
        beneficiaries,
        impactMetrics: impactMetrics || undefined,
        programAreaId,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : undefined,
        startDate: startDate || null,
        endDate: endDate || null,
        slug,
        heroImage,
        image
      }
    });
    
    const responseProject = { ...mapProjectFields(project) };
    if (project_content) responseProject.project_content = project_content;
    res.json({ error: false, data: responseProject });
  } catch (error) {
    console.error('Update project error:', error);
    if (error.code === 'P2002') {
      // Prisma unique constraint failed
      return res.status(400).json({ error: true, message: 'A project with this slug or unique field already exists.' });
    }
    if (error.message) {
      return res.status(500).json({ error: true, message: error.message });
    }
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Delete project (authenticated)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return res.status(404).json({ error: true, message: 'Project not found' });
    }
    
    // Delete project (will cascade delete related records)
    await prisma.project.delete({
      where: { id }
    });
    
    res.json({ error: false, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Add custom field to project (authenticated)
router.post('/:id/custom-fields', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { fieldName, fieldValue, fieldType } = req.body;
    
    // Validate required fields
    if (!fieldName || !fieldValue) {
      return res.status(400).json({ error: true, message: 'Field name and value are required' });
    }
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return res.status(404).json({ error: true, message: 'Project not found' });
    }
    
    // Create custom field
    const customField = await prisma.projectCustomField.create({
      data: {
        projectId: id,
        fieldName,
        fieldValue,
        fieldType: fieldType || 'text'
      }
    });
    
    res.status(201).json({ error: false, data: customField });
  } catch (error) {
    console.error('Add custom field error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Add stakeholder to project (authenticated)
router.post('/:id/stakeholders', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, organization, role, type } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: true, message: 'Name is required' });
    }
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return res.status(404).json({ error: true, message: 'Project not found' });
    }
    
    // Create stakeholder
    const stakeholder = await prisma.projectStakeholder.create({
      data: {
        projectId: id,
        name,
        email,
        phone,
        organization,
        role,
        type: type || 'team_member'
      }
    });
    
    res.status(201).json({ error: false, data: stakeholder });
  } catch (error) {
    console.error('Add stakeholder error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Add update to project (authenticated)
router.post('/:id/updates', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, updateDate, milestone } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: true, message: 'Title is required' });
    }
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return res.status(404).json({ error: true, message: 'Project not found' });
    }
    
    // Create update
    const update = await prisma.projectUpdate.create({
      data: {
        projectId: id,
        title,
        description,
        updateDate: updateDate ? new Date(updateDate) : new Date(),
        milestone: milestone || false,
        createdBy: req.user.id
      }
    });
    
    res.status(201).json({ error: false, data: update });
  } catch (error) {
    console.error('Add update error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// --- Project Content Endpoints ---
// Get all content for a project
router.get('/:id/content', async (req, res) => {
  try {
    const { id } = req.params;
    const content = await prisma.projectContent.findMany({
      where: { projectId: id },
      orderBy: { orderIndex: 'asc' }
    });
    res.json({ error: false, data: content.map(mapProjectContentFields) });
  } catch (error) {
    console.error('Get project content error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Create new content for a project
router.post('/:id/content', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, contentType, orderIndex, isPublished, author } = req.body;
    if (!title || !content || !contentType) {
      return res.status(400).json({ error: true, message: 'Title, content, and contentType are required' });
    }
    const newContent = await prisma.projectContent.create({
      data: {
        projectId: id,
        title,
        content,
        contentType,
        orderIndex: orderIndex || 0,
        isPublished: isPublished !== undefined ? isPublished : true,
        author
      }
    });
    res.status(201).json({ error: false, data: mapProjectContentFields(newContent) });
  } catch (error) {
    console.error('Create project content error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Update project content
router.put('/content/:contentId', authenticateToken, async (req, res) => {
  try {
    const { contentId } = req.params;
    const { title, content, contentType, orderIndex, isPublished, author } = req.body;
    const updated = await prisma.projectContent.update({
      where: { id: contentId },
      data: {
        title,
        content,
        contentType,
        orderIndex,
        isPublished,
        author
      }
    });
    res.json({ error: false, data: mapProjectContentFields(updated) });
  } catch (error) {
    console.error('Update project content error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Delete project content
router.delete('/content/:contentId', authenticateToken, async (req, res) => {
  try {
    const { contentId } = req.params;
    await prisma.projectContent.delete({ where: { id: contentId } });
    res.json({ error: false, message: 'Content deleted' });
  } catch (error) {
    console.error('Delete project content error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Delete project media
router.delete('/:projectId/media/:mediaId', authenticateToken, async (req, res) => {
  try {
    const { projectId, mediaId } = req.params;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return res.status(404).json({ error: true, message: 'Project not found' });
    }

    // Get media record
    const media = await prisma.projectMedia.findFirst({
      where: {
        id: mediaId,
        projectId
      }
    });

    if (!media) {
      return res.status(404).json({ error: true, message: 'Media not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(uploadsDir, media.fileUrl.replace('/uploads/', ''));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete media record
    await prisma.projectMedia.delete({
      where: { id: mediaId }
    });

    res.json({ error: false, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Delete project media error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Reorder project media
router.put('/:projectId/media/reorder', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { mediaOrder } = req.body; // Array of media IDs in new order
    if (!Array.isArray(mediaOrder)) {
      return res.status(400).json({ error: true, message: 'mediaOrder must be an array of media IDs' });
    }
    // Update each media's orderIndex
    await Promise.all(mediaOrder.map((mediaId, index) =>
      prisma.projectMedia.update({
        where: { id: mediaId, projectId },
        data: { orderIndex: index }
      })
    ));
    res.json({ error: false, message: 'Media order updated' });
  } catch (error) {
    console.error('Reorder project media error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

export default router;