/**
 * SignupCtrl - controller
 */
function signupCtrl($rootScope, $stateParams, $scope, $state) {

    $scope.ok = function() {
        $state.go("index_nobar.signup");
    }

};

angular
    .module('fup')
    .controller('signupCtrl', signupCtrl);
