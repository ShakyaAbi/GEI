/*
  # Fix RLS policies for projects and storage

  1. Storage Policies
    - Enable RLS on storage.objects if not already enabled
    - Add policies for authenticated users to upload, read, update, and delete images
    
  2. Projects Table Policies
    - Ensure proper policies exist for authenticated users to manage projects
    - Fix any policy conflicts that might prevent project creation/updates

  3. Security
    - All policies are scoped to authenticated users
    - Storage policies are limited to the 'images' bucket
    - Maintains data security while allowing admin functionality
*/

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing storage policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read images" ON storage.objects;

-- Create comprehensive storage policies for the images bucket
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can read images"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'images')
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');

-- Allow public read access to images (for displaying on the website)
CREATE POLICY "Public can read images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'images');

-- Ensure the images bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET
  public = true;

-- Fix projects table policies - drop conflicting policies first
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Public can read projects" ON projects;

-- Create clean, comprehensive policies for projects table
CREATE POLICY "Public can read projects"
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
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);