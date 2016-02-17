/**
 * Complex quotes chart builder
 * Parameters :
 * - div : String
 * - datasets : datasets with {date:'a date' , value:'a value'}
 * - zoom : boolean
 */
function buildStatementChart(div, dataSets, graphsInfo, rotateBoolean) {

	var graphsChart = [];

	for (g in graphsInfo) {
		data = graphsInfo[g];
		if (data.clustered == null) data.clustered = true;
		if (data.type == "column") {
			graphsChart.push({
				alphaField: "alpha",
				dashLengthField: "dashLength",
				fillAlphas: 0.7,
				title: data.name,
				type: "column",
				valueField: data.valField,
				valueAxis: data.axis,
				clustered: data.clustered
			});
		} else if (data.type == "bullet"){
			graphsChart.push({
				bullet: "square",
				bulletBorderAlpha: 1,
				bulletBorderThickness: 1,
				dashLengthField: "dashLength",
				title: data.name,
				fillAlphas: 0,
				valueField: data.valField,
				valueAxis: data.axis,
				clustered: data.clustered
			});
		}
	}

	var chart = AmCharts.makeChart(div, {
		type: "serial",
		theme: "light",
		legend: {
			equalWidths: true,
			useGraphSettings: true,
			valueAlign: "left",
			valueWidth: 20,
			verticalGap: 0,
			marginLeft: 0,
			marginRight: 0,
			spacing: 0
		},
		dataProvider: dataSets,
		valueAxes: [{
			id: "valueMUSDAxis",
			axisAlpha: 0,
			gridAlpha: 0,
			position: "left",
			title: "Millions USD"
		}, {
			id: "valueUSDAxis",
			axisAlpha: 0,
			gridAlpha: 0,
			position: "left",
			title: "USD"
		}, {
			id: "percentAxis",
			axisAlpha: 0,
			gridAlpha: 0,
			position: "right",
			title: "%"
		}, {
			id: "valueMUSDAxisStack",
			stackType: "regular",
			axisAlpha: 0,
			gridAlpha: 0,
			position: "left",
			title: "Millions USD"
		}, {
			id: "valueUSDAxisStack",
			stackType: "regular",
			axisAlpha: 0,
			gridAlpha: 0,
			position: "left",
			title: "USD"
		}, {
			id: "percentAxisStack",
			stackType: "regular",
			axisAlpha: 0,
			gridAlpha: 0,
			position: "right",
			title: "%"
		}],
		graphs: graphsChart,
		chartCursor: {
			categoryBalloonDateFormat: "YYYY",
			cursorAlpha: 0.1,
			cursorColor:"#000000",
			fullWidth:true,
			valueBalloonsEnabled: true,
			zoomable: false
		},
		rotate: rotateBoolean,
		dataDateFormat: "YYYY-MM-DD",
		categoryField: "date",
		categoryAxis: {
			dateFormats: [{
				period: "DD",
				format: "DD"
			}, {
				period: "WW",
				format: "MMM DD"
			}, {
				period: "MM",
				format: "MMM"
			}, {
				period: "YYYY",
				format: "YYYY"
			}],
			parseDates: true,
			autoGridCount: false,
			axisColor: "#555555",
			gridAlpha: 0.1,
			gridColor: "#FFFFFF",
			gridCount: 50,
			equalSpacing: true
		},
		export: {
			enabled: true
		}
	});
}
