var qtyError = 'Please enter a valid quantity.';
var canAddItemsToCart = true;

function catalogAddToCart(formName, prodId) {

	if (canAddItemsToCart) {
		canAddItemsToCart = false;

		var errorDiv = "add-item-error-message";
		$("#"+errorDiv).empty();
		$("#"+errorDiv).hide();

		var formId = '#' + formName + prodId;
		var successUrl = "/catalog/catalog-interrupt.jsp?prodId=" + prodId;

		var itemSkuString = null;
		var itemProdIdString = null;

		if ($("#subItemsLength").val() != null) {
			for (var i = 0; i < $("#subItemsLength").val(); i++) {
				var subSkuId = $("#catalogRefIdSubItem" + (i + 1)).val();
				var subProdId = $("#productIdSubItem" + (i + 1)).val();

				if(subSkuId!="" && subProdId!="") {
					itemSkuString    = increaseValue(itemSkuString, subSkuId);
					itemProdIdString = increaseValue(itemProdIdString, subProdId);
				}

			}
			$("#cartSkus").val(itemSkuString);
			$("#cartProdIds").val(itemProdIdString);
		}

		var hasWarranty = $("#hasWarranty"+prodId).val();
		var addedWithWarranty = $("#withWarrantyaddToCart"+prodId).val();

/*
		var hasAccessories = $("#hasAccessories"+prodId).val();
*/

		// if((hasWarranty == "true" && addedWithwarranty == "false") || hasAccessories == "true"){
		var dataString = $(formId).serialize();
		$.ajax({
			type : "POST",
			data : dataString,
			dataType : "json",
			//beforeSend: setHeader,
			success : function(data) {
				if (null != data && typeof data.errors != "undefined" && data.error == "true") {
					showErrorsOnAddToCart(data.errors, errorDiv);
				} else {
					reloadMinicartCount();
					if(hasWarranty == "true" && addedWithWarranty != "true") {
						setTimeout(function() {
							canAddItemsToCart = true;
						}, 1000);
//						$.modal('<iframe id="pdpWarrantyModalFrame" src="/global/modals/modal-pdp-warranty.jsp?from=pdp&prodId='+prodId + '" height="360" width="620" scrolling="no">', {
//							overlayClose:true
//						});
						//loadModal('/global/modals/modal-pdp-warranty.jsp?from=pdp&prodId='+prodId, 620, 360, true);
						loadWarrantyModal('?from=pdp&prodId='+prodId);
					} else {
						window.location.href = successUrl;
					}
				}
				setTimeout(function() {
					canAddItemsToCart = true;
				}, 1000);
			}
		});
		return false;
	} else {
		return false;
	}
}

function catalogAddToCartByLink(formName, prodId) {

	if (canAddItemsToCart) {
		canAddItemsToCart = false;

		var errorDiv = "add-item-error-message";
		$("#"+errorDiv).empty();
		$("#"+errorDiv).hide();

		var formId = '#' + formName;
		// var successUrl = "/catalog/catalog-interrupt.jsp?prodId=" + prodId;
		var successUrl = "/checkout/checkout-cart.jsp";

		dataString = $(formId).serialize();
		$.ajax({
			type : "POST",
			data : dataString,
			dataType : "json",
			success : function(data) {
				if (null != data && typeof data.errors != "undefined" && data.error == "true") {
					showErrorsOnAddToCart(data.errors, errorDiv);
				} else {
					// reloadMinicartCount();
					window.location.href = successUrl;
				}
				setTimeout(function() {
					canAddItemsToCart = true;
				}, 2000);
			}
		});
	}
}

function catalogAddToCartWithoutWarranty(formName, prodId) {

	if (canAddItemsToCart) {
		canAddItemsToCart = false;

		var errorDiv = 'add-item-error-message';

		$("#"+errorDiv).empty();
		$("#"+errorDiv).hide();

		var formId = '#' + formName;
		var successUrl = "/catalog/catalog-interrupt.jsp?prodId=" + prodId;

		dataString = $(formId).serialize();
		$.ajax({
			type : "POST",
			data : dataString,
			dataType : "json",
			success : function(data) {
				if (null != data && typeof data.errors != "undefined" && data.error == "true") {
					showErrorsOnAddToCart(data.errors, errorDiv);
					window.scrollTo(0, 0);
					// $(document).scrollTo('#'+errorDiv);
				} else {
					// reloadMinicartCount();
					window.location.href = successUrl;
				}
				setTimeout(function() {
					canAddItemsToCart = true;
				}, 2000);
			}
		});
	}
}

function catalogAddToCartWithWarranty(formName, topProdId, prodId) {

	if (canAddItemsToCart) {
		canAddItemsToCart = false;

		var errorDiv = 'add-item-error-message';

		$("#"+errorDiv).empty();
		$("#"+errorDiv).hide();

		var formId = '#' + formName;
		var successUrl = "/catalog/catalog-interrupt.jsp?prodId=" + prodId;

		var hasWarranty = $("#hasWarranty"+topProdId).val();

		dataString = $(formId).serialize();
		$.ajax({
			type : "POST",
			data : dataString,
			dataType : "json",
			success : function(data) {
				if (null != data && typeof data.errors != "undefined" && data.error == "true") {
					showErrorsOnAddToCart(data.errors, errorDiv);
					window.scrollTo(0, 0);
					// $(document).scrollTo('#'+errorDiv);
				} else {
					if(hasWarranty == "true") {
						setTimeout(function() {
							canAddItemsToCart = true;
						}, 1000);
						loadWarrantyModal('?from=frequently&prodId='+topProdId);
					} else {
						window.location.href = successUrl;
					}
				}
				setTimeout(function() {
					canAddItemsToCart = true;
				}, 2000);
			}
		});
	}
}

function catalogAddToCartFromModal(formName, prodId, from, submit) {
	if(submit) {
		var errorDiv = "add-item-error-message";
		$("#"+errorDiv).empty();
		$("#"+errorDiv).hide();

		var formId = '#' + formName;

		dataString = $(formId).serialize();
		$.ajax({
			type : "POST",
			data : dataString,
			dataType : "json",
			success : function(data) {
				if (null != data && typeof data.errors != "undefined" && data.error == "true") {
					showErrorsOnAddToCart(data.errors, errorDiv);
				} else {
					catalogAddToCartFromModalClose(prodId, from);
				}
			}
		});
	} else {
		catalogAddToCartFromModalClose(prodId, from);
	}
	return false;
}

function catalogAddToCartFromModalClose(prodId, from) {
	if('landing-wishlist' == from) {
		parent.wishlistMoveItemToCartSuccess();
		closeModalDialog();
	} else
	if('wishlist' == from) {
		parent.locationGoToCart();
		closeModalDialog();
	} else
	if('also' == from) {
		//parent.reloadMinicartCount();
		parent.window.location.href = "/catalog/catalog-interrupt.jsp?prodId=" + prodId;
		closeModalDialog();
	} else
	if('frequently' == from) {
		//parent.reloadMinicartCount();
		parent.window.location.href = "/catalog/catalog-interrupt.jsp?prodId=" + prodId;
		closeModalDialog();
	} else {
		parent.window.location.href = "/catalog/catalog-interrupt.jsp?prodId=" + prodId;
		closeModalDialog();
	}
}

/*
function catalogAddToCartFromModalWithoutWarranty(formName, prodId, from) {
	$("#addToCartCheckbox"+prodId).val(false);
	catalogAddToCartFromModal(formName, prodId, from, false);
}
*/

function skipAddWarrantyAndGoToCart(prodId) {
	parent.window.location.href = "/catalog/catalog-interrupt.jsp?prodId=" + prodId;
	closeModalDialog();
}

function showErrorsOnAddToCart(errors, errorDiv) {
	var error_messages = "";
	for (var i = 0; i < errors.length; i++) {
		if ("" == error_messages) {
			error_messages = errors[i];
			if (error_messages == 'Invalid value for a number') {
				error_messages = qtyError;
			}
		} else {
			if (error_messages != qtyError) {
				error_messages = error_messages + "<br />" + errors[i];
			}
		}
	}
	$("#"+errorDiv).html("<p>" + error_messages + "</p>");
	$("#"+errorDiv).css({"display":"block"});
}

function selectConfigOption(configNumber, optionNumber, priceStr, skuId, prodId, isIframe) {

	setSubItemInfo(configNumber, skuId, prodId);

	if (isIframe) {
		// unceck radio butons of main page
		parent.$(':radio[name=pkg_option_' + configNumber + ']').prop('checked', false);
		parent.$('ul.item-package li.item-item').removeClass('on');

		parent.$('#pkg_option_' + configNumber + '_' + optionNumber).prop("checked", true);
		parent.$('ul.item-package li.item-item:has(input:checked)').addClass('on');
	}

	var wnd = isIframe ? this.parent : this;

	wnd.$("#selected_pkg_option_" + configNumber).val("pkg_option_" + configNumber + "_" + optionNumber);

	var dispName = $("#config_disp_" + configNumber + "_" + optionNumber).html();
	wnd.$('#price_config_div_' + configNumber).show();
	wnd.$('#price_config_name_' + configNumber).html(dispName);

	var price = parseFloat(priceStr);
	if (isNaN(price)) {
		price = 0;
	}
	var $priceTag = wnd.$('#price_config_price_' + configNumber);
	$priceTag.data("price", price);

	// tmp
	$priceTag.html("+ $" + price.toFixed(2));

	var totalPrice = calculateTotalPrice(isIframe);

	// tmp
	var totalPriceStr = "$" + totalPrice.toFixed(2);

	wnd.$("#dd_total_price").html(totalPriceStr);

	showPdpOrderBox(isIframe);
}

function resetConfigOption(configNumber) {

	setSubItemInfo(configNumber, '', '');

	var wnd = this;

	wnd.$("#selected_pkg_option_" + configNumber).val("");

	wnd.$('#price_config_div_' + configNumber).hide();

	var $priceTag = wnd.$('#price_config_price_' + configNumber);
	$priceTag.data("price", 0);

	var totalPrice = calculateTotalPrice(false);

	// tmp
	var totalPriceStr = "$" + totalPrice.toFixed(2);

	wnd.$("#dd_total_price").html(totalPriceStr);

	showPdpOrderBox(false);
}

function showPdpOrderBox(isIframe) {
	var wnd = isIframe ? this.parent : this;
	var $basePriceTag = wnd.$("#dd_base_price");
	var count = $basePriceTag.data("configCount");
	var needToShow = true;
	for (i = 1; i <= count; i++) {
		var price = wnd.$('#price_config_price_' + i).data("price");
		if (price === undefined) {
			needToShow = false;
		}
	}

	if (needToShow) {
		wnd.$("div.box.pdp-order").show();
		wnd.$("#please_make_selections").hide();
	}
}

function setSubItemInfo(configNumber, skuId, prodId){
	$("#productIdSubItem"+configNumber).val(prodId);
	$("#catalogRefIdSubItem"+configNumber).val(skuId);
	/*if($("#wishlistSkus").val() == ""){
		$("#wishlistSkus").val(skuId);
	}else{
		var current = $("#wishlistSkus").val();
		$("#wishlistSkus").val(current+","+skuId);
	}*/
}

function calculateTotalPrice(isIframe) {
	var wnd = isIframe ? this.parent : this;
	var $basePriceTag = wnd.$("#dd_base_price");
	var totalPrice = $basePriceTag.data("basePrice");
	var count = $basePriceTag.data("configCount");
	for (i = 1; i <= count; i++) {
		var price = wnd.$('#price_config_price_'+i).data("price");
		if (price) {
			totalPrice += price;
		}
	}

	return totalPrice;
}

function catalogShowWarranty(href) {
//	$.modal('<iframe src="' + href + '" height="360" width="620" scrolling="no">', {
//		overlayClose:true
//	});
	loadModal(href, 620, 360);
	return false;
}

function catalogAddToWishlist() {
	var itemSkuString = "";
	var itemProdIdString = "";
	if ($("#subItemsLength").val() != null) {

		// empty sku and prodid wount be added. it's important to set their values for adding to cart

		for (var i = 0; i < $("#subItemsLength").val(); i++) {
			itemSkuString = increaseValue(itemSkuString, $("#catalogRefIdSubItem" + (i + 1)).val());
			itemProdIdString = increaseValue(itemProdIdString, $("#productIdSubItem" + (i + 1)).val());
		}
		$("#wishlistSkus").val(itemSkuString);
		$("#wishlistProdIds").val(itemProdIdString);
	}
	dataString = $("#wishlistAdd").serialize();
	$.ajax({ type: "POST",
		url:"/account/wishlist.jsp?",
		data: dataString,
		dataType: "json",
		success: catalogAddToWishlistSuccess,
		error: ajaxError
	});
}

function catalogAddConfigurableToWishlistTransient(){
	var itemSkuString = "";
	var itemProdIdString = "";
	if ($("#subItemsLength").val() != null){
		for (var i = 0; i < $("#subItemsLength").val(); i++) {
			itemSkuString = increaseValue(itemSkuString, $("#catalogRefIdSubItem" + (i + 1)).val());
			itemProdIdString = increaseValue(itemProdIdString, $("#productIdSubItem" + (i + 1)).val());
		}
		parent.location.href="/account/gadgets/addConfigurableItemWishlist.jsp?wishlistSubSkuIds="+itemSkuString+"&wishlistSubProdIds="+itemProdIdString;
/*
		var href = "/account/login.jsp";
		href += "?wishlistProdType=1";
		href += "&wishlistSkuId="+$("#catalogRefIds").val();
		href += "&wishlistProductId="+$("#productId").val();
		href += "&wishlistSubSkuIds="+itemSkuString;
		href += "&wishlistSubProdIds="+itemProdIdString;

		parent.location.href = href;
*/
	}
}


function catalogAddToWishlistSuccess(data) {
	if (typeof data.errors == "undefined") {
		parent.location.href = "/account/wishlist.jsp";
	} else {
		showErrors(data, "#list-error");
	}
}

function ajaxError(jqXHR, textStatus, errorThrown) {
	alert(jqXHR + ", " + textStatus + ", " + errorThrown)
}

function idWithForfardSlash(str)
{
	return str.replace(/\//g, '\\/');
}

function idWithSpecialChar(str)
{
	return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
}

function selectWarrantyModal(val, pId)
{
	if(val != 'underfined' && val != 'none'){
		$("#warrantyProdIdModal"+idWithForfardSlash(pId)).val(val);
		$("#warrantySkuIdModal"+idWithForfardSlash(pId)).val(val);
		$("#withWarrantyaddToCart"+idWithForfardSlash(pId)).val('true');
		$("#withWarrantyaddToCart"+idWithForfardSlash(pId)).val('true');
		$("#addtoCartCheckboxModal"+idWithForfardSlash(pId)).val('true');
	}
}

function selectWarranty(warrantySkuId, warrantyProdId, productId)
{
	if(warrantyProdId != 'underfined' && warrantyProdId != 'none'){
		$("#warrantyPlan"+productId).val(productId);
		$("#warrantyProdId"+productId).val(warrantyProdId);
		$("#warrantySkuId"+productId).val(warrantySkuId);
		$("#withWarrantyaddToCart"+productId).val('true');
		$("#addToCartCheckbox"+productId).val('true');
	}else{
		$("#warrantyPlan"+productId).val('');
		$("#warrantyProdId"+productId).val('');
		$("#warrantySkuId"+productId).val('');
		$("#withWarrantyaddToCart"+productId).val('false');
		$("#addToCartCheckbox"+productId).val('false');
	}
}

function selectModalWarranty(warrantySkuId, warrantyProdId, productId)
{
	if(warrantyProdId != 'underfined' && warrantyProdId != 'none'){
		$("#modalWarrantyPlan"+productId).val(productId);
		$("#modalWarrantyProdId"+productId).val(warrantyProdId);
		$("#modalWarrantySkuId"+productId).val(warrantySkuId);
		$("#modalWithWarrantyaddToCart"+productId).val('true');
		$("#modalAddToCartCheckbox"+productId).val('true');
	}else{
		$("#modalWarrantyPlan"+productId).val('');
		$("#modalWarrantyProdId"+productId).val('');
		$("#modalWarrantySkuId"+productId).val('');
		$("#modalWithWarrantyaddToCart"+productId).val('false');
		$("#modalAddToCartCheckbox"+productId).val('false');
	}
}

function catalogAddAlsoBoughtToCart(formId, totalcount, topProdId) {
	var skuIdString = "";
	var prodIdString = "";
	var prodTypeString = "";
	var productTypeString = "";

	for (var i = 1; i < totalcount + 1; i++) {
		if (document.getElementById("abchbx_" + i)!=null && document.getElementById("abchbx_" + i).checked) {
			var productType = $("#"+formId+"productType_" + i).val();
			var prodType = $("#"+formId+"prodType_" + i).val();
			var prodId = $("#"+formId+"productId_" + i).val();
			var skuId = $("#"+formId+"skuId_" + i).val();

			skuIdString = increaseValue(skuIdString, skuId);
			prodIdString = increaseValue(prodIdString, prodId);
			prodTypeString = increaseValue(prodTypeString, prodType);
			productTypeString = increaseValue(productTypeString, productType);

			document.getElementById("abchbx_" + i).checked = false;
		}
	}

	alsoBoughtMsg = "";
	alsoBoughtNumber = 0;
	alsoBoughtPrice = 0;

	$("#alsoBoughtInfo").text(alsoBoughtMsg);

	$("#"+formId+"skuIdsList").val(skuIdString);
	$("#"+formId+"prodIdsList").val(prodIdString);
	$("#"+formId+"prodTypesList").val(prodTypeString);
	$("#"+formId+"productTypesList").val(productTypeString);

	var data = {};

	var hasWarranty = $("#hasWarranty"+topProdId).val();

	var options = {
		success: function(data) {
			if (typeof data.errors == "undefined") {
				reloadMinicartCount();
				if(hasWarranty == "true") {
					setTimeout(function() {
						canAddItemsToCart = true;
					}, 1000);
					//loadModal('/global/modals/modal-pdp-warranty.jsp?from=also&prodId='+topProdId, 620, 360, true);
					loadWarrantyModal('?from=also&prodId='+topProdId);
				} else {
					// window.location.href = successUrl;
				}
				reloadMinicartCount();
			} else {
				showErrorsOnAddToCart(data.errors, "add-item-error-message");
				window.scrollTo(0,0);
			}
		},
		error: function(data) {
			showErrorsExt(data);
		},
		dataType : 'json',
		data:data
	};

	var alsoBoughtForm = $("#"+formId);
	alsoBoughtForm.ajaxForm(options);
	alsoBoughtForm.submit();

}

function catalogAddAlsoToCartSeparateItem(formId, count, modal, errorDiv) {
	var skuIdString = "";
	var prodIdString = "";
	var prodTypeString = "";
	var productTypeString = "";

	$("#"+errorDiv).hide();

	var productType = $("#"+formId+"productType_" + count).val();
	var prodType = $("#"+formId+"prodType_" + count).val();
	var prodId = $("#"+formId+"productId_" + count).val();
	var skuId = $("#"+formId+"skuId_" + count).val();

	skuIdString = increaseValue(skuIdString, skuId);
	prodIdString = increaseValue(prodIdString, prodId);
	prodTypeString = increaseValue(prodTypeString, prodType);
	productTypeString = increaseValue(productTypeString, productType);

	$("#"+formId+"skuIdsList").val(skuIdString);
	$("#"+formId+"prodIdsList").val(prodIdString);
	$("#"+formId+"prodTypesList").val(prodTypeString);
	$("#"+formId+"productTypesList").val(productTypeString);

	var data = {};

	var options = {
		success: function(data) {
			if (typeof data.errors == "undefined") {
				$("#"+formId+"in_button"+count).show();
				$("#"+formId+"_button"+count).hide();
				if(modal) {
					parent.reloadMinicartCount();
				} else {
					reloadMinicartCount();
				}
			} else {
				showErrorsOnAddToCart(data.errors, errorDiv);
				// showErrorsExt(data);
			}
		},
		error: function(data) {
			showErrorsExt(data);
		},
		type: "POST",
		dataType : 'json',
		data:data
	};

	var alsoBoughtForm = $("#"+formId);
	alsoBoughtForm.ajaxForm(options);
	alsoBoughtForm.submit();
}

var alsoBoughtMsg = "";
var alsoBoughtNumber = 0;
var alsoBoughtPrice = 0;

function catalogAlsoBoughtCheckItem(count, price) {
	var number = 1;
	if (document.getElementById("abchbx_" + count).checked) {

	} else {
		number = -1;
		price = -price;
	}

	catalogAlsoBoughtIncreaseChoice(number, price);
}

function catalogAlsoBoughtIncreaseChoice(number, price) {
	alsoBoughtNumber += number;
	alsoBoughtPrice += price;

	if(alsoBoughtNumber == 0) {
		alsoBoughtMsg = "";
	} else {
		if(alsoBoughtNumber == 1) {
			alsoBoughtMsg = " + 1 item ";
		} else {
			alsoBoughtMsg = " + " + alsoBoughtNumber + " item ";
		}

		var priceStr = ""+alsoBoughtPrice.toFixed(2);
/*
		if(priceStr.indexOf(".")!=-1) {
			priceStr+="0";
		} else {
			priceStr+=".00"
		}
*/

		alsoBoughtMsg += "selected • $"+priceStr;
	}
	// document.getElementById("alsoBoughtInfo").innerHTML=alsoBoughtMsg;
	$("#alsoBoughtInfo").text(alsoBoughtMsg);
}

function newsSignUpModalSubmit() {
	$("#msg").hide();
	$("#error").hide();
	$(".error").removeClass("error");

	var options = {
		success:
			function(data) {
				if (null != data && typeof data.errors != "undefined" && data.error == "true") {
					showErrorsExt(data);
				} else {
					$("#error").hide();
					showJSONResponseFromSubscribeToLyrisForm(data);
					//$("#msg").show();
					//$("#infoMsg").html(data.responseMessage);
				}
			},
		type: "POST",
		dataType : 'json'
	};
	var form = $("#newsSignUpForm");
	form.ajaxForm(options);
	form.submit();
}

function listenInStock() {
	var fel = $("#notifyInventoty");
	var options = {
			success: function(data) {showDataTarget(data,"pdp-message", "message-red", "message-green");},
			dataType : 'json'
		};
	fel.ajaxForm(options);
	fel.submit();
	return false;
}

function warrantyModalReadyFunction() {
	var body = document.body,
		html = document.documentElement;
	var iframe = parent.document.getElementById("pdpWarrantyModalFrame");

	var height = Math.max(body.clientHeight, body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	$(document).parent().height = height;
	iframe.height = height + "px";
}

//function centerImageBase(size, img)
//{
//	var width = img.clientWidth;
//	var height = img.clientHeight;
//	var left = 0;
//	var top = 0;
//	if(width < size && width != 0) {
//		left = (size - width)/2;
//		$(img).css({'margin-left': left+'px'});
//	}
//	if(height < size && height != 0) {
//		top = (size - height)/2;
//		$(img).css({'margin-top': top+'px'});
//	}
//}

//window.onload = function(){
//	$('.center-image-60').each(function() {
//		centerImageBase('60',this);
//	});
//	$('.center-image-140').each(function() {
//		centerImageBase('140',this);
//	});
//	$('.center-image-380').each(function() {
//		centerImageBase('380',this);
//	});
//}

function checkImgSize(img, size){
	var width = img.clientWidth;
	var height = img.clientHeight;
	if(width > size && width > height){
		$(img).css({'width':size + 'px'});
	} else
	if(height > size && height >= width){
		$(img).css({'height':size + 'px'});
	}
}

function addAltToImage(productImageAlt){
	$("div.MagicBoxShadow img").attr('alt', productImageAlt).attr('title', productImageAlt);
	setTimeout(function() {
		$("div.MagicThumb-expanded img").attr('alt', productImageAlt).attr('title', productImageAlt);
	}, 2000);
}

function checkImgSizeAndCenter(img, size){
	var width = img.clientWidth;
	var height = img.clientHeight;
	if(width > size && width > height){
		$(img).css({'width':size + 'px'});
	} else
	if(height > size && height >= width){
		$(img).css({'height':size + 'px'});
	}
	var left = 0;
	var top = 0;
	if(width < size && width != 0) {
		left = (size - width)/2;
		$(img).css({'margin-left': left+'px'});
	}
	if(height < size && height != 0) {
		top = (size - height)/2;
		$(img).css({'margin-top': top+'px'});
	}
}