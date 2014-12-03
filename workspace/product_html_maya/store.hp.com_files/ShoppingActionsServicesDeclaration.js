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
			//MessageHelper.hideAndClearMessage();
			// Do not show this message. When item is added, we open up mini cart to display the currently added item.
			// MessageHelper.displayStatusMessage(storeNLS["SHOPCART_ADDED"]);
			dropdownUpdated = false;
			showMiniShopCartDropDown('widget_minishopcart','quick_cart_container','orderItemsListAutoClose');
			$('html, body').animate({ scrollTop:0}, $(window).scrollTop() / 3);
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
			dojo.publish("CMAddToCart");
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
			 	if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
			 		//MessageHelper.displayErrorMessage(storeNLS["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
 				} else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
					var tempString = storeNLS["GENERICERR_MAINTEXT"];
					tempString = dojo.string.substitute(tempString,{0:storeNLS["GENERICERR_CONTACT_US"]});
 					//MessageHelper.displayErrorMessage(tempString);
 				} else {
 					//MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
	alert(serviceResponse.errorMessage);
 				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					//MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

    }),
   
   wc.service.declare({
	   	id: "MiniCartOrderCalculate",
	   	actionId: "MiniCartOrderCalculate",
	   	url: getAbsoluteURL() + "AjaxOrderCalculate",
	   	formId: ""
	  ,successHandler: function(serviceResponse)
	 {
		console.log ("Order calculate success");
	   	var orderId=serviceResponse.orderIdOrderItemAccessBean;
	   	var orderItemId=serviceResponse.orderItemId;
	   	var param = [];
  		param.storeId = WCParamJS.storeId;
  		param.catalogId = WCParamJS.catalogId;
   		param.langId = WCParamJS.langId;
  		param.orderId = orderId
  		param.orderItemId = orderItemId;

	   	var a=serviceResponse.catentDeletedName;
	   	var b=serviceResponse.flag;
		console.debug(a);
	   			
	   	if(a != "Undefined" && a != undefined && b == false){
		   			alert("The "+serviceResponse.catentDeletedName+" has become unavailable since you've added it to your cart.");
		   			wc.service.invoke("AjaxDeleteOrderItem", param);

		  		    if(!dropdownUpdated){
		  				renderContext.properties.fetchCartContents = true;
		  				dropdownUpdated = true;
		  		    	widget.refresh(renderContext.properties);
		  		    }
		}
	//alert($("#PDPSku").val());
		       var accessoriesUrl = "PDPAccessoriesFinderView?storeId=" +
		 	shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
		 	shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
			shoppingActionsServicesDeclarationJS.langId + "&productId=" +$("#PDPSku").val().split('_')[1]+"&SKU_ID="+$("#PDPSku").val().split('_')[0];
		$.ajax({
	      		url: getAbsoluteURL()+accessoriesUrl ,
		       success: function(data) {
       	 	$("body").append("<div style:visibility='hidden'>"+data+"</div>");
			if($("#PDPAccessoriesAssociations").val() != undefined && $("#PDPAccessoriesAssociations").val().indexOf('Y')!=-1) {
				var productId=$("#PDPSku").val().split('_')[1];
				updateCartQuantityInAddtoCart(serviceResponse.orderId);
		       	var redirectUrl = "AccessoriesView?storeId=" +
		 		shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
		 		shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
				shoppingActionsServicesDeclarationJS.langId + "&productId=" +
				productId+"&SKU_ID="+$("#PDPSku").val().split('_')[0];
				document.location.href = getAbsoluteURL() + redirectUrl;		 
			}
			else {
		        	updateCartQuantityInAddtoCart(serviceResponse.orderId);
			 	var redirectUrl = "AjaxOrderItemDisplayView?storeId=" +
				shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
				shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
				shoppingActionsServicesDeclarationJS.langId;
				document.location.href = getAbsoluteURL() + redirectUrl;
		}
       	     }
		 });
	   }
	   ,failureHandler: function(serviceResponse) 
		{
	   		console.log ("Order calculate failed");
			var redirectUrl = "AjaxOrderItemDisplayView?storeId=" +
			shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
			shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
			shoppingActionsServicesDeclarationJS.langId;
			document.location.href = getAbsoluteURL() + redirectUrl;
	   	}

}),

wc.service.declare({
		id: "AddToCartAjax",
		actionId: "AddToCartAjax",
		url: getAbsoluteURL() + "AddToCartAjax",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
        dropdownUpdated = false;
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
        //dojo.publish("CMAddToCart");
       	setShopCartRedirectCookie();
/***********************************************************


		if($("#isAddtoCartFromPDPAttach").val()!= undefined && $("#isAddtoCartFromPDPAttach").val().indexOf('Y')!=-1) { 
			}
			else{
		       var accessoriesUrl = "PDPAccessoriesFinderView?storeId=" +
		 	shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
		 	shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
			shoppingActionsServicesDeclarationJS.langId + "&productId=" +$("#PDPSku").val().split('_')[1]+"&SKU_ID="+$("#PDPSku").val().split('_')[0];
		$.ajax({
	      		url: getAbsoluteURL()+accessoriesUrl ,
		       success: function(data) {
       	 	$("body").append("<div style:visibility='hidden'>"+data+"</div>");
			if($("#PDPAccessoriesAssociations").val() != undefined && $("#PDPAccessoriesAssociations").val().indexOf('Y')!=-1) {
				var productId=$("#PDPSku").val().split('_')[1];
				updateCartQuantityInAddtoCart(serviceResponse.orderId);
		       	var redirectUrl = "AccessoriesView?storeId=" +
		 		shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
		 		shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
				shoppingActionsServicesDeclarationJS.langId + "&productId=" +
				productId+"&SKU_ID="+$("#PDPSku").val().split('_')[0];
				document.location.href = getAbsoluteURL() + redirectUrl;		 
			}
			else {
		        	updateCartQuantityInAddtoCart(serviceResponse.orderId);
			 	var redirectUrl = "AjaxOrderItemDisplayView?storeId=" +
				shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
				shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
				shoppingActionsServicesDeclarationJS.langId;
				document.location.href = getAbsoluteURL() + redirectUrl;
		}
       	     }
		 });
		}
*/
		if($("#isAddtoCartFromPDPAttach").val()!= undefined && $("#isAddtoCartFromPDPAttach").val().indexOf('Y')!=-1) { 
			}
			else{
		        	updateCartQuantityInAddtoCart(serviceResponse.orderId);
			 	var redirectUrl = "AjaxOrderItemDisplayView?storeId=" +
				shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
				shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
				shoppingActionsServicesDeclarationJS.langId;
				document.location.href = getAbsoluteURL() + redirectUrl;
			    }

/****************************************************

       	
       	if($("#hasAccessoriesAssociations").val() != undefined && $("#hasAccessoriesAssociations").val().indexOf('Y')!=-1) {
			var productId=$("#hasAccessoriesAssociations").val().split('_')[1];
			//alert('productId  '+productId);
			updateCartQuantityInAddtoCart(serviceResponse.orderId);
		       var redirectUrl = "STOAccessoriesView?storeId=" +
		 	shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
		 	shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
			shoppingActionsServicesDeclarationJS.langId + "&productId=" +productId;
			document.location.href = getAbsoluteURL() + redirectUrl;		 
		}
		else {
		updateCartQuantityInAddtoCart(serviceResponse.orderId);
		 var redirectUrl = "AjaxOrderItemDisplayView?storeId=" +
		 shoppingActionsServicesDeclarationJS.storeId + "&catalogId=" +
		 shoppingActionsServicesDeclarationJS.catalogId + "&langId=" +
		 shoppingActionsServicesDeclarationJS.langId;
		 document.location.href = getAbsoluteURL() + redirectUrl;
		}
**********************************************************************/
		}
	 /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			 if (serviceResponse.errorMessage) {
                 if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
                     //MessageHelper.displayErrorMessage(storeNLS["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
                 } else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
                    var tempString = storeNLS["GENERICERR_MAINTEXT"];
                    tempString = dojo.string.substitute(tempString,{0:storeNLS["GENERICERR_CONTACT_US"]});
                     //MessageHelper.displayErrorMessage(tempString);
                 } else {
                     //MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			alert(serviceResponse.errorMessage);
                 }
            }
            else {
                 if (serviceResponse.errorMessageKey) {
                    //MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
                 }
            }
            cursor_clear();
		}

	}),





   
    //code for add to cart
   
    wc.service.declare({
        id: "AddOrderItem1",
        actionId: "AddOrderItem",
        url: getAbsoluteURL() + "AjaxOrderChangeServiceItemAdd",
        formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

        ,successHandler: function(serviceResponse) {
            //MessageHelper.hideAndClearMessage();
            // Do not show this message. When item is added, we open up mini cart to display the currently added item.
            // MessageHelper.displayStatusMessage(storeNLS["SHOPCART_ADDED"]);
            dropdownUpdated = false;
            //showMiniShopCartDropDown('widget_minishopcart','quick_cart_container','orderItemsListAutoClose');
            //cursor_clear();
		cursor_wait();
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
            dojo.publish("CMAddToCart");
           	setShopCartRedirectCookie();
var params = [];
   			params.storeId		= WCParamJS.storeId;
   			params.catalogId	= WCParamJS.catalogId;
   			params.langId		= WCParamJS.langId;
   			params.URL= "";
   			params.updatePrices = "1";
   			params.orderId = ".";
   			params.calculationUsageId = "-1";
	           wc.service.invoke("MiniCartOrderCalculate",params);
        }
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
        ,failureHandler: function(serviceResponse) {

            if (serviceResponse.errorMessage) {
                 if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
                     //MessageHelper.displayErrorMessage(storeNLS["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
                 } else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
                    var tempString = storeNLS["GENERICERR_MAINTEXT"];
                    tempString = dojo.string.substitute(tempString,{0:storeNLS["GENERICERR_CONTACT_US"]});
                     //MessageHelper.displayErrorMessage(tempString);
                 } else {
                     //MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			alert(serviceResponse.errorMessage);
                 }
            }
            else {
                 if (serviceResponse.errorMessageKey) {
                    //MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
                 }
            }
            cursor_clear();
        }

    }),

/**
* AA: Custom AjaxDeleteOrderItem service to handle the refresh
scenario from mini cart pop up.
* @constructor
*/
wc.service.declare({
id: "AjaxDeleteOrderItemTcs",
actionId: "AjaxDeleteOrderItemTcs",
url: getAbsoluteURL() +"AjaxOrderChangeServiceItemDelete",
formId: ""
   /**
    * display a success message
    * @param (object) serviceResponse The service response object,
which is the
    * JSON object returned by the service invocation
    */
,successHandler: function(serviceResponse) {
dropdownInit = false;
dropdownUpdated =false;
setShopCartRedirectCookie();
showMiniShopCartDropDown('widget_minishopcart','quick_cart_container','orderItemsListAutoClose1');
                updateCartCookie();
                wc.render.updateContext('MiniShoppingCartContext', {'status':'load'});

cursor_clear();
}
    /**
    * display an error message
    * @param (object) serviceResponse The service response object,
which is the
    * JSON object returned by the service invocation
    */
,failureHandler: function(serviceResponse) {
	if (serviceResponse.errorMessageKey == '_ERR_ORDER_IS_LOCKED' || serviceResponse.errorMessageKey == '_ERR_ORDER_IS_NOT_LOCKED') {
		alert (serviceResponse.errorMessage);
	}
if (serviceResponse.errorMessage) {
MessageHelper.displayErrorMessage
(serviceResponse.errorMessage);
}
else {
if (serviceResponse.errorMessageKey) {
MessageHelper.displayErrorMessage
(serviceResponse.errorMessageKey);
}
}
cursor_clear();
}

}),

   
    /**
     * Adds a pre-defined dynamic kit to a shopping cart in Ajax mode. A message is displayed after
     * the service call.
     * @constructor
     */
    wc.service.declare({
        id: "AddPreConfigurationToCart",
        actionId: "AddOrderItem",
        url: getAbsoluteURL() + "AjaxOrderChangeServiceAddPreConfigurationToCart",
        formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */


		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
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

	})