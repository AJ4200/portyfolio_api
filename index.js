require('dotenv').config();
 const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const readProjects = require('./projects').default;
 const app = express();
app.use(bodyParser.json());
 // Enable CORS with no restrictions
app.use(cors({
  origin: '*'
}));
 // Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
}
 // Get all projects using the function readProjects from the projects file
app.get('/projects', readProjects);
 // Start the server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});