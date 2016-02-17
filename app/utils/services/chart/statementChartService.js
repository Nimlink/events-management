var app = angular.module('fup');

/*
 * Service for table HTML
 */
app.service('statementChartService', function($translate, formatterService){

	var object = {};
	this.createColumnSerie = function(statementOperationObject) {
		object.type = 'column';
		object.name = statementOperationObject.displayName;
		object.tooltip = {
				valueSuffix: ' M' + $translate.instant(statementOperationObject.currency)
		};
		object.data = [];
		angular.forEach(Object.keys(statementOperationObject.values), function(year,key) {
			object.data.push(statementOperationObject.values[year]);
		});
		return object;
	}

	this.createSplineSerie = function(statementOperationObject, suffix) {
		var object = {};
		object.type = 'spline';
		object.name = statementOperationObject.displayName;
		object.yAxis = 1;
		if (suffix != undefined) {
			object.tooltip = {
					valueSuffix: suffix,
					valueDecimals: 2
			};
		} else {
			object.tooltip = {
					valueDecimals: 2
			};
		}
		object.data = [];
		angular.forEach(Object.keys(statementOperationObject.values), function(year,key) {
			object.data.push(statementOperationObject.values[year]);
		});
		return object;
	}

	this.generateDistributionSeries = function(key, serieName, stocks, $translate) {

		var stocksDistribution = {};

		stocks.forEach( function (stock, index) {
			if (stocksDistribution[stock[key]] == null) {
				stocksDistribution[stock[key]] = 1;
			} else {
				stocksDistribution[stock[key]] = stocksDistribution[stock[key]] + 1;
			}
		});

		var serieData = [];
		for (var k in stocksDistribution) {
			serieData.push({
				name: $translate.instant(k),
				y: stocksDistribution[k]
			});
		}
		var series = [];
		series.push({
			name: serieName,
			colorByPoint: true,
			data: serieData
		})

		return series;
	}

});
