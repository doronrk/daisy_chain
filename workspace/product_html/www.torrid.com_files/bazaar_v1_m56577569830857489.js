//product namespace, contains methods geared toward the category pages
(function( bazaar, $, undefined ) {	
	//inserts bazaar voice rating for category pages
	bazaar.insertCategoryBV = function(prdArray){
		$BV.ui( 'rr', 'inline_ratings', {
		  productIds : prdArray,
		  containerPrefix : 'BVRRInlineRating'
		});
	};
	
	//configure single product
	bazaar.configureProduct = function(prdCode, userToken){
		var data = { productId : prdCode };
		if(typeof(userToken) != 'undefined' && userToken != null)
			data['userToken'] = userToken;
	
		$BV.configure('global', data);
	};
	
	//show ratings and reviews
	bazaar.showRatingsReviews = function(){
		$BV.ui( 'rr', 'show_reviews', {
			doShowContent : function () {
			// If the container is hidden (such as behind a tab), put code here to make it visible (open the tab).
			}
		});
	};
}( window.bazaar = window.bazaar || {}, jQuery ));