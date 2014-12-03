/*

	jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)

	Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.

	Original is (c) Dojo Foundation 2004-2009. Released under either AFL or new BSD, see:
	http://dojofoundation.org/license for more information.

https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js

*/

;(function(d){

	// the topic/subscription hash
	var cache = {};

	d.publish = function(/* String */topic, /* Array? */args){
		// summary:
		//		Publish some data on a named topic.
		// topic: String
		//		The channel to publish on
		// args: Array?
		//		The data to publish. Each array item is converted into an ordered
		//		arguments on the subscribed functions.
		//
		// example:
		//		Publish stuff on '/some/topic'. Anything subscribed will be called
		//		with a function signature like: function(a,b,c){ ... }
		//
		//	|		$.publish("/some/topic", ["a","b","c"]);
		d.each(cache[topic], function(){
			this.apply(d, args || []);
		});
	};

	d.subscribe = function(/* String */topic, /* Function */callback){
		// summary:
		//		Register a callback on a named topic.
		// topic: String
		//		The channel to subscribe to
		// callback: Function
		//		The handler event. Anytime something is $.publish'ed on a
		//		subscribed channel, the callback will be called with the
		//		published array as ordered arguments.
		//
		// returns: Array
		//		A handle which can be used to unsubscribe this particular subscription.
		//
		// example:
		//	|	$.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
		//
		if(!cache[topic]){
			cache[topic] = [];
		}
		cache[topic].push(callback);
		return [topic, callback]; // Array
	};

	d.unsubscribe = function(/* Array */handle){
		// summary:
		//		Disconnect a subscribed function for a topic.
		// handle: Array
		//		The return value from a $.subscribe call.
		// example:
		//	|	var handle = $.subscribe("/something", function(){});
		//	|	$.unsubscribe(handle);

		var t = handle[0];
		cache[t] && d.each(cache[t], function(idx){
			if(this == handle[1]){
				cache[t].splice(idx, 1);
			}
		});
	};

})(jQuery);// ColorBox v1.3.15 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2010 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(b,ib){var t="none",M="LoadedContent",c=false,v="resize.",o="y",q="auto",e=true,L="nofollow",m="x";function f(a,c){a=a?' id="'+i+a+'"':"";c=c?' style="'+c+'"':"";return b("<div"+a+c+"/>")}function p(a,b){b=b===m?n.width():n.height();return typeof a==="string"?Math.round(/%/.test(a)?b/100*parseInt(a,10):parseInt(a,10)):a}function U(b){return a.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(b)}function cb(a){for(var c in a)if(b.isFunction(a[c])&&c.substring(0,2)!=="on")a[c]=a[c].call(l);a.rel=a.rel||l.rel||L;a.href=a.href||b(l).attr("href");a.title=a.title||l.title;return a}function w(c,a){a&&a.call(l);b.event.trigger(c)}function jb(){var b,e=i+"Slideshow_",c="click."+i,f,k;if(a.slideshow&&h[1]){f=function(){F.text(a.slideshowStop).unbind(c).bind(V,function(){if(g<h.length-1||a.loop)b=setTimeout(d.next,a.slideshowSpeed)}).bind(W,function(){clearTimeout(b)}).one(c+" "+N,k);j.removeClass(e+"off").addClass(e+"on");b=setTimeout(d.next,a.slideshowSpeed)};k=function(){clearTimeout(b);F.text(a.slideshowStart).unbind([V,W,N,c].join(" ")).one(c,f);j.removeClass(e+"on").addClass(e+"off")};a.slideshowAuto?f():k()}}function db(c){if(!O){l=c;a=cb(b.extend({},b.data(l,r)));h=b(l);g=0;if(a.rel!==L){h=b("."+G).filter(function(){return (b.data(this,r).rel||this.rel)===a.rel});g=h.index(l);if(g===-1){h=h.add(l);g=h.length-1}}if(!u){u=D=e;j.show();if(a.returnFocus)try{l.blur();b(l).one(eb,function(){try{this.focus()}catch(a){}})}catch(f){}x.css({opacity:+a.opacity,cursor:a.overlayClose?"pointer":q}).show();a.w=p(a.initialWidth,m);a.h=p(a.initialHeight,o);d.position(0);X&&n.bind(v+P+" scroll."+P,function(){x.css({width:n.width(),height:n.height(),top:n.scrollTop(),left:n.scrollLeft()})}).trigger("scroll."+P);w(fb,a.onOpen);Y.add(H).add(I).add(F).add(Z).hide();ab.html(a.close).show()}d.load(e)}}var gb={transition:"elastic",speed:300,width:c,initialWidth:"600",innerWidth:c,maxWidth:c,height:c,initialHeight:"450",innerHeight:c,maxHeight:c,scalePhotos:e,scrolling:e,inline:c,html:c,iframe:c,photo:c,href:c,title:c,rel:c,opacity:.9,preloading:e,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:c,returnFocus:e,loop:e,slideshow:c,slideshowAuto:e,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:c,onLoad:c,onComplete:c,onCleanup:c,onClosed:c,overlayClose:e,escKey:e,arrowKey:e},r="colorbox",i="cbox",fb=i+"_open",W=i+"_load",V=i+"_complete",N=i+"_cleanup",eb=i+"_closed",Q=i+"_purge",hb=i+"_loaded",E=b.browser.msie&&!b.support.opacity,X=E&&b.browser.version<7,P=i+"_IE6",x,j,A,s,bb,T,R,S,h,n,k,J,K,Z,Y,F,I,H,ab,B,C,y,z,l,g,a,u,D,O=c,d,G=i+"Element";d=b.fn[r]=b[r]=function(c,f){var a=this,d;if(!a[0]&&a.selector)return a;c=c||{};if(f)c.onComplete=f;if(!a[0]||a.selector===undefined){a=b("<a/>");c.open=e}a.each(function(){b.data(this,r,b.extend({},b.data(this,r)||gb,c));b(this).addClass(G)});d=c.open;if(b.isFunction(d))d=d.call(a);d&&db(a[0]);return a};d.init=function(){var l="hover",m="clear:left";n=b(ib);j=f().attr({id:r,"class":E?i+"IE":""});x=f("Overlay",X?"position:absolute":"").hide();A=f("Wrapper");s=f("Content").append(k=f(M,"width:0; height:0; overflow:hidden"),K=f("LoadingOverlay").add(f("LoadingGraphic")),Z=f("Title"),Y=f("Current"),I=f("Next"),H=f("Previous"),F=f("Slideshow").bind(fb,jb),ab=f("Close"));A.append(f().append(f("TopLeft"),bb=f("TopCenter"),f("TopRight")),f(c,m).append(T=f("MiddleLeft"),s,R=f("MiddleRight")),f(c,m).append(f("BottomLeft"),S=f("BottomCenter"),f("BottomRight"))).children().children().css({"float":"left"});J=f(c,"position:absolute; width:9999px; visibility:hidden; display:none");b("body").prepend(x,j.append(A,J));s.children().hover(function(){b(this).addClass(l)},function(){b(this).removeClass(l)}).addClass(l);B=bb.height()+S.height()+s.outerHeight(e)-s.height();C=T.width()+R.width()+s.outerWidth(e)-s.width();y=k.outerHeight(e);z=k.outerWidth(e);j.css({"padding-bottom":B,"padding-right":C}).hide();I.click(d.next);H.click(d.prev);ab.click(d.close);s.children().removeClass(l);b("."+G).live("click",function(a){if(!(a.button!==0&&typeof a.button!=="undefined"||a.ctrlKey||a.shiftKey||a.altKey)){a.preventDefault();db(this)}});x.click(function(){a.overlayClose&&d.close()});b(document).bind("keydown",function(b){if(u&&a.escKey&&b.keyCode===27){b.preventDefault();d.close()}if(u&&a.arrowKey&&!D&&h[1])if(b.keyCode===37&&(g||a.loop)){b.preventDefault();H.click()}else if(b.keyCode===39&&(g<h.length-1||a.loop)){b.preventDefault();I.click()}})};d.remove=function(){j.add(x).remove();b("."+G).die("click").removeData(r).removeClass(G)};d.position=function(f,d){function b(a){bb[0].style.width=S[0].style.width=s[0].style.width=a.style.width;K[0].style.height=K[1].style.height=s[0].style.height=T[0].style.height=R[0].style.height=a.style.height}var e,h = (isMobileBrowser) ? 133 : Math.max(document.documentElement.clientHeight-a.h-y-B,0)/2+n.scrollTop(),g= (isMobileBrowser) ? 0 : Math.max(n.width()-a.w-z-C,0)/2+n.scrollLeft();e=j.width()===a.w+z&&j.height()===a.h+y?0:f;A[0].style.width=A[0].style.height="9999px";j.dequeue().animate({width:a.w+z,height:a.h+y,top:h,left:g},{duration:e,complete:function(){b(this);D=c;A[0].style.width=a.w+z+C+"px";A[0].style.height=a.h+y+B+"px";d&&d()},step:function(){b(this)}})};d.resize=function(b){if(u){b=b||{};if(b.width)a.w=p(b.width,m)-z-C;if(b.innerWidth)a.w=p(b.innerWidth,m);k.css({width:a.w});if(b.height)a.h=p(b.height,o)-y-B;if(b.innerHeight)a.h=p(b.innerHeight,o);if(!b.innerHeight&&!b.height){b=k.wrapInner("<div style='overflow:auto'></div>").children();a.h=b.height();b.replaceWith(b.children())}k.css({height:a.h});d.position(a.transition===t?0:a.speed)}};d.prep=function(m){var c="hidden";function l(s){var p,f,m,c,l=h.length,q=a.loop;d.position(s,function(){function s(){E&&j[0].style.removeAttribute("filter")}if(u){E&&o&&k.fadeIn(100);k.show();w(hb);Z.show().html(a.title);if(l>1){typeof a.current==="string"&&Y.html(a.current.replace(/\{current\}/,g+1).replace(/\{total\}/,l)).show();I[q||g<l-1?"show":"hide"]().html(a.next);H[q||g?"show":"hide"]().html(a.previous);p=g?h[g-1]:h[l-1];m=g<l-1?h[g+1]:h[0];a.slideshow&&F.show();if(a.preloading){c=b.data(m,r).href||m.href;f=b.data(p,r).href||p.href;c=b.isFunction(c)?c.call(m):c;f=b.isFunction(f)?f.call(p):f;if(U(c))b("<img/>")[0].src=c;if(U(f))b("<img/>")[0].src=f}}K.hide();a.transition==="fade"?j.fadeTo(e,1,function(){s()}):s();n.bind(v+i,function(){d.position(0)});w(V,a.onComplete)}})}if(u){var o,e=a.transition===t?0:a.speed;n.unbind(v+i);k.remove();k=f(M).html(m);k.hide().appendTo(J.show()).css({width:function(){a.w=a.w||k.width();a.w=a.mw&&a.mw<a.w?a.mw:a.w;return a.w}(),overflow:a.scrolling?q:c}).css({height:function(){a.h=a.h||k.height();a.h=a.mh&&a.mh<a.h?a.mh:a.h;return a.h}()}).prependTo(s);J.hide();b("#"+i+"Photo").css({cssFloat:t,marginLeft:q,marginRight:q});X&&b("select").not(j.find("select")).filter(function(){return this.style.visibility!==c}).css({visibility:c}).one(N,function(){this.style.visibility="inherit"});a.transition==="fade"?j.fadeTo(e,0,function(){l(0)}):l(e)}};d.load=function(u){var n,c,s,q=d.prep;D=e;l=h[g];u||(a=cb(b.extend({},b.data(l,r))));w(Q);w(W,a.onLoad);a.h=a.height?p(a.height,o)-y-B:a.innerHeight&&p(a.innerHeight,o);a.w=a.width?p(a.width,m)-z-C:a.innerWidth&&p(a.innerWidth,m);a.mw=a.w;a.mh=a.h;if(a.maxWidth){a.mw=p(a.maxWidth,m)-z-C;a.mw=a.w&&a.w<a.mw?a.w:a.mw}if(a.maxHeight){a.mh=p(a.maxHeight,o)-y-B;a.mh=a.h&&a.h<a.mh?a.h:a.mh}n=a.href;K.show();if(a.inline){f().hide().insertBefore(b(n)[0]).one(Q,function(){b(this).replaceWith(k.children())});q(b(n))}else if(a.iframe){j.one(hb,function(){var c=b("<iframe frameborder='0' style='width:100%; height:100%; border:0; display:block'/>")[0];c.name=i+ +new Date;c.src=a.href;if(!a.scrolling)c.scrolling="no";if(E)c.allowtransparency="true";b(c).appendTo(k).one(Q,function(){c.src="//about:blank"})});q(" ")}else if(a.html)q(a.html);else if(U(n)){c=new Image;c.onload=function(){var e;c.onload=null;c.id=i+"Photo";b(c).css({border:t,display:"block",cssFloat:"left"});if(a.scalePhotos){s=function(){c.height-=c.height*e;c.width-=c.width*e};if(a.mw&&c.width>a.mw){e=(c.width-a.mw)/c.width;s()}if(a.mh&&c.height>a.mh){e=(c.height-a.mh)/c.height;s()}}if(a.h)c.style.marginTop=Math.max(a.h-c.height,0)/2+"px";h[1]&&(g<h.length-1||a.loop)&&b(c).css({cursor:"pointer"}).click(d.next);if(E)c.style.msInterpolationMode="bicubic";setTimeout(function(){q(c)},1)};setTimeout(function(){c.src=n},1)}else n&&J.load(n,function(d,c,a){q(c==="error"?"Request unsuccessful: "+a.statusText:b(this).children())})};d.next=function(){if(!D){g=g<h.length-1?g+1:0;d.load()}};d.prev=function(){if(!D){g=g?g-1:h.length-1;d.load()}};d.close=function(){if(u&&!O){O=e;u=c;w(N,a.onCleanup);n.unbind("."+i+" ."+P);x.fadeTo("fast",0);j.stop().fadeTo("fast",0,function(){w(Q);k.remove();j.add(x).css({opacity:1,cursor:q}).hide();setTimeout(function(){O=c;w(eb,a.onClosed)},1)})}};d.element=function(){return b(l)};d.settings=gb;b(d.init)})(jQuery,this);
/*
 *
 * Copyright (c) 2006-2010 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 1.2
 * Demo: http://www.texotela.co.uk/code/jquery/numeric/
 *
 */
(function($) {
/*
 * Allows only valid characters to be entered into input boxes.
 * Note: does not validate that the final text is a valid number
 * (that could be done by another script, or server-side)
 *
 * @name     numeric
 * @param    decimal      Decimal separator (e.g. '.' or ',' - default is '.'). Pass false for integers
 * @param    callback     A function that runs if the number is not valid (fires onblur)
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $(".numeric").numeric();
 * @example  $(".numeric").numeric(",");
 * @example  $(".numeric").numeric(null, callback);
 *
 */
$.fn.numeric = function(decimal, callback)
{
	decimal = (decimal === false) ? "" : decimal || ".";
	callback = typeof callback == "function" ? callback : function(){};
	return this.data("numeric.decimal", decimal).data("numeric.callback", callback).keypress($.fn.numeric.keypress).blur($.fn.numeric.blur);
}

$.fn.numeric.keypress = function(e)
{
	var decimal = $.data(this, "numeric.decimal");
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	// allow enter/return key (only when in an input box)
	if(key == 13 && this.nodeName.toLowerCase() == "input")
	{
		return true;
	}
	else if(key == 13)
	{
		return false;
	}
	var allow = false;
	// allow Ctrl+A
	if((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) return true;
	// allow Ctrl+X (cut)
	if((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) return true;
	// allow Ctrl+C (copy)
	if((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) return true;
	// allow Ctrl+Z (undo)
	if((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) return true;
	// allow or deny Ctrl+V (paste), Shift+Ins
	if((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */
	|| (e.shiftKey && key == 45)) return true;
	// if a number was not pressed
	if(key < 48 || key > 57)
	{
		/* '-' only allowed at start */
		if(key == 45 && this.value.length == 0) return true;
		/* only one decimal separator allowed */
		if(decimal && key == decimal.charCodeAt(0) && this.value.indexOf(decimal) != -1)
		{
			allow = false;
		}
		// check for other keys that have special purposes
		if(
			key != 8 /* backspace */ &&
			key != 9 /* tab */ &&
			key != 13 /* enter */ &&
			key != 35 /* end */ &&
			key != 36 /* home */ &&
			key != 37 /* left */ &&
			key != 39 /* right */ &&
			key != 46 /* del */
		)
		{
			allow = false;
		}
		else
		{
			// for detecting special keys (listed above)
			// IE does not support 'charCode' and ignores them in keypress anyway
			if(typeof e.charCode != "undefined")
			{
				// special keys have 'keyCode' and 'which' the same (e.g. backspace)
				if(e.keyCode == e.which && e.which != 0)
				{
					allow = true;
					// . and delete share the same code, don't allow . (will be set to true later if it is the decimal point)
					if(e.which == 46) allow = false;
				}
				// or keyCode != 0 and 'charCode'/'which' = 0
				else if(e.keyCode != 0 && e.charCode == 0 && e.which == 0)
				{
					allow = true;
				}
			}
		}
		// if key pressed is the decimal and it is not already in the field
		if(decimal && key == decimal.charCodeAt(0))
		{
			if(this.value.indexOf(decimal) == -1)
			{
				allow = true;
			}
			else
			{
				allow = false;
			}
		}
	}
	else
	{
		allow = true;
	}
	return allow;
}

$.fn.numeric.blur = function()
{
	var decimal = $.data(this, "numeric.decimal");
	var callback = $.data(this, "numeric.callback");
	var val = $(this).val();
	if(val != "")
	{
		var re = new RegExp("^\\d+$|\\d*" + decimal + "\\d+");
		if(!re.exec(val))
		{
			callback.apply(this);
		}
	}
}

$.fn.removeNumeric = function()
{
	return this.data("numeric.decimal", null).data("numeric.callback", null).unbind("keypress", $.fn.numeric.keypress).unbind("blur", $.fn.numeric.blur);
}

})(jQuery);(function($){$.fn.inputlimiter=function(options){var opts=$.extend({},$.fn.inputlimiter.defaults,options);if(opts.boxAttach&&!$('#'+opts.boxId).length)
{$('<div/>').appendTo("body").attr({id:opts.boxId,'class':opts.boxClass}).css({'position':'absolute'}).hide();if($.fn.bgiframe)
$('#'+opts.boxId).bgiframe();}
$(this).each(function(i){$(this).unbind();$(this).keyup(function(e){if(!opts.allowExceed&&$(this).val().length>opts.limit)
{$(this).val($(this).val().substring(0,opts.limit));}
if(opts.boxAttach)
{$('#'+opts.boxId).css({'width':$(this).outerWidth()-($('#'+opts.boxId).outerWidth()-$('#'+opts.boxId).width())+'px','left':$(this).offset().left+'px','top':($(this).offset().top+$(this).outerHeight())-1+'px','z-index':2000});}
var charsRemaining=opts.limit-$(this).val().length;var remText=opts.remTextFilter(opts,charsRemaining);var limitText=opts.limitTextFilter(opts);if(opts.limitTextShow)
{$('#'+opts.boxId).html(remText+' '+limitText);var textWidth=$("<span/>").appendTo("body").attr({id:'19cc9195583bfae1fad88e19d443be7a','class':opts.boxClass}).html(remText+' '+limitText).innerWidth();$("#19cc9195583bfae1fad88e19d443be7a").remove();if(textWidth>$('#'+opts.boxId).innerWidth()){$('#'+opts.boxId).html(remText+'<br />'+limitText);}
$('#'+opts.boxId).show();}
else
{$('#'+opts.boxId).html(remText).show();}});$(this).keypress(function(e){if(!opts.allowExceed&&(!e.keyCode||(e.keyCode>46&&e.keyCode<90)||e.keyCode==13)&&$(this).val().length>=opts.limit)
{return false;}});$(this).blur(function(){if(opts.boxAttach)
{$('#'+opts.boxId).fadeOut('fast');}
else if(opts.remTextHideOnBlur)
{var limitText=opts.limitText;limitText=limitText.replace(/\%n/g,opts.limit);limitText=limitText.replace(/\%s/g,(opts.limit==1?'':'s'));$('#'+opts.boxId).html(limitText);}});});};$.fn.inputlimiter.remtextfilter=function(opts,charsRemaining){var remText=opts.remText;if(charsRemaining==0&&opts.remFullText!=null){remText=opts.remFullText;}
remText=remText.replace(/\%n/g,charsRemaining);remText=remText.replace(/\%s/g,(opts.zeroPlural?(charsRemaining==1?'':'s'):(charsRemaining<=1?'':'s')));return remText;};$.fn.inputlimiter.limittextfilter=function(opts){var limitText=opts.limitText;limitText=limitText.replace(/\%n/g,opts.limit);limitText=limitText.replace(/\%s/g,(opts.limit<=1?'':'s'));return limitText;};$.fn.inputlimiter.defaults={limit:255,boxAttach:true,boxId:'limiterBox',boxClass:'limiterBox',remText:'%n character%s remaining.',remTextFilter:$.fn.inputlimiter.remtextfilter,remTextHideOnBlur:true,remFullText:null,limitTextShow:true,limitText:'Field limited to %n character%s.',limitTextFilter:$.fn.inputlimiter.limittextfilter,zeroPlural:true,allowExceed:false};})(jQuery);/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);


jQuery.autocomplete = function(input, options) {
    // Create a link to self
    var me = this;

    // Create jQuery object for input element
    var $input = $(input).attr("autocomplete", "off");

    // Apply inputClass if necessary
    if (options.inputClass) $input.addClass(options.inputClass);

    // Create results
    //var results = document.createElement("div");


    // Create jQuery object for results
    //var $results = $(results);

    var results = $results = $("#ac_results");
    var bottom = $("#ac_results .bottom")[0];
    $results.hide().addClass(options.resultsClass).css("position", "fixed");
    if( options.width > 0 ) $results.css("width", options.width);

    // Add to body element
    //$("body").append(results);

    input.autocompleter = me;

    var timeout = null;
    var prev = "";
    var active = -1;
    var cache = {};
    var keyb = false;
    var hasFocus = false;
    var lastKeyPressCode = null;

    // flush cache
    function flushCache(){
        cache = {};
        cache.data = {};
        cache.length = 0;
    };

    // flush cache
    flushCache();

    // if there is a data array supplied
    if( options.data != null ){
        var sFirstChar = "", stMatchSets = {}, row = [];

        // no url was specified, we need to adjust the cache length to make sure it fits the local data store
        if( typeof options.url != "string" ) options.cacheLength = 1;

        // loop through the array and create a lookup structure
        for( var i=0; i < options.data.length; i++ ){
            // if row is a string, make an array otherwise just reference the array
            row = ((typeof options.data[i] == "string") ? [options.data[i]] : options.data[i]);

            // if the length is zero, don't add to list
            if( row[0].length > 0 ){
                // get the first character
                sFirstChar = row[0].substring(0, 1).toLowerCase();
                // if no lookup array for this character exists, look it up now
                if( !stMatchSets[sFirstChar] ) stMatchSets[sFirstChar] = [];
                // if the match is a string
                stMatchSets[sFirstChar].push(row);
            }
        }

        // add the data items to the cache
        for( var k in stMatchSets ){
            // increase the cache size
            options.cacheLength++;
            // add to the cache
            addToCache(k, stMatchSets[k]);
        }
    }

    $input
        .keydown(function(e) {
        // track last key pressed
        lastKeyPressCode = e.keyCode;
        switch(e.keyCode) {
            case 38: // up
                e.preventDefault();
                moveSelect(-1);
                break;
            case 40: // down
                e.preventDefault();
                moveSelect(1);
                break;
            case 9:  // tab
            case 13: // return
                if( selectCurrent() ){
                    // make sure to blur off the current field
                    $input.get(0).blur();
                    e.preventDefault();
                }
                break;
            default:
                active = -1;
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(function(){onChange();}, options.delay);
                break;
        }
    })
        .focus(function(){
            // track whether the field has focus, we shouldn't process any results if the field no longer has focus
            hasFocus = true;
        })
        .blur(function() {
            // track whether the field has focus
            hasFocus = false;
            hideResults();
        });

    hideResultsNow();

    function onChange() {
        // ignore if the following keys are pressed: [del] [shift] [capslock]
        if( lastKeyPressCode == 46 || (lastKeyPressCode > 8 && lastKeyPressCode < 32) ) return $results.hide();
        var v = $input.val();
        if (v == prev) return;
        prev = v;
        if (v.length >= options.minChars) {
            $input.addClass(options.loadingClass);
            requestData(v);
        } else {
            $input.removeClass(options.loadingClass).parent().removeClass('activeTypeAhead');
            $results.hide();
        }
    };

    function moveSelect(step) {

        var lis = $("li", results);
        if (!lis) return;

        active += step;

        if (active < 0) {
            active = 0;
        } else if (active >= lis.size()) {
            active = lis.size() - 1;
        }

        lis.removeClass("ac_over");

        $(lis[active]).addClass("ac_over");

        // Weird behaviour in IE
        // if (lis[active] && lis[active].scrollIntoView) {
        // 	lis[active].scrollIntoView(false);
        // }

    };

    function selectCurrent() {
        var li = $("li.ac_over", results)[0];
        if (!li) {
            var $li = $("li", results);
            if (options.selectOnly) {
                if ($li.length == 1) li = $li[0];
            } else if (options.selectFirst) {
                li = $li[0];
            }
        }
        if (li) {
            selectItem(li);
            return true;
        } else {
            return false;
        }
    };

    function selectItem(li) {
        if (!li) {
            li = document.createElement("li");
            li.extra = [];
            li.selectValue = "";
        }
        var v = $.trim(li.selectValue ? li.selectValue : li.innerHTML);
        input.lastSelected = v;
        prev = v;
        //$results.html("");
        bottom.innerHTHML = "";
        $input.val(v);
        hideResultsNow();

        if (options.onItemSelect) setTimeout(function() { options.onItemSelect(li) }, 1);

        var p = input.parentNode;
        while(p.tagName.toLowerCase() != "body" ){
            if(p.tagName.toLowerCase() == "form"){
                p.submit();
                break;
            }
            p = p.parentNode;
        }
    };

    // selects a portion of the input string
    function createSelection(start, end){
        // get a reference to the input element
        var field = $input.get(0);
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

    // fills in the input box w/the first match (assumed to be the best match)
    function autoFill(sValue){
        // if the last user key pressed was backspace, don't autofill
        if( lastKeyPressCode != 8 ){
            // fill in the value (keep the case the user has typed)
            $input.val($input.val() + sValue.substring(prev.length));
            // select the portion of the value not typed by the user (so the next character will erase)
            createSelection(prev.length, sValue.length);
        }
    };

    function showResults() {
        // get the position of the input field right now (in case the DOM is shifted)

        //var posTop = findPos(input);
        //FIX BUG BUG1397
        //var targ = $("#searchBoxMarginDiv");

        var targ = $input.parent();


        // either use the specified width, or autocalculate based on form element

        var iWidth = (options.width > 0) ? options.width : $input.width();

        var iWidth = $input.outerWidth();
        
        
        if(targ[0].id == "searchFormTop"){
            var posTop = targ.offset();
            var top = posTop.top + targ[0].offsetHeight;
            var posLeft = $(targ[0].parentNode).offset();
    		var position = targ.position(),
    			inputLeft = position.left,
    			inputWidth = targ.width();
        	if($('#header-main.collapsed').length > 0){
        		top = targ[0].offsetHeight + 32;
        	}

            $results.removeClass("searchNotTop");
            $(targ).append(results);
            iWidth =  (options.width > 0) ? options.width : $input.width();
            $results.css({
                width: (inputWidth - (parseInt($results.css('paddingLeft')) + parseInt($results.css('paddingRight')))) + "px", //($results.css('paddingLeft') + $results.css('paddingRight'))),//parseInt(iWidth) + "px",
                top: top + "px",
                position:'fixed',
                left:posLeft,
                marginLeft:'-1px'
            }).show();
            
        } else {
            var posTop = targ.offset();
            var posLeft = $(targ[0].parentNode).offset();
    		var position = targ.position(),
    			inputLeft = position.left,
    			inputWidth = targ.width();
            $results.addClass("searchNotTop");
            $(targ).append(results);
            $results.css({
                width: (inputWidth - (parseInt($results.css('paddingLeft')) + parseInt($results.css('paddingRight')))) + "px", //($results.css('paddingLeft') + $results.css('paddingRight'))),//parseInt(iWidth) + "px",
                marginLeft:'-1px',
                marginTop:'-2px',
                position:'relative',
                top:'auto'

            }).show();
        }
        
		$input.parent().addClass('activeTypeAhead');

        /*
         if(targ[0].hasClass("searchBoxMarginDiv")){
         $results.removeClass("searchNotTop")


         $results.css({
         width: parseInt(iWidth) + "px",
         top: (posTop.top + targ[0].offsetHeight) + "px",
         left: posLeft.left +"px"
         }).show();


         } else {
         $results.addClass("searchNotTop")
         iWidth += 8;

         $results.css({
         width: parseInt(iWidth) + "px",
         top: (posTop.top + targ[0].offsetHeight) + "px",
         left: posLeft.left +"px"
         }).show();

         }
         */

        // reposition



    };

    function hideResults() {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(hideResultsNow, 200);
    };

    function hideResultsNow() {
        if (timeout) clearTimeout(timeout);
        $input.removeClass(options.loadingClass).parent().removeClass('activeTypeAhead');
        if ($results.is(":visible")) {
            $results.hide();
        }
        if (options.mustMatch) {
            var v = $input.val();
            if (v != input.lastSelected) {
                selectItem(null);
            }
        }
    };

    function receiveData(q, data) {
        if (data) {
            $input.removeClass(options.loadingClass);
            //results.innerHTML = "";

            // if the field no longer has focus or if there are no matches, do not display the drop down
            if( !hasFocus || data.length == 0 ) return hideResultsNow();

            if ($.browser.msie) {
                // we put a styled iframe behind the calendar so HTML SELECT elements don't show through
                $results.append(document.createElement('iframe'));
            }
            //results.appendChild(dataToDom(data));
            bottom.innerHTML = "";
            bottom.appendChild(dataToDom(data));
            // autofill in the complete box w/the first match as long as the user hasn't entered in more data
            if( options.autoFill && ($input.val().toLowerCase() == q.toLowerCase()) ) autoFill(data[0][0]);
            showResults();
        } else {
            hideResultsNow();
        }
    };

    function parseData(data) {
        if (!data) return null;
        var parsed = [];
        var rows = data.split(options.lineSeparator);
        for (var i=0; i < rows.length; i++) {
            var row = $.trim(rows[i]);
            if (row) {
                parsed[parsed.length] = row.split(options.cellSeparator);
            }
        }
        return parsed;
    };

    function dataToDom(data) {
        var ul = document.createElement("ul");
        var num = data.length;

        // limited results to a max number
        if( (options.maxItemsToShow > 0) && (options.maxItemsToShow < num) ) num = options.maxItemsToShow;

        for (var i=0; i < num; i++) {
            var row = data[i];
            if (!row) {continue;}
            var li = document.createElement("li");
            if (options.formatItem) {
                li.innerHTML = options.formatItem(row, i, num);
                li.selectValue = row[0];
            } else {
                li.innerHTML = row[0];
                li.selectValue = row[0];
            }
            var extra = null;
            if (row.length > 1) {
                extra = [];
                for (var j=1; j < row.length; j++) {
                    extra[extra.length] = row[j];
                }
            }
            li.extra = extra;
            ul.appendChild(li);
            $(li).hover(
                function() { $("li", ul).removeClass("ac_over"); $(this).addClass("ac_over"); active = $("li", ul).indexOf($(this).get(0)); },
                function() { $(this).removeClass("ac_over"); }
            ).click(function(e) { e.preventDefault(); e.stopPropagation(); selectItem(this) });

        }
        return ul;
    };

    function requestData(q) {
        if (!options.matchCase) q = q.toLowerCase();
        var data = options.cacheLength ? loadFromCache(q) : null;
        // recieve the cached data
        if (data) {
            receiveData(q, data);
            // if an AJAX url has been supplied, try loading the data now
        } else if( (typeof options.url == "string") && (options.url.length > 0) ){
            $.get(makeUrl(q), function(data) {
                data = parseData(data);
                addToCache(q, data);
                receiveData(q, data);
            });
            // if there's been no data found, remove the loading class
        } else {
            $input.removeClass(options.loadingClass);
        }
    };

    function makeUrl(q) {
        var url = options.url + "?q=" + encodeURI(q);
        for (var i in options.extraParams) {
            url += "&" + i + "=" + encodeURI(options.extraParams[i]);
        }
        return url;
    };

    function loadFromCache(q) {
        if (!q) return null;
        if (cache.data[q]) return cache.data[q];
        if (options.matchSubset) {
            for (var i = q.length - 1; i >= options.minChars; i--) {
                var qs = q.substr(0, i);
                var c = cache.data[qs];
                if (c) {
                    var csub = [];
                    for (var j = 0; j < c.length; j++) {
                        var x = c[j];
                        var x0 = x[0];
                        if (matchSubset(x0, q)) {
                            csub[csub.length] = x;
                        }
                    }
                    return csub;
                }
            }
        }
        return null;
    };

    function matchSubset(s, sub) {
        if (!options.matchCase) s = s.toLowerCase();
        var i = s.indexOf(sub);
        if (i == -1) return false;
        return i == 0 || options.matchContains;
    };

    this.flushCache = function() {
        flushCache();
    };

    this.setExtraParams = function(p) {
        options.extraParams = p;
    };

    this.findValue = function(){
        var q = $input.val();

        if (!options.matchCase) q = q.toLowerCase();
        var data = options.cacheLength ? loadFromCache(q) : null;
        if (data) {
            findValueCallback(q, data);
        } else if( (typeof options.url == "string") && (options.url.length > 0) ){
            $.get(makeUrl(q), function(data) {
                data = parseData(data)
                addToCache(q, data);
                findValueCallback(q, data);
            });
        } else {
            // no matches
            findValueCallback(q, null);
        }
    }

    function findValueCallback(q, data){
        if (data) $input.removeClass(options.loadingClass);

        var num = (data) ? data.length : 0;
        var li = null;

        for (var i=0; i < num; i++) {
            var row = data[i];

            if( row[0].toLowerCase() == q.toLowerCase() ){
                li = document.createElement("li");
                if (options.formatItem) {
                    li.innerHTML = options.formatItem(row, i, num);
                    li.selectValue = row[0];
                } else {
                    li.innerHTML = row[0];
                    li.selectValue = row[0];
                }
                var extra = null;
                if( row.length > 1 ){
                    extra = [];
                    for (var j=1; j < row.length; j++) {
                        extra[extra.length] = row[j];
                    }
                }
                li.extra = extra;
            }
        }

        if( options.onFindValue ) setTimeout(function() {options.onFindValue(li) }, 1);
    }

    function addToCache(q, data) {
        if (!data || !q || !options.cacheLength) return;
        if (!cache.length || cache.length > options.cacheLength) {
            flushCache();
            cache.length++;
        } else if (!cache[q]) {
            cache.length++;
        }
        cache.data[q] = data;
    };

    function findPos(obj) {
        var curleft = obj.offsetLeft || 0;
        var curtop = obj.offsetTop || 0;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        }
        return {x:curleft,y:curtop};
    }
}

jQuery.fn.autocomplete = function(url, options, data) {
    // Make sure options exists
    options = options || {};
    // Set url as option
    options.url = url;
    // set some bulk local data
    options.data = ((typeof data == "object") && (data.constructor == Array)) ? data : null;

    // Set default values for required options
    options.inputClass = options.inputClass || "ac_input";
    options.resultsClass = options.resultsClass || "ac_results";
    options.lineSeparator = options.lineSeparator || "\n";
    options.cellSeparator = options.cellSeparator || "|";
    options.minChars = options.minChars || 1;
    options.delay = options.delay || 400;
    options.matchCase = options.matchCase || 0;
    options.matchSubset = options.matchSubset || 1;
    options.matchContains = options.matchContains || 0;
    options.cacheLength = options.cacheLength || 1;
    options.mustMatch = options.mustMatch || 0;
    options.extraParams = options.extraParams || {};
    options.loadingClass = options.loadingClass || "ac_loading";
    options.selectFirst = options.selectFirst || false;
    options.selectOnly = options.selectOnly || false;
    options.maxItemsToShow = options.maxItemsToShow || -1;
    options.autoFill = options.autoFill || false;
    options.width = parseInt(options.width, 10) || 0;

    this.each(function() {
        var input = this;
        new jQuery.autocomplete(input, options);
    });

    // Don't break the chain
    return this;
}

jQuery.fn.autocompleteArray = function(data, options) {
    return this.autocomplete(null, options, data);
}

jQuery.fn.indexOf = function(e){
    for( var i=0; i<this.length; i++ ){
        if( this[i] == e ) return i;
    }
    return -1;
};

