module.exports = function (authService) {
    var express = require('express');
    var router = express.Router();
    var user = require('../../model/user.js');

    router.get('/:search', function (req, res, next) {
        if (req.params.search == undefined) {
            res.setHeader('Content-Type', 'application/json');
            res.status(404).json('No data');
        } else {
            user.searchTenant(req.params.search, function(err,results){
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(results);
            })
        }
    });

    return router;
};