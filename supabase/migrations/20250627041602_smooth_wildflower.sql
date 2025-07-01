/*
  # Deprecate Programs Table and Related Tables

  1. Mark Legacy Tables
    - Add deprecation comments to programs table
    - Add deprecation comments to program_team_members table
    - Add deprecation comments to program_partners table
    - Keep tables for backward compatibility but mark as deprecated

  2. Optional Migration Path
    - Provide views for backward compatibility
    - Add migration notes for future cleanup

  Note: This migration keeps the old tables intact for backward compatibility
  but marks them as deprecated. A future migration can remove them once
  all application code has been updated to use the new structure.
*/

-- Add deprecation comments to existing tables
COMMENT ON TABLE programs IS 'DEPRECATED: This table has been replaced by program_areas and projects tables. Use program_areas for high-level categorization and projects for individual initiatives.';

COMMENT ON TABLE program_team_members IS 'DEPRECATED: Team member associations should now be handled at the project level or program area level. Consider linking team members directly to projects or program_areas.';

COMMENT ON TABLE program_partners IS 'DEPRECATED: Partner associations should now be handled at the project level or program area level. Consider linking partners directly to projects or program_areas.';

-- Create a view for backward compatibility (optional)
-- This view maps old program structure to new program areas
CREATE OR REPLACE VIEW legacy_programs_view AS
SELECT 
  pa.id,
  pa.name as title,
  pa.slug,
  pa.description,
  pa.hero_image,
  'Active' as status,
  null as start_date,
  null as end_date,
  null as budget,
  null as beneficiaries,
  null as location,
  false as is_featured,
  pa.created_at,
  pa.updated_at
FROM program_areas pa;

-- Add migration notes
COMMENT ON VIEW legacy_programs_view IS 'Backward compatibility view that maps program_areas to the old programs table structure. This should be removed once all application code is updated.';

-- Log deprecation in a migration log (optional)
DO $$
BEGIN
  RAISE NOTICE 'Programs table and related tables (program_team_members, program_partners) have been marked as DEPRECATED.';
  RAISE NOTICE 'New structure uses program_areas and projects tables.';
  RAISE NOTICE 'Update application code to use the new structure, then run cleanup migration to remove deprecated tables.';
END $$;