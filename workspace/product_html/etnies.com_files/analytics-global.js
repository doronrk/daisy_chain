var _gaq = _gaq || [];

// send the global analytics first
_gaq.push(['_setAccount', analyticsAccount], ['_trackPageview']);

// Create global tracker instance and send the regional analytics
_gaq.push(function() {
	var regionalTracker = _gat._createTracker(analyticsRegional[region], 'regional');
});
_gaq.push(['regional._setSiteSpeedSampleRate', 5]);
_gaq.push(['regional._trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

