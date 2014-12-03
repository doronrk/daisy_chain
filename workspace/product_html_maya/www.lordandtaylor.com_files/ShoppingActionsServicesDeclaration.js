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
shoppingActionsServicesDeclarationJS = {
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

	/**
	 * Add an item to a shopping cart in Ajax mode. A message is displayed after
	 * the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AddOrderItem",
		actionId: "AddOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemAdd",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			if (serviceResponse.adjustedQuantity) { // Insufficent inventory
				// Adjust selection dropdown
				/*Hassane - moved the mesage near quatity dropdown
				MessageHelper.displayStatusMessage(MessageHelper.messages["MSG_QUANTITY_ADJUSTED"] + serviceResponse.adjustedQuantity + ".");
				*/
				MessageHelper.displayStockErrorMsg(MessageHelper.messages["MSG_QUANTITY_ADJUSTED"] + serviceResponse.adjustedQuantity + ".");
			} else {
				// Do not show this message. When item is added, we open up mini cart to display the currently added item.
				MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_ADDED"]);
			}
			cursor_clear();
			if(shoppingActionsJS){
				
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
					shoppingActionsJS.selectedAttributes = new Object();
					dojo.publish('attributesChanged_'+ shoppingActionsJS.baseCatalogEntryId, [dojo.toJson(shoppingActionsJS.selectedAttributes)]);
					for(var i=0; i<attributes.length; i++){
						if(attributes[i] != null){
							attributes[i].value = "";
							attributes[i].onchange();
						}
					}
				}
				
			}
			if(typeof(ShipmodeSelectionExtJS)!= null && typeof(ShipmodeSelectionExtJS)!='undefined'){
				ShipmodeSelectionExtJS.setOrderItemId(serviceResponse.orderItemId[0]);
			}
			
			//Updating xorder details ajax call
			if(UtilitiesJS.isLTINTLFlowRequired()){
				var dataParam = [];
		        dataParam.storeId = '10151';
		        //dataParam.userId = UtilitiesJS.getUserIdIntl('10151');
		        dataParam.isIntlFlow = 'Y';
		        dataParam.bopisEligiblity = 'N';
		        dataParam.INTL = UtilitiesJS.getCookie("INTL");
		        //Fix #342
		        dataParam.orderItemId=serviceResponse.orderItemId[0];
		        
	        	wc.service.invoke("HBCAjaxUpdateXordersCmdATB", dataParam);
			}
			
			//Condition added for defect 2776 fix
			if (wc.render.getRefreshControllerById('promoGiftItemPopupAreaController')){
				var promoURL = getAbsoluteURL() + 'AjaxPromoGiftItemView?orderItemId=' + serviceResponse.orderItemId[0] + '&storeId=' + storeId + '&catalogId=' + catalogId + '&langId=' + langId;
				CommonControllersDeclarationJS.setControllerURL('promoGiftItemPopupAreaController', promoURL);
				//check for free gifts
				wc.render.updateContext('promoGiftItemContext', null);
			}
			
			if (typeof HBCAnalytics != "undefined"){
				var triggerOptions = {"getProducts":HBCAnalytics.getInputAsArray(serviceResponse.orderItemId)};
				HBCAnalytics.triggerEvent(HBCAnalytics.EventTypes.AddToCart, triggerOptions);
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
			 		MessageHelper.displayErrorMessage(storeNLS["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
 				} else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
					var tempString = storeNLS["GENERICERR_MAINTEXT"];
					tempString = dojo.string.substitute(tempString,{0:storeNLS["GENERICERR_CONTACT_US"]});
 					MessageHelper.displayErrorMessage(tempString);
 				} else if (serviceResponse.errorMessageKey == "INVALID_PARAMETER_VALUE_ZERO_QUANTITY") {
 					/*Hassane - moved the mesage near quatity dropdown
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERR_PRODUCT_OUT_OF_STOCK"]);
 					*/
 					MessageHelper.displayStockErrorMsg(MessageHelper.messages["ERR_PRODUCT_OUT_OF_STOCK"]);
 				} else if (serviceResponse.errorMessageKey != "_ERR_PROD_NOT_ORDERABLE" && serviceResponse.errorMessageKey != "_ERR_CATALOG_ENTRY_MARK_FOR_DELETE"){
 					// commenting for rtc  3951 , need to see whats wrong 
// 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERR_MAXIMUM_THRESHOLD_REACHED"]);
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
	wc.service.declare({
		id: 'HBCAjaxUpdateXordersCmdATB',
		actionId: 'HBCAjaxUpdateXordersCmdATB',
		url: getAbsoluteURL() + 'HBCAjaxUpdateXordersCmd',
		formId: '',
		successHandler: function(serviceResponse) {			
			console.log("HBCAjaxUpdateXordersCmdATB sucess");
		}
	 
		,failureHandler: function(serviceResponse) {
			//alert("Failure");
		}

	})