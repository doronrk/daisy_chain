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
      cursor_wait();
      showQuickViewShoppingBag(serviceResponse);
      //cursor_clear(); // move cursor_clear inside showQuickViewShoppingBag

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
      MessageHelper.hideAndClearMessage();
      MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);
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
        }else{
          document.location.href = "OrderShippingBillingView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId;
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
      CheckoutHelperJS.setOrderPrepared("true");
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
      document.location.href = "OrderShippingBillingConfirmationView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId + "&shipmentTypeId=" + shipmentTypeId;
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

      params.storeId    = this.storeId;
      params.catalogId  = this.catalogId;
      params.langId    = this.langId;

      params.orderId = ".";
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

      params.storeId    = this.storeId;
      params.catalogId  = this.catalogId;
      params.langId    = this.langId;

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

    params.storeId    = this.storeId;
    params.catalogId  = this.catalogId;
    params.langId    = this.langId;
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

    params.storeId    = this.storeId;
    params.catalogId  = this.catalogId;
    params.langId    = this.langId;
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
  })
