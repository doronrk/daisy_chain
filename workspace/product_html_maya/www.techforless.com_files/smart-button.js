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
wcsbLoadImage('https://www.dsply.com/index.php?pid=rv4a0pklnx&e=product-detail-page-view&site=techforless&cpi='+escCpi+'&localtimestamp='+timestamp+'');
}
}
function wcsbGetCpiFromJsParameter()
{
if ((typeof(wcCpi) != typeof(undefined)) && (wcCpi != null))
return wcCpi;
return "";
}
function wcsbGetCpi ()
{
cpi = wcsbGetCpiFromJsParameter();
return cpi;
}
function wcsbCallProductButton()
{
setTimeout(wcsbSa, 1);
wcsbLoadScript('http://content.webcollage.net/techforless/smart-button?ird=true&channel-product-id=' + encodeURIComponent(wcsbGetCpi()), 'wcsb-auto');
}
if (typeof(wcsbAvoidDoubleResponse)=='undefined')
{
wcsbAvoidDoubleResponse = true;
setTimeout(wcsbCallProductButton, 1);
}
}catch (e){}