var zoomCurrent = 0;
var zoomLargeCurrent = 0;
var zoomImgWidthDefault = 2931;
var zoomImgHeightDefault = 2931;
var imgHolderWidthDefault = 249;
var imgHolderHeightDefault = 348;
var pdImageCurrent = '';
var zoomLargeImgHolderWidth = 1000;
var soldOutImgHolderFlag = false;
var isZoom = true;
// init (also called from switchZoomOff() of skuPicker.js)
function initZoom(pdImageSrc,isZoomm) {
	isZoom = isZoomm;
	pdImageCurrent = pdImageSrc;
	setCurrent(0);
	zoomLargeImgHolderWidth = $('contentZoomLargeHolder').getWidth();
	reloadZoomImgPD();
}

// zoom in img; clickPosition is null if called from "+" button
// ==> set clickPosition to the center of visible part of img
function zoomIn(clickPosition) {
	if(zoomCurrent < 2 && getImgSrc('PZ') != "") {
		if(clickPosition == null) clickPosition = centerClickImg();
		if(isZoom){
			setZoom(true, clickPosition);
		} else {
			setZoomEnlarge(true, clickPosition);
		}
	}
}
// zoom out img;
// set clickPosition to the center of visible part of img
function zoomOut() {
	if(zoomCurrent > 0 && getImgSrc('PZ') != "") {
		if(isZoom){
			setZoom(false, centerClickImg());
		} else {
			setZoomEnlarge(false, centerClickImg());
		}
	}
}
// reset zoom img
function zoomReset() {
	if(zoomCurrent > 0) reloadZoomImgPD();
}

// sets the img zoom 33% or 100%; zoom in - if inOut == true, zoom out - if inOut == false
function setZoom(inOut, clickPosition) {
	var imgObj = $('zoomImg');
	if(imgObj != null) {
		var imgWidth = (zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault;
		var imgHeight = (zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault;
		if((zoomCurrent == 0 && inOut)) { // zoom to 33%
			imgObj.style.width = imgWidth / 3 + "px";
			imgObj.style.height = imgHeight / 3 + "px";
			reloadZoomImg('PZ');
			setCurrent(1);
			Drag.init($('zoomImg'), null, calcLeftCenter()*2, 0, calcTopCenter()*2, 0);
			imgObj.style.cursor = "move"; // change cursor to 'move'
		}
		else if(zoomCurrent == 1 && inOut) { // zoom to 100%
			imgObj.style.width = imgWidth + "px";
			imgObj.style.height = imgHeight + "px";
			setCurrent(2);
			Drag.init($('zoomImg'), null, calcLeftCenter()*2, 0, calcTopCenter()*2, 0);
			imgObj.style.cursor = "move"; // change cursor to 'move'
		}
		else if(zoomCurrent == 2 && !inOut) { // zoom to 33%
			imgObj.style.width = imgWidth / 3 + "px";
			imgObj.style.height = imgHeight / 3 + "px";
			setCurrent(1);
			Drag.init($('zoomImg'), null, calcLeftCenter()*2, 0, calcTopCenter()*2, 0);
		}
		else if(zoomCurrent < 2 && !inOut) { // reload PD img
			reloadZoomImgPD();
		}
		
		if(zoomCurrent > 0) {
			if(clickPosition != null) positionImg(clickPosition, inOut);
			else centerImg();
		}
	}
}
function setZoomEnlarge(inOut, clickPosition) {
	var imgObj = $('zoomImg');
	if(imgObj != null) {
		var imgWidth = (zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault;
		var imgHeight = (zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault;

		if(zoomCurrent == 0 && inOut) { // zoom to 100%
			reloadZoomImg('PZ');
			imgObj.style.width = imgWidth + "px";
			imgObj.style.height = imgHeight + "px";
			setCurrent(2);
			Drag.init($('zoomImg'), null, calcLeftCenter()*2, 0, calcTopCenter()*2, 0);
			imgObj.style.cursor = "move"; // change cursor to 'move'
		}
		else if(zoomCurrent == 2 && !inOut) { // zoom to 33%
			reloadZoomImgPD();
		}
		else if(zoomCurrent < 2 && !inOut) { // reload PD img
			reloadZoomImgPD();
		}
		
		if(zoomCurrent > 0) {
			if(clickPosition != null) positionImg(clickPosition, inOut);
			else centerImg();
		}
	}
}
// centers zoom img
function centerImg() {
	var imgObj = $('zoomImg');
	if(imgObj != null) {
		imgObj.style.left = calcLeftCenter() + "px";
		imgObj.style.top = calcTopCenter() + "px";
	}
}

// calculate imgObj.style.left
function calcLeftCenter() {
	return -1 * (((zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault) / ((zoomCurrent == 1) ? 3 : 1) - ((imgHolderWidth != null) ? imgHolderWidth : imgHolderWidthDefault)) / 2;
}

// calculate imgObj.style.top
function calcTopCenter() {
	return -1 * (((zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault) / ((zoomCurrent == 1) ? 3 : 1) - ((imgHolderHeight != null) ? imgHolderHeight : imgHolderHeightDefault)) / 2;
}

// zoom to the click spot
function positionImg(clickPosition, inOut) {
	var imgObj = $('zoomImg');
	if(imgObj != null) {
		var iWidth = (zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault;
		var iHolderWidth = (imgHolderWidth != null) ? imgHolderWidth : imgHolderWidthDefault;
		var iHeight = (zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault;
		var iHolderHeight = (imgHolderHeight != null) ? imgHolderHeight : imgHolderHeightDefault;
		var iLeft = 0;
		var iTop = 0;
		if(zoomCurrent == 2) { // zoom in to 100%
			iLeft = iHolderWidth / 2 - clickPosition.pX * 3;
			if(iLeft < (iHolderWidth - iWidth)) iLeft = iHolderWidth - iWidth;
			iTop = iHolderHeight / 2 - clickPosition.pY * 3;
			if(iTop < (iHolderHeight - iHeight)) iTop = iHolderHeight - iHeight;
		}
		else if(!inOut && zoomCurrent == 1) { // zoom out to 33%
			iLeft = iHolderWidth / 2 - clickPosition.pX / 3;
			if(iLeft < (iHolderWidth - iWidth / 3)) iLeft = iHolderWidth - iWidth / 3;
			iTop = iHolderHeight / 2 - clickPosition.pY / 3;
			if(iTop < (iHolderHeight - iHeight / 3)) iTop = iHolderHeight - iHeight / 3;
		}
		else if(zoomCurrent == 1) { // zoom in to 33%
			iLeft = iHolderWidth / 2 - iWidth / 3 / iHolderWidth * clickPosition.pX;
			if(iLeft < (iHolderWidth - iWidth / 3)) iLeft = iHolderWidth - iWidth / 3;
			iTop = iHolderHeight / 2 - iHeight / 3 / iHolderHeight * clickPosition.pY;
			if(iTop < (iHolderHeight - iHeight / 3)) iTop = iHolderHeight - iHeight / 3;
		}
		if(iLeft > 0) iLeft = 0;
		if(iTop > 0) iTop = 0;
		imgObj.style.left = iLeft + "px";
		imgObj.style.top = iTop + "px";
	}
}

// set clickPosition to the center of visible part of img
function centerClickImg() {
	var clickPosition = {pX:0, pY:0};
	var imgObj = $('zoomImg');
	var holderObj = $('zoomImgHolder2');
	try {
		var iHolderHeight = holderObj.getHeight();
		clickPosition.pX = holderObj.getWidth() / 2 - imgObj.positionedOffset().left;
		clickPosition.pY = holderObj.getHeight() / 2 - imgObj.positionedOffset().top;
	} catch(err){}
	return clickPosition;
}

// set zoomCurrent and enable/disable zoom buttons
function setCurrent(zCurrent) {
	zoomCurrent = zCurrent;
	var zoomInObj = $('zoomInImg');
	var zoomOutObj = $('zoomOutImg');
	if(zoomInObj != null && zoomOutObj != null) {
		if(zoomCurrent == 0) {
			zoomInObj.setOpacity(1.0);
			zoomOutObj.setOpacity(0.3);
		}
		else if(zoomCurrent == 1) {
			zoomInObj.setOpacity(1.0);
			zoomOutObj.setOpacity(1.0);
		}
		else if(zoomCurrent == 2) {
			zoomInObj.setOpacity(0.3);
			zoomOutObj.setOpacity(1.0);
		}
	}
}

// reload PD img
function reloadZoomImgPD() {
	var imgObj = $('zoomImg');
	if(imgObj != null) {
		imgObj.src = pdImageCurrent;
		imgObj.style.width = '';
		imgObj.style.height = '';
		imgObj.style.left = "0px";
		imgObj.style.top = "0px";
		setCurrent(0);
		Drag.init($('zoomImg'), null, 0, 0, 0, 0);
		imgObj.style.cursor = "pointer"; // change cursor to 'pointer'
	}
}

// reload zoom img
function reloadZoomImg(sImgType) {
	var imgObj = $('zoomImg');
	if(imgObj != null && getImgSrc(sImgType) != "") {
		imgObj.src = getImgSrc(sImgType);
	}
}

//returns img source of type sImgType (PD, PE or PZ) for selected chip and view
function getImgSrc(sImgType, sImgView) {
	var sImgView = (sImgView != null) ? sImgView : getCurrentView(); // get selected view
	var sResult = "";
	if(picker != null && picker.imagesArray != null) {
		var selectedImgArray = picker.imagesArray[getSelectedChip()];
		if(selectedImgArray != null && selectedImgArray[sImgType] != null && selectedImgArray[sImgType][sImgView] != null) {
			sResult = selectedImgArray[sImgType][sImgView];
		}
	}
	return sResult;
}

// returns selected chip id
function getSelectedChip() {
	var sResult = "";
	var selectedChipObj = $$('.selectedColorButton');
	if(selectedChipObj != null && selectedChipObj.length > 0 && selectedChipObj[0] != null) {
		sResult = $$('.selectedColorButton')[0].id;
	}
	return sResult;
}

// get current view
function getCurrentView() {
	var sResult = '';
	try{sResult = $$('#viewsMenu span.selected')[0].id;}catch(err){}
	return sResult;
}

// clicked on zoom img (called from Drag) ==> zoomIn() or zoomLargeIn()
function clickOnImg(eX, eY) {
	// get click spot
	var clickPosition = {pX:0, pY:0};
	
	if(isZoomLarge()) {
		if(zoomLargeCurrent < 2) {
			try {
				clickPosition.pX = eX - Element.viewportOffset($('zoomLargeImg')).left;
				clickPosition.pY = eY - Element.viewportOffset($('zoomLargeImg')).top;
			} catch(err){}
			//alert("clickPosition.pX = " + clickPosition.pX + "\nclickPosition.pY = " + clickPosition.pY);
			zoomLargeIn(clickPosition); // if not 100% already
		}
	}
	else if(zoomCurrent < 2) {
		try {
			clickPosition.pX = eX - Element.viewportOffset($('zoomImg')).left;
			clickPosition.pY = eY - Element.viewportOffset($('zoomImg')).top;
		} catch(err){}
		zoomIn(clickPosition); // if not 100% already
	}
}

/*** zoomLarge **********************************************************************************************************/

// zoomLarge product image
function zoomLarge(eX, eY) {
	setLargeInfo();
	generateLargeView();
		
	try{$('zoomLargeImg').src = getImgSrc('PZ');}catch(err){} // first time zoomLargeViewsMenu the same as viewsMenu
	largeView(getCurrentView());
		
	zoomLargeSwitch(true);
	if(isZoom) {
		setZoomLarge(0); // first time - leave zoom same as in zoomImgHolder (regular)
		$('zoomLargeTools').style.display = 'block';
		Drag.init($('zoomLargeImg'), null, calcLargeLeftCenter()*2, 0, calcLargeTopCenter()*2, 0);
	} else {
		$('zoomLargeTools').style.display = 'none';
	}
}

// zoom in large img; clickPosition is null if called from "+" button
// ==> set clickPosition to the center of visible part of largeImg
function zoomLargeIn(clickPosition) {
	if(zoomLargeCurrent < 2) {
		if(clickPosition == null) clickPosition = centerClickImgLarge();
		if(isZoom){
			setZoomLarge(1, clickPosition);
		}
	}
}

// zoom out large img;
// set clickPosition to the center of visible part of largeImg
function zoomLargeOut() {
	if(zoomLargeCurrent > 0) {
		if(isZoom){
			setZoomLarge(-1, centerClickImgLarge());
		}
	}
}

// reset zoomLarge
function zoomLargeReset() {
	zoomReset();
	setZoomLarge(-2);
}

// switch for large zoom/pan
function zoomLargeSwitch(flag) {
	var headerBC_PREV_NEXTObj = $('headerBC_PREV_NEXT');
	var pdetailCenterObj = $('pdetailCenter');
	var contentZoomLargeHolderObj = $('contentZoomLargeHolder');
	var zoomLargeHeaderObj = $('zoomLargeHeader');
	var leftNavObj = $('leftNav');
	var productGraphicsObj = $('productGraphics');
	var crossSellmessageObj = $('crossSellmessage');
	var crossSellObj = $('crossSell');
	var socialFriendsLikeObj = $('socialFriendsLike');
	var soldOutImgHolderObj = $('soldOutImgHolder');
	var pdpcertonaHolderObj = $('pdpcertonaHolder');
	if(pdetailCenterObj != null && contentZoomLargeHolderObj != null) {
		if(flag) { // zoom mode
			pdetailCenterObj.style.display = "none";
			try{headerBC_PREV_NEXTObj.style.display = "none";}catch(err){}
			try{leftNavObj.style.display = "none";}catch(err){}
			try{productGraphicsObj.style.display = "none";}catch(err){} // not to hide crossSellmessage for RR
			try{crossSellmessageObj.style.display = "none";}catch(err){}
			try{crossSellObj.style.display = "none";}catch(err){}
			try{socialFriendsLikeObj.style.display = "none";}catch(err){}
			try{pdpcertonaHolderObj.style.display = "none";}catch(err){}
			soldOutImgHolderFlag = jQuery('#soldOutImgHolder').is(':visible');
			try{soldOutImgHolderObj.style.display = "none";}catch(err){}
			contentZoomLargeHolderObj.style.display = "block";
			try{zoomLargeHeaderObj.setOpacity(0.7);}catch(err){} // IE6 fix
		}
		else { // regular mode
			pdetailCenterObj.style.display = "block";
			try{headerBC_PREV_NEXTObj.style.display = "block";}catch(err){}
			try{leftNavObj.style.display = "block";}catch(err){}
			try{productGraphicsObj.style.display = "block";}catch(err){}
			try{crossSellmessageObj.style.display = "block";}catch(err){}
			try{crossSellObj.style.display = "block";}catch(err){}
			try{socialFriendsLikeObj.style.display = "block";}catch(err){}
			try{pdpcertonaHolderObj.style.display = "block";}catch(err){}
			if($('isProductSoldOut') && $('isProductSoldOut').value == 'yes'){try{soldOutImgHolderObj.style.display = "block";}catch(err){}}
			contentZoomLargeHolderObj.style.display = "none";
		}
	}
}

// sets the img zoomLarge ~33% (width fit), 50% or 100%;
// zoom in - if flag == 1, zoom out - if flag == -1, same as small img - if flag == 0
// reset to width fit - if flag == -2
function setZoomLarge(flag, clickPosition) {
	var imgLargeObj = $('zoomLargeImg');
	if(imgLargeObj != null) {
		imgLargeObj.style.cursor = 'move';
		var imgWidth = (zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault;
		var imgHeight = (zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault;
		if((zoomCurrent == 1 && flag == 0) || (zoomLargeCurrent == 2 && flag == -1) || (zoomLargeCurrent == 0 && flag == 1)) { // zoom to 50%
			imgLargeObj.style.width = imgWidth / 2 + "px";
			imgLargeObj.style.height = imgHeight / 2 + "px";
			setLargeCurrent(1);
			Drag.init($('zoomLargeImg'), null, calcLargeLeftCenter()*2, 0, calcLargeTopCenter()*2, 0);
		}
		else if((zoomCurrent == 2 && flag == 0) || (zoomLargeCurrent == 1 && flag == 1)) { // zoom to 100%
			imgLargeObj.style.width = imgWidth + "px";
			imgLargeObj.style.height = imgHeight + "px";
			setLargeCurrent(2);
			Drag.init($('zoomLargeImg'), null, calcLargeLeftCenter()*2, 0, calcLargeTopCenter()*2, 0);
		}
		else if(zoomCurrent == 0 || flag == -2 || (zoomLargeCurrent == 1 && flag == -1)) { // reset to width fit
			setLargeCurrent(0);
			imgLargeObj.style.width = imgWidth * zoomDegree() + "px";
			imgLargeObj.style.height = imgHeight * zoomDegree() + "px";
			Drag.init($('zoomLargeImg'), null, calcLargeLeftCenter()*2, 0, calcLargeTopCenter()*2, 0);
		}
		
		if(clickPosition != null) positionLargeImg(clickPosition, flag); // center on the click
		else if(flag == 0 && zoomCurrent > 0) positionSame(); // position to the same spot as regular view
		else centerLargeImg(); // center img
	}
}
function simpleShow() {
	var imgLargeObj = $('zoomLargeImg');
	var imgWidth = (zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault;
	var imgHeight = (zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault;
	if(imgLargeObj != null) {
		imgLargeObj.style.width = imgWidth + "px";
		imgLargeObj.style.height = imgHeight + "px";
		imgLargeObj.style.top = '50px';
		imgLargeObj.style.left = '150px';
		imgLargeObj.style.cursor = 'default';
		imgLargeObj.onmousedown = null;
		document.onmousemove	= null;
		document.onmouseup		= null;
	}
}
//centers zoom img
function centerLargeImg() {
	var imgLargeObj = $('zoomLargeImg');
	if(imgLargeObj != null) {
		imgLargeObj.style.left = (zoomCurrent == 0) ? "0px" : calcLargeLeftCenter() + "px";
		imgLargeObj.style.top = calcLargeTopCenter() + "px";
	}
}

// calculate imgObj.style.left for zoomLargeImg
function calcLargeLeftCenter() {
	var obj = $('zoomLargeImgHolder');
	return -1 * (((zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault) * zoomDegree() - ((obj != null) ? obj.getWidth() : 600)) / 2;
}

// calculate imgObj.style.top for zoomLargeImg
function calcLargeTopCenter() {
	var obj = $('zoomLargeImgHolder');
	return -1 * (((zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault) * zoomDegree() - ((obj != null) ? obj.getHeight() : 500)) / 2;
}

// zoomLarge to the click spot; if zoomOut ==> flag = -1; if zoomIn ==> flag = 1
function positionLargeImg(clickPosition, flag) {
	var imgObj = $('zoomLargeImg');
	var holderObj = $('zoomLargeImgHolder');
	try {
		var iWidth = ((zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault) * zoomDegree();
		var iHolderWidth = holderObj.getWidth();
		var iHeight = ((zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault) * zoomDegree();
		var iHolderHeight = holderObj.getHeight();
		var iZoomCoefficient = zoomCoefficient(flag);
		var iLeft = iHolderWidth / 2 - clickPosition.pX * iZoomCoefficient; // zoom in
		if(flag < 0) iLeft = iHolderWidth / 2 - clickPosition.pX / iZoomCoefficient; // zoom out
		var iTop = iHolderHeight / 2 - clickPosition.pY * iZoomCoefficient; // zoom in
		if(flag < 0) iTop = iHolderHeight / 2 - clickPosition.pY / iZoomCoefficient; // zoom out
		if(iLeft > 0) iLeft = 0;
		else if(iLeft < (iHolderWidth - iWidth)) iLeft = iHolderWidth - iWidth;
		if(iTop > 0) iTop = 0;
		else if(iTop < (iHolderHeight - iHeight)) iTop = iHolderHeight - iHeight;
		imgObj.style.left = iLeft + "px";
		imgObj.style.top = iTop + "px";
	} catch(err){}
}

// position zoomLargeImg same as zoomImg
function positionSame() {
	try {
		var imgObj = $('zoomLargeImg');
		var holderObj = $('zoomLargeImgHolder');
		var regImgObj = $('zoomImg');
		var iWidth = ((zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault) * zoomDegree();
		var iHolderWidth = holderObj.getWidth();
		var iHeight = ((zoomImgHeight != null) ? zoomImgHeight : zoomImgHeightDefault) * zoomDegree();
		var iHolderHeight = holderObj.getHeight();
		var iRegHolderWidth = (imgHolderWidth != null) ? imgHolderWidth : imgHolderWidthDefault;
		var iRegHolderHeight = (imgHolderHeight != null) ? imgHolderHeight : imgHolderHeightDefault;
		var iLeft = parseInt(regImgObj.style.left) + (iHolderWidth - iRegHolderWidth) / 2;
		var iTop = parseInt(regImgObj.style.top) + (iHolderHeight - iRegHolderHeight) / 2;
		if(iLeft > 0) iLeft = 0;
		else if(iLeft < (iHolderWidth - iWidth)) iLeft = iHolderWidth - iWidth;
		if(iTop > 0) iTop = 0;
		else if(iTop < (iHolderHeight - iHeight)) iTop = iHolderHeight - iHeight;
		imgObj.style.left = iLeft + "px";
		imgObj.style.top = iTop + "px";
	} catch(err){}
}

// set clickPosition to the center of visible part of largeImg
function centerClickImgLarge() {
	var clickPosition = {pX:0, pY:0};
	var imgObj = $('zoomLargeImg');
	var holderObj = $('zoomLargeImgHolder');
	try {
		var iHolderHeight = holderObj.getHeight();
		clickPosition.pX = holderObj.getWidth() / 2 - imgObj.positionedOffset().left;
		clickPosition.pY = holderObj.getHeight() / 2 - imgObj.positionedOffset().top;
	} catch(err){}
	return clickPosition;
}

// set zoomLargeCurrent and enable/disable zoomLarge buttons
function setLargeCurrent(zlCurrent) {
	zoomLargeCurrent = zlCurrent;
	var zoomLargeInObj = $('zoomLargeInImg');
	var zoomLargeOutObj = $('zoomLargeOutImg');
	if(zoomLargeInObj != null && zoomLargeOutObj != null) {
		if(zoomLargeCurrent == 0) { // width fit
			zoomLargeInObj.setOpacity(1.0);
			zoomLargeOutObj.setOpacity(0.3);
		}
		else if(zoomLargeCurrent == 1) { // 50%
			zoomLargeInObj.setOpacity(1.0);
			zoomLargeOutObj.setOpacity(1.0);
		}
		else if(zoomLargeCurrent == 2) { // 100%
			zoomLargeInObj.setOpacity(0.3);
			zoomLargeOutObj.setOpacity(1.0);
		}
	}
}

// set zoomLargeProductLineName and zoomLargeDisplayNameAndPrice info
function setLargeInfo() {
	try{$('zoomLargeProductLineName').innerHTML = $('productLineName').innerHTML;}catch(err){}
	try{
		$('zoomLargeDisplayNameAndPrice').innerHTML = $('displayNameAndPrice').innerHTML;
		jQuery("#zoomLargeHeader #nameShipDate").attr("style", "display:block;").addClass("shipColor");
	}catch(err){}
}

// generate viewsMenu for zoomLarge
function generateLargeView() {
	//try{$('zoomLargeViewsMenu').innerHTML = $$('#viewsMenu span.imageTypeSelector').innerHTML;}catch(err){}
	var zoomLargeViewsMenuObj = $('zoomLargeViewsMenu');
	var filteredView = filterView();
	if(zoomLargeViewsMenuObj != null && filteredView != null && filteredView.length > 0) {
		var newInnerHtml = '';
		for(var i = 0; i < filteredView.length; i++) {
			newInnerHtml += "<span class='imageLargeTypeSelector'><a href='javascript:largeView(\"" + filteredView[i] + "\");' class='view" + filteredView[i] + "'>" + filteredView[i].replace('_',' ') + "</a></span>";
			if(i < filteredView.length - 1) newInnerHtml += "<span class='dividerBar'>|</span>";
		}
		zoomLargeViewsMenuObj.innerHTML = newInnerHtml;
	}
}

// called from zoomLargeViewsMenu links
function largeView(sView) {
	// reload img for selected sView
	reloadZoomLargeImg(sView);
	centerLargeImg();
	
	// bold zoomLargeViewsMenu link
	var cssRule = '.imageLargeTypeSelector .view' + sView;
	try{
		$$('.imageLargeTypeSelector a').each(function(element){element.style.fontWeight = "normal"}); // reset all links
		$$(cssRule)[0].style.fontWeight = "bold";
	}catch(err){}
	if(!isZoom){
		simpleShow();
	}
}

// reload zoom img for selected sView
function reloadZoomLargeImg(sView) {
	var imgLargeObj = $('zoomLargeImg');
	if(imgLargeObj != null && getImgSrc('PZ', sView) != "") {
		imgLargeObj.src = getImgSrc('PZ', sView);
	}
}

// takes existing view, and checks if there is a PZ img for those views
function filterView() {
	var imgArray = new Array();
	try{imgArray = Object.keys(picker.imagesArray[getSelectedChip()]['PZ']);}catch(err){}
	
	var viewArray = new Array();
	try {
	$$('#viewsMenu span.imageTypeSelector').each(function(element){
	  viewArray[viewArray.length] = element.id;
	});
	}catch(err){}
	
	return viewArray.intersect(imgArray);
}

// is zoomLarge is open
function isZoomLarge() {
	var bResult = false;
	try{if($('contentZoomLargeHolder').style.display == "block") bResult = true;}catch(err){}
	return bResult;
}

// calculates zoom degree: for 100% returns 1.0, for 50% - 0.5, for width wide - imgHolderWidth/imgWidth
function zoomDegree() {
	var nResult = 1;
	if(zoomLargeCurrent == 1) nResult = 0.5;
	else if(zoomLargeCurrent == 0) nResult = zoomLargeImgHolderWidth / ((zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault);
	return nResult;
}

// calculates zoom coefficient
function zoomCoefficient(flag) {
	var nResult = 1;
	if(flag > 0) {
		if(zoomLargeCurrent == 2) nResult = 2; // from 50% to 100%
		else if(zoomLargeCurrent == 1) nResult = 0.5 / (zoomLargeImgHolderWidth / ((zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault)); // from fit-to-width to 50%
	}
	else if(flag < 0) {
		if(zoomLargeCurrent == 1) nResult = 2; // from 100% to 50%
		else if(zoomLargeCurrent == 0) nResult = 0.5 / (zoomLargeImgHolderWidth / ((zoomImgWidth != null) ? zoomImgWidth : zoomImgWidthDefault)); // from 50% to fit-to-width
	}
	return nResult;
}


/**************************************************
 * dom-drag.js
 * 09.25.2001
 * www.youngpup.net
 * Script featured on Dynamic Drive (http://www.dynamicdrive.com) 12.08.2005
 **************************************************
 * 10.28.2001 - fixed minor bug where events
 * sometimes fired off the handle, not the root.
 **************************************************/

var Drag = {

	obj : null,

	init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
	{
		o.onmousedown	= Drag.start;

		o.hmode			= bSwapHorzRef ? false : true ;
		o.vmode			= bSwapVertRef ? false : true ;

		o.root = oRoot && oRoot != null ? oRoot : o ;

		if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
		if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
		if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
		if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

		o.minX	= typeof minX != 'undefined' ? minX : null;
		o.minY	= typeof minY != 'undefined' ? minY : null;
		o.maxX	= typeof maxX != 'undefined' ? maxX : null;
		o.maxY	= typeof maxY != 'undefined' ? maxY : null;

		o.xMapper = fXMapper ? fXMapper : null;
		o.yMapper = fYMapper ? fYMapper : null;

		o.root.onDragStart	= new Function();
		o.root.onDragEnd	= new Function();
		o.root.onDrag		= new Function();
	},

	start : function(e)
	{
		var o = Drag.obj = this;
		e = Drag.fixE(e);
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		o.root.onDragStart(x, y);

		o.lastMouseX	= e.clientX;
		o.lastMouseY	= e.clientY;
		
		o.Xbuf = e.clientX;
		o.Ybuf = e.clientY;

		if (o.hmode) {
			if (o.minX != null)	o.minMouseX	= e.clientX - x + o.minX;
			if (o.maxX != null)	o.maxMouseX	= o.minMouseX + o.maxX - o.minX;
		} else {
			if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
			if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
		}

		if (o.vmode) {
			if (o.minY != null)	o.minMouseY	= e.clientY - y + o.minY;
			if (o.maxY != null)	o.maxMouseY	= o.minMouseY + o.maxY - o.minY;
		} else {
			if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
			if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove	= Drag.drag;
		document.onmouseup		= Drag.end;

		return false;
	},

	drag : function(e)
	{
		e = Drag.fixE(e);
		var o = Drag.obj;

		var ey	= e.clientY;
		var ex	= e.clientX;
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		var nx, ny;

		if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
		if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
		if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
		if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

		nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
		ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

		if (o.xMapper)		nx = o.xMapper(y)
		else if (o.yMapper)	ny = o.yMapper(x)

		Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
		Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
		Drag.obj.lastMouseX	= ex;
		Drag.obj.lastMouseY	= ey;

		Drag.obj.root.onDrag(nx, ny);
		return false;
	},

	end : function(e)
	{
		e = Drag.fixE(e);
		var o = Drag.obj;
		if(o.Ybuf == e.clientY && o.Xbuf == e.clientX) clickOnImg(o.Xbuf, o.Ybuf);
		
		document.onmousemove = null;
		document.onmouseup   = null;
		Drag.obj.root.onDragEnd(	parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
									parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
		Drag.obj = null;
	},

	fixE : function(e)
	{
		if (typeof e == 'undefined') e = window.event;
		if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
		if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
		return e;
	},
	
	Xbuf : null,
	Ybuf : null
};

