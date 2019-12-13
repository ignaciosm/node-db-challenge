const express = require('express');

const db = require("../data/db-config.js");
const tasks = require('./tasks-model.js');

const router = express.Router();

// LIST taskS
router.get('/', (req, res) => {
  tasks.find()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

// FIND task BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  tasks.findById(id)
  .then(task => {
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Could not find task with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get task' });
  });
});

// ADD taskS
router.post('/', (req, res) => {
  const taskData = req.body;

  tasks.add(taskData)
  .then(task => {
    res.status(201).json(task);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task' });
  });
});

module.exports = router;