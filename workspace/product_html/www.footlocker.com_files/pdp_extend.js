$.extend(productVariables, {
	nonSaleLabel : '',
	regularPriceLabel : '',
	saleLabel : 'NOW : ',
	percentLabel : 'Discount: ', // Default label in front of Percent Off
	savingsLabel : 'Save: ', // Default label in front of Savings
	displayPercent : false, // Display Percent Off
	displaySavings : false, // Display Savings
	outOfStockMessage : '', // Display after out of stock size
	showOutOfStock : true, // Display out of stock sizes
	inlineZoomDim : ['1000','1000'],
	inlineZoomSettings : {'type':'drag','initAction':'click'},
	readmoreSettings : {'readmoretext':'read more +','readlesstext':'read less -'},
	pdpStyle : 'tabbed',
	fitGuarentee : '//www.footlocker.com/fit/',
	pdpVideoSettings : {'ajaxVideoURL':'/shared/pdp/product_videos?site=striperpedia&'},
	recentlyViewedOptions : {'maxProducts':5,'imageSize': ['cart','c'], 'noProducts' : ''},
	otherStylesOptions : {'maxProducts':14,'imageSize': ['cart','c']},
	adjust : $('#fixed-head-wrapper').height(),
	pdpTop: parseInt($('.pdp_wrapper').offset().top) - 45,
	isEligibleSameDayDelivery: false,
	sddMessage: '<span id="sameDayDeliveryMessage" class="message">{SDDMESSAGE} <a class="info_icon"></a></span>'
});
$.extend(productFunctions, {
	reviewsLoaded : function() {
		$('.pdp_reviews #BVRRDisplayContentID .BVRROverallRatingContainer .BVRRLabel').html('rating: ');	
		$('.pdp_reviews #BVRRQuickTakeSummaryID .BVRROverallRatingContainer .BVRRLabel').html('overall rating: ');
		$('.pdp_reviews #BVRRQuickTakeSectionID .BVRROverallRatingContainer').after('<div id="BVRRTotalReviewsCount">(' + $('#BVRRRatingSummaryLinkReadID .BVRRNumber').eq(0).text() + ')</div>');
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
				var $header = $(this).contents().find('.size_header');
				$header.children('.hdr_right').prepend('<h2 class="heading">Fit Guarantee<span class="highlight"></span></h2><div class="fit_copy"><span class="highlight_text">Your satisfaction is guaranteed</span> We promise the item(s) you order will fit right or return them for free.</div>');
				$header.children('.hdr_left').prepend('<h2 class="heading">Sizing Chart<span class="highlight"></span></h2>');
				$header.children('.hdr_right').children('a').attr('title', 'View Our Fit Guarantee Policy');
				$header.children('.hdr_right').children('a').html('Learn More');
				$header.children('.hdr_left').before($header.children('.hdr_right'));
				$(this).height($(this).contents().height());
			}));
		}
		productFunctions.getFitInfo();
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
	        $('[data-info=product_messaging]').append('<a href="/XYPromo/model:' + model_nbr + '/sku:' + sku_nbr + '/?xyMessage=back" class="message" data-xfory="' + productVariables.styleData[sku_nbr][productFunctions.getStyleValue('XforY')].split('.')[0] + '">&nbsp;</a>');
	    }
	    if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')] !== "truesize.gif" && productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')] !== '') {
	        $('[data-info=product_sizes]').append('<div class="fitIcon" data-fiticon="' + productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')].split('.')[0] + '"></div>');
	    }
	    if ($('#pdp_selectedSize').val() != '') {
	        var currentSelectedSize = $('div[data-info=product_sizes] #sizes select option[data-modelsize=' + $.trim($('#pdp_selectedSize').val()).replace(/[^0-9a-z-]/gi, '_') + ']');
	        if (typeof currentSelectedSize.attr('data-backordered') != 'undefined') {
	            $('[data-info=product_messaging]').append(productVariables.backorderMessage.replace('{DATE}', currentSelectedSize.attr('data-backordered')));
	        }
	    }
	    if (productVariables.isEligibleSameDayDelivery == true) {
	        if ($('#sameDayDeliveryMessage').length === 0) {
	            $('[data-info=product_messaging]').append('<span id="sameDayDeliveryMessage" class="message">' + SameDayDeliveryMessage + ' <a class="info_icon"></a></span>');
	        }
	        Tipped.create("#sameDayDeliveryMessage .info_icon", SameDayDeliveryMessageTipped, { skin: 'tiny', maxWidth: 350, closeButton: isTouchDevice(), title: true });
	    }
	},
	checkSameDayDelivery: function (sku, size) {
	    //call the service to check if the product is eligible for Same Day Delivery based on user location and sku/size
	    var sSku = sku;
	    var nSize = size;
	    var aMatchingSku = [];

	    //check to see if Same Day Delivery availability for this sku/size has already been checked
	    if (aSameDayDeliveryItems.length > 0) {
	        aMatchingSku = $.grep(aSameDayDeliveryItems, function (elem, index) {
	            return elem.sku == sSku && elem.size == nSize;
	        });
	    }

	    // if same day delivery availability has been checked for this sku/size, use the saved data, otherwise, make an Ajax call
	    if (aMatchingSku.length > 0) {
	        productVariables.isEligibleSameDayDelivery = aMatchingSku[0].sdd;
	        productFunctions.updateMessaging();
	        //productFunctions.displaySameDayDeliveryMsg(aMatchingSku[0].sdd);
	    }
	    else {
	        $.ajax({
	            url: SameDayDeliveryPath,
	            dataType: 'json',
	            data: {
	                action: 'ProductZipCode',
	                sku: sSku,
	                size: nSize
	            },
	            type: 'GET',
	            success: function (res, textStatus) {
	                var response = res;
	                if (response.success && response.data.IsAvailable) {
	                    aSameDayDeliveryItems.push({ sku: sSku, size: nSize, sdd: true });
	                    //isEligibleSameDayDelivery = true;
	                    productVariables.isEligibleSameDayDelivery = true;
	                    //if ($('#sameDayDeliveryMessage').length === 0) {
	                    //    $('[data-info=product_messaging]').append(productVariables.sddMessage.replace('{SDDMESSAGE}', SameDayDeliveryMessage));
	                    // };
	                    //productFunctions.displaySameDayDeliveryMsg(true);
	                    productFunctions.updateMessaging();
	                    //Tipped.create("#sameDayDeliveryMessage .info_icon", SameDayDeliveryMessageTipped, { skin: 'tiny', maxWidth: 350, closeButton: isTouchDevice() });


	                }
	                else {
	                    aSameDayDeliveryItems.push({ sku: sSku, size: nSize, sdd: false });
	                    //isEligibleSameDayDelivery = false;
	                    productVariables.isEligibleSameDayDelivery
	                    //productFunctions.displaySameDayDeliveryMsg(false);
	                    productFunctions.updateMessaging();
	                };
	            },
	            error: function (XMLHttpRequest, textStatus, errorThrown) {
	                console.log(XMLHttpRequest);
	            }
	        });
	    }
	}
});
/* Handle Quickview rating click */
$(document).ready(function(){
  /* Get query string parameters */
  var searchParts = window.location.search.substring(1).split('&');
  var queryVars = [];
  for(var i=0; i<searchParts.length; i++){
	var query = searchParts[i].split('=');
	queryVars[query[0]] = query[1];
  }
  /* On 'reviews', perform operation */
  if(queryVars['reviews'] == 'true'){
	  var tabTop = 0;
	  /* Open the reviews tab and find it's offset */
	  if($('#pdp_tab_reviews').length > 0){
		  tabTop = $('#pdp_tab_reviews').offset().top;
		  $('#pdp_tab_reviews a').trigger('click');
	  }else if($('.pdp_header .tab').length > 0){
		  var tabs = $('.pdp_header .tab a');
		  tabs.each(function(){
			if($(this).attr('data-tab').toLowerCase() == 'reviews'){
				$(this).trigger('click');
				tabTop = $(this).offset().top;
			}
		  });
	  }
	  /* Goto that offset */
	  $('html, body').animate({scrollTop:tabTop}, 500);
  }
  
	$('#pdp_hasXYPromo').val(productVariables.styleData[$('#pdp_selectedSKU').val()][productVariables.styleReference.indexOf('hasXforY')]);
	$('#product_styles a').on('click touchstart', function () {
		$('#pdp_hasXYPromo').val(productVariables.styleData[$('#pdp_selectedSKU').val()][productVariables.styleReference.indexOf('hasXforY')]);
	});
	$('#product_styles a').hover(function () {
		$('#pdp_hasXYPromo').val(productVariables.styleData[$('#pdp_selectedSKU').val()][productVariables.styleReference.indexOf('hasXforY')]);
	});
  
    /* Setup Same Day Delivery */
	if (typeof SameDayDeliveryEnabled != 'undefined' && SameDayDeliveryEnabled) {
	    $('#pdp_selectedSize').change(function () {
	        productFunctions.checkSameDayDelivery($('#pdp_selectedSKU').val(), $('#pdp_selectedSize').val());
	    });

	    $('#pdp_selectedSKU').change(function () {
	        if ($('#pdp_selectedSize').val().length > 0) {
	            productFunctions.checkSameDayDelivery($('#pdp_selectedSKU').val(), $('#pdp_selectedSize').val());
	        }
	    });
	}
});