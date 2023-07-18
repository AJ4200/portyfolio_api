require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectsRouter = require('./projects');
const app = express();
const port = 8080;

app.use(bodyParser.json());
// Enable CORS with no restrictions
app.use(cors({
  origin: '*'
}));
app.use('/projects', projectsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});