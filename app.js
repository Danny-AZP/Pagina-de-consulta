var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var module = require('module');
var cookieParser= require('cookie-parser');
var body= require('body-parser');
var session= require('express-session');
var app = express();

var { url } = require('./config/conexionmongo');
mongoose.connect(url, {
});
require('./config/passport')(passport);
//setings
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
   console.log('app on port', app.get('port'));
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(body.urlencoded({extended : false}));
app.use(session({
  secret: 'peaceandate',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//routes
require('./routes')(app, passport);
//static files
app.use(express.static(path.join(__dirname, 'public')));
app
