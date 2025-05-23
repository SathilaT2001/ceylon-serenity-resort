const express = require('express');
const router = express.Router();
const db = require('./db');

// GET all guests
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch guests...');
    const [rows] = await db.query('SELECT * FROM guest');
    console.log('Fetched guests:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching guests:', error);
    res.status(500).json({ error: 'Failed to fetch guests' });
  }
});

module.exports = router;