-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS resort_data;
USE resort_data;

-- Create Room table for room types
CREATE TABLE IF NOT EXISTS Room (
    Type_No VARCHAR(10) PRIMARY KEY,
    Type_Name VARCHAR(100) NOT NULL
);

-- Create Room_Subclass table for individual rooms
CREATE TABLE IF NOT EXISTS Room_Subclass (
    Room_No VARCHAR(10) PRIMARY KEY,
    Per_Night_Price DECIMAL(10,2) CHECK (Per_Night_Price > 0),
    Availability BIT DEFAULT 1,
    Type_No VARCHAR(10),
    FOREIGN KEY (Type_No) REFERENCES Room(Type_No)
);

-- Insert room types
INSERT INTO Room (Type_No, Type_Name) VALUES
    ('T1', 'Deluxe Room'),
    ('T2', 'Executive Suite'),
    ('T3', 'Family Room'),
    ('T4', 'Beachfront Villa');

-- Insert sample rooms
INSERT INTO Room_Subclass (Room_No, Per_Night_Price, Availability, Type_No) VALUES
    ('R101', 150.00, 0, 'T1'),
    ('R102', 150.00, 1, 'T1'),
    ('R201', 250.00, 0, 'T2'),
    ('R202', 250.00, 1, 'T2'),
    ('R301', 200.00, 0, 'T3'),
    ('R401', 350.00, 0, 'T4');
