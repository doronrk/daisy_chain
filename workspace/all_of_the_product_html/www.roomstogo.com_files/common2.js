/* schery common2.js file 7/7/2014 */

 
/*-----------------------------  global methods/bindings ----------------------------*/
 
$(function(){
	var printLink = $("a#printLink").attr("href");
	getLatestCart(null);

	/*
	setTimeout(function(){
		$('.storeLocationBlock').trigger('stop');
	}, 30000);
	*/

	if($.browser.msie && $.browser.version < 9){
		window.attachEvent("onmessage", receiveMessage);
	}else{
		window.addEventListener("message", receiveMessage, false);
	}

	$(".checkbox-select").each(function(){
		var context = $(this);
		context.val(context.attr("checkbox"));
	});

	$(".checkbox-select").live("click", function(event){
		var context = $(this);

		if(!context.attr("checkbox") == false){
			context.val(!context.attr("checkbox"));
		}else{
			context.val(" ");
		}
		context.removeClass("checkbox-select").addClass("checkbox-deselect");
	});

	$(".checkbox-deselect").live("click", function(event){
		var context = $(this);
		context.val(context.attr("checkbox"));
		context.removeClass("checkbox-deselect").addClass("checkbox-select");
	});

	$("a.topCatLinks, .subNavContainer").hover(function(event){

		var	context = $(this), linkLeftPosition = context.position().left, linkWidth = context.width(), navigationMarker = context.parent("li").find(".navigationMarker");
		var navigationMarkerPosition = ((linkLeftPosition + (linkLeftPosition + linkWidth)) / 2) - 60;
		var isIn = event.type === "mouseenter", isLink = context.hasClass("topCatLinks");

		if(isIn && isLink){
			navigationMarker.animate({ "backgroundPosition":navigationMarkerPosition + "px 0px" }, 350);
		}else{
			navigationMarker.animate({ "backgroundPosition":"0px 0px" }, 0);
		}
	});

	// if($("html[data-useragent*='iPad']" || "html[data-useragent*='iPhone']").length){ // navigation click

	// 	var previousLink = null;

	// 	$("a.topCatLinks").hover(function(event){
	// 		event.preventDefault();
	// 		event.stopPropagation();

	// 		if( $(this).next('.subNavContainer').is(":visible") ) {
	// 			if(this === previousLink) {
	// 			    window.location = $(this).attr('href');
	// 			}
	// 		}

	// 	    previousLink = this;
	// 	    return false;

	// 	});		
	// }

	chosenSelect = function() {
		if($(".chzn-select").add(".chosen-select").length){

			$(".chzn-select").add(".chosen-select").chosen();
			$("div.chzn-container ul").add("div.chosen-container ul").attr("tabindex",-1);
			$(".chzn-select-deselect").add(".chosen-select-deselect").chosen({ allow_single_deselect:false });
		}
	}

	bedroomMattress = function() {
		// for bedrooms and mattresses that have pulldown
		if($(".chzn-select-nosearchbox").add(".chosen-select-nosearchbox").length){

			$(".chzn-select-nosearchbox").add(".chosen-select-nosearchbox").chosen();
			$(".chzn-search").add(".chosen-search").hide();
			$("div.chzn-container ul").add("div.chosen-container ul").attr("tabindex",-1);
			$(".chzn-select-deselect").add(".chosen-select-deselect").chosen({ allow_single_deselect:false });
		}
	}

	if($.browser.msie){
		if($.browser.version > 8){
			try{

				chosenSelect();
				// for bedrooms and mattresses that have pulldown
				bedroomMattress();
				
			}catch(exception){ /* do nothing */ }
		}
	}else{
		try{

			chosenSelect();
			// for bedrooms and mattresses that have pulldown
			bedroomMattress();

		}catch(exception){ /* do nothing */ }
	}

/*-----------------------------  modal trigger/bind methods ----------------------------*/
   // moved to common.js

/*-----------------------------  header methods ----------------------------*/
	if($("#wrongRegion").length){
		$(".changeLocation").trigger("click");
	}

	$("#atg_store_searchInput").bind("keyup", function(event){
		if(!event.which && ((originalEvent.charCode || originalEvent.charCode === 0) ? event.charCode : event.keyCode)){
			event.which = originalEvent.charCode || event.keyCode;
		}

		if(event.which == 13){
			$("#atg_b2cstore_search").trigger("click");
		}

		return false;
	});

	$("#atg_store_changeLocationForm .addressFormInput").bind("keyup", function(event){
		if(!event.which && ((originalEvent.charCode || originalEvent.charCode === 0) ? event.charCode : event.keyCode)){
			event.which = originalEvent.charCode || event.keyCode;
		}

		if(event.which == 13){
			$(".changeButtonSubmit").trigger("click");
		}

		return false;
	});

	$(".miniCartLink").bind("click", function(event, extra){
		var context = $(this), linkPosition = context.position(), miniCartLinkHeight = context.outerHeight();

		if(context.hasClass("disabled"))
			return false;

		// GOOGLE ANALYTICS

		if(event.originalEvent !== undefined){
			if( $(".miniCartLink").bind("click"))	{
				if( $("#miniCartModal").is(":hidden")){
					gaEvent("ClickOnMiniCartLink");
				}
			}
		}

		if( $("#miniCartModal").is(":visible")){
			gaEvent("ClickAndCloseMiniCart");
		}
		// END GOOGLE ANALYTICS
		if($("#miniCartModal :hidden")){
			context.toggleClass("miniCartOpened");
			$("#miniCartModal").css( { "top":(linkPosition.top + miniCartLinkHeight), "left":linkPosition.left, "margin-left":"-271px" } );
			var cartCallback = function(){
				if(extra == "addtocart"){
					$(".miniCartOpened").toggleClass("disabled");
					setTimeout(
					function(){
						$(".miniCartOpened").toggleClass("disabled");
						//animateCart();
					}, 0);
				}
			};
			getLatestCart(cartCallback);
			animateCart();
		}
		return false;
	});




/*-----------------------------  category/search page methods ----------------------------*/
	

	$(".productsPerPage").bind("click", function(){
		var	context = $(this), pageSize = context.attr("title"), searchQuestion = context.attr("rel");
		
	});

	if($("#categoryChangerCategoryId").length){
		var	categoryId = $("#categoryChangerCategoryId").val();
		if($(".itemType").length){
			$(".activeCategoryTypeChangerTab .tabLink").load("/browse/gadgets/getTabCount.jsp?categoryType=0&groupProducts=false&categoryId=" + categoryId);
			$(".inactiveCategoryTypeChangerTab .tabLink").load("/browse/gadgets/getTabCount.jsp?categoryType=1&groupProducts=true&categoryId=" + categoryId);
		};
		if($(".roomType").length){
			$(".inactiveCategoryTypeChangerTab .tabLink").load("/browse/gadgets/getTabCount.jsp?categoryType=0&groupProducts=false&categoryId=" + categoryId);
			$(".activeCategoryTypeChangerTab .tabLink").load("/browse/gadgets/getTabCount.jsp?categoryType=1&groupProducts=true&categoryId=" + categoryId);
		};
	};

	$(".autoCompleteFormContainer form").bind("submit", function(){
		$(this).children(".autoCompleteSearch").trigger("click");
		return false;
	});

	$(".autoCompleteFormContainer .autoCompleteSearch").bind("click", function(){
		var refinement = $.trim($(this).prev(".autoCompleteInput").val());
		var refinementParent = $.trim($(".autoCompleteSearch").parents(".atg_store_facetsGroup").attr("id").split("_")[1]);
		var refinementAnchor = $('#facetoptions_' + refinementParent + ' ul li a:contains("' + refinement + '")');

		if(refinementAnchor.length){
			window.location = refinementAnchor.attr("href");
		}else{
			$("#facetoptions_" + refinementParent + " ul li a").each(function(){
				var	context = $(this),
				innerText = context.text(),
				matchText = new RegExp(refinement, "i");

				if(matchText.test(innerText)){
					window.location = context.attr("href");
				};
			});
		};
		return false;
	});


	$(".facetBlock .sbFirst").bind("click", function(event){
		var context = $(this), isExpanded = context.hasClass("expanded");
		if(isExpanded){
			context.next(".facetContainerExpanded").removeClass("facetContainerExpanded").addClass("facetContainer");
		}else{
			context.next('.facetContainer').removeClass('facetContainer').addClass('facetContainerExpanded');
		};
		context.toggleClass('expanded', !isExpanded);
		return false;
	});

	$('.facetBlock .atg_store_categoryCurrent').bind('click', function(event){
		var context = $(this), isExpanded = context.hasClass('expanded');
		if(isExpanded){
			context.next('.atg_store_facetsGroup_options_catsubExpanded').removeClass('atg_store_facetsGroup_options_catsubExpanded').addClass('atg_store_facetsGroup_options_catsub');
		}else{
			context.next('.atg_store_facetsGroup_options_catsub').removeClass('atg_store_facetsGroup_options_catsub').addClass('atg_store_facetsGroup_options_catsubExpanded');
		};
		context.toggleClass('expanded', !isExpanded);
		return false;
	});

/*-----------------------------  product page methods ----------------------------*/
	if($(".atg_store_pageProductDetail").length){
		$(window).load(function(){
			loadFacebookWidget();
		});

		$(window).resize(function(){
			loadFacebookWidget();
		});
	};

	if($(".atg_store_pageProductDetail").length){
		$(["/static/img/buttons/add-to-cart-animated.gif"]).preload();
	};

	if($("#cartItemAdded").length){
		$(".miniCartLink").triggerHandler("click", "addtocart");
	};

	if($("ul.tabs").length){
		$("ul.tabs").tabs("div.panes > div");
	};

	$("a.current").live("click", function(){
		var context = $(this);
		$("li.current").toggleClass("current");
		context.parent().toggleClass("current");
		return true;
	});

	$(".roomCustomizer legend").bind("click", function(){
		var	context = $(this);
		if(!context.parents(".roomCustomizer").hasClass("disabled")){
			context.next(".customizerContainer").slideToggle("slow");
		};
	});

	if($("#sizeSelector").length){
		$("#sizeSelector").chosen().change(function(){
			var productUrl = $(this).val();
			if(productUrl.match(/http/)){
				window.location = productUrl;
			};
		});
	};

	$("roomCustomizer legend").bind("click", function(){
		$(this).next(".customizerContainer").slideToggle("slow");
	});

	$(".changeableRoomSet").each(function(){
		var	context = $(this),
		numberProductsInSet = context.find(".changeableProductListConfigure").length;

		if(numberProductsInSet > 7){
			var	nextButton = $('<div class="nextButton" />'),
			previousButton = $('<div class="previousButton" />');

			context.scrollable();
			context.parents(".roomSetProductsContainer").append(previousButton),
			context.parents(".roomSetProductsContainer").append(nextButton);

			$(".roomSetProductsContainer .nextButton").live("click", function(){
				var	scrollable = context.data("scrollable");
				count = scrollable.getIndex() + 1;
				if(numberProductsInSet - count < 7){ return false; };
				scrollable.next();
			});

			$(".roomSetProductsContainer .previousButton").live("click", function(){
				context.data("scrollable").prev();
			});
		}
	});

/*-----------------------------  configurator/swappable/filler methods ----------------------------*/
	$(".selectSubSku").bind("click", function(){
		var	context = $(this), targetId = context.attr("href"), productData = context.attr("rev"), skuData = context.attr("rel"), productInputTarget = $(targetId + "_Product"), skuInputTarget = $(targetId + "_Sku");

		productInputTarget.val(productData);
		skuInputTarget.val(skuData);
	});

	$(".changeableProductListConfigure a").bind("click", function(){
		var context = $(this);

		context.parents(".roomConfiguratorRow").find(".selectRoomContainer").animate({ "height":"226px" }, 750);
		context.parents(".roomSetContainer").animate({ "height":"226px" }, 750, function(){
			context.parents(".roomSetContainer").find(".availableProductsList").fadeIn(750);
		});

		return false;
	});

	$("a.selected").live("click", function(){
		return false;
	});

	if($("#originalProductTeam").length && $("#originalProductTeam").val().trim() != ""){
		$("a#printLink").attr("href", printLink+"&teamName="+$("#originalProductTeam").val());
	};

	$(".substitutionSelection").click(function(index, event){
		var	context = $(this),
			contextParent = context.parents(".availableProductsList .centerBlockContainer"),
			directParent = context.parents(".availableProductContainer"),
			selectedProduct = contextParent.find(".selected"),
			isSelected = context.hasClass("selected"),
			productId = context.attr("rel"),
			targetReference = context.attr("href"),
			target = $(targetReference),
			contextImage = context.attr("rev"),
			contextTarget = $('a[rev=' + context.attr('href').replace("#", "") + ']'),
			targetImage = contextTarget.find("img"),
			priceChange = parseFloat(context.attr("res")),
			originalReference = context.attr("ref"),
			originalImage = $("#originalImage_" + originalReference),
			originalImageSource = $("#originalImage_" + originalReference).val(),
			originalDimensionalImage = $("#originalDimensionalImage_" + originalReference),
			originalDimensionalImageSource = $("#originalDimensionalImage_" + originalReference).val(),
			originalProductDescription = $("#originalDescription_" + originalReference),
			contextualDimensionalImageSource = context.attr("rep"),
			contextProductUrl = directParent.find(".productUrl").val(),
			contextProductDescription = directParent.find(".productDescription").val(),
			contextProductDimensions = directParent.find(".productDimensions").val(),
			contextProductName = directParent.find(".productName").val(),
			contextSkuNumber = directParent.find(".productSkuNumber").val(),
			contextIdNumber = directParent.find(".productId").val(),
			contextProductTeamName = directParent.find(".productTeamName").val(),
			isFiller = $("#isFiller").length,
			teamName = (isFiller) ? contextImage.substring(contextImage.toLowerCase().lastIndexOf("_") + 1, contextImage.toLowerCase().lastIndexOf("?")) : null;
			
			$("a#printLink").attr("href", printLink+"&teamName="+teamName);

		if(isSelected){
			return false;
		}

		selectedProduct.each(function(){
			$(this).removeClass("selected");
			$(this).removeClass("inactiveSelectAvailableProduct");
		});

		directParent.find(".selectAvailableProduct").each(function(){
			$(this).addClass("selected");
			$(this).addClass("inactiveSelectAvailableProduct");
		});

		target.val(productId);

		var	newImageSource = contextImage.match(/.*\?/)[0];


		targetImage.fadeOut(500, function(){
			if(teamName != null){

				$(".seeInStore").each(function(){
					$(this).attr("data-js", teamName);
				});

				var originalProductTeam = $("#originalProductTeam").val();
				//alert(" originalProductTeam = " + originalProductTeam);
				$(".fillerImage").each(function(){
					var	context = $(this);
					context.attr("alt", teamName);
					var skuArr = context.attr("src").match(/_\d{1,}p{0,1}\?/i),
						productImageSrc = $('#productImage').attr("src"),
						includedInThisRoom = $('#includedInThisRoom');

					if(skuArr == null ){
						if(originalProductTeam != undefined && context.attr("src").indexOf(originalProductTeam) > -1){
							context.attr("src", context.attr("src").replace(/_[^_]+\?/, "_" + teamName + "?"));
						}
					}

					$(includedInThisRoom).attr("rel",productImageSrc);
				});

				$(".fillerValue").each(function(){
					var	context = $(this);

					context.val(context.val().replace(/_[^_]+\?/, "_" + teamName + "?"));
					$([context.val()]).preload();
				});

				$(".fillerLink").each(function(){
					var	context = $(this),
					originalTeam = context.attr("rel").match(/_[^_]+$/)[0];

					context.attr("rel", context.attr("rel").replace(originalTeam, "_" + teamName));
				});

				targetImage.attr("alt", teamName);
				$("#originalProductTeam").val(teamName);
			}

			if(originalDimensionalImageSource != ''){
				$('[src*="' + originalDimensionalImageSource + '"]').each(function(){
					var	context = $(this),
					newContextSource = contextualDimensionalImageSource + "?$PDP_Pc_Dimension_470Wide$";

					context.attr("src", newContextSource);
					context.parents("tr").next(".dimensionsRow").find(".dimensionCell p").text(contextProductDimensions);
				});
			}

			$('[src*="' + originalImageSource + '"]').each(function(){
				var	context = $(this),
				contextSource = context.attr("src"),
				newContextSource = contextSource.replace(/.*\?/, newImageSource);

				if(!context.parents(".substitutionSelection").length && !context.parents(".roomConfiguratorContainer").length){
					context.attr("src", newContextSource);
				}

				if(context.parents(".imageCell").length){
					context.parents(".imageCell").next("td").find("p").html(contextProductDescription);
					context.parents(".imageCell").next("td").find(".tabDetailsButton").attr("href", contextProductUrl);
					context.parents(".imageCell").next("td").find(".seeInStore").attr("rel", contextIdNumber);
				}

				if(isFiller)
					context = $(".pageFillerImage");

				if(context.parents(".loadConfigurableSet").length){
					context.parents(".loadConfigurableSet").next(".productNameBlock").find(".productName").text(contextProductName);
					context.parents(".loadConfigurableSet").next(".productNameBlock").find(".skuName").text(contextSkuNumber);
				}
			});

			$('[value*="' + originalImageSource + '"]').each(function(){
				var	context = $(this),
				contextSource = context.val(),
				newContextSource = contextSource.replace(/.*\?/, newImageSource);
				$([context.val()]).preload();
			});

			$('[rel*="' + originalImageSource.replace(/\?/, "") + '"]').each(function(){
				var	context = $(this),
				contextSource = context.attr("rel");

				context.attr("rel", newImageSource.replace(/\?/, ""));
			});

			$('[rev*="' + targetReference + '"]').each(function(){
				var	context = $(this);

				context.attr("rev", newImageSource.replace(/\?/, ""));
			});

			targetImage.fadeIn(500);

			// var	wishListButton = $("#addToWishlistSubmit");

			// wishListButton.unbind("click");
			// wishListButton.val("Reload Page to Add to Wishlist");
			// wishListButton.attr("title", "Unable to add custom products to wishlist.");

			// wishListButton.bind("click", function(){
			// 	window.location.reload();
			// 	return false;
			// });
		});

		originalImage.val(newImageSource);
		originalDimensionalImage.val(contextualDimensionalImageSource);
		originalProductDescription.val(contextProductDescription);

		var	originalBuyTheRoom = $("#originalBuyTheRoomPrice"),
			buyTheRoom = $("#buyTheRoomPrice"),
			totalSavingsContainer = $("#totalSavingContainer"),
			originalTotalSavings = $("#originalTotalSavingsValue"),
			totalSavings = $("#totalSavingsValue"),
			baseBuyTheRoomPrice = parseFloat($("#baseBuyTheRoomPrice").val()),
			soldSepartelyPriceContainer = $("#soldSepartelyPrice"),
			soldSepartelyPrice = parseFloat($("#soldSepartelyPriceValue").val());

		if(originalBuyTheRoom.val() != undefined){
			var	buyTheRoomText = $.trim(originalBuyTheRoom.val().replace("$", "").replace(/,/gi, "")),
				totalSavingsText = $.trim(originalTotalSavings.val().replace("$", "").replace(/,/gi, "")),
				buyTheRoomPrice = parseFloat(buyTheRoomText),
				totalSavingsValue = parseFloat(totalSavingsText),
				newBuyTheRoomPrice = (buyTheRoomPrice + (priceChange)),
				newTotalSavingsValue = (soldSepartelyPrice - newBuyTheRoomPrice);

			$("#originalBuyTheRoomPrice").val(newBuyTheRoomPrice);
			buyTheRoom.text("$" + newBuyTheRoomPrice.formatCurrency(2, ".", ","));
		}

		if(newTotalSavingsValue > 49){
			totalSavings.text("$" + newTotalSavingsValue.formatCurrency(2, ".", ","));
			totalSavingsContainer.css( { "visibility":"visible" } );
			soldSepartelyPriceContainer.css( { "visibility":"visible" } );
		}
		else{
			totalSavingsContainer.css( { "visibility":"hidden" } );
			soldSepartelyPriceContainer.css( { "visibility":"hidden" } );
		}

		contextParent.find(".substitutionSelection").each(function(){
			var	currentAvailableProduct = $(this);

			if(currentAvailableProduct.hasClass("selected")){
				currentAvailableProduct.attr("res", "+0.00");
				currentAvailableProduct.prev("span").text("+ $0.00");
			}
			else{
				if(currentAvailableProduct.attr("res") != ""){
					var	currentPriceChange = parseFloat(currentAvailableProduct.attr("res"));

					if(priceChange < currentPriceChange && priceChange < 0){
						newPriceChange = Math.abs(priceChange) + currentPriceChange;
					}
					else if(priceChange < currentPriceChange && priceChange > 0){
						newPriceChange = currentPriceChange - priceChange;
					}
					else if(priceChange > currentPriceChange && priceChange < 0){
						newPriceChange = Math.abs(priceChange) + currentPriceChange;
					}
					else if(priceChange > currentPriceChange && priceChange > 0){
						newPriceChange = currentPriceChange - priceChange;
					}
					else if(priceChange == currentPriceChange){
						newPriceChange = 0.00;
					}

					if(newPriceChange < 0){
						currentAvailableProduct.attr("res", (newPriceChange).formatCurrency(2, ".", ","));
						currentAvailableProduct.prev("span").text("- $" + (-1 * newPriceChange).formatCurrency(2, ".", ","));
					}
					else if(newPriceChange > 0){
						currentAvailableProduct.attr("res", (newPriceChange).formatCurrency(2, ".", ","));
						currentAvailableProduct.prev("span").text("+ $" + (newPriceChange).formatCurrency(2, ".", ","));
					}
					else if(newPriceChange == 0){
						currentAvailableProduct.attr("res", "+0.00");
						currentAvailableProduct.prev("span").text("+ $0.00");
					}
				}
			}
		});

		$(this).parents(".modalWindow").find("a.close").trigger("click");

		// Reloading Matching products area during swap
		var matchingProductsDivId = "#matchingProductsDiv";
		var swapProductIdQueryStr = "productId="+$("#swapProductId").val();
		var swapCategoryIdQueryStr = "&categoryId="+$("#swapCategoryId").val();
		var swapWrongRegionQueryStr = "&wrongRegion="+$("#swapWrongRegion").val();
		var swapNavLinkActionQueryStr = "&navLinkAction="+$("#swapNavLinkAction").val();
		var swapCategoryNavIdsQueryStr = "&categoryNavIds="+$("#swapCategoryNavIds").val();
		var swapCategoryNavQueryStr = "&categoryNav="+$("#swapCategoryNav").val();
		var swapSearchClickIdQueryStr = "&searchClickId="+$("#swapSearchClickId").val();
		//var teamNameQueryStr = "&teamName="+teamName;
		if(contextProductTeamName != null){
			contextProductTeamName= contextProductTeamName.replace(/ /g, "_");
			contextProductTeamName= contextProductTeamName.replace(/&/g, "#");
		}
		var productTeamNameQueryStr = "&teamName="+contextProductTeamName;
		var url = "/browse/templates/matchingProducts.jsp?"+swapProductIdQueryStr+swapCategoryIdQueryStr+swapWrongRegionQueryStr+swapNavLinkActionQueryStr+swapCategoryNavIdsQueryStr+swapCategoryNavQueryStr+swapSearchClickIdQueryStr+productTeamNameQueryStr;
		$(matchingProductsDivId).load(url);

		// Reloading Upgrade room area during swap
		var seeInRoomDivId = "#seeInRoomDiv";
		swapProductIdQueryStr = "productId="+$("#seeInRoomProductId").val();
		var swapSkuIdQueryStr = "&skuId="+$("#seeInRoomSkuId").val();
		var swapRegionQueryStr = "&region="+$("#seeInRoomRegion").val();
		swapWrongRegionQueryStr = "&wrongRegion="+$("#seeInRoomWrongRegion").val();
		swapNavLinkActionQueryStr = "&navLinkAction="+$("#seeInRoomNavLinkAction").val();
		swapCategoryNavIdsQueryStr = "&categoryNavIds="+$("#seeInRoomCategoryNavIds").val();
		swapCategoryNavQueryStr = "&categoryNav="+$("#seeInRoomCategoryNav").val();
		swapSearchClickIdQueryStr = "&searchClickId="+$("#seeInRoomSearchClickId").val();
		productTeamNameQueryStr = "&teamName="+contextProductTeamName;
		var fillerImageTeamNameQueryStr = "&fillerImageTeamName="+teamName;
		url = "/browse/templates/seeInRoom.jsp?"+swapProductIdQueryStr+swapSkuIdQueryStr+swapRegionQueryStr+swapWrongRegionQueryStr+swapNavLinkActionQueryStr+swapCategoryNavIdsQueryStr+swapCategoryNavQueryStr+swapSearchClickIdQueryStr+productTeamNameQueryStr+fillerImageTeamNameQueryStr;
		$(seeInRoomDivId).load(url);

		return true;
	});


/*-----------------------------  cart/wishlist methods ----------------------------*/

/*-----------------------------  promotional slider methods ----------------------------*/




/*-----------------------------  giftcard page methods ----------------------------*/
	$(".triggerGiftcardUpdate").bind("blur", function(){
		var subTotal = 0;
		var quan50 = Math.round($("#giftCardPurchaseInput-50-Quantity").val());

		if(quan50 && isNaN(quan50)){
			$("#giftCardPurchaseInput-50-Quantity").val("1");
			subTotal += $("#giftCardPurchaseInput-50-Quantity").attr("multiplier") * 1;
		}else if(quan50 && quan50 < 1){
			$("#giftCardPurchaseInput-50-Quantity").val("1");
			subTotal += $("#giftCardPurchaseInput-50-Quantity").attr("multiplier") * 1;
		}else if(quan50){
			$("#giftCardPurchaseInput-50-Quantity").val(quan50);
			subTotal += $("#giftCardPurchaseInput-50-Quantity").attr("multiplier") * quan50;
		};

		var quan100 = Math.round($("#giftCardPurchaseInput-100-Quantity").val());
		if(quan100 && isNaN(quan100)){
			$("#giftCardPurchaseInput-100-Quantity").val("1");
			subTotal += $("#giftCardPurchaseInput-100-Quantity").attr("multiplier") * 1;
		}else if(quan100 && quan100 < 1){
			$("#giftCardPurchaseInput-100-Quantity").val("1");
			subTotal += $("#giftCardPurchaseInput-100-Quantity").attr("multiplier") * 1;
		}else if(quan100){
			$("#giftCardPurchaseInput-100-Quantity").val(quan100);
			subTotal += $("#giftCardPurchaseInput-100-Quantity").attr("multiplier") * quan100;
		};

		var quan500 = Math.round($("#giftCardPurchaseInput-500-Quantity").val());
		if(quan500 && isNaN(quan500)){
			$("#giftCardPurchaseInput-500-Quantity").val("1");
			subTotal += $("#giftCardPurchaseInput-500-Quantity").attr("multiplier") * 1;
		}else if(quan500 && quan500 < 1){
			$("#giftCardPurchaseInput-500-Quantity").val("1");
			subTotal += $("#giftCardPurchaseInput-500-Quantity").attr("multiplier") * 1;
		}else if(quan500){
			$("#giftCardPurchaseInput-500-Quantity").val(quan500);
			subTotal += $("#giftCardPurchaseInput-500-Quantity").attr("multiplier") * quan500;
		};

		var quan1000 = Math.round($("#giftCardPurchaseInput-1000-Quantity").val());
		if(quan1000 && isNaN(quan1000)){
			$("#giftCardPurchaseInput-1000-Quantity").val("1");
			subTotal += $("#giftCardPurchaseInput-1000-Quantity").attr("multiplier") * 1;
		}else if(quan1000 && quan1000 < 1){
			$("#giftCardPurchaseInput-1000-Quantity").val("1");
			subTotal += $("#giftCardPurchaseInput-1000-Quantity").attr("multiplier") * 1;
		}else if(quan1000){
			$("#giftCardPurchaseInput-1000-Quantity").val(quan1000);
			subTotal += $("#giftCardPurchaseInput-1000-Quantity").attr("multiplier") * quan1000;
		};

		var otherQuan = Math.round($("#giftCardPurchaseInput-Other-Quantity").val());
		if(otherQuan && isNaN(otherQuan)){
			$("#giftCardPurchaseInput-Other-Quantity").val("1");
			subTotal += $(".customAmount").val() * 1;
		}else if(otherQuan && otherQuan < 1){
			$("#giftCardPurchaseInput-Other-Quantity").val("1");
			subTotal += $(".customAmount").val() * 1;
		}else if(otherQuan && (!isNaN(otherQuan) || otherQuan < 1)){
			$("#giftCardPurchaseInput-Other-Quantity").val(otherQuan);
			subTotal += $(".customAmount").val() * otherQuan;
		};

		$(".giftcardSubtotal").text("$" + subTotal);
	});

	$("#addToCartButton").live("click", function(){
		var quan50 = $("#giftCardPurchaseInput-50-Quantity").val();
		if(!quan50){
			$("#giftCardPurchaseInput-50-hidden-Quantity").val(0);
		}else{
			$("#giftCardPurchaseInput-50-hidden-Quantity").val(quan50);
		};

		var quan100 = $("#giftCardPurchaseInput-100-Quantity").val();
		if(!quan100){
			$("#giftCardPurchaseInput-100-hidden-Quantity").val(0);
		}else{
			$("#giftCardPurchaseInput-100-hidden-Quantity").val(quan100);
		};

		var quan500 = $("#giftCardPurchaseInput-500-Quantity").val();
		if(!quan500){
			$("#giftCardPurchaseInput-500-hidden-Quantity").val(0);
		}else{
			$("#giftCardPurchaseInput-500-hidden-Quantity").val(quan500);
		};

		var quan1000 = $("#giftCardPurchaseInput-1000-Quantity").val();
		if(!quan1000){
			$("#giftCardPurchaseInput-1000-hidden-Quantity").val(0);
		}else{
			$("#giftCardPurchaseInput-1000-hidden-Quantity").val(quan1000);
		};

		var otherQuan = $("#giftCardPurchaseInput-Other-Quantity").val();
		if(!otherQuan){
			$("#giftCardPurchaseInput-Other-Quantity").val(0);
		};

		var otherAmount = $("#giftCardPurchaseInput-Other-Amount").val();
		if(!otherAmount){
			$("#giftCardPurchaseInput-Other-Amount").val(0);
		};
	});

	$("#giftCardPurchaseInput-Other-Amount").bind("blur", function(){
		var isWhole_re = /^\s*\d+\s*$/;

		function isWhole(s){
			return String(s).search(isWhole_re) != -1;
		};

		function getdigits(s){
			return s.replace(/[^\d]/g, "");
		};

		var otherAmount = $("#giftCardPurchaseInput-Other-Amount").val();

		if(otherAmount && (otherAmount < 25 || isNaN(otherAmount))){
			$("#giftCardPurchaseInput-Other-Amount").val(25);
		}else if(!isWhole(otherAmount)){
			$("#giftCardPurchaseInput-Other-Amount").val(Math.round(otherAmount));
		};

		$(".triggerGiftcardUpdate").trigger("blur");
	});

	$("#addToCartButton").bind("click", function(){
		var otherAmount = $("#giftCardPurchaseInput-Other-Amount").val();

		if(!otherAmount){
			$("#giftCardPurchaseInput-Other-Quantity").val(0);
		};
	});

/*-----------------------------  account/profile page methods ----------------------------*/
	if($(".strengthMeter").length){
		passwordStrength($("#password"), $("#confirmPassword"), $(".confirmationMessage"));
	};

	$("body.sc_searchResults .blueContainer").click(function(){
		var gotoUrl = $("body.sc_searchResults .viewResults > a").attr("href");
		window.location = gotoUrl;
	});//end search box click


}); // End of ready wrapper /*********************************************************************************************************** end dom ready*/

/*-----------------------------  background animation code ----------------------------*/

$(function(){
	if(!document.defaultView || !document.defaultView.getComputedStyle){
		var oldCurCSS = $.curCSS;

		$.curCSS = function(elem, name, force){
			if(name === "background-position"){
				name = "backgroundPosition";
			};

			if(name !== "backgroundPosition" || !elem.currentStyle || elem.currentStyle[ name ]){
				return oldCurCSS.apply(this, arguments);
			};

			var style = elem.style;
			if(!force && style && style[name]){
				return style[name];
			};

			return oldCurCSS(elem, "backgroundPositionX", force) +" "+ oldCurCSS(elem, "backgroundPositionY", force);
		};
	}

	var oldAnim = $.fn.animate;

	$.fn.animate = function(prop){
		if('background-position' in prop){
			prop.backgroundPosition = prop['background-position'];
			delete prop['background-position'];
		};

		if('backgroundPosition' in prop){
			prop.backgroundPosition = '('+ prop.backgroundPosition;
		};

		return oldAnim.apply(this, arguments);
	};

	function toArray(strg){
		strg = strg.replace(/left|top/g,'0px');
		strg = strg.replace(/right|bottom/g,'100%');
		strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");

		var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);

		return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
	}

	$.fx.step. backgroundPosition = function(fx){
		if(!fx.bgPosReady){
			var start = $.curCSS(fx.elem, "backgroundPosition");

			if(!start){
				// FF2 no inline-style fallback
				start = "0px 0px";
			}

			start = toArray(start);
			fx.start = [start[0],start[2]];
			var end = toArray(fx.end);
			fx.end = [end[0],end[2]];

			fx.unit = [end[1],end[3]];
			fx.bgPosReady = true;
		}

		//return;
		var nowPosX = [];

		nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
		nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
		fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
	};

	if($("body").hasClass("atg_store_pageProductDetail")){
		setMediaButtons();
	};

});//end dom






/* Mattress Configurator Scripts Start */
function setMattressAddToCartParam(option, value){
	$("#" + option).val(value);
};//end setMattressAddToCartParam

$(document).on("change", "input[name='chosenMattressProduct']", function(){
	var productId = $(this).val();
	if(productId.indexOf("P") > 0){
		setMattressAddToCartParam("mattressConfigurableCartCatalogRefId", $(this).val());
		setMattressAddToCartParam("mattressConfigurableCartProductId", $(this).val());
		setMattressAddToCartParam("addToCartSubmitAction", "config-cart-submit.jsp");
	}else{
		setMattressAddToCartParam("mattressCartCatalogRefId", $(this).val());
		setMattressAddToCartParam("mattressCartProductId", $(this).val());
		setMattressAddToCartParam("addToCartSubmitAction", "cart-submit.jsp");
	}
});

$(document).on("change", ".mattressAddOnCheckbox", function(){
	var mattressAddOnId = $(this).val();
	var mattressAddOnSelected =$(this).is(":checked") ? "true" : "false";
	var addOnMattressVar = ".addOns." + mattressAddOnId;

	$('input[name*="'+addOnMattressVar+'"]').val(mattressAddOnSelected);
});
/* Mattress Configurator Scripts End */


$(function(){ // Scrollable widget with Zoomer

	var includedProducts = $('.includedProducts'),
		thumbnailScroller = $('.thumbnailScroller'),
		scrollLeft = $('.scrollLeft'),
		scrollRight = $('.scrollRight'),
		scrollerWrapper = $('#scrollerWrapper'),
		itemsWrap = $(scrollerWrapper).find('.items'),
		selectPhoto = $(itemsWrap).find('#selectPhoto'),
		optionsSize = $(itemsWrap).find('.optionsSize'),
		alternateImageFieldset = $(selectPhoto).find('.alternateImageFieldset'),
		alternateImageInput = $(alternateImageFieldset).find('input');

	$(alternateImageInput).each(function(){
		var	context = $(this);
		$([context.val()]).preload();
	});

	function multiScroll(selector, scrollerSelector, options, msObject, multiScrollParent){
		this.selector = selector;
		this.scrollerSelector = scrollerSelector;
		this.scrollers = new Array();
		this.options = options;
		this.msObject = (arguments[3] != null) ? msObject : null;
		this.multiScrollParent = (arguments[4] != null) ? multiScrollParent : null;
		this.scrollerMarkup = "";

		this.createRowOptions = function createRowOptions(options){
			var rowOptions = "";

			if(options.circular != null){
				rowOptions += (rowOptions != "") ? ', "circular":' + options.circular : '"circular":' + options.circular;
			}else{
				rowOptions += (rowOptions != "") ? ', "circular":false' : '"circular":false';
			}

			if(options.autoplay != null){
				rowOptions += (rowOptions != "") ? ', "autoplay":' + options.autoplay : '"autoplay":' + options.autoplay;
			}else{
				rowOptions += (rowOptions != "") ? ', "autoplay":false' : '"autoplay":false';
			}

			if(options.autopause != null){
				rowOptions += (rowOptions != "") ? ', "autopause":' + options.autopause : '"autoplay":' + options.autopause;
			}else{
				rowOptions += (rowOptions != "") ? ', "autopause":false' : '"autopause":false';
			}

			if(options.steps != null){
				rowOptions += (rowOptions != "") ? ', "steps":' + options.steps : '"steps":' + options.steps;
			}else{
				rowOptions += (rowOptions != "") ? ', "steps":1' : '"steps":1';
			}

			if(options.interval != null){
				rowOptions += (rowOptions != "") ? ', "interval":' + options.interval : '"interval":' + options.interval;
			}else{
				rowOptions += (rowOptions != "") ? ', "interval":1000' : '"interval":1000';
			}

			if(options.mixedTyped != null){
				rowOptions += (rowOptions != "") ? ', "mixedTyped":' + options.mixedTyped : '"mixedTyped":' + options.mixedTyped;
			}else{
				rowOptions += (rowOptions != "") ? ', "mixedTyped":false' : '"mixedTyped":false';
			}

			return $.parseJSON('{' + rowOptions + '}');
		}

		this.initializeRows = function initializeRows(rowOptions, parentSelector){
			this.scrollerItemWidth = 0;
			this.scrollerItemHeight = 0;
			this.rowOptions = rowOptions;
			this.mixedType = false;
			this.scroller = null;

			var scrollerRow = this;

			$(parentSelector.scrollerSelector).each(function(){
				var scrollerId = $(this).attr('id');
				var rowOptionsObject = parentSelector.createRowOptions(rowOptions);
				var viewableItems = 4;
				var	thisNext = $(parentSelector.scrollerSelector).find('scrollRight');

				if(scrollerId != ""){
					$(this).scrollable({
						circular:rowOptionsObject.circular,
						onSeek: function(){
							if(this.getIndex() >= (this.getSize() - viewableItems)){
								thisNext.addClass('disabled');
							}
						},
						onBeforeSeek: function(event, index){
							if(this.getIndex() >= (this.getSize() - viewableItems)){
								if(index > this.getIndex()){
									return false;
								}
							}
						}
					}).autoscroll({
						autoplay:rowOptionsObject.autoplay,
						autopause:rowOptionsObject.autopause,
						steps:rowOptionsObject.steps,
						interval:rowOptionsObject.interval
					});

					this.mixedType = options.mixtedType;

					scrollerRow.scroller = this;
					parentSelector.scrollers[parentSelector.scrollers.length] = scrollerRow;

					//var api = $(this).data("scrollable");
					//this.scrollerItemWidth = api.getItems().first().outerWidth();
					//this.scrollerItemheight = api.getItems().first().outerHeight();
				}
			});

			//$(parentSelector.scrollerSelector).length * this.scrollerItemWidth
		}

		if($(this.selector).length){
			var createMultiScroll = new this.initializeRows(this.options, this);
		}else{
			var currentItemType = "";
			var scrollerRowMarkup = "";

			for(var scrollerIndex = 0; scrollerIndex < this.msObject.scrollerList.length; scrollerIndex++){
				var	itemList = "";

				for(var itemIndex = 0; itemIndex < this.msObject.scrollerList[scrollerIndex].itemList.length; itemIndex++){
					if(currentItemType != "" && this.msObject.scrollerList[scrollerIndex].itemList[itemIndex] != currentItemType){
						this.mixedType = true;
					}

					if(this.msObject.scrollerList[scrollerIndex].itemList[itemIndex].itemType == "img"){
						itemList += ''
									+ '<div class="itemWrapper">'
									+ '<img src="' + this.msObject.scrollerList[scrollerIndex].itemList[itemIndex].src + '" alt="' + this.msObject.scrollerList[scrollerIndex].itemList[itemIndex].caption + '" />'
									+ '</div>';
					}else if(this.msObject.scrollerList[scrollerIndex].itemList[itemIndex].itemType == "html"){
						itemList += ''
									+ '<div class="itemWrapper">'
									+ this.msObject.scrollerList[scrollerIndex].itemList[itemIndex].markup
									+ '</div>';
					}

					currentItemType = this.msObject.scrollerList[scrollerIndex].itemList[itemIndex].itemType;
				}

				this.scrollerMarkup += ''
								+ '<div class="thumbnailScroller blockContainer">'
								+ '<a class="scrollLeft" href="#">&lt;</a>'
								+ '<div id="' + this.selector.substr(1) + '_row_' + scrollerIndex + '" class="scrollerMask blockContainer ' + this.scrollerSelector.substr(1) + '">'
								+ '<div class="items">'
								+ itemList
								+ '</div>'
								+ '</div>'
								+ '<a class="scrollRight" href="#">&gt;</a>'
								+ '</div>';
			}

			$(this.multiScrollParent).append(this.scrollerMarkup);

			var createMultiScroll = new this.initializeRows(this.options, this);
		}
	}

	if($(itemsWrap).children().length){
		var options = $.parseJSON('{ "circular":false, "autoplay":false, "steps":1, "interval":1000, "autopause":false, "mixedTyped":true }');
		//var msObject = $.parseJSON('{"scrollerList":[{"itemList":[{"itemType":"img","src":"http://farm4.static.flickr.com/3629/3323896446_3b87a8bf75_t.jpg","caption":"foo"},{"itemType":"img","src":"http://farm4.static.flickr.com/3089/2796719087_c3ee89a730_t.jpg","caption":"foo"},{"itemType":"img","src":"http://farm1.static.flickr.com/164/399223606_b875ddf797_t.jpg","caption":"foo"},{"itemType":"img","src":"http://farm1.static.flickr.com/28/66523124_b468cf4978_t.jpg","caption":"foo"},{"itemType":"html","markup":"<span class=\'htmlElement\'>hello</span>"},{"itemType":"img","src":"http://farm4.static.flickr.com/3023/3323897466_e61624f6de_t.jpg","caption":"foo"}]}]}');
		var emScroll = new multiScroll(scrollerWrapper, ".scrollable", options, null, "body"),
			selectPhotoCount = $(optionsSize).val(),
			i = 4;

		function checkThumbnailArrows(i){
			if(selectPhotoCount < 5){
				$(scrollLeft).add(scrollRight).css( { "visibility":"hidden" } );
			}
			if(i <= 4){
				$(scrollLeft).css( { "visibility":"hidden" } );
			}else if(i > 4){
				$(scrollLeft).css( { "visibility":"visible" } );
			};
			if(i < selectPhotoCount){
				$(scrollRight).css( { "visibility":"visible" } );
			}else if(i >= selectPhotoCount){
				$(scrollRight).css( { "visibility":"hidden" } );
			};
		};//end checkThumbnailArrows
		
		checkThumbnailArrows(i);

		$(scrollLeft).click(function(){
			i--
			checkThumbnailArrows(i);
		});

		$(scrollRight).click(function(){
			i++
			checkThumbnailArrows(i);
		});
	}

	var productImage = $("#productImage"),
		imageDefault = $('#imageDefault'),
		imageZoomed = $('#imageZoomed'),
		imagePanned = $('#imagePanned');

	$(".loadAlternateImage").live("click", function(){ // includedInThisRoom

		var	context = $(this),
			alternateImage = context.attr("rel"),
			zoomWidget = $(".zoomWidget"),
			activeZoomControl = $(zoomWidget).find(".upper .active"),
			zoomImg = $(".zoomImg");

		if(alternateImage.indexOf("?") > -1){
			$(imageDefault).val(alternateImage + "&$PDP_Primary_525x366$");
			$(imageZoomed).val(alternateImage + "&$PDP_Zoom_912x636$");
			$(imagePanned).val(alternateImage + "&$PDP_Pan_3000x2091$");
		}else{
			$(imageDefault).val(alternateImage + "?$PDP_Primary_525x366$");
			$(imageZoomed).val(alternateImage + "?$PDP_Zoom_912x636$");
			$(imagePanned).val(alternateImage + "?$PDP_Pan_3000x2091$");
		}

		$("#photoOptions input").each(function(){
			var	context = $(this);
			$([context.val()]).preload();
		});

		$(productImage).fadeOut("fast", function(){
			if($(activeZoomControl).hasClass("default")){
				$(productImage).attr("src", $(imageDefault).val());

			}else if($(activeZoomControl).hasClass("zoomed")){
				$(productImage).attr("src", $(imageZoomed).val());

			}else if($(activeZoomControl).hasClass("panned")){
				$(productImage).attr("src", $(imagePanned).val());

			}

			$(productImage).fadeIn("slow");
			if($(zoomImg)){
				$(zoomImg).attr("src", $(imagePanned).val());
			}

		});

		return false;

	});



});//end dom