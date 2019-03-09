const 
  createError = require('http-errors'),
  cookieParser = require('cookie-parser'),
  debug = require('debug')('app'),
  express = require('express'),
  logger = require('morgan'),
  path = require('path');

const 
  indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Import the mongoose module
let mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB = 'mongodb://admin:admin@ds227199.mlab.com:27199/tixcoin';
debug("Connecting to %o", mongoDB);

mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
