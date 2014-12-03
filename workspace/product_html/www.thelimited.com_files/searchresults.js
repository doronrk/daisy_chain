/*
 * All java script logic for the search result and refinement
 * handling.
 *
 * It contains all the client side script code for the search
 * result UI interactions.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 *
 * The logic extends the JS namespace app.*
 */
 

(function(app){
	if (app) {
	
		// Search Library
		app.search = {
			
			// Current search result
			result : null,
			
			pageSize : app.constants.itemsPerPage, // Number of products per page for endless scroll
			pageUrl : window.location.href, // Endless scroll update URL
			timer : null, // Endless scroll timer
			
			// updates all bindings for changed DOM elements
			updateRefineBindings : function() {
				app.search.bindClickToAllRefineLinks();
				app.search.bindClickProductHashUpdate();
				app.search.bindClickToPaginationLinks();
				app.search.bindChangeToSortBy();
				app.search.bindChangeToItemsPerPage();
				app.search.bindLoadMore();
			},
			
			// add click handler to each refinement link
			bindClickToAllRefineLinks : function() {
				// non-category refinements
				jQuery("div.refineattributes ul li a").unbind('click').click(function(e) {
					if (jQuery(this).parents('.navgroup').length) {
						var title = jQuery(this).attr("title");
						var type = jQuery(this).parents('.navgroup')[0].id;
						if (title != "")
							s.prop18 = type.replace("refinement-", "");
						if (type != "")
							s.prop19 = type.replace("refinement-", "") + ": " + title;
			   			var s_code=s.t();
			   			if(s_code)
			   				document.write(s_code);
					}
					e.preventDefault();
					app.search.result.toggleRefine(this);
					return false;
				});
			
				// bind clear events
				jQuery("#searchrefinements div.refinedclear a").unbind('click').click(function(e) {
					e.preventDefault();
					if (jQuery(this).parents('.navgroup').length) {
						var refID = jQuery(this).parents('.navgroup')[0].id;
						app.search.result.clearRefinement(app.search.result.get(refID));
					}
					
					return false;
				});
			},
			
			// add click handler to each pagination link (only refreshes grid)
			bindClickToPaginationLinks : function() {
				jQuery("#shelf-container div.pagination a").unbind('click').click(function(e) {
					e.preventDefault();
					var pageName = jQuery(this).attr("class");
					app.search.result.pageTo(pageName);
					return false;
				});
			},
			
			// add change handler for sortby menu
			bindChangeToSortBy : function() {
				// This function updates which "Sort" options is selected. Display.
				var url = app.search.pageUrl;
				var hashIndex = url.indexOf('#');
				if (hashIndex != -1) {
					url = url.slice(hashIndex+1);
					var params = app.util.getParamsFromURL('?' + url); // The '?' fools it into returning results
					if (params.srule != undefined) {
						jQuery('#dropdown-sort .refineattributes li').removeClass('selected');
						jQuery('#dropdown-sort .refineattributes li a[href*="' + params.srule + '"]').parent('li').addClass('selected');
					}
				}
				
				// Filterbar dropdown
				jQuery("#dropdown-sort .refineattributes a").unbind('click').click(function(e) {
					e.preventDefault();
					
					var url = jQuery(this).attr('href');
					if (jQuery(this).parent('ul').hasClass('noajax')) {
						window.location.href = url;
					} else {
						// if ajax is not disabled
						// use the updateGrid() method (category page)
						
						var srule = '';
						var arr = url.split('?');
						if (arr.length>1) {
							arr2 = arr[1].split('&');
							if (arr2.length>1) {
								for(var i=0;i<arr2.length;i++){
									str = arr2[i].split('=');
									if (str.length>1) {
										if (str[0]=='srule') {
											srule = str[1];
										}
									}
								}
							}
						}
						
						var url = app.search.pageUrl;
						var hashIndex = url.indexOf('#');
						if (hashIndex != -1) {
							url = url.slice(0, hashIndex);
						}
						if (srule != '') {
							url = app.util.appendParamToURL(url, 'srule', srule);
						}
						url = app.util.appendParamToURL(url, 'start', '0'); // Reset start to 0
					
						jQuery(this).parent().siblings('li').removeClass('selected');
						jQuery(this).parent('li').addClass('selected');
						
						app.search.result.updateGrid(url);
					}
					return false;
				});
			
				// Select dropdown
				jQuery("div.sortby select").unbind('change').change(function(e) {
					var url = jQuery(this).val();
					
					if ($(this).hasClass('noajax')) {
						// if the select has the noajax class 
						// dont use updateGrid() but reload the page
						// used on search results
						window.location.href = url;
					} else {
						// if ajax is not disabled
						// use the updateGrid() method (category page)
						app.search.result.updateGrid(url);
					}										
					return false;
				});
			},
			
			// add change handler for items per page menu
			bindChangeToItemsPerPage : function() {
				jQuery("div.itemsperpage select").unbind('change').change(function(e) {
					var url = jQuery(this).val();
					app.search.result.updateGrid(url);
					return false;
				});
			},
			
			/**
			* Bind Load More Actions/Events
			*
			* This called when a page (or sections of the page) are loaded.
			*/
			bindLoadMore : function() {
				jQuery('#shelf div.pagination').hide();
				
				if (app.search.result != null) {

					if (jQuery('#load-more').length) {
						jQuery('#load-more').unbind('click');
						
						var loadFirstCategory = false;
						if (app.rollup != null) {
							// Rollup Page
							var cat = app.rollup[0];
							if (cat.isLoading == false && cat.isLoaded == false) {
								// Load the First Category
								loadFirstCategory = true;
								
								var url = cat.url;
								
								url = app.util.appendParamToURL(url, 'sz', app.search.pageSize);
								url = app.util.appendParamToURL(url, 'start', 0);
								
								cat.isLoading = true;
								jQuery('#load-more').html('Loading - ' + cat.name);
								
								app.search.result.updateGrid(url, true, undefined, '#shelf-container #loadmore-'+cat.index, '#shelf-container #rollupheader-'+cat.index);
							}
						}
							
						if (loadFirstCategory == true) {
							// Is loading the first rollup category above...
						} else {
							
							if (app.paging['end'] != null) {
								// Load More
								var start = app.paging['start']; // Starting position of last load
								var size = app.paging['size']; // Page size of last load
								var end = app.paging['end']; // Total number of items
								var next = Math.min(start + size, end);
	
								if (next == end) {
									// jQuery('#load-more').remove();
								} else {
									if (app.paging['name'] != null) {
										jQuery('#load-more').html('Showing ' + app.paging['name'] + ' - ' + next + ' of ' + end);
									} else {
										jQuery('#load-more').html('Showing - ' + next + ' of ' + end);
									}
									jQuery('#load-more').click(function(e) {
										e.preventDefault();
										app.search.loadMore();
									});
								}
							}

							clearTimeout(app.search.timer);
							app.search.timer = setTimeout('app.search.endlessScroll()', 1000);
						}
					}
				}
			},
			
			// load more trigger
			loadMore: function() {
				
				if (app.search.result != null) {
					if (app.search.result.loading) return;
				
					var url = app.search.pageUrl;
					var start = app.paging['start']; // Starting position of last load
					var size = app.paging['size']; // Page size of last load
					var end = app.paging['end']; // Total number of items
					var next = Math.min(start + size, end);
					
					/*
					if (window.location.hash) {
						url = window.location.href.replace("#","");
					}
					*/
					var hashIndex = url.indexOf('#');
					if (hashIndex != -1) {
						url = url.slice(0, hashIndex);
					}
					url = app.util.appendParamToURL(url, 'sz', app.search.pageSize);
					url = app.util.appendParamToURL(url, 'start', next);
					
					if (app.paging['name'] != null) {
						jQuery('#load-more').html('Loading ' + app.paging['name'] + ' - ' + next + ' of ' + end);
					} else {
						jQuery('#load-more').html('Loading - ' + next + ' of ' + end);
					}
					
					// Rollup
					var appendIntoContainer = undefined;
					var showOnSuccess = undefined;
					if (app.rollup != null) {
						// Find Current Category
						var id = app.paging['categoryID'];
						for (var i = 0; i < app.rollup.length; i++) {
							if (app.rollup[i].id == id) {
								app.rollup[i].loading = true;
								appendIntoContainer = '#shelf-container #loadmore-' + app.rollup[i].index;
								showOnSuccess = '#shelf-container #rollupheader-' + app.rollup[i].index;
								break;
							}
						}
					}
					app.search.result.updateGrid(url, true, undefined, appendIntoContainer, showOnSuccess);
				}
			},
			
			// trigger endless scrolling
			endlessScroll: function() {
				if (app.search.result.loading == false) {
					
					var start = app.paging['start'];
					var size = app.paging['size']; // Page size of last load
					var end = app.paging['end'];
					var next = Math.min(start + size, end);
					
					if (next == end) {
						// No more products...
						
						if (app.rollup != null) {
							// Rollup Page
							
							// Find Current/Next Category
							var id = app.paging['categoryID'];
							var nextIndex = null;
							for (var i = 0; i < app.rollup.length; i++) {
								if (app.rollup[i].id == id) {
									app.rollup[i].loading = true;
									app.rollup[i].loaded = true;
									nextIndex = i + 1;
									break;
								}
							}
							
							// Next Category
							if (nextIndex != null && nextIndex < app.rollup.length) {
								var cat = app.rollup[nextIndex];
								var url = cat.url;

								url = app.util.appendParamToURL(url, 'sz', app.search.pageSize);
								url = app.util.appendParamToURL(url, 'start', 0);
								
								cat.isLoading = true;
								jQuery('#load-more').html('Loading - ' + cat.name);
								app.search.result.updateGrid(url, true, undefined, '#shelf-container #loadmore-'+cat.index, '#shelf-container #rollupheader-'+cat.index);
							} else {
								jQuery('#load-more').remove();
							}
						} else {
							jQuery('#load-more').remove();						
						}
						
					} else {
						var documentHeight = jQuery(document).height(); // returns height of HTML document
						var browserHeight = jQuery(window).height(); // returns height of browser viewport
						var scrollTop = jQuery(window).scrollTop(); // return the number of pixels scrolled vertically
						var inBrowser = browserHeight == documentHeight;
						// var atBottom = (documentHeight - browserHeight) == scrollTop;
						
						var triggerLoad = false;
						if (inBrowser) {
							// Browser window encompasses the full page... Load more
							triggerLoad = true;

						} else {
							// Document is taller than browser height						
							var productTop = jQuery('#shelf-container .productresultarea').offset().top;
							var productHeight = jQuery('#shelf-container .productresultarea').height();
							var productBottom = productTop + productHeight;
							
							var bottomMargin = documentHeight - productBottom + 425; // Roughly the height of a product tile...
							var scrollBottom = documentHeight - (scrollTop + browserHeight)
							
							if (scrollBottom < bottomMargin) {
								triggerLoad = true;
							}
							
							/*
							if (jQuery('#resize-info').length == 0) {
								jQuery('body').append('<div id="resize-info"></div>');
							}
							jQuery('#resize-info').empty().append(
								'documentHeight = ' + documentHeight + '<br />' +
								'browserHeight = ' + documentHeight + '<br />' +
								'scrollTop = ' + scrollTop + '<br />' +
								'inBrowser = ' + inBrowser + '<br />' +
								'productTop = ' + productTop + '<br />' +
								'productHeight = ' + productHeight + '<br />' +
								'productBottom = ' + productBottom + '<br />' +
								'bottomMargin = ' + bottomMargin + '<br />' +
								'scrollBottom = ' + scrollBottom + '<br />' +
								'triggerLoad = ' + triggerLoad + '<br />'
							);
							*/
						}
						
						if (triggerLoad) {
							app.search.loadMore();
						}
						
						clearTimeout(app.search.timer);
						app.search.timer = setTimeout('app.search.endlessScroll()', 1000);
					}
				}			
			},
			
			/**
			* Add "Start Position" to URL Hash
			*/
			bindClickProductHashUpdate : function() {
				// #search .producttile .quickviewbutton a
				
				

				jQuery('#shelf-container .producttile .set-name a, #shelf-container .producttile .name a, #shelf-container .productimage a').unbind('click').click(function(e) {
					var url = jQuery(this).attr('href');
					var obj = app.util.getParamsFromURL(url);
					
					if (obj['start'] != undefined) {
						var urlWithPosition = app.util.appendParamToURL(app.search.pageUrl, 'pos', obj['start']);
						if (obj['cgid'] != undefined) {
							urlWithPosition = app.util.appendParamToURL(urlWithPosition, 'rollup', obj['cgid']);
						}
						app.search.updateHash(urlWithPosition);
					}
					
					window.location.href = url;
				});
			},
				
			// adds the refinement values to the window location hash
			updateHash : function(url) {
				url = (url == undefined) ? app.search.pageUrl : url;
				
				var queryIndex = url.indexOf('?');
				var hashIndex = url.indexOf('#');
				
				var hasQuery = (queryIndex == -1) ? false : true;
				var hasHash = (hashIndex == -1) ? false : true;
				
				var location = '';
				var search = '';
				// var hash = '';
				if (hasQuery && hasHash) {
					// location = url.slice(0, queryIndex); // 'http://example.com/page.html'
					search = url.slice(queryIndex+1,hashIndex); // 'searchkey=value'
					// hash = url.slice(hashIndex+1); // 'hashkey=value'
				} else if (hasQuery) {
					// location = url.slice(0, queryIndex); // 'http://example.com/page.html'
					search = url.slice(queryIndex+1); // 'searchkey=value'
				} else if (hasHash) {
					// location = url.slice(0, hashIndex); // 'http://example.com/page.html'
					// hash = url.slice(hashIndex+1); // 'hashkey=value'
				} else {
					// location = url; // 'http://example.com/page.html'
				}
				
				search = search.replace('?','').replace('#','');
								
				if (search.length > 0) { 
					window.location.hash = search; // Make sure there aren't any surprises
				} else {
					window.location.hash = '';
				}
								
				return search;
			},
			
			/**
			* Reload the grid using the 'post hash' refinement values
			*/
			updateGridFromHash : function() {
				// console.log('updateGridFromHash()');

				if (app.search.result != null && window.location.hash.length > 1) {
					var search = window.location.search; // '?searchkey=value'
					var hash = window.location.hash; // '#hashkey=value'
					var href = window.location.href; // 'http://example.com/?searchkey=value#hashkey=value'
					var url = href.replace(search,'').replace('#','?'); // 'http://example.com/?hashkey=value'
					
					var starting = 1;
					var size = app.search.pageSize;
					
					var obj = app.util.getParamsFromURL(url);
					
					if (obj['pos'] != undefined) {
						starting = parseInt(obj['pos']);
						size = Math.ceil(starting/app.constants.itemsPerPage) * app.constants.itemsPerPage;
					}
					
					// Rollup
					var appendIntoContainer = undefined;
					var showOnSuccess = undefined;
					
					// This ends up swapping out the URL with a rollup category
					if (obj['rollup'] != undefined) {
						if (app.rollup != null) {
							var id = obj['rollup'];
							for (var i = 0; i < app.rollup.length; i++) {
								cat = app.rollup[i];
								if (cat.id == id) {
									cat.loading = true;
									appendIntoContainer = '#shelf-container #loadmore-' + cat.index;
									showOnSuccess = '#shelf-container #rollupheader-' + cat.index;
									// url = cat.url;
									break;
								}
							}
						} else {
							delete obj['rollup'];
						}
					}
					
					// These are things that should not be copied into the hashed section...
					delete obj['navid'];
					delete obj['pos'];
					delete obj['sz'];
					delete obj['start'];
					// delete obj['rollup'];
					delete obj['icid'];
					delete obj['cid'];
					delete obj['utm_campaign'];
					delete obj['utm_content'];
					delete obj['utm_medium'];
					delete obj['utm_source'];
					delete obj['utm_term'];
					
					var params = false;
					for (var prop in obj) {
						params = true;
						break;
					}
					
					if (params == true || size > app.constants.itemsPerPage) {
						search = window.location.search;
						hash = window.location.hash;
						href = window.location.href;
						
						hash = hash.replace(' ', '%20').replace('+', '%2B');
						
						// Strip hash and search from the URL.
						url = href.replace(search,'').replace(hash,'').replace('#','').replace('?','');
						
						url = app.util.appendParamToURL(url, 'sz', size);
						url = app.util.appendParamToURL(url, 'start', 0);
						if (params == true) {
							for (var prop in obj) {
								url = app.util.appendParamToURL(url, prop, decodeURIComponent(obj[prop]));
							}
						}
						
						app.search.result.updateGrid(url, false, starting, appendIntoContainer, showOnSuccess);
					} else {
						//console.log('no reload');
					}
					
				} else {
					//console.log('No Results');
				}
			},

			updateMoreSale : function() {
						
				if (app.rollup == null) {
					threshold = 10;
				
					if (app.paging['categoryCount'] <= threshold && app.paging['saleURL'] != null && app.paging['saleURL'] != 'null') {
						// LOAD SALE ITEMS
						jQuery("#shelf-container .producthits .sale-container").remove();
						jQuery("#shelf-container .producthits .productresultarea-nth").after("<div class=\"sale-container\"></div>");
						var saleURL = app.util.appendParamToURL(app.paging['saleURL'], "loadsale", "true");
						saleURL = app.util.appendParamToURL(saleURL, "format", "ajax");

						jQuery("#shelf-container .producthits .sale-container:last").load(saleURL, function() {
							if (jQuery('.product.producttile', this).length > 0) {
								jQuery(this).wrapInner('<div class="productresultarea"></div>');
								jQuery(this).wrapInner('<div class="productresultarea-nth"></div>');
								jQuery(this).prepend('<div class="productheader"><h2>More On Sale</h2><a href="'+app.paging['saleURL']+'">View in Sale &rsaquo;</a><div class="clear"></div></div>');
							
								// Execute on page load.
								var quickViewOptions = {
									buttonSelector: "div.quickviewbutton",
									imageSelector: "div.producttile div.image",
									buttonLinkSelector: "div.quickviewbutton a",
									productNameLinkSelector: "div.producttile div.name a"
								};
								jQuery(quickViewOptions.imageSelector).unbind('mouseenter mouseleave');
								jQuery(quickViewOptions.buttonLinkSelector).unbind('click');
								app.quickView.bindEvents(quickViewOptions);
							
								jQuery(quickViewOptions.buttonLinkSelector).click(function(e) {
									var url = jQuery(this).attr('href');
									var obj = app.util.getParamsFromURL(url);					
									if (obj['start'] != undefined) {
										var urlWithPosition = app.util.appendParamToURL(app.search.pageUrl, 'pos', obj['start']);
										if (obj['cgid'] != undefined) {
											urlWithPosition = app.util.appendParamToURL(urlWithPosition, 'rollup', obj['cgid']);
										}
										app.search.updateHash(urlWithPosition);
									}
								});
								app.execUjs();
							}
						});
					}
				}
			},

			// search result object
			SearchResult : function(keywordSearch, categoryID) {
					
				this.refinements = [];
				this.initialized = false;
				this.keywordSearch = keywordSearch;
				this.categoryID = null;
				this.loading = false;
			
				// retrieves a registered refinement by id
				this.get = function(id) {
					for (var i=0; i<this.refinements.length; i++) {
						if (this.refinements[i].id == id) return this.refinements[i];
					}
					return null;
				};
				
							
				this.cleanupID = function(s) {
					return s.toLowerCase().replace( new RegExp( "[^a-z0-9_\-]", "gi" ), "-" );
				};
			
				// registers and adds the a refinement to the given position
				// if it is not already registered and renders the new refinement
				this.register = function(dwRefinement, pos) {
					if (pos < 1) return;
					
					if (this.isRegistered(dwRefinement, pos) && this.initialized) {
						// check if registered at position
						this.refresh(dwRefinement);
						this.updateValues(dwRefinement);
						this.updateClear(dwRefinement);
						return;
					} else if (this.isRegistered(dwRefinement) && this.initialized) {
						// check if registered in general
						this.moveRefinement(dwRefinement, pos);
						this.refresh(dwRefinement);
						this.updateValues(dwRefinement);
						this.updateClear(dwRefinement);
						return;
					}
					
					// register the refinement at the correct position
					dwRefinement.refreshed = true;
					
					this.refinements.splice(pos-1, 0, dwRefinement);
					
					if (this.initialized) {
						// render the refinement based on the refinement type
						this.renderRefinement(dwRefinement, pos);
					}
				};
			
				// refreshes the given refinement
				this.refresh = function(dwRefinement) {
					
					for (var i=0; i<this.refinements.length; i++) {
						if (this.refinements[i].id != dwRefinement.id) continue;
						
						this.refinements[i].refreshed = true;
						return;
					}
				};
			
				// removes the given refinement from the DOM
				this.removeRefinement = function(dwRefinement) {
					jQuery("#"+dwRefinement.id).remove();
				};
			
				// checks if the refinement is registered at the (optional) given position
				// if the position is not given, the function check if the refinement is registered in general
				this.isRegistered = function(dwRefinement, pos) {
					for (var i=0; i<this.refinements.length; i++) {
						if ((this.refinements[i].id == dwRefinement.id) && pos == null) return true;
						if ((this.refinements[i].id == dwRefinement.id) && (pos-1) == i) return true;
					}
					return false;
				};
			
				// renders an individual refinement at the given position into the DOM
				this.renderRefinement = function(dwRefinement, pos) {

					// insert at correct position
					var refSet = jQuery("div.refinement");
					if (refSet.length == 0 || refSet.length < pos-1) pos = 1;
						
					// get the correct predecessor refinement container
					var predecessorID = null;
					if (typeof(this.refinements[pos-2]) != "undefined") {
						predecessorID = this.refinements[pos-2].id;
					}
					
					if (predecessorID != null) {
						// insert after found predecessor
						jQuery("#" + predecessorID).after( this.buildHtmlRefinement(dwRefinement) );
					} else {
						// insert at first position
						jQuery("#searchrefinements").prepend( this.buildHtmlRefinement(dwRefinement) );
					}
					
					// bind toggling
					this.bindToggleEvent(dwRefinement);
					
					// append list update values
					this.updateValues(dwRefinement);
				};
			
				// binds the toggling event
				this.bindToggleEvent = function(dwRefinement) {
					jQuery("#"+dwRefinement.id+" h3").click(function(e) {
						e.preventDefault();
						jQuery(this).toggleClass("collapsed");
						jQuery(this).nextAll("div.refinement-container").toggle();
					});
				};
			
				// bind event handlers to value list
				this.bindRefineEvents = function(dwRefinement) {
					if (dwRefinement.type == "category") {
						/*
						To make bookmarking and browser back-button work correctly the browser URL 
						needs to change. To force that change we do a full-page load (not AJAX) when 
						changing the category refinement.
						The implementation supports changing the category with AJAX: just uncomment 
						this code block to bind the event handlers.
					
						// category refinements
						jQuery("#"+dwRefinement.id+" ul li a").click(function(e) {
							var url = jQuery(this).attr("href");
							app.search.result.refine( "refinement-category", url );
							return false;
						});
						jQuery("div.searchcategory span a").click(function(e) {
							var url = jQuery(this).attr("href");
							app.search.result.refine( "refinement-category", url );
							return false;
						});
						*/
						return;
					} else {
						// non-category refinements
						jQuery("#"+dwRefinement.id+" ul li a").unbind('click').click(function(e) {
							e.preventDefault();
							app.search.result.toggleRefine(this);
							return false;
						});
						return;
					}
				};
			
				// builds the actual html code for the refinement based on the type
				this.buildHtmlRefinement = function(dwRefinement) {
					var html = "";
					
					if (dwRefinement.type == "category") {
						html = "<div id=\"" + dwRefinement.id + "\" class=\"searchcategories refinement\">" +
							"<ul id=\"depth-1\" class=\"refinementcategory\"><\/ul><\/div>";
					} else {
						html = "<div id=\"" + dwRefinement.id + "\" class=\"navgroup refinement\">" +
							"<h3>" + dwRefinement.displayName + "</h3><div class=\"refinedclear\"><\/div>";
						
						html += "<div class=\"refineattributes\">";
						
						// type based html code here
						if (dwRefinement.swatchBased) {
							html += "<div class=\"swatches " + dwRefinement.displayName + "\"><ul><\/ul><\/div><div class=\"clear\"><\/div>";
						} else {
							html += "<div><ul><\/ul><\/div>";
						}
						
						html += "<\/div>";
					}
					return html;
				};
			
				// moves an already registered refinement (no need to render fully) from
				// one position to another in the refinements
				this.moveRefinement = function(dwRefinement, positionTo) {
					var currentIdx = null;
					var newIdx = positionTo-1;
					
					// new position exceeds array size
					if (newIdx > this.refinements.length) return;
					
					// find current position
					for (var i=0; i<this.refinements.length; i++) {
						if (this.refinements[i].id == dwRefinement.id) {
							currentIdx = i;
							break;
						}
					}
					
					// not found
					if (currentIdx == null) return;
					
					// exchange refinements in array
					this.refinements[currentIdx] = this.refinements[newIdx];
					this.refinements[newIdx] = dwRefinement;
				};
			
				// updates and renders the list of values of the given refinement
				this.updateValues = function(dwRefinement) {
					// remove the existing list of values
					jQuery("#"+dwRefinement.id+" ul").empty();
					
					// toggle scrollbox for long value lists
					/*
					if (dwRefinement.type == "attribute" && !dwRefinement.swatchBased && dwRefinement.cutoffThreshold != null) {
						if (dwRefinement.values.length > dwRefinement.cutoffThreshold) {
							jQuery("#"+dwRefinement.id+" div.refineattributes").children().addClass("scrollable");
						} else {
							jQuery("#"+dwRefinement.id+" div.refineattributes").children().removeClass("scrollable");
						}
					}
					*/
					
					// render refinement label for category
					/*
					if (dwRefinement.type == "category" && this.keywordSearch && this.categoryID == null) {
						jQuery("div.searchcategory").empty();
						jQuery("div.searchcategory").append("<span>"+dwRefinement.displayName+"</span>");
					}
					*/
					
					// no list element ID by default
					var listElemID = "";
					
					// add new values to the list
					for (var i=0; i<dwRefinement.values.length; i++) {
						var value = dwRefinement.values[i];
						
						// render top level category different in case we have a keyword search
						if (i == 0 && dwRefinement.type == "category" && this.keywordSearch && this.categoryID != null) {
							if (jQuery("#"+dwRefinement.id+" div.refinedclear a").length == 1) {
								jQuery("#"+dwRefinement.id+" div.refinedclear").empty();
							}
							jQuery("#"+dwRefinement.id+" div.refinedclear").append("<a href=\""+dwRefinement.clearUrl+"\">View All<\/a>");
						}
						
						// map correct classes
						var aClass = "refineLink";
						if (dwRefinement.swatchBased) aClass = "swatchRefineLink";
						
						var aID = dwRefinement.getValueElementID(value);
						var aUrl = value.refineUrl;
						var liClass = null;
						if (value.refined && dwRefinement.type != "category") { aUrl = value.relaxUrl; liClass = "selected"; }
						if (value.active && dwRefinement.type == "category") { aClass += " active"; liClass = "active"; }
						if (!value.selectable) { aUrl = null; liClass = "unselectable"; }
						
						if (dwRefinement.type == "category" && value.expandable) {
							if (liClass != null) {
								liClass += " expandable";
							} else {
								liClass = "expandable";
							}
						}
						
						if (dwRefinement.swatchBased && aID != null) {
							aID = this.cleanupID(aID);
						}
						
						// get the correct list element ID
						if (dwRefinement.type == "category") {
							arr = value.level.split('.');
							level = arr[0];
							listElemID = "depth-" + level;
							
							// check on existence of this list element
							// create it on the fly if it does not not exist at present
							if (arr.length == 2 && arr[1] == "new") {
								var parentListElemID = "depth-" + (level - 1);
								jQuery("#"+dwRefinement.id+" ul."+parentListElemID+" li").filter(":last").append("<ul class=\"refinementcategory "+listElemID+"\"><\/ul>");								
							}
							/*
							if (jQuery("#"+dwRefinement.id+" ul."+listElemID).length == 0) {
								var parentListElemID = "depth-" + (level - 1);
								jQuery("#"+dwRefinement.id+" ul."+parentListElemID+" li:last").append("<ul class=\"refinementcategory "+listElemID+"\"><\/ul>");
							}
							*/
							jQuery("#"+dwRefinement.id+" ul" + (listElemID != "" ? "." + listElemID : "")).filter(":last").append(
								"<li" + (liClass != null ? " class=\"" + liClass + "\"" : "") + "><a " + (aID != null ? " id=\"" + aID + "\"" : "") + " class=\"" + aClass + "\" " + (aUrl != null ? " href=\"" + aUrl + "\"" : "") + " title=\"" + value.displayValue + "\">" + (dwRefinement.swatchBased ? "<span><\/span>" : "") + value.displayValue + "<\/a><\/li>");
						} else {
							listElemID = "";
							jQuery("#"+dwRefinement.id+" ul" + (listElemID != "" ? "#" + listElemID : "")).append(
								"<li" + (liClass != null ? " class=\"" + liClass + "\"" : "") + "><a " + (aID != null ? " id=\"" + aID + "\"" : "") + " class=\"" + aClass + "\" " + (aUrl != null ? " href=\"" + aUrl + "\"" : "") + " title=\"" + value.displayValue + "\">" + (dwRefinement.swatchBased ? "<span><\/span>" : "") + value.displayValue + "<\/a><\/li>");
						}
						
					}
					
					// bind event handlers to new value list
					this.bindRefineEvents(dwRefinement);
				};
			
				// updates the clear link of the given refinement
				this.updateClear = function(dwRefinement) {

					// remove link
					if (jQuery("#"+dwRefinement.id+" div.refinedclear a").length == 1) {
						jQuery("#"+dwRefinement.id+" div.refinedclear").empty();
					}
						
					if (dwRefinement.type == "category") {
						// Category
						if (this.keywordSearch && this.categoryID != null) {
							jQuery("#"+dwRefinement.id+" div.refinedclear").append("<a href=\""+dwRefinement.clearUrl+"\">View All<\/a>");
						}
					} else {
						// Attribute
						jQuery("#"+dwRefinement.id+" div.refinedclear").append("<a href=\"" + dwRefinement.clearUrl + "\">Clear Selections<\/a>");
					}
					
					// bind clear event
					jQuery("#"+dwRefinement.id+" div.refinedclear a").unbind('click').click(function(e) {
						e.preventDefault();
						var refID = jQuery(this).parents('.navgroup')[0].id;
						app.search.result.clearRefinement(app.search.result.get(refID));
						return false;
					});
				}
			
				// cleans all refinements based on their refreshed state
				// removes all refinements which haven't been refreshed during
				// a call of method register(..)
				this.clean = function() {

					// set state to initialized
					// do nothing unless initialized
					if (!this.initialized) {
						this.initialized = true;
						return;	
					}
					
					var removeIdx = [];
					
					// find all refinements to remove
					for (var i=0; i<this.refinements.length; i++) {
						if (this.refinements[i].refreshed) continue;
						
						removeIdx[removeIdx.length] = i;
					}
					
					// remove orphaned clear links for refinements which have been relaxed completely
					for (var i=0; i<this.refinements.length; i++) {
						// only process active refinements
						if (this.refinements[i].refreshed) {
							// remove clear link, in case there are no other selected values for this refinement
							if (jQuery("#"+this.refinements[i].id+" ul li.selected").length == 0) {
								jQuery("#"+this.refinements[i].id+" div.refinedclear").empty();
							}
						}
					}
					
					// no refinements to remove
					if (removeIdx.length == 0) {
						return;
					}
					
					// remove refinements and clear their index positions
					for (var j=removeIdx.length-1; j>=0; j--) {
						// remove from DOM and from register
						this.removeRefinement(this.refinements[removeIdx[j]]);
						this.refinements.splice(removeIdx[j], 1);
					}
				};
			
				// sets the state of all refinements to be refreshed
				// this method must be called whenever the user changes the category refinement (refine or relax)
				this.outdate = function() {
					// mark all refinements as to be refreshed
					for (var i=0; i<this.refinements.length; i++) {
						this.refinements[i].refreshed = false;
					}
				};
			
				// toggles a clicked refinement value based on its given state (selected or not selected)
				// and executes the correct action (either a refine or a relax)
				this.toggleRefine = function(objRef) {

					if (typeof objRef == "undefined" || objRef == null) return;
					
					// omit toggling if currently loading
					if (this.loading) return;
					
					var url = jQuery(objRef).attr("href");
					
					var refID = jQuery(objRef).parents('.navgroup').length ? jQuery(objRef).parents('.navgroup').get(0).id : null;

					// avoid IE following non link anchors
					if (!url) return;
					
					// update the hash

					// handle relax
					if (jQuery(objRef).parent().hasClass("selected")) {
						jQuery(objRef).parent().removeClass("selected");
						app.search.result.relax(refID, url);
						// return;
					}
					
					// handle refine
					jQuery(objRef).parent().addClass("selected");
					app.search.result.refine(refID, url);
				}
			
				// this method is called by the click event of a refine link
				this.refine = function(refinementID, url) {
					
					// window.location.href = url;
					var dwRefinement = this.get(refinementID);
					if (dwRefinement == null) return;
					
					// outdate the refinement state in order to exchange old refinements
					// with respect to new refinements at other category level
					if (dwRefinement.type == "category") app.search.result.outdate();
					
					// update the grid
					this.updateGrid(url);
					
					// render a temporary "clear" link
					// This will get removed and re-added by this.updateClear when the AJAX loads...
					if (jQuery("#"+dwRefinement.id+" div.refinedclear a").length == 0 && dwRefinement.type != "category") {
						// console.log('Normally we would add a clear link here...');
						/*
							jQuery("#"+dwRefinement.id+" div.refinedclear").append("<a href=\"" + dwRefinement.clearUrl + "\">Clear Selections<\/a>");
							
							// bind clear event
							jQuery("#"+dwRefinement.id+" div.refinedclear a").click(function(e) {
								var refID = jQuery(this).parents('.navgroup')[0].id;
								app.search.result.clearRefinement(app.search.result.get(refID));
								return false;
							});
						*/
					}
				};
			
				// this method is called by the click event of a relax link (selected refinement value)
				this.relax = function(refinementID, url) {

					var dwRefinement = this.get(refinementID);
					if (dwRefinement == null) return;
					
					// remove clear link, in case there are no other
					// selected values for this refinement
					if (jQuery("#"+dwRefinement.id+" ul li.selected").length == 0) {
						jQuery("#"+dwRefinement.id+" div.refinedclear").empty();
					}
					
					// update the grid
					// this.updateGrid(url);
				};
			
				// clears the given refinement, all selected values become unselected
				this.clearRefinement = function(dwRefinement) {

					if (dwRefinement == null) return;
					
					// omit clearing if currently loading
					if (this.loading) return;
					
					// get the clear url
					var url = jQuery("#"+dwRefinement.id+" div.refinedclear a").attr("href");
					
					// remove "clear" link and value selections
					jQuery("#"+dwRefinement.id+" div.refinedclear").empty();
					jQuery("#"+dwRefinement.id+" ul li").removeClass("selected");
					
					// update the grid
					this.updateGrid(url);
				};
			
				// updates the product grid using the specified url
				this.updateGrid = function(url, append, tilePosition, appendIntoContainer, showOnSuccess) {
					append = (append==null || append==undefined) ? false : append;
					appendIntoContainer = (appendIntoContainer==null || appendIntoContainer==undefined) ? '#shelf-container .productresultarea' : appendIntoContainer;
					showOnSuccess = (showOnSuccess==null || showOnSuccess==undefined) ? undefined : showOnSuccess;
					
					if (url == null) return;
					this.loading = true;
					
					app.search.pageUrl = url;
					
					// update the hash
					if (append) {
						url = app.util.appendParamToURL(url, "loadmore", "true");
					} else {
						app.search.updateHash(url);
					}
					
					// append "format" parameter
					url = app.util.appendParamToURL(url, "format", "ajax");
					
					if (append == false) {
						// Replace the whole page.
						
						jQuery("#shelf-container").append('<div id="shelf-loading-overlay"></div>');
						var w = jQuery("#shelf-container").width();
						var h = jQuery("#shelf-container").height();
						
						jQuery("#shelf-loading-overlay").fadeTo(0, 0.0).width(w).height(h).fadeTo(450, 0.7, function(){
							// Execute on page load.
							jQuery("#shelf-container").load( url, function() {
								jQuery("#shelf-container").fadeTo(0, 0.0);
								
								var quickViewOptions = {
									buttonSelector: "div.quickviewbutton",
									imageSelector: "div.producttile div.image",
									buttonLinkSelector: "div.quickviewbutton a",
									productNameLinkSelector: "div.producttile div.name a"
								};
								jQuery(quickViewOptions.imageSelector).unbind('mouseenter mouseleave');
								jQuery(quickViewOptions.buttonLinkSelector).unbind('click');
								app.quickView.bindEvents(quickViewOptions);
															
								jQuery(quickViewOptions.buttonLinkSelector).click(function(e) {
									var url = jQuery(this).attr('href');
									var obj = app.util.getParamsFromURL(url);					
									if (obj['start'] != undefined) {
										var urlWithPosition = app.util.appendParamToURL(app.search.pageUrl, 'pos', obj['start']);
										if (obj['cgid'] != undefined) {
											urlWithPosition = app.util.appendParamToURL(urlWithPosition, 'rollup', obj['cgid']);
										}
										app.search.updateHash(urlWithPosition);
									}
								});
								
								app.search.updateRefineBindings();
								app.search.result.loading = false;
								
								// extract hidden data and turn them into jQuery data objects
								// app.hiddenData(); // This is called in execUjs...
								app.execUjs();
								
								if (tilePosition != undefined) {								
									var offset = jQuery("#shelf-container .producttile[rel=\""+tilePosition+"\"]").offset();
									if (offset != null) {
										jQuery(window).scrollTop((offset.top - 100));
									}
								}
								
								jQuery("#shelf-container").fadeTo(750, 1.0, function(){});
								
								jQuery(window).trigger('productgrid.replaced');
				
								app.search.updateMoreSale();
							});
						});
						// jQuery("#shelf-container").html(app.showProgress("productloader"));
					} else {
						// Append to page (endless scrolling.)
						
						// appendIntoContainer = '#shelf-container .productresultarea'
						jQuery(appendIntoContainer).append("<div class=\"more-container\"></div>");
						jQuery(appendIntoContainer + " .more-container:last").append("<div class=\"more-animation\"></div>");
						
						jQuery.ajax({
							url: url,
							dataType: 'html',
							success: function(data, textStatus, jqXHR) {
								if (textStatus == "success") {
									// console.log('   ...Success!!! Items loaded');
		
									jQuery(appendIntoContainer + " .more-container:last").remove();
									
									if (showOnSuccess != undefined) {
										jQuery(showOnSuccess).show();
									}
								
									jQuery(appendIntoContainer).append(data);

									// Execute on page load.
									var quickViewOptions = {
										buttonSelector: "div.quickviewbutton",
										imageSelector: "div.producttile div.image",
										buttonLinkSelector: "div.quickviewbutton a",
										productNameLinkSelector: "div.producttile div.name a"
									};
									jQuery(quickViewOptions.imageSelector).unbind('mouseenter mouseleave');
									jQuery(quickViewOptions.buttonLinkSelector).unbind('click');
									app.quickView.bindEvents(quickViewOptions);
	
									jQuery(quickViewOptions.buttonLinkSelector).click(function(e) {
										var url = jQuery(this).attr('href');
										var obj = app.util.getParamsFromURL(url);					
										if (obj['start'] != undefined) {
											var urlWithPosition = app.util.appendParamToURL(app.search.pageUrl, 'pos', obj['start']);
											if (obj['cgid'] != undefined) {
												urlWithPosition = app.util.appendParamToURL(urlWithPosition, 'rollup', obj['cgid']);
											}
											app.search.updateHash(urlWithPosition);
										}
									});
	
									app.search.updateRefineBindings();
									app.search.result.loading = false;
	
									// extract hidden data and turn them into jQuery data objects
									// app.hiddenData(); // This is called in execUjs...
									app.execUjs();

									jQuery(window).trigger('productgrid.appended');
	
									// var top = jQuery("#shelf-container .productresultarea .more-container:last").offset().top - 75;
									// jQuery('body,html').animate({scrollTop: top}, 1000, function() {});
								}
							}
						}).done(function() {
							// console.log("done");
						})
						.fail(function() {
							// console.log("error");
						})
						.always(function() {
							// console.log("always");
						});
					}
				};
			
				// refreshes the product grid to the given pageName
				this.pageTo = function(pageName) {
					
					if (typeof pageName == "number") {
						if (pageName < 1) return;
						pageName = "page-" + pageName;
					}
					
					var pageObj = jQuery("."+pageName);
					if (pageObj.length == 0) return;
					
					app.search.result.updateGrid(pageObj[0].href);
				};
			},
			
			
			// refinements object
			Refinement : function(id, displayName, type, swatchBased, clearUrl, cutoffThreshold) {
				this.id = id;
				this.displayName = displayName;
				this.values = [];
				this.type = type;
				this.swatchBased = swatchBased;
				this.clearUrl = clearUrl;
				this.cutoffThreshold = cutoffThreshold;
				this.refreshed = false;
			
				this.add = function(id, value, presentationID, displayValue, refineUrl, relaxUrl, refined, selectable, expandable, level, active) {
					this.values[this.values.length] = { "value": value, "presentationID": presentationID, "displayValue": displayValue, "refineUrl": refineUrl, "relaxUrl": relaxUrl, "refined": refined, "selectable": selectable, "expandable": expandable, "level": level, "active": active };
				};
			
				this.get = function(id) {
					for(var i=0; i<this.values.length; i++) {
						if (this.values[i].id == id) return this.values[i];
					}
					return null;
				};

				this.getValueElementID = function(value) {
					if (value == "undefined") {
						return null;
					}
					
					var elementID = null;
					if (this.swatchBased) {
						elementID = "swatch-";
						if (value.presentationID != null) {
							elementID += value.presentationID;
						} else {
							elementID += value.displayValue;
						}
					}
					return elementID;
				}
			}
		} // end search
	} else {
		// name space has not been defined yet
		alert("app namespace is not loaded yet!");
	}
})(app);


var refinebar = {
	// container : "#filterbytoolbar",
	trigger : '#filterbar .dropdown-nav',
	menu : '.refinement-container',
	clear : '.dropdown-clear',
	
	init : function() {
		refinebar.hoverEvents();
		// refinebar.clickEvents();
	},
	
	hoverEvents : function() {
		/*
		jQuery(refinebar.trigger).click(
			function(e) {
				var h3 = jQuery('h3', this);
				jQuery('#filterbar .dropdown-nav h3.open').each(function(i,e) {
					if (h3 != undefined && h3.length > 0 && this == h3[0]) {
						//
					} else {
						jQuery(e).removeClass("open");
						jQuery(e).parent().find(refinebar.menu).stop(true,true).fadeOut(125);
					}
				});
				if (jQuery(h3).hasClass('open')) {
					jQuery(h3).removeClass("open");
					jQuery(this).find(refinebar.menu).stop(true,true).fadeOut(125);
				} else {
					jQuery(h3).addClass("open");
					jQuery(this).find(refinebar.menu).fadeIn(125);
				}
			}
		);
		*/
		jQuery(refinebar.trigger).hover(
			function(e) {
				var containerWidth = jQuery('#filterbar').width();
				var position = jQuery(this).position(); //
				var dropWidth = jQuery(this).find('.refinement-container').width(); // 250
				if (dropWidth + position.left > containerWidth) {
					jQuery(this).find('.refinement-container').addClass('rightalign');
				} else {
					jQuery(this).find('.refinement-container').removeClass('rightalign');
				}
				jQuery(this).find('h3').addClass("open");
				jQuery(this).find(refinebar.menu).slideDown(200);
			},
			function(e) {
				jQuery(this).find('h3').removeClass("open");
				jQuery(this).find(refinebar.menu).stop(true,true).slideUp(100);
			}
		);
	},
	
	clickEvents : function() {
		/*
		jQuery('#clear-all').click( function(){
			window.location.href = '${URLUtils.url("Search-Show", "q", pdict.ProductSearchResult.searchPhrase)}'; 
		});
		jQuery(this).find(refinebar.clear).click(function() {
			<isif condition="${pdict.ProductSearchResult.category != null}">
				<isscript>
					var clearAllURL : dw.web.URL = pdict.ProductSearchResult.urlForCategory("Search-Show",pdict.ProductSearchResult.category.getID());
				</isscript>	
				window.location.href = '${clearAllURL}';
			<iselse>
				window.location.reload();
			</isif>
		});
		*/
		
		/*
		jQuery('#clearAll').click(function(){ 
			jQuery(refinebar.clear).click(); 
		});
		*/
	}
}

jQuery(document).ready(function() {
	// Refinement Bar
	refinebar.init();

	// Refinement Filters
	app.search.updateRefineBindings();
	app.search.updateGridFromHash();
	
	// Search
	jQuery("#searchrefinements div.navgroup h3").click(function(e) {
		e.preventDefault();
		jQuery(this).toggleClass("collapsed");
		jQuery(this).nextAll("div.refinement-container").toggle();
	});
	
	// Quickview
	var quickViewOptions = {
		buttonSelector: "div.quickviewbutton",
		imageSelector: "div.producttile div.image",
		buttonLinkSelector: "div.quickviewbutton a",
		productNameLinkSelector: "div.producttile div.name a"
	};
	jQuery(quickViewOptions.imageSelector).unbind('mouseenter mouseleave');
	jQuery(quickViewOptions.buttonLinkSelector).unbind('click');
	app.quickView.bindEvents(quickViewOptions);
								
	jQuery(quickViewOptions.buttonLinkSelector).click(function(e) {
		var url = jQuery(this).attr('href');
		var obj = app.util.getParamsFromURL(url);					
		if (obj['start'] != undefined) {
			var urlWithPosition = app.util.appendParamToURL(app.search.pageUrl, 'pos', obj['start']);
			if (obj['cgid'] != undefined) {
				urlWithPosition = app.util.appendParamToURL(urlWithPosition, 'rollup', obj['cgid']);
			}
			app.search.updateHash(urlWithPosition);
		}
	});
	
	app.search.updateMoreSale();
});