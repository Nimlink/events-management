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

    this.createOwner = function (data) {
        var users = [];
        var deferred = $q.defer();
        dbQueriesService.createOwner(data).then(
            function (res) {
                users = res;
                deferred.resolve(users);
            },
            function (res) {
                deferred.reject(res.data);
            });
        return deferred.promise;
    };

});
