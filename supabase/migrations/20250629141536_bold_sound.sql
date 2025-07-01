/*
  # Add hero_image column to projects table

  1. Changes
    - Add `hero_image` column to `projects` table to store project hero image URLs
  
  2. Security
    - No changes to RLS policies needed as the column follows the same access patterns as other project fields
*/

-- Add hero_image column to projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'hero_image'
  ) THEN
    ALTER TABLE projects ADD COLUMN hero_image TEXT;
  END IF;
END $$;