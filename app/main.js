/**
 * MainCtrl - controller
 */
function MainCtrl($rootScope, $state, $scope, $modal, $location, dbQueriesService, authService, $translate, $log) {

    $scope.search = {};
    $scope.towns = [];

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.logout = function () {
        authService.logout();
        $state.go('index_nobar.login');
    };

};

function translateCtrl($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}

angular
    .module('fup')
    .controller('MainCtrl', MainCtrl)
    .controller('translateCtrl', translateCtrl)
