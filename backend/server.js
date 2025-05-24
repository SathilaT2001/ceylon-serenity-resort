const express = require('express');
const cors = require('cors');
const db = require('./db');
const roomTypesRouter = require('./routes/roomTypes');

// Initialize express app
const app = express();

// Setup database and tables
async function setupDatabase() {
  try {
    // Create database if not exists
    await db.query('CREATE DATABASE IF NOT EXISTS resort_data');
    await db.query('USE resort_data');
    
    // Create Room table if not exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS Room (
        Type_No VARCHAR(10) PRIMARY KEY,
        Family BIT DEFAULT 0,
        Couple BIT DEFAULT 0,
        Solo BIT DEFAULT 0
      )
    `);

    // Check if table is empty and insert sample data if needed
    const [rows] = await db.query('SELECT COUNT(*) as count FROM Room');
    if (rows[0].count === 0) {
      await db.query(`
        INSERT INTO Room (Type_No, Family, Couple, Solo) VALUES
        ('T001', 1, 0, 0),
        ('T002', 0, 1, 0),
        ('T003', 0, 0, 1),
        ('T004', 1, 1, 0)
      `);
      console.log('Sample room types inserted');
    }

    console.log('Database setup successful!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

// Call setup function
setupDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/roomTypes', roomTypesRouter);

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Setup database and tables
async function setupDatabase() {
  try {
    // Create database if not exists
    await db.query('CREATE DATABASE IF NOT EXISTS resort_data');
    await db.query('USE resort_data');
    
    // Create Room table if not exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS Room (
        Type_No VARCHAR(10) PRIMARY KEY,
        Family BIT DEFAULT 0,
        Couple BIT DEFAULT 0,
        Solo BIT DEFAULT 0
      )
    `);

    // Check if table is empty and insert sample data if needed
    const [rows] = await db.query('SELECT COUNT(*) as count FROM Room');
    if (rows[0].count === 0) {
      await db.query(`
        INSERT INTO Room (Type_No, Family, Couple, Solo) VALUES
        ('T001', 1, 0, 0),
        ('T002', 0, 1, 0),
        ('T003', 0, 0, 1),
        ('T004', 1, 1, 0)
      `);
      console.log('Sample room types inserted');
    }

    console.log('Database setup successful!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

// Routes
app.use('/api/roomTypes', roomTypesRouter);

// Start server
app.get('/api/test', async (req, res) => {
  try {
    const [tables] = await db.query('SHOW TABLES');
    const [columns] = await db.query('DESCRIBE guest');
    res.json({ tables, columns });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes
const guestsRouter = require('./guests');
const servicesRouter = require('./services');
const roomsRouter = require('./rooms');
app.use('/api/guests', guestsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/roomTypes', roomTypesRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Backend server started');
});
