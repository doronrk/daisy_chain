//Search Suggestion Module, specific for typeahead dimension search, implemented as a jQuery Plugin
(
function($j)
{
	/**
	 *Constructor,
	 *@param $ele the Element to enable Dim Search Suggestion
	 *@param opts the options to be applied
	 */
	$j.EndecaSearchSuggestor = function(ele, opts)
	{
		this._active = true;
		this._options = opts;
		this._lastValue = '';
		this._element = ele;
		this._container = $j('<div class="' + this._options.containerClass + '"></>');
		this._timeOutId;
		this._hideTimeOutId;
		this._selectedIndex = -1;

		var suggestor = this;

		//append the container to the current page
		$j("body").append(this._container);

		/**
		 *Capture the keyboard event and dispatch to corresponding handlers.
		 */
		ele.keydown(
				function(e)
				{
					switch(e.keyCode)
					{
						case 38: //up, select the previous item
						{
							if (suggestor._active)
							{
								suggestor.moveToPrev();
							}
							else
							{
								suggestor.show();
							}
							break;
						}
						case 40: //down, select the next item
						{
							if (suggestor._active)
							{
								suggestor.moveToNext();
							}
							else
							{
								suggestor.show();
							}
							break;
						}
						case 9: //tab, hide the box
						{
							suggestor.hide();
							break;
						}
						case 13: //return, select the highlighted item
						{
							if (suggestor._active && suggestor._selectedIndex != -1)
							{
								e.preventDefault();
								suggestor.selectItem();
								return false;
							}
							break;
						}
						case 27: // escape, hide the box
						{
							if (suggestor._active)
							{
								suggestor.hide();
							}
							break;
						}
						default:
						{
							//other keys, handle the dim search
							suggestor.handleRequest();
						}
					}
				});

		//hide box when lost focus
		ele.blur(
				function(e)
				{
					var hideFunction = function() { suggestor.hide();};
					suggestor._hideTimeOutId = setTimeout(hideFunction, 200);
				}
		);
	};


	/**
	 * Move the focus to and highlight the next result Item when user type
	 * arrow up key.
	 */
	$j.EndecaSearchSuggestor.prototype.moveToPrev = function()
	{
		if(this._selectedIndex == -1)
		{
			this._selectedIndex = 0;
		}
		else
		{
			if(this._selectedIndex == 0)
			{
				//reach the first one
				return;
			}
			this._selectedIndex--;
		}
		$j(".dimResult", this._container).removeClass("selected");
		$j($j(".dimResult", this._container).get(this._selectedIndex)).addClass("selected");
	};

	/**
	 * Move the focus to and highlight the previous result Item when user type
	 * arrow down key.
	 */
	$j.EndecaSearchSuggestor.prototype.moveToNext = function()
	{
		if(this._selectedIndex == -1)
		{
			this._selectedIndex = 0;
		}
		else
		{
			if(this._selectedIndex == $j(".dimResult", this._container).size() - 1)
			{
				//rearch the last one
				return;
			}
			this._selectedIndex++;

		}

		$j(".dimResult", this._container).removeClass("selected");
		$j($j(".dimResult", this._container).get(this._selectedIndex)).addClass("selected");
	};

	/**
	 * Select the highlighted item when user click or type enter key
	 */
	$j.EndecaSearchSuggestor.prototype.selectItem = function()
	{
		if(this._selectedIndex == -1)
		{
			return;
		}

		var url = $j("a", $j(".dimResult", this._container).get(this._selectedIndex)).attr("href");
		document.location.href = url;
	};

	/**
	 * Hide the search suggestion box
	 */
	$j.EndecaSearchSuggestor.prototype.hide = function()
	{
		this._container.hide();
		this._active = false;
	};

	/**
	 * Show the search suggestion box
	 */
	$j.EndecaSearchSuggestor.prototype.show = function()
	{
		if(this._container.is(":hidden"))
		{
			this.setPosition();
			this._container.show();
			this._active = true;
			this._selectedIndex = -1;
		}
	};

	/**
	 * Activate the search suggestion box.
	 */
	$j.EndecaSearchSuggestor.prototype.handleRequest = function()
	{
		var suggestor = this;

		var callback = function()
		{
			var text = $j.trim(suggestor._element.val());
			if(text != suggestor._lastValue)
			{
				if(text.length >= suggestor._options.minAutoSuggestInputLength)
				{
					suggestor.requestData();
				}
				else
				{
					suggestor.hide();
				}
			}
			suggestor._lastValue = text;
		};

		if(this._timeOutId)
		{
			clearTimeout(this._timeOutId);
		}
		this._timeOutId = setTimeout(callback, this._options.delay);
	};

	/**
	 * Send Ajax to backend service to request data
	 */
	$j.EndecaSearchSuggestor.prototype.requestData = function()
	{
		var suggestor = this;
		var response = $j.ajax(
				{
					url:suggestor.composeUrl(),
					dataType:'json',
					async:true,
					success:function(data){
						suggestor.showSearchResult(data);
					}
				}
		);
	};

	/**
	 * Search suggestion is search term sensitive. So it will take the search
	 * term applied on current page and add it into the Ajax request url.
	 */
	$j.EndecaSearchSuggestor.prototype.composeUrl = function()
	{
		var url = this._options.autoSuggestServiceUrl;

		var searchTerm = $j.trim(this._element.val());


		if (url.indexOf('?') == -1)
		{
			url += '?';
		}
		else
		{
			url += '&';
		}
		url += "format=json&assemblerContentCollection=" + this._options.collection + "&";

		url += 'Dy=1&Ntt=' + searchTerm + '*';

		return url;
	};

	/**
	 * Show the search results in the suggestion box
	 */
	$j.EndecaSearchSuggestor.prototype.showSearchResult = function(data)
	{
		var htmlResult = this.processSearchResult(data);
		if(htmlResult != null)
		{
			this._container.html(htmlResult);
			this.bindEventHandler();
			this.show();
		}
		else
		{
			//hide the result box if there is no result
			this.hide();
		}
	};

	/**
	 * Generate rendering HTML according to data
	 */
	$j.EndecaSearchSuggestor.prototype.processSearchResult = function(data)
	{
		var autoSuggestResult = data.contents[0].autoSuggest[0];
		if (autoSuggestResult != null)
		{
			autoSuggestResult.displayImage = true;
			return this.generateHtmlContent(autoSuggestResult);
		}
		return null;
	};

	$j.EndecaSearchSuggestor.prototype.generateHtmlContent = function(autoSuggestResult)
	{
		var newContent = null;

		//Contains dimension search results
		if(autoSuggestResult != null && autoSuggestResult.autoSuggestGroups.length > 0)
		{
			newContent = $j('<div></div>');

			//add title if it is not empty
			if(autoSuggestResult.title && $j.trim(autoSuggestResult.title) != "")
			{
				//newContent.append('<div class="title">' + autoSuggestResult.title + '</div>');
			}

			var autoSuggestGroupList = autoSuggestResult.autoSuggestGroups;

			for(var i = 0; i < autoSuggestGroupList.length; i++)
			{
				var autoSuggestGroup = autoSuggestGroupList[i];

				//output dimension name here

				var displayName = autoSuggestGroup.displayName;
//				var titleSplit = displayName.split(/[\s.]+/);
//				var displayTitle = titleSplit[titleSplit.length-1];
//
//				//console.log("displayName: " + displayTitle);
//
//
//				newContent.append('<div class="title">' + displayTitle + '</div>');

				//output dim result of this group here
				for(var j = 0; j < autoSuggestGroup.autoSuggestions.length; j++)
				{
					var autoSuggestion = autoSuggestGroup.autoSuggestions[j];
					var action = autoSuggestion.navigationState;
					var text = autoSuggestion.label;
					var ancestors = autoSuggestion.ancestors;
					var count = autoSuggestion.count == null ? '' : '&nbsp;('+autoSuggestion.count+')';
				   //TODO Endeca - Fix this some otherway, many not work sometimes
					if (action != null) {
						action = action.replace("Dy=1&", "");
						action = action.replace("&format=json", "");
						action = action.replace(new RegExp("&assemblerContentCollection=.*&"), "&");
					}
					var ancestorsStr = "";
					if(ancestors != null && ancestors.length > 0)
					{
						for(var n = 0; n < ancestors.length; n++)
						{
							ancestorsStr += ancestors[n].label + " > ";
						}
					}

					if(autoSuggestResult.displayImage)
					{
						var imageUrl = "";

//						if($j.trim(autoSuggestion.properties.img_url_thumbnail) != '')
//						{
//							imageUrl = autoSuggestion.properties.img_url_thumbnail;
//						}
//						else
//						{
//							imageUrl = this._options.defaultImage;
//						}

						//only show image when image is enabled and url is not null
						newContent.append('<div class="dimResult"><a href="'+this._options.searchUrl+action+'">'+ancestorsStr+this.highlightMatched(text)+'</a>'+count+'</div>');
					}
					else
					{
						newContent.append('<div class="dimResult"><a href="' + this._options.searchUrl + action + '">'+ancestorsStr+this.highlightMatched(text) + '</a>' +count+'</div>');
					}
				}
			}
		}

		//has result, return the generated html
		if(newContent != null)
		{
			return newContent[0];
		}

		return null;
	};

	/**
	 * Highlight the matched text in result item.
	 */
	$j.EndecaSearchSuggestor.prototype.highlightMatched = function(text)
	{
		var inputText = $j.trim(this._element.val()).toLowerCase();
		var inputTerms = inputText.split(" ");
		var resultTerms = text.split(" ");
		for (var k = 0; k < resultTerms.length; k++) {
			var resultTerm = resultTerms[k].toLowerCase();
			var highlightedTerm = resultTerms[k];
			for (var i=0; i < inputTerms.length; i++) {
				var inputTerm = inputTerms[i];
				if(resultTerm.indexOf(inputTerm) != -1) {

					var index = resultTerm.indexOf(inputTerm);
					var prefix = highlightedTerm.substring(0, index);
					var suffix = highlightedTerm.substring(index + inputTerm.length);
					inputTerm = highlightedTerm.substr(index, inputTerm.length);
					highlightedTerm = prefix + '<span>' + inputTerm + '</span>' + suffix;
					resultTerms[k] = highlightedTerm;
					break;
				}
			}
		}
		return resultTerms.join(" ");
	};

	/**
	 * Bind event handlers for the links and divs in the box
	 */
	$j.EndecaSearchSuggestor.prototype.bindEventHandler = function()
	{
		var suggestor = this;

		//change CSS class when mouseover on result item
		$j(".dimResult", this._container).mouseover(
				function(e)
				{
					$j(".dimResult", suggestor._container).removeClass("selected");
					$j(this).addClass("selected");
					suggestor._selectedIndex = $j(".dimResult", suggestor._container).index($j(this));
				}
		);

		//select the result item when user lick on it
		$j(".dimResult", this._container).click(
				function(e)
				{
					suggestor.selectItem();
				}
		);

		//select the result item when user lick on it
		$j("a", $j(".dimResult", this._container)).click(
				function(e)
				{
					e.preventDefault();
					suggestor.selectItem();
				}
		);

		//Dim roots are not link, when click, move the focus back to input box
		$j(".dimRoots", this._container).click(
				function()
				{
					clearTimeout(suggestor._hideTimeOutId);
					suggestor._element.focus();
				}
		);
	};

	/**
	 * Set the search suggestion box position
	 */
	$j.EndecaSearchSuggestor.prototype.setPosition = function()
	{
		var offset = this._element.offset();
		this._container.css({
			top: offset.top + this._element.outerHeight(),
			left: offset.left,
			width: this._element.width()
		});
	};

	/**
	 * Main function to enable the search suggestion to the selected element.
	 */
	$j.fn.endecaSearchSuggest = function(options)
	{
		var opts = $j.extend({}, $j.fn.endecaSearchSuggest.defaults, options);

		this.each(
				function()
				{
					var element = $j(this);
					new $j.EndecaSearchSuggestor(element, opts);
				}
		);
	};

	/**
	 * Default settings for the search suggestion.
	 */
	$j.fn.endecaSearchSuggest.defaults = {
			minAutoSuggestInputLength: 3,
			displayImage: false,
			delay: 250,
			autoSuggestServiceUrl: '',
			collection: '',
			searchUrl: '',
			containerClass: 'dimSearchSuggContainer',
			defaultImage:'no_image.gif'
	};
}
)(jQuery);