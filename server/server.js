const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL user
  password: '', // your MySQL password
  database: 'career_guidance_db'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Routes

// Get all students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a student
app.post('/students', (req, res) => {
  const { name, email, course } = req.body;
  db.query('INSERT INTO students (name, email, course) VALUES (?, ?, ?)', 
           [name, email, course],
           (err, results) => {
             if (err) return res.status(500).json({ error: err.message });
             res.json({ id: results.insertId, name, email, course });
           });
});

// Update a student
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  db.query('UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?', 
           [name, email, course, id],
           (err) => {
             if (err) return res.status(500).json({ error: err.message });
             res.json({ id, name, email, course });
           });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Student deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
