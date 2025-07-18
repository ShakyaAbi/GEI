import api from './api';
import { Publication, Author } from '../types';

// Publications API using Supabase
export const publicationsApi = {
  // Get all publications with filters
  async getPublications(filters?: {
    category?: string;
    year?: number;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (filters?.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    
    if (filters?.year) {
      params.append('year', filters.year.toString());
    }
    
    if (filters?.featured !== undefined) {
      params.append('featured', filters.featured.toString());
    }
    
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }
    
    if (filters?.offset) {
      params.append('offset', filters.offset.toString());
    }
    
    const response = await api.get(`/publications?${params.toString()}`);
    return response.data.data;
  },

  // Get single publication
  async getPublication(id: string) {
    const response = await api.get(`/publications/${id}`);
    return response.data.data;
  },

  // Create publication
  async createPublication(publication: Omit<Publication, 'id' | 'created_at' | 'updated_at'>) {
    const response = await api.post('/publications', publication);
    return response.data.data;
  },

  // Update publication
  async updatePublication(id: string, updates: Partial<Publication>) {
    const response = await api.put(`/publications/${id}`, updates);
    return response.data.data;
  },

  // Delete publication
  async deletePublication(id: string) {
    await api.delete(`/publications/${id}`);
    return true;
  },

  // Add authors to publication
  async addAuthorsToPublication(publicationId: string, authorIds: string[]) {
    // This is now handled in the update publication endpoint
    const response = await api.put(`/publications/${publicationId}`, {
      authorIds
    });
    return response.data.data;
  },

  // Remove authors from publication
  async removeAuthorsFromPublication(publicationId: string) {
    // This is now handled in the update publication endpoint
    const response = await api.put(`/publications/${publicationId}`, {
      authorIds: []
    });
    return response.data.data;
  },
}

// Authors API using Supabase
export const authorsApi = {
  // Get all authors
  async getAuthors() {
    const response = await api.get('/publications/authors/all');
    return response.data.data;
  },

  // Create author
  async createAuthor(author: Omit<Author, 'id' | 'created_at'>) {
    const response = await api.post('/publications/authors', author);
    return response.data.data;
  },
}

// Categories API using Supabase
export const categoriesApi = {
  // Get all categories
  async getCategories() {
    const response = await api.get('/publications/categories/all');
    return response.data.data;
  },
}