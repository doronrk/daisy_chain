// This is used to ignore orders from an email address we shouldn't claim attribution on
mybuys.base_initPage = mybuys.initPage;
mybuys.initPage = function() { 
	if((this.params["pt"]) && (this.params["pt"].indexOf("purchase") != -1)){
		if ((this.params["email"]) && (this.params["email"].indexOf("custserv@bootbarn.com") != -1)) return;
if ((this.params["email"]) && (this.params["email"].indexOf("swilhite@bootbarn.com") != -1)) return;
		this.base_initPage();
	}else{
		this.base_initPage();
	}
}

function mbcarouselInitCallback_h7(carousel) {
	jQuery('.MB_H7 .MB_CAROUSELLEFT').bind('click', function() { carousel.prev(); return false; });
	jQuery('.MB_H7 .MB_CAROUSELRIGHT').bind('click', function() { carousel.next(); return false; });
	return false;
}

function mbcarouselInitCallback_h5(carousel) {
	jQuery('.MB_H5 .MB_CAROUSELLEFT').bind('click', function() { carousel.prev(); return false; });
	jQuery('.MB_H5 .MB_CAROUSELRIGHT').bind('click', function() { carousel.next(); return false; });
	return false;
}

function mbcarouselInitCallback_h4(carousel) {
	jQuery('.MB_H4 .MB_CAROUSELLEFT').bind('click', function() { carousel.prev(); return false; });
	jQuery('.MB_H4 .MB_CAROUSELRIGHT').bind('click', function() { carousel.next(); return false; });
	return false;
}

function mbcarouselInitCallback_h3(carousel) {
	jQuery('.MB_H3 .MB_CAROUSELLEFT').bind('click', function() { carousel.prev(); return false; });
	jQuery('.MB_H3 .MB_CAROUSELRIGHT').bind('click', function() { carousel.next(); return false; });
	return false;
}

function mbcarouselInitCallback_h2(carousel) {
	jQuery('.MB_H2 .MB_CAROUSELLEFT').bind('click', function() { carousel.prev(); return false; });
	jQuery('.MB_H2 .MB_CAROUSELRIGHT').bind('click', function() { carousel.next(); return false; });
	return false;
}

function mbcarouselInitCallback_h6(carousel) {
	jQuery('.MB_H6 .MB_CAROUSELLEFT').bind('click', function() { carousel.prev(); return false; });
	jQuery('.MB_H6 .MB_CAROUSELRIGHT').bind('click', function() { carousel.next(); return false; });
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
function loadCarousel(callback)
{
	if (typeof jQuery.fn.jCarouselLite == "undefined")
	{
		var url = "https://t.p.mybuys.com/clients/BOOTBARN/js/jcarousellite_1.0.1.min.js"
			loadScript(url, function ()
			{
				callback();
			}
			);
	}
	else
	{
		callback();
	}
}


mybuys.base_processResponseHTML = mybuys.processResponseHTML;
mybuys.processResponseHTML = function(zoneHtmls) {
	this.base_processResponseHTML(zoneHtmls);
	if(this.pagetype == "BRAND") {
		loadjQuery(function() {
			loadCarousel(function() {
				initCarouseltest('.MB_BRAND5 .MB_STY2', 4, 4, false, function () 
					{
						jQuery(".MB_BRAND5 .MB_PRODUCTSLOT").each(function()
							{
								jQuery(this).css("height", "auto");
							});
					});
			})
		});
	}
	if(this.pagetype == "HOME") {
		loadjQuery(function() {
			loadCarousel(function() {
				initCarouselh2('.MB_H2 .MB_STY1', 2, 2, false, function () {});
				initCarouselh3('.MB_H3 .MB_STY1', 2, 2, false, function () {});
				initCarouselh4('.MB_H4 .MB_STY1', 2, 2, false, function () {});
				initCarouselh5('.MB_H5 .MB_STY1', 2, 2, false, function () {});
				initCarouselh6('.MB_H6 .MB_STY1', 2, 2, false, function () {});
				initCarouselh7('.MB_H7 .MB_STY1', 2, 2, false, function () {});
			})
		});
	}
};



function initCarouseltest(element, visibleitems, scrollitems, isVertical, callback)
{
	jQuery(".MB_BRAND5 .MB_CAROUSELLEFT").addClass("prev");
	jQuery(".MB_BRAND5 .MB_CAROUSELRIGHT").addClass("next");
	jQuery(element).show();
	jQuery(element).jCarouselLite(
	{
		btnPrev : ".MB_BRAND5 .MB_CAROUSELLEFT",
		btnNext : ".MB_BRAND5 .MB_CAROUSELRIGHT",
		speed : "1000",
		visible: visibleitems,
		scroll: scrollitems
	}
	);
	callback();
}
function initCarouselh2(element, visibleitems, scrollitems, isVertical, callback)
{
	jQuery(".MB_H2 .MB_CAROUSELLEFT").addClass("prev");
	jQuery(".MB_H2 .MB_CAROUSELRIGHT").addClass("next");
	jQuery(element).show();
	jQuery(element).jCarouselLite(
	{
		btnPrev : ".MB_H2 .MB_CAROUSELLEFT",
		btnNext : ".MB_H2 .MB_CAROUSELRIGHT",
		speed : "1000",
		visible: visibleitems,
		scroll: scrollitems
	}
	);
	callback();
}
function initCarouselh3(element, visibleitems, scrollitems, isVertical, callback)
{
	jQuery(".MB_H3 .MB_CAROUSELLEFT").addClass("prev");
	jQuery(".MB_H3 .MB_CAROUSELRIGHT").addClass("next");
	jQuery(element).show();
	jQuery(element).jCarouselLite(
	{
		btnPrev : ".MB_H3 .MB_CAROUSELLEFT",
		btnNext : ".MB_H3 .MB_CAROUSELRIGHT",
		speed : "1000",
		visible: visibleitems,
		scroll: scrollitems
	}
	);
	callback();
}
function initCarouselh4(element, visibleitems, scrollitems, isVertical, callback)
{
	jQuery(".MB_H4 .MB_CAROUSELLEFT").addClass("prev");
	jQuery(".MB_H4 .MB_CAROUSELRIGHT").addClass("next");
	jQuery(element).show();
	jQuery(element).jCarouselLite(
	{
		btnPrev : ".MB_H4 .MB_CAROUSELLEFT",
		btnNext : ".MB_H4 .MB_CAROUSELRIGHT",
		speed : "1000",
		visible: visibleitems,
		scroll: scrollitems
	}
	);
	callback();
}
function initCarouselh5(element, visibleitems, scrollitems, isVertical, callback)
{
	jQuery(".MB_H5 .MB_CAROUSELLEFT").addClass("prev");
	jQuery(".MB_H5 .MB_CAROUSELRIGHT").addClass("next");
	jQuery(element).show();
	jQuery(element).jCarouselLite(
	{
		btnPrev : ".MB_H5 .MB_CAROUSELLEFT",
		btnNext : ".MB_H5 .MB_CAROUSELRIGHT",
		speed : "1000",
		visible: visibleitems,
		scroll: scrollitems
	}
	);
	callback();
}
function initCarouselh6(element, visibleitems, scrollitems, isVertical, callback)
{
	jQuery(".MB_H6 .MB_CAROUSELLEFT").addClass("prev");
	jQuery(".MB_H6 .MB_CAROUSELRIGHT").addClass("next");
	jQuery(element).show();
	jQuery(element).jCarouselLite(
	{
		btnPrev : ".MB_H6 .MB_CAROUSELLEFT",
		btnNext : ".MB_H6 .MB_CAROUSELRIGHT",
		speed : "1000",
		visible: visibleitems,
		scroll: scrollitems
	}
	);
	callback();
}
function initCarouselh7(element, visibleitems, scrollitems, isVertical, callback)
{
	jQuery(".MB_H7 .MB_CAROUSELLEFT").addClass("prev");
	jQuery(".MB_H7 .MB_CAROUSELRIGHT").addClass("next");
	jQuery(element).show();
	jQuery(element).jCarouselLite(
	{
		btnPrev : ".MB_H7 .MB_CAROUSELLEFT",
		btnNext : ".MB_H7 .MB_CAROUSELRIGHT",
		speed : "1000",
		visible: visibleitems,
		scroll: scrollitems
	}
	);
	callback();
}

function mbcarouselInitCallback_brand5(carousel) {
	jQuery('.MB_BRAND5 .MB_CAROUSELLEFT').bind('click', function() { carousel.prev(); return false; });
	jQuery('.MB_BRAND5 .MB_CAROUSELRIGHT').bind('click', function() { carousel.next(); return false; });
	return false;
}


mybuys.setClient("BOOTBARN");
mybuys.enableZones();

mybuys.setOneclkSignupAsImg("http://w.p.mybuys.com/clients/BOOTBARN/images/BootBarn_Signup-Button_95x8.gif");
mybuys.setOneclkButtonAlt("Get Product Alerts");

//zone
mybuys.setStyle('.mbzone','width','710px');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone1 .mbzone','border','1px solid #CCCCCC','width','190px');
mybuys.setStyleByPageType('LANDING','.mbzone','border','1px solid #CCCCCC','width','190px');
mybuys.setStyleByPageType('SHOPPING_CART','.mbzone','width','675px');
mybuys.setStyleByPageType('ORDER_CONFIRMATION','.mbzone','width','675px');
mybuys.setStyleByPageType('HOME','.mbzone','width','669px');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone2 .mbzone','width','720px');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone3 .mbzone','border','1px solid #000000');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone4 .mbzone','width','730px');

//zone title
mybuys.setStyle('.mblegend','font-family','Verdana, sans-serif','font-size','17px','color','#004B6B','text-align','left','border-bottom','4px solid #6C7169','text-transform','uppercase');
mybuys.setStyleByPageType('BRAND','.mblegend','color','#6C7169','text-align','center','border-bottom','none','font-size','15px','text-transform','none');
mybuys.setStyleByPageType('BRAND','td.mblegend','padding-left','20px','padding-right','20px');
mybuys.setStyleByPageType('LANDING','.mblegend','color','#6C7169','text-align','center','border-bottom','none','font-size','15px','text-transform','none');
mybuys.setStyleByPageType('HOME','.mblegend','border-bottom','none');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone2 .mblegend','display','none');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone3 .mblegend','display','none');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone4 .mblegend','color','#004B6B','text-align','left','border-bottom','4px solid #6C7169','font-size','16px','text-transform','uppercase', 'margin', '0 0 5px', 'padding', '0px');


//slot
mybuys.setStyle('.mbitem','width','150px','padding-left','13px','padding-right','14px','text-align','center','font-family', 'Verdana, sans-serif');
mybuys.setStyleByPageType('BRAND','.mbitem','padding-left','20px','padding-right','20px');
mybuys.setStyleByPageType('LANDING','.mbitem','padding-left','20px','padding-right','20px');
mybuys.setStyleByPageType('SHOPPING_CART','.mbitem','padding-left','9px','padding-right','9px');
mybuys.setStyleByPageType('ORDER_CONFIRMATION','.mbitem','padding-left','9px','padding-right','9px');
mybuys.setStyleByPageType('HOME','.mbitem','padding-left','8px','padding-right','9px');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone2 .mbitem','padding-left','15px','padding-right','15px');
mybuys.setStyleByPageType('BRAND','#mybuyspagezone4 .mbitem','padding-left','15px','padding-right','15px');

//custom bling icon
mybuys.setStyle('.mbrowspan','position','relative');
mybuys.setStyle('.mbicon','position','absolute','right','0px');

//product name
mybuys.setStyle('.mbnamerowspan','text-align','center','width','150px');
mybuys.setStyle('.mbnamelink:link','color','#003859','text-decoration','none','font-weight','normal','font-size','11px');
mybuys.setStyle('.mbnamelink:visited','color','#003859','text-decoration','none','font-weight','normal','font-size','11px');
mybuys.setStyle('.mbnamelink:hover','color','#003859','text-decoration','underline','font-weight','normal','font-size','11px');

//current price
mybuys.setStyle('.mbpricerowspan','padding-top','5px');
mybuys.setStyle('.mbpricelink:link','color','#533215','font-size','13px','text-decoration','none','font-weight','bold');
mybuys.setStyle('.mbpricelink:visited','color','#533215','font-size','13px','text-decoration','none','font-weight','bold');
mybuys.setStyle('.mbpricelink:hover','color','#533215','font-size','13px','text-decoration','none','font-weight','bold');

//list price
mybuys.setStyle('.mblistlink:link','color','#000000','font-size','12px','text-decoration','line-through','font-weight','normal');
mybuys.setStyle('.mblistlink:visited','color','#000000','font-size','12px','text-decoration','line-through','font-weight','normal');
mybuys.setStyle('.mblistlink:hover','color','#000000','font-size','12px','text-decoration','line-through','font-weight','normal');

//promo messages
mybuys.setStyle('.mbpromo a','color','#AD1C36','font-size','10px','text-decoration','none','font-weight','bold');
mybuys.setStyle('.mbpromo','display','block','clear','both');

//5x3 landing page zones
mybuys.setStyleByPageType('LANDING', '.mbseparator', 'border', '0', 'height', '1px', 'background-color', '#CCCCCC');
mybuys.setStyleByPageType('LANDING', '.mbNzone', 'border-bottom', '1px solid #6C7169', 'width','884px', 'padding', '1px');
mybuys.setStyleByPageType('LANDING', '.mbNnamerowspan', 'text-align', 'center', 'width', '166px', 'clear', 'both', 'display', 'block', 'float', 'left');
mybuys.setStyleByPageType('LANDING', '.mbNitem', 'font-family', 'Verdana,sans-serif', 'text-align', 'center', 'width', '176px', 'max-height', '248px');


mybuys.useOneclkForExistingSignup(true);
mybuys.applyStyles();
mybuys.setFailOverMsecs(5000);

