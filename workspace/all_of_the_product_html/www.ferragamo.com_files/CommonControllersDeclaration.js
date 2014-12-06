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
              if(message.actionId in order_updated || message.actionId == 'AjaxDeleteOrderItemForShippingBillingPage'){
	               widget.refresh(renderContext.properties);
				   submitRequest(); //Till shop cart is refreshed, do not allow any other requests..
				   cursor_wait();
              }
       }

       /** 
        * Displays the discounts and promotions area upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
    	   resetRequest(); //Shop cart is refreshed, give the control to shopper...
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
    	   // evaluate scripts in shopping list
    	   dojo.query('div[id^="shoppingListScript_"]').forEach(function(node, index, nodelist){
    	   	dojo.eval(node.innerHTML);
    	   });
    	   cursor_clear();
    	   
    	   // Invocazione per aggiornare il carrello lato Oracle Recommendations
    	   // aggiunto parametro recommendationTag per condizionare la chiamata
		    if (FrgMiniWishListUtilJS.recommendationTag == true) {
		    		callATGSvcs("cart");
    	    }
    	   //applicazione scrollbar
    	   if ($jq("#totalNumberOfItems").val() > 1 ){
				$jq("#ShopCartPagingDisplay").addClass("scroll-pane-minishopcart");
				
				/* JScrollPane for minishopcart - START */
				/* Panel inizialization */
				
					scroller = $jq('#ShopCartPagingDisplay').jScrollPane({
							showArrows: false,
							contentWidth: 0,
							horizontalDragMaxWidth: 0
					}).data('jsp');
					
				$jq(window).bind('resize', function () {
					if (scroller) {
						setTimeout(function () {
							scroller.reinitialise();
						}, 10);
					}
				});
				$jq(window).trigger('resize');
				
				/* JScrollPane for minishopcart - END */ 
			}
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
 * Declares a new refresh controller for Single Shipment Order Item display with pagination
 * on the Order Summary pages when inegrating with Sterling. 
 */
wc.render.declareRefreshController({
    id: "SSFSOrderItemPaginationDisplayController",
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
                        
           var orderStr = document.getElementById("jsonOrderStr").innerHTML;
           var beginIndex = this.renderContext.properties['beginIndex'];
           var pageSize = this.renderContext.properties['pageSize'];             
           sterlingIntegrationJS.populateOrderLineInfoForSingleShipment(orderStr, beginIndex, pageSize);         	
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
 * Declares a new refresh controller for Multiple Shipment Order Item display with pagination
 * on the Order Summary when integrating with Sterling.
 */
wc.render.declareRefreshController({
    id: "SSFSMSOrderItemPaginationDisplayController",
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
           
           var orderStr = document.getElementById("jsonOrderStr").innerHTML;
           var beginIndex = this.renderContext.properties['beginIndex'];
           var pageSize = this.renderContext.properties['pageSize'];              
           sterlingIntegrationJS.populateOrderLineInfoForMultipleShipment(orderStr, beginIndex, pageSize);              
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
 * Refresh controller for quickinfo popup. 
 */
wc.render.declareRefreshController({
	id: "QuickInfoDetailsController",
	renderContext: wc.render.getContextById("QuickInfoContext"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the wishlist drop down in the quick info popup.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		widget.refresh(this.renderContext.properties);			
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		if(dojo.byId("QuickInfostoreParams")){
			var storeParams = dojo.byId("QuickInfostoreParams").value;
			if(dojo.byId("catEntryParamsForJS")){
				var catEntryParams = dojo.byId("catEntryParamsForJS").value;
			}
			var shoppingListNames = dojo.byId("QuickInfoshoppingListNames").value;
			
			shoppingListJSQuickInfo = new ShoppingListJS(dojo.fromJson(storeParams), dojo.fromJson(catEntryParams), dojo.fromJson(shoppingListNames),"shoppingListJSQuickInfo");
			
			var catEntryId = dojo.fromJson(catEntryParams).id;
			if(null != catEntryId && '' != catEntryId){
				wc.render.updateContext('QuickInfoDiscountDetailsContext', {productId:dojo.fromJson(catEntryParams).id});
			}
		}
		if(dojo.byId("catEntryParamsForJS")){
			QuickInfoJS.catEntryParams = dojo.fromJson(dojo.byId('catEntryParamsForJS').value);
		}
		//the quick info dialog is hidden by default. We have to display it after the area is refreshed.
		var quickInfoPopup = dijit.byId("quickInfoPopup");
		if (quickInfoPopup !=null) {			
			quickInfoPopup.closeButtonNode.style.display='none';//hide the close button inherited from dijit.dialog		
			closeAllDialogs(); //close other dialogs(quickinfo dialog, etc) before opening this.
			// if itemId is present, then quickInfo popup is from change attribute link in shopping cart page, which will explicitly set the quantity
			if(QuickInfoJS.itemId == ''){
				QuickInfoJS.setCatEntryQuantity(1);
				QuickInfoJS.selectDefaultSwatch();
			} else {
				QuickInfoJS.selectCurrentAttributes();
			}
			quickInfoPopup.show();
		}else {
			console.debug("quickInfoPopup does not exist");
		}
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for fetching discount details. 
 */
wc.render.declareRefreshController({
	id: "DiscountDetailsController",
	renderContext: wc.render.getContextById("DiscountDetailsContext"),
	url: "DiscountDetailsView",
	formId: "",
	
    /** 
     * Refreshs the discount section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		widget.refresh(this.renderContext.properties);			
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for fetching discount details for quick info. 
 */
wc.render.declareRefreshController({
	id: "QuickInfoDiscountDetailsController",
	renderContext: wc.render.getContextById("QuickInfoDiscountDetailsContext"),
	url: "DiscountDetailsView",
	formId: "",
	
    /** 
     * Refreshs the discount section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		widget.refresh(this.renderContext.properties);			
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for double content area espot. 
 */
wc.render.declareRefreshController({
	id: "DoubleContentAreaESpot_Controller",
	renderContext: wc.render.getContextById("DoubleContentAreaESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);	
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for scrollable espot. 
 */
wc.render.declareRefreshController({
	id: "ScrollableESpot_Controller",
	renderContext: wc.render.getContextById("ScrollableESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for top categories espot. 
 */
wc.render.declareRefreshController({
	id: "TopCategoriesESpot_Controller",
	renderContext: wc.render.getContextById("TopCategoriesESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for top categories espot. 
 */
wc.render.declareRefreshController({
	id: "CategoryFeaturedProductsESpot_Controller",
	renderContext: wc.render.getContextById("CategoryFeaturedProductsESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for home hero espot. 
 */
wc.render.declareRefreshController({
	id: "HomeHeroESpot_Controller",
	renderContext: wc.render.getContextById("HomeHeroESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for home left espot. 
 */
wc.render.declareRefreshController({
	id: "HomeLeftESpot_Controller",
	renderContext: wc.render.getContextById("HomeLeftESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for home right top espot. 
 */
wc.render.declareRefreshController({
	id: "HomeRightTopESpot_Controller",
	renderContext: wc.render.getContextById("HomeRightTopESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for home right bottom espot. 
 */
wc.render.declareRefreshController({
	id: "HomeRightBottomESpot_Controller",
	renderContext: wc.render.getContextById("HomeRightBottomESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for tall double espot. 
 */
wc.render.declareRefreshController({
	id: "TallDoubleContentAreaESpot_Controller",
	renderContext: wc.render.getContextById("TallDoubleContentAreaESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for top category hero espot. 
 */
wc.render.declareRefreshController({
	id: "TopCategoryHeroESpot_Controller",
	renderContext: wc.render.getContextById("TopCategoryHeroESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for top category tall double espot. 
 */
wc.render.declareRefreshController({
	id: "TopCategoryTallDoubleESpot_Controller",
	renderContext: wc.render.getContextById("TopCategoryTallDoubleESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for attachment list in product page. 
 */
wc.render.declareRefreshController({
	id: "AttachmentPagination_Controller",
	renderContext: wc.render.getContextById("AttachmentPagination_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["beginIndex"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
})

