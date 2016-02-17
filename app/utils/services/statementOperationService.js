var app = angular.module('fup');

/*
 * Service for basic maths
 */
app.service('statementOperationService', function($translate){

	this.get = function(stock, item, nameOverride) {
		var statement = {};
		if (nameOverride != undefined) {
			statement.name = nameOverride;
			statement.displayName = $translate.instant(nameOverride);
		} else {
			statement.name = item;
			statement.displayName = $translate.instant(item);
		}
		statement.values = {};
		statement.currency = stock.currency;
		var income = stock.incomes[0];
		if (income != undefined) {
			if (income[item] != undefined) {
				angular.forEach(stock.incomes, function(value,key) {
					var date = (new Date(value.date)).getFullYear();
					statement.values[date] = value[item];
				});
				return statement;
			}
		}
		var bs = stock.balancesheets[0];
		if (bs != undefined) {
			if (bs[item] != undefined) {
				angular.forEach(stock.balancesheets, function(value,key) {
					var date = (new Date(value.date)).getFullYear();
					statement.values[date] = value[item];
				});
				return statement;
			}
		}
		var cf = stock.cashflows[0];
		if (cf != undefined) {
			if (cf[item] != undefined) {
				angular.forEach(stock.cashflows, function(value,key) {
					var date = (new Date(value.date)).getFullYear();
					statement.values[date] = value[item];
				});
				return statement;
			}
		}
		return statement;
	}

	this.add = function(stmt1, stmt2, name) {
		var statement = {};
		statement.name = name;
		statement.displayName = $translate.instant(name);
		statement.values = {};
		statement.currency = stmt1.currency;
		angular.forEach(Object.keys(stmt1.values), function(year,key) {
			if (stmt2.values[year] != undefined) {
				statement.values[year] = stmt1.values[year] + stmt2.values[year];
			}
		});
		return statement;
	}

	this.del = function(stmt1, stmt2, name) {
		var statement = {};
		statement.name = name;
		statement.displayName = $translate.instant(name);
		statement.currency = stmt1.currency;
		statement.values = {};
		angular.forEach(Object.keys(stmt1.values), function(year,key) {
			if (stmt2.values[year] != undefined) {
				statement.values[year] = stmt1.values[year] - stmt2.values[year];
			}
		});
		return statement;
	}

	this.multiply = function(stmt1, stmt2, name) {
		var statement = {};
		statement.name = name;
		statement.displayName = $translate.instant(name);
		statement.currency = stmt1.currency;
		statement.values = {};
		angular.forEach(Object.keys(stmt1.values), function(year,key) {
			if (stmt2.values[year] != undefined) {
				statement.values[year] = stmt1.values[year] * stmt2.values[year];
			}
		});
		return statement;
	}

	this.divide = function(stmt1, stmt2, name) {
		var statement = {};
		statement.name = name;
		statement.displayName = $translate.instant(name);
		statement.currency = stmt1.currency;
		statement.values = {};
		angular.forEach(Object.keys(stmt1.values), function(year,key) {
			if (stmt2.values[year] != undefined) {
				statement.values[year] = stmt1.values[year] / stmt2.values[year];
			}
		});
		return statement;
	}

	this.percent = function(stmt1, stmt2, name) {
		var statement = {};
		statement.name = name;
		statement.displayName = $translate.instant(name);
		statement.currency = stmt1.currency;
		statement.values = {};
		angular.forEach(Object.keys(stmt1.values), function(year,key) {
			if (stmt2.values[year] != undefined) {
				statement.values[year] = stmt1.values[year] / stmt2.values[year] * 100;
			}
		});
		return statement;
	}

});
