(function(){var h,l=this,ba=function(a){a=a.split(".");for(var b=l,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b},ca=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==
c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},m=function(a){return"array"==ca(a)},da=function(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length},n=function(a){return"string"==typeof a},q=function(a){return"function"==ca(a)},ea=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},fa=function(a,
b,c){return a.call.apply(a.bind,arguments)},ga=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?fa:ga;return r.apply(null,arguments)},ha=function(a,b){var c=Array.prototype.slice.call(arguments,
1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},t=function(a,b){function c(){}c.prototype=b.prototype;a.L=b.prototype;a.prototype=new c;a.Ea=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};var u=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};t(u,Error);u.prototype.name="CustomError";var ia;var ja=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},v=function(a){if(!ka.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(la,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ma,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(na,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(oa,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(pa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(qa,"&#0;"));return a},la=/&/g,ma=/</g,
na=/>/g,oa=/"/g,pa=/'/g,qa=/\x00/g,ka=/[\x00&<>"']/,ra=function(a,b){return a<b?-1:a>b?1:0};var sa=function(a,b){b.unshift(a);u.call(this,ja.apply(null,b));b.shift()};t(sa,u);sa.prototype.name="AssertionError";
var ta=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new sa(""+e,f||[]);},x=function(a,b,c){a||ta("",null,b,Array.prototype.slice.call(arguments,2))},ua=function(a,b){throw new sa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},va=function(a,b,c){m(a)||ta("Expected array but got %s: %s.",[ca(a),a],b,Array.prototype.slice.call(arguments,2))};var wa=Array.prototype,xa=function(a,b){if(n(a))return n(b)&&1==b.length?a.indexOf(b,0):-1;for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ya=function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},za=function(a,b){for(var c=a.length,d=[],e=0,f=n(a)?a.split(""):a,g=0;g<c;g++)if(g in f){var k=f[g];b.call(void 0,k,g,a)&&(d[e++]=k)}return d},Aa=function(a){return wa.concat.apply(wa,arguments)},Ba=function(a){var b=a.length;if(0<b){for(var c=Array(b),
d=0;d<b;d++)c[d]=a[d];return c}return[]};var Ca=function(a,b){for(var c in a)b.call(void 0,a[c],c,a)},Da=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Ea=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Fa=function(a,b){return b in a?a[b]:void 0},Ga="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Ha=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ga.length;f++)c=Ga[f],Object.prototype.hasOwnProperty.call(d,
c)&&(a[c]=d[c])}};var y;t:{var Ia=l.navigator;if(Ia){var Ja=Ia.userAgent;if(Ja){y=Ja;break t}}y=""};var z=-1!=y.indexOf("Opera")||-1!=y.indexOf("OPR"),A=-1!=y.indexOf("Trident")||-1!=y.indexOf("MSIE"),B=-1!=y.indexOf("Gecko")&&-1==y.toLowerCase().indexOf("webkit")&&!(-1!=y.indexOf("Trident")||-1!=y.indexOf("MSIE")),C=-1!=y.toLowerCase().indexOf("webkit"),Ka=function(){var a=l.document;return a?a.documentMode:void 0},La=function(){var a="",b;if(z&&l.opera)return a=l.opera.version,q(a)?a():a;B?b=/rv\:([^\);]+)(\)|;)/:A?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:C&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(y))?
a[1]:"");return A&&(b=Ka(),b>parseFloat(a))?String(b):a}(),Ma={},D=function(a){var b;if(!(b=Ma[a])){b=0;for(var c=String(La).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",p=RegExp("(\\d*)(\\D*)","g"),aa=RegExp("(\\d*)(\\D*)","g");do{var w=p.exec(g)||["","",""],F=aa.exec(k)||["","",""];if(0==w[0].length&&0==F[0].length)break;b=ra(0==w[1].length?0:parseInt(w[1],10),
0==F[1].length?0:parseInt(F[1],10))||ra(0==w[2].length,0==F[2].length)||ra(w[2],F[2])}while(0==b)}b=Ma[a]=0<=b}return b},Na=l.document,Oa=Na&&A?Ka()||("CSS1Compat"==Na.compatMode?parseInt(La,10):5):void 0;var Pa=!A||A&&9<=Oa,Qa=!B&&!A||A&&A&&9<=Oa||B&&D("1.9.1");A&&D("9");var Ta=function(a){return a?new Ra(Sa(a)):ia||(ia=new Ra)},Va=function(a,b){Ca(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in Ua?a.setAttribute(Ua[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},Ua={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",
width:"width"},Xa=function(a,b,c){return Wa(document,arguments)},Wa=function(a,b){var c=b[0],d=b[1];if(!Pa&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',v(d.name),'"');if(d.type){c.push(' type="',v(d.type),'"');var e={};Ha(e,d);delete e.type;d=e}c.push(">");c=c.join("")}c=a.createElement(c);d&&(n(d)?c.className=d:m(d)?c.className=d.join(" "):Va(c,d));2<b.length&&Ya(a,c,b);return c},Ya=function(a,b,c){function d(c){c&&b.appendChild(n(c)?a.createTextNode(c):c)}for(var e=2;e<c.length;e++){var f=
c[e];!da(f)||ea(f)&&0<f.nodeType?d(f):ya(Za(f)?Ba(f):f,d)}},$a=function(a){for(var b;b=a.firstChild;)a.removeChild(b)},Sa=function(a){x(a,"Node cannot be null or undefined.");return 9==a.nodeType?a:a.ownerDocument||a.document},E=function(a){return a.contentDocument||a.contentWindow.document},ab={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},bb={IMG:" ",BR:"\n"},cb=function(a,b,c){if(!(a.nodeName in ab))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in
bb)b.push(bb[a.nodeName]);else for(a=a.firstChild;a;)cb(a,b,c),a=a.nextSibling},Za=function(a){if(a&&"number"==typeof a.length){if(ea(a))return"function"==typeof a.item||"string"==typeof a.item;if(q(a))return"function"==typeof a.item}return!1},Ra=function(a){this.F=a||l.document||document};h=Ra.prototype;h.ma=function(a,b,c){return Wa(this.F,arguments)};h.createElement=function(a){return this.F.createElement(a)};h.createTextNode=function(a){return this.F.createTextNode(String(a))};
h.appendChild=function(a,b){a.appendChild(b)};h.ta=function(a){return Qa&&void 0!=a.children?a.children:za(a.childNodes,function(a){return 1==a.nodeType})};var db=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,fb=function(a){if(eb){eb=!1;var b=l.location;if(b){var c=b.href;if(c&&(c=(c=fb(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw eb=!0,Error();}}return a.match(db)},eb=C,gb=function(a,b,c){if(m(b)){va(b);for(var d=0;d<b.length;d++)gb(a,String(b[d]),c)}else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))};var hb="StopIteration"in l?l.StopIteration:Error("StopIteration"),ib=function(){};ib.prototype.next=function(){throw hb;};ib.prototype.Ba=function(){return this};var G=function(a,b){this.k={};this.g=[];this.P=this.e=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof G?(c=a.r(),d=a.o()):(c=Ea(a),d=Da(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}};G.prototype.o=function(){jb(this);for(var a=[],b=0;b<this.g.length;b++)a.push(this.k[this.g[b]]);return a};G.prototype.r=function(){jb(this);return this.g.concat()};
G.prototype.G=function(a){return H(this.k,a)};G.prototype.remove=function(a){return H(this.k,a)?(delete this.k[a],this.e--,this.P++,this.g.length>2*this.e&&jb(this),!0):!1};var jb=function(a){if(a.e!=a.g.length){for(var b=0,c=0;b<a.g.length;){var d=a.g[b];H(a.k,d)&&(a.g[c++]=d);b++}a.g.length=c}if(a.e!=a.g.length){for(var e={},c=b=0;b<a.g.length;)d=a.g[b],H(e,d)||(a.g[c++]=d,e[d]=1),b++;a.g.length=c}};h=G.prototype;h.get=function(a,b){return H(this.k,a)?this.k[a]:b};
h.set=function(a,b){H(this.k,a)||(this.e++,this.g.push(a),this.P++);this.k[a]=b};h.forEach=function(a,b){for(var c=this.r(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new G(this)};h.Ba=function(a){jb(this);var b=0,c=this.g,d=this.k,e=this.P,f=this,g=new ib;g.next=function(){for(;;){if(e!=f.P)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw hb;var g=c[b++];return a?g:d[g]}};return g};
var H=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var kb=function(a){if("function"==typeof a.o)return a.o();if(n(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Da(a)},lb=function(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||n(a))ya(a,b,void 0);else{var c;if("function"==typeof a.r)c=a.r();else if("function"!=typeof a.o)if(da(a)||n(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=Ea(a);else c=void 0;for(var d=kb(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],
a)}};var ob=function(a,b){try{var c=mb(a);return"Message: "+v(c.message)+'\nUrl: <a href="view-source:'+c.fileName+'" target="_new">'+c.fileName+"</a>\nLine: "+c.lineNumber+"\n\nBrowser stack:\n"+v(c.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+v(nb(b)+"-> ")}catch(d){return"Exception trying to expose exception! You win, we lose. "+d}},mb=function(a){var b=ba("window.location.href");if(n(a))return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c,d,e=!1;
try{c=a.lineNumber||a.Fa||"Not available"}catch(f){c="Not available",e=!0}try{d=a.fileName||a.filename||a.sourceURL||l.$googDebugFname||b}catch(g){d="Not available",e=!0}return!e&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:{message:a.message||"Not available",name:a.name||"UnknownError",lineNumber:c,fileName:d,stack:a.stack||"Not available"}},pb=function(a,b){var c;"string"==typeof a?(c=Error(a),Error.captureStackTrace&&Error.captureStackTrace(c,pb)):c=a;c.stack||(c.stack=nb(pb));if(b){for(var d=
0;c["message"+d];)++d;c["message"+d]=String(b)}return c},nb=function(a){var b;b||(b=qb(a||arguments.callee.caller,[]));return b},qb=function(a,b){var c=[];if(0<=xa(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(rb(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=rb(f))?
f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(qb(a.caller,b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")},rb=function(a){if(sb[a])return sb[a];a=String(a);if(!sb[a]){var b=/function ([^\(]+)/.exec(a);sb[a]=b?b[1]:"[Anonymous]"}return sb[a]},sb={};var vb=function(a){var b=[];tb(new ub,a,b);return b.join("")},ub=function(){this.$=void 0},tb=function(a,b,c){switch(typeof b){case "string":wb(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(m(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],tb(a,a.$?a.$.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,
f)&&(e=b[f],"function"!=typeof e&&(c.push(d),wb(f,c),c.push(":"),tb(a,a.$?a.$.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},xb={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},yb=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,wb=function(a,b){b.push('"',a.replace(yb,function(a){if(a in xb)return xb[a];var b=a.charCodeAt(0),e="\\u";16>b?e+=
"000":256>b?e+="00":4096>b&&(e+="0");return xb[a]=e+b.toString(16)}),'"')};var zb=function(a,b,c,d,e){this.reset(a,b,c,d,e)};zb.prototype.sa=null;zb.prototype.ra=null;var Ab=0;zb.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Ab++;this.J=a;this.za=b;delete this.sa;delete this.ra};zb.prototype.ua=function(a){this.J=a};var I=function(a){this.C=a;this.qa=this.ja=this.J=this.W=null},J=function(a,b){this.name=a;this.value=b};J.prototype.toString=function(){return this.name};var Bb=new J("SEVERE",1E3),Cb=new J("WARNING",900),Db=new J("INFO",800),Eb=new J("CONFIG",700),Fb=new J("FINE",500),Gb=new J("FINER",400);I.prototype.getParent=function(){return this.W};I.prototype.ta=function(){this.ja||(this.ja={});return this.ja};I.prototype.ua=function(a){this.J=a};
var Hb=function(a){if(a.J)return a.J;if(a.W)return Hb(a.W);ua("Root logger has no level set.");return null};I.prototype.log=function(a,b,c){if(a.value>=Hb(this).value)for(q(b)&&(b=b()),a=this.Aa(a,b,c,I.prototype.log),b="log:"+a.za,l.console&&(l.console.timeStamp?l.console.timeStamp(b):l.console.markTimeline&&l.console.markTimeline(b)),l.msWriteProfilerMark&&l.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.qa)for(var e=0,f=void 0;f=c.qa[e];e++)f(d);b=b.getParent()}};
I.prototype.Aa=function(a,b,c,d){var e=new zb(a,String(b),this.C);if(c){var f;f=d||arguments.callee.caller;e.sa=c;f=ob(c,f);e.ra=f}return e};I.prototype.info=function(a,b){this.log(Db,a,b)};var Ib={},Jb=null,Kb=function(a){Jb||(Jb=new I(""),Ib[""]=Jb,Jb.ua(Eb));var b;if(!(b=Ib[a])){b=new I(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Kb(a.substr(0,c));c.ta()[d]=b;b.W=c;Ib[a]=b}return b};var Lb=function(a,b){a&&a.info(b,void 0)},K=function(a,b){a&&a.log(Fb,b,void 0)};var Mb=function(){this.X=this.X;this.Y=this.Y};Mb.prototype.X=!1;Mb.prototype.Z=function(){this.X||(this.X=!0,this.n())};Mb.prototype.n=function(){if(this.Y)for(;this.Y.length;)this.Y.shift()()};var L=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.B=!1;this.oa=!0};L.prototype.n=function(){};L.prototype.Z=function(){};L.prototype.preventDefault=function(){this.defaultPrevented=!0;this.oa=!1};var Nb=function(a){Nb[" "](a);return a};Nb[" "]=function(){};var Ob=function(a,b){try{return Nb(a[b]),!0}catch(c){}return!1};var Pb=!A||A&&9<=Oa,Qb=A&&!D("9");!C||D("528");B&&D("1.9b")||A&&D("8")||z&&D("9.5")||C&&D("528");B&&!D("8")||A&&D("9");var M=function(a,b){L.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.va=this.state=null;a&&this.init(a,b)};t(M,L);
M.prototype.init=function(a,b){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;d?B&&(Ob(d,"nodeName")||(d=null)):"mouseover"==c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=C||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=C||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||
0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.va=a;a.defaultPrevented&&this.preventDefault()};M.prototype.preventDefault=function(){M.L.preventDefault.call(this);var a=this.va;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Qb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};
M.prototype.n=function(){};var Rb="closure_listenable_"+(1E6*Math.random()|0),Sb=function(a){return!(!a||!a[Rb])},Tb=0;var Ub=function(a,b,c,d,e){this.s=a;this.U=null;this.src=b;this.type=c;this.M=!!d;this.O=e;this.key=++Tb;this.v=this.N=!1},Vb=function(a){a.v=!0;a.s=null;a.U=null;a.src=null;a.O=null};var N=function(a){this.src=a;this.f={};this.I=0};N.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.f[f];a||(a=this.f[f]=[],this.I++);var g=Wb(a,b,d,e);-1<g?(b=a[g],c||(b.N=!1)):(b=new Ub(b,this.src,f,!!d,e),b.N=c,a.push(b));return b};N.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.f))return!1;var e=this.f[a];b=Wb(e,b,c,d);return-1<b?(Vb(e[b]),x(null!=e.length),wa.splice.call(e,b,1),0==e.length&&(delete this.f[a],this.I--),!0):!1};
var Xb=function(a,b){var c=b.type;if(!(c in a.f))return!1;var d=a.f[c],e=xa(d,b),f;if(f=0<=e)x(null!=d.length),wa.splice.call(d,e,1);f&&(Vb(b),0==a.f[c].length&&(delete a.f[c],a.I--));return f},Yb=function(a){var b=0,c;for(c in a.f){for(var d=a.f[c],e=0;e<d.length;e++)++b,Vb(d[e]);delete a.f[c];a.I--}};N.prototype.ka=function(a,b,c,d){a=this.f[a.toString()];var e=-1;a&&(e=Wb(a,b,c,d));return-1<e?a[e]:null};
var Wb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.v&&f.s==b&&f.M==!!c&&f.O==d)return e}return-1};var Zb="closure_lm_"+(1E6*Math.random()|0),$b={},ac=0,O=function(a,b,c,d,e){if(m(b))for(var f=0;f<b.length;f++)O(a,b[f],c,d,e);else c=bc(c),Sb(a)?(cc(a),a.h.add(String(b),c,!1,d,e)):dc(a,b,c,!1,d,e)},dc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,k=ec(a);k||(a[Zb]=k=new N(a));c=k.add(b,c,d,e,f);c.U||(d=fc(),c.U=d,d.src=a,d.s=c,a.addEventListener?a.addEventListener(b.toString(),d,g):a.attachEvent(gc(b.toString()),d),ac++)},fc=function(){var a=hc,b=Pb?function(c){return a.call(b.src,
b.s,c)}:function(c){c=a.call(b.src,b.s,c);if(!c)return c};return b},ic=function(a,b,c,d,e){if(m(b))for(var f=0;f<b.length;f++)ic(a,b[f],c,d,e);else c=bc(c),Sb(a)?a.h.add(String(b),c,!0,d,e):dc(a,b,c,!0,d,e)},P=function(a,b,c,d,e){if(m(b))for(var f=0;f<b.length;f++)P(a,b[f],c,d,e);else c=bc(c),Sb(a)?a.h.remove(String(b),c,d,e):a&&(a=ec(a))&&(b=a.ka(b,c,!!d,e))&&jc(b)},jc=function(a){if("number"==typeof a||!a||a.v)return!1;var b=a.src;if(Sb(b))return Xb(b.h,a);var c=a.type,d=a.U;b.removeEventListener?
b.removeEventListener(c,d,a.M):b.detachEvent&&b.detachEvent(gc(c),d);ac--;(c=ec(b))?(Xb(c,a),0==c.I&&(c.src=null,b[Zb]=null)):Vb(a);return!0},gc=function(a){return a in $b?$b[a]:$b[a]="on"+a},lc=function(a,b,c,d){var e=1;if(a=ec(a))if(b=a.f[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.M==c&&!f.v&&(e&=!1!==kc(f,d))}return Boolean(e)},kc=function(a,b){var c=a.s,d=a.O||a.src;a.N&&jc(a);return c.call(d,b)},hc=function(a,b){if(a.v)return!0;if(!Pb){var c=b||ba("window.event"),d=new M(c,
this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){t:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break t}catch(g){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,k=c.length-1;!d.B&&0<=k;k--)d.currentTarget=c[k],e&=lc(c[k],f,!0,d);for(k=0;!d.B&&k<c.length;k++)d.currentTarget=c[k],e&=lc(c[k],f,!1,d)}return e}return kc(a,new M(b,this))},ec=function(a){a=a[Zb];return a instanceof N?a:null},mc="__closure_events_fn_"+(1E9*Math.random()>>>
0),bc=function(a){x(a,"Listener can not be null.");if(q(a))return a;x(a.handleEvent,"An object listener must have handleEvent method.");a[mc]||(a[mc]=function(b){return a.handleEvent(b)});return a[mc]};var Q=function(){Mb.call(this);this.h=new N(this);this.xa=this;this.fa=null};t(Q,Mb);Q.prototype[Rb]=!0;Q.prototype.addEventListener=function(a,b,c,d){O(this,a,b,c,d)};Q.prototype.removeEventListener=function(a,b,c,d){P(this,a,b,c,d)};
Q.prototype.dispatchEvent=function(a){cc(this);var b,c=this.fa;if(c){b=[];for(var d=1;c;c=c.fa)b.push(c),x(1E3>++d,"infinite loop")}c=this.xa;d=a.type||a;if(n(a))a=new L(a,c);else if(a instanceof L)a.target=a.target||c;else{var e=a;a=new L(d,c);Ha(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.B&&0<=g;g--)f=a.currentTarget=b[g],e=nc(f,d,!0,a)&&e;a.B||(f=a.currentTarget=c,e=nc(f,d,!0,a)&&e,a.B||(e=nc(f,d,!1,a)&&e));if(b)for(g=0;!a.B&&g<b.length;g++)f=a.currentTarget=b[g],e=nc(f,d,!1,a)&&e;return e};
Q.prototype.n=function(){Q.L.n.call(this);this.h&&Yb(this.h);this.fa=null};var nc=function(a,b,c,d){b=a.h.f[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.v&&g.M==c){var k=g.s,p=g.O||g.src;g.N&&Xb(a.h,g);e=!1!==k.call(p,d)&&e}}return e&&0!=d.oa};Q.prototype.ka=function(a,b,c,d){return this.h.ka(String(a),b,c,d)};var cc=function(a){x(a.h,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var oc=function(a,b){Q.call(this);this.V=a||1;this.A=b||l;this.ga=r(this.ya,this);this.ha=+new Date};t(oc,Q);h=oc.prototype;h.enabled=!1;h.l=null;h.ya=function(){if(this.enabled){var a=+new Date-this.ha;0<a&&a<.8*this.V?this.l=this.A.setTimeout(this.ga,this.V-a):(this.l&&(this.A.clearTimeout(this.l),this.l=null),this.dispatchEvent("tick"),this.enabled&&(this.l=this.A.setTimeout(this.ga,this.V),this.ha=+new Date))}};
h.start=function(){this.enabled=!0;this.l||(this.l=this.A.setTimeout(this.ga,this.V),this.ha=+new Date)};h.stop=function(){this.enabled=!1;this.l&&(this.A.clearTimeout(this.l),this.l=null)};h.n=function(){oc.L.n.call(this);this.stop();delete this.A};var pc=function(a,b,c){if(q(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:l.setTimeout(a,b||0)};var qc=function(a,b){var c;if(a instanceof qc)this.i=void 0!==b?b:a.i,rc(this,a.w),c=a.T,R(this),this.T=c,c=a.H,R(this),this.H=c,sc(this,a.S),c=a.R,R(this),this.R=c,tc(this,a.m.clone()),c=a.Q,R(this),this.Q=c;else if(a&&(c=fb(String(a)))){this.i=!!b;rc(this,c[1]||"",!0);var d=c[2]||"";R(this);this.T=uc(d);d=c[3]||"";R(this);this.H=uc(d,!0);sc(this,c[4]);d=c[5]||"";R(this);this.R=uc(d,!0);tc(this,c[6]||"",!0);c=c[7]||"";R(this);this.Q=uc(c)}else this.i=!!b,this.m=new S(null,0,this.i)};h=qc.prototype;
h.w="";h.T="";h.H="";h.S=null;h.R="";h.Q="";h.Da=!1;h.i=!1;h.toString=function(){var a=[],b=this.w;b&&a.push(vc(b,wc,!0),":");if(b=this.H){a.push("//");var c=this.T;c&&a.push(vc(c,wc,!0),"@");a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g,"%$1"));b=this.S;null!=b&&a.push(":",String(b))}if(b=this.R)this.H&&"/"!=b.charAt(0)&&a.push("/"),a.push(vc(b,"/"==b.charAt(0)?xc:yc,!0));(b=this.m.toString())&&a.push("?",b);(b=this.Q)&&a.push("#",vc(b,zc));return a.join("")};h.clone=function(){return new qc(this)};
var rc=function(a,b,c){R(a);a.w=c?uc(b,!0):b;a.w&&(a.w=a.w.replace(/:$/,""))},sc=function(a,b){R(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.S=b}else a.S=null},tc=function(a,b,c){R(a);b instanceof S?(a.m=b,a.m.ia(a.i)):(c||(b=vc(b,Ac)),a.m=new S(b,0,a.i))},R=function(a){if(a.Da)throw Error("Tried to modify a read-only Uri");};qc.prototype.ia=function(a){this.i=a;this.m&&this.m.ia(a);return this};
var uc=function(a,b){return a?b?decodeURI(a):decodeURIComponent(a):""},vc=function(a,b,c){return n(a)?(a=encodeURI(a).replace(b,Bc),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},Bc=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},wc=/[#\/\?@]/g,yc=/[\#\?:]/g,xc=/[\#\?]/g,Ac=/[\#\?@]/g,zc=/#/g,S=function(a,b,c){this.j=a||null;this.i=!!c},U=function(a){if(!a.b&&(a.b=new G,a.e=0,a.j))for(var b=a.j.split("&"),c=0;c<b.length;c++){var d=b[c].indexOf("="),e=null,
f=null;0<=d?(e=b[c].substring(0,d),f=b[c].substring(d+1)):e=b[c];e=decodeURIComponent(e.replace(/\+/g," "));e=T(a,e);a.add(e,f?decodeURIComponent(f.replace(/\+/g," ")):"")}};h=S.prototype;h.b=null;h.e=null;h.add=function(a,b){U(this);this.j=null;a=T(this,a);var c=this.b.get(a);c||this.b.set(a,c=[]);c.push(b);this.e++;return this};h.remove=function(a){U(this);a=T(this,a);return this.b.G(a)?(this.j=null,this.e-=this.b.get(a).length,this.b.remove(a)):!1};h.G=function(a){U(this);a=T(this,a);return this.b.G(a)};
h.r=function(){U(this);for(var a=this.b.o(),b=this.b.r(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};h.o=function(a){U(this);var b=[];if(n(a))this.G(a)&&(b=Aa(b,this.b.get(T(this,a))));else{a=this.b.o();for(var c=0;c<a.length;c++)b=Aa(b,a[c])}return b};h.set=function(a,b){U(this);this.j=null;a=T(this,a);this.G(a)&&(this.e-=this.b.get(a).length);this.b.set(a,[b]);this.e++;return this};h.get=function(a,b){var c=a?this.o(a):[];return 0<c.length?String(c[0]):b};
h.toString=function(){if(this.j)return this.j;if(!this.b)return"";for(var a=[],b=this.b.r(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.o(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.j=a.join("&")};h.clone=function(){var a=new S;a.j=this.j;this.b&&(a.b=this.b.clone(),a.e=this.e);return a};var T=function(a,b){var c=String(b);a.i&&(c=c.toLowerCase());return c};
S.prototype.ia=function(a){a&&!this.i&&(U(this),this.j=null,this.b.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),this.remove(d),0<a.length&&(this.j=null,this.b.set(T(this,d),Ba(a)),this.e+=a.length))},this));this.i=a};var V=function(){Q.call(this);this.C="closure_frame"+Cc++;this.ea=[];Dc[this.C]=this},W;t(V,Q);var Dc={},Cc=0,Ec=function(a,b){var c=new V;O(c,"ready",c.Z,!1,c);c.send(a,"POST",!0,b)},Fc=function(a,b){var c=Ta(a);lb(b,function(b,e){var f=c.ma("input",{type:"hidden",name:e,value:b});a.appendChild(f)})};h=V.prototype;h.d=Kb("goog.net.IframeIo");h.a=null;h.c=null;h.q=null;h.wa=0;h.p=!1;h.aa=null;h.da=null;h.u=null;h.D=!1;
h.send=function(a,b,c,d){if(this.p)throw Error("[goog.net.IframeIo] Unable to send, already active.");this.aa=a=new qc(a);b=b?b.toUpperCase():"GET";c&&(R(a),c=Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^+new Date).toString(36),R(a),a.m.set("zx",c));Lb(this.d,"Sending iframe request: "+a+" ["+b+"]");W||(W=Xa("form"),W.acceptCharset="utf-8",c=W.style,c.position="absolute",c.visibility="hidden",c.top=c.left="-10px",c.width=c.height="10px",c.overflow=
"hidden",document.body.appendChild(W));this.a=W;"GET"==b&&Fc(this.a,a.m);d&&Fc(this.a,d);this.a.action=a.toString();this.a.method=b;this.p=!0;K(this.d,"Creating iframe");this.q=this.C+"_"+(this.wa++).toString(36);d={name:this.q,id:this.q};A&&7>La&&(d.src='javascript:""');this.c=Ta(this.a).ma("iframe",d);d=this.c.style;d.visibility="hidden";d.width=d.height="10px";d.display="none";C?d.marginTop=d.marginLeft="-10px":(d.position="absolute",d.top=d.left="-10px");if(A&&!D("11")){this.a.target=this.q||
"";Ta(this.a).F.body.appendChild(this.c);this.D||O(this.c,"readystatechange",this.ca,!1,this);try{this.ba=!1,this.a.submit()}catch(e){this.D||P(this.c,"readystatechange",this.ca,!1,this),X(this,1)}}else{K(this.d,"Setting up iframes and cloning form");Ta(this.a).F.body.appendChild(this.c);d=this.q+"_inner";a=E(this.c);c="<body><iframe id="+d+" name="+d+"></iframe>";document.baseURI&&(c='<head><base href="'+v(document.baseURI)+'"></head>'+c);z?a.documentElement.innerHTML=c:a.write(c);this.D||O(a.getElementById(d),
"load",this.K,!1,this);var f=this.a.getElementsByTagName("textarea");c=0;for(b=f.length;c<b;c++){var g=f[c].value,k=[];cb(f[c],k,!1);if(k.join("")!=g){var k=f[c],p=g;x(null!=k,"goog.dom.setTextContent expects a non-null value for node");if("textContent"in k)k.textContent=p;else if(3==k.nodeType)k.data=p;else if(k.firstChild&&3==k.firstChild.nodeType){for(;k.lastChild!=k.firstChild;)k.removeChild(k.lastChild);k.firstChild.data=p}else{$a(k);var aa=Sa(k);k.appendChild(aa.createTextNode(String(p)))}f[c].value=
g}}f=a.importNode(this.a,!0);f.target=d;f.action=this.a.action;a.body.appendChild(f);g=this.a.getElementsByTagName("select");k=f.getElementsByTagName("select");c=0;for(b=g.length;c<b;c++)for(var p=g[c].getElementsByTagName("option"),aa=k[c].getElementsByTagName("option"),w=0,F=p.length;w<F;w++)aa[w].selected=p[w].selected;g=this.a.getElementsByTagName("input");k=f.getElementsByTagName("input");c=0;for(b=g.length;c<b;c++)if("file"==g[c].type&&g[c].value!=k[c].value){K(this.d,"File input value not cloned properly.  Will submit using original form.");
this.a.target=d;f=this.a;break}K(this.d,"Submitting form");try{this.ba=!1,f.submit(),a.close(),B&&pc(this.la,250,this)}catch(Pc){c=this.d,b="Error when submitting form: "+ob(Pc),c&&c.log(Bb,b,void 0),this.D||P(a.getElementById(d),"load",this.K,!1,this),a.close(),X(this,2)}}Gc(this)};
h.abort=function(){if(this.p){Lb(this.d,"Request aborted");var a=Y(this);x(a);if(a)if(Sb(a))a.h&&Yb(a.h);else if(a=ec(a)){var b=0,c;for(c in a.f)for(var d=a.f[c].concat(),e=0;e<d.length;++e)jc(d[e])&&++b}this.p=!1;this.dispatchEvent("abort");Hc(this)}};h.n=function(){K(this.d,"Disposing iframeIo instance");this.p&&(K(this.d,"Aborting active request"),this.abort());V.L.n.call(this);this.c&&Ic(this);Gc(this);this.a=null;delete this.na;this.aa=this.da=this.a=null;delete Dc[this.C]};
h.ca=function(){if("complete"==this.c.readyState){P(this.c,"readystatechange",this.ca,!1,this);var a;try{if(a=E(this.c),A&&"about:blank"==a.location&&!navigator.onLine){X(this,9);return}}catch(b){X(this,1);return}Jc(this,a)}};h.K=function(){if(!z||"about:blank"!=(this.c?E(Y(this)):null).location){P(Y(this),"load",this.K,!1,this);try{Jc(this,this.c?E(Y(this)):null)}catch(a){X(this,1)}}};
var Jc=function(a,b){K(a.d,"Iframe loaded");a.p=!1;var c;try{var d=b.body;a.da=d.textContent||d.innerText}catch(e){c=1}var f;c||"function"!=typeof a.na||(f=a.na(b))&&(c=4);(d=a.d)&&d.log(Gb,"Last content: "+a.da,void 0);(d=a.d)&&d.log(Gb,"Last uri: "+a.aa,void 0);c?(K(a.d,"Load event occurred but failed"),X(a,c,f)):(K(a.d,"Load succeeded"),a.dispatchEvent("complete"),a.dispatchEvent("success"),Hc(a))},X=function(a,b,c){a.ba||(a.p=!1,4==b&&x(void 0!==c),a.dispatchEvent("complete"),a.dispatchEvent("error"),
Hc(a),a.ba=!0)},Hc=function(a){Lb(a.d,"Ready for new requests");Ic(a);Gc(a);a.a=null;a.dispatchEvent("ready")},Ic=function(a){var b=a.c;b&&(b.onreadystatechange=null,b.onload=null,b.onerror=null,a.ea.push(b));a.u&&(l.clearTimeout(a.u),a.u=null);B||z?a.u=pc(a.pa,2E3,a):a.pa();a.c=null;a.q=null};V.prototype.pa=function(){this.u&&(l.clearTimeout(this.u),this.u=null);for(;0!=this.ea.length;){var a=this.ea.pop();Lb(this.d,"Disposing iframe");a&&a.parentNode&&a.parentNode.removeChild(a)}};
var Gc=function(a){a.a&&a.a==W&&$a(a.a)},Y=function(a){return a.c?A&&!D("11")?a.c:E(a.c).getElementById(a.q+"_inner"):null};V.prototype.la=function(){if(this.p){var a=this.c?E(Y(this)):null;a&&!Ob(a,"documentUri")?(this.D||P(Y(this),"load",this.K,!1,this),navigator.onLine?((a=this.d)&&a.log(Cb,"Silent Firefox error detected",void 0),X(this,3)):((a=this.d)&&a.log(Cb,"Firefox is offline so report offline error instead of silent error",void 0),X(this,9))):pc(this.la,250,this)}};var Kc=0,Lc=Kb("paidtasks.app.error"),Mc=function(a){var b=_402.params.logUrl;a=mb(pb(a));Lc&&Lc.log(Cb,"Logging an error via gen204.",a);var c={},d=-1!==window.location.href.indexOf("204_debug");d&&window.console&&window.console.log&&(window.console.log("Exception caught: ",a),window.console.log("Stack: ",a.stack),c&&window.console.log("extraData",c));if(!/^[\s\xa0]*$/.test(null==b?"":String(b))){try{if(4<=Kc)return;Kc++;var e={};e.e_n=a.name||"Unknown Error";e.e_m=a.message||a;e.e_p=window.location.href;
e.e_s=a.stack||"Stack not available";var f=Fa(window,"_402");if(ea(f)){var g=Fa(f,"params");null!=g&&(e["_402.params"]=vb(g))}Ca(c,function(a,b){ea(a)&&(a=vb(a));e[b]=a});Ec(b,e)}catch(k){if(d)throw k;}if(d)throw a;}};var Nc=[],Z=null,Oc=function(){if(document.readyState)return"interactive"==document.readyState||"complete"==document.readyState;var a=null;try{a=document.documentElement}catch(b){}if(!a)return!1;try{a.doScroll("left")}catch(c){return!1}return!!document.body},Qc=function(){if(Oc()){var a=Z;a&&"function"==typeof a.Z&&a.Z();Z=null;for(a=0;a<Nc.length;a++)Nc[a]();Nc.length=0}},Rc=function(a){var b;!A||D(7)?b=!1:(ic(window,"load",a),b=!0);b||(Oc()?a():(Nc.push(a),null==Z&&(Z=new oc(500),O(Z,"tick",Qc),
Z.start())))};void 0!==l._402||(l._402={});_402.Ca=!1;_402.show=function(){_402.Ca=!0};
var Sc=function(a,b){var c=document.createElement(a);Ca(b,function(a,b){c.setAttribute(b,a)});document.body.appendChild(c)},Tc=function(){try{var a=_402;_402.timingAtrLoad=(new Date).getTime();if(a.site){var b=document;document.getElementById("contain-402")||Sc("div",{id:"contain-402"});var c=a.promptHandlerUrl||"//survey.g.doubleclick.net/prompt",d={t:"a"};d.site=a.site;void 0!==a.sc&&(d.sc=a.sc);null!=a.force_http&&(d.force_http=a.force_http);d.random=+new Date;d.ref=b.referrer.substr(0,500);var a=
[c],e;for(e in d)gb(e,d[e],a);if(a[1]){var f=a[0],g=f.indexOf("#");0<=g&&(a.push(f.substr(g)),a[0]=f=f.substr(0,g));var k=f.indexOf("?");0>k?a[1]="?":k==f.length-1&&(a[1]=void 0)}Sc("script",{src:a.join("")})}}catch(p){Mc(p)}};_402.load=_402.load||ha(Tc);_402.domWait=function(){Rc(function(){_402.load()})};})();
window['_402'] = window['_402'] || {};
window['_402']['site'] = "oonmdtqaytntaeti2rvkuioqxu";
window['_402']['promptHandlerUrl'] = window['_402']['promptHandlerUrl'] || "http://survey.g.doubleclick.net/prompt";
window['_402']['params'] = {"logUrl":"/gen204/d"};
window['_402']['domWait']();