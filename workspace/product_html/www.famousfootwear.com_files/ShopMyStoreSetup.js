
var link = $('#pickMyStoreLink');
// If we have this link we need to show it and change the text - it is hidden by default
if (link) {    
    link.css('visibility', 'visible');
    var storeCookie = getSetupCookie('StoreInfo');
    var storeCookieJSON = eval('(' + storeCookie + ')');
    var storeName = (storeCookieJSON != null && storeCookieJSON.AddrLine1 != null) ? storeCookieJSON.AddrLine1 : '';
    if (storeName != null && storeName != '') link.html('<span>My store: </span>' + storeName);
}

function getSetupCookie(key, value, options) {    
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
}
