(function($) {
    $.extend({
        corsSupport: function(){
        	if (window.XMLHttpRequest) {
        		var xhr = new XMLHttpRequest();
        		if ('withCredentials' in xhr) return true;
        	}
        	return false;
        },
        cors: function (url, type, success, parameters, fallback) {
					var cors = window.XDomainRequest ? new XDomainRequest() : new XMLHttpRequest();
					if (type == 'GET') {
						$.jsonp(url, type, success, parameters);						
					} else if ('withCredentials' in cors) {
						$.xhr(url, type, success, parameters);
					} else if (typeof(fallback) == 'function') {
						fallback();		
					}
        },
        xhr: function(url, type, success, parameters) {
        	var request = new XMLHttpRequest();
					if (type == 'GET') {
						url = url + '?' + (typeof(parameters) == 'object' ? $.param(parameters) : parameters);
						parameters = '';
					}
					if (typeof(parameters) == 'undefined') parameters = '';
					request.open(type, url, true);
					if (!/cdn\./i.test(url)) {
						request.withCredentials = true;
					}
					request.setRequestHeader("Content-type", "application/json");
					request.onreadystatechange = function () {
						if (request.readyState == 4) {
							var response = typeof(request.responseText) == 'string' ? $.parseJSON( request.responseText ) : request.repsonseText;
							success( response, request.status );
						}
					}
					if (typeof(parameters) == 'object') {
						request.send( JSON.stringify(parameters) );
					} else {
						request.send();
					}
        },
        jsonp: function(url, type, success, parameters) {
        	window.jsonTimer = setTimeout(function(){
        		success({});
        	}, 3000);
        	var _url = (typeof(parameters) == 'object' ? url + '?' + $.param(parameters) : url);
        	if (typeof(success) == 'string') {
        		$.getScript(_url + (/\?/.test(_url) ? '&' : '?') + 'callback=' + success);
        	} else {
        		/* GENERATE CALLBACK FROM API */
						var callbackName = (/\?/.test(url) ? url.substring(url.indexOf('.com') + 4, url.indexOf('?')) : url.substring( url.indexOf('.com') + 4)).split('/').join('');
        		$.ajax({
							url: _url,
							dataType: 'jsonp',
							jsonpCallback : callbackName,
							success: (function(){
								var _success = success;
								return function(){
									(function(){clearTimeout(window.jsonTimer);})();
									_success.apply(this,arguments);
								};
							})()
						});
        	}
        },
        load_script: function(src, func, test) {
						if (typeof(test) !== 'undefined') {
							this.test_load_script(src, func, test);
						} else {
							if (typeof(window.initialize) !== 'function') { window.initialize = function(){}; }
							var head = document.getElementsByTagName('head')[0];
						  var script = document.createElement('script');
						  script.type = 'text/javascript';
						  if (typeof(func) == 'function') {
						  	script.onreadystatechange = function() {
							    if (this.readyState == 'complete') {
							      func();
							    }
							  };
							  script.onload = func;
						  }
						  script.src = src;
						  head.appendChild(script);
						}
        },
        test_load_script:function(src, func, test) {
					if (test && typeof(func) == 'function') {
						func();
					} else {
						$.load_script(src, func);
					}
				},
				mustache: function(tmpl, data, selector,bind) {
					var m = function(tmpl,data,selector) {
						if (typeof(data) == 'string') data = JSON.parse(data);
						if (typeof(selector) == 'string') {
							var markup = Mustache.render(tmpl,data);
							if (typeof(bind) == 'function') {
								markup = bind(markup);
							}
							$(selector).html( markup );
						} else {
							console.log( Mustache.render(tmpl,data) );
						}
					};
					$.load_script('/Content/desktop/assets/js/vendor/mustache.js', function(){ m(tmpl,data,selector); }, typeof(Mustache) !== 'undefined');
				}
    });
})(jQuery);