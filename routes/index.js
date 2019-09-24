const express = require("express");

const knex = require("../db.js");

let router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  const results = await knex.select().from("vote");
  console.log("Knex", results);
  res.send("<h1>Welcome to Express</h1>");
});

module.exports = router;
