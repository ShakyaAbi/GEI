import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadConfig } from '../config/upload.js';
import rateLimit from 'express-rate-limit';

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadConfig.baseDir)) {
  fs.mkdirSync(uploadConfig.baseDir, { recursive: true });
}

// Create subdirectories
Object.values(uploadConfig.subDirs).forEach(subDir => {
  const dir = path.join(uploadConfig.baseDir, subDir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to get total directory size
const getDirSize = (dir) => {
  let size = 0;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      size += stats.size;
    } else if (stats.isDirectory()) {
      size += getDirSize(filePath);
    }
  });
  return size;
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Check total upload directory size
      const totalSize = getDirSize(uploadConfig.baseDir);
      if (totalSize > uploadConfig.maxTotalSize) {
        return cb(new Error('Upload directory is full'));
      }

      // Determine subdirectory based on file type
      let subDir = uploadConfig.subDirs.misc;
      
      if (file.mimetype.startsWith('image/')) {
        subDir = uploadConfig.subDirs.images;
      } else if (file.mimetype === 'application/pdf') {
        subDir = uploadConfig.subDirs.pdfs;
      } else if (file.mimetype.startsWith('video/')) {
        subDir = uploadConfig.subDirs.videos;
      } else if (file.mimetype.startsWith('audio/')) {
        subDir = uploadConfig.subDirs.audio;
      } else if (uploadConfig.allowedTypes.document.includes(file.mimetype)) {
        subDir = uploadConfig.subDirs.documents;
      }
      
      const dir = path.join(uploadConfig.baseDir, subDir);
      cb(null, dir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    try {
      // Generate a unique filename with timestamp and random string
      const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(2);
      const ext = path.extname(file.originalname).toLowerCase();
      const filename = file.fieldname + '-' + uniqueSuffix + ext;
      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  try {
    // Get maximum file size based on type
    let maxSize = uploadConfig.maxSizes.document; // default
    if (file.mimetype.startsWith('image/')) {
      maxSize = uploadConfig.maxSizes.image;
    } else if (file.mimetype === 'application/pdf') {
      maxSize = uploadConfig.maxSizes.pdf;
    }

    // Check file size (approximate check before actual upload)
    if (parseInt(req.headers['content-length']) > maxSize) {
      return cb(new Error('File too large'));
    }

    // Check file type
    const isAllowed = 
      uploadConfig.allowedTypes.image.includes(file.mimetype) ||
      uploadConfig.allowedTypes.pdf.includes(file.mimetype) ||
      uploadConfig.allowedTypes.document.includes(file.mimetype);

    if (!isAllowed) {
      return cb(new Error('File type not allowed'));
    }

    cb(null, true);
  } catch (error) {
    cb(error);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: Math.max(...Object.values(uploadConfig.maxSizes))
  }
});

// Rate limiting middleware
export const uploadLimiter = rateLimit({
  windowMs: uploadConfig.rateLimit.windowMs,
  max: uploadConfig.rateLimit.max,
  message: { error: true, message: 'Too many upload requests' }
});

// Error handling middleware
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: true, message: 'File too large' });
    }
    return res.status(400).json({ error: true, message: err.message });
  }
  
  if (err) {
    // Clean up any partially uploaded files
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    return res.status(500).json({ error: true, message: err.message });
  }
  
  next();
};

export default upload;