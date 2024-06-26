const pool = require('../config/db'); // Import the database connection from db.js

exports.fetchBrands = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM brands');
    connection.release();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching brands:', err);
    res.status(400).json({ message: 'Error fetching brands' });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result, fields] = await connection.execute('INSERT INTO brands (label, value) VALUES (?, ?)', [req.body.label, req.body.value]);
    connection.release();
    res.status(201).json({ id: result.insertId, label: req.body.label, value: req.body.value });
  } catch (err) {
    console.error('Error creating brand:', err);
    res.status(400).json({ message: 'Error creating brand' });
  }
};
