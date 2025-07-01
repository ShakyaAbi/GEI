// File upload utilities for handling PDF uploads
import api from './api';

export interface UploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
}

export class FileUploadService {
  private static instance: FileUploadService;
  
  static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }

  async uploadPDF(
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<UploadResult> {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('pdf', file);

      // Upload file
      const response = await api.post('/uploads/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress?.(percentCompleted);
          }
        }
      });

      return response.data.data;
    } catch (error) {
      console.error('Error uploading PDF:', error);
      throw error;
    }
  }

  validatePDF(file: File): { valid: boolean; error?: string } {
    // Check file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return { valid: false, error: 'Please select a PDF file' };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 10MB' };
    }

    // Check if file is not empty
    if (file.size === 0) {
      return { valid: false, error: 'File cannot be empty' };
    }

    return { valid: true };
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const fileUploadService = FileUploadService.getInstance();