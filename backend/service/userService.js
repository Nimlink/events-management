var users = require('../model/user.js');
var extend = require('../api/v1/util')._extend;
var crypto = require('../service/crypto.js');

exports.ERRORS_CODE = {
    NO_EMAIL_FOUND: "No-Email-Found",
    OWNER_NOT_ACTIVATED: "Owner-Not-Activated"
};

exports.isOwnerAuthorized = function (mail, password, callback) {
    users.getOwnerByMailForAuthentification(mail, function (err, user) {
        if (err) {
            callback(new Error(exports.ERRORS_CODE.NO_EMAIL_FOUND));
        } else {
            if (!user) {
                err = new Error(exports.ERRORS_CODE.NO_EMAIL_FOUND);
            } else if (user.isactivated === false || user.ismailactivated === false) {
                err = new Error(exports.ERRORS_CODE.OWNER_NOT_ACTIVATED);
            } else if (user.isactivated === true &&
                user.ismailactivated === true &&
                !crypto.compare(password, user.password)) {
                err = new Error(exports.ERRORS_CODE.NO_EMAIL_FOUND);
            }
            callback(err, user);
        }
    });
};
