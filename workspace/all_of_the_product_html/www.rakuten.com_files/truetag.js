var _TrueTagVendorId = '350819470';
var _TrueTagProtocol = window.location.protocol;
var _TrueTagScriptBaseUrl = 'cts.channelintelligence.com';

if (_TrueTagProtocol == 'https:') 
{
	_TrueTagScriptBaseUrl = 'cts-secure.channelintelligence.com';
}

if (window['CI_OrderID']) 
{                
	document.write('<script src="' + _TrueTagProtocol + '//' + _TrueTagScriptBaseUrl + '/' + _TrueTagVendorId + '_confirmation.js " type="text/javascript"></script>');  
} 
else 
{
	document.write('<script src="' + _TrueTagProtocol + '//' + _TrueTagScriptBaseUrl + '/' + _TrueTagVendorId + '_landing.js " type="text/javascript"></script>');   
}           