import api from './api';
import type { 
  Project, 
  ProjectCustomField, 
  ProjectWithCustomFields,
  ProjectTeamMember, 
  ProjectMedia, 
  ProjectStakeholder, 
  ProjectUpdate,
  ProjectFormData
} from '../types/project';

export class ProjectsAPI {
  async getProjects(): Promise<Project[]> {
    try {
      const response = await api.get('/projects');
      return response.data.data || [];
    } catch (error) {
      console.error('Error in getProjects:', error);
      return [];
    }
  }

  async getProject(id: string): Promise<Project | null> {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error in getProject:', error);
      return null;
    }
  }

  async getProjectBySlug(slug: string): Promise<{ data: Project | null; error: any }> {
    try {
      const response = await api.get(`/projects/slug/${slug}`);
      return { data: response.data.data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async createProject(projectData: ProjectFormData): Promise<Project | null> {
    try {
      const response = await api.post('/projects', projectData);
      return response.data.data;
    } catch (error) {
      console.error('Error in createProject:', error);
      return null;
    }
  }

  async updateProject(id: string, projectData: Partial<ProjectFormData>): Promise<Project | null> {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data.data;
    } catch (error) {
      console.error('Error in updateProject:', error);
      return null;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      await api.delete(`/projects/${id}`);
      return true;
    } catch (error) {
      console.error('Error in deleteProject:', error);
      return false;
    }
  }

  async uploadProjectMedia(projectId: string, file: File): Promise<string | null> {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload file
      const response = await api.post(`/uploads/project-media/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data.fileUrl;
    } catch (error) {
      console.error('Error in uploadProjectMedia:', error);
      return null;
    }
  }
}

export async function fetchProjects() {
  try {
    const response = await api.get('/projects');
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { data: null, error };
  }
}

export async function fetchProjectBySlug(slug: string) {
  try {
    const response = await api.get(`/projects/slug/${slug}`);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return { data: null, error };
  }
}

export async function fetchProjectWithCustomFields(id: string): Promise<{ data: ProjectWithCustomFields | null, error: any }> {
  try {
    const response = await api.get(`/projects/${id}`);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('Error fetching project with custom fields:', error);
    return { data: null, error };
  }
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function createProject(project: Omit<Project, 'id' | 'created_at'>) {
  try {
    // Generate slug if not provided
    if (!project.slug && project.title) {
      project.slug = generateSlug(project.title);
    }
    
    const response = await api.post('/projects', project);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('Error creating project:', error);
    return { data: null, error };
  }
}

export async function updateProject(id: string, project: Partial<Project>) {
  try {
    // Update slug if title changed
    if (project.title && !project.slug) {
      project.slug = generateSlug(project.title);
    }
    
    const response = await api.put(`/projects/${id}`, project);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('Error updating project:', error);
    return { data: null, error };
  }
}

// Custom Fields API
export async function fetchProjectCustomFields(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return { data: response.data.data.customFields, error: null };
  } catch (error) {
    console.error('Error fetching project custom fields:', error);
    return { data: null, error };
  }
}

export async function createProjectCustomField(customField: Omit<ProjectCustomField, 'id' | 'created_at'>) {
  try {
    const response = await api.post(`/projects/${customField.project_id}/custom-fields`, {
      fieldName: customField.field_name,
      fieldValue: customField.field_value,
      fieldType: customField.field_type
    });
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('Error creating project custom field:', error);
    return { data: null, error };
  }
}

export async function updateProjectCustomField(id: string, customField: Partial<ProjectCustomField>) {
  try {
    const response = await api.put(`/projects/custom-fields/${id}`, customField);
    return { data: response.data.data, error: null };
  } catch (error) {
    console.error('Error updating project custom field:', error);
    return { data: null, error };
  }
}

export async function deleteProjectCustomField(id: string) {
  try {
    await api.delete(`/projects/custom-fields/${id}`);
    return { data: true, error: null };
  } catch (error) {
    console.error('Error deleting project custom field:', error);
    return { data: null, error };
  }
}

// Project Media API
export async function fetchProjectMedia(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return { data: response.data.data.media, error: null };
  } catch (error) {
    console.error('Error fetching project media:', error);
    return { data: null, error };
  }
}

// Project Team Members API
export async function fetchProjectTeamMembers(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return { 
      data: response.data.data.stakeholders.filter(
        (s: any) => s.type === 'team_member'
      ), 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching project team members:', error);
    return { data: null, error };
  }
}

// Project Partners API
export async function fetchProjectPartners(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return { 
      data: response.data.data.stakeholders.filter(
        (s: any) => s.type === 'partner'
      ), 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching project partners:', error);
    return { data: null, error };
  }
}

export async function fetchProjectContent(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/content`);
    return { data: response.data.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createProjectContent(projectId: string, contentData: any) {
  try {
    const response = await api.post(`/projects/${projectId}/content`, contentData);
    return { data: response.data.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateProjectContent(contentId: string, contentData: any) {
  try {
    const response = await api.put(`/projects/content/${contentId}`, contentData);
    return { data: response.data.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteProjectContent(contentId: string) {
  try {
    await api.delete(`/projects/content/${contentId}`);
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export const projectsApi = new ProjectsAPI();