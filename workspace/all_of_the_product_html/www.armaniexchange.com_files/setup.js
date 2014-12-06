var mbJQPageTypes = [ "PRODUCT_DETAILS" ];

var mbCarouselZoneKeys = { "PRODUCT_DETAILS": [ { "zoneKey": "6", "visibleItems": 3, "totalItems": 9, "scrollItems": 3, "isVertical": false, "fallbackDimension": 229, "callback": mbcarouselInitCallback_prod6 } ] };

var mbAddToCartZoneKeys = { };

function loadjQuery(callback) {
	if (typeof mybuys.jQuery == "undefined")
	{
		var url = 'http://t.p.mybuys.com/clients/ARMANIEXCHANGE/js/lib/jquery-1.6.4-custom.js';
		loadScript(url, function () {
			callback();
		});
	}
	else
	{
		callback();
	}
}

function mbcarouselInitCallback_prod6(carousel) 
{
	mybuys.jQuery(".MB_PROD6 .MB_CAROUSELLEFT").bind('click', function() { carousel.prev(); return false; });
	mybuys.jQuery(".MB_PROD6 .MB_CAROUSELRIGHT").bind('click', function() { carousel.next(); return false; });
	return false;
}


if (typeof Array.prototype.indexOf == "undefined")
{
	Array.prototype.indexOf = function (obj, start)
	{
		for (var i = 0; i < this.length; i++)
		{
			if (this[i] === obj)
			{
				return i;
			}
		}
	};
}

function loadCarousel(callback)
{
	if (typeof mybuys.jQuery.jcarousel == "undefined")
	{
		mb_carousel();
		callback();
	}
	else
	{
		callback();
	}
}

var mb_carousel = function() { (function(i){var q={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null, itemFallbackDimension:300},r=false;i(window).bind("load.jcarousel",function(){r=true});i.jcarousel=function(a,c){this.options=i.extend({},q,c||{});this.autoStopped=this.locked=false;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===undefined)this.options.rtl=(i(a).attr("dir")||i("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?this.options.rtl? "right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jmcarousel-skin")!=-1){i(a).removeClass(d[f]);b=d[f];break}if(a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"){this.list=i(a);this.container=this.list.parent();if(this.container.hasClass("jmcarousel-clip")){if(!this.container.parent().hasClass("jmcarousel-container"))this.container=this.container.wrap("<div></div>");this.container=this.container.parent()}else if(!this.container.hasClass("jmcarousel-container"))this.container= this.list.wrap("<div></div>").parent()}else{this.container=i(a);this.list=this.container.find("ul,ol").eq(0)}b!==""&&this.container.parent()[0].className.indexOf("jmcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.clip=this.list.parent();if(!this.clip.length||!this.clip.hasClass("jmcarousel-clip"))this.clip=this.list.wrap("<div></div>").parent();this.buttonNext=i(".jmcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext= this.clip.after(this.options.buttonNextHTML).next();this.buttonNext.addClass(this.className("jmcarousel-next"));this.buttonPrev=i(".jmcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=this.clip.after(this.options.buttonPrevHTML).next();this.buttonPrev.addClass(this.className("jmcarousel-prev"));this.clip.addClass(this.className("jmcarousel-clip")).css({overflow:"hidden",position:"relative"});this.list.addClass(this.className("jmcarousel-list")).css({overflow:"hidden", position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jmcarousel-container")).css({position:"relative"});!this.options.vertical&&this.options.rtl&&this.container.addClass("jmcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;b=this.list.children("li");var e=this;if(b.size()>0){var g=0,k=this.options.offset;b.each(function(){e.format(this,k++);g+=e.dimension(this, j)});this.list.css(this.wh,g+100+"px");if(!c||c.size===undefined)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.reload()};this.options.initCallback!==null&&this.options.initCallback(this,"init");if(!r&&i.browser.safari && i.browser.version < 523){this.buttons(false,false);i(window).bind("load.jcarousel",function(){e.setup()})}else this.setup()}; var h=i.jcarousel;h.fn=h.prototype={jcarousel:"0.2.7"};h.fn.extend=h.extend=i.extend;h.fn.extend({setup:function(){this.prevLast=this.prevFirst=this.last=this.first=null;this.animating=false;this.tail=this.timer=null;this.inTail=false;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,true);this.prevFirst=this.prevLast=null;this.animate(a,false);i(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize)}}, reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=false;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0; this.list.children("li").each(function(f){b+=a.dimension(this,c);if(f+1<a.first)d=b});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,false)},lock:function(){this.locked=true;this.buttons()},unlock:function(){this.locked=false;this.buttons()},size:function(a){if(a!==undefined){this.options.size=a;this.locked||this.buttons()}return this.options.size},has:function(a,c){if(c===undefined||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b= a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jmcarousel-item-placeholder"))return false}return true},get:function(a){return i(".jmcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,f=i(c);if(b.length===0){var j,e=h.intval(a);for(b=this.create(a);;){j=this.get(--e);if(e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}}else d=this.dimension(b);if(f.get(0).nodeName.toUpperCase()=="LI"){b.replaceWith(f);b=f}else b.empty().append(c);this.format(b.removeClass(this.className("jmcarousel-item-placeholder")), a);f=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;d=this.dimension(b,f)-d;a>0&&a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,h.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(!(!c.length||a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,h.intval(this.list.css(this.wh))- b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(false):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(true):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!(this.locked|| this.animating||!this.tail)){this.pauseAuto();var c=h.intval(this.list.css(this.lt));c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){if(!(this.locked||this.animating)){this.pauseAuto();this.animate(this.pos(a),c)}},pos:function(a,c){var b=h.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;if(this.options.wrap!="circular")a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a;for(var d= this.first>a,f=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(f):this.get(this.last),e=d?f:f-1,g=null,k=0,l=false,m=0;d?--e>=a:++e<a;){g=this.get(e);l=!g.length;if(g.length===0){g=this.create(e).addClass(this.className("jmcarousel-item-placeholder"));j[d?"before":"after"](g);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)){j=this.get(this.index(e));if(j.length)g=this.add(e,j.clone(true))}}j=g;m=this.dimension(g);if(l)k+= m;if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<=this.options.size)))b=d?b+m:b-m}f=this.clipping();var p=[],o=0,n=0;j=this.get(a-1);for(e=a;++o;){g=this.get(e);l=!g.length;if(g.length===0){g=this.create(e).addClass(this.className("jmcarousel-item-placeholder"));j.length===0?this.list.prepend(g):j[d?"before":"after"](g);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)){j=this.get(this.index(e));if(j.length)g= this.add(e,j.clone(true))}}j=g;m=this.dimension(g);if(m===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");if(this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size)p.push(g);else if(l)k+=m;n+=m;if(n>=f)break;e++}for(g=0;g<p.length;g++)p[g].remove();if(k>0){this.list.css(this.wh,this.dimension(this.list)+k+"px");if(d){b-=k;this.list.css(this.lt,h.intval(this.list.css(this.lt))-k+"px")}}k=a+o-1;if(this.options.wrap!="circular"&& this.options.size&&k>this.options.size)k=this.options.size;if(e>k){o=0;e=k;for(n=0;++o;){g=this.get(e--);if(!g.length)break;n+=this.dimension(g);if(n>=f)break}}e=k-o+1;if(this.options.wrap!="circular"&&e<1)e=1;if(this.inTail&&d){b+=this.tail;this.inTail=false}this.tail=null;if(this.options.wrap!="circular"&&k==this.options.size&&k-o+1>=1){d=h.margin(this.get(k),!this.options.vertical?"marginRight":"marginBottom");if(n-d>f)this.tail=n-f-d}if(c&&a===this.options.size&&this.tail){b-=this.tail;this.inTail= true}for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=k;return b},animate:function(a,c){if(!(this.locked||this.animating)){this.animating=true;var b=this,d=function(){b.animating=false;a===0&&b.list.css(b.lt,0);if(!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail))b.startAuto();b.buttons();b.notify("onAfterAnimation"); if(b.options.wrap=="circular"&&b.options.size!==null)for(var f=b.prevFirst;f<=b.prevLast;f++)if(f!==null&&!(f>=b.first&&f<=b.last)&&(f<1||f>b.options.size))b.remove(f)};this.notify("onBeforeAnimation");if(!this.options.animation||c===false){this.list.css(this.lt,a+"px");d()}else this.list.animate(!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},this.options.animation,this.options.easing,d)}},startAuto:function(a){if(a!==undefined)this.options.auto=a;if(this.options.auto===0)return this.stopAuto(); if(this.timer===null){this.autoStopped=false;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=true},pauseAuto:function(){if(this.timer!==null){window.clearTimeout(this.timer);this.timer=null}},buttons:function(a,c){if(a==null){a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size);if(!this.locked&&(!this.options.wrap||this.options.wrap== "first")&&this.options.size!==null&&this.last>=this.options.size)a=this.tail!==null&&!this.inTail}if(c==null){c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1);if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1)c=this.tail!==null&&this.inTail}var b=this;if(this.buttonNext.size()>0){this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext);a&&this.buttonNext.bind(this.options.buttonNextEvent+ ".jcarousel",this.funcNext);this.buttonNext[a?"removeClass":"addClass"](this.className("jmcarousel-next-disabled")).attr("disabled",a?false:true);this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)}else this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);if(this.buttonPrev.size()>0){this.buttonPrev.unbind(this.options.buttonPrevEvent+ ".jcarousel",this.funcPrev);c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev);this.buttonPrev[c?"removeClass":"addClass"](this.className("jmcarousel-prev-disabled")).attr("disabled",c?false:true);this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)}else this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b, null,c);this.buttonNextState=a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",a,c,this.first);this.callback("itemFirstOutCallback",a,c,this.prevFirst)}if(this.prevLast!==this.last){this.callback("itemLastInCallback",a,c,this.last);this.callback("itemLastOutCallback",a,c,this.prevLast)}this.callback("itemVisibleInCallback", a,c,this.first,this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var g=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(i.isFunction(g)){var k=this;if(d===undefined)g(k,b,c);else if(f===undefined)this.get(d).each(function(){g(k,this,d,b,c)});else{a=function(m){k.get(m).each(function(){g(k, this,m,b,c)})};for(var l=d;l<=f;l++)l!==null&&!(l>=j&&l<=e)&&a(l)}}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){a=i(a);for(var b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jmcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jmcarousel-item")).addClass(this.className("jmcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical? "-horizontal":"-vertical")},dimension:function(a,c){var b=a.jquery!==undefined?a[0]:a,d=!this.options.vertical?(b.offsetWidth||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginLeft")+h.margin(b,"marginRight"):(b.offsetHeight||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginTop")+h.margin(b,"marginBottom");if(c==null||d==c)return d;d=!this.options.vertical?c-h.margin(b,"marginLeft")-h.margin(b,"marginRight"):c-h.margin(b,"marginTop")-h.margin(b,"marginBottom");i(b).css(this.wh, d+"px");return this.dimension(b)},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-h.intval(this.clip.css("borderLeftWidth"))-h.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-h.intval(this.clip.css("borderTopWidth"))-h.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});h.extend({defaults:function(a){return i.extend(q,a||{})},margin:function(a,c){if(!a)return 0; var b=a.jquery!==undefined?a[0]:a;if(c=="marginRight"&&i.browser.safari){var d={display:"block","float":"none",width:"auto"},f,j;i.swap(b,d,function(){f=b.offsetWidth});d.marginRight=0;i.swap(b,d,function(){j=b.offsetWidth});return j-f}return h.intval(i.css(b,c))},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a}});i.fn.jcarousel=function(a){if(typeof a=="string"){var c=i(this).data("jcarousel"),b=Array.prototype.slice.call(arguments,1);return c[a].apply(c,b)}else return this.each(function(){i(this).data("jcarousel", new h(this,a))})}})(mybuys.jQuery); }

mybuys.base_processResponseHTML = mybuys.processResponseHTML;
mybuys.processResponseHTML = function(zoneHtmls)
{
	this.base_processResponseHTML(zoneHtmls);

	var jQueryRequired = false;
	if (mbJQPageTypes.indexOf(mybuys.pagetype) > -1)
	{
		jQueryRequired = true;
	}
	if (jQueryRequired)
	{
		loadjQuery(
			function ()
			{
				if (typeof mbCarouselZoneKeys[mybuys.pagetype] != "undefined")
				{
					loadCarousel(
						function ()
						{
							var info = mbCarouselZoneKeys[mybuys.pagetype];
							for (var i = 0; i < info.length; i++)
							{
								if (mybuys.params.wrz.split(",").indexOf(info[i].zoneKey) > -1)
								{
									initCarousel('#mbcarousel' + info[i].zoneKey, info[i].totalItems, info[i].scrollItems, info[i].isVertical, info[i].fallbackDimension, info[i].callback);
								}
							}
							
							mybuys.old_processResponseHTML(zoneHtmls);
						}
					);
				}
				else
				{
					mybuys.old_processResponseHTML(zoneHtmls);
				}
				
			}
		);
	}
	else
	{
		mybuys.old_processResponseHTML(zoneHtmls);
	}
};

function initCarousel(element, totalItems, scrollItems, isVertical, fallbackDimension, callback)
{
	mybuys.jQuery(element).jcarousel(
		{
			wrap : 'circular',
			size : totalItems,
			scroll : scrollItems,
			vertical : isVertical,
			animation : 1000,
			initCallback : callback,
			buttonNextHTML : null,
			buttonPrevHTML : null,
			itemFallbackDimension : fallbackDimension
		}
	);
}

function mbcarouselInitCallback_prod1(carousel) 
{
	mybuys.jQuery(".MB_PROD1 .MB_CAROUSELLEFT").bind('click', function() { carousel.prev(); return false; });
	mybuys.jQuery(".MB_PROD1 .MB_CAROUSELRIGHT").bind('click', function() { carousel.next(); return false; });
	return false;
}

//START CAROUSEL FUNCTIONS

//Literal will be compared to the index of carousel item. Calculated will be value between 1 and 9
firstItemLiteral = 1.5;
lastItemLiteral = 1.5;
firstItemCalculated = -1;
lastItemCalculated = -1;

function old_mbcarouselInitCallback(carousel) {
	jQuery('.mbleftnavbtn').bind('click', function() {
		carousel.prev();
		return false;
	});
	jQuery('.mbrightnavbtn').bind('click', function() {
		carousel.next();
		return false; 
	});
	return false;
}

function itemFirstInCallback(carousel, item, idx, state) {
    jQuery('.firstItem').empty();
	if(firstItemLiteral == 1.5) {
		firstItemLiteral = 1;
		firstItemCalculated = 1;
	}
	else {
		if(firstItemLiteral > idx) {
			if(firstItemCalculated == 1) { firstItemCalculated = 7; }
			else { firstItemCalculated -= 3; }
		}
		else {
			if(firstItemCalculated == 7) { firstItemCalculated = 1; }
			else { firstItemCalculated += 3; }
		}
		firstItemLiteral = idx;
	}
	jQuery('.firstItem').text(firstItemCalculated);
}

function itemLastInCallback(carousel, item, idx, state) {
    jQuery('.lastItem').empty();
	if(lastItemLiteral == 1.5) {
		lastItemLiteral = 3;
		lastItemCalculated = 3;
	}
	else {
		if(lastItemLiteral > idx) {
			if(lastItemCalculated == 3) { lastItemCalculated = 9; }
			else { lastItemCalculated -= 3; }
		}
		else {
			if(lastItemCalculated == 9) { lastItemCalculated = 3; }
			else { lastItemCalculated += 3; }
		}
		lastItemLiteral = idx;
	}
	jQuery('.lastItem').text(lastItemCalculated);
}

function loadScript(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	var done = false;
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true;
			callback();

			// Handles memory leak in IE
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
		}
	};

	head.appendChild(script);
	return false;
}

function old_initCarousel(visibleitems,scrollitems,dimension) {
	jQuery('#mbcarousel').jcarousel({
		itemFallbackDimension:dimension,
		wrap: 'circular',
		visible: visibleitems,
		scroll: scrollitems,
		animation: 500,
		initCallback: old_mbcarouselInitCallback,
		buttonNextHTML: null,
		buttonPrevHTML: null,
		itemFirstInCallback:  itemFirstInCallback,
        itemLastInCallback:   itemLastInCallback
	});
}

function old_loadjQuery(callback) {
	if (typeof jQuery == "undefined")
	{
		var url = 'http://w.p.mybuys.com/clients/ARMANIEXCHANGE/js/lib/jquery-1.4.2.min.js';
		loadScript(url, function () {
			jQuery.noConflict();
			callback();
		});
	}
	else
	{
		callback();
	}
}

function old_loadCarousel(callback) {
	if (typeof jQuery.jcarousel == "undefined")
	{
		var url = 'http://w.p.mybuys.com/clients/ARMANIEXCHANGE/js/lib/jquery.jcarousel.min.js';
		loadScript(url, function() {
			callback();
		});
	}
	else
	{
		callback();
	}
}

function carouselButtonHover(x) {
	if(x.className == "mbleftnavbtn") { x.src = "http://w.p.mybuys.com/clients/ARMANIEXCHANGE/images/leftbtnhover.png"; }
	if(x.className == "mbrightnavbtn") { x.src = "http://w.p.mybuys.com/clients/ARMANIEXCHANGE/images/rightbtnhover.png"; }

}
function carouselButtonMouseOff(x) {
	if(x.className == "mbleftnavbtn") { x.src = "http://w.p.mybuys.com/clients/ARMANIEXCHANGE/images/leftbtn.png"; }
	if(x.className =="mbrightnavbtn") { x.src = "http://w.p.mybuys.com/clients/ARMANIEXCHANGE/images/rightbtn.png"; }
}

//END CAROUSEL FUNCTIONS

function loadURL(url)
	{
		var myTarget = parent.document;  //this variable sets the element you are trying to reach     
		myTarget.location.href = "http://www.armaniexchange.com" + url;  //this line loads the url that you passed to the function into that elements href attribute 
		parent.hidePopWin();  //this line closes the modal window.  Since your modal scripts are in your parent window and not in the modal window, you have to use the parent in front of the call of the function or else it won't find it on the current page   
	
	} 

mybuys.createCookie = function (name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

mybuys.readCookie= function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

mybuys.eraseCookie=function(name) {
	createCookie(name,"",-1);
}


mybuys.gup = function( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
 
  if( results == null ) {
	var democookie = this.readCookie("dmb");
	if (democookie != null)
	{
		
		return democookie;
	} else {
		return "false";
		}
  }
  else { 
  	this.createCookie("dmb",results[1],"");
    return results[1];
  }
  }


  
  
mybuys.addZone=function(zoneKey, zoneDiv, demoOn)
	{	
		if (this.zoneKeysToZoneDivIds[zoneKey]) return;
		
		
		if (demoOn == "true")
			zoneKey = "99";

			
		zoneDivId = "mybuyspagezone" + zoneKey;
		zoneDiv.setAttribute("id", zoneDivId);
		
		this.zoneKeysToZoneDivIds[zoneKey]=zoneDivId;
		
	}

	
	 	mybuys.traverseMBNodes = function()
	{	
		var linkrxp=/\[_mbsignuplink_\]/;
		var imgrxp=/\[mbimgsrc\]/;
		var glinkrxp=/\[_mbsignuplink_\]/g;
		var gtokenrxp=/\[mbtoken\]/g;
		var mbbr=this.params["brandname"] || "";
		var mbkw=this.params["keywords"] || "";
		var mbcn=this.params["categoryname"] || "";
		var mbpn=this.params["productname"] || "";
		var mboos=this.params["notinstock"] || "";
		var els=document.getElementsByTagName("*");
		var demoOn=this.gup("d");
		//var demoOn=false;
		for (var m=0; m <els.length; m++)
		{	var elm=els[m];
			// 1. Signup links
			var mbid=elm.getAttribute("mbid");
			if (mbid)
			{
				var atext=elm.innerHTML;
				if (!linkrxp.test(atext)) continue;
				if (mboos.toLowerCase()=='y')
				{	var tplt=this.signupTemplates["ibis"];
					var imgsrc=this.signupImages["ibis"];
				}
				else
				{	var tplt=this.signupTemplates[mbid];
					var imgsrc=this.signupImages[mbid];
				}
				if (imgsrc) tplt=this.signupTemplates["imgtplt"].replace(imgrxp,imgsrc) + tplt;
				switch (mbid)
				{	case "search":
						var btext=tplt.replace(gtokenrxp,mbkw);
						break;
					case "brand":
						var btext=tplt.replace(gtokenrxp,mbbr);
						break;
					case "category":
						var btext=tplt.replace(gtokenrxp,mbcn);
						break;
					case "product":
					case "ibis":
						var btext=tplt.replace(gtokenrxp,mbpn);
						break;
					default:
						continue;
				}
				var ctext=atext.replace(glinkrxp,btext);
				elm.innerHTML=ctext;
				elm.style.display="inline";
				if(this.oneclkForExistingSignup)
				{	elm.href="javascript:void()";
					elm.className=null;
					elm.style.paddingBottom="3px";
					elm.onclick= function(){mybuys.checkSignedupEmail(this);return false;};
				}
			}
			// 2. webrec zone
			var zoneKey=elm.getAttribute("mybuyszone");
			if (zoneKey)
			{	var zoneKeyInt = parseInt(zoneKey);
				if (!isNaN(zoneKeyInt)&&zoneKeyInt>=0&&demoOn=="true")
					{
						this.addZone(zoneKeyInt, elm, demoOn);
					} else if (!isNaN(zoneKeyInt)&&zoneKeyInt>=0) 
					{ 
						this.addZone(zoneKeyInt, elm);
					}
			}
			// 3. oneclick signup
			var oneclk=elm.getAttribute("mboneclk");
			if (oneclk)
			{	var htmlStr=mboneclk.rcBtnStr();
				var rcBtn=true;
				if(this.oneclkImgSrc)
				{
					htmlStr=mboneclk.imgStr();
					rcBtn=false;
				}
				else if(this.oneclkLinkLabel)
				{
					htmlStr=mboneclk.alinkStr();
					rcBtn=false;
				}
				elm.innerHTML=htmlStr;
				mybuys.initOneclkSignupBtn(rcBtn);
			}
		}
		// Set wr param
		var zoneKeys="";
		for (var z=0;z<this.zoneKeysToZoneDivIds.length;z++)
		{	if (!this.zoneKeysToZoneDivIds[z]) continue;
			if (zoneKeys != "") zoneKeys += ",";
			zoneKeys += z;
		}
		if (zoneKeys != "") this.params["wrz"]=zoneKeys;
		
		
 	}
	
mybuys.old_processResponseHTML = function(zoneHtmls)
{
	old_loadjQuery(
		function() {
			old_loadCarousel(
				function() {
					if (mybuys.pagetype == "SHOPPING_CART") {
						
						old_initCarousel(3, 3,100);
					} else {
						old_initCarousel(3, 3,120);
					}
				}
			)
		}
	);
};

function quickShopHover(x) {
	var element = x.getElementsByTagName('*');
	for(var i in element) {
		if(element[i].className != null) {
			if( (element[i].className).indexOf("mbquickshop") > -1) {
				element[i].style.display = "block";
			}
		}
	}
}
function quickShopOut(x) {
	var element = x.getElementsByTagName('*');
	for(var i in element) {
		if(element[i].className != null) {
			if( (element[i].className).indexOf("mbquickshop") > -1) {
				element[i].style.display = "none";
			}
		}
	}
}

mybuys.setClient("ARMANIEXCHANGE");
mybuys.enableZones();

mybuys.setStyle('.mbzone', 'background-color', '#5C5C5C');
mybuys.setStyle('td.mblegend','text-align', 'left');
mybuys.setStyle('.mblegend','margin', '5px', 'color','#FFFFFF', 'font-size', '11px', 'font-family','Arial,Verdana,Helvetica,sans-serif');
mybuys.setStyle('.mbitem','background-color','#5C5C5C','width', '113px','height','124px', 'padding', '0px', 'text-overflow', 'ellipsis', 'overflow', 'hidden');//, 'padding-right', '1px', ,'height','116px');
mybuys.setStyleByPageType("SHOPPING_CART",'.mbitem','background-color','#5C5C5C','width', '115px', 'height','124px');//, 'padding-right', '1px', ,'height','116px');

mybuys.setStyle('.mbnamerowspan','text-align','left','padding-left','5px','padding-top','5px','width','100px');
mybuys.setStyle('.mbnamelink:link','color','#4c4c4c','font-size','11px','font-weight','bold', 'text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif', 'text-overflow', 'ellipsis', 'overflow', 'hidden');
mybuys.setStyle('.mbnamelink:visited','color','#4c4c4c','font-size','11px','font-weight','bold', 'text-decoration','none', 'Arial, Helvetica, Verdana, Geneva, sans-serif', 'text-overflow', 'ellipsis', 'overflow', 'hidden');
mybuys.setStyle('.mbnamelink:hover','color','#4c4c4c','font-size','11px','font-weight','bold', 'text-decoration','none', 'Arial, Helvetica, Verdana, Geneva, sans-serif', 'text-overflow', 'ellipsis', 'overflow', 'hidden');

mybuys.setStyle('.mbpricerowspan','text-align','left','padding-left','5px');
mybuys.setStyle('.mbpricerowleft','float', 'left','text-align','');
mybuys.setStyle('.mbpricerowright','float', 'left','text-align','');
mybuys.setStyle('.mbpricelink:link','color', '#4c4c4c','font-size','11px','font-weight','normal','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyle('.mbpricelink:visited','color', '#4c4c4c','font-size','11px','font-weight','normal','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyle('.mbpricelink:hover','color', '#4c4c4c','font-size','11px','font-weight','normal','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');

mybuys.setStyle('.mbsalerowspan','text-align','left','padding-left','5px');
mybuys.setStyle('.mbsalerowleft','float', 'left','text-align','');
mybuys.setStyle('.mbsalerowright','float', 'left','text-align','');
mybuys.setStyle('.mbsalelink:link','color', '#FF0000','font-size','11px', 'font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyle('.mbsalelink:visited','color', '#FF0000','font-size','11px','font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyle('.mbsalelink:hover','color', '#FF0000','font-size','11px','font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');

mybuys.setStyleByPageType("HOME",'.mbzone', 'background-color', 'transparent','padding-left','10px','padding-bottom','10px');
mybuys.setStyleByPageType("HOME",'.mbitem','background-color','transparent','width', '107px', 'height','198px', 'margin-right','15px','border-color','#BDBEBD', 'border-width', '1px', 'border-style', 'solid');//, 'padding-right', '1px', ,'height','116px');
mybuys.setStyleByPageType("HOME",'.mbimg','width', '105px', 'height','116px', 'padding', '0px', 'margin', '0px');//, 'padding-right', '1px', ,'height','116px');
mybuys.setStyleByPageType("HOME",'.mbimgspan','padding','0px', 'background-color', '#FFFFFF');
mybuys.setStyleByPageType("HOME",'td.mblegend','text-align', 'left','font-size','0px','line-height','0px');
mybuys.setStyleByPageType("HOME",'.mbblingrowspan','padding-bottom','0px');
mybuys.setStyleByPageType("HOME",'.mbsalelink:link','color', '#4c4c4c','font-size','11px', 'font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyleByPageType("HOME",'.mbsalelink:visited','color', '#4c4c4c','font-size','11px','font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyleByPageType("HOME",'.mbsalelink:hover','color', '#4c4c4c','font-size','11px','font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');

mybuys.setStyleByPageType("LANDING",'.mbzone', 'background-color', 'transparent','padding-left','10px','padding-bottom','10px');
mybuys.setStyleByPageType("LANDING",'.mbitem','background-color','transparent','width', '107px', 'height','198px', 'margin-right','15px','border-color','#BDBEBD', 'border-width', '1px', 'border-style', 'solid');//, 'padding-right', '1px', ,'height','116px');
mybuys.setStyleByPageType("LANDING",'.mbimg','width', '105px', 'height','116px', 'padding', '0px', 'margin', '0px');//, 'padding-right', '1px', ,'height','116px');
mybuys.setStyleByPageType("LANDING",'.mbimgspan','padding','0px', 'background-color', '#FFFFFF');
mybuys.setStyleByPageType("LANDING",'td.mblegend','text-align', 'left','font-size','0px','line-height','0px');
mybuys.setStyleByPageType("LANDING",'.mbblingrowspan','padding-bottom','0px');
mybuys.setStyleByPageType("LANDING",'.mbsalelink:link','color', '#4c4c4c','font-size','11px', 'font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyleByPageType("LANDING",'.mbsalelink:visited','color', '#4c4c4c','font-size','11px','font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyleByPageType("LANDING",'.mbsalelink:hover','color', '#4c4c4c','font-size','11px','font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');

mybuys.setStyleByPageType("ADD_TO_CART",'.mbzone', 'background-color', 'transparent','padding-left','10px','padding-bottom','10px');
mybuys.setStyleByPageType("ADD_TO_CART",'.mbitem','background-color','transparent','width', '107px', 'height','196px', 'margin-right','25px','border-color','#BDBEBD', 'border-width', '1px', 'border-style', 'solid', 'margin-bottom', '20px');//, 'padding-right', '1px', ,'height','116px');
mybuys.setStyleByPageType("ADD_TO_CART",'.mbimg','width', '105px', 'height','116px', 'padding', '0px', 'margin', '0px');//, 'padding-right', '1px', ,'height','116px');
mybuys.setStyleByPageType("ADD_TO_CART",'.mbimgspan','padding','0px', 'background-color', '#FFFFFF');
mybuys.setStyleByPageType("ADD_TO_CART",'td.mblegend','text-align', 'left','font-size','0px','line-height','0px', 'display', 'none');
mybuys.setStyleByPageType("ADD_TO_CART",'.mbblingrowspan','padding-bottom','0px');
mybuys.setStyleByPageType("ADD_TO_CART",'.mbsalelink:link','color', '#4c4c4c','font-size','11px', 'font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyleByPageType("ADD_TO_CART",'.mbsalelink:visited','color', '#4c4c4c','font-size','11px','font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');
mybuys.setStyleByPageType("ADD_TO_CART",'.mbsalelink:hover','color', '#4c4c4c','font-size','11px','font-weight','none','text-decoration','none', 'font-family', 'Arial, Helvetica, Verdana, Geneva, sans-serif');

mybuys.setStyle('.mbpdp2','background-color','#424242');
mybuys.setStyle('.mbpdp2 .mblegend','padding','3px 0');
mybuys.setStyle('.mbpdp2 .mbitem','width','105px','height','auto','margin-bottom','22px');

//PDP Slider Zone
mybuys.setStyle('.mbslider_x3','width','437px','border','0','position','relative','padding','0 19px','overflow','hidden','background-color','#F3F3F3');
mybuys.setStyle('.mbslider_x3 .mbitem','width','120px','height','185px','border','0','padding','10px 8px 10px 12px','background-color','#F3F3F3');
mybuys.setStyle('.mbslider_x3 .mbimgspan','margin-bottom','5px','background-color','white','margin','25px 0px','height','130px','width','119px');
mybuys.setStyle('.mbslider_x3 .mbimg','border','1px solid #B8B8B8');
mybuys.setStyle('.mbslider_x3 .mbrowspan','width','119px');
mybuys.setStyle('.mbslider_x3 .mbleftnav','position','absolute','left','0','top','0','padding','100px 0px','background-color','#F3F3F3');
mybuys.setStyle('.mbslider_x3 .mbrightnav','position','absolute','left','447px','top','0','padding','100px 0px','background-color','#F3F3F3');
mybuys.setStyle('.mbslider_x3 .mbleftnavbtn','cursor','pointer');
mybuys.setStyle('.mbslider_x3 .mbrightnavbtn','cursor','pointer');
mybuys.setStyle('.mbLegendCarousel','background-color','#DCDCDC','padding', '5px', 'color','#4C4C4C', 'font-size', '11px', 'font-family','Arial,Verdana,Helvetica,sans-serif');
mybuys.setStyle('.carouselItems','display','block','padding-right','15px','float','right');

//PDP test page
mybuys.setStyle('.mbslider_x3 .mbitem','width','120px','height','185px','border','0','padding','10px 8px 10px 12px','background-color','#F3F3F3');
mybuys.setStyle('.mbslider_x3 .mbquickshop','display','none','position','relative','top','-75px','left','7px');

mybuys.setOneclkSignupAsImg("http://w.p.mybuys.com/clients/ARMANIEXCHANGE/images/AX_Button_GPA_199x23.gif");


mybuys.applyStyles();

mybuys.setFailOverMsecs(5000);


