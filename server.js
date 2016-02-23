// following tuto on : http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var authService = require('./backend/service/auth')({
    "secret": 'ImmoTrankilSecret',
    "token":{
        "expiresIn" : "1d" // expires in 24 hours
    }});
var flash = require('connect-flash');

var app = express();
app.use(flash());
app.use(bodyParser.json({limit: '10mb'}));
app.use(favicon(path.join(__dirname, 'backend', 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // NOTE: Set static prior Session activation

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    next();
});

app.use(function (req, res, next) { // enable CORS  Cross-Origin Resource Sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept, x-access-token");
    next();
});

app.use(session({secret: 'secret immo trankil', resave: false, saveUninitialized: false}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./backend/service/passport')(passport);
require('./backend/service/passport.local')(passport, authService);

// routes for API
var auth = require('./backend/api/v1/auth')(passport, authService);
var towns = require('./backend/api/v1/towns')(authService);
var tenants = require('./backend/api/v1/tenant')(authService);
var owners = require('./backend/api/v1/owner')(authService);
var notes = require('./backend/api/v1/note')(authService);

// register routes
app.use('/api/auth', auth);
app.use('/api/towns', towns);
app.use('/api/tenants', tenants);
app.use('/api/owners', owners);
app.use('/api/notes', notes);
app.use(function (req, res, next) {
    var err = new Error('No service found for URL: ' + req.url);
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    if (!req.session) {
        console.log("session is not set");
    }
    res.status(err.status || 500).json({
        message: err.message
    });
});

// start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d", port);
