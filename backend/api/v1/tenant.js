var express = require('express');
var router = express.Router();
var async = require("async");
var users = require('../../model/user.js');
var notes = require('../../model/note.js');

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
            if (results[0].length > 7) {
                res.setHeader('Content-Type', 'application/json');
                res.status(404).json('Too many people found');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(results[0]);
            }
        });
    }
});

router.get('/:id', function (req, res, next) {
    if (req.params.id == undefined) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json('No data');
    } else {
        async.series([
            async.apply(users.getTenantById, req.params.id),
            async.apply(notes.getNotesForTenant, req.params.id)
        ], function (err, results) {
            if (results[0].length < 1) {
                res.setHeader('Content-Type', 'application/json');
                res.status(404).json('No people found');
            } else {
                var tenant = {
                    firstname: results[0][0].firstname,
                    lastname: results[0][0].lastname,
                    notes: results[1]
                };
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(tenant);
            }
        });
    }
});


module.exports = router;