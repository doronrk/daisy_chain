//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2011 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

	
	/** 
	 * @fileOverview This file contains all the global variables and JavaScript functions needed for the catalog search display page to work. 
	 * The JavaScript functions are used in the CatalogSearchDisplay.jsp file.
	 * @version 1.0
	 */
	   
	/* Import dojo classes */   
	dojo.require("wc.render.RefreshController");
	dojo.require("wc.render.Context");
	dojo.require("wc.widget.RefreshArea");
	dojo.require("wc.service.common");
	
	/* Declare the namespace for this file if it does not already exist. */
	if (CatalogSearchDisplayJS == null || typeof(CatalogSearchDisplayJS) != "object") {
		var CatalogSearchDisplayJS = new Object();
	 }
	 
	/**
	 * @class The functions defined in this class are used for to perform simple and advanced search functions on catalog entries in the store. 
	 * The functions also take care of maintaining the browser history for back/forward and refresh actions of the browser.
	 * 
	 * The simple search page displays the result set for the keyword provided by the user in the search box at the header of the store.
	 * The advanced search page allows user to search the catalog entries with more granular options. The client makes an Ajax call for each of the 
	 * search request and the results are updated without reloading the entire page.
	 *
	 */
	CatalogSearchDisplayJS={	
	
		/* Global variables used in the CatalogSearchDisplay page. */
		
		/** The showResultsPage is a boolean flag indicating if the search result should be displayed. */
		showResultsPage:false,    
		
		/** The searchModeVisible is a boolean flag indicating if search form should be displayed. */
		searchModeVisible:true,   

		/** The searchMode string stores the search mode, which is one of the following: topBar, simple or advanced. */
		searchMode:"topBar",      

		/** The isHistory is a boolean flag used to determine whether the update of context is caused by a history event(back/forward). */
		isHistory:false,

		/** The advanceSearch is a boolean flag indicating the type of search, it can be simple or advanced. */
		advanceSearch:false,

		/** The contextChanged is a boolean flag indicating whether the context was changed and if there is a need to refresh the search results. */
		contextChanged:false, 
		
		/**
	 	* This function sets the flag which indicates whether the search is advanced search or simple search.
	 	* @param {boolean} value A value that is set to determine the type of search.
		*/
		setAdvanceSearch:function(value){
			this.advanceSearch=value;
		},
		
		/**
	 	* This function returns the value of the advancedSearch flag which indicates whether the serach is advanced search or simple search.
	 	* @return {boolean} advanceSearch This is a boolean value, when it is true means advanced search otherwise simple search.
		*/
		getAdvanceSearch:function(){
			return this.advanceSearch;
		},
		
		/**
		* This function toggles between search mode or search results display mode.
		* @param {boolean} advanced boolean used to indicate if the current search mode is advanced search.
		*/
		showHideSearchMode:function(advanced){
			var methodName = "showHideSearchMode";
			console.debug(methodName + "advance: " + advanced);
		  
			advancedSearchDiv = dojo.byId("Advanced_Search_Form_div");
			searchResultDiv = dojo.byId("Search_Result_div");
			if(advanced){
				dojo.style(advancedSearchDiv,"display","block");
				advanced=false;		
			}else{
				dojo.style(advancedSearchDiv,"display","none");
			}
			if(searchResultDiv){
				dojo.style(searchResultDiv,"display","block");
			}
		},

		/**
		* This function shows or hides the cancel button on the advanced search page.
		* @param {boolean} indicates whether to display or hide the cancel button.
		*/
		showHideSearchCancelButton:function(display){
			searchCancelBtn=dojo.byId("cancelSearchButton");
			if(searchCancelBtn!=null && searchCancelBtn!='undefined'){
				if(display) {
					dojo.style(searchCancelBtn,"display","block");
				}
				else {
					dojo.style(searchCancelBtn,"display","none");
				}
			}
		},

		/**
		* This function submit the simple search form and updates the search results area with the result set.
		* @param {string} formId This is the form identifier of simple search form to be submitted.
		*/
		submitSimpleSearch:function( formId){   
		
			/* Handles multiple clicks */
			if(!submitRequest()){
				return;
			}   			
			cursor_wait();
			
			CatalogSearchDisplayJS.searchMode = "simple"; 	
			
			wc.render.getRefreshControllerById("catalogSearchResultDisplay_Controller").formId = formId;
			wc.render.getRefreshControllerById("catalogSearchResultDisplay_Controller").url = "AjaxCatalogSearchResultView";
			
			/* Provide meaningful value for the modes. The searchResultsPageNum and searchResultsView is not enough
			when we submit a new query, the search term changed, the number and view may stay the same
			the best way to identify the state of the application is to provide the new url. */
			var queryString = dojo.formToQuery(dojo.byId(formId));
			var searchUrl = "AjaxCatalogSearchResultView?" + queryString;
			wc.render.updateContext("catalogSearchResultDisplay_Context", {searchResultsPageNum: "", searchResultsURL: searchUrl, searchResultsView: ""});
			wc.render.updateContext("contentSearchResultDisplay_Context", {searchResultsPageNum: "", searchResultsURL: searchUrl, searchResultsView: ""});
		},
	
		/**
		* This function submits the advanced search form and updates the search results area with the result set.	
		* @param {string} formId This is the form identifier of advanced search form to be submitted.
		* @param {string} searchBasedNavigation This should submit the form rather than dojo refresh and use asterisk for empty search terms
		*/			
		submitAdvancedSearch:function(formId, searchBasedNavigation){
			var methodName = "submitAdvancedSearch";
			
			form = document.getElementById(formId);
			CatalogSearchDisplayJS.searchMode = "advanced"
			this.setAdvanceSearch(true);
			form.searchTerm.value = trim(form.searchTerm.value);	
			if(form.searchTerm !== null && form.searchTerm != 'undefined')
				form.searchTerm.value = form.searchTerm.value.replace(/^\s+/g, '').replace(/\s+$/g, '');
			form.filterTerm.value = trim(form.filterTerm.value);
			if(form.filterTerm !== null && form.filterTerm != 'undefined')
				form.searchTerm.value = form.searchTerm.value.replace(/^\s+/g, '').replace(/\s+$/g, '');
		
			form.manufacturer.value = trim(form.manufacturer.value);
			form.minPrice.value = trim(form.minPrice.value);
			form.maxPrice.value = trim(form.maxPrice.value);
			if(form.minPrice !== null && form.minPrice != 'undefined')
				form.minPrice.value = form.minPrice.value.replace(/^\s+/g, '').replace(/\s+$/g, '');
		
			if(form.maxPrice !== null && form.maxPrice != 'undefined')
				form.maxPrice.value = form.maxPrice.value.replace(/^\s+/g, '').replace(/\s+$/g, '');

			if(form.manufacturer.value != "") {
				form.advancedFacetList.value = "mfName_ntk_cs:" + form.manufacturer.value + ";";
			}
			if(searchBasedNavigation && ((form.minPrice.value != "") || (form.maxPrice.value != ""))) {
				var minPrice = form.minPrice.value;
				var maxPrice = form.maxPrice.value;

				// internally empty input is represented as * for facets.
				if(minPrice == "") {
					minPrice = "*";
				}
				if(maxPrice == "") {
					maxPrice = "*";
				}

				var minIsNaN = isNaN(minPrice);
				var maxIsNaN = isNaN(maxPrice);
				// accept either a * or a number.  Reject negatives, including negative zero.
				if(minPrice != "*" && (minIsNaN || minPrice.indexOf("-") != -1)) {
					MessageHelper.formErrorHandleClient(form["minPrice"].id, MessageHelper.messages["SEARCH_INVALID_LOW_PRICE"]);
					return;
				}

				if(maxPrice != "*" && (maxIsNaN || maxPrice.indexOf("-") != -1 || (!minIsNaN && parseFloat(maxPrice) < parseFloat(minPrice)))) {
					MessageHelper.formErrorHandleClient(form["maxPrice"].id, MessageHelper.messages["SEARCH_INVALID_HIGH_PRICE"]);
					return;
				}

				form.advancedFacetList.value = form.advancedFacetList.value + "price_USD:[" + minPrice + " " + maxPrice + "];";

				// if wildcard, set as empty input value before submitting.
				if(minPrice == "*") {
					form.minPrice.value = "";
				}
				if(maxPrice == "*") {
					form.maxPrice.value = "";
				}
			}

			if ((form.minPrice.value == "") && (form.maxPrice.value == ""))
			{
				form.currency.value="";
			}
			form.resultCatEntryType.value = "2";
			
			if(form.searchTermScope.value == "3"){
				form.pageView.value = "detailed";
			}

			this.showHideSearchMode(false);
			
			/* Handles multiple clicks */
			if(!submitRequest()){
				return;
			}   			
			
			if(searchBasedNavigation) {
				if(form.catGroupId.value != "") {
					var categoryIdInput = document.getElementById("WC_CatalogSearchForm_catGroupId");
					categoryIdInput.name = "categoryId";
				}
				form.submit();
			}
			else {
				cursor_wait();
				var queryString = dojo.formToQuery(dojo.byId(formId));
				var searchUrl = "AjaxCatalogSearchResultView?" + queryString;
				console.debug(methodName + " url: " + searchUrl);
				wc.render.getRefreshControllerById("catalogSearchResultDisplay_Controller").formId = formId;
				wc.render.getRefreshControllerById("catalogSearchResultDisplay_Controller").url = "AjaxCatalogSearchResultView";
				wc.render.updateContext("catalogSearchResultDisplay_Context", {searchResultsPageNum: "", searchResultsURL: searchUrl, searchResultsView: ""});			
				this.setAdvanceSearch(false);
				MessageHelper.hideAndClearMessage();
			}
		},
	
		/**
		* This function sets the result summary message in the designated message area on the search page.
		*/
		setResultSummaryMessage:function(){
			resultDiv = dojo.byId("Search_Result_Summary");
			searchCancelBtn=dojo.byId("cancelSearchButton");
			if(dojo.byId("Search_Advanced_Header")!=null && dojo.byId("Search_Advanced_Header")!='undefined'){
				dojo.style(dojo.byId("Search_Advanced_Header"),"display","none");
			}
			if(dojo.byId("Search_Result_Summary")!=null && dojo.byId("Search_Result_Summary")!='undefined' && dojo.byId("Search_Result_Summary_div")!=null && dojo.byId("Search_Result_Summary_div")!='undefined'){
				//show there's a price range error
				resultSummaryDiv = document.getElementById("Search_Result_Summary_div");
			}else if (dojo.byId("Search_Result_Summary_div_2")!=null && dojo.byId("Search_Result_Summary_div_2")!='undefined'){
				//show the search results
				resultSummaryDiv = document.getElementById("Search_Result_Summary_div_2");
			}
			dojo.style(resultDiv,"display","block");
			resultDiv.innerHTML=null;
			resultDiv.innerHTML=resultSummaryDiv.innerHTML;
			resultSummaryDiv.innerHTML=null;
			if(searchCancelBtn!=null && searchCancelBtn!='undefined'){
				dojo.style(searchCancelBtn,"display","block");
			}
		},
		/**
		* This function is used by history back and forward actions to reload the page based on the url stored in the history tracker object.
		* @param {string} changeUrl the url stored in the history tracker object. It is used to reload the page.
		*/
		loadContentFromURL:function(changeUrl){
	  	if (changeUrl == "simple"){			
				this.showHideSearchMode(false,"filter");
		       }
			else if (changeUrl == "advanced"){
				this.showHideSearchMode(true);/* display the advanced form */
				searchResultDivision = dojo.byId("Search_Result_div");
				dojo.style(searchResultDivision,"display","none");
				searchMsgDiv = dojo.byId("Search_Advanced_Header");
				dojo.style(searchMsgDiv,"display","block");
				searchResultMsgDiv = dojo.byId("Search_Result_Summary");
				dojo.style(searchResultMsgDiv,"display","none");
				cursor_clear();
			}
			else{
				wc.render.getRefreshControllerById("catalogSearchResultDisplay_Controller").url = changeUrl;
			
				wc.render.updateContext("catalogSearchResultDisplay_Context", { searchResultsURL: changeUrl});			
			}
			MessageHelper.hideAndClearMessage();
		},

		/**
		* This function is the call back function for context update. It uses dojo.undo.browser for adding history object onto dojo browser history.
		* @param {string} changeUrl The url used for updating context.
		*/
		searchResultCallback:function(changeUrl){
			var methodName = "searchResultCallback";
			console.debug(methodName + " entry" );
		
			CatalogSearchDisplayJS.searchModeVisible = "true";
			
	   		var identifier = "&identifier=" + (new Date()).getTime();
	   		var newUrl = changeUrl + identifier;
	    		
	    		/* if the context updated was not invoked by a history event, add this url to the dojo browser history. */
			if( !CatalogSearchDisplayJS.isHistory ) {
				console.debug(methodName + " add to history: " + newUrl );
				var historyObject = new CatalogSearchDisplayJS.HistoryTracker("AjaxCatalogSearchResultView", "Search_result_div", newUrl);
				dojo.back.addToHistory(historyObject);			
			}
			CatalogSearchDisplayJS.isHistory = false;
			cursor_clear();
			console.debug(methodName + " exit " );
		},
		
		/**
		* This function is used for getting the search result page.
		* @param {string} resultPageURL This is the URL to be requested.
		*/
		goToResultPage:function(resultPageURL, controller, context){
			/* Handles multiple clicks */
			if(!submitRequest()){
				return;
			}   		
			cursor_wait();  
			wc.render.getRefreshControllerById(controller).url = resultPageURL;
			wc.render.updateContext(context, {searchResultsURL: resultPageURL});
			MessageHelper.hideAndClearMessage();
		},
		
		/**
		* This function processes URL and act accordingly. If there is query information in the url, extract the query string, 
		* make AJAX request to get the search result and update the search results area.
		*/
		processURL:function(){
		
		var methodName ="processURL";
		console.debug(methodName + " enter" );   
		   
		var bookmarkId = location.hash;	
		console.debug( " bookmarkedId is " + bookmarkId);	
		
		var needContextUpdate = false;	
		var wholeUrl;
		if(bookmarkId){
		
		      /* Two pages can be bookmarked, In all cases, the search result is true, since we only 
		         allow bookmark search result page one is the simple search result page and another one is the advanced search result page. */
		        
			bookmarkId = bookmarkId.substring(1, bookmarkId.length);
			
			/* when user does a refresh of a page which has bookId, we need strip off the identifier attached
			so that it does not keeping appending one after another. */
			wholeUrl = bookmarkId;
			var indexOfIdentifier = bookmarkId.indexOf("identifier", 0);
	            	if ( indexOfIdentifier >= 0) {
		    		wholeUrl = bookmarkId.substring(0, indexOfIdentifier);
		    	}
			CatalogSearchDisplayJS.showResultsPage = true;
			needContextUpdate = true;
		  	wholeUrl = unescape(wholeUrl);
		 }
		 if (needContextUpdate) {			
						
			cursor_wait();
			
			wc.render.getRefreshControllerById("catalogSearchResultDisplay_Controller").url = wholeUrl;			
			wc.render.updateContext("catalogSearchResultDisplay_Context", {searchResultsURL: wholeUrl});	
		}
		console.debug(methodName + " exit ");
	},
	
	/**
	* This function initializes the search page and sets the searchModeVisible value.
	*/
	initSearch:function(){
	
		var methodName = "initSearch" ;
		console.debug(methodName + " entry " );
		
		CatalogSearchDisplayJS.searchModeVisible = "true";
		console.debug(methodName + " value of searchMode " + CatalogSearchDisplayJS.searchModeVisible + " value of showResultPage " + CatalogSearchDisplayJS.showResultsPage);
		
	},		
	
	
	/**
	* This function sets the initial state of dojo browser history.  dojo API : dojo.undo.browser.setInitialState.
	* @param {string} workAreaModeValue a value to uniquely identify an context.
	* @param {string} elementId  the id of the widget.
	* @param {string} changeUrl   the url used to load new context.	
	*/
	initSearchHistory:function(workAreaModeValue, elementId, changeUrl){
	
		var methodName = "initSearchHistory";
		console.debug(methodName + " mode: " + workAreaModeValue + " id: " + elementId + " url " + changeUrl);	
		var historyObject = new CatalogSearchDisplayJS.HistoryTracker(workAreaModeValue, elementId, changeUrl);
		dojo.back.setInitialState(historyObject);	
	},
	
	/**
	* This function belong to HistoryTracking for receiving Back notifications.
	*/
	goBack:function(){
		
	cursor_wait();
		
		var form = document.getElementById("AdvancedCatalogSearchForm");
			CatalogSearchDisplayJS.loadContentFromURL(this.changeUrl);
			if(this.changeUrl!='advanced'){
				var requiredURLArray = [];
				requiredURLArray = this.changeUrl.toString().split("?");
				var searchURLArray = [];
				searchURLArray = requiredURLArray[1].toString().split("&");
				for(var i = 0; i < searchURLArray.length; i++){
					var searchParameterArray = [];
					searchParameterArray = searchURLArray[i].toString().split("=");
					if(form[searchParameterArray[0]]!= null && form[searchParameterArray[0]]!='undefined'){
						form[searchParameterArray[0]].value = searchParameterArray[1];
					}
				}
			}
			CatalogSearchDisplayJS.isHistory=true;
        },
        
   /**
	* This function belong to HistoryTracking for receiving forward notifications.	
	*/
        goForward:function(){
       
	        	
	cursor_wait();
	var form = document.getElementById("AdvancedCatalogSearchForm");
		CatalogSearchDisplayJS.loadContentFromURL(this.changeUrl);
	   var requiredURLArray = [];
				requiredURLArray = this.changeUrl.toString().split("?");
				var searchURLArray = [];
				searchURLArray = requiredURLArray[1].toString().split("&");
				for(var i = 0; i < searchURLArray.length; i++){
					var searchParameterArray = [];
					searchParameterArray = searchURLArray[i].toString().split("=");
					if(form[searchParameterArray[0]]!= null && form[searchParameterArray[0]]!='undefined'){
						form[searchParameterArray[0]].value = searchParameterArray[1];
					}
				}
		searchResultDivisionStyle = document.getElementById("Search_Result_div").style;
		if(searchResultDivisionStyle.display == "none"){
			dojo.style(dojo.byId("Search_Result_div"),"display","block");
		}
		CatalogSearchDisplayJS.showHideSearchMode(false);		
		CatalogSearchDisplayJS.isHistory=true;
        },
		
	/**
	* This function sets the History state object for history tracking.
	* @param {string} workAreaModeValue a value to uniquely identify an context.
	* @param {string} elementId  the id of the widget.
	* @param {string} changeUrl   the url used to load new context.	
	*/
	HistoryTracker:function(workAreaModeValue, elementId, changeUrl){
	
		this.workAreaModeValue = workAreaModeValue;
		this.elementId = elementId; 
		this.changeUrl =  changeUrl;
		
		
	}
	
	}
	/** Sets the HistoryTracking for receiving Back notifications. */
	CatalogSearchDisplayJS.HistoryTracker.prototype.back = CatalogSearchDisplayJS.goBack;
	/** Sets the HistoryTracking for receiving forward notifications. */
	CatalogSearchDisplayJS.HistoryTracker.prototype.forward=CatalogSearchDisplayJS.goForward;
	
