import api from './api';

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
    try {
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
    } catch (error) {
      console.error('Error fetching publications:', error);
      throw error;
    }
  },

  // Get single publication
  async getPublication(id: string) {
    try {
      const response = await api.get(`/publications/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching publication:', error);
      throw error;
    }
  },

  // Create publication
  async createPublication(publication: Omit<Publication, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const response = await api.post('/publications', publication);
      return response.data.data;
    } catch (error) {
      console.error('Error creating publication:', error);
      throw error;
    }
  },

  // Update publication
  async updatePublication(id: string, updates: Partial<Publication>) {
    try {
      const response = await api.put(`/publications/${id}`, updates);
      return response.data.data;
    } catch (error) {
      console.error('Error updating publication:', error);
      throw error;
    }
  },

  // Delete publication
  async deletePublication(id: string) {
    try {
      await api.delete(`/publications/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting publication:', error);
      throw error;
    }
  },

  // Add authors to publication
  async addAuthorsToPublication(publicationId: string, authorIds: string[]) {
    try {
      // This is now handled in the update publication endpoint
      const response = await api.put(`/publications/${publicationId}`, {
        authorIds
      });
      return response.data.data;
    } catch (error) {
      console.error('Error adding authors to publication:', error);
      throw error;
    }
  },

  // Remove authors from publication
  async removeAuthorsFromPublication(publicationId: string) {
    try {
      // This is now handled in the update publication endpoint
      const response = await api.put(`/publications/${publicationId}`, {
        authorIds: []
      });
      return response.data.data;
    } catch (error) {
      console.error('Error removing authors from publication:', error);
      throw error;
    }
  },
}

// Authors API using Supabase
export const authorsApi = {
  // Get all authors
  async getAuthors() {
    try {
      const response = await api.get('/publications/authors/all');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
  },

  // Create author
  async createAuthor(author: Omit<Author, 'id' | 'created_at'>) {
    try {
      const response = await api.post('/publications/authors', author);
      return response.data.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  },
}

// Categories API using Supabase
export const categoriesApi = {
  // Get all categories
  async getCategories() {
    try {
      const response = await api.get('/publications/categories/all');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
}