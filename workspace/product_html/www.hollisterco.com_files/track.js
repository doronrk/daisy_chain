//---------------------- Variable Definitions -----------------------//
var url          = document.URL;
var query_params = [];

// extract params
var position = url.indexOf('?');

if (position != -1) {
	var query_string = url.substring(position + 1, url.length)
	var pairs        = query_string.split('&');

	for(var i = 0; i < pairs.length; i++) {
		var vals = pairs[i].split('=');
		query_params[vals[0]] = vals[1];
	}
}

var eng_id		= query_params['cvsfe'] ? query_params['cvsfe'] : '';
var product		= query_params['cvsfhu'] ? query_params['cvsfhu'] : '';
if( product == '' ) {
	product		= query_params['cvsfp'] ? query_params['cvsfp'] : '';
}
var test		= query_params['cvsftst'] ? query_params['cvsftst'] : '';
var account_id	= window.merchant_id    ? merchant_id           : query_params['cvsfa'];
var cookie_domain = document.domain;
cookie_domain = cookie_domain.substring(cookie_domain.indexOf('.') + 1);

//---------------------- Cookie Definitions -----------------------//
var Cookie = {
        getCookie : function(cookieName) {
                var dc = document.cookie;
                var prefix = escape(cookieName) + "=";
                var begin = dc.indexOf("; " + prefix);
                if (begin == -1) {
                        begin = dc.indexOf(prefix);
                        if (begin != 0) return null;
                } else {
                        begin += 2;
                }
                var end = document.cookie.indexOf(";", begin);
                if (end == -1) {
                        end = dc.length;
                }
                return unescape(dc.substring(begin + prefix.length, end));
        },

        setCookie : function(cookieName,cookieValue,nDays,path,domain) {
                var today = new Date();
                var expire = new Date();
                var string = escape(cookieName) + "=" + escape(cookieValue)
                if (nDays==null || nDays==0) {
                        // do nothing
                }else{
                        expire.setTime(today.getTime() + 3600000*24*nDays);
                        string += ";expires="+expire.toGMTString();
                }
                if (path) {
                        string += ";path="+path;
                }else{
                        string += ";path=/";
                }
                if (domain) {
					//alert('using domain: ' + domain);
					document.cookie = string + ";domain="+domain;
                }
        }
};

//---------------------- End of Cookie Definitions -----------------------//

function singlefeedTrackIt () {
	var cur_date = new Date();

	//create cookie or refresh existing cookies
	//but only if we have valid parameters: eng, account, & product
	if (account_id && eng_id && product) {
		var cookie_name = "SINGLEFEED_" + account_id;
		var session = Cookie.getCookie(cookie_name);
		if (!session) {
			session  = '' + Math.floor(cur_date.getTime() / 1000) + Math.floor(Math.random() * 100000000000001);
		}

		if (session) {
			var ndays = 730; //2yrs: 365 * 2 = 730 days
			var path = '/'; //root dir of this domain
			Cookie.setCookie(cookie_name, session, ndays, path, cookie_domain);

			//setup image request
			var img_src  = location.protocol + "//reporting.singlefeed.com/tracker/click" + session + ".rb?cvsfrn=" + Math.floor(Math.random() * 1000000000000001) + "&cvsft=product_click&cvsfa=" + account_id + "&cvsfe=" + eng_id + "&cvsfs=" + session + "&cvsfhu=" + product;
	
			// load the image
			var rep_img = new Image(1, 1);
			rep_img.src = img_src;
		}
	}
}

if (account_id) {
	singlefeedTrackIt();
}
