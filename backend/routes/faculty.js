import express from 'express';
import prisma from '../prisma/client.js';
import { body, validationResult } from 'express-validator'; // New import

const router = express.Router();

// Map DB fields to API fields
function mapFaculty(member) {
  if (!member) return member;
  return {
    id: member.id,
    name: member.name,
    title: member.title,
    photo: member.image,
    linkedin: member.linkedin_url,
    createdAt: member.created_at,
    updatedAt: member.updated_at,
  };
}

// GET all faculty
router.get('/', async (req, res) => {
  try {
    const faculty = await prisma.faculty.findMany({ orderBy: { created_at: 'desc' } });
    res.json({ error: false, data: faculty.map(mapFaculty) }); // Standardize response
  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to fetch faculty.' });
  }
});

// GET one faculty
router.get('/:id', async (req, res) => {
  try {
    const member = await prisma.faculty.findUnique({ where: { id: req.params.id } });
    if (!member) return res.status(404).json({ error: true, message: 'Faculty member not found' }); // Standardize 404
    res.json({ error: false, data: mapFaculty(member) }); // Standardize response
  } catch (error) {
    console.error('Get faculty by id error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to fetch faculty member.' });
  }
});

// CREATE faculty
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('title').notEmpty().withMessage('Title is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { name, title, photo, linkedin } = req.body;
    // Removed manual validation: if (!name || !title) {
    //   return res.status(400).json({ error: 'Name and title are required' });
    // }
    const newMember = await prisma.faculty.create({
      data: {
        name,
        title,
        image: photo,
        linkedin_url: linkedin,
      }
    });
    res.status(201).json({ error: false, data: mapFaculty(newMember) }); // Standardize response
  } catch (error) {
    console.error('Create faculty error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to create faculty member.' });
  }
});

// UPDATE faculty
router.put('/:id', [
  body('name').notEmpty().withMessage('Name is required').optional(),
  body('title').notEmpty().withMessage('Title is required').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }
  try {
    const { name, title, photo, linkedin } = req.body;
    const updatedMember = await prisma.faculty.update({
      where: { id: req.params.id },
      data: {
        name,
        title,
        image: photo,
        linkedin_url: linkedin,
        updated_at: new Date(),
      }
    });
    res.json({ error: false, data: mapFaculty(updatedMember) }); // Standardize response
  } catch (error) {
    console.error('Update faculty error:', error);
    res.status(500).json({ error: true, message: 'Server error: Failed to update faculty member.' });
  }
});

// DELETE faculty
router.delete('/:id', async (req, res) => {
  try {
    await prisma.faculty.delete({ where: { id: req.params.id } });
    res.status(204).send(); // Use send() for 204
  } catch (error) {
    console.error('Delete faculty error:', error);
    if (error.code === 'P2025') {
      // Prisma error for record not found (e.g., trying to delete a non-existent ID)
      return res.status(404).json({ error: true, message: 'Faculty member not found.' });
    }
    res.status(500).json({ error: true, message: 'Server error: Failed to delete faculty member.' });
  }
});

export default router; 