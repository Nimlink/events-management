/**
 * Quote chart builder
 * Parameters :
 * - div : String
 * - data : {date:'a date' , value:'a value'}
 * - zoom : boolean
 */
function buildAmChartsQuotesChart(div, data, zoom) {

	var chart = AmCharts.makeChart(div, {
		type: "serial",
		theme: "light",
		marginRight: 80,
		autoMarginOffset: 20,
		dataDateFormat: "YYYY-MM-DD",
		valueAxes: [{
			id: "v1",
			axisAlpha: 0,
			position: "left"
		}],
		balloon: {
			borderThickness: 1,
			shadowAlpha: 0
		},
		mouseWheelZoomEnabled: true,
		graphs: [{
			id: "g1",
			bullet: "round",
			bulletBorderAlpha: 1,
			bulletColor: "#FFFFFF",
			bulletSize: 5,
			hideBulletsCount: 50,
			lineThickness: 2,
			title: "red line",
			useLineColorForBulletBorder: true,
			valueField: "value",
			balloonText: "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[category]]</span><br>[[value]]</div>"
		}],
		chartScrollbar: {
			graph: "g1",
			scrollbarHeight: 80,
			backgroundAlpha: 0,
			selectedBackgroundAlpha: 0.1,
			selectedBackgroundColor: "#888888",
			graphFillAlpha: 0,
			graphLineAlpha: 0.5,
			selectedGraphFillAlpha: 0,
			selectedGraphLineAlpha: 1,
			autoGridCount:true,
			color:"#AAAAAA"
		},
		chartCursor: {
			pan: true,
			valueLineEnabled: true,
			valueLineBalloonEnabled: true,
			cursorAlpha:0,
			valueLineAlpha:0.2
		},
		categoryField: "date",
		categoryAxis: {
			parseDates: true,
			dashLength: 1,
			minorGridEnabled: true,
			position: "top"
		},
		export: {
			enabled: true
		},
		dataProvider: data
	});

	if (zoom) {
		chart.addListener("rendered", zoomChart);
		zoomChart();
	}

	function zoomChart() {
		chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
	}
}


/**
 * Highstocks Quotes chart builder
 * Parameters :
 * - div : String
 * - seriesToPlot : {name:'the name' , data:'double[]'}
 * - enableNavigator : boolean to enable slider
 * - enableScrollbar : boolean to enable scrollbar
 */
function buildQuotesChart(div,seriesToPlot,enableNavigator,enableScrollbar) {
	var chart = new Highcharts.StockChart({
		chart: {
			renderTo: div,
			animation: false
		},            

		navigator : {
			enabled : enableNavigator
		},
		scrollbar : {
			enabled : enableScrollbar
		},

		plotOptions : {
			series : {
				animation: false        		
			}
		},

		series: seriesToPlot

	});
}

function createSerieFromQuote(serieName,quotes) {

	var quotesChartData = [];
	var closes = [];
	var volumes = [];
	var le = quotes.length;
	quotes.forEach(function (quote,index){
		temp = [];
		temp.push(new Date(quote.date));
		temp.push(quote.close);
		quotesChartData.push(temp);
	});

	var serie = [];
	serie.push({
		name: serieName,
		data: quotesChartData
	})

	return serie;
}

/**
 * Highstocks Quotes chart builder
 * Parameters :
 * - div : String
 * - seriesToPlot : {name:'the name' , data:'double[]'}
 * - enableNavigator : boolean to enable slider
 * - enableScrollbar : boolean to enable scrollbar
 */
function buildComplexQuotesChart(div,seriesToPlot,enableNavigator,enableScrollbar) {
	var chart = new Highcharts.StockChart({
		chart: {
			renderTo: 'chartdiv'
		},

		legend: {
			enabled: true,
			align: 'center',
			borderColor: 'black',
			borderWidth: 2,
			layout: 'horizontal',
			verticalAlign: 'bottom',
			shadow: true
		},

		yAxis: {
			labels: {
				formatter: function () {
					return (this.value > 0 ? ' + ' : '') + this.value + '%';
				}
			},
			plotLines: [{
				value: 0,
				width: 2,
				color: 'silver'
			}]
		},

		tooltip: {
			pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
			valueDecimals: 2
		},	    

		navigator : {
			enabled : enableNavigator
		},
		scrollbar : {
			enabled : enableScrollbar
		},

		plotOptions: {
			series: {
				compare: 'percent',
				animation: false  
			}
		},

		series: seriesToPlot

	});
}

/**
 * Highstocks Pie chart builder
 * Parameters :
 * - div : String
 * - seriesToPlot
 * - title : String title of the chart
 */
function buildSimplePieChart(div,seriesToPlot,title) {
	var chart = new Highcharts.Chart({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
			renderTo: div
		},
		title: {
			text: title
		},

		series: seriesToPlot

	});
}

function generateDistributionSeries(key,serieName,stocks,$translate) {

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

/**
 * Complex quotes chart builder
 * Parameters :
 * - div : String
 * - datasets : datasets with {date:'a date' , value:'a value'}
 * - zoom : boolean
 */
function buildComplexAmChartsQuotesChart(div, dataSetsToImport, zoom) {

	var chart = AmCharts.makeChart("chartdiv", {
		type: "stock",
		dataSets: dataSetsToImport,
		panels: [{
			title: "Panel 1",
			stockGraphs: [{
				valueField: "value",
				comparable: true
			}],
			stockLegend: {}
		}],
		chartCursorSettings: {
			valueLineEnabled: true,
			valueLineBalloonEnabled: true
		},
		periodSelector: {
			position: "bottom",
			inputFieldsEnabled: false,
			periods: [{
				period: "DD",
				count: 10,
				label: "10 days"
			}, {
				period: "MM",
				count: 1,
				label: "1 month"
			}, {
				period: "YYYY",
				count: 1,
				label: "1 year"
			}, {
				period: "YTD",
				label: "YTD"
			}, {
				period: "MAX",
				label: "MAX",
				selected: true
			}]
		}
	});

	chart.validateData();
	chart.validateNow();

}


/**
 * Histogram chart builder
 * Parameters :
 * - div : String
 * - seriesToPlot : {name:'the name' , data:'double[]'}
 * - enableNavigator : boolean to enable slider
 * - enableScrollbar : boolean to enable scrollbar
 */
function buildHistogramChart(div,values) {
	
	var categorieValues = [];
	var histoValues = [];
	
	var histoValuesTmp = histogram({data : values, bins : 10});
	var min = minimum(values);
	for (i in histoValuesTmp) {
		histoValues.push(histoValuesTmp[i].y);
		categorieValues.push('> ' + (min + parseInt(i)*histoValuesTmp[i].dx).toString() + ' =<' + (min + (parseInt(i)+1)*histoValuesTmp[i].dx).toString());
	}
	
	var chart = new Highcharts.Chart({
		chart: {
	        renderTo:div,
	        defaultSeriesType:'column',
	        borderWidth:0,
	        backgroundColor:'#eee',
	        borderWidth:1,
	        borderColor:'#ccc',
	        plotBackgroundColor:'#fff',
	        plotBorderWidth:1,
	        plotBorderColor:'#ccc'
	    },
	    credits:{enabled:false},
	    exporting:{enabled:false},
	    title:{text:''},
	    legend:{
	        //enabled:false
	    },
	    tooltip:{
	        borderWidth:1,
	        formatter:function() {
	            return '<b>Range:</b><br/> '+ this.x +'<br/>'+
	            '<b>Count:</b> '+ this.y;
	        }
	    },
	    plotOptions:{
	        column:{
	            shadow:false,
	            borderWidth:.5,
	            borderColor:'#666',
	            pointPadding:0,
	            groupPadding:0,
	            color: 'rgba(204,204,204,.85)'
	        },
	        spline:{
	            shadow:false,
	            marker:{
	                radius:1
	            }
	        },
	        areaspline:{
	            color:'rgb(69, 114, 167)',
	            fillColor:'rgba(69, 114, 167,.25)',
	            shadow:false,
	            marker:{
	                radius:1
	            }
	        }
	    },
	    xAxis:{
	        categories: categorieValues,
	        labels:{
	        	enabled:false
	        },
	        lineWidth:0,
	        tickLength: 0
	    },
	    yAxis:{
	        title:{text:''},
	        gridLineColor:'#e9e9e9',
	        tickWidth:1,
	        tickLength:3,
	        tickColor:'#ccc',
	        lineColor:'#ccc',
	        tickInterval:25,
	    },
	    series: [{
	    	showInLegend: false,
	        name:'Bins',
	        data: histoValues,
	    }]
	});
	return chart;
}
