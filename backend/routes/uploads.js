import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import upload from '../middleware/upload.js';
import { authenticateToken } from '../middleware/auth.js';
import prisma from '../prisma/client.js';

const router = express.Router();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure upload directory
const uploadsDir = process.env.UPLOAD_DIR || join(__dirname, '../uploads');

// Upload image
router.post('/image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: true, message: 'No file uploaded' });
    }
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: true, message: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' });
    }
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (req.file.size > maxSize) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: true, message: 'File size must be less than 5MB.' });
    }
    // Get file path relative to uploads directory
    const relativePath = path.relative(uploadsDir, req.file.path);
    // Create URL for the file
    const fileUrl = `/uploads/${relativePath.replace(/\\/g, '/')}`;
    res.status(201).json({
      error: false,
      data: {
        url: fileUrl,
        path: relativePath,
        size: req.file.size,
        type: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ error: true, message: error.message || 'Server error' });
  }
});

// Upload PDF
router.post('/pdf', authenticateToken, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: true, message: 'No file uploaded' });
    }
    
    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      // Remove the uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: true, message: 'Only PDF files are allowed' });
    }
    
    // Get file path relative to uploads directory
    const relativePath = path.relative(uploadsDir, req.file.path);
    
    // Create URL for the file
    const fileUrl = `/uploads/${relativePath.replace(/\\/g, '/')}`;
    
    res.status(201).json({
      error: false,
      data: {
        url: fileUrl,
        path: relativePath,
        size: req.file.size,
        type: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Upload PDF error:', error);
    res.status(500).json({ error: true, message: error.message || 'Server error' });
  }
});

// Upload project media
router.post('/project-media/:projectId', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { projectId } = req.params;
    const { fileType, caption } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: true, message: 'No file uploaded' });
    }
    
    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });
    
    if (!project) {
      // Remove the uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: true, message: 'Project not found' });
    }
    
    // Get file path relative to uploads directory
    const relativePath = path.relative(uploadsDir, req.file.path);
    
    // Create URL for the file
    const fileUrl = `/uploads/${relativePath.replace(/\\/g, '/')}`;
    
    // Determine media type
    let mediaType = 'document';
    if (req.file.mimetype.startsWith('image/')) {
      mediaType = 'image';
    }
    
    // Create project media record
    const media = await prisma.projectMedia.create({
      data: {
        projectId,
        fileUrl,
        fileType: fileType || mediaType,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        caption
      }
    });
    
    res.status(201).json({
      error: false,
      data: media
    });
  } catch (error) {
    console.error('Upload project media error:', error);
    res.status(500).json({ error: true, message: error.message || 'Server error' });
  }
});

export default router;