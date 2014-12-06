
var monetateT = new Date().getTime();
(function() {
    var p = document.location.protocol;
    if (p == "http:" || p == "https:") {
        var m = document.createElement('script'); m.type = 'text/javascript'; m.async = true; m.src = (p == "https:" ? "https://s" : "http://") + "b.monetate.net/js/1/a-1a62e663/p/boscovs.com/" + Math.floor((monetateT + 3489123) / 3600000) + "/g";
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
    }
})();

