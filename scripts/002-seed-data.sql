-- Seed data for 4 core products + transporters

-- Sample sellers for each product
INSERT INTO users (name, phone, password_hash, role, product_type, city) VALUES
('Arjun Mehta', '9876543210', '$2a$10$YourHashedPasswordHere1', 'seller', 'Himroo Shawl', 'Aurangabad'),
('Priya Sharma', '9876543211', '$2a$10$YourHashedPasswordHere2', 'seller', 'Tomato', 'Nashik'),
('Rajesh Kumar', '9876543212', '$2a$10$YourHashedPasswordHere3', 'seller', 'Onion', 'Pune'),
('Sunita Patel', '9876543213', '$2a$10$YourHashedPasswordHere4', 'seller', 'Turmeric', 'Salem'),
('Vikram Singh', '9876543214', '$2a$10$YourHashedPasswordHere5', 'seller', 'Other', 'Delhi'),
('Deepak Traders', '9876543215', '$2a$10$YourHashedPasswordHere6', 'wholesaler', 'Himroo Shawl', 'Mumbai'),
('Anjali Visitor', '9876543216', '$2a$10$YourHashedPasswordHere7', 'visitor', NULL, 'Bangalore')
ON CONFLICT (phone) DO NOTHING;

-- Sample products (5 per category)
INSERT INTO products (name, product_type, seller_id, price, qty, image_url) VALUES
('Traditional Himroo Shawl', 'Himroo Shawl', 1, 2500.00, 50, '/himroo-shawl.jpg'),
('Premium Himroo Stole', 'Himroo Shawl', 1, 3500.00, 30, '/himroo-shawl.jpg'),
('Red Tomato', 'Tomato', 2, 25.00, 500, '/tomato.jpg'),
('Cherry Tomato', 'Tomato', 2, 40.00, 300, '/tomato.jpg'),
('Red Onion', 'Onion', 3, 30.00, 1000, '/onion.jpg'),
('White Onion', 'Onion', 3, 35.00, 800, '/onion.jpg'),
('Fresh Turmeric Root', 'Turmeric', 4, 80.00, 200, '/turmeric.jpg'),
('Turmeric Powder', 'Turmeric', 4, 120.00, 150, '/turmeric.jpg'),
('Mixed Vegetables', 'Other', 5, 50.00, 400, '/vegetables.jpg')
ON CONFLICT DO NOTHING;

-- Sample sales for past 7 days
INSERT INTO sales (seller_id, product_type, qty, unit_price, total_price, buyer, date) VALUES
(1, 'Himroo Shawl', 10, 2500.00, 25000.00, 'Heritage Stores', CURRENT_DATE - INTERVAL '1 day'),
(2, 'Tomato', 100, 25.00, 2500.00, 'Local Market', CURRENT_DATE - INTERVAL '2 days'),
(3, 'Onion', 200, 30.00, 6000.00, 'Wholesale Hub', CURRENT_DATE - INTERVAL '3 days'),
(4, 'Turmeric', 50, 80.00, 4000.00, 'Spice Traders', CURRENT_DATE - INTERVAL '4 days'),
(1, 'Himroo Shawl', 5, 3500.00, 17500.00, 'Boutique Shop', CURRENT_DATE - INTERVAL '5 days')
ON CONFLICT DO NOTHING;

-- Transporters with subsidy info
INSERT INTO transporters (name, route_from, route_to, vehicle, price_per_km, phone, rating, has_subsidy) VALUES
('Fast Logistics', 'Mumbai', 'Pune', 'Truck', 15.00, '9123456780', 4.5, true),
('Green Transport', 'Nashik', 'Mumbai', 'Mini Truck', 12.00, '9123456781', 4.8, false),
('Swift Cargo', 'Aurangabad', 'Delhi', 'Container', 20.00, '9123456782', 4.3, true),
('Safe Movers', 'Salem', 'Chennai', 'Tempo', 10.00, '9123456783', 4.6, false),
('Express Wheels', 'Pune', 'Bangalore', 'Truck', 18.00, '9123456784', 4.7, true),
('Reliable Transit', 'Delhi', 'Mumbai', 'Truck', 16.00, '9123456785', 4.4, false),
('Quick Dispatch', 'Bangalore', 'Hyderabad', 'Mini Truck', 13.00, '9123456786', 4.9, true),
('City Transport', 'Chennai', 'Bangalore', 'Tempo', 11.00, '9123456787', 4.5, false),
('Highway Movers', 'Mumbai', 'Delhi', 'Container', 22.00, '9123456788', 4.8, true),
('Valley Logistics', 'Pune', 'Nashik', 'Truck', 14.00, '9123456789', 4.6, false)
ON CONFLICT DO NOTHING;

-- Forecast cache demo data (past 7 + next 7)
INSERT INTO forecast_cache (product_type, dates, past, future, confidence) VALUES
('Himroo Shawl', 
  '["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]',
  '[2400, 2450, 2500, 2480, 2520, 2550, 2580]',
  '[2600, 2620, 2650, 2680, 2700, 2720, 2750]',
  75),
('Tomato',
  '["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]',
  '[22, 24, 25, 26, 25, 27, 28]',
  '[29, 30, 32, 31, 33, 34, 35]',
  68),
('Onion',
  '["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]',
  '[28, 29, 30, 31, 30, 32, 33]',
  '[34, 35, 36, 37, 38, 39, 40]',
  72),
('Turmeric',
  '["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]',
  '[75, 78, 80, 82, 81, 83, 85]',
  '[86, 88, 90, 92, 94, 95, 97]',
  80)
ON CONFLICT (product_type) DO UPDATE SET
  dates = EXCLUDED.dates,
  past = EXCLUDED.past,
  future = EXCLUDED.future,
  confidence = EXCLUDED.confidence,
  updated_at = CURRENT_TIMESTAMP;
