var express = require('express');
var app = express();
var router = require('./router');
var http = require('http').Server(app);

var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);


var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.set('view engine', 'ejs'); 

require('./config/passport')(passport); // pass passport for configuration
app.use(session({ 
	secret: 'secret_key',
 	resave: true,
    saveUninitialized: true 
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 

mongoose.connection.on('error',(err)=>
{
    console.error("Database Connection Error: " + err);
    
});

router(app, express, passport);


http.listen(3000, function(){
	console.log("Server is running on port 3000");
})