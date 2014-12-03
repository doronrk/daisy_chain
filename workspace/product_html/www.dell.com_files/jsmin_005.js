
/*script:knockout-2.3.0.js*/
var startTScript=new Date().getTime ();
// Knockout JavaScript library v2.3.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {function F(q){return function(){return q}};(function(q){var w=this||(0,eval)("this"),s=w.document,H=w.navigator,t=w.jQuery,y=w.JSON;(function(q){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?q(module.exports||exports):"function"===typeof define&&define.amd?define(["exports"],q):q(w.ko={})})(function(C){function G(b,c,d,f){a.d[b]={init:function(b){a.a.f.set(b,I,{});return{controlsDescendantBindings:!0}},update:function(b,e,m,h,k){m=a.a.f.get(b,I);e=a.a.c(e());h=!d!==!e;var l=!m.fb;if(l||c||h!==m.vb)l&&(m.fb=
a.a.Oa(a.e.childNodes(b),!0)),h?(l||a.e.P(b,a.a.Oa(m.fb)),a.Ja(f?f(k,e):k,b)):a.e.ba(b),m.vb=h}};a.g.S[b]=!1;a.e.L[b]=!0}function J(b,c,d){d&&c!==a.h.n(b)&&a.h.W(b,c);c!==a.h.n(b)&&a.q.I(a.a.Ga,null,[b,"change"])}var a="undefined"!==typeof C?C:{};a.b=function(b,c){for(var d=b.split("."),f=a,g=0;g<d.length-1;g++)f=f[d[g]];f[d[d.length-1]]=c};a.r=function(a,c,d){a[c]=d};a.version="2.3.0";a.b("version",a.version);a.a=function(){function b(a,b){for(var e in a)a.hasOwnProperty(e)&&b(e,a[e])}function c(b,
e){if("input"!==a.a.u(b)||!b.type||"click"!=e.toLowerCase())return!1;var k=b.type;return"checkbox"==k||"radio"==k}var d={},f={};d[H&&/Firefox\/2/i.test(H.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];d.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(d,function(a,b){if(b.length)for(var e=0,c=b.length;e<c;e++)f[b[e]]=a});var g={propertychange:!0},e=s&&function(){for(var a=3,b=s.createElement("div"),e=b.getElementsByTagName("i");b.innerHTML=
"\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",e[0];);return 4<a?a:q}();return{Ta:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],p:function(a,b){for(var e=0,c=a.length;e<c;e++)b(a[e])},k:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var e=0,c=a.length;e<c;e++)if(a[e]===b)return e;return-1},La:function(a,b,e){for(var c=0,d=a.length;c<d;c++)if(b.call(e,a[c]))return a[c];return null},ka:function(b,e){var c=a.a.k(b,e);0<=c&&
b.splice(c,1)},Ma:function(b){b=b||[];for(var e=[],c=0,d=b.length;c<d;c++)0>a.a.k(e,b[c])&&e.push(b[c]);return e},Z:function(a,b){a=a||[];for(var e=[],c=0,d=a.length;c<d;c++)e.push(b(a[c]));return e},Y:function(a,b){a=a||[];for(var e=[],c=0,d=a.length;c<d;c++)b(a[c])&&e.push(a[c]);return e},R:function(a,b){if(b instanceof Array)a.push.apply(a,b);else for(var e=0,c=b.length;e<c;e++)a.push(b[e]);return a},ja:function(b,e,c){var d=b.indexOf?b.indexOf(e):a.a.k(b,e);0>d?c&&b.push(e):c||b.splice(d,1)},
extend:function(a,b){if(b)for(var e in b)b.hasOwnProperty(e)&&(a[e]=b[e]);return a},w:b,oa:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},Mb:function(b){b=a.a.N(b);for(var e=s.createElement("div"),c=0,d=b.length;c<d;c++)e.appendChild(a.H(b[c]));return e},Oa:function(b,e){for(var c=0,d=b.length,g=[];c<d;c++){var f=b[c].cloneNode(!0);g.push(e?a.H(f):f)}return g},P:function(b,e){a.a.oa(b);if(e)for(var c=0,d=e.length;c<d;c++)b.appendChild(e[c])},eb:function(b,e){var c=b.nodeType?[b]:b;if(0<
c.length){for(var d=c[0],g=d.parentNode,f=0,r=e.length;f<r;f++)g.insertBefore(e[f],d);f=0;for(r=c.length;f<r;f++)a.removeNode(c[f])}},hb:function(a,b){7>e?a.setAttribute("selected",b):a.selected=b},F:function(a){return null===a||a===q?"":a.trim?a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Wb:function(b,e){for(var c=[],d=(b||"").split(e),g=0,f=d.length;g<f;g++){var r=a.a.F(d[g]);""!==r&&c.push(r)}return c},Tb:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===
b},yb:function(a,b){if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;null!=a;){if(a==b)return!0;a=a.parentNode}return!1},aa:function(b){return a.a.yb(b,b.ownerDocument)},pb:function(b){return!!a.a.La(b,a.a.aa)},u:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},o:function(b,d,k){var f=e&&g[d];if(f||"undefined"==typeof t)if(f||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var n=function(a){k.call(b,a)},p="on"+d;b.attachEvent(p,n);
a.a.C.ia(b,function(){b.detachEvent(p,n)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(d,k,!1);else{if(c(b,d)){var r=k;k=function(a,b){var e=this.checked;b&&(this.checked=!0!==b.sb);r.call(this,a);this.checked=e}}t(b).bind(d,k)}},Ga:function(a,b){if(!a||!a.nodeType)throw Error("element must be a DOM node when calling triggerEvent");if("undefined"!=typeof t){var e=[];c(a,b)&&e.push({sb:a.checked});t(a).trigger(b,e)}else if("function"==typeof s.createEvent)if("function"==
typeof a.dispatchEvent)e=s.createEvent(f[b]||"HTMLEvents"),e.initEvent(b,!0,!0,w,0,0,0,0,0,!1,!1,!1,!1,0,a),a.dispatchEvent(e);else throw Error("The supplied element doesn't support dispatchEvent");else if("undefined"!=typeof a.fireEvent)c(a,b)&&(a.checked=!0!==a.checked),a.fireEvent("on"+b);else throw Error("Browser doesn't support triggering events");},c:function(b){return a.T(b)?b():b},ya:function(b){return a.T(b)?b.t():b},ga:function(b,e,c){if(e){var d=/\S+/g,g=b.className.match(d)||[];a.a.p(e.match(d),
function(b){a.a.ja(g,b,c)});b.className=g.join(" ")}},ib:function(b,e){var c=a.a.c(e);if(null===c||c===q)c="";var d=a.e.firstChild(b);!d||3!=d.nodeType||a.e.nextSibling(d)?a.e.P(b,[s.createTextNode(c)]):d.data=c;a.a.Bb(b)},gb:function(a,b){a.name=b;if(7>=e)try{a.mergeAttributes(s.createElement("<input name='"+a.name+"'/>"),!1)}catch(c){}},Bb:function(a){9<=e&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},zb:function(a){if(e){var b=a.style.width;a.style.width=0;a.style.width=
b}},Qb:function(b,e){b=a.a.c(b);e=a.a.c(e);for(var c=[],d=b;d<=e;d++)c.push(d);return c},N:function(a){for(var b=[],e=0,c=a.length;e<c;e++)b.push(a[e]);return b},Ub:6===e,Vb:7===e,ca:e,Ua:function(b,e){for(var c=a.a.N(b.getElementsByTagName("input")).concat(a.a.N(b.getElementsByTagName("textarea"))),d="string"==typeof e?function(a){return a.name===e}:function(a){return e.test(a.name)},g=[],f=c.length-1;0<=f;f--)d(c[f])&&g.push(c[f]);return g},Nb:function(b){return"string"==typeof b&&(b=a.a.F(b))?
y&&y.parse?y.parse(b):(new Function("return "+b))():null},Ca:function(b,e,c){if(!y||!y.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");return y.stringify(a.a.c(b),e,c)},Ob:function(e,c,d){d=d||{};var g=d.params||{},f=d.includeFields||this.Ta,p=e;if("object"==typeof e&&"form"===a.a.u(e))for(var p=e.action,r=f.length-1;0<=r;r--)for(var z=
a.a.Ua(e,f[r]),D=z.length-1;0<=D;D--)g[z[D].name]=z[D].value;c=a.a.c(c);var q=s.createElement("form");q.style.display="none";q.action=p;q.method="post";for(var v in c)e=s.createElement("input"),e.name=v,e.value=a.a.Ca(a.a.c(c[v])),q.appendChild(e);b(g,function(a,b){var e=s.createElement("input");e.name=a;e.value=b;q.appendChild(e)});s.body.appendChild(q);d.submitter?d.submitter(q):q.submit();setTimeout(function(){q.parentNode.removeChild(q)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.p);
a.b("utils.arrayFirst",a.a.La);a.b("utils.arrayFilter",a.a.Y);a.b("utils.arrayGetDistinctValues",a.a.Ma);a.b("utils.arrayIndexOf",a.a.k);a.b("utils.arrayMap",a.a.Z);a.b("utils.arrayPushAll",a.a.R);a.b("utils.arrayRemoveItem",a.a.ka);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",a.a.Ta);a.b("utils.getFormFields",a.a.Ua);a.b("utils.peekObservable",a.a.ya);a.b("utils.postJson",a.a.Ob);a.b("utils.parseJson",a.a.Nb);a.b("utils.registerEventHandler",a.a.o);a.b("utils.stringifyJson",
a.a.Ca);a.b("utils.range",a.a.Qb);a.b("utils.toggleDomNodeCssClass",a.a.ga);a.b("utils.triggerEvent",a.a.Ga);a.b("utils.unwrapObservable",a.a.c);a.b("utils.objectForEach",a.a.w);a.b("utils.addOrRemoveItem",a.a.ja);a.b("unwrap",a.a.c);Function.prototype.bind||(Function.prototype.bind=function(a){var c=this,d=Array.prototype.slice.call(arguments);a=d.shift();return function(){return c.apply(a,d.concat(Array.prototype.slice.call(arguments)))}});a.a.f=new function(){var b=0,c="__ko__"+(new Date).getTime(),
d={};return{get:function(b,c){var e=a.a.f.pa(b,!1);return e===q?q:e[c]},set:function(b,c,e){if(e!==q||a.a.f.pa(b,!1)!==q)a.a.f.pa(b,!0)[c]=e},pa:function(a,g){var e=a[c];if(!e||"null"===e||!d[e]){if(!g)return q;e=a[c]="ko"+b++;d[e]={}}return d[e]},clear:function(a){var b=a[c];return b?(delete d[b],a[c]=null,!0):!1}}};a.b("utils.domData",a.a.f);a.b("utils.domData.clear",a.a.f.clear);a.a.C=new function(){function b(b,c){var g=a.a.f.get(b,d);g===q&&c&&(g=[],a.a.f.set(b,d,g));return g}function c(e){var d=
b(e,!1);if(d)for(var d=d.slice(0),f=0;f<d.length;f++)d[f](e);a.a.f.clear(e);"function"==typeof t&&"function"==typeof t.cleanData&&t.cleanData([e]);if(g[e.nodeType])for(d=e.firstChild;e=d;)d=e.nextSibling,8===e.nodeType&&c(e)}var d="__ko_domNodeDisposal__"+(new Date).getTime(),f={1:!0,8:!0,9:!0},g={1:!0,9:!0};return{ia:function(a,c){if("function"!=typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},cb:function(e,c){var g=b(e,!1);g&&(a.a.ka(g,c),0==g.length&&a.a.f.set(e,d,q))},H:function(b){if(f[b.nodeType]&&
(c(b),g[b.nodeType])){var d=[];a.a.R(d,b.getElementsByTagName("*"));for(var h=0,k=d.length;h<k;h++)c(d[h])}return b},removeNode:function(b){a.H(b);b.parentNode&&b.parentNode.removeChild(b)}}};a.H=a.a.C.H;a.removeNode=a.a.C.removeNode;a.b("cleanNode",a.H);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.C);a.b("utils.domNodeDisposal.addDisposeCallback",a.a.C.ia);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.C.cb);(function(){a.a.xa=function(b){var c;if("undefined"!=typeof t)if(t.parseHTML)c=
t.parseHTML(b)||[];else{if((c=t.clean([b]))&&c[0]){for(b=c[0];b.parentNode&&11!==b.parentNode.nodeType;)b=b.parentNode;b.parentNode&&b.parentNode.removeChild(b)}}else{var d=a.a.F(b).toLowerCase();c=s.createElement("div");d=d.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!d.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!d.indexOf("<td")||!d.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];b="ignored<div>"+d[1]+b+d[2]+"</div>";for("function"==typeof w.innerShiv?
c.appendChild(w.innerShiv(b)):c.innerHTML=b;d[0]--;)c=c.lastChild;c=a.a.N(c.lastChild.childNodes)}return c};a.a.fa=function(b,c){a.a.oa(b);c=a.a.c(c);if(null!==c&&c!==q)if("string"!=typeof c&&(c=c.toString()),"undefined"!=typeof t)t(b).html(c);else for(var d=a.a.xa(c),f=0;f<d.length;f++)b.appendChild(d[f])}})();a.b("utils.parseHtmlFragment",a.a.xa);a.b("utils.setHtml",a.a.fa);a.s=function(){function b(c,f){if(c)if(8==c.nodeType){var g=a.s.$a(c.nodeValue);null!=g&&f.push({xb:c,Kb:g})}else if(1==c.nodeType)for(var g=
0,e=c.childNodes,m=e.length;g<m;g++)b(e[g],f)}var c={};return{va:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},mb:function(a,b){var g=c[a];if(g===q)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return g.apply(null,b||[]),
!0}finally{delete c[a]}},nb:function(c,f){var g=[];b(c,g);for(var e=0,m=g.length;e<m;e++){var h=g[e].xb,k=[h];f&&a.a.R(k,f);a.s.mb(g[e].Kb,k);h.nodeValue="";h.parentNode&&h.parentNode.removeChild(h)}},$a:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.s);a.b("memoization.memoize",a.s.va);a.b("memoization.unmemoize",a.s.mb);a.b("memoization.parseMemoText",a.s.$a);a.b("memoization.unmemoizeDomNodeAndDescendants",a.s.nb);a.Sa={throttle:function(b,c){b.throttleEvaluation=
c;var d=null;return a.j({read:b,write:function(a){clearTimeout(d);d=setTimeout(function(){b(a)},c)}})},notify:function(b,c){b.equalityComparer="always"==c?F(!1):a.m.fn.equalityComparer;return b}};a.b("extenders",a.Sa);a.kb=function(b,c,d){this.target=b;this.la=c;this.wb=d;a.r(this,"dispose",this.B)};a.kb.prototype.B=function(){this.Hb=!0;this.wb()};a.V=function(){this.G={};a.a.extend(this,a.V.fn);a.r(this,"subscribe",this.Da);a.r(this,"extend",this.extend);a.r(this,"getSubscriptionsCount",this.Db)};
a.V.fn={Da:function(b,c,d){d=d||"change";var f=new a.kb(this,c?b.bind(c):b,function(){a.a.ka(this.G[d],f)}.bind(this));this.G[d]||(this.G[d]=[]);this.G[d].push(f);return f},notifySubscribers:function(b,c){c=c||"change";this.G[c]&&a.q.I(function(){a.a.p(this.G[c].slice(0),function(a){a&&!0!==a.Hb&&a.la(b)})},this)},Db:function(){var b=0;a.a.w(this.G,function(a,d){b+=d.length});return b},extend:function(b){var c=this;b&&a.a.w(b,function(b,f){var g=a.Sa[b];"function"==typeof g&&(c=g(c,f))});return c}};
a.Wa=function(a){return null!=a&&"function"==typeof a.Da&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.V);a.b("isSubscribable",a.Wa);a.q=function(){var b=[];return{rb:function(a){b.push({la:a,Ra:[]})},end:function(){b.pop()},bb:function(c){if(!a.Wa(c))throw Error("Only subscribable things can act as dependencies");if(0<b.length){var d=b[b.length-1];!d||0<=a.a.k(d.Ra,c)||(d.Ra.push(c),d.la(c))}},I:function(a,d,f){try{return b.push(null),a.apply(d,f||[])}finally{b.pop()}}}}();var L=
{undefined:!0,"boolean":!0,number:!0,string:!0};a.m=function(b){function c(){if(0<arguments.length)return c.equalityComparer&&c.equalityComparer(d,arguments[0])||(c.K(),d=arguments[0],c.J()),this;a.q.bb(c);return d}var d=b;a.V.call(c);c.t=function(){return d};c.J=function(){c.notifySubscribers(d)};c.K=function(){c.notifySubscribers(d,"beforeChange")};a.a.extend(c,a.m.fn);a.r(c,"peek",c.t);a.r(c,"valueHasMutated",c.J);a.r(c,"valueWillMutate",c.K);return c};a.m.fn={equalityComparer:function(a,c){return null===
a||typeof a in L?a===c:!1}};var A=a.m.Pb="__ko_proto__";a.m.fn[A]=a.m;a.qa=function(b,c){return null===b||b===q||b[A]===q?!1:b[A]===c?!0:a.qa(b[A],c)};a.T=function(b){return a.qa(b,a.m)};a.Xa=function(b){return"function"==typeof b&&b[A]===a.m||"function"==typeof b&&b[A]===a.j&&b.Eb?!0:!1};a.b("observable",a.m);a.b("isObservable",a.T);a.b("isWriteableObservable",a.Xa);a.U=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
b=a.m(b);a.a.extend(b,a.U.fn);return b};a.U.fn={remove:function(a){for(var c=this.t(),d=[],f="function"==typeof a?a:function(e){return e===a},g=0;g<c.length;g++){var e=c[g];f(e)&&(0===d.length&&this.K(),d.push(e),c.splice(g,1),g--)}d.length&&this.J();return d},removeAll:function(b){if(b===q){var c=this.t(),d=c.slice(0);this.K();c.splice(0,c.length);this.J();return d}return b?this.remove(function(c){return 0<=a.a.k(b,c)}):[]},destroy:function(a){var c=this.t(),d="function"==typeof a?a:function(c){return c===
a};this.K();for(var f=c.length-1;0<=f;f--)d(c[f])&&(c[f]._destroy=!0);this.J()},destroyAll:function(b){return b===q?this.destroy(F(!0)):b?this.destroy(function(c){return 0<=a.a.k(b,c)}):[]},indexOf:function(b){var c=this();return a.a.k(c,b)},replace:function(a,c){var d=this.indexOf(a);0<=d&&(this.K(),this.t()[d]=c,this.J())}};a.a.p("pop push reverse shift sort splice unshift".split(" "),function(b){a.U.fn[b]=function(){var a=this.t();this.K();a=a[b].apply(a,arguments);this.J();return a}});a.a.p(["slice"],
function(b){a.U.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.b("observableArray",a.U);a.j=function(b,c,d){function f(){a.a.p(v,function(a){a.B()});v=[]}function g(){var a=m.throttleEvaluation;a&&0<=a?(clearTimeout(t),t=setTimeout(e,a)):e()}function e(){if(!n)if(l&&D())x();else{n=!0;try{var b=a.a.Z(v,function(a){return a.target});a.q.rb(function(e){var c;0<=(c=a.a.k(b,e))?b[c]=q:v.push(e.Da(g))});for(var e=p.call(c),d=b.length-1;0<=d;d--)b[d]&&v.splice(d,1)[0].B();l=!0;m.notifySubscribers(k,
"beforeChange");k=e;m.notifySubscribers(k)}finally{a.q.end(),n=!1}v.length||x()}}function m(){if(0<arguments.length){if("function"===typeof r)r.apply(c,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");return this}l||e();a.q.bb(m);return k}function h(){return!l||0<v.length}var k,l=!1,n=!1,p=b;p&&"object"==typeof p?(d=p,p=d.read):(d=d||{},p||(p=d.read));if("function"!=typeof p)throw Error("Pass a function that returns the value of the ko.computed");
var r=d.write,z=d.disposeWhenNodeIsRemoved||d.$||null,D=d.disposeWhen||d.Qa||F(!1),x=f,v=[],t=null;c||(c=d.owner);m.t=function(){l||e();return k};m.Cb=function(){return v.length};m.Eb="function"===typeof d.write;m.B=function(){x()};m.ta=h;a.V.call(m);a.a.extend(m,a.j.fn);a.r(m,"peek",m.t);a.r(m,"dispose",m.B);a.r(m,"isActive",m.ta);a.r(m,"getDependenciesCount",m.Cb);!0!==d.deferEvaluation&&e();if(z&&h()){x=function(){a.a.C.cb(z,x);f()};a.a.C.ia(z,x);var s=D,D=function(){return!a.a.aa(z)||s()}}return m};
a.Gb=function(b){return a.qa(b,a.j)};C=a.m.Pb;a.j[C]=a.m;a.j.fn={};a.j.fn[C]=a.j;a.b("dependentObservable",a.j);a.b("computed",a.j);a.b("isComputed",a.Gb);(function(){function b(a,g,e){e=e||new d;a=g(a);if("object"!=typeof a||null===a||a===q||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var m=a instanceof Array?[]:{};e.save(a,m);c(a,function(c){var d=g(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":m[c]=d;break;case "object":case "undefined":var l=
e.get(d);m[c]=l!==q?l:b(d,g,e)}});return m}function c(a,b){if(a instanceof Array){for(var e=0;e<a.length;e++)b(e);"function"==typeof a.toJSON&&b("toJSON")}else for(e in a)b(e)}function d(){this.keys=[];this.Ha=[]}a.lb=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var e=0;a.T(b)&&10>e;e++)b=b();return b})};a.toJSON=function(b,c,e){b=a.lb(b);return a.a.Ca(b,c,e)};d.prototype={save:function(b,c){var e=a.a.k(this.keys,
b);0<=e?this.Ha[e]=c:(this.keys.push(b),this.Ha.push(c))},get:function(b){b=a.a.k(this.keys,b);return 0<=b?this.Ha[b]:q}}})();a.b("toJS",a.lb);a.b("toJSON",a.toJSON);(function(){a.h={n:function(b){switch(a.a.u(b)){case "option":return!0===b.__ko__hasDomDataOptionValue__?a.a.f.get(b,a.d.options.wa):7>=a.a.ca?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.h.n(b.options[b.selectedIndex]):q;default:return b.value}},W:function(b,
c){switch(a.a.u(b)){case "option":switch(typeof c){case "string":a.a.f.set(b,a.d.options.wa,q);"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__;b.value=c;break;default:a.a.f.set(b,a.d.options.wa,c),b.__ko__hasDomDataOptionValue__=!0,b.value="number"===typeof c?c:""}break;case "select":""===c&&(c=q);if(null===c||c===q)b.selectedIndex=-1;for(var d=b.options.length-1;0<=d;d--)if(a.h.n(b.options[d])==c){b.selectedIndex=d;break}1<b.size||-1!==b.selectedIndex||(b.selectedIndex=
0);break;default:if(null===c||c===q)c="";b.value=c}}}})();a.b("selectExtensions",a.h);a.b("selectExtensions.readValue",a.h.n);a.b("selectExtensions.writeValue",a.h.W);a.g=function(){function b(a,b){for(var d=null;a!=d;)d=a,a=a.replace(c,function(a,c){return b[c]});return a}var c=/\@ko_token_(\d+)\@/g,d=["true","false","null","undefined"],f=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;return{S:[],da:function(c){var e=a.a.F(c);if(3>e.length)return[];"{"===e.charAt(0)&&(e=e.substring(1,e.length-
1));c=[];for(var d=null,f,k=0;k<e.length;k++){var l=e.charAt(k);if(null===d)switch(l){case '"':case "'":case "/":d=k,f=l}else if(l==f&&"\\"!==e.charAt(k-1)){l=e.substring(d,k+1);c.push(l);var n="@ko_token_"+(c.length-1)+"@",e=e.substring(0,d)+n+e.substring(k+1),k=k-(l.length-n.length),d=null}}f=d=null;for(var p=0,r=null,k=0;k<e.length;k++){l=e.charAt(k);if(null===d)switch(l){case "{":d=k;r=l;f="}";break;case "(":d=k;r=l;f=")";break;case "[":d=k,r=l,f="]"}l===r?p++:l===f&&(p--,0===p&&(l=e.substring(d,
k+1),c.push(l),n="@ko_token_"+(c.length-1)+"@",e=e.substring(0,d)+n+e.substring(k+1),k-=l.length-n.length,d=null))}f=[];e=e.split(",");d=0;for(k=e.length;d<k;d++)p=e[d],r=p.indexOf(":"),0<r&&r<p.length-1?(l=p.substring(r+1),f.push({key:b(p.substring(0,r),c),value:b(l,c)})):f.push({unknown:b(p,c)});return f},ea:function(b){var e="string"===typeof b?a.g.da(b):b,c=[];b=[];for(var h,k=0;h=e[k];k++)if(0<c.length&&c.push(","),h.key){var l;a:{l=h.key;var n=a.a.F(l);switch(n.length&&n.charAt(0)){case "'":case '"':break a;
default:l="'"+n+"'"}}h=h.value;c.push(l);c.push(":");c.push(h);h=a.a.F(h);0<=a.a.k(d,a.a.F(h).toLowerCase())?h=!1:(n=h.match(f),h=null===n?!1:n[1]?"Object("+n[1]+")"+n[2]:h);h&&(0<b.length&&b.push(", "),b.push(l+" : function(__ko_value) { "+h+" = __ko_value; }"))}else h.unknown&&c.push(h.unknown);e=c.join("");0<b.length&&(e=e+", '_ko_property_writers' : { "+b.join("")+" } ");return e},Jb:function(b,c){for(var d=0;d<b.length;d++)if(a.a.F(b[d].key)==c)return!0;return!1},ha:function(b,c,d,f,k){if(b&&
a.T(b))!a.Xa(b)||k&&b.t()===f||b(f);else if((b=c()._ko_property_writers)&&b[d])b[d](f)}}}();a.b("expressionRewriting",a.g);a.b("expressionRewriting.bindingRewriteValidators",a.g.S);a.b("expressionRewriting.parseObjectLiteral",a.g.da);a.b("expressionRewriting.preProcessBindings",a.g.ea);a.b("jsonExpressionRewriting",a.g);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.g.ea);(function(){function b(a){return 8==a.nodeType&&(g?a.text:a.nodeValue).match(e)}function c(a){return 8==a.nodeType&&
(g?a.text:a.nodeValue).match(m)}function d(a,e){for(var d=a,g=1,f=[];d=d.nextSibling;){if(c(d)&&(g--,0===g))return f;f.push(d);b(d)&&g++}if(!e)throw Error("Cannot find closing comment tag to match: "+a.nodeValue);return null}function f(a,b){var c=d(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var g=s&&"\x3c!--test--\x3e"===s.createComment("test").text,e=g?/^\x3c!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*--\x3e$/:/^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/,m=g?/^\x3c!--\s*\/ko\s*--\x3e$/:
/^\s*\/ko\s*$/,h={ul:!0,ol:!0};a.e={L:{},childNodes:function(a){return b(a)?d(a):a.childNodes},ba:function(c){if(b(c)){c=a.e.childNodes(c);for(var e=0,d=c.length;e<d;e++)a.removeNode(c[e])}else a.a.oa(c)},P:function(c,e){if(b(c)){a.e.ba(c);for(var d=c.nextSibling,g=0,f=e.length;g<f;g++)d.parentNode.insertBefore(e[g],d)}else a.a.P(c,e)},ab:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},Va:function(c,e,d){d?b(c)?c.parentNode.insertBefore(e,
d.nextSibling):d.nextSibling?c.insertBefore(e,d.nextSibling):c.appendChild(e):a.e.ab(c,e)},firstChild:function(a){return b(a)?!a.nextSibling||c(a.nextSibling)?null:a.nextSibling:a.firstChild},nextSibling:function(a){b(a)&&(a=f(a));return a.nextSibling&&c(a.nextSibling)?null:a.nextSibling},ob:function(a){return(a=b(a))?a[1]:null},Za:function(e){if(h[a.a.u(e)]){var d=e.firstChild;if(d){do if(1===d.nodeType){var g;g=d.firstChild;var m=null;if(g){do if(m)m.push(g);else if(b(g)){var r=f(g,!0);r?g=r:m=
[g]}else c(g)&&(m=[g]);while(g=g.nextSibling)}if(g=m)for(m=d.nextSibling,r=0;r<g.length;r++)m?e.insertBefore(g[r],m):e.appendChild(g[r])}while(d=d.nextSibling)}}}}})();a.b("virtualElements",a.e);a.b("virtualElements.allowedBindings",a.e.L);a.b("virtualElements.emptyNode",a.e.ba);a.b("virtualElements.insertAfter",a.e.Va);a.b("virtualElements.prepend",a.e.ab);a.b("virtualElements.setDomNodeChildren",a.e.P);(function(){a.M=function(){this.Na={}};a.a.extend(a.M.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=
b.getAttribute("data-bind");case 8:return null!=a.e.ob(b);default:return!1}},getBindings:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a):null},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");case 8:return a.e.ob(b);default:return null}},parseBindingsString:function(b,c,d){try{var f;if(!(f=this.Na[b])){var g=this.Na,e,m="with($context){with($data||{}){return{"+a.g.ea(b)+"}}}";e=new Function("$context","$element",m);
f=g[b]=e}return f(c,d)}catch(h){throw h.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+h.message,h;}}});a.M.instance=new a.M})();a.b("bindingProvider",a.M);(function(){function b(b,e,d){for(var f=a.e.firstChild(e);e=f;)f=a.e.nextSibling(e),c(b,e,d)}function c(c,e,f){var h=!0,k=1===e.nodeType;k&&a.e.Za(e);if(k&&f||a.M.instance.nodeHasBindings(e))h=d(e,null,c,f).Sb;h&&b(c,e,!k)}function d(b,c,d,h){function k(a){return function(){return p[a]}}function l(){return p}var n=0,p,r,
z=a.a.f.get(b,f);if(!c){if(z)throw Error("You cannot apply bindings multiple times to the same element.");a.a.f.set(b,f,!0)}a.j(function(){var f=d&&d instanceof a.A?d:new a.A(a.a.c(d)),x=f.$data;!z&&h&&a.jb(b,f);if(p=("function"==typeof c?c(f,b):c)||a.M.instance.getBindings(b,f))0===n&&(n=1,a.a.w(p,function(c){var e=a.d[c];if(e&&8===b.nodeType&&!a.e.L[c])throw Error("The binding '"+c+"' cannot be used with virtual elements");if(e&&"function"==typeof e.init&&(e=(0,e.init)(b,k(c),l,x,f))&&e.controlsDescendantBindings){if(r!==
q)throw Error("Multiple bindings ("+r+" and "+c+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");r=c}}),n=2),2===n&&a.a.w(p,function(c){var e=a.d[c];e&&"function"==typeof e.update&&(0,e.update)(b,k(c),l,x,f)})},null,{$:b});return{Sb:r===q}}a.d={};a.A=function(b,c,d){c?(a.a.extend(this,c),this.$parentContext=c,this.$parent=c.$data,this.$parents=(c.$parents||[]).slice(0),this.$parents.unshift(this.$parent)):(this.$parents=
[],this.$root=b,this.ko=a);this.$data=b;d&&(this[d]=b)};a.A.prototype.createChildContext=function(b,c){return new a.A(b,this,c)};a.A.prototype.extend=function(b){var c=a.a.extend(new a.A,this);return a.a.extend(c,b)};var f="__ko_boundElement";a.jb=function(b,c){if(2==arguments.length)a.a.f.set(b,"__ko_bindingContext__",c);else return a.a.f.get(b,"__ko_bindingContext__")};a.Ka=function(b,c,f){1===b.nodeType&&a.e.Za(b);return d(b,c,f,!0)};a.Ja=function(a,c){1!==c.nodeType&&8!==c.nodeType||b(a,c,!0)};
a.Ia=function(a,b){if(b&&1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");b=b||w.document.body;c(a,b,!0)};a.na=function(b){switch(b.nodeType){case 1:case 8:var c=a.jb(b);if(c)return c;if(b.parentNode)return a.na(b.parentNode)}return q};a.ub=function(b){return(b=a.na(b))?b.$data:q};a.b("bindingHandlers",a.d);a.b("applyBindings",a.Ia);a.b("applyBindingsToDescendants",a.Ja);a.b("applyBindingsToNode",a.Ka);
a.b("contextFor",a.na);a.b("dataFor",a.ub)})();var K={"class":"className","for":"htmlFor"};a.d.attr={update:function(b,c){var d=a.a.c(c())||{};a.a.w(d,function(c,d){d=a.a.c(d);var e=!1===d||null===d||d===q;e&&b.removeAttribute(c);8>=a.a.ca&&c in K?(c=K[c],e?b.removeAttribute(c):b[c]=d):e||b.setAttribute(c,d.toString());"name"===c&&a.a.gb(b,e?"":d.toString())})}};a.d.checked={init:function(b,c,d){a.a.o(b,"click",function(){var f;if("checkbox"==b.type)f=b.checked;else if("radio"==b.type&&b.checked)f=
b.value;else return;var g=c(),e=a.a.c(g);"checkbox"==b.type&&e instanceof Array?a.a.ja(g,b.value,b.checked):a.g.ha(g,d,"checked",f,!0)});"radio"!=b.type||b.name||a.d.uniqueName.init(b,F(!0))},update:function(b,c){var d=a.a.c(c());"checkbox"==b.type?b.checked=d instanceof Array?0<=a.a.k(d,b.value):d:"radio"==b.type&&(b.checked=b.value==d)}};a.d.css={update:function(b,c){var d=a.a.c(c());"object"==typeof d?a.a.w(d,function(c,d){d=a.a.c(d);a.a.ga(b,c,d)}):(d=String(d||""),a.a.ga(b,b.__ko__cssValue,!1),
b.__ko__cssValue=d,a.a.ga(b,d,!0))}};a.d.enable={update:function(b,c){var d=a.a.c(c());d&&b.disabled?b.removeAttribute("disabled"):d||b.disabled||(b.disabled=!0)}};a.d.disable={update:function(b,c){a.d.enable.update(b,function(){return!a.a.c(c())})}};a.d.event={init:function(b,c,d,f){var g=c()||{};a.a.w(g,function(e){"string"==typeof e&&a.a.o(b,e,function(b){var g,k=c()[e];if(k){var l=d();try{var n=a.a.N(arguments);n.unshift(f);g=k.apply(f,n)}finally{!0!==g&&(b.preventDefault?b.preventDefault():b.returnValue=
!1)}!1===l[e+"Bubble"]&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.d.foreach={Ya:function(b){return function(){var c=b(),d=a.a.ya(c);if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.D.sa};a.a.c(c);return{foreach:d.data,as:d.as,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.D.sa}}},init:function(b,c){return a.d.template.init(b,a.d.foreach.Ya(c))},
update:function(b,c,d,f,g){return a.d.template.update(b,a.d.foreach.Ya(c),d,f,g)}};a.g.S.foreach=!1;a.e.L.foreach=!0;a.d.hasfocus={init:function(b,c,d){function f(e){b.__ko_hasfocusUpdating=!0;var f=b.ownerDocument;if("activeElement"in f){var g;try{g=f.activeElement}catch(l){g=f.body}e=g===b}f=c();a.g.ha(f,d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var g=f.bind(null,!0),e=f.bind(null,!1);a.a.o(b,"focus",g);a.a.o(b,"focusin",g);a.a.o(b,"blur",e);a.a.o(b,"focusout",e)},
update:function(b,c){var d=!!a.a.c(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===d||(d?b.focus():b.blur(),a.q.I(a.a.Ga,null,[b,d?"focusin":"focusout"]))}};a.d.hasFocus=a.d.hasfocus;a.d.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.fa(b,c())}};var I="__ko_withIfBindingData";G("if");G("ifnot",!1,!0);G("with",!0,!1,function(a,c){return a.createChildContext(c)});a.d.options={init:function(b){if("select"!==a.a.u(b))throw Error("options binding applies only to SELECT elements");
for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,c,d){function f(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function g(b,c){if(p){var d=0<=a.a.k(p,a.h.n(c[0]));a.a.hb(c[0],d)}}var e=0==b.length,m=!e&&b.multiple?b.scrollTop:null;c=a.a.c(c());var h=d(),k=h.optionsIncludeDestroyed,l={},n,p;b.multiple?p=a.a.Z(b.selectedOptions||a.a.Y(b.childNodes,function(b){return b.tagName&&"option"===a.a.u(b)&&b.selected}),function(b){return a.h.n(b)}):0<=
b.selectedIndex&&(p=[a.h.n(b.options[b.selectedIndex])]);if(c){"undefined"==typeof c.length&&(c=[c]);var r=a.a.Y(c,function(b){return k||b===q||null===b||!a.a.c(b._destroy)});"optionsCaption"in h&&(n=a.a.c(h.optionsCaption),null!==n&&n!==q&&r.unshift(l))}else c=[];d=g;h.optionsAfterRender&&(d=function(b,c){g(0,c);a.q.I(h.optionsAfterRender,null,[c[0],b!==l?b:q])});a.a.Aa(b,r,function(b,c,d){d.length&&(p=d[0].selected&&[a.h.n(d[0])]);c=s.createElement("option");b===l?(a.a.fa(c,n),a.h.W(c,q)):(d=f(b,
h.optionsValue,b),a.h.W(c,a.a.c(d)),b=f(b,h.optionsText,d),a.a.ib(c,b));return[c]},null,d);p=null;e&&"value"in h&&J(b,a.a.ya(h.value),!0);a.a.zb(b);m&&20<Math.abs(m-b.scrollTop)&&(b.scrollTop=m)}};a.d.options.wa="__ko.optionValueDomData__";a.d.selectedOptions={init:function(b,c,d){a.a.o(b,"change",function(){var f=c(),g=[];a.a.p(b.getElementsByTagName("option"),function(b){b.selected&&g.push(a.h.n(b))});a.g.ha(f,d,"selectedOptions",g)})},update:function(b,c){if("select"!=a.a.u(b))throw Error("values binding applies only to SELECT elements");
var d=a.a.c(c());d&&"number"==typeof d.length&&a.a.p(b.getElementsByTagName("option"),function(b){var c=0<=a.a.k(d,a.h.n(b));a.a.hb(b,c)})}};a.d.style={update:function(b,c){var d=a.a.c(c()||{});a.a.w(d,function(c,d){d=a.a.c(d);b.style[c]=d||""})}};a.d.submit={init:function(b,c,d,f){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");a.a.o(b,"submit",function(a){var d,m=c();try{d=m.call(f,b)}finally{!0!==d&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}})}};
a.d.text={update:function(b,c){a.a.ib(b,c())}};a.e.L.text=!0;a.d.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.d.uniqueName.tb;a.a.gb(b,d)}}};a.d.uniqueName.tb=0;a.d.value={init:function(b,c,d){function f(){m=!1;var e=c(),f=a.h.n(b);a.g.ha(e,d,"value",f)}var g=["change"],e=d().valueUpdate,m=!1;e&&("string"==typeof e&&(e=[e]),a.a.R(g,e),g=a.a.Ma(g));!a.a.ca||("input"!=b.tagName.toLowerCase()||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete)||-1!=a.a.k(g,"propertychange")||
(a.a.o(b,"propertychange",function(){m=!0}),a.a.o(b,"blur",function(){m&&f()}));a.a.p(g,function(c){var d=f;a.a.Tb(c,"after")&&(d=function(){setTimeout(f,0)},c=c.substring(5));a.a.o(b,c,d)})},update:function(b,c){var d="select"===a.a.u(b),f=a.a.c(c()),g=a.h.n(b);f!==g&&(g=function(){a.h.W(b,f)},g(),d&&setTimeout(g,0));d&&0<b.length&&J(b,f,!1)}};a.d.visible={update:function(b,c){var d=a.a.c(c()),f="none"!=b.style.display;d&&!f?b.style.display="":!d&&f&&(b.style.display="none")}};(function(b){a.d[b]=
{init:function(c,d,f,g){return a.d.event.init.call(this,c,function(){var a={};a[b]=d();return a},f,g)}}})("click");a.v=function(){};a.v.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");};a.v.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.v.prototype.makeTemplateSource=function(b,c){if("string"==typeof b){c=c||s;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.l.i(d)}if(1==
b.nodeType||8==b.nodeType)return new a.l.Q(b);throw Error("Unknown template type: "+b);};a.v.prototype.renderTemplate=function(a,c,d,f){a=this.makeTemplateSource(a,f);return this.renderTemplateSource(a,c,d)};a.v.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.v.prototype.rewriteTemplate=function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.v);
a.Ea=function(){function b(b,c,d,m){b=a.g.da(b);for(var h=a.g.S,k=0;k<b.length;k++){var l=b[k].key;if(h.hasOwnProperty(l)){var n=h[l];if("function"===typeof n){if(l=n(b[k].value))throw Error(l);}else if(!n)throw Error("This template engine does not support the '"+l+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.g.ea(b)+" } })()},'"+d.toLowerCase()+"')";return m.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{Ab:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.Ea.Lb(b,c)},d)},Lb:function(a,g){return a.replace(c,function(a,c,d,f,l){return b(l,c,d,g)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e","#comment",g)})},qb:function(b,c){return a.s.va(function(d,m){var h=d.nextSibling;h&&h.nodeName.toLowerCase()===c&&a.Ka(h,b,m)})}}}();a.b("__tr_ambtns",a.Ea.qb);(function(){a.l={};a.l.i=function(a){this.i=a};a.l.i.prototype.text=
function(){var b=a.a.u(this.i),b="script"===b?"text":"textarea"===b?"value":"innerHTML";if(0==arguments.length)return this.i[b];var c=arguments[0];"innerHTML"===b?a.a.fa(this.i,c):this.i[b]=c};a.l.i.prototype.data=function(b){if(1===arguments.length)return a.a.f.get(this.i,"templateSourceData_"+b);a.a.f.set(this.i,"templateSourceData_"+b,arguments[1])};a.l.Q=function(a){this.i=a};a.l.Q.prototype=new a.l.i;a.l.Q.prototype.text=function(){if(0==arguments.length){var b=a.a.f.get(this.i,"__ko_anon_template__")||
{};b.Fa===q&&b.ma&&(b.Fa=b.ma.innerHTML);return b.Fa}a.a.f.set(this.i,"__ko_anon_template__",{Fa:arguments[0]})};a.l.i.prototype.nodes=function(){if(0==arguments.length)return(a.a.f.get(this.i,"__ko_anon_template__")||{}).ma;a.a.f.set(this.i,"__ko_anon_template__",{ma:arguments[0]})};a.b("templateSources",a.l);a.b("templateSources.domElement",a.l.i);a.b("templateSources.anonymousTemplate",a.l.Q)})();(function(){function b(b,c,d){var f;for(c=a.e.nextSibling(c);b&&(f=b)!==c;)b=a.e.nextSibling(f),1!==
f.nodeType&&8!==f.nodeType||d(f)}function c(c,d){if(c.length){var f=c[0],g=c[c.length-1];b(f,g,function(b){a.Ia(d,b)});b(f,g,function(b){a.s.nb(b,[d])})}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function f(b,f,h,k,l){l=l||{};var n=b&&d(b),n=n&&n.ownerDocument,p=l.templateEngine||g;a.Ea.Ab(h,p,n);h=p.renderTemplate(h,k,l,n);if("number"!=typeof h.length||0<h.length&&"number"!=typeof h[0].nodeType)throw Error("Template engine must return an array of DOM nodes");n=!1;switch(f){case "replaceChildren":a.e.P(b,
h);n=!0;break;case "replaceNode":a.a.eb(b,h);n=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+f);}n&&(c(h,k),l.afterRender&&a.q.I(l.afterRender,null,[h,k.$data]));return h}var g;a.Ba=function(b){if(b!=q&&!(b instanceof a.v))throw Error("templateEngine must inherit from ko.templateEngine");g=b};a.za=function(b,c,h,k,l){h=h||{};if((h.templateEngine||g)==q)throw Error("Set a template engine before calling renderTemplate");l=l||"replaceChildren";if(k){var n=d(k);return a.j(function(){var g=
c&&c instanceof a.A?c:new a.A(a.a.c(c)),r="function"==typeof b?b(g.$data,g):b,g=f(k,l,r,g,h);"replaceNode"==l&&(k=g,n=d(k))},null,{Qa:function(){return!n||!a.a.aa(n)},$:n&&"replaceNode"==l?n.parentNode:n})}return a.s.va(function(d){a.za(b,c,h,d,"replaceNode")})};a.Rb=function(b,d,g,k,l){function n(a,b){c(b,r);g.afterRender&&g.afterRender(b,a)}function p(c,d){r=l.createChildContext(a.a.c(c),g.as);r.$index=d;var k="function"==typeof b?b(c,r):b;return f(null,"ignoreTargetNode",k,r,g)}var r;return a.j(function(){var b=
a.a.c(d)||[];"undefined"==typeof b.length&&(b=[b]);b=a.a.Y(b,function(b){return g.includeDestroyed||b===q||null===b||!a.a.c(b._destroy)});a.q.I(a.a.Aa,null,[k,b,p,g,n])},null,{$:k})};a.d.template={init:function(b,c){var d=a.a.c(c());"string"==typeof d||(d.name||1!=b.nodeType&&8!=b.nodeType)||(d=1==b.nodeType?b.childNodes:a.e.childNodes(b),d=a.a.Mb(d),(new a.l.Q(b)).nodes(d));return{controlsDescendantBindings:!0}},update:function(b,c,d,f,g){c=a.a.c(c());d={};f=!0;var n,p=null;"string"!=typeof c&&(d=
c,c=a.a.c(d.name),"if"in d&&(f=a.a.c(d["if"])),f&&"ifnot"in d&&(f=!a.a.c(d.ifnot)),n=a.a.c(d.data));"foreach"in d?p=a.Rb(c||b,f&&d.foreach||[],d,b,g):f?(g="data"in d?g.createChildContext(n,d.as):g,p=a.za(c||b,g,d,b)):a.e.ba(b);g=p;(n=a.a.f.get(b,"__ko__templateComputedDomDataKey__"))&&"function"==typeof n.B&&n.B();a.a.f.set(b,"__ko__templateComputedDomDataKey__",g&&g.ta()?g:q)}};a.g.S.template=function(b){b=a.g.da(b);return 1==b.length&&b[0].unknown||a.g.Jb(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};
a.e.L.template=!0})();a.b("setTemplateEngine",a.Ba);a.b("renderTemplate",a.za);a.a.Pa=function(){function a(b,d,f,g,e){var m=Math.min,h=Math.max,k=[],l,n=b.length,p,r=d.length,q=r-n||1,t=n+r+1,s,v,w;for(l=0;l<=n;l++)for(v=s,k.push(s=[]),w=m(r,l+q),p=h(0,l-1);p<=w;p++)s[p]=p?l?b[l-1]===d[p-1]?v[p-1]:m(v[p]||t,s[p-1]||t)+1:p+1:l+1;m=[];h=[];q=[];l=n;for(p=r;l||p;)r=k[l][p]-1,p&&r===k[l][p-1]?h.push(m[m.length]={status:f,value:d[--p],index:p}):l&&r===k[l-1][p]?q.push(m[m.length]={status:g,value:b[--l],
index:l}):(m.push({status:"retained",value:d[--p]}),--l);if(h.length&&q.length){b=10*n;var E;for(d=f=0;(e||d<b)&&(E=h[f]);f++){for(g=0;k=q[g];g++)if(E.value===k.value){E.moved=k.index;k.moved=E.index;q.splice(g,1);d=g=0;break}d+=g}}return m.reverse()}return function(c,d,f){c=c||[];d=d||[];return c.length<=d.length?a(c,d,"added","deleted",f):a(d,c,"deleted","added",f)}}();a.b("utils.compareArrays",a.a.Pa);(function(){function b(b){for(;b.length&&!a.a.aa(b[0]);)b.splice(0,1);if(1<b.length){for(var c=
b[0],g=b[b.length-1],e=[c];c!==g;){c=c.nextSibling;if(!c)return;e.push(c)}Array.prototype.splice.apply(b,[0,b.length].concat(e))}return b}function c(c,f,g,e,m){var h=[];c=a.j(function(){var c=f(g,m,b(h))||[];0<h.length&&(a.a.eb(h,c),e&&a.q.I(e,null,[g,c,m]));h.splice(0,h.length);a.a.R(h,c)},null,{$:c,Qa:function(){return!a.a.pb(h)}});return{O:h,j:c.ta()?c:q}}a.a.Aa=function(d,f,g,e,m){function h(a,c){u=n[c];x!==c&&(E[a]=u);u.ra(x++);b(u.O);t.push(u);w.push(u)}function k(b,c){if(b)for(var d=0,e=c.length;d<
e;d++)c[d]&&a.a.p(c[d].O,function(a){b(a,d,c[d].X)})}f=f||[];e=e||{};var l=a.a.f.get(d,"setDomNodeChildrenFromArrayMapping_lastMappingResult")===q,n=a.a.f.get(d,"setDomNodeChildrenFromArrayMapping_lastMappingResult")||[],p=a.a.Z(n,function(a){return a.X}),r=a.a.Pa(p,f,e.dontLimitMoves),t=[],s=0,x=0,v=[],w=[];f=[];for(var E=[],p=[],u,B=0,y,A;y=r[B];B++)switch(A=y.moved,y.status){case "deleted":A===q&&(u=n[s],u.j&&u.j.B(),v.push.apply(v,b(u.O)),e.beforeRemove&&(f[B]=u,w.push(u)));s++;break;case "retained":h(B,
s++);break;case "added":A!==q?h(B,A):(u={X:y.value,ra:a.m(x++)},t.push(u),w.push(u),l||(p[B]=u))}k(e.beforeMove,E);a.a.p(v,e.beforeRemove?a.H:a.removeNode);for(var B=0,l=a.e.firstChild(d),C;u=w[B];B++){u.O||a.a.extend(u,c(d,g,u.X,m,u.ra));for(s=0;r=u.O[s];l=r.nextSibling,C=r,s++)r!==l&&a.e.Va(d,r,C);!u.Fb&&m&&(m(u.X,u.O,u.ra),u.Fb=!0)}k(e.beforeRemove,f);k(e.afterMove,E);k(e.afterAdd,p);a.a.f.set(d,"setDomNodeChildrenFromArrayMapping_lastMappingResult",t)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",
a.a.Aa);a.D=function(){this.allowTemplateRewriting=!1};a.D.prototype=new a.v;a.D.prototype.renderTemplateSource=function(b){var c=(9>a.a.ca?0:b.nodes)?b.nodes():null;if(c)return a.a.N(c.cloneNode(!0).childNodes);b=b.text();return a.a.xa(b)};a.D.sa=new a.D;a.Ba(a.D.sa);a.b("nativeTemplateEngine",a.D);(function(){a.ua=function(){var a=this.Ib=function(){if("undefined"==typeof t||!t.tmpl)return 0;try{if(0<=t.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=
function(b,f,g){g=g||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var e=b.data("precompiled");e||(e=b.text()||"",e=t.template(null,"{{ko_with $item.koBindingContext}}"+e+"{{/ko_with}}"),b.data("precompiled",e));b=[f.$data];f=t.extend({koBindingContext:f},g.templateOptions);f=t.tmpl(e,b,f);f.appendTo(s.createElement("div"));t.fragments={};return f};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+
a+" })()) }}"};this.addTemplate=function(a,b){s.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(t.tmpl.tag.ko_code={open:"__.push($1 || '');"},t.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.ua.prototype=new a.v;var b=new a.ua;0<b.Ib&&a.Ba(b);a.b("jqueryTmplTemplateEngine",a.ua)})()})})();
})();

if (window.console){console.log('ex time: knockout-2.3.0.js', new Date().getTime() - startTScript);}



/*script:storm_masthead.js*/
var startTScript=new Date().getTime ();
/* LEGACY CODE PULLED FROM STORM COMMON */
var m_mhTheme = null;
var m_pageTheme = null;
var m_pbarCart = null;
var m_pbarMA = null;
var m_pnlinks;
var m_crumbs;
var m_mhFixed = false;
var m_isHome = false;
var m_isSegHome = false;
var m_skipMenuDef = false;
var m_mda = null;
var m_printLink = null;
var m_emailLink = false;
var m_helpLink = null;
var m_production = true;
var m_menudef = "/content/public/menu.aspx";
var m_avgChW = 6;
var m_crumbRegEx1 = /<.*>/g;
var m_crumbRegEx2 = /&nbsp;/g;
var m_crumbRegEx3 = /&~ck=bt/g;
var m_subNavLinksDisplay = false;
var m_subNavIconsDisplay = false;
var m_largeFont = false;
var m_supressSubNav = false;
var m_stdEmpty = "";
var m_stdOffImg;
var m_activeTab = null;
var m_pbarStripAjax = null;
var m_pbarNavAjax = null;
var m_pbarContentAjax = null;
var m_defaultTabs = false;
var m_pbarPfx = "";
var m_phoneTitle = null;
var m_phoneMsg = null;
var m_phoneTariff = null;
var m_pbarContentDiv = null;
var m_pageTab = null;
var m_mastheadWidth = 928;
var m_mastheadWidthNextGen = 965;
var m_pbarTabEnabled = false;
var m_tabNav = false;
var m_pbarCartEnabled = false;
var m_pbarMAEnabled = false;
var m_toolBoxLinks = null;
var m_toolBoxRender = null;
var m_pbarLinks = null;
var m_pbarStripContent = null;
var m_buyonlineMessage = null;
var m_subNavLinkWidth = null;
var m_searchTypes = null;
var m_searchTemp = null;
var m_myAccountLink = null;
var m_timeoutOpenDelay = null;
var m_timeoutCloseDelay = null;
var m_timeoutTerOpenDelay = null;
var m_timeoutTerCloseDelay = null;
var m_tabContentDiv = null;
var m_tabTerContentDiv = null;
var m_maIframe = false;
var Screen = new GetScreen();
var m_cartPages = new Array();
var loaded = new Array();
var onloadFired = false;
var m_isRtl = false;
var m_clientVars = null;
var m_isCenter = true;
var m_isPopupIntention = false;
var m_runSafeLoad = false;
var segmentTitle = null;
var m_premierModal = null;

var shrink = 0
var isbloated = false;
var isbloating = false;
var m_fromAddToCart = false
var ContainerHeight = 0
var increment = 0
var intShow
var m_id
var blockcollapse = false
var m_menuload = new Array();
var m_menuloaded = false;
var m_popClose = "Close";
var m_isAlienwareLayout = false;
var m_isAlienwareTheme = false;
var m_stormCookie = null;
var m_navPage = null;
var m_isRcomm = false;
var m_curUrl = "";
var _subMenuMarkup = [];
var elUrlOvr = document.getElementById("urlOverride");
var logoUrlOverride = (elUrlOvr) ? document.getElementById("urlOverride").getAttribute("value") : '';
var elFlagCss = document.getElementById("flagCSSPath");
var flagCSSPath = (elFlagCss) ? document.getElementById("flagCSSPath").getAttribute("value") : '';
var m_login_url = "/pbar/login.aspx";

try {
    if (document.domain.indexOf("dell.com.") == -1 && document.domain.indexOf("dell.com") != -1) { document.domain = "dell.com"; } else { try { window.location.href; } catch (e) { document.domain = document.domain; } }
} catch (e) {
}

function writeMH(phoneTitle, phoneMsg, phoneTariff, segmentTitle, hasLocale, logoLink, pnmsg) {
    //console.time("writeMH");
    if (jQuery('HTML').css('direction') === 'rtl' || jQuery('body').hasClass('he') || jQuery('body').hasClass('ar'))
        jQuery('HTML').addClass('rtl');
    var mda = (typeof m_mda !== 'undefined') ? m_mda : "";
    var pbar = (typeof m_pbarMA !== 'undefined' && m_pbarMA != null) ? m_pbarMA : {};
    var cart = (typeof m_pbarCart !== 'undefined' && m_pbarCart != null) ? m_pbarCart : {};
    var menuBars = (typeof m_menuBar !== 'undefined' && m_menuBar != null) ? m_menuBar : {};
    var phoneTitleText = (phoneTitle) ? phoneTitle : "";
    var phoneMsgText = (phoneMsg) ? phoneMsg : "";
    if (!(typeof m_pageTab == 'undefined' || m_pageTab == null) && m_pageTab == 'Auto')
        m_pageTab = 0;
    DELL.com.Nav.Builders.masthheadModelBuilder.model = DELL.com.Nav.Builders.masthheadModelBuilder.build(menuBars, pbar, mda, cart, segmentTitle);
    DELL.com.Nav.Builders.masthheadModelBuilder.model.contactUs = phoneTitleText + phoneMsgText;
    DELL.com.Nav.renderModel(DELL.com.Nav.Builders.masthheadModelBuilder.model);
    menuBars = {};
    pbar = {};
    cart = {};
    //console.timeEnd("writeMH");
}

var isCSS = false;
var isW3C = false;
var isIE4 = false;
var isNN4 = false;
var isIE6 = false;
var isGecko = false;
var isOpera = false;
var isDHTML = false;
var isSafari = false;
var suppressMenus = false;
var m_anchorClicked = false;
var pageSeg = getCookieKeyValue("lwp", "s");
var pageLang = getCookieKeyValue("lwp", "l");
var pageCnty = getCookieKeyValue("lwp", "c");
var pageCS = getCookieKeyValue("lwp", "cs");

function autoconfig() {
    if (document && document.images) {
        isCSS = (document.body && document.body.style) ? true : false;
        isW3C = (isCSS && document.getElementById) ? true : false;
        isIE4 = (isCSS && document.all && readIEVer() >= 4.0) ? true : false;
        isNN4 = (document.layers) ? true : false;
        isGecko = (isCSS && navigator && navigator.product && navigator.product == "Gecko");
        isOpera = (isCSS && navigator.userAgent.indexOf("Opera") != -1);
        isSafari = (isCSS && navigator.userAgent.indexOf("Safari") != -1);
        isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
        isIE6 = (isIE6CSS && readIEVer() >= 6.0);
        isDHTML = isCSS && (isIE4 || isGecko || isOpera);
        if (suppressMenus) {
            isDHTML = false;
        }
        else if (isOpera && readOperaVer() < 7) {
            isDHTML = false;
        }
        else if (isGecko && navigator.productSub <= 20011022) {
            isDHTML = false;
        }
        else if (isGecko && navigator.productSub == 20030107) {
            var x = navigator.userAgent.indexOf("AppleWebKit");
            if (x > -1) {
                isDHTML = (navigator.userAgent.substring(x + 12, x + 15)) > 300;
            }
            else {
                isDHTML = false;
            }

        }
        m_stormCookie = new StormCookie();
    }
}

function readIEVer() {
    var agent = navigator.userAgent;
    var offset = agent.indexOf("MSIE");
    if (offset < 0) {
        return 0;
    }
    return parseFloat(agent.substring(offset + 5, agent.indexOf(";", offset)));
}

function readOperaVer() {
    var agent = navigator.userAgent;
    var offset = agent.indexOf("Opera");
    if (offset < 0) {
        return 0;
    }
    return parseFloat(agent.substring(offset + 6));
}

function createNavLink(url, tab) {
    var link = null;
    var patt = /^htt(p|ps):\/\//gi;
    var patt2 = /^javascript/i;
    if (url != null) {
        if (url.match(patt) || url.match(patt2)) {
            link = url;
        }
        else {
            link = m_regionDomain + url;
        }
    }
    return link;
}


function renderCountrySelector($el) {
    if ((typeof m_IsAuthPremier != 'undefined' && m_IsAuthPremier == true) || (typeof m_isRcomm != 'undefined' && m_isRcomm == true)) return; //premier masthead
    var selectorModel = DELL.com.Nav.Builders.ctrySelBuilder.build(),
        ctrySelector = '<div class=\"ctrySel\">';

    if (selectorModel.flagImgSrc != null)
        ctrySelector += '<img width="18" height="11" alt="' + selectorModel.curCountry + '" src="' + selectorModel.flagImgSrc + '" class="flag"\><br/>';
    ctrySelector += '<div class="ctry"><a onclick="javascript:localeMenuToggle();" onmouseout="javascript:delayLocaleMenuToggle();" onmouseover="javascript:localeMenuToggleDelayClear();" class="ctryName">' + selectorModel.curCountry + '<span class="ctryArrow"></span></a>';
    ctrySelector += '<div id="ctryTtip" onmouseout="javascript:delayLocaleMenuToggle();" onmouseover="javascript:localeMenuToggleDelayClear();"><div class="mhTTip" rel=""><div class="mhTTip-vp">' + selectorModel.countries + '</div></div></div></div>';
    //if (selectorModel.multiLang && langSel)
    //    ctrySelector += '<div class="langSel">' + selectorModel.languages.html() + '</div>';
    ctrySelector += '</div>';

    if ($el)
        $el.append(ctrySelector);
    else
        document.write(ctrySelector);

    /* Event binding */
    selectorModel.onChange();
}

var _localeMenuToggleDelay = null;
function localeMenuToggle(state) {
    var top, selOffset, offset, selHeight, tipHeight, tTipHeight, tTipOffset, tTipvpHeight, tTipvpOffset;
    var ctrTtip = document.getElementById("ctryTtip"),
        cn = ctrTtip.className;

    if (ctrTtip.className != '') {
        top = getScrollTop(); selOffset = $("#ctryTtip select").offset().top; offset = $("#ctryTtip").offset().top;
        tTipOffset = $("#ctryTtip .mhTTip").offset().top; tTipvpOffset = $("#ctryTtip .mhTTip-vp").offset().top;
        selHeight = $("#ctryTtip select").outerHeight(); tipHeight = $("#ctryTtip").outerHeight(); tTipHeight = $("#ctryTtip .mhTTip").outerHeight(); tTipvpHeight = $("#ctryTtip .mhTTip-vp").outerHeight();
    }

    if (typeof state !== 'undefined') {
        ctrTtip.className = !state ? "" : "active";
        if (!state)
            return;
    } else {
        ctrTtip.className = (cn.indexOf("active") > -1) ? "" : "active";
    }

    if (ctrTtip.className != '') {
        top = getScrollTop(); selOffset = $("#ctryTtip select").offset().top; offset = $("#ctryTtip").offset().top;
        tTipOffset = $("#ctryTtip .mhTTip").offset().top; tTipvpOffset = $("#ctryTtip .mhTTip-vp").offset().top;
        selHeight = $("#ctryTtip select").outerHeight(); tipHeight = $("#ctryTtip").outerHeight(); tTipHeight = $("#ctryTtip .mhTTip").outerHeight(); tTipvpHeight = $("#ctryTtip .mhTTip-vp").outerHeight();
    }

    if (top > selOffset && selOffset < 0) {
        $("#ctryTtip").height(tipHeight + offset - 22);
        $("#ctryTtip select").height(selHeight + selOffset - 42);
        $("#ctryTtip .mhTTip").height(tTipHeight + offset - 22);
        $("#ctryTtip .mhTTip-vp").height(tTipvpHeight + offset - 22);
    }
    else {
        $("#ctryTtip").height(tipHeight);
        $("#ctryTtip select").height(selHeight);
        $("#ctryTtip .mhTTip").height(tTipHeight);
        $("#ctryTtip .mhTTip-vp").height(tTipvpHeight);
    }
    //Auto-scroll test
    //var $cs = $("#ctryTtip select"), $cso = $("#ctryTtip select").find('option:selected');
    //$cs.scrollTop($cs.scrollTop() + ($cso.offset().top - $cs.offset().top));
}
function getScrollTop() {
    if (typeof pageYOffset != 'undefined') {
        return pageYOffset;
    }
    else {
        var b = document.body; //IE 'quirks'
        var d = document.documentElement; //IE with doctype
        d = (d.clientHeight) ? d : b;
        return d.scrollTop;
    }
}
function delayLocaleMenuToggle() {
    localeMenuToggleDelayClear();
    _localeMenuToggleDelay = setTimeout("localeMenuToggle(false)", 500);
}
function localeMenuToggleDelayClear() {
    if (_localeMenuToggleDelay) {
        clearTimeout(_localeMenuToggleDelay);
        _localeMenuToggleDelay = null;
    }
}

function menuRef(id, text, href, items, target) {
    menuRef(id, text, href, items, target, false)
}
function menuRef(id, text, href, items, target, selected, column) {
    this.Id = id;
    this.Text = text;
    this.Href = mhFixupLink(href, "&~ck=mn");
    this.IsSeparator = false;
    this.IsCaption = false;
    this.MenuItems = items;
    this.IsSelectedTab = false;
    this.Column = column;
    if (selected == true) {
        this.IsSelectedTab = true;
    }
    this.OffDell = false;
    this.Target = m_stdEmpty;
    if ((typeof (target) != "undefined") && target) {
        this.OffDell = (target == "offdell");
        this.Target = target;
    }
}
function menuItem(text, href, target, icon, column) {
    this.Text = text;
    this.Href = mhFixupLink(href, "&~ck=mn");
    this.IsSeparator = false;
    this.IsCaption = false;
    this.IconUrl = icon;
    this.MenuItems = null;
    this.Column = column;
    this.OffDell = false;
    this.Target = m_stdEmpty;
    if ((typeof (target) != "undefined") && target) {
        this.OffDell = (target == "offdell");
        this.Target = target;
    }
}
function menuCaption(text) {
    this.Text = text;
    this.Href = null;
    this.IsSeparator = false;
    this.IsCaption = true;
    this.MenuItems = null;
}
function menuSep() {
    this.IsSeparator = true;
    this.IsCaption = false;
}

function mhLink(text, href, icon, extra, isFilter) {
    href = mhFixupLink(href, extra);
    this.Text = text;
    this.Href = href;
    this.Icon = icon;
    this.IsFilter = isFilter;
}

function updateTotalCartItemsAjax() {
    AsyncXDomainIframeCall(m_pbarPfx + "/pbar/ajax.aspx?~psc=cart", updateTotalCartItemsAjaxCallback);
}

function updateTotalCartItemsAjaxCallback(event) {
    if (event.Status = "OK" && event.Response != "false" && event.Response.length > 0) {
        var link = document.createElement("div");
        link.innerHTML = event.Response;
        try {
            cartItems = false;
            var divs = link.getElementsByTagName("div");
            for (var i = 0; i < divs.length; i++) {
                if (divs[i].className == "cartItems") {
                    var totalSpan = divs[1].getElementsByTagName("span")[1];
                    if (totalSpan) {
                        var totalValue = totalSpan.innerHTML.toString();
                        totalValue = totalValue.substr(0, totalValue.length - 1);
                        updateTotalCartItems(totalValue);
                    }
                    var cartItems = true;
                }
            }
            if (!cartItems) {
                updateTotalCartItems(0);
            }
        }
        catch (ex)
        { }
    }
}

function updateTotalCartItems(value) {
    if (value != null && value != undefined) {
        var link = document.getElementById("totalcartitems");
        if (link != null && value == 0) {
            link.className = "";
            link.innerHTML = "";
            link.parentNode.style.paddingRight = "0";
        }
        else if (link != null && value < 10) {
            link.className = "cartCount";
            link.innerHTML = value;
            link.parentNode.style.paddingRight = "22px";
        }
        else if (link != null && value >= 10) {
            link.className = "cartCountLarger";
            link.innerHTML = value;
            link.parentNode.style.paddingRight = "25px";
        }
    }
}

var delayMin = null;
var delayMax = null;
var currentID = null;
function flyoutopen(id, width) {
}

var doneGrowing = false;
var toolboxHeight = 0;
// called to initiate growing an element
function growIt(id) {
}

// inner loop for growing an object
function doGrow(body) {
}

var doneShrinking = false;

// called to initiate shrinking an element
function shrinkIt(id, clear) {
}

var isclosing = false;

// inner loop for shrinking an object
function doShrink(id, clear) {
}

function flyoutclear() {
}
function flyoutminclear() {
}
function flyoutmaxclear() {
}

var focusFound = false;
function FireOnFocus(e) {

    focusFound = true;
}

function FireOnBlur(e) {
    focusFound = false;
}

function flyoutmin(id) {
}



var inflyoutmax = false;

function flyoutmax(id, width) {
}
function flyoutclose(id, clear) {
}

function pbarstripajax(event) {
    if (event.Status == "OK" && event.Response != "false" && event.Response.length > 0) { // OK we have the cookie set so lets get the new values for the first render
        m_pbarMA.IsAuthenticated = getCookie("GAAuth") ? true : false;
        m_pbarMA.IsCookied = getCookie("chm:TP") ? true : false;
        m_pbarMA.FirstName = m_pbarMA.IsCookied ? getCookieKeyValue("chm:TP", "fn", true) : m_pbarMA.FirstName;
        renderPbarStrip();
    }
}
function pbarnavajax(event) {

    if (event.Status = "OK" && event.Response != "false" && event.Response.length > 0) {
        link = getRawObject("subnav");
        link.innerHTML = event.Response;
        bindMastHeadFlyouts();
    }
}
function pbarcontentajax(event) {
    if (event.Status = "OK" && m_pbarContentDiv && event.Response != "false" && event.Response.length > 0) {
        if (m_id == "cart") {
            link = getRawObject(m_pbarContentDiv);
            link.innerHTML = event.Response;
            try {
                var divs = link.getElementsByTagName("div");
                for (var i = 0; i < divs.length; i++) {
                    if (divs[i].className == "productImage") {
                        var imgUrl = divs[i].getElementsByTagName("img")[0].src;
                        var pos = imgUrl.indexOf("op=");
                        if (pos > -1) {
                            var imageID = imgUrl.substring(pos + 3, imgUrl.length);
                            divs[i].getElementsByTagName("img")[0].src = "http://accessories.us.dell.com/sna/images/products/thumbnail/" + imageID + ".jpg";
                            "http://accessories.us.dell.com/sna/images2/resize.aspx/" + imageID;
                        }
                    }
                    if (divs[i].className == "productDesc") {
                        var proddiv = divs[i];
                        var dspan = proddiv.getElementsByTagName("span")[1];
                        if (dspan.innerHTML == "0.00") {
                            dspan.style.display = "none";
                            var zeroDisc = new String(proddiv.innerHTML.replace(/<BR>/i, ""));
                            proddiv.innerHTML = zeroDisc;
                        }
                    }
                }
            }
            catch (ex)
            { }
            m_cartPages[m_cartPages.length] = link.innerHTML;
            var cartBody = getRawObject(m_pbarContentDiv);
            cartBody.style.height = "1px";
            cartBody.style.overflow = "hidden";

            cartBody.style.height = cartBody.scrollHeight;
            ContainerHeight = cartBody.scrollHeight;

            if (ispaging == false) {
                growIt("cart");
            }
        }

    }

}

function tabcontentajax(event) {
    if (event.Status = "OK" && m_tabContentDiv && event.Response != "false" && event.Response.length > 0) {
        link = getRawObject(m_tabContentDiv + "content");
        link.innerHTML = event.Response;
    }
}
var ispaging = false;

function cartPaging(idx) {
    try {
        ispaging = true;
        if (typeof (m_cartPages[idx]) != "undefined") {
            link = getRawObject(m_pbarContentDiv);
            link.innerHTML = m_cartPages[idx];
            var cartBody = getRawObject(m_pbarContentDiv);
            cartBody.style.height = "1px";
            cartBody.style.overflow = "hidden";
            cartBody.style.height = cartBody.scrollHeight;
            ContainerHeight = cartBody.scrollHeight;

        }
        else {
            var content = "cart";
            if (m_pbarContentDiv.indexOf("flyout") >= 0) {
                content = m_pbarContentDiv.substring(6, m_pbarContentDiv.indexOf("body"));
            }
            if (m_pbarContentDiv.indexOf("mh_") >= 0) {
                content = m_pbarContentDiv.substring(3, m_pbarContentDiv.indexOf("content"));
            }

            AsyncXDomainIframeCall(m_pbarPfx + "/pbar/ajax.aspx?~psc=" + content + "&~cix=" + idx, pbarcontentajax);
        }

        //		        var cartBody = getRawObject( m_pbarContentDiv );
        //		        alert(cartBody.scrollHeight);

    }
    catch (e)
    { }
}
function maLogout() {
    for (formIdx = 0; formIdx < document.forms.length; formIdx++) {
        if ("myaccountlogout" == document.forms[formIdx].name) {
            var curUrl = document.location.href;
            var logOutIdx = curUrl.indexOf("&~myaccountlogin=true");
            if (logOutIdx > -1) {
                document.forms[formIdx].action = curUrl.substring(0, logOutIdx);
            }
            document.forms[formIdx].submit();
        }
    }
}

function maLinkLogout() {
    try {
        document.cookie = "chm:TP=" + escape("null") + ";path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;domain=.dell.com";
        document.cookie = "Profile=" + escape("null") + ";path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;domain=.dell.com";
        document.cookie = "GAHot=" + escape("null") + ";path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;domain=.dell.com";
        var pbarurl = m_pbarPfx;
        if (pbarurl == undefined || pbarurl.length == 0) {
            pbarurl = "http://pbar.us.dell.com";
        }
        var url = pbarurl + "/pbar/login.aspx?~logout=true";
        $.getScript(url, logoutajax);
    }
    catch (e)
    { }
}

function logoutajax(event) {
    window.location.reload();
}

function maLink(href) {
    window.parent.location = href;
}
function maEnterSubmit(event) {
    if (event && event.which == 13 || event.keyCode == 13)
        maLoginValidation();
    else
        return true;
}
function maLoginValidation() {
    var myAccntLogin = "myaccountlogin";
    for (formIdx = 0; formIdx < document.forms.length; formIdx++) {
        if (myAccntLogin == document.forms[formIdx].name) {
            myAccntLogin = document.forms[formIdx];
            break;
        }
    }
    var email = myAccntLogin.email;
    var emailDiv = document.getElementById("emailDiv");
    var password = myAccntLogin.password;
    var passwordDiv = document.getElementById("passwordDiv");
    if (email.value.length != 0 && password.value.length != 0) {
        var actionUrl = document.location.href;
        try {
            myAccntLogin.submit();
        }
        catch (e) {
            //alert(e);
        }
    }
    else {
        emailDiv.style.display = "none";
        passwordDiv.style.display = "none";
    }
    if (email.value.length == 0) {
        emailDiv.style.display = "block";
    }
    if (password.value.length == 0) {
        passwordDiv.style.display = "block";
    }
    if (email.value.length == 0 || password.value.length == 0) {
        try {

            window.parent.setMAIframeHeight(document.getElementById("myaccountpage").offsetHeight);
        }
        catch (e)
        { }
    }
}

function ToolBox(caption, menuItems, width, iconUrl) {
    this.Caption = caption;
    this.MenuItems = menuItems;
    this.IconUrl = iconUrl;
    this.Width = width;
    this.Render = ToolBoxRender;
}

function renderToolBox() {
    if (m_toolBoxLinks != undefined) {
        try { document.write(m_toolBoxLinks.Render()); }
        catch (ex) {
            //alert(ex);
        }
    }
}

function retRenderToolBox() {
    if (m_toolBoxLinks != undefined) {
        try { m_toolBoxRender = m_toolBoxLinks.Render(); }
        catch (ex) {
            //alert(ex);
        }
    }
}

function ToolBoxRender() {
    var nav;
    m_LoadingCaption = this.LoadingCaption;
    nav = "<td valign=\"top\"><div id=\"flyouttoolboxlink\" class=\"fotoolboxlinkmin\" onmouseout=\"javascript:flyoutmin('toolbox')\" onmouseover=\"javascript:flyoutmax('toolbox', " + this.Width + ")\" >"
	    + "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>"
        + "<td nowrap=\"true\"><span class=\"toolboxcaption\">" + this.Caption + "</span></td>"
        + "</tr></table></div><div id=\"flyouttoolboxoffset\" class=\"fotoolboxoffsetmin\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"1\" /></div>"
	    + "<div style=\"width:" + this.Width + "px;\" id=\"flyouttoolboxbody\" name=\"flyouttoolboxbody\" class=\"fotoolboxbodymin\" onmouseout=\"javascript:flyoutmin('toolbox')\" onmouseover=\"javascript:flyoutclear()\"><div style=\"padding:10px;\">";
    if (this.MenuItems != null && this.MenuItems.length > 0) {
        for (var i = 0; i < this.MenuItems.length; i++) {
            if (this.MenuItems[i].IsSeparator) {
                nav += "<div class=\"toolbox_divide\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" height=\"5\" /></div>";
            }
            else if (this.MenuItems[i].IsCaption) {
                nav += "<div class=\"toolbox_caption\">" + this.MenuItems[i].Text + "</div>";
            }
            else {

                if (this.MenuItems[i].MenuItems != null && this.MenuItems[i].MenuItems.length > 0) {
                    // Expand +/- Link
                    nav += "<a href=\"#\" onclick=\"toolBoxToggle('" + i + "', event||window.event);\"><div id=\"tnav_" + i + "\" class=\"toolbox_link_expand\">" + this.MenuItems[i].Text + "</div></a><div id=\"tnav_" + i + "_sub\" style=\"display:none;\">";
                    for (var s = 0; s < this.MenuItems[i].MenuItems.length; s++) {
                        // No icon sub links
                        nav += "<a  href=\"" + this.MenuItems[i].MenuItems[s].Href + "\"" + this.MenuItems[i].MenuItems[s].TargetHtml + "\"><div class=\"toolbox_link_sub\">" + this.MenuItems[i].MenuItems[s].Text;
                        if (this.MenuItems[i].MenuItems[s].OffDell) {
                            nav += m_stdOffImg;
                        }
                        nav += "</div></a>";
                    }
                    nav += "</div>";
                }
                else {
                    // Normal Arrow Link
                    nav += "<a  href=\"" + this.MenuItems[i].Href + "\"" + this.MenuItems[i].TargetHtml + "\"><div class=\"toolbox_link\">" + this.MenuItems[i].Text;

                    if ((this.MenuItems[i].Href.indexOf("basket.aspx")) >= 0) {
                        m_premierCartLink = this.MenuItems[i].Href;
                    }

                    if ((this.MenuItems[i].Href.indexOf("logout.aspx")) >= 0) {
                        m_premierLogoutLink = this.MenuItems[i].Href;
                    }

                    if (this.MenuItems[i].OffDell) {
                        nav += m_stdOffImg;
                    }
                    nav += "</div></a>";
                }
            }
        }
    }
    nav += "</div></div></td>";

    return nav;
}

/* Handle the storm modal show calls from pbar (ex. quick links > change profile for premier.dell.com) */
var stormModal = window.stormModal || {};
(function ($) {
    (function () {
        continueMap = null; /* Continue link for after login authentication */

        loginRequired = function (map) {
            if (map.authLevel && map.authLevel > _curAuthLevel) {
                return true;
            }
            return false;
        };

        this.showLogin = function (map) {
            var lvl = 3;
            var sep = (m_login_url.indexOf('?') > -1) ? '&' : '?';
            if (map.authLevel) {
                lvl = map.authLevel;
            }

            if (lvl > _curAuthLevel || map.swaplogin) {
                var lwp = DELL.com.Utils.getLWP();

                if (typeof lwp == "undefined" || lwp == "undefined" || lwp.length == 0)
                    lwp = getLwp();
                var url = m_login_url;
                if (map.swaplogin) {
                    if (m_login_url.indexOf('showsocialsignin=true') == -1) {
                        var pbarurl = m_pbarPfx;
                        if (pbarurl == undefined || pbarurl.length == 0) {
                            pbarurl = "http://pbar.us.dell.com";
                        }
                        url = pbarurl + url + sep + "level=" + lvl + lwp + '&swapLogin=' + map.swaplogin;
                    } else {
                        url += map.swaplogin;
                    }
                } 
                var lwidth = 320;
                var lheight = 350;
                if (map.height) {
                    lheight = map.height;
                }

                if (map.width) {
                    lwidth = map.width;
                }

                var caption = "Login";
                if (map.title) {
                    caption = map.title;
                }
                var map = { href: url, height: lheight, width: lwidth, title: caption, elm: this };
                this.show(map, true);
            }
        };

        this.show = function (map, forlogin) {
            if (typeof map === 'undefined')
                return;

            if (!forlogin) {
                this.continueMap = null;
            }

            if (loginRequired(map) || map.swaplogin) {
                this.continueMap = map;
                this.showLogin(map);
                this.continueMap.swaplogin = false;
                this.continueMap.top = true;
                return;
            }
            if (map.top) {
                window.location.href = map.href;
                return false;
            }

            var mLink = $("#stormModal");
            if ($(mLink).length == 0) {
                mLink = $(document.createElement("a")).attr("id", "stormModal").addClass("hide");
                $("body").append(mLink);
            }
            mLink.attr({
                href: map.href ? map.href : '',
                title: map.title ? map.title : '',
                rel: ("&modalwidth=" + (map.width ? map.width : '') + "&modalheight=" + (map.height ? map.height : '') + "&ovropac=0&modalscroll=no&modaltype=BOX&position=center")
            });
            if (typeof DELL.com.ModalWindow !== "undefined") {
                //Map stormModal.show calls to the NextGen modal
                //javascript:stormModal.show({title:'Select Another Account', href:' http://premier.dell.com/portal/start.aspx' , authLevel:4, top:'true', height:'425', width:'450',swaplogin:'true'})
                //new DELL.com.ModalWindow({ "id": "someID", "position": "top", "url": u, "title": modalTitle, "width": "400", "height": "150", "ovropac": "0", "ovrcolor": "#ffffff", "scroll": "yes" });
                new DELL.com.ModalWindow(mLink);
            } else {
                //OLR Dialog/Modal
                if (typeof Dell.SharedControls !== "undefined" && typeof Dell.SharedControls.Dialog !== "undefined") {
                    var $dialog = Dell.SharedControls.Dialog.getDialog("modalDialog");
                    if ($dialog.length == 0) {
                        Dell.SharedControls.Dialog.createDialog("modalDialog", { IsIframe: true, Src: map.href, Height: parseInt(map.height), Width: parseInt(map.width), Size: 3 });
                        $dialog = Dell.SharedControls.Dialog.getDialog("modalDialog");
                    }
                    DELL.com.Utils.Modal.formatModal({ modaltype: "popup", showtitle: true, title: map.title }, $dialog, mLink);
                    Dell.SharedControls.Dialog.openDialog("modalDialog");
                }
            }
        };

        this.continueAuth = function () {
            if (this.continueMap != null) {
                var newMap = $.extend({}, this.continueMap);

                // redirect user to original URL
                setTimeout(function () { stormModal.show(newMap); }, 0);
                this.continueMap = null;
            } else {
                window.location.reload();
            }
        };

    }).call(stormModal);
})(jQuery);

function toolBoxToggle(id, e) {
    if (e.preventDefault)
        e.preventDefault();
    else
        e.returnValue = false;

    var nav = document.getElementById("tnav_" + id);
    var subnav = document.getElementById("tnav_" + id + "_sub");
    if (subnav.style.display == "none") {
        nav.className = "toolbox_link_collapse";
        subnav.style.display = "inline";
    }
    else {
        nav.className = "toolbox_link_expand";
        subnav.style.display = "none";
    }
    var body = getRawObject("flyouttoolboxbody");

    body.style.height = "1px";
    if (!$.browser.msie) { body.style.overflow = "hidden" };
    body.style.height = body.scrollHeight + subnav.scrollHeight;
    ContainerHeight = body.scrollHeight + subnav.scrollHeight;
}

var ispaging = false;

function PbarCartStrip(caption, link, items, load, count, flyout) {
    this.Caption = caption;
    this.Link = link;
    this.ItemsCaption = items;
    this.LoadingCaption = load;
    this.Count = count;
    this.IsFlyout = flyout;
    this.Render = function () { };
}

function PbarMAStrip(captionCookied, captionAuth, captionUnauth, clearUser, auth, cookied, fname, lname, load, flyout, modaltitle, displayPrivacy, captionPrivacy) {
    this.IsAuthenticated = auth;
    this.IsCookied = cookied;
    this.FirstName = fname;
    this.LastName = lname;
    this.CaptionClearUser = clearUser;
    this.CaptionCookied = captionCookied;
    this.CaptionAuth = captionAuth;
    this.CaptionUnauth = captionUnauth;
    this.LoadingCaption = load;
    this.IsFlyout = flyout;
    this.ModalTitle = modaltitle;

    this.DisplayPrivacySettings = displayPrivacy;
    this.PrivacySettingsCaption = captionPrivacy;

    this.Render = function () { return ''; }; /*PbarMAStripRender;*/
}

function PbarMAStripPremier(captionCookied, captionAuth, captionUnauth, clearUser, clearUserLink, auth, cookied, fname, lname, load, flyout, modaltitle, displayPrivacy, captionPrivacy) {
    this.IsAuthenticated = auth;
    this.IsCookied = cookied;
    this.FirstName = fname;
    this.LastName = lname;
    this.clearUserText = clearUser;
    this.CaptionClearUser = clearUser;
    this.CaptionCookied = captionCookied;
    this.CaptionAuth = captionAuth;
    this.CaptionUnauth = captionUnauth;
    this.LoadingCaption = load;
    this.IsFlyout = flyout;
    this.ModalTitle = modaltitle;

    this.DisplayPrivacySettings = displayPrivacy;
    this.PrivacySettingsCaption = captionPrivacy;

    this.Render = function () { return ''; }; /*PbarMAStripRenderPremier;*/;
}

var isReady = false;

function getObjectHeight(obj) {
    return $(obj).height();
}
function getObjectsByTag(tag) {
    if (document.getElementsByTagName) {
        return document.getElementsByTagName(tag);
    }
    else if (document.all) {
        return document.all.tags(tag);
    }
    return null;
}

function mhFixupLink(href, extra) {
    if (typeof (extra) == "undefined") {
        extra = "&~ck=mn";
    }
    if (href) {
        var anchor = null;
        var anchorix = href.indexOf("#");
        if (anchorix != -1) {
            anchor = href.substr(anchorix);
            href = href.substr(0, anchorix);
        }
        if (href.indexOf("?") == -1) {
            extra = "?" + extra.substr(1);
        }
        if (href.toLowerCase().indexOf("javascript:") == -1) {
            href += extra;
        }
        else {
            start = href.indexOf("?");
            if (start != -1) {
                ix = href.indexOf("\'", start);
                if (ix == -1) {
                    ix = href.indexOf("\\", start);
                    if (ix == -1) {
                        ix = href.indexOf("\"", start);
                    }
                }
                if (ix != -1) {
                    href = href.substr(0, ix) + extra + href.substr(ix);
                }
            }
        }
        if (anchor) {
            href += anchor;
        }
    }
    return href;
}
function getRawObject(obj) {
    var theObj;
    if (typeof obj == "string") {
        if (isW3C) {
            theObj = document.getElementById(obj);
        }
        else if (isIE4) {
            theObj = document.all(obj);
        }
        else if (isNN4) {
            theObj = seekLayer(document, obj);
        }
        else {
            theObj = document.getElementById(obj);
        }
    }
    else {
        theObj = obj;
    }
    return theObj;
}

function menuGoto(url) {
    if (m_anchorClicked) {
        return;
    }
    m_anchorClicked = true;
    if (url != null && url.indexOf("javascript") > -1) {
        eval(url);
    }
    else {
        document.location = url;
    }
    if (document.event != null) {
        document.event.cancelBubble = true;
    }
    return false;
}
function menuWinOpen(url) {
    window.open(url);
    return false;
}

function winopen(url, stuff, morestuff) {
    var popwin = window.open(url, stuff, morestuff);
    if (typeof (popwin) != "undefined" && popwin) {
        popwin.focus();
    }
    lastPopup = popwin;
}

var _curAuthLevel = 0;
var _mwidth = 200;
var _mheight = 200;

function proccessAuthChange(level) {
    _curAuthLevel = level;
    //Close the ModalWindow
    $(".modalLoad").remove();
    $(".modalArrow").remove();
    $(".modalCeil").parent().remove();
    $(".modalOverlay").remove();
    // This is to update the pbar strip after logging in
    stormModal.continueAuth();
}

function getQueryVariable(variable, url) {
    var query = m_curUrl.substring(m_curUrl.indexOf("?") + 1, m_curUrl.length);
    if (url != null) {
        query = url.substring(url.indexOf("?") + 1, url.length);
    }
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}

function GetScreen() {
    try {
        this.Width = screen.width;
        this.Height = screen.height;
        this.AvailableWidth = screen.availWidth;
        this.AvailableHeight = screen.availHeight;
        this.ColorDepth = screen.colorDepth;
    } catch (err) {

        this.Width = 1024;
        this.Height = 768;
        this.AvailableWidth = 1024;
        this.AvailableHeight = 768;
        this.ColorDepth = 0;
    }
}

var m_framesAdded = false;
function AddHiddenFrames() {
    if (m_framesAdded) {
        return;
    }
    var df1 = document.getElementById("dataiframe_0");
    if (df1 != null) {
        m_framesAdded = true;
    }
    m_framesAdded = true;
    for (var i = 0; i < 10; i++) {
        var iframeObj = document.createElement("iframe");
        iframeObj.id = "dataiframe_" + i;
        iframeObj.style.border = '0px';
        iframeObj.style.width = '0px';
        iframeObj.style.height = '0px';
        iframeObj.src = "javascript:false;";
        var container = getRawObject("iframeContainer");
        if (container == null) {

            var container = document.createElement("div");
            container.id = "iframeContainer";
            container.style.position = "absolute";
            document.body.appendChild(container);

        }

        container.appendChild(iframeObj);
    }
}

var m_dataIframes = new Array();
var m_frameIdxs = new Array();
var m_frameIdx = 0;

function AsyncXDomainIframeCall(url, callback) {
    AddHiddenFrames();
    var iframeObj;
    for (n = 0; n < m_frameIdxs.length; n++) {
        if (m_frameIdxs[n] == url) {
            iframeObj = m_dataIframes[n];

        }
    }
    if (iframeObj == null) {
        if (m_frameIdx >= 10) {
            m_frameIdx = 0;
        }
        //alert(url);
        iframeObj = document.getElementById("dataiframe_" + m_frameIdx);
        m_dataIframes[m_frameIdx] = iframeObj;
        m_frameIdxs[m_frameIdx] = url;
        m_frameIdx++;
    }
    iframeObj.onload = function () { jasonCallback(iframeObj.id, callback); };
    iframeObj.onreadystatechange = function () { jasonCallback(iframeObj.id, callback); };

    var ticks = new Date();
    var urlTime = "ts=" + ticks.getSeconds() + ticks.getMilliseconds();
    if (url.indexOf("?") == -1) {
        url += "?";
    }
    else {
        url += "&";
    }
    setTimeout("NavigateFrame( '" + iframeObj.id + "','" + (url + urlTime) + "' )", 10);
}
function NavigateFrame(IFrameObj, URL) {
    IFrameObj = document.getElementById(IFrameObj);
    try {
        if (IFrameObj.contentDocument) {
            IFrameDoc = IFrameObj.contentDocument;
        } else if (IFrameObj.contentWindow) {
            IFrameDoc = IFrameObj.contentWindow.document;
        } else if (IFrameObj.document) {
            IFrameDoc = IFrameObj.document;
        } else {
            return true;
        }
        //console.log(IFrameDoc);
        IFrameDoc.location.replace(URL);
    }
    catch (e) {
        IFrameObj.src = URL;
    }
    return false;
}

function jasonCallback(id, callback) {
    var iframeObj = document.getElementById(id);
    //alert("id" + id);
    if (iframeObj.readyState == "complete" || typeof (iframeObj.readyState) == "undefined") {
        try {
            var thingie = new Object();
            var retval = null;
            var txt = null;
            try {
                if (iframeObj.contentDocument) {
                    thingie.Node = iframeObj.contentDocument.body;
                    txt = iframeObj.contentDocument.body.innerHTML;
                    if (txt == "false") {
                        return;
                    }
                }
                else if (iframeObj.contentWindow) {
                    var frmDoc = null;
                    try {
                        frmDoc = iframeObj.contentWindow.document;
                    }
                    catch (e) {
                        return;
                    }
                    thingie.Node = frmDoc.body;
                    txt = thingie.Node.innerHTML;
                }
                else if (iframeObj.document) {
                    thingie.Node = iframeObj.document.body;
                    txt = iframeObj.document.body.innerHTML;
                }
            }
            catch (e) {
                //alert(e);
                callback(thingie);

            }
            if (thingie.Node != null && thingie.Node.getElementsByTagName("pre").length > 0) {
                var jasonElm = thingie.Node.getElementsByTagName("pre")[0];
                eval(jasonElm.innerHTML);
                thingie.Status = "OK";
                thingie.Response = txt;
                thingie.JasonObj = retval;
                callback(thingie);
            }
            else if (txt.indexOf("var") == 0) {
                eval(txt);

                thingie.Status = "OK";
                thingie.Response = txt;
                thingie.JasonObj = retval;
                callback(thingie);
            }
            else {
                thingie.Status = "OK";
                thingie.Response = txt;
                callback(thingie);
            }
        }
        catch (e) {
            //alert("error" + e);
            thingie.Status = "NOTOK";
            thingie.Response = "";
            thingie.Error = e;
            callback(thingie);
        }
    }
}

function StringBuffer() {
    this.buffer = [];
}

StringBuffer.prototype.append = function append(string) {
    this.buffer.push(string);
    return this;
};

StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("");
};

function getLwp() {
    var cntr = "";
    var segm = "";
    var lang = "";
    var cs = "";

    var gotq = m_curUrl.split('?').length > 1;


    var lwp = new StringBuffer();
    if (cntr == null || cntr.length == 0) {
        cntr = getCookieKeyValue("lwp", "c");
    }
    if (segm == null || segm.length == 0) {
        segm = getCookieKeyValue("lwp", "s");
    }
    if (lang == null || lang.length == 0) {
        lang = getCookieKeyValue("lwp", "l");
    }
    if (cs == null || cs.length == 0) {
        cs = getCookieKeyValue("lwp", "cs");
    }
    if (cntr != null && cntr.length != 0) {
        lwp.append("&c=");
        lwp.append(cntr);
    }
    if (segm != null && segm.length != 0) {
        lwp.append("&s=");
        lwp.append(segm);
    }
    if (lang != null && lang.length != 0) {
        lwp.append("&l=");
        lwp.append(lang);
    }
    if (cs != null && cs.length != 0) {
        lwp.append("&cs=");
        lwp.append(cs);
    }
    return lwp.toString().split('#')[0];
}

function StripCookieValue(inVal, removeVal) {
    if (!inVal || inVal.length == 0 || !removeVal || removeVal.length == 0) {
        return inVal;
    }
    var idx = 0;
    var ampIdx = 0;
    var semiIdx = 0;
    var len = 0;
    var repString = "";
    idx = inVal.indexOf(removeVal);
    if (idx > -1) {
        ampIdx = inVal.indexOf("&", idx);
        semiIdx = inVal.indexOf(";", idx);
        len = ampIdx;
        if (len == -1) {
            len = semiIdx;
        }
        else if (semiIdx != -1 && semiIdx < len) {
            len = semiIdx;
        }
        if (len > -1) {
            repString = inVal.substring(idx, len);
        }
        else {
            repString = inVal.substr(idx);
        }
        return inVal.replace(repString, "").replace("&&", "&");
    }
    return inVal;
}

function getCookieKeyValue(cname, id, caseSensitive) {
    try {
        var offset = 1;
        var sid = id + "=";
        var sid1 = "?" + id + "=";
        var sid2 = "&" + id + "=";
        var lwp = getCookie(cname);
        var startIdx = 0;
        var endIdx = 0;
        var kvalue = null;
        if (lwp.indexOf(sid1) != -1) {
            sid = sid1;
            offset = 2;
        }
        if (lwp.indexOf(sid2) != -1) {
            sid = sid2;
            offset = 2;
        }
        if (lwp.indexOf(sid) == -1) {
            return null;
        }
        else {
            startIdx = lwp.indexOf(sid) + id.length + offset;
            if (lwp.substring(startIdx).indexOf("&") == -1) {
                return lwp.substring(startIdx);
            }
            else {
                endIdx = lwp.substring(startIdx).indexOf("&") + startIdx;
            }
        }
        kvalue = lwp.substring(startIdx, endIdx);
    }
    catch (e)
    { }
    if (caseSensitive == true) {
        return kvalue;
    }
    else {
        if (kvalue === null) return null;
        return kvalue.toLowerCase();
    }
}

function getCookie(NameOfCookie) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(NameOfCookie + "=");
        if (begin != -1) {
            begin += NameOfCookie.length + 1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = document.cookie.length;
            }
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return "";
}

function SetCookie(NameOfCookie, value) {
    SetCookieValue(NameOfCookie, value, false, true);
}
function SetCookieValue(NameOfCookie, value, persist, escaped) {
    var expires = "";
    if (persist == true) {
        expires = new Date();
        expires.setYear(expires.getYear() + 2);
        expires = expires.toGMTString();
    }
    document.cookie = NameOfCookie + "=" + (escaped == false ? value : escape(value)) + ";path=/;domain=dell.com;" + (persist == true ? ("expires=" + expires + ";") : "");
}

function StormCookie() {
    var STORMSCOOKIE = "StormSCookie";
    this.session = {
        cookieName: STORMSCOOKIE,
        cookieValue: getCookie(STORMSCOOKIE),
        setCookie: function (key, value) {
            var vals = getCookie(STORMSCOOKIE);
            var val = getCookieKeyValue(STORMSCOOKIE, key, true);
            if (val != value) {
                var idx = this.cookieValue.indexOf(key + "=" + val, 0);
                var amp = (idx == 0 || this.cookieValue.length == 0) ? "" : "&";
                if (idx == -1) {
                    SetCookieValue(STORMSCOOKIE, this.cookieValue + amp + key + "=" + value, false, false);
                }
                else {
                    SetCookieValue(STORMSCOOKIE, this.cookieValue.replace(amp + key + "=" + val, amp + key + "=" + value), false, false);
                }
                this.cookieValue = getCookie(STORMSCOOKIE);
            }
        },
        getCookie: function (key) {
            return getCookieKeyValue(STORMSCOOKIE, key, true);
        }
    }
    var STORMPCOOKIE = "StormPCookie";
    this.persistant = {
        cookieName: STORMPCOOKIE,
        cookieValue: getCookie(STORMPCOOKIE),
        setCookie: function (key, value) {
            var val = getCookieKeyValue(STORMPCOOKIE, key, true);
            if (val != value) {
                var idx = this.cookieValue.indexOf(key + "=" + val, 0);
                var amp = (idx == 0 || this.cookieValue.length == 0) ? "" : "&";
                if (idx == -1) {
                    SetCookieValue(STORMPCOOKIE, this.cookieValue + amp + key + "=" + value, true, false);
                }
                else {
                    SetCookieValue(STORMPCOOKIE, this.cookieValue.replace(amp + key + "=" + val, amp + key + "=" + value), true, false);
                }
                this.cookieValue = getCookie(STORMPCOOKIE);
            }
        },
        getCookie: function (key) {
            return getCookieKeyValue(STORMPCOOKIE, key, true);
        }
    }
}


function AsyncAddToCart(url, processingCaption, sku, editCaption, editUrl) {
    //set up div ... for waiting...
    var otrail = document.getElementById('processingCaptionID');
    otrail.innerHTML = "";
    $(document).bind('mousemove', followmouse);


    $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: url,
        complete: function (response) {
            if (response.status == 200) {
                hidetrail();
                if ($('#oneColumn').hasClass('candyAisle')) {
                    DELL.com.CandyAisle.UpdateCartSummary();
                }
                else {
                    //else just update the cart count and change the button to Edit cart
                    DELL.com.Cart.UpdateCart(url, sku, editCaption, editUrl);
                }
            }
        }
    });
}

function AddConfigToCart(orderCode, modelId, processingCaption, redirectURL) {
    var $link = $('div.configStackItem a[href*="javascript:AddConfigToCart (\'' + orderCode + '\'"]');
    if ($link.hasClass('disabled')) return;
    var otrail = document.getElementById('processingCaptionID');
    otrail.innerHTML = "";
    
    $(document).bind('mousemove', followmouse);
    var _maskHTML = "";
    _maskHTML += "<div class=\"modalOverlay\"><!--[if lte IE 6.5]><iframe class=\"ie6frameOverlay\"></iframe><![endif]--></div>";
    var $maskObj = $(_maskHTML);
    if ($('.modalWindowView').length > 0) {
        $('.modalWindowView').append(_maskHTML);
    } else {
        $maskObj.appendTo(DELL.com.Utils.Context.$BODY);
    }
    $maskObj.css({
        "width": "100%",
        "height": ($(document).height() + "px"),
        "background": "#808080",
        "opacity": "0.5",
        "filter": "alpha(opacity=50)",
        "-moz-opacity": "0.5"
    });

    $(".ie6frameOverlay").css({
        "width": "100%",
        "height": ($(document).height() + "px")
    });

    var cartItemId = $("#cartItemId").attr("value");
    if (typeof (cartItemId) == "undefined") {
        cartItemId = "";
    }

    var overrides = DELL.com.ProductHubModuleUpsell.GetOverrides();
    if (overrides.indexOf(orderCode + ":") < 0)
        DELL.com.ProductHubModuleUpsell.AddDefaultSelections(orderCode);

    overrides = DELL.com.ProductHubModuleUpsell.GetOrderCodeOverrides(orderCode);
    if ($(".mag").length > 0) {
        if ($("#magCompareTray, .plris #compareGrid").length > 0) {
            var colIndex = configCompareSlot + 1;
            if ($("#compareGrid th:nth-child(" + colIndex + ")").find(".overrides").length > 0)
                overrides = $("#compareGrid th:nth-child(" + colIndex + ")").find(".overrides").val();
        } else
            overrides = DELL.com.Mag.Utils.GetOrderCodeOverrides(orderCode);
    }


    //return false;
    var ps = DELL.com.Delphi.PageSettings;
    var params = "c=" + ps.lwp.Country
                        + "&l=" + ps.lwp.Language
                        + "&s=" + ps.lwp.Segment
                        + "&cs=" + ps.lwp.CustomerSet
                        + "&oc=" + orderCode
                        + "&id=" + cartItemId
                        + "&modelid=" + modelId
                        + "&overridehash=" + (overrides == null ? "" : encodeURIComponent(overrides));
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: ps.APIRoot + "cartservice.svc/postaddtocart/json",
        data: params,
        error: function (req) {
            AddToCartFinished(true);
        },
        success: function (req) {



            if (req.Success) {
                if (DELL.com.Delphi.PageSettings.mi.PageKey.indexOf(":candyaisle") == -1) {
                    //pass in the ordercode for non candy aisle pages
                    DELL.com.Utils.Metrics.trackAddToCartMetrics(orderCode);
                } else {
                    //DO NOT pass in the ordercode for non candy aisle pages (avoid OC from being tracked twice incorrectly)
                    DELL.com.Utils.Metrics.trackAddToCartMetrics(null);
                }

                if (redirectURL != null && redirectURL.length > 0) {
                    if (req.CartItemID != null && req.CartItemID.length > 0) {
                        redirectURL += "&id=" + req.CartItemID;
                    }
                    if (req.CartSubItemID != null && req.CartSubItemID.length > 0) {
                        redirectURL += "&SubItemID=" + req.CartSubItemID;
                    }
                    if (overrides != null)
                        redirectURL += "&ajxupdt=true";
                    else
                        redirectURL += "&ajxupdt=false";
                    redirectURL += (overrides == null ? "" : ("#overrides=" + orderCode + ":" + overrides));
                    document.location.href = redirectURL;
                }
                else {
                    AddToCartFinished(false);
                }
            }
            else {
                AddToCartFinished(true);
            }



        }
    });
}

function AddToCartFinished(error) {
    hidetrail();
    $(".modalOverlay").remove();
    $(".modelUpsellPrice .candyAisleLink").removeClass("disabled");
    $(".catContent input[type='radio']").removeAttr("disabled");

    if (error == true) {
        document.location.href = "http://www.dell.com/content/public/error.aspx?" + DELL.com.Delphi.PageSettings.lwp.UrlParams;
    }
}

function showAlert(errorMessage) {
    var $modOptionInput = $('.modelUpsellCallToAction');
    var offsetY = $modOptionInput.offset().top,
                offsetX = $modOptionInput.offset().left;
    var errMessage;
    if (typeof errorMessage != 'undefined' && errorMessage.length > 0)
        errMessage = errorMessage;
    else
        errMessage = DELL.com.Utils.Localize('synd_no_results');
    $(".customErrorAlert .customErrorMessage").html(errMessage);
    $(".customErrorAlert").removeClass("hide").css({ top: offsetY + 30, left: offsetX - 100 }).fadeIn(1000)
}

function closeCustomAlert() {
    $(".customErrorAlert").hide();
}

var cartcontent = null;
var totalcartquantity = 0;
var asyncCartObj = null;
var isaddingtocart = false;
function AsyncAddToCartCallback(rsp) {
    inflyoutmax = false;
    isaddingtocart = true;
    if (rsp.Status != "OK") {
        hidetrail();
        return;
    }
    else {
        hidetrail();
        var jasonCart = rsp.JasonObj;

        var relatedproductscontent = "";

        cartcontent = "<div id=\"pbarcontent\" name=\"carttemp\" class=\"pbarcontentcart\" style=\"width:350px;float:left;\">";

        if (jasonCart.Error) {
            cartcontent = cartcontent + " <div class=\"cartItems_error\">" + jasonCart.Error + "</div>";

        }
        else {
            var showRelatedProd = true;
            var caption = jasonCart.RelatedProductsCaption;

            if ((caption == null) || (jasonCart.RelatedProductsUrl == null)) {
                showRelatedProd = false;
            }
            else if (caption != null && (caption.length > 0)) {
                if (caption.substring(caption.length - 1) == " ") {
                    showRelatedProd = false;
                }
            }
            else {
                showRelatedProd = false;
            }

            if (showRelatedProd == true) {
                relatedproductscontent = "<div class=\"simpleButtonMODIFIED\" style=\"float:left;\"><a href=\"" + jasonCart.RelatedProductsUrl + "\" style=\"text-decoration:none\"><span name=\"silver_Btn\" class=\"silverBtn\"><div class=\"silverBtnLeft\">" +
                        "</div><div class=\"silverBtnMid\">" + jasonCart.RelatedProductsCaption + "</div><div class=\"silverBtnRight\"></div></span></a></div><div class=\"cartspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"248\" height=\"5\" border=\"0\" alt=\"\" /></div>";
            }


            cartcontent = cartcontent + " <div class=\"cartTopInfo\"><div class=\"cartItems_bold\">" + jasonCart.CartTopInfo + "</div></div>" +

                        "<div class=\"cartItem\">" +
                        "<div class=\"pbarspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" /></div>" +
                        "<div class=\"productImage\"><img src=\"" + jasonCart.Image + "\" width=\"40\" border=\"0\" alt=\"\" /></div>" +
                        "<div class=\"productDesc\"><span class=\"productTitle\" title=\"" + jasonCart.ShortDescription + "\">" + jasonCart.ShortDescription + "</span><br />" +
                       "</div>" +
                       "<div class=\"productPrice\" style=\"width:150px;\">" + jasonCart.Price + "</div>";


        }


        cartcontent = cartcontent + "<div style=\"clear:both;\"></div>" +
                       "<div class=\"productDivide\"></div>" +
                      "<div class=\"cartspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"320\" height=\"10\" border=\"0\" alt=\"\" /></div>" + relatedproductscontent +
                        "<div class=\"simpleButtonMODIFIED\" style=\"float:right;\"><a href=\"" + jasonCart.CartLinkUrl + "\"><span name=\"green_Btn\" class=\"greenBtn\"><div class=\"greenBtnLeft\">" +
                       "</div><div class=\"greenBtnMid\">" + jasonCart.CartLinkCaption + "</div><div class=\"greenBtnRight\"></div></span></a></div>" +
                        "<div class=\"simpleButtonMODIFIED\" style=\"float:left;\"><a href=\"javascript:CollapseOnContinueShopping('cart')\" style=\"text-decoration:none\"><span name=\"silver_Btn\" class=\"silverBtn\" style=\"\"><div class=\"silverBtnLeft\">" +
                        "</div><div class=\"silverBtnMid\" style=\"\">" + jasonCart.ContinueShoppingCaptoin + "</div><div class=\"silverBtnRight\"></div></span></a></div><div class=\"pbarspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"1\" height=\"1\" border=\"0\" alt=\"\" /></div>" +
                           "<div class=\"cartspacer\"><img src=\"" + m_imgPfx + "/images/global/general/spacer.gif\" width=\"300\" height=\"5\" border=\"0\" alt=\"\" /></div>" +
                       "</div>" +
                       "</div>";
        totalcartquantity = jasonCart.CartQuantity;

        InitOpenCartItem();

    }
}

function gettrailobj() {
    return $('#trailimageid');
}

function followmouse(e) {
    var xcoord = offsetfrommouse[0];
    var ycoord = offsetfrommouse[1];
    if (typeof e != "undefined") {
        xcoord += e.pageX;
        ycoord += e.pageY;
    }
    else if (typeof window.event != "undefined") {
        xcoord += truebody().scrollLeft + event.clientX;
        ycoord += truebody().scrollTop + event.clientY;
    }
    var docwidth = document.all ? truebody().scrollLeft + truebody().clientWidth : pageXOffset + window.innerWidth - 15;
    var docheight = document.all ? Math.max(truebody().scrollHeight, truebody().clientHeight) : Math.max(document.body.offsetHeight, window.innerHeight);
    if (xcoord + trailimage[1] + 3 > docwidth || ycoord + trailimage[2] > docheight)
        gettrailobj().css({ display: "none" });
    else
        gettrailobj().css({ display: "" });

    var cssObj = {
        left: xcoord + "px",
        top: ycoord + "px",
        visibility: "visible"
    };
    gettrailobj().css(cssObj);

}

function truebody() {
    return (!window.opera && document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
}


var trailimage = ["", 100, 99];  //image path, plus width and heigh
var offsetfrommouse = [10, -20];  //image x,y offsets from cursor position in pixels. Enter 0,0 for no offset
var displayduration = 1;  //duration in seconds image should remain visible. 0 for always.

function hidetrail() {
    gettrailobj().css({ visibility: "hidden" });
    $(document).unbind('mousemove', followmouse);

}

function InitOpenCartItem() {

    m_cartPages = new Array();

    if (inflyoutmax) {

        return;
    }

    if (isbloated == false) {
        if (isaddingtocart) {
            var cartDiv = getRawObject("flyoutcartbody");

            cartDiv.innerHTML = "";

            m_pbarContentDiv = null;
            currentID = null;
            m_cartPages = new Array();
            if (!($(".candyAislePageContainer").length > 0)) {
                scroll(0, 0);
            }
            flyoutmax('carttemp', '350');
            isaddingtocart = false;
        }

    }
    else {
        if (isaddingtocart) {
            CollapseOnContinueShopping("cart");
            isbloated = true;
            setTimeout("InitOpenCartItem()", 250);
        }

    }
}

function CollapseOnContinueShopping(id) {

    flyoutmaxclear();
    delayMin = setTimeout("shrinkIt('" + id + "',true)", 0);
}

function gettrailobj() {
    return $('#trailimageid');
}

/* OLR Ensighten Link */
function EnsightenLink() {
    this.Render = EnsightenLinkRender;
}
function EnsightenLinkRender() {
    var content;
    content = "<td id=\"stormPbar\"><span class=\"privacysettingslinkcontainer\"><a class=\"privacysettingslink\" href=\"#\"></a></span></td>";
    return content;
}

function fitContextualFooterLinks5col() {
    var numCols = $('#revidFooter .contextualFooterLinks5col').length;
    (numCols == 5) ? $('#revidFooter .contextualFooterLinks5col').addClass('compressed') : $('#revidFooter .contextualFooterLinks5col').removeClass('compressed');
}

/* KO BASED MVVM based code for DELL.com.Nav */
/*global $ */

var DELL = window.DELL || {};
DELL.com = DELL.com || {};
DELL.com.Nav = (function ($, window, document, undefined) {
    var pub = {},
        $tr1 = null,
        curSel = null,
        cur2Sel = null,
        generator = ($("meta[name$=enerator]").length > 0) ? $("meta[name$=enerator]").attr("content").toLowerCase() : ""; //Check generator for page type
    mhModel = {},
        mhStorm = (generator.indexOf('storm content') != -1), //Storm page
        mhNGen = (generator.indexOf('ng content') != -1), //NextGen page
        mhLearn = (!mhStorm && !mhNGen), //Learn page
        mhHome = false, //Homepage masthead
        mhPopup = false, //popup masthead
        mhFlat = false, //flat masthead
        mhMyAccount = false, //my account masthead
        mhPremier = false; //Premier masthead

    /* TIMER CHECKS - TEMPORARY */
    var timer = {
        tmrs: {},
        start: function (tn) {
            timer.tmrs[tn] = { st: new Date().getTime() };
        },
        end: function (tn) {
            if (timer.tmrs[tn]) {
                timer.tmrs[tn].end = new Date().getTime();

                if (window.console && typeof window.console.log !== 'undefined') {
                    timer.tmrs[tn].total = timer.tmrs[tn].end - timer.tmrs[tn].st;
                    console.log('timer: ' + tn + ' (' + timer.tmrs[tn].total + ')');
                }
            }
        }
    };
    pub.timers = timer.tmrs;
    timer.start('DELL.com.Nav');

    /* START MODEL DEFINITIONS */
    var Models = {
        Masthead: function () {
            this.contactUs = '';
            this.closeLabel;
            this.name;
            this.search;
            this.navigation;
            this.cart;
            this.mda;
            this.bcrumbs;
            this.pbar;
            this.premier;
            this.templates;
            this.bindEvents = Events.tierNav;
            this.isPopup = false;
            this.isHome = false;
            this.logoLink;
            this.css;
            this.imageDomain;
        },

        Templates: function () {
            this.cart = "<script type=\"text/html\" id=\"showCart-template\"><div class=\"mhCart\" data-bind=\"template: { afterRender: cart.updateCount, data: cart }\"><a id=\"mhCart\" data-bind=\"attr: { href: url, title: caption }\"><span id=\"totalcartitems\"><\/span><\/a><\/div><\/script>";
            this.search = "<script type=\"text/html\" id=\"showSearch-template\"><form class=\"mhSearch\" name=\"search\" method=\"get\" data-bind=\"template: { afterRender: search.bindAuto, data: search }, attr: { action: search.actionUrl }\"><div data-bind=\"foreach: hiddenFields\"><input type=\"hidden\" data-bind=\"attr: { name: name, value: value }\"><\/input><\/div><input type=\"text\" id=\"searchinput\" size=\"20\" name=\"k\" value=\"\" data-bind=\"attr: { 'data-placeholder': searchLabel }\"><\/input><button type=\"submit\" data-bind=\"html: searchButtonLabel\"><\/button><\/form><\/script>";
            this.viewAll = "<script type=\"text/html\" id=\"viewAll-template\"><a href=\"#\" data-bind=\"attr: { href: url }, html: '<span class=\\'label\\'>' + viewAll + '<\/span><span class=\\'icon\\'><\/span>'\"><\/a><\/script>";
            this.ptool = "<script type=\"text/html\" id=\"ptoolHasLink-template\"><a data-bind=\"attr: { href: Url, target: Target, 'class': Icon }\"><span class=\"icon\" data-bind=\"if: ShowIcon\"><\/span><span data-bind=\"html: Text\"><\/span><\/a><\/script><script type=\"text/html\" id=\"ptoolHasNoLink-template\"><span data-bind=\"attr: { 'class': Icon }\"><span class=\"icon\" data-bind=\"if: ShowIcon\"><\/span><span data-bind=\"html: Text\"><\/span><\/span><\/script>";
            this.bcrumb = "<script type=\"text/html\" id=\"bCrumbHasLink-template\"><a data-bind=\"attr: { href: Url, target: Target, 'class': ($index() === bcrumb.length - 1) ? 'lnk_crumb43selected' : 'lnk_crumb43' }\"><span class=\"sep\"><\/span><span data-bind=\"text: Text\"><\/span><span data-bind=\"css: { rmvFilter: (IsFilter) }\"><\/span>&nbsp;<\/a><\/script><script type=\"text/html\" id=\"bCrumbHasNoLink-template\"><span data-bind=\"attr: { 'class': ($index() === $root.bcrumbs.length - 1) ? 'crumbsel43selected' : 'crumbsel43' }\"><span class=\"sep\"><\/span><span data-bind=\"text: Text\"><\/span><\/span><\/script>";
            this.pbarAuthMsg = "<script id=\"pbar-showAuthMsg-template\" type=\"text/html\"><div class=\"ctaMsg\" data-bind=\"html: logoutMsg\"><\/div><a class=\"maLink maAuth\" data-bind=\"text: firstName, attr: { href: maLink, title: modalTitle }\"><\/a><\/script><script id=\"pbar-noShowAuthMsg-template\" type=\"text/html\"><a class=\"maLink\" id=\"login\" data-bind=\"text: captionUnauth, attr: { href: loginLink, title: modalTitle, onclick: (mhNGen) ? '' : stormModal, name: (mhNGen === true && socialLogin === false) ? 'modalPopup' : '' }\" rel=\"modaltype=box&amp;position=center&amp;modalwidth=290&amp;modalheight=245&amp;ovrcolor=gray&amp;&amp;showtitle=true\"><\/a><\/script>";
            this.tier3 = "<script type=\"text/html\" id=\"tier3\"><ul data-bind=\"foreach: subNavigation, attr: { 'class': colClass }\"><li class=\"t3li\"><span data-bind=\"css: { separator: isSeparator }\"></span><div data-bind=\"'if': !isSeparator\"><ul><div data-bind=\"'if': (url != null)\"><li><a class=\"t3header\" data-bind=\"attr: { href: url, target: target }\"><strong data-bind=\"html: caption\"></strong></a></li></div><div data-bind=\"foreach: subNavigation\"><li><a data-bind=\"html: caption, attr: { href: url, target: target }\"></a></li></div></ul></div></li></ul></script>";
        },

        Pbar: function () {
            var _model = this;
            var sep = (m_login_url.indexOf('?') > -1) ? '&' : '?';
            this.userName = function () {
                return _model.firstName + " " + _model.lastName;
            };
            this.firstName;
            this.lastName;
            this.maLink = (typeof m_myAccountLink != 'undefined') ? m_myAccountLink : '';
            this.logoutLink = 'javascript:maLinkLogout();';
            this.loginLink = (typeof m_pbarPfx !== 'undefined' && typeof m_login_url !== 'undefined' && mhNGen) ? (m_pbarPfx + m_login_url) : _model.maLink;
            this.logoutMsg;
            this.isAuthenticated;
            this.showAuthMsg;
            this.isCookied;
            this.captionAuth;
            this.showMA = (typeof m_pbarTabTitle !== 'undefined' && m_pbarTabTitle != null && m_pbarTabTitle.length > 0);
            this.captionUnauth = _model.showMA ? m_pbarTabTitle : '';
            this.loadingCaption;
            this.modalTitle;
            this.stormModal;
            this.displayPrivacySettings;
            this.privacySettingsCaption;
            this.socialLogin;
        },

        Search: function () {
            this.searchLabel;
            this.searchButtonLabel;
            this.hiddenFields;
            this.searchInput;
            this.actionUrl;
            this.searchButton;
            this.bindAuto;
            this.showSearch;
            //this.segment;
            //this.country;
            //this.language;
            //this.companyNumber; //cs
            //this.category;
        },

        Premier: function () {
            this.storeTitle;
            this.isAuth;
            this.linkTxt;
            this.linkUrl;
        },

        Privacy: function () {
            this.showSettings;
            this.caption;
            this.onClick;
        },

        CountrySelector: function () {
            this.curCountry;
            this.countries;
            this.languages;
            this.multiLang;
            this.flagImgSrc;
            this.onChange;
        },

        StormMHLink: function () {
            this.Text;
            this.Url;
            this.NoLink;
            this.Icon;
            this.ShowIcon;
            this.IsFilter;
            this.Target;
            this.OffDell;
        },

        NavigationItem: function () {
            this.caption;
            this.url;
            this.target;
            this.containerId;
            this.isActive;
            this.subNavigation;
            this.parentContainerId;
            this.cssClass;
            this.colClass;
            this.isSeparator;
            this.viewAll;
        },

        Cart: function () {
            this.caption;
            this.url;
            this.itemsCaption;
            this.loading;
            this.count;
            this.isFlyout;
            this.updateCount = function (el) {
                /* Cart count */
                /* Commented out until NG removes similar/conflicting code. */
                //$(el).find('#totalcartitems').css('padding-right', '0');

                //if ($('#totalcartitems').text().length == 0 || $('#totalcartitems').text() == '0')
                //    $('#totalcartitems').hide();
                //else
                //    $('#totalcartitems').show();
            };
        }
    };
    /* END MODEL DEFINITIONS */

    /* START BUILDERS */
    var Builders = {
        Masthead: function () {
            this.build = function (menuBar, pbar, mda, cart, pTitle) {
                timer.start('Builders.Masthead');
                mhModel = new Models.Masthead();
                //set the toggles for the masthead variations
                mhModel.isHome = mhHome = (typeof m_isHome != 'undefined' && m_isHome == true); //Homepage masthead
                mhFlat = (typeof menuBar === 'undefined' || menuBar == null || menuBar.length == 0); //flat masthead (no tier nav)
                mhModel.isPopup = mhPopup = (typeof m_isPopupIntention != 'undefined' && m_isPopupIntention == true); //popup masthead
                mhPremier = ((typeof m_IsAuthPremier != 'undefined' && m_IsAuthPremier == true) || (typeof m_isRcomm != 'undefined' && m_isRcomm == true)); //premier masthead
                mhMyAccount = ((document.location.hostname.indexOf('ecomm') != -1 || document.location.hostname.indexOf('mylists') != -1) && document.location.href.toLowerCase().indexOf('/myaccount/'));

                mhModel.imageDomain = (typeof m_imgPfx !== 'undefined' && m_imgPfx != null && m_imgPfx.length > 0) ? m_imgPfx : 'http://i.dell.com';
                mhModel.closeLabel = typeof m_popClose !== 'undefined' && m_popClose.length > 0 ? m_popClose : '';
                mhModel.pbar = (pbar) ? pub.Builders.pbarBuilder.build(pbar) : [];
                mhModel.mda = (mda) ? mda : "";
                mhModel.search = pub.Builders.searchBuilder.build();
                mhModel.premier = pub.Builders.premierBuilder.build(pTitle);
                mhModel.privacy = pub.Builders.privacyBuilder.build();
                mhModel.bcrumbs = pub.Builders.bcrumbBuilder.build();
                mhModel.navigation = !(mhPopup || mhFlat) ? pub.Builders.navigationItemsBuilder.build(menuBar) : [];
                mhModel.cart = pub.Builders.cartBuilder.build(cart);
                if (mhModel.cart.showCart)
                    mhModel.cart.showCart = ((mhModel.navigation.length > 0) && !(mhHome || mhFlat));
                mhModel.ptools = pub.Builders.ptoolBuilder.build();
                mhModel.logoLink = (typeof m_homelink !== 'undefined') ? m_homelink : 'http://www.dell.com/';
                mhModel.templates = pub.Builders.templateBuilder.build(
                    mhModel.cart.showCart,
                    mhModel.search.showSearch,
                    (mhModel.ptools.length > 0),
                    (mhModel.bcrumbs.length > 0),
                    (mhModel.pbar)
                );

                mhModel.css = 'mhCommon';
                if (mhHome) {
                    mhModel.css = 'mhHome';
                } else if (mhPopup) {
                    mhModel.css = 'mhPopup';
                } else if (mhFlat) {
                    mhModel.css = 'mhFlat';
                }
                if (mhPremier) {
                    mhModel.css = 'mhPremier';
                    mhModel.pbar.showMA = false;
                    if (typeof m_premierLogoURL !== 'undefined' && m_premierLogoURL != null && m_premierLogoURL.length > 0)
                        mhModel.logoLink = m_premierLogoURL;
                }
                if (mhMyAccount) {
                    //use page tool link if defined for logout link
                    for (var i = 0, len = mhModel.ptools.length; i < len; i++) {
                        if (mhModel.ptools[i].Url.toLowerCase().indexOf("myaccount/logout.aspx") && typeof pbar.CaptionClearUser !== 'undefined')
                            mhModel.pbar.logoutMsg = "<a href=\"" + mhModel.ptools[i].Url + "\" class=\"para_small\" target=\"_self\">" + pbar.CaptionClearUser.replace('{fname}', mhModel.pbar.firstName) + "</a>";
                    }
                }

                timer.end('Builders.Masthead');
                return mhModel;
            };
        },

        Templates: function () {
            this.build = function (showCart, showSearch, showPtools, showBcrumbs, showPbar) {
                var allTemplates = '';
                var templates = new Models.Templates();
                if (showCart) allTemplates += templates.cart;
                if (showSearch) allTemplates += templates.search;
                if (showPtools) allTemplates += templates.ptool;
                if (showBcrumbs) allTemplates += templates.bcrumb;
                if (showPbar) allTemplates += templates.pbarAuthMsg;
                allTemplates += templates.viewAll;
                allTemplates += templates.tier3;
                return allTemplates;
            };
        },

        NavigationItems: function () {
            this.build = function (menus, parentContainerId, lvl) {
                var navigationCollection = [],
                    showActive = !(typeof m_pageTab == 'undefined' || m_pageTab == null),
                    lvl = (lvl) ? lvl + 1 : 1,
                    max = (lvl == 1 && menus.length > 3) ? 3 : ((lvl == 2 && menus.length > 8) ? 8 : menus.length), //max 3 for tier1, 8 for tier2
                    id = '';

                for (var i = 0; i < max; i++) {
                    var navigationItem = new Models.NavigationItem();
                    var menuItem = menus[i];
                    id = (parentContainerId) ? parentContainerId + i : menuItem.Id;
                    navigationItem.caption = menuItem.Text;
                    navigationItem.viewAll = typeof m_viewAllText !== 'undefined' && m_viewAllText.length > 0 ? m_viewAllText.replace('[0]', menuItem.Text) : '{View All} ' + menuItem.Text;
                    navigationItem.parentContainerId = parentContainerId;
                    navigationItem.containerId = id; //(menuItem.Id) ? menuItem.Id : "";
                    navigationItem.url = menuItem.Href;
                    navigationItem.isActive = (showActive && i == m_pageTab);
                    navigationItem.url = menuItem.Href;
                    navigationItem.target = (typeof menuItem.Target !== 'undefined' && menuItem.Target != null && menuItem.Target.length > 0) ? menuItem.Target : '_self';
                    navigationItem.isSeparator = menuItem.IsSeparator;
                    navigationItem.subNavigation = (menuItem.MenuItems) ? pub.Builders.navigationItemsBuilder.build(menuItem.MenuItems, navigationItem.containerId, lvl) : [];
                    navigationItem.cssClass = (navigationItem.subNavigation.length > 0) ? 'tierLink' : 'tierLink noSub';
                    navigationItem.colClass = 'tier3 clrFix';
                    navigationItem.isLast = (i == (max - 1));

                    if (lvl == 2 && navigationItem.subNavigation.length > 0) {
                        //determine how many columns should be used for tier3 nav
                        var cols = null;
                        if (navigationItem.subNavigation.length < 2)
                            cols = 'x1';
                        else if (navigationItem.subNavigation.length == 2)
                            cols = 'x2';
                        else if (navigationItem.subNavigation.length < 7 && navigationItem.subNavigation.length != 4)
                            cols = 'x3';
                        if (cols)
                            navigationItem.colClass += (' ' + cols);
                    }
                    if (mhPremier) {
                        if (mhStorm) {
                            m_homelink = mhModel.bcrumbs.length > 0 ? mhModel.bcrumbs[0].Url : m_homelink;
                        }
                    }
                    navigationCollection[i] = navigationItem;
                }
                return navigationCollection;
            };
        },

        Pbar: function () {
            this.build = function (pbarObject) {
                var pbar = new Models.Pbar();
                if (pbarObject) {
                    pbar.firstName = (typeof pbarObject.FirstName !== 'undefined' && typeof pbarObject.FirstName.substr == 'function') ? pbarObject.FirstName.substr(0, 12) : pbarObject.FirstName;
                    pbar.lastName = (typeof pbarObject.LastName !== 'undefined') ? pbarObject.LastName : '';
                    if (typeof pbarObject.CaptionAuth  !== 'undefined') {
                        if (!mhLearn) {
                            pbar.logoutMsg = "<a href=\"javascript:maLinkLogout();\" class=\"para_small\" target=\"_self\">" + pbarObject.CaptionClearUser.replace('{fname}', pbar.firstName) + "</a>";
                        } else {
                            var logout = (typeof pbarObject.DisplayPrivacySettings !== 'undefined') ? pbarObject.DisplayPrivacySettings : Dell.Global.Settings.legacyLogout;
                            pbar.logoutMsg = "<a href=\"" + logout + "\" class=\"para_small\" target=\"_self\">" + pbarObject.CaptionClearUser.replace('{fname}', pbar.firstName) + "</a>";
                        }
                    }
                    if (typeof flag != 'undefined' && flag == 'jp' && typeof pbarObject.FirstName !== 'undefined' && typeof pbarObject.CaptionAuth !== 'undefined') {
                        var nmApnd = pbarObject.CaptionAuth.substr((pbarObject.CaptionAuth.indexOf('{fname}') + 7), 1);
                        if (nmApnd == null)
                            nmApnd = pbarObject.CaptionAuth.substr((pbarObject.CaptionAuth.indexOf('{lname}') + 7), 1);
                        if (nmApnd.length > 1)
                            nmApnd = '';
                        pbar.firstName = (typeof pbarObject.LastName !== 'undefined') ? (pbarObject.LastName + nmApnd) : '';
                    }
                    pbar.isAuthenticated = pbarObject.IsAuthenticated;
                    pbar.isCookied = pbarObject.IsCookied;
                    pbar.showAuthMsg = ((pbarObject.IsAuthenticated || pbarObject.IsCookied) && pbarObject.FirstName != null && pbarObject.FirstName.length > 0);
                    pbar.loadingCaption = pbarObject.LoadingCaption;
                    pbar.modalTitle = (typeof pbarObject.ModalTitle != 'undefined') ? pbarObject.ModalTitle : pbar.captionUnauth;
                    //display privacy settings within the appropriate location
                    pbar.displayPrivacySettings = pbarObject.DisplayPrivacySettings;
                    pbar.privacySettingsCaption = pbarObject.PrivacySettingsCaption;
                    pbar.socialLogin = (m_login_url.indexOf('showsocialsignin=true') > -1);
                    if (!pbar.socialLogin)
                        pbar.loginLink += ((pbar.loginLink.indexOf('?') == -1) ? '?' : '&') + 'level=3';
                    else
                        pbar.loginLink += escape(window.location.href);
                } else {
                    pbar.showAuthMsg = false;
                    pbar.modalTitle = '';
                }
                pbar.stormModal = (!mhHome && mhStorm) ? 'stormModal.showLogin({title:\'' + pbar.modalTitle + '\',authLevel:3});return false;' : '';

                if (mhHome || mhLearn) {
                    pbar.loginLink = pbar.maLink;
                }

                return pbar;
            };
        },

        Cart: function () {
            this.build = function (cartObj) {
                var cart = new Models.Cart();
                if (!mhPremier) {
                    cart.showCart = !(mhFlat || mhPopup || (typeof m_pbarCart === 'undefined' || m_pbarCart == null)); //(typeof m_pbarCartEnabled !== 'undefined') ? m_pbarCartEnabled : true;
                    if (cartObj) {
                        var match = (document.cookie.match('^CartID=(.*?);') || document.cookie.match(' CartID=(.*?);'));
                        cart.url = typeof match !== 'undefined' && match !== null && match[1] != '' ? cartObj.Link : typeof cartObj.Link !== 'undefined' && cartObj.Link != '' ? cartObj.Link : '#';
                        cart.caption = cartObj.Caption ? cartObj.Caption : '';
                        cart.itemsCaption = cartObj.ItemsCaption;
                        cart.loading = cartObj.LoadingCaption;
                        cart.count = typeof cartObj.Count == 'undefined' || cartObj.Count == '' || cartObj.Count == null ? '' : cartObj.Count;
                        cart.IsFlyout = cartObj.IsFlyout;
                    }
                    else {
                        cart.showCart = false;
                    }
                }
                else {
                    if (m_pbarLinks !== null) {
                        for (var idx = 0; idx < m_pbarLinks.length; idx++) {
                            if (m_pbarLinks[idx].IconUrl && m_pbarLinks[idx].IconUrl.indexOf('dell.com/images/global/brand/icons/cart.gif') !== -1) {
                                cart.showCart = true;
                                cart.count = typeof cartObj.Count == 'undefined' || cartObj.Count == '' || cartObj.Count == null ? '' : cartObj.Count;
                                cart.url = m_pbarLinks[idx].Href;
                                cart.caption = m_pbarLinks[idx].Text;
                                break;
                            }
                        }
                    }
                }

                return cart;
            };
        },

        Search: function () {
            this.build = function () {
                var search = new Models.Search();
                //Initial state in case no global variable
                search.showSearch = ((typeof m_search !== 'undefined' && m_search != null && m_search.length > 0 && m_search != "&nbsp") && !(mhPopup));
                if (search.showSearch) {
                    var $searchForm = jQuery(m_search);

                    //display search term if present
                    var cat = getQueryVariable("cat");
                    var kword = getQueryVariable("k");
                    if (cat != null)
                        $searchForm.find("#cat").val(cat);
                    if (kword != null) {
                        kword = DecodeSearch(kword);
                        if (kword != undefined && kword.length > 0) {
                            $searchForm.find('#searchinput').val(kword);
                        }
                    }

                    search.searchLabel = $searchForm.find('#searchinput').val() != '' ? $searchForm.find('#searchinput').val() : '';
                    search.actionUrl = $searchForm.attr('action');
                    search.searchButton = $searchForm.find('input.searchaction');
                    search.searchButtonLabel = search.searchButton.attr('alt');
                    var selects = $searchForm.find('select');
                    $.each(selects, function () {
                        $searchForm.append('<input type="hidden" name="' + $(this).attr('name') + '" value="' + $(this).val() + '"></input>');
                    });
                    search.hiddenFields = $searchForm.find('input[type=hidden]'); //[{ name: 'cat', value: 'all' }];
                    search.bindAuto = function (el) { Events.autoComplete($(el)); };
                }
                return search;
            };
        },

        CountrySelector: function () {
            this.build = function () {
                var ctrySel = new Models.CountrySelector(),
                    $sel = $(m_localeSelector),
                    $selEl = $sel.find("select").eq(0),
                    curIdx = $selEl.attr("selectedIndex") ? $selEl.attr("selectedIndex") : $selEl.get(0).selectedIndex ? $selEl.get(0).selectedIndex : 0;

                /* set the size to display as listbox instead of dropdown */
                $selEl.attr("size", "20").removeAttr("onchange").attr("data-index", curIdx);

                //Reset the country selector to the actual current country; ignore browser cache.
                DELL.com.Utils.Initialize(function () {
                    if ($("#ctryTtip select").attr("selectedIndex") && $("#ctryTtip select").attr("selectedIndex") !== $("#ctryTtip select").attr("data-index"))
                        $("#ctryTtip select").attr("selectedIndex", $("#ctryTtip select").attr("data-index"));
                });

                ctrySel.curCountry = m_ctryName;
                ctrySel.countries = $selEl.parent().html();

                /* Get the available language links by checking links within m_localeSelector - <td><span class="crumbsel"> */
                ctrySel.languages = jQuery(m_localeSelector).find(".crumbsel").parent();
                ctrySel.multiLang = (jQuery(ctrySel.languages).find("a").length > 0);
                if (mhLearn && typeof flag != 'undefined' && flag == null) {
                    if (flag == null)
                        flag = m_ctry;
                }
                ctrySel.flagImgSrc = (typeof flag != 'undefined' && flag != null) ? m_imgPfx + '/images/global/masthead/smlflags/' + flag + '.gif' : null;
                ctrySel.onChange = Events.countrySel;
                return ctrySel;
            };
        },

        Privacy: function () {
            this.build = function () {
                var prvc = new Models.Privacy();
                // STORM privacy variables
                prvc.showSettings = ((typeof m_pbar_privacysetting_link !== 'undefined') ? (m_pbar_privacysetting_link == 'true') : false);
                if (prvc.showSettings)
                    prvc.caption = ((typeof m_pbar_privacysetting_link_caption !== 'undefined') ? m_pbar_privacysetting_link_caption : '');
                prvc.onClick = Events.ensightenPrivacy;

                if (typeof m_privacySettingBar !== 'undefined' && m_privacySettingBar != null) {
                    prvc.showSettings = true;
                    prvc.caption = m_privacySettingBar.Caption;
                }

                // OLR
                if (mhLearn) {
                    prvc.showSettings = (typeof m_ensightenLink !== 'undefined');
                    prvc.caption = '';
                }

                // NGEN Privacy settings check
                if (typeof m_pbarMA !== 'undefined' && m_pbarMA != null && mhNGen) {
                    prvc.showSettings = (typeof m_pbarMA.DisplayPrivacySettings !== 'undefined') ? m_pbarMA.DisplayPrivacySettings : false;
                    if (prvc.showSettings)
                        prvc.caption = m_pbarMA.PrivacySettingsCaption;
                }

                return prvc;
            };
        },

        Premier: function () {
            this.build = function (title) {
                var premier = new Models.Premier();
                premier.storeTitle = title || '';
                premier.showTitle = (typeof title != 'undefined' && title != null && title.length > 0);
                if (typeof m_pbarLinks != 'undefined' && m_pbarLinks != null) {
                    //get premier login/logout text plus link
                    for (var i = 0; i < m_pbarLinks.length; i++) {
                        if ((m_pbarLinks[i].Href.indexOf('logout') > -1) || m_pbarLinks[i].Href.indexOf('login') > -1) {
                            premier.linkTxt = m_pbarLinks[i].Text;
                            premier.linkUrl = m_pbarLinks[i].Href;
                            break;
                        }
                    }
                }
                return premier;
            };
        },

        BCrumb: function () {
            //only need to build breadCrumbs once for use in masthead and footer
            var crumbCollection = null;

            this.build = function () {
                if (crumbCollection != null) {
                    return crumbCollection;
                } else {
                    var crumbs = [];
                    if (typeof m_crumbs !== 'undefined' && m_crumbs.length > 1) {
                        for (var i = 0; i < m_crumbs.length; i++) {
                            var crumb = new Models.StormMHLink();
                            crumb.Text = (i > 0) ? m_crumbs[i].Text : ''; //output only the home icon for the first link
                            crumb.Url = m_crumbs[i].Href;
                            crumb.HasLink = (m_crumbs[i].Href);
                            crumb.Icon = m_crumbs[i].Icon;
                            crumb.IsFilter = m_crumbs[i].IsFilter;
                            crumb.Target = (typeof m_crumbs[i].Target !== 'undefined' && m_crumbs[i].Target != null) ? m_crumbs[i].Target : '_self';
                            crumb.OffDell = (typeof m_crumbs[i].OffDell !== 'undefined' && m_crumbs[i].OffDell != null) ? m_crumbs[i].OffDell : false;
                            crumbs[crumbs.length] = crumb;
                        }
                    }
                    crumbCollection = crumbs;
                    return crumbs;
                }
            };
        },

        PageTools: function () {
            this.build = function () {
                //if (typeof m_ptoolTemplate !== 'undefined' && m_ptoolTemplate && m_ptoolTemplate.length > 0)
                //    renderTemplate(m_ptoolTemplate);
                var pTools = [];
                if (typeof m_pnlinks !== 'undefined' && (typeof m_subNavLinksDisplay !== 'undefined' && m_subNavLinksDisplay)) { // && (!m_supressSubNav) && !m_isRcomm
                    for (var i = 0; i < m_pnlinks.length; i++) {
                        var link = new Models.StormMHLink();
                        link.Text = m_pnlinks[i].Text;
                        link.Url = m_pnlinks[i].Href;
                        link.HasLink = (m_pnlinks[i].Href && m_pnlinks[i].Href != null);
                        link.Icon = m_pnlinks[i].Icon;
                        link.ShowIcon = (m_pnlinks[i].Icon && m_pnlinks[i].Icon != null && m_subNavIconsDisplay);
                        link.Target = (typeof m_pnlinks[i].Target !== 'undefined' && m_pnlinks[i].Target != null) ? m_pnlinks[i].Target : '_self';
                        link.OffDell = (typeof m_pnlinks[i].OffDell !== 'undefined' && typeof m_pnlinks[i].OffDell != null) ? m_pnlinks[i].OffDell : false;
                        pTools[pTools.length] = link;
                    }
                }
                return pTools;
            };
        }
    };
    /* END BUILDERS */


    /* START EVENT BINDING */
    var Events = {
        tierNav: function (el) {
            //assign defaults
            $tr1 = $(el).find('#tr1');
            curSel = $tr1.find('.curSel, .active:first-child').eq(0);
            tier2LIs = $tr1.find('.t2li');

            //bind events for tier nav
            $tr1.find('div.tierLink:not(.noSub) a.mNav').unbind('click').bind('click', Events.toggleSubNav);
            tier2LIs.find('li.closeTier a').unbind('click.closeTier').bind('click.closeTier', Events.closeTierNav);

            $(document).bind("click.mhCheck", function (e) {
                var isNav = $(e.target).hasClass('mh') || $(e.target).parents('.mh').length > 0;
                if (!isNav)
                    Events.closeTierNav(null);
            });

            if (tier2LIs.length == 8) {
                if ($('html').hasClass('no-hashchange')) {
                    tier2LIs.addClass('compressed');
                }
            } else {
                if (!$('html').hasClass('no-hashchange') && !$('html').hasClass('rtl')) {
                    tier2LIs.find('.tierLink span').css('left', '32%');
                }
            }

            //NGen and OLR assign the correct home link for BreadCrumbs and Logos
            jQuery(document).ready(function () {
                var $ctrHome = $(".mhLogo, .ftrLogo, ul.bCrumb li.home a");
                if ((mhNGen || mhLearn)) {
                    fitContextualFooterLinks5col();
                    if ($ctrHome.length > 0)
                        $ctrHome.attr("href", ((typeof m_homelink !== 'undefined') ? m_homelink : 'http://www.dell.com/'));
                }
            });
            // IE6/7 subnav width fix on resize
            if ($("html").hasClass("no-hashchange")) {
                Events.resizeSubNav();
                $(window).resize(Events.resizeSubNav);
            }
        },
        toggleSubNav: function (e) {
            e.preventDefault();
            var id = this.getAttribute("rel"),
                $prnt = $tr1.find("#" + id),
                hideNav = ($prnt.hasClass("active"));

            // reset current selection classNames & set current selection
            if ($prnt.hasClass("t1li")) {
                var $subNav = $tr1.find("#" + id + "_sub");
                curSel.removeClass("active curSel");

                curSel = $prnt;
                //Set the current active tier3 nav to the active item
                cur2Sel = $subNav.find("li.active");

                if (cur2Sel.length == 0) {
                    cur2Sel = $subNav.find(".t2li").eq(0);
                    cur2Sel.addClass("active");
                }
                if (hideNav && !(typeof m_pageTab == 'undefined')) {
                    curSel = $tr1.children().eq(0).find(".t1li").eq(m_pageTab);
                    curSel.addClass("curSel");
                }
            } else {
                if (cur2Sel != null)
                    cur2Sel.removeClass("active");
                cur2Sel = $prnt;
            }

            // toggle active class for t1 and t2 links (subnav & parent)
            if (hideNav)
                $prnt.removeClass('active');
            else
                $prnt.addClass('active');

            if (typeof Modernizr != 'undefined' && !Modernizr.csscolumns && cur2Sel.find('.tier3').length > 0 && cur2Sel.find('.tier3').attr('data-col') != 'true') {
                timer.start('shufflecolumns');
                legacy.shuffleColumns(cur2Sel.find('.tier3'));
                timer.end('shufflecolumns');
            }
        },
        resizeSubNav: function () {
            $tr1.find("div.subNav").css("width", (document.body.clientWidth + "px"));
        },
        ensightenPrivacy: function () {
            if (Bootstrapper != null && Bootstrapper.privacyDialog != null && typeof Bootstrapper.privacyDialog.expand === 'function')
                Bootstrapper.privacyDialog.expand();
        },
        closeTierNav: function (e) {
            if (e)
                e.preventDefault();
            $('.hideSubnavs').hide();
            curSel.removeClass('active');
            if (!(typeof m_pageTab == 'undefined')) {
                curSel = $tr1.children().eq(0).find(".t1li").eq(m_pageTab);
                curSel.addClass("curSel");
            }
        },
        countrySel: function () {
            $('.ctryName').click(function () { $('#ctryTtip select').focus(); });
            var ctryRedir = function (e) {
                var $this = e;
                if ($this.options[$this.selectedIndex].value != '' && $this.selectedIndex >= 0 && $this.selectedIndex != parseInt($($this).attr("data-index")))
                    document.location = $this.options[$this.selectedIndex].value;
            };
            $(".no-borderimage #ctryTtip select").bind("click", function (e) {
                e.preventDefault();
                ctryRedir(this);
            });
            $("#ctryTtip select").bind("keypress", function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    ctryRedir(this);
                }
            });
            $(".history #ctryTtip select option").bind("click", function (e) {
                e.preventDefault();
                ctryRedir($(this).parent()[0]);
            });
            if (navigator.userAgent.match(/Trident.*rv\:11\./)) {
                //IE 11 fix for event binding onChange
                $(".history #ctryTtip select").bind("change", function (e) {
                    e.preventDefault();
                    ctryRedir(this);
                });
            }
        },
        autoComplete: function ($el, delayed) {
            var delay = delayed || false;
            /* AUTO Complete plugin */
            if (typeof (m_autocomplete) != "undefined" && m_autocomplete != "" && $().autocomplete && DELL.com.Delphi) {
                if (!mhLearn) {
                    var autoCompleteUrl = m_autocomplete + (m_autocomplete.indexOf("?") > 0 ? getLwp() : "?" + getLwp());
                    var searchInputBox = $("#searchinput");
                    searchInputBox.autocomplete(autoCompleteUrl,
                        {
                            matchSubset: false,
                            selectFirst: false,
                            scrollHeight: 200,
                            extraParams: {
                                Referer: document.URL,
                                Category: DELL.com.Delphi.PageSettings.mi.CategoryPath
                            },
                            formatItem: function (row, i, max, value) {
                                if (i == 1 && row.length > 6) {
                                    var suggestion = row[0];
                                    var rank = row[1];
                                    var answer = row[2];
                                    var image = row[4];
                                    var imageWidth = row[5];
                                    var imageHeight = row[6];
                                    var caption = row[7];
                                    var title = row[8];

                                    if (caption) caption = (caption.length > maxCaptionLength) ? (caption.substr(0, maxCaptionLength) + " ...") : caption;
                                    var c = '<div class="sa_sg sa_sgTR"><table><tr><td><img height="' + imageHeight + '" width="' + imageWidth + '" src="' + image + '"></td><td><div class="sa_tm">' + title + '</div><div class="sa_ds">' + caption + '</div></td></tr><table></div>';
                                    return c;
                                } else if (row.length >= 3) {
                                    var suggestion = row[0];
                                    var categoryLabel = row[4];
                                    //var answer = row[2];
                                    var image = row[5];
                                    var imageWidth = row[6];
                                    var imageHeight = row[7];
                                    var caption = row[8];
                                    var title = row[9];

                                    if (image != null) {
                                        if (caption) caption = (caption.length > maxCaptionLength) ? (caption.substr(0, maxCaptionLength) + " ...") : caption;
                                        suggestion = '<div class="sa_sg sa_sgTR"><table><tr><td><img height="' + imageHeight + '" width="' + imageWidth + '" src="' + image + '"></td><td><div class="sa_tm">' + title + '</div><div class="sa_ds">' + caption + '</div></td></tr><table></div>';
                                    } else if (categoryLabel != null && categoryLabel.length > 0) {
                                        suggestion = suggestion + ' in ' + categoryLabel;
                                    }
                                    return suggestion;
                                }
                                else { return value; }
                            }
                        }).result(function (object, row) {
                            var searchForm = $("form[name='search']");
                            var ref = row[2];
                            if (ref == null || ref.length == 0) ref = "ac";
                            var subcatid = row[3];
                            if (subcatid != null && subcatid.length > 0) {
                                searchForm.append("<input type='hidden' name='subcat' value='" + subcatid + "'\>");
                                if (subcatid.indexOf("prod/" === 0) || subcatid.indexOf("2999/" === 0) ||
                                    subcatid.indexOf("s/" === 0) || subcatid.indexOf("sys/" === 0))
                                    searchForm.find("input[name='cat']")[0].value = "prod";
                            }
                            searchForm.append("<input type='hidden' name='ref' value='" + ref + "'\>");
                            searchForm[0].submit();
                        });
                }
            } else if (typeof (m_autocomplete) != "undefined" && m_autocomplete != "" && !delay && typeof DELL.com.Delphi === 'undefined') {
                //autocomplete plugin has not loaded...  delay event binding until doc.ready
                DELL.com.Utils.Initialize(function () {
                    Events.autoComplete($el, true);
                });
            }

            /* REQ 5.3: Make HTML5 Placeholder attribute work across all browsers */
            $("#searchinput").focus(function () {
                var $this = $(this), sVal = $.trim($this.val()), sPlace = $.trim($this.attr('data-placeholder'));
                if (sVal == sPlace) {
                    try {
                        $this.val('');
                    } catch (e) { }
                }
            }).blur(function () {
                var $this = $(this), sVal = $.trim($this.val()), sPlace = $.trim($this.attr('data-placeholder'));
                if (sVal == '') {
                    try {
                        $this.val($this.attr('data-placeholder'));
                    } catch (e) { }
                }
            }).blur();

            //Code to prevent "Search" or blacnk entries from the input box during submit            
            $(".mhSearch button").unbind("click").bind("click", function (e) {
                var $srch = $("#searchinput"),
                    placeholder = $.trim($srch.attr('data-placeholder')),
                    sVal = $.trim($srch.val());
                if (sVal == placeholder) {
                    $srch.val('');
                }
            });
        }
    };
    /* END EVENT BINDING */

    var legacy = {
        shuffleColumns: function (cols) {
            var colsClass = '',
                newCols = [],
                i = 0,
                $col = $(this),
                $old = $col,
                $gr = $col,
                tierHeight = 0,
                colCount = 4;
            cols.each(function () {
                $gr = $(this);
                colCount = 4;
                tierHeight = 0;
                if ($gr.hasClass('x2'))
                    colCount = 2;
                else if ($gr.hasClass('x3'))
                    colCount = 3;

                $gr.attr('data-col', 'true');
                //check to see if column reshuffle is needed (over 2 lines of text & groups > columns)
                if ($gr.find('li.t3li').length > colCount) {
                    //default values
                    newCols = new Array(colCount);
                    $old = $gr.find('li.t3li').clone();
                    $gr.children().remove();

                    //setup new blank columns & add first groups
                    for (i = 0; i < colCount; i++) {
                        var $links = $old.eq(i).children().clone();
                        newCols[i] = $(document.createElement('li')).addClass('t3li');
                        newCols[i].append($(document.createElement('div')).addClass('divCol'));
                        $gr.append(newCols[i]);
                        try {
                            newCols[i].children('div').append($links);
                            if (tierHeight < parseInt(newCols[i].height()))
                                tierHeight = parseInt(newCols[i].height());
                        } catch (e) {
                            alert(e);
                        }
                    }

                    //iterate over each t3li
                    //compare column heights to previous columns for possible shift
                    $old.filter(':gt(' + (colCount - 1) + ')').each(function () {
                        $col = $($(document.createElement('div')).addClass('divCol')).append($(this).children().clone());
                        newCols[(colCount - 1)].append($col);
                        var colStop = legacy.findColStop(newCols, tierHeight);
                        if (colStop == colCount)
                            tierHeight = parseInt(newCols[(colCount - 1)].height());

                        legacy.equalizeColumns(newCols, colStop);
                    });
                }
                newCols = null;
            });
        },

        findColStop: function (cols, curMax) {
            //finds the correct column to stop at when adding and shifting/shuffling of column groups
            //first column values
            var minColHeight = 0,
                minColIdx = 0,
                colStop = 0,
                idx = 0,
                cHeight = cols[0].height(),
                grHeight = cols[1].children('div:first').length > 0 ? cols[1].children('div:first').height() : 0,
                tHeight = parseInt(cHeight) + parseInt(grHeight);
            tHeights = new Array(cols.length);
            tHeights[0] = tHeight;
            //console.log("curMax = " + curMax + ", tHeight = " + tHeight);
            //get the possible height values after column shifts/additions (1st child from next column)
            for (idx = 1; idx < cols.length; idx++) {
                cHeight = cols[idx].height();
                grHeight = (idx < (cols.length - 1)) ? (cols[idx + 1].children('div:first').length > 0 ? cols[idx + 1].children('div:first').height() : 0) : 0;
                tHeight = parseInt(cHeight) + parseInt(grHeight);
                //console.log("curMax = " + curMax + ", tHeight = " + tHeight);
                tHeights[idx] = tHeight;
            }

            //assign the column with the most amount of space available if curMax is not exceeded
            minColHeight = Math.min.apply(null, tHeights);
            minColIdx = colStop = minColHeight <= 460 ? legacy.getArrIndex(tHeights, minColHeight) : cols.length;

            return colStop;
        },

        equalizeColumns: function (cols, stop) {
            var i = 0,
                i2 = 0,
                i3 = 0,
                $shift = null,
                $chldrn = null,
                $clone = null,
                chk = 0,
                oldMax = 0,
                cMax = 0,
                cMaxIdx = 0,
                heights = new Array(cols.length);
            //console.log("equalizeColumns - " + stop);
            for (i = 0; i < cols.length; i++) {
                heights[i] = parseInt(cols[i].height());
            }
            oldMax = cMax = Math.max.apply(null, heights);
            for (i = (cols.length - 1); i >= stop; i--) {
                for (i2 = (cols.length - 1); (i2 > i && i2 > 0); i2--) {
                    if (cols[i2].height() >= cols[i2 - 1].height()) {
                        $chldrn = cols[i2].children();
                        for (i3 = 0; i3 < ($chldrn.length - 1); i3++) {
                            $shift = $chldrn.eq(0);
                            if (parseInt(cols[i2 - 1].height() + parseInt($shift.height())) <= cMax) // && (cols[i2-1].height() + $shift.height()) 
                                $shift.appendTo(cols[i2 - 1]);
                            else
                                break;
                        }
                    }
                }
            }
            for (i = 0; i < cols.length; i++) {
                heights[i] = parseInt(cols[i].height());
            }
            cMax = Math.max.apply(null, heights);
            cMaxIdx = legacy.getArrIndex(heights, cMax);
            //console.log("oldMax= " + oldMax + ", cMax = " + cMax + ", cMaxIdx = " + cMaxIdx);
            if (cMax != oldMax)
                legacy.equalizeColumns(cols, legacy.getArrIndex(heights, Math.min.apply(null, heights)));
            //check for max height exceeded and find maxColHeight

            //check for gaps
            for (i = 0; i < (cols.length - 1); i++) {
                if (cols[i].height() < cMax && cols[i].height() < 460) {
                    $chldrn = cols[i + 1].children();
                    for (i3 = 0; i3 < ($chldrn.length - 1); i3++) {
                        $shift = $chldrn.eq(i3);
                        //to get accurate height adjustments check height after appending 
                        //(when adding heights totals were not 100% accurate for every instance)
                        $clone = $shift.clone();
                        cols[i].append($clone);
                        chk = parseInt(cols[i].height());
                        if (chk <= cMax && chk <= 460) {
                            $shift.remove();
                        } else {
                            $clone.remove();
                            break;
                        }
                    }
                }
            }
        },

        getArrIndex: function (arr, val) {
            var i = 0;
            for (i = 0; i < arr.length; i++) {
                if (arr[i] == val)
                    return i;
            }
            return i;
        }
    };

    var DecodeSearch = function (str) {
        try {
            return unescape(decodeURI(str).replace(/\+/g, " "));
        }
        catch (e)
        { }
    };

    var delayDocReady = function (fnc) {
        DELL.com.Utils.Initialize(fnc);
    };

    var renderTier3 = function (subNav, cb) {
        if (subNav && subNav.subNavigation.length > 0) {
            var dFrag = $(document.createDocumentFragment());
            var sub = $("<div id=\"" + subNav.containerId + "_t3\"></div>");

            timer.start("MH.Tier3." + subNav.containerId);
            renderT3Dom(subNav, sub);
            timer.end("MH.Tier3." + subNav.containerId);
            $("#" + subNav.containerId + "_sub .cntrDiv").prepend(sub);
        }
        if (typeof cb === 'function') {
            cb();
        }
    };

    var renderT3Dom = function(nav, trg) {
        // Knockout has poor performance within deep foreach nesting (especially in legacy browsers)
        var gr = document.createElement('ul');
        var t3Li = null;
        var t3El = null;
        var i = 0;
        var i2 = 0;
        var t3mx = nav.subNavigation.length;
        var t4mx = 0;
        for (i=0; i< t3mx; i++){
            gr.className = nav.colClass;
            t3Li = document.createElement('li');
            t3Li.className = 't3li';
            gr.appendChild(t3Li);
            if (nav.subNavigation[i].isSeparator) {
                t3El = document.createElement('span');
                t3El.className = 'separator';
                t3Li.appendChild(t3El);
            } else {
                var t3Gr = document.createElement('ul');
                if (nav.subNavigation[i].url != null) {
                    //render group title link
                    var t3GrEl = document.createElement('li');
                    t3El = document.createElement('a');
                    t3El.className = 't3header';
                    t3El.href = nav.subNavigation[i].url;
                    t3El.target = nav.subNavigation[i].target;
                    var t3Title = document.createElement('strong');
                    t3Title.innerHTML = nav.subNavigation[i].caption;
                    t3El.appendChild(t3Title);
                    t3GrEl.appendChild(t3El);
                    t3Gr.appendChild(t3GrEl);
                }
                t4mx = nav.subNavigation[i].subNavigation.length;
                for (i2 = 0; i2 < t4mx; i2++) {
                    var t3GrEl = document.createElement('li');
                    t3El = document.createElement('a');
                    t3El.href = nav.subNavigation[i].subNavigation[i2].url;
                    t3El.target = nav.subNavigation[i].subNavigation[i2].target;
                    t3El.innerHTML = nav.subNavigation[i].subNavigation[i2].caption;
                    t3GrEl.appendChild(t3El);
                    t3Gr.appendChild(t3GrEl);
                }
                t3Li.appendChild(t3Gr);
            }

        }
        trg.append(gr);
    };

    var threadTier3 = function (p, c, f) {
        var pidx = (typeof p === 'undefined') ? 0 : p,
            cidx = (typeof c === 'undefined') ? 0 : c,
            first = (typeof f === 'undefined') ? true : f; //render first level t1 links first

        if (pidx < mhModel.navigation.length && cidx < mhModel.navigation[pidx].subNavigation.length) {
            setTimeout(function () {
                renderTier3(mhModel.navigation[pidx].subNavigation[cidx], function () {
                    if ((cidx + 1) >= mhModel.navigation[pidx].subNavigation.length && !first) {
                        cidx = first ? 0 : 1;
                        pidx++;
                    } else if (!first) {
                        cidx++;
                    } else if (first) {
                        pidx++;
                        cidx = 0;
                    }
                    threadTier3(pidx, cidx, f);
                });
            }, 50);
        } else if (first) {
            if ($.browser.msie && parseInt($.browser.version) <= 8) {
                DELL.com.Utils.Initialize(function () {
                    threadTier3(0, 1, false);
                });
            } else {
                setTimeout(function () {
                    threadTier3(0, 1, false);
                }, 50);
            }
        } else {
            //Finished now bind events
            //to ensure tier3 is closed upon link clicks (ex anav selector links that hav different hash params only)
            tier2LIs.find('.tier3 a').unbind('click.closeTier').bind('click.closeTier', function () { Events.closeTierNav(null); });
            tier2LIs = null;
            mhModel = null;
        }
    };

    /* RENDER VIEWS */
    pub.renderModel = function (m, containerId) {
        var container = null;
        if (m != null) {
            //document.getElementsByTagName('head')[0].innerHTML += m.templates;
            if (typeof containerId !== "undefined" && containerId.length > 0) {
                container = document.getElementById(containerId);
                timer.start("KO.Bindings." + containerId);
                ko.applyBindings(m, container);
                //ko.cleanNode(container);
                timer.end("KO.Bindings." + containerId);
            }
            else {
                if ($("#revidHeader").length == 0) {
                    delayDocReady(function () {
                        container = document.getElementById("revidHeader");
                        container.innerHTML += m.templates;
                        pub.renderModel(m, "revidHeader");
                    });
                } else {
                    container = document.getElementById("revidHeader");
                    container.innerHTML += m.templates;
                    setTimeout(function () {
                        pub.renderModel(m, "revidHeader");
                    }, 4);

                    //render 1st level tier3 links
                    threadTier3(0, 0, true);
                }
            }
        }
        container = null;
    };

    /* THINGS TO MAKE PUBLIC */
    pub.Builders = {
        masthheadModelBuilder: new Builders.Masthead(),
        navigationItemsBuilder: new Builders.NavigationItems(),
        searchBuilder: new Builders.Search(),
        premierBuilder: new Builders.Premier(),
        privacyBuilder: new Builders.Privacy(),
        cartBuilder: new Builders.Cart(),
        pbarBuilder: new Builders.Pbar(),
        ctrySelBuilder: new Builders.CountrySelector(),
        bcrumbBuilder: new Builders.BCrumb(),
        ptoolBuilder: new Builders.PageTools(),
        templateBuilder: new Builders.Templates()
    };
    timer.end("DELL.com.Nav");
    return pub;
})(jQuery, window, document);
if (window.console){console.log('ex time: storm_masthead.js', new Date().getTime() - startTScript);}


