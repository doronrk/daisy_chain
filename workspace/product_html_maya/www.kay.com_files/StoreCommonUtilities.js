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
 * @fileOverview This file provides the common functions which are specific to the Madisons store.
 * This JavaScript file is used by StoreCommonUtilities.jspf.
 */

//Import the required Dojo libraries
dojo.registerModulePath("wc", "../wc");
	
dojo.require("wc.service.common");
dojo.require("dojo.io.iframe");
dojo.require("dojo.io.script");

//Reloads widgets when parts of the page has been re-loaded from server
dojo.require("dojo.parser");

//Category menu support
dojo.require("dijit.form.Button");
dojo.require("wc.widget.WCMenu");
dojo.require("wc.widget.WCDialog");
dojo.require("wc.widget.ScrollablePane");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");	
dojo.require("dijit.Tooltip");
dojo.require("wc.widget.WCDropDownButton");
dojo.require("dijit.Dialog");
dojo.require("dojo.dnd.Source");
dojo.require("dojo.currency");
dojo.require("dijit.Tree");
dojo.require("dojo.back");
dojo.require("dijit.form.DateTextBox");
dojo.require("wc.widget.RefreshArea");
dojo.require("wc.render.RefreshController");
dojo.require("wc.render.Context");
dojo.require("dojo.cookie");



/** This variable indicates whether the dropdown is shown or not. */
var showDropdown = false;

/** This variable indicates whether the dropdown is shown or not. */
var showDropdown_RV = false;

/** This variable indicates whether the wishlist dropdown is shown or not. */
var showDropdown_WL = false;


/** This variable stores the current dropdown dialog element. */
var dropDownDlg = null;

/** This variable stores the current dropdown dialog element. */
var dropDownDlg_RV = null;

/** This variable stores the current wishlist dropdown dialog element. */
var dropDownDlg_WL = null;

/** This variable indicates whether the browser used is Internet Explorer or not. */
var isIE = (document.all) ? true : false;

/** Initializes the variable to false. **/
	var correctBrowser = false;

/** 
 * This variable indicates whether a request has been submitted or not.
 * The value is initialized to true and resets to false on full page load.
 */
var requestSubmitted = true;

/** 
 * This variable stores the id of the element (ex: button/link) which the user clicked.
 * This id is set when the user clicks an element which triggers an Ajax request.
 */
var currentId = "";


/** 
 * This variable controls the timer handler before triggering the autoSuggest.  If the user types fast, intermittent requests will be cancelled.
 * The value is initialized to -1.
 */
var autoSuggestTimer = -1;

/** 
 * This variable controls the delay of the timer in milliseconds between the keystrokes before firing the search request.
 * The value is initialized to 250.
 */
var autoSuggestKeystrokeDelay = 250;

/** 
 * This variable indicates whether or not the user is hovering over the autoSuggest results popup display.
 * The value is initialized to false.
 */
var autoSuggestHover = false;

/** 
 * This variable stores the old search term used in the auto suggest search box
 * The value is initialized to empty string.
 */
var autoSuggestPreviousTerm = "";

/** 
 * This variable stores the URL of currently selected static autosuggest recommendation
 * The value is initialized to empty string.
 */
var autoSuggestURL = "";

/** 
 * This variable stores the index of the selected auto suggestion item when using up/down arrow keys.
 * The value is initialized to -1.
 */
var autoSelectOption = -1;

/** 
 * This variable stores the index offset of the first previous history term
 * The value is initialized to -1.
 */
var historyIndex = -1;

/** 
 * This variable indicates whether a the cached suggestions have been retrieved.
 * The value is initialized to false.
 */
var retrievedCachedSuggestions = false;

/** 
 * This variable sets the total number of static autosuggest recommendations used for each static category/grouping.
 * The value is initialized to 4.
 */
var TOTAL_SUGGESTED = 4;

/** 
 * This variable sets the total number of previous search history terms.
 * The value is initialized to 2.
 */
var TOTAL_HISTORY = 2;

/** 
 * This variable controls when to trigger the auto suggest box.  The number of characters greater than this threshold will trigger the auto suggest functionality.
 * The static/cached auto suggest will be performed if this threshold is exceeded.
 * The value is initialized to 1.
 */
var AUTOSUGGEST_THRESHOLD = 1;

/** 
 * This variable controls when to trigger the dynamic auto suggest.  The number of characters greater than this threshold will trigger the request for keyword search.
 * The static/cached auto suggest will be be displayed if the characters exceed the above config parameter, but exceeding this threshold will additionally perform the dynamic search to add to the results in the static/cached results.
 * This value should be greater or equal than the AUTOSUGGEST_THRESHOLD, as the dynamic autosuggest is secondary to the static/cached auto suggest.
 * The value is initialized to 1.
 */
var DYNAMIC_AUTOSUGGEST_THRESHOLD = 2;

/** 
 * This variable is an internal constant used in the element ID's generated in the autosuggest content.
 * The value is initialized to 1000.
 */
var CACHED_AUTOSUGGEST_OFFSET = 1000;

/**
 * Debugging
 */
var storeCommonUtilitiesDebug=false;
function enter(method) {
	if (storeCommonUtilitiesDebug) console.debug(method + " enter");
}
function exit(method) {
	if (storeCommonUtilitiesDebug) console.debug(method + " exit");
}
function debug(method, sequence, message) {
	if (storeCommonUtilitiesDebug) console.debug(method + " [" + sequence + "] " + message);
}

/** 
 * Sends back focus to the first focusable element on tabbing from the last focusable element.
 */
function focusSetter() {  
	enter("focusSetter");
	if(dojo.byId("MiniCartFocusReceiver1")){
	
		dojo.byId("MiniCartFocusReceiver1").focus();
		} 
	else if(dojo.byId("RecentlyViewedFocusReceiver1")){
	
		dojo.byId("RecentlyViewedFocusReceiver1").focus();
	}
	else if(dojo.byId("MiniWishListFocusReceiver1")){
	
		dojo.byId("MiniWishListFocusReceiver1").focus();
	}
	else if(dojo.byId("MiniWishListFocusReceiver2")){
	
		dojo.byId("MiniWishListFocusReceiver2").focus();
	}
	else if(dojo.byId("MiniCartFocusReceiver2")){
		dojo.byId("MiniCartFocusReceiver2").focus();
	}
	exit("focusSetter");
}

/** 
 * Sends back focus to the last focusable element on reverse tabbing from the first focusable element.
 * 
 * @param {object} event The event triggered from user actions
 */
function determineFocus(event) {
	enter("determineFocus");
		if(event.shiftKey && event.keyCode == dojo.keys.TAB)
		{
			if(event.srcElement)
			{
				if(event.srcElement.id=="MiniCartFocusReceiver1")
				{
					if(dojo.byId("WC_MiniShopCartDisplay_link_5"))
					{
						dojo.byId("WC_MiniShopCartDisplay_link_5").focus();
					}
					dojo.stopEvent(event);
				}
				else if(event.srcElement.id=="MiniCartFocusReceiver2")
				{
					dojo.byId("MiniCartFocusReceiver2").focus();
					dojo.stopEvent(event);
				}	
				else if(event.srcElement.id=="MiniWishListFocusReceiver1")
				{
					if(dojo.byId("WC_MiniWishListDisplay_link_5"))
					{
						dojo.byId("WC_MiniWishListDisplay_link_5").focus();
					}
					dojo.stopEvent(event);
				}
				else if(event.srcElement.id=="MiniWishListFocusReceiver2")
				{
					dojo.byId("MiniWishListFocusReceiver2").focus();
					dojo.stopEvent(event);
				}

				
				if(event.srcElement.id=="RecentlyViewedFocusReceiver1")
				{
					if(dojo.byId("WC_MiniShopCartDisplay_link_5"))
					{
						dojo.byId("WC_MiniShopCartDisplay_link_5").focus();
					}
					
					dojo.stopEvent(event);
				}
				else if(event.srcElement.id=="RecentlyViewedFocusReceiver2")
				{
					dojo.byId("RecentlyViewedFocusReceiver2").focus();
					dojo.stopEvent(event);
				}
				
			}
			else
			{
				if(event.target.id=="MiniCartFocusReceiver1")
				{
					if(dojo.byId("WC_MiniShopCartDisplay_link_5"))
					{
						dojo.byId("WC_MiniShopCartDisplay_link_5").focus();
					}
					dojo.stopEvent(event);
				}
				else if(event.target.id=="MiniCartFocusReceiver2")
				{
					dojo.byId("MiniCartFocusReceiver2").focus();
					dojo.stopEvent(event);
				}
				else if(event.target.id=="MiniWishListFocusReceiver1")
				{
					if(dojo.byId("WC_MiniWishListDisplay_link_5"))
					{
						dojo.byId("WC_MiniWishListDisplay_link_5").focus();
					}
					dojo.stopEvent(event);
				}
				else if(event.target.id=="MiniWishListFocusReceiver2")
				{
					dojo.byId("MiniWishListFocusReceiver2").focus();
					dojo.stopEvent(event);
				}
				
			}
		}
	exit("determineFocus");
}

/**
 * Destroys the existing dialogs with outdated data.
 */
function destroyDialog(){
	enter("destroyDialog");
	//If data has changed, then we should destroy the quick_cart_container dialog and recreate it with latest data
	
	dojo.query('.dijitDialog', document).forEach(function(tag) {
		if (dijit.byNode(tag).id == 'quick_cart_container' ) 
			dijit.byNode(tag).destroyRecursive();// or dijit.getEnclosingWidget(tag).destroyRecursive();
	});
	dropDownDlg = null;
	exit("destroyDialog");
}

function destroyWishListDialog(){
	enter("destroyWishListDialog");
	//If data has changed, then we should destroy the quick_cart_container dialog and recreate it with latest data
	
	dojo.query('.dijitDialog', document).forEach(function(tag) {
		if (dijit.byNode(tag).id == 'quick_wishlist_container') 
			dijit.byNode(tag).destroyRecursive();// or dijit.getEnclosingWidget(tag).destroyRecursive();
	 });
	dropDownDlg_WL = null;
	exit("destroyWishListDialog");
}

/**
 * 
 * @author Seth Jackson
 * @param relativeId
 * @param contentId
 * @param contentType
 * @return
 * 
 * ECOMDEV-369 03/27/2013 Seth Jackson - Updated to refresh modal using showMiniShopCartDropDrown
 * ECOMDEV-369 08/27/2013 Seth Jackson - Updated to add showDropdown_SC
 */
function miniShopCartWrapper(relativeId, contentId, contentType, showDropdown_SC) {
	enter("miniShopCartWrapper");
	displayProgressBar();
	var sId = "";
	var cId = "";
	var lId = "";
	
	// This is for backward compatibility, in the event the GlobalParamJS doesn't exist
	if (sId == null || sId == "") sId = "10101";
	if (cId == null || cId == "") cId = "10001";
	if (lId == null || lId == "") lId = "-1";
	
	var shopCartUrl = window.location.protocol + "//" + window.location.host + "/Kay/include/MiniShopCartDisplay.jsp?";
	shopCartUrl += "storeId=" + sId;
	shopCartUrl += "&catalogId=" + cId;
	shopCartUrl += "&langId=" + lId;

	// Hide the initial anchor on top1 so that the AJAX anchor can replace it with the updated order count  
	debug(shopCartUrl);

	dojo.xhrPost({
        url: shopCartUrl,
        service: this,
        load: function(data, ioArgs) {
			debug("miniShopCartWrapper","20",data);
			$('#MiniShopCartContainer').html(data);
			
			// Update the shop cart text with the new order item count from the AJAX response
			$('#miniShopCartBody').html($('#miniShopCartBody2').html());
			
			if ((typeof showDropdown_SC == "undefined") ||
					(typeof showDropdown_SC !== "undefined" && showDropdown_SC)) {
				showMiniShopCartDropDown(relativeId, contentId, contentType);
			}
			cursor_clear();
		},
        error: function(errObj, ioArgs) {
			debug(errObj);
			cursor_clear();
        }
	});
	exit("miniShopCartWrapper");
}

/**
 * Displays the dropdown content of the mini shopping cart when keyboard keys are used to expand/collapse the dropdown.
 *
 * @param {object} event The event to retrieve the input keyboard key
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniShopCartDropDown1(event,relativeId,contentId,contentType){
	enter("showMiniShopCartDropDown1");
	if(event.keyCode == dojo.keys.DOWN_ARROW){
		//03/27/2013 ECOMDEV-369
		miniShopCartWrapper(relativeId,contentId,contentType);
	}
	else if(event.shiftKey && event.keyCode == dojo.keys.ENTER){
		//03/27/2013 ECOMDEV-369
		miniShopCartWrapper(relativeId,contentId,contentType);
		dojo.stopEvent(event);
	}
	exit("showMiniShopCartDropDown1");
}

/**
 * Displays the dropdown content of the mini shopping cart when the user hovers over the 
 * mini shopping cart or uses keyboard keys to expand the dropdown.
 *
 * @param {object} event The event triggered from user actions
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniShopCartDropDown(relativeId,contentId,contentType){
	enter("showMiniShopCartDropDown");
	//Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
	var t = dojo.byId(relativeId);
	var c = dojo.coords(t,true);
	var x1 = c.x; 
	var y1 = menuHeight;
	
    /*By default, the content of the mini shop cart will be displayed immediately after the mini shop cart title.
     *But we want the content to display under the mini shop cart title. So we'll need to get the width
     *of the shop cart and then shift it*/
	var cartWidth =dojo.coords(dojo.byId('miniShopCartBody'),true).w;
	
	dojo.style(dojo.byId("quick_cart"), "width", '311px');
	
	/* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
	if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time before calling Dialog.show() method reset the (x,y) co-ordinates. 
	The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
	*/
    var dlgX=x1 + cartWidth - adjustedMenuWidth; //this value is good for ff3, IE8 & languages
    
    if (dojo.locale == 'iw-il' && dojo.isIE<7) {
        dlgX  = dojo.coords(dojo.byId('miniShopCartLeftCorner')).x;
    }else {
        dlgX =x1-adjustedMenuWidth+cartWidth;
    }
    
    if(dojo.isIE) {
    	dlgX -= 11;
    }

    if(dropDownDlg){
		dropDownDlg.y = y1;
		dropDownDlg.x = dlgX;
	}

	/* Dialog is not yet created..Create one */
	if(!dropDownDlg){
		var pane = document.getElementById(contentId);
		dropDownDlg = new wc.widget.WCDialog({relatedSource: relativeId, x:x1,y:y1},pane);
		dropDownDlg.x=dlgX;
	}

	if(dojo.isOpera!=0 && dojo.isOpera!=null)
	{
		dropDownDlg.x = dropDownDlg.x + window.pageXOffset;
		dropDownDlg.y = dropDownDlg.y + window.pageYOffset;
	}

	if(contentType == 'orderItemsList'){
		dojo.byId("MiniShopCartProductsList").style.display = "block";
		dojo.byId("MiniShopCartProductAdded").style.display = "none";
		//No timeout for when customer hovers on the Mini Cart in the header
		dropDownDlg.closeOnTimeOut = false;
		dropDownDlg.show();
	}
	else if(contentType == 'orderItemAdded'){
		dojo.byId("MiniShopCartProductsList").style.display = "none";
		dojo.byId("MiniShopCartProductAdded").style.display = "block";
		//This is used for fade in and out
		setTimeout(dojo.hitch(dropDownDlg,"show",null),5);
		setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
		setTimeout("clearActiveHeaders();",dropDownDlg.timeOut+5)
	}
	if(dojo.isIE < 7)
	{	
		document.getElementById("quick_cart_container").style.display = "block";
	}
	//setTimeout(dojo.hitch(dropDownDlg,"show",null),5);
	//setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
	// 03/27/2013 ECOMDEV-369 Seth Jackson - Changed DIV element to new container for the modal
	readyMenuToggle('MiniShopCartModal',dropDownDlg,'cart-modal');
	
	exit("showMiniShopCartDropDown");
}

function clearActiveHeaders(){
	enter("clearActiveHeaders");
	dojo.query('.util-nav .active, .util-nav .modal-active').forEach(function(node, index, arr){
		dojo.removeClass(node,"active");
		dojo.removeClass(node,"modal-active");
	});
	exit("clearActiveHeaders");
}
/**
 * Displays the dropdown content of the mini shopping cart when keyboard keys are used to expand/collapse the dropdown.
 *
 * @param {object} event The event to retrieve the input keyboard key
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniWishListDropDown1(event,relativeId,contentId,contentType){
	enter("showMiniWishListDropDown1");
	if(event.keyCode == dojo.keys.DOWN_ARROW){
		showMiniWishListDropDown(relativeId,contentId,contentType);
	}
	else if(event.shiftKey && event.keyCode == dojo.keys.ENTER){
		showMiniWishListDropDown(relativeId,contentId,contentType);
		dojo.stopEvent(event);
	}
	exit("showMiniWishListDropDown1");
}

/**
 * Displays the dropdown content of the mini shopping cart when the user hovers over the 
 * mini shopping cart or uses keyboard keys to expand the dropdown.
 *
 * @param {object} event The event triggered from user actions
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniWishListDropDown(relativeId,contentId,contentType){
	enter("showMiniWishListDropDown");
	//Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
	var t = dojo.byId(relativeId);
	var c = dojo.coords(t,true);
	var x1 = c.x; 
	var y1 = menuHeight;
	
    /*By default, the content of the mini wish list will be displayed immediately after the mini wish list title.
     *But we want the content to display under the mini wish list title. So we'll need to get the width
     *of the wish list and then shift it*/
	var cartWidth =dojo.coords(dojo.byId('miniWishListBody'),true).w;

	/*
	if(dojo.isIE == 8){			
		cartWidth = dojo.coords(dojo.byId('outerWishListContainer'),true).w
	}else if (dojo.isIE>=7 && dojo.isIE<8) {
		cartWidth =dojo.coords(dojo.byId('miniWishListBody'),true).w;
	}else if(dojo.isIE < 7){
		cartWidth = originalMiniWishListWidth;
		if(dojo.locale == 'iw-il' || dojo.locale=='ar-eg'){
			cartWidth = dojo.coords(dojo.byId('outerWishListContainer'),true).w
		}
	}
	*/
	dojo.style(dojo.byId("quick_wishlist"), "width", '311px');
	
	/* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
		if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time
		before calling Dialog.show() method reset the (x,y) co-ordinates. 
		The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
	*/
    var dlgX=x1-adjustedMenuWidth+cartWidth; //this value is good for ff3, IE8 & languages
    
    
    if (dojo.locale == 'iw-il' && dojo.isIE<7) {
        dlgX  = dojo.coords(dojo.byId('miniShopCartLeftCorner')).x;
    }else {
        dlgX =x1-adjustedMenuWidth+cartWidth;
    }
    
    if(dojo.isIE) {
    	dlgX -= 11;
    }
    
	if(dropDownDlg_WL){
			dropDownDlg_WL.y = y1;
			dropDownDlg_WL.x = dlgX;
	}

	/* Dialog is not yet created..Create one */
	if(!dropDownDlg_WL){
		var pane = document.getElementById(contentId);
		dropDownDlg_WL = new wc.widget.WCDialog({relatedSource: relativeId, x:x1,y:y1},pane);
		dropDownDlg_WL.x=dlgX;
	}

	if(dojo.isOpera!=0 && dojo.isOpera!=null)
	{
		dropDownDlg_WL.x = dropDownDlg_WL.x + window.pageXOffset;
		dropDownDlg_WL.y = dropDownDlg_WL.y + window.pageYOffset;
	}

	if(contentType == 'itemsList'){
		if(dojo.byId('MiniWishListProductsList') != undefined) {
			dojo.byId("MiniWishListProductsList").style.display = "block";
			dojo.byId("MiniWishListProductAdded").style.display = "none";
			dropDownDlg_WL.closeOnTimeOut = false;
			dropDownDlg_WL.show();
		}

	}
	else if(contentType == 'itemAdded'){
		dojo.byId("MiniWishListProductsList").style.display = "none";
		dojo.byId("MiniWishListProductAdded").style.display = "block";
		setTimeout(dojo.hitch(dropDownDlg_WL,"show",null),5);
		setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
		
	}
	if(dojo.isIE < 7)
	{	
		document.getElementById("quick_wishlist_container").style.display = "block";
	}
	
	readyMenuToggle('MiniWishList',dropDownDlg_WL,'wishlist-modal');
	exit("showMiniWishListDropDown");
}


function showRecentlyViewedDropDown1(event,relativeId,contentId,contentType){
	enter("showRecentlyViewedDropDown1");
	if(event.keyCode == dojo.keys.DOWN_ARROW){
		showRecentlyViewedDropDown(relativeId,contentId,contentType);
	}
	else if(event.shiftKey && event.keyCode == dojo.keys.ENTER){
		showRecentlyViewedDropDown(relativeId,contentId,contentType);
		dojo.stopEvent(event);
	}
	exit("showRecentlyViewedDropDown1");
}

/**
 * Displays the dropdown content of the recently viewed when the user hovers over the 
 * recently viewed container or uses keyboard keys to expand the dropdown.
 *
 * @param {object} event The event triggered from user actions
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showRecentlyViewedDropDown(relativeId,contentId,contentType){
	enter("showRecentlyViewedDropDown");
	//Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
	var t = dojo.byId(relativeId);
	var c = dojo.coords(t,true);
	var x1 = c.x; 
	var y1 = c.y;
	

	var cartWidth =dojo.coords(dojo.byId('recentlyViewedBody'),true).w;

	dojo.style(dojo.byId("recently_viewed"), "width", cartWidth+'px');
	
	
	/* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
	if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time before calling Dialog.show() method reset the (x,y) co-ordinates. 
	The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
	*/

    var dlgX;
    if (dojo.locale == 'iw-il' && dojo.isIE<7) {
        dlgX  = dojo.coords(dojo.byId('recentlyViewedLeftCorner')).x;
    }else {
        dlgX =x1 +dojo.contentBox(dojo.byId(relativeId)).w-cartWidth;
    }
	if(dropDownDlg_RV){
			dropDownDlg_RV.y = y1;
			dropDownDlg_RV.x = dlgX;
	}



	/* Dialog is not yet created..Create one */
	if(!dropDownDlg_RV){
		var pane = document.getElementById(contentId);
		dropDownDlg_RV = new wc.widget.WCDialog({relatedSource: relativeId, x:x1,y:y1},pane);
		dropDownDlg_RV.x=dlgX;
	}

	if(dojo.isOpera!=0 && dojo.isOpera!=null)
	{
		dropDownDlg_RV.x = dropDownDlg_RV.x + window.pageXOffset;
		dropDownDlg_RV.y = dropDownDlg_RV.y + window.pageYOffset;
	}

	if(contentType == 'recentlyViewedList'){
		
		dojo.byId("RecentlyViewedList").style.display = "block";
		
	//dojo.byId("RecentlyViewedAdded").style.display = "none";
	}
	else if(contentType == 'orderItemAdded'){
		dojo.byId("RecentlyViewedList").style.display = "none";
		dojo.byId("RecentlyViewedAdded").style.display = "block";
	}
	
	setTimeout(dojo.hitch(dropDownDlg_RV,"show",null),5);
	setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
	exit("showRecentlyViewedDropDown");
}
/**
 * Hides the DialogUnderlayWrapper component, the component that grays out the screen behind,
 * as we do not want the background to be greyed out.
 */
function hideUnderlayWrapper(){
	enter("hideUnderlayWrapper");
	dojo.query('.dijitDialogUnderlayWrapper', document).forEach(function(tag) {		
		tag.style.display='none';
	});
	exit("hideUnderlayWrapper");
}

/**
 * Loads the specified URL.
 *
 * @param {string} url The URL of the page to be loaded.
 */
function loadLink(url){
	document.location.href=url;
}

/**
 * Clears the Search term string displayed in Simple Search field.
 */
function clearSearchField() {
	enter("clearSearchField");
	searchText = document.getElementById("SimpleSearchForm_SearchTerm").value;
	if(searchText == document.getElementById("searchTextHolder").innerHTML){
		document.getElementById("SimpleSearchForm_SearchTerm").value = "";
	}
	else{
		document.getElementById("SimpleSearchForm_SearchTerm").select();
		showAutoSuggestIfResults();
		autoSuggestHover = false;
	}
	exit("clearSearchField");
}

function showAutoSuggestIfResults() {
	enter("showAutoSuggestIfResults");
	// if no results, hide the autosuggest box
	if(typeof(staticContent) != "undefined" && document.getElementById(staticContentSectionDiv[0]).innerHTML == "" && document.getElementById("autoSuggestHistory").innerHTML == "" && document.getElementById("dynamicAutoSuggestTotalResults") == null) {
		showAutoSuggest(false);
	}
	else if(document.getElementById("SimpleSearchForm_SearchTerm").value.length <= AUTOSUGGEST_THRESHOLD) {
		showAutoSuggest(false);
	}
	else {
		showAutoSuggest(true);
	}
	exit("showAutoSuggestIfResults");
}


/**
 * Displays the Search term string in Simple Search field.
 */
function fillSearchField() {
	enter("fillSearchField");
	if (document.getElementById("SimpleSearchForm_SearchTerm").value == "") {
		document.getElementById("SimpleSearchForm_SearchTerm").value = document.getElementById("searchTextHolder").innerHTML;
	}
	// hide the search box results
	if(!autoSuggestHover) {
		showAutoSuggest(false);
	}
	exit("fillSearchField");
}

/**
* Empty default values ONLY when search box is clicked.
*/
function searchEmptyDefault(curVal){
	var keepVals = new Array();
	keepVals[0] = 'Search by Stock # or Keyword';
	keepVals[1] = 'Please enter a Search Term';
	for(i=0; i<keepVals.length; i++){
		if(curVal == keepVals[i]){
			document.getElementById("SimpleSearchForm_SearchTerm").value = "";
			return true;
		}
	}
}


/**
 * Displays the top dropdown menu, including the category dropdowns,  mini shopping cart and recentlViewed.
 */
function showDropDownMenu(){
	enter("showDropDownMenu");
	var showMenu = document.getElementById("header_menu_dropdown");
	if(document.getElementById("header_menu_dropdown")!=null && document.getElementById("header_menu_dropdown")!='undefined'){
		showMenu.style.display = "block";
	}
	exit("showDropDownMenu");
}

/**
 * Initializes the mini shopping cart object and subscribes dojo actions on this object.
 */
function initShopcartTarget(){
	enter("initShopcartTarget");	
	dojo.subscribe("/dnd/drop", function(source, nodes, copy, target){
	
		target.deleteSelectedNodes();
		
		var actionListScroll = new popupActionProperties(); 
		actionListScroll.showProductCompare = showProductCompare;

		if(target.parent.id=='miniShopCart_dndTarget'){
			
			var indexOfIdentifier = source.parent.id.indexOf("_",0);
			if ( indexOfIdentifier >= 0) {
				//remove the prefix including the "underscore"
				source.parent.id = source.parent.id.substring(indexOfIdentifier+1);					
			}
			if(source.node.getAttribute('dndType')=='item' || source.node.getAttribute('dndType')=='package') {
				categoryDisplayJS.AddItem2ShopCartAjax(source.parent.id ,1);
			} else if(source.node.getAttribute('dndType')=='product' || source.node.getAttribute('dndType')=='bundle') {
				showPopup(source.parent.id,storeId,langId,catalogId,function(e){return e;},'miniShopCart_dndTarget',null,actionListScroll);
			}
		}
	});
	exit("initShopcartTarget");
}

/**
 * Displays the progress bar dialog to indicate a request is currently running.
 * There are certain cases where displaying the progress bar causes problems in Opera,
 * the optional parameter "checkForOpera" is passed to specifically check if the browser used is Opera,
 * if so, do not display the progress bar in these cases.
 *
 * @param {boolean} checkForOpera Indicates whether to check if the browser is Opera or not.
 */
function cursor_wait(checkForOpera) {
	enter("cursor_wait");
	var showPopup = true;	

	//Since dijit does not support Opera
	//Some progress bar dialog will be blocked in Opera to avoid error
	if(checkForOpera == true){
		if(dojo.isOpera > 0){
			showPopup = false;
		}
	}
	
	//For all other browsers and pages that work with Opera
	//Display the progress bar dialog
	if(showPopup){
		//Delay the progress bar from showing up
		setTimeout('showProgressBar()',500);
	}
	exit("cursor_wait");
}

/**
 * Helper method for cursor_wait() to display the progress bar pop-up.
 * Displays progress bar, next to the element if the element id was specified in currentId,
 * or defaults to the center of the page if currentId is empty.
 * Progress bar will only be displayed if the submitted request has not been completed.
 * This method is only called implicitly by the cursor_wait() method, which is triggered before a request is submitted.
 */
function showProgressBar(){
	enter("showProgressBar");
	//After the delay, if the request is still not finished
	//Then continue and show the progress bar
	//Otherwise, do not execute the following code
	if(!requestSubmitted){
		return;
	}
	displayProgressBar();
	exit("showProgressBar");
}


/**
 * Helper method for showProgressBar() to display the progress bar pop-up.
 * It can also be forced to show the progress bar directly in special cases.
 * The function also displays the progress bar next to the element if the element id was specified in currentId,
 * or defaults to the center of the page if currentId is empty.
 * This method can be called implicitly by the cursor_wait() method or explicitly by itself.
 */
function displayProgressBar(){
	enter("displayProgressBar");
	var dialog = dijit.byId('progress_bar_dialog');
	
	//Make sure the dialog is created
	if(dialog != null){
		debug("displayProgressBar", "10", "");
		//Hide the header for the close button
		dialog.closeButtonNode.style.display='none';		
		
		var progressBar = document.getElementById('progress_bar');
		progressBar.style.display = 'block';	
		
		debug("displayProgressBar", "20", this.currentId);
		
		//Check whether or not an element ID is provided
		//If yes, point the progress bar to this element
		//Otherwise, show the progress bar in a dialog
		if(this.currentId != ""){
			debug("displayProgressBar", "30", "");
			var element = document.getElementById(this.currentId);
			debug("displayProgressBar", "31", element);
			
			var pos = dijit.placeOnScreenAroundElement(progressBar,element,{'TR':'TL'});
			debug("displayProgressBar", "32", pos);
		} else {
			dialog.containerNode.innerHTML == "";
			progressBar.style.left = '';
			progressBar.style.top = '';
			dialog.containerNode.appendChild(progressBar);
			dialog.show();		
		}
		
		//Make sure the progress bar dialog goes away after 30 minutes
		//and does not hang if server calls does not return
		//Assuming the longest server calls return before 30 minutes
		setTimeout("cursor_clear()",1800000);
	}
	exit("displayProgressBar");
}

/**
 * Stores the id of the element (ex: button/link) that triggered the current submitted request.
 * Store the new element id only when no request is currently running.
 *
 * @param {string} id The id of element triggering the submitted request.
 */
function setCurrentId(id){
	//If there is no request already submitted, update the id
	if(!requestSubmitted && this.currentId == ""){
		this.currentId = id;
	}
}

/**
 * This function trims the spaces from the pased in word.
 * Delete all pre and trailing spaces around the word.
 * 
 * @param {string} inword The word to trim.
 */
function trim(inword)
{
	word = inword.toString();
	var i=0;
	var j=word.length-1;
	while(word.charAt(i) == " ") i++;
	while(word.charAt(j) == " ") j=j-1;
	if (i > j) {
		return word.substring(i,i);
	} else {
		return word.substring(i,j+1);
	}
}

/**
 * Hides the progress bar dialog when the submitted request has completed.
 * Set the visibility of the progress bar dialog to hide from the page.
 */
function cursor_clear() {
	enter("cursor_clear");
	//Reset the flag 
	requestSubmitted = false;

	//Hide the progress bar dialog
	var dialog = dijit.byId('progress_bar_dialog');
	var progressBar = document.getElementById('progress_bar');
	if(dialog != null){
		if(progressBar != null){
			progressBar.style.display = 'none';
		}
		dialog.hide();
		this.currentId="";
	}
	exit("cursor_clear");
}	

/**
 * Checks whether a request can be submitted or not.
 * A new request may only be submitted when no request is currently running.
 * If a request is already running, then the new request will be rejected.
 *
 * @return {boolean} Indicates whether the new request was submitted (true) or rejected (false).
 */
function submitRequest() {
	if(!requestSubmitted) {
		requestSubmitted  = true;
		return true;
	}
	return false;
}
 
/**
 * Set the current page to a new URL.
 * Takes a new URL as input and set the current page to it, executing the command in the URL.
 * Used for Non-ajax calls that requires multiple clicks handling.
 * 
 * @param {string} newPageLink The URL of the new page to redirect to.
 */
function setPageLocation(newPageLink) {
	//For Handling multiple clicks
	if(!submitRequest()){
		return;
	}
			
	document.location.href = newPageLink;
}

/**
 * Submits the form parameter.
 * Requires a form element to be passed in and submits form with its inputs.
 * Used for Non-ajax calls that requires multiple clicks handling.
 *
 * @param {element} form The form to be submitted.
 */
function submitSpecifiedForm(form) {
	if(!submitRequest()){
		return;
	}
	form.submit();
}


/**
 * Parses a Dojo widget.
 * Pass in the id of a dojo widget or a HTML container element containing a dojo widget, such as a div,
 * and this method will parse that widget, or all the widgets within that HTML container element.
 * 
 * @param {string} id The id of a dojo widget or a HTML container of a dojo widget to be parsed.
 */
function parseWidget(id)
{
	var node;
	var widget = dijit.byId(id);
	
	if (widget == null || widget == undefined)
	{
		if (id == null || id == undefined)
		{	
			node = dojo.body();
		}
		else
		{
			node = dojo.byId(id);
		}
		
		if (node != null && node != undefined)
		{
			if (node.getAttribute("dojoType") != null && node.getAttribute("dojoType") != undefined)
			{
				dojo.parser.instantiate([node]);
			}
			else
			{
				dojo.parser.parse(node);
			}
		}
	}
}

/**
 * Parses the header menu.
 * The header menu is only parsed when the user hovers over it to improve the performance of the store loading.
 *
 * @param {string} id The id of the menu item which the user hovers over to initialize the progress bar next to that item.
 */
function parseHeader(id) {
	enter("parseHeader");
	var node = dojo.byId("progress_bar_dialog");
	var showMenu = document.getElementById("header_menu_loaded");
	var hideMenu = document.getElementById("header_menu_overlay");
	
	if(currentId.length == 0 && document.getElementById("header_menu_loaded")!=null && document.getElementById("header_menu_loaded")!='undefined' && document.getElementById("header_menu_overlay")!=null && document.getElementById("header_menu_overlay")!='undefined' && document.getElementById("header_menu_loaded").style.display == 'none')
	{
		setCurrentId((id != null && id != undefined)?id:hideMenu.id);
		submitRequest();
		cursor_wait();
		hideMenu.style.display = "none";
		parseWidget("header_menu_loaded");
		showMenu.style.display = "block";
		cursor_clear();
	}
	exit("parseHeader");
}


 /**
  * This function is used to hide an element with the specified id.
  * @param {string} elementId The id of the element to be hidden.
  */

  function hideElementById(elementId){
		var div = dojo.byId(elementId);
		div.style.display = "none";
 }

/**
  * This function is used to display an element with the specified id.
  * @param {string} elementId The id of the element to be displayed.
  */

   function showElementById(elementId){
		var div = dojo.byId(elementId);
		div.style.display = "block";
}

/**
  * This function is used to hide the background image of an element.
  * @param {DomNode} element The node whose background image is to be hidden.
  */
    function hideBackgroundImage(element){
		element.style.backgroundImage='none';
}

/**
  * This function is used to display the background image of a product onhover.
  * @param {DomNode} element The node for which the product hover background image is to be displayed.
  */

	 function showBackgroundImage(element){
		element.style.backgroundImage='url('+getImageDirectoryPath()+getStyleDirectoryPath()+'product_hover_background.png)';
}
	/**
	* checkIE8Browser checks to see if the browser is IE 8 or less. It then sets correctBrowser to true if it is.
	*
	**/
	
	function checkIE8Browser() { 
       if( dojo.isIE && dojo.isIE <= 8 ){
    	    correctBrowser = true
       }
   } 
 
	/**
	* ApprovalToolLink provides the appropriate URL if the browser is correct, otherwise displays a message.
	*
	* @param {String} idTag Used to identify the id tag in the jsp that is calling it.
	* @param {String} approvalToolLinkURL This is a URL which is passed from the calling jsp.
	*
	**/
   
	function ApprovalToolLink(idTag, approvalToolLinkURL) { 
		
		//checks if the browser is IE 8 or less.
		checkIE8Browser();
		
		if (correctBrowser) {
    	  RFQwindow=window.open(approvalToolLinkURL);
		}
		else {      
    	  MessageHelper.formErrorHandleClient(idTag,MessageHelper.messages["ERROR_INCORRECT_BROWSER"]); return;
    	}
	}  


/**
 * Updates view (image/detailed) and starting index of pagination of product display in SetCurrencyPreferenceForm when currency is changed from the drop-down menu. 
 * These are later passed as url parameters.
 */

function updateViewAndBeginIndexForCurrencyChange(){
	if(document.getElementById('fastFinderResultControls')!=null && document.getElementById('fastFinderResultControls')!='')
	{	
		if(document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = document.FastFinderForm.pageView.value;
		}
		if(document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value = document.FastFinderForm.beginIndex.value;
		}
	}
	else if(document.getElementById('CategoryDisplay_Widget')!=null && document.getElementById('CategoryDisplay_Widget')!='')
	{
		if(wc.render.getContextById('CategoryDisplay_Context').properties['pageView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('CategoryDisplay_Context').properties['pageView'];
		}
		if(wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value = wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex'];
		}
	}
	else if(document.getElementById('Search_Result_Summary')!=null && document.getElementById('Search_Result_Summary')!='')
	{
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']
		}
	}

}


/**
 * Updates view (image/detailed) and starting index of pagination of product display in LanguageSelectionForm when language is changed from the drop-down menu.
 * These are later passed as url parameters.
 */

function updateViewAndBeginIndexForLanguageChange(){
	if(document.getElementById('fastFinderResultControls')!=null && document.getElementById('fastFinderResultControls')!='')
	{
		if(document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = document.FastFinderForm.pageView.value;
		}
		if(document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = document.FastFinderForm.beginIndex.value;
		}
	}
	else if(document.getElementById('CategoryDisplay_Widget')!=null && document.getElementById('CategoryDisplay_Widget')!='')
	{
		if(wc.render.getContextById('CategoryDisplay_Context').properties['pageView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('CategoryDisplay_Context').properties['pageView'];
		} 
		if(wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex'];
		} 
	}
	else if(document.getElementById('Search_Result_Summary')!=null && document.getElementById('Search_Result_Summary')!='')
	{
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum'];
		}
	}
}

/**
 * Displays the header links in two lines.
 */
function showHeaderLinksInTwoLines(){
	if(document.getElementById("header_links")!=null && document.getElementById("header_links")!='undefined'){
		if(dojo.contentBox(document.getElementById("header_links")).w > 750){
			if(document.getElementById("header_links1")!=null && document.getElementById("header_links1")!='undefined'){
				document.getElementById("header_links1").style.display = "block";
			}
			if(document.getElementById("headerHomeLink")!=null && document.getElementById("headerHomeLink")!='undefined'){
				document.getElementById("headerHomeLink").style.display = "none";
			}
			if(document.getElementById("headerShopCartLink")!=null && document.getElementById("headerShopCartLink")!='undefined'){
				document.getElementById("headerShopCartLink").style.display = "none";
			}
		}
		document.getElementById("header_links").style.visibility="visible";
	}
}

/**
  * Displays the header links in one line.
  */
 function showLinksInOneLine(){
 	if(document.getElementById("header_links")!=null && document.getElementById("header_links")!='undefined'){
 		document.getElementById("header_links").style.visibility="visible";
 	}
 }

/**
 * Validates if the input value is a non-negative integer using regular expression.
 *
 * @param {String} value The value to validate.
 * 
 * @return {Boolean} Indicates if the given value is a non-negative integer. 
 */
function isNonNegativeInteger(value){
	var regExpTester = new RegExp(/^\d*$/);
	return (value != null && value != "" && regExpTester.test(value));
}

/**
* Validates if the input value is a positive integer.
*
* @param {String} value The value to validate.
* 
* @return {Boolean} Indicates if the given value is a positive integer. 
*/
function isPositiveInteger(value){
	return (isNonNegativeInteger(value) && value != 0);
}

/**Added for Auto Suggest Functionality
 * 
 * @param event
 * @param url
 * @param searchTerm
 * @return
 */

function getCookie(c) {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var index = cookies[i].indexOf("=");
		var name = cookies[i].substr(0,index);
		name = name.replace(/^\s+|\s+$/g,"");
		if (name == c) {
			return unescape(cookies[i].substr(index + 1));
		}
	}
}

function clearAutoSuggestResults() {
	// clear the static search results.
	for (var i = 0; i < staticContent.length; i++) {
		document.getElementById(staticContentSectionDiv[i]).innerHTML = "";
	}
	autoSuggestPreviousTerm = "";
	autoSuggestURL = "";
	// clear the dynamic search results;
	document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
	showAutoSuggest(false);
	}

function validateSearchSubmit(){
	var searchTermVal = document.getElementById("SimpleSearchForm_SearchTerm").value;
	searchTermVal = searchTermVal.toLowerCase();
	searchTermVal = searchTermVal.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	searchTermVal = searchTermVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	var my_string = new String("SEARCH");
	var searchCheck = searchTermVal.substr(0,6);
		if(searchTermVal != my_string && searchCheck != "search" && searchTermVal != '""' && searchTermVal != '' && searchTermVal != "search" && searchTermVal !="null" && searchTermVal!="please enter a search term" && searchTermVal != "''" ){
			var searchTerm = document.getElementById("SimpleSearchForm_SearchTerm").value;
       	    searchTerm = searchTerm.replace(/^[0]+/g,"");
       	    searchTerm = searchTerm.replace(/[^a-zA-Z0-9-,.$\u2044$_\s]/g, "");
       	    //searchTerm = searchTerm.replace(/-/g, ' ');
       	    document.forms["CatalogSearchForm"].globalSearchText.value = searchTerm;
       	    document.forms["CatalogSearchForm"].searchText.value = searchTerm;
			//document.forms["CatalogSearchForm"].submit();
       	    if(searchTerm != my_string && searchCheck != "search" && searchTerm != '""' && searchTerm != '' && searchTerm != "search" && searchTerm !="null" && searchTerm!="please enter a search term" && searchTerm != "''" ){       	    
	       	    document.location.href="http://"+window.location.host+"/en/"+ storeToken +"/searchterm/"+searchTerm+"/true/"+searchTerm;
	       	    return false;
    	    }else{
    	    	document.getElementById("SimpleSearchForm_SearchTerm").value =  "Please enter a Search Term";
 			document.getElementById("SimpleSearchForm_SearchTerm").style.color = 'red';
 			return false;
    	    }
		}
		else{
			document.getElementById("SimpleSearchForm_SearchTerm").value =  "Please enter a Search Term";
			document.getElementById("SimpleSearchForm_SearchTerm").style.color = 'red';
			//document.getElementById("SimpleSearchForm_SearchTerm").style.color = "#660066";
			
		  return false;
		}
}

function doAutoSuggest(event, url, searchTerm) {	
	//alert("Do AutoSuggest Functions....");
	if (event.keyCode != 13){
	document.getElementById("SimpleSearchForm_SearchTerm").style.color = "#660066";
	}

	if(searchTerm.length <= AUTOSUGGEST_THRESHOLD ) {
		showAutoSuggest(false);
	}

	if(event.keyCode == dojo.keys.ENTER) {
		return;
	}

	if(event.keyCode == dojo.keys.TAB) {
		autoSuggestHover = true;
		return;
	}

	if(event.keyCode == dojo.keys.ESCAPE) {
		showAutoSuggest(false);
		return;
	}

	if(event.keyCode == dojo.keys.UP_ARROW) {
		var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
		if(highLightSelection(true, autoSelectOption-1)) {
			highLightSelection(false, autoSelectOption);
			if(autoSelectOption == historyIndex) {
				resetAutoSuggestKeyword();
			}
			autoSelectOption--;
		}
		else if(autoSelectOption == CACHED_AUTOSUGGEST_OFFSET && totalDynamicResults != null && totalDynamicResults != 'undefined') {
			highLightSelection(false, CACHED_AUTOSUGGEST_OFFSET);		
			autoSelectOption = totalDynamicResults.value-1;
			highLightSelection(true, autoSelectOption);
		}
		else {
			// up arrow back to the very top
			highLightSelection(false, autoSelectOption);
			autoSelectOption = -1;
			var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
			resetAutoSuggestKeyword();
		}
		return;
	}

	if(event.keyCode == dojo.keys.DOWN_ARROW) {
		if(highLightSelection(true, autoSelectOption+1)) {
			highLightSelection(false, autoSelectOption);
			autoSelectOption++;
		}
		else if(autoSelectOption < CACHED_AUTOSUGGEST_OFFSET && highLightSelection(true, CACHED_AUTOSUGGEST_OFFSET)) {
			// down arrow into the cached autosuggest section
			highLightSelection(false, autoSelectOption);
			autoSelectOption = CACHED_AUTOSUGGEST_OFFSET;
			resetAutoSuggestKeyword();
		}
		return;
	}

	if(searchTerm.length > AUTOSUGGEST_THRESHOLD && searchTerm == autoSuggestPreviousTerm) {
		return;
	}
	else {
		autoSuggestPreviousTerm = searchTerm;
	}

	if(searchTerm.length <= AUTOSUGGEST_THRESHOLD) {
		return;
	};

	// cancel the dynamic search if one is pending
	if(autoSuggestTimer != -1) {
		clearTimeout(autoSuggestTimer);
		autoSuggestTimer = -1;
	}

	if(searchTerm != "") {
		autoSelectOption = -1;
		var hasResults = doStaticAutoSuggest(searchTerm);
		if(searchTerm.length > DYNAMIC_AUTOSUGGEST_THRESHOLD) {
			var showHeader = true; // hasResults;
			doDynamicAutoSuggest(url, searchTerm, showHeader);
		}
		else {
			// clear the dynamic results
			document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
		}
	}
	else {
		clearAutoSuggestResults();
	}
}


function showAutoSuggest(display) {
	var autoSuggest_Result_div = document.getElementById("autoSuggest_Result_div");
	if (dojo.isIE < 7){
		var autoSuggest_content_div = document.getElementById("autoSuggest_content_div");
		var autoSuggestDropDownIFrame = document.getElementById("autoSuggestDropDownIFrame");
	}
	
	if(autoSuggest_Result_div != null && autoSuggest_Result_div != 'undefined') {
		if(display) {
			autoSuggest_Result_div.style.display = "block";
			if (dojo.isIE < 7) {
				autoSuggestDropDownIFrame.style.height = autoSuggest_content_div.scrollHeight;
				autoSuggestDropDownIFrame.style.display = "block";
			}
		}
		else {
			if (dojo.isIE < 7) {
				autoSuggestDropDownIFrame.style.display = "none";
				autoSuggestDropDownIFrame.style.height = 0;
			}
			autoSuggest_Result_div.style.display = "none";
		}
	}
}


function highLightSelection(state, index) {
	var selection = document.getElementById("autoSelectOption_" + index);
	if(selection != null && selection != 'undefined') {
		if(state) {
			selection.className = "autocompleteactive";
			var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
			searchBox.setAttribute("aria-activedescendant", "suggestionItem_" + index);
			var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
			if((totalDynamicResults != null && totalDynamicResults != 'undefined' && index < totalDynamicResults.value) || (index >= historyIndex)) {
				searchBox.value = selection.title;
				autoSuggestPreviousTerm = selection.title;
				autoSuggestURL = "";
			}
			else {
				autoSuggestURL = selection.href;
			}
		}
		else {
			selection.className = "";
		}
		return true;
	}
	else {
		return false;
	}
}

function resetAutoSuggestKeyword() {
	var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
	if(originalKeyedSearchTerm != null && originalKeyedSearchTerm != 'undefined') {
		var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
		searchBox.value = originalKeyedSearchTerm.value;
		autoSuggestPreviousTerm = originalKeyedSearchTerm.value;
	}
}

function selectAutoSuggest(term, viewName) {
	var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
	searchBox.value = term;
	searchBox.focus();
	autoSuggestPreviousTerm = term;
	document.CatalogSearchForm.action = viewName;
	document.getElementById("SimpleSearchForm_SearchTerm").value=term;
	document.getElementById("searchText").value=term;
	if (viewName == "ArticleResultsView"){
		//submitSpecifiedForm(document.CatalogSearchForm);
		document.location.href="http://"+window.location.host+"/en/"+ storeToken +"/searchterm/false/"+term+"/"+term;
	}else {
		document.location.href="http://"+window.location.host+"/en/"+ storeToken +"/searchterm/"+term+"/true/"+term;
	}	
}

function enableAutoSelect(index) {
	highLightSelection(false, autoSelectOption);
	var item = document.getElementById('autoSelectOption_' + index);
	item.className = "autocompleteactive";
	autoSelectOption = index;
}

function doStaticAutoSuggest(searchTerm) {
	var resultList = ["", "", "", "", "", ""];
	var emptyCell = 0;
	//alert('Entered doStaticAutoSuggest......');
	var searchTermLower = searchTerm.toLowerCase();
	var listCount = CACHED_AUTOSUGGEST_OFFSET;

	for(var i = 0; i < staticContent.length; i++) {
		var count = 0;
		for(var j = 0; j < staticContent[i].length; j++) {
			var searchName = staticContent[i][j][0];
			var searchURL = staticContent[i][j][1];
			var displayName = staticContent[i][j][2];
			var index = searchName.toLowerCase().indexOf(searchTermLower);
			if(index != -1) {
				var displayIndex = index + displayName.length - searchName.length;
				resultList[i] = resultList[i] + "<li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'><a id='autoSelectOption_" + listCount + "' title='" + displayName + "' onmouseout='this.className=\"\"; autoSuggestURL=\"\";' onmouseover='enableAutoSelect(" + listCount + "); autoSuggestURL=this.href;' href=\"" + searchURL + "\">" + displayName.substr(0, displayIndex) + "<strong>" + displayName.substr(displayIndex, searchTerm.length) + "</strong>" + displayName.substr(displayIndex + searchTerm.length) + "</a></li>";
				count++;
				listCount++;
				if(count >= TOTAL_SUGGESTED) {
					break;
				}
			}
		}
	}

	for (var i = 0; i < staticContent.length; i++) {
		document.getElementById(staticContentSectionDiv[i]).innerHTML = "";
		if(resultList[i] != "") {
			document.getElementById(staticContentSectionDiv[emptyCell]).innerHTML = "<div class='results'><div class='heading'>" + staticContentHeaders[i] + "</div><ul>" + resultList[i] + "</ul></div>";
			emptyCell++;
			
			
		}
	}

	var historyList = "";
	var searchHistorySection = document.getElementById("autoSuggestHistory");
	searchHistorySection.innerHTML = "";
	var historyArray = new Array();
	historyIndex = listCount;

	var searchHistoryCookie = getCookie("searchTermHistory");
	if(searchHistoryCookie != null && typeof(searchHistoryCookie) != 'undefined') {
		var termsArray = searchHistoryCookie.split("|");
		var count = 0;
		for(var i = termsArray.length - 1; i > 0; i--) {
			var theTerm = termsArray[i];
			var theLowerTerm = theTerm.toLowerCase();
			if(theLowerTerm.match("^"+searchTermLower) == searchTermLower) {
				var repeatedTerm = false;
				for(var j = 0; j < historyArray.length; j++) {
					if(historyArray[j] == theLowerTerm) {
						repeatedTerm = true;
						break;
					}
				}
				if(!repeatedTerm) {
					historyList = historyList + "<li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'><a href='#' onmouseout='this.className=\"\"' onmouseover='enableAutoSelect(" + listCount + ");' onclick='selectAutoSuggest(this.title); return false;' title=\"" + theTerm + "\" id='autoSelectOption_" + listCount+ "'><strong>" + searchTerm + "</strong>" + theTerm.substring(searchTerm.length, theTerm.length) + "</a></li>";
					historyArray.push(theLowerTerm);
					count++;
					listCount++;
					if(count >= TOTAL_HISTORY) {
						break;
					}
				}
			}
		}
	}


	if(historyList != "") {
		searchHistorySection.innerHTML = "<div class='results'><div class='heading'>" + staticContentHeaderHistory + "</div><ul>" + historyList + "</ul></div>";
		emptyCell++;
	}

	if(emptyCell > 0) {
		showAutoSuggest(true);
		return true;
	}

	return false;
}
function doDynamicAutoSuggest(url, searchTerm, showHeader) {	

	// if pending autosuggest triggered, cancel it.
	if(autoSuggestTimer != -1) {
		clearTimeout(autoSuggestTimer);
		autoSuggestTimer = -1;
	}

	// call the auto suggest
	autoSuggestTimer = setTimeout(function() {
		wc.render.getRefreshControllerById("AutoSuggestDisplayController").url = url + "&term=" + escape(searchTerm) + "&showHeader=" + showHeader;
		wc.render.updateContext("AutoSuggest_Context", {});
		autoSuggestTimer = -1;
	}, autoSuggestKeystrokeDelay);
}


function retrieveCachedSuggestions(url) {
	if(!retrievedCachedSuggestions) {
		wc.render.getRefreshControllerById("AutoSuggestCachedSuggestionsController").url = url;
		wc.render.updateContext("CachedSuggestions_Context", {});
	}
}
function onEnterKeySearch(keyCode){	
	    if( keyCode == 13){   	
	    	
	    		//alert('onEnterKeySearch');
	    		var suggestedValue='';
	    		if(document.getElementById("dynamicAutoSuggestTotalResults") != null){
	    			 suggestedValue = document.getElementById("dynamicAutoSuggestTotalResults").value;
	    		}
	           // alert('After capturing the result');
	            if(suggestedValue != ''){
	            	var suggestedTerm = document.getElementById("SimpleSearchForm_SearchTerm").value;	
	            	var term = suggestedTerm.toLowerCase();
	            	var suggestedVal = document.getElementById("resultType_"+term).value;	
	            	if (suggestedTerm == "diamond"){
	            		//alert("In Search Results View !");
	            		document.CatalogSearchForm.action = 'SearchResultsView';
	            		document.getElementById("SimpleSearchForm_SearchTerm").value=suggestedTerm;
	            		document.getElementById("searchText").value=suggestedTerm;
	            		//submitSpecifiedForm(document.CatalogSearchForm);
	            	   document.location.href="http://"+window.location.host+"/en/"+ storeToken +"/searchterm/"+suggestedTerm+"/true/"+suggestedTerm;
	            	}else if (suggestedVal == 'S'){
	            		//alert("In Search Results View");
	            		document.CatalogSearchForm.action = 'SearchResultsView';
	            		document.getElementById("SimpleSearchForm_SearchTerm").value=suggestedTerm;
	            		document.getElementById("searchText").value=suggestedTerm;
	            		//submitSpecifiedForm(document.CatalogSearchForm);
	            		document.location.href="http://"+window.location.host+"/en/"+ storeToken +"/searchterm/"+suggestedTerm+"/true/"+suggestedTerm;
	            	}else if (suggestedVal == 'A'){
	            		//alert("In Articles Results View");
	            		document.CatalogSearchForm.action = 'ArticleResultsView';
	            		document.getElementById("SimpleSearchForm_SearchTerm").value=suggestedTerm;
	            		document.getElementById("searchText").value=suggestedTerm;
	            		//submitSpecifiedForm(document.CatalogSearchForm);
	            		document.location.href="http://"+window.location.host+"/en/"+ storeToken +"/searchterm/false/"+suggestedTerm+"/"+suggestedTerm ;
	            	}
	             	return false;
	           }else{
	        	    var searchTermVal = document.getElementById("SimpleSearchForm_SearchTerm").value;
	        		searchTermVal = searchTermVal.toLowerCase();
	        		searchTermVal = searchTermVal.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	        		searchTermVal = searchTermVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	        		var my_string = new String("Search by Stock # or Keyword");
	        			if(searchTermVal != my_string && searchTermVal != '""' && searchTermVal != '' && searchTermVal != "search" && searchTermVal !="null" && searchTermVal!="please enter a search term" && searchTermVal != "''" ){
	    	          	    var searchTerm = document.getElementById("SimpleSearchForm_SearchTerm").value;
	    	          	    searchTerm = searchTerm.replace(/^[0]+/g,"");
	    	          	   	searchTerm = searchTerm.replace(/[^a-zA-Z0-9-,.$\u2044$_\s]/g, "");
	    	          	   	//searchTerm = searchTerm.replace(/-/g, ' ');
	    	          	  if(searchTerm != my_string && searchCheck != "search" && searchTerm != '""' && searchTerm != '' && searchTerm != "search" && searchTerm !="null" && searchTerm!="please enter a search term" && searchTerm != "''" ){       	    
	    	  	       	    	document.location.href="http://"+window.location.host+"/en/"+ storeToken +"/searchterm/"+searchTerm+"/true/"+searchTerm;
	    	  	       	    	return false;
		    	      	    }else{
		    	      	    	document.getElementById("SimpleSearchForm_SearchTerm").value =  "Please enter a Search Term";
		    	      	    	document.getElementById("SimpleSearchForm_SearchTerm").style.color = 'red';
		    	      	    	return false;
		    	      	    }
	        			}
	        			else{
	        				document.getElementById("SimpleSearchForm_SearchTerm").value =  "Please enter a Search Term";
	        				document.getElementById("SimpleSearchForm_SearchTerm").style.color = 'red';
	        				//document.getElementById("SimpleSearchForm_SearchTerm").style.color = "#660066";
	        				
	        			  return false;
	        			}
	            }
	            //alert("after condtion");
	    }
	    else{
	            return true;
	    }
	}

function viewMoreArticles(){
	 var articleSearchTerm = document.getElementById("SimpleSearchForm_SearchTerm").value;
	  var URL = "http://"+window.location.host+"/en/"+ storeToken +"/searchterm/false/"+articleSearchTerm+"/"+articleSearchTerm; 
      document.location.href = URL;
}
      
//Search Ignite BEGIN action tracking script  version 4.0
function si_tracking() {
   var now = new Date();
   var url='//dms.netmng.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=9105&transactionamount=0&SICustTransType=39130&jscript=0&timecode=' + now.getTime();
   var proto = location.protocol.toLowerCase(); if( proto == 'https:' ) { url = proto + url; } else { url = 'http:' + url; }
   var siimage = new Image();
   siimage.src = url;
}
function si_tracking_email(email) {
   var now = new Date();
   var url='//dms.netmng.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=9105&transactionamount=0&SICustTransType=39129&x10='+email+'&jscript=0&log=1&timecode=' + now.getTime();
   var proto = location.protocol.toLowerCase(); if( proto == 'https:' ) { url = proto + url; } else { url = 'http:' + url; }
   var siimage = new Image();
   siimage.src = url;
}
