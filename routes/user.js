const express = require("express");
const conf = require("config");
const axios = require("axios");
const debug = require("debug")("app:routes:users");

const User = require("../models/User.js");
const asyncH = require("../utils/asyncHandler.js");

let router = express.Router();

router.get("/", asyncH(getUser));
router.get("/add", asyncH(addUser));
router.get("/success", asyncH(afterGoogleLogin));

//Returns all users rn
async function getUser(req, res) {
  const f = await User.find().exec();
  debug(f, typeof f);
  res.json(f);
}

const sampleTest = {
  test: true,
  name: "Jorge Fuentes",
  email: "email@testing.com",
};

//For easy testing is get
async function addUser(req, res) {
  const newUser = new User(sampleTest);
  const resp = await newUser.save();
  res.json(resp);
}

//login from website after google redirect
async function afterGoogleLogin(req, res) {
  if (!req.session.grant || !req.session.grant.response) {
    console.error(`Login success failed, grant: ${req.session.grant}`);
    res.redirect("/");
    return;
  }

  const { access_token, refresh_token } = req.session.grant.response;
  const user = await getOrCreateGoogleUser(access_token);
  req.session.uid = user._id;

  res.redirect(conf.get("client_url"));
}

async function getOrCreateGoogleUser(gaccess_token) {
  let profile;
  resp = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${gaccess_token}`
  );
  profile = resp.data;

  const payload = {
    gid: profile.id,
    gaccess_token,
    verified_email: profile.verified_email,
    name: profile.name,
    pic: profile.picture,
    email: profile.email,
    locale: profile.locale,
    status: "ready",
  };

  const newUser = await getOrCreateUser(payload);
  return newUser;
}

//Get user or check the company
async function getOrCreateUser(payload) {
  let user;
  user = await User.findOne({ email: payload.email }).exec();
  if (user && user.status === "ready") {
    //Old User
    let newTokens = {};
    //only override tokens in database
    if (payload.gaccess_token) {
      newTokens.gaccess_token = payload.gaccess_token;
    }

    user = await User.findOneAndUpdate({ email: payload.email }, newTokens, {
      new: true,
    }).exec();
    debug("Getting oldUser", user);
  } else if (user && user.status !== "ready") {
    //Update User
    user = await User.findOneAndUpdate({ _id: user._id }, payload, {
      new: true,
    }).exec();
    debug("Updated user", user);
  } else {
    const userModel = new User(payload);
    user = await userModel.save();
    debug("Created newUser", user);
  }

  return user;
}

module.exports = router;
