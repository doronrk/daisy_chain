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
callDis(10392, 'dis.us.criteo.com');
})();/*-->*/