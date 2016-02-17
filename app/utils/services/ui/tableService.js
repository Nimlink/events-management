var app = angular.module('fup');

/*
 * Service for table HTML
 */
app.service('tableService', function($translate, formatterService, mathService){

	/*
	 * Return an array like
	 * 2010   |  2011   |  2012 ....
	 */
	this.getStatementYears = function(stock, from, to) {
		var items = [];
		angular.forEach(stock.incomes, function(value,key) {
			var date = (new Date(value.date)).getFullYear();
			if (date >= from && date <= to) {
				items.push(date);
			}
		});
		return items;
	}
	
	this.getMaxStatementYear = function(stock) {
		var possibleYears = this.getStatementYears(stock, 1900, 2100);
		return mathService.maximum(possibleYears);
	}
		
	/*
	 * Function to generate a table of statement
	 * var : 	{
	 * 				stock: stock,
	 * 				year: 	{
	 * 							from: 2010,
	 * 							to:2014
	 * 						},
	 * 				lines: 	[
	 * 							{
	 * 								type : 'statement' or 'dividend',
	 * 								item : statementOperationService Object,
	 * 							}
	 * 						]
	 * 			}
	 */
	this.getTable = function(object) {
		
		var table = {};
		table.headers = [];
		table.lines = [];
		
		table.headers = this.getStatementYears(object.stock, object.year.from, object.year.to);
		
		angular.forEach(object.lines, function(value,key) {
			
			if (value.type == 'statement') {
				var line = [];
				line.push(value.item.displayName);
				angular.forEach(Object.keys(value.item.values), function(year,key) {
					if (year >= object.year.from && year <= object.year.to) {
						line.push(formatterService.formatStatement(value.item.values[year], $translate.instant(value.item.currency)));
					}
				});
				table.lines.push(line);
				
			} else if (value.type == 'dividend') {
				var line = [];
				line.push($translate.instant('dividend'));
				angular.forEach(object.stock.dividends, function(value,key) {
					if (parseInt(value.year) >= object.year.from && parseInt(value.year) <= object.year.to) {
						line.push(value.dividend + ' ' + $translate.instant(object.stock.currency));
					}
				});
				table.lines.push(line);
			}
			
		});
		return table;
	}
});
