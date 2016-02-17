var app = angular.module('fup');

/*
 * Factory for Statement years
 */
app.factory('StatementYearComboBoxFactory', function($http, dbQueriesService){

	var years = []

	function init(callback) {
		dbQueriesService.getStatementYears().success(function(data, status) {
			for (i in data) {
				years.push({
					item : data[i].toString()
				});
			}
			callback(null);
		});
	}

	function getYears() {
		return years;
	}

	return {
		init : init,
		getYears : getYears
	};
});
