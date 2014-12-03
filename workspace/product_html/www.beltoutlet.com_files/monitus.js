//--Monitus Tools code
//-- Copyright 2006-2012 Monitus LLC, All Rights Reserved.
//-------   PATENT PENDING   -------
var monitus_file_version = '3.1.21';
function monitus_error_trap(p_monitus_id, p_error_type, p_message) {
if((typeof(window.monitus_test_zone) != "undefined") && window.monitus_test_zone) {
alert(p_message);
if(typeof(console) != "undefined") console.log("MONITUS " + p_error_type + ": " + p_message);
} else {
var i = new Image(1,1);
if(document.location.protocol.match(/https/i)) i.src = "https://p.secure.hostingprod.com/@rtml-training.com/ssl/mt.php?a=" + p_error_type + "&b=&s=" + p_monitus_id + "&u=" + encodeURIComponent("v" + monitus_file_version + "[" + document.URL + "][" + p_message + "]");
else i.src = "http://site.rtml-training.com/mt.php?a=" + p_error_type + "&b=&s=" + p_monitus_id + "&u=" + encodeURIComponent("v" + monitus_file_version + "[" + document.URL + "][" + p_message + "]");
}
}
var monitus_inited = false;
function monitus_init(p_monitus_id, p_ga_mode, p_allow_frames) {
if(monitus_inited || (!p_allow_frames && (window!=top) && !document.location.hash.match(/utmxpreview/i))) return;
var v_mode = p_ga_mode;
if(typeof(v_mode) == "string") v_mode = '"' + v_mode + '"';
if(typeof(p_allow_frames) == "undefined") p_allow_frames = false;
if(typeof(monitus_boot) == "undefined") setTimeout('monitus_init(' + p_monitus_id + ', ' + v_mode + ', ' + (p_allow_frames ? 'true' : 'false') + ');', 10);
else {
monitus_boot(p_monitus_id, p_ga_mode);
monitus_inited = true;
}
}
var monitus_resources = new Array();
function monitus_add_head_tag(p_url, p_tag, p_callback) {
var ie = window.navigator.userAgent.match(/MSIE\s(\d)\.\d/);
if(ie) ie = (ie && (ie[1] == "6"));
var header = document.getElementsByTagName((ie ? "body" : "head"));
if(!header || (header.length == 0)) setTimeout(function() { monitus_add_head_tag(p_url, p_tag, p_callback); }, 10);
else {
header = header[0];
var object = document.createElement(p_tag);
object.type = "text/javascript";
if(p_tag.match(/link/i)) {
object.rel = "stylesheet";
object.href = p_url;
} else {
object.src = p_url;
object.async = true;
var loaded = false;
object.onload = object.onreadystatechange = function() {
if(!loaded && (!this.readyState || (this.readyState == 'loaded') || (this.readyState == 'complete'))) {
loaded = true;
object.onload = object.onreadystatechange = null;
if(p_callback) p_callback();
};
};
}
header.appendChild(object);
}
}
function monitus_add_script_tag(p_url, p_callback) {
if(p_url.indexOf("?") >= 0) p_url += "&";
else p_url += "?";
p_url += "fv="+ monitus_file_version;
monitus_add_head_tag(p_url, "script", p_callback);
}
function monitus_add_css_tag(p_url) {
monitus_add_head_tag(p_url, "link");
}
var monitus_script_domain = 'http://ldn.monitus.net';
if(document.location.protocol.match(/https/i)) monitus_script_domain = 'https://c3319586.ssl.cf0.rackcdn.com';
if(document.domain.match(/edit\.store\.yahoo\.(com|net)/) && !document.location.pathname.match(/\/COMGR\//)) monitus_add_script_tag(monitus_script_domain + "/mset.js");
else if(document.domain.match(/order\.store\.yahoo\.net$/i)) monitus_add_script_tag(monitus_script_domain + "/mcheckout_boot_1363257585.js?v=3.1.21");
else monitus_add_script_tag(monitus_script_domain + "/mstore_boot_1363257585.js?v=3.1.21");
