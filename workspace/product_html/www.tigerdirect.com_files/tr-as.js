var _a1as_f = new Object();

_a1as_f.a1asstate = 0;
_a1as_f.a1ascustomerid = 0;
_a1as_f.a1asvars = new Array();

_a1as_f.trimLeft = function(str) {
	return str.replace(/^\s+/, "");
};

_a1as_f.trimRight = function(str) {
	return str.replace(/\s+$/, "");
};

if (typeof Array.prototype.map !== "function") {
    Array.prototype.map = function(callback, thisArg) {
        for (var i=0, n=this.length, a=[]; i<n; i++) {
            if (i in this) a[i] = callback.call(thisArg, this[i]);
        }
        return a;
    };
}

_a1as_f.r4 = function() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};
_a1as_f.a1asgetCookies = function() {
    var c = document.cookie, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
        c = RegExp.$1;
        v = 1;
    }
    if (v === 0) {
        c.split(/[,;]/).map(function(cookie) {
			try {
            var parts = cookie.split(/=/, 2),
                name = decodeURIComponent(_a1as_f.trimLeft(parts[0])),
                value = parts.length > 1 ? decodeURIComponent(_a1as_f.trimRight(parts[1])) : null;
            cookies[name] = value;
			} catch(er) {}
        });
    } else {
        c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
            var name = $0,
                value = $1.charAt(0) === '"'
                          ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                          : $1;
            cookies[name] = value;
        });
    }
    return cookies;
}

_a1as_f.a1asgetCookie = function(name) {
    return _a1as_f.a1asgetCookies()[name];
}

var _a1asold = new Array();
if( typeof _a1as !== 'object' || _a1as === null ) {
	
} else {
	_a1asold = _a1as;
}
var _a1asn =  new Object();
_a1asn.push = function(op) {
	if(_a1as_f.a1asstate == 0) {
		if(op[0].indexOf('init') == 0) {
			if(typeof _a1as_f.a1asgetCookie('a1ashgd') === "undefined") {
				var domainInfo = '';
				if(op.length == 3) {
					domainInfo = '; domain='+op[2];
				}
				var expireDate = new Date();
				expireDate.setTime( expireDate.getTime() + ( 5 * 365 * 24 * 60 * 60 * 1000 ) );
				document.cookie = 'a1ashgd=' + _a1as_f.r4()+_a1as_f.r4()+_a1as_f.r4()+_a1as_f.r4()+_a1as_f.r4()+_a1as_f.r4()+_a1as_f.r4()+_a1as_f.r4() + '; expires=' + expireDate.toGMTString()+'; path=/'+domainInfo;
			}
			_a1as_f.a1ascustomerid = parseInt(""+op[1]);
			if(_a1as_f.a1ascustomerid > 72490) {
				_a1as_f.a1ascustomerid -= 72490;
			}
			_a1as_f.a1asstate = 1;
		}
	} else {
		if(op[0].indexOf('setvar') == 0) {
			_a1as_f.a1asvars.push(new Array(op[1],op[2]));
		} else if(op[0].indexOf('track') == 0) {
			if(op.length == 2) {
				_a1as_f.a1astrack(op[1]);
			} else {
				_a1as_f.a1astrack(window.location);
			}
		} else if(op[0].indexOf('clear') == 0) {
			_a1as_f.a1asvars = new Array();
		}
	}
}
_a1as = _a1asn;
_a1as_f.a1astrack = function(a1loc) {
	var m3_u = (location.protocol=='https:'?'https://ca-as-1.agilone.com/im.gif':'http://ca-as-1.agilone.com/im.gif');
	var m3_r = Math.floor(Math.random()*99999999999);
	
	m3_u += "?bid=3&zoneid="+_a1as_f.a1ascustomerid;
	m3_u += '&cb=' + m3_r;
	m3_u += '&asid=' + _a1as_f.a1asgetCookie('a1ashgd');
	m3_u += document.charset ? '&charset='+document.charset : (document.characterSet ? '&charset='+document.characterSet : '');
	m3_u += "&loca=" + escape(a1loc);
	if (document.referrer)  {
		m3_u += "&referer=" + escape(document.referrer);
	}
	// source
	var _a1t_source = "";
	for(var a1ti=0;a1ti<_a1as_f.a1asvars.length;a1ti++) {
		if(a1ti != 0) {
			_a1t_source += "&";
		}
		_a1t_source += escape(_a1as_f.a1asvars[a1ti][0]) +"="+ escape(_a1as_f.a1asvars[a1ti][1]);
		
	}
	m3_u += "&source=" + escape(_a1t_source);
	
	if (document.context) {
		m3_u += "&context=" + escape(document.context);
	}
	if (document.mmm_fo) {
		m3_u += "&mmm_fo=1";
	}
	m3_u += "&a1action=ajax";
	
	var container = document.createElement('img');
	container.src = m3_u;
	document.body.appendChild(container);
}

for(var i=0;i<_a1asold.length;i++) {
	_a1as.push(_a1asold[i]);
}
