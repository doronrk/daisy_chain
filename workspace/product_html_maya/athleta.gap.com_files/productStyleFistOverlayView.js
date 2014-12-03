var productStyleFistOverlayView = {
	api: {
		render: function() {
			productStyleFistOverlayView.render();
		}
	},
	templates: {
		PRODUCT_COLOR_SWATCH: new Template(
			" <label class=\"cssHide2\" for=\"colorSwatch_#{uniqueID}\">#{colorName}</label>" +
			" <input id=\"colorSwatch_#{uniqueID}\" class=\"#{selected} selecter\" uniqueId=\"#{uniqueID}\" width=\"18\" type=\"image\" height=\"18\" alt=\"#{colorName}\" src=\"/#{swatchImagePath}\">"
		),
		PRODUCT_SIZE_SWATCH: new Template(
			" 	<label class=\"cssHide2\" for=\"size#{dimension}Swatch_#{uniqueID}\">#{sizeOptionName}</label>" +
			" 	<button id=\"size#{dimension}Swatch_#{uniqueID}\" class=\"#{selected} selecter\" uniqueId=\"#{uniqueID}\" type=\"button\"  value=\"#{sizeOptionName}\">#{sizeOptionName}</button>"
		),
		PRODUCT_MAIN_IMAGE: new Template(
			" <img id=\"#{productImageID}\" class=\"productImage\" src=\"/#{src}\" alt=\"product image\" />"

		),
		PRODUCT_SECTION_CONTAINER_FIST: new Template(
			"<div id='productSection' class=\"productSection clearfix\">" +
			"  	<div id=\"productSectionLeft\" class=\"productSectionLeft clearfix\">" +
			"  		<div id=\"productSectionProductImage\" class=\"productSectionImage\">#{productImage}</div>" +
			"  	</div>" +
			"  	<div id=\"productSectionRight\" class=\"productSectionRight clearfix\">" +
			"  		<div id=\"fistProductStyleName\" class=\"productStyleName\">#{productStyleName}</div>" +
			"  		<div id=\"fistProductSwatches\" class=\"productSwatchesContainer clearfix\">" +
			"	       <div id=\"fistProductSwatchesTop\">" +
			'	    		<div id="fistProductNumber">' +
			'		    		<div id="fistProductId" aria-label="Product Id">\##{productId}</div>' +
			'			    	<div id="fistVendorId">#{vendorId}</div>' +
			'				    <div id="pricesVary" tabindex="1">#{storePrices} </div>' +
			'			    </div>' +
			'				<div id="fistColorSection">' +
			'					<h5 class="screenreader">Select Color</h5>' +
			"					<div class=\"swatchColorLabelName\"><span class=\"label\">Color: </span><span id=\"#{colorMessageId}\" class=\"name\">#{colorMessage}</span></div>" +
			"	  				<div id=\"fistColorSwatches\" class=\"productColorSwatches clearfix\">#{productSwatches}</div>" +
			'				</div>' +
			"	       </div>" +
			'			#{sizeContainer}' +
			'		</div>' +
			"	</div>" +
			"</div>"
		),
		PRODUCT_SIZE_CONTAINER: new Template(
			"<div id=\"fistProductSize\" class=\"productSizeSwatches\">" +
			"	#{dimension2}" +
			"	#{dimension1}" +
			"</div>"
		),
		PRODUCT_SIZE_LABEL: new Template(
			"<div id='sizeLabel'><span id='fistDimension#{dimension}Label' class=\"label\">#{sizeName}: </span><span id=\"fistSizeMessage#{dimension}\" class=\"name\">#{sizeMessage}</span></div>"
		),
		PRODUCT_SIZE_ALERT: new Template(
			'<div id="fistAlertDimension#{dimension}" class="fistSizeAlert" aria-live="polite">' +
			'	<div class="main" aria-label="Please select size">#{select}</div>' +
			'	<div class="arrow"></div>' +
			'</div>'
		),
		SCREEN_READER: new Template(
			'<h5 class="screenreader"> #{sizeName} </h5>')
	},

	init: function() { /* Part of the view interface */ },

	setSelectedSwatches: function(element){
		element.siblings().each(function(it){
			it.removeClassName('selected');
		});
		element.addClassName('selected');
	},

	buildProductSizeContainer: function(dimensionInfo1, dimensionInfo2) {
		return productStyleFistOverlayView.templates.PRODUCT_SIZE_CONTAINER.evaluate({
			dimension1: productStyleFistOverlayView.buildProductSizeSwatches(dimensionInfo1, 1),
			dimension2: productStyleFistOverlayView.buildProductSizeSwatches(dimensionInfo2, 2)
		});
	},
	setSizeButtonsWidth: function(div, brandMinWidth) {
		if( $(div) == null) return;

        var maxWidth = $(div).select('button').invoke('getWidth').max();
        var buttonWidth = (brandMinWidth) ? Math.max(brandMinWidth, maxWidth) : maxWidth;

        $(div).select('button').invoke('setStyle', {width: buttonWidth + 3 + 'px'});
    },
    render: function(container, model){
		var productDisplay = productStyleFistOverlayView.templates.PRODUCT_SECTION_CONTAINER_FIST.evaluate({
			productImage: productStyleFistOverlayView.getProductImage(model.styleColors.get(model.selectedStyleColorId)),
			productStyleName: model.productStyleName,
			productSwatches: productStyleFistOverlayView.buildProductStyleColorSwatches(model.styleColors, model.selectedStyleColorId),
			colorMessageId: productStyleService.constants.SWATCHES_COLOR_NAME_BASE,
			colorMessage: model.colorSwatchSelected,
			productId: model.productId,
			vendorId: model.vendorId ? '#' + model.vendorId : '',
			sizeContainer: productStyleFistOverlayView.buildProductSizeContainer(model.sizeDimensionInfo1, model.sizeDimensionInfo2),
			storePrices : resourceBundleValues.storeLocator.storePricesVary
		});

		productStyleFistOverlayView.selectedColor.imageHtml = productStyleFistOverlayView.getProductImage(model.styleColors.get(model.selectedStyleColorId));
		productStyleFistOverlayView.selectedColor.name = model.colorSwatchSelected;

		container.insert({top:productDisplay});

        productStyleFistOverlayView.setSizeButtonsWidth("fistSizeDimension1", brandProperties.MINIMUMSIZESWATCHWIDTH);
        productStyleFistOverlayView.setSizeButtonsWidth("fistSizeDimension2", brandProperties.MINIMUMSIZESWATCHWIDTH);

		productStyleFistOverlayView.attachStyleColorSwatchesMouseEvents(model.styleColors);
		productStyleFistOverlayView.attachStyleSizeSwatchesMouseEvents(model.sizeDimensionInfo1, model.sizeDimensionInfo2);
        productStyleFistOverlayView.initializeSizeAlerts([model.sizeDimensionInfo1, model.sizeDimensionInfo2]);
    },

    shouldShowColorSwatch: function(productStyleColor) {
    	if(productStyleColor.onlyAvailableOnline == undefined){
    		return productStyleColor.isInStock === 'true';
    	}
    	return productStyleColor.onlyAvailableOnline === 'false';
    },

    buildProductStyleColorSwatches: function(variantStyleColors, colorId){
		var colorSwatches = "";

		variantStyleColors.each(function(pair){
			if (productStyleFistOverlayView.shouldShowColorSwatch(pair.value)) {
				var img = pair.value.productStyleColorImages.styleColorImagesMap['S'];
				colorSwatches += productStyleFistOverlayView.templates.PRODUCT_COLOR_SWATCH.evaluate({
					swatchImagePath: img,
					colorName: pair.value.colorName,
					uniqueID: pair.key,
					selected: colorId === pair.value.businessCatalogItemId ? "selected" : ""
				});
			}
		});

		return colorSwatches;
	},

    getVariantNameForDimension: function (dimension) {
        if (dimension === 1) {
            return productStyleService.model.currentVariantName;
        }
    },

    /**
	 * SIZE Functions
	 * */
	buildProductSizeSwatches: function(sizeInfoElement, dimension){
		if (sizeInfoElement === null || !sizeInfoElement.sizeOptions || sizeInfoElement.sizeOptions === null || sizeInfoElement.sizeOptions.length === 0) {
			return '';
		}

        var sizeSwatches = "<div id='fistSizeDimension" + dimension + "'>";
        sizeSwatches += productStyleFistOverlayView.templates.SCREEN_READER.evaluate({sizeName: "Select" + sizeInfoElement.sizeDimensionLabelName});
		sizeSwatches += productStyleFistOverlayView.templates.PRODUCT_SIZE_LABEL.evaluate({
			dimension: dimension,
			sizeName: sizeInfoElement.sizeDimensionLabelName,
			sizeMessage: productStyleFistOverlayView.buildSizeMessage(sizeInfoElement.selectedIndex, sizeInfoElement.sizeOptions, this.getVariantNameForDimension(dimension))
		});
		for (var i = 0; i < sizeInfoElement.sizeOptions.length; i++) {
			sizeSwatches += productStyleFistOverlayView.templates.PRODUCT_SIZE_SWATCH.evaluate({
								dimension: dimension,
								sizeOptionId: sizeInfoElement.sizeOptions[i].sizeOptionId,
								sizeOptionName: sizeInfoElement.sizeOptions[i].sizeOptionName.replace('(', '<br/>('),
								uniqueID: i,
								selected: sizeInfoElement.selectedIndex === i ? "selected" : ""
							});
		}
		return sizeSwatches + "</div>";
	},

    isDefaultVariantName:function (variantName) {
        return variantName === productStyleService.constants.DEFAULT_VARIANT_NAME;
    },

    buildSizeMessage: function(index, sizeOptions, variantName){
		if(index > -1){
            if(variantName && !this.isDefaultVariantName(variantName)) {
			    return sizeOptions[index].sizeOptionName + " " + variantName;
            }
			return sizeOptions[index].sizeOptionName;
		}
        if(!this.isDefaultVariantName(variantName)){
            return variantName;
        }
		return "";
	},

	getProductImage : function(currentColor) {
		imgSrc = currentColor.productStyleColorImages.styleColorImagesMap.VI;
		image = productStyleFistOverlayView.templates.PRODUCT_MAIN_IMAGE.evaluate({
			productImageID: productStyleService.constants.PRODUCT_IMAGE_ID,
			src: imgSrc
		});
		return image;
	},

	// TODO: replace this with a mapping of colorId to color info
	selectedColor: {
		imageHtml: null,
		name: null
	},

	attachStyleColorSwatchesMouseEvents: function(styleColors){
		var cSwatches = $$('#fistColorSwatches input[type=image]');
		cSwatches.each(function(item){
			var styleColor = styleColors.get(item.readAttribute('uniqueId'));
			Event.observe(item, 'mouseover', productStyleFistOverlayView.eventHandlers.mouseOverColorSwatchHandler.curry(styleColor));
			Event.observe(item, 'mouseout', productStyleFistOverlayView.eventHandlers.mouseOutColorSwatchHandler.curry(styleColor));
			Event.observe(item, 'click', function(event) {
				var element = event.element();
				productStyleFistOverlayView.selectedColor.imageHtml = $('productSectionProductImage').innerHTML;
				productStyleFistOverlayView.selectedColor.name = $('colorSwatchName').innerHTML;

				productStyleFistOverlayView.setSelectedSwatches(element);
				$(productStyleService.constants.SWATCHES_COLOR_NAME_BASE).update($(element).readAttribute("alt"));

				element.fire("productStyleService:colorChange", {
					index: element.readAttribute('uniqueId'),
					colorName: $(element).readAttribute("alt")
				});
			});
		});
	},

	attachStyleSizeSwatchesMouseEvents: function(dimensionInfo1, dimensionInfo2){
		productStyleFistOverlayView.attachDimensionEvents(dimensionInfo1);
		productStyleFistOverlayView.attachDimensionEvents(dimensionInfo2);
	},
	attachDimensionEvents : function (dimensionInfo){
		var sSwatches = $$('#fistSizeDimension'+ dimensionInfo.dimension +' button[type=button]');
		var counter = 0;
		sSwatches.each(function(item){
			Event.observe(item, 'mouseover', productStyleFistOverlayView.eventHandlers.mouseOverSizeSwatchHandler.curry(dimensionInfo, counter));
			Event.observe(item, 'mouseout', productStyleFistOverlayView.eventHandlers.mouseOutSizeSwatchHandler.curry(dimensionInfo));
			Event.observe(item, 'click', productStyleFistOverlayView.eventHandlers.clickSizeSwatchHandler.curry(dimensionInfo));
			counter++;
		});
	},
	initializeSizeAlerts: function(sizeInfo) {
		var i = 1;
		sizeInfo.each(function(dimensionInfo) {
			if (dimensionInfo.sizeOptions && dimensionInfo.sizeOptions.length > 0 && (dimensionInfo.selectedIndex < 0)) {
				$('fistSizeDimension' + i).insert(productStyleFistOverlayView.templates.PRODUCT_SIZE_ALERT.evaluate({
					dimension: i,
					select: resourceBundleValues.storeLocator.select
				}));
			}
			i++;
		});
	},

	rerenderProductImage: function(currentColor) {
		var imgSrc = productStyleFistOverlayView.getProductImage(currentColor);
		$(productStyleService.constants.PRODUCT_IMAGE_ID).replace(imgSrc);
	},

	eventHandlers: {
		mouseOverColorSwatchHandler: function(styleColor, event) {
			var element = event.element();
			element.addClassName('hover');
			$(productStyleService.constants.SWATCHES_COLOR_NAME_BASE).update($(element).readAttribute("alt"));

			productStyleFistOverlayView.rerenderProductImage(styleColor);
		},

		mouseOutColorSwatchHandler: function(styleColor, event) {
			var element = event.element();
			element.removeClassName('hover');


			$(productStyleService.constants.SWATCHES_COLOR_NAME_BASE).update(productStyleFistOverlayView.selectedColor.name);
			$('productSectionProductImage').innerHTML = productStyleFistOverlayView.selectedColor.imageHtml;
		},

		mouseOverSizeSwatchHandler: function(dimensionInfo, index, event) {
			var element = event.element();
			element.addClassName('hover');
			var name = productStyleFistOverlayView.buildSizeMessage(index, dimensionInfo.sizeOptions, productStyleFistOverlayView.getVariantNameForDimension(dimensionInfo.dimension));
			$(productStyleService.constants.SWATCHES_SIZE_NAME_BASE + dimensionInfo.dimension).update(name);
		},

		mouseOutSizeSwatchHandler: function(dimensionInfo, event) {
			var element = event.element();
			element.removeClassName('hover');
			var name = productStyleFistOverlayView.buildSizeMessage(dimensionInfo.selectedIndex, dimensionInfo.sizeOptions, productStyleFistOverlayView.getVariantNameForDimension(dimensionInfo.dimension));
			$(productStyleService.constants.SWATCHES_SIZE_NAME_BASE + dimensionInfo.dimension).update(name);
		},

		clickSizeSwatchHandler: function(dimensionInfo, event) {
			var element = event.element();

			element.fire("productStyleService:sizeChange", {
				dimensionInfo: dimensionInfo,
				index: element.readAttribute('uniqueId')
			});

			productStyleFistOverlayView.setSelectedSwatches(element);
			var label = productStyleFistOverlayView.buildSizeMessage(element.readAttribute('uniqueId'), dimensionInfo.sizeOptions, productStyleFistOverlayView.getVariantNameForDimension(dimensionInfo.dimension));
			$(productStyleService.constants.SWATCHES_SIZE_NAME_BASE + dimensionInfo.dimension).update(label);

			var alert = $('fistAlertDimension' + dimensionInfo.dimension);
			if (alert) {
				alert.hide();
			}

		}
	}
};
