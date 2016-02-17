var app = angular.module('fup');

/*
 * Service for DB queries
 */
app.service('dbQueriesService', function ($http) {

    // stocks
    this.getStocks = function () {
        return $http.get('/api/stocks');
    };

    // stocks detailed
    this.getStockByIsin = function (isin) {
        return $http.get('/api/stocks/' + isin);
    };

    this.getCountries = function () {
        return $http.get('/api/countries');
    };

    this.getExchanges = function () {
        return $http.get('/api/exchanges');
    };

    this.getSectors = function () {
        return $http.get('/api/sectors');
    };

    this.getCurrencies = function () {
        return $http.get('/api/currencies');
    };

    // Stocks
    this.getStock = function (isin) {
        return $http.get('/api/stocks/' + isin);
    };

    this.getStockDailyQuotes = function (isin) {
        return $http.get('/api/quotes/' + isin);
    };

    // Statements
    this.getStatementValuesForAllStocks = function (type, statement, year) {
        return $http.get('/api/statements/' + type + '/' + statement + '/' + year);
    };

    // Factors
    this.getAllFactorListForUser = function (user) {
        return $http.get('/api/factorlists/' + user.id);
    };

    this.getAllFactorsForUser = function (user) {
        return $http.get('/api/factors/' + user.id);
    };

    this.getFactorTags = function () {
        return $http.get('/api/factortags/');
    };

    // Factor detailed
    this.getFactor = function (id_factor) {
        return $http.get('/api/factor/' + id_factor);
    };

    this.addFactor = function (factor) {
        return $http.post('/api/factor/add', factor);
    };

    this.delFactor = function (id_factor) {
        return $http.post('/api/factor/del', id_factor);
    };

    // factor list
    this.getFactorLists = function (user) {
        return $http.get('/api/factorlists/' + user.id);
    };

    this.addFactorList = function (data) {
        return $http.post('/api/factorlists/add/', {'data': data});
    };

    this.delFactorList = function (data) {
        return $http.post('/api/factorlists/del/', data);
    };

    // tags for factor
    this.getFactorTagsForFactor = function (id_factor) {
        return $http.get('/api/factortags/' + id_factor);
    };
    // add a tag for factor
    this.addFactorTag = function (data) {
        return $http.post('/api/factortags/add/', {'data': data});
    };

    // Others
    this.getStatementYears = function () {
        return $http.get('/api/statistics/statements/years');
    };


    // User
    this.getCurrentUser = function (pseudo) {
        return $http.get('/api/users/' + pseudo);
    };

});
