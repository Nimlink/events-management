var config = require('../config.json');
var pg = require('pg');
var connectionString = config.LPP_POSTGRESQL_URL;

function getNotesForTenant(id_tenant, callback) {
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        var notes = [];
        var query = client.query('select postal_code, town, date_start, date_end, capacity, attitude, degradation from t_notes as note inner join t_towns as town on town.id=note.id_town where id_tenant=$1 order by date_start',
            [id_tenant]);
        query.on('row', function (row) {
            notes.push(row);
        });
        query.on('end', function () {
            client.end();
            callback(null, notes);
        });
    });
};
module.exports.getNotesForTenant = getNotesForTenant;

function getNotesForOwner(id_owner, callback) {
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        var notes = [];
        var query = client.query('select users.id as id, firstname, lastname, postal_code, town, date_start, date_end, capacity, attitude, degradation from t_notes as note inner join t_towns as town on town.id=note.id_town inner join t_users as users on users.id=note.id_tenant where id_owner=$1 order by date_start',
            [id_owner]);
        query.on('row', function (row) {
            notes.push(row);
        });
        query.on('end', function () {
            client.end();
            callback(null, notes);
        });
    });
};
module.exports.getNotesForOwner = getNotesForOwner;
