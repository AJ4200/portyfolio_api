require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// Get all projects
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        projects.title,
        projects.imgsrc AS "imgSrc",
        projects.code,
        projects.projectlink AS "projectLink",
        array_agg(technologies.tech) AS tech,
        projects.description,
        projects.modalcontent AS "modalContent"
      FROM 
        projects
      LEFT JOIN 
        technologies ON projects.id = technologies.project_id
      GROUP BY 
        projects.id
    `);
    const projects = rows.map((row) => {
      return {
        title: row.title,
        imgSrc: row.imgSrc,
        code: row.code,
        projectLink: row.projectLink,
        tech: row.tech,
        description: row.description,
        modalContent: row.modalContent,
      };
    });
    res.json(projects);
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(`
      SELECT 
        projects.title,
        projects.imgsrc AS "imgSrc",
        projects.code,
        projects.projectlink AS "projectLink",
        array_agg(technologies.tech) AS tech,
        projects.description,
        projects.modalcontent AS "modalContent"
      FROM 
        projects
      LEFT JOIN 
        technologies ON projects.id = technologies.project_id
      WHERE 
        projects.id = $1
      GROUP BY 
        projects.id
    `, [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      const project = {
        title: rows[0].title,
        imgSrc: rows[0].imgSrc,
        code: rows[0].code,
        projectLink: rows[0].projectLink,
        tech: rows[0].tech,
        description: rows[0].description,
        modalContent: rows[0].modalContent,
      };
      res.json(project);
    }
  } catch (error) {
    console.error('Error retrieving project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/', async (req, res) => {
  const { title, imgSrc, code, projectLink, description, modalContent } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO projects (title, imgSrc, code, projectLink, description, modalContent) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, imgSrc, code, projectLink, description, modalContent]
    );
    const project = {
      title: rows[0].title,
      imgSrc: rows[0].imgSrc,
      code: rows[0].code,
      projectLink: rows[0].projectLink,
      tech: [],
      description: rows[0].description,
      modalContent: rows[0].modalContent,
    };
    res.status(201).json(project);
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
      const project = {
        title: rows[0].title,
        imgSrc: rows[0].imgSrc,
        code: rows[0].code,
        projectLink: rows[0].projectLink,
        tech: [],
        description: rows[0].description,
        modalContent: rows[0].modalContent,
      };
      res.json(project);
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