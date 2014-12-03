CallcenterCommonJS={
		
	manageOrderLock:function(ccAction, storeId) {
		var params = [];
		params.storeId = storeId;
		params.ccAction = ccAction;
		cursor_wait();			
		wc.service.invoke("CCManageOrderLock", params);
	},

	callOrderLockHelper:function(storeId, takeoverlock) {
		var params = [];
		if (storeId)
			params.storeId = storeId;
		if (takeoverlock)
			params.takeoverlock = takeoverlock;
		cursor_wait();			
		wc.service.invoke("CCOrderLockHelper", params);
		console.log("callOrderLockHelper completed");
	},
	updateCartItemQty: function(qtyElmtId,prevQty,orderId,langId,storeId,catalogId,itemSKU,statusCount,singleItemPrice,itemType){      
          var qtyHTMLElmt = $('input#'+qtyElmtId)[0];
          var newQty = qtyHTMLElmt.value;
          
          setCurrentId(qtyElmtId); 
          CheckoutHelperJS.setPreviousValue(prevQty,qtyElmtId); 
          if(itemType=='VGC' || itemType=='PGC' || itemType=='PROMO_GC'){
                CheckoutHelperJS.updateGiftCardTable(qtyHTMLElmt,orderId,'update');                  
          }                 
          CheckoutHelperJS.updateCartWait(qtyHTMLElmt,orderId);
          CheckoutHelperJS.setCommonParameters(langId,storeId,catalogId);
          quantityChange(itemSKU,newQty,statusCount,(singleItemPrice*newQty));
    }

}


