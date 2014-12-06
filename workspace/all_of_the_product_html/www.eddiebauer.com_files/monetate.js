//-----------------------------------------------------------
//JavaScript to Add to the External Include tag : Monetate
//-----------------------------------------------------------

var monetateT = new Date().getTime();
(function() {
	var p = document.location.protocol;
	if (p == "http:" || p == "https:") {
		var m = document.createElement('script'); m.type = 'text/javascript'; m.async = true; m.src = (p == "https:" ? "https://s" : "http://") + "b.monetate.net/js/1/a-0ade99f8/p/eddiebauer.com/" + Math.floor((monetateT + 2360568) / 3600000) + "/g";
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
	}
})();