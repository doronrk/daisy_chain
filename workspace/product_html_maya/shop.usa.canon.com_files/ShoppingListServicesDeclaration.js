wc.service.declare({id:"ShoppingListServiceCreate",actionId:"ShoppingListServiceCreate",url:"AjaxGiftListServiceCreate",formId:"",successHandler:function(serviceResponse){cursor_clear();closeAllDialogs();dojo.topic.publish("ShoppingList_Changed",{listId:serviceResponse.giftListId[0],listName:serviceResponse.giftListName[0],action:"add"});},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage);}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);}}cursor_clear();}}),wc.service.declare({id:"ShoppingListServiceUpdate",actionId:"ShoppingListServiceUpdate",url:"AjaxGiftListServiceUpdateDescription",formId:"",successHandler:function(serviceResponse){cursor_clear();closeAllDialogs();shoppingListJS.showMessageDialog(storeNLS["LIST_EDITED"]);dojo.topic.publish("ShoppingList_Changed",{listId:serviceResponse.giftListId[0],listName:serviceResponse.giftListName[0],action:"edit"});},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage);}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);}}cursor_clear();}}),wc.service.declare({id:"ShoppingListServiceDelete",actionId:"ShoppingListServiceDelete",url:"AjaxGiftListServiceDeleteGiftList",formId:"",successHandler:function(serviceResponse){cursor_clear();closeAllDialogs();shoppingListJS.showMessageDialog(storeNLS["LIST_DELETED"]);dojo.topic.publish("ShoppingList_Changed",{listId:serviceResponse.giftListId[0],listName:"",action:"delete"});},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage);}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);}}cursor_clear();}}),wc.service.declare({id:"ShoppingListServiceAddItem",actionId:"ShoppingListServiceAddItem",url:"AjaxGiftListServiceAddItem",formId:"",successHandler:function(serviceResponse){cursor_clear();dojo.topic.publish("ShoppingListItem_Added");},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage);}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);}}cursor_clear();}}),wc.service.declare({id:"ShoppingListServiceRemoveItem",actionId:"ShoppingListServiceRemoveItem",url:"AjaxGiftListServiceUpdateItem",formId:"",successHandler:function(serviceResponse){cursor_clear();MessageHelper.hideAndClearMessage();dojo.topic.publish("ShoppingListItem_Removed");try{shoppingListJS.showMessageDialog(storeNLS["ITEM_REMOVED"]);}catch(e){console.debug(e);}},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage);}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);}}cursor_clear();}}),wc.service.declare({id:"ShoppingListServiceAddItemAndRemoveFromCart",actionId:"ShoppingListServiceAddItemAndRemoveFromCart",url:"AjaxGiftListServiceAddItem",formId:"",successHandler:function(serviceResponse){cursor_clear();dojo.topic.publish("ShoppingListItem_Added");},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage);}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);}}cursor_clear();}}),wc.service.declare({id:"AjaxGiftListServiceChangeGiftListStatus",actionId:"AjaxGiftListServiceChangeGiftListStatus",url:"AjaxGiftListServiceChangeGiftListStatus",formId:"",successHandler:function(serviceResponse){cursor_clear();MessageHelper.hideAndClearMessage();MultipleWishLists.updateDefaultListName("multipleWishListButton",serviceResponse.giftListName);MultipleWishLists.updateDefaultListName("addToMultipleWishListLink",serviceResponse.giftListName);MultipleWishLists.setDefaultListId(serviceResponse.giftListId);MultipleWishLists.updateContextPostSwitch(serviceResponse.giftListId);},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage);}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);}}cursor_clear();}}),wc.service.declare({id:"AjaxGiftListAnnouncement",actionId:"AjaxGiftListAnnouncement",url:getAbsoluteURL()+"AjaxGiftListServiceAnnounceGiftList",formId:"",successHandler:function(serviceResponse){cursor_clear();MessageHelper.hideAndClearMessage();shoppingListJS.showMessageDialog(storeNLS["WISHLIST_EMAIL_SENT"]);},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage);}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);}}cursor_clear();}});