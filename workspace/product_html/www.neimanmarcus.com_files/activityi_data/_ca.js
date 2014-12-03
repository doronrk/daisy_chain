(function (window) {
    var
        document = window.document,
        CA = window.CA || {};

    var
        pid = CA.pid || window._ca_id,
        params = CA.params || window._ca_params || [];

    var disableFirstPartyCookies = CA.disableFirstPartyCookies || false;

    var cookieEnabled =
        ("cookie" in document && (document.cookie.length > 0 ||
            (document.cookie = "test_cookie=testPermission").indexOf.call(document.cookie, "test_cookie=testPermission") > -1));

    var logLevel = CA.logLevel || window._ca_log_level || "OFF";
    var enableWarnLogs = logLevel == "WARN";
    var enableErrorLogs = enableWarnLogs || logLevel == "ERROR";

    function error(message, e) {
        if (enableErrorLogs) {
            if (typeof(console) != 'undefined') {
                if (typeof(console.error) == 'function') {
                    console.error("CA: " + message, e);
                } else if (typeof(console.log) == 'function') {
                    console.log("CA: Error: " + message, e);
                }
            }
        }
    }

    function warn(message) {
        if (enableWarnLogs) {
            if (typeof(console) != 'undefined' && typeof(console.log) == 'function') {
                console.log("CA: " + message);
            }
        }
    }

    function getNdlNdrObject() {
        var ndl = "", ndr = "", result = {};
        try {
            if (typeof(_ca_ndl) != 'undefined') {
                ndl = _ca_ndl;
            } else {
                ndl = encodeURIComponent(document.location.toString().substr(0, 1000));
            }
            if (typeof(_ca_ndr) != 'undefined') {
                if (_ca_ndr.indexOf("[") != 0 && _ca_ndr.indexOf("%5B") != 0) {
                    ndr = _ca_ndr;
                }
            } else {
                ndr = encodeURIComponent(document.referrer.toString().substr(0, 1000));
            }
            if (ndl == ndr) {
                ndr = '';
            }
        } catch (e) {
            error("URL set error", e);
        }
        if (ndl) result.ndl = ndl;
        if (ndr) result.ndr = ndr;
        return result;
    }

    function getNdlNdrParams() {
        var ndlNdrObject = getNdlNdrObject();
        var result = "";
        if (ndlNdrObject.ndl) result += "&ndl=" + ndlNdrObject.ndl;
        if (ndlNdrObject.ndr) result += "&ndr=" + ndlNdrObject.ndr;
        return result;
    }

    // public
    CA.createCookie = function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value.replace(/;/g, '|') + expires + "; path=/";
    };

    CA.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length).replace(/\|/g, ';');
            }
        }
        return null;
    };

    CA.eraseCookie = function (name) {
        CA.createCookie(name, "", -1);
    };

    CA.cookieEnabled = function () {
        return cookieEnabled;
    };

    CA.firstPartyCookieEnabled = function () {
        return !disableFirstPartyCookies;
    };

    CA.doTag = function () {
        try {
            if (typeof(pid) == 'undefined') {
                error("Tag installation problem: no _ca_id");
                return;
            }
            if (!cookieEnabled) {
                warn("Cookies were disabled for this browser. Skip pixel request.");
                return;
            }
            var str_params = '';
            for (var p in params) {
                if (params.hasOwnProperty(p)) str_params += '&' + p + '=' + encodeURIComponent(params[p]);
            }
            var protocol = (document.location.protocol != "https:" ? "http://" : "https://");
            var ca_url = protocol + "p.raasnet.com/partners/universal/in?" +
                "pid=" + pid +
                getNdlNdrParams() +
                "&t=s" +
                "&ts=" + new Date().getTime() +
                "&tc=" + new Date().getTimezoneOffset() +
                str_params;

            if (!disableFirstPartyCookies) {
                var uFromCookie = CA.readCookie("ca_u");
                ca_url += "&u=" + (uFromCookie != null ? uFromCookie : "-1");
            }

            var iframe = document.createElement("iframe");
            iframe.src = "javascript:false";
            (iframe.frameElement || iframe).style.cssText = "width: 0; height: 0; border: 0; display: none;";
            iframe.frameborder = 0;
            var scripts = document.getElementsByTagName('script');
            var fdoc = scripts[scripts.length - 1].parentNode.appendChild(iframe).contentWindow.document;
            fdoc.open().c = function () {
                var s = this.createElement("script");
                s.async = true;
                s.src = ca_url;
                this.getElementsByTagName("head")[0].appendChild(s);
            };
            fdoc.write("<body onload=document.c();>");
            fdoc.close();
        } catch (e) {
            error("Unexpected error", e);
        }
    };
    window.CA = CA;
})(window);

CA.doTag();

