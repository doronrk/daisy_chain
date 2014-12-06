

common.contextPath = '';
        
var persistentCartCommands = new Array(8);
persistentCartCommands[0] = '/checkout/universal_cart.jsp';
persistentCartCommands[1] = '/checkout/add_item_pc.cmd';
persistentCartCommands[2] = '/checkout/add_items_pc.cmd';
persistentCartCommands[3] = '/checkout/delete_item_in_cart.cmd?omAction=deleteItem';
persistentCartCommands[4] = '/checkout/add_catalog_order_item_pc.cmd';
persistentCartCommands[5] = '/user/add_wishlist_item_to_basket_pc.cmd';
persistentCartCommands[6] = '/user/add_all_wishlist_items_to_basket_pc.cmd';
persistentCartCommands[7] = '/user/instore_pickup_zip_json_pc.jsp';
persistentCartCommands[8] = '/user/add_item_to_wishlist_pc.cmd';

var persistentCartContainerId = "#widget-ucart";
var persistentCartCloseButClass = ".widget-ucart-close-but";
var continueShoppingLinkId = "#widget-ucart-continue-shopping";
var hideTimeOuts= new Array();

var ucartLoadingHTML = 	'<div id="widget-ucart">' +
				  		'  <div id="glo-ucart-body">' +
				  		'    <div id="glo-ucart-content">'+
				  		'	   <div class="widget-ima-loader"><img src="http://www.bebe.com/assets/bb/assets/images/common/loadinfo-alt.gif" alt="Loading..."/></div>' +
				  		'    </div>' +
				  		'  </div>' +
  				  		'</div>';

var ucartSimpleHTML = 	'<div id="widget-ucart"></div>';

var persistentCartIsShowing = false;
var minicartResize = function($parent) {
    var $content = $("#glo-ucart-slider-content");
    var rawContentHeight = $parent.data("rawContentHeight");
    var contentHeight = $(window).height() - $("#headerTop").outerHeight(true) - 30;
    $(".jsMiniCartHeight", $parent).each(function(){
        contentHeight -= $(this).outerHeight(true);
    });
    if (rawContentHeight > contentHeight) {
        $content.height(contentHeight).jScrollPane({showArrows: true, mouseWheelSpeed: 30});
    }
    $(window).off("resize.minicart").on("resize.minicart", function(){
        minicartResize($parent);
    });
};

/* Function(s) to Show the Basket Layer */
function showBasket(action,params,refreshPage,refreshDelayTime,prodStyle,prodSku) {
	if( (action == "show") || (action == "showFromQuickview") )
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[0]; }
	else if(action == "addProduct")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[1];}
	else if(action == "addEnsemble")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[2];}
	else if(action == "remove")
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[3];}
	else if(action == "addCatalogItems")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[4];}
	else if(action == "addProductWishlist")
	{
        //fire off scAdd tl() when add item to cart from wishlist
        s.linkTrackVars="events,products,eVar14";
        s.linkTrackEvents="scAdd,event22";
        s.events = "scAdd,event22";
        s.products=';'+prodStyle+";;;;eVar24=" + prodSku;
        s.pageName="my account:wish list";
        s.eVar14="wish list";

        var s_code=s.tl(this, "o", "Wishlist Add to Cart");

        showloading(ucartSimpleHTML); requestURL = persistentCartCommands[5];
    }
	else if(action == "addAllProductsWishlist")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[6];}
	else if(action == "addProductToWishlist")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[8];}
	else
	{ alert("missing action"); }

	requestURL = requestURL;
	params = "ts=" + timestamp() + "&action=" + action + "&" + params;

	$.ajax({
		type: "POST",
		url: requestURL,
		data: params,
		dataType: "html",
      	timeout: 30000,
		success: function(data) {
			hideloading();
			var $persCart = $(persistentCartContainerId);
			$persCart.append(data);
			$persCart.show(0);
            /* store the rawContentHeight for future use in case of window resizes */
            $persCart.data("rawContentHeight", $("#glo-ucart-slider-content", $persCart).outerHeight(true));
            minicartResize($persCart);
			if (refreshPage != undefined && refreshPage) {
            	setTimeout( function() { location.reload(true); }, refreshDelayTime != undefined? refreshDelayTime : 0);
            }
            persistentCartIsShowing = true;
			return true;
		},
		error: function() {
			hideloading();
			return false;
		}
	});
}

function showloading(htmlToShow) {
	$(persistentCartContainerId).remove();
	//load, position, show new cart
	$("#ucartPositioner").append(htmlToShow);
	$(persistentCartContainerId).show();
	// add an event for close layer.
	$(persistentCartCloseButClass).click(function() { hideBasket(); });
}

function hideloading() {
	$(persistentCartContainerId + " *").remove();
	$(persistentCartContainerId).html("");
}


 //edit this function to update the setup
function setupPersistentCartButtons() {
	$(persistentCartCloseButClass + "," + continueShoppingLinkId).unbind("click").click(function() {
		hideBasket();
	});
	$(persistentCartCloseButClass + "," + continueShoppingLinkId).attr("href","javascript:void(0)");
	clearAllTimeouts();
}

//Edit this function if need to do something special on basket close.
function hideBasket() {
	$(persistentCartContainerId).hide();
	$(persistentCartContainerId).remove();

	shoppingBagBut = $("#widget-header-active-link").eq(0);
	$(shoppingBagBut).attr("id","");
	$(shoppingBagBut).mouseout();

	persistentCartIsShowing = false;
}

function isShowingBasket() {
	return persistentCartIsShowing;
}

function createAddProductParams(scope) {
    var productVariantId = $("input[name=productVariantId]", scope).val();
   	if (productVariantId == null || productVariantId == undefined)
   		productVariantId = $("input[name=productVariantId2]", scope).val();

   	var colorSelectedValue = $("input[name=colorSelectedValue]", scope).val();
   	if (colorSelectedValue == null || colorSelectedValue == undefined) {
   		colorSelectedValue = "";
   	}

   	var sizeSelectedValue = $("input[name=sizeSelectedValue]", scope).val();
   	if (sizeSelectedValue == null || sizeSelectedValue == undefined) {
   		sizeSelectedValue = "";
   	}

       var sendersName = $("input[name=sendersName]", scope).val();
       if (sendersName == null || sendersName == undefined) {
           sendersName = "";
       }

       var emailAddress = $("input[name=emailAddress]", scope).val();
       if (emailAddress == null || emailAddress == undefined) {
           emailAddress = "";
       }

       var reEmailAddress = $("input[name=reEnterEmailAddress]", scope).val();
       if (reEmailAddress == null || reEmailAddress == undefined) {
           reEmailAddress = "";
       }

       var recipientName = $("input[name=recipientName]", scope).val();
       if (recipientName == null || recipientName == undefined) {
           recipientName = "";
       }

       var recipientEmail = $("input[name=recipientEmail]", scope).val();
       if (recipientEmail == null || recipientEmail == undefined) {
           recipientEmail = "";
       }

       var reRecipientEmail = $("input[name=reEnterRecipientEmail]", scope).val();
       if (reRecipientEmail == null || reRecipientEmail == undefined) {
           reRecipientEmail = "";
       }

       var msgRecipientName = $("input[name=msgRecipientName]", scope).val();
       if (msgRecipientName == null || msgRecipientName == undefined) {
           msgRecipientName = "";
       }

       var msgSendersName = $("input[name=msgSendersName]", scope).val();
       if (msgSendersName == null || msgSendersName == undefined) {
           msgSendersName = "";
       }

       var personalMessage = $('#personalMessage').val();
       if (personalMessage == null || personalMessage == undefined) {
           personalMessage = "";
       }

       var deliveryDate = $("input[name=deliveryDate]", scope).val();
       if (deliveryDate == null || deliveryDate == undefined) {
           deliveryDate = "";
       }

       var egcPrice = $("input[name=egcPrice]", scope).val();
       if (egcPrice == null || egcPrice == undefined) {
           egcPrice = "";
       }

       var egcDesignUrl = $("input[name=egcDesignUrl]", scope).val();
       if (egcDesignUrl == null || egcDesignUrl == undefined) {
           egcDesignUrl = "";
       }

       // for quantity need to check both input and select
       var quantity = $("select[name=quantity]", scope).val();
   	if (quantity == null || quantity == undefined) {
   	    quantity = $("input[name=quantity]", scope).val();
       }

   	var params =  "productName=" + $("input[name=productName]", scope).val() +
   			  "&productId=" + $("input[name=productId]", scope).val() +
      	 		  "&categoryId=" + $("input[name=categoryId]", scope).val() +
      	 		  "&parentCategoryId=" + $("input[name=parentCategoryId]", scope).val() +
      	 		  "&subCategoryId=" + $("input[name=subCategoryId]", scope).val() +
      	 		  "&quantity=" + quantity +
      	 		  "&productVariantId=" + productVariantId +
      			  "&colorSelectedValue=" + colorSelectedValue +
                 "&sendersName=" + sendersName +
                 "&emailAddress=" + emailAddress +
                 "&reEnterEmailAddress=" + reEmailAddress +
                 "&recipientName=" + recipientName +
                 "&recipientEmail=" + recipientEmail +
                 "&reEnterRecipientEmail=" + reRecipientEmail +
                 "&msgRecipientName=" + msgRecipientName +
                 "&msgSendersName=" + msgSendersName +
                 "&personalMessage=" + personalMessage +
                 "&deliveryDate=" + deliveryDate +
                 "&egcPrice=" + egcPrice +
                 "&egcDesignUrl=" + egcDesignUrl +
      			  "&sizeSelectedValue=" + sizeSelectedValue;

    return params;
}

function addToCart(prefix, container) {
	var scope = $(prefix);
    resetErrorFields(scope);
	// validate for user input
	var objRegExp = /\<script\>.*\<\/script\>/;
	$(':input').each (function() {
		val = this.value;
		if (objRegExp.test(val)) {
			if (message != '') {
				alert(message);
				return false;
			}
		}
	});

	if (container)
		scope = $(container).parents(prefix);

    var params = createAddProductParams(scope);

	//see if this is an update.
  	if( $("input[name=itemGUID]", scope).size() > 0 )
  	{ params = params + "&itemGUID=" + $("input[name=itemGUID]", scope).val() + "&isUpdate=1"; }

	if( $("input[name=onBasketPage]", scope).size() > 0 )
  		{ params = params + "&onBasketPage=" + $("input[name=onBasketPage]", scope).val(); }

	if (prefix != undefined)
		params = params + "&prefix=" + prefix;

	persistentCartIsShowing = false;
  	showBasket('addProduct', params);
}

function wishListAddToCart(params,refreshPage,refreshDelayTime,prodStyle,prodSku) {
	showBasket('addProductWishlist',params,refreshPage,refreshDelayTime,prodStyle,prodSku);
}

function wishListAddAllToCart(params,refreshPage,refreshDelayTime) {
	showBasket('addAllProductsWishlist',params,refreshPage,refreshDelayTime);
}

function addToWishListPC(prefix, container) {
    var scope = $(prefix);
    resetErrorFields(scope);
    if (container)
   		scope = $(container).parents(prefix);

    var params = createAddProductParams(scope);
    if (prefix != undefined)
   		params = params + "&prefix=" + prefix;

	showBasket('addProductToWishlist', params);
}

function addCatalogOrderItemsToCart() {

    // for quantity need to check both input and select
    var quantity = $("select[name=quantity]").val();
	if (quantity == null || quantity == undefined) {
	    quantity = $("input[name=quantity]").val();
    }

    params = "productId=" + $("input[name=productId]").val() +
  		     "&itemNumber=" + $("input[name=itemNumber]").val() +
  			 "&productName=" + $("input[name=productName]").val() +
  			 "&productVariantId=" + $("input[name=productVariantId]").val() +
  			 "&quantity=" + quantity +
  			 "&colorSelectedValue=" + $("input[name=colorSelectedValue]").val() +
  			 "&sizeSelectedValue=" + $("input[name=sizeSelectedValue]").val();

    showBasket('addCatalogItems',params);
}

function addEnsembleToCart(type) {
	params =  "productName=" + $("input[name=productName]").val() +
			  "&ensembleId=" + $("input[name=ensembleId]").val() +
			  "&categoryId=" + $("input[name=categoryId]").val() +
   	 		  "&parentCategoryId=" + $("input[name=parentCategoryId]").val();

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
    cartInfoUtil.getCartCount('/', true);
}

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
}

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
}

function egcErrorAppend(area, errorText) {
    var errorType = "error";
    var $root = $(area).parents(".formFieldContainer");

    var hasLabel = $root.find("span.labelFieldWrapper").length !== 0;
    if(hasLabel){
        $root.addClass("formFieldError").find("span.labelFieldWrapper").before('<div class="jsResponseMsg ' + errorType + '">' + errorText + '</div>');
    } else {
        $root.addClass("formFieldError");
        $('<div class="jsResponseMsg ' + errorType + '">' + errorText + '</div>').prependTo($root);
    }
}

function resetErrorFields(scope) {
	$(".common-error").hide().html("");
    $(".formFieldError", scope).each(function(){
        $(this).removeClass("formFieldError").find(".jsResponseMsg").remove();
    });
}

function messageAppend(area,msg) {
	$(area).html(msg);
	$(area).show();
}

function resetMessageFields() {
	$(".glo-tex-info").hide();
}

function clearAllTimeouts() {
	for(x = 0; x < hideTimeOuts.length; x++)
	{ clearTimeout(hideTimeOuts[x]); }
}

function timestamp() {
	return new Date().getTime();
}

function loadQuickView(overlayURL) {
	if (typeof OverlayWidget != "undefined")
 		OverlayWidget.show("#headerOverlay", null, { sourceURL : overlayURL });
}

function hideQuickView() {
	if (typeof OverlayWidget != "undefined") { OverlayWidget.hideAll(); }
}

function loadOverlay(overlay, overlayURL) {
	if (typeof OverlayWidget != "undefined")
 		OverlayWidget.show(overlay, null, { sourceURL : overlayURL });
}