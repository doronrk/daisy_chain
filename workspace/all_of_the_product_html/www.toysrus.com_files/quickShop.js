if (quickShop) {} else {
	var quickShop = {};
}
if(typeof(trus) == "undefined"){
    var trus = {};
}
if(!trus.quickshopProduct) {
    trus.quickshopProduct = {}
}

/* START: Borrowing trus.product functions from product page javascript for quickshop functionality. */
trus.quickshopProduct.statusClasses = {
    'IN_STOCK'  : 'available',
    'RELEASE_DATED'  : 'available',
    'NOT_AVAILABLE'  : 'backordered',
    'OOS' : 'unavailable',
    'DNE' : 'unavailable'
};

trus.quickshopProduct.resetMarkers = function() {
    jQuery("#colorSize > .color > .marker-container, #colorSize > .size > .marker-container").addClass("hidden").removeClass("missing");
}

trus.quickshopProduct.showMarker = function() {
    var fields = jQuery("#colorSize > .color, #colorSize > .size");
    if(fields.length == 1)
        fields.find("#colorSize > .color > .marker-container, #colorSize > .size > .marker-container").addClass("missing");
    jQuery("#colorSize > .color > .marker-container.missing, #colorSize > .size > .marker-container.missing").removeClass("hidden");
}

trus.quickshopProduct.resetMessaging = function() {
    jQuery("#eligibility li").addClass("hidden");
    jQuery("#middle-availability p").addClass("hidden");
    trus.quickshopProduct.resetMarkers();
}
//size chart
trus.quickshopProduct.showSizeChart = function(src) {
    jQuery("#socialBookmarking").hide();
    if(this.sizeChartBox === undefined) {
        jQuery("#sizechartimg").attr("src", src);
        this.modalBox = new Df.Modal();
		trus.createModal(this.modalBox);
        this.modalBox.setDomNode($('sizechart_container'));
    }
	window.scroll(0,0);
    this.modalBox.show();
}

trus.quickshopProduct.hideSizeChart = function() {
    this.modalBox.hide();
    jQuery("body > .holder").hide();
    jQuery("#socialBookmarking").show();
}
trus.quickshopProduct.setMessaging = function(sku) {
	
    //if(sku.availability != "RELEASE_DATED") {
        if(sku.inStoreOnly) {
            jQuery("#eligibility .stock.unavailable-without-notification").removeClass("hidden");
            jQuery("#middle-availability .not-available").removeClass("hidden");
        } else {
            if(sku.availability == "OUT_OF_STOCK" || sku.availability == "NOT_AVAILABLE" || sku.availability == "ADVANCED_SALE_LIMITED" || sku.availability == "ADVANCED_SALE") {
                jQuery("#eligibility .stock.unavailable-with-notification").removeClass("hidden");
                if(sku.notify)
                    jQuery("#eligibility .stock.unavailable-with-notification > *").removeClass("hidden");
                else 
                    jQuery("#eligibility .stock.unavailable-with-notification > *").addClass("hidden");
                jQuery("#middle-availability .not-available").removeClass("hidden");
            } else {
                jQuery("#eligibility .stock.avail").removeClass("hidden");
            }
        }		
			if(sku.ISPUEligible) {
				if(hasCookie && myStoreEnabled == 'true' ){
					if(sku.myStore_ISPUAvailable ){
						jQuery('.ispu-eligible.myStoreAvail').removeClass('hidden');
					}
					else{
						if(!sku.myStore_ISSTSAvailable){
							jQuery('.ispu-eligible.myStoreAvail').addClass('hidden');
							jQuery('.ispu-eligible.myStoreUnAvail').removeClass('hidden');
						}
					}
				}
				else{
					if(sku.availability == "OUT_OF_STOCK" || sku.availability == "NOT_AVAILABLE" || sku.availability == "ADVANCED_SALE_LIMITED" || sku.availability == "ADVANCED_SALE") {
						jQuery("#eligibility .ispu-eligible.avail.out-of-stock").removeClass("hidden");
						jQuery("#middle-availability .not-available").removeClass("hidden");
					} else {
						jQuery("#eligibility .ispu-eligible.avail.in-stock").removeClass("hidden");
					}				
				}		
			} 
			else {
				(hasCookie && myStoreEnabled == 'true' && sku.STSEligible ) ? "": jQuery("#eligibility .ispu-eligible.unavail").removeClass("hidden");//If SKU is not eligible for STS and ISPU then only show unavail messages as shown without myStore
				if(sku.notSoldInStores) {
					jQuery("#eligibility .sold-in-stores.unavail").removeClass("hidden");
				} else {
					jQuery("#eligibility .sold-in-stores.avail").removeClass("hidden");
				}
			}
			if(sku.STSEligible ){
				if(hasCookie && myStoreEnabled == 'true' ){
					if(!sku.myStore_ISPUAvailable){
						if(sku.myStore_ISSTSAvailable){
							jQuery('.MyStore-sts-eligible.avail').removeClass('hidden');//if sts is available on MY STORE
						}
						else{
							if(!sku.ISPUEligible){
								jQuery('.MyStore-sts-eligible.avail').addClass('hidden');
								jQuery('.MyStore-sts-eligible.unavail').removeClass('hidden');//if sts is unavailable on MY STORE
							}
						}
					}
				}
				else{
					jQuery('.sts-eligible.avail').removeClass('hidden');//If STS is eligible and MY STORE is not set ot turned off
				}
			}
			else{
				(hasCookie && myStoreEnabled == 'true' && sku.ISPUEligible ) ? "": jQuery('.sts-eligible.unavail').removeClass('hidden');//If SKU is not eligible for STS and ISPU then only show unavail messages as shown without myStore
			}
    //}
}

trus.quickshopProduct.resetAdditionalInfo = function() {
    jQuery("#additionalInfo > .sknText").addClass("hidden").children(".value").html("&nbsp;");
    jQuery("#additionalInfo > .skuText").addClass("hidden").children(".value").html("&nbsp;");
    jQuery("#additionalInfo > .upc").addClass("hidden").children(".value").html("&nbsp;");
}

trus.quickshopProduct.setAdditionalInfo = function(sku) {
    var sknTextValue = jQuery("#additionalInfo > .sknText").removeClass("hidden").children(".value").html("&nbsp;");
    if(sku.skn)
        sknTextValue.text(sku.skn);
    var skuTextValue = jQuery("#additionalInfo > .skuText").removeClass("hidden").children(".value").html("&nbsp;");
    if(sku.vendorSku)
        skuTextValue.text(sku.vendorSku);
    var upcValue = jQuery("#additionalInfo > .upc").removeClass("hidden").children(".value").html("&nbsp;");
    if(sku.upc)
        upcValue.text(sku.upc);
}

trus.quickshopProduct.swapImages = function(data) {
    var alts = data.alternateViews;
    var moreInfoStep = jQuery("#moreInfoStep");
    totCount = alts.length;
    var content = "";
    if(alts.length) {
        content += '<div class="imgButtons" id="alternateViews">'
            + '<a href="javascript:trus.quickshopProduct.swapImage(\'' + data.mainImageUrl + '\',\'' + data.enhancedImageUrl + '\',\'' + data.enhancedImageUrl + '\');" class="imageLink" onfocus="this.blur();">'
                + '<img width="50" height="50"  onclick="javascript: jQuery(\'#zoom-content .flyoutZoom img\').attr(\'src\', \'' + data.mainImageUrl + '\'); jQuery(\'#flyout-zoom img\').attr(\'src\', \'' + data.enhancedImageUrl + '\');" alt="' + data.altText + '" name="altImgBorder_0" src="' + data.thumbImageUrl + '">'
            + '</a>'
            + '<br>'
        + '</div>';
        for(i = 0; i < alts.length; ++i) {
            content += '<div id="alternateViews" class="imgButtons">'
            + '<a href="javascript:trus.quickshopProduct.swapImage(\'' + alts[i].mainImageUrl + '\',\'' + alts[i].enhancedImageUrl + '\',\'' + alts[i].enhancedImageUrl + '\');" class="imageLink" onfocus="this.blur();">'
                + '<img width="50" height="50" onclick="javascript: jQuery(\'#zoom-content .flyoutZoom img\').attr(\'src\', \'' + alts[i].mainImageUrl + '\'); jQuery(\'#flyout-zoom img\').attr(\'src\', \'' + alts[i].enhancedImageUrl + '\');" alt="' + data.altText + '" name="altImgBorder_' + (i + 1) + '" src="' + alts[i].thumbImageUrl + '">'
            + '</a>'
            + '<br>'
        + '</div>';
        }
    }
    moreInfoStep.nextAll(".imgButtons").remove();
    if(!moreInfoStep.next('br').length)
        content += "<br clear='all' />";
    moreInfoStep.after(content);
	if(trus.quickshopProduct.swapImage)
        trus.quickshopProduct.swapImage(data.mainImageUrl, data.enhancedImageUrl, data.enhancedImageUrl);

    jQuery("#zoom-content .flyoutZoom img").attr("src", data.mainImageUrl);
    jQuery("#flyout-zoom img").attr("src", data.enhancedImageUrl);
	jQuery("#expressShop .imgButtons .imageLink").eq(0).addClass('altImgActive');
}

trus.quickshopProduct.selectIndex = function(sku) {
    //select the correct option
    var selected = sku.productId + "|" + sku.skuId;
    var select = jQuery("#dropDown > select");
    var options = select.children("option");
    options.each(function(i) {
        if(jQuery(this).val() == selected) {
            select.prop("selectedIndex", i);
            return false;
        }
    });	
}

trus.quickshopProduct.enableButton = function(el) {
    var img = "";
    var src = "";
    img = el.removeClass("disabled").find("img");
    src = img.attr("src");
    if(src) {
        src = src.replace("_disabled.gif", ".gif");
        img.attr("src", src);
    }
}

trus.quickshopProduct.disableButton = function(el) {
    var img = "";
    var src = "";
    img = el.addClass("disabled").find("img");
    src = img.attr("src");
    if(src) {
        if(src.indexOf("_disabled.gif") == -1)
            src = src.replace(".gif", "_disabled.gif");
        img.attr("src", src);
    }
}
/* END: Borrowing trus.product functions from product page javascript for quickshop functionality. */
function centerDiv(elem)
{
  if (parseInt(navigator.appVersion) > 3)
  {
    var winW = 0;
    var winH = 0;
    if (navigator.appName.indexOf("Microsoft")!=-1)
    {
        winW = document.body.offsetWidth;
        winH = document.body.offsetHeight;
    }
    else
    {
        winW = window.innerWidth;
        winH = window.innerHeight;
    }

    var expressShopDiv = elem;
    
    var scrOfX = 0;
    var scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' )
    {
      //Netscape compliant
      scrOfY = window.pageYOffset;
      scrOfX = window.pageXOffset;
    }
    else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) )
    {
      //DOM compliant
      scrOfY = document.body.scrollTop;
      scrOfX = document.body.scrollLeft;
    }
    else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) )
    {
      //IE6 standards compliant mode
      scrOfY = document.documentElement.scrollTop;
      scrOfX = document.documentElement.scrollLeft;
    }
    
    isIE = navigator.userAgent.indexOf("MSIE") > -1 
    if (isIE)
    {
      //IE specific
      scrOfY = document.documentElement.scrollTop;
      scrOfX = document.documentElement.scrollLeft;
    }

      // First bury expressShop div at a negative z-index so it won't show.
    // Then set display to "" in order to get an accurate offsetHeight value for the div.
    elem.style.zIndex="-100";
    elem.style.display="";
    leftMarginBegins = ((winW-expressShopDiv.offsetWidth)/2) + scrOfX;
    topMarginBegins = ((winH-expressShopDiv.offsetHeight)/2) + scrOfY;
	//topMarginBegins = 50;
    elem.style.left = leftMarginBegins + "px";
    elem.style.top = (scrOfY + 90) + "px";
  }
}

var xmlHttp;

function createXMLHttpRequest()
{
	if (window.ActiveXObject)
	{
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest)
	{
		xmlHttp = new XMLHttpRequest();
	}
}

var quickShopInit = false;
function showProductPopup(showThisProdID, cp, currentCategoryId, currentProduct, cid, qsSkuAvailFlag, qsSubStoreCode,qsSkuId,qsOrigin)
{
	
	if(typeof qsOrigin == "undefined")
        {
                qsOrigin = "";
        }
	createXMLHttpRequest();
	//reset variables	
	quickShopInit = true;
    if(typeof cid != "undefined"){
        cid = "&cid="+cid;
    }
    else{
        cid="";
    }
	var queryString2 = "../quickshop/index.jsp?productId="+showThisProdID+(typeof(cp) != "undefined" ? "&cp="+cp : '')+(typeof(currentCategoryId) != "undefined" ? "&currentCategoryId="+currentCategoryId : '')+(typeof(currentProduct) != "undefined" ? "&currentProduct="+currentProduct : '')+cid+(typeof(qsOrigin) != "undefined" ? "&qsOrigin="+qsOrigin : '') + ($('certonaFromProduct') ? '&fromProduct=true' : '');
	xmlHttp.onreadystatechange = function(){
		showExpressShop(showThisProdID,qsSkuAvailFlag,qsSubStoreCode,qsSkuId,qsOrigin);
	}
	xmlHttp.open("GET", queryString2, true);
	// setRequestHeader() is for Safari, so rapid xmlHttp requests don't logjam in the browser.
	xmlHttp.setRequestHeader('If-Modified-Since', 'Wed, 15 Nov 1995 00:00:00 GMT');
	xmlHttp.send(null);
}

function showExpressShop(showThisProdID,qsSkuAvailFlag,qsSubStoreCode,qsSkuId,qsOrigin)
{
	// Set the contents of the expressShop div to blank.
	// Set the contents of the expressShop div to blank.
    if(!jQuery("#expressShop").length)
        jQuery(document.body).prepend('<div id="expressShop" style="display:none;"></div>');
	document.getElementById("expressShop").innerHTML = "";
	if(xmlHttp.readyState == 4)
	{ 
		if(xmlHttp.status == 200)
		{
			document.getElementById("expressShop").innerHTML = xmlHttp.responseText;
                        document.getElementById("expressShop").style.zIndex=50;



			var arrayPageSize = getPageSize();
			document.getElementById("overlay").style.height = arrayPageSize[1] + 'px';			
			document.getElementById("overlay").style.display = "block";
			trus.quickshop.initQuickShopContents(showThisProdID,qsSkuAvailFlag,qsSubStoreCode,qsSkuId,qsOrigin);
		}
		else
		{
			alert("Unable to retrieve a response from the server.");
		}
	}
	centerDiv(document.getElementById("expressShop"));
	//declare and initialize arrays to determine if a given form element exists.
	var fwSearchArray = document.getElementsByName("fwSearch");	
	var brandFilterArray = document.getElementsByName("brandFilter");
	
	if (brandFilterArray.length > 0)
	{
		if (document.getElementsByName("fpricesort"))
		{
			document.brandFilter.fpricesort.style.visibility = "hidden";
		}
		if (document.getElementsByName("fbrandid"))
		{
			document.brandFilter.fbrandid.style.visibility = "hidden";
		}
		//modified the if condition for PS 53461
		if (document.brandFilter.fgender !=null)
		{
			document.brandFilter.fgender.style.visibility = "hidden";
		}
	}
	
	if (fwSearchArray.length > 0)
	{
		if (document.getElementsByName("fsize"))
		{
			document.fwSearch.fsize.style.visibility = "hidden";
		}
		if (document.getElementsByName("fpricesort"))
		{
			document.fwSearch.fpricesort.style.visibility = "hidden";
		}
	}
	// raise the expressShop div to a visible z-index after burying it in centerDiv().
	document.getElementById("expressShop").style.zIndex= "103";
}
function hideExpressShop()
{
	document.getElementById("expressShop").style.display="none";
	//declare and initialize arrays to determine if a given form element exists.
	var fwSearchArray = document.getElementsByName("fwSearch");
	var brandFilterArray = document.getElementsByName("brandFilter");
	
	if (brandFilterArray.length > 0)
	{
		if (document.getElementsByName("fpricesort"))
		{
			document.brandFilter.fpricesort.style.visibility = "visible";
		}
		//modified the if condition for PS 53461
		if (document.brandFilter.fgender !=null)
		{
			document.brandFilter.fgender.style.visibility = "visible";
		}
		if (document.getElementsByName("fbrandid"))
		{
			document.brandFilter.fbrandid.style.visibility = "visible";
		}
	}
	
	if (fwSearchArray.length > 0)
	{
		if (document.getElementsByName("fsize"))
		{
			document.fwSearch.fsize.style.visibility = "visible";
		}
		if (document.getElementsByName("fpricesort"))
		{
			document.fwSearch.fpricesort.style.visibility = "visible";
		}
	}
	grouping = 0;
	quickShopInit = false;
}
/*
	Lightbox JS: Fullsize Image Overlays 
	by Lokesh Dhakar - http://www.huddletogether.com
	For more information on this script, visit:
	http://huddletogether.com/projects/lightbox/
	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	(basically, do anything you want, just leave my name and link)
	Table of Contents
	-----------------
	Configuration
	Functions
	- getPageScroll()
	- getPageSize()
	- pause()
	- showLightbox()
	- hideLightbox()
	- initLightbox()
	- addLoadEvent()
	Function Calls
	- addLoadEvent(initLightbox)
*/
// Configuration



// getPageScroll() - Returns array with x,y page scroll values. Core code from - quirksmode.org
function getPageScroll()
{
	var yScroll;
	if (window.pageYOffset) {
		yScroll = window.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}
	arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}
// getPageSize() - Returns array with page width, height and window width, height. Core code from - quirksmode.org. Edit for Firefox by pHaez
function getPageSize()
{
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (window.innerHeight) {	// all except Explorer
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}
// pause(numberMillis) - Pauses code execution for specified time. Uses busy code, not good.
// Code from http://www.faqts.com/knowledge_base/view.phtml/aid/1602
function pause(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}
// Preloads images. Pleaces new image in lightbox then centers and displays.
function showLightbox(objLink)
{
	var objOverlay = document.getElementById('overlay');
	var objLightbox = document.getElementById('lightbox');
	var objCaption = document.getElementById('lightboxCaption');
	var objImage = document.getElementById('lightboxImage');

	var objLightboxDetails = document.getElementById('lightboxDetails');
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.style.display = 'block';
	if(objLink) {
	// preload image
	imgPreload = new Image();
	imgPreload.onload=function(){
		objImage.src = objLink.href;
		// center lightbox and make sure that the top and left values are not negative
		// and the image placed outside the viewport
		var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - imgPreload.height) / 2);
		var lightboxLeft = ((arrayPageSize[0] - 20 - imgPreload.width) / 2);
		objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
		objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";
		objLightboxDetails.style.width = imgPreload.width + 'px';
		if(objLink.getAttribute('title')){
			objCaption.style.display = 'block';
			//objCaption.style.width = imgPreload.width + 'px';
			objCaption.innerHTML = objLink.getAttribute('title');
		} else {
			objCaption.style.display = 'none';
		}
		// A small pause between the image loading and displaying is required with IE,
		// this prevents the previous image displaying for a short burst causing flicker.
		if (navigator.appVersion.indexOf("MSIE")!=-1){
			pause(250);
		} 

		selects = document.getElementsByTagName("select");
        for (i = 0; i != selects.length; i++) {
                selects[i].style.visibility = "hidden";
        }
		objLightbox.style.display = 'block';
		arrayPageSize = getPageSize();
		objOverlay.style.height = (arrayPageSize[1] + 'px');
		return false;
	}
	//imgPreload.src = objLink.href;
	}
}
function hideLightbox()
{	
	xmlHttp.abort();
	objOverlay = document.getElementById('overlay');
	objLightbox = document.getElementById('lightbox');
	if(objOverlay != null)
	objOverlay.style.display = 'none';
	if(objLightbox != null)
	objLightbox.style.display = 'none';
	// disable keypress listener
	document.onkeypress = '';
	quickShopInit = false;
    //jQuery("#expressShop #toShow a.addToCartLink").die("click");
}

function initLightbox()
{
	if (!document.getElementsByTagName){ return; }
	var anchors = document.getElementsByTagName("a");
	for (var i=0; i<anchors.length; i++){
		var anchor = anchors[i];
		if (anchor.getAttribute("href") && (anchor.getAttribute("rel") == "lightbox")){
			anchor.onclick = function () {showLightbox(this); return false;}
		}
	}
	var objBody = document.getElementsByTagName("body").item(0);
	var objOverlay = document.createElement("div");
	objOverlay.setAttribute('id','overlay');
	objOverlay.onclick = function () {hideLightbox();hideExpressShop(); return false;}
	objOverlay.style.display = 'none';
	objOverlay.style.position = 'absolute';
	objOverlay.style.top = '0';
	objOverlay.style.left = '0';
	objOverlay.style.zIndex = '9990';
 	objOverlay.style.width = '100%';
	objBody.insertBefore(objOverlay, objBody.firstChild);

	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();	
	var objLightbox = document.createElement("div");
	objLightbox.setAttribute('id','lightbox');
	objLightbox.style.display = 'none';
	objLightbox.style.position = 'absolute';
	objLightbox.style.zIndex = '100';	
	objBody.insertBefore(objLightbox, objOverlay.nextSibling);
	var objLink = document.createElement("a");
	objLink.setAttribute('href','#');
	objLink.setAttribute('title','Click to close');
	objLink.onclick = function () {hideLightbox(); return false;}
	objLightbox.appendChild(objLink);
	var objImage = document.createElement("img");
	objImage.setAttribute('id','lightboxImage');
	objLink.appendChild(objImage);
	var objLightboxDetails = document.createElement("div");
	objLightboxDetails.setAttribute('id','lightboxDetails');
	objLightbox.appendChild(objLightboxDetails);
	var objCaption = document.createElement("div");
	objCaption.setAttribute('id','lightboxCaption');
	objCaption.style.display = 'none';
	objLightboxDetails.appendChild(objCaption);
	var objKeyboardMsg = document.createElement("div");
	objKeyboardMsg.setAttribute('id','keyboardMsg');
	objKeyboardMsg.innerHTML = ' ';
	objLightboxDetails.appendChild(objKeyboardMsg);
}

function swapQuickShopImage(img) {
	var prodImg = jQuery("#expressShop #bubLyr1 img");
	prodImg[0].src = img;
}

function hideIAS()
{
	jQuery(".dialogHolder").css("display", "none");
	jQuery(".holder").css("display", "none");
	// disable keypress listener
	document.onkeypress = '';

}

function omnitureQuickShop(showThisProdID,qsSkuAvailFlag,qsSubStoreCode,qsSkuId,qsOrigin) {
	if(!jQuery.trim(qsSubStoreCode).length){
		if(jQuery('.BRU').length)	
			qsSubStoreCode = 'BRU';
		else
			qsSubStoreCode = 'TRU';
	}
	if (s != "undefined")
 	{ 
	var locale = (null != s.prop9)? s.prop9 : "en_US";
 	s.pageName = locale +': '+ qsSubStoreCode +': Quick Shop Product Detail';
	s.events ='prodView,event1,event58';
 	s.products = ';'+ showThisProdID +';;;;eVar32='+ (typeof(qs_previousPage) != "undefined" ? qs_previousPage : '')+'|eVar34='+(typeof(qsSkuId) != "undefined" ? qsSkuId : '');
        if(typeof isSearchPage != "undefined" && isSearchPage){
                var searchQS = 'Search Quick Shop';
				if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'prevLink')
                        searchQS = 'Quick Shop: Previous Navigation Button';
                else if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'nextLink')
                        searchQS = 'Quick Shop: Next Navigation Button';
		else if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'certona')
                        searchQS = 'Product Recommendation Quick Shop';
				if(isParamNav){
                if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'prevLink')
                        searchQS = 'Quick Shop: Previous Navigation Button';

                else if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'nextLink')
                        searchQS = 'Quick Shop: Next Navigation Button';
		else if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'certona')
			searchQS = 'Product Recommendation Quick Shop';
                else
                {
                        searchQS = 'Search Quick Shop';
                }
                }
                s.products += ' |eVar19='+ qsSubStoreCode + ': ' + searchQS;
        } else if (typeof isFamilyPage != "undefined" && isFamilyPage){
                var familyQS = 'Family Quick Shop';
				
                if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'prevLink')
                        familyQS = 'Quick Shop: Previous Navigation Button';
                else if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'nextLink')
                        familyQS = 'Quick Shop: Next Navigation Button';
		else if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'certona')
                        familyQS = 'Product Recommendation Quick Shop';
                else
                {
                        familyQS = 'Navigation Quick Shop';
                }
				
                s.products += ' |eVar19='+ qsSubStoreCode + ': ' + familyQS;

        }
	else
	{
		if(typeof qsOrigin != 'undefined' && qsOrigin != null && qsOrigin == 'certona')
                      var certonaQS = 'Product Recommendation Quick Shop';
		s.products += ' |eVar19='+ qsSubStoreCode + ': ' + certonaQS;
	}

	s.linkTrackVars="prop1,products";
	s.linkTrackEvents="prodView,event1,event58";
	
	if(typeof qsSkuAvailFlag != "undefined" && qsSkuAvailFlag){
		s.events += ',event23';
		s.linkTrackEvents += ",event23";
	}
	
 	s.prop1 = locale +': '+ qsSubStoreCode +': Quick Shop';
 	s.tl(null, 'o', null);
 	}
 }

 function submitQtyEnter(myfield,e){
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	if (keycode == 13){
			if(!flag1){
				return verifyFields('yes',$('qsOrderForm'));
			} else {
				if(jQuery(".addToBabyRegistry").length > 0){
					return addItemToRegistry('main',1);
				}
				else if(jQuery(".addToWishList").length > 0){
					return addItemToWislhist('1', 'main', true);
				}
			}
	   return false;
	}
	else
	   return true;
}

if(typeof(trus) == "undefined")
    var trus = {};
if(!trus.quickshop)
    trus.quickshop = {}

trus.quickshop.statusClasses = {
    'IN_STOCK'  : 'available',
    'RELEASE_DATED'  : 'available',
    'NOT_AVAILABLE'  : 'backordered',
    'OOS' : 'unavailable',
    'DNE' : 'unavailable'
};

trus.quickshop.resetMarkers = function() {
    jQuery("#colorSize > .color > .marker-container, #colorSize > .size > .marker-container").addClass("hidden").removeClass("missing");
}

trus.quickshop.showMarker = function() {
    var fields = jQuery("#colorSize > .color, #colorSize > .size");
    if(fields.length == 1)
        fields.find("#colorSize > .color > .marker-container, #colorSize > .size > .marker-container").addClass("missing");
    jQuery("#colorSize > .color > .marker-container.missing, #colorSize > .size > .marker-container.missing").removeClass("hidden");
}

trus.quickshop.resetMessaging = function() {
    jQuery("#eligibility li").addClass("hidden");
    jQuery("#middle-availability p").addClass("hidden");
    trus.quickshop.resetMarkers();
}

trus.quickshop.setMessaging = function(sku) {
	
    //if(sku.availability != "RELEASE_DATED") {
        if(sku.inStoreOnly) {
            jQuery("#eligibility .stock.unavailable-without-notification").removeClass("hidden");
            jQuery("#middle-availability .not-available").removeClass("hidden");
        } else {
            if(sku.availability == "OUT_OF_STOCK" || sku.availability == "NOT_AVAILABLE" || sku.availability == "ADVANCED_SALE_LIMITED" || sku.availability == "ADVANCED_SALE") {
                jQuery("#eligibility .stock.unavailable-with-notification").removeClass("hidden");
                if(sku.notify)
                    jQuery("#eligibility .stock.unavailable-with-notification > *").removeClass("hidden");
                else 
                    jQuery("#eligibility .stock.unavailable-with-notification > *").addClass("hidden");
                jQuery("#middle-availability .not-available").removeClass("hidden");
            } else {
                jQuery("#eligibility .stock.avail").removeClass("hidden");
            }
        }		
			if(sku.ISPUEligible) {
						if(sku.availability == "OUT_OF_STOCK" || sku.availability == "NOT_AVAILABLE" || sku.availability == "ADVANCED_SALE_LIMITED" || sku.availability == "ADVANCED_SALE") {
						jQuery("#eligibility .ispu-eligible.avail.out-of-stock").removeClass("hidden");
						jQuery("#middle-availability .not-available").removeClass("hidden");
					} else {
						jQuery("#eligibility .ispu-eligible.avail.in-stock").removeClass("hidden");
					}				
			
			} 
			else {
				 (hasCookie && myStoreEnabled == 'true' && sku.STSEligible ) ? "": jQuery("#eligibility .ispu-eligible.unavail").removeClass("hidden");//If SKU is not eligible for STS and ISPU then only show unavail messages as shown without myStore
				if(sku.notSoldInStores) {
					jQuery("#eligibility .sold-in-stores.unavail").removeClass("hidden");
				} else {
					jQuery("#eligibility .sold-in-stores.avail").removeClass("hidden");
				}
			}
			if(sku.STSEligible ){
	         
							jQuery('.sts-eligible.avail').removeClass('hidden');
						}
						else{
								jQuery('.sts-eligible.unavail').removeClass('hidden');
							}
					//}
				}

trus.quickshop.resetAdditionalInfo = function() {
    jQuery("#additionalInfo > .sknText").addClass("hidden").children(".value").html("&nbsp;");
    jQuery("#additionalInfo > .skuText").addClass("hidden").children(".value").html("&nbsp;");
    jQuery("#additionalInfo > .upc").addClass("hidden").children(".value").html("&nbsp;");
}

trus.quickshop.setAdditionalInfo = function(sku) {
    var sknTextValue = jQuery("#additionalInfo > .sknText").removeClass("hidden").children(".value").html("&nbsp;");
    if(sku.skn)
        sknTextValue.text(sku.skn);
    var skuTextValue = jQuery("#additionalInfo > .skuText").removeClass("hidden").children(".value").html("&nbsp;");
    if(sku.vendorSku)
        skuTextValue.text(sku.vendorSku);
    var upcValue = jQuery("#additionalInfo > .upc").removeClass("hidden").children(".value").html("&nbsp;");
    if(sku.upc)
        upcValue.text(sku.upc);
}

trus.quickshop.swapImages = function(data) {
    var alts = data.alternateViews;
    var moreInfoStep = jQuery("#moreInfoStep");
    totCount = alts.length;
    var content = "";
    if(alts.length) {
        content += '<div class="imgButtons" id="alternateViews">'
            + '<a href="javascript:trus.quickshopProduct.swapImage(\'' + data.mainImageUrl + '\',\'' + data.enhancedImageUrl + '\',\'' + data.enhancedImageUrl + '\');" class="imageLink" onfocus="this.blur();">'
                + '<img width="50" height="50"  onclick="javascript: jQuery(\'#zoom-content .flyoutZoom img\').attr(\'src\', \'' + data.mainImageUrl + '\'); jQuery(\'#flyout-zoom img\').attr(\'src\', \'' + data.enhancedImageUrl + '\');" alt="' + data.altText + '" name="altImgBorder_0" src="' + data.thumbImageUrl + '">'
            + '</a>'
            + '<br>'
        + '</div>';
        for(i = 0; i < alts.length; ++i) {
            content += '<div id="alternateViews" class="imgButtons">'
            + '<a href="javascript:trus.quickshopProduct.swapImage(\'' + alts[i].mainImageUrl + '\',\'' + alts[i].enhancedImageUrl + '\',\'' + alts[i].enhancedImageUrl + '\');" class="imageLink" onfocus="this.blur();">'
                + '<img width="50" height="50" onclick="javascript: jQuery(\'#zoom-content .flyoutZoom img\').attr(\'src\', \'' + alts[i].mainImageUrl + '\'); jQuery(\'#flyout-zoom img\').attr(\'src\', \'' + alts[i].enhancedImageUrl + '\');" alt="' + data.altText + '" name="altImgBorder_' + (i + 1) + '" src="' + alts[i].thumbImageUrl + '">'
            + '</a>'
            + '<br>'
        + '</div>';
        }
    }
    moreInfoStep.nextAll(".imgButtons").remove();
    if(!moreInfoStep.next('br').length)
        content += "<br clear='all' />";
    moreInfoStep.after(content);
    if(trus.quickshopProduct.swapImage)
        trus.quickshopProduct.swapImage(data.mainImageUrl, data.enhancedImageUrl, data.enhancedImageUrl);

    jQuery("#zoom-content .flyoutZoom img").attr("src", data.mainImageUrl);
    jQuery("#flyout-zoom img").attr("src", data.enhancedImageUrl);
	jQuery("#expressShop .imgButtons .imageLink").eq(0).addClass('altImgActive');
}

trus.quickshop.selectIndex = function(sku) {
    //select the correct option
    var selected = sku.productId + "|" + sku.skuId;
    var select = jQuery("#dropDown > select");
    var options = select.children("option");
    options.each(function(i) {
        if(jQuery(this).val() == selected) {
            select.prop("selectedIndex", i);
            return false;
        }
    });
}

trus.quickshop.enableButton = function(el) {
    var a = "";
    var src = "";
    a = el.removeClass("disabled").find("a");
    src = a.attr("class");
    if(src) {
        src = src.replace("_addTo_disabled", "_addTo");
        a.attr("class", src);
    }
}

trus.quickshop.disableButton = function(el) {
    var a = "";
    var src = "";
    a = el.addClass("disabled").find("a");
    src = a.attr("class");
    if(src) {
        if(src.indexOf("_addTo") == -1)
            src = src.replace("_addTo", "_addTo_disabled");
        a.attr("class", src);
    }
}

//override size chart open
trus.quickshopProduct.showSizeChart = function(src) {
    jQuery("#socialBookmarking").hide();
    if(this.sizeChartBox === undefined) {
        jQuery("#sizechartimg").attr("src", src);
        this.modalBox = new Df.Modal();
		trus.createModal(this.modalBox);
        this.modalBox.setDomNode($('sizechart_container'));
    }
	jQuery(".qs .dialogHolder").css({
		"position": "absolute",
		"top": jQuery(window).scrollTop()
	});
    this.modalBox.show();
}

// override size chart close
trus.quickshopProduct.hideSizeChart = function() {
    this.modalBox.hide();
    jQuery("body > .holder").hide();
    jQuery("#socialBookmarking").show();
}

trus.quickshop.initColorSize = function() {
    if(jQuery("#expressShop #colorSize").length) {
        trus.quickshop.selectedSku = {}; 
        var select = jQuery("#dropDown > select");
        select.prop("selectedIndex", 0);
        if(jQuery("#expressShop #colorSize > .color,#expressShop #colorSize > .size").length == 1) {
            var select = jQuery("#dropDown > select");
            select.prop("selectedIndex", 0);
            jQuery("#eligibility .select-color-size,#expressShop #middle-availability .select-color-size").addClass("hidden");
            if(jQuery("#expressShop #colorSize > .color").length)
                jQuery("#expressShop #eligibility .select-color,#expressShop #middle-availability .select-color").removeClass("hidden");
            else
                jQuery("#eligibility .select-size,#expressShop #middle-availability .select-size").removeClass("hidden");
            //for each li, find the sku and map to json
            var lis = jQuery("#expressShop #colorSize > .color > ul > li,#expressShop #colorSize > .size > ul > li").filter('[class!=size-chart]');
            lis.each(function(i, el) {
                var e = jQuery(el);
                var match = el.className.match(/sku_\d+/);
                var sku = "";
                var skuId = "";
                if(match) {
                    sku = match[0];
                    skuId = sku.match(/\d+/)[0];
                }				
                var skuData = quickShop.productJSON.skus[sku];
                e.data('skuId', skuId);
                e.data('skuData', skuData);
                if(typeof(trus.quickshop.statusClasses[skuData.availability]) != "undefined")
                    e.addClass(trus.quickshop.statusClasses[skuData.availability]);
                
            });

            jQuery('#expressShop').delegate("#colorSize .color > ul > li > a, #colorSize .size > ul > li > a", "mousedown", function() {
                e = jQuery(this).closest('li');
                lis.removeClass("selected");
                e.addClass("selected");
                if(jQuery("#expressShop #colorSize > .color").length && jQuery(this).closest('li').data("skuData"))
                    jQuery('#expressShop #selected-color-desc').html(jQuery(this).closest('li').data("skuData").color);
				else if (jQuery(this).closest('li').data("skuData"))
                    jQuery('#expressShop #selected-size-desc').html(jQuery(this).closest('li').data("skuData").size);

                trus.quickshop.resetMessaging();
                var skuData = e.data("skuData");
                trus.quickshop.setMessaging(skuData);
                trus.quickshop.setAdditionalInfo(skuData);

                trus.quickshop.selectIndex(skuData);

                trus.quickshop.disableButton(jQuery("#toShow"));

                if(skuData.cartable) {
                    trus.quickshop.enableButton(jQuery("#toShow"));
                }
                trus.quickshop.enableButton(jQuery("#addToRegistry"));
                trus.quickshop.enableButton(jQuery("#addToWishList"));

                if(jQuery("#colorSize > .color").length)
                    trus.quickshop.swapImages(skuData);

                trus.quickshop.selectedSku = skuData;
            });
        }
        else {
            jQuery("#qsOrderForm").matcher({
                statusField : 'availability',
                onMatch : function(sku){
                    trus.quickshop.resetMessaging();

                    trus.quickshop.setMessaging(sku);
                    trus.quickshop.setAdditionalInfo(sku);

                    trus.quickshop.selectIndex(sku);

                    trus.quickshop.disableButton(jQuery("#toShow"));
                
                    if(sku.cartable) {
                        trus.quickshop.enableButton(jQuery("#toShow"));
                    }
                    trus.quickshop.enableButton(jQuery("#addToRegistry"));
                    trus.quickshop.enableButton(jQuery("#addToWishList"));
                    trus.quickshop.selectedSku = sku;
                },
                onMismatch : function(missing){
                    trus.quickshop.resetMessaging();
                    trus.quickshop.resetAdditionalInfo();
                    var select = jQuery("#dropDown > select");
                    select.prop("selectedIndex", 0);
                    if(missing.length) {
                        //if only one selected
                        jQuery('#selected-' + missing + '-desc').html("");
                        jQuery("#eligibility .select-" + missing + ", #middle-availability .select-" + missing).removeClass("hidden");
                        jQuery("#colorSize > ." + missing + " > .marker-container").addClass("missing");
                    } else {
                        //if two selected but mismatch
                        jQuery("#eligibility .dne, #middle-availability .dne").removeClass("hidden");
                        jQuery("#colorSize > .color > .marker-container, #colorSize > .size > .marker-container").addClass("missing");
                    }
                    trus.quickshop.disableButton(jQuery("#toShow"));
                    //trus.quickshop.disableButton(jQuery("#addToRegistry"));
                    //trus.quickshop.disableButton(jQuery("#addToWishList"));
                    trus.quickshop.selectedSku = {};
                },
                onSense : function(field, value, sku, allOthersSelected) {
                },
                onUnsense : function() {
                },
	            sizeChange : function(value){
	                jQuery('#selected-size-desc').html(value);
	            },
	            colorChange : function(index, data, initializing){
	                jQuery('#selected-color-desc').html(data.displayDescription);
	                trus.quickshop.swapImages(data);
	            },
                fieldsJSONIndex : {
                    'color' : false,   // means you should use the index as id
                    'size'  : 'sizeId' // use this field as an id
                },
	            'statusDefault' : 'DNE',
	                fieldsDefault : {  },
	                fieldsDefaultMap : { 'color' : 'alternateViews->main->main' },
	            'selectableAbove' : 50,
	            'previewableAbove': 0,
	                'statusRanks'   : {
	                'IN_STOCK' : 100,
                    'RELEASE_DATED' : 100,
	                'NOT_AVAILABLE' : 99,
	                'OOS' : 1,
	                'DNE' : 0
	            },
	            'statusClasses': trus.quickshop.statusClasses,
	            'enableSensing'   : true,
	            'sensingClasses': {
	                'IN_STOCK'  : 'peek-available',
                    'RELEASE_DATED'  : 'peek-available', 
	                'NOT_AVAILABLE'  : 'peek-backordered',
	                'OOS' : 'peek-unavailable',
	                'DNE' : 'peek-unavailable'
	            },
                json : quickShop.productJSON
            });
        }

        if(quickShop.productJSON.selectedSku) {
            jQuery("#colorSize > .color > ul > li.sku_" + quickShop.productJSON.selectedSku + " > a > label").mousedown();
            jQuery("#colorSize > .size > ul > li.sku_" + quickShop.productJSON.selectedSku + " > a > label").mousedown();
        } else if(quickShop.productJSON.selectedCid) {
            jQuery("#colorSize > .color > ul > li.cid_" + quickShop.productJSON.selectedCid + " > a > label").mousedown();
        }

        //check for only one slice available and select
        if(jQuery("#colorSize > .color > ul > li").length == 1)
            jQuery("#colorSize > .color > ul > li").mousedown();
        if(jQuery("#colorSize > .size > ul > li").length == 1)
            jQuery("#colorSize > .size > ul > li").mousedown();

        //tooltips
        jQuery("#toShow, #addToRegistry, #addToWishList").hover(function() {
            var $this = jQuery(this);
            if($this.hasClass("disabled"))
                $this.children(".disabled-tip-container").show();
        }, function() {
            jQuery(this).children(".disabled-tip-container").hide();
        });
    }

}

trus.quickshop.initQuickShopContents = function(showThisProdID,qsSkuAvailFlag,qsSubStoreCode,qsSkuId,qsOrigin) {
	/* Quick Shop event listeners */
	// Tab switching
	jQuery("a[data-productid = '']").hide();
	jQuery("#expressShop .qstabset .qs-tab a").on("click", function() {
		jQuery("#expressShop .qs-tab").removeClass("qs-tab-active");
		jQuery("#expressShop .tabControl").removeClass("qs-tab-content-active");
		var tabNum = jQuery("#expressShop .qs-tab a").index(this);
		var qsTab = jQuery("#expressShop .qs-tab");
		qsTab[tabNum].className += " qs-tab-active";
		var qsTabContent = jQuery("#expressShop .tabControl");
		qsTabContent[tabNum].className += " qs-tab-content-active";
	});

	// Add to Cart button functionality
	/*jQuery("#expressShop #toShow a.addToCartLink").on("click", function() {
		if (!jQuery("#expressShop #toShow").hasClass("disabled")) {
			if(trus && trus.quickshopProduct && trus.quickshopProduct.selectedSku) { 
				if(trus.quickshopProduct.selectedSku.cartable) {
					verifyFields('yes',$('qsOrderForm')); 
                    jQuery("#expressShop #toShow a.addToCartLink").die("click");
				} else {
					trus.quickshopProduct.showMarker(); 
				}
			} else {
				verifyFields('yes',$('qsOrderForm'));
                jQuery("#expressShop #toShow a.addToCartLink").die("click");
			}
		} else {
			trus.quickshopProduct.showMarker(); 
		}
	});*/

	// Alternate image highlighting
	jQuery("#expressShop .imageLink").on("click", function() {
		jQuery("#expressShop .altImgActive").removeClass("altImgActive");
		this.className += " altImgActive";
	});

	// Carry over of color swatch and size (sku) information when going to product detail page
    jQuery("#expressShop #qsh1 a, #expressShop #bubLyr1 a, #expressShop #qsproddetail a, #expressShop #select-store-link").on('click',function(){
        var quickCID = jQuery('#expressShop #colorSize .color li.selected').data('color');
        if (typeof trus.quickshop.selectedSku != "undefined" && typeof trus.quickshop.selectedSku.skuId != "undefined") {
        	// Include sku if available for both size and color
	        this.href += "&skuid="+ trus.quickshop.selectedSku.skuId;
	    } else if(typeof quickCID!= "undefined") { 
	    	// if skus are available just on just color level
        	this.href += "&cid="+ quickCID;
        }
    });

    jQuery('#qsOrderForm').on('submit',function(){
		if(document.getElementById('launchStore') != null){
			return false;
		}
		else{
			return true;
		}
	});

    jQuery("#expressShop #addToRegistry .addToRegistryLink").on("click", function() {
	
        if (!jQuery("#expressShop #addToRegistry").hasClass("disabled")) {
			addItemToRegistry('main', 1);
            jQuery(".qs .dialogHolder").css({
                "position" : "absolute",
                "top": jQuery("#expressShop").css("top")
            });
		
		  jQuery('.dialogHolder .returnToProductPage_tru_img').on('click',function(){	// close Low Inventory lightbox
			hideIAS()
		  })

            return false;
        } else {
            trus.quickshopProduct.showMarker(); 
        }
    });
    jQuery(document).off().on("click", "#expressShop #addToWishList .addToWishListLink", function() {
        if (!jQuery("#expressShop #addToWishList").hasClass("disabled")) {
            addItemToWislhist('1', 'main', true);
			window.scrollTo(0,0);
        } else {
            trus.quickshopProduct.showMarker(); 
        }
    });


	//Quickshop Prev-Next functionality
    jQuery('#body').delegate('.prev-next-link','click',function(){
		 var  pid = jQuery(this).find('a').data('productid').toString();
                hideExpressShop();
                hideLightbox();
                if(pid.length){
                        if(jQuery(this).hasClass('prev')){
								Omni_Quickshop_PrevLink();
                                jQuery('.expressShopButtonGlobal[data-productid='+pid+']').data('origin','prevLink');			
                        }
                        else{
								Omni_Quickshop_NextLink();
                                jQuery('.expressShopButtonGlobal[data-productid='+pid+']').data('origin','nextLink');
                        }
                        jQuery('.expressShopButtonGlobal[data-productid='+pid+']').trigger('click');
                        jQuery('.expressShopButtonGlobal[data-productid='+pid+']').removeData('origin');
                }
                return false;

    });
	jQuery('#body').delegate('.prev-next-link','mouseenter',function(){
		jQuery(this).find('.disabled-tip-container').show();
	});
	jQuery('#body').delegate('.prev-next-link','mouseleave',function(){
		jQuery(this).find('.disabled-tip-container').hide();
	});




    /* QuickShop DOM Manipulation */
	jQuery("#expressShop .imgButtons img").removeAttr("onclick");
	var productPageLink = jQuery("#expressShop #qsproddetail a").attr('href');
	var productImgLink = jQuery("#bubLyr1 a");
	productImgLink.attr('href',productPageLink);

	jQuery("#expressShop #alternateViews table").remove();

	jQuery("#expressShop .qs-tab:first").addClass("qs-tab-active");
	jQuery("#expressShop .tabControl:first").addClass("qs-tab-content-active");

	if (jQuery("#expressShop .data-pass.productJSON").length > 0) {
		var productJSON = jQuery(".data-pass.productJSON");
		quickShop.productJSON = eval("(" + productJSON.text() + ")");
		jQuery("#expressShop .data-pass.productJSON").remove();
        trus.quickshop.initColorSize();
	}
	
	if (jQuery(".optionEqualSize").length > 0) {
		equalOptionHeight(jQuery('.optionEqualSize'));
	}

	if(typeof quickShop.productJSON != "undefined"){
		for(v in quickShop.productJSON.skus)
		{
			if(quickShop.productJSON.skus[v].availability =="OUT_OF_STOCK" || quickShop.productJSON.skus[v].availability =="NOT_AVAILABLE"){
				qsSkuAvailFlag = true;
			}
		}
	}
	var tabControlHeight = 137;
	var currTabControlHeight = 0;
	jQuery("#expressShop .tabControl").each(function() {
		// If the details tab content is taller than the description, set that as new height for both.  Otherwise, use description height for both.
		currTabControlHeight = jQuery(this).height();
		if (this.id == "tab1" && currTabControlHeight > tabControlHeight) {
			tabControlHeight = currTabControlHeight;
		}
	});
	jQuery("#expressShop .tabControl").height(tabControlHeight + "px");
	jQuery ("#expressShop #tab2 .qs-tab-content").height((tabControlHeight-7) + "px");
	if (jQuery("#expressShop #qty").length < 1) {
    	jQuery("#expressShop #middle-availability").attr("class","qty-disabled"); 
    }

    var descriptionText = jQuery("#expressShop .qs-tab-content-description .qs-tab-content").text();
    if (descriptionText == "Product Description" || descriptionText.length == 0) {
    	/* If there is no description text or it just says "Product Description" label, hide description tab */
    	jQuery("#expressShop #qs-tab-description").hide();
    }
	
	omnitureQuickShop(showThisProdID,qsSkuAvailFlag,qsSubStoreCode,qsSkuId,qsOrigin);

	//Layaway Omniture Method Calls
	if(jQuery('.lwyLocationProdCheck').length > 0){
		jQuery('.lwyLocationProdCheck').click(function(){
			Lywy_Not_Available_LOC_QSPDP();
		});
	}
	
	//Layaway Omniture Method Calls
	if(jQuery('.lwyProdNotAvailable').length > 0){
		jQuery('.lwyProdNotAvailable').click(function(){
			Not_Eligible_Lywy_QSPDP();
		});
	}
	
	//Layaway Omniture Method Calls
	if(jQuery('.layawayButton').length > 0){
		jQuery('.layawayButton').click(function(){
			Add_Layaway_QS_PDP();
		});
	}
	
	//Layaway Omniture Method Calls
	if(jQuery('.howLwyWorks').length > 0){
		jQuery('.howLwyWorks').click(function(){
			How_Layaway_Works_QSPDP();
		});
	}
}

if(!trus.quickshopProduct.swapImage){
	trus.quickshopProduct.swapImage = function(REGPath,ENHPath,RAMPath) {
		thisProdShot = $('qsOrderForm').prodShot_0;
		if (ENHPath != "" && RAMPath != "") {
			thisProdShot.src = REGPath;
			if($('qsOrderForm').enh_0)
				$('qsOrderForm').enh_0.value = ENHPath;
			if($('qsOrderForm').ram_0)
				$('qsOrderForm').ram_0.value = RAMPath;
		}
	}
}

//Visitor clicks on the ‘Next Arrow’ link from the Quickshop Overlay
function Omni_Quickshop_PrevLink()
{              
                var s_account='gsictrustgf';
                s.prop10='USD';
                s.prop9 = 'en_US';
                s.prop11='US';
                s.events = 'event24';
                if(s.events.indexOf('event24') < 0)
                {
                                if(s.events.length == 0)
                                {
                                                s.events ='event24';                                       
                                }
                                else if(s.events.length > 0)
                                {
                                                s.events += ",event24";
                                }                              
                }
                s.eVar28 = 'Quick Shop: Previous Product';
                s.linkTrackVars = "prop1,prop9,prop11,eVar28";
                s.linkTrackEvents='event24';
                s.tl(null, 'o', null);
}

//Visitor clicks on the ‘Next Arrow’ link from the Quickshop Overlay
function Omni_Quickshop_NextLink()
{              
                var s_account='gsictrustgf';
                s.prop10='USD';
                s.prop9 = 'en_US';
                s.prop11='US';
                s.events = 'event24';
                if(s.events.indexOf('event24') < 0)
                {
                                if(s.events.length == 0)
                                {
                                                s.events ='event24';                                       
                                }
                                else if(s.events.length > 0)
                                {
                                                s.events += ",event24";
                                }                              
                }
                s.eVar28 = 'Quick Shop: Next Product';
                s.linkTrackVars = "prop1,prop9,prop11,eVar28";
                s.linkTrackEvents='event24';
                s.tl(null, 'o', null);
}










//Visitor clicks on the ‘Next Arrow’ link from the Quickshop Overlay
function Omni_Quickshop_PrevLink()
{              
                var s_account='gsictrustgf';
                s.prop10='USD';
                s.prop9 = 'en_US';
                s.prop11='US';
                s.events = 'event24';
                if(s.events.indexOf('event24') < 0)
                {
                                if(s.events.length == 0)
                                {
                                                s.events ='event24';                                       
                                }
                                else if(s.events.length > 0)
                                {
                                                s.events += ",event24";
                                }                              
                }
                s.eVar28 = 'Quick Shop: Previous Product';
                s.linkTrackVars = "prop1,prop9,prop11,eVar28";
                s.linkTrackEvents='event24';
                s.tl(null, 'o', null);
}

//Visitor clicks on the ‘Next Arrow’ link from the Quickshop Overlay
function Omni_Quickshop_NextLink()
{              
                var s_account='gsictrustgf';
                s.prop10='USD';
                s.prop9 = 'en_US';
                s.prop11='US';
                s.events = 'event24';
                if(s.events.indexOf('event24') < 0)
                {
                                if(s.events.length == 0)
                                {
                                                s.events ='event24';                                       
                                }
                                else if(s.events.length > 0)
                                {
                                                s.events += ",event24";
                                }                              
                }
                s.eVar28 = 'Quick Shop: Next Product';
                s.linkTrackVars = "prop1,prop9,prop11,eVar28";
                s.linkTrackEvents='event24';
                s.tl(null, 'o', null);
}




/* To run on page load */

var quickShopLoad = function() {
    // Quick Shop button functionality from product loop
    jQuery(".expressShopButtonGlobal").on("click", function() {
		initLightbox(); 
		if(jQuery(this).closest('.certona-active').length)
            		jQuery(this).data('origin','certona');
showProductPopup(jQuery(this).data("productid"),jQuery(this).data("coremetricscp"),jQuery(this).data("categoryid"),jQuery(this).data("index"),jQuery(this).closest('.prodloop_cont').find('.swatch.selected').attr('id'),jQuery(this).data("singlesku"),jQuery(this).data("qssubstore"),jQuery(this).data("skuid"),jQuery(this).data('origin'));
		//jQuery.getScript('../quickshop/js/quickShopInclude.js',function(data){}); 
		//commented out above code and replaced with below one to get cached js file (singhd2)
		jQuery.ajax({
			url: '../quickshop/js/quickShopInclude.js',
			dataType: "script",
			cache:true,
			success: function(data){}
		});	
	});

	// Listener for QuickShop close button
	jQuery("body").on("click", "#iasClose", function() {
		hideExpressShop();
		hideLightbox();
	});

    if  (!(/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent)) {
 		document.getElementsByTagName("body")[0].className += " qs";
	}

	jQuery(".prodloop_cont .ispu_details").removeAttr("onmouseover").removeAttr("onmouseout");

    //Layaway button tooltips
    jQuery("#expressShop").delegate(".layaway .hover-container", "mouseenter", function() {
        jQuery(this).children(".tip-container").show();
    }).delegate(".layaway .hover-container", "mouseleave", function() {
        jQuery(this).children(".tip-container").hide();
    });

	jQuery("a[data-productid = '']").hide();
}

if(window.attachEvent)
    window.attachEvent('onload', quickShopLoad);
else
    window.addEventListener('load', quickShopLoad);

// This is bad but we dont have any other way	
function equalOptionHeight(group) {
	group.find('label').height('auto');
	group.height('auto');
	var tallest = 0;
	group.each(function() {
		var thisHeight = jQuery(this).find('label').height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}

// Regular checkout for QS when concealment is off
jQuery('html').off('click', '#expressShop #toShow a.qsAddToCart').on('click', '#expressShop #toShow a.qsAddToCart', function() {
		addToCartFromQS();
	});

// Add to cart through QS
function addToCartFromQS(){
	if (!jQuery("#expressShop #toShow").hasClass("disabled")) {
			if(trus && trus.quickshopProduct && trus.quickshopProduct.selectedSku) { 
				if(trus.quickshopProduct.selectedSku.cartable) {
					verifyFields('yes',$('qsOrderForm')); 
                    //jQuery("#expressShop #toShow a.addToCartLink").die("click");
				} else {
					trus.quickshopProduct.showMarker(); 
				}
			} else {
				verifyFields('yes',$('qsOrderForm'));
                //jQuery("#expressShop #toShow a.addToCartLink").die("click");
			}
		} else {
			trus.quickshopProduct.showMarker(); 
		}
}
