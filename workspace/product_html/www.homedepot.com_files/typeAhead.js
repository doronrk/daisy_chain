/*global THD,jQuery,Mustache */
/*
	jQuery Plugin to handle inputChange
*/
(function($) {
	$.fn.extend({
		inputChange: function(callback, options) {
			var defaults = {
				event: 'keyup',
				minimum: 2
			},
				currentOptions = $.extend(defaults, (options || {}));

			return this.each(function() {
				var o = currentOptions,
					$this = $(this),
					text = $this.val();

				$this.on(o.event, function(event) {
					var newText = $this.val();

					if (((newText.length >= o.minimum) || text.length >= o.minimum) && (newText !== text)) {
						callback.call($this, event, newText, text);
					}

					text = newText;
				});


			});
		}
	});
})(jQuery);

/*
	Module: THD.Global.TypeAhead
*/
(function(module, $) {
	// easy to change text
	var urlRegex = /hd-(.+)\.homedepotdev\.com/,
		result = window.location.hostname,
		testEnvs = 'localhost,www6-qa.homedepotdev.com',
		leftRailCharacterLimit = 25,
		detailTitleCharacterLimit = 25,
		leftRailCategoryCharacterLimit = 40,
		ajaxCaching = true,
		ajaxCallbackReference = {},
		config = {
			jsonpReferenceField: 'searchTerm',
			CallbackName: {
				Terms: 'termCallback',
				Details: 'detailCallback'
			},
			text : {
				noResults : 'Press Enter to View Available Products'
			},
			regex: {
				hasHostname : /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			}
		},
		typeAheadUrl,
		typeAheadAjax,
		originalKeyDownHandler = null,
		channel,
		baseIndex,
		template = {
			typeAhead: [
				'<div id="typeAheadFlyOut" class="typeahead">',
					'<div class="main">',
						'<ul class="terms"></ul>',
					'</div>',
					'<div class="detail"></div>',
				'</div>'
				].join(''),
			details: [
				'<div class="products">',
					'<h2>Top Results for "<span>{{term}}</span>"</h2>',
					'<ul></ul>',
				'</div>',
				'<div class="links">',
					'<ul>',
						'<li class="typeaheadOne"><ul></ul></li>',
						'<li class="typeaheadTwo"><ul></ul></li>',
					'</ul>',
				'</div>'
				].join(''),
			term: [
				'<li>',
					'<a tabindex="{{tabindex}}" data-details="{{detailUrl}}" data-category="suggested term" data-value="{{value}}" title="{{termLong}}" href="{{url}}">',
						'{{{term}}} {{#desc}}<span>{{desc}}</span>{{/desc}}',
					'</a>',
				'</li>'].join(''),
			category: [
				'<li>',
					'<a tabindex="{{tabindex}}" data-details="{{detailUrl}}" class="categories" data-category="suggested term" data-value="in_{{value}}" title="in {{termLong}}" href="{{url}}">',
						'{{{term}}} {{#desc}}<span>{{desc}}</span>{{/desc}}',
					'</a>',
				'</li>'].join(''),
			section: [
				'<li>',
					'{{#title}}<h3><i class="{{icon}}"></i>{{title}}</h3>{{/title}}',
					'<ul class="orangeList">',
						'{{#links}}',
							'<li>',
								'<a tabindex="{{tabindex}}" data-category="{{category}}" data-value="{{titleLong}}" title="{{titleLong}}" href="{{url}}">',
									'<span>{{{title}}}</span>',
								'</a>',
							'</li>',
						'{{/links}}',
					'</ul>',
				'</li>'
				].join(''),
			products: [
				'{{#links}}',
					'<li>',
						'<a tabindex="{{tabindex}}" title="{{{titleLong}}}" data-category="{{category}}" data-value="{{value}}" href="{{url}}">',
							'{{#image}}<img src="{{image}}" alt="{{{titleLong}}}" />{{/image}}',
							'{{#title}}<span>{{{title}}}</span>{{/title}}',
						'</a>',
					'</li>',
				'{{/links}}'
				].join('')
		},
		controls = {},
		prioritySearchTerm = '';

	function setPrioritySearchTerm(term) {
		prioritySearchTerm = term;

		THD.log(term);

		return prioritySearchTerm;
	}

	function setAjaxCallbackReference(callbackName, reference) {
		ajaxCallbackReference[callbackName] = reference;

		return reference;
	}

	function getAjaxCallbackReference(callbackName) {
		return ajaxCallbackReference[callbackName];
	}

	// Create the type-ahead container

	function createTypeAhead() {
		if (!controls.typeAhead) {
			// Create type-ahead
			var box = $(template.typeAhead).hide();

			baseIndex = controls.searchInput.attr('tabindex');

			// get useful elements to prevent requery
			controls.main = box.find('.main');
			controls.terms = controls.main.find('.terms');
			controls.details = box.find('.detail');

			// Attach the type-ahead, but don't show yet
			box.prependTo('#divSearchbox');

			// Remove event so no duplication
			$(this).off('focus', createTypeAhead);

			// Attach to main control block
			controls.typeAhead = box;
		}
	}

	// create typeahead link urls

	function findDomainUrl() {
		// test for local
		if (testEnvs.indexOf(result) != -1) {
			// testing, choose your server
			result = 'hd-st73.homedepotdev.com';
		}
		// lower env test
		else if (!urlRegex.test(result)) {
			result = 'www.homedepot.com';
		}
		return 'http://' + result;
	}

	/*** prepare the ajax urls for left rail ***/

	// create Ajax domain

	function findDomainAjax() {
		// test for local
		if (testEnvs.indexOf(result) != -1) {
			//result = 'ecomapps-st73.homedepot.com';
			result = 'hd-st73.homedepotdev.com';
		}
		// lower env test
		else if (!urlRegex.test(result)) {
			result = 'www.thdws.com';
		}
		return 'http://' + result;
	}

	// returns if mobile or non-mobile browser

	function getChannel() {
		var channel = 'Online';

		// Must lock channel to Online, or it breaks.
		/*if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(Windows Phone)|(webOS)/i)) {
				channel = 'Mobile';
			}*/

		return channel;
	}

	// get the department drop down selection

	function getDepartment() {
		var department = $.trim(controls.department.val());
		// patch: add 'id' to the Department list for 'search all'
		// $('#dept-list li:first-child a').attr('id', '');
		if (typeof department === 'undefined' || department === '') {
			department = '0000';
		}
		return department;
	}

	// add variables to ajax url, arbitrary#, dept, ect.

	function getTypeAheadAjax(searchTerm) {
		var searchUrl = typeAheadAjax;

		searchUrl += '/SiteSearch/rs/suggest/' + channel + '/';

		// arbitrary Number
		// searchUrl += Math.floor((Math.random()*10000)+1) + '/';
		searchUrl += '1234' + '/';

		// Department Selected
		searchUrl += getDepartment() + '/';

		// Append .js extension as search+term.js
		searchUrl += searchTerm.replace(/\s+/g, '+') + '.js';

		return searchUrl;
	}

	// get ajax e-value

	function getEValue() {
		var e = $.trim(controls.eValue.val());
		if (e === '') {
			e = null;
		}
		return e;
	}

	function getSelectedTermText(termAnchor) {
		var result = $.trim(termAnchor.text());

		// Look for truncated results
		if (result.indexOf('...') > -1) {
			// use un-truncated content
			result = termAnchor.attr('title');
		}

		return result;
	}

	function setupKeyboardNavigation() {
		// Save and kill original handler
		originalKeyDownHandler = controls.searchInput.get(0).keydown;
		controls.searchInput.get(0).keydown = null;

		// Have to do down to prevent tab navigation
		controls.searchInput.on('keyup', keyboardNavigation);

		// Prevent up/down from changing cursor location
		controls.searchInput.on('keydown keypress', preventUpDown);
	}

	function cleanUpKeyboardNavigation() {
		controls.searchInput.off('keyup', keyboardNavigation);
		controls.searchInput.off('keydown keypress', preventUpDown);

		// restore original handler
		if (originalKeyDownHandler) {
			controls.searchInput.get(0).keydown = originalKeyDownHandler;
			originalKeyDownHandler = null;
		}
	}

	// arrows and tab key functionality

	function keyboardNavigation(event) {
		THD.log('Key', event.which, 'shift down', event.shiftKey, '', event.type);

		// Enter
		if (event.which === 13) {
			

			if (originalKeyDownHandler) {
				// Write in the currently selected search term
				controls.searchInput.val(prioritySearchTerm);
				originalKeyDownHandler(event);
			} else {
				/*
				event.preventDefault();
				$('#searchButton').click();
				return false;
				*/
				var target = controls.terms.find('.active')[0];
				//console.log(target);
				if (typeof target != 'undefined'){
					if($(target).hasClass('categories')){
						target.click();						
					}
					else{
						controls.searchInput.val(prioritySearchTerm);
						event.preventDefault();
						$('#searchButton').click();
						return false;
					}
				}
				else{
					$('#searchButton').click();
					return false;
				}
			}

		// Up, or shift + tab
		} else if ((event.which === 38) || (event.which === 9 && event.shiftKey)) {
			event.preventDefault();
			navigateUp();
			return false;

		// Down, or tab
		} else if ((event.which === 40) || (event.which === 9 && !event.shiftKey)) {
			event.preventDefault();
			navigateDown();
			return false;
		}
	}

	// Bound to keydown & keypress, used to prevent cursor movement.

	function preventUpDown(event) {
		// Ignore tab, up, and down
		var ignoreCharacters = [9, 38, 40, 13];

		// See if its one of hte ignored characters
		if ($.inArray(event.which, ignoreCharacters) > -1) {
			THD.log('Preventing', event.which, event.type);

			event.preventDefault();

			// Failing to return false lets the browser submit the form without the changes
			return false;
		}
	}

	function hideTypeAhead() {
		controls.typeAhead.removeClass('loading').hide();

		// remove bindings, play time is over
		$('body').off('click', hideTypeAhead);

		// Remove arrows and tab key functionality
		cleanUpKeyboardNavigation();
	}

	function showTypeAhead() {
		// Remove arrows and tab key functionality (in case it is still there)
		cleanUpKeyboardNavigation();

		// Add arrows and tab key functionality
		setupKeyboardNavigation();

		// bind handler to remove type-ahead
		$('body')
			.off('click', hideTypeAhead)
			.on('click', hideTypeAhead);

		controls.typeAhead.show();
	}

	/*
			Detail Callback Handler
		*/

	function searchTermDetailChangedCallback(data) {
		if (
		// Has data
		data /*&&
		// Compare this data to the current callback reference
		(getAjaxCallbackReference(config.CallbackName.Details) == data[config.jsonpReferenceField])*/) {
			//console.log('IN', 'detail', localCounter, current);
			controls.details.removeClass('loading');
			loadDetails(data);
		}
	}

	// Globally expose handler
	window[config.CallbackName.Details] = searchTermDetailChangedCallback;

	function getTypeAheadAjaxUrl (path) {
		return typeAheadAjax + path;
	}

	/*
		Adds required parameters to Ajax request URL
	*/

	function addTypeAheadDetailsParams (url) {
		/* DR is needed for some reason, storeID needed for localized products */
		var params = {
				dr : 1 /*,
				storeId : getTHDStoreNo()*/
			},
			result = THD.Utils.Url.set({
				url : url,
				setParms : params,
				addHost: true
			});

		return result;
	}

	/*
		Detail JSONP Creation
	*/

	function selectSearchTerm(termAnchor) {
		// termAnchor.focus();
		// Remove Currently Active
		controls.terms.find('.active').removeClass('active');
		// Set this active
		termAnchor.addClass('active');

		controls.details.show().addClass('loading');

		// Get ajax URL
		var detailsPath = termAnchor.attr('data-details'),
			typeAheadDetailsUrl = getTypeAheadAjaxUrl(detailsPath),
			ajaxUrl = addTypeAheadDetailsParams(typeAheadDetailsUrl),
			// Save the current search term for submission
			current = getSelectedTermText(termAnchor),
			// Set callback name
			callbackName = config.CallbackName.Details;

		// Set the priority search term;
		setPrioritySearchTerm(current);

		setAjaxCallbackReference(callbackName, current);

		// Make a script call to avoid JSONP error with static callback names
		$.ajax(ajaxUrl, {
			dataType: 'script',
			cache: ajaxCaching,
			data: {
				// searchTermDetailChangedCallback
				callback: callbackName
			}
		});
	}

	/*
		Search Term Callback Handler
	*/

	function isCallbackForCurrentTerm (data) {
		var result = (data && data.Results && (data.Results.length >= 1)),
			activeTerm = getAjaxCallbackReference(config.CallbackName.Terms);

		result = (result && (data[config.jsonpReferenceField] === activeTerm));

		return result;
	}

	function searchTermChangedCallback(data) {
		var fixedData;

		// check for data before showing, or hide
		if (isCallbackForCurrentTerm(data)) {
			fixedData = fixTermData(data.Results, data[config.jsonpReferenceField]);

			// Update the UI
			loadTerms(fixedData);

			// Attach hover intent
			controls.terms.find('a').hoverIntent({
				// number = sensitivity threshold (must be 1 or higher)
				sensitivity: 70,
				// number = milliseconds of polling interval
				interval: 150,
				// function = onMouseOver callback (required)
				over: function(event) {
					selectSearchTerm($(event.target));
				},
				// number = milliseconds delay before onMouseOut function call
				timeout: 150,
				// function = onMouseOut callback (required)
				out: $.noop
			});

			// Select the first term
			selectSearchTerm(controls.terms.find('li:first-child a'));

			// Open the typeahead
			showTypeAhead();
		}else {
			createTypeAhead();
			loadTermsForNoData();
			loadDetailsForNoData();
            showTypeAhead();
		}
	}

	// Globally expose handler
	window[config.CallbackName.Terms] = searchTermChangedCallback;

	/*
		Search Term JSONP Creation
	*/
	function onSearchTermChanged(event, text) {
		var newText = $.trim(text.toLowerCase()),
			textLength = newText.length,
			// Set callback name
			callbackName = config.CallbackName.Terms,
			ajaxUrl;

		// Save the current search term for submission
		setPrioritySearchTerm(newText);

		if (textLength < 2) {
			controls.typeAhead.removeClass('loading');
			hideTypeAhead();
		} else {
			// Create it if it isn't already
			createTypeAhead();

			// Get the ajaxURL
			ajaxUrl = getTypeAheadAjax(newText);

			// Save the ajax callback reference for this callback
			setAjaxCallbackReference(callbackName, newText);

			// Make a script call to avoid JSONP error with static callback names
			$.ajax(ajaxUrl, {
				dataType: 'script',
				cache: ajaxCaching,
				data: {
					e: getEValue(),
					callback: callbackName
				}
			});
		}
	}


	function navigateUp() {
		var target = controls.terms.find('.active').parent().prev().children('a');
		// Prevents scrolling psat the top of the list
		if (target.length) {
			selectSearchTerm(target);
		}
	}

	function navigateDown() {
		var target = controls.terms.find('.active').parent().next().children('a');
		// Prevents scrolling past the end of the list.
		if (target.length) {
			selectSearchTerm(target);
		}
	}

	// add left rail terms variables to the template, from ajax

	function loadTerms(results) {
		controls.terms.detach().empty();

		$.each(results, function (index, result) {
			result.url = typeAheadUrl + result.url;

			$(Mustache.to_html(template.term, result)).appendTo(controls.terms);
			
			//TODO: Verify this
			if("categories" in result){
				var fixedCategories = fixCategorySearchData(result.categories);
				$.each(fixedCategories, function (index, categoryData) {					
					$(Mustache.to_html(template.category, categoryData)).appendTo(controls.terms);
				});
				
			}
		});

		controls.terms.appendTo(controls.main);
	}

	function loadTermsForNoData(){
		var result = {
	        	term : $.trim(prioritySearchTerm)
	    };
		result.termLong = result.term;
		result.value = result.term;
		result.term = formatSearchTerm(result.term, result.term);
		result.title = (result.term.indexOf('...') > -1) ? result.value : '';
		// Create tab index
		result.tabindex = (parseInt(baseIndex, 10) + 1);

        result.url = typeAheadUrl + "/s/" + $.trim(prioritySearchTerm) + "?NCNI-5";
        controls.terms.detach().empty();
        $(Mustache.to_html(template.term, result)).appendTo(controls.terms);
        controls.terms.appendTo(controls.main);
	}

	function formatSearchTerm(searchTerm, string) {
		// QC-28321: with all capitalizations
		// String formatting necessary for matching "gas  grills" (two spaces)
		var newString = $.trim(string.replace(/\s+/g, ' ')),
			newSearchTerm = $.trim(searchTerm.replace(/\s+/g, ' ')),
			position = newString.toLowerCase().indexOf(newSearchTerm.toLowerCase()),
			result = newString,
			truncated = false,
			replacement;

		//  Truncate String
		if (result.length > leftRailCharacterLimit) {
			// &hellip; causes problems with Mustache templating. Be warned.
			result = result.substr(0, leftRailCharacterLimit) + '...';
			truncated = true;
		}

		// Check that the term is actually within the string
		if (position > -1 && position < result.length) {
			// find replace target
			replacement = result.substring(position, (truncated ? Math.min((result.length), (position + newSearchTerm.length)) : (position + newSearchTerm.length)));

			result = result.replace(replacement, ['<b>', replacement, '</b>'].join(''));
		}

		return result;
	}
	
	function formatCategorySearchTerm(string) {
		// QC-28321: with all capitalizations
		// String formatting necessary for matching "gas  grills" (two spaces)
		var newString = 'in ' + $.trim(string.replace(/\s+/g, ' ')),
			result = newString,
			truncated = false;

		//  Truncate String
		if (result.length > leftRailCategoryCharacterLimit) {
			// &hellip; causes problems with Mustache templating. Be warned.
			result = result.substr(0, leftRailCategoryCharacterLimit) + '...';
			truncated = true;
		}

		return result;
	}

	// adjust terms when entered into the search field

	function fixTermData(results, searchTerm) {
		$.each(results, function (index, result) {
			// save the full term before truncating for title/alt tags
			result.termLong = result.term;

			result.value = result.term;

			result.term = formatSearchTerm(searchTerm, result.term);

			result.title = (result.term.indexOf('...') > -1) ? result.value : '';

			// Create tab index
			result.tabindex = (parseInt(baseIndex, 10) + index + 1);
		});

		return results;
	}
	
	
	function fixCategorySearchData(results) {
		$.each(results, function (index, result) {
			// save the full term before truncating for title/alt tags
			result.termLong = result.term;

			result.value = result.term;

			result.term = formatCategorySearchTerm(result.term);

			result.title = (result.term.indexOf('...') > -1) ? result.value : '';

			// Create tab index
			result.tabindex = (parseInt(baseIndex, 10) + index + 1);
		});

		return results;
	}


	/*** right rail ajax call ***/

	// add right rail products and guides data to the template, from ajax

	function loadDetails(data) {
		//console.log(data);
		var activeSelection = controls.terms.find('.active'),
			sectionData = data.sections,
			$newTerm;

		controls.details.detach();

		// update to the new hovered term
		if(data.categoryName && data.searchTerm){
			$newTerm = data.searchTerm + " " +  activeSelection.text();
			if ($newTerm.length > detailTitleCharacterLimit) {
				// &hellip; causes problems with Mustache templating. Be warned.
				$newTerm = $newTerm.substr(0, detailTitleCharacterLimit) + '...';
				truncated = true;
			}
		}
		else{
			if (activeSelection) {
				$newTerm = activeSelection.text();
			} else {
				$newTerm = controls.searchInput.val();
			}
		}
		controls.details.html(Mustache.to_html(template.details, {
			term: $.trim($newTerm)
		}));

		addSectionsToContainer(controls.details, sectionData);

		controls.details.find('.links').toggleClass('borderZero', !data.hasContent);

		controls.details.appendTo(controls.typeAhead);
	}

	function loadDetailsForNoData(){
		 controls.details.detach();
         controls.details.html(Mustache.to_html(template.details, {
         term: $.trim(prioritySearchTerm)}));
         controls.details.find('.products h2').html(config.text.noResults);
         controls.details.appendTo(controls.typeAhead);
	}

	function addSectionsToContainer (container, data) {
		var $columnOne = container.find('.typeaheadOne ul'),
			$columnTwo = container.find('.typeaheadTwo ul'),
			$products = container.find('.products ul');

		$.each(data, function(index, sectionData) {
			var section = processData(sectionData),
				insertTarget,
				html;

			// attach term
			if (isProductSection(section)) {
				insertTarget = $products;
			} else {
				insertTarget = ((index % 2) ? $columnTwo : $columnOne);
			}

			// Create the HTML
			html = Mustache.to_html(template[section.template], section);

			// Attach it to the target
			$(html).appendTo(insertTarget);

			// If the section is products, check for no products returned;
			if (isProductSection(section) && !hasLinks(section)) {
				// Fix the title
				container.find('.products h2').html(config.text.noResults);
			}
		});
	}

	function processData (data) {
		// add icons to right rail bottom section
		attachIconData(data);

		// Select a template
		data.template = (isProductSection(data) ? 'products' : 'section');

		// Fix link data
		$.each(data.links, function(index, link) {
			data.links[index] = fixLinkData(link, data.title);
		});

		return data;
	}

	function fixLinkData(link, category) {
		var idMatch = link.url.match(/\d+$/);

		// Add title as category;
		link.category = category;

		// Duplicate title
		link.titleLong = truncateString(link.title, 250);

		link.title = truncateString(link.title, 35);

		if (idMatch) {
			link.value = idMatch[0];
		}

		link.url = appendHostName(link.url);

		link.image = appendHostName(link.image);

		return link;
	}

	function hasLinks (sectionData) {
		var result = (sectionData.links && (sectionData.links !== '') && (sectionData.links.length > 0));
		return result;
	}

	function isProductSection (sectionData) {
		return (sectionData.title === 'products');
	}

	// add icons to right rail bottom section. QC-28847

	function attachIconData (data) {
		if (/Blog/gi.test(data.title)) {
			data.icon = 'icon-blog';

		} else if (/Buying Guide/gi.test(data.title)) {
			data.icon = 'icon-buyingGuide';

		} else if (/Project Guide/gi.test(data.title)) {
			data.icon = 'icon-projectGuide';
		}
	}

	function truncateString(string, length) {
		var result = string;

		if (result.length >= length) {
			result = result.substr(0, length);
			result = result.slice(0, result.lastIndexOf(' '));
			result = result + '&hellip;';
		}

		return result;
	}

	function appendHostName(string) {
		if (!config.regex.hasHostname.test(string)) {
			string = typeAheadUrl + string;
		}

		return string;
	}

	/*
		Initialization Code
		THD.Global.TypeAhead.initialize();
	*/
	module.initialize = function() {
		// TypeAhead is not allowed on https
		if (window.location.protocol === 'http:') {
			// resolve urls
			typeAheadUrl = findDomainUrl();
			typeAheadAjax = findDomainAjax();
			channel = getChannel();

			controls.searchInput = $('#searchFocus');
			controls.department = $('#encodedNVal');
			controls.eValue = $('#eVal');

			// HACK: Remove existing typeAhead element;
			//$('#typeahead').remove();

			// Create type-ahead on focus
			controls.searchInput.on('focus', createTypeAhead);

			// Bind search term entry
			controls.searchInput.inputChange(onSearchTermChanged);
		}
	};

	// Bind to Doc ready
	$(module.initialize);
}(
	// module
	THD.Utility.Namespace.createNamespace('THD.Global.TypeAhead'),
	// $
	jQuery
));