module.exports = function (authService) {
    var express = require('express');
    var router = express.Router();
    var mailer = require("nodemailer");

    var aws = require('aws-sdk');
    aws.config.loadFromPath('backend/ses.json');
    var ses = new aws.SES({apiVersion: '2010-12-01'});
    var from = 'immotrankil@gmail.com';
    var to = ['sebastienthomass@gmail.com'];

    router.post('/', function (req, res, next) {
        console.log('Send email');

        // Use Smtp Protocol to send Email
        var smtpTransport = mailer.createTransport('smtps://immotrankil%40gmail.com:startupsiliconvalley@smtp.gmail.com');
        var mail = {
            from: '"NO-REPLY" <immotrankil@gmail.com>',
            to: "sebastienthomass@gmail.com",
            subject: "Send Email Using Node.js",
            text: "Node.js New world for me",
            html: "<b>Node.js New world for me</b>"
        }

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json('ack');
            }

            smtpTransport.close();
        });
    });

    return router;
};