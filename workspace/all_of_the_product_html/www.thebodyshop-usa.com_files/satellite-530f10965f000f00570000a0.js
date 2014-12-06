_satellite.pushAsyncScript(function(event, target, $variables){
  		var ga_enabled = (typeof window._gaq !== 'undefined');
    var _gaq;
    var x;
    if (ga_enabled) {
        _gaq = window._gaq; 
     } else {
        _gaq = [];
        window._gaq = _gaq;
    }
    if (window.adb_device_type == "mobile") {
        var custom_google_id = window.adb_google_analytics_custom_id_mobile;
    } else {
        var custom_google_id = window.adb_google_analytics_custom_id_desktop;
    }
    var custom_google_domain = location.hostname;
    var custom_google_hash = '';
    var custom_google_ignore = '';
    var custom_google_local = '';
    var optional_param = {
        _setDomainName: custom_google_domain,
        _addIgnoredRef: custom_google_ignore,
        _setAllowHash: custom_google_hash,
        _setLocalGifPath: custom_google_local
    }
    var optional_param_convert = {
        _setAllowHash: function (val) {
            return (val === 'true' ? true : false);
        }
    };
    function getOptValue(opt, value) {
        if (opt in optional_param_convert) {
            value = optional_param_convert[opt](value);
        }
        return value;
    }
    _gaq.push(['_setAccount', custom_google_id]);
    for (x in optional_param) {
        if (optional_param[x]) {
            _gaq.push([x, getOptValue(x, optional_param[x])]);
        }
    }
    _gaq.push(['_trackPageview']);
   
    function addScript(sScriptSrc) {
     var oHead = document.getElementsByTagName('head')[0];
     var oScript = document.createElement('script');
     oScript.type = 'text/javascript';
	 	 oScript.async = true;
     oScript.src = sScriptSrc;
     oHead.appendChild(oScript);
    }


    var ga_src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		addScript(ga_src);
});
