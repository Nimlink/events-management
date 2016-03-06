var mailer = require("nodemailer");
var crypto = require('../service/crypto.js');

function sendMailActivation(mail, hash, callback) {
    var smtpTransport = mailer.createTransport('smtps://immotrankil%40gmail.com:startupsiliconvalley@smtp.gmail.com');
    var mailOption = {
        from: '"NO-REPLY" <immotrankil@gmail.com>',
        to: mail,
        subject: "Activation de votre mail",
        text: "Veuillez svp cliquer sur le lien suivant : http://immotrankil.com/#/mail/" + hash,
        html: "<b>Veuillez svp cliquer sur le lien suivant : http://immotrankil.com/#/mail/"+ hash +"</b>"
    }

    console.log(mailOption);
    smtpTransport.sendMail(mailOption, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            callback(null,'Mail sent');
        }
        smtpTransport.close();
    });
};
module.exports.sendMailActivation = sendMailActivation;

function sendAttestationActivation(mail, hash, callback) {
    var smtpTransport = mailer.createTransport('smtps://immotrankil%40gmail.com:startupsiliconvalley@smtp.gmail.com');
    var mailOption = {
        from: '"NO-REPLY" <immotrankil@gmail.com>',
        to: 'immotrankil@gmail.com',
        subject: "Activation du compte " + mail,
        text: "Activation du compte "+ mail +", svp cliquer sur le lien suivant : http://immotrankil.com/api/activation/attestation/" + hash,
        html: "<b>Activation du compte "+ mail +", svp cliquer sur le lien suivant : http://immotrankil.com/api/activation/attestation/"+ hash +"</b>"
    }

    console.log(mailOption);
    smtpTransport.sendMail(mailOption, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            callback(null,'Mail sent');
        }
        smtpTransport.close();
    });
};
module.exports.sendAttestationActivation = sendAttestationActivation;

function sendAccountValidated(mail, callback) {
    var smtpTransport = mailer.createTransport('smtps://immotrankil%40gmail.com:startupsiliconvalley@smtp.gmail.com');
    var mailOption = {
        from: '"NO-REPLY" <immotrankil@gmail.com>',
        to: mail,
        subject: "Compte validé " + mail,
        text: "Votre compte est activé.",
        html: "<b>Votre compte est activé.</b>"
    }

    console.log(mailOption);
    smtpTransport.sendMail(mailOption, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            callback(null,'Mail sent');
        }
        smtpTransport.close();
    });
};
module.exports.sendAccountValidated = sendAccountValidated;

function sendPassword(mail, password, callback) {
    var smtpTransport = mailer.createTransport('smtps://immotrankil%40gmail.com:startupsiliconvalley@smtp.gmail.com');
    var mailOption = {
        from: '"NO-REPLY" <immotrankil@gmail.com>',
        to: mail,
        subject: "Password compte ImmoTrankil",
        text: "Votre password est " + crypto.decrypt(password),
        html: "<b>Votre password est " + crypto.decrypt(password) + "</b>"
    }

    console.log(mailOption);
    smtpTransport.sendMail(mailOption, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            callback(null,'Mail sent');
        }
        smtpTransport.close();
    });
};
module.exports.sendPassword = sendPassword;

