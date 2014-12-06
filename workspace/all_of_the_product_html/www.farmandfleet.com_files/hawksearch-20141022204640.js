(function (HawkSearchLoader, undefined) {
	var jQuery;

	//if true, HawkSearch's jQuery will be loaded dynamically in noConflict mode.
	HawkSearchLoader.loadjQuery = false;

	//if true, some messages will be sent to the console.
	HawkSearchLoader.debugMode = true;

	HawkSearch.SuggesterGlobal = {
		qf: '',
		lookupURL: '',
		divName: '',
		lastVal: '',
		searching: false,
		globalDiv: null,
		divFormatted: false,
		focus: false
	};

	function log(msg) {
		if (HawkSearchLoader.debugMode && window.console && console.log) {
			console.log('HawkSearch: ' + msg);
		};
	}

	if (HawkSearchLoader.loadjQuery) {
		log('Loading jQuery/jQuery UI.');

		// set document head to varible
		var head = (document.getElementsByTagName("head")[0] || document.documentElement),
			script = "//manage.hawksearch.com/sites/shared/includes/jquery-1.11.0_jquery-ui-slider-1.10.4.min.js";

		var jqScriptTag = document.createElement('script');
		jqScriptTag.type = 'text/javascript';
		jqScriptTag.src = script;

		// Handle Script loading
		// IE9+ supports both script.onload AND script.onreadystatechange (bit.ly/18gsqtw)
		// so both events will be triggered (that's 2 calls), which is why "jqLoadDone" is needed
		var jqLoadDone = false;

		// Attach handlers for all browsers
		jqScriptTag.onload = jqScriptTag.onreadystatechange = function () {
			if (!jqLoadDone && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
				jqLoadDone = true;

				log("jQuery applied and ready");
				jQueryLoaded();

				// Handle memory leak in IE
				jqScriptTag.onload = jqScriptTag.onreadystatechange = null;
				if (head && jqScriptTag.parentNode) {
					head.removeChild(jqScriptTag);
				}
			}
		};


		// add script to page's head tag.
		// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
		// This arises when a base node is used (#2709 and #4378).
		head.insertBefore(jqScriptTag, head.firstChild);

	} else {
		jQuery = window.jQuery;
		containedHawkSearchInitializer(jQuery);
	}

	function jQueryLoaded() {
		log('Finalizing JS Component Binding');
		jQuery = window.jQuery.noConflict(true);

		log('Local jQuery version: ' + jQuery.fn.jquery);

		if (window.jQuery)
			log('Global jQuery version: ' + window.jQuery.fn.jquery);
		else {
			log('No Global jQuery present. Adding current jQuery');
			window.jQuery = jQuery;
		}
		containedHawkSearchInitializer(jQuery);
	};

	//Since we're loading jQuery dynamically and are using callbacks, we need to store all of our
	//plugins inside a single function that passes $ aliased from our version of jQuery.
	function containedHawkSearchInitializer($) {
		// BEGIN Namespaced HawkSearch block.

		(function (HawkSearch, $) {
			HawkSearch.loadingtpl = '&middot; &middot; &middot; LOADING <img src="http://manage.hawksearch.com/sites/shared/images/global/hawkloading.gif" style="margin:0 5px;vertical-align:middle;" /> LOADING &middot; &middot; &middot;';
			HawkSearch.loadtimer = null;
			HawkSearch.scroll = false;
			HawkSearch.processing = false;

			HawkSearch.disableAjax = function () {
				return false;
			};

			HawkSearch.jQuery = $;

			HawkSearch.normalizeHeights = function () {
				var container = $("#hawkitemlist");
				var targetElement = container.find(".itemWrapper");

				// use imagesLoaded() plugin to detect if images are fully loaded
				// http://imagesloaded.desandro.com/
				var imgLoad = imagesLoaded(container);

				// Triggered after all images have been either loaded or confirmed broken.
				imgLoad.on("always", function (instance) {
					log("Heights Normalize; No broken images");
					// match heights of specified elements
					container.find(".itemWrapper .itemImage").matchHeights();
					container.find(".itemWrapper .itemTitle").matchHeights();
					targetElement.matchHeights({
						extension: 3
					});
				});

				// Triggered after all images have been loaded with at least one broken image.
				imgLoad.on('fail', function (instance) {
					log("Heights Normalize; Broken image(s)");
				});

				// Triggered after each image has been loaded.
				imgLoad.on("progress", function (instance, image) {
					var result = image.isLoaded ? 'loaded' : 'broken';
					// check if image is broken
					if (result === "broken") {
						// in debug mode log broken image src
						log('Image Broken: ' + image.img.src);
						// change broken image src with spacer.gif and apply broken image class
						image.img.src = "/sites/shared/images/spacer.gif";
						image.img.className = "itemImage hawk-brokenImage";
					};
				});
			};

			HawkSearch.regFacets = function () {
				log("Register Facets");

				// normalize heights across items in results list
				HawkSearch.normalizeHeights();

				// initializes slider configuration for use with price range
				var hawkSliders = $("div.hawk-slideRange").each(function () {
					var container = $(this),
						options = container.data(),
						minRange = options.minRange,
						maxRange = options.maxRange,
						stepSlide = options.stepRange,
						minValueDisplay = container.siblings(".slider-min-value"),
						maxValueDisplay = container.siblings(".slider-max-value");

					var values = $(this).parent().find("input.hawk-sliderRangeInput").val().split(','),
						minValue = parseInt(values[0]),
						maxValue = parseInt(values[1]);

					// set up slider range functionality
					container.slider({
						range: true,
						min: minRange,
						max: maxRange,
						step: stepSlide,
						values: [minValue, maxValue],
						slide: function (event, ui) {
							var start = ui.values[0];
							var end = ui.values[1];
							var type = $(this).parent().find("input:last").val().toLowerCase();
							if (type == 'currency') {
								if (start >= end) return false;
								start = HawkSearch.formatCurrency(start)
								end = HawkSearch.formatCurrency(end)
							}

							minValueDisplay.text(start);
							maxValueDisplay.text(end);

							$(this).parent().find("input.hawk-sliderRangeInput").val(ui.values[0] + ',' + ui.values[1]);
						},
						stop: function (event, ui) {
							// clear the current page
							$("#hdnhawkpg").val("");

							HawkSearch.refreshUrl();
						}
					});

					var hawkSlideHandles = container.children().filter("a");
					hawkSlideHandles.eq(0).addClass("first-handle");
					hawkSlideHandles.eq(1).addClass("second-handle");


				});

				// configures truncated list functionality
				$(".hawk-navTruncateList").each(function () {
					var cont = $(this);
					var listItems = cont.children("li");
					var options = cont.data().options;

					var moreItems = listItems.filter(function (index) {
						return index >= options.cutoff;
					});

					if (moreItems.size() == 0) {
						return;
					}
					// only hide if not already expanded
					if (!window["hawkexpfacet_" + cont.attr("id")])
						moreItems.hide();

					var moreLess = $("<li class='hawk-navMore'><span>" + options.moreText + "</span></li>");
					cont.append(moreLess);
					moreLess.children("span").click(function (event) {
						var moreTrigger = $(this);

						if ($(this).hasClass("hawk-navMoreActive")) {
							moreItems.hide();
							moreTrigger.removeClass("hawk-navMoreActive").text(options.moreText);
							window["hawkexpfacet_" + cont.attr("id")] = null;
						} else {
							moreItems.show();
							moreTrigger.addClass("hawk-navMoreActive").text(options.lessText);
							window["hawkexpfacet_" + cont.attr("id")] = true;
						};
					});

					if (window["hawkexpfacet_" + cont.attr("id")]) cont.find(".hawk-navMore span").click();
				});

				// this handles the mouse hovers and click states for the hawk nav
				$(".hawkRailNav").delegate(".hawk-navGroup li > a", "mouseover mouseout click", function (event) {
					var facetCont = $(this).parent();

					if (event.type == "mouseover") {
						facetCont.addClass("hawkFacet-hover");
					} else if (event.type == "mouseout") {
						facetCont.removeClass("hawkFacet-hover");
					} else if (event.type == "click") {
						event.preventDefault();
						if (facetCont.hasClass("hawkFacet-indetermined")) {
							facetCont.removeClass("hawkFacet-indetermined")
							facetCont.addClass("hawkFacet-active");
							facetCont.find("> ul > li ").removeClass("hawkFacet-active");
						} else {
							facetCont.toggleClass("hawkFacet-active");
						}

						$(facetCont).find(".hawkFacet-active").removeClass("hawkFacet-active");
						$(facetCont).parentsUntil(".hawk-navGroupContent", "ul").each(function () {
							var parentUl = $(this);
							var activeCount = parentUl.find("li.hawkFacet-active").size();
							var allCount = parentUl.find("li").size();
							if (allCount > 0) {
								var closestLi = $(this).closest("li");
								closestLi.removeClass("hawkFacet-active");
								closestLi.addClass("hawkFacet-indetermined");
							}
						});
					};
				});

				// initializes filter quicksearch
				$('.hawk-quickSearch input').each(function () {
					var searchInput = $(this);
					searchInput.filterThatList({
						list: searchInput.parent().next()
					});
				});

				// handles collapsible display on larger screens
				$(".hawk-guidedNavWrapper .hawk-collapsible .hawk-groupHeading").on("click", function () {
					var facetGroup = $(this).closest(".hawk-navGroup");
					var fgHeightBefore = facetGroup.outerHeight();
					facetGroup.toggleClass("hawk-collapsed");
					var fgHeightAfter = facetGroup.outerHeight();
					if ($(".hawk-facetScollingContainer").position().top > 0) {
						var menuHeight = $(".hawk-facetScollingContainer").outerHeight();
						var maxOffset = $(".footer").offset().top;
						var menuOffset = $(".hawk-facetScollingContainer").offset().top;
						if (menuHeight + menuOffset > maxOffset) {
							var offset = $(".hawk-facetScollingContainer").position().top;
							offset = offset - (menuHeight + menuOffset - maxOffset) - 10;
							$(".hawk-facetScollingContainer").css("top", offset + "px");
						}


					}
					var fieldName = facetGroup.attr("data-field");
					var collapsed = false;
					if (facetGroup.hasClass("hawk-collapsed")) {
						collapsed = true;
					}
					$.cookie(fieldName, collapsed, { expires: 365 });
				});

				$(".hawk-guidedNavWrapper .hawk-collapsible").each(function () {
					var fieldName = $(this).attr("data-field");
					var visible = $.cookie(fieldName);
					if (visible == 'true') {
						$(this).addClass("hawk-collapsed");
					} else if (visible == 'false') {
						$(this).removeClass("hawk-collapsed");
					}
				});

				// bind click event to filter heading to hide/show for small devices
				$(".hawk-railNavHeading").on("click", function () {
					var railNavHeading = $(this);
					var hawkNavFilters = railNavHeading.next(".hawkRailNav");
					railNavHeading.toggleClass("hawk-railNavHeadingActive");
					hawkNavFilters.toggleClass("hawk-notCollapsed");
				});

				// bind click event to filter group heading to hide/show for small devices
				$(".hawk-guidedNavWrapper .hawk-navGroup .hawk-groupHeading").on("click", function () {
					var facetGroup = $(this).closest(".hawk-navGroup");
					facetGroup.toggleClass("hawk-notCollapsed");
				});


				$("table.compTbl div.itemWrapper .itemPrice").matchHeights();

				$('#aBug').click(function () {
					if ($('#divSmartBug > ul').children().length > 1) {
						$('#divSmartBugEye').hide();
						$('#divSmartBug').toggle('fast');
						return false;
					}
					return true;
				});

				$('#aEye').click(function () {
					if ($('#divSmartBugEye > ul').children().length > 0) {
						$('#divSmartBug').hide();
						$('#divSmartBugEye').toggle('fast');
						return false;
					}
					return true;
				});

				$(".hawk-nestedfacet .hawkFacet-active").each(function () {
					$(this).children("ul").removeClass("collapse").addClass("in");
					$(this).children(".hawk-collapseState").removeClass("collapsed");

					$(this).parentsUntil(".hawk-navGroup", ".hawk-facetgroup").addClass("in");
					$(this).parentsUntil(".hawk-navGroup", "li").each(function () {
						$(this).children(".hawk-collapseState").removeClass("collapsed");
					});
				});

				$(".hawk-nestedfacet ul >.hawkFacet-active").each(function () {
					var parents = $(this).parentsUntil(".hawk-navGroupContent", "ul").each(function () {
						var parentUl = $(this);
						var activeCount = parentUl.find("li.hawkFacet-active").size();
						var allCount = parentUl.find("li").size();
						if (allCount > 0) {
							var closestLi = $(this).closest("li");
							closestLi.removeClass("hawkFacet-active");
							closestLi.addClass("hawkFacet-indetermined");
						}
					});

				});

				if ($(window).scrollTop() > 0) {
					$('html,body').animate({ scrollTop: 0 }, 500, function () { HawkSearch.scroll = false; HawkSearch.hideBlockUI(); });
				} else {
					HawkSearch.scroll = false; HawkSearch.hideBlockUI();
				}
			};

			HawkSearch.refreshUrl = function (event, forceReload) {
				// BLAIN CUSTOM: Unbind the popstate event
				$(window).unbind('popstate.productlist');
				
				$("#hdnhawkcompare").val(window['hawktocompare'].join(","));

				var qs = "";
				var prevName = "";
				var vals = "";
				var keyword = $("#hdnhawkkeyword").val();
				var prv = $("#hdnhawkprv").val();
				var lp = $("#hdnhawklp").val();
				var adv = $("#hdnhawkadv").val();
				var searchWithin = $("#searchWithin").val();
				var pg = $("#hdnhawkpg").val();
				var mpp = $("#hdnhawkmpp").val();
				var sort = $("#hdnhawksortby").val();
				var it = $("#hdnhawkit").val();
				var items = $("#hdnhawkcompare").val();
				var operator = $("#hdnhawkoperator").val();
				var expand = $("#hdnhawkexpand").val();
				var hawkb = $("#hdnhawkb").val();
				var defaultmpp = $("#hdnhawkdefaultmpp").val();

				if (keyword && keyword !== "") qs += (qs === "" ? "" : "&") + "keyword=" + encodeURIComponent(keyword);
				if (prv && prv !== "") qs += (qs === "" ? "" : "&") + "prv=" + encodeURIComponent(prv);
				if (lp && lp !== "") qs += (qs === "" ? "" : "&") + "lp=" + encodeURIComponent(lp);
				if (adv && adv !== "") qs += (qs === "" ? "" : "&") + "adv=" + encodeURIComponent(adv);
				if (searchWithin && searchWithin !== "") qs += (qs === "" ? "" : "&") + "searchWithin=" + encodeURIComponent(searchWithin);
				if (sort && sort !== "") qs += (qs === "" ? "" : "&") + "sort=" + encodeURIComponent(sort);
				if (it && it !== "") qs += (qs === "" ? "" : "&") + "it=" + encodeURIComponent(it);
				if (items && items !== "") qs += (qs === "" ? "" : "&") + "items=" + encodeURIComponent(items);
				if (operator && operator !== "") qs += (qs === "" ? "" : "&") + "operator=" + encodeURIComponent(operator);
				if (expand && expand !== "") qs += (qs === "" ? "" : "&") + "expand=" + encodeURIComponent(expand);
				if (hawkb && hawkb !== "") qs += (qs === "" ? "" : "&") + "hawkb=" + encodeURIComponent(hawkb);

				$(".hawk-facetFilters:visible li.hawkFacet-active > a").each(function () {
					var options = $(this).data().options;
					if (options.name !== prevName) {
						if (vals !== "") qs += (qs === "" ? "" : "&") + encodeURIComponent(prevName) + '=' + vals;
						vals = "";
					}
					vals += (vals === "" ? "" : ",") + encodeURIComponent(options.value.replace(/,/g, "%c%"));
					prevName = options.name;
				});

				if (prevName !== "" && vals !== "") qs += (qs === "" ? "" : "&") + encodeURIComponent(prevName) + '=' + vals;

				$(".hawk-sliderRangeInput").each(function () {
					if ($(this).val() !== "") {
						var values = $(this).val().split(",");
						if (values.length === 2 && parseFloat(values[0]) >= 0 && parseFloat(values[1])) {
							var sliderRange = $(this).parent().find(".hawk-slideRange");
							var min = sliderRange.data().minRange;
							var max = sliderRange.data().maxRange;

							if (parseFloat(values[0]) !== parseFloat(min) || parseFloat(values[1]) !== parseFloat(max)) {
								qs += (qs === "" ? "" : "&") + encodeURIComponent($(this).attr("name")) + '=' + encodeURIComponent(values[0]) + ',' + encodeURIComponent(values[1]);
							}
						}
					}
				});

				if (mpp && mpp !== "" && mpp !== "64") qs += (qs === "" ? "" : "&") + "mpp=" + encodeURIComponent(mpp);
				if (pg && pg !== "" && pg !== "1") qs += (qs === "" ? "" : "&") + "p=" + encodeURIComponent(pg);

				// cancel refresh if hash is not changed
				if (window.location.hash === "#" + qs) {
					return;
				}

				if (HawkSearch.disableAjax() || forceReload) {
					var url = window.location.toString();
					if (url.indexOf("?") > -1) url = url.substring(0, url.indexOf("?"));
					if (url.indexOf("#") > -1) url = url.substring(0, url.indexOf("#"));
					window.location = url + '?' + qs;
				} else {
					if (window.location.hash !== "" || qs !== "") {
						var scroll = $(document).scrollTop();

						window.location.hash = qs;

						if (qs === "") {
							$(document).scrollTop(scroll);
						}
					}
				}
			};

			HawkSearch.getCustomUrl = function () {
				if ($("#hawkfacets").data('blain-nolpurl') == 1) return '';
				var lpurl = window.location.pathname;
				if (lpurl.indexOf('/preview.aspx') >= 0) {
					lpurl = '';
				}
				if (lpurl.indexOf('/search/') >= 0) {
					lpurl = '';
				}
				if (lpurl.indexOf('/s/') >= 0) {
					lpurl = '';
				}
				return lpurl;
			};
			HawkSearch.IsExplainPopupOpen = false;

			HawkSearch.explain = function (docid) {
				if (HawkSearch.IsExplainPopupOpen) {
					return;
				}

				HawkSearch.IsExplainPopupOpen = true;

				var hash = window.location.search.substring(1);
				if (hash === "" || (window.location.search.substring(1) !== "" && window.location.href.indexOf("#") > -1)) hash = HawkSearch.getHash();

				var lpurl = HawkSearch.getCustomUrl();
				var hawkcustom = $("#hdnhawkcustom").val();
				var full = HawkSearch.BaseUrl + "/?" + hash + "&ajax=1&json=1&docid=" + encodeURIComponent(docid) + (lpurl != '' ? "&lpurl=" + encodeURIComponent(lpurl) : "") + (hawkcustom != '' ? "&hawkcustom=" + encodeURIComponent(hawkcustom) : "");
				// Custom add-on for Blain facets
				full += (window.location.pathname.indexOf('/s/') < 0 && window.location.pathname.indexOf('/sale/') < 0 && window.location.pathname.match(/\/gifts\/(.+)\//) === null) ? '&facet=1' : '';
				alert(full);

				$.ajax({ "type": "GET", "data": "", "async": "false", "contentType": "application/json; charset=utf-8", "url": full, "dataType": "jsonp", "success": HawkSearch.showAjaxPopup });
			};

			HawkSearch.loadMoreLikeThis = function (arg) {
				var url = HawkSearch.BaseUrl + "/ajax.aspx?f=MoreLikeThis&args=" + arg;

				$.ajax({
					"type": "GET",
					"data": "",
					"async": "false",
					"contentType": "application/json; charset=utf-8",
					"url": url,
					"dataType": "jsonp",
					"success": function (data) {
						HawkSearch.bootbox.dialog({
							title: "More Like This",
							message: data.Html,
							buttons: {
								main: {
									label: "Close"
								}
							}
						});
					}
				});
			};

			HawkSearch.showAjaxPopup = function (json) {
				var html = json.html;
				var objs = $(html);

				var obj = objs.find("#hawkexplain");
				if (obj != null && obj.length > 0) $("#divAjaxPopupContent").html(obj.html());
				HawkSearch.bootbox.dialog({
					title: "Item details",
					message: obj.html(),
					buttons: {
						main: {
							label: "Close"
						}
					}
				});

				HawkSearch.IsExplainPopupOpen = false;
			};

			HawkSearch.hideBlockUI = function () {
				if (HawkSearch.processing || HawkSearch.scroll) {
					return;
				}
				$.unblockUI({ "fadeOut": 0 });
			};

			HawkSearch.showBlockUI = function () {
				$.blockUI({ "message": HawkSearch.loadingtpl, "fadeIn": 0, overlayCSS: { backgroundColor: '#fff', opacity: 0.6, cursor: 'wait' }, "css": { "opacity": "0.8", "filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=80)", "backgroundColor": "#fff", "fontSize": "9px", "borderWidth": "0px", "padding": "40px", top: ($(window).height() - 100) / 2 + 'px', left: ($(window).width() - 190) / 2 + 'px', width: '190px' } });
			};

			HawkSearch.refreshResults = function () {
				if ($("#hawkitemlist").length > 0) {
					HawkSearch.processing = true;
					if ($(window).scrollTop() > 0) {
						HawkSearch.scroll = true;
						HawkSearch.showBlockUI();

					} else {
						HawkSearch.loadtimer = setTimeout(function () { HawkSearch.showBlockUI(); }, 500);
					}

					var lpurl = HawkSearch.getCustomUrl();
					var hash = HawkSearch.getHash();
					// Blain Custom: if this is the search page and the hash is empty, stop and do not return the entire catalog
					if (lpurl == "/s/" && hash === "") {
						clearTimeout(HawkSearch.loadtimer);
						HawkSearch.hideBlockUI();
						return;
					}
					var hawkcustom = $("#hdnhawkcustom").val();
					var full = HawkSearch.BaseUrl + "/?" + (hash != '' ? hash + '&' : '') + "ajax=1&json=1" + (lpurl != '' ? "&lpurl=" + encodeURIComponent(lpurl) : "") + (hawkcustom != '' ? "&hawkcustom=" + encodeURIComponent(hawkcustom) : "");
					// Custom add-on for Blain facets
					full += (window.location.pathname.indexOf('/s/') < 0 && window.location.pathname.indexOf('/sale/') < 0 && window.location.pathname.match(/\/gifts\/(.+)\//) === null) ? '&facet=1' : '';
					// notice we use global jQuery to be able to track global events for ajax calls
					// used by miniprofiler and possibly other libraries
					window.jQuery.ajax({ "type": "GET", "data": "", "async": "true", "contentType": "application/json; charset=utf-8", "url": full, "dataType": "jsonp", "success": function (json) { HawkSearch.processFacets(hash, json); } });
				};
			};

			HawkSearch.getUrl = function () {
				var url = window.location.toString();
				if (url.indexOf("?") > -1) url = url.substring(0, url.indexOf("?"));
				if (url.indexOf("#") > -1) url = url.substring(0, url.indexOf("#"));

				return url;
			};
			HawkSearch.getHash = function () {
				var hashSplit = window.location.toString().split("#");
				if (hashSplit.length > 1) return hashSplit[1];
				return window.location.search.substring(1);
			};

			HawkSearch.copyValue = function (objs, name) {
				var obj = objs.find(name);
				if (obj != null && obj.length > 0) $(name).html(obj.html());
			};

			HawkSearch.processFacets = function (hash, json) {
				var html = json.html;
				var location = json.location;
				if (!location == '') {
					window.location.replace(location);
				}

				// update the page contents
				var objs = $(html);
				var obj;
				HawkSearch.copyValue(objs, "#hawktitle");
				HawkSearch.copyValue(objs, "#hawkitemlist");
				HawkSearch.copyValue(objs, "#hawktoptext");
				HawkSearch.copyValue(objs, "#hawkfacets");
				HawkSearch.copyValue(objs, "#hawkbreadcrumb");
				HawkSearch.copyValue(objs, "#hawktoppager");
				HawkSearch.copyValue(objs, "#hawkbottompager");
				HawkSearch.copyValue(objs, "#hawkbannertop");
				HawkSearch.copyValue(objs, "#hawkbannerbottom");
				HawkSearch.copyValue(objs, "#hawkbannerlefttop");
				HawkSearch.copyValue(objs, "#hawkbannerleftbottom");
				HawkSearch.copyValue(objs, "#hawksmartbug");
				// related terms are loaded only first time
				if ($("#hawkrelated").html() == '') {
					HawkSearch.copyValue(objs, "#hawkrelated");
				}


				obj = objs.find("#errormsg");
				if (obj != null && obj.length > 0) alert(obj.html());

				// register facets (sliders, etc)
				HawkSearch.regFacets();

				if ($.isFunction(HawkCompare.reload)) HawkCompare.reload();

				// clear the pager click and the loading timer & unblock the page
				HawkSearch.processing = false;
				clearTimeout(HawkSearch.loadtimer);
				HawkSearch.hideBlockUI();
				if (HawkSearch.GetRecentSearches !== undefined) {
					HawkSearch.GetRecentSearches();
				}

				HawkSearch.BindPreviewInformation();
				HawkSearch.BindFacetTooltip();
				
				// Blain Custom: Fire HawkChanged event
				if (window.jQuery) window.jQuery(document).trigger('hawkchanged');
				else $(document).trigger('hawkchanged');
			};

			HawkSearch.clearAllFacets = function () {
				var keyword = $("#hdnhawkkeyword").val();
				var prv = $("#hdnhawkprv").val();
				var lp = $("#hdnhawklp").val();
				var adv = $("#hdnhawkadv").val();
				var mpp = $("#hdnhawkmpp").val();
				var sort = $("#hdnhawksortby").val();
				var it = $("#hdnhawkit").val();
				var items = $("#hdnhawkcompare").val();
				var operator = $("#hdnhawkoperator").val();
				var expand = $("#hdnhawkexpand").val();
				var hawkb = $("#hdnhawkb").val();
				var defaultmpp = $("#hdnhawkdefaultmpp").val();
				var qs = '';

				if (keyword && keyword !== "") qs += (qs === "" ? "" : "&") + "keyword=" + encodeURIComponent(keyword);
				if (prv && prv !== "") qs += (qs === "" ? "" : "&") + "prv=" + encodeURIComponent(prv);
				if (lp && lp !== "") qs += (qs === "" ? "" : "&") + "lp=" + encodeURIComponent(lp);
				if (adv && adv !== "") qs += (qs === "" ? "" : "&") + "adv=" + encodeURIComponent(adv);
				if (mpp && mpp !== "" && mpp !== defaultmpp) qs += (qs === "" ? "" : "&") + "mpp=" + encodeURIComponent(mpp);
				if (sort && sort !== "") qs += (qs === "" ? "" : "&") + "sort=" + encodeURIComponent(sort);
				if (it && it !== "") qs += (qs === "" ? "" : "&") + "it=" + encodeURIComponent(it);
				if (items && items !== "") qs += (qs === "" ? "" : "&") + "items=" + encodeURIComponent(items);
				if (operator && operator !== "") qs += (qs === "" ? "" : "&") + "operator=" + encodeURIComponent(operator);
				if (expand && expand !== "") qs += (qs === "" ? "" : "&") + "expand=" + encodeURIComponent(expand);
				if (hawkb && hawkb !== "") qs += (qs === "" ? "" : "&") + "hawkb=" + encodeURIComponent(hawkb);

				if (HawkSearch.disableAjax()) {
					var url = window.location.toString();
					if (url.indexOf("?") > -1) url = url.substring(0, url.indexOf("?"));
					if (url.indexOf("#") > -1) url = url.substring(0, url.indexOf("#"));
					window.location = url + '?' + qs;
				} else {
					window.location.hash = qs;
				}
			};

			HawkSearch.getHashOrQueryVariable = function (variable) {
				var query = HawkSearch.getHash();
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0].toLowerCase() == variable.toLowerCase()) {
						return pair[1];
					}
				}
				return HawkSearch.getQueryVariable(window.location.search.substring(1), variable);
			};

			HawkSearch.getQueryVariable = function (url, variable) {
				if (variable === undefined || variable === null) {
					return "";
				}

				var query = url;
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0].toLowerCase() == variable.toLowerCase()) {
						return pair[1];
					}
				}
				return "";
			};

			HawkSearch.getTrackingUrl = function () {
				if (HawkSearch.TrackingUrl === undefined) {
					return HawkSearch.BaseUrl;
				} else {
					return HawkSearch.TrackingUrl;
				}
			};

			HawkSearch.link = function (el, id, i, pk, mlt) {
				if (el.href != null) {
					var full = HawkSearch.getTrackingUrl() + "/link.aspx?stop=1&id=" + escape(id) + "&q=" + escape(el.href).replace(/\+/g, "%2B") + "&i=" + i + "&pk=" + pk + "&mlt=" + mlt;
					$.ajax({
						"type": "GET", "data": "", "dataType": "jsonp", "async": "true", "contentType": "application/json; charset=utf-8", "url": full, "success": function () {
							window.location.href = el.href;
						}
					});
				}
				return false;
			};

			HawkSearch.bannerLink = function (el, id) {
				el.href = HawkSearch.getTrackingUrl() + '/banners.aspx?BannerId=' + id; el.mousedown = '';
				return true;
			};

			HawkSearch.formatCurrency = function (num) {
				num = num.toString().replace(/\$|\,/g, '');
				if (isNaN(num))
					num = "0";
				var sign = (num == (num = Math.abs(num)));
				num = Math.floor(num * 100 + 0.50000000001);
				var cents = num % 100;
				num = Math.floor(num / 100).toString();
				if (cents < 10)
					cents = "0" + cents;
				for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
					num = num.substring(0, num.length - (4 * i + 3)) + ',' +
						num.substring(num.length - (4 * i + 3));
				return (((sign) ? '' : '-') + '$' + num + '.' + cents);
			};

			HawkSearch.GetQueryStringValue = (function (a) {
				if (a == "") return {};
				var b = {};
				for (var i = 0; i < a.length; ++i) {
					var p = a[i].split('=');
					if (p.length != 2) continue;
					b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
				}
				return b;
			})(window.location.search.substr(1).split('&'));


			// HawkSearch Suggest initialize
			HawkSearch.suggestInit = function (queryField, settings) {
				$.fn.hawksearchSuggest = function (settings) {
					settings = $.extend({
						isAutoWidth: false,
						isInstatSearch: false
					}, settings);

					return this.each(function () {
						var suggestQueryField = $(this);
						var opts = optionsHandler(suggestQueryField, settings);
					});

					// configures options and settings for hawk search suggest
					function optionsHandler(suggestQueryField, settings) {
						var suggestQueryFieldNode = suggestQueryField[0];

						// for some reason, Firefox 1.0 doesn't allow us to set autocomplete to off
						// this way, so you should manually set autocomplete="off" in the input tag
						// if you can -- we'll try to set it here in case you forget
						suggestQueryFieldNode.autocomplete = "off";

						suggestQueryField.on("keyup", keypressHandler);

						suggestQueryField.on("focus", function (e) {
							HawkSearch.SuggesterGlobal.focus = true;
							this.value = '';
						});

						if (settings.hiddenDivName) {
							HawkSearch.SuggesterGlobal.divName = settings.hiddenDivName;
						} else {
							HawkSearch.SuggesterGlobal.divName = "querydiv";
						};

						//setTimeout("HawkSearch.suggest.mainLoop()", 100);

						// This is the function that monitors the queryField, and calls the lookup functions when the queryField value changes.
						function suggestLookup(suggestQueryField, settings) {
							var val = suggestQueryField.val();
							if ((HawkSearch.SuggesterGlobal.lastVal != val || HawkSearch.SuggesterGlobal.lastVal != "") && val != 'Enter Keyword' && HawkSearch.SuggesterGlobal.focus && HawkSearch.SuggesterGlobal.searching == false) {

								HawkSearch.SuggesterGlobal.lastVal = val;
								suggestDoRemoteQuery(escape(val));
							}
							//setTimeout("HawkSearch.suggest.mainLoop()", 100);
							return true;
						};

						function suggestDoRemoteQuery(val) {
							HawkSearch.SuggesterGlobal.searching = true;
							var req = settings.lookupUrlPrefix;
							if (Blain.prodStockStatus) req = req + "&stockstatus=1";
							if (!Blain.prodGeofence) req = req + "&storeid=1";
							if (Blain.isMobile) req = req + "&ismobile=1";
							else if (Blain.Stores.localStore.s > 0) req = req + "&storeid=" + Blain.Stores.localStore.s;
							jQuery.ajax({
								type: "GET",
								contentType: "application/json; charset=utf-8",
								url: req + '&q=' + escape(val),
								data: "",
								dataType: "jsonp",
								success: function (autoSuggestResult) {
									showQueryDiv(autoSuggestResult);
									HawkSearch.SuggesterGlobal.searching = false;
								},
								error: function () {
									try { hideSuggest(); } catch (error) { };
									HawkSearch.SuggesterGlobal.searching = false;
								}
							});
						};

						// Get the <DIV> we're using to display the lookup results, and create the <DIV> if it doesn't already exist.
						function getSuggestDiv(divId) {
							if (!HawkSearch.SuggesterGlobal.globalDiv) {
								// if the div doesn't exist on the page already, create it
								if (!document.getElementById(divId)) {
									var newNode = document.createElement("div");
									newNode.setAttribute("id", divId);
									newNode.setAttribute("class", "hawk-searchQuery");
									document.body.appendChild(newNode);
								}

								// set the globalDiv reference
								HawkSearch.SuggesterGlobal.globalDiv = document.getElementById(divId);
								HawkSearch.SuggesterGlobal.queryDiv = $("#" + divId);
							}

							if (suggestQueryField && (suggestQueryField.offset().left != HawkSearch.SuggesterGlobal.storedOffset)) {
								// figure out where the top corner of the div should be, based on the
								// bottom left corner of the input field
								var x = suggestQueryField.offset().left,
									y = suggestQueryField.offset().top + suggestQueryField.outerHeight(),
									fieldID = suggestQueryField.attr("id");

								HawkSearch.SuggesterGlobal.storedOffset = x;

								// add some formatting to the div, if we haven't already
								if (!HawkSearch.SuggesterGlobal.divFormatted) {
									// set positioning and apply identifier class using ID of corresponding search field
									HawkSearch.SuggesterGlobal.queryDiv.removeAttr("style").css({
										"left": x,
										"top": y
									}).attr("class", "hawk-searchQuery hawk-searchQuery-" + fieldID);

									// check to see if 'isAutoWidth' is enabled
									// if enabled apply width based on search field width
									if (settings && settings.isAutoWidth) {
										var queryWidth = suggestQueryField.outerWidth();
										HawkSearch.SuggesterGlobal.queryDiv.css("width", queryWidth);
									}

									//HawkSearch.SuggesterGlobal.divFormatted = true;
								};
							};
							return HawkSearch.SuggesterGlobal.queryDiv;
						};

						function suggestIsAbove() {

							if (settings.isAbove) {
								var queryHeight = HawkSearch.SuggesterGlobal.queryDiv.outerHeight(true);
								var y = suggestQueryField.offset().top - queryHeight;

								HawkSearch.SuggesterGlobal.queryDiv.css({
									"top": y
								});

								if (!HawkSearch.SuggesterGlobal.queryDiv.hasClass("hawk-queryAbove")) {
									HawkSearch.SuggesterGlobal.queryDiv.addClass("hawk-queryAbove");
								}
							};

						};

						// This is the key handler function, for when a user presses the up arrow, down arrow, tab key, or enter key from the input field.
						function keypressHandler(e) {
							var suggestDiv = getSuggestDiv(HawkSearch.SuggesterGlobal.divName),
								divNode = suggestDiv[0];

							// don't do anything if the div is hidden
							if (suggestDiv.is(":hidden")) {
								//return true;
							}

							// make sure we have a valid event variable
							if (!e && window.event) {
								e = window.event;
							}

							var key;
							if (window.event) {
								key = e.keyCode; // IE
							} else {
								key = e.which;
							}

							// if this key isn't one of the ones we care about, just return
							var KEYUP = 38;
							var KEYDOWN = 40;
							var KEYENTER = 13;
							var KEYTAB = 9;

							if ((key != KEYUP) && (key != KEYDOWN) && (key != KEYENTER) && (key != KEYTAB)) {
								suggestLookup(suggestQueryField, settings, e);
								return true;
							};

							// get the span that's currently selected, and perform an appropriate action
							var selectedIndex = getSelectedItem(suggestDiv);
							//var selSpan = HawkSearch.suggest.setSelectedSpan(div, selNum);
							var selectedItem;

							if (key == KEYENTER) {
								if (selectedIndex >= 0) {
									var selectedItem = setSelectedItem(suggestDiv, selectedIndex);
									_selectResult(selectedItem);
									e.cancelBubble = true;
									if (window.event) {
										return false;
									} else {
										e.preventDefault();
									};
								} else {
									hideSuggest();
									return true;
								};
							} else if (key == KEYTAB) {
								if ((selectedIndex + 1) < suggestDiv.find(".hawk-sqItem").length) {
									e.cancelBubble = true;
									e.preventDefault();
									selectedItem = setSelectedItem(suggestDiv, selectedIndex + 1);
								} else {
									hideSuggest()
								};
							} else {
								if (key == KEYUP) {
									selectedItem = setSelectedItem(suggestDiv, selectedIndex - 1);
								} else if (key == KEYDOWN) {
									selectedItem = setSelectedItem(suggestDiv, selectedIndex + 1);
								};
							};


							//showSuggest();
							return true;
						};

						// displays query div and query results
						function showQueryDiv(autoSuggestResult) {
							var suggestDiv = getSuggestDiv(HawkSearch.SuggesterGlobal.divName),
								divNode = suggestDiv[0];

							if (autoSuggestResult == null) {
								return;
							}

							// remove any results that are already there
							while (divNode.childNodes.length > 0)
								divNode.removeChild(divNode.childNodes[0]);

							var categories = autoSuggestResult.Categories;
							var popular = autoSuggestResult.Popular;
							var products = autoSuggestResult.Products;

							showTerms(suggestDiv, popular, autoSuggestResult.PopularHeading);
							showTerms(suggestDiv, categories, autoSuggestResult.CategoryHeading);
							showProducts(suggestDiv, products, autoSuggestResult.Count, autoSuggestResult.ContentCount, autoSuggestResult.SearchWebsiteUrl, autoSuggestResult.ProductHeading);

							showSuggest(categories.length > 0 || popular.length > 0 || products.length > 0);
						};

						// controls the visibility of the result lookup based on the "show" parameter
						function showSuggest(show) {
							var suggestDisplay = getSuggestDiv(HawkSearch.SuggesterGlobal.divName);
							if (show === false) {
								suggestDisplay.hide();
								if (window.jQuery) window.jQuery(document).trigger('hawk.hideautocomplete');
								else $(document).trigger('hawk.hideautocomplete');
								$("body").off("click", hideSuggest);
							} else {
								suggestDisplay.show();
								if (window.jQuery) window.jQuery(document).trigger('hawk.showautocomplete');
								else $(document).trigger('hawk.showautocomplete');
								$("body").on("click", hideSuggest);
							};
						};

						// We originally used showSuggest as the function that was called by the onBlur
						// event of the field, but it turns out that Firefox will pass an event as the first
						// parameter of the function, which would cause the div to always be visible.
						function hideSuggest() {
                            var updatedDisplay = false;
                            if (!updatedDisplay) {
                                showSuggest(false);
                                updatedDisplay = true;
                            };
                        };

						function isEven(num) {
							if (num !== false && num !== true && !isNaN(num)) {
								return num % 2 == 0;
							} else return false;
						};

						function showTerms(suggestDiv, terms, title) {
							if (terms.length >= 1) {
								//suggestDiv.empty();
								suggestDivNode = suggestDiv[0];

								// create and append suggest header to suggest container
								var suggestHeader = document.createElement("div");
								suggestHeader.className = "hawk-sqHeader";
								suggestHeader.innerHTML = title;
								suggestDivNode.appendChild(suggestHeader);

								// set up and append suggest content to suggest container
								var suggestContent = document.createElement("ul");
								suggestContent.className = "hawk-sqContent";
								suggestDivNode.appendChild(suggestContent);

								// loop through suggest options
								var resultItems = "";
								for (var i = 0; i < terms.length; i++) {
									var term = terms[i];
									if (term.Value == null) continue;

									var resultItem = document.createElement("li");

									
									var termUrl = term.Url.replace('/s//', '/s/').replace('www.farmandfleet.com', window.location.hostname);
									if (Blain.isMobile && termUrl.indexOf('/m/') == -1) termUrl = termUrl.replace(window.location.hostname, window.location.hostname + '/m');
									resultItem.setAttribute('data-url', termUrl);
									// check for odd/even alternative styling
									if (isEven(i)) {
										resultItem.className = "hawk-sqItem";
									} else {
										resultItem.className = "hawk-sqItem hawk-sqItemAlt";
									};

									var resultItemContent = document.createElement("h1");
									resultItemContent.className = "hawk-sqItemName";
									resultItemContent.innerHTML = term.Value

									resultItem.appendChild(resultItemContent);

									// append results of suggest options to the suggest content container
									suggestContent.appendChild(resultItem);
								};

								// find all newly added suggest options
								var suggestItems = suggestDiv.find(".hawk-sqContent .hawk-sqItem");

								// pass suggestItems to 'suggestItemHandler' to handle events
								suggestItemHandler(suggestItems);

								// check to see if query div should show above field
								suggestIsAbove();
							};
						};

						function showProducts(suggestDiv, products, count, contentCount, url, title) {
							if (products.length >= 1) {
								//suggestDiv.empty();
								suggestDivNode = suggestDiv[0];

								// create and append suggest header to suggest container
								var suggestHeader = document.createElement("div");
								suggestHeader.className = "hawk-sqHeader";
								suggestHeader.innerHTML = title;
								suggestDivNode.appendChild(suggestHeader);

								// set up and append suggest content to suggest container
								var suggestContent = document.createElement("ul");
								suggestContent.className = "hawk-sqContent";
								suggestDivNode.appendChild(suggestContent);

								// loop through suggest options
								for (var i = 0; i < products.length; i++) {
									var product = products[i];

									var resultItem = document.createElement("li");

									// check for odd/even alternative styling
									if (isEven(i)) {
										resultItem.className = "hawk-sqItem";
									} else {
										resultItem.className = "hawk-sqItem hawk-sqItemAlt";
									};
									
									var productUrl = product.Url.replace('www.farmandfleet.com', window.location.hostname);
									if (Blain.isMobile && productUrl.indexOf('/m/') == -1) productUrl = productUrl.replace(window.location.hostname, window.location.hostname + '/m');
									
									resultItem.setAttribute('data-url', productUrl);
									resultItem.innerHTML = product.Html

									// append results of suggest options to the suggest content container
									suggestContent.appendChild(resultItem);
								};
								// create and append suggest footer to suggest container

								var footerHtml = '<a href="javascript:void(0);" onclick=\'window.location="' + url + '?keyword=' + escape(HawkSearch.SuggesterGlobal.lastVal) + HawkSearch.preserveUrlParams() + '"\'>View All Matches</a>' + (parseInt(count) >= 0 ? '<div style="margin-top:3px;font-size:.85em;">' + count + ' matching ' + ((parseInt(count) > 1) ? 'products' : 'product') + ((contentCount > 0) ? ', ' + contentCount + ' content ' + ((contentCount > 1) ? 'items' : 'item') : '') + '</span>' : '');
								suggestDiv.append('<div class="hawk-sqFooter">' + footerHtml + '</div>');

								// find all newly added suggest options
								var suggestItems = suggestDiv.find(".hawk-sqContent .hawk-sqItem");

								// pass suggestItems to 'suggestItemHandler' to handle events
								suggestItemHandler(suggestItems);

								// check to see if query div should show above field
								suggestIsAbove();
							};
						};

						// sets up events for suggest items
						function suggestItemHandler(suggestItems) {
							// bind mouseenter/mouseleave to suggest options
							// toggles active state on mouseenter
							suggestItems.on("mouseenter mouseleave", function (e) {
								var sqItem = $(e.currentTarget);
								if (e.type === "mouseenter") {
									highlightResult(sqItem);
								} else {
									unhighlightResult(sqItem);
								}
							});

							// bind 'mousedown' event to suggest options to go to url
							// using 'mousedown' instead of 'click' due to 'blur' event blocking the 'click' event from firing
							suggestItems.on("click", function (e) {
								e.preventDefault();
								itemUrl = $(e.currentTarget).data("url");
								window.location = itemUrl;
							});
						};

						// This is called whenever the user clicks one of the lookup results.
						// It puts the value of the result in the queryField and hides the lookup div.
						function selectResult(item) {
							_selectResult(item);
						};
						// This actually fills the field with the selected result and hides the div
						function _selectResult(item) {
							itemUrl = item.data("url");
							window.location = itemUrl;
						};


						// This is called when a user mouses over a lookup result
						function highlightResult(item) {
							$(HawkSearch.SuggesterGlobal.globalDiv).find(".hawk-sqItem").removeClass("hawk-sqActive");
							_highlightResult(item);
						};
						// This actually highlights the selected result
						function _highlightResult(item) {
							if (item == null) return;
							item.addClass("hawk-sqActive");
						};


						// This is called when a user mouses away from a lookup result
						function unhighlightResult(item) {
							_unhighlightResult(item);
						};
						// This actually unhighlights the selected result
						function _unhighlightResult(item) {
							item.removeClass("hawk-sqActive");
						};


						// Get the number of the result that's currently selected/highlighted
						// (the first result is 0, the second is 1, etc.)
						function getSelectedItem(suggestDiv) {
							var count = -1;
							var sqItems = suggestDiv.find(".hawk-sqItem");

							if (sqItems) {
								if (sqItems.filter(".hawk-sqActive").length == 1) {
									count = sqItems.index(sqItems.filter(".hawk-sqActive"));
								};
							}
							return count
						};


						// Select and highlight the result at the given position
						function setSelectedItem(suggestDiv, selectedIndex) {
							var count = -1;
							var selectedItem = null;
							var first = null;
							var sqItems = suggestDiv.find(".hawk-sqItem");

							if (sqItems) {
								for (var i = 0; i < sqItems.length; i++) {
									if (first == null) {
										first = sqItems.eq(i);
									};

									if (++count == selectedIndex) {
										_highlightResult(sqItems.eq(i));
										selectedItem = sqItems.eq(i);
									} else {
										_unhighlightResult(sqItems.eq(i));
									}
								};
							};

							// handle if nothing is select yet to select first
							// or loop through results if at the end/beginning.
							if (selectedItem == null && (selectedIndex < 0)) {
								selectedItem = sqItems.eq(-1);
								_highlightResult(selectedItem);
							} else if (selectedItem == null) {
								selectedItem = first;
								_highlightResult(selectedItem);
							};

							return selectedItem;
						};
					};
				};

				$(queryField).hawksearchSuggest(settings);
			};


			HawkSearch.preserveUrlParams = function () {
				var prv = HawkSearch.GetQueryStringValue["prv"] + '';
				var adv = HawkSearch.GetQueryStringValue["adv"] + '';
				var ret = '';

				if (prv != "undefined" && prv != '') ret += '&prv=' + escape(prv);
				if (adv != "undefined" && adv != '') ret += '&adv=' + escape(adv);

				return ret;
			};


			//Recent Searches

			HawkSearch.clearRelatedSearches = function () {
				$.cookie("recent-searches", "", { expires: -1 });
				$(".hawk-recentSearches .hawk-navGroupContent > ul").empty();
				$(".hawk-recentSearches").hide();
			};

			HawkSearch.GetRecentSearches = function () {
				var recentSearchesStr = $.cookie("recent-searches");
				var recentSearches = [];
				if (recentSearchesStr != null) {
					var rsObjeArr = recentSearchesStr.split(",");
					$(rsObjeArr).each(function () {
						var obj = this.split("|");
						if (obj.length > 1) {
							var srch = {};
							srch.keyword = obj[0];
							srch.count = obj[1];
							recentSearches.push(srch);
						}
					});
				}

				var keyword = HawkSearch.RecentSearchesKeyword;
				var count = HawkSearch.RecentSearchesCount;
				if (keyword !== "" && count > 0) {
					var exists = false;
					for (var i = 0; i < recentSearches.length; i++) {
						if (recentSearches[i].keyword == encodeURIComponent(keyword)) {
							exists = true;
							break;
						}
					}
					if (!exists) {
						var search = new Object();
						search.keyword = encodeURIComponent(keyword);
						search.count = count;
						recentSearches.unshift(search);
					}
				}
				if (recentSearches.length == 0) {
					$(".hawk-recentSearches").hide();
				}
				var maxRecentSearchesCount = HawkSearch.RecentSearchesRecentSearchesCount;
				var numberOrSearches = Math.min(recentSearches.length, maxRecentSearchesCount);
				for (var j = 0; j < numberOrSearches; j++) {
					var k = recentSearches[j].keyword;
					var c = recentSearches[j].count;
					$(".hawk-recentSearches .hawk-navGroupContent > ul").append("<li><a href='" + HawkSearch.RecentSearchesUrl + "?keyword=" + k + "' rel='nofolow'>" + decodeURIComponent(k) + "<span class='count'> (" + c + ")</span></a></li>");
				}

				$(".hawk-recentSearches .hawk-navGroupContent > ul li a").click(function () {
					window.location = $(this).attr("href");
				});
				var tempArray = [];
				$(recentSearches).each(function () {
					tempArray.push(this.keyword + "|" + this.count);
				});
				recentSearchesStr = tempArray.join(",");
				$.cookie("recent-searches", recentSearchesStr, { expires: 365 });
			};


			HawkSearch.getTipPlacementFunction = function (defaultPosition, width, height) {
				return function (tip, element) {
					var position, top, bottom, left, right;

					var $element = $(element);
					var boundTop = $(document).scrollTop();
					var boundLeft = $(document).scrollLeft();
					var boundRight = boundLeft + $(window).width();
					var boundBottom = boundTop + $(window).height();

					var pos = $.extend({}, $element.offset(), {
						width: element.offsetWidth,
						height: element.offsetHeight
					});

					var isWithinBounds = function (elPos) {
						return boundTop < elPos.top && boundLeft < elPos.left && boundRight > (elPos.left + width) && boundBottom > (elPos.top + height);
					};

					var testTop = function () {
						if (top === false) return false;
						top = isWithinBounds({
							top: pos.top - height,
							left: pos.left + pos.width / 2 - width / 2
						});
						return top ? "top" : false;
					};

					var testBottom = function () {
						if (bottom === false) return false;
						bottom = isWithinBounds({
							top: pos.top + pos.height,
							left: pos.left + pos.width / 2 - width / 2
						});
						return bottom ? "bottom" : false;
					};

					var testLeft = function () {
						if (left === false) return false;
						left = isWithinBounds({
							top: pos.top + pos.height / 2 - height / 2,
							left: pos.left - width
						});
						return left ? "left" : false;
					};

					var testRight = function () {
						if (right === false) return false;
						right = isWithinBounds({
							top: pos.top + pos.height / 2 - height / 2,
							left: pos.left + pos.width
						});
						return right ? "right" : false;
					};

					switch (defaultPosition) {
						case "top":
							if (position = testTop()) return position;
						case "bottom":
							if (position = testBottom()) return position;
						case "left":
							if (position = testLeft()) return position;
						case "right":
							if (position = testRight()) return position;
						default:
							if (position = testTop()) return position;
							if (position = testBottom()) return position;
							if (position = testLeft()) return position;
							if (position = testRight()) return position;
							return defaultPosition;
					}
				}
			};

			HawkSearch.PopoverShow = function ($this) {
				$this.addClass("bounded");
				var tip = $this.popover();
				var popover = $(tip).data("popover");
				if ($this.data("tipclass") !== undefined) {
					popover.tip().addClass($this.data("tipclass"));
				}
				tip.on("shown", function (e) {
					$this.mouseleave(function () {
						setTimeout(function () {
							HawkSearch.TipMouseLeave($this);
						}, 250);
					});

					popover.tip().hover(function () {
						$(this).addClass("hover");
					},
					function () {
						$(this).removeClass("hover");
					});

					popover.tip().mouseleave(function () {
						setTimeout(function () {
							HawkSearch.TipMouseLeave($this);
						}, 250);
					});
				});
				tip.data("popover").show();
			}

			HawkSearch.TipMouseLeave = function (that) {
				var tip = that.data("popover").tip();
				if (tip.hasClass("hover")) {
					return;
				} else {
					tip.hide();
					that.removeClass("hover");
				}
			}

			HawkSearch.BindPreviewInformation = function () {
				$(".preview-info").each(function () {
					var content = $(this).parent().find(".preview-info-content").html();
					$(this).popover({
						html: true,
						placement: HawkSearch.getTipPlacementFunction('right', 230, 200),
						content: content
					});
					$(this).mouseover(function () {
						$(this).addClass("hover");
						var $this = $(this);
						if ($this.hasClass("bounded")) {
							var popup = $(this).parent().find(".popover");
							if (!popup.is(":visible")) {
								$this.popover("show");
							}
							return;
						}
						HawkSearch.PopoverShow($(this));
					});
				});
			};

			HawkSearch.BindFacetTooltip = function () {
				$(".hawk-facet-tooltip").each(function () {
					$(this).click(function (e) {
						e.preventDefault();
						e.stopPropagation();
					});
					var content = $(this).parent().find(".hawk-facet-tooltip-content").html();
					$(this).popover({
						html: true,
						placement: 'right',
						content: content,
						container: 'body'
					});
					$(this).mouseover(function () {
						$(this).addClass("hover");
						var $this = $(this);
						if ($this.hasClass("bounded")) {
							var popup = $(this).parent().find(".popover");
							if (!popup.is(":visible")) {
								$this.popover("show");
							}
							return;
						}
						HawkSearch.PopoverShow($(this));
					});
				});
			}


		}(window.HawkSearch = window.HawkSearch || {}, jQuery));


		(function (HawkCompare, $) {
			HawkCompare.process = function () {
				var itemIds = $("#hdnhawkcompare").val();
				if (itemIds === "") return;
				alert('Compare feature is not available on blainsupply site');
				//window.location = HawkSearch.BaseUrl + "/product-comparision?Items=" + ItemIds;
			};

			HawkCompare.addItem = function (itemVal) {
				var index = HawkCompare.countItems();
				window['hawktocompare'][index] = itemVal;
			};

			HawkCompare.getImage = function (itemVal) {
				// sets up query and cache
				var compareQuery = HawkSearch.BaseUrl + "/ajax.aspx?F=GetItemImageToCompare&ItemId=" + itemVal;
				var cacheResp = window[compareQuery];
				// check for cache; process and output ajax query
				if (cacheResp) {
					HawkCompare.addImage(cacheResp.Image);
				} else {
					$.ajax({
						type: "GET",
						contentType: "application/json; charset=utf-8",
						url: compareQuery,
						dataType: 'jsonp',
						data: "",
						async: false,
						success: function (json) {
							window[compareQuery] = json;
							HawkCompare.addImage(json.Image);
						}
					});
				};
			};

			HawkCompare.addImage = function (htmlLi) {
				$(".hawk-compareList>ul").each(function () {
					$(this).find("li").each(function () {
						if ($(this).html() == "" || $(this).html() == "&nbsp;") {
							$(this).html(htmlLi);
							return false;
						}
						return true;
					});
				});
			};

			HawkCompare.countItems = function () {
				return window['hawktocompare'].length;
			};

			HawkCompare.reload = function () {
				$.each(window['hawktocompare'], function (i, value) {
					HawkCompare.getImage(value);
					$("#chkItemCompare" + value).attr("checked", true);
				});
			};

			HawkCompare.removeItem = function (itemVal) {
				$(".hawk-compareList>ul").each(function () {
					var cItem = $(this).find("a#" + itemVal).parent();
					cItem.parent().append("<li>&nbsp;</li>");
					cItem.remove();
				});
				$("#chkItemCompare" + itemVal).attr("checked", false);

				var index = window['hawktocompare'].indexOf(itemVal);
				window['hawktocompare'].splice(index, 1);
			};

		}(window.HawkCompare = window.HawkCompare || {}, jQuery));

		// END Namespaced HawkSearch block.


		window.onhashchange = HawkSearch.refreshResults;

		$(document).ready(function () {
			// initialize auto-suggest
			if (HawkSearch.initAutoSuggest !== undefined) {
				HawkSearch.initAutoSuggest();
			}
			if (!$("#hawkitemlist").length) {
				return;
			}
			// load items to compare
			var items = decodeURIComponent(HawkSearch.getHashOrQueryVariable("items"));
			if (items != "") {
				window['hawktocompare'] = items.split(",");
				if ($.isFunction(window.HawkCompare.reload)) HawkCompare.reload();
			} else {
				window['hawktocompare'] = new Array();
			}

			HawkSearch.regFacets();

			// bind the click event to the anchor tags
			$("#hawkfacets").on("click", ".slider-clear, .hawk-facetFilters a", function (event) {
				// clear the current page
				$("#hdnhawkpg").val("");

				var options = $(this).data().options;
				var ul = $(this).parents("ul.hawk-facetFilters");
				if (ul.hasClass("singlefacet")) {
					ul.find(".hawkFacet-active a").each(function () {
						var opt = $(this).data().options;
						if (options.value !== opt.value) {
							$(this).parent().removeClass("hawkFacet-active");
						}
					});
				}

				if (typeof (options.hash) !== "undefined") {
					if (HawkSearch.disableAjax()) {
						window.location = $(this).attr("href");
					} else {
						window.location.hash = options.hash;
					}
				} else {
					HawkSearch.refreshUrl(event);
				}

				return false;
			});

			if (!HawkSearch.disableAjax()) {
				var newHash = window.location.search.substring(1);
				if (newHash === "" || (window.location.search.substring(1) !== "" && window.location.href.indexOf("#") > -1)) newHash = HawkSearch.getHash();
				if (window.location.search.substring(1) !== newHash) {
					window.location.hash = newHash;

				}
			}

			// hawk pagination
			$("#hawktoppager, #hawkbottompager").on("click", ".hawk-pageLink", function (e) {
				e.preventDefault();
				if ($(this).hasClass("disabled") || $("#hdnhawkpg").val() === $(this).attr("page")) return false;

				$("#hdnhawkpg").val($(this).attr("page"));
				HawkSearch.refreshUrl();
				return false;
			});

			// hawk sorting
			$("#hawktoppager, #hawkbottompager").on("change", ".hawksortby", function (e) {
				// clear the current page
				$("#hdnhawkpg").val("");

				$("#hdnhawksortby").val($(this).val());
				$(".hawksortby").val($(this).val());

				HawkSearch.refreshUrl(e);
				return false;
			});

			// hawk change per page
			$("#hawktoppager, #hawkbottompager").on("change", ".hawkmpp", function (event) {
				// clear the current page
				$("#hdnhawkpg").val("");

				$("#hdnhawkmpp").val($(this).val());
				$(".hawkmpp").val($(this).val());

				HawkSearch.refreshUrl(event);
				return false;
			});

			var hawkmpp = $(".hawkmpp");
			if (hawkmpp.length > 0 && hawkmpp.eq(0).val() !== "" && $("#hdnhawkmpp").val() === "") {
				$("#hdnhawkmpp").val(hawkmpp.eq(0).val());
				hawkmpp.val($("#hdnhawkmpp").val());
			}

			$("#hawkfacets").on("click", ".hawk-selectedGroup a", function (e) {
				e.preventDefault();
				if (HawkSearch.disableAjax()) {
					window.location = $(this).attr("href");
				} else {
					var options = $(this).data().options;
					window.location.hash = options.hash;
				}
				return false;
			});

			$("#hawktoppager, #hawkbottompager").on("click", ".btnCompareItems", function () {
				if (HawkCompare.countItems() < 2) {
					alert('You should select at least 2 items');
					return false;
				} else {
					$("#hdnhawkcompare").val(window['hawktocompare'].join(","));
					HawkCompare.process();
				}
				return true;
			});

			$("#divSmartBug").delegate(".bugLink", "click", function () {
				var url = $(this).attr("href");
				if (url.indexOf("?") > -1) url = url.substring(0, url.indexOf("?"));
				if (url.indexOf("#") > -1) url = url.substring(0, url.indexOf("#"));
				var hash = window.location.search.substring(1);
				if (hash === "" || (window.location.search.substring(1) !== "" && window.location.href.indexOf("#") > -1)) hash = HawkSearch.getHash();
				$(this).attr("href", url + "?smartbug=1&" + hash);
				return true;
			});

			$("#divSmartBugEye").delegate(".bugLink", "click", function () {
				var url = $(this).attr("href");
				if (url.indexOf("?") > -1) url = url.substring(0, url.indexOf("?"));
				if (url.indexOf("#") > -1) url = url.substring(0, url.indexOf("#"));
				var hash = window.location.search.substring(1);
				if (hash === "" || (window.location.search.substring(1) !== "" && window.location.href.indexOf("#") > -1)) hash = HawkSearch.getHash();
				$(this).attr("href", url + "?smartbug=1&" + hash);
				return true;
			});

			$("#divSmartBug").delegate(".bugExplain", "click", function () {
				$("#hdnhawkadv").val($(this).attr("href"));
				HawkSearch.refreshUrl(null, true);
				return false;
			});

			$("#hawkitemlist").on("change", "input.ckbItemCompare", function () {
				if ($(this).is(':checked')) {
					if (HawkCompare.countItems() >= 5) {
						alert('You can compare up to 5 items');
						$(this).attr('checked', false);
						return false;
					} else {
						HawkCompare.getImage($(this).val());
						HawkCompare.addItem($(this).val());
					}
				} else {
					HawkCompare.removeItem($(this).val());
				}
				return true;
			});

			$("#hawkfacets").on("click", ".hawk-resultsSearch:first .hawk-searchWithinButton", function (e) {
				e.preventDefault();
				HawkSearch.refreshUrl();
			});

			//initial load
			if ($("#hawkitemlist").html() == '') {
				HawkSearch.refreshResults();
			}

			if (HawkSearch.GetRecentSearches !== undefined) {
				HawkSearch.GetRecentSearches();
			}

			$(window).on("debouncedresize", function (event) {
				$("#hawkitemlist .itemWrapper").css("min-height", 0);

				HawkSearch.normalizeHeights();
				log("resize");
			});
			HawkSearch.BindPreviewInformation();
			HawkSearch.BindFacetTooltip();
		});

		//lets filter a list
		$.expr[':'].containsNoCase = function (a, i, m) {
			return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};

		$.fn.filterThatList = function (options) {
			// if there are no passed options create an empty options object
			if (options === undefined || options === null) {
				options = {};
			}
			;

			// set up default options
			var defaults = {
				searchTarget: $(this) // the search input
			};

			return this.each(function () {
				// merge passed options with default options to create settings
				var settings = $.extend(defaults, options);

				settings.searchTarget.change(function () {
					// get the value of the input which is used to filter against
					var filter = $(this).val();
					var searchList = settings.list;
					var isNestedFacet = settings.list.hasClass("hawk-nestedfacet");
					//when nested facet prepare flat facet
					if (isNestedFacet) {
						var flatUlId = settings.list.attr("id") + "_flat";
						if ($("#" + flatUlId).size() == 0) {
							var searchList = $(settings.list[0].cloneNode(false));
							searchList.removeClass("hawk-navTruncateList");
							searchList.addClass("hawk-scrollList");
							searchList.attr("id", flatUlId);
							searchList.appendTo(settings.list.parent());

							$(settings.list).find("li").each(function () {
								var pathArr = [];
								$(this).parentsUntil("#" + settings.list.attr("id"), "li").each(function () {
									var text = $($($(this).children("a")).children("span").contents()[0]).text();
									text = text.trim();
									pathArr.unshift(text);
								});

								var li = $("<li>");
								if ($(this).hasClass("hawkFacet-active")) {
									li.addClass("hawkFacet-active");
								}

								li.appendTo(searchList);
								var anchor = $(this).children("a").clone();
								if (pathArr.length > 0) {
									var textSpan = anchor.children("span")
									var spanCount = textSpan.children(".hawk-facetCount").remove()
									pathArr.push(textSpan.text().trim());
									textSpan.html(pathArr.join(" &raquo; "));
									textSpan.append(spanCount);
								}

								anchor.appendTo(li);
							});
							var liHeight = searchList.children("li").first().outerHeight();
							//set search list for max 20 elements
							searchList.css("max-height", (liHeight * 20) + "px");
							settings.list.hide();
						}
						else {
							searchList = $("#" + flatUlId);
							searchList.show();
							settings.list.hide();
						}
					}

					if (filter) {
						// use selected results list from options
						searchList
							// hide items that do not match input filter
							.find("li:not(:containsNoCase(" + filter + "))").hide()
							// show items that match input filter
							.end().find("li:containsNoCase(" + filter + ")").show();
					} else {
						// if nothing is entered display all items in list
						if (isNestedFacet) {
							searchList.hide();
							settings.list.show();
						}
						else {
							settings.list.find("li").show();
						}
					}
				}).keyup(function () {
					//trigger above actions at every keyup
					$(this).change();
				});

			});
		};

		/************************/
		/* Custom Plugins Below */
		/************************/

		/*!
		 * jQuery blockUI plugin
		 * Version 2.66.0-2013.10.09
		 * Requires jQuery v1.7 or later
		 *
		 * Examples at: http://malsup.com/jquery/block/
		 * Copyright (c) 2007-2013 M. Alsup
		 * Dual licensed under the MIT and GPL licenses:
		 * http://www.opensource.org/licenses/mit-license.php
		 * http://www.gnu.org/licenses/gpl.html
		 *
		 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
		 */
		(function () {
			function p(b) {
				function p(c, a) {
					var f, h, e = c == window, g = a && void 0 !== a.message ? a.message : void 0; a = b.extend({}, b.blockUI.defaults, a || {}); if (!a.ignoreIfBlocked || !b(c).data("blockUI.isBlocked")) {
						a.overlayCSS = b.extend({}, b.blockUI.defaults.overlayCSS, a.overlayCSS || {}); f = b.extend({}, b.blockUI.defaults.css, a.css || {}); a.onOverlayClick && (a.overlayCSS.cursor = "pointer"); h = b.extend({}, b.blockUI.defaults.themedCSS, a.themedCSS || {}); g = void 0 === g ? a.message : g; e && l && s(window, { fadeOut: 0 }); if (g && "string" != typeof g &&
						(g.parentNode || g.jquery)) { var k = g.jquery ? g[0] : g, d = {}; b(c).data("blockUI.history", d); d.el = k; d.parent = k.parentNode; d.display = k.style.display; d.position = k.style.position; d.parent && d.parent.removeChild(k) } b(c).data("blockUI.onUnblock", a.onUnblock); var d = a.baseZ, m; m = t || a.forceIframe ? b('<iframe class="blockUI" style="z-index:' + d++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + a.iframeSrc + '"></iframe>') : b('<div class="blockUI" style="display:none"></div>');
						k = a.theme ? b('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + d++ + ';display:none"></div>') : b('<div class="blockUI blockOverlay" style="z-index:' + d++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'); a.theme && e ? (d = '<div class="blockUI ' + a.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (d + 10) + ';display:none;position:fixed">', a.title && (d += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
						(a.title || "&nbsp;") + "</div>"), d += '<div class="ui-widget-content ui-dialog-content"></div></div>') : a.theme ? (d = '<div class="blockUI ' + a.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (d + 10) + ';display:none;position:absolute">', a.title && (d += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (a.title || "&nbsp;") + "</div>"), d += '<div class="ui-widget-content ui-dialog-content"></div>', d += "</div>") : d = e ? '<div class="blockUI ' + a.blockMsgClass + ' blockPage" style="z-index:' +
						(d + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + a.blockMsgClass + ' blockElement" style="z-index:' + (d + 10) + ';display:none;position:absolute"></div>'; d = b(d); g && (a.theme ? (d.css(h), d.addClass("ui-widget-content")) : d.css(f)); a.theme || k.css(a.overlayCSS); k.css("position", e ? "fixed" : "absolute"); (t || a.forceIframe) && m.css("opacity", 0); f = [m, k, d]; var r = e ? b("body") : b(c); b.each(f, function () { this.appendTo(r) }); a.theme && a.draggable && b.fn.draggable && d.draggable({ handle: ".ui-dialog-titlebar", cancel: "li" });
						h = A && (!b.support.boxModel || 0 < b("object,embed", e ? null : c).length); if (v || h) {
							e && a.allowBodyStretch && b.support.boxModel && b("html,body").css("height", "100%"); if ((v || !b.support.boxModel) && !e) { h = parseInt(b.css(c, "borderTopWidth"), 10) || 0; var q = parseInt(b.css(c, "borderLeftWidth"), 10) || 0, w = h ? "(0 - " + h + ")" : 0, x = q ? "(0 - " + q + ")" : 0 } b.each(f, function (b, c) {
								var d = c[0].style; d.position = "absolute"; if (2 > b) e ? d.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" +
								a.quirksmodeOffsetHack + ') + "px"') : d.setExpression("height", 'this.parentNode.offsetHeight + "px"'), e ? d.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : d.setExpression("width", 'this.parentNode.offsetWidth + "px"'), x && d.setExpression("left", x), w && d.setExpression("top", w); else if (a.centerY) e && d.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),
								d.marginTop = 0; else if (!a.centerY && e) { var f = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + (a.css && a.css.top ? parseInt(a.css.top, 10) : 0) + ') + "px"'; d.setExpression("top", f) }
							})
						} g && (a.theme ? d.find(".ui-widget-content").append(g) : d.append(g), (g.jquery || g.nodeType) && b(g).show()); (t || a.forceIframe) && a.showOverlay && m.show(); if (a.fadeIn) f = a.onBlock ? a.onBlock : u, m = a.showOverlay && !g ? f : u, f = g ? f : u, a.showOverlay && k._fadeIn(a.fadeIn, m), g && d._fadeIn(a.fadeIn,
						f); else if (a.showOverlay && k.show(), g && d.show(), a.onBlock) a.onBlock(); y(1, c, a); e ? (l = d[0], n = b(a.focusableElements, l), a.focusInput && setTimeout(z, 20)) : B(d[0], a.centerX, a.centerY); a.timeout && (g = setTimeout(function () { e ? b.unblockUI(a) : b(c).unblock(a) }, a.timeout), b(c).data("blockUI.timeout", g))
					}
				} function s(c, a) {
					var f, h = c == window, e = b(c), g = e.data("blockUI.history"), k = e.data("blockUI.timeout"); k && (clearTimeout(k), e.removeData("blockUI.timeout")); a = b.extend({}, b.blockUI.defaults, a || {}); y(0, c, a); null === a.onUnblock &&
					(a.onUnblock = e.data("blockUI.onUnblock"), e.removeData("blockUI.onUnblock")); var d; d = h ? b("body").children().filter(".blockUI").add("body > .blockUI") : e.find(">.blockUI"); a.cursorReset && (1 < d.length && (d[1].style.cursor = a.cursorReset), 2 < d.length && (d[2].style.cursor = a.cursorReset)); h && (l = n = null); a.fadeOut ? (f = d.length, d.stop().fadeOut(a.fadeOut, function () { 0 === --f && r(d, g, a, c) })) : r(d, g, a, c)
				} function r(c, a, f, h) {
					var e = b(h); if (!e.data("blockUI.isBlocked")) {
						c.each(function (a, b) { this.parentNode && this.parentNode.removeChild(this) });
						a && a.el && (a.el.style.display = a.display, a.el.style.position = a.position, a.parent && a.parent.appendChild(a.el), e.removeData("blockUI.history")); e.data("blockUI.static") && e.css("position", "static"); if ("function" == typeof f.onUnblock) f.onUnblock(h, f); c = b(document.body); a = c.width(); f = c[0].style.width; c.width(a - 1).width(a); c[0].style.width = f
					}
				} function y(c, a, f) {
					var h = a == window; a = b(a); if (c || (!h || l) && (h || a.data("blockUI.isBlocked"))) a.data("blockUI.isBlocked", c), h && f.bindEvents && (!c || f.showOverlay) && (c ? b(document).bind("mousedown mouseup keydown keypress keyup touchstart touchend touchmove",
					f, q) : b(document).unbind("mousedown mouseup keydown keypress keyup touchstart touchend touchmove", q))
				} function q(c) { if ("keydown" === c.type && c.keyCode && 9 == c.keyCode && l && c.data.constrainTabKey) { var a = n, f = c.shiftKey && c.target === a[0]; if (!c.shiftKey && c.target === a[a.length - 1] || f) return setTimeout(function () { z(f) }, 10), !1 } var a = c.data, h = b(c.target); if (h.hasClass("blockOverlay") && a.onOverlayClick) a.onOverlayClick(c); return 0 < h.parents("div." + a.blockMsgClass).length ? !0 : 0 === h.parents().children().filter("div.blockUI").length }
				function z(b) { n && (b = n[!0 === b ? n.length - 1 : 0]) && b.focus() } function B(c, a, f) { var h = c.parentNode, e = c.style, g = (h.offsetWidth - c.offsetWidth) / 2 - (parseInt(b.css(h, "borderLeftWidth"), 10) || 0); c = (h.offsetHeight - c.offsetHeight) / 2 - (parseInt(b.css(h, "borderTopWidth"), 10) || 0); a && (e.left = 0 < g ? g + "px" : "0"); f && (e.top = 0 < c ? c + "px" : "0") } b.fn._fadeIn = b.fn.fadeIn; var u = b.noop || function () { }, t = /MSIE/.test(navigator.userAgent), v = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent), A = b.isFunction(document.createElement("div").style.setExpression);
				b.blockUI = function (b) { p(window, b) }; b.unblockUI = function (b) { s(window, b) }; b.growlUI = function (c, a, f, h) {
					var e = b('<div class="growlUI"></div>'); c && e.append("<h1>" + c + "</h1>"); a && e.append("<h2>" + a + "</h2>"); void 0 === f && (f = 3E3); var g = function (a) { a = a || {}; b.blockUI({ message: e, fadeIn: "undefined" !== typeof a.fadeIn ? a.fadeIn : 700, fadeOut: "undefined" !== typeof a.fadeOut ? a.fadeOut : 1E3, timeout: "undefined" !== typeof a.timeout ? a.timeout : f, centerY: !1, showOverlay: !1, onUnblock: h, css: b.blockUI.defaults.growlCSS }) }; g(); e.css("opacity");
					e.mouseover(function () { g({ fadeIn: 0, timeout: 3E4 }); var a = b(".blockMsg"); a.stop(); a.fadeTo(300, 1) }).mouseout(function () { b(".blockMsg").fadeOut(1E3) })
				}; b.fn.block = function (c) {
					if (this[0] === window) return b.blockUI(c), this; var a = b.extend({}, b.blockUI.defaults, c || {}); this.each(function () { var c = b(this); a.ignoreIfBlocked && c.data("blockUI.isBlocked") || c.unblock({ fadeOut: 0 }) }); return this.each(function () {
						"static" == b.css(this, "position") && (this.style.position = "relative", b(this).data("blockUI.static", !0)); this.style.zoom =
						1; p(this, c)
					})
				}; b.fn.unblock = function (c) { return this[0] === window ? (b.unblockUI(c), this) : this.each(function () { s(this, c) }) }; b.blockUI.version = 2.66; b.blockUI.defaults = {
					message: "<h1>Please wait...</h1>", title: null, draggable: !0, theme: !1, css: { padding: 0, margin: 0, width: "30%", top: "40%", left: "35%", textAlign: "center", color: "#000", border: "3px solid #aaa", backgroundColor: "#fff", cursor: "wait" }, themedCSS: { width: "30%", top: "40%", left: "35%" }, overlayCSS: { backgroundColor: "#000", opacity: 0.6, cursor: "wait" }, cursorReset: "default",
					growlCSS: { width: "350px", top: "10px", left: "", right: "10px", border: "none", padding: "5px", opacity: 0.6, cursor: "default", color: "#fff", backgroundColor: "#000", "-webkit-border-radius": "10px", "-moz-border-radius": "10px", "border-radius": "10px" }, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", forceIframe: !1, baseZ: 1E3, centerX: !0, centerY: !0, allowBodyStretch: !0, bindEvents: !0, constrainTabKey: !0, fadeIn: 200, fadeOut: 400, timeout: 0, showOverlay: !0, focusInput: !0, focusableElements: ":input:enabled:visible",
					onBlock: null, onUnblock: null, onOverlayClick: null, quirksmodeOffsetHack: 4, blockMsgClass: "blockMsg", ignoreIfBlocked: !1
				}; var l = null, n = []
			} "function" === typeof define && define.amd && define.amd.jQuery ? define(["jquery"], p) : p(jQuery)
		})();


		/*
		 * Match Heights jQuery Plugin
		 * 
		 * Version 1.7.2 (Updated 7/31/2013)
		 * Copyright (c) 2010-2013 Mike Avello
		 * Dual licensed under the MIT and GPL licenses:
		 * http://www.opensource.org/licenses/mit-license.php
		 * http://www.gnu.org/licenses/gpl.html
		 *
		 */
		(function (d) { d.fn.matchHeights = function (a) { a = jQuery.extend(this, { minHeight: null, maxHeight: null, extension: 0, overflow: null, includeMargin: !1 }, a); var e = a.extension, b = a.minHeight ? a.minHeight : 0; this.each(function () { b = Math.max(b, d(this).outerHeight()) }); a.maxHeight && b > a.maxHeight && (b = a.maxHeight); return this.each(function () { var c = d(this), f = c.innerHeight() - c.height() + (c.outerHeight(a.includeMargin) - c.innerHeight()); a.overflow ? c.css({ height: b - f + e, overflow: a.overflow }) : c.css({ "min-height": b - f + e }) }) } })(jQuery);


		/*!
		 * imagesLoaded PACKAGED v3.1.4
		 * JavaScript is all like "You images are done yet or what?"
		 * MIT License
		 */
		(function () { function e() { } function t(e, t) { for (var n = e.length; n--;) if (e[n].listener === t) return n; return -1 } function n(e) { return function () { return this[e].apply(this, arguments) } } var i = e.prototype, r = this, o = r.EventEmitter; i.getListeners = function (e) { var t, n, i = this._getEvents(); if ("object" == typeof e) { t = {}; for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]) } else t = i[e] || (i[e] = []); return t }, i.flattenListeners = function (e) { var t, n = []; for (t = 0; e.length > t; t += 1) n.push(e[t].listener); return n }, i.getListenersAsObject = function (e) { var t, n = this.getListeners(e); return n instanceof Array && (t = {}, t[e] = n), t || n }, i.addListener = function (e, n) { var i, r = this.getListenersAsObject(e), o = "object" == typeof n; for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : { listener: n, once: !1 }); return this }, i.on = n("addListener"), i.addOnceListener = function (e, t) { return this.addListener(e, { listener: t, once: !0 }) }, i.once = n("addOnceListener"), i.defineEvent = function (e) { return this.getListeners(e), this }, i.defineEvents = function (e) { for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]); return this }, i.removeListener = function (e, n) { var i, r, o = this.getListenersAsObject(e); for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1)); return this }, i.off = n("removeListener"), i.addListeners = function (e, t) { return this.manipulateListeners(!1, e, t) }, i.removeListeners = function (e, t) { return this.manipulateListeners(!0, e, t) }, i.manipulateListeners = function (e, t, n) { var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners; if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--;) o.call(this, t, n[i]); else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r)); return this }, i.removeEvent = function (e) { var t, n = typeof e, i = this._getEvents(); if ("string" === n) delete i[e]; else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events; return this }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) { var n, i, r, o, s = this.getListenersAsObject(e); for (r in s) if (s.hasOwnProperty(r)) for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener); return this }, i.trigger = n("emitEvent"), i.emit = function (e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, i.setOnceReturnValue = function (e) { return this._onceReturnValue = e, this }, i._getOnceReturnValue = function () { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, i._getEvents = function () { return this._events || (this._events = {}) }, e.noConflict = function () { return r.EventEmitter = o, e }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () { return e }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e }).call(this), function (e) { function t(t) { var n = e.event; return n.target = n.target || n.srcElement || t, n } var n = document.documentElement, i = function () { }; n.addEventListener ? i = function (e, t, n) { e.addEventListener(t, n, !1) } : n.attachEvent && (i = function (e, n, i) { e[n + i] = i.handleEvent ? function () { var n = t(e); i.handleEvent.call(i, n) } : function () { var n = t(e); i.call(e, n) }, e.attachEvent("on" + n, e[n + i]) }); var r = function () { }; n.removeEventListener ? r = function (e, t, n) { e.removeEventListener(t, n, !1) } : n.detachEvent && (r = function (e, t, n) { e.detachEvent("on" + t, e[t + n]); try { delete e[t + n] } catch (i) { e[t + n] = void 0 } }); var o = { bind: i, unbind: r }; "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o }(this), function (e, t) { "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) { return t(e, n, i) }) : "object" == typeof exports ? module.exports = t(e, require("eventEmitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie) }(this, function (e, t, n) { function i(e, t) { for (var n in t) e[n] = t[n]; return e } function r(e) { return "[object Array]" === d.call(e) } function o(e) { var t = []; if (r(e)) t = e; else if ("number" == typeof e.length) for (var n = 0, i = e.length; i > n; n++) t.push(e[n]); else t.push(e); return t } function s(e, t, n) { if (!(this instanceof s)) return new s(e, t); "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred); var r = this; setTimeout(function () { r.check() }) } function c(e) { this.img = e } function f(e) { this.src = e, v[e] = this } var a = e.jQuery, u = e.console, h = u !== void 0, d = Object.prototype.toString; s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () { this.images = []; for (var e = 0, t = this.elements.length; t > e; e++) { var n = this.elements[e]; "IMG" === n.nodeName && this.addImage(n); for (var i = n.querySelectorAll("img"), r = 0, o = i.length; o > r; r++) { var s = i[r]; this.addImage(s) } } }, s.prototype.addImage = function (e) { var t = new c(e); this.images.push(t) }, s.prototype.check = function () { function e(e, r) { return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0 } var t = this, n = 0, i = this.images.length; if (this.hasAnyBroken = !1, !i) return this.complete(), void 0; for (var r = 0; i > r; r++) { var o = this.images[r]; o.on("confirm", e), o.check() } }, s.prototype.progress = function (e) { this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded; var t = this; setTimeout(function () { t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e) }) }, s.prototype.complete = function () { var e = this.hasAnyBroken ? "fail" : "done"; this.isComplete = !0; var t = this; setTimeout(function () { if (t.emit(e, t), t.emit("always", t), t.jqDeferred) { var n = t.hasAnyBroken ? "reject" : "resolve"; t.jqDeferred[n](t) } }) }, a && (a.fn.imagesLoaded = function (e, t) { var n = new s(this, e, t); return n.jqDeferred.promise(a(this)) }), c.prototype = new t, c.prototype.check = function () { var e = v[this.img.src] || new f(this.img.src); if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0; if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0; var t = this; e.on("confirm", function (e, n) { return t.confirm(e.isLoaded, n), !0 }), e.check() }, c.prototype.confirm = function (e, t) { this.isLoaded = e, this.emit("confirm", this, t) }; var v = {}; return f.prototype = new t, f.prototype.check = function () { if (!this.isChecked) { var e = new Image; n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0 } }, f.prototype.handleEvent = function (e) { var t = "on" + e.type; this[t] && this[t](e) }, f.prototype.onload = function (e) { this.confirm(!0, "onload"), this.unbindProxyEvents(e) }, f.prototype.onerror = function (e) { this.confirm(!1, "onerror"), this.unbindProxyEvents(e) }, f.prototype.confirm = function (e, t) { this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t) }, f.prototype.unbindProxyEvents = function (e) { n.unbind(e.target, "load", this), n.unbind(e.target, "error", this) }, s });


		/*
		* jQuery cookie
		*/
		jQuery.cookie = function (name, value, options) {
			if (typeof value != 'undefined') { // name and value given, set cookie
				options = options || {};
				if (value === null) {
					value = '';
					options.expires = -1;
				}
				var expires = '';
				if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
					var date;
					if (typeof options.expires == 'number') {
						date = new Date();
						date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
					} else {
						date = options.expires;
					}
					expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
				}
				// CAUTION: Needed to parenthesize options.path and options.domain
				// in the following expressions, otherwise they evaluate to undefined
				// in the packed version for some reason...
				var path = options.path ? '; path=' + (options.path) : '';
				var domain = options.domain ? '; domain=' + (options.domain) : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
			} else { // only name given, get cookie
				var cookieValue = null;
				if (document.cookie && document.cookie != '') {
					var cookies = document.cookie.split(';');
					for (var i = 0; i < cookies.length; i++) {
						var cookie = $.trim(cookies[i]);
						// Does this cookie string begin with the name we want?
						if (cookie.substring(0, name.length + 1) == (name + '=')) {
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
			}
		};


		// register indexOf() method if browser does not natively support it
		// this algorithm is exactly as specified in ECMA-262 standard, 5th edition, assuming Object, TypeError, Number, Math.floor, Math.abs, and Math.max have their original value.  
		// see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf for more details
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
				"use strict";
				if (this == null) {
					throw new TypeError();
				}
				var t = Object(this);
				var len = t.length >>> 0;
				if (len === 0) {
					return -1;
				}
				var n = 0;
				if (arguments.length > 0) {
					n = Number(arguments[1]);
					if (n != n) { // shortcut for verifying if it's NaN
						n = 0;
					} else if (n != 0 && n != Infinity && n != -Infinity) {
						n = (n > 0 || -1) * Math.floor(Math.abs(n));
					}
				}
				if (n >= len) {
					return -1;
				}
				var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
				for (; k < len; k++) {
					if (k in t && t[k] === searchElement) {
						return k;
					}
				}
				return -1;
			}
		};

		/**
		* Bootstrap.js by @fat & @mdo
		* plugins: bootstrap-modal.js, bootstrap-tooltip.js, bootstrap-popover.js
		* Copyright 2013 Twitter, Inc.
		* http://www.apache.org/licenses/LICENSE-2.0.txt
		*/
		!function (a) { var b = function (b, c) { this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote) }; b.prototype = { constructor: b, toggle: function () { return this[this.isShown ? "hide" : "show"]() }, show: function () { var b = this, c = a.Event("show"); this.$element.trigger(c); if (this.isShown || c.isDefaultPrevented()) return; this.isShown = !0, this.escape(), this.backdrop(function () { var c = a.support.transition && b.$element.hasClass("fade"); b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in").attr("aria-hidden", !1), b.enforceFocus(), c ? b.$element.one(a.support.transition.end, function () { b.$element.focus().trigger("shown") }) : b.$element.focus().trigger("shown") }) }, hide: function (b) { b && b.preventDefault(); var c = this; b = a.Event("hide"), this.$element.trigger(b); if (!this.isShown || b.isDefaultPrevented()) return; this.isShown = !1, this.escape(), a(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), a.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal() }, enforceFocus: function () { var b = this; a(document).on("focusin.modal", function (a) { b.$element[0] !== a.target && !b.$element.has(a.target).length && b.$element.focus() }) }, escape: function () { var a = this; this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (b) { b.which == 27 && a.hide() }) : this.isShown || this.$element.off("keyup.dismiss.modal") }, hideWithTransition: function () { var b = this, c = setTimeout(function () { b.$element.off(a.support.transition.end), b.hideModal() }, 500); this.$element.one(a.support.transition.end, function () { clearTimeout(c), b.hideModal() }) }, hideModal: function () { var a = this; this.$element.hide(), this.backdrop(function () { a.removeBackdrop(), a.$element.trigger("hidden") }) }, removeBackdrop: function () { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, backdrop: function (b) { var c = this, d = this.$element.hasClass("fade") ? "fade" : ""; if (this.isShown && this.options.backdrop) { var e = a.support.transition && d; this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? a.proxy(this.$element[0].focus, this.$element[0]) : a.proxy(this.hide, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"); if (!b) return; e ? this.$backdrop.one(a.support.transition.end, b) : b() } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b) : b()) : b && b() } }; var c = a.fn.modal; a.fn.modal = function (c) { return this.each(function () { var d = a(this), e = d.data("modal"), f = a.extend({}, a.fn.modal.defaults, d.data(), typeof c == "object" && c); e || d.data("modal", e = new b(this, f)), typeof c == "string" ? e[c]() : f.show && e.show() }) }, a.fn.modal.defaults = { backdrop: !0, keyboard: !0, show: !0 }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () { return a.fn.modal = c, this }, a(document).on("click.modal.data-api", '[data-toggle="modal"]', function (b) { var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({ remote: !/#/.test(d) && d }, e.data(), c.data()); b.preventDefault(), e.modal(f).one("hide", function () { c.focus() }) }) }(jQuery), !function (a) { var b = function (a, b) { this.init("tooltip", a, b) }; b.prototype = { constructor: b, init: function (b, c, d) { var e, f, g, h, i; this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, g = this.options.trigger.split(" "); for (i = g.length; i--;) h = g[i], h == "click" ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : h != "manual" && (e = h == "hover" ? "mouseenter" : "focus", f = h == "hover" ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this))); this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle() }, getOptions: function (b) { return b = a.extend({}, a.fn[this.type].defaults, this.$element.data(), b), b.delay && typeof b.delay == "number" && (b.delay = { show: b.delay, hide: b.delay }), b }, enter: function (b) { var c = a.fn[this.type].defaults, d = {}, e; this._options && a.each(this._options, function (a, b) { c[a] != b && (d[a] = b) }, this), e = a(b.currentTarget)[this.type](d).data(this.type); if (!e.options.delay || !e.options.delay.show) return e.show(); clearTimeout(this.timeout), e.hoverState = "in", this.timeout = setTimeout(function () { e.hoverState == "in" && e.show() }, e.options.delay.show) }, leave: function (b) { var c = a(b.currentTarget)[this.type](this._options).data(this.type); this.timeout && clearTimeout(this.timeout); if (!c.options.delay || !c.options.delay.hide) return c.hide(); c.hoverState = "out", this.timeout = setTimeout(function () { c.hoverState == "out" && c.hide() }, c.options.delay.hide) }, show: function () { var b, c, d, e, f, g, h = a.Event("show"); if (this.hasContent() && this.enabled) { this.$element.trigger(h); if (h.isDefaultPrevented()) return; b = this.tip(), this.setContent(), this.options.animation && b.addClass("fade"), f = typeof this.options.placement == "function" ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement, b.detach().css({ top: 0, left: 0, display: "block" }), this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element), c = this.getPosition(), d = b[0].offsetWidth, e = b[0].offsetHeight; switch (f) { case "bottom": g = { top: c.top + c.height, left: c.left + c.width / 2 - d / 2 }; break; case "top": g = { top: c.top - e, left: c.left + c.width / 2 - d / 2 }; break; case "left": g = { top: c.top + c.height / 2 - e / 2, left: c.left - d }; break; case "right": g = { top: c.top + c.height / 2 - e / 2, left: c.left + c.width } } this.applyPlacement(g, f), this.$element.trigger("shown") } }, applyPlacement: function (a, b) { var c = this.tip(), d = c[0].offsetWidth, e = c[0].offsetHeight, f, g, h, i; c.offset(a).addClass(b).addClass("in"), f = c[0].offsetWidth, g = c[0].offsetHeight, b == "top" && g != e && (a.top = a.top + e - g, i = !0), b == "bottom" || b == "top" ? (h = 0, a.left < 0 && (h = a.left * -2, a.left = 0, c.offset(a), f = c[0].offsetWidth, g = c[0].offsetHeight), this.replaceArrow(h - d + f, f, "left")) : this.replaceArrow(g - e, g, "top"), i && c.offset(a) }, replaceArrow: function (a, b, c) { this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "") }, setContent: function () { var a = this.tip(), b = this.getTitle(); a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right") }, hide: function () { function e() { var b = setTimeout(function () { c.off(a.support.transition.end).detach() }, 500); c.one(a.support.transition.end, function () { clearTimeout(b), c.detach() }) } var b = this, c = this.tip(), d = a.Event("hide"); this.$element.trigger(d); if (d.isDefaultPrevented()) return; return c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? e() : c.detach(), this.$element.trigger("hidden"), this }, fixTitle: function () { var a = this.$element; (a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").attr("title", "") }, hasContent: function () { return this.getTitle() }, getPosition: function () { var b = this.$element[0]; return a.extend({}, typeof b.getBoundingClientRect == "function" ? b.getBoundingClientRect() : { width: b.offsetWidth, height: b.offsetHeight }, this.$element.offset()) }, getTitle: function () { var a, b = this.$element, c = this.options; return a = b.attr("data-original-title") || (typeof c.title == "function" ? c.title.call(b[0]) : c.title), a }, tip: function () { return this.$tip = this.$tip || a(this.options.template) }, arrow: function () { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, validate: function () { this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null) }, enable: function () { this.enabled = !0 }, disable: function () { this.enabled = !1 }, toggleEnabled: function () { this.enabled = !this.enabled }, toggle: function (b) { var c = b ? a(b.currentTarget)[this.type](this._options).data(this.type) : this; c.tip().hasClass("in") ? c.hide() : c.show() }, destroy: function () { this.hide().$element.off("." + this.type).removeData(this.type) } }; var c = a.fn.tooltip; a.fn.tooltip = function (c) { return this.each(function () { var d = a(this), e = d.data("tooltip"), f = typeof c == "object" && c; e || d.data("tooltip", e = new b(this, f)), typeof c == "string" && e[c]() }) }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1 }, a.fn.tooltip.noConflict = function () { return a.fn.tooltip = c, this } }(jQuery), !function (e) { "use strict"; var t = function (t, n) { this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle() }; t.prototype = { constructor: t, dimension: function () { var e = this.$element.hasClass("width"); return e ? "width" : "height" }, show: function () { var t, n, r, i; if (this.transitioning || this.$element.hasClass("in")) return; t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in"); if (r && r.length) { i = r.data("collapse"); if (i && i.transitioning) return; r.collapse("hide"), i || r.data("collapse", null) } this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n]) }, hide: function () { var t; if (this.transitioning || !this.$element.hasClass("in")) return; t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0) }, reset: function (e) { var t = this.dimension(); return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this }, transition: function (t, n, r) { var i = this, s = function () { n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r) }; this.$element.trigger(n); if (n.isDefaultPrevented()) return; this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s() }, toggle: function () { this[this.$element.hasClass("in") ? "hide" : "show"]() } }; var n = e.fn.collapse; e.fn.collapse = function (n) { return this.each(function () { var r = e(this), i = r.data("collapse"), s = e.extend({}, e.fn.collapse.defaults, r.data(), typeof n == "object" && n); i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]() }) }, e.fn.collapse.defaults = { toggle: !0 }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function () { return e.fn.collapse = n, this }, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (t) { var n = e(this), r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""), s = e(i).data("collapse") ? "toggle" : n.data(); n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s) }) }(jQuery), !function (a) { var b = function (a, b) { this.init("popover", a, b) }; b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, { constructor: b, setContent: function () { var a = this.tip(), b = this.getTitle(), c = this.getContent(); a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in") }, hasContent: function () { return this.getTitle() || this.getContent() }, getContent: function () { var a, b = this.$element, c = this.options; return a = (typeof c.content == "function" ? c.content.call(b[0]) : c.content) || b.attr("data-content"), a }, tip: function () { return this.$tip || (this.$tip = a(this.options.template)), this.$tip }, destroy: function () { this.hide().$element.off("." + this.type).removeData(this.type) } }); var c = a.fn.popover; a.fn.popover = function (c) { return this.each(function () { var d = a(this), e = d.data("popover"), f = typeof c == "object" && c; e || d.data("popover", e = new b(this, f)), typeof c == "string" && e[c]() }) }, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, { placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), a.fn.popover.noConflict = function () { return a.fn.popover = c, this } }(jQuery)

		/**
		 * bootbox.js v4.2.0
		 *
		 * http://bootboxjs.com/license.txt
		 */
		!function (a, b) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : HawkSearch.bootbox = b(HawkSearch.jQuery) }(this, function a(b, c) { "use strict"; function d(a) { var b = q[o.locale]; return b ? b[a] : q.en[a] } function e(a, c, d) { a.stopPropagation(), a.preventDefault(); var e = b.isFunction(d) && d(a) === !1; e || c.modal("hide") } function f(a) { var b, c = 0; for (b in a) c++; return c } function g(a, c) { var d = 0; b.each(a, function (a, b) { c(a, b, d++) }) } function h(a) { var c, d; if ("object" != typeof a) throw new Error("Please supply an object of options"); if (!a.message) throw new Error("Please specify a message"); return a = b.extend({}, o, a), a.buttons || (a.buttons = {}), a.backdrop = a.backdrop ? "static" : !1, c = a.buttons, d = f(c), g(c, function (a, e, f) { if (b.isFunction(e) && (e = c[a] = { callback: e }), "object" !== b.type(e)) throw new Error("button with key " + a + " must be an object"); e.label || (e.label = a), e.className || (e.className = 2 >= d && f === d - 1 ? "btn-primary" : "btn-default") }), a } function i(a, b) { var c = a.length, d = {}; if (1 > c || c > 2) throw new Error("Invalid argument length"); return 2 === c || "string" == typeof a[0] ? (d[b[0]] = a[0], d[b[1]] = a[1]) : d = a[0], d } function j(a, c, d) { return b.extend(!0, {}, a, i(c, d)) } function k(a, b, c, d) { var e = { className: "bootbox-" + a, buttons: l.apply(null, b) }; return m(j(e, d, c), b) } function l() { for (var a = {}, b = 0, c = arguments.length; c > b; b++) { var e = arguments[b], f = e.toLowerCase(), g = e.toUpperCase(); a[f] = { label: d(g) } } return a } function m(a, b) { var d = {}; return g(b, function (a, b) { d[b] = !0 }), g(a.buttons, function (a) { if (d[a] === c) throw new Error("button key " + a + " is not allowed (options are " + b.join("\n") + ")") }), a } var n = { dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>", header: "<div class='modal-header'><h4 class='modal-title'></h4></div>", footer: "<div class='modal-footer'></div>", closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>", form: "<form class='bootbox-form'></form>", inputs: { text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />", textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>", email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />", select: "<select class='bootbox-input bootbox-input-select form-control'></select>", checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>", date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />", time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />", number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />", password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />" } }, o = { locale: "en", backdrop: !0, animate: !0, className: null, closeButton: !0, show: !0, container: "body" }, p = {}; p.alert = function () { var a; if (a = k("alert", ["ok"], ["message", "callback"], arguments), a.callback && !b.isFunction(a.callback)) throw new Error("alert requires callback property to be a function when provided"); return a.buttons.ok.callback = a.onEscape = function () { return b.isFunction(a.callback) ? a.callback() : !0 }, p.dialog(a) }, p.confirm = function () { var a; if (a = k("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), a.buttons.cancel.callback = a.onEscape = function () { return a.callback(!1) }, a.buttons.confirm.callback = function () { return a.callback(!0) }, !b.isFunction(a.callback)) throw new Error("confirm requires a callback"); return p.dialog(a) }, p.prompt = function () { var a, d, e, f, h, i, k; f = b(n.form), d = { className: "bootbox-prompt", buttons: l("cancel", "confirm"), value: "", inputType: "text" }, a = m(j(d, arguments, ["title", "callback"]), ["cancel", "confirm"]), i = a.show === c ? !0 : a.show; var o = ["date", "time", "number"], q = document.createElement("input"); if (q.setAttribute("type", a.inputType), o[a.inputType] && (a.inputType = q.type), a.message = f, a.buttons.cancel.callback = a.onEscape = function () { return a.callback(null) }, a.buttons.confirm.callback = function () { var c; switch (a.inputType) { case "text": case "textarea": case "email": case "select": case "date": case "time": case "number": case "password": c = h.val(); break; case "checkbox": var d = h.find("input:checked"); c = [], g(d, function (a, d) { c.push(b(d).val()) }) } return a.callback(c) }, a.show = !1, !a.title) throw new Error("prompt requires a title"); if (!b.isFunction(a.callback)) throw new Error("prompt requires a callback"); if (!n.inputs[a.inputType]) throw new Error("invalid prompt type"); switch (h = b(n.inputs[a.inputType]), a.inputType) { case "text": case "textarea": case "email": case "date": case "time": case "number": case "password": h.val(a.value); break; case "select": var r = {}; if (k = a.inputOptions || [], !k.length) throw new Error("prompt with select requires options"); g(k, function (a, d) { var e = h; if (d.value === c || d.text === c) throw new Error("given options in wrong format"); d.group && (r[d.group] || (r[d.group] = b("<optgroup/>").attr("label", d.group)), e = r[d.group]), e.append("<option value='" + d.value + "'>" + d.text + "</option>") }), g(r, function (a, b) { h.append(b) }), h.val(a.value); break; case "checkbox": var s = b.isArray(a.value) ? a.value : [a.value]; if (k = a.inputOptions || [], !k.length) throw new Error("prompt with checkbox requires options"); if (!k[0].value || !k[0].text) throw new Error("given options in wrong format"); h = b("<div/>"), g(k, function (c, d) { var e = b(n.inputs[a.inputType]); e.find("input").attr("value", d.value), e.find("label").append(d.text), g(s, function (a, b) { b === d.value && e.find("input").prop("checked", !0) }), h.append(e) }) } return a.placeholder && h.attr("placeholder", a.placeholder), a.pattern && h.attr("pattern", a.pattern), f.append(h), f.on("submit", function (a) { a.preventDefault(), e.find(".btn-primary").click() }), e = p.dialog(a), e.off("shown.bs.modal"), e.on("shown.bs.modal", function () { h.focus() }), i === !0 && e.modal("show"), e }, p.dialog = function (a) { a = h(a); var c = b(n.dialog), d = c.find(".modal-body"), f = a.buttons, i = "", j = { onEscape: a.onEscape }; if (g(f, function (a, b) { i += "<button data-bb-handler='" + a + "' type='button' class='btn " + b.className + "'>" + b.label + "</button>", j[a] = b.callback }), d.find(".bootbox-body").html(a.message), a.animate === !0 && c.addClass("fade"), a.className && c.addClass(a.className), a.title && d.before(n.header), a.closeButton) { var k = b(n.closeButton); a.title ? c.find(".modal-header").prepend(k) : k.css("margin-top", "-10px").prependTo(d) } return a.title && c.find(".modal-title").html(a.title), i.length && (d.after(n.footer), c.find(".modal-footer").html(i)), c.on("hidden.bs.modal", function (a) { a.target === this && c.remove() }), c.on("shown.bs.modal", function () { c.find(".btn-primary:first").focus() }), c.on("escape.close.bb", function (a) { j.onEscape && e(a, c, j.onEscape) }), c.on("click", ".modal-footer button", function (a) { var d = b(this).data("bb-handler"); e(a, c, j[d]) }), c.on("click", ".bootbox-close-button", function (a) { e(a, c, j.onEscape) }), c.on("keyup", function (a) { 27 === a.which && c.trigger("escape.close.bb") }), b(a.container).append(c), c.modal({ backdrop: a.backdrop, keyboard: !1, show: !1 }), a.show && c.modal("show"), c }, p.setDefaults = function () { var a = {}; 2 === arguments.length ? a[arguments[0]] = arguments[1] : a = arguments[0], b.extend(o, a) }, p.hideAll = function () { b(".bootbox").modal("hide") }; var q = { br: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Sim" }, da: { OK: "OK", CANCEL: "Annuller", CONFIRM: "Accepter" }, de: { OK: "OK", CANCEL: "Abbrechen", CONFIRM: "Akzeptieren" }, en: { OK: "OK", CANCEL: "Cancel", CONFIRM: "OK" }, es: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Aceptar" }, fi: { OK: "OK", CANCEL: "Peruuta", CONFIRM: "OK" }, fr: { OK: "OK", CANCEL: "Annuler", CONFIRM: "D'accord" }, he: { OK: "אישור", CANCEL: "ביטול", CONFIRM: "אישור" }, it: { OK: "OK", CANCEL: "Annulla", CONFIRM: "Conferma" }, lt: { OK: "Gerai", CANCEL: "Atšaukti", CONFIRM: "Patvirtinti" }, lv: { OK: "Labi", CANCEL: "Atcelt", CONFIRM: "Apstiprināt" }, nl: { OK: "OK", CANCEL: "Annuleren", CONFIRM: "Accepteren" }, no: { OK: "OK", CANCEL: "Avbryt", CONFIRM: "OK" }, pl: { OK: "OK", CANCEL: "Anuluj", CONFIRM: "Potwierdź" }, ru: { OK: "OK", CANCEL: "Отмена", CONFIRM: "Применить" }, sv: { OK: "OK", CANCEL: "Avbryt", CONFIRM: "OK" }, tr: { OK: "Tamam", CANCEL: "İptal", CONFIRM: "Onayla" }, zh_CN: { OK: "OK", CANCEL: "取消", CONFIRM: "确认" }, zh_TW: { OK: "OK", CANCEL: "取消", CONFIRM: "確認" } }; return p.init = function (c) { return a(c || b) }, p });

		/*
		 * debouncedresize: special jQuery event that happens once after a window resize
		 *
		 * latest version and complete README available on Github:
		 * https://github.com/louisremi/jquery-smartresize
		 *
		 * Copyright 2012 @louis_remi
		 * Licensed under the MIT license.
		 *
		 * This saved you an hour of work? 
		 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
		 */
		(function ($) {

			var $event = $.event,
				$special,
				resizeTimeout;

			$special = $event.special.debouncedresize = {
				setup: function () {
					$(this).on("resize", $special.handler);
				},
				teardown: function () {
					$(this).off("resize", $special.handler);
				},
				handler: function (event, execAsap) {
					// Save the context
					var context = this,
						args = arguments,
						dispatch = function () {
							// set correct event type
							event.type = "debouncedresize";
							$event.dispatch.apply(context, args);
						};

					if (resizeTimeout) {
						clearTimeout(resizeTimeout);
					}

					execAsap ?
						dispatch() :
						resizeTimeout = setTimeout(dispatch, $special.threshold);
				},
				threshold: 150
			};

		})(jQuery);

	


		// END Plugins
	}

}(window.HawkSearchLoader = window.HawkSearchLoader || {}));