function ControlsButtonCtrl($scope, $modal, $http, $translate, dbQueriesService) {

    $scope.createNote = function () {
        $modal.open({
            templateUrl: "note/modal_note_new.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    };
}

var app = angular.module('fup');
app.controller('ControlsButtonCtrl', ControlsButtonCtrl);
