-- MySQL schema
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL DEFAULT 'pune',
  location VARCHAR(255) NOT NULL,
  area VARCHAR(100) DEFAULT 'N/A',
  project_year VARCHAR(20),
  status VARCHAR(20) NOT NULL DEFAULT 'completed',
  maps_query VARCHAR(255),
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PostgreSQL equivalent
-- CREATE TABLE IF NOT EXISTS projects (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   type VARCHAR(255) NOT NULL,
--   city VARCHAR(100) NOT NULL DEFAULT 'pune',
--   location VARCHAR(255) NOT NULL,
--   area VARCHAR(100) DEFAULT 'N/A',
--   project_year VARCHAR(20),
--   status VARCHAR(20) NOT NULL DEFAULT 'completed',
--   maps_query VARCHAR(255),
--   description TEXT NOT NULL,
--   image_url TEXT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
