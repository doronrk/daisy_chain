document.touchmove = function (e) { e.preventDefault(); };
var domain = location.hostname;
var cwSearchSpotlight = new Array();


var jqueryCartActionsSettings = {
	actionCallback : function(section, type, value) {
		if(type != 'launchQueue' && type != 'sharedCartMerged' && type != 'persistentCartMerged' && type != 'ineligbleLines' && type != 'outOfStock') {
			$('.attention').hide();	
			$('.attention .inner').attr('data-title', 'attention');
			$('.attention .inner').width(480);
			$('.attention .inner').flyin({ 'initial_width': '480px', 'position': 1, 'callback': function () {
				$('#qv_content [data-title="attention"]').width(480);
				$('[data-section="checkout"] a[data-btnName="_checkstores"]').on('click', function(e) {
					closeFlyin();
				});
				$('[data-section="checkout"] a[data-btnName="_product"]').on('click', function() {
					closeFlyin();
				});
				$('[data-section="add"] a[data-btnName="_continue"]').on('click', function() {
					$.flyin('removeTab','attention');
					$('[data-info="add_to_cart"] button').removeClass('processing');
				});
				$('[data-section="checkout"] a[data-btnName="_continue"]').on('click', function() {
					closeFlyin();
				});
				$('[data-section="cart"] a[data-btnName="_continue"]').on('click', function() {
					closeFlyin();
				});
			}});	
		} else {
			$('.attention').show();	
		}
	}
}


var jqueryCartSettings = {
	trackTagging : false,
	lineItemTemplate : '[product.image]<span class="product_info">[product.title][product.price][product.size][product.sku][product.color][product.qty]</span>[product.sfsmessage][product.cartmessaging][product.pdp_fulfillmenttype][product.storepickup]',
	removeFromCartCallback : function(data) {
		console.log('REMOVED FROM CART');	
		UpdateHeaderCartCount(data);
	},
	addToCartCallback : function(data) {
		console.log('ADDED TO CART');
		showCart(true, true, data);
		UpdateHeaderCartCount(data);
	},
	checkoutCallback : function(data) {
		$.cartActions('getCartInfo', function(cartdata) {
			if(cartdata.data.cart.lines.length > 0 || jqueryCartSettings.type == 'checkout'){
				location.href = 'https://'+location.hostname+'/checkout/';
			} else  {
				showCart(true, true);
			}	
		}, true);
	},
	recommendCallback : function() {
		var recommendSpotlight = $('#cart_recommendations #cart_recommendations_spotlight').spotlight({ transition: 'slide', rotate: false });
		if ($('#cart_recommendations #cart_recommendations_spotlight ul li').length > 0) {
			$('#cart_recommendations #cart_recommendations_spotlight .sl_previous').click(function () { recommendSpotlight.previousSlide(); });
			$('#cart_recommendations #cart_recommendations_spotlight .sl_next').click(function () { recommendSpotlight.nextSlide(); });
		} else {
			$('#cart_recommendations #cart_recommendations_spotlight .sl_previous').hide();
			$('#cart_recommendations #cart_recommendations_spotlight .sl_next').hide();
		}
	}
};

var jqueryFlyinSettings = {
	scrollSettings : {'cursorwidth':'18px','cursorcolor':'#b2906a','cursorborder':'1px solid #997c5c','cursorborderradius':'0px','autohidemode':'false','background':'#000',' horizrailenabled': 'false'}
};
var jqueryPDPSettings = {
	pdpTemplate : '[pdp.images][pdp.alternateviews][pdp.otherstyles][pdp.videos]<div class="product_info">[pdp.title][pdp.reviewsummary][pdp.price]<span class="pinnedAdd">[pdp.pdp_fulfillmentType]<div class="add_section"><div class="select_size"><a href=".product_sizes_content" class="button" onclick="return false;"><span></span></a></div>[pdp.quantity][pdp.addtocart]<div class="product_sizes_content">[pdp.fitinfo]<div class="qv_close"><a href=".product_sizes_content" class="close" title="Close Size Box" data-btnType="close" data-btnName="size_close"><span></span></a></div>[pdp.sizeselect][pdp.availability][pdp.sizing_link][pdp.sfsmessage]</div></div>[pdp.customize][pdp.sfsmessage][pdp.launchTimer][pdp.launchCopy]</span>[pdp.addtowishlist][pdp.fulldetails]<div class="info">[pdp.sku][pdp.styleinfo][pdp.exclusion][pdp.messaging]</div></div><div class="social">[pdp.fblike][pdp.twitter][pdp.pinterest][pdp.google]</div><div class="product_overview"><div class="scroll-down-circle" data-scroll-target=".flyin_content"></div><div class="section">PRODUCT OVERVIEW</div><div></div><div class="pdp_header"><span class="header_content"><span class="tab_container"><span class="tab first"><a href="#" data-tab="description">Description</a></span><span class="tab"><a href="#" data-tab="reviews">Reviews</a></span><span class="tab"><a href="#" data-tab="sizing">Size &amp; Fit</a></span><span class="tab last"><a href="#" data-tab="questions">Q &amp; A</a></span></span></span></div>[pdp.description][pdp.reviews][pdp.sizing][pdp.questions]</div><div class="recommendations"><div class="scroll-down-circle" data-scroll-target=".flyin_content"></div>[pdp.recommendations]</div>',
	sizeType : 'links',
	headerElem : '#flyin_container .flyin_header',
	loadingHTML:'<img src="/ns/common/champssports/images/loading.gif" border="0" />',
	pdpVideoSettings : {'ajaxVideoURL':'/shared/pdp/product_videos?site=champssports&'},
	reviewsURL : '//champssports.ugc.bazaarvoice.com/static/8006/bvapi.js',
	callback : function(data) {
		$('.pinnedAdd').animate({
			'bottom' : 0
		}, 1000);
		try {
			$('[href=".product_sizes_content"]').pushdown();
		} catch(err) {}
		$('.qv_content a[data-tab="description"]').click();
		//getHookups(data.sku);	
		showCart(false);
	},
	selectSizeCallback : function(size) {
		$('#inline_errors').remove();
		$('.select_size [href=".product_sizes_content"]').addClass('size_selected');
		$('.select_size [href=".product_sizes_content"]').html(size)
		try {
			$('[href=".product_sizes_content"]').pushdown('close');	
		} catch(err) {}
	},
	recommendCallback : function() {
		var pdpRecommendSpotlight = $('.pdp_recommendations #pdp_recommendations_spotlight').spotlight({ transition: 'slide', rotate: false });
		if ($('.pdp_recommendations #pdp_recommendations_spotlight ul li').length > 0) {
			$('.pdp_recommendations #pdp_recommendations_spotlight .sl_previous').click(function () { pdpRecommendSpotlight.previousSlide(); });
			$('.pdp_recommendations #pdp_recommendations_spotlight .sl_next').click(function () { pdpRecommendSpotlight.nextSlide(); });
		} else {
			$('.pdp_recommendations #pdp_recommendations_spotlight .sl_previous').hide();
			$('.pdp_recommendations #pdp_recommendations_spotlight .sl_next').hide();
		}
	},
	addToCartCallback : function(data) {
	/*	if(data.errors.length > 0) {
			$('#inline_errors').remove();
			$('#qv_content .add_section').prepend('<div id="inline_errors"></div>');
			$.each(data.errors, function(e, err) {
				$('#inline_errors').append('<div class="error">'+err.MESSAGE+'</div>');
			});
		} else {	*/		
			console.log('ADDED TO CART');
			$('[data-info="add_to_cart"] button').removeClass('processing');
			showCart(true, true, data);
			UpdateHeaderCartCount(data);
		//}
	}
};

$(document).ready(function (e) {
	var curDate = new Date();
    $('div[data-currentdate]').each(function() {
		$(this).attr('data-currentdate', curDate.getDate());	
    });
	$('a[data-btnname="checkout_editCart"]').on('click', function(e) {
	    e.stopPropagation();
		jqueryCartSettings.type = 'checkout';
		showCart(true, true);
		return false;
	});
    // POPULATE CATEGORY PRODUCTS
    $('#nav_categories li').each(function () {
        GetNavProducts($(this).attr('data-nav'));
    });
	$('#wl_list a').each(function() {
		$(this).removeAttr('href');
	});

	if ($('.secondary-global-banner').length > 0) {
	    $('.secondary-global-banner').appendTo('#header');
	}

	if ($('#offer_banner_spotlight .slide_content ul li').length == 0) {
	    $('.rotating-banner-slides li').each(function () {
	        $(this).appendTo('#offer_banner_spotlight .slide_content ul');
	    });
	}

    /* MOVING HEADER OUT OF WRAPPER DIV */
    $('#wrapper').before($('#header'));

	/* SHOPPING CART MANIPULATION */
	$('#order_summary .cart_count').text($('#order_summary_content .item_count_value').text());
	$('#order_summary a').on('click', function () { 
		if(location.href.indexOf('/checkout/') !== -1) {
			jqueryCartSettings.type = 'checkout';
		}
		showCart(true) 
	});

    /* LOGIN MESSAGING MANIPULATION */
	if ($('#member_welcome').length > 0) {
	    // logged in
	    $('#nav_login .guest').remove();
	    $('#header_login a').remove();
	    var accountName = $('#member_welcome').text().split('Welcome back ')[1].split('!')[0];
	    if (accountName.length <= 7) {
	        $('.header_login').addClass('member').html('<span>' + accountName + '\'s </span>Account');
	    } else {
	        $('.header_login').addClass('member').text('My Account');
	    }
	    $('#nav_login .logged-in h2').text($('#member_welcome').text());
	    $('#nav_login .logged-in span').text('Not ' + accountName + '?');
	    $('#header_login').attr('data-nav', 'login');
	} else {
	    // guest
	    $('#nav_help').find('a[title="View My Account"]').attr('id','help_myAccount').attr('href', 'javascript:openLoginDialogForID(\'help_myAccount\', null, null, function () { updateWelcome() }, null, \'Guest Message\', \'Log In\', \'true\', \'true\');').attr('rel','nofollow');
	    $('.header_login').addClass('guest');
	    $('#nav_login .logged-in').remove();
	}
	
    /* SEARCH RESULTS MANIPULATION */
	$('.rating').ratings();
	$('.mainsite_search_adjustments').eq(0).prependTo($('#pbContent'));
	$('#searchResultsInfo').prependTo($('#pbContent'));
	$('label[for="sortVal"]').html($('label[for="sortVal"]').text());
    try {
        var ippSelectHtml = '<option value="" disabled selected>' + $('#endecaSearch .searchResultsPaging.first .itemsPerPage span').text() + '</option>';
        $('#endecaSearch .searchResultsPaging.first .itemsPerPage a').each(function () {
            ippSelectHtml += '<option title="View ' + $(this).text() + ' Items Per Page" value="' + $(this).attr('href') + '">' + $(this).text() + '</option>';
        });
        $('#endecaSearch .searchResultsPaging.first .itemsPerPage').append('<select onchange="window.location.href=this.options[this.selectedIndex].value;" name="rppVal">' + ippSelectHtml + '</select>');
        if ($('#endecaSearch .searchResultsPaging.first .itemsPerPage select option').length <= 1) {
            $('#endecaSearch .searchResultsPaging.first .itemsPerPage').hide();
        }
    } catch (e) { }

	$('#endeca_search_results ul li:not(.clearRow)').each(function() {
		var sku = $(this).attr('data-sku');
		var model = $(this).attr('data-model');
		var pdpUrl = $(this).children('a').attr('href');
		var tempParamters = '';
		var urlParameters = {};
		if (pdpUrl.indexOf('?') > 0) {
		    tempParameters = pdpUrl.split('?')[1].split('&');
		    $.each(tempParameters, function (i, v) {
		        urlParameters[v.split('=')[0]] = v.split('=')[1];
		    });
		    if (urlParameters.hasOwnProperty('size') && urlParameters.size !== '') {
		        $(this).children('a').attr('data-size', decodeURIComponent(urlParameters.size));
		        $(this).children('a').on('click', function () {
		            jqueryPDPSettings.selected_size = $(this).attr('data-size');
		        });
		    }
		}


		$(this).children('a').attr('href','javascript:$.quickview({\'tab\':\'Featured\',\'title\':\'View Featured Product\',\'sku\':\''+sku+'\',\'model\':\''+model+'\',\'position\':1,\'loadingHTML\':\'<img src="/ns/common/champssports/images/loading.gif" border="0" />\'});');

		$(this).find('.product_title').before('<div class="colorways"><img src="/ns/common/champssports/images/loading.gif" /></div>');
	});
	$('.rating').each(function () {
	    var rating = $(this).attr('data-ratings').split('_');
	    $(this).attr('title', 'Product Rating of ' + rating[0] + '.' + rating[1]+' / 5');
	});
	
	/* CHECKOUT MANIPULATION */
	
	$('#order_summary_top a').on('click', function() {
		showCart();
	});

	$('#checkoutHelpContainer').insertBefore($('#checkout_page'));
	$('<div id="checkout-norton-logo"><img src="/ns/common/images/nortonsecured-logo-wht.jpg" width="102px" height="59px" alt="Norton Secured - Powered by Verisign"></div>').insertAfter($('#checkout_page #right_column'));
	
	/* MOVES LABELS TO PLACEHOLDER TEXT IN INPUT
		
	$('#checkout_page label').each(function() {
		var $input = $('#checkout_page #'+$(this).attr('for'));
		$input.attr('placeholder', $(this).html());
		console.log($input.prop("tagName"));
		if($input.attr('type') == 'text' || $input.attr('type') == 'tel' || $input.attr('type') == 'email' || $input.attr('type') == 'number') {
			$(this).hide();
		}
	});*/
	
    // START SEARCH RESULTS MENU
    if($('#endecaSearchWrapper').length) {
        if ($('#NRsuggestion').length == 0) {
            if (window.location.pathname.indexOf('keyword-') >= 0) {
                var searchTerm = window.location.pathname.split('keyword-')[1].split('&')[0].split('+');
                if (searchTerm[0] !== '') {
                    var searchHeading = searchTerm[0];
                    if (searchTerm.length > 1) {
                        for (var i = 1; i < searchTerm.length; i++) {
                            searchHeading += ' ' + searchTerm[i];
                        }
                    }
                }
            } else {
                var searchHeading = $('.breadcrumbs a.goto').eq(1).text();
            }
        } else {
            var searchHeading = $('#NRsuggestion a').text().replace(/"/g, '');
        }
        $('<div class="endeca-search-heading"><span><div class="heading-text">' + decodeURIComponent(searchHeading) + '</div><div class="search-heading-social"><a href="http://www.facebook.com/sharer/sharer.php?u=' + window.location.href + '" target="_blank"><img src="/ns/common/champssports/images/social-icons/facebook-64x64.png" border="0"></a><a href="http://twitter.com/home?status=' + window.location.href + '" target="_blank"><img src="/ns/common/champssports/images/social-icons/twitter-64x64.png" border="0"></a><a href="https://plus.google.com/share?url=' + window.location.href + '" target="_blank"><img src="/ns/common/champssports/images/social-icons/googleplus-64x64.png" border="0"></a><a href="http://pinterest.com/pin/create/button/?url=' + window.location.href + '&media=' + window.location.origin + '/ns/common/champssports/images/logo.png&description=" data-pin-do="skipLink" target="_blank"><img src="/ns/common/champssports/images/social-icons/pinterest-64x64.png" border="0"></a></div></span></div>').insertBefore($('#wrapper'));
    } 
	
    if ($('.endeca-search-heading').length > 0) {
        createSearchHeaderButtons();
    }
	$('#endecaNav h3').remove();
	$('.mainsite_search_adjustments').eq(0).prepend('<h3 class="menu_btn"><a href="javascript:void"><span></span></a></h3>');
	$('#endecaSearch').attr('data-navopen', 'true');
	/*if($.localStorage('read', 'searchNav') != 'open' || $.localStorage('read', 'searchNav') == '') {
		$('#endecaSearch').attr('data-navopen', 'false');
	} else {
		$('#endecaSearch').attr('data-navopen', 'true');
	}*/
	if($('#endecaSearch').attr('data-navopen') != 'true') {
		$('#endecaSearch').attr('data-navopen', 'false');
		$('#pbContentLeftColumn').stop();
		$('#pbContentLeftColumn').animate({ 'margin-left': '-' + $('#pbContentLeftColumn').outerWidth() }, 400);
		$('#endecaSearch h3.menu_btn').attr('title', 'Narrow The Results');
	} else {
		$('#endecaSearch').attr('data-navopen', 'true');
		$('#pbContentLeftColumn').stop();
		$('#pbContentLeftColumn').animate({ 'margin-left': '0' }, 400);
		$('#endecaSearch h3.menu_btn').attr('title', 'Hide Filter Options');
	}
	$('#endecaSearch h3.menu_btn').on('click', function() {
		if($('#endecaSearch').attr('data-navopen') != 'true') {
			$('#endecaSearch').attr('data-navopen', 'true');
			$('#pbContentLeftColumn').stop();
			$('#pbContentLeftColumn').animate({ 'margin-left': '0' }, 400);
			$(this).attr('title', 'Hide Filter Options');
			//$.localStorage('create', 'searchNav','open');
		} else {
			$('#endecaSearch').attr('data-navopen', 'false');
			$('#pbContentLeftColumn').stop();
			$('#pbContentLeftColumn').animate({ 'margin-left': '-' + $('#pbContentLeftColumn').outerWidth() }, 400);
			$(this).attr('title', 'Narrow The Results');
			//$.localStorage('create', 'searchNav','closed');
		}
	});
	
    // START MY ACCOUNT MENU
	if ($('#account_sidenav').length > 0) {
	    $('#myaccount').prepend('<div class="menu_btn"><a href="javascript:void(0);"></a></div>');
	}
	if($('#myaccount').attr('data-navopen') != 'true') {
		$('#myaccount').attr('data-navopen', 'false');
		$('#account_sidenav').stop();
		$('#account_sidenav').animate({'margin-left':'-300px' }, 400);
		$('#myaccount .accountInfoBox').animate({'margin-left':'0'}, 400);
	} else {
		$('#myaccount').attr('data-navopen', 'true');
		$('#account_sidenav').stop();
		$('#account_sidenav').animate({'margin-left':'0'}, 400);
		$('#myaccount .accountInfoBox').animate({'margin-left': $('#account_sidenav').outerWidth() }, 400);
	}
	$('#myaccount .menu_btn a').on('click', function() {
		if($('#myaccount').attr('data-navopen') != 'true') {
			$('#myaccount').attr('data-navopen', 'true');
			$('#account_sidenav').stop();
			$('#account_sidenav').animate({'margin-left':'0'}, 400);
			$('#myaccount .accountInfoBox').animate({'margin-left': $('#account_sidenav').outerWidth() }, 400);
		} else {
			$('#myaccount').attr('data-navopen', 'false');
			$('#account_sidenav').stop();
			$('#account_sidenav').animate({'margin-left':'-300px' }, 400);
			$('#myaccount .accountInfoBox').animate({'margin-left':'0'}, 400);
		}
	});
	
	// START HELP MENU
	$('#custserv').prepend('<div class="menu_btn"><a href="javascript:void(0);"><span></span></a></div>');
	if($('#custserv').attr('data-navopen') != 'true') {
		$('#custserv').attr('data-navopen', 'false');
		$('#helpindex').stop();
		$('#helpindex').animate({'margin-left':'-'+$('#helpindex').outerWidth() }, 400);
		$('#helpcontent').animate({'margin-left':'0'}, 400);
	} else {
		$('#custserv').attr('data-navopen', 'true');
		$('#helpindex').stop();
		$('#helpindex').animate({'margin-left':'0'}, 400);
		$('#helpcontent').animate({'margin-left': $('#helpindex').outerWidth() }, 400);
	}
	$('#custserv .menu_btn a').on('click', function() {
		if($('#custserv').attr('data-navopen') != 'true') {
			$('#custserv').attr('data-navopen', 'true');
			$('#helpindex').stop();
			$('#helpindex').animate({'margin-left':'0'}, 400);
			$('#helpcontent').animate({'margin-left': $('#helpindex').outerWidth() }, 400);
		} else {
			$('#custserv').attr('data-navopen', 'false');
			$('#helpindex').stop();
			$('#helpindex').animate({'margin-left':'-'+$('#helpindex').outerWidth() }, 400);
			$('#helpcontent').animate({'margin-left':'0'}, 400);
		}
	});
	try{
		$('[data-favoritesList]').favoritesList({imageDomain:'images.champssports.com',callback:function() {
			$('[data-favoritesList="1"] ul li').each(function() {
				
				//INLINE PDP
				/*$('[data-favoritesList="1"] ul li').each(function() {
					$(this).inlinepdp({sku:$(this).attr('data-sku'), model:$(this).attr('data-model'),'loadingHTML':'<img src="/ns/common/champssports/images/loading.gif" border="0" />'});
				});*/
				
				//FLYIN PDP 	
				$(this).on('click', function() {
				    $.quickview({'title':'View Featured Product','sku':$(this).attr('data-sku'),'model':$(this).attr('data-model'),'position':1,'loadingHTML':'<img src="/ns/common/champssports/images/loading.gif" border="0" />','callback':showCart()});
					return false;
				});
			});
		}});
	} catch (err) { }

    /* CHECKOUT REARRANGING */
	if ($('#payMethodCCIcon').length > 0) {
	    for (var i = 0; i < $('#payMethodCCIcon td').length; i++) {
	        $('#payMethodCCSelection td').eq(i).children('input').appendTo($('#payMethodCCIcon td').eq(i));
	    }
	}
	$('#payMethodCCIcon td').eq(0).hide();
	$('#creditCardForm').parent().children('td').eq(0).hide();
    /* END CHECKOUT REARRANGING */

	window.myFavoriteStores = function() {
		try{ 
			$.modal.data.isLoading = false;
			$.modal.data.isOpen = false;
		} catch(err) {}
			$('<div />',{'id':'modal-container','data-title':'In-Store Availability'}).html($('<div />',{'id':'isaOverlay','class':'favContainer'})).flyin({'openTab':true,'keepTab':'true','callback':function() {
			try{
			    //$('a[data-tab="In-Store Availability"]').hide();
			    $('a[data-tab="In-Store Availability"]').html('Favorite<br />Stores').attr('title', 'Favorite Stores');
				$.modal.defaults.containerId = "isaContainer";
				window.processStoreLookupForm = function() {
					if(gotStoresForLocation)
						return false;
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
										$('#two form input[type="image"]').click();
									}
									else {
										displayServiceUnavailable(1);
									}
									
									hideProcessing();
								});
							}
							else {
								storeLocations = [];
								displayStoreListing(storeLocations, false);
							}
						});
					}
					return false;
				}
				$('#one form').submit(function() {
				});
				$.modal.defaults.onAfterOpen = function() {
					$('#storepickup #map').each(function() {
						$(this).appendTo($(this).parent('.content'));
					});
					$('#storepickup #nav').each(function() {
						$('#one').appendTo($(this));
						$(this).prependTo($(this).parent('.content'));
					});
					$('#zero').parent().insertBefore('#storepickup .messaging');
					$('[data-btnname="isa_cancel"]').addClass('favstorescancel');
					try{
						displayProductOptions();
						/*window.processStoreLookupForm = function() {
							$('#one form input[type="image"]').click();
							$('#two form input[type="image"]').click();
							return false;
						}*/
					} catch(err) {}
				}
			} catch(err) {}
			//if(!$.modal.data.isLoading && !$.modal.data.isOpen) {
				//onFindStoreLinkClick();
				$('#qv_content [data-title="In-Store Availability"] [data-action="closeisa"]').remove();
				$('#qv_content [data-title="In-Store Availability"]').prepend('<a href="javascript:void(0);" data-action="closeisa" onclick="onCloseButtonClick(\'top\')" class="button modal-close" data-btnname="isa_cancel"><span></span></a>');
				$('#qv_content [data-title="In-Store Availability"] a[data-action="closeisa"]').off('click')
				$('#qv_content [data-title="In-Store Availability"] a[data-action="closeisa"]').on('click', function() {
					$.flyin('removeTab','In-Store Availability');
				});
				launchStorePickupOverlay('myAccount', '', 0, 0, '', '', 0, 0);
			//}
		}});
			
		return false;
	}
});

function pushdownSwitch($el) {
	$(".js-pushdown").addClass("removed");
	$($el.get(0).getAttribute("href")).removeClass("removed");
}

/* CREATING FIXED BANNER MY STORE */
function checkFavoriteStores(position) {
    if ($.localStorage('read', 'favoriteStores') == null) {
        $.ajax({
            url: '/storepickup/locations?action=getFavoriteLocations&cd=0',
            dataType: 'json',
            type: 'get',
            async: false,
            timeout: 3000,
            success: function (d) {
                $.localStorage('create', 'favoriteStores', JSON.stringify(d));
                var loc = d.data.locations;
                if (loc.length > 0) {
                    var html = '<li id="mystore"><a class="full" href="/content/locator#s=' + loc[0].Number + '&city=' + loc[0].Zipcode.toString().substring(0, 5) + '"><strong>VISIT US AT </strong>' + loc[0].StoreFrontName + ' ' + loc[0].Address1 + '<span class="info-i"></span></a><a class="condensed" href="/content/locator#s=' + loc[0].Number + '&city=' + loc[0].Zipcode.toString().substring(0, 5) + '"><strong>VISIT US AT </strong>' + loc[0].StoreFrontName + ' ' + loc[0].Address1 + '<span class="info-i"></span></a></li>';
                    setMyStore(html, position);
                } else {
                    getIPLocation(position);
                }
            },
            error: function (e) {
                getIPLocation(position);
            }
        });
    } else {
        try {
            var d = JSON.parse($.localStorage('read', 'favoriteStores'));
            var loc = d.data.locations;
            if (loc.length > 0) {
                var html = '<li id="mystore"><a class="full" href="/content/locator#s=' + loc[0].Number + '&city=' + loc[0].Zipcode.toString().substring(0, 5) + '"><strong>VISIT US AT </strong>' + loc[0].StoreFrontName + ' ' + loc[0].Address1 + '<span class="info-i"></span></a><a class="condensed" href="/content/locator#s=' + loc[0].Number + '&city=' + loc[0].Zipcode.toString().substring(0, 5) + '"><strong>VISIT US AT </strong>' + loc[0].StoreFrontName + ' ' + loc[0].Address1 + '<span class="info-i"></span></a></li>';
                setMyStore(html, position);
            } else {
                getIPLocation(position);
            }
        } catch (e) {
            console.log(e);
            getIPLocation(position);
        }
    }
}
function getClosestStore(lat, long, position) {
    var defaultStoreMessage = '<li id="mystore"><a class="full" href="/content/locator"><strong>FIND YOUR LOCAL STORE</strong><span class="info-i"></span></a><a class="condensed" href="/content/locator"><strong>FIND YOUR LOCAL STORE</strong><span class="info-i"></span></a></li>';
    if ($.localStorage('read', 'closestStores') == null) {
        $.ajax({
            url: '/locator/locations?action=getStores&latlng=' + lat + ',' + long,
            dataType: 'json',
            type: 'get',
            async: true,
            timeout: 3000,
            success: function (d) {
                $.localStorage('create', 'closestStores', JSON.stringify(d));
                if (d.length > 0) {
                    var html = '<li id="mystore"><a class="full" href="/content/locator#s=' + d[0].id + '&city=' + d[0].postal_code.toString().substring(0, 5) + '"><strong>VISIT US AT </strong>' + d[0].division + ' ' + d[0].address1 + '<span class="info-i"></span></a><a class="condensed" href="/content/locator#s=' + d[0].id + '&city=' + d[0].postal_code.toString().substring(0, 5) + '"><strong>VISIT US AT </strong>' + d[0].division + ' ' + d[0].address1 + '<span class="info-i"></span></a></li>';
                    setMyStore(html, position);
                } else {
                    setMyStore(defaultStoreMessage, position);
                }
            },
            error: function (e) {
                setMyStore(defaultStoreMessage, position);
            }
        });
    } else {
        try {
            var d = JSON.parse($.localStorage('read', 'closestStores'));
            if (d.length > 0) {
                var html = '<li id="mystore"><a class="full" href="/content/locator#s=' + d[0].id + '&city=' + d[0].postal_code.toString().substring(0, 5) + '"><strong>VISIT US AT </strong>' + d[0].division + ' ' + d[0].address1 + '<span class="info-i"></span></a><a class="condensed" href="/content/locator#s=' + d[0].id + '&city=' + d[0].postal_code.toString().substring(0, 5) + '"><strong>VISIT US AT </strong>' + d[0].division + ' ' + d[0].address1 + '<span class="info-i"></span></a></li>';
                setMyStore(html, position);
            } else {
                setMyStore(defaultStoreMessage, position);
            }
        } catch (e) {
            console.log(e);
            console.log(position);
            setMyStore(defaultStoreMessage, position);
        }
    }
}
function getIPLocation(position) {
    var defaultStoreMessage = '<li id="mystore"><a class="full" href="/content/locator"><strong>FIND YOUR LOCAL STORE</strong><span class="info-i"></span></a><a class="condensed" href="/content/locator"><strong>FIND YOUR LOCAL STORE</strong><span class="info-i"></span></a></li>';
    if ($.localStorage('read', 'currentLocation') == null) {
        $.ajax({
            url: '/locator/locations?action=getGeoLocation&cd=0',
            dataType: 'json',
            type: 'get',
            async: true,
            timeout: 3000,
            success: function (d) {
                if ($.isEmptyObject(d)) {
                    setMyStore(defaultStoreMessage, position);
                } else {
                    $.localStorage('create', 'currentLocation', d.lat+','+d.long);
                    getClosestStore(d.lat, d.long, position);
                }
            },
            error: function (e) {
                setMyStore(defaultStoreMessage, position);
            }
        });
    } else {
        try {
            var latLng = $.localStorage('read', 'currentLocation').split(',');
            getClosestStore(latLng[0], latLng[1], position);
        } catch (e) {
            console.log(e);
            setMyStore(defaultStoreMessage, position);
        }
    }
}
function setMyStore(html, position) {
    if ($('#offer_banner_spotlight .slide_content ul li').length == 0) {
        $('.rotating-banner-slides li').each(function () {
            $(this).appendTo('#offer_banner_spotlight .slide_content ul');
        });
    }
    var slide = position - 1;
    if (slide == 0) {
        $('#offer_banner_spotlight .slide_content ul').prepend(html.toString());
    } else {
        $('#offer_banner_spotlight .slide_content ul li:eq(' + (slide - 1) + ')').after(html);
    }
    SetBannerSpotlight();
}
/* END FIXED BANNER MY STORE */

/* FIXED BANNER SPOTLIGHT SCRIPTS */
function SetBannerSpotlight() {
    var bannerSpotlight = $('#offer_banner_spotlight').spotlight({ transition: 'slide', intervalLength: '10', transitionLength: 1, endStop: false });
    if ($('#offer_banner_spotlight .slideitem1').length > 0) {
        $('#offer_banner_spotlight .sl_previous').click(function () { bannerSpotlight.previousSlide(); });
        $('#offer_banner_spotlight .sl_next').click(function () { bannerSpotlight.nextSlide(); });
    } else {
        $('#offer_banner_spotlight .sl_previous').hide();
        $('#offer_banner_spotlight .sl_next').hide();
    }
}
$('a.open-disclaimer').live('click', function () {
    $('body').append('<div id="global-banner-html" data-title="Disclaimer" style="display:none;"></div>');
    $('#global-banner-html').html($('#global-banner-disclaimer').html());
    $('#global-banner-html').flyin({ 'initial_width': '480px', 'position': 1, 'callback': function () {
            $('#global-banner-html').show();
        }
    });
});

function UpdateHeaderCartCount(d) {
    $('#order_summary .cart_count').text(d.data.cart.lines.length);
}

/* STICKY LOGO WHEN SCROLLING WINDOW */
$(window).scroll(function () {
    if ($(this).scrollTop() >= 100) {
        $('#fixed_banner .main_logo').css({'opacity':'1','-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)','top':'10px'});
    } else {
        $('#fixed_banner .main_logo').css({'opacity': '0','-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)','top': '70px'});
    }
});

$('#header_login').live('click', function () {
    if ($(this).hasClass('guest')) {
        openLoginDialogForID('header_login', null, null, function () { updateWelcome() }, null, 'Guest Message', 'Log In', 'true', 'true');
        return false;
    }
});

/* BEGIN SEARCH AND NAVIGATION FUNCTIONS */

$('.js-global-nav-link').live('click', function () {
    $(this).addClass('selected');
    $('#js-search').slideUp('slow');
});
$('.js-global-nav-link.selected').live('click', function () {
    CloseNavBottomLevel();
    CloseNavSecondLevel();
    CloseNavTopLevel();
    $('#ex_nav').slideUp('slow');
    $('#header_nav > div.selected').removeClass('selected');
    $(this).removeClass('selected');
    $('#js-search').slideDown('slow');
});

$('#header_nav > div[data-nav]').live('click', function () {
    if ($(this).attr('data-nav') == 'the-drop') {
        // open external link rather than be a drop-down
        window.open('http://blog.champssports.com');
    } else {
        var e = $(this);
        $('.js-global-nav-link').addClass('selected');
        if ($('.top_header_container .search_btn').css('display') !== 'none') {
            $('#js-search').slideUp('slow');    
        }
        if ($(this).hasClass('selected')) {
            CloseNavBottomLevel();
            CloseNavSecondLevel();
            CloseNavTopLevel();
            $('#ex_nav').slideUp('slow');
            e.removeClass('selected');
            $('.js-global-nav-link').removeClass('selected');
            $('#js-search').slideDown('slow');
            $(this).attr('title', $(this).attr('data-title'));
            $(this).removeAttr('data-title');
        } else {
            CloseNavBottomLevel();
            CloseNavSecondLevel();
            CloseNavTopLevel();
            $('#header_nav > div.selected').each(function () {
                $(this).attr('title', $(this).attr('data-title'));
                $(this).removeAttr('data-title');
            });
            $('#header_nav > div.selected').removeClass('selected');
            e.addClass('selected');
            if ($('#ex_nav').css('display') == 'none') {
                $('#ex_nav').show();
            }
            $('#nav_' + e.attr('data-nav')).slideDown('slow');
            if ($(this).attr('data-nav') == 'categories') {
                $('li[data-nav="mens"]').click();
            }
            $(this).attr('data-title', $(this).attr('title'));
            $(this).attr('title', 'Collapse ' + $(this).attr('title').replace('View ', ''));
        }
    }
});

$('#header_nav > div[data-nav="release_calendar"]').live('click', function () {
    if ($('ul.relcal-prod li').length == 0) {
        csRelCal.init();
    }
});

$('li.size-drop').live('click', function () {
    var t = $(this);
    if (t.hasClass('open')) {
        t.children('.size-boxes').slideUp('slow');
        t.removeClass('open');
    } else {
        $('#ex_nav_2 .size-drop.open').each(function () {
            $(this).removeClass('open');
            $(this).children('.size-boxes').slideUp('slow');
        });
        t.addClass('open');
        t.children('.size-boxes').slideDown('slow');
    }
});

// populate closest store
$('div[data-nav="stores"]').live('click', function () {
    if ($('ul.closest-stores li').length == 0) {
        if ($.cookie('read', 'IPLONGLAT') == '') {
            console.log('no location cookie');
        } else {
            console.log('reading cookie');
            var loc = $.cookie('read', 'IPLONGLAT').split(',');
            $.getJSON('/locator/locations?action=getStores&latlng=' + loc[0] + ',' + loc[1], function (d) {
                if (d.length > 0) {
                    for (var i = 0; i < d.length; i++) {
                        $('#nav_stores .closest-stores').append('<li><h2>Champs ' + d[i].address1 + '</h2><span>' + d[i].address2 + '<br/>' + d[i].city + ', ' + d[i].state + ' ' + d[i].postal_code + '<br/>' + d[i].phone + '<br/>Distance: Approx. ' + d[i].distance + ' Miles</span></li>');
                        if (i == 2) { break; }
                    }
                    $('#nav_stores .local-stores').slideDown('slow');
                }
            });
        }
    }
});

// go to store locator page
function OpenStoreLocator() {
    if (window.location.href.indexOf('/content/locator') < 0) {
        window.location.href = 'http://' + location.hostname + '/content/locator#d=' + $('#locationInput').val();
    } else {
        window.location.href = 'http://' + location.hostname + '/content/locator#d=' + $('#locationInput').val();
        location.reload();
    }
}

$('#ex_nav li[data-nav]').live('click', function () {
    if (!$(this).hasClass('selected')) {
        $('#ex_nav li[data-nav].selected').removeClass('selected');
        $(this).addClass('selected');
        $('.ex_nav_arrow').css('left', $(this).offset().left + ($(this).width() / 2) + 'px').show();
        CloseNavBottomLevel();
        CloseNavSecondLevel();
        $('#nav_' + $(this).attr('data-nav')).slideDown('slow');
    }
});

function CloseNavTopLevel() {
    $('.ex_nav_arrow').hide();
    $('#ex_nav li[data-nav].selected').removeClass('selected');
    $('#ex_nav > ul').slideUp('slow');
}
function CloseNavSecondLevel() {
    $('#ex_nav_2 > div').slideUp('slow');
}
function CloseNavBottomLevel() {
    $('#ex_nav_2 .nav_mens').slideUp('slow');
    $('#ex_nav_2 .nav_womens').slideUp('slow');
    $('#ex_nav_2 .nav_kids').slideUp('slow');
}
function GetNavProducts(gend) {
    var html = '';
    $.ajax({
        url: '/ns/common/champssports/js/nav_products.js?cd=0',
        dataType: 'json',
        method: 'get',
        async: true,
        success: function (data) {
            try {
                for (var i = 0; i < data[gend].length; i++) {
                    html += '<li><a href="http://www.champssports.com' + data[gend][i].linkURL + '" onclick="cmCreateManualLinkClickTag(\'www.champssports.com/?cm_sp=' + data[gend][i].cmTag + '\',\'' + data[gend][i].title + '\');" title="Shop ' + data[gend][i].title + '"><img src="' + data[gend][i].imageURL + '"><span>' + data[gend][i].title + '</span></a></li>';
                }
                $('#nav_' + gend + ' ul.products').html(html);
            } catch (e) {
                console.log('Error: ' + e);
            }
            
        }
    });
}
/* END SEARCH AND NAVIGATION FUNCTIONS */

/* FIXED BANNER LOGO CLICK */
$('.banner_content .main_logo').live('click', function () {
    if ($('#homepage').length > 0) {
        $('body,html').animate({ scrollTop: 0 }, 500);
    } else {
        window.location.href = 'http://'+document.location.hostname;
    }
});

/* SCROLL DOWN CIRCLE ARROWS */
$('.scroll-down-circle').live('click touchend', function () {
    if ($(this).attr('data-scroll-target') == undefined) {
        $('body,html').animate({ scrollTop: ($(this).offset().top - 8) }, 500);
    } else {
        $($(this).attr('data-scroll-target')).animate({ scrollTop: ($(this).offset().top + 46) }, 500);
    }
});
function closeFlyin() {
	$('#flyin_container .qv_close a').click();	
}
function callCart(elem, refresh, data) {
	var $refresh = false;
	var $data = null;
	if(data) {
		$data = data;
	}
	if(refresh) {
		$refresh = refresh;
	}
	elem.cart({'loadingHTML':'<img src="/ns/common/champssports/images/loading.gif" border="0" />','refresh':$refresh, 'data':$data, 'callback': function() {
		jqueryCartSettings.trackTagging = false;
		$('[data-btnname="emptycart_continueShopping"]').off('click');
		$('[data-btnname="emptycart_continueShopping"]').on('click', function(e) {
			$('.flyin_header [data-btnname="flyin_close"]').click();
			e.stopPropagation();
			return false;
		});
		
		$('ul.cart .subtract_quantity').off('mousedown');
		$('ul.cart .subtract_quantity').on('mousedown', function() {
			var quant = parseInt($(this).parent().children('input[name="quantity"]').val());
			if(quant > 1) {
				quant--;
				$(this).parent().children('input[name="quantity"]').val(quant);
			}
		});
		$('ul.cart .add_quantity').off('mousedown');
		$('ul.cart .add_quantity').on('mousedown', function() {
			var quant = parseInt($(this).parent().children('input[name="quantity"]').val());
			quant++;
			$(this).parent().children('input[name="quantity"]').val(quant);
		});
	}});
	
}

function getHookups(sku) {
	if($('#hookups').length == 0) {
		$('<div />',{'id':'hookups','data-title':'Hookups'}).appendTo('body');
	}
	
	
	$('#hookups').flyin({'openTab':false,'position':3,'callback':function(){	
		
		$('#hookups').html('<div id="hookup_recommendation" class="recommendations"><div class="title"></div><div class="content"></div></div>');
		
		var curhookupsettings = {
			'pageType' : 'PRODUCT_DETAILS',
			'zone':'2',
			'pt' : 'prod',
			'id' : 'pdp_hookups_',
			'set' : {'productid':sku},
			'callback':function(data){
				$('#hookups .recommendations .content a').off('click');$('#hookups .recommendations .content a').on('click', function(){
				    $.quickview({'title':'View Featured Product','sku':$(this).attr('data-sku')});
					try {
						eval($(this).attr('data-trackurl'));
					} catch(err) {}
					return false;
				});
				$('#hookup_recommendation').width('540px');
				var hookupRecommendSpotlight = $('#hookup_recommendation #pdp_hookups_recommendations_spotlight').spotlight({ transition: 'slide', rotate: false });
				if ($('#hookup_recommendation #pdp_hookups_recommendations_spotlight ul li').length > 0) {
					$('#hookup_recommendation #pdp_hookups_recommendations_spotlight .sl_previous').click(function () { hookupRecommendSpotlight.previousSlide(); });
					$('#hookup_recommendation #pdp_hookups_recommendations_spotlight .sl_next').click(function () { hookupRecommendSpotlight.nextSlide(); });
				} else {
					$('#hookup_recommendation #pdp_hookups_recommendations_spotlight .sl_previous').hide();
					$('#hookup_recommendation #pdp_hookups_recommendations_spotlight .sl_next').hide();
				}
				//settings.recommendCallback();
			}
		}
	
		$('#hookups .recommendations .content').recommendations(curhookupsettings)	
	}});
}
function showCart(show, refresh, data) {
	var $refresh = false;
	var $data = null;
	if(data) {
		$data = data;
	}
	if(refresh) {
		$refresh = refresh;
	}
	
	if (window.location.pathname.substring(1).split('/')[0] === 'shoppingcart') {
	    if($('#qv_content [data-title="In-Store Availability"]').length > 0){
	        $.flyin('removeTab', 'In-Store Availability');
	        $('html,body').scrollTop(0);
	    }
	    return false;
	}

	if($('#cart').length == 0) {
		$('<div />',{'id':'cart','data-title':'Cart'}).appendTo('body');
	}
	
	
	$('#cart').flyin({'title':'View Shopping Cart','openTab':show,'position':2,'onOpen':function(){jqueryCartSettings.trackTagging = true;showCart(false,true)},'callback':function(){
		if($('#cart').html() == '' || $refresh) {
			callCart($('#cart'), $refresh, $data);
			if(jqueryCartSettings.type == 'checkout') {
				$('.flyin_header [data-btnname="flyin_savechanges"]').remove();
				$('.flyin_header [data-btnname="flyin_checkout"]').remove();
				$('.flyin_header').prepend('<a href="javascript:void(0);" class="button cta_button" data-btnname="flyin_savechanges" title="Save Changes Button"><span></span></a>');
				$('.flyin_header [data-btnname="flyin_savechanges"]').on('click', function(e) {
					$.cartActions('checkout', function(data) {
						jqueryCartSettings.checkoutCallback(data);
						try {
							cmCreateConversionEventTag('Shopping Cart',1,'Checkout',0);
						} catch(err){}
					});
				});
			} else {
				$('.flyin_header [data-btnname="flyin_savechanges"]').remove();
				$('.flyin_header [data-btnname="flyin_checkout"]').remove();
				$('.flyin_header').prepend('<a href="javascript:void(0);" class="button cta_button" data-btnname="flyin_checkout" title="Checkout Button"><span></span></a>');
				$('.flyin_header [data-btnname="flyin_checkout"]').on('click', function(e) {
					$.cartActions('checkout', function(data) {
						jqueryCartSettings.checkoutCallback(data);
						try {
							cmCreateConversionEventTag('Shopping Cart',1,'Checkout',0);
						} catch(err){}
					});
					$(this).addClass('processing');
				});
			}
		}
		
		
	}});
	return false;
}
/* FUNCTIONS FOR ADDING COLORWAYS TO SEARCH RESULTS ON HOVER */
$('#endeca_search_results > ul > li:not(.clearRow)').live('mouseenter', function () {
    if (!TOUCH_DEVICE) {
        var e = $(this);
        e.addClass('hovering');
        e.attr('data-hover', 'true');
        if (e.find('.colorways ul').length == 0) {
            GetColorways(e);
        }
    }
});
$('#endeca_search_results > ul > li:not(.clearRow)').live('mouseleave', function () {
    if ($(this).attr('data-loading') != 'true') {
        $(this).removeClass('hovering');
    }
    $(this).attr('data-hover', 'false');
});
function GetColorways(e) {
    e.attr('data-loading', 'true');
    var html = '<li>';
    var hoverModel = e.attr('data-model');
    var date = new Date();
    var timestamp = date.getFullYear() + '' + date.getDate() + '' + date.getMonth();
    var count = 0;
    $.ajax({
        url: '/scripts/' + timestamp + '_' + hoverModel + '_pdp.js',
        dataType: 'script',
        method: 'get',
        async: true,
        complete: function (data) {
            $.each(window['styles_' + hoverModel], function (m, mod) {
                if (count % 2 == 0 && count != 0) {
                    html += '</li><li>'
                }
                count++;
                html += '<a href="javascript:srColorwaysClick(\'' + m + '\',\'' + hoverModel + '\');"><img src="//www.champssports.com/images/products/small/' + m + '_s.jpg" width="50" height="50" border="0" /></a>';
            });
            html += '</li>';
            ColorwaysCallback(e, html);
        }
    });
}
function ColorwaysCallback(e, html) {
    e.find('.colorways').attr('id', 'spotlight' + e.index('#endeca_search_results > ul > li:not(.clearRow)')).html('<div class="slide_content"><ul>' + html + '</ul></div><div class="slide_buttons"><div class="sl_previous"><a href=""></a></div><div class="sl_next"><a href=""></a></div></div>');
    cwSearchSpotlight[e.index('#endeca_search_results > ul > li:not(.clearRow)')] = e.find('#spotlight' + e.index('#endeca_search_results > ul > li:not(.clearRow)')).spotlight({ transition: 'slide', rotate: false, endStop: false }, function () {
        if (e.attr('data-loading') == 'true') {
            e.attr('data-loading', 'false');
            if (e.attr('data-hover') == 'false') {
                e.removeClass('hovering');
            }
        }
    });
    if (e.find('#spotlight' + e.index('#endeca_search_results > ul > li:not(.clearRow)')).find('.slide_content ul li').length > 1) {
        e.find('#spotlight' + e.index('#endeca_search_results > ul > li:not(.clearRow)')).find('.sl_previous a').attr('href', 'javascript:cwSearchSpotlight[' + e.index('#endeca_search_results > ul > li:not(.clearRow)') + '].previousSlide();');
        e.find('#spotlight' + e.index('#endeca_search_results > ul > li:not(.clearRow)')).find('.sl_next a').attr('href', 'javascript:cwSearchSpotlight[' + e.index('#endeca_search_results > ul > li:not(.clearRow)') + '].nextSlide();');
    } else {
        e.find('#spotlight' + e.index('#endeca_search_results > ul > li:not(.clearRow)')).find('.slide_buttons').remove();
    }
}
function srColorwaysClick(sku, model) {
    $.quickview({'title':'View Featured Product','sku':sku.toString(), 'model':model.toString(), 'position':1, 'loadingHTML':'<img src="/ns/common/champssports/images/loading.gif" border="0" />'});
}
/* END SEARCH RESULTS COLORWAYS FUNCTIONS */

function createSearchHeaderButtons() {
    var html = '<div class="asrp-buttons">';
    if ($('#asrp-more-info').length > 0) {
        if ($('#asrp-highlights').length <= 0 && !csASRP.startCollapsed) {
            html += '<span class="more-info selected">More Info</span>';
        } else {
            html += '<span class="more-info">More Info</span>';
        }
    }
    if ($('#asrp-highlights').length > 0) {
        if (!csASRP.startCollapsed) {
            html += '<span class="highlights selected">Highlights</span>';
        } else {
            html += '<span class="highlights">Highlights</span>';
        }
    }
    html += '</div>';

    $('.search-heading-social').before(html);
}

/* LOGIN IFRAME SCRIPTS */
function CreateLoginCloseButton() {
    if ($('#login_container .closeBtn').length <= 0) {
        $('#login_container').prepend('<div class="closeBtn"><span>Close</span><a title="Close" href="javascript:window.closeLoginDialog();">&times;</a></div>');
    }
    if ($('#ws_login_container .closeBtn').length <= 0) {
        $('#ws_login_container').prepend('<div class="closeBtn"><span>Close</span><a title="Close" href="javascript:window.close_wl_dialog();">&times;</a></div>');
    }
}
$('#login_container_shadow').live('click touchend', function () {
    closeLoginDialog();
});
