// Prisma-based types that match the database schema
export interface ResearchCategory {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  publications?: Publication[]
}

export interface Author {
  id: string
  name: string
  email?: string
  affiliation?: string
  bio?: string
  createdAt: string
  publicationAuthors?: PublicationAuthor[]
}

export interface Publication {
  id: string
  title: string
  abstract?: string
  journal?: string
  publicationYear?: number
  publicationType: string
  doi?: string
  pdfUrl?: string
  citations: number
  categoryId?: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  category?: ResearchCategory
  publicationAuthors?: PublicationAuthor[]
}

export interface PublicationAuthor {
  id: string
  publicationId: string
  authorId: string
  authorOrder: number
  createdAt: string
  publication?: Publication
  author?: Author
}

// API request/response types
export interface CreatePublicationRequest {
  title: string
  abstract?: string
  journal?: string
  publicationYear?: number
  publicationType?: string
  doi?: string
  pdfUrl?: string
  citations?: number
  categoryId?: string
  isFeatured?: boolean
  authorIds?: string[]
}

export interface UpdatePublicationRequest {
  title?: string
  abstract?: string
  journal?: string
  publicationYear?: number
  publicationType?: string
  doi?: string
  pdfUrl?: string
  citations?: number
  categoryId?: string
  isFeatured?: boolean
  authorIds?: string[]
}

export interface CreateAuthorRequest {
  name: string
  email?: string
  affiliation?: string
  bio?: string
} 