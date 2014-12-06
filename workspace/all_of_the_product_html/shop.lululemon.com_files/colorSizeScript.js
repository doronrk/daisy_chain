//function initializeZoom() {
//	if(!jQuery('body').hasClass('qvpdp')) {
//		jQuery('.jqzoom:visible').jqzoom({
//		      zoomType: 'standard',
//		      lens:true,
//		      preloadImages: false,
//		      alwaysOn: false,
//		      zoomHeight: 400,
//		      zoomWidth: 425,
//		      title: false,
//		      position: 'right'
//		});
//	}
//}
function initializeQtip() {
	jQuery('#wishListLink').qtip({
		content: jQuery('#wishListLink').attr('rel'),
		show: {
			when: 'mouseenter'
		},
		hide: {
			when: 'mouseout'
		},
		style: {
			background: '#fff2cc',
			border: {
				color: '#f4de9f',
				width: 2,
				radius: 2
			},
			color: '#000',
			name: 'cream',
			padding: 10,
			tip: true
		},
		position: {
			corner: {
				target: 'topMiddle',
				tooltip: 'bottomMiddle'
			},
			adjust: {
				y: 0
			}
		}
	});
}

function loadColorsAndSizes(prodId, cc) {
	try {
		if ((prodId != undefined) && (prodId != null)) {
			jQuery.ajax({
				type: 'get',
				url: '/shop/gadgets/pdp-productSelection.jsp?prodId='+prodId+'&cc='+cc,
				cache: false,
				async: true,
				success: function(response) {
					jQuery("#colorSizeInfo").html(response);
					sizeDriverObj = jQuery.parseJSON(jQuery.trim(jQuery('#sizeDriverString').text()));
					colorDriverObj = jQuery.parseJSON(jQuery.trim(jQuery('#colorDriverString').text()));
					var _loadingOverlay = jQuery('#loading-overlay-wrapper');
					_loadingOverlay.fadeOut(300, function(){
						_loadingOverlay.remove();
					});
				}
			});
		}
	} catch(err) {
		var _loadingOverlay = jQuery('#loading-overlay-wrapper');
		_loadingOverlay.fadeOut(300, function(){
			_loadingOverlay.remove();
		});
	}
}

jQuery(document).ready(function() {
	
	//hover full screen
	jQuery('div.fullScreenContainer').hover(function() {
		jQuery('div.fullScreenContainer div').css('border-color', '#FF1543');
	}, function() {
		jQuery('div.fullScreenContainer div').css('border-color', '#000000');
	});
	
	jQuery('div.fullScreenContainer').click(function(e) {
		e.preventDefault();
		jQuery('.pdpMainImg:visible').click();
	});
	
	//initializeZoom();
	enablePDPCarousel();
	//on page load, scroll to the BV reviews if available.
	var checkBvReviewsId = setInterval(function(){
		if(window.location.href.indexOf('#BVRRWidgetID') > 0){
			jQuery('html, body').animate({
				scrollTop: jQuery('#BVRRWidgetID').position().top
			}, 2000);
			clearInterval(checkBvReviewsId);
		}
	},500);

	sizeDriverObj = jQuery.parseJSON(jQuery.trim(jQuery('#sizeDriverString').text()));
	colorDriverObj = jQuery.parseJSON(jQuery.trim(jQuery('#colorDriverString').text()));
	var prdPrice = jQuery('#price').html();
	if(jQuery.isEmptyObject(colorDriverObj)) {
		jQuery('.pickColor').addClass('inactive');
	}
	//on page load check if size color are selected then enable add to cart
	if(jQuery('#selectedSize').val() != "" && jQuery('#selectedColorCode').val() != "" && jQuery('#soldOut').val() != "true") {
		jQuery('#buttonCartAddItem').removeClass('btn_grey').addClass('btn');
		jQuery('#buttonCartAddItem').parent().removeClass('btn_grey').addClass('btn');
		jQuery('#buttonCartAddItem').val('add to bag');
		jQuery('#wishListLink').removeClass('wlLinkDisabled');


		var ssz = jQuery('#selectedSize').val();
		var scc = jQuery('#selectedColorCode').val();
		jQuery('#skuNumber').text(jQuery('#pageLoadSku').val());
		jQuery('#pdpSelectedSku').val(jQuery('#pageLoadSku').val());
		jQuery.post('/shop/gadgets/selectedSkuPricing.jsp', { "productId":jQuery('#productId').val(), "selectedSkuId":jQuery('#pageLoadSku').val() }, function (data) {
			skuPrice = (jQuery.trim(data) != "") ? jQuery.trim(data) : jQuery('#price').html();
			jQuery('#price').html(skuPrice);
		});
		//change sku for wishlist
		if(jQuery('#wishListLink').length) {
			if (jQuery('#wishListLink').attr('href').indexOf('productId') > 0) {
				var existingWishlistLink = jQuery('#wishListLink').attr('href');
				var indexOfSkuId = jQuery('#wishListLink').attr('href').indexOf('&skuId');
				if (indexOfSkuId > 0) {
					existingWishlistLink = existingWishlistLink.substring(0,indexOfSkuId);
				}
				newWishlistlink = existingWishlistLink+'&skuId='+jQuery('#pdpSelectedSku').val();
				jQuery('#wishListLink').attr('href', newWishlistlink);
			}
			
		}
		//change sku for remove wishlist link
		if(jQuery('#wishListRemoveLink').length) {
			if (jQuery('#wishListRemoveLink').attr('href').indexOf('productId') > 0) {
				var existWLRemoveLink = jQuery('#wishListRemoveLink').attr('href');
				var indexOfSkuId = jQuery('#wishListRemoveLink').attr('href').indexOf('&skuId');
				if (indexOfSkuId > 0) {
					existWLRemoveLink = existWLRemoveLink.substring(0,indexOfSkuId);
				}
				newWLRemoveLink = existWLRemoveLink+'&skuId='+jQuery('#pdpSelectedSku').val();
				jQuery('#wishListRemoveLink').attr('href', newWLRemoveLink);
			}
			
		}
	} else {
		initializeQtip();
	}

	//user clicks on a size
	jQuery('.pickSize').live('click', function(e) {
		e.preventDefault();
		//hide the remove wishlist link
		jQuery('.wlSaved').css("display","none");
		jQuery('#wishListLink').css("display","block");
		
		jQuery('#selectedSizeDisplay').text(jQuery(this).attr('title'));
		jQuery('.pickSize').each(function(){
			jQuery(this).removeClass('active');
		});
		jQuery(this).addClass('active');

		captureOmniturePickSize(jQuery(this).attr('rel'), jQuery(this).attr('id'));
		var sizeCode = jQuery.trim(jQuery(this).attr('title'));
		var activeCC = jQuery('#swatches .active').attr('rev');
		var isAvail = false
		//change color states
		jQuery('.pickColor').addClass('inactive');
		if(sizeDriverObj[sizeCode] != null) {
			jQuery.each(sizeDriverObj[sizeCode], function(index, value) {
				var cSkuObj = sizeDriverObj[sizeCode][index];
				var color = cSkuObj[0];
				var skuId = cSkuObj[1];
				//populate active sku
				if(activeCC != null && activeCC != "" && color == activeCC) {
					jQuery('#skuNumber').text(skuId);
					jQuery('#pdpSelectedSku').val(skuId);
					isAvail = true;
					jQuery.post('/shop/gadgets/selectedSkuPricing.jsp', { "productId":jQuery('#productId').val(), "selectedSkuId":skuId }, function (data) {
						skuPrice = (jQuery.trim(data) != "") ? jQuery.trim(data) : jQuery('#price').html();
						jQuery('#price').html(skuPrice);
					});
				}
				jQuery('a[rev="' + color + '"]').removeClass('inactive');
			});
		}
		if(activeCC != null && activeCC != "" && !isAvail) {
			jQuery('#skuNumber').text('');
			jQuery('#pdpSelectedSku').val('out of stock');
			jQuery('#price').html(prdPrice);
		}
		//change add to cart button to active/inactive state
		if(jQuery(this).hasClass('soldOut')) {
			jQuery('#buttonCartAddItem').removeClass('btn').addClass('btn_grey');
			jQuery('#buttonCartAddItem').parent().removeClass('btn').addClass('btn_grey');
			jQuery('#buttonCartAddItem').val('out of stock');
			jQuery('#wishListLink').addClass('wlLinkDisabled');
			initializeQtip();

		} else if(!jQuery('#swatches .active').hasClass('inactive')) {
			jQuery('#buttonCartAddItem').removeClass('btn_grey').addClass('btn');
			jQuery('#buttonCartAddItem').parent().removeClass('btn_grey').addClass('btn');
			jQuery('#buttonCartAddItem').val('add to bag');
			//change sku for wishlist
			if(jQuery('#wishListLink').length) {
				if (jQuery('#wishListLink').attr('href').indexOf('productId') > 0) {
					var existingWishlistLink = jQuery('#wishListLink').attr('href');
					var indexOfSkuId = jQuery('#wishListLink').attr('href').indexOf('&skuId');
					if (indexOfSkuId > 0) {
						existingWishlistLink = existingWishlistLink.substring(0,indexOfSkuId);
					}
					newWishlistlink = existingWishlistLink+'&skuId='+jQuery('#pdpSelectedSku').val();
					jQuery('#wishListLink').attr('href', newWishlistlink);
				}
				jQuery('#wishListLink').removeClass('wlLinkDisabled');
				if('object' === typeof jQuery('#wishListLink').data('qtip')) {
					jQuery('#wishListLink').unbind('mouseenter');
				} else {
					// do nothing
				}
			}
			
			//change sku for remove wishlist link
			if(jQuery('#wishListRemoveLink').length) {
				if (jQuery('#wishListRemoveLink').attr('href').indexOf('productId') > 0) {
					var existWLRemoveLink = jQuery('#wishListRemoveLink').attr('href');
					var indexOfSkuId = jQuery('#wishListRemoveLink').attr('href').indexOf('&skuId');
					if (indexOfSkuId > 0) {
						existWLRemoveLink = existWLRemoveLink.substring(0,indexOfSkuId);
					}
					newWLRemoveLink = existWLRemoveLink+'&skuId='+jQuery('#pdpSelectedSku').val();
					jQuery('#wishListRemoveLink').attr('href', newWLRemoveLink);
				}
				
			}
		}

	});

	//user clicks on a color
	jQuery('.pickColor').live('click', function(e) {
		e.preventDefault();
		//hide the remove wishlist link
		jQuery('.wlSaved').css("display","none");
		jQuery('#wishListLink').css("display","block");
		
		jQuery('#selectedColorDisplay').text(jQuery(this).attr('title'));
		jQuery('.pickColor').each(function(){
			jQuery(this).removeClass('active');
		});
		jQuery(this).addClass('active');
		captureOmniturePickColor(jQuery(this).attr('title'));
		var colorCode = jQuery(this).attr('rev');
		var activeSZ = jQuery('#sizes .active').attr('rev');
		var isAvail = false;
		jQuery('.skuAlert').each(function(){
			jQuery('.skuAlert').css("display","none");					
				});
		jQuery('#'+colorCode+'_skuAlert').css("display","block"); 
		//change size states
		jQuery('.pickSize').addClass('soldOut');
		if(!jQuery.isEmptyObject(colorDriverObj)) {
			jQuery.each(colorDriverObj[colorCode], function(index, value) {
				var szSkuObj = colorDriverObj[colorCode][index];
				var size = szSkuObj[0].replace(' ', '');
				var skuId = szSkuObj[1];
				//populate active sku
				if(activeSZ != null && activeSZ != "" && size == activeSZ.replace(' ', '')) {
					jQuery('#skuNumber').text(skuId);
					jQuery('#pdpSelectedSku').val(skuId);
					isAvail = true;
					jQuery.post('/shop/gadgets/selectedSkuPricing.jsp', { "productId":jQuery('#productId').val(), "selectedSkuId":skuId }, function (data) {
						skuPrice = (jQuery.trim(data) != "") ? jQuery.trim(data) : jQuery('#price').html();
						jQuery('#price').html(skuPrice);
					});
				}
				jQuery('a[rev="' + size + '"]').removeClass('soldOut');

			});
		}
		
		if(activeSZ != null && activeSZ != "" && !isAvail) {
			jQuery('#skuNumber').text('');
			jQuery('#pdpSelectedSku').val('out of stock');
			jQuery('#price').html(prdPrice);
		}
		//change add to cart button to active/inactive state
		if(jQuery(this).hasClass('inactive')) {
			jQuery('#buttonCartAddItem').removeClass('btn').addClass('btn_grey');
			jQuery('#buttonCartAddItem').parent().removeClass('btn').addClass('btn_grey');
			jQuery('#buttonCartAddItem').val('out of stock');
			jQuery('#wishListLink').addClass('wlLinkDisabled');
			initializeQtip();
		}  else if(!jQuery('#sizes .active').hasClass('soldOut') && jQuery('#sizes .active').length > 0) {
			jQuery('#buttonCartAddItem').removeClass('btn_grey').addClass('btn');
			jQuery('#buttonCartAddItem').parent().removeClass('btn_grey').addClass('btn');
			jQuery('#buttonCartAddItem').val('add to bag');
			//change sku for wishlist
			if(jQuery('#wishListLink').length) {
				if (jQuery('#wishListLink').attr('href').indexOf('productId') > 0) {
					var existingWishlistLink = jQuery('#wishListLink').attr('href');
					var indexOfSkuId = jQuery('#wishListLink').attr('href').indexOf('&skuId');
					if (indexOfSkuId > 0) {
						existingWishlistLink = existingWishlistLink.substring(0,indexOfSkuId);
					}
					newWishlistlink = existingWishlistLink+'&skuId='+jQuery('#pdpSelectedSku').val();
					jQuery('#wishListLink').attr('href', newWishlistlink);
				}
				jQuery('#wishListLink').removeClass('wlLinkDisabled');
				jQuery('#wishListLink').unbind('mouseenter');
			}
			
			//change sku for remove wishlist link
			if(jQuery('#wishListRemoveLink').length) {
				if (jQuery('#wishListRemoveLink').attr('href').indexOf('productId') > 0) {
					var existWLRemoveLink = jQuery('#wishListRemoveLink').attr('href');
					var indexOfSkuId = jQuery('#wishListRemoveLink').attr('href').indexOf('&skuId');
					if (indexOfSkuId > 0) {
						existWLRemoveLink = existWLRemoveLink.substring(0,indexOfSkuId);
					}
					newWLRemoveLink = existWLRemoveLink+'&skuId='+jQuery('#pdpSelectedSku').val();
					jQuery('#wishListRemoveLink').attr('href', newWLRemoveLink);
				}
				
			}
		}

		if(jQuery('body.pdp').hasClass('qvpdp')) {
			//change product images
			var colorCode = jQuery(this).attr('rev');
			jQuery.ajax({
				url: "/shop/gadgets/productImageChanger.jsp",
				type: "POST",
				data: ({isMainImage : true , prodId : jQuery(this).attr('rel') , cc : colorCode , isQV : true}),
				success: function(data){
					jQuery('#productImage').html(data);
				}
			});
			if(jQuery('body.pdp').hasClass('gift-pack')) {
				//do nothing
				// Dont chnage the carousel for gift=pack miniCDP
			}
			else{
				jQuery.ajax({
					url: "/shop/gadgets/productImageChanger.jsp",
					type: "POST",
					data: ({isMainImage : false , prodId : jQuery(this).attr('rel') , cc : colorCode , isQV : true}),
					success: function(data){
						jQuery('#carousel').html(data);
						enablePDPCarousel();
					}
				});
			}

		} else {
			//change product images
			var colorCode = jQuery(this).attr('rev');
			var soldOutPDP = jQuery('#soldOut').val();
			jQuery.ajax({
				url: "/shop/gadgets/productImageChanger.jsp",
				type: "POST",
				data: ({isMainImage : true , prodId : jQuery(this).attr('rel') , cc : colorCode,isPDPSoldOut : soldOutPDP}),
				success: function(data){
					jQuery('#productImageContainer').html(data);
				}, complete: function() {
					//initializeZoom();
					jQuery('a.pdpMainImg').click(function(e) {
						e.preventDefault();	
						captureOmniturePdpZoom();
						jQuery('#fancybox-content').css('background-color', '#ffffff');
						jQuery.fancybox({
							'transitionIn'			: 'elastic',
							'transitionOut'			: 'elastic',
							'speedIn'				: 300,
							'speedOut'				: 200,
							'titleShow' : false,
							'overlayColor' : '#000',
							'overlayOpacity' : 0.9,
							'autoDimensions' :false,
							'autoScale' : false,
							'width' : 980,
							'height' : 1217,
							'margin' : 40,
							'scrolling'	: 'no',
							'href' : jQuery(this).attr('href'),
							'onComplete' : function() {
								window.miniBuyStackPDP();
							},
							'onClosed' : function() {
								jQuery('#fancybox-content').css('background-color', 'transparent');
							}
						});
					});
				}
			});
			jQuery.ajax({
				url: "/shop/gadgets/productImageChanger.jsp",
				type: "POST",
				data: ({isMainImage : false , prodId : jQuery(this).attr('rel') , cc : colorCode,isPDPSoldOut : soldOutPDP}),
				success: function(data){
					jQuery('#carousel').html(data);

					enablePDPCarousel();

				},
				complete: function() {
					jQuery('.videocall').click(function(e) {
						e.preventDefault();
						var src = jQuery(this).attr('href');
						var wWidth = jQuery(window).width();
						if(wWidth > 980) {
							wWidth = 980;
						}
						var wHeight = wWidth / 1.373737;
						if(wHeight > jQuery(window).height()) {
							wHeight = jQuery(window).height();
							wWidth = wHeight * 1.373737;
						}
						
						if(wWidth == null || wWidth < 5) {
							wWidth = 680;
							wHeight = 495;
						}
						if(wHeight == null || wHeight < 5) {
							wHeight = 495;
							wWidth = 680;
						}
						jQuery.fancybox({
							'transitionIn'			: 'elastic',
							'transitionOut'			: 'elastic',
							'speedIn'				: 300,
							'speedOut'				: 200,
							'padding' : 0,
							'width' : wWidth,
							'height' : wHeight,
							'href' : src,
							'type' : 'swf',
							'swf' : {
								'wmode' : 'transparent',
								'allowfullscreen' : 'true'
							}
						});
					});
				}
			});
		}


	});

	jQuery('#buttonCartAddItem').live('click', function(e) {
	
		e.preventDefault();
		if(jQuery(this).hasClass('btn_grey')) {
			return false;
		}
		//enable progress gif
		jQuery('#addToCartMessaging').show();

		jQuery.ajax({
			url:'/browse/cart-submit.jsp',
			type: "post",
			dataType: "json",
			data: { 'productId':jQuery('#productId').val(), 'skuId':jQuery('#pdpSelectedSku').val(), 'quantity':jQuery('#quantity').val(),'randomTokenForAccount':jQuery('#randomTokenForAccount').val(),'page':'MAIN' },
			success: function(data) {			
				var shoppingCartResponse = data;
				jQuery.ajax({
					url: "/checkout/xhr/getCurrentCart.jsp",
					type: "post",
					dataType: "json",
					success: function(responseData) {
						var productData = responseData;
						var productArray = responseData.product;
						var PDPeVar4 ;
						jQuery.ajax({
							url: "/shop/gadgets/omnitureAddToCart.jsp",
							type: "post",
							dataType: "json",
							data: { 'categoryUB':jQuery('#categoryUserBrowsedFrom').val() },
							success: function(response) {
							
								var omnitureData = response;
								PDPeVar4= omnitureData.eVar4;								
								if (productArray.length == 1) {								
									// fire first event
									productArray[0].productId;
									productArray[0].skuId;
									s.linkTrackVars='products,events';
									s.linkTrackEvents='scAdd,scOpen';
									s.events = "scAdd,scOpen";
									s.products = ";" + productArray[0].skuId + ";;;;eVar4=" + omnitureData.eVar4;
									s.tl(true,'o','Shopping Cart - Add');
									_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Open',  escape(productArray[0].name)]);
								}
								else {
									// fire subsequent event
									productArray[productArray.length - 1].productId;
									productArray[productArray.length - 1].skuId;
									s.linkTrackVars='products,events';
									s.linkTrackEvents='scAdd';
									s.events = "scAdd";
									s.products = ";" + productArray[productArray.length - 1].skuId+ ";;;;eVar4=" + omnitureData.eVar4;
									s.tl(true,'o','Shopping Cart - Add');
									_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Add', escape(productArray[productArray.length - 1].name)]);
								}
								//var s_code=s.t();if(s_code)document.write(s_code);
							},
							error: function(x,y,z){
							
								if (productArray.length == 1) {
									// fire first event
									productArray[0].productId;
									productArray[0].skuId;
									s.linkTrackVars='products,events';
									s.linkTrackEvents='scAdd,scOpen';
									s.events = "scAdd,scOpen";
									s.products = ";" + productArray[0].skuId;
									s.tl(true,'o','Shopping Cart - Add');
									_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Open',  escape(productArray[0].name)]);
								}
								else {
									// fire subsequent event
									productArray[productArray.length - 1].productId;
									productArray[productArray.length - 1].skuId;
									s.linkTrackVars='products,events';
									s.linkTrackEvents='scAdd';
									s.events = "scAdd";
									s.products = ";" + productArray[productArray.length - 1].skuId;
									s.tl(true,'o','Shopping Cart - Add');
									_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Add', escape(productArray[productArray.length - 1].name)]);
								}
								//alert(x + '\n' + y + '\n' + z);
							},
							complete: function(x,y) {
							
								if(jQuery('body.pdp').hasClass('qvpdp')) {
								
									//show add to cart button
									jQuery('#addToCartMessaging').hide();
									if (shoppingCartResponse.step == "addtocart") {
										if (shoppingCartResponse.result == "successful") {
											jQuery.ajax({
												url:'/elements/gadgets/shoppingCartItemCount.jsp',
												type:'post',
												success: function(data) {
													var count = jQuery.trim(data);
													parent.jQuery('#shoppingBag .itemCount').text(count);
												}, complete: function() {
													var shoppingCartLink=parent.jQuery('#shoppingBag a#shoppingBagLink').attr('href');
													if (shoppingCartLink.indexOf("PDPeVar4") ==-1) {
														var shopBagLink = shoppingCartLink +'?PDPeVar4='+escape(PDPeVar4);
														parent.jQuery('#shoppingBag a#shoppingBagLink').attr('href',shopBagLink);
													} 
													parent.jQuery('#shoppingBag a#shoppingBagLink').click();
												}
											});
										} else {
											jQuery('#errorAddToCartMessaging').show();
											setTimeout('jQuery("#errorAddToCartMessaging").fadeOut(300)', 5000);
										}
									}

								} else {
								
									//show add to cart button
									jQuery('#addToCartMessaging').hide();
									if (shoppingCartResponse.step == "addtocart") {
										if (shoppingCartResponse.result == "successful") {	
											var shoppingCartLink=jQuery('#shoppingBag a#shoppingBagLink').attr('href');
											if (shoppingCartLink.indexOf("PDPeVar4") ==-1) {
												var shopBagLink = jQuery('#shoppingBag a#shoppingBagLink').attr('href') +'?PDPeVar4='+PDPeVar4;
												jQuery('#shoppingBag a#shoppingBagLink').attr('href',shopBagLink);
											}
											jQuery('#shoppingBag a#shoppingBagLink').click();
											jQuery.ajax({
												url:'/elements/gadgets/shoppingCartItemCount.jsp',
												type:'post',
												success: function(data) {
													var count = jQuery.trim(data);
													jQuery('#shoppingBag .itemCount').text(count);
												}
											});
										} else {
											jQuery('#errorAddToCartMessaging').show();
											setTimeout('jQuery("#errorAddToCartMessaging").fadeOut(300)', 5000);
										}
									}
								}
							}
						});
					},
					error: function(x,y,z) {
						//alert(x + '\n' + y + '\n' + z);
					}
				});


			},
			complete: function() {

			}, error: function() {
				jQuery('#errorAddToCartMessaging').show();
				setTimeout('jQuery("#errorAddToCartMessaging").fadeOut(300)', 5000);
			}
		});

	});

	//change product main image
	jQuery('.pdpThumb').live('click', function(e) {
		e.preventDefault();
		var mainImg = jQuery(this).attr('id');
		jQuery('.pdpMainImg').hide();
		jQuery(mainImg).fadeIn('medium');
		
	});
	
	jQuery('.pdpThumb').live('mouseenter', function(e) {
		var mainImg = jQuery(this).attr('id');
		if(jQuery(mainImg).is(':visible')) {
			return false;
		}
		jQuery('.pdpMainImg').hide();
		jQuery(mainImg).fadeIn('medium');
	});

	jQuery('#BVRRRatingSummaryLinkWriteID a').live('click', function() {
		_gaq.push(['ga._trackEvent', 'Cart Event', 'Create Review',  '']);
	});

});

function omnitureReset() {
	s.products="";
	s.prop17 = "";
	s.prop24="";
	s.prop27="";
	s.eVar20="";
	s.eVar28="";
	s.eVar59="";
	s.channel = "";
	s.events="";
}

function captureCartView() {
	jQuery.ajax({
		url: "/checkout/spk/omniture/getCurrentForOmniture.jsp",
		type: "post",
		success: function(response) {
			var omnitureData = response;
			s.events="scView";
			s.products=omnitureData;
			s.pageName = "store:checkout:shopping cart";
			s.channel = "store";
			s.prop1="checkout";
			s.prop2="shopping cart";
			s.prop3="";
			s.prop4="";
			var s_code=s.t();if(s_code)document.write(s_code);
			},
		error: function(x,y,z){}
		});
}

function captureOmniturePickColor(colorTitle) {
	var pageName = s.pageName;
	omnitureReset();
	s.pageName = pageName;
	s.events = "event27";
	s.eVar20=colorTitle;
	var s_code=s.t();if(s_code)document.write(s_code);
}

function captureOmniturePickSize(productId, size) {
	var pageName = s.pageName;
	omnitureReset();
	s.pageName = pageName;
	s.events = "event29";
	var sizeValue = '';

	if (size != null && size.indexOf('lll') != -1) {
		var sizeBeginIndex = size.indexOf("lll");
		var endIndex = size.indexOf('_');
		if (endIndex > sizeBeginIndex) {
			sizeValue = size.substring(sizeBeginIndex + 'lll'.length, endIndex);
			s.eVar27 = productId + ':' + sizeValue;//lll6_sz (6 is the size)
		}
	}
	var s_code=s.t();if(s_code)document.write(s_code);
}

function captureOmniturePdpZoom() {
	var skuId = jQuery('#pdpSelectedSku').val();
	if(skuId == '' || skuId == 'out of stock') {
		skuId = colorDriverObj[jQuery('.pickColor.active').prop('rev')][0][1];
	}
	if(skuId == null) {
		skuId == jQuery('#pageLoadSku').val();
	}
	var pageName = s.pageName;
	omnitureReset();
	s.pageName = pageName;
	s.linkTrackVars='prop24,eVar59,events';
	s.linkTrackEvents='ProdView,event3';
	s.events = "ProdView,event3";
	s.prop24="zoom view";
	s.eVar59="zoom view";
	s.products = ";" + skuId + ";;;;eVar4=" + jQuery('#categoryUserBrowsedFrom').val();
	var s_code=s.tl();if(s_code)document.write(s_code);
}

function captureOmnitureViewMoreImgs() {
	var skuId = jQuery('#pdpSelectedSku').val();
	if(skuId == '' || skuId == 'out of stock') {
		skuId = colorDriverObj[jQuery('.pickColor.active').prop('rev')][0][1];
	}
	if(skuId == null) {
		skuId == jQuery('#pageLoadSku').val();
	}
	var pageName = s.pageName;
	omnitureReset();
	s.pageName = pageName;
	s.linkTrackVars='prop24,eVar28,eVar59,events';
	s.linkTrackEvents='ProdView,event3';
	s.events = "ProdView,event30";
	s.prop24="traditional view";
	s.eVar28 = "PDP: View additional images";
	s.eVar59="traditional view";
	s.products = ";" + skuId;
	var s_code=s.t();if(s_code)document.write(s_code);
}

function adjustAltImages() {

	try {
		total = jQuery('div#popupAltImgs li').size();
		var run = true;
		offScreenIndex = total - 1;
		jQuery('ul#popupAltList').removeClass('oneColumn').removeClass('twoColumn').removeClass('threeColumn');
		jQuery('ul#popupAltList').addClass('oneColumn');
		jQuery('div#popupAltImgs li').each(function(index, value) {
			var off = jQuery(this).offset();
			var t = off.top;
			var l = off.left;
			var h = jQuery(this).height()+10;
			var w = jQuery(this).width();
			var docH = jQuery(window).height();
			var docW = jQuery(window).width();
			var isEntirelyVisible = (t > 0 && l > 0 && t + h < docH && l+ w < docW);
			if(!isEntirelyVisible && run) {
				offScreenIndex = index;
				run = false;
			}
		});
		offScreenIndex++;
		if(total / offScreenIndex >= 2) {
			jQuery('ul#popupAltList').removeClass('oneColumn').removeClass('twoColumn').removeClass('threeColumn');
			jQuery('ul#popupAltList').addClass('threeColumn');
		} else if(total / offScreenIndex > 1) {
			jQuery('ul#popupAltList').removeClass('oneColumn').removeClass('twoColumn').removeClass('threeColumn');
			jQuery('ul#popupAltList').addClass('twoColumn');
		} else {
			jQuery('ul#popupAltList').removeClass('oneColumn').removeClass('twoColumn').removeClass('threeColumn');
			jQuery('ul#popupAltList').addClass('oneColumn');
		}
	} catch(err) {
		
	}
}


function miniBuyStackPDP() {
	var mbsColorDriver = jQuery.parseJSON(jQuery.trim(jQuery('#colorDriverMiniStackPDP').text()));
	adjustAltImages();
	
	jQuery(window).resize(function() {
		clearTimeout(this.id);
		this.id = setTimeout('adjustAltImages()', 500);
	});
	//user changes color
	jQuery('#color').change(function() {
		var cCode = jQuery(this).val();
		var soldOutPDP = jQuery('#soldOut').val();
		hideAddToCart();
		hideSizeError()
		//populate sizes for selected color
		populateSizes(mbsColorDriver, cCode);
		//change zoom image
		jQuery.ajax({
			url: "/shop/gadgets/prdImg-popup.jsp",
			type: "get",
			data: { cc : cCode, prdId : jQuery('#productIdZoom').val(), prdImgIndex : 0,isPDPSoldOut:soldOutPDP},
			success: function(data){
				jQuery('#fancybox-content > div').hide();
				jQuery('#fancybox-content > div').html(data);
				jQuery('#fancybox-content > div').fadeIn('fast');
			}, complete: function() {
				miniBuyStackPDP();
			}
		});
	});

	//user changes size
	jQuery('#size').change(function() {
		hideSizeError()
		if(jQuery(this).val() == 'sMessage') {
			hideAddToCart();
		} else {
			showAddToCart();
			jQuery('#skuMiniStackPDP').val(jQuery('#size option:selected').attr('id'));
		}
	});

	//populate sizes
	populateSizes(mbsColorDriver, jQuery('select#color').val());
	var isBorder = false;
	//add events handlers to alt images
	jQuery('div#popupAltImgs li').hover(function() {
		
		if(jQuery(this).hasClass('selPopupThumb')) {
			isBorder = true;
		} else {
			isBorder = false;
			jQuery(this).addClass('selPopupThumb');
			jQuery('div#popupAltImgs li').removeClass('selPopupThumb');
			isBorder = true;
			jQuery(this).addClass('selPopupThumb');
			if(!jQuery(this).hasClass('isPopVid')) {
				var mainImg = jQuery(this).find('a').attr('id');
				jQuery('div#popupMainImg img').hide();
				jQuery(mainImg).fadeIn('fast');
			}
		}
	
	},function() {
		if(!jQuery(this).hasClass('isPopVid')) {
			if(!isBorder) {
				jQuery(this).removeClass('selPopupThumb');
			}
		} else {
			jQuery(this).removeClass('selPopupThumb');
			var visibleImg = jQuery('#popupMainImg img:visible').attr('id');
			jQuery('[id$=' + visibleImg + ']').closest('li').addClass('selPopupThumb');
		}
	});
	
	jQuery('div#popupAltImgs li').click(function(e) {
		e.preventDefault();
		if(jQuery(this).hasClass('selPopupThumb')) {
			return false;
		}
		jQuery('div#popupAltImgs li').removeClass('selPopupThumb');
		isBorder = true;
		jQuery(this).addClass('selPopupThumb');
		var mainImg = jQuery(this).find('a').attr('id');
		jQuery('div#popupMainImg img').hide();
		jQuery(mainImg).fadeIn('fast');
		
	});
	
	jQuery('.popupVideoCall').click(function(e) {
		e.preventDefault();
		var src = jQuery(this).attr('href');
		var wWidth = jQuery(window).width();
		if(wWidth > 980) {
			wWidth = 980;
		}
		var wHeight = wWidth / 1.373737;
		if(wHeight > jQuery(window).height()) {
			wHeight = jQuery(window).height();
			wWidth = wHeight * 1.373737;
		}
		
		if(wWidth == null || wWidth < 5) {
			wWidth = 680;
			wHeight = 495;
		}
		if(wHeight == null || wHeight < 5) {
			wHeight = 495;
			wWidth = 680;
		}
		jQuery.fancybox({
			'transitionIn'			: 'elastic',
			'transitionOut'			: 'elastic',
			'speedIn'				: 300,
			'speedOut'				: 200,
			'padding' : 0,
			'width' : wWidth,
			'height' : wHeight,
			'href' : src,
			'type' : 'swf',
			'swf' : {
				'wmode' : 'transparent',
				'allowfullscreen' : 'true'
			}
		});
	});

	jQuery('#pdpMiniStackCartButton').click(function(e) {
		e.preventDefault();
		if(jQuery(this).hasClass('btn_grey')) {
			hideSizeError();
			showSizeError();
			return false;
		}
		//enable progress gif
		jQuery('#miniStackAddToCartMessaging').show();

		jQuery.ajax({
			url:'/browse/cart-submit.jsp',
			type: "post",
			dataType: "json",
			data: { 'productId':jQuery('#productMiniStackPDP').val(), 'skuId':jQuery('#skuMiniStackPDP').val(), 'quantity':jQuery('#fancyquantity').val(),'randomTokenForAccount':jQuery('#randomTokenForAccount').val(),'page':'MAIN' },
			success: function(data) {
				var shoppingCartResponse = data;

				jQuery('#miniStackAddToCartMessaging').hide();
				if (shoppingCartResponse.step == "addtocart") {
					if (shoppingCartResponse.result == "successful") {
					    jQuery('#shoppingBag a#shoppingBagLink').click();
						jQuery.ajax({
							url:'/elements/gadgets/shoppingCartItemCount.jsp',
							type:'post',
							success: function(data) {
								var count = jQuery.trim(data);
								jQuery('#shoppingBag .itemCount').text(count);
							}
						});

						jQuery.ajax({
							url: "/checkout/xhr/getCurrentCart.jsp",
							type: "post",
							dataType: "json",
							success: function(responseData) {
								var productData = responseData;
								var productArray = responseData.product;

								jQuery.ajax({
									url: "/shop/gadgets/omnitureAddToCart.jsp",
									type: "post",
									dataType: "json",
									data: { 'categoryId':jQuery('#categoryId').val() },
									success: function(response) {
									
										var omnitureData = response;
										if (productArray.length == 1) {
											// fire first event
											productArray[0].productId;
											productArray[0].skuId;
											s.linkTrackVars='products,events';
											s.linkTrackEvents='scAdd,scOpen';
											s.events = "scAdd,scOpen";
											s.prop24="zoom view";
											s.eVar59="zoom view";
											s.products = ";" + productArray[0].skuId + ";;;;eVar4=" + omnitureData.eVar4;
											var s_code=s.tl();if(s_code)document.write(s_code);
											_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Open',  escape(productArray[0].name)]);
										}
										else {
											// fire subsequent event
											productArray[productArray.length - 1].productId;
											productArray[productArray.length - 1].skuId;
											s.linkTrackVars='products,events';
											s.linkTrackEvents='scAdd';
											s.events = "scAdd";
											s.prop24="zoom view";
											s.eVar59="zoom view";
											s.products = ";" + productArray[productArray.length - 1].skuId+ ";;;;eVar4=" + omnitureData.eVar4;
											var s_code=s.tl();if(s_code)document.write(s_code);
											_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Add', escape(productArray[productArray.length - 1].name)]);
										}
										//var s_code=s.t();if(s_code)document.write(s_code);
									},
									error: function(x,y,z){
										if (productArray.length == 1) {
											// fire first event
											productArray[0].productId;
											productArray[0].skuId;
											s.linkTrackVars='products,events';
											s.linkTrackEvents='scAdd,scOpen';
											s.events = "scAdd,scOpen";
											s.products = ";" + productArray[0].skuId;
											var s_code=s.tl();if(s_code)document.write(s_code);
											_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Open',  escape(productArray[0].name)]);
										}
										else {
											// fire subsequent event
											productArray[productArray.length - 1].productId;
											productArray[productArray.length - 1].skuId;
											s.linkTrackVars='products,events';
											s.linkTrackEvents='scAdd';
											s.events = "scAdd";
											s.products = ";" + productArray[productArray.length - 1].skuId;
											var s_code=s.tl();if(s_code)document.write(s_code);
											_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Add', escape(productArray[productArray.length - 1].name)]);
										}
										//alert(x + '\n' + y + '\n' + z);
									}
								});
							},
							error: function(x,y,z) {
								//alert(x + '\n' + y + '\n' + z);
							}
						});

					} else {
						jQuery('#miniStackContainer #errorAddToCartMessaging').show();
						setTimeout('jQuery("#miniStackContainer #errorAddToCartMessaging").fadeOut(300)', 5000);
					}
				}
			}
		});

	});
}
function showSizeError() {
	jQuery('<div class="pickSzError">please pick a size</div>').insertAfter('#size');
}
function hideSizeError() {
	jQuery('.pickSzError').remove();
}
function hideAddToCart() {
	jQuery('#pdpMiniStackCartButton').removeClass('btn').addClass('btn_grey');
	jQuery('#pdpMiniStackCartButton').parent().removeClass('btn').addClass('btn_grey');
}
function showAddToCart() {
	jQuery('#pdpMiniStackCartButton').removeClass('btn_grey').addClass('btn');
	jQuery('#pdpMiniStackCartButton').parent().removeClass('btn_grey').addClass('btn');
}
function populateSizes(colorDriver, cc) {
	//remove size options
	jQuery('#size option').remove();

	//set up hidden dropdowns
	jQuery('select.sizeDropDownHolder option').addClass('sizeNotAvailable');
	if(!jQuery.isEmptyObject(colorDriver)) {
	jQuery.each(colorDriver[cc], function(index, value) {
		var szSkuObj = colorDriver[cc][index];
		var size = szSkuObj[0].replace(' ', '');;
		var skuId = szSkuObj[1];

		jQuery('option[title="' + size + '"]').removeClass('sizeNotAvailable').attr('id', skuId);
	});
	}

	//copy hidden options
	var optionHtml = '<option id="sMessage" class="sMessage" value="sMessage" selected="selected">select size</option>';

	jQuery('.sizeDropDownHolder option').each(function() {
		if(!jQuery(this).hasClass('sizeNotAvailable')) {
			optionHtml += jQuery('<div>').append(jQuery(this).clone()).remove().html();
		}
	});
	//populate size dropdown
	jQuery('#size').html(optionHtml);
}