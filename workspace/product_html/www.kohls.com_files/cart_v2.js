(function() {
    var AjaxCart = window.AjaxCart = {};

    var trAjax = window.trAjax = {};

    var trJson = window.trJson = {};

    trAjax.post = function ($form, formData, successCallback, errorCallback) {
        $.ajax({
            url: $form.attr('action'),
            type: "POST",
            data: formData,
            dataType: "application/json",
            error: function (data) {
            	var sessionExpired = data.responseText.indexOf("Session Expired") > -1 || data.responseText.indexOf("session has timed out")> -1;
                if (data.status == 409 || sessionExpired) {
                    window.location.href = "/common/session_timeout.jsp";
                } else if (data.status == 200) {
                    var responseJson = jQuery.parseJSON(data.responseText);
                    successCallback(responseJson);
                } else {
                    errorCallback(data);
                }

            }
        });
    };



    trAjax.postTrJsonData = function($form, formData, successCallback, errorCallback) {
        trAjax.post($form, formData, function(data) {trJsonData = data; successCallback(data);}, errorCallback);
    };

    trAjax.get = function($url,params, successCallback, errorCallback) {
    	//[*] If $url is empty, error handler will fail in data.status == 200 branch (parseJSON call)
        $.ajax({
            url: $url,
            type: "GET",
            data: params,
            dataType: "application/json",
            error: function (data) {
                var sessionExpired = data.responseText.indexOf("Session Expired") > -1;
                if (data.status == 409 || sessionExpired) {
                    window.location.href = "/common/session_timeout.jsp";
                } else if (data.status == 200) {
                	try {
                		var responseJson = jQuery.parseJSON(data.responseText);
                        successCallback(responseJson);
                	} catch(e) {
                		errorCallback(data);
                	}
                } else {
                    errorCallback(data);
                }
            }
        });
    };

    trJson.hasErrors = function() {
        if (trJsonData.errors && trJsonData.errors.length > 0){
        	return true;
        }
            
        for(var i = 0; i < trJsonData.shoppingBag.items.length; i ++) {
            var errorMsg = trJsonData.shoppingBag.items[i].errorMsg;
            //BOPUS Change : If pickup item has errors don't proceed to checkout page. 
            var bopuErrorMsg = trJsonData.shoppingBag.items[i].bopusItemErrorMessage;
            if (errorMsg && errorMsg != "") {
                return true;
            } else if (bopuErrorMsg && bopuErrorMsg != "") {
            	return true;
            }
        }
        return false;
    };


   /*function retrievs actual state of trJsonData*/

    trAjax.getTrJsonData = function(successCallback, errorCallback) {
        var url = trJsonData.source;
        trAjax.get(url,{},function(data) {trJsonData = data; successCallback(data);}, errorCallback);
    };
    
    //Start:Bopus changes
    //Added updated product id to the form data
    function _buildShoppingBagFormData($form, updateCommerceId, prefix) {
        var formData = $form.serializeArray();
        var updatedProductId = "";
        if (!prefix) prefix = '';
       
        if (trJsonData && trJsonData.shoppingBag && trJsonData.shoppingBag.items) {
            var items = trJsonData.shoppingBag.items;
            //START:OF-193 defect Fix changes 
            for(var i = 0; i < items.length; i ++) {
            //END:OF-193 defect Fix changes 
                var item = items[i];
                var itemQty = item.quantity;
                if (!updateCommerceId || (prefix + item.commerceId === updateCommerceId)) {
                    //console.log("---- #" + prefix + item.commerceId);
                    itemQty = $("#" + prefix + item.commerceId).val();
                    updatedProductId = item.productId;
                }
                formData.push({name: item.commerceId, value: itemQty});
            }
        }
        //START:ATGBOPUS-300 defect Fix changes 
		var pageValue= $("#page_value").text();
		formData.push({name: "checkoutPages", value: pageValue});
		//END:ATGBOPUS-300 defect Fix changes 
        formData.push({name: "updatedProductId", value: updatedProductId});
        return formData;
    }
  //End:Bopus changes
  
     
    //Start:Bopus Changes
    function _updateQty(commerceId, prefix, successCallback, errorCallback) {
    		var updatedCommerceId;
            var $form = $("#cart_update"),
                formData = _buildShoppingBagFormData($form, commerceId, prefix),
                commerceItemIndex = -1,
                commerceItem;

            if("qty_order_review_" == prefix) {
                formData.push({name: "sourcePage", value: "orderReview"});
            }

            $.each(trJsonData.shoppingBag.items, function(i, item) {
                if (commerceItemIndex >= 0) return;
                if (prefix + item.commerceId === commerceId) {
    		updatedCommerceId = item.commerceId;
                    commerceItemIndex = i;
                    commerceItem = item;
                }
            });

            var success = function (data) {
                var hasErrors = trJson.hasErrors();

                //check if last gwp item quantity was decreased to 0
                if (trJsonData.shoppingBag.items.length == commerceItemIndex) {
                    commerceItem.removed = true;
                    trJsonData.shoppingBag.items.splice(commerceItemIndex, 0, commerceItem);
                }
                $.each(trJsonData.shoppingBag.items, function (i, item) {
                   // if (i == commerceItemIndex && !hasErrors) {
                    if (i == commerceItemIndex && !hasErrors && item.removed) {
                        item.successMsg =  trLabels.successMsgForItemRemove;
                    }else if (item.commerceId == updatedCommerceId && !hasErrors && !item.removed) {	
                        item.successMsg =  trLabels.successMsgForItemUpdate;
                    } else {
                    	if(item.pickupItem != undefined && item.pickupItem !="" && item.pickupItem == true){
                        	item.bopusItemErrorMessage = item.errorMsg;
                        	item.errorMsg = "";
                        	trJsonData.errors = "";

                        }
                    }
    		
                });

                //[*] How to properly track if hasErrors?
                captureUserTrackingData(trJsonData, captureUserTrackingData.fUpdateQuantity);
                successCallback(data);
            };

            trAjax.postTrJsonData($form, formData, success, errorCallback);
        }
   //End:Bopus Changes

    AjaxCart.updateData = function (successCallback, errorCallback) {
        trAjax.get(trJsonData.source, {}, function(data) {trJsonData = data; successCallback(data)}, errorCallback);
    };

    AjaxCart.updateQty = function (commerceId, successCallback, errorCallback) {
        _updateQty(commerceId, "", successCallback, errorCallback);
    };

    AjaxCart.updateQtyOrderReview = function (commerceId, successCallback, errorCallback) {
        _updateQty(commerceId, "qty_order_review_", successCallback, errorCallback);
    };
    
    //Strat:Bopus changes
    function _moveToPurchase(successCallback, errorCallback) {
        var $form = $("#cart_checkout");
        var formData = _buildShoppingBagFormData($form);
        var hasErrors = trJson.hasErrors();
        var success = function(data) {
            $.each(trJsonData.shoppingBag.items, function(i, item) {
            	if(hasErrors && item.pickupItem != undefined && item.pickupItem !="" && item.pickupItem == true){
                	item.bopusItemErrorMessage = item.errorMsg;
                	item.errorMsg = "";
                }
            });
            successCallback(data);
        };
        trAjax.postTrJsonData($form, formData, success, errorCallback);
    }
  //End:Bopus changes
  
    
    /*Start Inventory related cardModifier form call*/
    AjaxCart.inventoryModule = function (successCallback, errorCallback) {
    	_inventoryModule(successCallback, errorCallback);
    };
    
    function _inventoryModule(successCallback, errorCallback) {
        var $form = $("#inventory_checking");
        var formData = _buildShoppingBagFormData($form);
        var success = function(data) {
            successCallback(data);
        };
        trAjax.postTrJsonData($form, formData, success, errorCallback);
    }
    /*End Inventory related cardModifier form call*/
    
    
  //Strat:Bopus changes
    var commerceJsonData = "";
    function _moveToPurchasePB(successCallback, errorCallback) {
        var $form = $("#pb_cart_checkout");
        var formData = $form.serializeArray();
        //var hasErrors = trJson.hasErrors();
				/* Start: ATG-5375 & Mingle Defect Fix-2572 */
			/*getCommerceJsonData();
			if (commerceJsonData != "undefined" && commerceJsonData != null
					&& commerceJsonData.shoppingBag.items != "") {
				formData = _buildShoppingBagPBFormData($form);
			}*/
				/* End: ATG-5375 & Mingle Defect Fix-2572 */
        var success = function(data) {           
            successCallback(data);
        };
        trAjax.postTrJsonData($form, formData, success, errorCallback);
    }
  //End:Bopus changes
    
    
    AjaxCart.moveToPurchasePB = function (successCallback, errorCallback) {
            //Strat:Bopus changes
    	//alert("inside ajax method");
            _moveToPurchasePB(successCallback, errorCallback);
            //End:Bopus changes
    };

    
    AjaxCart.moveToPurchase = function (successCallback, errorCallback) {
    	//Strat:Bopus changes
    	_moveToPurchase(successCallback, errorCallback);
    	//End:Bopus changes
    };

    AjaxCart.removeItem = function(commerceId, recalcTaxes, successCallback, errorCallback) {
        $("#removalCommerceIds").val(commerceId);
        var $form = $("#remove_item_form");
        var formData = $form.serializeArray();
        var removedItemId;
        var removedItem;
        if(recalcTaxes) {
            formData.push({name: "sourcePage", value: "orderReview"});
        }

        (function () {
            $.each(trJsonData.shoppingBag.items, function (i, item) {
                if (item.commerceId == commerceId) {
                    removedItemId = i;
                    removedItem = trJsonData.shoppingBag.items[i];
                }
            });
        })();
        // insert new item with 'removed' flag in position of already deleted item
        var success = function (data) {
            removedItem.successMsg = trLabels.successMsgForItemRemove;
            removedItem.removed = true;              
                trJsonData.shoppingBag.items.splice(removedItemId, 0, removedItem);
          //[*] Check if errors?
            captureUserTrackingData(trJsonData, captureUserTrackingData.fRemoveItem);
            successCallback(data);
        }
        trAjax.postTrJsonData($form, formData, success, errorCallback);
    };

    AjaxCart.updateGiftItem = function(commerceId, isGift, successCallback, errorCallback) {
        $("#commerceItemId").val(commerceId);
        $("#isGift").val(isGift);
        var $giftForm = $("#giftForm");
        var formData = _buildShoppingBagFormData($("#cart_checkout"));
        var success = function(data) {
            $.each(trJsonData.shoppingBag.items, function(i, item) {
                if (item.commerceId == commerceId) {
                    item.successMsg = trLabels.successMsgForItemUpdate;
                }
            });
            successCallback(data);
        };
        var result = _mergeFormData(formData, $giftForm.serializeArray());

        var giftItemInOrderSuccessURL;
        var giftItemInOrderErrorURL;
        for(var i = 0; i < result.length; i++) {
            if(result[i].name.match(/giftItemInOrderSuccessURL/) && result[i].value && result[i].value != " ") {
                giftItemInOrderSuccessURL = result[i].value;
            }
            if(result[i].name.match(/giftItemInOrderErrorURL/) && result[i].value && result[i].value != " ") {
                giftItemInOrderErrorURL = result[i].value;
            }
        }

        for(var i = 0; i < result.length; i++) {
            if(result[i].name.match(/moveToPurchaseInfoByCommerceId/)) {
                result.splice(i, 1);
                i--;
            }
            if(result[i].name.match(/moveToPurchaseInfoSuccessURL/) && !result[i].name.match(/^_D/)) {
                result[i].value = giftItemInOrderSuccessURL;
            }
            if(result[i].name.match(/moveToPurchaseInfoErrorURL/) && !result[i].name.match(/^_D/)) {
                result[i].value = giftItemInOrderErrorURL;
            }
        }

        trAjax.postTrJsonData($giftForm, result, success, errorCallback);
    }

    AjaxCart.postSignInForm = function (successCallback, errorCallback) {
        if (trJsonData.isGuest == "true") {
            var $form = $(".checkout_sign_in_form");
            var signInRedirect = function (data) {
                if (data.loginSuccess) {
//                    TODO: AjaxCart.moveToPurchase(redirectToCheckout, errorCallback);
                    if (trJsonData.shoppingBag.items.length > 0) {
                        redirectSignInToCheckout();
                    }
                    else {
                        window.location = trJsonData.emptyBagURL;
                    }
                }
                else {
                    successCallback(data);
                }
            };
            trAjax.post($form, $form.serializeArray(), signInRedirect, errorCallback);
        }
        else {
            AjaxCart.moveToPurchase(redirectToCheckout, errorCallback);
        }
    }

    function _mergeFormData(formData, formDataOverwrite) {

        formDataOverwrite.forEach(function(el){
            formData.push(el);
        });
        return formData;
    }
})();
