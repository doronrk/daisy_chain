var _TrueTagVendorId = '8684568';

var _TrueTagProtocol = window.location.protocol;
var _TrueTagScriptBaseUrl = 'cts.channelintelligence.com';
var s = document.createElement('script');

if(_TrueTagProtocol == 'https:'){_TrueTagScriptBaseUrl = 'cts-secure.channelintelligence.com';}
if (window['CI_OrderID']) {                
	s.src = window.location.protocol + '//' + _TrueTagScriptBaseUrl + '/' + _TrueTagVendorId + '_confirmation.js';
	document.getElementsByTagName("head")[0].appendChild(s); 
}else{
	s.src = window.location.protocol + '//' + _TrueTagScriptBaseUrl + '/' + _TrueTagVendorId + '_landing.js';
	document.getElementsByTagName("head")[0].appendChild(s);  
}
