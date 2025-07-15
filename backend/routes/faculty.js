import express from 'express';
import prisma from '../prisma/client.js';
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
    res.json({ data: faculty.map(mapFaculty) });
  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET one faculty
router.get('/:id', async (req, res) => {
  try {
    const member = await prisma.faculty.findUnique({ where: { id: req.params.id } });
    if (!member) return res.status(404).json({ error: 'Not found' });
    res.json({ data: mapFaculty(member) });
  } catch (error) {
    console.error('Get faculty by id error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE faculty
router.post('/', async (req, res) => {
  try {
    const { name, title, photo, linkedin } = req.body;
    if (!name || !title) {
      return res.status(400).json({ error: 'Name and title are required' });
    }
    const newMember = await prisma.faculty.create({
      data: {
        name,
        title,
        image: photo,
        linkedin_url: linkedin,
      }
    });
    res.status(201).json({ data: mapFaculty(newMember) });
  } catch (error) {
    console.error('Create faculty error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE faculty
router.put('/:id', async (req, res) => {
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
    res.json({ data: mapFaculty(updatedMember) });
  } catch (error) {
    console.error('Update faculty error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE faculty
router.delete('/:id', async (req, res) => {
  try {
    await prisma.faculty.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    console.error('Delete faculty error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 