//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This file provides the common functions which are specific to the Mini Shopping cart
 */
 
 /**
 * map order_updated to all the services that result in changes to an order
 * @static
 */
var order_updated = {	'AjaxAddOrderItem':'AjaxAddOrderItem',
						'AddOrderItem':'AddOrderItem',
						'AjaxAddOrderItemWithShipingInfo':'AjaxAddOrderItemWithShipingInfo',
						'AjaxDeleteOrderItem':'AjaxDeleteOrderItem',
						'AjaxUpdateOrderItem':'AjaxUpdateOrderItem',
						'AjaxUpdateOrderShippingInfo':'AjaxUpdateOrderShippingInfo',
						'AjaxOrderCalculate':'AjaxOrderCalculate',
						'AjaxLogoff':'AjaxLogoff',
						'AjaxSetPendingOrder':'AjaxSetPendingOrder',
						'AjaxUpdatePendingOrder':'AjaxUpdatePendingOrder',
						'AjaxSingleOrderCancel':'AjaxSingleOrderCancel',
						'AjaxUpdateRewardOption':'AjaxUpdateRewardOption',
						'AjaxAddOrderVarinaItem':'AjaxAddOrderVarinaItem',
						'AjaxAddOrderFiammaItem':'AjaxAddOrderFiammaItem'
					};
										
/**
 * Declares a new render context for the Mini Shopping Cart.
 */
wc.render.declareContext("MiniShoppingCartContext",null,"");

/**
 * Declares a new render context for the Mini Shopping Cart dropdown contents.
 */
wc.render.declareContext("MiniShopCartDropDownContext",null,"");

/**
 * Displays the dropdown content of the mini shopping cart when keyboard keys are used to expand/collapse the dropdown.
 *
 * @param {object} event The event to retrieve the input keyboard key
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniShopCartDropDownEvent(event,relativeId,contentId,contentType){
	console.debug(event.keyCode);
	if(event.keyCode == dojo.keys.DOWN_ARROW){
		showMiniShopCartDropDown(relativeId,contentId,contentType);
		dojo.stopEvent(event);
	}
	else if(event.keyCode == dojo.keys.ENTER){
		showMiniShopCartDropDown(relativeId,contentId,contentType);
		dojo.stopEvent(event);
	}
}

/**
 * Displays the dropdown content of the mini shopping cart when the user hovers over the 
 * mini shopping cart or uses keyboard keys to expand the dropdown.
 *
 * @param {object} event The event triggered from user actions
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniShopCartDropDown(relativeId,contentId,contentType){

	//Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
	var t = dojo.byId(relativeId);
	var c = dojo.coords(t,true);
	/* CUSTOM Coords
	 * @autor caugelli
	 * var x1 = c.x - 130;
	 * var y1 = c.y + c.h;
	 */
	var x1 = 0;
	var y1 = 0;
	
	
    /*By default, the content of the mini shop cart will be displayed immediately after the mini shop cart title.
     *But we want the content to display under the mini shop cart title. So we'll need to get the width
     *of the shop cart and then shift it*/
	var cartWidth =dojo.coords(dojo.byId('widget_minishopcart'),true).w;
	
	if(dojo.isIE == 8){			
		cartWidth = dojo.coords(dojo.byId('widget_minishopcart'),true).w
	}else if (dojo.isIE>=7 && dojo.isIE<8) {
		cartWidth =dojo.coords(dojo.byId('miniShopCartBody'),true).w;
	}else if(dojo.isIE < 7){
		cartWidth = originalMiniCartWidth;
	}
	
	//dojo.style(dojo.byId("quick_cart"), "width", cartWidth+'px');
	
	/* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
	if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time before calling Dialog.show() method reset the (x,y) co-ordinates. 
	The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
	*/
    var dlgX=x1; //this value is good for ff3, IE8 & languages

    if(dojo.isIE){
    	dlgX = x1 + dojo.contentBox(dojo.byId(relativeId)).w-cartWidth;
    }
    
	if(dropDownDlg){
		dropDownDlg.y = y1;
		dropDownDlg.x = dlgX;
	}

	/* Dialog is not yet created..Create one */
	if(!dropDownDlg){
		var pane = document.getElementById(contentId);
		var dialogTitleElement = document.getElementById(contentId + "_ACCE_Label");
		if (dialogTitleElement != null) {
			dropDownDlg = new wc.widget.WCDialog({relatedSource: relativeId, x:x1, y:y1, title:dialogTitleElement.innerHTML},pane);
		} else {
			dropDownDlg = new wc.widget.WCDialog({relatedSource: relativeId, x:x1, y:y1},pane);
		}
		dropDownDlg.x=dlgX;
	}
	

	if(!dropDownDlg.displayStatus){
		//If not displaying the dialog, then change the contents based on the contentType.. 
		//If we are displaying the dialog, then do not change the content of the dialog widget..
		
		dropDownDlg.closeOnTimeOut = false; // Do not close the dialog on timeout.
		dropDownDlg.autoClose = false; // Do not close the dialog when it loses focus. Use the Close button.
		if(contentType == 'orderItemsList' || contentType == 'orderItemsListAutoClose'){
			dojo.byId("MiniShopCartProductsList").style.display = "block";
			dojo.byId("MiniShopCartProductAdded").style.display = "none";

			if (contentType == 'orderItemsListAutoClose') {
				dropDownDlg.autoClose = true;
			}
			
			/*	CUSTOM START 
			 * @author caugelli */
			$jq("#MiniShopCartProductsList").addClass("frg_panel");
			$jq("#quick_cart_container").css("right","0px");
			$jq("#quick_cart_container").css("position","absolute");
			/* END */
		}
		else if(contentType == 'orderItemAdded'){
			dojo.byId("MiniShopCartProductsList").style.display = "none";
			dojo.byId("MiniShopCartProductAdded").style.display = "block";
			
			/*	CUSTOM START 
			 * @author caugelli */
			$jq("#MiniShopCartProductAdded").addClass("frg_panel");
			$jq("#quick_cart_container").css("right","0px");
			$jq("#quick_cart_container").css("position","absolute");
			/* END */
		}
	}
	if(dojo.isIE < 7)
	{	
		document.getElementById("quick_cart_container").style.display = "block";
	}
	setTimeout(dojo.hitch(dropDownDlg,"show",null),5);
	setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
}

/**
* Sets the URL of the specified controller.
* 
* @param {string} controllerId The id of the target controller.
* @param {string} url The link to specify for the controller.
*/       
function setMiniShopCartControllerURL(url){
	  wc.render.getRefreshControllerById('MiniShoppingCartController').url = url;
}


/** 
 * Declares a new refresh controller for the Mini Shopping Cart.
 */
wc.render.declareRefreshController({
       id: "MiniShoppingCartController",
       renderContext: wc.render.getContextById("MiniShoppingCartContext"),
       url: "",
       formId: "",
       actionId: ""
    	   
       /** 
        * Refreshs the mini shopping cart.
        * If a new order item is added via an Ajax service call, set the mini shopping cart to display the new order item in the dropdown.
        * Otherwise, only refresh the contents of mini shopping cart to the updated order information.
        * This function is called when a modelChanged event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              
              this.actionId = message.actionId;
              
              if(message.actionId in order_updated || message.actionId == 'AjaxDeleteOrderItemForShippingBillingPage'){
                     var param = [];
                     // Nel caso esista in pagina un campo hidden con nome "disableMiniWLCart" il cuo valore sia "true" 
                     if ( document.getElementById('disableMiniWLCart') && document.getElementById('disableMiniWLCart').value=='true'  ){
                    	 // Imposto sul widget del miniShopcart il parametro che disabilita l'apertura del minishopcart a video
                    	 param.disableMiniWLCart = 'true';
                     }
                     if(message.actionId == 'AddOrderItem' || message.actionId == 'AjaxAddOrderVarinaItem' || message.actionId == 'AjaxAddOrderFiammaItem'){
                            param.addedOrderItemId = message.orderItemId + "";
                            showDropdown = true;
                     }
                     widget.refresh(param);
              }
       }
		
       /** 
        * Destroys the old mini shopping cart dialog with previous order information.
        * If order item was added, display the mini shopping cart dropdown with the new order item added contents.
        * This function is called after a successful refresh. 
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              
              //The dialog contents has changed..so destroy the old dialog with stale data..
              destroyDialog();

              if(showDropdown){
                     //We have added item to cart..So display the drop down with item added message..
                     showMiniShopCartDropDown("widget_minishopcart",'quick_cart_container','orderItemAdded',true);
                     showDropdown = false;
              }
              else
              {//Visualizza il minishopcart con i nuovi dati
            	  FrgMinishopCartUtilJS.showMC();
              }
              // per caricare javascript che serve x aggiungere i prodtti alla wishlist
  			dojo.query('div[id^="shoppingListScript_"]').forEach(function(node, index, nodelist){
				dojo.eval(node.innerHTML);
			});
  			
  			// Controllo per il configuratore vara varina USA per nascondere il link Login / Register del widget MiniShopCart
  			if (this.actionId == 'AjaxAddOrderVarinaItem' || FrgMinishopCartUtilJS.frgVarinaConfigurator == true){
  				FrgVarinaConfiguratorJS.hideFrgPanelHeader();
  				FrgVarinaConfiguratorJS.showPanelMC();
  			}
  			else{
  	            // Invocazione per aggiornare il carrello lato Oracle Recommendations
  	            // aggiunto parametro recommendationTag per condizionare la chiamata
				
  	       	   if (FrgMiniWishListUtilJS.recommendationTag == true)	{
  	       		   callATGSvcs("minicart")
  	       	   }
			   
				
  			}
       }

})


FrgMinishopCartUtilJS = { 
	
		lastRemovedItemId : "-1",
		
		frgVarinaConfigurator : false,
	
		/**
		 * Visualizza il Minicart
		 */
	   showMC: function() {
			showMiniShopCartDropDown('widget_minishopcart','quick_cart_container','orderItemsList');
			return true;
			
	   },
		/**
		 * Nasconde il Minicart
		 */
       hideMC: function() {
			$jq("#quick_cart_container").hide();
			return true;
       },
       /**
        * Elimina dal Mini Cart l'elemento specificato
        */
       removeFromMC: function(orderItemId) {
    	   if (orderItemId != this.lastRemovedItemId ) {
    		   this.lastRemovedItemId = orderItemId;
    		   CheckoutHelperJS.myUpdateCart(0,orderItemId);
        	   cursor_clear();
    	   }
    	   return true;
    	  
       }
}

 
/**
 * Displays the dropdown content of the mini shopping cart when the user hovers over the 
 * mini shopping cart or uses keyboard keys to expand the dropdown.
 *
 * @param {object} event The event triggered from user actions
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 * @param {string} show Boolean to indicate the visibility of popup.
 */
function showMiniShopCartDropDown(relativeId,contentId,contentType,show){

	if (show == true){	
		//Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
		var t = dojo.byId(relativeId);
		var c = dojo.coords(t,true);
		var x1 = 0;
		var y1 = 0;
		
		
	    /*By default, the content of the mini shop cart will be displayed immediately after the mini shop cart title.
	     *But we want the content to display under the mini shop cart title. So we'll need to get the width
	     *of the shop cart and then shift it*/
		var cartWidth =dojo.coords(dojo.byId('widget_minishopcart'),true).w;
		
		if(dojo.isIE == 8){			
			cartWidth = dojo.coords(dojo.byId('widget_minishopcart'),true).w
		}else if (dojo.isIE>=7 && dojo.isIE<8) {
			cartWidth =dojo.coords(dojo.byId('miniShopCartBody'),true).w;
		}else if(dojo.isIE < 7){
			cartWidth = originalMiniCartWidth;
		}
		
		/* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
		if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time before calling Dialog.show() method reset the (x,y) co-ordinates. 
		The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
		*/
	    var dlgX=x1; //this value is good for ff3, IE8 & languages
	
	    if(dojo.isIE){
	    	dlgX = x1 + dojo.contentBox(dojo.byId(relativeId)).w-cartWidth;
	    }
	    
		if(dropDownDlg){
			dropDownDlg.y = y1;
			dropDownDlg.x = dlgX;
		}
	
		/* Dialog is not yet created..Create one */
		if(!dropDownDlg){
			var pane = document.getElementById(contentId);
			var dialogTitleElement = document.getElementById(contentId + "_ACCE_Label");
			if (dialogTitleElement != null) {
				dropDownDlg = new wc.widget.WCDialog({relatedSource: relativeId, x:x1, y:y1, title:dialogTitleElement.innerHTML},pane);
			} else {
				dropDownDlg = new wc.widget.WCDialog({relatedSource: relativeId, x:x1, y:y1},pane);
			}
			dropDownDlg.x=dlgX;
		}
		
	
		if(!dropDownDlg.displayStatus){
			//If not displaying the dialog, then change the contents based on the contentType.. 
			//If we are displaying the dialog, then do not change the content of the dialog widget..
			
			dropDownDlg.closeOnTimeOut = false; // Do not close the dialog on timeout.
			dropDownDlg.autoClose = false; // Do not close the dialog when it loses focus. Use the Close button.
			if(contentType == 'orderItemsList' || contentType == 'orderItemsListAutoClose'){
				dojo.byId("MiniShopCartProductsList").style.display = "block";
				dojo.byId("MiniShopCartProductAdded").style.display = "none";
	
				if (contentType == 'orderItemsListAutoClose') {
					dropDownDlg.autoClose = true;
				}
				
				/*	CUSTOM START 
				 * @author caugelli */
				$jq("#MiniShopCartProductsList").addClass("frg_panel");
				$jq("#quick_cart_container").css("right","0px");
				$jq("#quick_cart_container").css("position","absolute");
				/* END */
				
				/*	CUSTOM START  */
				if ($jq("#totalNumberOfItems").val() > 1 ){
					$jq("#product_list").addClass("scroll-pane-minishopcart");
					
					/* JScrollPane for minishopcart - START */
					/* Panel inizialization */
					
						scroller = $jq('#product_list').jScrollPane({
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
					
					/* JScrollPane for minishopcart - END */ 
					
				}
				/* END */	
	
			}
			else if(contentType == 'orderItemAdded'){
				dojo.byId("MiniShopCartProductsList").style.display = "none";
				dojo.byId("MiniShopCartProductAdded").style.display = "block";
				
				/*	CUSTOM START 
				 * @author caugelli */
				$jq("#MiniShopCartProductAdded").addClass("frg_panel");
				$jq("#quick_cart_container").css("right","0px");
				$jq("#quick_cart_container").css("position","absolute");
				/* END */
			}
		}
		if(dojo.isIE < 7)
		{	
			document.getElementById("quick_cart_container").style.display = "block";
		}
		setTimeout(dojo.hitch(dropDownDlg,"show",null),5);
		setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
	}
}

function getRecommendationCategoryName(categoryId) {
    console.log("invoked getRecommendationCategoryName with categoryId = "+categoryId);
    if (categoryId != null ){
        var catname = getCatJSON()[categoryId];
        if (catname != null )
		    return catname;
    }
    return '';
}

// Calls the ATG/Oracle Recommendations shop cart script.
function callATGSvcs(sourceName){
     var cartProductIds = "";
		if (dojo.byId("cartProductIds") != null ){
			// SKU prodotti nel carrello con quantita fra parentesi ( es. "1234(2),6667(1),77754(3)" )
			cartProductIds = dojo.byId("cartProductIds").value;
		}
		
		var productsPartNumbers = "";
		var skuArray = cartProductIds.split(',');
		// Per ogni prodotto nel carrello
		for (var x in skuArray){
			var partNumber =  skuArray[x].substring(0, skuArray[x].indexOf('('));
			var qty = skuArray[x].substring( skuArray[x].indexOf('(')+1,  skuArray[x].indexOf(')'));
			// Ripeto SKU tante volte quant'e' la quantita 
			for (var y =0; y < qty;y++){
				productsPartNumbers = productsPartNumbers + "'" + partNumber + "'" + ',';
			}
		}
		// Rimuovo ultima virgola
		if ( productsPartNumbers.indexOf(',') >=0){
			productsPartNumbers = productsPartNumbers.substring(0, productsPartNumbers.lastIndexOf(','));
		}
		
		// Aggiorno la mappa JSON con il contenuto del carrello
		ATGSvcs.CFG.cart = eval({ 'productIds' : [productsPartNumbers] });

		if (sourceName != null && sourceName == "cart" && dojo.byId("reccRendererSlotName") != null){
			// Valori presi dalla OrderItemDetail.jsp
			var reccRendererSlotName = dojo.byId("reccRendererSlotName").value;
			var reccRendererReccNum = dojo.byId("reccRendererReccNum").value;
			var reccRendererLabel = dojo.byId("reccRendererLabel").value;
			// Creao gli slots come mappa JSON
			if (reccRendererSlotName == 'cart_slot'){
				ATGSvcs.SLOTS = { 'cart_slot' : { 'numRecs' : reccRendererReccNum, 'headerText' : reccRendererLabel, '-inc-price' : 'true' } };
			}
			else if (reccRendererSlotName == 'login_slot'){
				ATGSvcs.SLOTS = { 'login_slot' : { 'numRecs' : reccRendererReccNum, 'headerText' : reccRendererLabel, '-inc-price' : 'true' } };
			}
			else if (reccRendererSlotName == 'myaccount_slot'){
				ATGSvcs.SLOTS = { 'myaccount_slot' : { 'numRecs' : reccRendererReccNum, 'headerText' : reccRendererLabel, '-inc-price' : 'true' } };
			}
			//Invoco script ATG/Oracle per aggiornare carrello e mostrare renderer Oracle
			ATGSvcs.do_request(false, true);
		}
		else{
			//Invoco script ATG/Oracle per aggiornare carrello lato Oracle
			ATGSvcs.do_request(false, false);
		}
}

function getCatJSON()  {
	return categoriesJSON;    
}