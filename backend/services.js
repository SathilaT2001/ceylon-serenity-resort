const express = require('express');
const router = express.Router();
const db = require('./db');

// Debug endpoint to check database setup
router.get('/debug', async (req, res) => {
  try {
    // Test database connection
    await db.query('SELECT 1');
    console.log('Database connection is working');

    // Get list of tables
    const [tables] = await db.query('SHOW TABLES');
    console.log('Available tables:', tables);

    // Try to select from Services table
    const [services] = await db.query('SELECT * FROM Services');
    console.log('Services found:', services);

    res.json({
      status: 'success',
      tables: tables,
      services: services
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
      stack: error.stack
    });
  }
});

// GET all services
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch services...');
    const [tableServices] = await db.query('SELECT * FROM Services');
    console.log('Services data:', tableServices);
    
    res.json(tableServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ error: 'Failed to fetch services', details: error.message });
  }
});

// POST new service
router.post('/', async (req, res) => {
  try {
    const { id, name, description, price } = req.body;
    const [result] = await db.query(
      'INSERT INTO Services (Service_ID, Name, Description, Price) VALUES (?, ?, ?, ?)',
      [id, name, description, price]
    );
    res.status(201).json({ message: 'Service created successfully', id });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const [result] = await db.query(
      'UPDATE Services SET Name = ?, Description = ?, Price = ? WHERE Service_ID = ?',
      [name, description, price, req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Service not found' });
    } else {
      res.json({ message: 'Service updated successfully' });
    }
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Services WHERE Service_ID = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Service not found' });
    } else {
      res.json({ message: 'Service deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

module.exports = router;
