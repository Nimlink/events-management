var app = angular.module('fup');

/**
 * Highcharts Pie chart directive
 * Parameters :
 * - div : String
 * - seriesToPlot
 * - title : String title of the chart
 */
app.directive('hcPieChart', function ($timeout) {
	return {
		restrict: 'C',
		replace: true,
		scope: {
			dataseries: '='
		},
		template: '<div>not working</div>',
		transclude: true,
		link: function (scope, element, attrs) {
			var chart = new Highcharts.Chart({
				chart: {
					renderTo: attrs.id,
					type: attrs.charttype,
					height: attrs.chartheight,
					width: attrs.chartwidth,
					animation: true,
					events: {
						load: function(chart) {
							$timeout(function() {
								chart.target.reflow();   
							});
						}
					},
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				title: {
					text: null
				},

				series: []

			});

			scope.$watch("dataseries", function (newValue) {
				if (newValue != undefined) {
					while( chart.series.length > 0 ) {
					    chart.series[0].remove( false );
					}
					angular.forEach(newValue, function(value,key) {
						chart.addSeries(value,true);
					});
				}
			}, true);

		}
	}
});