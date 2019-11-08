const express = require("express");
const debug = require("debug")("app:routes:index");

let router = express.Router();

/* GET home page. */
router.get("/", getIndex);

function getIndex(req, res) {
  res.send("<h1>Welcome to Express</h1>");
}

module.exports = router;
