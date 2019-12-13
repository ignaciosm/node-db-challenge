const db = require("../data/db-config.js");

module.exports = {
  list,
  add
}

function list() {
  return db("projects");
}

function add(project) {
  return db("projects")
  .insert(project, 'id')
  .then(ids => {
    const [id] = ids;
    return db("projects");
  })
}