/* globals jQuery, Modernizr, smg */
smg.global.FamilyOptions = (function($, window, document) {
	'use strict';

	var defaults = {
		isMobile: false,
		isAccessory : false,
		comparable : true,
		ecommFlag : false,
		ecomFilter : false,
		hasMarketplaceLink : true
	}, isMobile = false, action = "", comparable = true, ecommFlag = false, ecomFilter = false, 
	hasMarketplaceLink = true,
	SELECTOR = ".customizations li[class != 'selected '] a";

	function watchImageLoad(obj){
		if(obj && obj.imageObj && obj.imageLoaderObj){
			if(obj.imageObj.height() <= 30){
				if(!obj.imageObj.hasClass("hide")){
					obj.imageObj.addClass('hide');
				}
				if(obj.imageLoaderObj.hasClass("hide")){
					obj.imageLoaderObj.removeClass('hide');
				}
			} else {
				if(obj.imageObj.hasClass("hide")){
					obj.imageObj.removeClass('hide');
				}
				if(!obj.imageLoaderObj.hasClass("hide")){
					obj.imageLoaderObj.addClass('hide');
				}
			}
		}
	}

	function familyOptionClick(event) {
		var currentUrl = $(location).attr('href');
		var $option = $(event.currentTarget);
		var prdMdlCd = getPrdMdlCd($option),
			$PRODUCT_MODULE = $option.closest(".product-module");
		var prdIaCd = !!$PRODUCT_MODULE.data("prdiacd")? $PRODUCT_MODULE.data("prdiacd"): $("input[name='prdIaCd']").val();
		ecommFlag = !!$PRODUCT_MODULE.data("special")? $PRODUCT_MODULE.data("special"): ecommFlag;
		ecomFilter = !!$PRODUCT_MODULE.data("ecomfilter")? $PRODUCT_MODULE.data("ecomfilter"): ecomFilter;
		var ecorebatesID = $PRODUCT_MODULE.find("div[id*='ecorebate']").attr("id");
		if(!!$PRODUCT_MODULE.attr("data-hasMarketLink")) {
			hasMarketplaceLink = $PRODUCT_MODULE.data("hasmarketlink");
		}
		var productData = $PRODUCT_MODULE.data("product") + "";
		if(typeof (productData) != 'undefined' && productData != 'undefined' && productData != null && productData != "") {
			if(productData == "false") {
				action = "/us/accessory/accessoryInfo.us";
			} else {
				action = "/us/product/productInfo.us";
			}
		}
		$.ajax({
			url : action,
			data : {
				prdIaCd : prdIaCd,
				mdlUrlName : prdMdlCd,
				ecommFlag : ecommFlag,
				ecomFilter : ecomFilter, 
				hasMarketplaceLink: hasMarketplaceLink
			},
			type : 'POST',
			dataType : "json",
			error : function() {
				console.log("Error happened when requesting productInfo.us width module code: " + prdMdlCd);
			},
			success : function(product) {
				var showBullets = true;
				if(comparable)
					product.comparable = "true";
				else 
					product.comparable = "false";
				if(ecorebatesID){
					product.ecorebatesID=ecorebatesID;
				}else{
					product.ecorebatesID="";
				}
				var $content = $(_.template($("#productTemplete").html(), {item : product}));
				if(currentUrl.toLowerCase().indexOf('us/shop')==-1 && product.isProduct == "false" ){
					showBullets = false;
				}
				if(!isMobile && $PRODUCT_MODULE.find(".product-title").attr("style") != undefined) {
					var index = 0;
					var end = 0;
					var $SELECTOR = $(".product-module");
					var imageLoaderObj = $content.find(".imageLoadingIndicator");
					var imageObj = $content.find("img.product-image");
					
					$SELECTOR.each(function(i){ 
						end = i;
						if($(this).data("eppmdlcd") == $PRODUCT_MODULE.data("eppmdlcd")) {
							index = i;
						}
					});

					$PRODUCT_MODULE.replaceWith($content);

					watchImageLoad({
						imageObj 		: imageObj,
						imageLoaderObj 	: imageLoaderObj
					});

					$SELECTOR = $(".product-module");
					var start = index - index % 3;
					if((start + 3) < end)
						end = start + 3;
					else 
						end++;
					var titleHeight = 0;
					var familyHeight = 0;
					var ratingHeight = 0;
					var featureHeight = 0;
					var priceHeight = 0;
					var ecorebateHeight = 0;
					var priceDescHeight = 0;
					$SELECTOR.slice(start, end).each(function() {
						var height = $(this).find(".product-title").height();
						if (height > titleHeight)
							titleHeight = height;
						height = $(this).find(".famliy-option").height();
						if (height > familyHeight)
							familyHeight = height;
						height = $(this).find(".rating").height();
						if (height > ratingHeight)
							ratingHeight = height;
						if(showBullets){
							height = $(this).find(".bullets").height();
							if (height > featureHeight)
								featureHeight = height;	
						}else{
							$(this).find(".bullets").remove();
						}
						height = $(this).find(".price-module").height();
						if (height > priceHeight)
							priceHeight = height;
						height = $(this).find(".ecorebate").height();
						if (height > ecorebateHeight)
							ecorebateHeight = height;
						height = $(this).find("#price-desc").height();
						if (height > priceDescHeight)
							priceDescHeight = height;
					});
					$SELECTOR.slice(start, end).each(function() {
						$(this).find(".product-title").css("min-height", (titleHeight));
						$(this).find(".famliy-option").css("min-height", (familyHeight));
						$(this).find(".rating").css("min-height", (ratingHeight));
						if(featureHeight > 0){
							$(this).find(".bullets").show();
							$(this).find(".bullets").css("min-height", (featureHeight));	
						}else{
							$(this).find(".bullets").hide();
						}
						$(this).find(".price-module").css("min-height", (priceHeight));
						$(this).find(".ecorebate").css("min-height", (ecorebateHeight));
						$(this).find("#price-desc").css("min-height", (priceDescHeight));
					});
					
					
				} else {
					if(!showBullets){
						$content.find(".bullets").remove();
					}
					$PRODUCT_MODULE.replaceWith($content);
				}
				
				
			}
		});
	}
	
	
	function getPrdMdlCd($option) {
		var prdMdlCd = "";
		var currentCds = $option.data("modelcds").split(",");
		if(currentCds.length > 1) {
			var $container = $option.closest(".customizations");
			var selectedCds = $container.siblings().find(".selected a").data("modelcds");
			for(var i = 0; i < currentCds.length; i++) {
				if(selectedCds.indexOf(currentCds[i]) > -1) {
					prdMdlCd = currentCds[i];
					break;
				}
			}
		} else {
			prdMdlCd = currentCds[0];
		}
		return prdMdlCd;
	}

	function init(opts) {
		var options = $.extend({}, defaults, opts);
		if(options.isAccessory) {
			action = "/us/accessory/accessoryInfo.us";
		} else {
			action = "/us/product/productInfo.us";
		}
		comparable = options.comparable;
		ecommFlag = options.ecommFlag;
		isMobile = options.isMobile;
		hasMarketplaceLink = options.hasMarketplaceLink;
		$(document).on("click", SELECTOR, familyOptionClick);
	}

	return {
		init : init,
		showProductImage : function(obj){
			var imgLoadingIndicatorObj = $(obj).closest(".product-module").find('.imageLoadingIndicator');

			if($(obj).hasClass("hide")){
				$(obj).removeClass('hide');
			}

			if(!imgLoadingIndicatorObj.hasClass("hide")){
				imgLoadingIndicatorObj.addClass("hide");
			}
		}
	};

})(jQuery, window, document);