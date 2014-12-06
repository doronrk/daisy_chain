
var yawa_cmds = yawa_cmds || [];
var yawa_customer_setup = function () {
yawa_cmds.unshift(['YAWATracker.setSiteId', '40438520']);    if (window['ya_hag'] && window['ya_svc']) { yawa_cmds.push(['YAWATracker.setCustomVar', 1, 'sid-hag', ya_svc + '-' + ya_hag, 'page']); }
    yawa_cmds.push(['YAWATracker.trackPageView']);
    window.yawa_multitouch = true;};
(function(_1){
if(!this.JSON){
this.JSON={};
}
(function(){
"use strict";
function f(n){
return n<10?"0"+n:n;
};
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(_2){
return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null;
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(_3){
return this.valueOf();
};
}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_4=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_5,_6,_7={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},_8;
function _9(_a){
_4.lastIndex=0;
return _4.test(_a)?"\""+_a.replace(_4,function(a){
var c=_7[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_a+"\"";
};
function _b(_c,_d){
var i,k,v,_e,_f=_5,_10,_11=_d[_c];
if(_11&&typeof _11==="object"&&typeof _11.toJSON==="function"){
_11=_11.toJSON(_c);
}
if(typeof _8==="function"){
_11=_8.call(_d,_c,_11);
}
switch(typeof _11){
case "string":
return _9(_11);
case "number":
return isFinite(_11)?String(_11):"null";
case "boolean":
case "null":
return String(_11);
case "object":
if(!_11){
return "null";
}
_5+=_6;
_10=[];
if(Object.prototype.toString.apply(_11)==="[object Array]"){
_e=_11.length;
for(i=0;i<_e;i+=1){
_10[i]=_b(i,_11)||"null";
}
v=_10.length===0?"[]":_5?"[\n"+_5+_10.join(",\n"+_5)+"\n"+_f+"]":"["+_10.join(",")+"]";
_5=_f;
return v;
}
if(_8&&typeof _8==="object"){
_e=_8.length;
for(i=0;i<_e;i+=1){
k=_8[i];
if(typeof k==="string"){
v=_b(k,_11);
if(v){
_10.push(_9(k)+(_5?": ":":")+v);
}
}
}
}else{
for(k in _11){
if(Object.hasOwnProperty.call(_11,k)){
v=_b(k,_11);
if(v){
_10.push(_9(k)+(_5?": ":":")+v);
}
}
}
}
v=_10.length===0?"{}":_5?"{\n"+_5+_10.join(",\n"+_5)+"\n"+_f+"}":"{"+_10.join(",")+"}";
_5=_f;
return v;
}
};
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_12,_13,_14){
var i;
_5="";
_6="";
if(typeof _14==="number"){
for(i=0;i<_14;i+=1){
_6+=" ";
}
}else{
if(typeof _14==="string"){
_6=_14;
}
}
_8=_13;
if(_13&&typeof _13!=="function"&&(typeof _13!=="object"||typeof _13.length!=="number")){
throw new Error("JSON.stringify");
}
return _b("",{"":_12});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(_15,_16){
var j;
function _17(_18,key){
var k,v,_19=_18[key];
if(_19&&typeof _19==="object"){
for(k in _19){
if(Object.hasOwnProperty.call(_19,k)){
v=_17(_19,k);
if(v!==undefined){
_19[k]=v;
}else{
delete _19[k];
}
}
}
}
return _16.call(_18,key,_19);
};
_15=String(_15);
cx.lastIndex=0;
if(cx.test(_15)){
_15=_15.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(_15.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+_15+")");
return typeof _16==="function"?_17({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
}());
var OWA={items:{},loadedJsLibs:{},overlay:"",config:{ns:"owa_",baseUrl:"",hashCookiesToDomain:true},state:{},overlayActive:false,setSetting:function(_1a,_1b){
return this.setOption(_1a,_1b);
},getSetting:function(_1c){
return this.getOption(_1c);
},setOption:function(_1d,_1e){
this.config[_1d]=_1e;
},getOption:function(_1f){
return this.config[_1f];
},l:function(_20){
return _20;
},requireJs:function(_21,url,_22){
if(!this.isJsLoaded(_21)){
OWA.util.loadScript(url,_22);
}
this.loadedJsLibs[_21]=url;
},isJsLoaded:function(_23){
if(this.loadedJsLibs.hasOwnProperty(_23)){
return true;
}
},initializeStateManager:function(){
if(!this.state.hasOwnProperty("init")){
OWA.debug("initializing state manager...");
this.state=new OWA.stateManager();
}
},registerStateStore:function(_24,_25,_26,_27){
this.initializeStateManager();
return this.state.registerStore(_24,_25,_26,_27);
},checkForState:function(_28){
this.initializeStateManager();
return this.state.isPresent(_28);
},setState:function(_29,key,_2a,_2b,_2c,_2d){
this.initializeStateManager();
return this.state.set(_29,key,_2a,_2b,_2c,_2d);
},replaceState:function(_2e,_2f,_30,_31,_32){
this.initializeStateManager();
return this.state.replaceStore(_2e,_2f,_30,_31,_32);
},getStateFromCookie:function(_33){
this.initializeStateManager();
return this.state.getStateFromCookie(_33);
},getState:function(_34,key){
this.initializeStateManager();
return this.state.get(_34,key);
},clearState:function(_35,key){
this.initializeStateManager();
return this.state.clear(_35,key);
},getStateStoreFormat:function(_36){
this.initializeStateManager();
return this.state.getStoreFormat(_36);
},setStateStoreFormat:function(_37,_38){
this.initializeStateManager();
return this.state.setStoreFormat(_37,_38);
},debug:function(){
var _39=OWA.getSetting("debug")||false;
if(_39){
if(window.console){
if(console.log.apply){
if(window.console.firebug){
console.log.apply(this,arguments);
}else{
console.log.apply(console,arguments);
}
}
}
}
},setApiEndpoint:function(_3a){
this.config["api_endpoint"]=_3a;
},getApiEndpoint:function(){
return this.config["api_endpoint"]||this.getSetting("baseUrl")+"api.php";
},loadHeatmap:function(p){
var _3b=this;
OWA.util.loadScript(OWA.getSetting("baseUrl")+"/modules/base/js/includes/jquery/jquery-1.6.4.min.js",function(){
});
OWA.util.loadCss(OWA.getSetting("baseUrl")+"/modules/base/css/owa.overlay.css",function(){
});
OWA.util.loadScript(OWA.getSetting("baseUrl")+"/modules/base/js/owa.heatmap.js",function(){
_3b.overlay=new OWA.heatmap();
_3b.overlay.options.liveMode=true;
_3b.overlay.generate();
});
},loadPlayer:function(){
var _3c=this;
OWA.debug("Loading Domstream Player");
OWA.util.loadScript(OWA.getSetting("baseUrl")+"/modules/base/js/includes/jquery/jquery-1.6.4.min.js",function(){
});
OWA.util.loadCss(OWA.getSetting("baseUrl")+"/modules/base/css/owa.overlay.css",function(){
});
OWA.util.loadScript(OWA.getSetting("baseUrl")+"/modules/base/js/owa.player.js",function(){
_3c.overlay=new OWA.player();
});
},startOverlaySession:function(p){
OWA.overlayActive=true;
if(p.hasOwnProperty("api_url")){
OWA.setApiEndpoint(p.api_url);
}
var _3d=p;
if(_3d.action==="loadHeatmap"){
this.loadHeatmap(p);
}else{
if(_3d.action==="loadPlayer"){
this.loadPlayer(p);
}
}
},endOverlaySession:function(){
OWA.util.eraseCookie(OWA.getSetting("ns")+"overlay",document.domain);
OWA.overlayActive=false;
}};
OWA.stateManager=function(){
this.cookies=OWA.util.readAllCookies();
this.init=true;
};
OWA.stateManager.prototype={init:false,cookies:"",stores:{},storeFormats:{},storeMeta:{},registerStore:function(_3e,_3f,_40,_41){
this.storeMeta[_3e]={"expiration":_3f,"length":_40,"format":_41};
},getExpirationDays:function(_42){
if(this.storeMeta.hasOwnProperty(_42)){
return this.storeMeta[_42].expiration;
}
},getFormat:function(_43){
if(this.storeMeta.hasOwnProperty(_43)){
return this.storeMeta[_43].format;
}
},isPresent:function(_44){
if(this.stores.hasOwnProperty(_44)){
return true;
}
},set:function(_45,key,_46,_47,_48,_49){
if(!this.isPresent(_45)){
this.load(_45);
}
if(!this.isPresent(_45)){
OWA.debug("Creating state store (%s)",_45);
this.stores[_45]={};
if(OWA.getSetting("hashCookiesToDomain")){
this.stores[_45].cdh=OWA.util.getCookieDomainHash(OWA.getSetting("cookie_domain"));
}
}
if(key){
this.stores[_45][key]=_46;
}else{
this.stores[_45]=_46;
}
_48=this.getFormat(_45);
if(!_48){
if(this.storeFormats.hasOwnProperty(_45)){
_48=this.storeFormats[_45];
}
}
var _4a="";
if(_48==="json"){
_4a=JSON.stringify(this.stores[_45]);
}else{
_4a=OWA.util.assocStringFromJson(this.stores[_45]);
}
_49=this.getExpirationDays(_45);
if(!_49){
if(_47){
_49=3600;
}
}
OWA.debug("Populating state store (%s) with value: %s",_45,_4a);
var _4b=OWA.getSetting("cookie_domain")||document.domain;
OWA.util.setCookie(OWA.getSetting("ns")+_45,_4a,_49,"/",_4b);
},replaceStore:function(_4c,_4d,_4e,_4f,_50){
OWA.debug("replace state format: %s, value: %s",_4f,JSON.stringify(_4d));
if(_4c){
if(_4d){
_4f=this.getFormat(_4c);
this.stores[_4c]=_4d;
this.storeFormats[_4c]=_4f;
if(_4f==="json"){
cookie_value=JSON.stringify(_4d);
}else{
cookie_value=OWA.util.assocStringFromJson(_4d);
}
}
var _51=OWA.getSetting("cookie_domain")||document.domain;
_50=this.getExpirationDays(_4c);
OWA.debug("About to replace state store (%s) with: %s",_4c,cookie_value);
OWA.util.setCookie(OWA.getSetting("ns")+_4c,cookie_value,_50,"/",_51);
}
},getStateFromCookie:function(_52){
var _53=unescape(OWA.util.readCookie(OWA.getSetting("ns")+_52));
if(_53){
return _53;
}
},get:function(_54,key){
if(!this.isPresent(_54)){
this.load(_54);
}
if(this.isPresent(_54)){
if(key){
if(this.stores[_54].hasOwnProperty(key)){
return this.stores[_54][key];
}
}else{
return this.stores[_54];
}
}else{
OWA.debug("No state store (%s) was found",_54);
return "";
}
},getCookieValues:function(_55){
if(this.cookies.hasOwnProperty(_55)){
return this.cookies[_55];
}
},load:function(_56){
var _57="";
var _58=this.getCookieValues(OWA.getSetting("ns")+_56);
if(_58){
for(var i=0;i<_58.length;i++){
var _59=unescape(_58[i]);
var _5a=OWA.util.decodeCookieValue(_59);
var _5b=OWA.util.getCookieValueFormat(_59);
if(OWA.getSetting("hashCookiesToDomain")){
var _5c=OWA.getSetting("cookie_domain");
var _5d=OWA.util.getCookieDomainHash(_5c);
if(_5a.hasOwnProperty("cdh")){
OWA.debug("Cookie value cdh: %s, domain hash: %s",_5a.cdh,_5d);
if(_5a.cdh==_5d){
OWA.debug("Cookie: %s, index: %s domain hash matches current cookie domain. Loading...",_56,i);
_57=_5a;
break;
}else{
OWA.debug("Cookie: %s, index: %s domain hash does not match current cookie domain. Not loading.",_56,i);
}
}else{
OWA.debug("Cookie: %s, index: %s has no domain hash. Not going to Load it.",_56,i);
}
}else{
var _5e=_58.length-1;
if(i===_5e){
_57=_5a;
}
}
}
}
if(_57){
this.stores[_56]=_57;
this.storeFormats[_56]=_5b;
OWA.debug("Loaded state store: %s with: %s",_56,JSON.stringify(_57));
}else{
OWA.debug("No state for store: %s was found. Nothing to Load.",_56);
}
},clear:function(_5f,key){
if(!key){
delete this.stores[_5f];
OWA.util.eraseCookie(OWA.getSetting("ns")+_5f);
this.cookies=OWA.util.readAllCookies();
}else{
var _60=this.get(_5f);
if(_60&&_60.hasOwnProperty(key)){
delete _60["key"];
this.replaceStore(_5f,_60,true,this.getFormat(_5f),this.getExpirationDays(_5f));
}
}
},getStoreFormat:function(_61){
return this.getFormat(_61);
},setStoreFormat:function(_62,_63){
this.storeFormats[_62]=_63;
}};
OWA.uri=function(str){
this.components={};
this.dirty=false;
this.options={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};
if(str){
this.components=this.parseUri(str);
}
};
OWA.uri.prototype={parseUri:function(str){
var o=this.options;
var m=o.parser[o.strictMode?"strict":"loose"].exec(str);
var uri={};
var i=14;
while(i--){
uri[o.key[i]]=m[i]||"";
}
uri[o.q.name]={};
uri[o.key[12]].replace(o.q.parser,function($0,$1,$2){
if($1){
uri[o.q.name][$1]=$2;
}
});
return uri;
},getHost:function(){
if(this.components.hasOwnProperty("host")){
return this.components.host;
}
},getQueryParam:function(_64){
if(this.components.hasOwnProperty("queryKey")&&this.components.queryKey.hasOwnProperty(_64)){
return OWA.util.urldecode(this.components.queryKey[_64]);
}
},isQueryParam:function(_65){
if(this.components.hasOwnProperty("queryKey")&&this.components.queryKey.hasOwnProperty(_65)){
return true;
}else{
return false;
}
},getComponent:function(_66){
if(this.components.hasOwnProperty(_66)){
return this.components[_66];
}
},getProtocol:function(){
return this.getComponent("protocol");
},getAnchor:function(){
return this.getComponent("anchor");
},getQuery:function(){
return this.getComponent("query");
},getFile:function(){
return this.getComponent("file");
},getRelative:function(){
return this.getComponent("relative");
},getDirectory:function(){
return this.getComponent("directory");
},getPath:function(){
return this.getComponent("path");
},getPort:function(){
return this.getComponent("port");
},getPassword:function(){
return this.getComponent("password");
},getUser:function(){
return this.getComponent("user");
},getUserInfo:function(){
return this.getComponent("userInfo");
},getQueryParams:function(){
return this.getComponent("queryKey");
},getSource:function(){
return this.getComponent("source");
},setQueryParam:function(_67,_68){
if(!this.components.hasOwnProperty("queryKey")){
this.components.queryKey={};
}
this.components.queryKey[_67]=OWA.util.urlEncode(_68);
this.resetQuery();
},removeQueryParam:function(_69){
if(this.components.hasOwnProperty("queryKey")&&this.components.queryKey.hasOwnProperty(_69)){
delete this.components.queryKey[_69];
this.resetQuery();
}
},resetSource:function(){
this.components.source=this.assembleUrl();
},resetQuery:function(){
var qp=this.getQueryParams();
if(qp){
var _6a="";
var _6b=OWA.util.countObjectProperties(qp);
var i=1;
for(var _6c in qp){
_6a+=_6c+"="+qp[_6c];
if(i<_6b){
_6a+="&";
}
}
this.components.query=_6a;
this.resetSource();
}
},isDirty:function(){
return this.dirty;
},setPath:function(_6d){
},assembleUrl:function(){
var url="";
url+=this.getProtocol();
url+="://";
if(this.getUser()){
url+=this.getUser();
}
if(this.getUser()&&this.getPassword()){
url+=":"+this.password();
}
url+=this.getHost();
if(this.getPort()){
url+=":"+this.getPort();
}
url+=this.getDirectory();
url+=this.getFile();
var _6e=this.getQuery();
if(_6e){
url+="?"+_6e;
}
var _6f=this.getAnchor();
if(_6f){
url+="#"+_6f;
}
url+=this.getAnchor();
return url;
}};
OWA.util={ns:function(_70){
return OWA.config.ns+_70;
},nsAll:function(obj){
var _71=new Object();
for(param in obj){
if(obj.hasOwnProperty(param)){
_71[OWA.config.ns+param]=obj[param];
}
}
return _71;
},getScript:function(_72,_73){
jQuery.getScript(_73+_72);
return;
},makeUrl:function(_74,uri,_75){
var url=jQuery.sprintf(_74,uri,jQuery.param(OWA.util.nsAll(_75)));
return url;
},createCookie:function(_76,_77,_78,_79){
if(_78){
var _7a=new Date();
_7a.setTime(_7a.getTime()+(_78*24*60*60*1000));
var _7b="; expires="+_7a.toGMTString();
}else{
var _7b="";
}
document.cookie=_76+"="+_77+_7b+"; path=/";
},setCookie:function(_7c,_7d,_7e,_7f,_80,_81){
var _82=new Date();
_82.setTime(_82.getTime()+(_7e*24*60*60*1000));
document.cookie=_7c+"="+escape(_7d)+((_7e)?"; expires="+_82.toGMTString():"")+((_7f)?"; path="+_7f:"")+((_80)?"; domain="+_80:"")+((_81)?"; secure":"");
},readAllCookies:function(){
OWA.debug("Reading all cookies...");
var jar={};
var ca=document.cookie.split(";");
if(ca){
OWA.debug(document.cookie);
for(var i=0;i<ca.length;i++){
var cat=OWA.util.trim(ca[i]);
var pos=OWA.util.strpos(cat,"=");
var key=cat.substring(0,pos);
var _83=cat.substring(pos+1,cat.length);
if(!jar.hasOwnProperty(key)){
jar[key]=[];
}
jar[key].push(_83);
}
OWA.debug(JSON.stringify(jar));
return jar;
}
},readCookie:function(_84){
OWA.debug("Attempting to read cookie: %s",_84);
var jar=OWA.util.readAllCookies();
if(jar){
if(jar.hasOwnProperty(_84)){
return jar[_84];
}else{
return "";
}
}
},eraseCookie:function(_85,_86){
OWA.debug(document.cookie);
if(!_86){
_86=OWA.getSetting("cookie_domain")||document.domain;
}
OWA.debug("erasing cookie: "+_85+" in domain: "+_86);
this.setCookie(_85,"",-1,"/",_86);
var _87=OWA.util.readCookie(_85);
if(_87){
var _88=_86.substr(0,1);
OWA.debug("period: "+_88);
if(_88==="."){
var _89=_86.substr(1);
OWA.debug("erasing "+_85+" in domain2: "+_89);
this.setCookie(_85,"",-2,"/",_89);
}else{
OWA.debug("erasing "+_85+" in domain3: "+_86);
this.setCookie(_85,"",-2,"/",_86);
}
}
},eraseMultipleCookies:function(_8a,_8b){
for(var i=0;i<_8a.length;i++){
this.eraseCookie(_8a[i],_8b);
}
},loadScript:function(url,_8c){
return LazyLoad.js(url,_8c);
},loadCss:function(url,_8d){
return LazyLoad.css(url,_8d);
},parseCookieString:function parseQuery(v){
var _8e=new Array();
var _8f=unescape(v);
var _90=_8f.split("|||");
for(var i in _90){
if(_90.hasOwnProperty(i)){
var key=_90[i].split("=>");
_8e[key[0]]=key[1];
}
}
return _8e;
},parseCookieStringToJson:function parseQuery(v){
var _91=new Object;
var _92=unescape(v);
var _93=_92.split("|||");
for(var i in _93){
if(_93.hasOwnProperty(i)){
var key=_93[i].split("=>");
_91[key[0]]=key[1];
}
}
return _91;
},nsParams:function(obj){
var _94=new Object;
for(param in obj){
if(obj.hasOwnProperty(param)){
_94[OWA.getSetting("ns")+param]=obj[param];
}
}
return _94;
},urlEncode:function(str){
str=(str+"").toString();
return encodeURIComponent(str).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+");
},urldecode:function(str){
return decodeURIComponent(str.replace(/\+/g,"%20"));
},parseUrlParams:function(url){
var _95={};
for(var i,a,m,n,o,v,p=location.href.split(/[?&]/),l=p.length,k=1;k<l;k++){
if((m=p[k].match(/(.*?)(\..*?|\[.*?\])?=([^#]*)/))&&m.length==4){
n=decodeURI(m[1]).toLowerCase(),o=_95,v=decodeURI(m[3]);
if(m[2]){
for(a=decodeURI(m[2]).replace(/\[\s*\]/g,"[-1]").split(/[\.\[\]]/),i=0;i<a.length;i++){
o=o[n]?o[n]:o[n]=(parseInt(a[i])==a[i])?[]:{},n=a[i].replace(/^["\'](.*)["\']$/,"$1");
}
}
n!="-1"?o[n]=v:o[o.length]=v;
}
}
return _95;
},strpos:function(_96,_97,_98){
var i=(_96+"").indexOf(_97,(_98||0));
return i===-1?false:i;
},strCountOccurances:function(_99,_9a){
return _99.split(_9a).length-1;
},implode:function(_9b,_9c){
var i="",_9d="",_9e="";
if(arguments.length===1){
_9c=_9b;
_9b="";
}
if(typeof (_9c)==="object"){
if(_9c instanceof Array){
return _9c.join(_9b);
}else{
for(i in _9c){
_9d+=_9e+_9c[i];
_9e=_9b;
}
return _9d;
}
}else{
return _9c;
}
},checkForState:function(_9f){
return OWA.checkForState(_9f);
},setState:function(_a0,key,_a1,_a2,_a3,_a4){
return OWA.setState(_a0,key,_a1,_a2,_a3,_a4);
},replaceState:function(_a5,_a6,_a7,_a8,_a9){
return OWA.replaceState(_a5,_a6,_a7,_a8,_a9);
},getRawState:function(_aa){
return OWA.getStateFromCookie(_aa);
},getState:function(_ab,key){
return OWA.getState(_ab,key);
},clearState:function(_ac,key){
return OWA.clearState(_ac,key);
},getCookieValueFormat:function(_ad){
var _ae="";
var _af=_ad.substr(0,1);
if(_af==="{"){
_ae="json";
}else{
_ae="assoc";
}
return _ae;
},decodeCookieValue:function(_b0){
var _b1=OWA.util.getCookieValueFormat(_b0);
var _b2="";
if(_b1==="json"){
_b2=JSON.parse(_b0);
}else{
_b2=OWA.util.jsonFromAssocString(_b0);
}
OWA.debug("decodeCookieValue - string: %s, format: %s, value: %s",_b0,_b1,JSON.stringify(_b2));
return _b2;
},encodeJsonForCookie:function(_b3,_b4){
_b4=_b4||"assoc";
if(_b4==="json"){
return JSON.stringify(_b3);
}else{
return OWA.util.assocStringFromJson(_b3);
}
},getCookieDomainHash:function(_b5){
return OWA.util.dechex(OWA.util.crc32(_b5));
},loadStateJson:function(_b6){
var _b7=unescape(OWA.util.readCookie(OWA.getSetting("ns")+_b6));
if(_b7){
state=JSON.parse(_b7);
}
OWA.state[_b6]=state;
OWA.debug("state store %s: %s",_b6,JSON.stringify(state));
},is_array:function(_b8){
return typeof (_b8)=="object"&&(_b8 instanceof Array);
},str_pad:function(_b9,_ba,_bb,_bc){
var _bd="",_be;
var _bf=function(s,len){
var _c0="",i;
while(_c0.length<len){
_c0+=s;
}
_c0=_c0.substr(0,len);
return _c0;
};
_b9+="";
_bb=_bb!==undefined?_bb:" ";
if(_bc!="STR_PAD_LEFT"&&_bc!="STR_PAD_RIGHT"&&_bc!="STR_PAD_BOTH"){
_bc="STR_PAD_RIGHT";
}
if((_be=_ba-_b9.length)>0){
if(_bc=="STR_PAD_LEFT"){
_b9=_bf(_bb,_be)+_b9;
}else{
if(_bc=="STR_PAD_RIGHT"){
_b9=_b9+_bf(_bb,_be);
}else{
if(_bc=="STR_PAD_BOTH"){
_bd=_bf(_bb,Math.ceil(_be/2));
_b9=_bd+_b9+_bd;
_b9=_b9.substr(0,_ba);
}
}
}
}
return _b9;
},zeroFill:function(_c1,_c2){
return OWA.util.str_pad(_c1,_c2,"0","STR_PAD_LEFT");
},is_object:function(_c3){
if(_c3 instanceof Array){
return false;
}else{
return (_c3!==null)&&(typeof (_c3)=="object");
}
},countObjectProperties:function(obj){
var _c4=0,key;
for(key in obj){
if(obj.hasOwnProperty(key)){
_c4++;
}
}
return _c4;
},jsonFromAssocString:function(str,_c5,_c6){
_c5=_c5||"=>";
_c6=_c6||"|||";
if(str){
if(!this.strpos(str,_c5)){
return str;
}else{
var _c7={};
var _c8=str.split(_c6);
for(var i=0,n=_c8.length;i<n;i++){
var _c9=_c8[i].split(_c5);
_c7[_c9[0]]=_c9[1];
}
}
return _c7;
}
},assocStringFromJson:function(obj){
var _ca="";
var i=0;
var _cb=OWA.util.countObjectProperties(obj);
for(var _cc in obj){
i++;
_ca+=_cc+"=>"+obj[_cc];
if(i<_cb){
_ca+="|||";
}
}
return _ca;
},getDomainFromUrl:function(url,_cd){
var _ce=url.split(/\/+/g)[1];
if(_cd===true){
return OWA.util.stripWwwFromDomain(_ce);
}else{
return _ce;
}
},stripWwwFromDomain:function(_cf){
var fp=_cf.split(".")[0];
if(fp==="www"){
return _cf.substring(4);
}else{
return _cf;
}
},getCurrentUnixTimestamp:function(){
return Math.round(new Date().getTime()/1000);
},generateHash:function(_d0){
return this.crc32(_d0);
},generateRandomGuid:function(){
var _d1=this.getCurrentUnixTimestamp()+"";
var _d2=OWA.util.zeroFill(this.rand(0,999999)+"",6);
var _d3=OWA.util.zeroFill(this.rand(0,999)+"",3);
return _d1+_d2+_d3;
},crc32:function(str){
str=this.utf8_encode(str);
var _d4="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
var crc=0;
var x=0;
var y=0;
crc=crc^(-1);
for(var i=0,_d5=str.length;i<_d5;i++){
y=(crc^str.charCodeAt(i))&255;
x="0x"+_d4.substr(y*9,8);
crc=(crc>>>8)^x;
}
return crc^(-1);
},utf8_encode:function(_d6){
var _d7=(_d6+"");
var _d8="";
var _d9,end;
var _da=0;
_d9=end=0;
_da=_d7.length;
for(var n=0;n<_da;n++){
var c1=_d7.charCodeAt(n);
var enc=null;
if(c1<128){
end++;
}else{
if(c1>127&&c1<2048){
enc=String.fromCharCode((c1>>6)|192)+String.fromCharCode((c1&63)|128);
}else{
enc=String.fromCharCode((c1>>12)|224)+String.fromCharCode(((c1>>6)&63)|128)+String.fromCharCode((c1&63)|128);
}
}
if(enc!==null){
if(end>_d9){
_d8+=_d7.substring(_d9,end);
}
_d8+=enc;
_d9=end=n+1;
}
}
if(end>_d9){
_d8+=_d7.substring(_d9,_d7.length);
}
return _d8;
},utf8_decode:function(_db){
var _dc=[],i=0,ac=0,c1=0,c2=0,c3=0;
_db+="";
while(i<_db.length){
c1=_db.charCodeAt(i);
if(c1<128){
_dc[ac++]=String.fromCharCode(c1);
i++;
}else{
if((c1>191)&&(c1<224)){
c2=_db.charCodeAt(i+1);
_dc[ac++]=String.fromCharCode(((c1&31)<<6)|(c2&63));
i+=2;
}else{
c2=_db.charCodeAt(i+1);
c3=_db.charCodeAt(i+2);
_dc[ac++]=String.fromCharCode(((c1&15)<<12)|((c2&63)<<6)|(c3&63));
i+=3;
}
}
}
return _dc.join("");
},trim:function(str,_dd){
var _de,l=0,i=0;
str+="";
if(!_dd){
_de=" \n\r\t\f\v????????????????";
}else{
_dd+="";
_de=_dd.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1");
}
l=str.length;
for(i=0;i<l;i++){
if(_de.indexOf(str.charAt(i))===-1){
str=str.substring(i);
break;
}
}
l=str.length;
for(i=l-1;i>=0;i--){
if(_de.indexOf(str.charAt(i))===-1){
str=str.substring(0,i+1);
break;
}
}
return _de.indexOf(str.charAt(0))===-1?str:"";
},rand:function(min,max){
var _df=arguments.length;
if(_df===0){
min=0;
max=2147483647;
}else{
if(_df===1){
throw new Error("Warning: rand() expects exactly 2 parameters, 1 given");
}
}
return Math.floor(Math.random()*(max-min+1))+min;
},base64_encode:function(_e0){
var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var o1,o2,o3,h1,h2,h3,h4,_e1,i=0,ac=0,enc="",_e2=[];
if(!_e0){
return _e0;
}
_e0=this.utf8_encode(_e0+"");
do{
o1=_e0.charCodeAt(i++);
o2=_e0.charCodeAt(i++);
o3=_e0.charCodeAt(i++);
_e1=o1<<16|o2<<8|o3;
h1=_e1>>18&63;
h2=_e1>>12&63;
h3=_e1>>6&63;
h4=_e1&63;
_e2[ac++]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4);
}while(i<_e0.length);
enc=_e2.join("");
switch(_e0.length%3){
case 1:
enc=enc.slice(0,-2)+"==";
break;
case 2:
enc=enc.slice(0,-1)+"=";
break;
}
return enc;
},base64_decode:function(_e3){
var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var o1,o2,o3,h1,h2,h3,h4,_e4,i=0,ac=0,dec="",_e5=[];
if(!_e3){
return _e3;
}
_e3+="";
do{
h1=b64.indexOf(_e3.charAt(i++));
h2=b64.indexOf(_e3.charAt(i++));
h3=b64.indexOf(_e3.charAt(i++));
h4=b64.indexOf(_e3.charAt(i++));
_e4=h1<<18|h2<<12|h3<<6|h4;
o1=_e4>>16&255;
o2=_e4>>8&255;
o3=_e4&255;
if(h3==64){
_e5[ac++]=String.fromCharCode(o1);
}else{
if(h4==64){
_e5[ac++]=String.fromCharCode(o1,o2);
}else{
_e5[ac++]=String.fromCharCode(o1,o2,o3);
}
}
}while(i<_e3.length);
dec=_e5.join("");
dec=this.utf8_decode(dec);
return dec;
},sprintf:function(){
var _e6=/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
var a=arguments,i=0,_e7=a[i++];
var pad=function(str,len,chr,_e8){
if(!chr){
chr=" ";
}
var _e9=(str.length>=len)?"":Array(1+len-str.length>>>0).join(chr);
return _e8?str+_e9:_e9+str;
};
var _ea=function(_eb,_ec,_ed,_ee,_ef,_f0){
var _f1=_ee-_eb.length;
if(_f1>0){
if(_ed||!_ef){
_eb=pad(_eb,_ee,_f0,_ed);
}else{
_eb=_eb.slice(0,_ec.length)+pad("",_f1,"0",true)+_eb.slice(_ec.length);
}
}
return _eb;
};
var _f2=function(_f3,_f4,_f5,_f6,_f7,_f8,_f9){
var _fa=_f3>>>0;
_f5=_f5&&_fa&&{"2":"0b","8":"0","16":"0x"}[_f4]||"";
_f3=_f5+pad(_fa.toString(_f4),_f8||0,"0",false);
return _ea(_f3,_f5,_f6,_f7,_f9);
};
var _fb=function(_fc,_fd,_fe,_ff,_100,_101){
if(_ff!=null){
_fc=_fc.slice(0,_ff);
}
return _ea(_fc,"",_fd,_fe,_100,_101);
};
var _102=function(_103,_104,_105,_106,_107,_108,type){
var _109;
var _10a;
var _10b;
var _10c;
var _10d;
if(_103=="%%"){
return "%";
}
var _10e=false,_10f="",_110=false,_111=false,_112=" ";
var _113=_105.length;
for(var j=0;_105&&j<_113;j++){
switch(_105.charAt(j)){
case " ":
_10f=" ";
break;
case "+":
_10f="+";
break;
case "-":
_10e=true;
break;
case "'":
_112=_105.charAt(j+1);
break;
case "0":
_110=true;
break;
case "#":
_111=true;
break;
}
}
if(!_106){
_106=0;
}else{
if(_106=="*"){
_106=+a[i++];
}else{
if(_106.charAt(0)=="*"){
_106=+a[_106.slice(1,-1)];
}else{
_106=+_106;
}
}
}
if(_106<0){
_106=-_106;
_10e=true;
}
if(!isFinite(_106)){
throw new Error("sprintf: (minimum-)width must be finite");
}
if(!_108){
_108="fFeE".indexOf(type)>-1?6:(type=="d")?0:undefined;
}else{
if(_108=="*"){
_108=+a[i++];
}else{
if(_108.charAt(0)=="*"){
_108=+a[_108.slice(1,-1)];
}else{
_108=+_108;
}
}
}
_10d=_104?a[_104.slice(0,-1)]:a[i++];
switch(type){
case "s":
return _fb(String(_10d),_10e,_106,_108,_110,_112);
case "c":
return _fb(String.fromCharCode(+_10d),_10e,_106,_108,_110);
case "b":
return _f2(_10d,2,_111,_10e,_106,_108,_110);
case "o":
return _f2(_10d,8,_111,_10e,_106,_108,_110);
case "x":
return _f2(_10d,16,_111,_10e,_106,_108,_110);
case "X":
return _f2(_10d,16,_111,_10e,_106,_108,_110).toUpperCase();
case "u":
return _f2(_10d,10,_111,_10e,_106,_108,_110);
case "i":
case "d":
_109=parseInt(+_10d,10);
_10a=_109<0?"-":_10f;
_10d=_10a+pad(String(Math.abs(_109)),_108,"0",false);
return _ea(_10d,_10a,_10e,_106,_110);
case "e":
case "E":
case "f":
case "F":
case "g":
case "G":
_109=+_10d;
_10a=_109<0?"-":_10f;
_10b=["toExponential","toFixed","toPrecision"]["efg".indexOf(type.toLowerCase())];
_10c=["toString","toUpperCase"]["eEfFgG".indexOf(type)%2];
_10d=_10a+Math.abs(_109)[_10b](_108);
return _ea(_10d,_10a,_10e,_106,_110)[_10c]();
default:
return _103;
}
};
return _e7.replace(_e6,_102);
},clone:function(_114){
var _115=(_114 instanceof Array)?[]:{};
for(var i in _114){
if(_114[i]&&(typeof _114[i]=="object")){
_115[i]=OWA.util.clone(_114[i]);
}else{
_115[i]=_114[i];
}
}
return _115;
},strtolower:function(str){
return (str+"").toLowerCase();
},in_array:function(_116,_117,_118){
var key="",_119=!!_118;
if(_119){
for(key in _117){
if(_117[key]===_116){
return true;
}
}
}else{
for(key in _117){
if(_117[key]==_116){
return true;
}
}
}
return false;
},dechex:function(_11a){
if(_11a<0){
_11a=4294967295+_11a+1;
}
return parseInt(_11a,10).toString(16);
},explode:function(_11b,_11c,_11d){
var _11e={0:""};
if(arguments.length<2||typeof arguments[0]=="undefined"||typeof arguments[1]=="undefined"){
return null;
}
if(_11b===""||_11b===false||_11b===null){
return false;
}
if(typeof _11b=="function"||typeof _11b=="object"||typeof _11c=="function"||typeof _11c=="object"){
return _11e;
}
if(_11b===true){
_11b="1";
}
if(!_11d){
return _11c.toString().split(_11b.toString());
}else{
var _11f=_11c.toString().split(_11b.toString());
var _120=_11f.splice(0,_11d-1);
var _121=_11f.join(_11b.toString());
_120.push(_121);
return _120;
}
},isIE:function(){
if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
return true;
}
},getInternetExplorerVersion:function(){
var rv=-1;
if(navigator.appName=="Microsoft Internet Explorer"){
var ua=navigator.userAgent;
var re=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
if(re.exec(ua)!=null){
rv=parseFloat(RegExp.$1);
}
}
return rv;
},isBrowserTrackable:function(){
var _122=["doNotTrack","msDoNotTrack"];
for(var i=0,l=_122.length;i<l;i++){
if(navigator[_122[i]]==="yes"){
return false;
}
}
return true;
}};
OWA.licence="All OWA components are licensed under GPL v2.0 http://www.gnu.org/copyleft/gpl.html.  Refer http://www.openwebanalytics.com/ for source code.";
OWA.event=function(){
this.properties={};
this.id="";
this.siteId="";
this.set("timestamp",OWA.util.getCurrentUnixTimestamp());
};
OWA.event.prototype={get:function(name){
if(this.properties.hasOwnProperty(name)){
return this.properties[name];
}
},set:function(name,_123){
this.properties[name]=_123;
},setEventType:function(_124){
this.set("event_type",_124);
},getProperties:function(){
return this.properties;
},merge:function(_125){
for(param in _125){
if(_125.hasOwnProperty(param)){
this.set(param,_125[param]);
}
}
},isSet:function(name){
if(this.properties.hasOwnProperty(name)){
return true;
}
}};
OWA.commandQueue=function(){
OWA.debug("Command Queue object created");
var _126=[];
};
OWA.commandQueue.prototype={push:function(cmd,_127){
var args=Array.prototype.slice.call(cmd,1);
var _128="";
var _129="";
var _12a=OWA.util.strpos(cmd[0],".");
if(!_12a){
_128="OWATracker";
_129=cmd[0];
}else{
var _12b=cmd[0].split(".");
_128=_12b[0];
_129=_12b[1];
}
OWA.debug("cmd queue object name %s",_128);
OWA.debug("cmd queue object method name %s",_129);
if(typeof window[_128]=="undefined"){
OWA.debug("making global object named: %s",_128);
window[_128]=new OWA.tracker({globalObjectName:_128});
}
window[_128][_129].apply(window[_128],args);
if(_127&&(typeof _127=="function")){
_127();
}
},loadCmds:function(cmds){
this.asyncCmds=cmds;
},process:function(){
var that=this;
var _12c=function(){
if(that.asyncCmds.length>0){
that.process();
}
};
this.push(this.asyncCmds.shift(),_12c);
}};
OWA.tracker=function(_12d){
this.startTime=this.getTimestamp();
OWA.registerStateStore("v",3600,"","assoc");
OWA.registerStateStore("s",3600,"","assoc");
OWA.registerStateStore("c",3600,"","json");
OWA.registerStateStore("b","","","json");
this.options={logClicks:true,logPage:true,logMovement:false,encodeProperties:false,movementInterval:100,logDomStreamPercentage:100,domstreamLoggingInterval:3000,domstreamEventThreshold:10,maxPriorCampaigns:5,campaignAttributionWindow:60,trafficAttributionMode:"direct",sessionLength:1800,thirdParty:false,cookie_domain:false,campaignKeys:[{"public":"owa_medium","private":"md",full:"medium"},{"public":"owa_campaign","private":"cn",full:"campaign"},{"public":"owa_source","private":"sr",full:"source"},{"public":"owa_search_terms","private":"tr",full:"search_terms"},{"public":"owa_ad","private":"ad",full:"ad"},{"public":"owa_ad_type","private":"at",full:"ad_type"}],logger_endpoint:"",api_endpoint:"",maxCustomVars:5,getRequestCharacterLimit:2000};
var _12e=window.owa_baseUrl||OWA.config.baseUrl;
if(_12e){
this.setEndpoint(_12e);
}else{
OWA.debug("no global endpoint url found.");
}
this.endpoint=OWA.config.baseUrl;
this.active=true;
if(_12d){
for(var opt in _12d){
this.options[opt]=_12d[opt];
}
}
this.ecommerce_transaction="";
this.isClickTrackingEnabled=false;
this.domstream_guid="";
this.checkForOverlaySession();
this.page=new OWA.event();
if(typeof owa_params!="undefined"){
if(owa_params.length>0){
this.page.merge(owa_params);
}
}
};
OWA.tracker.prototype={id:"",siteId:"",init:0,stateInit:false,globalEventProperties:{},sharableStateStores:["v","s","c","b"],startTime:null,endTime:null,campaignState:[],isNewCampaign:false,isNewSessionFlag:false,isTrafficAttributed:false,linkedStateSet:false,hashCookiesToDomain:true,organicSearchEngines:[{d:"google",q:"q"},{d:"yahoo",q:"p"},{d:"yahoo",q:"q"},{d:"msn",q:"q"},{d:"bing",q:"q"},{d:"images.google",q:"q"},{d:"images.search.yahoo.com",q:"p"},{d:"aol",q:"query"},{d:"aol",q:"encquery"},{d:"aol",q:"q"},{d:"lycos",q:"query"},{d:"ask",q:"q"},{d:"altavista",q:"q"},{d:"netscape",q:"query"},{d:"cnn",q:"query"},{d:"about",q:"terms"},{d:"mamma",q:"q"},{d:"daum",q:"q"},{d:"eniro",q:"search_word"},{d:"naver",q:"query"},{d:"pchome",q:"q"},{d:"alltheweb",q:"q"},{d:"voila",q:"rdata"},{d:"virgilio",q:"qs"},{d:"live",q:"q"},{d:"baidu",q:"wd"},{d:"alice",q:"qs"},{d:"yandex",q:"text"},{d:"najdi",q:"q"},{d:"mama",q:"query"},{d:"seznam",q:"q"},{d:"search",q:"q"},{d:"wp",q:"szukaj"},{d:"onet",q:"qt"},{d:"szukacz",q:"q"},{d:"yam",q:"k"},{d:"kvasir",q:"q"},{d:"sesam",q:"q"},{d:"ozu",q:"q"},{d:"terra",q:"query"},{d:"mynet",q:"q"},{d:"ekolay",q:"q"},{d:"rambler",q:"query"},{d:"rambler",q:"words"}],urlParams:{},streamBindings:["bindMovementEvents","bindScrollEvents","bindKeypressEvents","bindClickEvents"],click:"",domstream:"",movement:"",keystroke:"",hover:"",last_event:"",last_movement:"",event_queue:[],player:"",overlay:"",setDebug:function(bool){
OWA.setSetting("debug",bool);
},checkForLinkedState:function(){
if(this.linkedStateSet!=true){
var ls=this.getUrlParam(OWA.getSetting("ns")+"state");
if(!ls){
ls=this.getAnchorParam(OWA.getSetting("ns")+"state");
}
if(ls){
OWA.debug("Shared OWA state detected...");
ls=OWA.util.base64_decode(OWA.util.urldecode(ls));
OWA.debug("linked state: %s",ls);
var _12f=ls.split(".");
OWA.debug("linked state: %s",JSON.stringify(_12f));
if(_12f){
for(var i=0;_12f.length>i;i++){
var pair=_12f[i].split("=");
OWA.debug("pair: %s",pair);
var _130=OWA.util.urldecode(pair[1]);
OWA.debug("pair: %s",_130);
decodedvalue=OWA.util.decodeCookieValue(_130);
var _131=OWA.util.getCookieValueFormat(_130);
decodedvalue.cdh=OWA.util.getCookieDomainHash(this.getCookieDomain());
OWA.replaceState(pair[0],decodedvalue,true,_131);
}
}
}
this.linkedStateSet=true;
}
},shareStateByLink:function(url){
OWA.debug("href of link: "+url);
if(url){
var _132=this.createSharedStateValue();
var _133=this.getUrlAnchorValue();
if(!_133){
OWA.debug("shared state: %s",_132);
document.location.href=url+"#"+OWA.getSetting("ns")+"state."+_132;
}else{
}
}
},createSharedStateValue:function(){
var _134="";
for(var i=0;this.sharableStateStores.length>i;i++){
var _135=OWA.getState(this.sharableStateStores[i]);
_135=OWA.util.encodeJsonForCookie(_135,OWA.getStateStoreFormat(this.sharableStateStores[i]));
if(_135){
_134+=OWA.util.sprintf("%s=%s",this.sharableStateStores[i],OWA.util.urlEncode(_135));
if(this.sharableStateStores.length!=(i+1)){
_134+=".";
}
}
}
if(_134){
OWA.debug("linked state to send: %s",_134);
_134=OWA.util.base64_encode(_134);
_134=OWA.util.urlEncode(_134);
return _134;
}
},shareStateByPost:function(form){
var _136=this.createSharedStateValue();
form.action+="#"+OWA.getSetting("ns")+"state."+_136;
form.submit();
},getCookieDomain:function(){
return this.getOption("cookie_domain")||OWA.getSetting("cookie_domain")||document.domain;
},setCookieDomain:function(_137){
var _138=false;
if(!_137){
_137=document.domain;
_138=true;
}
var _139=_137.substr(0,1);
if(_139==="."){
_137=_137.substr(1);
}
var _13a=false;
var www=_137.substr(0,4);
if(www==="www."){
if(_138){
_137=_137.substr(4);
}
_13a=true;
}
var _13b=false;
if(document.domain===_137){
_13b=true;
}
_137="."+_137;
this.setOption("cookie_domain",_137);
this.setOption("cookie_domain_set",true);
OWA.setSetting("cookie_domain",_137);
OWA.debug("Cookie domain is: %s",_137);
},getCookieDomainHash:function(_13c){
return OWA.util.crc32(_13c);
},setCookieDomainHashing:function(_13d){
this.hashCookiesToDomain=_13d;
OWA.setSetting("hashCookiesToDomain",_13d);
},checkForOverlaySession:function(){
var a=this.getAnchorParam(OWA.getSetting("ns")+"overlay");
if(a){
a=OWA.util.base64_decode(OWA.util.urldecode(a));
a=OWA.util.urldecode(a);
OWA.debug("overlay anchor value: "+a);
OWA.util.setCookie(OWA.getSetting("ns")+"overlay",a,"","/",document.domain);
this.pause();
OWA.startOverlaySession(OWA.util.decodeCookieValue(a));
}
},getUrlAnchorValue:function(){
var _13e=self.document.location.hash.substring(1);
OWA.debug("anchor value: "+_13e);
return _13e;
},getAnchorParam:function(name){
var _13f=this.getUrlAnchorValue();
if(_13f){
OWA.debug("anchor is: %s",_13f);
var _140=_13f.split(",");
OWA.debug("anchor pairs: %s",JSON.stringify(_140));
if(_140.length>0){
var _141={};
for(var i=0;_140.length>i;i++){
var _142=_140[i].split(".");
OWA.debug("anchor pieces: %s",JSON.stringify(_142));
_141[_142[0]]=_142[1];
}
OWA.debug("anchor values: %s",JSON.stringify(_141));
if(_141.hasOwnProperty(name)){
return _141[name];
}
}
}
},getUrlParam:function(name){
this.urlParams=this.urlParams||OWA.util.parseUrlParams();
if(this.urlParams.hasOwnProperty(name)){
return this.urlParams[name];
}else{
return false;
}
},dynamicFunc:function(func){
var args=Array.prototype.slice.call(func,1);
this[func[0]].apply(this,args);
},setPageTitle:function(_143){
this.setGlobalEventProperty("page_title",_143);
},setPageType:function(type){
this.setGlobalEventProperty("page_type",type);
},setUserName:function(_144){
this.setGlobalEventProperty("user_name",_144);
},setSiteId:function(_145){
this.siteId=_145;
},getSiteId:function(){
return this.siteId;
},setEndpoint:function(_146){
_146=("https:"==document.location.protocol?window.owa_baseSecUrl||_146.replace(/http:/,"https:"):_146);
this.setOption("baseUrl",_146);
OWA.config.baseUrl=_146;
},setLoggerEndpoint:function(url){
this.setOption("logger_endpoint",this.forceUrlProtocol(url));
},getLoggerEndpoint:function(){
var url=this.getOption("logger_endpoint")||this.getEndpoint()||OWA.getSetting("baseUrl");
return url+"log.php";
},setApiEndpoint:function(url){
this.setOption("api_endpoint",this.forceUrlProtocol(url));
OWA.setApiEndpoint(url);
},getApiEndpoint:function(){
return this.getOption("api_endpoint")||this.getEndpoint()+"api.php";
},forceUrlProtocol:function(url){
url=("https:"==document.location.protocol?url.replace(/http:/,"https:"):url);
return url;
},getEndpoint:function(){
return this.getOption("baseUrl");
},getCurrentUrl:function(){
return document.URL;
},bindClickEvents:function(){
if(!this.isClickTrackingEnabled){
var that=this;
if(window.addEventListener){
window.addEventListener("click",function(e){
that.clickEventHandler(e);
},false);
}else{
if(window.attachEvent){
document.attachEvent("onclick",function(e){
that.clickEventHandler(e);
});
}
}
this.isClickTrackingEnabled=true;
}
},setDomstreamSampleRate:function(_147){
this.setOption("logDomStreamPercentage",_147);
},startDomstreamTimer:function(){
var _148=this.getOption("domstreamLoggingInterval");
var that=this;
var _149=setInterval(function(){
that.logDomStream();
},_148);
},log:function(){
this.page.setEventType("base.page_request");
return this.logEvent(this.page);
},isObjectType:function(obj,type){
return !!(obj&&type&&type.prototype&&obj.constructor==type.prototype.constructor);
},logEvent:function(_14a,_14b,_14c){
if(this.active){
_14a.site_id=this.getSiteId();
var url=this._assembleRequestUrl(_14a);
var _14d=this.getOption("getRequestCharacterLimit");
if(url.length>_14d){
var data=this.prepareRequestData(_14a);
this.cdPost(data);
}else{
OWA.debug("url : %s",url);
var _14e=new Image(1,1);
_14e.onLoad=function(){
};
_14e.src=url;
if(_14b){
}
OWA.debug("Inserted web bug for %s",_14a["event_type"]);
}
if(_14c&&(typeof (_14c)==="function")){
_14c();
}
}
},_assembleRequestUrl:function(_14f){
var get=this.prepareRequestDataForGet(_14f);
var _150=this.getLoggerEndpoint();
if(_150.indexOf("?")===-1){
_150+="?";
}else{
_150+="&";
}
var _151=_150+get;
return _151;
},prepareRequestData:function(_152){
var data={};
for(var _153 in _152){
var _154="";
if(_152.hasOwnProperty(_153)){
if(OWA.util.is_array(_152[_153])){
var n=_152[_153].length;
for(var i=0;i<n;i++){
if(OWA.util.is_object(_152[_153][i])){
for(var _155 in _152[_153][i]){
data[OWA.util.sprintf(OWA.getSetting("ns")+"%s[%s][%s]",_153,i,_155)]=OWA.util.urlEncode(_152[_153][i][_155]);
}
}else{
data[OWA.util.sprintf(OWA.getSetting("ns")+"%s[%s]",_153,i)]=OWA.util.urlEncode(_152[_153][i]);
}
}
}else{
data[OWA.util.sprintf(OWA.getSetting("ns")+"%s",_153)]=OWA.util.urlEncode(_152[_153]);
}
}
}
return data;
},prepareRequestDataForGet:function(_156){
var _156=this.prepareRequestData(_156);
var get="";
for(var _157 in _156){
if(_156.hasOwnProperty(_157)){
var kvp="";
kvp=OWA.util.sprintf("%s=%s&",_157,_156[_157]);
get+=kvp;
}
}
return get;
},cdPost:function(data){
var _158="owa-tracker-post-container";
var _159=this.getLoggerEndpoint();
var _15a=document.getElementById(_158);
if(!_15a){
var div=document.createElement("div");
div.setAttribute("id",_158);
document.body.appendChild(div);
_15a=document.getElementById(_158);
}
this.generateHiddenIframe(_15a,data);
},generateHiddenIframe:function(_15b,data){
var _15c="owa-tracker-post-iframe";
if(OWA.util.isIE()&&OWA.util.getInternetExplorerVersion()<9){
var _15d=document.createElement("<iframe name=\""+_15c+"\" scr=\"about:blank\" width=\"1\" height=\"1\"></iframe>");
}else{
var _15d=document.createElement("iframe");
_15d.setAttribute("name",_15c);
_15d.setAttribute("src","about:blank");
_15d.setAttribute("width",1);
_15d.setAttribute("height",1);
}
_15d.setAttribute("class",_15c);
_15d.setAttribute("style","border: none;");
var that=this;
if(_15b==null){
_15b=document.body;
}
_15b.appendChild(_15d);
var _15e=setInterval(function(){
var doc=that.getIframeDocument(_15d);
if(doc){
that.postFromIframe(_15d,data);
clearInterval(_15e);
}
},1);
var _15f=setInterval(function(){
_15b.removeChild(_15d);
clearInterval(_15f);
},1000);
},postFromIframe:function(ifr,data){
var _160=this.getLoggerEndpoint();
var doc=this.getIframeDocument(ifr);
var _161="post_form"+Math.random();
if(OWA.util.isIE()&&OWA.util.getInternetExplorerVersion()<9){
var frm=doc.createElement("<form name=\""+_161+"\"></form>");
}else{
var frm=doc.createElement("form");
frm.setAttribute("name",_161);
}
frm.setAttribute("id",_161);
frm.setAttribute("action",_160);
frm.setAttribute("method","POST");
for(var _162 in data){
if(data.hasOwnProperty(_162)){
if(OWA.util.isIE()&&OWA.util.getInternetExplorerVersion()<9){
var _163=doc.createElement("<input type='hidden' name='"+_162+"' />");
}else{
var _163=document.createElement("input");
_163.setAttribute("name",_162);
_163.setAttribute("type","hidden");
}
_163.setAttribute("value",data[_162]);
frm.appendChild(_163);
}
}
doc.body.appendChild(frm);
doc.forms[_161].submit();
doc.body.removeChild(frm);
},createPostForm:function(){
var _164=this.getLoggerEndpoint();
var _165="post_form"+Math.random();
if(OWA.util.isIE()&&OWA.util.getInternetExplorerVersion()<9){
var frm=doc.createElement("<form name=\""+_165+"\"></form>");
}else{
var frm=doc.createElement("form");
frm.setAttribute("name",_165);
}
frm.setAttribute("id",_165);
frm.setAttribute("action",_164);
frm.setAttribute("method","POST");
return frm;
},getIframeDocument:function(_166){
var doc=null;
if(_166.contentDocument){
doc=_166.contentDocument;
}else{
if(_166.contentWindow&&_166.contentWindow.document){
doc=_166.contentWindow.document;
}else{
if(_166.document){
doc=_166.document;
}
}
}
if(doc==null){
OWA.debug("Document not found, append the parent element to the DOM before creating the IFrame");
}
doc.open();
doc.close();
return doc;
},getViewportDimensions:function(){
var _167=new Object();
_167.width=window.innerWidth?window.innerWidth:document.body.offsetWidth;
_167.height=window.innerHeight?window.innerHeight:document.body.offsetHeight;
return _167;
},findPosX:function(obj){
var _168=0;
if(obj.offsetParent){
while(obj.offsetParent){
_168+=obj.offsetLeft;
obj=obj.offsetParent;
}
}else{
if(obj.x){
_168+=obj.x;
}
}
return _168;
},findPosY:function(obj){
var _169=0;
if(obj.offsetParent){
while(obj.offsetParent){
_169+=obj.offsetTop;
obj=obj.offsetParent;
}
}else{
if(obj.y){
_169+=obj.y;
}
}
return _169;
},_getTarget:function(e){
var targ=e.target||e.srcElement;
if(typeof targ=="undefined"||targ==null){
return null;
}
if(targ.nodeType==3){
targ=target.parentNode;
}
return targ;
},getCoords:function(e){
var _16a=new Object();
if(typeof (e.pageX)=="number"){
_16a.x=e.pageX+"";
_16a.y=e.pageY+"";
}else{
_16a.x=e.clientX+"";
_16a.y=e.clientY+"";
}
return _16a;
},getDomElementProperties:function(targ){
var _16b=new Object();
_16b.dom_element_tag=targ.tagName;
if(targ.tagName=="A"){
if(targ.textContent!=undefined){
_16b.dom_element_text=targ.textContent;
}else{
_16b.dom_element_text=targ.innerText;
}
_16b.target_url=targ.href;
}else{
if(targ.tagName=="INPUT"){
_16b.dom_element_text=targ.value;
}else{
if(targ.tagName=="IMG"){
_16b.target_url=targ.parentNode.href;
_16b.dom_element_text=targ.alt;
}else{
if(targ.textContent!=undefined){
_16b.html_element_text="";
}else{
_16b.html_element_text="";
}
}
}
}
return _16b;
},clickEventHandler:function(e){
e=e||window.event;
var _16c=new OWA.event();
_16c.setEventType("dom.click");
var targ=this._getTarget(e);
var _16d="(not set)";
if(targ.hasOwnProperty&&targ.hasOwnProperty("name")&&targ.name.length>0){
_16d=targ.name;
}
_16c.set("dom_element_name",_16d);
var _16e="(not set)";
if(targ.hasOwnProperty&&targ.hasOwnProperty("value")&&targ.value.length>0){
_16e=targ.value;
}
_16c.set("dom_element_value",_16e);
var _16f="(not set)";
if(targ.hasOwnProperty&&!targ.hasOwnProperty("id")&&targ.id.length>0){
_16f=targ.id;
}
_16c.set("dom_element_id",_16f);
var _170="(not set)";
if(targ.hasOwnProperty&&targ.hasOwnProperty("className")&&targ.className.length>0){
_170=targ.className;
}
_16c.set("dom_element_class",_170);
_16c.set("dom_element_tag",OWA.util.strtolower(targ.tagName));
_16c.set("page_url",window.location.href);
var _171=this.getViewportDimensions();
_16c.set("page_width",_171.width);
_16c.set("page_height",_171.height);
var _172=this.getDomElementProperties(targ);
_16c.merge(this.filterDomProperties(_172));
_16c.set("dom_element_x",this.findPosX(targ)+"");
_16c.set("dom_element_y",this.findPosY(targ)+"");
var _173=this.getCoords(e);
_16c.set("click_x",_173.x);
_16c.set("click_y",_173.y);
if(this.getOption("trackDomStream")){
this.addToEventQueue(_16c);
}
var _174=OWA.util.clone(_16c);
if(this.getOption("logClicksAsTheyHappen")){
this.trackEvent(_174);
}
this.click=_174;
},filterDomProperties:function(_175){
return _175;
},callMethod:function(_176,data){
return this[_176](data);
},addDomStreamEventBinding:function(_177){
this.streamBindings.push(_177);
},bindMovementEvents:function(){
var that=this;
document.onmousemove=function(e){
that.movementEventHandler(e);
};
},movementEventHandler:function(e){
e=e||window.event;
var now=this.getTime();
if(now>this.last_movement+this.getOption("movementInterval")){
this.movement=new OWA.event();
this.movement.setEventType("dom.movement");
var _178=this.getCoords(e);
this.movement.set("cursor_x",_178.x);
this.movement.set("cursor_y",_178.y);
this.addToEventQueue(this.movement);
this.last_movement=now;
}
},bindScrollEvents:function(){
var that=this;
window.onscroll=function(e){
that.scrollEventHandler(e);
};
},scrollEventHandler:function(e){
var e=e||window.event;
var now=this.getTimestamp();
var _179=new OWA.event();
_179.setEventType("dom.scroll");
var _17a=this.getScrollingPosition();
_179.set("x",_17a.x);
_179.set("y",_17a.y);
this.addToEventQueue(_179);
this.last_scroll=now;
},getScrollingPosition:function(){
var _17b=[0,0];
if(typeof window.pageYOffset!="undefined"){
_17b={x:window.pageXOffset,y:window.pageYOffset};
}else{
if(typeof document.documentElement.scrollTop!="undefined"&&document.documentElement.scrollTop>0){
_17b={x:document.documentElement.scrollLeft,y:document.documentElement.scrollTop};
}else{
if(typeof document.body.scrollTop!="undefined"){
_17b={x:document.body.scrollLeft,y:document.body.scrollTop};
}
}
}
return _17b;
},bindHoverEvents:function(){
},bindFocusEvents:function(){
var that=this;
},bindKeypressEvents:function(){
var that=this;
document.onkeypress=function(e){
that.keypressEventHandler(e);
};
},keypressEventHandler:function(e){
e=e||window.event;
var targ=this._getTarget(e);
if(targ.tagName==="INPUT"&&targ.type==="password"){
return;
}
var _17c=e.keyCode?e.keyCode:e.charCode;
var _17d=String.fromCharCode(_17c);
var _17e=new OWA.event();
_17e.setEventType("dom.keypress");
_17e.set("key_value",_17d);
_17e.set("key_code",_17c);
_17e.set("dom_element_name",targ.name);
_17e.set("dom_element_value",targ.value);
_17e.set("dom_element_id",targ.id);
_17e.set("dom_element_tag",targ.tagName);
this.addToEventQueue(_17e);
},getTimestamp:function(){
return OWA.util.getCurrentUnixTimestamp();
},getTime:function(){
return Math.round(new Date().getTime());
},getElapsedTime:function(){
return this.getTimestamp()-this.startTime;
},getOption:function(name){
if(this.options.hasOwnProperty(name)){
return this.options[name];
}
},setOption:function(name,_17f){
this.options[name]=_17f;
},setLastEvent:function(_180){
return;
},addToEventQueue:function(_181){
if(this.active&&!this.isPausedBySibling()){
var now=this.getTimestamp();
if(_181!=undefined){
this.event_queue.push(_181.getProperties());
}else{
}
}
},isPausedBySibling:function(){
return OWA.getSetting("loggerPause");
},sleep:function(_182){
var _183=new Date().getTime();
while(new Date().getTime()<_183+_182){
}
},pause:function(){
this.active=false;
},restart:function(){
this.active=true;
},makeEvent:function(){
return new OWA.event();
},addStreamEventBinding:function(name){
this.streamBindings.push(name);
},getCampaignProperties:function(){
if(!this.urlParams.length>0){
this.urlParams=OWA.util.parseUrlParams(document.URL);
OWA.debug("GET: "+JSON.stringify(this.urlParams));
}
var _184=this.getOption("campaignKeys");
var _185={};
for(var i=0,n=_184.length;i<n;i++){
if(this.urlParams.hasOwnProperty(_184[i]["public"])){
_185[_184[i]["private"]]=this.urlParams[_184[i]["public"]];
this.isNewCampaign=true;
}
}
if(_185["at"]&&!_185["ad"]){
_185["ad"]="(not set)";
}
if(_185["ad"]&&!_185["at"]){
_185["at"]="(not set)";
}
if(this.isNewCampaign){
}
return _185;
},setCampaignSessionState:function(_186){
var _187=this.getOption("campaignKeys");
for(var i=0,n=_187.length;i<n;i++){
if(_186.hasOwnProperty(_187[i]["private"])){
OWA.setState("s",_187[i].full,_186[_187[i]["private"]]);
}
}
},setCampaignRelatedProperties:function(_188){
var _189=this.getCampaignProperties();
OWA.debug("campaign properties: %s",JSON.stringify(_189));
var _18a=this.getOption("campaignKeys");
for(var i=0,n=_18a.length;i<n;i++){
if(_189.hasOwnProperty(_18a[i]["private"])){
this.setGlobalEventProperty(_18a[i].full,_189[_18a[i]["private"]]);
}
}
},directAttributionModel:function(_18b){
if(this.isNewCampaign){
OWA.debug("campaign state length: %s",this.campaignState.length);
this.campaignState.push(_18b);
if(this.campaignState.length>this.options.maxPriorCampaigns){
var _18c=this.campaignState.splice(0,1);
OWA.debug("Too many prior campaigns in state store. Dropping oldest to make room.");
}
this.setCampaignCookie(this.campaignState);
this.isTrafficAttributed=true;
this.setCampaignSessionState(_18b);
return _18b;
}
},originalAttributionModel:function(_18d){
if(this.campaignState.length>0){
OWA.debug("Original attribution detected.");
_18d=this.campaignState[0];
this.isTrafficAttributed=true;
}else{
OWA.debug("Setting Original Campaign touch.");
if(this.isNewCampaign){
this.campaignState.push(_18d);
this.setCampaignCookie(this.campaignState);
this.isTrafficAttributed=true;
}
}
this.setCampaignSessionState(_18d);
return _18d;
},setCampaignMediumKey:function(key){
this.options.campaignKeys[0]["public"]=key;
},setCampaignNameKey:function(key){
this.options.campaignKeys[1]["public"]=key;
},setCampaignSourceKey:function(key){
this.options.campaignKeys[2]["public"]=key;
},setCampaignSearchTermsKey:function(key){
this.options.campaignKeys[3]["public"]=key;
},setCampaignAdKey:function(key){
this.options.campaignKeys[4]["public"]=key;
},setCampaignAdTypeKey:function(key){
this.options.campaignKeys[5]["public"]=key;
},setTrafficAttribution:function(_18e,_18f){
var _190=OWA.getState("c","attribs");
if(_190){
this.campaignState=_190;
}
var _191=this.getCampaignProperties();
switch(this.options.trafficAttributionMode){
case "direct":
OWA.debug("Applying \"Direct\" Traffic Attribution Model");
_191=this.directAttributionModel(_191);
break;
case "original":
OWA.debug("Applying \"Original\" Traffic Attribution Model");
_191=this.originalAttributionModel(_191);
break;
default:
OWA.debug("Applying Default (Direct) Traffic Attribution Model");
this.directAttributionModel(_191);
}
if(this.isTrafficAttributed){
OWA.debug("Attributed Traffic to: %s",JSON.stringify(_191));
}else{
if(this.isNewSessionFlag===true){
OWA.debug("Infering traffic attribution.");
this.inferTrafficAttribution();
}
}
var _192=this.getOption("campaignKeys");
for(var i=0,n=_192.length;i<n;i++){
var _193=OWA.getState("s",_192[i].full);
if(_193){
this.setGlobalEventProperty(_192[i].full,_193);
}
}
var _194=OWA.getState("s","referer");
if(_194){
this.setGlobalEventProperty("session_referer",_194);
}
if(this.campaignState.length>0){
this.setGlobalEventProperty("attribs",JSON.stringify(this.campaignState));
}
if(_18f&&(typeof (_18f)==="function")){
_18f(_18e);
}
},inferTrafficAttribution:function(){
var ref=document.referrer;
var _195="direct";
var _196="(none)";
var _197="(none)";
var _198="(none)";
if(ref){
var uri=new OWA.uri(ref);
if(document.domain!=uri.getHost()){
_195="referral";
_198=ref;
_196=OWA.util.stripWwwFromDomain(uri.getHost());
var _199=this.isRefererSearchEngine(uri);
if(_199){
_195="organic-search";
_197=_199.t||"(not provided)";
}
}
}
OWA.setState("s","referer",_198);
OWA.setState("s","medium",_195);
OWA.setState("s","source",_196);
OWA.setState("s","search_terms",_197);
},setCampaignCookie:function(_19a){
OWA.setState("c","attribs",_19a,"","json",this.options.campaignAttributionWindow);
},isRefererSearchEngine:function(uri){
for(var i=0,n=this.organicSearchEngines.length;i<n;i++){
var _19b=this.organicSearchEngines[i].d;
var _19c=this.organicSearchEngines[i].q;
var host=uri.getHost();
var term=uri.getQueryParam(_19c);
if(OWA.util.strpos(host,_19b)&&uri.isQueryParam(_19c)){
OWA.debug("Found search engine: %s with query param %s:, query term: %s",_19b,_19c,term);
return {d:_19b,q:_19c,t:term};
}
}
},addOrganicSearchEngine:function(_19d,_19e,_19f){
var _1a0={d:_19d,q:_19e};
if(_19f){
this.organicSearchEngines.unshift(_1a0);
}else{
this.organicSearchEngines.push(_1a0);
}
},addTransaction:function(_1a1,_1a2,_1a3,tax,_1a4,_1a5,city,_1a6,_1a7){
this.ecommerce_transaction=new OWA.event();
this.ecommerce_transaction.setEventType("ecommerce.transaction");
this.ecommerce_transaction.set("ct_order_id",_1a1);
this.ecommerce_transaction.set("ct_order_source",_1a2);
this.ecommerce_transaction.set("ct_total",_1a3);
this.ecommerce_transaction.set("ct_tax",tax);
this.ecommerce_transaction.set("ct_shipping",_1a4);
this.ecommerce_transaction.set("ct_gateway",_1a5);
this.ecommerce_transaction.set("page_url",this.getCurrentUrl());
this.ecommerce_transaction.set("city",city);
this.ecommerce_transaction.set("state",_1a6);
this.ecommerce_transaction.set("country",_1a7);
OWA.debug("setting up ecommerce transaction");
this.ecommerce_transaction.set("ct_line_items",[]);
OWA.debug("completed setting up ecommerce transaction");
},addTransactionLineItem:function(_1a8,sku,_1a9,_1aa,_1ab,_1ac){
if(!this.ecommerce_transaction){
this.addTransaction("none set");
}
var li={};
li.li_order_id=_1a8;
li.li_sku=sku;
li.li_product_name=_1a9;
li.li_category=_1aa;
li.li_unit_price=_1ab;
li.li_quantity=_1ac;
var _1ad=this.ecommerce_transaction.get("ct_line_items");
_1ad.push(li);
this.ecommerce_transaction.set("ct_line_items",_1ad);
},trackTransaction:function(){
if(this.ecommerce_transaction){
this.trackEvent(this.ecommerce_transaction);
this.ecommerce_transaction="";
}
},setNumberPriorSessions:function(_1ae,_1af){
OWA.debug("setting number of prior sessions");
var nps=OWA.getState("v","nps");
if(!nps){
nps="0";
}
if(this.isNewSessionFlag===true){
nps=nps*1;
nps++;
OWA.setState("v","nps",nps,true);
}
this.setGlobalEventProperty("nps",nps);
if(_1af&&(typeof (_1af)==="function")){
_1af(_1ae);
}
},setDaysSinceLastSession:function(_1b0,_1b1){
OWA.debug("setting days since last session.");
var dsps="";
if(this.getGlobalEventProperty("is_new_session")){
OWA.debug("timestamp: %s",_1b0.get("timestamp"));
var _1b2=this.getGlobalEventProperty("last_req")||_1b0.get("timestamp");
OWA.debug("last_req: %s",_1b2);
dsps=Math.round((_1b0.get("timestamp")-_1b2)/(3600*24));
OWA.setState("s","dsps",dsps);
}
if(!dsps){
dsps=OWA.getState("s","dsps")||0;
}
this.setGlobalEventProperty("dsps",dsps);
if(_1b1&&(typeof (_1b1)==="function")){
_1b1(_1b0);
}
},setVisitorId:function(_1b3,_1b4){
var _1b5=OWA.getState("v","vid");
if(!_1b5){
var _1b6=OWA.getState("v");
if(!OWA.util.is_object(_1b6)){
_1b5=_1b6;
OWA.clearState("v");
OWA.setState("v","vid",_1b5,true);
}
}
if(!_1b5){
_1b5=OWA.util.generateRandomGuid(this.siteId);
this.globalEventProperties.is_new_visitor=true;
OWA.setState("v","vid",_1b5,true);
OWA.debug("Creating new visitor id");
}
this.setGlobalEventProperty("visitor_id",_1b5);
if(_1b4&&(typeof (_1b4)==="function")){
_1b4(_1b3);
}
},setFirstSessionTimestamp:function(_1b7,_1b8){
var fsts=OWA.getState("v","fsts");
if(!fsts){
fsts=_1b7.get("timestamp");
OWA.debug("setting fsts value: %s",fsts);
OWA.setState("v","fsts",fsts,true);
}
this.setGlobalEventProperty("fsts",fsts);
var dsfs=Math.round((_1b7.get("timestamp")-fsts)/(3600*24));
OWA.setState("v","dsfs",dsfs);
this.setGlobalEventProperty("dsfs",dsfs);
if(_1b8&&(typeof (_1b8)==="function")){
_1b8(_1b7);
}
},setLastRequestTime:function(_1b9,_1ba){
var _1bb=OWA.getState("s","last_req");
OWA.debug("last_req from cookie: %s",_1bb);
if(!_1bb){
var _1bc=OWA.util.sprintf("%s_%s","ss",this.siteId);
_1bb=OWA.getState(_1bc,"last_req");
}
OWA.debug("setting last_req global property of %s",_1bb);
this.setGlobalEventProperty("last_req",_1bb);
OWA.setState("s","last_req",_1b9.get("timestamp"),true);
if(_1ba&&(typeof (_1ba)==="function")){
_1ba(_1b9);
}
},setSessionId:function(_1bd,_1be){
var _1bf="";
var _1c0="";
var _1c1=this.isNewSession(_1bd.get("timestamp"),this.getGlobalEventProperty("last_req"));
if(_1c1){
var _1c2=OWA.getState("s","sid");
if(!_1c2){
_1c0=OWA.util.sprintf("%s_%s","ss",this.getSiteId());
_1c2=OWA.getState(_1c0,"s");
}
if(_1c2){
this.globalEventProperties.prior_session_id=_1c2;
}
this.resetSessionState();
_1bf=OWA.util.generateRandomGuid(this.getSiteId());
this.globalEventProperties.session_id=_1bf;
this.globalEventProperties.is_new_session=true;
this.isNewSessionFlag=true;
OWA.setState("s","sid",_1bf,true);
}else{
_1bf=OWA.getState("s","sid");
if(!_1bf){
_1c0=OWA.util.sprintf("%s_%s","ss",this.getSiteId());
_1bf=OWA.getState(_1c0,"s");
OWA.setState("s","sid",_1bf,true);
}
this.globalEventProperties.session_id=_1bf;
}
if(!this.getGlobalEventProperty("session_id")){
_1bf=OWA.util.generateRandomGuid(this.getSiteId());
this.globalEventProperties.session_id=_1bf;
this.globalEventProperties.is_new_session=true;
this.isNewSessionFlag=true;
OWA.setState("s","sid",_1bf,true);
}
if(_1be&&(typeof (_1be)==="function")){
_1be(_1bd);
}
},resetSessionState:function(){
var _1c3=OWA.getState("s","last_req");
OWA.clearState("s");
OWA.setState("s","last_req",_1c3);
},isNewSession:function(_1c4,_1c5){
var _1c6=false;
if(!_1c4){
_1c4=OWA.util.getCurrentUnixTimestamp();
}
if(!_1c5){
_1c5=0;
}
var _1c7=_1c4-_1c5;
var len=this.options.sessionLength;
if(_1c7<len){
OWA.debug("This request is part of a active session.");
return false;
}else{
OWA.debug("This request is the start of a new session. Prior session expired.");
return true;
}
},getGlobalEventProperty:function(name){
if(this.globalEventProperties.hasOwnProperty(name)){
return this.globalEventProperties[name];
}
},setGlobalEventProperty:function(name,_1c8){
this.globalEventProperties[name]=_1c8;
},deleteGlobalEventProperty:function(name){
if(this.globalEventProperties.hasOwnProperty(name)){
delete this.globalEventProperties[name];
}
},setPageProperties:function(_1c9){
for(var prop in _1c9){
if(_1c9.hasOwnProperty(prop)){
this.page.set(prop,_1c9[prop]);
}
}
},setCustomVar:function(slot,name,_1ca,_1cb){
var _1cc="cv"+slot;
var _1cd=name+"="+_1ca;
if(_1cd.length>65){
OWA.debug("Custom variable name + value is too large. Must be less than 64 characters.");
return;
}
switch(_1cb){
case "session":
OWA.util.setState("b",_1cc,_1cd);
OWA.debug("just set custom var on session.");
break;
case "visitor":
OWA.util.setState("v",_1cc,_1cd);
OWA.util.clearState("b",_1cc);
break;
}
this.setGlobalEventProperty(_1cc,_1cd);
},getCustomVar:function(slot){
var _1ce="cv"+slot;
var cv="";
cv=this.getGlobalEventProperty(_1ce);
if(!cv){
cv=OWA.util.getState("b",_1ce);
}
if(!cv){
cv=OWA.util.getState("v",_1ce);
}
return cv;
},deleteCustomVar:function(slot){
var _1cf="cv"+slot;
OWA.util.clearState("b",_1cf);
OWA.util.clearState("v",_1cf);
this.deleteGlobalEventProperty(_1cf);
},addDefaultsToEvent:function(_1d0,_1d1){
if(!_1d0.get("page_url")){
_1d0.set("page_url",this.getCurrentUrl());
}
if(!_1d0.get("HTTP_REFERER")){
_1d0.set("HTTP_REFERER",document.referrer);
}
if(!_1d0.get("page_title")){
_1d0.set("page_title",OWA.util.trim(document.title));
}
if(_1d1&&(typeof (_1d1)=="function")){
_1d1(_1d0);
}
},addGlobalPropertiesToEvent:function(_1d2,_1d3){
for(var i=1;i<=this.getOption("maxCustomVars");i++){
var _1d4="cv"+i;
var _1d5="";
if(!this.globalEventProperties.hasOwnProperty(_1d4)){
_1d5=this.getCustomVar(i);
if(_1d5){
this.setGlobalEventProperty(_1d4,_1d5);
}
}
}
OWA.debug("Adding global properties to event: %s",JSON.stringify(this.globalEventProperties));
for(var prop in this.globalEventProperties){
if(this.globalEventProperties.hasOwnProperty(prop)&&!_1d2.isSet(prop)){
_1d2.set(prop,this.globalEventProperties[prop]);
}
}
if(_1d3&&(typeof (_1d3)==="function")){
_1d3(_1d2);
}
},manageState:function(_1d6,_1d7){
var that=this;
if(!this.stateInit){
this.setVisitorId(_1d6,function(_1d8){
that.setFirstSessionTimestamp(_1d8,function(_1d9){
that.setLastRequestTime(_1d9,function(_1da){
that.setSessionId(_1da,function(_1db){
that.setNumberPriorSessions(_1db,function(_1dc){
that.setDaysSinceLastSession(_1dc,function(_1dd){
that.setTrafficAttribution(_1dd,function(_1de){
that.stateInit=true;
});
});
});
});
});
});
});
}
if(_1d7&&(typeof (_1d7)==="function")){
_1d7(_1d6);
}
},trackEvent:function(_1df,_1e0){
if(this.getOption("cookie_domain_set")!=true){
this.setCookieDomain();
}
var _1e1=false;
if(this.active){
if(_1e0){
_1e1=true;
}
if(this.getOption("thirdParty")){
this.globalEventProperties.thirdParty=true;
this.setCampaignRelatedProperties(_1df);
}else{
var that=this;
this.manageState(_1df,function(_1e2){
that.addGlobalPropertiesToEvent(_1e2,function(_1e3){
that.addDefaultsToEvent(_1e3,function(_1e4){
return that.logEvent(_1e4.getProperties(),_1e1);
});
});
});
}
}
},trackPageView:function(url){
if(url){
this.page.set("page_url",url);
}
this.page.set("timestamp",this.startTime);
this.page.setEventType("base.page_request");
return this.trackEvent(this.page);
},trackAction:function(_1e5,_1e6,_1e7,_1e8){
var _1e9=new OWA.event;
_1e9.setEventType("track.action");
_1e9.set("site_id",this.getSiteId());
_1e9.set("page_url",this.getCurrentUrl());
_1e9.set("action_group",_1e5);
_1e9.set("action_name",_1e6);
_1e9.set("action_label",_1e7);
_1e9.set("numeric_value",_1e8);
this.trackEvent(_1e9);
OWA.debug("Action logged");
},trackClicks:function(_1ea){
this.setOption("logClicksAsTheyHappen",true);
this.bindClickEvents();
},logDomStream:function(){
var _1eb=new OWA.event;
if(this.event_queue.length>this.options.domstreamEventThreshold){
if(!this.domstream_guid){
var salt="domstream"+this.getCurrentUrl()+this.getSiteId();
this.domstream_guid=OWA.util.generateRandomGuid(salt);
}
_1eb.setEventType("dom.stream");
_1eb.set("domstream_guid",this.domstream_guid);
_1eb.set("site_id",this.getSiteId());
_1eb.set("page_url",this.getCurrentUrl());
_1eb.set("timestamp",OWA.util.getCurrentUnixTimestamp());
_1eb.set("duration",this.getElapsedTime());
_1eb.set("stream_events",JSON.stringify(this.event_queue));
_1eb.set("stream_length",this.event_queue.length);
this.event_queue=[];
return this.trackEvent(_1eb);
}else{
OWA.debug("Domstream had too few events to log.");
}
},trackDomStream:function(){
if(this.active){
var rand=Math.floor(Math.random()*100+1);
if(rand<=this.getOption("logDomStreamPercentage")){
this.setOption("trackDomStream",true);
var len=this.streamBindings.length;
for(var i=0;i<len;i++){
this.callMethod(this.streamBindings[i]);
}
this.startDomstreamTimer();
}else{
OWA.debug("not tracking domstream for this user.");
}
}
}};
function _1ec(_1ed){
if(_1ed===undefined){
_1ed={};
}
if(_1ed.cookie_domain){
this.cookie_domain=_1ed.cookie_domain;
}else{
this.cookie_domain=document.domain;
}
if(_1ed.cookie_name){
this.cookie_name=_1ed.cookie_name;
}else{
this.cookie_name="multitouch";
}
if(_1ed.cookie_lifetime){
this.cookie_lifetime=_1ed.cookie_lifetime;
}else{
this.cookie_lifetime=180;
}
if(_1ed.max_cookie_size){
this.max_cookie_size=_1ed.max_cookie_size;
}else{
this.max_cookie_size=2048;
}
this.allow_internal=_1ed.allow_internal;
this.fieldsep="!";
this.recsep="*";
var _1ee="google:q;yahoo:p;msn:q;bing:q;daum:q;eniro:search_word;naver:query;images.google:q;aol:query;aol:encquery;lycos:query;ask:q;altavista:q;netscape:query;cnn:query;about:terms;mamma:query;alltheweb:q;voila:rdata;virgilio:qs;live:q;baidu:wd;alice:qs;yandex:text;najdi:q;aol:q;mama:query;seznam:q;search:q;wp:szukaj;onet:qt;szukacz:q;yam:k;pchome:q;kvasir:q;sesam:q;ozu:q;terra:query;mynet:q;ekolay:q;rambler:words";
var e=_1ee.split(";");
this.engines=[];
for(var j=0;j<e.length;j++){
this.engines[j]=e[j].split(":");
}
};
_1ec.prototype.addOrganic=function(_1ef,_1f0,_1f1){
this.engines.splice(_1f1?0:this.engines.length,0,[_1ef,_1f0]);
};
_1ec.prototype.multitouch=function(_1f2,ref,_1f3){
if(_1f2===undefined){
_1f2="";
}
if(ref===undefined){
ref=document.referrer;
}
if(_1f3===undefined){
_1f3=window.location.href;
}
var dom=this.cookie_domain;
if(!this.allow_internal&&dom&&!_1ec.is_empty_ref(ref)&&ref.match("^https?://?(?:[^/]*.)?"+dom+"/")){
return "Internal";
}
var med="";
var src="direct";
if(_1f3.match("[&?]gclid=")){
med="cpc";
src="adwords";
}else{
var _1f4=_1f3.match("[&?]utm_source=([^&#]+)");
if(_1f4==null){
if(ref){
var _1f5=this.isOrganic(ref);
if(_1f5){
med="organic";
src=_1ec.clean_var(_1f5);
}else{
med="referral";
src=_1ec.domain_of(ref);
}
}
}else{
src=_1ec.clean_var(_1f4[1]);
var _1f6=_1f3.match("[&?]utm_medium=([^&#]+)");
if(_1f6){
med=_1ec.clean_var(_1f6[1]);
}
}
}
return this.appendCookie(src+this.fieldsep+med+this.fieldsep+_1f2);
};
_1ec.prototype.multitouch_event=function(tid,rev){
return this.appendCookie("__ORD"+this.fieldsep+tid+this.fieldsep+rev);
};
_1ec.prototype.appendCookie=function(val){
var _1f7=_1ec.split_cookie(document.cookie,this.cookie_name,";");
var now=(new Date()).getTime()*0.001;
var _1f8=(new Date((now+this.cookie_lifetime*24*3600)*1000)).toGMTString();
var _1f9=now-this.cookie_lifetime*24*3600;
if(_1f7.length>0){
var cv=_1f7.split(this.recsep);
while(cv.length>0){
var bits=cv[cv.length-1].split(this.fieldsep);
if(bits[bits.length-1]<_1f9){
cv.pop();
}else{
break;
}
}
_1f7=cv.join(this.recsep);
_1f7=this.recsep+_1f7;
}
_1f7=val+this.fieldsep+Math.floor(now)+_1f7;
var _1fa=_1f7;
while(_1f7.length>this.max_cookie_size){
var cv=_1f7.split(this.recsep);
cv.pop();
_1f7=cv.join(this.recsep);
}
var cook=this.cookie_name+"="+_1ec.encode(_1f7)+"; path=/"+"; expires="+_1f8;
if(this.cookie_domain!=document.domain){
cook+="; domain="+this.cookie_domain;
}
document.cookie=cook;
return _1fa;
};
_1ec.prototype.isOrganic=function(ref){
var dom=_1ec.domain_of(ref);
if(!dom){
return;
}
ref=ref.split("?").join("&");
for(var j=0;j<this.engines.length;j++){
if(_1ec.contains(dom,this.engines[j][0])&&(_1ec.contains(ref,"&"+this.engines[j][1]+"=")||_1ec.contains(ref,"https://"))){
return this.engines[j][0];
}
}
return false;
};
_1ec.clean_var=function(s){
s=s.replace(new RegExp(this.fieldsep+"|"+this.recsep,"g"),"");
if(!s){
s="-";
}
return s;
};
_1ec.contains=function(_1fb,_1fc){
return _1fb.indexOf(_1fc)>-1;
};
_1ec.is_empty_ref=function(ref){
return undefined==ref||"-"==ref||""==ref;
};
_1ec.split_cookie=function(_1fd,name,sep){
var _1fe,end;
if(!sep){
sep="&";
}
_1fe=_1fd.indexOf(name+"=");
if(_1fe==-1){
return "";
}
_1fe+=name.length+1;
end=_1fd.indexOf(sep,_1fe);
if(end==-1){
end=_1fd.length;
}
return _1ec.decode(_1fd.substring(_1fe,end));
};
_1ec.encode=function(s,u){
if(typeof (encodeURIComponent)=="function"){
if(u){
return encodeURI(s);
}else{
return encodeURIComponent(s);
}
}else{
return escape(s);
}
};
_1ec.decode=function(s){
if(typeof (decodeURIComponent)=="function"){
return decodeURIComponent(s);
}else{
return unescape(s);
}
};
_1ec.domain_of=function(ref){
if(!ref){
return "";
}
var _1ff=ref.match(/https?:\/\/([^\/]+)/);
if(_1ff){
return _1ff[1];
}
return "";
};
OWA.setOption("ns","yawa_");
var _200=("https:"==document.location.protocol)?"https://support.youramigo.com/owa/":"http://analytics.youramigo.com/owa/";
OWA.setOption("baseUrl",_200);
if(OWA.util.isBrowserTrackable()&&!window["yawa_processed"]){
window["yawa_processed"]=1;
if(_1!==undefined){
_1();
}
if(typeof yawa_cmds==="undefined"){
var q=new OWA.commandQueue();
}else{
if(OWA.util.is_array(yawa_cmds)){
var q=new OWA.commandQueue();
q.loadCmds(yawa_cmds);
}
}
window["yawa_cmds"]=q;
window["yawa_cmds"].process();
if(window.yawa_multitouch){
if(window._mtt===undefined){
window._mtt=new _1ec({max_cookie_size:1024});
if(window["ya_svc"]){
window._mtt.multitouch("ya");
}else{
window._mtt.multitouch();
}
}
}
}
})(yawa_customer_setup);


