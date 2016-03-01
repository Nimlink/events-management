function LoginCtrl($scope, authService, $state, userSession, AUTH_EVENTS, $modal) {

    var resetFailure = function () {
        $scope.hasFailed = false;
        $scope.failMessage = "";
    };

    resetFailure();

    $scope.credentials = {
        mail: '',
        password: ''
    };

    $scope.password = function() {
        $modal.open({
            templateUrl: "login/modal_password.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: PassCtrl
        });
    }

    $scope.login = function() {
        resetFailure();
        authService.login($scope.credentials).then(function (user) {
            $state.go("index.owner");
        }, function (err) {
            $scope.hasFailed = true;
            if (err.status == 401){
                $scope.failMessage = 'Mail ou password incorrect';
            } else if (err.status == 402) {
                $scope.failMessage = "Votre dossier est en cours d'activation";
            } else {
                $scope.failMessage = "Veuillez vous reconnecter plus tard";
            }
        });
    }

    $scope.register = function() {
        $state.go("index_nobar.signup");
    }

};

var app = angular.module('fup');
app.controller('LoginCtrl', LoginCtrl);
