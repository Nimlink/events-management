module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var users = require('../../model/user.js');

    router.get('/mail/:hash', function (req, res, next) {
        if (req.params.hash == undefined) {
            res.setHeader('Content-Type', 'application/json');
            res.status(404).json('No data');
        } else {
            users.validateMailOwner(req.params.hash, function (err, results) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).json('No user');
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json('ack');
                }
            });
        }
    });

    router.get('/attestation/:hash', function (req, res, next) {
        if (req.params.hash == undefined) {
            res.setHeader('Content-Type', 'application/json');
            res.status(404).json('No data');
        } else {
            users.validateAttestationOwner(req.params.hash, function (err, results) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).json('No user');
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json('ack');
                }
            });
        }
    });

    return router;
};