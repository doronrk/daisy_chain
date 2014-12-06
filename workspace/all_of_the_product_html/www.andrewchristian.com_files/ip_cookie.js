/*
 * Sets a cookie with the users IP address. This is used for IP based fraud
 * prevention for the payment process
 */
jQuery(function($) {
    var cookies, regExp, cookieName = 'REMOTE_ADDR';

    // Only request from HTTP, HTTPS based IP detection wont work because the
    // load balancer doesn't terminate SSL
    if (window.location.protocol != 'http:') return;

    // Check if the IP cookie is already set
    cookies = document.cookie.split(';');
    regExp = new RegExp('^' + cookieName + '=');
    for (var i = 0; i < cookies.length; i++) {
        if (regExp.match(cookies[i])) return;
    }

    // Do an AJAX call to ip.php to get the IP address
    $.get('http://' + window.location.host + '/ip.php', function(data) {
        var d = new Date();

        data = JSON.parse(data);

        if (!data.status) { return; }

        d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        document.cookie = cookieName + '=' + data.ip + '; expires=' + d.toGMTString() + '; path=/';
    });
}(jQuery));
