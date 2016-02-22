module.exports = function (authService) {
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

    function isInt(value) {
        return !isNaN(value) &&
            parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
    }

    router.get('/:hash', function (req, res, next) {
        if (req.params.hash == undefined) {
            res.setHeader('Content-Type', 'application/json');
            res.status(404).json('No data');
        } else {
            async.series([
                async.apply(users.getTenantByHash, req.params.hash)
            ], function (err, user) {
                if (user[0].length < 1) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(404).json('No people found');
                } else {
                    async.series([
                        async.apply(notes.getNotesForTenant, user[0][0].id)
                    ], function (err, results) {
                        var tenant = {
                            firstname: user[0][0].firstname,
                            lastname: user[0][0].lastname,
                            notes: results[0]
                        };
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json(tenant);
                    });
                }
            });
        }
    });

    return router;
};