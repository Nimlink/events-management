// following tuto on : http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('toto');
        if (username == 'admin') {
            return done(null, 'ok');
        }
        return done(null, false, { message: 'Incorrect username.' });
    }
));

var port = process.env.PORT || 3000;

// connect to db
//var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/fup_db';
//var client = new pg.Client(connectionString);
//client.connect();

app.use(function (req, res, next) {

    // db
    //req.db = client;

    // proxy
    // req.proxy = 'http://emeamai-px01.main.glb.corp.local:8080';
    req.proxy = null;

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();

});


// routes for API
var users = require('./backend/users');

// register routes
app.use('/api/users', users);

// start server
app.listen(port);
console.log("Express server listening on port %d", port);
