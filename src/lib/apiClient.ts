import type { Publication, Author, ResearchCategory } from './supabase';

const API_BASE_URL = 'http://localhost:4000/api';

// Publications API
export const publicationsApi = {
  // Get all publications with filters
  async getPublications(filters?: {
    category?: string;
    year?: number;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) {
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

    const response = await fetch(`${API_BASE_URL}/publications?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch publications');
    }
    return response.json() as Promise<Publication[]>;
  },

  // Get single publication
  async getPublication(id: string) {
    const response = await fetch(`${API_BASE_URL}/publications/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch publication');
    }
    return response.json() as Promise<Publication>;
  },

  // Create publication
  async createPublication(publication: Omit<Publication, 'id' | 'created_at' | 'updated_at'>) {
    const response = await fetch(`${API_BASE_URL}/publications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publication),
    });
    if (!response.ok) {
      throw new Error('Failed to create publication');
    }
    return response.json() as Promise<Publication>;
  },

  // Update publication
  async updatePublication(id: string, updates: Partial<Publication>) {
    const response = await fetch(`${API_BASE_URL}/publications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update publication');
    }
    return response.json() as Promise<Publication>;
  },

  // Delete publication
  async deletePublication(id: string) {
    const response = await fetch(`${API_BASE_URL}/publications/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete publication');
    }
  },

  // Add authors to publication
  async addAuthorsToPublication(publicationId: string, authorIds: string[]) {
    const response = await fetch(`${API_BASE_URL}/publications/${publicationId}/authors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorIds }),
    });
    if (!response.ok) {
      throw new Error('Failed to add authors to publication');
    }
  },

  // Remove authors from publication
  async removeAuthorsFromPublication(publicationId: string) {
    const response = await fetch(`${API_BASE_URL}/publications/${publicationId}/authors`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove authors from publication');
    }
  },
};

// Authors API
export const authorsApi = {
  // Get all authors
  async getAuthors() {
    const response = await fetch(`${API_BASE_URL}/authors`);
    if (!response.ok) {
      throw new Error('Failed to fetch authors');
    }
    return response.json() as Promise<Author[]>;
  },

  // Create author
  async createAuthor(author: Omit<Author, 'id' | 'created_at'>) {
    const response = await fetch(`${API_BASE_URL}/authors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    });
    if (!response.ok) {
      throw new Error('Failed to create author');
    }
    return response.json() as Promise<Author>;
  },
};

// Categories API
export const categoriesApi = {
  // Get all categories
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json() as Promise<ResearchCategory[]>;
  },
}; 