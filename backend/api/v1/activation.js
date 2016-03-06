module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var users = require('../../model/user.js');
    var mail = require('../../service/mail.js');

    router.get('/mail/:hash', function (req, res, next) {
        if (req.params.hash == undefined) {
            res.setHeader('Content-Type', 'application/json');
            res.status(404).json('No data');
        } else {
            users.validateMailOwner(req.params.hash, function (err, user) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).json('No user');
                } else {
                    mail.sendAttestationActivation(user.mail, user.attestationactivationhash, function(err, result){});
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
            users.validateAttestationOwner(req.params.hash, function (err, user) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).json('No user');
                } else {
                    mail.sendAccountValidated(user.mail, function(err, result){})
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json('ack');
                }
            });
        }
    });

    return router;
};