/*
 * Copyright 2001, 2012, Oracle and/or its affiliates. All rights reserved.
 * Oracle and Java are registered trademarks of Oracle and/or its
 * affiliates. Other names may be trademarks of their respective owners.
 * UNIX is a registered trademark of The Open Group.
 *
 * This software and related documentation are provided under a license
 * agreement containing restrictions on use and disclosure and are
 * protected by intellectual property laws. Except as expressly permitted
 * in your license agreement or allowed by law, you may not use, copy,
 * reproduce, translate, broadcast, modify, license, transmit, distribute,
 * exhibit, perform, publish, or display any part, in any form, or by any
 * means. Reverse engineering, disassembly, or decompilation of this
 * software, unless required by law for interoperability, is prohibited.
 * The information contained herein is subject to change without notice
 * and is not warranted to be error-free. If you find any errors, please
 * report them to us in writing.
 * U.S. GOVERNMENT END USERS: Oracle programs, including any operating
 * system, integrated software, any programs installed on the hardware,
 * and/or documentation, delivered to U.S. Government end users are
 * "commercial computer software" pursuant to the applicable Federal
 * Acquisition Regulation and agency-specific supplemental regulations.
 * As such, use, duplication, disclosure, modification, and adaptation
 * of the programs, including any operating system, integrated software,
 * any programs installed on the hardware, and/or documentation, shall be
 * subject to license terms and license restrictions applicable to the
 * programs. No other rights are granted to the U.S. Government.
 * This software or hardware is developed for general use in a variety
 * of information management applications. It is not developed or
 * intended for use in any inherently dangerous applications, including
 * applications that may create a risk of personal injury. If you use
 * this software or hardware in dangerous applications, then you shall
 * be responsible to take all appropriate fail-safe, backup, redundancy,
 * and other measures to ensure its safe use. Oracle Corporation and its
 * affiliates disclaim any liability for any damages caused by use of this
 * software or hardware in dangerous applications.
 * This software or hardware and documentation may provide access to or
 * information on content, products, and services from third parties.
 * Oracle Corporation and its affiliates are not responsible for and
 * expressly disclaim all warranties of any kind with respect to
 * third-party content, products, and services. Oracle Corporation and
 * its affiliates will not be responsible for any loss, costs, or damages
 * incurred due to your access to or use of third-party content, products,
 * or services.
 */
/**
 * Copyright (C) 2011 Endeca Technologies, Inc.
 *
 * The use of the source code in this file is subject to the ENDECA
 * TECHNOLOGIES, INC. SOFTWARE TOOLS LICENSE AGREEMENT. The full text of the
 * license agreement can be found in the ENDECA INFORMATION ACCESS PLATFORM
 * THIRD-PARTY SOFTWARE USAGE AND LICENSES document included with this software
 * distribution.
 */
//Search Suggestion Module, specific for typeahead dimension search, implemented as a jQuery Plugin
(

function ($j) {
	/**
	 *Constructor,
	 *@param $ele the Element to enable Dim Search Suggestion
	 *@param opts the options to be applied
	 */
	$j.EndecaSearchSuggestor = function (ele, opts) {
		this._active = true;
		this._options = opts;
		this._lastValue = '';
		this._element = ele;
		this._container = $j('<div id="headSearchTypeAheadHolder" class="' + this._options.containerClass + '" />');
		this._timeOutId;
		this._hideTimeOutId;
		this._selectedIndex = -1;
		var suggestor = this;
		// append the container to the current page
		$j("#headSearchForm").append(this._container);
		/**
		 *Capture the keyboard event and dispatch to corresponding handlers.
		 */
		ele.keydown(

		function (e) {
			switch (e.keyCode) {
				case 38:
					// up, select the previous item
					{
						if (suggestor._active) {
							suggestor.moveToPrev();
						}
						else {
							suggestor.show();
						}
						break;
					}
				case 40:
					// down, select the next item
					{
						if (suggestor._active) {
							suggestor.moveToNext();
						}
						else {
							suggestor.show();
						}
						break;
					}
				case 9:
					// tab, hide the box
					{
						suggestor.hide();
						break;
					}
				case 13:
					// return, select the highlighted item
					{
						if (suggestor._active && suggestor._selectedIndex != -1) {
							e.preventDefault();
							suggestor.selectItem();
							return false;
						}
						break;
					}
				case 27:
					// escape, hide the box
					{
						if (suggestor._active) {
							suggestor.hide();
						}
						break;
					}
				default:
					{
						// other keys, handle the dim search
						suggestor.handleRequest();
					}
			}
		});
		// hide box when lost focus
		ele.blur(

		function (e) {
//			var hideFunction = function () {
//				suggestor.hide();
//			};
//			suggestor._hideTimeOutId = setTimeout(hideFunction, 200);
		});
	};
	/**
	 * Move the focus to and highlight the next result Item when user type
	 * arrow up key.
	 */
	$j.EndecaSearchSuggestor.prototype.moveToPrev = function () {
		if (this._selectedIndex == -1) {
			this._selectedIndex = 0;
		}
		else {
			if (this._selectedIndex == 0) {
				//reach the first one
				return;
			}
			this._selectedIndex--;
		}
		//Remove highlight style from anchor
		$j(".dimResult", this._container).parent().each(function(ind){
			$j("a", $j(".dimResult", this._container)).removeClass("acselected");
		});
		$j($j(".dimResult", this._container).get(this._selectedIndex)).next().find("a:first").removeClass("acselected");
		//Add highlight style to anchor
		$j($j(".dimResult", this._container).get(this._selectedIndex)).find("a:first").addClass("acselected");
	};
	/**
	 * Move the focus to and highlight the previous result Item when user type
	 * arrow down key.
	 */
	$j.EndecaSearchSuggestor.prototype.moveToNext = function () {
		if (this._selectedIndex == -1) {
			this._selectedIndex = 0;
		}
		else {
			if (this._selectedIndex == $j(".dimResult", this._container).size() - 1) {
				// reach the last one
				return;
			}
			this._selectedIndex++;
		}
		//Remove highlight style from anchor
		//remove existing selection if any
		$j(".dimResult", this._container).parent().each(function(ind){
			$j("a", $j(".dimResult", this._container)).removeClass("acselected");
		});
		$j($j(".dimResult", this._container).get(this._selectedIndex)).prev().find("a:first").removeClass("acselected");
		//Add highlight style to anchor
		$j($j(".dimResult", this._container).get(this._selectedIndex)).find("a:first").addClass("acselected");
	};
	/**
	 * Select the highlighted item when user click or type enter key
	 */
	$j.EndecaSearchSuggestor.prototype.selectItem = function () {
		if (this._selectedIndex == -1) {
			return;
		}
		var url = $j("a", $j(".dimResult", this._container).get(this._selectedIndex)).attr("href");
		document.location.href = url;
	};
	/**
	 * Hide the search suggestion box
	 */
	$j.EndecaSearchSuggestor.prototype.hide = function () {
		this._container.hide();
		this._active = false;
	};
	/**
	 * Show the search suggestion box
	 */
	$j.EndecaSearchSuggestor.prototype.show = function () {
		if (this._container.is(":hidden")) {
			this.setPosition();
			this._container.show();
			this._active = true;
			this._selectedIndex = -1;
		}
	};
	/**
	 * Activate the search suggestion box.
	 */
	$j.EndecaSearchSuggestor.prototype.handleRequest = function () {

		var suggestor = this;
		this._selectedIndex = -1;
		var callback = function () {
			var text = $j.trim(suggestor._element.val());

			if (text != suggestor._lastValue) {
				if (text.length >= 3) {
					suggestor.requestData();
				}
				else {
					suggestor.hide();
				}
			}

			suggestor._lastValue = text;
		};

		if (this._timeOutId) {
			clearTimeout(this._timeOutId);
		}

		this._timeOutId = setTimeout(callback, this._options.delay);
	};
	/**
	 * Send Ajax to backend service to request data
	 */
	$j.EndecaSearchSuggestor.prototype.requestData = function () {
		var suggestor = this;
		var response = $j.ajax({
			url: suggestor.composeUrl(),
			dataType: 'json',
			data: $j("#searchScopeValue").serialize(),
			async: true,
			success: function (data) {
				suggestor.showSearchResult(data);
			}
		});
	};
	/**
	 * Search suggestion is search term sensitive. So it will take the search
	 * term applied on current page and add it into the Ajax request url.
	 */
	$j.EndecaSearchSuggestor.prototype.composeUrl = function () {
		var url = this._options.autoSuggestServiceUrl;
		var searchTerm = $j.trim(this._element.val());
		if (url.indexOf('?') == -1) {
			url += '?';
		}
		else {
			url += '&';
		}

		url += 'Dy=1&collection=' + this._options.collection + '&Ntt=' + searchTerm + '*'+'&Nr=AND(P_Is_Active:1,P_Is_Display:1,NOT(P_Is_EobOnly:1),NOT(Clearance))&reqType=typeAhead';


		return url;
	};
	/**
	 * Show the search results in the suggestion box
	 */
	$j.EndecaSearchSuggestor.prototype.showSearchResult = function (data) {
		var htmlResult = this.processSearchResult(data);
		if (htmlResult != null) {
			this._container.html(htmlResult);
			this.bindEventHandler();
			if($.trim($('ul.ut-flyout').html()) == '') {
				this.hide();
			} else {
				this.show();
			}
		}
		else {
			//hide the result box if there is no result
			this.hide();
		}
	};
	/**
	 * Generate rendering HTML according to data
	 */
	$j.EndecaSearchSuggestor.prototype.processSearchResult = function (data) {
		var dimSearchResult = null;
		var resultListCartridge = null;
		var htmlContent = null;
		var productData = data.products;
		var contentData = data.contents[0];

		htmlContent = this.generateHtmlContent(contentData,productData);
		return htmlContent;
	};

	function replaceAll(string, token, newtoken) {
		if(token!=newtoken)
		while(string.indexOf(token) > -1) {
			string = string.replace(token, newtoken);
		}
		return string;
	}
	$j.EndecaSearchSuggestor.prototype.generateHtmlContent = function (contentData,productData) {
		var autoSuggestCartridges = null;
		var resultListCartridge = null;
		var newContent = null;
		if(contentData != null){

			newContent = $j('<ul class="ut-flyout result-item-list" />');
			var searchTerm = $j.trim(this._element.val());
			newContent.append($j(this.highlightMatched(searchTerm)));
			autoSuggestCartridges = contentData.autoSuggest;
			if(autoSuggestCartridges != null && autoSuggestCartridges.length >0){
				for (var j = 0; j < autoSuggestCartridges.length; j++) {
					var cartridge = autoSuggestCartridges[j];
					if (cartridge !=null && cartridge['@type'] == "DimensionSearchAutoSuggestItem") {
						var dimSearchGroups = cartridge.dimensionSearchGroups;
						if(dimSearchGroups != null && dimSearchGroups.length >0){
							for (var i = 0; i < dimSearchGroups.length; i++) {
								var dimResultGroup = dimSearchGroups[i];
								if(dimResultGroup != null && dimResultGroup.dimensionSearchValues!=null && dimResultGroup.dimensionSearchValues.length>0 && dimResultGroup.dimensionName == 'product.category'){
									var uniqueCategoryNames = '';
									var validCategories = 0;
									for (var j = 0; j <	dimResultGroup.dimensionSearchValues.length; j++) {

										var dimResult = dimResultGroup.dimensionSearchValues[j];

										if(dimResult.ancestors != null && dimResult.ancestors.length >0)
										{
											var ancestors = true;
											var primaryCategory = dimResult.ancestors[0].label;
											var tab = dimResult.ancestors[0].label;
										}
										else{
											var primaryCategory = dimResult.label;
											var tab = dimResult.label;
										}

										var currentCategory = dimResult.label;
										var uniqueCategoryName = "";
										var action = dimResult.contentPath + dimResult.navigationState;
										action = replaceAll(action, '+', '-');
										action = action.substring(0, action.indexOf("?"));
										//alert(primaryCategory);
										//alert(dimResult.label);
										//alert(dimResult.ancestors.length);

											if(primaryCategory.toLowerCase().indexOf('men')>=0   || primaryCategory.toLowerCase().indexOf('women')>=0 ){
													if(dimResult.ancestors != null && dimResult.ancestors.length >0){
														uniqueCategoryName =primaryCategory+currentCategory;
														if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
															validCategories = validCategories+1;
															uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
															newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + primaryCategory+"'s"+" "+currentCategory + '</a></li>');
														}
													}
													else{
														uniqueCategoryName =primaryCategory;
														if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
															validCategories = validCategories+1;
															uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
															newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + primaryCategory+"'s" +'</a></li>');
														}
													}
											}
											else if(primaryCategory.toLowerCase().indexOf('first ascent')>=0  || primaryCategory.toLowerCase().indexOf('sport shop')>=0   ||primaryCategory.toLowerCase().indexOf('travex')>=0  ){
												if(dimResult.ancestors != null && dimResult.ancestors.length  == 0){
													uniqueCategoryName =primaryCategory;
													if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
														validCategories = validCategories+1;
														uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
														newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + primaryCategory+'</a></li>');
													}
												}
												if(dimResult.ancestors != null && dimResult.ancestors.length  == 1){
													uniqueCategoryName = currentCategory;
													if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
														validCategories = validCategories+1;
														uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
														newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + currentCategory+'</a></li>');
													}
												}
												if(dimResult.ancestors != null && dimResult.ancestors.length  >1){
													if(dimResult.ancestors[1].label.toLowerCase().indexOf('men')>=0   || dimResult.ancestors[1].label.toLowerCase().indexOf('women')>=0 ) {
														uniqueCategoryName = dimResult.ancestors[1].label+currentCategory;
														if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
															validCategories = validCategories+1;
															uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
															newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + dimResult.ancestors[1].label+"'s"+" "+currentCategory+'</a></li>');
														}
													}
													else if(dimResult.ancestors[1].label.toLowerCase().indexOf('kids')>=0 ) {
														if(dimResult.ancestors != null && dimResult.ancestors.length  == 2){
															uniqueCategoryName = currentCategory;
															if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
																validCategories = validCategories+1;
																uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
																newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' +currentCategory+'</a></li>');
															}
														}
														else if(dimResult.ancestors != null && dimResult.ancestors.length  >2 ){
															if(dimResult.ancestors[2].label.toLowerCase().indexOf('boys') || dimResult.ancestors[2].label.toLowerCase().indexOf('girls')){
																uniqueCategoryName = dimResult.ancestors[2].label+currentCategory;
																if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
																	validCategories = validCategories+1;
																	uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
																	newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + dimResult.ancestors[2].label+"'"+" "+currentCategory+'</a></li>');
																}
															}
															else {
																uniqueCategoryName = currentCategory;
																if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
																	validCategories = validCategories+1;
																	uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
																	newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' +currentCategory+'</a></li>');
																}
															}
														}
													}
													else {
														uniqueCategoryName = currentCategory;
														if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
															validCategories = validCategories+1;
															uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
															newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + currentCategory+'</a></li>');
														}
													}
												}

											}
											else if(primaryCategory.toLowerCase().indexOf('kids')>=0 ){
												if(dimResult.ancestors != null && dimResult.ancestors.length == 0 || dimResult.ancestors != null && dimResult.ancestors.length == 1){
													uniqueCategoryName = currentCategory;
													if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
														validCategories = validCategories+1;
														uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
														newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + currentCategory + '</a></li>');
													}
												}
												else {
													uniqueCategoryName = dimResult.ancestors[1].label+currentCategory;
													if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
														validCategories = validCategories+1;
														uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
														newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + dimResult.ancestors[1].label+"'"+" "+currentCategory + '</a></li>');
													}
												}
											}
											else{
												uniqueCategoryName =currentCategory;
												if(uniqueCategoryNames.indexOf(uniqueCategoryName)<0){
													validCategories = validCategories+1;
													uniqueCategoryNames = uniqueCategoryNames+uniqueCategoryName+"|";
													newContent.append('<li class="dimResult"><a href="' + action +'?previousPage=type&tab='+primaryCategory+ '">' + currentCategory+'</a></li>');
												}
											}
											if(validCategories == 3){
												break;
											}
									}
								}
							}
						}
					}
				}
			}

			var contentProducts = productData;
			var counter = -1;
			var addedProducts =0;

			for(var product in contentProducts){
				counter= counter+1;
				if(addedProducts <5){
					var prodId =contentProducts[counter].prodId;
					var prodName = contentProducts[counter].prodName;prodName
					var index = prodName.indexOf(' |');
					prodName = prodName.substring(0, index);
					var prodNameDisplay = contentProducts[counter].prodName;
					prodName = prodName.replace(' ','-');
					prodName = prodName.replace(/[^a-zA-Z0-9]/g,'-');
					var recordSpec = contentProducts[counter].recordSpec;
					var skuType = contentProducts[counter].skuType
					skuType = skuType.toLowerCase();
					if(skuType.indexOf("giftcard") <0 && skuType.indexOf("giftbox") <0 && skuType.indexOf("giftwrap")<0 ){
						addedProducts = addedProducts+1;
						newContent.append('<li class="dimResult"><a href="' + '/product/'+prodName+'/'+prodId+'/_/A-'+recordSpec +'?showProducts=111&previousPage=type'+ '">' +prodNameDisplay + '</a>' + '</li>');
					}
				}
			}

			//resultListCartridge = productData.products;
			/*if (resultListCartridge != null && resultListCartridge['@type'] == "ResultsList" && resultListCartridge.totalNumRecs> 0) {
				var recSize =resultListCartridge.records.length;
				if(recSize >= 5){
					recSize = 5;
				}

				for (var i = 0; i <recSize ; i++) {
					var record = resultListCartridge.records[i];
					if (record != null) {
						var giftSku = record.attributes['P_SKU_Type'][0];
						giftSku = giftSku.toLowerCase();
						if(giftSku.indexOf("giftcard") <0 && giftSku.indexOf("giftbox") <0 && giftSku.indexOf("giftwrap")<0 )
							newContent.append('<li class="dimResult"><a href="' + record.detailsAction.contentPath + record.detailsAction.recordState +'?showProducts=111&previousPage=type'+ '">' + record.attributes['product.displayName'][0] + '</a>' + '</li>');
					}
				}
			}*/

		}
		return newContent;
	};
	/**
	 * Highlight the matched text in result item.
	 */
	$j.EndecaSearchSuggestor.prototype.highlightMatched = function (text) {
		var inputText = $j.trim(this._element.val()).toLowerCase();
		var highlighted = text.toLowerCase();

		if (highlighted.indexOf(inputText) != -1) {
			var index = highlighted.indexOf(inputText);
			var prefix = text.substring(0, index);
			var suffix = text.substring(index + inputText.length);
			inputText = text.substr(index, inputText.length);
			highlighted = prefix + suffix;
		}

		return highlighted;
	};
	/**
	 * Bind event handlers for the links and divs in the box
	 */
	$j.EndecaSearchSuggestor.prototype.bindEventHandler = function () {
		var suggestor = this;
		//change CSS class when mouseover on result item
		$j("a", $j(".dimResult", this._container)).mouseover(function(e){
			//remove existing selection if any
			$j(".dimResult", suggestor._container).parent().each(function(ind){
				$j("a", $j(".dimResult", this._container)).removeClass("acselected");
			});
			//highlight the selected item
			$j(this).addClass("acselected");
			suggestor._selectedIndex = $j(".dimResult", suggestor._container).index($j(this));
		});

		//remove selection on highlight
		$j("a", $j(".dimResult", this._container)).mouseout(function(e){
				//remove existing selection if any
				$j(".dimResult", suggestor._container).parent().each(function(ind){
					$j("a", $j(".dimResult", this._container)).removeClass("acselected");
				});
				suggestor._selectedIndex = -1;
			});

		// select the result item when user lick on it
		$j(".dimResult", this._container).click(function (e) {
			suggestor.selectItem();
		});
		// select the result item when user lick on it
		$j("a", $j(".dimResult", this._container)).click(function (e) {
			e.preventDefault();
			suggestor.selectItem();
		});
		// Dim roots are not link, when click, move the focus back to input box
		$j(".dimRoots", this._container).click(function () {
			clearTimeout(suggestor._hideTimeOutId);
			suggestor._element.focus();
		});
	};
	/**
	 * Set the search suggestion box position
	 */
	$j.EndecaSearchSuggestor.prototype.setPosition = function () {
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
	$j.fn.endecaSearchSuggest = function (options) {
		var opts = $j.extend({}, $j.fn.endecaSearchSuggest.defaults, options);
		this.each(function () {
			var element = $j(this);
			new $j.EndecaSearchSuggestor(element, opts);
		});
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
		defaultImage: 'no_image.gif'
	};
})(jQuery);