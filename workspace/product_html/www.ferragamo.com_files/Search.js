// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

if(typeof(SearchJS) == "undefined" || SearchJS == null || !SearchJS){
	
	SearchJS = { 

		/** 
		 * This variable controls the timer handler before triggering the autoSuggest.  If the user types fast, intermittent requests will be cancelled.
		 * The value is initialized to -1.
		 */
		autoSuggestTimer: -1,

		/** 
		 * This variable controls the delay of the timer in milliseconds between the keystrokes before firing the search request.
		 * The value is initialized to 400.
		 */
		autoSuggestKeystrokeDelay : 400,

		/** 
		 * This variable indicates whether or not the user is hovering over the autoSuggest results popup display.
		 * The value is initialized to false.
		 */
		autoSuggestHover : false,

		/** 
		 * This variable stores the old search term used in the auto suggest search box
		 * The value is initialized to empty string.
		 */
		autoSuggestPreviousTerm : "",

		/** 
		 * This variable stores the URL of currently selected static autosuggest recommendation
		 * The value is initialized to empty string.
		 */
		autoSuggestURL : "",

		/** 
		 * This variable stores the index of the selected auto suggestion item when using up/down arrow keys.
		 * The value is initialized to -1.
		 */
		autoSelectOption : -1,

		/** 
		 * This variable stores the index offset of the first previous history term
		 * The value is initialized to -1.
		 */
		historyIndex : -1,

		/** 
		 * This variable indicates whether a the cached suggestions have been retrieved.
		 * The value is initialized to false.
		 */
		retrievedCachedSuggestions : false,

		/** 
		 * This variable sets the total number of static autosuggest recommendations used for each static category/grouping.
		 * The value is initialized to 4.
		 */
		TOTAL_SUGGESTED : 4,

		/** 
		 * This variable sets the total number of previous search history terms.
		 * The value is initialized to 2.
		 */
		TOTAL_HISTORY : 2,

		/** 
		 * This variable controls when to trigger the auto suggest box.  The number of characters greater than this threshold will trigger the auto suggest functionality.
		 * The static/cached auto suggest will be performed if this threshold is exceeded.
		 * The value is initialized to 1.
		 */
		AUTOSUGGEST_THRESHOLD : 1,

		/** 
		 * This variable controls when to trigger the dynamic auto suggest.  The number of characters greater than this threshold will trigger the request for keyword search.
		 * The static/cached auto suggest will be be displayed if the characters exceed the above config parameter, but exceeding this threshold will additionally perform the dynamic search to add to the results in the static/cached results.
		 * This value should be greater or equal than the AUTOSUGGEST_THRESHOLD, as the dynamic autosuggest is secondary to the static/cached auto suggest.
		 * The value is initialized to 1.
		 */
		DYNAMIC_AUTOSUGGEST_THRESHOLD : 1,

		/** 
		 * This variable is an internal constant used in the element ID's generated in the autosuggest content.
		 * The value is initialized to 1000.
		 */
		CACHED_AUTOSUGGEST_OFFSET : 1000,

		/**
		  * The auto suggest container ID's
		 */
		STATIC_CONTENT_SECTION_DIV: ["autoSuggestStatic_1", "autoSuggestStatic_2", "autoSuggestStatic_3"],


		/**
		 * NLS message for header
		*/
		staticContentHeaderHistory:"",

		/**
		 * URL to retrieve Cached suggestions
		*/
		CachedSuggestionsURL:"",

		/**
		 * URL to retrieve auto suggest keywords
		*/
		SearchAutoSuggestServletURL:"",

		/**
		 * Timeout variable for department dropdown list
		*/
		searchDepartmentHoverTimeout:"",

		searchDepartmentSelect: function(categoryId, lel){
			$('searchDepartmentLabel').innerHTML=lel.innerHTML;
			$('search_categoryId').value = categoryId;
			this.hideSearchDepartmentList();
			return false;
		},
		
		cancelEvent: function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.cancelBubble = true;
			e.cancel = true;
			e.returnValue = false;
		},
		
		searchDepartmentKeyPressed: function(event, pos, size, categoryId, item){
			if (event.keyCode == 13) { // enter
				this.searchDepartmentSelect(categoryId, item);
				dojo.byId('SimpleSearchForm_SearchTerm').focus();
			} else if (event.keyCode == 38) { // up arrow
				if (pos != 0) {
					dojo.byId('searchDepartmentList_' + (pos - 1)).focus();
					this.cancelEvent(event);
				}
			} else if (event.keyCode == 40) { // down arrow
				if (pos != size) {
					dojo.byId('searchDepartmentList_' + (pos + 1)).focus();
					this.cancelEvent(event);
				}
			} else if (event.keyCode == 27) { // escape
				dojo.byId('SimpleSearchForm_SearchTerm').focus();
				this.hideSearchDepartmentList();
			} else if (event.shiftKey && event.keyCode == 9) { // tab
				dojo.byId('SimpleSearchForm_SearchTerm').focus();
				this.cancelEvent(event);
				this.hideSearchDepartmentList();
			} else if (event.keyCode == 9) { // tab
				dojo.byId('search_submit').focus();
				this.cancelEvent(event);
				this.hideSearchDepartmentList();			
			}
			
			return false;
		},

		hideSearchDepartmentList: function(){
			$('searchDepartmentList').style.display="none";
		},

		init:function(){
			dojo.connect(dojo.byId("SimpleSearchForm_SearchTerm"), "onfocus", SearchJS, SearchJS._onFocus);
			dojo.connect(dojo.byId("SimpleSearchForm_SearchTerm"), "onblur", SearchJS, SearchJS._onBlur);
			dojo.connect(dojo.byId("SimpleSearchForm_SearchTerm"), "onkeyup", SearchJS, SearchJS._onKeyUp);

			dojo.connect(dojo.byId("search_submit"), "onclick", SearchJS, SearchJS._onClick);
			dojo.connect(dojo.byId("viewAllResults"), "onclick", SearchJS, SearchJS._onClick);
			
			this.staticContentHeaderHistory = storeNLS["HISTORY"];
		},

		setCachedSuggestionsURL:function(url){
			this.CachedSuggestionsURL = getAbsoluteURL() + url;
		},
		
		setAutoSuggestURL:function(url){
			this.SearchAutoSuggestServletURL = getAbsoluteURL() + url;
		},

		_onFocus:function(evt){
			this.retrieveCachedSuggestions(); 
			this.clearSearchField();
		},

		_onBlur:function(evt){
			this.fillSearchField();
		},
		
		_onKeyPress:function(evt){
			return evt.keyCode != dojo.keys.ENTER;
		},

		_onKeyUp:function(evt){
			this.doAutoSuggest(evt, this.SearchAutoSuggestServletURL, dojo.byId("SimpleSearchForm_SearchTerm").value);
		},

		_handleEnterKey:function() {
			
			if(document.CatalogSearchForm.searchTerm.value.length > 0) {
				
				if(this.autoSuggestURL != "") {
					
					//When enter key is hit with one of the suggested keywords or results highlighted, then go to the URL specified for that result..
					// go to suggested URL
					document.location.href = this.autoSuggestURL;
				}
				else {
					
					//Enter key is hit, when the focus was in search term input box.. Submit the form and get the results..
					document.CatalogSearchForm.searchTerm.value = trim(document.CatalogSearchForm.searchTerm.value);
					submitSpecifiedForm(document.CatalogSearchForm);
				}
			}
			voidCheck();
		},
	
		_onClick:function(evt){
			
			document.CatalogSearchForm.searchTerm.value = trim(document.CatalogSearchForm.searchTerm.value);
		
			if(document.CatalogSearchForm.searchTerm.value.length > 0) {
				submitSpecifiedForm(document.CatalogSearchForm);
			}
			return false;
		},

		doDynamicAutoSuggest:function(url, searchTerm, showHeader) {		
			// if pending autosuggest triggered, cancel it.
			if(this.autoSuggestTimer != -1) {
				clearTimeout(this.autoSuggestTimer);
				this.autoSuggestTimer = -1;
			};

			// call the auto suggest
			this.autoSuggestTimer = setTimeout(function() {
				wc.render.getRefreshControllerById("AutoSuggestDisplayController").url = url + "&term=" + encodeURIComponent(searchTerm) + "&showHeader=" + showHeader;
				console.debug("update autosuggest "+url);
				wc.render.updateContext("AutoSuggest_Context", {});
				this.autoSuggestTimer = -1;
			}, this.autoSuggestKeystrokeDelay);
		},


		showAutoSuggest:function(display) {
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
		},

		showAutoSuggestIfResults:function() {
			// if no results, hide the autosuggest box
			if(typeof(staticContent) != "undefined" && document.getElementById(this.STATIC_CONTENT_SECTION_DIV[0]).innerHTML == "" && document.getElementById("autoSuggestHistory").innerHTML == "" && document.getElementById("dynamicAutoSuggestTotalResults") == null) {
				this.showAutoSuggest(false);
			}
			else if(document.getElementById("SimpleSearchForm_SearchTerm").value.length <= this.AUTOSUGGEST_THRESHOLD) {
				this.showAutoSuggest(false);
			}
			else {
				this.showAutoSuggest(true);
			}
		},

		selectAutoSuggest:function(term) {
			var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
			searchBox.value = term;
			searchBox.focus();
			this.autoSuggestPreviousTerm = term;
			submitSpecifiedForm(document.CatalogSearchForm);
		},

		highLightSelection:function(state, index) {
			var selection = document.getElementById("autoSelectOption_" + index);
			if(selection != null && selection != 'undefined') {

				if(state) {
					selection.className = "autoSuggestSelected";
					var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
					searchBox.setAttribute("aria-activedescendant", "suggestionItem_" + index);
					var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
					if((totalDynamicResults != null && totalDynamicResults != 'undefined' && index < totalDynamicResults.value) || (index >= this.historyIndex)) {
						searchBox.value = selection.title;
						this.autoSuggestPreviousTerm = selection.title;
						this.autoSuggestURL = "";
					}
					else {
						this.autoSuggestURL = selection.href;
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
		},

		enableAutoSelect:function(index) {
			this.highLightSelection(false, this.autoSelectOption);
			var item = document.getElementById('autoSelectOption_' + index);
			item.className = "autoSuggestSelected";
			this.autoSelectOption = index;
		},

		resetAutoSuggestKeyword:function() {
			var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
			if(originalKeyedSearchTerm != null && originalKeyedSearchTerm != 'undefined') {
				var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
				searchBox.value = originalKeyedSearchTerm.value;
				this.autoSuggestPreviousTerm = originalKeyedSearchTerm.value;
			}
		},

		clearAutoSuggestResults:function() {
			// clear the static search results.
			for (var i = 0; i < staticContent.length; i++) {
				document.getElementById(this.STATIC_CONTENT_SECTION_DIV[i]).innerHTML = "";
			}
			this.autoSuggestPreviousTerm = "";
			this.autoSuggestURL = "";
			// clear the dynamic search results;
			document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
			this.showAutoSuggest(false);
		},

		doAutoSuggest:function(event, url, searchTerm) {
			if(searchTerm.length <= this.AUTOSUGGEST_THRESHOLD ) {
				this.showAutoSuggest(false);
			}

			if(event.keyCode == dojo.keys.ENTER) {
				this._handleEnterKey();
				return;
			}

			if(event.keyCode == dojo.keys.TAB) {
				this.autoSuggestHover = true;
				return;
			}

			if(event.keyCode == dojo.keys.ESCAPE) {
				this.showAutoSuggest(false);
				return;
			}

			if(event.keyCode == dojo.keys.UP_ARROW) {
				var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
				if(this.highLightSelection(true, this.autoSelectOption-1)) {
					this.highLightSelection(false, this.autoSelectOption);
					if(this.autoSelectOption == this.historyIndex) {
						this.resetAutoSuggestKeyword();
					}
					this.autoSelectOption--;
				}
				else if(this.autoSelectOption == this.CACHED_AUTOSUGGEST_OFFSET && totalDynamicResults != null && totalDynamicResults != 'undefined') {
					this.highLightSelection(false, this.CACHED_AUTOSUGGEST_OFFSET);		
					this.autoSelectOption = totalDynamicResults.value-1;
					this.highLightSelection(true, this.autoSelectOption);
				}
				else {
					// up arrow back to the very top
					this.highLightSelection(false, this.autoSelectOption);
					this.autoSelectOption = -1;
					var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
					this.resetAutoSuggestKeyword();
				}
				return;
			}

			if(event.keyCode == dojo.keys.DOWN_ARROW) {
				if(this.highLightSelection(true, this.autoSelectOption+1)) {
					this.highLightSelection(false, this.autoSelectOption);
					this.autoSelectOption++;
				}
				else if(this.autoSelectOption < this.CACHED_AUTOSUGGEST_OFFSET && this.highLightSelection(true, this.CACHED_AUTOSUGGEST_OFFSET)) {
					// down arrow into the cached autosuggest section
					this.highLightSelection(false, this.autoSelectOption);
					this.autoSelectOption = this.CACHED_AUTOSUGGEST_OFFSET;
					this.resetAutoSuggestKeyword();
				}
				return;
			}

			if(searchTerm.length > this.AUTOSUGGEST_THRESHOLD && searchTerm == this.autoSuggestPreviousTerm) {
				return;
			}
			else {
				this.autoSuggestPreviousTerm = searchTerm;
			}

			if(searchTerm.length <= this.AUTOSUGGEST_THRESHOLD) {
				return;
			};

			// cancel the dynamic search if one is pending
			if(this.autoSuggestTimer != -1) {
				clearTimeout(this.autoSuggestTimer);
				this.autoSuggestTimer = -1;
			}

			if(searchTerm != "") {
				this.autoSelectOption = -1;
				var hasResults = this.doStaticAutoSuggest(searchTerm);
				if(searchTerm.length > this.DYNAMIC_AUTOSUGGEST_THRESHOLD) {
					var showHeader = true; // hasResults;
					//FRGMWCS-265: disabilitata post per auto suggest url
					//this.doDynamicAutoSuggest(url, searchTerm, showHeader);
				}
				else {
					// clear the dynamic results
					document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
				}
			}
			else {
				this.clearAutoSuggestResults();
			}
		},


		doStaticAutoSuggest:function(searchTerm) {
			var resultList = ["", "", "", "", "", ""];
			var emptyCell = 0;
			var searchTermLower = searchTerm.toLowerCase();
			var listCount = this.CACHED_AUTOSUGGEST_OFFSET;

			var divStart = "<div class='list_section'><ul";
			var divEnd =   "</ul></div>";

			for(var i = 0; i < staticContent.length; i++) {
				var count = 0;
				for(var j = 0; j < staticContent[i].length; j++) {
					var searchName = staticContent[i][j][0];
					var searchURL = staticContent[i][j][1];
					var displayName = staticContent[i][j][2];
					var index = searchName.toLowerCase().indexOf(searchTermLower);
					if(index != -1) {

						var displayIndex = index + displayName.length - searchName.length;
						var subStringBefore = displayName.substr(0, displayIndex);
						var subStringAfter =  displayName.substr(displayIndex + searchTerm.length);
						var highlightedSearchTerm = "<span class='highlight'>" + searchTerm + "</span>";

						resultList[i] = resultList[i] + "<li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'><a id='autoSelectOption_" + listCount + "' title='" + displayName + "' onmouseout='this.className=\"\"; this.autoSuggestURL=\"\";' onmouseover='SearchJS.enableAutoSelect(" + listCount + "); this.autoSuggestURL=this.href;' href=\"" + searchURL + "\">" + subStringBefore + highlightedSearchTerm + subStringAfter + "</a></li>";
						count++;
						listCount++;
						if(count >= this.TOTAL_SUGGESTED) {
							break;
						}
					}
				}
			}

			for (var i = 0; i < staticContent.length; i++) {
				document.getElementById(this.STATIC_CONTENT_SECTION_DIV[i]).innerHTML = "";
				if(resultList[i] != "") {
					var heading =  "<div class='heading'><span>" + staticContentHeaders[i] + "</span></div>"
					document.getElementById(this.STATIC_CONTENT_SECTION_DIV[emptyCell]).innerHTML =  heading + divStart + " title='" + staticContentHeaders[i] + "'>" + resultList[i] + divEnd;
					emptyCell++;
				}
			}

			var historyList = "";
			var searchHistorySection = document.getElementById("autoSuggestHistory");
			searchHistorySection.innerHTML = "";
			var historyArray = new Array();
			this.historyIndex = listCount;

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
							historyList = historyList + "<li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'><a href='#' onmouseout='this.className=\"\"' onmouseover='SearchJS.enableAutoSelect(" + listCount + ");' onclick='SearchJS.selectAutoSuggest(this.title); return false;' title=\"" + theTerm + "\" id='autoSelectOption_" + listCount+ "'><strong>" + searchTerm + "</strong>" + theTerm.substring(searchTerm.length, theTerm.length) + "</a></li>";
							historyArray.push(theLowerTerm);
							count++;
							listCount++;
							if(count >= this.TOTAL_HISTORY) {
								break;
							}
						}
					}
				}
			}


			if(historyList != "") {
				var heading =  "<div class='heading'><span>" + this.staticContentHeaderHistory + "</span></div>"
				searchHistorySection.innerHTML = heading + divStart + " title='" + this.staticContentHeaderHistory + "'>" + historyList + divEnd;
				emptyCell++;
			}

			if(emptyCell > 0) {
				this.showAutoSuggest(true);
				return true;
			}

			return false;
		},

		retrieveCachedSuggestions:function() {
			if(!this.retrievedCachedSuggestions) {
				wc.render.getRefreshControllerById("AutoSuggestCachedSuggestionsController").url = this.CachedSuggestionsURL;
				console.debug("update cache sugg "+this.CachedSuggestionsURL);
				wc.render.updateContext("CachedSuggestions_Context", {});
			}
		},

		/**
		 * Clears the Search term string displayed in Simple Search field.
		 */
		clearSearchField:function() {
			searchText = document.getElementById("SimpleSearchForm_SearchTerm").value;
			if(searchText == document.getElementById("searchTextHolder").innerHTML){
				document.getElementById("SimpleSearchForm_SearchTerm").value = "";
			}
			else{
				document.getElementById("SimpleSearchForm_SearchTerm").select();
				this.showAutoSuggestIfResults();
				this.autoSuggestHover = false;
			}
		},

		/**
		 * Displays the Search term string in Simple Search field.
		 */
		fillSearchField:function() {
			if (document.getElementById("SimpleSearchForm_SearchTerm").value == "") {
				document.getElementById("SimpleSearchForm_SearchTerm").className = "search_input gray_color";
				document.getElementById("SimpleSearchForm_SearchTerm").value = document.getElementById("searchTextHolder").innerHTML;
			}
			// hide the search box results
			if(!this.autoSuggestHover) {
				this.showAutoSuggest(false);
			}
		},

		/**
		 * Toggles the search results tab on the search results page.
		 */
		selectSearchResultsTab:function(tabId) {
			document.getElementById("productsResultTab").setAttribute("class", "tab_container inactive_tab");
			document.getElementById("productsResultTab_wrapper").setAttribute("aria-selected", "false");
			document.getElementById("productsSearchBasedNavigationWidget").style.display = "none";
			document.getElementById("contentsResultTab").setAttribute("class", "tab_container inactive_tab");
			document.getElementById("contentsResultTab_wrapper").setAttribute("aria-selected", "false");
			document.getElementById("contentsSearchBasedNavigationWidget").style.display = "none";
			
			document.getElementById(tabId+"ResultTab").setAttribute("class", "tab_container active_tab focused_tab");
			document.getElementById(tabId+"ResultTab_wrapper").setAttribute("aria-selected", "true");
			document.getElementById(tabId+"SearchBasedNavigationWidget").style.display = "block";
		},
		
		selectSearchResultsTabWithKeyboard:function(tabId, event) {
			if (event.keyCode == dojo.keys.SPACE) {
				this.selectSearchResultsTab(tabId);
				this.cancelEvent(event);
			}
		},

		focusSearchResultTab: function(tabId) {
			if (document.getElementById(tabId).getAttribute("class").indexOf("inactive_tab") > 0) {
				document.getElementById(tabId).setAttribute("class", "tab_container inactive_tab focused_tab");
			} else {
				document.getElementById(tabId).setAttribute("class", "tab_container active_tab focused_tab");
			}
		},
		
		onBlurSearchResultTab: function(tabId) {
			if (document.getElementById(tabId).getAttribute("class").indexOf("inactive_tab") > 0) {
				document.getElementById(tabId).setAttribute("class", "tab_container inactive_tab");
			} else {
				document.getElementById(tabId).setAttribute("class", "tab_container active_tab");
			}
		},

		/**
		 * Updates the searchTermHistory cookie value...
		 */
		updateSearchTermHistoryCookie:function(updatedSearchTerm){
			var cookieKey = "searchTermHistory";
			var cookieValue = "|" + updatedSearchTerm;
			var searchTermHistoryCookie = getCookie(cookieKey);
			if(typeof(searchTermHistoryCookie) != 'undefined') {
				cookieValue =  dojo.cookie(cookieKey) + cookieValue;
			}
			dojo.cookie(cookieKey, cookieValue, {path:'/'});
		},

		updateSearchTermHistoryCookieAndRedirect:function(updatedSearchTerm, redirectURL){
			this.updateSearchTermHistoryCookie(updatedSearchTerm);
			document.location.href = redirectURL;
		}

	};

	/**
	 * Declares a new render context for the AutoSuggest display.
	 */
	wc.render.declareContext("AutoSuggest_Context",null,"");

	/**
	 * Declares a new render context for the Cached Suggestions.
	 */
	wc.render.declareContext("CachedSuggestions_Context",null,"");

	/** 
	 * Declares a new refresh controller for Cached Suggestions
	 */
	wc.render.declareRefreshController({
	   id: "AutoSuggestCachedSuggestionsController",
	   renderContext: wc.render.getContextById("CachedSuggestions_Context"),
	   url: "",
	   formId: ""

	   /** 
		* Retrieves the cached suggestions used in the autosuggest box.
		* This function is called when a render context changed event is detected. 
		* 
		* @param {string} message The render context changed event message
		* @param {object} widget The registered refresh area
		*/
	   ,renderContextChangedHandler: function(message, widget) {
			  var controller = this;
			  var renderContext = this.renderContext;
			  widget.refresh(renderContext.properties);
	   }

	   /** 
		* Updates the cached suggestions.
		* 
		* @param {object} widget The registered refresh area
		*/
	   ,postRefreshHandler: function(widget) {
			  var controller = this;
			  var renderContext = this.renderContext;
			  var response = document.getElementById('cachedSuggestions');
			  if(response == null) {
					 // No response or an error page.   Clear the contents.
					 document.getElementById("autoSuggestCachedSuggestions_div").innerHTML = "";
			  }
			  else {
					 var scripts = response.getElementsByTagName("script");
					 var j = scripts.length;
					 for (var i = 0; i < j; i++){
							var newScript = document.createElement('script');
							newScript.type = "text/javascript";
							newScript.text = scripts[i].text;
							document.getElementById('autoSuggestCachedSuggestions_div').appendChild (newScript);
					 }
					 SearchJS.retrievedCachedSuggestions = true;
					 var searchTerm = document.getElementById("SimpleSearchForm_SearchTerm").value;
					 if(searchTerm.length > SearchJS.AUTOSUGGEST_THRESHOLD) {
							SearchJS.doStaticAutoSuggest(searchTerm);
					 }
			  }
	   }
	});

		/** 
		 * Declares a new refresh controller for Auto Suggest
		 */
	wc.render.declareRefreshController({
		   id: "AutoSuggestDisplayController",
		   renderContext: wc.render.getContextById("AutoSuggest_Context"),
		   url: "",
		   formId: ""

		   /** 
			* Displays the keyword suggestions from the search index
			* This function is called when a render context changed event is detected. 
			* 
			* @param {string} message The render context changed event message
			* @param {object} widget The registered refresh area
			*/
		   ,renderContextChangedHandler: function(message, widget) {
				  var controller = this;
				  var renderContext = this.renderContext;
				  widget.refresh(renderContext.properties);
		   }

		   /** 
			* Display the results.
			* 
			* @param {object} widget The registered refresh area
			*/
		   ,postRefreshHandler: function(widget) {
				  var controller = this;
				  var renderContext = this.renderContext;
				  var response = document.getElementById('suggestedKeywordResults');
				  if(response == null) {
					// No response or an error page.   Clear the contents.
					document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
				  }
				  SearchJS.showAutoSuggestIfResults();
		   }
	});

}