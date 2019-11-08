const mongoose = require("mongoose");

//1. Define a schema
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: String,
  date: Date
});

//2. Compile model from schema
const Test = mongoose.model("Bananas", TestSchema);

module.exports = Test;
