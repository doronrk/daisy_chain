(function($) { // Use $ to mean jQuery

	//// COLOR / SIZE UI FUNCTIONS

	// clear drop down passing optional default text
	ess.clearSelectField = function(fieldId, defaultText) {
		var defaultText = defaultText || "";
		$(fieldId).find('option').remove(); // remove all select options
		if (defaultText != "") {
			$(fieldId).append('<option>' + defaultText + "</option>");
		}
	};

	// originally commented out for QC 96084
	// removed "sale" and money additions from prices
	// needed in getSkuByColorAndSize and getQuantityByColorAndSize
	ess.filterSizeColorValue = function(text) {
	    // remove sale text from color
		var saleIndex = text.indexOf("- " + ess.locale.sale);
	    if (saleIndex > -1) {
	        text = text.substr(0, saleIndex - 1);
	    }
	    // remove money value from price
        var pricePattern = /(([ -]+)?([\u00a3\u20ac$\?]|\w{3}|&\w*?;)?[\d ,.]+[., ]\d{2,4}( &\w*?;|[ \u00a3\u20ac$\?]+)?)?/ig;
	    text = text.replace(pricePattern, "");

		return text;
	};
	ess.getSkuByColorAndSize = function(colorCode, size) {
		var skuCode = '';
		if (ess.productJSON.superPid) {
		    var skus = ess.productJSON.childPids[ess.poloCustomProduct.selectedChildPid].skus;
		} else {
		    var skus = ess.productJSON.skus;
		}
		$.each(skus, function(i, sku) {
			if (sku !== null && sku.colorCode == colorCode && sku.size == size) { // size may need filtering
				skuCode = sku.sku_id;
			}
		});
		return skuCode;
	};

	// returns an array of sku objects
	ess.getSkusBySize = function(size) {
		var skuArray = [];
		$.each(ess.productJSON.skus, function(i, sku) {
			if (sku !== null && ess.filterSizeColorValue(sku.size) == size) {
				skuArray.push(sku);
			}
		});
		return skuArray;
	}

	// returns an array of sku objects
	ess.getSkusByColor = function(colorCode) {
		var skuArray = [];
		$.each(ess.productJSON.skus, function(i, sku) {
			if (sku !== null && sku.colorCode == colorCode) {
				skuArray.push(sku);
			}
		});
		return skuArray;
	}

	ess.getSkuByCode = function(code){
		var sku = new Object();
		$j.each(ess.productJSON.skus, function(index, val){
			if (val.sku_id == code){
				sku = val;
				return false;
			}
		});

		return sku;
	}

	ess.getAvailabilityBySkuCode = function(code) {
		return ess.getSkuByCode(code).avail;
	};

	ess.getQuantityByColorAndSize = function(colorCode, size) {
		var skuQtyOnHand = "";
		size = ess.filterSizeColorValue(size);
		$.each(ess.productJSON.skus, function(i, sku) {
			if (sku !== null && sku.colorCode == colorCode && ess.filterSizeColorValue(sku.size) == size) { // filter out price
				skuQtyOnHand = sku.quantOnHand;
			}
		});
		return skuQtyOnHand;
	};

	// return array of available color codes for the size provided
	ess.getColorsBySize = function(size) {
		var colorCodeArray = [];
		var sizeMap = ess.sizeMap;
		$.each(sizeMap[size].colors, function(i, color) {
			colorCodeArray.push(color.code.toString());
		});
		return colorCodeArray;
	};

	ess.getColorsByGenericName = function(genColor) {
		var colorCodeArray = [];
		for (color in ess.allColors) {
			if ($.inArray(genColor, ess.allColors[color].genericColors) > -1) {
				colorCodeArray.push(ess.allColors[color].code.toString());
			}
		}
		return colorCodeArray;
	};

	ess.getColorsBySizeAndGenericName = function(size, genColor) {
		var colorCodeArray = [];
		$.each(ess.sizeMap[size].colors, function(i, color) {
			if ($.inArray(genColor, color.genericColors) > -1) {
				colorCodeArray.push(color.code.toString());
			}
		});
		return colorCodeArray;
	};

	ess.removeDefaultOption = function(field) {
		$(field + " option").each(function (i, opt) {
			if (opt.text == ess.locale.selectColor || opt.text == ess.locale.selectSize) {
				$(this).remove();
			}
		});
	};

	// turns dropdown into single unselectable span
	// restore color/size select dropdown if no value passed
	ess.toggleSingleSelection = function(field, value) {
	    var $field = $(field);
		if (value !== undefined) {
			ess.removeDefaultOption(field);
			if (field == "#size") {
				ess.setSizeSelection(value);
				$('.size-buttons li.' + $('#size').val().replace('|', '\\|') + ':not(.out-of-stock)').addClass('selected');
			} else if (field == "#color") {
				ess.setColorSelection(value);
			}
			$field.siblings("span.single").remove();
			$field.addClass("single"); // add class to hide select
			//$(field).before('<span class="single">' + value + '</span>'); // add text
		} else {
			// todo: add the default value back?
			if ($field.siblings("span.single").length) {
				$field.siblings("span.single").remove();
				$field.removeClass("single");
			}
		}
	};

	ess.allSkusOnSale = function() {
		for (var k = 0; k < ess.productJSON.skus.length; k++) {
			if (ess.productJSON.skus[k].price.base == ess.productJSON.skus[k].price.current) {
				return false;
			}
		}
		return true;
	}

	ess.selectedSkusOnSale = function() {
		for (var k = 0; k < ess.productJSON.skus.length; k++) {
			if (ess.productJSON.skus[k].price.base != ess.productJSON.skus[k].price.current) {
				return true;
			}
		}
		return false;
	}

	// optional filter argument (array) only displays those in the filter
	// consolidates the following functions: updateSwatches, showAllColors
	ess.updateColorOptions = function(colorFilter) {
		var colorFilter = colorFilter || [];
		var allSkusOnSale = ess.allSkusOnSale();

		if ($("#color").length) {

			// show "select color" if the following..
			// once the default text is removed it should not appear again
			// product is sliced by size, not a CYO product, more than one size and the default size is selected
			if (!ess.defaultRemoved && ess.slicedBy == "size" && (ess.sizes.length > 1 && $("#size").attr("selectedIndex") == 0)) {
				defaultText = ess.locale.selectColor;
			} else {
				ess.defaultRemoved = true;
				defaultText = null;
			}
			ess.clearSelectField("#color", defaultText); // clear drop down
			var selectedValue = $('.swatches li.selected').attr('value');
			$(".swatches li").remove(); // clear swatches
			$('#color-group span.sale-price').html(''); // clear sale price


			var lastColor = "";
			var colorCounter = 0;

			// re-populate drop down and swatches

			$(".swatches").removeClass("one-color").append('<li class="label"></li>');
			var swatchListSorted = ess.swatchListSorted;
			$.each(swatchListSorted, function(k, swatch) {
				showSwatch = false;
				for (k = 0; k < ess.productJSON.skus.length; k++) {
					if (ess.productJSON.skus[k].colorCode == swatch.colorCode
						&& ess.productJSON.skus[k].avail == "IN_STOCK") {
						showSwatch=true;
						break;
					}
				}
				// if a filter is provided make sure the colorCode matches
				if ((colorFilter.length > 0 && $.inArray(swatch.colorCode, colorFilter) > -1) || (colorFilter.length == 0 && swatch.color !== undefined)) {

					// when sliced by size only display sale prices if a size is selected
					if (ess.slicedBy == "color" || (ess.slicedBy == "size" && $("#size").attr("selectedIndex") != 0)) {
						var sale = false;
						var skus = (ess.slicedBy == "color") ? ess.productJSON.skus : ess.getSkusBySize($("#size option:selected").text());
						$(skus).each(function (i, sku) {
							if (swatch.color.toLowerCase() == sku.color.toLowerCase()) {
								sale = (sku.price.base !== sku.price.current);
							}
						});
					}

					// populate color dropdown
					// do not show "SALE" if VP ("VALUE") level pricing or ALL skus on sale
					// do not populate on CYO pages
					if (ess.poloCollection == undefined) {
                        if (sale && ess.displayHintType != "VALUE" && !allSkusOnSale && swatch.color !== undefined) {
                            $("select#color").append('<option value="' + swatch.colorCode + '">' + swatch.color + " - "+ ess.locale.sale + "</option>");
                        } else {
                            $("select#color").append('<option value="' + swatch.colorCode + '">' + swatch.color + "</option>");
                        }
					}

					// populate swatch images
					if(showSwatch) {
						var li = $('<li class="swatch" value="' + swatch.colorCode + '" style="display:list-item">');
						li.append('<img src="' + swatch.src +'" title="' + swatch.color + '" alt="' + swatch.color + '" />' + swatch.color);
						$(".swatches").append(li);
						if(selectedValue == swatch.colorCode) {
							$(".swatches").find("li").removeClass("selected");
							li.addClass('selected');
						} else if (colorCounter === 0) { // Always select the 1st color anyway
							li.addClass("selected");
						}
						lastColor = swatch.color;
						colorCounter++;
					}
				}
			});

			// replace with text if only one color available
			// add || ess.swatchListSorted.length == 1?
			if (ess.slicedBy == "color" && !$("#narrow-by-select").length && colorCounter == 1) {
				ess.toggleSingleSelection("#color", lastColor);
			}

			if(colorCounter === 1) {
				$(".swatches").addClass("one-color");
			}
		}
	};

	ess.updateSizeOptions = function() {
		var sizeCounter = 0;
		var currentSize = $('.size-buttons li.selected').text().replace($('.size-buttons li.selected span').text(), '');
		var colorName = jQuery('.swatches .swatch.selected img').attr('title')
		if(!colorName) {
			colorName = jQuery('.swatches .swatch:first').next().find("img").attr('title');
		}
		colorName = colorName.toLowerCase().replace("'", "&#39;");
		ess.clearSelectField("#size");
		$('.size-buttons li').remove();
		var colorCode = $('#color').val();

		$(".size-buttons").removeClass("one-size").append('<li class="label"></li>');
		var sizeButtonToClick = null;
		for (var i = 0; i < ess.sizesByColor[colorName].length; i++) {
			var sku = ess.sizesByColor[colorName][i];
	        var isOutOfStock = (ess.getQuantityByColorAndSize(colorCode, sku.sizeText) == 0);
			$("#size").append('<option value="' + sku.value + '">' + sku.sizeText + '</option>');
			var sizeButton = jQuery('<li class="' + sku.value + (isOutOfStock ? ' out-of-stock':'') + '">' + sku.sizeText + '<span class="' + (sku.price.baseAmount > sku.price.saleAmount ? 'sale' : '') + '">' + sku.price.sale + '</span>' + (isOutOfStock ? '<img src="/images/product/crossout.png" class="not-available"/>' : '') + '</li>');
			$('.size-buttons').append(sizeButton);
			if(!isOutOfStock) {
				//after the size options are all listed, click the previously-selected size if still available; otherwise click the first available size.
				if (sizeButtonToClick == null || currentSize == sku.sizeText) {
					sizeButtonToClick = sizeButton;
				}
			}

			sizeCounter++;
		}
		if (ess.sizesByColor[colorName].length == 1) {
			$('.size-buttons').addClass('one-size');
		}

		if (sizeButtonToClick != null) {
			sizeButtonToClick.click();
		}
		/*
		jjj replaced by sizeButtonToClick
		var sizeButtons = $('.size-buttons li').not('.out-of-stock');
		if(sizeButtons.length == 1) {
			sizeButtons.click();
		}
		*/

		// var colorCode = jQuery('.swatches .swatch.selected').attr('value');
		// setCheckSkuAvailability(colorCode);

	};

	// clear and re-populate the generic colors drop down
	ess.updateNarrowByOptions = function() {

		// get the selected size
		var size = ess.filterSizeColorValue($("#size option:selected").text());
		if (ess.slicedBy == "size" && size != ess.locale.selectSize) {
			// create list of generic names based on size
			var genericColorArray = ess.sizeMap[size].genericColors;
		} else {
			// create list of all generic names available
			var genericColorArray = ess.genericColors
		}

		ess.clearSelectField("#narrow-by-select", ess.locale.allColors);
		$.each(genericColorArray, function(i, color) {
			$("#narrow-by-select").append('<option>' + color + '</option>');
		});

		$("#narrow-by-select").unbind("change").bind("change", function() {
			ess.setNarrowBySelection($(this).val());
		});
	};

	// select color by code or name
	// todo: if no color is passed use the first available color
	ess.setColorSelection = function(color) {
		var color = color.toString();
		var selectedColor = "";

		$('#color option[selected]').removeAttr('selected');
		$("#color option").each(function(i, colorOption) {

			var value = '';
			if (color.match(/^\d+$/)) { // match colorCode integer
				value = $(colorOption).val();
			} else { // otherwise assume a color name is passed
				value = ess.filterSizeColorValue($(colorOption).text());
			}
			value = value.replace("'", "&#39;");

			if (color == value) {
				selectedColor = $("#color option").eq(i);
				selectedColor.attr('selected', 'selected');
			}
		});
		if(selectedColor != "") {
			$('.color-display').text(selectedColor.text().replace('- SALE', ''));
		}
		$('#color-group span.sale-price').html('');
		ess.changeColor();
	};

	// select size by name
	ess.setSizeSelection = function(size) {
		$("#size option").each(function(i, sizeOption) {
			var text = ess.filterSizeColorValue($(sizeOption).text());
			if (size == text) {
				var selectedSize = $("#size option").eq(i);
				try { // IE 6: http://csharperimage.jeremylikness.com/2009/05/jquery-ie6-and-could-not-set-selected.html
					$(selectedSize).attr("selected", "selected");
				} catch(e) {
					setTimeout(function() { $(selectedSize).attr("selected", "selected"); } ,1);
				}
			}
		});
		ess.changeSize();
	};

	// todo: more refactoring
	ess.setNarrowBySelection = function(genColor) {
		var genColor = genColor || $("#narrow-by-select").val();

		// (sliced by size and a size is selected) or default color is passed
		if (($("#size").length > 0 && $("#size").attr("selectedIndex") > 0 && ess.slicedBy != "color") || ess.size !== undefined) {

			// get the selected size
			var size = $("#size option:selected").text();
			if (size == ess.locale.selectSize) {
				size = ess.sizes[0]; // sets to first listed size; not sure why this is done
			}

			// if all colors are selected to show
			if (genColor === ess.locale.allColors) { // && ess.slicedBy == "color") {
				ess.updateColorOptions();
			} else {
				var filter = ess.getColorsBySizeAndGenericName(size, genColor);
				ess.updateColorOptions(filter);


			}

		// sliced by color
		} else {
			if (genColor == ess.locale.allColors) {
				ess.updateColorOptions();
			} else {
				var filter = ess.getColorsByGenericName(genColor);
				ess.updateColorOptions(filter);
			}
		}

	};


	//// SCENE 7 functionality

	// need to recreate the iframe instead of changing the src to avoid browser history manipulation
	// http://nirlevy.blogspot.com/2007/09/avoding-browser-history-when-changing.html
	ess.displayScene7Image = function(src) {
		// store src url
		ess.productJSON.zoomImageURL = src;

		$('#zoom').empty();
		var so = new SWFObject(ess.productJSON.zoomImageURL, 'scene7Zoom', '500', '520', '8', '#ffffff');
		so.addParam("wmode", "transparent");
		so.addParam("quality", "high");
		so.addParam("scale", "noscale");
		so.addParam("menu", "false");
		so.addParam("salign", "LT");
		so.write("zoom");
	};

	ess.updateScene7Image = function(colorId) {
		/*
		// passed color from family grid
		if (ess.size != undefined) { size = ess.size; }
		*/

		if (colorId == undefined) return false;

		// Getting the color slice zoom image
		for (var i = 0; i < ess.productJSON.colorSliceValues.length; i++) {
			if (ess.productJSON.colorSliceValues[i].colorId == colorId) {
				zoomURL = ess.productJSON.colorSliceValues[i].zoomImageURL;
			}
		}

		// DEBUGGING //
		//alert("size: " + size + "\ncolorId: " + colorId + "\nsku: " + sku + "\nzoomUrl: " + zoomUrl);


		// update url for scene 7 image
		ess.productJSON.zoomImageURL = ess.buildScene7ImageURL(zoomURL);
		ess.displayScene7Image(ess.productJSON.zoomImageURL);
	};

	/**
	 * Takes a pipe-delimited scene7 string and builds the final URL
	 */
	ess.buildScene7ImageURL = function(unparsedString) {
		var zoomURL = '';
		var zoomURLParts = unparsedString.split('|');
		if (zoomURLParts.length == 2) {
			zoomURL = zoomURLParts[0].replace('{0}', zoomURLParts[1].replace('&sku=',''));
		}
		return zoomURL;
	}

	/**
	 * Finds the most recently added item in the cartItem array by timestamp and returns the array position
	 * @param {Object} dwrCartSummaryResponse
	 * @return {Integer}
	 */
	ess.getLastAddedItemFromCartResponse = function(dwrCartSummaryResponse) {
		earliestTimestamp = dwrCartSummaryResponse.cartItems[0].addedDate.getTime();
		earliestPosition = 0;
		for (i = 0; i < dwrCartSummaryResponse.cartItems.length; i++) {
			thisTimestamp = dwrCartSummaryResponse.cartItems[i].addedDate.getTime();
			if (earliestTimestamp < thisTimestamp) {
				earliestTimestamp = thisTimestamp;
				earliestPosition = i;
			}
		}
		return earliestPosition;
	}

	/**
	 * Returns the price of an item in the cart (with applicable discount applied)
	 * @param {Object} cartItem
	 * @return {Float}
	 */
	ess.getItemPriceFromCartResponse = function(cartItem) {
		if (cartItem.pricing.itemLevelDiscountedPrice == null) {
            // no discount
            itemPrice = cartItem.pricing.unitPrice.amount;
        } else {
            // discount
            itemPrice = cartItem.pricing.itemLevelDiscountedPrice.amount/cartItem.quantity;
        }
		return itemPrice;
	}

	/**
	 * Converts a number to a formatted string with definable decimal places, decimal separator, and thousands separators
	 * @param {float} number
	 * @param {integer} decimals
	 * @param {string} decimal_sep
	 * @param {string} thousands_sep
	 */
	ess.formatNumber = function(n, decimals, decimal_sep, thousands_sep)
	{
		var c = isNaN(decimals) ? 2 : Math.abs(decimals),
		d = decimal_sep || '.',
		t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		sign = (n < 0) ? '-' : '',
		i = parseInt(n = Math.abs(n).toFixed(c)) + '',
		j = ((j = i.length) > 3) ? j % 3 : 0;
		return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
	}

	/**
	 * Takes a number and converts it to the given currency format.
	 * This function keys off the currency symbol since that external externalized string (info.product.currency) will reliably change when the locale changes.
	 * @param {float} number
	 * @param {string} currencySymbol
	 */
	ess.formatCurrency = function(number, currencySymbol) {
		switch(currencySymbol) {
			case "&euro;":
			case "\u20AC":
			case "&#8364;":
				// Europe
				formattedNumber = ess.formatNumber(number,2,',','.')+' '+currencySymbol;
				break;
			case "$":
			case "&pound;":
			case "\u00A3":
			case "&#163;":
			default:
				// US,CA,UK,default
				formattedNumber = currencySymbol+ess.formatNumber(number,2,'.',',');
				break;
		}
		return formattedNumber;
	}

	ess.initEnhancedZoom = function () {
		if (jQuery('#enhanced-zoom').length) {
			var colorTemplates = ['poloColor', 'poloSolidHome', 'poloBedCollection'];
			if (jQuery.inArray(ess.productTemplate, colorTemplates)) {
				zoomColor = ess.getColorSliceArray()[0].colorId;
			} else {
				zoomColor = '';
			}
			ess.setZoomColor(zoomColor);
			jQuery('#enhanced-zoom').click(function (e) {
				e.preventDefault();
				if (this.className != 'disabled') {
					var colorCode = jQuery(this).attr('rel');
					var altIndex = jQuery('ul#alternate-images li').length ? jQuery('ul#alternate-images li.active').index() : 0;
					openEnhancedZoom(ess.productJSON.productId, colorCode, altIndex);
				}
			});
		}
	}

	// set enhanced zoom color
	ess.setZoomColor = function (colorCode) {
		var isDisabled = true;
		if (colorCode) { // check if color has a zoom image
			jQuery.each(ess.getColorSliceArray(), function () {
				if (this.colorId == colorCode && this.zoomImageURL != '') {
					isDisabled = false;
				}
			})
		} else { // check if product has a zoom image
			if (ess.productJSON.zoomImageURL != '') {
				isDisabled = false;
			}
		}
		jQuery('#enhanced-zoom')
			.attr({
				'class': isDisabled ? 'disabled' : '',
				'rel': colorCode
			});
	}

	// standardizes standard/super PID slice output
	ess.getColorSliceArray = function () {
		if (ess.productJSON.superPid) {
			var colorSliceArray = [];
			jQuery.each(ess.productJSON.colorSliceValues, function () {
				colorSliceArray.push(this[0]);
			});
			return colorSliceArray;
		} else {
			return ess.productJSON.colorSliceValues;
		}
	}

	ess.rebuildQuantity = function (selectedQty) {

		var currentColor = jQuery("#color").attr('value');
		var currentSize = jQuery('#size option:selected').text();
		var qtyOnHand = parseInt(ess.getQuantityByColorAndSize(currentColor, currentSize), 10);
		var reqMaxQtyOption = Math.min(qtyOnHand,9);
		var selectedQty = Math.min(selectedQty, reqMaxQtyOption);
		var currentMaxQtyOption = $("#quantity option").length;

		if (reqMaxQtyOption != currentMaxQtyOption) {
			var rawSelect = $j("#quantity").empty();
			var styledDropdown = $j("#quantityContainer ul").empty();
			styledDropdown.append('<li class="label">' + selectedQty + "</li>");
			for (var q = 1; q <= reqMaxQtyOption; q++ ) {
				rawSelect.append("<option>" + q + "</option>");
				styledDropdown.append("<li>" + q + "</li>");
			}

			$j("#quantityContainer ul").removeClass("one-option");
			if(reqMaxQtyOption <= 1) {
				styledDropdown.addClass("one-option");
			}

			ess.attachQtyListeners();
		}

		// Reset quantity FRS v1.4 - 2.7.1
		$("#quantity").val(selectedQty).trigger("change"); // Triggering change so the UL dropdown is also updated
	}

	ess.attachQtyListeners = function () {
		$('#addToCartForm').on('click', '.quantity-options li', function(e){
			if (!$(this).hasClass("label")) {
				$(this).siblings(".selected").removeClass("selected");
				$(this).addClass("selected");
				$("#quantity").val($(this).text().toString());
			}
		});
		$("#addToCartForm").on("change", "#quantity", function(e){
			// TODO - Make it more failproof
			$(this).siblings("ul").find(":contains(" + $(this).val() + ")").click();
		});
	}

	//// DOM READY

	$(document).ready(function() {
		// return false;
		// Disabling scene7 if in quickshop
		if (ess.quickshop == true) {
			ess.scene7enabled = false;
		}

		// color
		$('#addToCartForm').on({
			click:function(){
				var colorCode = $(this).attr("value");
				ess.setColorSelection(colorCode);
				$('.swatches li.selected').removeClass('selected');
				$(this).addClass('selected');
				ess.updateSizeOptions();
				$("#alternate-views").trigger("carousel:restart");
				$('.color-display').data('original-color', $('.color-display').text());
				// update the size <select> to match the new cm UI element
				var uiselected = jQuery('#sizeContainer').contents().find('.selected').attr('class');
				if (uiselected != undefined) {
					var split = uiselected.split(" ");
					jQuery('#size').val(split[0]);
				} else {
					jQuery('#size').val('');
				}

				// Reset the quantity FRS v1.4 - 2.7.2
				$("#quantity").val(1).trigger("change"); // Triggering change so the UL dropdown is also updated
			},
			mouseover:function(){
				$('.color-display').data('original-color', $('.color-display').text());
				$('.color-display').text($(this).find('img').attr('title'));
			},
			mouseout:function(){
				$('.color-display').text($('.color-display').data('original-color'));
			}
		},'li.swatch');
		//size
		$('#addToCartForm').on('click','.size-buttons li', function(e) {
			e.stopPropagation();
			if(!$(this).hasClass("label") && !($(this).hasClass("selected"))) {
				$('.size-buttons li.selected').removeClass('selected');
				$('#size').val(/(\d+\|\d+)/.exec($(this).attr('class'))[1]);
				$(this).addClass('selected');

				ess.rebuildQuantity(1);

				// add sale price to size label
				if($.inArray(ess.productJSON.displayType, ['SKU', 'SKU_AND_VALUE']) >= 0) {
					var priceElement = $(this).find('span');
					var isOnSale = priceElement.hasClass('sale');
					var salePrice = priceElement.text();
					$('#color-group .sale-price').html('<span class="hyphen"> - </span>' + (isOnSale ? '<span class="sale">' + salePrice + '</span>' : salePrice));
				}
			}
		});
		ess.attachQtyListeners();
		showShadowBox("#shipping-returns", {width: 929,height: 680, padding: 5, autoScale: false}); // PDP: Shipping & Returns
		//$('#size-chart').popupWindow({width:980,height:550,centerBrowser:1,resizable:1,scrollbars:1,status:1});
		var shadowBoxParams;
		if (utils.isPhone()){
			shadowBoxParams = {width:1600,height:550, scrolling: 'auto'}
		} else {
			shadowBoxParams = {width:1020,height:550};
		}

		if ($("body.quickshop-page").length > 0){
			shadowBoxParams["height"] = 350;
			shadowBoxParams["margin"] = 5;
		}

		shadowBoxParams["onComplete"] = function() {
			if (utils.isIe7()) {
				jQuery('#fancybox-content').css('width', 1020);
			}
		};

		showShadowBox('#size-chart', shadowBoxParams);

		$('#size-chart').click(function(e) {
			document.fire("pr:size-chart"); // 9.2.9 -C-14
		    s.tl(true,'o','Custom Link');
		});

		/* select S as default unless it's not there */
		$(".sizebox:eq(1)").addClass("selected");
		if (!$(".sizebox.selected").length) {
			$(".sizebox:eq(0)").addClass("selected");
		}

		$("#size").val($(".sizebox.selected").attr("value"));

		$(".sizebox").click(function() {
			var th = $(this);
		 	th.removeClass("selected");
			th.addClass("selected");
			$("#size").val($(this).attr("value"));
		});

		//// DATA FUNCTIONS

		ess.sizesByColor = [];
		$.each(ess.productJSON.skus, function(i, sku) {
			var color = sku.color.toLowerCase();
			if(ess.productJSON.skus.length==1){
				ess.sizesByColor[color] = []
			} else{
				ess.sizesByColor[color] = ess.sizesByColor[color] || [];
			}
			ess.sizesByColor[color].push({
				sizeSeq: sku.sizeSeq,
				sizeText: sku.size,
				value: (ess.productJSON.productId + '|' + sku.sku_id),
				price: {
					base: sku.price.base,
					sale: sku.price.current,
					baseAmount: sku.price.baseUnformatted,
					saleAmount: sku.price.currentUnformatted
				}
			});
		});

		// sort sizes by sequence (QC 111736)
		function sortSizesBySequence(a, b) {
			return (a.sizeSeq < b.sizeSeq) ? -1 : 1;
		}
		for (var i = 0; i < ess.swatchListSorted.length; i++) {
			var color = ess.swatchListSorted[i].color.toLowerCase();
			ess.sizesByColor[color].sort(sortSizesBySequence);
		}

		// For each size, determine if the style is available in this size
		// Create associative array for each size
		ess.sizeMap = [];
		$.each(ess.sizes, function(i, size) {
			ess.sizeMap[size] = {
				colors: [],
				genericColors: []
			};
		});

		// Iterate over ess.productJSON.skus
		if (!ess.productJSON.superPid) {
			$.each(ess.sizes, function(i, size) {
				$.each(ess.allStyles, function(j, style) {
					if (style !== null) {
						if ($.inArray(size, style.size) > -1) {
							// Add this styles color info to the size map
							// Issue 90838 - Only add the color to the size map if it's SKU availability is IN_STOCK
							var addColor = false;
							for (var i = 0; i < ess.productJSON.skus.length; i++) {
								if (ess.productJSON.skus[i] !== null && ess.productJSON.skus[i].colorCode == style.colorCode
									&& ess.productJSON.skus[i].size == size
									&& ess.productJSON.skus[i].avail == "IN_STOCK") {
									addColor = true;
								}
							}
							if (addColor) {
								ess.sizeMap[size].colors.push({
									code: style.colorCode,
									name: style.colorName,
									genericColors: style.genericColors
								});
							}
							$.each(style.genericColors, function(k, genericColor) {
								if ($.inArray(genericColor, ess.sizeMap[size].genericColors) == -1) {
									ess.sizeMap[size].genericColors.push(genericColor);
								}
							});
						}
					}
				}); // end each style
			}); // end each size
		} else if (ess.productJSON.superPid == true) {
			$.each(ess.productJSON.childPids, function(childPid,childPidSkus) {
				$.each(ess.sizes[childPid], function(i, size) {
					$.each(ess.allStyles[childPid], function(j, style) {
						if (style !== null) {
							if ($.inArray(size, style.size) > -1) {
								// Add this styles color info to the size map
								// Issue 90838 - Only add the color to the size map if it's SKU availability is IN_STOCK
								var addColor = false;
								for (var i = 0; i < ess.productJSON.childPids[childPid].skus.length; i++) {
									if (ess.productJSON.childPids[childPid].skus[i] !== null && ess.productJSON.childPids[childPid].skus[i].colorCode == style.colorCode
										&& ess.productJSON.childPids[childPid].skus[i].size == size
										&& ess.productJSON.childPids[childPid].skus[i].avail == "IN_STOCK") {
										addColor = true;
									}
								}
								if (addColor) {
									ess.sizeMap[childPid][size].colors.push({
										code: style.colorCode,
										name: style.colorName,
										genericColors: style.genericColors
									});
								}
								$.each(style.genericColors, function(k, genericColor) {
									if ($.inArray(genericColor, ess.sizeMap[childPid][size].genericColors) == -1) {
										ess.sizeMap[childPid][size].genericColors.push(genericColor);
									}
								});
							}
						}
					}); // end each style
				}); // end each size
			});
		}

		// generate unique list of all colors and generic colors
		ess.allColors = [];
		ess.genericColors = [];

		if (ess.productJSON.superPid != true) {
		$.each(ess.allStyles, function(i, style) {
			if (style !== null) {
				ess.allColors[style.colorName] = {
					code: style.colorCode,
					genericColors: style.genericColors
				}; // This only works if the colors in different sizes for the same PID have the same generic colors

				$.each(style.genericColors, function(j, genericColor) {
					if ($.inArray(genericColor, ess.genericColors) == -1) {
						ess.genericColors.push(genericColor);
					}
				});
			}
		});
		} else if (ess.productJSON.superPid == true) {
			// TODO: superPID ess.allColors & ess.genericColors population
		}

		// inserting scene7 URIs into ess.allStyles
		if (ess.productJSON.superPid != true) {
			for (i=0; i<ess.productJSON.skus.length; i++) {
				if (ess.productJSON.skus[i].scene7image != '') {
					for (x=0; x<ess.allStyles.length; x++) {
						if (ess.productJSON.skus[i].color == ess.allStyles[x].colorName) {
							ess.allStyles[x]['scene7image'] = ess.productJSON.skus[i].scene7image;
						}
					}
				}
			}
		} else if (ess.productJSON.superPid == true) {
			// TODO: superPID handling
		}

		// size and color dropdowns are hidden until js loads
		// this prevents the select fields from being seen before swapping with text (when applicable)
		$("#size,#color,#narrow-by-select").css("visibility", "visible");

		// initialize Enhanced Zoom
		ess.initEnhancedZoom();

		// make sure we are not in enlarged image from flash
		if (document.location.href.indexOf('isFlash=true') == -1) {

			// For CYO Flag the calls to ess.updateColorOptions and ess.updateSizeOptions are made in product-page-cyo-flag.js
			// This guarantees that page-load childPid selection logic has run
			if (ess.poloCustomProduct == undefined || (ess.poloCustomProduct != undefined && ess.poloCustomProduct.templateName != 'poloCustomFlagOutfit')) {
				ess.updateColorOptions();
			}

			// run/reset narrow-by functionality
			if ($("#narrow-by-select").length) {
				ess.updateNarrowByOptions();
			}

			// check for size/color filtering from the family grid
			if (ess.selectedColor !== undefined || ess.size !== undefined) {

				// set the narrow by selection
				if (ess.selectedColor !== undefined) {
					ess.setNarrowBySelection(ess.selectedColor);
				}
				// hide select-by if it exists
				if ($("#narrow-by-select").length) {
					$("#narrow-by-group").css("display", "none");
				}
				// display "full assortment available" message
				if (ess.size === undefined || ess.slicedBy == "size" || (ess.slicedBy == "color" && ess.size !== undefined)) {
					$("#colorFilterMessage").css("display", "block");
					$("#colorFilterMessage a").click(function(e) {
						e.preventDefault();
						if ($("#narrow-by-group").length > 0) {
							$("#narrow-by-group").css("display", "block");
						}
						// make sure select field is displayed if more than one color available
						if (ess.swatchListSorted.length > 1) {
							ess.toggleSingleSelection("#color");
						}
						// hide filter message
						$("#colorFilterMessage").css("display", "none");
						ess.updateColorOptions();
						ess.changeColor();
					});
					if (ess.size !== undefined) {
						ess.setSizeSelection(ess.size);
					}
				} else {
					ess.setSizeSelection(ess.size);
				}
				ess.changeColor();
			}

			// Update Scene 7 image with first color
			if (ess.scene7enabled) {
				if ($("#color").length > 0) {
					color = $("#color option:selected").val();
					colorIndex = $("#color").attr("selectedIndex");
					if (color == ess.locale["selectColor"]) {
						colorIndex++;
					}
					color = $("#color option").eq(colorIndex).val();
				}
				ess.updateScene7Image(color);
			}

			// select colors/sizes
			var selectedColorSwatch = $('.swatches li.selected');
			if(selectedColorSwatch.length == 0) {
				selectedColorSwatch = $('.swatches li:first');
			}
			selectedColorSwatch.click();

		} // isFlash=true

		// Fix for disabled scrollbars in Safari and Chrome:
		// http://stackoverflow.com/questions/1617638/scrollbar-problem-with-jquery-ui-dialog-in-chrome-and-safari
		ess.safariFix = function() {
			window.setTimeout(function() {
				$(document)
					.unbind('mousedown.dialog-overlay')
					.unbind('mouseup.dialog-overlay');
			}, 100);
		};

		// Promo functionality
		var promoParams = { type: "iframe", width: 435, height: 150, padding: 20, autoScale: false, titleShow: false };
		$("ul.promotions a").fancybox(promoParams);

		$("a.more-details-closed").click(function() {
	        runEffect($(this));
	        return false;
	    });


	    function runEffect(link) {
	        var hiddenElement = link.siblings(".more-details-hidden");
	        if(hiddenElement.is(":visible")) {
	        	hiddenElement.hide('blind');
	        	link.text(ess.locale.moreDetails);
	        }
	        else {
	        	hiddenElement.show('blind');
	        	link.text(ess.locale.close);
	        }
	        link.toggleClass("more-details-open");
	    }

		// additional analytics for recently viewed and cross sells
		$("ul#recently-viewed-items a, ul#cross-sell-items a").click(function() {
			if(this.rel) {
				this.href += "&" + this.rel;
			}
		});

		// We need to update the available sizes
		ess.updateSizeOptions();

		// Initialize #addToCartForm dropdowns
		$("#addToCartForm").find(".swatches, .size-buttons, .quantity-options").dropdown();

		// Load the quantity drop down based on query string
		if (ess.quantity !== undefined) {
			ess.rebuildQuantity(ess.quantity);
			//$("#quantity option")[ess.quantity - 1]['selected'] = true; // Subtract 1 because of 0-based array index
		}

	});
})(jQuery);