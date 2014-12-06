/*** Copyright (c) 2000-2013 by WebCollage Inc. All rights reserved.  ***/
/*** Protected by US Patent 6,865,593 and pending patent applications ***/
try {
function wcsbLoadScript (url, id)
{
var s = document.createElement("script");
s.id = id; s.src = url; s.async = true;
document.getElementsByTagName("head").item(0).appendChild(s);
}
function wcsbLoadImage (url)
{
if (typeof(document.wcSaImgs) == 'undefined') document.wcSaImgs = [];
var i = new Image(); i.src = url;
document.wcSaImgs.push(i);
}
function wcsbSa ()
{
var escCpi = encodeURIComponent(wcsbGetCpi());
if (escCpi != '') {
var timestamp = (new Date().valueOf()) + '';
wcsbLoadImage('https://www.dsply.com/index.php?pid=rv4a0pklnx&e=product-detail-page-view&site=frys&cpi='+escCpi+'&localtimestamp='+timestamp+'');
}
}
function wcsbGetParameter(query, paramName)
{
var lc = paramName.toLowerCase();
var params = query.split("&");
for (var i=0; i < params.length; ++i)
{
var pair = params[i].split("=");
if (typeof(pair[0]) != typeof(undefined) &&
(unescape(pair[0])).toLowerCase() == lc &&
typeof(pair[1]) != typeof(undefined))
return unescape(pair[1]);
}
return "";
}
function wcsbGetUrlParts(url)
{
var p = {scheme: "", authority: "", path: "", query: "", fragment: ""};
var se = url.indexOf("://", 0);
p.scheme = url.substring(0, se);
var ai = se + 3;
var pi = url.indexOf("/", ai) + 1;
var qi = url.indexOf("?", ai) + 1;
var fi = url.indexOf("#", ai) + 1;
if ((qi > 0 && pi > qi)||(fi > 0 && pi > fi))
pi = 0;
if (fi > 0 && qi > fi)
qi = 0;
if (pi > 0)
p.authority = url.substring(ai, pi - 1);
else if (qi > 0)
p.authority = url.substring(ai, qi - 1);
else if (fi > 0)
p.authority = url.substring(ai, fi - 1);
else
p.authority = url.substring(ai);
if (pi > 0)
{
if (qi > 0)
p.path = url.substring(pi, qi - 1);
else if (fi > 0)
p.path = url.substring(pi, fi - 1);
else
p.path = url.substring(pi);
}
if (qi > 0)
{
if (fi > 0)
p.query = url.substring(qi, fi - 1);
else
p.query = url.substring(qi);
}
if (fi > 0 && fi < url.length)
p.fragment = url.substring(fi);
return p;
}
function wcsbGetScriptSrc()
{
var s = document.getElementsByTagName('script');
for (var i = 0; i < s.length; ++i)
{
var src = s[i].getAttribute('src');
if (src != null && typeof(src)=='string' && src.indexOf('http://content.webcollage.net/frys/smart-button') == 0)
{
if (typeof(s[i].id) == 'undefined' || s[i].id != 'wcsb-auto')
return src
}
}
return null;
}
function wcsbGetCpiFromScriptSrc(paramName)
{
var src = wcsbGetScriptSrc();
var srcParts = wcsbGetUrlParts(src);
return wcsbGetParameter(srcParts.query, paramName);
}
function wcsbGetCpi ()
{
cpi = wcsbGetCpiFromScriptSrc('sku');
return cpi;
}
function wcsbCallProductButton()
{
setTimeout(wcsbSa, 1);
wcsbLoadScript('http://content.webcollage.net/frys/smart-button?ird=true&channel-product-id=' + encodeURIComponent(wcsbGetCpi()), 'wcsb-auto');
}
if (typeof(wcsbAvoidDoubleResponse)=='undefined')
{
wcsbAvoidDoubleResponse = true;
setTimeout(wcsbCallProductButton, 1);
}
}catch (e){}