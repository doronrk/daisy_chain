if(AccountWishListDisplay==null||typeof(AccountWishListDisplay)!="object"){var AccountWishListDisplay=new Object()}AccountWishListDisplay={ajaxMyAccountEnabled:true,contextChanged:false,isHistory:false,initHistory:function(elementId,changeUrl){var historyObject=new AccountWishListDisplay.HistoryTracker(elementId,changeUrl);dojo.back.setInitialState(historyObject)},checkEmailForm:function(formId){var form=document.getElementById(formId);var weValid=$(form).valid();if(this.getAjaxVar()&&weValid){cursor_wait();$.ajax({url:getAbsoluteURL()+"SendEmailCmd",data:$(form).serialize(),dataType:"json",type:"post",complete:function(response){try{var responseData=$.parseJSON(response.responseText);if(responseData.success=="true"){if($("#promotion-modal").length!=0){$("#promotion-modal").dialog("close");MessageHelper.displayStatusMessage(MessageHelper.messages.WISHLIST_MAIL_SUCCESS)}if($("#wishlist-modal").length!=0){$("#mask , .login-popup").plainModal("close");$("#mask , .login-popup").fadeOut(300,function(){$("#mask").remove()})}}else{if(responseData.errorMessage){MessageHelper.displayErrorMessage(responseData.errorMessage)}else{if(responseData.errorMessageKey){MessageHelper.displayErrorMessage(responseData.errorMessageKey)}}}}catch(err){MessageHelper.displayErrorMessage(constants.error.ajax)}}})}else{if(weValid){form.submit()}else{return false}}},setAjaxVar:function(val){this.ajaxMyAccountEnabled=val},getAjaxVar:function(){return(this.ajaxMyAccountEnabled)},deleteInterestItem:function(params,controllerURL){if(controllerURL!=null&&controllerURL!="undefined"){CommonControllersDeclarationJS.setControllerURL("WishlistDisplay_Controller",controllerURL)}if(!submitRequest()){return}cursor_wait();wc.service.invoke("InterestItemDelete",params)},subtractInterestItem:function(){var itemCount=dojo.query('[id^="baseContent_wishList"]').length;if(itemCount>0){itemCount-=1}$(".wishlist-link .wishURL .count").text(itemCount);setWishListCount(itemCount);return true},clearWishListEmailForm:function(formId){var form=document.getElementById(formId);form.recipient.value="";form.sender_name.value="";form.sender_email.value="";form.wishlist_message.value=""},loadContentURL:function(contentURL){if(!submitRequest()){return}cursor_wait();CommonControllersDeclarationJS.setControllerURL("WishlistDisplay_Controller",contentURL);wc.render.updateContext("WishlistDisplay_Context")},goBack:function(){AccountWishListDisplay.loadContentURL(this.historyUrl);AccountWishListDisplay.isHistory=true},goForward:function(){AccountWishListDisplay.loadContentURL(this.historyUrl);isHistory=true},HistoryTracker:function(elementId,changeUrl,historyUrl){this.elementId=elementId;this.changeUrl=changeUrl;this.historyUrl=historyUrl},processBookmarkURL:function(){var bookmarkId=location.hash;if(bookmarkId){bookmarkId=bookmarkId.substring(1,bookmarkId.length)}if(bookmarkId){var indexOfIdentifier=bookmarkId.indexOf("identifier",0);if(indexOfIdentifier>=0){var realUrl=bookmarkId.substring(0,indexOfIdentifier-1)}}}};AccountWishListDisplay.HistoryTracker.prototype.back=AccountWishListDisplay.goBack;AccountWishListDisplay.HistoryTracker.prototype.forward=AccountWishListDisplay.goForward;