(function(a){a.fn.closeDOMWindow=function(c){if(!c){c={}}var b=function(g){if(c.anchoredClassName){var d=a("."+c.anchoredClassName);d.fadeOut("fast",function(){if(a.fn.draggable){d.draggable("destory").trigger("unload").remove()}else{d.trigger("unload").remove()}});if(c.functionCallOnClose){c.functionCallAfterClose()}}else{var f=a("#DOMWindowOverlay");var e=a("#DOMWindow");f.fadeOut("fast",function(){f.trigger("unload").unbind().remove()});e.fadeOut("fast",function(){if(a.fn.draggable){e.draggable("destroy").trigger("unload").remove()}else{e.trigger("unload").remove()}});a(window).unbind("scroll.DOMWindow");a(window).unbind("resize.DOMWindow");if(a.fn.openDOMWindow.isIE6){a("#DOMWindowIE6FixIframe").remove()}if(c.functionCallOnClose){c.functionCallAfterClose()}}};if(c.eventType){return this.each(function(d){a(this).bind(c.eventType,function(){b(this);return false})})}else{b()}};a.closeDOMWindow=function(b){a.fn.closeDOMWindow(b)};a.fn.openDOMWindow=function(e){var h=a.fn.openDOMWindow;h.defaultsSettings={anchoredClassName:"",anchoredSelector:"",borderColor:"#ccc",borderSize:"4",draggable:0,eventType:null,fixedWindowY:100,functionCallOnOpen:null,functionCallOnClose:null,height:500,loader:0,loaderHeight:0,loaderImagePath:"",loaderWidth:0,modal:0,overlay:1,overlayColor:"#000",overlayOpacity:"85",positionLeft:0,positionTop:0,positionType:"centered",width:500,windowBGColor:"#fff",windowBGImage:null,windowHTTPType:"get",windowPadding:10,windowSource:"inline",windowSourceID:"",windowSourceURL:"",windowSourceAttrURL:"href"};var g=a.extend({},a.fn.openDOMWindow.defaultsSettings,e||{});h.viewPortHeight=function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight};h.viewPortWidth=function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth};h.scrollOffsetHeight=function(){return self.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop};h.scrollOffsetWidth=function(){return self.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft};h.isIE6=typeof document.body.style.maxHeight==="undefined";var k=function(){var m=a("#DOMWindowOverlay");if(h.isIE6){var n=document.documentElement.offsetHeight+document.documentElement.scrollTop-4;var o=document.documentElement.offsetWidth-21;m.css({height:n+"px",width:o+"px"})}else{m.css({height:"100%",width:"100%",position:"fixed"})}};var j=function(){var m=document.documentElement.offsetHeight+document.documentElement.scrollTop-4;var n=document.documentElement.offsetWidth-21;a("#DOMWindowIE6FixIframe").css({height:m+"px",width:n+"px"})};var b=function(){var m=a("#DOMWindow");if(g.height+50>h.viewPortHeight()){m.css("left",Math.round(h.viewPortWidth()/2)+h.scrollOffsetWidth()-Math.round((m.outerWidth())/2))}else{m.css("left",Math.round(h.viewPortWidth()/2)+h.scrollOffsetWidth()-Math.round((m.outerWidth())/2));m.css("top",Math.round(h.viewPortHeight()/2)+h.scrollOffsetHeight()-Math.round((m.outerHeight())/2))}};var c=function(){var m=a("#DOMWindowLoader");if(h.isIE6){m.css({left:Math.round(h.viewPortWidth()/2)+h.scrollOffsetWidth()-Math.round((m.innerWidth())/2),position:"absolute"});m.css({top:Math.round(h.viewPortHeight()/2)+h.scrollOffsetHeight()-Math.round((m.innerHeight())/2),position:"absolute"})}else{m.css({left:"50%",top:"50%",position:"fixed"})}};var d=function(){var m=a("#DOMWindow");m.css("left",g.positionLeft+h.scrollOffsetWidth());m.css("top",+g.positionTop+h.scrollOffsetHeight())};var i=function(m){if(arguments[0]){a("."+m+" #DOMWindowLoader").remove();a("."+m+" #DOMWindowContent").fadeIn("fast",function(){if(g.functionCallOnOpen){g.functionCallOnOpen()}});a("."+m+".closeDOMWindow").click(function(){a.closeDOMWindow();return false})}else{a("#DOMWindowLoader").remove();a("#DOMWindow").fadeIn("fast",function(){if(g.functionCallOnOpen){g.functionCallOnOpen()}});a("#DOMWindow .closeDOMWindow").click(function(){a.closeDOMWindow();return false})}};var l=function(n){var m={};n.replace(/b([^&=]*)=([^&=]*)b/g,function(q,o,p){if(typeof m[o]!="undefined"){m[o]+=","+p}else{m[o]=p}});return m};var f=function(r){g.windowSourceID=a(r).attr("href")||g.windowSourceID;g.windowSourceURL=a(r).attr(g.windowSourceAttrURL)||g.windowSourceURL;g.windowBGImage=g.windowBGImage?"background-image:url("+g.windowBGImage+")":"";var s,t;if(g.positionType=="anchored"){var o=a(g.anchoredSelector).position();var p=o.left+g.positionLeft;var q=o.top+g.positionTop;a("body").append('<div class="'+g.anchoredClassName+'" style="'+g.windowBGImage+";background-repeat:no-repeat;padding:"+g.windowPadding+"px;overflow:auto;position:absolute;top:"+q+"px;left:"+p+"px;height:"+g.height+"px;width:"+g.width+"px;background-color:"+g.windowBGColor+";border:"+g.borderSize+"px solid "+g.borderColor+';z-index:10001"><div id="DOMWindowContent" style="display:none"></div></div>');if(g.loader&&g.loaderImagePath!==""){a("."+g.anchoredClassName).append('<div id="DOMWindowLoader" style="width:'+g.loaderWidth+"px;height:"+g.loaderHeight+'px;"><img src="'+g.loaderImagePath+'" /></div>')}if(a.fn.draggable){if(g.draggable){a("."+g.anchoredClassName).draggable({cursor:"move"})}}switch(g.windowSource){case"inline":a("."+g.anchoredClassName+" #DOMWindowContent").append(a(g.windowSourceID).children());a("."+g.anchoredClassName).unload(function(){a("."+g.windowSourceID).append(a("."+g.anchoredClassName+" #DOMWindowContent").children())});i(g.anchoredClassName);break;case"iframe":a("."+g.anchoredClassName+" #DOMWindowContent").append('<iframe frameborder="0" hspace="0" wspace="0" src="'+g.windowSourceURL+'" name="DOMWindowIframe'+Math.round(Math.random()*1000)+'" style="width:100%;height:100%;border:none;background-color:#fff;" class="'+g.anchoredClassName+'Iframe" ></iframe>');a("."+g.anchoredClassName+"Iframe").load(i(g.anchoredClassName));break;case"ajax":if(g.windowHTTPType=="post"){if(g.windowSourceURL.indexOf("?")!==-1){s=g.windowSourceURL.substr(0,g.windowSourceURL.indexOf("?"));t=l(g.windowSourceURL)}else{s=g.windowSourceURL;t={}}a("."+g.anchoredClassName+" #DOMWindowContent").load(s,t,function(){i(g.anchoredClassName)})}else{if(g.windowSourceURL.indexOf("?")==-1){g.windowSourceURL+="?"}a("."+g.anchoredClassName+" #DOMWindowContent").load(g.windowSourceURL+"&random="+(new Date().getTime()),function(){i(g.anchoredClassName)})}break}}else{if(g.overlay){a("body").append('<div id="DOMWindowOverlay" style="z-index:10000;display:none;position:absolute;top:0;left:0;background-color:'+g.overlayColor+";filter:alpha(opacity="+g.overlayOpacity+");-moz-opacity: 0."+g.overlayOpacity+";opacity: 0."+g.overlayOpacity+';"></div>');if(h.isIE6){a("body").append('<iframe id="DOMWindowIE6FixIframe"  src="blank.html"  style="width:100%;height:100%;z-index:9999;position:absolute;top:0;left:0;filter:alpha(opacity=0);"></iframe>');j()}k();var n=a("#DOMWindowOverlay");n.fadeIn("fast");if(!g.modal){n.click(function(){a.closeDOMWindow()})}}if(g.loader&&g.loaderImagePath!==""){a("body").append('<div id="DOMWindowLoader" style="z-index:10002;width:'+g.loaderWidth+"px;height:"+g.loaderHeight+'px;"><img src="'+g.loaderImagePath+'" /></div>');c()}a("body").append('<div id="DOMWindow" style="background-repeat:no-repeat;'+g.windowBGImage+";overflow:auto;padding:"+g.windowPadding+"px;display:none;height:"+g.height+"px;width:"+g.width+"px;background-color:"+g.windowBGColor+";border:"+g.borderSize+"px solid "+g.borderColor+'; position:absolute;z-index:10001"></div>');var m=a("#DOMWindow");switch(g.positionType){case"centered":b();if(g.height+50>h.viewPortHeight()){m.css("top",(g.fixedWindowY+h.scrollOffsetHeight())+"px")}break;case"absolute":m.css({top:(g.positionTop+h.scrollOffsetHeight())+"px",left:(g.positionLeft+h.scrollOffsetWidth())+"px"});if(a.fn.draggable){if(g.draggable){m.draggable({cursor:"move"})}}break;case"fixed":d();break;case"anchoredSingleWindow":var o=a(g.anchoredSelector).position();var p=o.left+g.positionLeft;var q=o.top+g.positionTop;m.css({top:q+"px",left:p+"px"});break}a(window).bind("scroll.DOMWindow",function(){if(g.overlay){k()}if(h.isIE6){j()}if(g.positionType=="centered"){b()}if(g.positionType=="fixed"){d()}});a(window).bind("resize.DOMWindow",function(){if(h.isIE6){j()}if(g.overlay){k()}if(g.positionType=="centered"){b()}});switch(g.windowSource){case"inline":m.append(a(g.windowSourceID).children());m.unload(function(){a(g.windowSourceID).append(m.children())});i();break;case"iframe":m.append('<iframe frameborder="0" hspace="0" wspace="0" src="'+g.windowSourceURL+'" name="DOMWindowIframe'+Math.round(Math.random()*1000)+'" style="width:100%;height:100%;border:none;background-color:#fff;" id="DOMWindowIframe" ></iframe>');a("#DOMWindowIframe").load(i());break;case"ajax":if(g.windowHTTPType=="post"){if(g.windowSourceURL.indexOf("?")!==-1){s=g.windowSourceURL.substr(0,g.windowSourceURL.indexOf("?"));t=l(g.windowSourceURL)}else{s=g.windowSourceURL;t={}}m.load(s,t,function(){i()})}else{if(g.windowSourceURL.indexOf("?")==-1){g.windowSourceURL+="?"}m.load(g.windowSourceURL+"&random="+(new Date().getTime()),function(){i()})}break}}};if(g.eventType){return this.each(function(m){a(this).bind(g.eventType,function(){f(this);return false})})}else{f()}};a.openDOMWindow=function(b){a.fn.openDOMWindow(b)}})(jQuery);