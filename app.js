const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const debug = require("debug")("app");
const conf = require("config");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const path = require("path");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");

////////////////////
// DB Setup
////////////////////
if (conf.get("db_uri") == "")
  throw new Error("Must fill in db_uri in config/default.json");
const mongoDB = conf.get("db_uri");
debug(`Connecting to ${mongoDB}`);

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

////////////////////
// Server Setup
////////////////////
let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error
  res.status(err.status || 500);
  res.send("Server Error");
});

module.exports = app;
