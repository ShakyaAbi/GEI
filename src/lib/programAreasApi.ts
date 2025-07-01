import api from './api';

export interface ProgramArea {
  id: string
  name: string
  slug: string
  description?: string
  hero_image?: string
  seo_title?: string
  seo_description?: string
  order_index: number
  created_at: string
  updated_at: string
  team_members?: ProgramAreaTeamMember[]
  partners?: ProgramAreaPartner[]
  projects?: Project[]
}

export interface Project {
  id: string
  program_area_id: string
  title: string
  description?: string
  location?: string
  duration?: string
  status: string
  budget?: string
  beneficiaries?: string
  impact_metrics?: string[]
  image?: string
  order_index: number
  created_at: string
}

export interface ProgramAreaTeamMember {
  id: string
  program_area_id: string
  name: string
  title?: string
  role?: string
  image?: string
  email?: string
  bio?: string
  order_index: number
  created_at: string
}

export interface ProgramAreaPartner {
  id: string
  program_area_id: string
  name: string
  logo?: string
  website?: string
  description?: string
  order_index: number
  created_at: string
}

// Program Areas API
export const programAreasApi = {
  // Get all program areas
  async getProgramAreas(filters?: {
    limit?: number;
    offset?: number;
  }) {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (filters?.limit) {
        params.append('limit', filters.limit.toString());
      }
      
      if (filters?.offset) {
        params.append('offset', filters.offset.toString());
      }
      
      const response = await api.get(`/program-areas?${params.toString()}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching program areas:', error);
      throw error;
    }
  },

  // Get single program area with all related data
  async getProgramArea(slug: string) {
    try {
      const response = await api.get(`/program-areas/${slug}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching program area:', error);
      throw error;
    }
  },

  // Create program area
  async createProgramArea(programArea: Omit<ProgramArea, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const response = await api.post('/program-areas', programArea);
      return response.data.data;
    } catch (error) {
      console.error('Error creating program area:', error);
      throw error;
    }
  },

  // Update program area
  async updateProgramArea(id: string, updates: Partial<ProgramArea>) {
    try {
      const response = await api.put(`/program-areas/${id}`, updates);
      return response.data.data;
    } catch (error) {
      console.error('Error updating program area:', error);
      throw error;
    }
  },

  // Delete program area
  async deleteProgramArea(id: string) {
    try {
      await api.delete(`/program-areas/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting program area:', error);
      throw error;
    }
  }
}

// Projects API
export const projectsApi = {
  // Get projects by program area
  async getProjectsByProgramArea(programAreaId: string) {
    try {
      const response = await api.get(`/projects?programAreaId=${programAreaId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching projects by program area:', error);
      throw error;
    }
  },

  // Create project
  async createProject(project: Omit<Project, 'id' | 'created_at'>) {
    try {
      const response = await api.post('/projects', project);
      return response.data.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update project
  async updateProject(id: string, updates: Partial<Project>) {
    try {
      const response = await api.put(`/projects/${id}`, updates);
      return response.data.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  async deleteProject(id: string) {
    try {
      await api.delete(`/projects/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
      return false;
    }
  }
}

export async function fetchProgramAreas(options?: {
  sortBy?: 'name' | 'order_index' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}) {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (options?.search) {
      params.append('search', options.search);
    }
    
    if (options?.sortBy) {
      params.append('sortBy', options.sortBy);
    }
    
    if (options?.sortOrder) {
      params.append('sortOrder', options.sortOrder);
    }
    
    const response = await api.get(`/program-areas?${params.toString()}`);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('Error fetching program areas:', error);
    return { data: null, error };
  }
}