-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Optional: Create a sample table with vector column for embeddings
-- Uncomment if you want to create a table for storing embeddings
-- CREATE TABLE IF NOT EXISTS embeddings (
--   id SERIAL PRIMARY KEY,
--   content TEXT,
--   embedding VECTOR(1536), -- Adjust dimension based on your model
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Optional: Create index for faster vector similarity search
-- CREATE INDEX IF NOT EXISTS embeddings_embedding_idx ON embeddings 
-- USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);