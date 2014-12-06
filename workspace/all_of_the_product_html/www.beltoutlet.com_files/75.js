// -- Copyright 2006-2013 Monitus LLC, All Rights Reserved.
//window._gaq = window._gaq || [];
var monitus_gaq = [];
if(typeof(window._gaq) == "undefined") {
window._gaq = [];
window._gaq.push = function(){return monitus_gaq.push.apply(monitus_gaq, arguments);};
}
if(typeof(mcor) == "undefined") {
mcor={p:document.location.protocol, _t:{}};

// window name
mcor._wn=function(){window.name=(window.name||"").replace(/([^\|])(bAyNoTe\>\-)/, "$1|$2").replace(/(\-\<EtOnYaB)([^\|])/, "$1|$2").replace(/^(?:([^\|]*?)\|?)?([a-z]\:\d+\:[^\|]+)(?:\|([^\|]*?))?$/, "$2|$1$3");if(self==top)return window.name||"";return "";};

// get URL param
mcor._up=function(n,d){var v=document.location.search.match(new RegExp("(?:\\?|&)"+n+"\\=(.+?)(?:\\&|$)"));return (v?v:d);};
// get root domain for cookies
mcor._cd=function(){var d="";if(location.hostname.match(/stores\.yahoo\.net$/i)){d="stores.yahoo.net";}else if(location.hostname.match(/yahoo\.net$/i)){d="store.yahoo.net";}else if(location.hostname.match(/(search|lib)\.store\.yahoo\.com$/i)){d="store.yahoo.com";}else{d=location.hostname.replace(/(?:^|.+\.)([^\.]+\.[^\.]+)$/i,"$1");}return d;};
// save cookie value for root domain
mcor._scd=function(n,h,p,d,v){if(h=="-"){h=43800;}var e="";if(h=="now"){e=" expires=Fri, 02-Jan-1970 00:00:00 GMT;"}else if(h!="x"){e=new Date((new Date()).getTime()+(h*3600000));e=" expires="+e.toGMTString()+";";}d=((d=="auto")?mcor._cd():d);document.cookie=n+"="+v+";"+e+" path="+p+"; domain="+d;};
mcor._sc=function(n,h,p,v){mcor._scd(n,h,p,mcor._cd(),v);};
monitus_set_cookie=mcor._scd;
// load cookie value
mcor._lc=function(n,d,x){var c=document.cookie;if((c=="")||!n||(n=="")){return d;}var p=n+"=";var s=(""+c).indexOf(p);var i=(""+p).indexOf("=")+1;if(s>=0){var e=(""+c).indexOf(";",s);if(e<0){e=(""+c).length;}d=(""+c).substring((s+i),e);}if(x){mcor._sc(n,"now","/","");}return d;};
// get body node
mcor._b=function(){var b=document.getElementsByTagName("body");if(b&&(b.length>0)){return b[0];}return null;};
// standardized attribute name
mcor._an=function(p){if((p=="class")&&document.all){p="className";}return p;};
// get node attribute
mcor._gatt=function(n,p){return n.getAttribute(mcor._an(p));};
// set node attribute: m = "mode" = <0 (prepend), =0 (replace) or >0 (append)
mcor._satt=function(n,p,v,m){if(p=="innerHTML"){if(m<0){eval("n."+p+"=v+n."+p+";");}else if(m>0){eval("n."+p+"=n."+p+"+v;");}else{eval("n."+p+"=v;");}}else{n.setAttribute(mcor._an(p,v));}};
// node test
mcor._nt=function(n,p,v){if(!n)return false;var pv=mcor._gatt(n,p);if(!pv)return false;var t=v.match(/^\/(.+?)\/(.*?)$/i);if(t){var r=new RegExp(t[1],t[2]);return r.test(pv);}return (pv==v);};

// get node -- "id" is either <id> OR <<tag> <property>=<value>> OR <<tag> <property>=/<regexp>/<modifiers>> ** returns an array of objects
mcor.n=function(i,r){var x=[];if(!r)r=document;var t=i.match(/^<([^\s]+)\s+?([^\=]+?)\=(.+)>$/i);if(!t){t=document.getElementById(i);if(t)x.push(t);}else{var p=t[2];var v=t[3];t=t[1];var l=r.getElementsByTagName(t);if(l){for(var j=0;j<l.length;j++){if(mcor._nt(l[j],p,v))x.push(l[j]);}}}return x;};
// attach event
mcor.ae=function(o,e,f){if(!o){return;}if(o.attachEvent){o.attachEvent("on"+e,function(){f.call(o);});}else if(o.addEventListener){o.addEventListener(e,f,false);}};
// fire event
mcor.e=function(o,e){if(document.createEvent){var eo=document.createEvent("MouseEvents");eo.initEvent(e,true,false);o.dispatchEvent(eo);}else if(document.createEventObject){o.fireEvent("on"+e,document.createEventObject());}};
// add head tag; CSS style added to div first, because setting innerHTML on IE does not work!
//mcor.h=function(g,t,u,c){var d=true;if(window.navigator.userAgent.match(/MSIE\s6\.\d/)){var b=mcor._b();d=(b!=null);}if(!d) setTimeout("mcor.h(\'"+g+"\',\'"+t+"\',"+mcor._p(u)+","+mcor._p(c)+")",10);else{var h=document.getElementsByTagName("head");if(h){h=h[0];if(g=="style"){var o=document.createElement("div");o.innerHTML="&nbsp;<style type=\'text/css\'>"+c+"</style>";o=o.getElementsByTagName("style")[0];}else{var o=document.createElement(g);o.type=t;if(g=="link"){o.rel="stylesheet";if(u)o.href=u;}else if(u){o.src=u;}if(c){o.innerHTML=c;}}h.appendChild(o);}}};
mcor.h=function(g,t,u,c,i){var d=true;var ie=window.navigator.userAgent.match(/MSIE\s(\d)\.\d/);if(ie&&(ie[1]=="6")){var b=mcor._b();d=(b!=null);}if(!d) setTimeout("mcor.h(\'"+g+"\',\'"+t+"\',"+mcor._p(u)+","+mcor._p(c)+","+mcor._p(i)+")",10);else{var h=document.getElementsByTagName("head");if(h){h=h[0];if(g=="style"){var o=document.createElement("style");if(i){o.id=i;}o.type="text/css";h.appendChild(o);if(o.styleSheet){if(o.styleSheet.cssText==""){o.styleSheet.cssText="";}o.styleSheet.cssText+=c;}else{o.appendChild(document.createTextNode(c));}}else{var o=document.createElement(g);if(i){o.id=i;}o.type=t;if(g=="link"){o.rel="stylesheet";if(u)o.href=u;}else if(u){o.src=u;}else if(c){if(ie){o.text=c;}else{o.appendChild(document.createTextNode(c));}}h.appendChild(o);}}}};
// add script tag
mcor.s=function(u,c,i){mcor.h("script","text/javascript",u,c,i);};
// add css tag
mcor.c=function(u,c,i){mcor.h((u ? "link" : "style"),"text/css",u,c,i);};
// get object: ("id")
mcor.o=function(i){var l=mcor.n(i);if(l.length>0)l=l[0];return l;};
// paremetized value
mcor._p=function(v){return ((typeof(v)=="string")?"\'"+v+"\'":v);};
// create auto-show item -- "i" is either <id> OR <<tag>> OR <<tag> class=<className>>
mcor.asi=function(i){var o={"i":i,"p":"#"};var t=i.match(/^\<([^\s]+)(?:\s+(.+)\=(.+))?\>$/i);if(t){o.i=t[1];if(t[2]=="className"){o.i=t[3];o.p=".";}}return o;};
mcor.as=function(i){var i=mcor.asi(i);mcor.c(null,i.p+i.i+"{visibility:hidden !important;}",i.i+"_css");mcor._t[i.i]=setTimeout("mcor.asc(\'"+i.i+"\');",3000);};
mcor.asc=function(i){var i=mcor.asi(i);if(mcor._t[i.i]){clearTimeout(mcor._t[i.i]);mcor._t[i.i]=null;}var o=mcor.o(i.i+"_css");if(o&&o.parentNode){o.parentNode.removeChild(o);}};

// init monitus
mcor._swn=function(n){if((n==mcor.wn)||(n=="")||n.match(/^[a-z]\:\d+\:[^\|]+$/i)){return "";}var t=n.match(/^[a-z]\:\d+\:[^\|]+\|(.*?)$/i);if(t){return t[1];}return n;};
mcor._un=function(){if(window==top){var a=mcor._swn(mcor._wn());window.name=mcor.wn+(((mcor.wn!="")&&(a!=""))?"|":"")+a;}else{try{var a=mcor._swn(top.name);top.name=mcor.wn+(((mcor.wn!="")&&(a!=""))?"|":"")+a;}catch(e){}}};
mcor.wn=mcor._wn().match(/^([a-z]\:\d+\:[^\|]+)\|(.*?)$/);if(mcor.wn){window.name=mcor.wn[2];mcor.wn=mcor.wn[1];}else{mcor.wn=mcor._wn();}mcor.ae(window,"beforeunload",function(){mcor._un();});mcor.ae(window,"unload",function(){mcor._un();});

// auto-run
mcor.ar=function(){var ar=mcor._up("mfn",null);if(!ar||(parseInt(ar[1])>0)){ar="monitus_autorun";}else{ar=ar[1];}if(!ar||(typeof(window[ar])!="function")){setTimeout("mcor.ar();",10);}else{window[ar]();}};mcor.ar();
};if(!document.location.hostname.match(/edit\.store\.yahoo\.(net|com)/)) {
}
