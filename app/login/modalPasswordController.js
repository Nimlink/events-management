function PassCtrl($scope, authService,$modalInstance, $state, userSession, AUTH_EVENTS) {

    $scope.mail = '';

    $scope.ok = function() {
        authService.mailPassword({mail:$scope.mail});
        $modalInstance.close();
    }

    $scope.cancel = function() {
        $modalInstance.dismiss();
    }

};

var app = angular.module('fup');
app.controller('PassCtrl', PassCtrl);
