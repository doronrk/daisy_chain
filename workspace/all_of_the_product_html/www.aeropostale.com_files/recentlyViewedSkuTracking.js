//Execute at loading of document

Event.observe(window, 'load', function(e){
	var COOKIE_NAME = 'RV_TRACK_COLOR_COOKIE'
	var colorCookie = new Df.Cookie({name:COOKIE_NAME, path: '/', expires: 10000})

	$$('.swatches a').each(function(v){
		v.observe('click', function(e){
			var pidAndColor = this.name
			colorCookie.setData(pidAndColor)
		})
	})

	if($$('.swatches .active a').length > 0){
		colorCookie.setData($$('.swatches .active a')[0].name)
	}else{
		var productId = getQuerystring('productId', '');
		colorCookie.setData(productId + '|')
	}
});


function getQuerystring(key, default_) {
	  if (default_==null) default_="";
	  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	  var qs = regex.exec(window.location.href);
	  if(qs == null)
	    return default_;
	  else
	    return qs[1];
}