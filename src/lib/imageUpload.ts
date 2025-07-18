// Image upload utilities for handling program images
import api from './api';
import toast from 'react-hot-toast';

export interface ImageUploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
}

export class ImageUploadService {
  private static instance: ImageUploadService;
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second
  
  static getInstance(): ImageUploadService {
    if (!ImageUploadService.instance) {
      ImageUploadService.instance = new ImageUploadService();
    }
    return ImageUploadService.instance;
  }

  private async retryUpload(
    fn: () => Promise<any>,
    retriesLeft: number,
    error: any
  ): Promise<any> {
    if (retriesLeft === 0) {
      throw error;
    }

    await new Promise(resolve => setTimeout(resolve, this.retryDelay));
    return fn().catch(err => this.retryUpload(fn, retriesLeft - 1, err));
  }

  async uploadImage(
    file: File, 
    folder: string = 'programs',
    onProgress?: (progress: number) => void
  ): Promise<ImageUploadResult> {
    const upload = async () => {
      try {
        // Validate before upload
        const validation = await this.validateImage(file);
        if (!validation.valid) {
          throw new Error(validation.error);
        }

        // Create form data
        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', folder);

        // Upload file
        const response = await api.post('/uploads/image', formData, {
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

        // Ensure the response has the expected format
        const result = response.data.data;
        if (!result?.url) {
          throw new Error('Invalid response format from server');
        }

        // Ensure URL is absolute
        const url = new URL(result.url, window.location.origin);
        return {
          ...result,
          url: url.toString()
        };
      } catch (error: any) {
        // Handle specific error cases
        if (error.response?.status === 413) {
          throw new Error('File size too large. Please choose a smaller file.');
        }
        if (error.response?.status === 415) {
          throw new Error('File type not supported. Please choose a different file.');
        }
        if (error.message === 'Network Error') {
          throw new Error('Network error. Please check your connection and try again.');
        }
        
        // Re-throw the error with a user-friendly message
        const message = error.response?.data?.message || error.message || 'Failed to upload image';
        throw new Error(message);
      }
    };

    try {
      return await this.retryUpload(upload, this.maxRetries, null);
    } catch (error: any) {
      // Show error toast in production
      if (import.meta.env.PROD) {
        toast.error(error.message);
      }
      throw error;
    }
  }

  validateImage(file: File): Promise<{ valid: boolean; error?: string }> {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return Promise.resolve({ 
        valid: false, 
        error: 'Please select a valid image file (JPEG, PNG, or WebP)' 
      });
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return Promise.resolve({ 
        valid: false, 
        error: 'File size must be less than 5MB' 
      });
    }

    // Check if file is not empty
    if (file.size === 0) {
      return Promise.resolve({ 
        valid: false, 
        error: 'File cannot be empty' 
      });
    }

    // Check image dimensions
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 200 || img.height < 200) {
          resolve({
            valid: false,
            error: 'Image dimensions must be at least 200x200 pixels'
          });
        }
        if (img.width > 4000 || img.height > 4000) {
          resolve({
            valid: false,
            error: 'Image dimensions cannot exceed 4000x4000 pixels'
          });
        }
        resolve({ valid: true });
      };
      img.onerror = () => {
        resolve({
          valid: false,
          error: 'Failed to load image. Please try another file.'
        });
      };
      img.src = URL.createObjectURL(file);
    });
  }

  // Helper function to get asset URL
  getAssetUrl(path: string): string {
    if (!path) return '';
    
    // If it's already an absolute URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    // If it's a relative URL starting with /, append to origin
    if (path.startsWith('/')) {
      return new URL(path, window.location.origin).toString();
    }

    // If VITE_ASSET_URL is defined, use it
    const assetUrl = import.meta.env.VITE_ASSET_URL;
    if (assetUrl) {
      return new URL(path, assetUrl).toString();
    }

    // Fallback to current origin
    return new URL(path, window.location.origin).toString();
  }
}

export const imageUploadService = ImageUploadService.getInstance();