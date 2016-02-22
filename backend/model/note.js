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
        var query = client.query('select users.hash as hashurl, firstname, lastname, postal_code, town, date_start, date_end, capacity, attitude, degradation from t_notes as note inner join t_towns as town on town.id=note.id_town inner join t_users as users on users.id=note.id_tenant where id_owner=$1 order by note.id',
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

function insertNote(data, callback) {
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        var notes = [];
        var query = client.query('insert into t_notes (id_owner, id_tenant, id_town, date_start, date_end, capacity, attitude, degradation) values ($1,$2,$3,$4,$5,$6,$7,$8);',
            [data.id_owner,
                data.id_tenant,
                data.id_town,
                data.date_start,
                data.date_end,
                data.capacity,
                data.attitude,
                data.degradation], function (err, result) {
                if (err) {
                    console.error("failed to insert note " + err.message);
                }
                client.end();
                callback();
            });
    });
};
module.exports.insertNote = insertNote;
