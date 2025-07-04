-- CreateTable
CREATE TABLE "faculty" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT,
    "image" TEXT,
    "specialization" TEXT,
    "email" TEXT,
    "publications" INTEGER,
    "awards" INTEGER,
    "linkedin_url" TEXT,
    "google_scholar_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "faculty_email_key" ON "faculty"("email");
