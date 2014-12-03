_satellite.pushAsyncScript(function(event, target, $variables){
  (function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '//connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
})();

//NOTE: add to cart is in event based rules
window._fbq = window._fbq || [];
if(TagManagerData.SiteID == "Columbia_US"){
	//COL US
	if(TagManagerData.PageType == "CHKTThanks"){
		window._fbq.push(['track', '6016558031212', { 'value': TagManagerData.OrderGross, 'currency': 'USD' }]);
	} else if(TagManagerData.PageType == "AccountRegistration"){
		window._fbq.push(['track', '6016558102012', { 'value': '0.00', 'currency': 'USD' }]);
	}
} else if(TagManagerData.SiteID == "MountainHardwear_US"){
	//MHW US
	if(TagManagerData.PageType == "CHKTThanks"){
		window._fbq.push(['track', '6014000488324', {'value': TagManagerData.OrderGross,'currency':'USD'}]);
	}
}
});
