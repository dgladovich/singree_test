var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const expressValidation = require('express-validation');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const { store, passport } = require('./utils');
var logger = require('morgan');

var router = require('./routes/index');

var app = express();

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store
}))

/**
 * Passport Local
 */
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router);

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

app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        res.status(err.status).json(err);
    } else {
        res.status(500)
            .json({
                status: err.status,
                message: err.message
            });
    }
});

module.exports = app;
