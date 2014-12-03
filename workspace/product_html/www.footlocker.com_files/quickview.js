/* QuickView v 0.1		 										*/
/* CONFIG: 														*/
/* you can also overwrite this value after including this js 	*/

// Path to QuickView
//var global_quickViewPath = "/quickview/";
// Path to QuickView Button
//var global_quickViewButtonPath = global_quickViewPath + "images/quickview.gif";
// Path to QuickView PDP Template
//var global_quickViewPDPTemplatePath = "/catalog/quickView.cfm";
// Path to QuickView Zoom Image Template
//var global_quickViewZoomImagePath = "/catalog/quickViewZoomImage.cfm";
// Flag for URLRewrite (i.e. /sku--123/model--abc/)
//var global_quickViewUseURLRewrite = false;
// Bottom margin for QuickView Button
var global_quickViewButtonBottomMargin = 10;
// Width of QuickView Panel
var global_quickViewWidth = 520;
var qvImgObject;
/********************************/
/* DO NOT MODIFY CODE BELOW     */
/********************************/

// preload button image so that it would be ready at the time we calculate the height
var global_quickviewButtonImage = new Image();
global_quickviewButtonImage.src = global_quickViewButtonPath;

// set mouseenter/mouseleave event to quickviewEnabled class elements
$(document).ready(function() {
	initializeQuickview();
});

function initializeQuickview() {
	$(".quickViewButtonWrap").unbind();

	$("a.quickviewEnabled").each(function() {
		var URLString = $(this).attr("href");
		URLString = $.trim(URLString);
		
		var wrap = '<span class="quickViewButtonWrap"></span>';
		$(this).wrap(wrap);
		var parentWrap = $(this).parent("span.quickViewButtonWrap");
				
		$(this).removeClass("quickviewEnabled");
		
		var tags = '<a href="javascript:void(0);" title="Open Quick View" class="quickviewButton button" data-btntype="quickview" data-btnname="searchResults_quickview" onmousedown="openQuickViewWithURL(\'' + URLString + '\');"><span></span></a>';

		parentWrap.prepend(tags);
		if(isTouchDevice()){
			//add two extra breaks to display QV button separately from image
			parentWrap.find('br').after("<br />").after("<br />");
		}
		
		qvImgObject = $("img", this);
		
	});

	if(isTouchDevice() && $(".quickViewButtonWrap").length > 0){
		var width = qvImgObject.width();
		var marginTop = (qvImgObject.height() - global_quickviewButtonImage.height - global_quickViewButtonBottomMargin)+25;
		$(".quickviewButton").css({"width": width, "margin-top": marginTop, "display": "inline"});
	}

	else{
		$("span.quickViewButtonWrap").bind("mouseenter", function() {
		// calculate width and top margin for the button
		var width = qvImgObject.width();
		var marginTop = qvImgObject.height() - global_quickviewButtonImage.height - global_quickViewButtonBottomMargin;
		$(this).children(".quickviewButton").css({"width": width, "margin-top": marginTop, "display": "inline"});
	}).bind("mouseleave", function() {
		$(this).children(".quickviewButton").css("display", "none");
	})
	}
}

function stopPropagationHandler(e) {
	e.stopPropagation();
}

function openQuickView(queryString) {
	closeQuickView();

	if ($.browser.msie && $.browser.version == "6.0")
		$("select").css("visibility", "hidden");

	var tags = '<div id="quickview"><div id="quickview_top"><div id="quickview_topRight"></div></div><div id="quickview_middle"><div id="quickview_middleRight"><div id="quickviewLoading"></div><div id="quickviewContent"></div><div style="clear: both"></div></div></div><div id="quickview_bottom"><div id="quickview_bottomRight"><a href="javascript:closeQuickView()" title="Close Quick View"><span class="red">x</span> ' + RBM.quickView.button.close + '</a></div></div></div>';
	$("body").prepend(tags);
	$("#quickviewLoading").css("display", "block");	
	var bodyWidth = $("body").width();
	var leftOffset = (bodyWidth - global_quickViewWidth) / 2;
	var topOffset = getViewpointTop() + ((getViewpointHeight() - $("#quickview").height()) / 2);
	$("#quickview").css({ left: leftOffset, top: topOffset, width: global_quickViewWidth });

	$("#quickviewContent").load(global_quickViewPDPTemplatePath,
		queryString,
		function (responseText, textStatus, XMLHttpRequest) {
			$("#quickviewLoading").css("display", "none");
			if (textStatus != "success") {
				$("#quickview").remove();
				// for debugging
				$("body").html(responseText);
				alert("There was problem loading Quick View for this product. Please try back again later.");
			}
			else {
				var topOffset = getViewpointTop() + ((getViewpointHeight() - $("#quickview").height()) / 2);
				$("#quickview").animate({top: topOffset}, function() {
					if (typeof(quickviewCallbackFunction) == "function")
						quickviewCallbackFunction();
						
						/* workaround to avoid click-through links under quickview in ie */
						var quickviewContentBackground = '<div id="quickviewContentBackground"></div>';
						$("body").prepend(quickviewContentBackground);
						var width = $("#quickviewContent").width();
						var height = $("#quickviewContent").height();
						var offset = $("#quickviewContent").offset();
						var left = offset.left;
						var top = offset.top;
						$("#quickviewContentBackground").css({left: left, top: top, width: width, height: height});
						
						Tipped.create("#quickview_excludedMessage .info_icon", excludedDetailMessage, { skin: 'tiny', showOn: ['click', 'mouseover'], maxWidth: fitToViewport(350), closeButton: isTouchDevice() });
						$("#quickview_excludedMessage .info_icon").attr("title", RBM.common.text.excludedFromDiscountInfoI);

						Tipped.create("#quickview_freeShipping .info_icon", global_quickViewFreeStandardShippingDetails, { skin: 'tiny', showOn: ['click', 'mouseover'], maxWidth: fitToViewport(350), closeButton: isTouchDevice() });
						$("#quickview_freeShipping .info_icon").attr("title", RBM.common.text.freeShippingInfoI);

						Tipped.create("#QVpdp_maskPurchasePrice .info_icon", global_quickViewMaskPurchasePriceDetails, { skin: 'tiny', showOn: ['click', 'mouseover'], maxWidth: fitToViewport(350), closeButton: isTouchDevice() });
						$("#QVpdp_maskPurchasePrice .info_icon").attr("title", RBM.common.text.maskedPricingInfoI);
						
						$('#quickview').click(stopPropagationHandler);
						$('#quickviewContentBackground').click(stopPropagationHandler);

						quickViewBindBackgroundClose();
					}
				);
			}
		}
	);
}

function openQuickViewWithURL(URLString) {
	var queryString = getQueryStringFromURL(URLString);

	if (queryString == null) {
		queryString = getQueryStringFromURLForURLReWrite(URLString);
	}

	if (queryString == null) {
		queryString = getQueryStringFromURLForURLReWriteII(URLString);
	}	
		
	// Grab the coreMetricsDo flag from the 'coremetricsFlag' div in getrows.cfm
	if ($("#coremetricsFlag").length > 0){
		var coremetricsDo   = $("#coremetricsFlag").html().split("=")[0];
		var flag = $("#coremetricsFlag").html().split("=")[1];
		queryString[coremetricsDo] = flag;
	}
	
	
	openQuickView(queryString);	
}

function closeQuickView() {
	if ($.browser.msie && $.browser.version == "6.0")
		$("select").css("visibility", "visible");
	
	if ((typeof(BORISEnabled) != "undefined") && BORISEnabled) {
		//if (typeof(bubble) != "undefined") {
		//	bubble.close();
		//}
		if (typeof(modal) != "undefined" && $.modal.data.isOpen) {
			return;
		}
	}
	
	$("#quickview").remove();
	$("#quickviewContentBackground").remove();
	
	$('#quickview').unbind('click',stopPropagationHandler);
	$('#quickviewContentBackground').unbind('click',stopPropagationHandler);
	quickViewUnbindBackgroundClose();
	//$(document).unbind('click',closeQuickView);	
}

function quickViewBindBackgroundClose(){
	if($("#quickview").length != 0){
		try{
			//$(document).click(closeQuickView);
			$("#quickviewContentBackground").click(closeQuickView);
		} catch (e)  {}
	}
}	

function quickViewUnbindBackgroundClose(){
	if($("#quickview").length != 0){
		try {
			//$(document).unbind('click',closeQuickView);	
			$("#quickviewContentBackground").unbind('click',closeQuickView);	
		} catch (e) {}
	}
}

function closeQuickViewWithFade() {
	$("#quickview").fadeOut(function() {
		closeQuickView();
	});
}
function closeQuickViewWithFadeBORIS() {
	$("#quickview").fadeOut(function() {
		$.modal.close();
		closeQuickView();		
	});
}


function quickViewZoom(args) {
	$("#quickviewContent").css("display", "none");	
	$("#quickviewLoading").css("display", "block");	
	$.post(global_quickViewZoomImagePath,
		args,
		function(data, textStatus) {
			$("#quickviewLoading").css("display", "none");	
			if (textStatus != "success") {
				alert("There was problem loading Zoom Image for this product. Please try back again later.");
				closeQuickViewZoomImage();
			}
			else {
				var imageDiv = '<div id="quickViewZoomImage">' + data + '</div>';
				$("#quickview_middleRight").prepend(imageDiv);
				$("#quickview_bottomRight a").attr("href", "javascript:closeQuickViewZoomImage()").attr("title", "Close Quick View");
			}
		}
	);
}

function closeQuickViewZoomImage() {
	$("#quickviewContent").css("display", "block");
	$("#quickViewZoomImage").remove();	
	$("#quickview_bottomRight a").attr("href", "javascript:closeQuickView()").attr("title", "Close Quick View");
}

/* utility functions */
function getQueryStringFromURL(URLString) {
	var returnObject = {};
	var querystring = URLString.split("?")[1];
	var skuFound = false;
	var model_nbrFound = false;
	var modelFound = false;
	
	// return empty object if there is no query string
	if (!querystring) return null;
	
	// parse query string into object
	// TODO: we might need to check for &amp;
	var querystringArray = querystring.split("&");
	
	$.each(querystringArray, function(i) {
		var key = querystringArray[i].split("=")[0];
		var value = querystringArray[i].split("=")[1];
		
		if (key == 'sku') skuFound = true;
		if (key == 'model_nbr') model_nbrFound = true;
		if (key == 'model') modelFound = true;
		
		if (key) returnObject[key] = value;
	});

	if ((skuFound && model_nbrFound) || modelFound) {
		return returnObject;
	}
	else {
		return null;
	}
}

function getQueryStringFromURLForURLReWrite(URLString) {
	var returnObject = {};
	var skuFound = false;
	var model_nbrFound = false;
	var modelFound = false;
		
	// parse query string into object
	var querystringArray = URLString.split("/");
	
	$.each(querystringArray, function(i) {
		var key = querystringArray[i].split("--")[0];
		var value = querystringArray[i].split("--")[1];
		
		if (key == 'sku') skuFound = true;
		if (key == 'model_nbr') model_nbrFound = true;
		if (key == 'model') modelFound = true;		
		
		if (key) returnObject[key] = value;
	});

	if ((skuFound && model_nbrFound) || modelFound) {
		return returnObject;
	}
	else {
		return null;
	}
}

function getQueryStringFromURLForURLReWriteII(URLString) {
	var returnObject = {};
	var skuFound = false;
	var modelFound = false;
	var trackingVariablesString = "";
	
	// get tracking variables
	if (URLString.indexOf("?") > 0) {
		var urlpartArray = URLString.split("?");
		if (urlpartArray.length == 2) {
			URLString = urlpartArray[0];
			trackingVariablesString = urlpartArray[1];
		}
	}
	
	// parse query string into object
	var querystringArray = URLString.split("/");
	$.each(querystringArray, function(i) {
		var key = querystringArray[i].split(":")[0];
		var value = querystringArray[i].split(":")[1];
		
		if (key == 'model') {
			key = 'model_nbr';
		}

		if (key == 'sku') skuFound = true;
		if (key == 'model_nbr') model_nbrFound = true;
		if (key == 'model') modelFound = true;
				
		if (key) returnObject[key] = value;
	});

	// parse tracking variables
	var trackingVariables = trackingVariablesString.split("&");
	$.each(trackingVariables, function(i) {
		var key = trackingVariables[i].split("=")[0];
		var value = trackingVariables[i].split("=")[1];

		if (key) returnObject[key] = value;
	});

	if ((skuFound && model_nbrFound) || modelFound) {
		return returnObject;
	}
	else {
		return null;
	}
}
