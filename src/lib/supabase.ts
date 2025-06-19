// This file now only contains shared types. All database access uses postgres.ts

export interface ResearchCategory {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
}

export interface Author {
  id: string
  name: string
  email?: string
  affiliation?: string
  bio?: string
  created_at: string
}

export interface Publication {
  id: string
  title: string
  abstract?: string
  journal?: string
  publication_year?: number
  publication_type: string
  doi?: string
  pdf_url?: string
  citations: number
  category_id?: string
  is_featured: boolean
  created_at: string
  updated_at: string
  research_categories?: ResearchCategory
  publication_authors?: Array<{
    author_order: number
    authors: Author
  }>
}

export interface PublicationAuthor {
  id: string
  publication_id: string
  author_id: string
  author_order: number
  created_at: string
}