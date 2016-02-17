var express = require('express');
var router = express.Router();

/* GET sectors listing. */
router.get('/', function(req, res, next) {
    console.log('Getting users list');
    var users = [];
    var client = req.db;
    var query = client.query('SELECT * FROM v_users');
    query.on('row', function(row) {
        users.push(row);
    });

    query.on('end', function() {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });

});


module.exports = router;
