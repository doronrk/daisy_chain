/*!
 * jQuery Google Analytics Plugin
 * jquery.ga.js
 * http://www.shamasis.net/projects/ga/
 *
 * Copyright (c) 2009 Shamasis Bhattacharya
 * Complies and conforms to all jQuery licensing schemes.
 * http://docs.jquery.com/License
 *
 * Date: 2009-08-23
 * Revision: 13
 */

(function($) {

    /**
     * Contains the various Google Analytics routines.
     *
     * @code
     * $(document).ready(function() {
     *    $.ga.load('UA-0000000-0');
     * });
     *
     *
     * @id jQuery.ga
     * @return Nothing
     * @type undefined
     * @since 1.0
     * @compat=IE6|IE7|IE8|FF1|FF2|FF3|OPERA|SAFARI2|SAFARI3|KONQ
     */
    $.ga = { };

    /**
     * Loads the Google Analytics core tracking scripts (ga.js) and other
     * routines.
     *
     * @code
     * $(document).ready(function() {
     *    $.ga.load('UA-0000000-0');
     * });
     *
     *
     * @param {String} uid Google Anayltics account id that will be used to
     * report analysis. The account it somewhat looks like "UA-0000000-0".
     * 
     * @param {Function} callback
     *
     * @id jQuery.ga.load
     * @return Nothing
     * @type undefined
     * @since 1.0
     * @compat=IE6|IE7|IE8|FF1|FF2|FF3|OPERA|SAFARI2|SAFARI3|KONQ
     */
    $.ga.load = function(uid, callback) {

        var iPhone = "iphone";
        var android = "android";
        var blackberry = "blackberry";

        var userAgent = navigator.userAgent.toLowerCase();

        if(userAgent.indexOf(iPhone) == -1 && userAgent.indexOf(android) == -1 && userAgent.indexOf(blackberry) == -1)
            initDesktopSite(uid, callback);
        else
            initMobileSite(uid, callback);

    }

    var initMobileSite = function(uid, callback){

                console.log("mobile loaded");
             // check whether _gat is undefined
                if (typeof _gat == undefined) {
                    throw "_gat has not been defined";
                }

                // create a new tracker
                t = _gat._getTracker(uid);

                // map all underscore functions of tracker to $.ga
                bind();

                // call the callback function for user to do whatever
                // required.
                if( $.isFunction(callback) ) {
                    callback(t);
                }

                // initialize GATC
                t._trackPageview();
    }

    var initDesktopSite  = function(uid, callback){
         jQuery.ajax({
            type: 'GET',
            url: (document.location.protocol == "https:" ?
                "https://ssl" : "http://www") + '.google-analytics.com/ga.js',
            cache: true,
            success: function() {

                // check whether _gat is undefined
                if (typeof _gat == undefined) {
                    throw "_gat has not been defined";
                }

                // create a new tracker
                t = _gat._getTracker(uid);

                // map all underscore functions of tracker to $.ga
                bind();

                // call the callback function for user to do whatever
                // required.
                if( $.isFunction(callback) ) {
                    callback(t);
                }

                // initialize GATC
                t._trackPageview();
            },
            dataType: 'script',
            data: null
         });
    }


    /**
     *  The pageTracker variable, holding the pageTracker retrieved from _gat
     *  @access: private
     */
    var t;

    /**
     *  Maps all user API of pageTracker to $.ga.* after dropping the
     *  underscore.
     *  @access: private
     */
    var bind = function() {
        
        // check whether tracker exists
        if (noT()) {
            throw "pageTracker has not been defined";
        }

        // for each function of tracker that starts with underscore, map it to
        // $.ga.* after dropping the underscore.
        for(var $1 in t) {
            if($1.charAt(0) != '_') continue;
            $.ga[$1.substr(1)] = t[$1];
        }
    };

    /**
     *  Returns whether pageTracker has been defined or not after the launch of
     *  core GATC logic.
     *  @access: private
     *  @type Boolean
     */
    var noT = function() {
        return t == undefined;
    };


})(jQuery);//================================================================================
// MyMap - LGPL Copyright (c) 2006 Lionel Lask?
//
// This file is part of MyMap.
//
// MyMap is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation; either version 2.1 of the License, or
// (at your option) any later version.
//
// MyMap is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with MyMap; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
//
//================================================================================

var map = null;
var geo = new google.maps.Geocoder();
var infoWindow = null;

var MYMODE_MAP = google.maps.MapTypeId.ROADMAP;
var MYMODE_SATELLITE = google.maps.MapTypeId.SATELLITE;
var MYMODE_MIXTE = google.maps.MapTypeId.HYBRID;

var MYMARKER_TYPE1 = null;
var MYMARKER_TYPE2 = null;
var MYMARKER_SHADOW = null;

function MyMapInitialize(mapname, lat, lng, zoom, mode) {
	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: zoom,
		center: latlng,
		mapTypeId: mode,
		mapTypeControl: true,
		navigationControl: true
	};
	map = new google.maps.Map(document.getElementById(mapname), myOptions);

	geo = new google.maps.Geocoder();

	// Create a single instance of the InfoWindow object which will be shared
	// by all Map objects to display information to the user.
	infoWindow = new google.maps.InfoWindow();

	MYMARKER_SHADOW = new google.maps.MarkerImage('http://www.google.com/intl/en_us/mapfiles/arrowshadow.png',
		new google.maps.Size(37, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(9, 34)
	);

	MYMARKER_TYPE1 = new google.maps.MarkerImage('http://maps.google.com/mapfiles/marker.png',
		new google.maps.Size(20, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(9, 34)
	);

	MYMARKER_TYPE2 = new google.maps.MarkerImage('http://maps.google.com/mapfiles/arrow.png',
		new google.maps.Size(20, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(9, 34)
	);
}

function MyMapTerminate() {
}

function MyMapAddMarker(lat, lng, markertype, info)
{
	var newMarker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		shadow: MYMARKER_SHADOW,
		icon: markertype
	});
	newMarker.setMap(map);

	if (info != null) {
		google.maps.event.addListener(newMarker, 'click', function() {
			MyMapOpenWindow(newMarker, info);
		});
	}

	return newMarker;
}

function MyMapRemoveMarker(marker)
{
	marker.setMap(null);
}

function MyMapOpenWindow(marker, info)
{
	if (info != null) {
		infoWindow.setContent(info);
		infoWindow.open(map, marker);
	}
}

function MyMapGoto(lat, lng) {
	map.panTo(new google.maps.LatLng(lat, lng));
}

function MyMapSetZoom(zoom) {
	map.setZoom(zoom);
}

function MyMapPoint() {
	this.lat = 0;
	this.lng = 0;
}

function MyMapGeocode(address, callback) {
	if (geo == null) {
		geo = new google.maps.Geocoder();
	}
	geo.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var res = new MyMapPoint();
			res.lat = results[0].geometry.location.lat();
			res.lng = results[0].geometry.location.lng();
			callback(res);
		}
		else {
			callback(null);
		}
	});
}



var persistentCartCommands = new Array(10);
persistentCartCommands[0] = '/checkout/universal_cart.jsp';
persistentCartCommands[1] = '/checkout/add_item_pc.cmd';
persistentCartCommands[2] = '/checkout/add_items_pc.cmd';
persistentCartCommands[3] = '/checkout/delete_item_in_cart.cmd';
persistentCartCommands[4] = '/checkout/add_catalog_order_item_pc.cmd';
persistentCartCommands[5] = '/user/add_wishlist_item_to_basket_pc.cmd';
persistentCartCommands[6] = '/user/add_all_wishlist_items_to_basket_pc.cmd';
persistentCartCommands[7] = '/user/instore_pickup_zip_json_pc.jsp';
persistentCartCommands[8] = '/checkout/choose_free_product_item.cmd';
persistentCartCommands[9] = '/checkout/increase_order_item_quantity_in_cart.cmd';

var persistentCartContainerId = "#widget-ucart";
var persistentCartCloseButClass = ".widget-ucart-close-but";
var hideTimeOuts= new Array();

var ucartLoadingHTML = 	'<div id="widget-ucart">' +
				 		'  <div id="glo-ucart-top" class="widget-ie6png"><!--  --></div>' +
				  		'  <div id="glo-ucart-body" class="widget-ie6png">' +
				  		'    <div id="glo-ucart-content">'+
				  		'	   <div class="widget-ima-loader"><img src="/assets/images/common/loading.gif" alt="Loading..." /></div>' +
				  		'    </div>' +
				  		'  </div>' +
				  		'  <div id="glo-ucart-bottom" class="widget-ie6png"><!--  --></div>' +
  				  		'</div>';

var ucartSimpleHTML = 	'<div id="widget-ucart"></div>';

var persistentCartIsShowing = false;


/* Function(s) to Show the Basket Layer */
function showBasket(action,params,refreshPage,refreshDelayTime) {
	if( (action == "show") || (action == "showFromQuickview") || action == "mergeSuccess" || action == "mergeFailed" )
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[0]; }
	else if(action == "addProduct")
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[1];}
	else if(action == "addEnsemble")
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[2];}
	else if(action == "remove")
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[3];}
	else if(action == "addCatalogItems")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[4];}
	else if(action == "addProductWishlist")
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[5];}
	else if(action == "addAllProductsWishlist")
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[6];}
    else if(action == "addFreeGift")
	{ hideloading(ucartLoadingHTML); requestURL = persistentCartCommands[8];}
    else if(action == "addOneMoreItem")
        { showloading(ucartLoadingHTML); requestURL = persistentCartCommands[9];}

    else
	{ alert("missing action"); }

	requestURL = requestURL;
	params = "ts=" + timestamp() + "&action=" + action + "&" + params;

	$.ajax({
		type: "POST",
		url: requestURL,
		data: params,
		dataType: "html",
      	timeout: 15000,
		success: function(data) {

			hideloading();
			$(persistentCartContainerId).append(data);
			$(persistentCartContainerId).show();
			if (refreshPage != undefined && refreshPage) {
            	if ((action == "mergeSuccess" || action == "mergeFailed")) {
                    var newURL = requestUtil.removeParams(window.location.search, 'merged');
                    setTimeout( function() { location.href = newURL; }, refreshDelayTime != undefined? refreshDelayTime : 0);
                } else {
                    setTimeout( function() { location.reload(true); }, refreshDelayTime != undefined? refreshDelayTime : 0);
                }
         	}
         	persistentCartIsShowing = true;
			if($('.hopupContainer').find('.quicklook-miniproduct').length){
				binder.hopup.close()
			}
			return true;
		},
		error: function() {
			hideloading();
			return false;
		}
	});
};

function showloading(htmlToShow) {
	$(persistentCartContainerId).remove();

	//load, position, show new cart
	$("body").append(htmlToShow);
	positionpersistentCart();
	$(persistentCartContainerId).show();

	// add an event for close layer.
	//$(persistentCartCloseButClass).click(function() { hideBasket(); });
};

function hideloading() {
	$(persistentCartContainerId + " *").remove();
	$(persistentCartContainerId).html("");
};

function addFreeGiftToCart(form) {
 	if (window.setTheVariant) { setTheVariant(); }
 	showBasket('addFreeGift', $(form).serialize(),true,0 );
};


//edit this function to position cart.
function positionpersistentCart() {
	
	//var newLeft = 10 + ($("body").width() / 2) + ( $(".page_wrap").width() / 2 ) - $(persistentCartContainerId).width();
	var LayerRight = ($('body').width() - $('#header-main').width()) / 2;

	$('li#shoppingBag').addClass('active').siblings('.headerDelim').addClass('noBorderColor');
	
	if($("#header-main.collapsed").length > 0 && $("#headerTopRight").length > 0){	
		if($("#searchShowHide").length > 0){
		 	var searchButtonWidth = parseInt($("#searchShowHide").css('width'));
			LayerRight = LayerRight + searchButtonWidth +12;
		}
			
	}
	$(persistentCartContainerId).css({ "right": ((LayerRight) + 'px')});
	
};

 //edit this function to update the setup
function setupPersistentCartButtons() {
	// draw focus near this
	//window.location = "#";

	$(persistentCartCloseButClass).unbind("click").click(function() {
		hideBasket();
	});
	$(persistentCartCloseButClass).attr("href","javascript:void(0)");
	clearAllTimeouts();
};

//Edit this function if need to do something special on basket close.
function hideBasket() {
	$('li#shoppingBag').removeClass('active').siblings('.headerDelim').removeClass('noBorderColor');
	$(persistentCartContainerId).hide().remove();
	//$(persistentCartContainerId).remove();

	shoppingBagBut = $("#widget-header-active-link").eq(0);
	$(shoppingBagBut).attr("id","").mouseout();
	//$(shoppingBagBut).mouseout();

	persistentCartIsShowing = false;
};

function isShowingBasket() {
	return persistentCartIsShowing;
}

function updateHeader(amt) {
	if(amt == 1)
	{ $("#widget-ucart-item-count").text(amt + " item(s)"); }
	else
	{ $("#widget-ucart-item-count").text(amt + " item(s)");}
};


function addToCartFormValid(type,params,colorValue,sizeValue,variantID,checkoutPage){
    var numVariants = $("select.variant").length;

    var isColorValid = (colorValue == "") ? false:true;
    var isSizeValid = (sizeValue == "") ? false:true;
    //var isWidthValid = ((widthValue == "")&& (numVariants == 3)) ? false:true;
    var isVariantID =  (variantID == "") ? false:true;

    if(!isColorValid || !isSizeValid || (!isColorValid && !isSizeValid)){
        $("#error-page-notification").css("display","block");
    }

    if(!isColorValid){

        $(".variantError_COLOR_NAME").css("display","block");
    }
    if(!isSizeValid){

        $(".variantError_SIZE_NAME").css("display","block");
        //$(".variant.SIZE_NAME").addClass("error");
        //$(".variant.SIZE_NAME").parent().css('border-color','#CC092F');
        $(".VariantDropdown.SIZE_NAME").addClass("error");
    }

    if(!isVariantID){
        $(".variantError_SIZE_NAME").css("display","block");
        //$(".variant.SIZE_NAME").addClass("error");
        //$(".variant.SIZE_NAME").parent().css('border-color','#CC092F');
        $(".VariantDropdown.SIZE_NAME").addClass("error");
    }

    if(isColorValid && isSizeValid && isVariantID && !checkoutPage){
         showBasket(type,params);
         $(".variantError_SIZE_NAME").css("display","none");
         //$(".variant.SIZE_NAME").removeClass("error");
         //$(".variant.SIZE_NAME").parent().css('border-color','#CCCCCC');
         $(".VariantDropdown.SIZE_NAME").remove("error");
    }

    if(checkoutPage && isVariantID){

        //On Chekout page update cart in Edit layer will call below function from checkout.js file to update order-summary.
        services.saveEditItem('/checkout/update_item_in_order_ajax.cmd?forceRefresh=true',params);
    }

}

function addToCart(prefix, container, productId,checkoutPage) {
	var scope = $(prefix);
	if (container)
		scope = $(container).parents(prefix);

	var productVariantId = $("input[name=productVariantId]", scope).val();
	if (productVariantId == null || productVariantId == undefined)
		productVariantId = $("input[name=productVariantId2]", scope).val();

    var colorSelectedValue ="";
    var sizeSelectedValue = "";
    var widthSelectedValue="";
    var quantity="";
    if('.quicklook-miniproduct'==prefix){
        colorSelectedValue = $("#COLOR_NAME"+productId, scope).val();

        sizeSelectedValue = $("#SIZE_NAME"+productId, scope).val();

        //widthSelectedValue= $("#WIDTH_NAME"+productId, scope).val();

        quantity=1;

    }else{
        colorSelectedValue = $("input[name=colorSelectedValue]", scope).val();

        sizeSelectedValue = $("input[name=sizeSelectedValue]", scope).val();

		//widthSelectedValue= $("input[name=widthSelectedValue]", scope).val();

        quantity=1;

    }

	//var colorSelectedValue = $("input[name=colorSelectedValue]", scope).val();
	if (colorSelectedValue == null || colorSelectedValue == undefined) {
		colorSelectedValue = "";
	}

	//var sizeSelectedValue = $("input[name=sizeSelectedValue]", scope).val();
	if (sizeSelectedValue == null || sizeSelectedValue == undefined) {
		sizeSelectedValue = "";
	}

	params =  "productName=" + $("input[name=productName]", scope).val() +
			  "&productId=" + $("input[name=productId]", scope).val() +
   	 		  "&categoryId=" + $("input[name=categoryId]", scope).val() +
   	 		  "&parentCategoryId=" + $("input[name=parentCategoryId]", scope).val() +
   	 		  "&subCategoryId=" + $("input[name=subCategoryId]", scope).val() +
   	 		  "&quantity=" + quantity +
   	 		  "&productVariantId=" + productVariantId +
   			  "&colorSelectedValue=" + colorSelectedValue +
   			  "&relationType=" + $("input[name=relationType]", scope).val() +
   			  "&callbackBaseURL=" + $("input[name=callbackBaseURL]", scope).val() +
   			  "&sizeSelectedValue=" + sizeSelectedValue +
   			  "&scene7ImageUrl=" + $("input[name=scene7ImageUrl]", scope).val();

	//see if this is an update.
  	if( $("input[name=itemGUID]", scope).size() > 0 )
  	{ params = params + "&itemGUID=" + $("input[name=itemGUID]", scope).val() + "&isUpdate=1"; }

	if( $("input[name=onBasketPage]", scope).size() > 0 )
  		{ params = params + "&onBasketPage=" + $("input[name=onBasketPage]", scope).val(); }

	if (prefix != undefined)
		params = params + "&prefix=" + prefix;

	persistentCartIsShowing = false;
    addToCartFormValid('addProduct',params,colorSelectedValue,sizeSelectedValue,productVariantId,checkoutPage);
  	//showBasket('addProduct',params);
};

function wishListAddToCart(params,refreshPage,refreshDelayTime) {
	showBasket('addProductWishlist',params,refreshPage,refreshDelayTime);
};

function wishListAddAllToCart(params,refreshPage,refreshDelayTime) {
	showBasket('addAllProductsWishlist',params,refreshPage,refreshDelayTime);
};

function addCatalogOrderItemsToCart() {
    params = "productId=" + $("input[name=productId]").val() +
  		     "&itemNumber=" + $("input[name=itemNumber]").val() +
  			 "&productName=" + $("input[name=productName]").val() +
  			 "&productVariantId=" + $("input[name=productVariantId]").val() +
  			 "&quantity="+1+
             "&colorSelectedValue=" + $("input[name=colorSelectedValue]").val() +
  			 "&sizeSelectedValue=" + $("input[name=sizeSelectedValue]").val();
    showBasket('addCatalogItems',params);
};

function addEnsembleToCart(type) {
	params =  "productName=" + $("input[name=productName]").val() +
			  "&ensembleId=" + $("input[name=ensembleId]").val() +
			  "&categoryId=" + $("input[name=categoryId]").val() +
			  "&relationType=" + $("input[name=relationType]").val() +
   	 		  "&parentCategoryId=" + $("input[name=parentCategoryId]").val()+
            "&productToBeAdded=" + $("input[name=productToBeAdded]").val() ;

	// iterate through products in the ensemble for variant id
	$(".the-variant-ids").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

	$(".the-variant-colors").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

	$(".the-variant-sizes").each(function() {
        params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

    $(".the-variant-widths").each(function() {
        params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

    $(".the-ensemble-products").each(function() {
        params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

	// iterate through products for qty
	$(".the-variant-qtys").each(function() {
		if( type == 'all' )
		{
		  $(this).val("1");
		  params = params + "&" + $(this).attr("name") + "=1";
		}
		else
		{ params = params + "&" + $(this).attr("name") + "=" + $(this).val(); }
	});

	// iterate through products variant count
	$(".the-variant-count").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

	params = params + "&productCount=" + $(".the-variant-ids").length;

	persistentCartIsShowing = false;
	showBasket('addEnsemble',params);
};

function setUserZipCodePC(refresh)  {
    var params = "ts=" + timestamp() + "&action=updateUserZipCode" +
                 "&storesListZipCode=" +  $("input[name=storesListZipCodePC]").val() +
                 "&storesListLatitude=" +  $("input[name=storesListLatitudePC]").val() +
                 "&storesListLongitude=" +  $("input[name=storesListLongitudePC]").val();
    var requestURL = persistentCartCommands[7];

    $.ajax({
		type: "GET",
		url: requestURL,
		data: params,
		dataType: "json",
      	timeout: 15000,
		success: function(data) {
			if(data.validZip){
    			if (refresh) {
					showBasket('show', '');
				}
				return true;
			}else{
				alert(data.result);
				return false;
			}
		},
		error: function() {
			alert('There was an error trying to save your zip code.');
			return false;
		}
	});

}

// Edit this per site to adjust location
function adjustDivLocation(divToAdjust) {
	var bWindowOffsets = getScrollXY();
	var bWindowViewport = getViewportSize();
	var qvTop = ((bWindowViewport[1] / 2) - ($(divToAdjust).height() / 2)) + bWindowOffsets[1];
	qvTop = (qvTop < 0) ? 100 : qvTop;
	$(divToAdjust).css("top",qvTop+"px");
	$(divToAdjust).css("left","50%");
	$(divToAdjust).css("margin-left",-($(divToAdjust).width()/2));
};

// Helper Function(s)
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

function getViewportSize() {
  var vpW = 0, vpH = 0;
  if (typeof window.innerWidth != 'undefined')
  {
    vpW = window.innerWidth,
    vpH = window.innerHeight;
  }
  else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
  {
    vpW = document.documentElement.clientWidth,
    vpH = document.documentElement.clientHeight;
  }
  else
  {
    vpW = document.getElementsByTagName('body')[0].clientWidth,
    vpH = document.getElementsByTagName('body')[0].clientHeight;
  }
  return [  vpW, vpH ];
}

function errorAppend(area,msg) {
	$(area).html(msg.replace(/&amp;/g, "&").replace(/&lt;/g,
        "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'"));
	$(area).show();
	initPageHeight();
};

function resetErrorFields() {
	$(".glo-tex-error").hide();
	$(".glo-tex-error").html("");
   initPageHeight();
};

function messageAppend(area,msg) {
	$(area).html(msg);
	$(area).show();
	initPageHeight();
};

function resetMessageFields() {
	$(".glo-tex-info").hide();
	initPageHeight();
};

function clearAllTimeouts() {
	for(x = 0; x < hideTimeOuts.length; x++)
	{ clearTimeout(hideTimeOuts[x]); }
};

function timestamp() {
	return new Date().getTime();
}

function loadQuickView(overlayURL)
{
	if (typeof $("#overlay_wrap").Overlay != "undefined")
		$("#overlay_wrap").Overlay.show("#overlay_wrap", null, { sourceURL : "" + overlayURL });
}

function hideQuickView()
{
	var oWrap = $("#overlay_wrap")
	if (oWrap.length && typeof $oWrap.Overlay != "undefined") { $oWrap.Overlay.hide();}
}

function loadOverlay(overlay, overlayURL)
{
	if (typeof $("#overlay_wrap").Overlay != "undefined")
		$("#overlay_wrap").Overlay.show(overlay, null, { sourceURL : overlayURL });
}
//cr-zoomviewer
if(typeof(crZoomViewer) == "undefined"){
	crZoomViewer = function(){
		this.init = function(selector, global,height,width){
			this.mainImgElm = document.getElementById("js_mainImage");
			if(!this.mainImgElm) return;
			var now = (new Date).getTime()
			this.mainImgElm.id =  "js_mainImage_"+now;

			var mainDiv = document.getElementById("js_zoomOverlay");
			mainDiv.id =  "js_zoomOverlay_"+now;

			this.scope = $(selector) ;
			this.scope.id += "_"+now
			var mainImg = this.mainImgElm;
			var mainImgAttrs = zoomUtils.filenameParser(mainImg.src);
			this.scene7Initialize(mainImgAttrs, mainDiv.id, height, width);
			this.scene7Events();
		},
		this.scene7ImageUpdate = function(me, elm){
			$(this.scope).find("#altImagesWrapper li").attr("class","");
			if(me !== undefined || me !=null){
				var imageURL = $(me).find("img").attr("src");
				$(me).addClass("active");
			}else{
				var imageURL = $(this.scope).find("#altImagesWrapper li").eq(0).find("img").attr("src");
				$(this.scope).find("#altImagesWrapper li").eq(0).addClass("active");
			}
			var imageAttrs = zoomUtils.filenameParser(imageURL);
			var newProps = {'fileName': imageAttrs.fileName};
			//Update the mainImage.
			var mainSrc = elm.src;
			this.mainImgElm.src =  zoomUtils.filenameReplace(mainSrc, newProps);
			//$(".js_mainImage").attr("src", zoomUtils.filenameReplace(mainSrc, newProps));
			this._zoomControl.setImage(imageAttrs.path + imageAttrs.fileName, true);
		},
		 this.scene7SwapImg = function(imgSrc,pageType){

		 },
		this.scene7SwatchUpdate = function(imgSrc,pageType){
			if(!this.mainImgElm) return;
			try{
				if(imgSrc){

				  var productStyle= imgSrc.substring(0,imgSrc.indexOf("_"));
				   var swatchAltImagesMap=  eval("scene7ImageMap_"+productStyle);
				   var imageSetProps=swatchAltImagesMap[imgSrc];
					$(this.scope).find(".colorPrice span").eq(0).html(imageSetProps["colorName"]);
				  //  imgSrc=imgSrc.split("?")[0].substring(imgSrc.split("?")[0].lastIndexOf("/")+1);
					var altImages= imageSetProps["altImages"];
					if(pageType=="product") {

						var existingImgSrc=this.mainImgElm.src;
						var imageName= existingImgSrc.split("?")[0].substring(existingImgSrc.split("?")[0].lastIndexOf("/")+1);
						this.mainImgElm.src = existingImgSrc.replace(imageName,altImages[0]);

						// swap the alt images
						// first find the alt image specs
						if ($(this.scope).find(".js_productAltImages_wrap img").length > 0) {
							var existAltImgSize = $(this.scope).find(".js_productAltImages_wrap img").length;
							var existAltImg = $(this.scope).find(".js_productAltImages_wrap img")[0];
							var existImgWidth = existAltImg.width;
							var existImgHeight = existAltImg.height;
							var existImgSrc = existAltImg.src;
							var existImgName = existImgSrc.split("?")[0].substring(existImgSrc.split("?")[0].lastIndexOf("/") + 1);
							var existImgBorder = existAltImg.border;
							var existImgTitle = existAltImg.title;
							var existImgAlt = existAltImg.alt;
							var list = $(this.scope).find(".js_productAltImages_wrap ul");

							list.empty();
							var elm =    this.mainImgElm;
							var me = this
							for (var i = 0; i < altImages.length; i++) {
								list.append('<li></li>').find('li:last')
									.append($('<img>', {
									src:existImgSrc.replace(existImgName, altImages[i]),
									width:existImgWidth,
									height:existImgHeight,
									alt:existImgAlt,
									title:existImgTitle

								})).click(function () {
										me.scene7ImageUpdate(this, elm);
									});
							}
						}
						this.scene7ImageUpdate(list[0].getElementsByTagName("li")[0], this.mainImgElm);

					}
				}
			}catch(e){
				try{
					console.log(e.message);
				}catch(ee){}
			}
		},
		this.scene7Initialize = function(mainImgAttrs, zoomLayerId,height,width){
			this._zoomControl = new SjZViewer({
				'baseServer': mainImgAttrs.path,
				'baseImage': mainImgAttrs.fileName,
				'viewWidth': width,
				'viewHeight':height,
				'imageWidth':null,
				'imageHeight':null,
				'transparency':false,
				'imgVersion':null,
				'inView':zoomLayerId,
				'pageId':null,
				'inParams':null
			});
			this._zoomControl.setZoomStep(1); /* integer zoom step value (1,  2, or 3) - Specifies how many zoom actions are require to achieve half the resolution when zooming in or double the resolution when zooming out. */
			this._zoomControl.setMaxZoom(100); /* 100 is max and default */
			this._zoomControl.setTurnTime(0.35);  /* Specifies the duration of the image fade transition for setImage(). Set to 0 for a hard transition */
			this._zoomControl.setTransitionTime(0.5); /* Specifies the maximum time a zoom or pan action should take to achieve the target view. Set to 0 to disable smooth zoom/pan */
			this._zoomControl.setBackground("0xffffff"); /* Specify the background color for parts of the image view which are not covered by the image or set to ?transparent? to turn off the background fill. default is 0xffffff */
			this._zoomControl.setWaitIconURL("/assets/ocpui/images/scene7/wait.gif");  /* Specifies the static or animated gif file which is displayed when the viewer is waiting for data to be loaded. */
			this._zoomControl.setWaitIconTimer("3.0" + "," + "0.1"); /* (showDelay, hideDelay) - showDelay specifies how long the viewer should wait before showing the wait icon after sending an image data request to the server. hideDelay specifies how long the viewer should wait before removing the wait icon after requested image data has been received. */

			this._zoomControl.setImage(mainImgAttrs.fileName, true);
		},
		this.scene7Events = function(){
			var me = this
			$(this.scope).find("#zoomIn").click(function(e){
					me._zoomControl.zoomIn();
				}).hover(function(){
				   $(this).addClass("mouseover");
				},
				function(){
					$(this).removeClass("mouseover");
				});

			 $(this.scope).find("#zoomOut").click(function(){
					me._zoomControl.zoomOut();
				}).hover(function()	{
					$(this).addClass("mouseover");
				},
				function(){
					$(this).removeClass("mouseover");
				});
		}
	};

	var zoomUtils = {
		/*
		filenameParser returns an object populated with all the parts of a url.
		By Scott Shepard 2011-04-22
		 */
		filenameParser:function(src){
				if (typeof src !== 'string') {
					throw "filenameParser: src is not a string.";
				}

				var fileParts, search = null, fileName, fileExt, filePrefix, path, imgUrl, searchParts = [], queryAttributes = {}, attr, pair;
				var pathParts = src.match(/(.*)[\/\\]([^\/\\]+\.\w+)$/); //works when urls have a file extension like ".gif"
				if (!pathParts){
					pathParts = src.match(/(.*)[\/\\]([^\/\\]+\w+)$/); // for urls without file extensions.
					if (!pathParts) { throw('fileNameParser cannot parse file: "'+ src); }
				}

				fileName = pathParts[2] ? pathParts[2] : pathParts[1];
				if (fileName.indexOf('?') > -1){
					search = fileName.substr(fileName.indexOf('?'));
					fileName = fileName.substr(0, fileName.indexOf('?'));
				}
				fileParts = fileName.match(/(^[a-zA-Z0-9_\-]+)(\.[a-zA-Z]{3}$)?/);
				fileExt = fileName.split('.')[1];
				filePrefix = fileName.split('.')[0];
				path = (pathParts[2] ? pathParts[1] : pathParts[0]) + "/";
				imgUrl = path + filePrefix + (fileExt || "");

				if (search !== null && search.length > 0 && search.substr(0,1) === "?"){
					search = search.substr(1, search.length);
					searchParts = search.split("&amp;");
					if (searchParts.length === 1){ searchParts = search.split("&"); }
					for (attr in searchParts){
						pair = searchParts[attr].split("=");
						if (pair.length === 2){
							queryAttributes[pair[0]] = pair[1];
						}
					}
				}

				return {
					'src': src,
					'path': path,
					'imgUrl': imgUrl,
					'fileName': fileName,
					'filePrefix': filePrefix,
					'fileExt':fileExt,
					'search':search,
					'queryAttributes':queryAttributes
				};
			},
			/*
			filenameReplace returns a url with the file name replaced with a given value.  Requires filenameParser().
			By Scott Shepard 2011-04-07

			Usage:
			Find "param" choices in the object returned from filenameParser.

			var src = '/path/to/file/chair_11.jpg?hei=100&wid=100';
			var newProps = {'fileName': imageAttrs.fileName, 'queryAttributes':{'size':'245.0,245.0', 'wid':245, 'hei':245}};
			mainImage.attr("src", filenameReplace(src, newProps));

			 */
		filenameReplace:function(original, settings){
				var fileProperties = zoomUtils.filenameParser(original);
				var search = "", setting, queryAttr, contains, settingAttr;
				for (setting in settings) {
					if (settings.hasOwnProperty(setting)) {
						switch (setting){
							case 'queryAttributes':
								for (queryAttr in fileProperties.queryAttributes){
									if (fileProperties.queryAttributes.hasOwnProperty(queryAttr)) {
										contains = false;
										for (settingAttr in settings[setting]) {
											if (queryAttr === settingAttr) {
												contains = true;
												search += settingAttr + "=" + settings[setting][settingAttr] + "&";
											}
										}
										if (!contains) {
											search += queryAttr + "=" + fileProperties.queryAttributes[queryAttr] + "&";
										}
									}
								}

								fileProperties.search = search.substr(0,search.length-1);
								break;
							case 'fileName':
								fileProperties.fileName = settings[setting];
								break;
						}
					}
				}
				return fileProperties.path + fileProperties.fileName + "?" + fileProperties.search;
			}


	};
}// Flash Player Version Detection - Rev 1.6
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (var i in params)
  			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "id":
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}


/*globals $ */
/*********************************************************************************************************************************************************************
**********************************************************************************************************************************************************************
*
*QAS Capture for Websites Sample Code 
*Release v6.0 
*Date: 7/11/2011
*
**********************************************************************************************************************************************************************
*
*Tested with:
*  Proweb:
*    v6.45
*  Browsers:
*    Firefox v4.0
*    Firefox v3.6
*    Chrome v11.0
*    Safari v5.05
*    Opera v11.10
*    IE v6, v7, v8
*  Countries:
*    USA
*    CAN
*    BRA
*    CHN
*    HKG
*    IND
*    IDN
*    ITA
*    JPN
*    KOR
*    MEX
*    RUS
*    ESP
*    UKR
*    VNM
*
**********************************************************************************************************************************************************************
*
*This code is written to be used in conjunction with QAS Pro Web and the provided Common Classes along with a language specific qas_proxy file. It is dependent
*on both jQuery and jQueryUI.
*
*This code processes all addresses on a web page through the proweb engine and requests interaction from an end-user when appropriate. All cleansed
*addresses are then returned to the proper form. All unique addresses will be processed exactly once, if there are two addresses with the same input ignoring case
*and after extraneous spaces have been stripped they will be considered the same and processed only once. If any user interaction is needed, it will be requested 
*only once and used for both addresses.
*
*
*All settings are created at the top of the code and can be changed to properly integrate into a website. QAS_Verify() is the function that should be called by
*a website in order to initiate address verification. The Classes are as follows:
*
*Main
*  Instantiates all objects
*  Loops through addresses
*  Calls function to return all results
*  Calls pre and post validation functions
*
*Address
*  Retrieves and stores addresses
*  Determines unique addresses
*  Builds search strings
*  Stores cleaned addresses
*  Returns addresses to web page
*
*Clean
*  Used to clean a single address by making an AJAX call to qas_proxy
*  Cleans/Refines/Formats addresses
*  Stores verifylevel/cleansed result/picklist
*
*Business
*  All business logic is handled here
*  Controls interaction
*
*Interface
*  creates div tags
*  populates tags with appropriate messages
*  displays pop up
*  accepts user interaction
*
**********************************************************************************************************************************************************************
*
*Programmer: Jonathan Reimels
*Date: 10/5/2010
*
**********************************************************************************************************************************************************************
*Please log any internal changes to the code here with the following format(Programmer, Date, Reason for change, Change made)
*
*UPDATES:
*
*Programmer:  Akshay Davis
*Date: 07/11/11
*Reason: Updating for cleaning additional countries as well as e-mail and phone validation
*Change: The following was done:
*           * Code jslinted
*           * Global's encapsulated with "QAS_Variable" singleton
*           * Added conditional proxy redirection
*           * Added URI encoding and decoding for search strings
*           * Added e-mail and phone validation functionality
*           * Improved error reporting for server errors returned
*
*Programmer:  Zulfiqar Ahmad
*Date: 12/15/10
*Reason: Renaming/Reorganization for clarity and consistency with prior versions of BP
*Change: Alphabetized countries in stripPostCode switch statement.   JS updated to match proxy name changes: dpv->dpvstatus; matchtype->verifylevel; isfull->fulladdress
*
*Programmer:  Jonathan Reimels
*Date: 12/15/10
*Reason: Messaging added for when secondary info inputted on prompt is out of range, as per older versions of BP
*Change:  Additions to lines 156, 164, 979-986, 994-1001
* 
* Programmer:  Gregory G. Peters (MICROS)
*Date: 1/18/12
*Reason: using href='#' breaks single page checkout - changed to use javascript:void(0);.  Added preClick and postClick args to QAS_Verify_Address for flexibility
*Change:  changes to lines 1072, 1087, 1089, 1107, 1284 for javascript:void(0).
* 
**********************************************************************************************************************************************************************
*********************************************************************************************************************************************************************/


/*********************************************************************************************************************************************************************
*
*Settings
*
*Set all variables here to properly integrate into website
*
*********************************************************************************************************************************************************************/
var QAS_Variables = {
    //location of the proxy files - path needs to either be fixed or relative to the web page the js is loaded on
    PROXY_PATH:     "../qas/qas_proxy.jsp",    //Standard Pro Web proxy file
    ADD_PROXY_PATH: "add_proxy.jsp",    //Additional Countries proxy file
    TD_PROXY_PATH:  "td_proxy.jsp",     //Email and Phone validation proxy file

    QAS_LAYOUT:     "Charlotte Russe",   //the proweb configuration to use

    //set any onclick events and submit buttons to use pre and post validation
    PRE_ON_CLICK: null,
    POST_ON_CLICK: null,
    BUTTON_ID: "qasid",
    
    //This is an array of string arrays, the id's for each set of address fields (excluding country fields) should be listed in an individual string array. These should  
    //be listed to match with the proweb config. For each cleaned result, the first item (ie Address Line 1) in the config will go into the first field in the string array
  //  ADDRESS_FIELD_IDS: [
   //     ["add1", "add2", "add3", "city", "state", "zip"],
  //      ["billadd1", "billadd2", "billadd3", "billcity", "billstate", "billzip"],
 //       ["altadd1", "altadd2", "altadd3", "altcity", "altstate", "altzip"]
 //   ],
    
    ADDRESS_FIELD_IDS: [
                        ["address1", "address2", "city", "state", "zipCode"]
                       ],
                       
	OCP_DATA_FIELDS: [
                       ["qasPoBox", "qasValidFlag"]
                      ],

    //country field id's, these should be listed in the same order as the string arrays in ADDRESS_FIELD_IDS. In other words the first country field ID should be part of the same
    //address as is in the first string array in ADDRESS_FIELD_IDS. If a layout doesn't have a country field, then enter false in for the appropriate address within the string.
   // COUNTRY_FIELD_IDS: ["country", "billcountry", "altcountry"],
    //COUNTRY_FIELD_IDS: ["false"],
     COUNTRY_FIELD_IDS: ["countryCode"],

    //Countries available via different proxies, if an address from a different country is entered it will not be cleaned
    //all addresses from these countries will be attempted to be cleaned by proweb
    DATA_SETS:      ["USA", "CAN"],
    //all addresses from these countries will be attempted to be cleaned through the additional countries service
  //  ADD_DATA_SETS:  ["BRA", "CHN", "HKG", "IND", "IDN", "ITA", "JPN", "KOR", "MEX", "RUS", "ESP", "UKR", "VNM"],
	ADD_DATA_SETS:  [ ],
    //dataset to use if the countryField is empty
    DEFAULT_DATA: "USA",

    //map country name to QAS country code (not cap-sensitive)
    COUNTRY_MAP: [
		['USA', 'USA'],
        ['US', 'USA'],
        ['U.S.', 'USA'],
        ['U.S.A.', 'USA'],
        ['United States', 'USA'],
        ['United States of America', 'USA'],
		['Canada', 'CAN'],
        ['CA', 'CAN']
    //    ['China', 'CHN'],
     //   ['Brazil', 'BRA'],
    //    ['Hong Kong', 'HKG'],
    //    ['India', 'IND'],
     //   ['Indonesia', 'IDN'],
     //   ['Italy', 'ITA'],
    //    ['Japan', 'JPN'],
    //    ['Korea', 'KOR'],
    //    ['Mexico', 'MEX']
    ],
 
    //map Canadian Provinces to QAS country code "CAN" 
    CANADIAN_PROVINCES: ["AB",  //Alberta
            		     "BC",  //British Columbia
            		     "MB",  //Manitoba
            		     "NB",  //New Brunswick
            		     "NF",  //Newfoundland
            		     "NL",
            		     "NT",  //Northwest Territories
            		     "NS",  //Nova Scotia
            		     "NU",  //Nunavut
            		     "ON",  //Ontario
            		     "PEI", //Prince Edward Island
            		     "QC",  //Quebec
            		     "SK",  //Saskatchewan
            		     "YT"], //Yukon Territory   
            		     
    //Only submit a phone number for validation where the country matches one of these
    //Replace with "ALL" to always submit phone numbers for validation
  /*  PHONE_VALIDATE_COUNTRY: ["AIA",  //Anguilla
                             "ATG",  //Antigua and Barbuda
                             "BHS",  //Bahamas
                             "BRB",  //Barbados
                             "BMU",  //Bermuda
                             "CAN",  //Canada
                             "CYM",  //Cayman Islands
                             "DMA",  //Dominica
                             "DOM",  //Dominican Republic
                             "GRD",  //Grenada
                             "JAM",  //Jamaica
                             "MSR",  //Montserrat
                             "KNA",  //Saint Kitts and Nevis
                             "LCA",  //Saint Lucia
                             "TCA",  //Turks and Caicos Islands
                             "TTA",  //Trinidad and Tobago
                             "USA",  //USA
                             "VCT",  //Saint Vincent and the Grenadines
                             "VGB",  //British Virgin Islands
                             "VIR"], //US Virgin Islands*/
    
   // PHONE_VALIDATE_COUNTRY: ["ALL"], //ALL 
    
    //This is only for Canadian addresses.
    //The proweb configuration should be setup to include LVR and Building name as one of the last lines in order to properly handle CAN apartments.
    //This variable should be set to the line number within the config that contains these fields.
    LVR: 7,

    //Array of strings identifying input e-mail fields in the form
    EMAIL_FIELD_IDS:        ["email", "billemail", "altemail"],

    //Array of strings identifying the e-mail error labels to display if an e-mail address is invalid
    EMAIL_ERR_FIELD_IDS:    ["email_error", "billemail_error", "altemail_error"],

    //Array of strings identifying input phone number fields in the form
    PHONE_FIELD_IDS:        ["phone", "billphone", "altphone"],

    //Array of strings identifying the phone number error labels to display if a phone number address is invalid
    PHONE_ERR_FIELD_IDS:    ["phone_error", "billphone_error", "altphone_error"],
    
    DISPLAY_CUSTOM_EMAIL_ERR: true,
    DISPLAY_CUSTOM_PHONE_ERR: true,

    //Level to which e-mail validation should be performed
    EMAIL_VAL_LEVEL:        "2", //Valid options are "1" or "2"
                                 //1 = syntax only
                                 //2 = 1 + status of the domain in the database
    
    EMAIL_PHONE_NUM_SUBMITS: 2,     //The number of times we should try cleaning e-mail addresses and phone numbers before
                                    //we just accept them. 0 indicates always re-submit.
    ADDRESS_INTERACTION:     true,  //prompt user for information to correct address when needed
    EMAIL_PHONE_INTERACTION: true,  //prompt user for information to correct email address and phone numbers when needed
    EMAIL_PHONE_USEDIALOG:   true,  //if set to true this will display a dialog for the user to confrim their information
                                    //false will look to set the error fields in the from (eg. EMAIL_ERR_FIELD_IDS)
    DISPLAY_ERRORS:          false,  //display any errors encountered in an alert, should only be used for debugging
    TIMEOUT:                 15000,  //ajax timeout for address validation
    TIMEOUT_EMAILPHONE:      5000,  //timeout for email and phone validation
    DISPLAY_LINES:           5      //Number of lines to display to user in an interaction required address
                                    //This will prevent, additional data, such as dpv indicator, or lat/long from being displayed to user
};

//This is the text displayed to the enduser when interaction is required, here you can change all of the text displayed.
var QAS_PROMPTS = {
    "InteractionRequired": {
        "header": "According to the U.S. Postal Service, your address may be incorrect or incomplete.<br /><br />To <b>prevent delayed or undeliverable shipment</b>, please select the seggested address or confirm that your address is correct as entered.",
        "prompt": "<b>We Recommend:</b>",
        "button": "Use Suggested Address"
    },
    "PremisesPartial": {
        "header": "According to the U.S. Postal Service, the apartment, suite, unit or floor number you entered is either missing or incorrect.<br /><br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>Update this address:</b><br /><br />Enter a valid apartment, suite, unit or floor number:",
        "button": "Update",
        "showPicklist": "Display potential matches to your address",
        "invalidRange": "We can't seem to find that number, either. Please try again."
    },
    "StreetPartial": {
        "header": "According to the U.S. Postal Service, the house or building number you entered is either missing or incorrect.<br /><br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>Update this address:</b><br /><br />Enter a valid house/building number:",
        "button": "Update",
        "showPicklist": "Display potential matches to your address",
        "invalidRange": "We can't seem to find that number, either. Please try again."
    },
    "DPVPartial": {
        "header": "According to the U.S. Postal Service, the house or building number you entered is either missing or incorrect.<br /><br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>Update this address:</b><br /><br />Enter a valid house/building number:",
        "button": "Update"
    },
    "AptAppend": {
        "header": "<b>According to the U.S. Postal Service, the apartment, suite, unit or floor number you entered is either missing or incorrect.<br /><br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>Update this address:</b><br /><br />Enter a valid apartment, suite, unit or floor number:",
        "button": "Update",
        "noApt": "I do not have an apartment, suite, unit or floor number"
    },
    "Multiple": {
        "header": "<b>According to the U.S. Postal Service, your address may be incorrect or incomplete.</b><br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>We Recommend:</b>"
    },
    "None": {
        "header": "According to the U.S. Postal Service, we could not find a match to your address as entered.<br /><br />To prevent delayed or undeliverable shipment, please confirm that your address is correct as entered."
    },
    "RightSide": {
        "prompt": "<b>Use address as entered or edit:</b>",
        "button": "Use Address As Entered *",
        "edit": "Edit Address",
        "warning": "<b>* Note: Your shipment may be delayed or undeliverable if you choose to use your address as entered.</b>"
    },
    "InteractionRequiredCA": {
        "header": "According to the Canadian Postal Service, your address may be incorrect or incomplete.<br /><br />To prevent delayed or undeliverable shipment, please select the seggested address or confirm that your address is correct as entered.",
        "prompt": "<b>We Recommend:</b>",
        "button": "Use Suggested Address"
    },
    "PremisesPartialCA": {
        "header": "According to the Canadian Postal Service, the apartment, suite, unit or floor number you entered is either missing or incorrect.<br /><br />To prevent delayed or undeliverable shipment>, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>Update this address:</b><br /><br />Enter a valid apartment, suite, unit or floor number:",
        "button": "Update",
        "showPicklist": "Display potential matches to your address",
        "invalidRange": "We can't seem to find that number, either. Please try again."
    },
    "StreetPartialCA": {
        "header": "According to the Canadian Postal Service, the house or building number you entered is either missing or incorrect.<br /><br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>Update this address:</b><br /><br />Enter a valid house/building number:",
        "button": "Update",
        "showPicklist": "Display potential matches to your address",
        "invalidRange": "We can't seem to find that number, either. Please try again."
    },
    "DPVPartialCA": {
        "header": "According to the Canadian Postal Service, the house or building number you entered is either missing or incorrect.<br /><br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>Update this address:</b><br /><br />Enter a valid house/building number:",
        "button": "Update"
    },
    "AptAppendCA": {
        "header": "<b>According to the Canadian Postal Service, the apartment, suite, unit or floor number you entered is either missing or incorrect.<br /><br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>Update this address:</b><br /><br />Enter a valid apartment, suite, unit or floor number:",
        "button": "Update",
        "noApt": "I do not have an apartment, suite, unit or floor number"
    },
    "MultipleCA": {
        "header": "According to the Canadian Postal Service, your address may be incorrect or incomplete.<br />To prevent delayed or undeliverable shipment, please update your address or confirm that your address is correct as entered.",
        "prompt": "<b>We Recommend:</b>"
    },
    "NoneCA": {
        "header": "According to the Canadian Postal Service, we could not find a match to your address as entered.<br /><br />To prevent delayed or undeliverable shipment, please confirm that your address is correct as entered."
    },
   "ConfirmEmailPhone": {
        "header": "Sorry we could not confirm your e-mail address and phone number<br />To proceed, please confirm your e-mail address and phone number below.",
        "headerPhone": "<b>Sorry we could not confirm your phone number</b><br />To proceed, please confirm your phone number below.",
        "headerEmail": "<b>Sorry we could not confirm your e-mail address</b><br />To proceed, please confirm your e-mail address below.",
        "promptEmail": "Confirm or edit your e-mail address",
        "promptPhone": "Confirm or edit your phone number"
    },
    "waitMessage": "Please wait while we verify your address ... ",
    "title": "<b>VERIFY YOUR ADDRESS</b>",
    "emailphoneTitle": "Verify your contact details"
};

var EMAIL_ERR_MESSAGES = {
    "5": "Validation Timeout",
    "10": "Syntax OK",
    "20": "Syntax OK and domain valid according to the domain database",
    "30": "Syntax OK and domain exists",
    "40": "Syntax OK, domain exists, and domain can receive email",
    "50": "Syntax OK, domain exists, and mailbox does not reject mail",
    "100": "Email has a general syntax error",
    "110": "Email has an invalid character",
    "115": "Email domain syntax is invalid",
    "120": "Email username syntax is invalid",
    "125": "Username syntax is invalid for that domain",
    "130": "Email is too long",
    "135": "Incorrect parentheses, brackets, or quotes",
    "140": "Email does not have a username",
    "145": "Email does not have a domain",
    "150": "Email does not have an @ sign",
    "155": "Email has more than one @ sign",
    "200": "Email has an invalid top-level-domain",
    "205": "Email cannot have an IP address as domain",
    "210": "Email address contains space or extra text",
    "215": "Email has unquoted spaces",
    "310": "Email domain is invalid",
    "315": "Email domain IP address is not valid",
    "325": "Email domain cannot receive email",
    "400": "Email username is invalid or nonexistent",
    "410": "Email mailbox is full",
    "420": "Email is not accepted for this domain",
    "500": "Email username is not permitted",
    "505": "Emails domain is not permitted",
    "510": "Email is suppressed and not permitted"
};

var PHONE_ERR_MESSAGES = {
    "5": "Validation Timeout",
    "10": "Successfully Parsed and Standardized, Area Code and Exchange Match",
    "100": "Area code contains invalid exchange digits",
    "110": "Invalid area code and exchange",
    "120": "Phone number has too few digits",
    "130": "Phone number has too many digits",
    "133": "Phone exchange and number not allowed",
    "134": "Phone number exchange not allowed",
    "135": "Phone number not allowed",
    "140": "Extension greater than 5 digits",
    "150": "Toll free number was entered",
    "160": "900 numbers was entered"
};

var QAS_TEMP_VARS = {
    NUM_EMAIL_PHONE_SUBMITS: 0,
    EMAIL_PHONE_POS: 0
};

/*********************************************************************************************************************************************************************
*
*Address Class
*
*Public Methods
*  getSearchStrings    - returns an array of strings ready to be sent to qas, a value of false means the address should not be processed
*  getSearchCountries    - returns an array of countries corresponding to the search strings
*  getOriginalAddresses  - returns an array of original addresses corresponding to the search strings
*  storeCleanedAddress    - stores a cleaned address
*  returnCleanAddresses  - returns cleaned addresses to the webpage
*
*********************************************************************************************************************************************************************/

function Address() {
    /**************************PRIVATE**************************/
    var ids = QAS_Variables.ADDRESS_FIELD_IDS;
    var cIds = QAS_Variables.COUNTRY_FIELD_IDS;
    var ocpData = QAS_Variables.OCP_DATA_FIELDS;
    var addresses = [];
    var uniqueAddresses = [];
    var uniqueTracker = new Array(ids.length);
    var searchStrings = [];
    var searchCountries = [];
    var cleanedAddresses = [];
    var cList = QAS_Variables.DATA_SETS;
    var addCList = QAS_Variables.ADD_DATA_SETS;
    var i, j, cIndex;
  
    //retrieve address values from forms and return array        
    var getAddresses = function () {
        //loop through forms
        for (i = 0; i < ids.length; i++) {
            //a variable to temporarily store an address form
            var tempAddress = [];
      
            //loop through fields in form
            for (j = 0; j < ids[i].length; j++) {
                //get data in address field
			
                var fieldValue = encodeURIComponent($('#' + ids[i][j]).val());
			
                //if this field is undefined and display errors is on, display an error, otherwise this will be handled later
                if (fieldValue === undefined) {
                    if (QAS_Variables.DISPLAY_ERRORS) {
                    	var tmpAlertMsg = "ID '" + ids[i][j] + "' is undefined"; 
                        //alert("ID '" + ids[i][j] + "' is undefined");
                        $("<div id='qasAlertBox'>" + tmpAlertMsg + "</div>").dialog({
	                      	  modal: true,
	                    	  resizable: false,
	                          draggable: false,
	                          stack: false,
	                          dialogClass: "alertQas",
	                    	  buttons: {
	                    		Ok: function() {
	                    		  $( this ).dialog( "destroy" );
	                    		}
	                    	  }
	                    }).parents('.ui-dialog').css('zIndex',10010);
                    }
                } else {
                    //trim whitespace
                    fieldValue = fieldValue.replace(/^\s+|\s+$/g, "");
                }
        
                //push the value into the temporary variable
                tempAddress.push(fieldValue);
            }
      
            //get the country from the form
            var c3 = $('#' + cIds[0]).val();
      
            //if the country is empty or undefined, use the default country
            if ((c3 === "") || (c3 === undefined)) {
            	 c3 = QAS_Variables.DEFAULT_DATA;
            	 for (cIndex = 0; cIndex < QAS_Variables.CANADIAN_PROVINCES.length; cIndex++) {
                     if (tempAddress[4] === QAS_Variables.CANADIAN_PROVINCES[cIndex].toString()) {
                        c3 = cList[1].toString();
                     } 	
                 }
            }    
          
            //convert to QAS country codes
            for (cIndex = 0; cIndex < QAS_Variables.COUNTRY_MAP.length; cIndex++) {
                if (c3.toLowerCase() === QAS_Variables.COUNTRY_MAP[cIndex][0].toString().toLowerCase()) {
                    c3 = QAS_Variables.COUNTRY_MAP[cIndex][1].toString();
                }
            }
      
            //push country into the temporary variable
            tempAddress.push(c3);
      
            //push temporary address into array of addresses
            addresses.push(tempAddress);
        }
    };
  
    //determine which forms contain unique addresses
    var getUnique = function () {
        var isUnique = true;
        var j = 0;
    
        //loop through addresses
        for (i = 0; i < addresses.length; i++) {
            //assume address is unique, point uniqueTracker to where address will be added in uniqueAddresses, and set isUnique to true
            uniqueTracker[i] = uniqueAddresses.length;  
            isUnique = true;
            j = 0;
      
            //loop through unique addresses until the current address either matches a unique 
            //address or no more unique addresses are left, in which case the address is unique 
            //and is added to the unique address list - if this is the first address it will 
            //be unique by default
            while (isUnique && (j < uniqueAddresses.length)) {
                if (addresses[i].toString().toLowerCase() === uniqueAddresses[j].toString().toLowerCase()) {
                    isUnique = false;
                    uniqueTracker[i] = j;
                }
                j++;
            }
      
            if (isUnique) {
                uniqueAddresses.push(addresses[i]);
            }
        }
    };
    
    //check if an address should be cleaned
    var cleanCheck = function (address, country) {
        var addNotEmpty = false;
        var j = 0, k = 0;
    
        //if an address is empty or has an undefined field, then false will be returned
        while (j < address.length) {
            if (address[j] !== "") {
                addNotEmpty = true;
            }
      
            if (address[j] === undefined) {
                return false;
            }
            j++;
        }
    
        //if the country is not in the list, return false
        if (addNotEmpty) {
            for (k = 0; k < cList.length; k++) {
                if (country === cList[k]) {
                    return true;
                }
            }
            
            for (k = 0; k < addCList.length; k++) {
                if (country === addCList[k]) {
                    return true;
                }
            }
        }
        return false;
    };
    
    //build the SearchString array from the unique addresses
    var buildSearchStrings = function () {
        for (i = 0; i < uniqueAddresses.length; i++) {
            searchCountries.push(uniqueAddresses[i].pop());
  
            if (cleanCheck(uniqueAddresses[i], searchCountries[i])) {
                searchStrings.push(uniqueAddresses[i].join("|"));  
            } else {
                searchStrings.push(false);
            }
        }
    };
  
    //return cleansed address
    var returnAddresses = function () {
        for (i = 0; i < ids.length; i++) {
            //if edit is clicked, not all addresses will have been validated, only update validated addresses in this case
            if (cleanedAddresses[uniqueTracker[i]] !== undefined) {
                for (j = 0; j < ids[i].length; j++) {
                    $('#' + ids[i][j]).val(decodeURIComponent(cleanedAddresses[uniqueTracker[i]][j]));
                }
                
                
                if(cleanedAddresses[uniqueTracker[i]].qasPoBox != undefined && cleanedAddresses[uniqueTracker[i]].qasPoBox  == 'U' ){
                	$('#' + ocpData[i][0]).val('U');
                }else{
                	$('#' + ocpData[i][0]).val(decodeURIComponent(cleanedAddresses[uniqueTracker[i]][j]));
                }
                if(cleanedAddresses[uniqueTracker[i]].qasValidFlag != undefined  && cleanedAddresses[uniqueTracker[i]].qasValidFlag == 'N'){
                	$('#' + ocpData[i][1]).val('N');
                }else{
                	$('#' + ocpData[i][1]).val('Y');
                } 
                
                
                
                
                
                
            }
        }
    };
    
    /**************************PUBLIC**************************/
    this.getSearchStrings = function () {
        return searchStrings;
    };
  
    this.getSearchCountries = function () {
        return searchCountries;
    };
  
    this.getOriginalAddresses = function () {
        return uniqueAddresses;
    };
  
    this.storeCleanedAddress = function (cleanAddress) {
        cleanedAddresses.push(cleanAddress);
    };
  
    this.returnCleanAddresses = function () {
        returnAddresses();
    };
  
    //constructor
    getAddresses();
    getUnique();
    buildSearchStrings();

}  //end Address Class


/*********************************************************************************************************************************************************************
*
*Clean Class
*
*Public Properties
*  result    - cleaned result from proweb, either a picklist, or a cleaned address
*  verifylevel  - match type from the cleaning process
*  dpv      - dpv information
*  country    - country of cleaned address
*
*Public Methods
*  search          - main search, to be used to process an address
*  searchPremisesPartial  - reprocesses a premises partial address
*  searchStreetPartial    - reprocesses a street partial address
*  searchDPVPartial    - reprocesses an address that failed dpv
*  formatAddress      - get a formatted address
*  refineAddress      - refine on a picklist
*
*********************************************************************************************************************************************************************/

function Clean(searchString, country_3, ajaxErr) {
    var me = this;
    var m_ajaxErr = ajaxErr;
    var m_ajaxTimeout = QAS_Variables.TIMEOUT;
    var premClean = false;
    var strClean = false;
    var partialAddress = "";
    var m_callback, k;
    var origSearchString = searchString;
 
    var chooseProxy = function (country) {
        for (k = 0; k < QAS_Variables.ADD_DATA_SETS.length; k++) {
            if (country === QAS_Variables.ADD_DATA_SETS[k]) {
                return QAS_Variables.ADD_PROXY_PATH;
            }
        }

        return QAS_Variables.PROXY_PATH;
    };
  
	var proxyToUse = chooseProxy(country_3); 
    
    //strip postcodes from strings based on country
    //used to strip the postcode out of premises and street 
    //partial addresses prior to address being re-submitted
    var stripPostCode = function (str) {
        switch (me.country) {
        case "AUS":
            str = str.replace(/\d{4}$/, "");
            break;
        case "DEU":
            str = str.replace(/\d{5}-\d{5}$/, "");
            break;
        case "DNK":
            str = str.replace(/\s\d{4}\s/, " ");
            break;
        case "FRA":
            str = str.replace(/\s\d{5}\s/, " ");
            break;
        case "GBR":
            str = str.replace(/\w{1,2}\d{1,2}\w?\s\d\w{2}$/, "");
            break;
        case "LUX":
            str = str.replace(/\s\d{4}\s/, "");
            break;
        case "NLD":
            str = str.replace(/\s\d{4}\s\w{2}\s/, " ");
            break;
        case "NZL":
            str = str.replace(/\d{4}$/, "");
            break;
        case "SGP":
            str = str.replace(/\d{6}$/, "");
            break;
        case "USA":
            str = str.replace(/-\d{4}$/, "");
            break;
        }
        
        return str;
    };
    
    //append each line from the returned xml to result
    var saveAddress = function () {
        me.result.push($(this).text());
    };
    
    //build array of picklist items from the returned xml
    var savePickList = function () {
        ////try-catch here
    
        var partialText = $(this).find("partialtext").text();
        var addressText = $(this).find("addresstext").text();
        var postCode = $(this).find("postcode").text();
        var moniker = $(this).find("moniker").text();
        var fulladdress = $(this).find("fulladdress").text();
    
        me.result.push(
            {
                "partialText": partialText,
                "addressText": addressText,
                "postCode": postCode,
                "moniker": moniker,
                "fulladdress": fulladdress
            }
        );
    };
    
    //get a partial address within a picklist that is not a full address
    //this is used to append building or apt info, and research on the resulting address
    var getPartialAddress = function () {
        var i;
        
        for (i = 0; i < me.result.length; i++) {
            if (me.result[i].fulladdress.toString().toLowerCase() === "false") {
                return me.result[i].partialText;
            }
        }
        return null;
    };
    
    //process result from ajax call
    var saveResult = function (xml) {
        //get verifylevel and dpv status
        me.verifylevel = $(xml).find("verifylevel").text();
        me.dpv = $(xml).find("dpvstatus").text();
        me.detailsaltered = $(xml).find("detailsaltered").text();
        me.error = $(xml).find("error").text();

        if (me.error !== "" && QAS_Variables.DISPLAY_ERRORS) {
            m_ajaxErr(xml, me.error, "Error");
            return;
        }
        //if a premisesPartial is searched on and a premisesPartial is returned, 
        //keep old result, so as not to retain the incorectly entered premise info
        if (premClean && (me.verifylevel === "PremisesPartial")) {
            premClean = false;
        } else if (strClean && (me.verifylevel === "StreetPartial")) {
            strClean = false;
        } else {
            //re-initialize this.result
            me.result = [];

            premClean = false;
            strClean = false;
            me.missingsubprem = false;

            //save each line of the address if result is 'Verified' or 'InteractionRequired'
            if ((me.verifylevel === "Verified") || (me.verifylevel === "VerifiedStreet") || (me.verifylevel === "VerifiedPlace") || (me.verifylevel === "InteractionRequired")) {
                $(xml).find("line").each(saveAddress);
                var splitResult = origSearchString.split("|");
                //me.result[1] = splitResult[1];
                /*
                 * Removed due to bug of Apt J repeating in line 2 and line 1.
                 * 392 Sunset Blvd Apt J  Hayward CA 94541
                 * 
                 */
                me.missingsubprem = $(xml).find("missingsubprem").text();
            } else { //otherwise save each picklist item
                $(xml).find("picklistitem").each(savePickList);

                if ((me.verifylevel === "PremisesPartial") || (me.verifylevel === "StreetPartial")) {
                    partialAddress = getPartialAddress();
                    if (partialAddress === null) {
                        me.verifylevel = "Multiple";
                    }
                }
            }
        }
        m_callback();
    };
    
    //send ajax request to proweb
    var ajaxCall = function (parameters) {
        $.ajax({
            type: "POST",
            url: proxyToUse,
            async: true,
            data: parameters,
            dataType: "xml",
            success: saveResult,
            timeout: m_ajaxTimeout,
            error: m_ajaxErr
        });
    };
    
    //build up ajax parameters for verification search, and call ajax search
    var doSearch = function (address, c3) {
        var ajaxParams = {
            "action": "search",
            "addlayout": QAS_Variables.QAS_LAYOUT,
            "country": c3,
            "searchstring": address
        };
    
        //pass in valid err param
        ajaxCall(ajaxParams);
    };
    
    //build up ajax parameters for format, and call ajax
    var doFormat = function (moniker) {
        var ajaxParams = {
            "action": "GetFormattedAddress",
            "addlayout": QAS_Variables.QAS_LAYOUT,
            "moniker": moniker
        };
    
        //pass in valid err param
        ajaxCall(ajaxParams);
    };
  
    //build up ajax parameters for refine, and call ajax
    var doRefine = function (moniker) {
        var ajaxParams = {
            "action": "refine",
            "addlayout": QAS_Variables.QAS_LAYOUT,
            "moniker": moniker,
            "refinetext": ""
        };
  
        ajaxCall(ajaxParams);
    };
  
    /**************************PUBLIC**************************/
  
    this.result = [];
    this.verifylevel = "";
    this.detailsaltered = "";
    this.dpv = "";
    this.error = "";
    this.missingsubprem = false;
  
    this.country = country_3;
  
    this.search = function (callback) {
        m_callback = callback;
        doSearch(origSearchString, me.country);
    };
  
    this.searchPremisesPartial = function (aptNo, callback) {
        m_callback = callback;
        
        premClean = true;
        //strip the +4 from a partial address and append the apt to the end of the first line
        var noPost = stripPostCode(decodeURIComponent(partialAddress));
        var aptAddress = encodeURIComponent(noPost.replace(/,/, " # " + aptNo + ","));
    
        //process address
        doSearch(aptAddress, me.country);
    };
  
    this.searchStreetPartial = function (buildingNo, callback) {
        m_callback = callback;
        
        strClean = true;
        //strip the +4 from a partial address and append the building number to the start of the first line  
        var noPost = stripPostCode(decodeURIComponent(partialAddress));
        var buildAddress = encodeURIComponent(buildingNo + " " + noPost);
    
        //process address
        doSearch(buildAddress, me.country);
    };
  
    this.searchDPVPartial = function (buildingNo, callback) {
        m_callback = callback;
      
        //replace old building number with new building number to original address
        var wholeAddress = me.result.join("|");
        wholeAddress = encodeURIComponent(wholeAddress.replace(/\|?\d+\w*\s/, "|" + buildingNo + " "));
    
        //process address
        doSearch(wholeAddress, me.country);
    };
  
    this.formatAddress = function (moniker, callback) {
        m_callback = callback;
      
        //format on the moniker
        doFormat(moniker);
    };
  
    this.refineAddress = function (moniker, callback) {
        m_callback = callback;
        //refine on the moniker
        doRefine(moniker);
    };
  
    /**************************PRIVATE**************************/
} //end Clean Class


/*********************************************************************************************************************************************************************
*
*Business Class
*
*The public methods of this class are used to process a cleansed address, prompt for interaction if necessary, handle interaction, pass address back to main
*
*********************************************************************************************************************************************************************/

function Business(callback, clean, orig, inter) {
    var me = this;
  
    var m_callback = callback;
    var m_clean = clean;
    var m_orig = orig;
    var m_inter = inter;
    
    //used for double street partials and double premise partials
    var previousMatch = "";
  
    var count = 0;
    
    var aptCheck = function (lvrLine) {
        var isApt = "";
    
        //check if address should have apt
        isApt = m_clean.result[lvrLine];
    
        //if address should have apt, check if it already does have an apt
        if (isApt) {
            //search on wholeaddress as address line 1 is unknown
            var wholeAddress = m_clean.result.join("|");
            if (wholeAddress.search(/\|?\d+\s*-\s*\d+/) !== -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };
    
    //handle addresses with no end-user interaction
    this.noInteraction = function () {
        if ((m_clean.verifylevel === "Verified") || (me.verifylevel === "VerifiedStreet") || (me.verifylevel === "VerifiedPlace") || (m_clean.verifylevel === "InteractionRequired")) {
            m_callback();
        } else {
            me.useOriginal();
        }
    };
 	
 	
 	
    this.processResult = function () {
        count++;
    
        //handle address based on verifylevel
        //if(m_clean.detailsaltered == "true"){
        	//m_clean.verifylevel = "InteractionRequired";
        //}
        
        switch (m_clean.verifylevel) {
        case "Verified":
        case "VerifiedStreet":
            //if address is USA, then check DPV status
            if (m_clean.country === "USA") { 
                if (clean.dpv === "DPVNotConfirmed") { 
                    //if dpv is not confirmed, prompt for Building Number
                    m_inter.setDPVPartial(m_orig, QAS_PROMPTS.DPVPartial, me.refineDPV, me.useOriginal);
                    m_inter.display();
                } else if (clean.dpv === "DPVConfirmedMissingSec") { 
                    //if dpv is missing secondary, treat address as an Interactino Required
                    m_inter.setInterReq(m_clean.result, m_orig, QAS_PROMPTS.InteractionRequired, me.acceptInter, me.useOriginal);
                    m_inter.display();
                } else { 
                    //otherwise, dpv was passed or not set. Accept the address
                    m_callback();
                }
            } else if (m_clean.country === "CAN") { 
                //if address is Canadian, check to see if there should be an apartment
                
                //if there should be an apt and the address currently doesn't have one, prompt for an apt
                if (!aptCheck(QAS_Variables.LVR - 1)) {
                    m_inter.setAptAppend(m_orig, QAS_PROMPTS.AptAppendCA, me.appendApt, m_callback, me.useOriginal);
                    m_inter.display();
                } else {
                    //otherwise, apartment was already entered, or address doesn't need an apt
                    m_callback();
                }
            } else {
                //all other countries, accept verified address
                m_callback();
            }
            break;
        case "VerifiedPlace":
        case "InteractionRequired":
          
            //if there should be an apt and the address currently doesn't have one, prompt for an apt
            if ((m_clean.country === "CAN") && (!aptCheck(QAS_Variables.LVR - 1))) {
                m_inter.setAptAppend(m_orig, QAS_PROMPTS.AptAppendCA, me.appendApt, m_callback, me.useOriginal);
                m_inter.display();
            } else if (count > 1) {
                //if interaction has already happened and resulting address is an interaction required, accept the address without further interaction
                m_callback();
            } else {
                //otherwise display interaction required dialog
            	if (m_clean.country === "USA") {
            		m_inter.setInterReq(m_clean.result, m_orig, QAS_PROMPTS.InteractionRequired, me.acceptInter, me.useOriginal);
            	} else if (m_clean.country === "CAN") {
            		m_inter.setInterReq(m_clean.result, m_orig, QAS_PROMPTS.InteractionRequiredCA, me.acceptInter, me.useOriginal);
            	}
               m_inter.display();
            }
            break;
    
        case "PremisesPartial":
          
            //display premises partial dialog
        	if (m_clean.country === "USA") {
        		m_inter.setPartial(m_clean.result, m_orig, QAS_PROMPTS.PremisesPartial, me.refineApt, me.acceptMoniker, me.useOriginal);
        	} else if (m_clean.country === "CAN") {
        		m_inter.setPartial(m_clean.result, m_orig, QAS_PROMPTS.PremisesPartialCA, me.refineApt, me.acceptMoniker, me.useOriginal);
        	}
          m_inter.display();
              
            //if previous address was a PremisesPartial, inform user that invalid range was entered
            if (previousMatch === "PremisesPartial") {
                //alert(QAS_PROMPTS.PremisesPartial.invalidRange);
                
                $("<div id='qasAlertBox'>" + QAS_PROMPTS.PremisesPartial.invalidRange + "</div>").dialog({
              	  modal: true,
            	  resizable: false,
                  draggable: false,
                  stack: false,
                  dialogClass: "alertQas",
            	  buttons: {
            		Ok: function() {
            		  $( this ).dialog( "destroy" );
            		}
            	  }
            }).parents('.ui-dialog').css('zIndex',10010);
            }
            
            //set previous match type
            previousMatch = "PremisesPartial";
            break;
    
        case "StreetPartial":
          
            //display street partial dialog
        	if (m_clean.country === "USA") {
        		m_inter.setPartial(m_clean.result, m_orig, QAS_PROMPTS.StreetPartial, me.refineBuild, me.acceptMoniker, me.useOriginal);
        	} else if (m_clean.country === "CAN") {
        		m_inter.setPartial(m_clean.result, m_orig, QAS_PROMPTS.StreetPartialCA, me.refineBuild, me.acceptMoniker, me.useOriginal);
        	}
            m_inter.display();
            
            //if previous address was a StreetPartial, inform user that invalid range was entered
            if (previousMatch === "StreetPartial") {  
                //alert(QAS_PROMPTS.StreetPartial.invalidRange);
                
                $("<div id='qasAlertBox'>" + QAS_PROMPTS.StreetPartial.invalidRange + "</div>").dialog({
                	  modal: true,
                	  resizable: false,
                      draggable: false,
                      stack: false,
                      dialogClass: "alertQas",
                	  buttons: {
                		Ok: function() {
                		  $( this ).dialog( "destroy" );
                		}
                	  }
                }).parents('.ui-dialog').css('zIndex',10010);
            }
              
            //set previous match type
            previousMatch = "StreetPartial";
            break;
    
        case "Multiple":
            //display multiple dialog
        	if (m_clean.country === "USA") {
        		m_inter.setMultiple(m_clean.result, m_orig, QAS_PROMPTS.Multiple, me.acceptMoniker, me.refineMult, me.useOriginal);
        	} else if (m_clean.country === "CAN") {
        		m_inter.setMultiple(m_clean.result, m_orig, QAS_PROMPTS.MultipleCA, me.acceptMoniker, me.refineMult, me.useOriginal);
        	}
            m_inter.display();
            break;
    
        case "None":
            //display none dialog
            if (m_clean.country === "USA") {
        		m_inter.setNone(m_orig, QAS_PROMPTS.None, me.useOriginal);
        	} else if (m_clean.country === "CAN") {
        		m_inter.setNone(m_orig, QAS_PROMPTS.NoneCA, me.useOriginal);
        	}
          
           m_inter.display();
            break;
        }
    };
  
    this.acceptInter = function () {
        //accept interaction address
        m_callback();
    };
  
    this.acceptMoniker = function (moniker) {
        //get formatted address associated with moniker and accept it
        m_clean.formatAddress(moniker, m_callback);
    };
  
    this.refineApt = function () {
        //clean a premisespartial address and process it
        var aptNo = $('#QAS_RefineText').val();
        m_clean.searchPremisesPartial(aptNo, me.processResult);
    };
  
    this.refineBuild = function () {
        //clean a streetpartial address and process it
        var buildNo = $('#QAS_RefineText').val();
        m_clean.searchStreetPartial(buildNo, me.processResult);
    };
  
    this.refineDPV = function () {
        //clean an address that failed dpv and process it
        var buildNo = $('#QAS_RefineText').val();
        m_clean.searchDPVPartial(buildNo, me.processResult);
    };
  
    this.appendApt = function () {
        //append apt to address and accept it
        var aptNo = $('#QAS_RefineText').val();
        
        var aptIndex = 0;
        var aptLine = false;
        
        //find address line one and add apt to it
        while ((!aptLine) && (aptIndex < m_clean.result.length)) {
            if (decodeURIComponent(m_clean.result[aptIndex]).search(/^\d+\s/) !== -1) {
                aptLine = true;
                m_clean.result[aptIndex] = aptNo + "-" + m_clean.result[aptIndex];
            }
            aptIndex++;
        }
        m_callback();
    };
  
    this.refineMult = function (moniker) {
        //refine on multiple address and process the result
        m_clean.refineAddress(moniker, me.processResult);
    };
  
    this.useOriginal = function () {
        //accept orignally entered address
        m_clean.result = m_orig;
        m_clean.result.qasValidFlag = 'N'; 
        m_clean.result.qasPoBox = 'U';
        
        m_callback();
    };
    
}  //end Business Class


/*********************************************************************************************************************************************************************
*
*Interface Class
*
*  Display dialog to user
*
*********************************************************************************************************************************************************************/

function Interface(editCall) {
    var m_editCall = editCall;
    var m_pickList;
    var m_orig;
    var m_message;
    var m_pickHtml = "";
    
    /**************************PRIVATE**************************/
  
    //create a picklist
    var buildPick = function () {
        var i;
        //reinitialize
        m_pickHtml = "";
    
        for (i = 0; i < m_pickList.length; i++) {
            if (m_pickList[i].fulladdress.toString().toLowerCase() === "true") {
                m_pickHtml += "<tr><td NOWRAP><a href='javascript:void(0);' class='QAS_StepIn' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].addressText) + "</a></td><td NOWRAP><a href='javascript:void(0);' class='QAS_StepIn' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].postCode) + "</a></td></tr>";
            } else {
                m_pickHtml += "<tr><td NOWRAP>" + decodeURIComponent(m_pickList[i].addressText) + "</td><td NOWRAP>" + decodeURIComponent(m_pickList[i].postCode) + "</td></tr>";
            }
        }
    };
  
    //create a picklist for multiple address, all items must be clickable
    var buildMultPick = function () {
        var i;
        //reinitialize
        m_pickHtml = "";
    
        for (i = 0; i < m_pickList.length; i++) {
            if (m_pickList[i].fulladdress.toString().toLowerCase() === "true") {
                m_pickHtml += "<tr><td NOWRAP><a href='javascript:void(0);' class='QAS_StepIn' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].addressText) + "</a></td><td NOWRAP><a href='javascript:void(0);' class='QAS_StepIn' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].postCode) + "</a></td></tr>";
            } else {
                m_pickHtml += "<tr><td NOWRAP><a href='javascript:void(0);' class='QAS_Refine' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].addressText) + "</a></td><td NOWRAP><a href='javascript:void(0);' class='QAS_Refine' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].postCode) + "</a></td></tr>";
            }
        }
    };
  
    //build display of original address and button to click
    var buildRightSide = function (callback) {
        var origHtml = "";
        var i;
    
        for (i = 0; i < m_orig.length; i++) {
            origHtml += "<tr><td>" + decodeURIComponent(m_orig[i]) + "</td></tr>";
        }

        $(".QAS_RightDetails").html(
            "<div class='QAS_RightSidePrompt'>" +
            	"<div id='QAS_OR' style='clear: none; background-color: white; display: block; float: left; margin-top: 1em; margin-left: -33px;'><b>OR</b></div>" +
            	"<div class='QAS_RightSidePromptText'>" +
                  QAS_PROMPTS.RightSide.prompt +
                "<table>"  +
                origHtml  +
                "</table>"  +
                "<span class='QAS_EditLink'><a href='javascript:void(0);' id='QAS_Edit'>" + QAS_PROMPTS.RightSide.edit + "</a></span>" +
                "<input type='button' id='QAS_AcceptOriginal' value='" + QAS_PROMPTS.RightSide.button + "' />"  +
                "</div>" +
                "</div>" +
               "<div class='QAS_DeliverableWarning'>"  +
                QAS_PROMPTS.RightSide.warning  +
                "</div>"
        );
        
        $('#QAS_AcceptOriginal').button();
    
        //assign onclick for accepting original address
        $('#QAS_AcceptOriginal').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                callback();
            }
        );
    
        //assign onclick for edit button
        $('#QAS_Edit').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                m_editCall();
            }
        );
    };
  
    //load div tags to page and set modal dialogs
    var load = function () {
        //remove the dialog if it already exists
        $("#QAS_Dialog").remove();
        $("#QAS_Wait").remove();
    
        //add div tag to page
        $(document.body).append(
            "<div id='QAS_Dialog' title='" + QAS_PROMPTS.title + "'>"  +
                "  <div class='QAS_Header ui-state-highlight'></div>"  +
                "  <div class='QAS_Prompt'>"  +
                "    <div class='QAS_PromptText'></div>"  +
                "    <div class='QAS_PromptData'></div>"  +
                "    <div class='QAS_Input'></div>"  +
                "  </div>"  +
                "  <div class='QAS_RightDetails'></div>"  +
                "  <div class='QAS_Picklist'>"  +
                "    <div class='QAS_MultPick'></div>"  +
                "    <div class='QAS_ShowPick'></div>"  +
                "    <div class='QAS_Pick'></div>"  +
                "  </div>"  +
                "</div>"  +
                "<div id='QAS_Wait' title = '" + QAS_PROMPTS.waitMessage + "'></div>"
        );
    
        //add jqueryui modal dialog to div tag, for user interaction
        $("#QAS_Dialog").dialog({
            modal: true,
            //height: 450,  ////causes issues with IE
            width: 850,
            autoOpen: false,
            closeOnEscape: false,
            closeOnBackgroundClick: false,
            resizable: false,
            draggable: false
	      });
    
        //add jqueryui modal dialog to div tag, for waiting dialog
        $("#QAS_Wait").dialog({
            modal: true,
            height: 100,
            width: 400,
            autoOpen: false,
            closeOnEscape: false,
            resizable: false,
            draggable: false
        });
    
        //add slide toggle to show pick list
        $(".QAS_ShowPick").click(function () {
            $(".QAS_Pick").slideToggle("slow");
        });
        
        //re-center popup when window is resized
        $(window).resize(function () {
            $("#QAS_Dialog").dialog("option", "position", 'center');
        });
    };
    
    //open waiting diaglog
    this.waitOpen = function () {
        $('#QAS_Wait').dialog('open');
        //remove close button from top right of dialog
        $('.ui-dialog-titlebar-close').css('display', 'none');
        $(".ui-dialog-content").hide();
    };
  
    //close waiting dialog
    this.waitClose = function () {
        $('#QAS_Wait').dialog('close');
    }; 
  
    //display interaction dialog
    this.display = function () {
        window.scroll(0, 0);
    
        $('#QAS_Dialog').dialog('open');
        $('#QAS_Dialog').parents('.ui-dialog').css('zIndex',10000);
    
        //remove close button from top right of dialog
        $('.ui-dialog-titlebar-close').css('display', 'block');
        
        //Close the dialog
       $('.ui-widget-overlay').live("click", function() {
             $("#QAS_Dialog").dialog("close");
         });             

        //remove the default focus from interaction required button(so that it is not highlighted as if mouse is hovering on it)
        $('#QAS_RefineBtn').blur();
        $('.QAS_Header').focus();
    };
  
    //set dialog to handle interaction required address
    this.setInterReq = function (cleaned, orig, message, acceptCallback, origCallback) {
        m_orig = orig;
        m_message = message;
    
        var cleanedHtml = "", i;
    
        //build right side of dialog
        buildRightSide(origCallback);
    
        //build cleansed address to show to end-user
        for (i = 0; i < QAS_Variables.DISPLAY_LINES; i++) {
            cleanedHtml += "<tr><td>" + decodeURIComponent(cleaned[i]) + "</td></tr>";
        }
    
        //display proper messages
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html(
                "<table>" +
                    cleanedHtml +
                "</table>"
        );
        $(".QAS_Input").html("<input type='button' id='QAS_RefineBtn' value='" + message.button + "' />");
        $(".QAS_MultPick").html("");
        $(".QAS_ShowPick").html("");
        $(".QAS_Pick").html("");
        
        $(".QAS_MultPick").hide();
    
        //add jqueryui button
        $('#QAS_RefineBtn').button();
        
        //add onclick event to the button
        $('#QAS_RefineBtn').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                acceptCallback();
            }
        );
    };
  
    //set dialog to handle premises and street partial addresses
    this.setPartial = function (pickList, orig, message, refineCallback, monikerCallback, origCallback) {
        m_pickList = pickList;
        m_orig = orig;
        m_message = message;
        //build picklist to display and right side of dialog
        buildPick();
        buildRightSide(origCallback);
    
        //display proper messages and picklist
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html("");
        $(".QAS_Input").html(
            "<input type='text' id='QAS_RefineText' />"  +
                "<input type='button' id='QAS_RefineBtn' value='" + message.button + "' />"
        );
        $(".QAS_MultPick").html("");
        $(".QAS_ShowPick").html("<a href='javascript:void(0);'>" + message.showPicklist + "</a>");
        $(".QAS_Pick").html(
            "<table>"  +
                m_pickHtml  +
                "</table>"
        );
        
        $(".QAS_MultPick").hide();
        
        //add jqueryui button
        $('#QAS_RefineBtn').button();
    
        //add onclick event to the button
        $('#QAS_RefineBtn').click(
            function () {
                if ($('#QAS_RefineText').val() === "") {
                    //if no value was entered in field, display error message
                    //alert("No value entered");
                    $("<div id='qasAlertBox'>No value entered</div>").dialog({
	                  	  modal: true,
	                	  resizable: false,
	                      draggable: false,
	                      stack: false,
	                      dialogClass: "alertQas",
	                	  buttons: {
	                		Ok: function() {
	                		  $( this ).dialog( "destroy" );
	                		}
	                	  }
	                }).parents('.ui-dialog').css('zIndex',10010);
                } else {
                    $('#QAS_Dialog').dialog('close');
                    refineCallback();
                }
            }
        );
  
        //add onclick event to any full addresses in the picklist
        $('.QAS_StepIn').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                var mon = $(this).attr('moniker');
                monikerCallback(mon);
            }
        );
    };
  
    //set dialog to handle addresses that fail dpv
    this.setDPVPartial = function (orig, message, refineCallback, origCallback) {
        m_orig = orig;
        m_message = message;
    
        //build right side of dialog
        buildRightSide(origCallback);
    
        //display proper messages
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html("");
        $(".QAS_Input").html(
            "<input type='text' id='QAS_RefineText' />"  +
                "<input type='button' id='QAS_RefineBtn' value='" + message.button + "' />"
        );
        $(".QAS_MultPick").html("");
        
        $(".QAS_MultPick").hide();
        
        //add jqueryui button
        $('#QAS_RefineBtn').button();
    
        //add onclick event to the button
        $('#QAS_RefineBtn').click(
            function () {
                if ($('#QAS_RefineText').val() === "") {
                    //if no value was entered in field, display error message
                    //alert("No value entered");
                    $("<div id='qasAlertBox'>No value entered</div>").dialog({
	                  	  modal: true,
	                	  resizable: false,
	                      draggable: false,
	                      stack: false,
	                      dialogClass: "alertQas",
	                	  buttons: {
	                		Ok: function() {
	                		  $( this ).dialog( "destroy" );
	                		}
	                	  }
	                }).parents('.ui-dialog').css('zIndex',10010);
                } else {
                    $('#QAS_Dialog').dialog('close');
                    refineCallback();
                }
            }
        );
    };
  
    //set dialog to handle addresses missing apt info
    this.setAptAppend = function (orig, message, refineCallback, noAptCallback, origCallback) {
        m_orig = orig;
        m_message = message;
    
        //build right side of dialog
        buildRightSide(origCallback);
    
        //display proper messages
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html("");
        $(".QAS_Input").html(
            "<input type='text' id='QAS_RefineText' />"  +
                "<input type='button' id='QAS_RefineBtn' value='" + message.button + "' />" +
                "<br />" +
                "<input type='button' id='QAS_NoApt' value='" + message.noApt + "' />"
        );
        $(".QAS_MultPick").html("");
        
        $(".QAS_MultPick").hide();    
        
        //add jqueryui button
        $('#QAS_RefineBtn').button();
        $('#QAS_NoApt').button();
    
        //add onclick event to the button
        $('#QAS_RefineBtn').click(
            function () {
                if ($('#QAS_RefineText').val() === "") {
                     //if no value was entered in field, display error message 
                    //alert("No value entered");
                    $("<div id='qasAlertBox'>No value entered</div>").dialog({
	                  	  modal: true,
	                	  resizable: false,
	                      draggable: false,
	                      stack: false,
	                      dialogClass: "alertQas",
	                	  buttons: {
	                		Ok: function() {
	                		  $( this ).dialog( "destroy" );
	                		}
	                	  }
	                }).parents('.ui-dialog').css('zIndex',10010);
                } else {
                    $('#QAS_Dialog').dialog('close');
                    refineCallback();
                }
            }
        );
    
        //add onclick event to button, in order to accept cleaned address as is, with no apt
        $('#QAS_NoApt').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                noAptCallback();
            }
        );
    };
  
    //set dialog to handle multiple addresses
    this.setMultiple = function (pickList, orig, message, formatCallback, refineCallback, origCallback) {
        m_pickList = pickList;
        m_orig = orig;
        m_message = message;
        //build picklist to display and right side of dialog
        buildMultPick();
        buildRightSide(origCallback);
    
        //display proper messages and picklist
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html("");
        $(".QAS_Input").html("");
        $(".QAS_MultPick").html(
            "<table>"  +
                m_pickHtml  +
                "</table>"
        );
        $(".QAS_ShowPick").html("");
        $(".QAS_Pick").html("");
        
        $(".QAS_MultPick").show();
        
        //step into any full address
        $('.QAS_StepIn').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                var mon = $(this).attr('moniker');
                formatCallback(mon);
            }
        );
    
        //refine on non-full address
        $('.QAS_Refine').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                var mon = $(this).attr('moniker');
                refineCallback(mon);
            }
        );
    };
  
    //set display for none verifylevel
    this.setNone = function (orig, message, origCallback) {
        m_orig = orig;
        m_message = message;
    
        buildRightSide(origCallback);
        
        $(".QAS_Header").html(message.header);
        $(".QAS_Prompt").remove();
        $(".QAS_Input").remove();
        $(".QAS_MultPick").html("");
        $(".QAS_ShowPick").remove();
        $(".QAS_Pick").remove();
        $('.QAS_RightDetails').css('float', 'left');
        $('.QAS_RightDetails').css('border-left', '0');
        $('.QAS_RightDetails').css('padding-left', '0');
        
        $("#QAS_OR").hide();
        $(".QAS_MultPick").hide();
    };
  
    //constructor
    load();

}  //end Interface Class

function EmailPhoneInterface(editCall) {
    var thisResult;
    
    //open waiting diaglog
    this.waitOpen = function () {
        $('#QAS_Wait').dialog('open');
        //remove close button from top right of dialog
        $('.ui-dialog-titlebar-close').css('display', 'none');
        $(".ui-dialog-content").hide();
    };
  
    //close waiting dialog
    this.waitClose = function () {
        $('#QAS_Wait').dialog('close');
    }; 
    
    //display interaction dialog
    this.display = function () {
        window.scroll(0, 0);
    
        $('#QAS_Dialog').dialog('open');
        $('#QAS_Dialog').parents('.ui-dialog').css('zIndex',10000);
    
        //remove close button from top right of dialog
        $('.ui-dialog-titlebar-close').css('display', 'none');
        
        //remove the default focus from interaction required button(so that it is not highlighted as if mouse is hovering on it)
        $('#QAS_RefineBtn').blur();
        $('.QAS_Header').focus();
    };
    
    this.displayResult = function (tdResult, callback) {
        var emailSuggestionsHTML;
        var numDivs = 0;
        var grp = $("#QAS_Dialog").children();
        var cnt = grp.length;
        var emailPos = 0;
        var phonePos = 0;
        var tempDiv,tempVal, iCounter;
        var procEmail = false;
        var procPhone = false;
        
        thisResult = tdResult;
        for (iCounter = 0; iCounter < cnt; iCounter++) {
            tempDiv = grp[iCounter];
            if ($(tempDiv).attr('class') === "QAS_EmailPrompt") {
                emailPos = iCounter;
            } else if ($(tempDiv).attr('class') === "QAS_PhonePrompt") {
                phonePos = iCounter;
            }
        }
        
        $(".QAS_Header").html("");
        $(".QAS_EmailPromptText").html("");
        $(".QAS_EmailErrText").html("");
        $(".QAS_EmailInput").html("");
        $(".QAS_EmailPromptData").html("");
        $(".QAS_PhonePromptText").html("");
        $(".QAS_PhoneErrText").html("");
        $(".QAS_PhoneInput").html("");
        $(".QAS_EmailSuggPrompt").html("");
            
        if (thisResult.email !== undefined && thisResult.email !== null && thisResult.email.ok === false) {
            procEmail = true;
            $(".QAS_Header").html(QAS_PROMPTS.ConfirmEmailPhone.headerEmail);
            $(".QAS_EmailPromptText").html(QAS_PROMPTS.ConfirmEmailPhone.promptEmail);
            if (QAS_Variables.DISPLAY_CUSTOM_EMAIL_ERR === true) {
                $(".QAS_EmailErrText").html(EMAIL_ERR_MESSAGES[thisResult.email.status_code]);
            }
            
            $(".QAS_EmailInput").html(
                "<input type='text' id='QAS_EmailRefineText' value='" + thisResult.email.address + "' />"
            );
            
            if (thisResult.email.corrections !== undefined && thisResult.email.corrections !== null && thisResult.email.corrections.length > 0) {
                $(".QAS_EmailSuggPrompt").html("Suggestions:");
                
                emailSuggestionsHTML = "<table id='QAS_EmailSuggestions'><tbody>";
                
                for (iCounter = 0; iCounter < thisResult.email.corrections.length; iCounter++) {
                    emailSuggestionsHTML += "<tr><td>" + thisResult.email.corrections[iCounter] + "</td></tr>";
                }
                emailSuggestionsHTML += "</tbody></table>";
                $(".QAS_EmailPromptData").html(emailSuggestionsHTML);
            }
            
            if (emailPos > phonePos) {
                tempDiv = grp[emailPos];
                grp[emailPos] = grp[phonePos];
                grp[phonePos] = tempDiv;
            }
                
            numDivs++;
        }
        
        if (thisResult.phone !== undefined && thisResult.phone !== null && thisResult.phone.ok === false) {
            procPhone = true;
            $(".QAS_PhonePromptText").html(QAS_PROMPTS.ConfirmEmailPhone.promptPhone);
            
            if (QAS_Variables.DISPLAY_CUSTOM_PHONE_ERR === true) {
                $(".QAS_PhoneErrText").html(PHONE_ERR_MESSAGES[tdResult.phone.status_code]);
            }
            
            $(".QAS_PhoneInput").html(
                "<input type='text' id='QAS_PhoneRefineText' value='" + $("input#" + QAS_Variables.PHONE_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).val() + "' />"
            );
            
            if (numDivs === 1) {
                $(".QAS_Header").html(QAS_PROMPTS.ConfirmEmailPhone.header);
                $(".QAS_PhonePrompt").css('float', 'right');
            } else {
                $(".QAS_Header").html(QAS_PROMPTS.ConfirmEmailPhone.headerPhone);
                $(".QAS_PhonePrompt").css('float', 'left');
                
                if (emailPos < phonePos) {
                    tempDiv = grp[emailPos];
                    grp[emailPos] = grp[phonePos];
                    grp[phonePos] = tempDiv;
                }
            }
            
            numDivs++;
        }
        
        $(grp).remove();
        $("#QAS_Dialog").append($(grp));
        
        if (procEmail === true) {
            $("tbody td").click(function (e) {
                $("input#QAS_EmailRefineText").val($(this).text());
            });
        }
            
        if (numDivs === 1) {
            $("#QAS_Dialog").dialog({width: 550});
            $(".QAS_EmailInput").focus();
        } else {
            $("#QAS_Dialog").dialog({width: 800});
        }
        
        if (numDivs > 0) {
            $(".QAS_EmailPhoneContinue").html("<input type='button' id='QAS_TDContinue' value='Continue' />");
            //add jqueryui button
            $('#QAS_TDContinue').button();
            //add onclick event to button, in order to accept cleaned address as is, with no apt
            $('#QAS_TDContinue').click(
                function () {
                    var searchString = "action=validate";
                    
                    if (thisResult.phone !== undefined &&
                        thisResult.phone !== null &&
                        thisResult.phone.ok === false) {
                        //write out new phone number
                        $('#' + QAS_Variables.PHONE_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).val(
                            $("#QAS_PhoneRefineText").val()
                        );
                        searchString = searchString + "&phone=" + $("#QAS_PhoneRefineText").val();
                    }
                    
                    if (thisResult.email !== undefined &&
                        thisResult.email !== null &&
                        thisResult.email.ok === false) {
                        //write out new email address
                        $('#' + QAS_Variables.EMAIL_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).val(
                            $("#QAS_EmailRefineText").val()
                        );
                        searchString = searchString + "&email=" + $("#QAS_EmailRefineText").val();
                        searchString = searchString + "&emaillev=" + QAS_Variables.EMAIL_VAL_LEVEL;
                    }
                    $('#QAS_Dialog').dialog('close');
                    callback(searchString);
                }
            );
        }
    };
    
    //load div tags to page and set modal dialogs
    var load = function () {
        $("#QAS_Wait").remove();
        $("#QAS_Dialog").remove();
        
        //add div tag to page
        $(document.body).append(
            "<div id='QAS_Dialog' title='" + QAS_PROMPTS.emailphoneTitle + "'>"  +
                "  <div class='QAS_Header ui-state-highlight'></div>"  +
                "  <div class='QAS_EmailPrompt'>"  +
                "    <div class='QAS_EmailPromptText'></div>"  +
                "    <div class='QAS_EmailErrText'></div>"  +
                "    <div class='QAS_EmailInput'></div>"  +
                "    <div class='QAS_EmailSuggPrompt'></div>" +
                "    <div class='QAS_EmailPromptData'></div>"  +
                "  </div>"  +
                "  <div class='QAS_PhonePrompt'>"  +
                "    <div class='QAS_PhonePromptText'></div>"  +
                "    <div class='QAS_PhoneErrText'></div>"  +
                "    <div class='QAS_PhoneInput'></div>"  +
                "  </div>"  +
                "  <div class='QAS_EmailPhoneContinue'></div>" +
                "</div>"  +
                "<div id='QAS_Wait' title='" + QAS_PROMPTS.waitMessage + "'></div>"
        );
    
        //add jqueryui modal dialog to div tag, for waiting dialog
        $("#QAS_Wait").dialog({
            modal: true,
            height: 200,
            width: 400,
            autoOpen: false,
            closeOnEscape: false,
            resizable: false,
            draggable: false
        });
        
        //add jqueryui modal dialog to div tag, for user interaction
        $("#QAS_Dialog").dialog({
            modal: true,
            //height: 450,  ////causes issues with IE
            width: 800,
            autoOpen: false,
            closeOnEscape: false,
            resizable: false,
            draggable: false
        });
        
        //re-center popup when window is resized
        $(window).resize(function () {
            $("#QAS_Dialog").dialog("option", "position", 'center');
        });
    };
  
    //constructor
    load();
}

function EmailPhoneValidation(clickEvent, buttonID, nextProcess) {
    this.records = [];
    
    var searchString, 
        m_click = clickEvent, 
        m_button = buttonID,
        m_nextProcess = nextProcess,
        inter,
        m_submit = false;
    
    //handle all ajax errors
    var ajaxError = function (xml, text, msg) {    
        inter.waitClose();
        
        //if display errors is set, then display the error
        if (QAS_Variables.DISPLAY_ERRORS) {
        	var tempAlertMsg = "Error with AJAX call. Check to make sure the service is configured and running correctly."; 
            //alert(text + "\n Error with AJAX call. Check to make sure the service is configured and running correctly.");
            
            $("<div id='qasAlertBox'>" + tempAlertMsg  + "</div>").dialog({
	          	  modal: true,
	        	  resizable: false,
	              draggable: false,
	              stack: false,
	              dialogClass: "alertQas",
	        	  buttons: {
	        		Ok: function() {
	        		  $( this ).dialog( "destroy" );
	        		}
	        	  }
	        }).parents('.ui-dialog').css('zIndex',10010);
        }
    };
    
    var ajaxEmailPhoneProc = function (funcForCallback) {
        $.ajax({
                type: "POST",
                url: QAS_Variables.TD_PROXY_PATH,
                async: true,
                data: searchString,
                dataType: "json",
                success: funcForCallback,
                timeout: QAS_Variables.TIMEOUT_EMAILPHONE,
                error: ajaxError,
                cache: false
            });
    };
    
    //returns
    var emailPhoneFinish = function () {
        //unhide select boxes to handle bug with ie6, where select boxes show through the pop-up window
        $('select').css('visibility', '');
        inter.waitClose();
        
        if (m_nextProcess !== null && m_nextProcess !== undefined) {
            nextProcess(m_click, m_button);
        } else {
            //if an onclick event exists, call it
            if (m_click !== null && m_click !== undefined) {
                m_click();
            }
        
            //if a submit button exists, click it
            if (m_button !== "") {
                $('#' + m_button).attr('onclick', '');
                $('#' + m_button).parent('form').attr('onsubmit', '');
                $('#' + m_button).click();
            }
        }
    };

    var checkForValidSearch = function () {
        var iCounter;        

        for (iCounter = 0; iCounter < QAS_Variables.EMAIL_FIELD_IDS.length; iCounter++) {
            if ($("input#" + QAS_Variables.EMAIL_FIELD_IDS[iCounter]).val() !== "") {
                m_submit = true;
                break;
            }
        }
        for (iCounter = 0; m_submit === false && iCounter < QAS_Variables.PHONE_FIELD_IDS.length; iCounter++) {
            if ($("input#" + QAS_Variables.PHONE_FIELD_IDS[iCounter]).val() !== "") {
                m_submit = true;
                break;
            }
        }
    };
    
    //prepare the request string
    var prepareSearch = function () {
        var tempSearch, cindex, submitphone = false, validSearch = false;
        
        if (QAS_TEMP_VARS.EMAIL_PHONE_POS >= QAS_Variables.EMAIL_FIELD_IDS.length &&
            QAS_TEMP_VARS.EMAIL_PHONE_POS >= QAS_Variables.PHONE_FIELD_IDS.length) {
            return false;
        }
        
        searchString = "action=validate";
        searchString = searchString + "&emaillev=" + QAS_Variables.EMAIL_VAL_LEVEL;
        
        tempSearch = encodeURIComponent($("input#" + QAS_Variables.EMAIL_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).val());
        if (tempSearch !== "") {
            validSearch = true;
            searchString = searchString + "&email=" + tempSearch;
        }
        
        if (QAS_Variables.PHONE_VALIDATE_COUNTRY[0] === "ALL" ||
            QAS_Variables.COUNTRY_FIELD_IDS.length < QAS_TEMP_VARS.EMAIL_PHONE_POS) {
            submitphone = true;
        } else {
            tempSearch = $('#' + QAS_Variables.COUNTRY_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).val();
            
            for(cindex = 0; cindex < QAS_Variables.PHONE_VALIDATE_COUNTRY.length; cindex++) {
                if(tempSearch === QAS_Variables.PHONE_VALIDATE_COUNTRY[cindex]) {
                    submitphone = true;
                    break;
                }
            }
        }
        
        if(submitphone === true) {
            tempSearch = encodeURIComponent($("input#" + QAS_Variables.PHONE_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).val());
            if (tempSearch !== "") {
                validSearch = true;
                searchString = searchString + "&phone=" + tempSearch;
            }
        }
        
        return validSearch;
    };
    
    var processUIContinue = function (newSearchString) {
        
        if (QAS_TEMP_VARS.NUM_EMAIL_PHONE_SUBMITS < QAS_Variables.EMAIL_PHONE_NUM_SUBMITS ||
              QAS_Variables.EMAIL_PHONE_NUM_SUBMITS === 0)
        {
            searchString = newSearchString;
        
            inter.waitOpen();
        
            QAS_TEMP_VARS.NUM_EMAIL_PHONE_SUBMITS++;
        
            ajaxEmailPhoneProc(emailPhoneUICallback);
        } else {
            QAS_TEMP_VARS.EMAIL_PHONE_POS++;
            processNext();
        }
    };
    
    var emailPhoneUICallback = function (response) {
        var processedResult = false;
        
        inter.waitClose();
        
        if (response !== undefined || response !== null) {
            if (response.email !== undefined) {
                if (response.email.ok === false) {
                    inter.displayResult(response, processUIContinue);
                    inter.display();
                    processedResult = true;
                }
            }
            
            if (response.phone !== undefined && processedResult === false) {
                if (response.phone.ok === false) {
                    inter.displayResult(response, processUIContinue);
                    inter.display();
                    processedResult = true;
                }
            }
        } else if (response.error !== undefined) {
            processedResult = true;
            //if display errors is set, then display the error
            if (QAS_Variables.DISPLAY_ERRORS) {
            	var tempAlertMsg = "Error with AJAX call. Check to make sure the service is configured and running correctly.";
                //alert(response.error + "\n Error with AJAX call. Check to make sure the service is configured and running correctly.");
                $("<div id='qasAlertBox'>" + tempAlertMsg  + "</div>").dialog({
	              	  modal: true,
	            	  resizable: false,
	                  draggable: false,
	                  stack: false,
	                  dialogClass: "alertQas",
	            	  buttons: {
	            		Ok: function() {
	            		  $( this ).dialog( "destroy" );
	            		}
	            	  }
	            }).parents('.ui-dialog').css('zIndex',10010);
            }
        }
        
        if (processedResult === false) {
            QAS_TEMP_VARS.EMAIL_PHONE_POS++;
            processNext();
        }
    };
    
    var emailPhoneStdCallback = function (response) {
        if (response.email !== undefined && response.email !== null && response.email.ok === false) {
            $("label#" + QAS_Variables.EMAIL_ERR_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).show();
            
            if (QAS_Variables.DISPLAY_CUSTOM_EMAIL_ERR === true) {
                    
                message = EMAIL_ERR_MESSAGES[response.email.status_code];
                    
                if (message !== undefined && message !== null) {
                    $("label#" + QAS_Variables.EMAIL_ERR_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).text(message);
                }
            }
        }
        
        if (response.phone !== undefined && response.phone !== null && response.phone.ok === false) {
            $("label#" + QAS_Variables.PHONE_ERR_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).show();
            
            if (QAS_Variables.DISPLAY_CUSTOM_PHONE_ERR === true) {
                    
                message = PHONE_ERR_MESSAGES[response.phone.status_code];
                
                if (message !== undefined && message !== null) {
                    $("label#" + QAS_Variables.PHONE_ERR_FIELD_IDS[QAS_TEMP_VARS.EMAIL_PHONE_POS]).text(message);
                }
            }
        }
        
        QAS_TEMP_VARS.EMAIL_PHONE_POS++;
        
        processNext();
    };
    
    //process the next search in the list
    var processNext = function () {
        var funcForCallback;
        
        QAS_TEMP_VARS.NUM_EMAIL_PHONE_SUBMITS = 0;
        
        if (QAS_Variables.EMAIL_PHONE_USEDIALOG === true) {
            funcForCallback = emailPhoneUICallback;
        } else {
            funcForCallback = emailPhoneStdCallback;
        }
        
        if ( prepareSearch() === false ) {
            QAS_TEMP_VARS.EMAIL_PHONE_POS++;
            
            if(QAS_TEMP_VARS.EMAIL_PHONE_POS >= QAS_Variables.EMAIL_FIELD_IDS.length &&
               QAS_TEMP_VARS.EMAIL_PHONE_POS >= QAS_Variables.PHONE_FIELD_IDS.length) {
                emailPhoneFinish();
                return;
            } else {
                processNext();
            }
        } else {
            QAS_TEMP_VARS.NUM_EMAIL_PHONE_SUBMITS++;
        
            ajaxEmailPhoneProc(funcForCallback);
        }
    };
    
    //send request to validate email addresses and phone numbers
    this.process = function () {        
        if (m_submit === false) {
            emailPhoneFinish();
        } else {
            //hide select boxes to handle bug with ie6, where select boxes show through the pop-up window
            $('select').css('visibility', 'hidden');
            
            inter.waitOpen();
            
            processNext();
        }
    };
    
    //instantiate Interface to handle all user interaction
    inter = new EmailPhoneInterface(null);
    
    QAS_TEMP_VARS.NUM_EMAIL_PHONE_SUBMITS = 0;
    QAS_TEMP_VARS.EMAIL_PHONE_POS = 0;
    checkForValidSearch();
}

/*********************************************************************************************************************************************************************
*
*Main Class
*
*Public Methods
*  process    - instantiate Interface and Clean, perform clean and sent result to Business
*  next    - store cleaned address, move on to next address
*  finish    - put cleaned addresses in form, submit form
*  ajaxError  - handle any errors during the ajax call to proweb
*
*********************************************************************************************************************************************************************/

function Main(clickEvent, buttonID) {

    //Private Variables
    var me = this;
  
    var m_click = clickEvent;
    var m_button = buttonID;
  
    var add = new Address();
    var strings = add.getSearchStrings();
    var countries = add.getSearchCountries();
    var orig = add.getOriginalAddresses();
    
    var inter, clean;
  
    //keep track of address to be processed (the 'next' method controls this)
    var procIndex = 0;
  
    //process an address - part 1
    this.process = function () {
        //hide select boxes to handle bug with ie6, where select boxes show through the pop-up window
        //$('select').css('visibility', 'hidden');
        
        //instantiate Interface to handle all user interaction
        inter = new Interface(me.returnEarly);
        
        //instantiate Clean, to process address
        clean = new Clean(strings[procIndex], countries[procIndex], me.ajaxError);

        //if string isn't false process it (false string means it is either an empty address or the country isn't specified in DATA_SETS)
        if (strings[procIndex]) {
		    //open the waiting widget, clean address, close waiting widget
            inter.waitOpen();
            clean.search(me.process2);
        } else {
            //if string is false use original address
            clean.result = orig[procIndex];
            me.next();
        }
    };
    
    //process an address - part 2, after callback from ajax call
    this.process2 = function () {
        inter.waitClose();
    
        //instantiate a new Business object and process the cleaned result
        var business = new Business(me.next, clean, orig[procIndex], inter);
    
        //call appropriate business function to process address depending on whether end-user interaction is allowed
        if (!QAS_Variables.ADDRESS_INTERACTION) {
            business.noInteraction();
        } else {
            business.processResult();
        }
    };
  
    //this is called in order to store an address and increment procIndex so that if another address exists it will be cleaned
    this.next = function () {
        //add match type
        clean.result.push(clean.verifylevel);
    
        //store cleaned address
        add.storeCleanedAddress(clean.result);
    
        //increase procIndex to point to the next address
        procIndex++;
    
        //if another address exists, process it, otherwise move to end
        if (procIndex < strings.length) {
            me.process();
        } else {
            me.finish();
        }
    };
  
    //returns cleaned addresses to webpage, calls submit functions if any exist
    this.finish = function () {
        //unhide select boxes to handle bug with ie6, where select boxes show through the pop-up window
        //$('select').css('visibility', '');
        
        //return cleaned addresses
        add.returnCleanAddresses();

        //if an onclick event exists, call it
                if (m_click !== null) {
                    m_click();
                }
        
        //if a submit button exists, click it
        if (m_button !== "") {
		    $('#' + m_button).attr('onclick', '');
            $('#' + m_button).parent('form').attr('onsubmit', '');
            $('#' + m_button).click();
        }
    };
    
    //used for clicks on the edit button to return any addresses already cleaned
    this.returnEarly = function () {
        //unhide select boxes to handle bug with ie6, where select boxes show through the pop-up window
        //$('select').css('visibility', '');
        
        //return cleaned addresses
        add.returnCleanAddresses();
    };
  
    //handle all ajax errors
    this.ajaxError = function (xml, text, msg) {
    
        if (text === "timeout") {
            //set match type to timeout
            clean.verifylevel = "Timeout";
            text = "Timeout";
        } else {
            //set match type to error
            clean.verifylevel = "Error";
        }
    
        //close the waiting widget
        inter.waitClose();
    
        //if display errors is set, then display the error
		if (QAS_Variables.DISPLAY_ERRORS) {
            alert(text + "\n Error with AJAX call. Check to make sure the service is configured and running correctly."); 
        }
    
        //set result to the original address entered
        clean.result = orig[procIndex];
        
        //move onto next record
        me.next();
    };
}  //End Main Class

//the initial function to call from the webpage in order to initiate email and phone validation and then address verification
//set onclick events inside this function
function QAS_Verify() {
    //set any onclick events and submit buttons to use pre and post validation
    var preOnclick = QAS_Variables.PRE_ON_CLICK;
    var postOnclick = QAS_Variables.POST_ON_CLICK;
    var buttonID = QAS_Variables.BUTTON_ID;
    
    var mProcAdd = null;
    var mProcEmailPhone = null;
    
    $('.error').hide();
    
    if (preOnclick === null) {
        mProcAdd = new Main(postOnclick, buttonID);
        mProcEmailPhone = new EmailPhoneValidation(postOnclick, buttonID, mProcAdd.process);
        mProcEmailPhone.process();
    } else if (preOnclick()) {
        mProcAdd = new Main(postOnclick, buttonID);
        mProcEmailPhone = new EmailPhoneValidation(postOnclick, buttonID, mProcAdd.process);
        mProcEmailPhone.process();
    }
    
    return false;
}

//the initial function to call from the webpage in order to initiate address verification only
//set onclick events inside this function
function QAS_Verify_Address() {
    //set any onclick events and submit buttons to use pre and post validation
    var preOnclick = QAS_Variables.PRE_ON_CLICK;
    var postOnclick = QAS_Variables.POST_ON_CLICK;
    var buttonID = QAS_Variables.BUTTON_ID;
	var m = null;
    if (preOnclick === null) {
        m = new Main(postOnclick, buttonID);
        m.process();
    } else if (preOnclick()) {
        m = new Main(postOnclick, buttonID);
        m.process();
    }
    return false;
}

//the initial function to call from the webpage in order to initiate email and phone validation only
//set onclick events inside this function
function QAS_Verify_EmailPhone() {
    //set any onclick events and submit buttons to use pre and post validation
    var preOnclick = QAS_Variables.PRE_ON_CLICK;
    var postOnclick = QAS_Variables.POST_ON_CLICK;
    var buttonID = QAS_Variables.BUTTON_ID;
    var mProc = null;
    
    $('.error').hide();
    
    if (preOnclick === null) {
        mProc = new EmailPhoneValidation(postOnclick, buttonID);
        mProc.process();
    } else if (preOnclick()) {
        mProc = new EmailPhoneValidation(postOnclick, buttonID);
        mProc.process();
    }
    
    return false;
}

window.QAS_Verify = QAS_Verify;
window.QAS_Verify_Address = QAS_Verify_Address;
window.QAS_Verify_EmailPhone = QAS_Verify_EmailPhone;


