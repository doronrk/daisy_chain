"version:320";"build:0.13.1";"date:Mon Nov 17 2014 20:55:45 GMT+0000 (UTC)";try{(function(e){if(window.BV&&window.BV._bvapijs)return;(function(e){var t={_internal:{},options:{}};e.BV&&e.BV.initialData&&(t.options.initialData=e.BV.initialData),e.BV&&e.BV.API_BASE_URL&&(t._internal.apiOverrideURL=e.BV.API_BASE_URL),e.BV&&e.BV.injectJS&&typeof e.BV.injectJS=="function"&&(t._internal.customerInject=e.BV.injectJS),e.BV=t})(window),window.console&&console.timeline&&console.timeline("scout-to-render");var t=window.BV,n=t._internal||{};n.startTime=new Date,n.apiCache={},n.fbVersion="320",n.uiVersion="0.13.1",n.protocol=window.location.protocol==="https:"?"https:":"http:",n.loader="bv-primary.js",t._internal=n,t._bvapijs=!0,t._options={build:!0,site:"Main Site",implementations:{weights:{17698:100},total:100},configs:{17698:{version:320,locale:"en_US",locales:[{locale:"en_US",language:"en",country:"US"}],apiconfig:{limit:10,passkey:"322y6wt98cd22s2ygldocw2jv",baseUrl:"//api.bazaarvoice.com/data/",notificationsUrl:"//api.bazaarvoice.com/notifications/",bvLocalUrl:"//api.bazaarvoice.com/bvlocal/",bvLocalKey:"95uqgm8emmjyp9ymrthmtxb9",contentLocales:["en_US"],displaycode:"17698-en_us"},allowedDomains:[{domainAddress:".talbots.com",thirdPartyCookieEnabled:!0},{thirdPartyCookieEnabled:!0,domainAddress:".bazaarvoice.com"},{thirdPartyCookieEnabled:!0,domainAddress:".localhost"}],build:!0,statsTypes:["Reviews"],externalFeatures:[],page:{size:8,size2n:8,reInject:!0,details:{review:{size:8,size2n:30},question:{size:10,size2n:10},comment:{size:3,size2n:3},reviewcomment:{size:3,size2n:3},answer:{size:10,size2n:10},author:{size:1,size2n:1}}},homePageUrl:"http://www.talbots.com/",container:{url:null,subjectRedirect:!0},analytics:{vendors:{magpie:{brandDomain:null}}},vendorConfig:{facebook:{key:""}},uiActions:{rr_inline_ratings:["inlineRatingList1"],rr_show_reviews:["reviewContentList1","reviewSubmission1","reviewSummary1"],rr_submit_review:["reviewSubmission1"],rr_submit_comment:["commentSubmission1_inline"],rr_submit_generic:["reviewGenericSubmission1"],qa_show_summary:["reviewSummary1"],qa_show_questions:["questionContentList1","questionSubmission1"],qa_show_answers:[],qa_submit_question:["questionSubmission1"],qa_submit_answer:["answerSubmission1_inline"],cp_show_profile:["fullProfile1"],sy_show_stories:[]},containers:{BVRRSummaryContainer:"summaryContainerDiv",BVRRContainer:"contentContainerDiv",BVQAContainer:"contentContainerDiv",BVLBContainer:"contentContainerDiv"},injectionZone:{},submission:{duplicateTimeout:432e5,userTimeout:6048e5,maxAnswers:10,questionsPageSize:4,rating:{range:[1,5]},reviewtext:{maxlength:1e4,minlength:0},title:{maxlength:50,minlength:0},usernickname:{maxlength:50,minlength:0},userlocation:{maxlength:100,minlength:0},netpromoterscore:{range:[0,10]},netpromotercomment:{maxlength:1e5,minlength:0}},display:{filters:[],sprite:!1,syndicationFilter:!1},fqhn:"display.ugc.bazaarvoice.com",environment:"production",workspace:"production",imagesPath:"//display.ugc.bazaarvoice.com/common/images/",utilPath:"//display.ugc.bazaarvoice.com/common/util/",displaycode:"17698",implementationID:"6b84130f-19fe-4b24-8176-5a31be510438",clientname:"talbots-us",clientDisplayName:"Talbots",siteAuth:{review:!1,comment:!1,question:!1,answer:!1},loginPage:"",experiments:{},clientLogo:"http://image.sa.bazaarvoice.com/lib/fe611570726c06797215/m/1/qXgl3QCtSAamqEVudyEF.jpg",sort:{reviews:"mostHelpful",questions:"recentAnswersFirst"},sci:{enabled:!0,waps:[{name:"AdobeSiteCatalyst",evar:70,event:70,tracker:""}]},bvLocal:{enabled:!1,isLocalNode:!1},rrReadOnlyEnabled:!1,termsAndConditions:{rrTermsAndConditionsRemoteUrl:{$schema:"http://config.bazaarvoice.com/api/schemas/Configuration/LocalizedText/1.0.0",en:"",defaultValue:""},rrTermsAndConditionsRemoteUrlEnabled:!1,qaTermsAndConditionsRemoteUrl:{$schema:"http://config.bazaarvoice.com/api/schemas/Configuration/LocalizedText/1.0.0",en:"",defaultValue:""},qaTermsAndConditionsRemoteUrlEnabled:!1},contentLocales:[],revision:"25-546a60a7e4b012830aca752f",site:"Main Site",prefetchConfigs:[{url:"//api.bazaarvoice.com/data/batch.json?passkey=322y6wt98cd22s2ygldocw2jv&apiversion=5.5&displaycode=17698-en_us&resource.q0=products&filter.q0=id%3Aeq%3A___PRODUCTIDTOKEN___&stats.q0=reviews&filteredstats.q0=reviews&filter_reviews.q0=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q0=contentlocale%3Aeq%3Aen_US&resource.q1=reviews&filter.q1=isratingsonly%3Aeq%3Afalse&filter.q1=productid%3Aeq%3A___PRODUCTIDTOKEN___&filter.q1=contentlocale%3Aeq%3Aen_US&sort.q1=helpfulness%3Adesc%2Ctotalpositivefeedbackcount%3Adesc&stats.q1=reviews&filteredstats.q1=reviews&include.q1=authors%2Cproducts%2Ccomments&filter_reviews.q1=contentlocale%3Aeq%3Aen_US&filter_reviewcomments.q1=contentlocale%3Aeq%3Aen_US&filter_comments.q1=contentlocale%3Aeq%3Aen_US&limit.q1=8&offset.q1=0&limit_comments.q1=3",subQueries:["//api.bazaarvoice.com/data/products.json?passkey=322y6wt98cd22s2ygldocw2jv&apiversion=5.5&displaycode=17698-en_us&filter=id%3Aeq%3A___PRODUCTIDTOKEN___&stats=reviews&filteredstats=reviews&filter_reviews=contentlocale%3Aeq%3Aen_US&filter_reviewcomments=contentlocale%3Aeq%3Aen_US","//api.bazaarvoice.com/data/reviews.json?passkey=322y6wt98cd22s2ygldocw2jv&apiversion=5.5&displaycode=17698-en_us&filter=isratingsonly%3Aeq%3Afalse&filter=productid%3Aeq%3A___PRODUCTIDTOKEN___&filter=contentlocale%3Aeq%3Aen_US&sort=helpfulness%3Adesc%2Ctotalpositivefeedbackcount%3Adesc&stats=reviews&filteredstats=reviews&include=authors%2Cproducts%2Ccomments&filter_reviews=contentlocale%3Aeq%3Aen_US&filter_reviewcomments=contentlocale%3Aeq%3Aen_US&filter_comments=contentlocale%3Aeq%3Aen_US&limit=8&offset=0&limit_comments=3"]}]}},version:320,notifications:{passkey:"b8d57893b7754e2d390348dc172b7c76"}},t.requestAnimationFrame=function(){var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};return function(){return e.apply(window,arguments)}}(),t.Date={now:function(){var e=Date,t=e.now;return typeof t=="function"?function(){return t.call(e)}:function(){return(new e).getTime()}}()},t.performance={now:function(){var e=window.performance,n=e&&e.now;if(typeof n=="function")return function(){return n.call(e)};var r=t.Date.now();return e&&e.timing&&typeof e.timing.navigationStart=="number"&&(r=e.timing.navigationStart),function(){return t.Date.now()-r}}()},t.performance.mark=function(){var e=window.performance,n=e&&e.mark;if(typeof n=="function")return function(t){n.call(e,t)};var r=t.performance._marks={},i=t.performance._timeline=[],s={navigationStart:1,unloadEventStart:1,unloadEventEnd:1,redirectStart:1,redirectEnd:1,fetchStart:1,domainLookupStart:1,domainLookupEnd:1,connectStart:1,connectEnd:1,secureConnectionStart:1,requestStart:1,responseStart:1,responseEnd:1,domLoading:1,domInteractive:1,domContentLoadedEventStart:1,domContentLoadedEventEnd:1,domComplete:1,loadEventStart:1,loadEventEnd:1};return function(e){if(arguments.length<1)throw new SyntaxError("Cannot set mark without name");if(e in s)throw new SyntaxError('Cannot set mark with reserved name "'+e+'"');var n={entryType:"mark",name:e,startTime:t.performance.now(),duration:0};r[e]=r[e]||[],r[e].push(n.startTime),i.push(n)}}(),t.performance.mark("scoutStart"),t._internal.asEvented=function(){function r(e,t){var n,r,i=this.events=this.events||{},s=e.split(/\s+/),o=s.length;for(n=0;n<o;n++)i[r=s[n]]=i[r]||[],i[r].push(t);return this}function i(e,t){var r=function(){this.off(e,r),t.apply(this,n.call(arguments))};return this.on(e,r),this}function s(e,t){var n,r,i,s,o,a=this.events;if(!a)return;o=e.split(/\s+/);for(r=0,s=o.length;r<s;r++)(n=o[r])in a!=0&&(i=t?u(a[n],t):0,i!==-1&&a[n].splice(i,1));return this}function o(e){var t,r,i=this.events;if(!i||e in i==0)return;t=n.call(arguments,1);for(r=i[e].length-1;r>=0;r--)try{i[e][r].apply(this,t)}catch(s){}return this}function u(e,n){var r,i;if(t&&e.indexOf===t)return e.indexOf(n);for(r=0,i=e.length;r<i;r++)if(e[r]===n)return r;return-1}var e=Array.prototype,t=e.indexOf,n=e.slice;return function(){return this.on=r,this.off=s,this.trigger=this.emit=o,this.one=this.once=i,this}}(),t.performance.jank=function(){function r(i){i-o>n&&s.trigger("jank",i-o-e),o=t.performance.now(),t.requestAnimationFrame(r)}var e=17,n=e+1,i=t._internal.asEvented,s={};i.call(s);var o=t.performance.now();return r(o),s}(),function(e,t){if(e.apiOverrideURL){e.originalApiHosts={};for(var n in t)t.hasOwnProperty(n)&&(e.originalApiHosts[n]=t[n].apiconfig.baseUrl,t[n].apiconfig.baseUrl=e.apiOverrideURL)}}(t._internal,t._options.configs),t._internal.ie=function(){var t=function(e,t){var n=t.getElementsByTagName("i");while(t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->",n[0]);return e>4?e:undefined}(3,e.createElement("div"));return t||null}(),function(e){function g(e){var t=m[e]={};return f(e.split(/\s+/),function(e){t[e]=!0}),t}var t={},n=Array.prototype,r=Object.prototype,i=r.hasOwnProperty,s=r.toString,o=n.forEach,u=n.indexOf,a=n.slice,f=function(e,n,r){var s,u,a;if(!e)return;if(o&&e.forEach===o)e.forEach(n,r);else if(e.length===+e.length){for(u=0,a=e.length;u<a;u++)if(u in e&&n.call(r,e[u],u,e)===t)return}else for(s in e)if(i.call(e,s)&&n.call(r,e[s],s,e)===t)return},l=function(e){return!!(e&&e.constructor&&e.call&&e.apply)},c=function(e){return f(a.call(arguments,1),function(t){var n;for(n in t)t[n]!==void 0&&(e[n]=t[n])}),e},h=function(e,t,n){var r;if(t){if(u)return u.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},p={};f("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){p["[object "+e+"]"]=e.toLowerCase()});var d=function(e){return e==null?String(e):p[s.call(e)]||"object"},v={extend:c,each:f,isFunction:l},m={};v.Callbacks=function(e){e=typeof e=="string"?m[e]||g(e):c({},e);var t,n,r,i,s,o,u=[],a=!e.once&&[],l=function(f){t=e.memory&&f,n=!0,o=i||0,i=0,s=u.length,r=!0;for(;u&&o<s;o++)if(u[o].apply(f[0],f[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,u&&(a?a.length&&l(a.shift()):t?u=[]:p.disable())},p={add:function(){if(u){var n=u.length;(function o(t){f(t,function(t){var n=d(t);n==="function"?(!e.unique||!p.has(t))&&u.push(t):t&&t.length&&n!=="string"&&o(t)})})(arguments),r?s=u.length:t&&(i=n,l(t))}return this},remove:function(){return u&&f(arguments,function(e){var t;while((t=h(e,u,t))>-1)u.splice(t,1),r&&(t<=s&&s--,t<=o&&o--)}),this},has:function(e){return h(e,u)>-1},empty:function(){return u=[],this},disable:function(){return u=a=t=undefined,this},disabled:function(){return!u},lock:function(){return a=undefined,t||p.disable(),this},locked:function(){return!a},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],u&&(!n||a)&&(r?a.push(t):l(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!n}};return p},v.Deferred=function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){f(t,function(t,r){var s=t[0],o=e[r];i[t[1]](l(o)?function(){var e=o.apply(this,arguments);e&&l(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?c(e,r):r}},i={};return r.pipe=r.then,f(t,function(e,s){var o=e[2],u=e[3];r[e[1]]=o.add,u&&o.add(function(){n=u},t[s^1][2].disable,t[2][2].lock),i[e[0]]=o.fire,i[e[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},v.when=function(e){var t=0,n=d(e)==="array"&&arguments.length===1?e:a.call(arguments),r=n.length;d(e)==="array"&&e.length===1&&(e=e[0]);var i=r!==1||e&&l(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?a.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,f,c;if(r>1){u=new Array(r),f=new Array(r),c=new Array(r);for(;t<r;t++)n[t]&&l(n[t].promise)?n[t].promise().done(o(t,c,n)).fail(s.reject).progress(o(t,f,u)):--i}return i||s.resolveWith(c,n),s.promise()},typeof module!="undefined"&&module.exports?module.exports=v:typeof e._!="undefined"?e._.mixin(v):e._=v}(t._internal),t._internal.cookie=function(e){return function(e,n,r){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(n))||n===null||n===undefined)){r=t._internal._.extend({},r);if(n===null||n===undefined)r.expires=-1;if(typeof r.expires=="number"){var i=r.expires,s=r.expires=new Date;s.setDate(s.getDate()+i)}return n=String(n),document.cookie=[encodeURIComponent(e),"=",r.raw?n:encodeURIComponent(n),r.expires?"; expires="+r.expires.toUTCString():"",r.path?"; path="+r.path:"",r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join("")}r=n||{};var o=r.raw?function(e){return e}:decodeURIComponent,u=document.cookie.split("; ");for(var a=0,f;f=u[a]&&u[a].split("=");a++)if(o(f[0])===e)return o(f[1]||"");return null}}(t._internal),function(t){function s(e){n.parentNode?n.parentNode.insertBefore(e,n):r.appendChild(e)}var n=e.getElementsByTagName("script")[0],r=n.parentNode,i=e.getElementsByTagName("head")[0];t.injectJS=s,t.injectCSS=function(e){if(i){i.appendChild(e);return}s(e)}}(t._internal),function(e){function n(t,n,r){var i=e.cookie("BVImpl"+t);if(n.hasOwnProperty(i))return i;var s=Math.random()*r,o=0;for(var u in n)if(n.hasOwnProperty(u)){if(s>=o&&s<o+n[u]){i=u;break}o+=n[u]}return e.cookie("BVImpl"+t,i,{path:"/"}),i}var r=n(t._options.site,t._options.implementations.weights,t._options.implementations.total),i=t.options=t._options.configs[r];e.baseUrl=e.protocol+"//"+i.fqhn+"/static/"+i.clientname+"/"+t._options.site+"/"+i.version+"/"+r+"/"+i.locale}(t._internal),function(n){var r=e.createElement("script"),i=n.loader,s=n.injectCSS,o=n.ie,u=n.baseUrl+"/stylesheets/",a=o&&o>4&&o<9;t.inject=n.customerInject||function(e,t){t.src=e,n.injectJS(t)},t.inject(t._internal.baseUrl+"/scripts/"+i,r),function(){var t=e.createElement("link");t.type="text/css",t.rel="stylesheet",t.href=u+(n.preview?"cleanslate":a?"screen-ie":"screen")+".css",!n.preview&&a&&(n.loadCSS=function(){s(t)}),s(t)}(),function(n){n.each(t.options.externalFeatures,function(r){n.each(r.scripts,function(n){t.inject(n,e.createElement("script"))})})}(t._internal._)}(t._internal),function(){function o(e,t){var n=Array.prototype.slice.call(arguments,2);return function(){var r=n.concat(Array.prototype.slice.call(arguments));return e.apply(t||null,r)}}function u(e,t,n){return this[e](t,n),{off:o(this.off,this,t,n)}}function a(e,t){var n=this.publicHandle={name:e};this.config=t,r(["on","one","once"],function(e){n[e]=o(u,this,e)},this),this.trigger=h}function c(e){var t=new s;return e.push(t.promise()),{allowDefault:function(){t.resolve()},preventDefault:function(){t.reject()}}}function h(e){var t=[];return this.deferDefault=o(c,null,t),this.preventDefault=function(){t.push(l)},this.constructor.prototype.trigger.apply(this,arguments),this.deferDefault=null,this.preventDefault=null,i(t)}var e=t._internal.asEvented,n=t._internal._,r=n.each,i=n.when,s=n.Deferred;e.call(a.prototype);var f=Array.prototype.slice,l=(new s).reject().promise(),p=t.extensions={};e.call(p);var d=o(p.emit,p);delete p.emit,delete p.trigger;var v={};p.register=function(t,n){if(!t)return;if(t in v)return;var r=v[t]=new a(t,n);return setTimeout(o(function(){d("register",r.publicHandle)},this),0),r},p.get=function(t){return v[t]?v[t].publicHandle:null}}(),t._internal.extensionsRegistry=function(){function a(e){var t=e._events={},n=e.publicHandle;return s(["call","invoke","complete"],function(n){t[n]=[],e.on(n,function(e){t[n].push(e)})}),e.getEvents=n.getEvents=function(e){var n=t[e];return n?n.slice():[]},e}var e=t._internal,n=t.extensions;if(!n)return;var r=e._.Deferred,i={},s=e._.each,o=e.asEvented,u={data:function(e){function i(n,i){var s=r();return!i&&t[n]?s.resolve(e.sanitize(t[n])):e.once("data."+n,function(){s.resolve(e.sanitize(t[n]))}),s.promise()}var t=e.history={},n=e.publicHandle;return e.sendData=function(n){var r=n.contentType;if(!r)return;t[r]=n,e.trigger("data."+r)},e.getLast=n.getLast=function(e){return i(e)},e.getNext=n.getNext=function(e){return i(e,!0)},e.sanitize=function(e){return e},e},ui:function(e){return e=a(e),e.publicHandle.init=function(t){e.trigger("call",t)},e},configure:a};s(["ui","configure","data"],function(e){var t=[];n[e]={register:function(r,i){var s=n.register(e+"."+r,i||{}),o=s.publicHandle;u[e]&&(s=u[e](s));try{n[e].trigger("register",o)}catch(a){$BV.log("Failed to register extension in "+e)}return t.push(r),s},get:function(t){return n.get(e+"."+t)},getAll:function(){return t}},o.call(n[e])});var f={global:{},rr:{show_reviews:1,show_category_gallery:0,submit_review:0,submit_comment:0,submit_generic:0,inline_ratings:0},qa:{show_questions:1,show_summary:0,submit_question:0,submit_answer:0},cp:{show_profile:0}};return s(f,function(e,t){i["configure."+t]=n.configure.register(t),s(e,function(e,r){var s=t+"_"+r;i["ui."+s]=n.ui.register(s,{preload:e})})}),i["data.bvapi"]=n.data.register("bvapi"),i}(),function(t){var n=t._internal,r;n.preload=function(i){var s=t.options,o=n._.each,u=n.protocol,a=n.ie;o(s.prefetchConfigs,function(o,f){var l=u+o.url.replace(/___PRODUCTIDTOKEN___/g,i);n.apiHostOverride&&(l=l.replace(n.originalApiHosts[s.displaycode||"default"],s.apiconfig.baseUrl));if(a&&a<9&&l.length>2e3)return;var c="dataHandler"+f,h=n._.Deferred(),p=e.createElement("script");p.src=l+"&callback=BV._internal."+c,o.promise=h.promise();var d=h.resolve;h.resolver=c,h.resolve=function(){c===r&&t.performance.mark("bv-preload-end"),t.performance.mark(h.resolver+"-start"),d.apply(h,Array.prototype.slice.call(arguments)),t.performance.mark(h.resolver+"-end")},s.page.reInject=!0,n[c]=h.resolve,r||(t.performance.mark("bv-preload-start"),r=c),n.injectJS(p)})}}(t),function(e,n){n.$BV=function(){function a(e,t,n){if(!n)return!0;var r=f(e,t,n);return!!(r&&r.config&&r.config.preload)}function f(e,t,n){return i&&i[e+"."+t+(n?"_"+n:"")]}var r=n.$BV||[],i=e.extensionsRegistry,s;e.timing={ui:{}};var o={_apiQueue:[],log:function(){n.console&&n.console.log&&n.console.log(arguments)},push:function(r){var i,s,u=r[0],l=r[1],c;if(u==="ui"||u==="configure")i=u==="ui"?r[3]:r[2],s=u==="ui"?r[2]:null,i&&t._internal.preload&&i.productId&&a(u,l,s)&&(e.preload(i.productId),e.preload=null),c=f(u,l,s);if(u==="ui"){var h=(l+"_"+s).toLowerCase();n.BV.performance.mark(h+"-call"),e.timing=e.timing||{ui:{}},e.timing.ui[h]={init:(new Date).getTime(),config:i}}o._apiQueue.push(r),c&&c.trigger("call",{config:i})}};for(s=0;s<r.length;s++)o.push(r[s]);var u=["ui","configure","container","ready","SI.trackProductPageView","SI.trackGenericPageView","SI.trackTransactionPageView","SI.disable","SI.enable","SI.setDebugEnabled","SI.trackConversion","DSI.trackBVPageView","DSI.trackProduct","DSI.trackTransaction"];for(s=u.length-1;s>=0;--s)(function(t,n,r){var i=n.split("."),s=i.pop();while(r=i.shift())t=t[r]=t[r]||{};t[s]=function(t){return function(){var n=[t].concat(Array.prototype.slice.call(arguments));if(t==="ui"){var r=n[3]=n[3]||{};return r.loadedDeferred=r.loadedDeferred||e._.Deferred(),o.push(n),r.loadedDeferred.promise()}return o.push(n)}}(n.replace(/\./g,"_"))})(o,u[s]);return o}()}(t._internal,window),t.performance.mark("scoutEnd")})(document)}catch(e){window&&window.console&&window.console.log&&(console.log(e.stack),window.console.log("Error Loading Bazaarvoice",e))};