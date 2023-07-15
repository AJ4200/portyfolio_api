const fs = require('fs');
 function readProjects(req, res, next) {
  try {
    const data = fs.readFileSync('projectsData.json', 'utf8');
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (err) {
    next(err);
  }
}
 module.exports.default = readProjects;