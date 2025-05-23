const express = require('express');
const cors = require('cors');
const db = require('./db');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Test database connection
async function testDbConnection() {
  try {
    const [result] = await db.query('SELECT 1');
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

testDbConnection();

// Test route to check database structure
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

// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
  console.log('Backend server started');
});
