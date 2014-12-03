function setCookie(name, value, expDays) {
    var expDate = new Date();
    expDate.setDate(expDate.getDate() + expDays);
    var cookieValue = escape(value) + ((expDays==null) ? "" : ";expires="+expDate.toUTCString());
    document.cookie = name + "=" + cookieValue;
}
function getCookie(name) {
    var i,x,y,cookies=document.cookie.split(";");
    for (i=0; i<cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf("="));
        y = cookies[i].substr(cookies[i].indexOf("=")+1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x==name) return unescape(y);
    }
    return null;
}