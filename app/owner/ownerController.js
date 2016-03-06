/**
 * MainCtrl - controller
 */
function ownerCtrl( $scope, ownerNoteService) {

    $scope.ownerNoteService = ownerNoteService;
    $scope.owner = {};
    $scope.notes = [];
    $scope.moyenne = {};

    ownerNoteService.refresh(function(err){
        $scope.owner = ownerNoteService.getOwner();
        $scope.notes = ownerNoteService.getNotes();
        $scope.moyenne = ownerNoteService.getMoyenne();
    });

    $scope.$watch(function(){ return ownerNoteService.getNotes(); }, function (newVal, oldVal, scope) {
        if(newVal) {
            if (newVal.length > 0) {
                $scope.owner = ownerNoteService.getOwner();
                $scope.notes = ownerNoteService.getNotes();
                $scope.moyenne = ownerNoteService.getMoyenne();
            }
        }
    });

};

angular
    .module('fup')
    .controller('ownerCtrl', ownerCtrl);
