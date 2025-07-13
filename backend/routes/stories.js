import express from 'express';
import prisma from '../prisma/client.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all stories
router.get('/', async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// GET a single story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await prisma.story.findUnique({
      where: { id: req.params.id },
    });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// POST a new story (Admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const newStory = await prisma.story.create({
      data: req.body,
    });
    res.status(201).json(newStory);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create story' });
  }
});

// PUT to update a story (Admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const updatedStory = await prisma.story.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(updatedStory);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update story' });
  }
});

// DELETE a story (Admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await prisma.story.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete story' });
  }
});

export default router;
