module.exports = function (authService) {
    var express = require('express');
    var router = express.Router();
    var aws = require('aws-sdk');

    aws.config.loadFromPath('backend/ses.json');
    var ses = new aws.SES({apiVersion: '2010-12-01'});
    var from = 'immotrankil@gmail.com';
    var to = ['sebastienthomass@gmail.com'];

    router.post('/', function (req, res, next) {
        ses.sendEmail({
            Source: from,
            Destination: {ToAddresses: to},
            Message: {
                Subject: {
                    Data: 'A Message To You Rudy'
                },
                Body: {
                    Text: {
                        Data: 'Stop your messing around',
                    }
                }
            }
        }, function (err, data) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json('ack');
        })
    });

    return router;
};