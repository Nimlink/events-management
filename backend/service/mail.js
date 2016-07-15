var mailer = require("nodemailer");
var crypto = require('../service/crypto.js');

function sendMailActivation(mail, hash, callback) {
    var smtpTransport = mailer.createTransport('EMAIL AUTHENTICATION');
    var mailOption = {
        from: '"NO-REPLY" <EMAIL>',
        to: mail,
        subject: "Events Management : activation de votre email",
        text: "Veuillez svp cliquer sur le lien suivant : URL" + hash,
        html: "Activation manuelle nécessaire."
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
    var smtpTransport = mailer.createTransport('EMAIL AUTHENTICATION');
    var mailOption = {
        from: '"NO-REPLY" <EMAIL>',
        to: 'EMAIL',
        subject: "Activation du compte " + mail,
        text: "Activation du compte "+ mail +", svp cliquer sur le lien suivant : URL" + hash,
        html: "<b>Activation du compte "+ mail +", svp cliquer sur le lien suivant : URL"+ hash +"</b>"
    }

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
    var smtpTransport = mailer.createTransport('EMAIL AUTHENTICATION');
    var mailOption = {
        from: '"NO-REPLY" <EMAIL>',
        to: mail,
        subject: "Compte validé " + mail,
        text: "Votre compte est activé.",
        html: "Bienvenu"
    }

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
    var smtpTransport = mailer.createTransport('EMAIL AUTHENTICATION');
    var mailOption = {
        from: '"NO-REPLY" <EMAIL>',
        to: mail,
        subject: "Password compte",
        text: "Votre password est " + crypto.decrypt(password),
        html: "<b>Votre password est " + crypto.decrypt(password) + "</b>"
    }

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

