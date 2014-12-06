var _tfw = _tfw || {};
_tfw.trackGoal = _tfw.trackPageview = _tfw.trackPopup = function(){};
_tfw.match = function(args) {_tfw.setMatchArgs(args)};
_tfw.setMatchArgs = function(args) {
  if (_tfw.matchArgs = args) {_tfw.key = _tfw.key || args.key; _tfw.name = _tfw.name || args.name}
};
_tfw.load = function(src, onload) {
  var as = document.createElement('script'); as.type = 'text/javascript'; as.async = true; as.src = src; as.charset = "utf-8";
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(as, s);
  if (onload) {
    as.onload = as.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        var done = true; onload(as);
      }
    }
  }
};
_tfw.onload = function() {
  if (_tfw.matchArgs) {_tfw.match(_tfw.matchArgs)}
};
_tfw.append = function(href, obj) {
  if (!href) {return}
  var ps = [];
  for (var p in obj) {
    if (obj.propertyIsEnumerable(p) && obj[p]) {ps.push(p + "=" + encodeURIComponent(obj[p]))}
  }
  if (ps.length == 0) {return href}
  return href + (href.indexOf("?") > 0 ? "&" : "?") + ps.join("&");
};
_tfw.init = function(opts) {
  _tfw.url = _tfw.url_key = undefined;
  if (opts.url_re) {
    try {
      var m = new RegExp(opts.url_re).exec(opts.url);
      if (m) {_tfw.url_key = m[1] || m[0]}
    } catch(err) {}
  }
  if (!_tfw.url_key) {_tfw.url = opts.url}
};
_tfw.matchUrl = function(base) {return _tfw.append(base, {key: _tfw.key, url_key: _tfw.url_key, ref: _tfw.url})};
_tfw.popupUrl = function(base) {return _tfw.append(_tfw.matchUrl(base), {name: _tfw.name})};
_tfw.writeReview = function(){};
_tfw.init({url:document.location.href,url_re:".*/(.*).html"});
(function(c){var s = document.createElement("style"); s.type = "text/css";
if (s.styleSheet) {s.styleSheet.cssText = c} else {s.appendChild(document.createTextNode(c))}
document.getElementsByTagName("head")[0].appendChild(s);
})('a#tfw-badge{display:none !important}div.ui-widget-overlay{background:#000;opacity:0.5;filter:alpha(opacity=50);position:absolute;left:0;top:0;cursor:pointer}' +
'div#tfw-base div{display:block !important}div#tfw-base,.tfw-base,div#tfw-base .tfw-base,div#tfw-tooltip,div#tfw-tooltip .tfw-base{margin:0;padding:0;border:0;position:relative;font:normal 12px arial,sans-serif;line-height:120%;vertical-align:baseline;text-align:left;color:black}'
);
_tfw.load('http://js.testfreaks.com/badge/eglobalcentral.com/async.js');
_tfw.load(_tfw.matchUrl('http://js.testfreaks.com/badge/eglobalcentral.com/match.js'));
