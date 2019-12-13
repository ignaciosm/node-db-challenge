const express = require('express');

const db = require("../data/db-config.js");
const resources = require('./resources-model.js');

const router = express.Router();

// LIST resourceS
router.get('/', (req, res) => {
  resources.list()
  .then(resources => {
    res.json(resources);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});

// ADD resourceS
router.post('/', (req, res) => {
  const resourceData = req.body;

  resources.add(resourceData)
  .then(resource => {
    res.status(201).json(resource);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new resource' });
  });
});

module.exports = router;