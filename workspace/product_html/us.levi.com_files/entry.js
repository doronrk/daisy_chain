// Copyright 2008-2014 Monetate, Inc.
// 2014-10-17T20:24:01Z t1413563259 entry_masks_only.js
(function(){var h=void 0,j=!0,k=null,l=!1,n=this;function o(a){for(var a=a.split("."),b=n,c;a.length&&(c=a.shift());)if(b[c]!=k)b=b[c];else return k;return b}function p(a,b){var c=a.split("."),e=n;!(c[0]in e)&&e.execScript&&e.execScript("var "+c[0]);for(var d;c.length&&(d=c.shift());)!c.length&&b!==h?e[d]=b:e=e[d]?e[d]:e[d]={}};var q={};
(function(a){(function(a,c){"object"===typeof a.exports?a.module.exports=c():"function"===typeof a.define&&a.define.amd?a.define(c):a.printStackTrace=c()})(a,function(){function a(c){var c=c||{guess:j},e=c.e||k,c=!!c.guess,d=new a.implementation,e=d.run(e);return c?d.guessAnonymousFunctions(e):e}a.implementation=function(){};a.implementation.prototype={run:function(c,a){c=c||this.createException();a=a||this.mode(c);return"other"===a?this.other(arguments.callee):this[a](c)},createException:function(){try{this.undef()}catch(a){return a}},mode:function(a){return a.arguments&&
a.stack?"chrome":a.stack&&a.sourceURL?"safari":a.stack&&a.number?"ie":a.stack&&a.fileName?"firefox":a.message&&a["opera#sourceloc"]?!a.stacktrace||-1<a.message.indexOf("\n")&&a.message.split("\n").length>a.stacktrace.split("\n").length?"opera9":"opera10a":a.message&&a.stack&&a.stacktrace?0>a.stacktrace.indexOf("called from line")?"opera10b":"opera11":a.stack&&!a.fileName?"chrome":"other"},other:function(a){for(var b=/function(?:\s+([\w$]+))?\s*\(/,d=[],f,g,m=Array.prototype.slice;a&&10>d.length;){f=
(f=b.exec(a.toString()))?f[1]||"{anonymous}":"{anonymous}";try{g=m.call(a.arguments||[])}catch(i){g=["Cannot access arguments: "+i]}d[d.length]=f+"("+this.stringifyArguments(g)+")";try{a=a.caller}catch(z){d[d.length]="Cannot access caller: "+z;break}}return d},stringifyArguments:function(a){for(var b=[],d=Array.prototype.slice,f=0;f<a.length;++f){var g=a[f];g===h?b[f]="undefined":g===k?b[f]="null":g.constructor&&(b[f]=g.constructor===Array?3>g.length?"["+this.stringifyArguments(g)+"]":"["+this.stringifyArguments(d.call(g,
0,1))+"..."+this.stringifyArguments(d.call(g,-1))+"]":g.constructor===Object?"#object":g.constructor===Function?"#function":g.constructor===String?'"'+g+'"':g.constructor===Number?g:"?")}return b.join(",")},sourceCache:{},ajax:function(a){var b=this.createXMLHTTPObject();if(b)try{return b.open("GET",a,l),b.send(k),b.responseText}catch(d){}return""},createXMLHTTPObject:function(){for(var a,b=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},
function(){return new ActiveXObject("Microsoft.XMLHTTP")}],d=0;d<b.length;d++)try{return a=b[d](),this.createXMLHTTPObject=b[d],a}catch(f){}return{}},isSameDomain:function(a){return"undefined"!==typeof location&&-1!==a.indexOf(location.hostname)},getSource:function(a){a in this.sourceCache||(this.sourceCache[a]=this.ajax(a).split("\n"));return this.sourceCache[a]},guessAnonymousFunctions:function(a){for(var b=0;b<a.length;++b){var d=/^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,f=a[b],g=/\{anonymous\}\(.*\)@(.*)/.exec(f);
if(g){var m=d.exec(g[1]);m&&(d=m[1],g=m[2],m=m[3]||0,d&&this.isSameDomain(d)&&g&&(d=this.guessAnonymousFunction(d,g,m),a[b]=f.replace("{anonymous}",d)))}}return a},guessAnonymousFunction:function(a,b){var d;try{d=this.findFunctionName(this.getSource(a),b)}catch(f){d="getSource failed with url: "+a+", exception: "+f.toString()}return d},findFunctionName:function(a,b){for(var d=/function\s+([^(]*?)\s*\(([^)]*)\)/,f=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,g=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,
m="",i,z=Math.min(b,20),A,B=0;B<z;++B)if(i=a[b-B-1],A=i.indexOf("//"),0<=A&&(i=i.substr(0,A)),i){m=i+m;if((i=f.exec(m))&&i[1]||(i=d.exec(m))&&i[1])return i[1];if((i=g.exec(m))&&i[1])return i[1]}return"(?)"}};return a})})(q);q.trace=function(a){return q.printStackTrace(a).join("\n")};var r="0",s="levi.com",t="!!!",u="levi.com".split(t),r=r+"",s=s+"",t=t+"";var aa={"~":j,"!":j,"*":j,"(":j,")":j,"-":j,_:j,".":j,",":j,":":j,"@":j,$:j,"'":j,"/":j};function ba(a){if(/^[A-Za-z0-9_\-]*$/.test(a))return a;a=a.replace(/([^A-Za-z0-9_\-])/g,function(a,c){return aa[c]?c:encodeURIComponent(c)});return a.replace(/%20/g,"+")};function v(a){for(var b=(document.cookie||"").split(/\s*;\s*/),c=0,e=b.length;c<e;c++){var d=b[c],f=d.indexOf("=");if(-1!=f&&a===d.substring(0,f))return unescape(d.substring(f+1))}return k}function w(a,b,c){var e=s;document.cookie=a+"="+ba(b)+"; "+(e&&e.length?"domain="+e+"; ":"")+"path=/; "+(c?"expires="+(new Date((new Date).getTime()+c)).toGMTString()+"; ":"")};function x(){return"https:"==document.location.protocol?"https://sb.monetate.net":"http://b.monetate.net"};var y=[];function C(a,b){var c=D(a,b);p("monetate."+a,c);return c}function D(a,b){var c=o("monetate."+a)||b;"undefined"==typeof c&&(c={});return c};var ca=C("rp",[]);p("monetate.rph",function(a,b){ca.push({data:a,callback:b})});function E(a){var b=D("rph");b&&b(a,h)}function F(a,b){a.e=a.e||[];var c;a:{c=a.e;for(var e=c.length,d=0;d<e;++d)if(c[d]===b){c=j;break a}c=l}c||a.e.push(b)};function G(a){var b=document.createElement("script");b.type="text/javascript";b.src=a;return b}function H(a){var b=document.getElementsByTagName("script")[0],a=G(a);a.async=j;b.parentNode.insertBefore(a,b);return a};var I=C("p",{c:l,keys:{},ops:[],admits:{}});
function da(){var a=ea;return function(){var b=D("preview",-1),c=J("preview","mt.ps");if(-1!=b&&c=="cp"+b.cp)a:{b=b.name;for(c=0;c<I.ops.length;c++){var e=I.ops[c];if("mt.ps"==e.cookie&&e.label==b)break a}I.ops.push({cookie:"mt.ps",label:b})}else if(c&&-1==b&&(b=/^([a-z]{1,3})([0-9A-Z]{32})$/.exec(c))&&3==b.length)if(b=x()+("/js/2/a-fb2eee69/p/levi.com/entry.js?"+b[1]+"="+b[2]),!I.admits["/js/2/a-fb2eee69/p/levi.com/entry.js"]){for(c=0;c<y.length;c++){for(var e=y[c].split("."),d=h,f=window,
d=0;d<e.length-1;d++)f=f[e[d]];delete f[e[d]]}y.length=0;c=b;document.getElementsByTagName("script");c=G(c);c.setAttribute("id","monetate-block");e=document.createElement("div");e.appendChild(c);document.write(e.innerHTML);document.getElementById("monetate-block")?c.removeAttribute("id"):c=h;if(c||H(b)){I.admits["/js/2/a-fb2eee69/p/levi.com/entry.js"]=j;return}}a.apply(this,arguments)}}
function J(a,b){if(!I.c){var c=window.location,e=c.hash;I.c=j;if(e&&"#monetate-"==e.substr(0,10)){for(var e=e.slice(10).split(","),d=0;d<e.length;d++){var f=e[d].split("=");I.keys[f[0]]=f[1]||"1"}"pushState"in window.history&&window.history.pushState("",document.title,c.protocol+"//"+c.hostname+c.pathname+c.search)}}a in I.keys&&w(b,I.keys[a]);return v(b)};var K=k;function L(){if(K===k&&(K=!!J("diagnostics","mt.diagnostics")))M("a","a-fb2eee69/p/levi.com"),M("ts","f.monetate.net");return K}var fa=C("dq",[]);function M(a,b){L()&&fa.push({type:a,obj:b})}function N(a,b,c,e,d){M(c?"h":"hi",{name:e||a,timeout:4E3,css:b,selector:e,actionId:d})};var O=0;function P(a){if(3>O){O+=1;!a.msg&&a.entry&&(a.msg=a.entry);M("e",a);var b={};F(b,"xx");b.xx=b.xx||[];b.xx.push(a);E(b)}}function Q(a,b){return function(){try{return b.apply(this,arguments)}catch(c){try{P({entry:a,xname:c.name,xmsg:c.message,msg:a})}catch(e){}}}};var R=[],S=0,T={};function U(a){var b=T[a]||0,b=b+1;return T[a]=b}function V(){return(new Date).getTime()-window.monetateT}function W(a){a&&(a.d=V()-a.t,M("m",a),R.push(a),1==R.length&&setTimeout(Q("timeout",ga),750))}var X=k;function ha(){if(X===k){var a;if(!(a=L()))a:{a=v("mt.v");if(!a||!(64>a.length))a="2."+Math.floor(2147483647*Math.random())+"."+(new Date).getTime(),w("mt.v",a,15768E7);if(a&&(a=a.split("."))&&1<a.length)if((a=a[1])&&a.length){a=1>parseInt(a,10)%100;break a}a=l}X=a}return X}
function ia(){var a=da();return function(){var b=ha()?window.monetateT?{n:"entry",s:U("entry"),t:V()}:k:k;try{return a.apply(window,arguments)}finally{W(b)}}}function ga(){if(10>S){S+=1;var a={},b=R;F(a,"xt");a.xt=b;E(a)}R=[]};function ja(a){for(var b=0;b<a.length;b++)if(!ka(a[b]))return l;return j}
function ka(a){var b=RegExp(a.value,"i"),c=window.location;switch(a.op){case "path_iregex":if(!b.test(c.pathname))return l;break;case "url_iregex":if(!b.test(c.protocol+"//"+c.hostname+c.pathname))return l;break;case "full_iregex":if(!b.test(c.protocol+"//"+c.hostname+c.pathname+c.search))return l;break;case "not_param_iequals":if((a=document.location.search.match(RegExp("(#|\\?|&)"+a.value+"=(.*?)(&|$)","i")))&&a[2]&&unescape(a[2].replace(/\+/g," ")))return l;break;default:return P({entry:"mask",
msg:"mask",xmsg:"Unknown rule: "+a.op}),l}return j};function Y(a){a instanceof Array&&(a=a.join(""));a=Error(a||"");a.name="mtAssert";throw a;};var Z=C("st",{refs:{},id:0,last:"",defer:l});
function la(){var a={},b="",c;for(c in Z.refs)if(Z.refs.hasOwnProperty(c)){var e=Z.refs[c];a[e]||(b+=e+"\n",a[e]=j)}Z.last!=b&&(Z.last=b,(a=document.getElementById("monetatecss"))&&a.parentNode.removeChild(a),b&&(/MSIE [6789]\./.test(navigator.userAgent)&&document.styleSheets&&31<=document.styleSheets.length&&Y("stylesheet limit reached"),(a=document.getElementsByTagName("script")[0])||Y("missing <script>[0]"),c=document.createElement("style"),c.setAttribute("type","text/css"),c.styleSheet?c.styleSheet.cssText=
b:c.appendChild(document.createTextNode(b)),c.id="monetatecss",a.parentNode.insertBefore(c,a)))};var $=C("em",{masks:{},count:0,tmark:k});function ma(a,b){if(!$.masks[a]){$.count++;!$.tmark&&ha()&&($.tmark=window.monetateT?{n:"mask",s:U("mask"),t:V()}:k);var c=b+" { visibility: hidden !important; } \n",e=Z.id++;c&&(Z.refs[e]=c,Z.defer||la());e={extended:l,stylesheetId:e,selector:b,key:a,onRemove:h};$.masks[a]=e;b&&($.masks[b]=e);c.search(/\s*\{|$/);N(a,c,j,b,a&&!isNaN(a)?+a:k)}}
function na(a){var b=h;if(a.rules&&ja(a.rules)){b||(b=setTimeout(Q("timeout",function(){for(var a in $.masks)if($.masks.hasOwnProperty(a)){var b=$.masks[a];if(b){var c=b.stylesheetId;Z.refs[c]&&(delete Z.refs[c],Z.defer||la());if(b.onRemove)b.onRemove();delete $.masks[b.key];delete $.masks[b.selector];$.count--;$.tmark&&0===$.count&&W($.tmark)}}}),4E3));for(b=0;b<a.action_ids.length;b++)ma(a.action_ids[b]+"",a.selector)}else if(L())for(b=0;b<a.action_ids.length;b++){var c=a.action_ids[b]+"";N(c,a.selector+
" { visibility: hidden !important; } \n",l,a.selector,c&&!isNaN(c)?+c:k)}}function oa(a){for(var b=0,c=a.length;b<c;++b){var e=a[b];Q("masks",function(){na(e)})()}};var pa=RegExp("MSIE\\ (?:[6-9]|10\\.)|Trident/|Version/(?:3\\.[1-2]|[4-8]).*Safari|Firefox/|Chrome|CriOS/|AppleWebKit/.*Mobile/"),qa=[],ra=/Firefox\/(?:1\.0)|Windows CE/;function sa(){var a=ta();return function(){var b=navigator;"1"==r&&("1"==b.doNotTrack||"yes"==b.doNotTrack||"1"==b.msDoNotTrack)?w("mt.v","",-1):a.apply(this,arguments)}}
function ta(){var a=ua();return function(){var b=navigator.userAgent,c=b,e=pa.test(c);if(!e)for(var d=0,f=qa.length;d<f;d++)if(qa[d].test(c)){e=j;break}e&&!ra.test(b)&&a.apply(this,arguments)}}function ua(){var a=ia();return function(){var b;a:{b=document.location.host;for(var c=0,e=u.length;c<e;c++){var d=u[c],f;if(!(f=b==d)){f="."+d;var g=b.length-f.length;f=0<=g&&b.indexOf(f,g)==g}if(f){b=d;break a}}b=s}b||Y("Cookie domain is null or undefined");s=b;a.apply(this,arguments)}};var va=l;function ea(){if(va){var a=D("masks",[]);oa(a)}var a=D("preview",-1),b=J("preview","mt.ps"),a=-1!=a&&b=="cp"+a.cp?"?cp="+a.cp:"";H((a?x():"https:"==document.location.protocol?"https://se.monetate.net":"http://e.monetate.net")+("/js/3/a-fb2eee69/p/levi.com/t1415223877/74b6f58c0ca57a8d/custom.js"+a))};var va=j,wa=Q("entry",function(){var a=sa();return function(){var b=window.location.protocol;("http:"==b||"https:"==b)&&a.apply(this,arguments)}}());o("monetate.entry")||(y.push("monetate.entry"),p("monetate.entry",wa));})();
if(this.monetate){monetate.redirect=[];monetate.masks=[{"action_id":424164,"action_ids":[424164],"rules":[{"op":"path_iregex","value":"^\\/storeLocator"}],"selector":"#levi_storeLocator_1"},{"action_id":318993,"action_ids":[318993,470537],"rules":[{"op":"path_iregex","value":"^\\/product\\/index"}],"selector":"p.product_promo"},{"action_id":513086,"action_ids":[513086,513090],"rules":[{"op":"path_iregex","value":"^\\/family\\/index\\.jsp"}],"selector":"#container"},{"action_id":521132,"action_ids":[521132],"rules":[{"op":"path_iregex","value":"^\\/"}],"selector":"#header .main li.featured.Holiday.Gift.Guide a"},{"action_id":510287,"action_ids":[510287,510288,510301,510308],"rules":[{"op":"path_iregex","value":"product\\/index\\.jsp$"}],"selector":"body"},{"action_id":318365,"action_ids":[318365,318857,468278,468756,469324],"rules":[{"op":"path_iregex","value":"^"}],"selector":"#levi_header_1"},{"action_id":498286,"action_ids":[498286,498287,498288,498289,498290,498291,498298],"rules":[{"op":"path_iregex","value":"^checkout"}],"selector":"body"},{"action_id":498283,"action_ids":[498283],"rules":[{"op":"path_iregex","value":"^cart"}],"selector":"body"}];monetate.tgt=[{"args":["document.location.href","contain","SOURCE="],"is_id":false,"op":"targetJSVar","rules":{"op":"","value":""},"targetId":2029},{"args":["document.location.href","contain","CAMP="],"is_id":false,"op":"targetJSVar","rules":{"op":"","value":""},"targetId":2028}];monetate.bk=false;monetate.preview=null;monetate.ch="ea28e8919da5f63a";monetate.entry()}