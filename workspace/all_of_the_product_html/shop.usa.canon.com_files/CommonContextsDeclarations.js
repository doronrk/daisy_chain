dojo.require("wc.render.common");CommonContextsJS={langId:"-1",storeId:"",catalogId:"",setCommonParameters:function(langId,storeId,catalogId){this.langId=langId;this.storeId=storeId;this.catalogId=catalogId;},setContextProperty:function(contextId,property,value){wc.render.getContextById(contextId).properties[property]=value;}};wc.render.declareContext("multipleShipmentDetailsContext",{shipmentDetailsArea:"update"},""),wc.render.declareContext("singleShipmentShipChargeContext",null,""),wc.render.declareContext("multipleShipmentShipChargeContext",null,""),wc.render.declareContext("traditionalShipmentDetailsContext",{shipmentDetailsArea:"update"},""),wc.render.declareContext("currentOrder_Context",null,""),wc.render.declareContext("editShippingAddressContext",{shippingAddress:"0",addressType:"ShippingAndBilling"},"","Main"),wc.render.declareContext("billingAddressDropDownBoxContext",{billingAddress1:"0",billingAddress2:"0",billingAddress3:"0",billingURL1:"",billingURL2:"",billingURL3:"",areaNumber:"0",payment1:"",payment2:"",payment3:"",paymentTCId1:"",paymentTCId2:"",paymentTCId3:""},""),wc.render.declareContext("contextForMainAndAddressDiv",{showArea:"0",hideArea:"0"},""),wc.render.declareContext("shippingAddressDropDownBoxContext",null,""),wc.render.declareContext("CategoryDisplay_Context",{pageView:"",beginIndex:""},""),wc.render.declareContext("SubCategoryDisplay_Context",null,""),wc.render.declareContext("ShopCartPaginationDisplay_Context",{},""),wc.render.declareContext("PendingOrderPaginationDisplay_Context",{},""),wc.render.declareContext("PendingOrderDisplay_Context",{beginIndex:"0"},""),wc.render.declareContext("OrderItemPaginationDisplay_Context",{beginIndex:"0"},""),wc.render.declareContext("OrderDetailPaginationDisplay_Context",{beginIndex:"0"},""),wc.render.declareContext("MSOrderItemPaginationDisplay_Context",{beginIndex:"0"},""),wc.render.declareContext("CouponDisplay_Context",null,""),wc.render.declareContext("PromotionFreeGifts_Context",null,""),wc.render.declareContext("ListOrdersDisplay_Context",{startNumber:"0"},""),wc.render.declareContext("ScheduledOrdersStatusDisplay_Context",{beginIndex:"0",selectedTab:"Scheduled"},""),wc.render.declareContext("ProcessedOrdersStatusDisplay_Context",{beginIndex:"0",selectedTab:"PreviouslyProcessed"},""),wc.render.declareContext("WaitingForApprovalOrdersStatusDisplay_Context",{beginIndex:"0",selectedTab:"WaitingForApproval"},""),wc.render.declareContext("BrowsingHistoryContext",{status:"init"},""),wc.render.declareContext("BrowsingHistoryDisplay_Context",{currentPage:"0",pageView:""},""),wc.render.declareContext("CategorySubscriptionContext",null,""),wc.render.declareContext("RecurringOrderDisplay_Context",{beginIndex:"0"},""),wc.render.declareContext("SubscriptionDisplay_Context",{beginIndex:"0"},""),wc.render.declareContext("RecentRecurringOrderDisplay_Context",{beginIndex:"0",isMyAccountMainPage:"true"},""),wc.render.declareContext("RecentSubscriptionDisplay_Context",{beginIndex:"0",isMyAccountMainPage:"true"},""),wc.render.declareContext("RecurringOrderChildOrdersDisplay_Context",{beginIndex:"0",orderId:""},""),wc.render.declareContext("SubscriptionChildOrdersDisplay_Context",{beginIndex:"0",orderItemId:"",subscriptionName:""},""),wc.render.declareContext("QuickInfoContext",null,""),wc.render.declareContext("DiscountDetailsContext",null,""),wc.render.declareContext("QuickInfoDiscountDetailsContext",null,""),wc.render.declareContext("DoubleContentAreaESpot_Context",{emsName:""},""),wc.render.declareContext("ScrollableESpot_Context",{emsName:""},""),wc.render.declareContext("TopCategoriesESpot_Context",{emsName:""},""),wc.render.declareContext("CategoryFeaturedProductsESpot_Context",{emsName:""},""),wc.render.declareContext("HomeHeroESpot_Context",{emsName:""},""),wc.render.declareContext("HomeLeftESpot_Context",{emsName:""},""),wc.render.declareContext("HomeRightTopESpot_Context",{emsName:""},""),wc.render.declareContext("HomeRightBottomESpot_Context",{emsName:""},""),wc.render.declareContext("TallDoubleContentAreaESpot_Context",{emsName:""},""),wc.render.declareContext("TopCategoryHeroESpot_Context",{emsName:""},""),wc.render.declareContext("TopCategoryTallDoubleESpot_Context",{emsName:""},""),wc.render.declareContext("AttachmentPagination_Context",{beginIndex:"0"},"");wc.render.declareContext("productSwatchContext",{productId:"-1"},"");