/***************StoreCommonUtilities.js starts*****************/ 
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2009, 2013 All Rights Reserved.
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
dojo.require("dojo.currency");
dojo.require("dijit.Tree");
dojo.require("dojo.back");
dojo.require("dijit.form.DateTextBox");
dojo.require("wc.widget.RefreshArea");
dojo.require("wc.render.RefreshController");
dojo.require("wc.render.Context");
dojo.require("dojo.cookie");
dojo.require("dojox.fx.Shadow");

dojo.subscribe("ajaxRequestInitiated", "incrementNumAjaxRequest");
dojo.subscribe("ajaxRequestCompleted", "decrementNumAjaxRequest");
dojo.subscribe("ajaxRequestCompleted", "initializeInactivityWarning");

/** This variable indicates whether the dropdown is shown or not. */
var showDropdown = false;

/** This variable stores the current dropdown dialog element. */
var dropDownDlg = null;

/** This variable stores the current product added dropdown dialog element. */
var productAddedDropDownDlg = null;

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

	// ********* temporary change
	//var requestSubmitted = true;
		var requestSubmitted = false;
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

var widgetsList = [];

/**
 * Variable to save whether a tab or shift-tab was pressed
 */
var tabPressed = false;

/** This variable is used to keep track of the quick info/compare touch events */
var currentPopup = '';

/** This variable indicates whether Android is used or not */
var android = null;

/** This variable indicates whether iOS is used or not */
var ios = null;

/**
 * Initialize the client side inactivity warning dialog, this function is called at every page load and at 
 * every the time when ajax request completed.  Be default, 30 seconds before the session timeout, a dialog
 * will popup and display a warning to let the user to extend the time.  The timing of when the dialog
 * will be displayed can be modified with "inactivityWarningDialogBuffer" variable in CommonJSToInclude.jspf
 */
function initializeInactivityWarning() {
	//For personal info page inactivity timeout is 0 by default. So setting 30 mins manually
	if(document.URL!=null){
		if((document.URL.indexOf("editRegistration=Y") != -1) && (document.URL.indexOf("UserRegistrationForm") != -1)){
			inactivityTimeout = 1800000;
		}
	}
	// only set timer if user is not guest and is able to retrieve inactivityTimeout from server
	if (storeUserType != "G" && inactivityTimeout != 0) {
		// Reset the inactivity timer dialog
		if (inactivityTimeoutTracker != null) {
			clearTimeout(inactivityTimeoutTracker);
		}
		
		// setup the inactivity timout tracker
		inactivityTimeoutTracker = setTimeout(showInactivityWarningDialog, inactivityTimeout - inactivityWarningDialogBuffer);
	}
}

/**
 * Show the inactivity warning dialog, the dialog will be closed in 20 seconds.  The timing of when the dialog
 * will be closed can be modified with "inactivityWarningDialogDisplayTimer" variable in CommonJSToInclude.jspf
 */
function showInactivityWarningDialog() {
	dijit.byId("inactivityWarningPopup").show();
	if (dialogTimeoutTracker != null) {
		clearTimeout(dialogTimeoutTracker);
	}
	dialogTimeoutTracker = setTimeout(hideInactivityWarningDialog, inactivityWarningDialogDisplayTimer);
}

/**
 * Hide the inactivity warning dialog
 */
function hideInactivityWarningDialog() {
	dijit.byId("inactivityWarningPopup").hide();
}

/**
 * Send a Ping request to server to reset the inactivity timer.  The client side timer to display the inactivity warning
 * dialog will also be reset.
 */
function resetServerInactivity() {
	dojo.xhrPost({
		url: getAbsoluteURL() + "Ping",				
		handleAs: "json-comment-filtered",
		content: null,
		service: this,
		load: function(serviceResponse, ioArgs) {
			if (serviceResponse.success) {
				initializeInactivityWarning();
			} else {
				console.error("Ping service failed");				
			}
		},
		error: function(errObj, ioArgs) {
			console.error("Ping service failed");
		}
	});
}

/**
 * DOM Shorthand
 */
function $dojo(r){
	return document.getElementById(r);
}

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
 * @param {string} contentId The identifier of the dialog to destroy. If undefined, the default is 'quick_cart_container'.
 */
function destroyDialog(contentId){
	if(contentId == undefined){
		contentId = 'quick_cart_container';
	} 
	//If data has changed, then we should destroy the quick_cart_container dialog and recreate it with latest data
	dojo.query('.dijitDialog', document).forEach(function(tag) {
		if (dijit.byNode(tag).id == contentId) 
			dijit.byNode(tag).destroyRecursive();// or dijit.getEnclosingWidget(tag).destroyRecursive();
	 });
	 
	if(contentId != undefined && contentId == 'quick_cart_container'){
	 	 dropDownDlg = null;
	} else {
		productAddedDropDownDlg = null;
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
		document.getElementById("SimpleSearchForm_SearchTerm").className = "searchBox left";
		document.getElementById("SimpleSearchForm_SearchTerm").value = document.getElementById("searchTextHolder").innerHTML;
	}
	// hide the search box results
	if(!autoSuggestHover) {
		showAutoSuggest(false);
	}
}

/**
 * Displays the top dropdown menu, including the category dropdowns and the mini shopping cart.
 */
function showDropDownMenu(){
	var showMenu = document.getElementById("header_menu_dropdown");
	if(document.getElementById("header_menu_dropdown")!=null && document.getElementById("header_menu_dropdown")!='undefined'){
		showMenu.style.display = "block";
	}
	if(document.getElementById("outerCartContainer")!=null && document.getElementById("outerCartContainer")!='undefined'){
		var outershopcart = document.getElementById("outerCartContainer");
		outershopcart.style.display = "block";
	}
}

/**
 * Initializes the mini shopping cart object and subscribes dojo actions on this object.
 */
function initShopcartTarget(){
			
	dojo.subscribe("/dnd/drop", function(source, nodes, copy, target){
		if (source != target) {
			target.deleteSelectedNodes();
		}
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
				showPopup(source.parent.id,function(e){return e;},'miniShopCart_dndTarget',null,actionListScroll);
			}
		}
	});
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

function resetRequest() {
	requestSubmitted = false;
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
	console.debug("form.action == "+form.action);
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
	/*
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
	*/
	
}

function parseAllWidgets(){
	for(var i = 0; i < widgetsList.length; i++){
		parseWidget(widgetsList[i]);
	}
}

function addToWidgetsList(widgetId){
	widgetsList.push(widgetId);
}


/**
 * Parses the co-shopping Dojo widget.
 * @param {string} id The id of a coshopping dojo widget or a HTML container of a dojo widget to be parsed.
 */
function parseWCCEAWidget(id)
{
	var node;
	var widget = ceadijit.byId(id);
	
	if (widget == null || widget == undefined)
	{
		if (id == null || id == undefined)
		{	
			node = ceadojo.body();
		}
		else
		{
			node = ceadojo.byId(id);
		}
		
		if (node != null && node != undefined)
		{
			if (node.getAttribute("ceadojoType") != null && node.getAttribute("ceadojoType") != undefined)
			{
				ceadojo.parser.instantiate([node]);
			}
			else
			{
				ceadojo.parser.parse(node);
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
function parseHeader(id)
{
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
		
		//the headers are parsed now. Connect _onDropDownClick to Coshopping's topCategoryClicked
		try {
			if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {
				dijit.registry.byClass("wc.widget.WCDropDownButton").forEach(function(w){
					dojo.connect(w, '_onDropDownClick', dojo.hitch(window.top._ceaCollabDialog, "topCategoryClicked", w.getURL()));
					dojo.connect(w, 'onKeyPress', window.top._ceaCollabDialog, function(e) {
						if (e.keyCode == dojo.keys.ENTER) {
							window.top._ceaCollabDialog.topCategoryClicked(w.getURL());
						}
					}); 
				});			
			}
		}catch(err) {
			console.log(err);
		}
	}
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
	else if(document.getElementById('Search_Result_Summary2')!=null && document.getElementById('Search_Result_Summary2')!='')
	{
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']
		}
	}
	
	//allow coshopper to change currency. Only used for coshopping
	try {
		if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {	
			dojo.byId('SetCurrencyPreferenceForm').URL.value= 
					dojo.byId('SetCurrencyPreferenceForm').URL.value + "&coshopChangeCurrency=" +
					dojo.byId('currencySelection').options[dojo.byId('currencySelection').selectedIndex].value;
		}
	}catch(err) {
		console.log(err);
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

/**
 * This function closes all dijit.dialogs on the page. 
 */
function closeAllDialogs(){
	dijit.registry.byClass("dijit.Dialog").forEach(function(w){w.hide()});
}
 
/**
 * This function store a error key in the cookie. The error key will be used to retrieve error messages. 
 * @param {String} errorKey  The key used to retrieve error/warning messages. 
 */
function setWarningMessageCookie(errorKey) {
	dojo.cookie("signon_warning_cookie",errorKey, {path: "/"});
}
/**
* This function removes a cookie
* @param {String} name the name of the cookie to be removed. 
*/
function removeCookie(name) {
	dojo.cookie(name, null, {expires: -1});
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

/**
* updateParamObject This function updates the given params object with a key to value pair mapping.
*				    If the toArray value is true, It creates an Array for duplicate entries otherwise it overwrites the old value.
*			        This is useful while making a service call which accepts a few parameters of type array.
*					This function is used to prepare a a map of parameters which can be passed to XMLHttpRequests. 
* 					The keys in this parameter map will be the name of the parameter to send and the value is the corresponding value for each parameter key.
* @param {Object} params The parameters object to add name value pairs to.
* @param {String} key The new key to add.
* @param {String} value The new value to add to the specified key.
* @param {Boolean} toArray Set to true to turn duplicate keys into an array, or false to override previous values for a specified key.
* @param {int} index The index in an array of values for a specified key in which to place a new value.
*
* @return {Object} params A parameters object holding name value pairs.
*
**/
function updateParamObject(params, key, value, toArray, index){
	
	if(params == null) {
		params = [];
	}
	if(params[key] != null && toArray) {
		if(dojo.lang.isArrayLike(params[key])) {
			//3rd time onwards
			if(index != null && index != "") {
				//overwrite the old value at specified index
				params[key][index] = value;
			} else {
				params[key].push(value);
			}
		} else {
			//2nd time
			var tmpValue = params[key];
			params[key] = [];
			params[key].push(tmpValue);
			params[key].push(value);
		}
   } else {
	   //1st time
	   if(index != null && index != "" && index != -1) {
		   //overwrite the old value at specified index
		   params[key+"_"+index] = value;
	   } else if(index == -1) {
		   var i = 1;
		   while(params[key + "_" + i] != null) {
			   i++;
		   }
		   params[key + "_" + i] = value;
	   } else {
		   params[key] = value;
	   }
   }
   return params;
 }

/** 
 * Show the html element
 * 
 * @param {string} id The id of the section to show.
 */
function showSection (id){
	var section = dojo.byId(id);
	if(section!=null && section!='undefined'){
		section.style.visibility="visible";
	}
}

/** 
 * Hides the html element.
 * 
 * @param {string} id The id of the section to hide. 
 */	
function hideSection (id){
	var section = dojo.byId(id);
	if(section!=null && section!='undefined'){
		section.style.visibility="";
	}
}
 
/** 
 * hides the section if the user clicks shift+tab.
 * 
 * @param {string} id The id of the div area to hide. 
 * @param {event} event The keystroke event entered by the user. 
 */	
function shiftTabHideSection (id, event){
	if (event.shiftKey && (event.keyCode == dojo.keys.TAB)){
		hideSection(id);
	} 
}

/** 
 * hides the section if the user clicks tab.
 * 
 * @param {string} id The id of the div area to hide. 
 * @param {event} event The keystroke event entered by the user. 
 */	
function tabHideSection (id, event, nextId){
	if (!event.shiftKey && (event.keyCode == dojo.keys.TAB)){
		if(null != nextId){
			dojo.byId(nextId).focus();
		}
		hideSection(id);
		dojo.stopEvent(event);
	} 
}

/**
 * Saves whether the shift and tab keys were pressed or not.  Ignores tab.
 * @param {event} event The event that happened by pressing a key
 */
function saveShiftTabPress(event) {
	if (event.shiftKey == true && event.keyCode == 9) {
		tabPressed = true;
	}
}

/**
 * Saves whether the tab key was pressed or not.  Ignores SHIFT-tab.
 * @param {event} event The event that happened by pressing a key
 */
function saveTabPress(event) {
	if (event.shiftKey == false && event.keyCode == 9) {
		tabPressed = true;
	}
}
/**
 * Sets the focus to the given form element if a tab or shift-tab was pressed.  Workaround to tabbing from a country dropdown
 * to a dynamic state element that becomes a dropdown when it was a textbox and vice versa.  Defect was Firefox specific. 
 * @param {String} formElementId The form element id to set the focus to
 */
function setFocus(formElementId) {
	if (tabPressed) {
		tabPressed = false;
		document.getElementById(formElementId).focus();
	}
}

/**
 * Increase the height of a container due to the addition of a message
 * @param ${String} The id of the container whose height will be increased
 * @param ${Integer} Number of pixels to increase height by
 */
function increaseHeight(containerId, increase) {
	var temp = document.getElementById(containerId).offsetHeight;
	document.getElementById(containerId).style.height = (temp + increase) + 'px';
}


function redirectToSignOn(forcedUrl) {
	if(typeof(forcedUrl)!='undefined'){
		var currentURL = forcedUrl;
	}else{
		var currentURL = location.href;
	}
	currentURL = "OrderItemMove?continue=1&createIfEmpty=1&updatePrices=0&deleteIfEmpty=*&fromOrderId=*&toOrderId=.&page=&calculationUsageId=-1&URL="+encodeURIComponent("OrderCalculate?URL="+encodeURIComponent(currentURL));
	document.location.href = "LogonForm?myAcctMain=1&storeId="
			+ WCParamJS.storeId + "&catalogId=" + WCParamJS.catalogId
			+ "&langId=" + WCParamJS.langId + "&URL=" + encodeURIComponent(currentURL);
}

/**
 * Keeps track of the current quick info/compare touch event in tablets
 * @param ${String} link The link of the product detail page
 * @param ${String} newPopup The id of the new product quick info/compare touched
 */
function handlePopup(link,newPopup) {
	if (currentPopup == newPopup){
		document.location.href = link;
	} else {
		currentPopup = newPopup;
	}
}

/**
 * Check to see if the device in use is running the android OS
 * @return {boolean} Indicates whether the device is running android
 */
function isAndroid() {
	if(android == null){
		if(navigator != null){
			if(navigator.userAgent != null){
				var ua = navigator.userAgent.toLowerCase();
				android = ua.indexOf("android") > -1; 
			}
		}
	}
	return android;
}

/**
 * Check to see if the device in use is running iOS
 * @return {boolean} Indicates whether the device is running iOS
 */
function isIOS() {
	if(ios == null){
		if(navigator != null){
			if(navigator.userAgent != null){
				var ua = navigator.userAgent.toLowerCase();
				ios = (ua.indexOf("ipad") > -1) || (ua.indexOf("iphone") > -1) || (ua.indexOf("ipod") > -1); 
			}
		}
	}
	return ios;
}


/**
* This function highlight all marketing spots and catalog objects in preview mode, overwriting the implementation in site level (StorePreviewerHeader.jsp)
*/
function outlineSpots(){
	dojo.addClass(document.body,'editMode');
	dojo.query(".ESpotInfo").style({ display:"block" });
	dojo.query(".searchScore").style({ display:"block" });
	var all = dojo.query(".genericESpot,.product,.searchResultSpot,.productDetail,.categorySpot");
	for (var i = 0; i < all.length; i++) {
		var currEl = all[i];
		if(dojo.hasClass(currEl,"emptyESpot")){
			var elementWidth = dojo.query('.ESpotInfo',currEl)[0].offsetWidth+4;
			var elementHeight = dojo.query('.ESpotInfo',currEl)[0].offsetHeight+4;
			dojo.attr(currEl,'_width',dojo.style(currEl,'width'));
			dojo.attr(currEl,'_height',dojo.style(currEl,'height'));
			dojo.style(currEl,{'width':+elementWidth+'px','height':elementHeight+'px'});
			
		}
	 	if(dojo.query(".borderCaption",currEl).length==0){
	 		dojo.place("<div class='borderCaption'></div>",currEl,'first');
	 	}else{
	 		dojo.query(".borderCaption",currEl).style({'display':'block'});
	 	}
		if(currEl.addEventListener){
			currEl.addEventListener('mouseover',function(evt){
				if(!window.parent.frames[0].isSpotsShown()){return;}
				dojo.query(".caption").style({ display:"none" });
				dojo.style(dojo.query(".caption",this)[0],{ display:"block" });
				evt.stopPropagation();
			},false);
			currEl.addEventListener('mouseout',function(evt){
				if(!window.parent.frames[0].isSpotsShown()){return;}
				dojo.query(".caption",this).style({ display:"none" });
				evt.stopPropagation();
			},false);
		}else if(currEl.attachEvent){
			currEl.onmouseover=(
				(function(currEl){
					return (function(){
						if(!window.parent.frames[0].isSpotsShown()){return;}
						dojo.query(".caption").style({ display:"none" });
						dojo.style(dojo.query(".caption",currEl)[0],{ display:"block" });
						window.event.cancelBubble = true;
					});
				})(currEl)
			);
			currEl.onmouseleave=(
				(function(currEl){
					return (function(){
						if(!window.parent.frames[0].isSpotsShown()){return;}
						dojo.query(".caption",currEl).style({ display:"none" });
						window.event.cancelBubble = true;
						
					});
				})(currEl)
			);
		}
	}
}

/**
* This function un-highlight all marketing spots and catalog objects in preview mode, overwriting the implementation in site level (StorePreviewerHeader.jsp)
*/
function hideSpots(){
	dojo.removeClass(document.body,'editMode');
	dojo.query(".ESpotInfo").style({ display:"none" });
	dojo.query(".caption").style({ display:"none" });
	dojo.query(".searchScore").style({ display:"none" });
	dojo.query(".borderCaption").style({ display:"none" });
	dojo.query(".emptyESpot").forEach(function(e){
		dojo.style(e,{'width':dojo.attr(e,'_width')+'px'});
		dojo.style(e,{'height':dojo.attr(e,'_height')+'px'});
		});
	
}

/**
* This function resets the mini cart cookie values, then continues to log off the shopper.
*/
function logout(url){
	setDeleteCartCookie();
	document.location.href = url;
}


/**
 * Custom Delete orderitem from cart fucntion for HP requirement.
 * This function deletes an order item from the shopping cart.
 *
 * @param {Integer} orderItemId The ID of the order item to delete.
 */
function deleteFromMiniCart(orderItemId){

var params = [];
params.storeId = WCParamJS.storeId;
params.catalogId = WCParamJS.catalogId;
params.langId = WCParamJS.langId;
//params.orderId = (this.orderId != null && this.orderId != 'undefined'&& this.orderId != "")?this.orderId:".";
params.orderId = ".";
params.orderItemId = orderItemId;
if(this.shoppingCartPage){
params.calculationUsage = "-1,-2,-5,-6,-7";
}else{
params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
}
params.check="*n";

//For handling multiple clicks
if(!submitRequest()){
//return;
}
cursor_wait();

wc.service.invoke("AjaxDeleteOrderItemTcs", params);

}

/***************StoreCommonUtilities.js ends*****************/

/***************ShoppingActions.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

shoppingActionsJS={

	/** The language ID currently in use **/
	langId: "-1",
	
	/** The store ID currently in use **/
	storeId: "",
	
	/** The catalog ID currently in use **/
	catalogId: "",
	
	/** Holds the current user type such as guest or registered user. Allowed values are 'G' for guest and 'R' for registered.**/
	userType:"",
	
	/** A boolean used in a variety of the add to cart methods to tell whether or not the base item was added to the cart. **/
	baseItemAddedToCart:false,
	
	/** An array of entitled items which is used in various methods throughout ShoppingActions.js **/
	entitledItems:[],
	
	/** a JSON object that holds attributes of an entitled item **/
    entitledItemJsonObject: null,
	
	/** A map of attribute name value pairs for the currently selected attribute values **/
	selectedAttributesList:new Object(),
	
	/** A variable used to form the url dynamically for the more info link in the Quickinfo popup */
	moreInfoUrl :"",
	
	/**
	* A boolean used to to determine is it from a Qick info popup or not. 
	**/
	isPopup : false,
	
	/**
	* A boolean used to to determine whether or not to diplay the price range when the catEntry is selected. 
	**/
	displayPriceRange : true,

	/**
	* This array holds the json object retured from the service, holding the price information of the catEntry.
	**/
	itemPriceJsonOject : [],
	
	/** 
	* stores all name and value of all swatches 
	* this is a 2 dimension array and each record i contains the following information:
	* allSwatchesArray[i][0] - attribute name of the swatch
	* allSwatchesArray[i][1] - attribute value of the swatch
	* allSwatchesArray[i][2] - image1 of swatch (image to use for enabled state)
	* allSwatchesArray[i][3] - image2 of swatch (image to use for disabled state)
	* allSwatchesArray[i][4] - onclick action of the swatch when enabled
	**/
	allSwatchesArrayList : new Object(),
	
	/**
	* Holds the ID of the image used for swatch
	**/
	skuImageId:"",
	
	/**
	 * The prefix of the cookie key that is used to store item Ids. 
	 */
	cookieKeyPrefix: "CompareItems_",
	
	/**
	 * The delimiter used to separate item Ids in the cookie.
	 */
	cookieDelimiter: ";",
	
	/**
	 * The maximum number of items allowed in the compare zone. 
	 */
	maxNumberProductsAllowedToCompare: 4,
	
	/**
	 * The minimum number of items allowed in the compare zone. 
	 */
	minNumberProductsAllowedToCompare: 2,
	
	/**
	 * Id of the base catalog entry. 
	 */
	baseCatalogEntryId: 0,

	/**
	 * An map which holds the attributes of a set of products
	 */
	selectedProducts: new Object(),
	
	/**
	 * An array to keep the quantity of the products in a list (bundle)
	 */
	productList: new Object(),
	
	/**
	 * stores the currency symbol
	 */
	currencySymbol: "",
	
	/**
	 * stores the compare return page name
	 */
	compareReturnName: "",
	/**
	 * stores the search term
	 */
	searchTerm: "",
	
	/**
	 * An array to keep the details of the newly added products.
	 */
	productAddedList: new Object(),	
	
	setCompareReturnName:function(compareReturnName){
		this.compareReturnName = compareReturnName;
	},
	
	setSearchTerm:function(searchTerm){
		this.searchTerm = searchTerm;
	},
	
	setCommonParameters:function(langId,storeId,catalogId,userType,currencySymbol){
		this.langId = langId;
		this.storeId = storeId;
		this.catalogId = catalogId;
		this.userType = userType;
		this.currencySymbol = currencySymbol;
	},
	
	setEntitledItems : function(entitledItemArray){
		this.entitledItems = entitledItemArray;
	},
	
	getCatalogEntryId : function(entitledItemId){
		var attributeArray = [];
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveSKU(attributeArray);
	},
	
	/**
	* getCatalogEntryIdforProduct Returns the catalog entry ID for a catalog entry that has the same attribute values as a specified product's selected attributes as passed in via the selectedAttributes parameter.
	*
	* @param {String[]} selectedAttributes The array of selected attributes upon which to resolve the SKU.
	*
	* @return {String} catalog entry ID of the SKU.
	*
	**/
	getCatalogEntryIdforProduct : function(selectedAttributes){
		var attributeArray = [];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveSKU(attributeArray);
	},
	
	/**
     * retrieves the entitledItemJsonObject
     */
    getEntitledItemJsonObject: function () {
    	return this.entitledItemJsonObject;
    },
	
	/**
	* resolveSKU Resolves a SKU using an array of defining attributes.
	*
	* @param {String[]} attributeArray An array of defining attributes upon which to resolve a SKU.
	*
	* @return {String} catentry_id The catalog entry ID of the SKU.
	*
	**/
	resolveSKU : function(attributeArray){
	
		console.debug("Resolving SKU >> " + attributeArray +">>"+ this.entitledItems);
		var catentry_id = "";
		var attributeArrayCount = attributeArray.length;
		
		// if there is only one item, no need to check the attributes to resolve the sku
		if(this.entitledItems.length == 1){
			return this.entitledItems[0].catentry_id;
		}
		for(x in this.entitledItems){
			var catentry_id = this.entitledItems[x].catentry_id;
			var Attributes = this.entitledItems[x].Attributes;
			var attributeCount = 0;
			for(index in Attributes){
				attributeCount ++;
			}

			// Handle special case where a catalog entry has one sku with no attributes
			if (attributeArrayCount == 0 && attributeCount == 0){
				return catentry_id;
			}
			if(attributeCount != 0 && attributeArrayCount >= attributeCount){
				var matchedAttributeCount = 0;

				for(attributeName in attributeArray){
					var attributeValue = attributeArray[attributeName];
					if(attributeValue in Attributes){
						matchedAttributeCount ++;
					}
				}
				
				if(attributeCount == matchedAttributeCount){
					console.debug("CatEntryId:" + catentry_id + " for Attribute: " + attributeArray);
					return catentry_id;
				}
			}
		}
		return null;
	},
	
	/**
	* setSelectedAttribute Sets the selected attribute value for a particular attribute not in reference to any catalog entry.
	*					   One place this function is used is on CachedProductOnlyDisplay.jsp where there is a drop down box of attributes.
	*					   When an attribute is selected from that drop down this method is called to update the selected value for that attribute.
	*
	* @param {String} selectedAttributeName The name of the attribute.
	* @param {String} selectedAttributeValue The value of the selected attribute.
	* @param {String} entitledItemId The element id where the json object of the sku is stored
	* @param {String} skuImageId This is optional. The element id of the product image - image element id is different in product page and category list view. Product page need not pass it because it is set separately
	* @param {String} imageField This is optional. The json field from which image should be picked. Pass value if a different size image need to be picked
	*
	**/
	setSelectedAttribute : function(selectedAttributeName , selectedAttributeValue, entitledItemId, skuImageId, imageField){ 
		console.debug(selectedAttributeName +" : "+ selectedAttributeValue);
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		if(selectedAttributes == null){
			selectedAttributes = new Object();
		}
		selectedAttributes[selectedAttributeName] = selectedAttributeValue;
		this.moreInfoUrl=this.moreInfoUrl+'&'+selectedAttributeName+'='+selectedAttributeValue;
		this.selectedAttributesList[entitledItemId] = selectedAttributes;
		this.changeProdImage(entitledItemId, selectedAttributeName, selectedAttributeValue, skuImageId, imageField);
	},
	
	/**
	* setSelectedAttributeOfProduct Sets the selected attribute value for an attribute of a specified product.
	*								This function is used to set the assigned value of defining attributes to specific 
	*								products which will be stored in the selectedProducts map.
	*
	* @param {String} productId The catalog entry ID of the catalog entry to use.
	* @param {String} selectedAttributeName The name of the attribute.
	* @param {String} selectedAttributeValue The value of the selected attribute.
	* @param {boolean} true, if it is single SKU
	*
	**/
	setSelectedAttributeOfProduct : function(productId,selectedAttributeName,selectedAttributeValue, isSingleSKU){
		
		var selectedAttributesForProduct = null;

		if(this.selectedProducts[productId]){
			selectedAttributesForProduct = this.selectedProducts[productId];
		} else {
			selectedAttributesForProduct = new Object();
		}
		
		// add only if attribute has some name. value can be empty
		if(null != selectedAttributeName && '' != selectedAttributeName){
			selectedAttributesForProduct[selectedAttributeName] = selectedAttributeValue;
		}
		this.selectedProducts[productId] = selectedAttributesForProduct;
		
		//the json object for entitled items are already in the HTML. 
		var entitledItemJSON = eval('('+ dojo.byId("entitledItem_"+productId).innerHTML +')');

		this.setEntitledItems(entitledItemJSON);
		
		var catalogEntryId = this.getCatalogEntryIdforProduct(selectedAttributesForProduct);
		
		if(catalogEntryId == null) {
			catalogEntryId = 0;
		} else {
			// pass true to display price range
			this.changePrice("entitledItem_"+productId, false, true, productId);
			
			//Update selected sku in merchandising association array
			if(MerchandisingAssociationJS != null){
				if(MerchandisingAssociationJS.baseItemParams != null){
					if(MerchandisingAssociationJS.baseItemParams.type=='BundleBean'){
						// Update items in the bundle
						for(idx=0;idx<MerchandisingAssociationJS.baseItemParams.components.length;idx++){
							if(productId == MerchandisingAssociationJS.baseItemParams.components[idx].productId){
								MerchandisingAssociationJS.baseItemParams.components[idx].id = catalogEntryId;
							}
						}
					}
				}
			}			
		}
		var productDetails = null;
		if(this.productList[productId]){
			productDetails = this.productList[productId];
		} else {
			productDetails = new Object();
			this.productList[productId] = productDetails;
			productDetails.baseItemId = productId;
		}
		
		productDetails.id = catalogEntryId;
		if(productDetails.quantity){
			dojo.publish('quantityChanged', [dojo.toJson(productDetails)]);
		}
		
		if(!isSingleSKU){
			// publish the attribute change event
			dojo.publish('attributesChanged_'+productId, [dojo.toJson(selectedAttributesForProduct)]);
		}
	},
	
	/**
	* Add2ShopCartAjax This function is used to add a catalog entry to the shopping cart using an AJAX call. This will resolve the catentryId using entitledItemId and adds the item to the cart.
	*				This function will resolve the SKU based on the entitledItemId passed in and call {@link fastFinderJS.AddItem2ShopCartAjax}.
	* @param {String} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {int} quantity The quantity of the item to add to the cart.
	* @param {String} isPopup If the value is true, then this implies that the function was called from a quick info pop-up. 	
	* @param {Object} customParams - Any additional parameters that needs to be passed during service invocation.
	*
	**/
	Add2ShopCartAjax : function(entitledItemId,productId,quantity,isPopup,customParams)
	{	
		var entitledItemJSON;

		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
		var catalogEntryId = this.getCatalogEntryId(entitledItemId);
		
		if(catalogEntryId!=null){
			var productId = entitledItemId.substring(entitledItemId.indexOf("_")+1);
			this.AddItem2ShopCartAjax(catalogEntryId , quantity,customParams, productId);
			this.baseItemAddedToCart=true;
			if(dijit.byId('second_level_category_popup') != null){
				hidePopup('second_level_category_popup');
			}
		}
		else if (isPopup == true){
			dojo.byId('second_level_category_popup').style.zIndex = '1';
			MessageHelper.formErrorHandleClient('addToCartLinkAjax', storeNLS['ERR_RESOLVING_SKU']);			
		} else{
			MessageHelper.displayErrorMessage(storeNLS['ERR_RESOLVING_SKU']);
			this.baseItemAddedToCart=false;
		}
	},
	
	AddItem2ShopCartAjax : function(catEntryIdentifier, quantity, customParams, productId)
	{
		var params = [];
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.orderId		= ".";
		params.calculationUsage = "-1,-2,-5,-6,-7";
		params.inventoryValidation = "true";
		params.URL= "";
		params.updatePrices = "1";
		params.isGC="N";
		if ($("#gift-form").length){
		params.isGC="Y";
		params.gcPrice=$("#gcPrice").val();
		params.gcMessage=$("#gc_message").val();
		params.gcToName=$("#gcToName").val();
		params.gcFromName=$("#gcFromName").val();
		params.gcType=$("#gcType").val();
		
		if(("#email_field").length){
		params.gcMail=$("#email_field").val();} 
		params.gcPartNumber=$("#gcPartNumber").val();
		if($("#editGC").length)
		params.editGC=$("#editGC").val();
		if($("#editGCOrderItem").length)
			params.editGCOrderItem=$("#editGCOrderItem").val();
		}
		var ajaxShopCartService = "AddToCartAjax";
		
		this.productAddedList = new Object();
		params.catEntryId	= catEntryIdentifier;
		params.quantity		= quantity;
		
		//Pass any other customParams set by other add on features
		if(customParams != null && customParams != 'undefined'){
			for(i in customParams){
				params[i] = customParams[i];
			}
		}

		//For Handling multiple clicks
		if(!submitRequest()){
			//return;
		}   

		cursor_wait();
		shoppingActionsServicesDeclarationJS.setCommonParameters(this.langId,this.storeId,this.catalogId);
		  if(customParams == true){
            wc.service.invoke(ajaxShopCartService, params)
	    }
	    else{
            wc.service.invoke(ajaxShopCartService, params);
        }
		this.baseItemAddedToCart=true;
		
		if (customParams != null && customParams != 'undefined' && customParams['catalogEntryType'] == 'dynamicKit') {
	var storeID=this.storeId;
	var langID=this.langId;
	var catalogID=this.catalogId;
			
			// Calling the AJAX 'AddPreConfigurationToCart' service for Dynamic Kits & then re-directing to the SHopping Cart page
			dojo.xhrPost({
				url: "AjaxOrderChangeServiceAddPreConfigurationToCart",			
				handleAs: "json-comment-filtered",
				content: params,
				load: function(response, ioArgs) {
					var dkOrderId = response.orderId;
					if (dkOrderId != null && dkOrderId != 'undefined') {
						console.debug("response --> order ID: " + dkOrderId + " - order item ID: " + response.orderItemId);
						console.debug("Calling Shopping Cart Display");
						this.baseItemAddedToCart=true;
						var configureURL = "OrderItemDisplay?storeId=" + storeID + "&catalogId=" + catalogID + "&langId=" + langID;
						document.location.href = getAbsoluteURL() + configureURL;
					} else {
						console.debug("ERROR Adding DK/CTO-product to the Cart --> errorCode: " + response.errorCode + " - errorMessageKey: " + response.errorMessageKey + " - errorMessage: " + response.errorMessage);
						alert("ERROR Adding DK/CTO-product to the Cart. errorCode: " + response.errorCode + " - errorMessageKey: " + response.errorMessageKey + " - errorMessage: " + response.errorMessage);
					}
				},
				error: function(errObj,ioArgs) {
					console.debug("errObj: " + errObj + " - ioArgs: " + ioArgs);
					console.debug("ShoppingActions.AddPreConfigurationToCart: Unexpected error occurred during an xhrPost request.");
				}
			});
			
		} else {
			//wc.service.invoke(ajaxShopCartService, params);
			this.baseItemAddedToCart=true;
		
			
		}
	},

/* for finders */

AddItem2ShopCartAjaxforfinder : function()
	{

var params = [];
var quantityMap = {};
var chkArray=[];
var selectedCheckBoxes=$('input[name=chk]:checked');

console.log(selectedCheckBoxes);

var i=1;
j=0;
for(i=1;i<(selectedCheckBoxes.length+1);i++)	
{


params["catEntryId_" + i] = selectedCheckBoxes[j].value;

chkArray[j]=selectedCheckBoxes[j].value;
params["quantity_" + i] = document.getElementById(chkArray[j]+'_dropdown').value;

j++;

}
console.log(chkArray);
console.log(quantityMap);

		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.orderId		= ".";
		params.calculationUsage = "-1,-2,-5,-6,-7";
		params.inventoryValidation = "true";
		params.URL= "";
		params.updatePrices = "1";
		var ajaxShopCartService = "AddToCartAjax";
		
		this.productAddedList = new Object();

		//For Handling multiple clicks
		if(!submitRequest()){
			//return;
		}   
		cursor_wait();
	    shoppingActionsServicesDeclarationJS.setCommonParameters(this.langId,this.storeId,this.catalogId);
        wc.service.invoke(ajaxShopCartService, params);
		this.baseItemAddedToCart=true;
	
	},



AddItem2ShopCartAjaxforfinderpaper : function()
	{


var params = [];
var quantityMap = {};
var chkArray=[];
var selectedCheckBoxes=$('input[name=chk1]:checked');

console.log(selectedCheckBoxes);

var i=1;
j=0;
for(i=1;i<(selectedCheckBoxes.length+1);i++)	
{


params["catEntryId_" + i] = selectedCheckBoxes[j].value;

chkArray[j]=selectedCheckBoxes[j].value;
params["quantity_" + i] = document.getElementById(chkArray[j]+'_dropdown').value;

j++;

}
console.log(chkArray);
console.log(quantityMap);

		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.orderId		= ".";
		params.calculationUsage = "-1,-2,-5,-6,-7";
		params.inventoryValidation = "true";
		params.URL= "";
		params.updatePrices = "1";
		//var ajaxShopCartService = "AddOrderItem";
		var ajaxShopCartService = "AddToCartAjax";
		this.productAddedList = new Object();
		//For Handling multiple clicks
		if(!submitRequest()){
			//return;
		}   
		cursor_wait();
	    shoppingActionsServicesDeclarationJS.setCommonParameters(this.langId,this.storeId,this.catalogId);
         wc.service.invoke(ajaxShopCartService, params);
		this.baseItemAddedToCart=true;
	
	},

 /* Add sku to cart */
	
	AddSKU2ShopCartAjax : function(itemId,productId,quantity,isPopup,customParams)
	{	
		if ((itemId==null || itemId=="") &&  $("#gcPartNumber").length){
			itemId=$("#gcPartNumber").val();
		}	
		$("body").append("<div style:visibility='hidden'> <input type='hidden' id='PDPSku' value='"+itemId+"_"+productId+"' /> </div>");
		cursor_wait();
		if(itemId!=null){
			this.AddItem2ShopCartAjax(itemId , quantity,customParams, productId);
			this.baseItemAddedToCart=true;
			
		}
		else{
			
			MessageHelper.displayErrorMessage(storeNLS['ERR_RESOLVING_SKU']);
			this.baseItemAddedToCart=false;
			console.debug("Item ID is NULL --> "+itemId +"Product ID is -->"+productId+"Add to cart is failed");
			
		}
	},

	
	/**
	* AddBundle2ShopCartAjax This function is used to add a bundle to the shopping cart.
	**/
	AddBundle2ShopCartAjax : function(){
		var ajaxShopCartService = "AddOrderItem";
		var params = [];

		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.orderId		= ".";
		params.calculationUsage = "-1,-2,-5,-6,-7";
		params.inventoryValidation = "true";
		
		var idx = 1;
		this.productAddedList = new Object();
		for(productId in this.productList){
			var productDetails = this.productList[productId];
			if(productDetails.id == 0){
				MessageHelper.displayErrorMessage(storeNLS['ERR_RESOLVING_SKU']);
				return;
			}
			var quantity = dojo.number.parse(productDetails.quantity);
			if(isNaN(quantity) || quantity <= 0){
				MessageHelper.displayErrorMessage(storeNLS['QUANTITY_INPUT_ERROR']);
				return;
			}
			params["catEntryId_" + idx] = productDetails.id;
			params["quantity_" + idx++] = quantity;
			this.baseItemAddedToCart=true;
			
			this.saveAddedProductInfo(quantity, productId, productDetails.id, this.selectedProducts[productId]);
		}

		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   		
		cursor_wait();		
		wc.service.invoke(ajaxShopCartService, params);

	},
	
	/**
	* Save the product information of the newly added product(s) to be used for the mini cart product added popup
	*
	* @param {String} quantity The quantity of the product being purchased.
	* @param {String} productId The id of the product.
	* @param {String} skuId The id of the sku.
	* @param {String} attrList The list of selected attributes for the product, if any.
	**/	
	saveAddedProductInfo:function(quantity, productId, skuId, attrList){
	
		var productName = "";
		if(document.getElementById("ProductInfoName_"+productId) != null){
			productName = document.getElementById("ProductInfoName_"+productId).value;
		} else if(document.getElementById("ProductInfoName_"+skuId) != null){
			productName = document.getElementById("ProductInfoName_"+skuId).value;
		}
		
		var productThumbnail = "";
		if(document.getElementById("ProductInfoImage_"+productId) != null){
			productThumbnail = document.getElementById("ProductInfoImage_"+productId).value;
		} else if(document.getElementById("ProductInfoImage_"+skuId) != null){
			productThumbnail = document.getElementById("ProductInfoImage_"+skuId).value;
		}
		
		var productPrice = "";
		if(document.getElementById('ProductInfoPrice_'+productId) != null){
			productPrice = document.getElementById('ProductInfoPrice_'+productId).value;
		} else if(document.getElementById('ProductInfoPrice_'+skuId) != null){
			productPrice = document.getElementById('ProductInfoPrice_'+skuId).value;
		}
		
		var productAdded = [productName, productThumbnail, productPrice, quantity, attrList];
		if(productId != skuId){
			this.productAddedList[skuId] = productAdded;
		} else {
			this.productAddedList[productId] = productAdded;
		}
	},
	
	/* SwatchCode start */

	/**
	*setSKUImageId Sets the ID of the image to use for swatch.
	**/
	setSKUImageId:function(skuImageId){
		this.skuImageId = skuImageId;
	},
	
	/**
	* getImageForSKU Returns the full image of the catalog entry with the selected attributes as specified in the {@link fastFinderJS.selectedAttributes} value.
	*					This method uses resolveImageForSKU to find the SKU image with the selected attributes values.
	*
	* @param {String} imageField, the field name from which the image should be picked
	* @return {String} path to the SKU image.
	* 
	*
	**/
	getImageForSKU : function(entitledItemId, imageField){
		var attributeArray = [];
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveImageForSKU(attributeArray, imageField);
	},
	
	/**
	* resolveImageForSKU Resolves image of a SKU using an array of defining attributes.
	*
	* @param {String[]} attributeArray An array of defining attributes upon which to resolve a SKU.
	* @param {String} imageField, the field name from which the image should be picked
	*
	* @return {String} imagePath The location of SKU image.
	*
	**/
	resolveImageForSKU : function(attributeArray, imageField){
	
		console.debug("Resolving SKU >> " + attributeArray +">>"+ this.entitledItems);
		var imagePath = "";
		var attributeArrayCount = attributeArray.length;
		
		for(x in this.entitledItems){
			if(null != imageField){
				var imagePath = this.entitledItems[x][imageField];
			} else {
			var imagePath = this.entitledItems[x].ItemImage467;
			}
			
			var Attributes = this.entitledItems[x].Attributes;
			var attributeCount = 0;
			for(index in Attributes){
				attributeCount ++;
			}

			// Handle special case where a catalog entry has one sku with no attributes
			if (attributeArrayCount == 0 && attributeCount == 0){
				return imagePath;
			}
			if(attributeCount != 0 && attributeArrayCount >= attributeCount){
				var matchedAttributeCount = 0;

				for(attributeName in attributeArray){
					var attributeValue = attributeArray[attributeName];
					if(attributeValue in Attributes){
						matchedAttributeCount ++;
					}
				}
				
				if(attributeCount == matchedAttributeCount){
					console.debug("ItemImage:" + imagePath + " for Attribute: " + attributeArray);
					var imageArray = [];
					imageArray.push(imagePath);
					imageArray.push(this.entitledItems[x].ItemThumbnailImage);
					if(this.entitledItems[x].ItemAngleThumbnail != null && this.entitledItems[x].ItemAngleThumbnail != undefined){
						imageArray.push(this.entitledItems[x].ItemAngleThumbnail);
						imageArray.push(this.entitledItems[x].ItemAngleFullImage);
					}
					return imageArray;
				}
			}
		}
		return null;
	},


	/**
	* changeViewImages Updates the angle views of the SKU.
	*
	* @param {String[]} itemAngleThumbnail An array of SKU view thumbnails.
	* @param {String[]} itemAngleFullImage An array of SKU view full images.
	**/
	changeViewImages : function(itemAngleThumbnail, itemAngleFullImage){
		var imageCount = 0;
		for (x in itemAngleThumbnail) {
			var prodAngleCount = imageCount;
			imageCount++;
			if(null != dojo.byId("WC_CachedProductOnlyDisplay_images_1_" + imageCount)){
				dojo.byId("WC_CachedProductOnlyDisplay_images_1_" + imageCount).src = itemAngleThumbnail[x];
			}
			if(null != dojo.byId("WC_CachedProductOnlyDisplay_links_1_" + imageCount)){
				dojo.byId("WC_CachedProductOnlyDisplay_links_1_" + imageCount).href =
					"JavaScript:changeThumbNail('productAngleLi" + prodAngleCount + "','" + itemAngleFullImage[x] + "');";
			}
			
			if(null != dojo.byId("productAngleLi" + prodAngleCount) && dojo.byId("productAngleLi" + prodAngleCount).className == "selected"){
				changeThumbNail("productAngleLi" + prodAngleCount, itemAngleFullImage[x]);
			}
		}
	},

	
	/**
	* updates the product image from the PDP page to use the selected SKU image
	* @param String swatchAttrName the newly selection attribute name
	* @param String swatchAttrValue the newly selection attribute value
	* @param {String} imageField, the field name from which the image should be picked
	**/
	changeProdImage: function(entitledItemId, swatchAttrName, swatchAttrValue, skuImageId, imageField){
		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}

		this.setEntitledItems(entitledItemJSON);
		var productId = entitledItemId.substring(entitledItemId.indexOf("_")+1);

		var skuImage = null;
		var imageArr = shoppingActionsJS.getImageForSKU(entitledItemId, imageField);
		if(imageArr != null){
			skuImage = imageArr[0];
		}
		
		if(skuImageId != undefined){
			this.setSKUImageId(skuImageId);
		}
		
		if(skuImage != null){
			if(dojo.byId(this.skuImageId) != null){
				document.getElementById(this.skuImageId).src = skuImage;	
				if(document.getElementById("ProductInfoImage_"+productId) != null){
					document.getElementById("ProductInfoImage_"+productId).value = skuImage;
				}				
				
				var itemAngleThumbnail = imageArr[2];
				var itemAngleFullImage = imageArr[3];
				if(itemAngleThumbnail != null && itemAngleThumbnail != undefined){
					shoppingActionsJS.changeViewImages(itemAngleThumbnail, itemAngleFullImage);
				}
			}
		} else {
			var imageFound = false;
			for (x in this.entitledItems) {
				var Attributes = this.entitledItems[x].Attributes;
				if(null != imageField){
					var itemImage = this.entitledItems[x][imageField];
				} else {
				var itemImage = this.entitledItems[x].ItemImage467;
				}
				
				
				var itemAngleThumbnail = this.entitledItems[x].ItemAngleThumbnail;
				var itemAngleFullImage = this.entitledItems[x].ItemAngleFullImage;
	
				for(y in Attributes){
					var index = y.indexOf("_");
					var entitledSwatchName = y.substring(0, index);
					var entitledSwatchValue = y.substring(index+1);	
					
					if (entitledSwatchName == swatchAttrName && entitledSwatchValue == swatchAttrValue) {
						// set sku image only if the img element is present
						if(null != dojo.byId(this.skuImageId)){
							dojo.byId(this.skuImageId).src = itemImage;
							if(document.getElementById("ProductInfoImage_"+productId) != null){
								document.getElementById("ProductInfoImage_"+productId).value = itemImage;
							}
						}	
						if(itemAngleThumbnail != null && itemAngleThumbnail != undefined){
							shoppingActionsJS.changeViewImages(itemAngleThumbnail, itemAngleFullImage);
						}
						imageFound = true;
						break;
					}
				}
				
				if(imageFound){
					break;
				}
			}
		}
	},
	
	/**
	* Updates the swatches selections on list view.
	* Sets up the swatches array and sku images, then selects a default swatch value.
	**/	
	updateSwatchListView: function(){
			var swatchArray = dojo.query("a[id^='swatch_array_']");
			for(var i = 0; i<swatchArray.length; i++){
				var swatchArrayElement = swatchArray[i];
				eval(dojo.attr(swatchArrayElement,"href"));
			}
			
			var swatchSkuImage = dojo.query("a[id^='swatch_setSkuImage_']");
			for(var i = 0; i<swatchSkuImage.length; i++){
				var swatchSkuImageElement = swatchSkuImage[i];
				eval(dojo.attr(swatchSkuImageElement,"href"));
			}			
			
			var swatchDefault = dojo.query("a[id^='swatch_selectDefault_']");
			for(var i = 0; i<swatchDefault.length; i++){
				var swatchDefaultElement = swatchDefault[i];
				eval(dojo.attr(swatchDefaultElement,"href"));
			}		
	},
		
	/**
	* Handles the case when a swatch is selected. Set the border of the selected swatch.
	* @param {String} selectedAttributeName The name of the selected swatch attribute.
	* @param {String} selectedAttributeValue The value of the selected swatch attribute.
	* @param {String} entitledItemId The ID of the SKU
	* @param {String} doNotDisable The name of the swatch attribute that should never be disabled.
	* @param {String} imageField, the field name from which the image should be picked
	* @return boolean Whether the swatch is available for selection
	**/
	selectSwatch: function(selectedAttributeName, selectedAttributeValue, entitledItemId, doNotDisable, skuImageId, imageField) {
		if(dojo.hasClass("swatch_" + entitledItemId + "_" + selectedAttributeValue, "color_swatch_disabled")){
			return;
		}
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		for (attribute in selectedAttributes) {
			if (attribute == selectedAttributeName) {
				// case when the selected swatch is already selected with a value, if the value is different than
				// what's being selected, reset other swatches and deselect the previous value and update selection
				if (selectedAttributes[attribute] != selectedAttributeValue) {
					// deselect previous value and update swatch selection
					var swatchElement = dojo.byId("swatch_" + entitledItemId + "_" + selectedAttributes[attribute]);
					swatchElement.className = "color_swatch";
					swatchElement.src = swatchElement.src.replace("_disabled.png","_enabled.png");
					
					//change the title text of the swatch link
					dojo.byId("swatch_link_" + entitledItemId + "_" + selectedAttributes[attribute]).title = swatchElement.alt;
				}
			}
			if (document.getElementById("swatch_link_" + entitledItemId + "_" + selectedAttributes[attribute]) != null) {
				document.getElementById("swatch_link_" + entitledItemId + "_" + selectedAttributes[attribute]).setAttribute("aria-checked", "false");
			}
		}
		this.makeSwatchSelection(selectedAttributeName, selectedAttributeValue, entitledItemId, doNotDisable, skuImageId, imageField);
	},

	/**
	* Make swatch selection - add to selectedAttribute, select image, and update other swatches and SKU image based on current selection.
	* @param {String} swatchAttrName The name of the selected swatch attribute.
	* @param {String} swatchAttrValue The value of the selected swatch attribute.
	* @param {String} entitledItemId The ID of the SKU.
	* @param {String} doNotDisable The name of the swatch attribute that should never be disabled.	
	* @param {String} skuImageId This is optional. The element id of the product image - image element id is different in product page and category list view. Product page need not pass it because it is set separately
	* @param {String} imageField This is optional. The json field from which image should be picked. Pass value if a different size image need to be picked
	**/
	makeSwatchSelection: function(swatchAttrName, swatchAttrValue, entitledItemId, doNotDisable, skuImageId, imageField) {
		// setSelectedAttribute internally calls changeProdImage method to change product image.
		this.setSelectedAttribute(swatchAttrName, swatchAttrValue, entitledItemId, skuImageId, imageField);
		document.getElementById("swatch_" + entitledItemId + "_" + swatchAttrValue).className = "color_swatch_selected";
		document.getElementById("swatch_link_" + entitledItemId + "_" + swatchAttrValue).setAttribute("aria-checked", "true");
		document.getElementById("swatch_selection_label_" + entitledItemId + "_" + swatchAttrName).className = "header color_swatch_label";
		if (document.getElementById("swatch_selection_" + entitledItemId + "_" + swatchAttrName).style.display == "none") {
			document.getElementById("swatch_selection_" + entitledItemId + "_" + swatchAttrName).style.display = "inline";
		}
		document.getElementById("swatch_selection_" + entitledItemId + "_" + swatchAttrName).innerHTML = swatchAttrValue;
		this.updateSwatchImages(swatchAttrName, entitledItemId, doNotDisable,imageField);
	},
		
	/**
	* Constructs record and add to this.allSwatchesArray.
	* @param {String} swatchName The name of the swatch attribute.
	* @param {String} swatchValue The value of the swatch attribute.	
	* @param {String} swatchImg1 The path to the swatch image.
	**/
	addToAllSwatchsArray: function(swatchName, swatchValue, swatchImg1, entitledItemId) {
		var swatchList = this.allSwatchesArrayList[entitledItemId];
		if(swatchList == null){
			swatchList = new Array();;
		}
		if (!this.existInAllSwatchsArray(swatchName, swatchValue, swatchList)) {
			var swatchRecord = new Array();
			swatchRecord[0] = swatchName;
			swatchRecord[1] = swatchValue;
			swatchRecord[2] = swatchImg1;
			swatchRecord[4] = document.getElementById("swatch_link_" + entitledItemId + "_" + swatchValue).onclick;
			swatchList.push(swatchRecord);
			this.allSwatchesArrayList[entitledItemId] = swatchList;
		}
	},

	/**
	* Checks if a swatch is already exist in this.allSwatchesArray.
	* @param {String} swatchName The name of the swatch attribute.
	* @param {String} swatchValue The value of the swatch attribute.		
	* @return boolean Value indicating whether or not the specified swatch name and value exists in the allSwatchesArray.
	*/
	existInAllSwatchsArray: function(swatchName, swatchValue, swatchList) {
		for(var i=0; i<swatchList.length; i++) {
			var attrName = swatchList[i][0];
			var attrValue = swatchList[i][1];
			if (attrName == swatchName && attrValue == swatchValue) {
				return true;
			}
		}
		return false;
	},
	
	/**
	* Check the entitledItems array and pre-select the first entited SKU as the default swatch selection.
	* @param {String} entitledItemId The ID of the SKU.
	* @param {String} doNotDisable The name of the swatch attribute that should never be disabled.		
	**/
	makeDefaultSwatchSelection: function(entitledItemId, doNotDisable) {
		if (this.entitledItems.length == 0) {
			if (dojo.byId(entitledItemId)!=null) {
				 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
			}
			this.setEntitledItems(entitledItemJSON);
		}
		
		// need to make selection for every single swatch
		for(x in this.entitledItems){
			var Attributes = this.entitledItems[x].Attributes;
			for(y in Attributes){
				var index = y.indexOf("_");
				var swatchName = y.substring(0, index);
				var swatchValue = y.substring(index+1);
				this.makeSwatchSelection(swatchName, swatchValue, entitledItemId, doNotDisable,imageField);
			}
			break;
		}
	},
	
	/**
	* Update swatch images - this is called after selection of a swatch is made, and this function checks for
	* entitlement and disable swatches that are not available
	* @param selectedAttrName The attribute that is selected
	* @param {String} entitledItemId The ID of the SKU.
	* @param {String} doNotDisable The name of the swatch attribute that should never be disabled.	
	**/
	updateSwatchImages: function(selectedAttrName, entitledItemId, doNotDisable,imageField) {
		var swatchToUpdate = new Array();
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		var selectedAttrValue = selectedAttributes[selectedAttrName];
		var swatchList = this.allSwatchesArrayList[entitledItemId];
		
		// finds out which swatch needs to be updated, add to swatchToUpdate array
		for(var i=0; i<swatchList.length; i++) {
			var attrName = swatchList[i][0];
			var attrValue = swatchList[i][1];
			var attrImg1 = swatchList[i][2];
			var attrImg2 = swatchList[i][3];
			var attrOnclick = swatchList[i][4];
			
			if (attrName != doNotDisable && attrName != selectedAttrName) {
				var swatchRecord = new Array();
				swatchRecord[0] = attrName;
				swatchRecord[1] = attrValue;
				swatchRecord[2] = attrImg1;
				swatchRecord[4] = attrOnclick;
				swatchRecord[5] = false;
				swatchToUpdate.push(swatchRecord);
			}
		}
		
		// finds out which swatch is entitled, if it is, image should be set to enabled
		// go through entitledItems array and find out swatches that are entitled 
		for (x in this.entitledItems) {
			var Attributes = this.entitledItems[x].Attributes;

			for(y in Attributes){
				var index = y.indexOf("_");
				var entitledSwatchName = y.substring(0, index);
				var entitledSwatchValue = y.substring(index+1);	
				
				//the current entitled item has the selected attribute value
				if (entitledSwatchName == selectedAttrName && entitledSwatchValue == selectedAttrValue) {
					//go through the other attributes that are available to the selected attribute
					//exclude the one that is selected
					for (z in Attributes) {
						var index2 = z.indexOf("_");
						var entitledSwatchName2 = z.substring(0, index2);
						var entitledSwatchValue2 = z.substring(index2+1);
						
						if(y != z){ //only check the attributes that are not the one selected
							for (i in swatchToUpdate) {
								var swatchToUpdateName = swatchToUpdate[i][0];
								var swatchToUpdateValue = swatchToUpdate[i][1];
								
								if (entitledSwatchName2 == swatchToUpdateName && entitledSwatchValue2 == swatchToUpdateValue) {
									swatchToUpdate[i][5] = true;
								}
							}
						}
					}
				}
			}
		}

		// Now go through swatchToUpdate array, and update swatch images
		var disabledAttributes = [];
		for (i in swatchToUpdate) {
			var swatchToUpdateName = swatchToUpdate[i][0];
			var swatchToUpdateValue = swatchToUpdate[i][1];
			var swatchToUpdateImg1 = swatchToUpdate[i][2];
			var swatchToUpdateImg2 = swatchToUpdate[i][3];
			var swatchToUpdateOnclick = swatchToUpdate[i][4];
			var swatchToUpdateEnabled = swatchToUpdate[i][5];		
			
			if (swatchToUpdateEnabled) {
				if(document.getElementById("swatch_" + entitledItemId + "_" + swatchToUpdateValue).className != "color_swatch_selected"){
					var swatchElement = dojo.byId("swatch_" + entitledItemId + "_" + swatchToUpdateValue);
					swatchElement.className = "color_swatch";
					swatchElement.src = swatchElement.src.replace("_disabled.png","_enabled.png");
					
					//change the title text of the swatch link
					dojo.byId("swatch_link_" + entitledItemId + "_" + swatchToUpdateValue).title = swatchElement.alt;
				}
				document.getElementById("swatch_link_" + entitledItemId + "_" + swatchToUpdateValue).setAttribute("aria-disabled", "false");
				document.getElementById("swatch_link_" + entitledItemId + "_" + swatchToUpdateValue).onclick = swatchToUpdateOnclick;
			} else {
				if(swatchToUpdateName != doNotDisable){
					var swatchElement = dojo.byId("swatch_" + entitledItemId + "_" + swatchToUpdateValue);
					var swatchLinkElement = dojo.byId("swatch_link_" + entitledItemId + "_" + swatchToUpdateValue);
					swatchElement.className = "color_swatch_disabled";					
					swatchLinkElement.onclick = null;
					swatchElement.src = swatchElement.src.replace("_enabled.png","_disabled.png");
					
					//change the title text of the swatch link
					var titleText = storeNLS["INV_ATTR_UNAVAILABLE"];
					swatchLinkElement.title = dojo.string.substitute(titleText,{0: swatchElement.alt});
					
					document.getElementById("swatch_link_" + entitledItemId + "_" + swatchToUpdateValue).setAttribute("aria-disabled", "true");
					
					//The previously selected attribute is now unavailable for the new selection
					//Need to switch the selection to an available value
					if(selectedAttributes[swatchToUpdateName] == swatchToUpdateValue){
						disabledAttributes.push(swatchToUpdate[i]);
					}
				}
			}
		}
		
		//If there were any previously selected attributes that are now unavailable
		//Find another available value for that attribute and update other attributes according to the new selection
		for(i in disabledAttributes){
			var disabledAttributeName = disabledAttributes[i][0];
			var disabledAttributeValue = disabledAttributes[i][1];

			for (i in swatchToUpdate) {
				var swatchToUpdateName = swatchToUpdate[i][0];
				var swatchToUpdateValue = swatchToUpdate[i][1];
				var swatchToUpdateEnabled = swatchToUpdate[i][5];	
				
				if(swatchToUpdateName == disabledAttributeName && swatchToUpdateValue != disabledAttributeValue && swatchToUpdateEnabled){
						this.makeSwatchSelection(swatchToUpdateName, swatchToUpdateValue, entitledItemId, doNotDisable,imageField);
					break;
				}
			}
		}
	},
	/* SwatchCode end */
		
	/**
	* This function is used to change the price displayed in the Product Display Page on change of  a attribute of the product using an AJAX call. 
	* This function will resolve the catentryId using entitledItemId and displays the price of the catentryId.
	*				
	* @param {Object} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {Boolean} isPopup If the value is true, then this implies that the function was called from a quick info pop-up.
	* @param {Boolean} displayPriceRange If the value is true, then display the price range. If it is false then donot display the price range.
	*
	**/
	changePrice : function(entitledItemId,isPopup,displayPriceRange,productId){
		this.displayPriceRange = displayPriceRange;
		this.isPopup = isPopup;
		var entitledItemJSON;

		if (dojo.byId(entitledItemId)!=null && !this.isPopup) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		var catalogEntryId = null;
		this.setEntitledItems(entitledItemJSON);
		
		if(this.selectedProducts[productId]){
			var catalogEntryId = this.getCatalogEntryIdforProduct(this.selectedProducts[productId]);
		} else {
			var catalogEntryId = this.getCatalogEntryId(entitledItemId);
		}
		
		if(catalogEntryId!=null){
			//check if the json object is already present for the catEntry.
			if(this.itemPriceJsonOject[catalogEntryId] != null && this.itemPriceJsonOject[catalogEntryId] != 'undefined'){
				this.displayPrice(this.itemPriceJsonOject[catalogEntryId].catalogEntry,productId);
				console.debug("ShoppingActions.changePrice: using stored json object.");
			}
			//if json object is not present, call the service to get the details.
			else{
				var parameters = {};
				parameters.storeId = this.storeId;
				parameters.langId= this.langId;
				parameters.catalogId= this.catalogId;
				parameters.catalogEntryId= catalogEntryId;
				parameters.productId = productId;

				dojo.xhrPost({
					url: getAbsoluteURL() + "GetCatalogEntryDetailsByIDView",				
					handleAs: "json-comment-filtered",
					content: parameters,
					service: this,
					load: shoppingActionsJS.displayPriceServiceResponse,
					error: function(errObj,ioArgs) {
						console.debug("ShoppingActions.changePrice: Unexpected error occurred during an xhrPost request.");
					}
				});
			}
		}
		else{
			console.debug("ShoppingActions.changePrice: all attributes are not selected.");
		}
				
	},
	
	/** 
	 * Displays price of the catEntry selected with the JSON objrct returned from the server.
	 * 
	 * @param {object} serviceRepsonse The JSON response from the service.
	 * @param {object} ioArgs The arguments from the service call.
	 */	
	 displayPriceServiceResponse : function(serviceResponse, ioArgs){
		var productId = ioArgs['args'].content['productId'];
		//stores the json object, so that the service is not called when same catEntry is selected.
		shoppingActionsJS.itemPriceJsonOject[serviceResponse.catalogEntry.catalogEntryIdentifier.uniqueID] = serviceResponse;
		
		shoppingActionsJS.displayPrice(serviceResponse.catalogEntry,productId);
	 },
	 
	 /** 
	 * Displays price of the attribute selected with the JSON oject.
	 * 
	 * @param {object} catEntry The JSON object with catalog entry details.
	 */	
	 displayPrice : function(catEntry,productId){

		var tempString;
		var popup = shoppingActionsJS.isPopup;

		if(popup == true){
			document.getElementById('productPrice').innerHTML = catEntry.offerPrice;
			document.getElementById('productName').innerHTML = catEntry.description[0].name;
			document.getElementById('productSKUValue').innerHTML = catEntry.catalogEntryIdentifier.externalIdentifier.partNumber;
		}
		
		if(popup == false){
			var innerHTML = "";
			var listPrice = dojo.currency.parse(catEntry.listPrice,{symbol: this.currencySymbol});
			var offerPrice = dojo.currency.parse(catEntry.offerPrice,{symbol: this.currencySymbol});
			
			this.setPriceInProductList(productId,offerPrice);
			
			if(!catEntry.listPriced || listPrice <= offerPrice){
				innerHTML = "<span id='offerPrice_" + catEntry.catalogEntryIdentifier.uniqueID + "' class='price'>" + catEntry.offerPrice + "</span>";
			}
			else{
				innerHTML = "<span id='listPrice_" + catEntry.catalogEntryIdentifier.uniqueID + "' class='old_price'>" + catEntry.listPrice + "</span>"+
							"<span id='offerPrice_" + catEntry.catalogEntryIdentifier.uniqueID + "' class='price'>" + catEntry.offerPrice + "</span>";
			}
			document.getElementById('price_display_'+productId).innerHTML = innerHTML
				+ "<input type='hidden' id='ProductInfoPrice_" + catEntry.catalogEntryIdentifier.uniqueID + "' value='" + catEntry.offerPrice + "'/>";
			
			innerHTML = "";
			if(shoppingActionsJS.displayPriceRange == true){
				for(var i in catEntry.priceRange){
					if(catEntry.priceRange[i].endingNumberOfUnits == catEntry.priceRange[i].startingNumberOfUnits){
						tempString = storeNLS['PQ_PRICE_X'];
						innerHTML = innerHTML + "<p>" + dojo.string.substitute(tempString,{0: catEntry.priceRange[i].startingNumberOfUnits});
					}
					else if(catEntry.priceRange[i].endingNumberOfUnits != 'null'){
						tempString = storeNLS['PQ_PRICE_X_TO_Y'];
						innerHTML = innerHTML + "<p>" + dojo.string.substitute(tempString,{0: catEntry.priceRange[i].startingNumberOfUnits, 
							1: catEntry.priceRange[i].endingNumberOfUnits});
					}
					else{
						tempString = storeNLS['PQ_PRICE_X_OR_MORE'];
						innerHTML = innerHTML + "<p>" + dojo.string.substitute(tempString,{0: catEntry.priceRange[i].startingNumberOfUnits});
					}					
					innerHTML = innerHTML + " <span class='price'>" + catEntry.priceRange[i].localizedPrice + "</span></p>";
				}
			}
			// Append productId so that element is unique in bundle page, where there can be multiple components
			var quantityDiscount = dojo.byId("productLevelPriceRange_"+productId);
			var itemQuantityDiscount = dojo.byId("itemLevelPriceRange_"+productId);
			
			// if product level price exists and no section to update item level price
			if(null != quantityDiscount && null == itemQuantityDiscount){
				dojo.style(quantityDiscount, "display", ""); //display product level price range
			}
			// if item level price range is present
			else if("" != innerHTML && null != itemQuantityDiscount){
				innerHTML = storeNLS['PQ_PURCHASE'] + innerHTML;
				itemQuantityDiscount.innerHTML = innerHTML;
				dojo.style(itemQuantityDiscount, "display", "");
				// hide the product level price range
				if(null != quantityDiscount){
					dojo.style(quantityDiscount, "display", "none");
				}
			}
			// if item level price range is not present
			else if("" == innerHTML){
				if(null != itemQuantityDiscount){
					dojo.style(itemQuantityDiscount, "display", "none"); //hide item level price range
				}
				if(null != quantityDiscount){
					dojo.style(quantityDiscount, "display", ""); //display product level price range
				}
			} 
			
			/*
			 * If the product name is a link, do not replace the link only replace the text in the link.
			 * Otherwise, replace the whole text
			 */
			var productNameLink = dojo.query('#product_name_' + productId + ' > a');
			if(productNameLink.length == 1){
				productNameLink[0].innerHTML = catEntry.description[0].name;
			} else if(dojo.byId('product_name_'+productId)) {
				dojo.byId('product_name_'+productId).innerHTML = catEntry.description[0].name;
			}
			if(document.getElementById("ProductInfoName_"+productId) != null){
				document.getElementById("ProductInfoName_"+productId).value = catEntry.description[0].name;
			}
			if(document.getElementById('product_shortdescription_'+productId)) {
				document.getElementById('product_shortdescription_'+productId).innerHTML = catEntry.description[0].shortDescription;
			}
			if(document.getElementById('product_SKU_'+productId)){
				document.getElementById('product_SKU_'+productId).innerHTML = storeNLS['SKU'] + " " + catEntry.catalogEntryIdentifier.externalIdentifier.partNumber;
			}
		}
	 },

	/**
	 *This method will show the WC Dialog popup
	 *@param{String} widgetId The ID of the WC Dialog which should be shown
	 */
	showWCDialogPopup : function(widgetId){
		var popup = dijit.byId(widgetId); //Change the id of the popup div if it is changed in the html
		if(popup != null){
			popup.closeButtonNode.style.display='none';
			popup.show();
		}
		else {
			console.debug(widgetId +" does not exist");
		}
	},
	
	/**
	 * To notify the change in attribute to other components that is subscribed to attributesChanged event.
	 */
	notifyAttributeChange: function(catalogEntryID){
		this.baseCatalogEntryId = catalogEntryID;
		var selectedAttributes = this.selectedAttributesList["entitledItem_" + catalogEntryID];
		dojo.publish('attributesChanged_'+catalogEntryID, [dojo.toJson(selectedAttributes)]);
		dojo.publish('attributesChanged', [dojo.toJson(selectedAttributes)]);
	},
	
	/**
	 * To notify the change in quantity to other components that is subscribed to attributesChanged event.
	 */
	notifyQuantityChange: function(quantity){
		dojo.publish('quantityChanged', [quantity]);
	},
	
	/**
	 * Initializes the compare check box for all the products added to compare.
	 */
	initCompare: function(fromPage){
		if(fromPage == 'compare'){
			this.checkForCompare();
		} else {
			var cookieKey = this.cookieKeyPrefix + this.storeId;
			var newCookieValue = "";
			dojo.cookie(cookieKey, newCookieValue, {path:'/'});
		}
		
	},
	
	/**
	 * Change the compare box status to checked or unchecked
	 * @param{String} cbox The ID of the compare check box of the given catentry identifier.
	 * @param{String} catEntryIdentifier The catalog entry identifer to current product.
	 */
	changeCompareBox: function(cbox,catEntryIdentifier) {
		box = document.getElementById(cbox);
		box.checked = !box.checked;
		this.addOrRemoveFromCompare(catEntryIdentifier,box.checked);
	},
	
	/**
	 * Adds or removes the product from the compare depending on the compare box checked or unchecked.
	 * @param{String} catEntryIdentifier The catalog entry identifer to current product.
	 * @param{boolean} checked True if the checkbox is checked or False
	 */
	addOrRemoveFromCompare: function(catEntryIdentifier,checked){
		//box = eval(cbox);
		if(checked){
			this.addToCompare(catEntryIdentifier);
		}
		else{
			this.removeFromCompare(catEntryIdentifier);
		}
	},
	
	/**
	 * Adds the product to the compare cookie.
	 * @param{String} catEntryIdentifier The catalog entry identifer to current product.
	 */
	addToCompare:function(catEntryIdentifier){
		
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var cookieValue = dojo.cookie(cookieKey);
		
		if(cookieValue != null){
			if(cookieValue.indexOf(catEntryIdentifier) != -1 || catEntryIdentifier == null){
				MessageHelper.displayErrorMessage(storeNLS["COMPARE_ITEM_EXISTS"]);
				return;
			}
		}
		
		var currentNumberOfItemsInCompare = 0;
		if(cookieValue != null && cookieValue != ""){
			currentNumberOfItemsInCompare = cookieValue.split(this.cookieDelimiter).length;
		}
		
		if (currentNumberOfItemsInCompare < parseInt(this.maxNumberProductsAllowedToCompare)) {
			var newCookieValue = "";
			if(cookieValue == null || cookieValue == ""){
				newCookieValue = catEntryIdentifier;
			}
			else{
				newCookieValue = cookieValue + this.cookieDelimiter + catEntryIdentifier;
			}
			dojo.cookie(cookieKey, newCookieValue, {path:'/'});
			document.getElementById("compare_"+catEntryIdentifier).style.visibility = "visible";
			console.debug("Product added to cookie");
			currentNumberOfItemsInCompare = currentNumberOfItemsInCompare + 1;
			if(currentNumberOfItemsInCompare == this.minNumberProductsAllowedToCompare){
				var compareButtonDisabled = document.getElementById("compare_button_disabled");
				var compareButtonEnabled = document.getElementById("compare_button_enabled");
				//compareButton.className = "button_primary";
				//compareButton.onclick = function()
				//{
				//	setCurrentId('compare_button');
				//	shoppingActionsJS.compareProducts();
				//}
				compareButtonDisabled.style.display = "none";
				compareButtonEnabled.style.display = "block";
				dojo.removeClass("compare_button", "disabled");
			}
		} else {
			//MessageHelper.displayErrorMessage(storeNLS["COMPATE_MAX_ITEMS"]);
			this.showWCDialogPopup('widget_product_comparison_popup');
			document.getElementById("comparebox_"+catEntryIdentifier).checked = false;
			console.debug("You can only compare up to 4 products");				
		}
	},
	
	/**
	 * Removes the product from the compare cookie.
	 * @param{String} catEntryIdentifier The catalog entry identifer to current product.
	 */
	removeFromCompare: function(catEntryIdentifier){
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var cookieValue = dojo.cookie(cookieKey);
		var currentNumberOfItemsInCompare = 0;
		if(cookieValue != null){
			if(dojo.trim(cookieValue) == ""){
				dojo.cookie(cookieKey, null, {expires: -1});
			}else{
				var cookieArray = cookieValue.split(this.cookieDelimiter);
				var newCookieValue = "";
				for(index in cookieArray){
					if(cookieArray[index] != catEntryIdentifier){
						if(newCookieValue == ""){
							newCookieValue = cookieArray[index];
						}else{
							newCookieValue = newCookieValue + this.cookieDelimiter + cookieArray[index];
						}
					}
				}
				dojo.cookie(cookieKey, newCookieValue, {path:'/'});
				currentNumberOfItemsInCompare = newCookieValue.split(this.cookieDelimiter).length;
			}
			document.getElementById("compare_"+catEntryIdentifier).removeAttribute("style");
			console.debug("Product removed from cookie");
			if(currentNumberOfItemsInCompare < this.minNumberProductsAllowedToCompare){
				var compareButtonDisabled = document.getElementById("compare_button_disabled");
				var compareButtonEnabled = document.getElementById("compare_button_enabled");
				//compareButton.className = "button_secondary";
				//compareButton.removeAttribute("onclick");
				compareButtonDisabled.style.display = "inline";
				compareButtonEnabled.style.display = "none";
				dojo.addClass("compare_button", "disabled");
			}
		}
	},
	
	/**
	 * Re-directs the browser to the CompareProductsDisplay page to compare products side-by-side.
	 */
	compareProducts:function(categoryIds){
		var url = "CompareProductsDisplayView?storeId=" + this.storeId + "&catalogId=" + this.catalogId + "&langId=" + this.langId + "&compareReturnName=" + this.compareReturnName + "&searchTerm="+ this.searchTerm;
		
		if('' != categoryIds.top_category){
			url = url + "&top_category=" + categoryIds.top_category;
		}
		if('' != categoryIds.parent_category_rn){
			url = url + "&parent_category_rn=" + categoryIds.parent_category_rn;
		}
		if('' != categoryIds.categoryId){
			url = url + "&categoryId=" + categoryIds.categoryId;
		}
		
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var cookieValue = dojo.cookie(cookieKey);
		if(cookieValue != null && dojo.trim(cookieValue) != ""){
			url = url + "&catentryId=" + cookieValue;
		}
		var returnUrl = location.href;
		if(returnUrl.indexOf("?") == -1){
			returnUrl = returnUrl + "?fromPage=compare";
		} else if(returnUrl.indexOf("fromPage=compare") == -1){
			returnUrl = returnUrl + "&fromPage=compare";
		}
		url = url + "&returnUrl=" + encodeURIComponent(returnUrl);
		location.href = getAbsoluteURL() + url;
	},
	
	/**
	 * Sets the quantity of a product in the list (bundle)
	 * 
	 * @param {String} catalogEntryType, type of catalogEntry (item/product/bundle/package)
	 * @param {int} catalogEntryId The catalog entry identifer to current product.
	 * @param {int} quantity The quantity of current product.
	 * @param {float} price The price of current product.
	 */
	setProductQuantity: function(catalogEntryType, catalogEntryId, quantity, price){
		var productDetails = null;
		if(this.productList[catalogEntryId]){
			productDetails = this.productList[catalogEntryId];
		} else {
			productDetails = new Object();
			this.productList[catalogEntryId] = productDetails;
			productDetails.baseItemId = catalogEntryId;
			if("item" == catalogEntryType){
				productDetails.id = catalogEntryId;
			} else {
				productDetails.id = 0;
			}
		}
		productDetails.quantity = quantity;
		dojo.publish('quantityChanged', [dojo.toJson(productDetails)]);
		
		productDetails.price = dojo.number.parse(price);
	},
	
	/**
	 * Sets the quantity of a product in the list (bundle)
	 * 
	 * @param {int} catalogEntryId The catalog entry identifer to current product.
	 * @param {int} quantity The quantity of current product.
	 */
	quantityChanged: function(catalogEntryId, quantity){
		if(this.productList[catalogEntryId]){
			var productDetails = this.productList[catalogEntryId];
			productDetails.quantity = dojo.trim(quantity);
			dojo.publish('quantityChanged', [dojo.toJson(productDetails)]);
			
			//Update quantity for catentries in the merchandising association array
			if(MerchandisingAssociationJS != null){
				if(MerchandisingAssociationJS.baseItemParams != null){
					if(MerchandisingAssociationJS.baseItemParams.type=='BundleBean'){
						// Update items in the bundle
						for(idx=0;idx<MerchandisingAssociationJS.baseItemParams.components.length;idx++){
							if(catalogEntryId == MerchandisingAssociationJS.baseItemParams.components[idx].productId || catalogEntryId == MerchandisingAssociationJS.baseItemParams.components[idx].id){
								MerchandisingAssociationJS.baseItemParams.components[idx].quantity = productDetails.quantity;
							}
						}
					}
				}
			}			
		}
	},
	
	/**
	 * Sets the price of a product in the list (bundle)
	 * 
	 * @param {int} catalogEntryId The catalog entry identifer to current product.
	 * @param {int} price The price of current product.
	 */
	setPriceInProductList: function(catalogEntryId, price){
		var productDetails = this.productList[catalogEntryId];
		if(productDetails){
			productDetails.price = price;
		}
	},
	
	/**
	 * Select bundle item swatch
	 * 
	 * @param {int} catalogEntryId The catalog entry identifer to current product.
	 * @param {String} swatchName
	 * @param {String} swatchValue
	 * @param {String} doNotDisable, the first swatch, that should not be disabled
	 */
	 selectBundleItemSwatch: function(catalogEntryId, swatchName, swatchValue, doNotDisable){
		if(dojo.hasClass("swatch_" + catalogEntryId + "_" + swatchName + "_" + swatchValue, "color_swatch_disabled")){
			return false;
		}
		if (dojo.byId("entitledItem_"+catalogEntryId)!=null) {
			var entitledItemJSON;
			var currentSwatchkey = swatchName + "_" +swatchValue;
			//the json object for entitled items are already in the HTML. 
			entitledItemJSON = dojo.fromJson(dojo.byId("entitledItem_"+catalogEntryId).innerHTML);
			var validSwatchArr = new Array();
			for(idx in entitledItemJSON){
				var validItem = false;
				var entitledItem = entitledItemJSON[idx];
				for(attribute in entitledItem.Attributes){
					
					if(currentSwatchkey == attribute){
						validItem = true;
						break;
					}
				}
				if(validItem){
					for(attribute in entitledItem.Attributes){
						var currentSwatch = attribute.substring(0, attribute.lastIndexOf("_"));
						if(currentSwatch != doNotDisable && currentSwatch != swatchName){
							validSwatchArr.push(attribute);
						}
					}
				}
			}
			
			var swatchesDisabled = new Array();
			var selectedSwatches = new Array();
			for(idx in entitledItemJSON){
				var entitledItem = entitledItemJSON[idx];
				for(attribute in entitledItem.Attributes){
					var currentSwatch = attribute.substring(0, attribute.lastIndexOf("_"));
					if(currentSwatch != doNotDisable && currentSwatch != swatchName){
						var swatchId = "swatch_" + catalogEntryId +"_" + attribute;
						var swatchLinkId = swatchId.replace("swatch_","swatch_link_");
						if(dojo.indexOf(validSwatchArr, attribute) > -1){
							if(!dojo.hasClass(swatchId,"color_swatch_selected")){
								dojo.byId(swatchId).className = "color_swatch";
								dojo.byId(swatchId).src = dojo.byId(swatchId).src.replace("_disabled.png","_enabled.png");
								
								//change the title text of the swatch link
								dojo.byId(swatchLinkId).title = dojo.byId(swatchId).alt;
								document.getElementById(swatchLinkId).setAttribute("aria-disabled", "false");
							}
						} else if(dojo.indexOf(swatchesDisabled, attribute) == -1){
							swatchesDisabled.push(attribute);
							if(dojo.hasClass(swatchId,"color_swatch_selected")){
								selectedSwatches.push(swatchId);
							}
							dojo.byId(swatchId).className = "color_swatch_disabled";
							dojo.byId(swatchId).src = dojo.byId(swatchId).src.replace("_enabled.png","_disabled.png");
							
							//change the title text of the swatch link
							var titleText = storeNLS["INV_ATTR_UNAVAILABLE"];
							var altText = dojo.byId(swatchId).alt;

							dojo.byId(swatchLinkId).title = dojo.string.substitute(titleText,{0: altText});
							document.getElementById(swatchLinkId).setAttribute("aria-disabled", "true");
						}
					}
					if (document.getElementById("swatch_link_" + catalogEntryId +"_" + attribute) != null) {
						document.getElementById("swatch_link_" + catalogEntryId +"_" + attribute).setAttribute("aria-checked", "false");
					}
				}
			}
			
			for(idx in selectedSwatches){
				var selectedSwatch = selectedSwatches[idx];
				var idSelector = selectedSwatch.substring(0, selectedSwatch.lastIndexOf("_"));
				var swatchSelected = false;
				dojo.query("[id^='" + idSelector + "']").forEach(function(node, index, arr){
					if(!swatchSelected && dojo.hasClass(node,"color_swatch")){
						var values = node.id.split("_");
						shoppingActionsJS.selectBundleItemSwatch(values[1],values[2],values[3], doNotDisable);
						shoppingActionsJS.setSelectedAttributeOfProduct(values[1],values[2],values[3],false);
						swatchSelected = true;
					}
				});
			}
		}
		
		if (dojo.byId("swatch_selection_" + catalogEntryId + "_" + swatchName).style.display == "none") {
			dojo.byId("swatch_selection_" + catalogEntryId + "_" + swatchName).style.display = "inline";
		}
		dojo.byId("swatch_selection_" + catalogEntryId + "_" + swatchName).innerHTML = swatchValue;
		
		var swatchItem = "swatch_" + catalogEntryId + "_" + swatchName + "_";
		var swatchItemLink = "swatch_link_" + catalogEntryId + "_" + swatchName + "_";
		
		dojo.query("img[id^='" + swatchItem + "']").forEach(function(node, index, arr){
			if(dojo.hasClass(node, "color_swatch_disabled")){
				dojo.removeClass(node, "color_swatch")
			} else {
				dojo.addClass(node, "color_swatch");
			}
			dojo.removeClass(node, "color_swatch_selected");
		});
		
		dojo.byId(swatchItem + swatchValue).className = "color_swatch_selected";
		document.getElementById(swatchItemLink + swatchValue).setAttribute("aria-checked", "true");
		
		this.setSelectedAttributeOfProduct(catalogEntryId, swatchName, swatchValue,false);
		// select image
		this.changeBundleItemImage(catalogEntryId, swatchName, swatchValue, "productThumbNailImage_" + catalogEntryId);
		
	},
	
	changeBundleItemImage: function(catalogEntryId, swatchAttrName, swatchAttrValue, skuImageId){
		var entitledItemId = "entitledItem_" + catalogEntryId;
		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}

		this.setEntitledItems(entitledItemJSON);

		var skuImage = null;
		var imageArr = shoppingActionsJS.getImageForBundleItem(catalogEntryId);
		if(imageArr != null){
			skuImage = imageArr[1];
		}
		
		if(skuImageId != undefined){
			this.setSKUImageId(skuImageId);
		}
		
		if(skuImage != null){
			if(dojo.byId(this.skuImageId) != null){
				document.getElementById(this.skuImageId).src = skuImage;	
				if(document.getElementById("ProductInfoImage_"+catalogEntryId) != null){
					document.getElementById("ProductInfoImage_"+catalogEntryId).value = skuImage;
				}
			}
		} else {
			var imageFound = false;
			for (x in this.entitledItems) {
				var Attributes = this.entitledItems[x].Attributes;
				var itemImage = this.entitledItems[x].ItemThumbnailImage;
				
				for(y in Attributes){
					var index = y.indexOf("_");
					var entitledSwatchName = y.substring(0, index);
					var entitledSwatchValue = y.substring(index+1);	
					
					if (entitledSwatchName == swatchAttrName && entitledSwatchValue == swatchAttrValue) {
						document.getElementById(this.skuImageId).src = itemImage;		
						if(document.getElementById("ProductInfoImage_"+catalogEntryId) != null){
							document.getElementById("ProductInfoImage_"+catalogEntryId).value = itemImage;
						}
						imageFound = true;
						break;
					}
				}
				
				if(imageFound){
					break;
				}
			}
		}	
	},
	
	getImageForBundleItem: function(entitledItemId){
		var attributeArray = [];
		var selectedAttributes = this.selectedProducts[entitledItemId];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveImageForSKU(attributeArray);
	},
	
	/**
	 * Check if any product is already selected for compare in other pages and select them
	 */
	checkForCompare: function() {
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var cookieValue = dojo.cookie(cookieKey);
		var currentNumberOfItemsInCompare = 0;

		if(cookieValue != null) {
			var catEntryIds = cookieValue.split(this.cookieDelimiter);
			
			for(idx=0; idx<catEntryIds.length; idx++){
				var catEntryIdentifier = catEntryIds[idx];
				
				if(null != dojo.byId("compare_"+catEntryIdentifier)){
					dojo.byId("comparebox_"+catEntryIdentifier).checked = true;
					dojo.byId("compare_"+catEntryIdentifier).style.visibility = "visible";
				}
				
				if(++currentNumberOfItemsInCompare == this.minNumberProductsAllowedToCompare){
					var compareButtonDisabled = dojo.byId("compare_button_disabled");
					var compareButtonEnabled = dojo.byId("compare_button_enabled");
					compareButtonDisabled.style.display = "none";
					compareButtonEnabled.style.display = "block";
					dojo.removeClass("compare_button", "disabled");
				}
			}
		}
	},
	
	/**
	* replaceItemAjaxHelper This function is used to replace an item in the cart. This will be called from the {@link fastFinderJS.ReplaceItemAjax} method.
	*
	* @param {String} catalogEntryId The catalog entry of the item to replace to the cart.
	* @param {int} qty The quantity of the item to add.
	* @param {String} removeOrderItemId The order item ID of the catalog entry to remove from the cart.
	* @param {String} addressId The address ID of the order item.
	* @param {String} shipModeId The shipModeId of the order item.
	* @param {String} physicalStoreId The physicalStoreId of the order item.
	*
	**/
	replaceItemAjaxHelper : function(catalogEntryId,qty,removeOrderItemId,addressId,shipModeId,physicalStoreId){
		
		var params = [];
		params.storeId = WCParamJS.storeId;
		params.catalogId = WCParamJS.catalogId;
		params.langId = WCParamJS.langId;
		params.orderItemId	= removeOrderItemId;
		params.orderId = ".";
		if(CheckoutHelperJS.shoppingCartPage){	
			params.calculationUsage = "-1,-2,-5,-6,-7";
		}else{
			params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		}

		var params2 = [];
		params2.storeId = WCParamJS.storeId;
		params2.catalogId = WCParamJS.catalogId;
		params2.langId = WCParamJS.langId;
		params2.catEntryId	= catalogEntryId;
		params2.quantity = qty;
		params2.orderId = ".";
		if(CheckoutHelperJS.shoppingCartPage){	
			params2.calculationUsage = "-1,-2,-5,-6,-7";
		}else{
			params2.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		}

		var params3 = [];
		params3.storeId = WCParamJS.storeId;
		params3.catalogId = WCParamJS.catalogId;
		params3.langId = WCParamJS.langId;
		params3.orderId = ".";
		if(CheckoutHelperJS.shoppingCartPage){	
			params3.calculationUsage = "-1,-2,-5,-6,-7";
		}else{
			params3.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		}
		
		var shipInfoUpdateNeeded = false;
		var orderItemReqd = true;
		if(addressId != null && addressId != ""){
			params3.addressId = addressId;
		}
		if(shipModeId != null && shipModeId != ""){
			params3.shipModeId = shipModeId;
		}
		if(physicalStoreId != null && physicalStoreId != ""){
			params3.physicalStoreId = physicalStoreId;
			orderItemReqd = false;
		}
		if(params3.shipModeId != null && (params3.addressId != null || params3.physicalStoreId != null)){
			shipInfoUpdateNeeded = true;
		}
		
		if(orderItemReqd){
			params3.allocate="***";
			params3.backorder="***";
			params3.remerge="***";
			params3.check="*n";
		}
		
		//Delcare service for deleting item...
		wc.service.declare({
			id: "AjaxReplaceItem",
			actionId: "AjaxReplaceItem",
			url: "AjaxOrderChangeServiceItemDelete",
			formId: ""

			,successHandler: function(serviceResponse) {
				//Now add the new item to cart..
				if(!shipInfoUpdateNeeded){
					//We dont plan to update addressId and shipMOdeId..so call AjaxAddOrderItem..
					wc.service.invoke("AjaxAddOrderItem", params2);
				}
				else{
					//We need to update the adderessId and shipModeId..so call our temp service to add..
					wc.service.invoke("AjaxAddOrderItemTemp", params2);
				}
			}

			,failureHandler: function(serviceResponse) {
				if (serviceResponse.errorMessage) {
							 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
					  } else {
							 if (serviceResponse.errorMessageKey) {
									MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
							 }
					  }
					  cursor_clear();
			}

		});

		//Delcare service for adding item..
		wc.service.declare({
			id: "AjaxAddOrderItemTemp",
			actionId: "AjaxAddOrderItemTemp",
			url: "AjaxOrderChangeServiceItemAdd",
			formId: ""

			,successHandler: function(serviceResponse) {
				if(orderItemReqd){
					// setting the newly created orderItemId
					params3.orderItemId = serviceResponse.orderItemId[0];
				}
				
				MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_ADDED"]);
				
				//Now item is added.. call update to set addressId and shipModeId...
				wc.service.invoke("OrderItemAddressShipMethodUpdate", params3);
			}

			,failureHandler: function(serviceResponse) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			}
		});

		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   
		cursor_wait();
		wc.service.invoke("AjaxReplaceItem",params);
	},

	/**
	* customizeDynamicKit This function is used to call the configurator page for a dynamic kit.
	* @param {String} catEntryIdentifier A catalog entry ID of the item to add to the cart.
	* @param {int} quantity A quantity of the item to add to the cart.
	* @param {Object} customParams - Any additional parameters that needs to be passed to the configurator page.
	*
	**/
	customizeDynamicKit : function(catEntryIdentifier, quantity, customParams)
	{
		var params = [];
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.catEntryId	= catEntryIdentifier;
		params.quantity		= quantity;
		
		if(!isPositiveInteger(quantity)){
			MessageHelper.displayErrorMessage(storeNLS['QUANTITY_INPUT_ERROR']);
			return;
		}

		var contractIdElements = document.getElementsByName('contractSelectForm_contractId');
		if (contractIdElements != null && contractIdElements != "undefined") {
			for (i=0; i<contractIdElements.length; i++) {
				if (contractIdElements[i].checked) {
					params.contractId = contractIdElements[i].value;
					break;
				}
			}
		}
		
		//Pass any other customParams set by other add on features
		if(customParams != null && customParams != 'undefined'){
			for(i in customParams){
				params[i] = customParams[i];
			}
		}

		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   
		cursor_wait();
		
		var configureURL = "ConfigureView";
		var i =0;
		for(param in params){
			configureURL += ((i++ == 0)? "?" : "&") + param + "=" + params[param];
		}
		document.location.href = getAbsoluteURL() + configureURL;
	}
	
}
/***************ShoppingActions.js ends*****************/