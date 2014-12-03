var pickedSwatch = 'swatch_id';
var sizeDropDown = 'drop_down';
var skuId = 'skuId';
var swatchDescription = 'swatch_description';
var selSwatchDesc = '';
var selSwatchS7info = '';
//user has selected this
var currentSizeSelected = "none";
//is size available in the newly selected color
var sizeIsAvailable=false;
//create array of available sizes
var availableSizes=new Array();
//temp array for size change
var availableSizesChange=new Array();
//activate add to bag button
var isAddToBagActive = false;
//activate proceed to checkout button
var isProceedToCheckoutActive = false;
//get size-sku array copy 
var findSizeSku;
var strSkuSelected = '';
// temporary until fixed in template:
var runOnce = false;
document.write('<style type="text/css"> .title, .title_bar {display:none;}</style>')
	
if ((/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) || (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent))){
document.write("<style>");
document.write("#readMore{height: 40px;}");
document.write("#moreController{display:block;}");
document.write("</style>");
}

jQuery(document).ready(function() {
    changeMainImgFromParam();
    loadSwatches(colorFromPlp);
    setTimeout(function(){fireImageShow();},1000);
	
	// 20131101 - quick hack for pets (no size chart):
	try {
		var objBreadcrumbs = document.getElementById('divBreadcrumbs');
		if (window.location.toString().indexOf('PRD_TBE') > -1) {
			$j('.size_header_choose').html('Choose a size:');
		}
	} catch(e) {
		// do nothing
	}

});

function fireImageShow(){
	document.getElementById("divMainImageContainer").style.opacity=1;
}

function changeMainImgFromParam(){
	
	try {
		var container = document.getElementById("product_swatches");
		var containierArray = container.getElementsByTagName("a");
		for(var i = 0; i < containierArray.length; i++){
			var colorRequired = containierArray[i].rel.split('|')[1];
				
			if(colorFromPlp == colorRequired){
				colorFromPlp = containierArray[i].id;
				break;
			}
		}
		
		var QsColorFromPlp = document.getElementById(colorFromPlp);
		if(QsColorFromPlp == null){
			QsColorFromPlp = document.getElementById("prodctID0");
		}
		if(QsColorFromPlp != null){
			var paramColor = QsColorFromPlp.getProperty('rel').split('|')[1];
			var url = "http://s7d2.scene7.com/is/image/TommyBahama/"+paramColor+"_main?$pd_zoom$";
			$j('#imgDetail').attr('data-zoomsrc', url);
		}
	} catch(e) {
		//no swatches -- error
	}
}

function loadSwatches(skuID){
	$$('.product_swatch').each(
		function(target){
			target.selected = false;
			target.getFirst().addClass('product_swatches_norm');
			target.addEvent('click', function(){swatchClickV2(target);dropDownSelect();showPDError("","");});
			target.addEvent('mouseover',function(){swatchMouseover(target);});
			target.addEvent('mouseout',function(){swatchMouseout(target);});
		}
	);
	$$('.giftcard_swatch').each(
		function(target) {
			target.selected = false;
			target.getFirst().addClass('product_swatches_norm');
			target.addEvent('click', function(){gc_swatchClickV2(target);dropDownSelect();showPDError("","");});
			target.addEvent('mouseover',function(){gc_swatchMouseover(target);});
			target.addEvent('mouseout',function(){gc_swatchMouseout(target);});	
		}						
	);

	
	//selects first swatch by default.
	var elToUse = skuID;
	if ((elToUse == null)  || (elToUse == undefined)) {
		elToUse = "prodctID0";
	}
	else{
		elToUse = colorFromPlp;
	}
	
	var el = document.getElementById(elToUse);
	if (el) {
		swatchMouseover(el);
		swatchClickV2(el);
		attributeSelected('colorSelected');
	}
	
	try {
		if ($$('.choose_color')[0].innerHTML.indexOf('Choose scent:') > -1) {
			var arrScents = new Array();
			arrScents[0] = 'Maui Mango|island mango, tangerine, tropical orange and pineapple';
			arrScents[1] = 'Pineapple Cilantro|Hawaiian pineapple, sparkling kumquat, mango, lemon, cilantro, coconut milk and Tahitian vanilla bean';
			arrScents[2] = 'Coconut Mango|coconut, pineapple, mango, papaya, guava and island vanilla';
			arrScents[3] = 'Grapefruit Splash|pink grapefruit, Italian mandarin, lemon zest, cassis, agave nectar, pomegranate, musk and sugar cane';
			arrScents[4] = 'Vanilla Sands|vanilla beans, fresh cr&egrave;me, strawberries, brown sugar, caramel and nutmeg';
			arrScents[5] = 'Island Breeze|lush mango, guava, sweet papaya, kumquat, coconut milk and vanilla';
			arrScents[6] = 'Tropical Amaryllis|tropical neroli, papaya blossom, melon flowers, tiger lily, red amaryllis, island gardenia, pink frangipani and vanilla bean';
			arrScents[7] = 'Pineapple Paradise|Hawaiian pineapple, kumquat, mango, coconut milk and Tahitian vanilla bean';
			arrScents[8] = 'Crackled Coconut|coconut leaf, coconut milk, island sandalwood and vanilla';
			arrScents[9] = 'Summer Escape|lush mango, guava, sweet papaya, kumquat, coconut milk and vanilla';
			arrScents[10] = 'Island Blend|Maui pineapple, island mandarin, cilantro, tropical mango, luscious papaya, sea jasmine, driftwood, cedar and island musk';
			arrScents[11] = 'Woodfire|cedarwood, smoke accords, patchouli leaves and warm vanilla';
			arrScents[12] = 'Mulled Wine|red wine, oakwood resins, and warm mulling spices';
			arrScents[13] = 'Pomegranate Lime|grapefruit, orange, jasmine, muguet, water flowers, fruit and sweet musk';
			arrScents[14] = 'Lucky Havana|Damask plum, Macintosh apple, sugar maple, sweet tobacco, Madagascar vanilla, amber musk, Indonesian patchouli, rosewood and Indian agar wood';
			arrScents[15] = 'White Sangria|ripe elderberry, sweet kumquat, juicy clementine, sparkling lime, red currant, candied raspberry, lemon drops, crushed pineapple and white nectarine';
			arrScents[16] = 'Tahitian Fig|Kadota fig, Anjou pear, coconut pulp, acai berry, black peppercorn, apricot marmalade, tangy rhubarb, French vanilla, cr&egrave;me and parsley leaves';
            arrScents[17] = 'Coconut Rum|creamy coconut, rum accords, vanilla, tonka bean and praline';
            arrScents[18] = 'Pomegranate Lychee|juicy pomegranate, fruity lychee, mandarin orange and red currant';


			var arrSwatchAnchors = $$('.product_swatch');
			var strScent = '';
			var strScentDesc = '';
			var strHTML = '';
			
			for (i=0;i<arrSwatchAnchors.length;i++) {
				for (x=0;x<arrScents.length;x++) {
					strScent = arrScents[x].toString().split('|')[0];
					if (strScent==arrSwatchAnchors[i].getProperty('rel').split('|')[0]) {
						strScentDesc = arrScents[x].toString().split('|')[1];
						if (strHTML.length > 0) {
							strHTML += '<br /><br />';	
						}
						strHTML += '<b>' + strScent + ':</b> Notes of ' + strScentDesc;
					} else {
						//alert(arrSwatchAnchors[i].toString().split('|')[0].toString());
					}
				}
				
			}
			if(!runOnce){
				if (strHTML.length > 0) {
					
					var objDescUL = $('readMore').getElementsByTagName('ul')[0];
					var objDescLI = document.createElement('li');
					objDescLI.innerHTML = strHTML;
					objDescUL.appendChild(objDescLI);
					runOnce = true;
				}
			}
		}
	} catch(e) {
		// do nothing; page without swatches...
	}
	
}


function dropDownSelect2(sizeSelected) {
	try{
		for(var t = 0;t<findSizeSku.length;t++){
			if(sizeSelected == findSizeSku[t]){
				var skuIdElement = $(skuId);
				skuIdElement.setProperty('value', findSizeSku[t-1]);
			}
		}
	}
	catch(e){}
}

function dropDownSelect() {
		var skuIdElement = $(skuId);
		var dropDownValue = currentSizeSelected;
		skuIdElement.setProperty('value', dropDownValue);
}

function swatchMouseover(swatch){
	if (swatch.selected == false){
		swatch.getFirst().removeClass('product_swatches_norm');
		swatch.getFirst().addClass('product_swatches_sel');
	}
	$(swatchDescription).innerHTML = swatch.getProperty('rel').split('|')[0];
}

function swatchMouseout(swatch){
	if (swatch.selected == false){
		swatch.getFirst().removeClass('product_swatches_sel');
		swatch.getFirst().addClass('product_swatches_norm');
	}
	$(swatchDescription).innerHTML = selSwatchDesc;
}

function showDetailImage(strStyleColor) {
	try {
		var strScene7URL = 'http://s7d2.scene7.com/is/image/TommyBahama/'+strStyleColor+'_' + strImageFormatDetail +'?$detail2$';
	
		var objDetailImage = document.getElementById('imgDetail');
		objDetailImage.src = strScene7URL;
		
		//update alt images, if applicable.
		var arrAltImages = $$('.alt_images_show');
		var strAltImageColor = '';
		var strColor = strStyleColor.split('_')[1];
			if (arrAltImages) {
				for (i=0;i<arrAltImages.length;i++) {
					strAltImageID = arrAltImages[i].id.replace('alt_images_','');
					if (strAltImageID == strColor) {
						arrAltImages[i].style.display = 'block';
					} else {
						arrAltImages[i].style.display = 'none';
					}
				}
			}
	} catch (e) {
		// do nothing; we're on the view larger page with the zoom viewer.	
	}
}

function swatchClickV2(swatch) {
	//add events to "add to bag button"
	
	if (swatch.selected == false) {
		// set the style of all the classes
		$$('.product_swatch').each(
				function(target) {
					target.getFirst().removeClass('product_swatches_sel');
					target.getFirst().addClass('product_swatches_norm');
					target.selected = false;
				});

		// set the style of the clicked item
		swatch.getFirst().removeClass('product_swatches_norm');
		swatch.getFirst().addClass('product_swatches_sel');
		swatch.selected = true;

		// set the hidden swatch and store the selected swatch info
		$(pickedSwatch).value = swatch.id;
		selSwatchDesc = swatch.getProperty('rel').split('|')[0];
		selSwatchS7info = swatch.getProperty('rel').split('|')[1];

		// update the Detail image
		showDetailImage(selSwatchS7info);

		if(document.getElementById('dropDownElem')!=null){
			var dropDownElem = $(sizeDropDown);
			
			if (dropDownElem) {
				while (dropDownElem.hasChildNodes())
				{
					dropDownElem.removeChild(dropDownElem.childNodes[0]);
				}
			}
		}
		
		//try {
			//TEST for SKU
			var sizes = swatch.getProperty('rel').split('|');
			
			sizeIsAvailable = false;
			if(currentSizeSelected=="none"){
				resetAllCells();
				addToBagStatus();
			}
			else{
				for (var i = 2; i < sizes.length; i = i + 2) {
					var sizeSelect = document.getElementById('sizeContainer').getElementsByTagName('div');
					//create array for new color selection
					for(var x = 0;x < sizeSelect.length;x++){
						if(sizes[i + 1] == sizeSelect[x].id){
							//populate array with available sizes
							availableSizesChange.push(sizeSelect[x].id);
						}
					}
					//check to see if selected size is available in new color selection
					for(var x = 0;x < availableSizesChange.length;x++){
						if(currentSizeSelected == availableSizesChange[x]){
							sizeIsAvailable = true;
							isAddToBagActive = true;
							addToBagStatus();
						}
					}
					
				}
				
				if(!sizeIsAvailable){
					resetAllCells();
					currentSizeSelected = "none";
					//de-active add to bag button
					isAddToBagActive = false;
					addToBagStatus();
				}
				else{
					resetAllCells();
					var keepSelectedCell = document.getElementById(currentSizeSelected);
					keepSelectedCell.getFirst().removeClass('product_swatches_norm');
					keepSelectedCell.getFirst().addClass('product_sizes_sel_click');
					
				}
				
				//reset array
				availableSizesChange =[];
			}

			if (sizes.length > 3) {
				for (var i = 2; i < sizes.length; i = i + 2) {
					if (i == 2) {

					}

					if (sizes[i + 1].toString().indexOf('Not Available') > -1) {
						
					} else {
					
					}
					var sizeSelect = document.getElementById('sizeContainer').getElementsByTagName('div');
					for(var x = 0;x < sizeSelect.length;x++){
						
						if(sizes[i + 1] == sizeSelect[x].id){
							//populate array with available sizes
							availableSizes.push(sizeSelect[x].id);
							//set style on active boxes
							sizeSelect[x].firstChild.style.color='#336799';
							sizeSelect[x].style.backgroundColor='#ffffff';
							
							$(sizeSelect[x].id).selected = false;
							$(sizeSelect[x].id).getFirst().addClass('anchor_box');
							$(sizeSelect[x].id).addEvent('click',function(){sizeClickV2(this);showPDError("","");});
							$(sizeSelect[x].id).addEvent('mouseover',function(){sizeMouseover(this);});
							$(sizeSelect[x].id).addEvent('mouseout',function(){sizeMouseout(this);});
						}
					}
				}

			} else {
				// set the value of skuId
				var thisSkuId = swatch.getProperty('rel').split('|')[2];
				var objSkuId = document.getElementById(skuId);
				strSkuSelected = thisSkuId;
				objSkuId.value = thisSkuId;

			}
		//} catch (e) {}

		//copy array for use with sizes
		findSizeSku = sizes;
	}
	

	
	
	
}

function setSize(currentSize) {
	var dropDownElem = document.getElementById("drop_down");

	for (var x=0;x < dropDownElem.length;x++) {

		if (currentSize == dropDownElem.options[x].text){

			dropDownElem.options[x].selected = true;
			dropDownElem.options[x].onchange;
			dropDownElem.options[x].onclick;
		}
	}
}

function setQuantity(currentQuantity) {
	var dropDownElem = document.getElementById("selQuantity");
	for (var z=0;z < dropDownElem.length;z++) {
		if (currentQuantity == dropDownElem.options[z].value) {
			dropDownElem.options[z].selected = true;
		}

	}

}

function attributeSelected (elmId) {
	var attrSelectedIndicator = document.getElementById(elmId);
	attrSelectedIndicator.value = 'true';
}

function initTabCss(){
	var objSummary = document.getElementById('divSummary');
	var objDetails = document.getElementById('divDetails');
	var objThird = document.getElementById('divThirdTab');
	var objThirdTab = document.getElementById('tabThirdTab');
}

function showSummaryText() {
	var objSummary = document.getElementById('divSummary');
	var objSummaryTab = document.getElementById('tabSummary');
	var objDetails = document.getElementById('divDetails');
	var objDetailsTab = document.getElementById('tabDetails');
	var objThird = document.getElementById('divThirdTab');
	var objThirdTab = document.getElementById('tabThirdTab');
	var objDetailsSummaryNav = document.getElementById('divDetailTabs');
	var arrLinks = objDetailsSummaryNav.getElementsByTagName('a');
	var strClassAttribute = 'class';
	if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
		strClassAttribute = 'className';
	}

	objDetails.style.display = 'none';
	objSummary.style.display = 'block';
	objThird.style.display = 'none';
	if (objSummaryTab ){
		objSummaryTab.setAttribute(strClassAttribute, "desc_nav_selected");
	}
	if (objDetailsTab ){
		objDetailsTab.setAttribute(strClassAttribute, "desc_nav_link");
	}
	if (objThirdTab ){
		objThirdTab.setAttribute(strClassAttribute, "desc_nav_link");
	}
}

function showThirdTab() {
	var objSummary = document.getElementById('divSummary');
	var objSummaryTab = document.getElementById('tabSummary');
	var objDetails = document.getElementById('divDetails');
	var objDetailsTab = document.getElementById('tabDetails');
	var objThird = document.getElementById('divThirdTab');
	var objThirdTab = document.getElementById('tabThirdTab');
	var objDetailsSummaryNav = document.getElementById('divDetailTabs');
	var arrLinks = objDetailsSummaryNav.getElementsByTagName('a');
	var strClassAttribute = 'class';
	if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
		strClassAttribute = 'className';
	}

	objThird.style.display = 'block';
	objDetails.style.display = 'none';
	objSummary.style.display = 'none';
	if (objSummaryTab ){
		objSummaryTab.setAttribute(strClassAttribute, "desc_nav_link");
	}
	if (objDetailsTab ){
		objDetailsTab.setAttribute(strClassAttribute, "desc_nav_link");
	}
	if (objThirdTab ){
		objThirdTab.setAttribute(strClassAttribute, "desc_nav_selected");
	}
}

function showDetailText() {
	var objSummary = document.getElementById('divSummary');
	var objSummaryTab = document.getElementById('tabSummary');
	var objDetails = document.getElementById('divDetails');
	var objDetailsTab = document.getElementById('tabDetails');
	var objThird = document.getElementById('divThirdTab');
	var objThirdTab = document.getElementById('tabThirdTab');
	var objDetailsSummaryNav = document.getElementById('divDetailTabs');
	var arrLinks = objDetailsSummaryNav.getElementsByTagName('a');
	var strClassAttribute = 'class';
	if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
		strClassAttribute = 'className';
	}

	objDetails.style.display = 'block';
	objSummary.style.display = 'none';
	objThird.style.display = 'none';
	if (objSummaryTab ){
		objSummaryTab.setAttribute(strClassAttribute, "desc_nav_link");
	}
	if (objDetailsTab ){
		objDetailsTab.setAttribute(strClassAttribute, "desc_nav_selected");
	}
	if (objThirdTab ){
		objThirdTab.setAttribute(strClassAttribute, "desc_nav_link");
	}
}

function updateDetailImage(strImageFormat,path,img) {
	var objDetailImage = document.getElementById("imgDetail");
	var strURL = "";
	strURL += path.toString() + img.toString() + '?$' + strImageFormat.toString() + '$';
	objDetailImage.src = strURL;
}

function showSizeNA() {
	var objMessage = document.getElementById('divSizeMessage');
	objMessage.innerHTML = 'This size is not available in the color you specified';
}

function clearSizeNA() {
	var objMessage = document.getElementById('divSizeMessage');
	objMessage.style.display = 'none';
}

function showMultiMore(intWhich) {
	var objSpanToHide = document.getElementById('spanMultiMoreLink'+intWhich);
	var objSpanToShow = document.getElementById('spanMultiMore'+intWhich);

	objSpanToHide.style.display = 'none';
	objSpanToShow.style.display = 'inline';
}

function showMultiSummary(intWhich) {
	var objDivToHide = document.getElementById('divMultiDescDetails'+intWhich);
	var objDivToShow = document.getElementById('divMultiDescSummary'+intWhich);
	var objDivMultiNav = document.getElementById('divMultiDescNav'+intWhich);
	var arrLinks = objDivMultiNav.getElementsByTagName('a');
	var strClassAttribute = 'class';
	if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
		strClassAttribute = 'className';
	}
	objDivToHide.style.display = 'none';
	objDivToShow.style.display = 'block';
	arrLinks[0].setAttribute(strClassAttribute, "multi_desc_nav_selected");
	arrLinks[1].setAttribute(strClassAttribute, "multi_desc_nav_link");		
}

function showMultiDetails(intWhich) {
	var objDivToHide = document.getElementById('divMultiDescSummary'+intWhich);
	var objDivToShow = document.getElementById('divMultiDescDetails'+intWhich);
	var objDivMultiNav = document.getElementById('divMultiDescNav'+intWhich);
	var arrLinks = objDivMultiNav.getElementsByTagName('a');
	var strClassAttribute = 'class';
	if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
		strClassAttribute = 'className';
	}
	objDivToHide.style.display = 'none';
	objDivToShow.style.display = 'block';
	arrLinks[0].setAttribute(strClassAttribute, "multi_desc_nav_link");
	arrLinks[1].setAttribute(strClassAttribute, "multi_desc_nav_selected");
}

function launchZoomViewer(strPagePath,strStyle,strSelectedColor, productId) {
	viewLarger(strPagePath,strStyle,strSelectedColor, productId)
}

function addToBag(strPage) {
	var objSkuSelected = document.getElementById(skuId);
	if (objSkuSelected.value=='none') {
		objSkuSelected.value = strSkuSelected;
	}
	//page won't proceed.
	if(!isAddToBagActive)return false;
	 
	// depending on value of strPage, validate form accordingly (possible values are "pd", "pdm", "pdm2")
	// will probably add some validation pieces here, but ultimately, if the form input is valid, the form should post and take the user to the Shopping Bag
	
	var blnSubmit = true;
	
	if (strPage == 'pd' || strPage == 'pd_multi') {
		// product detail
		var objSizeSelect = document.getElementById('drop_down');
		var objQuantitySelect = document.getElementById('selQuantity');
		//assign size
		dropDownSelect2(currentSizeSelected);
	}
	
	if (strPage == 'vgc') {
		// virtual gift card
		var checkoutToAddressBtn = document.getElementById("add_to_bag_btn");
		checkoutToAddressBtn.click();
	}
	
	if (strPage == 'tgc') {
		// traditional gift card
	}
	
	if (blnSubmit) {
		var checkoutToAddressBtn = document.getElementById("add_to_bag_btn");
		checkoutToAddressBtn.click();           
	}
}

function loadGCSwatches(){
	$$('.giftcard_swatch_link').each(
		function(target){
			target.addEvent('click', function(){gcSwatchClick(target);});
		});
}

function gcSwatchMouseover(swatch){
	if (swatch.selected == false){
		swatch.getFirst().removeClass('product_swatches_norm');
		swatch.getFirst().addClass('product_swatches_sel');
	}
	$(swatchDescription).innerHTML = swatch.getProperty('rel').split('|')[0];
}

function gcSwatchMouseout(swatch){
	if (swatch.selected == false){
		swatch.getFirst().removeClass('product_swatches_sel');
		swatch.getFirst().addClass('product_swatches_norm');
	}
	$(swatchDescription).innerHTML = selSwatchDesc;
}

function gcSwatchClick(swatch){
	swatch.getFirst().addClass('giftcard_swatch_selected');
}

function blurGCInput(e) {
	if (e.value=='') {
		if (e.name=='txtRecipientEmail') {
			e.value = 'Recipient\'s Email';
		} else if (e.name=='txtRecipientEmail2') {
			e.value = 'Confirm Recipient\'s Email';
		} else if (e.name=='txtSenderEmail') {
			e.value = 'Your Email';
		}
	}
}

function focusGCInput(e) {
	if ((e.name=='txtRecipientEmail') && (e.value == 'Recipient\'s Email')) {
		e.value = '';
	} else if ((e.name=='txtRecipientEmail2') && (e.value == 'Confirm Recipient\'s Email')) {
		e.value = '';
	} else if ((e.name=='txtSenderEmail') && (e.value = 'Your Email')) {
		e.value = '';
	}

}

function productDetailOnload(){
	init();
	loadSwatches();
	initTabCss(); 
	showHideTextInit();
}

function viewLargerOnload(){
	init();
	loadSwatches(null);
}

function viewLargerOnloadWithProduct(skuID,currentSize,currentQuantity) {
	init();
	loadSwatches(skuID);;
	dropDownSelect();
	setSize(currentSize);
	setQuantity(currentQuantity);
}

function sizeMouseover(size){
	if (size.selected == false){
		size.getFirst().removeClass('product_sizes_norm');
		size.getFirst().addClass('product_sizes_sel');
	}
}

function sizeMouseout(size){
	if (size.selected == false){
		size.getFirst().removeClass('product_sizes_sel');
		size.getFirst().addClass('product_sizes_norm');

	}
}

//user has clicked on size function
function sizeClickV2(size){
	//no size selected yet
	if (currentSizeSelected == "none"){
		size.getFirst().removeClass('product_swatches_norm');
		size.getFirst().addClass('product_sizes_sel_click');
		//assign size
		currentSizeSelected = size.id;
		attributeSelected(size.id);
		//active add to bag button
		isAddToBagActive = true;
		addToBagStatus();
	}
	//size is selected
	else{
		//size has not changed
		if(currentSizeSelected==size.id){
			currentSizeSelected=size.id;
		}
		//size has changed
		else{
			//reassign size and clear cells
			var resetCurrentSelectedCell = document.getElementById(currentSizeSelected);
			resetCurrentSelectedCell.getFirst().removeClass('product_sizes_sel_click');
			resetCurrentSelectedCell.getFirst().addClass('product_sizes_norm');
			
			size.getFirst().removeClass('product_swatches_norm');
			size.getFirst().addClass('product_sizes_sel_click');
			//assign new size
			currentSizeSelected = size.id;
			//active add to bag button
			isAddToBagActive = true;
			addToBagStatus();
				
		}
	}
	
}

function addToBagStatus(){
	var bagButtonToolTip = document.getElementById('divAddToBagButton');
	if(isAddToBagActive){
		document.getElementById('divAddToBagButton').style.backgroundColor = "#b6483b";
		//remove events to "add to bag button"
		$(bagButtonToolTip).removeEvents();
		document.getElementById('aBtnAddToBagLink').style.cursor="pointer";
	}
	//if no sizes available then set add to bag to active and !isAddToBagActive
	else if(document.getElementById("sizeContainer") == null){
		document.getElementById('divAddToBagButton').style.backgroundColor = "#b6483b";
        //remove events to "add to bag button"
        $(bagButtonToolTip).removeEvents();
        document.getElementById('aBtnAddToBagLink').style.cursor="pointer";
	}
	else{
		document.getElementById('divAddToBagButton').style.backgroundColor = "#bababa";
		//add events to "add to bag button"
		$(bagButtonToolTip).addEvent('mouseover',function(){tooltip.show('Please select a size');});
		$(bagButtonToolTip).addEvent('mouseout',function(){tooltip.hide();});
		document.getElementById('aBtnAddToBagLink').style.cursor="default";
	}
}

//reset all cells
function resetAllCells(){
	try{
		var sizeReset = document.getElementById('sizeContainer').getElementsByTagName('div');
		for(var z = 0;z < sizeReset.length;z++){
			//reset onclick event on sizes
			$(sizeReset[z].id).removeEvents();
		}
						
		for(var y = 0;y < sizeReset.length;y++){
			sizeReset[y].firstChild.style.color='#999999';
			sizeReset[y].style.backgroundColor='#cccccc';
			sizeReset[y].style.borderColor='#ffffff';
			
			sizeReset[y].getFirst().removeClass('product_sizes_sel_click');
			sizeReset[y].getFirst().addClass('product_sizes_norm');
		}
		
		//reset size array
		availableSizes = [];
	}
	catch(e){}
}

var tooltip=function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 300;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();

var strImageFormatDetail = "main";

function setSelectedSwatchColor(primarySku) {
	selectedSku = primarySku;
}

/*Updates the zoom viewer window. Required when an alt image or color swatch is clicked */
function updateZoom(newImageZoom){

    //move image area forward if a video has been played
    $j('#divImageSwap').css('z-index','100');
    $j('#s7_videoview').css('z-index','90');

    var newZoom = $j('#imgDetail');
    newZoom.attr('data-zoomsrc', newImageZoom);
    MojoZoom.makeZoomable(newZoom[0], newImageZoom, $(newZoom.attr('id') + "_zoom"), null, null, newZoom.data("zoomalwaysshow")=="true" );
}

function toggleProceedToCheckout(){
	if(isProceedToCheckoutActive)return false;
}

function showHideText(open){
	var currentHeight =document.getElementById('readMore').offsetHeight;
	
	if(open == 1){
		document.getElementById('readMore').style.height='100%';
		document.getElementById('readMore').style.minHeight='100%';
		document.getElementById('moreController').style.display='none';
		}
	else{
		document.getElementById('readMore').style.height='43px';
		document.getElementById('moreController').style.display='block';
		}
}

function showHideTextInit(){
	document.getElementById('readMore').style.height='43px';
	document.getElementById('moreController').style.display='block';
}

// These functions support Music CD sample tracks:
function playClip(f,i) {
	var divPlay = document.getElementById('clipPlay_'+i);
	var divStop = document.getElementById('clipStop_'+i);
	var dplFV = 'file=' + f + '&autostart=true';
	var dplFO = { movie:"/media/TB001/images/static/flash/mp3player.swf",width:"1",height:"1",majorversion:"7",build:"0",bgcolor:"#FFFFFF",flashvars:dplFV };
	UFO.create(dplFO,"player3");
	divPlay.style.display='none';
	divStop.style.display='block';

	//reset any other buttons that are still in 'play' mode:
	for (var x = 1, len = 13; x < len; x++) {
		if (x!=i){
			divPlay = document.getElementById('clipPlay_'+x);
			divStop = document.getElementById('clipStop_'+x);
			divPlay.style.display='block';
			divStop.style.display='none';
		}
	}
}

function stopClip(i) {
	var divPlay = document.getElementById('clipPlay_'+i);
	var divStop = document.getElementById('clipStop_'+i);
	var dplFO = { movie:"/media/TB001/images/static/flash/mp3player.swf",width:"1",height:"1",majorversion:"7",build:"0",bgcolor:"#FFFFFF",flashvars:"file=" };
	UFO.create(dplFO,"player3");
	divPlay.style.display='block';
	divStop.style.display='none';
}

function checkIfSizeContainerExists(){
	try{
		if(document.getElementById("sizeContainer")==null){
			isAddToBagActive = true;
			addToBagStatus();
			document.getElementById("divProductQuantity").style.paddingTop='15px';
		}
	}
	catch(e){}
}

window.addEvent('domready', function() {
	checkIfSizeContainerExists();
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		//add for out of stock product
		if(document.getElementById('choiceContainer') == null)showHideText();
	}

    fixTailoredShirts();

});

//quick fix for tailored shirts; fit is showing up as "TailoredShirt" so until we get a restart done (wednesday), we're just updating that HTML with JS
// 20140512 - quick, short-term fix
function fixTailoredShirts() {
    $j("div.fit_TailoredShirt").each(
        function(){
            var $this = $j(this);
            $this.html('Dress Shirt');
        }
    );
}
