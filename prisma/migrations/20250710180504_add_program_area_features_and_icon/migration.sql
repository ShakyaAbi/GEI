-- AlterTable
ALTER TABLE "program_areas" ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "program_area_features" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "programAreaId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "image" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_area_features_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "program_area_features" ADD CONSTRAINT "program_area_features_programAreaId_fkey" FOREIGN KEY ("programAreaId") REFERENCES "program_areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
