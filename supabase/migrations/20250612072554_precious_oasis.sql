/*
  # Publications Management System

  1. New Tables
    - `research_categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `authors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `affiliation` (text)
      - `bio` (text)
      - `created_at` (timestamp)
    
    - `publications`
      - `id` (uuid, primary key)
      - `title` (text)
      - `abstract` (text)
      - `journal` (text)
      - `publication_year` (integer)
      - `publication_type` (text)
      - `doi` (text)
      - `pdf_url` (text)
      - `citations` (integer, default 0)
      - `category_id` (uuid, foreign key)
      - `is_featured` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `publication_authors`
      - `id` (uuid, primary key)
      - `publication_id` (uuid, foreign key)
      - `author_id` (uuid, foreign key)
      - `author_order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access for write operations

  3. Indexes
    - Add indexes for better query performance
*/

-- Create research categories table
CREATE TABLE IF NOT EXISTS research_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  affiliation text,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Create publications table
CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  abstract text,
  journal text,
  publication_year integer,
  publication_type text DEFAULT 'Journal Article',
  doi text,
  pdf_url text,
  citations integer DEFAULT 0,
  category_id uuid REFERENCES research_categories(id),
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create publication_authors junction table
CREATE TABLE IF NOT EXISTS publication_authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id uuid REFERENCES publications(id) ON DELETE CASCADE,
  author_id uuid REFERENCES authors(id) ON DELETE CASCADE,
  author_order integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(publication_id, author_id)
);

-- Enable Row Level Security
ALTER TABLE research_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE publication_authors ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read research categories"
  ON research_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read authors"
  ON authors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read publications"
  ON publications
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read publication authors"
  ON publication_authors
  FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users (admin operations)
CREATE POLICY "Authenticated users can manage research categories"
  ON research_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage authors"
  ON authors
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage publications"
  ON publications
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage publication authors"
  ON publication_authors
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_publications_category ON publications(category_id);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(publication_year DESC);
CREATE INDEX IF NOT EXISTS idx_publications_featured ON publications(is_featured);
CREATE INDEX IF NOT EXISTS idx_publication_authors_publication ON publication_authors(publication_id);
CREATE INDEX IF NOT EXISTS idx_publication_authors_author ON publication_authors(author_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for publications updated_at
CREATE TRIGGER update_publications_updated_at
  BEFORE UPDATE ON publications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();