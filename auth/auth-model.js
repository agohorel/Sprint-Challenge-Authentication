const db = require("../database/dbConfig.js");

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

async function insert(data) {
  const [id] = await db("users").insert(data);
  return findBy({ id });
}

module.exports = { find, findBy, insert };
