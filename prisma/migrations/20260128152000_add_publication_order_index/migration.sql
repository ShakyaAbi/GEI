-- AlterTable
ALTER TABLE "publications" ADD COLUMN "order_index" INTEGER NOT NULL DEFAULT 0;

-- Backfill existing publications with a stable order per category
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY category_id
      ORDER BY publication_year DESC NULLS LAST, created_at DESC
    ) - 1 AS new_order
  FROM "publications"
)
UPDATE "publications" p
SET "order_index" = ranked.new_order
FROM ranked
WHERE p.id = ranked.id;

-- Indexes to support ordered queries
CREATE INDEX "publications_category_order_idx" ON "publications"("category_id", "order_index");
CREATE INDEX "program_areas_order_idx" ON "program_areas"("order_index");
CREATE INDEX "projects_program_area_order_idx" ON "projects"("program_area_id", "order_index");
