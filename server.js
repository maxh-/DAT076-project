const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
// Passport config
const passportConfig = require('./server/config/passport/passport');
const session = require('express-session');
const models = require('./server/models');

const welcome = require('./server/routes/welcome');
const user = require('./server/routes/user');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add passport to app
app.use(session({ secret: 'extremthemligsecret', 
                  resave: false,
                  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/welcome', welcome);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
