import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadConfig = {
  // Base upload directory
  baseDir: process.env.UPLOAD_DIR || join(__dirname, '../../uploads'),
  
  // Maximum file sizes (in bytes)
  maxSizes: {
    image: 5 * 1024 * 1024,    // 5MB
    pdf: 10 * 1024 * 1024,     // 10MB
    document: 15 * 1024 * 1024, // 15MB
    video: 50 * 1024 * 1024,   // 50MB
    audio: 20 * 1024 * 1024    // 20MB
  },

  // Allowed file types
  allowedTypes: {
    image: ['image/jpeg', 'image/png', 'image/webp'],
    pdf: ['application/pdf'],
    document: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint'
    ]
  },

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Maximum total upload directory size (in bytes)
  maxTotalSize: 10 * 1024 * 1024 * 1024, // 10GB
  
  // Subdirectories
  subDirs: {
    images: 'images',
    pdfs: 'pdfs',
    documents: 'documents',
    videos: 'videos',
    audio: 'audio',
    misc: 'misc'
  }
}; 