const express = require("express");
const debug = require("debug")("app:routes:index");

let router = express.Router();

/* GET home page. */
router.get("/", getHeartBeat);
router.get("/test", getHeartBeat);

function getHeartBeat(req, res) {
  if (process.env.NODE_ENV === "PRODUCTION") {
    res.sendStatus(200);
  } else {
    res.send("Hi, I'm Node-Base");
  }
}

module.exports = router;
