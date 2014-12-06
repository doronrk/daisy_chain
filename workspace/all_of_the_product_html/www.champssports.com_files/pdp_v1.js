if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      if ( this === undefined || this === null ) {
        throw new TypeError( '"this" is null or not defined' );
      }

      var length = this.length >>> 0; // Hack to convert object.length to a UInt32

      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
      }

      if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }

      for (;fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
          return fromIndex;
        }
      }

      return -1;
    };
  }
if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 
if(typeof(cmSetupOther) == 'function') {
	cmSetupOther({"cm_TrackImpressions":""});
}

var productVariables = {
	timerID : new Object(),
	timeToHL : -1,
	pageLoadedTS : -1,
	globalTimer : -1,
	globalTimerHandle : null,
	hlEnd : -1,
	adjust : 0, // Adjustment for Fixed bar at top of site when scroll to
	styleData : window['styles_'+model_nbr],
	scrollTarget : 'html, body',
	modelData : window['model'],
	nonSaleLabel : '', // Default label in front of Reg Price when not on Sale
	regularPriceLabel : 'Was: ', // Default label in front of Reg Price when on Sale price
	saleLabel : 'Now: ', // Default label in front of Sale Price
	percentLabel : 'Discount: ', // Default label in front of Percent Off
	savingsLabel : 'Save: ', // Default label in front of Savings
	displayPercent : false, // Display Percent Off
	displaysavings : false, // Display Savings
	outOfStockMessage : ' - Out of stock',
	displaySFS : true,
	productName : '',
	SFSMessage : ' * Only ships to lower 48 states',
	inlineZoomDim : ['1000','1000'],
	inlineZoomSettings : {},
	showOutOfStock : true,
	readmoreSettings : {},
	productSpotlight : new Object(),
	productSpotlightSettings : new Object(),
	stylesSpotlight : new Object(),
	stylesSpotlightSettings : new Object(),
	mainImageSize : ['zoom','500'],
	pdpVideoSettings : new Object(),
	timerLabels : ['This item is available in:','hrs','min','sec'],
	launchCopy : 'Please note: Your order is not finalized until the checkout process is complete and you receive a shipment confirmation email.',
	launchMaxCopy : 'Product added to the cart is not guaranteed until the checkout process is completed.',
	hot_launch_max_per_order : 1,
	recentlyViewedOptions : {'maxProducts':10,'imageSize': ['cart','c']},
	otherStylesOptions : {'maxProducts':10,'imageSize': ['cart','c']},
	pdpTop : $('.pdp_wrapper').offset().top,
	TOUCH_DEVICE : (typeof document.ontouchstart != "undefined") ? true : false,
	tooltipAction : 'click',
	tooltipSettings : {'showOn':'click', 'maxWidth': 350},
	fitGuarentee : '/customerserv/help:returnPolicy/?cm_sp=PDP-_-Sizing-_-FitSatisfaction',
	fitInfoJSON : '/ns/common/pdp/js/fit-info.js', // FIT Info JSON feed
	fitInfoImgBaseURL : '/images/fl/iconFlags/',
	productIcons : '/images/products/iconFlags/',
	striperpediaContent : '/shared/json/productContent?site=striperpedia&sku=',
	showTrueSize : false,
	sizingURL : '/catalog/productSpecificSizing.cfm?sizechart_cd=', //  Base Size chart URL, append Size Chart ID
	includedMetadata : null,
	netItemMessage : '<span class="message" id="newItem">New Item</span>',
	excludedMessage: '<span class="message" id="excludedMessage" title="Item is excluded from discount. View details."> Excluded From Discount <a class="info_icon" data-tooltip="The dollar value of this item will count toward meeting a required minimum purchase total necessary to receive a discount, but the price of this item itself will not be discounted. Only other eligible items in your cart will be discounted. (Example: You can purchase this product to reach the order threshold to receive a discount, but you will only receive the discount on other eligible items in your cart.)"></a></span>',
	freeShippingMessage : '<span class="message" id="freeShippingMessage" title="Item is eligible for FREE shipping. View details."> Ships Free! <a class="info_icon" data-tooltip="We offer FREE SHIPPING on thousands of items every day! Look for the &quot;Free Shipping&quot; indicator on all eligible merchandise. Shipping will automatically be deducted at checkout. *Please note: This offer is valid only on eligible items, and does not apply to in-store orders. This offer is limited to standard delivery within the 48 contiguous US states and APO/FPO addresses. Excludes bulk orders and drop ships. Entire order must ship to a single address. Customer is responsible for shipping costs on returned merchandise. May not be used toward purchase of Gift Cards or team orders. Promotion may be modified or terminated at any time. Certain restrictions and exclusions may apply."></a></span>',
	shipRestrictionMessage: '<span class="message" id="shipRestrictionMessage" title="There are shipping restrctions on this item. View details."> International shipping restrictions may apply <a class="info_icon" data-tooltip="International shipping restrictions apply. International customers will be informed during check-out if restrictions apply to your country. "></a></span>',
	webExclusive : '<span class="message" id="webExclusive">Web Exclusive</span>',
	selectedSize : null, // Current Size selected
	pdpStyle : 'tabbed', // Changes layout of PDP --- inline, tabbed, jumpinline
	pinInfo : true,
	pinTabs : true,
	styleReference : [
		'attributes',  // 0
		'excludedFromDiscount',  // 1
		'availableForPurchase',  // 2
		'XforY',  // 3
		'fitIcon',  // 4
		'listPrice',  // 5
		'salePrice',  // 6
		'availableSizes',  // 7
		'scene7Enabled',  // 8
		'hasArticles',  // 9
		'hasVideos',  // 10
		'tieredPricing',  // 11
		'metadata',  // 12
		'team',  // 13
		'player',  // 14
		'color',  // 15
		'width',  // 16
		'shortDescription',  // 17
		'icon1',  // 18
		'icon2',  // 19
		'shippingChargeAmount',  // 20
		'shippingChargeType',  // 21
		'hasYMALS',  // 22
		'hasXforY',  // 23
		'primaryColor',  // 24
		'secondaryColor',  // 25
		'premierSourceCodes'  // 26
	]
}

// Scene7 AJAX Response
function s7jsonResponse(obj, id) {
	var imageSetArray = [];
	productVariables.views = [];







	try {
		
		imageSetArray = obj['IMAGE_SET'].split(",");
		productVariables.views = imageSetArray;
		
		$('div[data-info=product_images]').attr({'id':'product_images','class':'spotlight'});
		if($('div[data-info=product_images] #selected_item').html() == null) {
			$('div[data-info=product_images]').append('<div id="selected_item" class="slide_content">'
				+ '<ul>'
				+ '</ul>'
			+ '</div>');
		}
		$('div[data-info=product_images] #selected_item').html('<ul></ul>');
		$('div[data-info=product_images] .slide_buttons').remove();
			
		if(imageSetArray.length >= 1 && imageSetArray != "") {
			$.each(imageSetArray, function(i, img) {
				
			    $('div[data-info=product_images] #selected_item ul').append('<li><div class="alt_view"><img src="http://images.footlocker.com/is/' + sku_nbr + '/zoom/' + productVariables.productName + '" class="reg_image d" border="0" alt="' + productVariables.modelData.NM + '" /><img class="zoom_image" data-zoomsrc="' + scene7url + '/' + img.split(";")[0] + '" border="0" alt="' + productVariables.modelData.NM + '"/></div><div class="pdp_sprite product_shadow"></div></li>');
				
				/*$('div[data-info=product_images] #selected_item ul').append('<li><div class="alt_view"><img src="' + scene7url + '/' + img.split(";")[0] + '?wid='+productVariables.mainImageSize[1]+'&hei='+productVariables.mainImageSize[1]+'" class="reg_image d" border="0" /><img class="zoom_image" data-zoomsrc="' + scene7url + '/' + img.split(";")[0] + '" border="0" /></div><div class="pdp_sprite product_shadow"></div></li>');*/
			});
			$('#product_images .alt_view').inlineZoom(productVariables.inlineZoomSettings);
				$.extend(productVariables.productSpotlightSettings, {'transition':'slide','endStop':true,'rotate':false,'onSnap':function() {
					$('div[data-info=product_images] .slide_buttons a').removeClass('disable');
					if(productVariables.productSpotlight.curSlide == 0) {
						$('div[data-info=product_images] .sl_previous').addClass('disable');
					}
					if(productVariables.productSpotlight.curSlide == $('div[data-info=product_images] .slide_content ul li').length - 1) {
						$('div[data-info=product_images] .sl_next').addClass('disable');
					}
				}});

				productVariables.productSpotlight = $('#product_images').spotlight(productVariables.productSpotlightSettings);
			
			if(imageSetArray.length > 1) {	
				if($('div[data-info=product_images] .slide_buttons').length == 0) {
					$('div[data-info=product_images]').append('<div class="slide_buttons" style="display: block;">'+
						'<a href="#" class="sl_previous left-arrow pdp_sprite" title="View Previous Image"></a>'+
						'<a href="#" class="sl_next arrow pdp_sprite" title="View Next Image"></a>'+
					'</div>');
					$('div[data-info=product_images] .sl_previous').on('click', function(e) {
						e.preventDefault();
						productVariables.productSpotlight.previousSlide();
					});
					$('div[data-info=product_images] .sl_next').on('click', function(e) {
						e.preventDefault();
						productVariables.productSpotlight.nextSlide();
					});
				}
			} else {
				$('div[data-info=product_images] .slide_buttons').remove();
			}

			$('#selected_item').show();
			$('#zoominit').show(); 
			productVariables.productSpotlight.resizeSpotlight();
			if($('.fullscreen-maximize').length === 0) {
				$('.shoe_images').prepend('<a href="#full_screen" id="open_pushdown" class="full_toggle pdp_sprite fullscreen-maximize" title="View Full Screen"></a>');
			};
			$('#open_pushdown').fullScreen({data:obj});
			$('#open_pushdown').on('click',cmConversionEventViewLargerImage);
		} else {
		    console.log('NON-SCENE7');
			$('div[data-info=product_images] #selected_item ul').html('<li><img src="' + scene7url.replace(/\/is\/image\//, '/pi/') + '/' + sku_nbr + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" class="reg_image" border="0" alt="' + productVariables.modelData.NM + '" /><div class="pdp_sprite product_shadow"></div></li>');
			if(typeof(productVariables.productSpotlight.numSlides) != 'undefined') {
				productVariables.productSpotlight.numSlides = 1;
			}
			productFunctions.scene7Unavailable();
		}

		
	} catch(err) {}
}

var productFunctions = {
	
	// initialize PDP functionality
	init : function() {
		$('div[data-info=product_images]').empty();
		// test
		//productVariables.timeToHL = 10;
		//Prod
		$.getScript('/images/common/js/timevariable.cfm?variable=curTime', function(){
		
			productVariables.timeToHL = parseInt(productLaunchTimeUntil);
			productVariables.globalTimer = productVariables.pageLoadedTS = epoch;
			productVariables.hlEnd = productVariables.pageLoadedTS + productVariables.timeToHL;
			productVariables.globalTimerHandle = setInterval(function(){
				productVariables.globalTimer++;
			}, 1000);
			productFunctions.initHotLaunch();
		
		});
		
		if(BORISEnabled) {
			$('div[data-info=product_delivery]').attr({'class':'delivery top_item'});
			$('div[data-info=add_to_cart]').attr({'class':'add_to_cart bottom_item'});
		} else {
			$('div[data-info=add_to_cart]').attr({'class':'add_to_cart bottom_item top_item'});
			$('div[data-info=product_delivery]').hide();
		}
		if(productVariables.TOUCH_DEVICE) {
			productVariables.tooltipAction = 'click';	
		}
		
		productFunctions.getDescription();
		productFunctions.getOtherStyles();
		productFunctions.getVideos();
		productFunctions.getRecentlyViewed();
		productFunctions.getRecommendations();
		productFunctions.getReviews();
		productFunctions.getQuestions();
		productFunctions.updateImages(false);
		productFunctions.getArticles();
		// Uses Ratings jquery.lib plugin to display Star Ratings
		$('.ratings').ratings();
		$('.pdp_wrapper #lbl_shiptohome').on('click', function() {
			$('#pdp_fulfillmentType').val('SHIP_TO_HOME');
		});
		$('.pdp_wrapper #lbl_storepickup').on('click', function() {
			productFunctions.launchStoreOverlay();
		});
		
		productFunctions.initTabs();
		
		// Load initially hidden items for inline view
		if(productVariables.pdpStyle.indexOf('inline') !== -1) {
			productFunctions.getSizing();
			$('[data-tabcontent]').show();
		}
		
		productFunctions.initDock();
		productFunctions.loadHash();
		
		// iOS fix for label functionality
		$("label[for],input[type='radio']").bind("click", function(e) {
			e.stopPropagation();
		});
		productFunctions.addRadioListener('.delivery');
		if(productVariables.TOUCH_DEVICE) {
			$('body').attr('data-touch', 'true');	
		}
	},
	launchStoreOverlay : function() {
		onFindStoreLinkClick();
		launchStorePickupOverlay('pdp', isaPDPCallback,0,0);
	},
	initHotLaunch : function() {
		//productVariables.timeToHL -= 1;
		productVariables.timeToHL = productVariables.hlEnd - productVariables.globalTimer;
		productFunctions.killHotLaunchTimer();
		$("#pdp_timer").empty();
		$('[data-info=add_to_cart]').hide();
		$('[data-info=add_to_wishlist]').hide();
		$('[data-launchhide]').hide();
		$('[data-info=product_delivery] #dm_storepickup').hide();
		$('[data-info=product_delivery]').hide();
		if(productVariables.timeToHL < 0 || !productFunctions.checkHotLaunchItem($("#pdp_selectedSKU").val())) {
			productFunctions.updateSizes();
			$("#pdp_addToCart").show();
			$('[data-info=add_to_cart]').show();
			$('[data-info=add_to_wishlist]').show();
			$('[data-launchhide]').css({'display':'block'});
			$("#pdp_timer").hide();
			$("#pdp_hotsku_max").hide();
			$('#launchPostCopy').hide();
			productFunctions.killHotLaunchTimer();
			if(productLaunchStyles.indexOf($("#pdp_selectedSKU").val()) !== -1) {
				if(productFunctions.checkHotSkuQtyOverMax($("#pdp_selectedSKU").val(), $("#pdp_quantity").val())) {
					$("#pdp_timer").append('<span class="launch_max_copy">'+productVariables.launchMaxCopy+'</span>');
				}
			}
			if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['ELIGIBLE_SHIPTOSTORE'] && productLaunchStyles.indexOf($("#pdp_selectedSKU").val()) === -1) {
				if(BORISEnabled) {
					$('[data-info=product_delivery] #dm_storepickup').show();
					$('[data-info=product_delivery]').show();
				}
				$('#addToWishlist').show();
			}
			if(productLaunchStyles.indexOf($("#pdp_selectedSKU").val()) !== -1) {
				if($('#launchPostCopy').length == 0){
					$('#launchPostCopy').remove();
					$('#select_size').after($('<div />', {'id':'launchPostCopy'}).html('<span class="launch_copy">'+productVariables.launchCopy+'</span>'));
				} else {
					$('#launchPostCopy').html('<span class="launch_copy">'+productVariables.launchCopy+'</span>')
				}
				$('#launchPostCopy').show();
				$('#deliveryMethod_shiptohome').click();
			}
			return;
		} else {
			$('[data-info=product_delivery]').hide();
			$('div[data-info=product_sizes]').html('<div id="pdp_timer"></div>');
			$("#pdp_timer").show();
			$("#pdp_hotsku_max").show();	
		}
		var sec = productVariables.timeToHL % 60;
		var min = parseInt(productVariables.timeToHL / 60) % 60;
		var hour = parseInt(productVariables.timeToHL / (60 * 60));
		
		$("#pdp_timer").append('<span class="title">'+productVariables.timerLabels[0]+'</span><span class="time">'+hour + " " + productVariables.timerLabels[1] + " " + min + " " + productVariables.timerLabels[2] + " " + sec + " " + productVariables.timerLabels[3]+'</span>');
		$("#pdp_timer").append('<span class="launch_copy">'+productVariables.launchCopy+'</span>');
		productVariables.timerID = setTimeout("productFunctions.initHotLaunch()", 1000);
	},
	killHotLaunchTimer : function() {
		clearTimeout(productVariables.timerID);
	},
	checkHotLaunchItem : function(sku) {
		return (productLaunchStyles.indexOf(sku) !== -1 && productVariables.timeToHL > 0) ? true : false;
	},
	checkHotSkuQtyOverMax : function(sku, quantity) {
		if ( productLaunchStyles.indexOf(sku) !== -1 && productVariables.hot_launch_max_per_order > 0 && productFunctions.checkHowManyHLSKU(sku) + parseInt(quantity) > productVariables.hot_launch_max_per_order ){
			return true;
		}
		return false;
	},
	checkHowManyHLSKU : function(sku) {
		// sku,qty|sku,qty
		var hlincart = readCookie("HLCOUNT");
		var cartskus = readCookie("CARTSKUS");
		if (hlincart != null) {
			var matchSku = false;
			var skuitems = decodeURIComponent(cartskus).split( "," );
			for (var s = 0; s < skuitems.length; s++) {
				if(skuitems[s] == sku) {
					matchSku = true;	
				}
			}
			var hlitems = decodeURIComponent(hlincart).split( "|" );
			for (var e = 0; e < hlitems.length; e++) {
				var hlitem = hlitems[ e ].split(":");
				if (hlitem[ 0 ] == sku && matchSku) { 
					return parseInt(hlitem[ 1 ]);
				}
			}
		}
		return 0
	},
	validateProduct : function() {
		var size = $("#pdp_selectedSize").val();
		var quantity = $("#pdp_quantity").val();
		var sku = $("#pdp_selectedSKU").val();
		var style = styles[sku];
		var errMsg = "";
		var errCount = 0;
		if(productFunctions.checkHotLaunchItem(sku) || !productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableForPurchase')]) {
			errMsg = "<li>This item is currently unavailable for purchase.</li>";
			return errMsg;
		}
	
		//var selectedSizeTag = _anchorTagForSize(size);
	
		if (!model.HASSIZES || ("PICKUP_IN_STORE" == $("#pdp_fulfillmentType").val() || (size != ""))) {
			var selectedSizeAvailable = true;
		} else {
			var selectedSizeAvailable = false;
		}
		if (model.HASSIZES && size.trim() == "") {
			errMsg += "<li>Please select a size.</li>";
			errCount++; 
		}
	
		if (/^\d+$/.test(quantity) == false || quantity <= 0 || quantity >= 256) {
			errMsg += "<li>Please enter a valid quantity.</li>";
			errCount++;
		}
	
		if (errCount < 2 && typeof hasgriptape != 'undefined' && hasgriptape == true) {
			var griptape = $("#pdp_griptape").val();
			if (griptape.trim() == "") {
				errMsg += "<li>Please select a grip tape.</li>";
				errCount++;
			}
		}
		
		if(productFunctions.checkHotSkuQtyOverMax(sku, quantity)) {
			errMsg = "<li>Order quantity is limited on this product to " + productVariables.hot_launch_max_per_order + " per customer.</li>";
			return errMsg;
		}
		
		return errMsg;
	},
	displayError : function(obj, message) {
		console.log(obj.html());
		obj.html(message);
		obj.show();
		$(document).unbind('click',productFunctions.clearError);
		$(document).bind('click',{obj:obj,message:message}, productFunctions.clearError);
	},
	clearError : function(e) {
		e.data.obj.hide();
		$(document).unbind('click',productFunctions.clearError);
	},
	// Call To Swap Sku/Style
	changeSku : function(sku, selected) {
		var tempSku = sku_nbr;
		sku_nbr = sku;
		$('.add_to_cart input').removeClass('active_step');
		productFunctions.updateAttr();
		if(!selected) {
			productFunctions.updateImages(sku);
		} else {
			if(sku != tempSku || $('#selected_item').html() == null) {
				productFunctions.updateImages(false);
			} else {
			}
		}
		productFunctions.updatePrice();
		productFunctions.updateSizes();
		productFunctions.getFitInfo();
		productFunctions.updateMessaging();
		$('a[data-sku='+sku+']').addClass('selected');
		$('#pdp_model').val(model_nbr);
		$('[data-info=product_sku]').html(sku);
		$('.info_icon').each(function() {
			try {
				if(typeof(productVariables.tooltipSettings.closeButton) === 'undefined') {
					$.extend(productVariables.tooltipSettings, {'closeButton':productVariables.TOUCH_DEVICE});
				}
				Tipped.create(this, $(this).attr('data-tooltip'), productVariables.tooltipSettings);
				$(this).attr('title', $(this).parent().attr('title'));
			} catch(err){}
		});
		$('#pdp_selectedSKU').val(sku_nbr);
		productFunctions.initHotLaunch();
		if(!selected) {
			sku_nbr = tempSku;
		}
	},
	scene7Unavailable : function() {
		$('.fullscreen-maximize').remove();
		$('#zoominit').hide();
	},
	// Call to Scene7 to update Alternate Views
	updateImages : function(sku) {
		if(typeof(sku) === 'string') {
			if($('div[data-info=product_images] #hover_item').html() == null) {
				$('div[data-info=product_images]').append('<div id="hover_item">'
					+ '<ul><li></li>'
					+ '</ul>'
				+ '</div>');
			}
			
			if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('scene7Enabled')]) {
				$('#zoominit').show();
							
				$('div[data-info=product_images] #hover_item ul li').html('<img src="' + scene7url.replace(/image\//, '') + '/' + sku + '/' + productVariables.mainImageSize[0] + '/" class="reg_image a" data-imageType="scene7" data-pisrc="' + scene7url.replace(/\/is\/image\//, '/pi/') + sku + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" border="0" alt="' + productVariables.modelData.NM + '" /><div class="pdp_sprite product_shadow"></div>');
				
			/*	$('div[data-info=product_images] #hover_item ul li').html('<img src="' + scene7url.replace(/image\//,'')+'/' + sku + '/'+productVariables.mainImageSize[0]+'/" class="reg_image" data-imageType="scene7" data-pisrc="' + scene7url.replace(/\/is\/image\//,'/pi/')+'/' + sku + '/'+productVariables.mainImageSize[0]+'/'+productVariables.productName+'" border="0" /><div class="pdp_sprite product_shadow"></div>');*/
			} else {
				$('#zoominit').hide();
				$('div[data-info=product_images] #hover_item ul li').html('<img src="' + scene7url.replace(/\/is\/image\//, '/pi/') + sku + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" class="reg_image" border="0" alt="' + productVariables.modelData.NM + '" /><div class="pdp_sprite product_shadow"></div>');
			}
			$('[data-imageType="scene7"]').error(productFunctions.scene7ErrorLoad);
		} else {
			if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('scene7Enabled')]) {
				$('#zoominit').show();
				$.ajax({
						url:		scene7url+'EBFL/' + sku_nbr + '?req=imageset,json'
					,	dataType:	'script'
					,	error: 		function(error) {
										;
									}
					,	success:	function(data) {
										;
									}
						// 's7jsonResponse' is the named function returned by the ajax object above (data)
				});
			} else {
				$('div[data-info=product_images]').attr({'id':'product_images','class':'spotlight'});
				if($('div[data-info=product_images] #selected_item').html() == null) {
					$('div[data-info=product_images]').html('<div id="selected_item" class="slide_content">'
						+ '<ul><li></li>'
						+ '</ul>'
					+ '</div>');
				}
				$('div[data-info=product_images] #selected_item').html('<ul><li></li></ul>');
				$('div[data-info=product_images] #selected_item ul li').html('<img src="' + scene7url.replace(/\/is\/image\//, '/pi/') + sku_nbr + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" class="reg_image" border="0" alt="' + productVariables.modelData.NM + '" /><div class="pdp_sprite product_shadow"></div>');
				$('#product_images .slide_buttons').remove();
				if(typeof(productVariables.productSpotlight.numSlides) != 'undefined') {
					productVariables.productSpotlight.numSlides = 1;
				}
				productFunctions.scene7Unavailable();
				$('#zoominit').hide();
			}
		}
	},
	
	// Call to Update Messaging
	updateMessaging : function() {
		$('[data-info=product_messaging]').empty();
		if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['FREE_STANDARD_SHIPPING']) {
			$('[data-info=product_messaging]').append(productVariables.freeShippingMessage);
			$('#dm_shiptohome').attr('data-free_shipping', 'true');
		} else {
			$('#dm_shiptohome').attr('data-free_shipping', 'false');
		}
		if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['CHANNEL_AVAIL_ICON'] == 'WEB_ONLY') {
			$('[data-info=product_messaging]').append(productVariables.webExclusive);
		}
		if(typeof(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['IS_NEW_ARRIVAL']) !== 'undefined' && productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['IS_NEW_ARRIVAL']) {
			$('[data-info=product_messaging]').append(productVariables.netItemMessage);	
		}
		if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('hasXforY')]) {
			$('[data-info=product_messaging]').append('<a href="/XYPromo/model:'+model_nbr+'/sku:'+sku_nbr+'/?xyMessage=back" class="message" data-xfory="'+productVariables.styleData[sku_nbr][productFunctions.getStyleValue('XforY')].split('.')[0]+'">&nbsp;</a>');	
		}
		if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')] !== "truesize.gif" && productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')] !== '') {
			$('[data-info=product_sizes]').append('<div class="fitIcon" data-fiticon="'+productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')].split('.')[0]+'"></div>');	
		}
	},
	
	// Call to Update Select Size section for current SKU
	updateSizes : function() {
		if(model.HASSIZES) {
			$('div[data-info=product_sizes]').html($('<a />',{'href':'#sizes'}).html('<span class="indicator pdp_sprite"></span><span class="arrow pdp_sprite"></span>')).attr({'id':'select_size'});
			$('div[data-info=product_sizes]').append($('<div />',{'id':'sizes'}));
			$('div[data-info=product_sizes] #sizes').html($('<select />',{'size':8,'id':'product_sizes'}));
			
			if(!productVariables.displaySFS) {
				productVariables.SFSMessage = '';
			}
			
			if(productVariables.showOutOfStock) {
				$.each(productVariables.modelData.AVAILABLE_SIZES, function(m, modelSize) {
					$('div[data-info=product_sizes] #sizes select').append('<option value="'+$.trim(modelSize)+'" data-modelsize="'+$.trim(modelSize).replace(/[^0-9a-z-]/gi, '_')+'" disabled data-sfs="false" class="disabled">'+$.trim(modelSize)+'</option>');
				});
				$.each(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')], function(s, size) {
					$('div[data-info=product_sizes] #sizes select option[data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').removeAttr('disabled').removeClass('disabled');
					if(size[4].toLowerCase() == 'n' && size[5].toLowerCase() == 'y') {
						$('div[data-info=product_sizes] #sizes select option[data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').append(productVariables.SFSMessage).attr('data-sfs','true');
						
					}
				});
			} else {
				$.each(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')], function(s, size) {
					$('div[data-info=product_sizes] #sizes select').append('<option value="'+$.trim(size[0])+'" data-modelsize="'+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+'">'+$.trim(size[0])+'</option>');
					if(size[4].toLowerCase() == 'n' && size[5].toLowerCase() == 'y') {
						$('div[data-info=product_sizes] #sizes select option[data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').append(productVariables.SFSMessage).attr('data-sfs','true');
					}
				});
			}
			
			$('div[data-info=product_sizes] #sizes select option:disabled').append(productVariables.outOfStockMessage);
			$('div[data-info=product_sizes] #sizes').hide();
			$('div[data-info=product_sizes] #sizes select').on('change blur', productFunctions.selectSize);
			$('div[data-info=product_sizes] #sizes select').on('mouseup touchstart', function(e){
				if($('div[data-info=product_sizes] #sizes select').val() == $('#pdp_selectedSize').val() && e.target.nodeName.toLowerCase() !== 'select' && $('div[data-info=product_sizes] #sizes select').val() !== null){
					$('div[data-info=product_sizes] #sizes select').change();
				}
			});
			/*if(productVariables.TOUCH_DEVICE) {
				$('div[data-info=product_sizes] #sizes select option').on('click touchstart', function(e){
					if($('div[data-info=product_sizes] #sizes select option[value="'+$("#pdp_selectedSize").val()+'"]').attr('disabled') != 'disabled') {
						$('div[data-info=product_sizes] #sizes select').change();
					}
					//$('div[data-info=product_sizes] a').pushdown('open');
				});
			}*/
			$('div[data-info=product_sizes] a').pushdown({'animation':false,'callback':function(){$(window).scroll();}});
			if($("#pdp_selectedSize").val() != '' && ($('div[data-info=product_sizes] #sizes select option[value="'+$("#pdp_selectedSize").val()+'"]').length > 0 && $('div[data-info=product_sizes] #sizes select option[value="'+$("#pdp_selectedSize").val()+'"]').attr('disabled') != 'disabled')) {
				$('div[data-info=product_sizes] #sizes select option[value="'+$("#pdp_selectedSize").val()+'"]').attr("selected", "selected");
				$('div[data-info=product_sizes] #sizes select').change();
			} else {
				$('div[data-info=product_sizes] a').pushdown('open'); 
			}
			// update size selection for Touch Devices
			if(productVariables.TOUCH_DEVICE) {
				$('div[data-info=product_sizes] #sizes select').appendTo('div[data-info=product_sizes]');
				$('div[data-info=product_sizes]').addClass('touch_device');
				$('div[data-info=product_sizes] a').on('click', function(e){return false;});
				$('#sizes').show();
				$('#select_size').addClass('active_step');
				$('#product_sizes').removeAttr('size');
			}
			$('div[data-info=product_sizes] #sizes').append($('<div />',{'data-info':'fit_info'}));
			if(productVariables.fitGuarentee != '') {
				$('div[data-info=product_sizes] #sizes').append($('<a />',{'data-info':'fit_guarentee','href':productVariables.fitGuarentee}));
			}
			$('div[data-info=product_sizes] #sizes').append($('<div />',{'id':'size_footer'}));
		} else {
			productFunctions.selectSize('');	
		}
	},
	
	// Action when size is selected
	selectSize : function(size) {
		$('#pdp_selectedSize').val('');
		if(size) {
			if(productVariables.TOUCH_DEVICE) {
				$('#select_size').removeClass('active_step');
				$('div[data-info=product_sizes] a[data-href="#sizes"]').removeClass('selected');
			}
			$('#select_size a[data-href="#sizes"]').attr('data-content',$(this).val()).addClass('size_selected');
			$('div[data-info=product_sizes] a[data-href="#sizes"]').pushdown('destroy');
			$('div[data-info=product_sizes] a[data-href="#sizes"]').pushdown({'animation':true});
			
			if(!productVariables.TOUCH_DEVICE){
				$('div[data-info=product_sizes] a[data-href="#sizes"]').pushdown('close');
			}
			if($(this).children('option:selected').attr('data-sfs') == 'true') {
				$('#pdp_fulfillmentType').val('SHIP_FROM_STORE');	
			}
			$('#pdp_selectedSize').val($(this).val());
		}
		$('.add_to_cart input').addClass('active_step');
		productFunctions.updatePrice(); // Update price when size has changed.
		$('[data-info=add_errors]').empty();
		$('[data-info=add_errors]').hide();
	},
	
	getArticles : function() {
		if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['IS_STRIPERPEDIA']) {
			$.ajax({
					url:		productVariables.striperpediaContent + sku_nbr,
					dataType:	'json',
					error: 		function(error) {
						console.log('ERROR'+ error);
					},
					success:	function(data) {
						console.log(JSON.stringify(data));
						$('.pdp_description').append('<div id="articles"><div class="heading">Articles<span class="highlight"></span></div></div>');
						$.each(data, function(i, item) {
							if(item.Type.toLowerCase() == 'article') {
								var html = '<div class="article_entry">';
								html += '<span class="article_title"><span class="thumbnail"><img src="/ns/striperpedia/content/thumb/'+item.Code+'.jpg" border="0"/></span><span class="title">'+item.DisplayName+'</span></span>';
								html += '<div id="entry_'+item.ID+'" class="article_content">'+item.Text+'</div>';
								html += '</div>';
								$('#articles').append(html);
								
								if($.trim($('#entry_'+item.ID + ' p:first').html()) == '&nbsp;') {
									$('#entry_'+item.ID + ' p:first').addClass('emptyParagraph');
								}
								$('#entry_'+item.ID).readmore(productVariables.readmoreSettings);
							}
						});
						
						if($('.article_entry').html() == null) {
							$('#articles').remove();	
						}
					}
			});
		}
	},
	
	// Updates Attributes below product image
	updateAttr : function() {
		$('[data-info=product_attr]').html(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('attributes')]);
		$('.sku_messaging').empty();
		if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('excludedFromDiscount')]) {
			$('.product_info .sku_messaging').append(productVariables.excludedMessage);	
		}
		if(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['SHIPPING_RESTRICTION_EXISTS']) {
			$('.product_info .sku_messaging').append(productVariables.shipRestrictionMessage);	
		}
		
	},
	
	// Get FIT Info 
	getFitInfo : function() {
		var fitIcon = productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')];
		if(fitIcon !== '' && typeof(fitIcon) !== 'undefined') {
			$.ajax({
				url:		productVariables.fitInfoJSON,
				dataType:	'json',
				error: 		function(error) {
					console.log('ERROR'+ error);
				},
				success:	function(data) {
					$('div[data-info=fit_info]').attr('data-fitinfo',fitIcon);
					if(fitIcon !== 'truesize.gif' || productVariables.showTrueSize){
					    $('div[data-info=fit_info]').html('<div class="fitInfoTitle"><span class="fit-notice-left-shoe pdp_sprite"></span><span class="title"></span><span class="fit-notice-shoe pdp_sprite"></span></div><div class="fitInfoContent"><p title="Length runs ' + data[fitIcon][1] + ' width runs ' + data[fitIcon][2] + '">' + data[fitIcon][4] + '</p></div>');
					} else {
						$('div[data-info=product_sizes]').attr('data-showfit','false');	
					}
					if(fitIcon != '' && fitIcon != null) {
						$('div[data-info=fit_icon]').html('<div class="heading">Fit Guide<span class="highlight"></span></div><img src="'+productVariables.fitInfoImgBaseURL + fitIcon + '" border="0" /><div><span class="fit_description">' + data[fitIcon][3]+'<span></div><div class="fit_info_wrappers"><div><span data-label="fit_length" class="label"></span><span data-value="fit_length" class="value">' + data[fitIcon][1]+'<span></div><div><span data-label="fit_width" class="label"></span><span data-value="fit_width" class="value">' + data[fitIcon][2]+'<span></div></div>');
						$('.pdp_sizing div[data-info=fit_icon]').show();
					}
					
					if(data[fitIcon][1].toLowerCase().indexOf('true') === -1) {
						$('[data-value="fit_length"]').addClass('highlight');
					}
					if(data[fitIcon][2].toLowerCase().indexOf('true') === -1) {
						$('[data-value="fit_width"]').addClass('highlight');
					}
				}
			});
		} else {
			
			$('.pdp_sizing div[data-info=fit_icon]').hide();
			$('div[data-info=product_sizes]').attr('data-showfit','false');
			
			if($.trim(model.SIZECHART_CD) == '') {
				$('a[data-tab=sizing]').hide();
			} else {
				$('a[data-tab=sizing]').show();
			}
		}
	},
	
	// Updates price of current SKU
	updatePrice : function() {
		if($('#pdp_selectedSize').val() != '') {
            // If a size has been selected then we want to look that size up in the array to determine if it's price/sale price are different.
            var newSize = $('#pdp_selectedSize').val(); // Set a variable with the newly selected size.
            var arrayOfSizes = productVariables.styleData[sku_nbr][7]; // Create new array equal to the the "array of sizes" based upon the selected sku.
            var sizePrice = 0; // Initialize sizePrice.
            var sizeSalePrice = 0; // Initialize sizeSalePrice.

            for (i = 0; i < arrayOfSizes.length; i++) {
                // Loop through the array of sizes and look for a match with the selected size. 
                // Each element in the array is another array with the details of that particular size.
                var sizeData = arrayOfSizes[i]; // Create and array with the details for this size.

                if (sizeData[0].trim() == newSize) {
                    // If the size of the array element we are working with matches the selected size update the prices and break out of the loop.
                    sizePrice = sizeData[1]; // Update price.
                    sizeSalePrice = sizeData[2]; // Update saleprice.
                    break; // Break out of the loop.
                }
            }

            if (sizePrice == 0) {
                // If the variable sizePrice is still 0 that means we didn't find a match and we should set the price back to the sku level values.
                var sizePrice = parseFloat(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('listPrice')]);
                var sizeSalePrice = parseFloat(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('salePrice')]);
            }
        } else {
            // A size hasn't been selected; we should set the prices based on the sku level values.
            var sizePrice = parseFloat(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('listPrice')]);
            var sizeSalePrice = parseFloat(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('salePrice')]);
        }

		$('div[data-info=product_price]').html('<div class="regular_price"><span class="label">'+productVariables.nonSaleLabel+'</span> <span class="value">$' + sizePrice + '</span></div>');
		
		if(sizePrice != sizeSalePrice) {
			$('div[data-info=product_price] .regular_price').attr({'class':'old'});
			$('div[data-info=product_price] .old .label').html(productVariables.regularPriceLabel);
			$('div[data-info=product_price]').append('<div class="sale"><span class="label">'+productVariables.saleLabel+'</span> <span class="value">$' + sizeSalePrice + '</span></div>');
			
			var discount = sizePrice - sizeSalePrice;
			
			var sale = discount / sizePrice;
			
			if(productVariables.displayPercent) {
				$('div[data-info=product_price]').append('<div class="percent"><span class="label">'+productVariables.percentLabel+'</span> <span class="value">' + Math.floor(sale.toFixed(2) * 100) + '%</span></div>');
			}
			
			if(productVariables.displaySavings) {
				$('div[data-info=product_price]').append('<div class="savings"><span class="label">'+productVariables.savingsLabel+'</span> <span class="value">$' + discount.toFixed(2) + '</span></div>');
			}
		}
	},
	
	getStyleValue : function(index) {
		return productVariables.styleReference.indexOf(index);
	},
	// Loads Recommendations(MyBuys)
	getRecommendations : function() {
		if(mybuys != undefined) {
			mybuys.setPageType("PRODUCT_DETAILS");
			mybuys.set("productid",sku_nbr);
			console.log('START MYBUYS');
			//mybuys.dataResponseCallback = 'productFunctions.myBuysCallback';
			mybuys.initPage();
		}
	}/*,
	myBuysCallback : function(data) {
		console.log('MYBUYS : ');
		if($('#mybuyszone2').html() == '') {
			//$('[data-info="product_recommendations"]').show();
		}
	}*/,	
	// Load Recently Viewed with jquery.lib plugin based on cookie value
	getRecentlyViewed : function() {
		var skus = $.cookie('read','CARTSKUS');
		var skuArray = skus.split(',');
		skuArray.push(sku_nbr);
		$.extend(productVariables.recentlyViewedOptions,{'excludedSkus':skuArray});
		$('.recently_viewed .rv_content').recentlyViewed(productVariables.recentlyViewedOptions);
		if($('.recently_viewed .rv_content ul li').length == 0) {
			$('.recently_viewed .rv_title').hide();
		}
	},
	scene7ErrorLoad : function(e) {
		console.log('SCENE7 IMAGE : ' + $(this).attr('data-pisrc'))
		$(this).attr('src',$(this).attr('data-pisrc'));
		$('#zoominit').hide();
		console.log('ERROR SCENE7');
	},
	// Loads other styles (if loading via AJAX)
	getOtherStyles : function() {
		console.log('getOtherStyles');
		
		
		var imgCount = 0;
		var html = '';
		var selectedThumb = '';
		var matchedSku = false;
		var firstSlide = true;
		
		productVariables.productName = $("#model_name").html();
		
		  productVariables.productName = $.trim(productVariables.productName.toString().toLowerCase());
           productVariables.productName = productVariables.productName.replace(/'/ig,'');
           productVariables.productName = productVariables.productName.replace(/ +/ig,'-');
           productVariables.productName = productVariables.productName.replace(/-+/ig,'-');
           productVariables.productName = productVariables.productName.replace(/_+/ig,'-');
		   
		
		$('div[data-info=product_styles]').attr({'id':'product_styles','class':'spotlight other_styles'});
		if($('div[data-info=product_styles] .slide_content').html() == null) {
			$('div[data-info=product_styles]').html('<div class="slide_content">'
				+ '<ul><li></li>'
				+ '</ul>'
			+ '</div>');
		}
		$('div[data-info=product_styles] .slide_content ul').empty();
		
		var selectedSku = document.URL;
			selectedSku = selectedSku.substring(selectedSku.indexOf("sku:")+4, selectedSku.length);
			selectedSku = selectedSku.substring(0, selectedSku.indexOf("/"));
		
		selectedSku = sku_nbr;
		
		$.each(productVariables.styleData, function(s, style) {
			if(imgCount == 0) {
				html += '<li><span class="group">';
			}

			if(s == selectedSku){
				//selectedThumb = '<a href="javascript:void(0);" title="'+style[productFunctions.getStyleValue('attributes')].replace(/"/gi,'&quot;')+'" data-sku="'+s+'"><img src="'+scene7url.replace(/image\//,'').replace(/\/is\//,'/pi/')+s+'/'+productVariables.otherStylesOptions.imageSize[0]+'/'+productVariables.productName+'" data-pisrc="'+scene7url.replace(/image\//,'').replace(/\/is\//, '/pi/')+s+'/'+productVariables.otherStylesOptions.imageSize[0]+'/'+productVariables.productName+'" border="0" /></a>';
			    selectedThumb = '<a href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '"><img src="' + scene7url.replace(/image\//, '').replace(/\/is\//, '/pi/') + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" data-pisrc="' + scene7url.replace(/image\//, '').replace(/\/is\//, '/pi/') + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" /></a>';

				matchedSku = true;
		
			}/*else{
				if(style[productFunctions.getStyleValue('scene7Enabled')]) {
					html += '<a href="javascript:void(0);" title="'+style[productFunctions.getStyleValue('attributes')]+'" data-sku="'+s+'"><img src="'+scene7url.replace(/image\//,'')+'/'+s+'/'+productVariables.otherStylesOptions.imageSize[0]+'/" data-pisrc="'+scene7url.replace(/image\//,'').replace(/\/is\//, '/pi/')+'/'+s+'/'+productVariables.otherStylesOptions.imageSize[0]+'/" border="0" data-imageType="scene7" /></a>';
				}*/ 

			else {
			    //html += '<a href="javascript:void(0);" title="' + style[productFunctions.getStyleValue('attributes')].replace(/"/gi, '&quot;') + '" data-sku="' + s + '"><img src="' + scene7url.replace(/image\//, '').replace(/\/is\//, '/pi/') + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" data-pisrc="' + scene7url.replace(/image\//, '').replace(/\/is\//, '/pi/') + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" /></a>';
			    html += '<a href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '"><img src="' + scene7url.replace(/image\//, '').replace(/\/is\//, '/pi/') + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" data-pisrc="' + scene7url.replace(/image\//, '').replace(/\/is\//, '/pi/') + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" /></a>';
			}
			//}


			imgCount++;
			
			if(!matchedSku && firstSlide){
				if(imgCount == productVariables.otherStylesOptions.maxProducts - 1) {
					html += '</span></li>';
					imgCount = 0;
					firstSlide = false;
				}
			}else if(matchedSku && !firstSlide){
				if(imgCount == productVariables.otherStylesOptions.maxProducts) {
					html += '</span></li>';
					imgCount = 0;
					matchedSku = false
				}
			}else{
				if(imgCount == productVariables.otherStylesOptions.maxProducts) {
						html += '</span></li>';
						imgCount = 0;
						firstSlide = false;
					}	
			}
		});

		$('div[data-info=product_styles] .slide_content ul').html(html);
				
		if($('div[data-info=product_styles] .slide_content ul li').length > 1) {
			$('div[data-info=product_styles]').append('<div class="slide_buttons" style="display: block;">'+
				'<a href="#" class="sl_previous left-arrow pdp_sprite disable" title="View Previous Page of Alternate Styles"></a>'+
				'<a href="#" class="sl_next arrow pdp_sprite" title="View Next Page of Alternate Styles"></a>'+
			'</div>');
		}
		$('[data-imageType="scene7"]').error(productFunctions.scene7ErrorLoad);
		$.extend(productVariables.stylesSpotlightSettings, {'transition':'slide','endStop':true,'rotate':false,'onSnap':function() {
			$('div[data-info=product_styles] .slide_buttons a').removeClass('disable');
			if(productVariables.stylesSpotlight.curSlide == 0) {
				$('div[data-info=product_styles] .sl_previous').addClass('disable');
			}
			if(productVariables.stylesSpotlight.curSlide == $('div[data-info=product_styles] .slide_content ul li').length - 1) {
				$('div[data-info=product_styles] .sl_next').addClass('disable');
			}
		}});
		productVariables.stylesSpotlight = $('#product_styles').spotlight(productVariables.stylesSpotlightSettings);
		$('div[data-info=product_styles]').attr('data-numslides',productVariables.stylesSpotlight.numSlides);
		
		$(".slideitem0 .group").prepend(selectedThumb);
		
		// clone element1 and put the clone before element2
		//selectedThumb.clone().before('.slideitem0 .group a:nth-child(1)').end();
		
		// replace the original element1 with element2
		// leaving the element1 clone in it's place
		//selectedThumb.replaceWith('.slideitem0 .group a:nth-child(1)');
		
		$('div[data-info=product_styles] .sl_previous').on('click', function(e) {
			e.preventDefault();
			productVariables.stylesSpotlight.previousSlide();
		});
		$('div[data-info=product_styles] .sl_next').on('click', function(e) {
			e.preventDefault();
			productVariables.stylesSpotlight.nextSlide();
		});
		
		$('div[data-info=product_styles] a[data-sku]').on('click touchstart', function() {
			//if($(this).attr('data-sku') != $('#pdp_selectedSKU').val()) {
				$('div[data-info=product_styles] a[data-sku]').removeClass('selected');
				productFunctions.changeSku($(this).attr('data-sku'), true);
			//}
			var hashString = "#sku-" + $(this).attr('data-sku');
			var locationHash = location.hash;
			var newLocation = location + '';
			if (locationHash.trim() != '') {
				newLocation = newLocation.hash = hashString;
			} else {
				newLocation = newLocation + hashString;
			}
			//necessary for safari javascript urls
			if($.browser.safari) {
				newLocation = newLocation.replace('%2F','%252F');
			}
			location.replace(newLocation);
			
			//location.hash = 'sku-'+$(this).attr('data-sku');
		});
		if(!productVariables.TOUCH_DEVICE) {
			$('div[data-info=product_styles] a[data-sku]').unbind('mouseenter');
			$('div[data-info=product_styles] a[data-sku]').unbind('mouseleave');
			$('div[data-info=product_styles] a[data-sku]').bind('mouseenter', function(e) {
				e.stopPropagation();
				if($(this).attr('data-sku') != sku_nbr) {
					$('div[data-info=product_styles] a[data-sku]').removeClass('selected');
					productFunctions.changeSku($(this).attr('data-sku'), false);
					$('#product_images').height($('#selected_item').outerHeight());
					$('#hover_item').css({'position':'relative'});
					$('#selected_item').hide();
					$('#hover_item').show();
				}
			});
			$('div[data-info=product_styles] a[data-sku]').bind('mouseleave', function(e) {
				e.stopPropagation();
					$('#hover_item').css({'position':'absolute'});
				if($(this).attr('data-sku') != sku_nbr) {
					$('div[data-info=product_styles] a[data-sku]').removeClass('selected');
					productFunctions.changeSku(sku_nbr, true);
				}
				$('#selected_item').show();
				$('#hover_item').hide();
				$('#product_images').height('auto');
			});			
		}
	},
	getDescription : function() {
		for(var i = 1; i < 3; i++) {
			$('.icons[data-icon'+i+']').each(function() {
				if($(this).attr('data-icon'+i) != '') {
		            $(this).append('<img src="'+productVariables.productIcons+$(this).attr('data-icon'+i)+'" border="0" />');
				}
	        });
		}
		if($('.pdp_description .technical ul li').length == 0) {
			$('.pdp_description .technical .heading').remove();	
		}
	},
	// Loads videos with jquery.lib plugin and Video Feed
	getVideos : function() {
		if(productFunctions.getStyleValue('hasVideos')) {
			$('#product_videos').html('<a href="javascript:void(0);" id="show_videos"></a><div class="content"></div>');
			$.extend(productVariables.pdpVideoSettings, {'sku':sku_nbr, 'domain':'','initPlay':'true','swfpath':'/ns/flash/video-player/uat/','onPlay':function(){
				$('#video_player_wrapper').show();
				if($('#video_player_wrapper').children('#close_vid').length === 0) {
					$('#video_player_wrapper').prepend('<a href="javascript:void(0);" id="close_vid"></a>');
					$('#close_vid').on('click',function() {
						$('#show_videos').show();
						$('#product_videos .content').hide();
					});
				}				
			},'callback':function() {
				console.log($('#product_videos #video_gallery').html());
				if($('#product_videos #video_gallery').html() == null) {
					console.log($('#product_videos #video_gallery').html())
					$('#product_videos').empty();
				}	
			}});
			$('#product_videos .content').pdpVideo(productVariables.pdpVideoSettings);
			$('#product_videos .content').hide();
			$('#show_videos').on('click', function() {
				$('#show_videos').hide();
				$('#product_videos .content').show();
				$('#video_player_wrapper').show();
				$('[data-video="0"]').click();
			});
			
		} else {
			
		}
	},
	
	// Load Sizing and Fit information
	getSizing : function() {
		if(model.SIZECHART_CD !== '') {
			$('[data-tabcontent=sizing]').html('<div data-info="fit_icon"></div>');
			$('[data-tabcontent=sizing]').append($('<iframe />', {
				src : productVariables.sizingURL+model.SIZECHART_CD,
				'width' : '100%',
				frameBorder : 0,
				marginHeight: 0,
				marginWidth : 0,
				scrolling : 'no'
			}).on('load',function() {
				$(this).height($(this).contents().height());
			}));
		}
		productFunctions.getFitInfo();		
	},
	getQuestions : function() {
		$BV.ui("qa", "show_home", {
			productId: model_nbr,
			subjectType: "product",
	
			onEvent: function(json) {
				var questionCount = json.attributes.numQuestions;
				var answerCount = json.attributes.numAnswers;
				if (json.eventSource == "Display") {
				// move code from BVQADisplayed here
					if (questionCount > 0) {
						var bvALPLink = document.getElementById("BVALPLinkContainer");
						if (bvALPLink) { bvALPLink.style.display = "block"; }
					}
				}
			},
			doShowContent: function() {
				// move A&A code from bvShowTab code here
				//viewTab('answers', true);
			    //adjustTabSize('pdp_tabContent_answers', 'div');
			    $('[title="Ask a New Question "]').attr('title', 'Ask a New Question Button');
			    $('#BVQASearchFormTextInputID').attr('title', 'Search for a question')
			    $('#BVQASearchFormSubmitButtonID').attr('title', 'Submit Search');
				productFunctions.swapTabs('questions')
				//bvGoToTab('answers');
			}
		});
	},
	//Load Ratings and Reviews (BazaarVoice)
	getReviews : function() {
		$BV.configure("global", {
			submissionContainerUrl: reviewSubmissionURL
		});
		$BV.ui("rr", "show_reviews", {
			productId: model_nbr,
			onEvent: function(json) {
				var totalReviewsCount = json.attributes.numReviews;
				var avgRating = json.attributes.avgRating;
				var ratingsOnlyReviewCount = json.attributes.numRatingsOnlyReviews;
				var recommendPercentage = json.attributes.percentRecommend;
				var productID = json.productId;
			    //Setup titles for BV elements
				$('.BVRRRatingEntry .BVRRRatingNormalImage img').each(function () {
				    $(this).attr('title', 'Product Rating of ' + $(this).attr('alt'));
				});
				$('.BVRRRatingsHistogramButton .BVRRRatingsHistogramButtonImage').attr('title', 'View rating breakdown');

				$('.BVRRPager .BVRRPageNumber a').each(function () {
				    $(this).attr('title', 'Go to Page ' + $(this).attr('title').replace('Go to Page ', ''));
				});
				$('.BVRRPreviousPage a').attr('title', 'Go to Previous Page of Reviews');
				$('.BVRRNextPage a').attr('title', 'Go to Next Page of Reviews');
				if (json.eventSource == "Display") {
					// move code from ratingsDisplayed here
					bvcreateproductviewtag(totalReviewsCount, avgRating, recommendPercentage, cm_isProductMaskedPricing, cm_isLaunchSku);
					if (totalReviewsCount > 0) {
						var pdp_review_tab = document.getElementById("pdp_tabContent_reviews");
						if (pdp_review_tab != null) { pdp_review_tab.scrollTop = 0; }
						var bvRevCntr = document.getElementById("BVRRContainer");
						if (bvRevCntr) { bvRevCntr.style.display = "block"; }
						var bvSVPLink = document.getElementById("BVSVPLinkContainer");
						if (bvSVPLink) { bvSVPLink.style.display = "block"; }
						var bvSCRPLink = document.getElementById("BVRRSecondarySummaryContainer");
						if (bvSCRPLink) { bvSCRPLink.style.display = "none"; }
					}
					else {
						var bvSCRPLink = document.getElementById("BVRRSecondarySummaryContainer");
						if (bvSCRPLink) { bvSCRPLink.style.display = "block"; }
						var bvSumLink = document.getElementById("BVRRContainer");
						if (bvSumLink) { bvSumLink.style.display = "none"; }
					}
					$(".BVRRSecondaryRatingsContainer").hide();
					$("#BVRRSummaryContainer .BVRRBuyAgainContainer").hide();
					productFunctions.reviewsLoaded();
				}
			},
			doShowContent: function() {
				// move R&R code from bvShowTab code here
					//viewTab('reviews', true);
					//adjustTabSize('pdp_tabContent_reviews', 'div');
					//bvGoToTab('reviews');
					productFunctions.swapTabs('reviews', true);
					return false;
			}
		});
		
	},
	reviewsLoaded : function() {
		
	},
	
	// Add listener for labels
	addRadioListener : function(container) {
       $("input:checked").each(function(index) {
			$("label[for='" + $(this).attr("id") + "']").addClass('radio_checked'); 
		});
		
		$('input:radio').click( function() {
			$('label').removeClass('radio_checked');
			$("input:checked").each(function(index) {
				$("label[for='" + $(this).attr("id") + "']").addClass('radio_checked'); 
			});
		});
	},
	
	// Initiates pinning of elements on scroll
	initDock : function() {
		if(!productVariables.TOUCH_DEVICE) {
			if(productVariables.pinInfo) {
				$('.right_column').pinElement({pinTop:110,pinTrigger:110,container:'.pdp_wrapper'});
			}
			if(productVariables.pinTabs) {
				$('.pdp_header').pinElement({pinTop:45,pinTrigger:45});
			}
		} else {
			$('.right_column').addClass('touch_device');
			$('.pdp_header').addClass('touch_device');
		}
	},
	
	// Actions to jump to current section/tab
	swapTabs : function(tab, scroll) {
		if(productVariables.pdpStyle === 'tabbed') {
			$('div[data-tabcontent]').hide();
			$('div[data-tabcontent='+tab+']').css({'display':'inline-block'});
			$('a[data-tab]').removeClass('selected');
			$('a[data-tab='+tab+']').addClass('selected');
			$('#show_videos').show();
			$('#product_videos .content').hide();
			if($('div[data-tabcontent='+tab+']').attr('data-loaded') == 'true') {
				
			} else {
				if(tab == 'sizing') {
					productFunctions.getSizing();
					$('div[data-tabcontent='+tab+']').attr('data-loaded', 'true');
				} else if (tab == 'reviews') {
					productFunctions.getReviews();
					$('div[data-tabcontent='+tab+']').attr('data-loaded', 'true');
				} else if (tab == 'barcode') {
				    productFunctions.getBarcode();
				}
				
			}
			if(scroll) {
				// Added logic to determine which reviews tab to scroll to.
				if (tab == 'reviews' && $('.pdp_header').css('display') != 'none') {
					scrollElementIndex = 0;
				} else if (tab == 'reviews' && $('.pdp_header').css('display') == 'none') {
					scrollElementIndex = 1;
				} else {
					scrollElementIndex = $('[data-tab='+tab+']').index();
				}
				
				$(productVariables.scrollTarget).stop();
				$(productVariables.scrollTarget).animate({scrollTop: ($('[data-tab='+tab+']').eq(scrollElementIndex).offset().top - productVariables.adjust)}, 400)	
			}
			//$(window).resize();
			$(window).scroll();	
		}
		if(productVariables.pdpStyle.indexOf('jump') !== -1) {
			$('html, body').stop();
			$('html, body').animate({scrollTop: ($('[data-tab='+tab+']').offset().top - $('.pdp_header').height() - productVariables.adjust)}, 700)
		}
		//$(window).resize();
		$(window).scroll();	
	},
	
	// Initiates Tab listeners
	initTabs : function() {
		$('a[data-tab]').on('click', function() {
			productFunctions.swapTabs($(this).attr('data-tab'));
			return false;
		});
	},
	
	// Loads Hash values for dynamic loading of tabs/sku/sizes
	loadHash : function() {
		var actions = location.hash.split('\\');
		$.each(actions, function(a, value) {
			if(value.split('-')[0].toLowerCase().replace(/#/, '') == 'sku') {
				productFunctions.changeSku(value.split('-')[1], true);
			}
			if(value.split('-')[0].toLowerCase().replace(/#/, '') == 'tab') {
				productFunctions.swapTabs(value.split('-')[1]);
			}
			if(value.split('-')[0].toLowerCase().replace(/#/, '') == 'size') {
				productVariables.selectedSize = value.split('-')[1];
			}
		});		
		if(location.hash.toLowerCase().replace(/#/, '').indexOf('sku-') === -1) {
			productFunctions.changeSku(sku_nbr, true);	
		}
		if(location.hash.toLowerCase().replace(/#/, '').indexOf('tab-') === -1) {
			productFunctions.swapTabs($('.pdp_header [data-tab]:first-child').attr('data-tab'));	
		}
	}
};

$(document).ready(function (e) {
    /* URL parameters bucket */
    var searchParams = {};
    /* Break up the URL parameters for analysis */
    var searchval = window.location.search.substring(1).split('&');
    $.each(searchval, function (i, v) {
        searchval[i] = v.split('=');
        searchParams[searchval[i][0]] = searchval[i][1];
    });
    /* Initialize the PDP */
	productFunctions.init();
	$("form#product_form").submit(function(e) {
		e.preventDefault();
		addToCart();
		//miniAddToCart.openMiniAddToCart("product_form");
		return false;
	});
	$("#addToWishlist").click(function (e) {
		var errMsg = productFunctions.validateProduct();
		
		if (errMsg != "") {
			productFunctions.displayError($('[data-info=wishlist_errors]'), '<ul>'+errMsg+'</ul>');
			return false;
		} else {
			$('[data-info=wishlist_errors]').empty();	
		}
		e.stopPropagation();
		addToWishlist('PDP');
		try {
			cmCreateConversionEventTag('ADD TO WISH LIST',1,'PDP SKU ' + sku_nbr,0);
		} catch(err){}
	});
    /* Check the URL parameters */
	if (searchParams.hasOwnProperty('size') && searchParams.size !== '') {
	    $('[data-info="product_sizes"] a[data-value="' + decodeURIComponent(searchParams.size) + '"]').click(); //<- Set the desired size option
	}
});

function checkHotLaunchItem() {
	return false;
}
function validateProduct(){
	return "";
}

function showBubble(message) {
	console.log("Show Bubble");
}

function disableToCartButton() {
	$("form#product_form input[type=submit]").attr("disabled", "true");
}

function enableToCartButton() {
	$("form#product_form input[type=submit]").attr("disabled", null);
}

if(typeof(addToCart) === 'undefined') {
	function addToCart(skip) {
		$("#pdp_quantity").val($('#quantity').val());
		var errMsg = productFunctions.validateProduct();
		if (errMsg != "") {
			productFunctions.displayError($('[data-info=add_errors]'), '<ul>'+errMsg+'</ul>');
			return;
		} else {
			$('[data-info=add_errors]').empty();	
		}
	
		if ($("#deliveryMethod_storepickup").is(":checked") && $("#pdp_storeNumber").val() == 0 && skip != 'skip') {
			productFunctions.launchStoreOverlay();
			return;
		}
	
		disableToCartButton();
		if ($("#pdp_hasXYPromo").length == 0 || $("#pdp_hasXYPromo").val() == "true") {
			miniAddToCart.openMiniAddToCart("product_form");
		}
		
		enableToCartButton();
		 $.modal.close();
		
	}
}

function loadBORISWidget() {
}

function isaPDPCallback(sku, size, qty, storeNumber, fulfillmentType, storeCostOfGoods){
	$("#product_form input").each(function(index, value) {
		$element = $(value);
		switch($element.attr("name")) {
		case "sku":
			$element.val(sku);
			break;
		case "size":
			$element.val(size);
			break;
		case "qty":
			$element.val(qty);
			break;
		case "storeNumber":
			$element.val(storeNumber);
			break;
		case "fulfillmentType":
			$element.val(fulfillmentType);
			break;
		case "storeCostOfGoods":
			$element.val(storeCostOfGoods);
			break;
		}
	});

	switch (fulfillmentType) {
	case "PICKUP_IN_STORE":
	case "SEND_TO_STORE":
			$('#product_form').attr('action', replaceURL($('#product_form').attr('action'), 'cm', 'ISA PICKUPHERE'));
			break;
	case "SHIP_TO_HOME":
			$('#product_form').attr('action', replaceURL($('#product_form').attr('action'), 'cm', 'ISAADDTOCART'));
			break;
	}

	addToCart('skip');
}
function replaceURL (URL, paramName, paramValue) {
	if (typeof URL == "undefined" || URL == null)
		return "";
	
	var URLSeparator = '?';
	var paramSeparator = '=';
	var queryStringDelimSymbol = '&';
	var URLElements = URL.split(URLSeparator);
	var URLPath = "";
	var URLQueryString = "";
	if (URLElements.length == 2) {
		URLPath = URLElements[0];
		URLQueryString = URLElements[1];
	}
	else if (URLElements.length == 1) {
		URLPath = URLElements[0];
	}

	var newQueryString = '';
	var queryStringDelimiter = '';
	if (URLQueryString) {
		var i = 0;
		var queryStringElements = URLQueryString.split(queryStringDelimSymbol);
		for (i=0; i<queryStringElements.length; i++) {
			if(queryStringElements[i].indexOf(paramName) == -1) {
				newQueryString += queryStringDelimiter + queryStringElements[i];
			} else {
				newQueryString += queryStringDelimiter + paramName + paramSeparator + paramValue;
			}
			queryStringDelimiter = queryStringDelimSymbol;
		}
	}
    return URLPath + URLSeparator + newQueryString;
}
function bvcreateproductviewtag(totalReviewsCount, avgRating, buyAgainPercentage, cm_isProductMaskedPricing, cm_isLaunchSku) {
	var model_name = $("#model_name").html();
	var sku = $("#pdp_selectedSKU").val();
	cm_Attributes = totalReviewsCount + "-_-" + avgRating + "-_-" + buyAgainPercentage + "-_-" + cm_isProductMaskedPricing + "-_-" + cm_isLaunchSku;
	if (cm_Attributes != null) {
		$("#bvRRAttributes").val(cm_Attributes);
	}
	if(cm_CategoryID == '') {
		cm_CategoryID = null;	
	}
	if(cm_Attributes == '') {
		cm_Attributes = null;	

	}
	if(cm_ProductTemplate == '') {
		cm_ProductTemplate = null;	
	}
	if(cm_microsite == '') {
		cm_microsite = null;	
	}
	cmCreateProductviewTag(sku, model_name, cm_CategoryID, cm_ProductTemplate, cm_microsite, cm_Attributes);
}
function cmConversionEventViewLargerImage () {
	cmCreateConversionEventTag("View Larger", 1, "PDP Images", 0);
	cmCreateConversionEventTag("View Larger", 2, "PDP Images", 0);
}

function cmConversionEventSPPDPLink () {
	cmCreateConversionEventTag("SP PDP Link", 1, "Striperpedia", 0);
	cmCreateConversionEventTag("SP PDP Link", 2, "Striperpedia", 0);
}
