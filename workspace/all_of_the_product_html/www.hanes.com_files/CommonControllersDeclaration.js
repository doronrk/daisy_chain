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
 * @fileOverview This file provides the common controller variables and functions, 
 * and links these controllers to listen to the defined render contexts in CommonContextsDeclarations.js.
 */

dojo.require("wc.render.common");

/** 
 * @class The CommonControllersDeclarationJS class defines all the common variables and functions 
 * for the controllers of the defined render contexts across all store pages.
 */
CommonControllersDeclarationJS = {
       /**
        * This variable stores the ID of the language that the store is currently using.
        * @private
        */
       langId: "-1",
       
       /**
        * This variable stores the ID of the current store.
        * @private
        */       
       storeId: "",
       
       /**
        * This variable stores the ID of the catalog that is used in the store.
        * @private
        */           
       catalogId: "",
       
       /**
        * This variable indicates whether the Ajax CheckoutOut flex flow is enabled or not.
        * @private
        */           
       ajaxCheckOut: true,
       
       /**
        * Sets the common ids used in the store - language id, store id, and catalog id.
        * 
        * @param {string} langId The id of the store language.
        * @param {string} storeId The id of the store.
        * @param {string} langId The id of the catalog used in the store.
        */
       setCommonParameters:function(langId,storeId,catalogId){
              this.langId = langId;
              this.storeId = storeId;
              this.catalogId = catalogId;
       },
       
       /**
        * Sets the URL of the specified controller.
        * 
        * @param {string} controllerId The id of the target controller.
        * @param {string} url The link to specify for the controller.
        */       
       setControllerURL:function(controllerId,url){
              wc.render.getRefreshControllerById(controllerId).url = url;
       }

}

/** 
 * Declares a new refresh controller for the Mini Shopping Cart.
 */
wc.render.declareRefreshController({
       id: "MiniShoppingCartController",
       renderContext: wc.render.getContextById("MiniShoppingCartContext"),
       url: "",
       formId: ""
       
       /** 
        * Refreshs the mini shopping cart.
        * If a new order item is added via an Ajax service call, set the mini shopping cart to display the new order item in the dropdown.
        * Otherwise, only refresh the contents of mini shopping cart to the updated order information.
        * This function is called when a modelChanged event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(message.actionId in order_updated || message.actionId == 'AjaxDeleteOrderItemForShippingBillingPage'){
                     var param = [];
                     if(message.actionId == 'AjaxAddOrderItem'){
                            param.addedOrderItemId = message.orderItemId + "";
                            showDropdown = true;
                     }
                     widget.refresh(param);
              }
       }

       /** 
        * Destroys the old mini shopping cart dialog with previous order information.
        * If order item was added, display the mini shopping cart dropdown with the new order item added contents.
        * This function is called after a successful refresh. 
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;

              //The dialog contents has changed..so destroy the old dialog with stale data..
              destroyDialog();

              if(showDropdown){
                     //We have added item to cart..So display the drop down with item added message..
                     showMiniShopCartDropDown("placeHolder",'quick_cart_container','orderItemAdded');
                     showDropdown = false;
              }
       }

}),

/** 
 * Declares a new refresh controller for the Category display with pagination.
 */
wc.render.declareRefreshController({
       id: "CategoryDisplay_Controller",
       renderContext: wc.render.getContextById("CategoryDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of category listings.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              categoryDisplayJS.contextChanged = true;
              widget.refresh(renderContext.properties);
              
       }

       /** 
        * This function handles paging and browser back/forward functionalities upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (categoryDisplayJS.contextChanged && (!categoryDisplayJS.isHistory)){

                       var identifier = "&identifier=" + (new Date()).getTime();
                       
                       
                      var historyObject = new categoryDisplayJS.HistoryTracker('CategoryDisplay_Widget', controller.url + identifier);
                       dojo.back.addToHistory(historyObject);       
                       categoryDisplayJS.contextChanged = false;
                       categoryDisplayJS.isHistory = false;  
              }
              cursor_clear();
              
              try {
			  	if(typeof(ceadojo) != "undefined") {
            	  ceadojo.publish("/wc/collaboration/CategoryDisplayRefreshed",[]);
			  	}
              }catch(err) {
            	  console.log(err);
              }

              
       }

}),

/** 
 * Declares a new refresh controller for the Sub-category display with pagination.
 */
wc.render.declareRefreshController({
       id: "SubCategoryDisplay_Controller",
       renderContext: wc.render.getContextById("SubCategoryDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of sub-category listings.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              categoryDisplayJS.contextChanged = true;
              widget.refresh(renderContext.properties);
              
       }

       /** 
        * This function handles paging and browser back/forward functionalities upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (categoryDisplayJS.contextChanged && (!categoryDisplayJS.isHistory)){

                       var identifier = "&identifier=" + (new Date()).getTime();
                       
                       
                      var historyObject = new categoryDisplayJS.HistoryTracker('SubCategoryDisplay_Widget', controller.url + identifier);
                       dojo.back.addToHistory(historyObject);       
                       categoryDisplayJS.contextChanged = false;
                       categoryDisplayJS.isHistory = false;  
              }
              cursor_clear();

       }

}),

/** 
 * Declares a new refresh controller for the Wishlist display.
 */
wc.render.declareRefreshController({
       id: "WishlistDisplay_Controller",
       renderContext: wc.render.getContextById("WishlistDisplay_Context"),
       url: "",
       formId: ""

       /** 
	* Displays the previous/next page of items on the Wishlist display page.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              AccountWishListDisplay.contextChanged = true;
              widget.refresh(renderContext.properties);
       }

       /** 
        * Refreshs the wishlist display when an item is added to or deleted from the wishlist.
        * This function is called when a modelChanged event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "InterestItemDelete") {
                     controller.url = wc.render.getRefreshControllerById("WishlistDisplay_Controller").url;
                     widget.refresh(renderContext.properties);
              }
              if (message.actionId == "AjaxInterestItemAdd") {
                     controller.url = wc.render.getRefreshControllerById("WishlistDisplay_Controller").url;
                     widget.refresh(renderContext.properties);
              }
              if (message.actionId == "AjaxGiftListServiceCreate" || message.actionId == "AjaxGiftListServiceUpdateDescription" || message.actionId == "AjaxGiftListServiceDeleteGiftList" || message.actionId == "AjaxGiftListServiceRemoveItem" || message.actionId == "AjaxGiftListServiceAddItem") {
                     widget.refresh(renderContext.properties);
              }
       }
       
       /** 
        * This function handles paging and browser back/forward functionalities upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */       
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (AccountWishListDisplay.contextChanged && (!AccountWishListDisplay.isHistory)){
                       var identifier = "&identifier=" + (new Date()).getTime();

                       // Get MyAccountCenterLinkDisplay_Controller url
                       var accountDisplayURL = renderContext.properties["url"];              
                     
                     if(accountDisplayURL == null || accountDisplayURL == ""){
                            accountDisplayURL = controller.url;
                     }else{
                            accountDisplayURL = accountDisplayURL;
                     }

                     var historyObject = new AccountWishListDisplay.HistoryTracker('WishlistDisplay_Widget', accountDisplayURL + identifier , controller.url + identifier);
                       dojo.back.addToHistory(historyObject);       
                       AccountWishListDisplay.contextChanged = false;
                       AccountWishListDisplay.isHistory = false;  
              }
              
              if((dojo.byId("multipleWishlistController_select")!=null && dojo.byId("multipleWishlistController_select")!='undefined')){
              	dojo.byId("multipleWishlistController_select").disabled = false;
              }
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for the shared Wishlist display. 
 */
wc.render.declareRefreshController({
       id: "SharedWishlistDisplay_Controller",
       renderContext: wc.render.getContextById("SharedWishlistDisplay_Context"),
       url: "",
       formId: ""

       /** 
	* Displays the previous/next page of items on the Shared Wishlist display page.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              widget.refresh(renderContext.properties);
       }
       
       /** 
        * This function handles paging and browser back/forward functionalities upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */       
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for the Shopping Cart display.
 */
wc.render.declareRefreshController({
       id: "ShopCartDisplayController",
       renderContext: wc.render.getContextById("ShopCartPaginationDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Refreshs the shopping cart area when an update to the order is made, 
        * such as add/remove items or update quantity/promotions etc.
        * This function is called when a modelChanged event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,modelChangedHandler: function(message, widget) {
              var controller = this;
              
              var renderContext = this.renderContext;
              if(message.actionId in order_updated){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Displays the discounts and promotions area upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
			 		 var controller = this;
           var renderContext = this.renderContext;
           
	         if (typeof(savedOrdersJS) != null && typeof(savedOrdersJS) != 'undefined')
	         {
	        	 savedOrdersJS.isCurrentOrderPage(true);
	         }
              var controller = this;
              // Order level discount tooltip section - if the tooltip is defined, show the section after area is refreshed
              if(document.getElementById("discountDetailsSection")!=null )  {
                     document.getElementById("discountDetailsSection").style.display = "block";
              }
              // Promotion code tooltip section - if the tooltip is defined, show the section after area is refreshed
              if(document.getElementById("appliedPromotionCodes")!=null ) {
                     document.getElementById("appliedPromotionCodes").style.display = "block";
              }              
              
              if(!CheckoutHelperJS.isAjaxCheckOut()){
	              CheckoutHelperJS.setFieldDirtyFlag(false);
	              CheckoutHelperJS.initDojoEventListenerShoppingCartPage();
              }
              
              //select the proper shipmode that is saved in the cookie
              var orderId = renderContext.properties["orderId"];
              if(document.getElementById("currentOrderId")) {
              	orderId = document.getElementById("currentOrderId").value;
              }
              ShipmodeSelectionExtJS.displaySavedShipmentTypeForOrder(orderId);
			  if(document.getElementById("OrderFirstItemId"))
			  {
				ShipmodeSelectionExtJS.orderItemId = document.getElementById("OrderFirstItemId").value;
			  }
			  cursor_clear();
       }

}),

/** 
 * Declares a new refresh controller for the Shopping Cart pagination display.
 */
wc.render.declareRefreshController({
       id: "ShopCartPaginationDisplayController",
       renderContext: wc.render.getContextById("ShopCartPaginationDisplay_Context"),
       url: "",
       formId: ""
       
       /** 
        * Displays the previous/next page of order items in the shopping cart.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
              if(!CheckoutHelperJS.isAjaxCheckOut()){
	              CheckoutHelperJS.setFieldDirtyFlag(false);
	              CheckoutHelperJS.initDojoEventListenerShoppingCartPage();
              }
              
              //select the proper shipmode that is saved in the cookie
              var orderId = renderContext.properties["orderId"];
              if(document.getElementById("currentOrderId")) {
              	orderId = document.getElementById("currentOrderId").value;
              }
              ShipmodeSelectionExtJS.displaySavedShipmentTypeForOrder(orderId);
       }
}),

/** 
* Declares a new refresh controller for the Pending orders details page pagination display.
*/
wc.render.declareRefreshController({
      id: "PendingOrderPaginationDisplayController",
      renderContext: wc.render.getContextById("PendingOrderPaginationDisplay_Context"),
      url: "",
      formId: ""
      
      /** 
       * Displays the previous/next page of order items in the shopping cart.
       * This function is called when a render context changed event is detected. 
       * 
       * @param {string} message The render context changed event message
       * @param {object} widget The registered refresh area
       */
      ,renderContextChangedHandler: function(message, widget) {
             var controller = this;
             var renderContext = this.renderContext;
             
             if(controller.testForChangedRC(["beginIndex"])){
            	 widget.refresh(renderContext.properties);
             }
      }

      /** 
       * Hide the progress bar upon a successful refresh.
       * 
       * @param {object} widget The registered refresh area
       */
      ,postRefreshHandler: function(widget) {
    	  
             var controller = this;
             var renderContext = this.renderContext;
             cursor_clear();
      }
}),

/** 
 * Declares a new refresh controller for Single Shipment Order Item display with pagination
 * on the Order Summary and Confirmation pages. 
 */
wc.render.declareRefreshController({
       id: "OrderItemPaginationDisplayController",
       renderContext: wc.render.getContextById("OrderItemPaginationDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of order items for Single Shipment Order Summary/Confirmation display.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Multiple Shipment Order Item display with pagination
 * on the Order Summary and Confirmation pages.
 */
wc.render.declareRefreshController({
       id: "MSOrderItemPaginationDisplayController",
       renderContext: wc.render.getContextById("MSOrderItemPaginationDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of order items for Multiple Shipment Order Summary/Confirmation display.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Coupon Wallet display.
 */
wc.render.declareRefreshController({
	id: "CouponDisplay_Controller",
	renderContext: wc.render.getContextById("CouponDisplay_Context"),
	url: "",
	formId: ""
	
	/** 
	 * Refreshs the coupon wallet display if a coupon is added or removed via an Ajax call.
	 * This function is called when a modelChanged event is detected. 
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	,modelChangedHandler: function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		if(message.actionId == 'AjaxCouponsAddRemove' || message.actionId == 'AjaxWalletItemProcessServiceDelete'){
			widget.refresh(renderContext.properties);
		}
	}
}),

/** 
 * Refresh controller for displaying a pop-up of a list of free gifts to choose from .
 */
wc.render.declareRefreshController({
    id: "PromotionFreeGifts_Controller",
    renderContext: wc.render.getContextById("PromotionFreeGifts_Context"),
    url: "",
    formId: ""

    ,modelChangedHandler: function(message, widget) {
           var controller = this;
           var renderContext = this.renderContext;
    }

    ,renderContextChangedHandler: function(message, widget) {
           var controller = this;
           var renderContext = this.renderContext;   
           widget.refresh(renderContext.properties);
    }
    
    ,postRefreshHandler: function(widget) {
	    var controller = this;
	    var renderContext = this.renderContext;	   
	    cursor_clear();
	    PromotionChoiceOfFreeGiftsJS.showFreeGiftsDialog();
   }
}),

/** 
 * Declares a new refresh controller for the saved orders list with pagination.
 */
wc.render.declareRefreshController({
       id: "ListOrdersDisplay_Controller",
       renderContext: wc.render.getContextById("ListOrdersDisplay_Context"),
       url: "",
       formId: ""

    	   ,modelChangedHandler: function(message, widget) {
           var controller = this;
           var renderContext = this.renderContext;
           if(message.actionId in listorders_changed){
        	   		
        		    //After an order create, or order copy service, return to the first page.
	       	   	 	if ((message.actionId == 'AjaxOrderCreate' || message.actionId == 'AjaxSingleOrderCalculate') && this.renderContext.properties["startNumber"] != 0) 
	       	   	 	{
	       	   	 		
	       	   	 		wc.render.updateContext("ListOrdersDisplay_Context", {'startNumber' : 0});	
	       	   	 	}
	       	   	 	else
	       	   	 	{
	       	   	 		widget.refresh(renderContext.properties);
	       	   	 	}
           }
    }

       /** 
        * Refreshes the saved orders table.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
            
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["startNumber"])){
            	
            	  widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Update the toolbar icons after a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
        	
              var controller = this;
              var renderContext = this.renderContext;
              if (savedOrdersJS.updateCurrentOrder)
              {
            	  savedOrdersJS.initializeCurrentOrder();
            	  savedOrdersJS.updateCurrentOrder = false;
              }
              savedOrdersJS.updateToolbar();
              savedOrdersJS.checkAllIfNeeded();
       }
}),

/** 
* Declares a new refresh controller for the Shopping Cart display.
*/
wc.render.declareRefreshController({
      id: "PendingOrderDisplayController",
      renderContext: wc.render.getContextById("PendingOrderPaginationDisplay_Context"),
      url: "",
      formId: ""

      /** 
       * Refreshs the shopping cart area when an update to the order is made, 
       * such as add/remove items or update quantity/promotions etc.
       * This function is called when a modelChanged event is detected. 
       * 
       * @param {string} message The model changed event message
       * @param {object} widget The registered refresh area
       */
      ,modelChangedHandler: function(message, widget) {
             var controller = this;
          
             var renderContext = this.renderContext;
             if(message.actionId in order_updated){
            	 
            	 	this.currentDesc = document.getElementById('OrderDescription_input').value;
            	 	
                    widget.refresh(renderContext.properties);
             }
      }

      /** 
       * Displays the discounts and promotions area upon a successful refresh.
       * 
       * @param {object} widget The registered refresh area
       */
      ,postRefreshHandler: function(widget) {
             var controller = this;
           
             cursor_clear();
             
             if (this.currentDesc != document.getElementById('OldOrderDescription').value)
             {
            	var inputElement = document.getElementById('OrderDescription_input');
            	if (inputElement != null && inputElement != 'undefined')
            	{
            		inputElement.value = this.currentDesc;
            		dojo.removeClass(inputElement, 'savedOrderDetailsInputBorder'); 
            		dojo.addClass(inputElement, 'savedOrderDetailsInputBorderWarning');
            	}
             }
          
      }

}),

/** 
 * Declares a new refresh controller for the Browsing History ESpot.
 */
wc.render.declareRefreshController({
       id: "BrowsingHistoryController",
       renderContext: wc.render.getContextById("BrowsingHistoryContext"),
       url: "",
       formId: ""
       
       /** 
        * Refreshes the Browsing History Espot area.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
		    var controller = this;
		    var renderContext = this.renderContext;

		    if(controller.testForChangedRC(["status"])){
		    	widget.refresh(renderContext.properties);
		    }	
       }
       
       /** 
        * Post handling for the Browsing History display.
        * This function is called after a successful refresh. 
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
        	if(!document.getElementById('WC_ScrollingProductsESpot_EmptyImgContainer_BrowsingHistory')){
        			document.getElementById('WC_LeftSidebarDisplay_div_5').style.display = 'block';
        	}
       }       
       
}),

/** 
* Declares a new refresh controller for the My Account Browsing History Display.
*/
wc.render.declareRefreshController({
      id: "BrowsingHistoryDisplay_Controller",
      renderContext: wc.render.getContextById("BrowsingHistoryDisplay_Context"),
      url: "",
      formId: ""
     
       /** 
        * Refreshes the Browsing History display.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
		    var controller = this;
		    var renderContext = this.renderContext;

		    if(controller.testForChangedRC(["currentPage"]) || controller.testForChangedRC(["pageView"])){
		    	widget.refresh(renderContext.properties);
		    }	
       }

       /** 
        * Post handling for the Browsing History display.
        * This function is called after a successful refresh. 
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
        	cursor_clear();
       }

}),

/** 
 * Declares a new refresh controller for the Category Subscription e-marketing spot.
 */
wc.render.declareRefreshController({
	id: "CategorySubscriptionController",
	renderContext: wc.render.getContextById("CategorySubscriptionContext"),
	url: "",
	formId: ""
	
	/** 
	 * Refreshes the category subscription area when a status update is made, such as subscribe or unsubscribe. 
	 * This function is called when a modelChanged event is detected. 
	 * 
	 * @param {Object} message The model changed event message.
	 * @param {Object} widget The registered refresh area.
	 */
	,modelChangedHandler: function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		if(message.actionId == "AjaxCategorySubscribe"){
			widget.refresh(renderContext.properties);
		}
	}

	/** 
	 * This function is called after a successful area refresh, and it clears the progress bar. 
	 * 
	 * @param {object} widget The registered refresh area
	 */
	,postRefreshHandler: function(widget) {
		cursor_clear();
		if(dojo.byId("CategorySubscriptionImage") == null){
			dojo.animateProperty({
				node: dojo.byId("CategorySubscriptionLink"),
				duration: 1500,
				properties: {
					backgroundColor: {
						start: "yellow",
						end: dojo.style("CategorySubscriptionLink", "backgroundColor")
					}
				}
			}).play();
		}
	}
}),

/** 
 * Declares a new refresh controller for Recurring Order display with pagination
 * in My Recurring Order page. 
 */
wc.render.declareRefreshController({
       id: "RecurringOrderDisplayController",
       renderContext: wc.render.getContextById("RecurringOrderDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of recurring orders.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */

		,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "AjaxCancelSubscription") {
                     controller.url = wc.render.getRefreshControllerById("RecurringOrderDisplayController").url;
                     widget.refresh(renderContext.properties);
              }
       }

       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Subscription display with pagination
 * in My Subscription page. 
 */
wc.render.declareRefreshController({
       id: "SubscriptionDisplayController",
       renderContext: wc.render.getContextById("SubscriptionDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of subscriptions.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */

		,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "AjaxCancelSubscription") {
                     controller.url = wc.render.getRefreshControllerById("SubscriptionDisplayController").url;
                     widget.refresh(renderContext.properties);
              }
       }

       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Recent Recurring Orders 
 * in My Account landing page. 
 */
wc.render.declareRefreshController({
       id: "RecentRecurringOrderDisplayController",
       renderContext: wc.render.getContextById("RecentRecurringOrderDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of recurring orders.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */

		,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "AjaxCancelSubscription") {
                     controller.url = wc.render.getRefreshControllerById("RecurringOrderDisplayController").url;
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for recent Subscription display
 * in My Account landing page. 
 */
wc.render.declareRefreshController({
       id: "RecentSubscriptionDisplayController",
       renderContext: wc.render.getContextById("RecentSubscriptionDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of subscriptions.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */

		,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "AjaxCancelSubscription") {
                     controller.url = wc.render.getRefreshControllerById("SubscriptionDisplayController").url;
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Recurring Order child orders display with pagination
 * in Recurring Order Details History page. 
 */
wc.render.declareRefreshController({
       id: "RecurringOrderChildOrdersDisplayController",
       renderContext: wc.render.getContextById("RecurringOrderChildOrdersDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of recurring orders.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Subscription child orders display with pagination
 * in Subscription Details History page. 
 */
wc.render.declareRefreshController({
       id: "SubscriptionChildOrdersDisplayController",
       renderContext: wc.render.getContextById("SubscriptionChildOrdersDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of subscriptions.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Auto Suggest
 */
wc.render.declareRefreshController({
       id: "AutoSuggestDisplayController",
       renderContext: wc.render.getContextById("AutoSuggest_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the keyword suggestions from the search index
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              widget.refresh(renderContext.properties);
       }

       /** 
        * Display the results.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
			  var response = document.getElementById('suggestedKeywordResults');
			  if(response == null) {
			  	// No response or an error page.   Clear the contents.
			  	document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
			  }
			  showAutoSuggestIfResults();
       }
}),

/** 
 * Declares a new refresh controller for Cached Suggestions
 */
wc.render.declareRefreshController({
       id: "AutoSuggestCachedSuggestionsController",
       renderContext: wc.render.getContextById("CachedSuggestions_Context"),
       url: "",
       formId: ""

       /** 
        * Retrieves the cached suggestions used in the autosuggest box.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              widget.refresh(renderContext.properties);
       }

       /** 
        * Updates the cached suggestions.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              var response = document.getElementById('cachedSuggestions');
              if(response == null) {
                     // No response or an error page.   Clear the contents.
                     document.getElementById("autoSuggestCachedSuggestions_div").innerHTML = "";
              }
              else {
                     var scripts = response.getElementsByTagName("script");
                     var j = scripts.length;
                     for (var i = 0; i < j; i++){
                            var newScript = document.createElement('script');
                            newScript.type = "text/javascript";
                            newScript.text = scripts[i].text;
                            document.getElementById('autoSuggestCachedSuggestions_div').appendChild (newScript);
                     }
                     retrievedCachedSuggestions = true;
                     var searchTerm = document.getElementById("searchTermByUser").value;
                     if(searchTerm.length > AUTOSUGGEST_THRESHOLD) {
                            doStaticAutoSuggest(searchTerm);
                     }
              }
       }
})
