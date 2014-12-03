
/*script:rum.js*/
var startTScript=new Date().getTime ();
var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.RUM=DELL.com.RUM||{};(function($,window){(function(){var timers={},tlCheck=false,delay=new Array(),rumCki=DELL.com.Utils.getCookie("rumCki"),enableMetrics=false,wp=window.performance||window.msPerformance||window.webkitPerformance||window.mozPerformance;this.tmrs=timers;this.startTimer=function(tName){timers[tName]=new Date().getTime();};this.endTimer=function(tName){if(timers!=null&&timers[tName])
{timers[tName]=(new Date().getTime())-timers[tName];if(tlReady()&&enableMetrics){this.addVar(tName,timers[tName]);}else{delay.push({tName:tName,time:timers[tName]});}
if(window.console&&window.console.log)
console.log("LOG: timer: "+tName+" ("+timers[tName]+")");}};this.addVar=function(n,v){var newVar={};newVar['timerName']=n.toString();newVar['timerValue']=v.toString();TeaLeaf.Event.tlAddCustomEvent("Timer",newVar);};getNavTiming=function(){var timing={};if(wp){var wt=wp.timing;var wn=wp.navigation;;timing={redirectCount:wn.redirectCount?wn.redirectCount:0,navType:wn.type?wn.type:0,connectEnd:wt.connectEnd?wt.connectEnd:0,connectStart:wt.connectStart?wt.connectStart:0,domComplete:wt.domComplete?wt.domComplete:0,domContentLoadedEventEnd:wt.domContentLoadedEventEnd?wt.domContentLoadedEventEnd:0,domContentLoadedEventStart:wt.domContentLoadedEventStart?wt.domContentLoadedEventStart:0,domInteractive:wt.domInteractive?wt.domInteractive:0,domLoading:wt.domLoading?wt.domLoading:0,domainLookupEnd:wt.domainLookupEnd?wt.domainLookupEnd:0,domainLookupStart:wt.domainLookupStart?wt.domainLookupStart:0,fetchStart:wt.fetchStart?wt.fetchStart:0,loadEventEnd:wt.loadEventEnd?wt.loadEventEnd:0,loadEventStart:wt.loadEventStart?wt.loadEventStart:0,navigationStart:wt.navigationStart?wt.navigationStart:0,redirectEnd:wt.redirectEnd?wt.redirectEnd:0,redirectStart:wt.redirectStart?wt.redirectStart:0,requestStart:wt.requestStart?wt.requestStart:0,responseEnd:wt.responseEnd?wt.responseEnd:0,responseStart:wt.responseStart?wt.responseStart:0,unloadEventEnd:wt.unloadEventEnd?wt.unloadEventEnd:0,unloadEventStart:wt.unloadEventStart?wt.unloadEventStart:0};timing.simple={browser:timing.loadEventEnd-timing.domLoading,server:timing.responseEnd-timing.requestStart,network:timing.connectEnd-timing.navigationStart};timing.browser={interactive:timing.domInteractive-timing.domLoading,domContent:timing.domContentLoadedEventEnd-timing.domContentLoadedEventStart,totalDom:timing.domComplete-timing.domLoading,windowLoad:timing.loadEventStart-timing.domLoading,windowLoadEnd:timing.loadEventEnd-timing.loadEventStart};timing.summary={redirect:timing.redirectEnd-timing.redirectStart,app_cache:timing.domainLookupStart-timing.fetchStart,dns:timing.domainLookupEnd-timing.domainLookupStart,tcp:timing.connectEnd-timing.connectStart,request:timing.responseStart-timing.requestStart,response:timing.responseEnd-timing.responseStart,dom:timing.domComplete-timing.domLoading,load:timing.loadEventEnd-timing.loadEventStart};}
timers.timing=timing;return timing;};addDelayedTimers=function(){for(var i;i<delay.length;i++){var timr=delay[i];this.addVar(timr.tName,timr.time);}};tlReady=function(){if(!tlCheck){tlCheck=(typeof TeaLeaf!='undefined'&&typeof TeaLeaf.Event!='undefined'&&typeof TeaLeaf.Event.tlAddCustomEvent!='undefined');}
return tlCheck;};navTimeReady=function(){if(wp){if(wp.timing.loadEventEnd>0)
return true;else
return false;}};this.getMetrics=function(){if(rumCki!=null&&rumCki!=""){enableMetrics=Boolean(rumCki);}else{var prctg=$("#RUMNavTiming").length>0?Number($("#RUMNavTiming").val()):0;var exp=$.browser.msie?null:0;rumCki=enableMetrics=(Math.floor(Math.random()*100)<=prctg);DELL.com.Utils.setCookie("rumCki",enableMetrics,exp,"/",null,null);}
return enableMetrics;};this.onload={initialize:function(){if(tlReady()&&navTimeReady()){var navTiming=getNavTiming();if(navTiming!=null||navTiming.length>0){TeaLeaf.Event.tlAddCustomEvent("NavTiming_Simple",navTiming.simple);TeaLeaf.Event.tlAddCustomEvent("NavTiming_Summary",navTiming.summary);TeaLeaf.Event.tlAddCustomEvent("NavTiming_Browser",navTiming.browser);}
addDelayedTimers;}else{setTimeout(DELL.com.RUM.onload.initialize,100);}}};if($("#RUMNavTiming").length>0&&DELL.com.RUM.getMetrics()){DELL.com.Utils.Initialize(DELL.com.RUM.onload,true);}}).call(DELL.com.RUM);})(jQuery,window);
if (window.console){console.log('ex time: rum.js', new Date().getTime() - startTScript);}



/*script:jquery-ui-1.8.22.custom.min.js*/
var startTScript=new Date().getTime ();
/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.22",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.curCSS||(a.curCSS=a.css),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode))d==document&&(e=!0);if(!e&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)}),c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.22"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.droppable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var b=this.options,c=b.accept;this.isover=0,this.isout=1,this.accept=a.isFunction(c)?c:function(a){return a.is(c)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[],a.ui.ddmanager.droppables[b.scope].push(this),b.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++)b[c]==this&&b.splice(c,1);return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"),this},_setOption:function(b,c){b=="accept"&&(this.accept=a.isFunction(c)?c:function(a){return a.is(c)}),a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),c&&this._trigger("activate",b,this.ui(c))},_deactivate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),c&&this._trigger("deactivate",b,this.ui(c))},_over:function(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",b,this.ui(c)))},_out:function(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",b,this.ui(c)))},_drop:function(b,c){var d=c||a.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]==this.element[0])return!1;var e=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==d.options.scope&&b.accept.call(b.element[0],d.currentItem||d.element)&&a.ui.intersect(d,a.extend(b,{offset:b.element.offset()}),b.options.tolerance))return e=!0,!1}),e?!1:this.accept.call(this.element[0],d.currentItem||d.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",b,this.ui(d)),this.element):!1},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}}),a.extend(a.ui.droppable,{version:"1.8.22"}),a.ui.intersect=function(b,c,d){if(!c.offset)return!1;var e=(b.positionAbs||b.position.absolute).left,f=e+b.helperProportions.width,g=(b.positionAbs||b.position.absolute).top,h=g+b.helperProportions.height,i=c.offset.left,j=i+c.proportions.width,k=c.offset.top,l=k+c.proportions.height;switch(d){case"fit":return i<=e&&f<=j&&k<=g&&h<=l;case"intersect":return i<e+b.helperProportions.width/2&&f-b.helperProportions.width/2<j&&k<g+b.helperProportions.height/2&&h-b.helperProportions.height/2<l;case"pointer":var m=(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,n=(b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,o=a.ui.isOver(n,m,k,i,c.proportions.height,c.proportions.width);return o;case"touch":return(g>=k&&g<=l||h>=k&&h<=l||g<k&&h>l)&&(e>=i&&e<=j||f>=i&&f<=j||e<i&&f>j);default:return!1}},a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(b,c){var d=a.ui.ddmanager.droppables[b.options.scope]||[],e=c?c.type:null,f=(b.currentItem||b.element).find(":data(droppable)").andSelf();g:for(var h=0;h<d.length;h++){if(d[h].options.disabled||b&&!d[h].accept.call(d[h].element[0],b.currentItem||b.element))continue;for(var i=0;i<f.length;i++)if(f[i]==d[h].element[0]){d[h].proportions.height=0;continue g}d[h].visible=d[h].element.css("display")!="none";if(!d[h].visible)continue;e=="mousedown"&&d[h]._activate.call(d[h],c),d[h].offset=d[h].element.offset(),d[h].proportions={width:d[h].element[0].offsetWidth,height:d[h].element[0].offsetHeight}}},drop:function(b,c){var d=!1;return a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)&&(d=this._drop.call(this,c)||d),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,c))}),d},dragStart:function(b,c){b.element.parents(":not(body,html)").bind("scroll.droppable",function(){b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)})},drag:function(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c),a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var d=a.ui.intersect(b,this,this.options.tolerance),e=!d&&this.isover==1?"isout":d&&this.isover==0?"isover":null;if(!e)return;var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");g.length&&(f=a.data(g[0],"droppable"),f.greedyChild=e=="isover"?1:0)}f&&e=="isover"&&(f.isover=0,f.isout=1,f._out.call(f,c)),this[e]=1,this[e=="isout"?"isover":"isout"]=0,this[e=="isover"?"_over":"_out"].call(this,c),f&&e=="isout"&&(f.isout=0,f.isover=1,f._over.call(f,c))})},dragStop:function(b,c){b.element.parents(":not(body,html)").unbind("scroll.droppable"),b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)}}})(jQuery);;
if (window.console){console.log('ex time: jquery-ui-1.8.22.custom.min.js', new Date().getTime() - startTScript);}



/*script:jquery.easing.1.3.js*/
var startTScript=new Date().getTime ();
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
if (window.console){console.log('ex time: jquery.easing.1.3.js', new Date().getTime() - startTScript);}



/*script:jquery.autocomplete.js*/
var startTScript=new Date().getTime ();
/*
 * Autocomplete - jQuery plugin 1.1pre
 *
 * Copyright (c) 2007 Dylan Verheul, Dan G. Switzer, Anjesh Tuladhar, Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 5785 2008-07-12 10:37:33Z joern.zaefferer $
 *
 */

;(function($) {
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {
		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;
		
		var v = selected.result;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				v = words.slice(0, words.length - 1).join( options.multipleSeparator ) + options.multipleSeparator + v;
			}
			v += options.multipleSeparator;
		}
		
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if ( !value ) {
			return [""];
		}
		var words = value.split( options.multipleSeparator );
		var result = [];
		$.each(words, function(i, value) {
			if ( $.trim(value) )
				result[i] = $.trim(value);
		});
		return result;
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$.Autocompleter.Selection(input, previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else
							$input.val( "" );
					}
				}
			);
		}
		if (wasVisible)
			// position cursor at end of input field
			$.Autocompleter.Selection(input, input.value.length, input.value.length);
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					q: lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
	    var parsed = [];
	    data = data.toString();

	    if (data.length) {
	        var rows = data.split("\n");
	        for (var i=0; i < rows.length; i++) {
	            var row = $.trim(rows[i]);
	            if (row) {
	                row = row.split("|");
	                parsed[parsed.length] = {
	                    data: row,
	                    value: row[0],
	                    result: options.formatResult && options.formatResult(row, row[0]) || row[0]
	                };
	            }
	        }
	    }
	    return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase) 
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (options.matchContains == "word"){
			i = s.toLowerCase().search("\\b" + sub.toLowerCase());
		}
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			add(i, value);
		});
	}
	
	// populate any existing data
	setTimeout(populate, 25);
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
	
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.Autocompleter.Selection = function(field, start, end) {
	if( field.createTextRange ){
		var selRange = field.createTextRange();
		selRange.collapse(true);
		selRange.moveStart("character", start);
		selRange.moveEnd("character", end);
		selRange.select();
	} else if( field.setSelectionRange ){
		field.setSelectionRange(start, end);
	} else {
		if( field.selectionStart ){
			field.selectionStart = start;
			field.selectionEnd = end;
		}
	}
	field.focus();
};

})(jQuery);
if (window.console){console.log('ex time: jquery.autocomplete.js', new Date().getTime() - startTScript);}



/*script:jquery.scrollTo-min.js*/
var startTScript=new Date().getTime ();
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
if (window.console){console.log('ex time: jquery.scrollTo-min.js', new Date().getTime() - startTScript);}



/*script:jquery.viewport.mini.js*/
var startTScript=new Date().getTime ();

(function($){$.belowthefold=function(element,settings){var fold=$(window).height()+$(window).scrollTop();return fold<=$(element).offset().top-settings.threshold;};$.abovethetop=function(element,settings){var top=$(window).scrollTop();return top>=$(element).offset().top+$(element).height()-settings.threshold;};$.rightofscreen=function(element,settings){var fold=$(window).width()+$(window).scrollLeft();return fold<=$(element).offset().left-settings.threshold;};$.leftofscreen=function(element,settings){var left=$(window).scrollLeft();return left>=$(element).offset().left+$(element).width()-settings.threshold;};$.inviewport=function(element,settings){return!$.rightofscreen(element,settings)&&!$.leftofscreen(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings);};$.extend($.expr[':'],{"below-the-fold":function(a,i,m){return $.belowthefold(a,{threshold:0});},"above-the-top":function(a,i,m){return $.abovethetop(a,{threshold:0});},"left-of-screen":function(a,i,m){return $.leftofscreen(a,{threshold:0});},"right-of-screen":function(a,i,m){return $.rightofscreen(a,{threshold:0});},"in-viewport":function(a,i,m){return $.inviewport(a,{threshold:0});}});})(jQuery);
if (window.console){console.log('ex time: jquery.viewport.mini.js', new Date().getTime() - startTScript);}



/*script:jquery.ajaxqueue.js*/
var startTScript=new Date().getTime ();
﻿(function ($) {
    // jQuery on an empty object, we are going to use this as our Queue
    var ajaxQueue = $({});

    $.ajaxQueue = function (ajaxOpts) {
        // hold the original complete function
        var oldComplete = ajaxOpts.complete;

        // queue our ajax request
        ajaxQueue.queue(function (next) {

            // create a complete callback to fire the next event in the queue
            ajaxOpts.complete = function () {
                // fire the original complete if it was there
                if (oldComplete) oldComplete.apply(this, arguments);

                next(); // run the next query in the queue
            };

            // run the query
            $.ajax(ajaxOpts);
        });
    };

})(jQuery);

if (window.console){console.log('ex time: jquery.ajaxqueue.js', new Date().getTime() - startTScript);}



/*script:jquery.lazyload.min.js*/
var startTScript=new Date().getTime ();
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.1-dev
 *
 */
(function(a,b){var c=a(b);a.fn.lazyload=function(d){function h(){var b=0;e.each(function(){var c=a(this);if(g.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,g)&&!a.leftofbegin(this,g))if(!a.belowthefold(this,g)&&!a.rightoffold(this,g))c.trigger("appear"),b=0;else if(++b>g.failure_limit)return!1})}var e=this,f,g={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return d&&(undefined!==d.failurelimit&&(d.failure_limit=d.failurelimit,delete d.failurelimit),undefined!==d.effectspeed&&(d.effect_speed=d.effectspeed,delete d.effectspeed),a.extend(g,d)),f=g.container===undefined||g.container===b?c:a(g.container),0===g.event.indexOf("scroll")&&f.bind(g.event,function(a){return h()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(g.appear){var d=e.length;g.appear.call(b,d,g)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(g.data_attribute))[g.effect](g.effect_speed),b.loaded=!0;var d=a.grep(e,function(a){return!a.loaded});e=a(d);if(g.load){var f=e.length;g.load.call(b,f,g)}}).attr("src",c.data(g.data_attribute))}}),0!==g.event.indexOf("scroll")&&c.bind(g.event,function(a){b.loaded||c.trigger("appear")})}),c.bind("resize",function(a){h()}),a(document).ready(function(){h()}),this},a.belowthefold=function(d,e){var f;return e.container===undefined||e.container===b?f=c.height()+c.scrollTop():f=a(e.container).offset().top+a(e.container).height(),f<=a(d).offset().top-e.threshold},a.rightoffold=function(d,e){var f;return e.container===undefined||e.container===b?f=c.width()+c.scrollLeft():f=a(e.container).offset().left+a(e.container).width(),f<=a(d).offset().left-e.threshold},a.abovethetop=function(d,e){var f;return e.container===undefined||e.container===b?f=c.scrollTop():f=a(e.container).offset().top,f>=a(d).offset().top+e.threshold+a(d).height()},a.leftofbegin=function(d,e){var f;return e.container===undefined||e.container===b?f=c.scrollLeft():f=a(e.container).offset().left,f>=a(d).offset().left+e.threshold+a(d).width()},a.inviewport=function(b,c){return!a.rightofscreen(b,c)&&!a.leftofscreen(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return!a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})})(jQuery,window)

if (window.console){console.log('ex time: jquery.lazyload.min.js', new Date().getTime() - startTScript);}



/*script:lazyLoadByAjax.js*/
var startTScript=new Date().getTime ();
﻿/*
* Lazy Load - jQuery plugin for lazy loading images
*
* Copyright (c) 2007-2012 Mika Tuupola
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* Project home:
*   http://www.appelsiini.net/projects/lazyload
*
* Version:  1.8.1
* Modified for Dell.
*/
(function ($, window) {
    var $window = $(window);

    $.fn.loadByAjax = function (options) {
        var elements = this;
        var $container;

        var settings = {
            threshold: 0,
            event: "scroll",
            container: window,
            skip_invisible: true,
            onLoad: null,
            onError: null
        };

        // Merge settings
        if (options) {
            $.extend(settings, options);
        }

        // set container for binding event
        $container = (settings.container === null || settings.container === window) ? $window : $(settings.container);

        // bind to scroll event
        if (settings.event.indexOf("scroll") >= 0) {
            $container.bind(settings.event, function (event) {
                update();
            });
        }

        // check and load if something apprears on resize
        $window.bind("resize", function (event) {
            update();
        });

        // load all in initial view port
        $(document).ready(function () {
            update();
        });

        this.each(function () {
            var self = this;
            var $self = $(self);
            var isLoaded = false;

            $self.one("appear", function () {
                if (!this.loaded) {
                    var url = $self.find("a.ajaxURL").attr("href");
                    $self.html('<div class="loadingIcon">&nbsp;</div>');
                    
                    $.ajax({
                        url: url,
                        success: function (result) {
                            $self.html(result);
                            if (settings.onLoad) {
                                settings.onLoad(self);
                            }
                        },
                        error: function (req) {
                            if (settings.onError) {
                                settings.onError(self);
                            }
                        }
                    });

                    self.loaded = true;

                    /* Remove element from array so it is not looped next time. */
                    var temp = $.grep(elements, function (element) {
                        return !element.loaded;
                    });
                    elements = $(temp);
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (settings.event !== "scroll") {
                $self.bind(settings.event, function (event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        function update() {
            elements.each(function () {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofscreen(this, settings)) {
                    $this.trigger("appear");
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightofscreen(this, settings)) {
                    $this.trigger("appear");
                }
            });
        };

        return this;
    }
})(jQuery, window);

if (window.console){console.log('ex time: lazyLoadByAjax.js', new Date().getTime() - startTScript);}



/*script:swfobject_2.2.js*/
var startTScript=new Date().getTime ();

var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return!a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
if (window.console){console.log('ex time: swfobject_2.2.js', new Date().getTime() - startTScript);}



/*script:package_handler.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.PackageHandler=DELL.com.Utils.PackageHandler||{};(function($){(function(){var matchCase='jsmin.ashx?set=core';var jsminVersion=null;var doc=document,htm=doc.documentElement,JS_ROOT=(window.location.host.match("localhost"))?"/ThunderaWeb/js/default/":"/js/default/",PACKAGES={ajax:{dependencies:[],source:'jsmin.ashx?set=ajax&theme=default&cmp=1&version=',onload:null,priority:1},banners:{dependencies:[],source:'jsmin.ashx?set=banners&theme=default&cmp=1&version=',onload:null,priority:1},baynote:{dependencies:[],source:'jsmin.ashx?set=baynote_core&theme=default&cmp=1&version=',onload:null,priority:1},carousel:{dependencies:[],source:'jsmin.ashx?set=carousel&theme=default&cmp=1&version=',onload:null,priority:1},eloqua:{dependencies:[],source:'jsmin.ashx?set=eloqua&theme=default&cmp=1&version=',onload:null,priority:1},fab4:{dependencies:[],source:'jsmin.ashx?set=fab4&theme=default&cmp=1&version=',onload:null,priority:1},expand_collapse_learn:{dependencies:[],source:'jsmin.ashx?set=expand_collapse_learn&theme=default&cmp=1&version=',onload:null,priority:1},fb:{dependencies:[],source:'jsmin.ashx?set=fb_core&theme=default&cmp=1&version=',onload:null,priority:1},gigya:{dependencies:[],source:'jsmin.ashx?set=gigya_core&theme=default&cmp=1&version=',onload:null,priority:1},ir:{dependencies:[],source:'jsmin.ashx?set=recommendations&theme=default&cmp=1&version=',onload:null,priority:1},jiathis:{dependencies:[],source:'http://v2.jiathis.com/code/jia.js',onload:null,priority:1},magPd:{dependencies:[],source:'jsmin.ashx?set=magPd&theme=default&cmp=1&version=',onload:null,priority:1},magCat:{dependencies:[],source:'jsmin.ashx?set=magCat&theme=default&cmp=1&version=',onload:null,priority:1},magComp:{dependencies:[],source:'jsmin.ashx?set=magComp&theme=default&cmp=1&version=',onload:null,priority:1},magCa:{dependencies:[],source:'jsmin.ashx?set=magCa&theme=default&cmp=1&version=',onload:null,priority:1},magHome:{dependencies:[],source:'jsmin.ashx?set=magHome&theme=default&cmp=1&version=',onload:null,priority:1},magFloatingBar:{dependencies:[],source:'jsmin.ashx?set=magFloatingBar&theme=default&cmp=1&version=',onload:null,priority:1},compare:{dependencies:[],source:'jsmin.ashx?set=compare&theme=default&cmp=1&version=',onload:null,priority:1},richRelevance:{dependencies:[],source:'jsmin.ashx?set=richRelevance&theme=default&cmp=1&version=',onload:null,priority:1},mediaplex:{dependencies:[],source:'jsmin.ashx?set=mediaplex&theme=default&cmp=1&version=',onload:null,priority:2},tabschegory:{dependencies:[],source:'jsmin.ashx?set=tabschegory&theme=default&cmp=1&version=',onload:null,priority:2},newtron:{dependencies:[],source:'jsmin.ashx?set=newtron&theme=default&cmp=1&version=',onload:null,priority:2},anchoredContent:{dependencies:[],source:'jsmin.ashx?set=anchoredContent&theme=default&cmp=1&version=',onload:null,priority:2},multimedia:{dependencies:[],source:'jsmin.ashx?set=multimedia&theme=default&cmp=1&version=',onload:null,priority:2},modules:{dependencies:[],source:'jsmin.ashx?set=modules&theme=default&cmp=1&version=',onload:null,priority:2},webparts:{dependencies:[],source:'jsmin.ashx?set=webparts&theme=default&cmp=1&version=',onload:null,priority:2},oas:{dependencies:[],source:'jsmin.ashx?set=oas&theme=default&cmp=1&version=',onload:null,priority:2},candyIsle:{dependencies:[],source:'jsmin.ashx?set=candyIsle&theme=default&cmp=1&version=',onload:null,priority:2},mdaBanners:{dependencies:[],source:'jsmin.ashx?set=mdaBanners&theme=default&cmp=1&version=',onload:null,priority:2},reviewSelector:{dependencies:[],source:'jsmin.ashx?set=reviewSelector&theme=default&cmp=1&version=',onload:null,priority:2},featuredBundles:{dependencies:[],source:'jsmin.ashx?set=featuredBundles&theme=default&cmp=1&version=',onload:null,priority:2},videoModals:{dependencies:[],source:'jsmin.ashx?set=videoModals&theme=default&cmp=1&version=',onload:null,priority:2},tabsProductHub:{dependencies:[],source:'jsmin.ashx?set=tabsProductHub&theme=default&cmp=1&version=',onload:null,priority:2},loadafter_lazy:{dependencies:[],source:'jsmin.ashx?set=loadafter_lazy&theme=default&cmp=1&version=',onload:null,priority:2},modals:{dependencies:[DELL.com.Utils.ModalInit,DELL.com.Utils.AutoModal],source:'jsmin.ashx?set=modals&theme=default&cmp=1&version=',onload:function(callSource){DELL.com.Utils.ModalInit.initModal();DELL.com.Utils.AutoModal.init();if(callSource!=null){if(callSource.attr('name')=='modalPopup'||callSource.attr('submitName')=='modalPopup'||callSource.hasClass('technote')||callSource.attr('name')=='prefiltersModal')
$(callSource).trigger('click');else if(callSource.attr('name')=='modalRoll'||callSource.attr('submitName')=='modalRoll'||callSource.hasClass('tooltip')){$(callSource).trigger('mouseover');}}},priority:1},chat:{dependencies:[],source:"https://chatpro.us.dell.com/netagent/proactive/proactive.aspx",onload:null,priority:2},plrisComp:{dependencies:[],source:'jsmin.ashx?set=plriscomp&theme=default&cmp=1&version=',onload:null,priority:1}}
this.interval=0;this.packageCheck=function(packageName,callSource){var package=PACKAGES[packageName];if(package.dependencies.length>0&&DELL.com.Utils.PackageHandler.packageCheckDependencies(packageName)){setTimeout(function(){DELL.com.Utils.PackageHandler.packageLoad(packageName,callSource);},50);}else{DELL.com.Utils.PackageHandler.packageLoad(packageName,callSource);}}
this.packageCheckDependencies=function(packageName){var pkgReady=false;var package=PACKAGES[packageName];for(var i=0;i<package.dependencies.length;i++){if(typeof package.dependencies[i]!='undefined'&&package.dependencies[i]!=null)
pkgReady=true;}
return pkgReady;}
this.packageLoad=function(packageName,callSource){if(jQuery){var package=PACKAGES[packageName];var pckgURL=(package.source.indexOf("http")!=-1)?package.source:JS_ROOT+package.source+jsminVersion;DELL.com.RUM.startTimer("packageLoad"+packageName);$.ajax({url:pckgURL,dataType:"script",cache:true,error:function(){DELL.com.RUM.endTimer("packageLoad"+packageName);},success:function(response){DELL.com.RUM.endTimer("packageLoad"+packageName);if(package.onload&&typeof package.onload==='function'){DELL.com.RUM.startTimer("packageCB"+packageName);package.onload(callSource);DELL.com.RUM.endTimer("packageCB"+packageName);}}});}else{}};this.onload={initialize:function(mboxId){var mbId="";if(mboxId){mbId="#"+mboxId;}
var jsminCoreSrc=$("script[src*='"+matchCase+"']").attr("src");jsminVersion=DELL.com.Utils.GetURLParamVal(jsminCoreSrc,'version');if(typeof DELL.com.Delphi.PageSettings.JSRoot!=='undefined')JS_ROOT=DELL.com.Delphi.PageSettings.JSRoot;if(typeof DELL.com.Scene7==='undefined'&&$(".inlinevideo,#inlinevideo,.inlineflash,#inlineFlash,#flickReader,div.flickReader,#mediaPlayerContainer,.mediaPlayerContainer,#scene7,.scene7PlayerEmbedLink,#productScene7Container,.productScene7Container,a[href*='swf'],a[href*='SWF'],div[rel*='swf'],div[rel*='SWF'],object[data*='swf'],object[data*='SWF'],.rssReaderContainer,#rssReaderContainer,.productHUB_scene7,#productHUB_scene7,.galleryAndVideoTab,#galleryAndVideoTab,.categoryCarousel",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("multimedia",null);}
if($(".pChat",mbId).length>0){PACKAGES["chat"].source=$(".pChat #pChatURL").val();DELL.com.Utils.Initialize(function(){DELL.com.Utils.PackageHandler.packageLoad("chat",null);},true);}
if($(".delphiCarousel",mbId).length>0||$(".rssReaderContainer").length>0){DELL.com.Utils.PackageHandler.packageLoad("carousel",null);}
if($("#baynoteObsrv",mbId).length>0)DELL.com.Utils.PackageHandler.packageLoad("baynote",null);if($(".tron,.miniptron,.pokemontron,#rotatingBanner",mbId).length>0)DELL.com.Utils.PackageHandler.packageLoad('banners',null);$("a[name='modalPopup'],a[submitName='modalPopup'],a.technote,a[name='prefiltersModal']").unbind("click").live("click",function(e){if(DELL.com.ModalWindow==null){e.preventDefault();$(this).unbind('click');DELL.com.Utils.PackageHandler.packageCheck("modals",$(this));}});$("a[name='modalRoll'],a[submitName='modalRoll'],a.tooltip:not(.anavhmc)").unbind("mouseover").live("mouseover",function(e){if(DELL.com.ModalWindow==null){e.preventDefault();$(this).unbind('mouseover');DELL.com.Utils.PackageHandler.packageCheck("modals",$(this));}});if($("a[name='modalPopupOnLoad'],#productScene7Container,.galleryAndVideoTab,#galleryAndVideoTab,#pbarcontainer a[href*='javascript:stormModal.show']",mbId).length>0){if(DELL.com.ModalWindow==null){DELL.com.Utils.PackageHandler.packageCheck("modals",null);}}
if($(".ajaxOC",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("ajax",null);}
if($("#gigya,#gigyaWidgets",mbId).length>0){DELL.com.Utils.Initialize(function(){DELL.com.Utils.PackageHandler.packageLoad("gigya",null);},true);}
if($(".jiathis",mbId).length>0){DELL.com.Utils.Initialize(function(){DELL.com.Utils.PackageHandler.packageLoad("jiathis",null);},true);}
if($("#fb-root",mbId).length>0){DELL.com.Utils.Initialize(function(){DELL.com.Utils.PackageHandler.packageLoad("fb",null);},true);}
if($("#pianoKeys",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("fab4",null);}
if($(".learnExpandCollapse",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("expand_collapse_learn",null);}
if($(".eloqua",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("eloqua",null);}
if($(".mediaplex",mbId).length>0){DELL.com.Utils.Initialize(function(){DELL.com.Utils.PackageHandler.packageLoad("mediaplex",null);},true);}
if($("#tabschegoryTabContainer",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("tabschegory",null);}
if($("#loveTabContainer",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("newtron",null);}
var IRWebpart=$("#IRWebpart:not(.active)",mbId);if(IRWebpart.length>0){IRWebpart.addClass('active');DELL.com.Utils.PackageHandler.packageLoad("ir",null);}
if(typeof DELL.com.VideoModals==='undefined'&&$("#content a[href*='modal=true']",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("videoModals",null);}
if($(".steppingStone,#steppingStone",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("tabsProductHub",null);}
if($("div[id^='oas_']",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("oas",null);}
if(typeof DELL.com.ModuleUpsell==='undefined'&&$(".modalContent,#modalContent,.modalPopup,#modalPopup,a[class*='purchase'],#facets,.categoryTiles",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("candyIsle",null);}
if($(".wpInlineBanners,#wpInlineBanners,.bannerHide,#bannerHide",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("mdaBanners",null);}
if($(".howToSubmitReview,#howToSubmitReview",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("reviewSelector",null);}
if($(".featuredDeals,#featuredDeals",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("featuredBundles",null);}
if($(".ratingsForm,#ratingsForm,.hmc,#hmc,.listToJumpMenu,.viewbyNav,#viewbyNav,a[class*='buttonJumpMenu'],.mag,.configToggle",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("modules",null);}
if($("div.ipSurvey,#ipSurvey,div.utilityToolbar,#utilityToolbar,div.franchiseTabsContainer,#franchiseTabsContainer",mbId).length>0){var ensSwtch=DELL.com.Utils.Localize('ensighten_iperceptions');ensSwtch=(ensSwtch=='ensighten_iperceptions')?'true':ensSwtch;if(typeof Bootstrapper!=='undefined'&&ensSwtch=='true')
DELL.com.Utils.PackageHandler.packageLoad("webparts",null);else
DELL.com.Utils.PackageHandler.packageLoad("webparts_ip",null);}
if(typeof DELL.com.anchoredContent==='undefined'&&$(".featuresAndSolutionsTab,#featuresAndSolutionsTab,.anchoredContentContainer,#anchoredContentContainer",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("anchoredContent",null);}
if(typeof DELL.com.SlidingAnchors==='undefined'&&$("#sliding_tabs",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("magPd",null);}
if((typeof DELL.com.Mag==='undefined'||typeof DELL.com.Mag.CategoryCarousel==='undefined')&&$("#magCategoryNav .categoryCarousel",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("magCat",null);}
if($("#magCompareTray",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("magComp",null);}
if((typeof DELL.com.Mag==='undefined'||typeof DELL.com.Mag.CandyAisle==='undefined')&&$(".snpRow",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("magCa",null);}
if($("#magGalleryContainer",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("magHome",null);}
if($("#magFloatingBar",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("magFloatingBar",null);}
if($("#compareTray",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("compare",null);}
if($("#enableRR",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("richRelevance",null);}
if($(".plris #compareGrid",mbId).length>0){DELL.com.Utils.PackageHandler.packageLoad("plrisComp",null);}
htm.className=htm.className.replace('no_js','');}};DELL.com.Utils.Initialize(this.onload);}).call(DELL.com.Utils.PackageHandler);})(jQuery);
if (window.console){console.log('ex time: package_handler.js', new Date().getTime() - startTScript);}



/*script:history.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.neoHistory=DELL.com.Utils.neoHistory||{};(function($){DELL.com.Utils.neoHistory=function(){this._curHash='';this._callback=function(hash){};this._loadFromHistory=false;this._iframeID="jQuery_history";if(document.domain.indexOf("dell.com.")==-1&&document.domain.indexOf("dell.com")!=-1)
document.domain="dell.com";else
document.domain=document.domain;};DELL.com.Utils.neoHistory.frameLoad=function(hash){$.history._loadFromHistory=true;$.history.load(hash);$.history._check();};$.extend(DELL.com.Utils.neoHistory.prototype,{init:function(callback){this._callback=callback;this._curHash=location.hash||"#!";this._callback(this._curHash.replace(/^#!+|^#/,''));if($.browser.safari){this._historyBackStack=[];this._historyBackStack.length=history.length;this._historyForwardStack=[];this._isFirst=true;this._dontCheck=false;setTimeout($.history._check,500);}else if(!$.browser.msie){setTimeout($.history._check,500);}else{$.history._check();}},_check:function(){if($.browser.safari&&navigator.userAgent.toLowerCase().indexOf('chrome')==-1){if(!$.history._dontCheck){var historyDelta=history.length-$.history._historyBackStack.length;if(historyDelta){$.history._isFirst=false;if(historyDelta<0){for(var i=0;i<Math.abs(historyDelta);i++)$.history._historyForwardStack.unshift($.history._historyBackStack.pop());}else{for(var i=0;i<historyDelta;i++)$.history._historyBackStack.push($.history._historyForwardStack.shift());}
var cachedHash=$.history._historyBackStack[$.history._historyBackStack.length-1];if(cachedHash!=undefined){$.history._curHash=location.hash;$.history._callback(cachedHash);}}else if($.history._historyBackStack[$.history._historyBackStack.length-1]==undefined&&!$.history._isFirst){if(location.hash.indexOf('#!')>=0){$.history._callback(location.hash.split('#!')[1]);}else if(location.hash.indexOf('#')>=0){$.history._callback(location.hash.split('#')[1]);}else{$.history._callback('');}
$.history._isFirst=true;}}}else{var current_hash=location.hash;if(current_hash!=$.history._curHash){$.history._curHash=current_hash;$.history._callback(current_hash.replace(/^#!|^#/,''));}}
if($.browser.safari||!$.browser.msie){setTimeout($.history._check,500);}},add:function(newHash){var $bckfrm=$("#"+$.history._iframeID),ts=new Date(),newSrc="";if($bckfrm.length){newSrc=$bckfrm.attr("src");if(typeof($bckfrm.attr("src"))!='undefined'&&$bckfrm.attr("src").indexOf("?")!=-1)
newSrc=$bckfrm.attr("src").substring(0,$bckfrm.attr("src").indexOf("?"));newSrc=newSrc+"?ts="+ts.getMilliseconds()+newHash;$bckfrm.attr("src",newSrc);}},load:function(hash){var newhash=hash;var overRidesParamVal=$.getUrlVars()["overrides"];var currentURL=window.location.href;if(!$.browser.safari){if(newhash.indexOf("#")==-1&&newhash!='')
newhash="#!"+hash;if($.browser.msie){if(currentURL.indexOf("#overrides")!=-1){newhash=newhash+"&"+DELL.com.Utils.GetURLHashVal(currentURL);}
else if(typeof(overRidesParamVal)!='undefined'&&newhash!=''&&newhash.indexOf("overrides")==-1){newhash=newhash+"&overrides="+overRidesParamVal;}}
window.location.hash=newhash;}
this._curHash=newhash;if($.browser.safari){this._dontCheck=true;this._historyBackStack.push(hash);this._historyForwardStack.length=0;this._isFirst=true;var fn=function(){$.history._dontCheck=false;};window.setTimeout(fn,200);this._callback(hash);if(newhash.indexOf("#")==-1&&newhash!='')
newhash="#!"+hash;if(currentURL.indexOf("#overrides")!=-1){newhash=newhash+"&"+DELL.com.Utils.GetURLHashVal(currentURL);}
else if(typeof(overRidesParamVal)!='undefined'&&newhash!=''&&newhash.indexOf("overrides")==-1){newhash=newhash+"&overrides="+overRidesParamVal;}
window.location.hash=newhash;}
else{this._callback(hash);if($.browser.msie){if(this._loadFromHistory==false){$.history.add(newhash);}else{this._loadFromHistory=false;}}}}});$.history=new DELL.com.Utils.neoHistory();})(jQuery);
if (window.console){console.log('ex time: history.js', new Date().getTime() - startTScript);}



/*script:history_manager.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.HistoryManager=DELL.com.Utils.HistoryManager||{};(function($){(function(){var CONSTANTS={SEPARATORS:{FRAG:'&',KEYVAL:'='},HASHTRIM:/^.*#!|^.*#/},callbacks=[],fragment='',prevFragment='',parseFragment=function(frag){var fragVals,i,l,keyAndVal,data={};frag=frag.replace(CONSTANTS.HASHTRIM,'');fragVals=frag.split(CONSTANTS.SEPARATORS.FRAG);if(fragVals.length===1&&fragVals[0]===''){return data;}
for(i=0,l=fragVals.length;i<l;i++){keyAndVal=fragVals[i].split(CONSTANTS.SEPARATORS.KEYVAL);data[keyAndVal[0]]=keyAndVal[1];}
return data;},keysHaveNewValues=function(keys){var state=parseFragment(fragment),prevState=parseFragment(prevFragment),atLeastOneKeyHasANewValue=false,i,l;for(i=0,l=keys.length;i<l;i++){if(prevState[keys[i]]!==state[keys[i]]){atLeastOneKeyHasANewValue=true;}}
return atLeastOneKeyHasANewValue;},invokeCallbackObj=function(callbackObj){var param={},state=parseFragment(fragment);$.each(callbackObj.keys,function(){param[this]=state[this];});callbackObj.callback(param);},handleFragmentChange=function(frag){var i,l;prevFragment=fragment;fragment=frag;for(i=0,l=callbacks.length;i<l;i++){if(keysHaveNewValues(callbacks[i].keys)){invokeCallbackObj(callbacks[i]);}}},getNewFragmentWithData=function(data){var s=fragment,re;$.each(data,function(key,value){if(s.indexOf(key+CONSTANTS.SEPARATORS.KEYVAL)!==-1){re=new RegExp('(&?'+key+CONSTANTS.SEPARATORS.KEYVAL+')[^&]*');if(value!==null){s=s.replace(re,'$1'+value);}else{s=s.replace(re,'');}}else if(value!==null){s+=(s===''?'':CONSTANTS.SEPARATORS.FRAG)+
key+CONSTANTS.SEPARATORS.KEYVAL+value;}});return s;},register=function(keys,callback){var callbackObj;if(typeof keys==='string'){keys=[keys];}
callbackObj={callback:callback,keys:keys};initHistory();callbacks.push(callbackObj);invokeCallbackObj(callbackObj);},load=function(data,loadWithoutNewHistoryEntry){var newFrag=getNewFragmentWithData(data);if(!loadWithoutNewHistoryEntry){$.history.load(newFrag);}else{handleFragmentChange(newFrag);}};initHistory=function(){var context=DELL.com.Utils.Context.$LEFTNAV||$("#navContent");if($("#navContent").length<=0)
context=DELL.com.Utils.Context.$SECONDARYCONTAINER||$("#secondaryContent");if(context.size()<=0||this.HMFLoaded)
return;this.HMFLoaded=true;$.history.init(handleFragmentChange);};this.register=register;this.load=load;this.HMFLoaded=false;}).apply(DELL.com.Utils.HistoryManager);})(jQuery);
if (window.console){console.log('ex time: history_manager.js', new Date().getTime() - startTScript);}



/*script:search.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};(function($){DELL.com.Utils.search=function(){var search=function(object){var url,queryStrNavParam;var isSorting=false;object=object||{};if(typeof object==="string"){var string=object;object={filter:string};}
try{queryStrNavParam=jQuery.grep(document.location.search.substring(1).split('&'),function(n){return n.indexOf('navs=')===0;})[0].substring(5);}catch(e){queryStrNavParam='';}
if(isNaN(object.page))
{object.page=1;DELL.com.Utils.HistoryManager.load({p:1});}
var LWP=DELL.com.Utils.getLWP();var ps=DELL.com.Delphi.PageSettings;var prefix=vars.searchType=="product"?'ProductSearch.svc/search':'documentsearch.svc/t/';var params={root:object.root||ps.APIRoot,thunderaPrefix:prefix,category:object.category||$(CONSTANTS.SELECTORS.SEARCHCATEGORY).text()||ps.CategoryID,delphiPrefix:'/sq_delphi_listing',xform:object.xform||"search_results",filter:window.encodeURIComponent(object.filter)||queryStrNavParam,keyword:window.encodeURIComponent(object.keyword)||null,sort:object.sort||$(CONSTANTS.SELECTORS.SEARCHSORTDEFAULT).text()||"-docdatetime,-dt2",results:object.results||$(CONSTANTS.SELECTORS.SEARCHHITS).val()||$(CONSTANTS.SELECTORS.SEARCHHITS).text()||ps.pageSize,page:object.page||null,layout:object.layout||$(CONSTANTS.SELECTORS.RESULTSLAYOUT).text().toLowerCase()||"list",xsltParams:object.xsltParams||$(CONSTANTS.SELECTORS.XSLTPARAMS).val()||null,sortSelected:$(CONSTANTS.SELECTORS.SEARCHSORT).val()||null};if(object.keyword){params.filter+=window.encodeURIComponent("&k="+object.keyword);}
if(vars.defaultResultsPerPage==null)
vars.defaultResultsPerPage=params.results;if(params.filter==vars.currentFilter)
isSorting=true;else
vars.currentFilter=params.filter;if(vars.searchType=="product"){url=params.root+params.thunderaPrefix+"?catid="+params.category;if($(".magFacets").length>0){url+="&cTemplate=search/mag/anav_results_mag";}
else if(params.layout=="list"){url+="&cTemplate=search/anav_search_results";}
else{url+="&cTemplate=search/anav_search_results_grid";}
url+="&sort="+params.sort+"&pageSize="+params.results+"&navs="+params.filter+"&layout="+params.layout;vars.resultsLayout=params.layout;}
else{params.filter=queryStrNavParam.length>0?queryStrNavParam+window.encodeURIComponent("&")+params.filter:params.filter;url=params.root+params.thunderaPrefix+params.category+params.delphiPrefix+"?hits="+params.results+"&xform="+params.xform+"&sort="+params.sort+"&sqp="+params.filter;}
if(params.xsltParams){url+='&xParams='+params.xsltParams;}
if(params.page){url+="&page="+params.page;}
url+=LWP;$.ajax({url:url,type:"GET",error:function(req){utils.unbindLoaderFromMouse();vars.$body.trigger("killAnimations");var HM=DELL.com.Utils.HistoryManager;var msg=$(CONSTANTS.HTML.ERROR),target=$("#"+CONSTANTS.IDS.TARGET);replacedContentExists=($('#'+CONSTANTS.IDS.REPLACED_CONTENT).children().length>0)
msg.find("#applicationContent").append(DELL.com.Utils.Localize('error_anav_search'));if(!($('#'+CONSTANTS.IDS.REPLACED_CONTENT).children().length>0)){target.children().appendTo('#'+CONSTANTS.IDS.REPLACED_CONTENT);}
HM.load({navigators:params.filter},true);utils.errorEventListener(msg);target.empty().append(msg);utils.fadeInBody(vars.searchType);DELL.com.FacetedNav.disableFacets(false);},success:function(req){utils.unbindLoaderFromMouse();vars.$body.trigger("killAnimations");utils.fadeInBody(vars.searchType);var container=CONSTANTS.HTML.CONTAINER,output=container.BEGIN+req+container.END,target=$("#"+CONSTANTS.IDS.TARGET),replacedContentExists=($('#'+CONSTANTS.IDS.REPLACED_CONTENT).children().length>0),selectVal,newSearch;var $output;if($(CONSTANTS.SELECTORS.SEARCHPREFIX).text()=="product"){var HM=DELL.com.Utils.HistoryManager,jsonObj="";if($().jquery.match(/1.4./gi)||$().jquery.match(/1.7./gi))
jsonObj=req;else
jsonObj=(new Function("return"+req))();output=jsonObj.ProductsHtml;vars.currentResultOffset=(params.page-1)*params.results;HM.load({navigators:jsonObj.ValidNavigators.join(',')},true);$output=$(output);}
if(!object.page&&!object.sort){target.hide();}
if(params.sortSelected==null){if(object.sort){selectVal=object.sort;}else{selectVal=params.sort;}}else{if(object.sort){selectVal=object.sort;}else if(params.sort){selectVal=params.sort;}else{selectVal="-"+params.sortSelected;}}
newSearch=$output||$(output);utils.getSortElem(newSearch).val(selectVal);utils.getPerPageElem(newSearch).val(params.results);utils.errorEventListener(newSearch);if(!!object.target){replace=(object.target.find(CONSTANTS.SELECTORS.RESULTS).length>0);}else{if(!replacedContentExists){$('#replacedContent').show();target.children().appendTo('#'+CONSTANTS.IDS.REPLACED_CONTENT);setTimeout(function(){$('#replacedContent').hide();},1000);}
target.empty().append(newSearch).append('<input id="'+CONSTANTS.IDS.FILTER+'" type="hidden" value="'+params.filter+'" />');DELL.com.FacetedNav.FacetsCollector.updateMagBreadCrumb();if($('.mag').length>0){DELL.com.Mag.Anav.AnavEvents();}
focusLink=$('<a href="" class="invisible" name="content">Content</a>');target.prepend(focusLink);focusLink.focus();}
if(!object.page&&!object.sort){target.fadeIn("slow");}
DELL.com.FacetedNav.disableFacets(false);utils.sortEventListener();utils.paginationEventListener();utils.resultsPerPageEventListener();utils.layoutEventListener();try{DELL.com.Init.InitLinks();if(typeof optimizeButtonsForIE6!='undefined')optimizeButtonsForIE6(true);var newSearch=$('#newSearch');if(newSearch.length){keyParam=DELL.com.Utils.GetURLParamVal(window.location.toString(),"keyword"),keyword=keyParam!=""?"&k="+keyParam:"";var searchUrl="http://search.dell.com/results.aspx?&c="+ps.lwp.Country+"&l="+ps.lwp.Language+"&s="+ps.lwp.Segment+"&cs="+ps.lwp.CustomerSet+keyword+"&cat=all&x=0&y=8";newSearch.find("a").attr({href:searchUrl});}}catch(err){console.log(err);}
setTimeout(function(){$('body > div > .OoyalaVideoPlayer').parent().remove();},1000);}});},CONSTANTS={HTML:{CONTAINER:{BEGIN:'<div id="facetSearchResults" class="verticalSubsection">',END:'</div>'},LOADER:'<div id="loadingContainer" class="modalLoad"></div>',ERROR:'<div class="verticalSubsection"><div id="applicationContent"></div></div>'},IDS:{TARGET:"primaryAjaxHook",FILTER:"currentFilterType",REPLACED_CONTENT:"replacedContent",LOADER:"loadingContainer",PRIMARYCONTAINER:"primaryContent"},SELECTORS:{TARGET:"#primaryAjaxHook",RESULTS:".searchResults",SEARCHHITS:"#searchHits",SEARCHCATEGORY:"#searchCategory",SEARCHSORTDEFAULT:"#searchSortDefault",XSLTPARAMS:"#search_xsltparams",SEARCHPREFIX:"#searchPrefix",RESULTSLAYOUT:"#resultsLayout",SEARCHRPP:".itemsPerPage",SEARCHSORTBY:".resultsSortBy",SEARCHSORT:"#searchSort"},LOADER:{XOFFSET:11,YOFFSET:26}},vars={$body:null,$leftNav:null,$primaryContainer:null,searchType:"document",recentResultsPerPage:null,currentResultOffset:null,isSorting:false,loaderContainer:null,mouseCoordinates:null},utils={sortEventListener:function(){var select=utils.getSortElem(),target=select.parents(".container").eq(0);select.bind("change",function(e){var sQuery={sort:this.value,p:1,navigators:null},oFacets=$("#searchFacets").attr("value")||"";if(oFacets.length>0){$.extend(sQuery,{facets:oFacets});}
DELL.com.Utils.HistoryManager.load(sQuery);});$(CONSTANTS.SELECTORS.SEARCHSORTBY).one("click",function(e){e.stopPropagation();utils.bindToMouse();});},resultsPerPageEventListener:function(){var select=utils.getPerPageElem();select.bind("change",function(e){var newPage=Math.floor(vars.currentResultOffset/this.value)+1;DELL.com.Utils.HistoryManager.load({results:this.value,p:newPage,navigators:null});});$(CONSTANTS.SELECTORS.SEARCHRPP).one("click",function(e){e.stopPropagation();utils.bindToMouse();});},paginationEventListener:function(){var link=$("#"+CONSTANTS.IDS.TARGET+" .pagination a"),target=link.parents(".container").eq(0);link.bind("click",function(e){var $obj=$(this),oUrl=$obj.attr("href"),oFacets=DELL.com.Utils.GetURLParamVal(oUrl,"facets"),oSort=utils.getSortElem(),sQuery={p:$obj.attr("rel"),navigators:null};vars.mouseCoordinates={x:e.pageX,y:e.pageY};e.preventDefault();if(oFacets.length>0){$.extend(sQuery,{facets:oFacets});}
if(oSort.length>0){if(oSort.get(0).value.length>0){$.extend(sQuery,{sort:oSort.get(0).value});}}
DELL.com.Utils.HistoryManager.load(sQuery);});},layoutEventListener:function(){var layoutLink=$("#"+CONSTANTS.IDS.TARGET+" #viewType a");$("#viewType").find("a."+vars.resultsLayout+"View").addClass("active");layoutLink.bind("click",function(e){vars.resultsLayout=$(this).attr("rel").toLowerCase();var oUrl=location.href,oFacets=DELL.com.Utils.GetURLParamVal(oUrl,"facets"),oSort=DELL.com.Utils.GetURLParamVal(oUrl,"sort"),pageNum=DELL.com.Utils.GetURLParamVal(oUrl,"p"),sQuery={navigators:null};if(pageNum.length>0)
$.extend(sQuery,{p:pageNum});if(oSort.length>0)
$.extend(sQuery,{sort:oSort});if(oFacets.length>0)
$.extend(sQuery,{facets:oFacets});$.extend(sQuery,{layout:vars.resultsLayout});vars.mouseCoordinates={x:e.pageX,y:e.pageY};e.preventDefault();DELL.com.Utils.HistoryManager.load(sQuery);});},getSortElem:function(context){if(!context){context=$(CONSTANTS.SELECTORS.TARGET);}
var $dropdowns=context.find(CONSTANTS.SELECTORS.SEARCHSORTBY+" > select");if($dropdowns.size()>0)
return $dropdowns;else
return context.find("select#PREFIXsortbySearchResults");},getPerPageElem:function(context){if(!context)
context=$(CONSTANTS.SELECTORS.TARGET);return context.find(CONSTANTS.SELECTORS.SEARCHRPP+" > select");},errorEventListener:function(content){var b=content.find("a.invalidNavigatorsBack");if(b.size()>0){b.click(function(e){e.preventDefault();history.go(-1);});content.find("a.invalidNavigatorsReset").click(function(e){e.preventDefault();var HM=DELL.com.Utils.HistoryManager;HM.load({facets:"",p:1,sort:null,navigators:null,results:null});});}},stateChangeListener:function(data){var children,target=$(CONSTANTS.SELECTORS.TARGET);if(!data.facets&&!data.keyword&&!data.p&&!data.sort){children=$('#'+CONSTANTS.IDS.REPLACED_CONTENT).children();if(children.length>0){target.hide();target.empty().append(children);target.find("select#PREFIXsortbySearchResults").val('');target.fadeIn("slow",function(){vars.$body.trigger("restartAnimations");});}
return false;}
DELL.com.FacetedNav.disableFacets(true);if(vars.$body.find('#'+CONSTANTS.IDS.LOADER).size()<=0){vars.$body.prepend(CONSTANTS.HTML.LOADER);vars.loaderContainer=$('#'+CONSTANTS.IDS.LOADER);}
utils.unbindFromMouse();utils.bindLoaderToMouse();utils.fadeOutBody(vars.searchType);search({filter:DELL.com.FacetedNav.getSearchString(data.facets),keyword:data.keyword,sort:data.sort,page:data.p,results:data.results,layout:data.layout});if($(window)._scrollable().scrollTop()>target.offset().top){$.scrollTo(target.offset().top-10,{duration:1000,easing:'easeInOutQuad'});}},updateLoaderPosition:function(e){var xPos=e.pageX+e.data.offset.x;var yPos=e.pageY+e.data.offset.y;vars.loaderContainer.css({"left":xPos+"px","top":yPos+"px"});},bindLoaderToMouse:function(mousePosition){if(vars.loaderContainer==null)
vars.loaderContainer=$('#'+CONSTANTS.IDS.LOADER);utils.setStartingLoaderPosition();vars.loaderContainer.css("visibility","visible").show();vars.$body.bind('mousemove',{offset:{x:CONSTANTS.LOADER.XOFFSET,y:CONSTANTS.LOADER.YOFFSET}},utils.updateLoaderPosition);},unbindLoaderFromMouse:function(){vars.loaderContainer.hide();vars.$body.unbind('mousemove',utils.updateLoaderPosition);},bindToMouse:function(){vars.$body.bind('mousemove.combobox',utils.setMouseCoordinates);},unbindFromMouse:function(){vars.$body.unbind('mousemove.combobox',utils.setMouseCoordinates);},fadeOutBody:function(type){switch(type.toLowerCase()){case"product":$('#searchOverlay').css({"opacity":0,"display":"block","height":$("#applicationContent").height()+9}).fadeTo(500,0.5);break;default:DELL.com.Utils.Context.$PRIMARYCONTAINER.fadeTo(500,0.5);}},fadeInBody:function(type){switch(type.toLowerCase()){case"product":var obj=$('#searchOverlay');obj.fadeTo(500,0,function(){obj.css({"display":"none"});});break;default:DELL.com.Utils.Context.$PRIMARYCONTAINER.fadeTo(500,1,function(){if($.browser.msie)
var s=DELL.com.Utils.Context.$PRIMARYCONTAINER[0].style.removeAttribute("filter");});}},setStartingLoaderPosition:function(){var position=DELL.com.FacetedNav.getMouseClickCoordinates()||vars.mouseCoordinates;if(position!=null)
utils.updateLoaderPosition({pageX:position.x,pageY:position.y,data:{offset:{x:CONSTANTS.LOADER.XOFFSET,y:CONSTANTS.LOADER.YOFFSET}}});},setMouseCoordinates:function(params){var xPos=params.pageX||params.x;var yPos=params.pageY||params.y;try{vars.mouseCoordinates={x:xPos,y:yPos};}catch(err){}}},onload={initObjects:function(){vars.$body=DELL.com.Utils.Context.$BODY||$("body");vars.$leftNav=DELL.com.Utils.Context.$LEFTNAV||$("#navContent");vars.$primaryContainer=DELL.com.Utils.Context.$PRIMARYCONTAINER||$("#primaryContent, #franchisePrimaryContent");vars.searchType=$(CONSTANTS.SELECTORS.SEARCHPREFIX).text().toLowerCase();vars.resultsLayout=$(CONSTANTS.SELECTORS.RESULTSLAYOUT).text().toLowerCase();},initNoResultsLink:function(){var newSearch=vars.$primaryContainer.find('#newSearch');if(newSearch.length){var ps=DELL.com.Delphi.PageSettings;var searchUrl="http://search.dell.com/results.aspx?&c="+ps.lwp.Country+"&l="+ps.lwp.Language+"&s="+ps.lwp.Segment+"&cs="+ps.lwp.CustomerSet+"&k="+DELL.com.Utils.GetURLParamVal(window.location.toString(),"keyword")+"&cat=all&x=0&y=8";newSearch.find("a").attr({href:searchUrl});}},attachListeners:function(){try{utils.sortEventListener();utils.paginationEventListener();utils.resultsPerPageEventListener();utils.layoutEventListener();}catch(e){};},registerHistoryCallbacks:function(){var HM=DELL.com.Utils.HistoryManager,keys=['facets','keyword','sort','p','results','layout'];HM.register(keys,utils.stateChangeListener);},resetSearchSort:function(){try{if(!$("select#PREFIXsortbySearchResults:has(option[selected='selected'])")){utils.getSortElem().attr("selectedIndex",0);}}catch(e){};}};DELL.com.Utils.Initialize(onload);return search;}();})(jQuery);
if (window.console){console.log('ex time: search.js', new Date().getTime() - startTScript);}



/*script:localization.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};(function($){(function(){var undefined,L10n={stringTables:{}};if(DELL.com.Resources){JSTextBank='thundera-ui-js';L10n.stringTables=DELL.com.Resources[JSTextBank];DELL.com.Resources=undefined;}
L10n.localize=function(string){if(this.stringTables[string]!==undefined){return this.stringTables[string];}
return string;}
DELL.com.Utils.Localize=function(string){return L10n.localize(string);};})();})(jQuery);
if (window.console){console.log('ex time: localization.js', new Date().getTime() - startTScript);}



/*script:lazyImages.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.LazyImages=DELL.com.LazyImages||{};(function($){(function(){this.winLoaded=(document.readyState==='complete');this.init=function(){DELL.com.LazyImages.loadFirst();DELL.com.Utils.Initialize(DELL.com.LazyImages.loadSecond,true);$(document).ajaxSuccess(function(e,i,s){try{if(i.responseText==''||i.responseText.indexOf("data-origsrc=")==-1)return;if(DELL.com.LazyImages&&typeof DELL.com.LazyImages.loadFirst==='function')DELL.com.LazyImages.loadSecond();}catch(e){}});};this.loadImages=function(checkViewport){var pending=$("img[data-origsrc]");var l=pending.length;for(i=0;i<l;i++){if(!checkViewport||(checkViewport&&DELL.com.Utils.inViewport(pending[i]))){pending[i].src=pending[i].getAttribute('data-origsrc');pending[i].removeAttribute('data-origsrc');}}};this.loadFirst=function(){DELL.com.LazyImages.loadImages(false);};this.loadSecond=function(){setTimeout(function(){DELL.com.LazyImages.loadImages(true)},100);};DELL.com.Utils.Initialize(DELL.com.LazyImages.init);}).call(DELL.com.LazyImages);})(jQuery);
if (window.console){console.log('ex time: lazyImages.js', new Date().getTime() - startTScript);}



/*script:faceted_nav.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.FacetedNav=DELL.com.FacetedNav||{};DELL.com.FacetedNav.FacetsCollector={};(function($){(function(){var CONSTANTS={ACTIVECLASS:'active',DISABLEDCLASS:'disabled',CONFLICTCLASS:'conflict',SEARCHPREFIX:"#searchPrefix"},selectors={facetsLinks:'.group a'},searchType=$(CONSTANTS.SEARCHPREFIX).text().toLowerCase(),menuElement,activeFacets=[],maxVisibleElements=5,historyInitialized=false,disableFacets=false,mouseCoordinates=null,suppressCollector;function initialize(){menuElement=$('#menu1');suppressCollector=menuElement.is('.suppressCollector');if(menuElement.length>0){menuElement.find('li.category').each(function(){var categoryContainer=$(this),categoryElement=categoryContainer.find('a.category'),facetsElements=categoryContainer.find('.group a'),categoryID=categoryElement.attr('rel'),isCollectable=!suppressCollector&&(facetsElements.length>maxVisibleElements);if(isCollectable){DELL.com.FacetedNav.FacetsCollector.implement(categoryContainer,facetsElements);}
facetsElements.each(function(){initializeFacetData($(this),{Category:categoryID,isCollectable:isCollectable});});categoryElement.click(function(e){e.preventDefault();toggleCategory(categoryContainer);return false;});});menuElement.find('.group a').live('click',DELL.com.FacetedNav.facetEventHandler);menuElement.find('.facetSearchBox');DELL.com.Utils.HistoryManager.register('facets',initializeMarkedFacets);DELL.com.Utils.HistoryManager.register('facets',onFacetUpdate);DELL.com.Utils.HistoryManager.register('navigators',onNavigatorUpdate);$('a.aNavClearAll').bind('click',function(e){DELL.com.Utils.HistoryManager.load({facets:null,sort:null,p:null,navigators:null,layout:null});e.preventDefault();});}}
function initializeFacetData(facetLink,overrideData){var categoryID=facetLink.parent().attr('className'),facetID=facetLink.attr('rel');facetLink.data('FacetedNav',{Category:categoryID||overrideData.Category,Facet:facetID,isCollectable:overrideData.isCollectable});}
function onFacetUpdate(data){if(historyInitialized)
{var selectArr,facets=data.facets||'';selectArr=facets.split(',');if(facets.length<=0){activeFacets=[];$("#magAnavBreadCrumb").html("");$(".magAnavClearAll").hide();$('div.plris .catTiles').show();$('div.plris .grayTilesBackground').show();$('div.plris #plrsNav.brandPlrsNav #filterModels').show();$('#plrsNav').removeClass('disabled');$('#magCategoryNav').removeClass('active');}else{$('div.plris .catTiles').hide();$('div.plris .grayTilesBackground').hide();$('div.plris #plrsNav.brandPlrsNav #filterModels').hide();$('#plrsNav').addClass('disabled');$('#magCategoryNav').addClass('active');}
menuElement.find(selectors.facetsLinks).each(function(){var $this=$(this),rel=$this.attr('rel'),fData=$this.data("FacetedNav");if($.inArray(rel,selectArr)!==-1){$this.addClass(CONSTANTS.ACTIVECLASS);if(fData!=null&&fData.Facet!=""&&$.inArray(fData,activeFacets)===-1){activeFacets.push(fData);}
if(fData!=null&&fData.isCollectable){DELL.com.FacetedNav.FacetsCollector.toggleItem($this);}}else{if(rel!=="keywordFacet"){$this.removeClass(CONSTANTS.ACTIVECLASS);}}});for(var i=0,l=activeFacets.length;i<l;i++)
{if(activeFacets[i]!=undefined)
{if($.inArray(activeFacets[i].Facet,selectArr)===-1)
activeFacets.splice(i,1);}}
updateMagFacetCount();}}
function onNavigatorUpdate(data){if(data.navigators==undefined)
{menuElement.find(selectors.facetsLinks).each(function(){$(this).removeClass(CONSTANTS.DISABLEDCLASS+" "+CONSTANTS.CONFLICTCLASS);});return;}
var selectArr,validNavigators=data.navigators;selectArr=validNavigators.split(',');menuElement.find(selectors.facetsLinks).each(function(){var $this=$(this),rel=$this.attr('rel');if($.inArray(rel,selectArr)!==-1){$this.removeClass(CONSTANTS.DISABLEDCLASS+" "+CONSTANTS.CONFLICTCLASS);}else if($.inArray(rel,selectArr)==-1&&$this.hasClass(CONSTANTS.ACTIVECLASS)){$this.removeClass(CONSTANTS.DISABLEDCLASS);$this.addClass(CONSTANTS.CONFLICTCLASS);}
else if($this.hasClass("magNavHmc")){$this.removeClass(CONSTANTS.DISABLEDCLASS);}
else{$this.addClass(CONSTANTS.DISABLEDCLASS);}});}
function initializeMarkedFacets(data){if(historyInitialized){return false;}
historyInitialized=true;if(!data.facets){return false;}
var facets=data.facets.split(','),facetValue;for(var i=facets.length-1;i>=0;i--){facetValue=facets[i];toggleFacet(menuElement.find('a[rel="'+facetValue+'"]'));}
var pageNum=DELL.com.Utils.GetURLParamVal(window.location.href,"p");dispatchSearch(pageNum);}
function toggleFacet(facetLink,logMetrics){if(logMetrics){if(facetLink.is('.disabled')){return false;}}
var facetData=facetLink.data('FacetedNav');facetLink.toggleClass('active');if(facetLink.is('.active')){activeFacets.push(facetData);}else{for(var i=activeFacets.length-1;i>=0;i--){if(activeFacets[i]==facetData){activeFacets.splice(i,1);break;}}
var selectionList=facetLink.parents('.facetsCollector').find('div.selectionList'),items=selectionList.find('ul'),item,facetData;facetData=facetLink.data('FacetedNav');items.find('a[rel="'+facetData.Facet+'"]').parent().remove();if(activeFacets.length==0){$('div.selectionList').css('display','none');}}
if(logMetrics)
{var facetTitle=facetLink.parents("li.category:first").find("a.category:first").text(),metricsID=facetLink.text(),CurrentCategoryNode=DELL.com.Delphi.PageSettings.mi.CurrentCategoryNode;if(CurrentCategoryNode!=null&&CurrentCategoryNode!="")
facetTitle=CurrentCategoryNode+":"+facetTitle;DELL.com.Utils.Metrics.logAnavMetrics(facetTitle,metricsID);}}
function updateMagFacetCount()
{if($(".magFacets").length>0)
{$(".magFacets").find("li.category").each(function(){var $this=$(this);var count=$this.find("li a.active").length;if(count>0){$this.find(".facetCatCount").html("("+count+")");}else{$this.find(".facetCatCount").html("");}});}}
function toggleFacetCategory(categoryLink)
{if($(".magFacets").length>0)
{$(".magFacets li.category").not("#"+categoryLink.parent().attr("id")).addClass("active");$(".magFacets ul.group").hide();categoryLink.siblings().not(".tooltipanav").css("display","inline-block");}}
function toggleCategory(categoryContainer){var categoryLink=categoryContainer.find('a.category');if(categoryLink.is('.disabled')){return false;}
categoryContainer.toggleClass('active');categoryLink.siblings().not(".tooltipanav").slideToggle('normal');toggleFacetCategory(categoryLink);if($.browser.msie){categoryLink[0].hideFocus=true;}}
function dispatchSearch(pageNum){var search,searchString=DELL.com.FacetedNav.getHistoryManagerString();if(searchString){search={facets:searchString,p:pageNum||1,navigators:null};}else{search={facets:null,p:null,sort:null,navigators:null};}
DELL.com.Utils.HistoryManager.load(search);}
this.facetEventHandler=function(e){e.preventDefault();var fl=$(this);if(fl.hasClass(CONSTANTS.DISABLEDCLASS)||disableFacets||fl.hasClass("magNavHmc"))
return false;toggleFacet(fl,true);dispatchSearch();mouseCoordinates={x:e.pageX,y:e.pageY};return false;}
this.getSearchString=function(data){var facets=data||'',searchString='',menuElement=menuElement||$('#menu1');if(searchType==="product")
{searchString=facets.split(',');}
else
{facets=facets.split(',');for(var i=0,l=facets.length;i<l;i++)
{var facet=facets[i];var fl=menuElement.find('a[rel="'+facet+'"]');var catID=fl.parents("li.category:first").find("a.category:first").attr("rel");if(searchString.length>0)
searchString+="&";searchString+=catID+"="+facet;}}
return searchString;};this.disableFacets=function(val){disableFacets=val;if(!val)
{if(searchType!=="product")
onNavigatorUpdate({navigators:null});return;}
var menuElement=menuElement||$('#menu1'),facets=menuElement.find(selectors.facetsLinks);facets.each(function(){$(this).addClass(CONSTANTS.DISABLEDCLASS);});};this.getMouseClickCoordinates=function(){var temp=mouseCoordinates;mouseCoordinates=null;return temp;};this.getHistoryManagerString=function(){var searchString='';for(var i=activeFacets.length-1;i>=0;i--){searchString+=','+activeFacets[i].Facet;}
return searchString.substring(1);};var onload={init:initialize};DELL.com.Utils.Initialize(onload);}).call(DELL.com.FacetedNav);(function(){var collectorsInitialized=false,facetsCollector='<div class="facetsCollector">'+'<form class="searchBox"> <label>{find_a_value}</label> <div class="facetsSearchBox"><input value="{enter_text}" class="facetsSearch" /></div> <input type="submit" value="{search}" class="invisible" /> </form>'+'<div class="facetsPanel"> <span class="noMatches" style="display: none"></span></div>'+'<div class="selectionList" style="display: none"> <span>{currently_selected}</span> <ul class="group"></ul> </div> </div>',facetCollectorGroups=[],sNoMatches=DELL.com.Utils.Localize('text_no_matches');facetsCollected=[];facetsCollector=facetsCollector.replace('{find_a_value}',DELL.com.Utils.Localize('facets_find_a_value')).replace('{enter_text}',DELL.com.Utils.Localize('facets_find_content_type')).replace('{search}',DELL.com.Utils.Localize('facets_search')).replace('{currently_selected}',DELL.com.Utils.Localize('facets_currently_selected'));this.implement=function(categoryContainer,facetsElements){var facetsList=facetsElements.parents('ul.group').remove();facetCollectorGroups.push({searchBox:null,facetCollector:$(facetsCollector).find('.facetsPanel').append(facetsList).end().appendTo(categoryContainer),facetList:null,noMatches:null});collectorsInitialized=true;};this.updateMagBreadCrumb=function()
{$("#magAnavBreadCrumb").html("");$(".magAnavClearAll").hide();if($(".magFacets").length>0&&$('#currentFilterType').length>0&&$('#currentFilterType').val().length>0)
{$(".magFacets#facets ul.facetContent li.category").each(function(index){var conflictCount=$(this).find("ul.group a.conflict").length;if(conflictCount>0)
{$(this).find(".facetCatCount").addClass("conflict");}
else
{$(this).find(".facetCatCount").removeClass("conflict");}});var currentFilterSet=$("#currentFilterType").attr('value').split("%2C");$.each(currentFilterSet,function(index,data){var linkFilter=$("a[rel='"+data+"']");var conflictClass=(linkFilter.hasClass("conflict"))?" conflict":"";var linkFilterText=$("a[rel='"+data+"']").html();var pipe="";if(index!=0)
{pipe=" | ";}
$("#magAnavBreadCrumb").append("<span class='facetText"+conflictClass+"'>"+pipe+linkFilterText+"</span>");$("<span/>",{"class":"removeFacet",text:"",click:function(e){e.preventDefault();linkFilter.click();}}).appendTo("#magAnavBreadCrumb");});$(".magAnavClearAll").show();if($(".magResetFilters").length>0)
{$(".magResetFilters").click(function(){$(".aNavClearAll").click();$(".magAnavClearAll .aNavClearAll").click();});}}};this.toggleItem=function(facetLink){var selectionList=facetLink.parents('.facetsCollector').find('div.selectionList'),items=selectionList.find('ul'),item,facetData;if(facetLink.is('.active')){facetData=facetLink.data('FacetedNav');if(items.find('a[rel="'+facetData.Facet+'"]').size()<=0){item=facetLink.parent().clone();var tmp=facetLink.parent().data("originalText");if(tmp!=null){item.find("a").html(tmp);}
item.click(function(e){return DELL.com.FacetedNav.facetEventHandler.call(facetLink,e);});items.append(item);}}else{facetData=facetLink.data('FacetedNav');items.find('a[rel="'+facetData.Facet+'"]').parent().remove();}
selectionList.toggle(items.children().length>0);}
function setupInstances(){var searchBoxes=$('form.searchBox'),count=0,timeout=null;searchBoxes.submit(function(e){var $this=$(this),input=$this.find('.facetsSearch'),facets=$this.parents('div.facetsCollector').find('.facetsPanel li');facets.filter('.matchedFacet').find('a').click();input.val('');return false;}).find('.facetsSearch').each(function(){var $this=$(this);$this.data({defaultValue:$this.val(),group:count}).keydown(function(e){switch(e.which){case 37:case 38:case 39:case 40:case 9:case 13:break;default:if(timeout){clearTimeout(timeout);}
timeout=setTimeout(function(){filterResults($this);},10);break;}}).keyup(searchEventHandler).focus(function(){if($this.val()===$this.data('defaultValue')){$this.val('');$this.addClass('active');}}).blur(function(){if($this.val()===''){$this.val($this.data('defaultValue'));$this.removeClass('active');}});count++;});}
function completeField(){}
function filterResults(inputField){var groupObj=facetCollectorGroups[inputField.data("group")],partialText=inputField.val().toLowerCase(),group=groupObj.facetList,matchedText="",noMatchText=groupObj.noMatches;hasMatches=false;if(group==null)
{group=groupObj.facetList=$(groupObj.facetCollector).find(".facetsPanel li").map(function(){return $(this);});}
for(var i=0;i<group.length;i++)
{var obj=group[i],matchedText="",startIndex=-1;if(obj.data("originalText")==null){matchedText=obj.text();obj.data({originalText:obj.text()});}
else{matchedText=obj.data("originalText");}
startIndex=matchedText.toLowerCase().indexOf(partialText);if(startIndex>=0){var s=matchedText,l=startIndex+partialText.length,tmp=s.slice(0,startIndex)+"<span class=\"highlight\">"+s.slice(startIndex,l)+"</span>"+s.slice(l);if(obj.data("originalText")==null)
obj.data({originalText:s});obj.find("a").html(tmp);obj.show();hasMatches=true;}
else{obj.find("a").html(matchedText);obj.hide();}}
if(!hasMatches){if(noMatchText==null){noMatchText=groupObj.noMatches=$(groupObj.facetCollector.find(".noMatches"));}
noMatchText.html(sNoMatches+": '<span class=\"highlight\">"+partialText+"</span>'").show();}
else{if(noMatchText!=null){noMatchText.hide();}}}
function searchEventHandler(e){var $this=$(this),val=$this.val(),facets=$this.parents('div.facetsCollector').find('.facetsPanel a'),matchClasses={matched:'matchedFacet',unmatched:'unmatchedFacet'},searchString=new RegExp(val,'i');facets.parent().removeClass(matchClasses.matched+' '+matchClasses.unmatched);if(!val||val===$this.data('defaultVal')||e.keyCode===13){return;}
facets.each(function(){var $facet=$(this),match=$facet.text().match(searchString),classID=match?'matched':'unmatched'
$facet.parent().addClass(matchClasses[classID]);});$this.focus();}
DELL.com.Utils.Initialize({initialize:function(){if(collectorsInitialized){setupInstances();}}});}).call(DELL.com.FacetedNav.FacetsCollector);DELL.com.Utils.Initialize({initializeSearch:function(){var undefined,keywordSearch={initialized:false,module:$('#keywordSearch'),form:$('#keywordSearch form'),list:$('#keywordSearchList'),clearButton:$('#keywordSearchClearButton'),scope:[]};if(keywordSearch.module.length===0){return;}
function getKeywordId(keyword){return'keywordSearch-'+keyword.replace(/ /g,'');}
function getKeywordLink(keyword){var elementId=getKeywordId(keyword),cleanID=elementId,element=$('#'+cleanID);if(element.length===0){var keywordURL=encodeURIComponent(keyword),link=$('<a class="sublevel" rel="keywordFacet" href="#'+keywordURL+'" />'),listItem=$('<li id="'+cleanID+'" />');link.text(keyword.replace(/%20/g,' ')).click(function(){if($.inArray(keyword,keywordSearch.scope)>-1){keywordSearch.removeKeyword(keyword);}else{keywordSearch.addKeyword(keyword);}
return false;});element=listItem.append(link).appendTo(keywordSearch.list);}
return element.find('a');}
keywordSearch.execute=function(){var keywordSearch,search=this.scope.join('+');if(search.length===0){keywordSearch={keyword:null,p:null,sort:null,navigators:null}}else{keywordSearch={keyword:search,p:1,navigators:null};}
DELL.com.Utils.HistoryManager.load(keywordSearch);};keywordSearch.addKeyword=function(keyword,execute){if(!this.initialized){this.initialized=true;this.list.parent().add(this.clearButton).removeClass('hidden').show();}
getKeywordLink(keyword).addClass('active');this.scope.push(keyword);if(execute!==false){this.execute();}};keywordSearch.removeKeyword=function(keyword){for(var i=0;i<this.scope.length;++i){string=this.scope[i];if(string===keyword){this.scope.splice(i,1);getKeywordLink(keyword).removeClass('active');this.execute();return;}}};keywordSearch.clear=function(){this.initialized=false;this.scope=[];this.list.empty();this.execute();};keywordSearch.form.submit(function(event){var input=$('#keywordSearchInput'),pattern=/[\w]/gi,pattern1=/[a-zA-Z0-9]*[ \` \~ \! \@ \# \$ \% \^ \& \* \( \) \- \= \+ \{ \} \[ \] \\ \; \: \| \' \" \, \. \/ \< \> \? ]+[a-zA-Z0-9]*/,keyword="",keywords=input.val().toLowerCase().split(","),isNewKeyword=false;for(var i=0,l=keywords.length;i<l;i++)
{var executeSearch=(i+1)>=l?true:false;keyword=keywords[i];isNewKeyword=(keyword.length>0&&keyword!==input.data('defaultText')&&$.inArray(keyword,keywordSearch.scope)===-1);if(isNewKeyword){if((String(keyword).replace(pattern,"")).length===0)
{keywordSearch.addKeyword(keyword,executeSearch);input.val('');}
else
{keywordSearch.addKeyword(keyword,executeSearch);input.val('');}}}
return false;}).find('#keywordSearchInput').each(function(){var $this=$(this),defaultText=keywordSearch.form.find('label').text();$this.val(defaultText).data('defaultText',defaultText.toLowerCase()).focus(function(){if(jQuery.trim($this.val().toLowerCase())===jQuery.trim(defaultText).toLowerCase()){$this.val('');}}).blur(function(){if($this.val()===''){$this.val(defaultText);}}).click(function(){if($this.val()===defaultText){$this.val('');}});});keywordSearch.clearButton.click(function(){keywordSearch.list.parent().slideUp('slow',function(){keywordSearch.clear();});return false;});DELL.com.Utils.HistoryManager.register('keyword',function(data){if(data.keyword)
{var keywordArr=data.keyword.split('+');for(var i=0;i<keywordSearch.scope.length;i++){if($.inArray(keywordSearch.scope[i],keywordArr)===-1){keywordSearch.removeKeyword(keywordSearch.scope[i]);}}}
if(keywordSearch.initialized||!Boolean(data.keyword)){return true;}
var keywords=data.keyword.split('+'),count=keywords.length,keyword;for(var i=0;i<count;++i){keyword=keywords[i];keywordSearch.addKeyword(keyword,false);}});}});})(jQuery);
if (window.console){console.log('ex time: faceted_nav.js', new Date().getTime() - startTScript);}



/*script:dropdown.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};(function($){DELL.com.Dropdown=function(dropdown){this.initialize(dropdown)};DELL.com.Dropdown.prototype={initialize:function(dropdown){var mainObj=this;dropdown.change(function(){if(this.selectedIndex!=0)
{var destination=$(this).attr("value");var target=$(this).attr("target");mainObj.gotoDestination(destination,target);}});},gotoDestination:function(destination,target){switch(target)
{case"_self":window.location=destination;break;case"_blank":window.open(destination,'_blank');break;default:window.location=destination;break;}}};$(document).ready(function(){$(".dropdown").each(function(){try
{var newDropdown=new DELL.com.Dropdown($(this));}
catch(__errObj)
{}});});})(jQuery);
if (window.console){console.log('ex time: dropdown.js', new Date().getTime() - startTScript);}



/*script:tabs_product_hub.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.ProductHubTabs=DELL.com.ProductHubTabs||{};(function($){(function(){var $this=this;var isLoaded=false;var browsedTabs=false;this.init=function(){DELL.com.Utils.equalHeightColumns(".steppingStone li .element td");DELL.com.Utils.HistoryManager.register("stoneId",$this.loadTabFromHistory);$(".steppingStone li a").click(function(event){event.preventDefault();var tabref=$(this).attr("href");$this.LoadHistoryByTab(DELL.com.Utils.GetURLHashVal(tabref));});if($(".steppingStone").length>0){var curTab=$("#content ul.steppingStone li.active").attr("class").replace("active","");curTab=curTab.replace(/^\s+|\s+$/g,'');DELL.com.Utils.Metrics.logTabMetrics(curTab,false);}
isLoaded=true;};this.LoadHistoryByTab=function(stoneId){browsedTabs=true;var sQuery={stoneId:stoneId};DELL.com.Utils.HistoryManager.load(sQuery);};this.switchTab=function(tabName){tabBorderColor="ccc";if($(".alienwareFranchise").length>0)
{tabBorderColor="333";}
$(".tabContent").css("border","1px solid #"+tabBorderColor);if(isLoaded){DELL.com.Utils.Metrics.logTabMetrics(tabName);}
switch(tabName){case"configTab":if($(".configTabCTOBtn").length<=0)
{$(".tabContent").css("border","none");}
$this.activateSelectedTab(tabName);if($("#tertiaryContent").length>0){$("#hubBottomZone").insertBefore('#tertiaryContent');}
break;case"featuresAndSolutionsTab":$this.activateSelectedTab(tabName);if($(".tabContent").length>0)
$("#hubBottomZone").insertAfter('.tabContent');break;case"galleryAndVideoTab":var ps=DELL.com.Delphi.PageSettings;var url=ps.APIRoot+"SalesCatalog.svc/productdata/html?querytype=Product&"+"cTemplate=products/product_hub_scene7&uiParamaters=customParam1=true&productitem=";url+=ps.mi.SimpleDocumentId;url+="&c="+ps.lwp.Country;url+="&l="+ps.lwp.Language;url+="&s="+ps.lwp.Segment;url+="&cs="+ps.lwp.CustomerSet;$this.activateSelectedTab(tabName,url);if($(".tabContent").length>0)
$("#hubBottomZone").insertAfter('.tabContent');break;case"ratingsAndReviewsTab":$this.activateSelectedTab(tabName);if($(".tabContent").length>0)
$("#hubBottomZone").insertAfter('.tabContent');break;case"supportAndWarrantyTab":var ps=DELL.com.Delphi.PageSettings;var url=ps.APIRoot+"SalesCatalog.svc/productsupport/html?&productid=";url+=ps.mi.ProductCode;url+="&c="+ps.lwp.Country;url+="&l="+ps.lwp.Language;url+="&s="+ps.lwp.Segment;$this.activateSelectedTab(tabName,url);if($(".tabContent").length>0)
$("#hubBottomZone").insertAfter('.tabContent');break;default:if($(".configTabCTOBtn").length<=0)
{$(".tabContent").css("border","none");}
$this.activateSelectedTab('configTab');if($("#tertiaryContent").length>0){$("#hubBottomZone").insertBefore('#tertiaryContent');}
break;}};this.deactivateCurrentActiveTab=function(){$(".steppingStone").find("li.active").removeClass("active");$(".tabContent .active").addClass("hide").removeClass("active");};this.activateSelectedTab=function(tabName,url){$("."+tabName).addClass("active");if($("div."+tabName+"_title").length>0){$("div."+tabName+"_title").removeClass("hide").addClass("active");}
function activateImages(){$('img.lazy').lazyload({effect:"fadeIn"});}
setTimeout(activateImages,3000)
if($("div."+tabName).length>0){$("div."+tabName).removeClass("hide").addClass("active");}else if(url!=null||typeof url!='undefined'){if(tabName=="supportAndWarrantyTab")
{$.ajax({url:url,type:"GET",error:function(res){},success:function(res)
{$("<div class='"+tabName+" active'>"+res+"</div>").appendTo(".tabContent");$('#eSupport').load(function(){this.style.height=$('#eSupport').contents().height()+'px';return false;});}});}
else
{$this.applyPageMask();$.ajax({url:url,type:"GET",success:function(res){var responseHTML=res;$("<div class='"+tabName+" active'>"+responseHTML+"</div>").appendTo(".tabContent");if(url!=null&&typeof url!='undefined'&&url.indexOf('product_hub_scene7')>0){var serverSetup=document.URL;var serverPath="";if(serverSetup!=null&&typeof serverSetup!='undefined'&&serverSetup.indexOf("ThunderaWeb")>0){serverPath="/ThunderaWeb";}
function activateScene7(){DELL.com.Scene7.init();DELL.com.Scene7noFlash.init();}
setTimeout(activateScene7,3000)}
$this.removePageMask();}});}}};this.loadTabFromHistory=function(data){var tabRef;if(data.stoneId!=null){tabRef=data.stoneId;}
else{if(browsedTabs){history.go(-1);return false;}
$(".steppingStone li").each(function(){if($(this).hasClass("active"))tabRef=DELL.com.Utils.GetURLHashVal($(this).find("a").attr("href"));});}
var $tabAnchor=$(".steppingStone li a[href=\"#"+tabRef+"\"]");$this.deactivateCurrentActiveTab();var tabName=$tabAnchor.parent().attr("class");$this.switchTab(tabName);if(window.location.href.indexOf("#RatingsAndReviews")!=-1){$this.LoadHistoryByTab("ratingsAndReviewsTab");}else if(window.location.href.indexOf("stoneId")==-1){$this.LoadHistoryByTab(tabName);}};this.applyPageMask=function(){var otrail=document.getElementById('processingCaptionID');otrail.innerHTML=""
$j(document).bind('mousemove',followmouse);var _maskHTML="";_maskHTML+="<div class=\"modalOverlay\"><!--[if lte IE 6.5]><iframe class=\"ie6frameOverlay\"></iframe><![endif]--></div>";var $maskObj=$(_maskHTML);if($('.modalWindowView').length>0){$('.modalWindowView').append(_maskHTML);}else{$maskObj.appendTo(DELL.com.Utils.Context.$BODY);}
$maskObj.css({"width":"100%","height":($(document).height()+"px"),"background":"#808080","opacity":"0.5","filter":"alpha(opacity=50)","-moz-opacity":"0.5"});$(".ie6frameOverlay").css({"width":"100%","height":($(document).height()+"px")});};this.removePageMask=function(){$(".modalOverlay").remove();$("#trailimageid").css("z-index","auto");$j(document).unbind('mousemove',followmouse);hidetrail();};this.onload={initialize:function(){if($(".steppingStone").length>0)
$this.init();}};DELL.com.Utils.Initialize(this.onload);}).call(DELL.com.ProductHubTabs);})(jQuery);
if (window.console){console.log('ex time: tabs_product_hub.js', new Date().getTime() - startTScript);}



/*script:compare_cookie.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.CompareCookie=DELL.com.CompareCookie||{};(function($){(function(){var $this=this;this.init=function(){};this.getCParamsObj=function(){var _advCompareCookie=DELL.com.Utils.getCookie("advcompare");return DELL.com.Utils.Initialize.compareParamsObj||$.parseJSON(_advCompareCookie)||{};};this.getCurrKey=function(){return DELL.com.Delphi.PageSettings.lwp.Country+DELL.com.Delphi.PageSettings.lwp.Language+
DELL.com.Delphi.PageSettings.lwp.Segment+DELL.com.Delphi.PageSettings.lwp.CustomerSet;};this.updateCompareCookie=function(ccObj){if(DELL.com.Utils.getAssocArraySize(ccObj)>0){DELL.com.Utils.setCookie("advcompare",JSON.stringify(ccObj),null,"/",null,null);}else{DELL.com.Utils.deleteCookie("advcompare","/",null);}
DELL.com.Utils.Initialize.compareParamsObj=ccObj;};this.addToAdvCompare=function(oc){var _cParamsObj=DELL.com.CompareCookie.getCParamsObj();var _currKey=DELL.com.CompareCookie.getCurrKey();var _cParamsAdv={};var _compareLimit=$(".mag").length>0?6:7;if($(".polCompEnable").length>0){_compareLimit=3;}
if(DELL.com.Utils.getAssocArraySize(_cParamsObj[_currKey])>0){_cParamsAdv=_cParamsObj[_currKey];}
if(DELL.com.Utils.getAssocArraySize(_cParamsAdv)<3){_cParamsAdv[oc]=1;}
else if(DELL.com.Utils.getAssocArraySize(_cParamsAdv)>=_compareLimit){DELL.com.CompareCookie.showLimitAlert(oc);return false;}
else{_cParamsAdv[oc]=0;}
_cParamsObj[_currKey]=_cParamsAdv;DELL.com.CompareCookie.updateCompareCookie(_cParamsObj);return true;};this.removeFromAdvCompare=function(oc){var _cParamsObj=DELL.com.CompareCookie.getCParamsObj();var _currKey=DELL.com.CompareCookie.getCurrKey();var _cParamsAdv={};if(DELL.com.Utils.getAssocArraySize(_cParamsObj[_currKey])>0){_cParamsAdv=_cParamsObj[_currKey];}
delete _cParamsAdv[oc];_cParamsObj[_currKey]=_cParamsAdv;DELL.com.CompareCookie.updateCompareCookie(_cParamsObj);};this.showLimitAlert=function(inpName){var inpUid=DELL.com.Utils.getUidFromOC(inpName);var $advCompInput=$(".advCompare input:checkbox[name='"+inpUid+"']").siblings('.ckbx');var offsetY=$advCompInput.offset().top,offsetX=$advCompInput.offset().left;$(".textLimitAlert").css({top:offsetY+27,left:offsetX-21}).fadeIn(1000);};this.onload={initialize:function(){$this.init();}};DELL.com.Utils.Initialize(this.onload);}).call(DELL.com.CompareCookie);})(jQuery);
if (window.console){console.log('ex time: compare_cookie.js', new Date().getTime() - startTScript);}



/*script:temp.js*/
var startTScript=new Date().getTime ();

function menuItem(){}
function menuRef(){}
function menuSep(){}
function editListen(ev)
{kCode=ev.keyCode||ev.which;if(ev.ctrlKey&&ev.shiftKey&&(kCode==69||kCode==5)){if(typeof m_editurl!=='undefined'){if(confirm("edit page for "+getQueryStringKeyValue(m_editurl,"itemid")+"?")){m_editurl=m_editurl.replace(/local.dell.com/i,"cmscontent.dell.com");window.open(m_editurl,'editwin');}
else if(typeof m_editurlAjax!=='undefined'&&typeof m_editurlAjax[0]!=='undefined'){if(confirm("edit page for "+getQueryStringKeyValue(m_editurlAjax[0],"itemid")+"?")){m_editurlAjax[0]=m_editurlAjax[0].replace(/local.dell.com/i,"cmscontent.dell.com");window.open(m_editurlAjax[0],'editwin');}
else if(typeof m_editurlAjax!=='undefined'&&typeof m_editurlAjax[1]!=='undefined'){if(confirm("edit page for "+getQueryStringKeyValue(m_editurlAjax[1],"itemid")+"?")){m_editurlAjax[1]=m_editurlAjax[1].replace(/local.dell.com/i,"cmscontent.dell.com");window.open(m_editurlAjax[1],'editwin');}}}}}
else if(ev.ctrlKey&&ev.shiftKey&&(kCode==88||kCode==24)){if(typeof m_i_editurl!=='undefined'){if(confirm("View Include Files?")){m_i_editurl=m_i_editurl.replace(/local.dell.com/i,"cmscontent.dell.com");window.open(m_i_editurl,'editwin2');}}}
else if(ev.ctrlKey&&ev.shiftKey){alert(kCode);}}
function getQueryStringKeyValue(url,key){var vars=[],hash;var hashes=url.slice(url.indexOf('?')+1).split('&');for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1];}
return vars[key];}
var m_editurlAjax;
if (window.console){console.log('ex time: temp.js', new Date().getTime() - startTScript);}



/*script:tabs.js*/
var startTScript=new Date().getTime ();

(function($){$.ui=$.ui||{};$.fn.tabs=function(){var method=typeof arguments[0]=='string'&&arguments[0];var args=method&&Array.prototype.slice.call(arguments,1)||arguments;return method=='length'?$.data(this[0],'tabs').$tabs.length:this.each(function(){if(method){var tabs=$.data(this,'tabs');if(tabs)tabs[method].apply(tabs,args);}else
new $.ui.tabs(this,args[0]||{});});};$.ui.tabs=function(el,options){var self=this;this.options=$.extend({},$.ui.tabs.defaults,options);this.element=el;if(options.selected===null)
this.options.selected=null;this.options.event+='.tabs';$(el).bind('setData.tabs',function(event,key,value){if((/^selected/).test(key))
self.select(value);else{self.options[key]=value;self.tabify();}}).bind('getData.tabs',function(event,key){return self.options[key];});$.data(el,'tabs',this);this.tabify(true);};$.ui.tabs.defaults={selected:0,unselect:false,event:'click',disabled:[],cookie:null,spinner:'Loading&#8230;',cache:false,idPrefix:'ui-tabs-',ajaxOptions:{},fx:null,tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>',panelTemplate:'<div></div>',navClass:'ui-tabs-nav',selectedClass:'ui-tabs-selected',unselectClass:'ui-tabs-unselect',disabledClass:'ui-tabs-disabled',panelClass:'ui-tabs-panel',hideClass:'ui-tabs-hide',loadingClass:'ui-tabs-loading'};$.extend($.ui.tabs.prototype,{tabId:function(a){return a.title&&a.title.replace(/\s/g,'_').replace(/[^A-Za-z0-9\-_:\.]/g,'')||this.options.idPrefix+$.data(a);},ui:function(tab,panel){return{instance:this,options:this.options,tab:tab,panel:panel};},tabify:function(init){this.$lis=$('li:has(a[href]:not(.skip))',this.element);this.$tabs=this.$lis.map(function(){return $('a',this)[0];});this.$panels=$([]);var self=this,o=this.options;this.$tabs.each(function(i,a){if(a.hash&&a.hash.replace('#',''))
self.$panels=self.$panels.add(a.hash);else if($(a).attr('href')!='#'){$.data(a,'href.tabs',a.href);$.data(a,'load.tabs',a.href);var id=self.tabId(a);a.href='#'+id;var $panel=$('#'+id);if(!$panel.length){$panel=$(o.panelTemplate).attr('id',id).addClass(o.panelClass).insertAfter(self.$panels[i-1]||self.element);$panel.data('destroy.tabs',true);}
self.$panels=self.$panels.add($panel);}
else
o.disabled.push(i+1);});if(init){$(this.element).hasClass(o.navClass)||$(this.element).addClass(o.navClass);this.$panels.each(function(){var $this=$(this);$this.hasClass(o.panelClass)||$this.addClass(o.panelClass);});function adjust2lines(container){if(container){var aLI=$('li',container);aLI.each(function(){tabTxt=$(this).html().toLowerCase();if(tabTxt.indexOf('\<br\>')>0){container.addClass('twoLines');return true;}});}}
adjust2lines($(this.element).closest('#campaignTabs'));adjust2lines($(this.element).closest('#campaignTabs12col'));this.$tabs.each(function(i,a){if(location.hash){if(a.hash==location.hash){o.selected=i;scrollTo(0,0);if($.browser.msie||$.browser.opera){setTimeout(function(){$('html, body').attr({scrollTop:$("a[href|="+location.hash+"]").offset().top});},500);}else{$('html, body').attr({scrollTop:$("a[href|="+location.hash+"]").offset().top});}
return false;}}else if(o.cookie){var index=parseInt($.cookie('ui-tabs'+$.data(self.element)),10);if(index&&self.$tabs[index]){o.selected=index;return false;}}else if(self.$lis.eq(i).hasClass(o.selectedClass)){o.selected=i;return false;}});this.$panels.addClass(o.hideClass);this.$lis.removeClass(o.selectedClass);if(o.selected!==null){this.$panels.eq(o.selected).show().removeClass(o.hideClass);this.$lis.eq(o.selected).addClass(o.selectedClass);}
if(this.$tabs[o.selected]!=null){var href=o.selected!==null&&$.data(this.$tabs[o.selected],'load.tabs');if(href)
this.load(o.selected);}
o.disabled=$.unique(o.disabled.concat($.map(this.$lis.filter('.'+o.disabledClass),function(n,i){return self.$lis.index(n);}))).sort();$(window).bind('unload',function(){self.$tabs.unbind('.tabs');self.$lis=self.$tabs=self.$panels=null;});}
for(var i=0,li;li=this.$lis[i];i++)
$(li)[$.inArray(i,o.disabled)!=-1&&!$(li).hasClass(o.selectedClass)?'addClass':'removeClass'](o.disabledClass);if(o.cache===false)
this.$tabs.removeData('cache.tabs');var hideFx,showFx,baseFx={'min-width':0,duration:1},baseDuration='normal';if(o.fx&&o.fx.constructor==Array)
hideFx=o.fx[0]||baseFx,showFx=o.fx[1]||baseFx;else
hideFx=showFx=o.fx||baseFx;var resetCSS={display:'',overflow:'',height:''};if(!$.browser.msie)
resetCSS.opacity='';function hideTab(clicked,$hide,$show){$hide.animate(hideFx,hideFx.duration||baseDuration,function(){$hide.addClass(o.hideClass).css(resetCSS);if($.browser.msie&&hideFx.opacity)
$hide[0].style.filter='';if($show)
showTab(clicked,$show,$hide);});}
function showTab(clicked,$show,$hide){if(showFx===baseFx)
$show.css('display','block');$show.animate(showFx,showFx.duration||baseDuration,function(){$show.removeClass(o.hideClass).css(resetCSS);if($.browser.msie&&showFx.opacity)
$show[0].style.filter='';$(self.element).triggerHandler('tabsshow',[self.ui(clicked,$show[0])],o.show);});}
function switchTab(clicked,$li,$hide,$show){$li.addClass(o.selectedClass).siblings().removeClass(o.selectedClass);hideTab(clicked,$hide,$show);}
this.$tabs.unbind('.tabs').bind(o.event,function(e){var $li=$(this).parents('li:eq(0)'),$hide=self.$panels.filter(':visible'),$show=$(this.hash);if(($li.hasClass(o.selectedClass)&&!o.unselect)||$li.hasClass(o.disabledClass)||$(this).hasClass(o.loadingClass)||$(self.element).triggerHandler('tabsselect',[self.ui(this,$show[0])],o.select)===false){this.blur();return false;}
self.options.selected=self.$tabs.index(this);if(o.unselect){if($li.hasClass(o.selectedClass)){self.options.selected=null;$li.removeClass(o.selectedClass);self.$panels.stop();hideTab(this,$hide);this.blur();return false;}else if(!$hide.length){self.$panels.stop();var a=this;self.load(self.$tabs.index(this),function(){$li.addClass(o.selectedClass).addClass(o.unselectClass);showTab(a,$show);});this.blur();return false;}}
if(o.cookie)
$.cookie('ui-tabs'+$.data(self.element),self.options.selected,o.cookie);self.$panels.stop();if($show.length){var a=this;self.load(self.$tabs.index(this),$hide.length?function(){switchTab(a,$li,$hide,$show);}:function(){$li.addClass(o.selectedClass);showTab(a,$show);});}else
throw'jQuery UI Tabs: Mismatching fragment identifier.';if($.browser.msie)
this.blur();return false;});if(!(/^click/).test(o.event))
this.$tabs.bind('click.tabs',function(){return false;});},add:function(url,label,index){if(index==undefined)
index=this.$tabs.length;var o=this.options;var $li=$(o.tabTemplate.replace(/#\{href\}/,url).replace(/#\{label\}/,label));$li.data('destroy.tabs',true);var id=url.indexOf('#')==0?url.replace('#',''):this.tabId($('a:first-child',$li)[0]);var $panel=$('#'+id);if(!$panel.length){$panel=$(o.panelTemplate).attr('id',id).addClass(o.panelClass).addClass(o.hideClass);$panel.data('destroy.tabs',true);}
if(index>=this.$lis.length){$li.appendTo(this.element);$panel.appendTo(this.element.parentNode);}else{$li.insertBefore(this.$lis[index]);$panel.insertBefore(this.$panels[index]);}
o.disabled=$.map(o.disabled,function(n,i){return n>=index?++n:n});this.tabify();if(this.$tabs.length==1){$li.addClass(o.selectedClass);$panel.removeClass(o.hideClass);var href=$.data(this.$tabs[0],'load.tabs');if(href)
this.load(index,href);}
$(this.element).triggerHandler('tabsadd',[this.ui(this.$tabs[index],this.$panels[index])],o.add);},remove:function(index){var o=this.options,$li=this.$lis.eq(index).remove(),$panel=this.$panels.eq(index).remove();if($li.hasClass(o.selectedClass)&&this.$tabs.length>1)
this.select(index+(index+1<this.$tabs.length?1:-1));o.disabled=$.map($.grep(o.disabled,function(n,i){return n!=index;}),function(n,i){return n>=index?--n:n});this.tabify();$(this.element).triggerHandler('tabsremove',[this.ui($li.find('a')[0],$panel[0])],o.remove);},enable:function(index){var o=this.options;if($.inArray(index,o.disabled)==-1)
return;var $li=this.$lis.eq(index).removeClass(o.disabledClass);if($.browser.safari){$li.css('display','inline-block');setTimeout(function(){$li.css('display','block');},0);}
o.disabled=$.grep(o.disabled,function(n,i){return n!=index;});$(this.element).triggerHandler('tabsenable',[this.ui(this.$tabs[index],this.$panels[index])],o.enable);},disable:function(index){var self=this,o=this.options;if(index!=o.selected){this.$lis.eq(index).addClass(o.disabledClass);o.disabled.push(index);o.disabled.sort();$(this.element).triggerHandler('tabsdisable',[this.ui(this.$tabs[index],this.$panels[index])],o.disable);}},select:function(index){if(typeof index=='string')
index=this.$tabs.index(this.$tabs.filter('[href$='+index+']')[0]);this.$tabs.eq(index).trigger(this.options.event);},load:function(index,callback){var self=this,o=this.options,$a=this.$tabs.eq(index),a=$a[0],bypassCache=callback==undefined||callback===false,url=$a.data('load.tabs');callback=callback||function(){};if(!url||($.data(a,'cache.tabs')&&!bypassCache)){callback();return;}
if(o.spinner){var $span=$('span',a);$span.data('label.tabs',$span.html()).html('<em>'+o.spinner+'</em>');}
var finish=function(){self.$tabs.filter('.'+o.loadingClass).each(function(){$(this).removeClass(o.loadingClass);if(o.spinner){var $span=$('span',this);$span.html($span.data('label.tabs')).removeData('label.tabs');}});self.xhr=null;};var ajaxOptions=$.extend({},o.ajaxOptions,{url:url,success:function(r,s){$(a.hash).html(r);finish();callback();if(o.cache)
$.data(a,'cache.tabs',true);$(self.element).triggerHandler('tabsload',[self.ui(self.$tabs[index],self.$panels[index])],o.load);o.ajaxOptions.success&&o.ajaxOptions.success(r,s);}});if(this.xhr){this.xhr.abort();finish();}
$a.addClass(o.loadingClass);setTimeout(function(){self.xhr=$.ajax(ajaxOptions);},0);},url:function(index,url){this.$tabs.eq(index).removeData('cache.tabs').data('load.tabs',url);},destroy:function(){var o=this.options;$(this.element).unbind('.tabs').removeClass(o.navClass).removeData('tabs');this.$tabs.each(function(){var href=$.data(this,'href.tabs');if(href)
this.href=href;var $this=$(this).unbind('.tabs');$.each(['href','load','cache'],function(i,prefix){$this.removeData(prefix+'.tabs');});});this.$lis.add(this.$panels).each(function(){if($.data(this,'destroy.tabs'))
$(this).remove();else
$(this).removeClass([o.selectedClass,o.unselectClass,o.disabledClass,o.panelClass,o.hideClass].join(' '));});}});})(jQuery);
if (window.console){console.log('ex time: tabs.js', new Date().getTime() - startTScript);}



/*script:metrics.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.Metrics=DELL.com.Utils.Metrics||{};(function($){(function(){var legacy=(typeof s_dell!=='undefined');var savedMi=null;var modUps=false;var modUpOCs={};var caProdIds=null;var sectionList=[];this.initOM=function(){if(typeof s_dell==='undefined'||s_dell==null)
return;if(legacy)
adTrackImpressions();var mi=DELL.com.Delphi.PageSettings.mi;if(mi.PageKey.indexOf(":candyaisle:")!=-1&&mi.CategoryPath.indexOf("/candyaisle")==-1){mi.CategoryPath+="/candyaisle";}
$("head").append('<META NAME="METRICSPATH" CONTENT="&eiwatch='+mi.PageKey+'" />');s_dell.pageName=mi.PageKey;s_dell.hier1=mi.CategoryPath;s_dell.prop1=mi.PageType;var context=$("#primaryContent, #franchisePrimaryContent, #navContent"),$tabCollection=context.find('.ui-tabs-nav-container > ul');if(location.hash!=""&&location.hash!="#"&&$tabCollection.size()>0){var tabMetricsID=location.hash.replace(/^#/,'');if(tabMetricsID=="RatingsAndReviews"){DELL.com.Utils.Metrics.setRatingsTabMetrics(tabMetricsID);}}
if($(".mag #notification-anchor").length>0){DELL.com.Utils.setCookie('s_prop70',"",false,"/",false,false);s_dell.prop70="";logViewportHeight();$(window).scroll(function(){logViewportHeight();});}
$('.mag .sendMeUpdatesTab .signUp .primaryNav').bind('click',function(){DELL.com.Utils.Metrics.logPagename('modal-sendmeupdatessignup',true);});s_dell.processLWP();if(!$('.mag .categoryTiles').is(":visible")||mi.PageKey.indexOf(":modal-ssb")!=-1)
{s_dell.t();}
s_dell.events="";s_dell.eVar38="";if(legacy)
adTrackClickThroughs();}
this.onModalOpened=function(targetID,_mainObj){saveMi();if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.manageVars("clearVars");if(_mainObj!=null){if(_mainObj.origObj.hasClass("qvLnk")){var oc=DELL.com.Utils.GetURLParamVal(_mainObj.URL,"orderCode");if(oc!=null)
s_dell.products=";"+oc;}}
if(DELL.com.Delphi.PageSettings.ModalMi!=undefined&&DELL.com.Delphi.PageSettings.ModalMi!=null){DELL.com.Delphi.PageSettings.mi=DELL.com.Delphi.PageSettings.ModalMi;this.initOM();}else{DELL.com.Delphi.PageSettings.mi.PageKey=DELL.com.Delphi.PageSettings.mi.PageKey.replace("-closed","");if(DELL.com.Delphi.PageSettings.mi.PageKey.indexOf("modal-")>0){DELL.com.Delphi.PageSettings.mi.PageKey=DELL.com.Delphi.PageSettings.mi.PageKey.replace(targetID,"");DELL.com.Delphi.PageSettings.mi.PageKey=DELL.com.Delphi.PageSettings.mi.PageKey.replace(/:modal-/g,"");DELL.com.Delphi.PageSettings.mi.PageKey=DELL.com.Delphi.PageSettings.mi.PageKey.replace(/modal-/g,"");DELL.com.Delphi.PageSettings.mi.PageKey=DELL.com.Delphi.PageSettings.mi.PageKey+":modal-"+targetID;}else{var myPosition=DELL.com.Delphi.PageSettings.mi.PageKey.lastIndexOf(":");var myLength=(DELL.com.Delphi.PageSettings.mi.PageKey.length)-1;if(myPosition===myLength){DELL.com.Delphi.PageSettings.mi.PageKey=DELL.com.Delphi.PageSettings.mi.PageKey.substring(0,myPosition);}
if(targetID.indexOf(":")==-1){DELL.com.Delphi.PageSettings.mi.PageKey=DELL.com.Delphi.PageSettings.mi.PageKey+":modal-"+targetID;}}
if(targetID.indexOf(":")>-1){var mVars=targetID.split(":");var modalCat=mVars.length>0?mVars[0]:"";var prodID=mVars.length>1?mVars[1]:"";DELL.com.Delphi.PageSettings.mi.PageKey=DELL.com.Delphi.PageSettings.mi.PageKey+":modal-"+modalCat;if(DELL.com.Delphi.PageSettings.mi.CategoryPath.indexOf("/"+modalCat)==-1){DELL.com.Delphi.PageSettings.mi.CategoryPath+="/"+modalCat;}
if(modalCat=="ssb"){s_dell.events="event58";s_dell.linkTrackEvents="event58";if(DELL.com.Mediaplex){DELL.com.Mediaplex.ajaxUpdate();}}
if(DELL.com.Delphi.PageSettings.mi.PageKey.indexOf(":candyaisle:")==-1||DELL.com.Delphi.PageSettings.mi.PageKey.indexOf(":modal-")!=-1){s_dell.products=";"+DELL.com.Utils.getOCFromUid(prodID);}}
this.initOM();if(_mainObj!=null){if(_mainObj.origObj.hasClass("qvLnk"))
s_dell.products="";}}}
this.onModalClosed=function(){refreshMi();if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.prop13=DELL.com.Delphi.PageSettings.mi.PageKey;if($('.mag #magCategoryNav').length>0){s_dell.prop65='';}
this.initOM();}
saveMi=function(){var mi=DELL.com.Delphi.PageSettings.mi;savedMi={PageKey:mi.PageKey,CategoryPath:mi.CategoryPath,PageType:mi.PageType};}
refreshMi=function(){if(savedMi!=null){var mi=DELL.com.Delphi.PageSettings.mi;mi.PageKey=savedMi.PageKey;mi.CategoryPath=savedMi.CategoryPath;mi.PageType=savedMi.PageType;savedMi=null;}}
this.logAnavMetrics=function(navCaption,navOption){if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.eVar30=navOption;s_dell.eVar31=navCaption;s_dell.linkTrackVars='eVar30,eVar31';s_dell.t();}
this.logMagAnavExpandCollapse=function(expand){if(typeof s_dell==='undefined'||s_dell==null)
return;if(expand)
{s_dell.prop13=s_dell.pageName+"[ANAV='expand']";}
else
{s_dell.prop13=s_dell.pageName+"[ANAV='collapse']";}
s_dell.t();}
this.logSSBMod=function(optID,modID,isDefault,removeOthers){if(typeof s_dell==='undefined'||s_dell==null)
return;if(removeOthers){var mPos=-1;var mArray=(s_dell.prop65!=null&&s_dell.prop65!="")?s_dell.prop65.split(','):[];while((mPos=this.ArrayIndexOf(mArray,modID+"|",true))!=-1){mArray.splice(mPos,1);}
s_dell.prop65=mArray.join(',');}
if(!isDefault&&optID!=null&&optID!="")
s_dell.prop65=(s_dell.prop65!=null&&s_dell.prop65!="")?(s_dell.prop65+","+modID+"|"+optID):(modID+"|"+optID);}
this.logModUps=function(ocID,modID,optID,isDefault,removeOthers){if(removeOthers){var mPos=-1;var mArray=(modUpOCs[ocID]!=null&&modUpOCs[ocID]!="")?modUpOCs[ocID].split(','):[];while((mPos=this.ArrayIndexOf(mArray,modID+"|",true))!=-1){mArray.splice(mPos,1);}
modUpOCs[ocID]=mArray.join(',');}
if(!isDefault&&optID!=null&&optID!=""){modUpOCs[ocID]=(modUpOCs!=null&&modUpOCs[ocID])?(modUpOCs[ocID]+","+modID+"|"+optID):(modID+"|"+optID);}
if(modUpOCs[ocID]!=null&&modUpOCs[ocID]!="")
modUps=true;}
this.ArrayIndexOf=function(array,value,contains){for(var i=0;i<array.length;i++){if(contains){if(array[i].indexOf(value)>=0)
return i;}else{if(array[i]==value)
return i;}}
return-1;}
this.logCAProds=function(id,remove){if(remove){if(caProdIds!=null){var caProds=caProdIds.split(',');caProds.splice(this.ArrayIndexOf(caProds,';'+id),1);caProdIds=caProds.join(',');}}else{caProdIds=caProdIds!=null?(caProdIds+",;"+id):(";"+id);}}
this.logTabMetrics=function(name,id,tCall){if(typeof s_dell==='undefined'||s_dell==null)
return;if(name=="RatingsAndReviews"||name=="ratingsAndReviewsTab"){this.setRatingsTabMetrics(name);}
if(typeof s_dell.pageName!='undefined'&&s_dell.pageName!=null){if($(".mag #notification-anchor").length>0){s_dell.prop13=s_dell.pageName+"[tab='"+id+"']";}else{s_dell.prop13=s_dell.pageName+"[tab='"+name+"']";}}else{s_dell.prop13=DELL.com.Delphi.PageSettings.mi.PageKey+"[tab='"+name+"']";}
if(tCall==null||tCall){s_dell.pageName="";s_dell.t();s_dell.events="";s_dell.eVar38="";}};this.logMagCategoryMetrics=function(catId,subCatId)
{if(legacy){if(subCatId!=="")
s_dell.prop13=DELL.com.Delphi.PageSettings.mi.PageKey+"[cat='"+catId+"']"+"[subCat='"+subCatId+"']";else
s_dell.prop13=DELL.com.Delphi.PageSettings.mi.PageKey+"[cat='"+catId+"']";s_dell.linkTrackVars='prop13';s_dell.t();}
if(DELL.com.Mediaplex)
DELL.com.Mediaplex.ajaxUpdate();}
this.setRatingsTabMetrics=function(id){if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.events="event3"
s_dell.eVar38="viewed customer ratings";s_dell.prop13=s_dell.pageName+"[tab='"+id+"']";}
this.trackAddToCartMetrics=function(products){if(typeof s_dell==='undefined'||s_dell==null)
return;if(products==null&&caProdIds==null){return;}
s_dell.events='scAdd';s_dell.linkTrackEvents="scAdd";var isSSB=false;$('.atcPd[id^="ssb:"]').each(function(){if($(this).attr('id')=='ssb:'+DELL.com.Utils.getUidFromOC(products.toLowerCase()))
isSSB=true;});if($('.mag').length==0||!isSSB){if(products!=null&&modUpOCs!=null&&modUpOCs[products]){s_dell.prop66=modUpOCs[products];}
s_dell.linkTrackVars="products,events,prop65,prop66";if($('.mag').length>0&&products!=null){var pOc=products.split(',')[0].substring(0);if(modUpOCs[pOc])
{s_dell.events+=',event57';s_dell.linkTrackEvents+=",event57";}}else if($('.mag').length==0&&modUps){s_dell.events+=',event57';s_dell.linkTrackEvents+=",event57";}}else{s_dell.linkTrackVars="products,events,prop65";}
if(products!=null){s_dell.products=s_dell.apl(s_dell.products,(';'+products),',',2);}else if(caProdIds!=null){s_dell.products=caProdIds;}
s_dell.tl(this,'o','AddToCart');}
logViewportHeight=function(){var prop70=DELL.com.Utils.getCookie('s_prop70');var maxHeight=parseInt($(window).scrollTop())+parseInt($(window).height());var maxPage=$(document).height();if(prop70!=""){var cookieValues=prop70.split("|");var cookieHeight=cookieValues[0];var pageHeight=cookieValues[1];if(cookieHeight>maxHeight)maxHeight=cookieHeight;if(pageHeight>maxPage)maxPage=pageHeight;}
DELL.com.Utils.setCookie('s_prop70',(parseInt(maxHeight)+'|'+parseInt(maxPage)),false,"/",false,false);if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.prop70=parseInt(maxHeight)+'|'+parseInt(maxPage);}
this.logExpandCollapseSections=function(context){var section=($('#sliding_tabs').find('li[name="'+context.parents('.anchorZone').attr('id')+'"]').attr('id')).substring(0,6);var isSectionExpanded=$.inArray(section,sectionList)>-1;if(!isSectionExpanded){sectionList.push(section);DELL.com.Utils.setCookie('s_prop71',sectionList.join('|'),false,"/",false,false);if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.prop71=sectionList.join('|');}}
this.clearExpandCollapseInfo=function(){DELL.com.Utils.setCookie('s_prop71',"",false,"/",false,false);if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.prop71="";}
this.logPagename=function(postfix,tlCall){if(typeof s_dell==='undefined'||s_dell==null)
return;var oldPageNameValue=DELL.com.Delphi.PageSettings.mi.PageKey;tlCall=tlCall!=null?tlCall:false;if(tlCall){s_dell.pageName=oldPageNameValue+':'+postfix;s_dell.tl();}
s_dell.pageName=oldPageNameValue;}
this.logCompareDragnDrop=function(action,ocId){if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.linkTrackVars="products,events";s_dell.linkTrackEvents="event60";s_dell.products=";"+ocId;s_dell.events='event60';s_dell.tl(true,'o','draganddrop');s_dell.events="";s_dell.linkTrackVars="";s_dell.linkTrackEvents="";s_dell.products="";}
this.logCompareOnLoad=function(){if(typeof s_dell==='undefined'||s_dell==null)
return;var advCompareCookie=null;if(DELL.com.Utils.getCookie("advcompare")!==""&&DELL.com.Utils.getCookie("advcompare")!==null){advCompareCookie=DELL.com.Utils.getCookie("advcompare");}
var cParamsObj=$.parseJSON(advCompareCookie)||{};var currKey=DELL.com.Delphi.PageSettings.lwp.Country+DELL.com.Delphi.PageSettings.lwp.Language
+DELL.com.Delphi.PageSettings.lwp.Segment+DELL.com.Delphi.PageSettings.lwp.CustomerSet;var cParamsAdv=[];if(DELL.com.Utils.getAssocArraySize(cParamsObj[currKey])>0){var ocs=";";cParamsAdv=cParamsObj[currKey];$.each(cParamsAdv,function(key,element){ocs=ocs+key+",;";});s_dell.products=ocs;s_dell.linkTrackVars="products";s_dell.tl(true,'o','compareLoad');}
s_dell.products="";}
this.logPdCtaClick=function(products,addToCart){if(typeof s_dell==='undefined'||s_dell==null)
return;s_dell.prop66='';if(products==null&&caProdIds==null){return;}
var productsOC=DELL.com.Utils.getOCFromUid(products);if(products!=null&&modUpOCs!=null&&modUpOCs[productsOC]){s_dell.prop66=modUpOCs[productsOC];}else{return;}
s_dell.linkTrackVars="products,events,prop66";if(s_dell.prop66!=null&&s_dell.prop66!=""){s_dell.events='event57';s_dell.linkTrackEvents="event57";}
s_dell.products=s_dell.apl(s_dell.products,(';'+productsOC),',',2);if(!addToCart){s_dell.tl(true,'o','magAddToCart');s_dell.prop66='';s_dell.events='';s_dell.linkTrackEvents='';s_dell.linkTrackVars='';s_dell.products='';}}
if(legacy)
DELL.com.Utils.Initialize(DELL.com.Utils.Metrics.initOM);}).call(DELL.com.Utils.Metrics);})(jQuery);
if (window.console){console.log('ex time: metrics.js', new Date().getTime() - startTScript);}



/*script:init.js*/
var startTScript=new Date().getTime ();

var $j=jQuery;var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Init=DELL.com.Init||{};(function($j){(function(){var _lastCmpType=null;var currKey='';var compare=({inactiveButton:function(){this.buttons.addClass(this.buttonClasses.inactive).removeClass(this.buttonClasses.active);if(this.links)
this.links.addClass(this.linkClasses.inactive).removeClass(this.linkClasses.active);},activeButton:function(){this.buttons.addClass(this.buttonClasses.active).removeClass(this.buttonClasses.inactive);if(this.links)
this.links.addClass(this.linkClasses.active).removeClass(this.linkClasses.inactive);},updateButtonText:function(){var self=this;$(compare.buttonsFilter()).find('span strong').each(function(){var span=$(this).find('span');var itemCount=self.checked();var compareTotal="6";if($(".polCompEnable").length>0){compareTotal="3";}
if(span.length<1){$(this).append('<span>('+itemCount+'/'+compareTotal+')</span>');}else{span.text('('+itemCount+'/'+compareTotal+')');}});},updateCompareProductHTML:function(href,cssClass,isChecked){if(isChecked){var $displayWhenChecked=$(".compareProduct input:checkbox[checked]").siblings(".textCompareSelected");$displayWhenChecked.wrap('<a href="'+href+'"'+cssClass+'></a>');$(".compareProduct input:checkbox[checked]").siblings(".textCompare").attr("class","textCompare hidden");$(".compareProduct input:checkbox:not(:checked)").siblings("a").find("span").unwrap();$(".compareProduct input:checkbox:not(:checked)").siblings(".textCompareSelected").attr("class","textCompareSelected hidden");$(".compareProduct input:checkbox:not(:checked)").siblings(".textCompare").attr("class","textCompare");$displayWhenChecked.attr("class","textCompareSelected");compare.activeButton();}
else{$(".compareProduct .textCompareSelected").attr("class","textCompareSelected hidden");$(".compareProduct .textCompare").attr("class","textCompare");compare.inactiveButton();}},checked:function(){return this.storedChecked;},setURL:function(url){this.buttons.attr('href',url);if(this.links)
this.links.attr('href',url);},buttonsFilter:function(){return'div.compareProduct  a.btn, div.compareButton  a.btn';},changeBoxState:function($inp,query,updateBoth){$(".textLimitAlert").hide();var inpName=$inp.attr("name");var inpOc=DELL.com.Utils.getOCFromUid(inpName);var pType=$(this).attr('class');if(pType!=_lastCmpType){$('.'+_lastCmpType).attr('checked',false);_lastCmpType=pType;}
if($inp.attr("checked")){if(!updateBoth){var sigo=DELL.com.CompareCookie.addToAdvCompare(inpOc);if(!sigo){$inp.prop("checked",false);return false;}}
$inp.siblings('.ckbx').addClass('ckd');}else{if(!updateBoth){DELL.com.CompareCookie.removeFromAdvCompare(inpOc);}
$inp.siblings('.ckbx').removeClass('ckd');}
cParamsObj=DELL.com.CompareCookie.getCParamsObj();cParamsAdv={};if(DELL.com.Utils.getAssocArraySize(cParamsObj[currKey])>0){cParamsAdv=cParamsObj[currKey];}
compare.storedChecked=DELL.com.Utils.getAssocArraySize(cParamsAdv);if(DELL.com.Utils.getAssocArraySize(cParamsAdv)>1){var addAdvCss=' class="btn primaryNav"',href=query;$(".advCompare .compareProduct").find("a.btn > span").unwrap();compare.setURL(href);compare.updateCompareProductHTML(href,addAdvCss,true);}else if(DELL.com.Utils.getAssocArraySize(cParamsAdv)<=1){$(".advCompare .compareProduct").find("a.btn > span").unwrap();compare.updateCompareProductHTML('','',false);}
compare.updateButtonText();},onload:function(storedChecked){var self=this;self.storedChecked=storedChecked,self.cp=$('div.compareProduct'),self.buttons=$(compare.buttonsFilter()),self.buttonText=$('div.compareProduct  a.btn:first span strong').text(),self.buttonClasses={'active':'primaryNav','inactive':'inactiveNav'},self.links=$('a.lnkCompareSelected'),self.linkClasses={'active':'primaryNav','inactive':'inactiveNav'};if(self.checked()<=1){self.inactiveButton();}else{self.activeButton();}
self.updateButtonText();self.buttons.unbind().die().bind('click',function(e){if(self.checked()<=1){e.stopPropagation();return false;}});self.links.unbind().die().bind('click',function(e){if(self.checked()<=1){e.stopPropagation();return false;}});}});var onload={initClearFocus:function(){$('.searchField').each(function(){var $this=$(this),title=$this.attr('title')&&$this.attr('value'),clearInput='';$this.focus(function(){if($this.val()==title){clearInput=$this.val();$this.val('');}})
$this.blur(function(){if($this.val()==''){$this.val(clearInput);}});})},initTabs:function(){var context=$("#primaryContent, #franchisePrimaryContent, #navContent"),$tabCollection=context.find('.ui-tabs-nav-container > ul');if($tabCollection.size()<=0)
return;$tabCollection.tabs().bind('tabsshow',function(event,ui){var myTracer=context.find('ul').parent().parent().parent().find('div.butterflyTron');if(myTracer.length>0){DELL.com.ProductBanner.resetBanners();}
var content=ui.tab,tabLink=$(ui.tab),metricsID=(tabLink.attr('id')!=null&&tabLink.parent().hasClass('tabschegoryTab'))?tabLink.attr('id'):tabLink.attr('href').replace(/^#/,'');$(content).focus();DELL.com.Utils.Metrics.logTabMetrics(metricsID);});$tabCollection.find('div').each(function(){var $this=$(this),link=$this.find('a');$this.click(function(e){if(e.target.nodeName=="A"){e.stopImmediatePropagation();return;}
link.click();});});},writeHmcTabsTitle:function(){var $hmcTabs=$('.hmcTabs');var tab1Title=$('#hmcTab1Title',$hmcTabs).text();var tab2Title=$('#hmcTab2Title',$hmcTabs).text();var tab3Title=$('#hmcTab3Title',$hmcTabs).text();var tab4Title=$('#hmcTab4Title',$hmcTabs).text();var tab5Title=$('#hmcTab5Title',$hmcTabs).text();if(tab1Title){$('.ui-tabs-nav li a[id="hmcTab1-anchor"]',$hmcTabs).html('<span>'+tab1Title+'</span>');$("#hmcTab1 .hmcInlineContent table tr:gt(0)").mouseover(function(){$(this).css("background-color","#EAF5FF");});$("#hmcTab1 .hmcInlineContent table tr:gt(0)").mouseout(function(){$(this).css("background-color","#FFFFFF");});}
if(tab2Title){$('.ui-tabs-nav li a[id="hmcTab2-anchor"]',$hmcTabs).html('<span>'+tab2Title+'</span>');$("#hmcTab2 .hmcInlineContent table tr:gt(0)").mouseover(function(){$(this).css("background-color","#EAF5FF");});$("#hmcTab2 .hmcInlineContent table tr:gt(0)").mouseout(function(){$(this).css("background-color","#FFFFFF");});}
if(tab3Title){$('.ui-tabs-nav li a[id="hmcTab3-anchor"]',$hmcTabs).html('<span>'+tab3Title+'</span>');$("#hmcTab3 .hmcInlineContent table tr:gt(0)").mouseover(function(){$(this).css("background-color","#EAF5FF");});$("#hmcTab3 .hmcInlineContent table tr:gt(0)").mouseout(function(){$(this).css("background-color","#FFFFFF");});}
if(tab4Title){$('.ui-tabs-nav li a[id="hmcTab4-anchor"]',$hmcTabs).html('<span>'+tab4Title+'</span>');$("#hmcTab4 .hmcInlineContent table tr:gt(0)").mouseover(function(){$(this).css("background-color","#EAF5FF");});$("#hmcTab4 .hmcInlineContent table tr:gt(0)").mouseout(function(){$(this).css("background-color","#FFFFFF");});}
if(tab5Title){$('.ui-tabs-nav li a[id="hmcTab5-anchor"]',$hmcTabs).html('<span>'+tab5Title+'</span>');$("#hmcTab5 .hmcInlineContent table tr:gt(0)").mouseover(function(){$(this).css("background-color","#EAF5FF");});$("#hmcTab5 .hmcInlineContent table tr:gt(0)").mouseout(function(){$(this).css("background-color","#FFFFFF");});}},toggleSpecs:function(){var $configOptions=$(".configToggle > select");if($configOptions.length>0){$configOptions.bind("change",function(e){var placeHolder=$('.specsContainer');if(window.specsContainer==null){window.specsContainer=placeHolder.html();}
if(this.selectedIndex==0){placeHolder.html(window.specsContainer);return;}
var ps=DELL.com.Delphi.PageSettings,url=ps.APIRoot+"SalesCatalog.svc/productdata/html?querytype=ProductTechSpecs&"
+"cTemplate=products/tech_specs_offers&uiParamaters=ajax=true&productitem=";url+=this.value;url+="&c="+ps.lwp.Country;url+="&l="+ps.lwp.Language;url+="&s="+ps.lwp.Segment;url+="&cs="+ps.lwp.CustomerSet;$.ajax({url:url,type:"GET",success:function(req){var stuff=$(req).find('.specsContainer');if(stuff.length>0){placeHolder.replaceWith(stuff);DELL.com.Utils.AutoModal.init();}}});});}},initLinks:function(ctx){var context=ctx||DELL.com.Utils.Context.$PRIMARYCONTAINER||$("#primaryContent > :not('#replacedContent'), #franchisePrimaryContent");$(".cobrowse a",ctx).live("click",function(e){e.preventDefault();var $this=$(this);if(DELL.com.Utils.GetURLParamVal($this.attr("href"),"ep")==""){$this.attr("href",($this.attr("href")+escape(top.location.href)))}
if(DELL.com.Utils.GetURLParamVal($this.attr("href"),"cs")==""){try{var sLWP="&"+DELL.com.Utils.getLWP();$this.attr("href",($this.attr("href")+sLWP))}catch(e){}}
var ph=DELL.com.Utils.GetURLParamVal($this.attr("href"),"popupHeight")||"755";var pw=DELL.com.Utils.GetURLParamVal($this.attr("href"),"popupWidth")||"635";window.open($this.attr("href"),"LiveLOOK_Co_Browsing","toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,titlebar=0,status=0,width="+pw+",height="+ph+",left="+((screen.width-parseInt(pw))/2)+",top="+((screen.height-parseInt(ph))/2));});$("a[name='mailtoLinkType']").unbind("click").bind("click",function(e){e.preventDefault();var emailSubject=$("span[id='emailSubjectText']").text();var emailBody=$("h2[id='mastheadPageCategory']").text()+' '+$("h3[id='mastheadPageTitle']").text();if(emailBody===" ")
emailBody=self.document.title;var plang=DELL.com.Delphi.PageSettings.lwp.Language;if(plang=="ja"||plang=="zh"||plang=="ko")
self.location.href='mailto:?body='+encodeURIComponent(self.location.href);else
self.location.href='mailto:?body='+encodeURIComponent(emailBody)+'  '+encodeURIComponent(self.location.href)+'&subject='+encodeURI(emailSubject);});if($("#productStack",ctx).length>0){$("#productStack a[class='closerLook'], .heroContent a[class='closerLook']",ctx).unbind("click").bind("click",function(e){e.preventDefault();window.open($(this).attr("href"),"closerlook","WIDTH=1050,HEIGHT=700,RESIZABLE=YES,SCROLLBARS=YES,TOOLBAR=YES,LEFT=0,TOP=20","");});}
$(".pageTools a[name='printLinkType'], .articleUserTools a[name='printLinkType'], #compareSpecsHeader a[name='printLinkType']").unbind("click").bind("click",function(e){e.preventDefault();if(window.print())
window.print();});$(".promoPopup",ctx).unbind("click").bind("click",function(e){e.preventDefault();window.open($(this).attr("href"),"promo","WIDTH=600,HEIGHT=400,RESIZABLE=YES,SCROLLBARS=YES,TOOLBAR=YES,LEFT=0,TOP=20","");});DELL.com.Utils.Initialize(DELL.com.Utils.AutoModal.init);$("a[id='leadgenbanner']",ctx).unbind("click").bind("click",function(e){e.preventDefault();var ps=DELL.com.Delphi.PageSettings;var csguid='';var siteserver=DELL.com.Utils.getCookie("SITESERVER");if(siteserver.length>0){siteserver=siteserver.split("=");csguid=siteserver[1];}
var leadgenURL=$(this).attr("href")+"&c="+ps.lwp.Country+"&l="+ps.lwp.Language+"&s="+ps.lwp.Segment+"&cs="+ps.lwp.CustomerSet+"&s_vi="+DELL.com.Utils.getCookie("s_vi")+"&csguid="+csguid+"&refr="+encodeURIComponent(location.href);window.open(leadgenURL,"leadgen","WIDTH=1030,HEIGHT=700,RESIZABLE=YES,SCROLLBARS=YES,TOOLBAR=YES,LEFT=0,TOP=20","");});if(context.size()<=0)
return;var $cp=context.find('.compareProduct');DELL.com.Utils.Initialize(function(){initCompare($cp);});$(".logout a").unbind("click").bind("click",function(e){e.preventDefault();maLinkLogout();});$("#availableFranchiseIce .infoCol",ctx).each(function(){var $this=$(this);var params={ids:$this.attr("id"),idtype:"ORDERCODE",targetId:$this.attr("id"),cTemplate:"products/productStack/customer_rec",uiParameters:escape("&=gr:~g:~rk:")}
if($this.attr("id")!=null)
DELL.com.SalesCat.call("carousel",params);});$(".yellowContainer").parent().parent().find(".glassBG_bottom").css("display","none");},initStormMH:function(){if(DELL.com.Delphi.PageSettings.theme.indexOf("della")==-1&&$("#dellLogo").length==0){if(typeof(m_IsAuthPremier)!="undefined"){if(m_IsAuthPremier){var capOffset=$("#flyouttoolboxlink").offset();var tb_posDiff=($(".fotoolboxbodymin").width())-($("#flyouttoolboxlink").outerWidth());var tb_finalLeft=capOffset.left-tb_posDiff;var tb_finalTop=capOffset.top+$(".toolboxcaption").outerHeight();$("#flyouttoolboxbody").css({'top':tb_finalTop+'px','left':tb_finalLeft+'px'});}}}
var $footer=$("footer"),$uFooters=$footer.find('ul.universalFooterLinks[data-title]');if($uFooters.length>0){var $ufParent=$footer.find('div.universalFooter'),$group=null,$exColCtrls=jQuery('<div class="ufExColCtrl"></div>');$uFooters.each(function(){$group=$(this);title=$group.attr('data-title');if(title!=null&&title.length>0){$group.addClass('expandCollapse');$group.attr('id',('ufexcl_'+$group.index()));$exColCtrls.append('<a href="#" rel="'+$group.index()+'" class="title">'+title+'<span class="arrw"></span></a>');}});$exColCtrls.appendTo($ufParent);$uFooters.appendTo($ufParent);$exColCtrls=$ufParent.find('.ufExColCtrl a.title');$exColCtrls.unbind('click').bind('click',function(e){e.preventDefault();var $this=jQuery(this),$link=jQuery('#ufexcl_'+$this.attr('rel'));if(!$link.hasClass('expandUL')){$uFooters.removeClass('expandUL');$exColCtrls.removeClass('expandUL');}
$link.toggleClass('expandUL');$this.toggleClass('expandUL');});}},initRadian6:function(){if($(".radian6Widget").length>0){$.getScript("http://labs.radian6.com/js/favorites/faveswidget.js",function(){$(".radian6Widget").each(function(){FavesWidget.create({id:$(this).children("input[name=radian6ID]").val(),max_items:$(this).children("input[name=radian6MaxFeeds]").val(),title:" ",theme:"ngen"},$(this));});});}},initCNETRatings:function(){$(".CNETrating").each(function(){var ps=DELL.com.Delphi.PageSettings;var locale=ps.lwp.Language+"_"+ps.lwp.Country.toUpperCase();var pn=$(this).find("#CNETProdId").val();var locationId=$(this).attr("id");var layout=$(this).find("#CNETLayout").val();var src="http://logo.cnetcontentsolutions.com/hook/?style=1&mf=Dell&h=735b90b4";src+="&locationId="+locationId;src+="&layout="+layout;src+="&locale="+locale;src+="&pn="+pn;$.getScript(src);});},initCNETReviews:function(){$(".CNETReview").each(function(){var targetId=$(this).attr("id");if(targetId!=null){var url="http://api.cnet.com/restApi/v1.0/techReview?contentId=6545983&contentType=coco&contributorType=author&start=0&limit=10&part=dell-cnet&editionId=4615&viewType=json&productId="+targetId;$.ajax({url:url,dataType:"jsonp",type:"GET",error:function(){$("#"+targetId+".CNETReview").html("&nbsp;");},success:function(req){try{$("#"+targetId+".CNETReview").html(req.CNETResponse.TechReview.Pages.Page.Body.$);}catch(e){$("#"+targetId+".CNETReview").html("&nbsp;");}}});}});},languageLink:function(){var language_link=$(".mastheadToolWorld > a")
var language_href=language_link.attr('href');if(window.location.search==''||language_href==null)
return;var index=language_href.indexOf('?l=');var language="";if(index>-1)
language=language_href.substr(index+3,2);else
{var index=language_href.indexOf('&l=');if(index>-1)
language=language_href.substr(index+3,2);}
var final_url=DELL.com.Utils.ChangeURLParams(window.location.href,'l',language);language_link.attr('href',final_url);},ptronBannerHeight:function(){if($("#ptron").length>0){var ptronSmallBanner=$("#ptron .promoBanners img");if(ptronSmallBanner.height()<127){$("#ptron .promoBanners li").addClass("smallBanner");}}},cookieChk:function(){var page=DELL.com.Utils.GetURLParamVal(document.URL,"3x_page");if(page==""){DELL.com.Utils.deleteCookie(DELL.com.Delphi.PageSettings.lwp.Segment+"compare","/",null);}}};var initCompare=function($cp){if($cp.length>0){var $clnkSelected=$cp.find('.hidden'),$clnk;if($(".advCompare").length>0){$clnk=$cp.find('span.textCompare').not('.hidden');var returnURL="?returnURL="+encodeURIComponent(location.href);var advCompareCookie=null;if(DELL.com.Utils.getCookie("advcompare")!==""&&DELL.com.Utils.getCookie("advcompare")!==null){advCompareCookie=DELL.com.Utils.getCookie("advcompare");}
var cParamsObj=DELL.com.Utils.Initialize.compareParamsObj||$.parseJSON(advCompareCookie)||{};currKey=DELL.com.Delphi.PageSettings.lwp.Country+DELL.com.Delphi.PageSettings.lwp.Language
+DELL.com.Delphi.PageSettings.lwp.Segment+DELL.com.Delphi.PageSettings.lwp.CustomerSet;var cParamsAdv=[];if(DELL.com.Utils.getAssocArraySize(cParamsObj[currKey])>0){cParamsAdv=cParamsObj[currKey];}
compare.onload(DELL.com.Utils.getAssocArraySize(cParamsAdv));$cp.each(function(index){var $inp=$('input[type=checkbox]',this),query=location.href.substring(0,location.href.indexOf("/p/"))+"/p/"+$inp.attr('value')+returnURL;compare.setURL(query+returnURL);if(cParamsAdv.hasOwnProperty(DELL.com.Utils.getOCFromUid($inp.attr('name')))){$inp.attr('checked','checked');if(DELL.com.Utils.getAssocArraySize(cParamsAdv)>0){$inp.siblings('.ckbx').addClass('ckd');}
if(DELL.com.Utils.getAssocArraySize(cParamsAdv)>1){var $displayChecked=$inp.siblings('.textCompareSelected');$displayChecked.wrap('<a href="'+query+'" class="btn primaryNav"></a>');$displayChecked.attr('class','textCompareSelected');$inp.siblings('.textCompare').attr('class','textCompare hidden');compare.activeButton();}}
$inp.siblings('.ckbx, .textCompare').off('click').on('click',function(){if($inp.prop('checked')){$inp.prop('checked',false).change();if(('.plris').length){$('input.ocComp[name="'+$inp.attr('name')+'"]').not($inp).each(function(){$(this).prop('checked',false);compare.changeBoxState($(this),query,true);});}}else{$inp.prop('checked',true).change();$('input.ocComp[name="'+$inp.attr('name')+'"]').not($inp).each(function(){$(this).prop('checked',true);compare.changeBoxState($(this),query,true);});}});$inp.unbind().change(function(){compare.changeBoxState($inp,query);});});}
else{$clnk=$cp.find('span').not('.hidden');var returnURL="&returnURL="+encodeURIComponent(location.href);var compareCookie=(DELL.com.Utils.getCookie(DELL.com.Delphi.PageSettings.lwp.Segment+"compare")!="")?DELL.com.Utils.getCookie(DELL.com.Delphi.PageSettings.lwp.Segment+"compare").split(","):null;var cParams=DELL.com.Utils.Initialize.compareParams||compareCookie||new Array;compare.onload(cParams.length);$cp.each(function(index){var $inp=$('input[type=checkbox]',this),query=location.href.substring(0,location.href.indexOf("/p/"))+"/p/"+$inp.attr('value')+"=";compare.setURL(query+cParams+returnURL);if(cParams.length>1&&cParams.toString().indexOf($inp.attr("name"))>-1)
{$clnkSelected.eq(index).wrap('<a href="'+query+cParams+returnURL+'" ></a>');$clnk.eq(index).addClass('hidden');$clnkSelected.eq(index).removeClass('hidden');compare.activeButton();}
if(cParams.length==0)
$inp.attr("checked",false);if($.inArray($inp.attr("name"),cParams)!=-1)
$inp.attr("checked",true);$inp.unbind().bind("click",function(){var itemOc=DELL.com.Utils.getOCFromUid($inp.attr("name"));var pType=$(this).attr('class');if(pType!=_lastCmpType){$('.'+_lastCmpType).attr('checked',false);_lastCmpType=pType;cParams.length=0;}
if($inp.attr("checked")){cParams.push(itemOc);}else{cParams=$.grep(cParams,function(value){return value!=itemOc;});}
compare.storedChecked=cParams.length;if(cParams.length>1){var addAdvCss='',href=query+cParams+returnURL;$(".compareProduct input:checkbox[checked]").siblings("a").find("span").unwrap();compare.setURL(query+cParams+returnURL);compare.updateCompareProductHTML(href,addAdvCss,true);}
else if(cParams.length<=1){$(".compareProduct a").find("span").unwrap();compare.updateCompareProductHTML('','',false);}
if(cParams.length>=1){DELL.com.Utils.setCookie(DELL.com.Delphi.PageSettings.lwp.Segment+"compare",cParams,null,"/",null,null);}else{DELL.com.Utils.deleteCookie(DELL.com.Delphi.PageSettings.lwp.Segment+"compare","/",null);}
compare.updateButtonText();DELL.com.Utils.Initialize.compareParams=cParams;});});}
compare.updateButtonText();}};this.InitLinks=onload.initLinks;DELL.com.Utils.Initialize(onload);}).call(DELL.com.Init);})(jQuery);
if (window.console){console.log('ex time: init.js', new Date().getTime() - startTScript);}



/*script:quote.js*/
var startTScript=new Date().getTime ();

(function($){$(document).ready(function(){try{$(".articleModule .quote").each(function(){$(".quoteModule").append("<blockquote><p>"+$(this).attr("innerHTML")+"</p></blockquote>");});}catch(e){}});})(jQuery);
if (window.console){console.log('ex time: quote.js', new Date().getTime() - startTScript);}



/*script:birdseed.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.BS=DELL.com.Utils.BS||{};(function($){(function(){this.init=function(){var tns=$('.technote');var lwp=DELL.com.Delphi.PageSettings.lwp;tns.each(function(i){if($(this).attr('rel').length>0&&$(this).attr('class').indexOf('microcontent')==-1){var u='http://www.dell.com/CONTENT/public/glossary.aspx?f='+$(this).attr('rel')+'~'+lwp.Country+'_'+lwp.Language+'_'+lwp.Segment;$(this).unbind("click").bind("click",function(e){e.preventDefault();var birdSeedTitle=DELL.com.Utils.Localize('birdseed_title_imp_details');new DELL.com.ModalWindow({"id":("tn"+(i+1)),"position":"top","url":u,"title":birdSeedTitle,"width":"400","height":"150","ovropac":"0","ovrcolor":"#ffffff","scroll":"yes"});});$(this).attr('href',u);$(this).attr('id',('tn'+(i+1)));$(this).html("<sup>"+(i+1)+"</sup>");}
else if($(this).attr('rel').length>0&&$(this).attr('class').indexOf('microcontent')!=-1){var u='/mc.ashx?id='+$(this).attr('rel')+'&c='+lwp.Country+'&l='+lwp.Language+'&s='+lwp.Segment;$(this).unbind("click").bind("click",function(e){e.preventDefault();var birdSeedTitle=DELL.com.Utils.Localize('birdseed_title_imp_details');new DELL.com.ModalWindow({"id":("tn"+(i+1)),"position":"top","url":u,"title":birdSeedTitle,"width":"400","height":"150","target":"div","ovropac":"0","ovrcolor":"#ffffff","scroll":"yes"});});$(this).attr('href',u);$(this).attr('id',('tn'+(i+1)));$(this).html("<sup>"+(i+1)+"</sup>");}})}}).call(DELL.com.Utils.BS);})(jQuery);
if (window.console){console.log('ex time: birdseed.js', new Date().getTime() - startTScript);}



/*script:prefilters.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Prefilters=DELL.com.Prefilters||{};(function($){(function(){var _this=this,undefined,context,$UIfilter,$UIfilters,$CTALink,$CTAButton,$disabledButton,queryString="",filterCollapsed=false,preConfigFilterQS=null,preConfigPagingQS=null,dataTableColHeight=new Array();vars={$globalCollapseControl:null,$similarCollapsedPanels:0,$collapsedPanels:0,$similars:new Array()}
CONSTANTS={FILTERQS:"filterCollapsed",REMOTECAROUSEL:"#remoteCarousel"},DELL.com.Prefilters.prefilterControl={init:function(){$(".modalContent").ready(function(){var productId=$("#productId",".modalContent").val();context=$("#prefiltersModal-"+productId);$CTALink=$("#linkFor3x",".modalContent").val();$CTAButton=$(".prefilterButtons a.btn",".modalContent");$disabledButton=$(".prefilterButtons #prefilterInactiveBtn",".modalContent");$("#prefilterButtons a").attr("href",$CTALink);$UIfilters=$(".navigators li select",".modalContent");$UIfilters.each(function(){$(this).unbind('change').bind('change',function(e){e.preventDefault();DELL.com.Prefilters.prefilterControl.updateURL($(this).attr('id'),$(this).val());var productId=$("#productId",".modalContent").val();var targetFilters=DELL.com.Prefilters.prefilterControl.getFilterValuesString();DELL.com.Prefilters.prefilterControl.callSalesCatalog(productId,targetFilters);DELL.com.Prefilters.prefilterControl.validateButton();})})})},getPrefilters:function(productID,linkElem){if($.trim($("div#prefilter-"+productID).text()).length>0){new DELL.com.ModalWindow(linkElem);this.validateButton();return false;}
$linkTo3x=$("a[name='linkTo3x-"+productID+"']").attr("href")||$(data).find("a.btn.purchase").attr("href");var params={cTemplate:'products/prefilter_modal',filters:'',productid:productID,uiParameters:null}
var successCallback=function(data){if($(data).find("select").length<=0){window.location.href=$linkTo3x;return false;}
$("#prefilter-"+productID).html(data);new DELL.com.ModalWindow(linkElem);}
var failCallback=function(){window.location.href=$linkTo3x;return false;}
DELL.com.SalesCat.call("configset",params,successCallback,failCallback);},updateURL:function(paramName,paramValue){var removeParam=false;if(paramValue.length==0)removeParam=true;var unescapedQuery=unescape(queryString);if(unescapedQuery.indexOf(paramName)>-1){var diff=removeParam?'&?':'';var mustBeReplaced=new RegExp(diff+''+paramName+'=[^&]+','ig');var withThis=removeParam?'':paramName+"="+paramValue;unescapedQuery=unescapedQuery.replace(mustBeReplaced,withThis);queryString=escape(unescapedQuery);}else{if(queryString.length>0)queryString+=escape("&");queryString+=escape(paramName+"="+paramValue);}
var navParam="";($CTALink.indexOf('?')>-1)?navParam="&3x_nav=":navParam="?3x_nav=";$CTAButton.attr('href',$CTALink+navParam+queryString+'&3x_page=1');},validateButton:function(){var allFiltersSelected=true;$UIfilters.each(function(){if($(this).get(0).selectedIndex==0){allFiltersSelected=false;return;}})
if((allFiltersSelected&&$CTAButton.css("display")=="none")||(!allFiltersSelected&&$CTAButton.css("display")=="inline-block"))DELL.com.Prefilters.prefilterControl.toggleButton();},toggleButton:function(){if($CTAButton.css("display")=="inline-block"){$CTAButton.css("display","none");$disabledButton.css("display","inline-block");}else{$CTAButton.css("display","inline-block");$disabledButton.css("display","none");}},getFilterValuesString:function(){var filters=[];$UIfilters.each(function(){if(this.value.length>0){var item=$(this).attr("id")+"="+this.value;filters.push(item);}});var filterString=filters.join("&");filterString=escape(filterString);return filterString;},callSalesCatalog:function(productID,filters){var params={cTemplate:'products/update_prefilters',filters:filters,productid:productID,uiParameters:null}
var successCallback=function(req){var productId=$("#productId",".modalContent").val();var prefiltersContainer=$("#prefiltersModal-"+productId,".modalContent");var returnedFilters=req;if(req.indexOf('=~=')>-1){var firstSplit=req.split('=~=');configuratorLink=firstSplit[0];$CTAButton.attr('href',configuratorLink);returnedFilters=firstSplit[1];}
var jsonFilters=jQuery.parseJSON(returnedFilters);$(jsonFilters).each(function(){var selectEl=$("select#"+this.AttributeId,prefiltersContainer);$(this.Values).each(function(){var option=$("option[value='"+this.AttributeValue+"']",selectEl);option.attr("disabled",this.Disabled);})})}
var failCallback=function(req){window.location.href=$CTALink;return false;}
DELL.com.SalesCat.call("configset",params,successCallback,failCallback);}}
this.onload={initialize:function(){}};DELL.com.Utils.Initialize(this.onload);}).call(DELL.com.Prefilters);})(jQuery);
if (window.console){console.log('ex time: prefilters.js', new Date().getTime() - startTScript);}



/*script:modal_init.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.ModalInit=DELL.com.Utils.ModalInit||{};DELL.com.CandyAisle=DELL.com.CandyAisle||{};DELL.com.Cart=DELL.com.Cart||{};(function($){(function(){this.init=function(){this.timedModalID="";},this.initModal=function(){DELL.com.Utils.ModalInit.timedModalID='';$("a[name='modalPopup'],a[submitName='modalPopup']").unbind("click").live("click",function(e){e.preventDefault();var $this=$(this);if(!$this.hasClass('disabled'))
new DELL.com.ModalWindow($this);return false;});$("a[name='prefiltersModal']").live("click",function(e){var prodCode=$(this).attr('href').split('?')[0].replace("#prefilter-","");var prodDiv=$("#info-"+prodCode);if($(prodDiv).length==0)e.preventDefault();var prod3xLink=$("a[name^='linkTo3x']",prodDiv).attr("href");DELL.com.Prefilters.prefilterControl.getPrefilters(prodCode,$(this));return false;});if($("a[name='modalPopupOnLoad']").length>0){$("a[name='modalPopupOnLoad']").live("click",function(e){e.preventDefault();new DELL.com.ModalWindow($(this));return false;});if(DELL.com.ModalWindow==null||typeof(DELL.com.ModalWindow)=='undefined'){DELL.com.Utils.ModalInit.timedModalID=setInterval(function(){if(DELL.com.ModalWindow==null||typeof(DELL.com.ModalWindow)!='undefined'){clearInterval(DELL.com.Utils.ModalInit.timedModalID);new DELL.com.ModalWindow($("a[name='modalPopupOnLoad']").eq(0));}},500);}else{new DELL.com.ModalWindow($("a[name='modalPopupOnLoad']").eq(0));}}
$("a[name='modalRoll']:not('.ratingTip'),a[submitName='modalRoll']:not('.ratingTip')").live("click",function(e){e.preventDefault();return false;});$("a[name='modalRoll'],a[submitName='modalRoll']").live("mouseover",function(){$this=$(this);var hoverDelay=DELL.com.Utils.GetURLParamVal($this.attr("href"),"hoverDelay")||"300";DELL.com.Utils.ModalInit.timedModalID=setTimeout(function(){if($this.attr("href").indexOf("eventType")==-1&&$this.attr("rel").indexOf("eventType")==-1){$this.attr({href:$this.attr("href")+(($this.attr("href").indexOf('?')!=-1)?"&":"?")+"eventType=rollover"});}
new DELL.com.ModalWindow($this);},hoverDelay);});$("a[name='modalRoll'],a[submitName='modalRoll']").live("mouseout",function(){clearTimeout(DELL.com.Utils.ModalInit.timedModalID);});},this.ModalContent=function(mObj){var $modalObj=mObj||DELL.com.Utils.Context.$BODY;$modalObj.find(".sBookmark").find("a").unbind("click").bind("click",function(e){e.preventDefault();var $this=$(this);var bURL=$this.attr("href");if(bURL!=null){bURL=bURL.toLowerCase().replace("%7burl%7d",encodeURIComponent(top.location.href));bURL=bURL.replace("{url}",encodeURIComponent(top.location.href));while(bURL.indexOf("%7btitle%7d")>-1)
bURL=bURL.replace("%7btitle%7d",encodeURIComponent(top.document.title));while(bURL.indexOf("{title}")>-1)
bURL=bURL.replace("{title}",encodeURIComponent(top.document.title));var bkmrk=window.open(bURL,'bookmark','toolbar=no,width=700,height=400,scrollbars=yes,resizable');}});$modalObj.find(".prefilterContent").ready(function(){if(typeof DELL.com.Prefilters!=='undefined')
DELL.com.Prefilters.prefilterControl.init();});$modalObj.find(".modalMore").find("a").unbind("click").bind("click",function(e){e.preventDefault();var $this=$(this);var lwp=DELL.com.Delphi.PageSettings.lwp;$this.attr({href:DELL.com.Delphi.PageSettings.APIRoot+$this.attr("href").substring($this.attr("href").indexOf("document.svc"))+"&c="+lwp.Country+"&l="+lwp.Language+"&s="+lwp.Segment+"&cs="+lwp.CustomerSet+"&ovrcolor=%23888888&modaltarget=div&modalwidth=440"});$this.origObj=DELL.com.ModalWindow.Obj;new DELL.com.ModalWindow($this);});$modalObj.find(".addToFavorites").find("a").unbind("click").bind("click",function(e){e.preventDefault();if($.browser.msie){window.external.AddFavorite(top.location.href,decodeURIComponent(top.document.title));}else if($.browser.mozilla){window.sidebar.addPanel(decodeURIComponent(top.document.title),top.location.href,"");}else{return false;}});$modalObj.find("a[name='mailtoLinkType']").unbind("click").bind("click",function(e){e.preventDefault();var $this=$(this);self.location.href='mailto:?body='+encodeURIComponent(self.document.title)+'  '+encodeURIComponent(self.location.href)+'&amp;subject='+encodeURIComponent($this.children("input:first").val());});$('#modalProductSpinner').each(function(i){var fr=DELL.com.Delphi.PageSettings.FlashRoot;var id=$(this).attr("id");var flashvars={};flashvars.url360=DELL.com.ModalWindow.OptionalValue1;var params={};params.play="false";params.loop="false";params.menu="false";params.quality="best";params.scale="noscale";params.salign="";params.wmode="window";params.devicefont="false";params.seamlesstabbing="false";params.swliveconnect="false";params.allowfullscreen="true";params.allowscriptaccess="always";params.allownetworking="all";var attributes={};swfobject.embedSWF(fr+"product_spinner/vrviewer.swf",id,"595","450","9.0.0",true,flashvars,params,attributes);});var $tabs=$modalObj.find('.ui-tabs-nav-container > ul');var $hmcTabs=$modalObj.find('.hmcTabs');if($tabs.length&&typeof(mObj)!='undefined'){$tabs.tabs().live('tabsshow',function(event,ui){$(ui.tab).focus();});}
if($hmcTabs.length){var tab1Title=$('#hmcTab1Title',$hmcTabs).text();var tab2Title=$('#hmcTab2Title',$hmcTabs).text();var tab3Title=$('#hmcTab3Title',$hmcTabs).text();var tab4Title=$('#hmcTab4Title',$hmcTabs).text();var tab5Title=$('#hmcTab5Title',$hmcTabs).text();$('.ui-tabs-nav li a[id="hmcTab1-anchor"]',$hmcTabs).html('<span>'+tab1Title+'</span>');$('.ui-tabs-nav li a[id="hmcTab2-anchor"]',$hmcTabs).html('<span>'+tab2Title+'</span>');$('.ui-tabs-nav li a[id="hmcTab3-anchor"]',$hmcTabs).html('<span>'+tab3Title+'</span>');$('.ui-tabs-nav li a[id="hmcTab4-anchor"]',$hmcTabs).html('<span>'+tab4Title+'</span>');$('.ui-tabs-nav li a[id="hmcTab5-anchor"]',$hmcTabs).html('<span>'+tab5Title+'</span>');}
$modalObj.find('.inlinevideo').each(function(i){var fr=DELL.com.Delphi.PageSettings.FlashRoot;var v=$(this);var m=v.attr("rel")||"";var b=$(".iv_thumb",v).attr("src");var t=escape($(".iv_title",v).html());var d=$("a",v).attr("href")||"#";var pt=v.attr("pt")||"related";var c=v.attr("css")||fr+"media_player/assets/css/media_player_theme.css";var l=v.attr("lang")||"en";var w
v.attr("width")!=undefined?w=v.attr("width").replace("px",""):w=250;var h
v.attr("height")!=undefined?h=v.attr("height").replace("px",""):h=250;var id=v.attr("id");if(id==null||id.length==0){id="fid_"+Math.floor(Math.random()*10000);v.attr("id",id);}
var p={allowscriptaccess:'always',allowfullscreen:'true',src:fr+"media_player/delphi_media_player.swf",width:w,height:h,base:fr};var fv={appWidth:w,media:m,thumb:b,mediaTitle:t,destination:d,languageCode:l,basePath:fr+"media_player/",playerType:pt,CSSFile:c,flashID:id};var attributes={id:id};if(m.indexOf(".wmv")>-1){if(pt=='main'){this.innerHTML='<object id="MediaPlayer" width="'+w+'" height="'+h+'" classid="CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95" standby="Loading…" type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112"><param name="AllowChangeDisplaySize" value="true"><param name="autosize" value="false"><param name="filename" value="'+m+'" /><param name="Showcontrols" value="True" /><param name="autoStart" value="True" /><embed type="application/x-mplayer2" autoStart="true" src="'+m+'" name="MediaPlayer" width="'+w+'" height="'+h+'"></embed></object>';}
return;}
if(m.indexOf(".swf")>-1){swfobject.embedSWF(m,id,w,h,"9.0.0",fr+"media_player/expressinstall.swf",fv,{},{});return;}
swfobject.embedSWF(fr+"media_player/delphi_media_player.swf",id,w,h,"9.0.0",fr+"media_player/expressinstall.swf",fv,p,attributes);});$('#modalPictaflex').each(function(i){var fr=DELL.com.Delphi.PageSettings.FlashRoot;var id=$(this).attr("id");platformId=DELL.com.ModalWindow.OptionalValue1!=""?DELL.com.ModalWindow.OptionalValue1:"5";var flashvars={};flashvars.c=DELL.com.Delphi.PageSettings.lwp.Country;flashvars.l=DELL.com.Delphi.PageSettings.lwp.Language;flashvars.s=DELL.com.Delphi.PageSettings.lwp.Segment;flashvars.cs=DELL.com.Delphi.PageSettings.lwp.CustomerSet;flashvars.r=DELL.com.Delphi.PageSettings.lwp.Region;flashvars.nextgen="true";flashvars.platform_id=platformId;flashvars.image_id=DELL.com.ModalWindow.OptionalValue2;flashvars.containerURL=location.href;var params={};params.play="false";params.loop="false";params.menu="false";params.quality="best";params.scale="noscale";params.salign="";params.wmode="transparent";params.devicefont="false";params.seamlesstabbing="false";params.swliveconnect="true";params.allowfullscreen="true";params.allowscriptaccess="always";params.allownetworking="all";var attributes={};swfobject.embedSWF("http://i.dell.com/images/global/pictaflex3/design_studio_3.swf",id,"965","600","9.0.0",true,flashvars,params,attributes);});$modalObj.find(".modalContent a[name='printLinkType']").unbind("click").bind("click",function(e){e.preventDefault();var iframe=document.createElement('IFRAME');$(iframe).attr('style','position:absolute;width:0px;height:0px;left:-500px;top:-500px;');$("body").append(iframe);var doc=iframe.contentWindow?iframe.contentWindow.document:iframe.contentDocument;doc.open();$("link[rel='stylesheet']").each(function(){doc.write('<link type="text/css" rel="stylesheet" href="'+$(this).attr("href")+'"></link>');});if(this.Target=="iframe")
doc.write($(".modalFrame").html());else
doc.write($(".modalContent").html());doc.close();if(iframe.contentWindow){iframe.contentWindow.focus();iframe.contentWindow.print();}else{iframe.contentDocument.focus();iframe.contentDocument.print();}});$("ul.billboardThumbs").find("li").find("a").css("opacity","0.6");$("ul.billboardThumbs").find("li").find("a.selected").css("opacity","1.0").find("img").css("visibility","hidden");$(".hotspotModal").find("ul.billboardThumbs").find("li").find("a").click(function(){var $self=$(this);var $li=$(this).parent();var eqNum=$li.parent().children("li").index($li);var bigImg=$self.attr("href");$(".bigImg").show();$(".VideoDisplay").hide();$(".VideoDisplay .modalFrame").attr("src","about:blank");$self.closest(".hotspotModal").find(".bigImg").attr("src",bigImg);$self.closest("ul.billboardThumbs").find("a.selected").removeClass("selected").css("opacity","0.6").find("img").css("visibility","visible");$self.addClass("selected").css("opacity","1.0").find("img").css("visibility","hidden");return false;});$("ul.billboardThumbs").find("li").find("a").hover(function(){$(this).css("opacity","1.0");},function(){if(!$(this).hasClass("selected")){$(this).css("opacity","0.6");}});$("ul.videoThumb li a").css("opacity","1");$("ul.videoThumb li a").click(function(){if($(".VideoDisplay .modalFrame").attr("src").indexOf("http")==-1)
$(".VideoDisplay .modalFrame").attr("src",$(".VideoDisplay #videoFrmSrc").val());$(".bigImg").hide();$(".VideoDisplay").show();return false;});$("ul.videoThumb li a").hover(function(){$(this).css("opacity","1");});var $longDesc=$(".longDescription"),$readMore=$longDesc.find(".readMore"),shortLength=250;if($longDesc.length>0&&$readMore.length>0){var fullTextLength=$longDesc.text().length-$readMore.text().length,fullHtmlLength=$longDesc.html().length-$readMore.html().length,fullHtml=$longDesc.html().substring(0,fullHtmlLength),truncatedText=$longDesc.text().substring(0,shortLength);if(fullTextLength>shortLength){$longDesc.text(truncatedText+"... ").append($readMore);$readMore.show().on("click",function(e){$readMore.remove();$longDesc.html(fullHtml);});}
else{$readMore.hide();}}
if($("#ocQuickviewThumbs").length>0||$("#snpQuickviewThumbs").length>0){var ocQVThumbs=$("#ocQuickviewThumbs"),snpQVThumbs=$("#snpQuickviewThumbs");if($(".quickView").length>0)
DELL.com.CandyAisle.QuickViewCTAEvents();$("#ocQuickviewThumbs, #snpQuickviewThumbs").find("a").bind({click:function(){var el=$(this);if(ocQVThumbs.length>0)
el.closest(".ocQuickview").find(".bigImg").attr("src",el.attr('href')).show();else if(snpQVThumbs.length>0)
$(".quickView .productImage").find("img").attr("src",el.parent().find(".snpImg").attr("src"));el.closest(ocQVThumbs).find("li").find("a.selected").removeClass("selected");el.addClass("selected").find("img").css("opacity","1.0");return false;},mouseover:function(e){if(!$(this).hasClass("selected"))
$(this).find("img").css("opacity","0.6");e.preventDefault();},mouseout:function(e){$(this).find("img").css("opacity","1.0");e.preventDefault();}});}
if(typeof DELL.com.ProductHub!=='undefined')
DELL.com.ProductHub.BindRatingsAndReviewLinkClickEvent();DELL.com.Utils.AutoModal.init();};}).call(DELL.com.Utils.ModalInit);})(jQuery);
if (window.console){console.log('ex time: modal_init.js', new Date().getTime() - startTScript);}



/*script:modal_auto.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.AutoModal=DELL.com.Utils.AutoModal||{};(function($){(function(){$("a[name='modalPopup']").live({mousedown:function(e){if(e.button==0)return;switch(e.button){case 1:if(!$.browser.msie)$(this).trigger('click');break;case 2:if($(this).attr('href').indexOf("cTemplate")!=-1||$(this).attr('data-modal').indexOf("cTemplate")!=-1)$(this).attr('oncontextmenu',"return false");break;case 4:if($.browser.msie)$(this).trigger('mousedown');break;}},mouseup:function(e){if(e.button==1&&$.browser.version>8)$(this).trigger('click');}});this.init=function(){var lwp=DELL.com.Delphi.PageSettings.lwp;var $autoModal=$(".tooltip, .technote");var modal={type:"tooltip",width:400,height:150,pos:"bottom",flip:"true",eventType:"rollover"}
var tecnotes={nextID:0};$autoModal.each(function(){var $this=$(this);var rel=$this.attr('rel');modal.title=$this.attr('title')||$this.html();modal.action=$this.attr('name')||"modalRoll";modal.pos=DELL.com.Utils.GetURLParamVal(rel,"position")||"bottom";modal.flip="true";if($this.hasClass("anavhmc")){modal.eventType="click";}
if($this.hasClass('technote')){var contentID=$this.attr('rel'),numberID=tecnotes.hasOwnProperty(contentID)?tecnotes[contentID]:++tecnotes.nextID;modal.action="modalPopup";modal.flip="false";modal.title=DELL.com.Utils.Localize('birdseed_title_imp_details');$this.html("<sup>"+numberID+"</sup>");tecnotes[contentID]=numberID;}
if($this.attr('href')&&$this.hasClass('ratingTip')){$this.attr({href:$this.attr('href'),rel:$this.attr("rel")+"&eventType=rollover&ovropac=0&modaltarget=div&modaltype="+modal.type+"&position="+modal.pos,name:modal.action});}
else if($this.attr('rel').length&&!$this.hasClass('microcontent')){var u='http://www.dell.com/CONTENT/public/glossary.aspx?f='+$this.attr('rel')+'~'+lwp.Country+'_'+lwp.Language+'_'+lwp.Segment;$this.attr({href:u+"&modalwidth="+modal.width+"&modalheight="+modal.height+"&ovropac=0&modalscroll=yes&modaltype="+modal.type+"&position="+modal.pos+"&title="+modal.title+"&flip="+modal.flip+"&eventType="+modal.eventType,name:modal.action});}
else if($this.attr('rel').length&&$this.hasClass('microcontent')){var eParams='';if(rel.indexOf('&formatterparams=')>-1)
rel=rel.substr(0,rel.indexOf('&formatterparams='));var u='/mc.ashx?id='+rel+'&c='+lwp.Country+'&l='+lwp.Language+'&s='+lwp.Segment;$this.attr({href:u+"&modalwidth="+modal.width+"&modalHeight="+modal.height+"&ovropac=0&modalscroll=yes&modaltarget=div&modaltype="+modal.type+"&position="+modal.pos+"&title="+modal.title+"&flip="+modal.flip+"&eventType="+modal.eventType,name:modal.action});}});}}).call(DELL.com.Utils.AutoModal);})(jQuery);
if (window.console){console.log('ex time: modal_auto.js', new Date().getTime() - startTScript);}



/*script:contract.js*/
var startTScript=new Date().getTime ();

(function($){$(document).ready(function(){$("#agencyOption").find("option[value=''][selected!=true]").css({'color':'rgb(153,153,153)'});$("#contractOption").find("option[value=''][selected!=true]").css({'color':'rgb(153,153,153)'});$(this).children().find("#agencyOption").change(function(){if($("#agencyOption option:selected").val()!="")
window.open($("#agencyOption option:selected").val(),'popup990x650','WIDTH=990,HEIGHT=650,RESIZABLE=NO,SCROLLBARS=YES,TOOLBAR=NO,LEFT=0,TOP=20');});$(this).children().find("#contractOption").change(function(){if($("#contractOption option:selected").val()!="")
window.open($("#contractOption option:selected").val(),'popup990x650','WIDTH=990,HEIGHT=650,RESIZABLE=NO,SCROLLBARS=YES,TOOLBAR=NO,LEFT=0,TOP=20');});});})(jQuery);
if (window.console){console.log('ex time: contract.js', new Date().getTime() - startTScript);}



/*script:add_to_cart_tracking.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Utils=DELL.com.Utils||{};DELL.com.Utils.Metrics=DELL.com.Utils.Metrics||{};DELL.com.Utils.Metrics.AddToCartTracking=DELL.com.Utils.Metrics.AddToCartTracking||{};(function($){(function(){this.init=function(){$('a').live('click',function(e){var $this=$(this),orderCode=false,targetURL=this.href;var vars=[],hash;var hashes=targetURL.slice(targetURL.indexOf('?')+1).split('&');for(var i=0;i<hashes.length;i++)
{hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1];}
if(String(vars.opcode).indexOf("',")!=-1)
{var tempArray=String(vars.opcode).split("',");vars.opcode=tempArray[0];}
if(vars.oc&&vars.opcode=="add"){DELL.com.Utils.Metrics.trackAddToCartMetrics(vars.oc);}});};}).call(DELL.com.Utils.Metrics.AddToCartTracking);$(document).ready(function(){DELL.com.Utils.Metrics.AddToCartTracking.init();});})(jQuery);
if (window.console){console.log('ex time: add_to_cart_tracking.js', new Date().getTime() - startTScript);}



/*script:salescatalog_api.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.SalesCat=DELL.com.SalesCat||{};(function($){(function(){var loadingIcon="<div class=\"loadingIcon\">&nbsp;</div>";this.call=function(callType,params,successCallback,failCallback){var targetId=params.targetId||"ajaxHook";var urlParams=[];var serviceType;var method="GET";switch(callType){case'collection':serviceType='productcollection';urlParams={catid:params.catId||'',appliedNavigators:params.appliedNavigators,sort:params.sort||'',groupby:params.groupBy||'',cTemplate:params.cTemplate||''}
break;case'syndication':serviceType='productcontentsyndicationdata/html';urlParams={catid:params.catId||'',productitem:params.productItemId,ordercode:params.orderCode||'',variant:params.variant||'',querytype:params.queryType||'',queryData:params.queryData||'',cTemplate:params.cTemplate||'',jsonp_callback:params.jsonp_callback||'',uiParamaters:params.uiParamaters||'none',enforceLanguage:params.enforceLanguage||''}
break;case'banner':serviceType='productbannerdata/html';break;case'snp':serviceType='snpdata/html';urlParams={skus:($.isArray(params.skus))?params.skus.join(','):params.skus,cTemplate:params.cTemplate,uiParameters:'none'}
break;case'carousel':serviceType='productCarouseldata/html';urlParams={ids:($.isArray(params.ids))?params.ids.join(','):params.ids,idtype:params.idtype,cTemplate:params.cTemplate,uiParamaters:params.uiParameters||'none'}
break;case'configset':serviceType='productconfigsetdata/html';method="POST";urlParams={page:params.page||1,preconfigfilter:params.filters||'',cTemplate:params.cTemplate,overrideOrderCodes:($.isArray(params.overrideordercodes))?params.overrideordercodes.join(','):params.overrideordercodes,uiParameters:params.uiParameters||'none',productitemid:params.productid}
break;case'category':serviceType='salescatalogcategoryviewdata/html';method="POST";urlParams={page:params.page||1,preconfigfilter:params.filters||null,cTemplate:params.cTemplate,overrideOrderCodes:params.overrideordercodes||null,uiParameters:params.uiParameters||'none',catid:params.catid}
break;case'suggestion':serviceType='productsuggestiondata/html';method="POST";urlParams={page:params.page||1,cTemplate:params.cTemplate,searchTerm:params.searchTerm||'',overrideordercodes:($.isArray(params.overrideordercodes))?params.overrideordercodes.join(','):params.overrideordercodes||null,uiParameters:params.uiParameters||'none'}
break;case'related':serviceType='relatedconfigs/html';break;default:case'product':serviceType='productdata/html';urlParams={catid:params.catId||'',productitem:params.productItemId,ordercode:params.orderCode||'',variant:params.variant||'',querytype:params.queryType||'',querydata:params.queryData||'',cTemplate:params.cTemplate||'',jsonp_callback:params.jsonp_callback||'',uiParameters:params.uiParameters||'none'}
break;}
var ps=DELL.com.Delphi.PageSettings;var svcUrl=ps.APIRoot+"SalesCatalog.svc/"+serviceType;var encodedParams=$.param(urlParams);var data=decodeURIComponent(encodedParams);var lwpc=ps.lwp.Country;var lwpl=ps.lwp.Language;var lwps=ps.lwp.Segment;var lwpcs=ps.lwp.CustomerSet;data+="&c="+lwpc;data+="&l="+lwpl;data+="&s="+lwps;data+="&cs="+lwpcs;if($("#"+targetId).length>0)$("#"+targetId).append(loadingIcon);$.ajax({url:svcUrl,data:data,context:params.context||this,type:method,error:function(req){if(typeof failCallback=='function'){if(params.context)this.failCallback(req);failCallback(req);}else{if($("#"+targetId).length>0)$("#"+targetId).html("&nbsp;");}},success:function(req){if(typeof successCallback=='function'||typeof this.successCallback=='function'){if(params.context)this.successCallback(req);else successCallback(req);}else{if($("#"+targetId).length>0)$("#"+targetId).html(req);}}});}}).call(DELL.com.SalesCat);})(jQuery);
if (window.console){console.log('ex time: salescatalog_api.js', new Date().getTime() - startTScript);}



/*script:cart.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.Cart=DELL.com.Cart||{};var onload;(function($){(function(){this.UpdateCart=function(url,sku,editCaption,editUrl){var ps=DELL.com.Delphi.PageSettings;var params="c="+ps.lwp.Country+"&l="+ps.lwp.Language+"&s="+ps.lwp.Segment+"&cs="+ps.lwp.CustomerSet;$.ajax({type:'POST',dataType:"json",url:ps.APIRoot+"cartservice.svc/postcartsummary/json",data:params,error:function(req){},success:function(req){if(req.Success){if(url!=null&&url.indexOf("sku")!=-1&&req.TotalCount==$("#totalcartitems").text()){window.open(url);}else{$("div#"+sku+" "+"a:first-child").attr("class","btn secondaryNav").attr("href",editUrl);$("div#"+sku+" "+"a:first-child span:last-child strong").text(editCaption);}}
UpdateCartCount(req.TotalCount);}});},UpdateCartCount=function(value){if(value!=null&&value!=undefined){var link=$("#totalcartitems");var linkParent=link.parent();if(link!=null&&value==0){link.addClass("").text("");linkParent.css({"padding-right":0});}else if(link!=null&&value<10){link.addClass("cartCount").text(value);}else if(link!=null&&value>=10){link.addClass("cartCountLarger").text(value);}}},this.onload={initialize:function(){var hasCartID=DELL.com.Utils.getCookie("CartID")!="";if(hasCartID){DELL.com.Cart.UpdateCart();}}};DELL.com.Utils.Initialize(this.onload);}).call(DELL.com.Cart);})(jQuery);
if (window.console){console.log('ex time: cart.js', new Date().getTime() - startTScript);}



/*script:product_hub_3x.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.ProductHub=DELL.com.ProductHub||{};var modPopUpPosition=null,modPopUpOpen=false,configCompareSlot=0,modPopUpParent=null,specRow="",popupClosing=false,awCustomCookie=null,awCustomObj;(function($){(function(){var $this=this;hideModPopUp=function(){modPopUpOpen=false;$(".expanded").removeClass("expanded");$(".modPopUp").html("");},showLessSpec=function(obj){var rowIndex=($(obj).closest(".row").index())+1;var specContent=$(".row:nth-child("+rowIndex+")");$(specContent).find(".shortSpec").removeClass("hidden");$(specContent).find(".hubSpecMore").removeClass("hidden");$.each($(specContent).find(".longSpec"),function(index,longSpec){if(!$(longSpec).hasClass("specSelector")){$(longSpec).addClass("hidden");}});},showMoreSpec=function(obj){var rowIndex=($(obj).closest(".row").index())+1;var specContent=$(".row:nth-child("+rowIndex+")");$(specContent).find(".longSpec").removeClass("hidden");$(specContent).find(".hubSpecLess").removeClass("hidden");$.each($(specContent).find(".shortSpec"),function(index,shortSpec){if(!$(shortSpec).hasClass("specSelector")){$(shortSpec).addClass("hidden");}});},updateCSS=function(){$(".buyNowLink .price .hidden").css("display","inline");$(".buyNowLink .hidden").css("display","inline");$(".hubZombiePrice .price .hidden").css("display","inline");$(".hubZombiePrice .hidden").css("display","inline");$(".warrantyModal .price .hidden").css("display","inline");$(".warrantyModal .hidden").css("display","inline");},InitAwCustomizationCookie=function(){if(DELL.com.Utils.getCookie("customizationdata")!==""&&DELL.com.Utils.getCookie("customizationdata")!==null){awCustomCookie=DELL.com.Utils.getCookie("customizationdata");}
awCustomObj=DELL.com.Utils.Initialize.alienwareCustomizationObj||$.parseJSON(awCustomCookie)||{};},UpdateCustomizationCookie=function(){var _nameplateText=$.trim($('.namePlateText').val()),_oc=$('.modPopUp').find('#currentOC').val(),_awCustomCookie=DELL.com.Utils.getCookie("customizationdata"),_awCustomObj=DELL.com.Utils.Initialize.alienwareCustomizationObj||$.parseJSON(_awCustomCookie)||{};if(_nameplateText!==""){_awCustomObj[_oc]=_nameplateText;$('.mod-upsell-compat-instr').hide();}else{delete _awCustomObj[_oc];$('.mod-upsell-compat-instr').show();}
if(DELL.com.Utils.getAssocArraySize(_awCustomObj)>0){DELL.com.Utils.setCookie("customizationdata",JSON.stringify(_awCustomObj),null,"/",null,null);}else{DELL.com.Utils.deleteCookie("customizationdata","/",null);}
DELL.com.Utils.Initialize.alienwareCustomizationObj=_awCustomObj;};BindModPopUpEvents=function(){$(".modPopUpClose").click(function(){hideModPopUp();});DELL.com.ProductHubModuleUpsell.BindOptionHover(null);$(".modOption").click(function(){$(".modPopUp input").attr("disabled","disabled");var obj=$(this).parents(".modPopUp");var ocId=$(obj).find("#currentOC").attr("value");var ocUid=DELL.com.Utils.getUidFromOC(ocId);obj=$(this).parents(".warrantyModal");var modId=$(obj).attr("id").replace(ocUid+"_mod_","");obj=$(this).parents(".catContent");var option=$(obj).find(".content").attr("id");var checked=$(this).attr("checked")=="checked";var inputType=$(this).attr("type");var multiSelect=false;if(inputType&&inputType!="radio")multiSelect=true;DELL.com.ProductHubModuleUpsell.UpdateOverrides(ocId,modId,option,multiSelect,checked);UpdateHubOCPrice(this,true);DELL.com.Utils.Metrics.logModUps(ocId,modId,option);});$(".modPopUp .ccLink").unbind("click").bind("click",function(){var obj=$(this).parents(".modPopUp");var ocId=$(obj).find("#currentOC").attr("value");var ocOverrides=DELL.com.ProductHubModuleUpsell.GetOrderCodeOverrides(ocId);var hrefWithOverrides=$(this).attr("href");var newHref="";$.each(hrefWithOverrides.split("&"),function(hrefIndex,hrefData){var overrrideIndex=hrefData.indexOf("overrides");if(overrrideIndex<0){newHref+=hrefData;newHref+="&";}});newHref+="overrides="+encodeURIComponent(ocOverrides);$(this).attr("href",newHref);});$(".namePlateText").focusout(function(){UpdateCustomizationCookie();var obj=$(this),optMod=$(obj).attr("id").split("_"),modId=optMod[1],optId=optMod[2];if($("#radio_"+optId).length>0)
{UpdateHubOCPrice($("#radio_"+optId),false);}
else if($("#chkBx_"+optId).length>0)
{UpdateHubOCPrice($("#chkBx_"+optId),false);}}).keyup(function(e){if(e.which===13){e.preventDefault();e.stopPropagation();UpdateCustomizationCookie();return;}
var obj=$(this),text=$(obj).val(),ocId=$(obj).find("#currentOC").attr("value"),optMod=$(obj).attr("id").split("_"),modId=optMod[1],optId=optMod[2],imgGenUrl="http://configure.us.dell.com/dellstore/imagegenerator.aspx?text=";if(text!=null&&text!="")
{var encodedName=DELL.com.Utils.base64Encode(text);imgGenUrl+=encodedName;}
else
{imgGenUrl=$("#defaultImgSource_"+modId+"_"+optId).val();}
$("#mod_"+optId+"_optImage").attr("src",imgGenUrl);});},ModPopUpError=function(instruction,ocId,modId){if(instruction!=null&&instruction!=""){$(".modPopUp .mod-upsell-compat-instr").remove();$(".modPopUp").prepend(instruction);$(".modPopUp .mod-upsell-compat-instr").html($(".modPopUp .mod-upsell-compat-instr").html().replace(/modlink/gi,"span class=\"modlink\" "));var modLinks=$(".modPopUp .mod-upsell-compat-instr").find(".modlink");if(modLinks!=null&&modLinks.length>0){modLinks.each(function(index,data){var linkId=$(data).attr("id");var linkText=$(data).html();$(data).attr("id",ocId+"Mod"+linkId);});}
var errPos=$("#"+ocId+"_mod_"+modId).offset();if(modId==0){if($(".modPopUp .warrantyModal").length<=0)
{errPos=$(".modPopUp .inlineContent").first().offset();}
else
errPos=$(".modPopUp .warrantyModal").first().offset();}
var errPosition={top:errPos.top+20,left:errPos.left};$(".mod-upsell-compat-instr").offset(errPosition);DELL.com.ProductHub.ModErrorAlert(ocId);$(".mod-upsell-compat-instr .modlink").unbind("click").bind("click",function(){ActivateModule($(this).attr("id"));});}
else{if($("#mainModuleId").length<0||$("#mainModuleId").attr("value")<=0){hideModPopUp();}
var $originalCTA=$("#primaryBtn_"+ocId.toUpperCase());var $zombieOriginalCTA=$("#hubZombiePrimaryBtn_"+ocId.toUpperCase());var $modErrBlock=$("#modErrBlock_"+ocId.toUpperCase());if($(".compareContainer").length>0){if($originalCTA.closest("th").index()===configCompareSlot){$originalCTA.find(".btn").removeClass("disabled");$zombieOriginalCTA.find(".btn").removeClass("disabled");$modErrBlock.hide();}
else{$("#compareGrid th").eq(configCompareSlot).find("div.defaultModErrBlock").hide();$("#compareGrid th").eq(configCompareSlot).find("div.defaultCTA .btn").removeClass("disabled");$(".compareContainer #remoteCarousel td").eq(configCompareSlot-1).find("div.defaultPrimaryBtn .btn").removeClass("disabled");}}
else{$originalCTA.find(".btn").removeClass("disabled");$zombieOriginalCTA.find(".btn").removeClass("disabled");$modErrBlock.hide();}}},ActivateModule=function(modLinkId){var mod=$("#"+modLinkId+"Container");if(mod.length>0){var errPos=$(mod).offset();var errPosition={top:errPos.top+20,left:errPos.left};$(".mod-upsell-compat-instr").offset(errPosition);}},this.ModErrorAlert=function(ocId){var $originalCTA=$("#primaryBtn_"+ocId.toUpperCase());var $zombieOriginalCTA=$("#hubZombiePrimaryBtn_"+ocId.toUpperCase());if($(".compareContainer").length>0){if($originalCTA.closest("th").index()===configCompareSlot){$originalCTA.find(".btn").addClass("disabled");$zombieOriginalCTA.find(".btn").addClass("disabled");}
else{$("#compareGrid th").eq(configCompareSlot).find("div.defaultCTA .btn").addClass("disabled");$(".compareContainer #remoteCarousel td").eq(configCompareSlot-1).find("div.defaultPrimaryBtn .btn").addClass("disabled");}}
else{$originalCTA.find(".btn").addClass("disabled");$zombieOriginalCTA.find(".btn").addClass("disabled");}
$(".primaryBtn .btn, .defaultPrimaryBtn .btn").unbind("click").bind("click",function(){if($(this).hasClass("disabled"))return false;});var $modErrBlock=$("#modErrBlock_"+ocId.toUpperCase());if($(".compareContainer").length>0){if($modErrBlock.closest("th").index()===configCompareSlot){$modErrBlock.show();}
else{$("#compareGrid th").eq(configCompareSlot).find("div.defaultModErrBlock").show();}}
else{$modErrBlock.show();}
$(".modErrBlock, .defaultModErrBlock").unbind("click").bind("click",function(){DELL.com.ProductHub.showInvalidModules(this);});},this.showInvalidModules=function(obj){if($(obj).hasClass("expanded"))return;$(obj).addClass("expanded");$('#processingCaptionID').text("");var ocId=$(obj).attr("id").split("_")[1];$j(document).bind('mousemove',followmouse);var ps=DELL.com.Delphi.PageSettings;var url=ps.APIRoot+"configService.svc/postmoduleoverrides/json";var lwpc=ps.lwp.Country;var lwpl=ps.lwp.Language;var lwps=ps.lwp.Segment;var lwpcs=ps.lwp.CustomerSet;var productCode=$("#productCode").attr("value");var params="c="+lwpc;params+="&l="+lwpl;params+="&s="+lwps;params+="&cs="+lwpcs;params+="&oc="+ocId;params+="&productCode="+productCode;params+="&moduleTemplate=products/module_upsell_modules";params+="&modErrorTemplate=products/module_option_validation";params+="&resultType=InvalidModules";var overrides=DELL.com.ProductHubModuleUpsell.GetOrderCodeOverrides(ocId);if(overrides!=null&&overrides!="")params+="&overrides="+encodeURIComponent(overrides);$.ajax({type:'POST',dataType:"json",url:url,data:params,error:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();},success:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();var modPopUp=$(".modPopUp");$(modPopUp).html("");$(modPopUp).html(req.ModulesHtml);var pos=$("#modErrBlock_"+ocId.toUpperCase()).offset();var parentOff=$("#secondaryContent").offset();modPopUpPosition={top:pos.top+20,left:parentOff.left-10};$(".modPopUp .inlineContent").offset(modPopUpPosition);ModPopUpError(req.ModOptionErrorHtml,ocId.toLowerCase(),0);BindModPopUpEvents();}});},UpdateHubOCPrice=function(obj,optionclick){$('#processingCaptionID').text("");$j(document).bind('mousemove',followmouse);var ps=DELL.com.Delphi.PageSettings;var lwpc=ps.lwp.Country;var lwpl=ps.lwp.Language;var lwps=ps.lwp.Segment;var lwpcs=ps.lwp.CustomerSet;var ocId=$("#currentOC").attr("value");var ocUid=DELL.com.Utils.getUidFromOC(ocId);var groupId=$("#groupId").attr("value");var productCode=$("#productCode").attr("value");var obj1=$(obj).parents(".warrantyModal");var modId=$(obj1).attr("id").replace(ocUid+"_mod_","");var params="c="+lwpc;params+="&l="+lwpl;params+="&s="+lwps;params+="&cs="+lwpcs;params+="&oc="+ocId;params+="&modId="+modId;params+="&groupid="+groupId;params+="&productCode="+productCode;params+="&stackPriceTemplate=products/productdetails/product_hub/productdetails_config_3x_price";params+="&shipDateTemplate=products/fixed_config";params+="&zombiePriceTemplate=products/productdetails/product_hub/hub_zombie_bar_price";params+="&moduleTemplate=products/module_upsell_module";params+="&modErrorTemplate=products/module_option_validation";params+="&resultType=SingleModuleAndSpecs";var overrides=DELL.com.ProductHubModuleUpsell.GetOrderCodeOverrides(ocId);if(overrides!=null&&overrides!="")params+="&overrides="+encodeURIComponent(overrides);if($("#mainModuleId").length>0)params+="&uiParameters="+escape("mainModuleId="+$("#mainModuleId").attr("value"));var url=ps.APIRoot+"configService.svc/postmoduleoverrides/json";$.ajax({type:'POST',dataType:"json",url:url,data:params,error:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();$(".modPopUp input").removeAttr("disabled");},success:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();var modPopUp=$(".modPopUp");$(modPopUp).html("");$(modPopUp).html(req.ModulesHtml);if($(".compareContainer").length>0)DELL.com.DragAndDrop.sortZombieCols();var $realOCPrice=$("#OcPrice_"+ocUid);var $originalCTA=$("#primaryBtn_"+ocUid);var $hubShipDate=$("#hubShipDate_"+ocUid);if($(".compareContainer").length>0){if($realOCPrice.closest("th").index()===configCompareSlot){$realOCPrice.html(req.StackPriceHtml);$originalCTA.html(req.CTAHtml);$hubShipDate.html(req.ShipDateHtml);}
else{$("#compareGrid th").eq(configCompareSlot).find("div.defaultPriceBlock").html(req.StackPriceHtml);$("#compareGrid th").eq(configCompareSlot).find("div.defaultCTA").html(req.CTAHtml);$("#compareGrid th").eq(configCompareSlot).find("div.defaultHubShipDate").html(req.ShipDateHtml);}}
else{$realOCPrice.html(req.StackPriceHtml);$originalCTA.html(req.CTAHtml);$hubShipDate.html(req.ShipDateHtml);}
if($(".compareContainer").length>0){var $zombieRealPrice=$("#hubZombiePrice_"+ocUid);var $zombieOriginalCTA=$("#hubZombiePrimaryBtn_"+ocUid);var $zombieShipDate=$("#hubZombieShipDate_"+ocUid);if($zombieRealPrice.closest("td").index()===configCompareSlot-1){$zombieRealPrice.html(req.ZombiePriceHtml);$zombieOriginalCTA.html(req.CTAHtml);$zombieShipDate.html(req.ShipDateHtml);}
else{$(".compareContainer #remoteCarousel td").eq(configCompareSlot-1).find("div.defaultZombiePrice").html(req.ZombiePriceHtml);$(".compareContainer #remoteCarousel td").eq(configCompareSlot-1).find("div.defaultPrimaryBtn").html(req.CTAHtml);$(".compareContainer #remoteCarousel td").eq(configCompareSlot-1).find("div.defaultZombieShipDate").html(req.ShipDateHtml);}}
else{$("#hubZombiePrimaryBtn_"+ocUid).html(req.CTAHtml);$("#hubZombieShipDate_"+ocUid).html(req.ShipDateHtml);$("#hubZombiePrice_"+ocUid).html(req.ZombiePriceHtml);}
modPopUpOpen=true;BindModPopUpEvents();$.each(req.ProductHubSpecs,function(index,data){if($(".compareContainer").length>0){$("."+modPopUpParent+" #shortSpec\\~"+data.OrderCode+"\\~"+data.ModuleId).text(data.ShortSpec);$("."+modPopUpParent+" #longSpec\\~"+data.OrderCode+"\\~"+data.ModuleId).text(data.LongSpec);var $shortSpecs=$("#compareGrid .shortSpecDummy span[id*=shortSpec\\~"+data.OrderCode+"\\~"+data.ModuleId+"\\~"+specRow+"]");var $shortSpec=$("#shortSpec\\~"+data.OrderCode+"\\~"+data.ModuleId);if($shortSpecs.length>1){$.each($shortSpecs,function(i){if($(this).attr("id").indexOf("specClone")===-1&&$(this).closest("td").index()===configCompareSlot){$(this).text(data.ShortSpec);}});}
if($shortSpec.closest("td").index()===configCompareSlot){$shortSpec.text(data.ShortSpec);}}
else{$("#shortSpec\\~"+data.OrderCode+"\\~"+data.ModuleId).text(data.ShortSpec);$("#longSpec\\~"+data.OrderCode+"\\~"+data.ModuleId).text(data.LongSpec);}});$(".modPopUp input").removeAttr("disabled");updateCSS();if($(".namePlateText").length>0)
{$(".namePlateText").keyup();if(optionclick!=null&&optionclick==false)
{ModPopUpError(req.ModOptionErrorHtml,ocId,modId);}}
else
{ModPopUpError(req.ModOptionErrorHtml,ocId,modId);}
var parentOff=$("#secondaryContent").offset();var expanded=$(".expanded");if($(expanded).length>0)
{var off=$(expanded).offset();modPopUpPosition={top:off.top+30,left:parentOff.left-10};$(".modPopUp .inlineContent").offset(modPopUpPosition);if($(".mod-upsell-compat-instr").length>0)
{var errPos=$("#"+ocId+"_mod_"+modId).offset();var errPosition={top:errPos.top+20,left:errPos.left};$(".mod-upsell-compat-instr").offset(errPosition);}}}});},this.BindRatingsAndReviewLinkClickEvent=function(){if($('.mag').length<=0&&$('#productFamily').length<=0){$(document).on("click",'a[href="#!stoneId=ratingsAndReviewsTab"], a[href="#reviews"]',function(e){e.preventDefault();DELL.com.ProductHubTabs.LoadHistoryByTab("ratingsAndReviewsTab");$(window).scrollTop($('#secondaryContent').offset().top);});}
$(document).on("click",'.configTab a[href*="#RatingsAndReviews"], a[href="#reviews"]',function(e){e.preventDefault();$(window).scrollTop($('#BVReviewsContainer').offset().top);});$(document).on("click",'a[href*="#RatingsAndReviews"]',function(e){$(document).location=$('a[href]');$(window).scrollTop($('#BVReviewsContainer').offset().top);});},this.ScrollToConfigTab=function(){DELL.com.ProductHubTabs.LoadHistoryByTab("configTab");$(window).scrollTop($('#secondaryContent').offset().top);},this.BindHubEvents=function(){$(window).load(function(){if(typeof($.getUrlVars()["id"])!='undefined'&&$.getUrlVars()["id"].length!=-1&&$(".steppingStone").length>0&&typeof($.getUrlVars()["SubItemID"])=='undefined'){$this.ScrollToConfigTab();}});$this.BindRatingsAndReviewLinkClickEvent();$('a[href="#!stoneId=configTab"]').click(function(e){e.preventDefault();DELL.com.ProductHubTabs.LoadHistoryByTab("configTab");if($('.configStackPage:visible').length>0)
$(window).scrollTop($('.configStackPage:visible .prodName').first().offset().top);else
$(window).scrollTop($('#secondaryContent').offset().top);});$("#configStackPage_1").show();$("#techSpecStackPage_1").show();$(".zombiePage_1").show();$(".hubSpecMore").click(function(){showMoreSpec(this);});updateCSS();$(".hubPage").click(function(){var id=$(this).attr("id").substr(2);$(".techSpecStackPage").hide();$("#techSpecStackPage_"+id).show();$(".configStackPage").hide();$("#configStackPage_"+id).show();$(".zombiePage").hide();$(".zombiePage_"+id).show();});$(".hubSpecLess").click(function(){showLessSpec(this);});$(document).mouseup(function(e){var container=$(".modPopUp");var expanded=$(".expanded");var modContainer=$(".modalWindowView");if(container.has(e.target).length===0&&e.which==1&&modPopUpOpen&&expanded.has(e.target).length===0&&modContainer.has(e.target).length===0)hideModPopUp();});},this.HubConfigSelector=function(object){if($(object).hasClass("expanded")){hideModPopUp();return false;}
if($(".compareContainer").length>0)modPopUpParent=$(object).parent("td").attr("class");$('#processingCaptionID').text("");$j(document).bind('mousemove',followmouse);var ps=DELL.com.Delphi.PageSettings;var lwpc=ps.lwp.Country;var lwpl=ps.lwp.Language;var lwps=ps.lwp.Segment;var lwpcs=ps.lwp.CustomerSet;var productCode=$("#productCode").attr("value");if($(".compareContainer").length>0)productCode=$($(object).parent()).find(".productCode").attr("value");var id=$(object).children("span:first").attr("id");var idparts=id.split("~");var ocUid=idparts[1];var ocId=DELL.com.Utils.getOCFromUid(ocUid);var modId=idparts[2];var params="c="+lwpc;params+="&l="+lwpl;params+="&s="+lwps;params+="&cs="+lwpcs;params+="&oc="+ocId;params+="&modId="+modId;params+="&productCode="+productCode;params+="&moduleTemplate=products/module_upsell_module";params+="&modErrorTemplate=products/module_option_validation";params+="&resultType=SingleModule";if($(".compareContainer").length>0){configCompareSlot=$(object).closest('td').index();specRow=$(object).closest('td').closest('tr').attr("id");}
var overrides=DELL.com.ProductHubModuleUpsell.GetOrderCodeOverrides(ocId);if(overrides!=null&&overrides!="")params+="&overrides="+encodeURIComponent(overrides);params+="&uiParameters="+escape("mainModuleId="+modId);var url=ps.APIRoot+"configService.svc/postmoduleoverrides/json";$.ajax({type:'POST',dataType:"json",url:url,data:params,error:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();},success:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();if(req.ModulesHtml!=null&&req.ModulesHtml!=""){$(".expanded").removeClass("expanded");$(object).addClass("expanded");$(".modPopUp").html("");var modPopUp=$(".modPopUp");var modPopUpContent=$(".modPopUp .inlineContent");var parentOff=$("#secondaryContent").offset();$(modPopUp).html(req.ModulesHtml);var off=$(object).offset();$(".modPopUp .inlineContent").slideDown("slow",function(){});modPopUpPosition={top:off.top+30,left:parentOff.left-10};$(".modPopUp .inlineContent").offset(modPopUpPosition);modPopUpOpen=true;$(".hubZombiePrice .hidden").css("display","inline");BindModPopUpEvents();updateCSS();}
if($(".namePlateText").length>0)
{$(".namePlateText").keyup();}
ModPopUpError(req.ModOptionErrorHtml,ocId,modId);updateCSS();}});},this.ClearOverrides=function(){var initialHash=window.location.hash.substring(1);var newHash="";var params=initialHash.split("&");for(var i=0;i<params.length;i++){var index=params[i].indexOf("overrides=");if(index==-1)
newHash+=params[i];}
window.location.hash="";window.location.hash=newHash;},UpdatePdPriceAndCTA=function()
{var currURL=window.location.href;var sysOC=DELL.com.Utils.GetURLParamVal(currURL,"oc");if(sysOC!=null)
{var overrides=DELL.com.ProductHubModuleUpsell.GetOrderCodeOverrides(sysOC);if(overrides!=null&&overrides!="")
{$('#processingCaptionID').text("");$j(document).bind('mousemove',followmouse);var ps=DELL.com.Delphi.PageSettings;var lwpc=ps.lwp.Country;var lwpl=ps.lwp.Language;var lwps=ps.lwp.Segment;var lwpcs=ps.lwp.CustomerSet;var params="c="+lwpc;params+="&l="+lwpl;params+="&s="+lwps;params+="&cs="+lwpcs;params+="&stackPriceTemplate=products/pd_hero_price";params+="&resultType=AllUpsellModules";params+="&oc="+sysOC;params+="&overrides="+encodeURIComponent(overrides);var url=ps.APIRoot+"configService.svc/postmoduleoverrides/json";$.ajax({type:'POST',dataType:"json",url:url,data:params,error:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();},success:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();if($(".prodHeroPrimaryBtn").length>0)
{$(".prodHeroPrimaryBtn").html(req.CTAHtml);$(".productLink").html(req.CTAHtml);}
if($(".offerPrice").length>0)
{$(".offerPrice").html(req.StackPriceHtml);}}});}}},UpdateOveridesOptionsAndPrice=function(){if($(".mag").length>0)return;var isEditMode=$("#cartItemId").length>0&&$("#cartItemId").val().length>0;var ps=DELL.com.Delphi.PageSettings;if(ps.PageSubType!="hub"&&ps.PageType!="candyaisle"&&isEditMode)
{UpdatePdPriceAndCTA();return;}
var overrides=DELL.com.ProductHubModuleUpsell.GetOverrides();if(overrides==null||overrides==""){$(".modErrBlock, .defaultModErrBlock").unbind("click").bind("click",function(){DELL.com.ProductHub.showInvalidModules(this);});$(".primaryBtn .btn, .defaultPrimaryBtn .btn").unbind("click").bind("click",function(){if($(this).hasClass("disabled"))return false;});return;}
$('#processingCaptionID').text("");$j(document).bind('mousemove',followmouse);var editItemIdDiv=$("#editModuleId");var editOCIdDiv=$("#editOCId");var ccInCart=false;if((editItemIdDiv.length>0)&&(editOCIdDiv.length>0))ccInCart=true;var ps=DELL.com.Delphi.PageSettings;var lwpc=ps.lwp.Country;var lwpl=ps.lwp.Language;var lwps=ps.lwp.Segment;var lwpcs=ps.lwp.CustomerSet;var productCode=$("#productCode").attr("value");var editItemId="";var editOCId="";if(ccInCart){editOCId=editOCIdDiv.attr("value");editItemId=editItemIdDiv.attr("value");}
var editOCUid=DELL.com.Utils.getUidFromOC(editOCId);var params="c="+lwpc;params+="&l="+lwpl;params+="&s="+lwps;params+="&cs="+lwpcs;if(ccInCart){params+="&editOCId="+editOCId;params+="&editModuleId="+editItemId;}
params+="&productCode="+productCode;params+="&priceTemplate=products/productdetails/product_hub/productdetails_config_3x_price";params+="&zombiePriceTemplate=products/productdetails/product_hub/hub_zombie_bar_price";params+="&shipDateTemplate=products/fixed_config";params+="&moduleTemplate=products/module_upsell_module";params+="&modErrorTemplate=products/module_option_validation";params+="&resultType=SpecsOnly";params+="&overrides="+encodeURIComponent(overrides);updateCSS();var url=ps.APIRoot+"configService.svc/postconfigurations/json";$.ajax({type:'POST',dataType:"json",url:url,data:params,error:function(req){$j(document).unbind('mousemove',followmouse);hidetrail();},success:function(configsData){$j(document).unbind('mousemove',followmouse);hidetrail();$.each(configsData,function(index,req){if(ccInCart){if(req.ModulesHtml!=null&&req.ModulesHtml!=""){$(".expanded").removeClass("expanded");var ccObject=$("#shortSpec\\~"+editOCUid+"\\~"+editItemId).parent();$(ccObject).addClass("expanded");$(".modPopUp").html("");var modPopUp=$(".modPopUp");var parentOff=$("#secondaryContent").offset();$(modPopUp).html(req.ModulesHtml);var off=$(ccObject).offset();$(modPopUp).attr("style","display:none");$(modPopUp).slideDown("slow");$(".modPopUp .inlineContent").slideDown("slow",function(){});modPopUpPosition={top:off.top+30,left:parentOff.left-10};$(".modPopUp .inlineContent").offset(modPopUpPosition);$(".modPopUp #mainModuleId").attr("value",editItemId);modPopUpOpen=true;BindModPopUpEvents();$(window).scrollTop($(".modPopUp .inlineContent").offset().top-260);}}
var ocId=req.OrderCodeId;var ocUid=DELL.com.Utils.getUidFromOC(ocId);$("#OcPrice_"+ocUid).html(req.PriceHtml);$("#primaryBtn_"+ocUid).html(req.CTAHtml);$("#hubShipDate_"+ocUid).html(req.ShipDateHtml);$("#hubZombiePrice_"+ocUid).html(req.ZombiePriceHtml);$("#hubZombiePrimaryBtn_"+ocUid).html(req.CTAHtml);$("#hubZombieShipDate_"+ocUid).html(req.ShipDateHtml);$.each(req.ProductHubSpecs,function(index,data){var uid=DELL.com.Utils.getUidFromOC(data.OrderCode);$("#shortSpec\\~"+uid+"\\~"+data.ModuleId).text(data.ShortSpec);$("#longSpec\\~"+uid+"\\~"+data.ModuleId).text(data.LongSpec);});if(req.ModOptionErrorHtml!=null&&req.ModOptionErrorHtml!="")DELL.com.ProductHub.ModErrorAlert(ocId);updateCSS();var parentOff=$("#secondaryContent").offset();var expanded=$(".expanded");if($(expanded).length>0){var off=$(expanded).offset();modPopUpPosition={top:off.top+30,left:parentOff.left-10};$(".modPopUp .inlineContent").offset(modPopUpPosition);}});$(".primaryBtn .btn, .defaultPrimaryBtn .btn").unbind("click").bind("click",function(){if($(this).hasClass("disabled"))return false;});}});},onload={initialize:function(){var modPopUp=$(".modPopUp");if(modPopUp){jQuery('<div/>',{'class':'modPopUp'}).appendTo('#contentWrap');}
DELL.com.ProductHub.BindHubEvents();UpdateOveridesOptionsAndPrice();InitAwCustomizationCookie();}};DELL.com.Utils.Initialize(onload);}).call(DELL.com.ProductHub);})(jQuery);
if (window.console){console.log('ex time: product_hub_3x.js', new Date().getTime() - startTScript);}



/*script:hub_module_upsell.js*/
var startTScript=new Date().getTime ();

var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.ProductHubModuleUpsell=DELL.com.ProductHubModuleUpsell||{};(function($){(function(){this.BindOptionHover=function(ocId){var catContentObj=null;if(ocId==null)
{catContentObj=$(".catContent");}
else
{catContentObj=$("#moduleContainer_"+ocId+" .catContent");}
$(catContentObj).hover(function(e){$(this).addClass('optSelected');DELL.com.ProductHubModuleUpsell.SwitchImage($(this));},function(){DELL.com.ProductHubModuleUpsell.SwitchToDefaultImage($(this));$(this).removeClass('optSelected');});},this.SwitchImage=function($obj)
{var parent=$obj.parents(".warrantyModal").get(0);var catId=$obj.find(".content").first().attr("id");$(parent).find(".rightCol .catContent .content").not(".unselected").addClass("unselected");$obj.removeClass("unselected");$(parent).find(".leftCol .catImage").each(function(){$(this).hide();});$(parent).find(".leftCol #img-"+catId).show();},this.SwitchToDefaultImage=function($obj)
{var parent=$obj.parents(".warrantyModal").get(0);var activeRadio=$(parent).find(".rightCol input:checked");$(parent).find(".leftCol .catImage").each(function(){$(this).hide();});if(activeRadio!=null&&activeRadio.length>0)
{var catId=$(activeRadio).first().attr("id").substr(6);$(parent).find(".leftCol #img-"+catId).show();}
else
{$(parent).find(".leftCol .superModImage").show();}},this.UpdateHashValue=function(overrides){var newHash="";var initialHash=window.location.hash;var hashParams=initialHash.split("&");$.each(hashParams,function(hashIndex,hashData){if(hashData.indexOf("overrides=")<0)
{if(newHash!="")
newHash+="&"
newHash+=hashData;}});if(newHash!="")
newHash+="&"
newHash+=(overrides!="")?"overrides="+overrides:"overrides=";window.location.hash=newHash;if(DELL.com.Mediaplex&&newHash!=""){DELL.com.Mediaplex.ajaxUpdate();}},this.GetOverrides=function()
{var hash=window.location.hash;var overrides="";var ocOveride=null;$.each(hash.split("&"),function(index,data){if(!(data.indexOf("overrides=")<0))
{overrides=data.split("=")[1];return false;}});return overrides;}
this.GetOrderCodeOverrides=function(orderCode)
{var overrides=DELL.com.ProductHubModuleUpsell.GetOverrides();var ocOveride=null;var isCompare=($(".compareContainer").length>0);$.each(overrides.split("|"),function(index,data)
{var parts=data.split(":");var orderCodeFormat=orderCode;if(isCompare)
orderCodeFormat=orderCode+"_"+configCompareSlot;if(parts[0].toLowerCase()==orderCodeFormat.toLowerCase())
ocOveride=parts[1];});return ocOveride;}
this.AddDefaultSelections=function(sysOC,ccOC)
{var sysUid=DELL.com.Utils.getUidFromOC(sysOC);var defaultOptions=$("#"+sysUid+"MultiSelectDefaultOptions").attr("value");if(defaultOptions!=null&&defaultOptions!=""){$.each(defaultOptions.split("|"),function(index,data)
{var parts=data.split("~");if(parts.length>1)
{var modId=parts[0];var optionId=parts[1];DELL.com.ProductHubModuleUpsell.UpdateOverrides(sysOC,modId,optionId,true,true,true);}});}
var ccUid=DELL.com.Utils.getUidFromOptId(ccOC);defaultOptions=$("#"+ccUid+"MultiSelectDefaultOptions").attr("value");if(defaultOptions!=null&&defaultOptions!=""){$.each(defaultOptions.split("|"),function(index,data)
{var parts=data.split("~");if(parts.length>1)
{var modId=parts[0];var optionId=parts[1];DELL.com.ProductHubModuleUpsell.UpdateOverrides(ccOC,modId,optionId,true,true,true);}});}}
this.UpdateOverrides=function(ocId,modId,optId,multiSelect,checked,addingDefaults){var ocUid=DELL.com.Utils.getUidFromOC(ocId)||DELL.com.Utils.getUidFromOptId(ocId.toUpperCase());ocId=ocId.toLowerCase();var sysOC=$("#currentOC").attr("value");var sysUid=DELL.com.Utils.getUidFromOC(sysOC);sysOC=(sysOC!=null&&sysOC!="")?sysOC.toLowerCase():ocId;var ccOC=(ocId!=sysOC)?ocId:"";var ccUid=(ocUid!=sysUid)?ocUid:"";var ccOptionId=$("#"+ccUid+"OptionId").attr("value");var ccMod=null;if($("#ccModule").length>0)
{ccMod=$("#ccModule").attr("value");}
var sysOCWithSlot=sysOC;if($(".compareContainer").length>0)
sysOCWithSlot=sysOC+"_"+configCompareSlot;var overrides=DELL.com.ProductHubModuleUpsell.GetOverrides();if(overrides.indexOf(sysOCWithSlot+":")<0&&!addingDefaults)
{DELL.com.ProductHubModuleUpsell.AddDefaultSelections(sysOC,ccOC);overrides=DELL.com.ProductHubModuleUpsell.GetOverrides();}
var isDefault=false;var defaultOptions=$("#"+sysUid+"DefaultOptions").attr("value");if(defaultOptions!=null&&defaultOptions!="")
isDefault=defaultOptions.indexOf("|"+modId+"~"+optId+"|")>=0;var newOverrides="";if(overrides.indexOf(sysOCWithSlot+":")<0&&!isDefault)
{newOverrides=overrides+((overrides!="")?"|":"");newOverrides+=sysOCWithSlot+":"+modId+"~"+optId;this.UpdateHashValue(newOverrides);return;}
$.each(overrides.split("|"),function(ocIndex,ocData){var ocDataSet=ocData.split(":");if(ocDataSet[0]!=sysOCWithSlot)
{newOverrides+=((newOverrides!="")?"|":"")+ocData;return true;}
var modulesData=ocDataSet[1];var exists=modulesData.indexOf(modId+"~")==0||modulesData.indexOf(";"+modId+"~")>=0;if(ccOC==""&&!exists&&!isDefault)
{newOverrides+=((newOverrides!="")?"|":"")+ocData+";"+modId+"~"+optId;return true;}
var newModData="";$.each(modulesData.split(";"),function(modIndex,modData)
{var modDataSet=modData.split("~");var dataModId=modDataSet[0];var optData=modDataSet[1];var isRightCCMod=(ccMod==null)||(ccMod!=null&&dataModId==ccMod);if((ccOC==""&&dataModId!=modId)||(ccOC!=""&&(!isRightCCMod||optData.indexOf(ccOptionId)<0)))
{newModData+=((newModData!="")?";":"")+modData;return true;}
if(ccOC=="")
{if(multiSelect)
{var newOptData="";$.each(optData.split("+"),function(index,data)
{if(data.indexOf(optId)<0)
newOptData+=((newOptData!="")?"+":"")+data;});if(checked)
newOptData+=((newOptData!="")?"+":"")+optId;if(newOptData!="")
newModData+=((newModData!="")?";":"")+dataModId+"~"+newOptData;}
else
{if(optId!=""&&!isDefault)
newModData+=((newModData!="")?";":"")+modId+"~"+optId;}}
else
{var newOptData="";$.each(optData.split("+"),function(index,data)
{if(data.indexOf(ccOptionId)<0)
{newOptData+=((newOptData!="")?"+":"")+data;return true;}
var ccData=DELL.com.ProductHubModuleUpsell.UpdateCompositeConfigOverrides(ccOC,ccOptionId,modId,optId,data,multiSelect,checked);newOptData+=((newOptData!="")?"+":"")+ccData;});if(newOptData!="")
newModData+=((newModData!="")?";":"")+dataModId+"~"+newOptData;}});if(newModData!="")
newOverrides+=((newOverrides!="")?"|":"")+sysOCWithSlot+":"+newModData;});this.UpdateHashValue(newOverrides);},this.UpdateCompositeConfigOverrides=function(ccOC,ccOptionId,modId,optId,ocData,multiSelect,checked)
{var isDefault=false;var ccUid=DELL.com.Utils.getUidFromOptId(ccOC.toUpperCase());var defaultOptions=$("#"+ccUid+"DefaultOptions").attr("value");if(defaultOptions!=null&&defaultOptions!="")
isDefault=defaultOptions.indexOf("|"+modId+"~"+optId+"|")>=0;var newOverrides="";if(ocData.indexOf(ccOptionId+"^")<0&&!isDefault)
{newOverrides=ccOptionId+"^"+modId+"*"+optId;return newOverrides;}
var ocDataSet=ocData.split("^");var modulesData=ocDataSet[1];var exists=modulesData.indexOf(modId+"*")==0||modulesData.indexOf("!"+modId+"*")>=0;if(!exists&&!isDefault)
{newOverrides=ocData+"!"+modId+"*"+optId;return newOverrides;}
var newModData="";$.each(modulesData.split("!"),function(modIndex,modData)
{var modParts=modData.split("*");var dataModId=modParts[0];var optData=modParts[1];if(dataModId!=modId)
{newModData+=((newModData!="")?"!":"")+modData;return true;}
if(multiSelect)
{var newOptData="";$.each(optData.split("-"),function(index,data)
{if(data!=optId)
newOptData+=((newOptData!="")?"-":"")+data;});if(checked)
newOptData+=((newOptData!="")?"-":"")+optId;if(newOptData!="")
newModData+=((newModData!="")?"!":"")+dataModId+"*"+newOptData;}
else
{if(optId!=""&&!isDefault)
newModData+=((newModData!="")?"!":"")+modId+"*"+optId;}});if(newModData!="")
newOverrides=ccOptionId+"^"+newModData;else
newOverrides=ccOptionId;return newOverrides;},this.UpdateCTAAndModules=function(ocId,req){var $realOCPrice=$("#OcPrice_"+ocId.toUpperCase());if($realOCPrice.closest("th").index()===configCompareSlot||$(".hubConfigStack").length>0)
{$realOCPrice.html(req.StackPriceHtml);}
else
{$("#compareGrid th").eq(configCompareSlot).find("div.defaultPriceBlock").html(req.StackPriceHtml);}
var $originalCTA=$("#primaryBtn_"+ocId.toUpperCase());if($originalCTA.closest("th").index()===configCompareSlot||$(".hubConfigStack").length>0)
$originalCTA.html(req.CTAHtml);else
$("#compareGrid th").eq(configCompareSlot).find("div.defaultCTA").html(req.CTAHtml)
if($(".compareContainer").length>0){var $zombieRealPrice=$("#hubZombiePrice_"+ocId.toUpperCase());var $zombieOriginalCTA=$("#hubZombiePrimaryBtn_"+ocId.toUpperCase());var $zombieOriginalShipDate=$("#hubZombieShipDate_"+ocId.toUpperCase());if($zombieRealPrice.closest("td").index()===configCompareSlot-1){$zombieRealPrice.html(req.ZombiePriceHtml);$zombieOriginalCTA.html(req.CTAHtml);$zombieOriginalShipDate.html(req.ShipDateHtml);}
else{$(".compareContainer #remoteCarousel td").eq(configCompareSlot-1).find("div.defaultZombiePrice").html(req.ZombiePriceHtml);$(".compareContainer #remoteCarousel td").eq(configCompareSlot-1).find("div.defaultPrimaryBtn").html(req.CTAHtml);$(".compareContainer #remoteCarousel td").eq(configCompareSlot-1).find("div.defaultZombieShipDate").html(req.ShipDateHtml);}}
else{$("#hubZombiePrimaryBtn_"+ocId.toUpperCase()).html(req.CTAHtml);$("#hubZombiePrice_"+ocId.toUpperCase()).html(req.ZombiePriceHtml);$("#hubZombieShipDate_"+ocId.toUpperCase()).html(req.ShipDateHtml);}
if(req.ProductHubSpecs!=null)
{$.each(req.ProductHubSpecs,function(index,data){if($(".compareContainer").length>0)
{$("."+modPopUpParent+" #shortSpec\\~"+data.OrderCode+"\\~"+data.ModuleId).text(data.ShortSpec);$("."+modPopUpParent+" #longSpec\\~"+data.OrderCode+"\\~"+data.ModuleId).text(data.LongSpec);var $shortSpecs=$("#compareGrid .shortSpecDummy span[id*=shortSpec\\~"+data.OrderCode+"\\~"+data.ModuleId+"\\~"+specRow+"]");var $shortSpec=$("#shortSpec\\~"+data.OrderCode+"\\~"+data.ModuleId);if($shortSpecs.length>1){$.each($shortSpecs,function(i){if($(this).attr("id").indexOf("specClone")===-1&&$(this).closest("td").index()===configCompareSlot){$(this).text(data.ShortSpec);}});}
if($shortSpec.closest("td").index()===configCompareSlot){$shortSpec.text(data.ShortSpec);}}
else
{$("#shortSpec\\~"+data.OrderCode+"\\~"+data.ModuleId).text(data.ShortSpec);$("#longSpec\\~"+data.OrderCode+"\\~"+data.ModuleId).text(data.LongSpec);}});}
if(req.ModOptionErrorHtml!=null&&req.ModOptionErrorHtml!="")
{DELL.com.ProductHub.ModErrorAlert(ocId);}
else
{var $modErrBlock=$("#modErrBlock_"+ocId.toUpperCase());if($(".compareContainer").length>0){if($modErrBlock.closest("th").index()===configCompareSlot){$modErrBlock.hide();}
else{$("#compareGrid th").eq(configCompareSlot).find("div.defaultModErrBlock").hide();}}
else{$modErrBlock.hide();}}},this.UpdateMagCTAAndModules=function(ocId,req){if($("#magCompareTray, .plris #compareGrid").length>0){var ocUid=DELL.com.Utils.getUidFromOC(ocId);var colIndex=configCompareSlot+1;var zombieRow=colIndex-2;if($(".plris #compareGrid").length>0){ocUid=ocId;colIndex=$("th#target"+ocUid).index()+1;}
var col=$("#compareGrid td:nth-child("+colIndex+")");$.each(req.ProductHubSpecs,function(index,data){var specUid=DELL.com.Utils.getUidFromOC(data.OrderCode);if(col.find(".spec\\~"+specUid+"\\~"+data.ModuleId).length>0){var td=col.find(".spec\\~"+specUid+"\\~"+data.ModuleId).parent();if(td.find(".defaultSpec").length==0)
td.prepend(col.find(".spec\\~"+specUid+"\\~"+data.ModuleId).clone().addClass("defaultSpec hide"));td.find(".spec\\~"+specUid+"\\~"+data.ModuleId).not(".defaultSpec").text(data.LongSpec||data.ShortSpec);}});col=$("#compareGrid th:nth-child("+colIndex+")");if(col.find(".defaultStack").length==0){col.find(".pStack").parent().prepend(col.find(".configOc_"+ocUid+" .pStack").clone().addClass("defaultStack hide"));}
col.find(".pStack").not(".defaultStack").html(req.StackPriceHtml);if($('.plris #compareGrid').length>0){$('.pStack:visible').height('');DELL.com.Plris.Compare.fixHeight();}
$(".pStack .compareBtn").addClass("hide");if($(".compareZombieBar td:eq("+zombieRow+")").find(".defaultZombie").length==0){$(".compareZombieBar td:eq("+zombieRow+")").prepend($(".compareZombieBar td:eq("+zombieRow+")").find(".colContent").clone().addClass("defaultZombie hide"));}
$(".compareZombieBar td:eq("+zombieRow+")").find(".colContent").not(".defaultZombie").html(req.ZombiePriceHtml);$(".compareZombieBar td:eq("+zombieRow+"), .compareZombieBar td:eq("+zombieRow+") .priceBlock").addClass("hover").delay(1500).queue(function(next){$(this).removeClass("hover");next();});$(".primaryBtn .btn, .defaultPrimaryBtn .btn, .pStack .purchase, .pStack .secondaryNav").bind("click",function(){if($(this).hasClass("disabled"))return false;});}
else{var uId=DELL.com.Utils.getUidFromOC(req.OrderCodeId);var configColumn=$('#configOc_'+uId);var isPlris=($('.plris').length>0);$.each(req.ProductHubSpecs,function(index,data){var specUid=DELL.com.Utils.getUidFromOC(data.OrderCode);var cSpec=configColumn.find(".spec\\~"+specUid+"\\~"+data.ModuleId);cSpec.text(data.LongSpec||data.ShortSpec);var cSpecIndex=cSpec.parent().attr('data-specindex');$('.specContent[data-specindex="'+cSpecIndex+'"]:visible').height('');if($("#sliding_tabs").length>0){if(isPlris&&!$('.singleConfig').length){var cId=configColumn.attr('id'),specDivs=$('.'+cId).not(configColumn).find(".spec\\~"+DELL.com.Utils.getUidFromOC(data.OrderCode)+"\\~"+data.ModuleId);specDivs.text(data.LongSpec||data.ShortSpec);$('.configStackPage').each(function(){DELL.com.Mag.ConfigTab.FindDifferentSpecs(cSpecIndex,$(this));});}else{DELL.com.Mag.ConfigTab.FindDifferentSpecs(cSpecIndex);}}});var productDiv=configColumn.find('.pStack:not(#prcBar,.simpleStack)');productDiv.html(req.StackPriceHtml);if(isPlris&&!$('.singleConfig').length){var columnId=configColumn.attr('id'),productDivs=$('.'+columnId).not(configColumn).find('.pStack:not(#prcBar,.simpleStack)'),priceDivs=$('.'+columnId).find('.simpleStack');productDivs.html(req.StackPriceHtml);priceDivs.html(req.ZombiePriceHtml);}else if(isPlris){var $err=$(req.StackPriceHtml).find('.modErrBlock');if($err.length>0&&$('.modErrBlock').length==0)
$('.errBlock').append($err);else if($err.length==0)
$('.errBlock').html('');}
productDiv.find('.secondaryNav').remove();productDiv.find('.pStackHeader a').contents().unwrap();productDiv.find('.qvLnk').remove();productDiv.find('.configImg a').contents().unwrap();if($("#sliding_tabs").length>0){if(!isPlris){DELL.com.Mag.ZombiePd.updateStack($('.configOc_'+uId,'.configRemoteCarousel'),req.ZombiePriceHtml);}
$('.pStack:visible').height('');DELL.com.Mag.ConfigTab.FixSpecHeight(true);}
DELL.com.Init.InitLinks();}},onload={initialize:function(){}};DELL.com.Utils.Initialize(onload);}).call(DELL.com.ProductHubModuleUpsell);})(jQuery);
if (window.console){console.log('ex time: hub_module_upsell.js', new Date().getTime() - startTScript);}



/*script:ir_cookie.js*/
var startTScript=new Date().getTime ();

var _enableIR=true;var DELL=window.DELL||{};DELL.com=DELL.com||{};DELL.com.IR=DELL.com.IR||{};DELL.com.IR.Cookie=DELL.com.IR.Cookie||{};(function($){$.extend({stringify:function stringify(obj){var t=typeof(obj);if(t!="object"||obj===null){if(t=="string")obj='"'+obj+'"';return String(obj);}else{var n,v,json=[],arr=(obj&&obj.constructor==Array);for(n in obj){v=obj[n];t=typeof(v);if(obj.hasOwnProperty(n)){if(t=="string")v='"'+v+'"';else if(t=="object"&&v!==null)v=$.stringify(v);json.push((arr?"":'"'+n+'":')+String(v));}}
return(arr?"[":"{")+String(json)+(arr?"]":"}");}}});DELL.com.IR.Cookie={options:{enabled:_enableIR,cookieName:'RBI_RPI',limit:{rbi:3,rpi:5},template:{rbi:{systems:'http://www.dell.com/[:country]/[:segment]/p/[:product]/pd',snp:'http://accessories.dell.com/sna/productdetail.aspx?c=[:country]&l=[:language]&s=[:segment]&cs=[:cs]&sku=[:product]'},rpi:{systems:'http://configure.dell.com/dellstore/config.aspx?oc=[:product]&c=[:country]&l=[:language]&s=[:segment]&cs=[:cs]',snp:'http://accessories.dell.com/sna/productdetail.aspx?c=[:country]&l=[:language]&s=[:segment]&cs=[:cs]&sku=[:product]'}}},list:{},pvList:[],init:function(){var isPd=(s_dell.prop1=='productdetails')?true:false;var isSku=(s_dell.pageName.indexOf('productdetail::[sku=')>-1)?true:false;var isPurchase=(s_dell.events.indexOf('purchase')>-1)?true:false;if(this.options.enabled){this.getCookieData();if(isPd||isSku||isPurchase){this.isSet()?this.update():this.create();this.processProdVariants();this.save();}}},isSet:function(){return s_dell.c_r(this.options.cookieName)==''?false:true;},create:function(){this.list={rbi:{systems:new Array(),snp:new Array(),country:null,language:null,cs:null},rpi:{systems:new Array(),snp:new Array(),country:null,language:null,cs:null}};this.process();},getCookieData:function(){if(this.isSet()){try{this.list=eval('('+s_dell.c_r(this.options.cookieName)+')');}catch(e){var oldDate=new Date();oldDate.setDate(oldDate.getDate()-1);s_dell.c_w(this.options.cookieName,'',oldDate);}}},update:function(){this.process();},save:function(){var currentDate=new Date();currentDate.setDate(currentDate.getDate()+365);s_dell.c_w(this.options.cookieName,$.stringify(this.list),currentDate);},inList:function(type,id){for(var item in this.list.rbi[type]){if(DELL.com.IR.Cookie.list.rbi[type][item].id==id){return item;}}
return-1;},process:function(){var products=this.getProducts();for(var nmb in products){var product=products[nmb];var prodCat=(product.purchased?'rpi':'rbi');if(!product.purchased&&(prodIndex=this.inList(product.type,product.id))!=-1){this.updateProduct(prodIndex,product);}
else if(this.list[prodCat].systems.length+this.list[prodCat].snp.length<this.options.limit[prodCat]){this.addProduct(product);}
else{var otherType=((product.type=='systems')?'snp':'systems');if(this.list[prodCat][product.type].length>=(this.options.limit[prodCat]-1)){this.removeProduct(product.purchased,product.type);}
else if(this.list[prodCat][otherType].length==this.options.limit[prodCat]){this.removeProduct(product.purchased,otherType);}
else{this.removeProduct(product.purchased);}
this.addProduct(product);}}},addProduct:function(product){var cat=(product.purchased)?'rpi':'rbi';var prodEntry={id:product.id,url:product.url,timestamp:product.timestamp};if(product.purchased){prodEntry.qty=product.quantity;prodEntry.price=product.price;prodEntry.pvid=null;}
this.list[cat][product.type].push(prodEntry);this.list[cat].country=product.country;this.list[cat].language=product.language;this.list[cat].cs=product.cs;},updateProduct:function(index,product){this.list[(product.purchased?'rpi':'rbi')][product.type][index].timestamp=product.timestamp;},getProducts:function(){var prod=new Array();if(s_dell.pageName.indexOf('productdetails')>-1){prod.push({type:'systems',id:s_dell.pageName.split('productdetails:')[1],url:s_dell.prop14?s_dell.prop14:null,timestamp:(new Date).getTime(),country:s_dell.prop2?s_dell.prop2:null,language:s_dell.prop3?s_dell.prop3:null,cs:s_dell.prop6?s_dell.prop6:null,purchased:false,quantity:null,price:null});}
else if(s_dell.pageName.indexOf('productdetail::[sku=')>-1){var pr={type:'snp',id:s_dell.pageName.split('productdetail::[sku=')[1].split(']')[0],timestamp:(new Date).getTime(),country:s_dell.prop2?s_dell.prop2:null,language:s_dell.prop3?s_dell.prop3:null,cs:s_dell.prop6?s_dell.prop6:null,purchased:false,quantity:null,price:null};pr.url=this.buildUrl('rbi',pr.type,pr.id);prod.push(pr);}
else if(s_dell.events.indexOf('purchase')>-1){var prodList=s_dell.products.split(',');var nProdList=new Array();for(var prodData in prodList){var pData=prodList[prodData].split(';');nProdList.push(pData);}
nProdList.sort(function(a,b){return((b[2]*b[3])-(a[2]*a[3]));});if(nProdList.length>5)nProdList.splice(5,nProdList.length-5);for(var product in nProdList){var pr={type:this.getProductType(nProdList[product][1]),id:nProdList[product][1],timestamp:(new Date).getTime(),country:s_dell.prop2?s_dell.prop2:null,language:s_dell.prop3?s_dell.prop3:null,cs:s_dell.prop6?s_dell.prop6:null,purchased:true,quantity:nProdList[product][2],price:Math.round(nProdList[product][3])};pr.url=this.buildUrl('rpi',pr.type,pr.id);prod.push(pr);}}
else{return false;}
return prod;},removeProduct:function(purchased,type){var prodCat=(purchased?'rpi':'rbi');var min=null;if(type){for(product in this.list[prodCat][type]){if((min==null)||(this.list[prodCat][type][product].timestamp<this.list[prodCat][type][min].timestamp)){min=product;}}}else{for(product in this.list[prodCat].systems){if((min==null)||(this.list[prodCat].systems[product].timestamp<this.list[prodCat][type][min].timestamp)){min=product;type='systems';}}
for(product in this.list[prodCat].snp){if((min==null)||(this.list[prodCat].snp[product].timestamp<this.list[prodCat][type][min].timestamp)){min=product;type='snp';}}}
this.list[prodCat][type].splice(min,1);},getProductType:function(pid){var skuPattern=/^(([Aa][0-9A-Za-z]{7})|([0-9]*-[0-9]*))$/;return(skuPattern.test(pid)?'snp':'systems');},buildUrl:function(cat,type,id){var url=this.options.template[cat][type];url=url.replace('[:country]',s_dell.prop2);url=url.replace('[:language]',s_dell.prop3);url=url.replace('[:segment]',s_dell.eVar32);url=url.replace('[:cs]',s_dell.prop6);url=url.replace('[:product]',id);return url;},setProdVariants:function(pv){if(typeof(pv)=='string'){this.pvList.push(pv);}else if(typeof(pv)=='object'){this.pvList=this.pvList.concat(pv);}else{return false;}
return true;},processProdVariants:function(){for(var pv in this.pvList){var pvOc=this.pvList[pv].split(':');for(var item in this.list.rpi.systems){if(this.list.rpi.systems[item].id==pvOc[0])
this.list.rpi.systems[item].pvid=pvOc[1];}}}};$(document).ready(function(){if(typeof(s_dell)!='undefined'){DELL.com.IR.Cookie.init();}});})(jQuery);
if (window.console){console.log('ex time: ir_cookie.js', new Date().getTime() - startTScript);}


