const mysql = require('mysql2/promise');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'resort_data',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Database connection successful');
    // Create database if it doesn't exist
    connection.query('CREATE DATABASE IF NOT EXISTS resort_data')
      .then(() => {
        console.log('Database created or already exists');
        // Use the database
        return connection.query('USE resort_data');
      })
      .then(() => {
        // Create Room table if it doesn't exist
        return connection.query(`
          CREATE TABLE IF NOT EXISTS Room (
            Type_No VARCHAR(10) PRIMARY KEY,
            Family BIT DEFAULT 0,
            Couple BIT DEFAULT 0,
            Solo BIT DEFAULT 0
          )
        `);
      })
      .then(() => {
        console.log('Room table created or already exists');
        connection.release();
      })
      .catch(err => {
        console.error('Error setting up database:', err);
        connection.release();
      });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = pool;
