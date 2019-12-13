const express = require('express');

const ProjectsRouter = require('./projects/projects-router.js');
const ResourcesRouter = require('./resources/resources-router.js');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectsRouter);
server.use('/api/resources', ResourcesRouter);

module.exports = server;