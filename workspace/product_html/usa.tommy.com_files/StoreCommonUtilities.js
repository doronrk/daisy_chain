//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2009, 2011 All Rights Reserved.
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
dojo.require("dojox.fx._base");

dojo.subscribe("ajaxRequestInitiated", "incrementNumAjaxRequest");
dojo.subscribe("ajaxRequestCompleted", "decrementNumAjaxRequest");

/** This variable indicates whether the dropdown is shown or not. */
var showDropdown = false;

/** This variable stores the current dropdown dialog element. */
var dropDownDlg = null;

/** This variable is used to store the width of the mini shopping cart on page load. It is used when shopper's browser is IE6. */
var originalMiniCartWidth = 0;

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
 * This variable keeps track of the number of active ajax requests currently running on the page 
 * The value is initialized to 0.
 */
var numAjaxRequests = 0;

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
var DYNAMIC_AUTOSUGGEST_THRESHOLD = 1;

/** 
 * This variable is an internal constant used in the element ID's generated in the autosuggest content.
 * The value is initialized to 1000.
 */
var CACHED_AUTOSUGGEST_OFFSET = 1000;

/** 
 * Sends back focus to the first focusable element on tabbing from the last focusable element.
 */
function focusSetter(){  
	if(dojo.byId("MiniCartFocusReceiver1"))
		dojo.byId("MiniCartFocusReceiver1").focus();
	else
		dojo.byId("MiniCartFocusReceiver2").focus();
}

/** 
 * Sends back focus to the last focusable element on reverse tabbing from the first focusable element.
 * 
 * @param {object} event The event triggered from user actions
 */
function determineFocus(event) {
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
			}
		}
}

/**
 * Destroys the existing dialogs with outdated data.
 */
function destroyDialog(){
	//If data has changed, then we should destroy the quick_cart_container dialog and recreate it with latest data
	dojo.query('.dijitDialog', document).forEach(function(tag) {
		if (dijit.byNode(tag).id == 'quick_cart_container') 
			dijit.byNode(tag).destroyRecursive();// or dijit.getEnclosingWidget(tag).destroyRecursive();
	 });
	 dropDownDlg = null;
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
	console.debug(event.keyCode);
	if(event.keyCode == dojo.keys.DOWN_ARROW){
		showMiniShopCartDropDown(relativeId,contentId,contentType);
	}
	else if(event.shiftKey && event.keyCode == dojo.keys.ENTER){
		showMiniShopCartDropDown(relativeId,contentId,contentType);
		dojo.stopEvent(event);
	}
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

	//Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
	var t = dojo.byId(relativeId);
	var c = dojo.coords(t,true);
	var x1 = c.x; 
	var y1 = c.y;
	
    /*By default, the content of the mini shop cart will be displayed immediately after the mini shop cart title.
     *But we want the content to display under the mini shop cart title. So we'll need to get the width
     *of the shop cart and then shift it*/
	var cartWidth =dojo.coords(dojo.byId('MiniShoppingCart'),true).w;
	
	if(dojo.isIE == 8){			
		cartWidth = dojo.coords(dojo.byId('outerCartContainer'),true).w
	}else if (dojo.isIE>=7 && dojo.isIE<8) {
		cartWidth =dojo.coords(dojo.byId('miniShopCartBody'),true).w;
	}else if(dojo.isIE < 7){
		cartWidth = originalMiniCartWidth;
		if(dojo.locale == 'iw-il' || dojo.locale=='ar-eg'){
			cartWidth = dojo.coords(dojo.byId('outerCartContainer'),true).w
		}
	}
	
	//dojo.style(dojo.byId("quick_cart"), "width", cartWidth+'px');
	
	/* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
	if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time before calling Dialog.show() method reset the (x,y) co-ordinates. 
	The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
	*/
    var dlgX=x1; //this value is good for ff3, IE8 & languages
    
    if(dojo.isIE){
    	dlgX = x1 + dojo.contentBox(dojo.byId(relativeId)).w-cartWidth;
    	if(dojo.isIE == 8)
    	{	
    		var rightSideGap = 8;
    		dlgX= dlgX = x1 + dojo.contentBox(dojo.byId(relativeId)).w-cartWidth+rightSideGap;
    		dojo.style(dojo.byId("quick_cart_container"),"left","950px");
    	}
    }
    
    //work around for bidirectional languages
    if (dojo.locale == 'iw-il' || dojo.locale=='ar-eg') {
    	if (dojo.isIE<8) {
    		var leftX = dojo.coords(dojo.byId('miniShopCartLeftCorner')).x;
    		var rightX = dojo.coords(dojo.byId('miniShopCartRightCorner')).x;
    		if (rightX > leftX) {
    			dlgX  = leftX
    		}else {
    			dlgX  = rightX
    		}
    	}
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
	//if(contentType == 'orderItemsList'){
		dojo.byId("MiniShopCartProductsList").style.display = "block";
		dojo.byId("MiniShopCartProductAdded").style.display = "none";
	/*}
	else if(contentType == 'orderItemAdded'){
		dojo.byId("MiniShopCartProductsList").style.display = "none";
		
		if(dojo.byId('header_links') && dojo.byId('header_links').style.display != 'none'){
			dojo.byId("MiniShopCartProductAdded").style.display = "block";
		}
	}*/
	if(contentType == 'orderItemAdded'){$('#quick_cart_container').stop().show().delay(4000).hide(1);}
	
	if(dojo.isIE < 7)
	{	
		document.getElementById("quick_cart_container").style.display = "block";
	}
	setTimeout(dojo.hitch(dropDownDlg,"show",null),5);
	setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
	
	// added to highlight the added order item
	if(CommonControllersDeclarationJS.orderAddedId != null){
		dojo.query('.orderItemContainer').forEach(function(item){
			if(dojo.attr(item,'rel') == CommonControllersDeclarationJS.orderAddedId){
				dojox.fx.highlight({node : item, duration:'1000', color:"#ffff99" }).play();
			}
		});
		CommonControllersDeclarationJS.orderAddedId = null;
	}
}

/**
 * Hides the DialogUnderlayWrapper component, the component that grays out the screen behind,
 * as we do not want the background to be greyed out.
 */
function hideUnderlayWrapper(){
	dojo.query('.dijitDialogUnderlayWrapper', document).forEach(function(tag) {		
		tag.style.display='none';
	});	
}

/**
 * Loads the specified URL.
 *
 * @param {string} url The URL of the page to be loaded.
 */
function loadLink(url){
	document.location.href=url;
	try {
		if (window.top._ceaCollabDialog!=undefined && window.top._ceaCollabDialog!=null) {
			window.top._ceaCollabDialog.topCategoryClicked(url);
		}		
	}catch (err) {
		console.log(err);
	}
	

}

/**
 * Clears the Search term string displayed in Simple Search field.
 */
function clearSearchField() {
	searchText = document.getElementById("SimpleSearchForm_SearchTerm").value;
	if(searchText == document.getElementById("searchTextHolder").innerHTML){
		document.getElementById("SimpleSearchForm_SearchTerm").value = "";
	}
	else{
		document.getElementById("SimpleSearchForm_SearchTerm").select();
		showAutoSuggestIfResults();
		autoSuggestHover = false;
	}
}

/**
 * Displays the Search term string in Simple Search field.
 */
function fillSearchField() {
	if (document.getElementById("SimpleSearchForm_SearchTerm").value == "") {
		document.getElementById("SimpleSearchForm_SearchTerm").value = document.getElementById("searchTextHolder").innerHTML;
	}
	// hide the search box results
	if(!autoSuggestHover) {
		showAutoSuggest(false);
	}
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
}

/**
 * Helper method for cursor_wait() to display the progress bar pop-up.
 * Displays progress bar, next to the element if the element id was specified in currentId,
 * or defaults to the center of the page if currentId is empty.
 * Progress bar will only be displayed if the submitted request has not been completed.
 * This method is only called implicitly by the cursor_wait() method, which is triggered before a request is submitted.
 */
function showProgressBar(){
	//After the delay, if the request is still not finished
	//Then continue and show the progress bar
	//Otherwise, do not execute the following code
	if(!requestSubmitted){
		return;
	}
	
	displayProgressBar();
	
}


/**
 * Helper method for showProgressBar() to display the progress bar pop-up.
 * It can also be forced to show the progress bar directly in special cases.
 * The function also displays the progress bar next to the element if the element id was specified in currentId,
 * or defaults to the center of the page if currentId is empty.
 * This method can be called implicitly by the cursor_wait() method or explicitly by itself.
 */
function displayProgressBar(){
	var dialog = dijit.byId('progress_bar_dialog');
	
	//Make sure the dialog is created
	if(dialog != null){
			
		//Hide the header for the close button
		dialog.closeButtonNode.style.display='none';		
		
		var progressBar = document.getElementById('progress_bar');
		progressBar.style.display = 'block';	
				
		//Check whether or not an element ID is provided
		//If yes, point the progress bar to this element
		//Otherwise, show the progress bar in a dialog
		if(this.currentId != ""){
			var element = document.getElementById(this.currentId);	
			var pos = dijit.placeOnScreenAroundElement(progressBar,element,{'TR':'TL'});	
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

/* moved to th.global.js 
function parseWidget(id) {}
*/

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
	else if(document.getElementById('Search_Result_Summary2')!=null && document.getElementById('Search_Result_Summary2')!='')
	{
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum'];
		}
	}
	
	//appending landId to the URL. Only used for coshopping
	try {
		if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {	
			dojo.byId('LanguageSelectionForm').action= 
				dojo.byId('LanguageSelectionForm').action + "&langId=" +
				dojo.byId('languageSelection').options[dojo.byId('languageSelection').selectedIndex].value;
		}
	}catch(err) {
		console.log(err);
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

/**
 * This function closes all dijit.dialogs on the page. 
 */
function closeAllDialogs(){
	dijit.registry.byClass("dijit.Dialog").forEach(function(w){w.hide()});
}

/**
* This function gets a cookie
* @param {String} c the name of the cookie to be get.
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

/**
 * checks if the store is in preview mode
 * @param {String} contextPathUsed The context path being used by the Store. 
 * @param {String} criteria criteria used to check if contextPathUsed is the preview context. 
 */
function isStorePreview(contextPathUsed,criteria) {
	if(contextPathUsed.indexOf(criteria)>-1) {
		return true;
	}
	return false;
}

/**
 * checks hides the ESpot info popup window
 * @param {String} The id of the popup dialog
 * @param {String} The browser event
 */
function hideESpotInfoPopup(id,event) { 
	if(event!=null && event.type=="keypress" && event.keyCode!="27") {
		return;
	}
	else {
		var quickInfo = dijit.byId(id);
		if(quickInfo != null) {
			quickInfo.hide();
		}
	}
}

/**
 * checks shows the ESpot info popup window
 * @param {String} The id of the popup dialog
 * @param {String} The browser event
 */
function showESpotInfoPopup(id,event) { 
	if(event!=null && event.type=="keypress" && event.keyCode!="13") {
		return;
	}
	else {
		var quickInfo = dijit.byId(id);
		if(quickInfo != null) {
			quickInfo.show();
		}
	}
}  
/**
* This function increments the numAjaxRequests counter by 1. 
*/
function incrementNumAjaxRequest(){
	if(numAjaxRequests != 'undefined'){
		numAjaxRequests++;
	}
}

/**
* This function decrements the numAjaxRequests counter by 1. 
*/
function decrementNumAjaxRequest(){
	if(numAjaxRequests != 'undefined'){
		if(numAjaxRequests != 0){
			numAjaxRequests--;
		}
	}
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

function showAutoSuggestIfResults() {
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
}

function selectAutoSuggest(term) {
	var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
	searchBox.value = term;
	searchBox.focus();
	autoSuggestPreviousTerm = term;
	submitSpecifiedForm(document.CatalogSearchForm)
}

function doStaticAutoSuggest(searchTerm) {
	var resultList = ["", "", "", "", "", ""];
	var emptyCell = 0;
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
	if(typeof(searchHistoryCookie) != 'undefined') {
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
