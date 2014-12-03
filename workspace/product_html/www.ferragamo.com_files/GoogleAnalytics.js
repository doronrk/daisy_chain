/**
 * Google Analytics related functions JS lib.
 * 
 * @author Romolo Archi
 * @since  May 30 2013
 */

// Var usata su tutte le pagine del sito
GoogleAnalyticsJS = {

	newsletterHeaderLinkClick : function(){
		var currentURL = document.location.href;
		_gaq.push(['_trackEvent', 'Newsletter', 'Access', currentURL]);
	}, 
	
	newsletterRegistration : function(){
		_gaq.push(['_trackEvent', 'Newsletter', 'Sing up OK']);
	},

	loginHeaderLinkClick : function(){
		var currentURL = document.location.href;
		_gaq.push(['_trackEvent', 'Registration/Login', 'Access', currentURL]);
	},
	
	printClick : function(productSKU){
		if (productSKU){
			_gaq.push(['_trackEvent', 'Print', productSKU]);
		}
	},
	
	addToBag : function(productSKU){
		if (productSKU){
			_gaq.push(['_trackEvent', 'Add To', 'Shopping Bag', productSKU]);
			_gaq.push(['_trackPageview', '/cart/addtocart.html' ]);
		}
	},
	
	addToWishlist : function(productSKU){
		if (productSKU){
			_gaq.push(['_trackEvent', 'Add To', 'Wishlist', productSKU]);
		}
	},
	
	goToCart : function(storeId){
		if(storeId == null || storeId == undefined)
			_gaq.push(['_trackPageview', '/cart/proceed.html' ]);
		else
			_gaq.push(['_trackPageview', '/cart/proceed_' + storeId + '.html' ]);
	},
	
	checkoutRegisteredUserLogin : function(){
		_gaq.push(['_trackPageview', '/cart/RegisteredUser.html' ]);
	},
	
	checkoutGuestUserLogin : function(storeId){
		if(storeId == null || storeId == undefined)
			_gaq.push(['_trackPageview', '/cart/GuestUser.html' ]);
		else
			_gaq.push(['_trackPageview', '/cart/GuestUser_' + storeId + '.html' ]);
	},
	
	checkoutStep1ProceedClick : function(){
		_gaq.push(['_trackPageview', '/cart/payment.html' ]);
	},
	
	checkoutStep2ProceedClick : function(){
		_gaq.push(['_trackPageview', '/cart/order_and_review.html' ]);
	},
	
	checkoutStep3ProceedClick : function(){
		_gaq.push(['_trackPageview', '/cart/confirmation.html' ]);
	},
	
	storeLocatorPrint : function(cityAddress){
		if (cityAddress){
			_gaq.push(['_trackEvent', 'Store Locator', cityAddress, 'Print']);
		}
	},
	
	storeLocatorMap : function(cityAddress){
		if (cityAddress){
			_gaq.push(['_trackEvent', 'Store Locator', cityAddress, 'Map']);
		}
	},
	
	storeLocatorStoreAccess : function(cityAddress){
		if (cityAddress){
			_gaq.push(['_trackEvent', 'Store Locator', cityAddress, '']);
		}		
	},
	
	trackOrder: function(gaOrderId, gaStoreName, gaTotal, gaTax, gaShipping, gaCity, gaState, gaCountry){
		_gaq.push(['_addTrans', gaOrderId, gaStoreName, gaTotal, gaTax, gaShipping, gaCity, gaState, gaCountry ]);
	},
	
	trackOrderItem: function(gaOrderId, gaSKU, gaProductName, gaStoreName, gaProductPrice, gaProductQty){
		_gaq.push(['_addItem', gaOrderId, gaSKU, gaProductName,  gaStoreName, gaProductPrice, gaProductQty ]);
	},
	
	trackTrans: function(){
		_gaq.push(['_trackTrans']);
	},
	
	home_1_1_Click: function(){
		_gaq.push(['_trackEvent', 'From Ferragamo to WalkingStories', document.location.href, document.referrer]);
	},
	home_holliwood_Click: function(){
		_gaq.push(['_trackEvent', 'From Ferragamo to Hollywood', document.location.href, document.referrer]);
	},
		
	home_runway_01_2014_video_Click: function(){
		_gaq.push(['_trackEvent', 'Fashion Show - 01_01_2014', 'Home Page - Video', document.location.href]);
	},
		
	home_runway_01_2014_inst_Click: function(){
		_gaq.push(['_trackEvent', 'Fashion Show - 01_01_2014', 'Home Page - Instagram', document.location.href]);
	},
	
	trunkshowHeaderLinkClick : function(){
	    var currentURL = document.location.href;
	    _gaq.push(['_trackEvent', 'Trunkshow', 'Access', currentURL]);
	}
	
}