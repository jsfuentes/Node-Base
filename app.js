const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const debug = require("debug")("app");
const conf = require("config");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const grant = require("grant-express");
const Sentry = require("@sentry/node");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

////////////////////
// DB Setup
////////////////////
if (conf.get("db_uri") == "")
  throw new Error("Must fill in db_uri in config/default.json");
const mongoDB = conf.get("db_uri");
debug(`Connecting to ${mongoDB}`);

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

////////////////////
// Server Setup
////////////////////
let app = express();

app.use(Sentry.Handlers.requestHandler({ ip: true })); // Must be first middleware
app.use(
  session({
    name: "j_f",
    secret: "the experimental prototype city of tomorrow",
    saveUninitialized: true,
    secure: false,
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Middleware
// Uncomment below line and fill in grant in config files to use this better passport
// app.use(grant(conf.get("GRANT_CONFIG")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs
app.use("/api/user", userRouter);
//catch bad api calls
app.use("/api", (req, res, next) => next(createError(404)));

//Client Pages
app.use("/", indexRouter); //default basics
//Uncomment Below to get a react build folder to work
/* 
app.use(express.static(path.join(__dirname + "/build")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
*/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handlers
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(err) {
      return true; //by default only captures 500, but lets capture all errors
    },
  })
); //must be first error handler and after all controllers
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.error(err);

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error
  res.status(err.status || 500);
  res.send("Server Error");
});

module.exports = app;
