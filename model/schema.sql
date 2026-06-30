CREATE DATABASE IF NOT EXISTS ravi_travels;
USE ravi_travels;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('customer','admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE airports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10),
    city VARCHAR(100),
    country VARCHAR(100)
);

CREATE TABLE flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    airline VARCHAR(100),
    flight_no VARCHAR(30),
    from_city VARCHAR(100),
    to_city VARCHAR(100),
    departure DATETIME,
    arrival DATETIME,
    price DECIMAL(10,2),
    seats INT DEFAULT 100
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id VARCHAR(20) UNIQUE,
    user_id INT NULL,
    full_name VARCHAR(150),
    phone VARCHAR(30),
    email VARCHAR(150),
    route_label VARCHAR(200),
    trip_type VARCHAR(20),
    departure_date DATE,
    passengers INT DEFAULT 1,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);