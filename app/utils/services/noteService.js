var app = angular.module('fup');

app.service('noteService', function (dbQueriesService, $q) {

    this.insertNote = function (data) {
        var users = [];
        var deferred = $q.defer();

        dbQueriesService.postNote(data).then(
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
