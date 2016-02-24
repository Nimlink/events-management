/**
 * ContactCtrl - controller
 */
function contactCtrl($rootScope, $stateParams, $scope, $state) {

    $scope.message = {
        title: undefined,
        text: undefined
    }

    //$scope.sendMail = function () {
    //    var link = "mailto:immotrankil@gmail.com"
    //            + "&subject=" + escape($scope.message.title)
    //            + "&body=" + escape($scope.message.text)
    //        ;
    //
    //    window.location.href = link;
    //}

};

angular
    .module('fup')
    .controller('contactCtrl', contactCtrl);
