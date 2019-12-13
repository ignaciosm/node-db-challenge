const express = require('express');

const db = require("../data/db-config.js");
const projects = require('./projects-model.js');

const router = express.Router();

// LIST PROJECTS
router.get('/', (req, res) => {

  projects.find()
  .then(projects => {
    const newArray = projects.map(p =>
      p.completed === 0 ? { ...p, completed: false } : {...p, completed: true}
    );
    res.json(newArray);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

// FIND PROJECT BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  projects.findById(id)
  .then(project => {
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get project' });
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

// GET TASKS FOR PROJECT
router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;

  projects.findTasks(id)
  .then(tasks => {
    if (tasks.length) {
      const newArray = tasks.map(t =>
        t.completed === 0 ? { ...t, completed: false } : {...t, completed: true}
      );
      res.json(newArray);
    } else {
      res.status(404).json({ message: 'Could not find tasks for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

module.exports = router;