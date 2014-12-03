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

/*
 * Contains inlinepdp plugin
 */

(function($) { // Hide scope, no $ conflict
	var vars = {
		structure : new Object(),
		baseFeedURL : '/search/json.cfm?',
		devicePixelRatio : window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI,
		cm_isProductMaskedPricing : '',
		cm_isLaunchSku : '',
		cm_CategoryID : '',
		cm_HOST : 'rpt.champssports.com',
		currentTime : null,
		modelData : new Object(),
		canonicalURL : null,
		productImage : null,
		currentZoom : '1000',
		isLaunch : false,
		productAdded : false,
		fbInitialized : false,
		reviewsLoaded: false,
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
			'team',  // 13foo
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
		],
		nonSaleLabel : '', // Default label in front of Reg Price when not on Sale
		regularPriceLabel : '', // Default label in front of Reg Price when on Sale price
		saleLabel : '', // Default label in front of Sale Price
		percentLabel : 'Discount: ', // Default label in front of Percent Off
		savingsLabel : 'Save: ', // Default label in front of Savings
		displayPercent : false, // Display Percent Off
		displaysavings : false // Display Savings
	};
	var settings = {
	    type: 'add', // add or update
        globalParent : null,
		updateItem : new Object(),
		initCall : true,
		trackTagging : true,
		errors : [],
		cm_ClientID : '90101910',
		pdpTemplate : '[pdp.images][pdp.alternateviews][pdp.otherstyles]<div class="product_info">[pdp.title][pdp.reviewsummary][pdp.price][pdp.sku][pdp.styleinfo][pdp.messaging][pdp.pdp_fulfillmentType]<div class="add_section"><a href="javascript:void(0);">Select a Size</a>[pdp.quantity][pdp.addtocart][pdp.sizeselect][pdp.addtowishlist]</div>[pdp.customize][pdp.launchTimer][pdp.launchCopy][pdp.fulldetails]<div class="social">[pdp.fblike][pdp.twitter][pdp.pinterest][pdp.google]</div></div>[pdp.reviews][pdp.questions][pdp.sizing][pdp.recommendations]',
		domain : '',
		defaultZoom : '540',
		scrollTarget : 'html, body',
		width : '540',
		loadingHTML : 'Fetching Data',
		reviewSubmissionURL : '/catalog/submitReview/',
		launchHelp : '/content/launchHelp',
		reviewsURL : '//champssports.ugc.bazaarvoice.com/bvstaging/static/8006/bvapi.js',
		site : 'champssports',
		siteName : 'Champssports',
		addToCartCM : 'JSAddToCart',
		modelScript : '/scripts/',
		sizeType : 'select',
		priceLabel : 'Price : $',
		skuLabel : 'Product #: ',
		imagesize : 'zoom',
		imagesource : 'pi',
		altPerSlide : 4,
		excludeSection : [], // [review, q&a, recommendations]
		altSpotlight : new Object(),
		mainSpotlight : new Object(),
		stylesPerSlide : 4,
		stylesSpotlight : new Object(),
		scene7Source: '//images.champssports.com/is/image/', //Default Ajax JSON URL
		scene7Dir : 'EBFL/',
		imageServerSource: '//images.champssports.com/pi/', //Default Ajax JSON URL
		scene7URL: '/shared/pdp/product_videos', //Default Ajax JSON URL
		sizeChart : '/sizingData/?returnType=html&SizeChart_cd=',
		timeToHL : -1,
		timerLabels : ['This item is available in:','hrs','min','sec'],
		launchCopy : 'Please note: Your order is not finalized until the checkout process is complete and you receive a shipment confirmation email.',
		launchMaxCopy : 'Product added to the cart is not guaranteed until the checkout process is completed.',
		hot_launch_max_per_order : 1,
		productLaunchStyles : [],
		model: '',
		netItemMessage : '<span class="message" id="newItem">New Item</span>',
		excludedMessage: '<span class="message" id="excludedMessage" title="Item is excluded from discount. View details.">Excluded From Discount<a class="info_icon" data-tooltip="The dollar value of this item will count toward meeting a required minimum purchase total necessary to receive a discount, but the price of this item itself will not be discounted. Only other eligible items in your cart will be discounted. (Example: You can purchase this product to reach the order threshold to receive a discount, but you will only receive the discount on other eligible items in your cart.)"></a></span>',
		freeShippingMessage : '<span class="message" id="freeShippingMessage" title="Item is eligible for FREE Shipping. View details.">Ships Free!<a title="Free SHipping Details" class="info_icon" data-tooltip="We offer FREE SHIPPING on thousands of items every day! Look for the &quot;Free Shipping&quot; indicator on all eligible merchandise. Shipping will automatically be deducted at checkout. *Please note: This offer is valid only on eligible items, and does not apply to in-store orders. This offer is limited to standard delivery within the 48 contiguous US states and APO/FPO addresses. Excludes bulk orders and drop ships. Entire order must ship to a single address. Customer is responsible for shipping costs on returned merchandise. May not be used toward purchase of Gift Cards or team orders. Promotion may be modified or terminated at any time. Certain restrictions and exclusions may apply."></a></span>',
		shipRestrictionMessage: '<span class="message" id="shipRestrictionMessage" title="There are shipping restrctions on this item. View details.">International shipping restrictions may apply <a class="info_icon" data-tooltip="International shipping restrictions apply. International customers will be informed during check-out if restrictions apply to your country. "></a></span>',
		webExclusive: '<span class="message" id="webExclusive">Web Exclusive</span>',
		backorderMessage: '<span class="message" id="boNoticeMessage">Back-ordered, Expected to Ship {DATE}</span>',
		tooltipAction : 'click',
		SFSMessage : ' - Only ships to lower 48 states',
		fitGuarentee : '/customerserv/help:returnPolicy/?cm_sp=PDP-_-Sizing-_-FitSatisfaction',
		fitInfoJSON : '/ns/common/pdp/js/fit-info.js', // FIT Info JSON feed
		fitInfoImgBaseURL : '/images/fl/iconFlags/',
		productIcons : '/images/products/iconFlags/',
		striperpediaContent : '/shared/json/productContent?site=striperpedia&sku=',
		showTrueSize : true,
		cartLink :'/catalog/shoppingCart/',
		cartText :'View Full Cart',
		chartType : 'json', // html,json
		pdpVideoSettings : new Object(),
		headerElem : '', 
		sku: '', //Product Number
		showISA : false,
		selected_size : ' ',
		qty : 1,
		pdp_fulfillmentType : 'SHIP_TO_HOME',
		storeNumber : 0,
		storeCostOfGoods : 0.00,
		lineitemid : 0,
		selectSizeCallback : function() {},
		addToCartCallback : function() {},
		recommendCallback: function () { },
		noSkuCallback: null,
		callback : function() {}
	};
	var methods = {
		init : function(options) {
			settings.type = 'add';
			settings.sku = '';
			settings.model = '';
			settings.style = '';
			settings.selected_size = '';
			settings.qty = 1;
			settings.pdp_fulfillmentType = 'SHIP_TO_HOME';
			
			
			settings.initCall = true;
			vars.reviewsLoaded = false;
			settings.pdp_fulfillmentType = 'SHIP_TO_HOME';
			$('[data-info="add_to_cart"] button').removeClass('processing');
			
			if(typeof(jqueryPDPSettings) !== 'undefined'){
				try {
					settings = $.extend(settings, jqueryPDPSettings);	
				} catch(err){}
			}
			settings = $.extend(settings, options);
				
			if(settings.sku != options.sku || $('[data-pdpelement="'+options.sku+'"]').length == 0 || options.type == 'update' || settings.showISA || settings.type == 'refresh') {
				settings.timeToHL = -1;
				window.validateProduct = function() {
					return "";
				};
				window.showBubble = function(message) {
					console.log("Show Bubble");
				}
				window.hideBubble = function(message) {
					console.log("Hide Bubble");
				}
				window.loadBORISWidget = function() {
				}
				
				
				
				/*var cartSettings = {
					cm: settings.addToCartCM,
					success: methods.addToCartSuccess,
					error: methods.addToCartError
				};
				
				if(settings.type == 'update') {
					$.extend(cartSettings, {update:true});
				}
				
				$.addToCart(cartSettings);*/
				
				//initial setup
				vars.currentZoom = Math.floor($(window).innerWidth() * vars.devicePixelRatio);
				if(parseFloat(vars.currentZoom) > 2000) {
					vars.currentZoom = '2000';
				}
				return this.each(function() {
					var $element;
					if(typeof(endeca_cm_categoryID) !== 'undefined') {
						vars.cm_CategoryID = endeca_cm_categoryID;
					}
					if(typeof(cm_CategoryID) !== 'undefined') {
						vars.cm_CategoryID = cm_CategoryID;
					}
					$element = $(this);
					if(settings.domain == '') {
						settings.domain = location.hostname;	
					}
					if(settings.model == '') {
					
						$.ajax({
							method : 'get',
							url: '//' + settings.domain + vars.baseFeedURL+"Nr=OR(P_StyleSKU:"+settings.sku+")&variable=model",
							dataType:'script',
							beforeSend: function(jqXHR) {
								jqXHR.overrideMimeType("text/javascript; charset=iso-8859-1");
							},
							complete: function() {
								if(model.RECORDS.length >= 1) {									
									settings.model = model.RECORDS[0].PROPERTIES.P_ModelNumber;
									methods.initPDP($element);
									
								}
							}
						});
					} else {
						methods.initPDP($element);	
					}
				});
			}
		},
		initPDP : function(element) {
		    var $element = element;
		    settings.globalParent = $element;
			$element.attr('data-pdpelement',settings.sku);
			$element.attr('data-sku',settings.sku);
			$element.attr('data-model',settings.model);
			if(settings.selected_size != null) {
				$element.attr('data-selected_size',settings.selected_size);
			}
			$element.attr('data-qty',settings.qty);
			$element.attr('data-pdp_fulfillmentType',settings.pdp_fulfillmentType);
			
			$element.html('<div id="pdp_loading">'+settings.loadingHTML+'</div>');
			//cmCreateConversionEventTag("Video Icon - Open", 1, "PDP - VIDEO", 0);
			$element.width(settings.width);
			methods.getSkus(settings.model, settings.sku, methods.getInfo, $element);
			settings.model = '';
		},
		updateMainImage : function(sku, view) {
			if(view != $('#qv_product_'+sku+' .product_image img.reg_image').attr('data-view')){
				var zoom = settings.defaultZoom;
				if($('#qv_product_'+sku+' .product_image').attr('data-zoomed') == 'true') {
					zoom = vars.currentZoom;
				}
				$('#qv_product_'+sku+' .product_image').html('<div class="image_loader">'+settings.loadingHTML + '</div>');
				$('#qv_product_'+sku+' .product_image .image_loader').css({
					'display':'inline-block',
					'height':zoom+'px',
					'width':'100%',
					'text-align':'center',
					'vertical-align':'middle',
					'line-height':zoom+'px'
				});
				$('#qv_product_'+sku+' .product_image .image_loader img').css({
					'width':'auto',
				});
				$('#qv_product_'+sku+' .product_image').append('<img src="' + settings.scene7Source + '/' + view + '/?wid='+parseInt(zoom)+'&hei='+parseInt(zoom)+'" class="reg_image" border="0" data-view="'+view+'" />');
				$('#qv_product_'+sku+' .product_image .reg_image').on('load', function() {
					$('#qv_product_'+sku+' .product_image .image_loader').remove();
				});
			}
		},
	
		// Updates Attributes below product image
		updateAttr : function(model, sku_nbr) {
			$('[data-info=product_attr]').html(window['styles_'+model][sku_nbr][methods.getStyleValue('attributes')]);
			$('.sku_messaging').empty();
			if(window['styles_'+model][sku_nbr][methods.getStyleValue('excludedFromDiscount')]) {
				$('.product_info .sku_messaging').append(settings.excludedMessage);	
			}
			if(window['styles_'+model][sku_nbr][methods.getStyleValue('metadata')]['SHIPPING_RESTRICTION_EXISTS']) {
				$('.product_info .sku_messaging').append(settings.shipRestrictionMessage);	
			}
			
		},
	
		// Call to Update Messaging
		updateMessaging : function(model, sku_nbr) {
			$('[data-info=product_messaging]').empty();
			if(window['styles_'+model][sku_nbr][methods.getStyleValue('metadata')]['FREE_STANDARD_SHIPPING']) {
				$('[data-info=product_messaging]').append(settings.freeShippingMessage);
				$('#dm_shiptohome').attr('data-free_shipping', 'true');
			} else {
				$('#dm_shiptohome').attr('data-free_shipping', 'false');
			}
			if(window['styles_'+model][sku_nbr][methods.getStyleValue('metadata')]['CHANNEL_AVAIL_ICON'] == 'WEB_ONLY') {
				$('[data-info=product_messaging]').append(settings.webExclusive);
			}
			if(typeof(window['styles_'+model][sku_nbr][methods.getStyleValue('metadata')]['IS_NEW_ARRIVAL']) !== 'undefined' && window['styles_'+model][sku_nbr][methods.getStyleValue('metadata')]['IS_NEW_ARRIVAL']) {
				$('[data-info=product_messaging]').append(settings.netItemMessage);	
			}
			if(window['styles_'+model][sku_nbr][methods.getStyleValue('hasXforY')]) {
				$('[data-info=product_messaging]').append('<a href="/XYPromo/model:'+model+'/sku:'+sku_nbr+'/?xyMessage=back" class="message" data-xfory="'+window['styles_'+model][sku_nbr][methods.getStyleValue('XforY')].split('.')[0]+'" title="Buy more and save. View Details.">&nbsp;</a>');	
			}
			if(window['styles_'+model][sku_nbr][methods.getStyleValue('fitIcon')] !== "truesize.gif" && window['styles_'+model][sku_nbr][methods.getStyleValue('fitIcon')] !== '') {
				$('[data-info=product_sizes]').append('<div class="fitIcon" data-fiticon="'+window['styles_'+model][sku_nbr][methods.getStyleValue('fitIcon')].split('.')[0]+'"></div>');	
			}
			if ($('#pdp_selectedSize').val() != '') {
			    for (var index = 0; index < window['styles_' + model][sku_nbr][methods.getStyleValue('availableSizes')].length; index++) {
			        if ($.trim(window['styles_' + model][sku_nbr][methods.getStyleValue('availableSizes')][index][0]) == $.trim($('#pdp_selectedSize').val())) {
			            if (window['styles_' + model][sku_nbr][methods.getStyleValue('availableSizes')][index][6] != 'N' &&
                                (settings.pdp_fulfillmentType == 'SHIP_TO_HOME' || settings.pdp_fulfillmentType == 'SEND_TO_STORE')) {
			                $('[data-info=product_messaging]').append(settings.backorderMessage.replace('{DATE}', window['styles_' + model][sku_nbr][methods.getStyleValue('availableSizes')][index][3]));
			            }
			        }
			    }
			}
			
		},
		loadSkuImage : function(size, elem) {
			var $element = $('#qv_product_'+elem.attr('data-sku'));
			var sku = $element.attr('data-sku');
			
			$element.find('.product_images li').each(function() {
				var img = $(this).find('img.reg_image');
				var view = $(this).find('img').attr('data-view');
				
				if(typeof($(this).find('img.reg_image').attr('data-view')) !== 'undefined') {
					$(this).find('img.reg_image').attr({'src': settings.scene7Source + $(this).find('img').attr('data-view') + '?wid='+parseInt(size)+'&hei='+parseInt(size)});
				} else {
					$(this).find('img.reg_image').attr({'src': settings.scene7Source + settings.scene7Dir + sku + '?wid='+parseInt(size)+'&hei='+parseInt(size)});
				}
			});
			
			
			if($element.attr('data-zoomed') == 'true') {
				$element.find('.product_images ul').width((methods.getMaxSize()*.9) * $element.find('.product_images li').length);
				
				$element.parent().stop();
/*				$element.find('.product_images li').stop();
				$element.find('.product_images ul').stop();
				
				console.log('Current Slide : ' + settings.mainSpotlight.curSlide);
				console.log(parseInt($element.find('.product_images ul').css('left')).toString() + ' : ' + (parseInt($element.find('.product_images ul').css('left')) - Math.abs(methods.getMaxSize()*.9 - settings.width) * settings.mainSpotlight.curSlide).toString());
				
				$element.find('.product_images ul').animate({'left':parseInt($element.find('.product_images ul').css('left')) - Math.abs(methods.getMaxSize()*.9 - settings.width) * settings.mainSpotlight.curSlide},400);
				$element.find('.product_images li').animate({'width': methods.getMaxSize()*.9}, 400);
*/				$element.parent().animate({'width': methods.getMaxSize()*.9}, 400, function(){settings.mainSpotlight.resizeSpotlight();});
				
				$(window).on('resize', function() {
				
					$element.parent().stop();
/*					$element.find('.product_images li').stop();
					$element.find('.product_images ul').stop();
					
					$element.find('.product_images ul').animate({'left':parseInt($element.find('.product_images ul').css('left')) - Math.abs(methods.getMaxSize()*.9 - settings.width) * settings.mainSpotlight.curSlide},400);
					$element.find('.product_images li').animate({'width': methods.getMaxSize()*.9}, 400);
*/					$element.parent().animate({'width': methods.getMaxSize()*.9}, 400, function(){settings.mainSpotlight.resizeSpotlight();});
				
				});
			} else {
				
				$element.parent().stop();
/*				$element.find('.product_images li').stop();
				$element.find('.product_images ul').stop();
				
				$element.find('.product_images ul').animate({'left':parseInt($element.find('.product_images ul').css('left')) + Math.abs(methods.getMaxSize()*.9 - settings.width) * settings.mainSpotlight.curSlide},400);
				$element.find('.product_images li').animate({'width': settings.width}, 400);
*/				$element.parent().animate({'width':settings.width}, 400, function(){settings.mainSpotlight.resizeSpotlight();});
				
				$(window).off('resize');
			}
		},
		getMaxSize : function() {
			var width = $(window).width();
			var height = $(window).height();
			if(height < width) {
				width = height;	
			}
			return width;
		},
		getAltViews : function(element) {
			var $element = element;
			$('#qv_product_' + $element.attr('data-sku') + ' .alt_views ul').empty();
			
			$('.product_image').off('click');
			window.s7jsonResponse = function(obj, reqid){
			    var productName = window['model_' + element.attr('data-model')].NM;
				var imageSetArray = [];
				try {
					var id = reqid;
					imageSetArray = obj['IMAGE_SET'].split(",");
					
					if(imageSetArray.length >= 1 && imageSetArray != "") {
						var ulHTML = '<li>';
						$('#qv_product_'+id+' div[data-info=product_images] [data-class="slide_content"]').addClass('slide_content');
						$('#qv_product_'+id+' div[data-info=product_images]').addClass('spotlight');
						$('#qv_product_'+id+' div[data-info=product_images] ul').empty();
						$.each(imageSetArray, function(i, img) {
							if(i % settings.altPerSlide == 0 && i !== 0) {
								ulHTML += '</li><li>';	
							}
							ulHTML += '<a href="javascript:void(0);" data-view="'+img.split(";")[0]+'"><img src="' + settings.scene7Source + '/' + img.split(";")[0] + '?wid='+ parseInt(50* vars.devicePixelRatio)+'&hei='+ parseInt(50* vars.devicePixelRatio)+'" border="0" /></a>';
							
							$('#qv_product_' + id + ' div[data-info=product_images] ul').append('<li><div class="alt_view"><img src="' + settings.scene7Source + '/' + img.split(";")[0] + '?wid=' + parseInt(settings.defaultZoom * vars.devicePixelRatio) + '&hei=' + parseInt(settings.defaultZoom * vars.devicePixelRatio) + '" class="reg_image" border="0" data-view="' + img.split(";")[0] + '" alt="' + productName + '" /><img alt="'+productName+'" src="" class="zoom_image" data-view="' + img.split(";")[0] + '" data-zoomsrc="' + settings.scene7Source + '/' + img.split(";")[0] + '"  style="position:absolute" border="0" /></div></li>');
							
						});
						ulHTML += '</li>';
						$('#qv_product_'+id+' .alt_views ul').html(ulHTML);
						$('#qv_product_'+id+' .alt_views ul li a').on('click', function() {
							$('#qv_product_'+id+' .alt_views ul li a').removeClass('selected');
							$(this).addClass('selected');
							methods.updateMainImage(id, $(this).attr('data-view'));
							return false;
						});
						
						$('#qv_product_'+id+' .alt_views a.sl_previous').on('click', function() {
							settings.altSpotlight.previousSlide();
							return false;
						});
						$('#qv_product_'+id+' .alt_views a.sl_next').on('click', function() {
							settings.altSpotlight.nextSlide();
							return false;
						});
						
						$('#qv_product_'+id+' .alt_views ul a:first-child').addClass('selected');
						settings.altSpotlight = $('#altviews_spotlight_'+id).spotlight({transition:'slide', orientation:'vertical', rotate:false});
						settings.mainSpotlight = $('div#main_spotlight_'+id+'[data-info=product_images]').spotlight({transition:'slide', rotate:false});
						
						
						settings.mainSpotlight.resizeSpotlight();
						
						$('div[data-info=product_images] .sl_previous').on('click', function(e) {
							e.preventDefault();
							settings.mainSpotlight.previousSlide();
							return false;
						});
						$('div[data-info=product_images] .sl_next').on('click', function(e) {
							e.preventDefault();
							settings.mainSpotlight.nextSlide();
							return false;
						});
						
						$('.alt_view').off('click');
						$('.alt_view').on('click', function() {
							var $element = $(this).parents('.qv_content');
							if($(this).attr('data-zoomed') != 'true') {
								$element.attr('data-zoomed', 'true');
								$(this).attr('data-zoomed', 'true');
								methods.loadSkuImage(vars.currentZoom, $element);

							} else {
								$element.attr('data-zoomed', 'false');
								$(this).attr('data-zoomed', 'false');
								methods.loadSkuImage(settings.defaultZoom, $element);
							}
							return false;						
						});
						if(settings.excludeSection.indexOf('altviews') === -1) {
							$('#qv_product_'+id+' .alt_views').show();
						}
						
						if(settings.mainSpotlight.numSlides <= 1) {
							$('div#main_spotlight_'+id+' .slide_buttons').hide();
						}
					} else {
						$('div#main_spotlight_'+id+' .slide_buttons').hide();
					}
					
				} catch(err) {}
					
			}
			$.ajax({
					url:		settings.scene7Source + settings.scene7Dir + $element.attr('data-sku') + '?req=imageset,json&id='+$element.attr('data-sku')
				,	dataType:	'jsonp'
				,	error: 		function(error) {
									;
								}
				,	success:	function(data) {
									;
								}
					// 's7jsonResponse' is the named function returned by the ajax object above (data)
			});
			
			
		},
		getStyles : function(element) {
			var sku = element.attr('data-sku');
			var model = element.attr('data-model')
			
			$('#qv_product_'+sku+' .other_styles ul').empty();
			console.log('STYLES : ' + window['styles_'+element.attr('data-model')].length);
			if(typeof(window['styles_'+element.attr('data-model')]) !== 'undefined') {
				var stylesHTML = '<li>';
				var count = 0;
				$.each(window['styles_'+element.attr('data-model')], function(sku, data) {
					if(count % settings.stylesPerSlide == 0 && count !== 0) {
						stylesHTML += '</li><li>';	
					}
					if(vars.devicePixelRatio == 1) {
						stylesHTML += '<a href="javascript:void(0);" title="'+data[15]+'" data-model="'+model+'" data-sku="'+sku+'"><img src="'+settings.imageServerSource+sku+'/cart/" border="0" /></a>';
					} else {
					    stylesHTML += '<a href="javascript:void(0);" title="' + data[15] + '" data-model="' + model + '" data-sku="' + sku + '"><img src="' + settings.imageServerSource + sku + '/small/" border="0" /></a>';
					}
					count++;
				});
				stylesHTML += '</li>';
				if(count > 1) {
					$('#qv_product_'+sku+' .other_styles ul').html(stylesHTML);
					
					$('#qv_product_'+sku+' .other_styles a.sl_previous').on('click', function() {
						settings.stylesSpotlight.previousSlide();
						return false;
					});
					$('#qv_product_'+sku+' .other_styles a.sl_next').on('click', function() {
						settings.stylesSpotlight.nextSlide();
						return false;
					});
					$('#qv_product_'+sku+' .other_styles ul li a[data-sku="'+sku+'"]').addClass('selected');
					settings.stylesSpotlight = $('#otherstyles_spotlight_'+sku).spotlight({transition:'slide',rotate:false});
					
					$('#qv_product_'+sku+' .other_styles ul li a').off('click touchend')
					$('#qv_product_'+sku+' .other_styles ul li a').on('click touchend', function() {
						if($(this).attr('data-sku') != sku) {
							$.quickview({'title':'View Featured Product','sku':$(this).attr('data-sku'),'model':$(this).attr('data-model'),'selected_size':$.trim($('#pdp_selectedSize').val())});	
						}
					});
				} else {
					$('#qv_product_'+sku+' .other_styles').empty();
				}
				if(settings.stylesSpotlight.numSlides <= 1) {
					$('#qv_product_'+sku+' .other_styles .slide_buttons').hide();
				}
				var replaceLi = $('#qv_product_'+sku+' .other_styles ul li a.selected').parents('li').index();
				
				$('#qv_product_'+sku+' .other_styles ul li a.selected').prependTo($('#qv_product_'+sku+' .other_styles ul .slideitem0'));
				
				$('#qv_product_'+sku+' .other_styles ul .slideitem0 a:last-child').appendTo($('#qv_product_'+sku+' .other_styles ul .slideitem'+replaceLi));
			}
		},
		// Loads videos with jquery.lib plugin and Video Feed
		getVideos : function(element) {
			var $element = element;
			var sku_nbr = $element.attr('data-sku');
			var model = $element.attr('data-model');
			if(methods.getStyleValue('hasVideos')) {
				$('[data-info="videos"]').html('<a href="javascript:void(0);" id="show_videos"></a><div class="content"></div>');
				$.extend(settings.pdpVideoSettings, {'sku':sku_nbr, 'domain':'','initPlay':'true','swfpath':'/ns/flash/video-player/','onPlay':function(){
					$('#video_player_wrapper').show();
					if($('#video_player_wrapper').children('#close_vid').length === 0) {
						$('#video_player_wrapper').prepend('<a href="javascript:void(0);" title="Close" id="close_vid"></a>');
						$('#close_vid').on('click',function() {
							$('#show_videos').show();
							$('[data-info="videos"] .content').hide();
							return false;
						});
					}				
				},'callback':function() {
					$('[data-info="videos"]').show();
					if($('[data-info="videos"] #video_gallery').html() == null) {
						$('[data-info="videos"]').empty();
						$('[data-info="videos"]').hide();
					}	
				}});
				$('[data-info="videos"] .content').pdpVideo(settings.pdpVideoSettings);
				$('[data-info="videos"] .content').hide();
				$('#show_videos').on('click', function() {
					$('#show_videos').hide();
					$('[data-info="videos"] .content').show();
					$('#video_player_wrapper').show();
					$('[data-video="0"]').click();
					return false;
				});
				
			} else {
				$('[data-info="videos"]').hide();
			}
		},
	
		// Get FIT Info 
		getFitInfo : function(element) {
			var $element = element;
			var sku_nbr = $element.attr('data-sku');
			var model = $element.attr('data-model');
			
			var fitIcon = window['styles_'+model][sku_nbr][methods.getStyleValue('fitIcon')];
			if(fitIcon !== '' && typeof(fitIcon) !== 'undefined') {
				$.ajax({
					url:		settings.fitInfoJSON,
					dataType:	'json',
					error: 		function(error) {
						console.log('ERROR'+ error);
					},
					success:	function(data) {
						$('div[data-info=fit_info]').attr('data-fitinfo',fitIcon);
						if(fitIcon !== 'truesize.gif' || settings.showTrueSize){							
						    $('div[data-info=fit_info]').html('<div class="fitInfoTitle"><span class="fit-notice-left-shoe pdp_sprite"></span><span class="title"></span><span class="fit-notice-right-shoe pdp_sprite"></span></div><div class="fitInfoContent"><p title="Length runs ' + data[fitIcon][1] + ' width runs ' + data[fitIcon][2] + '">' + data[fitIcon][4] + '</p></div>');
						} else {
							$('div[data-info=product_sizes]').attr('data-showfit','false');	
						}
						if(fitIcon != '' && fitIcon != null) {
							$('div[data-info=fit_icon]').html('<div class="heading">Fit Guide<span class="highlight"></span></div><img src="'+settings.fitInfoImgBaseURL + fitIcon + '" border="0" /><div><span class="fit_description">' + data[fitIcon][3]+'<span></div><div class="fit_info_wrappers"><div><span data-label="fit_length" class="label"></span><span data-value="fit_length" class="value">' + data[fitIcon][1]+'<span></div><div><span data-label="fit_width" class="label"></span><span data-value="fit_width" class="value">' + data[fitIcon][2]+'<span></div></div>');
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
				
				if($.trim(window['model_'+model].SIZECHART_CD) == '') {
					$('a[data-tab=sizing]').hide();
				} else {
					$('a[data-tab=sizing]').show();
				}
			}
		},
	
		getStyleValue : function(index) {
			return vars.styleReference.indexOf(index);
		},
		launchISA : function() {
			try{ 
				if($.modal.data.isOpen) {
					$('#isaOverlay').removeClass('favContainer');
				}
				$.modal.data.isLoading = false;
				$.modal.data.isOpen = false;
			} catch(err) {}
			$('<div />',{'id':'modal-container','data-title':'In-Store Availability'}).html($('<div />',{'id':'isaOverlay'})).flyin({'openTab':true,'keepTab':'true','callback':function() {
				try{
					$('a[data-tab="In-Store Availability"]').hide();
					$.modal.defaults.containerId = "isaContainer";
					
					$('#isa_size_error').remove();
					$('#isa_zip_error').remove();
					if(typeof(processStoreLookupForm) == 'undefined') {
						$.modal.defaults.onAfterOpen = function() {
							methods.afterOpen();	
						}
					} else {
						$.modal.defaults.onAfterOpen = function() {}
						methods.afterOpen();								
					}
				} catch(err) {}
				//if(!$.modal.data.isLoading && !$.modal.data.isOpen) {
					//onFindStoreLinkClick();
				//onFindStoreLinkClick();
				$('#qv_content [data-title="In-Store Availability"] [data-action="closeisa"]').remove();
				$('#qv_content [data-title="In-Store Availability"]').prepend('<a href="javascript:void(0);" data-action="closeisa" title="Cancel Button" onclick="onCloseButtonClick(\'top\')" class="button modal-close" data-btnname="isa_cancel"><span></span></a>');
				$('#qv_content [data-title="In-Store Availability"] a[data-action="closeisa"]').off('click')
				$('#qv_content [data-title="In-Store Availability"] a[data-action="closeisa"]').on('click', function() {
					$.flyin('removeTab','In-Store Availability');
					return false;
				});
				//onFindStoreLinkClick();
				launchStorePickupOverlay('pdp', methods.isaPDPCallback,0,0);
				//}
			}});
		},
		getURLAttribute : function(term) {
			term = $.trim(term.toString().toLowerCase());
			term = term.replace(/'/ig,'');
			term = term.replace(/,/ig,'');
			term = term.replace(/ +/ig,'-');
			term = term.replace(/-+/ig,'-');
			term = term.replace(/_+/ig,'-');
			return term;
		},
		getInfo : function(obj, element) {
			var $element = element
			
			// CHECK IF SKU EXISTS IN MODEL SCRIPT, IF NOT, SEND TO FULL PDP
			if (typeof (window['styles_' + $element.attr('data-model')][$element.attr('data-sku')]) === 'undefined') {
			    if (typeof settings.noSkuCallback == 'function') {
			        settings.noSkuCallback.call($element.attr('data-sku'));
			        return false;
			    }
				$.ajax({
					method : 'get',
					url: '//' + settings.domain + vars.baseFeedURL+"Nr=OR(P_StyleSKU:"+$element.attr('data-sku')+")&variable=result",
					beforeSend: function(jqXHR) {
						jqXHR.overrideMimeType("text/javascript; charset=iso-8859-1");
					},
					complete: function() {
						location.href = result.RECORDS[0].PDPURL;
					}
				});
			} else {
				// SKU EXISTS IN MODEL SCRIPT
				$.each(obj.skus, function(s, sku) {
					console.log(sku.sku + ' : ' + $element.attr('data-sku'))
					if(sku.sku == $element.attr('data-sku')) {
						$.ajax({
							method : 'get',
							url: '//' + settings.domain + vars.baseFeedURL+"Nr=OR(P_StyleSKU:"+sku.sku+")&variable=result",
							beforeSend: function(jqXHR) {
								jqXHR.overrideMimeType("text/javascript; charset=iso-8859-1");
							},
							complete: function() {
							    var model = $element.attr('data-model');
							    
								vars.canonicalURL = result.RECORDS[0].PDPURL;
								if(typeof(result.RECORDS[0].DIMENSIONS['Player Name']) != 'undefined' && result.RECORDS[0].DIMENSIONS['Player Name'] != '') {
									var player = result.RECORDS[0].DIMENSIONS['Player Name'].toString().split(',')[1] + ' ' + result.RECORDS[0].DIMENSIONS['Player Name'].toString().split(',')[0];
									vars.canonicalURL += methods.getURLAttribute(player) + '/';
								}
								if(typeof(result.RECORDS[0].DIMENSIONS['Team']) != 'undefined' && result.RECORDS[0].DIMENSIONS['Team'] != '') {
									vars.canonicalURL += methods.getURLAttribute(result.RECORDS[0].DIMENSIONS['Team']) + '/';
								}
								if(typeof(result.RECORDS[0].DIMENSIONS['Primary Color']) != 'undefined' && result.RECORDS[0].DIMENSIONS['Primary Color'] != '') {
									$.each(result.RECORDS[0].DIMENSIONS['Primary Color'], function(d, dim) {
										vars.canonicalURL += methods.getURLAttribute(dim) + '/';
									});
								}
								if(typeof(result.RECORDS[0].DIMENSIONS['Additional Colors']) != 'undefined' && result.RECORDS[0].DIMENSIONS['Additional Colors'] != '') {
									$.each(result.RECORDS[0].DIMENSIONS['Additional Colors'], function(d, dim) {
										vars.canonicalURL += methods.getURLAttribute(dim) + '/';
									});
								}
								vars.cm_isProductMaskedPricing = result.RECORDS[0].PROPERTIES.P_MaskedPricing;
                                
								$element.html('<input type="hidden" id="pdp_selectedSKU" value="'+sku.sku+'" /><input type="hidden" id="pdp_quantity" value="'+settings.qty+'" /><input type="hidden" id="pdp_model_nbr" value="'+model+'" /><input type="hidden" id="pdp_selectedSize" value="'+settings.selected_size+'" /><div id="fb-root"></div>' + methods.getPDPHTML(sku,$element));
								vars.sizeChartID = window['model_'+model].SIZECHART_CD;
								
								if(settings.errors.length > 0) {
									$('#inline_errors').remove();
									$element.find('.add_section').prepend('<div id="inline_errors"></div>');
									$.each(settings.errors, function(e, err) {
										$('#inline_errors').append('<div class="error">'+err.MESSAGE+'</div>');
									});
								}
								settings.errors = [];
								
								
								$('input#quantity_'+sku.sku).val(settings.qty);
								
								
								
								$('#qv_product_'+sku.sku+' .lbl_shiptohome').off('click');
								$('#qv_product_'+sku.sku+' .lbl_shiptohome').on('click', function() {
									var homeType = 'SHIP_TO_HOME';
									
									if($('#qv_product_'+sku.sku).attr('data-sfs') == 'true') {
										homeType = 'SHIP_FROM_STORE';	
									}
									settings.pdp_fulfillmentType = homeType;
									return false;
								});
								
								$('#qv_product_'+sku.sku+' .lbl_storepickup').off('click');
								
								$('#qv_product_'+sku.sku+' .lbl_storepickup').on('click', function() {
									console.log('ISA OPEN');
									methods.launchISA();
									return false;
									/* NON-FLYIN
									onFindStoreLinkClick();
									launchStorePickupOverlay('pdp', methods.isaPDPCallback,0,0); */
									
								});
								
								$.each(sku.data[methods.getStyleValue('availableSizes')], function(s, size) {
									$('#qv_product_'+sku.sku+' .product_sizes [data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').removeClass('disabled').removeAttr('disabled')
									if(settings.sizeType == 'links') {
										$('#qv_product_'+sku.sku+' .product_sizes [data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').attr('href','javascript:void(0);');
									}
									if(size[4].toLowerCase() == 'n' && size[5].toLowerCase() == 'y') {
										$('#qv_product_'+sku.sku+' .product_sizes [data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').attr('data-sfs','true');
									}
								});
								
								if(typeof(window['hotSkus_'+$element.attr('data-model')]) !== 'undefined') {
									$.getScript('/images/common/js/timevariable.cfm?variable=curTime', function() {
										//var date = curTime.split('|');
										var now = epoch;
										vars.currentTime = parseInt(now);
										settings.productLaunchStyles = window['hotSkus_'+$element.attr('data-model')].split(',');
										var launchTime = parseInt(window['launchTime_'+$element.attr('data-model')])/1000;
										//console.log('LAUNCH : ' + launchTime + ' : ' + currentTime);
										settings.timeToHL = launchTime - vars.currentTime;
										methods.initHotLaunch(sku.sku, $element.attr('data-model'));
									    //Hide delivery options on intangible items.
										if (window['isIntangible_' + model] == true) {
										    $('[data-info="product_delivery"]').hide();
										}
									});
								}
								
								if(settings.excludeSection.indexOf('styles') === -1) {
									methods.getStyles(element);
									$element.find('.other_styles').show();
								}
								
								methods.getAltViews($element, sku);
								methods.updateMessaging($element.attr('data-model'),$element.attr('data-sku'))
								methods.updateAttr($element.attr('data-model'),$element.attr('data-sku'))
								methods.getFitInfo($element);
								methods.getVideos($element);
								$('.info_icon').each(function () {
								    Tipped.create(this, $(this).attr('data-tooltip'), { 'showOn': settings.tooltipAction, 'closeButton': global_settings.TOUCH_DEVICE, maxWidth: 350 });
								    $(this).attr('title', $(this).parent().attr('title'));
								});
								
								$('[data-btnname="qvpdp_updateCart"]').off('click');
								$('[data-btnname="qvpdp_addToCart"]').off('click');
								$('.add_to_wishlist a').off('click');	
								
								$('[data-btnname="qvpdp_updateCart"]').on('click', methods.addToCart);
								$('[data-btnname="qvpdp_addToCart"]').on('click', methods.addToCart);
								$('.add_to_wishlist a').on('click', methods.addToWishlist);		
													
								if(settings.sizeType == 'links') {
									$('.product_sizes a').off('click');
									$('.product_sizes a').on('click',methods.selectSize);
									
									$('.product_sizes a').off('mouseover');
									$('.product_sizes a').on('mouseover',methods.mouseoverSize);
									
									$('.product_sizes a').off('mouseout');
									$('.product_sizes a').on('mouseout',methods.mouseoutSize);
								}
								if(settings.sizeType == 'select') {
									$('.product_sizes select').off('change');
									$('.product_sizes select').on('change', function() {
										methods.selectSize($(this).val());
									});
								}
								
								$.get(settings.sizeChart + vars.sizeChartID, function(data) {
										$('#sizefit').html(data);
										$('.sizeListClass').change(function(evt){
											var si = evt.target.selectedIndex;
											for (var i=1; i<=sizeSelectCount; i++) {
												document.getElementById('sizeList_'+i).selectedIndex=si;
											}
										});
										// insert the proxy link to the size chart popup
										if (sizeImagePath.length != 0 && sizeImagePath.toLowerCase() != 'none') {
											$('#sizeChartDiv').html('<img src="'+ sizeImagePath +'" />');
											$('#sizeImageLink').html('<p><a href="" onClick="return clickSizeChart()">Measurement Help</a></p>');
										}
										if(sizeSelectCount == 0) {
											$('#product_sizing_content').append('<span class="default_size_text">Please <a href="/catalog/defaultsizingchart.cfm" target="_blank">click here</a> for sizing information on this product.</span>');
										}
										
									}
								);
								
								$('.ratings').ratings();
								
								
								
								
								if(!window['model_'+model].HASCUSTOMPDP) {
									methods.getRecommendations(element);
									$.getScript(settings.reviewsURL, function() {
										methods.getReviews(element);
										methods.getQuestions(element);
									});
								} else {
									$('.recommendations').hide();
									$('#BVRRSummaryContainer').hide();
									$('a[data-tab=reviews]').hide();
									$('a[data-tab=questions]').hide();
								}
								
								$element.width(settings.width);
								$element.css( {
									'display':'inline-block'
								});
								$('input#quantity_'+sku.sku).val(settings.qty);
								//var model = $('#pdp_model_nbr').val();
								$('#qv_product_'+sku.sku).attr('data-hassizes', window['model_'+model].HASSIZES);
								if(!window['model_'+model].HASSIZES) {
									methods.selectSize(' ');
									
									var size = sku.data[methods.getStyleValue('availableSizes')][0];
									if(size[4].toLowerCase() == 'n' && size[5].toLowerCase() == 'y') {
										$('[data-info="sfsmessage"]').attr('data-sfsmessage', 'true');
										settings.pdp_fulfillmentType = 'SHIP_FROM_STORE';
									} else {
										$('[data-info="sfsmessage"]').attr('data-sfsmessage', 'false');
									}
									
								}
								$('#qv_product_'+sku.sku+' .subtract_quantity').off('mousedown');
								 $('#qv_product_'+sku.sku+' .subtract_quantity').on('mousedown', function() {
									var quant = parseInt($(this).parent().children('input[name="quantity"]').val());
									if(quant > 1) {
										quant--;
										$(this).parent().children('input[name="quantity"]').val(quant);
									}
								});
								$('#qv_product_'+sku.sku+' .add_quantity').off('mousedown');
								$('#qv_product_'+sku.sku+' .add_quantity').on('mousedown', function() {
									var quant = parseInt($(this).parent().children('input[name="quantity"]').val());
									quant++;
									$(this).parent().children('input[name="quantity"]').val(quant);
								});
								methods.initTabs();
								settings.callback(sku);
								if($('#pdp_selectedSize').val() != null) {
									$('#qv_product_'+sku.sku+' .product_sizes a[data-value=" '+$('#pdp_selectedSize').val()+'"]').click();
								}
								$('[data-info="sizing_link"]').off('click');
								$('[data-info="sizing_link"]').on('click', function() {
									methods.swapTabs('sizing', true);
								    //cmCreateConversionEventTag("Sizing Information - Open", 2, "PDP - SIZING", 0);
									methods.conversionEventTag("Sizing Information - Open", "PDP - SIZING");
								});
								$('.full_details a').off('click');
								$('.full_details a').on('click', function(e) {
									e.stopPropagation();
									if($(this).attr('href').indexOf('?') !== -1) {
										location.href = $(this).attr('href') + '&size=' + $.trim($('#pdp_selectedSize').val());
									} else {
										location.href = $(this).attr('href') + '?size=' + $.trim($('#pdp_selectedSize').val());
									}
									return false;
								});
								// fbInitialized
								if(!vars.fbInitialized) {
									(function(d, s, id) {
			
										var js, fjs = d.getElementsByTagName(s)[0];
										if (d.getElementById(id)) return;
										js = d.createElement(s); js.id = id;
										js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
										fjs.parentNode.insertBefore(js, fjs);
									}(document, 'script', 'facebook-jssdk'));
								}
								try{
									FB.XFBML.parse(); 
								}catch(ex){}
								
								try{
									if(settings.trackTagging) {
										var data = {'promo_id':'5','product_id':sku.sku};
										if(typeof(window['model_'+model].BRAND) !== 'undefined') {
											$.extend(data,{'brand':window['model_'+model].BRAND});
										}
										if(typeof(window['model_'+model].SPORTS) !== 'undefined') {
											$.extend(data,{'sport':window['model_'+model].SPORTS[0].NM});
										}
										if(typeof(window['model_'+model].GENDER_AGE) !== 'undefined') {
											$.extend(data,{'gender':window['model_'+model].GENDER_AGE});
										}
										$.conversant({'data':data})
									}
								}catch(er){}
								if(window['model_'+model].HASCUSTOMPDP) {
									methods.hideAdding();
									$('.full_details').hide();
									$('.product_info .customize').show();
								}
								if(settings.showISA) {
									settings.showISA = false;	
									$('#qv_product_'+sku.sku+' .lbl_storepickup').click();
								}
								$("label[for],input[type='radio']").bind("click", function(e) {
									e.stopPropagation();
								});
								methods.addRadioListener('.delivery');
								$(window).trigger('resize');
							    //Hide delivery options on intangible items.
								if (window['isIntangible_' + model] == true) {
								    $('[data-info="product_delivery"]').hide();
								}
							}
						});
					}
				});
			}
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
		hideAdding : function() {
			$('[data-info=add_to_cart]').hide();
			$('[data-launchhide]').hide();
			$('[data-info=add_to_wishlist]').hide();
			$('[data-info=product_delivery] #dm_storepickup').hide();
			$('[data-info=product_delivery]').hide();
			$('.product_quantity').hide();
			$('[data-info="product_sizes"]').hide();
			$('.select_size').hide();
		},
		showAdding : function() {
			$("#pdp_addToCart").show();
			$('[data-info=add_to_cart]').show();
			$('[data-info=add_to_wishlist]').show();
			$('[data-launchhide]').show();
			$('.select_size').show();
			$('.select_size').attr('title', 'Select A Size');
			$('.product_quantity').show();
			$('[data-info="product_sizes"]').show();
		},
		addToCartSuccess : function() {
			
		},
		addToCartError : function() {
			
		},
		mouseoverSize: function () {
		    var model = settings.globalParent.attr('data-model'), sku = settings.globalParent.attr('data-sku');
		    $('div[data-info="availability"] span').removeAttr('data-date');
			$('div[data-info="availability"] span').hide();
			$('div[data-info="availability"]').attr('data-availability', 'instock');
			for (var index = 0; index < window['styles_' + model][sku][methods.getStyleValue('availableSizes')].length; index++) {
			    if ($.trim(window['styles_' + model][sku][methods.getStyleValue('availableSizes')][index][0]) == $.trim($(this).attr('data-value'))) {
			        if (window['styles_' + model][sku][methods.getStyleValue('availableSizes')][index][6] != 'N' && 
                            (settings.pdp_fulfillmentType == 'SHIP_TO_HOME' || settings.pdp_fulfillmentType == 'SEND_TO_STORE')) {
			            $('div[data-info="availability"]').attr('data-availability', 'backordered');
			            $('div[data-info="availability"]').attr('data-date', window['styles_' + model][sku][methods.getStyleValue('availableSizes')][index][3]);
			            break;
			        }
			    }
			}
			if($(this).hasClass('disabled')) {
				$('div[data-info="availability"]').attr('data-availability','outofstock');
			}
			
			$('div[data-info="availability"] span').show();
			
			$('[data-info="sfsmessage"]').hide();
			$('[data-info="sfsmessage"]').attr('data-sfsmessage', 'false');
			if($(this).attr('data-sfs') == 'true') {
				$('[data-info="sfsmessage"]').attr('data-sfsmessage', 'true');
			}
			$('[data-info="sfsmessage"]').show();
		},
		mouseoutSize : function() {
			$('div[data-info="availability"] span').hide();
			$('div[data-info="availability"]').attr('data-availability','instock');
			if (window['model_'+$("#pdp_model_nbr").val()].HASSIZES && ($('#pdp_selectedSize').val().trim() == "" || ($('[data-info="product_sizes"] a.selected[data-value]').length == 0 && $('#storepickup select[name="sizes"]').val() == null) ) ) {
				$('div[data-info="availability"]').attr('data-availability','none');
			}
			$('div[data-info="availability"] span').show();
			
			$('[data-info="sfsmessage"]').hide();
			$('[data-info="sfsmessage"]').attr('data-sfsmessage', 'false');
			if($('[data-info="product_sizes"] a.selected').attr('data-sfs') == 'true') {
				$('[data-info="sfsmessage"]').attr('data-sfsmessage', 'true');
			}
			$('[data-info="sfsmessage"]').show();
		},
		selectSize : function(size) {
			$('#inline_errors').remove();
			if(!$(this).hasClass('disabled')) {
			    if (typeof size != 'string'){
			        $('.product_sizes_content a[data-value]').removeClass('selected');
			        $(this).addClass('selected');
			        //$('#product_sizes_header a').html($(this).attr('data-value')).addClass('size_selected');

			        if ($(this).attr('data-sfs') == 'true' && (settings.pdp_fulfillmentType != 'PICKUP_IN_STORE' && settings.pdp_fulfillmentType != 'SEND_TO_STORE')) {
			            settings.pdp_fulfillmentType = 'SHIP_FROM_STORE';
			            $('#qv_product_' + $("#pdp_selectedSKU").val()).attr('data-sfs', 'true');
			        }
			        $('#pdp_selectedSize').val($(this).attr('data-value'));
			    }else{
			        $('#pdp_selectedSize').val(size);
			    }
				$('.add_to_cart input').addClass('active_step');
				$('[data-btnname*="_addToCart"]').removeClass('disabled');
				methods.updatePrice();
				methods.updateMessaging(settings.globalParent.attr('data-model'), settings.globalParent.attr('data-sku'));
				$('[data-info=add_errors]').empty();
				$('[data-info=add_errors]').hide();
				settings.selectSizeCallback($('#pdp_selectedSize').val());
			}
			return false;
		},
		// Updates price of current SKU
		updatePrice : function() {
			if($('#pdp_selectedSize').val() != '') {
		        // If a size has been selected then we want to look that size up in the array to determine if it's price/sale price are different.
		        var newSize = $('#pdp_selectedSize').val(); // Set a variable with the newly selected size.
		        var arrayOfSizes = window['styles_' + settings.globalParent.attr('data-model')][settings.globalParent.attr('data-sku')][methods.getStyleValue('availableSizes')]; // Create new array equal to the the "array of sizes" based upon the selected sku.
		        var sizePrice = 0; // Initialize sizePrice.
		        var sizeSalePrice = 0; // Initialize sizeSalePrice.

		        for (i = 0; i < arrayOfSizes.length; i++) {
		            // Loop through the array of sizes and look for a match with the selected size. 
		            // Each element in the array is another array with the details of that particular size.
		            var sizeData = arrayOfSizes[i]; // Create and array with the details for this size.

		            if (sizeData[0].trim() == newSize.trim()) {
		                // If the size of the array element we are working with matches the selected size update the prices and break out of the loop.
		                sizePrice = sizeData[1]; // Update price.
		                sizeSalePrice = sizeData[2]; // Update saleprice.
		                break; // Break out of the loop.
		            }
		        }

		        if (sizePrice == 0) {
		            // If the variable sizePrice is still 0 that means we didn't find a match and we should set the price back to the sku level values.
		            var sizePrice = parseFloat(window['styles_' + settings.globalParent.attr('data-model')][settings.globalParent.attr('data-sku')][methods.getStyleValue('listPrice')]);
		            var sizeSalePrice = parseFloat(window['styles_' + settings.globalParent.attr('data-model')][settings.globalParent.attr('data-sku')][methods.getStyleValue('salePrice')]);
		        }
		    } else {
		        // A size hasn't been selected; we should set the prices based on the sku level values.
		        var sizePrice = parseFloat(window['styles_' + settings.globalParent.attr('data-model')][settings.globalParent.attr('data-sku')][methods.getStyleValue('listPrice')]);
		        var sizeSalePrice = parseFloat(window['styles_' + settings.globalParent.attr('data-model')][settings.globalParent.attr('data-sku')][methods.getStyleValue('salePrice')]);
		    }

			$('div[data-info=product_price]').html('<div class="regular_price"><span class="label">'+vars.nonSaleLabel+'</span> <span class="value">$' + sizePrice + '</span></div>');
			
			if(sizePrice != sizeSalePrice) {
				$('div[data-info=product_price] .regular_price').attr({'class':'old'});
				$('div[data-info=product_price] .old .label').html(vars.regularPriceLabel);
				$('div[data-info=product_price]').append('<div class="sale"><span class="label">'+vars.saleLabel+'</span> <span class="value">$' + sizeSalePrice + '</span></div>');
				
				var discount = sizePrice - sizeSalePrice;
				
				var sale = discount / sizePrice;
				
				if(vars.displayPercent) {
					$('div[data-info=product_price]').append('<div class="percent"><span class="label">'+vars.percentLabel+'</span> <span class="value">' + Math.floor(sale.toFixed(2) * 100) + '%</span></div>');
				}
				
				if(vars.displaySavings) {
					$('div[data-info=product_price]').append('<div class="savings"><span class="label">'+vars.savingsLabel+'</span> <span class="value">$' + discount.toFixed(2) + '</span></div>');
				}
			}
		},
		initHotLaunch : function(sku_nbr, model) {
			settings.timeToHL -= 1;
			methods.killHotLaunchTimer();
			$(".pdp_timer").empty();
			methods.hideAdding();
			if(settings.timeToHL < 0 || !methods.checkHotLaunchItem(sku_nbr)) {
				//methods.updateSizes();
				methods.showAdding();
				$(".pdp_timer").hide();
				$("#pdp_hotsku_max").hide();
				$('#launchPostCopy').hide();
				methods.killHotLaunchTimer();
				if(settings.productLaunchStyles.indexOf(sku_nbr) !== -1) {
					if(methods.checkHotSkuQtyOverMax(sku_nbr, 1)) {
						$(".pdp_timer").append('<div class="launch_max_copy">'+settings.launchMaxCopy+'</div>');
					}
				}
				if(window['styles_'+model][sku_nbr][methods.getStyleValue('metadata')]['ELIGIBLE_SHIPTOSTORE'] && settings.productLaunchStyles.indexOf(sku_nbr) === -1) {
					$('[data-info=product_delivery] #dm_storepickup').show();
					$('[data-info=product_delivery]').show();
					$('#deliveryMethod_shiptohome').click();
					$('[data-info=add_to_wishlist]').show();
				}
				if(settings.productLaunchStyles.indexOf(sku_nbr) !== -1) {
					if($('#launchPostCopy').length == 0){
						$('#launchPostCopy').remove();
						$('#select_size').after($('<div />', {'id':'launchPostCopy'}).html('<span class="launch_copy">'+settings.launchCopy+'</span>'));
					} else {
						$('#launchPostCopy').html('<span class="launch_copy">'+settings.launchCopy+'</span>')
					}
					$('#launchPostCopy').show();
					$('#deliveryMethod_shiptohome').click();
				}
				return;
			} else {
				$('[data-info=product_delivery]').hide();
				//$('[data-info=product_sizes]').html('<div id="pdp_timer"></div>');
				$(".pdp_timer").show();
				$("#pdp_hotsku_max").show();
				vars.isLaunch = vars.cm_isLaunchSku = true;
				
			}
			var sec = settings.timeToHL % 60;
			var min = parseInt(settings.timeToHL / 60) % 60;
			var hour = parseInt(settings.timeToHL / (60 * 60));
			
			$(".pdp_timer").append('<div class="title">'+settings.timerLabels[0]+'</div><div class="time">'+hour + " " + settings.timerLabels[1] + " " + min + " " + settings.timerLabels[2] + " " + sec + " " + settings.timerLabels[3]+'</div>');
			$(".pdp_timer").append('<div class="launch_copy">'+settings.launchCopy+'</div>');
			
			settings.timerID = setTimeout(function() {
				methods.initHotLaunch(sku_nbr,model);
			}, 1000);
		},
		killHotLaunchTimer : function() {
			clearTimeout(settings.timerID);
		},
		checkHotLaunchItem : function(sku) {
			return (settings.productLaunchStyles.indexOf(sku) !== -1 && settings.timeToHL > 0) ? true : false;
		},
		checkHotSkuQtyOverMax : function(sku, quantity) {
			if ( settings.productLaunchStyles.indexOf(sku) !== -1 && settings.hot_launch_max_per_order > 0 && methods.checkHowManyHLSKU(sku) + parseInt(quantity) > settings.hot_launch_max_per_order ){
				return true;
			}
			return false;
		},
		checkHowManyHLSKU : function(sku) {
			// sku,qty|sku,qty
			var hlincart = readCookie("HLCOUNT");
			if (hlincart != null) {
				var hlitems = decodeURIComponent(hlincart).split( "|" );
				for (var e = 0; e < hlitems.length; e++) {
					var hlitem = hlitems[ e ].split(":");
					if (hlitem[ 0 ] == sku) { 
						return parseInt(hlitem[ 1 ]);
					}
				}
			}
			return 0
		},
		validateProduct : function(elem) {
			var size = $("#pdp_selectedSize").val();
			var quantity = $("#pdp_quantity").val();
			var sku = $("#pdp_selectedSKU").val();
			var model = $("#pdp_model_nbr").val();
			var errMsg = "";
			var errCount = 0;
			if(methods.checkHotLaunchItem(sku) || !window['styles_'+model][sku][methods.getStyleValue('availableForPurchase')]) {
				errMsg = "<li>This item is currently unavailable for purchase.</li>";
				return errMsg;
			}
		    
			//var selectedSizeTag = _anchorTagForSize(size);
			if (size.trim() == '') {
			    if ($('[data-info="product_sizes"] a.selected[data-value]').length != 0) {
			        size = $('[data-info="product_sizes"] a.selected[data-value]').attr('data-value');
			        $("#pdp_selectedSize").val(size);
			    } else if ($('[data-info="product_sizes"] select').val() != null) {
			        size = $('[data-info="product_sizes"] select').val();
			        $("#pdp_selectedSize").val(size);
			    }
			}

			if (!window['model_'+model].HASSIZES || ("PICKUP_IN_STORE" == $("#pdp_fulfillmentType").val() || (size.trim() != ""))) {
				var selectedSizeAvailable = true;
			} else {
				var selectedSizeAvailable = false;
			}
			if (window['model_' + model].HASSIZES && size.trim() == "") {
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
			
			if(methods.checkHotSkuQtyOverMax(sku, quantity)) {
				errMsg = "<li>Order quantity is limited on this product to " + settings.hot_launch_max_per_order + " per customer.</li>";
				return errMsg;
			}
			
			return errMsg;
		},
		displayError : function(obj, message) {
			obj.html(message);
			obj.show();
			$(document).unbind('click',methods.clearError);
			$(document).bind('click',{obj:obj,message:message}, methods.clearError);
		},
		clearError : function(e) {
			e.data.obj.hide();
			$(document).unbind('click',methods.clearError);
		},
		addToCart : function(skip) {
			if(vars.isLaunch && vars.productAdded) {
			} else {
				$('[data-info="add_to_cart"] button').removeClass('processing');
				 $('[data-info="add_to_cart"] button').addClass('processing');
				if($(this).attr('data-addsku') !== undefined) {
					var sku = $(this).attr('data-addsku');
				} else {
					sku = settings.sku;	
				}
				var size = ' ';
				if($('#pdp_selectedSize').val() !== null) {
					size = $.trim($('#pdp_selectedSize').val());
				}
				var qty = $('#qv_product_'+sku+' input#quantity_'+sku).val();
				$('#pdp_quantity').val(qty);
				
				var errMsg = methods.validateProduct();
				if (errMsg != "") {
					methods.displayError($('[data-info=add_errors]'), '<ul>'+errMsg+'</ul>');
					$('[data-info="add_to_cart"] button').removeClass('processing');
					return false;
				} else {
					$('[data-info=add_errors]').empty();	
				}
			
				if ($('#qv_product_'+$(this).attr('data-addsku') + ' input[value="storepickup"]').is(":checked") && settings.storeNumber == 0 && skip != 'skip') {
					methods.launchISA();
					return false;
				}
			
				/*disableToCartButton();
				if ($("#pdp_hasXYPromo").length == 0 || $("#pdp_hasXYPromo").val() == "true") {
					miniAddToCart.openMiniAddToCart("product_form");
				}*/
				
				//enableToCartButton();
				try {
					//$('a[data-tab="Featured"]').click();
				} catch(err){}
				
				
				//$('#qv_product_'+sku).prepend('<div class="add_progress" data-info="add_process"></div>');
				//$.addToCart("add", sku, size, qty);
				
				if(settings.type == 'update') {
					$.cartActions('update',settings.updateItem, {'qty':qty,'sku':sku,'size':size,'fulfillmentType':settings.pdp_fulfillmentType,'storeNumber':settings.storeNumber,'storeCostOfGoods':settings.storeCostOfGoods,'lineitemid':settings.lineitemid}, function(data){
						console.log(data)
						
						jqueryCartSettings.cartEdited = true; 
						vars.productAdded = true;
						$('[data-info="add_to_cart"] button').removeClass('processing');
						
						settings.addToCartCallback(data);
					});
					settings.type = 'add';
				} else {
					$.cartActions('add',{'qty':qty,'sku':sku,'size':size,'fulfillmentType':settings.pdp_fulfillmentType,'storeNumber':settings.storeNumber,'storeCostOfGoods':settings.storeCostOfGoods}, function(data){
						settings.addToCartCallback(data);
						vars.productAdded = true;
						$('[data-info="add_to_cart"] button').removeClass('processing');
					});
				}
				window.displayLaunchHelp = function() {
					return false;
				};
				$('#launchHalt a').live('click', function(e) {
					var $element = $(this);
					e.stopPropagation();
					$.ajax({
						url:	settings.launchHelp,
						dataType : 'html',
						error: 		function(error) {
							console.log('ERROR'+ error);
						},
						success : function(data) {
							$element.parent('#launchHalt').html(data);
						}
					});
					return false;
				});
				//settings.addToCartCallback();
			}
			return false;
		},
		addToWishlist : function($element) {
			var sku = $(this).attr('data-addsku');
			var size = ' ';
			if($('#pdp_selectedSize').val() !== null) {
				size = $('#pdp_selectedSize').val(); 
			}
			var qty = $('input#quantity_'+sku).val();
			var errMsg = methods.validateProduct();
			if (errMsg != "") {
				methods.displayError($('[data-info=wishlist_errors]'), '<ul>'+errMsg+'</ul>');
				return false;
			} else {
				$('[data-info=wishlist_errors]').empty();	
			}
					
			$(this).addToWishlist({'sku':sku,'model':$(this).attr('data-addmodel'),'size':size});
			methods.conversionEventTag('Add to Wish List - QV', sku);
			return false;
		},
		getQuestions : function(element) {
			$BV.ui("qa", "show_home", {
				productId: element.attr('data-model'),
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
				doShowContent: function () {
				    $('[title="Ask a New Question "]').attr('title', 'Ask a New Question Button');
				    $('#BVQASearchFormTextInputID').attr('title', 'Search for a question')
				    $('#BVQASearchFormSubmitButtonID').attr('title', 'Submit Search');
					return false;
				}
			});
		},
		//Load Ratings and Reviews (BazaarVoice)
		getReviews : function(element) {
			//console.log('LOAD REVIEWS');
			$BV.configure("global", {
				submissionContainerUrl: location.protocol+'//'+settings.domain+settings.reviewSubmissionURL
			});
			$BV.ui("rr", "show_reviews", {
				productId: element.attr('data-model'),
				onEvent: function(json) {
					var totalReviewsCount = json.attributes.numReviews;
					var avgRating = json.attributes.avgRating;
					var ratingsOnlyReviewCount = json.attributes.numRatingsOnlyReviews;
					var recommendPercentage = json.attributes.percentRecommend;
					var productID = json.productId;
					
					$('#BVRRRatingOverall_Rating_Summary_1 .BVRRRatingNormalImage').live('click', function() {
						methods.swapTabs('reviews', true);	
					});
					
					$('#BVRRRatingSummaryLinkReadID').live('click', function() {
						methods.swapTabs('reviews', true);	
					});
					
                    //Setup titles for BV elements
					$('.BVRRRatingEntry .BVRRRatingNormalImage img').each(function () {
					    $(this).attr('title', 'Product Rating of ' + $(this).attr('alt'));
					});
                    $('.BVRRRatingsHistogramButton .BVRRRatingsHistogramButtonImage').attr('title', 'View rating breakdown');

					$('.BVRRPager .BVRRPageNumber a').each(function () {
					    $(this).attr('title', 'Go to Page '+$(this).attr('title').replace('Go to Page ', ''));
					});
					$('.BVRRPreviousPage a').attr('title', 'Go to Previous Page of Reviews');
					$('.BVRRNextPage a').attr('title', 'Go to Next Page of Reviews');

					if (json.eventSource == "Display") {
						// move code from ratingsDisplayed here
						methods.bvcreateproductviewtag(totalReviewsCount, avgRating, recommendPercentage, vars.cm_isProductMaskedPricing, vars.cm_isLaunchSku);
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
						if(vars.reviewsLoaded) {
							
							$(settings.scrollTarget).stop();
							$(settings.scrollTarget).animate({scrollTop:($('.qv_content #BVRRDisplayContentID').offset().top + $(settings.scrollTarget).scrollTop() - $(settings.headerElem).outerHeight()) - $(document).scrollTop()}, 400, function() {
							});
							//methods.swapTabs('reviews', true);
						}
						vars.reviewsLoaded = true;
					}
				},
				doShowContent: function() {
						return false;
				}
			});
			
		},
		// Loads Recommendations(MyBuys)
		getRecommendations : function(element) {
			if(typeof(mybuys) !== 'undefined') {
				
				var cursettings = {
					'pageType' : 'PRODUCT_DETAILS',
					'zone':'1',
					'pt' : 'prod',
					'id' : 'pdp_',
					'set' : {'productid':element.attr('data-sku')},
					'callback':function(data){
						$('.recommendations .content a').off('click');$('.recommendations .content a').on('click', function(){
						    $.quickview({'title': 'View Featured Product', 'sku': $(this).attr('data-sku') });
							try {
								eval($(this).attr('data-trackurl'));
							} catch(err) {}
							return false;
						});
						settings.recommendCallback();
					}
				}
				
				$('#qv_product_'+element.attr('data-sku')+' .recommendations .content').recommendations(cursettings)
				
			}
		},
		getSectionHTML : function(section, sku, model, script){
			var html = '';
			if(section.toLowerCase() == 'images') {
			    return '<div class="product_images" data-info="product_images" id="main_spotlight_' + sku + '"><div data-class="slide_content"><ul><li><div class="alt_view"><img src="//images.' + settings.site + '.com/' + settings.imagesource + '/' + sku + '/' + settings.imagesize + '/" border="0" class="reg_image" /></div></li></ul></div><div class="slide_buttons" style="display: block;"><a href="#" class="sl_previous left-arrow pdp_sprite" title="View Previous Alternate Image"></a><a href="#" class="sl_next arrow pdp_sprite" title="View Next Alternate Image"></a></div><div data-text="productzoom"></div></div>';
			}
			
			if(section.toLowerCase() == 'alternateviews') {
				return '<div id="altviews_spotlight_'+sku+'" class="alt_views spotlight"><a href="javascript:void(0);" class="previousSlide"></a><div class="slide_content"><ul></ul></div><a href="javascript:void(0);" class="nextSlide"></a></div>';
			}
			
			if(section.toLowerCase() == 'otherstyles') {
				return '<div id="otherstyles_spotlight_'+sku+'" class="other_styles spotlight"><div class="slide_content"><ul></ul></div><div class="slide_buttons"><a href="javascript:void(0);" class="sl_previous" title="View Previous Page of Alternate Styles"></a><a href="javascript:void(0);" class="sl_next" title="View Next Page of Alternate Styles"></a></div></div>';
			}
			
			if(section.toLowerCase() == 'title'){
				//TITLE
				return '<span class="product_title">'+result.RECORDS[0].PROPERTIES.P_ModelName+'</span>'
			}
			
			
			if(section.toLowerCase() == 'reviewsummary'){
				//REVIEWSUMMARY
				return '<div id="BVRRSummaryContainer"></div>';
			}
			
			if(section.toLowerCase() == 'price'){
				//PRICE
				var html = '';
				if(result.RECORDS[0].PROPERTIES.P_StyleSalePrice != result.RECORDS[0].PROPERTIES.P_StyleListPrice) {
					html = '<div data-info="product_price" class="product_price"><div class="old"><span class="label"></span><span class="value">$'+result.RECORDS[0].PROPERTIES.P_StyleListPrice.toFixed(2)+'</span></div><div class="sale"><span class="label"></span><span class="value">$'+result.RECORDS[0].PROPERTIES.P_StyleSalePrice.toFixed(2)+'</span></div></div>';
				} else {
					html = '<div data-info="product_price" class="product_price"><div class="regular_price"><span class="label"></span><span class="value">$'+result.RECORDS[0].PROPERTIES.P_StyleSalePrice.toFixed(2)+'</span></div></div>';
				}
				return html;
			}
			
			if(section.toLowerCase() == 'sku'){
				//SKU
				return '<span class="product_sku"><span class="label">'+settings.skuLabel+'</span><span class="value">'+sku+'</span></span>';
			}
			
			if(section.toLowerCase() == 'messaging'){
				//SKU
				return '<div class="product_messaging" data-info="product_messaging"><span class="label">'+settings.skuLabel+'</span><span class="value">'+sku+'</span></div>';
			}
			
			if(section.toLowerCase() == 'styleinfo'){
				//COLOR
				return '<span class="product_styleinfo">'+window['styles_'+model][sku][methods.getStyleValue('attributes')]+'</span>';
			}
			
			if(section.toLowerCase() == 'exclusion'){
				//SKU
				return '<div class="sku_messaging"></div>';
			}
			
			
			if(section.toLowerCase() == 'launchtimer'){
				//COLOR
				return '<div class="pdp_timer" id="pdp_timer"></div>';
			}
			
			if(section.toLowerCase() == 'launchcopy'){
				//COLOR
				return '<div id="launchPostCopy"></div>';
			}
			
			if(section.toLowerCase() == 'sizeselect'){
				//SIZESELECT
				if(window['model_'+model].HASSIZES) {
					html = '<span class="product_sizes" data-info="product_sizes">';
					if(settings.sizeType == 'links') {
						$.each(window['model_'+model].AVAILABLE_SIZES, function(s, size) {
						    html += '<a href="javascript:void(0);" title="size ' + size + '" data-value="' + size + '" data-modelsize="' + $.trim(size).replace(/[^0-9a-z-]/gi, '_') + '" data-sfs="false" class="disabled button">' + size + '</a>';
						});
					} else if(settings.sizeType == 'select') {
						html += '<select>';
						$.each(window['model_'+model].AVAILABLE_SIZES, function(s, size) {
						    html += '<option value="' + size + '" title="size ' + size + '" data-value="' + $.trim(size) + '" data-modelsize="' + $.trim(size).replace(/[^0-9a-z-]/gi, '_') + '" class="disabled" disabled="disabled">' + size + '</option>';
						});
						html += '</select>';
						
					} else {
					}
					html += '</span>';
				}
				return html;
			}
			
			if(section.toLowerCase() == "pdp_fulfillmenttype") {
								
				html += '<form id="shipform_'+sku+'">';
				html += '<div class="delivery" data-info="product_delivery" data-fulfillmenttype="'+settings.pdp_fulfillmentType+'">';
					html += '<div id="dm_shiptohome">';
					
						html += '<span class="radio_btn">';
						
						html += '<input id="qv_deliveryMethod_shiptohome" name="rdo_deliveryMethod" data-fulfillmenttype="'+settings.pdp_fulfillmentType+'" value="shiptohome" type="radio" ';
						if(settings.pdp_fulfillmentType != 'PICKUP_IN_STORE' && settings.pdp_fulfillmentType != 'SEND_TO_STORE') {
							html += ' checked="checked"';	
						}
						
						html += ' />';					
						
						html += '</span>';	
						html += '<label id="lbl_shiptohome" class="lbl_shiptohome" for="qv_deliveryMethod_shiptohome">';
							html += '<span data-image="ship-truck"></span>';
							html += '<span class="pdp_sprite" data-image="radio_btn"></span>';
							html += '<span data-text="fulfillmenttype">';
							
							if(window['styles_'+model][sku][methods.getStyleValue('metadata')]['FREE_STANDARD_SHIPPING']) {
								html += '<div id="pdp_freeShipping">';
									html += '<div class="black"><span class="red" data-message="free_shipping"></span></div>';
								html += '</div>';
							}
							
							html += '</span>';
						html += '</label>';
					html += '</div>';
					html += '<div id="dm_storepickup">';
						html += '<span class="radio_btn">';
						
						html += '<input id="qv_deliveryMethod_storepickup" name="rdo_deliveryMethod" value="storepickup" type="radio"';
								
						if(settings.pdp_fulfillmentType !== 'SHIP_TO_HOME' && settings.pdp_fulfillmentType !== 'SHIP_FROM_STORE') {
							html += ' checked="checked"';	
						}
						
						html += ' />';		
						html += '</span>';							
						
						html += '<label style="opacity: 1;" id="lbl_storepickup" class="lbl_storepickup" for="qv_deliveryMethod_storepickup">';
							html += '<span data-image="ship-store"></span>';
							html += '<span class="pdp_sprite" data-image="radio_btn"></span>';
								html += '<span data-text="fulfillmenttype">';
								html += '<div id="storepickup_msg"><span class="small_link"><span id="deliveryMethod_link" title="Find A Store To Pickup Order At"></span></span></div>';
							html += '</span>';
						html += '</label>';
					html += '</div>';
				html += '</div>'; 
				html += '</form>'; 
				return html;
			}
			
			if(section.toLowerCase() == 'quantity'){
				//QUANTITY
				html = '<span class="product_quantity">';
				html += '<a href="javascript:void(0);" class="subtract_quantity" title="Decrease Quantity">-</a>';
				html += '<input type="tel" id="quantity_'+sku+'" size="3" maxlength="2" readonly="readonly" name="quantity" value="1">';
				html += '<a href="javascript:void(0);"class="add_quantity" title="Increase Quantity">+</a>';
				html += '</span>';
				return html;
			}
			
			if(section.toLowerCase() == 'addtocart'){
				//ADDTOCART
				if(settings.type == 'update') {
				    html = '<div class="add_to_cart update"><span data-info="add_to_cart"><a href="javascript:void(0);" data-btnname="qvpdp_updateCart" class="cta_button button" data-addsku="' + sku + '" data-addmodel="' + model + '" title="Add To Cart Button"><span></span></a><div data-info="add_errors"></div></span></div>';
				} else {
				    html = '<div class="add_to_cart"><span data-info="add_to_cart"><button data-btnname="qvpdp_addToCart" class="cta_button button disabled" data-addsku="' + sku + '" data-addmodel="' + model + '" title="Add To Cart Button"><span></span></button><div data-info="add_errors"></div></span></div>';
				}
				return html;
			}
			
			if(section.toLowerCase() == 'videos'){
				//FIT INFO
				html = '<div data-info="videos"></div>';
				return html;
			}		
			
			if(section.toLowerCase() == 'fitinfo'){
				//FIT INFO
				html = '<div data-info="fit_info"></div>';
				return html;
			}			
			
			if(section.toLowerCase() == 'sizing_link'){
				//AVAILABILITY
				html = '<div class="sizing_link"><a href="javascript:void(0);" data-info="sizing_link"><span title="View Sizing Chart"></span></a></div>';
				return html;
			}		
			
			if(section.toLowerCase() == 'sfsmessage'){
				//AVAILABILITY
				html = '<div data-info="sfsmessage" data-sfsmessage="false"><span>'+settings.SFSMessage+'</span></div>';
				return html;
			}		
			
			if(section.toLowerCase() == 'availability'){
				//AVAILABILITY
				html = '<div data-info="availability" data-availability="none"><span></span></div>';
				return html;
			}	
			
			
			if(section.toLowerCase() == 'customize'){
				//AVAILABILITY
				html = '<div class="customize" data-info="customize" style="display:none;"><a href="'+result.RECORDS[0].PDPURL+'" class="button cta_button" data-btnname="inline_customize"><span></span></a></div>';
				return html;
			}	
			
			if(section.toLowerCase() == 'addtowishlist'){
				//ADDTOWISHLIST
				html = '<div class="add_to_wishlist" data-info="add_to_wishlist"><a href="javascript:void(0);" class="button" data-addsku="'+sku+'" data-addmodel="'+model+'" title="Add To Wishlist"></a><div data-info="wishlist_errors"></div></div>';
				return html;
			}
			
			
			if(section.toLowerCase() == 'fulldetails'){
				//FULL DETAILS
				html = '<div class="full_details"><a href="'+vars.canonicalURL+'" class="button" title="Expanded View"></a></div>';				return html;
			}
			
			
			if(section.toLowerCase() == 'fblike'){
				//FACEBOOK LIKE
				html = '<!-- START FACEBOOK LIKE -->';
				html += '<div id="social_facebook" class="social_media">';
					html += '<div class="fb-like" data-action="like" data-href="'+vars.canonicalURL+'" data-colorscheme="light" data-show-faces="false" data-width="80" data-layout="button_count" data-send="false"></div>';
				html += '</div>';
				html += '<!-- END FACEBOOK LIKE -->';
				return html;
			}
			if(section.toLowerCase() == 'fbshare'){
				//FACEBOOK SHARE
				html = '<!-- START FACEBOOK SHARE -->';
				html += '<div id="social_facebookShare" class="social_media">';
				//html += '<div class="fb_share"><fb:share-button type="button" href="http://www.champssports.com/share/product/' + model + '/' + sku + '/"></fb:share-button></div>';
				html += '<div class="fb_share"><fb:share-button type="button" href="http://' + vars.canonicalURL + '"></fb:share-button></div>';
				html += '</div>';
				html += '<!-- END FACEBOOK SHARE -->';
				return html;
			
			}
			if(section.toLowerCase() == 'twitter'){
				//FACEBOOK LIKE
				html = '<!-- START TWITTER -->';
				html += '<div id="social_twitter" class="social_media"><a class="twitter-share-button" href="http://twitter.com/share" data-url="'+vars.canonicalURL+'" data-count="none" data-via="'+settings.siteName+'">Tweet</a>';
					html += '<script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>';
				html += '</div>';
				html += '<!-- END TWITTER -->';
				return html;
			}
			if(section.toLowerCase() == 'google'){
				//Google +1
				html = '<!--  START GOOGLE -->';
				html += '<div id="social_google" class="social_media">';
					html += '<div class="g-plusone" data-annotation="none" data-href="'+vars.canonicalURL+'" data-size="medium"></div>';
					html += '<script type="text/javascript"><!--';
						html += '(function() {';
							html += 'var po = document.createElement(\'script\'); po.type = \'text/javascript\'; po.async = true;';
							html += 'po.src = \'https://apis.google.com/js/plusone.js\';';
							html += 'var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(po, s);';
						html += '})();';
					html += '// --></script>';
				html += '</div>';
				html += '<!-- END GOOGLE -->';
				return html;
			}
			if(section.toLowerCase() == 'pinterest'){
				//PINTEREST PINIT
				
				html = '<!-- START PINTEREST -->';
				html += '<div id="social_pinterest" class="social_media"><a class="pin-it-button" href="http://pinterest.com/pin/create/button/?url='+vars.canonicalURL+'&amp;media=//images.'+settings.site+'.com/'+settings.imagesource+'/'+sku+'/'+settings.imagesize+'/&amp;description=%0A" data-pin-config="none"><img title="Pin It" border="0" src="https://assets.pinterest.com/images/PinExt.png" /></a>';
				html += '<script type="text/javascript" src="https://assets.pinterest.com/js/pinit.js"></script>';
				html += '</div>';
				html += '<!-- END PINTEREST -->';
				return html;
			}
			
			if(section.toLowerCase() == 'description'){
				if(typeof(window['model_'+model]) !== 'undefined') {
					html += '<div class="description" data-tabcontent="description"><div class="content">'+window['model_'+model].INET_COPY+'</div></div>';
				}
				return html;
			}
			if(section.toLowerCase() == 'reviews') {
				return '<div class="reviews" data-tabcontent="reviews"><div class="content"><div id="BVRRSecondarySummaryContainer"></div><div id="BVRRContainer"></div></div></div>';
			}
			if(section.toLowerCase() == "sizing") {
				
				html += '<div id="sizefit" data-tabcontent="sizing"></div>'; 
				return html;
			}
			if(section.toLowerCase() == 'questions') {
				return '<div class="questions" data-tabcontent="questions"><div class="content"><div id="BVQAContainer"></div></div><div id="BVQACustomerID" style="display: none;"></div><div id="BVQAReturnURL" style="display: none;">__RETURN__</div><div class="content"><div id="BVQASessionParams" style="display: none;"></div></div></div>';
			}
			if(section.toLowerCase() == 'recommendations') {
				return '<div class="pdp_recommendations"><div class="content"></div></div>';
			}
		},
		getPDPHTML : function(script, element) {
			var $element = element;
			var sku = $element.attr('data-sku');
			var model = $element.attr('data-model');
			var findStyle = $element.attr('data-model');
			
			if(window['styles_'+model][sku][methods.getStyleValue('XforY')]) {
				console.log('XforY');	
			}
			var html = '<div id="qv_product_'+sku+'" class="qv_content" data-model="'+model+'" data-sku="'+sku+'">'
					
					html += '<div class="product_contents">';
					
						html += settings.pdpTemplate.replace(/(\[pdp\.)([^\]]*)(\])/gi, function(m, p1, section, p3){return methods.getSectionHTML(section, sku, model, script);});
											
					html += '</div>';
					
				html += '</div>';
			
			return html;
		},
	
		// Actions to jump to current section/tab
		swapTabs : function(tab, scroll) {
			
			//$('#show_videos').show();
			//$('#product_videos .content').hide();
			if(scroll) {
				$(settings.scrollTarget).stop();
				$(settings.scrollTarget).animate({scrollTop:($('.qv_content .tab_container').offset().top + $(settings.scrollTarget).scrollTop() - $(settings.headerElem).outerHeight()) - $(document).scrollTop()}, 400, function() {
					console.log($(settings.scrollTarget).scrollTop() + $('.qv_content .tab_container').offset().top);
					$('.qv_content div[data-tabcontent]').hide();
					$('.qv_content div[data-tabcontent='+tab+']').css({'display':'inline-block'});
					$('.qv_content a[data-tab]').removeClass('selected');
					$('.qv_content a[data-tab='+tab+']').addClass('selected');	
				});
			} else {
				$('.qv_content div[data-tabcontent]').hide();
				$('.qv_content div[data-tabcontent='+tab+']').css({'display':'inline-block'});
				$('.qv_content a[data-tab]').removeClass('selected');
				$('.qv_content a[data-tab='+tab+']').addClass('selected');
			}
			switch(tab){
			    case 'sizing':
			        methods.conversionEventTag("Sizing Tab - Open", "PDP - SIZING");
			        break;
			    default:
			        break;
			}
			$(window).resize();
			$(window).scroll();	
		},
		
		// Initiates Tab listeners
		initTabs: function () {
		    $('#pdp_view a[data-tab]').each(function () {
		        $(this).attr('title', 'View ' + $(this).text());
		        if ($(this).text() == 'Q & A') {
		            $(this).attr('title', 'View Questions & Answers');
		        }
		    });
		    $('#pdp_view a[data-tab]').on('click', function () {
				methods.swapTabs($(this).attr('data-tab'));
				return false;
			});
		},
		getSkus : function(model, sku, listener, element) {
			var date = new Date()
			var timestamp = date.getFullYear()+''+date.getDate()+''+date.getMonth();
			var sku_nbr = sku;
			$.ajax({
				method : 'get',
				dataType : 'script',
				cache : true,
				url: '//' + settings.domain + settings.modelScript + timestamp+'_'+model+'_pdp.js?cd=1m',
				beforeSend: function(jqXHR) {
					jqXHR.overrideMimeType("text/javascript; charset=iso-8859-1");
				},
				complete: function() {
					var modelInfo = new Object();
					modelInfo.model = model;
					modelInfo.skus = [];
					modelInfo.price = [];
					$.each(window['styles_'+model], function(m, mod) {
						var sku = new Object();
						sku.sku = m;
						sku.data = mod;
						modelInfo.skus.push(sku);
						modelInfo.price.push(mod[6]);
					});
					
					//modelInfo.maxPrice = Math.max.apply( Math, modelInfo.price ).toFixed(2);
					//modelInfo.minPrice = Math.min.apply( Math, modelInfo.price ).toFixed(2);
					//console.log('Price Range - ' + modelInfo.maxPrice + ' - ' + modelInfo.minPrice);
					listener(modelInfo, element);
				}
			});
		},
		bvcreateproductviewtag : function(totalReviewsCount, avgRating, buyAgainPercentage, cm_isProductMaskedPricing, cm_isLaunchSku) {
			var model_name = result.RECORDS[0].PROPERTIES.P_ModelName;
			var sku = $("#pdp_selectedSKU").val();
			cm_Attributes = totalReviewsCount + "-_-" + avgRating + "-_-" + buyAgainPercentage + "-_-" + cm_isProductMaskedPricing + "-_-" + cm_isLaunchSku;
			if (cm_Attributes != null) {
				$("#bvRRAttributes").val(cm_Attributes);
			}
			if(typeof(vars.cm_CategoryID) == 'undefined' || vars.cm_CategoryID == '') {
				vars.cm_CategoryID = null;	
			}
			if(cm_Attributes == '') {
				cm_Attributes = null;	
		
			}
			if(typeof(cm_ProductTemplate) == 'undefined' || cm_ProductTemplate == '') {
				cm_ProductTemplate = null;	
			}
			if(typeof(cm_microsite) == 'undefined' || cm_microsite == '') {
				cm_microsite = null;	
			}
			try {
				cmCreateProductviewTag(sku, model_name, vars.cm_CategoryID, cm_ProductTemplate, cm_microsite, cm_Attributes);
			} catch(err){}
		},
		coremetrics : function() {
			var cm_ClientID = settings.cm_ClientID;
			if(typeof(cmSetProduction) == "function") {
				cmSetProduction();
			}
			cm_HOST = vars.cm_HOST + "/eluminate?";
		},
		isaPDPCallback : function(sku, size, qty, storeNumber, fulfillmentType, storeCostOfGoods){
			
			settings.sku = sku;
			$('#pdp_selectedSize').val(size);
			settings.qty = qty;
			settings.storeNumber = storeNumber;
			settings.pdp_fulfillmentType = fulfillmentType;
			settings.storeCostOfGoods = storeCostOfGoods;
		
			switch (fulfillmentType) {
			case "PICKUP_IN_STORE":
			case "SEND_TO_STORE":
					//$('#product_form').attr('action', replaceURL($('#product_form').attr('action'), 'cm', 'ISA PICKUPHERE'));
					break;
			case "SHIP_TO_HOME":
					//$('#product_form').attr('action', replaceURL($('#product_form').attr('action'), 'cm', 'ISAADDTOCART'));
					break;
			}
			methods.addToCart('skip');
		},
		afterOpen: function () {
		    window.isaCartCloseCallback = function (e) {
		        e.stopPropagation();
		        return false;
		    }
		    window.processStoreLookupForm = function () {
		        var findBtnInterval, opCount=0;
			    if (gotStoresForLocation) {
			        $('#storepickup form button[data-btnname="isa_checkSize"]').removeClass('processingbtn');
			        //Because the data is being built by a third-party script, we have to wait and watch for the DOM
                    //elements to arrive on the page
			        findBtnInterval = window.setInterval(function () {
			            var fsdlink, freeshipdetails;
                        //Look for store pickup buttons
			            if ($('#storepickup form button[data-btnname="isa_pickupHere"]').length > 0) {
			                $('#storepickup form button[data-btnname="isa_pickupHere"]').attr('title', 'Pickup Here Button');
                            //Look for free shipping details link
			                if ($('#shiptohome p.method').text().lastIndexOf('FREE') >= 0 && $('#shiptohome span.method a').length > 0) {
			                    fsdlink = $('#shiptohome span.method a');
			                    //The HTML sets the href to a javascript call with the data we need
                                //so we break it up on ' and find the message we want (at index 3)
			                    freeshipdetails = fsdlink.attr('href').split('\'')[3];
                                //Build this if defined, since the interval might cycle halfway through the last time run through.
			                    if (typeof freeshipdetails != 'undefined') {
                                    //Update out free shipping details link
			                        $('#map').before('<span id="freeshippingbubble" style="display:none;">' + freeshipdetails + '</span>');
			                        fsdlink.attr('id', 'freeshipdetails').attr('href', 'javascript:void(0);');
			                        Tipped.create($('#freeshipdetails'), 'freeshippingbubble', { 'showOn': settings.tooltipAction, 'target': '#freeshippingdetails', 'hook': 'topmiddle', 'inline': true, 'closeButton': global_settings.TOUCH_DEVICE, maxWidth: 350 });
			                        fsdlink.attr('title', 'View Free Shipping Details');
			                    }
			                    window.clearInterval(findBtnInterval); //Kill the interval
			                } else {
                                //Catch to help prevent infinite looping
			                    opCount++;
			                    if (opCount >= 20) {
			                        window.clearInterval(findBtnInterval);
			                    }
			                }
			            } else {
			                //Catch to help prevent infinite looping
			                opCount++;
			                if (opCount >= 20) {
			                    window.clearInterval(findBtnInterval);
			                }
			            }
			            opCount++;
			        }, 300);
			        $('#storepickup').on('click', '.delivery form button[data-btnname]', function () {
			            $(this).addClass('processingbtn');
			        });
			        return false;
			    }
				$("#three.step").hide();
				
				var form = $(this);
				var location = form.find("input[name=location]").val();
					var saveLocationParam = "";
				if (location != "" && ! gotStoresForLocation) {
					clearMarkers();
					geocoder.geocode({'address': location}, function(results, status) {	
						if (validateGeocoding(results, status)) {
							setCenter(results[0]);
			
									displayProcessing();
			
							hideDistance = !areResultsSpecific(results[0].address_components);
			
							if(storePickupSaveLocation) {
									saveLocationParam = "&setLocation=" + location;
									storePickupSaveLocation=false;
							}
			
							$.getJSON("/storepickup/locations?action=getLocations" + saveLocationParam + "&latlng=" + geoLocation.toUrlValue() + "&requestKey=" + locRequestKey + "&rnd=" + getRandom(), function(response) {
								if (response.success) {
									gotStoresForLocation = true;
									locRequestKey = response.nextRequestKey;
									storeLocations = response.data.locations;
									if (favoriteStoresEnabled && sourceOfCall == "myAccount") {
										storeLocations = spliceOutFavoriteStores(storeLocations, true);
									}
									displayStoreListing(storeLocations, false);
									if(!methods.isaCheck(false)) {
										$('#one form').trigger('submit');
									}
									//$('#storepickup form button[data-btnname="isa_checkSize"]').click();
									if(!window['model_'+$("#pdp_model_nbr").val()].HASSIZES) {
										$('#flyin_container #storepickup form button[data-btnname="isa_findStores"]').css({'display':'block'});
									} else { 
										$('#flyin_container #storepickup form button[data-btnname="isa_findStores"]').hide()
									}
									
								}
								else {
									displayServiceUnavailable(1);
								}
								//settings.initCall = false;
								hideProcessing();
							});
						}
						else {
							storeLocations = [];
							displayStoreListing(storeLocations, false);
							settings.initCall = false;
						}
						
					});
				}
				
				return false;
			}
			$('#storepickup #map').each(function() {
				$(this).appendTo($(this).parent('.content'));
			});
			$('#storepickup #nav').each(function() {
				$('#one').appendTo($(this));
				$(this).prependTo($(this).parent('.content'));
			});
			$('#isaContainer').removeClass('favContainer');
			//window.processCheckSizesForm = function(){};
			
			$('#storepickup form button[data-btnname="isa_checkSize"]').off('click');
			$('#storepickup form button[data-btnname="isa_checkSize"]').on('click', function() {
			    if (!methods.isaCheck()) {
			        $(this).addClass('processingbtn');
					$('#one form').trigger('submit',[true]);
				}
				return false;
			});
			$('#one form').unbind('submit');
			$('#one form').bind('submit',function(e, manual) {
				e.stopPropagation();
				
				if(manual && !methods.isaCheck(manual) && !methods.isaCheck(manual)) {
					$('#two form').submit();
				}
				//$('#storepickup form button[data-btnname="isa_checkSize"]').click();
			});
			$('<label for="location" />').insertBefore('#one input[name="location"]');
			$('label[for="isa_sizes"]').text('');
			$('#storepickup').prepend('<div class="isa-header"><span class="heading"></span><span class="subheading"></span></div>');
			$('#storegrid').prepend('<div class="storegridheader"><label for="storegrid"></label></div>');
			$('#one form').attr('id', 'locationForm');
			$('#two form').attr('id', 'sizeForm');
			$('#storepickup form button[data-btnname="isa_checkSize"]').attr('title', 'Find Stores Button');
			$('#storepickup form button[data-btnname="isa_addToCart"]').attr('title', 'Add To Cart Button');

			try{
			    displayProductOptions();
			    //Move the size select 
			    var box = $('<div class="content"></div>');
			    var sizeSelector = $('#sizeForm').detach();
			    box.insertAfter('#two .messaging');
			    box.append(sizeSelector);
				/*window.processStoreLookupForm = function() {
					$('#one form input[type="image"]').click();
					$('#two form input[type="image"]').click();
					return false;
				}*/
			} catch(err) {}
		},
		isaCheck : function(manual) {
			$('#isa_size_error').remove();
			$('#isa_zip_error').remove();
			var errors = false;
			if(manual) {
				if($('#storepickup select[name="sizes"]').val() == 'null') {
					$('#storepickup select[name="sizes"]').before('<div id="isa_size_error">Please Select a Size</div>');
					errors = true;
				} 
				
				if($('#storepickup input[name="location"]').val() == '' || $('#storepickup input[name="location"]').val().toLowerCase() == 'zip code or city, state') {
					$('#storepickup input[name="location"]').before('<div id="isa_zip_error">Please Select a Location</div>');
					errors = true;
				}
			}
			if (errors === true) {
			    $('#storepickup form button[data-btnname="isa_checkSize"]').removeClass('processingbtn');
			}
			settings.initCall = false;
			return errors;
		},
		conversionEventTag : function(conversionCategory,conversionEvent) {
			try {
				cmCreateConversionEventTag(conversionCategory,1,conversionEvent,0);
			} catch(err){}
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
		}
	};
	
	$.fn.inlinepdp = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.inlinepdp' );
	    } 
	};
})(jQuery);
/* END quickview */
