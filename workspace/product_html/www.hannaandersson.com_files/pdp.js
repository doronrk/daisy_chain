
for (colorCnt = 0; colorCnt < colorIds.length; colorCnt++) {
	colorId = colorIds[colorCnt]; xsellBuilt[colorId] = false;
	if (xsellItems[colorId]) {
		xsellTypes = xsellItems[colorId]; if (colorId == currentColorId) xsellBuilt[colorId] = true;
		for (typeCnt = 0; typeCnt < xsellTypes.length; typeCnt++) {
			for (styleCnt = 0; styleCnt < xsellTypes[typeCnt].length; styleCnt++) {
				xsellItem = xsellTypes[typeCnt][styleCnt]; xsellItem.image = new Image(); xsellItem.image.src = xsellItem.imgUrl;
			}
		}
	}
}
function colorSelectionChanged() {
	var selectedColorId, sizeCnt, size, sizeInfo, $bttnObj, $xsellDivObj, xsellTypes, typeCnt, $xsellUlObj, styleCnt, xsellItem, itemHtml, $shownXSellDivObj;
	var altCnt, altInfo, $altMiniObj;
	selectedColorId = $('#pdp-colors').find('button.active').attr('value'); selectedColorInfo = colorsInfo[selectedColorId];
	$('#mainMini').attr('src', selectedColorInfo.mainMini.src); $('#mainMini').attr('data-primary', selectedColorInfo.mainFull.src);
	for (altCnt = 0; altCnt < maxAltCount; altCnt++) {
		$altMiniObj = $('#alt' + altCnt + 'Mini');
		if ($altMiniObj.length) {
			if (altCnt < selectedColorInfo.alts.length) {
				$altMiniObj.parent().removeClass('hidden'); $altMiniObj.parent().addClass('shown');
				altInfo = selectedColorInfo.alts[altCnt]; $altMiniObj.attr('src', altInfo.altMini.src); $altMiniObj.attr('data-primary', altInfo.altFull.src);
			}
			else { $altMiniObj.parent().removeClass('shown'); $altMiniObj.parent().addClass('hidden'); } }
	}
	for (sizeCnt = 0; sizeCnt < selectedColorInfo.sizes.length; sizeCnt++) {
		size = selectedColorInfo.sizes[sizeCnt]; sizeInfo = selectedColorInfo.sizesInfo[size]; $bttnObj = $('#pdp-sizes button[value="' + size + '"]');
		if (sizeInfo.status == 'SO') {
			if ($bttnObj.hasClass('active')) { $('#lblSize').find('strong')[0].nextSibling.data = ''; $('#selSize').val(''); }
			$bttnObj.attr('disabled', true); $bttnObj.removeClass('active');
		}
		else { $bttnObj.attr('disabled', false); }
	}
	$('#pdp-atc-error').addClass('hidden'); sizeSelectionChanged(); personalizeCheck(selectedColorId); $xsellDivObj = $('#xsell_' + selectedColorId);
	if ($xsellDivObj.length) {
		$xsellDivObj.removeClass('hidden').siblings().addClass('hidden');
		if (xsellBuilt[selectedColorId] == false) {
			xsellBuilt[selectedColorId] = true; xsellTypes = xsellItems[selectedColorId];
			for (typeCnt = 0; typeCnt < xsellTypes.length; typeCnt++) {
				$xsellUlObj = $('#xsell_' + selectedColorId + '_' + typeCnt);
				for (styleCnt = 0; styleCnt < xsellTypes[typeCnt].length; styleCnt++) {
					xsellItem = xsellTypes[typeCnt][styleCnt]; itemHtml = '<li><div><a class="frsttchclck" href="' + xsellItem.href + '"><img src="' + xsellItem.imgUrl + '" alt="';
					itemHtml += xsellItem.name + '" width="176" height="217" /><p>' + xsellItem.name + '</p><p>' + xsellItem.price + '</p></a></div></li>'; $xsellUlObj.slickAdd(itemHtml);
				}
			}
			frsttchclckUpdate();
		}
	}
	else {
		$shownXSellDivObj = $("div[id^='xsell_']:not(.hidden)"); if ($shownXSellDivObj.length) $shownXSellDivObj.addClass('hidden');
	}
}
function setMainImage($liObj) {
	setViewerImage($liObj.children('img').attr('data-primary')); $liObj.addClass('active').siblings().removeClass('active');
}
function setViewerImage(s7Image) {
	flyoutViewer.setAsset("Hanna/" + s7Image.replace(s7PathBase,''));
}
function sizeSelectionChanged() {
	var size, $selectedSizeBttn, status, qtyAvail, sizeInfo, qtyAvailToShip, qtyAvailToBO, selectedQty, qty, sel, $selQtyObj;
	if (oneSize == true) { size = "ONESIZE"; }
	else { size = ""; $selectedSizeBttn = $('#pdp-sizes').find('button.active'); if ($selectedSizeBttn.length) { size = $selectedSizeBttn.attr('value'); } }
	status = ""; qtyAvail = 0; if (selectedColorInfo.soldOut == false) { qtyAvail = 9; } $('#pdp-atc-msg').addClass('hidden');
	if (size != "") {
		$('#pdp-atc-error').addClass('hidden');
		sizeInfo = selectedColorInfo.sizesInfo[size]; status = sizeInfo.status; qtyAvailToShip = sizeInfo.availToShipQty; qtyAvailToBO = sizeInfo.availToBackorderQty;
		if (qtyAvailToShip == "") qtyAvailToShip = "0"; if (qtyAvailToBO == "") qtyAvailToBO = "0"; qtyAvail = parseInt(qtyAvailToShip) + parseInt(qtyAvailToBO);
	}
	if (status == "LQ") $('#pdp-low-qty').removeClass('hidden'); else $('#pdp-low-qty').addClass('hidden'); if (qtyAvail > 9) qtyAvail = 9;
	if (qtyAvail < 1) { showMsg('pdp-sold-out'); } else $('#pdp-sold-out').addClass('hidden');
	if (getObj("selQty").options.length != qtyAvail) {
		$selQtyObj = $('#selQty'); selectedQty = $selQtyObj.val(); if (selectedQty == "") selectedQty = "1"; selectedQty = parseInt(selectedQty); $selQtyObj.empty();
		for (qty = 1; qty <= qtyAvail; qty++) {
			sel = ""; if (qty == selectedQty) sel = " selected"; $selQtyObj.append('<option value="' + qty + '"' + sel + '>' + qty + '</option>');
		} 
	}
}
function getColorId() {
	var colorId, $selectedColorBttn;
	if (oneColor == true) { colorId = currentColorId; }
	else { colorId = ""; $selectedColorBttn = $('#pdp-colors').find('button.active'); if ($selectedColorBttn.length) colorId = $selectedColorBttn.attr('value'); }
	return colorId;
}
function getUsersSelections() {
	var colorId, size, displaySize, age, $selectedSizeBttn, qty, json;
	colorId = getColorId();
	if (oneSize == true) { size = "ONESIZE"; displaySize = ""; age = ""; }
	else {
		size = ""; displaySize = ""; age = ""; $selectedSizeBttn = $('#pdp-sizes').find('button.active');
		if ($selectedSizeBttn.length) { size = $selectedSizeBttn.attr('value'); displaySize = $selectedSizeBttn.data('dispsize'); age = $selectedSizeBttn.data('age'); } 
	}
	if (size == "") { showMsg('pdp-atc-error'); }
	else {
		$('#pdp-atc-error').addClass('hidden'); if (colorId == "") colorId = currentColorId; qty = getObj("selQty").value; if (qty == "") qty = 1;
	}
	json = { "colorId": colorId, "size": size, "displaySize": displaySize, "age": age, "qty": qty };
	return json;
}
function addToBagClicked(option) {
	var json, colorId, size, qty, addingToBagMsg, sku, colorName;
	if (addingToBag == false) {
		json = getUsersSelections(); colorId = json.colorId; size = json.size; qty = json.qty;
		if (size != "") {
			addingToBag = true; addingToBagMsg = "This item is"; if (qty > 1) addingToBagMsg = "These items are";
			if (option == "personalize") addingToBagMsg += " being checked for availability . . ."; else addingToBagMsg += " being added to your bag . . .";
			showAtcMsg(addingToBagMsg);
			sku = prefix + style + "-" + colorId; if (oneSize == false) sku += "-" + size; colorName = encodeURIComponent(colorsInfo[colorId].name);
			addToBagUrl = "xt_addItemsToBag.asp?skus=" + sku + "&qtys=" + qty + "&clrNm=" + colorName + "&optn=" + option + "&nd=Y&from=" + fromParam + "&fromCatId=" + fromCatId + "&uid=" + makeUid();
			addToBagOption = option; window.setTimeout(function () { addItemsToBag(); }, 100);
		} 
	}
}
function addItemsToBag() {
	var responseTextArray, rtCnt, responseLineArray, responseArray, result, status, qtyAdded, msg, requestedQty;
	$.ajax({ url: addToBagUrl, async: false,
		error: function (jqXHR, textStatus, errorThrown) { addingToBag = false; showAtcMsg(errorThrown + "<br>Please contact customer service."); },
		success: function (responseText) {
			addingToBag = false; responseTextArray = responseText.split("]");
			for (rtCnt = 0; rtCnt < responseTextArray.length; rtCnt++) {
				responseLineArray = responseTextArray[rtCnt].split("{"); responseArray = responseLineArray[1].split(US);
				if (debug == 'Y') $('#taDebug').text("responseLineArray[0]=" + responseLineArray[0] + "; responseArray.length=" + responseArray.length);
				if (responseLineArray[0] == "omnitureItemsAddedToCart") try { omnitureItemsAddedToCart(responseArray[0], responseArray[1]); } catch (e) { }
				if (responseLineArray[0] == "serverResponse") {
					result = responseArray[0]; if (debug == 'Y') $('#taDebug').text(result);
					if (result == "Error") { window.location.href = pageErrorUrl; }
					if (result == "Added") {
						if (addToBagOption == "personalize") { window.location.href = "/personalize.aspx?uid=" + makeUid(); return false; }
						showBeginCheckout(); status = responseArray[1]; qtyAdded = responseArray[3];
						msg = "Item"; if (qtyAdded > 1) { msg = "Items"; } msg += " added to bag";
						if (status != "") {
							if (status.substr(0, 8) == "Expected") { msg += ". This style is super popular! We expect to ship yours on " + status.split(" ")[3]; }
							else { msg += " (" + status + ")"; }
						} msg += "."; showAtcMsg(msg);
						if (isFirstItem) { convertroFirstItemAdded(); isFirstItem = false; }
						updateBagItemsCount(responseArray[7]);
					}
					if (result == "SoldOut") {
						requestedQty = responseArray[2]; if (requestedQty > 1) msg = "The quantity you requested for this"; else msg = "This";
						msg += " item is no longer available."; showAtcMsg(msg);
					}
				}
			}
		}
	});
}
function showBeginCheckout() { $('#begin-checkout').addClass('shown'); $('#begin-checkout').removeClass('hidden'); }
function addToWishListClicked() {
	var json, colorId, size, displaySize, age, qty, colorInfo;
	json = getUsersSelections(); colorId = json.colorId; size = json.size; displaySize = json.displaySize; age = json.age; qty = json.qty;
	if (size != "") {
		if (oneSize == false) { wishListSizeRequired = true; wishListSize = htmlDecode(displaySize); }
		wishListQty = qty; colorInfo = colorsInfo[colorId];
		if (oneColor == false || oneSize == false) { wishListColorRequired = true; wishListColor = htmlDecode(colorInfo.name); }
		wishListImageSrc = colorInfo.mainFull.src; wishListGiftTitle = htmlDecode(styleName); wishListGiftPrice = colorInfo.price;
		CreateAddToMyRegistryWidget();
	}
}
function showAtcMsg(msg) {
	var $atcMsg; $atcMsg = $('#pdp-atc-msg'); $atcMsg.html(msg);
	if (msg == '') { $atcMsg.hide(); $atcMsg.addClass('hidden'); } else { showMsg('pdp-atc-msg'); }
}
function showMsg(msgDivId) {
	$('#pdp-atc-error').addClass('hidden'); $('#pdp-atc-msg').hide(); $('#pdp-atc-msg').addClass('hidden'); $('#pdp-sold-out').addClass('hidden');
	if (msgDivId == 'pdp-atc-msg') $('#pdp-atc-msg').show(); $('#' + msgDivId).removeClass('hidden');
}
function personalizeCheck(colorId) {
	var $prsnlzBttn; $prsnlzBttn = $('#personalize-it');
	if ($prsnlzBttn.length) { if ($.inArray(colorId, personalizationColors) < 0) $prsnlzBttn.hide(); else $prsnlzBttn.show(); }
}
function beginCheckoutClicked() { window.location.href = bagUrl; }
function getColorImageId() {
	var colorImageId; colorImageId = imagesFormat.replace(/<color>/gi, getColorId());
	return colorImageId;
}
function fbs_click() {
	var u = fbHrefBase + "&simg=" + getColorImageId(); var t = styleName + " from Hanna Andersson"; omnitureSocialShareClicked("Facebook", style);
	window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(u) + "&t=" + encodeURIComponent(t) + "&uid=" + makeUid(),
		 "fbsharer", "toolbar=0,status=0,width=796,height=486");
	return false;
}
function twttr_click() {
	var u = twitterUrlBase + "&simg=" + getColorImageId(), t = styleName + " from #HannaAndersson";
	var url = baseUrl + "?srvractn=twttrclck&url=" + encodeURIComponent(u); omnitureSocialShareClicked("Twitter", style);
	window.open(url + "&text=" + encodeURIComponent(t), "twsharer", "toolbar=0,status=0,width=680,height=450");
	return false;
}
function pntrst_click() {
	var u = pinterestUrlBase + "&simg=" + getColorImageId(), imageUrl = colorsInfo[getColorId()].mainFull.src, desc = styleName + " from #HannaAndersson.";
	var url = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(u) + "&media=" + encodeURIComponent(imageUrl) + "&description=" + encodeURIComponent(desc);
	omnitureSocialShareClicked("Pinterest", style); window.open(url, "pntrstsharer", "toolbar=0,status=0,width=620,height=320");
	return false;
}
function gglpls_click() {
	var u = googlePlusUrlBase + "&simg=" + getColorImageId(); var url = "https://plus.google.com/share?url=" + encodeURIComponent(u);
	omnitureSocialShareClicked("Google Plus", style); window.open(url, "gglplssharer", "'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");
	return false;
}
$(document).ready(function () {
	$('div.prodlink').click(function (e) {
		e.preventDefault(); var styleId = $(e.target).attr('data-styleid'), newUrl = "/pdp.aspx?from=MS&styleid=" + styleId;
		if ($(e.target).html().substr(0, 6) == 'Review') newUrl += '#reviews'; window.location.href = newUrl;
	});
});
