var app = angular.module('fup');

/*
 * Directive to make a OHLC candlestick + volume chart
 * Object stock built according to :
 * stock : {
 * 	name : the name of the stock
 * 	ohlcv : the series 
 * }
 */
app.directive('hcStockVolume', function ($timeout) {
	return {
		restrict: 'C',
		replace: true,
		scope: {
			stock: '=',
			navigator: '=',
			selector: '=',
			scrollbar: '='
		},
		template: '<div>not working</div>',
		transclude: true,
		link: function (scope, element, attrs) {
			var groupingUnits = [['day',[1]],
			                     ['week',[1, 2, 3, 4]], 
			                     ['month',[1, 2, 3, 4, 6]]];

			var close = [];
			var volume = [];
			var name = '';
			if (scope.stock.name != undefined) {
				name = scope.stock.name;
			}
			angular.forEach(scope.stock.dailyquotes, function(value,key) {
				close.push([
				            (new Date(value.date)).getTime(),
				            value.close
				            ]);
				volume.push([
				             (new Date(value.date)).getTime(),
				             value.volume
				             ]);
			});

			var chart = new Highcharts.StockChart({
				chart: {
					renderTo: attrs.id,
					type: attrs.charttype,
					height: attrs.chartheight,
					width: attrs.chartwidth,
					backgroundColor: null,
					animation: true,
					events: {
						load: function(chart) {
							$timeout(function() {
								chart.target.reflow();   
							});
						}
					}
				},

				exporting: { enabled: false },
				navigator: {
					enabled: true
				},

				rangeSelector: {
					enabled: true,
					selected: 1
				},

				scrollbar: {
					enabled: true
				},

				yAxis: [{
					labels: {
						align: 'right',
						x: -3
					},
					title: {
						text: 'Price'
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
					name: 'Close',
					data: close,
					lineWidth: 3,
					tooltip: {
						valueDecimals: 2
					},
					dataGrouping: {
						units: groupingUnits
					}
				}, {
					type: 'column',
					name: 'Volume',
					data: volume,
					yAxis: 1,
					color:'#9D9D9D',
					dataGrouping: {
						units: groupingUnits
					}
				}]
			});

			scope.$watch("stock", function (newValue) {
				if (newValue != undefined) {
					var close = [];
					var volume = [];
					angular.forEach(newValue.dailyquotes, function(value,key) {
						close.push([
						            (new Date(value.date)).getTime(),
						            value.close
						            ]);
						volume.push([
						             (new Date(value.date)).getTime(),
						             value.volume
						             ]);
					});
					chart.series[0].setData(close, true);
					chart.series[1].setData(volume, true);
				}
			}, true);

			scope.$watch("navigator", function (newValue) {
				if (newValue != undefined) {
					var newOptions = chart.options;
					newOptions.navigator.enabled = newValue;
					chart = new Highcharts.StockChart(newOptions);
				}
			}, true);		

			scope.$watch("selector", function (newValue) {
				if (newValue != undefined) {
					var newOptions = chart.options;
					newOptions.rangeSelector.enabled = newValue;
					chart = new Highcharts.StockChart(newOptions);
				}
			}, true);		

			scope.$watch("scrollbar", function (newValue) {
				if (newValue != undefined) {
					var newOptions = chart.options;
					newOptions.scrollbar.enabled = newValue;
					chart = new Highcharts.StockChart(newOptions);
				}
			}, true);		
		}
	}
});