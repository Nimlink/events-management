var app = angular.module('fup');

app.service('ownerService', function (dbQueriesService, $q) {

    this.getOwner = function (callback) {
        dbQueriesService.getOwner().then(
            function (res) {
                callback(null, res.data);
            },
            function (res) {
                callback(new Error('Failed'));
            });
    };

});
