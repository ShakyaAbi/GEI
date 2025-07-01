/*
  # Enhance Projects Schema

  1. New Tables
    - `project_custom_fields` - Store flexible custom fields for projects
  
  2. Schema Updates
    - Add `start_date`, `end_date`, `slug` columns to projects table
    - Update `status` column to use project_status enum
    - Add unique constraint on slug
  
  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users to manage data
    - Add policies for public users to read data
*/

-- Add new columns to projects table
DO $$
BEGIN
  -- Add start_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'start_date'
  ) THEN
    ALTER TABLE projects ADD COLUMN start_date date;
  END IF;

  -- Add end_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE projects ADD COLUMN end_date date;
  END IF;

  -- Add slug column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'slug'
  ) THEN
    ALTER TABLE projects ADD COLUMN slug text;
  END IF;
END $$;

-- Update status column to use enum (if not already using it)
DO $$
BEGIN
  -- Check if status column is already using the enum
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' 
    AND column_name = 'status' 
    AND data_type = 'USER-DEFINED'
  ) THEN
    -- First, update existing values to match enum values
    UPDATE projects SET status = 'active' WHERE status = 'Active';
    UPDATE projects SET status = 'completed' WHERE status = 'Completed';
    UPDATE projects SET status = 'on_hold' WHERE status = 'On Hold';
    UPDATE projects SET status = 'cancelled' WHERE status = 'Cancelled';
    
    -- Change column type to enum
    ALTER TABLE projects ALTER COLUMN status TYPE project_status USING status::project_status;
    ALTER TABLE projects ALTER COLUMN status SET DEFAULT 'active'::project_status;
  END IF;
END $$;

-- Add unique constraint on slug
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'projects' AND constraint_name = 'projects_slug_key'
  ) THEN
    ALTER TABLE projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
  END IF;
END $$;

-- Create project_custom_fields table
CREATE TABLE IF NOT EXISTS project_custom_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  field_name text NOT NULL,
  field_value text NOT NULL,
  field_type text DEFAULT 'text',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_dates ON projects(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_project_custom_fields_project ON project_custom_fields(project_id);

-- Enable RLS on project_custom_fields
ALTER TABLE project_custom_fields ENABLE ROW LEVEL SECURITY;

-- Create policies for project_custom_fields
CREATE POLICY "Authenticated users can manage project custom fields"
  ON project_custom_fields
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read project custom fields"
  ON project_custom_fields
  FOR SELECT
  TO public
  USING (true);