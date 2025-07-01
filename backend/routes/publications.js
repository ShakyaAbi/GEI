import express from 'express';
import prisma from '../prisma/client.js';
import { authenticateToken } from '../middleware/auth.js';

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
    res.status(500).json({ error: true, message: 'Server error' });
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
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Create publication (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      title, abstract, journal, publicationYear, publicationType, 
      doi, pdfUrl, citations, isFeatured, categoryId, authorIds 
    } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: true, message: 'Title is required' });
    }
    
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
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Update publication (authenticated)
router.put('/:id', authenticateToken, async (req, res) => {
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
    res.status(500).json({ error: true, message: 'Server error' });
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
    
    res.json({ error: false, message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Delete publication error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Get all categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await prisma.researchCategory.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    res.json({ error: false, data: categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Get all authors
router.get('/authors/all', async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    res.json({ error: false, data: authors });
  } catch (error) {
    console.error('Get authors error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

// Create author (authenticated)
router.post('/authors', authenticateToken, async (req, res) => {
  try {
    const { name, email, affiliation, bio } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: true, message: 'Name is required' });
    }
    
    // Create author
    const author = await prisma.author.create({
      data: {
        name,
        email,
        affiliation,
        bio
      }
    });
    
    res.status(201).json({ error: false, data: author });
  } catch (error) {
    console.error('Create author error:', error);
    res.status(500).json({ error: true, message: 'Server error' });
  }
});

export default router;