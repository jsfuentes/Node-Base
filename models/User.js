const mongoose = require("mongoose");

//1. Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  date: Date
});

//2. Compile model from schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
