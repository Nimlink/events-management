function currencyFormatter(value,currency) {

//	var string = '';
	var string = formatValue(value) + ' ' + currency;

//	switch(currency) {
//	case 'EUR':
//		string = newValue + 
//		break;
//	case n:
//		code block
//		break;
//	default:
//	default code block
//	} 

	return string;
}

function formatValue(value) {
	
	var billion = 1000000000;
	var million = 1000000;
	var thousand = 1000;
	
	var range = 3;
	
	var string = '';
	var newValue = '';
	
	if (value > billion) {
		newValue = value/billion;
		var i = newValue.toString().indexOf('.');
		if (i != -1) {
			string = newValue.toString().substring(0,i+range) + 'B';
		} else {
			string = newValue + 'B';
		}
	} else if (value > million) {
		newValue = value/million;
		var i = newValue.toString().indexOf('.');
		if (i != -1) {
			string = newValue.toString().substring(0,i+range) + 'M';
		} else {
			string = newValue + 'M';
		}
	} else if (value > thousand) {
		newValue = value/thousand;
		var i = newValue.toString().indexOf('.');
		if (i != -1) {
			string = newValue.toString().substring(0,i+range) + 'k';
		} else {
			string = newValue + 'k';
		}
	} else {
		string = value;
	}
	
	return string;
}