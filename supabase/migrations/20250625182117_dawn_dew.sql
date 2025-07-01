/*
  # Programs Management System

  1. New Tables
    - `programs`
      - Core program information (title, slug, description, objectives, etc.)
    - `program_team_members`
      - Team member details with roles and contact info
    - `program_partners`
      - Partner organizations with logos and websites
    - `program_projects`
      - Individual projects within programs with impact metrics

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access

  3. Sample Data
    - Pre-populated programs with team members, partners, and projects
*/

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  overview text,
  objectives text[],
  approach text,
  hero_image text,
  status text DEFAULT 'Active',
  start_date date,
  end_date date,
  budget text,
  beneficiaries text,
  location text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create program team members table
CREATE TABLE IF NOT EXISTS program_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES programs(id) ON DELETE CASCADE,
  name text NOT NULL,
  title text,
  role text,
  image text,
  email text,
  bio text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create program partners table
CREATE TABLE IF NOT EXISTS program_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES programs(id) ON DELETE CASCADE,
  name text NOT NULL,
  logo text,
  website text,
  description text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create program projects table
CREATE TABLE IF NOT EXISTS program_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES programs(id) ON DELETE CASCADE,
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

-- Enable Row Level Security (only if not already enabled)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'programs' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'program_team_members' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE program_team_members ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'program_partners' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE program_partners ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'program_projects' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE program_projects ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for public read access (with existence checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'programs' 
    AND policyname = 'Public can read programs'
  ) THEN
    CREATE POLICY "Public can read programs"
      ON programs
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_team_members' 
    AND policyname = 'Public can read program team members'
  ) THEN
    CREATE POLICY "Public can read program team members"
      ON program_team_members
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_partners' 
    AND policyname = 'Public can read program partners'
  ) THEN
    CREATE POLICY "Public can read program partners"
      ON program_partners
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_projects' 
    AND policyname = 'Public can read program projects'
  ) THEN
    CREATE POLICY "Public can read program projects"
      ON program_projects
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Create policies for authenticated users (admin operations)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'programs' 
    AND policyname = 'Authenticated users can manage programs'
  ) THEN
    CREATE POLICY "Authenticated users can manage programs"
      ON programs
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_team_members' 
    AND policyname = 'Authenticated users can manage program team members'
  ) THEN
    CREATE POLICY "Authenticated users can manage program team members"
      ON program_team_members
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_partners' 
    AND policyname = 'Authenticated users can manage program partners'
  ) THEN
    CREATE POLICY "Authenticated users can manage program partners"
      ON program_partners
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_projects' 
    AND policyname = 'Authenticated users can manage program projects'
  ) THEN
    CREATE POLICY "Authenticated users can manage program projects"
      ON program_projects
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_programs_featured ON programs(is_featured);
CREATE INDEX IF NOT EXISTS idx_program_team_members_program ON program_team_members(program_id);
CREATE INDEX IF NOT EXISTS idx_program_partners_program ON program_partners(program_id);
CREATE INDEX IF NOT EXISTS idx_program_projects_program ON program_projects(program_id);

-- Create trigger for programs updated_at (only if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_programs_updated_at'
  ) THEN
    CREATE TRIGGER update_programs_updated_at
      BEFORE UPDATE ON programs
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert sample programs (with conflict handling)
INSERT INTO programs (title, slug, description, overview, objectives, approach, hero_image, status, start_date, budget, beneficiaries, location, is_featured) VALUES
  (
    'Climate Action',
    'climate-action',
    'Climate adaptation and mitigation programs',
    'Building climate resilience in vulnerable communities through innovative adaptation strategies, sustainable practices, and community-centered solutions that protect lives and livelihoods.',
    ARRAY[
      'Develop climate-resilient agricultural practices',
      'Implement early warning systems for extreme weather',
      'Build community capacity for climate adaptation',
      'Reduce greenhouse gas emissions through sustainable practices'
    ],
    'We employ a comprehensive, multi-faceted approach to climate action that combines scientific rigor with community-centered solutions. Our methodology includes climate monitoring, adaptation strategies, community engagement, and targeted interventions.',
    'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?auto=format&fit=crop&w=800&q=80',
    'Active',
    '2020-01-01',
    '$15.2M',
    '250,000+ people',
    'Global',
    true
  ),
  (
    'Water & Sanitation',
    'water-sanitation',
    'Clean water and sanitation initiatives',
    'Ensuring access to clean water and sustainable sanitation systems for underserved communities through innovative technologies and community-centered approaches.',
    ARRAY[
      'Provide reliable access to safe drinking water',
      'Build sustainable sanitation infrastructure',
      'Train communities in water system maintenance',
      'Promote hygiene practices and water conservation'
    ],
    'We implement comprehensive water and sanitation solutions that combine innovative technology with sustainable community management practices. Our approach includes water access, treatment, sanitation systems, and community training.',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    'Active',
    '2018-01-01',
    '$8.7M',
    '180,000+ people',
    'Asia & Africa',
    true
  ),
  (
    'Renewable Energy',
    'renewable-energy',
    'Clean energy solutions and programs',
    'Promoting clean energy solutions for sustainable development and energy independence through solar, wind, and other renewable technologies.',
    ARRAY[
      'Install renewable energy systems in rural communities',
      'Create local employment opportunities in clean energy',
      'Reduce dependence on fossil fuels',
      'Build technical capacity for system maintenance'
    ],
    'Our renewable energy programs focus on community-owned and operated systems that provide reliable, affordable clean energy while creating local economic opportunities.',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    'Active',
    '2019-01-01',
    '$12.4M',
    '120,000+ people',
    'South Asia',
    false
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert sample team members (with conflict handling)
INSERT INTO program_team_members (program_id, name, title, role, image, email, bio, order_index) 
SELECT 
  p.id,
  tm.name,
  tm.title,
  tm.role,
  tm.image,
  tm.email,
  tm.bio,
  tm.order_index
FROM programs p
CROSS JOIN (VALUES
  -- Climate Action team
  ('climate-action', 'Dr. Sarah Chen', 'Program Director', 'FOCAL PERSON', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80', 'sarah.chen@gei.org', 'Leading climate scientist with 15+ years of experience in climate adaptation and mitigation strategies.', 1),
  ('climate-action', 'Michael Rodriguez', 'Field Coordinator', 'TEAM MEMBER', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', 'michael.rodriguez@gei.org', 'Expert in community-based climate adaptation with extensive field experience.', 2),
  ('climate-action', 'Dr. Emma Thompson', 'Research Lead', 'TEAM MEMBER', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', 'emma.thompson@gei.org', 'Climate researcher specializing in vulnerability assessments and adaptation planning.', 3),
  
  -- Water & Sanitation team
  ('water-sanitation', 'Dr. Priya Patel', 'Program Director', 'FOCAL PERSON', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', 'priya.patel@gei.org', 'Water and sanitation engineer with expertise in sustainable infrastructure development.', 1),
  ('water-sanitation', 'James Wilson', 'Technical Manager', 'TEAM MEMBER', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 'james.wilson@gei.org', 'Technical specialist in water treatment and sanitation systems.', 2),
  
  -- Renewable Energy team
  ('renewable-energy', 'Dr. Ahmed Hassan', 'Program Director', 'FOCAL PERSON', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', 'ahmed.hassan@gei.org', 'Renewable energy expert with focus on community-based energy solutions.', 1)
) AS tm(slug, name, title, role, image, email, bio, order_index)
WHERE p.slug = tm.slug
ON CONFLICT DO NOTHING;

-- Insert sample partners (with conflict handling)
INSERT INTO program_partners (program_id, name, logo, website, description, order_index)
SELECT 
  p.id,
  pt.name,
  pt.logo,
  pt.website,
  pt.description,
  pt.order_index
FROM programs p
CROSS JOIN (VALUES
  -- Climate Action partners
  ('climate-action', 'UNDP', '/logos/undp.png', 'https://undp.org', 'United Nations Development Programme', 1),
  ('climate-action', 'World Bank', '/logos/worldbank.png', 'https://worldbank.org', 'International financial institution', 2),
  ('climate-action', 'USAID', '/logos/usaid.png', 'https://usaid.gov', 'United States Agency for International Development', 3),
  
  -- Water & Sanitation partners
  ('water-sanitation', 'UNICEF', '/logos/unicef.png', 'https://unicef.org', 'United Nations Children Fund', 1),
  ('water-sanitation', 'Water.org', '/logos/water-org.png', 'https://water.org', 'Global nonprofit organization', 2),
  
  -- Renewable Energy partners
  ('renewable-energy', 'IRENA', '/logos/irena.png', 'https://irena.org', 'International Renewable Energy Agency', 1),
  ('renewable-energy', 'Solar Foundation', '/logos/solar-foundation.png', 'https://solarfoundation.org', 'Solar energy advocacy organization', 2)
) AS pt(slug, name, logo, website, description, order_index)
WHERE p.slug = pt.slug
ON CONFLICT DO NOTHING;

-- Insert sample projects (with conflict handling)
INSERT INTO program_projects (program_id, title, description, location, duration, status, budget, beneficiaries, impact_metrics, image, order_index)
SELECT 
  p.id,
  pj.title,
  pj.description,
  pj.location,
  pj.duration,
  pj.status,
  pj.budget,
  pj.beneficiaries,
  pj.impact_metrics,
  pj.image,
  pj.order_index
FROM programs p
CROSS JOIN (VALUES
  -- Climate Action projects
  ('climate-action', 'Nepal Climate Resilience Program', 'Supporting farmers in adapting to climate change through sustainable agriculture practices and water management systems.', 'Sindhupalchok, Nepal', '2020 - 2025', 'Active', '$2.5M', '15,000 farmers', ARRAY['50% increase in crop yields', '30% reduction in water usage', '200 water harvesting systems built'], 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80', 1),
  ('climate-action', 'Pacific Island Climate Adaptation', 'Building climate resilience in Pacific Island communities through coastal protection and disaster preparedness.', 'Vanuatu & Fiji', '2021 - 2026', 'Active', '$3.8M', '25,000 islanders', ARRAY['15 coastal protection barriers built', '80% reduction in storm damage', '1,000 people trained in disaster response'], 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80', 2),
  
  -- Water & Sanitation projects
  ('water-sanitation', 'Cambodia Water Security Project', 'Building sustainable water infrastructure and training local communities in water management.', 'Siem Reap, Cambodia', '2018 - 2023', 'Completed', '$1.8M', '25,000 people', ARRAY['90% reduction in waterborne diseases', '300 community water points built', '150 local technicians trained'], 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80', 1),
  ('water-sanitation', 'Bangladesh Safe Water Initiative', 'Providing safe drinking water and sanitation facilities in urban slums and rural communities.', 'Dhaka & Chittagong, Bangladesh', '2020 - 2025', 'Active', '$3.2M', '45,000 people', ARRAY['200 water treatment plants installed', '80% improvement in water quality', '500 sanitation facilities built'], 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80', 2),
  
  -- Renewable Energy projects
  ('renewable-energy', 'India Clean Energy Initiative', 'Installing solar power systems in rural communities, providing clean energy access.', 'Rajasthan, India', '2019 - 2024', 'Active', '$3.2M', '50,000 people', ARRAY['80% reduction in energy costs', '500 jobs created', '15,000 tons CO2 avoided annually'], 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80', 1)
) AS pj(slug, title, description, location, duration, status, budget, beneficiaries, impact_metrics, image, order_index)
WHERE p.slug = pj.slug
ON CONFLICT DO NOTHING;