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
 * @fileOverview This file provides the common render context variables and functions, 
 * and defines all the render contexts needed throughout the store.
 */

dojo.require("wc.render.common");

/** 
 * @class The CommonContextsJS class defines all the common variables and functions 
 * for the render contexts across all store pages.
 */
CommonContextsJS = {
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
	 * Updates the specified context's property and assign it the desired value.
	 * 
	 * @param {string} contextId The id of the render context 
	 * @param {string} property The name of the context's property to update
	 * @param {string} value The value to update the specified property to
	 */
	setContextProperty:function(contextId,property,value){
		wc.render.getContextById(contextId).properties[property] = value;
	}

}

/**
 * Declares a new render context for Multiple Shipment Shipping & Billing display.
 */
wc.render.declareContext("multipleShipmentDetailsContext", {shipmentDetailsArea: "update"},""),

/**
 * Declares a new render context for Single Shipment Shipping Charge display.
 */
wc.render.declareContext("singleShipmentShipChargeContext", null,""),

/**
 * Declares a new render context for Multiple Shipment Shipping Charge display.
 */
wc.render.declareContext("multipleShipmentShipChargeContext", null,""),

/**
 * Declares a new render context for Single Shipment Shipping & Billing display.
 */
wc.render.declareContext("traditionalShipmentDetailsContext",{shipmentDetailsArea: "update"},""),

/**
 * Declares a new render context for the Current Order Totals display.
 */
wc.render.declareContext("currentOrder_Context",null,""),

/**
 * Declares a new render context for creating/editing the shipping address
 * and initializes it with the shipping address id and address type to the default placeholder values.
 */
wc.render.declareContext("editShippingAddressContext",{shippingAddress: "0",addressType: "ShippingAndBilling"},"","Main"),

/**
 * Declares a new render context for the select Billing Address dropdowns,
 * and initializes each Billing Address dropdown with address id and billing url placeholders.
 * Even though BillingURL1, 2, 3 point to same BillingAddressDropDisplay.jsp we cannot use only one URL to submit 3 requests.
 * There are 3 billing dropdown boxes in the Checkout page and all needs to be refreshed on address add/change.
 * But using the same URL and submitting 3 requests separately to refresh 3 dropdown boxes doesn't work, 
 * and invariably one of the request doesn't come back with response. Solution is to use 3 different URLs as a workaround.
 * BillingURL1,2,3 are set to correct <c:url values in .JSP page using setContextPRoperty method..
 */
wc.render.declareContext("billingAddressDropDownBoxContext",{billingAddress1: "0", billingAddress2: "0", billingAddress3: "0", billingURL1: "",billingURL2:"",billingURL3:"",areaNumber:'0',payment1: "", payment2: "", payment3: "", paymentTCId1: "", paymentTCId2: "", paymentTCId3: ""},""),

/**
 * Declares a new render context for showing/hiding the address form on the Checkout pages,
 * and initializes the show and hide area to a placeholder value.  
 */
wc.render.declareContext("contextForMainAndAddressDiv",{showArea: "0",hideArea: "0"},""),

/**
 * Declares a new render context for the select Shipping Address dropdown.
 */
wc.render.declareContext("shippingAddressDropDownBoxContext",null,""),

/**
 * Declares a new render context for the Category display with pagination.
 */
wc.render.declareContext("CategoryDisplay_Context",{pageView:"", beginIndex:""},""),

/**
 * Declares a new render context for the Sub-category display with pagination.
 */
wc.render.declareContext("SubCategoryDisplay_Context",null,""),

/**
 * Declares a new render context for Shopping Cart with pagination,
 * and initializes it with the beginning index value. 
 */
wc.render.declareContext("ShopCartPaginationDisplay_Context",{},""),
/**
* Declares a new render context for Pending order details page with pagination,
* and initializes it with the beginning index value. 
*/
wc.render.declareContext("PendingOrderPaginationDisplay_Context",{},""),
/**
* Declares a new render context for the pending order details page with pagination,
* and initializes it with the beginning index value. 
*/
wc.render.declareContext("PendingOrderDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for Single Shipment Order Summmary/Confirmation with pagination,
 * and initializes it with the beginning index value. 
 */
wc.render.declareContext("OrderItemPaginationDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for the Order Status Details with pagination,
 * and initializes it with the beginning index value. 
 */
wc.render.declareContext("OrderDetailPaginationDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for Multiple Shipment Order Summary/Confirmation with pagination,
 * and initializes it with the beginning index value.
 */
wc.render.declareContext("MSOrderItemPaginationDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for the Coupon Wallet display.
 */
wc.render.declareContext("CouponDisplay_Context",null,""),
/**
 * Declares a new render context for the Promotion Choice of free gifts pop-up display.
 */
wc.render.declareContext("PromotionFreeGifts_Context",null,""),

/**
 *  Declares a new render context for the saved orders list.
 */
wc.render.declareContext("ListOrdersDisplay_Context",{startNumber: "0"},""),

/**
 * Declares a new render context for the scheduled orders status display.
 */
wc.render.declareContext("ScheduledOrdersStatusDisplay_Context",{beginIndex: "0", selectedTab: "Scheduled"},""),

/**
 * Declares a new render context for the processed orders status display.
 */
wc.render.declareContext("ProcessedOrdersStatusDisplay_Context",{beginIndex: "0", selectedTab: "PreviouslyProcessed"},""),

/**
 * Declares a new render context for the waiting-for-approval orders status display.
 */
wc.render.declareContext("WaitingForApprovalOrdersStatusDisplay_Context",{beginIndex: "0", selectedTab: "WaitingForApproval"},""),

/**
 * Declares a new render context for the Browsing History Espot.
 */
wc.render.declareContext("BrowsingHistoryContext",{status:"init"},""),

/**
 * Declares a new render context for the Browsing History Display in My Account.
 */
wc.render.declareContext("BrowsingHistoryDisplay_Context",{currentPage: "0", pageView: ""},""),

/**
 * Declares a new render context for the subscription display area on category pages.
 */
wc.render.declareContext("CategorySubscriptionContext",null,""),

/**
 * Declares a new render context for the recurring order display.
 */
wc.render.declareContext("RecurringOrderDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for the subscription display.
 */
wc.render.declareContext("SubscriptionDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for the recent recurring order display.
 */
wc.render.declareContext("RecentRecurringOrderDisplay_Context",{beginIndex: "0",isMyAccountMainPage:"true"},""),

/**
 * Declares a new render context for the recent subscription display.
 */
wc.render.declareContext("RecentSubscriptionDisplay_Context",{beginIndex: "0",isMyAccountMainPage:"true"},""),

/**
 * Declares a new render context for the recurring order child orders display.
 */
wc.render.declareContext("RecurringOrderChildOrdersDisplay_Context",{beginIndex: "0",orderId: ""},""),

/**
 * Declares a new render context for the subscription child orders display.
 */
wc.render.declareContext("SubscriptionChildOrdersDisplay_Context",{beginIndex: "0",orderItemId: "",subscriptionName: ""},""),

/**
 * Declares a new render context for the QuickInfo.
 */
wc.render.declareContext("QuickInfoContext",null,""),

/**
 * Declares a new render context for the Discounts.
 */
wc.render.declareContext("DiscountDetailsContext",null,""),

/**
 * Declares a new render context for the Discounts in quick info.
 */
wc.render.declareContext("QuickInfoDiscountDetailsContext",null,""),

/**
 * Declares a new render context for double content area espot.
 */
wc.render.declareContext("DoubleContentAreaESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for scrollable espot.
 */
wc.render.declareContext("ScrollableESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for top categories espot.
 */
wc.render.declareContext("TopCategoriesESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for featured products in category espot.
 */
wc.render.declareContext("CategoryFeaturedProductsESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for home hero espot.
 */
wc.render.declareContext("HomeHeroESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for home left espot.
 */
wc.render.declareContext("HomeLeftESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for home right top espot.
 */
wc.render.declareContext("HomeRightTopESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for home right bottom espot.
 */
wc.render.declareContext("HomeRightBottomESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for tall double espot.
 */
wc.render.declareContext("TallDoubleContentAreaESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for top category hero espot.
 */
wc.render.declareContext("TopCategoryHeroESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for top category tall double espot.
 */
wc.render.declareContext("TopCategoryTallDoubleESpot_Context",{emsName: ""},""),


wc.render.declareContext("AttachmentPagination_Context",{beginIndex: "0"},"")
