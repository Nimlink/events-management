var mailer = require("nodemailer");

function sendMailActivation(mail, hash, callback) {
    var smtpTransport = mailer.createTransport('smtps://immotrankil%40gmail.com:startupsiliconvalley@smtp.gmail.com');
    var mail = {
        from: '"NO-REPLY" <immotrankil@gmail.com>',
        to: mail,
        subject: "Activation de votre mail",
        text: "Veuillez svp cliquer sur le lien suivant : http://immotrankil.com/api/activation/mail/" + hash,
        html: "<b>Veuillez svp cliquer sur le lien suivant : http://immotrankil.com/api/activation/mail/"+ hash +"</b>"
    }

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
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
    var mail = {
        from: '"NO-REPLY" <immotrankil@gmail.com>',
        to: 'immotrankil@gmail.com',
        subject: "Activation du compte " + mail,
        text: "Activation du compte "+ mail +", svp cliquer sur le lien suivant : http://immotrankil.com/api/activation/attestation/" + hash,
        html: "<b>Activation du compte "+ mail +", svp cliquer sur le lien suivant : http://immotrankil.com/api/activation/attestation/"+ hash +"</b>"
    }

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null,'Mail sent');
        }
        smtpTransport.close();
    });
};
module.exports.sendAttestationActivation = sendAttestationActivation;

