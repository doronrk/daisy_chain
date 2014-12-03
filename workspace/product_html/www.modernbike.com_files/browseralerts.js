
// IE 8 Compatibility View: http://blogs.msdn.com/b/ie/archive/2009/01/09/the-internet-explorer-8-user-agent-string-updated-edition.aspx
if (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident/4.0") >= 0) {
    checkCookieAndAlert("Please do not display modernbike.com using the Compatibility View feature of Internet Explorer.\nGo to Tools > Compatibility View Settings");
}

// IE 6 or 7
if ((navigator.userAgent.indexOf("MSIE 6") >= 0 || navigator.userAgent.indexOf("MSIE 7") >= 0) && navigator.userAgent.indexOf("Trident/4.0") == 0) {
    checkCookieAndAlert("This website may not display well in your browser.\nPlease upgrade to a newer version of Internet Explorer or switch to a different browser.");
}

// Alert If No Non-expired Cookie
function checkCookieAndAlert(msg) {
    var alerted = getCookie("browseralert");
    if (alerted != "true") {
        alert(msg);
        var exmins = 5; // five minutes
        setCookie("browseralert", "true", exmins);
    }
}

// Set a Cookie
function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// Get a Cookie
function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        var offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            var end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
    }
}