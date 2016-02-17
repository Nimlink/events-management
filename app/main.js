/**
 * MainCtrl - controller
 */
function MainCtrl($rootScope, $scope, $translate, $location, dbQueriesService, userService, stockService) {


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
