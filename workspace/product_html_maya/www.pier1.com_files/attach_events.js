//$(".refinement-link").click(function() {

//	Omniture.Events.LeftNavRefinementAdded.occurred($(this));

//});



$(".refinement ul li a, .refinement-true-false a").click(function() {

	Omniture.Events.LeftNavRefinementAdded.occurred($(this));

});

$('.wishListTable .add-to-cart').click(function () {
	var pid = $(this).data('pid');
	
	Omniture.Events.AddToCartFromWishlist.occurred(pid);
});


$(".refinement h3 span a").click(function() { 

	Omniture.Events.otherRefinementsAdded.occurred($(this));

});

$(document).on('click', ".breadcrumb-refinement-value a.breadcrumb-relax", function() {

	Omniture.Events.BreadcrumbRefinementRemoved.occurred($(this));

});


$(document).on('click', '.personalMessageWrapper a.addmessage', function () {
	Omniture.OnClicks.CheckoutAddPersonalMsgClicked.occurred();
});

//QuickView - Add to Cart & Add All To Cart button click events
$(document).on("click", "#QuickViewDialog .add-to-cart", function() {
	var form = $(this).closest("form"),
	quantity = form.find("input[name='Quantity']").val(),
	productID = form.find("input[name='pid']").val();
		
	if(quantity == undefined)
		quantity = $("input[name='setQuantity']").val();
	
	Omniture.Events.PQVAddToCartClicked.occurred(productID,quantity);
	//Omniture.Events.PQVAddToCartClicked.occurred();
});


$(".swatch-container a").click(function() {
	var $p = $('.swatch-qtip-content .product-name');
	var pids = '';
	
	$p.each(function(index) {
		pids += ';' + $(this).attr('data-pid');
		if (index < $p.length - 1) { pids += ','; }
	});
	
	Omniture.Events.SwatchPopupClicked.occurred(pids);
});


$("button[id*=add-to-cart-swatch]").click( function() {
	Omniture.Events.SwatchAddToBasketClicked.occurred();
});


$("#product-content-container a.wl-action").first().click(function() {

	Omniture.Events.AddToWishlistClicked.occurred();

});



$(document).on('click', '.quickview a.wl-action', function() {

	Omniture.Events.PQVAddToWishlistClicked.occurred();

});



$(".pt_product-details .product-primary-image a").click(function() {

	Omniture.Events.PDPCarouselImageClicked.occurred();

});



$("#product-nav-container").on('click', ".pt_product-details .product-previous a, .pt_product-details .product-next a", function() {

	Omniture.Events.PDPProductCarouselPageClicked.occurred($(this));

});


// Wishlist Add to Cart (Desktop)
$("#wrapper.pt_wish-list .add-to-cart").click(function() {
	
	var form = $(this).closest("form");
	var quantity = form.find("input[name='Quantity']").val();
	var productID = form.parent().parent().siblings('.item-details').find('.sku .value').html();
	Omniture.Events.WishlistAddToCartClicked.occurred(productID,quantity);

	//Omniture.Events.WishlistAddToCartClicked.occurred();

});



$(document).on('click', '.preview .slideshow a[href="#product-theater"]', function() {

	Omniture.Events.HomePageCarouselOpen.occurred();

});



/* commented code for social interaction

$(".pt_product-details .pdp-social .addthis_button_facebook_like").click(function(event) {

	Omniture.Events.PDPFacebookLikeClicked.occurred();

});



$(".pt_product-details .pdp-social a.addthis_button_tweet").click(function() {

	Omniture.Events.PDPTwitterClicked.occurred();

});



$(".pdp-main .pdp-social .addthis_button_pinterest_pinit a").click(function() {

	Omniture.Events.PDPPinterestClicked.occurred();

});



$(".pdp-main .pdp-social .addthis_button_google_plusone").click(function() {

	Omniture.Events.PDPGooglePlusClicked.occurred();

});

social interaction code comment ends*/



//start new 3.2 tags here:

//checkout:

/*

$(document).on('click', '.question-shipping', function() {

	Omniture.OnClicks.BasketSummaryQuestionClicked.occurred($(this));

});

*/

$("#checkoutBtn").click(function() {

	Omniture.OnClicks.BasketCheckoutClicked.occurred($(this));

});

/*

$("#delivery-options-home").click(function() {

	Omniture.OnClicks.BasketShipRadioClicked.occurred($("#delivery-options-home:checked").val());

});



$("#delivery-options-store").click(function() {

	Omniture.OnClicks.BasketShipRadioClicked.occurred($("#delivery-options-store:checked").val());

});

*/

$(document).on('click', ".remove-actions .basket-remove a.button-text", function() {

	Omniture.OnClicks.BasketRemoveProductClicked.occurred($(this));

});

/*

$("#ChangeZip").click(function() {

	Omniture.OnClicks.BasketSummaryChangeZipClicked.occurred($(this));

});



$("#password-reset").click(function() {

	Omniture.OnClicks.CheckoutLoginForgotPasswordClicked.occurred($(this));

});

*/

$(".check-out-button[name='dwfrm_login_login']").click(function() {

	Omniture.OnClicks.CheckoutLoginCheckoutClicked.occurred($(this));

});



$(".check-out-button[name='dwfrm_login_unregistered']").click(function() {

	Omniture.OnClicks.CheckoutGuestCheckoutClicked.occurred($(this));

});

/*

$(document).on('click', '.ship-to-multiple-button', function() {

	Omniture.OnClicks.CheckoutGuestShipToMultipleClicked.occurred($(this));

});

*/

$("#dwfrm_singleshipping_shippingAddress_addToAddressBook").click(function() {

	Omniture.OnClicks.CheckoutGuestSaveShippingAddressClicked.occurred($("#dwfrm_singleshipping_shippingAddress_addToAddressBook:checked").val());

});



$("#dwfrm_billing_billingAddress_addToAddressBook").click(function() {

	Omniture.OnClicks.CheckoutSaveBillingAddressClicked.occurred($("#dwfrm_billing_billingAddress_addToAddressBook:checked").val());

});



$("#dwfrm_singleshipping_shippingAddress_gift_isGift").click(function() {

	Omniture.OnClicks.CheckoutGuestPersonalMessageCheckboxClicked.occurred($("#dwfrm_singleshipping_shippingAddress_gift_isGift:checked").val());

});

/*  

//$(document).on('change', ".shipping-methods-select #shippingmethodselect", function() {

//	Omniture.OnClicks.CheckoutGuestShippingOptionChanged.occurred($("#shippingmethodselect").val());

//});

*/

$(document).on('click', '.minisummary-coupon-holder a.entercodelink', function() {

	Omniture.OnClicks.CheckoutPromoCodeEntryClicked.occurred();

});



$(document).on('click', "#add-coupon", function() {

	if( $("#dwfrm_billingcoupon_couponCode").val() ){

		Omniture.OnClicks.CheckoutPromoCodeEntryBlurred.occurred( $("#dwfrm_billingcoupon_couponCode").attr('value') );

	}

});

/*

//$(document).on('click', '.set-preferred-store', function() { // use change-shipment-store:

$(document).on('click', '.change-shipment-store', function() {

	Omniture.OnClicks.BasketChangeStoreZipClicked.occurred($(this));

});

*/

$("#have-a-question").click(function() {

	Omniture.OnClicks.HeaderHaveQuestionClicked.occurred($(this));

});



$(document).on('click', ".remove-actions .checkout-remove a.button-text", function() {

	Omniture.OnClicks.CheckoutRemoveProductClicked.occurred();

});

/*

$(document).on('click', '.accordion-heading #edit-shipping-info', function() {

	Omniture.OnClicks.CheckoutEditShippingClicked.occurred();

});



$(document).on('click', '.store-pickup a.addstoremessage', function() {

	Omniture.OnClicks.CheckoutAddStoreMsgClicked.occurred();

});



//$("#continueOnBilling").click(function() {

//	Omniture.OnClicks.CheckoutContinueBillingClicked.occurred($(this));
   
//});

*/



//$("#continueOnShipping").click(function() {

 // Omniture.OnClicks.CheckoutContinueShippingClicked.occurred($(this));

//});



$(".check-out-button[name='dwfrm_checkoutprofile_placeOrder']").click(function() {

	Omniture.OnClicks.CheckoutPlaceOrderClicked.occurred($(".input-text-pw[name='dwfrm_checkoutprofile_login_password']").val(), $(".input-text-pw[name='dwfrm_checkoutprofile_login_passwordconfirm']").val());

});

/*

//.input-text-pw[name='dwfrm_checkoutprofile_login_password'] AND dwfrm_checkoutprofile_login_passwordconfirm on confirm page

//$(".button-style-2[name='dwfrm_checkoutprofile_login']").click(function() {

//	Omniture.OnClicks.CheckoutGuestAccountCreatedClicked.occurred($(this));

//});



$("#printBtn").click(function() {

	Omniture.OnClicks.CheckoutPrintOrderClicked.occurred();

});

*/

$(".button-style-2[name='dwfrm_checkoutprofile_login']").click(function() {

	Omniture.OnClicks.CheckoutGuestAccountCreatedClicked.occurred($(this));

});


/*

$(".account-button-blue[name='dwfrm_profile_confirm']").click(function() {

	//Omniture.OnClicks.CreateAccountCreatedClicked.occurred($(this));

});

$(document).on('click', '.add-address a.add-new-address', function() {

	Omniture.OnClicks.CheckoutRegisteredAddNewAddrClicked.occurred($(this));

});



//$(".use-address").click(function() {

//	Omniture.OnClicks.CheckoutRegisteredSelectDiffAddrClicked.occurred($(this));

//});



$(document).on('click', '.ship-to-multiple .ship-to-multiple-button', function() {

	Omniture.OnClicks.CheckoutShipToMultipleAddrClicked.occurred($(this));

});



$(document).on('click', '.email-payment a.email-prefs', function() {

	Omniture.OnClicks.CheckoutManageEmailPrefsClicked.occurred($(this));

});



$(document).on('click', '.primary-logo', function() {

	Omniture.OnClicks.CheckoutPier1LogoClicked.occurred($(this));

});



//PDP

$(document).on('click', '.product-next', function() {

	Omniture.OnClicks.PDPNavNextClicked.occurred($(this));

});



$(document).on('click', '.product-previous', function() {

	Omniture.OnClicks.PDPNavPreviousClicked.occurred($(this));

});



$(document).on('click', '.ui-accordion-header', function() {

	//Omniture.OnClicks.PDPsetPreferredStoreClicked.occurred($(this));

});



$("#setPrefStore").click(function() {

	Omniture.OnClicks.PDPsetPreferredStoreClicked.occurred($(this));

});



$(".qtySelector").on('click', ".more, .less", function() {

	Omniture.OnClicks.PDPhowManyToggleClicked.occurred($(this));

});



$(document).on('change', '.quantity #Quantity', function() {

	Omniture.OnClicks.PDPhowManyTyped.occurred($(this));

});

*/

$("#add-all-to-cart").click(function() {
	 Omniture.OnClicks.PDPaddAllToBasketClicked.occurred($(this).closest(".product-add-to-cart").find("input[name='psetid']").val());

});

/*

$(".buttonWrapper").on('click', ".dropdown-menu #Ship", function() {

	Omniture.OnClicks.PDPaddToBasketShipClicked.occurred($(this));

});



$(".buttonWrapper").on('click', ".storePickupInput[name='shipping']", function() {

	Omniture.OnClicks.PDPaddToBasketStorePickupClicked.occurred($(this));

});

*/   

 

$("#setPrefStore").on('click', ".checkstoreavailability a", function() {

	Omniture.OnClicks.PDPcheckStoreAvailabilityClicked.occurred($(this));

});

/*

$(document).on('click', ".shippingoptionsdialogcontent", function() {

	Omniture.OnClicks.PDPshippingInfoClicked.occurred($(this));

});

*/

$("#pdpFaq").click(function() {

	Omniture.OnClicks.PDPfaqClicked.occurred($(this));

});

/*

$(document).on('click', ".imgEnlargelink .click-to-enlarge", function() {

	Omniture.OnClicks.PDPimageEnlargeClicked.occurred($(this));

});

*/



$(".print-page-pdp").click(function() {    

	Omniture.OnClicks.PDPimagePrintClicked.occurred($(this));

});



$(".product-image.alt-image a.thumbnail-link").click(function() {

	Omniture.OnClicks.PDPadditionalImageClicked.occurred( $(this).attr('tcarouselindex') );

});


// PDP (Desktop, Phone, Tablet)
$("#product-content-container .add-to-cart").click(function() {
	var $form = $(this).closest(".pdpForm"),
		productQuantity = $form.find("#Quantity").val(),
		productID = $form.find("#pid").val();
		
 	Omniture.OnClicks.PDPAddIndividualToBasketClicked.occurred(productID,productQuantity);
});

// Product Set (Desktop, Phone, Tablet) 
$("#product-set-list .add-to-cart").click(function() {
	var $parent = $(this).parents('.add-to-cart-block'),
		$quantitySpinner = $parent.find('.inventory .input-text'),
		productQuantity = $quantitySpinner.val(),
		productID = $quantitySpinner.attr('data1');
		
		Omniture.OnClicks.PDPAddIndividualToBasketClicked.occurred(productID,productQuantity);
});

//$(document).on('click', '.input-select', function() {

//	 Omniture.OnClicks.CardSelectClicked.occurred($(this).attr('id'),$("#paymentmethodselect").val());

//});



//$(document).on('change', ".payment-methods-select #paymentmethodselect", function() {

//  Omniture.OnClicks.CardSelectClicked.occurred($("#paymentmethodselect").val());

//});



$(document).on('click', '#carousel-recomendations li', function() {

	Omniture.OnClicks.PDPrelatedItemsClicked.occurred( $(this).attr('jcarouselindex'), $(this).attr('origPid'), $(this).attr('id') );

});



$(document).on('click', '.jcarousel-next.jcarousel-next-horizontal', function() {

	Omniture.OnClicks.PDPrelatedItemsNextClicked.occurred();

});



$(document).on('click', '.jcarousel-prev.jcarousel-prev-horizontal', function() {

	Omniture.OnClicks.PDPrelatedItemsPrevClicked.occurred();

});

/*

$(document).on('click', '.breadcrumb-product', function() {

	Omniture.OnClicks.PDPbreadcrumbNavClicked.occurred($(this));

});

*/

$(document).on('click', '.top_bar .store_container a', function() {

	Omniture.OnClicks.TopNavChooseStoreClicked.occurred();

});

$(document).on('click', '.searchform #set-user-zip', function(e) {
	Omniture.OnClicks.TopNavChooseStoreSearch.occurred($("#userZip").val());
});

//Change Shipping Method History
$('#primary').on('lineItemChange', function(e){
	var currPage = '',
		currShipMethod = e.params.previousshipmethod,
		newShipMethod = e.params.shipmethod;
	
	if( !newShipMethod || currShipMethod == newShipMethod ) return;
	
	if(e.params.ischeckout != 1) currPage = 'cart';
	else currPage = 'checkout';
	
	if(e.params.qty || e.params.quantity) currPage += '-item';
	else currPage += '-order';
	
	Omniture.Events.ChangeShippingMethod.occurred(currPage + '-' + currShipMethod + '-' + newShipMethod);
});


//Change Shipping Method Mobile
$('.direct-options-radio').on('mouseup', 'input[name=direct-radios]:radio', function(e){
	var newVal =  ko.dataFor(this).shippingMethodId();
	var shipOpt = ko.dataFor(this).orderType();
	var shipMeth = app.mobile.checkout.viewModel.deliveryOptions().shippingGroups.ship;
	var methodsList = shipMeth[shipOpt].methods();
	var oldVal;
	
	
	for (var i=0; i < methodsList.length; i++){
		if(methodsList[i].selected() == true){
				oldVal = methodsList[i].shippingMethodId();
			}
	}

	
	if (!newVal || !oldVal || (oldVal == newVal)) return;
	
	Omniture.Events.ChangeShippingMethodMobile.occurred(oldVal + "to" + newVal);
	
});

$('.hd-options-radio').on('mouseup', 'input[name=hd-radios]:radio', function(e){
		var newVal =  ko.dataFor(this).shippingMethodId();
		var shipOpt = ko.dataFor(this).orderType();
		var shipMeth = app.mobile.checkout.viewModel.deliveryOptions().shippingGroups.ship;
		var methodsList = shipMeth[shipOpt].methods();
		var oldVal;
		
		
		for (var i=0; i < methodsList.length; i++){
			if(methodsList[i].selected() == true){
					oldVal = methodsList[i].shippingMethodId();
				}
		}

		
		if (!newVal || !oldVal || (oldVal == newVal)) return;
		
		Omniture.Events.ChangeShippingMethodMobile.occurred(oldVal + "to" + newVal);
		
	});

$('#tn-basket-btn').click(function () {
	var isPanelOpen = $('body').hasClass('is-basket-panel-open');
	
	if(isPanelOpen) { return; }
	
	Omniture.Events.PanelCartOpen.occurred();
});