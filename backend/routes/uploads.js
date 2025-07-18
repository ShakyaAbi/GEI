import express from 'express';
import path from 'path';
import fs from 'fs';
import { uploadConfig } from '../config/upload.js';
import upload, { uploadLimiter, handleUploadError } from '../middleware/upload.js';
import { authenticateToken } from '../middleware/auth.js';
import prisma from '../prisma/client.js';

const router = express.Router();

// Helper function to validate and process uploaded file
const processUploadedFile = (file, allowedTypes, maxSize) => {
  // Validate file existence
  if (!file) {
    throw new Error('No file uploaded');
  }

  // Validate file type
  if (!allowedTypes.includes(file.mimetype)) {
    fs.unlink(file.path, () => {});
    throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
  }

  // Validate file size
  if (file.size > maxSize) {
    fs.unlink(file.path, () => {});
    throw new Error(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
  }

  // Get file path relative to uploads directory
  const relativePath = path.relative(uploadConfig.baseDir, file.path);
  
  // Create URL for the file
  const fileUrl = `/uploads/${relativePath.replace(/\\/g, '/')}`;

  return {
    url: fileUrl,
    path: relativePath,
    size: file.size,
    type: file.mimetype
  };
};

// Upload image
router.post(
  '/image',
  authenticateToken,
  uploadLimiter,
  upload.single('image'),
  handleUploadError,
  async (req, res) => {
    try {
      // Support folder-based subdirectory
      const folder = req.body.folder ? req.body.folder.replace(/[^a-zA-Z0-9/_-]/g, '') : '';
      let uploadPath = uploadConfig.baseDir;
      if (folder) {
        uploadPath = path.join(uploadConfig.baseDir, folder);
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
      }
      // Move file to the correct folder if needed
      if (folder && req.file) {
        const newPath = path.join(uploadPath, req.file.filename);
        fs.renameSync(req.file.path, newPath);
        req.file.path = newPath;
      }
      // Validate and process file
      const fileData = processUploadedFile(
        req.file,
        uploadConfig.allowedTypes.image,
        uploadConfig.maxSizes.image
      );
      // Return the correct URL
      const fileUrl = `/uploads/${folder ? folder + '/' : ''}${req.file.filename}`;
      res.status(201).json({
        error: false,
        data: { ...fileData, url: fileUrl }
      });
    } catch (error) {
      console.error('Upload image error:', error);
      res.status(400).json({ error: true, message: error.message });
    }
  }
);

// Upload PDF
router.post(
  '/pdf',
  authenticateToken,
  uploadLimiter,
  upload.single('pdf'),
  handleUploadError,
  async (req, res) => {
    try {
      const fileData = processUploadedFile(
        req.file,
        uploadConfig.allowedTypes.pdf,
        uploadConfig.maxSizes.pdf
      );
      
      res.status(201).json({
        error: false,
        data: fileData
      });
    } catch (error) {
      console.error('Upload PDF error:', error);
      res.status(400).json({ error: true, message: error.message });
    }
  }
);

// Upload project media
router.post(
  '/project-media/:projectId',
  authenticateToken,
  uploadLimiter,
  upload.single('file'),
  handleUploadError,
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const { fileType, caption } = req.body;
      
      // Check if project exists
      const project = await prisma.project.findUnique({
        where: { id: projectId }
      });
      
      if (!project) {
        if (req.file) {
          fs.unlink(req.file.path, () => {});
        }
        return res.status(404).json({ error: true, message: 'Project not found' });
      }
      
      // Process the uploaded file
      const fileData = processUploadedFile(
        req.file,
        [
          ...uploadConfig.allowedTypes.image,
          ...uploadConfig.allowedTypes.pdf,
          ...uploadConfig.allowedTypes.document
        ],
        Math.max(...Object.values(uploadConfig.maxSizes))
      );
      
      // Determine media type
      let mediaType = 'document';
      if (req.file.mimetype.startsWith('image/')) {
        mediaType = 'image';
      }
      
      // Create project media record
      const media = await prisma.projectMedia.create({
        data: {
          projectId,
          fileUrl: fileData.url,
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
      res.status(400).json({ error: true, message: error.message });
    }
  }
);

// Delete project media
router.delete(
  '/project-media/:projectId/:mediaId',
  authenticateToken,
  async (req, res) => {
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
      const media = await prisma.projectMedia.findUnique({
        where: { id: mediaId }
      });
      
      if (!media) {
        return res.status(404).json({ error: true, message: 'Media not found' });
      }
      
      // Delete file from filesystem
      const filePath = path.join(uploadConfig.baseDir, media.fileUrl.replace('/uploads/', ''));
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      }
      
      // Delete media record
      await prisma.projectMedia.delete({
        where: { id: mediaId }
      });
      
      res.status(204).send();
    } catch (error) {
      console.error('Delete project media error:', error);
      res.status(500).json({ error: true, message: 'Failed to delete media' });
    }
  }
);

export default router;