-- VRIDHI Database Schema
-- Create all tables for the updated system

-- Users table with updated structure (no email, strict 3-field login)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(10) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('seller', 'wholesaler', 'visitor')),
  product_type VARCHAR(100),
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table (limited to 4 core + Other)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  product_type VARCHAR(100) NOT NULL CHECK (product_type IN ('Himroo Shawl', 'Tomato', 'Onion', 'Turmeric', 'Other')),
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL,
  qty INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table with edit history tracking
CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_type VARCHAR(100) NOT NULL,
  qty INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  buyer VARCHAR(255),
  date DATE NOT NULL,
  edited_at TIMESTAMP,
  history JSONB DEFAULT '[]'
);

-- Transporters table
CREATE TABLE IF NOT EXISTS transporters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  route_from VARCHAR(100),
  route_to VARCHAR(100),
  vehicle VARCHAR(100),
  price_per_km DECIMAL(10, 2),
  phone VARCHAR(10),
  rating DECIMAL(2, 1),
  has_subsidy BOOLEAN DEFAULT false
);

-- Chats table
CREATE TABLE IF NOT EXISTS chats (
  id SERIAL PRIMARY KEY,
  participant1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  participant2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(participant1_id, participant2_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Forecast cache table
CREATE TABLE IF NOT EXISTS forecast_cache (
  id SERIAL PRIMARY KEY,
  product_type VARCHAR(100) NOT NULL UNIQUE,
  dates JSONB NOT NULL,
  past JSONB NOT NULL,
  future JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confidence INTEGER DEFAULT 0
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_sales_seller ON sales(seller_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat ON messages(chat_id);
