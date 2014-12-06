function qvShowExcludedBubble() {
	$("#quickview_excluded_bubble").remove();
	
	var excludedDetail = 'The dollar value of this item will count toward meeting a required minimum purchase total necessary to receive a discount, but the price of this item itself will not be discounted. Only other eligible items in your cart will be discounted. (Example: You can purchase this product to reach the order threshold to receive a discount, but you will only receive the discount on other eligible items in your cart.)';
		
	var offset = $("#quickview_excludedMessage").offset();
	var left = offset.left - 0;
	var top = offset.top - 170;
	
	$("body").prepend('<div id="quickview_excluded_bubble"><p></p></div>');
	
	$("#quickview_excluded_bubble").css("left", left);
	$("#quickview_excluded_bubble").css("top", top);
	$("#quickview_excluded_bubble").css("opacity", 0.9);
	$("#quickview_excluded_bubble p").html(excludedDetail);
	$("#quickview_excluded_bubble").show();
}

function qvHideExcludedBubble() {
	$("#quickview_excluded_bubble").fadeOut(function() {
		$("#quickview_excluded_bubble").remove();
	});
}

function qvShowFreeShippingBubble() {
	$("#quickview_freeshipping_bubble").remove();
	
	var freeShippingDetail = global_quickViewFreeStandardShippingDetails;
		
	var offset = $("#quickview_freeShipping").offset();
	if (BORISEnabled) {
		var left = offset.left - 150;
		var top = offset.top - 285;
	} else {
		var left = offset.left - 20;
		var top = offset.top - 285;
	}

	$("body").prepend('<div id="quickview_freeshipping_bubble"><p></p></div>');
	
        top = offset.top - $("#quickview_freeshipping_bubble").height();

	$("#quickview_freeshipping_bubble").css("left", left);
	$("#quickview_freeshipping_bubble").css("top", top);
	$("#quickview_freeshipping_bubble").css("opacity", 0.9);
	$("#quickview_freeshipping_bubble p").html(freeShippingDetail);
	$("#quickview_freeshipping_bubble").show();
}

function qvHideFreeShippingBubble() {
	$("#quickview_freeshipping_bubble").fadeOut(function() {
		$("#quickview_freeshipping_bubble").remove();
	});
}

function qvShowMaskPurchasePriceBubble() {
	$("#quickview_maskpurchaseprice_bubble").remove();
	showSPICElementTag();
	
	var maskPurchasePriceDetail = global_quickViewMaskPurchasePriceDetails;
	
	var offset = $("#QVpdp_maskPurchasePrice").offset();
	var left = offset.left - 82;
	var top = offset.top - 90;
	
	$("body").prepend('<div id="quickview_maskpurchaseprice_bubble"><p></p></div>');
	
	$("#quickview_maskpurchaseprice_bubble").css("left", left);
	$("#quickview_maskpurchaseprice_bubble").css("top", top);
	$("#quickview_maskpurchaseprice_bubble").css("opacity", 0.9);
	$("#quickview_maskpurchaseprice_bubble p").html(maskPurchasePriceDetail);
	$("#quickview_maskpurchaseprice_bubble").show();
}

function qvHideMaskPurchasePriceBubble() {
	$("#quickview_maskpurchaseprice_bubble").fadeOut(function() {
		$("#quickview_maskpurchaseprice_bubble").remove();
	});
}
		
function viewMoreOtherStyles() {
	$("#quickviewPDP .otherStyles").css("overflow", "auto");
	$("#quickviewPDP .otherStyles a.more").css("display", "inline");
	$("#quickviewPDP .viewMoreStyles").css("display", "none");
}

function validateQuickViewAddToCart(formObj, action) {
	// TODO: Need to validate for integer
	if (formObj.qty && (isNaN($(formObj.qty).val()) || $(formObj.qty).val().length == 0) ) {
		alert("Please enter a valid quantity.");
		return false;
	}
	
	// if store pickup and no storenumber, launch
	if ((BORISEnabled || shipFromStoreEnabled) && action == "addtocart") {
		if (BORISEnabled && $("#deliveryMethod_storepickup").is(":checked") && $("#qv_storeNumber").val() == 0 && $("#skip").val() != 'skip') {
			launchStorePickupOverlay('quickview', isaQVCallback,0,0);
			return false;
		} else {
			if (formObj.size) {
				var sizeValue = $(formObj.size).val();

				if (sizeValue == "choose") {
					alert("Please select a size.");
					return false;
				} else if (shipFromStoreEnabled) {
					processFulfillmentType (formObj.size);
				}
			}
		}
	
	} else {
		if (formObj.size && $(formObj.size).val() == "choose") {
			alert("Please select a size.");
			return false;
		}
	}
	
	//hot sku check
	if (formObj.hotsku_quantity_left != null) {
		if (parseInt($(formObj.qty).val()) > parseInt($(formObj.hotsku_quantity_left).val())) {
		alert("Order quantity is limited on this product to " + $(formObj.hot_launch_max_per_order).val() + " per customer.");
		return false;
		}
	}
	
	if (inlineAddToCartEnabled && action == 'addtocart' && (lineID == undefined || lineID == 0 )) {
		// skip mini add to cart if personalizing or protective_packaging or XForYPromo
		var personalized = ($(formObj.personalization).length && $(formObj.personalization).is(":checked"));
		var protective_packaging = ($(formObj.protective_packaging).length && $(formObj.protective_packaging).is(":checked"));
		var hasXYPromo = ($("#hasXYPromo").length && $("#hasXYPromo").val());
		if (personalized == false && protective_packaging == false && hasXYPromo == "false" && (typeof(qvSourcePage) == "undefined" || qvSourcePage != "shoppingCart") ) {
			if (BORISEnabled && $("#deliveryMethod_storepickup").is(":checked")) {
				miniAddToCart.openMiniAddToCart("quickview_product_form", closeQuickViewWithFadeBORIS);
			} else {
				miniAddToCart.openMiniAddToCart("quickview_product_form", closeQuickViewWithFade);
			}
			
			return false;
		}
	}
	
	return true;
}

function replaceURL (URL, paramName, paramValue) {
	if (typeof URL == "undefined" || URL == null)
		return "";
	
	var URLSeparator = '?';
	var paramSeparator = '=';
	var queryStringDelimSymbol = '&';
	var URLElements = URL.split(URLSeparator);
	var URLPath = "";
	var URLQueryString = "";
	if (URLElements.length == 2) {
		URLPath = URLElements[0];
		URLQueryString = URLElements[1];
	}
	else if (URLElements.length == 1) {
		URLPath = URLElements[0];
	}

	var newQueryString = '';
	var queryStringDelimiter = '';
	if (URLQueryString) {
		var i = 0;
		var queryStringElements = URLQueryString.split(queryStringDelimSymbol);
		for (i=0; i<queryStringElements.length; i++) {
			if(queryStringElements[i].indexOf(paramName) == -1) {
				newQueryString += queryStringDelimiter + queryStringElements[i];
			} else {
				newQueryString += queryStringDelimiter + paramName + paramSeparator + paramValue;
			}
			queryStringDelimiter = queryStringDelimSymbol;
		}
	}
	var newURL = URLPath + URLSeparator + newQueryString;
	return newURL;
}

function isaQVCallback(sku, size, qty, storeNumber, fulfillmentType, storeCostOfGoods){
	$("#sku").val(sku);
	$("#QV_size").val(size);
	$("#QV_quantity").val(qty);
	$("#qv_storeNumber").val(storeNumber);
	$("#qv_fulfillmentType").val(fulfillmentType);
	$("#qv_storeCostOfGoods").val(storeCostOfGoods);
	$("#skip").val('skip');	
	
	switch (fulfillmentType) {
	case "PICKUP_IN_STORE":
	case "SEND_TO_STORE":
		$('#quickview_product_form').attr('action', replaceURL($('#quickview_product_form').attr('action'), 'cm', 'ISA PICKUPHERE'));
		$('#quickviewContent #rawURL').html(replaceURL($('#quickviewContent #rawURL').html(), 'cm', 'ISA PICKUPHERE'));
		break;
	case "SHIP_TO_HOME":
		$('#quickview_product_form').attr('action', replaceURL($('#quickview_product_form').attr('action'), 'cm', 'ISAADDTOCART'));
		$('#quickviewContent #rawURL').html(replaceURL($('#quickviewContent #rawURL').html(), 'cm', 'ISAADDTOCART'));
		break;
	}
	
	$("#quickview_product_form").submit();
}

function displayBackOrderMsg(thisObj) {

console.log("==================");

	var index = thisObj.selectedIndex - 1;
	if (index == -1) {
		$("#backorderMsg").html("");
	} else {
		var selectedStyle = QVstyles[$("#sku").val()];
		var sizeAvailability = selectedStyle[idx_sizes][index][availability_index];
        var fulfillmentType = $("#qv_fulfillmentType").val();
		if (sizeAvailability != "" && sizeAvailability != "In Store Only" && (fulfillmentType == 'SHIP_TO_HOME' || fulfillmentType == 'SEND_TO_STORE')) {
			$("#backorderMsg").html("Back-ordered, Expected to Ship " + sizeAvailability);
		} else {
			$("#backorderMsg").html("");
		}
	} 
}

function processFulfillmentType(sizeObj) {
	var selectedStyle = QVstyles[$("#sku").val()];

	if ($(sizeObj).val() == " " || typeof(sizeObj.selectedIndex) == "undefined") {
		var selectedSizeIndex = 0;
	} else {
		var selectedSizeIndex = sizeObj.selectedIndex - 1;
	}

	if (selectedStyle[idx_sizes][selectedSizeIndex][availability_index] == "In Store Only") {
		$("#qv_fulfillmentType").val("SHIP_FROM_STORE");
	}
}

	function listFind(list, item) {
		var listArray = list.split(",");
		for (listIndex in listArray) {
			if (listArray[listIndex] == item) return true;
		}
		return false;
	}

	var launchSku = "";	
	function initializeQVHotLaunchCounter(ps) {
		if (ps) 
			launchSku = ps;
		else
			launchSku = $("#sku").val();
		killQVHotLaunchTimer();
		startQVHotLaunchTimer();
	}

	function startQVHotLaunchTimer() {
		var shoelaunch_skuList = hot_skus;
		var sku = launchSku;
		var isLaunchSku = shoelaunch_skuList.indexOf(sku) != -1;

		timeToHL -= 1;

		if (!isLaunchSku || timeToHL < 0) {
			// show add to cart and disable timer
			if (isLaunchSku)
				$("#quickview #qv_launch_disclaimer").show();
			else
				$("#quickview #qv_launch_disclaimer").hide();
			$("#quickview #qv_unavailable_for_purchase").hide();
			$("#quickview #pdp_deliveryMethod,#quickviewSubmitButton").show();
			$("#quickview #pdp_calltoorder").show();
			$("#quickview #addToWishlist").show();
			killQVHotLaunchTimer();
			return;
		}

        	if (isLaunchSku && $("#quickview #qv_launch_disclaimer").length == 0) {
			$("#quickview div#qv_info").append("<div id=\"qv_launch_disclaimer\">" + RBM.productLaunch.pdp.disclaimer + "</div>");
        	}

		// hide add to cart and things and start timer
		$("#quickview #qv_launch_disclaimer").show();
		$("#quickview #pdp_deliveryMethod,#quickviewSubmitButton").hide();
		$("#quickview #pdp_calltoorder").hide();
		$("#quickview #addToWishlist").hide();
		$("#quickview #qv_unavailable_for_purchase").show();

		var sec = timeToHL % 60;
		var min = parseInt(timeToHL / 60) % 60;
		var hour = parseInt(timeToHL / (60 * 60));

		$("#quickview #qv_unavailable_for_purchase div").html(hour + " " + RBM.productLaunch.pdp.countdownHours + " " + min + " " + RBM.productLaunch.pdp.countdownMinutes + " " + sec + " " + RBM.productLaunch.pdp.countdownSeconds);

		timerID = setTimeout("startQVHotLaunchTimer()", 1000);
	}

	function killQVHotLaunchTimer() {
		try {
			clearTimeout(timerID);
		}
		catch(ex) {
			// it wasn't meant to be
		}
	}
