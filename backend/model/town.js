var config = require('../config.json');
var pg = require('pg');
var connectionString = config.LPP_POSTGRESQL_URL;

function getTowns(callback) {
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        var countries = [];
        var query = client.query('SELECT * FROM t_towns');
        query.on('row', function (row) {
            countries.push(row);
        });
        query.on('end', function () {
            client.end();
            callback(null, countries);
        });
    });
};
module.exports.getTowns = getTowns;

function findTowns(search, callback) {
    var client = new pg.Client(connectionString);
    search_pattern = search.toLowerCase() + '%';
    client.connect(function (err) {
        var countries = [];
        var query = client.query('SELECT * FROM t_towns WHERE LOWER(town) like $1 OR postal_code like $1 ORDER BY town limit 20', [search_pattern]);
        query.on('row', function (row) {
            countries.push(row);
        });
        query.on('end', function () {
            client.end();
            callback(null, countries);
        });
    });
};
module.exports.findTowns = findTowns;
