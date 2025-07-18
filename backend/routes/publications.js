import express from 'express';
import prisma from '../prisma/client.js';
import { authenticateToken } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator'; // New import

const router = express.Router();

// Get all publications with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, year, featured, limit, offset } = req.query;
    
    // Build query
    const where = {};
    
    if (category && category !== 'all') {
      where.category = {
        slug: category
      };
    }
    
    if (year) {
      where.publicationYear = parseInt(year);
    }
    
    if (featured !== undefined) {
      where.isFeatured = featured === 'true';
    }
    
    // Execute query
    const publications = await prisma.publication.findMany({
      where,
      include: {
        category: true,
        publicationAuthors: {
          include: {
            author: true
          },
          orderBy: {
            authorOrder: 'asc'
          }
        }
      },
      orderBy: {
        publicationYear: 'desc'
      },
      skip: offset ? parseInt(offset) : undefined,
      take: limit ? parseInt(limit) : undefined
    });
    
    res.json({ error: false, data: publications });
  } catch (error) {
    console.error('Get publications error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to fetch publications.' });
  }
});

// Get publication by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const publication = await prisma.publication.findUnique({
      where: { id },
      include: {
        category: true,
        publicationAuthors: {
          include: {
            author: true
          },
          orderBy: {
            authorOrder: 'asc'
          }
        }
      }
    });
    
    if (!publication) {
      return res.status(404).json({ error: true, message: 'Publication not found' });
    }
    
    res.json({ error: false, data: publication });
  } catch (error) {
    console.error('Get publication error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to fetch publication.' });
  }
});

// Create publication (authenticated)
router.post('/', authenticateToken, [
  body('title').notEmpty().withMessage('Title is required'),
  body('publicationType').notEmpty().withMessage('Publication Type is required'),
  body('categoryId').notEmpty().withMessage('Category is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { 
      title, abstract, journal, publicationYear, publicationType, 
      doi, pdfUrl, citations, isFeatured, categoryId, authorIds 
    } = req.body;
    
    // Validate required fields (moved to express-validator)
    // if (!title) {
    //   return res.status(400).json({ error: true, message: 'Title is required' });
    // }
    
    // Create publication
    const publication = await prisma.publication.create({
      data: {
        title,
        abstract,
        journal,
        publicationYear: publicationYear ? parseInt(publicationYear) : null,
        publicationType: publicationType || 'Journal Article',
        doi,
        pdfUrl,
        citations: citations ? parseInt(citations) : 0,
        isFeatured: isFeatured || false,
        categoryId
      }
    });
    
    // Add authors if provided
    if (authorIds && authorIds.length > 0) {
      const authorData = authorIds.map((authorId, index) => ({
        publicationId: publication.id,
        authorId,
        authorOrder: index + 1
      }));
      
      await prisma.publicationAuthor.createMany({
        data: authorData
      });
    }
    
    // Return the created publication with authors
    const createdPublication = await prisma.publication.findUnique({
      where: { id: publication.id },
      include: {
        category: true,
        publicationAuthors: {
          include: {
            author: true
          },
          orderBy: {
            authorOrder: 'asc'
          }
        }
      }
    });
    
    res.status(201).json({ error: false, data: createdPublication });
  } catch (error) {
    console.error('Create publication error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to create publication.' });
  }
});

// Update publication (authenticated)
router.put('/:id', authenticateToken, [
  body('title').notEmpty().withMessage('Title is required').optional(),
  body('publicationType').notEmpty().withMessage('Publication Type is required').optional(),
  body('categoryId').notEmpty().withMessage('Category is required').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { id } = req.params;
    const { 
      title, abstract, journal, publicationYear, publicationType, 
      doi, pdfUrl, citations, isFeatured, categoryId, authorIds 
    } = req.body;
    
    // Check if publication exists
    const existingPublication = await prisma.publication.findUnique({
      where: { id }
    });
    
    if (!existingPublication) {
      return res.status(404).json({ error: true, message: 'Publication not found' });
    }
    
    // Update publication
    const publication = await prisma.publication.update({
      where: { id },
      data: {
        title,
        abstract,
        journal,
        publicationYear: publicationYear ? parseInt(publicationYear) : null,
        publicationType,
        doi,
        pdfUrl,
        citations: citations ? parseInt(citations) : 0,
        isFeatured: isFeatured || false,
        categoryId
      }
    });
    
    // Update authors if provided
    if (authorIds) {
      // Remove existing authors
      await prisma.publicationAuthor.deleteMany({
        where: { publicationId: id }
      });
      
      // Add new authors
      if (authorIds.length > 0) {
        const authorData = authorIds.map((authorId, index) => ({
          publicationId: id,
          authorId,
          authorOrder: index + 1
        }));
        
        await prisma.publicationAuthor.createMany({
          data: authorData
        });
      }
    }
    
    // Return the updated publication with authors
    const updatedPublication = await prisma.publication.findUnique({
      where: { id },
      include: {
        category: true,
        publicationAuthors: {
          include: {
            author: true
          },
          orderBy: {
            authorOrder: 'asc'
          }
        }
      }
    });
    
    res.json({ error: false, data: updatedPublication });
  } catch (error) {
    console.error('Update publication error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to update publication.' });
  }
});

// Delete publication (authenticated)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if publication exists
    const existingPublication = await prisma.publication.findUnique({
      where: { id }
    });
    
    if (!existingPublication) {
      return res.status(404).json({ error: true, message: 'Publication not found' });
    }
    
    // Delete publication (will cascade delete publication_authors)
    await prisma.publication.delete({
      where: { id }
    });
    
    res.status(204).send(); // Standardize 204 response
  } catch (error) {
    console.error('Delete publication error:', error);
    if (error.code === 'P2025') { // Prisma Not Found error
      return res.status(404).json({ error: true, message: 'Publication not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete publication.' });
  }
});

// Get all authors
router.get('/authors/all', async (req, res) => {
  try {
    const authors = await prisma.author.findMany({ orderBy: { name: 'asc' } });
    res.json({ error: false, data: authors });
  } catch (error) {
    console.error('Get authors error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to fetch authors.' });
  }
});

// Create author (authenticated)
router.post('/authors', authenticateToken, [
  body('name').notEmpty().withMessage('Author name is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { name, email, affiliation } = req.body;
    const newAuthor = await prisma.author.create({
      data: {
        name,
        email,
        affiliation,
      }
    });
    res.status(201).json({ error: false, data: newAuthor });
  } catch (error) {
    console.error('Create author error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to create author.' });
  }
});

// Update author (authenticated)
router.put('/authors/:id', authenticateToken, [
  body('name').notEmpty().withMessage('Author name is required').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { id } = req.params;
    const { name, email, affiliation } = req.body;

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: {
        name,
        email,
        affiliation,
      },
    });
    res.json({ error: false, data: updatedAuthor });
  } catch (error) {
    console.error('Update author error:', error);
    if (error.code === 'P2025') { // Prisma Not Found error
      return res.status(404).json({ error: true, message: 'Author not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to update author.' });
  }
});

// Delete author (authenticated)
router.delete('/authors/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.author.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Delete author error:', error);
    if (error.code === 'P2025') { // Prisma Not Found error
      return res.status(404).json({ error: true, message: 'Author not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete author.' });
  }
});

// Get all categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await prisma.researchCategory.findMany({ orderBy: { name: 'asc' } });
    res.json({ error: false, data: categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to fetch categories.' });
  }
});

// Create category (authenticated)
router.post('/categories', authenticateToken, [
  body('name').notEmpty().withMessage('Category name is required'),
  body('slug').notEmpty().withMessage('Slug is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { name, slug, description } = req.body;
    const newCategory = await prisma.researchCategory.create({
      data: {
        name,
        slug,
        description,
      }
    });
    res.status(201).json({ error: false, data: newCategory });
  } catch (error) {
    console.error('Create category error:', error);
    if (error.code === 'P2002') { // Prisma unique constraint failed
      return res.status(400).json({ error: true, message: 'A category with this slug or name already exists.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to create category.' });
  }
});

// Update category (authenticated)
router.put('/categories/:id', authenticateToken, [
  body('name').notEmpty().withMessage('Category name is required').optional(),
  body('slug').notEmpty().withMessage('Slug is required').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    const updatedCategory = await prisma.researchCategory.update({
      where: { id },
      data: {
        name,
        slug,
        description,
      },
    });
    res.json({ error: false, data: updatedCategory });
  } catch (error) {
    console.error('Update category error:', error);
    if (error.code === 'P2025') { // Prisma Not Found error
      return res.status(404).json({ error: true, message: 'Category not found.' });
    }
    if (error.code === 'P2002') { // Prisma unique constraint failed
      return res.status(400).json({ error: true, message: 'A category with this slug or name already exists.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to update category.' });
  }
});

// Delete category (authenticated)
router.delete('/categories/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.researchCategory.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Delete category error:', error);
    if (error.code === 'P2025') { // Prisma Not Found error
      return res.status(404).json({ error: true, message: 'Category not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete category.' });
  }
});

export default router;