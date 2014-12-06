/*
 * Client-side tools for parsing the querystring 
 *
 * Usage:
 * 1. Include this file (must be before the function below is used)
 * 2. To read querystring parameter 'paramX' into variable 'varX' call as:
 *		var varX = querystring("paramX");
 */

function querystring(key) 
{ 
	var value = null; 
	for (var i=0;i<querystring.keys.length;i++)  { 
		if (querystring.keys[i]==key) { 
			value = querystring.values[i]; 
			//alert( key + " = " + value );
			break; 
		} 
	} 
	return value; 
} 

querystring.keys = new Array(); 
querystring.values = new Array(); 

function querystring_Parse() { 
	var query = window.location.search.substring(1); 
	var pairs = query.split("&"); 

	for (var i=0;i<pairs.length;i++) { 
		var pos = pairs[i].indexOf('='); 
		if (pos >= 0) { 
			var argname = pairs[i].substring(0,pos); 
			var value = pairs[i].substring(pos+1); 
			querystring.keys[querystring.keys.length] = argname; 
			querystring.values[querystring.values.length] = value; 
		} 
	} 
} 
querystring_Parse(); 
