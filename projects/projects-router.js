const express = require('express');

const db = require("../data/db-config.js");
const projects = require('./projects-model.js');

const router = express.Router();

// LIST PROJECTS
router.get('/', (req, res) => {
  projects.list()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

// ADD PROJECTS
router.post('/', (req, res) => {
  const projectData = req.body;

  projects.add(projectData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

module.exports = router;