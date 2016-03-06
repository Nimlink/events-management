module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var mailer = require("nodemailer");
    var mail = require('../../service/mail.js');
    var owner = require('../../model/user.js');

    router.post('/', function (req, res, next) {
        console.log(req.body);
        if (req.body == undefined) {
            res.setHeader('Content-Type', 'application/json');
            res.status(404).json('No data in post');
        } else {
            owner.getOwnerByMailForAuthentification(req.body.mail, function(err, user){
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(404).json('No user found');
                } else {
                    mail.sendPassword(req.body.mail, user.password, function(err,result){});
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json('ack');
                }
            })
        }
    });

    return router;
};