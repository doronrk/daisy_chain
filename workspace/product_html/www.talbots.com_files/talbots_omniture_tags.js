// Click Find in Store Event
function findInStoreClickEvent(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event27';
	s.events='event27';
	s.tl(obj,'o','find in store');
	s.events='';
}

//Click Find in store reserve event
function findInStoreReserveClickEvent(){
	var s = s_gi(s_account);
	s.linkTrackEvents='event83';
	s.events='event83';
	s.tl(true,'o','find in store reserve');
	s.events='';
}

//Click Find in store direction
function findInStoreDirectionClickEvent(){
	var s = s_gi(s_account);
	s.linkTrackEvents='event84';
	s.events='event84';
	s.tl(true,'o','find in store confirm direction');
	s.events='';
}


//Find in Store Search Success Event
function findInStoreSearchEvent(source,productID,productName,city,state,zip,radius){
	var s = s_gi(s_account);
	s.linkTrackVars='eVar65,events';
	s.linkTrackEvents='event65';
	s.events='event65';
	s.eVar65=source+"; "+productID+";"+productName+";"+city+";"+state+";"+zip+";"+radius;
	s.tl(true,'o','find in store request');
	s.events='';
}


//Find in store reserve event
function findInStoreReserveEvent(){
	var s = s_gi(s_account);
	s.linkTrackVars='eVar45,eVar67,events';
	s.linkTrackEvents='event67';
	s.events='event67';
	

	s.eVar67=document.getElementById("productID").value+";"+document.getElementById("productName").value+";"+document.getElementById("storeId").value;
	s.eVar45=document.getElementById("emailAddress").value+";"+document.getElementById("firstName").value+";"+document.getElementById("lastName").value+";"+document.getElementById("storeId").value;
	
	//if ((document.getElementById("emailAddress")!isEmpty(document.getElementById("emailAddress").value)) &&
	//		!isEmpty(document.getElementById("firstName").value) &&
	//				!isEmpty(document.getElementById("lastName").value)) {

	s.tl(true,'o','find in store reservation');

	
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}


function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

// Color Selection Event
function colorSelectionEvent(obj,labelValue){
	var s = s_gi(s_account);
	s.linkTrackEvents="event56";
	s.linkTrackVars="eVar36,eVar34,events";
	s.eVar36=labelValue;
	s.eVar34="Used";
	s.events="event56";
	s.tl(obj,'o','select color');
	s.eVar34="";
	s.eVar36="";
	s.events="";
	s.eVar19="";
	s.eVar20="";
	s.eVar22="";
	s.eVar25="";
	s.linkTrackEvents='None';
}
	
// Size Selection Event	
function sizeSelectionEvent (obj,labelValue){
		var s = s_gi(s_account);
		s.linkTrackEvents="event57";
		s.linkTrackVars="eVar37,eVar34,events";
		s.eVar37=labelValue;
		s.eVar34="Used";
		s.events="event57";
		s.tl(obj,'o','select size');
		s.eVar34="";
		s.eVar37="";
		s.events="";
		s.eVar19="";
		s.eVar20="";
		s.eVar22="";
		s.eVar25="";
		s.linkTrackEvents='None';
}

//This function will be called when the product quick view opened
function scViewAll(obj,viewType){
	var s = s_gi(s_account);
	s.linkTrackEvents="event59";
	s.linkTrackVars="eVar39,events";
	s.events="event59";
	
	if (viewType != null && viewType=="Grid") {
		s.eVar39="Grid";
		s.tl(obj,'o','grid view');
	} else {
		s.eVar39="List";
		s.tl(obj,'o','list view');
	}
	
	s.eVar39="";
	s.linkTrackVars="";
	s.linkTrackEvents='None';
	s.eVar19="";
	s.eVar20="";
	s.eVar22="";
	s.eVar25="";
}

	
//This function will be called when the "view Bag" clicked
function scViewBagClicked(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event35';
	s.events='event35';
	s.tl(obj,'o','view bag');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}

//This function will be called when the "checkout" clicked from flyout cart
function scCheckoutClicked(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar40,prop40';
	s.linkTrackEvents='event36';
	s.events='event36';
	s.eVar40="CheckoutStart; DropDownClick";
	s.prop40="CheckoutStart; DropDownClick";
	s.tl(obj,'o','checkout');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar40='';
	s.prop40='';
}

//This function will be called when the "edit" clicked in shipping info page - Not used
function scEditClicked(obj, pageName){
	var s = s_gi(s_account);
	//var pageName=$("#pageName").val();
	
	s.linkTrackVars='events,eVar42';
	s.linkTrackEvents='event42';
	s.events='event42';
	if(pageName=="Shipping"){
		s.eVar42='Checkout:Shipping';
	}
	if(pageName=="MultiShip1"){
		s.eVar42='Checkout:MultiShip1';
	}
	if(pageName=="MultiShip2"){
		s.eVar42='Checkout:MultiShip2';
	}
	if(pageName=="BillingPromotion"){
		s.eVar42='Checkout:BillingPromotion';
	}
	if(pageName=="ReviewOrder"){
		s.eVar42='Checkout:ReviewOrder';
	}
	
	s.tl(obj,'o','edit');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar42='';
}

//This function will be called when the "edit" clicked in shipping info page
function scShippingReturnToBag(obj, pageName){
	var s = s_gi(s_account);
	
	s.linkTrackVars='events,eVar52';
	//s.linkTrackEvents='event52';
	//s.events='event52';
	if(pageName=="Shipping"){
		s.eVar52='Shipping; Return to Shopping';
	}
	if(pageName=="MultiShip1"){
		s.eVar52='AddressGiftOptions1; Return to Shopping Bag';
	}
	if(pageName=="MultiShip2"){
		s.eVar52='AddressGiftOptions2; Return to Shopping Bag';
	}
	if(pageName=="BillingPromotion"){
		s.eVar52='Payment Info; Return to Shopping';
	}
	
	s.tl(obj,'o','edit');
	s.linkTrackVars='None';
	//s.linkTrackevents='None';
	//s.events='';
	s.eVar52='';
}

//This function will be called when the "proceed to checkout" clicked. The param buttonClicked differentiates the top and bottom checkout button click.
function scProceedToCheckoutClicked(obj, buttonClicked){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar40,prop40';
	s.linkTrackEvents='event29';
	if (buttonClicked == 'Top Click') {
		s.eVar40="CheckoutStart; BagTopClick";
		s.prop40="CheckoutStart; BagTopClick";
	}
	if (buttonClicked == 'Bottom Click') {
		s.eVar40="CheckoutStart; BagBottomClick";
		s.prop40="CheckoutStart; BagBottomClick";
	}
	s.events='event29';
	s.tl(obj,'o','proceed to checkout');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar40='';
	s.prop40='';
}

//This function will be called when "Express checkout" clicked
function scProceedToExpressCheckout(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar40,prop40';
	s.linkTrackEvents='event18';
	s.events='event18';
	s.eVar40="Checkout; ExpressCheckoutClick";
	s.prop40="Checkout; ExpressCheckoutClick";
	s.tl(obj,'o','proceed to Express checkout');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar40='';
	s.prop40='';
}

//This function will be called when the "continue" clicked
function scContinueClicked(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event30';
	s.events='event30';
	s.tl(obj,'o','continue');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}

//This function will be called when the "edit" clicked
function scEdit(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event31';
	s.events='event31';
	s.tl(obj,'o','edit');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}

//This function will be called when the "add gift options" clicked
function scAddGiftOptions(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event33';
	s.events='event33';
	s.tl(obj,'o','add gift options');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}

//This function will be called when the "gift options" saved from old Shopping Bag page - Not used in codebase
function scSaveGiftOptionsOld(obj,itemId){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar32';
	s.linkTrackEvents='event32';
	s.events='event32';
	if($("form#" +itemId + "6 input#giftPackaging").is(':checked')) {
		s.eVar32='Gift Packaging';
	}
	if($("form#" +itemId + "6 input#complimentaryBoxes").is(':checked')) {
		s.eVar32='Gift Boxes';
	}
	
	s.tl(obj,'o','save gift options');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar32='';
}

//This function will be called when the "signIn" clicked. If "Remember Me" is selected, this function will trigger event82.
function scSignInClicked(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar43';
	if ($("input#rememberMe").is(":checked")){
		s.linkTrackEvents='event43,event82';
		s.events='event43,event82';
	} else {
		s.linkTrackEvents='event43';
		s.events='event43';
	}
	s.eVar43='Checkout:SignIn';
	s.tl(obj,'o','signin');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar43='';
}

//This function will be called when the "signup" clicked in
function scSignUpClicked(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar43';
	s.linkTrackEvents='event43';
	s.events='event43';
	s.eVar43='Checkout:SignUp';
	s.tl(obj,'o','signup');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar43='';
}

//This function will be called when the "guestcheckout" clicked
function scGuestCheckoutClicked(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar43';
	s.linkTrackEvents='event43';
	s.events='event43';
	s.eVar43='Checkout:Guest';
	s.tl(obj,'o','guestcheckout');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar43='';
}

//This function will be called when the "offer code" applied
function scApplyOfferCode(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar38';
	s.linkTrackEvents='event38';
	s.events='event38';
	s.eVar38="";
	s.tl(obj,'o','apply offer code');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar38='';
}

//This function will be called when the "apply now" clicked on payment section of billing
function scApplyCreditCard(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar48';
	s.linkTrackEvents='event48';
	s.events='event48';
	s.eVar48='Apply now for Instant Credit Card';
	s.tl(obj,'o','apply now');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar48='';
}

//This function will be called when the "Save payment type to my Talbots" clicked
function scSaveToTalbots(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar48';
	s.linkTrackEvents='event48';
	s.events='event48';
	s.eVar48='Save payment type to Account';
	s.tl(obj,'o','Save payment type');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar48='';
}

//This function will be called when the "Save as my preferred payment" clicked
function scSaveAsPreferred(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar48';
	s.linkTrackEvents='event48';
	s.events='event48';
	s.eVar48='Save Preferred Payment';
	s.tl(obj,'o','Save as my preferred payment');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar48='';
}

//This function will be called when the "Click To Call" clicked
function scShoppingBagSignin(obj,pageName){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if(pageName=='ShoppingBag'){
		s.eVar44='ShoppingBag; SignInLink';
	}
	s.tl(obj,'o','click to call');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

var liveChatEventMap = {'ShoppingBag':'Bag; Chat','CheckoutLogin':'SignIn; Chat','Shipping':'Shipping; Chat','MultiAddr1':'AddressGift1; Chat','MultiAddr2':'AddressGift2; Chat','Billing':'Payment; Chat','ReviewOrder':'Review; Chat'};
//This function will be called when the "Live Chat" clicked
function scLiveChat(obj,pageName){
	var curPageName = $("#pageName").val();
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if (curPageName != null && curPageName != undefined && curPageName != '') {
		s.eVar44=liveChatEventMap[curPageName];
	}
	s.tl(obj,'o','live chat');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

var emailUsEventMap = {'ShoppingBag':'Bag; Email','CheckoutLogin':'SignIn; Email','Shipping':'Shipping; Email','MultiAddr1':'AddressGift1; Email','MultiAddr2':'AddressGift2; Email','Billing':'Payment; Email','ReviewOrder':'Review; Email'};
//This function will be called when the "Email Us" clicked
function scEmailUs(obj,pageName){
	var curPageName = $("#pageName").val();
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if (curPageName != null && curPageName != undefined && curPageName != '') {
		s.eVar44=emailUsEventMap[curPageName];
	}
	s.tl(obj,'o','email us');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

var custSupportCallEventMap = {'ShoppingBag':'Bag; Call','CheckoutLogin':'SignIn; Call','Shipping':'Shipping; Call','MultiAddr1':'AddressGift1; Call','MultiAddr2':'AddressGift2; Call','Billing':'Payment; Call','ReviewOrder':'Review; Call'};
//This function will be called when the "Click To Call" clicked
function scClickCall(obj,pageName){
	var curPageName = $("#pageName").val();
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if (curPageName != null && curPageName != undefined && curPageName != '') {
		s.eVar44=custSupportCallEventMap[curPageName];
	}
	s.tl(obj,'o','click to call');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

var returnsEventMap = {'ShoppingBag':'Bag; Returns','CheckoutLogin':'SignIn; Returns','Shipping':'Shipping; Returns','MultiAddr1':'AddressGift1; Returns','MultiAddr2':'AddressGift2; Returns','Billing':'Payment; Returns','ReviewOrder':'Review; Returns'};
//This function will be called when the "returns" clicked
function scReturns(obj,pageName){
	var curPageName = $("#pageName").val();
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if (curPageName != null && curPageName != undefined && curPageName != '') {
		s.eVar44=returnsEventMap[curPageName];
	}
	s.tl(obj,'o','returns');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

var privacyEventMap = {'ShoppingBag':'Bag; Privacy','CheckoutLogin':'SignIn; Privacy','Shipping':'Shipping; Privacy','MultiAddr1':'AddressGift1; Privacy','MultiAddr2':'AddressGift2; Privacy','Billing':'Payment; Privacy','ReviewOrder':'Review; Privacy'};
//This function will be called when the "privacy" clicked
function scPrivacy(obj,pageName){
	var curPageName = $("#pageName").val();
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if (curPageName != null && curPageName != undefined && curPageName != '') {
		s.eVar44=privacyEventMap[curPageName];
	}

	s.tl(obj,'o','privacy');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

//This function will be called when the "shipping" clicked
function scShipping(obj,pageName){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if(pageName=='ShoppingBag'){
		s.eVar44='ShoppingBag:Shipping';
	}
	if(pageName=='MiniCart'){
		s.eVar44='MiniCart:Shipping';
	}
	s.tl(obj,'o','shipping');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

//This function will be called when the "Security Policy" clicked
function scSecurityPolicy(obj,pageName){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if(pageName=='CheckoutLogin'){
		s.eVar44='SignIn; Security Policy';
	}
	s.tl(obj,'o','Security Policy');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

//This function will be called when the "print" clicked
function scPrint(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	s.eVar44='OrderConfirmation:Print';
	s.tl(obj,'o','print');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

//This function will be called when the "Forget Password" clicked
function scForgetPassword(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	s.eVar44='SignIn; Forget Password ';
	s.tl(obj,'o','returns');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

//This function will be called when the "edit bag" clicked under mini cart
function scEditBag(obj,pageName){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if(pageName=='MiniCart'){
		s.eVar44='MiniCart:EditBag';
	}
	s.tl(obj,'o','edit bag');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

//This function will be called when the "my talbots" clicked
function scMyTalbots(obj,pageName){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar44';
	s.linkTrackEvents='event44';
	s.events='event44';
	if(pageName=='MiniCart'){
		s.eVar44='MiniCart:MyTalbots';
	}
	s.tl(obj,'o','my talbots');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar44='';
}

//This function will be called when the "Place My Order" clicked
function scPlaceMyOrder(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event47';
	s.events='event47';
	s.tl(obj,'o','print');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}


//This function will be called when the product removed
function scProductRemove(obj,prodId,skuId){
	var s = s_gi(s_account);
	s.linkTrackVars='events,products,eVar4';
	s.linkTrackEvents='scRemove';
	s.events='scRemove';

	s.products=';' + prodId + ';;;;evar4=' + skuId;
	s.tl(obj,'o','item removal');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.products='';
}


var removeCouponPageMap = {'ShoppingBag':'Bag','Billing':'Payment','ReviewOrder':'Review'};
//This function will be called when the "offer code" undo
function scUndoOfferCode(obj,pCouponKey,pCouponName){
	var s = s_gi(s_account);
	var curPageName = $("#pageName").val();
	s.linkTrackVars='events,eVar46';
	s.linkTrackEvents='event46';
	s.events='event46';
	if (curPageName != null && curPageName != undefined && curPageName != '') {
		s.eVar46=removeCouponPageMap[curPageName]+";PromoCode"+pCouponKey+":Description"+pCouponName;
	} else {
		s.eVar46="PromoCode"+pCouponKey+":Description"+pCouponName;
	}
	
	s.tl(obj,'o','undo offer code');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar46='';
}

//This function will be called when the "offer code" undo
function scApplyOfferCodeBillingPage(obj,pCouponKey,pCouponName){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar38';
	s.linkTrackEvents='event38';
	s.events='event38';
	s.eVar38="PromoCode"+pCouponKey+":Description"+pCouponName;
	s.tl(obj,'o','undo offer code');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar38='';
}

//This function will be called when the Gift card has been applied
function scApplyGiftCard(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event39';
	s.events='event39';
	s.tl(obj,'o','Apply Gift Card');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}

//This function will be called when TCC has been applied
function scApplyTCC(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event40';
	s.events='event40';
	s.tl(obj,'o','Apply TCC');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}

//This function will be called when item added to wish list from shopping cart
function scCartWishListAdd(obj,prodId,skuId,wishlistStatus){
	var s = s_gi(s_account);
	s.linkTrackVars='events,products,eVar4';
	if(wishlistStatus == 0){
		s.linkTrackEvents='event7,event8,event34';
		s.events='event7,event8,event34';
	}else{
		s.linkTrackEvents='event8,event34';
		s.events='event8,event34';
	}
	s.products=';' + prodId + ';;;;evar4=' + skuId;
	s.tl(obj,'o','cart wish list add');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.products='';
}

//This function will be called when remove item from wishlist event happening from wish list page
function scWishlistRemove(obj,prodId,skuId){
	var s = s_gi(s_account);
	s.linkTrackVars='events,products,eVar4';
	s.linkTrackEvents='event9';
	s.events='event9';
	s.products=';' + prodId + ';;;;evar4=' + skuId;
	s.tl(obj,'o','wishlist remove');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.products='';
}


//This function will be called when item added from wishlist event happening from wish list page
function scWishlistItemAddToCart(obj,prodId,skuId){
	var s = s_gi(s_account);
	s.linkTrackVars='events,products,eVar4';
	s.linkTrackEvents='event11,scAdd';
	s.events='event11,scAdd';
	s.products=';' + prodId + ';;;;evar4=' + skuId;
	s.tl(obj,'o','wishlist item add to cart');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.products='';
}


//This function will be called when the "gift options" saved - Not used in codebase
function scSaveGiftOptions(obj,giftOption){
	
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar32';
	s.linkTrackEvents='event32';
	s.events='event32';
	if(giftOption =='GiftWrap') {
		s.eVar32='Gift Packaging';
	}
	if(giftOption =='GiftBox') {
		s.eVar32='Gift Boxes';
	}
	
	s.tl(obj,'o','save gift options');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}


//This function will be called when user clicks on Shipping or FAQ Inquiry
function scShippingFAQ(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event49';
	s.events='event49';
	s.tl(obj,'o','Shipping or FAQ');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.pageName='';
	s.channel='';
	s.prop2='';
	s.prop3='';
	s.prop4='';
}


//This function will be called when a new address has been added
function scAddNewAddress(obj){
	var s = s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event45';
	s.events='event45';
	s.tl(obj,'o','add new address');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
}


var pageNamePrefixMap = {'ShoppingBag':'Bag','CheckoutLogin':'SignIn','Shipping':'Shipping','MultiAddr1':'AddressGift1','MultiAddr2':'AddressGift2','Billing':'Payment','ReviewOrder':'Review'};
//This function will be called when Add address link is clicked
function scClickAddNewEditAddress(obj, addressEvent){
	var curPageName = $("#pageName").val();
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar61';
	s.linkTrackEvents='event61';
	s.events='event61';
	s.eVar61 = '';
	if (curPageName != null && curPageName != undefined && curPageName != '') {
		var prefix = pageNamePrefixMap[curPageName];
		if (prefix != undefined && prefix != null && prefix != '') {
			s.eVar61=prefix + ";" + addressEvent;
		}
	}
	s.tl(obj,'o','Add New Edit Address');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar61='';
}

//This function will be called when model window is closed. The input param is the model window name.
function scCloseModelWindow(obj, windowName){
	var curPageName = $("#pageName").val();
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar61';
	s.linkTrackEvents='event61';
	s.events='event61';
	s.eVar61 = '';
	if (curPageName != null && curPageName != undefined && curPageName != '') {
		var prefix = pageNamePrefixMap[curPageName];
		if (prefix != undefined && prefix != null && prefix != '') {
			s.eVar61=prefix + ";" + windowName;
		}
	}
	s.tl(obj,'o','model window closed');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar61='';
}

//This function triggers event60 when the checkout breadcrumb links are clicked
function scProgressBar(obj, pageName){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar60,prop60';
	s.linkTrackEvents='event60';
	s.events='event60';
	s.eVar60=pageName;
	s.prop60 = pageName;
	s.tl(obj,'o','Checkout Progress Bar');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar61='';
	s.prop60='';
}

//This function will be called when canada link is clicked
function scStoreLocatorCanada(obj){
	var s = s_gi(s_account);
	s.linkTrackEvents='event63';
	s.events="event63";
	s.tl(obj,'o','Store Locator Search Canada');
	s.linkTrackEvents='none';
	s.events='';
}

//This function will be called when find stores button is clicked with valid results 
function scStoreLocatorSearch(source, value){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar10,prop10';
	s.linkTrackEvents='event2';
	s.events ='event2';
	s.eVar10 = source+value;
	s.prop10 = source+value;
	s.tl(true,'o','Store Locator Search');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar10='';
	s.prop10='';
}

//This function will be called when share location is enabled
function scStoreLocatorLL(source,value){
	var s = s_gi(s_account);
	s.linkTrackVars='eVar63';
	s.eVar63= source+value;
	s.tl(true,'o','Store Locator LL');
	s.linkTrackVars='None';
	s.eVar63='';
}

//This function will be called when get directions button is clicked
function scStoreLocatorDirections(source,value){
	var s = s_gi(s_account);
	s.linkTrackVars='eVar64';
	s.eVar64= source+value;
	s.tl(true,'o','Store Locator Directions');
	s.linkTrackVars='None';
	s.eVar64='';
}

//This function will be called when Stores link is clicked
function scStoreLocatorClick(obj){
	var s = s_gi(s_account);
	s.linkTrackEvents='event64';
	s.events="event64";
	s.tl(obj,'o','Store Locator Click');
	s.linkTrackEvents='none';
	s.events='';
}

//This function will be called when "Express checkout" clicked
function scShippingErrors(obj, errorMsg, prefix, errorsCount){
	var s = s_gi(s_account);
	s.linkTrackVars='events,eVar41';
	s.linkTrackEvents='eVar41';
	s.events='eVar41';
	if (errorsCount == 1) {
		s.eVar41=prefix + errorMsg;
	} else {
		s.eVar41=prefix + errorMsg + ":multiple";
	}
	s.tl(obj,'o','Shipping Error message');
	s.linkTrackVars='None';
	s.linkTrackevents='None';
	s.events='';
	s.eVar41='';
}