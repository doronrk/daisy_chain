$(function()
{
	/* PDP : MOBILE CONFIRM BUTTON*/
	$('#replaceCartItemAjaxConfirm').on( 'click' , function (event) {
		event.preventDefault();
		var args = []; //args 1-<entitledItem_#> 2-<Quantity> 3-<Product Name>, 4-<Change Order ID>"
		args = $(this).attr('data-args').split(",");

		saveChangeOrderItemId(args[3]);

		var newQty = 'select'+args[1];
		categoryDisplayJS.ReplaceItemAjax( args[0] , $(newQty).val() , args[2] );

		document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
	});
});

/************************************
*
*   MINI SHOPPING CART
*
*************************************/
jQuery(function( $ ) {
	'use strict';

	th.CategoryMobile = {

		// Used to store order quantity locally
		orderQuantity: 0,

		// Save a reference to Mobile Mini Shopping Bag
		$mobileMiniShoppingBag:"",

		// Save a reference to Mobile Mini Add to Cart Button
		$miniShoppingCartButton:"",

		// Used to Initialize jQuery event listeners
		init: function() {
			if ($(".numItemsInBag") !== 'undefined' && $('#mini_cart') !== 'undefined') {
				this.orderQuantity = $.trim( $("#updatedOrderQuantity").text() );
				this.cacheElements();
				this.bindEvents();
			}
		},

		cacheElements: function() {
			this.$mobileMiniShoppingBag = $('.numItemsInBag');
			this.$miniShoppingCartButton = $('#productPageAdd2Cart');
		},

		bindEvents: function() {
			this.$miniShoppingCartButton.on( 'click', function ()
			{
				var $currentButton = $("#pdpAdd2CartButton");
				setCurrentId( 'productPageAdd2Cart' );
				var catalogEntry = $currentButton.attr('data-catentryId');
				var entitledItemId = "#entitledItem_"+catalogEntry;
				var quantity = $("#quantity_"+catalogEntry).val();
				var isPopup = $currentButton.attr('data-popup');
				var customParams = "";

				th.CategoryMobile.ajaxAdd2ShopCart(entitledItemId,quantity,isPopup,customParams );
			});
			

			$('#Search_Result_div').on('keypress','.currentPageInput',function(event)
						{   var $this=$(this);
							if(event.keyCode==13)
							{  
								var trimSearchTerm=$.trim($this.val());
								if(trimSearchTerm.length>0 )  { $this.parents('.pages').children('.goButton').click(); };
								return false;
							}
						});
			 
			 
		},

		hidePopup : function(id) {
			if ( $(id).css('display') == 'block' ) {
				$(id).hide();
				$('.dijitDialogUnderlayWrapper').each(function(index) {
					$(this).css('display','none');
				});
			}
		},
		
		miniCartTimoutId:null,
		
		// Animatation for Mini Shopping Cart.
		// i.e. updates data, hides/shows, and highlights shopping cart item
		updateMiniShoppingCartDisplay: function(data)
		{
			if(!THUtil.isMobile())
			{
				var $miniCartContainer=$("#miniCartContainer");
				$miniCartContainer.html(data);
				
				this.orderQuantity = $.trim( $("#updatedOrderQuantity").text() );
				
				THMiniCart.refinalize();
				
				$(".highlight").animate({backgroundColor: "#CACACA"},300).delay(1000).animate({backgroundColor:"transparent"},500);
				
				THUtil.fadeIn($miniCartContainer);
				
				clearTimeout(this.miniCartTimoutId);
				this.miniCartTimoutId=setTimeout(function()
				{
					$miniCartContainer.css({visibility:'',opacity:''});
					if($miniCartContainer.css('visibility')!='visible' && $miniCartContainer.css('opacity')>0)
					{
						THUtil.fadeOut($miniCartContainer,function()
						{
							$miniCartContainer.css({visibility:'',opacity:''});
						});
					}
				},4000);
				
				$(".numItemsInBag").text(this.orderQuantity);
			} else
			{
				var $data=$(data);
				this.orderQuantity = $.trim( $data.find("#updatedOrderQuantity").text() );
				$(".numItemsInBag .orderQuantity").text(this.orderQuantity);
			}
		},

		// First Hides the quickinfo popup window and digit underlying wrapper if a popup
		// Makes ajax call to return Mobile mini view jsp and on success will update the cart with new data
		ajaxUpdateMiniShoppingCartDisplay: function(orderItemId) {
			THOverlay.close();

            $.post( "MobileMiniShoppingCartView", {
	    	        	addedOrderItemId : orderItemId[0],
	    	        	storeId : storeId,
	    	        	catalogId : catalogId,
	    	        	langId : langId
	    	    	})
	    	    	.success (function(data) {
	    	    		th.CategoryMobile.updateMiniShoppingCartDisplay(data);
	    	    	})
	    	    	.error (function() {
						console.log("Error in Ajax MIni Cart Request.");
					});
		},

		// Animatation for Mini Shopping Cart.
		// updates only quantity
		updateMiniShoppingBagOnly: function(data) {
				$("#miniCartContainer").html(data);
				if(!THUtil.isMobile()) THMiniCart.refinalize();

				this.orderQuantity = $.trim( $("#updatedOrderQuantity").text() );
				$(".numItemsInBag").text(this.orderQuantity);
				$('#mobile_bag_number').text( this.orderQuantity );
		},

		// First Hides the quickinfo popup window and digit underlying wrapper if a popup
		// Makes ajax call to return Mobile mini view jsp and on success will update the cart with new data
		ajaxUpdateMiniShoppingBagOnly: function(orderItemId) {
			THOverlay.close();

            $.post( "MobileMiniShoppingCartView", {
	    	        	addedOrderItemId : orderItemId[0],
	    	        	storeId : storeId,
	    	        	catalogId : catalogId,
	    	        	langId : langId
	    	    	})
	    	    	.success (function(data) {
	    	    		th.CategoryMobile.updateMiniShoppingBagOnly(data);
	    	    	})
	    	    	.error (function() {
						console.log("Error in Ajax MIni Cart Request.");
					});
		},

		//
		ajaxAddItem2MiniShoppingCart: function(catEntryIdentifier, quantity, customParams) {
			var params = [];
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			params.orderId		= ".";
			params.calculationUsage = "-1,-2,-5,-6,-7";

			if($.isArray(catEntryIdentifier) && $.isArray(quantity)){
				for(var i=0; i<catEntryIdentifier.length; i++){
					if(parseInt(quantity[i]) < 1){
						MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
						return;
					}
					params["catEntryId_" + (i+1)] = catEntryIdentifier[i];
					params["quantity_" + (i+1)]	= quantity[i];
				}
			}
			else{
				if(parseInt(quantity) < 1){
					MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
					return;
				}
				params.catEntryId	= catEntryIdentifier;
				params.quantity		= quantity;
			}

			if(customParams != null && customParams != 'undefined'){
				for(i in customParams){
					params[i] = customParams[i];
				}
			}

			var miniCartRequest = $.post( "AjaxOrderChangeServiceItemAdd", {
		    		catEntryId : params.catEntryId,
		    		catalogId : params.catalogId,
		    		langId : params.langId,
		    		orderId : params.orderId,
		    		quantity : params.quantity,
		    		storeId : params.storeId
		    	})
				.success (function(text)
				{
					//determine if error message or success was in response
		    		 var idx = text.indexOf('/*');
		    		 var idxLast = text.indexOf('*/');
		    		 var textFromParasedJSON = $.trim( text.substring( idx + 2, idxLast ) );
		             var responseInJSON = $.parseJSON(textFromParasedJSON);

		             if ( responseInJSON['errorMessage'] === undefined) {
		            	 if (THUtil.isMobile()) {
		            		 document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
		            	 }
		            	 else {
		            		 th.CategoryMobile.ajaxUpdateMiniShoppingCartDisplay( responseInJSON['orderItemId'] );
		            	 }
		             }
		             else {
		            	 THOverlay.close();

		            	 if (responseInJSON['errorMessage'] !== undefined) {
		     			 	if(responseInJSON['errorMessageKey'] === "_ERR_NO_ELIGIBLE_TRADING"){
		     			 		MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
		     			 	} else if (responseInJSON['errorMessageKey'] === "_ERR_RETRIEVE_PRICE") {
		      					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE"]);
		      				} else {
		      					MessageHelper.displayErrorMessage(responseInJSON['errorMessage']);
		      				}
		     			}
		     			else {
		     				 if (responseInJSON['errorMessageKey'] != 'undefined') {
		     					MessageHelper.displayErrorMessage(responseInJSON['errorMessageKey']);
		     				 }
		     			}
		             }
		    	})
		    	.error (function() {
					console.log("Error in Ajax MIni Cart Request.");
				});
		},

		ajaxAdd2ShopCart : function(entitledItemId,quantity,isPopup,customParams) {
			var entitledItemJSON;

			if ($(entitledItemId).length > 0) {
				//the json object for entitled items are already in the HTML.
					entitledItemJSON = $.parseJSON( $(entitledItemId).html() );
			}else{
				//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object.
				//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
				entitledItemJSON = categoryDisplayJS.getEntitledItemJsonObject();
			}

			categoryDisplayJS.setEntitledItems(entitledItemJSON);
			var catalogEntryId = categoryDisplayJS.getCatalogEntryId();
			if(catalogEntryId!=null){
				MessageHelper.clearAllErrorMessages();
				this.ajaxAddItem2MiniShoppingCart(catalogEntryId , quantity,customParams);
			}
			else if (isPopup == true){
				if(THUtil.isNull(SwatchDisplayJS.activeColor))
					MessageHelper.formErrorHandleClient('addToCartLinkAjax', MessageHelper.messages['ERR_RESOLVING_SKU_COLOR']);
				else
					MessageHelper.formErrorHandleClient('addToCartLinkAjax', MessageHelper.messages['ERR_RESOLVING_SKU']);
			} else{
				if(THUtil.isNull(SwatchDisplayJS.activeColor))
					MessageHelper.formErrorHandleClient('pdpAdd2CartButton', MessageHelper.messages['ERR_RESOLVING_SKU_COLOR']);
				else
					MessageHelper.formErrorHandleClient('pdpAdd2CartButton', MessageHelper.messages['ERR_RESOLVING_SKU']);
			}
		}

	}; // End CategoryMobile Object

	// Need to initialize Object
    th.CategoryMobile.init();

});

function miniCart() {
	var $mobileMiniCart = $('#mini_cart');
	if ( $mobileMiniCart.css('display') === "block" )
		$mobileMiniCart.hide();
	else
		$mobileMiniCart.show();
}

var th = th || {};
th.pageNavigation = th.pageNavigation || {}
