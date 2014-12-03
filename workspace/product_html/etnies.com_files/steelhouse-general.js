if (top.document.referrer != '') {
	tdr = encodeURIComponent(top.document.referrer);
}
var plh = '';
if (parent.location.href != '') {
	plh = encodeURIComponent(parent.location.href);
}
shpi = encodeURIComponent(shpi);
(function () {
 	steelhouse = {
		add: function (a, b, c, d) {
			d = d || false;
			if (a.addEventListener) {
				a.addEventListener(b, c, d)
			} else if (a.attachEvent) {
				a.attachEvent("on" + b, c)
			}
		},
		load: function () {
			var a;
			if (typeof a == 'undefined') {
				a = Math.random() * 100000000000000000
			}
			var b = document.createElement('script');
			var c = 'px.steelhousemedia.com/st?aid=' + aid + '&cb=' + a + '&shcv=' + shcv + '&shcq=' + shcq + '&shcp=' + shcp + '&shpn=' + shpn + '&shpc=' + shpc + '&shpp=' + shpp + '&shpb=' + shpb + '&shpi=' + shpi + '&shps=' + shps + '&tdr=' + tdr + '&plh=' + plh + additional;
			b.type = 'text/javascript';
			b.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + c;
			var d = document.getElementsByTagName('script');
			var e = Number(d.length) - 1;
			var f = document.getElementsByTagName('script')[e];
			f.parentNode.insertBefore(b, f)
		}
	};
	steelhouse.load();
})();
