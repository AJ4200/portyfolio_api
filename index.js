require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(bodyParser.json());

// Enable CORS with no restrictions
app.use(cors({
  origin: '*'
}));

// Input validation middleware
function validateInput(req, res, next) {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Missing email field' });
  } else if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Invalid email address' });
  } else {
    next();
  }
}

// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
}

// Get all users
app.get('/users', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM waitingusers');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Get a user by ID
app.get('/users/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM waitingusers WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: `User with id ${id} not found` });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    next(err);
  }
});

// Add a new user
app.post('/users', validateInput, async (req, res, next) => {
  const { email } = req.body;

  try {
    const result = await pool.query('INSERT INTO waitingusers(email) VALUES($1) RETURNING id', [email]);
    const id = result.rows[0].id;
    res.json({ id, email });
  } catch (err) {
    next(err);
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM waitingusers WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: `User with id ${id} not found` });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    next(err);
  }
});

// Start the server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});
