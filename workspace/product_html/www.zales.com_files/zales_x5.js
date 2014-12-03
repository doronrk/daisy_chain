if (!(window.console && console.info && console.error && console.warn)) {
    (function () {
        var noop = function () { };
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

if (!Array.prototype.indexOf) {
    // MDN
    Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}


(function () {

// Bail out if frame disables bevyup
if (location.search.indexOf('bevyup_disable') != -1) { return; }

// Dont boot if we've already booted in this frame
if (typeof window.$bup_enabled !== 'undefined') { return; }
else { window.$bup_enabled = true; }

(function(){var n=window.BevyUp||(window.BevyUp={});n.Perf||(n.Perf=function(){var t={},n={};return t.markTimestamp=function(t){n[t]=+new Date},t.addTimestamp=function(t,i){n[t]=i},t.getSpan=function(t,i){var r=n[t],u=n[i];return r&&u&&u-r},t.normalize=function(){var t={},r=n.gts0;for(var i in n)t[i]=n[i]-r;return t},t.perfTimestamps=n,t}(),n.Perf.markTimestamp("gts0"))})();(function(){var t,i,n={baseUrl:'//az414106.vo.msecnd.net/Scripts/Require',paths:{"Sid":"Sid/dcfa7ef03af3c15ed1c8a5bb1b2f8102","jquery":"jquery/8ebea848c8a597af6e2e2de6d427ada0","JSON":"JSON/f96d7fbb81ae576f1a3f09b6bcf72e4f"}},r;(function(r){function w(n){return ct.call(n)==="[object Function]"}function b(n){return ct.call(n)==="[object Array]"}function h(n,t){if(n)for(var i=0;i<n.length;i+=1)if(n[i]&&t(n[i],i,n))break}function yt(n,t){if(n)for(var i=n.length-1;i>-1;i-=1)if(n[i]&&t(n[i],i,n))break}function e(n,t){return dt.call(n,t)}function u(n,t){return e(n,t)&&n[t]}function v(n,t){var i;for(i in n)if(e(n,i)&&t(n[i],i))break}function it(n,t,i,r){return t&&v(t,function(t,u){(i||!e(n,u))&&(r&&typeof t!="string"?(n[u]||(n[u]={}),it(n[u],t,i,r)):n[u]=t)}),n}function o(n,t){return function(){return t.apply(n,arguments)}}function ft(){return document.getElementsByTagName("script")}function pt(n){if(!n)return n;var t=r;return h(n.split("."),function(n){t=t[n]}),t}function a(n,t,i,r){var u=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+n);return u.requireType=n,u.requireModules=r,i&&(u.originalError=i),u}function ii(n){function ai(n){for(var i,t=0;n[t];t+=1)if(i=n[t],i===".")n.splice(t,1),t-=1;else if(i==="..")if(t===1&&(n[2]===".."||n[0]===".."))break;else t>0&&(n.splice(t-1,2),t-=2)}function nt(n,t,r){var p,w,e,h,o,c,l,s,b,a,k,f=t&&t.split("/"),d=f,v=i.map,y=v&&v["*"];if(n&&n.charAt(0)==="."&&(t?(d=u(i.pkgs,t)?f=[t]:f.slice(0,f.length-1),n=d.concat(n.split("/")),ai(n),w=u(i.pkgs,p=n[0]),n=n.join("/"),w&&n===p+"/"+w.main&&(n=p)):n.indexOf("./")===0&&(n=n.substring(2))),r&&v&&(f||y)){for(h=n.split("/"),o=h.length;o>0;o-=1){if(l=h.slice(0,o).join("/"),f)for(c=f.length;c>0;c-=1)if(e=u(v,f.slice(0,c).join("/")),e&&(e=u(e,l),e)){s=e,b=o;break}if(s)break;!a&&y&&u(y,l)&&(a=u(y,l),k=o)}!s&&a&&(s=a,b=k),s&&(h.splice(0,b,s),n=h.join("/"))}return n}function ui(n){s&&h(ft(),function(i){if(i.getAttribute("data-requiremodule")===n&&i.getAttribute("data-requirecontext")===t.contextName)return i.parentNode.removeChild(i),!0})}function bt(n){var r=u(i.paths,n);if(r&&b(r)&&r.length>1)return ui(n),r.shift(),t.require.undef(n),t.require([n]),!0}function fi(n){var i,t=n?n.indexOf("!"):-1;return t>-1&&(i=n.substring(0,t),n=n.substring(t+1,n.length)),[i,n]}function y(n,i,r,f){var v,h,a,s,e=null,c=i?i.name:null,p=n,y=!0,o="";return n||(y=!1,n="_@r"+(ci+=1)),s=fi(n),e=s[0],n=s[1],e&&(e=nt(e,c,f),h=u(l,e)),n&&(e?o=h&&h.normalize?h.normalize(n,function(n){return nt(n,c,f)}):nt(n,c,f):(o=nt(n,c,f),s=fi(o),e=s[0],o=s[1],r=!0,v=t.nameToUrl(o))),a=e&&!h&&!r?"_unnormalized"+(li+=1):"",{prefix:e,name:o,parentMap:i,unnormalized:!!a,url:v,originalName:p,isDefine:y,id:(e?e+"!"+o:o)+a}}function ut(n){var r=n.id,i=u(c,r);return i||(i=c[r]=new t.Module(n)),i}function ot(n,t,i){var r=n.id,f=u(c,r);if(e(l,r)&&(!f||f.defineEmitComplete))t==="defined"&&i(l[r]);else ut(n).on(t,i)}function k(n,t){var r=n.requireModules,i=!1;if(t)t(n);else if(h(r,function(t){var r=u(c,t);r&&(r.error=n,r.events.error&&(i=!0,r.emit("error",n)))}),!i)f.onError(n)}function dt(){tt.length&&(ni.apply(d,[d.length-1,0].concat(tt)),tt=[])}function gt(n){delete c[n],delete yt[n]}function ei(n,t,i){var r=n.map.id;n.error?n.emit("error",n.error):(t[r]=!0,h(n.depMaps,function(r,f){var e=r.id,o=u(c,e);!o||n.depMatched[f]||i[e]||(u(t,e)?(n.defineDep(f,l[e]),n.check()):ei(o,t,i))}),i[r]=!0)}function ii(){var n,r,f,c,l=i.waitSeconds*1e3,e=l&&t.startTime+l<(new Date).getTime(),u=[],y=[],o=!1,p=!0;if(!ht){if(ht=!0,v(yt,function(t){if((n=t.map,r=n.id,t.enabled)&&(n.isDefine||y.push(t),!t.error))if(!t.inited&&e)bt(r)?(c=!0,o=!0):(u.push(r),ui(r));else if(!t.inited&&t.fetched&&n.isDefine&&(o=!0,!n.prefix))return p=!1}),e&&u.length)return f=a("timeout","Load timeout for modules: "+u,null,u),f.contextName=t.contextName,k(f);p&&h(y,function(n){ei(n,{},{})}),(!e||c)&&o&&(s||lt)&&!at&&(at=setTimeout(function(){at=0,ii()},50)),ht=!1}}function ri(n){e(l,n[0])||ut(y(n[0],null,!0)).init(n[1],n[2])}function oi(n,t,i,r){n.detachEvent&&!vt?r&&n.detachEvent(r,t):n.removeEventListener(i,t,!1)}function si(n){var i=n.currentTarget||n.srcElement;return oi(i,t.onScriptLoad,"load","onreadystatechange"),oi(i,t.onScriptError,"error"),{node:i,id:i&&i.getAttribute("data-requiremodule")}}function hi(){var n;for(dt();d.length;){if(n=d.shift(),n[0]===null)return k(a("mismatch","Mismatched anonymous define() module: "+n[n.length-1]));ri(n)}}var ht,ct,t,rt,at,i={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},c={},yt={},wt={},d=[],l={},et={},ci=1,li=1;return rt={require:function(n){return n.require?n.require:n.require=t.makeRequire(n.map)},exports:function(n){return n.usingExports=!0,n.map.isDefine?n.exports?n.exports:n.exports=l[n.map.id]={}:void 0},module:function(n){return n.module?n.module:n.module={id:n.map.id,uri:n.map.url,config:function(){return i.config&&u(i.config,n.map.id)||{}},exports:l[n.map.id]}}},ct=function(n){this.events=u(wt,n.id)||{},this.map=n,this.shim=u(i.shim,n.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},ct.prototype={init:function(n,t,i,r){if(r=r||{},!this.inited){if(this.factory=t,i)this.on("error",i);else this.events.error&&(i=o(this,function(n){this.emit("error",n)}));this.depMaps=n&&n.slice(0),this.errback=i,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check()}},defineDep:function(n,t){this.depMatched[n]||(this.depMatched[n]=!0,this.depCount-=1,this.depExports[n]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,t.startTime=(new Date).getTime();var n=this.map;if(this.shim)t.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],o(this,function(){return n.prefix?this.callPlugin():this.load()}));else return n.prefix?this.callPlugin():this.load()}},load:function(){var n=this.map.url;et[n]||(et[n]=!0,t.load(this.map.id,n))},check:function(){if(this.enabled&&!this.enabling){var i,r,u=this.map.id,o=this.depExports,n=this.exports,e=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(w(e)){if(this.events.error)try{n=t.execCb(u,e,o,n)}catch(s){i=s}else n=t.execCb(u,e,o,n);if(this.map.isDefine&&(r=this.module,r&&r.exports!==undefined&&r.exports!==this.exports?n=r.exports:n===undefined&&this.usingExports&&(n=this.exports)),i)return i.requireMap=this.map,i.requireModules=[this.map.id],i.requireType="define",k(this.error=i)}else n=e;if(this.exports=n,this.map.isDefine&&!this.ignore&&(l[u]=n,f.onResourceLoad))f.onResourceLoad(t,this.map,this.depMaps);gt(u),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var n=this.map,r=n.id,s=y(n.prefix);this.depMaps.push(s),ot(s,"defined",o(this,function(s){var h,l,p,w=this.map.name,d=this.map.parentMap?this.map.parentMap.name:null,b=t.makeRequire(n.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(s.normalize&&(w=s.normalize(w,function(n){return nt(n,d,!0)})||""),l=y(n.prefix+"!"+w,this.map.parentMap),ot(l,"defined",o(this,function(n){this.init([],function(){return n},null,{enabled:!0,ignore:!0})})),p=u(c,l.id),p){if(this.depMaps.push(l),this.events.error)p.on("error",o(this,function(n){this.emit("error",n)}));p.enable()}return}h=o(this,function(n){this.init([],function(){return n},null,{enabled:!0})}),h.error=o(this,function(n){this.inited=!0,this.error=n,n.requireModules=[r],v(c,function(n){n.map.id.indexOf(r+"_unnormalized")===0&&gt(n.map.id)}),k(n)}),h.fromText=o(this,function(u,o){var s=n.name,c=y(s),l=g;o&&(u=o),l&&(g=!1),ut(c),e(i.config,r)&&(i.config[s]=i.config[r]);try{f.exec(u)}catch(v){return k(a("fromtexteval","fromText eval for "+r+" failed: "+v,v,[r]))}l&&(g=!0),this.depMaps.push(c),t.completeLoad(s),b([s],h)}),s.load(n.name,b,h,i)})),t.enable(s,this),this.pluginMaps[s.id]=s},enable:function(){yt[this.map.id]=this,this.enabled=!0,this.enabling=!0,h(this.depMaps,o(this,function(n,i){var r,f,s;if(typeof n=="string"){if(n=y(n,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[i]=n,s=u(rt,n.id),s){this.depExports[i]=s(this);return}this.depCount+=1,ot(n,"defined",o(this,function(n){this.defineDep(i,n),this.check()})),this.errback&&ot(n,"error",this.errback)}r=n.id,f=c[r],e(rt,r)||!f||f.enabled||t.enable(n,this)})),v(this.pluginMaps,o(this,function(n){var i=u(c,n.id);i&&!i.enabled&&t.enable(n,this)})),this.enabling=!1,this.check()},on:function(n,t){var i=this.events[n];i||(i=this.events[n]=[]),i.push(t)},emit:function(n,t){h(this.events[n],function(n){n(t)}),n==="error"&&delete this.events[n]}},t={config:i,contextName:n,registry:c,defined:l,urlFetched:et,defQueue:d,Module:ct,makeModuleMap:y,nextTick:f.nextTick,onError:k,configure:function(n){n.baseUrl&&n.baseUrl.charAt(n.baseUrl.length-1)!=="/"&&(n.baseUrl+="/");var r=i.pkgs,u=i.shim,f={paths:!0,config:!0,map:!0};v(n,function(n,t){f[t]?t==="map"?(i.map||(i.map={}),it(i[t],n,!0,!0)):it(i[t],n,!0):i[t]=n}),n.shim&&(v(n.shim,function(n,i){b(n)&&(n={deps:n}),(n.exports||n.init)&&!n.exportsFn&&(n.exportsFn=t.makeShimExports(n)),u[i]=n}),i.shim=u),n.packages&&(h(n.packages,function(n){var t;n=typeof n=="string"?{name:n}:n,t=n.location,r[n.name]={name:n.name,location:t||n.name,main:(n.main||"main").replace(kt,"").replace(st,"")}}),i.pkgs=r),v(c,function(n,t){n.inited||n.map.unnormalized||(n.map=y(t))}),(n.deps||n.callback)&&t.require(n.deps||[],n.callback)},makeShimExports:function(n){function t(){var t;return n.init&&(t=n.init.apply(r,arguments)),t||n.exports&&pt(n.exports)}return t},makeRequire:function(i,r){function o(u,s,h){var v,b,p;return(r.enableBuildCallback&&s&&w(s)&&(s.__requireJsBuild=!0),typeof u=="string")?w(s)?k(a("requireargs","Invalid require call"),h):i&&e(rt,u)?rt[u](c[i.id]):f.get?f.get(t,u,i,o):(b=y(u,i,!1,!0),v=b.id,!e(l,v))?k(a("notloaded",'Module name "'+v+'" has not been loaded yet for context: '+n+(i?"":". Use require([])"))):l[v]:(hi(),t.nextTick(function(){hi(),p=ut(y(null,i)),p.skipMap=r.skipMap,p.init(u,s,h,{enabled:!0}),ii()}),o)}return r=r||{},it(o,{isBrowser:s,toUrl:function(n){var u,r=n.lastIndexOf("."),f=n.split("/")[0],e=f==="."||f==="..";return r!==-1&&(!e||r>1)&&(u=n.substring(r,n.length),n=n.substring(0,r)),t.nameToUrl(nt(n,i&&i.id,!0),u,!0)},defined:function(n){return e(l,y(n,i,!1,!0).id)},specified:function(n){return n=y(n,i,!1,!0).id,e(l,n)||e(c,n)}}),i||(o.undef=function(n){dt();var r=y(n,i,!0),t=u(c,n);delete l[n],delete et[r.url],delete wt[n],t&&(t.events.defined&&(wt[n]=t.events),gt(n))}),o},enable:function(n){var t=u(c,n.id);t&&ut(n).enable()},completeLoad:function(n){var r,t,f,o=u(i.shim,n)||{},s=o.exports;for(dt();d.length;){if(t=d.shift(),t[0]===null){if(t[0]=n,r)break;r=!0}else t[0]===n&&(r=!0);ri(t)}if(f=u(c,n),!r&&!e(l,n)&&f&&!f.inited)if(!i.enforceDefine||s&&pt(s))ri([n,o.deps||[],o.exportsFn]);else return bt(n)?void 0:k(a("nodefine","No define call for "+n,null,[n]));ii()},nameToUrl:function(n,t,r){var a,v,o,y,s,h,l,e,c;if(f.jsExtRegExp.test(n))e=n+(t||"");else{for(a=i.paths,v=i.pkgs,s=n.split("/"),h=s.length;h>0;h-=1)if(l=s.slice(0,h).join("/"),o=u(v,l),c=u(a,l),c){b(c)&&(c=c[0]),s.splice(0,h,c);break}else if(o){y=n===o.name?o.location+"/"+o.main:o.location,s.splice(0,h,y);break}e=s.join("/"),e+=t||(/\?/.test(e)||r?"":".js"),e=(e.charAt(0)==="/"||e.match(/^[\w\+\.\-]+:/)?"":i.baseUrl)+e}return i.urlArgs?e+((e.indexOf("?")===-1?"?":"&")+i.urlArgs):e},load:function(n,i){f.load(t,n,i)},execCb:function(n,t,i,r){return t.apply(r,i)},onScriptLoad:function(n){if(n.type==="load"||ti.test((n.currentTarget||n.srcElement).readyState)){p=null;var i=si(n);t.completeLoad(i.id)}},onScriptError:function(n){var t=si(n);if(!bt(t.id))return k(a("scripterror","Script error",n,[t.id]))}},t.require=t.makeRequire(),t}function ri(){return p&&p.readyState==="interactive"?p:(yt(ft(),function(n){if(n.readyState==="interactive")return p=n}),p)}var f,rt,y,k,c,nt,p,ut,et,ot,wt=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,bt=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,st=/\.js$/,kt=/^\.\//,ht=Object.prototype,ct=ht.toString,dt=ht.hasOwnProperty,gt=Array.prototype,ni=gt.splice,s=!!(typeof window!="undefined"&&navigator&&document),lt=!s&&typeof importScripts!="undefined",ti=s&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,at="_",vt=typeof opera!="undefined"&&opera.toString()==="[object Opera]",d={},l={},tt=[],g=!1;if(typeof i=="undefined"){if(typeof t!="undefined"){if(w(t))return;l=t,t=undefined}typeof n=="undefined"||w(n)||(l=n,n=undefined),f=t=function(n,t,i,r){var o,e,s=at;return b(n)||typeof n=="string"||(e=n,b(t)?(n=t,t=i,i=r):n=[]),e&&e.context&&(s=e.context),o=u(d,s),o||(o=d[s]=f.s.newContext(s)),e&&o.configure(e),o.require(n,t,i)},f.config=function(n){return f(n)},f.nextTick=typeof setTimeout!="undefined"?function(n){setTimeout(n,4)}:function(n){n()},n||(n=f),f.version="2.1.5",f.jsExtRegExp=/^\/|:|\?|\.js$/,f.isBrowser=s,rt=f.s={contexts:d,newContext:ii},f({}),h(["toUrl","undef","defined","specified"],function(n){f[n]=function(){var t=d[at];return t.require[n].apply(t,arguments)}}),s&&(y=rt.head=document.getElementsByTagName("head")[0],k=document.getElementsByTagName("base")[0],k&&(y=rt.head=k.parentNode)),f.onError=function(n){throw n;},f.load=function(n,t,i){var u=n&&n.config||{},r;if(s)return r=u.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),r.type=u.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r.setAttribute("data-requirecontext",n.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&r.attachEvent.toString().indexOf("[native code")<0||vt?(r.addEventListener("load",n.onScriptLoad,!1),r.addEventListener("error",n.onScriptError,!1)):(g=!0,r.attachEvent("onreadystatechange",n.onScriptLoad)),r.src=i,ut=r,k?y.insertBefore(r,k):y.appendChild(r),ut=null,r;if(lt)try{importScripts(i),n.completeLoad(t)}catch(f){n.onError(a("importscripts","importScripts failed for "+t+" at "+i,f,[t]))}},s&&yt(ft(),function(n){return y||(y=n.parentNode),c=n.getAttribute("data-main"),c?(l.baseUrl||(nt=c.split("/"),et=nt.pop(),ot=nt.length?nt.join("/")+"/":"./",l.baseUrl=ot,c=et),c=c.replace(st,""),l.deps=l.deps?l.deps.concat(c):[c],!0):void 0}),i=function(n,t,i){var r,u;typeof n!="string"&&(i=t,t=n,n=null),b(t)||(i=t,t=[]),!t.length&&w(i)&&i.length&&(i.toString().replace(wt,"").replace(bt,function(n,i){t.push(i)}),t=(i.length===1?["require"]:["require","exports","module"]).concat(t)),g&&(r=ut||ri(),r&&(n||(n=r.getAttribute("data-requiremodule")),u=d[r.getAttribute("data-requirecontext")])),(u?u.defQueue:tt).push([n,t,i])},i.amd={jQuery:!0},f.exec=function(text){return eval(text)},f(l)}})(this),window.BevyUp||(window.BevyUp={}),r=window.BevyUp,r.require=n,r.requirejs=t,r.define=i})();window.bup_cookie=function(n,t,i){var f,r,e,o,u,s;if(typeof t!="undefined"){i=i||{},t===null&&(t="",i.expires=-1),f="",i.expires&&(typeof i.expires=="number"||i.expires.toUTCString)&&(typeof i.expires=="number"?(r=new Date,r.setTime(r.getTime()+i.expires*864e5)):r=i.expires,f="; expires="+r.toUTCString());var h=i.path?"; path="+i.path:"",c=i.domain?"; domain="+i.domain:"",l=i.secure?"; secure":"";document.cookie=[n,"=",encodeURIComponent(t),f,h,c,l].join("")}else{if(e=null,document.cookie&&document.cookie!="")for(o=document.cookie.split(";"),u=0;u<o.length;u++)if(s=o[u].replace(/^\s+|\s+$/g,""),s.substring(0,n.length+1)==n+"="){e=decodeURIComponent(s.substring(n.length+1));break}return e}};// Compatibility variable. See BUP-4593
// Update this and the corresponding check in GCS if you have to break compatibility with an old version of GTS.
window.$bupgts = 1;

function BevyUp_ReportEvent(category, name, partnerId, params, retryCount) {
    if (typeof (window.$bup_tid) === "undefined" || typeof (window.$bup_vid) === "undefined") {
        if (isNaN(retryCount)) {
            retryCount = 0;
        }
        else if (retryCount >= 15) {
            // Boot.js allows 10s for gcs from the top frame, stop trying if we still don't have vid + tid
            return;
        }

        window.setTimeout(function () { BevyUp_ReportEvent(category, name, partnerId, params, ++retryCount); }, 1000);
        return;
    }

    var now = new Date();
    var ct = 'ct=' + (now.getUTCMonth() + 1) + "/" + now.getUTCDate() + "/" + now.getUTCFullYear() + "_" + now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds() + "." + now.getUTCMilliseconds() + '&';
    var sessionIdSegment = (window.$bup_sid) ? "&s=" + window.$bup_sid : "";
    var request = "https://b.bevyup.com/m/rv?C=" + category + "&d=" + partnerId + "&omgVisitId=" + window.$bup_vid + "&omgClientId=" + window.$bup_cid + "&v=0&" + ct + "t=" + $bup_tid + "&N=" + name + sessionIdSegment + "&";

    for (var i = 0; i < params.length; i++) {
        request += encodeURIComponent(params[i]);
        if (i % 2 == 0) {
            request += "=";
        }
        else {
            request += "&";
        }
    }

    document.createElement("img").setAttribute("src", request);
}

function BevyUp_ReportError(errorMsg, errorData)
{
    var locTxt = encodeURIComponent(" fromUrl:" + window.location.href.toLowerCase());
    errorData = (errorData ? errorData += locTxt : locTxt);

    // Prefer the BevyUpUI version, as this will send the entire bevyup log
    if (typeof (BevyUpUI) != "undefined" && typeof (BevyUpUI.logSilentError) != "undefined")
    {
        BevyUpUI.logSilentError(errorMsg, errorData);
    }
    else // For pages where BevyUp is disabled at GCS step, report via GET
    {
        var module = "bootJs", // Error report controller toggles behavior on this module string. Don't change it.
            request = "https://services.bevyup.com/m/re?omgVisitId=" + window.$bup_vid + "&omgClientId=" + window.$bup_cid + "&mod=" + module + "&fn=reportError&msg=" + errorMsg + "&sta=4&d=" + errorData;

        document.createElement("img").setAttribute("src", request);
    }
}

// On window because this file is closur'ed and configScript.js also uses this
window.BevyUp_MatchNavigationWhiteList = function (href) {
    if (!window.$bup_c) {
        return false;
    }

    var whiteListFilter = new RegExp(window.$bup_c["wlnu"], "i");
    var bevyupFilter = new RegExp("^(http(s)?):\/\/[^\/?&#]*\.?bevyup\.com($|[/\?&#].*)", "i");
    return (whiteListFilter.test(href) || bevyupFilter.test(href));
};

(function (d) {
    // Generated at 12/3/2014 6:08:52 AM
    var winLoc = window.location.href,
        frameIsTop = window.self == window.top ? "top" : "NOTtop",
        JSON;

    // Guid generation functions
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function BTrace(msg) {
        //var u = "undefined",
        //    date = (typeof Date != u && typeof Date.prototype != u && typeof Date.prototype.toISOString != u) ? (new Date()).toISOString() : '';
        //console.warn(date + " scriptjs> " + winLoc + ":" + frameIsTop + "])> " + msg);
    }

    function InstallListener() {
        BevyUp.require(['JSON'], function (j) {
            JSON = j;
            window.addEventListener("message", OnMessagePosted, true);
        });
    }

    function SendGcsGet() {
        startTime = new Date();
        // Sending this request is harmless
        // CC:LVCntrlr will also listen for this msg, keep them in sync
        window.parent.postMessage("gcs GET", "*");
        BTrace("Posted msgs to top");

        postMessageTimeout = window.setTimeout(function () {
            // Only retry 19 times
            if (currentRetryCount < 19) {
                SendGcsGet();
            }
            else {
                console.error('The top frame is not responding.');
                postMessageTimeout = -1;
                GcsFromServer();
            }
            currentRetryCount++;
            BTrace("!--Retry SendGcsGet--!");
        }, 500);
    }

    function CancelGcsGetTimeout() {
        if (postMessageTimeout != -1) {
            BTrace("cancelling gcs get timeout");
            window.clearTimeout(postMessageTimeout);
            postMessageTimeout = -1;
        }
    }

    function OnMessagePosted(event) {
        if (event.origin == null){
            return;
        }

        if (event.data == "gcs GET") {
            // Only reply when gcs's info is here
            if (window.$bup_c) {
                var respMsg;
                if (!BevyUp_MatchNavigationWhiteList(event.origin) || window.$bup_c == "Experience Disabled") {
                    respMsg = "gcs DSBL bup_tid='" + $bup_tid + "' bup_cid='" + $bup_cid + "' bup_vid='" + $bup_vid + "'";
                }
                else {
                    respMsg = "gcs RESP bup_tid='" + $bup_tid + "' bup_cid='" + $bup_cid + "' bup_vid='" + $bup_vid + "' bup_c=" + JSON.stringify($bup_c);
                }

                BTrace("responding to inner frame gcs: " + respMsg.substr(0, 8));
                try {
                    event.source.postMessage(respMsg, event.origin);
                } catch (e) {
                    BevyUp_ReportError("Failed to postMessage to event.source in GCS Get", "origin: " + event.origin + " message: " + e.message);
                }
            }
            else {
                BTrace("NOT responding to inner frame gcs - no config available");
            }
        }
        else if (postMessageTimeout != -1) {  // make sure a response has not been accepted already
            if (event.source !== window.parent) {
                BTrace("rejecting gcs RESP from non-parent window");
                return;
            }

            if (event.data.indexOf("gcs RESP") == 0) {
                var m = event.data.match(/gcs RESP bup_tid='(.*?)'.*bup_cid='(.*?)'.*bup_vid='(.*?)'.*bup_c=(.*)/);
                if (m) {
                    var ref = d.getElementsByTagName('script')[0];
                    var conf = JSON.parse(m[4]);
                    window.$bup_tid = m[1];
                    window.$bup_cid = m[2];
                    window.$bup_vid = m[3];
                    window.$bup_c = conf;

                    // Update cookies in the inner frames so "all" domains associated with this session will use the same cookies
                    setCookie("omgVisitId", window.$bup_vid, 30);
                    setCookie("omgClientId", window.$bup_cid, 365 * 24 * 60);

                    js = d.createElement('script');
                    js.id = id;
                    js.setAttribute('crossorigin', 'anonymous');
                    js.async = true;
                    js.type = "text/javascript";
                    js.src = window.$bup_c['scr_' + appName.toLowerCase()];

                    verifiedTime = new Date();
                    if (appName == 'd') {
                        BevyUp_ReportEvent(0, 0, $bup_c["pid"], ["_ss1AppScript", appName, "_ss2ReferingUrl", window.location.href, "_ss3DocumentReferrer", document.referrer, "_dn1SentScript", 1]);
                    }

                    ref.parentNode.insertBefore(js, ref);

                    //BevyUp_ReportEvent(7, 1, $bup_c["pid"], ["_ss1ET", "GCSs", "_ss2ED", '{"time":"' + (verifiedTime - startTime) + '"}']);
                    CancelGcsGetTimeout();
                }
            }
            else if (event.data.indexOf("gcs DSBL") == 0) {
                var m = event.data.match(/gcs DSBL bup_tid='(.*?)'.*bup_cid='(.*?)'.*bup_vid='(.*?)'/);
                if (m) {
                    window.$bup_tid = m[1];
                    window.$bup_cid = m[2];
                    window.$bup_vid = m[3];
                }

                BTrace("XP disabled");
                CancelGcsGetTimeout();
            }
        }
    }

    function cookiesSupported() {
        // Snippet from modernizr, MIT license
        try {
            document.cookie = 'bupcookietest=1';
            var ret = document.cookie.indexOf('bupcookietest=') != -1;
            document.cookie = 'bupcookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
            return ret;
        }
        catch (e) {
            return false;
        }
    }
    
    function setCookie(name, cookieVal, minutes) {
        var da = new Date();
        da.setTime(da.getTime() + (minutes * 60 * 1000));
        expires = '; expires=' + da.toUTCString();

        var domain;
        var hostNameParts = window.location.hostname.split('.');
        if (hostNameParts.length <= 2) {
            domain = window.location.hostname;
        }
        else {
            domain = window.location.hostname.substring(window.location.hostname.indexOf('.'), window.location.hostname.length);
        }
        document.cookie = name + '=' + cookieVal + expires + '; path=/; domain=' + domain + ';';
        BTrace("setCookie: " + name + " = " + cookieVal);
    }

    function getCookie(name) {
        var cookieVal = null;
        if (!((document.cookie === null) || (document.cookie === undefined))) {
            var matchingName = escape(name) + '=';
            var cookies = document.cookie.split(matchingName);
            if (cookies.length >= 2) {
                var array = cookies[1].split(';');
                cookieVal = unescape(array[0]);
            }
        }
        return cookieVal;
    }

    function getAndRefreshCookie(name, minutes) {
        var cookieVal = getCookie(name);

        if (!cookieVal) {
            cookieVal = guid();
        }

        setCookie(name, cookieVal, minutes);

        return cookieVal;
    }

    function fillInDashes(guid) {
        var matches = guid.match(new RegExp('([0-9a-fA-F]{8})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{12})'));
        if (matches) {
            return matches.slice(1).join("-");
        }

        return guid;
    }

    function markNewVisit() {
        // Store the fact that this navigation
        // is the first one with a given visitId
        window.$bup_newVid = true;
    }

    function GcsFromServer() {
        var ref = d.getElementsByTagName('script')[0];
        var rfr = d.referrer;
        rfr = rfr ? encodeURIComponent(rfr.substr(0, 750)) : rfr;  // We need to restrict this parameter length for gcs
        
        if (!cookiesSupported()) {
            // We must have either cookie support or a set of credentials in the URL to boot.
            return;
        }

        // Reset Cookies
        var cookieVal = getCookie("omgVisitId");

        if (!cookieVal) {
            cookieVal = guid();
            markNewVisit();
        }

        setCookie("omgVisitId", cookieVal, 30);
        window.$bup_vid = cookieVal;
        window.$bup_cid = getAndRefreshCookie("omgClientId", 365 * 24 * 60);
        window.$bup_tid = getAndRefreshCookie("omgTabId", 365 * 24 * 60);
        window.$bup_sid = getCookie("omgSessionId"); // Null if !exist

        // Load configuration script
        js = d.createElement('script');
        js.id = id;
        //js.setAttribute('crossorigin', 'anonymous');
        js.async = true;
        js.src = u + window.$bup_tid + "/" + (window.$bup_sid ? window.$bup_sid : "") + "?omgVisitId=" + window.$bup_vid + "&omgClientId=" + window.$bup_cid + (rfr ? "&r=" + rfr : "") + (ttMatch ? "&tt=" + fillInDashes(ttMatch[1]) : "");
        js.type = "text/javascript";
        ref.parentNode.insertBefore(js, ref);
        if (window.BevyUp.Perf && appName == 'd') {
            BevyUp.Perf.markTimestamp('gts1');
        }
    }

    // Look for tabId in query string
    var tid = null,
        ttMatch = location.search.match(/[?&]bup_tt=([^$&]*)/),
        u = "https://b.bevyup.com/gcs/zales_x5/d/",
        js,
        id = 'bevyup_cscript',
        vid = null,
        postMessageTimeout = -1,
        startTime,
        verifiedTime,
        appName = "d",
        currentRetryCount = 0;

    if (d.getElementById(id)) {
        return;
    }

    //GcsFromServer is expected to be called synchronously, Report JSR test depends on being called after the cookies have been set
    if (typeof (window.postMessage) != "undefined" && typeof(window.addEventListener) != "undefined") {
        InstallListener();

        if (window.top != window.self) {
            SendGcsGet();
        }
        else {
            GcsFromServer();
        }
    }
    else {
        GcsFromServer();
    }
})(document);

(function () {
    var baseUri = "//b.bevyup.com", // This URL shouldn't be changed
        partnerId = "zales_x5", // This is your partnerId
        resourcesUrl = "//b.bevyup.com/Resources/zales_x5", // This URL can be changed to the deployment path if doing Configurable Deployment
        lcWindowHref = window.location.href.toLowerCase(), // lc stands for lowerCase
        bupjq = null,
        partjq = null,
        addDiamondCategory = "ringDiamond",
        BevyUpUI,
        Platform;

    /* Helper functions */
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

    /*
        Here we call a function that lives in zales code which sets the height of the inner iframe on rings grid pages.
        When Zales first makes this call during a bevyup session in firefox and ie, the body height is 0, and the iframe is set to 0.
        We wait for the body height to be non zero and the re-call the height setting function.
    */
    var ringsIFrame = document.getElementById("iframeContent");
    if (ringsIFrame != null) {
        var iframeWindow = ringsIFrame.contentWindow;
        var interval = window.setInterval(function () {
            if (document.body.offsetHeight > 0
                && typeof iframeWindow.setIFrameWidth === "function") {
                // console.info("bevyup, document.body.height:" + document.body.offsetHeight + " location:" + window.location.href);
                iframeWindow.setIFrameWidth();

                window.clearInterval(interval);
                interval = -1;
            }
        }, 100);

        window.setTimeout(function () {
            if (interval != -1) {
                window.clearInterval(interval);
                interval = -1;
            }
        }, 5000);
    }

    function replaceFunctionWhenExists(origFuncName, replacementFunc, tryCount) {
        if (tryCount == undefined) {
            tryCount = 0;
        }
        else if (tryCount > 20) {
            BevyUp_ReportError("failed to replace: " + origFuncName);
            return;
        }

        if (eval(origFuncName) != undefined) {
            eval(origFuncName + " = " + replacementFunc);
            // TraceWarn("replaced: " + origFuncName + " try: " + tryCount);
        }
        else {
            window.setTimeout(function () { replaceFunctionWhenExists(origFuncName, replacementFunc, ++tryCount); }, 350);
        }
    }


    /*

    // Should be called from InitializeBrowsingFrame
    // Re-enable if top.document/parent.document bugs resurface in Cobb code.
    // Find their event handlers and remap top/parent.document as needed in a closure
    // then bind to click on their button and run our repaired handler first using doButtonTracking(jqButtons, repairedHandler).

    function fixAddToCarts() {

        bupjq(document).ready(function () {
            var windowLoc = window.location.href.toLowerCase(),
                isClickBindSet = false,
                bevyButtons = [],
                buttonHandlerMap = {},
                eventRouter = function (ev) {
                    for (var i = 0; i < bevyButtons.length; i++) {
                        // See if this is one of the buttons we care about
                        var button = bevyButtons[i];
                        if (button == ev.target) {
                            // if it is, get the handler hash and call its handler
                            var hash = bupjq(button).data("bupHash");
                            if (hash != undefined) {
                                if (buttonHandlerMap.hasOwnProperty(hash)) {
                                    buttonHandlerMap[hash]();

                                    // If they fix this we don't want their version to cause a double post
                                    ev.stopImmediatePropagation();
                                }
                                else {
                                    BevyUp_ReportError("no handler found for button with bupHash:" + hash + " and id:" + button.id);
                                }
                            }
                            else {
                                BevyUp_ReportError("Click on button with no hash. id:" + button.id);
                            }
                        }
                    }
                },
                doButtonTracking = function (jqButtons, clickHandler) {
                    if (jqButtons.length == 0)
                    {
                        BevyUp_ReportError("Cannot track 0 buttons for page");
                        return;
                    }

                    for (var i = 0; i < jqButtons.length; i++)
                    {
                        var button = jqButtons[i],
                            hash = Math.random();

                        bupjq(button).data("bupHash", hash);
                        buttonHandlerMap[hash] = clickHandler;
                        bevyButtons.push(button);

                        if (!isClickBindSet)
                        {
                            // Only bind on document click once to avoid multiple callbacks
                            document.addEventListener("click", eventRouter, true);
                            isClickBindSet = true;
                        }
                    }
                };

            //
            // Add button handler closures here and wire up with doButtonTracking
            // In some cases may also need to use replaceFunctionWhenExists to repair statically defined functions
            //
        });
    }
    */

    var bOnMobileSite = false;
    // Callback when BevyUpUI API is loaded
    window.bevyUpAsyncInit = function () {
        BevyUp.require(['BevyUpUI', 'jquery', 'Platform'], function (bupui, jquery, platform) {
            // Grab a reference 
            bupjq = jquery;
            BevyUpUI = bupui;
            Platform = platform.PlatformNamespace.Platform;

            // Zales skinning
            bupjq(document.documentElement).addClass('bevyup_zales');

            if (window.location.hostname == 'm.zales.com' || 
                window.location.hostname == 'zales-staging.madmobile.com') {
                // Mark as zales mobile site.
                bupjq(document.documentElement).addClass('bevyup_zalesMS');
                bOnMobileSite = true;
            } else {
                bupjq(document.documentElement).addClass('bevyup_zalesMain');
            }

            // Get the frame we're running at:
            var frameType = BevyUpUI.getFrameType();

            RegisterCopyOverrides(bupui);

            switch (frameType) {
                case "main":
                    // This is the frame where the Hub and Viewer are running
                    InitializeMainFrame();
                    break;
                case "browsing":
                    // This is the inner frame where the user is browsing
                    InitializeBrowsingFrame();
                    break;
                default:
                    // Log this as an error
                    throw "Unknown frame type: " + frameType;
            }
        });
    };

    function RegisterCopyOverrides(bupui) {
        bupui.registerCopyOverride("TagBoardTitleFormat", "My {0}");
        bupui.registerCopyOverride("DiscoverTagboardQuestTitleFormat", "Discover My {0}");
    }

    function TraceWarn(msg) {
        // debugging
        //console.warn(msg);
    }

    var findJqTimeoutDur = 100,
        findJqTimeoutMax = 60 * 1000; // 1 min

    function FindPartnerJqAndWaitForReady(jqueryFoundCallback) {
        if (typeof (jQuery) == "function" && typeof (jQuery().jquery) == "string") {
            TraceWarn("found jq " + findJqTimeoutDur);
            partjq = jQuery;
            partjq(document).ready(function () {

                jqueryFoundCallback();

            });
        }
        else {
            findJqTimeoutDur *= 1.5;

            if (findJqTimeoutDur < findJqTimeoutMax) {

                TraceWarn("didn't find jq yet. Next search in " + findJqTimeoutDur);
                window.setTimeout(FindPartnerJqAndWaitForReady, findJqTimeoutDur);
            }
            else {
                BevyUp_ReportError("Never found partner jQuery instance");
                TraceWarn("didn't find jq");
            }
        }
    }

    function IsDYOCategoryPage_Cobb() {
        for (var urlPart in buttonPurposes) {
            // Note: use lowercase for comparison
            if (lcWindowHref.indexOf(urlPart) != -1) {
                return true;
            }
        }

        return false;
    }

    function IsCartPage_Zales() {
        return (lcWindowHref.indexOf("zales.com/cart/index.jsp") != -1);
    }

    function IsCheckoutConfirmPage_Zales() {
        return (lcWindowHref.indexOf("zales.com/checkout/index.jsp?process=thanks") != -1);
    }

    var pushProductClicksToParent = -1;
    function IsDYOInnerFrame_Cobb() {
        // Push product clicks to top frame for all pages
        // where products are shown in iframes
        if (pushProductClicksToParent == -1) {
            pushProductClicksToParent = false;
            for (var i = 0; i < dyoInnerFrameUrlPostfixes.length; i++) {
                // Note: use lowercase for comparison
                if (lcWindowHref.indexOf(dyoInnerFrameUrlPostfixes[i]) != -1) {
                    pushProductClicksToParent = true;
                    break;
                }
            }
        }

        return pushProductClicksToParent;
    }

    function ListenForDYOProductClicks_Cobb() {
        if (typeof partjq == "undefined") {
            BevyUp_ReportError("Cannot listen for product clicks - partner jquery not defined");
            return;
        }

        partjq(document).delegate(".bevyup_product", "click",
            function (e) {
                window.$bup_clickedProductId = partjq(this).attr('bevyup_product_id');

                if (typeof $bup_clickedProductId === "undefined") {
                    BevyUp_ReportError("Cannot find product id for clicked product");
                    return;
                }

                TraceWarn("clicked product:" + window.$bup_clickedProductId);

                if (IsDYOInnerFrame_Cobb()) {
                    window.parent.$bup_clickedProductId = partjq(this).attr('bevyup_product_id');
                }
            });
    }

    function DoDYOCategoryAddToCartShimming_Cobb() {
        if (!IsDYOInnerFrame_Cobb() && !IsDYOCategoryPage_Cobb()) return;

        if (typeof partjq == "undefined") {
            BevyUp_ReportError("Cannot do event shimming - partner jquery not defined");
            return;
        }

        var form = null,
            inputs = null;

        if (IsDYOCategoryPage_Cobb()) {
            var formId = null,
                inputs = null,
                submitCount = 0;

            if (lcWindowHref.indexOf("newmendiamondband.aspx") != -1
                || lcWindowHref.indexOf("weddingband.aspx") != -1) {
                formId = "aspnetForm";
            }
            else {
                formId = "form1";
            }
            inputs = partjq("#" + formId + " input");

            if (inputs.length == 0) {
                BevyUp_ReportError("No form inputs found for page:" + lcWindowHref);
            }

            for (var i = 0; i < inputs.length; i++) {
                if (partjq(inputs[i]).attr("type") == "submit") {
                    DoSubmitHook_Cobb(partjq(inputs[i]), ReportAddToCart_Cobb);
                    submitCount++;
                }
            }

            TraceWarn("Event shimming done. " + submitCount + " buttons shimmed.");
        }

        ListenForDYOProductClicks_Cobb()
    }

    // multiples of 2 for bitwise operations
    var addNoneWarning = 0,
        addDiamond = 1,
        addSetting = 2,
        addAnnivEternRing = 4,
        addMenDiamondBand = 8,
        addMetalWeddingBand = 16,
        addEaring = 32,
        addPendant = 64,
        dyoInnerFrameUrlPostfixes =
        [
            "newconfigurator/engagementring/settingonly.aspx",
            "newcompv2/threestoneringv2/default.aspx",
            "newconfigurator/anniversary/default2.aspx",
            "newconfigurator/eternity/default2.aspx",
            "newconfigurator/weddingband/default.aspx",
            "newconfigurator/earrings/default.aspx",
            "newconfigurator/pendant/default.aspx"
        ]

    // All 1st level keys should be lower case to compare against url
    buttonPurposes =
    {
        "newering.aspx":
            {
                "Button1": addDiamond,
                "Button2": addDiamond | addSetting,
                "Button3": addSetting,
                "Button8": addDiamond,

                // These are buttons for "bridal rings" = rings with matching bands
                "Button4": addSetting, // from btnBridalOnly = just engagement ring setting (no matching band, no diamond)
                "Button5": addSetting, // from btnWeddingBandOnly = matching band only (no eng ring, no diamond)
                "Button6": addSetting | addDiamond, // from btnAddBridalCompleteRing = both bands + diamond
                "Button7": addSetting // from btnAddBridalAndMatchingOnly = both bands, no diamonds
            },
        "settingsonly.aspx":
            {
                "Button1": addDiamond,
                "Button2": addDiamond | addSetting,
                "Button3": addSetting,
                "Button8": addDiamond,

                // These are buttons for "bridal rings" = rings with matching bands
                "Button4": addSetting, // from btnBridalOnly = just engagement ring setting (no matching band, no diamond)
                "Button5": addSetting, // from btnWeddingBandOnly = matching band only (no eng ring, no diamond)
                "Button6": addSetting | addDiamond, // from btnAddBridalCompleteRing = both bands + diamond
                "Button7": addSetting // from  btnAddBridalAndMatchingOnly = both bands, no diamonds
            },
        "newdiamondonly.aspx":
            {
                "Button1": addDiamond, // from btnTest
                "Button2": addNoneWarning // from btnAddCompleteRing
            },
        "newtsring.aspx":
            {
                "Button1": addDiamond, // from btnTest
                "Button2": addDiamond | addSetting, // from btnAddCompleteRing
                "Button3": addSetting, // from btnSettingOnly
                "Button4": addDiamond // from btnDiamondOnly
            },
        "anniversary.aspx":
            {
                "Button1": addAnnivEternRing // from btnTest
            },
        "eternity.aspx":
            {
                "Button1": addAnnivEternRing // from btnTest
            },
        "newmendiamondband.aspx":
            {
                "ctl00_ContentPlaceHolder1_Button1": addMenDiamondBand // from btnTest
            },
        "weddingband.aspx":
            {
                "ctl00_ContentPlaceHolder1_Button1": addMetalWeddingBand // from btnTest
            },
        "earrings.aspx":
            {
                "Button1": addEaring // from btnTest
            },
        "diamondpendant.aspx":
            {
                "Button1": addPendant // from btnTest
            }

        // CC: note, ONLY addDiamond is currnetly
        // combined (bitwise or'd) with other purposes
        // The scraping of the product id for add to cart
        // relies on this assumption. 
    };

    function GetButtonPurposesForCurrentPage() {
        for (var pageKey in buttonPurposes) {
            if (lcWindowHref.indexOf(pageKey) != -1) {
                return buttonPurposes[pageKey];
            }
        }

        return null;
    }

    function DoSubmitHook_Cobb(jqOrigButton, clickHandler) {
        if (typeof partjq == "undefined") {
            BevyUp_ReportError("Cannot DoSubmitHook_Cobb - partner jquery not defined");
            return;
        }

        // Wrapping everything in jquery to abstract browser weirdness
        // and add class to prevent it from being captured
        var jqProxyButton = partjq("<div class='bevyup_insert' id='" + jqOrigButton.attr("id") + "'></div>");

        // Set timeout for their button to be clicked at a slight delay
        // to give us time to do our own handler, reporting the metric
        jqProxyButton.click(
            function (e) {
                window.setTimeout(function () { jqOrigButton.click(); }, 500);
                clickHandler(e);

                // Unbind to prevent double click
                jqProxyButton.unbind("click");
            });

        // Remove this onlcick. It breaks the form submit for buttons who's click
        // is triggered by external scripts (like this one) and the function doesn't exist anyway
        if (jqOrigButton.attr("onclick") == "SetValueForAddToCart();") {
            jqOrigButton.attr("onclick", "");
        }

        // Insert proxy button just before orig
        jqProxyButton.insertBefore(jqOrigButton);

        // change this id so they don't trigger the click on orig
        // but do trigger on our proxy. 
        // doing this later in function because want to focus all risk 
        // to happen before changing this id
        jqOrigButton.attr("id", jqOrigButton.attr("id") + "bup");
    }

    function InputHasValue(inputJq, allowEmpty) {
        return typeof (inputJq) != "undefined" && inputJq != null && typeof (inputJq.val) == "function" && inputJq.val() != null && (inputJq.val() != "" || allowEmpty);
    }

    function SendAddToCartEvent(sku, name, category, quantity, price) {
        // last clicked
        var notes = "";
        if (category != addDiamondCategory // ignore addDiamondCategory, as there is no productId and this one gets mixed with ring settings
            && typeof window.$bup_clickedProductId != "undefined") {
            notes = "lc=" + window.$bup_clickedProductId;
        }
        BevyUp_ReportEvent(7, 3, partnerId, ["_ss1sku", sku, "_ss2nme", name, "_ss3cat", category, "_ss4nts", notes, "_dn1qty", quantity, "_dn2pri", price]);
    }

    function ReportAddToCart_Cobb(evt) {
        if (typeof partjq == "undefined") {
            BevyUp_ReportError("Cannot ReportAddToCart_Cobb - partner jquery not defined");
            return;
        }

        var settingNum = null,
            settingPrice = null,
            diamondShape = null,
            diamondCarat = null,
            diamondNum = null,
            diamondPrice = null,
            pageButtonPurps = GetButtonPurposesForCurrentPage(),
            buttonPurpose = null;

        if (pageButtonPurps == null) {
            BevyUp_ReportError("No button purposes mapped for current page");
            return;
        }
        else if (!pageButtonPurps.hasOwnProperty(evt.target.id)) {
            BevyUp_ReportError("No button purpose found for button with ID:" + evt.target.id);
            return;
        }
        else if (pageButtonPurps[evt.target.id] == addNoneWarning) {
            BevyUp_ReportError("Unkown purpose for button with id:" + evt.target.id);
            return;
        }

        buttonPurpose = pageButtonPurps[evt.target.id];

        // report diamond
        if ((buttonPurpose & addDiamond) != 0) {
            diamondShape = partjq("input#txtGetShape");
            diamondCarat = partjq("input#txtGetCarat");
            diamondNum = partjq("input#txtGetSerialNo");
            diamondPrice = partjq("input#txtGetSellPrice");

            if (!InputHasValue(diamondShape) || !InputHasValue(diamondCarat) || !InputHasValue(diamondNum) || !InputHasValue(diamondPrice)) {
                // Make sure they have a value to report
                BevyUp_ReportError("Cannot get form values for diamond add by button:" + evt.target.id);
            }
            else {
                SendAddToCartEvent(
                    diamondNum.val(),
                    diamondShape.val() + " " + diamondCarat.val() + " diamond",
                    addDiamondCategory,
                    1,
                    diamondPrice.val());
            }
        }

        // report ring setting
        if ((buttonPurpose & addSetting) != 0) {
            settingNum = partjq("input#txtGetSettingDesignNo");
            settingPrice = partjq("input#txtGetSettingPrice");
            settingDesc = partjq("input#txtGetSettingDescription");

            if (!InputHasValue(settingNum) || !InputHasValue(settingPrice) || !InputHasValue(settingDesc, true /*allow empty - value non-critical & not always there*/)) {
                // Make sure they have a value to report
                BevyUp_ReportError("Cannot get form values for setting add by button:" + evt.target.id);
            }
            else {
                SendAddToCartEvent(
                    settingNum.val(),
                    settingDesc.val(),
                    "ringSetting",
                    1,
                    settingPrice.val());
            }
        }

        // report anniv/eternity ring & earing & pendant
        if ((buttonPurpose & addAnnivEternRing) != 0
            || (buttonPurpose & addEaring) != 0
            || (buttonPurpose & addPendant) != 0) {
            if ((buttonPurpose & addPendant) != 0
                || (buttonPurpose & addEaring) != 0) {
                // For pendants the sku field always says 1... so we use this one instead
                settingNum = partjq("input#txtGetStyleCode");
            }
            else {
                settingNum = partjq("input#txtGetSKUNumber");
            }

            settingPrice = partjq("input#txtGetProductPrice");
            settingDesc = partjq("input#txtGetStyleText");
            var category = null;

            if ((buttonPurpose & addAnnivEternRing) != 0) { category = "annivEternRingSetting"; }
            else if ((buttonPurpose & addEaring) != 0) { category = "addEaring"; }
            else { category = "addPendant"; }

            if (!InputHasValue(settingNum) || !InputHasValue(settingPrice) || !InputHasValue(settingDesc)) {
                // Make sure they have a value to report
                BevyUp_ReportError("Cannot get form values for anniv add by button:" + evt.target.id);
            }
            else {
                // Need to change this to report event from boot
                SendAddToCartEvent(
                    settingNum.val(),
                    settingDesc.val(),
                    category,
                    1,
                    settingPrice.val());
            }
        }

        // report men diamond band & metal wedding band
        if ((buttonPurpose & addMenDiamondBand) != 0
            || (buttonPurpose & addMetalWeddingBand) != 0) {
            settingNum = partjq("input#ctl00_ContentPlaceHolder1_txtGetReferenceCode");
            settingPrice = partjq("input#ctl00_ContentPlaceHolder1_txtGetProductPrice");
            settingDesc = partjq("input#ctl00_ContentPlaceHolder1_txtGetDescription");
            var category = ((buttonPurpose & addMenDiamondBand) != 0) ? "menDiamondBand" : "metalWeddingBand";

            if (!InputHasValue(settingNum) || !InputHasValue(settingPrice) || !InputHasValue(settingDesc)) {
                // Make sure they have a value to report
                BevyUp_ReportError("Cannot get form values for anniv add by button:" + evt.target.id);
            }
            else {
                SendAddToCartEvent(
                    settingNum.val(),
                    settingDesc.val(),
                    category,
                    1,
                    settingPrice.val());
            }
        }
    }

    function InitializeMainFrame() {
        TraceWarn("BevyUp Initializing Main Frame");

        // Tools
        BevyUpUI.setToolsZIndex(899);

        if (!isCobbDesignYourOwn) {
            if (Platform.checkFlightingFlag('stmt') >= 0) {
                // This event report is for identifying boots on Zales main. We should remove it later (preferring a more permanent
                // solution by adding info to AppReady or similar).
                BevyUp_ReportEvent(9, 0, partnerId, []);
            }
        }

        BevyUpUI.addProductRenderHook("ProductCardPreprocess", PreprocessProductInfoForCard)

        DoCommonFrameTypeShimming();

        // Start application
        BevyUpUI.start();
    }

    function InitializeBrowsingFrame() {
        TraceWarn("BevyUp Initializing Browsing Frame");

        DoCommonFrameTypeShimming();
    }

    function DoCommonFrameTypeShimming()
    {
        // Shimming is triggered in two ways
        // 1. By the document ready event, where we will process the entire body. This will catch existing prodcuts on page which were added before we listened for dom inserts
        bupjq(document).ready(function () {
            TraceWarn("document ready, url:" + window.location.href);

            if (isCobbDesignYourOwn) {
                AddShimmingToElementAndRefreshTracking(document.body);

                // 2. By dom mutations fired after the ready event, where we process only the modified nodes. This will catch products dynamically added to page
                // These only happen on DYO
                WireProductShimmingToDomMutations();

                if (isCobbDYOCider) {
                    BindNewEringSettingDetailsRefreshTracking();
                }
            }
            else if (bOnMobileSite) {
                TagProductsZalesMobile();
            } else {
                // Zales' main page doesn't dynamically add products, no need to wire for mutations
                TagProductsZalesMain();
            }
        });
    }

    function PreprocessProductInfoForCard(productInfo) {
        var url = productInfo.productUrl;
        if (bOnMobileSite) {
            // All mobile must use https
            productInfo.productUrl = url.replace(/^(https?:)?\/\/(www\.)?zales.com\//, 'https://m.zales.com/');
        } else {
            // All zalesmain must use http
            productInfo.productUrl = url.replace(/^(https?:)?\/\/m\.zales\.com\//, 'http://www.zales.com/');
        }
    }

    // Assists in calling of refreshProductTracking at the right time for the Settings detail overlay element
    // which is re-used as different settings are clicked
    function BindNewEringSettingDetailsRefreshTracking() {
        if (!isCobbDYOCider) {
            return;
        }
        else if (typeof (window.bindImage) != "function") {
            // This is part of scriptCider2.js which they download synchronously from the root page. It should always be here
            BevyUp_ReportError("Failed to find bindImage function to shim");
            return;
        }

        // Inside origBindImage, they will update the bevyup product id attributes. We will read the updated values immediately after

        var origBindImage = window.bindImage;
        window.bindImage = function (data, metalID, prong) {
            origBindImage(data, metalID, prong);
            BevyUpUI.refreshTrackedProducts();
        }
    }

    function WireProductShimmingToDomMutations() {

        // Catch and shim new dynamically added nodes
        window.document.addEventListener('DOMNodeInserted', function (e) { if (!BevyUpUI.isBevyUpElement(e.target)) { AddShimmingToElementAndRefreshTracking(e.target); } }, false);

        // Stop tracking products in removed nodes.
        window.document.addEventListener('DOMNodeRemoved', function (e) { if (!BevyUpUI.isBevyUpElement(e.target)) { RemoveShimmingFromElement(e.target); } }, false);
    }

    // These lists will track elements which were targets of Dom node insertions and removals respectively.
    // As the events occur we will add to these lists and process them in batches at a regular timeout.

    var elementsToShim = [],
        elementsToUnShim = [],
        shimTimeout = -1,
        unShimTimeout = -1,
        shimThrottleMs = 200,
        isIeWorkaroundPage = (lcWindowHref.indexOf("/joining/w.htm") != -1),
        isCobbDesignYourOwn = !isIeWorkaroundPage && ((lcWindowHref.indexOf("theprestigediamondcollection.com") != -1) || (lcWindowHref.indexOf("stagingone.com") != -1)),
        isCobbDYOCider = isCobbDesignYourOwn && (lcWindowHref.indexOf("cider") != -1 || lcWindowHref.indexOf("newering.aspx") != -1);

    function AddShimmingToElementAndRefreshTracking(element) {
        elementsToShim.push(element);

        if (shimTimeout == -1) {
            TraceWarn("AddShimmingToElementAndRefreshTracking, Setting timeout");

            shimTimeout = window.setTimeout(
                function () {
                    var shimmedProducts = null,
                        allProducts = null;

                    // reset state to be re-used at next throttled pass
                    shimTimeout = -1;

                    if (BevyUpUI.getFrameType() == "browsing") {
                        // Consider inserted nodes for force capture code when co-browsing
                        ShimForcedCaptures(bupjq(elementsToShim), true);
                    }

                    elementsToShim = [];

                    TraceWarn("AddShimmingToElementAndRefreshTracking, ElementsProcessed: " + elementsToShim.length);

                    // Tell BevyUp to start tracking new products
                    // and stop tracking old removed products
                    // Doing this last as a fault-tolerance measure.
                    // If this call throws an exception, we need to make sure our state is reset properly.
                    BevyUpUI.refreshTrackedProducts();
                }
                , shimThrottleMs);
        }
    }

    function RemoveShimmingFromElement(element) {
        elementsToUnShim.push(element);

        if (unShimTimeout == -1) {
            TraceWarn("RemoveShimmingFromElement, Setting timeout");

            unShimTimeout = window.setTimeout(
                function () {

                    var jQWrapping = bupjq(elementsToUnShim);
                    TraceWarn("RemoveShimmingFromElement, ElementsProcessed: " + jQWrapping.length);

                    // Reset state to be re-used at next throttled pass
                    unShimTimeout = -1;
                    elementsToUnShim = [];

                    // Remove event bindings for removed element
                    ShimForcedCaptures(jQWrapping, false);
                }, shimThrottleMs);
        }
    }

    function SetProductZoneDetails(productZone, id, name, size, url, imageUrl, price) {

        productZone.setAttribute('bevyup_product_id', id);
        productZone.setAttribute('bevyup_product_name', name);
        productZone.setAttribute('bevyup_product_stickerSize', size);
        productZone.setAttribute('bevyup_product_url', url);
        productZone.setAttribute('bevyup_product_image', imageUrl);
        productZone.setAttribute('bevyup_product_price', price);

        // Set the data field
        var categoryString;
        var lowerCaseName = name.toLowerCase();
        if (lowerCaseName.indexOf("earrings") != -1) {
            categoryString = "earrings";
        }
        else if (lowerCaseName.indexOf("pendant") != -1) {
            categoryString = "pendant";
        }
        else if (lowerCaseName.indexOf("ring") != -1) {  // note: earrings has ring in it
            categoryString = "ring";
        }
        else if (lowerCaseName.indexOf("bangle") != -1) {
            categoryString = "bangle";
        }
        else if (lowerCaseName.indexOf("bracelet") != -1) {
            categoryString = "bracelet";
        }
        else if (lowerCaseName.indexOf("charm") != -1) {
            categoryString = "charm";
        }
        else if (lowerCaseName.indexOf("watch") != -1) {
            categoryString = "watch";
        }
        else if (lowerCaseName.indexOf("set") != -1) {
            categoryString = "set";
        }
        else if (lowerCaseName.indexOf("tie bar") != -1) {
            categoryString = "tie bar";
        }

        if (categoryString) {
            productZone.setAttribute('bevyup_product_data', 'category:' + categoryString);
        }
    }

    // BETA
    var zalesImageRegex = /^(https?:)?\/\/zales.imageg.net\/graphics\/product_images\/pZALE1-([0-9]+)t([0-9]+|h)\.jpg$/;
    function ZalesImageReplaceFunc(match, p1, p2) { return (p1||"") + "//zales.imageg.net/graphics/product_images/pZALE1-" + p2 + "t400.jpg";}
    function FindLargerImage(imgUrl) {
        // Thumbnails and 240px images --> 400px images.
        return imgUrl.replace(zalesImageRegex, ZalesImageReplaceFunc);
    }

    function TagProductsZalesMain() {
        if (typeof document.documentMode !== "undefined" && (document.documentMode === 7 || document.documentMode === 8)) return;

        if (!window.location.hostname.toLowerCase().endsWith('zales.com')) return;

        var count = 0,
            locationBlacklist = [
                "zales.com/product/index.jsp?productId=2082710", // gc
                "zales.com/product/index.jsp?productId=2083521", // gc
                "zales.com/product/index.jsp?productId=13327963", // empty
                "zales.com/product/index.jsp?productId=11988104", // empty
                "zales.com/product/index.jsp?productId=17778636", // empty
            ];

        try
        {
            if (lcWindowHref.indexOf("/search/") != -1
                || lcWindowHref.indexOf("/family/") != -1
                || lcWindowHref.indexOf("/family.jsp") != -1
                || lcWindowHref.indexOf("/category/") != -1
                || lcWindowHref.indexOf("/category.jsp") != -1) {

                bupjq('body.family li.product, body.search li.product')
                    .each(function (idx, e) {
                        var desc = e.querySelector('a.itemDescription');
                        var url = desc.href;
                        var id = url.match(/productId=([0-9]+)/)[1];
                        var name = bupjq(desc).text().trim();
                        var image = e.querySelector('a > img.familyProductImages');
                        var imageUrl = FindLargerImage(image.src);
                        var listprice = bupjq(e.querySelector('.listprice')).text();
                        var ourprice = bupjq(e.querySelector('nobr .ourprice')).text();
                        var productZone = e;

                        var price = (ourprice && ourprice.length > 0) ? ourprice : listprice;

                        SetProductZoneDetails(productZone, id, name, "50", url, imageUrl, price);

                        count++;
                    })
                    .addClass('bevyup_product');
            }
            else if (lcWindowHref.indexOf("/product/") != -1 ||
                lcWindowHref.indexOf("/product.jsp") != -1) {

                bupjq('body.product div#productMain')
                    .each(function (idx, e) {
                        var desc = e.querySelector('#productTitle');
                        var url = window.location.href;
                        var id = url.match(/productId=([0-9]+)/)[1];
                        var name = bupjq(desc).text().trim();
                        var image = e.querySelector('img#productMainImage');
                        var imageUrl = FindLargerImage(image.src);
                        var listprice = bupjq(e.querySelector('.listprice14 .formatPrice')).text();
                        var ourprice = bupjq(e.querySelector('.ourprice14 .formatPrice')).text();
                        var productZone = e.querySelector('#productImageOuter');
                        bupjq(productZone).addClass('bevyup_product');

                        var price = (ourprice && ourprice.length > 0) ? ourprice : listprice;

                        SetProductZoneDetails(productZone, id, name, "60", url, imageUrl, price);

                        count++;
                    });
            }
            else if (lcWindowHref.indexOf("/compare/") != -1) {

                bupjq('.product-info')
                    .each(function (idx, e) {
                        var desc = e.querySelector('a.short-description');
                        var url = desc.href;
                        var idMatch = url.match(/productId=([0-9]+)/);
                        if (!idMatch || idMatch.length == 0) {
                            return;
                        }

                        var id = idMatch[1];
                        var name = bupjq(desc).text().trim();
                        var image = e.querySelector('a.product-thumb > img');
                        var imageUrl = FindLargerImage(image.src);
                        var listprice = bupjq(e.querySelector('.listprice')).text();
                        var ourprice = bupjq(e.querySelector('nobr .ourprice')).text();
                        var productZone = e;

                        var price = (ourprice && ourprice.length > 0) ? ourprice : listprice;

                        SetProductZoneDetails(productZone, id, name, "45", url, imageUrl, price);

                        count++;
                    })
                    .addClass('bevyup_product');
            }
            else if (lcWindowHref.indexOf("/cart/") != -1) {

                bupjq('body.cart div.productRelprodCell')
                    .each(function (idx, e) {
                        var desc = e.querySelector('a.productReplprodTextLink');
                        var url = desc.href;
                        var id = url.match(/productId=([0-9]+)/)[1];
                        var name = bupjq(desc).text().trim();
                        var image = e.querySelector('a > img.prodRelprodImage');
                        var imageUrl = FindLargerImage(image.src);
                        var listprice = bupjq(e.querySelector('.listprice')).text();
                        var ourprice = bupjq(e.querySelector('.ourprice')).text();
                        var productZone = e;

                        var price = (ourprice && ourprice.length > 0) ? ourprice : listprice;
                        price = price.match(/.*?([\$0-9.]+).*/)[1];

                        SetProductZoneDetails(productZone, id, name, "45", url, imageUrl, price);

                        count++;
                    })
                    .addClass('bevyup_product');
            }
        } catch (err) {
            for (var i = 0; i< locationBlacklist.length; i++) {
                if (lcWindowHref.indexOf(locationBlacklist[i].toLowerCase()) != -1) {
                    TraceWarn("TagProductsZalesMain, Hit exception shimming page and found it to be blacklisted");
                    return;
                }
            }

            // Either a markup change that requires us to update shimming, or a page that has no products and should be added to the blacklist
            BevyUp_ReportError("Caught exception during product shimming:" + err.message);
        }

        TraceWarn("TagProductsZalesMain, Shimmed " + count + " products");

        if (count > 0) {
            // This should be called only from the callback of the BevyUp async init function, so no need to guard
            BevyUpUI.refreshTrackedProducts();
        }
    }

    function TagProductsZalesMobile() {
        // Catch and shim new dynamically added nodes
        window.document.addEventListener('DOMNodeInserted', function (e) { if (!BevyUpUI.isBevyUpElement(e.target)) { DoZMSShims(e.target); } }, false);

        // Stop tracking products in removed nodes.
        window.document.addEventListener('DOMNodeRemoved', function (e) { if (!BevyUpUI.isBevyUpElement(e.target)) { BevyUpUI.refreshTrackedProducts(); } }, false);

        DoZMSShims(document.body);
    }

    function DoZMSShims(root) {
        if (!root.querySelector) {
            // Don't try to shim from roots that don't have querySelector
            return;
        }
        var count = 0;
        count += ShimCategoryPageZMS(root);
        if (!count) {
            count += ShimPDPZMS(root);
        }
        if (count > 0) {
            BevyUpUI.refreshTrackedProducts();
        }
    }

    function ShimPDPZMS(root) {
        var e = root.querySelector('.product-detail');
        if (!e) return 0;

        var desc = e.querySelector('.description').textContent;
        var url = window.location.href;
        var id = url.match(/productId=([0-9]+)/)[1];
        var imageUrl = (e.querySelector('.product-img li.active img') || e.querySelector('.product-img img')).src;

        var name = desc.trim();
        var price = e.querySelector('.price').textContent.trim();
        var productZone = e;

        SetProductZoneDetails(productZone, id, name, "45", url, imageUrl, price);
        bupjq(e).addClass('bevyup_product');
        return 1;
    }

    function ShimCategoryPageZMS(root) {
        var count = 0;
        bupjq(root).find('.item.spin-container').each(function (idx, e) {
            var desc = e.querySelector('.description').textContent;
            var pimg = e.querySelector('.product-img');
            var url = pimg.querySelector('a').href;
            var img = pimg.querySelector('img');
            var imageUrl = (img.dataset && img.dataset.src) || img.src;

            

            var id = url.match(/productId=([0-9]+)/)[1];

            var name = desc.trim();
            var price = e.querySelector('.price').textContent.trim();
            var productZone = e;

            SetProductZoneDetails(productZone, id, name, "45", url, imageUrl, price);

            count++;
        }).addClass('bevyup_product');

        return count;
    }

    function SetupPaypalPopout_Zales() {
        if (window.top !== window.self) { // assume inside LV
            if (partjq === null || !IsCartPage_Zales()) return;
            var ppButton = partjq("a#payPalExpressBtn");

            if (typeof document.ecs === "undefined") {
                // Expected when no items in cart or when dyo items in cart and paypal disabled
                TraceWarn("Skipping paypal popout. Form not found");
                return;
            }
            else if (typeof document.ecs.nodeName === "undefined" || document.ecs.nodeName !== "FORM") {
                BevyUp_ReportError("Failed to find paypal ecs form on cart page");
                return;
            }

            document.ecs.target = "_blank";

            if (ppButton.length !== 1) {
                BevyUp_ReportError("Failed to find paypal button");
                return;
            }

            ppButton.click(function () { window.setTimeout(function () { window.location.href = "http://www.zales.com"; }, 4000); });
            TraceWarn("SetupPaypalPopout_Zales complete");
        }
    }

    function CheckCartPageForChanges_Zales() {

        BevyUp.require(['JSON'], function (j) {
            var JSON = j;

            if (!IsCartPage_Zales() || typeof (JSON) === "undefined" || typeof (JSON.parse) === "undefined" || typeof (JSON.stringify) === "undefined") return;

            SetupPaypalPopout_Zales();

            var qtyElems = document.getElementsByName("qty"),
                qtyElem = null;

            if (qtyElems.length != 1) {
                // We didnt find the qty table which we parse for addToCart events.
                // This is only expected in certain cases. If its not one of the expected
                // cases we log an error because this may indicate zales has changed the layout of the cart page
                // and requires that we adjust to the layout change in order to avoid losing add-to-cart data

                if (document.getElementsByName("myQty").length == 1 && lcWindowHref.indexOf("wlname") != -1) {
                    // Zales wishlist page, no add-to-cart reporting to be done
                }
                else if (navigator.userAgent.toLowerCase().indexOf("gomez") != -1) {
                    // Gomez test, nothing to report
                }
                else {
                    // Unexpected!
                    BevyUp_ReportError("CheckCartPageForChanges_Zales didn't find a qty form");
                }

                return;
            }
            else {
                qtyElem = qtyElems[0];
            }

            var count = 0;
            var productJqRows = partjq(qtyElem).find('table tbody').first().children('tr');

            var currentCartDict = {};

            // The first row is the header for the table, the others are channel intelligence variables
            if (productJqRows.length > 1) {

                var cookieCartDict = {};
                var cartCookies = bup_cookie("cartCookie");
                if (cartCookies && cartCookies.length > 0) {
                    cookieCartDict = JSON.parse(cartCookies);
                }

                for (var idx = 1; idx < productJqRows.length; idx++) {
                    var e = productJqRows[idx];
                    var quantity, sku, name, price;

                    var skuElem = partjq(e).find('td>a[href^="/product/index.jsp?productId="]')[0];
                    if (!skuElem) {
                        // This code blocks DYO add to carts from double adds
                        continue;
                    }

                    sku = skuElem.href.match(/\?productId=([0-9]+)/)[1];

                    var nameElem = partjq(e).find('a .details')[0];
                    if (!nameElem) {
                        continue;
                    }

                    name = partjq(nameElem).text();

                    var priceElem = partjq(e).find("td:nth-child(4)")[0];
                    if (!priceElem) {
                        continue;
                    }
                    price = partjq(priceElem).text().trim().substr(1); // substr to drop the currency symbol

                    var qtyElem = partjq(e).find("td:nth-child(1) input:nth-child(1)")[0];
                    if (!qtyElem) {
                        continue;
                    }
                    quantity = +(partjq(qtyElem).val());

                    TraceWarn("  In Cart, " + quantity + " " + sku + " " + name + " " + price);
                    var currentItemDict = { "quantity": quantity, "sku": sku, "name": name, "price": price };

                    currentCartDict[sku] = currentItemDict;

                    if (!cookieCartDict[sku] || cookieCartDict[sku]["quantity"] < quantity) {
                        var prevQuantity = cookieCartDict[sku] ? cookieCartDict[sku]["quantity"] : 0;

                        BevyUp_ReportEvent(7, 3, partnerId, ["_ss1sku", sku, "_ss2nme", name, "_dn1qty", quantity - prevQuantity, "_dn2pri", price]);
                        TraceWarn("*New Item In Cart, " + (quantity - prevQuantity) + " " + sku + " " + name + " " + price);
                    }

                    count++;
                }
            }

            // Overwrite even if no products are found
            bup_cookie("cartCookie", JSON.stringify(currentCartDict), { expires: 180, path: '/' });
            TraceWarn("CheckCartPageForChanges_Zales, Shimmed " + count + " items in the cart");
        });

    }

    function CheckForOrderConfirmationPage_Zales() {
        if (!IsCheckoutConfirmPage_Zales()) return;

        bup_cookie("cartCookie", "", { expires: 180, path: '/' });

        TraceWarn("CheckForOrderConfirmationPage_Zales, Removed cookie");
    }

    var isOneTimeShimmingDone = false;
    var forceCaptureDelegate = function (e) { BevyUpUI.forceCapture(); };
    function ShimForcedCaptures(jQueryObject, connectEvents) {
        // IE fires DOM events for these, so no shimming is needed (and should be avoided as it hurts ie perf)
        if (!bupjq.browser.msie) {
            // Shimming captures for when product images load in build-your-own pages as scrolled into view
            // In both cases below we do a find as well as an add because find will only consider children of the
            // passed in object, while filter will consider the current selection, and we want both considered

            // isCobbDesignYourOwn is a superSet of isCobbDYOCider
            if (isCobbDesignYourOwn) {
                if (isCobbDYOCider) {
                    // This was for the newer style (big pics) of ring grids on design-your-own
                    jQueryObject = jQueryObject.find('.thumbnail-inner .setting').add(jQueryObject.filter('.thumbnail .setting'));
                }
                else {
                    // This was for the older style of ring grids on design-your-own
                    jQueryObject = jQueryObject.find('[id^="jSetting_img"]').add(jQueryObject.filter('[id^="jSetting_img"]'));
                }

                if (jQueryObject.length > 0) {
                    if (connectEvents) {
                        jQueryObject.on('load', forceCaptureDelegate);
                    }
                    else {
                        jQueryObject.off('load', forceCaptureDelegate);
                    }
                }
            }
        }

        if (!isOneTimeShimmingDone && (typeof bupjq != "undefined")) {
            // This function is entered multiple times, but for some elements we only
            // need to look for and shim them in the first pass

            // Detect closing settings details overlay on new infi-scroll dyo pages
            bupjq("#setting-detail-close").on("click", function (e) { BevyUpUI.forceCapture(); });

            isOneTimeShimmingDone = true;
        }
    }



    // Call this regardless of whether BevyUp app ready fires. We want
    // to get add to cart events whenever possible
    if (!isIeWorkaroundPage && (IsDYOInnerFrame_Cobb() || IsDYOCategoryPage_Cobb() || IsCartPage_Zales() || IsCheckoutConfirmPage_Zales())) {
        FindPartnerJqAndWaitForReady(function () {
            DoDYOCategoryAddToCartShimming_Cobb();

            CheckCartPageForChanges_Zales();

            CheckForOrderConfirmationPage_Zales();
        });
    }
}());
}());