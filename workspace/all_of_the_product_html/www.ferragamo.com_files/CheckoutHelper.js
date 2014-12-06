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
	
	/**
	 * Checkout step number to be displayed
	 */
	checkoutStepNumber: null,
	
	/**
	 * Checkout step 1 present
	 */
	shipInstructionsOrderItemId:null,
	
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
	 * @param {Integer} checkoutStepNumber The number of the step of the checkout flow to be displayed, if any.
	 */
	setCommonParameters:function(langId,storeId,catalogId,checkoutStepNumber,shipInstructionsOrderItemId){
		this.langId = langId;
		this.storeId = storeId;
		this.catalogId = catalogId;
		this.checkoutStepNumber = checkoutStepNumber;
		this.shipInstructionsOrderItemId = shipInstructionsOrderItemId;
	},
	
	
	/**
	 * This function deletes an order item from the shopping cart.
	 * If forWishlist is true, then the item is added to the wish list subsequently by calling the <code>AjaxDeleteOrderItemFromCart</code> service.
	 *
	 * @param {Integer} orderItemId The ID of the order item to delete.
	 * @param {Boolean} forWishlist If the value is true, then the item is added to the wish list.
	 */
	deleteFromCart:function(orderItemId,forWishlist){ 
		if(!this.isAjaxCheckOut())return;
		
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
		
		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}   
		cursor_wait();			  
		if(y == 1){
			wc.service.invoke("AjaxDeleteOrderItem1", params);
		}else{
			if(forWishlist){
				wc.service.invoke("AjaxDeleteOrderItemFromCart", params);
			}else{
				if(this.shoppingCartPage || this.pendingOrderDetailsPage){
					wc.service.invoke("AjaxDeleteOrderItem", params);
					cursor_clear();
				}else{
					wc.service.invoke("AjaxDeleteOrderItemForShippingBillingPage", params);
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
	
	
	frgSaveOrderItemsList:function(orderItemId,addressId){
		if(orderItemId == '-1'){
			//Creating or editing shipping address for single shipment, get all the orderItemIds in the order..       

			var totalItems = document.getElementById("totalNumberOfItems").value;
			for(var i = 0; i < totalItems; i++){
				this.orderItemIds[i] = document.getElementById("orderItem_"+(i+1)).value;
			}
		}else if(orderItemId == 0 && this.shipmentTypeId == "1"){
			// Editing or creating billing address.. If it's single shipment type, then we need to save all orderItem Id's.
			// If the shipping address is same as this billing address which is edited, then after editing this addressId will change, so we need to update the orderItemIds.

			if (document.getElementById("frg_singleShipmentAddress")) {
				if(addressId == document.getElementById("frg_singleShipmentAddress").value){       
					var totalItems = document.getElementById("totalNumberOfItems").value;
					for(var i = 0; i < totalItems; i++){
						try {
							this.orderItemIds[i] = document.getElementById("orderItem_"+(i+1)).value;
						}catch(e){
							// TODO should fix it as the number of items should be the number of the rows...
						}
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
	updateAddressIdForOrderItem:function(addressId){
		if(addressId == null || addressId.length == 0){
			return true;
		}
		
		var params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";
				
		this.updateParamObject(params,"addressId",addressId,false);
		wc.service.invoke("AjaxSetAddressIdOfOrderItems", params);    
	},
	
	/**
	 * When there is an invalid address ID in an order, this function updates all items to use the valid address ID by invoking the <code>AjaxSetAddressIdOfOrderItems</code> service.
	 *
	 * @param {Integer} addressId A valid address ID.
	 */
	updateAddressIdForOrderItemMy:function(addressId){
		if(addressId == null || addressId.length == 0){
			return true;
		}
		
		var params = [];
		params["storeId"] = this.storeId;
		params["catalogId"] = this.catalogId;
		params["langId"] = this.langId;
		params.orderId = ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.allocate="***";
		params.backorder="***";
		params.remerge="***";
		params.check="*n";
				
		this.updateParamObject(params,"addressId",addressId,false);
		wc.service.invoke("AjaxSetAddressIdOfOrderItemsMy", params);    
	},
	
	
	/**
	 * When there is an invalid shipping mode ID in an order, this function updates all items to use the valid shipping mode ID by invoking the <code>AjaxSetShipModeIdForOrder</code> service.
	 *
	 * @param {Integer} shipModeId A valid shipping mode ID.
	 */
	updateShipModeIdForOrder:function(shipModeId){
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
		if (trim(form.promoCode.value) == "") {
			MessageHelper.formErrorHandleClient(form.promoCode.id, MessageHelper.messages["PROMOTION_CODE_EMPTY"]);
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
				return;
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
				return;
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
		if (isQuote == undefined || isQuote == null){
			isQuote = false;
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
		if(userType == 'G'){
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
		}
		
		
		//For handling multiple clicks
		if(!submitRequest()){
			return;
		}                 
		cursor_wait();
		
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
				dojo.cookie(key1, t);
				dojo.cookie(key2, interval);
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
	 * Adds payment instruction(s) to the current order.
	 */
	saveGiftStatus: function(object,orderId){
		
		var value=false;
		cbObj = document.getElementById(object);
        if (cbObj.checked)
            value=true;
        
         params = [];
         params["orderId"]=orderId;
		 params["value"]=value;
			
		wc.service.invoke('AjaxSaveGiftStatusCmd',params);
		
	},
	
	
	frgEditBillingAddress:function(orderItemId,addressValue,profileshipping,profilebilling){
		var form = document.forms["PaymentForm1"];
		var addressBox = form.billing_address_id;
		
		//We need to save order Items having this addressId..bcs if user edits this address then the id of this address changes..
		//so all order items needs to be updated with new id..
		this.frgSaveOrderItemsList(orderItemId,addressBox.value);
		
		//TODO:togliere addressValue dai parametri,viene preso l'addressId selezionato della select nella form
		
		//this.frgSaveOrderItemsList(orderItemId,addressValue);
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
	updateCartWait:function(quantityBox, orderItemId,event) {
		if(event.keyCode == dojo.keys.TAB)return;
		if(!this.isAjaxCheckOut()){ 
			return;
		}
		
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
			MessageHelper.formErrorHandleClient(quantityBox,MessageHelper.messages["QUANTITY_INPUT_ERROR"]);
		} else {
			//Its a positive valid number > 0...
			// Maximum allowed quantity
			var permLimit = document.getElementById('hdnPermissibleLimit').value;
			// If quantity exceeds Maximum allowed quantity
			if(quantity > permLimit*1){
				MessageHelper.displayErrorMessage(MessageHelper.messages['FRG_MSC_QTY_EXCEEDED']);
				return;
			} 
			
			//Update the qty at server side..
			var params = [];
			params.orderId = ".";
			params["storeId"] = this.storeId;
			params["catalogId"] = this.catalogId;
			params["langId"] = this.langId;
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
				return;
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
	/* Funzione che permette la chiamata con delay per l'aggiornamento dei prodotti nel carrello nella minicart */
	changeToFixedQuantityWait:function(quantity, orderItemId) {
		
		setTimeout(dojo.hitch(this,"extractQtyAndUpdateCart",quantity,orderItemId,this.updateWaitTimeOut));
	},
	/* Funzione di wrap per estrare la quantita' e per chiamare l'aggiornamento del minicart*/
	extractQtyAndUpdateCart:function(quantity,orderItemId){
		var	q =  quantity.value;
		var permLimit =  document.getElementById('hdnPermissibleLimit').value;
		if(q > permLimit*1){
			MessageHelper.displayErrorMessage(MessageHelper.messages['FRG_MSC_QTY_EXCEEDED']);
			return;
		}
		this.myUpdateCart(quantity.value,orderItemId);
	},
	myUpdateCart:function(quantity, orderItemId){
		if(quantity != null && quantity.length > 0 && !isNaN(quantity)){
			/* It's a number..Parse it...Without the above isNaN check, in IE parseInt parses strings like '41ab' as 41..
			So check if its a number first and then parse it..*/
			quantity = parseInt(quantity);
		}
		if(quantity != null && quantity.length > 0 && quantity == 0){
			//In IE, if quantity is null, then quantity == 0 check evaluates to true..so having too many checks above..
			//We can call AjaxUpdateOrderItem service and set qty == 0, which will delete item from cart.. but calling
			//deleteFromCart will ensure that empty shop cart page is displayed in case if this is the last item..something we get for free..
			this.deleteFromCart(orderItemId);
		}else if(isNaN(quantity) || ((!isNaN(quantity)) && quantity < 0) || quantity == null || quantity.length == 0){
			//Its not a number OR its a number and its negative OR its a null OR its an empty string..
			MessageHelper.displayErrorMessage(MessageHelper.messages["QUANTITY_INPUT_ERROR"]);
		} else {
			//Its a positive valid number > 0...Update the qty at server side..
			var params = [];
			params.orderId = ".";
			params["storeId"] = this.storeId;
			params["catalogId"] = this.catalogId;
			params["langId"] = this.langId;
			this.updateParamObject(params,"orderItemId",orderItemId,false,-1);
			this.updateParamObject(params,"quantity",quantity,false,-1);
			this.qtyInCart = quantity;
			//For handling multiple clicks
			if(!submitRequest()){
				return;
			}            
			//document.body.style.cursor = "wait";         
			//cursor_wait();
			wc.service.invoke("AjaxUpdateOrderItem",params);
		}
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
		 
		MessageHelper.hideAndClearMessage();
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
					var v = quantity.value;  
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
		if (document.getElementById("recurringOrder") && document.getElementById("recurringOrder").checked && document.getElementById("shipTypeOnline") && document.getElementById("shipTypeOnline").checked) {
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
		
		//var addressId = document.getElementById("singleShipmentAddress").value;
		var addressId = addressSelectBox.value;
		
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
	
	/**
	 * This function is used to update the shipping mode of all order items in a single shipment checkout-out scenario.
	 * It is used when the "AjaxCheckout" feature is enabled.
	 *
	 * @param {DOM Element} addressSelectBox The select drop-down object that contains all available shipping modes.
	 */
	updateShipModeForAllItemsNoWait:function(shipmentSelectBox){
		
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
		
		cursor_wait();			   
		wc.service.invoke("OrderItemAddressShipMethodUpdate", params);
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
              
		//Close the calendar..
		jsDate._close();
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
		
		//Close the calendar..
		jsDate._close();
		
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
				dojo.byId("MS_shippingAddressDisplayArea_"+orderItemId).innerHTML = dojo.byId("addressDetails_" + addressSelectBoxValue).innerHTML;
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
	
	/************************************************************
	 * End Multiple Shipment page specific functions
	 ************************************************************/
	/**
	 * This function is used to get the shipping mode object from a shipping mode select box
	 * @param {DOM Element/String} selectBox The select drop-down object or its Id for shipping mode.
	 */
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
	
	/**
	 * Check whether input order is custom or not.
	 */
	controlCheckoutOrdertype:function(orderId){
        var params = new Array();
        params["orderId"] = orderId;
        wc.service.invoke("ControlCheckoutOrderType",params);
	}
}
