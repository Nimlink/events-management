function PassCtrl($scope, authService,$modalInstance, $state, userSession, AUTH_EVENTS) {

    var resetFailure = function () {
        $scope.hasFailed = false;
        $scope.failMessage = "";
    };

    resetFailure();

    $scope.credentials = {
        mail: '',
        password: ''
    };

    $scope.ok = function() {
        resetFailure();
        authService.mailPassword($scope.credentials);
        $modalInstance.close();
    }

    $scope.cancel = function() {
        $modalInstance.dismiss();
    }

};

var app = angular.module('fup');
app.controller('PassCtrl', PassCtrl);
