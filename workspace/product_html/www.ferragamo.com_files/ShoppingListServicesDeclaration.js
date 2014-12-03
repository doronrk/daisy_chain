//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This javascript is used by the wish list pages to handle CRUD operations.
 * @version 1.0
 */

/**
 * This service allows customers to create a new shopping list
 * @constructor
 */
wc.service.declare({
	id:"ShoppingListServiceCreate",
	actionId:"ShoppingListServiceCreate",
	url:"AjaxGiftListServiceCreate",
	formId:""

	 /**
     * Hides all the messages and the progress bar.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
	,successHandler: function(serviceResponse) {
		cursor_clear();
		closeAllDialogs();	//close the create popup

		dojo.publish('shoppingListChanged', [{listId: serviceResponse.giftListId[0], listName: serviceResponse.giftListName[0], action: 'add'}]);
	}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
	,failureHandler: function(serviceResponse) {
		MessageHelper.displayErrorMessage(MessageHelper.messages["REGISTER_FIRST"]); 
		/**
		 * CUSTOM IN ATTESA DI AVERE IMPLEMENTAZIONE WISHLIST GUEST
		 */
		/*if (serviceResponse.errorMessage) {
			
			
			if (serviceResponse.errorMessageKey == 'USR.CWXFR0101I')
			{
				MessageHelper.displayErrorMessage(MessageHelper.messages["REGISTER_FIRST"]);
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
		}*/
		cursor_clear();
	}			
}),

/**
 * This service allows customers to update the name of a shopping list
 * @constructor
 */
wc.service.declare({
	id:"ShoppingListServiceUpdate",
	actionId:"ShoppingListServiceUpdate",
	url:"AjaxGiftListServiceUpdateDescription",
	formId:""

	 /**
     * Hides all the messages and the progress bar.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
	,successHandler: function(serviceResponse) {
		cursor_clear();
		closeAllDialogs();
		shoppingListJS.showMessageDialog(storeNLS['LIST_EDITED']);
		
		dojo.publish('shoppingListChanged', [{listId: serviceResponse.giftListId[0], listName: serviceResponse.giftListName[0], action: 'edit'}]);
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
 * This service allows customers to delete a selected shopping list
 * @constructor
 */
wc.service.declare({
	id:"ShoppingListServiceDelete",
	actionId:"ShoppingListServiceDelete",
	url:"AjaxGiftListServiceDeleteGiftList",
	formId:""

	 /**
     * Hides all the messages and the progress bar.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
	,successHandler: function(serviceResponse) {
		cursor_clear();			
		closeAllDialogs();
		shoppingListJS.showMessageDialog(storeNLS['LIST_DELETED']);
		
		dojo.publish('shoppingListChanged', [{listId: serviceResponse.giftListId[0], listName: '', action: 'delete'}]);
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
 * This service allows customers to add an item to a shopping list
 * @constructor
 */
wc.service.declare({
	id:"ShoppingListServiceAddItem",
	actionId:"ShoppingListServiceAddItem",
	url:"AjaxGiftListServiceAddItem",
	formId:""

	 /**
     * Hides all the messages and the progress bar.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
	,successHandler: function(serviceResponse) {
		cursor_clear();
		dojo.publish("itemAddedToList");
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
 * This service allows customers to remove an item from a shopping list
 * @constructor
 */
wc.service.declare({
	id:"ShoppingListServiceRemoveItem",
	actionId:"ShoppingListServiceRemoveItem",
	url:"AjaxGiftListServiceUpdateItem",
	formId:""

	 /**
     * Hides all the messages and the progress bar.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
	,successHandler: function(serviceResponse) {
		cursor_clear();			
		MessageHelper.hideAndClearMessage();
		//shoppingListJS.showMessageDialog(storeNLS['ITEM_REMOVED']);
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
 * This service allows customers to add an item to a shopping list and remove from the shopping cart
 * @constructor
 */
wc.service.declare({
	id:"ShoppingListServiceAddItemAndRemoveFromCart",
	actionId:"ShoppingListServiceAddItemAndRemoveFromCart",
	url:"AjaxGiftListServiceAddItem",
	formId:""

	/**
	 * Hides all the messages and the progress bar.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
	,successHandler: function(serviceResponse) {
		cursor_clear();
		MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDED"]);
		dojo.publish("itemAddedReadyForDelete");
		
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
* This service allows customers to set a wish list as the default list
* @constructor
* 
**/
wc.service.declare({
	id:"AjaxGiftListServiceChangeGiftListStatus",
	actionId:"AjaxGiftListServiceChangeGiftListStatus",
	url:"AjaxGiftListServiceChangeGiftListStatus",
	formId:""

	 /**
     * Hides all the messages and the progress bar.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
	,successHandler: function(serviceResponse) {
		cursor_clear();			
		MessageHelper.hideAndClearMessage();

		MultipleWishLists.updateDefaultListName('multipleWishListButton',serviceResponse.giftListName);		
		MultipleWishLists.updateDefaultListName('addToMultipleWishListLink',serviceResponse.giftListName);
		MultipleWishLists.setDefaultListId(serviceResponse.giftListId);
		MultipleWishLists.updateContextPostSwitch(serviceResponse.giftListId);
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
	 * This service sends the wish list to a specified email address.
	 */
	wc.service.declare({
		id: "AjaxGiftListAnnouncement",
		actionId: "AjaxGiftListAnnouncement",
		url: getAbsoluteURL() + "AjaxGiftListServiceAnnounceGiftList",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			cursor_clear();			
			MessageHelper.hideAndClearMessage();
			shoppingListJS.showMessageDialog(storeNLS['WISHLIST_EMAIL_SENT']);
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

	})
