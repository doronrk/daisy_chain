function trackingEventNavigation(event, menuEntry, type){
	var config = {
					"MISSES"		: "Misses",
					"PLUS SIZE"		: "Plus Size",
					"PLUS-SIZE"		: "Plus Size",
					"PETITES"		: "Petites",
					"SHOES"			: "Shoes",
					"JEWELRY"		: "Jewelry",
					"ACCESSORIES"	: "Accessories",
					"SALE"			: "Sale"
				};
	
	var key = menuEntry.toUpperCase();
	
	if( config[key] != undefined ){
		if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
		_gaq.push(['_trackEvent','Navigation',config[key], type]);
	}
}

function trackingEventSubNavigation(event, menuEntry, category, subcategory){
	var action = category;
	
	if( subcategory != undefined ){
		action += ("|" + subcategory);
	}

	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Refine Selections',action,menuEntry]);
}

function trackingEventHomeMostLiked(event, label){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Homepage',"Carousel",label]);
}

function trackingEventMiniCartOverlay(fullPrice, salePrice, productName){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Minicart',productName,'Full Price',Math.round(fullPrice)]);
	_gaq.push(['_trackEvent','Minicart',productName,'Sale Price',Math.round(salePrice)]);
}

function trackingEventMiniCartOverlayCheckout(){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Minicart','Checkout','Checkout Start']);
}

function trackingEventPDPLoad(category, subcategory, productName, fullPrice, salePrice){
	var action = category + "|" + subcategory;
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Product View',action,productName]);
	_gaq.push(['_trackEvent','Product View',productName,"Full Price",Math.round(fullPrice)]);
	_gaq.push(['_trackEvent','Product View',productName,"Sale Price",Math.round(salePrice)]);
}

function trackingEventPDPSelectColor(productName,colorId,isAvailable){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	if(isAvailable){
		_gaq.push(['_trackEvent','Color Selection',productName,colorId]);
	}
	else{
		_gaq.push(['_trackEvent','Color Selection',productName,"Out of Stock Color"]);
	}
}

function trackingEventPDPSelectSize(productName,size,available){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	if(available){
		_gaq.push(['_trackEvent','Size Selection',productName,size]);
	}
	else{
		_gaq.push(['_trackEvent','Size Selection',productName,"Out of Stock Size"]);
	}
}

function trackingEventPDPAddCart(productName){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Add to Cart',productName]);
}

function trackingEventPDPAlternateView(productName,imageName){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Alternate View',productName,imageName]);
}

function trackingEventPDPUpsell(productName){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Complete the Look',productName]);
}

function trackingEventPDPReadReview(productName){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Reviews',productName]);
}

function trackingEventPDPWriteFirstReview(productName){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','On Page Function','Write First Review']);
}

function trackingEventPDPWriteReview(productName){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','On Page Function','Write Review']);
}

function trackingEventPDPAddFavorites(event,productName){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','On Page Function','Add to Favorites']);
}

function trackingEventCheckoutGuest(){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Checkout','Checkout Method','Guest Checkout']);
}

function trackingEventShippingContinue(){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Checkout','Shipping Info','Cont to Payment']);	
}

function trackingEventPaymentPromo(code, quantity){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Checkout','Promo Code',code,Math.round(quantity)]);
}

function trackingEventPaymentGiftCard(cardNumber){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Checkout','Gift Certificate',cardNumber]);
}

function trackingEventPaymentReview(){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Checkout','Billing Info','Cont to Review']);	
}

function trackingEventPlaceOrder(){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Checkout','Place Order']);	
}

function trackingEventReviewLoad(productName, fullPrice, salePrice){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','In Cart', productName, 'Full Price', Math.round(fullPrice)]);
	_gaq.push(['_trackEvent','In Cart', productName, 'Sale Price', Math.round(salePrice)]);
}

function trackingEventReviewGift(event){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','On Page Function', 'Add Gift Box']);
}

function trackingEventReviewEditDetails(event){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Shopping Cart', 'Edit Details']);
}

function trackingEventCartEditDetails(event){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackPageview','/Cart/ShoppingOverlay']);
}

function trackingEventCartSizeSelect(event){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Shopping Overlay','Size Selection']);
}

function trackingEventCartColorSelect(event){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Shopping Overlay','Color Selection']);
}

function trackingEventCartUpdate(event){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackEvent','Shopping Overlay','Add to Cart','Cont to Review']);		
}

function trackingEventErrorPage(){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackPageview',
	          '/404error/?url=' + document.location.pathname + document.location.search + '&ref=' + document.referrer]);
}

function trackingEventCheckoutLogin(event){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	_gaq.push(['_trackPageview','Checkout','Checkout Method','Return Sign In']);
}

function trackingEventSetLoginVar(event, value){
	if (typeof(_gaq) == 'undefined' || _gaq == null) { return; }
	
	_gaq.push(['_setCustomVar',
	           1,                   // This custom var is set to slot #1.  Required parameter.
	           'User Type',           // The top-level name for your online content categories.  Required parameter.
	           value,  // Sets the value of "Section" to "Life & Style" for this particular aricle.  Required parameter.
	           2                    // Sets the scope to page-level.  Optional parameter.
	        ]);
	
}

















