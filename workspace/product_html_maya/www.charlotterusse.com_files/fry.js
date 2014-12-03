/*!
 *
 * Created Date: July 20, 2011 15:23:40 PM
 * Copyright © 2011 Fry Inc, All Rights Reserved
 */

/**
 * Google Analytics for all jsp pages
 *
 */



var googleAnalytics = {
		
		addTracking : function(t) {  
					
			$('[data-ga-trackevent-uievt]').each(function () {
		        var uiEventType = $(this).attr('data-ga-trackevent-uievt');
		        var category = $(this).attr('ga-category');
		        var action = $(this).attr('ga-action');
		        var label = $(this).attr('ga-label');
		        var value = $(this).attr('ga-value');
		        var methodName = $(this).attr('ga-value-depends');
		        
		        if((typeof category== "undefined" &&  category == "") && (typeof action=== "undefined" &&  action == "")) {
		        	return;
		        }
		        if(uiEventType == "no-event") {
		        	t._trackEvent(category, action, label);		        	
		        }
		        
		        if(uiEventType == "no-event-with-value") {
		        	var intVal = parseInt(value);
		        	t._trackEvent(category, action, label, intVal);		        	
		        }
		        
		        var userAgent = navigator.userAgent.toLowerCase();
		       
		        $(this).bind(uiEventType, function(e) {	
		        		if(typeof label!== "undefined" &&  methodName != "") {
				        	value = eval(methodName);	
				        	if(value == -1) {
				        		 return;
				        	}
				        }
			        	//check if label and values are passed in and they are not empty
		        		if(typeof label!== "undefined" && label!="") {
		        			if(typeof value!== "undefined" && value!="" ){
		        				t._trackEvent(category, action, label , value);
		        				
		        			} else {
		        				t._trackEvent(category, action, label);
		        			}        				
		        		}
			        	else {
			        		t._trackEvent(category, action);
			        	}
		        });
			});	
			
			// Tracking the placed order transaction 
			$('[track-placed-order]').each(function () {
				// Order level data
				var orderId = $(this).attr('ga-order-id');
				var orderTotal = $(this).attr('ga-order-total');
				var orderTax = $(this).attr('ga-order-tax');
				var orderShipping = $(this).attr('ga-order-shipping');
				var orderCity = $(this).attr('ga-order-city');
				var orderState = $(this).attr('ga-order-state');
					
				try{	
					t._addTrans(
							orderId,           			// order ID - required
							document.domain,  			// affiliation or store name
						    orderTotal,					// total - required
						    orderTax,           		// tax
						    orderShipping,              // shipping
						    orderCity,       			// city
						    orderState,     			// state or province
						    'USA'             			// country
						);
					
					$('[track-placed-order-items]').each(function () {
						// Item level data 
						var itemSku = $(this).attr('ga-item-sku');
						var itemName = $(this).attr('ga-item-name');
						var itemVariantName = $(this).attr('ga-item-variant-name');
						var itemPrice = $(this).attr('ga-item-price');
						var itemQuantity = $(this).attr('ga-item-quantity');
						
						t._addItem(
								orderId,    		// order ID - necessary to associate item with transaction
								itemSku,           	// SKU/code - required
								itemName,        	// product name
								itemVariantName,   	// category or variation
								itemPrice,          // unit price - required
								itemQuantity        // quantity - required
							);
					});
					
					t._trackTrans(); //submits transaction to the Analytics servers
				}catch (err){
					
				}
			});
		}
}
			