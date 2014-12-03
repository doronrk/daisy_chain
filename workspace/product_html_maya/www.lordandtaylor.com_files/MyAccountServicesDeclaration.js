//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2010 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------


/**
 * @fileOverview This javascript contains declarations of AJAX services used within
 * WebSphere Commerce.
 */

/* Import dojo classes */
dojo.require("wc.service.common");

/**
 * @class This class stores common parameters needed to make the service call.
 */
MyAccountServicesDeclarationJS = {
	/* The common parameters used in service calls */
	langId: "-1",
	storeId: "",
	catalogId: "",
	/**
	 * This function initializes common parameters used in all service calls.
	 * @param {int} langId The language id to use.
	 * @param {int} storeId The store id to use.
	 * @param {int} catalogId The catalog id to use.
	 */

	setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
	}
}

		wc.service.declare({
			  id: "AjaxGiftboxSelect",
			  actionId: "AjaxGiftboxSelect",
			  url: "AjaxGiftboxSelect",
			  formId: "",
				  
		successHandler: function(serviceResponse) {
			//console.log("AjaxGiftboxSelect success");
			//console.log(serviceResponse);
			
			if(document.getElementById('estimateGBCharges') != null){
				document.getElementById('estimateGBCharges').innerHTML = "$" + serviceResponse.giftBoxTotal.toFixed(2);
			}
			document.getElementById('estimateTotalCharges').innerHTML = "$" + serviceResponse.orderTotal;
			
			
			document.getElementById('giftBoxRunningTotal').value =  serviceResponse.giftBoxTotal.toFixed(2)
			document.getElementById('gift-price').innerHTML = "$" + serviceResponse.giftBoxTotal.toFixed(2);
			if(serviceResponse.giftBoxTotal > 0.00){
			document.getElementById('gift-box-total').innerHTML = "$" + serviceResponse.giftBoxTotal.toFixed(2);
			}
			
//			CheckoutPayments.updateAmountFields(serviceResponse.orderTotal);
			
			document.getElementById('CurrentOrderTotal').value=HBC.formatTotalHiddenForPayment();
			//wc.service.invoke("AjaxTenderType",params);
			CommonControllersDeclarationJS.setControllerURL('estChargeDisplayAreaController', document.getElementById('EstimateShipChargeURL').value );
			wc.render.updateContext('shippingChargeContext', null);
			document.getElementById('CurrentOrderTotal').value=HBC.formatTotalHiddenForPayment();
			wc.service.invoke("AjaxTenderType",params);

			
			cursor_clear();			
			//console.log(serviceResponse.giftBoxTotal);
			//console.log(serviceResponse.orderTotal);
		},
		failureHandler: function(serviceResponse) {			
			//console.log("AjaxGiftboxSelect failed");
			cursor_clear();
			
		} 
		}),
	/* True fit changes UC-6 starts*/
	/**
	 *  On successful register to truefit HBCTrueFitUpdateCmd is invoked 
	 *  and after command execution HBC_WELC cookie is updated
	 *  @constructor
	 */
		wc.service.declare({
            id: "HBCTrueFitUpdateCmd",
            actionId: "HBCTrueFitUpdateCmd",
            url: "HBCTrueFitUpdateCmd",
            formId: ""
            
            ,successHandler: function(serviceResponse) {
      
            
           /* var cookieValue=UtilitiesJS.getCookie("HBC_WELC");
            if(cookieValue != "" && cookieValue.indexOf("TF=Y")==-1){
			var updatedValue=cookieValue+"|TF=Y"; 
			UtilitiesJS.setCookie("HBC_WELC",updatedValue);
            }*/
			
            console.log("Ajax success :)");
           //location.reload();
            }
            ,failureHandler: function(serviceResponse) {
                  console.log("Ajax failure ,due to finder exception");
           // MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
                  } 
      
            }),
	  /* True fit changes UC-6 ends */
     
       /*Bopis changes for storing the physical store identifier in xorders table starts */
            wc.service.declare({
                id: "HBCAjaxUpdateXordersCmdBOPIS",
                actionId: "HBCAjaxUpdateXordersCmd",
                url: "HBCAjaxUpdateXordersCmd",
                formId: ""
                	
                ,successHandler: function(serviceResponse) {
            	
                console.log("Ajax success :)");
               //location.reload();
                }
                ,failureHandler: function(serviceResponse) {
                	                      
                console.log("Ajax failure ,due to finder exception");
               // MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
                      } 
          
                }),   
     /*Bopis changes for storing the physical store identifier in xorders table starts */
            
	/**
	 *  Updates the current Personal Information of the customer.
	 *  @constructor
	 */
	wc.service.declare({
		id: "UserRegistrationUpdate",
		actionId: "UserRegistrationUpdate",
		url: ( typeof(isBrazilStore) != 'undefined' && isBrazilStore) ? "AjaxPersonChangeServicePersonUpdateWithCheckoutProfile" : "AjaxPersonChangeServicePersonUpdate",
		formId: "Register"
	
	/**
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
	 
		,successHandler: function(serviceResponse) {
			cursor_clear();
		}

	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			var form = document.forms["Register"];
			form.logonPassword_old.value = "";
			form.logonPasswordVerify_old.value = ""
			if(serviceResponse){
				 if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} else {
					if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					}
				}
			}
			cursor_clear();
		}

	}),
	
	/**
	 *  Adds an item to the shopping cart from the customer wishlist in Ajax mode.
	 *  @constructor
	 */
	wc.service.declare({
		id: "AjaxAddOrderItem",
		actionId: "AjaxAddOrderItem",
		url: "AjaxOrderChangeServiceItemAdd",
		formId: ""
		
	/**
     * display a success message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDEDTOCART"]);
			cursor_clear();
		}

	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
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
	 *  Removes an item from the customer wishlist in Ajax mode.
	 *  @constructor
	 */
	wc.service.declare({
		id: "InterestItemDelete",
		actionId: "InterestItemDelete",
		url: "AjaxInterestItemDelete",
		formId: ""

	/**
     * display a success message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			// Updated message from "WISHLIST_REMOVEITEM" to "MY_ACCOUNT_WISHLIST_REMOVEITEM" for defect 760
			MessageHelper.displayStatusMessage(MessageHelper.messages["MY_ACCOUNT_WISHLIST_REMOVEITEM"]);
			
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);
			}
			cursor_clear();
			document.location.href = document.location.href;//Added this reload function to fix these defects #2115/2167
		}
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
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
	 *  Adds an item to the customer wishlist in Ajax mode.
	 *  @constructor
	 */
	wc.service.declare({
		id: "AjaxInterestItemAdd",
		actionId: "AjaxInterestItemAdd",
		url: "AjaxInterestItemAdd",
		formId: ""
	/**
     * display a success message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDED"]);
		}
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
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
	 *  This service enables the customer to email his/her wishlist. 
	 *  @constructor
	 */
	wc.service.declare({
		id: "InterestItemListMessage",
		actionId: "InterestItemListMessage",
		url: "AjaxInterestItemListMessage",
		formId: ""

	/**
     * hdes the progress bar and displays a success message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);			
			}
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_EMAILTOFRIEND"]);
			cursor_clear();
		}
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
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
	 * @constructor
	 */
	wc.service.declare({
		id: "AddBillingAddress",
		actionId: "AddBillingAddress",
		url: "AjaxPersonChangeServiceAddressAdd",
		formId: ""

	 /**
	  *	 calls the saveAddress function defined in the AddressHelper class.
	  *  @param (object) serviceResponse The service response object, which is the
	  *  JSON object returned by the service invocation. 
	  */
		,successHandler: function(serviceResponse) {
			requestSubmitted = false;
			javascript:AddressHelper.saveAddress('AddShippingAddress','shipping_address_form1');
		}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
						 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				  } else {
						 if (serviceResponse.errorMessageKey) {
								MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
				  }
		}

	}),
	
	/**
	 *  This service adds a shipping address to the order(s).
	 *  @constructor
	 */
	wc.service.declare({
		id: "AddShippingAddress",
		actionId: "AddShippingAddress",
		url: "AjaxPersonChangeServiceAddressAdd",
		formId: ""
	
	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
			//Gift registry changes begin			
			var isGRFlow=document.getElementById('isGiftRegistryFlow').value;		
			if(isGRFlow == 'true'){
				var params = [];		
				params.regAddressId	= document.getElementById('regAddressId').value;
				if($("#lable-ShipTo").hasClass("checked")){
					params.isShipToRegistrant="true";
				}
				else {
					params.isShipToRegistrant="false";
					params.shippingAddressId=serviceResponse.addressId;
				}
				wc.service.invoke('UpdateShippingAddressForGR',params);
			}			
			else{				
			// AndyK - Because of fix done for defect 995 in OrderShippingBilingDetails.jsp, needed to modify code here.
			//  For an unregistered user checkout, the shipping address needs to be updated on order items before
			//  redirecting to the OrderShippingBillingView page.
			// CheckoutHelperJS.updateAddressIdForOrderItem existing function handles this, and also redirects to
			//  OrderShippingBillingView sucesshandler.
			CheckoutHelperJS.updateAddressIdForOrderItem(serviceResponse.addressId);
			}
			//Gift registry changes end
			//document.location.href="OrderShippingBillingView?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId+"&shipmentType=single&orderPrepare=true";
		}

	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
						 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				  } else {
						 if (serviceResponse.errorMessageKey) {
								MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
				  }
		}

	}),
		
  /**
     * Gift Registry Enhancement changes begin
     */	
	wc.service.declare({
		id: "UpdateShippingAddressForGR",
		actionId: "UpdateShippingAddressForGR",
		url: "AjaxUpdateShippingAddressForGR",
		formId: ""
	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
			if("true" == serviceResponse.isShipToRegistrant){
				CheckoutHelperJS.updateAddressIdForOrderItem(serviceResponse.regAddrId);
			} else {
				CheckoutHelperJS.updateAddressIdForOrderItem(serviceResponse.shippingAddressId);
			}
		}
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
		}
	}),
	
	wc.service.declare({
		id: "AjaxHBCDeleteGiftRegistryItemsCmd",
		actionId: "AjaxHBCDeleteGiftRegistryItemsCmd",
		url: "AjaxHBCDeleteGiftRegistryItemsCmd",
		formId: ""

		,successHandler: function(serviceResponse) {		
		
		        if(serviceResponse.HBC_QUANT == 'true')
		        {
		        	UtilitiesJS.setCookie("HBC_QUANT","");		        	
		        	UtilitiesJS.displayBagItems();
		        }
		}		
		
		,failureHandler: function(serviceResponse) {
			
		}
	}),
	/**
	 * BOPIS Added 
	 * new one for storing store address as shipping address
	 * 
	 */
	wc.service.declare({
		id: "AddStoreAddressAsShippingAddress",
		actionId: "AddStoreAddressAsShippingAddress",
		url: "AjaxPersonChangeServiceAddressAdd",
		formId: ""
	
	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
		  CheckoutHelperJS.updateAddressIdForOrderItemOfStoreAddress(serviceResponse.addressId);
			
		}

	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
						 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				  } else {
						 if (serviceResponse.errorMessageKey) {
								MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
				  }
		}

	}),
	

	/**
	 *  BOPIS This service adds a store address to the order(s).
	 *  @constructor
	 */
	wc.service.declare({
		id: "AddStoreAddress",
		actionId: "AddStoreAddress",
		url: "AjaxPersonChangeServiceAddressAdd",
		formId: ""
	
	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {			
		/*This is to update the store address corresponding to the orderItems */	
		CheckoutHelperJS.updateStoreAddressIdForOrderItem(serviceResponse.addressId);	  
		}

	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
						 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				  } else {
						 if (serviceResponse.errorMessageKey) {
								MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
				  }
		}

	}),
	
	/**
	 *  This service adds an Address of the Guest to the store address to the order(s).
	 *  @constructor
	 */
	wc.service.declare({
		id: "AddGuestPickUpAddress",
		actionId: "AddGuestPickUpAddress",
		url: "AjaxPersonChangeServiceAddressAdd",
		formId: ""
	
	/**
	 *  BOPIS Update the Address Id to the orderItems
	 * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {			
		/*This is to update the Guest address corresponding to the orderItems */	
		CheckoutHelperJS.updateGuestPickUpAddressIdForOrderItem(serviceResponse.addressId);	  
		}

	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
						 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				  } else {
						 if (serviceResponse.errorMessageKey) {
								MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
				  }
		}

	}),

	wc.service.declare({
		id: "AjaxSendNotificationToReg",
		actionId: "AjaxSendNotificationToReg",
		url: "AjaxSendNotificationToReg",
		formId: ""
	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
		}
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
		}
	}),		
	/**
     * Gift registry changes end
     */
  /**
   * This services adds or removes a coupon from the order(s).
   * @constructor
   */
	wc.service.declare({
		id: "AjaxCouponsAddRemove",
		actionId: "AjaxCouponsAddRemove",
		url: "AjaxCouponsAddRemove",
		formId: ""

   /**
     * Hides all the messages and the progress bar.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
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
	   * UC2 This services removes a storeaddressId from the order(s) 
	   * @constructor
	   */
		wc.service.declare({
			id: "RemoveStoreAddOfOrderItems",
			actionId: "RemoveStoreAddOfOrderItems",
			url: "AjaxPersonChangeServiceAddressDelete",
			formId: ""

	   /**
	     * Hides all the messages and the progress bar.
	     * @param (object) serviceResponse The service response object, which is the
	     * JSON object returned by the service invocation.
	     */
			,successHandler: function(serviceResponse) {
		      var form = document.forms['orderItemfulfilmentSelectionForm'];
              form["fulfilmentType"].value = "ShipIt";
              form.submit();
             // alert("form submit success");
			
			}
			
		/**
	     * display an error message.
	     * @param (object) serviceResponse The service response object, which is the
	     * JSON object returned by the service invocation.
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
	 * This service adds or removes a wallet item.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxWalletItemProcessServiceDelete",
		actionId: "AjaxWalletItemProcessServiceDelete",
		url: "AjaxWalletItemProcessServiceDelete",
		formId: ""

	/**
	 * Hides all messages and the progress bar.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		cursor_clear();
	}
	
	/**
	 * Displays an error message in case of a failure.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
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
	 * This service cancels a subscription.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxCancelSubscription",
		actionId: "AjaxCancelSubscription",
		url: "AjaxSubscriptionChangeServiceSubscriptionCancel",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
			if(serviceResponse.subscriptionType == "RecurringOrder"){
				if(serviceResponse.state == "PendingCancel"){
					MessageHelper.displayStatusMessage(MessageHelper.messages["SCHEDULE_ORDER_PENDING_CANCEL_MSG"]);
				}
				else{
					MessageHelper.displayStatusMessage(MessageHelper.messages["SCHEDULE_ORDER_CANCEL_MSG"]);
				}
			}
			else{
				if(serviceResponse.state == "PendingCancel"){
					MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_PENDING_CANCEL_MSG"]);
				}
				else{
					MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_CANCEL_MSG"]);
				}
			}			
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
	 *  This service enables customer to Reorder an already existing order.
	 *  @constructor
	 */
	wc.service.declare({
		id: "OrderCopy",
		actionId: "OrderCopy",
		url: "AjaxOrderCopy",
		formId: ""

	 /**
	  *  Copies all the items from the existing order to the shopping cart and redirects to the shopping cart page.
	  *  @param (object) serviceResponse The service response object, which is the
	  *  JSON object returned by the service invocation.
	  */
		,successHandler: function(serviceResponse) {
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);			
			}	
			document.location.href="OrderProcessServiceOrderPrepare?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId+"&orderId="+serviceResponse.orderId+"&URL=AjaxCheckoutDisplayView?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId;
		}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == "_ERR_PROD_NOT_ORDERABLE") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["PRODUCT_NOT_BUYABLE"]);
			} else if (serviceResponse.errorMessageKey == "_ERR_INVALID_ADDR") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["INVALID_CONTRACT"]);
			}else {
				if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} 
				else {
					 if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					 }
				}
			}
			cursor_clear();
		}

	}),



	/**
	 *  This service enables customer to Renew a subscription.
	 *  @constructor
	 */
	wc.service.declare({
		id: "SubscriptionRenew",
		actionId: "SubscriptionRenew",
		url: "AjaxOrderCopy",
		formId: ""

	 /**
	  *  Copies all the items from the existing subscription to the shopping cart and calls service to update requested shipping date.
	  *  @param (object) serviceResponse The service response object, which is the
	  *  JSON object returned by the service invocation.
	  */
		,successHandler: function(serviceResponse) {
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);			
			}	

			var params = [];
			
			params.storeId		= MyAccountServicesDeclarationJS.storeId;
			params.catalogId	= MyAccountServicesDeclarationJS.catalogId;
			params.langId		= MyAccountServicesDeclarationJS.langId;			
			params.orderId      = serviceResponse.orderId;
			params.calculationUsage  = "-1,-2,-3,-4,-5,-6,-7";
			params.requestedShipDate = MyAccountDisplay.getSubscriptionDate();

			MyAccountDisplay.subscriptionOrderId = serviceResponse.orderId;
			MyAccountDisplay.subscriptionOrderItemId = serviceResponse.orderItemId[0];

			wc.service.invoke("SetRequestedShippingDate",params);
		}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == "_ERR_PROD_NOT_ORDERABLE") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["PRODUCT_NOT_BUYABLE"]);
			} else if (serviceResponse.errorMessageKey == "_ERR_INVALID_ADDR") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["INVALID_CONTRACT"]);
			}else {
				if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} 
				else {
					 if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					 }
				}
			}
			cursor_clear();
		}

	}),

	
	/**
	 *  This service sets the requested shipping date for a subscription renewal.
	 *  @constructor
	 */
	wc.service.declare({
		id: "SetRequestedShippingDate",
		actionId: "SetRequestedShippingDate",
		url: "AjaxOrderChangeServiceShipInfoUpdate",
		formId: ""
    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			cursor_clear();
			document.location.href="OrderProcessServiceOrderPrepare?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId+"&orderId="+serviceResponse.orderId+"&URL=AjaxCheckoutDisplayView?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId;		
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == "_ERR_ORDER_ITEM_FUTURE_SHIP_DATE_OVER_MAXOFFSET") {
				var params = [];

				params.storeId		= MyAccountServicesDeclarationJS.storeId;
				params.catalogId	= MyAccountServicesDeclarationJS.catalogId;
				params.langId		= MyAccountServicesDeclarationJS.langId;			
				params.orderId      = MyAccountDisplay.subscriptionOrderId;
				params.orderItemId      = MyAccountDisplay.subscriptionOrderItemId;
				params.calculationUsage  = "-1,-2,-3,-4,-5,-6,-7";
				wc.service.invoke("RemoveSubscriptionItem",params);

				MessageHelper.displayStatusMessage(MessageHelper.messages["CANNOT_RENEW_NOW_MSG"]);
			}
			else{
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
		}

	}),

	/**
	 * This service removes the subscription item from the shopping cart if renewal fails.
	 * @constructor
	 */
	wc.service.declare({
		id: "RemoveSubscriptionItem",
		actionId: "RemoveSubscriptionItem",
		url: "AjaxOrderChangeServiceItemDelete",
		formId: ""

		/**
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation.
		 */
		,successHandler: function(serviceResponse) {
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
 *  This service enables customer to cancel a scheduled order or an order waiting for approval.
 *  @constructor
 */
wc.service.declare({
	id: "AjaxScheduledOrderCancel",
	actionId: "AjaxScheduledOrderCancel",
	url: "AjaxOrderChangeServiceScheduledOrderCancel",
	formId: ""

	/**
	 * Displays a success message.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		cursor_clear();
		MessageHelper.displayStatusMessage(MessageHelper.messages["MO_ORDER_CANCELED_MSG"]);
	}
	
	/**
	 * Displays an error message.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
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
	 *  
	 *  @constructor
	 */
	wc.service.declare({
		id: "AjaxScheduledAppointment",
		actionId: "AjaxScheduledAppointment",
		url: "WeddingControllerCmd",
		formId: "weddingform-register"

		/**
		 * Displays a success message.
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation.
		 */
			,successHandler: function(serviceResponse) {	/*To Bring time trade Data within the pop up*/
			
			var timeTradeurl="";	
			if(langId == '-24'){  //Stage: https://nc1stage01.timetradesystems.com  Production: https://www.timetrade.com
			
				if(serviceResponse.profileCustomerAction == 'update' || serviceResponse.profileCustomerAction == 'delete')
				{
					
					document.location.href="AccountMyProfileFormView?langId="+langId+"&storeId="+serviceResponse.storeId+"&catalogId="+serviceResponse.catalogId;
					
					
				}
				else
				{	
				timeTradeurl = document.getElementById('timeTradeURLEnglish').value;
			   			
		       var url=timeTradeurl+"/app/hbc/workflows/HBC001/schedule/?locationId="
		      +serviceResponse.locationId+"&appointmentTypeId="+serviceResponse.appointmentTypeId+"&attendee_person_firstName="+serviceResponse.attendee_person_firstName+
		      "&attendee_person_lastName="+serviceResponse.attendee_person_lastName+"&attendee_phone_phoneNumber="+serviceResponse.attendee_phone_phoneNumber+
		      "&attendee_email="+serviceResponse.attendee_email;
				}
		  }
	      if(langId == '-25')
	            
	            { //Stage: https://fr-ca-nc1stage01.timetradesystems.com   Production : https://fr-ca.timetrade.com
	    		if(serviceResponse.profileCustomerAction == 'update' || serviceResponse.profileCustomerAction == 'delete')
				{
	    			
					document.location.href="AccountMyProfileFormView?langId="+langId+"&storeId="+serviceResponse.storeId+"&catalogId="+serviceResponse.catalogId;
	    			
					
				}
				else
				{	
	    		  timeTradeurl = document.getElementById('timeTradeURLFrench').value;
	            
	    		  var url=timeTradeurl+"/app/hbc/workflows/HBC001/schedule/?locationId="
	                  +serviceResponse.locationId+"&appointmentTypeId="+serviceResponse.appointmentTypeId+"&attendee_person_firstName="+serviceResponse.attendee_person_firstName+
	                  "&attendee_person_lastName="+serviceResponse.attendee_person_lastName+"&attendee_phone_phoneNumber="+serviceResponse.attendee_phone_phoneNumber+
	                  "&attendee_email="+serviceResponse.attendee_email;
				}
	    	}

		
	      if(serviceResponse.profileCustomerAction != 'update')
			{
			
	      $('a#my-button').attr('href', url);
	      document.getElementById('element_to_pop_up').innerHTML='<span class="b-close"> X</span>';
	  	  $('a#my-button').trigger( "click" );
			
			}
			}
			
		/**
		 * Displays an error message.
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation.
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
})
