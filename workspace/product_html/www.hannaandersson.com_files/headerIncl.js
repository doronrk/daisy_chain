
if (window != top) document.cookie = "currMainUrl=" + escape(document.location.href);
var framePosX = ""; var posImgId = "imgFramePos"; var sisIds = ""; var liveHelpAvailable = false;
var imageMapTimeoutIds = new Object(); var sisHddnImgsCnts = new Object();
function setObjProperty(objId, propertyName, propertyValue) {
	if (domBrowser) {var domObj = document.getElementById(objId);
		if (domObj != null) domObj.style[propertyName] = propertyValue;}
	else {var obj = document.all[objId].style;
		switch (propertyName) {
			case "top": obj.top = propertyValue; break;
			case "left": obj.left = propertyValue; break;
			case "visibility": obj.visibility = propertyValue;}}}
function getObjX(obj) {var objX; objX = obj.offsetLeft;
	if (obj.offsetParent) objX += getObjX(obj.offsetParent); return(objX);}
function getObjY(obj) {var objY; objY = obj.offsetTop;
	if (obj.offsetParent) objY += getObjY(obj.offsetParent); return(objY);}
function updateChatFramePos() {
	if (window != top) {checkFramePos(); window.setInterval("checkFramePos();",500);}}
function checkFramePos() {var newFramePosX = ""; with (document) {
	if (IE) newFramePosX = getObjX(images[posImgId]); else newFramePosX = images[posImgId].x;
	if (newFramePosX != framePosX) {cookie = "framePosX=" + newFramePosX;
		framePosX = newFramePosX;}}}
function orderCatalogItem() {document.frmOBI.submit();}
function joinListFocus() {var obj = getObj("jlea");
	if (obj.value == joinListTxt) obj.value = "";}
function joinListBlur() {var obj = getObj("jlea");
	if (obj.value == "") obj.value = joinListTxt;}
function subscribe() {var jlea = getObj("jlea").value; var chrCnt;
	if (jlea == joinListTxt) {jlea = "";} var nonEnglish = false;
	for (chrCnt=0; (chrCnt<jlea.length) && (nonEnglish == false); chrCnt++) {
		if (jlea.charCodeAt(chrCnt) > 127) nonEnglish = true;}
	if (nonEnglish == true) window.location.href = englishOnlyUrl;
	else {jlea = escape(jlea); var jleaArray = jlea.split("+"); jlea = jleaArray.join("%2B");
		window.location.href = emailSignUpUrl + "?ea=" + jlea;}}
function jleaKeyPressed(evnt) {var pressedKey = 0;
	if (window.event) {pressedKey = window.event.keyCode;}
	else if (evnt.which) {pressedKey = evnt.which;} if (pressedKey == 13) subscribe();}
function makeUid() {
	var dateTime = new Date(); return dateTime.getTime() + Math.random();
}
function OpenLowQtyWindow() {
    window.open(lowQtyUrl,"LowQty","width=400,height=400,top=99,left=99,scrollbars=No,resizable=No,titlebar=No");
}
function OpenHolidayShipmentsWindow() {
	window.open(holidayShipUrl,"HolidayShipments","width=350,height=350,top=99,left=99,scrollbars=No,resizable=No,titlebar=No");
}
function joinEmailList() {
	var jlea = document.getElementById("jlea").value; var chrCnt;
	if (jlea == joinListTxt) {jlea = "";} var nonEnglish = false;
	for (chrCnt=0; (chrCnt<jlea.length) && (nonEnglish == false); chrCnt++) {
		if (jlea.charCodeAt(chrCnt) > 127) nonEnglish = true;}
	if (nonEnglish == true) window.location.href = englishOnlyUrl;
	else {jlea = escape(jlea); var jleaArray = jlea.split("+"); jlea = jleaArray.join("%2B");
		window.location.href = emailSignUpUrl + "?ea=" + jlea;}
	return false;
}
function liveChat() {
	window.open(surlPrefix + "/chatCustomerForm.asp","chat_client","width=640,height=470,scrollbars=0");}
function agents_available() {
	liveHelpAvailable = true; document.getElementById('spnLiveChat').style.display = "inline";
	updateLiveHelpButton();
	return true;
}
function agents_not_available() {
	liveHelpAvailable = false; document.getElementById('spnLiveChat').style.display = "none";
	updateLiveHelpButton();
	return true;
}
function updateLiveHelpButton() {
	var lvHlpBttnObj, display; lvHlpBttnObj = document.getElementById('custSrvcLvHlpBttn'); display = "none";
	if (lvHlpBttnObj) { if (liveHelpAvailable == true) display = "block"; lvHlpBttnObj.style.display = display; }
}
$(document).ready(function () {
	updateLiveHelpButton();
});
function checkScrollingImageSets() {
	var sisIdsArray, sisCnt;
	if (sisIds != "") {sisIdsArray = sisIds.split(",");
		for (sisCnt=0; sisCnt<sisIdsArray.length; sisCnt++) sisUpdateButtons(sisIdsArray[sisCnt]);}
}
function mouseOverImageMap(imageId, areaNumber) {
	var areaId, imgObj, areaObj, divMOImgObj, imgPos, coordsArray, moImgLeft, moImgTop;
	areaId = imageId + "_" + areaNumber; if (imageMapTimeoutIds[areaId]) window.clearTimeout(imageMapTimeoutIds[areaId]);
	imgObj = getObj(imageId); areaObj = getObj("area_" + areaId); divMOImgObj = getObj("divMOImg_" + areaId);
	imgPos = getPositionObject(imgObj); coordsArray = areaObj.coords.split(",");
	moImgLeft = imgPos.left + parseInt(coordsArray[0]); moImgTop = imgPos.top + parseInt(coordsArray[1]);
	divMOImgObj.style.left = moImgLeft + "px"; divMOImgObj.style.top = moImgTop + "px";
	divMOImgObj.style.display = "block";
}
function mouseOutImageMap(imageId, areaNumber) {
	var areaId = imageId + "_" + areaNumber;
	if (imageMapTimeoutIds[areaId]) window.clearTimeout(imageMapTimeoutIds[areaId]);
	imageMapTimeoutIds[areaId] = window.setTimeout("hideMouseOverAreaImage('" + areaId + "');", 120);
}
function hideMouseOverAreaImage(areaId) {getObj("divMOImg_" + areaId).style.display = "none";}
function openImageLinkPopUp(e, url, windowName, height, width) {
	if (url.indexOf("?") > 0) url += "&"; else url += "?";
	window.open(url + "wt=pu&wn=" + windowName, windowName,
		"width=" + width + ",height=" + height + ",top=99,left=99,scrollbars=Yes,resizable=No,titlebar=No");
}
function convertroFirstItemAdded() {
	if (isInternal != "Y") {
		$CVO = window.$CVO || [];
		$CVO.push([ 'trackEvent', {type: 'cart', id: null, amount:'1'}]);}
}
var srchAutoCompleteSettings = {
	account: adobeSearchAccount,
	searchDomain: 'http://' + adobeSearchUrl + '/',
	inputElement: "input#freeText",
	inputFormElement: "form#searchForm",
	delay: 100,
	minLength: 3,
	maxResults: 10,
	browserAutocomplete: false,
	submitOnSelect: true,
	queryCaseSensitive: false,
	autoFocus:false,
	appendTo:"",
	startsWith: false,
	searchOnSelect: true,
	highlightWords : true,
	highlightWordsBegin : false,
	header : "",
	footer : ""
}
jQuery(document).ready(function () { jQuery(srchAutoCompleteSettings.inputElement).AdobeAutocomplete(srchAutoCompleteSettings); });

function hvrnclckReset() { $('.hvrnclck').data('doclick', true); }
function frsttchclckReset() { $('.frsttchclck').data('doclick', true); }
function frsttchclckUpdate() {
	frsttchclckReset(); $('.hvrnclck, .frsttchclck').on({ 'click': function (e) { if (!($(this).data('doclick'))) e.preventDefault(); } });
	$('.frsttchclck').on({ 'touchstart': function (e) { $(this).data('doclick', false); e.preventDefault(); window.location.href = $(this).attr('href'); } });
}
$(document).ready(function () {
	hvrnclckReset();
	$('.hvrnclck').on({ 'touchstart': function (e) {
		var doclick = !($(this).data('doclick')); hvrnclckReset(); $(this).data('doclick', doclick); $(this).focus();
		if (doclick) { $(this).data('doclick', false); e.preventDefault(); window.location.href = $(this).attr('href'); }
	} 
	});
	frsttchclckUpdate();
	$('.tchfcs').on({ 'touchstart': function (e) { e.preventDefault(); $(this).focus(); } });
});
function productRecommendations(imageWidth, imageHeight, slickCarousel) {
	var styleIdList, placementItems, itemCnt, url, json, $recommended, $recommendedUl, item, itemHtml, productId, productLinks, productLink, linkArray, uriCnt, done;
	styleIdList = ""; productLinks = new Object();
	if (RR.data) if (RR.data.JSON) if (RR.data.JSON.placements) if (RR.data.JSON.placements.length > 0) {
		placementItems = RR.data.JSON.placements[0].items;
		for (itemCnt = 0; itemCnt < placementItems.length; itemCnt++) {
			if (placementItems[itemCnt].productId) {
				productId = placementItems[itemCnt].productId;
				if (styleIdList != "") styleIdList += "|"; styleIdList += productId; productLinks[productId] = placementItems[itemCnt].productLink;
			}
		}
	}
	if (styleIdList != "") {
		url = 'miscSrvrRtns.aspx?actn=getProdDispInfo&iw=' + imageWidth + '&stlIdLst=' + styleIdList + '&uid=' + makeUid();
		$.ajax({ url: url, async: true,
			error: function (jqXHR, textStatus, errorThrown) { },
			success: function (response) {
				json = eval("(" + response + ")");
				if (json.length > 0) {
					$recommended = $('#recommended'); $recommended.removeClass('hidden'); $recommendedUl = $recommended.find("ul");
					for (itemCnt = 0; itemCnt < json.length; itemCnt++) {
						item = json[itemCnt]; productId = item.productId; productLink = productLinks[productId]; linkArray = productLink.split("&"); done = false;
						for (uriCnt = (linkArray.length - 1); (uriCnt > 0 && done == false); uriCnt--) {
							if (linkArray[uriCnt].substr(0, 3) == "ct=") { linkArray[uriCnt] = "ct=" + encodeURIComponent(item.href); done = true; }
						}
						productLink = linkArray.join("&"); itemHtml = '<li><div><a class="frsttchclck" href="' + productLink + '"><img src="' + item.image + '" alt="' + item.name;
						itemHtml += '" width="' + imageWidth + '" height="' + imageHeight + '" /><p>' + item.name + '</p><p>' + item.price + '</p></a></div></li>';
						if (slickCarousel) $recommendedUl.slickAdd(itemHtml); else $recommendedUl.append(itemHtml);
					}
					frsttchclckUpdate();
				}
			}
		});
	}
}
