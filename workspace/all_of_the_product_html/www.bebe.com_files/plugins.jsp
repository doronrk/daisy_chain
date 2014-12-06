
    /* jquery.imagesloaded.js or jquery.imagesloaded.min.js */
    ;/*!
 * imagesLoaded PACKAGED v3.1.7
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function c(e){this.img=e}function f(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var c=r[o];this.addImage(c)}}},s.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),c.prototype=new t,c.prototype.check=function(){var e=v[this.img.src]||new f(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},c.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return f.prototype=new t,f.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},f.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},f.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},f.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},f.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},f.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

    /* jquery-formatDateTime.js or jquery-formatDateTime.min.js */
    ;;(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else{factory(window.jQuery||window.$)}}(function($){var defaults={monthNames:['January','February','March','April','May','June','July','August','September','October','November','December'],monthNamesShort:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],dayNamesShort:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],ampmNames:['AM','PM'],attribute:'data-datetime',formatAttribute:'data-dateformat'};var ticksTo1970=(((1970-1)*365+Math.floor(1970/4)-Math.floor(1970/100)+Math.floor(1970/400))*24*60*60*10000000);var formatDateTime=function(format,date,settings){var output='';var literal=false;var iFormat=0;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var formatNumber=function(match,value,len){var num=''+value;if(lookAhead(match)){while(num.length<len){num='0'+num}}return num};var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])};for(iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{output+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case'a':output+=date.getHours()<12?settings.ampmNames[0]:settings.ampmNames[1];break;case'd':output+=formatNumber('d',date.getDate(),2);break;case'D':output+=formatName('D',date.getDay(),settings.dayNamesShort,settings.dayNames);break;case'o':var end=new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime();var start=new Date(date.getFullYear(),0,0).getTime();output+=formatNumber('o',Math.round((end-start)/86400000),3);break;case'g':var hour=date.getHours()%12;output+=formatNumber('g',(hour===0?12:hour),2);break;case'h':output+=formatNumber('h',date.getHours(),2);break;case'u':output+=formatNumber('u',date.getMilliseconds(),3);break;case'i':output+=formatNumber('i',date.getMinutes(),2);break;case'm':output+=formatNumber('m',date.getMonth()+1,2);break;case'M':output+=formatName('M',date.getMonth(),settings.monthNamesShort,settings.monthNames);break;case's':output+=formatNumber('s',date.getSeconds(),2);break;case'y':output+=(lookAhead('y')?date.getFullYear():(date.getYear()%100<10?'0':'')+date.getYear()%100);break;case'@':output+=date.getTime();break;case'!':output+=date.getTime()*10000+ticksTo1970;break;case"'":if(lookAhead("'")){output+="'"}else{literal=true}break;default:output+=format.charAt(iFormat)}}}return output};$.fn.formatDateTime=function(format,settings){settings=$.extend({},defaults,settings);var date=$(this).attr(settings.attribute);format=format||$(this).attr(settings.formatAttribute);if(typeof date==='undefined'||date===false){date=$(this).text()}if(date===''){$(this).text('')}else{$(this).text(formatDateTime(format,new Date(date),settings))}return this};$.formatDateTime=function(format,date,settings){settings=$.extend({},defaults,settings);if(!date){return''}return formatDateTime(format,date,settings)}}));


    /* jquery.colorbox.js or jquery.colorbox.min.js */
	;/*!
	Colorbox v1.5.9 - 2014-04-25
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(z+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in x[0]&&!x[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),x.focus())}function c(t){c.str!==t&&(x.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){z=0,e&&e!==!1?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),z=W.index(_.el),-1===z&&(W=W.add(_.el),z=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data("colorbox"),_=new r(i,o),g(_.get("rel")),!$){$=q=!0,c(_.get("className")),x.css({visibility:"hidden",display:"block",opacity:""}),L=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(L),D=T.height()+k.height()+b.outerHeight(!0)-b.height(),j=C.width()+H.width()+b.outerWidth(!0)-b.width(),A=L.outerHeight(!0),N=L.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=(l!==!1?Math.min(h,a(l,"x")):h)-N-j,_.h=(f!==!1?Math.min(s,a(f,"y")):s)-A-D,L.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(I).hide(),x.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}v.css({opacity:parseFloat(_.get("opacity"))||"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){!x&&e.body&&(V=!1,E=t(i),x=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),S=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),y=n(se,"Wrapper"),b=n(se,"Content").append(I=n(se,"Title"),R=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),F=n("button","Slideshow"),S),B=t('<button type="button"/>').attr({id:Z+"Close"}),y.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(R).add(F),t(e.body).append(v,x.append(y,M)))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return x?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;$&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),$&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if(q=!0,U=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-A-D:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-N-j:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-N-j,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-A-D,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){S.show()},100),_.get("inline")){var c=t(e);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),U=new Image,t(U).addClass(Z+"Photo").bind("error",function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;t.each(["alt","longdesc","aria-describedby"],function(e,i){var n=t(_.el).attr(i)||t(_.el).attr("data-"+i);n&&U.setAttribute(i,n)}),_.get("retinaImage")&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){U.height-=U.height*e,U.width-=U.width*e},_.mw&&U.width>_.mw&&(e=(U.width-_.mw)/U.width,o()),_.mh&&U.height>_.mh&&(e=(U.height-_.mh)/U.height,o())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),W[1]&&(_.get("loop")||W[z+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",h(U)},1)}),U.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,x,y,b,T,C,H,k,W,E,L,M,S,I,R,F,K,P,B,O,_,D,j,A,N,z,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[z+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){F.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),x.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),F.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),x.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,F.hide(),t(),ae.unbind(ne,e).unbind(ie,t),x.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),F.show())}}();t.colorbox||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;if(e=e||{},t.isFunction(o))o=t("<a/>"),e.open=!0;else if(!o[0])return o;return o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(x[0].style.width,10)-j+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(x[0].style.height,10)-D+"px"}var r,h,s,l=0,d=0,c=x.offset();if(E.unbind("resize."+Z),x.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,x.css({position:"fixed"})):(l=h,d=s,x.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-N-j-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-N-j,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-A-D-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-A-D,0)/2),x.css({top:c.top,left:c.left,visibility:"visible"}),y[0].style.width=y[0].style.height="9999px",r={width:_.w+N+j,height:_.h+A+D,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||x.css(r),x.dequeue().animate(r,{duration:e||0,complete:function(){n(),q=!1,y[0].style.width=_.w+N+j+"px",y[0].style.height=_.h+A+D+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),i&&i()},step:n})},J.resize=function(t){var e;$&&(t=t||{},t.width&&(_.w=a(t.width,"x")-N-j),t.innerWidth&&(_.w=a(t.innerWidth,"x")),L.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-A-D),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=L.scrollTop(),L.css({height:"auto"}),_.h=L.height()),L.css({height:_.h}),e&&L.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||L.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||L.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var d,g="none"===_.get("transition")?0:_.get("speed");L.remove(),L=n(se,"LoadedContent").append(i),L.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(U).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&x[0].style.removeAttribute("filter")}var n,o,a=W.length;$&&(o=function(){clearTimeout(Q),S.hide(),u(ne),_.get("onComplete")},I.html(_.get("title")).show(),L.show(),a>1?("string"==typeof _.get("current")&&R.html(_.get("current").replace("{current}",z+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>z?"show":"hide"]().html(_.get("next")),P[_.get("loop")||z?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=e.createElement("iframe"),"frameBorder"in n&&(n.frameBorder=0),"allowTransparency"in n&&(n.allowTransparency="true"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0}).one("load",o).appendTo(L),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?x.fadeTo(g,1,i):i())},"fade"===_.get("transition")?x.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!q&&W[1]&&(_.get("loop")||W[z+1])&&(z=h(1),f(W[z]))},J.prev=function(){!q&&W[1]&&(_.get("loop")||z)&&(z=h(-1),f(W[z]))},J.close=function(){$&&!G&&(G=!0,$=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),x.stop().fadeTo(_.get("fadeOut")||0,0,function(){x.hide(),v.hide(),u(he),L.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){x&&(x.stop(),t.colorbox.close(),x.stop().remove(),v.remove(),G=!1,x=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);

    /* jquery.rwdImageMaps.js or jquery.rwdImageMaps.min.js */
    ;/*
* rwdImageMaps jQuery plugin v1.5
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2013 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*/
;(function(a){a.fn.rwdImageMaps=function(){var c=this;var b=function(){c.each(function(){if(typeof(a(this).attr("usemap"))=="undefined"){return}var e=this,d=a(e);a("<img />").load(function(){var g="width",m="height",n=d.attr(g),j=d.attr(m);if(!n||!j){var o=new Image();o.src=d.attr("src");if(!n){n=o.width}if(!j){j=o.height}}var f=d.width()/100,k=d.height()/100,i=d.attr("usemap").replace("#",""),l="coords";a('map[name="'+i+'"]').find("area").each(function(){var r=a(this);if(!r.data(l)){r.data(l,r.attr(l))}var q=r.data(l).split(","),p=new Array(q.length);for(var h=0;h<p.length;++h){if(h%2===0){p[h]=parseInt(((q[h]/n)*100)*f)}else{p[h]=parseInt(((q[h]/j)*100)*k)}}r.attr(l,p.toString())})}).attr("src",d.attr("src"))})};a(window).resize(b).trigger("resize");return this}})(jQuery);

    /* jquery.hoverintent.js or jquery.hoverintent.min.js */
	;/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

    /* owl.carousel.js or owl.carousel.min.js */
	;"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);

    /* jquery.moodular.js or jquery.moodular.min.js */
    ;/**
 * Moodular v4.1
 * A responsive, touch compatible, evolutive, modular, jQuery carrousel.
 * http://www.gougouzian.fr/projects/jquery/moodular/
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */


!function($){
'use strict';
var Moodular=function(content,opts,ctrls,fxs){
this.opts=opts;
this.ctrls=ctrls;
this.fxs=fxs;
this.$element=$(content);
this.current=0;
this.next=-1;
this.items=$('>'+this.opts.selector,this.$element);
this.nbItems=this.items.length;
this.init();
};
Moodular.prototype={
init:function(){
this.$element.css('position','relative');
this.items.css({
position:'absolute',
top:0,
left:0
});
var that=this;
this.$element.on('moodular.prev',function(){
if(that.next==-1){
that.next=that.current-that.opts.step;
if(that.next<0)
that.next+=that.nbItems;
}
}).on('moodular.next',function(){
if(that.next==-1)
that.next=(that.current+that.opts.step)%that.nbItems;
}).on('moodular.prev moodular.next',function(){
that.stop();
that.items.removeClass('active').eq(that.next).addClass('active');
});
var fxs=this.opts.effects.split(' ');
for(var i in fxs)
if($.isFunction(this.fxs[fxs[i]]))
this.fxs[fxs[i]](this);
var ctrls=this.opts.controls.split(' ');
for(var i in ctrls)
if($.isFunction(this.ctrls[ctrls[i]]))
this.ctrls[ctrls[i]](this);
this.$element.on('moodular.prev moodular.next',function(){
that.current=that.next;
that.next=-1;
that.start();
});
this.items.eq(0).addClass('active');
this.start();
},
start:function(){
var that=this;
if(this.opts.timer)
this.timer=setTimeout(function(){
that.$element.trigger('moodular.next');
},this.opts.timer);
},
stop:function(){
clearTimeout(this.timer);
},
moveTo:function(to){
var n=to%this.nbItems;
if(n!=this.current){
this.next=n;
this.$element.trigger('moodular.next');
}
}
};
$.fn.moodular=function(option,param){
return this.each(function(){
var $this=$(this),
data=$this.data('moodular'),
opts=$.extend({},$.fn.moodular.defaults,$this.data(),typeof option=='object'&&option),
ctrls=$.extend({},$.fn.moodular.controls),
fxs=$.extend({},$.fn.moodular.effects);
if(!data)
$this.data('moodular',(data=new Moodular(this,opts,ctrls,fxs)));
if(typeof option=='string')
data[option](param);
})
};
$.fn.moodular.defaults={
speed:500,
timer:0,
step:1,
effects:'',
controls:'',
easing:'',
selector:'li',
queue:false
};
$.fn.moodular.controls={};
$.fn.moodular.effects={}
}(window.jQuery);
!function($){$.extend($.fn.moodular.effects,{
animate:function(m){
var a=function(k){
var n=$("[data-mood]",m.items.eq(k));
n.css("margin",0).each(function(){
var $t=$(this),b=$t.data("mood-animation"),ml,mt;
if(b.effects.indexOf("left")>=0)
ml="100%";
if(b.effects.indexOf("right")>=0)
ml="-100%";
if(b.effects.indexOf("top")>=0)
mt="100%";
if(b.effects.indexOf("bottom")>=0)
mt="-100%";
var p=$t.data("mood-ghost").position();
$t.stop().show().css({
left:p.left,
top:p.top,
opacity:b.effects.indexOf("fade")>=0?0:1,
"margin-left":ml,
"margin-top":mt
}).data("mood-ghost").css("visibility","hidden");
clearTimeout($t.data("mood-timer"));
$t.data("mood-timer",setTimeout(function(){
$t.animate({
margin:0,
opacity:1
},m.opts.speed*b.speed,b.easing,function(){
$t.hide();
$t.data("mood-ghost").css("visibility","visible");
});
},b.delay));
})
};
$("[data-mood]",m.$element).each(function(){
var $t=$(this),$c=$t.clone(),to=$t.position(),b=$t.data("mood").split(";"),c={};
$t.removeAttr("data-mood");
for(var i in b){
var d=b[i].split(":");
c[$.trim(d[0])]=$.trim(d[1]);
}
if(typeof c.speed==="undefined")
c.speed=1;
if(c.speed<=0)
c.speed=1;
if(typeof c.effects==="undefined")
c.effects="left";
if(typeof c.easing==="undefined")
c.easing="";
if(typeof c.delay==="undefined")
c.delay=0;
$c.css({
position:"absolute",
margin:0
}).data({
"mood-animation":c,
"mood-ghost":$t,
"mood-timer":null
});
$t.parent().append($c);
});
a(m.current);
m.$element.on("moodular.prev moodular.next",function(){
a(m.next);
});
},
bottom:function(m){
if(typeof m.opts.view==="undefined")
m.opts.view=1;
var percent=100/m.opts.view;
m.items.css('top','100%').height(percent+'%')
for(var i=0;i<(m.opts.view+m.opts.step);i++)
m.items.eq(i).css('top',100-(i+1)*percent+'%');
var s='='+percent*m.opts.step+'%';
m.$element.on('moodular.next',function(){
if(m.opts.view==1){
m.items.eq(m.current).css('top',0).animate({
'top':'+'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('top','100%');
}
});
m.items.eq(m.next).css('top','-100%').animate({
'top':0
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}else if(m.opts.view<m.nbItems)
for(var i=(0-m.opts.step);i<(m.opts.view+m.opts.step);i++)
m.items.eq((m.current+i)%m.nbItems).css('top',100-(i+1)*percent+'%').animate({
'top':'+'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}).on('moodular.prev',function(){
if(m.opts.view==1){
m.items.eq(m.current).css('top',0).animate({
'top':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('top','-100%');
}
});
m.items.eq(m.next).css('top','100%').animate({
'top':0
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}else if(m.opts.view<m.nbItems){
for(var i=0;i<m.opts.view;i++)
m.items.eq((m.current+i)%m.nbItems).css('top',100-(i+1)*percent+'%').animate({
'top':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
for(var i=1;i<=m.opts.step;i++)
m.items.eq((m.current-i)%m.nbItems).css('top',100+(i-1)*percent+'%').animate({
'top':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}
})
},
fade:function(m){
m.items.css({
opacity:0,
'z-index':1
});
if(typeof m.opts.view==="undefined")
m.opts.view=1;
for(var i=0;i<m.opts.view;i++)
m.items.eq(i).css({
opacity:1,
'z-index':2
})
m.$element.on('moodular.prev moodular.next',function(){
for(var i=0;i<m.opts.view;i++)
m.items.eq((m.current+i)%m.nbItems).animate({
opacity:0
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('z-index',1);
}
});
for(var i=0;i<m.opts.view;i++)
m.items.eq((m.next+i)%m.nbItems).animate({
opacity:1
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('z-index',2);
}
});
})
},
left:function(m){
if(typeof m.opts.view==="undefined")
m.opts.view=1;
var percent=100/m.opts.view;
m.items.css('left','100%').width(percent+'%')
for(var i=0;i<(m.opts.view+m.opts.step);i++)
m.items.eq(i).css('left',i*percent+'%');
var s='='+percent*m.opts.step+'%';
var a={
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
};
m.$element.on('moodular.next',function(){
if(m.opts.view==1){
m.items.eq(m.current).css('left',0).animate({
'left':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('left','-100%');
}
});
m.items.eq(m.next).css('left','100%').animate({
'left':0
},a);
}else if(m.opts.view<m.nbItems)
for(var i=0;i<(m.opts.view+m.opts.step);i++)
m.items.eq((m.current+i)%m.nbItems).css('left',i*percent+'%').animate({
'left':'-'+s
},a);
}).on('moodular.prev',function(){
if(m.opts.view==1){
m.items.eq(m.current).css('left',0).animate({
'left':'+'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('left','100%');
}
});
m.items.eq(m.next).css('left','-100%').animate({
'left':0
},a);
}else if(m.opts.view<m.nbItems){
for(var i=0;i<m.opts.view;i++)
m.items.eq((m.current+i)%m.nbItems).css('left',i*percent+'%').animate({
'left':'+'+s
},a);
for(var i=1;i<=m.opts.step;i++)
m.items.eq((m.current-i)%m.nbItems).css('left',-i*percent+'%').animate({
'left':'+'+s
},a);
}
})
},
mosaic:function(m){
if(typeof m.opts.slices==="undefined")
m.opts.slices=[6,6];
if(typeof m.opts.mode==="undefined")
m.opts.mode='random';
m.items.hide().eq(0).show();
var h=m.opts.slices[1],
v=m.opts.slices[0],
_w=m.$element.width(),
_h=m.$element.height(),
W=_w/v,
H=_h/h;
m.$element.on('moodular.prev moodular.next',function(){
$('#mosaic_wrapper',m.$element).remove();
m.items.hide().eq(m.next).show().css('z-index',1);
var C=m.items.eq(m.current).html();
c='';
for(var i=0;i<v;i++)
for(var j=0;j<h;j++)
c+='<div style="position:absolute;left:'+(i*W)+'px;top:'+(j*H)+'px;width:'+W+'px;height:'+H+'px;overflow:hidden;"><div style="margin-left:-'+(i*W)+'px;margin-top:-'+(j*H)+'px;width:'+_w+'px;height:'+_h+'px">'+C+'</div></div>';
m.$element.prepend('<'+m.opts.selector+' id="mosaic_wrapper" style="z-index:2;position:absolute;">'+c+'</div>');
$('#mosaic_wrapper>div',m.$element).css('opacity',1).each(function(k){
var $this=$(this);
var n=h*v,
r;
if(m.opts.mode=='random')
r=m.opts.speed*0.5*Math.ceil(Math.random()*(n-1))/n;
else if(m.opts.mode=='crawler')
r=m.opts.speed*0.5*k/n;
setTimeout(function(){
$this.animate({
opacity:0
},r,m.opts.easing);
},r);
});
clearTimeout(m.mTimer);
m.mTimer=setTimeout(function(){
$('#mosaic_wrapper',m.$element).remove();
},m.opts.speed);
})
},
resize:function(m){
if(typeof m.opts.ratio==='undefined')
m.opts.ratio=0;
if(m.opts.ratio)
$(window).on('resize',function(){
m.$element.height(parseInt(m.$element.width())/m.opts.ratio)
})
},
right:function(m){
if(typeof m.opts.view==="undefined")
m.opts.view=1;
var percent=100/m.opts.view;
m.items.css('left','100%').width(percent+'%')
for(var i=0;i<(m.opts.view+m.opts.step);i++)
m.items.eq(i).css('left',100-(i+1)*percent+'%');
var s='='+percent*m.opts.step+'%';
m.$element.on('moodular.next',function(){
if(m.opts.view==1){
m.items.eq(m.current).css('left',0).animate({
'left':'+'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('left','100%');
}
});
m.items.eq(m.next).css('left','-100%').animate({
'left':0
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}else if(m.opts.view<m.nbItems)
for(var i=(0-m.opts.step);i<(m.opts.view+m.opts.step);i++)
m.items.eq((m.current+i)%m.nbItems).css('left',100-(i+1)*percent+'%').animate({
'left':'+'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}).on('moodular.prev',function(){
if(m.opts.view==1){
m.items.eq(m.current).css('left',0).animate({
'left':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('left','-100%');
}
});
m.items.eq(m.next).css('left','100%').animate({
'left':0
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}else if(m.opts.view<m.nbItems){
for(var i=0;i<m.opts.view;i++)
m.items.eq((m.current+i)%m.nbItems).css('left',100-(i+1)*percent+'%').animate({
'left':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
for(var i=1;i<=m.opts.step;i++)
m.items.eq((m.current-i)%m.nbItems).css('left',100+(i-1)*percent+'%').animate({
'left':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}
})
},
slide:function(m){
if(typeof m.opts.direction==="undefined")
m.opts.direction='left';
m.items.css('z-index',1).eq(0).css('z-index',2);
var a={};
if(m.opts.direction=='top')
a['top']='-100%';
else if(m.opts.direction=='bottom')
a['top']='100%';
else if(m.opts.direction=='right')
a['left']='100%';
else
a['left']='-100%';
m.$element.on('moodular.next',function(){
m.items.eq(m.next).css('z-index',2);
m.items.eq(m.current).css('z-index',3).animate(a,{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css({
'z-index':1,
left:0,
top:0
});
}
});
});
m.$element.on('moodular.prev',function(){
m.items.css('z-index',1);
m.items.eq(m.current).css('z-index',2);
m.items.eq(m.next).css('z-index',3).css(a).animate({
left:0,
top:0
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
m.items.css('z-index',1);
$(this).css('z-index',2);
}
});
});
},
stripes:function(m){
if(typeof m.opts.stripes==="undefined")
m.opts.stripes=1;
if(typeof m.opts.orientation==="undefined")
m.opts.orientation='vertical';
m.items.hide().eq(0).show();
var ns=m.opts.stripes,
_w='width',
_h='height',
o=m.opts.orientation=='vertical'?_w:_h,
__o=o==_w,
_o=__o?_h:_w,
d=__o?'left':'top',
_d=__o?'top':'left',
s=parseInt(m.$element.css(o)),
_s=parseInt(m.$element.css(_o)),
S=s/ns;
m.$element.on('moodular.prev moodular.next',function(){
$('#stripes_wrapper',m.$element).remove();
m.items.hide().eq(m.next).show().css('z-index',1);
var C=m.items.eq(m.current).html();
c='';
for(var i=0;i<ns;i++)
c+='<div style="position:absolute;'+d+':'+(i*S)+'px;'+_d+':'+'0;'+o+':'+S+'px;'+_o+':'+_s+'px;overflow:hidden;"><div style="margin-'+d+':-'+(i*S)+'px;'+o+':'+s+'px;'+_o+':'+_s+'px">'+C+'</div></div>';
m.$element.prepend('<'+m.opts.selector+' id="stripes_wrapper" style="z-index:2;position:absolute;">'+c+'</div>');
$('#stripes_wrapper>div',m.$element).each(function(i){
var a={};
a[_d]=i%2?'100%':'-100%';
$(this).animate(a,m.opts.speed*0.75,m.opts.easing);
});
clearTimeout(m.mTimer);
m.mTimer=setTimeout(function(){
$('#stripes_wrapper',m.$element).remove();
},m.opts.speed);
})
},
top:function(m){
if(typeof m.opts.view==="undefined")
m.opts.view=1;
var percent=100/m.opts.view;
m.items.css('top','100%').height(percent+'%')
for(var i=0;i<(m.opts.view+m.opts.step);i++)
m.items.eq(i).css('top',i*percent+'%');
var s='='+percent*m.opts.step+'%';
m.$element.on('moodular.next',function(){
if(m.opts.view==1){
m.items.eq(m.current).css('top',0).animate({
'top':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('top','-100%');
}
});
m.items.eq(m.next).css('top','100%').animate({
'top':0
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}else if(m.opts.view<m.nbItems)
for(var i=0;i<(m.opts.view+m.opts.step);i++)
m.items.eq((m.current+i)%m.nbItems).css('top',i*percent+'%').animate({
'top':'-'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}).on('moodular.prev',function(){
if(m.opts.view==1){
m.items.eq(m.current).css('top',0).animate({
'top':'+'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue,
complete:function(){
$(this).css('top','100%');
}
});
m.items.eq(m.next).css('top','-100%').animate({
'top':0
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}else if(m.opts.view<m.nbItems){
for(var i=0;i<m.opts.view;i++)
m.items.eq((m.current+i)%m.nbItems).css('top',i*percent+'%').animate({
'top':'+'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
for(var i=1;i<=m.opts.step;i++)
m.items.eq((m.current-i)%m.nbItems).css('top',-i*percent+'%').animate({
'top':'+'+s
},{
duration:m.opts.speed,
easing:m.opts.easing,
queue:m.opts.queue
});
}
})
}
})}(window.jQuery);
!function($){$.extend($.fn.moodular.controls,{
buttons:function(m){
if(typeof m.opts.view==="undefined")
m.opts.view=1;
if(m.nbItems<=m.opts.view){
m.opts.buttonPrev.hide();
m.opts.buttonNext.hide();
}
m.opts.buttonPrev.on('click',function(){
m.$element.trigger('moodular.prev');
return false;
});
m.opts.buttonNext.on('click',function(){
m.$element.trigger('moodular.next');
return false;
});
},
keys:function(m){
if(typeof m.opts.keyPrev==="undefined")
m.opts.keyPrev=37;
if(typeof m.opts.keyNext==="undefined")
m.opts.keyNext=39;
$(document).on('keydown',function(event){
if(event.keyCode==m.opts.keyPrev){
m.$element.trigger('moodular.prev');
return false;
}else if(event.keyCode==m.opts.keyNext){
m.$element.trigger('moodular.next');
return false;
}
});
},
nav:function(m){
if(typeof m.opts.navView==="undefined")
m.opts.navView=m.nbItems;
if(typeof m.opts.navEffects==="undefined")
m.opts.navEffects="";
if(typeof m.opts.navControls==="undefined")
m.opts.navControls="";
if(typeof m.opts.navButtonPrev==="undefined")
m.opts.navButtonPrev="";
if(typeof m.opts.navButtonNext==="undefined")
m.opts.navButtonNext="";
if(typeof m.opts.navSelector==="undefined")
m.opts.navSelector="li";
m.opts.navWrapper.moodular({
timer:m.opts.timer,
view:m.opts.navView,
effects:m.opts.navEffects,
controls:m.opts.navControls,
buttonPrev:m.opts.navButtonPrev,
buttonNext:m.opts.navButtonNext,
speed:m.opts.speed
});
m.opts.timer=0;
var n=m.opts.navWrapper.data('moodular');
n.$element.on('moodular.next',function(){
m.next=n.current;
m.$element.trigger('moodular.next');
}).on('moodular.prev',function(){
m.next=n.current;
m.$element.trigger('moodular.prev');
});
$(m.opts.navSelector,m.opts.navWrapper).each(function(i){
$(this).data('index',i);
}).on('mouseenter',function(){
n._current=n.current;
n.stop();
$('>li',m.opts.navWrapper).removeClass('active');
$(this).addClass('active');
m.next=$(this).data('index');
var _speed=m.opts.speed;
m.opts.speed=0;
m.$element.trigger('moodular.next');
m.opts.speed=_speed;
}).on('mouseleave',function(){
n.current=n._current;
n.next=-1;
n.start();
});
},
pagination:function(m){
var lis='';
for(var i=0;i<m.nbItems;i++)
lis+='<li><a href="#" data-index="'+i+'">'+(i+1)+'</a></li>';
m.opts.pagination.append(lis);
$('>li>a',m.opts.pagination).on('click',function(){
if(!$(this).parent().hasClass('active'))
m.moveTo($(this).data('index'));
return false;
});
$('>li',m.opts.pagination).eq(0).addClass('active')
m.$element.on('moodular.prev moodular.next',function(){
$('>li',m.opts.pagination).removeClass('active').eq(m.next).addClass('active');
})
},
startOnMouseOver:function(m){
var timer=m.opts.timer,mouseon=false;
m.opts.timer=0;
m.$element.on('mouseenter',function(){
if(!mouseon){
m.opts.timer=timer;
mouseon=true;
m.$element.trigger('moodular.next');
}
}).on('mouseleave',function(){
m.opts.timer=0;
mouseon=false;
m.stop();
});
},
stopOnMouseOver:function(m){
m.$element.on('mouseenter',function(){
m.stop();
}).on('mouseleave',function(){
m.start();
});
},
touch:function(m){
var touchb=null,
touche=null;
m.$element.on('touchstart',function(event){
var e=event.originalEvent;
touchb=e.targetTouches[0].pageX;
}).on('touchmove',function(event){
event.preventDefault();
var e=event.originalEvent;
touche=e.targetTouches[0].pageX;
}).on('touchend',function(){
if(touchb>touche)m.$element.trigger('moodular.next');
else if(touchb<touche)m.$element.trigger('moodular.prev');
touchb=null;
touche=null;
return false;
});
}
})}(window.jQuery);


    /* jquery.jscrollpane.js or jquery.jscrollpane.min.js */
	;/*!
 * jScrollPane - v2.0.17 - 2013-08-17
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2013 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function(a,b,c){a.fn.jScrollPane=function(d){function e(d,e){function f(b){var e,h,j,l,m,n,q=!1,r=!1;if(P=b,Q===c)m=d.scrollTop(),n=d.scrollLeft(),d.css({overflow:"hidden",padding:0}),R=d.innerWidth()+tb,S=d.innerHeight(),d.width(R),Q=a('<div class="jspPane" />').css("padding",sb).append(d.children()),T=a('<div class="jspContainer" />').css({width:R+"px",height:S+"px"}).append(Q).appendTo(d);else{if(d.css("width",""),q=P.stickToBottom&&C(),r=P.stickToRight&&D(),l=d.innerWidth()+tb!=R||d.outerHeight()!=S,l&&(R=d.innerWidth()+tb,S=d.innerHeight(),T.css({width:R+"px",height:S+"px"})),!l&&ub==U&&Q.outerHeight()==V)return d.width(R),void 0;ub=U,Q.css("width",""),d.width(R),T.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Q.css("overflow","auto"),U=b.contentWidth?b.contentWidth:Q[0].scrollWidth,V=Q[0].scrollHeight,Q.css("overflow",""),W=U/R,X=V/S,Y=X>1,Z=W>1,Z||Y?(d.addClass("jspScrollable"),e=P.maintainPosition&&(ab||db),e&&(h=A(),j=B()),g(),i(),k(),e&&(y(r?U-R:h,!1),x(q?V-S:j,!1)),H(),E(),N(),P.enableKeyboardNavigation&&J(),P.clickOnTrack&&o(),L(),P.hijackInternalLinks&&M()):(d.removeClass("jspScrollable"),Q.css({top:0,left:0,width:T.width()-tb}),F(),I(),K(),p()),P.autoReinitialise&&!rb?rb=setInterval(function(){f(P)},P.autoReinitialiseDelay):!P.autoReinitialise&&rb&&clearInterval(rb),m&&d.scrollTop(0)&&x(m,!1),n&&d.scrollLeft(0)&&y(n,!1),d.trigger("jsp-initialised",[Z||Y])}function g(){Y&&(T.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),eb=T.find(">.jspVerticalBar"),fb=eb.find(">.jspTrack"),$=fb.find(">.jspDrag"),P.showArrows&&(jb=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",m(0,-1)).bind("click.jsp",G),kb=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",m(0,1)).bind("click.jsp",G),P.arrowScrollOnHover&&(jb.bind("mouseover.jsp",m(0,-1,jb)),kb.bind("mouseover.jsp",m(0,1,kb))),l(fb,P.verticalArrowPositions,jb,kb)),hb=S,T.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){hb-=a(this).outerHeight()}),$.hover(function(){$.addClass("jspHover")},function(){$.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),$.addClass("jspActive");var c=b.pageY-$.position().top;return a("html").bind("mousemove.jsp",function(a){r(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),h())}function h(){fb.height(hb+"px"),ab=0,gb=P.verticalGutter+fb.outerWidth(),Q.width(R-gb-tb);try{0===eb.position().left&&Q.css("margin-left",gb+"px")}catch(a){}}function i(){Z&&(T.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),lb=T.find(">.jspHorizontalBar"),mb=lb.find(">.jspTrack"),bb=mb.find(">.jspDrag"),P.showArrows&&(pb=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",m(-1,0)).bind("click.jsp",G),qb=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",m(1,0)).bind("click.jsp",G),P.arrowScrollOnHover&&(pb.bind("mouseover.jsp",m(-1,0,pb)),qb.bind("mouseover.jsp",m(1,0,qb))),l(mb,P.horizontalArrowPositions,pb,qb)),bb.hover(function(){bb.addClass("jspHover")},function(){bb.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),bb.addClass("jspActive");var c=b.pageX-bb.position().left;return a("html").bind("mousemove.jsp",function(a){t(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),nb=T.innerWidth(),j())}function j(){T.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){nb-=a(this).outerWidth()}),mb.width(nb+"px"),db=0}function k(){if(Z&&Y){var b=mb.outerHeight(),c=fb.outerWidth();hb-=b,a(lb).find(">.jspCap:visible,>.jspArrow").each(function(){nb+=a(this).outerWidth()}),nb-=c,S-=c,R-=b,mb.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),h(),j()}Z&&Q.width(T.outerWidth()-tb+"px"),V=Q.outerHeight(),X=V/S,Z&&(ob=Math.ceil(1/W*nb),ob>P.horizontalDragMaxWidth?ob=P.horizontalDragMaxWidth:ob<P.horizontalDragMinWidth&&(ob=P.horizontalDragMinWidth),bb.width(ob+"px"),cb=nb-ob,u(db)),Y&&(ib=Math.ceil(1/X*hb),ib>P.verticalDragMaxHeight?ib=P.verticalDragMaxHeight:ib<P.verticalDragMinHeight&&(ib=P.verticalDragMinHeight),$.height(ib+"px"),_=hb-ib,s(ab))}function l(a,b,c,d){var e,f="before",g="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==f?g=b:b==g&&(f=b,e=c,c=d,d=e),a[f](c)[g](d)}function m(a,b,c){return function(){return n(a,b,this,c),this.blur(),!1}}function n(b,c,d,e){d=a(d).addClass("jspActive");var f,g,h=!0,i=function(){0!==b&&vb.scrollByX(b*P.arrowButtonSpeed),0!==c&&vb.scrollByY(c*P.arrowButtonSpeed),g=setTimeout(i,h?P.initialDelay:P.arrowRepeatFreq),h=!1};i(),f=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(f,function(){d.removeClass("jspActive"),g&&clearTimeout(g),g=null,e.unbind(f)})}function o(){p(),Y&&fb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageY-f.top-ab,h=!0,i=function(){var a=e.offset(),c=b.pageY-a.top-ib/2,f=S*P.scrollPagePercent,k=_*f/(V-S);if(0>g)ab-k>c?vb.scrollByY(-f):r(c);else{if(!(g>0))return j(),void 0;c>ab+k?vb.scrollByY(f):r(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}}),Z&&mb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageX-f.left-db,h=!0,i=function(){var a=e.offset(),c=b.pageX-a.left-ob/2,f=R*P.scrollPagePercent,k=cb*f/(U-R);if(0>g)db-k>c?vb.scrollByX(-f):t(c);else{if(!(g>0))return j(),void 0;c>db+k?vb.scrollByX(f):t(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}})}function p(){mb&&mb.unbind("mousedown.jsp"),fb&&fb.unbind("mousedown.jsp")}function q(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),$&&$.removeClass("jspActive"),bb&&bb.removeClass("jspActive")}function r(a,b){Y&&(0>a?a=0:a>_&&(a=_),b===c&&(b=P.animateScroll),b?vb.animate($,"top",a,s):($.css("top",a),s(a)))}function s(a){a===c&&(a=$.position().top),T.scrollTop(0),ab=a;var b=0===ab,e=ab==_,f=a/_,g=-f*(V-S);(wb!=b||yb!=e)&&(wb=b,yb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),v(b,e),Q.css("top",g),d.trigger("jsp-scroll-y",[-g,b,e]).trigger("scroll")}function t(a,b){Z&&(0>a?a=0:a>cb&&(a=cb),b===c&&(b=P.animateScroll),b?vb.animate(bb,"left",a,u):(bb.css("left",a),u(a)))}function u(a){a===c&&(a=bb.position().left),T.scrollTop(0),db=a;var b=0===db,e=db==cb,f=a/cb,g=-f*(U-R);(xb!=b||zb!=e)&&(xb=b,zb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),w(b,e),Q.css("left",g),d.trigger("jsp-scroll-x",[-g,b,e]).trigger("scroll")}function v(a,b){P.showArrows&&(jb[a?"addClass":"removeClass"]("jspDisabled"),kb[b?"addClass":"removeClass"]("jspDisabled"))}function w(a,b){P.showArrows&&(pb[a?"addClass":"removeClass"]("jspDisabled"),qb[b?"addClass":"removeClass"]("jspDisabled"))}function x(a,b){var c=a/(V-S);r(c*_,b)}function y(a,b){var c=a/(U-R);t(c*cb,b)}function z(b,c,d){var e,f,g,h,i,j,k,l,m,n=0,o=0;try{e=a(b)}catch(p){return}for(f=e.outerHeight(),g=e.outerWidth(),T.scrollTop(0),T.scrollLeft(0);!e.is(".jspPane");)if(n+=e.position().top,o+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;h=B(),j=h+S,h>n||c?l=n-P.verticalGutter:n+f>j&&(l=n-S+f+P.verticalGutter),isNaN(l)||x(l,d),i=A(),k=i+R,i>o||c?m=o-P.horizontalGutter:o+g>k&&(m=o-R+g+P.horizontalGutter),isNaN(m)||y(m,d)}function A(){return-Q.position().left}function B(){return-Q.position().top}function C(){var a=V-S;return a>20&&a-B()<10}function D(){var a=U-R;return a>20&&a-A()<10}function E(){T.unbind(Bb).bind(Bb,function(a,b,c,d){var e=db,f=ab;return vb.scrollBy(c*P.mouseWheelSpeed,-d*P.mouseWheelSpeed,!1),e==db&&f==ab})}function F(){T.unbind(Bb)}function G(){return!1}function H(){Q.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){z(a.target,!1)})}function I(){Q.find(":input,a").unbind("focus.jsp")}function J(){function b(){var a=db,b=ab;switch(c){case 40:vb.scrollByY(P.keyboardSpeed,!1);break;case 38:vb.scrollByY(-P.keyboardSpeed,!1);break;case 34:case 32:vb.scrollByY(S*P.scrollPagePercent,!1);break;case 33:vb.scrollByY(-S*P.scrollPagePercent,!1);break;case 39:vb.scrollByX(P.keyboardSpeed,!1);break;case 37:vb.scrollByX(-P.keyboardSpeed,!1)}return e=a!=db||b!=ab}var c,e,f=[];Z&&f.push(lb[0]),Y&&f.push(eb[0]),Q.focus(function(){d.focus()}),d.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(d){if(d.target===this||f.length&&a(d.target).closest(f).length){var g=db,h=ab;switch(d.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:c=d.keyCode,b();break;case 35:x(V-S),c=null;break;case 36:x(0),c=null}return e=d.keyCode==c&&g!=db||h!=ab,!e}}).bind("keypress.jsp",function(a){return a.keyCode==c&&b(),!e}),P.hideFocus?(d.css("outline","none"),"hideFocus"in T[0]&&d.attr("hideFocus",!0)):(d.css("outline",""),"hideFocus"in T[0]&&d.attr("hideFocus",!1))}function K(){d.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function L(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&Q.find(d)&&(0===T.scrollTop()?c=setInterval(function(){T.scrollTop()>0&&(z(b,!0),a(document).scrollTop(T.position().top),clearInterval(c))},50):(z(b,!0),a(document).scrollTop(T.position().top)))}}function M(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate("a[href*=#]","click",function(c){var d,e,f,g,h,i,j=this.href.substr(0,this.href.indexOf("#")),k=location.href;if(-1!==location.href.indexOf("#")&&(k=location.href.substr(0,location.href.indexOf("#"))),j===k){d=escape(this.href.substr(this.href.indexOf("#")+1));try{e=a("#"+d+', a[name="'+d+'"]')}catch(l){return}e.length&&(f=e.closest(".jspScrollable"),g=f.data("jsp"),g.scrollToElement(e,!0),f[0].scrollIntoView&&(h=a(b).scrollTop(),i=e.offset().top,(h>i||i>h+a(b).height())&&f[0].scrollIntoView()),c.preventDefault())}}))}function N(){var a,b,c,d,e,f=!1;T.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(g){var h=g.originalEvent.touches[0];a=A(),b=B(),c=h.pageX,d=h.pageY,e=!1,f=!0}).bind("touchmove.jsp",function(g){if(f){var h=g.originalEvent.touches[0],i=db,j=ab;return vb.scrollTo(a+c-h.pageX,b+d-h.pageY),e=e||Math.abs(c-h.pageX)>5||Math.abs(d-h.pageY)>5,i==db&&j==ab}}).bind("touchend.jsp",function(){f=!1}).bind("click.jsp-touchclick",function(){return e?(e=!1,!1):void 0})}function O(){var a=B(),b=A();d.removeClass("jspScrollable").unbind(".jsp"),d.replaceWith(Ab.append(Q.children())),Ab.scrollTop(a),Ab.scrollLeft(b),rb&&clearInterval(rb)}var P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb,ub,vb=this,wb=!0,xb=!0,yb=!1,zb=!1,Ab=d.clone(!1,!1).empty(),Bb=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";"border-box"===d.css("box-sizing")?(sb=0,tb=0):(sb=d.css("paddingTop")+" "+d.css("paddingRight")+" "+d.css("paddingBottom")+" "+d.css("paddingLeft"),tb=(parseInt(d.css("paddingLeft"),10)||0)+(parseInt(d.css("paddingRight"),10)||0)),a.extend(vb,{reinitialise:function(b){b=a.extend({},P,b),f(b)},scrollToElement:function(a,b,c){z(a,b,c)},scrollTo:function(a,b,c){y(a,c),x(b,c)},scrollToX:function(a,b){y(a,b)},scrollToY:function(a,b){x(a,b)},scrollToPercentX:function(a,b){y(a*(U-R),b)},scrollToPercentY:function(a,b){x(a*(V-S),b)},scrollBy:function(a,b,c){vb.scrollByX(a,c),vb.scrollByY(b,c)},scrollByX:function(a,b){var c=A()+Math[0>a?"floor":"ceil"](a),d=c/(U-R);t(d*cb,b)},scrollByY:function(a,b){var c=B()+Math[0>a?"floor":"ceil"](a),d=c/(V-S);r(d*_,b)},positionDragX:function(a,b){t(a,b)},positionDragY:function(a,b){r(a,b)},animate:function(a,b,c,d){var e={};e[b]=c,a.animate(e,{duration:P.animateDuration,easing:P.animateEase,queue:!1,step:d})},getContentPositionX:function(){return A()},getContentPositionY:function(){return B()},getContentWidth:function(){return U},getContentHeight:function(){return V},getPercentScrolledX:function(){return A()/(U-R)},getPercentScrolledY:function(){return B()/(V-S)},getIsScrollableH:function(){return Z},getIsScrollableV:function(){return Y},getContentPane:function(){return Q},scrollToBottom:function(a){r(_,a)},hijackInternalLinks:a.noop,destroy:function(){O()}}),f(e)}return d=a.extend({},a.fn.jScrollPane.defaults,d),a.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){d[this]=d[this]||d.speed}),this.each(function(){var b=a(this),c=b.data("jsp");c?c.reinitialise(d):(a("script",b).filter('[type="text/javascript"],:not([type])').remove(),c=new e(b,d),b.data("jsp",c))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}}(jQuery,this);



    /* jquery.mousewheel.js or jquery.mousewheel.min.js */
	;(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports==='object'){module.exports=factory}else{factory(jQuery)}}(function($){var toFix=['wheel','mousewheel','DOMMouseScroll','MozMousePixelScroll'];var toBind='onwheel'in document||document.documentMode>=9?['wheel']:['mousewheel','DomMouseScroll','MozMousePixelScroll'];var lowestDelta,lowestDeltaXY;if($.event.fixHooks){for(var i=toFix.length;i;){$.event.fixHooks[toFix[--i]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=toBind.length;i;){this.addEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=toBind.length;i;){this.removeEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0,absDeltaXY=0,fn;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta}if(orgEvent.detail){delta=orgEvent.detail*-1}if(orgEvent.deltaY){deltaY=orgEvent.deltaY*-1;delta=deltaY}if(orgEvent.deltaX){deltaX=orgEvent.deltaX;delta=deltaX*-1}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY}if(orgEvent.wheelDeltaX!==undefined){deltaX=orgEvent.wheelDeltaX*-1}absDelta=Math.abs(delta);if(!lowestDelta||absDelta<lowestDelta){lowestDelta=absDelta}absDeltaXY=Math.max(Math.abs(deltaY),Math.abs(deltaX));if(!lowestDeltaXY||absDeltaXY<lowestDeltaXY){lowestDeltaXY=absDeltaXY}fn=delta>0?'floor':'ceil';delta=Math[fn](delta/lowestDelta);deltaX=Math[fn](deltaX/lowestDeltaXY);deltaY=Math[fn](deltaY/lowestDeltaXY);args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}}));


    /* jquery.blockUI-2.36.js or jquery.blockUI-2.36.min.js */
    ;;(function($){if(/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery)||/^1.1/.test($.fn.jquery)){alert('blockUI requires jQuery v1.2.3 or later!  You are using v'+$.fn.jquery);return}$.fn._fadeIn=$.fn.fadeIn;var noOp=function(){};var mode=document.documentMode||0;var setExpr=$.browser.msie&&(($.browser.version<8&&!mode)||mode<8);var ie6=$.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!mode;$.blockUI=function(opts){install(window,opts)};$.unblockUI=function(opts){remove(window,opts)};$.growlUI=function(title,message,timeout,onClose){var $m=$('<div class="growlUI"></div>');if(title)$m.append('<h1>'+title+'</h1>');if(message)$m.append('<h2>'+message+'</h2>');if(timeout==undefined)timeout=3000;$.blockUI({message:$m,fadeIn:700,fadeOut:1000,centerY:false,timeout:timeout,showOverlay:false,onUnblock:onClose,css:$.blockUI.defaults.growlCSS})};$.fn.block=function(opts){return this.unblock({fadeOut:0}).each(function(){if($.css(this,'position')=='static')this.style.position='relative';if($.browser.msie)this.style.zoom=1;install(this,opts)})};$.fn.unblock=function(opts){return this.each(function(){remove(this,opts)})};$.blockUI.version=2.35;$.blockUI.defaults={message:'<h1>Please wait...</h1>',title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:'30%',top:'40%',left:'35%',textAlign:'center',color:'#000',border:'3px solid #aaa',backgroundColor:'#fff',cursor:'wait'},themedCSS:{width:'30%',top:'40%',left:'35%'},overlayCSS:{backgroundColor:'#000',opacity:0.6,cursor:'wait'},growlCSS:{width:'350px',top:'10px',left:'',right:'10px',border:'none',padding:'5px',opacity:0.6,cursor:'default',color:'#fff',backgroundColor:'#000','-webkit-border-radius':'10px','-moz-border-radius':'10px','border-radius':'10px'},iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank',forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onBlock:null,onUnblock:null,quirksmodeOffsetHack:4,blockMsgClass:'blockMsg'};var pageBlock=null;var pageBlockEls=[];function install(el,opts){var full=(el==window);var msg=opts&&opts.message!==undefined?opts.message:undefined;opts=$.extend({},$.blockUI.defaults,opts||{});opts.overlayCSS=$.extend({},$.blockUI.defaults.overlayCSS,opts.overlayCSS||{});var css=$.extend({},$.blockUI.defaults.css,opts.css||{});var themedCSS=$.extend({},$.blockUI.defaults.themedCSS,opts.themedCSS||{});msg=msg===undefined?opts.message:msg;if(full&&pageBlock)remove(window,{fadeOut:0});if(msg&&typeof msg!='string'&&(msg.parentNode||msg.jquery)){var node=msg.jquery?msg[0]:msg;var data={};$(el).data('blockUI.history',data);data.el=node;data.parent=node.parentNode;data.display=node.style.display;data.position=node.style.position;if(data.parent)data.parent.removeChild(node)}var z=opts.baseZ;var lyr1=($.browser.msie||opts.forceIframe)?$('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>'):$('<div class="blockUI" style="display:none"></div>');var lyr2=$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var lyr3,s;if(opts.theme&&full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">'+'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>'}else if(opts.theme){s='<div class="blockUI '+opts.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:absolute">'+'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>'}else if(full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage" style="z-index:'+z+';display:none;position:fixed"></div>'}else{s='<div class="blockUI '+opts.blockMsgClass+' blockElement" style="z-index:'+z+';display:none;position:absolute"></div>'}lyr3=$(s);if(msg){if(opts.theme){lyr3.css(themedCSS);lyr3.addClass('ui-widget-content')}else lyr3.css(css)}if(!opts.applyPlatformOpacityRules||!($.browser.mozilla&&/Linux/.test(navigator.platform)))lyr2.css(opts.overlayCSS);lyr2.css('position',full?'fixed':'absolute');if($.browser.msie||opts.forceIframe)lyr1.css('opacity',0.0);var layers=[lyr1,lyr2,lyr3],$par=full?$('body'):$(el);$.each(layers,function(){this.appendTo($par)});if(opts.theme&&opts.draggable&&$.fn.draggable){lyr3.draggable({handle:'.ui-dialog-titlebar',cancel:'li'})}var expr=setExpr&&(!$.boxModel||$('object,embed',full?null:el).length>0);if(ie6||expr){if(full&&opts.allowBodyStretch&&$.boxModel)$('html,body').css('height','100%');if((ie6||!$.boxModel)&&!full){var t=sz(el,'borderTopWidth'),l=sz(el,'borderLeftWidth');var fixT=t?'(0 - '+t+')':0;var fixL=l?'(0 - '+l+')':0}$.each([lyr1,lyr2,lyr3],function(i,o){var s=o[0].style;s.position='absolute';if(i<2){full?s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"'):s.setExpression('height','this.parentNode.offsetHeight + "px"');full?s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):s.setExpression('width','this.parentNode.offsetWidth + "px"');if(fixL)s.setExpression('left',fixL);if(fixT)s.setExpression('top',fixT)}else if(opts.centerY){if(full)s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');s.marginTop=0}else if(!opts.centerY&&full){var top=(opts.css&&opts.css.top)?parseInt(opts.css.top):0;var expression='((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';s.setExpression('top',expression)}})}if(msg){if(opts.theme)lyr3.find('.ui-widget-content').append(msg);else lyr3.append(msg);if(msg.jquery||msg.nodeType)$(msg).show()}if(($.browser.msie||opts.forceIframe)&&opts.showOverlay)lyr1.show();if(opts.fadeIn){var cb=opts.onBlock?opts.onBlock:noOp;var cb1=(opts.showOverlay&&!msg)?cb:noOp;var cb2=msg?cb:noOp;if(opts.showOverlay)lyr2._fadeIn(opts.fadeIn,cb1);if(msg)lyr3._fadeIn(opts.fadeIn,cb2)}else{if(opts.showOverlay)lyr2.show();if(msg)lyr3.show();if(opts.onBlock)opts.onBlock()}bind(1,el,opts);if(full){pageBlock=lyr3[0];pageBlockEls=$(':input:enabled:visible',pageBlock);if(opts.focusInput)setTimeout(focus,20)}else center(lyr3[0],opts.centerX,opts.centerY);if(opts.timeout){var to=setTimeout(function(){full?$.unblockUI(opts):$(el).unblock(opts)},opts.timeout);$(el).data('blockUI.timeout',to)}};function remove(el,opts){var full=(el==window);var $el=$(el);var data=$el.data('blockUI.history');var to=$el.data('blockUI.timeout');if(to){clearTimeout(to);$el.removeData('blockUI.timeout')}opts=$.extend({},$.blockUI.defaults,opts||{});bind(0,el,opts);var els;if(full)els=$('body').children().filter('.blockUI').add('body > .blockUI');else els=$('.blockUI',el);if(full)pageBlock=pageBlockEls=null;if(opts.fadeOut){els.fadeOut(opts.fadeOut);setTimeout(function(){reset(els,data,opts,el)},opts.fadeOut)}else reset(els,data,opts,el)};function reset(els,data,opts,el){els.each(function(i,o){if(this.parentNode)this.parentNode.removeChild(this)});if(data&&data.el){data.el.style.display=data.display;data.el.style.position=data.position;if(data.parent)data.parent.appendChild(data.el);$(el).removeData('blockUI.history')}if(typeof opts.onUnblock=='function')opts.onUnblock(el,opts)};function bind(b,el,opts){var full=el==window,$el=$(el);if(!b&&(full&&!pageBlock||!full&&!$el.data('blockUI.isBlocked')))return;if(!full)$el.data('blockUI.isBlocked',b);if(!opts.bindEvents||(b&&!opts.showOverlay))return;var events='mousedown mouseup keydown keypress';b?$(document).bind(events,opts,handler):$(document).unbind(events,handler)};function handler(e){if(e.keyCode&&e.keyCode==9){if(pageBlock&&e.data.constrainTabKey){var els=pageBlockEls;var fwd=!e.shiftKey&&e.target===els[els.length-1];var back=e.shiftKey&&e.target===els[0];if(fwd||back){setTimeout(function(){focus(back)},10);return false}}}var opts=e.data;if($(e.target).parents('div.'+opts.blockMsgClass).length>0)return true;return $(e.target).parents().children().filter('div.blockUI').length==0};function focus(back){if(!pageBlockEls)return;var e=pageBlockEls[back===true?pageBlockEls.length-1:0];if(e)e.focus()};function center(el,x,y){var p=el.parentNode,s=el.style;var l=((p.offsetWidth-el.offsetWidth)/2)-sz(p,'borderLeftWidth');var t=((p.offsetHeight-el.offsetHeight)/2)-sz(p,'borderTopWidth');if(x)s.left=l>0?(l+'px'):'0';if(y)s.top=t>0?(t+'px'):'0'};function sz(el,p){return parseInt($.css(el,p))||0}})(jQuery);


    /* jquery.autocomplete.micros.js or jquery.autocomplete.micros.min.js */
    
    ;(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory(jQuery);}}(function($){'use strict';var
utils=(function(){return{escapeRegExChars:function(value){return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");},createNode:function(containerClass){var div=document.createElement('div');div.className=containerClass;div.style.position='absolute';div.style.display='none';return div;}};}()),keys={ESC:27,TAB:9,RETURN:13,LEFT:37,UP:38,RIGHT:39,DOWN:40};function Autocomplete(el,options){var noop=function(){},that=this,defaults={autoSelectFirst:false,appendTo:document.body,serviceUrl:null,lookup:null,caseSensitive:true,maximizeCache:false,onSelect:null,width:'auto',minChars:1,minCacheCharLimit:5,maxHeight:300,deferRequestBy:0,params:{},formatResult:Autocomplete.formatResult,delimiter:null,zIndex:9999,type:'GET',noCache:false,onSearchStart:noop,onSearchComplete:noop,onSearchError:noop,containerClass:'autocomplete-suggestions',tabDisabled:false,dataType:'text',currentRequest:null,triggerSelectOnValidInput:true,preventBadQueries:true,lookupFilter:function(suggestion,originalQuery,queryLowerCase){return suggestion.value.toLowerCase().indexOf(queryLowerCase)!==-1;},paramName:'query',transformResult:function(response){return typeof response==='string'?$.parseJSON(response):response;},showNoSuggestionNotice:false,noSuggestionNotice:'No results',orientation:'bottom',forceFixPosition:false};that.element=el;that.el=$(el);that.suggestions=[];that.badQueries=[];that.selectedIndex=-1;that.currentValue=that.element.value;that.intervalId=0;that.cachedResponse={};that.onChangeInterval=null;that.onChange=null;that.isLocal=false;that.suggestionsContainer=null;that.noSuggestionsContainer=null;that.options=$.extend({},defaults,options);that.classes={selected:'autocomplete-selected',suggestion:'autocomplete-suggestion'};that.hint=null;that.hintValue='';that.selection=null;that.initialize();that.setOptions(options);}
Autocomplete.utils=utils;$.Autocomplete=Autocomplete;Autocomplete.formatResult=function(suggestion,currentValue){var pattern='('+utils.escapeRegExChars(currentValue)+')';return suggestion.value.replace(new RegExp(pattern,'gi'),'<strong>$1<\/strong>');};Autocomplete.prototype={killerFn:null,initialize:function(){var that=this,suggestionSelector='.'+that.classes.suggestion,selected=that.classes.selected,options=that.options,container,noSuggestionsContainer;that.element.setAttribute('autocomplete','off');that.killerFn=function(e){if($(e.target).closest('.'+that.options.containerClass).length===0){that.killSuggestions();that.disableKillerFn();}};that.noSuggestionsContainer=$('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0);that.suggestionsContainer=Autocomplete.utils.createNode(options.containerClass);container=$(that.suggestionsContainer);container.appendTo(options.appendTo);if(options.width!==false&&options.width!=='auto'){container.width(options.width);}
container.on('mouseover.autocomplete',suggestionSelector,function(){that.activate($(this).data('index'));});container.on('mouseout.autocomplete',function(){that.selectedIndex=-1;container.children('.'+selected).removeClass(selected);});container.on('click.autocomplete',suggestionSelector,function(){that.select($(this).data('index'));});that.fixPositionCapture=function(){if(that.visible){that.fixPosition();}};$(window).on('resize.autocomplete',that.fixPositionCapture);that.el.on('keydown.autocomplete',function(e){that.onKeyPress(e);});that.el.on('keyup.autocomplete',function(e){that.onKeyUp(e);});that.el.on('blur.autocomplete',function(){that.onBlur();});that.el.on('focus.autocomplete',function(){that.onFocus();});that.el.on('change.autocomplete',function(e){that.onKeyUp(e);});},onFocus:function(){var that=this;that.fixPosition();if(that.options.minChars<=that.el.val().length){that.onValueChange();}},onBlur:function(){this.enableKillerFn();},setOptions:function(suppliedOptions){var that=this,options=that.options;$.extend(options,suppliedOptions);that.isLocal=$.isArray(options.lookup);if(that.isLocal){options.lookup=that.verifySuggestionsFormat(options.lookup);}
options.orientation=that.validateOrientation(options.orientation,'bottom');$(that.suggestionsContainer).css({'max-height':options.maxHeight+'px','width':options.width+'px','z-index':options.zIndex});},clearCache:function(){this.cachedResponse={};this.badQueries=[];},clear:function(){this.clearCache();this.currentValue='';this.suggestions=[];},disable:function(){var that=this;that.disabled=true;if(that.currentRequest){that.currentRequest.abort();}},enable:function(){this.disabled=false;},fixPosition:function(){var that=this,$container=$(that.suggestionsContainer),containerParent=$container.parent().get(0);if(containerParent!==document.body&&!that.options.forceFixPosition)
return;var orientation=that.options.orientation,containerHeight=$container.outerHeight(),height=that.el.outerHeight(),offset=that.el.offset(),styles={'top':offset.top,'left':offset.left};if(orientation=='auto'){var viewPortHeight=$(window).height(),scrollTop=$(window).scrollTop(),top_overflow=-scrollTop+offset.top-containerHeight,bottom_overflow=scrollTop+viewPortHeight-(offset.top+height+containerHeight);if(Math.max(top_overflow,bottom_overflow)===top_overflow)
orientation='top';else
orientation='bottom';}
if(orientation==='top')
styles.top+=-containerHeight;else
styles.top+=height;if(containerParent!==document.body){var opacity=$container.css('opacity'),parentOffsetDiff;if(!that.visible)
$container.css('opacity',0).show();parentOffsetDiff=$container.offsetParent().offset();styles.top-=parentOffsetDiff.top;styles.left-=parentOffsetDiff.left;if(!that.visible)
$container.css('opacity',opacity).hide();}
if(that.options.width==='auto'){var refEl=(that.options.referenceElement&&that.options.referenceElement.length>0)?$(that.options.referenceElement):that.el;styles.width=(refEl.outerWidth()-2)+'px';}
$container.css(styles);},enableKillerFn:function(){var that=this;$(document).on('click.autocomplete',that.killerFn);},disableKillerFn:function(){var that=this;$(document).off('click.autocomplete',that.killerFn);},killSuggestions:function(){var that=this;that.stopKillSuggestions();that.intervalId=window.setInterval(function(){that.hide();that.stopKillSuggestions();},50);},stopKillSuggestions:function(){window.clearInterval(this.intervalId);},isCursorAtEnd:function(){var that=this,valLength=that.el.val().length,selectionStart=that.element.selectionStart,range;if(typeof selectionStart==='number'){return selectionStart===valLength;}
if(document.selection){range=document.selection.createRange();range.moveStart('character',-valLength);return valLength===range.text.length;}
return true;},onKeyPress:function(e){var that=this;if(!that.disabled&&!that.visible&&e.which===keys.DOWN&&that.currentValue){that.suggest();return;}
if(that.disabled||!that.visible){return;}
switch(e.which){case keys.ESC:that.el.val(that.currentValue);that.hide();break;case keys.RIGHT:if(that.hint&&that.options.onHint&&that.isCursorAtEnd()){that.selectHint();break;}
return;case keys.TAB:if(that.hint&&that.options.onHint){that.selectHint();return;}
case keys.RETURN:if(that.selectedIndex===-1){that.hide();return;}
that.select(that.selectedIndex);if(e.which===keys.TAB&&that.options.tabDisabled===false){return;}
break;case keys.UP:that.moveUp();break;case keys.DOWN:that.moveDown();break;default:return;}
e.stopImmediatePropagation();e.preventDefault();},onKeyUp:function(e){var that=this;if(that.disabled){return;}
switch(e.which){case keys.UP:case keys.DOWN:return;}
clearInterval(that.onChangeInterval);if(that.currentValue!==that.el.val()){that.findBestHint();if(that.options.deferRequestBy>0){that.onChangeInterval=setInterval(function(){that.onValueChange();},that.options.deferRequestBy);}else{that.onValueChange();}}},onValueChange:function(){var that=this,options=that.options,value=that.el.val(),query=that.getQuery(value),index;if(that.selection){that.selection=null;(options.onInvalidateSelection||$.noop).call(that.element);}
clearInterval(that.onChangeInterval);that.currentValue=value;that.selectedIndex=-1;if(options.triggerSelectOnValidInput){index=that.findSuggestionIndex(query);if(index!==-1){that.select(index);return;}}
if(query.length<options.minChars){that.hide();}else{that.getSuggestions(query);}},findSuggestionIndex:function(query){var that=this,index=-1,queryLowerCase=query.toLowerCase();$.each(that.suggestions,function(i,suggestion){if(suggestion.value.toLowerCase()===queryLowerCase){index=i;return false;}});return index;},getQuery:function(value){var delimiter=this.options.delimiter,parts;if(this.options.caseSensitive===false){value=value.toLowerCase();}
if(!delimiter){return value;}
parts=value.split(delimiter);return $.trim(parts[parts.length-1]);},getSuggestionsLocal:function(query){var that=this,options=that.options,queryLowerCase=query.toLowerCase(),filter=options.lookupFilter,limit=parseInt(options.lookupLimit,10),data;data={suggestions:$.grep(options.lookup,function(suggestion){return filter(suggestion,query,queryLowerCase);})};if(limit&&data.suggestions.length>limit){data.suggestions=data.suggestions.slice(0,limit);}
return data;},getSuggestionsFromCache:function(query,cachedSuggestions){var that=this,options=that.options,queryLowerCase=query.toLowerCase(),filter=options.lookupFilter,limit=parseInt(options.lookupLimit,10),data;data={suggestions:$.grep(cachedSuggestions,function(suggestion){return filter(suggestion,query,queryLowerCase);})};if(limit&&data.suggestions.length>limit){data.suggestions=data.suggestions.slice(0,limit);}
return data;},getSuggestions:function(q){var response,that=this,options=that.options,serviceUrl=options.serviceUrl,params,cacheKey;options.params[options.paramName]=q;params=options.ignoreParams?null:options.params;if(that.isLocal){response=that.getSuggestionsLocal(q);}else{if($.isFunction(serviceUrl)){serviceUrl=serviceUrl.call(that.element,q);}
cacheKey=serviceUrl+'?'+$.param(params||{});response=that.cachedResponse[cacheKey];if(!response&&this.options.maximizeCache===true&&(q.length>=options.minChars)){var cachedQ=q;var maxCacheKey=cacheKey;var cachedParams={};for(var idx=(q.length-1);idx>=options.minCacheCharLimit;idx--){cachedQ=cachedQ.substr(0,idx);cachedParams[options.paramName]=cachedQ;maxCacheKey=serviceUrl+'?'+$.param(cachedParams||{});response=that.cachedResponse[maxCacheKey];if(response){response=that.getSuggestionsFromCache(q,response.suggestions);break;}}}}
if(response&&$.isArray(response.suggestions)){that.suggestions=response.suggestions;that.suggest();}else if(!that.isBadQuery(q)){if(options.onSearchStart.call(that.element,options.params)===false){return;}
if(that.currentRequest){that.currentRequest.abort();}
that.currentRequest=$.ajax({url:serviceUrl,data:params,type:options.type,dataType:options.dataType}).done(function(data){var result;that.currentRequest=null;result=options.transformResult(data);that.processResponse(result,q,cacheKey);options.onSearchComplete.call(that.element,q,result.suggestions);}).fail(function(jqXHR,textStatus,errorThrown){options.onSearchError.call(that.element,q,jqXHR,textStatus,errorThrown);});}},isBadQuery:function(q){if(!this.options.preventBadQueries){return false;}
var badQueries=this.badQueries,i=badQueries.length;while(i--){if(q.indexOf(badQueries[i])===0){return true;}}
return false;},hide:function(){var that=this;that.visible=false;that.selectedIndex=-1;$(that.suggestionsContainer).hide();that.signalHint(null);},suggest:function(){if(this.suggestions.length===0){this.options.showNoSuggestionNotice?this.noSuggestions():this.hide();return;}
var that=this,options=that.options,formatResult=options.formatResult,value=that.getQuery(that.currentValue),className=that.classes.suggestion,classSelected=that.classes.selected,container=$(that.suggestionsContainer),noSuggestionsContainer=$(that.noSuggestionsContainer),beforeRender=options.beforeRender,html='',index,width;if(options.triggerSelectOnValidInput){index=that.findSuggestionIndex(value);if(index!==-1){that.select(index);return;}}
$.each(that.suggestions,function(i,suggestion){html+='<div class="'+className+'" data-index="'+i+'">'+formatResult(suggestion,value)+'</div>';});this.adjustContainerWidth();noSuggestionsContainer.detach();container.html(html);if(options.autoSelectFirst){that.selectedIndex=0;container.children().first().addClass(classSelected);}
if($.isFunction(beforeRender)){beforeRender.call(that.element,container);}
that.fixPosition();container.show();that.visible=true;that.findBestHint();},noSuggestions:function(){var that=this,container=$(that.suggestionsContainer),noSuggestionsContainer=$(that.noSuggestionsContainer);this.adjustContainerWidth();noSuggestionsContainer.detach();container.empty();container.append(noSuggestionsContainer);that.fixPosition();container.show();that.visible=true;},adjustContainerWidth:function(){var that=this,options=that.options,width,container=$(that.suggestionsContainer);if(options.width==='auto'){var refEl=(options.referenceElement&&options.referenceElement.length>0)?$(options.referenceElement):that.el;width=refEl.outerWidth()-2;container.width(width>0?width:300);}},findBestHint:function(){var that=this,value=that.el.val().toLowerCase(),bestMatch=null;if(!value){return;}
$.each(that.suggestions,function(i,suggestion){var foundMatch=suggestion.value.toLowerCase().indexOf(value)===0;if(foundMatch){bestMatch=suggestion;}
return!foundMatch;});that.signalHint(bestMatch);},signalHint:function(suggestion){var hintValue='',that=this;if(suggestion){hintValue=that.currentValue+suggestion.value.substr(that.currentValue.length);}
if(that.hintValue!==hintValue){that.hintValue=hintValue;that.hint=suggestion;(this.options.onHint||$.noop)(hintValue);}},verifySuggestionsFormat:function(suggestions){if(suggestions.length&&typeof suggestions[0]==='string'){return $.map(suggestions,function(value){return{value:value,data:null};});}
return suggestions;},validateOrientation:function(orientation,fallback){orientation=orientation.trim().toLowerCase();var useFallback=true;if('auto'==orientation){useFallback=false;}else if('bottom'==orientation){useFallback=false;}else if('top'==orientation){useFallback=false;}
if(useFallback){orientation=fallback;}
return orientation},processResponse:function(result,originalQuery,cacheKey){var that=this,options=that.options,limit=parseInt(options.lookupLimit,10);result.suggestions=that.verifySuggestionsFormat(result.suggestions);if(!options.noCache){that.cachedResponse[cacheKey]=result;if(options.preventBadQueries&&result.suggestions.length===0){that.badQueries.push(originalQuery);}}
if(limit&&result.suggestions.length>limit){result.suggestions=result.suggestions.slice(0,limit);}
if(originalQuery!==that.getQuery(that.currentValue)){return;}
that.suggestions=result.suggestions;that.suggest();},activate:function(index){var that=this,activeItem,selected=that.classes.selected,container=$(that.suggestionsContainer),children=container.children();container.children('.'+selected).removeClass(selected);that.selectedIndex=index;if(that.selectedIndex!==-1&&children.length>that.selectedIndex){activeItem=children.get(that.selectedIndex);$(activeItem).addClass(selected);return activeItem;}
return null;},selectHint:function(){var that=this,i=$.inArray(that.hint,that.suggestions);that.select(i);},select:function(i){var that=this;that.hide();that.onSelect(i);},moveUp:function(){var that=this;if(that.selectedIndex===-1){return;}
if(that.selectedIndex===0){$(that.suggestionsContainer).children().first().removeClass(that.classes.selected);that.selectedIndex=-1;that.el.val(that.currentValue);that.findBestHint();return;}
that.adjustScroll(that.selectedIndex-1);},moveDown:function(){var that=this;if(that.selectedIndex===(that.suggestions.length-1)){return;}
that.adjustScroll(that.selectedIndex+1);},adjustScroll:function(index){var that=this,activeItem=that.activate(index),offsetTop,upperBound,lowerBound,heightDelta=25;if(!activeItem){return;}
offsetTop=activeItem.offsetTop;upperBound=$(that.suggestionsContainer).scrollTop();lowerBound=upperBound+that.options.maxHeight-heightDelta;if(offsetTop<upperBound){$(that.suggestionsContainer).scrollTop(offsetTop);}else if(offsetTop>lowerBound){$(that.suggestionsContainer).scrollTop(offsetTop-that.options.maxHeight+heightDelta);}
that.el.val(that.getValue(that.suggestions[index].value));that.signalHint(null);},onSelect:function(index){var that=this,onSelectCallback=that.options.onSelect,suggestion=that.suggestions[index];that.currentValue=that.getValue(suggestion.value);if(that.currentValue!==that.el.val()){that.el.val(that.currentValue);}
that.signalHint(null);that.suggestions=[];that.selection=suggestion;if($.isFunction(onSelectCallback)){onSelectCallback.call(that.element,suggestion);}},getValue:function(value){var that=this,delimiter=that.options.delimiter,currentValue,parts;if(!delimiter){return value;}
currentValue=that.currentValue;parts=currentValue.split(delimiter);if(parts.length===1){return value;}
return currentValue.substr(0,currentValue.length-parts[parts.length-1].length)+value;},dispose:function(){var that=this;that.el.off('.autocomplete').removeData('autocomplete');that.disableKillerFn();$(window).off('resize.autocomplete',that.fixPositionCapture);$(that.suggestionsContainer).remove();}};$.fn.autocomplete=function(options,args){var dataKey='autocomplete';if(arguments.length===0){return this.first().data(dataKey);}
return this.each(function(){var inputElement=$(this),instance=inputElement.data(dataKey);if(typeof options==='string'){if(instance&&typeof instance[options]==='function'){instance[options](args);}}else{if(instance&&instance.dispose){instance.dispose();}
instance=new Autocomplete(this,options);inputElement.data(dataKey,instance);}});};}));


    /* jquery.pp.custom.js or jquery.pp.custom.min.js */
    ;(function(e){var t=function(e){var t=e.event,n=function(e,t,n,r){var i,s,o,u,a,f,l,c,h;for(i=0;i<t.length;i++){s=t[i];u=s.indexOf(".")<0;if(!u){l=s.split(".");s=l.shift();c=new RegExp("(^|\\.)"+l.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}o=(e[s]||[]).slice(0);for(a=0;a<o.length;a++){f=o[a];h=u||c.test(f.namespace);if(h){if(r){if(f.selector===r){n(s,f.origHandler||f.handler)}}else if(r===null){n(s,f.origHandler||f.handler,f.selector)}else if(!f.selector){n(s,f.origHandler||f.handler)}}}}};t.find=function(t,r,i){var s=(e._data(t)||{}).events,o=[],u,a,f;if(!s){return o}n(s,r,function(e,t){o.push(t)},i);return o};t.findBySelector=function(t,r){var i=e._data(t).events,s={},o=function(e,t,n){var r=s[e]||(s[e]={}),i=r[t]||(r[t]=[]);i.push(n)};if(!i){return s}n(i,r,function(e,t,n){o(n||"",e,t)},null);return s};t.supportTouch="ontouchend"in document;e.fn.respondsTo=function(n){if(!this.length){return false}else{return t.find(this[0],e.isArray(n)?n:[n]).length>0}};e.fn.triggerHandled=function(t,n){t=typeof t=="string"?e.Event(t):t;this.trigger(t,n);return t.handled};t.setupHelper=function(n,r,i){if(!i){i=r;r=null}var s=function(s){var o,u=s.selector||"",a=s.namespace?"."+s.namespace:"";if(u){o=t.find(this,n,u);if(!o.length){e(this).delegate(u,r+a,i)}}else{if(!t.find(this,n,u).length){t.add(this,r+a,i,{selector:u,delegate:this})}}},o=function(s){var o,u=s.selector||"";if(u){o=t.find(this,n,u);if(!o.length){e(this).undelegate(u,r,i)}}else{if(!t.find(this,n,u).length){t.remove(this,r,i,{selector:u,delegate:this})}}};e.each(n,function(){t.special[this]={add:s,remove:o,setup:function(){},teardown:function(){}}})};return e}(e);var n=function(e){var t=/Phantom/.test(navigator.userAgent),n=!t&&"ontouchend"in document,r="touchmove scroll",i=n?"touchstart":"mousedown",s=n?"touchend":"mouseup",o=n?"touchmove":"mousemove",u=function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t;return{time:(new Date).getTime(),coords:[n.clientX,n.clientY],origin:e(t.target)}};var a=e.event.swipe={delay:500,max:320,min:30};e.event.setupHelper(["swipe","swipeleft","swiperight","swipeup","swipedown"],i,function(t){function c(e){if(!n){return}r=u(e);if(Math.abs(n.coords[0]-r.coords[0])>10){e.preventDefault()}}var n=u(t),r,i=t.delegateTarget||t.currentTarget,f=t.handleObj.selector,l=this;e(document.documentElement).bind(o,c).one(s,function(s){e(this).unbind(o,c);if(n&&r){var u=Math.abs(n.coords[0]-r.coords[0]),h=Math.abs(n.coords[1]-r.coords[1]),p=Math.sqrt(u*u+h*h);if(r.time-n.time<a.delay&&p>=a.min&&p<=a.max){var d=["swipe"];if(u>=a.min&&h<a.min){d.push(n.coords[0]>r.coords[0]?"swipeleft":"swiperight")}else if(h>=a.min&&u<a.min){d.push(n.coords[1]<r.coords[1]?"swipedown":"swipeup")}e.each(e.event.find(i,d,f),function(){this.call(l,t,{start:n,end:r})})}}n=r=undefined})});return e}(e,t)})(jQuery)
