var THAutoSuggest = THAutoSuggest ||
{
	 construct:function($window)
    {
		THAutoSuggest.$element=$(THAutoSuggest.SELECTOR);
		THAutoSuggest._$autoSuggest_wrapper=THAutoSuggest.$element.children(".autoSuggest_wrapper");
		THAutoSuggest._$autoSuggest_content_div=THAutoSuggest._$autoSuggest_wrapper.children('#autoSuggest_content_div');
		THAutoSuggest._$autoSuggestDynamic_Result_div=THAutoSuggest._$autoSuggest_content_div.children('#autoSuggestDynamic_Result_div');
		THAutoSuggest._$searchWrapper=$('#headerLinks .utilMenu .searchWrapper');
		THAutoSuggest._$searchInput=$('#headerLinks .utilMenu #SimpleSearchForm_SearchTerm');
		THAutoSuggest._$searchLink=$('#headerLinks .utilMenu .searchLink');
    },
    
	init: function()
	{
		THAutoSuggest._bindEvents();
	},
	
	_bindEvents: function()
	{
		THAutoSuggest._$searchLink.click(THAutoSuggest._formSubmitFromSuggestion).mouseenter(function()
		{
			THAutoSuggest._$searchInput.focus();
		});
		
		THAutoSuggest._$searchWrapper.mouseleave(function()
		{
			THAutoSuggest._$searchInput.blur();
		});
		
		$('#searchRButton').add(THAutoSuggest._$searchLink).click(THAutoSuggest._formSubmit);

		//This is for mouse over on Search Suggestions dropbox
		THAutoSuggest.$element.on(
		{
			mouseenter: function ()
			{
				var $this=$(this);
				
				//remove prev selected item if one was selected with up/down arrow
				var $SearchSuggestions = THAutoSuggest._$autoSuggest_content_div.find('.searchDDItem');
				$SearchSuggestions.eq(THAutoSuggest.autoSelectOption).removeClass('selectedDDItem');

				//add highlight to mouse hovered item
				$this.addClass('selectedDDItem');

				if (!$this.hasClass('category')) //do not populate search input with value when category
				{
					var $selectedItem = THAutoSuggest._$autoSuggest_content_div.find('.selectedDDItem a');
					$('#SimpleSearchForm_SearchTerm').val( $.trim($selectedItem.attr('title')) );
				}

				var els = THAutoSuggest.$element.find('.searchDDItem'),
					currentElId = $this.attr('id'),
					index=-1;
				$.each(els, function(idx)
				{
					var _$this=$(this);
					if(_$this.attr('id')!=undefined && _$this.attr('id')==currentElId ) index = idx;
				});
				THAutoSuggest.autoSelectOption = index;
			},
			mouseleave: function ()
			{
				$(this).removeClass('selectedDDItem');
			}
		},'.searchDDItem');

		THAutoSuggest._$searchInput.on('focus',THAutoSuggest._clearSearchField);
		THAutoSuggest._$searchInput.on('keyup',THAutoSuggest._ajaxSearchSuggestions);
		THAutoSuggest._$searchInput.on('blur',THAutoSuggest._fillSearchField);
		THAutoSuggest._$searchInput.on('blur',THAutoSuggest._closeSuggestionResult);
		
		THAutoSuggest._$autoSuggest_wrapper.mouseenter(function()
		{
			$(this).addClass("mouseIsOver");
		}).mouseleave(function()
		{
			$(this).removeClass("mouseIsOver");
		});
		
		THAutoSuggest._$searchInput.on( 'keypress', function (event)
		{
			if(event.keyCode==13)
			{
				if(!THAutoSuggest._formSubmit()) return false;
			}
		});
	},
	
	_formSubmit:function()
	{
		if($.trim(THAutoSuggest._$searchInput.val()).length)
		{
			$('#CatalogSearchForm').submit();
			return true;
		} else return false;
	},
	
	_formSubmitFromSuggestion:function()
	{
		var suggestion=$.trim(THAutoSuggest._$autoSuggest_content_div.find('.selectedDDItem a').attr('title'));
		if(suggestion.length)
		{
			THAutoSuggest._$searchInput.val(suggestion);
			return THAutoSuggest._formSubmit();
		} else return false;
	},
	
	_closeSuggestionResult:function()
	{
		if(!THAutoSuggest._$autoSuggest_wrapper.hasClass("mouseIsOver")) THAutoSuggest.$element.hide();
	},
	
	_showAutoSuggestIfResults:function()
	{
		// if no results, hide the autosuggest box
		if(typeof(staticContent) !== "undefined" && document.getElementById(staticContentSectionDiv[0]).innerHTML === "" && $('#autoSuggestHistory').html() === "" && $('#dynamicAutoSuggestTotalResults') === null) THAutoSuggest._showAutoSuggest(false);
		else if(THAutoSuggest._$searchInput.val().length <= THAutoSuggest.AUTOSUGGEST_THRESHOLD) THAutoSuggest._showAutoSuggest(false);
		else THAutoSuggest._showAutoSuggest(true);
	},
	
	_showAutoSuggest:function(display)
	{
		if(display) THAutoSuggest.$element.show();
		else THAutoSuggest.$element.hide();
	},
	
	_clearSearchField:function()
	{
		var $this=$(this);
		var searchText=$this.val();
		if(searchText==$this.data("defaultvalue")) $this.val("");
		else
		{
			THAutoSuggest._$searchInput.select();
			THAutoSuggest._showAutoSuggestIfResults();
		}
	},
	
	_fillSearchField:function()
	{
		THAutoSuggest._$searchInput.each(function()
		{
			var $this=$(this);
			if($this.val()=='') $this.val($this.data("defaultvalue"));
		});
	},
	
	selectAutoSuggest:function(term)
	{
		var searchBox = THAutoSuggest._$searchInput.val(term);
		THAutoSuggest.autoSuggestPreviousTerm = term;
		THAutoSuggest._formSubmitFromSuggestion();
	},
	
	_clearAutoSuggestResults:function()
	{
		// clear the static search results.
		for (var i = 0; i < staticContent.length; i++)
		{
			$('#'+staticContentSectionDiv[i]).empty();
		}
		
		THAutoSuggest.autoSuggestPreviousTerm = "";
		THAutoSuggest.autoSuggestURL = "";
		
		// clear the dynamic search results;
		THAutoSuggest._$autoSuggestDynamic_Result_div.empty();
		THAutoSuggest._showAutoSuggest(false);
	},
	
	_generateStaticCategoryList:function(searchTerm)
	{
		var resultList = ["", "", "", "", "", ""],
			emptyCell = 0,
			searchTermLower = searchTerm.toLowerCase(),
			listCount = THAutoSuggest.CACHED_AUTOSUGGEST_OFFSET;
		for(var i = 0; i < staticContent.length; i++) {
			var count = 0;
			for(var j = 0; j < staticContent[i].length; j++) {
				var searchName = staticContent[i][j][0],
					searchURL = staticContent[i][j][1],
					displayName = staticContent[i][j][2],
					index = searchName.toLowerCase().indexOf(searchTermLower);
				if(index !== -1) {
					var displayIndex = index + displayName.length - searchName.length;
					resultList[i] = resultList[i] + "<li id='suggestionItem_" + listCount + "' role='listitem' class='searchDDItem category' tabindex='-1'><a id='autoSelectOption_" + listCount + "' title='" + displayName + "' onmouseout='this.className=\"\"; autoSuggestURL=\"\";' onmouseover='enableAutoSelect(" + listCount + "); autoSuggestURL=this.href;' href=\"" + searchURL + "\">" + displayName.substr(0, displayIndex) + "<strong>" + displayName.substr(displayIndex, searchTerm.length) + "</strong>" + displayName.substr(displayIndex + searchTerm.length) + "</a></li>";
					count++;
					listCount++;
					if(count >= THAutoSuggest.TOTAL_SUGGESTED) {
						break;
					}
				}
			}
		}

		for (var i = 0; i < staticContent.length; i++) {
			document.getElementById(staticContentSectionDiv[i]).innerHTML = "";
			if(resultList[i] !== "") {
				document.getElementById(staticContentSectionDiv[emptyCell]).innerHTML = "<div class='results'><div class='heading'>" + staticContentHeaders[i] + "</div><ul>" + resultList[i] + "</ul></div>";
				emptyCell++;
			}
		}

		return [emptyCell, listCount];
	},
	
	_generateStaticHistoryList:  function(searchTerm,emptyCell,listCount) {
		var historyList = "",
			$searchHistorySection = $('#autoSuggestHistory'),
			searchTermLower = searchTerm.toLowerCase(),
			historyArray = new Array();

		$searchHistorySection.empty();
		THAutoSuggest.historyIndex = listCount;
		
		var searchHistoryCookie = unescape(THUtil.getCookie("searchTermHistory"));
		if(searchHistoryCookie) {
			var termsArray = searchHistoryCookie.split("|"),
				count = 0;
			for(var i = termsArray.length - 1; i > 0; i--) {
				var theTerm = termsArray[i],
					theLowerTerm = theTerm.toLowerCase();
				if(theLowerTerm.match("^"+searchTermLower) == searchTermLower) {
					var repeatedTerm = false;
					for(var j = 0; j < historyArray.length; j++) {
						if(historyArray[j] == theLowerTerm) {
							repeatedTerm = true;
							break;
						}
					}
					if(!repeatedTerm) {
						historyList = historyList + "<li id='suggestionItem_" + listCount + "' role='listitem' class='searchDDItem' tabindex='-1'><a href='#' onmouseout='this.className=\"\"' onmouseover='enableAutoSelect(" + listCount + ");' onclick='THAutoSuggest.selectAutoSuggest(this.title); return false;' title=\"" + theTerm + "\" id='autoSelectOption_" + listCount+ "'><strong>" + searchTerm + "</strong>" + theTerm.substring(searchTerm.length, theTerm.length) + "</a></li>";
						historyArray.push(theLowerTerm);
						count++;
						listCount++;
						if(count >= THAutoSuggest.TOTAL_HISTORY) {
							break;
						}
					}
				}
			}
		}

		if(historyList != "") {
			$searchHistorySection.html("<div class='results'><div class='heading'>" + staticContentHeaderHistory + "</div><ul>" + historyList + "</ul></div>");
			emptyCell++;
		}

		if(emptyCell > 0) {
			THAutoSuggest._showAutoSuggest(true);
			return true;
		}

		return false;
	},
	
	_doDynamicAutoSuggest: function(url, searchTerm, showHeader)
	{
		if(THAutoSuggest.autoSuggestTimer !== -1)
		{
			clearTimeout(THAutoSuggest.autoSuggestTimer);
			THAutoSuggest.autoSuggestTimer = -1;
		}
		
		THAutoSuggest.autoSuggestTimer = setTimeout(function() {
			var searchRequest =    $.post(url, { term:searchTerm, showHeader:showHeader })
									.success (function(data)
									{
										THAutoSuggest._$autoSuggestDynamic_Result_div.html(data);
										THAutoSuggest.$element.show();
							    	})
							    	.error (function() {
							    		console.log("Error in Ajax SearchRequest.");
									});
		},THAutoSuggest.autoSuggestKeystrokeDelay);
	},
	
	_doAutoSuggest: function (event) {
		var searchTerm = THAutoSuggest._$searchInput.val(),
			url = THAutoSuggest._$searchInput.attr('data-term-search-url');

		if(searchTerm.length <= THAutoSuggest.AUTOSUGGEST_THRESHOLD ) {
			THAutoSuggest._showAutoSuggest(false);
		}

		if(event.which === 13) {
			return;
		}

		if (event.which === 27) {
			THAutoSuggest._showAutoSuggest(false)
			return;
		}

		if(event.which === 38 || event.which === 40) {
			var $searchTermInput = $('#SimpleSearchForm_SearchTerm'),
				$SearchSuggestions = THAutoSuggest._$autoSuggest_content_div.find('.searchDDItem'),
				numSuggestions = $SearchSuggestions.length;

			if (THAutoSuggest.autoSelectOption === -1 && event.which === 40) {
				var $newSelection = $SearchSuggestions.eq(0).addClass('selectedDDItem');
				if ( ! $newSelection.is('.category') ) { //do not populate search input with value when category
					var $selectedItem = THAutoSuggest._$autoSuggest_content_div.find('.selectedDDItem a');
					$searchTermInput.val( $.trim($selectedItem.attr('title')) );
				}
				THAutoSuggest.autoSelectOption = 0;
			}
			else if (THAutoSuggest.autoSelectOption === 0 && event.which === 38) { //UP ARROW
				$SearchSuggestions.eq(0).removeClass('selectedDDItem');
				$searchTermInput.focus();
				THAutoSuggest.autoSelectOption = -1;
			}
			else if ( event.which === 38 ) { //UP ARROW
				$SearchSuggestions.eq(THAutoSuggest.autoSelectOption).removeClass('selectedDDItem');
				--THAutoSuggest.autoSelectOption;
				var $newSelection = $SearchSuggestions.eq(THAutoSuggest.autoSelectOption).addClass('selectedDDItem');
				if ( ! $newSelection.is('.category') ) { //do not populate search input with value when category
					var $selectedItem = THAutoSuggest._$autoSuggest_content_div.find('.selectedDDItem a');
					$searchTermInput.val( $.trim($selectedItem.attr('title')) );
				}
			}
			else if ( numSuggestions-1 === THAutoSuggest.autoSelectOption && event.which === 40 ) { //DOWN ARROW
				return;
			}
			else if ( event.which === 40 ) { //DOWN ARROW
				$SearchSuggestions.eq(THAutoSuggest.autoSelectOption).removeClass('selectedDDItem');
				++THAutoSuggest.autoSelectOption;
				var $newSelection = $SearchSuggestions.eq(THAutoSuggest.autoSelectOption).addClass('selectedDDItem');
				if ( ! $newSelection.is('.category') ) { //do not populate search input with value when category
					var $selectedItem = THAutoSuggest._$autoSuggest_content_div.find('.selectedDDItem a');
					$searchTermInput.val( $.trim($selectedItem.attr('title')) );
				}
			}

			return;
		}

		if(searchTerm.length > THAutoSuggest.AUTOSUGGEST_THRESHOLD && searchTerm === THAutoSuggest.autoSuggestPreviousTerm) {
			return;
		}
		else {
			THAutoSuggest.autoSuggestPreviousTerm = searchTerm;
		}

		if(searchTerm.length <= THAutoSuggest.AUTOSUGGEST_THRESHOLD) {
			return;
		};

		// cancel the dynamic search if one is pending
		if(THAutoSuggest.autoSuggestTimer !== -1) {
			clearTimeout(THAutoSuggest.autoSuggestTimer);
			THAutoSuggest.autoSuggestTimer = -1;
		}

		if(searchTerm.length)
		{
			THAutoSuggest.autoSelectOption = -1;
			var emptyCell, listCount;
			var arr = THAutoSuggest._generateStaticCategoryList(searchTerm);
			emptyCell = arr[0];
			listCount = arr[1];
			var hasResults = THAutoSuggest._generateStaticHistoryList(searchTerm, emptyCell, listCount);
			if(searchTerm.length > THAutoSuggest.DYNAMIC_AUTOSUGGEST_THRESHOLD)
			{
				var showHeader = true; // hasResults;
				THAutoSuggest._doDynamicAutoSuggest(url, searchTerm, showHeader);
			} else THAutoSuggest._$autoSuggestDynamic_Result_div.empty();
		} else THAutoSuggest._clearAutoSuggestResults();
	},
	
	_ajaxSearchSuggestions: function(event)
	{
		THAutoSuggest._doAutoSuggest(event);
	},
	
	SELECTOR:'#autoSuggest_Result_div',
    $element:null,
    _$searchWrapper:null,
    _$searchInput:null,
	_$searchLink:null,
	_$simpleSearchForm_SearchTerm:null,
	_$autoSuggest_wrapper:null,
	_$autoSuggestDynamic_Result_div:null,
	_$autoSuggest_content_div:null,
	
	/**
	 * This variable controls the timer handler before triggering the autoSuggest.  If the user types fast, intermittent requests will be cancelled.
	 * The value is initialized to -1.
	 */
	autoSuggestTimer : -1,

	/**
	 * This variable controls the delay of the timer in milliseconds between the keystrokes before firing the search request.
	 * The value is initialized to 250.
	 */
	autoSuggestKeystrokeDelay : 250,

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
	CACHED_AUTOSUGGEST_OFFSET : 1000
}

/* DOJO OVERWRITES FOR TYPE AHEAD */
function enableAutoSelect(digit) {}
