var EB = EB || {};
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id; js.async = true;
	js.src = "https://cdn.strcst.net/eb-host-loader/loader.min.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "ebsgc"));