/*<!--*/(function() {
var qss = '&cb=' + Math.floor(Math.random() * 99999999999);
try {
    qss += '&ref=' + encodeURIComponent(document.referrer);
} catch (e) { }
try {
    qss += '&sc_r=' + encodeURIComponent(screen.width + 'x' + screen.height);
} catch (e) { }
try {
    qss += '&sc_d=' + encodeURIComponent(screen.colorDepth);
} catch (e) { }

var callDis = function(pid, domain) {
    var qr = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//' + domain + '/dis/dis.aspx';
    var p = document.createElement('iframe');
    p.width = p.height = '0';
    p.style.display = 'none';
    p.src = (qr + '?p=' + pid + qss).substring(0, 2000);

    var c = document.getElementById('criteoTagsContainer');
    if (c) {
        c.appendChild(p);
    } else {
        criteo_q.push({ event: 'appendTag', element: p });
    }
};
callDis(3639, 'dis.us.criteo.com');
})();(function() {
var callDestination = function(aurl, divName) {
    var url = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//' + aurl;

    var p = document.createElement('iframe');
    p.width = p.height = '0';
    p.style.display = 'none';

    var callback = function () {
        var d = (p.contentWindow || p.contentDocument);
        if (d.document) d = d.document;

        d.write('<img src="' + url + '">');
        d.close();

        setTimeout(function() {
            d.write('');
            d.close();
        }, 1000);
    };

    var c = document.getElementById(divName);
    if (c) {
        c.appendChild(p)
        callback();
    } else if (criteo_q) {
        criteo_q.push({ event: 'appendTag', element: p, requiresDOM: 'non-blocking' }, {func:callback, requiresDOM: 'non-blocking'});
    }
}
var cto_fw_url = 'tracker.emailretargeting.com/criteohandler?cb=eba44195f1&ctoUID=e8ac7c6b-0765-48ef-997d-630abef64506&a=3639&v=3.1.0&p0=e%3dexd%26site_type%3dd&p1=e%3dvp%26p%3d070W008667106001P&p2=e%3ddis';
callDestination(cto_fw_url, '');
})();
/*-->*/