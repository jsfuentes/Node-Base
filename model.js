//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});

// Compile model from schema
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

module.exports = SomeModel;
