//Event Bridge
var _pageEvents = ["quickLook", "layover", "pageCall", "search", "skincareIQ_quiz"];
var _ajaxEvents = ["slideshowPager", "updateBasket", "addToBasket", "removeFromBasket", "love", "signIn", "register", "promoCode", "carouselArrowClick", "productClickThrough", "leftNav", "megaNav", "prevTrack", "sendData", "anyError", "outofstock", "findInStore", "emailOptIn", "store_search", "errorMessages", "videoPopup", "gridListToggle"];
var _initialPageLoad = true;
_pageEvents.forEach(function(n) {
    jQuery("body").on(n, null, {
        eventName: n,
        eventType: "pageLoadEvent:AJAX"
    }, function(eventObject) {
        _traceEvent(arguments, eventObject.data.eventName, eventObject.data.eventType);
        wa.clearSiteCatalystVariables();
        if (eventObject.data.eventName == "search") {
          if(arguments[1]){ //added this b/c of random search event on the body is firing and I cant find out from where
            _processSearch(arguments[1]);
          } else {
            eventObject.stopPropagation();
            return;//invalid search call
          }
        } else if (eventObject.data.eventName == "pageCall") {
          _handlePageCall(arguments);
        } else if (eventObject.data.eventName == "quickLook") {
          _processQuickLook(arguments);
        }else if (eventObject.data.eventName == "layover") {
          setPrevPageName(wa.pageName);
        }  else if (eventObject.data.eventName == "skincareIQ_quiz") {
          skincareIQ(arguments);
        }
      _allEvents(eventObject.data.eventType);
    });
});
_ajaxEvents.forEach(function(e) {
    jQuery("body").on(e, null, { eventName: e, eventType: "ajaxEvent" },
      function(eventObject) {
        _traceEvent(arguments, eventObject.data.eventName, eventObject.data.eventType);
        wa.clearSiteCatalystVariables();
        if (eventObject.data.eventName == "sendData") {
          _handleSendData(arguments);
        } else if (eventObject.data.eventName == "updateBasket") {
          _handleUpdateBasket(arguments);
        } else {
          _allEvents(eventObject.data.eventType);
        }
      });
});

if (bt_cookie("mode")=="debug") {
    bt_log("BINDING => to window.load");
}
jQuery(window).on("load", null, {
    eventName: "pageLoad",
    eventType: "pageLoadEvent"
}, function(eventObject) {
    if (bt_cookie("mode")=="debug") {
        bt_log("InitialPageLoad => " + _initialPageLoad);
    }
    if (_initialPageLoad) {
        _initialPageLoad = false;
        _traceEvent(arguments, eventObject.data.eventName, eventObject.data.eventType);
        _allEvents(eventObject.data.eventType);
    }
});
jQuery(window).on("pageLoadEvent", function () {
    if (bt_cookie("mode")=="debug") {
        bt_log("----------- pageLoadEvent fired from Manual binding (non-bt) -------");
    }
});
// Temporary addition of listeners for productClickThrough on Basket
/*
jQuery(".basket-item a:not('.basketRemove_Href, .moveToMyList_Href')").on("click", function(eventObject) {
	var pid = jQuery(eventObject.currentTarget).parents("div.basket-item").eq(0).data("productid") || "";
	var args = ["basket", "1", pid];
    _traceEvent(args, "productClickThrough", "productClickThrough");
	_allEvents("productClickThrough", args);
});
*/


// TO DO: RYAN WE NEED TO GET THE PID FOR BOTH CASES, THEN UNCOMMENT THE _ALLEVENTS() CALL
jQuery("#mini-quick-look .left-column a, #mini-quick-look .ql-product-name a").on("click", function(eventObject) {
    var pid = jQuery(eventObject.currentTarget).parents("div.basket-item").eq(0).data("productid") || "";
	var args = ["basket", "1", pid];
    _traceEvent(args, "productClickThrough", "productClickThrough");
	//_allEvents("productClickThrough", args);
});

function skincareIQ(args){
  if(args[1].step == 1){
    wa.pageName = "sephora skincare iq:find by skin concern:step 1:open";
  } else {
    wa.pageName = "sephora skincare iq:find by skin concern:step " + args[1].step + ":" + args[1].stepChoice[1]+ ":" + args[1].pageNames[args[1].step -1];
  }
  setPrevPageName(wa.pageName);
  //_dispatchCustomEvent("skincareIQ_quiz", args);
}

function _processQuickLook(arg){
  var ele = jQuery(arg[1]);
  var pNameField = ele.find(".analytics-data[name='product_name']");
  var pName = pNameField.val() ? pNameField.val().replace("::", " ") : "";
  var prodId = ele.find(".analytics-data[name='prod_id']").val();
  //setPrevPageName(wa.getLocLangPrefix() + "quicklook:" + prodId + ":" + pName);
  wa.prevPageName = wa.getCookie("prevPageName");
}

function setPrevPageName(page){
  wa.prevPageName = wa.getCookie("prevPageName");
  wa.setCookie("prevPageName", page.toLowerCase());
};

function _handleUpdateBasket(arg) {
	var productsNew = arg[1];
	var productsOld = arg[2];
	for (i = 0; i < productsNew.length; i++) {
		if (productsNew[i].quantity > productsOld[i].quantity) {
			_dispatchCustomEvent("addToBasket", [[productsNew[i]], arg[3], arg[4], "update"]);
		} else if (productsNew[i].quantity < productsOld[i].quantity) {
			_dispatchCustomEvent("removeFromBasket", [[productsNew[i]], arg[3], arg[4]]);
		}
	}
}

function _handleSendData(arg) {
	var eventType = "ajaxEvent";
	if (arg[1] == "coloriq") {
    if(arg[2] == "brand" || arg[2]  == "product"){
      wa.setCookie("reverselookup", true, 1);
      wa.pageName = "coloriq:reverselookup:brand:" + wa.getQueryParam("brandId", location.search);
      if(arg[2] == "product"){
        wa.setPageName(wa.pageName + ":" + arg[3].toLowerCase());
      }
      setPrevPageName(wa.pageName);
      _dispatchCustomEvent("reverseLookup", arg);
    } else if (arg[2] == "save") {
      _dispatchCustomEvent("coloriq_save", [arg[3]]);
    } else if (arg[2] == "directLookup"){
      wa.setCookie("directlookup", arg[3], 1);
    }
  } else if (arg[1] == "stores"){

	} else if (arg[1] == "bihq") {
		var _action = arg[2];
		if (jQuery.inArray(_action, ["bag", "purchase", "edit profile"]) >= 0) {
			_dispatchCustomEvent("bihq_signedInClick", arg[2]);
		} else if (jQuery.inArray(_action, ["in", "up"]) >= 0) {
			_dispatchCustomEvent("bihq_signedOutClick", [arg[2], arg[3]]);
		} else if (_action == "tab") {
			_dispatchCustomEvent("bihq_tab", arg[3]);
		} else if (_action == "infoTray") {
			_dispatchCustomEvent("bihq_infoTray", arg[3]);
		}
	} else if (arg[1] == "share loves"){
        _dispatchCustomEvent("share_loves_social", arg[2]);
    }
	_traceEvent(arguments, "sendData");
	_allEvents(eventType);
}

function _handlePageCall(arg) {
	var eventType = "pageLoadEvent:AJAX";
	var eventName = "pageCall";
	// check for checkout section edit buttons
	if (jQuery.inArray(arg[1], ["edit divided shipping summary", "edit divided gift-options summary", "edit divided payment summary", "edit bi-rewards summary", "addNewCreditCard", "addNewShippingAddress"]) >= 0) {
		_dispatchCustomEvent("checkout_sectionEdit", arg[1]);
	}
	_traceEvent(arguments, "pageCall");
	_allEvents(eventType);
}

function _dispatchCustomEvent(name, arg) {
	jQuery(window).trigger(name, arg);
	_traceEvent(arg, name);
}

function _traceEvent(arg, eventName, eventType) {
	if (bt_cookie("mode") == "debug") {
		console.info("EVENT: " + eventName + " [ " + eventType + " ]");
		//try { console.debug(bt_stringify(Array.prototype.slice.call(arguments, 1), null, 2)); } catch(e){} console.dir(arg); console.debug("");
	}
}
function _allEvents(eventType, args) {
	if ( !! args) {
		jQuery(window).trigger(eventType, args);
	} else {
        jQuery(window).trigger(eventType);
	}
    if (bt_cookie("mode") == "debug") { bt_log("triggering: " + eventType); }
}
function _processSearch(response) {
  if(response.noRequest){
    response = wa.search.requestCache[response.tab];
  }

	var searchPageType = "search";
	var searchEvent = true;
	var searchTerm = response.keyword || response.searchTerm;
  var page = "current_page" in response ? response.current_page : "1";
	var path = ["search", "page " + page];
	var refinementMap = [];
  var tab = wa.search ? wa.search.tab : "";

  if(response.products && response.keyword){
    tab = "products";
    path.push(tab);
    wa.search.requestCache.products = response;
  } else if (response.tab){
    tab = response.tab;
    path.push(tab);
    wa.search.requestCache[tab] = response;
  }

  if(response.categories){
	(function findCatPath(cat) {
		if ($.isPlainObject(cat)) {
			if (cat.is_selected) {
				refinementMap.push({
					type: "Category",
					value: cat.name
				});
				return true;
			} else if (cat.sub_categories) {
				if (findCatPath(cat.sub_categories)) {
					refinementMap.push({
						type: "Category",
						value: cat.name
					});
					return true;
				}
			}
			return false;
		} else {
			for (var p = 0; p < cat.length; p++) {
				if (findCatPath(cat[p])) {
					return true;
				}
			}
			return false;
		}
	})(response.categories);
  }
	refinementMap.reverse();
	if (response.brand && response.keyword == undefined) {
		searchEvent = false;
		searchPageType = "brand ";
		searchPageType += response.total_products ? "search" : "content";
		path = ["brand", response.brand.brand_name];
    if (response.brand.buttonMediaId) {
		path.push(response.brand.buttonMediaId);
	  }
  } else if (response.coloriq) {
    searchEvent = false
    wa.cSkinCode = response.shade_code.toLowerCase();
    wa.oSkinCode = !wa.oSkinCode ? wa.cSkinCode : wa.oSkinCode;
    if(wa.getCookie("reverselookup")){
      wa.colorIqLookUp = "reverselookup";
      wa.setCookie("reverselookup", "", 1);
    }
    if(wa.getCookie("directlookup")){
      wa.colorIqLookUp = wa.getCookie("directlookup");
      wa.setCookie("directlookup", "", 1);
    }
    if(wa.colorIqLookUp == "reverselookup"){
      path = wa.getCookie("prevPageName").split(":");
      path = path.length > 5 ? path.slice(0, 5) : path;
      path.push(wa.cSkinCode);
    } else {
      path = ["coloriq", wa.colorIqLookUp, wa.cSkinCode];
    }
	} else if (response.skincare_info) {
    searchEvent = false;
    searchPageType = "skincareiq";
    path = [];
    refinementMap = [];
    $(response.skincare_info.stepChoice).each(function(idx){
      if(response.skincare_info.stepChoice[idx] == undefined){
        path.push("");
      } else {
        path.push(response.skincare_info.stepChoice[idx]);
      }
    });
  } else if (response.categoryId || response.categoryName) {
		searchEvent = false;
		searchPageType = "category ";
		searchPageType += response.total_products ? "search" : "content";
		path = ["category"];
	}
	for (var i = 0; i < refinementMap.length; i++) {
		path.push(refinementMap[i].value);
	}

	if (response.node === undefined && response.total_products && response.brand) {
		if (path.length > 2) {
			delete path[2];
		}
		path.push("view all");
	}

  var ref = [];
  for(n in response){
    if(n.indexOf("ref") > -1 && $.isArray(response[n])){
      ref = ref.concat(response[n]);
    }
  }
	if (ref && ref.length > 0 && response.refinements) {
		var refinements = response.refinements;
		if (Sephora.skinIQ) {
			var skinIQRefs = Sephora.skinIQ.getSkinIQRefs();
			$(skinIQRefs).each(function() {
				if (this.display_name.indexOf("Primary") == -1) {
					refinements.push(this);
				}
			});
			refinementMap.push({
				type: "Primary Concern",
				value: response.primaryConcern
			});
		}
		for (var i = 0; i < ref.length; i++) {
			var selectedRefinmentId = ref[i];
			for (var j = 0; j < response.refinements.length; j++) {
				var refinement = response.refinements[j];
				for (var k = 0; k < refinement.values.length; k++) {
					if (refinement.values[k].value == selectedRefinmentId) {
						refinementMap.push({
							type: refinement.display_name,
							value: refinement.values[k].display_name
						});
						break;
					}
				}
			}
		}
	}
	if ("ph" in response && "pl" in response) {
		refinementMap.push({
			type: "price range",
			value: response.pl + "-" + response.ph
		});
	}
	if (("sortBy" in response) && (parseInt(response.sortBy) !== parseInt(response.defaultSortBy))) {
		refinementMap.push({
			type: "sortBy",
			value: $("select[name='sortBy'] option:selected:first").text()
		});
	}
	if (("pageSize" in response) && (parseInt(response.pageSize) !== parseInt(response.defaultPageSize))) {
		refinementMap.push({
			type: "view",
			value: $("select[name='pageSize'] option:selected:first").text()
		});
	}
	var isRealSearch = document.referrer.indexOf("sephora.com") > -1 && (!!bt_parameter("keyword") || !!bt_parameter("searchTerm")) &&
                      (bt_parameter("topNav") != "true" && bt_parameter("notSearch") != "true");

  var searchTotal = "";
  if(response.total_products){
    searchTotal = response.total_products;
  } else if (response.meta && response.products){
    searchTotal = response.products.total_products;
  }

  wa.setPageName(wa.getLocLangPrefix() + path.join(':'));
  wa.prevPageName = wa.getCookie("prevPageName");
  wa.setCookie("prevPageName", wa.pageName);


  wa.search.isRealSearch= isRealSearch;
  wa.search.isRedirect= !!bt_parameter("searchTerm");
  wa.search.path= path;
  wa.search.pageName= wa.pageName;
  wa.search.pageType= searchPageType;
  wa.search.searchTerm= isRealSearch ? searchTerm : "";
  wa.search.searchEvent= searchEvent;
  wa.search.numberOfResults= isRealSearch ? searchTotal : "";
  wa.search.refinements= refinementMap;
  wa.search.type= "search";
  wa.search.tabs= response.meta && response.meta.tabs ? response.meta.tabs : null;
  wa.search.tab= tab;
  wa.search.page= page;
  wa.search.response= response;
  wa.search.requests++;
}