window.$BV||(function(f,l,c){var j={},p,s={},n={},i={},q={},t={},e=[],m=0;function d(v){var w=[].join.call(arguments," ");if(f.console&&console.log){if(l.all){console.log(w)}else{console.log.apply(console,arguments)}}else{if(f.Debug&&Debug.writeln){Debug.writeln(w)}else{if(f.opera&&opera.postError){opera.postError(w)}}}}j.log=d;function a(x,y){var v,w;if(x.length!==c){for(w=0;w<x.length;w++){y(w,x[w])}}else{for(v in x){y(v,x[v])}}}function r(z){var y,w,x,v;for(v=1;v<arguments.length;v++){if((y=arguments[v])!=null){for(w in y){if((x=y[w])!==c){z[w]=x}}}}return z}function b(v){m+=v;$bv("body").toggleClass("BVDIAjaxWait",m>0)}function g(){}j.Internal=r(g,{each:a,extend:r,exposeGlobals:function(v){a(v,function(w,x){if(/^(bv|BV)/.test(w)){f[w]=x}})},create:function(v){function w(){}w.prototype=v;return new w()},newLatch:function(v){var w=[];return{increment:function(){v++},release:function(){v--;while(v<=0&&w.length){(w.shift())()}},queue:function(x){if(v<=0){x()}else{w.push(x)}}}}});function o(w,v){return function(){return w.apply(null,v.concat([].slice.call(arguments,0)))}}function h(v){var x=[],w=g._require.s.contexts._.specified;a(v,function(B,A){if(!w[A]){var z=q[A],y=i[z||A];if(z){x.push(z)}if(y){a(y,function(D,C){w[C]=true})}}});if(x.length){g._require(x)}return v}function k(v,w){return function(){try{return w&&w.apply(null,arguments)}catch(x){d("Exception in "+v,x)}}}function u(){if($bv().jquery){$bv.ready()}else{p=true}}p=(l.readyState==="complete");if(l.addEventListener){l.addEventListener("DOMContentLoaded",u,false);f.addEventListener("load",u,false)}j.docReady=u;r(g,{require:function(v,w){return g._require(h(v),w&&k("<unknown>",w))},define:function(v,w,x,y){g._require.def(v,h(x),k(v,o(y,w)))},modify:function(x,v,w,y,z){g._require.modify(x,v,h(y),z&&k(v,o(z,w)))},callAjax:function(x,w){var v=[].slice.call(arguments,0);b(1);g._require([x],k(x,function(y){b(-1);if(y){y.apply(null,v)}else{d("Bazaarvoice: error fetching url: "+x)}}),"bvajax")},ajaxCallback:function(v){e.push(v)},onModuleLoaded:function(w,x){if(x==="bvajax"){var v=e.shift();g._require.def(w,[],function(){return v},x)}},defineJQuery:function(v){g.define("jquery.core",[v.noConflict(true)],[],function(w){f.$bv=w;if(p){u()}return w})},getAlternateUrl:function(v){return t[v]},configureLoader:function(w,x,y,v,z){if(g._baseUrl){delete w.baseUrl}else{g._baseUrl=w.baseUrl}g._require(w);g._require(w,null,null,"bvajax");r(t,x);r(s,y);r(n,v);r(g,z)},configureAppLoader:function(z,v,y){var w=v?"-mobile":"";a(["global",z],function(B,C){var A=s[C+w]?C+w:C;if(s[A]){a(s[A],function(E,D){i[E]=D;for(var F=0;F<D.length;F++){if(!q[D[F]]){q[D[F]]=E}}});delete s[A]}});function x(B,C){var A={};A[C]=q[B]||B;g._require.modify(A)}a(["global",z],function(A,B){if(n[B]){a(n[B],x);delete n[B]}});if(y){a(y,x)}},configureFromWindow:function(v){if(f!=v&&v.$BV&&v.$BV.Internal._baseUrl){g._baseUrl=null;g.configureLoader({baseUrl:v.$BV.Internal._baseUrl})}}});f.$bv=function(v){var x,y,w=[];if(v&&(x=/^\s*#([^, ]+)\s*$/.exec(v))&&(y=l.getElementById(x[1]))){w.push(y)}else{if(v==="body"){w.push(y=l.body)}}w.text=function(){return y&&(y.textContent||y.innerText)};w.attr=function(z,A){if(A===c){return y&&y.getAttribute(z)}else{y&&y.setAttribute(z,""+A);return w}};w.toggleClass=function(z,B){if(y){var A=" "+(y.className||"")+" ";if(B){if(A.indexOf(" "+z+" ")<0){A+=" "+z;y.className=A.replace(/^\s+|\s+$/g,"")}}else{y.className=A.replace(" "+z,"").replace(/^\s+|\s+$/g,"")}}};return w};f.$BV=j}(window,document));
/*
 * @license RequireJS Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
 * Available via the MIT, GPL or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
(function(n){var h="0.12.0",o={},r,v,g="_",u=[],f,y,x,k,t,j,q,e=/^(complete|loaded)$/,p=!!(typeof window!=="undefined"&&navigator&&document),l=!p&&typeof importScripts!=="undefined",w=Object.prototype.toString,d,c,a;function b(i){return w.call(i)==="[object Function]"}if(typeof n!=="undefined"){if(b(n)){return}else{j=n}}n=function(m,s,i){if(typeof m==="string"&&!b(s)){return n.get(m,s)}return n.def.apply(n,arguments)};c=n;n.def=function(O,G,B,M){var N=null,m,z,E,K,I,s,C,H,A,F,J,D,L;if(typeof O==="string"){if(!n.isArray(G)){M=B;B=G;G=[]}M=M||r.ctxName;m=r.contexts[M];if(m&&(m.defined[O]||m.waiting[O])){return n}}else{if(n.isArray(O)){M=B;B=G;G=O;O=null}else{if(n.isFunction(O)){B=O;M=G;O=null;G=[]}else{N=O;O=null;if(n.isFunction(G)){M=B;B=G;G=[]}M=M||N.context}}}M=M||r.ctxName;m=r.contexts[M];if(!m){z={contextName:M,config:{waitSeconds:7,baseUrl:r.baseUrl||"./",paths:{}},waiting:[],specified:{require:true,exports:true,module:true},loaded:{require:true},urlFetched:{},defined:{},modifiers:{}};z.defined.require=n;m=r.contexts[M]=z}if(N){if(N.baseUrl){if(N.baseUrl.charAt(N.baseUrl.length-1)!=="/"){N.baseUrl+="/"}}J=m.config.paths;n.mixin(m.config,N,true);if(N.paths){for(s in N.paths){if(!(s in o)){J[s]=N.paths[s]}}m.config.paths=J}if(N.priority){c(N.priority);m.config.priorityWait=N.priority}if(N.deps||N.callback){c(N.deps||[],N.callback)}if(!G){return n}}if(G){H=G;G=[];for(L=0;L<H.length;L++){G[L]=n.splitPrefix(H[L],O)}}C=m.waiting.push({name:O,deps:G,callback:B});if(O){m.waiting[O]=C-1;m.specified[O]=true;A=m.modifiers[O];if(A){c(A,M)}}if(O&&B&&!n.isFunction(B)){m.defined[O]=B}if(r.paused||m.config.priorityWait){(r.paused||(r.paused=[])).push([F,O,G,m])}else{n.checkDeps(F,O,G,m);n.checkLoaded(M)}if(O){m.loaded[O]=true}return n};n.mixin=function(s,m,i){for(var z in m){if(!(z in o)&&(!(z in s)||i)){s[z]=m[z]}}return n};n.version=h;r=n.s={ctxName:g,contexts:{},skipAsync:{},isBrowser:p,isPageLoaded:!p,readyCalls:[],doc:p?document:null};n.isBrowser=r.isBrowser;if(p){r.head=document.getElementsByTagName("head")[0];a=document.getElementsByTagName("base")[0];if(a){r.head=a.parentNode}}n.pause=function(){if(!r.paused){r.paused=[]}};n.resume=function(){var z,m,s;if(r.contexts[r.ctxName].config.priorityWait){return}if(r.paused){s=r.paused;delete r.paused;for(z=0;(m=s[z]);z++){n.checkDeps.apply(n,m)}}n.checkLoaded(r.ctxName)};n.checkDeps=function(m,s,C,A){var z,B;if(m){}else{for(z=0;(B=C[z]);z++){if(!A.specified[B.fullName]){A.specified[B.fullName]=true;if(B.prefix){}else{n.load(B.name,A.contextName)}}}}};n.modify=function(B,m,G,F,A){var i,z,C,D=(typeof B==="string"?A:m)||r.ctxName,s=r.contexts[D],E=s.modifiers;if(typeof B==="string"){C=E[B]||(E[B]=[]);if(!C[m]){C.push(m);C[m]=true}n.def(m,G,F,A)}else{for(i in B){if(!(i in o)){z=B[i];C=s.modifiers[i]||(s.modifiers[i]=[]);if(!C[z]){C.push(z);C[z]=true;if(s.specified[i]){c([z],D)}}}}}};n.isArray=function(i){return w.call(i)==="[object Array]"};n.isFunction=b;n.get=function(m,s){if(m==="exports"||m==="module"){throw new Error("require of "+m+" is not allowed.")}s=s||r.ctxName;var i=r.contexts[s].defined[m];if(i===undefined){throw new Error("require: module name '"+m+"' has not been loaded yet for context: "+s)}return i};n.load=function(s,B){var z=r.contexts[B],A=z.urlFetched,m=z.loaded,i;r.isDone=false;if(!m[s]){m[s]=false}i=n.nameToUrl(s,null,B);if(!A[i]){z.startTime=(new Date()).getTime();n.attach(i,B,s);A[i]=true}z.startTime=(new Date()).getTime()};n.jsExtRegExp=/\.js$/;n.normalizeName=function(m,s){var i;if(m.charAt(0)==="."){s=s.split("/");s=s.slice(0,s.length-1);m=s.concat(m.split("/"));for(v=0;(i=m[v]);v++){if(i==="."){m.splice(v,1);v-=1}else{if(i===".."){m.splice(v-1,2);v-=2}}}m=m.join("/")}return m};n.splitPrefix=function(i,m){var s=null;if(m){i=n.normalizeName(i,m)}return{prefix:s,name:i,fullName:s?s+"!"+i:i}
};n.nameToUrl=function(m,z,B){var F,C,D,E,s,A=r.contexts[B].config;if(m.indexOf(":")!==-1||m.charAt(0)==="/"||n.jsExtRegExp.test(m)){return m}else{if(m.charAt(0)==="."){throw new Error("require.nameToUrl does not handle relative module names (ones that start with '.' or '..')")}else{F=A.paths;C=m.split("/");for(D=C.length;D>0;D--){E=C.slice(0,D).join("/");if(F[E]){C.splice(0,D,F[E]);break}}s=C.join("/")+(z||".js");return((s.charAt(0)==="/"||s.match(/^\w+:/))?"":A.baseUrl)+s}}};n.checkLoaded=function(R){var D=r.contexts[R||r.ctxName],G=D.config.waitSeconds*1000,I=G&&(D.startTime+G)<new Date().getTime(),P,B=D.defined,m=D.modifiers,z,O="",M=false,A=false,E,J,N,Q,C,L,K,F,H,s={};if(D.isCheckLoaded){return}if(D.config.priorityWait){J=true;for(Q=0;(N=D.config.priorityWait[Q]);Q++){if(!D.loaded[N]){J=false;break}}if(J){delete D.config.priorityWait;n.resume()}else{return}}D.isCheckLoaded=true;z=D.waiting;P=D.loaded;for(E in P){if(!(E in o)){M=true;if(!P[E]){if(I){O+=E+" "}else{A=true;break}}}}if(!M&&!z.length){D.isCheckLoaded=false;return}if(I&&O){H=new Error("RequireJS load timeout for modules: "+O);H.requireType="timeout";H.requireModules=O}if(A){D.isCheckLoaded=false;if(p||l){setTimeout(function(){n.checkLoaded(R)},50)}return}D.waiting=[];D.loaded={};for(E in m){if(!(E in o)){if(B[E]){n.execModifiers(E,s,z,D)}}}for(Q=0;(C=z[Q]);Q++){n.exec(C,s,z,D)}D.isCheckLoaded=false;if(D.waiting.length){n.checkLoaded(R)}else{if(u.length){}else{r.ctxName=g;r.isDone=true;if(n.callReady){n.callReady()}}}};n.exec=function(s,C,K,m){if(!s){return undefined}var i=s.name,A=s.callback,J=s.deps,D,H,B=m.defined,E,F=[],z,G=false,I;if(i){if(C[i]||i in B){return B[i]}C[i]=true}if(J){for(D=0;(H=J[D]);D++){I=H.name;if(I==="exports"){z=B[i]={};G=true}else{if(I==="module"){z={id:i,uri:i?n.nameToUrl(i,null,m.contextName):undefined}}else{z=I in B?B[I]:(C[I]?undefined:n.exec(K[K[I]],C,K,m))}}F.push(z)}}A=s.callback;if(A&&n.isFunction(A)){E=n.execCb(i,A,F);if(i){if(G){E=B[i]}else{if(i in B){throw new Error(i+" has already been defined")}else{B[i]=E}}}}n.execModifiers(i,C,K,m);return E};n.execCb=function(s,i,m){return i.apply(null,m)};n.execModifiers=function(D,C,E,A){var m=A.modifiers,B=m[D],z,s;if(B){for(s=0;s<B.length;s++){z=B[s];if(z in E){n.exec(E[E[z]],C,E,A)}}delete m[D]}};n.onScriptLoad=function(i){var s=i.currentTarget||i.srcElement,z,m;if(i.type==="load"||i.type==="error"||e.test(s.readyState)){z=s.getAttribute("data-requirecontext");m=s.getAttribute("data-requiremodule");$BV.Internal.onModuleLoaded(m,z);r.contexts[z].loaded[m]=true;n.checkLoaded(z);if(s.removeEventListener){s.removeEventListener("load",n.onScriptLoad,false);s.removeEventListener("error",n.onScriptLoad,false)}else{s.detachEvent("onreadystatechange",n.onScriptLoad)}}};n.attach=function(s,B,m,C,z){var A,i;if(p){C=C||n.onScriptLoad;A=document.createElement("script");A.type=z||"text/javascript";A.charset="utf-8";if(!r.skipAsync[s]){A.setAttribute("async","async")}A.setAttribute("data-requirecontext",B);A.setAttribute("data-requiremodule",m);if(A.addEventListener){A.addEventListener("load",C,false);A.addEventListener("error",C,false)}else{A.attachEvent("onreadystatechange",C)}A.src=s;return a?r.head.insertBefore(A,a):r.head.appendChild(A)}else{if(l){i=r.contexts[B].loaded;i[m]=false;importScripts(s);$BV.Internal.onModuleLoaded(m,B);i[m]=true}}return null};r.baseUrl=j&&j.baseUrl;if(p&&(!r.baseUrl||!r.head)){f=document.getElementsByTagName("script");if(j&&j.baseUrlMatch){x=j.baseUrlMatch}else{x=/(allplugins-|transportD-)?require\.js(\W|$)/i}for(v=f.length-1;v>-1&&(y=f[v]);v--){if(!r.head){r.head=y.parentNode}k=y.src;if(k){t=k.match(x);if(t){r.baseUrl=k.substring(0,t.index);break}}}}if(j){c(j)}$BV.Internal._require=n}($BV.Internal._require));
(function(f,g,a){var b=a._require,h=b.attach;b.attach=function(k,m,j){var l=a.getAlternateUrl(j);if(l&&m==="_"&&!c(j)){i(l,k,m,j)}else{h.apply(null,arguments)}};function i(l,n,m,j){var k=f.jQuery;h(l,m,j,function(r){var q=r.currentTarget||r.srcElement,p=r.type==="error",s=f.jQuery,o="1.6.3";if(!q.readyState||q.readyState==="loaded"||q.readyState==="complete"){if(!p&&j==="jquery.core"&&s&&s!==k&&s.fn&&s.fn.jquery===o){s.noConflict(true);if(!e(f.jQuery,s)){a.defineJQuery(s)}}if(d(j,m)){b.onScriptLoad(r)}else{h(n,m,j)}}})}function c(j){return j==="jquery.core"&&(g.all||(f.Prototype&&/^1\.[0-5]\b/.test(Prototype.Version))||!g.querySelectorAll)}function e(n,j){try{if(!(n&&n.fn&&n.fn.jquery&&n.data)){return false}else{if(n.expando){return n.expando===j.expando}else{var m=g.createElement("div");n.data(m,"bv","bv");var k=m[j.expando]!=null;n.removeData(m,"bv");return k}}}catch(l){return true}}function d(j,l){var k=b.s.contexts[l||b.s.ctxName];return !!(k.defined[j]||k.waiting[j])}})(window,document,$BV.Internal);
$BV.Internal.configureLoader({"baseUrl":"http://calendars.ugc.bazaarvoice.com/module/9036/","waitSeconds":20},{"jquery.core":"http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"},{"global":{"cmn/9036/display.pkg":["analyticsAutoTagHooks","analyticsHooks","analyticsVersioning","animationQueueing","browserVersion","contentDispatcher","contentDisplay","cookies","crossDomain","domUtils","dropdown","injection","injection.shared","injection.shared.replacements","jquery.effects.core","json2","magpie","magpieTracking","parseUri","requester","rpcSupport","swfobject","tooltip","underscore","urlEnvironmentManagementService","urlEnvironmentStatus","wrapperDivs"]},"rr":{"rr/9036/display.pkg":["alignments","animationOptions","facebookConnect","feedbackStyle1","photoDisplay","popupDisplay","rr/analyticsHooksRR","rr/analyticsInternalLegacyHooksRR","rr/contentDisplayRR","rr/feedbackStyle1RR","rr/injection.rr","rr/injection.rr.replacements","rr/photoDisplayRR","socialBookmarkingFacebook","socialConnect"],"rr/9036/submit.pkg":["additionalContentPaging","apiCore","appendSubmission","conditionalBehavior","contentSubmit","deviceFingerprint","dotnet","fieldPicker","forms","formula","framedContent","hostedAuthentication","iframeSupport","injectionRPC","jquery.rating","jquery.ui.core","jquery.ui.mouse","jquery.ui.slider","jquery.ui.widget","lightbox","overlay","photoUpload","productPicker","productPickerFrame","productReferenceSubmit","ratingControls","rr/reviewSubmissionRR","socialConnectFacebook","submitFrame","submitInjection","tagSubmission"]},"rr-mobile":{"rr/9036/mobiledisplay.pkg":["animationOptions","facebookConnect","feedbackStyle1","rr/analyticsHooksRR","rr/analyticsInternalLegacyHooksRR","rr/contentDisplayRR","rr/feedbackStyle1RR","rr/injection.rr","rr/injection.rr.replacements","socialBookmarkingFacebook","socialConnect"],"rr/9036/mobilesubmit.pkg":["additionalContentPaging","alignments","apiCore","appendSubmission","conditionalBehavior","contentSubmit","dotnet","fieldPicker","forms","formula","framedContent","hostedAuthentication","iframeSupport","injectionRPC","jquery.rating","jquery.ui.core","jquery.ui.mouse","jquery.ui.slider","jquery.ui.widget","lightbox","overlay","ratingControls","rr/reviewSubmissionRR","socialConnectFacebook","submitFrame","tagSubmission","textCounter"]}},{"global":{"analyticsAutoTagHooks":"analyticsHooks"}},{"_magpieSettings":{"anonymousHostname":"network-a.bazaarvoice.com","trackerHostname":"network.bazaarvoice.com","autoTagEnabled":true,"prrEnv":"prod","vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}});
$BV.Internal.configureAppLoader("rr",false);
setTimeout(function(){$BV.Internal.require(["jquery.core","cmn/9036/display.pkg","rr/9036/display.pkg"])},100);
