/**
 * @preserve
 * Answers Cloud Services Gateway Script v1.0.3. Wednesday, October 29th, 2014, 4:22:31 PM
 * (c) Copyright 2014, Answers Corporation. http://www.answers.com/page/businesssolutions
 * Patents pending.
 **/
!function(){function e(e,t){if(e){var n;for(n=0;n<e.length&&(!e[n]||!t(e[n],n,e));n+=1);}}function t(e,t){if(e){var n;for(n=e.length-1;n>-1&&(!e[n]||!t(e[n],n,e));n-=1);}}function n(e,t){return l.call(e,t)}function i(e,t){return n(e,t)&&e[t]}function r(e,t){var i;for(i in e)if(n(e,i)&&t(e[i],i))break}function o(e,t,i,a){return t&&r(t,function(t,r){(i||!n(e,r))&&(!a||"object"!=typeof t||!t||x(t)||w(t)||t instanceof RegExp?e[r]=t:(e[r]||(e[r]={}),o(e[r],t,i,a)))}),e}function a(e,t){return function(){return t.apply(e,arguments)}}function s(){return m.getElementsByTagName("script")}function u(e,t){return e.getAttribute(t)}function c(e){var t,n;for(t=0;t<e.length;t++)if(n=e[t],"."===n)e.splice(t,1),t-=1;else if(".."===n){if(0===t||1==t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}if("undefined"!=typeof window.__karma__||window==window.top){var d=Object.prototype,f=d.toString,l=d.hasOwnProperty,p=Array.prototype,h=window,m=document,g=p.splice,v="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),x=function(e){return"[object Array]"===f.call(e)},b=function(e){return"string"==typeof e},w=function(e){return"function"==typeof e},y=function(e){return"undefined"!=typeof e},acsCmd=function(e){var t=(window.location.hash+"").toLowerCase(),n="acscommand";return e=(e||"").toLowerCase(),t.length>2&&t.indexOf(n)>-1&&t.indexOf(e)>-1?!0:!1};acsCmd();var k,E;!function(d){function f(){}function l(t){if(!t)return t;var n=d;return e(t.split("."),function(e){n=n[e]}),n}function p(p){function h(e,t,n){var r,o,a,s,u,d,f,l,p,h,m,g,v=t&&t.split("/"),x=Y.map,b=x&&x["*"];if(e&&(e=e.split("/"),f=e.length-1,Y._68&&U.test(e[f])&&(e[f]=e[f].replace(U,"")),"."===e[0].charAt(0)&&v&&(g=v.slice(0,v.length-1),e=g.concat(e)),c(e),e=e.join("/")),n&&x&&(v||b)){a=e.split("/");e:for(s=a.length;s>0;s-=1){if(d=a.slice(0,s).join("/"),v)for(u=v.length;u>0;u-=1)if(o=i(x,v.slice(0,u).join("/")),o&&(o=i(o,d))){l=o,p=s;break e}!h&&b&&i(b,d)&&(h=i(b,d),m=s)}!l&&h&&(l=h,p=m),l&&(a.splice(0,p,l),e=a.join("/"))}return r=i(Y.pkgs,e),r?r:e}function m(t){e(s(),function(e){return u(e,"data-requiremodule")===t&&u(e,"data-requirecontext")===F._43?(e.parentNode.removeChild(e),!0):void 0})}function y(e){var t=i(Y.paths,e);return t&&x(t)&&t.length>1?(t.shift(),F.require.undef(e),F._11(null,{_42:!0})([e]),!0):void 0}function k(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e,t,n,r){var o,a,s,u,c=null,d=t?t.name:null,f=e,l=!0,p="";return e||(l=!1,e="_@r"+(et+=1)),u=k(e),c=u[0],e=u[1],c&&(c=h(c,d,r),a=i(W,c)),e&&(c?p=a&&a._30?a._30(e,function(e){return h(e,d,r)}):-1===e.indexOf("!")?h(e,d,r):e:(p=h(e,d,r),u=k(p),c=u[0],p=u[1],n=!0,o=F._60(p))),s=!c||a||n?"":"__45"+(tt+=1),{prefix:c,name:p,_52:t,_45:!!s,url:o,_40:f,isDefine:l,id:(c?c+"!"+p:p)+s}}function M(e){var t=e.id,n=i(H,t);return n||(n=H[t]=new F.Module(e)),n}function S(e,t,r){var o=e.id,a=i(H,o);!n(W,o)||a&&!a._37?(a=M(e),a.error&&"error"===t?r(a.error):a.on(t,r)):"defined"===t&&r(W[o])}function T(e,t){e._50;t&&t(e)}function L(){_.length&&(g.apply(G,[G.length,0].concat(_)),_=[])}function j(e){delete H[e],delete J[e]}function O(t,n,r){var o=t.map.id;t.error?t.emit("error",t.error):(n[o]=!0,e(t._28,function(e,o){var a=e.id,s=i(H,a);!s||t._24[o]||r[a]||(i(n,a)?(t._85(o,W[a]),t.check()):O(s,n,r))}),r[o]=!0)}function D(){var t,n=1e3*Y._41,i=n&&F.startTime+n<(new Date).getTime(),o=[],a=[],s=!1,u=!0;P||(P=!0,r(J,function(e){var n=e.map,r=n.id;if(e.enabled&&(n.isDefine||a.push(e),!e.error))if(!e._67&&i)y(r)?(t=!0,s=!0):(o.push(r),m(r));else if(!e._67&&e._65&&n.isDefine&&(s=!0,!n.prefix))return u=!1}),i&&o.length||(u&&e(a,function(e){O(e,{},{})}),i&&!t||!s||Q||(Q=setTimeout(function(){Q=0,D()},50)),P=!1))}function R(e){n(W,e[0])||M(E(e[0],null,!0)).init(e[1],e[2])}function z(e,t,n,i){e.detachEvent&&!v?i&&e.detachEvent(i,t):e.removeEventListener(n,t,!1)}function B(e){var t=e.currentTarget||e.srcElement;return z(t,F._23,"load","onreadystatechange"),z(t,F._39,"error"),{node:t,id:t&&u(t,"data-requiremodule")}}function I(){var e;for(L();G.length;){if(e=G.shift(),null===e[0])return;R(e)}}var P,$,F,V,Q,Y={_41:7,baseUrl:"./",paths:{},_76:{},pkgs:{},shim:{},config:{}},H={},J={},K={},G=[],W={},X={},Z={},et=1,tt=1;return V={require:function(e){return e.require?e.require:e.require=F._11(e.map)},exports:function(e){return e._51=!0,e.map.isDefine?e.exports?W[e.map.id]=e.exports:e.exports=W[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return i(Y.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},$=function(e){this.events=i(K,e.id)||{},this.map=e,this.shim=i(Y.shim,e.id),this._27=[],this._28=[],this._24=[],this._46={},this._26=0},$.prototype={init:function(e,t,n,i){i=i||{},this._67||(this._31=t,n?this.on("error",n):this.events.error&&(n=a(this,function(e){this.emit("error",e)})),this._28=e&&e.slice(0),this._70=n,this._67=!0,this.ignore=i.ignore,i.enabled||this.enabled?this.enable():this.check())},_85:function(e,t){this._24[e]||(this._24[e]=!0,this._26-=1,this._27[e]=t)},fetch:function(){if(!this._65){this._65=!0,F.startTime=(new Date).getTime();var e=this.map;return this.shim?(F._11(this.map,{_25:!0})(this.shim.deps||[],a(this,function(){return e.prefix?this._48():this.load()})),void 0):e.prefix?this._48():this.load()}},load:function(){var e=this.map.url;X[e]||(X[e]=!0,F.load(this.map.id,e))},check:function(){if(this.enabled&&!this._63){var e,t,n=this.map.id,i=this._27,r=this.exports,o=this._31;if(this._67){if(this.error)this.emit("error",this.error);else if(!this._64){if(this._64=!0,this._26<1&&!this.defined){if(w(o)){if(this.events.error&&this.map.isDefine||b.onError!==f)try{r=F.execCb(n,o,i,r)}catch(a){e=a}else r=F.execCb(n,o,i,r);if(this.map.isDefine&&void 0===r&&(t=this.module,t?r=t.exports:this._51&&(r=this.exports)),e)return e._73=this.map,e._50=this.map.isDefine?[this.map.id]:null,e._74=this.map.isDefine?"define":"require",T(this.error=e)}else r=o;this.exports=r,this.map.isDefine&&!this.ignore&&(W[n]=r,b._29&&b._29(F,this.map,this._28)),j(n),this.defined=!0}this._64=!1,this.defined&&!this._72&&(this._72=!0,this.emit("defined",this.exports),this._37=!0)}}else this.fetch()}},_48:function(){var e=this.map,t=e.id,o=E(e.prefix);this._28.push(o),S(o,"defined",a(this,function(o){var s,u,c,d=i(Z,this.map.id),f=this.map.name,l=this.map._52?this.map._52.name:null,p=F._11(e._52,{_25:!0});return this.map._45?(o._30&&(f=o._30(f,function(e){return h(e,l,!0)})||""),u=E(e.prefix+"!"+f,this.map._52),S(u,"defined",a(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),c=i(H,u.id),c&&(this._28.push(u),this.events.error&&c.on("error",a(this,function(e){this.emit("error",e)})),c.enable()),void 0):d?(this.map.url=F._60(d),this.load(),void 0):(s=a(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),s.error=a(this,function(e){this._67=!0,this.error=e,e._50=[t],r(H,function(e){0===e.map.id.indexOf(t+"__45")&&j(e.map.id)}),T(e)}),s.fromText=a(this,function(i,r){var o=e.name,a=E(o),u=N;r&&(i=r),u&&(N=!1),M(a),n(Y.config,t)&&(Y.config[o]=Y.config[t]);try{b.exec(i)}catch(c){return}u&&(N=!0),this._28.push(a),F._33(o),p([o],s)}),o.load(e.name,p,s,Y),void 0)})),F.enable(o,this),this._46[o.id]=o},enable:function(){J[this.map.id]=this,this.enabled=!0,this._63=!0,e(this._28,a(this,function(e,t){var r,o,s;if("string"==typeof e){if(e=E(e,this.map.isDefine?this.map:this.map._52,!1,!this._42),this._28[t]=e,s=i(V,e.id))return this._27[t]=s(this),void 0;this._26+=1,S(e,"defined",a(this,function(e){this._85(t,e),this.check()})),this._70&&S(e,"error",a(this,this._70))}r=e.id,o=H[r],n(V,r)||!o||o.enabled||F.enable(e,this)})),r(this._46,a(this,function(e){var t=i(H,e.id);t&&!t.enabled&&F.enable(e,this)})),this._63=!1,this.check()},on:function(e,t){var n=this.events[e];n||(n=this.events[e]=[]),n.push(t)},emit:function(t,n){e(this.events[t],function(e){e(n)}),"error"===t&&delete this.events[t]}},F={config:Y,_43:p,_87:H,defined:W,urlFetched:X,_86:G,Module:$,_49:E,nextTick:b.nextTick,onError:T,configure:function(t){t.baseUrl&&"/"!==t.baseUrl.charAt(t.baseUrl.length-1)&&(t.baseUrl+="/");var n=Y.shim,i={paths:!0,_76:!0,config:!0,map:!0};r(t,function(e,t){i[t]?(Y[t]||(Y[t]={}),o(Y[t],e,!0,!0)):Y[t]=e}),t._76&&r(t._76,function(t,n){e(t,function(e){e!==n&&(Z[e]=n)})}),t.shim&&(r(t.shim,function(e,t){x(e)&&(e={deps:e}),!e.exports&&!e.init||e._66||(e._66=F._75(e)),n[t]=e}),Y.shim=n),t._47&&e(t._47,function(e){var t,n;e="string"==typeof e?{name:e}:e,n=e.name,t=e.location,t&&(Y.paths[n]=e.location),Y.pkgs[n]=e.name+"/"+(e.main||"main").replace(A,"").replace(U,"")}),r(H,function(e,t){e._67||e.map._45||(e.map=E(t))}),(t.deps||t.callback)&&F.require(t.deps||[],t.callback)},_75:function(e){function t(){var t;return e.init&&(t=e.init.apply(d,arguments)),t||e.exports&&l(e.exports)}return t},_11:function(e,r){function a(t,i,o){var s,u,c;if(r._25&&i&&w(i)&&(i._88=!0),"string"==typeof t){if(w(i))return;if(e&&n(V,t))return V[t](H[e.id]);if(b.get)return b.get(F,t,e,a);if(u=E(t,e,!1,!0),s=u.id,!n(W,s))return;return W[s]}return I(),F.nextTick(function(){I(),c=M(E(null,e)),c._42=r._42,c.init(t,i,o,{enabled:!0}),D()}),a}return r=r||{},o(a,{toUrl:function(t){var n,i=t.lastIndexOf("."),r=t.split("/")[0],o="."===r||".."===r;return-1!==i&&(!o||i>1)&&(n=t.substring(i,t.length),t=t.substring(0,i)),F._60(h(t,e&&e.id,!0),n,!0)},defined:function(t){return n(W,E(t,e,!1,!0).id)},specified:function(t){return t=E(t,e,!1,!0).id,n(W,t)||n(H,t)}}),e||(a.undef=function(n){L();var r=E(n,e,!0),o=i(H,n);m(n),delete W[n],delete X[r.url],delete K[n],t(G,function(e,t){e[0]===n&&G.splice(t,1)}),o&&(o.events.defined&&(K[n]=o.events),j(n))}),a},enable:function(e){var t=i(H,e.id);t&&M(e).enable()},_33:function(e){var t,r,o,a=i(Y.shim,e)||{},s=a.exports;for(L();G.length;){if(r=G.shift(),null===r[0]){if(r[0]=e,t)break;t=!0}else r[0]===e&&(t=!0);R(r)}if(o=i(H,e),!t&&!n(W,e)&&o&&!o._67){if(!(!Y._61||s&&l(s)))return y(e)?void 0:void 0;R([e,a.deps||[],a._66])}D()},_60:function(e,t,n){var r,o,a,s,u,c,d,f=i(Y.pkgs,e);if(f&&(e=f),d=i(Z,e))return F._60(d,t,n);if(b._54.test(e))u=e+(t||"");else{for(r=Y.paths,o=e.split("/"),a=o.length;a>0;a-=1)if(s=o.slice(0,a).join("/"),c=i(r,s)){x(c)&&(c=c[0]),o.splice(0,a,c);break}u=o.join("/"),u+=t||(/^data\:|\?/.test(u)||n?"":".js"),u=("/"===u.charAt(0)||u.match(/^[\w\+\.\-]+:/)?"":Y.baseUrl)+u}return Y._71?u+((-1===u.indexOf("?")?"?":"&")+Y._71):u},load:function(e,t){b.load(F,e,t)},execCb:function(e,t,n,i){return t.apply(i,n)},_23:function(e){if("load"===e.type||C.test((e.currentTarget||e.srcElement).readyState)){q=null;var t=B(e);F._33(t.id)}},_39:function(e){var t=B(e);!y(t.id)}},F.require=F._11(),F}function h(){return q&&"interactive"===q.readyState?q:(t(s(),function(e){return"interactive"===e.readyState?q=e:void 0}),q)}var b,y,M,S,q,T,C="PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,L="_",j=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,O=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,U=/\.js$/,A=/^\.\//,D={},R={},_=[],N=!1;b=function(e,t,n,r){var o,a,s=L;return x(e)||"string"==typeof e||(a=e,x(t)?(e=t,t=n,n=r):e=[]),a&&a.context&&(s=a.context),o=i(D,s),o||(o=D[s]=b.s.newContext(s)),a&&o.configure(a),o.require(e,t,n)},b.config=function(e){return b(e)},b.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},k=b,b._54=/^\/|:|\?|\.js$/,y=b.s={contexts:D,newContext:p},b({}),e(["toUrl","undef","defined","specified"],function(e){b[e]=function(){var t=D[L];return t.require[e].apply(t,arguments)}}),M=y.head=m.getElementsByTagName("head")[0],S=m.getElementsByTagName("base")[0],S&&(M=y.head=S.parentNode),b.onError=f,b.createNode=function(e){var t=e.xhtml?m.createElementNS("http://www.w3.org/1999/xhtml","html:script"):m.createElement("script");return t.type=e.scriptType||"text/javascript",t.charset="utf-8",t.async=!0,t},b.load=function(e,t,n){var i,r=e&&e.config||{};return i=b.createNode(r,t,n),i.setAttribute("data-requirecontext",e._43),i.setAttribute("data-requiremodule",t),!i.attachEvent||i.attachEvent.toString&&i.attachEvent.toString().indexOf("[native code")<0||v?(i.addEventListener("load",e._23,!1),i.addEventListener("error",e._39,!1)):(N=!0,i.attachEvent("onreadystatechange",e._23)),i.src=n,T=i,S?M.insertBefore(i,S):M.appendChild(i),T=null,i},E=function(e,t,n){var i,r;"string"!=typeof e&&(n=t,t=e,e=null),x(t)||(n=t,t=null),!t&&w(n)&&(t=[],n.length&&(n.toString().replace(j,"").replace(O,function(e,n){t.push(n)}),t=(1===n.length?["require"]:["require","exports","module"]).concat(t))),N&&(i=T||h(),i&&(e||(e=u(i,"data-requiremodule")),r=D[u(i,"data-requirecontext")])),(r?r._86:_).push([e,t,n])},b.exec=function(e){return new Function(e)()},b(R)}(this),h._acsDefine=E,h._acsRequire=k;var AnswersProductWhitelist={};
 
      /**
    * Defines the webcollageSnippet product
    */
    AnswersProductWhitelist.webcollageSnippet = ({  check: typeof window.acsWcEnabled == 'undefined' || window.acsWcEnabled,
    dependencies: [document.location.protocol == 'http:' ?
        "http://content.webcollage.net/api/v2/product-content" :
        "https://scontent.webcollage.net/api/v2/product-content"]
});
 
var M=function(e){function t(e){p=1;do e=i.shift(),e&&e();while(e)}var n,i=[],r=!1,o=document,a=o.documentElement,s=a.doScroll,u="DOMContentLoaded",c="addEventListener",d="onreadystatechange",f="readyState",l=s?/^loaded|^c/:/^loaded|c/,p=l.test(o[f]);return o[c]&&o[c](u,n=function(){o.removeEventListener(u,n,r),t()},r),s&&o.attachEvent(d,n=function(){/^c/.test(o[f])&&(o.detachEvent(d,n),t())}),e=s?function(t){self!=top?p?t():i.push(t):function(){try{a.doScroll("left")}catch(n){return setTimeout(function(){e(t)},50)}t()}()}:function(e){p?e():i.push(e)}}(),S={_84:"R034BC94372",_79:function(){var t,n,i,r=s(),o="gateway",a="/";return e(r,function(e){i=u(e,"src")||"","acs"==u(e,"data-vendor")&&u(e,"data-role")==o?t=e:i.indexOf(o)>-1&&(n=e)}),t||(t=n),t?(i=u(t,"src"),-1==i.indexOf(":/")&&i.substr(0,1)!=a&&(r=h.location.href.toString().split(a),r[r.length-1].indexOf(".")>-1&&r[r.length-1].toLowerCase()!=h.location.hostname.toLowerCase()&&r.pop(),i=r.join(a)+(i.substr(0,1)==a?"":a)+i),i=i.split(a),i.pop(),c(i),i.join(a)+a):void 0}()};S._89=function(e,t){return function(n){n=n||"/";"v="+encodeURIComponent(S._84);return-1==n.indexOf("//")&&(n="/"==e.substr(e.length-1,1)&&"/"==n.substr(0,1)?e+n.substr(1):e+n),n+(n.indexOf("?")>-1?"&":"?")+"v="+encodeURIComponent(t)}}(S._79,S._84);var q=[];r(AnswersProductWhitelist,function(e){if(e.check===!0||w(e.check)&&e.check.call(e)){var t=e.dependencies;q=q.concat(b(t)?[t]:t)}}),e(q,function(e,t){q[t]=S._89(e)});var T=[],C="acsReady",L=!1,j=function(){M(function(){for(;T.length>0;)T.pop().call()})},O=window["__"+C+"__"]=function(){for(var e=0;e<arguments.length;e++)w(arguments[e])&&T.push(arguments[e]);L&&j()};y(window[C])||(window[C]=O),E("_acs",function(){return{home:S._79,allReady:O,domReady:M,products:AnswersProductWhitelist,makeURI:S._89}}),k(q,function(){L=!0,j()});var U="_acsDSPLYOK",A=function(e){if(e=e||document.getElementsByTagName("head")[0]){for(var t=e.getElementsByTagName("title"),n=e.getElementsByTagName("meta"),i=t.length?t[0].innerHTML:null,r=[],o=[],a=0;a<n.length;a++){var s=n[a].getAttribute("name");s&&"description"===s.toLowerCase()?n[a].getAttribute("content")&&r.push(n[a].getAttribute("content")):s&&"keywords"===s.toLowerCase()&&n[a].getAttribute("content")&&o.push(n[a].getAttribute("content"))}var u,c=window.navigator.userAgent.indexOf("MSIE ")>-1,d=function(e,t){var n="",i=function(e){var t,n,i=[];for(t=0;t<e.length;t++)n=e.charCodeAt(t),i.push(String.fromCharCode(n+1));return i.join("")},r=encodeURIComponent(i(e));return n=c&&t+r.length>2e3?t>2e3?"":r.slice(0,2e3-t):r,t+=n.length,{res:n,lngt:t}},f="",l=0;return i&&(u=d(i.toString(),l),f+="&t="+u.res,l=u.lngt),r.toString()&&(u=d(r.toString(),l),f+="&md="+u.res,l=u.lngt),o.toString()&&(u=d(o.toString(),l),f+="&mk="+u.res,l=u.lngt),window.location&&window.location.host&&(u=d(window.location.host,l),f+="&st="+u.res),f}return""};O(function(){setTimeout(function(){if(!y(window[U])||window[U]===!0){var e=new Image;e.src="https://www.dsply.com/?pid=01nzy3bz91"+A()}},250)})}}();