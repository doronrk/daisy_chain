/*
Script: productdetail.js
version: v1.0.10
*/
var tsz15042;
var waitListAll = false;
var ctmbAttr = getUserAttrCookie();
var secureLargeImagePath = 'https://images.qvc.com/is/image';
var largeImagePath = 'http://images.qvc.com/is/image';

function openBox() {
	TB_show('','/wcsstore/RAPIDStorefrontAssetStore/Snippets/Catalog/CatalogEntryDisplay/popupProductDetail.jsp?keepThis=true&TB_iframe=true&height=659&width=647', false);
}
var expandButtonPress=function() {
	openBox();
};
//Service Contracts - SquareTrade 2/9/2010
//include file="../../../content/javascript/resaleWidget.js"
function displaySTWidget() {
	try{
		if ((get.id('divProductDetailDescriptionAreaDisplay1').innerHTML) != null) {
			var itemLongDesc = shortDesc + " " + get.id('divProductDetailDescriptionAreaDisplay1').innerHTML;
			var qPrice = get.id('parProductDetailPrice').innerHTML;
			var patt=/[$,<span class="superscript"></span>]/gi;
			qPrice = qPrice.replace(patt,'');
														 		
			st_resale.createProductPageWidget({itemCategory: classCode,itemPrice: qPrice,itemSKU: ItemNumber,itemCondition: 'New',swfFilePath: '/wcsstore/RAPIDStorefrontAssetStore/javascript/',itemDescription: itemLongDesc});
		}
	}catch(err){
		//Handle errors here
	}
}
$(function(){
	displaySTWidget();
});
//<detail_shipcalc.js>
function loadZip() {
	// RW 10-06-05 Ship Calc
	//Get the zip code from the cookie	
	var allCookies = document.cookie;   
	if (allCookies == "") return true;
	//Now extract just the cookie we want
	var start = allCookies.indexOf("ShipCalc=");
	if(start == -1) return true;
	start += 9; //skip over name and equals sign
	var end = allCookies.indexOf(';',start);
	if(end == -1) end = allCookies.length;
	var cookieval = allCookies.substring(start, end);  
	//Set the value in the form
	document.getElementById('txtDeliveryZipCode').value = cookieval;
}
var defaultShipMethod = null;
var shhDiscountCd = null;
var shhDiscF = null;
var shhTxtFREE = null;
//Called by Product Detail Page for displaying the EDDs
function validateZIP0(defShipMethod, shhDiscCd, discCodeF, txtFREE) {
	defaultShipMethod = defShipMethod;
	shhDiscountCd = shhDiscCd;
	shhDiscF = discCodeF;
	shhTxtFREE = txtFREE;
	validateZIP();
}

function validateZIP() {
	
	var zip = trimAll((document.getElementById("txtDeliveryZipCode").value).replace(/\s+/g,''));
	var shipDiv = get.id('divDeliveryDateEstimateResults');
	var valid = "0123456789-";
	var hyphencount = 0;

	while (shipDiv.childNodes.length>0){
		shipDiv.removeChild(shipDiv.lastChild);
	}
	document.getElementById("errDeliveryDateEstimateZipCode").style.display = "none";
	var newp0 = document.createElement('p');
	var newp0t;
	if ( validateZipPostalCodeInput(zip) || validateExtendZipPostalCodeInput(zip) ){				
		callShipCalc(zip, GroupNumber, ItemIdn, waitlistSW, displayShipData);
	}else{
		newp0t = document.createTextNode("To choose your shipping method, add this item to your Shopping Cart, continue to Standard Check-Out, and make your selection on the Shipping Method page.");
		newp0.appendChild(newp0t);
		shipDiv.appendChild(newp0);
		document.getElementById("errDeliveryDateEstimateZipCode").innerHTML = "We're sorry, the postal code you entered is invalid. Please enter a 5 digit zipcode.";
		document.getElementById("errDeliveryDateEstimateZipCode").style.display = "block";
		return false;				
	}
		
		return false;
}

function displayShipData(shipDataObj) {
	var shipDiv = get.id('divDeliveryDateEstimateResults');

	while (shipDiv.childNodes.length>0){
		shipDiv.removeChild(shipDiv.lastChild);
	}
	document.getElementById("errDeliveryDateEstimateZipCode").style.display = "none";
	
	var newp0 = document.createElement('p');
	var newp0t = document.createTextNode("To choose your shipping method, add this item to your Shopping Cart, continue to Standard Check-Out, and make your selection on the Shipping Method page. ");
	newp0.appendChild(newp0t);
	shipDiv.appendChild(newp0);
	
	if (shipDataObj.error) {
		document.getElementById("errDeliveryDateEstimateZipCode").innerHTML = shipDataObj.error;
		document.getElementById("errDeliveryDateEstimateZipCode").style.display = "block";
	}
	else {
		var shipData = shipDataObj.data.shipLines;
		var ucTable = document.createElement("table");
		ucTable.setAttribute('id','tblshipping');
		ucTable.setAttribute('width','100%');
		ucTable.setAttribute('border','0');
		ucTable.setAttribute('cellpadding','0');
		ucTable.setAttribute('cellspacing','0');
		
		var thead = document.createElement('thead');
		var newth  = document.createElement('tr');
		var newth1 = document.createElement('th');
		newth1.appendChild(document.createTextNode("Shipping Method*"));
		newth.appendChild(newth1);
		var newth2 = document.createElement('th');
		newth2.appendChild(document.createTextNode("Price Estimated"));
		newth.appendChild(newth2);
		var newth3 = document.createElement('th');
		newth3.appendChild(document.createTextNode("Delivery Date**"));
		newth.appendChild(newth3);
		thead.appendChild(newth);
		ucTable.appendChild(thead); 

		var tbody = document.createElement('tbody');
		for(i=0;i<shipData.length;i++) {
			if(shipData[i]) {
				var newtr = document.createElement('tr');
				newtr.className = 'bggrey';
				var newtx1 = "";
				newtx1 = document.createTextNode(shipData[i].desc);
				var newtd1 = document.createElement('td');
				var newtx2 = "";
				newtx2 = document.createTextNode(shipData[i].price);

				if (shipData[i].price == ".00")
					newtx2 = document.createTextNode("0.00");
				if (defaultShipMethod != null && defaultShipMethod == shipData[i].desc && 
						shhDiscountCd != null && shhDiscountCd == shhDiscF)
					newtx2 = document.createTextNode(shhTxtFREE);

				var newtd2 = document.createElement('td');
				var newtx3 = "";
				newtx3 = document.createTextNode(shipData[i].EDD);
				var newtd3 = document.createElement('td');
									
				newtd1.appendChild(newtx1);
				newtr.appendChild(newtd1);
				newtd2.appendChild(newtx2);
				newtr.appendChild(newtd2);
				newtd3.appendChild(newtx3);
				newtr.appendChild(newtd3);
				tbody.appendChild(newtr);			   
			}
		}
		ucTable.appendChild(tbody); 
		if (!(document.getElementById('deliverydisclaimId1'))) {
			var newp1 = document.createElement('p');
			newp1.setAttribute('id','deliverydisclaimId1');
			var newp1t = document.createTextNode("* Some shipping methods are not available to all addresses.");
			newp1.appendChild(newp1t);
			var newp2 = document.createElement('p');
			newp2.setAttribute('id','deliverydisclaimId2');
			var newp2ta = document.createTextNode("** Estimated Delivery Date includes the additional days to process your order prior to shipment. Estimated Delivery Dates based on credit card orders and member credits only. Check or Money Orders will alter delivery dates. For full information on QVCs Shipping & Handling, visit our ");
			var newp2tb = document.createTextNode(" page.");
			var newp2a = document.createElement('a');
			newp2a.setAttribute("href", "javascript:TB_show('', '"+ CONTENT_PATH + "popups/Shipping_Info.html?height=400&width=725', true);");
			newp2a.setAttribute('id','shipfaqanchor');
			var newp2at = document.createTextNode("Shipping Information");
			newp2a.appendChild(newp2at);
			newp2.appendChild(newp2ta);
			newp2.appendChild(newp2a);
			newp2.appendChild(newp2tb);

			shipDiv.appendChild(ucTable);
			shipDiv.appendChild(newp1);
			shipDiv.appendChild(newp2);
			document.getElementById('deliverydisclaimId1').className="deliverydisclaim";
			document.getElementById('deliverydisclaimId2').className="deliverydisclaim";
			document.getElementById('shipfaqanchor').className="underline";
		}
	}
	stripe(document.getElementById('tblshipping'));
	TB_init();
}

function translateHours(aNum) {
	if (aNum == 0) {
		return 'Midnight';
	}
	if (aNum == 12) {
		return 'Noon';
	}
	else {
		if (aNum > 12) {
			return (aNum - 12).toString() + ' p.m.';
		}
		else {
			return aNum.toString() + ' a.m.';
		}
	}
}

//</detail_shipcalc.js>
//<QYahBuilder.js>

<!--
function QYahBuilder(yahID) {
	this.gt="&gt;";
	this.curYahDiv="";
	this.curYahClass="";
	this.lastYah="";
	this.lastYahLink="";
	this.newYahDiv="";
	this.newLastYah="";

    this.getNewYah =
	function(){
		var yah = document.getElementById(yahID);
		if (yah != null){
			this.curYahDiv = yah.innerHTML;
			this.curYahClass = (this.curYahClass.length>0)? this.curYahClass:yah.className;
			if (this.curYahDiv.length>0){
			   var s = this.curYahDiv.lastIndexOf(this.gt);
			   this.lastYah = (s == -1)? this.curYahDiv : this.curYahDiv.substring(s+this.gt.length);
			   if (this.newLastYah!=""){
			      this.lastYahLink = this.lastYah.link(this.lastYahLink);
			      this.newYahDiv = this.curYahDiv.replace(this.lastYah,this.lastYahLink);
			      this.newYahDiv += " "+this.gt+" "+this.newLastYah;
			   }else{
			      this.newYahDiv = this.curYahDiv;
			   }
			}
		}
		var divTag = "<div id='" + yahID;
		divTag += (this.curYahClass.length>0)? "' class='" + this.curYahClass + "'>":"'>";
		this.newYahDiv = divTag + this.newYahDiv + "</div>";
		return this.newYahDiv;
	};
}
//-->
//</QYahBuilder.js>
//<fastnav.js>

function groupnav( itemnum, tpl, navlist, showtsvbutton )
{
	if (top.topFrame) {
		top.topFrame.open_pd('/scripts/detail.dll?item=' + itemnum + '&tpl=detailensembles');
	}
	else {
		copyYAHToNavGroup();
		document.fNavGroup.item.value=itemnum;
		document.fNavGroup.navlist.value=navlist;
		document.fNavGroup.tpl.value=tpl;
		document.fNavGroup.showtsvbutton.value=showtsvbutton;
		document.fNavGroup.sc.value="";
		document.fNavGroup.cc.value="";
		document.fNavGroup.submit();
	}
}

function cm_detailnav(itemnum, prevnext)
{
    document.fNav.item.value=itemnum;
	document.fNav.sc.value="";
	document.fNav.cc.value="";
	// need to build the form's action so that PREV or NEXT is set for coremetrics
	document.fNav.action += prevnext
	document.fNav.submit();
}

function JLnav(c, t, m)
{
	var qYah = new QYahBuilder("yahDiv");
	qYah.curYahClass = "yah";
	qYah.lastYahLink = '/qic/qvcapp.aspx/app.detail/params.item.{ProdID}';
	qYah.newLastYah = m;
	document.getElementById('yahForm').comensids.value = c;
	document.getElementById('yahForm').ensembleterm.value = m;
	document.getElementById('yahForm').Qyah.value = qYah.getNewYah();
	document.getElementById('yahForm').submit();
}

function detailnav1( itemnum,cc,sc )
{
	document.fNav.elements[0].value=itemnum;
	document.fNav.elements[1].value="detail";
	document.fNav.elements[2].value=sc;
	document.fNav.elements[3].value=cc;
	document.fNav.submit();
}

function copyYAHToNavGroup() {
	if (document.fNav) {
		document.fNavGroup.yahlevel.value = document.fNav.yahlevel.value;
		document.fNavGroup.yahclass.value = document.fNav.yahclass.value;
		document.fNavGroup.yahnames.value = document.fNav.yahnames.value;
		document.fNavGroup.yahparent.value = document.fNav.yahparent.value;
		document.fNavGroup.yahsub.value = document.fNav.yahsub.value;
		document.fNavGroup.yahsort.value = document.fNav.yahsort.value;
		document.fNavGroup.yahsearchterm.value = document.fNav.yahsearchterm.value;
	}
}

//</fastnav.js>
//<proddetails.js>
var sizeArr = new Array();
var colorArr = new Array();
var sizeArr_el;
var colorArr_el;
var activeColor = null;
var activeSize = null;
var imgLoaded = false;
var imgViewLoaded = false;
var defaultImg = "";
var loadedViewImages = new Array();
var loadedSwatchImages = new Array();
var selectedThumbImage = "";
var currProd;
$(function(){intSizeBoxes = function (){
	sizeArr=$("#ulProductSizeList li");
	colorArr=$("#ulProductColorList li");
		
	intButtons(sizeArr, 'size');
	intButtons(colorArr, 'color');
	resetButtons(colorArr);
	resetButtons(sizeArr);
	
	if(colorArr.length == 1){
		lock(colorArr, colorArr[0], colorArr[0].set);
	}
	
	if(sizeArr.length == 1){
		lock(sizeArr, sizeArr[0], sizeArr[0].set);
	
	}
	
}});

$(function(){
	intSizeBoxes();
});

function getArrValues(aColor, aSize) {
	if (!aColor && !aSize)
		return;
	if (!aColor) {
		for (var i=0; i<arrColorIndex.length; i++) {
			if (arrColorIndex[i] == aSize) {
				return arrColorValues[i][0];
			}
		}
	}
	else if (!aSize) {
		for (var i=0; i<arrSizeIndex.length; i++) {
			if (arrSizeIndex[i] == aColor) {
				return arrSizeValues[i][0];
			}
		}
	}
	else {
		for (var i=0; i<arrColorIndex.length; i++) {
			if (arrColorIndex[i] == aSize) {
				for (var j=0; j<arrColorValues[i].length; j++) {
					var ccode = arrColorValues[i][j].split(':')[2];
					if (ccode == aColor) {
						return arrColorValues[i][j];
					}
				}
			}
		}
	}
}

function preSelectSizeAndColor() {
	var itemId = determineItemId();
	if (itemId) {
		var size = determineSizeByItemId(itemId, 3);
		if (size) {
			// set size
			for (var i = 0; i < sizeArr.length; i++) {
				var sizeObj = sizeArr[i];
				if (sizeObj && sizeObj.getAttribute('id').toUpperCase() == size.toUpperCase()) {
					select(sizeObj);
					lock(sizeArr, sizeObj, sizeObj.set);
					break;
				}
			}
		}
		fieldIndex = 2;
		if (!size) {
			fieldIndex = 3;
		}
		
		var color = determineColorByItemId(itemId, fieldIndex);
		if (color) {
			// set color
			for (var i = 0; i < colorArr.length; i++) {
				var colorObj = colorArr[i];
				if (colorObj && colorObj.getAttribute('id').toUpperCase() == color.toUpperCase()) {
					select(colorObj);
					lock(colorArr, colorObj, colorObj.set);
					break;
				}
			}
		}
	}
}

function determineItemId() {
	var query = window.location.search.substring(1);
	var nvps = query.split("&");
	for (i=0;i<nvps.length;i++) {
		nvp = nvps[i].split("=");
		if (nvp[0] == "itemId") {
			return nvp[1];
		}
	}
}

function determineSizeByItemId(itemId, fieldIndex) {
	if (arrColorValues) {
		for(var i = 0; i < arrColorValues.length; i++) {
			for (var j = 0; j < arrColorValues[i].length; j++) {
				if (arrColorValues[i][j].indexOf(itemId) == 0) {
					return arrColorValues[i][j].split(":")[fieldIndex];
				}
			}
		}
	}
}

function determineColorByItemId(itemId,fieldIndex) {
	if (arrSizeValues) {
		for(var i = 0; i < arrSizeValues.length; i++) {
			for (var j = 0; j < arrSizeValues[i].length; j++) {
				if (arrSizeValues[i][j].indexOf(itemId) == 0) {
					return arrSizeValues[i][j].split(":")[fieldIndex];
				}
			}
		}
	}
}

function open_window(url, specs, name)
{
	if (name == null || name == "")
	{
		name = "win";
	}

	var new_win = window.open(url, name, specs);
	new_win.focus();
}

var resetButtons=function(Arr){
	Arr.each(function(index, obj){
		if(obj.active){
			obj.onclick=function(){lock(Arr, this, this.set); return false;};
			if(typeof platform != "undefined" && null != platform && !platform.mobile) obj.onmouseover=function(){hover(this, this.set);};
			obj.onmouseout=function(){active(this, this.set);};
			obj.lock=false;
			active(obj);
		}
		else if(!obj.active){
			obj.onclick=function(){return null;};
			if(typeof platform != "undefined" && null != platform && !platform.mobile) obj.onmouseover=function(){hover(this, this.set);};
			obj.onmouseout=function(){active(this, this.set);};
		}

		if(obj.selectedItem){
			if(obj.set == 'size'){
				activeSize = obj;
			}
			if(obj.set == 'color'){
				activeColor = obj;
			}
			select(obj);
			obj.onclick=function(){resetButtons(Arr, obj.set); return false;};
			obj.onmouseover=function(){return null;};
			obj.onmouseout=function(){return null;};
			obj.lock=true;
		}		
	});
}

var resetArray=function(Arr){	
	Arr.each(function(index, obj){
		if(obj.active){
			if(obj.selectedItem){
				if(obj.set == 'size'){
					activeSize = obj;
				}
				if(obj.set == 'color'){
					activeColor = obj;
				}
				select(obj);
				obj.onclick=function(){resetButtons(Arr, obj.set); return false;};
				obj.onmouseover=function(){return null;};
				obj.onmouseout=function(){return null;};
				obj.lock=true;
			}
			else{
				if(obj.status=='waitlist'){
					waitlist(obj);
				}
				else if(obj.status=="disabled"){
					disable(obj);
				}
				else if (obj.status=="enabled"){
					enable(obj);
				}
				obj.onclick=function(){lock(Arr, this, this.set); return false;};
				if(typeof platform != "undefined" && null != platform && !platform.mobile) obj.onmouseover=function(){hover(this, this.set);};
				obj.onmouseout=function(){active(this, this.set);};
				obj.lock=false;
			}
		}
		else if(!obj.active){
			obj.onclick=function(){return null;};
			if(typeof platform != "undefined" && null != platform && !platform.mobile) obj.onmouseover=function(){hover(this, this.set);};
			obj.onmouseout=function(){active(this, this.set);};
		}
	});
}

//for each color and size selection button, assign those properties by information from shtml file
//status, enable or others
//set, color or size
//active, true for active and waitlist, false for others
var intButtons=function(Arr, set){
	Arr.each(function(index, obj){
		obj.set = set;
		obj.status = determineDefaultStatus(obj);
		
		if (obj.status == "enabled"){obj.active=true;}
		else if(obj.status=="waitlist"){obj.active=true;}
		else{
			obj.active=false;
			disable(obj);
		}
	});
}

var determineDefaultStatus = function(obj) {
	var indexArray;
	var valueArray;
	if(obj.set == 'size'){
		indexArray = arrColorIndex;
		valueArray = arrColorValues;
	}
	if(obj.set == 'color'){
		indexArray = arrSizeIndex;
		valueArray = arrSizeValues;
	}
	var result = "disabled";
	if (indexArray != null) {
		for(var i=0;i<indexArray.length;i++) {
			if (indexArray[i] == obj.id.toUpperCase()) {
				values = valueArray[i];
				if (values != null) {
					for(var x=0;x<values.length;x++) {
						var temp = values[x].split(':');
						if (temp[1] == 'Y') {
							result = "enabled";
							obj.advancedMessage = '';

							if (!(get.id('divProductDetailSelectSizeOptions')) || !(get.id('divProductDetailSelectColorOptions'))) {
								if (temp[9] && temp[9].trim() != '') {
									obj.advancedMessage = temp[9].trim();
								}
							}

							break;
						}
						else if (temp[1] == 'W') {
							result = "waitlist";
						}
					}
				}
				break;
			}
		}
	}
	return result;
}

var setProductImg = function(color) {
	if(!imgLoaded) return;
	var img = document.getElementById('imageID');
	for (i=0; i < loadedSwatchImages.length; i++) {
		if (loadedSwatchImages[i] && loadedSwatchImages[i].src.indexOf('_'+color) > -1) {
			img.src = loadedSwatchImages[i].src;
			return;
		}
	}
	if ($('#'+color+' img:first-child').attr('src').indexOf('noImage') == -1) {
		img.src = getFullProdImagePath(defaultImg, color); 
	}
}

var active=function(obj){
    // assume no Status Message until we need to display one
	SetAvailabilityMessage("none");
	
	if(obj.status=='waitlist'){
		waitlist(obj);
	}
	else if(obj.status=="disabled"){
		disable(obj);
	}
	else if (obj.status=="enabled"){
		enable(obj);
	}
	// have we "unchecked" the button?
	if (obj==activeColor) {
		activeColor=null;
		obj.selectedItem = false;

		intButtons(colorArr, 'color');
		resetButtons(colorArr);

		if (activeSize==null){
			intButtons(sizeArr, 'size');
			resetButtons(sizeArr);
		}
		else{
			var sizeCode = activeSize.getAttribute('id');
			colorStatusChange(sizeCode);
		}

	}
	if (obj==activeSize) {
		activeSize=null;
		obj.selectedItem = false;
		intButtons(sizeArr, 'size');
		resetButtons(sizeArr);
		if (activeColor==null){
			intButtons(colorArr, 'color');
			resetButtons(colorArr);
		}
		else{
			var colorCode = activeColor.getAttribute('id');
			sizeStatusChange(colorCode);
		}		
	}

	if (obj.set == "color") {
		if(activeColor){
            var ColorCode = activeColor.getAttribute('id');
			var lcColorCode = ColorCode.toLowerCase();
			get.id('spanSelectedSizeColor').innerHTML = activeColor.getAttribute('title');
			var colorWaitlistSW = $('spanColorWaitlist');
			if ((activeColor.status == "waitlist") && (colorWaitlistSW != null)){
				SetAvailabilityMessage("waitlist");
			}
			else if (get.id('spanColorWaitlist')!= null){
				SetAvailabilityMessage("none");
			}
				// Determine if we should  execute the rest of Active (mouseout event). We will NOT perform it for "selectColor"
				// The event should have already been executed for the parent to these items.
				// The above part of active needs to be called otherwise a user can get into a state with 2 or more colors selected.
				if (!e)
				{
					var e = window.event;
					if (e){
						if (e.srcElement.className == "selectColor" )
						{
							return;
			
						}
					}
				}
			
			sizeStatusChange(ColorCode);
			setProductImg(lcColorCode);
		}
		else{
			get.id('spanSelectedSizeColor').innerHTML = "&nbsp;";
			if(imgLoaded){
			/* defect 9120, below code added to display default image when  rolled out of swatch */
                if(colorArr.length == 1){    
					$('#imageID').attr('src', selectedThumbImage);      
                }else{
					$('#imageID').attr('src', defaultImg); 
				 }
			}
             /* end of defect 9120 */ 
			intButtons(sizeArr, 'size');
			resetArray(sizeArr);
		}
	}
	
	if (obj.set == "size"){
		if (activeSize) {
			var SizeCode = activeSize.getAttribute('id');
			colorStatusChange(SizeCode);
			get.id('spanSelectedSizeText').innerHTML = activeSize.getAttribute('title');
			// we are resetting the text to the activeSize, see if we need to set the waitlist text
			var colorWaitlistSW = get.id('spanColorWaitlist');
			var sizeWaitlistSW = get.id('spanSizeWaitlist');
			if (activeSize.status == "waitlist") {
			 	if (colorWaitlistSW != null) {
		        	SetAvailabilityMessage("waitlist");
		        }
		        else if (sizeWaitlistSW != null) {
		        	SetAvailabilityMessage("waitlist");
		        }	
            }
            else if (colorWaitlistSW != null){
            	SetAvailabilityMessage("none");
            }
            else if (sizeWaitlistSW != null){
            	SetAvailabilityMessage("none");
            }
		}
		else{
			get.id('spanSelectedSizeText').innerHTML = "&nbsp;";
			intButtons(colorArr, 'color');
			resetArray(colorArr);
		}
	}
}

var hover=function(obj){
	// Determine if we should  execute the Hover (mouseover event). We will NOT perform it for "selectColor"
    // The event should have already been executed for the parent to these items.
    if (!e)
	{
        var e = window.event;
		if (e){
            if (e.srcElement.className == "selectColor")
			{
                return;
            }
		}
	}
	// set the images based on status
	// initially hide the waitlist and sold out message
	SetAvailabilityMessage("none");
	if (obj.status=='waitlist'){
        waitlist(obj);
		if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")) {
			obj.style.background='url(' + storeImagePath + obj.set + '_waitlist_hover_lg.gif)';
		}
		else{
			obj.style.background='url(' + storeImagePath + obj.set + '_waitlist_hover.gif)';
		}
		// we are over a waitlist item, show waitlist text
		SetAvailabilityMessage("waitlist");
	}
	else if(obj.status=="disabled"){
        disable(obj);
		// we are over a sold out item, show sold out text
		SetAvailabilityMessage("soldout");
	}
	else if (obj.status=="enabled"){
        enable(obj);
		if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")) {
			obj.style.background='url(' + storeImagePath + obj.set + '_hover_lg.gif)';
		}
		else{
			obj.style.background='url(' + storeImagePath + obj.set + '_hover.gif)';
		}

		// if we are over an advanced order item, show advanced order text
		if (obj.advancedMessage) {
			SetAvailabilityMessage("advanced", obj.advancedMessage);
		}
	}	
	if (obj.set == "size"){
		var SizeCode = obj.getAttribute('id');
		colorStatusChange(SizeCode);
		get.id('spanSelectedSizeText').innerHTML = obj.getAttribute('title');
		if (document.getElementById('fmvOverlay') != null)
		{
			document.getElementById('fmvOverlay').style.display = 'none';
		}
		if (document.getElementById('imageID') != null)
		{
			document.getElementById('imageID').removeAttribute("style");
		}
	}
	if (obj.set == "color"){
		var ColorCode = obj.getAttribute('id');
		var lcColorCode = ColorCode.toLowerCase();
		get.id('spanSelectedSizeColor').innerHTML = obj.getAttribute('title');
		if (document.getElementById('fmvOverlay') != null)
		{
			document.getElementById('fmvOverlay').style.display = 'none';
		}
		if (document.getElementById('imageID') != null)
		{
			document.getElementById('imageID').removeAttribute("style");
		}
		sizeStatusChange(ColorCode);
		setProductImg(lcColorCode);
		if ($('#divProductDetailViewThumbnailsImages a img')[0]){
			resetBorders();	
			setSelected($('#divProductDetailViewThumbnailsImages a img')[0]);
		}
	}
}

var lock=function(Arr, obj){
	resetButtons(Arr);
	if(obj.status=="disabled"){
		disable(obj);
		if ((obj.set == "color") && (activeSize != null)){
		    active(activeSize);
		}
		else if ((obj.set == "size") && (activeColor != null)){
		    active(activeColor);
		}
		lock(Arr, obj);
		return;
	}
	else{
		select(obj);
	}
	obj.onclick=function(){return null;};
	obj.onmouseover=function(){return null;};
	obj.onmouseout=function(){return null;};
	obj.lock=true;
	obj.selectedItem=true;
	if (obj.status=="waitlist"){
        SetAvailabilityMessage("waitlist");
	}
	else{
        SetAvailabilityMessage("none");
    }
	if(obj.set=="size"){
		activeSize = obj;
		var SizeCode = activeSize.getAttribute('id');
		colorStatusChange(SizeCode);
		get.id('spanSelectedSizeText').innerHTML = obj.getAttribute('title');
	}
	else if(obj.set=="color"){
		activeColor = obj;
		var ColorCode = activeColor.getAttribute('id');
		var lcColorCode = ColorCode.toLowerCase();
		
		get.id('spanSelectedSizeColor').innerHTML = obj.getAttribute('title');
		sizeStatusChange(ColorCode);

		setProductImg(lcColorCode);
	}
	changePrices();
}

function colorStatusChange(size){
    var colors = new Array();
	var colorAvailability = new Array();
	var colorAOMessages = new Array();
    for (i=0; i<arrColorIndex.length; i++) {
		if (arrColorIndex[i] != null) {
			if (size.toUpperCase() == arrColorIndex[i].toUpperCase()) {
				// build an array of colors for the given size
					for(j=0; j<arrColorValues[i].length; j++) {
					var arrValues = new Array();
					arrValues = arrColorValues[i][j].split(":");
					colors[j] = arrValues[2];
					colorAvailability[j] = arrValues[1];
					if (arrValues[9] && arrValues[9].trim() != '') {
						colorAOMessages[j] = arrValues[9].trim();
					}
					else {
						colorAOMessages[j] = '';
					}
				}
			}
		}
    }
   for(j=0; j<colorArr.length; j++){
		disable(colorArr[j]);
	}
    for (i=0; i<colors.length; i++){
		for(j=0; j<colorArr.length; j++){
			var colorFromHTML = colorArr[j].getAttribute('id');
			if (colors[i].toUpperCase() == colorFromHTML.toUpperCase()){
				if (colorAvailability[i] == "Y"){
					if (colorAOMessages[i] != '') {
						colorArr[j].advancedMessage = colorAOMessages[i];
					}
					else {
						if (colorArr[j].advancedMessage) {
							colorArr[j].advancedMessage = '';
						}
					}
					enable(colorArr[j]);
				}
				else if (colorAvailability[i] == "W"){
					waitlist(colorArr[j]);
				}
				
				if(colorArr[j].selectedItem){
					select(colorArr[j]);
				}
				break;
			}
		}
	}
}

var sizeStatusChange=function(color){
	var sizes = new Array();
	var sizeAvailability = new Array();
	var sizeAOMessages = new Array();
	for (i=0; i<arrSizeIndex.length; i++){
		if (arrSizeIndex[i] != null){
			if (color.toUpperCase() == arrSizeIndex[i].toUpperCase()){
				// build an array of sizes for the given color
				for(j=0; j<arrSizeValues[i].length; j++){
					var arrValues = new Array();
					arrValues = arrSizeValues[i][j].split(":");
					sizes[j] = arrValues[3];
					sizeAvailability[j] = arrValues[1];
					if (arrValues[9] && arrValues[9].trim() != '') {
						sizeAOMessages[j] = arrValues[9].trim();
					}
					else {
						sizeAOMessages[j] = '';
					}
				}
			}
		}
	}
	
	for(j=0; j<sizeArr.length; j++){
		disable(sizeArr[j]);
	}
	for (i=0; i<sizes.length; i++){
		for(j=0; j<sizeArr.length; j++){
			
			var sizeFromHTML = sizeArr[j].getAttribute('id');
			if (sizes[i] && sizes[i].toUpperCase() == sizeFromHTML.toUpperCase()){
				if (sizeAvailability[i] == "Y"){
					if (sizeAOMessages[i] != '') {
						sizeArr[j].advancedMessage = sizeAOMessages[i];
					}
					else {
						if (sizeArr[j].advancedMessage) {
							sizeArr[j].advancedMessage = '';
						}
					}
		
					enable(sizeArr[j]);
				}

				else if (sizeAvailability[i] == "W"){
					waitlist(sizeArr[j]);
				}
				
				if(sizeArr[j].selectedItem){
					select(sizeArr[j]);
				}
				break;
			}
		}
	}
}

$(function(){SetColorSize=function(){
   if ((sizeCode != '') && (sizeCode != '000') && (sizeArr != null)){
	  for (iSize=0; iSize<sizeArr.length; iSize++){
		 if (sizeCode.toUpperCase() == sizeArr[iSize].getAttribute('id').toUpperCase()){
		  lock(sizeArr, sizeArr[iSize]);
		 }
	  }
   }
   if ((colorCode != '') && (colorCode != '000') && (colorArr != null)){
	 for (iColor=0; iColor<colorArr.length; iColor++){
	   if (colorCode.toUpperCase() == colorArr[iColor].getAttribute('id').toUpperCase()){
		lock(colorArr, colorArr[iColor]);
	   }
	 }
   }
}});

$(function(){
	SetColorSize();
});

var select=function(obj){
    if(obj.status == 'waitlist'){
		if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")) {
			obj.style.background='url(' + storeImagePath + obj.set + '_waitlist_selected_lg.gif)';
		}
		else{
			obj.style.background='url(' + storeImagePath + obj.set + '_waitlist_selected.gif)';
		}
	}
	else{
		if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")){
			obj.style.background='url(' + storeImagePath + obj.set + '_selected_lg.gif)';
		}
		else{
			obj.style.background='url(' + storeImagePath + obj.set + '_selected.gif)';
		}
		obj.status="selected";
	}
	obj.style.color="#E97400"
	obj.selectedItem=true;
	if (obj.className.indexOf('Color') > -1){
	    if (obj.childNodes[1] != null)
        {
            if (obj.childNodes[1].childNodes[0] != null)
            {
    		    obj.childNodes[1].childNodes[0].setAttribute('src', storeImagePath + 'shim.gif');
                obj.childNodes[1].style.display = 'none';
            }
        }
		obj.style.opacity = '1';
		obj.style.filter = 'alpha(opacity=' + 100 + ')';
	}
}

var enable=function(obj) {
    if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")) {
		obj.style.background='url(' + storeImagePath + obj.set + '_active_lg.gif)';
	} else {
		obj.style.background='url(' + storeImagePath + obj.set + '_active.gif)';
	}
	obj.style.color="#7B7A78"
	obj.status="enabled";
	if (obj.className.indexOf('Color') > -1) {
		if (obj.childNodes[1] != null) {
            		if (obj.childNodes[1].childNodes[0] != null) {
    		    		obj.childNodes[1].childNodes[0].setAttribute('src', storeImagePath + 'shim.gif');
                		obj.childNodes[1].style.display = 'none';
                	}
        	}
		obj.style.opacity = '1';
		obj.style.filter = 'alpha(opacity=' + 100 + ')';
	}
}

var disable=function(obj) {
    if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")) {
		obj.style.background='url(' + storeImagePath + obj.set + '_soldout_lg.gif)';
	} else if (obj.className.indexOf('Size') > -1) {
		obj.style.background='url(' + storeImagePath + obj.set + '_soldout.gif)';
	}
	obj.style.color="#bbb";
	obj.status="disabled";
	if (obj.className.indexOf('Color') > -1) {
		if (obj.childNodes[1] != null) {
            		if (obj.childNodes[1].childNodes[0] != null) {
    		    		obj.childNodes[1].childNodes[0].setAttribute('src', storeImagePath + 'color_soldout.gif');
                		obj.childNodes[1].style.display = 'block';
    			}
		}
		// Set the opacity for the disabled/sold out items, do we still want this??
        	obj.style.opacity = '.5';
		obj.style.filter = 'alpha(opacity=' + 50 + ')';
	}
}


var waitlist=function(obj){
    if ((obj.className == "selectSizeLarge") || (obj.className == "selectColorLarge")){
		obj.style.background='url(' + storeImagePath + obj.set + '_waitlist_lg.gif)';
	}
	else{
		obj.style.background='url(' + storeImagePath + obj.set + '_waitlist.gif)';
	}
	obj.style.color="#7B7A78";
	obj.status="waitlist";
	if (obj.className.indexOf('Color') > -1){
	    if (obj.childNodes[1] != null)
        {
            if (obj.childNodes[1].childNodes[0] != null)
    		{
   		    	obj.childNodes[1].childNodes[0].setAttribute('src', storeImagePath + 'shim.gif');
	            obj.childNodes[1].style.display = 'none';
    		}
        }
		obj.style.opacity = '1';
		obj.style.filter = 'alpha(opacity=' + 100 + ')';
	}
}

//Control display of "waitlist" or "sold out" and "advanced order"
var SetAvailabilityMessage = function(msgtype, msgval) {
    // show the Available on Waitlist span and hide the Sold Out and Advanced Order spans
	
    if (msgtype == 'waitlist' || waitListAll == true) {
    	if ( get.id('spanColorWaitlist') != null ) {
        	$('#spanColorWaitlist').css('display', 'inline');
        	$('#spanColorSoldOut').css('display', 'none');
        	$('#spanColorAdvancedOrder').css('display', 'none');
        	$('#spanColorAODate').html('');
        } 
        else if ( get.id('spanSizeWaitlist') != null ) {
        	$('#spanSizeWaitlist').css('display','inline');
        	$('#spanSizeSoldOut').css('display','none');
        	$('#spanSizeAdvancedOrder').css('display','none');
        	$('#spanSizeAODate').html('');
        } 
    }
    // show the Sold Out span and hide the Available on Waitlist and Advanced Order spans
    else if (msgtype == "soldout") {
    	if ( get.id('spanColorSoldOut') != null ) {
        	$('#spanColorSoldOut').css('display','inline');
        	$('#spanColorWaitlist').css('display','none');
        	$('#spanColorAdvancedOrder').css('display','none');
        	$('#spanColorAODate').html('');
        }
        else if ( get.id('spanSizeSoldOut') != null ) {
        	$('#spanSizeSoldOut').css('display','inline');
        	$('#spanSizeWaitlist').css('display','none');
        	$('#spanSizeAdvancedOrder').css('display','none');
        	$('#spanSizeAODate').html('');
        } 
    }
    // show the Advanced Order span and hide the Sold Out and Available on Waitlist spans
    else if (msgtype == 'advanced') {
    	if ( get.id('spanColorAdvancedOrder') != null ) {
         	$('#spanColorAODate').html(msgval);
        	$('#spanColorAdvancedOrder').css('display','inline');
        	$('#spanColorSoldOut').css('display','none');
        	$('#spanColorWaitlist').css('display','none');
        }
    	else if ( get.id('spanSizeSoldOut') != null ) {
         	$('#spanSizeAODate').html(msgval);
        	$('#spanSizeAdvancedOrder').css('display','inline');
        	$('#spanSizeSoldOut').css('display','none');
        	$('#spanSizeWaitlist').css('display','none');
        }
    }
    // hide both the Available on Waitlist, the Sold Out, and Advanced Order spans
    else if (msgtype == 'none') {
    	if ( get.id('spanColorSoldOut') != null ) {
        	$('#spanColorSoldOut').css('display','none');
        	$('#spanColorWaitlist').css('display','none');
        	$('#spanColorAdvancedOrder').css('display','none');
        	$('#spanColorAODate').html('');
        }
    	else if ( get.id('spanSizeSoldOut') != null ) {
        	$('#spanSizeSoldOut').css('display','none');
        	$('#spanSizeWaitlist').css('display','none');
        	$('#spanSizeAdvancedOrder').css('display','none');
        	$('#spanSizeAODate').html('');
        }
    }
}
function getCatEntryId(){	
	var colorCode=null, sizeCode=null, sizeName=null, catEntryId=null;
	// set color code and name
	if (activeColor != null) colorCode = activeColor.getAttribute('id');
	else if ((activeColor==null) && (colorArr.length == 0)) colorCode = "000";
	// set size code and name
	if (activeSize != null) sizeCode = activeSize.getAttribute('id');
	else if ((activeSize==null) && (sizeArr.length == 0)) sizeCode = "000";
	if ((colorArr.length == 0) && (sizeArr.length > 0) && (activeSize != null)){
		// there are no colors, set the catEntryId from the size
		if (activeSize.status=="waitlist" || activeSize.status=="enabled" || activeSize.status=="selected") {
		    for (var i=0; i<arrColorIndex.length; i++){
				// arrColorIndex is an array of sizes
				arrValues = new Array();
				arrValues = arrColorValues[i][0].split(":");
				if (sizeCode.toUpperCase() == arrColorIndex[i].toUpperCase()){
					catEntryId = arrValues[0];
					break;
				}
			}
		}
	}else if ((sizeArr.length == 0) && (colorArr.length > 0) && (activeColor != null))  {
		// there are no sizes, set the catEntryId from the color
		if ((activeColor.status=="waitlist") || activeColor.status=="enabled" || activeColor.status=="selected") {
		    for (var i=0; i<arrSizeIndex.length; i++){
				// arrSizeIndex is an array of color
				arrValues = new Array();
				arrValues = arrSizeValues[i][0].split(":");
				if (colorCode.toUpperCase() == arrSizeIndex[i].toUpperCase()){
					catEntryId = arrValues[0];
					break;
				}
			}
		}
	}
	else if (((sizeArr.length > 0) && (colorArr.length > 0)) && ((colorCode != null) && (sizeCode != null))){
        for (var i=0; i<arrSizeIndex.length; i++){
			// arrSizeIndex is an array of sizes, indexed by colors (so values are colorcodes)
			if (colorCode.toUpperCase() == arrSizeIndex[i].toUpperCase()){
				for (var j=0; j<arrSizeValues[i].length; j++){
					arrValues = new Array();
					arrValues = arrSizeValues[i][j].split(":");
					// make sure we have the correct color and size codes
					if ((colorCode.toUpperCase()==arrValues[2].toUpperCase()) && (sizeCode.toUpperCase()==arrValues[3].toUpperCase())){
						catEntryId = arrValues[0];
						break;
					}
				}
				break;
			}
		}
	}else{catEntryId=document.getElementById("catEntryId").value;}
	return catEntryId;
}
var CheckForColorSize=function(buttonFlag){	
	var colorCode=null, sizeCode=null, colorName=null, sizeName=null;
	var itemAvail=null, catEntryId=null;
	var submitType = "A";
	//Defect# - 14042 - chnage to display message when user clicks add to cart before page is loaded completely
	var isMultiSKUItem = "false";
	
	// hide the error messages, since they might have been displayed earlier
	if (get.id('errSelectProductColor') != null){
		get.id('errSelectProductColor').style.display = "none";	
	}
	if (get.id('errSelectProductSize') != null){
		get.id('errSelectProductSize').style.display = "none";
	}
	if((get.id('errSelectProductSize') != null) && (get.id('errSelectProductColor') != null)){
		isMultiSKUItem = "true";
	}
	
	// set color code and name
	if (activeColor != null){
		colorCode = activeColor.getAttribute('id');
		colorName = activeColor.getAttribute('title');
	}
	else if ((activeColor==null) && (colorArr.length == 0)){ 
		// if no color selected, because there no colors, then colorCode is 0
		colorCode = "000";
		colorName = "";
	}
		
	
	// set size code and name
	if (activeSize != null){
		// set the sizeCode if a size was selected
		sizeCode = activeSize.getAttribute('id');
		sizeName = activeSize.getAttribute('title');
	}
	else if ((activeSize==null) && (sizeArr.length == 0)){ 
		// if no size selected, because there no sizes, then sizeCode is empty
		sizeCode = "000";
		sizeName = "";
	}
	// show the error messages, if no color/size selected
	if(get.id('errSelectProductColor')!=null) {
		if (colorCode==null || (colorCode == "000" && isMultiSKUItem == "true" )){
			if(sizeCode=="000")
			{
				get.id('errSelectProductColor').innerHTML = "Please Select an Option";		 
			}
			else
			{
				get.id('errSelectProductColor').innerHTML = "Please Select a Color";
		
			}
			isMultiSKUItem = "true";
			$('#errSelectProductColor').css('color', '#c00');
			$('#errSelectProductColor').css('font-weight', 'bold');
			$('#errSelectProductColor').css('padding', '7px 0 5px 22px');
			$('#errSelectProductColor').css('background', '#FFF380 url(' + storeImagePath + 'err_dot.gif) no-repeat 5px 7px');
			$('#errSelectProductColor').css('display', 'block');
			$('#divProductDetailSelectColorOptions').toggleClass("err");
		}
	}
	// Just added the entermine logic for defect 18648
	if(get.id('errSelectProductSize')!=null) {
		if (sizeCode==null || (sizeCode == "000" && isMultiSKUItem == "true" )){
			if(colorCode=="000")
			{
				get.id('errSelectProductSize').innerHTML = "Please Select an Option";		
			}
			else
			{
				get.id('errSelectProductSize').innerHTML = "Please Select a Size";
			}
			isMultiSKUItem = "true";
			$('#errSelectProductSize').css('color', '#c00');
			$('#errSelectProductSize').css('font-weight', 'bold');
			$('#errSelectProductSize').css('padding', '7px 0 5px 22px');
			$('#errSelectProductSize').css('background', '#FFF380 url(' + storeImagePath + 'err_dot.gif) no-repeat 5px 7px');
			$('#errSelectProductSize').css('display', 'block');
			$('#errSelectProductSize').css('display', 'block');
	
			$('#divProductDetailSelectSizeOptions').toggleClass("err");
		}
	}
	
	// End of defect 4022
	
	if ((colorArr.length == 0) && (sizeArr.length > 0) && (activeSize != null)){
		// there are no colors, but there are sizes get the availability from the ActiveSize
        if (activeSize.status=="waitlist"){
			itemAvail = "W";
		}
		else if ((activeSize.status=="enabled") || (activeSize.status=="selected")){
			itemAvail = "Y";
		}
		
		//set the catEntryId from the size
		if (itemAvail == "W" || itemAvail == "Y") {
		    for (i=0; i<arrColorIndex.length; i++){
				// arrColorIndex is an array of sizes
				arrValues = new Array();
				arrValues = arrColorValues[i][0].split(":");
				if (sizeCode.toUpperCase() == arrColorIndex[i].toUpperCase()){
					catEntryId = arrValues[0];
					//this is for order history -Rajib
					if ( get.id('sizeCode') != null ){
						get.id('sizeCode').value = arrValues[3];
						get.id('sizeCodeDesc').value = arrValues[5];
					}
					break;
				}
			}
		}
	}
	else if ((sizeArr.length == 0) && (colorArr.length > 0) && (activeColor != null))  {
		// there are no sizes, but there are colors get the availability from the activeColor
        if (activeColor.status=="waitlist"){
			itemAvail = "W";
		}
		else if ((activeColor.status=="enabled") || (activeColor.status=="selected")){
			itemAvail = "Y";
		}
		//set the catEntryId from the color
		if (itemAvail == "W" || itemAvail == "Y") {
		    for (i=0; i<arrSizeIndex.length; i++){
				// arrSizeIndex is an array of color
				arrValues = new Array();
				arrValues = arrSizeValues[i][0].split(":");
				if (colorCode.toUpperCase() == arrSizeIndex[i].toUpperCase()){
					catEntryId = arrValues[0];
					//this is for order history -Rajib
					if ( get.id('colorCode') != null ){
						get.id('colorCode').value = arrValues[3];
						get.id('colorCodeDesc').value = arrValues[5];
					}
					break;
				}
			}
		}
	}
	else if (((sizeArr.length > 0) && (colorArr.length > 0)) && ((colorCode != null) && (sizeCode != null))){
        for (i=0; i<arrSizeIndex.length; i++){
			// arrSizeIndex is an array of sizes, indexed by colors (so values are colorcodes)
			if (colorCode.toUpperCase() == arrSizeIndex[i].toUpperCase()){
				for (j=0; j<arrSizeValues[i].length; j++){
					arrValues = new Array();
					arrValues = arrSizeValues[i][j].split(":");
					// make sure we have the correct color and size codes
					if ((colorCode.toUpperCase()==arrValues[2].toUpperCase()) && 
						(sizeCode.toUpperCase()==arrValues[3].toUpperCase())){
						catEntryId = arrValues[0];
						itemAvail = arrValues[1];
						if ( get.id('sizeCode') != null ){
							get.id('sizeCode').value = arrValues[3];
							get.id('sizeCodeDesc').value = arrValues[5];
						}
						if ( get.id('colorCode') != null ){
							get.id('colorCode').value = arrValues[2];
							get.id('colorCodeDesc').value = arrValues[4];
						}
						break;
					}
				}
				break;
			}
		}
	}
	else{
		itemAvail=NoColorSizeAvail;
		catEntryId=document.getElementById("catEntryId").value;
	}
	//Defect# - 14042 - chnage to display message when user clicks add to cart before page is loaded completely
	if ((((colorCode == "000" || colorCode==null) || (sizeCode == "000" || sizeCode==null)) && isMultiSKUItem == "true" )|| (itemAvail==null)){
		//scroll to top of product description container when error occurs.
		window.scroll(0,element.findY(document.getElementById('divProductDetailDescriptionSelection')));
		return false;
	}
	else{
		var form = document.getElementById('frmProductDetail');
		var catEntryQuantity = document.getElementById("selProductQuantity").value;	
		submitType = buttonFlag;
		if (submitType == 'W') {
			Add2WishList(form, catEntryId);
		} else if (submitType == 'S') {
			Add2SpeedBuy(form, catEntryId, catEntryQuantity);
		} else if (submitType == 'O') {
			Add2OrderUpdate(form, catEntryId, catEntryQuantity);
		} else if (submitType == 'R') {
			Add2ReviewShopCart(form, catEntryId, catEntryQuantity);
		} else if (submitType == 'P') {
			ArchetypeCustomize(form, catEntryId);
		} else if (submitType == 'Q') {
			ArchetypeReorder(form, catEntryId);
		} else {
			Add2ShopCart(form, catEntryId, catEntryQuantity);
		}
	}
}

//Defect#20730- For related items on sold out page, landing page optimization
var showBanner = function(element) {
		var obj = document.getElementById(element);
		var op = 0; 
  	var timer = setInterval(function () {
  		if (op >= 1 || op >= 1.0){
  	  	clearInterval(timer);
  	  }
  	  obj.style.opacity = op.toFixed(1);
  	  obj.style.filter = 'alpha(opacity=' + op * 100 + ")";
  	  op += 0.1;
  	}, 200);
	}
//end of Defect#20730- For related items on sold out page, landing page optimization


/*changed by Ujwal on 5th Sep 2011
/*For Defect - 12513, 14042*/
//*************** S T A R T ***********************************
var busy = true;
$(function() {
    busy = false;
});
//***************** E N D *************************************

function Add2ShopCart(form, catEntryId, catEntryQuantity) {
       if (!busy) {
              busy = true;
              form.action="AddToCart";
              form.catEntryId.value = catEntryId;
              form.quantity.value = catEntryQuantity;
              form.URL.value='OrderItemDisplay?updatePrices=1&calculationUsageId=-1&orderId=.';
              
              if(showCartInOverlay()){              
					busy=false;
					Add2OverlayShopCart(form, catEntryId, catEntryQuantity);
					return false;
			  }else{               
              	    form.submit();
              }	 
       }
}
function addMulti2Cart(products){
	var url="/AddToCart?storeId=10251&catalogId=10151&orderId=.&URL=OrderItemDisplay?updatePrices=1&calculationUsageId=-1&orderId=.&errorViewName=CatalogItemAddErrorView&langId=-1";
	url+="&sc=BNDL";
	var count=1; 
	//output products to url in reverse so that make a selection pages appear in correct order.
	for(var i=products.length-1;i>=0;i--){
		var quantity = "&quantity_"+(count)+"=1";
		if(products[i]=="THISITEM"){//try to grab values from page
			var catEntryId = getCatEntryId();
			if(null != catEntryId && catEntryId != ""){
				url+="&catEntryId_"+(count)+"="+catEntryId;
			}
			if($("#selProductQuantity").length > 0){
				quantity = "&quantity_"+(count)+"="+$("#selProductQuantity").val();
			}
			if(null != refPartNum){
				products[i] = refPartNum;
			}
		}
		url+="&partNumber_"+(count)+"="+products[i];
		url+=quantity;
		count++;
	}
	document.location=url;
}
// This javascript function is used by the 'Add to Wish List' button to set appropriate values before the form is submitted
function Add2WishList(form, catEntryId) {
       if (!busy) {
              busy = true;
              form.action="InterestItemAdd";
              form.catEntryId.value = catEntryId;
              form.quantity.value = 1;
              form.URL.value='InterestItemDisplay';  
              form.submit();
       }
}
// This javascript function is used by the 'Speed Buy Item' button to set appropriate values before the form is submitted
function Add2SpeedBuy(form, catEntryId, catEntryQuantity) {      
        if (!busy) {
              busy = true;
              form.action="SpeedBuySingleItem";
              form.catEntryId.value = catEntryId;
              form.quantity.value = catEntryQuantity;
              form.URL.value='OrderItemDisplay?updatePrices=1&calculationUsageId=-1&orderId=.';              
              if( showCartInOverlay()&& isOverlaySBRequired()){              
					busy=false;
					Add2OverlaySpeedBuy(form, catEntryId, catEntryQuantity);
					return false;
			  }else{               
              	    form.submit();
              }	 
       }
        
}

function isOverlaySBRequired(){
	var required=false;
	var opt=document.getElementById('overlaySBRequired');
	if(opt !=null && (opt.value=='Y' || opt.value=='y')){
		required=true;
	}
	return required;
}
// This javascript function is used by the 'Archetype Customize' button to set appropriate values before the form is submitted
function ArchetypeCustomize(form, catEntryId) {
       if (!busy) {
              busy = true;
              form.action="PartnerPersReq";
              form.catEntryId.value = catEntryId;
              form.quantity.value = 1;
              form.action.value = "Add"; 
              form.submit();
       }
}
// This javascript function is used by the 'Archetype Reorder' button to set appropriate values before the form is submitted
function ArchetypeReorder(form, catEntryId) {
       if (!busy) {
              busy = true;
              form.action="PartnerPersReoReq";
              form.catEntryId.value = catEntryId;
              form.quantity.value = 1;
              form.action.value = "Reorder";
              form.submit();
       }
}
function changeZoomView(view, initLoad, thisObj){
	if(view == -1)
	{
		document.getElementById('enlargedImageDiv').style.display = 'block';
		document.getElementById('fmvOverlay').style.display = 'block';
		document.getElementById('imageDiv').style.display = 'none';
		if (get.id('SjElement3_base') != null) {
			get.id('SjElement3_base').style.display = "none";
		}
		if (get.id('divZoomControls') != null) {
			get.id('divZoomControls').style.display = "none"; 
		}
		//update parent page image selection
		parent.updateMainPageImages(view);
		parent.get.id('fmvOverlay').style.display = 'block';
		parent.get.id('imageID').style.display = 'none';
		parent.get.id('imgCaption').innerHTML = '&nbsp;';
	}
	else
	{	
		if (parent.get.id('fmvOverlay') != null) parent.get.id('fmvOverlay').style.display = 'none';
		if (parent.get.id('imageID') != null) parent.get.id('imageID').removeAttribute("style");
		if (document.getElementById('fmvOverlay') != null) document.getElementById('fmvOverlay').style.display = 'none';
		if (document.getElementById('imageDiv') != null) document.getElementById('imageDiv').removeAttribute("style");
		//if the image is zoomable, update the page with the appropriate zoomable image and show the zoom controls
		if (zoomImages[view] && zoomImages[view] != "") {
			if (!(initLoad)){
				s7zoom.setImage(firstZoomUrl(view)+secondZoomUrl(view), true);
			}
			get.id('zoomImgCaption').innerHTML = zoomImgCaption[view];	
			get.id('zoomImgCaption').className = "enlargedImgCaption";	
		
			//reset zoom controls image
		    var zcdImages;
			if (get.id('divZoomControls')) {
				get.id('enlargedImageDiv').style.display = "none";
				get.id('SjElement3_base').style.display = "inline";		
				get.id('divZoomControls').style.display = "inline";

				zcdImages = get.id('divZoomControls').getElementsByTagName("img");
				if (zcdImages[0]) {
					zcdImages[0].src = storeImagePath + "btn_zoom.gif";
				}
			}
		}
		//if the image is NOT zoomable, update the page with the appropriate enlarged image and hide the zoom controls
		else {
			var enlargedImages = get.id('enlargedImageDiv').getElementsByTagName("img");
			for (i=0; i<enlargedImages.length; i++) {
				if (i == view) {
					enlargedImages[i].style.display = "block";
				}
				else {
					enlargedImages[i].style.display = "none";
				}
			}
			get.id('zoomImgCaption').innerHTML = viewImgCaption[view];	
			get.id('zoomImgCaption').className = "enlargedImgCaption";	
			get.id('divZoomControls').style.display = "none";		
			get.id('SjElement3_base').style.display = "none";		
			get.id('enlargedImageDiv').style.display = "inline";
		}
	
		//update parent page image selection
		parent.updateMainPageImages(view);
	}
}

function updateMainPageImages(view){
	var thumbnailContainerDiv = document.getElementById("divProductDetailViewThumbnailsImages");
	if (thumbnailContainerDiv){
		var thumbnailCollection = thumbnailContainerDiv.getElementsByTagName("img");
		if (view < thumbnailCollection.length) {
			
			resetBorders();
			if(document.getElementById("fmvOverlay") != null){
				setSelected(thumbnailCollection[parseInt(view) + 1]);
			}
			else {
				setSelected(thumbnailCollection[view]);
			}
			$('#imageID').attr('src', viewImages[view]); 
			document.getElementById('imgCaption').innerHTML = parent.viewImgCaption[view];
			document.getElementById('selectedThumbnail').innerHTML = [view];
		}
	}
}

function changeMainPageView(view, thisObj){
	if(view == -1)
	{
		document.getElementById('fmvOverlay').style.display = 'block';
		document.getElementById('imageID').style.display = 'none';
		$('selectedThumbnail').innerHTML = [view];
	}
	else
	{
		if (document.getElementById('fmvOverlay') != null)
		{
			document.getElementById('fmvOverlay').style.display = 'none';
		}
		
		if (document.getElementById('imageID') != null)
		{
			document.getElementById('imageID').removeAttribute("style");
		}
		cmViewLocation = view + 1;
		  selectedThumbImage = "";
	      if(colorArr.length == 1){
	       resetButtons(colorArr);
	       selectedThumbImage = viewImages[view];
	      }
		$('#imageID').attr('src',viewImages[view]);
		get.id('imgCaption').innerHTML = viewImgCaption[view];	
		get.id('selectedThumbnail').innerHTML = [view];
	}
}

function removeEnlargeBorders()
{
	$('img.prodViewSelected').each(function(index, img){
		$(img).removeClass('prodViewSelected');
		$(img).addClass('prodView');
	});
}

function setEnlargeSelected(view)
{
	$('img.prodView').each(function(index, img){
		var src = img.src;
		if(src.match(view))
		{
			$(img).removeClass('prodView');
			$(img).addClass('prodViewSelected');
		}
	});
	
}
function getFullProdImagePath(defaultImg,colorCode){
	var productImageSubstring = defaultImg.substring(defaultImg.indexOf("/image/")+6);
	var productIdandTreatment = productImageSubstring.split('?');
	var colorImgExtension = (productIdandTreatment[0].indexOf('_')==-1)?productIdandTreatment[0].length - 4:productIdandTreatment[0].indexOf('_');
	var newFullProdImg = (defaultImg.indexOf('https')==-1?largeImagePath:secureLargeImagePath) + productIdandTreatment[0].substring(0,colorImgExtension) + '_' + colorCode + ".101?$uslarge$";
	return newFullProdImg;
}
function switchZmImg()
{
	get.id('zmimg').src = storeImagePath + 'magnify_up.gif';
	
	$('#proddisplayzoomin').removeClass('proddisplayzoominlarge');
	$('#proddisplayzoomout').css('display','block');
}

var moreWidth = 0, imgLoadedCount = 0,
	finishImgLoad = function() {
		imgLoaded = true;
		var imageIDobj = document.getElementById('imageID');
		if (imageIDobj != null) {
			defaultImg = imageIDobj.src;
		}
		preSelectSizeAndColor();
	},
	registerLoadedImg = function(img, index) {
		loadedSwatchImages[index] = img;
		imgLoadedCount++;
		if (imgLoadedCount >= colorImages.length) { 
			finishImgLoad();
		}
	};

$(function() {
	$('img.prodView').each(function(index, item){
		moreWidth += 78; // hardcode due to safari compat
	});
	$('.mvCont').css('width', moreWidth);
	
	if (colorImages) {
		$.map(colorImages, function(img, index) {
			var oImg = new Image();
			oImg.onload = function() {
				registerLoadedImg(this, index);
			};
			oImg.onerror = function() {
				registerLoadedImg(this, index);
			};
			oImg.src=img;
		});
	} else {finishImgLoad();}
});

/* Optional: Temporarily hide the "tabber" class so it does not "flash"
   on the page as plain HTML. After tabber runs, the class is changed
   to "tabberlive" and it will appear. */
document.write('<style type="text/css">.tabber{display:none;}<\/style>');
var initTabs = function (){
	var original;
};

// function to handle core metric page view tags
// additionalInfo will only have a value if necessary
var cm_Click = function (cm_Item, additionalInfo){
	switch (cm_Item)
	{
		case 'ZOOM':
			if (cmf_ZOOM==false){
				cmf_ZOOM=true;
			}
			break;
		case 'SWAT':
			if(cmf_SWAT == false){
				cmf_SWAT=true;
			}
			break;
		case 'MRINF':
		    var tabText = new Array();
		    var tabID;
		    tabText = additionalInfo.split(" ");
		    if (tabText.length == 1){
		        tabID = tabText[0];
		    }
		    else if ((tabText[0] == "About") || (tabText[0] == "Learn")){
		        tabID = tabText[0];
		    }
		    else if (tabText.length >= 3){
		        tabID = tabText[0].substr(0,1) + tabText[1] + tabText[2];
		    }
		    else if (tabText.length >= 2){
		        tabID = tabText[0].substr(0,1) + tabText[1];
		    }
		    
		    // make sure we have enough enough characters to work with
		    if (tabID.length < 4){
		        tabID += "A";
		    }
		    tabID = tabID.substr(0, 4).toUpperCase();
			/* start adding site indicator */		    
			cmCreatePageviewTag(additionalInfo + ": " + ItemNumber + " - " + shortDesc, tabID + classCode,null,null,"null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC");
			/* end adding site indicator */		
			break;
		case 'ENLG':
			if(cmf_ENLG == false){
				/* start adding site indicator */
				cmCreatePageviewTag("Enlarge: " + ItemNumber + "-" + shortDesc, cm_Item + classCode,null,null,null,"null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-WSC");
				/*For Defect ID-14447 Starts*/
				var pageID;
				if(cmf_MRVW == true){
					if(typeof isGroupItem != 'undefined'  && isGroupItem == 'true'){
						pageID = "ENLARGED MORE VIEWS: " + ItemNumber;				
					}
					else{
						pageID = "ENLARGED MORE VIEWS: " + ItemNumber + " - " + shortDesc;
					}
					categoryID = 'EMRV' + classCode;
				}
				else{
					if(typeof isGroupItem != 'undefined'  && isGroupItem == 'true'){
						pageID = "GRP ENLARGE: " + ItemNumber;				
					}
					else{
						pageID = "ENLARGE: " + ItemNumber + " - " + shortDesc;
					}
					categoryID = cm_Item + classCode;
				}
				cmCreatePageviewTag(pageID, categoryID,null,null,"null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC");
				/*For Defect ID-14447 Ends*/
				/* end adding site indicator */
				cmf_ENLG=true;
			}
			break;
		case 'QVC Extra':
			if(cmf_QVCEXTRA == false){		
				cmf_QVCEXTRA=true;
			}
			break;
		case 'On-Air Presentation':
			if(cmf_ONAIR == false){
				cmf_ONAIR=true;
			}
			break;
		case 'ENLGVID':

			if(cmf_ENLGVID == false){
				cmf_ENLGVID=true;
			}
			break;
		case 'EMFD':
			if(cmf_EMFD == false){
				cmf_EMFD=true;
			}
			break;
		case 'MRVW':
		    if (cmf_MRVW == false){
		    /*For Defect ID-14447 Starts*/
		    	var pageID;
			if(typeof isGroupItem != 'undefined'  && isGroupItem == 'true'){
				pageID = "GRP MORE VIEWS: " + ItemNumber;				
			}
			else{
				pageID = "MORE VIEWS: " + ItemNumber + " - " + shortDesc;
			}
				/* start adding site indicator */		    
		        cmCreatePageviewTag(pageID, cm_Item + classCode,null,null,"null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC");
			/*For Defect ID-14447 Ends*/
		        cmCreatePageviewTag("More Views: " + ItemNumber + "-" + shortDesc, cm_Item + classCode,null,null,null,"null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-WSC");
				/* end adding site indicator */			
				 //Defect 8092 
		        cmCreateManualLinkClickTag( ImageMoreViewURL + '?&cm_sp=MOREVIEWS-_- '+AvailabeViews+'-_-'+cmViewLocation,null,"MORE VIEWS: " + ItemNumber + " - " + shortDesc,cm_Item + classCode);
				cmf_MRVW=true;
			}
			break;
		case 'FMV':
		    if (cmf_FMV == false){
		        cmCreatePageviewTag("FMV: " + ItemNumber + " - " + shortDesc, cm_Item + classCode,null,null,null,"null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC");
				cmf_FMV=true;
			}
			break;
		case 'EFMV':
		    if (cmf_EFMV == false){
		        cmCreatePageviewTag("FMV ENLARGE: " + ItemNumber + " - " + shortDesc, cm_Item + classCode,null,null,null,"null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC");
				cmf_EFMV=true;
			}
			break;
		case 'EMRV':
            if (cmf_EMRV == false){
                            /* start adding site indicator */                                                                                 
                            if(typeof isGroupItem != 'undefined'  && isGroupItem == 'true'){
                                            cmCreatePageviewTag("ENLARGED MORE VIEWS: " + ItemNumber, cm_Item + classCode,null,null, "null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC","null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC");
                            }
                            else{
                                            cmCreatePageviewTag("ENLARGED MORE VIEWS: " + ItemNumber + " - " + shortDesc, cm_Item + classCode,null,null, "null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC","null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-" + ctmbAttr + "-_-null-_-WSC");
                            }
                            cmf_EMRV=true;
                            /* end adding site indicator */                                                  
            }
		    
		        cmCreatePageviewTag("Enlarged More Views: " + ItemNumber + "-" + shortDesc, cm_Item + classCode,null,null,null,"null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-WSC");
			break;
	}
}

var tabberOptions = {    
	manualStartup:true,
	'onLoad': function(argsObj) {
    		if (argsObj.tabber.id == 'communitytabs') {
        		var t = argsObj.tabber;
        		if (t.tabs.length > 0){
				var div = t.tabs[0].div;
				var selectedTab = t.tabs[0].headingText
				if(selectedTab != 'Customer Reviews'){
			                //then we need to dynamically load the data into the tab
			                var url = document.getElement('span',div).innerHTML;
			                var iframe = document.getElement('iframe',div);
			                if(iframe.innerHTML != ""){
					    iframe.src = url;
					}
				}
			}
		}
	},
	'onClick': function(argsObj){
		var t = argsObj.tabber; /* Tabber object */
		var id = t.id; /* ID of the main tabber DIV */
		var i = argsObj.index; /* Which tab was clicked (0 is the first tab) */
		var e = argsObj.event; /* Event object */
		var div = t.tabs[i].div;
		var selectedTab = t.tabs[i].headingText /* This is the title of the clicked tab */

		if (id == 'tab1'){
			if(selectedTab != 'Description' && selectedTab != 'Delivery Date Estimate'){
				//then we need to dynamically load the data into the tab
				var url = document.getElement('span',div).innerHTML;
				if(get.id(selectedTab).innerHTML == ""){
					if( selectedTab == 'See How It Fits'){
						var itemPassed = url.split('itemnum=');
						var itemNum = itemPassed[1];
						get.id(selectedTab).innerHTML ='<img src=' + storeImagePath + itemNum + '.jpg" border="0" width="400" height="450">';			
					}
					else
					{
						$('#' + selectedTab).load(url);
					}
				}
			}
			cm_Click('MRINF', selectedTab);
			return true;          
		}

		if (selectedTab == "Videos"){
			if ($('.switchLink')[0].innerHTML=='QVC Extra'){ 
				cm_Click("QVC Extra");
			}else{
				cm_Click("On-Air Presentation");
			}
			return true;
		}

		if(id == 'communitytabs'){
			if(selectedTab != 'Customer Reviews'){
				//then we need to dynamically load the data into the tab
				var url = document.getElement('span',div).innerHTML;
				var iframe = document.getElement('iframe',div);

				if(iframe.innerHTML != ""){ iframe.src = url; }
			}
		return true;          
		} 
	}
};

//Tabify on showWindow overlay
var smoothbox_TB_showWindow = TB_showWindow;
TB_showWindow = function () {
	initTabs();
    smoothbox_TB_showWindow();	
}

$(function(){initTabs()});
//</proddetails.js>
//<carousel.js>
/*	Three States -
 * 	1 - Initial State (onload): left arrow grayed, can only scroll right
 * 	2 - On scroll -  arrows not grayed can scroll left and right
 * 	3 - On reaching end of products scrolling right: left arrow grayed, can only scroll left
 * 	
 */

var size,color,prodsrc = '';
//var itemPropertyObj = new itemProperties;

function SimpleSlide(container,options) {
	this.container = container;
	this.options = options;
	//	Is it on autorun or manual?
	if(this.options.auto == "loop" || this.options.auto == "once") {
		var automated;
		this.automated = this.slider.periodical(this.options.time,this,$(this.container));
		} 
	else {
		this.slider($(this.container))
		}
}
SimpleSlide.prototype.slider = function(container) {
	var direction;
	if(this.options) direction = this.options.direction;
	else direction = "forward";
	var child;
	// Get all child nodes to scroll between.
	var children = container.children().children().first();		
	
	// Run through all child nodes to see if there is a tagged one.
	children.each(function(e) {			
		// If there is, make it current child.
		if(e.id == "currentChild") {
			child = e;
		}
	});
					
	if(!child && direction == "forward") {			
		get.id('carouselprev').onclick = function(event) {
				scrollback();
		}
		var lastElement2 = container.children().first().last();
		
		if(lastElement2) {
			
				replaceArrow("rarrow", storeImagePath + "carousel_right_arrow_grayed.gif");								
			}
		//activate left arrow		
		replaceArrow("larrow", storeImagePath + "carousel_left_arrow.gif");	
					
		child = children.first().next();
	}
	 else {
		// Are we going to the next or previous node?
		if(direction == "forward") {
			var lastElement = container.children()[0].getLast();
			replaceArrow("larrow", storeImagePath + "carousel_left_arrow.gif");
			// Is the current child the last node? Then set the first node as child, otherwise set the next node as child.
			
			//This could probably be removed
			if(lastElement) {
				replaceArrow("rarrow", storeImagePath + "carousel_right_arrow_grayed.gif");								
			}
			
			if((child != null) && (child.getNext() == null)){ 
					replaceArrow("rarrow", storeImagePath + "carousel_right_arrow_grayed.gif");		
			}
			else child = child.next();
		}
		else if(direction == "back") {
			child = child.prev();			
			
			if ((child != null) && (child.prev().length == 0)) {
				replaceArrow("larrow", storeImagePath + "carousel_left_arrow_grayed.gif");	
			}		
			
			replaceArrow("rarrow", storeImagePath + "carousel_right_arrow.gif");				
		}
	}
	// Is the child defined?
	if(child) {
		// Which type of slider is defined?
		if(this.options.type == "scroll") this.scroll(container,children,child);	
	}
}
SimpleSlide.prototype.scroll = function(container,children,child) {
	// Make it a scroll slide.
	var scroll = new Fx.Scroll(container,{duration: this.options.duration, onComplete: function() {
		// Remove tags from all child nodes.
		children.each(function(e) {
			e.id = "";
		});
		// Tag this child as current
		child.id = "currentChild";
	}}).toElement(child);		
}	

/* here's the commands - no need to edit below this line */
$(function() {
	if (get.id('carouselnext') == null){ return; }
		
	$('#carouselnext').on('click', function() {
		new SimpleSlide("SimpleSlide",{type: "scroll", direction: "forward", duration: 600});		
	});
	
	replaceArrow("rarrow", storeImagePath + "carousel_right_arrow.gif");
	replaceArrow("larrow", storeImagePath + "carousel_left_arrow_grayed.gif");
			
	$('#carouselnext').on('click', function(event) {
		scrollforward();
	});
});

/* scroll back will only function once scroll next is triggered */
function scrollforward() {
		
$('#carouselprev').on('click', function() {
	new SimpleSlide("SimpleSlide",{type: "scroll", direction: "back", duration: 600});
	});	
}	

function scrollback() {	

	$('#carouselnext').on('click', function() {
		new SimpleSlide("SimpleSlide",{type: "scroll", direction: "forward", duration: 600});
	});	
}
	
function replaceArrow(id, newSrc) {
	$('#'+id).attr('src', newSrc); 
}
	
// Code for interaction between images and main image 
$(function() {
	$("#divProductDetailViewThumbnailsImages a img").each(function(index, img){																
		$(img).on("click", function() {		   
			resetBorders();
			setSelected(img);		
		});
	});
});

function resetBorders(){
	$('#divProductDetailViewThumbnailsImages a img').each(function(index, img){
		$(img).css("border", "2px solid #e4e2e3");
	});
}

function setSelected(img){
	$(img).css("border", "2px solid #e97400");
}

function resetPopupThumbImageBorders(selectedImg){

	$('#divProductDetailPopupPhotoThumbnails a img').each(function(index, img){
		if ( trimAll(selectedImg) == trimAll(img.src) ){
			$(img).css("border", "2px solid #e97400");
		}else{
			$(img).css("border", "2px solid #e4e2e3");
		}
	});
}

function adjustFontSize() {
	button = $(this);

	if (!button.hasClass('cantIncreaseTextSize') && !button.hasClass('cantDecreaseTextSize')) {
		textBlock = $('#divProductDetailDescriptionAreaWrapper');
		
		if (button.hasClass('increaseTextSize')) {
			fontSizeChange = 2;
		}
		else {
			fontSizeChange = -2;
		}
	
		fontSize = parseInt($(textBlock).css('font-size')) + fontSizeChange;
	
		// save the font size for future displaying of Product Display Pages
		document.cookie = 'pdfs=' + fontSize + '; path=/';
		setFontSize(fontSize);
	}
}

function setFontSize(fontSize) {
	textBlock = $('#divProductDetailDescriptionAreaWrapper');

	if (textBlock) {
		textBlock.css('font-size', fontSize+'px');
	
		if (fontSize == 12){
			$('.increaseTextSize').css('display', 'inline-block');
			$('.cantDecreaseTextSize').css('display', 'inline-block');
			$('.decreaseTextSize').css('display', 'none');
			$('.cantIncreaseTextSize').css('display', 'none');

		} else if (fontSize == 16){
			$('.cantDecreaseTextSize').css('display', 'none');
			$('.decreaseTextSize').css('display', 'inline-block');
			$('.cantIncreaseTextSize').css('display', 'inline-block');
			$('.increaseTextSize').css('display', 'none');
		} else {
			
			$('.cantDecreaseTextSize').css('display', 'none');
			$('.cantIncreaseTextSize').css('display', 'none');
			$('.decreaseTextSize').css('display', 'inline-block');
			$('.increaseTextSize').css('display', 'inline-block');
		}
	}
}

//</carousel.js>
//<tabber.js>
/*==================================================
  $Id: productdetail.js,v 1.48 2009/07/28 20:13:11 cvs Exp $
  tabber.js by Patrick Fitzgerald pat@barelyfitz.com

  Documentation can be found at the following URL:
  http://www.barelyfitz.com/projects/tabber/

  License (http://www.opensource.org/licenses/mit-license.php)

  Copyright (c) 2006 Patrick Fitzgerald

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  ==================================================*/

function tabberObj(argsObj)
{
  var arg; /* name of an argument to override */

  /* Element for the main tabber div. If you supply this in argsObj,
     then the init() method will be called.
  */
  this.div = null;

  /* Class of the main tabber div */
  this.classMain = "tabber";

  /* Rename classMain to classMainLive after tabifying
     (so a different style can be applied)
  */
  this.classMainLive = "tabberlive";

  /* Class of each DIV that contains a tab */
  this.classTab = "tabbertab";

  /* Class to indicate which tab should be active on startup */
  this.classTabDefault = "tabbertabdefault";

  /* Class for the navigation UL */
  this.classNav = "tabbernav";

  /* When a tab is to be hidden, instead of setting display='none', we
     set the class of the div to classTabHide. In your screen
     stylesheet you should set classTabHide to display:none.  In your
     print stylesheet you should set display:block to ensure that all
     the information is printed.
  */
  this.classTabHide = "tabbertabhide";

  /* Class to set the navigation LI when the tab is active, so you can
     use a different style on the active tab.
  */
  this.classNavActive = "tabberactive";

  /* Elements that might contain the title for the tab, only used if a
     title is not specified in the TITLE attribute of DIV classTab.
  */
  this.titleElements = ['h2','h3','h4','h5','h6'];

  /* Should we strip out the HTML from the innerHTML of the title elements?
     This should usually be true.
  */
  this.titleElementsStripHTML = true;

  /* If the user specified the tab names using a TITLE attribute on
     the DIV, then the browser will display a tooltip whenever the
     mouse is over the DIV. To prevent this tooltip, we can remove the
     TITLE attribute after getting the tab name.
  */
  this.removeTitle = true;

  /* If you want to add an id to each link set this to true */
  this.addLinkId = false;

  /* If addIds==true, then you can set a format for the ids.
     <tabberid> will be replaced with the id of the main tabber div.
     <tabnumberzero> will be replaced with the tab number
       (tab numbers starting at zero)
     <tabnumberone> will be replaced with the tab number
       (tab numbers starting at one)
     <tabtitle> will be replaced by the tab title
       (with all non-alphanumeric characters removed)
   */
  this.linkIdFormat = '<tabberid>nav<tabnumberone>';

  /* You can override the defaults listed above by passing in an object:
     var mytab = new tabber({property:value,property:value});
  */
  for (arg in argsObj) { this[arg] = argsObj[arg]; }

  /* Create regular expressions for the class names; Note: if you
     change the class names after a new object is created you must
     also change these regular expressions.
  */
  this.REclassMain = new RegExp('\\b' + this.classMain + '\\b', 'gi');
  this.REclassMainLive = new RegExp('\\b' + this.classMainLive + '\\b', 'gi');
  this.REclassTab = new RegExp('\\b' + this.classTab + '\\b', 'gi');
  this.REclassTabDefault = new RegExp('\\b' + this.classTabDefault + '\\b', 'gi');
  this.REclassTabHide = new RegExp('\\b' + this.classTabHide + '\\b', 'gi');

  /* Array of objects holding info about each tab */
  this.tabs = new Array();

  /* If the main tabber div was specified, call init() now */
  if (this.div) {

	if(this.div.className &&
		!(this.div.className.match(this.REclassMainLive)))
	{
	    this.init(this.div);
	}
    /* We don't need the main div anymore, and to prevent a memory leak
       in IE, we must remove the circular reference between the div
       and the tabber object. */
    this.div = null;
  }
}


/*--------------------------------------------------
  Methods for tabberObj
  --------------------------------------------------*/


tabberObj.prototype.init = function(e)
{
  /* Set up the tabber interface.

     e = element (the main containing div)

     Example:
     init(document.getElementById('mytabberdiv'))
   */

  var
  childNodes, /* child nodes of the tabber div */
  i, i2, /* loop indices */
  t, /* object to store info about a single tab */
  defaultTab=0, /* which tab to select by default */
  DOM_ul, /* tabbernav list */
  DOM_li, /* tabbernav list item */
  DOM_a, /* tabbernav link */
  aId, /* A unique id for DOM_a */
  headingElement; /* searching for text to use in the tab */

  /* Verify that the browser supports DOM scripting */
  if (!document.getElementsByTagName) { return false; }

  /* If the main DIV has an ID then save it. */
  if (e.id) {
    this.id = e.id;
  }

  /* Clear the tabs array (but it should normally be empty) */
  this.tabs.length = 0;

  /* Loop through an array of all the child nodes within our tabber element. */
  childNodes = e.childNodes;
  for(i=0; i < childNodes.length; i++) {

    /* Find the nodes where class="tabbertab" */
    if(childNodes[i].className &&
       childNodes[i].className.match(this.REclassTab)) {
      
      /* Create a new object to save info about this tab */
      t = new Object();
      
      /* Save a pointer to the div for this tab */
      t.div = childNodes[i];
      
      /* Add the new object to the array of tabs */
      this.tabs[this.tabs.length] = t;

      /* If the class name contains classTabDefault,
	 then select this tab by default.
      */
      if (childNodes[i].className.match(this.REclassTabDefault)) {
	defaultTab = this.tabs.length-1;
      }
    }
  }

  /* Create a new UL list to hold the tab headings */
  DOM_ul = document.createElement("ul");
  DOM_ul.className = this.classNav;
  
  /* Loop through each tab we found */
  for (i=0; i < this.tabs.length; i++) {

    t = this.tabs[i];

    /* Get the label to use for this tab:
       From the title attribute on the DIV,
       Or from one of the this.titleElements[] elements,
       Or use an automatically generated number.
     */
    t.headingText = t.div.title;

    /* Remove the title attribute to prevent a tooltip from appearing */
    if (this.removeTitle) { t.div.title = ''; }

    if (!t.headingText) {

      /* Title was not defined in the title of the DIV,
	 So try to get the title from an element within the DIV.
	 Go through the list of elements in this.titleElements
	 (typically heading elements ['h2','h3','h4'])
      */
      for (i2=0; i2<this.titleElements.length; i2++) {
	headingElement = t.div.getElementsByTagName(this.titleElements[i2])[0];
	if (headingElement) {
	  t.headingText = headingElement.innerHTML;
	  if (this.titleElementsStripHTML) {
	    t.headingText.replace(/<br>/gi," ");
	    t.headingText = t.headingText.replace(/<[^>]+>/g,"");
	    t.headingText = t.headingText.replace(/&amp;/g,"&");
	    t.headingText = t.headingText.replace(/&apos;/g,"'");
	    t.headingText = t.headingText.replace(/&quot;/g,"\"");
	    t.headingText = t.headingText.replace(/&gt;/g,">");
	    t.headingText = t.headingText.replace(/&lt;/g,"<");
	  }
	  break;
	}
      }
    }

    if (!t.headingText) {
      /* Title was not found (or is blank) so automatically generate a
         number for the tab.
      */
      t.headingText = i + 1;
    }

    /* Create a list element for the tab */
    DOM_li = document.createElement("li");

    /* Save a reference to this list item so we can later change it to
       the "active" class */
    t.li = DOM_li;

    /* Create a link to activate the tab */
    DOM_a = document.createElement("a");
    DOM_a.appendChild(document.createTextNode(t.headingText));
    DOM_a.href = "javascript:void(null);";
    DOM_a.title = t.headingText;
    DOM_a.onclick = this.navClick;

    /* Add some properties to the link so we can identify which tab
       was clicked. Later the navClick method will need this.
    */
    DOM_a.tabber = this;
    DOM_a.tabberIndex = i;

    /* Do we need to add an id to DOM_a? */
    if (this.addLinkId && this.linkIdFormat) {

      /* Determine the id name */
      aId = this.linkIdFormat;
      aId = aId.replace(/<tabberid>/gi, this.id);
      aId = aId.replace(/<tabnumberzero>/gi, i);
      aId = aId.replace(/<tabnumberone>/gi, i+1);
      aId = aId.replace(/<tabtitle>/gi, t.headingText.replace(/[^a-zA-Z0-9\-]/gi, ''));

      DOM_a.id = aId;
    }

    /* Add the link to the list element */
    DOM_li.appendChild(DOM_a);

    /* Add the list element to the list */
    DOM_ul.appendChild(DOM_li);
  }

  /* Add the UL list to the beginning of the tabber div */
  e.insertBefore(DOM_ul, e.firstChild);

  /* Make the tabber div "live" so different CSS can be applied */
  e.className = e.className.replace(this.REclassMain, this.classMainLive);

  /* Activate the default tab, and do not call the onclick handler */
  this.tabShow(defaultTab);

  /* If the user specified an onLoad function, call it now. */
  if (typeof this.onLoad == 'function') {
    this.onLoad({tabber:this});
  }

  return this;
};


tabberObj.prototype.navClick = function(event)
{

  /* This method should only be called by the onClick event of an <A>
     element, in which case we will determine which tab was clicked by
     examining a property that we previously attached to the <A>
     element.

     Since this was triggered from an onClick event, the variable
     "this" refers to the <A> element that triggered the onClick
     event (and not to the tabberObj).

     When tabberObj was initialized, we added some extra properties
     to the <A> element, for the purpose of retrieving them now. Get
     the tabberObj object, plus the tab number that was clicked.
  */

  var
  rVal, /* Return value from the user onclick function */
  a, /* element that triggered the onclick event */
  self, /* the tabber object */
  tabberIndex, /* index of the tab that triggered the event */
  onClickArgs; /* args to send the onclick function */

  a = this;
  if (!a.tabber) { return false; }

  self = a.tabber;
  tabberIndex = a.tabberIndex;

  /* Remove focus from the link because it looks ugly.
     I don't know if this is a good idea...
  */
  a.blur();

  /* If the user specified an onClick function, call it now.
     If the function returns false then do not continue.
  */
  if (typeof self.onClick == 'function') {

    onClickArgs = {'tabber':self, 'index':tabberIndex, 'event':event};

    /* IE uses a different way to access the event object */
    if (!event) { onClickArgs.event = window.event; }

    rVal = self.onClick(onClickArgs);
    if (rVal === false) { return false; }
  }

  self.tabShow(tabberIndex);

  return false;
};


tabberObj.prototype.tabHideAll = function()
{
  var i; /* counter */

  /* Hide all tabs and make all navigation links inactive */
  for (i = 0; i < this.tabs.length; i++) {
    this.tabHide(i);
  }
};


tabberObj.prototype.tabHide = function(tabberIndex)
{
  var div;

  if (!this.tabs[tabberIndex]) { return false; }

  /* Hide a single tab and make its navigation link inactive */
  div = this.tabs[tabberIndex].div;

  /* Hide the tab contents by adding classTabHide to the div */
  if (!div.className.match(this.REclassTabHide)) {
    div.className += ' ' + this.classTabHide;
  }
  this.navClearActive(tabberIndex);

  return this;
};


tabberObj.prototype.tabShow = function(tabberIndex)
{
  /* Show the tabberIndex tab and hide all the other tabs */

  var div;

  if (!this.tabs[tabberIndex]) { return false; }

  /* Hide all the tabs first */
  this.tabHideAll();

  /* Get the div that holds this tab */
  div = this.tabs[tabberIndex].div;

  /* Remove classTabHide from the div */
  div.className = div.className.replace(this.REclassTabHide, '');

  /* Mark this tab navigation link as "active" */
  this.navSetActive(tabberIndex);

  /* If the user specified an onTabDisplay function, call it now. */
  if (typeof this.onTabDisplay == 'function') {
    this.onTabDisplay({'tabber':this, 'index':tabberIndex});
  }

  return this;
};

tabberObj.prototype.navSetActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that only one nav item can be active at a time.
  */

  /* Set classNavActive for the navigation list item */
  this.tabs[tabberIndex].li.className = this.classNavActive;

  return this;
};


tabberObj.prototype.navClearActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that one nav should always be active.
  */

  /* Remove classNavActive from the navigation list item */
  this.tabs[tabberIndex].li.className = '';

  return this;
};


/*==================================================*/


function tabberAutomatic(tabberArgs)
{
  /* This function finds all DIV elements in the document where
     class=tabber.classMain, then converts them to use the tabber
     interface.

     tabberArgs = an object to send to "new tabber()"
  */
  var
    tempObj, /* Temporary tabber object */
    divs, /* Array of all divs on the page */
    i; /* Loop index */

  if (!tabberArgs) { tabberArgs = {}; }

  /* Create a tabber object so we can get the value of classMain */
  tempObj = new tabberObj(tabberArgs);

  /* Find all DIV elements in the document that have class=tabber */

  /* First get an array of all DIV elements and loop through them */
  divs = document.getElementsByTagName("div");
  for (i=0; i < divs.length; i++) {
    
    /* Is this DIV the correct class? */
    if (divs[i].className &&
	divs[i].className.match(tempObj.REclassMain)) {
      
      /* Now tabify the DIV */
      tabberArgs.div = divs[i];
      divs[i].tabber = new tabberObj(tabberArgs);
    }
  }
  return this;
}
function tabberAutomaticOnLoad(tabberArgs)
{
  /* This function adds tabberAutomatic to the window.onload event,
     so it will run after the document has finished loading.
  */
  var oldOnLoad;
  if (!tabberArgs) { tabberArgs = {}; }
  oldOnLoad = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = function() {
      tabberAutomatic(tabberArgs);	  
    };
  } else {
    window.onload = function() {
      oldOnLoad();
      tabberAutomatic(tabberArgs);
    };
  }
}
/* Run tabberAutomaticOnload() unless the "manualStartup" option was specified */
if(typeof tabberOptions == 'undefined') tabberAutomaticOnLoad();
else{
  if (!tabberOptions['manualStartup']) tabberAutomaticOnLoad(tabberOptions);
}

//</tabber.js>
//<config.js>
function S7ConfigObject(){
	this.isVersion		= "2.8";
	this.isViewerRoot	= "http://images.qvc.com/is-viewers";
	this.isRoot		= "http://images.qvc.com/is/image/";
}
var S7ConfigClient		= new S7ConfigObject();

function docWrite(line) {
    document.write(line);
}
function getParam(p,d) {
	var str = "" + unescape(document.location);
	var i = Math.max( str.indexOf('?'+p+'='), str.indexOf('&'+p+'=') );
	if ( i < 0 ) return d;
	i+=2+p.length;
	var i2 = str.indexOf('&',i);
	var returnstr = str.substring(i,(i2<0?str.length:i2));
	return (returnstr.indexOf(',')>0?returnstr.split(','):returnstr);
};

var flashOk = false;
function checkFlash()	//call this function and then test the flashOk variable
{
    if (navigator.appVersion.indexOf("MSIE") >= 0 && navigator.appVersion.indexOf("Windows") >= 0){
        document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
        document.write('on error resume next \n');
        document.write('flashOk = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.7")) \n');
		document.write('if flashOk = false then \n');
		document.write('    flashOk = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6")) \n');
		document.write('end if \n');
        document.write('</SCR' + 'IPT\> \n');
    }
    else if (navigator.plugins && navigator.plugins["Shockwave Flash"]){
	desc = navigator.plugins["Shockwave Flash"].description;
	flashOk = desc.indexOf(6.0) > 0 || desc.indexOf(7.0) > 0;
    }
}
function Add2OverlayShopCart(form, catEntryId, catEntryQuantity) { 
       if (!busy) {
              busy = false;	              
              form.URL.value='OrderItemDisplay?updatePrices=1&calculationUsageId=-1&orderId=.&cartOverlay=true';
             	 var pageName = location.href; 					
				  var tempIndex1 = '';
				  if(pageName.indexOf("?")>-1){
				  	tempIndex1=pageName.indexOf("?");
				  }
				pageName = pageName.substring(0,tempIndex1);			  
				var slashPos = pageName.lastIndexOf("/");			  
				pageName = pageName.substring(0,slashPos);		
			  
				var storeId = form.storeId.value;
				var langId = form.langId.value;
				var catalogId = form.catalogId.value; 
				var errorViewName = form.errorViewName.value;
				var orderId = form.orderId.value;
				var productId = form.productId.value;
				var calculationUsageId = form.calculationUsageId.value;
				var shouldCachePage = form.shouldCachePage.value;
				var requisitionListId = form.requisitionListId.value;
				var listId = form.listId.value;
				var bundleProductsId = form.bundleProductsId.value;
				var promo = form.promo.value;
				var fromPage = form.fromPage.value;
				var URL =  form.URL.value;
				var catEntryIdValue = form.catEntryId.value;
				var quantity = form.quantity.value;
				var sc = form.sc.value;
	
				var queryString="storeId=" + storeId + "&langId=" + langId + "&catalogId=" + catalogId + "&errorViewName=" + errorViewName+"&orderId=" + orderId + "&productId=" + productId+"&calculationUsageId=" +calculationUsageId + "&shouldCachePage=" + shouldCachePage+"&requisitionListId=" + requisitionListId + "&listId=" + listId+"&fromPage=" + fromPage + "&promo=" + promo+"&bundleProductsId=" + bundleProductsId + "&catEntryId=" + catEntryIdValue + "&quantity=" + quantity + "&sc=" + sc;	
				queryString = queryString +"&URL=" + encodeURIComponent(URL)	 ;    
				var orderItemDisplayUrl = pageName+"/OrderItemDisplay?updatePrices=1&calculationUsageId=-1&orderId=.";	
	           	            
				var urlValue= pageName+"/AddToCart?"+queryString;	             					 			 				
					
 				if(isAutoDeliverItem == 'true'){  
	             	urlValue=urlValue+"&cartADConfirm=true&height=215&width=550";	              
	             	
	            }else if(waitlistSW!=null && waitlistSW =='Y'){		            	           
	             	urlValue=urlValue+"&cartWLConfirm=true&height=215&width=550";   
	             }else{	                
		        	urlValue = urlValue+"&height=505&width=550" ;
	             }	
	             
	              TB_show('',urlValue+'&cartOverlay=true',false); 							             
             } 
	return false;                  
  }
function showCartInOverlay(){
		var controlCookie = qCookie.get('mt.sc');						 
		if(controlCookie!=null && controlCookie=='a' && personalizationIndex!='Y'){
			return true;
		}else{
			return false;
		}
}
function Add2OverlaySpeedBuy(form, catEntryId, catEntryQuantity) { 
	if (!busy) {
              busy = false;	   
			var isWaitList = null;
			if($('spanColorWaitlist')){
				isWaitList = $('spanColorWaitlist').getStyle('display'); 
			}                          
              form.URL.value='OrderItemDisplay?updatePrices=1&calculationUsageId=-1&orderId=.&cartOverlay=true';                    	
             	 var pageName = location.href; 					
				  var tempIndex1 = '';
				  if(pageName.indexOf("?")>-1){
				  	tempIndex1=pageName.indexOf("?");
				  }
				pageName = pageName.substring(0,tempIndex1);			  
				var slashPos = pageName.lastIndexOf("/");			  
				pageName = pageName.substring(0,slashPos);		
			  
				var storeId = form.storeId.value;
				var langId = form.langId.value;
				var catalogId = form.catalogId.value; 
				var errorViewName = form.errorViewName.value;
				var orderId = form.orderId.value;
				var productId = form.productId.value;
				var calculationUsageId = form.calculationUsageId.value;
				var shouldCachePage = form.shouldCachePage.value;
				var requisitionListId = form.requisitionListId.value;
				var listId = form.listId.value;
				var bundleProductsId = form.bundleProductsId.value;
				var promo = form.promo.value;
				var fromPage = form.fromPage.value;
				var URL =  form.URL.value;
				var catEntryIdValue = form.catEntryId.value;
				var quantity = form.quantity.value;
	
				var queryString="storeId=" + storeId + "&langId=" + langId + "&catalogId=" + catalogId + "&errorViewName=" + errorViewName+"&orderId=" + orderId + "&productId=" + productId+"&calculationUsageId=" +calculationUsageId + "&shouldCachePage=" + shouldCachePage+"&requisitionListId=" + requisitionListId + "&listId=" + listId+"&fromPage=" + fromPage + "&promo=" + promo+"&bundleProductsId=" + bundleProductsId + "&catEntryId=" + catEntryIdValue + "&quantity=" + quantity +"&isSpeedBuy=true";
		          
				var orderItemDisplayUrl = pageName+"/OrderItemDisplay?updatePrices=1&calculationUsageId=-1&orderId=.";	
	           	            
				var urlValue= pageName+"/SpeedBuySingleItem?"+queryString+"&cartOverlay=true&cartSpeedBuyOverlay=true";	             		              			 					
				
				if(isAutoDeliverItem == 'true'){  
		         	  urlValue = urlValue +  "&height=203&width=506&cartADConfirm=true";  
	            }else if(isWaitList!=null && isWaitList!='none'){		            	             
	             	  urlValue = urlValue +  "&height=168&width=506&cartWLConfirm=true"; 
	            }else{	                
		              urlValue = urlValue +  "&height=433&width=506"; 
	            }	
	            
				urlValue = urlValue + "&URL=" + encodeURIComponent(URL) ;
	            TB_show('',urlValue,false);  	
							
				return false;
	}
}
//</config.js>