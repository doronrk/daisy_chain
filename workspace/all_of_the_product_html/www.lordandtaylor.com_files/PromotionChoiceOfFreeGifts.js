//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2009 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This javascript provides the variables and methods used on the PromotionChoiceOfFreeGiftsPopup.jspf
 * to allow the user to select a free gift of their choice when this promotion applies to the order.
 * @version 1.5
 */

	dojo.require("dojo.dnd.move");
	dojo.require("dijit.Dialog");
	
	/** The variable stores the Promotion choice of free gift pop-up window. */
	var m1;
	var initPopup = function(){
		m1 = new dojo.dnd.Moveable("free_gifts_popup", {handle: "popupHeader"});
	};	
	dojo.addOnLoad(initPopup);

	PromotionChoiceOfFreeGiftsJS={
	
	/* Global variable declarations */		
	
	/** 
	 * This variable is used to keep track of the enable or disable status of the Apply button in the pop-up.
	 * @private
	 */			
	disableApplyButton:false,
	
	skipPWP:true,
	
  /**
   * This function is used to update the free gift choices for a promotion, made by the user, during order check-out.
   * If the 'AjaxCheckout' feature is enabled, then the <code>AjaxUpdateRewardOption</code> service is invoked. For the case 
   * where the 'AjaxCheckout' feature is disabled, the form identified by the <code>formName</code> parameter is submitted.
   * 
   * @param {String} formName: The name of the reward choices form.
   * @param {Integer} maximumNumberOfItems: The maximum number of gift selections that the user can make. 
   * @param {Integer} rewardOptionId: The ID of the RewardOption object used to add the reward choices data to. 
   */	  
   updateRewardChoices:function(formName, maximumNumberOfItems, rewardOptionId){
		if(this.disableApplyButton){
			return false;
		}
		if(CheckoutHelperJS.isAjaxCheckOut()){
			var params = [];
			var catEntryId = [];
			var quantity = [];	
			var j = 0;
			var count = 0;
			var eligibleGWPQuant= document.getElementById("eligibleFreeGifts").value;
			params.orderId = ".";		
			params["rewardOptionId"] = rewardOptionId;	
			params["calculationUsage"] = "-1,-2,-3,-4,-5,-6,-7";
			params["allocate"] = "***";
			params["backorder"] = "***";			
			//add the catalog entry ID and quantity of each gift item selection. 
			for(var i = 0; i < maximumNumberOfItems; i++){
				if(!document.getElementById("no_gifts").checked){
					if(document.getElementById("SelectFreeGift_" + (i+1)).checked){
						catEntryId[j] = document.getElementById("CatalogEntryID_" + (i+1)).value;
						quantity[j] = document.getElementById("GiftItemQuantity_" + (i+1)).value;
						j++;
						count = count + 1;
					}
				}
			}
			
			if(parseInt(eligibleGWPQuant)!= parseInt(count)){
				var selectionsMadeMsg = MessageHelper.messages["PROMOTION_FREE_GIFTS_POPUP_SELECT_REMAINING_GWPS"];
				var uncheckedGWPcount = parseInt(eligibleGWPQuant) - parseInt(count) ;
				selectionsMadeMsg = selectionsMadeMsg.replace(/%0/, uncheckedGWPcount);
				if(document.getElementById('message')!= null){
					document.getElementById('message').className = "error_msg_pop";
					document.getElementById('message').innerHTML = selectionsMadeMsg;
				}
				return false;
			}
			
			params["catEntryId"] = catEntryId;
			params["quantity"] = quantity;
			
			//For handling multiple clicks
			if(!submitRequest()){
				return;
			}              
			cursor_wait();	
			wc.service.invoke("AjaxUpdateRewardOption", params);
			//hide the pop-up after the service has been invoked after some delay.
			setTimeout(dojo.hitch(this,"hidePopup",'free_gifts_popup'),200);
			dijit.byId('free_gifts_popup').hide();
    	}
    	else
		{
    		//Invoke Web 1.0 server call by submitting the reward choices form. 
    		var form = document.getElementById(formName);    	       
            for(var i = 0; i < maximumNumberOfItems; i++){
            	if(!document.getElementById("no_gifts").checked){
    				if(document.getElementById("SelectFreeGift_" + (i+1)).checked){
    					//create an input element for each catalog entry ID and its quantity.
    					var input1 = document.createElement("input");
    					input1.setAttribute("id", formName + "_catEntryId_" + i);
    					input1.setAttribute("type", "hidden");
    					input1.setAttribute("name", "catEntryId");
    					input1.setAttribute("value", document.getElementById("CatalogEntryID_" + (i+1)).value);					
    					form.appendChild(input1);
    					var input2 = document.createElement("input");
    					input2.setAttribute("id", formName + "_quantity_" + i);
    					input2.setAttribute("type", "hidden");
    					input2.setAttribute("name", "quantity");
    					input2.setAttribute("value", document.getElementById("GiftItemQuantity_" + (i+1)).value);					
    					form.appendChild(input2);
    				}
            	}        	
           	}
            //submit the form
            submitSpecifiedForm(form);     		
		}
	}, 	
	
	/**
	 * This function is used to display a message of the total number of gift
	 * item selections made by the shopper. It also displays an error message
	 * when the user selects more gift items than the maximum number of gift
	 * items that are allowed for the promotion.
	 * 
	 * @param {Integer}
	 *            maximumNumberOfItems The maximum number of gift items that are
	 *            allowed as part of the promotion.
	 */
	checkNumberOfAllowedItems:function(maximumNumberOfItems,typeOfReward){
		var i = 1;
		var numberOfSelectionsMade = 0;
		this.disableApplyButton = false;
		while(document.getElementById("SelectFreeGift_" + i)){
			if(document.getElementById("SelectFreeGift_" + i).checked){
				numberOfSelectionsMade++;
			}
			i++;
		}		
		if(numberOfSelectionsMade > maximumNumberOfItems){
			//display an error message warning the shopper about exceeding the maximum number of gift item selections
			if(document.getElementById('message')!= null){
				document.getElementById('message').className = "error";
				if(typeOfReward == "PurchasableGift"){
					document.getElementById('message').innerHTML = MessageHelper.messages["PROMOTION_PURCHASABLE_GIFTS_POPUP_ERROR_EXCEED_GIFT_QUANTITY"];
				}
				else{
					document.getElementById('message').innerHTML = MessageHelper.messages["PROMOTION_FREE_GIFTS_POPUP_ERROR_EXCEED_GIFT_QUANTITY"];
				}
			}	
			this.disableApplyButton = true;	
		} else if(numberOfSelectionsMade > 0){
			//display a message indicating the number of gift item selections made by the shopper
			if(numberOfSelectionsMade == 1){
				if(typeOfReward == "PurchasableGift"){
					var selectionsMadeMsg = MessageHelper.messages["PROMOTION_PURCHASABLE_GIFTS_POPUP_NUMBER_OF_SELECTIONS_ONE"];
				}
				else{
					var selectionsMadeMsg = MessageHelper.messages["PROMOTION_FREE_GIFTS_POPUP_NUMBER_OF_SELECTIONS_ONE"];
				}
				
			} else {
				if(typeOfReward == "PurchasableGift"){
					var selectionsMadeMsg = MessageHelper.messages["PROMOTION_PURCHASABLE_GIFTS_POPUP_NUMBER_OF_SELECTIONS"];
					selectionsMadeMsg = selectionsMadeMsg.replace(/%0/, numberOfSelectionsMade);
				}
				else{
					var selectionsMadeMsg = MessageHelper.messages["PROMOTION_FREE_GIFTS_POPUP_NUMBER_OF_SELECTIONS"];
					selectionsMadeMsg = selectionsMadeMsg.replace(/%0/, numberOfSelectionsMade);
				}
				
			}	
			if(document.getElementById('message')!= null){
				document.getElementById('message').className = "status_message";
				document.getElementById('message').innerHTML = selectionsMadeMsg;
			}	
		} else if(numberOfSelectionsMade == 0){
			//checking that the element exists because when the promotion is inactive,
			//this element does not exist in the jsp.
						
			if(document.getElementById('message')!= null){
				if(typeOfReward == "PurchasableGift"){
					var selectionsMadeMsg = MessageHelper.messages["PROMOTION_PURCHASABLE_GIFTS_POPUP_NUMBER_OF_SELECTIONS_NONE"];
				}
				else{
					var selectionsMadeMsg = MessageHelper.messages["PROMOTION_FREE_GIFTS_POPUP_NUMBER_OF_SELECTIONS_NONE"];
				}
				document.getElementById('message').className = "error_msg_pop";
				document.getElementById('message').innerHTML = selectionsMadeMsg;
			}		
			this.disableApplyButton = true;			
		}
	},
	
	/**
	 * If the user has selected the option to not receive any free gifts as part
	 * of the promotion, then the gift item choices are cleared and disabled for
	 * selection.
	 */
	rewardChoicesEnabledStatus:function(){
		var i = 1; 
		
		if(document.getElementById("no_gifts").checked){
			this.disableApplyButton = false;
			if(document.getElementById('message')!= null){
				document.getElementById('message').innerHTML = "&nbsp;";
			}	
			while(document.getElementById("SelectFreeGift_" + i)){
				document.getElementById("SelectFreeGift_" + i).checked = false;
				document.getElementById("SelectFreeGift_" + i).disabled = true;
				i++;
			}
		} else {
			while(document.getElementById("SelectFreeGift_" + i)){
				document.getElementById("SelectFreeGift_" + i).disabled = false;
				i++;				
			}
			this.checkNumberOfAllowedItems();
			this.checkFreeGiftsAvailability();
		}		
	},
	
	/**
	 * This function is used to make the free gift choices pop-up visible to the user. 
	 */
	showFreeGiftsDialog: function(maximumNumberOfItems,typeOfReward){	
		this.checkNumberOfAllowedItems(maximumNumberOfItems,typeOfReward);
		dijit.byId('free_gifts_popup').closeButtonNode.style.display='none';
		if(!PromotionChoiceOfFreeGiftsJS.skipPWP || typeOfReward != 'PurchasableGift'){
			dijit.byId('free_gifts_popup').show();		
			this.checkFreeGiftsAvailability();
		}else
		{
			wc.render.getRefreshControllerById("PromotionFreeGifts_Controller").skipOffer();
		}
	},
	
	/**
	 * This function is used to disable any free gifts that are not available.
	 */	
	checkFreeGiftsAvailability: function(){
		var i = 1;
		var numberOfAvailableGifts = 0;
		
		while(document.getElementById("OnlineAvailability_" + i)){
			if(document.getElementById("OnlineAvailability_" + i).value != "Available" && document.getElementById("OnlineAvailability_" + i).value != "Backorderable"){
				document.getElementById("SelectFreeGift_" + i).checked = false;
				document.getElementById("SelectFreeGift_" + i).disabled = true;
			} else {
				numberOfAvailableGifts++;
			}
			i++;
		}
		
		if(numberOfAvailableGifts == 0){
			this.disableApplyButton = true;
		}
			
	},
	
	/**
	 * On pressing the Tab key from the Cancel button, the focus is transferred
	 * to the Close button. On pressing the Shift+Tab keys from the Cancel
	 * button, the focus is transferred to the Apply button.
	 * 
	 * @param {Object} event: The event object.
	 */
	focusfromCancel:function(event){
		if(event.keyCode == dojo.keys.TAB){
			document.getElementById('promotionChoice_closeLink').focus();			
		}
		if(event.shiftKey && event.keyCode == dojo.keys.TAB){			
			document.getElementById('submitChoices').focus();
			dojo.stopEvent(event);
		}
	},
		
	/**
	 * On pressing the Shift+Tab keys, the focus is transferred from the Close
	 * button to the last focusable element present in the "Free gift Choices"
	 * pop-up, which is the Cancel button.
	 * 
	 * @param {Object} event: The event object.
	 */
	setFocusToCancel:function(event){
		if(event.shiftKey && event.keyCode == dojo.keys.TAB)
		{
			document.getElementById('cancel').focus();
			dojo.stopEvent(event);
		}
	}, 
	
	
	setSkipPWPParam:function(){
		PromotionChoiceOfFreeGiftsJS.skipPWP = false;
	},
	/**
	 * Hide the pop-up identified by the passed id parameter. 
	 * 
	 * @param {String} id: The id of the pop-up to hide.
	 * @param {Object} event: The event object.
	 */
	hideFreeGiftsPopup:function(id,event){
		if(event!=null && event.type=="keypress" && event.keyCode!="27"){
			return;
		} else {		
			var popUp = dijit.byId(id);
			if(popUp != null){
				popUp.hide();
			}
		}
		wc.render.getRefreshControllerById("PromotionFreeGifts_Controller").skipOffer();
	}
	
}	