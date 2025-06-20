import { supabase } from './supabase'
import type { Publication, Author, ResearchCategory } from './supabase'

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
    let query = supabase
      .from('publications')
      .select(`
        *,
        research_categories(*),
        publication_authors(
          author_order,
          authors(*)
        )
      `)
      .order('publication_year', { ascending: false })

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('research_categories.slug', filters.category)
    }
    if (filters?.year) {
      query = query.eq('publication_year', filters.year)
    }
    if (filters?.featured !== undefined) {
      query = query.eq('is_featured', filters.featured)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Publication[]
  },

  // Get single publication
  async getPublication(id: string) {
    const { data, error } = await supabase
      .from('publications')
      .select(`
        *,
        research_categories(*),
        publication_authors(
          author_order,
          authors(*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Publication
  },

  // Create publication
  async createPublication(publication: Omit<Publication, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('publications')
      .insert(publication)
      .select()
      .single()

    if (error) throw error
    return data as Publication
  },

  // Update publication
  async updatePublication(id: string, updates: Partial<Publication>) {
    const { data, error } = await supabase
      .from('publications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Publication
  },

  // Delete publication
  async deletePublication(id: string) {
    const { error } = await supabase
      .from('publications')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Add authors to publication
  async addAuthorsToPublication(publicationId: string, authorIds: string[]) {
    const authorData = authorIds.map((authorId, index) => ({
      publication_id: publicationId,
      author_id: authorId,
      author_order: index + 1
    }))

    const { error } = await supabase
      .from('publication_authors')
      .insert(authorData)

    if (error) throw error
  },

  // Remove authors from publication
  async removeAuthorsFromPublication(publicationId: string) {
    const { error } = await supabase
      .from('publication_authors')
      .delete()
      .eq('publication_id', publicationId)

    if (error) throw error
  },
}

// Authors API using Supabase
export const authorsApi = {
  // Get all authors
  async getAuthors() {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('name')

    if (error) throw error
    return data as Author[]
  },

  // Create author
  async createAuthor(author: Omit<Author, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('authors')
      .insert(author)
      .select()
      .single()

    if (error) throw error
    return data as Author
  },
}

// Categories API using Supabase
export const categoriesApi = {
  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('research_categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data as ResearchCategory[]
  },
}