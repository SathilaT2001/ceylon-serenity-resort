const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const [rooms] = await db.query(`
      SELECT r.Room_No, r.Per_Night_Price, r.Availability, r.Type_No, rt.Type_Name
      FROM Room_Subclass r
      JOIN Room rt ON r.Type_No = rt.Type_No
    `);
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a new room
router.post('/', async (req, res) => {
  try {
    const { Room_No, Per_Night_Price, Availability, Type_No } = req.body;
    const [result] = await db.query(
      'INSERT INTO Room_Subclass (Room_No, Per_Night_Price, Availability, Type_No) VALUES (?, ?, ?, ?)',
      [Room_No, Per_Night_Price, Availability, Type_No]
    );
    res.status(201).json({ id: result.insertId, message: 'Room added successfully' });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a room
router.put('/:roomNo', async (req, res) => {
  try {
    const { Per_Night_Price, Availability, Type_No } = req.body;
    await db.query(
      'UPDATE Room_Subclass SET Per_Night_Price = ?, Availability = ?, Type_No = ? WHERE Room_No = ?',
      [Per_Night_Price, Availability, Type_No, req.params.roomNo]
    );
    res.json({ message: 'Room updated successfully' });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a room
router.delete('/:roomNo', async (req, res) => {
  try {
    await db.query('DELETE FROM Room_Subclass WHERE Room_No = ?', [req.params.roomNo]);
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
