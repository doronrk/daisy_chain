/* globals jQuery, Modernizr, enquire, smg */

/*!
 * @file digital-river.js
 * @class SMG Object Namespacing
 * @author Jason Han
 * @comment Only Page specific functions will be added here
 * @copyright (c) Samsung SDS America Inc.
 */
smg.global.digitalRiver = (function(window, document, $, undefined) {
	"use strict";

	var defaults = {
		container : ".product-module[data-eppMdlCd]",
		holidayPage: false,
		defaultCallback : true, 
		successCallback : function(priceList) {
			
		},done :function(){	
		}
	}, cookie_options = {
		path    : '/',
		domain  : 'samsung.com'
	}, dr_store_domain = '//shop.us.samsung.com';

	function loadPrice(opts) {
		var options = $.extend({}, defaults, opts);
		var planId = $.cookie("tppid");

		if (typeof (planId) != 'undefined' && planId != null && planId != "") {
			var modelCodes = new Array();
			$(options.container).each(function() {
				modelCodes[modelCodes.length] = $(this).attr("data-eppMdlCd");
			});

			var requestData = {
				referralUrl : document.referrer,
				planId : planId,
				modelCodes : modelCodes.toString(),
				holidayPage : options.holidayPage
			};
			$.ajax({
				url : '/us/shop/price.us',
				data : requestData,
				type : 'POST',
				dataType : "json",
				error : function() {
					console.log("error loading /us/shop/price.us.");
					if(options.done && typeof options.done === "function"){
						options.done()
					}
				},
				success : function(priceList) {
					if(options.defaultCallback) {
						for ( var i = 0; i < priceList.length; i++) {
							$(".product-module[data-eppMdlCd = '"
											+ priceList[i].prdMdlCd
											+ "'] .price-module").html(
									_.template($("#priceTemplate").html(), {
										price : priceList[i]
									}));
						}
					}
					
					if(options.successCallback && typeof options.successCallback === "function"){
						options.successCallback(priceList);
					}
					if(options.done && typeof options.done === "function"){
						options.done()
					}
					
				}
			});
		}else if(options.done && typeof options.done === "function"){
			options.done()
		}
	}
	
	function isEppUser() {
		var planId = $.cookie("tppid");
		if(!!planId) {
			return true;
		} else {
			return false;
		}
	}
	
	function loadCart() {
		if(isEppUser()) {
			var accessToken = getCookie("dr_a_token"); 
			if(!!accessToken) {
				loadEPPCartSummary();
			} else {
				getEppInfo();
			}
			
			var logoImg = getCookie("tlgimg");
			if(logoImg != null && logoImg.length > 0){
				logoImg = logoImg.replace(/"/g, "");  
				var logoHtml =  '<li class="epp-card"><img src="' + logoImg + '"/></li>';
				$("header .header-container .main").addClass("epp").append(logoHtml);
				$("#nav .extra-menu").addClass("epp").append(logoHtml);
			} else {
				$("#nav .extra-menu").hide();
			}

			var mktName = getCookie("tmktname");
			if(mktName != null && mktName.length > 0){
				mktName = mktName.replace(/"/g, ""); 
				$("header .header-top .header-container").prepend("<div class='epp-name'>Hi " + mktName + "</div>");
				$("#nav .extra-menu").append("<li>Hi " + mktName + "</li>");
			} else {
				$("#nav .extra-menu").hide();
			}
		} else {
			loadDRCartSummary();
		}
	}
	
	function getEppInfo() {
		var planId = $.cookie("tppid");
		var referralUrl = $.cookie("trefurl"); 
		var marketId  = $.cookie("tmktid");
		$.ajax({
			url: "/us/shop/eppInfo.us",
			dataType : "json",
			data : {
				planId : planId,
				referralUrl : referralUrl,
				marketId : marketId
			},
			success: function(data){
				setToken(data[0]);
				loadEPPCartSummary();
			}
		});
	}
	
	function setToken(tokenTO){
		$.cookie("dr_a_token", tokenTO.accessToken, cookie_options);
		$.cookie("dr_r_token", tokenTO.refreshToken,{ expires: 1, path: '/', domain: 'samsung.com'});
	}
	
	function processEppData(data) {
		if(data != '' && data.length > 0){
			var logo_img = data[0].logoImgPath;
			var plan_id = data[0].planId;
			var market_id = data[0].marketId;
			var market_name = data[0].marketName;
			var rule_name = data[0].ruleName;
			//var logo_html =  '<img src="' + logo_img + '"/>';
			
			 //$(".epp-logo").addClass("noMargin");
			 //$(".epp-logo").html(logo_html);
			if(market_name.length > 0){
				var name = 'Hi, ' +market_name;
				//$(".epp-name").html(name);
				$.cookie("tmktname", market_name, cookie_options);
			}
			$.cookie("tppid", plan_id, cookie_options);
			$.cookie("tmktid", market_id, cookie_options);
			$.cookie("tlgimg", logo_img, cookie_options);
			$.cookie("taccessrtype", rule_name, cookie_options);
			loadEPPCartSummary();
		}else{
			loadDRCartSummary();
		}
	}
	
	function loadEPPCartSummary() {
		var access_token = $.cookie("dr_a_token"); 
		$.ajax({
			type: "GET",
			url:"https://api.digitalriver.com/v1/shoppers/me/carts/active?expand=lineitems.lineitem.product.externalreferenceid%2Clineitems.lineitem.product.id&callback=smg.global.digitalRiver.eppCartCallback&format=json&token="+access_token,
			dataType: "jsonp",
			jsonpCallback: "smg.global.digitalRiver.eppCartCallback",
			jsonp: "callback"
		});
	}
	
	function loadDRCartSummary() {
		var $CART_CONTAINER = $(".cart-container");
		$.getJSON( dr_store_domain + '/store/samsung/DisplayDRCartSummary/Version.2/output.json?jsonp=?', {
			   format: "json"
		}).done(function( cartSummaryData ) {
			$(".cart-basket").text(cartSummaryData.lineItems);
			if (cartSummaryData && cartSummaryData.lineItems > 0) {
				var timestamp = new Date().getTime();
				$.ajax({
		        url: dr_store_domain +'/integration/job/request/ShoppingCartService/defaults/site/?%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3CGet%20siteID%3D%22samsung%22%20locale%3D%22en_US%22%3E%3CbaseFields%3E%3CdisplayName/%3E%3C/baseFields%3E%3Cattributes%3E%3Cthumbnail/%3E%3C/attributes%3E%3C/Get%3E%3C%21--jsonp=smg.global.digitalRiver.cartSummaryCallback--%3E%3C%21--' +timestamp+ '--%3E',
		        	dataType: 'jsonp',
			        jsonp: false,
			        cache: true
			    });
			} else {
				$CART_CONTAINER.prepend('<div class="purchase-container">Your product shopping cart is empty. </div>');
			}
		});
	}
	
	function drCartSummaryCallback(shoppingCartData) {
    	if (shoppingCartData && shoppingCartData["ns1:GetShoppingCartResponse"].errorCode == 0) {
    		var shoppingCartLineItems = shoppingCartData["ns1:GetShoppingCartResponse"].shoppingCartLineItems;
            if ( !$.isArray(shoppingCartLineItems) ) {
                shoppingCartLineItems = [shoppingCartLineItems]; //if 1 item in cart
            }
            var itemsCount = shoppingCartLineItems.length;
            var $CART_CONTAINER = $(".cart-container");
            var outputHtml = '';
            var productString = '';
            if (itemsCount > 0) {
                //var cartFullText = '';
                var showItems = itemsCount;
                if (itemsCount > 4) {
                    showItems = 4;
                    //cartFullText = '<span>(' + cartItems + ') items</span>';
                }
                for (var i = 0; i < showItems; i++) {
                    var scItem = shoppingCartLineItems[i];
                    var productID = scItem.requisitionLineItemKey.productKey.productID;
                    var externalReferenceID = scItem.requisitionLineItemKey.productKey.externalReferenceID;
                    productString = productString + externalReferenceID + ' ';
                    var qty = scItem.quantity;
                    var displayName = scItem.lineItemProductInfo.baseFields.displayName;
                    var price = scItem.lineItemProductInfo.pricing.formattedTotalPriceWithDiscount;
                    var imageSrc = '';
                    if (scItem.lineItemProductInfo.attributes.name == 'thumbnail') {
                        imageSrc = scItem.lineItemProductInfo.attributes.value;
                    }
                    imageSrc = imageSrc.indexOf('http') == 0 ? imageSrc : dr_store_domain + '/DRHM/Storefront/Company/samsungamericas/images/product/thumbnail/' + imageSrc;
                    var drPopupUrl = dr_store_domain +'/DRHM/store?Action=DisplayPage&SiteID=samsung&Locale=en_US&id=ProductInterstitialDetailsPage&parentPageName=Cart&productID=' + productID;
                   // var ss_link = 'ss_link_click_track_2(\'\',\'event43\',\''+ externalReferenceID +'\',\'\', \'cart_flyout\', \'o\', \'prod_popup\')';
                    var row = '<div class="mini-cart-item">'
                        + '<div class="product-image"><img width="70" height="70" src="' + imageSrc + '"/></div>'
                        + '<div class="product-details"><a class="product-name" href="'+drPopupUrl+'" onclick="openPopup(this.href);return false;" >' + displayName +'</a>'
                        + '<span class="module-number">' + externalReferenceID +'</span></div>'
                        + '<div class="product-purchase-details"><div class="quantity">QTY: ' + qty + '</div>'
                        + '<div class="price">' + price + '</div></div>'
                        + '</div>';
                    outputHtml += row;
                }
                var subTotal = shoppingCartData["ns1:GetShoppingCartResponse"].reqLevelPricing.formattedSubTotalPriceWithDiscount;
                outputHtml += '<div class="purchase-container">'
                    + '<span class="cart-total">Subtotal: ' + subTotal + '</span>'
                    + '<a class="view-cart-link" href="'+ dr_store_domain +'/store/samsung/cart" >View Product Cart</a>'
                    + '<a class="button sm sm-font" href="'+ dr_store_domain +'/DRHM/store?Action=DisplayThreePgCheckoutAddressPaymentInfoPage&SiteID=samsung&Locale=en_US" ><span>Checkout</span></a>'
                    + '</div>';
            }
            
            $CART_CONTAINER.prepend(outputHtml);
    	}
	}
	
	function eppCartCallback(data) {
		if(typeof(data.errors) != 'undefined') {
			console.log("refreshtoken");
			var code = data.errors.error[0].code;
			if(code == 'invalid_token'){
				$.ajax({
					type: "GET",
					url:"/us/shop/refreshtoken.us",
					dataType: "json",
					success: function (tdata){
						if(tdata[0].response == 200){
							setToken(tdata[0]);
							loadEPPCartSummary();
						}
					}
				});
			}
		}else{
			showCart(data);
		}
	}
	
	function showCart(data) {
		$(".cart-basket").text(data.cart.totalItemsInCart);
		if (data.cart.totalItemsInCart > 0) {
			var items = data.cart.lineItems.lineItem;
			var itemsCount = items.length;
	        var $CART_CONTAINER = $(".cart-container");
	        var outputHtml = '';
	        var productString = '';
	        var showItems = itemsCount;
	        if (itemsCount > 4) {
	            showItems = 4;
	        }
	        for (var i = 0; i < showItems; i++) {
	            var scItem = items[i];
	            var productID = scItem.product.id;
	            var externalReferenceID = scItem.product.externalReferenceId;
	            productString = productString + externalReferenceID + ' ';
	            var qty = scItem.quantity;
	            var displayName = scItem.product.displayName;
	            var price = scItem.pricing.formattedSalePriceWithQuantity;
	            var imageSrc =scItem.product.thumbnailImage;
	            var drPopupUrl = dr_store_domain +'/DRHM/store?Action=DisplayPage&SiteID=samsung&Locale=en_US&id=ProductInterstitialDetailsPage&parentPageName=Cart&productID=' + productID;
	            var row = '<div class="mini-cart-item">'
	                + '<div class="product-image"><img width="70" height="70" src="' + imageSrc + '"/></div>'
	                + '<div class="product-details"><a class="product-name" onclick="openPopup(this.href);return false;" href="'+ drPopupUrl +'" >' + displayName +'</a>'
	                + '<span class="module-number">' + externalReferenceID +'</span></div>'
	                + '<div class="product-purchase-details"><div class="quantity">QTY: ' + qty + '</div>'
	                + '<div class="price">' + price + '</div></div>'
	                + '</div>';
	            outputHtml += row;
	        }
	        var subTotal = data.cart.pricing.formattedSubtotal;
	        outputHtml += '<div class="purchase-container">'
	            + '<span class="cart-total">Subtotal: ' + subTotal + '</span>'
	            + '<a class="view-cart-link" href="/us/shop/checkout/" >View Product Cart</a>'
	            + '<a class="button sm sm-font" href="/us/shop/checkout/" ><span>Checkout</span></a>'
	            + '</div>';
	        
	        $CART_CONTAINER.prepend(outputHtml);
		} else {
			$(".cart-container").prepend('<div class="purchase-container">Your product shopping cart is empty. </div>');
		}
	}

	return {
		isEppUser : isEppUser,
		loadPrice : loadPrice,
		loadCart : loadCart,
		cartSummaryCallback: drCartSummaryCallback,
		eppCartCallback: eppCartCallback
	};

}(window, document, jQuery));
