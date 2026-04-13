-- FreshCart Database Schema
-- Run this in MySQL to set up the database

CREATE DATABASE IF NOT EXISTS grocery;

USE grocery;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  img LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(100) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  total INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);

-- Sample Products
INSERT INTO products (name, price, img) VALUES 
('Apple', 120, 'assets/images/apple.png'),
('Banana', 60, 'assets/images/banana.png'),
('Milk', 50, 'assets/images/milk.png'),
('Rice', 80, 'assets/images/rice.png');

