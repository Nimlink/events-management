/**
 * MainCtrl - controller
 */
function MainCtrl($rootScope, $scope, $modal, $location, townService, $translate, $log, $mdMedia, $mdDialog) {

    $scope.towns = [];
    $scope.town = {};
    $scope.town.selected = undefined;

    async.parallel([
        townService.init,
    ], function (err, result) {
        $scope.towns = townService.getTowns();
    });

    $scope.createNote = function () {

        $modal.open({
            templateUrl: "note/modal_note_new.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: newNoteCtrl
        });
    };

    $scope.findTenant = function () {
        $modal.open({
            templateUrl: "search/modal_search.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                    $scope.go('/tenant/1234');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    };

    $scope.go = function ( path ) {
        $location.path( path );
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
