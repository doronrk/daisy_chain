var hot_skus;

$.extend(productVariables, {
	nonSaleLabel : '',
	initCall : true,
	reviewsLoaded : false,
	regularPriceLabel : '',
	saleLabel : '',
	percentLabel : 'Discount: ', // Default label in front of Percent Off
	savingsLabel : 'Save: ', // Default label in front of Savings
	displayPercent : false, // Display Percent Off
	displaySavings : false, // Display Savings
	outOfStockMessage : '', // Display after out of stock size
	showOutOfStock : true, // Display out of stock sizes
	launchLoaded : false,
	launchHelp : '/content/launchHelp',
	inlineZoomDim : ['1000','1000'],
	inlineZoomSettings : {'type':'drag','initAction':'click','zoomLevels':['100%','1000']},
	productSpotlightSettings : {'swipe':false},
	readmoreSettings : {'readmoretext':'read more +','readlesstext':'read less -'},
	pdpStyle : 'tabbed',
	showTrueSize : true,
	fitGuarentee : '//www.footlocker.com/fit/',
	pdpVideoSettings : {'ajaxVideoURL':'/shared/pdp/product_videos?site=champssports&'},
	recentlyViewedOptions : {'maxProducts':5,'imageSize': ['cart','c'], 'noProducts' : ''},
	otherStylesOptions : {'maxProducts':4,'imageSize': ['cart','c']},
	adjust : $('#fixed_banner').height(),
	pinInfo : false,
	pinTabs: false,
	tooltipAction: 'click',
	sizeSelectSize : 1,
	sizeChart: '/sizingData/?returnType=html&SizeChart_cd=',
	backorderMessage: '<span class="message" id="boNoticeMessage">Back-ordered, Expected to Ship {DATE}</span>',
	pdpTop : parseInt($('.pdp_wrapper').offset().top) - 45
});
$.extend(productFunctions, {
	
	// Call to Update Select Size section for current SKU
	updateSizes : function() {
		$('.pdp_wrapper').attr('data-hassizes', model.HASSIZES);
		$('[data-info="sfsmessage"]').html(productVariables.SFSMessage);
		if(model.HASSIZES) {
			
			if(!productVariables.displaySFS) {
				productVariables.SFSMessage = '';
			}
			$('.product_sizes_content .product_sizes').empty();
			if(productVariables.showOutOfStock) {
				$.each(productVariables.modelData.AVAILABLE_SIZES, function(m, modelSize) {
				    $('.product_sizes_content .product_sizes').append('<a title="Size ' + $.trim(modelSize) + '" data-value="' + $.trim(modelSize) + '" data-modelsize="' + $.trim(modelSize).replace(/[^0-9a-z-]/gi, '_') + '" data-sfs="false" class="disabled button">' + $.trim(modelSize) + '</a>');
				});
				$.each(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')], function(s, size) {
					$('.product_sizes_content .product_sizes a[data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').removeClass('disabled').attr('href','javascript:void(0);');
					if(size[4].toLowerCase() == 'n' && size[5].toLowerCase() == 'y') {
						$('.product_sizes_content .product_sizes a[data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').attr('data-sfs','true');
					}
					if (size[6] !== 'N') {
					    $('.product_sizes_content .product_sizes a[data-modelsize=' + $.trim(size[0]).replace(/[^0-9a-z-]/gi, '_') + ']').attr('data-backordered', size[3]);
					}
				});
			} else {
				$.each(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')], function(s, size) {
					$('.product_sizes_content .product_sizes').append('<a href="javascript:void(0);" data-value="'+$.trim(size[0])+'" class="button" data-modelsize="'+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+'">'+$.trim(size[0])+'</a>');
					if(size[4].toLowerCase() == 'n' && size[5].toLowerCase() == 'y') {
						$('.product_sizes_content .product_sizes a[data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').append(productVariables.SFSMessage).attr('data-sfs','true');
					}
					if (size[6] !== 'N') {
					    $('.product_sizes_content .product_sizes a[data-modelsize=' + $.trim(size[0]).replace(/[^0-9a-z-]/gi, '_') + ']').attr('data-backordered', size[3]);
					}
				});
			}
			if($('[href=".product_sizes_content"]').attr('data-pushdown') !== 'true') {
				$('[href=".product_sizes_content"]').pushdown();
				$('[href=".product_sizes_content"]').attr('data-pushdown','true');
			}
			//$('div[data-info=product_sizes] #sizes select option:disabled').append(productVariables.outOfStockMessage);
			$('.product_sizes_content .product_sizes a[data-value]').off('click');
			$('.product_sizes_content .product_sizes a[data-value]').on('click', productFunctions.selectSize);
			
			if(!productVariables.TOUCH_DEVICE) {
				$('.product_sizes_content .product_sizes a[data-value]').off('mouseover');
				$('.product_sizes_content .product_sizes a[data-value]').on('mouseover',productFunctions.mouseoverSize);
			
				$('.product_sizes_content .product_sizes a[data-value]').off('mouseout');
				$('.product_sizes_content .product_sizes a[data-value]').on('mouseout',productFunctions.mouseoutSize);
			}
			$('[data-info="sizing_link"]').off('click');
			$('[data-info="sizing_link"]').on('click', function() {
				productFunctions.swapTabs('sizing', true);	
			});
							
			/*$('div[data-info=product_sizes] #sizes select').on('mouseup touchstart', function(e){
				if($('div[data-info=product_sizes] #sizes select').val() == $('#pdp_selectedSize').val() && e.target.nodeName.toLowerCase() !== 'select' && $('div[data-info=product_sizes] #sizes select').val() !== null){
					$('div[data-info=product_sizes] #sizes select').change();
				}
			});*/
			if($("#pdp_selectedSize").val() != '' && ($('.product_sizes_content a[data-value="'+$("#pdp_selectedSize").val()+'"]').length > 0 && !$('.product_sizes_content a[data-value="'+$("#pdp_selectedSize").val()+'"]').hasClass('disabled'))) {
				$('.product_sizes_content a[data-value="'+$("#pdp_selectedSize").val()+'"]').click();
				$('.product_sizes_content a[data-value="'+$("#pdp_selectedSize").val()+'"]').trigger('mouseout');
				//$('div[data-info=product_sizes] #sizes select').change();
			} else {
				$('.select_size [href=".product_sizes_content"]').html('').removeClass('size_selected');
				$('[data-btnname*="_addToCart"]').addClass('disabled');
			}
			//$('div[data-info=product_sizes] #sizes').append($('<div />',{'data-info':'fit_info'}));
			if(productVariables.fitGuarentee != '') {
				//$('div[data-info=product_sizes] #sizes').append($('<a />',{'data-info':'fit_guarentee','href':productVariables.fitGuarentee}));
			}
			//$('div[data-info=product_sizes] #sizes').append($('<div />',{'id':'size_footer'}));
		} else {
			productFunctions.selectSize('');	
			var size = productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][0];
			if(size[4].toLowerCase() == 'n' && size[5].toLowerCase() == 'y') {
				$('[data-info="sfsmessage"]').attr('data-sfsmessage', 'true');
				$('#pdp_fulfillmentType').val('SHIP_FROM_STORE');
			} else {
				$('[data-info="sfsmessage"]').attr('data-sfsmessage', 'false');
			}
		}
	},
    // Call to Update Messaging
	updateMessaging: function () {
	    $('[data-info=product_messaging]').empty();
	    if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['FREE_STANDARD_SHIPPING']) {
	        $('[data-info=product_messaging]').append(productVariables.freeShippingMessage);
	        $('#dm_shiptohome').attr('data-free_shipping', 'true');
	    } else {
	        $('#dm_shiptohome').attr('data-free_shipping', 'false');
	    }
	    if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['CHANNEL_AVAIL_ICON'] == 'WEB_ONLY') {
	        $('[data-info=product_messaging]').append(productVariables.webExclusive);
	    }
	    if (typeof (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['IS_NEW_ARRIVAL']) !== 'undefined' && productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['IS_NEW_ARRIVAL']) {
	        $('[data-info=product_messaging]').append(productVariables.netItemMessage);
	    }
	    if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('hasXforY')]) {
	        $('[data-info=product_messaging]').append('<a href="/XYPromo/model:' + model_nbr + '/sku:' + sku_nbr + '/?xyMessage=back" class="message" data-xfory="' + productVariables.styleData[sku_nbr][productFunctions.getStyleValue('XforY')].split('.')[0] + '" title="Buy more and save. View Details.">&nbsp;</a>');
	    }
	    if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')] !== "truesize.gif" && productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')] !== '') {
	        $('[data-info=product_sizes]').append('<div class="fitIcon" data-fiticon="' + productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')].split('.')[0] + '"></div>');
	    }
	    if ($('#pdp_selectedSize').val() != '') {
	        var currentSelectedSize = $('.product_sizes_content .product_sizes a[data-modelsize=' + $.trim($('#pdp_selectedSize').val()).replace(/[^0-9a-z-]/gi, '_') + ']');
	        if (typeof currentSelectedSize.attr('data-backordered') != 'undefined') {
	            $('[data-info=product_messaging]').append(productVariables.backorderMessage.replace('{DATE}', currentSelectedSize.attr('data-backordered')));
	        }
	    }
	},
	mouseoverSize : function() {
		$('div[data-info="availability"] span').hide();
		$('div[data-info="availability"]').attr('data-availability', 'instock');
		for (var index = 0; index < productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')].length; index++) {
		    if ($.trim(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][index][0]) == $.trim($(this).attr('data-value'))) {
		        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][index][6] != 'N') {
		            $('div[data-info="availability"]').attr('data-availability', 'backordered');
		            $('div[data-info="availability"]').attr('data-date', productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][index][3]);
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
		if (model.HASSIZES && ($('#pdp_selectedSize').val().trim() == "" || ($('[data-info="product_sizes"] a.selected[data-value]').length == 0 && $('#storepickup select[name="sizes"]').val() == null) ) ) {
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
	launchStoreOverlay : function() {
		try{ 
			$.modal.data.isLoading = false;
			$.modal.data.isOpen = false;
		} catch(err) {}
			$('<div />',{'id':'modal-container','data-title':'In-Store Availability'}).html($('<div />',{'id':'isaOverlay'})).flyin({'openTab':true,'keepTab':'true','callback':function() {
			try{
				$('a[data-tab="In-Store Availability"]').hide();
				$.modal.defaults.containerId = "isaContainer";
				
				if(typeof(processStoreLookupForm) == 'undefined') {
					$.modal.defaults.onAfterOpen = function() {
						productFunctions.afterOpen();		
					}
				} else {
					productFunctions.afterOpen();						
				}
				
			} catch(err) {}
			//if(!$.modal.data.isLoading && !$.modal.data.isOpen) {
				//onFindStoreLinkClick();
				$('#qv_content [data-title="In-Store Availability"] [data-action="closeisa"]').remove();
				$('#qv_content [data-title="In-Store Availability"]').prepend('<a href="javascript:void(0);" data-action="closeisa" onclick="onCloseButtonClick(\'top\')" class="button modal-close" data-btnname="isa_cancel" title="Cancel Button"><span></span></a>');
				$('#qv_content [data-title="In-Store Availability"] a[data-action="closeisa"]').off('click')
				$('#qv_content [data-title="In-Store Availability"] a[data-action="closeisa"]').on('click', function() {
					$.flyin('removeTab','In-Store Availability');
				});
				onFindStoreLinkClick();
				launchStorePickupOverlay('pdp', isaPDPCallback,0,0);
			//}
		}});
	},
	
	// Load Sizing and Fit information
	getSizing : function() {
		
		$.get(productVariables.sizeChart + model.SIZECHART_CD, function(data) {
			$('[data-tabcontent="sizing"]').html(data);
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
			//cmCreateConversionEventTag("Sizing Information - Open", 2, "PDP - SIZING", 0);
		});
		
		productFunctions.getFitInfo();		
	},
	selectSize : function(size) {
		if(!$(this).hasClass('disabled')) {
			$('#pdp_selectedSize').val('');
			if(size) {
				$('.product_sizes_content .product_sizes a[data-value]').removeClass('selected');
				$(this).addClass('selected');
				//$('#product_sizes_header a').html($(this).attr('data-value')).addClass('size_selected');
				
				if($(this).attr('data-sfs') == 'true') {
					$('#pdp_fulfillmentType').val('SHIP_FROM_STORE');	
				}
				$('#pdp_selectedSize').val($(this).attr('data-value'));
				try {
					$('[href=".product_sizes_content"]').pushdown('close');
				} catch(err){}
			}
			$('.select_size [href=".product_sizes_content"]').addClass('size_selected');
			$('.select_size [href=".product_sizes_content"]').html($(this).attr('data-value'))
			try {
				$('[href=".product_sizes_content"]').pushdown('close');
			} catch(err){}
			$('[data-btnname*="_addToCart"]').removeClass('disabled');
			$('[data-btnname*="_addToCart"]').removeAttr('disabled');
			productFunctions.updatePrice(); // Update price when size has changed.
			productFunctions.updateMessaging();
			$('[data-info=add_errors]').empty();
			$('[data-info=add_errors]').hide();
		}
	},
	reviewsLoaded :function() {
		$('div[data-tabcontent=reviews]').attr('data-loaded', 'true');
		if(productVariables.reviewsLoaded) {
			
			$('html, body').stop();
			$('html, body').animate({scrollTop:($('.pdp_wrapper #BVRRDisplayContentID').offset().top- $('#fixed_banner').outerHeight())}, 400, function() {
			});
			//methods.swapTabs('reviews', true);
		}
		productVariables.reviewsLoaded = true;
	},
	afterOpen : function() {
	    window.processStoreLookupForm = function () {
	        var findBtnInterval, opCount = 0;
		    if (gotStoresForLocation) {
		        $('#storepickup form button[data-btnname="isa_checkSize"]').removeClass('processingbtn');
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
		                        Tipped.create($('#freeshipdetails'), 'freeshippingbubble', { 'showOn': productVariables.tooltipAction, 'target': '#freeshippingdetails', 'hook': 'topmiddle', 'inline': true, 'closeButton': global_settings.TOUCH_DEVICE, maxWidth: 350 });
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
			if (location != "" && !gotStoresForLocation) {
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
								if(!productFunctions.isaCheck(false)) {
									$('#one form').trigger('submit');
								}
								//$('#storepickup form button[data-btnname="isa_checkSize"]').click();
								if(!model.HASSIZES) {
									$('#flyin_container #storepickup form button[data-btnname="isa_findStores"]').css({'display':'block'});
								} else {
									$('#flyin_container #storepickup form button[data-btnname="isa_findStores"]').hide();
								}
							}
							else {
								displayServiceUnavailable(1);
							}
							
							hideProcessing();
						});
					} else {
						storeLocations = [];
						displayStoreListing(storeLocations, false);
						productVariables.initCall = false;
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
		    if (!productFunctions.isaCheck()) {
		        $(this).addClass('processingbtn');
			    $('#one form').trigger('submit', [true]);
		    }
		});

		$('<label for="location" />').insertBefore('#one input[name="location"]');
		$('label[for="isa_sizes"]').text('');
		$('#storepickup').prepend('<div class="isa-header"><span class="heading"></span><span class="subheading"></span></div>');
		$('#storegrid').prepend('<div class="storegridheader"><label for="storegrid"></label></div>');
		$('#one form').attr('id', 'locationForm');
		$('#two form').attr('id', 'sizeForm');

	    $('#one form').unbind('submit');
	    $('#one form').bind('submit', function (e, manual) {
	        e.stopPropagation();

	        if (manual && !productFunctions.isaCheck(manual)) {
	            $('#two form').submit();
	        }
	        //$('#storepickup form button[data-btnname="isa_checkSize"]').click();
	    });
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
		} catch (err) { }
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
		productVariables.initCall = false;
		return errors;
	},
	// Loads Recommendations(MyBuys)
	getRecommendations : function(element) {
		if(typeof(mybuys) !== 'undefined') {
			
			var settings = {
				'pageType' : 'PRODUCT_DETAILS',
				'zone':'1',
				'pt' : 'prod',
				'set' : {'productid':sku_nbr},
				'callback': function (data) {
				    $('.recommendations .content a').off('click'); $('.recommendations .content a').on('click', function () {
				        $.quickview({ 'title':'View Featured Product', 'sku': sku_nbr });
				        try {
				            eval($(this).attr('data-trackurl'));
				        } catch (err) { }
				    });
				    var pdpRecommendSpotlight = $('.recommendations #recommendations_spotlight').spotlight({ transition: 'slide', rotate: false });
				    if ($('.recommendations #recommendations_spotlight ul li').length > 0) {
				        $('.recommendations #recommendations_spotlight .sl_previous').click(function () { pdpRecommendSpotlight.previousSlide(); });
				        $('.recommendations #recommendations_spotlight .sl_next').click(function () { pdpRecommendSpotlight.nextSlide(); });
				    } else {
				        $('.recommendations #recommendations_spotlight .sl_previous').hide();
				        $('.recommendations #recommendations_spotlight .sl_next').hide();
				    }
				}
			}
			
			$('form#product_form .recommendations .content').recommendations(settings)
			
		}
	}
});
function addToCart(skip) {
	
	$('[data-info="add_to_cart"] button').removeClass('processing');
	$('[data-info="add_to_cart"] button').addClass('processing');
	$('[data-info="product_sizes"] a.selected[data-value]').length;
	$('#storepickup select[name="sizes"]').val()
	 if($('[data-info="product_sizes"] a.selected[data-value]').length == 0 && $('#storepickup select[name="sizes"]').val() == null) {
		 $('#size').val(' ');
		 $('#pdp_selectedSize').val(' ');
	 }

	$("#pdp_quantity").val($('#quantity').val());
	var errMsg = productFunctions.validateProduct();
	if (errMsg != "") {
		productFunctions.displayError($('[data-info=add_errors]'), '<ul>'+errMsg+'</ul>');
		$('[data-info="add_to_cart"] button').removeClass('processing');
		return;
	} else {
		$('[data-info=add_errors]').empty();	
	}

	if ($("#deliveryMethod_storepickup").is(":checked") && $("#pdp_storeNumber").val() == 0 && skip != 'skip') {
		productFunctions.launchStoreOverlay()
		return;
	}

	disableToCartButton();
	var sku = $('#pdp_selectedSKU').val();
	var size = $('#pdp_selectedSize').val();
	var qty = $('#pdp_quantity').val();
	var pdp_fulfillmentType = $('#pdp_fulfillmentType').val();
	var storeNumber = $('#pdp_storeNumber').val();
	var storeCostOfGoods = $('#pdp_storeCostOfGoods').val();
	window.displayLaunchHelp = function() {
		return false;
	};
	$('#launchHalt a').live('click', function(e) {
		var $element = $(this);
		e.stopPropagation();
		$.ajax({
			url:	productVariables.launchHelp,
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
	if ($("#pdp_hasXYPromo").length == 0 || $("#pdp_hasXYPromo").val() == "true") {
		try{
			$.cartActions('add',{'qty':qty,'sku':sku,'size':size,'fulfillmentType':pdp_fulfillmentType,'storeNumber':storeNumber,'storeCostOfGoods':storeCostOfGoods}, function(data){
				jqueryPDPSettings.addToCartCallback(data);
			});	
		} catch(err){}
		//miniAddToCart.openMiniAddToCart("product_form");
	}
	enableToCartButton();
	return false;
}
$(document).ready(function(e) {
    $('.pdp_wrapper .subtract_quantity').live('mousedown', function() {
		var quant = parseInt($(this).parent().children('input[name="quantity"]').val());
		if(quant > 1) {
			quant--;
			$(this).parent().children('input[name="quantity"]').val(quant);
		}
	});
	$('.pdp_wrapper .add_quantity').live('mousedown', function() {
		var quant = parseInt($(this).parent().children('input[name="quantity"]').val());
		quant++;
		$(this).parent().children('input[name="quantity"]').val(quant);
	});
	try {
		var data = {'promo_id':'5','product_id':sku_nbr };
		if(typeof(model.BRAND) !== 'undefined') {
		$.extend(data,{'brand':model.BRAND});
		}
		if(typeof(model.SPORTS) !== 'undefined') {
		$.extend(data,{'sport':model.SPORTS[0].NM});
		}
		if(typeof(model.GENDER_AGE) !== 'undefined') {
		$.extend(data,{'gender':model.GENDER_AGE});
		}
		$.conversant({'data':data});
	} catch(err){}
});