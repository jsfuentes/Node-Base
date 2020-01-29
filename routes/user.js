const express = require("express");
const debug = require("debug")("app:routes:users");

const User = require("../models/User.js");
const asyncH = require("../utils/asyncHandler.js");

let router = express.Router();

router.get("/", asyncH(getUser));
router.get("/add", asyncH(addUser));

//Returns all users rn
async function getUser(req, res) {
  const f = await User.find().exec();
  debug(f, typeof f);
  res.json(f);
}

const sampleTest = {
  test: true,
  name: "Jorge Fuentes",
  email: "email@testing.com"
};

//For easy testing is get
async function addUser(req, res) {
  const newUser = new User(sampleTest);
  const resp = await newUser.save();
  res.json(resp);
}

module.exports = router;
