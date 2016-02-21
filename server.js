// following tuto on : http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// routes for API
var towns = require('./backend/api/v1/towns');
var tenants = require('./backend/api/v1/tenant');
var owners = require('./backend/api/v1/owner');
var notes = require('./backend/api/v1/note');

// register routes
app.use('/api/towns', towns);
app.use('/api/tenants', tenants);
app.use('/api/owners', owners);
app.use('/api/notes', notes);

// start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d", port);