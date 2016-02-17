function ContractsProgressAdminCtrl($scope, $modal, $http, $translate, dbQueriesService, uiGridConstants) {

    $scope.clickHandler = {
        onClick: function (value) {
            createContract();
        }
    };

    $scope.createContract = function () {
        $modal.open({
            templateUrl: "projects/cig/modal_contract_new.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    };

    /* TABLE */
    $scope.columns = [
        {
            field: 'volet', displayName: '', width: 35,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered"><button type="button" class="btn btn-xs btn-link" ng-click="grid.appScope.createContract()"><i class="fa fa-edit" ></i></button></div>'
        },
        {
            field: 'volet', displayName: $translate.instant('volet'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered"><span class="badge badge-danger">{{COL_FIELD}}</span></div>'
        },
        {
            field: 'action', displayName: $translate.instant('action'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered"><span class="badge badge-warning">{{COL_FIELD}}</span></div>'
        },
        {
            field: 'deliverable', displayName: $translate.instant('deliverable'), width: 200,
            cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="index.cig_contract({id:{{ row.entity.id_contract }}})">{{COL_FIELD}}</a></div>'
        },
        {
            field: 'contract', displayName: $translate.instant('contract_name'), width: 200,
            cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="index.cig_contract({id:{{ row.entity.id_contract }}})">{{COL_FIELD}}</a></div>'
        },
        {
            field: 'contract_type', displayName: $translate.instant('contract_type'), width: 160,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_contractor', displayName: $translate.instant('contract_contractor'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_state', displayName: $translate.instant('contract_state'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_progress', displayName: $translate.instant('contract_progress'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_cpm', displayName: $translate.instant('contract_cpm'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_cpsi', displayName: $translate.instant('contract_cpsi'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents row-centered">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_start_date', displayName: $translate.instant('contract_start_date'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_end_date', displayName: $translate.instant('contract_end_date'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_end_warranty', displayName: $translate.instant('contract_end_warranty'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_da', displayName: $translate.instant('contract_da'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_dsct', displayName: $translate.instant('contract_dsct'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_asc', displayName: $translate.instant('contract_asc'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_cmd', displayName: $translate.instant('contract_cmd'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_nb_uo', displayName: $translate.instant('contract_nb_uo'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_tjm', displayName: $translate.instant('contract_tjm'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_budget_year', displayName: $translate.instant('contract_budget_year'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_budget_account', displayName: $translate.instant('contract_budget_account'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>'
        },
        {
            field: 'contract_budget_prev', displayName: $translate.instant('contract_budget_prev'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>',
            aggregationType: uiGridConstants.aggregationTypes.sum
        },
        {
            field: 'contract_budget_mob', displayName: $translate.instant('contract_budget_mob'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>',
            aggregationType: uiGridConstants.aggregationTypes.sum
        },
        {
            field: 'contract_budget_engage', displayName: $translate.instant('contract_budget_engage'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>',
            aggregationType: uiGridConstants.aggregationTypes.sum
        },
        {
            field: 'contract_budget_real', displayName: $translate.instant('contract_budget_real'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>',
            aggregationType: uiGridConstants.aggregationTypes.sum
        },
        {
            field: 'contract_budget_pdc2', displayName: $translate.instant('contract_budget_pdc2'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>',
            aggregationType: uiGridConstants.aggregationTypes.sum
        },
        {
            field: 'contract_budget_pdc5', displayName: $translate.instant('contract_budget_pdc5'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>',
            aggregationType: uiGridConstants.aggregationTypes.sum
        },
        {
            field: 'contract_budget_pdc9', displayName: $translate.instant('contract_budget_pdc9'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>',
            aggregationType: uiGridConstants.aggregationTypes.sum
        },
        {
            field: 'contract_budget_pdc', displayName: $translate.instant('contract_budget_pdc'), width: 120,
            cellTemplate: '<div class="ui-grid-cell-contents pull-right">{{COL_FIELD}}</div>',
            aggregationType: uiGridConstants.aggregationTypes.sum
        }
    ];

    $scope.gridOption = {
        enableSorting: true,
        enableGridMenu: true,
        showGridFooter: true,
        //rowHeight: 26,
        appScopeProvider: this,
        enableColumnResizing: true,
        selectedItems: $scope.selectedEntries,
        columnDefs: $scope.columns,
        onRegisterApi: function (gridApi) {
            $scope.grid1Api = gridApi;

            gridApi.core.on.columnVisibilityChanged($scope, function (changedColumn) {
                $scope.columnChanged = {name: changedColumn.colDef.name, visible: changedColumn.colDef.visible};
            });
        }
    };

    $scope.gridOption.data = [
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
        {
            volet: "Geomodelisation",
            action: "Data Analysis",
            id_deliverable: '1',
            deliverable: "Univariate",
            id_contract: '1234',
            contract: "Evolutions univriate",
            contract_type: "Developpement externe",
            contract_contractor: "CAPGEMINI",
            contract_state: "En cours",
            contract_progress: "35%",
            contract_start_date: "1/12/15",
            contract_end_date: "1/6/16",
            contract_end_warranty: "1/8/16",
            contract_cpsi: "Seb Thomas",
            contract_cpm: "Nicolas O",
            contract_da: "20000568789",
            contract_dsct: "2345",
            contract_asc: "56797",
            contract_cmd: "46000000",
            contract_nb_uo: "130",
            contract_tjm: "430",
            contract_budget_year: "2015",
            contract_budget_account: "35TIGEOCIG",
            contract_budget_prev: "10000",
            contract_budget_mob: "12000",
            contract_budget_engage: "11000",
            contract_budget_real: "4000",
            contract_budget_pdc2: "8000",
            contract_budget_pdc5: "9000",
            contract_budget_pdc9: "10000",
            contract_budget_pdc: "11000"
        },
    ];
}
var app = angular.module('fup');
app.controller('ContractsProgressAdminCtrl', ContractsProgressAdminCtrl);
