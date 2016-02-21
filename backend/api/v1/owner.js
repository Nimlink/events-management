var express = require('express');
var router = express.Router();
var async = require("async");
var users = require('../../model/user.js');
var notes = require('../../model/note.js');

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

router.get('/:id', function (req, res, next) {
    if (req.params.id == undefined) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json('No data');
    } else {
        if (isInt(req.params.id)) {
            async.series([
                async.apply(users.getOwnerById, req.params.id),
                async.apply(notes.getNotesForOwner, req.params.id)
            ], function (err, results) {
                if (results[0].length < 1) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(404).json('No people found');
                } else {
                    var tenant = {
                        firstname: results[0][0].firstname,
                        lastname: results[0][0].lastname,
                        nb_request: results[0][0].nb_request,
                        notes: results[1]
                    };
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(tenant);
                }
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(404).json('No data');
        }

    }
});


module.exports = router;