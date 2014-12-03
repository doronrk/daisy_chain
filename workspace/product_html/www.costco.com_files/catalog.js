	 

$(window).load(function() {

	//Defect CIS100071261 : custom validation rule for quantity field on product page
	$.validator.addMethod("digitsWithSpace",function(value,element){
		//allows whole numbers with leading and trailing spaces
		var qtyValue = (value + '').replace(/\s/g, ''); //remove space
		return this.optional(element) || /^\d+$/.test(qtyValue);
	},messages.ERR_ADD_TO_CART_INVALID_QTY);
	
	$('#ProductForm').validate({
		rules : { 
			quantity : { required:false, min : 1, max : constants.MAX_ITEM_QUANTITY, digits:false , digitsWithSpace:true }
		},
		messages : {
		   quantity: messages.ERR_ADD_TO_CART_INVALID_QTY
		},
		submitHandler: function(form) {
			// make sure that we've selected at least one product in a bundle
			$("#ProductForm").validate().settings.rules.quantity.required = true;
			var validProducts = 0;
			$("#ProductForm .product").each(function() {
				var tpt = "selected";
				var validSelections = 1;
				$(this).find("select[name^='productOption'] option:selected").each(function(p){
					tpt = $(this).val();
					if(tpt == "unselected") {
						validSelections = 0;
						return false;
					}
					else {
						validSelections++;
					}
				});
				if (validSelections > 0) {
					validProducts++;
				}
			});
			
			if(validProducts > 0) {
				var total = 0;
				$('input[name^=quantity]').each(function() { total += parseInt($(this).val()) });
				//Defect CIS100069714: Backspace quantity field throws error message
				$('input[name^=quantity]').focus();
				if(isNaN(total) || total < 1) {
					return false;
				}				
			}else{
				$("div.ProductFormError").hide();
				//Using before method to make the error message to load before form - ADA
				$("#ProductForm").before('<div class="error ProductFormError">'+messages.ERR_ADD_TO_CART_SELECT_ONE+'</div>');

				return false;
			}
			
			if (productDisplay.isDisplayBackorderMessage(form)) {
				return false;
			}
			ajaxAddToCart('AjaxManageShoppingCartCmd', form);			
		}
	});
	$('input[name^=quantity_]').rules("add", { required: true, min: 0, max: constants.MAX_ITEM_QUANTITY, digits:true,
		 messages: {
		   min: messages.ERR_ADD_TO_CART_INVALID_QTY,
		   max: messages.ERR_ADD_TO_CART_INVALID_QTY,
		   digits: messages.ERR_ADD_TO_CART_INVALID_QTY
		 }
	});
	$('input[name^=quantity_].limit-one').rules("add", { required: true, min: 0, max: 1, digits:true,
		 messages: {
		   min: messages.ERR_ADD_TO_CART_INVALID_QTY,
		   max: messages.ERR_ADD_TO_CART_INVALID_QTY,
		   digits: messages.ERR_ADD_TO_CART_INVALID_QTY
		 }
	});
	
	if (queryString['emailFriendSuccess'])
	{
		$('#emailSuccess').show();
	}
	if (queryString['addToWishlistSuccessMessageKey'])
	{
		$('#wishlistSuccess').show();
	}
	
	// Fake :last-child selector for IE7
	$('.ui-tabs .ui-tabs-nav li:last-child').addClass('last-child');
});

function ajaxAddToCart(actionUrl, formObject, authToken) {

	var productErrorDiv = $('#productErrorDiv');
	productErrorDiv.empty();
	$('#addToCartSuccess').hide();
	$('#addToCartBtn').attr('disabled', 'disabled');
	$('#addToCartBtn').addClass('disabled');
	
	$('#emailSuccess').hide();
	$('#wishlistSuccess').hide();

	var quantity;
	var cleanData = {'ajaxFlag': true, 'authToken': authToken};
	var formData = $('#ProductForm').serializeArray();
	$.each(formData, function(index, value){
		var dataName = formData[index].name;
		var dataValue = formData[index].value;
// console.log(dataName+" == "+dataValue);
		// Remove all blank and array-type params
		if (!/_\d$/.test(dataName) && dataValue !== '' && dataValue !== '0') {
			
			cleanData[dataName] = dataValue;
		}		
	});
	

	// Rebuild array params with the correct indices
	var productIndex = 1;
	// var pluralized = false;
	var accumulateQuantity = 0;
	$('#ProductForm .product').each(function(i, p) {
		var foundItem = findItem(products[i], $(p).find('option:selected').map(function(){ return $(this).val(); }).get());
		quantity = $(p).find('.product-quantity input').val();
		
		accumulateQuantity += parseInt(quantity);


		if (foundItem && quantity > 0) {
			cleanData['catalogEntryId_'+productIndex] = foundItem.catentry;
			cleanData['quantity_'+productIndex] = quantity;
			productIndex++;
		}
	});
	
	
	if (accumulateQuantity > 1){
		// pluralize
		$('#addToCartSuccess').text(messages.PDETAIL_ITEMS_ADDED_TO_CART2);
	}else{
		// singular
		$('#addToCartSuccess').text(messages.PDETAIL_ITEMS_ADDED_TO_CART);		
	};
	
	$.ajax(
		{
			url: actionUrl,
			type: 'POST',
			data: cleanData,
			dataType: 'jsonp',
		    jsonp: "callback",
			jsonpCallback: "ajaxAddToCartSuccess",
			error: function(xhr, textStatus, errorThrown){
				alert('error');
			},
			complete: function ()
			{
				$('#addToCartBtn').removeAttr('disabled');
				$('#addToCartBtn').removeClass('disabled');
			}
		}
	);
}

function ajaxAddToCartSuccess(data){
	var productErrorDiv = $('#productErrorDiv');
	var errorCount = 0;
	if (data.errorCode)
	{
		if (data.errorCode == 2510) // session timeout
		{
			document.location.href = 'Logoff?URL=ReLogonFormView&storeId='+wcs.storeId;
			return;
		}
	}
	else
	{
		if (data.redirecturl != null)
		{
			urlWithoutQueryString = data.redirecturl.split('?')[0];
			if (urlWithoutQueryString.indexOf('CatalogSearch') != -1 
					|| (urlWithoutQueryString.indexOf('.html') != -1 && 
							urlWithoutQueryString.indexOf('.product.') == -1)
				) // if pointing to a category (either
					// CatalogSearch or ending
				  // in .html without .product. in the url
			{
				var url = data.redirecturl;
				delete data.redirecturl; 
				var params = $.param(data);
				
				var decodedUrl = $("<div/>").html(url).text();
				var finalUrl;
				if (decodedUrl.indexOf('?') != -1)
				{
					if (decodedUrl.substr(decodedUrl.length - 1) == '&')
					{
						finalUrl = decodedUrl + params;
					}
					else
					{
						finalUrl = decodedUrl + '&' + params;
					}
				}
				else
				{
					finalUrl = decodedUrl + '?' + params;
				}
				document.location.href = finalUrl; 
				
				return;
			}
		}
		
		if (data.orderErrMsgObj)
		{
			var errors = data.orderErrMsgObj;
			for (var errorKey in errors)
			{
				if (errors.hasOwnProperty(errorKey)) 
				{
					errorCount++;
					productErrorDiv.append('<p class="error">' + errors[errorKey].replace('~',',').replace("''","'") + "</p>")
				}
			}
		}
		
		if (errorCount == 0) {
			// Added to handle a weird issue reported in
			// CIS100064805
			if($('#addToCartSuccess').length < 1){
				$('#ProductForm .submit-row').after('<p style="display:none;" class="success" id="addToCartSuccess"></p>');
				if (accumulateQuantity > 1){
					$('#addToCartSuccess').text(messages.PDETAIL_ITEMS_ADDED_TO_CART2);							
				}else{
					$('#addToCartSuccess').text(messages.PDETAIL_ITEMS_ADDED_TO_CART);
				}
			}
			
			$('#addToCartSuccess').show();
		}
		//CIS100070943 : Add for Details items do not increment the cart counter
		miniShopCartRefresh();
		 //Added this line for Defect Id # CIS100068026
		//throwShopAction5Tag(cleanData);
	}
}

function findItem(p,o) {
	
	// Case: no defining attributes
	if (o.length == 0 && p.length > 0) {
		return p[0];
	}
	
	// Case: one or more defining attributes
	for(var i=0;i<p.length;i++) {
		if(areArraysEqual(o, p[i].options) || (o == p[i].catentry)) {
			return p[i];
		}
	}
	return null;
}

function findAttributes(p, key) {
	var attributes = [];
	for(var i=0;i<p.length;i++) {
		for(var j=0;j<p[i].options.length;j++) {
			if($.inArray(key, p[i].options) > -1 && p[i].options[j] != key){
				attributes.push(p[i].options[j]);
			}
		}
	}
	return attributes;
}

function AddToWishlist(baseURL) {
	if($('#ProductForm').valid()) {
		var x = baseURL + '&catentryId=' + $('#ProductForm .product .catentryInput').map(function() { return $(this).val(); }).get().join(',');
		navigateToURL(x);
	}
}

function EmailToFriend(baseURL) {
	if($('#ProductForm').valid()) {
		var x = baseURL + '&catentryId=' + $('#ProductForm .product .catentryInput').map(function() { return $(this).val(); }).get().join(',');
		navigateToURL(x);
	}
}


function AddAllToWishlist(baseURL) {
	var validProducts = 0;
	$("#ProductForm .product").each(function() {
		var tpt = "selected";
		var validSelections = 1;
		$(this).find("select[name^='productOption'] option:selected").each(function(p){
			tpt = $(this).val();
			if(tpt == "unselected") {
				validSelections = 0;
				return false;
			}
			else {
				validSelections++;
			}
		});
		if (validSelections > 0) {
			validProducts++;
		}
	});
	
	if(validProducts > 0) {
		var total = 0;
		$('input[name^=quantity]').each(function() { total += parseInt($(this).val()) });
		if(total < 1) {
			$("div.ProductFormError").hide();
			$("#ProductForm").before('<div class="error ProductFormError">'+messages.ERR_ADD_TO_CART_INVALID_QTY+'</div>');
			return false;
		} else {
			$("#ProductForm div.error").hide();
		}
	}else{
		$("div.ProductFormError").hide();
		// using before method to make the error message to load before form - ADA
		$("#ProductForm").before('<div class="error ProductFormError">'+messages.ERR_ADD_TO_CART_SELECT_ONE+'</div>');

		return false;
	}
	var x = baseURL + '&catentryIds=' + $('#ProductForm .product .catentryInput').map(function() { return $(this).val(); }).get().join(',');
	navigateToURL(x);
}

function openModalFrame(url) {
	var $f = $('<iframe src="'+url+'"></iframe>');
	$('<div/>').append($f).dialog({
		close: function(event, ui){
			$f.remove();
		},  
		modal:true,dialogClass:'modal-iframe',draggable:false,resizable:false,width:600,height:450});
}

function unique(p) {
	var result = [];
	$.each(p, function(i, e) {
	  if ($.inArray(e, result) == -1) result.push(e);
	});
	return result;
}

function ProductDisplay() {
	// private variables
	var state = { selectedItems : [] };
	
	// public methods
	this.isDisplayBackorderMessage = function(form) {
		var i, flags = {};
		
		if (singleProduct !== null) {
			if(singleProduct.inventory == 'BACK_ORDER') {
				flags['BACK_ORDER'] = singleProduct;
			}
		}
		else {
			for(i=0;i<state.selectedItems.length;i++) {
				if(state.selectedItems[i] != null && state.selectedItems[i].inventory == 'BACK_ORDER') {
					flags['BACK_ORDER'] = state.selectedItems[i];
				}
			}
		}
		if(flags['BACK_ORDER']) {
			$('<div>'+backorder_message(flags['BACK_ORDER'])+' '+messages.BACKORDER_TEXT_ADD+'</div>').dialog({
				buttons: [
					{
						text: messages.BUTTON_CANCEL,
						click: function() {
							$(this).dialog("close").remove();
						}
					},
					{
						text: messages.ADDTOCART,
						click: function() {
							$(this).dialog("close").remove();
							authTokProv.perform(ajaxAddToCart, 'https://' + location.hostname + '/AjaxManageShoppingCartCmd', form);
						}
					} 
				],
				modal:true
			});
			return true;
		}
		else {
			return false;
		}
	}
	
	this.init = function(obj) {
		if (typeof products == 'undefined' || products == null) return;
		var pn = queryString['partNumber'];
				
		for (var i=0; i < products.length; i++) {
			var minPrice = -9999999999999999;
			var maxPrice = 9999999999999999;
			for (var j=0; j<products[i].length; j++) {
				minPrice = products[i][j].price < minPrice ? minPrice : products[i][j].price;
				maxPrice = products[i][j].price > maxPrice ? maxPrice : products[i][j].price; 
			}
			product[i].isSinglePriced = (minPrice == maxPrice);
		} 
		
		$('#ProductForm .product').each(function(i, p) {
			$('.product-option', p).each(function(j, o) {
				var partNumberFound = false;
				//Added title for Defect Id # CIS100068790		
				// Create the empty select box
				$('<select id="productOption' +i+j +'" name="productOption' +i+j +'" title="'+messages.SELECT_DETAILS+' '+options[i][j].n+'"></select>')
					.data('product', products[i])
					.change(onAttributeChange)
					.appendTo(this);
				
				var $s = $('#productOption' +i+j);
				
				// Add the default option
				$s.append('<option value="unselected">'+messages.PDETAIL_OPTION_SELECT+' '+options[i][j].n+'</option>');
												
				// Populate all options for the initial load of the select box
				if(typeof options[i][j] != 'undefined') {
					var attr = options[i][j];
					
					// 1. Determine attr val display names
					var attrVals = new Array();
					for(attrValId in attr.v) {
						var attrVal = attr.v[attrValId];
						var foundItem = null;
						var priceText = '';
						var backorderText = '';
						var itemSequence = null;
						
						for(var l=0;l<products[i].length;l++) {
							var item = products[i][l];
							
							if ($.inArray(attrValId, item['options']) >= 0) {
								foundItem = item;
								break;
							}
						}
						if (foundItem !== null) {
							itemSequence = item['itemSequence'];
							// Only resolve to a SKU for if there is exactly one
							// option
							if (options[i].length == 1) {
								if (foundItem.inventory == 'BACK_ORDER') {
									backorderText = ' - '+messages.BACKORDER_TEXT;
								}
								if (!product[i].isSinglePriced) {
									priceText = ' - '+formatLocalCurrency(foundItem.price);
								}
							}
						
						}
						attrVals.push({
							'id': attrValId,
							'value': attrVal,
							'price': foundItem === null ? null : foundItem.price,
							'text': attrVal+backorderText+priceText,
							'itemSequence': itemSequence
						});
					}
					
					// 2. Sort attr vals
					attrVals.sort(function(v1, v2){
						if (v1.itemSequence !== null && v1.itemSequence > 0){
							return parseFloat(v1.itemSequence.toLowerCase()) > parseFloat(v2.itemSequence.toLowerCase()) ? 1 : -1;
						} else {
							if (v1.value.toLowerCase() == v2.value.toLowerCase()) {
								return parseFloat(v2.price) - parseFloat(v1.price);
							}
							return v1.value.toLowerCase() > v2.value.toLowerCase() ? 1 : -1;
						}
					});
					
					// 3. Populate the select box
					for (var attrValIndex = 0; attrValIndex < attrVals.length; attrValIndex++) {
						var val = attrVals[attrValIndex];
						$s.append('<option value="'+val.id+'">'+val.text+'</option>');
					}
				}
			 
				// If a SKU number is passed in the query string, pre-populate
				// the select boxes
				if(typeof(pn) !== 'undefined') {
					for(var k=0;k<products[i].length;k++) {
						if(pn == products[i][k]['partNumber']) {
							partNumberFound = true;
							$s.val(products[i][k]['options'][j]);
						}
					}
				}
				
				// Disable the second select box unless the values are
				// pre-populated
				if (!partNumberFound && j > 0) {
					$s.attr('disabled', 'true');
				}
			});
			if($('.product-option', p).length == 0){
				state.selectedItems.push(findItem(products[i],$(p).find('.catentryInput').val()));
			}
		});
		
		$('.bundle-product-qty').change(updatePricing);
		
		if (window.location.hash)
		{
			if (window.location.hash == '#reviews')
			{
				ShowReviews();
			}
			
		}
	};
	
	// private methods
	mergeFeePricing = function(p1,p2,qty) {
		var uniqueRegions = unique(p1.feeRegions);
		for (var j = 0; j < uniqueRegions.length; j++) {
			var region = uniqueRegions[j];
			for (var k = 0; k < p1.feeOptions.length; k++) {
				var feeRegion = p1.feeOptions[k].region;
				var feeDesc = p1.feeOptions[k].desc;
				var feePrice = parseFloat(p1.feeOptions[k].price) * qty;
				if (region === feeRegion) {
					p2.push({
						'region': region,
						'desc': feeDesc,
						'price': feePrice
					});
				}
			}	
		}
		return p2;
	}
	
	getRegionList = function(p) {
		var list = [];
		for (var i=0; i<p.length;i++) {
			list.push(p[i].region);
		}
		return list;
	}
	
	getHtmlFeePricing = function(p1,p2,totalPrice) {
		var html = "";
		var uniqueRegions = [];
		if (p1.feeRegions.length > 0) {
			uniqueRegions = unique(p1.feeRegions);
		} else {
			uniqueRegions = unique(getRegionList(p2));
		}
		var totalFee = 0;
		for (var j = 0; j < uniqueRegions.length; j++) {
			var dRegion = uniqueRegions[j];
			if (dRegion != 'undefined'){
				html += '<span data-region=\"'+dRegion+'\" class=\"hide\">';
				html += '<label>'+messages.PDETAIL_ONLINE_PRICE+'</label>';
				html += '<span class=\"currency\">'+formatLocalCurrency(totalPrice)+'</span>';
				for (var i = 0; i < p2.length; i++) {
					var fees = p2[i];
					var region = fees.region;
					var desc = fees.desc;
					var price = fees.price;
					if (dRegion === fees.region) {
						totalFee = totalFee + price;
						html += '<div><label>'+desc+'<span class=\"has-tooltip html-tooltip ecofee-tooltip\">&nbsp;</span><span class=\"tooltip\">'+messages.TOOLTIP_ECOFEE_INFO+'</span></label>';   		
						html += '<span class=\"currency\">'+formatLocalCurrency(price)+'</span></div>';
					}
				}
				html += '<label style=\"border-top:1px solid #333333;width:200px\";>'+messages.PDETAIL_CONFIGURED_PRICE+'</label>';
				html += '<span class="currency">'+formatLocalCurrency(totalPrice+totalFee)+'</span></span>';
			}
		}
		return html;
	}
	
	getHtmlVarianceFeePricing = function(p1,p2,totalPrice,totalListPrice,totalDiscountPrice) {
		var html = "";
		var uniqueRegions = [];
		if (p1.feeRegions.length > 0) {
			uniqueRegions = unique(p1.feeRegions);
		} else {
			uniqueRegions = unique(getRegionList(p2));
		}
		var totalFee = 0;
		for (var j = 0; j < uniqueRegions.length; j++) {
			var dRegion = uniqueRegions[j];
			if (dRegion != 'undefined'){
				html += '<span data-region=\"'+dRegion+'\" class=\"hide\">';
				html += '<div class=\"online-price\"><span class=\"label\">'+messages.PDETAIL_ONLINE_PRICE+'</span>';
				if (totalListPrice > -1.00) {
					html += '<span class=\"currency\">'+formatLocalCurrency(totalListPrice)+'</span></div>';
				} else {
					html += '<span class=\"currency\">'+formatLocalCurrency(totalPrice)+'</span></div>';
				}
				for (var i = 0; i < p2.length; i++) {
					var fees = p2[i];
					var region = fees.region;
					var desc = fees.desc;
					var price = fees.price;
					if (dRegion === fees.region) {
						totalFee = totalFee + price;
						html += '<div class=\"eco-price\"><span class=\"label\">'+desc+'<span class=\"has-tooltip html-tooltip ecofee-tooltip\">&nbsp;</span><span class=\"tooltip\">'+messages.TOOLTIP_ECOFEE_INFO+'</span></span>';   		
						html += '<span class=\"currency\">'+formatLocalCurrency(price)+'</span></div>';
					}
				}
				if (totalDiscountPrice > 0) {
					html += '<div class=\"less-price\"><span class=\"label\">'+messages.PDETAIL_LESS_TEXT+'</span>';
					html += '<span class=\"currency\">-'+formatLocalCurrency(totalDiscountPrice)+'</span></div>';
					html += '<div class=\"your-price\">';
				} else {
					html += '<div class=\"your-price\" style=\"border-top:1px solid #333333;width:200px\";>';
				}
				html += '<span class=\"label\">'+messages.PDETAIL_YOUR_PRICE+'</span><span class="currency">'+formatLocalCurrency(totalPrice+totalFee)+'</span></div></span>';
			}
		}
		return html;
	}
	updatePricing = function() {
		var totalPrice = 0;
		var totalListPrice = 0;
		var totalDiscountPrice = 0;
		var validQuantities = true;
		var totalFees = [];
		var getHtml="";
		var priceTypeDiv = $('#ProductForm .bundle-price');
		for (var i = 0; i < state.selectedItems.length; i++) {
			
			product = state.selectedItems[i];
			
			if (product) {
				var price = parseFloat(product.price);
				var listPrice = parseFloat(product.listPrice);
				if(listPrice == -1 || listPrice == null) {
					listPrice = price;
				}

				var quantity = $($('.product-quantity input')[i]).val();
				var intRegex = /^\d+$/;

				totalPrice = (price > -1 && totalPrice > -1) ? (totalPrice + price * quantity) : -1;
				totalListPrice = (listPrice > -1 && totalListPrice > -1) ? (totalListPrice + listPrice * quantity) : -1;
				// switch online-price and your-price based on RIP or IRC based pricing
				if(totalPrice != totalListPrice && totalPrice > totalListPrice  && totalListPrice > -1) { 
					// switch them
					var tempTotalListPrice = totalListPrice;
					totalListPrice = totalPrice;
					totalPrice = tempTotalListPrice;
				}

				totalDiscountPrice = totalListPrice - totalPrice;
				
				if (isNaN(quantity) || quantity < 0 || !intRegex.test(quantity)) {
					validQuantities = false;
				}
				if (validQuantities && quantity > 0) {
					totalFees = mergeFeePricing(product,totalFees,quantity);
					if (totalFees.length > 0) {
						if ($('#ProductForm .product-bundle').length > 0) {
							getHtml = getHtmlFeePricing(product,totalFees,totalPrice);
						} else {
							getHtml = getHtmlVarianceFeePricing(product,totalFees,totalPrice,totalListPrice,totalDiscountPrice);
						}
					}
				}
			}
		}
		if (validQuantities) {
			if(totalListPrice > -1.00 && totalDiscountPrice > 0){
				$('#ProductForm .bundle-price .online-price .currency').text(formatLocalCurrency(totalListPrice));
				$('#ProductForm .bundle-price .online-price').removeClass('hide-div');
				$('#ProductForm .bundle-price .less-price .currency').text('-'+formatLocalCurrency(totalDiscountPrice));
				$('#ProductForm .bundle-price .less-price').removeClass('hide-div');
				$('#ProductForm .bundle-price .your-price .currency').text(formatLocalCurrency(totalPrice));
				
				if(($('#ProductForm .bundle-price .your-price .currency').length == 0) && 
					($('#ProductForm .bundle-price .currency').length == 1)){
						$('#ProductForm .bundle-price .currency').text(totalPrice > -1 ? formatLocalCurrency(totalPrice) : '-');
				}			
			}
			else{
				$('#ProductForm .bundle-price .currency').text(totalPrice > -1 ? formatLocalCurrency(totalPrice) : '-');
			}
			if ($('#ProductForm .product-price').length > 0) {
				priceTypeDiv = $('#ProductForm .product-price');
			} 
			if (totalPrice > 0 && getHtml.length > 0) {
				$('[data-region]',priceTypeDiv).remove();
				$('[data-price]',priceTypeDiv).after(getHtml);
				var loc = $.cookie("C_LOC");
				var myDiv = $('[data-region="'+ loc + '"]');
				if (myDiv.length != 0) {
					myDiv.show();
					$('[data-price]',priceTypeDiv).hide();
				}
			} else {
				$('[data-region]',priceTypeDiv).remove();
				$('[data-price]',priceTypeDiv).show();
			}
		}
	}
	
	onAttributeChange = function(e) {
		var price = 0, foundProduct;
		
		initializeDivAndPrice();
		
		// Reset the "stateful" selection - CIS100064014 - CIS100063969
		state.selectedItems.length = 0;
		$('#ProductForm .product').each(function(i, p) {
			
			// If the selected attributes resolve to an item, save the product
			// and update the quantity
			foundProduct = findItem(products[i], $(p).find('option:selected').map(function(){ return $(this).val(); }).get());
			// state.selectedItems[i] = product;
// mazeem : commented above line
			if (foundProduct) {
				
				$('#minQtyText').val(foundProduct.minQty); // Added to update the min quantity whenever item is changed.
				state.selectedItems[i] = foundProduct; // : azeem had added
														// this for testing
				if ($('.product-bundle').length > 0 && $(p).find('.product-quantity input').val() == 0) {
					var qtyInput = $(p).find('.product-quantity input');
					if($(p).find('select').length > 0){
						qtyInput.val(foundProduct.minQty);
					}
					if (!qtyInput.hasClass('limit-one')) {
						qtyInput.removeAttr('disabled');
					}
				}	
				// Defect id : CIS100064444 : Fixed the disabled state when the
				// qty is 1 or more and the qty is not limited to one.
				if ($('.product-bundle').length > 0 && $(p).find('.product-quantity input').val() > 0 
						&& !$(p).find('.product-quantity input').hasClass('limit-one')) {					
					$(p).find('.product-quantity input').removeAttr('disabled');
										
				}
				
				// Enable/disable quantity field
				if (foundProduct.itemLimitOneQty == "true"){
					$(p).find('.product-quantity input').attr('disabled', 'disabled')
					$(p).find('.product-quantity input').removeClass('validationError')
					$(p).find('.product-quantity input').val(foundProduct.minQty)
				}else{
					$(p).find('.product-quantity input').removeAttr('disabled');
				}
				
				$(p).find('.catentryInput').val(foundProduct.catentry);
				$(p).find('.addedItemInput').val(foundProduct.partNumber);
			}
			else {
				if ($('.product-bundle').length > 0) {
					$(p).find('.product-quantity input')
						.val(0)
						.attr('disabled', 'disabled');	
				}
			}
			
			// Change the disabled flag for the attribute selections and
			// populate enabled selects
			var isSelectEnabled = true;
			var selectedValues = [];
			var attributes = [];
			var reloadNextSelect = false;
			$(p).find('.product-option select', p).each(function(j, s) {
				
				// If the select is following the changed select, recreate the
				// options to ensure they're still valid
				if (isSelectEnabled==false) {
					$(s).val('unselected');
				}
				$(s).attr('disabled', !isSelectEnabled);
				
				if(reloadNextSelect){
					$(s).find('option').remove();
					var id = $(s).attr("id");
					var m = id.charAt(id.length - 2);
					var n = id.charAt(id.length - 1);
					var tempOption = options[m][n];
					$(s).append('<option value="unselected">'+messages.PDETAIL_OPTION_SELECT+' '+tempOption.n+'</option>');
					var val = tempOption.v;
					for(var k=0;k<attributes.length;k++) {
						$(s).append('<option value="'+attributes[k]+'">'+val[attributes[k]]+'</option>');
					}
					$(s).hide(0, function(){$(this).show();});
					reloadNextSelect = false;
				}
				
				// If the user has not made a selection in this option, all
				// subsequent options should be disabled
				if ($(s).val() == 'unselected') {
					isSelectEnabled = false;
				} else if(e.currentTarget.name.indexOf("00") > -1){
					attributes = findAttributes(products[i],$(s).val());
					reloadNextSelect = true;
				}
				// mazeem: bit confused whether below statement is required or
				// not, it effects number of options in second drop down
				selectedValues.push($(s).val());
				
			});
		});
		// update price only when all options are selected
		if(allOptionsSelected()){
			updatePricing();
		}

		$('#ProductForm').valid();
		$('#ProductForm .product').each(function(i, p) {
			var selectVal = $(p).find('select').val();
			var quantity = $(p).find('input');
			if (selectVal == 'unselected') {
				quantity.removeClass('validationError')
			}
		});
	}
}

$(window).load(function() {
	productDisplay = new ProductDisplay()
	productDisplay.init();
});

function ShowReviews() {
	// this has to be a global function since it's called by a bazaarvoice
	// callback

	$(".product-detail-tabs").tabs("option","active", $('.product-detail-tabs a[href="#product-tab6"]').parent().index());
	
	$('html, body').animate({scrollTop: $("#product-tab6").offset().top - 25}, 800);
}

function areArraysEqual(array1, array2) {
   var temp = new Array();
   if ( (!array1[0]) || (!array2[0]) ) { // If either is not an array
      return false;
   }
   if (array1.length != array2.length) {
      return false;
   }
   // Put all the elements from array1 into a "tagged" array
   for (var i=0; i<array1.length; i++) {
      key = (typeof array1[i]) + "~" + array1[i];
   // Use "typeof" so a number 1 isn't equal to a string "1".
      if (temp[key]) { temp[key]++; } else { temp[key] = 1; }
   // temp[key] = # of occurrences of the value (so an element could appear
	// multiple times)
   }
   // Go through array2 - if same tag missing in "tagged" array, not equal
   for (var i=0; i<array2.length; i++) {
      key = (typeof array2[i]) + "~" + array2[i];
      if (temp[key]) {
         if (temp[key] == 0) { return false; } else { temp[key]--; }
      // Subtract to keep track of # of appearances in array2
      } else { // Key didn't appear in array1, arrays are not equal.
         return false;
      }
   }
   // If we get to this point, then every generated key in array1 showed up the
	// exact same
   // number of times in array2, so the arrays are equal.
   return true;
}

function initializeDivAndPrice(){
	var priceTypeDiv = $('#ProductForm .bundle-price');
	if ($('#ProductForm .product-price').length > 0) { 
		priceTypeDiv = $('#ProductForm .product-price');
	}
	if ($('[data-region]',priceTypeDiv).length > 0){
		$('[data-region]',priceTypeDiv).hide();
		$('[data-price]',priceTypeDiv).show();
	}
	if(!$('#ProductForm .bundle-price .online-price').hasClass('hide-div'))
		$('#ProductForm .bundle-price .online-price').addClass('hide-div');
	if(!$('#ProductForm .bundle-price .less-price').hasClass('hide-div'))
		$('#ProductForm .bundle-price .less-price').addClass('hide-div');
	$('#ProductForm .bundle-price .your-price .currency').text('- -');
	
}

function allOptionsSelected(){
	if ($('#ProductForm .product-bundle').length > 0)
		return true;
	var optionsToBeSelected = $('.product-option select').filter(function() {
	    return $(this).val()==='unselected';
	}).length;
	if(optionsToBeSelected == '0')
		return true;
	else
		return false;
}

$(function() {
	$("form.needAuthTokenForm").submit(function(event) {
		if (this.elements['authToken'] === undefined) {
			event.preventDefault();
			authTokProv.submit(this);
		}
	});
});
