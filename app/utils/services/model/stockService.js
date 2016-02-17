var app = angular.module('fup');

/*
 * Service for the factor
 */
app.service('stockService', function (dbQueriesService, $q) {

    var stocks = [];

    // init stocks
    this.init = function (callback) {
        stocks = [];
        dbQueriesService.getStocks().success(function (data) {
            stocks = data;
            callback(null);
        });
    }

    // get all stocks
    this.getAllStocks = function () {
        return stocks;
    }

    // get detailed stock information
    this.getStockByIsin = function (isin) {
        var deferred = $q.defer();
        dbQueriesService.getStockByIsin(isin).success(function (data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }

})
;
