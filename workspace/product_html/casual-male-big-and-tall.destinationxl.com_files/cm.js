/*
--------------------------------------------------

Casual Male DXL
Site-Wide Developer Scripts [cm.application.js]

Suresh Medavaram [suresh.medavaram@acquitygroup.com]
11/09/2010

Copyright (c) 2008-2010 Acquity Group LLC

--------------------------------------------------
*/

/*
Shipping page related scripts
*/

var skuAttributesString; // This needs to be a global because it's used in multiple
						// functions (and I don't want to refactor this entire file
						// to pass it as a parameter)
						//
						// skuAttributesString is what gets sent to the server as
						// an ajax call that gets the availability of that particu-
						// lar size/color/etc.

function popSpinSet(url){
	popUrl(url, 500, 400);
}

function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function popUrl(url, width, height){
	var newwindow=window.open(url,'name','height='+height+',width='+width);
	if (window.focus) {newwindow.focus()}
}

function setFormValues(submitVal) {
	document.shippingAddress.nickname.value = document.shippingAddress.address1.value;
	document.shippingAddress.submit();

}

function assignShipToAddressName() {
	var selVal = document.getElementById("selectshipToAddressName");
	var selOption = selVal.options[selVal.selectedIndex].value;
	document.shippingAddress.txtShipToAddressName.value = selOption;
}

function submitOthers(value)
{
	documentshipAddressMultiple.submit();
	document.multipleShipping.submit();
}

function setCids() {

	var cIds = document.multipleShippingAddr.myCommerceItemIdsToMove;
	var cIds1 = document.multipleShippingAddr.commerceItemIdsToMove;
	for (i=0; i<cIds.length;i++) {
		cIds1[i].value=cIds[i].value;
	}
}

/*
END Shipping page related scripts
*/

/*
Billing page related scripts
*/

function changeAddressTypeBilling(radio) {
	document.location.href = "billing.jsp?addressType=" + radio.value;
}


// Toggle Content
$(".giftCard a").click(function() {
	$(this).siblings("div").toggleClass("gCToggleContent");
});

$(".giftCard .typeCheck input").change(function() {
	$(this).parent(".typeCheck").siblings("div").toggleClass("gCToggleContent");
});

// Quick View functions
function updateCartDisplay (returnPath) {
	var inlineCartURL  = CONTEXT_ROOT + '/global/header/cart_summary.jsp?hasRealOrderTotal=false&returnPath='+ returnPath + '&foo=' + Math.floor(Math.random() * 10000);
	$.get(inlineCartURL, function(data) {
		  $('#persistentCart').html(data);
	});
	var miniCartURL  = CONTEXT_ROOT + '/global/header/minicart.jsp?returnPath='+returnPath + '&foo=' + Math.floor(Math.random() * 10000);
	$.get(miniCartURL, function(data) {
		$('#miniCart').html(data);
	}).complete(function() {miniCartItemAdded();});
}

function clearCreditCardFields() {
	$("#selectedCreditCardName").val('unselected');
	$("#creditCardNumberHidden").val('');
	$("#year").val('year');
	$("#month").val('month');
	$(".cardTypes input").removeAttr("disabled");
	$(".cardTypes input").attr("checked",false);
	$("#creditCardNumber").val('');
	$("#creditCardNumber").removeAttr("disabled");
	$("#cardSecurityCode").val('');
}

/*
Product Page scripts
*/

/*
	Adding function to copy skuAttributes Span Value to Sku Attributes Input field

*/
function updateSkuAttributesInput() {
	var selectedSkuAttributes = $('#skuAttributesSpan').text();
	 $('#skuAttributes').val(selectedSkuAttributes);
	 return true;
}

function cmChangeImage(zoomViewerUrl,newColor)
{

	embedSwf(zoomViewerUrl,'');
}


function cmChangeColor(newColor, newZoomViewerUrl, repositoryId)
{
	var oldColor = $("#cartColor").text();

	var unavailableColor = $("a#" + repositoryId).parent().hasClass("unavailable");
	if(unavailableColor != true){
		unavailableColor = ($("a#" + repositoryId).parent().hasClass("preSelect") && $("a#" + repositoryId).parent().hasClass("selected"));
	}
	if (unavailableColor != true) {
		cmChangeImage(newZoomViewerUrl,newColor);

		if($("#selectedColor").text() == newColor) {
			$("#selectedColor").text("");
		} else {
			$("#selectedColor").text(newColor);
		}
		if(oldColor!=null && oldColor.substr(0,newColor.length) === newColor){
			$("#cartColor").text("");
		}else{
			$("#cartColor").text(newColor+",");
		}

		cmChangeSize(repositoryId, "color");
	}
}

function cmChangeColorNew(newColor, repositoryId,obj,ignoreAvailability)
{

	// if the initial "preselect" click has been run (and has applied class="stopselected")
	// then don't allow this color to be deselected if it was preselected.
	// NOTE: this code blatantly doesn't work and this doesn't seem to be a requirement
	if (obj != undefined) {
		if ($(obj).parent(".preSelect").length > 0 && $(obj).parent(".stopselected").length > 0) {
			return false;
		}
	}
	
	var colorSelector = repositoryId;
	if(ignoreAvailability){
		colorSelector = repositoryId + "StrInv";
	}

	var oldColor = $("#cartColor").text();
	if(ignoreAvailability){
		oldColor = $("#storeCartColor").text();
	}

	var unavailableColor = $("a#" + colorSelector).parent().hasClass("unavailable");
	if(unavailableColor != true){
		unavailableColor = ($("a#" + colorSelector).parent().hasClass("preSelect") && $("a#" + colorSelector).parent().hasClass("selected"));
	}
	if (unavailableColor != true) {
		if(ignoreAvailability){
			var newColorHyphenated = newColor.replace(/ /gi,'-');
			newColorHyphenated = newColorHyphenated + "StrInv";
			$('.color.color'+newColorHyphenated).parent().addClass("stopselected");
			if($("#selectedColorStrInv").text() == newColor) {
				$('.color.color'+newColorHyphenated).parent().removeClass("stopselected");
				$("#selectedColorStrInv").text("");
			} else {
				$('.color.color'+newColorHyphenated).parent().addClass("stopselected");
				$("#selectedColorStrInv").text(newColor);
			}
			if(oldColor!=null && oldColor.substr(0,newColor.length) === newColor) {
				$("#storeCartColor").text("");
			}else{
				$("#storeCartColor").text(newColor+",");
			}
			cmChangeSize(repositoryId, "color",true);
		}else{
			var newColorHyphenated = newColor.replace(/ /gi,'-');
			if($("#selectedColor").text() == newColor) {
				$('.color.color'+newColorHyphenated).parent().removeClass("stopselected");
				$("#selectedColor").text("");
			} else {
				$('.color.color'+newColorHyphenated).parent().addClass("stopselected");
				$("#selectedColor").text(newColor);
			}
			if(oldColor!=null && oldColor.substr(0,newColor.length) === newColor) {
				$("#cartColor").text("");
			}else{
				$("#cartColor").text(newColor+",");
			}
			cmChangeSize(repositoryId, "color");
		}
	}
	
	if(!ignoreAvailability){
		if($("#"+repositoryId + "StrInv").length && (!$("#"+repositoryId + "StrInv").parent().hasClass("selected") &&
				!$("#"+repositoryId + "StrInv").parent().hasClass("preSelect"))){
		$("#"+repositoryId + "StrInv").click();
	}
}
}

function cmChangeThumbnailColor(color, idSelector, prodId)
{	
//    var prodImageId = "#productId"+idSelector;
    var prodImageClass = "img."+prodId;
    
    var origSrc = $(prodImageClass).attr('src');
    
    var subString;
 // BRIAN - Change below
    if(origSrc.indexOf("/new") == -1)
    { subString = origSrc.replace(origSrc.substring(origSrc.lastIndexOf("/")+1,origSrc.indexOf("?")),""); }
    else
    { subString = origSrc.replace(origSrc.substring(origSrc.indexOf("src=")+4,origSrc.indexOf("&size=")),""); }
    // BRIAN - Change below
    if(origSrc.indexOf("/new") == -1)
    { $(prodImageClass).attr('src',subString.splice(origSrc.lastIndexOf("/")+1,0,'p'+prodId+color)); }
    else
    { $(prodImageClass).attr('src',subString.splice(origSrc.indexOf('src=')+4,0,'p'+prodId+color)); }
    
}


// This function is run any time a size is clicked.
// If this size is not available, return false and
// do not do anything. If it is available, call
// cmChangeSize.
function cmsChangeSize(obj) {

	var attrName = $(obj).attr('class');
	var attrNameParent = $(obj).parent().attr('class');
	var chosenHemmingLength = "#chosenHemmingLength";
	//alert("attrNameParent:" + attrNameParent);
	var attrValue = $(obj).text();
	var attrId = attrName + attrValue;
	var targetChosenHemmingLength = "#" + attrId + " " + chosenHemmingLength;

	// Find if the parent has a class of "unavailable", or its preselected and has already been selected
	// http://stackoverflow.com/questions/31044/is-there-an-exists-function-for-jquery
	//
	if ($(obj).parent(".unavailable").length > 0 || ($(obj).parent(".preSelect").length > 0 && $(obj).parent(".selected").length > 0) ) {
		return false;
	}

	/*If the selected attrName is rise then based on the attrValue(Long,Reg,Short)enable #customHemmingLengths
	and disable #defaultHemmingLengths. (R2 requirement so that users can't select hemmingLengths which are
	not associated with the rise)*/
	/*
	if(attrName == 'rise'){

		// Get the hemming that the user has selected.
		// First see if it's on one of the rise-specific dropdowns -- the first not-hidden one is the selected one.
		var selectedHemming = $('select[id^="select-rise"]:not(:hidden)').val();
		// If we didn't get selected hemming off a rise-specific dropdown, it must be in the default one.
		if (selectedHemming == null) {
			selectedHemming = $('select[id="hemmingLength"]').val();
		}

		// Clear out the selection from the rise-specific and default-dropdowns.
		$('select[id^="select-rise"]').attr("value","");
		$('select[id="hemmingLength"]').attr("value","");

		// We also need to clear the name from the rise-specific drop-downs,
		// as both map to the same bean and otherwise, only the first is read.
		$('select[id^="select-rise"]').attr("name","");

		if(attrNameParent == ""){
			$('ul[id^="rise"]').hide();
			$("#defaultHemmingLengths").hide();
			$(targetChosenHemmingLength).text("");
			$("#"+attrId).show();

			// If the rise we're switching to has the selected hemming, set it on the new drop-down
			if (0 != $("#"+attrId+" option[value='"+selectedHemming+"']").length) {
				$('select[id="select-rise-'+attrValue+'"]').attr("value",selectedHemming);
				$(targetChosenHemmingLength).text(selectedHemming);

			// If it does not, then clear the text from the add to cart area
			} else {
				$("#cartHemmingLength").text("");
			}

			// Also make sure we reset the bean association in the "name" property to whichever rise we've selected.
			$('select[id="select-rise-'+attrValue+'"]').attr("name","/atg/commerce/order/purchase/CartModifierFormHandler.hemmingLength");

		} else if (attrNameParent == "selected"){
			// If we're de-selecting an option, clear everything
			$('ul[id^="rise"]').hide();
			$("#defaultHemmingLengths #chosenHemmingLength").text("");
			$("#defaultHemmingLengths").show();
			$("#cartHemmingLength").text("");
			// We know we have the chosen hemming in the default hemming list, so set it
			$('select[id="hemmingLength"]').attr("value",selectedHemming);
		}
		//alert("attrName:attrValue" + attrName + "-" + attrValue);
		//$('ul[id^="rise"]').hide();
		//$("#defaultHemmingLengths").toggle();
		//$("#chosenHemmingLength").text("");
		//$("#"+attrId).toggle();
		//$("#defaultHemmingLengths").toggle();
	}

	*/

	cmChangeSize($(obj).text(), $(obj).attr('class'),false);

	//so links don't do anything
	return false;
}

function cmsChangeSizeIgnoreAvailability(obj){
	var attrName = $(obj).attr('class');
	var attrNameParent = $(obj).parent().attr('class');
	var chosenHemmingLength = "#chosenHemmingLength";
	//alert("attrNameParent:" + attrNameParent);
	var attrValue = $(obj).text();
	var attrId = attrName + attrValue;
	var targetChosenHemmingLength = "#" + attrId + " " + chosenHemmingLength;

	// Find if the parent has a class of "unavailable", or its preselected and has already been selected
	// http://stackoverflow.com/questions/31044/is-there-an-exists-function-for-jquery
	//
	if ($(obj).parent(".unavailable").length > 0 || ($(obj).parent(".preSelect").length > 0 && $(obj).parent(".selected").length > 0) ) {
		return false;
	}
	cmChangeSize($(obj).text(), $(obj).attr('class').replace('StrInv',''),true);
	//so links don't do anything
	return false;
}

function cmChangeSize(attrValue, attrName,ignoreAvailability)
{
	if(ignoreAvailability == undefined){
		ignoreAvailability = false;
	}

	var sizeId ="#" + attrName;
	if(ignoreAvailability){
		sizeId = sizeId + "StrInv";
	}
	var sizeIdIsInput = $(sizeId).is(":input");

	var cartId ='#cart' + attrName;
	if(ignoreAvailability){
		cartId ='#storeCart' + attrName;
	}

	var oldAttrValue = $(cartId).text();

	oldAttrValue = oldAttrValue.replace(",","");
	oldAttrValue = oldAttrValue.replace("/ /g","");

	//if()

	if(oldAttrValue!=null && oldAttrValue == attrValue){
		$(cartId).text("");
		//return;
	}else{
		$(cartId).text(attrValue+",");
	}
	// skuAttributesString = $('#skuAttributes').val();
	skuAttributesString = $('#skuAttributesSpan').text();
	if(ignoreAvailability){
		skuAttributesString = $('#skuAttributesSpanStrInv').text();
	}
	if (skuAttributesString == null) { // for IE bug
		skuAttributesString = '';
	}


	var tempAttrString = "";
	var attrString = attrName + '=';
	if (attrValue) {
		tempAttrString = attrName + '=' + attrValue + '@';
	}

	// var oldvalue = (sizeIdIsInput ? $(sizeId).val() :  $(sizeId).text());
	var oldvalue = (sizeIdIsInput ? oldAttrValue :  $(sizeId).text());
	var oldAttrString = attrName + '=' + oldvalue + '@';
	
	var attrNameSelector = attrName;
	if(ignoreAvailability){
		attrNameSelector = attrName + "StrInv";
	}

	//if this sku attr has already a value then it should already be in the
	//skuAttributesString and needs to be removed.
	if($("#" + attrNameSelector).text() != "" ) {

		skuAttributesString = skuAttributesString.replace(oldAttrString, "");
		//escape the . /  for half sizes.
		var safeString = oldvalue.replace(/\./, "\\.");
		safeString = safeString.replace(" ","\\ ");
		safeString = safeString.replace("/", "\\/");
		safeString = safeString.replace("(", "\\(");
		safeString = safeString.replace(")", "\\)");
		if(ignoreAvailability){
			safeString = safeString + "StrInv";
		}
		$("#" + attrName + "-" + safeString).parent().removeClass("selected");

		if (!sizeIdIsInput) {
			$(sizeId).text("");
		}


	}

	// debug alert('DEBUG\nskuAttributesString:'+skuAttributesString+'\nattrValue:'+attrValue+'\ntempAttrString:'+tempAttrString+'\noldAttrString:'+oldAttrString);
	if(tempAttrString && oldAttrString != tempAttrString) {
		skuAttributesString = skuAttributesString + tempAttrString;
		var safeString = attrValue.replace(/\./, "\\.");
		safeString = safeString.replace(" ","\\ ");
		safeString = safeString.replace("/", "\\/");
		safeString = safeString.replace("(", "\\(");
		safeString = safeString.replace(")", "\\)");
		if(ignoreAvailability){
			safeString = safeString + "StrInv";
		}
		$("#" + attrName + "-" + safeString).parent().addClass("selected");
		
		if (!sizeIdIsInput) {
			$(sizeId).text(attrValue);
		}
	}
	if(ignoreAvailability){
	 $('#skuAttributesSpanStrInv').text(skuAttributesString);
	}else{
	 $('#skuAttributesSpan').text(skuAttributesString);
	}
	updateSkuAvailability(attrName,ignoreAvailability);

	if(!ignoreAvailability){
		//figure out if select or input
		var input = $("#" + attrName + "StrInv");
		if(input.is("select") && ! input.parents("li").hasClass("preSelect")){
			input.val($("#"+attrName).val());
			input.change();
		}else{
			var idSelector = attrName +"-"+ attrValue + "StrInv";
			$("[id='" + idSelector +"']").val($("#" + attrName + +"-"+ attrValue).val())
			$("[id='" + idSelector +"']").click();
		}
	}
}

function changeHemmingOption(obj,ignoreAvailability){
	
	if(ignoreAvailability == undefined){
		ignoreAvailability = false;
	}
	
	var hemmingValue = obj.value;
	var hemmingText = "#chosenHemmingLength";
	var cartHemmingText="#cartHemmingLength";
	if(ignoreAvailability){
		hemmingText = "#chosenHemmingLengthStrInv";
		cartHemmingText="#cartHemmingLengthStrInv";
	}
	var hemmingLengthParent = $(obj).closest("ul").attr("id");
	var hemmingLengthParentId = "#" + hemmingLengthParent + " " + hemmingText;
    
	$(hemmingLengthParentId).text(hemmingValue);
	$(cartHemmingText).text(hemmingValue + ",");

	skuAttributesString = $('#skuAttributesSpan').text();
	if(ignoreAvailability){
		skuAttributesString = $('#skuAttributesSpanStrInv').text();
	}

	updateSkuAvailability(skuAttributesString,ignoreAvailability);
	
	if(!ignoreAvailability){
		$("#hemmingLengthStrInv").val(hemmingValue);
		$("#hemmingLengthStrInv").change();
	}
}
function changeMiscSizeOption(obj,id){
	$('#'+id).text(obj.value);
}


/**
 * Make a AJAX call to get the new sku availability using a product Id
 * and sku attributes.  Update the sku attributes on the page that are no
 * longer available with the attributes chosen.
 *
 * Update all attributes EXCEPT the selected attribute
 */
function updateSkuAvailability(selectedAttr, ignoreAvailability) {

		var productId = $("#productId").val();
		var checkAvailability = true;
		
		if(ignoreAvailability != undefined){
			var checkAvailability = !ignoreAvailability;
		}

		// Get the hemming that the user has selected.
		// First see if it's on one of the rise-specific dropdowns -- the first not-hidden one is the selected one.
		var hemmingText = $('select[id^="select-rise"]:not(:hidden)').val();
		// If we didn't get selected hemming off a rise-specific dropdown, it must be in the default one.
		if (hemmingText == null) {
			hemmingText = $('select[id="hemmingLength"]').val();
			if(ignoreAvailability){
				hemmingText = $('select[id="hemmingLengthStrInv"]').val();
			}
		}
		var quantity = $("#quantity").val();
		var priceRange = $("#priceRange").val();
		var complexPriceId = $("#complexPriceId").val();

		$.post('/mens-big-and-tall-store/catalog/includes/filterSkuOnAttributes.jsp',
				{productId: productId, skuAttributes: skuAttributesString, quantity: quantity, hemmingMessage: hemmingText, priceRange: priceRange, complexPriceId: complexPriceId, checkAvailability: checkAvailability},
		 function(data) {

			
			if(!ignoreAvailability){
				$("#availability").text(data.inventoryMessage);
				$("#cartPrice").text(data.skuPrice);
				$("#hemmingMessage").text(data.hemmingMessage);
				$("#reqSkuId").val(data.skuId);
			}
			if(data.isSurchargePresent == true) {
				$("#surchargeMessage").text(data.surchargeMessage);
			}
			//$("#pantHemmingMessage").text(data.pantHemmingMessage);
			$("#requiredAttributes").val(data.requiredAttributes);
			//$("#storeCartSkuId").text(data.skuId);

			//do availability check here
			
			//reset 'size' attribute value elements.
			enableAttributeValueElements("size", data.size,checkAvailability);

			//reset 'waistSize' attribute value elements.
			enableAttributeValueElements("waistSize", data.waistSize,checkAvailability);

			//reset 'coatSize' attribute value elements.
			enableAttributeValueElements("coatSize", data.coatSize,checkAvailability);

			//reset 'coatLength' attribute value elements.
			enableAttributeValueElements("coatLength", data.coatLength,checkAvailability);

			//reset 'pantLength' attribute value elements.
			enableAttributeValueElements("pantLength", data.pantLength,checkAvailability);
			
			//reset 'miscSize' attribute value elements.
			enableAttributeValueElementsDropdown("miscSize", data.miscSize,checkAvailability);
			enableAttributeValueElementsDropdown("miscSize2", data.miscSize2,checkAvailability);
			enableAttributeValueElementsDropdown("miscSize3", data.miscSize3,checkAvailability);

			var theSelect = $('select[name=pantLength]');
			if(ignoreAvailability){
				theSelect = $('select[name=pantLengthStrInv]');
			}
			
			if (theSelect.length > 0) {
				//var theSelect = $('select[name=hemmingLength]');
				var selectedValue = theSelect.val();
				var firstOption = $(document.createElement("option")).attr("value","").text("Select Inseam"); //theSelect.children().first();
				theSelect.empty();
				theSelect.append(firstOption);
				if (data.pantLength != null) {
					var pantLengths = data.pantLength;
					//pantLengths = pantLengths.sort();
					for(var i=0; i < pantLengths.length; i++) {
						theSelect.append($(document.createElement("option")).attr("value",pantLengths[i]).text(pantLengths[i]));

					}
				}
				//alert("selected value:" + selectedValue);
				if(ignoreAvailability){
					$('#chosenHemmingLengthStrInv').text(selectedValue)
				}else{
					$('#chosenHemmingLength').text(selectedValue)
				}
				theSelect.val(selectedValue);
			}


			var theSelect = $('#hemmingLength');
			if(ignoreAvailability){
				theSelect = $('#hemmingLengthStrInv');
			}
			if (theSelect.length > 0)  {
				var selectedValue = theSelect.val();
				var selectedValueStillValid = false;
				if (selectedValue == 'Unfinished') {
					selectedValueStillValid = true;
				}

				var firstHemmingOption = $(document.createElement("option")).attr("value","").text("Select Inseam"); //theSelect.children().first();
				var unfinishedOption =  $(document.createElement("option")).attr("value","Unfinished").text("Unfinished");
				theSelect.empty();
				theSelect.append(firstHemmingOption);
				theSelect.append(unfinishedOption);
				if(data.hemmingLength != null) {
					var hemmingLengths = data.hemmingLength;
					hemmingLengths = hemmingLengths.sort();
					for(var i=0; i < hemmingLengths.length; i++) {
						if (hemmingLengths[i] == selectedValue) {
							selectedValueStillValid = true;
						}
						theSelect.append($(document.createElement("option")).attr("value",hemmingLengths[i]).text(hemmingLengths[i]));

					}
				}
				if (selectedValueStillValid) {
					if(ignoreAvailability){
						$('#chosenHemmingLengthStrInv').text(selectedValue)
					}else{
						$('#chosenHemmingLength').text(selectedValue)
					}
					theSelect.val(selectedValue);
				}
			}



			//reset 'shoeSize' attribute value elements.
			enableAttributeValueElements("shoeSize", data.shoeSize,checkAvailability);

			//reset 'sleeveSize' attribute value elements.
			enableAttributeValueElements("sleeveSize", data.sleeveSize,checkAvailability);

			//reset 'shoeWidth' attribute value elements.
			enableAttributeValueElements("shoeWidth", data.shoeWidth,checkAvailability);

			//reset 'rise' attribute value elements.
			enableAttributeValueElements("rise", data.rise,checkAvailability);

			//reset 'neckSize' attribute value elements.
			enableAttributeValueElements("neckSize", data.neckSize,checkAvailability);

			//reset 'shortLength' attribute value elements.
			enableAttributeValueElements("shortLength", data.shortLength,checkAvailability);

			//reset 'pantSize' attribute value elements.
			enableAttributeValueElements("pantSize", data.pantSize,checkAvailability);

			//reset 'underwearLength' attribute value elements.
			enableAttributeValueElements("underwearLength", data.underwearLength,checkAvailability);
			
			var cuff = "cuff"
			if(!checkAvailability){
				cuff = cuff + "StrInv";
			}
			//disable all sizes
			$("a."+cuff).parent().addClass("unavailable");
			//re-enable all sizes in list
			if(data.cuff != null) {
				var cuffs = data.cuff;
				for(var i=0; i < cuffs.length; i++) {
					//$("a.cuff:equals(" + cuffs[i] + ")").parent().removeClass("unavailable");
					$("a."+cuff).each(function(index, Element){
						if ($(this).text() == cuffs[i]) {
							$(this).parent().removeClass("unavailable");
						}

					});
				}
			}
			//disable all sizes
			var color = "color"
			if(!checkAvailability){
				color = color + "StrInv";
			}
			$("a."+color).parent().addClass("unavailable");
			$("a."+color).children("#unavailableColorImage").css('display','inline');
			//re-enable all sizes in list
			if(data.color != null) {
				var colors = data.color;
				for(var i=0; i < colors.length; i++) {
					var colorId = colors[i].split(":")[1];
					if(!checkAvailability){
						colorId = colorId + "StrInv";
					}
					$("#" + colorId).parent().removeClass("unavailable");
					$("#" + colorId).find('#unavailableColorImage').css('display','none');
				}
			}

		}, "json");

}

function enableAttributeValueElementsDropdown(attributeClass, attributeValues,checkAvailability) {
	var storeInventoryClass = attributeClass;
	if(!checkAvailability){
		storeInventoryClass = attributeClass + "StrInv";
	}
	var theSelect = $('#' + storeInventoryClass);
	if (theSelect.length > 0) {
		//var theSelect = $('select[name=hemmingLength]');
		var selectedValue = theSelect.val();

		var firstOption = $(document.createElement("option")).attr("value","").text("Please Choose"); //theSelect.children().first();
		theSelect.empty();
		theSelect.append(firstOption);
		if (attributeValues != null) {
			var pantLengths = attributeValues;
			pantLengths = pantLengths.sort();
			for(var i=0; i < pantLengths.length; i++) {
				theSelect.append($(document.createElement("option")).attr("value",pantLengths[i]).text(pantLengths[i]));

			}
		}
		//alert("selected value:" + selectedValue);
		$('#' + storeInventoryClass + 'Chosen').text(selectedValue);
		theSelect.val(selectedValue);
	}
}


//Reset the product attribute value elements based on its availability
//attributeClass = the class name of the element that is used to represent a particular attribute
//               eg. All size href elements are set with class 'size';
// 				     All shoeWidth href elements are set with class 'shoeWidth';
//attributeValues = the set of values of the attribute that are in-stock
function enableAttributeValueElements(attributeClass, attributeValues, checkAvailability){
	// disable everything first
	var storeInventoryClass = attributeClass;
	if(!checkAvailability){
		storeInventoryClass = attributeClass + "StrInv";
	}
	$("a."+storeInventoryClass).parent().addClass("unavailable");
	if(attributeValues != null) {
		// iterate through in-stock attribute set and selectively enable them based on their elementId
		for(var i=0; i < attributeValues.length; i++) {
			// escape characters that cause jQuery issues when searching for elements based on Id
			var tempString = attributeValues[i];
			tempString = tempString.replace(/\./, "\\.");
			tempString = tempString.replace("/", "\\/");
			tempString = tempString.replace(" ", "\\ ");
			if(!checkAvailability){
				tempString = tempString + "StrInv";
			}
			var attribElemId = attributeClass + "-" + tempString;
			// Enable the element that represent the available attribute value. 
			// This is the id associated with the html element that represents an outfit product level attribute value. eg size-XL 
			$("#"+attribElemId).parent().removeClass("unavailable");
		}
	}
}

//Reset the outfit product attribute value elements based on its availability
//productId = the outfit product Id
//attributeClass = the class name of the element that is used to represent a particular attribute
//                 eg. All size href elements are set with class 'size';
//					   All shoeWidth href elements are set with class 'shoeWidth';
//attributeValues = the set of values of the attribute that are in-stock
function enableOutfitAttributeValueElements(productId, attributeClass, attributeValues){
	// This is the class name associated with the html element that represents an outfit product level attribute value. eg prod92838-size 
	var prodAttributeClass = "prod" + productId + "-" + attributeClass;
	// disable everything first
	$("a." + prodAttributeClass).parent().addClass("unavailable");
	if(attributeValues != null) {
		// iterate through in-stock attribute set and selectively enable them based on their elementId
		for(var i=0; i < attributeValues.length; i++) {
			var tempString = attributeValues[i];
			// escape characters that cause jQuery issues when searching for elements based on Id
			tempString = tempString.replace(/\./, "\\.");
			tempString = tempString.replace("/", "\\/");
			tempString = tempString.replace(" ", "\\ ");
			// Enable the element that represent the available attribute value. 
			// This is the id associated with the html element that represents an outfit product level attribute value. eg 92838-size-XL 
			var attribElemId = productId + "-" + attributeClass + "-" + tempString;
			$("#"+attribElemId).parent().removeClass("unavailable");
		}
	}
}
function enableOutfitAttributeValueElementsDropdown(productId, attributeClass, attributeValues) {
	var theSelect = $('#' + productId + "-" + attributeClass);
	if (theSelect.length > 0) {
		//var theSelect = $('select[name=hemmingLength]');
		var selectedValue = theSelect.val();

		var firstOption = $(document.createElement("option")).attr("value","").text("Please Choose"); //theSelect.children().first();
		theSelect.empty();
		theSelect.append(firstOption);
		if (attributeValues != null) {
			var pantLengths = attributeValues;
			pantLengths = pantLengths.sort();
			for(var i=0; i < pantLengths.length; i++) {
				theSelect.append($(document.createElement("option")).attr("value",pantLengths[i]).text(pantLengths[i]));

			}
		}
		//alert("selected value:" + selectedValue);
		$('dd#' + attributeClass + '-' + productId).text(selectedValue);
		theSelect.val(selectedValue);
	}
}
/*
END Product Page scripts
*/
/*
 * Cart Update submit function
 * */
function submitCheckoutForm(skuId) {
	var sku= document.getElementById(skuId);
	var cartRelationShipId = document.getElementById("cartRelationShipId");
	cartRelationShipId.value = skuId;
	var upQty = document.getElementById("updateQuantity");
	upQty.value = sku.value;

	var chkform = document.getElementById("checkoutForm");
	chkform.submit();
}

/*
 * Outfit functions
 *
 * */

 function changeOutfitHemmingOption(obj,prodId){
	var hemmingValue = obj.value;
	var hemmingText = "#chosenHemmingLength-" + prodId;
	var cartHemmingText="#cartHemmingLength";

	$(hemmingText).text(hemmingValue);
	$(cartHemmingText).text(hemmingValue + ",");

	skuAttributesString = $('#skuAttributes').val();
	updateOutfitSkuAvailability(skuAttributesString,prodId);
}

function cmOutfitChangeColor(newColor, newZoomViewerUrl, repositoryId, prodId, obj)
{
	// if the initial "preselect" click has been run (and has applied class="stopselected")
	// then don't allow this color to be deselected if it was preselected.
	if (obj != undefined) {
		if ($(obj).parent(".preSelect").length > 0 && $(obj).parent(".stopselected").length > 0) {
			return false;
		}
	}

	var selectedColor = "#selectedColor" + '-' + prodId;
	var unavailableColor = $("a.prod" + prodId + "-color.color-" + repositoryId).parent().hasClass("unavailable");
	if(unavailableColor != true){
		unavailableColor = ($("a.prod" + prodId + "-color.color-" + repositoryId).parent().hasClass("preSelect") && $("a.prod" + prodId + "-color.color-" + repositoryId).parent().hasClass("selected"));
	}
	if (unavailableColor != true) {
		//cmChangeImage(newZoomViewerUrl);
		// alert(' change #productId-'+prodId+' into ' + newZoomViewerUrl);

		var newColorHyphenated = newColor.replace(/ /gi,'-');
		$("a.prod" + prodId + "-color.color-" + repositoryId).parent().addClass("stopselected");

		$("#productId-" + prodId).attr('src',newZoomViewerUrl);
		if($(selectedColor).text() == newColor) {
			$(selectedColor).text("");
			//return;
		} else {
			$(selectedColor).text(newColor);
		}
		$("#cartColor").text(newColor+",");
		cmOutfitChangeSize(repositoryId, "color", prodId);
	}
}

function cmOutfitChangeThumbnailColor(newThumbURL, indexCount)
{
    var prodImageId = "#productId"+indexCount;
	$(prodImageId).attr('src', newThumbURL);
}

function cmsOutfitChangeSize(obj, prodId) {
	if ($(obj).parent(".unavailable").length > 0 || ($(obj).parent(".preSelect").length > 0 && $(obj).parent(".selected").length > 0)) {
		return false;
	}

	var attrClass = ($(obj).attr('class').split(' ')[0]);
	
	cmOutfitChangeSize($(obj).text(), attrClass, prodId);
	return false;
}

function cmsOutfitChangeMiscSize(obj, value, prodId) {
    var attrClass = ($(obj).attr('class').split(' ')[0]);
	cmOutfitChangeSize(value, attrClass, prodId);
	return false;
}

function cmOutfitChangeSize(attrValue, attrName, prodId)
{
	var sizeId ="#" + attrName + '-' + prodId;
	var cartId ='#cart' + attrName;

	$(cartId).text(attrValue+",");
	var skuAttributesString = $('#skuAttributes').val();

	if(skuAttributesString.match(prodId)) {

	} else {
		if(skuAttributesString.match(":")) {
			skuAttributesString = skuAttributesString + "," + prodId + ":";
		} else {
			skuAttributesString = prodId + ":" + skuAttributesString;
		}
	}

	var attrString = attrName + '=';
	if(attrName != "pantLength"){
		var tempAttrString = attrName + '=' + attrValue + '@';
	}else{
		if(!attrValue.length){
			/*dropdown is deselected before grabbing the attrValue, unlike
			 normal buttons, thus we need to get the value from the existing
			 text value, if it is being deselected completely, so we can
			 remove the value from the attribute string */
			var tempAttrString = attrName + '=' + $(sizeId).text() + '@';
		}else{
			var tempAttrString = attrName + '=' + attrValue + '@';
		}
	}
	var oldvalue = $(sizeId).text();
	var oldAttrString = attrName + '=' + oldvalue + '@';

	//extract the attributes associated to the product.
	var prodAttrs = skuAttributesString.substring(skuAttributesString.indexOf(prodId, 0), skuAttributesString.length);
	if (prodAttrs == null) {
	} else {
		var idx = prodAttrs.indexOf(",", 0);
		if (idx > -1) {
			prodAttrs = prodAttrs.substring(0, idx);
		}
	}

	var prdIdx = skuAttributesString.indexOf(","+prodAttrs);
	if (prdIdx > -1) {
		//alert("in if");
		skuAttributesString = skuAttributesString.replace("," + prodAttrs,"");
	} else {
		//alert("in else");
		skuAttributesString = skuAttributesString.replace(prodAttrs,"");
	}


	if($("#" + attrName + '-' + prodId).text() != "" ) {
		prodAttrs = prodAttrs.replace(oldAttrString, "");
		//escape the . /  for half sizes.
		var safeString = oldvalue.replace(/\./, "\\.");
		safeString = safeString.replace("/", "\\/");
		safeString = safeString.replace("(", "\\(");
		safeString = safeString.replace(")", "\\)");
		$("a.prod" + prodId + "-" + attrName + "-" + safeString).parent().removeClass("selected");
		$(sizeId).text("");
	}

	if(oldAttrString != tempAttrString) {
		prodAttrs = prodAttrs + tempAttrString;
		var safeString = attrValue.replace(/\./, "\\.");
		safeString = safeString.replace("/", "\\/");
		safeString = safeString.replace("(", "\\(");
		safeString = safeString.replace(")", "\\)");
		$("a.prod" + prodId + "-" + attrName + "-" + safeString).parent().addClass("selected");
		//alert(attrValue);
		if ( $("select.prod" + prodId + "-" + attrName).length >0 ){
			$("select.prod" + prodId + "-" + attrName).val( attrValue );
		}
		$(sizeId).text(attrValue);
	}

	//console.log("length >> " + skuAttributesString.length);
	if (skuAttributesString.length > 0) {
		skuAttributesString = skuAttributesString + "," + prodAttrs;
	} else {
		skuAttributesString = skuAttributesString + prodAttrs;
	}

	//console.log("skuAttributesString >> " + skuAttributesString);
	$('#skuAttributes').val(skuAttributesString);

	updateOutfitSkuAvailability(attrName, prodId);

}


/**
 * Make a AJAX call to get the new sku availability using a product Id
 * and sku attributes.  Update the sku attributes on the page that are no
 * longer available with the attributes chosen.+
 *
 * Update all attributes EXCEPT the selected attribute
 */
function updateOutfitSkuAvailability(selectedAttr, prodId) {

		var productId = prodId; //$("#productId").val();
		var hemmingText = $("#hemmingLength-" + productId).val();
		var quantity = $("#quantity-" + productId).val();
		//console.log("selectedAttr: " + selectedAttr);
		//console.log("productId: " + productId);
		
		var skuAttributesString = $('#skuAttributes').val();

		var indexofProductId = skuAttributesString.indexOf(prodId, 0);
		var prodAttrs = "";
		if (indexofProductId >= 0) {
			prodAttrs  = skuAttributesString.substring(indexofProductId, skuAttributesString.length);
			skuAttributesString = prodAttrs.replace(productId + ":","");
		}else{
			//hemming option which doesnt appear in string
			skuAttributesString = "";
		}

		$.post('/mens-big-and-tall-store/catalog/includes/filterOutfitSkuOnAttributes.jsp',
				{productId: productId, quantity: quantity, skuAttributes: skuAttributesString, hemmingMessage: hemmingText, checkAvailability: 'true' },
		 function(data) {

			$("#availability-" + prodId).text(data.inventoryMessage);
			$("#hemmingMessage-" + prodId).text(data.hemmingMessage);
			$("#cartPrice").text(data.skuPrice);
			
			if(data.isSurchargePresent == true) {
				$("#surchargeMessage-" + prodId).text(data.surchargeMessage);
			}

			//reset outfit product 'size' attribute value elements.
			enableOutfitAttributeValueElements(productId, "size", data.size);

			//reset outfit product 'waistSize' attribute value elements.
			enableOutfitAttributeValueElements(productId, "waistSize", data.waistSize);

			//reset outfit product 'coatSize' attribute value elements.
			enableOutfitAttributeValueElements(productId, "coatSize", data.coatSize);

			//reset outfit product 'coatLength' attribute value elements.
			enableOutfitAttributeValueElements(productId, "coatLength", data.coatLength);

			//reset outfit product 'pantLength' attribute value elements.
			enableOutfitAttributeValueElements(productId, "pantLength", data.pantLength);
			
			//reset outfit product 'miscSize' attribute value elements.
			enableOutfitAttributeValueElementsDropdown(productId, "miscSize", data.miscSize);
			enableOutfitAttributeValueElementsDropdown(productId, "miscSize2", data.miscSize2);
			enableOutfitAttributeValueElementsDropdown(productId, "miscSize3", data.miscSize3);

			var theSelect = $('#' + productId + "-pantLength");
			if (theSelect.length > 0) {
				var selectedValue = theSelect.val();

				var firstOption = $(document.createElement("option")).attr("value","").text("Select Inseam"); //theSelect.children().first();
				theSelect.empty();
				theSelect.append(firstOption);
				if(data.pantLength != null) {
					var pantLengths = data.pantLength;
					//pantLengths = pantLengths.sort();
					for(var i=0; i < pantLengths.length; i++) {
						theSelect.append($(document.createElement("option")).attr("value",pantLengths[i]).text(pantLengths[i]));
					}
				}
				theSelect.val(selectedValue);
			}
			// HemmingLength
			var theSelect = $('#' + "hemmingLength-" + productId);
			if (theSelect.length > 0) {
				var selectedValue = theSelect.val();
				var selectedValueStillValid = false;
				if (selectedValue == 'Unfinished') {
					selectedValueStillValid = true;
				}

				var firstOption = $(document.createElement("option")).attr("value","").text("Select Inseam"); //theSelect.children().first();
				var unfinishedOption =  $(document.createElement("option")).attr("value","Unfinished").text("Unfinished");
				theSelect.empty();
				theSelect.append(firstOption);
				theSelect.append(unfinishedOption);
				if(data.hemmingLength != null) {
					var hemmingLengths = data.hemmingLength;
					hemmingLengths = hemmingLengths.sort();
					for(var i=0; i < hemmingLengths.length; i++) {
						if (hemmingLengths[i] == selectedValue) {
							selectedValueStillValid = true;
						}
						theSelect.append($(document.createElement("option")).attr("value",hemmingLengths[i]).text(hemmingLengths[i]));

					}
				}

				if (selectedValueStillValid) {
					$("#chosenHemmingLength-" + prodId).text(selectedValue);
					theSelect.val(selectedValue);
				} else {
					$("#chosenHemmingLength-" + prodId).text("");
				}
			}

			//reset outfit product 'shoeSize' attribute value elements.
			enableOutfitAttributeValueElements(productId, "shoeSize", data.shoeSize);

			//reset outfit product 'sleeveSize' attribute value elements.
			enableOutfitAttributeValueElements(productId, "sleeveSize", data.sleeveSize);

			//reset outfit product 'shoeWidth' attribute value elements.
			enableOutfitAttributeValueElements(productId, "shoeWidth", data.shoeWidth);

			//reset outfit product 'rise' attribute value elements.
			enableOutfitAttributeValueElements(productId, "rise", data.rise);

			//reset outfit product 'neckSize' attribute value elements.
			enableOutfitAttributeValueElements(productId, "neckSize", data.neckSize);

			//reset outfit product 'shortLength' attribute value elements.
			enableOutfitAttributeValueElements(productId, "shortLength", data.shortLength);

			//reset outfit product 'pantSize' attribute value elements.
			enableOutfitAttributeValueElements(productId, "pantSize", data.pantSize);

			//reset outfit product 'underwearLength' attribute value elements.
			enableOutfitAttributeValueElements(productId, "underwearLength", data.underwearLength);
			
			//disable all cuff
			var prodCuff = "prod" + productId + "-cuff";
			$("a." + prodCuff).parent().addClass("unavailable");
			//re-enable all sizes in list
			if(data.cuff != null) {
				var cuffs = data.cuff;
				for(var i=0; i < cuffs.length; i++) {
					var cuffId = cuffs[i];
					$("." +prodCuff+"-"+cuffId).parent().removeClass("unavailable");
				}
			}

			//disable all sizes
			var prodColor = "prod" + productId + "-color";
			$("a." + prodColor).parent().addClass("unavailable");
			$("a." + prodColor).children("#unavailableColorImage").css('display','inline');
			//$("a.color").parent().addClass("unavailable");
			//re-enable all sizes in list
			if(data.color != null) {
				var colors = data.color;
				for(var i=0; i < colors.length; i++) {
					var colorId = colors[i].split(":")[1];
					$(".color-" + colorId + "." + prodColor).parent().removeClass("unavailable");
					$(".color-" + colorId + "." + prodColor).find('#unavailableColorImage').css('display','none');
				}
			}
		}, "json");

}

var productViewer = function () {
	var replaceId = "",
		width = 0,
		height = 0,
		requiredFlashVersion = "0.0.0",
		mediaSet = [],
		parent = null,
		cachedMedia = {};
		style = "visibility:visible";

	function useCache(key, createNew) {
		if (key in cachedMedia) {
			parent.append(cachedMedia[key]);
		} else {
			cachedMedia[key] = createNew();
		}
	}

	function changeStoreInventoryMediaHelper(urlSet){
		if ("img" in urlSet) {
			return 	$("#storeInventoryProductImage").attr("src",urlSet["img"].replace("$Quick$","wid=155"));
		}
	};

	function changeMedia (urlSet) {
		var oldMedia = $("#" + replaceId).detach();
		if ("swf" in urlSet && swfobject.hasFlashPlayerVersion(requiredFlashVersion)) {
			useCache(urlSet["swf"], function () {
				parent.append('<div id="' + replaceId + '"></div>');

				// Work-around for IE bug: add random string to the URL
				var requestUrl = urlSet["swf"];
				requestUrl += (requestUrl.match(/\?/) ? "&amp;" : "?") + Math.floor(Math.random() * 10000);

				// Changing "&amp;" to "&" because scene7 can't handle the "&amp;"s in the URLs
				requestUrl = requestUrl.replace(/&amp;/gi,'&');

				var attributes = {"data":requestUrl, "width":width, "height":height, "style":style};
				var params = {"wmode":"transparent"};
				return swfobject.createSWF(attributes, params, replaceId);
			});
		} else if ("img" in urlSet) {
			useCache(urlSet["img"], function () {
				return $('<div id="' + replaceId + '" style="visibility:visible"></div>')
					.html('<img src="' + urlSet["img"] + '" />')
					.appendTo(parent);
			});
		}
	};

	return {
		initialize: function (replaceIdArg, widthArg, heightArg, requiredFlashVersionArg, mediaSetArg) {
			replaceId = replaceIdArg;
			width = widthArg;
			height = heightArg;
			requiredFlashVersion = requiredFlashVersionArg;
			mediaSet = mediaSetArg;
			parent = $("#" + replaceId).wrap('<div id="' + replaceId + 'Parent" />').parent();
			cachedMedia = {};

			// if (mediaSet.length) {
			//	changeMedia(mediaSet[0]);
			// }
		},
		changeMedia: function (index,obj) {

			// If this swatch is unavailable, do not change the image when it is clicked:
			if (obj != undefined) {
				if ($(obj).parent(".unavailable").length > 0) {
					return false;
				}
			}

			if (index < mediaSet.length) {
				changeMedia(mediaSet[index]);
			}
		},
		changeStoreInventoryMedia: function (index,obj) {
			// If this swatch is unavailable, do not change the image when it is clicked:
			if (obj != undefined) {
				if ($(obj).parent(".unavailable").length > 0) {
					return false;
				}
			}
			if (index < mediaSet.length) {
				changeStoreInventoryMediaHelper(mediaSet[index]);
			}
		}
	}
}();

// Should be used on PO Box fields before calling QAS.
function cleansePOBox(pobox) {
    return "PO BOX " + pobox.replace(/^p(?:\.| ?\.? ?o\.?) ?b(?:\.|ox) ?/i, "");
}

function setAddressValidated(){
	$("#addressValidated").val("false");
}

function setUserAddressInSession(){
	$("#userEditInSession").val("true");
}

function updateShippingAmountGeneral(sgId, shippingAmount){
	var shippingAmounts = cartTotalsVar.shippingAmounts;
	var updated = false;
	if(shippingAmounts != null){
		for (i=0;i<shippingAmounts.length;i++) {
			if (shippingAmounts[i].sgId == sgId) {
				shippingAmounts[i].value = shippingAmount;
				updated = true;
			}
		}
	}
	if (!updated) {
		shippingAmounts[shippingAmounts.length] = { 'sgId': sgId, 'value': shippingAmount }; 
	}
}

/* functions used on the shipping method page */
function updateShippingAmountForCartTotals(sgId, shippingAmount) {
	updateShippingAmountGeneral(sgId, shippingAmount);
	updateCartTotalView();
}

function updateCartTotalView() {
	$("#productTotal").text("$" + parseFloat(cartTotalsVar.productTotal).formatMoney(2, '.', ','));
	$("#surcharge").text("$" + parseFloat(cartTotalsVar.surcharge).formatMoney(2, '.', ','));				
	$("#additionalSavings").text("$" + parseFloat(cartTotalsVar.additionalSavings).formatMoney(2, '.', ','));
	
	var shippingAmountTotal = 0.0;
	for (i=0;i<cartTotalsVar.shippingAmounts.length;i++) {
		shippingAmountTotal+= parseFloat(cartTotalsVar.shippingAmounts[i].value);
	}
	$("#shippingAmount").text("$" + shippingAmountTotal.formatMoney(2, '.', ','));
	
	var orderSubtotal = parseFloat(cartTotalsVar.productTotal) + parseFloat(shippingAmountTotal) + 
		parseFloat(cartTotalsVar.surcharge) - parseFloat(cartTotalsVar.additionalSavings);
	$("#orderSubtotal").text("$" + orderSubtotal.formatMoney(2, '.', ','));				
}

function updateExpressCheckoutCartTotalView(sgId, shippingAmount, shippingMethodId){
	$("input'[name=" + sgId + "ChangeSM]'").val(shippingMethodId);
	$("#change-shipping-method").click();
}


function showFacetClickedDialog() {
	$('#brands-wrap').removeClass('sticky-wrap');
	$('#brands').removeClass('sticky');
	$('#miniCart').removeClass('sticky-cart');
	$('#header-block').removeClass('sticky-block');
	$('#headerContent').removeClass('sticky-content-background');
	
	var $facetLinkClicked = $('#facetLinkClickedContent') // $('<div></div>')
	//.html($('#facetLinkClickedContent'.html()))
	//.html('<img src="' + GLOBAL_TB_PATHTOIMAGE + '" />' )
	.dialog({modal: true,
		autoOpen: false,
		dialogClass: 'noTitleStuff',
		// title: '',
		closeText: '',
		// height: 13,
		width:230
		});
	
	$('div.noTitleStuff').css('background', 'none repeat scroll 0 0 transparent');
	$('div.noTitleStuff').css('border', 'none');
	$facetLinkClicked.dialog('open');

	//don't follow the link
	return true;
	
}

/**
 * 
 * @param url
 * @returns {Boolean}
 */
function sizeChartPopup(url){
	newwindow=window.open(url,'','height=700,width=680');
	if (window.focus) {newwindow.focus()}
	return false;
}

Number.prototype.formatMoney = function(c, d, t){
	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
/**
 * 
 * @param collection  = jQuery Object.
 * @param destination = view
 */
function toggleResultsView(destination, collection) {
	if(!destination) return;
	
	if (destination == 'C') {
		$("#NonCatViewDiv").hide();
		$("#CatViewDiv").show();
		$(".noCat").slideUp();		
	} else if(destination === 3 || destination === 4){
		$("#NonCatViewDiv").show();
		$("#CatViewDiv").hide();
		$(".noCat").slideDown();

//		var item = collection;
//		if(destination === 3){
//			resizeImage(item.find('img'), '$category$', 'wid=207' );
//			collection.addClass('x3');
//		}
//		if(destination === 4){
//			resizeImage(item.find('img'), 'wid=207', '$category$' );
//			collection.removeClass('x3');
//		}
		updateImageSizes(destination, collection );
		
		setItemHeight(collection, destination);
	}	
}

function updateImageSizes(destination, collection) {
	var item = collection;
	var quickViewIcon = item.find('.quickViewHover');
	if(destination === 3){
		resizeImage(item.find('img'), '$category$', '$categoryX3$', 'size=155,203', 'size=207,273', 'pos=-57,-82', 'pos=-83,-117');
		collection.addClass('x3');
		quickViewIcon.removeClass('item-x4');
		quickViewIcon.addClass('item-x3');
	}
	if(destination === 4){
		resizeImage(item.find('img'), '$categoryX3$', '$category$', 'size=207,273', 'size=155,203', 'pos=-83,-117', 'pos=-57,-82');
		collection.removeClass('x3');
		quickViewIcon.addClass('item-x4');
		quickViewIcon.removeClass('item-x3');
	}
	
}

function resizeImage(collection, from, to, newSizeFrom, newSizeTo, newPosFrom, newPosTo){
	collection.each(function(i, e){
		e.src = e.src.replace(from, to);
		e.src = e.src.replace(newSizeFrom, newSizeTo);
		e.src = e.src.replace(newPosFrom, newPosTo);
	});
	//x3 src = http://images.destinationxl.com/is/image/CasualMale/pM5247?wid=207
	//x4 src = http://images.destinationxl.com/is/image/CasualMale/p91619?$category$
}
/**
 * 
 * @param collection
 * @param range
 */
function setItemHeight(collection, range){
	clearItemHeight(collection);
	// This will always be at 46
	var powerReviewsHeight = 46;
	var itemHeight = 0, range = range, limit = range;
	collection.each(function(i, e){
		// We need to do this calculation (instead of simply $(e).height()) to ensure that there's always enough space to display PowerReviews. The issue here is that PowerReviews is inserting for 
		// each product at the same time as the $(document).ready calls setItemHeight, leaving some lines with too much space and some with too little. Always leave enough space for the rating section.
		// This is the sum of the heights of all of the elements inside of 'item'
		var eHeight = $(e).find('.mouseHoverProductImage').outerHeight(true) + $(e).find('.swatches').outerHeight(true) + $(e).find('.icon').outerHeight(true) + $(e).find('.saleImage').outerHeight(true)
			+ $(e).find('.name').outerHeight(true) + $(e).find('.price').outerHeight(true) + powerReviewsHeight;
		itemHeight = Math.max(itemHeight, eHeight);
		if(i === range - 1){
			collection.slice(range-limit, range).height(itemHeight);
			range += limit;
			itemHeight = 0;
		}
	});	
}
/**
 * 
 * @param collection
 */
function clearItemHeight(collection){
	collection.height('auto');
}

function startCheckout() {
	var newURL = $('#checkoutHeaderLink').attr('href');
	window.location = newURL;
}

/**
 * 
 * @param idx = integer
 */
function toggleView(idx) {
	$('.tabbedView').hide();
	$('.tabbedView').eq(idx).show();
//	$('.rewardsTab').find('a').removeClass('active').eq(idx).addClass('active');
}

function showRewardsTab(idx) {
	$('.rewardsTab').removeClass("active").eq(idx).addClass("active");
	toggleView(idx);
}
/**
 * 
 */
function initRewardsTabs(idx){
	// toggleView(0);
	$('.rewardsTab').find('a').each(function(i, e){
		$(e).bind('click', function(){
//			$(this).addClass('active')
			toggleView(i);
			
		})
	})
}

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

function swapImageOnHover(prodImageId){
	var company = "CasualMale";  //Company name to reference for image call
	var origSrc = $("img#"+prodImageId).attr('src');
	
	var skuHover;
	if(origSrc.indexOf("new") == -1) {
		skuHover = origSrc.substring(origSrc.lastIndexOf("/")+1,origSrc.indexOf("?")) + "_hover";
	} else {
		skuHover = origSrc.substring(origSrc.indexOf("src=")+4,origSrc.indexOf("&size=")) + "_hover";
	}

	loadimagexists(company+'/'+skuHover,function() {
		var skuExists = imageExists(window.imagexists);  //Pass the response from the loadimagexists
		if(skuExists) {
			if(origSrc.indexOf("_hover") == -1){
				if(origSrc.indexOf("new") == -1) {
					$("img#"+prodImageId).attr('src',origSrc.splice(origSrc.indexOf('?'),0,"_hover"));
				} else {
					$("img#"+prodImageId).attr('src',origSrc.splice(origSrc.indexOf('&size'),0,"_hover"));
				}
			}
		}
	},
	false);
}

function revertImage(prodImageId){
	var origSrc = $("img#"+prodImageId).attr('src');
	if(origSrc.indexOf("_hover") !== -1){
		$("img#"+prodImageId).attr('src',origSrc.replace("_hover",""));
	}
}

function showLargerSwatch(displayName){
	var top = -2 - $('#'+displayName+'Div').height();
	var left  = -1;
	
	$('#'+displayName+'Div').css('top',top);
	$('#'+displayName+'Div').css('left',left);
	$('#'+displayName+'Div').css('display','block');
}

function hideLargerSwatch(displayName){
	$('#'+displayName+'Div').css('display','none');
}

function htmlUnescape(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

jQuery.cachedScript = function( url, options ) {

  // Allow user to set any option except for dataType, cache, and url
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return jQuery.ajax( options );
};