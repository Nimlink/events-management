/**
 * ContactCtrl - controller
 */
function contactCtrl($rootScope, $stateParams, $scope, $state) {

    $scope.message = {
        title: undefined,
        text: undefined
    }

};

angular
    .module('fup')
    .controller('contactCtrl', contactCtrl);
