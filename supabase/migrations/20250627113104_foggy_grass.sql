/*
  # Project Management System Database Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (enum: active, completed, on_hold, cancelled)
      - `location` (text)
      - `latitude` (decimal)
      - `longitude` (decimal)
      - `program_area_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `project_media`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `file_url` (text, required)
      - `file_type` (enum: image, document)
      - `file_name` (text)
      - `file_size` (integer)
      - `caption` (text)
      - `created_at` (timestamp)

    - `project_stakeholders`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `name` (text, required)
      - `email` (text)
      - `phone` (text)
      - `organization` (text)
      - `role` (text)
      - `type` (enum: team_member, partner, beneficiary)
      - `created_at` (timestamp)

    - `project_updates`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `title` (text, required)
      - `description` (text)
      - `update_date` (date)
      - `milestone` (boolean, default false)
      - `created_by` (uuid)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage projects
    - Add policies for public read access where appropriate
*/

-- Create enum types
CREATE TYPE project_status AS ENUM ('active', 'completed', 'on_hold', 'cancelled');
CREATE TYPE media_type AS ENUM ('image', 'document');
CREATE TYPE stakeholder_type AS ENUM ('team_member', 'partner', 'beneficiary');

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  start_date date,
  end_date date,
  status project_status DEFAULT 'active',
  location text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  program_area_id uuid REFERENCES program_areas(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project media table
CREATE TABLE IF NOT EXISTS project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  file_type media_type NOT NULL,
  file_name text,
  file_size integer,
  caption text,
  created_at timestamptz DEFAULT now()
);

-- Project stakeholders table
CREATE TABLE IF NOT EXISTS project_stakeholders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  organization text,
  role text,
  type stakeholder_type DEFAULT 'team_member',
  created_at timestamptz DEFAULT now()
);

-- Project updates table
CREATE TABLE IF NOT EXISTS project_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  update_date date DEFAULT CURRENT_DATE,
  milestone boolean DEFAULT false,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_stakeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for project_media
CREATE POLICY "Project media is viewable by everyone"
  ON project_media
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage project media"
  ON project_media
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for project_stakeholders
CREATE POLICY "Project stakeholders are viewable by everyone"
  ON project_stakeholders
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage project stakeholders"
  ON project_stakeholders
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for project_updates
CREATE POLICY "Project updates are viewable by everyone"
  ON project_updates
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage project updates"
  ON project_updates
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_program_area ON projects(program_area_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_project_media_project ON project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_project_stakeholders_project ON project_stakeholders(project_id);
CREATE INDEX IF NOT EXISTS idx_project_updates_project ON project_updates(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to projects table
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();