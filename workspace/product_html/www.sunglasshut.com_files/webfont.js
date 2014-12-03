(function(window,document,undefined){function i(a){return function(){return this[a]}}var j;function n(a,b){var c=arguments.length>2?Array.prototype.slice.call(arguments,2):[];return function(){c.push.apply(c,arguments);return b.apply(a,c)}}function o(a,b){this.D=a;this.c=b}o.prototype.createElement=function(a,b,c){a=this.D.createElement(a);if(b){for(var d in b){if(b.hasOwnProperty(d)){if(d=="style"&&this.c.getName()=="MSIE"){a.style.cssText=b[d]}else{a.setAttribute(d,b[d])}}}}c&&a.appendChild(this.D.createTextNode(c));return a};function p(a,b,c){a=a.D.getElementsByTagName(b)[0];if(!a){a=document.documentElement}if(a&&a.lastChild){a.insertBefore(c,a.lastChild);return true}return false}function aa(a,b){function c(){document.body?b():setTimeout(c,0)}c()}function q(a,b){if(b.parentNode){b.parentNode.removeChild(b);return true}return false}function r(a,b){return a.createElement("link",{rel:"stylesheet",href:b})}function s(a,b){return a.createElement("script",{src:b})}function t(a,b,c){a=b.className.split(/\s+/);for(var d=0,e=a.length;d<e;d++){if(a[d]==c){return}}a.push(c);b.className=a.join(" ").replace(/^\s+/,"")}function u(a,b,c){a=b.className.split(/\s+/);for(var d=[],e=0,f=a.length;e<f;e++){a[e]!=c&&d.push(a[e])}b.className=d.join(" ").replace(/^\s+/,"").replace(/\s+$/,"")}function v(a,b,c){a=b.className.split(/\s+/);b=0;for(var d=a.length;b<d;b++){if(a[b]==c){return true}}return false}function x(a,b,c,d,e,f,g,h){this.ta=a;this.Ba=b;this.ea=c;this.da=d;this.ya=e;this.xa=f;this.ca=g;this.Ca=h}j=x.prototype;j.getName=i("ta");j.oa=i("Ba");j.ka=i("ea");j.la=i("da");j.ma=i("ya");j.na=i("xa");j.ja=i("ca");j.t=i("Ca");function y(a,b){this.c=a;this.k=b}var ba=new x("Unknown","Unknown","Unknown","Unknown","Unknown","Unknown",undefined,false);y.prototype.parse=function(){return this.c.indexOf("MSIE")!=-1?ca(this):this.c.indexOf("Opera")!=-1?da(this):this.c.indexOf("AppleWebKit")!=-1?ea(this):this.c.indexOf("Gecko")!=-1?fa(this):ba};function z(a){var b=A(a,a.c,/(iPod|iPad|iPhone|Android)/,1);if(b!=""){return b}a=A(a,a.c,/(Linux|Mac_PowerPC|Macintosh|Windows)/,1);if(a!=""){if(a=="Mac_PowerPC"){a="Macintosh"}return a}return"Unknown"}function B(a){var b=A(a,a.c,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(b){return b}if(b=A(a,a.c,/(iPhone )?OS ([\d_]+)/,2)){return b}if(a=A(a,a.c,/Linux ([i\d]+)/,1)){return a}return"Unknown"}function ca(a){var b=A(a,a.c,/(MSIE [\d\w\.]+)/,1);if(b!=""){var c=b.split(" ");b=c[0];c=c[1];return new x(b,c,b,c,z(a),B(a),C(a,a.k),D(a,c)>=6)}return new x("MSIE","Unknown","MSIE","Unknown",z(a),B(a),C(a,a.k),false)}function da(a){var b="Unknown",c="Unknown",d=A(a,a.c,/(Presto\/[\d\w\.]+)/,1);if(d!=""){c=d.split("/");b=c[0];c=c[1]}else{if(a.c.indexOf("Gecko")!=-1){b="Gecko"}d=A(a,a.c,/rv:([^\)]+)/,1);if(d!=""){c=d}}if(a.c.indexOf("Version/")!=-1){d=A(a,a.c,/Version\/([\d\.]+)/,1);if(d!=""){return new x("Opera",d,b,c,z(a),B(a),C(a,a.k),D(a,d)>=10)}}d=A(a,a.c,/Opera[\/ ]([\d\.]+)/,1);if(d!=""){return new x("Opera",d,b,c,z(a),B(a),C(a,a.k),D(a,d)>=10)}return new x("Opera","Unknown",b,c,z(a),B(a),C(a,a.k),false)}function ea(a){var b=z(a),c=B(a),d=A(a,a.c,/AppleWebKit\/([\d\.\+]+)/,1);if(d==""){d="Unknown"}var e="Unknown";if(a.c.indexOf("Chrome")!=-1){e="Chrome"}else{if(a.c.indexOf("Safari")!=-1){e="Safari"}else{if(a.c.indexOf("AdobeAIR")!=-1){e="AdobeAIR"}}}var f="Unknown";if(a.c.indexOf("Version/")!=-1){f=A(a,a.c,/Version\/([\d\.\w]+)/,1)}else{if(e=="Chrome"){f=A(a,a.c,/Chrome\/([\d\.]+)/,1)}else{if(e=="AdobeAIR"){f=A(a,a.c,/AdobeAIR\/([\d\.]+)/,1)}}}var g=false;if(e=="AdobeAIR"){g=A(a,f,/\d+\.(\d+)/,1);g=D(a,f)>2||D(a,f)==2&&parseInt(g,10)>=5}else{g=A(a,d,/\d+\.(\d+)/,1);g=D(a,d)>=526||D(a,d)>=525&&parseInt(g,10)>=13}return new x(e,f,"AppleWebKit",d,b,c,C(a,a.k),g)}function fa(a){var b="Unknown",c="Unknown",d=false;if(a.c.indexOf("Firefox")!=-1){b="Firefox";var e=A(a,a.c,/Firefox\/([\d\w\.]+)/,1);if(e!=""){d=A(a,e,/\d+\.(\d+)/,1);c=e;d=e!=""&&D(a,e)>=3&&parseInt(d,10)>=5}}else{if(a.c.indexOf("Mozilla")!=-1){b="Mozilla"}}e=A(a,a.c,/rv:([^\)]+)/,1);if(e==""){e="Unknown"}else{if(!d){d=D(a,e);var f=parseInt(A(a,e,/\d+\.(\d+)/,1),10),g=parseInt(A(a,e,/\d+\.\d+\.(\d+)/,1),10);d=d>1||d==1&&f>9||d==1&&f==9&&g>=2||e.match(/1\.9\.1b[123]/)!=null||e.match(/1\.9\.1\.[\d\.]+/)!=null}}return new x(b,c,"Gecko",e,z(a),B(a),C(a,a.k),d)}function D(a,b){a=A(a,b,/(\d+)/,1);if(a!=""){return parseInt(a,10)}return -1}function A(a,b,c,d){if((a=b.match(c))&&a[d]){return a[d]}return""}function C(a,b){if(b.documentMode){return b.documentMode}}function ga(a,b,c,d){this.a=a;this.g=b;this.L=c;this.j=d||ha;this.h=new E("-")}var ha="wf";function F(a){t(a.a,a.g,a.h.f(a.j,"loading"));H(a,"loading")}function I(a){u(a.a,a.g,a.h.f(a.j,"loading"));v(a.a,a.g,a.h.f(a.j,"active"))||t(a.a,a.g,a.h.f(a.j,"inactive"));H(a,"inactive")}function ia(a){u(a.a,a.g,a.h.f(a.j,"loading"));u(a.a,a.g,a.h.f(a.j,"inactive"));t(a.a,a.g,a.h.f(a.j,"active"));H(a,"active")}function H(a,b,c,d){a.L[b]&&a.L[b](c,d)}function ja(){this.V={}}function ka(a,b){var c=[];for(var d in b){if(b.hasOwnProperty(d)){var e=a.V[d];e&&c.push(e(b[d]))}}return c}function J(a,b,c,d,e){this.a=a;this.v=b;this.w=c;this.q=d;this.F=e;this.N=0;this.$=this.U=false}J.prototype.watch=function(a,b,c,d){for(var e=a.length,f=0;f<e;f++){var g=a[f];b[g]||(b[g]=["n4"]);this.N+=b[g].length}if(d){this.U=d}for(f=0;f<e;f++){g=a[f];d=b[g];for(var h=c[g],m=0,k=d.length;m<k;m++){var l=d[m],w=this.v,G=g;t(w.a,w.g,w.h.f(w.j,G,l,"loading"));H(w,"fontloading",G,l);w=n(this,this.ga);G=n(this,this.ha);new K(w,G,this.a,this.w,this.q,this.F,g,l,h)}}};J.prototype.ga=function(a,b){var c=this.v;u(c.a,c.g,c.h.f(c.j,a,b,"loading"));u(c.a,c.g,c.h.f(c.j,a,b,"inactive"));t(c.a,c.g,c.h.f(c.j,a,b,"active"));H(c,"fontactive",a,b);this.$=true;L(this)};J.prototype.ha=function(a,b){var c=this.v;u(c.a,c.g,c.h.f(c.j,a,b,"loading"));v(c.a,c.g,c.h.f(c.j,a,b,"active"))||t(c.a,c.g,c.h.f(c.j,a,b,"inactive"));H(c,"fontinactive",a,b);L(this)};function L(a){if(--a.N==0&&a.U){a.$?ia(a.v):I(a.v)}}function K(a,b,c,d,e,f,g,h,m){this.ba=a;this.pa=b;this.a=c;this.w=d;this.q=e;this.F=f;this.sa=new M;this.s=new N;this.Q=g;this.P=h;this.ia=m||O;this.va=P(this,Q);this.wa=P(this,R);this.Y=S(this,Q);this.Z=S(this,R);this.Aa=f();this.M()}var Q="arial,'URW Gothic L',sans-serif",R="Georgia,'Century Schoolbook L',serif",O="BESs";K.prototype.M=function(){var a=this.w.G(this.Y),b=this.w.G(this.Z);if(this.va!=a||this.wa!=b){la(this,this.ba)}else{this.F()-this.Aa<5000?ma(this):la(this,this.pa)}};function ma(a){a.q(function(b,c){return function(){c.call(b)}}(a,a.M),50)}function la(a,b){q(a.a,a.Y);q(a.a,a.Z);b(a.Q,a.P)}function P(a,b){b=S(a,b,true);var c=a.w.G(b);q(a.a,b);return c}function S(a,b,c){var d=a.s.expand(a.P);b=a.a.createElement("span",{style:"position:absolute;top:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;font-family:"+(c?"":a.sa.quote(a.Q)+",")+b+";"+d},a.ia);p(a.a,"body",b);return b}function T(a,b,c,d,e){this.a=a;this.R=b;this.g=c;this.q=d;this.c=e;this.H=this.I=0}T.prototype.o=function(a,b){this.R.V[a]=b};T.prototype.load=function(a){var b=new ga(this.a,this.g,a);this.c.t()?na(this,b,a):I(b)};T.prototype.qa=function(a,b,c,d){if(d){a.load(n(this,this.ua,b,c))}else{a=--this.I==0;this.H--;if(a){this.H==0?I(b):F(b)}c.watch([],{},{},a)}};T.prototype.ua=function(a,b,c,d,e){var f=--this.I==0;f&&F(a);this.q(n(this,function(g,h,m,k,l){g.watch(h,m||{},k||{},l)},b,c,d,e,f))};function na(a,b,c){c=ka(a.R,c);a.H=a.I=c.length;for(var d=new J(a.a,b,{G:function(h){return h.offsetWidth}},a.q,function(){return(new Date).getTime()}),e=0,f=c.length;e<f;e++){var g=c[e];g.u(a.c,n(a,a.qa,g,b,d))}}function E(a){this.ra=a||oa}var oa="-";E.prototype.f=function(){for(var a=[],b=0;b<arguments.length;b++){a.push(arguments[b].replace(/[\W_]+/g,"").toLowerCase())}return a.join(this.ra)};function M(){this.X="'"}M.prototype.quote=function(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");d.indexOf(" ")==-1?b.push(d):b.push(this.X+d+this.X)}return b.join(",")};function N(){this.B=pa;this.n=qa}var pa=["font-style","font-weight"],qa={"font-style":[["n","normal"],["i","italic"],["o","oblique"]],"font-weight":[["1","100"],["2","200"],["3","300"],["4","400"],["5","500"],["6","600"],["7","700"],["8","800"],["9","900"],["4","normal"],["7","bold"]]};function U(a,b,c){this.S=a;this.za=b;this.n=c}U.prototype.compact=function(a,b){for(var c=0;c<this.n.length;c++){if(b==this.n[c][1]){a[this.S]=this.n[c][0];return}}};U.prototype.expand=function(a,b){for(var c=0;c<this.n.length;c++){if(b==this.n[c][0]){a[this.S]=this.za+":"+this.n[c][1];return}}};N.prototype.compact=function(a){var b=["n","4"];a=a.split(";");for(var c=0,d=a.length;c<d;c++){var e=a[c].replace(/\s+/g,"").split(":");if(e.length==2){var f=e[1];a:{e=e[0];for(var g=0;g<this.B.length;g++){if(e==this.B[g]){e=new U(g,e,this.n[e]);break a}}e=null}e&&e.compact(b,f)}}return b.join("")};N.prototype.expand=function(a){if(a.length!=2){return null}for(var b=[null,null],c=0,d=this.B.length;c<d;c++){var e=this.B[c],f=a.substr(c,1);(new U(c,e,this.n[e])).expand(b,f)}return b[0]&&b[1]?b.join(";")+";":null};window.WebFont=function(){var a=(new y(navigator.userAgent,document)).parse();return new T(new o(document,a),new ja,document.documentElement,function(b,c){setTimeout(b,c)},a)}();window.WebFont.load=window.WebFont.load;window.WebFont.addModule=window.WebFont.o;x.prototype.getName=x.prototype.getName;x.prototype.getVersion=x.prototype.oa;x.prototype.getEngine=x.prototype.ka;x.prototype.getEngineVersion=x.prototype.la;x.prototype.getPlatform=x.prototype.ma;x.prototype.getPlatformVersion=x.prototype.na;x.prototype.getDocumentMode=x.prototype.ja;x.prototype.isSupportingWebFont=x.prototype.t;function V(a,b){this.a=a;this.d=b}var ra={regular:"n4",bold:"n7",italic:"i4",bolditalic:"i7",r:"n4",b:"n7",i:"i4",bi:"i7"};V.prototype.u=function(a,b){return b(a.t())};V.prototype.load=function(a){p(this.a,"head",r(this.a,("https:"==document.location.protocol?"https:":"http:")+"//webfonts.fontslive.com/css/"+this.d.key+".css"));var b;b=this.d.families;var c,d,e;c=[];d={};for(var f=0,g=b.length;f<g;f++){e=void 0;var h=void 0;h=void 0;h=b[f].split(":");e=h[0];h=h[1]?sa(this,h[1]):["n4"];e={O:e,K:h};c.push(e.O);d[e.O]=e.K}b={fa:c,K:d};a(b.fa,b.K)};function sa(a,b){a=b.split(",");b=[];for(var c=0,d=a.length;c<d;c++){var e=a[c];if(e){var f=ra[e];b.push(f?f:e)}}return b}window.WebFont.o("ascender",function(a){var b=(new y(navigator.userAgent,document)).parse();return new V(new o(document,b),a)});function ta(a){this.C=a?a:("https:"==window.location.protocol?"https:":"http:")+ua;this.e=[];this.J=[]}var ua="//fonts.googleapis.com/css";ta.prototype.f=function(){if(this.e.length==0){throw new Error("No fonts to load !")}if(this.C.indexOf("kit=")!=-1){return this.C}for(var a=this.e.length,b=[],c=0;c<a;c++){b.push(this.e[c].replace(/ /g,"+"))}a=this.C+"?family="+b.join("%7C");if(this.J.length>0){a+="&subset="+this.J.join(",")}return a};function va(a){this.e=a;this.W=[];this.aa={};this.A={};this.s=new N}var wa={ultralight:"n2",light:"n3",regular:"n4",bold:"n7",italic:"i4",bolditalic:"i7",ul:"n2",l:"n3",r:"n4",b:"n7",i:"i4",bi:"i7"},xa={latin:O,cyrillic:"&#1081;&#1103;&#1046;",greek:"&#945;&#946;&#931;",khmer:"&#x1780;&#x1781;&#x1782;",Hanuman:"&#x1780;&#x1781;&#x1782;"};va.prototype.parse=function(){for(var a=this.e.length,b=0;b<a;b++){var c=this.e[b].split(":"),d=c[0],e=["n4"];if(c.length>=2){var f=c[1],g=[];if(f){f=f.split(",");for(var h=f.length,m=0;m<h;m++){var k;k=f[m];if(k.match(/^[\w ]+$/)){var l=wa[k];if(l){k=l}else{l=k.match(/^(\d*)(\w*)$/);k=l[1];l=l[2];k=(k=this.s.expand([l?l:"n",k?k.substr(0,1):"4"].join("")))?this.s.compact(k):null}}else{k=""}k&&g.push(k)}}if(g.length>0){e=g}if(c.length==3){c=c[2];g=[];c=c?c.split(","):g;if(c.length>0){if(c=xa[c[0]]){this.A[d]=c}}}}if(!this.A[d]){if(c=xa[d]){this.A[d]=c}}this.W.push(d);this.aa[d]=e}};function W(a,b,c){this.c=a;this.a=b;this.d=c}W.prototype.u=function(a,b){b(a.t())};W.prototype.load=function(a){var b=this.a;this.c.getName()=="MSIE"&&this.d.blocking!=true?aa(b,n(this,this.T,a)):this.T(a)};W.prototype.T=function(a){for(var b=this.a,c=new ta(this.d.api),d=this.d.families,e=d.length,f=0;f<e;f++){var g=d[f].split(":");g.length==3&&c.J.push(g.pop());c.e.push(g.join(":"))}d=new va(d);d.parse();p(b,"head",r(b,c.f()));a(d.W,d.aa,d.A)};window.WebFont.o("google",function(a){var b=(new y(navigator.userAgent,document)).parse();return new W(b,new o(document,b),a)});function X(a,b){this.a=a;this.d=b}X.prototype.load=function(a){for(var b=this.d.urls||[],c=this.d.families||[],d=0,e=b.length;d<e;d++){p(this.a,"head",r(this.a,b[d]))}a(c)};X.prototype.u=function(a,b){return b(a.t())};window.WebFont.o("custom",function(a){var b=(new y(navigator.userAgent,document)).parse();return new X(new o(document,b),a)});function Y(a,b,c){this.m=a;this.a=b;this.d=c;this.e=[];this.p={};this.s=new N}Y.prototype.z=function(a){return(this.d.api||"http://fontdeck.com/api/v1/project-info?")+"project="+a+"&domain="+document.location.hostname+"&callback=window.__webfontfontdeckmodule__["+a+"]"};Y.prototype.u=function(a,b){a=this.d.id;var c=this.d.families||null,d=this;if(a){this.m.__webfontfontdeckmodule__||(this.m.__webfontfontdeckmodule__={});this.m.__webfontfontdeckmodule__[a]=function(e){p(d.a,"head",r(d.a,e.css));for(var f=0,g=e.provides.length;f<g;++f){var h=e.provides[f];d.e.push(h.name);d.p[h.name]=[d.s.compact("font-weight:"+h.weight+";font-style:"+h.style)]}if(c!==null){d.e=c}b(true)};p(this.a,"head",s(this.a,this.z(a)))}else{b(true)}};Y.prototype.load=function(a){a(this.e,this.p)};window.WebFont.o("fontdeck",function(a){var b=(new y(navigator.userAgent,document)).parse();return new Y(window,new o(document,b),a)});function Z(a,b,c,d,e){this.m=a;this.c=b;this.a=c;this.k=d;this.d=e;this.e=[];this.p={}}Z.prototype.u=function(a,b){var c=this,d=c.d.projectId;if(d){var e=s(c.a,c.z(d));e.id="__MonotypeAPIScript__"+d;e.onreadystatechange=function(f){if(e.readyState==="loaded"||e.readyState==="complete"){e.onreadystatechange=null;e.onload(f)}};e.onload=function(){if(c.m["__mti_fntLst"+d]){var f=c.m["__mti_fntLst"+d]();if(f&&f.length){var g;for(g=0;g<f.length;g++){c.e.push(f[g].fontfamily)}}}b(a.t())};p(this.a,"head",e)}else{b(true)}};Z.prototype.z=function(a){var b=this.protocol(),c=(this.d.api||"fast.fonts.com/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return b+"//"+c+"/"+a+".js"};Z.prototype.load=function(a){a(this.e,this.p)};Z.prototype.protocol=function(){var a=["http:","https:"],b=a[0];if(this.k&&this.k.location&&this.k.location.protocol){var c=0;for(c=0;c<a.length;c++){if(this.k.location.protocol===a[c]){return this.k.location.protocol}}}return b};window.WebFont.o("monotype",function(a){var b=(new y(navigator.userAgent,document)).parse();return new Z(window,b,new o(document,b),document,a)});function $(a,b,c){this.m=a;this.a=b;this.d=c;this.e=[];this.p={}}$.prototype.z=function(a){return(this.d.api||"http://use.typekit.com")+"/"+a+".js"};$.prototype.u=function(a,b){var c=this.d.id,d=this.d,e=this;if(c){this.m.__webfonttypekitmodule__||(this.m.__webfonttypekitmodule__={});this.m.__webfonttypekitmodule__[c]=function(f){f(a,d,function(g,h,m){e.e=h;e.p=m;b(g)})};p(this.a,"head",s(this.a,this.z(c)))}else{b(true)}};$.prototype.load=function(a){a(this.e,this.p)};window.WebFont.o("typekit",function(a){var b=(new y(navigator.userAgent,document)).parse();return new $(window,new o(document,b),a)});window.WebFontConfig&&window.WebFont.load(window.WebFontConfig)})(this,document);