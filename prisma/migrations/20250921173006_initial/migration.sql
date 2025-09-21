-- CreateTable
CREATE EXTENSION IF NOT EXISTS vector;


CREATE TABLE "public"."documents" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "meta_data" JSONB,
    "embeddings" vector(1024),

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);
