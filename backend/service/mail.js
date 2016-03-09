var mailer = require("nodemailer");
var crypto = require('../service/crypto.js');

function sendMailActivation(mail, hash, callback) {
    var smtpTransport = mailer.createTransport('smtps://immotrankil%40gmail.com:startupsiliconvalley@smtp.gmail.com');
    var mailOption = {
        from: '"NO-REPLY" <immotrankil@gmail.com>',
        to: mail,
        subject: "ImmoTrankil : activation de votre email",
        text: "Veuillez svp cliquer sur le lien suivant : http://immotrankil.com/#/mail/" + hash,
        html: "Cher propriétaire,<br/><br/>Afin d'activer votre adresse email, veuillez, svp, cliquer sur le lien suivant : http://immotrankil.com/#/mail/"+ hash +"<br/>" +
        "Vous recevrez un email dès que votre attestation de propriétaire aura été validé par notre équipe. " +
        "Ce n'est qu'à ce moment là que vous pourrez commencer à saisir vos avis de locataires.<br/><br/>L'équipe ImmoTrankil"
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
        subject: "Compte ImmoTrankil validé " + mail,
        text: "Votre compte est activé.",
        html: "Cher propriétaire,<br/><br/>Nous vous signalons que votre compte vient d'être validé par notre équipe. " +
        "Vous pouvez dès maintenant ajouter et consulter des avis de locataires sur http://www.immotrankil.com.<br/><br/>L'équipe ImmoTrankil"
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
    var smtpTransport = mailer.createTransport('smtps://immotrankil%40gmail.com:startupsiliconvalley@smtp.gmail.com');
    var mailOption = {
        from: '"NO-REPLY" <immotrankil@gmail.com>',
        to: mail,
        subject: "Password compte ImmoTrankil",
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

