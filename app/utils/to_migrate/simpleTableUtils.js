function buildSimpleTable(colsHeader, rowsHeader, data, $translate) {
	var html = '<table class="table table-hover">';

	html += '<thead><tr>';
	html += '<th></th>';
	for (var h in colsHeader) {
		html += '<th>' + colsHeader[h] + '</th>';
	}
	html += '</tr></thead><tbody>';

	for (var r in rowsHeader) {
		html += '<tr>';
		html += '<td>' + $translate.instant(rowsHeader[r]) + '</td>';
		for (var d in data[r]) {
			html += '<td>' + data[r][d] + '</td>';
		}
		html += '</tr>';
	}
	html += '</tbody></table>';

	return html;
}

function buildRankingTable($scope, $translate, uiGridConstants) {

	generateRankingTable();
	initializeRankingsButtons();

	function generateRankingTable() {

		/* RANKING TABLE */
		$scope.gridOption = {
				enableSorting: true,
				enableGridMenu: true,
				showGridFooter: true,
				rowHeight: 30,
				columnDefs: [
				             { field: 'country', width:25, displayName: '',
				            	 cellTemplate: '<div style="text-align:center;vertical-align:middle;"><img ng-src="images/flag/{{COL_FIELD}}_18.png"></div>'},
				            	 { field: 'symbol' , enableHiding: false, pinnedLeft:true, width:75, aggregationType: uiGridConstants.aggregationTypes.sum,
				            		 cellTemplate: '<div class="ui-grid-cell-contents"><a href="#/stock/{{ row.entity.isin }}">{{COL_FIELD}}</a></div>'},
				            		 { field: 'name'},
				            		 { field: 'operating_income'}],
				            		 onRegisterApi: function( gridApi ) {
				            			 $scope.gridTableApi = gridApi;
				            			 $scope.gridTableApi.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
				            				 $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
				            			 });
				            		 }
		};
	}

	function getPrimaryRankingTableHeader() {
		var colDefs = [	{ field: 'country', width:25, displayName: '',
			cellTemplate: '<div style="text-align:center;vertical-align:middle;"><img ng-src="images/flag/{{COL_FIELD}}_18.png"></div>'},
			{ field: 'symbol' , enableHiding: false, pinnedLeft:true, width:75, aggregationType: uiGridConstants.aggregationTypes.sum,
				cellTemplate: '<div class="ui-grid-cell-contents"><a href="#/stock/{{ row.entity.isin }}">{{COL_FIELD}}</a></div>'},
				{ field: 'name'}];

		return colDefs
	}

	function initializeRankingsButtons() {
		document.getElementById ("revenues").addEventListener ("click", getRevenuesTableRanking, false);
	}

	function getRevenuesTableRanking() {
		var colDefs = getPrimaryRankingTableHeader();
		colDefs.push({field: 'total_revenues'});
		$scope.gridOption.columnDefs = colDefs;
		$scope.gridTableApi.core.refresh();
	}

}

