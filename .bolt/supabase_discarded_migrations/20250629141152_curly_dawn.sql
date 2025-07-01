/*
  # Fix RLS policies for projects and image storage

  1. Security Updates
    - Update RLS policies for projects table to allow authenticated users to insert/update
    - Add storage policies for images bucket to allow authenticated users to upload
    - Ensure proper permissions for admin functionality

  2. Changes
    - Drop existing restrictive policies on projects table
    - Add comprehensive policies for authenticated users
    - Add storage bucket policies for image uploads
*/

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON projects;

-- Create comprehensive policies for projects table
CREATE POLICY "Enable all operations for authenticated users"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure public can still read projects
CREATE POLICY "Enable read access for all users"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Storage policies for images bucket
-- Note: These policies apply to the 'images' storage bucket

-- Allow authenticated users to upload images
INSERT INTO storage.policies (id, bucket_id, name, definition, check, roles)
VALUES (
  'authenticated_upload_images',
  'images',
  'Authenticated users can upload images',
  'auth.role() = ''authenticated''',
  'auth.role() = ''authenticated''',
  '{authenticated}'
) ON CONFLICT (id) DO UPDATE SET
  definition = EXCLUDED.definition,
  check = EXCLUDED.check;

-- Allow authenticated users to update images
INSERT INTO storage.policies (id, bucket_id, name, definition, check, roles)
VALUES (
  'authenticated_update_images',
  'images',
  'Authenticated users can update images',
  'auth.role() = ''authenticated''',
  'auth.role() = ''authenticated''',
  '{authenticated}'
) ON CONFLICT (id) DO UPDATE SET
  definition = EXCLUDED.definition,
  check = EXCLUDED.check;

-- Allow public read access to images
INSERT INTO storage.policies (id, bucket_id, name, definition, check, roles)
VALUES (
  'public_read_images',
  'images',
  'Public users can read images',
  'true',
  NULL,
  '{public, authenticated}'
) ON CONFLICT (id) DO UPDATE SET
  definition = EXCLUDED.definition,
  check = EXCLUDED.check;

-- Allow authenticated users to delete images
INSERT INTO storage.policies (id, bucket_id, name, definition, check, roles)
VALUES (
  'authenticated_delete_images',
  'images',
  'Authenticated users can delete images',
  'auth.role() = ''authenticated''',
  NULL,
  '{authenticated}'
) ON CONFLICT (id) DO UPDATE SET
  definition = EXCLUDED.definition,
  check = EXCLUDED.check;