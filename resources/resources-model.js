const db = require("../data/db-config.js");

module.exports = {
  list,
  add
}

function list() {
  return db("resources");
}

function add(resource) {
  return db("resources")
  .insert(resource, 'id')
  .then(ids => {
    const [id] = ids;
    return db("resources");
  })
}