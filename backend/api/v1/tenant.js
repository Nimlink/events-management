var express = require('express');
var router = express.Router();
var async = require("async");
var users = require('../../model/user.js');

router.post('/', function (req, res) {
    if (req.body.firstname == undefined || req.body.lastname == undefined) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json('No data in post');
    } else {
        var firstname = req.body.firstname.toLowerCase();
        var lastname = req.body.lastname.toLowerCase();
        async.series([
            async.apply(users.getTenant, firstname, lastname)
        ], function (err, results) {
            if (results[0].length > 3) {
                res.setHeader('Content-Type', 'application/json');
                res.status(404).json('Too many people found');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(results[0]);
            }
        });
    }
});

module.exports = router;