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

    $scope.createNote = function (ev) {
        $mdDialog.show({
            controller: newNoteCtrl,
            templateUrl: 'note/modal_note_new.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    $scope.findTenant = function (ev) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        $mdDialog.show({
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                    $scope.go('/tenant/1234');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            templateUrl: 'search/modal_search.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
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
