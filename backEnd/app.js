var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const cartRouter = require('./routes/cart')
var GitHubStrategy = require('passport-github').Strategy;
const config = require('./config');

var app = express();

const helmet = require('helmet');
app.use((helmet()));

// Allow cross-origin.....
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

// ==============================PASSPORT FILES==============================

app.use(session({
  secret: 'super secret password',
  resave: false,
  saveUninitialized: true,
}));
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GitHubStrategy({
    clientID: config.passport.clientID,
    clientSecret: config.passport.clientSecret,
    callbackURL: config.passport.callbackUrl
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log('Function ran');
    // console.log(profile);
    return cb(null, profile)

  }
));

passport.serializeUser((user, cb)=>{
  cb(null,user);
})
passport.deserializeUser((user,cb)=>{
  cb(null,user)
})

// ====================================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
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

module.exports = app;
