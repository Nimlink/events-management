module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res, next) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json('ack');
    });

    return router;
};