var UserModel = require('../model/user');
//var userService = require('../service/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var util = require('../api/v1/util');
var userService = require('./userService');


module.exports = function (appConfig) {
    var auth = {};

    auth.roles = {
        owner: "PRO",
        admin: "ADM",
        tenant: "LOC"
    };

    auth.authenticate = function (err, user, callback) {
        if (err) {
            var statusMap = {};
            statusMap[userService.ERRORS_CODE.NO_EMAIL_FOUND] = 401;      // Unauthorized
            statusMap[userService.ERRORS_CODE.OWNER_NOT_ACTIVATED] = 402;   // To validate
            err.status = statusMap[err.message] || 401;
            return callback(err);
        }

        if (!user) {
            return callback(null, false);
        }

        var tokenUser = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            inscription_date: user.inscription_date
        };

        var token = jwt.sign({user: tokenUser}, appConfig.secret, {
            expiresIn: appConfig.token.expiresIn // expires in 1 day
        });
        user.token = token;

        return callback(null, user);
    };


    auth.ensureAuthorized = function (options) {

        return function (req, res, next) {
            // check header or url parameters or post parameters for token
            var token = req.headers['x-access-token'] || req.body.token || req.query.token;
            var TOKEN_EXPIRED_ERROR = "TokenExpiredError";


            if (token) {
                // verifies secret and checks expiration date
                jwt.verify(token, appConfig.secret, function (err, decoded) {
                    if (err) {
                        // 401 Unauthorized
                        err.status = 401;
                        if (err.name == TOKEN_EXPIRED_ERROR) {
                            err.status = 419;  // 419 Authentication Timeout (not in RFC 2616)
                        }

                        util.handleError(err, res);
                    } else {
                        req.decoded = decoded;  // if everything is good, save to request for use in other routes
                        next();
                    }
                });
            } else {
                // if there is no token return an error
                // 403 Forbidden
                return res.status(403).send({
                    success: false,
                    message: 'No valid token provided.'
                });
            }
        };
    };

    auth.throwNotAuthorized = function (req, res, next) {
        var id = (req.decoded) ? req.decoded.user.id : "";
        var err = new Error("Action not authorized for current user: " + id);
        err.status = 403;

        util.handleError(err, res);
    };


    return auth;
};