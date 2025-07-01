/*
  # Create Program Areas and Projects Schema

  1. New Tables
    - `program_areas`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text)
      - `hero_image` (text)
      - `seo_title` (text)
      - `seo_description` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `projects` (renamed from program_projects)
      - `id` (uuid, primary key)
      - `program_area_id` (uuid, foreign key to program_areas)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `duration` (text)
      - `status` (text)
      - `budget` (text)
      - `beneficiaries` (text)
      - `impact_metrics` (text array)
      - `image` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated user write access

  3. Triggers
    - Auto-update `updated_at` fields on changes
*/

-- Create program_areas table
CREATE TABLE IF NOT EXISTS program_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  hero_image text,
  seo_title text,
  seo_description text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table (renamed from program_projects)
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_area_id uuid REFERENCES program_areas(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  location text,
  duration text,
  status text DEFAULT 'Active',
  budget text,
  beneficiaries text,
  impact_metrics text[],
  image text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_program_areas_slug ON program_areas(slug);
CREATE INDEX IF NOT EXISTS idx_program_areas_order ON program_areas(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_program_area ON projects(program_area_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

-- Enable Row Level Security
ALTER TABLE program_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for program_areas
CREATE POLICY "Public can read program areas"
  ON program_areas
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage program areas"
  ON program_areas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for projects
CREATE POLICY "Public can read projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to program_areas table
CREATE TRIGGER update_program_areas_updated_at
  BEFORE UPDATE ON program_areas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();