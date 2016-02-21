var express = require('express');
var router = express.Router();
var async = require("async");
var notes = require('../../model/note.js');

router.post('/', function (req, res) {
    if (req.body.data == undefined) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json('No data in post');
    } else {
    async.series([
        async.apply(notes.insertNote, req.body.data)
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

module.exports = router;