require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
// Get all projects
router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public.projects');
    res.json(rows);
  } catch (error) {d
    console.error('Error retrieving projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Get a specific project by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM public.projects WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error retrieving project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Create a new project
router.post('/', async (req, res) => {
  const { title, imgSrc, code, projectLink, description, modalContent } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO projects (title, imgSrc, code, projectLink, description, modalContent) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, imgSrc, code, projectLink, description, modalContent]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update an existing project
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, imgSrc, code, projectLink, description, modalContent } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE projects SET title = $1, imgSrc = $2, code = $3, projectLink = $4, description = $5, modalContent = $6 WHERE id = $7 RETURNING *',
      [title, imgSrc, code, projectLink, description, modalContent, id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Delete a project
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json({ message: 'Project deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;