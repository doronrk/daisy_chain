/**
 * INIZIO PARTE DA TENERE FUORI DALLA CLASSE CUSTOM FrgMiniWishListUtilJS
 */

/** 
 * @fileOverview This file provides the common functions which are specific to the Wishlist cart
 */
/**
 * Declares a new render context for the Wishlist.
 */
wc.render.declareContext("WishlistContext", null, "");

/**
 * Declares a new render context for the Wishlist dropdown contents.
 */
wc.render.declareContext("WishlistDropDownContext", null, "");

/**
 * Displays the dropdown content of the wishlist when keyboard keys are used to expand/collapse the dropdown.
 *
 * @param {object} event The event to retrieve the input keyboard key
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the wishlist dropdown contents
 * @param {string} contentType The content that will be shown in the expanded wishlist dropdown.
 */
function showWishlistDropDownEvent(event, relativeId, contentId, contentType) {
    console.debug(event.keyCode);
    if (event.keyCode == dojo.keys.DOWN_ARROW) {
        showWishlistDropDown(relativeId, contentId, contentType);
        dojo.stopEvent(event);
    } else if (event.keyCode == dojo.keys.ENTER) {
        showWishlistDropDown(relativeId, contentId, contentType);
        dojo.stopEvent(event);
    }
}

/**
 * Displays the dropdown content of the wishlist when the user hovers over the 
 * wishlist or uses keyboard keys to expand the dropdown.
 *
 * @param {object} event The event triggered from user actions
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the wishlist dropdown contents
 * @param {string} contentType The content that will be shown in the expanded wishlist dropdown.
 */
function showWishlistDropDown(relativeId, contentId, contentType) {


    //Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
    var t = dojo.byId(relativeId);
    var c = dojo.coords(t, true);
    /* CUSTOM Coords
     * @autor caugelli
     * var x1 = c.x - 130;
     * var y1 = c.y + c.h;
     */
    var x1 = 0;
    var y1 = 0;


    /*By default, the content of the wishlist will be displayed immediately after the wishlist title.
     *But we want the content to display under the wishlist title. So we'll need to get the width
     *of the shop wishlist and then shift it*/
    var wishlistWidth = dojo.coords(dojo.byId('widget_miniwishlist'), true).w;

    if (dojo.isIE == 8) {
        wishlistWidth = dojo.coords(dojo.byId('widget_miniwishlist'), true).w
    } else if (dojo.isIE >= 7 && dojo.isIE < 8) {
        wishlistWidth = dojo.coords(dojo.byId('wishlistBody'), true).w;
    } else if (dojo.isIE < 7) {
        wishlistWidth = originalWishlistWidth;
    }

    //dojo.style(dojo.byId("quick_wishlist"), "width", wishlistWidth+'px');

    /* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
	if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time before calling Dialog.show() method reset the (x,y) co-ordinates. 
	The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
	*/
    var dlgX = x1; //this value is good for ff3, IE8 & languages

    if (dojo.isIE) {
        dlgX = x1 + dojo.contentBox(dojo.byId(relativeId)).w - wishlistWidth;
    }

    if (FrgMiniWishListUtilJS.dropDownDlg) {
        FrgMiniWishListUtilJS.dropDownDlg.y = y1;
        FrgMiniWishListUtilJS.dropDownDlg.x = dlgX;
    }

    /* Dialog is not yet created..Create one */
    if (!FrgMiniWishListUtilJS.dropDownDlg) {
        var pane = document.getElementById(contentId);
        var dialogTitleElement = document.getElementById(contentId + "_ACCE_Label");
        if (dialogTitleElement != null) {
            FrgMiniWishListUtilJS.dropDownDlg = new wc.widget.WCDialog({
                relatedSource: relativeId,
                x: x1,
                y: y1,
                title: dialogTitleElement.innerHTML
            }, pane);
        } else {
            FrgMiniWishListUtilJS.dropDownDlg = new wc.widget.WCDialog({
                relatedSource: relativeId,
                x: x1,
                y: y1
            }, pane);
        }
        FrgMiniWishListUtilJS.dropDownDlg.x = dlgX;
    }


    if (!FrgMiniWishListUtilJS.dropDownDlg.displayStatus) {
        //If not displaying the dialog, then change the contents based on the contentType.. 
        //If we are displaying the dialog, then do not change the content of the dialog widget..

        FrgMiniWishListUtilJS.dropDownDlg.closeOnTimeOut = false; // Do not close the dialog on timeout.
        FrgMiniWishListUtilJS.dropDownDlg.autoClose = false; // Do not close the dialog when it loses focus. Use the Close button.
        if (contentType == 'orderItemsList' || contentType == 'orderItemsListAutoClose') {
            dojo.byId("WishlistProductsList").style.display = "block";
            dojo.byId("WishlistProductAdded").style.display = "none";
            dojo.removeClass("WishlistProductsList", "frg_hidden");

            if (contentType == 'orderItemsListAutoClose') {
                FrgMiniWishListUtilJS.dropDownDlg.autoClose = true;
            }

            /*	CUSTOM START 
             * @author caugelli */
            $jq("#WishlistProductsList").addClass("frg_panel");
            $jq("#quick_wishlist_container").css("right", "0px");
            $jq("#quick_wishlist_container").css("position", "absolute");
            /* END */
            if ($jq("#totalNumberOfItemsWL").val() > 1 ){
     		   $jq("#product_wishlist").addClass("scroll-pane-miniwishlist");
 				
 				/* JScrollPane for miniwishlist - START */
 				/* Panel inizialization */
 				
 					scroller = $jq('#product_wishlist').jScrollPane({
 							showArrows: false,
 							contentWidth: 0,
 							horizontalDragMaxWidth: 0
 					}).data('jsp');
 					
 				$jq(window).bind('resize', function () {
 					if (scroller) {
 						setTimeout(function () {
 							scroller.reinitialise();
 						}, 10);
 					}
 				});
 				$jq(window).trigger('resize');
 				
 				/* JScrollPane for miniwishlist - END */ 
 			}
        } else if (contentType == 'orderItemAdded') {
            dojo.byId("WishlistProductsList").style.display = "none";
            dojo.byId("WishlistProductAdded").style.display = "block";

            /*	CUSTOM START 
             * @author caugelli */
            $jq("#WishlistProductAdded").addClass("frg_panel");
            $jq("#quick_wishlist_container").css("right", "0px");
            $jq("#quick_wishlist_container").css("position", "absolute");
            /* END */
        }
    }
    if (dojo.isIE < 7) {
        document.getElementById("quick_wishlist_container").style.display = "block";
    }
    
    /*	CUSTOM START 
     * @author caugelli */
    //setlinkMyShop();
    
    setTimeout(dojo.hitch(FrgMiniWishListUtilJS.dropDownDlg, "show", null), 5);
    setTimeout(dojo.hitch(this, "hideUnderlayWrapper", ""), 5);
}

/**
 * Sets the URL of the specified controller.
 *
 * @param {string} controllerId The id of the target controller.
 * @param {string} url The link to specify for the controller.
 */
function setWishlistControllerURL(url) {
    wc.render.getRefreshControllerById('WishlistController').url = url;
}



/** 
 * Declares a new refresh controller for the Wishlist.
 */
wc.render.declareRefreshController({
    id: "WishlistController",
    renderContext: wc.render.getContextById("WishlistContext"),
    url: "",
    formId: ""

    /** 
     * Refreshs the wishlist.
     * If a new order item is added via an Ajax service call, set the wishlist to display the new order item in the dropdown.
     * Otherwise, only refresh the contents of wishlist to the updated order information.
     * This function is called when a modelChanged event is detected. 
     * 
     * @param {string} message The model changed event message
     * @param {object} widget The registered refresh area
     */,
    modelChangedHandler: function (message, widget) {
        var controller = this;
        var renderContext = this.renderContext;
        if (message.actionId == "ShoppingListServiceCreate" || message.actionId == "ShoppingListServiceUpdate" || message.actionId == "ShoppingListServiceDelete" || message.actionId == "ShoppingListServiceRemoveItem" || message.actionId == "ShoppingListServiceAddItem" || message.actionId == "ShoppingListServiceAddItemAndRemoveFromCart") {
            FrgMiniWishListUtilJS.showDropdown = true;
            var param = [];
            widget.refresh(param);

        }
    }

    /** 
     * Destroys the old wishlist dialog with previous order information.
     * If order item was added, display the wishlist dropdown with the new order item added contents.
     * This function is called after a successful refresh. 
     * 
     * @param {object} widget The registered refresh area
     */,
    postRefreshHandler: function (widget) {
        var controller = this;
        var renderContext = this.renderContext;
        //The dialog contents has changed..so destroy the old dialog with stale data..
        FrgMiniWishListUtilJS.destroyDialog();

        if (FrgMiniWishListUtilJS.showDropdown) {
            FrgMiniWishListUtilJS.showWL();
            FrgMiniWishListUtilJS.showDropdown = false;

        } else {
            FrgMiniWishListUtilJS.showWL();
        }




    }

})
/**
 * FINE PARTE DA TENERE FUORI DALLA CLASSE CUSTOM FrgMiniWishListUtilJS
 */


FrgMiniWishListUtilJS = {
	widgetName: 'widget_miniwishlist',
	containerName: 'quick_wishlist_container',
	divName: 'quick_wishlist',
    dropDownDlg: null,
    showDropdown: false,
    /**
     * Visualizza/ Nascondi il Miniwishlist
     */
    showWL: function () {
        showWishlistDropDown(FrgMiniWishListUtilJS.widgetName, FrgMiniWishListUtilJS.containerName, 'orderItemsList');
        return true;

    },
    
    hideWL: function() {
        $jq("#"+divName).hide("slow");
        return false;
    },
    /** 
     * This variable stores the ID of the language that the store currently uses. Its default value is set to -1, which corresponds to United States English.
     * @private
     */
    langId: "-1",

    /** 
     * This variable stores the ID of the current store. Its default value is empty.
     * @private
     */
    storeId: "",

    /** 
     * This variable stores the ID of the catalog. Its default value is empty.
     * @private
     */
    catalogId: "",

    /**
     * variable that stores the default gift list ID
     * @private
     */
    defaultListId: null,
    /**
     * remove item from a wish list
     * @param {long} giftItemId ID of the wish list item to be removed
     */
    /**
     * Sets the common parameters for the current page. 
     * For example, the language ID, store ID, and catalog ID.
     *
     * @param {Integer} langId The ID of the language that the store currently uses.
     * @param {Integer} storeId The ID of the current store.
     * @param {Integer} catalogId The ID of the catalog.
     */
    setCommonParameters: function (langId, storeId, catalogId) {
        this.langId = langId;
        this.storeId = storeId;
        this.catalogId = catalogId;
    },
    removeItem: function (giftItemId) {
        var params = {};
        params["storeId"] = this.storeId;
        params["catalogId"] = this.catalogId;
        params["langId"] = this.langId;
        params["quantity"] = 0;

        params["giftListId"] = dojo.byId("frgSelectedWishListId").value;

        params["giftListItemId"] = giftItemId;

        /*For Handling multiple clicks. */
        if (!submitRequest()) {
            return;
        }

        cursor_wait();
        wc.service.invoke('ShoppingListServiceRemoveItem', params); //calling the service to save the new list name


    },
    /**
     * Destroys the existing dialogs with outdated data.
     */
    destroyDialog: function () {
        if (FrgMiniWishListUtilJS.dropDownDlg) {
            FrgMiniWishListUtilJS.dropDownDlg.destroyRecursive(); // or dijit.getEnclosingWidget(tag).destroyRecursive();

        }
        FrgMiniWishListUtilJS.dropDownDlg = null;
        showDropdown = false;
    },
    
    /**
     * Add to cart from MiniWishList
     */
    addItem2ShopCart : function(catEntryIdentifier , quantity)
	{
		var params = [];
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId			= this.langId;
		params.orderId		= ".";
		params.catEntryId	= catEntryIdentifier;
		params.quantity		= quantity;
		var invalidQTY = new RegExp(/^\d*$/);
		if(params.quantity == 0 || params.quantity == "" || !invalidQTY.test(params.quantity)){ 
			MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']); 
			return;
		}
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   
		
		
		wc.service.invoke("AjaxAddOrderItem", params);
		
	
		//

	}

}