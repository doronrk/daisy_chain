var _$OGO$_;
(function() {

	var _ogo;

	/**
	 * Export as a global, but only if undefined
	 */
	if (!_$OGO$_) {

		_ogo = {"Rosetta": {}, "shared": "shared"};
		_ogo.VERSION = "3";  // you MUST increment this number when pushing a new version to usweb
		// do we need this?
		_ogo.trace = window['console'] ? function(tmp) {
			try {
				console.log(tmp);
			} catch (e) {
			}
		} : function() {
		};

		_ogo.Rosetta.requireJSLoader = (function() {
			// Define a require object here that has any
			// default configuration you want for RequireJS. If
			// you do not have any config options you want to set,
			// just use a simple object literal, {}. You may need
			// to at least set baseUrl.
			var require = {};

			// INSERT require.js CONTENTS HERE
			/*
			 RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
			 Available via the MIT or new BSD license.
			 see: http://github.com/jrburke/requirejs for details
			*/
			var requirejs,require,define;
			(function(ca){function G(b){return"[object Function]"===M.call(b)}function H(b){return"[object Array]"===M.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function U(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function s(b,c){return ga.call(b,c)}function j(b,c){return s(b,c)&&b[c]}function B(b,c){for(var d in b)if(s(b,d)&&c(b[d],d))break}function V(b,c,d,g){c&&B(c,function(c,h){if(d||!s(b,h))g&&"object"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof
			RegExp)?(b[h]||(b[h]={}),V(b[h],c,d,g)):b[h]=c});return b}function t(b,c){return function(){return c.apply(b,arguments)}}function da(b){throw b;}function ea(b){if(!b)return b;var c=ca;v(b.split("."),function(b){c=c[b]});return c}function C(b,c,d,g){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=g;d&&(c.originalError=d);return c}function ha(b){function c(a,e,b){var f,n,c,d,g,h,i,I=e&&e.split("/");n=I;var m=l.map,k=m&&m["*"];if(a&&"."===a.charAt(0))if(e){n=
			I.slice(0,I.length-1);a=a.split("/");e=a.length-1;l.nodeIdCompat&&R.test(a[e])&&(a[e]=a[e].replace(R,""));n=a=n.concat(a);d=n.length;for(e=0;e<d;e++)if(c=n[e],"."===c)n.splice(e,1),e-=1;else if(".."===c)if(1===e&&(".."===n[2]||".."===n[0]))break;else 0<e&&(n.splice(e-1,2),e-=2);a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if(b&&m&&(I||k)){n=a.split("/");e=n.length;a:for(;0<e;e-=1){d=n.slice(0,e).join("/");if(I)for(c=I.length;0<c;c-=1)if(b=j(m,I.slice(0,c).join("/")))if(b=j(b,d)){f=b;
			g=e;break a}!h&&(k&&j(k,d))&&(h=j(k,d),i=e)}!f&&h&&(f=h,g=i);f&&(n.splice(0,g,f),a=n.join("/"))}return(f=j(l.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName("script"),function(e){if(e.getAttribute("data-requiremodule")===a&&e.getAttribute("data-requirecontext")===i.contextName)return e.parentNode.removeChild(e),!0})}function g(a){var e=j(l.paths,a);if(e&&H(e)&&1<e.length)return e.shift(),i.require.undef(a),i.require([a]),!0}function u(a){var e,b=a?a.indexOf("!"):-1;-1<b&&(e=a.substring(0,
			b),a=a.substring(b+1,a.length));return[e,a]}function m(a,e,b,f){var n,d,g=null,h=e?e.name:null,l=a,m=!0,k="";a||(m=!1,a="_@r"+(M+=1));a=u(a);g=a[0];a=a[1];g&&(g=c(g,h,f),d=j(p,g));a&&(g?k=d&&d.normalize?d.normalize(a,function(a){return c(a,h,f)}):c(a,h,f):(k=c(a,h,f),a=u(k),g=a[0],k=a[1],b=!0,n=i.nameToUrl(k)));b=g&&!d&&!b?"_unnormalized"+(Q+=1):"";return{prefix:g,name:k,parentMap:e,unnormalized:!!b,url:n,originalName:l,isDefine:m,id:(g?g+"!"+k:k)+b}}function q(a){var e=a.id,b=j(k,e);b||(b=k[e]=new i.Module(a));
			return b}function r(a,e,b){var f=a.id,n=j(k,f);if(s(p,f)&&(!n||n.defineEmitComplete))"defined"===e&&b(p[f]);else if(n=q(a),n.error&&"error"===e)b(n.error);else n.on(e,b)}function w(a,e){var b=a.requireModules,f=!1;if(e)e(a);else if(v(b,function(e){if(e=j(k,e))e.error=a,e.events.error&&(f=!0,e.emit("error",a))}),!f)h.onError(a)}function x(){S.length&&(ia.apply(A,[A.length,0].concat(S)),S=[])}function y(a){delete k[a];delete W[a]}function F(a,e,b){var f=a.map.id;a.error?a.emit("error",a.error):(e[f]=
			!0,v(a.depMaps,function(f,c){var d=f.id,g=j(k,d);g&&(!a.depMatched[c]&&!b[d])&&(j(e,d)?(a.defineDep(c,p[d]),a.check()):F(g,e,b))}),b[f]=!0)}function D(){var a,e,b=(a=1E3*l.waitSeconds)&&i.startTime+a<(new Date).getTime(),f=[],c=[],h=!1,k=!0;if(!X){X=!0;B(W,function(a){var i=a.map,m=i.id;if(a.enabled&&(i.isDefine||c.push(a),!a.error))if(!a.inited&&b)g(m)?h=e=!0:(f.push(m),d(m));else if(!a.inited&&(a.fetched&&i.isDefine)&&(h=!0,!i.prefix))return k=!1});if(b&&f.length)return a=C("timeout","Load timeout for modules: "+
			f,null,f),a.contextName=i.contextName,w(a);k&&v(c,function(a){F(a,{},{})});if((!b||e)&&h)if((z||fa)&&!Y)Y=setTimeout(function(){Y=0;D()},50);X=!1}}function E(a){s(p,a[0])||q(m(a[0],null,!0)).init(a[1],a[2])}function K(a){var a=a.currentTarget||a.srcElement,e=i.onScriptLoad;a.detachEvent&&!Z?a.detachEvent("onreadystatechange",e):a.removeEventListener("load",e,!1);e=i.onScriptError;(!a.detachEvent||Z)&&a.removeEventListener("error",e,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function L(){var a;
			for(x();A.length;){a=A.shift();if(null===a[0])return w(C("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));E(a)}}var X,$,i,N,Y,l={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},k={},W={},aa={},A=[],p={},T={},ba={},M=1,Q=1;N={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?p[a.map.id]=a.exports:a.exports=p[a.map.id]={}},module:function(a){return a.module?
			a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return j(l.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};$=function(a){this.events=j(aa,a.id)||{};this.map=a;this.shim=j(l.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};$.prototype={init:function(a,e,b,f){f=f||{};if(!this.inited){this.factory=e;if(b)this.on("error",b);else this.events.error&&(b=t(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=
			b;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,e){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=e)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],t(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
			this.map.url;T[a]||(T[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,e,b=this.map.id;e=this.depExports;var f=this.exports,c=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(c)){if(this.events.error&&this.map.isDefine||h.onError!==da)try{f=i.execCb(b,c,e,f)}catch(d){a=d}else f=i.execCb(b,c,e,f);this.map.isDefine&&void 0===f&&((e=this.module)?f=e.exports:this.usingExports&&
			(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else f=c;this.exports=f;if(this.map.isDefine&&!this.ignore&&(p[b]=f,h.onResourceLoad))h.onResourceLoad(i,this.map,this.depMaps);y(b);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=
			this.map,b=a.id,d=m(a.prefix);this.depMaps.push(d);r(d,"defined",t(this,function(f){var d,g;g=j(ba,this.map.id);var J=this.map.name,u=this.map.parentMap?this.map.parentMap.name:null,p=i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(J=f.normalize(J,function(a){return c(a,u,!0)})||""),f=m(a.prefix+"!"+J,this.map.parentMap),r(f,"defined",t(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),g=j(k,f.id)){this.depMaps.push(f);
			if(this.events.error)g.on("error",t(this,function(a){this.emit("error",a)}));g.enable()}}else g?(this.map.url=i.nameToUrl(g),this.load()):(d=t(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),d.error=t(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];B(k,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),d.fromText=t(this,function(f,c){var g=a.name,J=m(g),k=O;c&&(f=c);k&&(O=!1);q(J);s(l.config,b)&&(l.config[g]=l.config[b]);try{h.exec(f)}catch(j){return w(C("fromtexteval",
			"fromText eval for "+b+" failed: "+j,j,[b]))}k&&(O=!0);this.depMaps.push(J);i.completeLoad(g);p([g],d)}),f.load(a.name,p,d,l))}));i.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){W[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,t(this,function(a,b){var c,f;if("string"===typeof a){a=m(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=j(N,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;r(a,"defined",t(this,function(a){this.defineDep(b,
			a);this.check()}));this.errback&&r(a,"error",t(this,this.errback))}c=a.id;f=k[c];!s(N,c)&&(f&&!f.enabled)&&i.enable(a,this)}));B(this.pluginMaps,t(this,function(a){var b=j(k,a.id);b&&!b.enabled&&i.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:l,contextName:b,registry:k,defined:p,urlFetched:T,defQueue:A,Module:$,makeModuleMap:m,
			nextTick:h.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=l.shim,c={paths:!0,bundles:!0,config:!0,map:!0};B(a,function(a,b){c[b]?(l[b]||(l[b]={}),V(l[b],a,!0,!0)):l[b]=a});a.bundles&&B(a.bundles,function(a,b){v(a,function(a){a!==b&&(ba[a]=b)})});a.shim&&(B(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);b[c]=a}),l.shim=b);a.packages&&v(a.packages,function(a){var b,
			a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(l.paths[b]=a.location);l.pkgs[b]=a.name+"/"+(a.main||"main").replace(ja,"").replace(R,"")});B(k,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=m(b))});if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(ca,arguments));return b||a.exports&&ea(a.exports)}},makeRequire:function(a,e){function g(f,c,d){var j,l;e.enableBuildCallback&&(c&&G(c))&&(c.__requireJsBuild=
			!0);if("string"===typeof f){if(G(c))return w(C("requireargs","Invalid require call"),d);if(a&&s(N,f))return N[f](k[a.id]);if(h.get)return h.get(i,f,a,g);j=m(f,a,!1,!0);j=j.id;return!s(p,j)?w(C("notloaded",'Module name "'+j+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):p[j]}L();i.nextTick(function(){L();l=q(m(null,a));l.skipMap=e.skipMap;l.init(f,c,d,{enabled:!0});D()});return g}e=e||{};V(g,{isBrowser:z,toUrl:function(b){var e,d=b.lastIndexOf("."),g=b.split("/")[0];if(-1!==
			d&&(!("."===g||".."===g)||1<d))e=b.substring(d,b.length),b=b.substring(0,d);return i.nameToUrl(c(b,a&&a.id,!0),e,!0)},defined:function(b){return s(p,m(b,a,!1,!0).id)},specified:function(b){b=m(b,a,!1,!0).id;return s(p,b)||s(k,b)}});a||(g.undef=function(b){x();var c=m(b,a,!0),e=j(k,b);d(b);delete p[b];delete T[c.url];delete aa[b];U(A,function(a,c){a[0]===b&&A.splice(c,1)});e&&(e.events.defined&&(aa[b]=e.events),y(b))});return g},enable:function(a){j(k,a.id)&&q(a).enable()},completeLoad:function(a){var b,
			c,f=j(l.shim,a)||{},d=f.exports;for(x();A.length;){c=A.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}c=j(k,a);if(!b&&!s(p,a)&&c&&!c.inited){if(l.enforceDefine&&(!d||!ea(d)))return g(a)?void 0:w(C("nodefine","No define call for "+a,null,[a]));E([a,f.deps||[],f.exportsFn])}D()},nameToUrl:function(a,b,c){var f,d,g;(f=j(l.pkgs,a))&&(a=f);if(f=j(ba,a))return i.nameToUrl(f,b,c);if(h.jsExtRegExp.test(a))f=a+(b||"");else{f=l.paths;a=a.split("/");for(d=a.length;0<d;d-=1)if(g=a.slice(0,
			d).join("/"),g=j(f,g)){H(g)&&(g=g[0]);a.splice(0,d,g);break}f=a.join("/");f+=b||(/^data\:|\?/.test(f)||c?"":".js");f=("/"===f.charAt(0)||f.match(/^[\w\+\.\-]+:/)?"":l.baseUrl)+f}return l.urlArgs?f+((-1===f.indexOf("?")?"?":"&")+l.urlArgs):f},load:function(a,b){h.load(i,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ka.test((a.currentTarget||a.srcElement).readyState))P=null,a=K(a),i.completeLoad(a.id)},onScriptError:function(a){var b=K(a);if(!g(b.id))return w(C("scripterror",
			"Script error for: "+b.id,a,[b.id]))}};i.require=i.makeRequire();return i}var h,x,y,D,K,E,P,L,q,Q,la=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ma=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,R=/\.js$/,ja=/^\.\//;x=Object.prototype;var M=x.toString,ga=x.hasOwnProperty,ia=Array.prototype.splice,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),fa=!z&&"undefined"!==typeof importScripts,ka=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,
			Z="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},r={},S=[],O=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(G(requirejs))return;r=requirejs;requirejs=void 0}"undefined"!==typeof require&&!G(require)&&(r=require,require=void 0);h=requirejs=function(b,c,d,g){var u,m="_";!H(b)&&"string"!==typeof b&&(u=b,H(c)?(b=c,c=d,d=g):b=[]);u&&u.context&&(m=u.context);(g=j(F,m))||(g=F[m]=h.s.newContext(m));u&&g.configure(u);return g.require(b,c,d)};h.config=function(b){return h(b)};
			h.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=h);h.version="2.1.11";h.jsExtRegExp=/^\/|:|\?|\.js$/;h.isBrowser=z;x=h.s={contexts:F,newContext:ha};h({});v(["toUrl","undef","defined","specified"],function(b){h[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))y=x.head=D.parentNode;h.onError=da;h.createNode=function(b){var c=
			b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};h.load=function(b,c,d){var g=b&&b.config||{};if(z)return g=h.createNode(g,c,d),g.setAttribute("data-requirecontext",b.contextName),g.setAttribute("data-requiremodule",c),g.attachEvent&&!(g.attachEvent.toString&&0>g.attachEvent.toString().indexOf("[native code"))&&!Z?(O=!0,g.attachEvent("onreadystatechange",b.onScriptLoad)):
			(g.addEventListener("load",b.onScriptLoad,!1),g.addEventListener("error",b.onScriptError,!1)),g.src=d,L=g,D?y.insertBefore(g,D):y.appendChild(g),L=null,g;if(fa)try{importScripts(d),b.completeLoad(c)}catch(j){b.onError(C("importscripts","importScripts failed for "+c+" at "+d,j,[c]))}};z&&!r.skipDataMain&&U(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(K=b.getAttribute("data-main"))return q=K,r.baseUrl||(E=q.split("/"),q=E.pop(),Q=E.length?E.join("/")+"/":"./",r.baseUrl=
			Q),q=q.replace(R,""),h.jsExtRegExp.test(q)&&(q=K),r.deps=r.deps?r.deps.concat(q):[q],!0});define=function(b,c,d){var g,h;"string"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(la,"").replace(ma,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(O){if(!(g=L))P&&"interactive"===P.readyState||U(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return P=b}),g=P;g&&(b||
			(b=g.getAttribute("data-requiremodule")),h=F[g.getAttribute("data-requirecontext")])}(h?h.defQueue:S).push([b,c,d])};define.amd={jQuery:!0};h.exec=function(b){return eval(b)};h(r)}})(this);
			// END require.js CONTENTS

			return require;
		}());

		var JSON;
        //-- JSON PARSER -->
        if (typeof JSON !== "object") { JSON = {}; } (function () { function f(n) { return n < 10 ? "0" + n : n; } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null; }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key); } if (typeof rep === "function") { value = rep.call(holder, key, value); } switch (typeof value) { case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null"; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null"; } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v; } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v); } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v); } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v; } } if (typeof JSON.stringify !== "function") { JSON.stringify = function (value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " "; } } else { if (typeof space === "string") { indent = space; } } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify"); } return str("", { "": value }); }; } if (typeof JSON.parse !== "function") { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j; } throw new SyntaxError("JSON.parse"); }; } }());
        //-- END JSON PARSER -->
		_ogo.JSON = JSON;


		function getIMG(url) {
			var cb = Math.random() * 10000000000000000000;
			var img = new Image();
			img.src = url + "&_cb=" + cb;
			return img;
		}

		_ogo.embed = function(dmo) {
			var theDmo = dmo;
			try {
				theDmo._createdTime = (new Date()).valueOf();

				///////////////////////////////////////////////////////
				////  TESTING ONLY
				///////////////////////////////////////////////////////
				if(window['MRAID_TEST']) {
					theDmo.device_id = MRAID_TEST.device_id;
					if(MRAID_TEST.impNotify !== undefined) {
						theDmo.impNotify = MRAID_TEST.impNotify;
					}
					theDmo.nurl = MRAID_TEST.nurl;
					theDmo.spDebug = MRAID_TEST.spDebug;
				}
				///////////////////////////////////////////////////////

				theDmo.flag = {};
				theDmo.eventIMGs = [];
				theDmo.onceEventIDs = {};
				theDmo._eventCompleteCounter=0;

				theDmo.opChk = function(c) {
					var ot = new Date().valueOf();
					if (!this.flag[c]) {
						this.flag[c] = ot;
						return true;
					}
					var diff = ot - this.flag[c];
					this.flag[c] = ot;
					return diff > 300;
				};
				theDmo.open = function(u, t, f) {
					if (u) {
						var w = window;
						if (this.device_id) {
							if (window["RAC"]) {
								w = window["RAC"];
							} else {
								if (this.openHREF(u, t, f)) {
									w = null;
								} else {
									if (window["mraid"]) {
										w = window["mraid"];
									}
								}
							}
						}
						if (w) {
							if (f) {
								w.open(u, t, f);
							} else {
								if (t) {
									w.open(u, t);
								} else {
									w.open(u, "_blank");
								}
							}
						}
					}
				};
				theDmo.isIOS = function() {
					return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
				};
				theDmo.openHREF = function(u, t, f) {
					if (this.isIOS()) {
						try {
							var a = document.createElement("a");
							a.href = u;
							if (!t) {
								t = "_blank";
							}
							a.target = t;
							document.body.appendChild(a);
							a.click();
							document.body.removeChild(a);
							a = null;
							return true;
						} catch (e) {
							//alert("ERROR WITH CLICK");
						}
					}
					return false;
				};
				theDmo.handleCommand = function(c, a, fs) {
					// TODO - what is this Chrome check for?
					if ((fs == "_self") && (navigator.userAgent.indexOf("Chrome") != -1))
						return;
					if (c.indexOf("FSCommand") != -1) {
						c = c.split(":")[1];
					}

					if (!this.opChk(c))
						return;

					switch (c) {
						case "clickprev":
						case "click":
							var phase = (c == "click" ? 20 : 10);
							//if this.clickable is not explicitly to false, then proceed with the click functionality
							if (this.clickable !== false) {
								var i = 0;
								var frame = 0;
								var rurl = "";
								a = eval(a);
								if (a) {
									i = a[0];
									if (a.length > 1) {
										frame = a[1];
									}
									if (a.length > 2) {
										// FIXME?? or do we even have any creative that uses this click calling path?
										if (a[2] == null || a[2].match(/^(http)/) == null) {
											break;
										}
										if (fs) {
											rurl = a[2];
										} else {
											rurl = escape(a[2]);
										}
									} else {
										rurl = this.clickURL[i];
									}
								} else {
									i = 0;
									rurl = this.clickURL[0];
									frame = 0;
								}
								this.open(this.getRurl(i, phase, rurl, frame), "_blank");
							} else {
								//this.clickable was explicitly set to false.
								alert('handleClick: ' + a);
							}
							break;
							// FIXME - ddabbs: can we remove? I believe this is a legacy of our old in-house banner menu.
						case "menuClick":
							var url = this.menuURL + "?cname=" + this.companyName + "&cid=" + this.companyId + "&cmagic=" + this.companyMagic + "&msgid=" + this.msgCampId;
							window.open(url, "userprefs", "status=0,toolbar=0,location=0,menubar=0,directories=0,scrollbars=1,width=640,height=790");
							break;
						case "banner_load":
						case "banner_show":
						case "banner_live":
						case "menu_info":
						case "template_info":
							break;
						default:
							if (c == null || c.match(/^(http)/) == null) {
								break;
							}
							this.open(c, "_self", a);
							break;
					}
				};
				theDmo.getRurl = function(i, phase, rurl, frame) {
					if (rurl == null || rurl == "") {
						rurl = this.clickURL[0];
					}
					// handle any required (exchange) click tracking
					if (this.cturl.indexOf("http") == 0) {
						this.cturlIMG = new Image();
						this.cturlIMG.src = decodeURIComponent(this.cturl);
					}
					// handle any required creative tracking
					if (this.clickURLCode && this.clickURLCode.length >= i + 1) {
						theDmo.logEvent(this.clickURLCode[i]);
					}
					return (this.eventURL + "&opid=2&rurli=" + i + "&phase=" + phase + "&frame=" + frame + "&rurl=" + rurl);
				};

				theDmo.getIMG = getIMG;

				theDmo.doViewNotify = function() {
					if (this.viewNotify) {
						this.viewNotifyIMG = this.getIMG(this.viewNotify);
					}
				};
				theDmo.doImprNotify = function() {
					// Firing Impression Notify only when NURL is false
					// when nurl==true, then the exchange is firing the impression notify pixel
					// we returned with the bid
					if (this.nurl === false && this.impNotify && !this.imprNotifyIMG) {
						this.imprNotifyIMG = this.getIMG(this.impNotify);
					}
				};
				theDmo.shouldUseVapi = function() {
					return (false && !this.device_id && this.viewabilityEnabled && this.viewabilityScriptUrl && _$OGO$_['vapi']);
				};
				theDmo.logEvent = function(eventId, eventDetail) {
					try {
						// Allow any eventId, happy path always has a numeric value. Any invalid values are due to
						// campaign setup, the source of which can be identified in impression logs.
						if (this.viewabilityPixelUrl) {
							var url = this.viewabilityPixelUrl + "&etype=" + eventId;
							if (eventDetail) {
								url = url + "&edtl=" + encodeURIComponent(eventDetail);
							}
							var et = (new Date()).valueOf() - this._createdTime;
							url = url + "&vtime=" + et;
							url = url + "&ver=" + _ogo.VERSION;
							this.eventIMGs.push(this.getIMG(url));
						}
					} catch (e) {
					}
				};
				theDmo.logEventOnce = function(eventId, eventDetail) {
					try	{
						if(!this.onceEventIDs[eventId]) {
							this.onceEventIDs[eventId]=true;
							this.logEvent(eventId, eventDetail);
						}
					} catch (e) {
					}
				};
				theDmo.logError = function(eventDetail) {
					try {
						this.logEvent(10000, eventDetail);
					} catch (e) {
					}
				};

				function MRAIDControl(){
					this.creative = null;

					if (window["mraid"]) {

						this.hasMraid = true;
						var mstate = mraid.getState();

						var mv = "undefined";
                        if (mraid['isViewable']) {
                            try {
								mv = mraid.isViewable();
                            } catch (e) {
								mv = "exception";
                            }
                        }

                        var pt = "undefined";
                        if (mraid['getPlacementType']) {
                            try {
								pt = mraid.getPlacementType();
                            } catch (e) {
								pt = "exception";
                            }
                        }
                        theDmo.logEvent(10001, mstate + ":" + mv + ":" + pt);
					} else {
						this.hasMraid = false;
					}
				}

				var mraidController = new MRAIDControl();
				mraidController.checkReady=function() {
					var ready = true;
					if(this.hasMraid) {
						ready = false;
						if(mraid.getState()=="default") {
							if(mraid['isViewable']) {
								var mv = mraid.isViewable();
								ready = (mv === true || mv == "true");
							}
						}
					}
					return ready;
				};

				mraidController.onStateChange=function() {
					if(this.creative){
						// tell the creative whether the environment is ready
						var ready = this.checkReady();
						if(this.creative['enviromentReady']) {
							this.creative.enviromentReady(ready);
						}
						// if ready, and we have MRAID, log the MRAID visible event
						if(this.hasMraid && ready) {
							theDmo.doImprNotify();
							theDmo.logEventOnce(95);
						}
					}
				};

				mraidController.onCreativeReady=function(c) {
					this.creative = c;
					this.onStateChange();

					if(this.hasMraid) {
						if(mraid.getState()=="loading") {
							mraid.addEventListener("ready", function() {
								mraidController.onStateChange();
							});
						}
						mraid.addEventListener("stateChange", function(s) {
							mraidController.onMraidStateChange(s);
						});
						mraid.addEventListener("viewableChange", function(v) {
							mraidController.onMraidViewChange(v);
						});
					}
				};

				mraidController.onMraidViewChange = function(viewable) {
					try {
						this.onStateChange();

						if (!viewable && this.creative) {
							// Ad container no longer displays the ad
							// firing the MRAID Not visible Event Logging call
							theDmo.logEventOnce(96);
						}
					} catch (e) {
					}
				};

				mraidController.onMraidStateChange = function(mraidState) {
					try {
						this.onStateChange();

						if (mraidState=="hidden" && this.creative) {
							// Ad container no longer displays the ad
							// firing the MRAID Not visible Event Logging call
							theDmo.logEventOnce(96);
						}
					} catch (e) {
					}
				};

				theDmo.doViewNotify();

				//
				// find the element into which we'll insert the script that loads the creative
				// this element needs to be named so Site Personalization can set a timer to empty the div when we exceed the load timeout
				//
				var sce = document.getElementById(theDmo.embedId + "_call");

				var req = [theDmo.objectSrc];
				if (theDmo.shouldUseVapi()) {
					req.push(theDmo.viewabilityScriptUrl);
				}
                                // insert the "embed" element - the div into which all the visible creative content is injected
                                var dmoee = theDmo.embedElement = document.createElement("span");
                                dmoee.id = theDmo.embedId;
                                sce.parentNode.insertBefore(dmoee, sce);

                                if (theDmo.menuURL) {
                                        // inject AdChoices divs and add menuUrl to require list
                                        var dv = theDmo.embedElement = document.createElement("span");
                                        dv.id = theDmo.trid;//"pmenu-css";

					var adinfo_script = document.createElement("script");
                                        adinfo_script.src = theDmo.menuURL;
                                        adinfo_script.type = "text/javascript";
                                        dv.appendChild(adinfo_script);
                                        sce.parentNode.insertBefore(dv, sce);
                               }


				// closure vars
				var R = this.Rosetta;
				var JSL = R.requireJSLoader;

				function doRequire(toLoad, onReady, onErr, conf) {
					JSL.onError = onErr || function(e) {
						theDmo.logError(e);
					};
					JSL.config(conf || {"waitSeconds": 10});
					JSL(toLoad, onReady);
				}

				function onCreativeLoaded() {
					theDmo._eventCompleteCounter+=1;
					try {
						if (theDmo.shouldUseVapi()) {
							// create and start vision
							theDmo.vapi = new _$OGO$_.vapi(theDmo);
						} else {
							theDmo.vapi = {};
						}
					} catch (e) {
					}

					if (!R.loadedCreatives) {
						R.loadedCreatives = [];
					}

					var creatives = R.creatives;
					if (!creatives || creatives.length == 0){
						theDmo.logEvent(10005, theDmo._eventCompleteCounter);
					} else {
						if (theDmo._eventCompleteCounter > 1){
							theDmo.logEvent(10006, theDmo._eventCompleteCounter);
						}

						var c = creatives.shift();
						R.loadedCreatives.push({"creative": c, "dmo": theDmo});

						var creative = new c(theDmo);

						///////////////////////////////////////////////////////
						////  TESTING ONLY - REMOVE- REMOVE - REMOVE
						///////////////////////////////////////////////////////
						/*
						creative.enviromentReady = function(){};
						creative.registerCallback = function(event, callback, scope){
							setTimeout(callback, 2000);
						};
						*/

						function onCreativeReady() {
							if (window['RAC'] && !theDmo.isIOS())
								window['RAC'].notifyAdReady();

							mraidController.onCreativeReady(creative);

						}

						var isNewCreative = creative['registerCallback'] ? true : false;
						if(isNewCreative){
							creative.registerCallback("creative_ready", onCreativeReady);
							creative.enviromentReady(mraidController.checkReady());
						} else {
							onCreativeReady();
						}

						creative.init(theDmo.embedId, doRequire);
					}
				}

				// insert the creative script (and possibly menu script and possibly vapi)
				// when the creative code and dependencies are loaded, onCreativeLoaded will be called.
				doRequire(req, onCreativeLoaded);

			} catch (e) {
				if(theDmo && theDmo['logEvent']) {
					theDmo.logError("G:"+e);
				}
			}
		};

		_ogo._pixels = [];
		_ogo.getIMG = getIMG;

		_ogo.firePixel = function(url) {
			try {
				this._pixels.push(this.getIMG(url));
			} catch (e) {
			}
		};

		_$OGO$_ = _ogo;
	}
})();