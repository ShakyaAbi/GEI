import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const { Pool } = pg;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT) || 5432,
});

// GET /api/publications
app.get('/api/publications', async (req, res) => {
  try {
    const { category, year, featured, limit, offset } = req.query;
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
    const params = [];
    let paramIdx = 1;

    if (category && category !== 'all') {
      baseQuery += ` AND rc.slug = $${paramIdx++}`;
      params.push(category);
    }
    if (year) {
      baseQuery += ` AND p.publication_year = $${paramIdx++}`;
      params.push(parseInt(year));
    }
    if (featured !== undefined) {
      baseQuery += ` AND p.is_featured = $${paramIdx++}`;
      params.push(featured === 'true');
    }

    baseQuery += ' ORDER BY p.publication_year DESC';

    if (limit) {
      baseQuery += ` LIMIT $${paramIdx++}`;
      params.push(parseInt(limit));
    }
    if (offset) {
      baseQuery += ` OFFSET $${paramIdx++}`;
      params.push(parseInt(offset));
    }

    const result = await pool.query(baseQuery, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/publications/:id
app.get('/api/publications/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Publication not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/publications
app.post('/api/publications', async (req, res) => {
  try {
    const publication = req.body;
    const keys = Object.keys(publication);
    const values = Object.values(publication);
    const params = keys.map((_, i) => `$${i + 1}`);
    const query = `
      INSERT INTO publications (${keys.join(',')})
      VALUES (${params.join(',')})
      RETURNING *
    `;
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT /api/publications/:id
app.put('/api/publications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const query = `
      UPDATE publications SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;
    const result = await pool.query(query, [...values, id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Publication not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /api/publications/:id
app.delete('/api/publications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM publications WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/authors
app.get('/api/authors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM authors ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/authors
app.post('/api/authors', async (req, res) => {
  try {
    const author = req.body;
    const keys = Object.keys(author);
    const values = Object.values(author);
    const params = keys.map((_, i) => `$${i + 1}`);
    const query = `
      INSERT INTO authors (${keys.join(',')})
      VALUES (${params.join(',')})
      RETURNING *
    `;
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM research_categories ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/publications/:id/authors
app.post('/api/publications/:id/authors', async (req, res) => {
  try {
    const { id } = req.params;
    const { authorIds } = req.body;
    const values = authorIds.map((authorId, idx) => `($1, $${idx + 2}, ${idx + 1})`).join(', ');
    const params = [id, ...authorIds];
    const query = `
      INSERT INTO publication_authors (publication_id, author_id, author_order)
      VALUES ${values}
    `;
    await pool.query(query, params);
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /api/publications/:id/authors
app.delete('/api/publications/:id/authors', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM publication_authors WHERE publication_id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 