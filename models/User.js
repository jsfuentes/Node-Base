const mongoose = require("mongoose");

//1. Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  gid: String,
  name: String,
  pic: String,
  email: String,
  created_date: { type: Date, default: Date.now },
  test: Boolean
});

//2. Compile model from schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
