// Navigation Types
export interface NavItem {
  name: string;
  path: string;
  hasDropdown: boolean;
  key: string;
}

export interface DropdownItem {
  name: string;
  path: string;
  description: string;
}

export interface DropdownItems {
  [key: string]: DropdownItem[];
}

// Publication Types
export interface Author {
  id: string;
  name: string;
  email?: string;
  affiliation?: string;
}

export interface PublicationAuthor {
  id: string;
  author_order: number;
  authors: Author;
}

export interface ResearchCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  abstract?: string;
  journal?: string;
  publication_year?: number;
  publication_type: string;
  doi?: string;
  citations: number;
  is_featured: boolean;
  pdf_url?: string;
  category_id?: string;
  research_categories?: ResearchCategory;
  publication_authors?: PublicationAuthor[];
}

// Program Types
export interface Program {
  id: string;
  title: string;
  slug: string;
  description?: string;
  location?: string;
  status: string;
  is_featured: boolean;
  budget?: string;
  beneficiaries?: string;
  duration?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Team Member Types
export interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
  expertise: string[];
  education: string;
  social: {
    email: string;
    linkedin: string;
    twitter: string;
  };
}

// Value Types
export interface Value {
  icon: any; // Lucide icon component
  title: string;
  description: string;
}

// Milestone Types
export interface Milestone {
  year: string;
  title: string;
  description: string;
  impact: string;
  color: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading?: boolean;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Filter Types
export interface FilterOptions {
  category?: string;
  status?: string;
  search?: string;
  year?: number;
}

// Pagination Types
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
} 