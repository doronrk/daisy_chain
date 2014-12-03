/***************ServicesDeclaration.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2012 All Rights Reserved.
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

	//PST Start
	catentIdPST: "",

	setCatentIdPST:function(Ids){
		catentIdPST=Ids;
	},

	getCatentIdPST:function(){
		return catentIdPST;
	},
	// PST End
	setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
	}
}

function nullCartTotalCookie(orderId){
	dojo.cookie("WC_CartTotal_"+orderId, null, {expires: -1, path:'/'});
	
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var index = cookies[i].indexOf("=");
		var name = cookies[i].substr(0,index);
		var value = cookies[i].substr(index+1)
		name = name.replace(/^\s+|\s+$/g,"");
		value = value.replace(/^\s+|\s+$/g,"");
		if (value == orderId) {
			dojo.cookie(name, null, {expires: -1, path:'/'});
			break;
		}
	}	
}

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
			//MessageHelper.hideAndClearMessage();
			//MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_ADDED"]);
			document.location.reload();
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
    /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessageKey == '_ERR_ORDER_IS_LOCKED' || serviceResponse.errorMessageKey == '_ERR_ORDER_IS_NOT_LOCKED') {
				document.location.href="AjaxOrderItemDisplayView?storeId="+serviceResponse.storeId+"&errType="+serviceResponse.errType;
			}

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
		
		/**
		 * display a success message
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			/*MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);*/
			dropdownInit = false;
			dropdownUpdated =false;
			setShopCartRedirectCookie();
			showMiniShopCartDropDown('widget_minishopcart','quick_cart_container','orderItemsListAutoClose1');
                     updateCartCookie();
                     wc.render.updateContext('MiniShoppingCartContext', {'status':'load'});
			cursor_clear();
			document.location.reload();
			CheckoutPayments.checkoutofstock();
		}
		
		/**
		 * display an error message
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == '_ERR_ORDER_IS_LOCKED' || serviceResponse.errorMessageKey == '_ERR_ORDER_IS_NOT_LOCKED') {
				document.location.href="AjaxOrderItemDisplayView?storeId="+serviceResponse.storeId+"&errType="+serviceResponse.errType;
			}
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
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == '_ERR_ORDER_IS_LOCKED' || serviceResponse.errorMessageKey == '_ERR_ORDER_IS_NOT_LOCKED') {
				document.location.href="AjaxOrderItemDisplayView?storeId="+serviceResponse.storeId+"&errType="+serviceResponse.errType;
			}
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

    /**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			/*MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);*/
			document.location.reload();
			if (!CheckoutHelperJS.pendingOrderDetailsPage)
			{
				setDeleteCartCookie();
				if(CheckoutHelperJS.shoppingCartPage){
					
					//document.location.reload();
					/*document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
				}else{
					document.location.href = "OrderShippingBillingView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId;*/
				}
			}
			else
			{
				cursor_clear();
			}
			CheckoutPayments.checkoutofstockincartpage();
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == '_ERR_ORDER_IS_LOCKED' || serviceResponse.errorMessageKey == '_ERR_ORDER_IS_NOT_LOCKED') {
				document.location.href="AjaxOrderItemDisplayView?storeId="+serviceResponse.storeId+"&errType="+serviceResponse.errType;
			}			
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
		//	MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == '_ERR_ORDER_IS_LOCKED' || serviceResponse.errorMessageKey == '_ERR_ORDER_IS_NOT_LOCKED') {
				document.location.href="AjaxOrderItemDisplayView?storeId="+serviceResponse.storeId+"&errType="+serviceResponse.errType;
				/*if ($("#carterrmsg")) {
					$("#carterrmsg").text(serviceResponse.errorMessage);
				} */
			} else if (serviceResponse.errorMessage) {
				if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE_QTY_UPDATE"]);
				} else{
					//MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
					//dojo.byId("errMsg").innerHTML=serviceResponse.errorMessage;
					//alert(serviceResponse.errorMessage);
					var previousValue=CheckoutHelperJS.getPreviousValue();
					var id= CheckoutHelperJS.getcurrentId();
					
					$('html, body').animate({ scrollTop:0}, $(window).scrollTop() / 3);
					if (serviceResponse.errorMessageKey == "_ERR_TOO_MANY_ITEMS_TOTAL") {
						dojo.byId("alertforqunatityupdate").style.display="block";
                    }
					dojo.byId(id).value=previousValue;
				}
			} else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	wc.service.declare({
		id: "GiftCardTableUpdate",
		actionId: "GiftCardTableUpdate",
		url: getAbsoluteURL() + "GiftCardUpdateCmd",
		formId: "",
		
		successHandler:function(serviceResponse){
		console.log("giftcardupdatecmdsuccess");
		cursor_clear();
		},
		failureHandler:function(serviceResponse){
		console.log("giftcardupdatecmdfailed");
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
			if (serviceResponse.errorMessageKey == '_ERR_ORDER_IS_LOCKED' || serviceResponse.errorMessageKey == '_ERR_ORDER_IS_NOT_LOCKED') {
				document.location.href="AjaxOrderItemDisplayView?storeId="+serviceResponse.storeId+"&errType="+serviceResponse.errType;
				/*if ($("#carterrmsg")) {
					$("#carterrmsg").text(serviceResponse.errorMessage);
				}*/ 
			} else if (serviceResponse.errorMessage) {
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
			//MessageHelper.hideAndClearMessage();
		
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
			CheckoutHelperJS.setOrderPrepared("true");
			//CheckoutPayments.callAuthCapture();
			CheckoutHelperJS.checkoutOrder(CheckoutHelperJS.getSavedParameter('tempOrderId'),CheckoutHelperJS.getSavedParameter('tempUserType'),CheckoutHelperJS.getSavedParameter('tempEmailAddresses'),CheckoutHelperJS.getSavedParameter('tempIsQuote'));
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
			if(serviceResponse.errorMessageKey == '_ERR_REGEN_INVALID_CONFIGURATION_OF_DYNAMIC_KIT')
{
			console.debug(serviceResponse.errorMessageKey);
			alert(serviceResponse.errorMessageKey);
			dojo.byId("loadingOverlay").style.display = "none";	
			dojo.byId("displaymessage").value="Your KIT has become invalid"+serviceResponse.errorMessage;
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
	
			nullCartTotalCookie(serviceResponse.orderId);
			var shipmentTypeId = CheckoutHelperJS.getShipmentTypeId();
			var eMailAddress = CheckoutHelperJS.getSavedParameter('tempEmailAddresses');			
			var eMAddress = document.getElementById("emailSender");
			var sTypeId=document.getElementById("shipmentTypeId");
			eMAddress.value = eMailAddress;
			sTypeId.value=shipmentTypeId;

			document.forms["sCheckoutPage"].submit();

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
			dojo.byId('loadingOverlay').style.display = 'none';
			dojo.byId("confirmationFailed2").style.display = "block";	
			dojo.byId("displaymessage1").value="We are unable to process your order at this time, please call 1-877-888-8235 to speak to one of our sales representatives";
			//cursor_clear();
			dojo.byId("commonLoadingOverlay").style.display = "none";
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
		dojo.byId('addressId').value=serviceResponse.addressId;
			CheckoutPayments.setAddressId(serviceResponse.addressId);
			AddressHelper.updateOrderAfterAddressUpdate();
			setTimeout(function(){

    			CheckoutPayments.updateAddressForOrderItems(); },5000);
console.debug("update shipping info");
			//shipCal();
			//MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
document.getElementById('displaywarning-ship').style.display = 'block';

			/*if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}*/
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
		dojo.byId('addressId').value=serviceResponse.addressId;
			CheckoutPayments.setAddressId(serviceResponse.addressId);
			AddressHelper.updateOrderAfterAddressUpdate();
			
				setTimeout(function(){
				CheckoutPayments.updateAddressForOrderItems(); },5000);
			
console.debug("update shipping method info");

			//shipCal();
			//MessageHelper.hideAndClearMessage();
			cursor_clear();
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			document.getElementById('displaywarning-ship').style.display = 'block';
			

			/*if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}*/
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
		
		CheckoutPayments.setItemsAsUpdated();
		CheckoutPayments.refreshOrderBox();
			//MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			document.getElementById('displaywarning-ship').style.display = 'block';
			/*if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}*/
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
			//alert('Promotion code applied successfully.');
		    // Madan - Commented this section to avoid to display message
			// $("#promotionMessage").text('Promotion code applied successfully.');
			
			MessageHelper.hideAndClearMessage();

			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			
			params.orderId = ".";
			if(CheckoutHelperJS.shoppingCartPage){	
				params.calculationUsage = "-1,-2,-5,-6,-7";
			}else{
				params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			}
			params.orderid=serviceResponse.orderId;
			params.promoCode=serviceResponse.promoCode;
		    params.tasktype=serviceResponse.taskType;
			//alert(tasktype);
			
			wc.service.invoke("AjaxUpdateOrderItem",params);
			//alert(tasktype);
			 if(params.tasktype=="A"){
				 wc.service.invoke("AjaxPromotionCouponCodeManage",params);
			    }
			
			 
			
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessageKey == '_ERR_ORDER_IS_LOCKED' || serviceResponse.errorMessageKey == '_ERR_ORDER_IS_NOT_LOCKED') {
				document.location.href="AjaxOrderItemDisplayView?storeId="+serviceResponse.storeId+"&errType="+serviceResponse.errType;
			} else {
				
				//<%-- H.K--%>
				$("#promotionMessage").text(serviceResponse.errorMessage);
				$("#promoCode").addClass("error");
				$("#promotionMessage").addClass("error");
				//<%-- H.K--%>
			}
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
		id: "AjaxPromotionCouponCodeManage",
		url: getAbsoluteURL() + "PromotionMessageCmd",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//alert('Promotion code applied successfully.');
		    // Madan - Commented this section to avoid to display message
			// $("#promotionMessage").text('Promotion code applied successfully.');
			
			//MessageHelper.hideAndClearMessage();
            
			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			
			params.orderId = ".";
			
			if(CheckoutHelperJS.shoppingCartPage){	
				params.calculationUsage = "-1,-2,-5,-6,-7";
			}else{
				params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			}
		
			
			if(serviceResponse.valuetodisplay==true){
               displaycpntooltip=true;
               if($('#tooltip_cpn').length)
					{
					$('#tooltip_cpn').show();}
					}
						
			}

	
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			//alert(serviceResponse.errorMessage);
			//<%-- H.K--%>

			$("#promotionMessage").text(serviceResponse.errorMessage);
			$("#promoCode").addClass("error");
			$("#promotionMessage").addClass("error");
			//<%-- H.K--%>

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
			if(CheckoutHelperJS.shoppingCartPage){	
				params.calculationUsage = "-1,-2,-5,-6,-7";
			}else{
				params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			}
			
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
		nullCartTotalCookie(serviceResponse.orderId);
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
		nullCartTotalCookie(serviceResponse.orderId);
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
	
	
	wc.service.declare({
		id: "AjaxSetExpressCheckout",
		actionId: "AjaxSetExpressCheckout",
		url: getAbsoluteURL()+"PayPalSetExpressCheckout",
		formId: ""
			,successHandler: function(serviceResponse) {
		//var set_token = serviceResponse.token;
		var paypalURL=serviceResponse.paypalURL;
		var paymentMessage=serviceResponse.paymentMessage;
		var shippingAddressMadatory = serviceResponse.shippingAddressMadatory;
		//var redirectURL = "https://www.sandbox.paypal.com/checkoutnow?token="+set_token;
		if(paymentMessage=="NE"){
		$('#itemsoncart').css('display','none');
		//PAYPAL.apps.Checkout.startFlow(paypalURL);
		window.location.href=paypalURL;
		}
		else{
			if(shippingAddressMadatory=="true"){
			$('.securecheckout .payment .title-area .paymentstepicon').removeClass('done').addClass('pending active');
			cursor_wait();
			dojo.byId("confirmationFailed2").style.display = "none";
			dojo.byId("confirmationFailed1").style.display = "none";
			dojo.byId("confirmationFailed").style.display = "block";
			dojo.byId("displaymessage").value=paymentMessage;
			cursor_clear();
			}
			else if(shippingAddressMadatory=="false"){
				dojo.byId("displaywarningpay").style.display = "block";
				dojo.byId("displaymessagepayPal").innerHTML=paymentMessage;
			}
		}
	
	}
		,failureHandler: function(serviceResponse) {

			
		}

	}),
	

wc.service.declare({
		
		id: "AjaxPayPalConfirmOrder",
		actionId: "AjaxPayPalConfirmOrder",
		url: "OAFPattern",
		formId: ""
			,successHandler: function(serviceResponse) {
	var paymentMessage= serviceResponse.paymentMessage;
	
	var redirectURL = "OrderDeclineView?storeId=" + ServicesDeclarationJS.storeId
	   + "&langId=" + ServicesDeclarationJS.langId
	   + "&catalogId=" + ServicesDeclarationJS.catalogId
	+ "&payMethod=" + "payPal"


	
	if(paymentMessage=="NE"){
		dojo.byId("confirmationFailed2").style.display = "none";
		CheckoutPayments.confirmOrder();
		console.debug(" Success ");
	}
	else if(paymentMessage=="Order Decline")
	{
		cursor_wait();
		document.location.href = getAbsoluteURL()+redirectURL;	
		cursor_clear();
	}
	else
		{
		console.debug(" Failed");
		dojo.byId("loadingOverlay").style.display = "none";
		dojo.byId("confirmationFailed2").style.display = "block";	
		dojo.byId("displaymessage1").value=paymentMessage;
		}
}
		,failureHandler: function(serviceResponse) {

			
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
	})
	
	/**
	 * Emailing the order confirmation page.
	 */
	wc.service.declare({
		id: "AjaxOrderEmailConfirmation",
		actionId: "AjaxOrderEmailConfirmation",
		url: "OrderEmailConfirmControllerCmd",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			///MessageHelper.hideAndClearMessage();
			//MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_UPDATED"]);
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
		 * Displays an error message for catentry unavailabilty
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
	
	wc.service.declare({
		id: "AjaxCatentryUnavailabilitychk",
		actionId: "AjaxCatentryUnavailabilitychk",
		url: getAbsoluteURL() +"AjaxCatentryUnavailability",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			
			///MessageHelper.hideAndClearMessage();
			//MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_UPDATED"]);
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
wc.service.declare({
		id: "MPRInkToner",
		actionId: "MPRInkTonerId",
		url: getAbsoluteURL() +"MPRInkTonerSetFlagcmd",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
		
		
		location.reload(true);
		
			
			///MessageHelper.hideAndClearMessage();
			//MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_UPDATED"]);
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

	
	/* NewsLetter Subscription */
	
	wc.service.declare({
		id: "NewsLetterSubscriptionID",
		actionId: "NewsLetterSubscriptionActionID",
		url: getAbsoluteURL() +"ChkoutSubscription",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
		
		
		
			
			///MessageHelper.hideAndClearMessage();
			//MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_UPDATED"]);
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
	})
/***************ServicesDeclaration.js ends*****************/

/***************CheckoutHelper.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This file provides utility functions for the order check-out pages.
 */

dojo.require("dojox.collections.ArrayList");
dojo.require("wc.widget.Tooltip");


/**
 * The functions defined in this class are used for managing order information update during check-out.
 *
 * @class This CheckoutHelperJS class defines all the variables and functions for the page(s) used in the check-out process to udpate order related information, such as address, shipping method, shipping instruction, etc.
 *
 */
CheckoutHelperJS={

	/* Global variable declarations */

	/**
	 * This variable stores the ID of the language that the store currently uses. Its default value is set to -1, which corresponds to United States English.
	 * @private
	 */
	langId: "-1",

	/**
	 * This variable stores the ID of the current store. Its default value is empty.
	 * @private
	 */
	storeId: "",

	/**
	 * This variable stores the ID of the catalog. Its default value is empty.
	 * @private
	 */
	catalogId: "",

	/**
	 * This variable stores the ID of the order, in case the current shopping cart is not being used. Its default value is empty.
	 */
	 orderId: "",

	/**
	 * This variable stores the shipment type, either 1 for single shipment or 2 for multiple shipment. Its default value is set to empty.
	 * @private
	 */
	shipmentTypeId:"",


	/**
	 * This array stores the item IDs in an order. It is used to save the item IDs before an address is edited or created during the order check-out.
	 * @private
	 */
	orderItemIds:[],

	/**
	 * This constant stores the amount of time in milliseconds that the <code>updateCartWait</code> function needs to wait before updating the shopping cart.
	 * @private
	 * @constant
	 * @see CheckoutHelperJS.updateCartWait
	 */
	updateWaitTimeOut:1500,

	/**
	 * This array stores the number of key press events after a shopper has modified the quantity of an item in the shopping cart.
	 * @private
	 * @see CheckoutHelperJS.updateCartWait
	 */
	keyPressCount:{},

	/**
	 * This variable stores the true/false value that indicates if the 'AjaxCheckout' feature is enabled.
	 * When it is true, virtually all information on the order check-out pages is updated using services.
	 * It is set to true by default.
	 *
	 * @private
	 */
	ajaxCheckOut:true,

	/**
	 * This variable stores the true/false value that indicates if the 'SinglePageCheckout' feature is enabled/disabled.
	 * When it is true, both shipping and billing information are captured in a single page. If it is false, checkout will
	 * be a two step process where shipping is captured in first step and billing in second step.
	 * It is set to true by default.
	 *
	 * @private
	 */
	singlePageCheckout: true,

	/**
	 * This array stores the address ID before it is updated by the user during the order check-out.
	 * @private
	 */
	selectedAddressesArray:{},

	/**
	 * This array stores the values that indicate if the payment method input in a payment area has been changed by the user.
	 *
	 * @private
	 */
	dataDirty:{},

	/**
	 * This variable stores a value that indicates if the value of a shipping information related input field or the quantity of an item has been changed by the user.
	 * Its default value is set to false.
	 *
	 * @private
	 */
	fieldDirtyFlag:false,

	/**
	 * This constant stores the String value representing a date that the service understands to reset a requested shipping date.
	 * @private
	 * @constant
	 */
	resetRequestedShipDateValue:"1970-01-01T00:00:00.000Z",

	/**
	 * This variable stores the value that indicates if the current page is the Shopping Cart page. It is used to determine what page to redirect to after a service call has been successfully performed.
	 *
	 * @private
	 */
	shoppingCartPage:false,

	/**
	 * This variable stores the value that indicates if the current page is the pending order details page. It is used to determine what page to redirect to after a service call has been successfully performed.
	 *
	 * @private
	 */
	pendingOrderDetailsPage:false,

	/**
	 * This variable stores the value that indicates if the requested shipping date has recently been updated. It is used to determine if certain area of the page needs to be refreshed.
	 */
	RequestShippingDateAction:false,

	/**
		* Indicates whether the ShippingChargeType flexflow is enabled.
		*/
	shipChargeEnabled: false,

	/**
		* The order ID.
		*/
	tempOrderId: "",
	/**
		* The type of the current user.
		*/
	tempUserType: "",
	/**
		* The list of emails spearated by space. Order confirmation will be sent to these emails.
		*/
	tempEmailAddresses: "",
	/**
		* Indicates whether it is a Quote that is being checked out.
		*/
	tempIsQuote: false,

	/**
		* The current order total.
		*/
	tempOrderTotal: "0",

	cartCurrentId: "",
	previousQuantity: "",

	cartCurrentId: "",
	previousQuantity: "",
	
	/**
		* The payment instructions allocated in the order.
		*/
	tempPaymentInstructions: {},
	lastAddressLinkIdToFocus: "",
	lastFocusId: "",
	setLastFocus:function(id) {
		this.lastFocusId = id;
	},
	getLastFocus:function() {
		return this.lastFocusId;
	},
	tabPressed: function(event) {
		if (event.keyCode == 9) {
			tabPressed = true;
		}
	},
	setLastAddressLinkIdToFocus:function(lastLinkId) {
		this.lastAddressLinkIdToFocus = lastLinkId;
	},
	getLastAddressLinkIdToFocus:function() {
		return this.lastAddressLinkIdToFocus;
	},

	/**
		* Indicates whether the order is prepared already or not.
		*/
	orderPrepared: "false",

	/**
	 * Sets the orderPrepared variable to indicate whether the order has been through the OrderPrepare command or not. An order must be prepared before it can be submitted.
	 *
	 * @param {Boolean} inPrepareIndicator Whether or not the order has been prepared.
	 */
	setOrderPrepared:function(inPrepareIndicator){
		this.orderPrepared = inPrepareIndicator;
	},

	/**
	 * Returns whether or not the order is prepared.
	 */
	isOrderPrepared:function(){
		return this.orderPrepared;
	},

	/**
	 * Save some variables needed for re-calling checkoutOrder method after a service call.
	 *
	 * @param {Integer} orderId The order ID.
	 * @param {String} userType The type of the current user.
	 * @param {String} addressListForMailNotification The list of emails spearated by space. Order confirmation will be sent to these emails.
	 * @param {boolean} isQuote Optional parameter which indicates whether it is a Quote that is being checked out. If this parameter is not passed then it defaults to false.
	 */
	saveCheckoutOrderParameters:function(orderId,userType,addressListForMailNotification,isQuote){
		this.tempOrderId = orderId;
		this.tempUserType = userType;
		this.tempEmailAddresses = addressListForMailNotification;
		this.tempIsQuote = isQuote;
	},

	/**
	 * Sets some internal variables needed for verifying order totals.
	 *
	 * @param {Object} orderTotal The current order total.
	 * @param {Object} paymentInstructions The currently allocated payment instructions for the order.
	 */
	setOrderPayments:function(orderTotal,paymentInstructions){
		this.tempOrderTotal = orderTotal + 0;
		this.tempPaymentInstructions = paymentInstructions;
	},

	/**
	 * Returns whether or not the order total amount has been fully allocated with payment instructions.
	 */
	isOrderPaymentFullyAllocated:function(){
		var allocatedAmount = 0;
		if (this.tempPaymentInstructions.length >=1 ) {
			for (var i=0; i<this.tempPaymentInstructions.length; i++) {
				allocatedAmount = allocatedAmount + this.tempPaymentInstructions[i].amount.value;
			}
		}

		if (allocatedAmount == this.tempOrderTotal) {
			return true;
		} else {
			if (allocatedAmount < this.tempOrderTotal) {
				MessageHelper.displayErrorMessage(MessageHelper.messages["EDPPaymentMethods_CANNOT_RECONCILE_PAYMENT_AMT"]);
				return false;
			} else if (allocatedAmount > this.tempOrderTotal) {
				MessageHelper.displayErrorMessage(MessageHelper.messages["EDPPaymentMethods_PAYMENT_AMOUNT_LARGER_THAN_ORDER_AMOUNT"]);
				return false;
			} else {
				MessageHelper.displayErrorMessage(MessageHelper.messages["EDPPaymentMethods_PAYMENT_AMOUNT_PROBLEM"]);
				return false;
			}
		}
	},

	/**
	 * Returns the value of the internal variable with that name.
	 *
	 * @param {Object} paramName The value of the internal parameter.
	 */
	getSavedParameter:function(paramName){
		return this[paramName];
	},

	/**
	 * Sets the ShipChargeEnabled variable to indicate whether the ShippingChargeType feature is enabled.
	 *
	 * @param {Boolean} enabled This parameter is set to true if the ShippingChargeType feature is enabled.
	 */
	setShipChargeEnabled:function(enabled){
		this.shipChargeEnabled = enabled;
	},

	/**
	 * This function updates the input associative array params with the input key-value pair.
	 * If the toArray value is true, this function creates an associative array for duplicate entries; otherwise it overwrites the existing array.
	 * The function is used for updating input parameters before passing them to a service call.
	 *
	 * @param {Array} params The associative array to update.
	 * @param {String} key The key to search for in the array.
	 * @param {String} value The new value to update with when the key has been found in the array.
	 * @param {Boolean} toArray If the value is true, then the function creates a new array for duplicate entries. If the value is false, no new array will be created, the existing array will be overwritten.
	 * @param {Integer} index The index in the array in which the value should be updated.
	 *
	 * @returns {Array} params The updated associative array.
	 */
	updateParamObject:function(params, key, value, toArray, index){
		if(params == null){
			params = [];
		}

		if(params[key] != null && toArray){
			if(dojo.lang.isArrayLike(params[key])){
				//3rd time onwards
				if(index != null && index != ""){
					//overwrite the old value at specified index
					params[key][index] = value;
				}else{
					params[key].push(value);
				}
			}else{
				//2nd time
				var tmpValue = params[key];
				params[key] = [];
				params[key].push(tmpValue);
				params[key].push(value);
			}
		}else{
			//1st time
			if(index != null && index != "" && index != -1){
				//overwrite the old value at specified index
				params[key+"_"+index] = value;
			}else if(index == -1){
				var i = 1;
				while(params[key + "_" + i] != null){
					i++;
				}
				params[key + "_" + i] = value;
			}else{
				params[key] = value;
			}
		}
		return params;
	},


	/**
	 * This function shows or hides the request shipping date input field depending on the state of the corresponding checkbox.
	 * If the checkbox is unchecked, and the 'AjaxCheckout' feature is enabled, the <code>OrderItemAddressShipMethodUpdate</code> service will be called to update the shipping information.
	 *
	 * @param {String} checkBoxName The ID of the request shipping date checkbox.
	 * @param {String} divName The name of the div element that contains the request shipping date input field.
	 * @param {String} suffix The suffix that is appended after the divName. It is usually the order item ID.
	 */
	checkRequestShippingDateBox:function(checkBoxName, divName, suffix){
		var thisCheckBoxName;
		var thisDivName;

		if(suffix != null && suffix != ""){
			checkBoxName = checkBoxName + "_" + suffix;
			divName = divName + "_" + suffix;
		}

		var checkBox = dojo.byId(checkBoxName);

		if(checkBox.checked){
			dojo.byId(divName).style.visibility = "visible";
			dojo.byId(divName).style.display = "block";
		}else{
			// If the checkbox is unchecked, hide the input field
			dojo.byId(divName).style.visibility = "hidden";
			dojo.byId(divName).style.display = "none";
			if(this.shipmentTypeId == "1"){
				dojo.byId("requestedShippingDate").blur();
			}else if(this.shipmentTypeId == "2"){
				dojo.byId("MS_requestedShippingDate_" + suffix).blur();
			}
		}

		var addressId, shipModeId = "";
		if(this.shipmentTypeId == "1"){
			addressId = document.getElementById("singleShipmentAddress").value;
			shipModeId = document.getElementById("singleShipmentShippingMode").value;
		}else if(this.shipmentTypeId == "2"){
			addressId = document.getElementById("MS_ShipmentAddress_" + suffix).value;
			shipModeId = document.getElementById("MS_ShippingMode_" + suffix).value;
		}else{
			console.debug("shipmentTypeId is undefined. Single shipment has Id 1; multiple shipment has Id 2.");
		}

		// Delete the requestedShippingDate if the checkBox is unchecked and the checkout flow is AJAX
		if(!checkBox.checked && this.isAjaxCheckOut()){
			var params = [];
			params["storeId"] = this.storeId;
			params["catalogId"] = this.catalogId;
			params["langId"] = this.langId;
			params.orderId = ".";

			this.updateParamObject(params, "addressId", addressId, false, -1);
			this.updateParamObject(params, "shipModeId", shipModeId, false, -1);

			if(dijit.byId("requestedShippingDate") != null || dijit.byId("MS_requestedShippingDate_" + suffix) != null){
				this.updateParamObject(params, "requestedShipDate", this.resetRequestedShipDateValue, false, -1);
			}

			var orderItemId = null;
			var qty = -1;
			var totalItems = document.getElementById("totalNumberOfItems").value;
			for(var i = 0; i < totalItems; i++){
				if (document.getElementById("qty_" + (i+1)) != null) {
					qty = document.getElementById("qty_" + (i+1)).value;
				}
				orderItemId = document.getElementById("orderItem_" + (i+1)).value;
				// we need atleast one orderItemId..this is the limitation of order service..
				if(qty != -1){
					if(this.shipmentTypeId == "1"){
						// Single Shipment
						this.updateParamObject(params, "orderItemId", orderItemId, false, -1);
						break;
					}else if(this.shipmentTypeId == "2"){
						// Multiple Shipment
						if(suffix != null && suffix != "" && orderItemId == suffix){
							this.updateParamObject(params, "orderItemId", orderItemId, false, -1);
							break;
						}
					}else{
						console.debug("shipmentTypeId is undefined. Single shipment has Id 1; multiple shipment has Id 2.");
					}
				}
			}

			//For handling multiple clicks
			if(!submitRequest()){
				return;
			}
			cursor_wait();
			CheckoutHelperJS.RequestShippingDateAction = true;
			wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
		}
	},


	/**
	 * This function shows or hides the shipping instruction input field depending on the state of the corresponding checkbox.
	 * If the checkbox is unchecked, and the 'AjaxCheckout' feature is enabled, the <code>OrderShippingInfoUpdate</code> service will be called to update the shipping information.
	 * Note that order items that have the same ship-to address and shipping method will share the same shipping instruction.
	 *
	 * @param {String} checkBoxName The ID of the shipping instruction checkbox.
	 * @param {String} divName The name of the div element that contains the shipping instruction input field.
	 * @param {String} suffix The suffix that is appended after the divName. It is usually the order item ID.
	 */
	checkShippingInstructionsBox:function(checkBoxName,divName,suffix){
		//var divName = "shippingInstructionsDiv";
		var thisCheckBoxName;
		var thisDivName;

		if(suffix != null && suffix != ""){
			thisCheckBoxName = checkBoxName + "_" + suffix;
			thisDivName = divName + "_" + suffix;
		}else{
			thisCheckBoxName = checkBoxName;
			thisDivName = divName;
		}

		var thisCheckBox = dojo.byId(thisCheckBoxName);

		if(thisCheckBox.checked){
			dojo.byId(thisDivName).style.visibility = "visible";
			dojo.byId(thisDivName).style.display = "block";
		}else{
			// If the checkbox is unchecked, hide the input field
			dojo.byId(thisDivName).style.visibility = "hidden";
			dojo.byId(thisDivName).style.display = "none";
		}

		// Update other shipping instructions div with same addressId and shipModeId..
		var addressId, shipModeId = "";
		if(this.shipmentTypeId == "1"){
			addressId = document.getElementById("singleShipmentAddress").value;
			shipModeId = document.getElementById("singleShipmentShippingMode").value;
		}else if(this.shipmentTypeId == "2"){
			var orderItemId,tempAddressId,tempShipModeId = "";

			//get current div's shipModeId and addressId..
			addressId = document.getElementById("MS_ShipmentAddress_"+suffix).value;
			shipModeId = document.getElementById("MS_ShippingMode_"+suffix).value;

			var totalItems = document.getElementById("totalNumberOfItems").value;
			for(var i = 0; i < totalItems; i++){
				if(document.getElementById("qty_"+(i+1)) != null && document.getElementById("qty_"+(i+1)).value != -1){
					orderItemId = document.getElementById("orderItem_"+(i+1)).value;
					tempAddressId = document.getElementById("MS_ShipmentAddress_" + orderItemId).value;
					tempShipModeId = document.getElementById("MS_ShippingMode_" + orderItemId).value;
					if(tempShipModeId == shipModeId && tempAddressId == addressId){
						var tempDivName = divName + "_" + orderItemId;
						var tempCheckBoxName = checkBoxName + "_" + orderItemId;
						if(thisCheckBox.checked){
							dojo.byId(tempDivName).style.visibility = "visible";
							dojo.byId(tempDivName).style.display = "block";
							dojo.byId(tempCheckBoxName).checked = "checked";
						}
						else{
							//User doesnt want to specify shipping instructions and requested ship date..hide this div..
							dojo.byId(tempDivName).style.visibility = "hidden";
							dojo.byId(tempDivName).style.display = "none";
							dojo.byId(tempCheckBoxName).checked = "";
						}
					}
				}
			}
		}else{
			console.debug("shipmentTypeId is undefined. Single shipment has Id 1; multiple shipment has Id 2.");
		}

		// Delete shippingInstructions if the checkBox is unchecked and the checkout flow is AJAX
		if(!thisCheckBox.checked && this.isAjaxCheckOut()){
			var params = [];
			params["storeId"] = this.storeId;
			params["catalogId"] = this.catalogId;
			params["langId"] = this.langId;
			params.orderId = ".";

			var orderItemId = null;
			if(this.shipmentTypeId == "1"){
				if(document.getElementById("shipInstructions") != null){
					this.updateParamObject(params, "shipInstructions", "", false);
					document.getElementById("shipInstructions").value = "";
				}
				orderItemId = document.getElementById("orderItem_1").value;
				this.updateParamObject(params, "addressId", addressId, false);
				this.updateParamObject(params, "orderItemId", orderItemId, false);

			} else if(this.shipmentTypeId == "2"){
				if(suffix != null && suffix != ""){
					if(document.getElementById("MS_shipInstructions_" + suffix) != null){
						this.updateParamObject(params, "shipInstructions", "", false);
						document.getElementById("MS_shipInstructions_" + suffix).value = "";
					}
					this.updateParamObject(params, "addressId", addressId, false, -1);
					this.updateParamObject(params, "orderItemId", suffix, false);
					this.setShippingInstuctionsForAllOtherItems(addressId,shipModeId,"");
				}
			} else {
				console.debug("shipmentTypeId is undefined. Single shipment has Id 1; multiple shipment has Id 2.");
			}

			//For handling multiple clicks
			if(!submitRequest()){
				return;
			}
			cursor_wait();
			wc.service.invoke("OrderShippingInfoUpdate", params);
		}
	},


	/**
	 * This function sets the shipment type for the current page.
	 *
	 * @param {Integer} shipmentTypeId The shipment type ID, 1 for single shipment or 2 for multiple shipment.
	 *
	 * @see CheckoutHelperJS.getShipmentTypeId
	 */
	initializeShipmentPage:function(shipmentTypeId){
		this.shipmentTypeId = shipmentTypeId;
	},


	/**
	 * This function sets the common parameters for the current page, i.e. language ID, store ID and catalog ID.
	 *
	 * @param {Integer} langId The ID of the language that the store currently uses.
	 * @param {Integer} storeId The ID of the current store.
	 * @param {Integer} catalogId The ID of the catalog.
	 */
	setCommonParameters:function(langId,storeId,catalogId){
		this.langId = langId;
		this.storeId = storeId;
		this.catalogId = catalogId;
	},


	/**
	 * This function deletes an order item from the shopping cart.
	 * If forWishlist is true, then the item is added to the wish list subsequently by calling the <code>AjaxDeleteOrderItemFromCart</code> service.
	 *
	 * @param {Integer} orderItemId The ID of the order item to delete.
	 * @param {Boolean} forWishlist If the value is true, then the item is added to the wish list.
	 */
	deleteFromCart:function(orderItemId,forWishlist){
		//if(!this.isAjaxCheckOut())return;

		var params = [];
		params.storeId = this.storeId;
		params.catalogId = this.catalogId;
		params.langId = this.langId;
		params.orderId = (this.orderId != null && this.orderId != 'undefined' && this.orderId != "")?this.orderId:".";
		params.orderItemId = orderItemId;

		if(this.shoppingCartPage){
			params.calculationUsage = "-1,-2,-5,-6,-7";
		}else{
			params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		}
		params.check="*n";

		var x = document.getElementById("totalNumberOfItems").value;
		var y = x;
		//Now remove free items from this total number of items count..
		//x = total items and y = totalItems - totalFreeItems
		for(var i = 0; i < x; i++){
			var qtyObj = document.getElementById("freeGift_qty_"+(i+1));
			if (qtyObj!=null || qtyObj != undefined) {
				qty = qtyObj.value;
				if(qty!=null && qty!=undefined && qty == -1){
					y = y - 1;
				}
			}

		}

		if(!this.shoppingCartPage){

		var Items = document.getElementById("lineOfItemsID").value; }
	
		//For handling multiple clicks
		if(!submitRequest()){
			//return;
		}
		cursor_wait();
		if(y == 1 && this.shoppingCartPage){
			wc.service.invoke("AjaxDeleteOrderItem1", params);
		}else{
			if(forWishlist){
				wc.service.invoke("AjaxDeleteOrderItemFromCart", params);
			}else{
				if(this.shoppingCartPage || this.pendingOrderDetailsPage){
					wc.service.invoke("AjaxDeleteOrderItem", params);
				}else{
					if(Items==1)
					wc.service.invoke("AjaxDeleteOrderItem1", params);
					else{
					wc.service.invoke("AjaxDeleteOrderItemForShippingBillingPage", params);
				}

				}
			}
		}
	},


	/**
	 * This function deletes an order item from the shopping cart then adds it to the wish list by calling the <code>AjaxInterestItemAddAndDeleteFromCart</code> service.
	 * It is used for the "Move to Wish List" button.
	 *
	 * @param {Integer} catEntryIdentifier The ID of the catalog entry.
	 * @param {Integer} orderItemId The ID for the order item to remove.
	 */
	addToWishListAndDeleteFromCart:function(catEntryIdentifier,orderItemId){
		if(!this.isAjaxCheckOut())return;

		var params = [];
		params.catEntryId = catEntryIdentifier;
		params.URL = "SuccessfulAJAXRequest";
		params.orderItemId = orderItemId;
		params.updateable	= 0;
		params.langId = this.langId;
		params.storeId = this.storeId;
		params.catalogId = this.catalogId;
		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("AjaxInterestItemAddAndDeleteFromCart", params);
	},


	/**
	 * This function is used to update the ship-to address ID of all items in the current order when the user chooses to add a new address during order check-out.
	 * This function calls the <code>AjaxUpdateOrderItemsAddressId</code> service.
	 *
	 * @param {Integer} addressId The ID of the newly created address.
	 */
	updateAddressIdOFItemsOnCreateEditAddress:function(addressId){
		var params = [];
		params.orderId = ".";
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";
		if(this.shipmentTypeId == "1"){
			params.addressId = addressId;
		} else {
			var orderItemId = null;
			for(var i = 0; i < this.orderItemIds.length; i++){
				orderItemId = this.orderItemIds[i];
				this.updateParamObject(params,"orderItemId",orderItemId,false,-1);
				this.updateParamObject(params,"addressId",addressId,false,-1);
			}
		}

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("AjaxUpdateOrderItemsAddressId", params);
	},


	/**
	 * This function is used to save the current order items list when the user edits an existing address or creates a new address during order check-out.
	 *
	 * @param {Integer} orderItemId The order item ID.
	 * @param {String} addressId The ID of the address.
	 *
	 * @private
	 */
	saveOrderItemsList:function(orderItemId,addressId){
		if(orderItemId == '-1'){
			//Creating or editing shipping address for single shipment, get all the orderItemIds in the order..

			var totalItems = document.getElementById("totalNumberOfItems").value;
			for(var i = 0; i < totalItems; i++){
				this.orderItemIds[i] = document.getElementById("orderItem_"+(i+1)).value;
			}
		}else if(orderItemId == 0 && this.shipmentTypeId == "1"){
			// Editing or creating billing address.. If it's single shipment type, then we need to save all orderItem Id's.
			// If the shipping address is same as this billing address which is edited, then after editing this addressId will change, so we need to update the orderItemIds.

			if (document.getElementById("singleShipmentAddress")) {
				if(addressId == document.getElementById("singleShipmentAddress").value){
					var totalItems = document.getElementById("totalNumberOfItems").value;
					for(var i = 0; i < totalItems; i++){
						this.orderItemIds[i] = document.getElementById("orderItem_"+(i+1)).value;
					}
				}else {
					this.orderItemIds = [];
				}
			} else {
				this.orderItemIds = [];
			}
			return;
		}else{
			// OrderItemId is passed..so it's multiple shipment, get all the orderItemIds with the same address...
			// This section is for multiple shipment and create/edit both shipping/billing address...
			var totalItems = document.getElementById("totalNumberOfItems").value;
			var temp = null;
			var orderItemId = null;
			var j = 0;

			//saving orderItemIds (used by this.updateAddressIdOFItemsOnCreateEditAddress) for  the'edit address' link
			for(var i = 0; i < totalItems; i++){
				orderItemId = document.getElementById("orderItem_"+(i+1)).value;
				if (document.getElementById("MS_ShipmentAddress_"+orderItemId)){
					temp = document.getElementById("MS_ShipmentAddress_"+orderItemId).value;
					//addressId is -1 if 'create address' is clicked. The following if will always return false in that case.
					if(temp == addressId){
						//Add this to our list..
						this.orderItemIds[j++] = orderItemId;
					}
				}
			}
		}
	},


	/**
	 * By convention, all items in an order that have the same shipping address and shipping mode share the same shipping instruction.
	 * This function is used to update the shipping instruction of all items that have the same shipping address and shipping mode.
	 *
	 * @param {Integer} addressId The shipping address ID.
	 * @param {Integer} shipModeId The shipping mode ID.
	 * @param {String} shipInstructions The shipping instruction.
	 */
	setShippingInstuctionsForAllOtherItems:function(addressId,shipModeId,shipInstructions){

		var orderItemId,addressId1,shipModeId1 = "";
		var totalItems = document.getElementById("totalNumberOfItems").value;
		for(var i = 0; i < totalItems; i++){
			if(document.getElementById("qty_"+(i+1)) != null && document.getElementById("qty_"+(i+1)).value != -1){
				orderItemId = document.getElementById("orderItem_"+(i+1)).value;
				addressId1 = document.getElementById("MS_ShipmentAddress_"+orderItemId).value;
				shipModeId1 = document.getElementById("MS_ShippingMode_"+orderItemId).value;
				if(shipModeId1 == shipModeId && addressId1 == addressId){
					document.getElementById("MS_shipInstructions_"+orderItemId).value = shipInstructions;
				}
			}
		}
	},


	/**
	 * When a user toggles the 'ship as complete' checkbox, the same will be updated at the server side by invoking the <code>OrderShippingInfoUpdate</code> service.
	 * This function is used when the 'AjaxCheckout' feature is enabled.
	 *
	 * @param {DOM Element} checkBox The 'ship as complete' checkbox object.
	 */
	shipAsComplete:function(checkBox){
		if(!this.isAjaxCheckOut())return;
		var params = [];
		params.orderId = ".";
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		if(checkBox.checked){
			this.updateParamObject(params,"ShipAsComplete","Y",true);
		}else{
			this.updateParamObject(params,"ShipAsComplete","N",true);
		}
		orderItemId = document.getElementById("orderItem_1").value;
		this.updateParamObject(params,"orderItemId",orderItemId,false);

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderShippingInfoUpdate", params);
	},


	/**
	 * When there is an invalid address ID in an order, this function updates all items to use the valid address ID by invoking the <code>AjaxSetAddressIdOfOrderItems</code> service.
	 *
	 * @param {Integer} addressId A valid address ID.
	 */
	//Changed by Jayashree for implementing the exception handling scenario in check out page
	updateAddressIdForOrderItem:function(addressId){
		if(addressId == null || addressId.length == 0){
			return true;
		}

		// callcenter order capture flow - START
		CallcenterCommonJS.callOrderLockHelper (this.storeId, 'N');
		// callcenter order capture flow - END
		
		var params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		this.updateParamObject(params,"addressId",addressId,false);
		wc.service.invoke("AjaxSetAddressIdOfOrderItems", params);
	},


	/**
	 * When there is an invalid shipping mode ID in an order, this function updates all items to use the valid shipping mode ID by invoking the <code>AjaxSetShipModeIdForOrder</code> service.
	 *
	 * @param {Integer} shipModeId A valid shipping mode ID.
	 */
	updateShipModeIdForOrder:function(shipModeId){
		// callcenter order capture flow - START
		CallcenterCommonJS.callOrderLockHelper (this.storeId, 'N');
		// callcenter order capture flow - END
		var params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params["shipModeId"] = shipModeId;
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";
		wc.service.invoke("AjaxSetShipModeIdForOrder", params);
	},


	/**
	 * This function is used to apply a promotion code to the order.
	 *
	 * @param {String} formName	The name of the promotion code entry form.
	 * @param {String} returnView	The name of the view that the server should redirect the browser to after a promotion code is applied.
	 */
	applyPromotionCode:function(formName,returnView) {
		var form = document.forms[formName];
		//Decfect:44773- coupon casing:coupon will also be created in UpperCase,
		//so converting User's Coupon/promotion code input to uppercase -- START

		var promotionCode = trim(form.promoCode.value);
	//commented as per  defect 156326    
		//promotionCode = promotionCode.toUpperCase();

		form.promoCode.value = promotionCode;
		//Decfect:44773- coupon casing:coupon will also be created in UpperCase,
		//so converting User's Coupon/promotion code input to uppercase -- END

		if (trim(form.promoCode.value) == "") {
			//Defect42963, empty check message display start
			document.getElementById('promotionMessage').focus();
			$('#promoCode').addClass('error');
			$("#promotionMessage").text("Field is empty. Please enter your coupon code");
			//Defect42963, empty check message display end

			//MessageHelper.formErrorHandleClient(form.promoCode.id, MessageHelper.messages["PROMOTION_CODE_EMPTY"]);
			return;
		}
		
		if(this.isAjaxCheckOut()){
			service = wc.service.getServiceById('AjaxPromotionCodeManage');
			service.formId = formName;
			//URL is required for web1.0 style of request.. if defined, set them back to null so that it works
			//well with ajax style requests...
			if (form.URL != null ){
				form.URL.value = "";
			}

			//For handling multiple clicks
			if(!submitRequest()){
				//return;
			}
			cursor_wait();
			wc.service.invoke('AjaxPromotionCodeManage');
		}else{
			//Invoke normal web1.0 kind of server call..submit the PromotionCodeForm..
			//we need errorViewName in web1.0 style of request..if we define it directly in form, then when we use web2.0 style of
			//request it wont work..it submits to this errorView instead of AjaxActionErrorResponse. So define it here..
			if(returnView == null || returnView == "" || returnView == "undefined"){
				returnView = "OrderShippingBillingView";
			}
			var input = document.createElement("INPUT");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", "errorViewName");
			input.setAttribute("value", returnView);
			form.appendChild(input);
			form.URL.value = "OrderCalculate?updatePrices=1&calculationUsageId=-1&calculationUsageId=-2&calculationUsageId=-7&URL="+returnView;

			//For handling multiple clicks
			if(!submitRequest()){
				return;
			}

			form.submit();
		}
	},


	/**
	 * This function is used to remove a promotion code from the order.
	 *
	 * @param {String} formName	The name of the promotion code entry form.
	 * @param {String} promoCode	The promotion code to remove.
	 * @param {String} returnView	The name of the view that the server should redirect the browser to after a promotion code is applied.
	 */
	removePromotionCode:function(formName, promoCode,returnView) {
		var form = document.forms[formName];
		form.taskType.value='R';
		form.promoCode.value=promoCode;
		
		if(this.isAjaxCheckOut()){
			service = wc.service.getServiceById('AjaxPromotionCodeManage');
			service.formId = formName;

			//For handling multiple clicks
			if(!submitRequest()){
				//return;
			}
			cursor_wait();
			wc.service.invoke('AjaxPromotionCodeManage');
		}else{
			if(returnView == null || returnView == "" || returnView == "undefined"){
				returnView = "OrderShippingBillingView";
			}
			//Invoke normal web1.0 kind of server call..submit the PromotionCodeForm..
			form.URL.value = "OrderCalculate?updatePrices=1&calculationUsageId=-1&calculationUsageId=-2&calculationUsageId=-7&URL="+returnView;

			//For handling multiple clicks
			if(!submitRequest()){
				return;
			}
			form.submit();
		}
	},


	/**
	 * If a customer has a coupon in his/her coupon wallet that has not been applied to an order then this function can be used to apply that coupon to the current order.
	 *
	 * @param {String} formName The name of the form that performs the action to apply the coupon, and holds the parameters to pass to the service.
	 * @param {String} returnView The view to return to after the request has been processed.
	 * @param {Integer} couponId The unique ID of the coupon. This is set into the form to be sent to the service.
	 */
	applyCoupon:function(formName,returnView,couponId)
	{
		var form = document.forms[formName];
		form.setAttribute('action', 'CouponsAddRemove');
		form.couponId.value = couponId;
		form.taskType.value= "A";

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		if(this.isAjaxCheckOut())
		{
			service = wc.service.getServiceById('AjaxCouponsAddRemove');
			service.formId = formName;
			cursor_wait();
			wc.service.invoke('AjaxCouponsAddRemove');
		}
		else
		{
			form.URL.value = "OrderCalculate?updatePrices=1&calculationUsageId=-1&calculationUsageId=-2&calculationUsageId=-7&URL="+returnView;
			form.submit();
		}
	},


	/**
	 * If a customer has a coupon in his/her coupon wallet that has been applied to an order then this function can be used to remove that coupon from the current order.
	 *
	 * @param {String} formName The name of the form that performs the action to remove the coupon from the order, and holds the parameters to pass to the service.
	 * @param {String} returnView The view to return to after the request has been processed.
	 * @param {Integer} couponId The unique ID of the coupon. This is set into the form to be sent to the service.
	 */
	removeCouponFromOrder:function(formName,returnView,couponId)
	{
		var form = document.forms[formName];
		form.setAttribute('action', 'CouponsAddRemove');
		form.couponId.value = couponId;
		form.taskType.value= "R";

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		if(this.isAjaxCheckOut())
		{
			service = wc.service.getServiceById('AjaxCouponsAddRemove');
			service.formId = formName;
			cursor_wait();
			wc.service.invoke('AjaxCouponsAddRemove');
		}
		else
		{
			form.URL.value = "OrderCalculate?updatePrices=1&calculationUsageId=-1&calculationUsageId=-2&calculationUsageId=-7&URL="+returnView;
			form.submit();
		}
	},


	/**
	 * Sets the ajaxCheckOut variable to indicate if the 'AjaxCheckout' feature is enabled.
	 *
	 * @param {Boolean} ajaxCheckOut A true/false value that indicates if the 'AjaxCheckout' feature is enabled.
	 *
	 * @see CheckoutHelperJS.isAjaxCheckOut
	 */
	setAjaxCheckOut:function(ajaxCheckOut){
		this.ajaxCheckOut = ajaxCheckOut;
	},


	/**
	 * Returns the ajaxCheckOut variable that indicates if the 'AjaxCheckout' feature is enabled.
	 *
	 * @returns {Boolean} ajaxCheckOut A true/false value that indicates if the 'AjaxCheckout' feature is enabled.
	 *
	 * @see CheckoutHelperJS.setAjaxCheckOut
	 */
	isAjaxCheckOut:function(){
		return this.ajaxCheckOut;
	},


	/**
	 * Sets the SinglePageCheckout variable to indicate if the 'SinglePageCheckout' feature is enabled or disabled.
	 *
	 * @param {Boolean} singlePageCheckout. A true/false value that indicates if the 'SinglePageCheckout' feature is enabled.
	 *
	 * @see CheckoutHelperJS.isSinglePageCheckout
	 */
	setSinglePageCheckout:function(singlePageCheckout){
		this.singlePageCheckout = singlePageCheckout;
	},


	/**
	 * Returns the singlePageCheckout variable that indicates if the 'SinglePageCheckout' feature is enabled/disabled.
	 *
	 * @returns {Boolean} singlePageCheckout A true/false value that indicates if the 'SinglePageCheckout' feature is
	 * enabled/disabled.
	 *
	 * @see CheckoutHelperJS.setSinglePageCheckout
	 */
	isSinglePageCheckout:function(){
		return this.singlePageCheckout;
	},


	/**
	 * This function is used to submit the order by invoking the <code>AjaxSubmitOrder</code> service.
	 *
	 * @param {Integer} orderId The order ID.
	 * @param {String} userType The type of the current user.
	 * @param {String} addressListForMailNotification The list of emails separated by space. Order confirmation will be sent to these emails.
	 * @param {boolean} isQuote Optional parameter which indicates whether it is a Quote that is being checked out. If this parameter is not passed then it defaults to false.
	 */
	checkoutOrder:function(orderId,userType,addressListForMailNotification,isQuote){
		
		//callcenter starts
		
		var orderComments ;	
		
		// callcenter order capture flow - START
		CallcenterCommonJS.callOrderLockHelper (this.storeId, 'N');
		// callcenter order capture flow - END
		
		
		//callcenter starts - Moved to checkoutpayments.js
	/*	var orderComments ;	
		if(dojo.byId("orderComment")){		
			orderComments = dojo.byId("orderComment").value;			
			if(orderComments){
		
				params =[];
				params["orderId"] = orderId;
				params["orderComment"] = orderComments;
				params["storeId"] = this.storeId;
				
				wc.service.invoke("AjaxSubmitOrderComments",params);
			}
		}*/
		//callcenter ends

		if (isQuote == undefined || isQuote == null){
			isQuote = false;
		}
		if(addressListForMailNotification=="" || addressListForMailNotification == undefined || addressListForMailNotification == null){
			addressListForMailNotification = document.getElementById("confirmationemailinput").value;
		}


		if (this.isOrderPrepared() == "false") {

			if (this.isOrderPaymentFullyAllocated()) {
				this.saveCheckoutOrderParameters(orderId,userType,addressListForMailNotification,isQuote);
				wc.service.invoke("AjaxPrepareOrderForSubmit");
				return;
			} else {
				return;
			}
		}

		params = [];
		params["orderId"] = orderId;
		params["notifyMerchant"] = 1;
		params["notifyShopper"] = 1;
		params["notifyOrderSubmitted"] = 1;
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;

		var purchaseOrderForm = document.forms["purchaseOrderNumberInfo"];
		if (purchaseOrderForm) {
			var purchaseOrderNumber = purchaseOrderForm.purchase_order_number.value;
			if(purchaseOrderForm.purchaseOrderNumberRequired.value == 'true' && purchaseOrderForm.purchase_order_number.value == ""){
				MessageHelper.formErrorHandleClient(purchaseOrderForm.purchase_order_number,MessageHelper.messages["ERROR_PONumberEmpty"]);
				return;
			}
			else if(!MessageHelper.isValidUTF8length(purchaseOrderForm.purchase_order_number.value, 128)){
				MessageHelper.formErrorHandleClient(purchaseOrderForm.purchase_order_number,MessageHelper.messages["ERROR_PONumberTooLong"]);
				return;
			}
		}
		params["purchaseorder_id"] = purchaseOrderNumber;
		//if(userType == 'G'){
			//addressListForMailNotification contains list of emailId's spearated by space.. remove leading or trailing spaces..
			addressListForMailNotification = trim(addressListForMailNotification);

			//Get the space separated email list in an array...
			var emailList = [];
			emailList = addressListForMailNotification.split(" ");

			//Now from this array, remove repeated email Id's.. keep only unique email Id's
			var uniqueList = [];
			for(var j = 0; j < emailList.length; j++){
				uniqueList[emailList[j]] = emailList[j];
			}

			//Get the total length of unique email id's list..
			var totalLength = 0;
			for(i in uniqueList){
				totalLength = totalLength + 1;
			}

			//Convert the unique List array into comma separated values...
			var temp = "";
			var k = 0;
			for(i in uniqueList){
				k = k + 1;
				temp = temp + uniqueList[i];
				if( k < totalLength){
					//If not last value, add , before next value..
					temp = temp + ",";
				}
			}
			//For guest user send the email list..
			params["notify_EMailSender_recipient"] = temp;

			//setup sms phone for service
			var smsOrderNotificationCheckbox = document.getElementById("sendMeSMSNotification");
			if (smsOrderNotificationCheckbox != null && smsOrderNotificationCheckbox != "undefined") {
				if (smsOrderNotificationCheckbox.checked) {
					var mobileCountryCode = document.getElementById("mobileCountryCode");
					var mobilePhone1 = document.getElementById("mobilePhone1");
					if (mobileCountryCode != null && mobileCountryCode != "undefined" && mobilePhone1 != null && mobilePhone1 != "undefined") {
						params["SMS"] = mobileCountryCode.value + mobilePhone1.value;
					}
				}
			}
		//}


		//For handling multiple clicks -- handled in checkoutpayment
		/*if(!submitRequest()){
			return;
		}
		cursor_wait();*/

		ServicesDeclarationJS.setCommonParameters(this.langId,this.storeId,this.catalogId);

		if (!isQuote){
			wc.service.invoke("AjaxSubmitOrder",params);
		} else{
			params["URL"] = "";
			this.setOrderId(orderId);
			wc.service.invoke("AjaxSubmitQuote",params);
		}
	},


	/**
	 * Validates the scheduled start date and sets the cookies that are used to retrieve the start date and interval of a scheduled order.
	 */
	prepareOrderSchedule:function(){
		if(document.getElementById("scheduleOrderInputSection") != null){
			var scheduleOrderStartDateObj = dijit.byId("ScheduleOrderStartDate");
			if(!this.validateDate(scheduleOrderStartDateObj, 'ScheduleOrderStartDate')){
				return;
			}

			var interval = dojo.byId("ScheduleOrderFrequency").value;

			var key1 = "WC_ScheduleOrder_" + document.getElementById("orderIdToSchedule").value + "_strStartDate";
			var key2 = "WC_ScheduleOrder_" + document.getElementById("orderIdToSchedule").value + "_interval";

			if((interval == "undefined") && (scheduleOrderStartDateObj.value == null)){
				// if the order interval is '' and the specified start date is empty, remove the cookies
				dojo.cookie(key1, null, {expires: -1});
				dojo.cookie(key2, null, {expires: -1});
			}else{
				var t = dojo.date.stamp.fromISOString(scheduleOrderStartDateObj);
				var now = new Date();

				t.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

				// set start date in zulu time, from dojo: zulu - if true, UTC/GMT is used for a timezone
				t = dojo.date.stamp.toISOString(t, {selector: "%Y-%m-%dT%H:%m:%S.%SZ", zulu: true,milliseconds:true});
				dojo.cookie(key1, t, {path: "/"});
				dojo.cookie(key2, interval, {path: "/"});
			}
		}
	},


	/**
	 * Schedules an order.
	 *
	 * @param {Integer} orderId The order ID of the scheduled order.
	 * @param {String} isRecurring The flag to identify a recurring order.
	 * @param {String} userType The type of the user.
	 */
	scheduleOrder:function(orderId, isRecurring, userType){
		if(userType === "G" && isRecurring){
			MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_GUEST_USER_SUBMIT_RECURRING_ORDER"]);
				return;
		}
		var params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params["orderId"] = orderId;
		if(isRecurring != undefined && isRecurring == true)
		{
			params["startDate"] = dojo.cookie("WC_ScheduleOrder_" + orderId + "_strStartDate");
			if(dojo.cookie("WC_ScheduleOrder_" + orderId + "_interval") == '1'){
				params["fulfillmentInterval"] = '1';
				params["fulfillmentIntervalUOM"] = 'DAY';
				params["timePeriod"] = '1';
				params["timePeriodUOM"] = 'DAY';
			}
			else if(dojo.cookie("WC_ScheduleOrder_" + orderId + "_interval") == '2'){
				params["fulfillmentInterval"] = '1';
				params["fulfillmentIntervalUOM"] = 'DAY';
			}
			else if(dojo.cookie("WC_ScheduleOrder_" + orderId + "_interval") == '3'){
				params["fulfillmentInterval"] = '1';
				params["fulfillmentIntervalUOM"] = 'WEE';
			}
			else if(dojo.cookie("WC_ScheduleOrder_" + orderId + "_interval") == '4'){
				params["fulfillmentInterval"] = '2';
				params["fulfillmentIntervalUOM"] = 'WEE';
			}
			else if(dojo.cookie("WC_ScheduleOrder_" + orderId + "_interval") == '5'){
				params["fulfillmentInterval"] = '3';
				params["fulfillmentIntervalUOM"] = 'WEE';
			}
			else if(dojo.cookie("WC_ScheduleOrder_" + orderId + "_interval") == '6'){
				params["fulfillmentInterval"] = '4';
				params["fulfillmentIntervalUOM"] = 'WEE';
			}
		}
		else{
			params["strStartDate"] = dojo.cookie("WC_ScheduleOrder_" + orderId + "_strStartDate");
			params["interval"] = dojo.cookie("WC_ScheduleOrder_" + orderId + "_interval");
		}


		var purchaseOrderForm = document.forms["purchaseOrderNumberInfo"];
		if (purchaseOrderForm) {
			var purchaseOrderNumber = purchaseOrderForm.purchase_order_number.value;
			if(purchaseOrderForm.purchaseOrderNumberRequired.value == 'true' && purchaseOrderForm.purchase_order_number.value == ""){
				MessageHelper.formErrorHandleClient(purchaseOrderForm.purchase_order_number,MessageHelper.messages["ERROR_PONumberEmpty"]);
				return;
			}
			else if(!MessageHelper.isValidUTF8length(purchaseOrderForm.purchase_order_number.value, 128)){
				MessageHelper.formErrorHandleClient(purchaseOrderForm.purchase_order_number,MessageHelper.messages["ERROR_PONumberTooLong"]);
				return;
			}
			params["purchaseorder_id"] = purchaseOrderNumber;
		}

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		if(isRecurring != undefined && isRecurring == true)
		{
			wc.service.invoke("SubmitRecurringOrder", params);
		}
		else{
			wc.service.invoke("ScheduleOrder", params);
		}
	},


	/**
	 * Checks if a date occurred in the past.
	 *
	 * @param {Object} dateObj The date object to be validated.
	 * @param {String} elementId The ID of the element that an error message would be attached to.
	 */
	validateDate: function(dateObj, elementId){
		var now = new Date();
		if(dateObj.getValue() != null && (dateObj.compare(dateObj.getValue(), now) < 0)){
			//if the date is the current date, then it is valid
			if(now.toDateString() === dateObj.getValue().toDateString()){
				return true;
			}

			if((elementId != null) && (document.getElementById(elementId) != null)){
				MessageHelper.formErrorHandleClient(document.getElementById(elementId).id, MessageHelper.messages["PAST_DATE_ERROR"]);
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["PAST_DATE_ERROR"]);
			}
			return false;
		}else{
			return true;
		}
	},

	/**
	 * Checks if a date error occured before user tries to move focus out of datetextbox.
	 *
	 * @param {Object} dateObj The date object to be validated.
	 * @param {String} elementId The ID of the element that an error message would be attached to.
	 */
	validateDateOnBlur: function(dateObj, elementId){
		var now = new Date();
		if(dateObj.getValue() != null && (dateObj.compare(dateObj.getValue(), now) < 0)){
			//if the date is the current date, then it is valid
			if(now.toDateString() === dateObj.getValue().toDateString()){
				return true;
			}

			if((elementId != null) && (document.getElementById(elementId) != null)){
				MessageHelper.formErrorHandleClient(document.getElementById(elementId).id, MessageHelper.messages["PAST_DATE_ERROR"]);
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["PAST_DATE_ERROR"]);
			}
			return false;
		}else if (dateObj.state == 'Error') {
			if((elementId != null) && (document.getElementById(elementId) != null)){
				MessageHelper.formErrorHandleClient(document.getElementById(elementId).id, dateObj.getErrorMessage(false));
			}else{
				MessageHelper.displayErrorMessage(dataObj.getErrorMessage(false));
			}
			return false;
		} else {
			return true;
		}
	},

	/**
	 * Creates a new address during order check-out.
	 *
	 * @param {Integer} orderItemId The order item ID for a multiple shipment scenario, or 0 to indicate a shipping address needs to be created, or 1 to indicate a billing address needs to be created.
	 * @param {String} addressType The type of the address to be created.
	 */
	createAddress:function(orderItemId,addressType){
		this.saveOrderItemsList(orderItemId,"-1");

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		var checkForOpera = true; //require a check of whether the browser is opera or not
		cursor_wait(checkForOpera);
		wc.render.updateContext('editShippingAddressContext', {'shippingAddress':'-1','addressType':addressType});
		//Hide the mainContents (contains shipping/billing details, shop cart details, promotion details, orderDetails)
		this.showHideDivs('editAddressContents','mainContents');
	},


	/**
	 * This function is used to show an area and hide an area on the current page.
	 *
	 * @param {String} showArea The ID of the area to show.
	 * @param {String} hideArea The ID of the area to hide.
	 *
	 * @private
	 */
	showHideDivs:function(showArea,hideArea){
		document.getElementById(hideArea).style.display = "none";
		document.getElementById(showArea).style.display = "block";
	},


	/**
	 * Restores the previous address details when a user cancels editing an existing address or cancels creating a new address.
	 *
	 * @see CheckoutHelperJS.cancelEditAddress
	 */
	restorePreviousAddressDetails:function(){
		var valueRestored = false;

		//For non-Ajax flow
		//Restore previous shipping address values from array	if value is available
		if(!this.isAjaxCheckOut()){
			//Use the addresses saved in local array...server will be updated with these new addresses once user clicks on update button..
			for(i in this.selectedAddressesArray){
				if(document.getElementById(i) != null && document.getElementById(i).value == -1){
					//IF createAddress is selected in this box, then restore it to previously selected value..
					document.getElementById(i).value = this.selectedAddressesArray[i];
					valueRestored = true;

					//Single shipment only
					//The shipping address details does not update automatically when the select box value is set
					//Manually update the address details
					if(this.shipmentTypeId == "1"){
						this.displayAddressDetails(document.getElementById("singleShipmentAddress").value,'Shipping');
					}
				}
			}
		}

		//For Ajax flow or non-Ajax flow when the previous shipping address is not available in the array
		if(this.isAjaxCheckOut() || !valueRestored){
			//Save the addresses present on server side only.. on change of address the server will be updated in ajax checkout..so can use
			//the address from server side only..
			if(this.shipmentTypeId == "2"){
				for(var i = 0; i < this.orderItemIds.length; i++){
				    	//Get the orderItemId
				    	var orderItemId = this.orderItemIds[i];
					var element = document.getElementById("MS_ShipmentAddress_"+orderItemId);

					if(element != null && element.value == -1){
						//IF createAddress is selected in this box, then restore it to previously selected value..
						element.value = document.getElementById("addressId_"+orderItemId).value;
					}
				}
			} else if(this.shipmentTypeId == "1"){
				var element = document.getElementById("singleShipmentAddress");
		 		if (element != null && document.getElementById("addressId_all")) {
					element.value = document.getElementById("addressId_all").value;

					//Manually update the shipping address details for non-Ajax/Single shipment flow
					if(!this.isAjaxCheckOut()){
						this.displayAddressDetails(element.value,'Shipping');
					}
				}
			}
		}

		//Restore the original billing address(es) that was updated on the server
		for(var i = 1; i < 4; i++){
			//Find the payment forms that are present on the page
			if(document.getElementById("PaymentForm"+i) != null){
				var paymentForm = document.getElementById("PaymentForm"+i);
				//Restore the selected billing address if it "create address" was selected
				if(paymentForm.billing_address_id.value == -1){
					paymentForm.billing_address_id.value = document.getElementById("selectedAddressId_"+i).value;

					if(!this.isAjaxCheckOut()){
						CheckoutPayments.displayBillingAddressDetailsWeb10(paymentForm.billing_address_id,i);
					}
				}
				if (wc.render.getContextById("billingAddressDropDownBoxContext").properties["billingAddress"+i] == -1){
					wc.render.getContextById("billingAddressDropDownBoxContext").properties["billingAddress"+i] = 	paymentForm.billing_address_id.value;
				}
			}
		}
	},


	/**
	 * This function is used when a user edits an existing shipping address during check-out.
	 *
	 * @param {String} addressSelectBoxName The ID of the address drop-down object.
	 * @param {Integer} orderItemId The item ID. It is required in the a multiple shipment scenario.
	 * @param {String} profileshipping The name of the quick checkout profile shipping address.
	 * @param {String} profilebilling The name of the quick checkout profile billing address.
	 */
	editAddress:function(addressSelectBoxName,orderItemId,profileshipping,profilebilling){
		var addressBox = document.getElementById(addressSelectBoxName);

		//We need to save order Items having this addressId..bcs if user edits this address then the id of this address changes..
		//so all order items needs to be updated with new id.
		this.saveOrderItemsList(orderItemId,addressBox.value);

		// the quick checkout address nick name is hardcoded here..it should be same as that used in quick checkout profile page..
		if(addressBox.options[addressBox.selectedIndex].text == profileshipping || addressBox.options[addressBox.selectedIndex].text == profilebilling){
			if(addressSelectBoxName != null){
				MessageHelper.formErrorHandleClient(addressSelectBoxName, MessageHelper.messages["ERROR_QUICKCHECKOUT_ADDRESS_CHANGE"]);
			} else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_QUICKCHECKOUT_ADDRESS_CHANGE"]);
			}
			return;
		}

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		//Update the display area context..
		cursor_wait();
		wc.render.updateContext('editShippingAddressContext', {'shippingAddress':addressBox.value});

		//Hide the mainContents (contains shipping/billing details, shop cart details, promotion details, orderDetails)
		this.showHideDivs('editAddressContents','mainContents');
	},


	/**
	 * This function is used when a user edits an existing billing address during check-out.
	 *
	 * @param {Integer} orderItemId The item ID.
	 * @param {Integer} paymentArea The payment area number that this billing address belongs to.
	 * @param {String} profileshipping The name of the quick checkout profile shipping address.
	 * @param {String} profilebilling The name of the quick checkout profile billing address.
	 */
	editBillingAddress:function(orderItemId,paymentArea,profileshipping,profilebilling){
		var form = document.forms["PaymentForm"+paymentArea];
		var addressBox = form.billing_address_id;

		//We need to save order Items having this addressId..bcs if user edits this address then the id of this address changes..
		//so all order items needs to be updated with new id..
		this.saveOrderItemsList(orderItemId,addressBox.value);

		// the quick checkout address nick name is hardcoded here..it should be same as that used in quick checkout profile page..
		if(addressBox.options[addressBox.selectedIndex].text == profileshipping || addressBox.options[addressBox.selectedIndex].text == profilebilling){
			if(addressBox != null){
				MessageHelper.formErrorHandleClient(addressBox, MessageHelper.messages["ERROR_QUICKCHECKOUT_ADDRESS_CHANGE"]);
			} else {
				MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_QUICKCHECKOUT_ADDRESS_CHANGE"]);
			}
			return;
		}

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		//Update the display area context..
		cursor_wait();
		wc.render.updateContext('editShippingAddressContext', {'shippingAddress':addressBox.value});

		//Hide the mainContents (contains shipping/billing details, shop cart details, promotion details, orderDetails)
		this.showHideDivs('editAddressContents','mainContents');
	},


	/**
	 * When a user cancels editing an address, this function is called to hide the address entry form and show the original main content of the page, then calls restorePreviousAddressDetails to restore the previous address.
	 *
	 * @see CheckoutHelperJS.restorePreviousAddressDetails
	 */
	cancelEditAddress:function(){
		this.showHideDivs('mainContents','editAddressContents');
		this.restorePreviousAddressDetails();
		if (this.getLastAddressLinkIdToFocus() != null && this.getLastAddressLinkIdToFocus() != 'undefined' && this.getLastAddressLinkIdToFocus() != '') {
			document.getElementById(this.getLastAddressLinkIdToFocus()).focus();
			this.setLastAddressLinkIdToFocus('');
		}

	},


	/**
	 * This function gets the shipment type Id for the order. Shipment type Id 1 is for single shipment, 2 for multiple shipment.
	 *
	 * @see CheckoutHelperJS.initializeShipmentPage
	 */
	getShipmentTypeId:function(){
		return this.shipmentTypeId;
	},


	/**
	 * Sets the dataDiry flag to indicate if payment information in the specified payment form area has been changed by the user.
	 * This method should be used for payment methods involving credit card.
	 * @param {Integer} paymentAreaNumber The unique payment area number.
	 * @param {Boolean} flag A true/false value to indicate if the payment method input has been changed.
	 *
	 * @see CheckoutHelperJS.isPaymentDataDirty
	 */
	paymentDataDirty:function(paymentAreaNumber,flag){
		this.dataDirty[paymentAreaNumber] = flag;
		console.debug("Information in payment area " + paymentAreaNumber + " has been modified.");
	},

	/**
	 * Returns the dataDiry flag that indicates if payment information in the specified payment form area has been changed by the user.
	 *
	 * @param {Integer} paymentAreaNumber The unique payment area number.
	 *
	 * @see CheckoutHelperJS.paymentDataDirty
	 */
	isPaymentDataDirty:function(paymentAreaNumber){
		return this.dataDirty[paymentAreaNumber];
	},


	/**
	 * Start DOM/BOPIS functions
	 **/

	/**
	 * Shows the address details of the store pick-up location selected by a user and hides the details of all other addresses.
	 * All store pick-up locations on the HTML page shuold have "addressDetails_<storelocationId>" as ID.
	 *
	 * @param {DOM Element} addressSelectBox The select drop-down object that contains all available store pick-up addresses.
	 */
	displayStoreAddressDetails:function(addressSelectBox){
		var selectedAddressId = addressSelectBox.value;
		for(j=0; j < addressSelectBox.options.length; j++){
			if(addressSelectBox.options[j].value == selectedAddressId){
				dojo.byId("addressDetails_"+addressSelectBox.options[j].value).style.display = "block";
			}
			else{
				dojo.byId("addressDetails_"+addressSelectBox.options[j].value).style.display = "none";
			}
		}
	},


	/**
	 * Updates all order items in the current order with the store pick-up location and the pick-up in store shipping mode by invoking the <code>AjaxUpdateOrderItem</code> service.
	 * This function is used when the 'AjaxCheckout' feature is enabled.
	 *
	 * @param {DOM Element} addressSelectBox The select drop-down object that contains all available store pick-up addresses.
	 */
	updateStoreAddressForAllItems:function(addressSelectBox){
		if(!this.isAjaxCheckOut())return;
		var addressId = addressSelectBox.value;

		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";

		var orderItemId = null;
		var totalItems = document.getElementById("totalNumberOfItems").value;
		var addressId = document.getElementById("singleShipmentAddress").value;
		for(var i = 0; i < totalItems; i++){
			orderItemId = document.getElementById("orderItem_"+(i+1)).value;
			this.updateParamObject(params,"orderItemId",orderItemId,false,-1);
			this.updateParamObject(params,"physicalStoreId",addressId,false,-1);
		}

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("AjaxUpdateOrderItem", params);
	},


	/**
	 * Updates a single order item in the current order with the shipping mode and store pick-up location or personal address selected by the user by invoking the <code>AjaxUpdateOrderItem</code> service.
	 * The different sections in the page that contain the shipping method selection, advanced shipping options, store pick up location, and shipping addresses will be shown or hidden depending on the selection made on the shippingModeSelectBox object.
	 * This function is used when the 'AjaxCheckout' feature is enabled.
	 *
	 * @param {DOM Element} shippingModeSelectBox The select drop-down object that contains all available shipping modes.
	 * @param {Integer} orderItemId The ID of the item to update.
	 * @param {String} pickUpInStoreShipMode The identifier for the pick-up in store shipping mode.
	 */
	updateShippingModeAndAddressForOrderItem:function(shippingModeSelectBox, orderItemId, pickUpInStoreShipMode){
		if(!this.isAjaxCheckOut())return;

		var selectedShippingMode = shippingModeSelectBox.value;
		if (pickUpInStoreShipMode == selectedShippingMode) {
			document.getElementById("MS_ShipMode_Section_"+orderItemId).className = "nodisplay";
			document.getElementById("MS_ShipAdvancedOptions_Section_"+orderItemId).className = "nodisplay";
			document.getElementById("MS_ShippingAddress_Section_"+orderItemId).className = "nodisplay";
			document.getElementById("MS_StoreAddress_Section_"+orderItemId).className = "";
		} else {
			document.getElementById("MS_ShipMode_Section_"+orderItemId).className = "";
			document.getElementById("MS_ShipAdvancedOptions_Section_"+orderItemId).className = "";
			document.getElementById("MS_ShippingAddress_Section_"+orderItemId).className = "";
			document.getElementById("MS_StoreAddress_Section_"+orderItemId).className = "nodisplay";
		}

		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params["orderId"] = ".";
		params["orderItemId"] = orderItemId;
		params["shipModeId"] = selectedShippingMode;
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";

		if (pickUpInStoreShipMode == selectedShippingMode) {
			var physicalStoreId = document.getElementById("MS_StoreSelectBox_"+orderItemId).value;
			params["physicalStoreId"] = physicalStoreId;
		} else {
			if (document.getElementById("MS_ShipmentAddress_"+orderItemId)) {
				var addressId = document.getElementById("MS_ShipmentAddress_"+orderItemId).value;
				params["addressId"] = addressId;
			}
		}
		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("AjaxUpdateOrderItem", params);
	},


	/**
	 * Updates a single order item in the current order with the store pick-up location selected by the user by invoking the <code>AjaxUpdateOrderItem</code> service.
	 * This function is used when the 'AjaxCheckout' feature is enabled.
	 *
	 * @param {DOM Element} storeAddressSelectBox The select drop-down object that contains all available store pick-up locations.
	 * @param {Integer} orderItemId The ID of the order item to update.
	 */
	updateStoreAddressForOrderItem:function(storeAddressSelectBox, orderItemId){
		if(!this.isAjaxCheckOut())return;

		var selectedPickUpStoreId = storeAddressSelectBox.value;

		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params["orderId"] = ".";
		params["orderItemId"] = orderItemId;
		params["physicalStoreId"] = selectedPickUpStoreId;
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("AjaxUpdateOrderItem", params);
	},

	/**
	 * End DOM/BOPIS functions
	 **/



	/**
	 * Sets fieldDirtyFlag to indicates if the value of a shipping information related input field or the quantity of an item has been changed by the user.
	 *
	 * @param {Boolean} value A true/false value that indicates if the value of a shipping information related input field or the quantity of an item has been changed by the user.
	 *
	 * @see CheckoutHelperJS.getFieldDirtyFlag
	 */
	setFieldDirtyFlag: function(value){
		this.fieldDirtyFlag = value;
	},


	/**
	 * Returns fieldDirtyFlag that indicates if the value of a shipping information related input field or the quantity of an item has been changed by the user.
	 *
	 * @returns {Boolean} fieldDirtyFlag A true/false value that indicates if the value of a shipping information related input field or the quantity of an item has been changed by the user.
	 *
	 * @see CheckoutHelperJS.setFieldDirtyFlag
	 */
	getFieldDirtyFlag: function(){
		return this.fieldDirtyFlag;
	},


	/**
	 * Verifies if the dirty flag is set to true, such as when a customer changes shipping information. If the dirty
	 * flag is set to true, a message displays prompting the customer to update their current order before they continue
	 * to checkout. This function is used in a non-AJAX checkout flow.
	 *
	 * @return {Boolean} Return true if the dirty flag is set to true.
	 */
	checkForDirtyFlag:function(){
		if(this.getFieldDirtyFlag()){
			if(document.getElementById("ShoppingCart_NonAjaxUpdate") != null){
				MessageHelper.formErrorHandleClient(document.getElementById("ShoppingCart_NonAjaxUpdate"), MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
				return true;
			}else if(document.getElementById("MultipleShipment_NonAjaxShipInfoUpdate") != null){
				MessageHelper.formErrorHandleClient(document.getElementById("MultipleShipment_NonAjaxShipInfoUpdate"), MessageHelper.messages["ERROR_UPDATE_FIRST"]);
				return true;
			}else if(document.getElementById("SingleShipment_NonAjaxShipInfoUpdate") != null){
				MessageHelper.formErrorHandleClient(document.getElementById("SingleShipment_NonAjaxShipInfoUpdate"), MessageHelper.messages["ERROR_UPDATE_FIRST"]);
				return true;
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_UPDATE_FIRST"]);
				return true;
			}
		}
		return false;
	},


	/**
	 * This function is used to show or hide the SMS phone number field section for guest shoppers in the
	 * order summary page.
	 * @param {DOM Element Id} checkboxElementId The id of the checkbox for getting SMS order notifications.
	 * @param {DOM Element Id} smsElementId The id of the element that contains the SMS phone number field.
	 */
	showHideCheckoutSMS:function(checkboxElementId, smsElementId){
		var smsOrderNotificationCheckbox = document.getElementById(checkboxElementId);
		if (smsOrderNotificationCheckbox != null && smsOrderNotificationCheckbox != "undefined") {
			if (smsOrderNotificationCheckbox.checked) {
				showElementById(smsElementId);
			} else {
				hideElementById(smsElementId);
			}
		}

	},

	/**
	 * This function return an array of countries from a global variable called countries.
	 * If that variable does not already exist then it will be created and populated from a JSON of country objects which should
	 * have been loaded into a div on the page prior to calling this function.
	 *
	 * @returns {Array} countries An array of countries.
	 **/
	 getCountryArray:function()
	{
		//If the countries array does not already exist then create it.
		if (document["countries"] == null)
		{
			countries = new Array();
			var theDiv = document.getElementById("countryListSelectionHelper");

			if (typeof theDiv == 'undefined') return null;
			var divJSON = eval('('+ theDiv.innerHTML +')');
			var countriesObject = divJSON.countries;

			for (var i = 0; i < countriesObject.length; i++)
			{
				var countryObject = countriesObject[i];
				countries[countryObject.code] = new Object();
				countries[countryObject.code].name = countryObject.displayName;
				countries[countryObject.code].countryCallingCode = countryObject.callingCode;

				if (countryObject.states.length > 0)
				{
					countries[countryObject.code].states = new Object();
					for (var j = 0; j < countryObject.states.length; j++)
					{
						var state = countryObject.states[j];
						countries[countryObject.code].states[state.code] = state.displayName;
					}
				}
			}
		}

		return countries;
	},

	/**
	 *  This function populates the country code to mobile phone based on the selected country.
	 *  @param {string} countryDropDownId The id of the mobile country drop down list
	 *  @param {string} countryCallingCodeId The id of the mobile country calling code text box.
	 */
	loadCountryCode:function(countryDropDownId,countryCallingCodeId){
		this.getCountryArray();
		var countryCode = document.getElementById(countryDropDownId).value;
		document.getElementById(countryCallingCodeId).value = countries[countryCode].countryCallingCode;
	},


	/**
	 * Invokes the OrderShippingInfoUpdate service to expedite shipping for the selected order item.
	 * This function is used when the 'AjaxCheckout' feature is enabled.
	 *
	 * @param {DOM Element} checkBox The Expedite Shipping check-box object.
	 * @param {String} inputOrderItemId The ID of the order item for which you want to expedite shipping.
	 */
	 expediteShipping:function(checkBox, inputOrderItemId){
		if(!this.isAjaxCheckOut())return;
		var params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;

		if(checkBox.checked){
			this.updateParamObject(params,"isExpedited","Y",true);
		}else{
			this.updateParamObject(params,"isExpedited","N",true);
		}
		if(inputOrderItemId != null){
			this.updateParamObject(params,"orderItemId",inputOrderItemId,false);
		}

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderShippingInfoUpdate", params);
	},


	/************************************************************
	 * The following methods are used on the Shopping Cart page
	 ************************************************************/

	/**
	 * This function updates the total on the shopping cart page when the quantity of an item has been changed. It is used when the "AjaxCheckOut" feature is enabled.
	 * It updates the total by calling <code>updateCart</code> after <code>updateWaitTimeOut</code> milliseconds have passed.
	 *
	 * @param {DOM Element} quantityBox The quantity input text field.
	 * @param {Integer} orderItemId The ID of the order item to update.
	 * @param {Object} event A keyboard event object.
	 *
	 * @see CheckoutHelperJS.updateCart
	 */

	setPreviousValue:function(quantity,currentId) {
		previousQuantity = quantity;
		cartCurrentId=currentId;

	},
	getPreviousValue:function() {
		return previousQuantity;
	},
	getcurrentId:function(){
		return cartCurrentId;
	},

	updateCartWait:function(quantityBox, orderItemId,event) {

		//if(event.keyCode == dojo.keys.TAB)return;
		//if(!this.isAjaxCheckOut()){
		//	return;
		//}

		//Key pressed.. update the flag
		if(this.keyPressCount[orderItemId] == null && isNaN(this.keyPressCount[orderItemId])){
			this.keyPressCount[orderItemId] = 0;
		}
		this.keyPressCount[orderItemId] = parseInt(this.keyPressCount[orderItemId]) + 1;
		setTimeout(dojo.hitch(this,"updateCart",quantityBox,orderItemId,this.keyPressCount[orderItemId]),this.updateWaitTimeOut);
	},


	/**
	 * This function updates the total on the shopping cart page when the quantity of an item has been changed. It is used when the "AjaxCheckOut" feature is enabled.
	 * It updates the shopping cart by calling the <code>AjaxUpdateOrderItem</code> service.
	 *
	 * @param {DOM Element} quantityBox The quantity input text field.
	 * @param {Integer} orderItemId The ID of the order item to update.
	 * @param {Integer} keyPressCountValue The count of keyPress events. If there are more keyPress events after this event was fired, then this function just returns without doing anything.
	 */
	updateCart:function(quantityBox, orderItemId,keyPressCountValue){
		if(keyPressCountValue < this.keyPressCount[orderItemId]){
			//User has pressed one more key..that key press call will update the server..no work for me..
			return;
		}

		var quantity = (quantityBox.value);
		if(!isNonNegativeInteger(quantity)){
			TealeafWCJS.createExplicitChangeEvent(quantityBox.id);
			MessageHelper.formErrorHandleClient(quantityBox,MessageHelper.messages["QUANTITY_INPUT_ERROR"]);
		} else {
			//Its a positive valid number > 0...Update the qty at server side..
			if(!dojo.isChrome){
				TealeafWCJS.createExplicitChangeEvent(quantityBox.id);
			}
			var params = [];
			params.orderId = ".";
			params["storeId"] = this.storeId;
			params["catalogId"] = this.catalogId;
			params["langId"] = this.langId;
			this.shoppingCartPage="true";
			if(this.shoppingCartPage){
				params.calculationUsage = "-1,-2,-5,-6,-7";
				params.inventoryValidation = "true";
			}else{
				params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			}
			this.updateParamObject(params,"orderItemId",orderItemId,false,-1);
			this.updateParamObject(params,"quantity",quantity,false,-1);

			//For handling multiple clicks
			if(!submitRequest()){
				//return;
			}
			cursor_wait();

			if(quantity == 0)
			{
				var x = document.getElementById("totalNumberOfItems").value;
				var y = x;
				//Now remove free items from this total number of items count..
				//x = total items and y = totalItems - totalFreeItems
				for(var i = 0; i < x; i++){
					var qtyObj = document.getElementById("freeGift_qty_"+(i+1));
					if (qtyObj!=null || qtyObj != undefined) {
						qty = qtyObj.value;
						if(qty!=null && qty!=undefined && qty == -1){
							y = y - 1;
						}
					}

				}

				if(y == 1){
					wc.service.invoke("AjaxUpdateOrderItem1", params);
				}else{
					wc.service.invoke("AjaxUpdateOrderItem",params);
				}
			}
			else
			{
				wc.service.invoke("AjaxUpdateOrderItem",params);
			}
		}
	},

		updateGiftCardTable:function(quantityBox,orderItemId,action){
			var quantity = quantityBox.value;
			console.log("action"+action);
			var params = [];
			params.orderId = ".";
			params["orderitems_id"] = orderItemId;
			params["quantity"] = quantity;
			params["action"] = action;
			console.log("invoking"+params);
			wc.service.invoke("GiftCardTableUpdate",params);
			
	},
	
	/**
	 * When the 'AjaxCheckout' feature is disabled, on page load, this function registers all item quantity fields on the 'Shopping Cart' page to the Dojo event listener.
	 * If any of the fields has been changed by the user, the user will be asked to update the shopping cart before proceeding to the next page.
	 */
	initDojoEventListenerShoppingCartPage:function(){
		// If empty shopping cart, no need to add anything to event listener
		if(document.getElementById("totalNumberOfItems") != null){
			var totalItems = document.getElementById("totalNumberOfItems").value;

			if(totalItems != null && totalItems > 0){
				for(var i = 0; i < totalItems; i++){
					var object = dojo.byId("quantity_" + (i+1));
					if(object != null){
						dojo.connect(object, 'onchange', setDirtyFlag);
					}
				}
			}else{
				console.debug("error: element 'totalNumberOfItems' was expected but undefined.");
				return;
			}
		}
	},


	/**
	 * Validates the quantity of all items on the 'Shopping Cart' page.
	 * This function is used when the 'AjaxCheckout' feature is disabled.
	 *
	 * @param {DOM Element} form The form object that contains the table of order items.
	 * @param {boolean} validateQuantityOnly Indicates whether to validate the quantities only.
	 */
	updateShoppingCart:function(form, validateQuantityOnly) {
		//For Non-Ajax checkout flow, quantity validation is done when Update button is clicked.
		//No need to validate quantity again on checkout.
		if(validateQuantityOnly != undefined && validateQuantityOnly == true && !this.isAjaxCheckOut()){
			return true;
		}

		//MessageHelper.hideAndClearMessage();
		var totalItems = document.getElementById("totalNumberOfItems").value;
		if(totalItems != null){
			for(var i = 0; i < totalItems; i++){
				var quantity = null;
				if(form != undefined) {
					quantity = form["quantity_"+(i+1)];
				} else if (dojo.byId("qty_"+(i+1)) != null) {
					quantity = dojo.byId("qty_"+(i+1));
				}
				//Update qty for all items
				if (quantity!=null || quantity!= undefined) {
					var v = quantity.value.trim();
					if(!isNonNegativeInteger(v)){
						MessageHelper.formErrorHandleClient(quantity.id,MessageHelper.messages["QUANTITY_INPUT_ERROR"]);
						return;
					}
				}

			}

			//For Ajax checkout flow, only validate the quantity values and do not submit the form
			if(validateQuantityOnly != undefined && validateQuantityOnly == true){
				return true;
			}


			//For handling multiple clicks
			if(!submitRequest()){
				return;
			}

			var beginIndex = wc.render.getContextById("ShopCartPaginationDisplay_Context").properties["beginIndex"];
			if(beginIndex == null || beginIndex == ""){
				beginIndex = 0;
			}

			form.URL.value = form.URL.value + "&beginIndex=" + beginIndex;

			form.submit();
			this.setFieldDirtyFlag(false);
		}else{
			console.debug("error: element 'totalNumberOfItems' was expected but undefined.");
			return;
		}
	},

	/**
	 * If the shopper has selected to perform a recurring order in the shopping cart page, this function is used to
	 * validate that all conditions for creating a recurring order are met:
	 * - make sure it is a registered shopper
	 * - make sure that the order does not have order items that are non-recurring (i.e disallowRecurringOrder flag set to 1)
	 *
	 * @param {String} userType The user type of the current user, either G (guest shopper) or R (registered shopper).
	 */
	canCheckoutContinue:function(userType) {
		if ( (document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") && document.getElementById("shipTypeOnline").checked) ||
					(document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") == null) ) {
			if (document.getElementById("nonRecurringOrderItems") && document.getElementById("nonRecurringOrderItems").value != "") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["RECURRINGORDER_ERROR"]);
				return false;
			} else if (userType != undefined && userType === "G") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_GUEST_USER_SUBMIT_RECURRING_ORDER"]);
				return false;
			}
		}
		return true;
	},

	/**
	 * Updates the shopping cart in a 'quick check-out' scenario by invoking the <code>QuickCheckOutOrderCopy</code> service.
	 *
	 * @param {Integer} quickOrderId The ID of the quick check-out order.
	 */
	updateCartWithQuickCheckoutProfile:function(quickOrderId){
		var params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.toOrderId = ".";
		params["shippingAddressFromOrderProfile"] = "1";
		params["shippingModeFromOrderProfile"] = "1";
		params["URL"] = "dummy";
		params["payInfoFrom"] = quickOrderId;

		wc.service.declare({
			id: "QuickCheckOutOrderCopy",
			actionId: "QuickCheckOutOrderCopy",
			url: "AjaxOrderCopy",
			successHandler: function(serviceResponse) {
				cursor_clear();
				document.location.href="OrderProcessServiceOrderPrepare?storeId="+CheckoutHelperJS.storeId+"&catalogId="+CheckoutHelperJS.catalogId+"&langId="+CheckoutHelperJS.langId+"&orderId=.&URL=OrderShippingBillingView?langId="+CheckoutHelperJS.langId+"&storeId="+CheckoutHelperJS.storeId+"&catalogId="+CheckoutHelperJS.catalogId+"&quickCheckoutProfileForPayment=true";
			},
			failureHandler: function(serviceResponse) {
				if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} else {
					if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					}
				}
				cursor_clear();
			}
		});

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("QuickCheckOutOrderCopy",params);
	},


	/************************************************************
	 * End Shopping Cart page specific functions
	 ************************************************************/



	/**************************************************************
	 * The following methods are used on the Single Shipment page
	 **************************************************************/

	/**
	 * Helper function used for adding a new shipping address in a single shipment scenario.
	 *
	 * @param {String} addressType The type of the selected address.
	 */
	addNewShippingAddress:function(addressType){
		this.displayAddressDetails(-1,addressType);
	},


	/**
	 * This function is used to update the address of all order items in a single shipment checkout-out scenario.
	 * It is used when the "AjaxCheckout" feature is enabled.
	 *
	 * @param {DOM Element} addressSelectBox The select drop-down object that contains all available addresses.
	 */
	updateAddressForAllItems:function(addressSelectBox){
		//Save it in local array..
		if(addressSelectBox.value != -1){
			this.selectedAddressesArray[addressSelectBox.name] =  addressSelectBox.value;
		}

		if(!this.isAjaxCheckOut())return;
		var addressId = addressSelectBox.value;
		if(addressId == -1){
			return;
		}
		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		var addressId = document.getElementById("singleShipmentAddress").value;
		this.updateParamObject(params,"addressId",addressId,false);
		if (typeof updateGiftRegistrantAddressForItemsExt != "undefined" && typeof updateGiftRegistrantAddressForItemsExt!=null) {
			 params = updateGiftRegistrantAddressForItemsExt(params,addressId);
		}

		var enabledShipInstructions = false;
		var shipInstructions;

		//Check if Shipping Instructions is enabled
		if(document.getElementById("shipInstructions") != null){
			shipInstructions = document.getElementById("shipInstructions").value;

			reWhiteSpace = new RegExp(/^\s+$/);
			if(reWhiteSpace.test(shipInstructions)){
				shipInstructions = "";
			}
			enabledShipInstructions = true;
		}

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();

		//If Shipping Instructions is enabled & there are some shipping instructions entered
		//Update both the shipping address and shipping instructions
		//Else only update shipping address
		if(!enabledShipInstructions || shipInstructions == undefined || shipInstructions == "") {
			wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
		} else {
			wc.service.invoke("OrderItemAddressShipInstructionsUpdate", params);
		}
	},


	/**
	 * This function is used to update the shipping mode of all order items in a single shipment checkout-out scenario.
	 * It is used when the "AjaxCheckout" feature is enabled.
	 *
	 * @param {DOM Element} addressSelectBox The select drop-down object that contains all available shipping modes.
	 */
	updateShipModeForAllItems:function(shipmentSelectBox){

		if(!this.isAjaxCheckOut())return;
		var shipModeId = shipmentSelectBox.value;
		if(shipModeId == -1){
			return;
		}
		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		this.updateParamObject(params,"shipModeId",shipModeId,false);

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
	},

	updateShipModeForAllItemsNew:function(shipmentSelectBoxval){

		if(!this.isAjaxCheckOut())return;
		var shipModeId = shipmentSelectBoxval;
		if(shipModeId == -1){
			return;
		}
		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		
		ZipCodeOnLoad= document.getElementById("zipcodeDisplayNumber").value;
		AddressIdOnLoad= document.getElementById("addressId").value

		console.log("addressId @ shical " + AddressIdOnLoad);
		console.log("ZipCodeOnLoad @ shical " + ZipCodeOnLoad);

		if(AddressIdOnLoad != null && AddressIdOnLoad != "" && ZipCodeOnLoad != null && ZipCodeOnLoad != "")
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		else
		params.calculationUsage = "-1,-2,-5,-6,-7";
		
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		this.updateParamObject(params,"shipModeId",shipModeId,false);

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
		wc.render.getRefreshControllerById("currentOrderBoxController");
		wc.render.updateContext('currentOrderBox_Context',{shipmentSelectBoxval:shipmentSelectBoxval});

		parseWidget("singleShipmentOrderBoxDetail");
	},



	/**

* This function to udpate shipmode for orderitems table. This is used in CART page only.

*/


	

	updateShipModeForAllItemsNewForCart:function(shipmentSelectBoxval){

		if(!this.isAjaxCheckOut())return;
		var shipModeId = shipmentSelectBoxval;
		if(shipModeId == -1){
			return;
		}
		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		
		ZipCodeOnLoad= ""; //document.getElementById("zipcodeDisplayNumber").value;
		AddressIdOnLoad= ""; //document.getElementById("addressId").value

		console.log("addressId @ shical " + AddressIdOnLoad);
		console.log("ZipCodeOnLoad @ shical " + ZipCodeOnLoad);


		params.calculationUsage = "-1,-2,-5,-7";
		
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		this.updateParamObject(params,"shipModeId",shipModeId,false);

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
		wc.render.getRefreshControllerById("currentOrderBoxController");
		wc.render.updateContext('currentOrderBox_Context',{shipmentSelectBoxval:shipmentSelectBoxval});

		parseWidget("singleShipmentOrderBoxDetail");
	},



	

/**

* This function to udpate shipmode for orderitems table. This is used in CART page only.

*/


updateShipModeForCart:function(shipmentSelectBoxval,stId,catId,laId){
  
		var shipModeId = shipmentSelectBoxval;
		if(shipModeId == -1){
			return;
		}
		params = [];
		params["storeId"] = stId; //this.storeId;
		params["catalogId"] = catId;//this.catalogId;
		params["langId"] = laId;//this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-5,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		this.updateParamObject(params,"shipModeId",shipModeId,false);

		//For handling multiple clicks
		if(!submitRequest()){
			//return;
		}
		cursor_wait();
            	wc.service.invoke("OrderItemAddressShipMethodUpdateCart", params);
		return false;

	},




	

	
	
	/**
	 * This function updates the shipping instruction for items in the order. It is used in a single shipment check-out scenario.
	 * It is used when "AjaxCheckout" feature is enabled. It calls the <code>OrderShippingInfoUpdate</code> service.
	 */
	updateShippingInstructionsForAllItems:function(){
		if(!this.isAjaxCheckOut())return;
		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";

		var orderItemId = null;
		var shipInstructions = document.getElementById("shipInstructions").value;

		reWhiteSpace = new RegExp(/^\s+$/);
		if(reWhiteSpace.test(shipInstructions)){
			shipInstructions = "";
		}

		//Validate the length of the shipping instructions
		if(!MessageHelper.isValidUTF8length(shipInstructions, 4000)){
			MessageHelper.formErrorHandleClient(document.getElementById("shipInstructions").id, MessageHelper.messages["ERROR_ShippingInstructions_TooLong"]);
			return;
		}

		orderItemId = document.getElementById("orderItem_1").value;
		this.updateParamObject(params,"orderItemId",orderItemId,false);
		this.updateParamObject(params,"shipInstructions",shipInstructions,false);

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderShippingInfoUpdate", params);
	},

	/**
	 * Updates the shipping charge type and account number for items in the order. This method calls the
	 * <code>OrderShippingInfoUpdate</code> service and is used in both single and multiple shipment checkout scenarios
	 * when the AjaxCheckout feature is enabled.
	 * @param {Integer} curOrderId The order ID of the current order.
	 * @param {Integer} shipModeId The ID of the shipping mode to which shipping charge applies.
	 * @param {String} shipChargeType Shipping charge type selected for the shipmode.
	 * @param {Integer} shipAcctNum The account number that is used when the selected shipping charge type is Charge by Carrier.
	 */
	updateShippingChargeForShipModeAjax:function(curOrderId, shipModeId, shipChargeType, shipAcctNum){
		if(!this.isAjaxCheckOut())return;

		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = curOrderId;
		params.URL = "";
		params["shipModeId"] = shipModeId;
		params["shipChargTypeId"] = shipChargeType;

		// ship account number is optional field for shipping charge, if it is not specified, pass in empty
		if (shipAcctNum != null && shipAcctNum != undefined) {
			params["shipCarrAccntNum"] = shipAcctNum;
		} else {
			params["shipCarrAccntNum"] = "";
		}

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("AjaxOrderShipChargeUpdate", params);
	},

	/**
	 * Updates the shipping charge type and account number for items in the order. This method calls the
	 * <code>OrderShippingInfoUpdate</code> service and is used in a multiple shipment checkout scenario when the
	 * AjaxCheckout feature is disabled."
	 * @param {form} myForm The HTML object of the shipping charge form.
	 */
	updateShippingChargeForShipMode:function(myForm){
		if(this.isAjaxCheckOut())return;
		myForm.URL.value="OrderProcessServiceOrderPrepare?storeId="+CheckoutHelperJS.storeId+"&catalogId="+CheckoutHelperJS.catalogId+"&langId="+CheckoutHelperJS.langId+"&orderId=.&URL=OrderShippingBillingView?forceShipmentType=2";
		myForm.submit();
	},

	/**
	 * Hides the account number field for the selected in shipping charge. If the charge by seller charge
	 * type is selected, account field should not be shown.
	 * @param {object} selectValue The HTML element of the shipping charge type selection
	 * @param {object} acctFieldId The HTML element of the account number field
	 */
	hideShipChargeAccountField:function(selectValue, acctFieldId) {

		if (document.getElementById(selectValue).value.indexOf("ByCarrier") > -1) {
			document.getElementById(acctFieldId).style.display = 'block';
		} else {
			document.getElementById(acctFieldId).style.display = 'none';
		}
	},

	/**
	 * This function validates the specified requested shipping date then calls {@link CheckoutHelperJS.updateShippingDateForAllItems}
	 * to update the date for all items in the current order in a single shipment scenario.
	 *
	 * @param {dijit.form.DateTextBox} jsDate The dijit.form.DateTextBox object containing the requested shipping date specified by the user.
	 *
	 * @see CheckoutHelperJS.updateRequestedShipDateForThisItem
	 */

	updateRequestedShipDate:function(jsDate){
		if(jsDate == null || jsDate.getDisplayedValue() == null)
			return;

		if(!jsDate.isValid()){
			if(document.getElementById('requestedShippingDate') != null){
				MessageHelper.formErrorHandleClient(document.getElementById('requestedShippingDate').id, MessageHelper.messages["SHIP_REQUESTED_ERROR"]);
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["SHIP_REQUESTED_ERROR"]);
			}
			return;
		}

		var now = new Date();

		var checkbox = dojo.byId("requestShippingDateCheckbox");

		if(checkbox.checked && jsDate.compare(jsDate.getValue(), now) <= 0){
			// >0 --> jsDate is larger than now, i.e. a future date
			// <0 --> jsDate is smaller than now, i.e. a past date
			// ==0 --> both dates are exactly the same
			if(document.getElementById('requestedShippingDate') != null){
				MessageHelper.formErrorHandleClient(document.getElementById('requestedShippingDate').id, MessageHelper.messages["REQUESTED_SHIPPING_DATE_OUT_OF_RANGE_ERROR"]);
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["REQUESTED_SHIPPING_DATE_OUT_OF_RANGE_ERROR"]);
			}
			return;
		}

		if(!this.isAjaxCheckOut())
			return;

		var t = "";
		if(jsDate.getDisplayedValue() != ""){
			t = dojo.date.stamp.fromISOString(jsDate);
			//Set the time to 12pm to handle cases where daylight savings cause a date shift
			t.setHours(12);
			// set requested ship date in zulu time, from dojo: zulu - if true, UTC/GMT is used for a timezone
			t = dojo.date.stamp.toISOString(t, {selector: "%Y-%m-%dT%H:%m:%S.%SZ", zulu: true,milliseconds:true});
		}else if(jsDate.getDisplayedValue() == ""){
			t = this.resetRequestedShipDateValue;
		}

		this.updateShippingDateForAllItems(t);
	},


	/**
	 * This function updates the requested shipping date for all items in the order. It is called by {@link CheckoutHelperJS.updateRequestedShipDate}.
	 * It calls the <code>OrderItemAddressShipMethodUpdate</code> service.
	 *
	 * @param {String} date The String representation of the date object, see {@link CheckoutHelperJS.updateRequestedShipDate}.
	 */
	updateShippingDateForAllItems:function(date){
		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		this.updateParamObject(params,"requestedShipDate",date,false);

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
	},


	/**
	 * Displays the details of an address in a single shipment check-out scenario.
	 *
	 * @param {String} addressSelectBoxValue The value, i.e. address ID, of the input address select drop-down object.
	 * @param {String} addressType The type of the selected address.
	 */
	displayAddressDetails:function(addressSelectBoxValue,addressType){
		if(!this.isAjaxCheckOut()){
			//This is needed, so that previously displayed address details are hidden now..
			this.displayAddressDetailsWeb10(addressSelectBoxValue,addressType);
		}
		else{
			//Display selected address details..
			if(addressSelectBoxValue != -1){
				//For handling multiple clicks
				if(!submitRequest()){
					return;
				}
				var checkForOpera = true; //require a check of whether the browser is opera or not
				cursor_wait(checkForOpera);
				wc.render.updateContext('shippingAddressContext', {'shippingAddress':addressSelectBoxValue});
			}
			else{
				this.createAddress(-1,addressType);
			}
		}
	},


	/**
	 * Displays the details of a selected address and hides the details all other addresses. If a user selects 'create address', then {@link CheckoutHelperJS.createAddress} will be called.
	 * This is used when the 'AjaxCheckout' feature is disabled.
	 * This function is called from {@link CheckoutHelperJS.displayAddressDetails}.
	 *
	 * @param {String} addressSelectBoxValue The value, i.e. address ID, of the input address select drop-down object.
	 * @param {String} addressType The type of the selected address.
	 *
	 * @private
	 *
	 * @see CheckoutHelperJS.displayAddressDetails
	 */
	displayAddressDetailsWeb10:function(addressSelectBoxValue,addressType){
		var selectedAddressId = addressSelectBoxValue;
		var addressSelectBox = dojo.byId('singleShipmentAddress');
		for(j=0; j < addressSelectBox.options.length; j++){
			if(addressSelectBox.options[j].value == selectedAddressId){
				dojo.byId("addressDetails_"+addressSelectBox.options[j].value).style.display = "block";
			}
			else{
				dojo.byId("addressDetails_"+addressSelectBox.options[j].value).style.display = "none";
			}
		}
		//Now if its a create Address..
		if(selectedAddressId == -1){
			//We can use ajax service here also... pass -1, for single shipment..
			this.createAddress(-1,addressType);
		}
	},


	/**
	 * When the 'AjaxCheckout' feature is disabled, on page load, this function registers all item quantity fields and all shipping information related input fields on the single shipment Shipping & Billing page to the Dojo event listener.
	 * If any of the fields has been changed by the user, the user will be asked to update the shopping cart before proceeding to the next page.
	 */
	initDojoEventListenerSingleShipmentPage:function(){
		var totalItems = document.getElementById("totalNumberOfItems").value;

		if(totalItems != null && totalItems > 0){
			if(dojo.byId("singleShipmentAddress") != null){
				dojo.connect(dojo.byId("singleShipmentAddress"), 'onchange', setDirtyFlag);
			}
			if(dojo.byId("WC_ShippingAddressSelectSingle_div_2") != null){
				dojo.connect(dojo.byId("WC_ShippingAddressSelectSingle_div_2"), 'onclick', setDirtyFlag);
			}
			if(dojo.byId("singleShipmentShippingMode") != null){
				dojo.connect(dojo.byId("singleShipmentShippingMode"), 'onchange', setDirtyFlag);
			}
			if(dojo.byId("shipAsComplete") != null){
				dojo.connect(dojo.byId("shipAsComplete"), 'onclick', setDirtyFlag);
			}
			if(dojo.byId("shippingInstructionsCheckbox") != null){
				dojo.connect(dojo.byId("shippingInstructionsCheckbox"), 'onclick', setDirtyFlag);
			}
			if(dojo.byId("requestShippingDateCheckbox") != null){
				dojo.connect(dojo.byId("requestShippingDateCheckbox"), 'onclick', setDirtyFlag);
			}
			if(dojo.byId("shipInstructions") != null){
				dojo.connect(dojo.byId("shipInstructions"), 'onchange', setDirtyFlag);
			}
			if(dojo.byId("expediteShipping") != null){
				dojo.connect(dojo.byId("expediteShipping"), 'onchange', setDirtyFlag);
			}

			if(dojo.byId("expediteShipping_1") != null){
				for(var i = 0; i < totalItems; i++){
					if(dojo.byId("qty_" + (i+1)) != null && dojo.byId("qty_" + (i+1)).value != "-1"){
						var object = dojo.byId("expediteShipping_" + (i+1));
						dojo.connect(object, 'onchange', setDirtyFlag);
					}
				}
			}
		}else{
			console.debug("error: element 'totalNumberOfItems' was expected but undefined.");
			return;
		}
	},


	/**
	 * Updates the shopping cart on the single shipment 'Shipping & Billing' page.
	 * This function is used when the 'AjaxCheckout' feature is disabled.
	 *
	 * @param {DOM Element} form The form object that contains the shopping cart.
	 */
	updateSingleShipmentShoppingCart:function(form){
		var formAction = 'OrderChangeServiceShipInfoUpdate?';
		var updateShippingURL = 'OrderChangeServiceShipInfoUpdate?';

		var instructions = null;
		var t = null;


		// Get the specified shipping instructions if the flex flow option is enabled
		if(dojo.byId('shippingInstructionsCheckbox') != null){
			if(dojo.byId('shippingInstructionsCheckbox').checked){
				if(document.getElementById("shipInstructions") != null && document.getElementById("shipInstructions").value != null){
					//Validate the length of the shipping instructions
					if(MessageHelper.isValidUTF8length(document.getElementById("shipInstructions").value, 4000)){
						instructions = document.getElementById("shipInstructions").value;
					} else {
						MessageHelper.formErrorHandleClient(document.getElementById("shipInstructions").id,MessageHelper.messages["ERROR_ShippingInstructions_TooLong"]);
						return;
					}
				}
			}else{
				if(document.getElementById("shipInstructions") != null){
					instructions = "";
				}
			}
		}

		// Get the requested shipping date if the flex flow option is enabled
		if(dojo.byId('requestShippingDateCheckbox') != null){
			var jsDateObj = dijit.byId("requestedShippingDate");
			if(dojo.byId('requestShippingDateCheckbox').checked){
				if(jsDateObj != null && jsDateObj.getDisplayedValue() != null){
					var now = new Date();
					if(jsDateObj.compare(jsDateObj.getValue(), now) <= 0){
						// >0 --> jsDate is larger than now, i.e. a future date
						// <0 --> jsDate is smaller than now, i.e. a past date
						// ==0 --> both dates are exactly the same
						if(document.getElementById('requestedShippingDate') != null){
							MessageHelper.formErrorHandleClient(document.getElementById('requestedShippingDate').id, MessageHelper.messages["REQUESTED_SHIPPING_DATE_OUT_OF_RANGE_ERROR"]);
						}else{
							MessageHelper.displayErrorMessage(MessageHelper.messages["REQUESTED_SHIPPING_DATE_OUT_OF_RANGE_ERROR"]);
						}
						return;
					}
					var t = "";
					if(jsDateObj.getDisplayedValue() != ""){
						t = dojo.date.stamp.fromISOString(jsDateObj);
						//Set the time to 12pm to handle cases where daylight savings cause a date shift
						t.setHours(12);
						// set requested ship date in zulu time, from dojo: zulu - if true, UTC/GMT is used for a timezone
						t = dojo.date.stamp.toISOString(t, {selector: "%Y-%m-%dT%H:%m:%S.%SZ", zulu: true,milliseconds:true});
					}else if(jsDateObj.getDisplayedValue() == ""){
						t = this.resetRequestedShipDateValue;
					}
				}
			}else{
				if(jsDateObj != null){
					t = this.resetRequestedShipDateValue;
				}
			}
		}

		//Update addressId for all items
		if(document.getElementById("singleShipmentAddress").value != -1){
			updateShippingURL = updateShippingURL + "addressId=" + document.getElementById("singleShipmentAddress").value;
		}
		else{
			MessageHelper.formErrorHandleClient(document.getElementById("singleShipmentAddress").id, MessageHelper.messages["SHIPPING_INVALID_ADDRESS"]);
			return;
		}

		//Update shipModeId for all items
		formAction = formAction + "shipModeId=" + document.getElementById("singleShipmentShippingMode").value;

		if (this.shipChargeEnabled) {
			formAction = formAction + "&shippingChargeType=" + document.getElementById("shipChargTypeId_1").value;
			formAction = formAction + "&shipCarrAccntNum=" + document.getElementById("shipCarrAccntNum_1").value;
		}

		var shipInstructions = "";
		// if instructions == null, then the flex flow option is not enabled, do not pass the parameter to the service
		if(instructions != null){
			shipInstructions = "shipInstructions%3D" + instructions + "%26orderItemId_1%3D" + document.getElementById("orderItem_1").value;
		}

		// if t == null, then the flex flow option is not enabled, do not pass the parameter to the service
		if(t != null){
			formAction = formAction + "&requestedShipDate=" + t;
		}

		// Get the specified Ship As Complete flag if the flex flow option is enabled
		if(dojo.byId('shipAsComplete') != null){
			if(dojo.byId('shipAsComplete').checked){
				formAction = formAction + "&ShipAsComplete=Y";
			}
			else{
				formAction = formAction + "&ShipAsComplete=N";
			}
		}

		// Expedite shipping
		if(document.getElementById("expediteShipping_1") != null){
			var totalNumberOfItemsOnPage = document.getElementById("totalNumberOfItems").value;
			for(var i=0; i<totalNumberOfItemsOnPage; i++){
				if(document.getElementById("qty_" + (i+1)) != null && document.getElementById("qty_" + (i+1)).value != "-1"){
					var orderItemId = document.getElementById("orderItem_"+(i+1)).value;
					if(document.getElementById("orderItemId_"+(i+1)) != null){
						document.getElementById("orderItemId_"+(i+1)).value = orderItemId;
					}
					var object = document.getElementById("expediteShipping_" + (i+1));
					if(object.checked){
						document.getElementById("isExpedited_" + (i+1)).value = "Y";
					}else{
						document.getElementById("isExpedited_" + (i+1)).value = "N";
					}
				}
			}
		}

		//Need to update shipModeId, addressId, shipInstructions in 3 separate calls to the same service.
		//Update the shipModeId first; shipModeId will not be updated for all items if addressId and orderItemId are present .
		form.action = formAction;

		//Update the addressId; addressId will not be updated for all items if shipModeId and orderItemId are present.
		//Then update shipInstructions; requires at least 1 orderItemId to be passed
		//Pass the current beginIndex so that when the page is reloaded, the order items that the user was working on would be displayed.
		var beginIndex = wc.render.getContextById("traditionalShipmentDetailsContext").properties["beginIndex"];
		if(beginIndex == null || beginIndex == ""){
			beginIndex = 0;
		}
		form.URL.value = updateShippingURL+"&requestedShipDate*=&shipModeId*=&orderItemId*=&URL=OrderChangeServiceShipInfoUpdate%3F"+shipInstructions +"%26allocate%3D***%26backorder%3D***%26remerge%3D***%26check%3D*n"+"%26URL%3DOrderShippingBillingView%3F%26beginIndex%3D" + beginIndex;

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		form.submit();
	},

	/************************************************************
	 * End Single Shipment page specific functions
	 ************************************************************/


	/****************************************************************
	 * The following methods are used on the Multiple Shipment page
	 ****************************************************************/

	/**
	 * This function is used to move all order items into a single shipment when a shopper changes the order from multiple shipment check-out to single shipment.
	 * The shipping information of the first item in the order will be used for all items after this update.
	 * It calls the <code>OrderItemAddressShipMethodUpdate1</code> service to update the order.
	 */
	moveAllItemsToSingleShipment:function(){
		//Get the first orderItem id..
		var orderItemId = document.getElementById("orderItem_1").value;
		//Now get the addressId and shipModeId of this orderItemId...
		var addressId = document.getElementById("MS_ShipmentAddress_"+orderItemId).value;
		//Update the shipModeId and addressId of all the items present in currentOrder...

		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		//addressId -3 is reserved for gift registry "Registrant" address.
		if(addressId==-3){
			var totalItems = document.getElementById("totalNumberOfItems").value;
			for(var i=2;i<=totalItems;i++){
				if(document.getElementById("orderItem_"+i)!=null && document.getElementById("orderItem_"+i)!='undefined'){
					var giftOrderItemId = document.getElementById("orderItem_"+i).value;
					var validAddressId = document.getElementById("MS_ShipmentAddress_"+giftOrderItemId).value;
					if(validAddressId!=-3){
						this.updateParamObject(params,"addressId",validAddressId,false);
						break;
					}
				}else{
					break;
				}
			}
		}else{
			this.updateParamObject(params,"addressId",addressId,false);
		}
		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderItemAddressShipMethodUpdate1", params);
	},


	/**
	 * Helper function for adding an address on the multiple shipment 'Shipping & Billing' page.
	 * @param (Integer) orderItemId The ID of the order item.
	 */
	 addNewShippingAddressForMS:function(orderItemId){
		this.updateAddressIdForThisItem(-1,orderItemId);

		//now save the orderItemId, so we can update that orderItem with the newly created addressId
		this.orderItemIds.push(orderItemId);
	},


	/**
	 * Updates the address ID for an order item in a multiple shipment check-out scenario.
	 * It is used when the "AjaxCheckout" feature is enabled and a different address is selected from the drop down.
	 * It calls the <code>OrderItemAddressShipMethodUpdate</code> service to update.
	 *
	 * @param {String} addressBoxValue The value, i.e. address ID, of the input select drop-down object that contains all available addresses.
	 * @param {Integer} orderItemId The order item ID.
	 */
	updateAddressIdForThisItem:function(addressBoxValue,orderItemId){
		//Save it in local array..
		if(addressBoxValue != -1){
			var addressBox = dojo.byId("MS_ShipmentAddress_" + orderItemId);
			this.selectedAddressesArray[addressBox.name] =  addressBoxValue;
		}
		if(addressBoxValue == -1) return;
		if(!this.isAjaxCheckOut())return;
		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";
		var addressId = addressBoxValue;
		this.updateParamObject(params,"shipToRegistrant","0",false,-1)
		this.updateParamObject(params,"addressId",addressId,false,-1);
		this.updateParamObject(params,"orderItemId",orderItemId,false,-1);
		if (typeof updateGiftRegistrantAddressForThisItemExt != "undefined" && typeof updateGiftRegistrantAddressForThisItemExt!=null) {
			 params = updateGiftRegistrantAddressForThisItemExt(params,addressId);
		}
		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
	},


	/**
	 * Updates the shipping mode for an item in the order. It is used in a multiple shipment scenario and when the "AjaxCheckout" feature is enabled.
	 * It calls the <code>OrderItemAddressShipMethodUpdate</code> service.
	 *
	 * @param {DOM Element} shipModeBox The select drop-down object that contains all available shipping modes.
	 * @param {Integer} orderItemId The ID of the order item to update.
	 */
	updateShipModeForThisItem:function(shipModeBox,orderItemId){
		var shipModeId = shipModeBox.value;
		if(shipModeId == -1){
			return;
		}
		if(!this.isAjaxCheckOut())return;
		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		this.updateParamObject(params,"orderItemId",orderItemId,false,-1);
		this.updateParamObject(params,"shipModeId",shipModeId,false,-1);
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
	},


	/**
	 * Updates the shipping instruction for an item. It is used in a multiple shipment scenario and when the "AjaxCheckout" feature is enabled.
	 * It calls the <code>OrderShippingInfoUpdate</code> service.
	 *
	 * @param {DOM Element} textArea The input text area for shipping instruction.
	 * @param {Integer} orderItemId The ID of the order item to update.
	 */
	updateShippingInstructionsForThisItem:function(textArea,orderItemId){
		var addressId = document.getElementById("MS_ShipmentAddress_"+orderItemId).value;
		var shipModeId = document.getElementById("MS_ShippingMode_"+orderItemId).value;
		var shipInstructions = textArea.value;

		reWhiteSpace = new RegExp(/^\s+$/);
		if(reWhiteSpace.test(shipInstructions)){
			shipInstructions = "";
		}

		if(this.isAjaxCheckOut()){
			//Validate the length of the shipping instructions
			if(!MessageHelper.isValidUTF8length(shipInstructions, 4000)){
				MessageHelper.formErrorHandleClient(textArea.id, MessageHelper.messages["ERROR_ShippingInstructions_TooLong"]);
				return;
			}
		}
		this.setShippingInstuctionsForAllOtherItems(addressId,shipModeId,shipInstructions);

		if(!this.isAjaxCheckOut()) {
			return;
		}

		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";

		this.updateParamObject(params,"addressId",addressId,false,-1);
		this.updateParamObject(params,"shipModeId",shipModeId,false,-1);
		this.updateParamObject(params,"shipInstructions",shipInstructions,false,-1);
		this.updateParamObject(params,"orderItemId",orderItemId,false,-1);

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		wc.service.invoke("OrderShippingInfoUpdate", params);
	},


	/**
	 * This function updates the requested shipping date for the current item in a multiple shipment check-out scenario and when the 'AjaxCheckout' feature is enabled.
	 * It invokes the <code>OrderItemAddressShipMethodUpdate</code> service.
	 *
	 * @param {dijit.form.DateTextBox} jsDate The dijit.form.DateTextBox object containing the requested shipping date specified by the user.
	 * @param {Integer} orderItemId The ID of the order item to update.
	 */
	updateRequestedShipDateForThisItem:function(jsDate,orderItemId){
		if(jsDate == null || jsDate.getDisplayedValue() == null)
			return;

		if(!jsDate.isValid()){
			if(document.getElementById('MS_requestedShippingDate_' + orderItemId) != null){
				MessageHelper.formErrorHandleClient(document.getElementById('MS_requestedShippingDate_' + orderItemId).id, MessageHelper.messages["SHIP_REQUESTED_ERROR"]);
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["SHIP_REQUESTED_ERROR"]);
			}
			return;
		}
		var now = new Date();

		var checkbox = dojo.byId("MS_requestShippingDateCheckbox_"+orderItemId);

		if(checkbox.checked && jsDate.compare(jsDate.getValue(), now) <= 0){
			// >0 --> jsDate is larger than now, i.e. a future date
			// <0 --> jsDate is smaller than now, i.e. a past date
			// ==0 --> both dates are exactly the same
			if(document.getElementById('MS_requestedShippingDate_' + orderItemId) != null){
				MessageHelper.formErrorHandleClient(document.getElementById('MS_requestedShippingDate_' + orderItemId).id, MessageHelper.messages["REQUESTED_SHIPPING_DATE_OUT_OF_RANGE_ERROR"]);
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["REQUESTED_SHIPPING_DATE_OUT_OF_RANGE_ERROR"]);
			}
			return;
		}

		if(!this.isAjaxCheckOut())
			return;

		var t = "";
		if(jsDate.getDisplayedValue() != ""){
			t = dojo.date.stamp.fromISOString(jsDate);
			//Set the time to 12pm to handle cases where daylight savings cause a date shift
			t.setHours(12);
			// set requested ship date in zulu time, from dojo: zulu - if true, UTC/GMT is used for a timezone
			t = dojo.date.stamp.toISOString(t, {selector: "%Y-%m-%dT%H:%m:%S.%SZ", zulu: true,milliseconds:true});
		}else if(jsDate.getDisplayedValue() == ""){
			t = this.resetRequestedShipDateValue;
		}

		var addressId = document.getElementById("MS_ShipmentAddress_"+orderItemId).value;
		var shipModeId = document.getElementById("MS_ShippingMode_"+orderItemId).value;

		params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		this.updateParamObject(params,"orderItemId",orderItemId,false,-1);
		this.updateParamObject(params,"requestedShipDate",t,false,-1);
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";

		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}
		cursor_wait();
		CheckoutHelperJS.RequestShippingDateAction = true;
		wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
	},


	/**
	 * This function is used to bring up the address entry form when a user wants to create a new address for an item in a multiple shipment scenario.
	 *
	 * @param {Integer} orderItemId The ID of the order item to update.
	 * @param {String} addressType The type of address to create.
	 *
	 * @private
	 */
	createAddressForMS:function(orderItemId,addressType){
		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}

		cursor_wait();
		wc.render.updateContext('editShippingAddressContext', {'shippingAddress':'-1','addressType':addressType});
		//Hide the mainContents (contains shipping/billing details, shop cart details, promotion details, orderDetails)
		this.showHideDivs('editAddressContents','mainContents');
	},


	/**
	 * Helper function for adding a new address in a multiple shipment scenario.
	 *
	 * @param (Integer) orderItemId The ID of the item.
	 * @param (String) addressType The type of the selected address.
	 */
	displayAddressDetailsForMSHelper:function (orderItemId,addressType) {
		this.displayAddressDetailsForMS(-1, orderItemId, addressType);
	},


	/**
	 * Displays the details of an address in a multiple shipment check-out scenario.
	 *
	 * @param {String} addressSelectBoxValue The value, i.e. address ID, of the input address select drop-down object.
	 * @param {Integer} orderItemId The order item ID.
	 * @param {String} addressType The type of the selected address.
	 */
	displayAddressDetailsForMS:function(addressSelectBoxValue,orderItemId,addressType){
		if(this.isAjaxCheckOut()){
			if(addressSelectBoxValue == -1){
				this.createAddressForMS(orderItemId,addressType);
			}
		}
		else{
			//For web1.0 also use the same function...
			if(addressSelectBoxValue == -1){
				this.createAddressForMS(orderItemId,addressType);
			}
			else{
				//Display the address details in short...
				var addrId = dojo.byId("MS_shippingAddressDisplayArea_"+orderItemId);
				addrId.innerHTML = dojo.byId("addressDetails_" + addressSelectBoxValue).innerHTML;
			}
		}
	},


	/**
	 * When the 'AjaxCheckout' feature is disabled, on page load, this function registers all item quantity fields and all shipping information related input fields on the multiple shipment Shipping & Billing page to the Dojo event listener.
	 * If any of the fields has been changed by the user, the user will be asked to update the shopping cart before proceeding to the next page.
	 */
	initDojoEventListenerMultiShipmentPage:function(){
		var totalItems = document.getElementById("totalNumberOfItems").value;

		if(totalItems != null && totalItems > 0){
			var list_clickable = new dojox.collections.ArrayList([]);
			var list_editable = new dojox.collections.ArrayList([]);

			for(var i = 0; i < totalItems; i++){
				//Get the orderItemId
				var orderItemId = document.getElementById("orderItem_"+(i+1)).value;
				var object = "";

				if(orderItemId != null){
					// retrieve clickable objects, i.e. checboxes and buttons
					object = dojo.byId("MS_shippingInstructionsCheckbox_" + orderItemId);
					if(object != null){list_clickable.add(object);}
					object = dojo.byId("MS_requestShippingDateCheckbox_" + orderItemId);
					if(object != null){list_clickable.add(object);}
					object = dojo.byId("shipAsComplete");
					if(object != null){list_clickable.add(object);}
					object = dojo.byId("editAddressButton");
					if(object != null){list_clickable.add(object);}
					object = dojo.byId("MS_expediteShipping_" + orderItemId);
					if(object != null){list_clickable.add(object);}

					// retrieve selectable objects, i.e. drop-down menus, input fields
					object = dojo.byId("MS_ShipmentAddress_" + orderItemId);
					if(object != null){list_editable.add(object);}
					object = dojo.byId("MS_ShippingMode_" + orderItemId);
					if(object != null){list_editable.add(object);}
					object = dojo.byId("MS_shipInstructions_" + orderItemId);
					if(object != null){list_editable.add(object);}
					object = dojo.byId("qty_" + (i+1));
					if(object != null){list_editable.add(object);}
				}else{
					var j = i+1;
					console.debug("error: element 'orderItem_'" + j + " was expected but undefined.");
				}
			}
			for(var i=0; i<list_clickable.count; i++){
				var item = list_clickable.item(i);
				dojo.connect(item, 'onclick', setDirtyFlag);
			}

			for(var i=0; i<list_editable.count; i++){
				var item = list_editable.item(i);
				dojo.connect(item, 'onchange', setDirtyFlag);
			}
		}else{
			console.debug("error: element 'totalNumberOfItems' was expected but undefined.");
			return;
		}
	},


	/**
	 * Updates the shopping cart on the multiple shipment 'Shipping & Billing' page.
	 * This function is used when the 'AjaxCheckout' feature is disabled.
	 *
	 * @param {DOM Element} form The form object that contains the shopping cart.
	 */
	updateMultiShipmentShoppingCart:function(form){
		var updateShippingAction = 'OrderChangeServiceShipInfoUpdate';
		var updateShippingURL = 'OrderShippingBillingView?';

		var totalItems = document.getElementById("totalNumberOfItems").value;

		for(var i = 0; i < totalItems; i++){
			//Get the orderItemId
			var orderItemId = document.getElementById("orderItem_"+(i+1)).value;
			if(document.getElementById("orderItemId_"+(i+1)) != null){
				document.getElementById("orderItemId_"+(i+1)).value = orderItemId;
			}

			//Update addressId
			var addressId = document.getElementById("MS_ShipmentAddress_" + orderItemId).value;
			if(addressId != -1){
				if(document.getElementById("addressId_" + (i+1)) != null) {
					document.getElementById("addressId_" + (i+1)).value = addressId;
				}
			}else{
				MessageHelper.formErrorHandleClient(document.getElementById("MS_ShipmentAddress_" + orderItemId).id, MessageHelper.messages["SHIPPING_INVALID_ADDRESS"]);
				return;
			}

			//Update shipModeId
			if(form.elements["shipModeId_" + (i+1)] != null) {
				form.elements["shipModeId_" + (i+1)].value = document.getElementById("MS_ShippingMode_"+orderItemId).value;
			}

			var instructions = null;
			var t = null;

			// Get the shipping instructions if the flex flow option is enabled
			var shippingInstructionsCheckbox = dojo.byId("MS_shippingInstructionsCheckbox_" + orderItemId);
			if(shippingInstructionsCheckbox != null){
				if(shippingInstructionsCheckbox.checked){
					if(document.getElementById("MS_shipInstructions_" + orderItemId) != null && document.getElementById("MS_shipInstructions_" + orderItemId).value != null){
						//Validate the length of the shipping instructions
						if(MessageHelper.isValidUTF8length(document.getElementById("MS_shipInstructions_" + orderItemId).value, 4000)){
							instructions = document.getElementById("MS_shipInstructions_" + orderItemId).value;
						} else {
							MessageHelper.formErrorHandleClient(document.getElementById("MS_shipInstructions_" + orderItemId).id,MessageHelper.messages["ERROR_ShippingInstructions_TooLong"]);
							return;
						}
					}
				}else{
					if(document.getElementById("MS_shipInstructions_" + orderItemId) != null){
						instructions = "";
					}
				}
			}

			// Get the requested shipping date if the flex flow option is enabled
			var requestShippingDateCheckbox = dojo.byId("MS_requestShippingDateCheckbox_" + orderItemId);
			if(requestShippingDateCheckbox != null){
				t = this.resetRequestedShipDateValue;
				var jsDateObj = dijit.byId("MS_requestedShippingDate_" + orderItemId);
				if(requestShippingDateCheckbox.checked){
					if(jsDateObj != null && jsDateObj.getDisplayedValue() != null){
						var now = new Date();
						if(jsDateObj.compare(jsDateObj.getValue(), now) <= 0){
							// >0 --> jsDate is larger than now, i.e. a future date
							// <0 --> jsDate is smaller than now, i.e. a past date
							// ==0 --> both dates are exactly the same
							if(document.getElementById('MS_requestedShippingDate_' + orderItemId) != null){
								MessageHelper.formErrorHandleClient(document.getElementById('MS_requestedShippingDate_' + orderItemId).id, MessageHelper.messages["REQUESTED_SHIPPING_DATE_OUT_OF_RANGE_ERROR"]);
							}else{
								MessageHelper.displayErrorMessage(MessageHelper.messages["REQUESTED_SHIPPING_DATE_OUT_OF_RANGE_ERROR"]);
							}
							return;
						}
						var t = "";
						if(jsDateObj.getDisplayedValue() != ""){
							t = dojo.date.stamp.fromISOString(jsDateObj);
							//Set the time to 12pm to handle cases where daylight savings cause a date shift
							t.setHours(12);
							// set requested ship date in zulu time, from dojo: zulu - if true, UTC/GMT is used for a timezone
							t = dojo.date.stamp.toISOString(t, {selector: "%Y-%m-%dT%H:%m:%S.%SZ", zulu: true,milliseconds:true});
						}else if(jsDateObj.getDisplayedValue() == ""){
							t = this.resetRequestedShipDateValue;
						}
					}
				}else{
					if(jsDateObj != null){
						t = this.resetRequestedShipDateValue;
					}
				}
			}
			// if instructions == null, then the shipping instruction flex flow option is not enabled, do not pass the parameter to the service
			if(instructions != null){
				if(document.getElementById("qty_"+(i+1)) != null && document.getElementById("qty_"+(i+1)).value != -1){
					if(document.getElementById("shipInstructions_"+(i+1)) != null){
						document.getElementById("shipInstructions_"+(i+1)).value = instructions;
					}
				}
			}

			// if t == null, then the request shipping date flex flow option is not enabled, do not pass the parameter to the service
			if(t != null){
				if(document.getElementById("qty_"+(i+1)) != null && document.getElementById("qty_"+(i+1)).value != -1){
					if(document.getElementById("requestedShipDate_"+(i+1)) != null){
						document.getElementById("requestedShipDate_"+(i+1)).value = t;
					}
				}
			}

			if(document.getElementById("MS_expediteShipping_" + orderItemId) != null && document.getElementById("isExpedited_" + (i+1)) != null){
				if(document.getElementById("qty_"+(i+1)) != null && document.getElementById("qty_"+(i+1)).value != -1){
					if(document.getElementById("MS_expediteShipping_" + orderItemId).checked){
						document.getElementById("isExpedited_" + (i+1)).value = 'Y';
					}else{
						document.getElementById("isExpedited_" + (i+1)).value = 'N';
					}
				}
			}
		}

		//ShipAsComplete
		var checkBox = document.getElementById("shipAsComplete");
		if(document.getElementById("ShipAsComplete") != null) {
			if(checkBox.checked){
				document.getElementById("ShipAsComplete").value = "Y";
			}
			else{
				document.getElementById("ShipAsComplete").value = "N";
			}
		}

		// remove orderItemId array returned from response properties - it is an array and do not have _i information so next service call will lose track of orderItemIds
		updateShippingURL = updateShippingURL + "orderItemId*=";
		updateShippingURL = updateShippingURL + "&quantity*=";
		updateShippingURL = updateShippingURL + "&addressId*=";
		updateShippingURL = updateShippingURL + "&shipModeId*=";
		updateShippingURL = updateShippingURL + "&shipInstructions*=";
		updateShippingURL = updateShippingURL + "&requestedShipDate*=";
		updateShippingURL = updateShippingURL + "&isExpedited*=";
		updateShippingURL = updateShippingURL + "&ShipAsComplete*=";

		updateShippingURL = updateShippingURL + "&orderItem*=";
		updateShippingURL = updateShippingURL + "&MS_ShipmentAddress*=";
		updateShippingURL = updateShippingURL + "&MS_ShippingMode*=";
		updateShippingURL = updateShippingURL + "&MS_shippingInstructionsCheckbox*=";
		updateShippingURL = updateShippingURL + "&MS_shipInstructions*=";
		updateShippingURL = updateShippingURL + "&MS_requestShippingDateCheckbox*=";
		updateShippingURL = updateShippingURL + "&MS_requestedShippingDate*=";
		updateShippingURL = updateShippingURL + "&MS_expediteShipping*=";
		updateShippingURL = updateShippingURL + "&qty*=";
		updateShippingURL = updateShippingURL + "&shipAsComplete*=";

		var beginIndex = wc.render.getContextById("multipleShipmentDetailsContext").properties["beginIndex"];
		if(beginIndex == null || beginIndex == ""){
			beginIndex = 0;
		}
		updateShippingURL = updateShippingURL + "&beginIndex=" + beginIndex;

		form.action = updateShippingAction;
		form.URL.value = updateShippingURL;
		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}

		form.submit();
	},

	/**
	 * This function is used to show or hide the edit address link in multiple and single shipment page.
	 * @param {DOM Element} addressSelectBox The select drop-down object that contains all available addresses.
	 * @param {String} orderItemId The id of the orderItem for which the edit address link is displayed/hidden.
	 */

	showHideEditAddressLink:function(addressSelectBox,orderItemId){
		if(addressSelectBox.value == '-3'){
				if(dojo.byId("editAddressLink_"+orderItemId)!=null && dojo.byId("editAddressLink_"+orderItemId)!='undefined'){
						dojo.byId("editAddressLink_"+orderItemId).style.display = "none";
				}
				return;
			}
			var orgAddressList = document.getElementById("shippingOrganizationAddressList");
			if(orgAddressList){
				var orgAddressArray = [];
				orgAddressArray = orgAddressList.value.toString().split(",");
				for(var i = 0; i < orgAddressArray.length; i++){
					if(dojo.byId("editAddressLink_"+orderItemId)!=null && dojo.byId("editAddressLink_"+orderItemId)!='undefined'){

						if(addressSelectBox.value == orgAddressArray[i]){
							dojo.byId("editAddressLink_"+orderItemId).style.display = "none";
							break;
						}
						else {
							dojo.byId("editAddressLink_"+orderItemId).style.display = "block";
						}
					}
				}
			}else {
					if(dojo.byId("editAddressLink_"+orderItemId)!=null && dojo.byId("editAddressLink_"+orderItemId)!='undefined'){
						dojo.byId("editAddressLink_"+orderItemId).style.display = "block";
					}
			}
	},

	/**
	 * This function is used to show or hide the edit billing address link in multiple and single shipment page.
	 * @param {DOM Element} addressSelectBox The select drop-down object that contains all available addresses.
	 * @param {String} orderItemId The id of the orderItem for which the edit address link is displayed/hidden.
	 * @param {String} paymentAreaNumber The area number of the payment section.
	 */

	showHideEditBillingAddressLink:function(addressSelectBox,orderItemId,paymentAreaNumber){

				// If the value is "Please Select Billing Method first", then don't display the edit link on load.
				if(addressSelectBox.value == '-2'){
							dojo.byId("editBillingAddressLink"+paymentAreaNumber+"_"+orderItemId).style.display = "none";
							return;
						}

				// Gets the address Ids of all the organization addresses
				var orgAddressList = document.getElementById("shippingOrganizationAddressList");

				//if there exists organization addresses
				if(orgAddressList){
					var orgAddressArray = [];
					orgAddressArray = orgAddressList.value.toString().split(",");

					//loops through all the organization address Ids
					for(var i = 0; i < orgAddressArray.length; i++){

						//checks to see if the edit link divs exists
						if(dojo.byId("editBillingAddressLink"+paymentAreaNumber+"_"+orderItemId)!=null && dojo.byId("editBillingAddressLink"+paymentAreaNumber+"_"+orderItemId)!='undefined'){

							//compares the selected value address Id in the drop down to the organization address id
							if(addressSelectBox.value == orgAddressArray[i]){

								//hides the link if a match is found and then exits the loop (exit is for the case where there might be a different org address id)
								dojo.byId("editBillingAddressLink"+paymentAreaNumber+"_"+orderItemId).style.display = "none";
								break;
							}
							else {

								//displays it in all other cases
								dojo.byId( "editBillingAddressLink"+paymentAreaNumber+"_"+orderItemId).style.display = "block";
							}
						}


					}

					// if no organization addresses exists, hide the valid edit divs.
				}else {

						if(dojo.byId( "editBillingAddressLink"+paymentAreaNumber+"_"+orderItemId)!=null && dojo.byId( "editBillingAddressLink"+paymentAreaNumber+"_"+orderItemId)!='undefined'){
							dojo.byId( "editBillingAddressLink"+paymentAreaNumber+"_"+orderItemId).style.display = "none";

						}


				}

	},

	/**
	 * Sets the order ID when it is not called form the current order.
	 * The order ID is used to determine which order to act upon such as in the case of deleting an order item from an order.
	 * @param {String} orderId The orderID to use.
	 */
	setOrderId : function(orderId)
	{
		this.orderId = orderId;
	},

	/**
	 * Returns the orderId.
	 */
	getOrderId : function()
	{
		return this.orderId;
	},

	/**
	 * This function is used to show or hide the create billing address link in multiple and single shipment page.
	 * @param {DOM Element} addressSelectBox The select drop-down object that contains all available addresses.
	 * @param {String} orderItemId The id of the orderItem for which the create address link is displayed/hidden.
	 * @param {String} paymentAreaNumber The area number of the payment section.
	 */

	showHideCreateBillingAddressLink:function(addressSelectBox,orderItemId,paymentAreaNumber){

			// If the value is "Please Select Billing Method first", then don't display the edit link on load.
			if(addressSelectBox.value == '-2'){
							dojo.byId("createBillingAddressLink"+paymentAreaNumber+"_"+orderItemId).style.display = "none";
							return;
						}

				// Gets the address Ids of all the organization addresses
				var orgAddressList = document.getElementById("shippingOrganizationAddressList");

				//if there exists organization addresses
				if(orgAddressList){
					var orgAddressArray = [];
					orgAddressArray = orgAddressList.value.toString().split(",");

						//loops through all the organization address Ids
					for(var i = 0; i < orgAddressArray.length; i++){

							//checks to see if the create link divs exists
						if(dojo.byId("createBillingAddressLink"+paymentAreaNumber+"_"+orderItemId)!=null && dojo.byId("createBillingAddressLink"+paymentAreaNumber+"_"+orderItemId)!='undefined'){

							//compares the selected value address Id in the drop down to the organization address id
							if(addressSelectBox.value == orgAddressArray[i]){

								//hides the link if a match is found and then exits the loop (exit is for the case where there might be a different org address id)
								dojo.byId("createBillingAddressLink"+paymentAreaNumber+"_"+orderItemId).style.display = "none";
								break;
							}
							else {
									//displays it in all other cases
								dojo.byId("createBillingAddressLink"+paymentAreaNumber+"_"+orderItemId).style.display = "block";
							}
						}
					}
					// if no organization addresses exists, hide the valid edit divs.
				}else {


						if(dojo.byId("createBillingAddressLink"+paymentAreaNumber+"_"+orderItemId)!=null && dojo.byId("createBillingAddressLink"+paymentAreaNumber+"_"+orderItemId)!='undefined'){
							dojo.byId("createBillingAddressLink"+paymentAreaNumber+"_"+orderItemId).style.display = "none";
						}
				}

	},


	ShowEstimateButton:function(){

		var shippingDone = dojo.byId("shippingdone");

		if(shippingDone == null){
			$(".Noestimate").css("display", "block");
			$(".Getestimate").css("display", "none");
		}
	},

	paypalRedirect:function(normalCheckOut,pageSourceType)
	   {
		
		
		var url = dojo.byId('returnURL').value;
		var cancelURL = window.location.href;
		var params = [];
		if(normalCheckOut=='yes')
		{
		params["shippingAddressMadatory"]="true";
		params["shipto_firstname"] = dojo.byId("firstnameinput").value;
		params["shipto_lastname"] =dojo.byId("lastnameinput").value;
		params["shipto_address1"] = dojo.byId("address1input").value;
		if(dojo.byId("address2input").value != null && dojo.byId("address2input").value != "")
		{
			params["shipto_address2"] = dojo.byId("address2input").value;
		}
		params["shipto_city"] = dojo.byId("cityinput").value;
		params["shipto_stateprovince"] =dojo.byId("customDropdown").value;
		params["shipto_zipcode"] = dojo.byId("zipcodeinput").value;
		var shipPhonePart1 = dojo.byId("phonenumberinput_Prt1").value;
		var shipPhonePart2 = dojo.byId("phonenumberinput_Prt2").value;
		var shipPhonePart3 = dojo.byId("phonenumberinput_Prt3").value;
		var shipPhoneNumber = shipPhonePart1+'-'+shipPhonePart2+'-'+shipPhonePart3;
		
		params["shipto_phonenumber"] = shipPhoneNumber;
		if(dojo.byId("phoneextinput").value != null && dojo.byId("phoneextinput").value != "")
		{
			params["shipto_extnumber"] = dojo.byId("phoneextinput").value;
		}
		params["shipto_country"] = "US";
		}
		else
		{
		params["shippingAddressMadatory"]="false";
		}
		params["orderId"] = dojo.byId('payPalOrderId').value;
                                params["returnURL"] = url;
		params["cancelURL"]= cancelURL;
		params["pageSourceType"]=pageSourceType;
		params["storeId"]=this.storeId;
		params["catalogId"]=this.catalogId;
		params["langId"]=this.langId;
		
		wc.service.invoke('AjaxSetExpressCheckout',params);
		
	   },



// add for the get the AOID value from cookies
	 getCookie:function(cname)
	{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	  {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
	},



	/************************************************************
	 * End Multiple Shipment page specific functions
	 ************************************************************/
	/**
	 * This function is used to get the shipping mode object from a shipping mode select box
	 * @param {DOM Element/String} selectBox The select drop-down object or its Id for shipping mode.
	 */
	   
	   paypalConfirmOrder:function()
	   {
		
		dojo.byId('loadingOverlay').style.display = 'block';
		var params = [],aoidValue;

		aoidValue = getCookie("hpshopping2");
		
		if(aoidValue == undefined)
		{
			params["aoID"] = "";
		}else
		{

		        //var aoidSplit = aoidValue.split(":");	
			//params["aoID"] = aoidSplit[1];
			  params["aoID"] =aoidValue;
			
		}
		params["shipto_firstname"] = dojo.byId("firstnameinput").value;
		params["shipto_lastname"] =dojo.byId("lastnameinput").value;
		params["shipto_address1"] = dojo.byId("address1input").value;
		if(dojo.byId("address2input").value != null && dojo.byId("address2input").value != "")
		{
			params["shipto_address2"] = dojo.byId("address2input").value;
		}
		params["shipto_city"] = dojo.byId("cityinput").value;
		params["shipto_stateprovince"] =dojo.byId("customDropdown").value;
		params["shipto_zipcode"] = dojo.byId("zipcodeinput").value;
		var shipPhonePart1 = dojo.byId("phonenumberinput_Prt1").value;
		var shipPhonePart2 = dojo.byId("phonenumberinput_Prt2").value;
		var shipPhonePart3 = dojo.byId("phonenumberinput_Prt3").value;
		var shipPhoneNumber = shipPhonePart1+shipPhonePart2+shipPhonePart3;
		
		params["shipto_phonenumber"] = shipPhoneNumber;
		if(dojo.byId("phoneextinput").value != null && dojo.byId("phoneextinput").value != "")
		{
			params["shipto_extnumber"] = dojo.byId("phoneextinput").value;
		}
		params["shipto_country"] = "US";
		params["confirmationEmail"] = dojo.byId("confirmationemailinput").value;
		if(dojo.byId("logonID").value != "guest")
		{
			params["logonID"]=dojo.byId("logonID").value;
		}
		else
		{
			params["logonID"]=dojo.byId("confirmationemailinput").value;
		}
		params["orderId"] = dojo.byId('payPalOrderId').value;
		params["ormorder"] = dojo.byId('ormOrderId').value;
		params["paymentType"] ="payPal";
		   wc.service.invoke('AjaxOrderSubmitService',params);
	   },

MPRAjax :function(userId,logonId,storeId,URL){
		
		var params = [];
		params["userId"]=userId;
		
		params["LogonId"]= logonId;
		params["storeId"]=storeId;
		params["returnURL"]=URL;
		
		//params["langId"]=langId;
		
		wc.service.invoke('MPRInkToner', params);
		
	   },
	   
	   
	   
	getShippingMode:function(selectBox){
		if(dojo.isString(selectBox)){
			selectBox=dojo.byId(selectBox);
		}
		var option = null ;
		for(var i= 0;i<selectBox.options.length;i++){
			if(selectBox[i].selected){
				option = selectBox[i];
			}
		}
		if(option){
			return {"id":option.value,"code":option.getAttribute("shipModeCode"),"description":option.text};
		}
	},
	
	
	
	saveNewsLetterSubscription:function(){
		var eMailId=document.getElementById("confirmationemailinputValue").value;
		
		var eMailFlag=document.getElementById("eMailFlag").checked;
		var phoneFlag=document.getElementById("phoneFlag").checked;
		var mobileFlag=document.getElementById("mobileFlag").checked;
		var phoneInput=document.getElementById("phoneInput").value;
		
		
		params = [];
		
		params["eMailFlag"] = eMailFlag;
		params["phoneFlag"] = phoneFlag;
		params["mobileFlag"] = mobileFlag;
		params["eMailId"]=eMailId;
		params["phoneInput"]=phoneInput;
		
		wc.service.invoke("NewsLetterSubscriptionID",params);
	}
}

/***************CheckoutHelper.js ends*****************/

/***************ShipmodeSelectionExt.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This javascript handles different actions to perform after shopper selects to proceed with checkout.
 * In summary, user can have different logon status and user can select different shopping option (buy online or 
 * pick up at store). 
 * A user can have the following logon status:
 * 1. Shopper is a guest user
 * 2. Shopper has a commerce account but is not yet logged on (and would like to log on before user proceeds with
 *    shopping flow)
 * 3. Shopper is already logged on
 * In addition, user can select different shipping options:
 * 1. Shop online
 * 2. Pick up at store
 * Every logon status/shipping selection combination as mentioned above will be handled in this javascript
 */

ShipmodeSelectionExtJS = {	
	/** language id used by the store, default to -1 (English) */
	langId: "-1",
	/** store id of the store */
	storeId: "",
	/** catalog id of the store */
	catalogId: "",		
	/** indicates if store locator feauture is enabled or not */
	storeLocatorEnabled: false,
	/** Order item ID of an order item in the current order. This is needed for OrderChangeServiceItemUpdate to call DoInventoryActionCmd to get fulfillment center ID **/
	orderItemId : "",
	
	/**
	* Indicates if "Pick up in store" shipping option is selected by shopper
	*/
	isPickUpInStore: function() {
		var shipType = this.getShipTypeValue();
		if (shipType == "pickUp") {
			return true;
		} else {
			return false;
		}
	},
	
	/**
	* Gets the shipType value from the document.BOPIS_FORM form.
	*/
	getShipTypeValue: function() {
		if (document.BOPIS_FORM != undefined){	
			for (var i=0; i < document.BOPIS_FORM.shipType.length; i++) {
			   if (document.BOPIS_FORM.shipType[i].checked) {
				  return document.BOPIS_FORM.shipType[i].value;
				  }
			   }
		}  
	},

	/**
	 * This function retrieves the shipment type value for the current order from the cookie.  If no shipment type value for the 
	 * current order is found in the cookie, empty string is returned.
	 *
	 * @param {String} orderId The order ID.
	 * 
	 * @returns {String} The shipment type value.
	 *
	 */
	getShipTypeValueFromCookieForOrder:function(orderId) {
		var shipTypeValueOrderId = dojo.cookie("WC_shipTypeValueOrderId");
		if (shipTypeValueOrderId == orderId) {
			var shipTypeValue = dojo.cookie("WC_shipTypeValue");
			return shipTypeValue;
		} else {
			return "";
		}
	},

	/**
	 * This function adds or updates the shipment type value for the current order to the cookie.
	 *
	 * @param {String} value The new pick up store ID. 
	 * @param {String} orderId The order ID.
	 *
	 */
	setShipTypeValueToCookieForOrder:function(value, orderId) {
		var newShipTypeValue = value;
		if (newShipTypeValue != null && newShipTypeValue != "undefined" && newShipTypeValue != "") {
			var shipTypeValueOrderId = dojo.cookie("WC_shipTypeValueOrderId");
			if (shipTypeValueOrderId != orderId) {
				dojo.cookie("WC_shipTypeValueOrderId", null, {expires: -1});
				dojo.cookie("WC_shipTypeValueOrderId", orderId, {path: "/"});
			}
			var currentShipTypeValue = this.getShipTypeValueFromCookieForOrder(orderId);
			if (newShipTypeValue != currentShipTypeValue) {
				dojo.cookie("WC_shipTypeValue", null, {expires: -1});
				dojo.cookie("WC_shipTypeValue", newShipTypeValue, {path: "/"});
			}
		}
		//select the proper options that are saved in context
		if (newShipTypeValue == "pickUp") {
			if (document.getElementById("scheduling_options")) {
				document.getElementById("scheduling_options").style.display="none";
				dojo.cookie("WC_recurringOrder_"+orderId, "false", {path: "/"});
				if (document.getElementById("recurringOrder")) {
					document.getElementById("recurringOrder").checked = false;
				}
				this.hideShowNonRecurringOrderMsg(orderId);
			}
		} else if (newShipTypeValue == "shopOnline") {
			if (document.getElementById("scheduling_options")) {
				document.getElementById("scheduling_options").style.display="block";
				this.hideShowNonRecurringOrderMsg(orderId);
			}
		}
	},

	/**
	 * This function select the proper shipmode in the shopping cart page that is saved in the cookie.
	 *
	 * @param {String} orderId The order identifier of the current shopping cart. 
	 *
	 */
	displaySavedShipmentTypeForOrder:function(orderId) {
		var shipTypeValueOrderId = dojo.cookie("WC_shipTypeValueOrderId");
		if (shipTypeValueOrderId != orderId) {
			dojo.cookie("WC_shipTypeValueOrderId", null, {expires: -1});
			dojo.cookie("WC_shipTypeValue", null, {expires: -1});
		} else {
			var currentShipTypeValue = this.getShipTypeValueFromCookieForOrder(orderId);
				
			//select the proper shipmode that is saved in context
			if (currentShipTypeValue == "pickUp") {
				if(document.getElementById("shipTypePickUp").disabled == false){
						document.getElementById("shipTypePickUp").checked = true;
						if (document.getElementById("scheduling_options")) {
							document.getElementById("scheduling_options").style.display="none";
							dojo.cookie("WC_recurringOrder_"+orderId, "false", {path: "/"});
							if (document.getElementById("recurringOrder")) {
								document.getElementById("recurringOrder").checked = false;
							}
						}
				}else{
						document.getElementById("shipTypeOnline").checked = true;
						if (document.getElementById("scheduling_options")) {
							document.getElementById("scheduling_options").style.display="block";
						}
						this.setShipTypeValueToCookieForOrder("shopOnline", orderId);
				}
			} else if (currentShipTypeValue == "shopOnline") {
				document.getElementById("shipTypeOnline").checked = true;
				if (document.getElementById("scheduling_options")) {
					document.getElementById("scheduling_options").style.display="block";
				}
			}
		}
		this.hideShowNonRecurringOrderMsg(orderId,true);
	},

	/**
	 * This function is used to show all the cues to the shopper when in the shopping cart page. It shows messages for the following:
	 * - guest shopper attempting to checkout a recurring order
	 * - it flags non recurring items when attempting to checkout as a recurring order
	 *
	 * @param {String} orderId 			The order identifier of the current shopping cart. 
	 * @param {String} fromPageLoad Tells if this function is called on a page load, which does not need the error message to show.
	 */
	hideShowNonRecurringOrderMsg:function(orderId,fromPageLoad) {
		if ( (document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") && document.getElementById("shipTypeOnline").checked) ||
					(document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") == null)) {
			dojo.cookie("WC_recurringOrder_"+orderId, "true", {path: "/"});
		} else {
			dojo.cookie("WC_recurringOrder_"+orderId, "false", {path: "/"});
		}
		
		if (document.getElementById("nonRecurringOrderItems") && document.getElementById("nonRecurringOrderItems").value != "") {
			if (document.getElementById("nonRecurringOrderItemsCount") && document.getElementById("numOrderItemsInOrder")) {
				var totalItems = document.getElementById("numOrderItemsInOrder").value;
				var totalNonRecurringItems = document.getElementById("nonRecurringOrderItemsCount").value;
				if (totalItems == totalNonRecurringItems) {
					if (document.getElementById("scheduling_options")) {
						document.getElementById("scheduling_options").style.display = "none";
						dojo.cookie("WC_recurringOrder_"+orderId, "false", {path: "/"});
						if (document.getElementById("recurringOrder")) {
							document.getElementById("recurringOrder").checked = false;
						}
						return;
					}// else if (document.getElementById("scheduling_options") && document.getElementById("shipTypeOnline") && document.getElementById("shipTypeOnline").checked) {
					//	document.getElementById("scheduling_options").style.display = "block";
					//}
				}
			}
			var orderItemIds = document.getElementById("nonRecurringOrderItems").value;
			var orderItemIdArray = orderItemIds.split(",");
			for(var i=0; i<orderItemIdArray.length; i++){
				if (document.getElementById("nonRecurringItem_"+orderItemIdArray[i])) {
					if ( (document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") && document.getElementById("shipTypeOnline").checked) ||
								(document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") == null)) {
						document.getElementById("nonRecurringItem_"+orderItemIdArray[i]).style.display = "block";
					} else {
						document.getElementById("nonRecurringItem_"+orderItemIdArray[i]).style.display = "none";
					}
				}
			}
			if ( (document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") && document.getElementById("shipTypeOnline").checked && !fromPageLoad) ||
						(document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") == null && !fromPageLoad)) {
				MessageHelper.displayErrorMessage(MessageHelper.messages["RECURRINGORDER_ERROR"]);
			}
		}
	},

	/** 
	* Constructs the next URL to call when user is already signed on 
	* 3 scenarios to handle:
	* 	1. Registered user selects to shop online -> goes to the shipping and billing page
	* 	2. Registered user selects to pick up in store - 2 variations:
	*		2a. User has not yet selected a physical store (WC_physicalStores cookie is empty) -> 
	*				Goes to store selection page
	*		2b. User has selected at least one store (WC_physicalStore cookie is not empty) ->
	*				Updates shipmode then goes to shipping and billing page
	* @param {String} billingShippingPageURLForOnline The URL to the billing and shipping page of the online checkout path
	* @param (String) physicalStoreSelectionURL The URL to the physical store selection page of the pick up in store checkout path
	*/
	registeredUserContinue: function(billingShippingPageURLForOnline, physicalStoreSelectionURL) {
		if(CheckoutHelperJS.getFieldDirtyFlag()){
			if(document.getElementById("ShoppingCart_NonAjaxUpdate") != null){
				MessageHelper.formErrorHandleClient(document.getElementById("ShoppingCart_NonAjaxUpdate"), MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
				return;
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
				return;
			}
		}
    	
		//For handling multiple clicks
		//if(!submitRequest()){
			//return;
		//}	
		
		var deletePaymentInstructionsURL = "";
		var paymentInstructionIds ="";//document.getElementById("existingPaymentInstructionId").value;
		if (paymentInstructionIds != "") {	
			var paymentInstructionsArray = paymentInstructionIds.split(",");
			deletePaymentInstructionsURL = "OrderChangeServicePIDelete?";
			for (var i=0; i<paymentInstructionsArray.length; i++) {
				if (i!=0) {
					deletePaymentInstructionsURL = deletePaymentInstructionsURL + "&";
				}
				deletePaymentInstructionsURL = deletePaymentInstructionsURL + "piId=" + paymentInstructionsArray[i];
			}
			deletePaymentInstructionsURL = deletePaymentInstructionsURL + "&URL=";
		}
		
		if (this.isStoreLocatorEnabled() && this.isPickUpInStore()) {
			document.location.href = physicalStoreSelectionURL;
		} else {
			//need to pass in orderItemId here for OrderChangeServiceItemUpdate so it will call DoInventoryActionCmd to get fulfillment center ID
			var nextLink = 'OrderChangeServiceItemUpdate?remerge=***&check=*n&allocate=***&backorder=***&calculationUsage=-1,-2,-5,-6,-7&orderItemId_0='+this.orderItemId +'&errorViewName=AjaxOrderItemDisplayView'+'&orderId=.&URL=';
			document.location.href = nextLink + billingShippingPageURLForOnline;
		}
	},

	/**
	* Constructs the next URL to call when user is not signed on and selected to continue checkout with 
	* guest user mode
	* 3 scenarios to handle:
	* 	1. Guest user selects to shop online -> goes to the shipping and billing page
	* 	2. Guest user selects to pick up in store - 2 variations:
	*		2a. User has not yet selected a physical store (WC_physicalStores cookie is empty) -> 
	*				Goes to store selection page
	*		2b. User has selected at least one store (WC_physicalStore cookie is not empty) ->
	*				Updates shipmode then goes to shipping and billing page
	* @param {String} billingShippingPageURLForOnline The URL to the billing and shipping page of the online checkout path
	* @param (String) physicalStoreSelectionURL The URL to the physical store selection page of the pick up in store checkout path
	*/
	guestShopperContinue: function(billingShippingPageURLForOnline, physicalStoreSelectionURL) {
		//Changed by Jayashree for implementing the exception handling scenario in check out page
		if(CheckoutHelperJS.getFieldDirtyFlag()){
			if(document.getElementById("ShoppingCart_NonAjaxUpdate") != null){
				MessageHelper.formErrorHandleClient(document.getElementById("ShoppingCart_NonAjaxUpdate"), MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
				return;
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
				return;
			}
		}
		
		//For handling multiple clicks
		if(!submitRequest()){
			//return;
		}
		
		var deletePaymentInstructionsURL = "";
		var paymentInstructionIds = "";//document.getElementById("existingPaymentInstructionId").value;
		if (paymentInstructionIds != "") {	
			var paymentInstructionsArray = paymentInstructionIds.split(",");
			deletePaymentInstructionsURL = "OrderChangeServicePIDelete?";
			for (var i=0; i<paymentInstructionsArray.length; i++) {
				if (i!=0) {
					deletePaymentInstructionsURL = deletePaymentInstructionsURL + "&";
				}
				deletePaymentInstructionsURL = deletePaymentInstructionsURL + "piId=" + paymentInstructionsArray[i];
			}
			deletePaymentInstructionsURL = deletePaymentInstructionsURL + "&URL=";
		}
		
		
		if (this.isStoreLocatorEnabled() && this.isPickUpInStore()) {
			document.location.href = deletePaymentInstructionsURL + physicalStoreSelectionURL;
		} else {
			//need to pass in orderItemId here for OrderChangeServiceItemUpdate so it will call DoInventoryActionCmd to get fulfillment center ID
			
			
			// TODO - Inventory Allocation Disabled for ETR1 - Needs to be enabled post ETR1.
			//deletePaymentInstructionsURL = 'OrderChangeServiceItemUpdate?remerge=***&check=*n&allocate=***&backorder=***&calculationUsage=-1,-2,-3,-4,-5,-6,-7&orderItemId_0='+this.orderItemId +'&errorViewName=AjaxOrderItemDisplayView'+'&orderId=.&guestChkout=1&URL=';
			deletePaymentInstructionsURL = 'OrderChangeServiceItemUpdate?remerge=***&calculationUsage=-1,-2,-5,-6,-7&orderItemId_0='+this.orderItemId +'&errorViewName=AjaxOrderItemDisplayView'+'&orderId=.&guestChkout=1&URL=';

			document.location.href = deletePaymentInstructionsURL + billingShippingPageURLForOnline;
		}
	},

	/**
	* Constructs the next URL to call when user is not signed on and selected to sign in before checkout
	* 3 scenarios to handle:
	* 	1. User selects to shop online -> invokes logon URL
	* 	2. User selects to pick up in store - 2 variations:
	*		2a. User has not yet selected a physical store (WC_physicalStores cookie is empty) -> 
	*				After logon URL, go to the store selection page
	* 	2b. User has selected at least one store (WC_physicalStore cookie is not empty) ->
	*				Updates shipmode then invokes logon URL	
	* @param {String} logonURL URL to perform user logon 
	* @param {String} orderMoveURL URL to call order move after user has logged on
	* @param {String} billingShippingPageURLForOnline The URL to the billing and shipping page of the online checkout path
	* @param (String) physicalStoreSelectionURL The URL to the physical store selection page of the pick up in store checkout path
	*/
	guestShopperLogon: function(logonURL, orderMoveURL, billingShippingPageURLForOnline, physicalStoreSelectionURL) {
		if(CheckoutHelperJS.getFieldDirtyFlag()){
			if(document.getElementById("ShoppingCart_NonAjaxUpdate") != null){
				MessageHelper.formErrorHandleClient(document.getElementById("ShoppingCart_NonAjaxUpdate"), MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
				return;
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
				return;
			}
		}
		
		var completeOrderMoveURL = orderMoveURL;
		var afterOrderCalculateURL = "";
		
		if (this.isStoreLocatorEnabled() && this.isPickUpInStore()) {
			afterOrderCalculateURL = physicalStoreSelectionURL;
		} else {
			afterOrderCalculateURL = billingShippingPageURLForOnline;
		}
		
		// change URL of logon link
		completeOrderMoveURL = completeOrderMoveURL + "&URL=OrderCalculate%3FURL=" + afterOrderCalculateURL + "&calculationUsageId=-1&calculationUsageId=-2&calculationUsageId=-7";
		document.AjaxLogon.URL.value = completeOrderMoveURL;
		document.location.href = logonURL;
	},
	 	
	/** 
	* Function to call when Quick Checkout button is pressed
	* 2 scenarios to handle:
	*   1. User selects to shop online -> proceed to call CheckoutHelperJS.updateCartWithCheckoutProfile
	*   2. User selects to pick up in store -> display error message to indicate quick checkout option is only
	*      available with online shopping option
	* @param {String} quickOrderId order id of this order
	*/
	updateCartWithQuickCheckoutProfile: function(quickOrderId) {
		if (this.isStoreLocatorEnabled() && this.isPickUpInStore()) {
			MessageHelper.displayErrorMessage(MessageHelper.messages["message_QUICK_CHKOUT_ERR"]);
		} else {
			if(CheckoutHelperJS.getFieldDirtyFlag()){
				if(document.getElementById("ShoppingCart_NonAjaxUpdate") != null){
					MessageHelper.formErrorHandleClient(document.getElementById("ShoppingCart_NonAjaxUpdate"), MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
					return;
				}else{
					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_UPDATE_FIRST_SHOPPING_CART"]);
					return;
				}
			}
			CheckoutHelperJS.setCommonParameters(this.langId, this.storeId, this.catalogId);
			CheckoutHelperJS.updateCartWithQuickCheckoutProfile(quickOrderId);	
		}
	},
	
	/** 
	* Sets common parameters used by this javascript object
	* @param {String} langId language ID to use
	* @param {String} storeId store ID to use
	* @param {String} catalog Catalog ID to use
	*/
	setCommonParameters:function(langId,storeId,catalogId){
		this.langId = langId;
		this.storeId = storeId;
		this.catalogId = catalogId;
	},
	
	/** 
	* Sets orderItemId used by this javascript object
	* @param {String} orderItemId OrderItemId to use
	*/
	setOrderItemId:function(orderItemId){
		this.orderItemId = orderItemId;
	},
		
	/**
	* sets to tell if store locator feature is enabled
	* @param {boolean} flag Contains value of true or false
	*/
	setStoreLocatorEnabled:function(flag){
		this.storeLocatorEnabled = flag;
	},
	
	/**
	* indicates if store locator feature is enabled
	*/
	isStoreLocatorEnabled:function(){
		return this.storeLocatorEnabled;
	},
	
	/**
	* This function is called by the CheckoutStoreSelection.jsp "Next" button. It's job is to decide if it should go to
	* the next page. If there are no missing information it submits the call to the server to save the pick up location
	* for all the order items and then goes to the next page.
	* @param {Object} form The form that contains the order items and that need to be submitted 
	*/
	submitStoreSelectionForm:function(form) {
		var phyStoreId = PhysicalStoreCookieJS.getPickUpStoreIdFromCookie();

		if (phyStoreId != null && phyStoreId != "") {
			form["physicalStoreId"].value = phyStoreId;
			form.submit();
		} else {
			if(document.getElementById("storeSelection_NextButton") != null){
				MessageHelper.formErrorHandleClient(document.getElementById("storeSelection_NextButton"), MessageHelper.messages["message_NO_STORE"]);
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages["message_NO_STORE"]);
			}
		}
	},
	
	/**
	* This function is called by the CheckoutPayInStore.jsp "Next" button. It's job is to decide if it should go to
	* the next page. If the action is to use "PayInStore" then it directly goes to next page, otherwise it does 
	* validation on the address form and if there are no missing information it submits the call to the server to 
	* create the address and then goes to the next page.
	* 
	* @param {String} formName Name of the form that contains the address and need to be submitted 
	* @param {String} stateDivName Name of the div that has the "state" field
	* @param {String} hasValidAddresses boolean indicating if the user has at least one valid address for checkout purposes
	*/
	submitAddressForm:function(formName, stateDivName, hasValidAddresses) {
		var form = document.forms[formName];
		if (stateDivName != "") {
			AddressHelper.setStateDivName(stateDivName);
		}
		
		var payInStore = false;
		if (document.getElementById("payInStorePaymentOption").checked) {
			payInStore = true;
		}
		
		var deletePaymentInstructionsURL = "";
		var paymentInstructionIds = form.existingPaymentInstructionId.value;
		if (paymentInstructionIds != "") {	
			var paymentInstructionsArray = paymentInstructionIds.split(",");
			deletePaymentInstructionsURL = "OrderChangeServicePIDelete?";
			for (var i=0; i<paymentInstructionsArray.length; i++) {
				if (i!=0) {
					deletePaymentInstructionsURL = deletePaymentInstructionsURL + "&";
				}
				deletePaymentInstructionsURL = deletePaymentInstructionsURL + "piId=" + paymentInstructionsArray[i];
			}
			deletePaymentInstructionsURL = deletePaymentInstructionsURL + "&URL=";
		}

		if (hasValidAddresses) {
			//need to pass in orderItemId here for OrderChangeServiceItemUpdate so it will call DoInventoryActionCmd to get fulfillment center ID
			document.location.href = deletePaymentInstructionsURL + "OrderChangeServiceItemUpdate?URL=DOMOrderShippingBillingView&remerge=***&check=*n&allocate=***&backorder=***&calculationUsage=-1,-2,-3,-4,-5,-6,-7&orderItemId_0="+this.orderItemId +"&storeId="+this.storeId+"&catalogId="+this.catalogId+"&langId="+this.langId+"&payInStore="+payInStore;
		
		} else if (AddressHelper.validateAddressForm(form)) {
			//need to pass in orderItemId here for OrderChangeServiceItemUpdate so it will call DoInventoryActionCmd to get fulfillment center ID
			form.URL.value = deletePaymentInstructionsURL + "OrderChangeServiceItemUpdate?remerge=***&check=*n&allocate=***&backorder=***&calculationUsage=-1,-2,-3,-4,-5,-6,-7&orderItemId_0="+this.orderItemId +"&URL=DOMOrderShippingBillingView?payInStore="+payInStore;
			form.submit();
		}
	}
}	
/***************ShipmodeSelectionExt.js ends*****************/

/***************tealeafWC.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

 
TealeafWCJS ={
	
	processDOMEvent:function(event){
		if (typeof TLT != 'undefined') {
			TLT.processDOMEvent(event);
		}
	},

	rebind:function(id){
		if (typeof TLT != 'undefined' && TLT.rebind) {
		   var scope = dojo.byId(id);
		   if (scope) {
			   TLT.rebind(scope);
		   }
		}
	},
	
	createExplicitChangeEvent:function(id){
	   if (typeof TLT != 'undefined') {
			if (document.createEventObject && dojo.isIE < 9) { 				   // for IE 
				var evt=document.createEventObject();
				dojo.byId(id).fireEvent("onchange",evt);
			} else {
				var evt=document.createEvent("HTMLEvents");
				evt.initEvent("change", true, false);
				dojo.byId(id).dispatchEvent(evt);	
			} 
		}		
	}
}
/***************tealeafWC.js ends*****************/

/***************jquery.dlmenu.js starts*****************/

/**
 * jquery.dlmenu.js v1.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {

	'use strict';

	// global
	var Modernizr = window.Modernizr, $body = $( 'body' );

	$.DLMenu = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.DLMenu.defaults = {
		// classes for the animation effects
		animationClasses : { classin : 'dl-animate-in-1', classout : 'dl-animate-out-1' },
		// callback: click a link that has a sub menu
		// el is the link element (li); name is the level name
		onLevelClick : function( el, name ) { return false; },
		// callback: click a link that does not have a sub menu
		// el is the link element (li); ev is the event obj
		onLinkClick : function( el, ev ) { return false; }
	};

	$.DLMenu.prototype = {
		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.DLMenu.defaults, options );
			// cache some elements and initialize some variables
			this._config();
			
			var animEndEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				},
				transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				};
			// animation end event name
			this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
			// transition end event name
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu',
			// support for css animations and css transitions
			this.supportAnimations = Modernizr.cssanimations,
			this.supportTransitions = Modernizr.csstransitions;

			this._initEvents();

		},
		_config : function() {
			this.open = false;
			this.$trigger = $( '.dl-trigger' );
			this.$menu = this.$el.children( 'ul.dl-menu' );
			this.$menuitems = this.$menu.find( 'li:not(.dl-back)' );
			this.$el.find( 'ul.dl-submenu' ).prepend( '<li class="dl-back"><a href="#">Back</a></li>' );
			this.$back = this.$menu.find( 'li.dl-back' );
		},
		_initEvents : function() {

			var self = this;

			this.$trigger.on( 'click.dlmenu', function() {
				
				if( self.open ) {
					self._closeMenu();					
				} 
				else {
					self._openMenu();
				}
				return false;

			} );

			this.$menuitems.on( 'click.dlmenu', function( event ) {
				
				event.stopPropagation();

				var $item = $(this),
					$submenu = $item.children( 'ul.dl-submenu' );

				if( $submenu.length > 0 ) {

					var $flyin = $submenu.clone().css( 'opacity', 0 ).css ( 'top', 2 ).insertAfter( self.$menu ),
						onAnimationEndFn = function() {
							self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classout ).addClass( 'dl-subview' );
							$item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
							$flyin.remove();
						};

					setTimeout( function() {
						$flyin.addClass( self.options.animationClasses.classin );
						self.$menu.addClass( self.options.animationClasses.classout );
						if( self.supportAnimations ) {
							self.$menu.on( self.animEndEventName, onAnimationEndFn );
						}
						else {
							onAnimationEndFn.call();
						}

						self.options.onLevelClick( $item, $item.children( 'a:first' ).text() );
					} );

					return false;

				}
				else {
					self.options.onLinkClick( $item, event );
				}

			} );

			this.$back.on( 'click.dlmenu', function( event ) {
				
				var $this = $( this ),
					$submenu = $this.parents( 'ul.dl-submenu:first' ),
					$item = $submenu.parent(),

					$flyin = $submenu.clone().insertAfter( self.$menu );

				var onAnimationEndFn = function() {
					self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classin );
					$flyin.remove();
				};

				setTimeout( function() {
					$flyin.addClass( self.options.animationClasses.classout );
					self.$menu.addClass( self.options.animationClasses.classin );
					if( self.supportAnimations ) {
						self.$menu.on( self.animEndEventName, onAnimationEndFn );
					}
					else {
						onAnimationEndFn.call();
					}

					$item.removeClass( 'dl-subviewopen' );
					
					var $subview = $this.parents( '.dl-subview:first' );
					if( $subview.is( 'li' ) ) {
						$subview.addClass( 'dl-subviewopen' );
					}
					$subview.removeClass( 'dl-subview' );
				} );

				return false;

			} );
			
		},
		closeMenu : function() {
			if( this.open ) {
				this._closeMenu();
			}
		},
		_closeMenu : function() {
			var self = this,
				onTransitionEndFn = function() {
					self.$menu.off( self.transEndEventName );
					self._resetMenu();
				};
			
			this.$menu.removeClass( 'dl-menuopen' );
			this.$menu.addClass( 'dl-menu-toggle' );
			this.$trigger.removeClass( 'dl-active' );
			$('.contenedor').removeClass('active');
			
			if( this.supportTransitions ) {
				this.$menu.on( this.transEndEventName, onTransitionEndFn );
			}
			else {
				onTransitionEndFn.call();
			}

			this.open = false;
		},
		openMenu : function() {
			if( !this.open ) {
				this._openMenu();
			}
		},
		_openMenu : function() {
			var self = this;
			// clicking somewhere else makes the menu close
			$body.off( 'click' ).on( 'click.dlmenu', function() {
				self._closeMenu() ;
			} );
			this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
				$( this ).removeClass( 'dl-menu-toggle' );
			} );
			this.$trigger.addClass( 'dl-active' );
			this.open = true;
			$('.contenedor').addClass('active');			
		},
		// resets the menu to its original state (first level of options)
		_resetMenu : function() {
			this.$menu.removeClass( 'dl-subview' );
			this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.dlmenu = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'dlmenu' );
				if ( !instance ) {
					logError( "cannot call methods on dlmenu prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for dlmenu instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'dlmenu' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );

/***************jquery.dlmenu.js ends*****************/