var pulse = {};
pulse.values = {};
pulse.site = {}
pulse.baseParams = "";
pulse.baseParams0 = "";
pulse.imgs=new Array();

pulse.gup = function(url, param) {
  if (url.indexOf("?")<0) url = "?"+url;
  if (url.indexOf("#")<0) url = url+"#";
  var regex = new RegExp("[\\?&]"+param+"(=(.*?))?[&#]");
  var results = regex.exec(url);
  if (results == null)
    return null;
  else if (typeof results[2] == "undefined" || results[2] == null)
    return "";
  else
    return results[2];
}

/* bc */
function gup(url, param) {
    return pulse.gup(url, param);
}

pulse.setCookie = function(key, val, days) {
  var str = key + "=" + val + "; domain=.pulsemgr.com; path=/";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*86400*1000));
    str = str + "; expires=" + date.toGMTString();
  }
  document.cookie = str;
}

pulse.getCookie = function(key) {
  var match = key + "=";
  var cookies = document.cookie.split(';');
  for (var i=0; i<cookies.length; i++) {
    var c = cookies[i];
    while (c.charAt(0)==' ') { c = c.substring(1,c.length); }
    if (c.indexOf(match) == 0) {
      return c.substring(match.length, c.length);
    }
  }
  return null;
}

pulse.deleteCookie = function(key) {
  if (pulse.setCookie) pulse.setCookie(key, "", -1);
}

pulse.rnd = function() { return Math.round(Math.random()*10000000000000000); }
pulse.enc = function(s) { return encodeURIComponent(s); }

pulse.set = function(key,value,suppress_encode,save) {
  if (typeof key == "undefined" || key == null) {
    // invalid key
    return;
  }
  // trim key
  key = key.replace(/^ */,"").replace(/ *\$/,"");
  if (key == "" || key == "p1") {
    // invalid key too, 'p1' is used for pageViewId
    return;
  }
  if (typeof value == "undefined" || value == null) {
    value="";
  }

  if (!suppress_encode) {
    value = pulse.enc(value);
  }
  pulse.values[key] = value;

  var regexp = new RegExp("(^|&)"+key+"(=.*?)?(?=&|#|\$)","ig");
  pulse.baseParams = pulse.baseParams.replace(regexp, "");

  if (save) {
    pulse.baseParams0 = pulse.baseParams0.replace(regexp, "");
    pulse.baseParams0 = pulse.enc(key) + "=" + value + "&" + pulse.baseParams0;
  }
}

pulse.add = function(key,value) {
  if (typeof(pulse.values[key]) != 'undefined' && pulse.values[key] != null) {
    pulse.set(key, pulse.values[key]+'&'+pulse.enc(key)+'='+pulse.enc(value), true);
    return;
  }
  pulse.set(key, value);
}

pulse.setPartnerId = function ( partnerId ) { pulse.set('ptnr', partnerId); }
pulse.setSite = function( siteName ) { pulse.set('sit', siteName); }
pulse.setSection = function ( sectionName ) { pulse.set('sec', sectionName); }
pulse.setCategory = function ( categoryName ) { pulse.set('cat', categoryName); }

pulse.save = function(key,value) {
  pulse.set(key, value, 0, 1);
}

pulse.prep = function() {
  for (var key in pulse.values) {
    delete pulse.values[key];
  }
  pulse.baseParams = pulse.baseParams0;
  pulse.set("y29", "l27");
  /*pulse.set("url", pulse.pageUrl);*/
  pulse.set("y27", pulse.getFormatedDateTime());
}

pulse.pulse = function(urlTail) {
  var url = pulse.pulseData(urlTail);
  var scrElem = document.createElement("script");
  scrElem.setAttribute("type","text/javascript");
  scrElem.setAttribute("src",url);
  document.body.insertBefore(scrElem, document.body.firstChild);
  pulse.prep();
}

pulse.pulseData = function(urlTail) {
	var base="http://img.pulsemgr.com";
	var data = base+"/pm/?srd&p1="+pulse.enc(pulse.pageViewId);
	if (document.referrer)
		pulse.set("prf",document.referrer) ;
	for (var key in pulse.values) {
		data=data+"&"+pulse.enc(key)+"="+pulse.values[key];
	}
	if (pulse.baseParams) { data=data+"&"+pulse.baseParams; }
	if (urlTail) { data=data+"&"+urlTail; }
	data = data.replace(/^http:/, pulse.isHttps?"https:":"http:");
	return data;
}

pulse.pulse2 = function(urlTail) {
	var url = pulse.pulseData(urlTail);
	var h = document.getElementsByTagName('head').item(0);
	var js = document.createElement('script');
	js.setAttribute('language', 'javascript');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', url);
	h.appendChild(js);
	pulse.prep();
}

pulse.forward = function(encodedUrls) {
	// For each URLs, ping it, and record the ids in data
	for (var i=0; i<encodedUrls.length; i++) {
		if (encodedUrls[i].length>0) {
			var t = pulse.imgs.length;
			pulse.imgs[t] = new Image(1,1);
			pulse.imgs[t].alt = "";
			pulse.imgs[t].src = decodeURIComponent(encodedUrls[i]);
		}
	}
	if (pulse.values['ptnr'] ==  '30037' || pulse.values['ptnr'] ==  '30038') {
		setTimeout('pulse.checkimages()', 1000);
	
	}
}

pulse.checkimages = function() {
	for (var i=0; i<pulse.imgs.length; i++) {
		if (!pulse.imgs[i].complete) {
			pulse.imgs[i].src = "";
		}
	}
}

// Pad a number to two digits with leading zero, used by date/time formatting
pulse.pad = function(int) {
    if (int<10) { return "0"+int+""; }
    return ""+int;
}

// convert a Date object into human readable string yyyy/MM/dd hh:mm:ss+/-zzzz
pulse.getFormatedDateTime = function(d) {
    if (!d) { d = new Date(); }

	var year = d.getFullYear();
	var month = pulse.pad(d.getMonth() + 1);
	var day = pulse.pad(d.getDate());
	var hour = pulse.pad(d.getHours());
	var minute = pulse.pad(d.getMinutes());
	var second = pulse.pad(d.getSeconds());

    var offsetMin = d.getTimezoneOffset();
    var offset = "-";
    if (offsetMin < 0) {
        offsetMin = 0-offsetMin;
        offset = "+";
    }
    offset = offset + pulse.pad(Math.floor(offsetMin/60));
    offset = offset + pulse.pad(Math.floor(offsetMin%60));

    return (year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second+' '+offset);
}

pulse.pageViewId = pulse.rnd();
pulse.pageUrl=""+window.location;
if (pulse.pageUrl.replace(/^https:/i, "https:").indexOf("https:") == 0) {
  pulse.isHttps = true;
} else {
  pulse.isHttps = false;
}

pulse.prep();

