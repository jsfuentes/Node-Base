const express = require("express");

const Votes = require("../model.js");

let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("<h1>Welcome to Express</h1>");
});

module.exports = router;
