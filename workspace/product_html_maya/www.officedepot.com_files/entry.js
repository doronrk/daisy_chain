// Copyright 2008-2014 Monetate, Inc.
// 2014-10-28T15:28:25Z t1414507153 officedepot_entry.js
(function(){var m=void 0,p=!0,q=null,u=!1,ba=this;function ca(b){for(var b=b.split("."),c=ba,a;b.length&&(a=b.shift());)if(c[a]!=q)c=c[a];else return q;return c}function w(b,c){var a=b.split("."),d=ba;!(a[0]in d)&&d.execScript&&d.execScript("var "+a[0]);for(var e;a.length&&(e=a.shift());)!a.length&&c!==m?d[e]=c:d=d[e]?d[e]:d[e]={}};var x={};
(function(b){(function(b,a){"object"===typeof b.exports?b.module.exports=a():"function"===typeof b.define&&b.define.amd?b.define(a):b.printStackTrace=a()})(b,function(){function b(a){var a=a||{guess:p},d=a.e||q,a=!!a.guess,e=new b.implementation,d=e.run(d);return a?e.guessAnonymousFunctions(d):d}b.implementation=function(){};b.implementation.prototype={run:function(a,b){a=a||this.createException();b=b||this.mode(a);return"other"===b?this.other(arguments.callee):this[b](a)},createException:function(){try{this.undef()}catch(a){return a}},mode:function(a){return a.arguments&&
a.stack?"chrome":a.stack&&a.sourceURL?"safari":a.stack&&a.number?"ie":a.stack&&a.fileName?"firefox":a.message&&a["opera#sourceloc"]?!a.stacktrace||-1<a.message.indexOf("\n")&&a.message.split("\n").length>a.stacktrace.split("\n").length?"opera9":"opera10a":a.message&&a.stack&&a.stacktrace?0>a.stacktrace.indexOf("called from line")?"opera10b":"opera11":a.stack&&!a.fileName?"chrome":"other"},other:function(a){for(var b=/function(?:\s+([\w$]+))?\s*\(/,c=[],f,k,j=Array.prototype.slice;a&&10>c.length;){f=
(f=b.exec(a.toString()))?f[1]||"{anonymous}":"{anonymous}";try{k=j.call(a.arguments||[])}catch(n){k=["Cannot access arguments: "+n]}c[c.length]=f+"("+this.stringifyArguments(k)+")";try{a=a.caller}catch(t){c[c.length]="Cannot access caller: "+t;break}}return c},stringifyArguments:function(a){for(var b=[],c=Array.prototype.slice,f=0;f<a.length;++f){var k=a[f];k===m?b[f]="undefined":k===q?b[f]="null":k.constructor&&(b[f]=k.constructor===Array?3>k.length?"["+this.stringifyArguments(k)+"]":"["+this.stringifyArguments(c.call(k,
0,1))+"..."+this.stringifyArguments(c.call(k,-1))+"]":k.constructor===Object?"#object":k.constructor===Function?"#function":k.constructor===String?'"'+k+'"':k.constructor===Number?k:"?")}return b.join(",")},sourceCache:{},ajax:function(a){var b=this.createXMLHTTPObject();if(b)try{return b.open("GET",a,u),b.send(q),b.responseText}catch(c){}return""},createXMLHTTPObject:function(){for(var a,b=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},
function(){return new ActiveXObject("Microsoft.XMLHTTP")}],c=0;c<b.length;c++)try{return a=b[c](),this.createXMLHTTPObject=b[c],a}catch(f){}return{}},isSameDomain:function(a){return"undefined"!==typeof location&&-1!==a.indexOf(location.hostname)},getSource:function(a){a in this.sourceCache||(this.sourceCache[a]=this.ajax(a).split("\n"));return this.sourceCache[a]},guessAnonymousFunctions:function(a){for(var b=0;b<a.length;++b){var c=/^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,f=a[b],k=/\{anonymous\}\(.*\)@(.*)/.exec(f);
if(k){var j=c.exec(k[1]);j&&(c=j[1],k=j[2],j=j[3]||0,c&&this.isSameDomain(c)&&k&&(c=this.guessAnonymousFunction(c,k,j),a[b]=f.replace("{anonymous}",c)))}}return a},guessAnonymousFunction:function(a,b){var c;try{c=this.findFunctionName(this.getSource(a),b)}catch(f){c="getSource failed with url: "+a+", exception: "+f.toString()}return c},findFunctionName:function(a,b){for(var c=/function\s+([^(]*?)\s*\(([^)]*)\)/,f=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,k=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,
j="",n,t=Math.min(b,20),r,z=0;z<t;++z)if(n=a[b-z-1],r=n.indexOf("//"),0<=r&&(n=n.substr(0,r)),n){j=n+j;if((n=f.exec(j))&&n[1]||(n=c.exec(j))&&n[1])return n[1];if((n=k.exec(j))&&n[1])return n[1]}return"(?)"}};return b})})(x);x.trace=function(b){return x.printStackTrace(b).join("\n")};var y="0",A="officedepot.com",y=y+"",A=A+"";var da={"~":p,"!":p,"*":p,"(":p,")":p,"-":p,_:p,".":p,",":p,":":p,"@":p,$:p,"'":p,"/":p};function ea(b){if(/^[A-Za-z0-9_\-]*$/.test(b))return b;b=b.replace(/([^A-Za-z0-9_\-])/g,function(b,a){return da[a]?a:encodeURIComponent(a)});return b.replace(/%20/g,"+")};function D(b){for(var c=(document.cookie||"").split(/\s*;\s*/),a=0,d=c.length;a<d;a++){var e=c[a],f=e.indexOf("=");if(-1!=f&&b===e.substring(0,f))return unescape(e.substring(f+1))}return q}function E(b,c,a){var d=A;document.cookie=b+"="+ea(c)+"; "+(d&&d.length?"domain="+d+"; ":"")+"path=/; "+(a?"expires="+(new Date((new Date).getTime()+a)).toGMTString()+"; ":"")}
function fa(){var b=D("mt.v");if(!b||!(64>b.length))b="2."+Math.floor(2147483647*Math.random())+"."+(new Date).getTime(),E("mt.v",b,15768E7);return b};function ga(){return"https:"==document.location.protocol?"https://sb.monetate.net":"http://b.monetate.net"};var F=[];function G(b,c){var a=H(b,c);w("monetate."+b,a);return a}function H(b,c){var a=ca("monetate."+b)||c;"undefined"==typeof a&&(a={});return a};var ha=G("rp",[]);w("monetate.rph",function(b,c){ha.push({data:b,callback:c})});function ia(b){var c=H("rph");c&&c(b,m)}function ja(b,c){b.e=b.e||[];var a;a:{a=b.e;for(var d=a.length,e=0;e<d;++e)if(a[e]===c){a=p;break a}a=u}a||b.e.push(c)};function ka(b){var c=document.createElement("script");c.type="text/javascript";c.src=b;return c}function la(b){var c=document.getElementsByTagName("script")[0],b=ka(b);b.async=p;c.parentNode.insertBefore(b,c);return b};var K=G("p",{c:u,keys:{},ops:[],admits:{}});
function ma(){var b=na;return function(){var c=H("preview",-1),a=L("preview","mt.ps");if(-1!=c&&a=="cp"+c.cp)a:{c=c.name;for(a=0;a<K.ops.length;a++){var d=K.ops[a];if("mt.ps"==d.cookie&&d.label==c)break a}K.ops.push({cookie:"mt.ps",label:c})}else if(a&&-1==c&&(c=/^([a-z]{1,3})([0-9A-Z]{32})$/.exec(a))&&3==c.length)if(c=ga()+("/js/2/a-f33daf4b/p/officedepot.com/entry.js?"+c[1]+"="+c[2]),!K.admits["/js/2/a-f33daf4b/p/officedepot.com/entry.js"]){for(a=0;a<F.length;a++){for(var d=F[a].split("."),e=m,f=window,
e=0;e<d.length-1;e++)f=f[d[e]];delete f[d[e]]}F.length=0;a=c;document.getElementsByTagName("script");a=ka(a);a.setAttribute("id","monetate-block");d=document.createElement("div");d.appendChild(a);document.write(d.innerHTML);document.getElementById("monetate-block")?a.removeAttribute("id"):a=m;if(a||la(c)){K.admits["/js/2/a-f33daf4b/p/officedepot.com/entry.js"]=p;return}}b.apply(this,arguments)}}
function L(b,c){if(!K.c){var a=window.location,d=a.hash;K.c=p;if(d&&"#monetate-"==d.substr(0,10)){for(var d=d.slice(10).split(","),e=0;e<d.length;e++){var f=d[e].split("=");K.keys[f[0]]=f[1]||"1"}"pushState"in window.history&&window.history.pushState("",document.title,a.protocol+"//"+a.hostname+a.pathname+a.search)}}b in K.keys&&E(c,K.keys[b]);return D(c)};var M=q;function N(){if(M===q&&(M=!!L("diagnostics","mt.diagnostics")))Q("a","a-f33daf4b/p/officedepot.com"),Q("ts","f.monetate.net");return M}var oa=G("dq",[]);function Q(b,c){N()&&oa.push({type:b,obj:c})}function pa(b,c,a,d,e){Q(a?"h":"hi",{name:d||b,timeout:4E3,css:c,selector:d,actionId:e})};var R=0;function ra(b){if(3>R){R+=1;!b.msg&&b.entry&&(b.msg=b.entry);Q("e",b);var c={};ja(c,"xx");c.xx=c.xx||[];c.xx.push(b);ia(c)}}function S(b,c){return function(){try{return c.apply(this,arguments)}catch(a){try{ra({entry:b,xname:a.name,xmsg:a.message,msg:b})}catch(d){}}}};function sa(){return function(){function b(h,a,b){for(var c,l=[],g="",a=a.nodeType?[a]:a;c=o.match.PSEUDO.exec(h);)g+=c[0],h=h.replace(o.match.PSEUDO,"");h=o.relative[h]?h+"*":h;c=0;for(var e=a.length;c<e;c++)d(h,a[c],l,b);return d.filter(g,l)}function c(h,a){h=Array.prototype.slice.call(h,0);return a?(a.push.apply(a,h),a):h}function a(h,a){return"\\"+(a-0+1)}function d(h,a,v,B){var v=v||[],l=a=a||document;if(1!==a.nodeType&&9!==a.nodeType)return[];if(!h||"string"!==typeof h)return v;var g,e,i,f,
j,n=p,r=d.isXML(a),s=[],qa=h;do if(k.exec(""),g=k.exec(qa))if(qa=g[3],s.push(g[1]),g[2]){f=g[3];break}while(g);if(1<s.length&&Ca.exec(h))if(2===s.length&&o.relative[s[0]])e=b(s[0]+s[1],a,B);else for(e=o.relative[s[0]]?[a]:d(s.shift(),a);s.length;)h=s.shift(),o.relative[h]&&(h+=s.shift()),e=b(h,e,B);else if(!B&&1<s.length&&9===a.nodeType&&!r&&o.match.ID.test(s[0])&&!o.match.ID.test(s[s.length-1])&&(g=d.find(s.shift(),a,r),a=g.expr?d.filter(g.expr,g.set)[0]:g.set[0]),a){g=B?{expr:s.pop(),set:c(B)}:
d.find(s.pop(),1===s.length&&("~"===s[0]||"+"===s[0])&&a.parentNode?a.parentNode:a,r);e=g.expr?d.filter(g.expr,g.set):g.set;for(0<s.length?i=c(e):n=u;s.length;)g=j=s.pop(),o.relative[j]?g=s.pop():j="",g==q&&(g=a),o.relative[j](i,g,r)}else i=[];i||(i=e);i||d.error(j||h);if("[object Array]"===t.call(i))if(n)if(a&&1===a.nodeType)for(h=0;i[h]!=q;h++)i[h]&&(i[h]===p||1===i[h].nodeType&&d.contains(a,i[h]))&&v.push(e[h]);else for(h=0;i[h]!=q;h++)i[h]&&1===i[h].nodeType&&v.push(e[h]);else v.push.apply(v,
i);else c(i,v);f&&(d(f,l,v,B),d.uniqueSort(v));return v}function e(h,a,b,c,d,g){for(var d=0,e=c.length;d<e;d++){var i=c[d];if(i){for(var f=u,i=i[h];i;){if(i[j]===b){f=c[i.sizset];break}1===i.nodeType&&!g&&(i[j]=b,i.sizset=d);if(i.nodeName.toLowerCase()===a){f=i;break}i=i[h]}c[d]=f}}}function f(h,a,b,c,l,g){for(var l=0,e=c.length;l<e;l++){var i=c[l];if(i){for(var f=u,i=i[h];i;){if(i[j]===b){f=c[i.sizset];break}if(1===i.nodeType)if(g||(i[j]=b,i.sizset=l),"string"!==typeof a){if(i===a){f=p;break}}else if(0<
d.filter(a,[i]).length){f=i;break}i=i[h]}c[l]=f}}}var k=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,j="sizcache"+(Math.random()+"").replace(".",""),n=0,t=Object.prototype.toString,r=u,z=p,C=/\\/g,Da=/\r\n/g,O=/\W/;[0,0].sort(function(){z=u;return 0});d.uniqueSort=function(h){if(P&&(r=z,h.sort(P),r))for(var a=1;a<h.length;a++)h[a]===h[a-1]&&h.splice(a--,1)};d.matches=function(h,a){return d(h,q,q,a)};d.matchesSelector=
function(h,a){return 0<d(a,q,q,[h]).length};d.find=function(h,a,b){var c,d,g,e,i,f;if(!h)return[];d=0;for(g=o.order.length;d<g;d++)if(i=o.order[d],e=o.leftMatch[i].exec(h))if(f=e[1],e.splice(1,1),"\\"!==f.substr(f.length-1)&&(e[1]=(e[1]||"").replace(C,""),c=o.find[i](e,a,b),c!=q)){h=h.replace(o.match[i],"");break}c||(c="undefined"!==typeof a.getElementsByTagName?a.getElementsByTagName("*"):[]);return{set:c,expr:h}};d.filter=function(h,a,b,c){for(var l,g,e,i,f,j,k,n,s=h,t=[],r=a,z=a&&a[0]&&d.isXML(a[0]);h&&
a.length;){for(e in o.filter)if((l=o.leftMatch[e].exec(h))!=q&&l[2])if(j=o.filter[e],f=l[1],g=u,l.splice(1,1),"\\"!==f.substr(f.length-1)){r===t&&(t=[]);if(o.preFilter[e])if(l=o.preFilter[e](l,r,b,t,c,z)){if(l===p)continue}else g=i=p;if(l)for(k=0;(f=r[k])!=q;k++)f&&(i=j(f,l,k,r),n=c^i,b&&i!=q?n?g=p:r[k]=u:n&&(t.push(f),g=p));if(i!==m){b||(r=t);h=h.replace(o.match[e],"");if(!g)return[];break}}if(h===s)if(g==q)d.error(h);else break;s=h}return r};d.error=function(h){throw Error("Syntax error, unrecognized expression: "+
h);};var aa=d.getText=function(h){var a,b;a=h.nodeType;var c="";if(a)if(1===a||9===a){if("string"===typeof h.textContent)return h.textContent;if("string"===typeof h.innerText)return h.innerText.replace(Da,"");for(h=h.firstChild;h;h=h.nextSibling)c+=aa(h)}else{if(3===a||4===a)return h.nodeValue}else for(a=0;b=h[a];a++)8!==b.nodeType&&(c+=aa(b));return c},o=d.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},
type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c="string"===typeof b,e=c&&!O.test(b),c=c&&!e;e&&(b=b.toLowerCase());for(var e=0,l=a.length,g;e<l;e++)if(g=a[e]){for(;(g=g.previousSibling)&&1!==g.nodeType;);a[e]=c||g&&g.nodeName.toLowerCase()===b?g||u:g===b}c&&d.filter(b,a,p)},">":function(a,b){var c,e="string"===typeof b,l=0,g=a.length;if(e&&!O.test(b))for(b=b.toLowerCase();l<g;l++){if(c=a[l])c=c.parentNode,a[l]=c.nodeName.toLowerCase()===b?c:u}else{for(;l<g;l++)(c=
a[l])&&(a[l]=e?c.parentNode:c.parentNode===b);e&&d.filter(b,a,p)}},"":function(a,b,c){var d,l=n++,g=f;"string"===typeof b&&!O.test(b)&&(d=b=b.toLowerCase(),g=e);g("parentNode",b,l,a,d,c)},"~":function(a,b,c){var d,l=n++,g=f;"string"===typeof b&&!O.test(b)&&(d=b=b.toLowerCase(),g=e);g("previousSibling",b,l,a,d,c)}},find:{ID:function(a,b,c){if("undefined"!==typeof b.getElementById&&!c)return(a=b.getElementById(a[1]))&&a.parentNode?[a]:[]},NAME:function(a,b){if("undefined"!==typeof b.getElementsByName){for(var c=
[],d=b.getElementsByName(a[1]),e=0,g=d.length;e<g;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return 0===c.length?q:c}},TAG:function(a,b){if("undefined"!==typeof b.getElementsByTagName)return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,g){a=" "+a[1].replace(C,"")+" ";if(g)return a;for(var g=0,f;(f=b[g])!=q;g++)f&&(e^(f.className&&0<=(" "+f.className+" ").replace(/[\t\n\r]/g," ").indexOf(a))?c||d.push(f):c&&(b[g]=u));return u},ID:function(a){return a[1].replace(C,"")},
TAG:function(a){return a[1].replace(C,"").toLowerCase()},CHILD:function(a){if("nth"===a[1]){a[2]||d.error(a[0]);a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even"===a[2]&&"2n"||"odd"===a[2]&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0;a[3]=b[3]-0}else a[2]&&d.error(a[0]);a[0]=n++;return a},ATTR:function(a,b,c,d,e,g){b=a[1]=a[1].replace(C,"");!g&&o.attrMap[b]&&(a[1]=o.attrMap[b]);a[4]=(a[4]||a[5]||"").replace(C,"");"~="===a[2]&&(a[4]=" "+a[4]+" ");
return a},PSEUDO:function(a,b,c,e,l){if("not"===a[1])if(1<(k.exec(a[3])||"").length||/^\w/.test(a[3]))a[3]=d(a[3],q,q,b);else return a=d.filter(a[3],b,c,1^l),c||e.push.apply(e,a),u;else if(o.match.POS.test(a[0])||o.match.CHILD.test(a[0]))return p;return a},POS:function(a){a.unshift(p);return a}},filters:{enabled:function(a){return a.disabled===u&&"hidden"!==a.type},disabled:function(a){return a.disabled===p},checked:function(a){return a.checked===p},selected:function(a){return a.selected===p},parent:function(a){return!!a.firstChild},
empty:function(a){return!a.firstChild},has:function(a,b,c){return!!d(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return"input"===a.nodeName.toLowerCase()&&"text"===c&&(b===c||b===q)},radio:function(a){return"input"===a.nodeName.toLowerCase()&&"radio"===a.type},checkbox:function(a){return"input"===a.nodeName.toLowerCase()&&"checkbox"===a.type},file:function(a){return"input"===a.nodeName.toLowerCase()&&"file"===a.type},password:function(a){return"input"===
a.nodeName.toLowerCase()&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return("input"===b||"button"===b)&&"submit"===a.type},image:function(a){return"input"===a.nodeName.toLowerCase()&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return("input"===b||"button"===b)&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},
focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return 0===b},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return 0===b%2},odd:function(a,b){return 1===b%2},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,e){var l=b[1],g=o.filters[l];if(g)return g(a,c,b,e);if("contains"===l)return 0<=(a.textContent||a.innerText||
aa([a])||"").indexOf(b[3]);if("not"===l){b=b[3];c=0;for(e=b.length;c<e;c++)if(b[c]===a)return u;return p}d.error(l)},CHILD:function(a,b){var c,d,e,g,f,i;c=b[1];i=a;switch(c){case "only":case "first":for(;i=i.previousSibling;)if(1===i.nodeType)return u;if("first"===c)return p;i=a;case "last":for(;i=i.nextSibling;)if(1===i.nodeType)return u;return p;case "nth":c=b[2];d=b[3];if(1===c&&0===d)return p;e=b[0];if((g=a.parentNode)&&(g[j]!==e||!a.nodeIndex)){f=0;for(i=g.firstChild;i;i=i.nextSibling)1===i.nodeType&&
(i.nodeIndex=++f);g[j]=e}i=a.nodeIndex-d;return 0===c?0===i:0===i%c&&0<=i/c}},ID:function(a,b){return 1===a.nodeType&&a.getAttribute("id")===b},TAG:function(a,b){return"*"===b&&1===a.nodeType||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return-1<(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)},ATTR:function(a,b){var c=b[1],c=d.attr?d.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=q?a[c]:a.getAttribute(c),e=c+"",l=b[2],g=b[4];return c==q?"!="===l:!l&&d.attr?c!=q:
"="===l?e===g:"*="===l?0<=e.indexOf(g):"~="===l?0<=(" "+e+" ").indexOf(g):!g?e&&c!==u:"!="===l?e!==g:"^="===l?0===e.indexOf(g):"$="===l?e.substr(e.length-g.length)===g:"|="===l?e===g||e.substr(0,g.length+1)===g+"-":u},POS:function(a,b,c,d){var e=o.setFilters[b[2]];if(e)return e(a,c,b,d)}}},Ca=o.match.POS,I;for(I in o.match)o.match[I]=RegExp(o.match[I].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[I]=RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[I].source.replace(/\\(\d+)/g,a));try{Array.prototype.slice.call(document.documentElement.childNodes,
0)}catch(Qa){c=function(a,b){var c=0,d=b||[];if("[object Array]"===t.call(a))Array.prototype.push.apply(d,a);else if("number"===typeof a.length)for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var P,J;document.documentElement&&document.documentElement.compareDocumentPosition?P=function(a,b){return a===b?(r=p,0):!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition?-1:1:a.compareDocumentPosition(b)&4?-1:1}:(P=function(a,b){if(a===b)return r=
p,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],g=[];c=a.parentNode;d=b.parentNode;var f=c;if(c===d)return J(a,b);if(c){if(!d)return 1}else return-1;for(;f;)e.unshift(f),f=f.parentNode;for(f=d;f;)g.unshift(f),f=f.parentNode;c=e.length;d=g.length;for(f=0;f<c&&f<d;f++)if(e[f]!==g[f])return J(e[f],g[f]);return f===c?J(a,g[f],-1):J(e[f],b,1)},J=function(a,b,c){if(a===b)return c;for(a=a.nextSibling;a;){if(a===b)return-1;a=a.nextSibling}return 1});(function(){var a=document.createElement("div"),
b="script"+(new Date).getTime(),c=document.documentElement;c&&(a.innerHTML="<a name='"+b+"'/>",c.insertBefore(a,c.firstChild),document.getElementById(b)&&(o.find.ID=function(a,b,c){if("undefined"!==typeof b.getElementById&&!c)return(b=b.getElementById(a[1]))?b.id===a[1]||"undefined"!==typeof b.getAttributeNode&&b.getAttributeNode("id").nodeValue===a[1]?[b]:m:[]},o.filter.ID=function(a,b){var c="undefined"!==typeof a.getAttributeNode&&a.getAttributeNode("id");return 1===a.nodeType&&c&&c.nodeValue===
b}),c.removeChild(a),c=a=q)})();(function(){var a=document.createElement("div");a.appendChild(document.createComment(""));0<a.getElementsByTagName("*").length&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if("*"===a[1]){for(var d=[],e=0;c[e];e++)1===c[e].nodeType&&d.push(c[e]);c=d}return c});a.innerHTML="<a href='#'></a>";a.firstChild&&"undefined"!==typeof a.firstChild.getAttribute&&"#"!==a.firstChild.getAttribute("href")&&(o.attrHandle.href=function(a){return a.getAttribute("href",
2)});a=q})();document.querySelectorAll&&function(){var a=d,b=document.createElement("div");b.innerHTML="<p class='TEST'></p>";if(!(b.querySelectorAll&&0===b.querySelectorAll(".TEST").length)){d=function(b,e,f,j){e=e||document;if(!j&&!d.isXML(e)){var i=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(i&&(1===e.nodeType||9===e.nodeType)){if(i[1])return c(e.getElementsByTagName(b),f);if(i[2]&&o.find.CLASS&&e.getElementsByClassName)try{return c(e.getElementsByClassName(i[2]),f)}catch(k){return c([],f)}}if(9===
e.nodeType){if("body"===b&&e.body)return c([e.body],f);if(i&&i[3]){var n=e.getElementById(i[3]);if(n&&n.parentNode){if(n.id===i[3])return c([n],f)}else return c([],f)}try{return c(e.querySelectorAll(b),f)}catch(t){}}else if(1===e.nodeType&&"object"!==e.nodeName.toLowerCase()){var i=e,r=(n=e.getAttribute("id"))||"__sizzle__",s=e.parentNode,v=/^\s*[+~]/.test(b);n?r=r.replace(/'/g,"\\$&"):e.setAttribute("id",r);v&&s&&(e=e.parentNode);try{if(!v||s)return c(e.querySelectorAll("[id='"+r+"'] "+b),f)}catch(Pa){}finally{n||
i.removeAttribute("id")}}}return a(b,e,f,j)};for(var e in a)d[e]=a[e];b=q}}();(function(){var a=document.documentElement,b=a&&(a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector);if(b){var c=!b.call(document.createElement("div"),"div"),e=u;try{b.call(document.documentElement,"[test!='']:sizzle")}catch(f){e=p}d.matchesSelector=function(a,f){f=f.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!d.isXML(a))try{if(e||!o.match.PSEUDO.test(f)&&!/!=/.test(f)){var h=b.call(a,
f);if(h||!c||a.document&&11!==a.document.nodeType)return h}}catch(j){}return 0<d(f,q,q,[a]).length}}})();(function(){var a=document.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";a.getElementsByClassName&&0!==a.getElementsByClassName("e").length&&(a.lastChild.className="e",1!==a.getElementsByClassName("e").length&&(o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if("undefined"!==typeof b.getElementsByClassName&&!c)return b.getElementsByClassName(a[1])},
a=q))})();d.contains=document.documentElement&&document.documentElement.contains?function(a,b){return a!==b&&(a.contains?a.contains(b):p)}:document.documentElement&&document.documentElement.compareDocumentPosition?function(a,b){return!!(a.compareDocumentPosition(b)&16)}:function(){return u};d.isXML=function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:u};return d}()};var T=q;function ta(){T||ua("sizzle not initialized");T.selectors.filters.hidden=function(b){return 0===b.offsetWidth||0===b.offsetHeight};T.selectors.filters.visible=function(b){return 0<b.offsetWidth&&0<b.offsetHeight}};var U=[],va=0,wa={},xa=q;function ya(){if(10>va){va+=1;var b={},c=U;ja(b,"xt");b.xt=c;ia(b)}U=[]};function V(b){for(var c=[],a=0,d=0;d<b.length;d++){for(var e=b.charCodeAt(d);255<e;)c[a++]=e&255,e>>=8;c[a++]=e}return c};function za(){this.chain_=[];this.buf_=[];this.W_=[];this.pad_=[];this.pad_[0]=128;for(var b=1;64>b;++b)this.pad_[b]=0;this.reset()}za.prototype.reset=function(){this.chain_[0]=1732584193;this.chain_[1]=4023233417;this.chain_[2]=2562383102;this.chain_[3]=271733878;this.chain_[4]=3285377520;this.total_=this.inbuf_=0};function Aa(b,c){return(b<<c|b>>>32-c)&4294967295}
function W(b,c){for(var a=b.W_,d=0;64>d;d+=4)a[d/4]=c[d]<<24|c[d+1]<<16|c[d+2]<<8|c[d+3];for(d=16;80>d;d++)a[d]=Aa(a[d-3]^a[d-8]^a[d-14]^a[d-16],1);for(var e=b.chain_[0],f=b.chain_[1],k=b.chain_[2],j=b.chain_[3],n=b.chain_[4],t,r,d=0;80>d;d++)40>d?20>d?(t=j^f&(k^j),r=1518500249):(t=f^k^j,r=1859775393):60>d?(t=f&k|j&(f|k),r=2400959708):(t=f^k^j,r=3395469782),t=Aa(e,5)+t+n+r+a[d]&4294967295,n=j,j=k,k=Aa(f,30),f=e,e=t;b.chain_[0]=b.chain_[0]+e&4294967295;b.chain_[1]=b.chain_[1]+f&4294967295;b.chain_[2]=
b.chain_[2]+k&4294967295;b.chain_[3]=b.chain_[3]+j&4294967295;b.chain_[4]=b.chain_[4]+n&4294967295}za.prototype.update=function(b,c){c||(c=b.length);var a=0;if(0==this.inbuf_)for(;a+64<c;)W(this,b.slice(a,a+64)),a+=64,this.total_+=64;for(;a<c;)if(this.buf_[this.inbuf_++]=b[a++],this.total_++,64==this.inbuf_){this.inbuf_=0;for(W(this,this.buf_);a+64<c;)W(this,b.slice(a,a+64)),a+=64,this.total_+=64}};function X(b){return b.protocol+"//"+b.hostname+b.pathname}function Ba(b){for(var c=0;c<b.length;c++)if(!Ea(b[c]))return u;return p}
function Ea(b){var c=RegExp(b.value,"i"),a=window.location;switch(b.op){case "path_iregex":if(!c.test(a.pathname))return u;break;case "url_iregex":if(!c.test(X(a)))return u;break;case "full_iregex":if(!c.test(X(a)+a.search))return u;break;case "not_param_iequals":if((b=document.location.search.match(RegExp("(#|\\?|&)"+b.value+"=(.*?)(&|$)","i")))&&b[2]&&unescape(b[2].replace(/\+/g," ")))return u;break;default:return ra({entry:"mask",msg:"mask",xmsg:"Unknown rule: "+b.op}),u}return p};function Y(b,c,a){b._element[c]=a;c="protocol,hostname,host,port,href,pathname,search,hash".split(",");for(a=0;a<c.length;a++){var d=c[a];b[d]=b._element[d]}"/"!=b.pathname.charAt(0)&&(b.pathname="/"+b.pathname)};function ua(b){b instanceof Array&&(b=b.join(""));b=Error(b||"");b.name="mtAssert";throw b;};var Z=G("st",{refs:{},id:0,last:"",defer:u});
function Fa(){var b={},c="",a;for(a in Z.refs)if(Z.refs.hasOwnProperty(a)){var d=Z.refs[a];b[d]||(c+=d+"\n",b[d]=p)}Z.last!=c&&(Z.last=c,(b=document.getElementById("monetatecss"))&&b.parentNode.removeChild(b),c&&(/MSIE [6789]\./.test(navigator.userAgent)&&document.styleSheets&&31<=document.styleSheets.length&&ua("stylesheet limit reached"),T||(T=sa(),ta()),(b=T("head > script",m)[0])||ua("missing <script>[0]"),a=document.createElement("style"),a.setAttribute("type","text/css"),a.styleSheet?a.styleSheet.cssText=
c:a.appendChild(document.createTextNode(c)),a.id="monetatecss",b.parentNode.insertBefore(a,b)))};var $=G("em",{masks:{},count:0,tmark:q});
function Ga(b,c){if(!$.masks[b]){$.count++;var a;if(a=!$.tmark){if(xa===q){if(!(a=N()))a:{if(a=fa())if((a=a.split("."))&&1<a.length)if((a=a[1])&&a.length){a=1>parseInt(a,10)%100;break a}a=u}xa=a}a=xa}a&&(window.monetateT?(a=wa.mask||0,a+=1,wa.mask=a,a={n:"mask",s:a,t:(new Date).getTime()-window.monetateT}):a=q,$.tmark=a);a=c+" { visibility: hidden !important; } \n";var d=Z.id++;a&&(Z.refs[d]=a,Z.defer||Fa());d={extended:u,stylesheetId:d,selector:c,key:b,onRemove:m};$.masks[b]=d;c&&($.masks[c]=d);
a.search(/\s*\{|$/);pa(b,a,p,c,b&&!isNaN(b)?+b:q)}}
function Ha(b){var c=m;if(b.rules&&Ba(b.rules)){c||(c=setTimeout(S("timeout",function(){for(var a in $.masks)if($.masks.hasOwnProperty(a)){var b=$.masks[a];if(b){var c=b.stylesheetId;Z.refs[c]&&(delete Z.refs[c],Z.defer||Fa());if(b.onRemove)b.onRemove();delete $.masks[b.key];delete $.masks[b.selector];$.count--;if($.tmark&&0===$.count&&(b=$.tmark))b.d=(new Date).getTime()-window.monetateT-b.t,Q("m",b),U.push(b),1==U.length&&setTimeout(S("timeout",ya),750)}}}),4E3));for(c=0;c<b.action_ids.length;c++)Ga(b.action_ids[c]+
"",b.selector)}else if(N())for(c=0;c<b.action_ids.length;c++){var a=b.action_ids[c]+"";pa(a,b.selector+" { visibility: hidden !important; } \n",u,b.selector,a&&!isNaN(a)?+a:q)}}function Ia(b){for(var c=0,a=b.length;c<a;++c){var d=b[c];S("masks",function(){Ha(d)})()}};var Ja=RegExp("MSIE\\ (?:[6-9]|10\\.)|Trident/|Version/(?:3\\.[1-2]|[4-8]).*Safari|Firefox/|Chrome|CriOS/|AppleWebKit/.*Mobile/"),Ka=[],La=/Firefox\/(?:1\.0)|Windows CE/;function Ma(){var b=Na();return function(){var c=navigator;"1"==y&&("1"==c.doNotTrack||"yes"==c.doNotTrack||"1"==c.msDoNotTrack)?E("mt.v","",-1):b.apply(this,arguments)}}
function Na(){var b=ma();return function(){var c=navigator.userAgent,a=c,d=Ja.test(a);if(!d)for(var e=0,f=Ka.length;e<f;e++)if(Ka[e].test(a)){d=p;break}d&&!La.test(c)&&b.apply(this,arguments)}};function na(){var b;var c=H("redirect",[]),a=fa();if(D("mt.v")==a&&!D("mt.redirect"))b:{for(var d=0,e=c.length;d<e;++d){for(var f=c[d],k=p,j=b=q,n=c[d].rules,t=0;t<n.length;t++)if(n[t].value&&0===n[t].value.indexOf("COOKIE")){j=n[t].value.split(/\s*,\s*/);b=j[1];j=parseInt(j[2],10);if(isNaN(j)||0>j)j=48E4;break}else if(!Ea(n[t])){k=u;break}if(k){c:{c=f;d=c.a;e=a;f=c.cg;a=new za;a.update(V("testeverything"));a.update(V(""+d));a.update(V(""+e));a.update(V(""+f));d=[];f=8*a.total_;56>a.inbuf_?a.update(a.pad_,
56-a.inbuf_):a.update(a.pad_,64-(a.inbuf_-56));for(e=63;56<=e;e--)a.buf_[e]=f&255,f>>>=8;W(a,a.buf_);for(e=f=0;5>e;e++)for(k=24;0<=k;k-=8)d[f++]=a.chain_[e]>>k&255;for(e=a=0;6>e;++e)a=256*a+d[e];a/=281474976710656;for(d=0;d<c.splits.length;++d)if(e=c.splits[d],a<e.cdf){a=e;c=u;if(b&&a.targets.length&&a.targets[0].value){d=a.targets[0].value;e=!!D(b);E(b,d,j);if(!e&&(c=p,document.location.reload(),b=document.documentElement))b.style.display="none";a.targets=[]}j=a;E("mt.redirect",[j.o,(new Date).getTime(),
window.monetateT].join(";"));if(j.targets.length){b={_element:document.createElement("a")};Y(b,"href",window.location.href);a=m;d:{j=j.targets;for(a=0;a<j.length;a++)switch(d=j[a],e=RegExp(d.key,"i"),d.op){case "path_iregex":d=b.pathname.replace(e,d.value);Y(b,"pathname",d);break;case "url_iregex":d=X(b).replace(e,d.value);Y(b,"href",d);break;case "full_iregex":d=(X(b)+b.search).replace(e,d.value);Y(b,"href",d);break;case "not_param_iequals":Y(b,"search",(b.search?b.search+"&":"?")+(d.key+"="+d.value));
break;default:a=u;break d}a=p}if(a&&(document.location.replace(X(b)+b.search),b=document.documentElement))b.style.display="none"}break c}c=m}b=c;break b}}b=m}b||(c=H("masks",[]),Ia(c),c=H("preview",-1),b=L("preview","mt.ps"),c=-1!=c&&b=="cp"+c.cp?"?cp="+c.cp:"",la((c?ga():"https:"==document.location.protocol?"https://se.monetate.net":"http://e.monetate.net")+("/js/3/a-f33daf4b/p/officedepot.com/t1416945268/91376be45966db87/custom.js"+
c)))}var Oa=S("entry",function(){var b=Ma();return function(){var c=window.location.protocol;("http:"==c||"https:"==c)&&b.apply(this,arguments)}}());ca("monetate.entry")||(F.push("monetate.entry"),w("monetate.entry",Oa));})();
if(this.monetate){monetate.redirect=[];monetate.masks=[{"action_id":473130,"action_ids":[473130,473131,473132,473134],"rules":[{"op":"path_iregex","value":"^http\\:\\/\\/www\\.officedepot\\.com"}],"selector":"body"},{"action_id":548182,"action_ids":[548182],"rules":[{"op":"path_iregex","value":"^\\/"}],"selector":"#bannerWrap > a > img"}];monetate.tgt=[];monetate.bk=false;monetate.preview=null;monetate.ch="f3291ad51e787197";monetate.entry()}