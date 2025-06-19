import pool from './postgres';
import type { Publication, Author, ResearchCategory } from './supabase';

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
    let baseQuery = `
      SELECT p.*, 
        row_to_json(rc) as research_categories,
        (
          SELECT json_agg(pa) FROM (
            SELECT pa.author_order, row_to_json(a) as authors
            FROM publication_authors pa
            JOIN authors a ON pa.author_id = a.id
            WHERE pa.publication_id = p.id
            ORDER BY pa.author_order
          ) pa
        ) as publication_authors
      FROM publications p
      LEFT JOIN research_categories rc ON p.category_id = rc.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIdx = 1;
    if (filters?.category && filters.category !== 'all') {
      baseQuery += ` AND rc.slug = $${paramIdx++}`;
      params.push(filters.category);
    }
    if (filters?.year) {
      baseQuery += ` AND p.publication_year = $${paramIdx++}`;
      params.push(filters.year);
    }
    if (filters?.featured !== undefined) {
      baseQuery += ` AND p.is_featured = $${paramIdx++}`;
      params.push(filters.featured);
    }
    baseQuery += ' ORDER BY p.publication_year DESC';
    if (filters?.limit) {
      baseQuery += ` LIMIT $${paramIdx++}`;
      params.push(filters.limit);
    }
    if (filters?.offset) {
      baseQuery += ` OFFSET $${paramIdx++}`;
      params.push(filters.offset);
    }
    const { rows } = await pool.query(baseQuery, params);
    return rows as Publication[];
  },

  // Get single publication
  async getPublication(id: string) {
    const query = `
      SELECT p.*, 
        row_to_json(rc) as research_categories,
        (
          SELECT json_agg(pa) FROM (
            SELECT pa.author_order, row_to_json(a) as authors
            FROM publication_authors pa
            JOIN authors a ON pa.author_id = a.id
            WHERE pa.publication_id = p.id
            ORDER BY pa.author_order
          ) pa
        ) as publication_authors
      FROM publications p
      LEFT JOIN research_categories rc ON p.category_id = rc.id
      WHERE p.id = $1
      LIMIT 1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] as Publication;
  },

  // Create publication
  async createPublication(publication: Omit<Publication, 'id' | 'created_at' | 'updated_at'>) {
    const keys = Object.keys(publication);
    const values = Object.values(publication);
    const params = keys.map((_, i) => `$${i + 1}`);
    const query = `
      INSERT INTO publications (${keys.join(',')})
      VALUES (${params.join(',')})
      RETURNING *
    `;
    const { rows } = await pool.query(query, values);
    return rows[0] as Publication;
  },

  // Update publication
  async updatePublication(id: string, updates: Partial<Publication>) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const query = `
      UPDATE publications SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0] as Publication;
  },

  // Delete publication
  async deletePublication(id: string) {
    await pool.query('DELETE FROM publications WHERE id = $1', [id]);
  },

  // Add authors to publication
  async addAuthorsToPublication(publicationId: string, authorIds: string[]) {
    const values = authorIds.map((authorId, idx) => `($1, $${idx + 2}, ${idx + 1})`).join(', ');
    const params = [publicationId, ...authorIds];
    const query = `
      INSERT INTO publication_authors (publication_id, author_id, author_order)
      VALUES ${values}
    `;
    await pool.query(query, params);
  },

  // Remove authors from publication
  async removeAuthorsFromPublication(publicationId: string) {
    await pool.query('DELETE FROM publication_authors WHERE publication_id = $1', [publicationId]);
  }
};

// Authors API
export const authorsApi = {
  // Get all authors
  async getAuthors() {
    const { rows } = await pool.query('SELECT * FROM authors ORDER BY name');
    return rows as Author[];
  },

  // Create author
  async createAuthor(author: Omit<Author, 'id' | 'created_at'>) {
    const keys = Object.keys(author);
    const values = Object.values(author);
    const params = keys.map((_, i) => `$${i + 1}`);
    const query = `
      INSERT INTO authors (${keys.join(',')})
      VALUES (${params.join(',')})
      RETURNING *
    `;
    const { rows } = await pool.query(query, values);
    return rows[0] as Author;
  },

  // Update author
  async updateAuthor(id: string, updates: Partial<Author>) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const query = `
      UPDATE authors SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0] as Author;
  },

  // Delete author
  async deleteAuthor(id: string) {
    await pool.query('DELETE FROM authors WHERE id = $1', [id]);
  }
};

// Categories API
export const categoriesApi = {
  // Get all categories
  async getCategories() {
    const { rows } = await pool.query('SELECT * FROM research_categories ORDER BY name');
    return rows as ResearchCategory[];
  },

  // Create category
  async createCategory(category: Omit<ResearchCategory, 'id' | 'created_at'>) {
    const keys = Object.keys(category);
    const values = Object.values(category);
    const params = keys.map((_, i) => `$${i + 1}`);
    const query = `
      INSERT INTO research_categories (${keys.join(',')})
      VALUES (${params.join(',')})
      RETURNING *
    `;
    const { rows } = await pool.query(query, values);
    return rows[0] as ResearchCategory;
  },

  // Update category
  async updateCategory(id: string, updates: Partial<ResearchCategory>) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const query = `
      UPDATE research_categories SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;
    const { rows } = await pool.query(query, [...values, id]);
    return rows[0] as ResearchCategory;
  },

  // Delete category
  async deleteCategory(id: string) {
    await pool.query('DELETE FROM research_categories WHERE id = $1', [id]);
  }
}; 