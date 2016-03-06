function mailCtrl($rootScope, $stateParams, $scope, dbQueriesService) {
    dbQueriesService.validate_mail($stateParams.id)
};

angular
    .module('fup')
    .controller('mailCtrl', mailCtrl);
