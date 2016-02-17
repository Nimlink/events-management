var app = angular.module('fup');

/*
 * Service for the factor group
 */
app.service('factorListService', function (dbQueriesService, $q, userService) {

    var lists = [];

    // clear object
    this.clear = function () {
        lists = [];
    };

    // get groups
    this.getLists = function () {
        return lists;
    };

    // load factor
    this.init = function (callback) {
        this.clear;
        dbQueriesService.getFactorLists(userService.getCurrentUser()).success(function (data) {
            lists = data;
            callback(null);
        });
    };

    // add a factor list : return a promise
    this.addFactorList = function (list) {
        var deferred = $q.defer();
        dbQueriesService.addFactorList({
            user: userService.getCurrentUser().id,
            name: list
        }).success(function (data) {
            deferred.resolve(data);
            lists.push(data);
        });
        return deferred.promise;
    }

    // add a factor list : return a promise
    this.delFactorList = function (listId) {
        var deferred = $q.defer();
        dbQueriesService.delFactorList({id: listId}).success(function (data) {
            deferred.resolve(true);
            for (var i = lists.length - 1; i >= 0; i--) {
                if (lists[i].id == listId) {
                    lists.splice(i, 1);
                }
            }
        });
        return deferred.promise;
    }

});
