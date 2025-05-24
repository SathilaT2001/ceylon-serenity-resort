const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all room types
router.get('/', async (req, res) => {
    try {
        console.log('Attempting to fetch room types...');
        // First check if table exists
        const [tables] = await db.query("SHOW TABLES LIKE 'Room'");
              
        // Fetch the data with proper type casting
        const [rows] = await db.query(`
            SELECT 
                Type_No,
                CAST(Family AS UNSIGNED) as Family,
                CAST(Couple AS UNSIGNED) as Couple,
                CAST(Solo AS UNSIGNED) as Solo
            FROM Room
        `);
        
        console.log('Fetched room types:', rows);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching room types:', error);
        res.status(500).json({ 
            error: 'Error fetching room types',
            details: error.message 
        });
    }
});

// Add a new room type
router.post('/', async (req, res) => {
    const { Type_No, Family, Couple, Solo } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Room (Type_No, Family, Couple, Solo) VALUES (?, ?, ?, ?)',
            [Type_No, Family, Couple, Solo]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Error creating room type:', error);
        res.status(500).json({ error: 'Error creating room type' });
    }
});

// Delete a room type
router.delete('/:typeNo', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Room WHERE Type_No = ?', [req.params.typeNo]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }
        
        res.json({ message: 'Room type deleted successfully' });
    } catch (error) {
        console.error('Error deleting room type:', error);
        res.status(500).json({ error: 'Error deleting room type' });
    }
});



module.exports = router;
