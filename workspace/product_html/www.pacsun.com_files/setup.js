/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/
/************* ALSO EDIT SETUP_INTL.JS !!!!!!!!!!!!!!! *************/

// Handle pop-ups
mybuys.pacsun = {};
mybuys.pacsun.popup = function(productId)
{
	psObj.qv(productId);
	return false;
};


// This is used to ignore orders from an email address we shouldn't claim attribution on
mybuys.base_initPage = mybuys.initPage;
mybuys.initPage = function() { 
	if((typeof this.params["pt"] != "undefined") && (this.params["pt"].indexOf("purchase") != -1)){
		if ((typeof this.params["email"] != "undefined") && (this.params['email'].toLowerCase().indexOf("@pacsun") > -1)) return;

		this.base_initPage();
	}else{
		this.base_initPage();
	}
}

function mbcarouselInitCallback_prod10(carousel) {
	jQuery('.MB_PROD10 .MB_CAROUSELLEFT').bind('click', function() { carousel.prev(); return false; });
	jQuery('.MB_PROD10 .MB_CAROUSELRIGHT').bind('click', function() { carousel.next(); return false; });
	return false;
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
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
		}
	};
	head.appendChild(script);
	return false;
}

function loadjQuery(callback) {
	if(typeof jQuery == 'undefined') {
		var url = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js';
		loadScript(url, function () {
			callback();
		});
	} else {
		callback();
	}
}

function loadCarousel(callback) {
	if(typeof jQuery.jcarousel == "undefined") {
		mb_carousel();
		callback();
	} else {
		callback();
	}
}

var mb_carousel = function() { (function(i){var q={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null, itemFallbackDimension:300},r=false;i(window).bind("load.jcarousel",function(){r=true});i.jcarousel=function(a,c){this.options=i.extend({},q,c||{});this.autoStopped=this.locked=false;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===undefined)this.options.rtl=(i(a).attr("dir")||i("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?this.options.rtl? "right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jmcarousel-skin")!=-1){i(a).removeClass(d[f]);b=d[f];break}if(a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"){this.list=i(a);this.container=this.list.parent();if(this.container.hasClass("jmcarousel-clip")){if(!this.container.parent().hasClass("jmcarousel-container"))this.container=this.container.wrap("<div></div>");this.container=this.container.parent()}else if(!this.container.hasClass("jmcarousel-container"))this.container= this.list.wrap("<div></div>").parent()}else{this.container=i(a);this.list=this.container.find("ul,ol").eq(0)}b!==""&&this.container.parent()[0].className.indexOf("jmcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.clip=this.list.parent();if(!this.clip.length||!this.clip.hasClass("jmcarousel-clip"))this.clip=this.list.wrap("<div></div>").parent();this.buttonNext=i(".jmcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext= this.clip.after(this.options.buttonNextHTML).next();this.buttonNext.addClass(this.className("jmcarousel-next"));this.buttonPrev=i(".jmcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=this.clip.after(this.options.buttonPrevHTML).next();this.buttonPrev.addClass(this.className("jmcarousel-prev"));this.clip.addClass(this.className("jmcarousel-clip")).css({overflow:"hidden",position:"relative"});this.list.addClass(this.className("jmcarousel-list")).css({overflow:"hidden", position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jmcarousel-container")).css({position:"relative"});!this.options.vertical&&this.options.rtl&&this.container.addClass("jmcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;b=this.list.children("li");var e=this;if(b.size()>0){var g=0,k=this.options.offset;b.each(function(){e.format(this,k++);g+=e.dimension(this, j)});this.list.css(this.wh,g+100+"px");if(!c||c.size===undefined)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.reload()};this.options.initCallback!==null&&this.options.initCallback(this,"init");if(!r&&i.browser.safari && i.browser.version < 523){this.buttons(false,false);i(window).bind("load.jcarousel",function(){e.setup()})}else this.setup()}; var h=i.jcarousel;h.fn=h.prototype={jcarousel:"0.2.7"};h.fn.extend=h.extend=i.extend;h.fn.extend({setup:function(){this.prevLast=this.prevFirst=this.last=this.first=null;this.animating=false;this.tail=this.timer=null;this.inTail=false;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,true);this.prevFirst=this.prevLast=null;this.animate(a,false);i(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize)}}, reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=false;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0; this.list.children("li").each(function(f){b+=a.dimension(this,c);if(f+1<a.first)d=b});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,false)},lock:function(){this.locked=true;this.buttons()},unlock:function(){this.locked=false;this.buttons()},size:function(a){if(a!==undefined){this.options.size=a;this.locked||this.buttons()}return this.options.size},has:function(a,c){if(c===undefined||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b= a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jmcarousel-item-placeholder"))return false}return true},get:function(a){return i(".jmcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,f=i(c);if(b.length===0){var j,e=h.intval(a);for(b=this.create(a);;){j=this.get(--e);if(e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}}else d=this.dimension(b);if(f.get(0).nodeName.toUpperCase()=="LI"){b.replaceWith(f);b=f}else b.empty().append(c);this.format(b.removeClass(this.className("jmcarousel-item-placeholder")), a);f=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;d=this.dimension(b,f)-d;a>0&&a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,h.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(!(!c.length||a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,h.intval(this.list.css(this.wh))- b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(false):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(true):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!(this.locked|| this.animating||!this.tail)){this.pauseAuto();var c=h.intval(this.list.css(this.lt));c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){if(!(this.locked||this.animating)){this.pauseAuto();this.animate(this.pos(a),c)}},pos:function(a,c){var b=h.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;if(this.options.wrap!="circular")a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a;for(var d= this.first>a,f=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(f):this.get(this.last),e=d?f:f-1,g=null,k=0,l=false,m=0;d?--e>=a:++e<a;){g=this.get(e);l=!g.length;if(g.length===0){g=this.create(e).addClass(this.className("jmcarousel-item-placeholder"));j[d?"before":"after"](g);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)){j=this.get(this.index(e));if(j.length)g=this.add(e,j.clone(true))}}j=g;m=this.dimension(g);if(l)k+= m;if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<=this.options.size)))b=d?b+m:b-m}f=this.clipping();var p=[],o=0,n=0;j=this.get(a-1);for(e=a;++o;){g=this.get(e);l=!g.length;if(g.length===0){g=this.create(e).addClass(this.className("jmcarousel-item-placeholder"));j.length===0?this.list.prepend(g):j[d?"before":"after"](g);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)){j=this.get(this.index(e));if(j.length)g= this.add(e,j.clone(true))}}j=g;m=this.dimension(g);if(m===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");if(this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size)p.push(g);else if(l)k+=m;n+=m;if(n>=f)break;e++}for(g=0;g<p.length;g++)p[g].remove();if(k>0){this.list.css(this.wh,this.dimension(this.list)+k+"px");if(d){b-=k;this.list.css(this.lt,h.intval(this.list.css(this.lt))-k+"px")}}k=a+o-1;if(this.options.wrap!="circular"&& this.options.size&&k>this.options.size)k=this.options.size;if(e>k){o=0;e=k;for(n=0;++o;){g=this.get(e--);if(!g.length)break;n+=this.dimension(g);if(n>=f)break}}e=k-o+1;if(this.options.wrap!="circular"&&e<1)e=1;if(this.inTail&&d){b+=this.tail;this.inTail=false}this.tail=null;if(this.options.wrap!="circular"&&k==this.options.size&&k-o+1>=1){d=h.margin(this.get(k),!this.options.vertical?"marginRight":"marginBottom");if(n-d>f)this.tail=n-f-d}if(c&&a===this.options.size&&this.tail){b-=this.tail;this.inTail= true}for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=k;return b},animate:function(a,c){if(!(this.locked||this.animating)){this.animating=true;var b=this,d=function(){b.animating=false;a===0&&b.list.css(b.lt,0);if(!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail))b.startAuto();b.buttons();b.notify("onAfterAnimation"); if(b.options.wrap=="circular"&&b.options.size!==null)for(var f=b.prevFirst;f<=b.prevLast;f++)if(f!==null&&!(f>=b.first&&f<=b.last)&&(f<1||f>b.options.size))b.remove(f)};this.notify("onBeforeAnimation");if(!this.options.animation||c===false){this.list.css(this.lt,a+"px");d()}else this.list.animate(!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},this.options.animation,this.options.easing,d)}},startAuto:function(a){if(a!==undefined)this.options.auto=a;if(this.options.auto===0)return this.stopAuto(); if(this.timer===null){this.autoStopped=false;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=true},pauseAuto:function(){if(this.timer!==null){window.clearTimeout(this.timer);this.timer=null}},buttons:function(a,c){if(a==null){a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size);if(!this.locked&&(!this.options.wrap||this.options.wrap== "first")&&this.options.size!==null&&this.last>=this.options.size)a=this.tail!==null&&!this.inTail}if(c==null){c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1);if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1)c=this.tail!==null&&this.inTail}var b=this;if(this.buttonNext.size()>0){this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext);a&&this.buttonNext.bind(this.options.buttonNextEvent+ ".jcarousel",this.funcNext);this.buttonNext[a?"removeClass":"addClass"](this.className("jmcarousel-next-disabled")).attr("disabled",a?false:true);this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)}else this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);if(this.buttonPrev.size()>0){this.buttonPrev.unbind(this.options.buttonPrevEvent+ ".jcarousel",this.funcPrev);c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev);this.buttonPrev[c?"removeClass":"addClass"](this.className("jmcarousel-prev-disabled")).attr("disabled",c?false:true);this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)}else this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b, null,c);this.buttonNextState=a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",a,c,this.first);this.callback("itemFirstOutCallback",a,c,this.prevFirst)}if(this.prevLast!==this.last){this.callback("itemLastInCallback",a,c,this.last);this.callback("itemLastOutCallback",a,c,this.prevLast)}this.callback("itemVisibleInCallback", a,c,this.first,this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var g=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(i.isFunction(g)){var k=this;if(d===undefined)g(k,b,c);else if(f===undefined)this.get(d).each(function(){g(k,this,d,b,c)});else{a=function(m){k.get(m).each(function(){g(k, this,m,b,c)})};for(var l=d;l<=f;l++)l!==null&&!(l>=j&&l<=e)&&a(l)}}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){a=i(a);for(var b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jmcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jmcarousel-item")).addClass(this.className("jmcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical? "-horizontal":"-vertical")},dimension:function(a,c){var b=a.jquery!==undefined?a[0]:a,d=!this.options.vertical?(b.offsetWidth||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginLeft")+h.margin(b,"marginRight"):(b.offsetHeight||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginTop")+h.margin(b,"marginBottom");if(c==null||d==c)return d;d=!this.options.vertical?c-h.margin(b,"marginLeft")-h.margin(b,"marginRight"):c-h.margin(b,"marginTop")-h.margin(b,"marginBottom");i(b).css(this.wh, d+"px");return this.dimension(b)},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-h.intval(this.clip.css("borderLeftWidth"))-h.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-h.intval(this.clip.css("borderTopWidth"))-h.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});h.extend({defaults:function(a){return i.extend(q,a||{})},margin:function(a,c){if(!a)return 0; var b=a.jquery!==undefined?a[0]:a;if(c=="marginRight"&&i.browser.safari){var d={display:"block","float":"none",width:"auto"},f,j;i.swap(b,d,function(){f=b.offsetWidth});d.marginRight=0;i.swap(b,d,function(){j=b.offsetWidth});return j-f}return h.intval(i.css(b,c))},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a}});i.fn.jcarousel=function(a){if(typeof a=="string"){var c=i(this).data("jcarousel"),b=Array.prototype.slice.call(arguments,1);return c[a].apply(c,b)}else return this.each(function(){i(this).data("jcarousel", new h(this,a))})}})(jQuery); }


mybuys.base_processResponseHTML = mybuys.processResponseHTML;
mybuys.processResponseHTML = function(zoneHtmls) {
	this.base_processResponseHTML(zoneHtmls);
	if(this.pagetype == "PRODUCT_DETAILS") {
		loadjQuery(function() {
			loadCarousel(function() {
				initCarousel('#mbcarousel10', 2, 2, false, mbcarouselInitCallback_prod10);
			})
		});
	}
};

function initCarousel(element, visibleitems, scrollitems, isVertical, callback) {
	jQuery(element).jcarousel({
		wrap: 'circular',
		visible: visibleitems,
		scroll: scrollitems,
		vertical: isVertical,
		animation: 1000,
		initCallback: callback,
		buttonNextHTML: null,
		buttonPrevHTML: null,
		itemFallbackDimension: 137
	});
}

loadjscssfile("https://t.p.mybuys.com/clients/PACSUN/css/styles.css", "css");

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", filename);
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref);
}



mybuys.setClient("PACSUN");

//Styles for all zones
mybuys.setStyle('.mbitem', 'font-family', 'sans-serif', 'text-align', 'left');
mybuys.setStyle('.mbpricelink:link', 'color', '#000000', 'font-weight', 'normal');
mybuys.setStyle('.mbpricelink:visited', 'color', '#000000', 'font-weight', 'normal');
mybuys.setStyle('.mblistsalerowspan', 'text-align', 'left', 'background-color', '#FFFFFF', 'padding-left', '2px', 'white-space', 'normal');
mybuys.setStyle('.mbnamerowspan', 'text-align', 'left', 'overflow', 'hidden', 'background-color', '#FFFFFF', 'padding-left', '2px', 'line-height', 'normal !important');
mybuys.setStyle('.mbimgspan', 'background-color', '#FFFFFF');
mybuys.setStyle('.mblegend', 'font-size', '12px', 'font-weight', 'bold', 'color', '#000000', 'text-align', 'left', 'padding', '0', 'font-family', 'sans-serif');
mybuys.setStyle('.mblistlink:link', 'color', '#999999', 'text-decoration', 'line-through');
mybuys.setStyle('.mblistlink:visited', 'color', '#999999', 'text-decoration', 'line-through');
mybuys.setStyle('.mbsalelink:link', 'color', '#FF0000');
mybuys.setStyle('.mbsalelink:visited', 'color', '#FF0000');
mybuys.setStyle('.mbdivider', 'height', '0px', 'border-color', '#C1C1C1', 'border-style', 'none none dotted', 'border-width', '0 0 1px');
mybuys.setStyle('.mbpromotext', 'color', 'red', 'text-align', 'left', 'display', 'inline-block'); 

//PDP styles
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbzone', 'width', '415px');
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbitem', 'width', '100px', 'padding', '0px 1px 0px 2px', 'font-size', '9px');
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbnamerowspan', 'width', '100px', 'max-height', '24px');

//Shopping Cart styles
mybuys.setStyleByPageType("SHOPPING_CART", '.mbzone', 'width', '520px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbitem', 'width', '120px', 'padding', '10px 5px 0', 'font-size', '11px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbnamerowspan', 'width', '100px', 'max-height', '28px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mblegend', 'background-color', '#E7E7E7', 'padding', '0 5px', 'line-height', '31px !important', 'font-weight', 'normal', 'font-size', '11px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbdivider', 'display', 'none !important');

//HCAT styles
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbzone', 'width', '780px');
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbitem', 'width', '180px', 'padding', '0px 7px 0px 8px', 'font-size', '11px');
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbnamerowspan', 'width', '140px', 'max-height', '28px');

//No Search Results styles
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbzone', 'width', '960px');
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbitem', 'width', '185px', 'padding', '0px 3px 0px 4px', 'font-size', '11px');
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbnamerowspan', 'width', '140px', 'max-height', '28px');

//Cat styles
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTNAMELINK','font-family','Arial, Helvetica, sans-serif','font-size','11px','font-weight','normal','text-transform','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTSLOT','display','inline','width','182px','text-align','center','padding','10px 6px 10px 6px');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTPRICELINK','font-family','Arial, Helvetica, sans-serif','font-size','11px','font-weight','normal','text-transform','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTBRAND','align','left','text-align','left','color','#000000','text-decoration','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTNAME','align','left','text-align','left','color','#000000','text-decoration','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTNOTDISCOUNTEDPRICEWRAPPER','display','inline','width','182px','text-align','left','line-height','normal','padding','0px 0px 0px 2px');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTPRICE','color','#000000','text-decoration','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTDISCOUNTEDPRICEWRAPPER','display','inline','width','182px','text-align','left','line-height','normal','padding','0px 0px 0px 2px');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTBASEPRICE','color','#A2A3A5','text-decoration','line-through');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTSALEPRICELINK','font-family','Arial, Helvetica, sans-serif','color','#FF2F00','font-size','11px','font-weight','normal','text-decoration','none','text-transform','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTATTRIBUTE\\=promo_text','color','#FF2F00','text-decoration','none');
mybuys.setStyle('.MB_CAT1 .MB_STY0','display','inline','width','182px','height','282px','text-align','left','line-height','normal','padding','0px 0px 10px 0px');
mybuys.setStyle('.MB_CAT1 .MB_STY1','display','inline','width','182px','text-align','left','line-height','normal','padding','5px 0px 0px 2px');
mybuys.setStyle('.MB_CAT1 .MB_STY2','display','inline','width','182px','text-align','left','line-height','normal','padding','0px 0px 0px 2px');

mybuys.oldProcessResponseHTML = mybuys.processResponseHTML;
mybuys.processResponseHTML = function(zoneHtmls) {
	mybuys.oldProcessResponseHTML(zoneHtmls);
	
	
	var currency = mybuys.params.currency;
	
	function getPrice(pricesString) {
		var prices = pricesString.split("|,");
		var finalPrice = "0";
		for(var i = 0; i < prices.length; i++) {
			if(prices[i].indexOf(currency) == 0) {
				finalPrice = prices[i].substr(3, prices[i].length-3);
				return finalPrice.replace("|", '');
			}
		}
	}
	
	if(currency) {
		var cur_index = 0;
		var currentPriceSpan = document.getElementById("mb_intl_current_price" + cur_index);

		mybuys.setStyle('.mbpromotext', 'display', 'none');
		while(currentPriceSpan) {
			//get correct price
			var pricesString = currentPriceSpan.innerHTML;
			var finalPrice = getPrice(pricesString);
			//do current price substitution
			if(finalPrice) {
				var priceToChange = document.getElementById("mbcurrent" + cur_index);
				priceToChange.innerHTML = finalPrice;
			} else {
					//console.info(cur_index + " " + pricesString);
				}
			//increment loop
			cur_index += 1;
			currentPriceSpan = document.getElementById("mb_intl_current_price" + cur_index);
		}
		var max_index = cur_index;
		cur_index = 0;
		while(cur_index < max_index) {
			currentPriceSpan = document.getElementById("mb_intl_base_price" + cur_index);
			if(currentPriceSpan) {
				//get correct price
				var pricesString = currentPriceSpan.innerHTML;
				var finalPrice = getPrice(pricesString);
				//do base price substitution
				if(finalPrice) {
					var priceToChange = document.getElementById("mbbase" + cur_index);
					priceToChange.innerHTML = finalPrice;
				} else {
					//console.info(cur_index + " " + pricesString);
				}
			}
			//increment loop
			cur_index += 1;
		}
		
		cur_index = 0;
		while(cur_index < max_index) {
			currentPromoDiv = document.getElementById("mbpromotext" + cur_index);
			if(currentPromoDiv) {
				var promoString = ' ' + currentPromoDiv.innerHTML;
				if(promoString.indexOf('$') > -1) {
					currentPromoDiv.setAttribute('style', 'display:none;');
				} else {
					//console.info(cur_index + " " + promoString);
				}
			}
			//increment loop
			cur_index += 1;
		}
	}
	
	//BEGIN URL FIXING
	if((mybuys.params['pt'] == 'cart') && (location.protocol === 'https:')) {
		var mbDomainName = location.host;
		jQuery('a.mbimglink,a.mbnamelink,a.mblistlink,a.mbsalelink,a.mbpricelink').each(function(index) {
			$(this).attr('href', 'http://' + mbDomainName + $(this).attr('href'));
		});
	}
}

mybuys.applyStyles();
mybuys.setFailOverMsecs(5000);
mybuys.enableZones();
