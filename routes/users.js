const express = require("express");
const debug = require("debug")("app:routes:users");

const Test = require("../models/Test.js");
const asyncH = require("../utils/asyncHandler.js");

let router = express.Router();

router.get("/", asyncH(getUser));
router.get("/add", asyncH(addUser));

async function getUser(req, res) {
  const f = await Test.find().exec();
  debug(f, typeof f);
  res.json(f);
}

const sampleTest = { test: true, name: "Jorge Fuentes", date: Date() };

//For easy testing is get
async function addUser(req, res) {
  const newTest = new Test(sampleTest);
  const resp = await newTest.save();
  res.json(resp);
}

module.exports = router;
