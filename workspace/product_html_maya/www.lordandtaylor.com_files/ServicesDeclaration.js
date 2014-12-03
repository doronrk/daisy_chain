//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2011 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This class contains declarations of AJAX services used by the Madisons store pages.
 */

dojo.require("wc.service.common");

/**
 * @class This class stores common parameters needed to make the service call.
 */
ServicesDeclarationJS = {
	langId: "-1", /* language of the  store */
	storeId: "", /*numeric unique identifier of the store */
	catalogId: "", /*catalog of the store that is currently in use */

	/**
	 * Sets common parameters used by the services
	 * @param (int) langId The language of the store.
	 * @param (int) storeId The store currently in use.
	 * @param (int) catalogId The catalog of the store currently in use.
	 */
	setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
	}
}
/* International shipping UC-7 changes begin*/
/***********
 * Ajax call for bringing list of countries and populate in country selector dropdown menu. 
 **/
wc.service.declare({
    id: "AjaxIntlCountryChooser",
    actionId: "AjaxIntlCountryChooser",
    url: getAbsoluteURL() + "CountrySelectorCmd",
    formId: ""
    
    /** 
     * Success handler, goes to different pages in wizard depends the checkout flow.  See AjaxCheckout.jsp for more details.
    */
    ,successHandler: function(serviceResponse) {
    
          //dojo.query("body").innerHTML = serviceResponse;
          var html = "";
          var currHtml = "";
          var countryCurrBeanlist = serviceResponse.countryCurrencyBeanList;
          var country = new Object();
          var currencyRoundingMethod = new Object();
          var originalCurrList = [];
          var uniqueCurrList = [];
          var singleCountryName = "";
          var singleCountryCode = "";
          var option = "";
          var singleCurrencyName = "";
          var singleCurrencyCode = "";
          var optionCurr = "";
          
          dojo.query("#grant_type_id").text(html);
          var defaultVal = "Select a Country/Region"; 
          var option1 = "<option value=\'" + "" + "\' >" + defaultVal
          + "</option>";
          dojo.query("#grant_type_id").append(option1);
          

          dojo.query("#defaultCurrencyCode_id").text(html);
          var defaultCurrVal = "Select a Currency"; 
          var optionCurr1 = "<option value=\'" + "" + "\' >" + defaultCurrVal + "</option>";
          dojo.query("#defaultCurrencyCode_id").append(optionCurr1);
          
          for(var i=0; i<countryCurrBeanlist.length; i++){
                singleCountryName = countryCurrBeanlist[i].singleCountryName;
                singleCountryCode = countryCurrBeanlist[i].singleCountryCode;

                option = "<option value=\'" + singleCountryCode + "\' >" + singleCountryName + "</option>";
                html += option;
                country[countryCurrBeanlist[i].singleCountryCode] = new Array (countryCurrBeanlist[i].singleCurrencyName +'|'+ countryCurrBeanlist[i].singleDeffCurrency+'|'+countryCurrBeanlist[i].singleRoundMethod );
               
                originalCurrList.push(countryCurrBeanlist[i].singleDeffCurrency+"|"+countryCurrBeanlist[i].singleCurrencyName);
                
                $.each(originalCurrList, function(i, el){
                    if($.inArray(el, uniqueCurrList) === -1) { // To remove duplicates from currency list
                    	uniqueCurrList.push(el);
                    	currencyRoundingMethod[countryCurrBeanlist[i].singleDeffCurrency]=new Array (countryCurrBeanlist[i].singleCurrencyName +'|'+countryCurrBeanlist[i].singleRoundMethod );
                        singleCurrencyName = countryCurrBeanlist[i].singleCurrencyName;
                        singleCurrencyCode = countryCurrBeanlist[i].singleDeffCurrency;
                        optionCurr = "<option value=\'" + singleCurrencyCode + "\' >" + singleCurrencyName +"("+singleCurrencyCode+")" + "</option>";
                        currHtml += optionCurr;
                    }
                });
          }
          dojo.query("#grant_type_id").append(html);
          dojo.query("#defaultCurrencyCode_id").append(currHtml);
          dojo.query("#lt-country-popup").style("display", "block");
          UtilitiesJS.fnSetCountry(country);
          UtilitiesJS.fnSetRounding(currencyRoundingMethod);
          var defCookieVal=decodeURI(dojo.cookie("INTL"));
          var defCountry=defCookieVal.split("|")[1];
	  var defCurrency=defCookieVal.split("|")[2];
	  $("#grant_type_id").val(defCountry);
    	  $("#defaultCurrencyCode_id").val(defCurrency); 
        
    }
}),
wc.service.declare({
	id: "HBCAjaxUpdateXordersCmd",
	actionId: "HBCAjaxUpdateXordersCmd",
	url: getAbsoluteURL() + "HBCAjaxUpdateXordersCmd",
	formId: "",
	successHandler: function(serviceResponse) {
	UtilitiesJS.orderCalculateOnChangeCountry();
	console.log("HBCAjaxUpdateXordersCmd sucess");
	} 
	,failureHandler: function(serviceResponse) {
		UtilitiesJS.orderCalculateOnChangeCountry();	
		console.log("HBCAjaxUpdateXordersCmd failure");
	}

}),
wc.service.declare({
	id: "HBCAjaxUpdateXordersCmdCheckout",
	actionId: "HBCAjaxUpdateXordersCmdCheckout",
	url: getAbsoluteURL() + "HBCAjaxUpdateXordersCmd",
	formId: "",
	successHandler: function(serviceResponse) {
		var params = [];
		params.orderId='.';
		params.storeId='10151';
		params.catalogId='10102';
		params.langId='-1';	
		wc.service.invoke("AjaxOnCheckoutIntlOrderCalculate", params);	
		console.log("HBCAjaxUpdateXordersCmd sucess");
	} 
	,failureHandler: function(serviceResponse) {
		//UtilitiesJS.orderCalculateOnChangeCountry();
		$("#ajaxFailureMsg").show();
		console.log("HBCAjaxUpdateXordersCmd failure");
	}

}),
wc.service.declare({
	id: "AjaxOnCheckoutIntlOrderCalculate",
	actionId: "AjaxOnCheckoutIntlOrderCalculate",
	url: getAbsoluteURL() + "AjaxOrderCalculate",
	formId: "",
	successHandler: function(serviceResponse) {
	//Shop runner log out for international user.
	var intlCookieForSr=dojo.cookie("INTL");
	var ipAddress =$("#ipAddressAkamai").val();
	var jSessionId = UtilitiesJS.getCookie("JSESSIONID");
	console.log("AjaxOnCheckoutIntlOrderCalculate success");
	var internationalBillingShippingPageURL="PrepareForInternationalShippingCmd?storeId=10151&catalogId=10102&langId=-1&buyerIp="+ipAddress+"&JSESSIONID="+jSessionId;//&orderId="+${order.orderIdentifier.uniqueID};
	document.location.href  = internationalBillingShippingPageURL;	
	} 
	,failureHandler: function(serviceResponse) {
		var intlCookieForSr=dojo.cookie("INTL");
		$("#ajaxFailureMsg").show();
		console.log("AjaxOnCheckoutIntlOrderCalculate failure");
	}

}),	

wc.service.declare({
	id: "AjaxChangeCountryOrderCalculate",
	actionId: "AjaxChangeCountryOrderCalculate",
	url: getAbsoluteURL() + "AjaxOrderCalculate",
	formId: "",
	successHandler: function(serviceResponse) {
	//Shop runner log out for international user.
	var intlCookieForSr=dojo.cookie("INTL");
		document.location.href = "/webapp/wcs/stores/servlet/en/lord-and-taylor";
	}
 
	,failureHandler: function(serviceResponse) {
		var intlCookieForSr=dojo.cookie("INTL");
		document.location.href = "/webapp/wcs/stores/servlet/en/lord-and-taylor";
	}

}),
wc.service.declare({
	id: "AjaxSelectDefualtCountry",
	actionId: "AjaxSelectDefualtCountry",
	url: getAbsoluteURL() + "AjaxOrderChangeServiceItemUpdate",
	formId: ""
 
	,successHandler: function(serviceResponse) {
		document.location.href = "/webapp/wcs/stores/servlet/en/lord-and-taylor";
	}
 
	,failureHandler: function(serviceResponse) {
		document.location.href = "/webapp/wcs/stores/servlet/en/lord-and-taylor";
	}

}),
/*International shipping UC-7 changes end*/

	/**
	* Adds an item to to the wishlist and remove the same item from the shopping
	* cart.
	* @constructor
	 */
	wc.service.declare({
		id: "AjaxInterestItemAddAndDeleteFromCart",
		actionId: "AjaxInterestItemAddAndDeleteFromCart",
		url: getAbsoluteURL() + "AjaxInterestItemAdd",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//Now delete from cart..
			MessageHelper.hideAndClearMessage();
			requestSubmitted = false;
			CheckoutHelperJS.deleteFromCart(serviceResponse.orderItemId,true);
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDED"]);
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * Add an item to a shopping cart in Ajax mode. A message is displayed after
	 * the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxAddOrderItem",
		actionId: "AjaxAddOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemAdd",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_ADDED"]);
			cursor_clear();
			if(categoryDisplayJS){
				
				var attributes = document.getElementsByName("attrValue");
			
				var singleSKU = true;
				
				for(var i=0; i<attributes.length; i++){
					if (attributes[i].options.length > 1)
					{
						singleSKU = false;
					}
				}
				
				if (!singleSKU)
				{
					categoryDisplayJS.selectedAttributes = [];
					for(var i=0; i<attributes.length; i++){
						if(attributes[i] != null){
							attributes[i].value = "";
						}
					}
				}
			}
			if(typeof(ShipmodeSelectionExtJS)!= null && typeof(ShipmodeSelectionExtJS)!='undefined'){
				ShipmodeSelectionExtJS.setOrderItemId(serviceResponse.orderItemId[0]);
			}
			if (parent != null && typeof(parent) != 'undefined' && parent.qvDialog != null && typeof(parent.qvDialog) != 'undefined')
			{
				parent.dojo.disconnect(parent.qvScroll);
				var widget = parent.dijit.byId("ShopCartDisplay");
				
				var context = wc.render.getContextById("ShopCartPaginationDisplay_Context");
				var controller = wc.render.getRefreshControllerById("ShopCartDisplayController");
				
				parent.dojo.disconnect(parent.qvScroll);
				parent.qvDialog.destroyRecursive();
				
				
			}
		/*International shipping UC-7 changes begin*/
			//HBCLocalizationUtilJS.fnTranlateProduct();
		/* International shipping UC-7 changes end*/
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
			 	if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
			 		MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
 				} else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE"]);
				} else if (serviceResponse.errorMessageKey == "INVALID_PARAMETER_VALUE_ZERO_QUANTITY") {
					MessageHelper.displayErrorMessage(MessageHelper.messages["ERR_PRODUCT_OUT_OF_STOCK"]);
 				} else {
 					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
 				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

   /**
   * Add an item to a shopping cart in non-Ajax mode. Upon a successful request,
   * the shopping cart page is loaded. An error message is displayed otherwise.
   * @constructor
   */
	wc.service.declare({
		id: "AjaxAddOrderItem_shopCart",
		actionId: "AjaxAddOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemAdd",
		formId: ""

     /**
     * redirects to the shopping cart page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//Now delete from cart..
			document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
			 	if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
			 		MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
			 	} else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE"]);
 				} else {				
 					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
 				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * Remove an item from shopping cart. A message is displayed after the service
	 * call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteOrderItem",
		actionId: "AjaxDeleteOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemDelete",
		formId: ""
			
		,validateParameters: function(params){
			//called before the service is invoked, use this to trigger the data tracking event
			if (typeof HBCAnalytics != "undefined"){
				var triggerOptions = {"getProducts":HBCAnalytics.getInputAsArray(params.orderItemId)};
				HBCAnalytics.triggerEvent(HBCAnalytics.EventTypes.RemoveFromCart, triggerOptions);
			}
			return true;
		}
    /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			var d = new Date();
			document.cookie = "newsr_ineligible=;expires=" + d.toGMTString() + ";" + ";";
			MessageHelper.hideAndClearMessage();
			if(!sr_token){
				MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);
			}else{
				CheckoutHelperJS.showRemoveMsg = "true";
			}
			 if(UtilitiesJS.isIntlFlowRequired()){
				 HBCLocalizationUtilJS.fnInitialize();
			 }
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	
	/**
	 * Removes an item from shopping cart on the shipping & billing page. A message is displayed after the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteOrderItemForShippingBillingPage",
		actionId: "AjaxDeleteOrderItemForShippingBillingPage",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemDelete",
		formId: ""
		
		,validateParameters: function(params){
			//called before the service is invoked, use this to trigger the data tracking event
			if (typeof HBCAnalytics != "undefined"){
				var triggerOptions = {"getProducts":HBCAnalytics.getInputAsArray(params.orderItemId)};
				HBCAnalytics.triggerEvent(HBCAnalytics.EventTypes.RemoveFromCart, triggerOptions);
			}
			return true;
		}
		/**
		 * display a success message
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);
			
			
			var params = [];					
			params.giftboxOptType= "-111";						
			params.orderId = serviceResponse.orderId;
//			params.addressId = dojo.byId("addressIdGiftBox").value;
			console.debug("just thought of updating giftbox section GBx giftboxOptType = "+params.giftboxOptType);
			cursor_wait();
			wc.service.invoke("AjaxGiftboxSelect",params);

			
		}
		
		/**
		 * display an error message
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	

	/**
	 * Remove an item from shopping cart. A message is only displayed if the service
	 * call returns an error Message. It is used to remove an item from the shopping
	 * cart and add the same item to the wish list.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteOrderItemFromCart",
		actionId: "AjaxDeleteOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemDelete",
		formId: ""
		
		,validateParameters: function(params){
			//called before the service is invoked, use this to trigger the data tracking event
			if (typeof HBCAnalytics != "undefined"){
				var triggerOptions = {"getProducts":HBCAnalytics.getInputAsArray(params.orderItemId)};
				HBCAnalytics.triggerEvent(HBCAnalytics.EventTypes.RemoveFromCart, triggerOptions);
			}
			return true;
		}
			
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * Remove an item from shopping cart. 
	 * Upon a successful request, this function will load the AjaxOrderItemDisplayView page or the OrderShippingBillingView page depending on what page the service was invoked from. 
	 * An error message will be displayed otherwise.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteOrderItem1",
		actionId: "AjaxDeleteOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemDelete",
		formId: ""

		,validateParameters: function(params){
			//called before the service is invoked, use this to trigger the data tracking event
			if (typeof HBCAnalytics != "undefined"){
				var triggerOptions = {"getProducts":HBCAnalytics.getInputAsArray(params.orderItemId)};
				HBCAnalytics.triggerEvent(HBCAnalytics.EventTypes.RemoveFromCart, triggerOptions);
			}
			return true;
		}
    /**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
		
			if (!CheckoutHelperJS.pendingOrderDetailsPage)
			{
				MessageHelper.hideAndClearMessage();
				MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);
				UtilitiesJS.setCookie("HBC_QUANT", "0");
				document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
			}
			else
			{
				cursor_clear();
			}
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),


	/**
	 * This service updates an order item in the shopping cart.
	 * A message is displayed after the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderItem",
		actionId: "AjaxUpdateOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemUpdate",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE_QTY_UPDATE"]);
				}
				else{
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * This service updates an order item for international flow.
	 * A message is displayed after the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderItemIntl",
		actionId: "AjaxUpdateOrderItemIntl",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemUpdate",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//MessageHelper.hideAndClearMessage();
			// Calling XORDERS update
			UtilitiesJS.updateXorderAndRefresh();
			cursor_clear();
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {			
					console.log("AjaxPersonProcessServicePersonRegister fail:"+ serviceResponse.errorMessage);				
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					console.log("AjaxPersonProcessServicePersonRegister fail:"+ serviceResponse.errorMessageKey);
				 }
			}
			// Calling XORDERS update
			UtilitiesJS.updateXorderAndRefresh();
			cursor_clear();
			console.log("AjaxUpdateOrderItemIntl failed");
			//alert('AjaxUpdateOrderItemIntl failed');
		}

	}),

	/**
	 * Updates an order item in the shopping cart. 
	 * Upon a successful request, this function will load the AjaxOrderItemDisplayView page  
	 * An error message will be displayed otherwise.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderItem1",
		actionId: "AjaxUpdateOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemUpdate",
		formId: ""
	/**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			if (!CheckoutHelperJS.pendingOrderDetailsPage)
			{
				if(CheckoutHelperJS.shoppingCartPage){	
					document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
				}
			}
			else
			{
				cursor_clear();
			}
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE_QTY_UPDATE"]);
				}
				else{
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service updates shipping information (shipping mode, shipping address)
	 * for a shopping cart. A message is displayed after the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderShippingInfo",
		actionId: "AjaxUpdateOrderShippingInfo",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceShipInfoUpdate",
		formId: ""
    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service prepares an order for submission. Upon success, it submits the order.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxPrepareOrderForSubmit",
		actionId: "AjaxPrepareOrderForSubmit",
		url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderPrepare",
		formId: ""

    /**
     * On success, checkout the order by calling order submit.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			var shipmentTypeId = CheckoutHelperJS.getShipmentTypeId();
			document.location.href = "OrderShippingBillingSummaryView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId + "&shipmentTypeId=" + shipmentTypeId;
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessageKey) {
				/*
				 * Added below section to format itemName
				 * display in Out Of Stock scenario of reservation
				 */
				 if (serviceResponse.errorMessageKey == "_API_BAD_INV") {
					var messages = serviceResponse.errorMessageParam[0];
					messages = messages.split('|');
					var finalMsg = '';
					for ( var i = 0; i < messages.length; i++) {
						var items = messages[i];

						if (finalMsg.length == 0) {
							finalMsg = serviceResponse.errorMessage + "<table border = 0 colspan = 3>";
						} else {
							finalMsg = finalMsg + '<tr>';
							var itemNameColor = items.split('::');
							var finalNameColorMsg = '';
							for ( var k = 0; k < itemNameColor.length; k++) {
								var nameColor = itemNameColor[k];
								if (finalNameColorMsg.length == 0) {
									finalNameColorMsg = '<td>' + nameColor + '</td>';
								} else {
									finalNameColorMsg = finalNameColorMsg + '<td>&nbsp;&nbsp;' + nameColor + '</td>';
								}
							}
							finalNameColorMsg = finalNameColorMsg + '</tr>';
							finalMsg = finalMsg + finalNameColorMsg;
						}
					}
					if (finalMsg.length == 0) {
						finalMsg = finalMsg + '</table>';
					}
					updateErrorMsg(finalMsg);
				} else {
					//MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					// start gift registry
					if(HBC.isGRFlowEnabled())
			     	{
					   if(document.getElementById('registrantName')!=null && document.getElementById('registrantId')!=null)
					   {
	                      updateErrorMsg(serviceResponse.errorMessage + '<br /><br />' + MessageHelper.messages["GR_EMPTY_SHOP"]);
	                   }
				    }
				    else
				    {
					 updateErrorMsg(serviceResponse.errorMessage);
			    	}
					// end gift registry
				}
			 } else if (serviceResponse.errorMessageKey) {
				 //MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 updateErrorMsg(serviceResponse.errorMessage);
			 }
			
			if(serviceResponse.errorMessageKey == "INVALID_PARAMETER_VALUEInventoryError") {
				var messages = serviceResponse.errorMessageParam[1];
				messages = messages.split('|');
				var finalMsg = '';
				for(var i = 0; i < messages.length; i++) {
					var itemName = messages[i];
					if(finalMsg.length == 0) {
						finalMsg = itemName + ' ' + MessageHelper.messages["LOW_INVENTORY_ERROR"];
					} else {
						finalMsg = finalMsg + '<br>' + itemName + ' ' + MessageHelper.messages["LOW_INVENTORY_ERROR"];
					}
				}
				
				updateErrorMsg(finalMsg);
			}
			/*if(serviceResponse.errorMessageKey =="_DBG_API_DO_PAYMENT_BAD_CCNUM")
			{
				CheckoutPayments.deleteCCPaymentInstructions();
			}
			else if(serviceResponse.errorMessageKey =="_DBG_API_PAY_NO_CCCHECK_TASK")
			{
				CheckoutPayments.deleteGCPaymentInstructions();
			}
			else
			{
				CheckoutPayments.deleteALLPaymentInstructions();
			}
	        var paymentDropdown = document.getElementById('payMethodId_1');
	        if(paymentDropdown && paymentDropdown.selectedIndex > 0) {
				CheckoutPayments.loadPaymentSnippet(paymentDropdown, 1);
				CheckoutPayments.updatePaymentObject(1, 'payMethodId');
				if(supportPaymentTypePromotions){
					CheckoutPayments.updateUnboundPaymentToOrder(1); 
				}
				paymentDropdown.selectedIndex = 0;
	        }*/
			if (serviceResponse.errorMessageKey == "_HBC_TXT_PAY_ORDER_TOTAL_ERROR" && CheckoutHelperJS.skipAMS) {
		        var params = [];
				params.orderId = CheckoutHelperJS.orderId;
				document.getElementById('CurrentOrderTotal').value=document.getElementById('totalHidden').innerHTML.substring(document.getElementById('totalHidden').innerHTML.indexOf('$') + 1).replace(/,/g, '');
				wc.service.invoke("AjaxTenderType",params);
			}
			cursor_clear();
		}

	}),


	/**
	 * This service submits the order. Upon success, the order billing confirmation
	 * page is shown. A error message is displayed otherwise.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxSubmitOrder",
		actionId: "AjaxSubmitOrder",
		url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderSubmit",
		formId: ""

    /**
     *redirect to the Order Confirmation page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
		
			var shipmentTypeId = CheckoutHelperJS.getShipmentTypeId();
			if (HBC.isGRFlowEnabled())
			{
			   document.location.href = "OrderShippingBillingConfirmationView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId + "&shipmentTypeId=" + shipmentTypeId + "&GR=true";
			}
			else
			{
				document.location.href = "OrderShippingBillingConfirmationView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId + "&shipmentTypeId=" + shipmentTypeId;
			}
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			 if (serviceResponse.errorMessageKey) {
				/*
				 * Infosys (08/11/2013) - Added below section to format itemName
				 * display in OOS scenario of reservation
				 */
				 //alert("ErrorKey -"+serviceResponse.errorMessageKey);
				 if (serviceResponse.errorMessageKey == "_API_BAD_INV") {				
					var messages = serviceResponse.errorMessageParam[0];
					var finalMsg = serviceResponse.errorMessage +'$$'+messages;					
					var orderSummaryForm =document.forms["OrderSummaryForm"];
					orderSummaryForm.errorMessage.value=finalMsg;
					orderSummaryForm.submit();
					
				} else if(serviceResponse.errorMessageKey == "INVALID_PARAMETER_VALUEInventoryError") {
					var messages = serviceResponse.errorMessageParam[1];
					var finalMsg = serviceResponse.errorMessage +'$$'+messages;					
					var orderSummaryForm =document.forms["OrderSummaryForm"];
					orderSummaryForm.errorMessage.value=finalMsg;
					orderSummaryForm.submit();
					
				}else if (serviceResponse.errorMessageKey == "_HBC_TXT_PAY_CREDIT_CARD_ERROR" || serviceResponse.errorMessageKey == "_HBC_TXT_PAY_GIFT_CARD_ERROR") {
					var orderSummaryForm =document.forms["OrderSummaryForm"];
					orderSummaryForm.errorMessage.value=serviceResponse.errorMessage;
					orderSummaryForm.submit();
					
				}else if (serviceResponse.errorMessageKey == "_HBC_TXT_PAY_ORDER_FRAUD") {
					updateOrderSummaryErrorMsg(serviceResponse.errorMessage);
					//Order is Fraud - Disable the PlaceOrder Button	
					var placeOrderEL = document.getElementById("placeOrderButton");
					placeOrderEL.removeAttribute('href');
					placeOrderEL.style.color="gray";
					//placeOrderEL.style.visibility = 'hidden';

				}else {
					//MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					// start gift registry
					if(HBC.isGRFlowEnabled())
			     	{
					   if(document.getElementById('registrantName')!=null && document.getElementById('registrantId')!=null)
					   {
						   updateOrderSummaryErrorMsg(serviceResponse.errorMessage + '<br /><br />' + MessageHelper.messages["GR_EMPTY_SHOP"]);
	                   }
				    }
				    else
				    {
				    	updateOrderSummaryErrorMsg(serviceResponse.errorMessage);
			    	}
					// end gift registry
				}
			 } else {
				 updateOrderSummaryErrorMsg(serviceResponse.errorMessage);
			 }			
			
			cursor_clear();
		}

	}),

	/**
	 * This service submits the quote. Upon success, the quote  confirmation
	 * page is shown. A error message is displayed otherwise.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxSubmitQuote",
		actionId: "AjaxSubmitQuote",
		url: getAbsoluteURL() + "AjaxSubmitQuote",
		formId: ""

   /**
    *redirect to the Quote Confirmation page
    * @param (object) serviceResponse The service response object, which is the
    * JSON object returned by the service invocation
    */
		,successHandler: function(serviceResponse) {
			var redirectURL = "OrderShippingBillingConfirmationView?storeId=" + ServicesDeclarationJS.storeId 
			+ "&catalogId=" + ServicesDeclarationJS.catalogId 
			+ "&langId=" + ServicesDeclarationJS.langId 
			+ "&orderId=" + CheckoutHelperJS.getOrderId() 
			+ "&shipmentTypeId=" + CheckoutHelperJS.getShipmentTypeId()
			+ "&isQuote=true"
			+ "&quoteId=" + serviceResponse.outOrderId// outOrderId is the id of the new quote created.
			
			if(serviceResponse.outExternalQuoteId != undefined && serviceResponse.outExternalQuoteId != null){
				redirectURL += redirectURL + "&externalQuoteId=" + serviceResponse.outExternalQuoteId; 
			}
			document.location.href = redirectURL;
		}

   /**
    * display an error message
    * @param (object) serviceResponse The service response object, which is the
    * JSON object returned by the service invocation
    */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service adds an address for the person. An error message is displayed
	 * if the service failed.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxAddAddressForPerson",
		actionId: "AjaxAddAddressForPerson",
		url: getAbsoluteURL() + "AjaxPersonChangeServiceAddressAdd",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			AddressHelper.updateOrderAfterAddressUpdate();
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service adds an address for the person. An error message is displayed
	 * if the service failed.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateAddressForPerson",
		actionId: "AjaxUpdateAddressForPerson",
		url: getAbsoluteURL() + "AjaxPersonChangeServiceAddressUpdate",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			AddressHelper.updateOrderAfterAddressUpdate();
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service calls AjaxOrderChangeServiceItemUpdate to update order total after shipping address is updated in the order.
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderAfterAddressUpdate",
		actionId: "AjaxUpdateOrderAfterAddressUpdate",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemUpdate",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * This service adds an item to the wishlist. This is different from
	 * AjaxInterestItemAddAndDeleteFromCart in that this function does not remove
	 * the item from the shopping cart. It is used mainly in catalog browsing.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxInterestItemAdd",
		actionId: "AjaxInterestItemAdd",
		url: getAbsoluteURL() + "AjaxInterestItemAdd",
		formId: ""
    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDED"]);
			if(categoryDisplayJS)
			categoryDisplayJS.selectedAttributes = [];
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service adds an item to the wishlist in non-Ajax mode. Upon success,
	 * the shopping cart page is displayed. This is different from
	 * AjaxInterestItemAddAndDeleteFromCart in that this function does not remove
	 * the item from the shopping cart. It is used mainly in catalog browsing.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxInterestItemAdd_shopCart",
		actionId: "AjaxInterestItemAdd",
		url: getAbsoluteURL() + "AjaxInterestItemAdd",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

  /**
   * This service deletes an item from the wish list. An error message will be
   * displayed if the service call failed. 
   */
	wc.service.declare({
		id: "AjaxInterestItemDelete",
		actionId: "AjaxInterestItemDelete",
		url: getAbsoluteURL() + "AjaxInterestItemDelete",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service sends the wish list to a specified email address.
	 */
	wc.service.declare({
		id: "AjaxInterestItemListMessage",
		actionId: "AjaxInterestItemListMessage",
		url: getAbsoluteURL() + "AjaxInterestItemListMessage",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service applies the promotion code to the order(s).
	 */
	wc.service.declare({
		id: "AjaxPromotionCodeManage",
		actionId: "AjaxPromotionCodeManage",
		url: getAbsoluteURL() + "AjaxPromotionCodeManage",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			
			params.orderId = ".";
			params.calculationUsage = "-1";
			
			wc.service.invoke("AjaxUpdateOrderItem",params);
			
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	/**
	 * This service applies the promotion code to the  international order(s).
	 */
	wc.service.declare({
		id: "AjaxPromotionCodeManageIntl",
		actionId: "AjaxPromotionCodeManageIntl",
		url: getAbsoluteURL() + "AjaxPromotionCodeManage",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//MessageHelper.hideAndClearMessage();
			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			
			params.orderId = ".";
			params.calculationUsage = "-1";
			
			wc.service.invoke("AjaxUpdateOrderItemIntl",params);
			
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				alert(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					 console.log(serviceResponse.errorMessageKey);
				 }
			}
			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			
			params.orderId = ".";
			params.calculationUsage = "-1";
			
			wc.service.invoke("AjaxUpdateOrderItemIntl",params);
			cursor_clear();
		}

	}),
  /**
   * This services adds or removes a coupon from the order(s).
   */
	wc.service.declare({
		id: "AjaxCouponsAddRemove",
		actionId: "AjaxCouponsAddRemove",
		url: getAbsoluteURL() + "AjaxCouponsAddRemove",
		formId: ""

    /**
     * Hides all the messages and the progress bar. It will then called the
     * AjaxOrderChangeServiceItemUpdate service
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
      */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			
			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			
			params.orderId = serviceResponse.orderId;
			params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			
			wc.service.invoke("AjaxUpdateOrderItem",params);

		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service adds a billing address to the order(s).
	 */
	wc.service.declare({
		id: "AddBillingAddress",
		actionId: "AddBillingAddress",
		url: getAbsoluteURL() + "AjaxPersonChangeServiceAddressAdd",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
/**
 * This service schedules an order based on the input order date and order interval parameters. 
 */
wc.service.declare({
	id: "ScheduleOrder",
	actionId: "ScheduleOrder",
	url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderSchedule",
	formId: ""

	/**
	 * Hides all the messages and the progress bar.
	 * Constructs a URL that deletes the current order and forward to the order confirmation page.
	 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
	 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		var originalOrderId = document.getElementById("orderIdToSchedule").value;
		var newOrderId = serviceResponse.orderId;
		var shipmentTypeId = CheckoutHelperJS.getShipmentTypeId();
		var purchaseOrderNumber = "";
		if(document.forms["purchaseOrderNumberInfo"].purchase_order_number.value != null){
			purchaseOrderNumber = document.forms["purchaseOrderNumberInfo"].purchase_order_number.value;
		}
		var url = "OrderProcessServiceOrderCancel?orderId=" + originalOrderId + "&storeId="  + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&URL=OrderShippingBillingConfirmationView%3ForderId%3D" + newOrderId + "%26originalOrderId%3D" + originalOrderId + "%26shipmentTypeId%3D" + shipmentTypeId + "%26purchaseOrderNumber%3D" + purchaseOrderNumber;
		document.location.href = url;
	}
	
	/**
	 * Displays an error message if the the service call failed.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation
	 */
	,failureHandler: function(serviceResponse) {
		if (serviceResponse.errorMessage) {
			MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
		} else {
			 if (serviceResponse.errorMessageKey) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			 }
		}
		cursor_clear();
	}
}), 

/**
 * This service schedules an order based on the input order date and order interval parameters. 
 */
wc.service.declare({
	id: "SubmitRecurringOrder",
	actionId: "SubmitRecurringOrder",
	url: getAbsoluteURL() + "AjaxOrderProcessServiceRecurringOrderSubmit",
	formId: ""

	/**
	 * Hides all the messages and the progress bar.
	 * Constructs a URL that deletes the current order and forward to the order confirmation page.
	 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
	 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		var shipmentTypeId = CheckoutHelperJS.getShipmentTypeId();
		var url = "OrderShippingBillingConfirmationView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId + "&shipmentTypeId=" + shipmentTypeId;
		document.location.href = url;
		cursor_clear();
	}
	
	/**
	 * Displays an error message if the the service call failed.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation
	 */
	,failureHandler: function(serviceResponse) {
		if (serviceResponse.errorMessage) {
			MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
		} else {
			 if (serviceResponse.errorMessageKey) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			 }
		}
		cursor_clear();
	}
}), 

/**
 * This service updates the free gift choices made by the shopper for the
 * promotion.
 */
wc.service.declare({
	id: "AjaxUpdateRewardOption",
	actionId: "AjaxUpdateRewardOption",
	url: getAbsoluteURL() + "AjaxOrderChangeServiceRewardOptionUpdate",
	formId: ""

/**
 * Hides all the messages and the progress bar.
 * @param (object) serviceResponse The service response object, which is the
 * JSON object returned by the service invocation
 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		cursor_clear();
		shoppingActionsJS.quickViewAddToCart(true);
		
		// AndyK - Defect 2611 PWP fix - refresh mini cart in product detail page so PWP shows in mini-cart
		var isQuickInfoPage = (('undefined' === typeof quickInfoPage) || (quickInfoPage === null)) ? false : quickInfoPage;
		if (!isQuickInfoPage) {
			var message=[];
			message.actionId='AddOrderItem';
			message.orderItemId='AddedGiftItem';
			parent.dojo.publish('modelChanged',[message]);
		}
	}
 /**
 * Display an error message.
 * @param (object) serviceResponse The service response object, which is the
 * JSON object returned by the service invocation
 */
	,failureHandler: function(serviceResponse) {

		if (serviceResponse.errorMessage) {
			MessageHelper.displayErrorMessage(serviceResponse.errorMessage);				
		} 
		else {
			 if (serviceResponse.errorMessageKey) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);					
			 }
		}
		cursor_clear();
	}

}),

	/**
	 * Create a new saved order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxOrderCreate",
		actionId: "AjaxOrderCreate",
		url: getAbsoluteURL() + "AjaxOrderCreate",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDER_CREATED"]);
			
			cursor_clear();
			
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
    	
			if (serviceResponse.errorMessage) {
			
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_CREATED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Cancel a single saved order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxSingleOrderCancel",
		actionId: "AjaxSingleOrderCancel",
		url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderCancel",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDERS_CANCELLED"]);
			cursor_clear();
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_CANCELLED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Cancel a saved order. This service is used to delete multiple saved orders one at a time.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxOrderCancel",
		actionId: "AjaxOrderCancel",
		url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderCancel",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			// Call again to delete any other orders in the list.
			savedOrdersJS.cancelSavedOrder(false);
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_CANCELLED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Update the description of a single saved order. This service is used to update the description of a saved order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxSingleOrderSave",
		actionId: "AjaxSingleOrderSave",
		url: getAbsoluteURL() + "AjaxOrderCopy",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			if (savedOrdersJS.isOrderDetailsPageValue)
			{
				MessageHelper.displayStatusMessage(MessageHelper.messages["PENDING_ORDER_SAVED"]);
				
			}
			else
			{
				MessageHelper.displayStatusMessage(MessageHelper.messages["ORDERS_SAVED"]);
				
			}
			
			var inputElement = document.getElementById('OrderDescription_input');
        	if (inputElement != null && inputElement != 'undefined')
        	{
        		dojo.removeClass(inputElement, 'savedOrderDetailsInputBorderWarning'); 
        		dojo.addClass(inputElement, 'savedOrderDetailsInputBorder');
        		document.getElementById('OldOrderDescription').value = inputElement.value;
        	}
			cursor_clear();
			
			///If the rest of the non-ajax pending order details page needs to be updated to it here.
			if (savedOrdersJS.updateCartRequired)
			{
				savedOrdersJS.updateCartRequired = false;
				CheckoutHelperJS.updateShoppingCart(document.ShopCartForm);
			}
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				
				 if (serviceResponse.errorCode == "CMN0409E" || serviceResponse.errorCode == "CMN1024E")
				 {
					 if (serviceResponse.errorCode == "CMN1024E" && serviceResponse.systemMessage != "")
					 {
						 MessageHelper.displayErrorMessage(serviceResponse.systemMessage);
					 }
					 else
					 {
						 if (savedOrdersJS.isOrderDetailsPageValue)
						{
							MessageHelper.displayStatusMessage(MessageHelper.messages["PENDING_ORDER_NOT_SAVED"]);
							
						}
						else
						{
							MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_SAVED"]);
							
						}  
					 }
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Update the description of a saved order. This service is used to update the description of multiple saved orders one at a time.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxOrderSave",
		actionId: "AjaxOrderSave",
		url: getAbsoluteURL() + "AjaxOrderCopy",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			// Call again to delete any other orders in the list.
			savedOrdersJS.saveOrder(false);
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_SAVED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Set the current order to be that of a saved order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxSetPendingOrder",
		actionId: "AjaxSetPendingOrder",
		url: getAbsoluteURL() + "AjaxSetPendingOrder",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			MessageHelper.hideAndClearMessage();
			
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDER_SET_CURRENT"]);
			
			savedOrdersJS.determinePageForward("AjaxSetPendingOrder");
			
			cursor_clear();
			
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E" || serviceResponse.errorCode == "CMN1024E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_SET_CURRENT"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	
	/**
	 * Updates the current pending order setting it to the current shopping cart.
	 * This service does not cause a refresh of the ListOrdersDisplay_Controller registered widgets.
	 * The main function of this service is to keep the cpendorder database table in line with the current shopping cart.
	 * Perform the service or command call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdatePendingOrder",
		actionId: "AjaxUpdatePendingOrder",
		url: getAbsoluteURL() + "AjaxSetPendingOrder",
		formId: ""

     /**
     * There is nothing to do in the event of a success of this service since it is executed in the background.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			savedOrdersJS.determinePageForward("AjaxUpdatePendingOrder");
			cursor_clear();
			
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_SET_CURRENT"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Copy a saved order.
	 * Perform the service or command call. 
	 */
	wc.service.declare({
		id: "AjaxSingleOrderCopy",
		actionId: "AjaxSingleOrderCopy",
		url: getAbsoluteURL() + "AjaxOrderCopy",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {

		var params = [];
		
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.URL="";
		params.updatePrices = "1";
		
		params.orderId = serviceResponse.orderId;
		params.calculationUsageId = "-1";
		
		wc.service.invoke("AjaxSingleOrderCalculate", params);
			MessageHelper.hideAndClearMessage();
			
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Copy a saved order.
	 * Perform the service or command call. 
	 */
	wc.service.declare({
		id: "AjaxOrderCopy",
		actionId: "AjaxOrderCopy",
		url: getAbsoluteURL() + "AjaxOrderCopy",
		formId: ""

    /**
    * display a success message
    * @param (object) serviceResponse The service response object, which is the
    * JSON object returned by the service invocation
    */

		,successHandler: function(serviceResponse) {

		var params = [];
		
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.URL="";
		params.updatePrices = "1";
		
		params.orderId = serviceResponse.orderId;
		params.calculationUsageId = "-1";
		
		wc.service.invoke("AjaxOrderCalculate", params);
			MessageHelper.hideAndClearMessage();
			
		}
	
    /**
    * display an error message
    * @param (object) serviceResponse The service response object, which is the
    * JSON object returned by the service invocation
    */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Perform the order calculation operations to compute the contract prices for the order items in an order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxSingleOrderCalculate",
		actionId: "AjaxSingleOrderCalculate",
		url: getAbsoluteURL() + "AjaxOrderCalculate",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDER_COPIED"]);
			cursor_clear();
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Perform the order calculation operations to compute the contract prices for the order items in an order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxCurrentOrderCalculate",
		actionId: "AjaxCurrentOrderCalculate",
		url: getAbsoluteURL() + "AjaxOrderCalculate",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDER_SET_CURRENT"]);
			cursor_clear();
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Perform the order calculation operations to compute the contract prices for the order items in an order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxOrderCalculate",
		actionId: "AjaxOrderCalculate",
		url: getAbsoluteURL() + "AjaxOrderCalculate",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			MessageHelper.hideAndClearMessage();
			// Call again to copy any other orders in the list.
			savedOrdersJS.copyOrder(false);
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	

	/**
	 * Processes a punchout payment request.
	 */
	wc.service.declare({
		id: "AjaxPunchoutPay",
		actionId: "AjaxPunchoutPay",
		url: "PunchoutPaymentRepay",
		formId: ""
		
		/**
		 * Calls PunchoutJS.handleResponse to render the punchout payment section on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			PunchoutJS.handleResponse(serviceResponse.orderId);
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
	
	
	/**
	 * Subscribes to or unsubscribes from receiving information related to a particular category in the store.
	 */
	wc.service.declare({
		id: "AjaxCategorySubscribe",
		actionId: "AjaxCategorySubscribe",
		url: "AjaxMarketingTriggerProcessServiceEvaluate",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_UPDATED"]);
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),

	/**
	 * Email UnSubscription Service Declarations added for HBC Customization
	 */
	wc.service.declare({
		id: "AjaxHBCUnsubscribeAdd",
		actionId: "AjaxHBCUnsubscribeAdd",
		url: getAbsoluteURL() + "AjaxHBCUnsubscribeAdd",
		formId: ""
			
		/**
		  * display a success message
		  * @param (object) serviceResponse The service response object, which is the
		  * JSON object returned by the service invocation
		  */
		,successHandler: function(serviceRespone){
			//alert('Successfully added user unsubscription');
			var redirectURL = "TopCategoriesDisplayView?storeId=" + ServicesDeclarationJS.storeId 
			+ "&catalogId=" + ServicesDeclarationJS.catalogId 
			+ "&langId=" + ServicesDeclarationJS.langId; 
			document.location.href = redirectURL;
		}

		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse){
			//alert('Not able to add user unsubscription');
		}
	}),
	
	
	/**
	 * Email Subscription Service Declarations added for HBC Customization
	 */
	wc.service.declare({
		id: "AjaxHBCSubscriptionAdd",
		actionId: "AjaxHBCSubscriptionAdd",
		url: "AjaxHBCSubscriptionAdd",
		formId: ""
			
		/**
		  * display a success message
		  * @param (object) serviceResponse The service response object, which is the
		  * JSON object returned by the service invocation
		  */
		,successHandler: function(serviceResponse){
			SubscriptionJS.showRegistrationPopup(serviceResponse);
		}

		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse){
			//alert('Not able to add user subscription');
		}
	}),
	
	
	/**
	 * Ajax Service Declarations for Person Register through Registration modal.
	 */
	wc.service.declare({
		id: "HBCAjaxPersonProcessServicePersonRegister",
		actionId: "HBCAjaxPersonProcessServicePersonRegister",
		url: getAbsoluteURL() + "HBCAjaxPersonProcessServicePersonRegister",
		formId: ""
			
		/**
		  * display a success message
		  * @param (object) serviceResponse The service response object, which is the
		  * JSON object returned by the service invocation
		  */
		,successHandler: function(serviceResponse){
			//alert('Registered success');
			console.log("AjaxPersonProcessServicePersonRegister success");
			document.location.href = myAccountURL;
		}

		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse){
			//alert('Not able to add user registration');
			console.log("AjaxPersonProcessServicePersonRegister failed");
			SubscriptionJS.showRegModalError(serviceResponse.errorMessage);
		}
	}),
	

	/**
	 * Ajax Service Declarations for Recaptcha response through Gift Card Balance Inquiry .
	 */
	  wc.service.declare({
		  id: "HBCGiftCardBalanceInquiry",
		  actionId: "HBCGiftCardBalanceInquiry",
		  url: "HBCGiftCardBalanceInquiry",
		  formId: "",

		successHandler: function(serviceResponse) {
		  var responseUrl=serviceResponse.url;
		  
		  if (serviceResponse.recaptchaStatus == false){
			    url=responseUrl+"&isValid="+serviceResponse.recaptchaStatus
			    
			    wc.render.getRefreshControllerById("recaptchaResponseDisplayController").url = url;
	            wc.render.updateContext("recaptchaResponseDisplayContext", {});
	            Recaptcha.reload();
		      }else
		      {
			    Recaptcha.reload();
		        var params = [];
		        params.giftCardNo=document.getElementById('gift_c_no').value;
				params.pinNo=document.getElementById('pin_no').value;
				params.responseUrl=responseUrl;
				params.giftBalance="GiftCardBlance";
				wc.service.invoke("HBCGiftCardQueryControllerCmd",params);
		      }
		    }
		}),
		/**
		 * Ajax Service Declarations for Gift Card Balance Inquiry .
		 */
		wc.service.declare({
		  id: "HBCGiftCardQueryControllerCmd",
		  actionId: "HBCGiftCardQueryControllerCmd",
		  url: "HBCGiftCardQueryControllerCmd",
		  formId: "",

		successHandler: function(serviceResponse) {
			
				url=serviceResponse.responseUrl+"&response="+serviceResponse.responseCode+"&isValid="+true+"&Amount="+serviceResponse.piAmount ;
				wc.render.getRefreshControllerById("recaptchaResponseDisplayController").url = url;
	            wc.render.updateContext("recaptchaResponseDisplayContext", {});
		
	         },

		failureHandler: function(serviceResponse) {
		    if (serviceResponse.errorMessage) {
		     // alert(serviceResponse.errorMessage);
		    }
		    
		
		  } 
		}),
		
		//---------------------------------------------------------
		wc.service.declare({
			  id: "AjaxDeleteCreditCardPaymentInstructionFromThisOrder",
			  actionId: "AjaxDeleteCreditCardPaymentInstructionFromThisOrder",
			  url: "HBCPIRemoveCmd",
			  formId: "",
		
		successHandler: function(serviceResponse) {
			// added by azeem
	        params = [];
//			params.orderId = serviceResponse.orderId;
	        params.orderId  = document.getElementById('WC_CheckoutPaymentsAndBillingAddressf_orderId_1').value
			document.getElementById('CurrentOrderTotal').value=HBC.formatTotalHiddenForPayment();
			wc.service.invoke("AjaxTenderType",params);
			cursor_clear();
			//  added by azeem
			
//			params.orderid=document.getElementById('WC_CheckoutPaymentsAndBillingAddressf_orderId_1').value;

			//alert("Muru done1");
		},
		failureHandler: function(serviceResponse) {
			//alert("Credit PI Remove Cmd Not Done");
			    if (serviceResponse.errorMessage) {
			      //alert(serviceResponse.errorMessage);
			    }
			    cursor_clear();
			
			  } 
		}),
		
		
		wc.service.declare({
			  id: "AjaxDeleteALLPaymentInstructionFromThisOrder",
			  actionId: "AjaxDeleteALLPaymentInstructionFromThisOrder",
			  url: "HBCPIRemoveCmd",
			  formId: "",
		
		successHandler: function(serviceResponse) {
			
			//Credit card Stuff
			
			// added by azeem
	        params = [];
//			params.orderId = serviceResponse.orderId;
	        params.orderId  = document.getElementById('WC_CheckoutPaymentsAndBillingAddressf_orderId_1').value
			document.getElementById('CurrentOrderTotal').value=HBC.formatTotalHiddenForPayment();
			wc.service.invoke("AjaxTenderType",params);
			cursor_clear();
			//  added by azeem

			dijit.byId("cc_cvc_1").attr("disabled",true);
			dijit.byId("account1_1").attr("disabled",true);
			dijit.byId("expYear").attr("disabled",true);
			dijit.byId("expMonth").attr("disabled",true);
			
			if(document.getElementById('payMethodId_1').value!="LT")
			{
			dijit.byId("cc_cvc_1").attr("disabled",false);
			dijit.byId("expYear").attr("disabled",false);
			dijit.byId("expMonth").attr("disabled",false);
			}
			dijit.byId("account1_1").attr("disabled",false);
			//Gift card Stuff
			//CheckoutPayments.deleteGiftCardPaymentInstructions();
			dijit.byId("GCcardNumber").attr("disabled",true);
			dijit.byId("pin").attr("disabled",true);
			dijit.byId("GCcardNumber2").attr("disabled",true);
			dijit.byId("pin2").attr("disabled",true);
			var amount=document.getElementById('estimateTotalCharges').value;
			if(document.getElementById("piAmount_display_CreditAmountURL")!=null)
				{
			wc.render.getRefreshControllerById("creditAmountDisplayController").url = document.getElementById("piAmount_display_CreditAmountURL").value +"&amount="+amount;
			wc.render.updateContext("creditAmountDisplayContext", {});
				}
			
			dijit.byId("GCcardNumber").attr("disabled",false);
			dijit.byId("pin").attr("disabled",false);
			dijit.byId("GCcardNumber2").attr("disabled",false);
			dijit.byId("pin2").attr("disabled",false);
			dijit.byId("GCcardNumber").attr("readOnly",false);
			dijit.byId("pin").attr("readOnly",false);
			document.getElementById('apply').style.display="block";
			 dijit.byId("GCcardNumber2").attr("readOnly",false);
			  dijit.byId("pin2").attr("readOnly",false);
			  document.getElementById('GCcardNumber2').value=""
			document.getElementById('pin2').value=""
			  document.getElementById('apply2').style.display="block";
			  document.getElementById('GCcounter').value="0";
		        wc.render.getRefreshControllerById("firstGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC1AmountURL").value + "&piAmount=";
		        wc.render.updateContext("firstGiftCardAmountDisplayContext", {});
		        wc.render.getRefreshControllerById("secondGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC2AmountURL").value + "&piAmount=";
		        wc.render.updateContext("secondGiftCardAmountDisplayContext", {});
		        
			
		},
		failureHandler: function(serviceResponse) {
			MessageHelper.displayErrorMessage("All payments could not be deleted. Please refresh the page and try again");
			    if (serviceResponse.errorMessage) {
			    	MessageHelper.displayErrorMessage("There is an error. All payments could not be deleted. Please refresh the page and try again");
			    }
			    cursor_clear();
			
			  } 
		}),
		
		wc.service.declare({
			  id: "AjaxDeleteCCPaymentInstructionFromThisOrder",
			  actionId: "AjaxDeleteCCPaymentInstructionFromThisOrder",
			  url: "HBCPIRemoveCmd",
			  formId: "",
		
		successHandler: function(serviceResponse) {
			
			//Credit card Stuff
			// added by azeem
	        params = [];
//			params.orderId = serviceResponse.orderId;
	        params.orderId  = document.getElementById('WC_CheckoutPaymentsAndBillingAddressf_orderId_1').value
			document.getElementById('CurrentOrderTotal').value=HBC.formatTotalHiddenForPayment();
			wc.service.invoke("AjaxTenderType",params);cursor_clear();
			//  added by azeem

			
			dijit.byId("cc_cvc_1").attr("disabled",true);
			dijit.byId("account1_1").attr("disabled",true);
			dijit.byId("expYear").attr("disabled",true);
			dijit.byId("expMonth").attr("disabled",true);
			
			if(document.getElementById('payMethodId_1').value!="LT")
			{
			dijit.byId("cc_cvc_1").attr("disabled",false);
			dijit.byId("expYear").attr("disabled",false);
			dijit.byId("expMonth").attr("disabled",false);
			}
			dijit.byId("account1_1").attr("disabled",false);
			//Gift card Stuff
			//CheckoutPayments.deleteGiftCardPaymentInstructions();
			//dijit.byId("GCcardNumber").attr("disabled",true);
			//dijit.byId("pin").attr("disabled",true);
			//dijit.byId("GCcardNumber2").attr("disabled",true);
			//dijit.byId("pin2").attr("disabled",true);
			var amount=HBC.formatTotalHiddenForPayment();
			wc.render.getRefreshControllerById("creditAmountDisplayController").url = document.getElementById("piAmount_display_CreditAmountURL").value +"&refresh=R&amount="+amount;
			wc.render.updateContext("creditAmountDisplayContext", {});
			
			//dijit.byId("GCcardNumber").attr("disabled",false);
			//dijit.byId("pin").attr("disabled",false);
			//dijit.byId("GCcardNumber2").attr("disabled",false);
			//dijit.byId("pin2").attr("disabled",false);
			dijit.byId("GCcardNumber").attr("readOnly",false);
			dijit.byId("pin").attr("readOnly",false);
			document.getElementById('apply').style.display="block";
			 dijit.byId("GCcardNumber2").attr("readOnly",false);
			  dijit.byId("pin2").attr("readOnly",false);
			 // document.getElementById('GCcardNumber2').value=""
			//document.getElementById('pin2').value=""
			  document.getElementById('apply2').style.display="block";
			  document.getElementById('GCcounter').value="0";
			  var currentGC1URL = wc.render.getRefreshControllerById("firstGiftCardAmountDisplayController").url;
		       wc.render.getRefreshControllerById("firstGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC1AmountURL").value + "&piAmount=";
		        wc.render.updateContext("firstGiftCardAmountDisplayContext", {});
			    var currentGC2URL = wc.render.getRefreshControllerById("secondGiftCardAmountDisplayController").url;
		        wc.render.getRefreshControllerById("secondGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC2AmountURL").value + "&piAmount=";
		        wc.render.updateContext("secondGiftCardAmountDisplayContext", {});
		        
			
		},
		failureHandler: function(serviceResponse) {
			MessageHelper.displayErrorMessage("Credit card Payment Could not be deleted.please refresh the page and try again");
			    if (serviceResponse.errorMessage) {
			    	MessageHelper.displayErrorMessage("There is a error .Credit card Payment could not be deleted.please refresh the page and try again");
			    }
			    cursor_clear();
			
			  } 
		}),
		
		wc.service.declare({
			  id: "AjaxDeleteGCPaymentInstructionFromThisOrder",
			  actionId: "AjaxDeleteGCPaymentInstructionFromThisOrder",
			  url: "HBCPIRemoveCmd",
			  formId: "",
		
		successHandler: function(serviceResponse) {
			
			// added by azeem
	        params = [];
//			params.orderId = serviceResponse.orderId;
	        params.orderId  = document.getElementById('WC_CheckoutPaymentsAndBillingAddressf_orderId_1').value
			document.getElementById('CurrentOrderTotal').value=HBC.formatTotalHiddenForPayment();
			wc.service.invoke("AjaxTenderType",params);cursor_clear();
			//  added by azeem

			//Credit card Stuff
			
			//dijit.byId("cc_cvc_1").attr("disabled",true);
			//dijit.byId("account1_1").attr("disabled",true);
			//dijit.byId("expYear").attr("disabled",true);
			//dijit.byId("expMonth").attr("disabled",true);
			
			//if(document.getElementById('payMethodId_1').value!="LT")
			//{
			//dijit.byId("cc_cvc_1").attr("disabled",false);
			//dijit.byId("expYear").attr("disabled",false);
			//dijit.byId("expMonth").attr("disabled",false);
			//}
			//dijit.byId("account1_1").attr("disabled",false);
			//Gift card Stuff
			//CheckoutPayments.deleteGiftCardPaymentInstructions();
			dijit.byId("GCcardNumber").attr("disabled",true);
			dijit.byId("pin").attr("disabled",true);
			dijit.byId("GCcardNumber2").attr("disabled",true);
			dijit.byId("pin2").attr("disabled",true);
			var amount=HBC.formatTotalHiddenForPayment();
			wc.render.getRefreshControllerById("creditAmountDisplayController").url = document.getElementById("piAmount_display_CreditAmountURL").value +"&refresh=R&amount="+amount;
			wc.render.updateContext("creditAmountDisplayContext", {});
			
			dijit.byId("GCcardNumber").attr("disabled",false);
			dijit.byId("pin").attr("disabled",false);
			dijit.byId("GCcardNumber2").attr("disabled",false);
			dijit.byId("pin2").attr("disabled",false);
			dijit.byId("GCcardNumber").attr("readOnly",false);
			dijit.byId("pin").attr("readOnly",false);
			document.getElementById('apply').style.display="block";
			 dijit.byId("GCcardNumber2").attr("readOnly",false);
			  dijit.byId("pin2").attr("readOnly",false);
			  document.getElementById('GCcardNumber2').value=""
			document.getElementById('pin2').value=""
			  document.getElementById('apply2').style.display="block";
			  document.getElementById('GCcounter').value="0";
		        wc.render.getRefreshControllerById("firstGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC1AmountURL").value + "&piAmount=";
		        wc.render.updateContext("firstGiftCardAmountDisplayContext", {});
		        wc.render.getRefreshControllerById("secondGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC2AmountURL").value + "&piAmount=";
		        wc.render.updateContext("secondGiftCardAmountDisplayContext", {});
		        
			
		},
		failureHandler: function(serviceResponse) {
			MessageHelper.displayErrorMessage("Gift Card Payment could not be deleted.please refresh the page and try again");
			    if (serviceResponse.errorMessage) {
			    	MessageHelper.displayErrorMessage("There is a error .Gift Card Payment could not be deleted.please refresh the page and try again");
			    }
			    cursor_clear();
			
			  } 
		}),
		
		wc.service.declare({
			  id: "AjaxDeleteGCPIOnTotalChange",
			  actionId: "AjaxDeleteGCPIOnTotalChange",
			  url: "HBCPIRemoveCmd",
			  formId: "",
		
		successHandler: function(serviceResponse) {
			
//			// added by azeem
//	        params = [];
////			params.orderId = serviceResponse.orderId;
//	        params.orderId  = document.getElementById('WC_CheckoutPaymentsAndBillingAddressf_orderId_1').value
//			document.getElementById('CurrentOrderTotal').value=HBC.formatTotalHiddenForPayment();
//			wc.service.invoke("AjaxTenderType",params);cursor_clear();
//			//  added by azeem

			//Credit card Stuff
			
			//dijit.byId("cc_cvc_1").attr("disabled",true);
			//dijit.byId("account1_1").attr("disabled",true);
			//dijit.byId("expYear").attr("disabled",true);
			//dijit.byId("expMonth").attr("disabled",true);
			
			//if(document.getElementById('payMethodId_1').value!="LT")
			//{
			//dijit.byId("cc_cvc_1").attr("disabled",false);
			//dijit.byId("expYear").attr("disabled",false);
			//dijit.byId("expMonth").attr("disabled",false);
			//}
			//dijit.byId("account1_1").attr("disabled",false);
			
			//Gift card Stuff
			//CheckoutPayments.deleteGiftCardPaymentInstructions();
			//dijit.byId("GCcardNumber").attr("disabled",true);
			//dijit.byId("pin").attr("disabled",true);
			//dijit.byId("GCcardNumber2").attr("disabled",true);
			//dijit.byId("pin2").attr("disabled",true);
			var amount=HBC.formatTotalHiddenForPayment();
			wc.render.getRefreshControllerById("creditAmountDisplayController").url = document.getElementById("piAmount_display_CreditAmountURL").value +"&refresh=R&amount="+amount;
			wc.render.updateContext("creditAmountDisplayContext", {});
			
			//dijit.byId("GCcardNumber").attr("disabled",false);
			//dijit.byId("pin").attr("disabled",false);
			//dijit.byId("GCcardNumber2").attr("disabled",false);
			//dijit.byId("pin2").attr("disabled",false);
			dijit.byId("GCcardNumber").attr("readOnly",false);
			dijit.byId("pin").attr("readOnly",false);
			document.getElementById('apply').style.display="block";
			 dijit.byId("GCcardNumber2").attr("readOnly",false);
			  dijit.byId("pin2").attr("readOnly",false);
			 // document.getElementById('GCcardNumber2').value=""
			//document.getElementById('pin2').value=""
			  document.getElementById('apply2').style.display="block";
			  document.getElementById('GCcounter').value="0";
			  var currentGC1URL = wc.render.getRefreshControllerById("firstGiftCardAmountDisplayController").url;
		        wc.render.getRefreshControllerById("firstGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC1AmountURL").value + "&piAmount=";
		        wc.render.updateContext("firstGiftCardAmountDisplayContext", {});
			   var currentGC2URL = wc.render.getRefreshControllerById("secondGiftCardAmountDisplayController").url;
		        wc.render.getRefreshControllerById("secondGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC2AmountURL").value + "&piAmount=";
		        wc.render.updateContext("secondGiftCardAmountDisplayContext", {});
		        
			
		},
		failureHandler: function(serviceResponse) {
			MessageHelper.displayErrorMessage("Gift Card Payment could not be deleted.please refresh the page and try again");
			    if (serviceResponse.errorMessage) {
			    	MessageHelper.displayErrorMessage("There is a error .Gift Card Payment could not be deleted.please refresh the page and try again");
			    }
			    cursor_clear();
			
			  } 
		}),
			
		wc.service.declare({
			  id: "AjaxDeleteGiftCardPaymentInstructionFromThisOrder",
			  actionId: "AjaxDeleteGiftCardPaymentInstructionFromThisOrder",
			  url: "HBCPIRemoveCmd",
			  formId: "",
				  
		successHandler: function(serviceResponse) {
			if(document.getElementById("FirstGCAmount") != null) {
				document.getElementById("FirstGCAmount").value = '';
			}
			if(document.getElementById("SecondGCAmount") != null) {
				document.getElementById("SecondGCAmount").value = '';
			}
			var amount = HBC.formatTotalHiddenForPayment();
			document.getElementById("CreditAmount").value = amount;
			CheckoutPayments.updateAmountFields(amount);
			// added by azeem
	        params = [];
//			params.orderId = serviceResponse.orderId;
	        params.orderId  = document.getElementById('WC_CheckoutPaymentsAndBillingAddressf_orderId_1').value
			document.getElementById('CurrentOrderTotal').value = amount;
			wc.service.invoke("AjaxTenderType",params);cursor_clear();
			//  added by azeem

		},
		failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			}
			cursor_clear();
			
		  } 
		})
	