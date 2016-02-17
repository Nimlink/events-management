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

/* GET user by pseudo */
router.get('/:igg', function(req, res, next) {
	console.log('Getting user info for pseudo : ' + req.params.igg);
	var users = [];
	var client = req.db;
	var query = client.query('SELECT * FROM v_users WHERE igg=$1', [req.params.igg]);
	query.on('row', function(row) {
		users.push(row);
	});

	query.on('end', function() {
		var user = {};
		if (users.length > 0) {
			user = users[0];
		}
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(user);
	});

});

module.exports = router;
