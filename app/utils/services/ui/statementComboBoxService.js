var app = angular.module('fup');

/*
 * Factory for Statement grammar and grouping 
 */
app.factory('StatementComboBoxFactory', function($http, $translate, $q, dbQueriesService){

	var statements_grammar = {};
	var statements = []

	function init(callback) {
		dbQueriesService.getStock('FR0010557264').success(function(stock, status) {
			// Income grammar
			statements_grammar.income = [];
			for (var k in stock.stock.incomes[0]) {
				if (	k != 'id' && 
						k != 'date' &&
						k != 'id_stock') {
					statements_grammar.income.push({
						name: k,
						displayName: $translate.instant(k)
					});
				}
			}

			// Balance Sheet grammar
			statements_grammar.balance_sheet = [];
			for (var k in stock.stock.balancesheets[0]) {
				if (	k != 'id' && 
						k != 'date' &&
						k != 'id_stock') {
					statements_grammar.balance_sheet.push({
						name: k,
						displayName: $translate.instant(k)
					});
				}
			}

			// Cash Flow grammar
			statements_grammar.cash_flow = [];
			for (var k in stock.stock.cashflows[0]) {
				if (	k != 'id' && 
						k != 'date' &&
						k != 'id_stock') {
					statements_grammar.cash_flow.push({
						name: k,
						displayName: $translate.instant(k)
					});
				}
			}

			// Create statement items for combo box
			for (k in statements_grammar.income) {
				statements.push({
					group: $translate.instant('income'),
					item: statements_grammar.income[k].displayName,
					data : {
						group : 'income',
						item : statements_grammar.income[k].name
					}
				});
			}
			for (k in statements_grammar.balance_sheet) {
				statements.push({
					group: $translate.instant('balance_sheet'),
					item: statements_grammar.balance_sheet[k].displayName,
					data : {
						group : 'balance_sheet',
						item : statements_grammar.balance_sheet[k].name
					}
				});
			}
			for (k in statements_grammar.cash_flow) {
				statements.push({
					group: $translate.instant('cash_flow'),
					item: statements_grammar.cash_flow[k].displayName,
					data : {
						group : 'cash_flow',
						item : statements_grammar.cash_flow[k].name
					}
				});
			}
			callback(null);
		});
	}

	function getStatements() {
		return statements;
	}

	function getGrouping(item) {
		return item.group;
	}

	return {
		init : init,
		getStatements : getStatements,
		getGrouping : getGrouping
	};
});
