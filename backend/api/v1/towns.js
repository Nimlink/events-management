var express = require('express');
var router = express.Router();
var async = require("async");
var townDB = require('../../model/town.js');

router.get('/', function (req, res, next) {
    async.series([
        townDB.getTowns
    ], function (err, results) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results[0]);
    });
});

module.exports = router;