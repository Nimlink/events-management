var users = require('../model/user.js');
var extend = require('../api/v1/util')._extend;
var bCrypt = require('bcrypt-nodejs');

exports.ERRORS_CODE = {
    NO_EMAIL_FOUND: "No-Email-Found",
    OWNER_NOT_ACTIVATED: "Owner-Not-Activated"
};

exports.isValidByMail = function (mail, callback) {
    users.getOwnerByMailForAuthentification(mail, function (err, user) {
        if (err) {
            callback(err, null);
        }
        else {
            if (!user) {
                err = new Error(exports.ERRORS_CODE.NO_EMAIL_FOUND);
            }
            else if (user.isActivated === false) {
                err = new Error(exports.ERRORS_CODE.OWNER_NOT_ACTIVATED);
            }

            callback(err, user);
        }
    });
};

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

exports.isValidPassword = function (foundUser, reqPassword) {
    if (foundUser.password) {
        return bCrypt.compareSync(reqPassword, foundUser.password);
        //return reqPassword === foundUser.password;
    }
    console.log("password has to not be null. User: ", foundUser);
    return false;
};
