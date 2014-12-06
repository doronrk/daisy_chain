var HBCAnalytics = {
	EventTypes : {
		AddToCart		: "add_to_cart",
		RemoveFromCart	: "remove_from_cart",
		Refine			: "refine_results",
		LoginStart		: "login_start",
		LoginComplete	: "login_complete",
		LocatorResults	: "locator_results",
		PayPalCheckout	: "paypal_checkout"
	},
	
	triggerEvent : function(type, options) {
		if (HBCAnalytics.initialized){
			if ('undefined' === typeof options) {
				options = {};
			}
			
			var eventData = {}
			
			//Option to provide eventData JSON
			//eventData:{/* event data here */}
			if (options.hasOwnProperty("eventData")){
				eventData = options.eventData;
			}
			
			//Option to provide eventData JSON
			//eventData:{/* event data here */}
			// if (options.hasOwnProperty("htmlResponse")){
			//	var responseData = doGetEventDataFromHTML(options.htmlResponse);
			//	if (responseData != null){
			//		$.extend(eventData,responseData,eventData);
			// 	}
			// }
			
			//Enforce event type to be that provided to this method
			eventData.events = type;
			
			//Option to get product data from pageData
			//getProducts:[id1, id2...]
			if (options.hasOwnProperty("getProducts")){
				HBCAnalytics.doGetProductData(eventData,options.getProducts);
			}
			
			//Trigger the event
			$(window).trigger(type, eventData);
		} else {
			//Analytics not initialized on this page
			return false;
		}
	},
	
//	doGetEventDataFromHTML : function(html){
//	},
	
	doGetEventDataFromJSON : function(json){
		var eventData = {};
		if (json.hasOwnProperty('eventData')){	
			var eventData = json.eventData;
		}
		return eventData;
	},
	
	doGetProductData : function(eventData,itemsToGet){
		//get product info from pageData
		var productsData = [];
		if (HBCAnalytics.pageData.hasOwnProperty("products")){
			productsData = HBCAnalytics.pageData.products;
			productsData.child_sku = itemsToGet;
			eventData.products = productsData;
		}
	},
	
	getInputAsArray	: function (input){
		var inputArray = [];
		if(typeof input != 'undefined'){
			if($.isArray(input)){
				inputArray = input;
			} else {
				inputArray.push(input);
			}
		}
		return inputArray;
	},
	
	initialize : function() {
		HBCAnalytics.initialized = true;
		HBCAnalytics.pageData = pageData;
	},
	
	pageData : {},
	
	initialized : false
}

$(document).ready( function() {
	if (typeof pageData != 'undefined') {
		HBCAnalytics.initialize();
	}
});