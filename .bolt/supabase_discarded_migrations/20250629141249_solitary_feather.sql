/*
  # Bypass Authentication for Development

  This migration temporarily disables RLS policies to allow development without authentication.
  
  **WARNING: This should ONLY be used in development environments!**
  
  1. Disables RLS on key tables
  2. Creates permissive policies for development
  3. Allows unrestricted access to storage
*/

-- Temporarily disable RLS for development (DO NOT USE IN PRODUCTION)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_areas DISABLE ROW LEVEL SECURITY;
ALTER TABLE publications DISABLE ROW LEVEL SECURITY;
ALTER TABLE authors DISABLE ROW LEVEL SECURITY;
ALTER TABLE research_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_custom_fields DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_media DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_stakeholders DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_area_team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_area_partners DISABLE ROW LEVEL SECURITY;

-- Create development-only storage policies that allow all operations
INSERT INTO storage.policies (id, bucket_id, name, definition, check, roles)
VALUES (
  'dev_all_operations_images',
  'images',
  'Development: Allow all operations on images',
  'true',
  'true',
  '{anon, authenticated, public}'
) ON CONFLICT (id) DO UPDATE SET
  definition = 'true',
  check = 'true',
  roles = '{anon, authenticated, public}';

-- Also create a policy for any other storage buckets that might exist
INSERT INTO storage.policies (id, bucket_id, name, definition, check, roles)
VALUES (
  'dev_all_operations_publications',
  'publications',
  'Development: Allow all operations on publications',
  'true',
  'true',
  '{anon, authenticated, public}'
) ON CONFLICT (id) DO UPDATE SET
  definition = 'true',
  check = 'true',
  roles = '{anon, authenticated, public}';

-- Create a simple admin flag function for development
CREATE OR REPLACE FUNCTION is_dev_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  -- In development, always return true
  -- In production, you would check against a real admin table
  SELECT true;
$$;