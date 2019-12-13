const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findTasks,
  add
}

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects").where({id}).first();
}

function findTasks(projectId) {
  return db("tasks")
    .select('tasks.id', 'tasks.description as task_description', 'projects.name as project', 'projects.description as project_description')
    .join('projects', 'tasks.project_id', 'projects.id')
    .where('project_id', projectId)
}

function add(project) {
  return db("projects")
  .insert(project, 'id')
  .then(ids => {
    const [id] = ids;
    return db("projects");
  })
}