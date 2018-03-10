const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passportConfig = require('./server/config/passport/passport')();
const session = require('express-session');
const models = require('./server/models');

//middleware
const isAuthenticated = require('./server/middlewares/isAuthenticated');

//routes
const welcome = require('./server/routes/welcome');
const auth = require('./server/routes/auth');
const recipe = require('./server/routes/recipe');
const userMe = require('./server/routes/user-me');
const user = require('./server/routes/user');
const ingredient = require('./server/routes/ingredient');
const tag = require('./server/routes/tag');
const unit = require('./server/routes/unit');
const upload = require('./server/routes/upload');

const baseUrl = process.env.NODE_ENV == 'production' ? '' : '/api';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2);

// add passport to app
app.use(passportConfig.initialize());


// routes
app.use(baseUrl + '/welcome', welcome);
app.use(baseUrl + '/auth', auth);
app.use(baseUrl + '/recipe', recipe);
app.use(baseUrl + '/user/me', isAuthenticated, userMe);
app.use(baseUrl + '/user', user);
app.use(baseUrl + '/ingredient', ingredient);
app.use(baseUrl + '/tag', tag);
app.use(baseUrl + '/unit', unit);
app.use(baseUrl + '/upload', upload);


app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    code: 404,
    message: "Page not found"
  });
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
