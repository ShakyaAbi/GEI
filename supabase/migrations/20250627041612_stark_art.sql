/*
  # Create Project-Level Team Members and Partners

  1. New Tables
    - `project_team_members` - Team members associated with specific projects
    - `project_partners` - Partners associated with specific projects
    - `program_area_team_members` - Team members associated with program areas
    - `program_area_partners` - Partners associated with program areas

  2. Security
    - Enable RLS on all new tables
    - Add policies for public read and authenticated write access

  3. Flexibility
    - Allow team members and partners to be associated with either projects or program areas
    - Maintain similar structure to deprecated tables but with new foreign keys
*/

-- Create project_team_members table
CREATE TABLE IF NOT EXISTS project_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  title text,
  role text,
  image text,
  email text,
  bio text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create project_partners table
CREATE TABLE IF NOT EXISTS project_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  logo text,
  website text,
  description text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create program_area_team_members table
CREATE TABLE IF NOT EXISTS program_area_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_area_id uuid REFERENCES program_areas(id) ON DELETE CASCADE,
  name text NOT NULL,
  title text,
  role text,
  image text,
  email text,
  bio text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create program_area_partners table
CREATE TABLE IF NOT EXISTS program_area_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_area_id uuid REFERENCES program_areas(id) ON DELETE CASCADE,
  name text NOT NULL,
  logo text,
  website text,
  description text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_project_team_members_project ON project_team_members(project_id);
CREATE INDEX IF NOT EXISTS idx_project_team_members_order ON project_team_members(order_index);
CREATE INDEX IF NOT EXISTS idx_project_partners_project ON project_partners(project_id);
CREATE INDEX IF NOT EXISTS idx_project_partners_order ON project_partners(order_index);
CREATE INDEX IF NOT EXISTS idx_program_area_team_members_area ON program_area_team_members(program_area_id);
CREATE INDEX IF NOT EXISTS idx_program_area_team_members_order ON program_area_team_members(order_index);
CREATE INDEX IF NOT EXISTS idx_program_area_partners_area ON program_area_partners(program_area_id);
CREATE INDEX IF NOT EXISTS idx_program_area_partners_order ON program_area_partners(order_index);

-- Enable Row Level Security
ALTER TABLE project_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_area_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_area_partners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_team_members
CREATE POLICY "Public can read project team members"
  ON project_team_members
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage project team members"
  ON project_team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for project_partners
CREATE POLICY "Public can read project partners"
  ON project_partners
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage project partners"
  ON project_partners
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for program_area_team_members
CREATE POLICY "Public can read program area team members"
  ON program_area_team_members
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage program area team members"
  ON program_area_team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for program_area_partners
CREATE POLICY "Public can read program area partners"
  ON program_area_partners
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage program area partners"
  ON program_area_partners
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);