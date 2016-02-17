var app = angular.module('fup');

/*
 * Directive to make a OHLC candlestick + volume chart
 * Object stock built according to :
 * stock : {
 * 	name : the name of the stock
 * 	ohlcv : the series 
 * }
 */
app.directive('hcOhlcv', function ($timeout) {
	return {
		restrict: 'C',
		replace: true,
		scope: {
			stock: '='
		},
		template: '<div>not working</div>',
		transclude: true,
		link: function (scope, element, attrs) {
			var groupingUnits = [['day',[1]],
			                     ['week',[1, 2, 3, 4]], 
			                     ['month',[1, 2, 3, 4, 6]]];

			var ohlc = [];
			var volume = [];
			var name = '';
			if (scope.stock.name != undefined) {
				name = scope.stock.name;
			}
			angular.forEach(scope.stock.ohlcv, function(value,key) {
				ohlc.push([
				           new Date(value.date),
				           value.open,
				           value.high,
				           value.low,
				           value.adj
				           ]);
				volume.push([
				             new Date(value.date),
				             value.volume
				             ]);
			});

			var chart = new Highcharts.StockChart({
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
					}
				},

				rangeSelector: {
					selected: 1
				},

				yAxis: [{
					labels: {
						align: 'right',
						x: -3
					},
					title: {
						text: 'OHLC'
					},
					height: '60%',
					lineWidth: 2
				}, {
					labels: {
						align: 'right',
						x: -3
					},
					title: {
						text: 'Volume'
					},
					top: '70%',
					height: '30%',
					offset: 0,
					lineWidth: 2
				}],

				series: [{
					type: 'candlestick',
					name: name,
					data: ohlc,
					dataGrouping: {
						units: groupingUnits
					}
				}, {
					type: 'column',
					name: 'Volume',
					data: volume,
					yAxis: 1,
					dataGrouping: {
						units: groupingUnits
					}
				}]
			});
			
			scope.$watch("stock", function (newValue) {
				if (newValue != undefined) {
					var ohlc = [];
					var volume = [];
					angular.forEach(newValue.ohlcv, function(value,key) {
						ohlc.push([
						           new Date(value.date),
						           value.open,
						           value.high,
						           value.low,
						           value.adj
						           ]);
						volume.push([
						             new Date(value.date),
						             value.volume
						             ]);
					});
					chart.series[0].setData(ohlc, true);
					chart.series[0].name = newValue.name;
					chart.series[1].setData(volume, true);
				}
			}, true);
			
		}
	}
});