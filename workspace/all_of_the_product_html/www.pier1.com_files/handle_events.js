var Omniture = Omniture || {};

var setOrInd = "Individual_";

if (productSetSku) {
	setOrInd = "Set_";
}

Omniture.Events = Omniture.Events || {};
Omniture.OnClicks = Omniture.OnClicks || {};

// Pass array of initialized vars - reinitializes properties to empty strings
function cleanseProperties(properties) {
	var i = 0;
	
	for( ; i < properties.length ; i++ ) {
		if( !properties[i] || !s[properties[i]] ) { continue; }
		
		s[properties[i]] = '';
	}
}

Omniture.Events = ( function () {

	function save() {
		/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
		var s_code=s.t();if(s_code)document.write(s_code);
	}

	return { save: save };
}());

Omniture.OnClicks = ( function () {

	function saveClick(obj,tp,nm) { //object,linkType,linkName
		/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
		var s_code=s.tl(obj,tp,nm);if(s_code)document.write(s_code);
	}

	return { saveClick: saveClick };
}());

/*****************************************************
 *			Misc Omniture Events 
 ****************************************************/

Omniture.Events.AddToCartFromWishlist = ( function () {
	
	function occurred(productID) {
		s.events = 'scAdd, scOpen';
		s.products=";"+productID;
		
		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.HeaderHaveQuestionClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Phone_Have_A_Question,Universal';
	    s.prop8  = 'Checkout,Phone_Have_A_Question,Universal';
	    s.events = 'event5';  

		Omniture.Events.save();
	    // Omniture.OnClicks.saveClick(this,'o','Phone_Have_A_Question');
	}

	return { occurred: occurred };
}());

Omniture.Events.HomePageCarouselOpen = ( function () {

	function occurred() {
		s.events = 'scCarouselOpen';  

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());

Omniture.Events.LeftNavRefinementAdded = ( function () {

	function occurred(object) {
		/*
		s.linkTrackVars='eVar29,eVar30';
		s.linkTrackEvents='event32';
		s.events ='event32';
		//is this a toggled refinement zone
		var parenttoggle = object.parents('.toggle-content').siblings('.toggle').find('span');
		//'sc' + object.text().replace(' ', '') + 'Added';

		s.eVar29 = parenttoggle.length ? parenttoggle.text().replace(' ','') : object.text();
		s.eVar30= object.text().replace(' ', '');

		//the ajax call will load in the image request
		//Omniture.Events.save();
		*/
	}

	return { occurred: occurred };
}());

Omniture.Events.otherRefinementsAdded= ( function () {

	function occurred(object) {
		s.linkTrackVars='eVar29,eVar30';
		s.events ='event32';
		//s.events = 'sc' + object.text().replace(' ', '') + 'Added';

		s.eVar29 = (object.parents().parents().parents('.refinement').hasClass('Category')) ? 'category refinement':object.text();	
		s.eVar30= object.text().replace(' ', '');

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());

Omniture.Events.BreadcrumbRefinementRemoved = ( function () {

	function occurred(object) {
		s.events = 'scBreadcrumb' + object.parent().text().replace(/[\s\t]/g, '') + 'Remove';  

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());

Omniture.Events.ChangeShippingMethod = ( function () {
	
	function occurred(mes) {
		s.linkTrackVars='prop23';
		s.prop23 = mes;
		
		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());

Omniture.Events.ChangeShippingMethodMobile = ( function () {
	
	function occurred(message) {
		s.linkTrackVars='eVar44';
		s.eVar44 = "Checkout_Shipping_ChangeShipMethod" + message;
		
		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.FaqArticleClicked = ( function (articleName) {

	function occurred(articleName) {
		s.linkTrackVars='eVar28';
	    s.eVar28 = 'FAQ,'+articleName;
	    s.events = 'event5';  

		Omniture.Events.save();
		//Omniture.OnClicks.saveClick(this,'o','FAQ');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CLPSortingClicked = (function (refineLbl) {

	function occurred(refineLbl) {
		s.linkTrackVars='eVar22';
	    s.eVar22 ='Product Category Grid,Sorting,'+refineLbl;
	    s.prop8  ='Product Category Grid,Sorting,'+refineLbl;
		s.events = 'event29';  

		//Omniture.Events.save();
	   // Omniture.OnClicks.saveClick(this,'o','Sorting');
	}

	return { occurred: occurred };
}());


	
/*********************************************
 *		3.8 Mobile/Tablet Specific Omniture Events 
 ********************************************/

Omniture.Events.PanelCartOpen = ( function () {
	
	function occurred() {
		s.events = 'event62';
		
		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());

Omniture.Events.AccountPanelLogin = ( function () {
	
	function occurred () {
		s.linkTrackVars = 'eVar44';
		s.eVar44 = 'globalheader_account_signin';
		
		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());

/*******************************************************
 *			Quickview Omniture Events 
 ******************************************************/

Omniture.Events.PQVAddToCartClicked = ( function () {

	function occurred(productID,quantity) {
		omnitureUtils.productInventoryStatus(productID,quantity, function(inventoryStatus) {		

			var addToCartEvent = 'scAdd,scOpen,event45';
			
			if(inventoryStatus == 'not_available' || inventoryStatus == 'not_applicable')
				addToCartEvent = addToCartEvent + ',event42';
		
			s.events = addToCartEvent;  
			
			Omniture.Events.save();
		});
	}

	return { occurred: occurred };
}());



/***************************************************
 *		Swatch Omniture Events 
 **************************************************/

Omniture.Events.SwatchPopupClicked = ( function () {
	
	function occurred(swatchids) {
		s.events = 'propView, event3, event54';
		s.products = swatchids;
		
		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());

Omniture.Events.SwatchAddToBasketClicked = ( function () {
	
	function occurred() {
		s.events = 'event55';
		
		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());



/**************************************************
 *		3.8 Checkout Omniture Events 
 *************************************************/

Omniture.Events.NextPage = ( function() {
	
	var EVENT_TYPES = {
						basket : { events: 'scView' },
						shipping : {events : 'event8'},
						billing : {events : 'event9'},
						options : {events : null},
						review : {events : 'event10'}};
						
	function occurred(data, customEvents){
	try{
			var d = new Date();
			d.setHours(d.getUTCHours() - 7);
			s.server = app.customer.server;
			s.eVar24 = app.util.getDayOfWeek(d.getDay());
			s.eVar25 = d.getHours();  //GMT
			s.eVar26 = data.authenticated ? "registered" : "guest";
	    	s.pageName='checkout - ' + data.page;
	    	s.channel='checkout';
	    	s.products = (s.products) ? s.products : getProductString(data.items);
	    	if(EVENT_TYPES[data.page].events){
	    		var totalEvents = '';
	    		if(customEvents){
	    			totalEvents = EVENT_TYPES[data.page].events + ',' + customEvents.events;
	    		}else{
	    			totalEvents = EVENT_TYPES[data.page].events;
	    		}
	    		s.events = totalEvents;
	    		
	    	}else{
	    		s.events="";
	    	}
	    	
	    	if(data.hasOwnProperty('source') && data.source === 'breadcrumb') {
	    		s.eVar44 = 'checkout_' + data.prevPage + '_' + data.page;
	    	}
	    	
	    	Omniture.Events.save();
	    	cleanseProperties(['eVar44']);
	    }catch(e){if(console){console.log(e);}}
	    
	}   

	return { occurred: occurred };
}());

Omniture.Events.CheckoutStart = ( function () {
	
	function occurred() {
		s.linkTrackVars = 'events';
		s.events = 'scCheckout';
		
		Omniture.Events.save();
		
		cleanseProperties(['events']);
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.ErrorTracking = ( function () {
	
	function occurred(data) {
		if(!data.component) {
			return;
		}
		
		var page = data.page || '';
		
		if (page == 'options'){
			page = 'shipping_' + page;
		}
		else if (page == 'header'){
			page = 'login_' + page;
		}
		else if (page == 'login') {
			page = page + '_modal';
		}
		
		var	component = data.component || '',
			message = page + '_' + component.replace(/ /g, '_').toLowerCase();
			
		s.linkTrackVars = 'prop14,eVar47';
		
		s.prop14 = message;
		s.eVar47 = message;
		
		Omniture.OnClicks.saveClick(this, 'o', 'Error Track');
		cleanseProperties(['prop14', 'eVar47']);
		
		//basket, shipping, billing, review, to prepend
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutSubmitOrderError = ( function () {
	
	function occurred(data) {
		var dataMsg= data.msgText.toString();
		var dataMsgShort= dataMsg.substr(0,25);
		s.linkTrackVars = 'prop14,eVar47';
		s.eVar47 = 'review_placeorder_' + dataMsgShort;
		s.prop14 = 'review_placeorder_' + dataMsgShort;
		Omniture.OnClicks.saveClick(this, 'o', 'Checkout Submit Order Error');
		cleanseProperties(['prop14', 'eVar47']);
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutSaveAddress = (function () {

	function occurred(data) {
		if(data.type === 'shipping') {
			s.events ="event22";
		} else if(data.type === 'billing') {
			s.events ="event23";
		}
		
       //Omniture.Events.save();
       Omniture.OnClicks.saveClick(this, 'o', 'Checkout Save Address');
       
       cleanseProperties(['events']);
	}

	return { occurred: occurred };

}());

Omniture.OnClicks.CheckoutCreditCardSelected = ( function () {

	function occurred(data) {
		if(data.isP1RCC) {
			s.events="event25";
		} else {
			s.events="event26";
		}
		
		Omniture.OnClicks.saveClick(this, 'o', 'Credit Card Selected');
		
		cleanseProperties(['events']);
	}   

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutRemoveProduct = ( function () {

	function occurred(data) {
		var propsToCleanse = [],
			from = data.from,
			items = data.items;
		
		if(from && from === 'out_of_stock') {
			s.linkTrackVars = 'eVar44';
			s.eVar44 = 'Cart_ItemNotAvailable_PopUp_RemoveFromCartSelected';
			propsToCleanse.push('eVar44');
		}
		
		s.linkTrackEvents = 'scRemove';
		s.linkTrackVars = 'events,products';
		
	    s.events = 'scRemove';
	    s.products = getProductString(items);
	    
		propsToCleanse.push('events');
		propsToCleanse.push('products');
		
		Omniture.OnClicks.saveClick(this, 'o', 'Checkout Remove Product');
		
		cleanseProperties(propsToCleanse);
	}   

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutUseSameAsShipping = ( function () {
    function occurred(data) {
        if( !data.hasOwnProperty('checked') ) {
            return;
        }
        
        var checkboxState = ( data.checked ) ? 'checked' : 'unchecked';
        
        s.linkTrackVars = 'eVar44';
        s.eVar44 = 'checkout_billing_' + checkboxState + 'shippingaddress';
        
        Omniture.OnClicks.saveClick(this, 'o', 'Use Same as Shipping Checkbox');
        
        cleanseProperties(['eVar44']);
    }
    
    return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutPersonalMessageAdded = ( function () {
	
	function occurred() {
		s.events="event21";
		
		Omniture.OnClicks.saveClick(this, 'o', 'Add Personal Message');
		
		cleanseProperties(['events']);
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutLogin = ( function () {
	
	function occurred() {
		s.linkTrackEvents = 'event7';
		s.linkTrackVars = 'events';
		s.events = 'event7';
		
		Omniture.OnClicks.saveClick(this, 'o', 'Login_From_Checkout');
		
		cleanseProperties(['events']);
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutPageFail = ( function () {
	
	function occurred(data) {
		var page = data.page || 'testpage',
			message = data.message || 'testmessage';
		
		alert(message + ' on ' + page);
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutCreateAccount = ( function () {

	function occurred() {
	    s.events = 'event13';
        
        //Omniture.Events.save();
        Omniture.OnClicks.saveClick(this, 'o', 'Add Coupon');
        
        cleanseProperties(['events']);
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutAddCoupon = ( function () {
	
	function occurred(data) {
		var success = (data.success) ? 'success' : 'fail',
			promoCodeStatus = 'Checkout, promo_code_value, ' + data.code.toString() + ', ' + success;
		
		s.linkTrackVars = 'eVar12,eVar15,prop8';
		s.eVar12 = data.code.toString();
		s.eVar15 = promoCodeStatus;
		s.prop8 = promoCodeStatus;
		s.events = '';
		
		if(data.success) { s.events = 'event24'; }
		
		//Omniture.Events.save();
		Omniture.OnClicks.saveClick(this, 'o', 'Add Coupon');
		
		cleanseProperties(['eVar12', 'eVar15', 'prop8']);
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutAddToWishlist = ( function () {

	function occurred(data) {
		var propsToCleanse = [],
			from = data.from,
			items = data.items;
		
		if(from && from === 'out_of_stock') {
			s.linkTrackVars = 'eVar44';
			s.eVar44 = 'Cart_ItemNotAvailable_PopUp_AddToWishlistSelected';
			propsToCleanse.push('eVar44');
		}
		
		s.linkTrackVars = 'events,products';
		s.linkTrackEvents = 'event63, event11';
		
		s.events = 'event63, event11';
		s.products = getProductString(items);
		propsToCleanse.push('events', 'products');
		
		Omniture.OnClicks.saveClick(this, 'o', 'Checkout Add to Wishlist');
		
		cleanseProperties(propsToCleanse);
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutOutOfStockModal = ( function () {
	
	function occurred(data) {
		s.linkTrackVars = 'eVar44';
		s.eVar44 = 'Cart_ItemNotAvailable_Popup,' + data.sku;
		
		Omniture.OnClicks.saveClick(this, 'o', 'Checkout Out of Stock Modal');
		
		cleanseProperties(['eVar44']);
	}
	
	return { occurred: occurred };
}());

/*********************************************************
 *				PDP Omniture Events 
 *******************************************************/

Omniture.OnClicks.PDPAddIndividualToBasketClicked = ( function () {

	function occurred(productID,quantity) {
		omnitureUtils.productInventoryStatus(productID,quantity, function(inventoryStatus) {
			
			var addToCartEvent = 'scAdd,scOpen';

			if(inventoryStatus == 'not_available' || inventoryStatus == 'not_applicable') {
				addToCartEvent = addToCartEvent + ',event42';
			}
			
			s.eVar15 = 'Product_Page,Individual_SKU_Add_To_Basket_' + productID + ',' + setOrInd + 'Page';
			s.prop8  = 'Product_Page,Individual_SKU_Add_To_Basket_' + productID + ',' + setOrInd + 'Page';

			if(!s.pageName.contains("pdp:")) {
    			s.pageName= "pdp: " + productID;
			}
			
      	    s.events = addToCartEvent;  
	  	    s.linkTrackVars='products';
	    	s.products=";"+productID;	    	
	    	
	    	Omniture.Events.save(); 

	    //	Omniture.OnClicks.saveClick(this,'o','Individual_SKU_Add_To_Basket');
		});
	}

	return { occurred: occurred }; 
}());

Omniture.OnClicks.PDPaddAllToBasketClicked = ( function () {

	function occurred(val) {
		s.linkTrackVars='eVar15,prop8,eVar41';
		s.events="scAdd,scOpen,event43";
		s.eVar15 = 'Product_Page,Group_Add_To_Basket_' + productSetSku + ',' + setOrInd + 'Page';
        s.eVar41=val;
		s.prop8  = 'Product_Page,Group_Add_To_Basket_' + productSetSku + ',' + setOrInd + 'Page';
		
		s.products=";"+val;

		Omniture.Events.save();
		//Omniture.OnClicks.saveClick(this,'o','Group_Add_To_Basket');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPsetPreferredStoreClicked = ( function () {

	function occurred(){
		s.linkTrackVars='eVar15,prop8';
		s.eVar15 = 'Product_Page,Other_Stores,' + setOrInd + 'Page';
		s.prop8  = 'Product_Page,Other_Stores,' + setOrInd + 'Page';

		Omniture.Events.save();
	//	Omniture.OnClicks.saveClick(this,'o','Other_Stores');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPNavNextClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
		s.eVar15 = 'Product_Page,Next_Top,' + setOrInd + 'Page';
		s.prop8  = 'Product_Page,Next_Top,' + setOrInd + 'Page';
		
		Omniture.Events.save();
	//	Omniture.OnClicks.saveClick(this,'o','Next_Top');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPNavPreviousClicked = ( function () {

	function occurred(){
		s.linkTrackVars='eVar15,prop8';
		s.eVar15 = 'Product_Page,Previous_Top,' + setOrInd + 'Page';
		s.prop8  = 'Product_Page,Previous_Top,' + setOrInd + 'Page';

		Omniture.Events.save();

	//	Omniture.OnClicks.saveClick(this,'o','Previous_Top');

	}

	return { occurred: occurred };
}());

Omniture.Events.AddToWishlistClicked = ( function () {

	function occurred () {
		s.events = 'event11';  

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());

Omniture.Events.PDPCarouselImageClicked = ( function() {

	function occurred(){
		s.events = 'event16';

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());

Omniture.Events.PDPProductCarouselPageClicked = ( function() {

	function occurred(object){
		s.events = 'event18';

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());

Omniture.Events.WishlistAddToCartClicked = ( function () {

  function occurred(productID,quantity) {
		omnitureUtils.productInventoryStatus(productID,quantity, function(inventoryStatus) {
			var addToCartEvent = 'scAdd,scOpen';
			
			if(inventoryStatus == 'not_available' || inventoryStatus == 'not_applicable')
				addToCartEvent = addToCartEvent + ',event42';

			s.events = addToCartEvent;		
			s.pageName = "Wish List:Edit";
			s.channel = "Wish List > Edit";
			s.pageType = "";

			Omniture.Events.save();
		});
	}

	return { occurred: occurred };
}());

Omniture.Events.WishlistSendCancelClicked = ( function () {

	function occurred(object){
		s.events = 'scCancel';  

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPhowManyTyped = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
		s.eVar15 = 'Product_Page,How_Many_Typed,' + setOrInd + 'Page';
		s.prop8  = 'Product_Page,How_Many_Typed,' + setOrInd + 'Page';

		Omniture.Events.save();
		//Omniture.OnClicks.saveClick(this,'o','How_Many_Typed');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPhowManyToggleClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
		s.eVar15 = 'Product_Page,How_Many_Toggle,' + setOrInd + 'Page';
		s.prop8  = 'Product_Page,How_Many_Toggle,' + setOrInd + 'Page';

		Omniture.Events.save();
		//Omniture.OnClicks.saveClick(this,'o','How_Many_Toggle');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPaddToBasketStorePickupClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
		s.eVar15 = 'Product_Page,Add_To_Basket_StorePickup,' + setOrInd + 'Page';
		s.prop8  = 'Product_Page,Add_To_Basket_StorePickup,' + setOrInd + 'Page';

		Omniture.Events.save();
		//Omniture.OnClicks.saveClick(this,'o','Add_To_Basket_StorePickup');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPaddToBasketShipClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
		s.eVar15 = 'Product_Page,Add_To_Basket_Ship,' + setOrInd + 'Page';
		s.prop8  = 'Product_Page,Add_To_Basket_Ship,' + setOrInd + 'Page';

		Omniture.Events.save();
		//Omniture.OnClicks.saveClick(this,'o','Add_To_Basket_Ship');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPcheckStoreAvailabilityClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,Check_Store_Availability,' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,Check_Store_Availability,' + setOrInd + 'Page';

		Omniture.Events.save();
	  //  Omniture.OnClicks.saveClick(this,'o','Check_Store_Availability');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPimageEnlargeClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,Enlarge_Image,' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,Enlarge_Image,' + setOrInd + 'Page';

	    Omniture.OnClicks.saveClick(this,'o','Enlarge_Image');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPimagePrintClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,Print_Image,' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,Print_Image,' + setOrInd + 'Page';
	    s.events ="event31";
	    
        Omniture.Events.save();
	    Omniture.OnClicks.saveClick(this,'o','Print_Image');

	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPadditionalImageClicked = ( function () {

	function occurred(val) {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,Additional_Image_' + val + ',' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,Additional_Image_' + val + ',' + setOrInd + 'Page';

	    s.events ="event17";
        Omniture.Events.save();
	  //  Omniture.OnClicks.saveClick(this,'o','Additional_Image');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPfaqClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,FAQ,' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,FAQ,' + setOrInd + 'Page';
		s.events = 'event5';  

		Omniture.Events.save();
		//Omniture.OnClicks.saveClick(this,'o','FAQ');

	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPshippingInfoClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,Shipping_Information,' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,Shipping_Information,' + setOrInd + 'Page';

		Omniture.Events.save();
	 //   Omniture.OnClicks.saveClick(this,'o','Shipping_Information');
	}

	return { occurred: occurred }; 
}());

Omniture.OnClicks.PDPrelatedItemsClicked = ( function () {

	function occurred(val1,val2,val3) {
		s.linkTrackVars='eVar15,prop8';
		s.pageName = "pdp : "+val2;	    
	    s.prop8  = 'Product_Page,Related_Items_Position-' + val1 + ',Originating_Sku-' + val2 + ',Related_Sku-' + val3 + ',' + setOrInd + 'Page';
	    s.eVar7='Product Details Page';
 		s.eVar8=val2; //value of original sku i.e. triggering product.
	  	s.eVar15 = 'Product_Page,Related_Items_Position-' + val1 + ',Originating_Sku-' + val2 + ',Related_Sku-' + val3 + ',' + setOrInd + 'Page';
		s.eVar21=val3; //value of rleated sku. i.e. cross sold product
		
	    s.events ="event20";
		
        Omniture.Events.save();
        //Omniture.OnClicks.saveClick(this,'o','Related_Items');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPrelatedItemsNextClicked = ( function () {

	function occurred(val1,val2) {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,Related_Items_Next,' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,Related_Items_Next,' + setOrInd + 'Page';

	    Omniture.OnClicks.saveClick(this,'o','Related_Items_Next');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.PDPrelatedItemsPrevClicked = ( function () {

	function occurred(val1,val2) {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,Related_Items_Prev,' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,Related_Items_Prev,' + setOrInd + 'Page';

	    Omniture.OnClicks.saveClick(this,'o','Related_Items_Prev');
	}

	return { occurred: occurred };
}());



Omniture.OnClicks.PDPbreadcrumbNavClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Product_Page,Breadcrumb_Navigation,' + setOrInd + 'Page';
	    s.prop8  = 'Product_Page,Breadcrumb_Navigation,' + setOrInd + 'Page';

	    Omniture.OnClicks.saveClick(this,'o','Breadcrumb_Navigation');
	}

	return { occurred: occurred };
}());

/*********************************************************
 *				Top Nav Omniture Events 
 ********************************************************/

Omniture.OnClicks.TopNavChooseStoreClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
		s.pageName='pier1 us:find a store';
		s.channel='store locator';
		s.events='';
		s.eVar15 = 'Top_Nav,Your_Store';
	    s.prop8  = 'Top_Nav,Your_Store';

	    Omniture.Events.save();
	   // Omniture.OnClicks.saveClick(this,'o','Your_Store');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.TopNavChooseStoreSearch = ( function () {

	function occurred(val) {
		s.linkTrackVars='eVar15,prop8,eVar34,prop20';
		s.pageName='pier1 us:find a store';
		s.channel='store locator';
		s.products='';
		s.events='event33';
		s.eVar15 = 'Top_Nav,Your_Store';
		s.eVar34=val;
		s.prop8  = 'Top_Nav,Your_Store';
		s.prop20=val;

	    Omniture.Events.save();
	   // Omniture.OnClicks.saveClick(this,'o','Your_Store');
	}

	return { occurred: occurred };
}());



/**********************************************
 *		Inventory Helper Callback
 *********************************************/

var omnitureUtils = {
	productInventoryStatus: function (pid,quantity, callback) {
		var inventoryStatus="";
		var url = app.util.appendParamsToUrl(app.urls.getAvailability , {pid:pid,Quantity:quantity});
	    $.getJSON(
			url,
			{format: "json"},
			function(data) {
				if (data) {
					inventoryStatus = data.status.toLowerCase();
				}
			}
	    ).error(function(data) {
	    	inventoryStatus = "not_applicable";
		}).success(function (data){
						
		}).complete(function(data){
				if (typeof callback != "undefined" && typeof callback === "function") callback(inventoryStatus);
		});
	  }
};



/**********************************************
 *		3.8 Checkout Omniture Event Mapper 
 *********************************************/

// EventMap property strings passed from JS - map to functions that fire omniture events/set evars/props
// Use in JS callbacks or when content is dependent on ajax requests

var eventMap = {
	'account_panel_login'	: Omniture.Events.AccountPanelLogin.occurred,
	'add_address'			: Omniture.OnClicks.CheckoutSaveAddress.occurred,
	'add_coupon'			: Omniture.OnClicks.CheckoutAddCoupon.occurred,
	'add_to_wishlist'		: Omniture.OnClicks.CheckoutAddToWishlist.occurred,
	'cc_selected'			: Omniture.OnClicks.CheckoutCreditCardSelected.occurred,
	'checkout_login'		: Omniture.OnClicks.CheckoutLogin.occurred,
	'checkout_page_failure' : Omniture.OnClicks.CheckoutPageFail.occurred,
	'create_account'		: Omniture.OnClicks.CheckoutCreateAccount.occurred,
	'out_of_stock_modal'	: Omniture.OnClicks.CheckoutOutOfStockModal.occurred,
	'personal_message'		: Omniture.OnClicks.CheckoutPersonalMessageAdded.occurred,
	'remove_product'		: Omniture.OnClicks.CheckoutRemoveProduct.occurred,
	'error_tracking'		: Omniture.OnClicks.ErrorTracking.occurred,
	'use_same_address'		: Omniture.OnClicks.CheckoutUseSameAsShipping.occurred,
	'start_checkout'		: Omniture.Events.CheckoutStart.occurred,
	'next_checkout_page' 	: Omniture.Events.NextPage.occurred,
	'submit_order_error'	: Omniture.OnClicks.CheckoutSubmitOrderError.occurred
};

// Custom Event handler to track actions in JS
$(document).off('fireOmnitureEvent', '**').on('fireOmnitureEvent', handleEvent);

function handleEvent(e) {
	var omniObj = app.omniture.getOmniObj();
	if(jQuery.isEmptyObject(omniObj)) { return; }
	
	var action = omniObj.action,
		data = omniObj.data;
		customEvents = omniObj.customEvents;
	
	//Action formatted to array in app.js
	for(var i = 0; i < action.length; i++) {
		var omni = eventMap[action[i]];
		
		if(!omni) { continue; }
		
		omni(data, customEvents);
	}
	
	app.omniture.clearOmniObj();
}

//Generate Product String
function getProductString(items){
    var products = "";
    var length = items.length;
    if(length){
    	products = ";";
    	for(var i = 0; i < length; i++){
    		var pid = items[i].product_id;
    		
    		if(typeof pid === 'string') { products += pid; }
    		else { products += pid(); }
    		
    		if(i < length - 1){
    			products += ",;";
    		}
    	}
    }
    
    return products;
}

/****************************************\
  * 								   *
  *   Legacy Omniture Checkout Events  *
  * 								   *
\****************************************/

Omniture.OnClicks.BasketChangeStoreZipClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Change_Zip_Code,Shipping_Pickup';
	    s.prop8  = 'Checkout,Change_Zip_Code,Shipping_Pickup';

	    Omniture.OnClicks.saveClick(this,'o','Change_Zip_Code');

	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CreateAccountCreatedClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Account_Created,Receipt';
	    s.prop8  = 'Checkout,Account_Created,Receipt';
	    s.events ="event13";

        Omniture.Events.save();	  
	   // Omniture.OnClicks.saveClick(this,'o','Account_Created');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutEditShippingClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Edit_Shipping_Info,Billing_Guest';
	    s.prop8  = 'Checkout,Edit_Shipping_Info,Billing_Guest';

	    Omniture.OnClicks.saveClick(this,'o','Edit_Shipping_Info');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutRegisteredAddNewAddrClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Ship_To_New_Address,Shipping_Registered';
	    s.prop8  = 'Checkout,Ship_To_New_Address,Shipping_Registered';

		Omniture.Events.save();
	   // Omniture.OnClicks.saveClick(this,'o','Ship_To_New_Address');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutRegisteredSelectDiffAddrClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Select_Different_Address,Shipping_Registered';
	    s.prop8  = 'Checkout,Select_Different_Address,Shipping_Registered';

		Omniture.Events.save();
	  //  Omniture.OnClicks.saveClick(this,'o','Select_Different_Address');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutShipToMultipleAddrClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Ship_To_Multiple_Addresses,Shipping_Registered';
	    s.prop8  = 'Checkout,Ship_To_Multiple_Addresses,Shipping_Registered';

		Omniture.Events.save();
	//    Omniture.OnClicks.saveClick(this,'o','Ship_To_Multiple_Addresses');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutManageEmailPrefsClicked = ( function() {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Manage_Email_Preferences,Confirm_Registered';
	    s.prop8  = 'Checkout,Manage_Email_Preferences,Confirm_Registered';

		Omniture.Events.save();
	   // Omniture.OnClicks.saveClick(this,'o','Manage_Email_Preferences');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutPier1LogoClicked = ( function() {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Pier1_Logo_Link,Universal';
	    s.prop8  = 'Checkout,Pier1_Logo_Link,Universal';

		Omniture.Events.save();
	   // Omniture.OnClicks.saveClick(this,'o','Pier1_Logo_Link');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutAddStoreMsgClicked = ( function() {

	function occurred(){
		s.linkTrackVars='eVar15,prop8';

		if(blnIsRegistered == "true") {
			s.eVar15 = 'Checkout,Store_Message_Added,Billing_Registered';
			s.prop8  = 'Checkout,Store_Message_Added,Billing_Registered';
		} else {
			s.eVar15 = 'Checkout,Store_Message_Added,Billing_Guest';
			s.prop8  = 'Checkout,Store_Message_Added,Billing_Guest';
		}

		 Omniture.Events.save();	
	   // Omniture.OnClicks.saveClick(this,'o','Store_Message_Added');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutPlaceOrderClicked = ( function () {

	function occurred(val1, val2) {
		if( (val1 && val2) && (val1 == val2) ) {
			s.linkTrackVars='eVar15,prop8';
			s.eVar15 = 'Checkout,Account_Created,Confirm';
			s.prop8  = 'Checkout,Account_Created,Confirm';

		    Omniture.OnClicks.saveClick(this,'o','Account_Created');
		}
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutPrintOrderClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Print_Your_Order,Receipt_Guest';
	    s.prop8  = 'Checkout,Print_Your_Order,Receipt_Guest';

	    Omniture.OnClicks.saveClick(this,'o','Print_Your_Order');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutGuestAccountCreatedClicked = ( function() {

	function occurred(){
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Account_Created,Receipt';
	    s.prop8  = 'Checkout,Account_Created,Receipt';

	    s.events ="event13";
        Omniture.Events.save();	  
	    //Omniture.OnClicks.saveClick(this,'o','Account_Created');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutPromoCodeEntryClicked = ( function () {

	function occurred() {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Promo_Code_Select,Shipping_Pickup';
	    s.prop8  = 'Checkout,Promo_Code_Select,Shipping_Pickup';

	    s.events="";

	    Omniture.Events.save(); 

	   // Omniture.OnClicks.saveClick(this,'o','Promo_Code_Select');

	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutPromoCodeEntryBlurred = ( function () {

	function occurred(val) {
		s.linkTrackVars='eVar15,prop8';
	    s.eVar15 = 'Checkout,Promo_Code_Value_' + val + ',Shipping_Pickup';
	    s.prop8  = 'Checkout,Promo_Code_Value_' + val + ',Shipping_Pickup';

	    s.events = 'event24';    //Updated as part of Omniture changes

		Omniture.Events.save();  //Updated as part of Omniture changes
	   //  Omniture.OnClicks.saveClick(this,'o','Promo_Code_Value');
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutGuestSaveShippingAddressClicked = ( function () {
	function occurred(val) {
		s.linkTrackVars = "eVar15,prop8";
		s.eVar15 = "Checkout,Save_Shipping_Address_" + val + ",Shipping_Guest";
		s.prop8 = "Checkout,Save_Shipping_Address_" + val + ",Shipping_Guest";

		if(val == "true") {
			s.events = "event22";
		}

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutContinueShippingClicked = ( function() {
    function occurred(){
		s.linkTrackVars='prop17,pageName,events';
		s.pageName='checkout : Billing';
        s.events="event9";
        prop17="checkout : Billing";

        Omniture.Events.save();
    }

    return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutSaveBillingAddressClicked = ( function () {
	function occurred(val) {
		s.linkTrackVars = "eVar15,prop8";
		s.eVar15 = "Checkout,Save_Shipping_Address_" + val;
		s.prop8 = "Checkout,Save_Shipping_Address_" + val;

		if(val == "true") {
			s.events = "event23";
		}

		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.CardSelectClicked = ( function () {
	function occurred(val) {
		s.eVar15 = "Product_Page,Individual_SKU_Add_To_Basket_" + val + "," + setOrInd + "Page";
		s.prop8 = "Product_Page,Individual_SKU_Add_To_Basket_" + val + "," + setOrInd + "Page";

		if(val == "PIER1_REWARDS") {
			s.linkTrackEvents="event25";
			s.events="event25";
		} else if(val == "CREDIT_CARD") {
			s.linkTrackEvents="event26";
			s.events="event26";
		}

		Omniture.Events.save();
	}
	
	return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutRemoveProductClicked = ( function () {
    function occurred(){
        s.linkTrackVars='eVar15,prop8';

        if(blnIsRegistered == "true"){
            s.eVar15 = "Checkout,Remove_Item,Shipping_Registered";
            s.prop8  = "Checkout,Remove_Item,Shipping_Registered";

        }else{
            s.eVar15 = "Checkout,Remove_Item,Shipping_Guest";
            s.prop8  = "Checkout,Remove_Item,Shipping_Guest";
        }

         s.events='scRemove';
         
         Omniture.Events.save();
    }

    return { occurred: occurred };
}());

Omniture.OnClicks.CheckoutAddPersonalMsgClicked = ( function () {
    function occurred() {
        s.linkTrackVars='eVar15,prop8';
        s.eVar15 = "Checkout,Personal_Message_Added,Billing_Guest";
        s.prop8  = "Checkout,Personal_Message_Added,Billing_Guest";

        s.events ="event21";
        Omniture.Events.save();
    }

    return { occurred: occurred };
}());


/***********************************************
 *	Unused Omniture Events 
 * 

 Omniture.Events.PDPAddToCartClicked = ( function() {

	function occurred(){
		s.events = 'scAdd';  

		Omniture.Events.save();
	}

	return { occurred: occurred };
}());


Omniture.Events.LoginFromCheckout = ( function () {
	function occurred(data) {
		console.log('loggin');
	}
	
	return { occurred: occurred };
});

 **********************************************/


/* commented old unused code for crossselling page

Omniture.Events.PDPCrossSellingPageClicked = ( function() {

	function occurred(object){

		s.events = 'event18';

		s.eVar7 = object.attr("href");

		s.eVar8 = object.attr("title");

		//s.eVar15 = object.attr("title");

		Omniture.Events.save();

	}

	return {

		occurred: occurred

	}

}());

*/

/* code comment for social interaction

Omniture.Events.PDPFacebookLikeClicked = ( function() {

	function occurred(){

		s.events = 'event30';  

		Omniture.Events.save();

	}

	return {

		occurred: occurred

	}

}());



Omniture.Events.PDPTwitterClicked = ( function() {

	function occurred(){

		s.events = 'event30';  

		Omniture.Events.save();

	}

	return {

		occurred: occurred

	}

}());



Omniture.Events.PDPPinterestClicked = ( function() {

	function occurred(){

		s.events = 'event30';  

		Omniture.Events.save();

	}

	return {

		occurred: occurred

	}

}());



Omniture.Events.PDPGooglePlusClicked = ( function() {

	function occurred(){

		s.events = 'event30';  

		Omniture.Events.save();

	}

	return {

		occurred: occurred

	}

}());



code comment ends for social interaction*/

/**/

//Checkout tags

Omniture.OnClicks.BasketSummaryQuestionClicked = ( function() {

	function occurred(){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Question_Shipping_Handling,Universal';

	    s.prop8  = 'Checkout,Question_Shipping_Handling,Universal';

	    Omniture.Events.save();

		//Omniture.OnClicks.saveClick(this,'o','How_Many_Toggle');

	}

	return {

		occurred: occurred

	}

}());


//omniture events for checkout nextpage

Omniture.OnClicks.BasketCheckoutClicked = ( function() {

	function occurred(){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Checkout_Button_Below_Products,Basket';

	    s.prop8  = 'Checkout,Checkout_Button_Below_Products,Basket';

	    s.events='scCheckout';

	    Omniture.Events.save();

	//	Omniture.OnClicks.saveClick(this,'o','Checkout_Button_Below_Products');

	}

	return {

		occurred: occurred

	}

}());



Omniture.OnClicks.BasketShipRadioClicked = ( function() {

	function occurred(val){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Switch_Method_' + val + ',Basket';

	    s.prop8  = 'Checkout,Switch_Method_' + val + ',Basket';



	    Omniture.OnClicks.saveClick(this,'o','Switch_Method');

	}

	return {

		occurred: occurred

	}

}());



Omniture.OnClicks.BasketRemoveProductClicked = ( function() {

	function occurred(){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Remove_Item,Basket';

	    s.prop8  = 'Checkout,Remove_Item,Basket';

	    s.events='scRemove';       // Updated for Omniture changes 

	    Omniture.Events.save();    // Updated for Omniture changes 

	   // Omniture.OnClicks.saveClick(this,'o','Remove_Item');

	}

	return {

		occurred: occurred

	}

}());



Omniture.OnClicks.BasketSummaryChangeZipClicked = ( function() {

	function occurred(){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Change_Zip_Code,Basket';

	    s.prop8  = 'Checkout,Change_Zip_Code,Basket';



	    Omniture.OnClicks.saveClick(this,'o','Change_Zip_Code');

	}

	return {

		occurred: occurred

	}

}());



Omniture.OnClicks.CheckoutLoginForgotPasswordClicked = ( function() {

	function occurred(){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Forgot_Password,Checkout_Login';

	    s.prop8  = 'Checkout,Forgot_Password,Checkout_Login';



	    Omniture.OnClicks.saveClick(this,'o','Forgot_Password');

	}

	return {

		occurred: occurred

	}

}());



Omniture.OnClicks.CheckoutLoginCheckoutClicked = ( function() {

	function occurred(){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Registered_Login,Checkout_Login';

	    s.prop8  = 'Checkout,Registered_Login,Checkout_Login';

          //signin & checkout

		s.events ="event7";           // Updated for Omniture changes 

        Omniture.Events.save();       // Updated for Omniture changes  

	   // Omniture.OnClicks.saveClick(this,'o','Registered_Login');

	}

	return {

		occurred: occurred

	}

}());



Omniture.OnClicks.CheckoutGuestCheckoutClicked = ( function() {

	function occurred(){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Guest_Login,Checkout_Login';

	    s.prop8  = 'Checkout,Guest_Login,Checkout_Login';

	    s.events ="";    

	    Omniture.Events.save();   

	   // Omniture.OnClicks.saveClick(this,'o','Guest_Login');

	}

	return {

		occurred: occurred

	}

}());



Omniture.OnClicks.CheckoutGuestShipToMultipleClicked = ( function() {

	function occurred(){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Ship_To_Multiple_Addresses,Shipping_Guest';

	    s.prop8  = 'Checkout,Ship_To_Multiple_Addresses,Shipping_Guest';

	    Omniture.Events.save();   

	   // Omniture.OnClicks.saveClick(this,'o','Ship_To_Multiple_Addresses');

	}

	return {

		occurred: occurred

	}

}());





Omniture.OnClicks.CheckoutGuestPersonalMessageCheckboxClicked = ( function() {

	function occurred(val){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Personal_Message_' + val + ',Shipping_Guest';

	    s.prop8  = 'Checkout,Personal_Message_' + val + ',Shipping_Guest';

	  // Updated for Omniture changes   

      if(val=="true")

	    {	s.events ="event21";

	      

	    }

        Omniture.Events.save();

	    //Omniture.OnClicks.saveClick(this,'o','Personal_Message');

	}

	return {

		occurred: occurred

	}

}());



/*

Omniture.OnClicks.CheckoutGuestShippingOptionChanged = ( function() {

	function occurred(val){

		s.linkTrackVars='eVar15,prop8';

	    s.eVar15 = 'Checkout,Shipping_Options_' + val + ',Shipping_Guest';

	    s.prop8  = 'Checkout,Shipping_Options_' + val + ',Shipping_Guest';



	    Omniture.OnClicks.saveClick(this,'o','Shipping_Options');

	}

	return {

		occurred: occurred

	}

}());

*/