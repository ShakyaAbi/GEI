export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on_hold' | 'cancelled';

export interface Project {
  id: string;
  program_area_id?: string;
  title: string;
  description?: string;
  overview?: string;
  location?: string;
  duration?: string;
  status?: 'active' | 'completed' | 'on_hold' | 'cancelled';
  budget?: string;
  beneficiaries?: string;
  impact_metrics?: string[];
  image?: string;
  hero_image?: string;
  order_index?: number;
  start_date?: string;
  end_date?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  program_areas?: {
    id: string;
    name: string;
    slug?: string;
    description?: string;
    icon?: string;
  };
  project_media?: ProjectMedia[];
  project_stakeholders?: ProjectStakeholder[];
  project_updates?: ProjectUpdate[];
}

export interface ProjectCustomField {
  id: string;
  project_id: string;
  field_name: string;
  field_value: string;
  field_type: 'text' | 'number' | 'date' | 'boolean' | 'url' | 'email';
  created_at: string;
}

export interface ProjectWithCustomFields extends Project {
  custom_fields?: ProjectCustomField[];
  project_media?: ProjectMedia[];
  project_stakeholders?: ProjectStakeholder[];
  project_updates?: ProjectUpdate[];
  project_content?: ProjectContent[];
}

export interface ProjectTeamMember {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  created_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ProjectMedia {
  id: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  caption?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStakeholder {
  id: string;
  project_id: string;
  name: string;
  role: string;
  organization?: string;
  email?: string;
  phone?: string;
  created_at: string;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  title: string;
  description: string;
  update_date: string;
  created_at: string;
}

export interface ProjectContent {
  id: string;
  project_id: string;
  title: string;
  content: string;
  content_type: 'article' | 'documentation' | 'report' | 'overview';
  order_index: number;
  is_published: boolean;
  author?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  overview?: string;
  status: ProjectStatus;
  start_date?: string;
  end_date?: string;
  location?: string;
  duration?: string;
  budget?: string;
  program_area_id?: string;
  beneficiaries?: string;
  impact_metrics?: string[];
  order_index?: number;
  slug?: string;
  hero_image?: string;
}