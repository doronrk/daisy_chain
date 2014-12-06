
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

shoppingActionsJS={
	/** The StoreKey Value **/
	company: "",

	/** The language ID currently in use **/
	langId: "-1",
	
	/** The store ID rently in use **/
	storeId: "",
	
	/** The catalog ID rently in use **/
	catalogId: "",
	
	/** Holds the current user type such as guest or registered user. Allowed values are 'G' for guest and 'R' for registered.**/
	userType: "",
	
	/** A boolean used in a variety of the add to cart methods to tell whether or not the base item was added to the cart. **/
	baseItemAddedToCart: false,
	
	/** An array of entitled items which is used in various methods throughout ShoppingActions.js **/
	entitledItems: [],
	
	/** a JSON object that holds attributes of an entitled item **/
    entitledItemJsonObject: null,
	
	/** A map of attribute name value pairs for the currently selected attribute values **/
	selectedAttributesList: {},
	
	/** A variable used to form the url dynamically for the more info link in the Quickinfo popup */
	moreInfoUrl: "",
	
	/**
	* A boolean used to to determine is it from a Qick info popup or not. 
	**/
	isPopup: false,
	
	/**
	* A boolean used to to determine whether or not to diplay the price range when the catEntry is selected. 
	**/
	displayPriceRange: true,

	/**
	* This array holds the json object retured from the service, holding the price information of the catEntry.
	**/
	itemPriceJsonOject: [],
	
	/** 
	* stores all name and value of all swatches 
	* this is a 2 dimension array and each record i contains the following information:
	* allSwatchesArray[i][0] - attribute name of the swatch
	* allSwatchesArray[i][1] - attribute value of the swatch
	* allSwatchesArray[i][2] - image1 of swatch (image to use for enabled state)
	* allSwatchesArray[i][3] - image2 of swatch (image to use for disabled state)
	* allSwatchesArray[i][4] - onclick action of the swatch when enabled
	**/
	allSwatchesArrayList: {},
	
	/**
	* Holds the ID of the image used for swatch
	**/
	skuImageId: "",
	
	/**
	 * The prefix of the cookie key that is used to store item Ids. 
	 */
	cookieKeyPrefix: "CompareItems_",
	
	/**
	 * The delimiter used to separate item Ids in the cookie.
	 */
	cookieDelimiter: ";",
	
	/**
	 * The maximum number of items allowed in the compare zone. 
	 */
	maxNumberProductsAllowedToCompare: 4,
	
	/**
	 * The minimum number of items allowed in the compare zone. 
	 */
	minNumberProductsAllowedToCompare: 2,
	
	/**
	 * Id of the base catalog entry. 
	 */
	baseCatalogEntryId: 0,

	/**
	 * An map which holds the attributes of a set of products
	 */
	selectedProducts: {},
	
	/**
	 * An array to keep the quantity of the products in a list (bundle)
	 */
	productList: {},
	
	/**
	 * stores the currency symbol
	 */
	currencySymbol: "",
	
	/**
	 * stores the compare return page name
	 */
	compareReturnName: "",
	
	acloseQuickView:"",
	
	setCompareReturnName:function(compareReturnName){
		this.compareReturnName = compareReturnName;
	},
	
	setCompany:function(company){
		this.company = company;
		//alert(company);
	},
	setCommonParameters:function(langId,storeId,catalogId,userType,currencySymbol){
		this.langId = langId;
		this.storeId = storeId;
		this.catalogId = catalogId;
		this.userType = userType;
		this.currencySymbol = currencySymbol;
	},
	
	setEntitledItems : function(entitledItemArray){
		this.entitledItems = entitledItemArray;
	},
	
	getCatalogEntryId : function(entitledItemId){
		var attributeArray = [];
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveSKU(attributeArray);
	},
	
	/**
	* getCatalogEntryIdforProduct Returns the catalog entry ID for a catalog entry that has the same attribute values as a specified product's selected attributes as passed in via the selectedAttributes parameter.
	*
	* @param {String[]} selectedAttributes The array of selected attributes upon which to resolve the SKU.
	*
	* @return {String} catalog entry ID of the SKU.
	*
	**/
	getCatalogEntryIdforProduct : function(selectedAttributes){
		var attributeArray = [];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveSKU(attributeArray);
	},
	
	/**
     * retrieves the entitledItemJsonObject
     */
    getEntitledItemJsonObject: function () {
    	return this.entitledItemJsonObject;
    },
	
	/**
	* resolveSKU Resolves a SKU using an array of defining attributes.
	*
	* @param {String[]} attributeArray An array of defining attributes upon which to resolve a SKU.
	*
	* @return {String} catentry_id The catalog entry ID of the SKU.
	*
	**/
	resolveSKU : function(attributeArray){
    	var catIdAndErrorMsgArray = [];
	
		console.debug("Resolving SKU >> ", attributeArray, this.entitledItems);
		//var catentry_id = null;
		var attributeArrayCount = attributeArray.length;
		
		for(x in this.entitledItems){
			var catentry_id = this.entitledItems[x].catentry_id;
			var Attributes = this.entitledItems[x].Attributes;
			var attributeCount = 0;
			for(index in Attributes){
				attributeCount ++;
			}

			// Handle special case where a catalog entry has one sku with no attributes
			if (attributeArrayCount == 0 && attributeCount == 0){
				catIdAndErrorMsgArray.push(catentry_id);
				return catIdAndErrorMsgArray;
			}
			if(attributeCount != 0 && attributeArrayCount >= attributeCount){
				var matchedAttributeCount = 0;

				for(attributeName in attributeArray){
					var attributeValue = attributeArray[attributeName];
					if(attributeValue in Attributes){
						matchedAttributeCount ++;
					}
				}
				
				if(attributeCount == matchedAttributeCount){
					console.debug("CatEntryId:" + catentry_id + " for Attribute: " + attributeArray);
					catIdAndErrorMsgArray.push(catentry_id);
					return catIdAndErrorMsgArray;
				}
			}
		}
		catIdAndErrorMsgArray.push(null);
		for (var i = 0; i < attributeArrayCount; i++)
			{
			 var index = attributeArray[i].indexOf("_");
			 var entitledSwatchName = attributeArray[i].substring(0, index);
			 catIdAndErrorMsgArray.push(entitledSwatchName);

			}
		return catIdAndErrorMsgArray;
	},
	
	/**
	* setSelectedAttribute Sets the selected attribute value for a particular attribute not in reference to any catalog entry.
	*					   One place this function is used is on CachedProductOnlyDisplay.jsp where there is a drop down box of attributes.
	*					   When an attribute is selected from that drop down this method is called to update the selected value for that attribute.
	*
	* @param {String} selectedAttributeName The name of the attribute.
	* @param {String} selectedAttributeValue The value of the selected attribute.
	*
	**/
	setSelectedAttribute : function(selectedAttributeName , selectedAttributeValue, entitledItemId){ 
		// AK: this console.debug was causing errors in my ie8 testing, commenting out (not sure why just this console.debug line)
		//console.debug(selectedAttributeName +" : "+ selectedAttributeValue);
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		if(selectedAttributes == null || 'undefined' === typeof(selectedAttributes)){
			selectedAttributes = {};
		}
		selectedAttributes[selectedAttributeName] = selectedAttributeValue;
		this.moreInfoUrl=this.moreInfoUrl+'&'+selectedAttributeName+'='+selectedAttributeValue;
		this.selectedAttributesList[entitledItemId] = selectedAttributes;
	},
	
	/**
	* setSelectedAttributeOfProduct Sets the selected attribute value for an attribute of a specified product.
	*								This function is used to set the assigned value of defining attributes to specific 
	*								products which will be stored in the selectedProducts map.
	*
	* @param {String} productId The catalog entry ID of the catalog entry to use.
	* @param {String} selectedAttributeName The name of the attribute.
	* @param {String} selectedAttributeValue The value of the selected attribute.
	* @param {boolean} true, if it is single SKU
	*
	**/
	setSelectedAttributeOfProduct : function(productId,selectedAttributeName,selectedAttributeValue, isSingleSKU){
		
		
		if(selectedAttributesForProduct == null || 'undefined' === typeof(selectedAttributesForProduct)){
			var selectedAttributesForProduct = null;
		}
	//	var tempproductId=productId.split("_"); 
		
	//	productId = productId[1];
		//var selectedAttributesForProduct = this.selectedAttributesList[entitledItemId];

		if(this.selectedProducts[productId]){
			selectedAttributesForProduct = this.selectedProducts[productId];
		} else {
			selectedAttributesForProduct = {};
		}
		
		selectedAttributesForProduct[selectedAttributeName] = selectedAttributeValue;
		this.selectedProducts[productId] = selectedAttributesForProduct;
		
		//the json object for entitled items are already in the HTML. 
		var entitledItemJSON = eval('('+ dojo.byId("entitledItem_"+productId).innerHTML +')');

		this.setEntitledItems(entitledItemJSON);
		
		var tempCat = [];
		tempCat = this.getCatalogEntryIdforProduct(selectedAttributesForProduct);
		var catalogEntryId = tempCat[0];
		
		if(catalogEntryId == null) {
			catalogEntryId = 0;
		} else {
			this.changePrice("entitledItem_"+productId, false, false, productId);
		}
		var productDetails = null;
		if(this.productList[productId]){
			productDetails = this.productList[productId];
		} else {
			productDetails = {};
			this.productList[productId] = productDetails;
			productDetails.baseItemId = productId;
		}
		
		productDetails.id = catalogEntryId;
		if(productDetails.quantity){
			dojo.publish('quantityChanged', [dojo.toJson(productDetails)]);
		}
		
		if(!isSingleSKU){
			// publish the attribute change event
			dojo.publish('attributesChanged_'+productId, [dojo.toJson(selectedAttributesForProduct)]);
		}
	},
	
	/**
	* Add2ShopCartAjax This function is used to add a catalog entry to the shopping cart using an AJAX call. This will resolve the catentryId using entitledItemId and adds the item to the cart.
	*				This function will resolve the SKU based on the entitledItemId passed in and call {@link fastFinderJS.AddItem2ShopCartAjax}.
	* @param {String} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {int} quantity The quantity of the item to add to the cart.
	* @param {String} isPopup If the value is true, then this implies that the function was called from a quick info pop-up. 	
	* @param {Object} customParams - Any additional parameters that needs to be passed during service invocation.
	*
	**/
	Add2ShopCartAjax : function(entitledItemId,quantity,isPopup,customParams)
	{	
		//FIX for the defect 1700.
		quantity = dojo.byId('quantity').value;
		
		var entitledItemJSON;
       
		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
		var tempCat = [];
		  tempCat = this.getCatalogEntryId(entitledItemId);
		var catalogEntryId = tempCat[0];
		
		if(catalogEntryId != null){
			this.AddItem2ShopCartAjax(catalogEntryId, quantity, customParams);
			this.baseItemAddedToCart=true;
			if(dijit.byId('second_level_category_popup') != null){
				hidePopup('second_level_category_popup');
			}
		}
		else if (isPopup == true){
			dojo.byId('second_level_category_popup').style.zIndex = '1';
			var errorMsg = 'ERR_RESOLVING_SKU'+ '_'+ tempCat[1].toUpperCase();
			MessageHelper.formErrorHandleClient('addToCartLinkAjax', MessageHelper.messages[errorMsg]);			
		} else{
			var errorMsg = 'ERR_RESOLVING_SKU'+ '_'+ tempCat[1].toUpperCase();
			MessageHelper.displayErrorMessage(MessageHelper.messages[errorMsg]);
			this.baseItemAddedToCart=false;
		}
	},
	/** 
	 * Hides the Product Quick Info pop-up.
	 * 
	 * @param {string} id The id of the Product Quick Info pop-up to hide.
	 * @param {object} event The event triggered from user actions.
	 */		
	hideQuickInfoPopup: function (id,event){
		parent.dijit.byId("quickLookPopup").hide();
		//parent.dijit.byId("quickLookPopup")
	if(event!=null && event.type=="keypress" && event.keyCode!="27"){
			return;
		}else{		
			var quickInfo = dijit.byId(id);
			
			if(quickInfo != null){
				quickInfo.hide();
			}
		}
	},
	
	AddItem2ShopCartAjax : function(catEntryIdentifier, quantity, customParams)
	{
		// Google Analytics Begin
		// For quick info page, set _addEvenMap variable in parent window, because that is where the google cart event is sent.
		quickInfoPage = (('undefined' === typeof quickInfoPage) || (quickInfoPage === null)) ? false : quickInfoPage;
		var hasParentWindow = (('undefined' === typeof parent) || (parent === null)) ? false : true;
		var eventObjPtr = (quickInfoPage && hasParentWindow) ? parent._addEventMap : _addEventMap;
		
		
		eventObjPtr.action = 'Add';
		eventObjPtr.opt_value = quantity;
		
		if (customParams != null && customParams != 'undefined' && customParams['partNumber'] != null && customParams['partNumber'] != undefined) {
			eventObjPtr.opt_name = customParams['partNumber'];
			delete customParams['partNumber'];
		} else {
			eventObjPtr.opt_name = '';
		}
		// Google Analytics End		

		var params = [];
		params.storeId		= storeId;
		params.catalogId	= catalogId;
		params.langId		= langId;
		params.orderId		= ".";
		params.calculationUsage = "-1,-2,-5,-6,-7";
		/****
		* International Shipping changes UC-7.
		* Sending attribute in request properties to avoid promotion for international orders,while adding item to cart.
		*****/
		if(UtilitiesJS.isIntlFlowRequired()){
			params.intlNonUsFlag="Y";	
		}else{
			params.intlNonUsFlag="N";
		}
		/**
		*International Shipping UC-7 Changes end
		***/
		var ajaxShopCartService = "AddOrderItem";
		// alert("This is quantity : "+quantity); //Wai-Ming
		// alert("This is catEntryIdentifier : "+catEntryIdentifier); //Wai-Ming
		// alert("This is cutomParams : "+customParams); //Wai-Ming
		if(dojo.isArray(catEntryIdentifier) && dojo.isArray(quantity)){
			for(var i=0; i<catEntryIdentifier.length; i++){
				if(!isPositiveInteger(quantity[i])){
					MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
					return;
				}
				params["catEntryId_" + (i+1)] = catEntryIdentifier[i];
				params["quantity_" + (i+1)]	= quantity[i];
			}
		}
		else{
			if(!isPositiveInteger(quantity)){
				MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
				return;
			}
			params.catEntryId	= catEntryIdentifier;
			params.quantity		= quantity;
		}		

		//Pass any other customParams set by other add on features
		if(customParams != null && customParams != 'undefined'){
			for(i in customParams){
				params[i] = customParams[i];
			}
			if(customParams['catalogEntryType'] == 'dynamicKit' ){
				ajaxShopCartService = "AjaxAddPreConfigurationToCart";
				//alert("ajaxShopCartService 1 : "+ajaxShopCartService)//Wai-Ming
			}
			//adding droship to params
			if(customParams['dropShip'] != null && customParams['dropShip'] != undefined){
				params['dropShip'] = customParams['dropShip'];
			}
			//end
		}

		var contractIdElements = document.getElementsByName('contractSelectForm_contractId');
		//alert("contactIdElements : "+contractIdElements);//Wai-Ming
		if (contractIdElements != null && contractIdElements != "undefined") {
			for (i=0; i<contractIdElements.length; i++) {
				if (contractIdElements[i].checked) {
					params.contractId = contractIdElements[i].value;
					break;
				}
			}
		}
		
		var skipForIE ='N';
		
	    if (navigator.appName == 'Microsoft Internet Explorer') {

	        var ua = navigator.userAgent;

	        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

	        if (re.exec(ua) != null) {         
	        	 // alert("IE check") ;
	        	  skipForIE='Y';
	           
	           
	        }

	    }

		
		//For Handling multiple clicks
	  //Wai-Ming - Removing multiple click check entirely to enable Add To Cart
	 /*   if (skipForIE=='N') {
	    	 // alert("not IE safe to check") ;
	    	if(!submitRequest()){
				return;
			}		    	
	    }
		if(!submitRequest()){
			return;
		} 
		cursor_wait();	*/
		//alert("params : "+params);//Wai-Ming
		//alert("ajaxShopCartService 2 : "+ajaxShopCartService)//Wai-Ming
		wc.service.invoke(ajaxShopCartService, params);
		this.baseItemAddedToCart=true;
		
		if(document.getElementById("headerShopCartLink")&&document.getElementById("headerShopCartLink").style.display != "none")
		{   //alert("display none");//Wai-Ming
			
			document.getElementById("headerShopCart").focus();
		}
		else
		{    
		//alert("display something");//Wai-Ming
			if(document.getElementById("headerShopCart1")){
				
				document.getElementById("headerShopCart1").focus();
			}
		}
	},
	
	/**
	* AddBundle2ShopCartAjax This function is used to add a bundle to the shopping cart.
	**/
	AddBundle2ShopCartAjax : function(){
		var ajaxShopCartService = "AddOrderItem";
		var params = [];
        var quanExistsFlag = false;
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.orderId		= ".";
		params.calculationUsage = "-1,-2,-5,-6,-7";
		
		var idx = 1;
		for(productId in this.productList){
			var productDetails = this.productList[productId];
			if(productDetails.id == 0){
				MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
				return;
			}
			var quantity = document.getElementById("quantity_" + productId).value;
			if(isNaN(quantity) || quantity > 0){
				quanExistsFlag = true;
				params["catEntryId_" + idx] = productDetails.id;
				params["quantity_" + idx++] = quantity;
				this.baseItemAddedToCart=true;
				var entitledItemId = "entitledItem_"+productDetails.baseItemId;
				var el = dojo.byId(entitledItemId);
				var entitledItemJSON = '';
				if (el != null) {
					//the json object for entitled items are already in the HTML. 
					 entitledItemJSON = eval('('+ el.innerHTML +')');
					 this.setEntitledItems(entitledItemJSON);
						for (var x in this.entitledItems) {
							var catID = this .entitledItems[x].catentry_id;
							var vDSEnabled = '';
							if (catID == productDetails.id) {
								vDSEnabled = this.entitledItems[x].VDSEnabled || '';
								if(vDSEnabled == 'Y')
									{
									params['dropShip'] = catID  ;
									}
							}
						}
				}
			}
		}
		if(!quanExistsFlag){
			MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
			return;
		}
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   		
		cursor_wait();		
		wc.service.invoke(ajaxShopCartService, params);

	},
	
	/* SwatchCode start */

	/**
	*setSKUImageId Sets the ID of the image to use for swatch.
	**/
	setSKUImageId:function(skuImageId){
		this.skuImageId = skuImageId;
	},
	
	/**
	* getImageForSKU Returns the full image of the catalog entry with the selected attributes as specified in the {@link fastFinderJS.selectedAttributes} value.
	*					This method uses resolveImageForSKU to find the SKU image with the selected attributes values.
	*
	* @param {String} imageField, the field name from which the image should be picked
	* @return {String} path to the SKU image.
	* 
	*
	**/
	getImageForSKU : function(entitledItemId, imageField){
		var attributeArray = [];
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveImageForSKU(attributeArray, imageField);
	},
	
	/**
	* resolveImageForSKU Resolves image of a SKU using an array of defining attributes.
	*
	* @param {String[]} attributeArray An array of defining attributes upon which to resolve a SKU.
	* @param {String} imageField, the field name from which the image should be picked
	*
	* @return {String} imagePath The location of SKU image.
	*
	**/
	resolveImageForSKU : function(attributeArray, imageField){
		console.debug("Resolving SKU >> " + attributeArray +" >> ", this.entitledItems);
		var imagePath = "";
		var imageThumbSKU = "";
		var attributeArrayCount = attributeArray.length;
		
	try {
		for(x in this.entitledItems){
			if(null != imageField){
				var imagePath = this.entitledItems[x][imageField];
			} else {
				var imagePath = this.entitledItems[x].ItemImage.replace(/&amp;/g, '&');
				var imageThumbSKU = this.entitledItems[x].ItemThumbUPC;
			}
			
			var Attributes = this.entitledItems[x].Attributes;
			var attributeCount = 0;
			for(index in Attributes){
				attributeCount ++;
			}

			// Handle special case where a catalog entry has one sku with no attributes
			if (attributeArrayCount == 0 && attributeCount == 0){
				var imageArray = [];
				imageArray.push(imagePath);
				imageArray.push(imageThumbSKU);
				
				return imageArray;
			}
			if(attributeCount != 0 && attributeArrayCount >= attributeCount){
				var matchedAttributeCount = 0;

				for(attributeName in attributeArray){
					var attributeValue = attributeArray[attributeName];
					if(attributeValue in Attributes){
						matchedAttributeCount ++;
					}
				}
				
				if(attributeCount == matchedAttributeCount){
					console.debug("ItemImage:" + imagePath + " for Attribute: " + attributeArray);
					var imageArray = [];
					imageArray.push(imagePath);
					imageArray.push(imageThumbSKU);
					imageArray.push(this.entitledItems[x].ItemThumbnailImage.replace(/&amp;/g, '&'));
					if(this.entitledItems[x].ItemAngleThumbnail != null && this.entitledItems[x].ItemAngleThumbnail != undefined){
						imageArray.push(this.entitledItems[x].ItemAngleThumbnail);
						imageArray.push(this.entitledItems[x].ItemAngleFullImage);
					}
					return imageArray;
				}
			}
		}
		
		 //Run some code here
		  }
		catch(err)
		  {
			 console.debug("Error in resolveImageForSKU " + err );
		  }
  
		return null;
	},


	/**
	* changeViewImages Updates the angle views of the SKU.
	*
	* @param {String[]} itemAngleThumbnail An array of SKU view thumbnails.
	* @param {String[]} itemAngleFullImage An array of SKU view full images.
	**/
	changeViewImages : function(itemAngleThumbnail, itemAngleFullImage){
		var imageCount = 0;
		for (x in itemAngleThumbnail) {
			var prodAngleCount = imageCount;
			imageCount++;
			if(null != dojo.byId("WC_CachedProductOnlyDisplay_images_1_" + imageCount)){
				dojo.byId("WC_CachedProductOnlyDisplay_images_1_" + imageCount).src = itemAngleThumbnail[x];
			}
			if(null != dojo.byId("WC_CachedProductOnlyDisplay_links_1_" + imageCount)){
				dojo.byId("WC_CachedProductOnlyDisplay_links_1_" + imageCount).href =
					"JavaScript:changeThumbNail('productAngleLi" + prodAngleCount + "','" + itemAngleFullImage[x] + "');";
			}
			
			if(null != dojo.byId("productAngleLi" + prodAngleCount) && dojo.byId("productAngleLi" + prodAngleCount).className == "selected"){
				changeThumbNail("productAngleLi" + prodAngleCount, itemAngleFullImage[x]);
			}
		}
	},


	// Handles to alt image click events to be used within changeProdImage.  Needed so that
	//  multiple duplicate events are not tied to a link.
	mainImgClickHandle: null,
	alt1ImgClickHandle: null,
	alt2ImgClickHandle: null,

	/**
	* updates the product image from the PDP page to use the selected SKU image
	* @param String swatchAttrName the newly selection attribute name
	* @param String swatchAttrValue the newly selection attribute value
	* @param {String} imageField, the field name from which the image should be picked
	**/
	changeProdImage: function(entitledItemId, swatchAttrName, swatchAttrValue, skuImageId, imageField){
		
quickInfoPage = (('undefined' === typeof quickInfoPage) || (quickInfoPage === null)) ? false : quickInfoPage;
bundlePage = (('undefined' === typeof bundlePage) || (bundlePage === null)) ? false : bundlePage;
coachInfoPage = (('undefined' === typeof coachInfoPage) || (coachInfoPage === null)) ? false : coachInfoPage;
		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}

		this.setEntitledItems(entitledItemJSON);

		var skuImage = null;
		var skuimageThumb = null;
		var imageThumbSKU = null;
		var main =null;						
		var alt1 =null;
		var alt2 =null;
		var company = (this.company && this.company != '' ? this.company : company);
		var imageArr = shoppingActionsJS.getImageForSKU(entitledItemId, imageField);
		var SUZEPICKS = null;
		if(prodImageOverlay != null && prodImageOverlay != undefined){
			SUZEPICKS = prodImageOverlay;
		}
		if(imageArr != null){
			skuImage = imageArr[0];
			skuimageThumb = imageArr[1];
		}
		
		if(skuImageId != undefined){
			this.setSKUImageId(skuImageId);
		}
		
		if(skuImage != null){
			if(dojo.byId(this.skuImageId) != null || quickInfoPage || bundlePage){
				
				if( bundlePage)
				{
					/*Part of defect 2685 fix : using relative URL - This means the browser will fill in the protocol automatically depending on what mode the page is already in.
					
					document.getElementById("big1").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$QUICKVIEWLARGE$";
				    document.getElementById("quickmain").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";				
					document.getElementById("quickalt1").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
					document.getElementById("quickalt2").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
					*/
					var name="bundle_"+entitledItemId;
					if(typeof isProductOutOfStock != 'undefined' && isProductOutOfStock){
						if(SUZEPICKS != null){
							document.getElementById(name).src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$outofstock$&$THUMBLARGE$" + "&$" + SUZEPICKS + "$";
						}
						else{
							document.getElementById(name).src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$outofstock$&$THUMBLARGE$";
						}
					} else{
						if(SUZEPICKS != null){
							document.getElementById(name).src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBLARGE$" + "&$" + SUZEPICKS + "$";
						}
						else{
							document.getElementById(name).src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBLARGE$";
						}
					}
					
				   
					/*END - Part of defect 2685 fix*/
				}
				else{
				
				
				if(true != quickInfoPage && true != coachInfoPage)
				{
					document.getElementById(this.skuImageId).src = skuImage;
					/*Part of defect 2685 fix : using relative URL - This means the browser will fill in the protocol automatically depending on what mode the page is already in.
					  
				    document.getElementById("main").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";				
					document.getElementById("alt1").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
					document.getElementById("alt2").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
					*/
					
					
					if(SUZEPICKS != null){
						document.getElementById("main").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";				
						document.getElementById("alt1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
						document.getElementById("alt2").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
					}
					else{
						document.getElementById("main").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";				
						document.getElementById("alt1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
						document.getElementById("alt2").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
					}
					
					/*END - Part of defect 2685 fix*/
					// AndyK - SP1764 and RTC2478 fix - here specifically, adding click event for alt images to chnage main img.
					if (this.mainImgClickHandle != null) dojo.disconnect(this.mainImgClickHandle);					
					this.mainImgClickHandle = dojo.connect(dojo.byId((quickInfoPage) ? "quickmain" : "main"), "onclick", function(evt){				
						swapImage(company + "/" + skuimageThumb  + "_main");
					});
					if (this.alt1ImgClickHandle != null) dojo.disconnect(this.alt1ImgClickHandle);
					this.alt1ImgClickHandle = dojo.connect(dojo.byId((quickInfoPage) ? "quickalt1" : "alt1"), "onclick", function(evt){				
						swapImage(company + "/" + skuimageThumb  + "_alt1");
					});
					if (this.alt2ImgClickHandle != null) dojo.disconnect(this.alt2ImgClickHandle);
					this.alt2ImgClickHandle = dojo.connect(dojo.byId((quickInfoPage) ? "quickalt2" : "alt2"), "onclick", function(evt){				
						swapImage(company + "/" + skuimageThumb  + "_alt2");
					});
				}
				if( quickInfoPage)
				{
					/*Part of defect 2685 fix : using relative URL - This means the browser will fill in the protocol automatically depending on what mode the page is already in.
					
					document.getElementById("big1").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$QUICKVIEWLARGE$";
				    document.getElementById("quickmain").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";				
					document.getElementById("quickalt1").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
					document.getElementById("quickalt2").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
					*/
					if(typeof isProductOutOfStock != 'undefined' && isProductOutOfStock){
						if(SUZEPICKS != null){
							document.getElementById("big1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$outofstock$&$QUICKVIEWLARGE$" + "&$" + SUZEPICKS + "$";
						}
						else{
							document.getElementById("big1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$outofstock$&$QUICKVIEWLARGE$";
						}
					} else{
						if(SUZEPICKS != null){
							document.getElementById("big1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$QUICKVIEWLARGE$" + "&$" + SUZEPICKS + "$";
						}
						else{
							document.getElementById("big1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$QUICKVIEWLARGE$";
						}
					}
					if(SUZEPICKS != null){
						if (document.getElementById("quickmain") != null)
						{
							document.getElementById("quickmain").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";				
						}
						
						if (document.getElementById("quickalt1") != null)
						{
							document.getElementById("quickalt1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
						}
						
						if (document.getElementById("quickalt2") != null)
						{
							document.getElementById("quickalt2").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
						}
						
					}
					else{
						if (document.getElementById("quickmain") != null)
						{
							document.getElementById("quickmain").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";				
						}
						
						if (document.getElementById("quickalt1") != null)
						{
							document.getElementById("quickalt1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
						}
						if (document.getElementById("quickalt2") != null)
						{
							document.getElementById("quickalt2").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
						}
					}
				    
					/*END - Part of defect 2685 fix*/
				}

				// sjFlyout will be undefined function for quickview
				if (typeof(sjFlyout) == 'function') sjFlyout("flyzoom",skuImage);				
				var itemAngleThumbnail = imageArr[2];
				var itemAngleFullImage = imageArr[3];
				if(itemAngleThumbnail != null && itemAngleThumbnail != undefined){
					shoppingActionsJS.changeViewImages(itemAngleThumbnail, itemAngleFullImage);
				}
			}}
		} else {
			var imageThumbSKU = null;
			var imageFound = false;
						
			for (x in this.entitledItems) {
				var Attributes = this.entitledItems[x].Attributes;
				if(null != imageField){
					var itemImage = this.entitledItems[x][imageField];
				} else {
					var itemImage = this.entitledItems[x].ItemImage;
					var imageThumbSKU = this.entitledItems[x].ItemThumbUPC;
					// sjFlyout will be undefined function for quickview
					if (typeof(sjFlyout) == 'function') sjFlyout("flyzoom",itemImage);
				}
				
				
				var itemAngleThumbnail = this.entitledItems[x].ItemAngleThumbnail;
				var itemAngleFullImage = this.entitledItems[x].ItemAngleFullImage;
	
				for(y in Attributes) {
					var index = y.indexOf("_");
					var entitledSwatchName = y.substring(0, index);
					var entitledSwatchValue = y.substring(index+1);	
					
					if (entitledSwatchName == swatchAttrName && entitledSwatchValue == swatchAttrValue) {
						// This null check added because quickview, this will not exist
						if (document.getElementById(this.skuImageId) != null) document.getElementById(this.skuImageId).src = itemImage;
						if(true != quickInfoPage && true != coachInfoPage)
						{
						//document.getElementById(this.skuImageId).src = skuImage;
						var main =null;						
						var alt1 =null;
						var alt2 =null;
						/*Part of defect 2685 fix : using relative URL - This means the browser will fill in the protocol automatically depending on what mode the page is already in.
						
					   document.getElementById("main").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";				
						document.getElementById("alt1").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
						document.getElementById("alt2").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
						*/
										
						if(SUZEPICKS != null){
							document.getElementById("main").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
							document.getElementById("alt1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
							document.getElementById("alt2").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
						}
						else{
							document.getElementById("main").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";
							document.getElementById("alt1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
							document.getElementById("alt2").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
						}
						
						/*END - Part of defect 2685 fix*/
						}
					if( quickInfoPage)
					{
						/*Part of defect 2685 fix : using relative URL - This means the browser will fill in the protocol automatically depending on what mode the page is already in.
							
					document.getElementById("big1").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$QUICKVIEWLARGE$";
				    document.getElementById("quickmain").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";				
					document.getElementById("quickalt1").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
					document.getElementById("quickalt2").src = "http://s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
					*/
					if(typeof isProductOutOfStock != 'undefined' && isProductOutOfStock){
						if(SUZEPICKS != null){
							document.getElementById("big1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$outofstock$&$QUICKVIEWLARGE$" + "&$" + SUZEPICKS + "$";
						}
						else{
							document.getElementById("big1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$outofstock$&$QUICKVIEWLARGE$";
						}
					} else{
						if(SUZEPICKS != null){
							document.getElementById("big1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$QUICKVIEWLARGE$" + "&$" + SUZEPICKS + "$";
						}
						else{
							document.getElementById("big1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$QUICKVIEWLARGE$";
						}
					}
					
					if(SUZEPICKS != null){
						document.getElementById("quickmain").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";				
						document.getElementById("quickalt1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
						document.getElementById("quickalt2").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$" + "&$" + SUZEPICKS + "$";
					}
					else{
						document.getElementById("quickmain").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_main?$THUMBSMALL$";				
						document.getElementById("quickalt1").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt1?$THUMBSMALL$";
						document.getElementById("quickalt2").src = "//s7d9.scene7.com/is/image/" + company + "/" + skuimageThumb + "_alt2?$THUMBSMALL$";
					}	
						/*END - Part of defect 2685 fix*/
					}
						if(itemAngleThumbnail != null && itemAngleThumbnail != undefined){
							shoppingActionsJS.changeViewImages(itemAngleThumbnail, itemAngleFullImage);
						}
						imageFound = true;
						break;
					}
				}
				
				if(imageFound) {
					break;
				}
			}
			if(true != quickInfoPage && true != coachInfoPage)
			{
			var main =dojo.byId("main");						
			var alt1 =dojo.byId("alt1");
			var alt2 =dojo.byId("alt2");
			dojo.connect(main, "onclick", function(evt){				
				 swapImage(company + "/" + imageThumbSKU  + "_main");
				});
			dojo.connect(alt1, "onclick", function(evt){				
				 swapImage(company + "/" + imageThumbSKU  + "_alt1");
				});
			dojo.connect(alt2, "onclick", function(evt){				
				 swapImage(company + "/" + imageThumbSKU  + "_alt2");
				});
			}
		}
	},
	
	/**
	 * 
	 **/
	findSwatchAttribute: function(name, val, name2) {
		var an = name+'_'+val;
		if (this.entitledItems) {
			var items = this.entitledItems;
			for (var i = 0; i < items.length; i++ ) {
				var attrs = items[i].Attributes;
				var oos = items[i].outOfStock;
				if (!oos && attrs) {
					for (var j in attrs) {
						if (j == an) {
							for (var k in attrs) {
								 var p = k.indexOf('_');
								 if (p && k.substring(0, p) == name2) {
									 return k.substring(p+1);
								 }
							}
						}
					}
				}
			}
		}
		
		return null;
	},
	
	/**
	* Handles the case when a swatch is selected. Set the border of the selected swatch.
	* @param {String} selectedAttributeName The name of the selected swatch attribute.
	* @param {String} selectedAttributeValue The value of the selected swatch attribute.
	* @param {String} entitledItemId The ID of the SKU
	* @param {String} doNotDisable The name of the swatch attribute that should never be disabled.
	* @param {String} imageField, the field name from which the image should be picked
	* @return boolean Whether the swatch is available for selection
	**/
	selectSwatch: function(selectedAttributeName, selectedAttributeValue, entitledItemId, doNotDisable, skuImageId, imageField, count) {
	
	
		var id = "swatch_" + entitledItemId + "_" + selectedAttributeValue;
		if (dojo.byId(id)) {
			if(dojo.hasClass(id, "color_swatch_disabled")){
				return false;
			}
	
			var selectedAttributes = this.selectedAttributesList[entitledItemId];
			
			for (attribute in selectedAttributes) {
				
				if (attribute == selectedAttributeName) {
					// case when the selected swatch is already selected with a value, if the value is different than
					// what's being selected, reset other swatches and deselect the previous value and update selection
					if (selectedAttributes[attribute] != selectedAttributeValue) {
						// deselect previous value and update swatch selection
						var el = document.getElementById("swatch_" + entitledItemId + "_" + selectedAttributes[attribute]);
						if (el && el.className == 'color_swatch_selected') {
							shoppingActionsJS.setSwatchClass("swatch_" + entitledItemId + "_" + selectedAttributes[attribute], "color_swatch");
						}
					}
				}
			}
			
			//
			if (count) {
				dojo.query('span[id^="swatch_selection_'+entitledItemId+'_VendorColor_"]').forEach(function(n){
				    n.innerHTML = '';
				});
			}
		}
		//
		this.makeSwatchSelection(selectedAttributeName, selectedAttributeValue, entitledItemId, doNotDisable, skuImageId, imageField, count);
	},
	
	selectDropdownSwatch: function(entitledItemId, swatchName) {
		var sel = document.getElementById("organizationSelect");
		var selval = sel.options[sel.selectedIndex].value;
		if(selval=="") {
			return;
		}
		var idx = selval.indexOf("_");
		var selectedAttributeName = selval.substr(0,idx);
		var selectedAttributeValue = selval.substr(idx+1);
		var entitledItem = "entitledItem_"+entitledItemId;
		this.setSelectedAttribute(selectedAttributeName, selectedAttributeValue, entitledItem);
		
		var id = "swatch_selection_entitledItem_" + entitledItemId + "_" + swatchName;
		dojo.byId(id).innerHTML = selectedAttributeValue;
		
		shoppingActionsJS.notifyAttributeChange(entitledItemId);
		
		shoppingActionsJS.changePrice(entitledItem,false,true,entitledItemId); 
		
		shoppingActionsJS.checkInventory(entitledItem);
	},
	
	/**
	* Make swatch selection - add to selectedAttribute, select image, and update other swatches and SKU image based on current selection.
	* @param {String} swatchAttrName The name of the selected swatch attribute.
	* @param {String} swatchAttrValue The value of the selected swatch attribute.
	* @param {String} entitledItemId The ID of the SKU.
	* @param {String} doNotDisable The name of the swatch attribute that should never be disabled.	
	* @param {String} imageField, the field name from which the image should be picked
	**/
	makeSwatchSelection: function(swatchAttrName, swatchAttrValue, entitledItemId, doNotDisable, skuImageId, imageField, count) {
		
		
		bundlePage = (('undefined' === typeof bundlePage) || (bundlePage === null)) ? false : bundlePage;
		this.setSelectedAttribute(swatchAttrName, swatchAttrValue, entitledItemId);
		
		//var el = document.getElementById("swatch_" + entitledItemId + "_" + swatchAttrValue);
		//el.className = "color_swatch_selected";
		var el = dojo.byId("swatch_" + entitledItemId + "_" + swatchAttrValue);
		if (el) {
			shoppingActionsJS.setSwatchClass("swatch_" + entitledItemId + "_" + swatchAttrValue, "color_swatch_selected");
		}
		
		var sel = document.getElementById("swatch_selection_" + entitledItemId + "_" + swatchAttrName + (count ? "_" + count : ''));
		if (sel) {
			sel.innerHTML = swatchAttrValue;
		}
		
		this.updateSwatchImages(swatchAttrName, entitledItemId, doNotDisable, swatchAttrValue);
		
		this.changeProdImage(entitledItemId, swatchAttrName, swatchAttrValue, skuImageId, imageField);
		

		//this.updateColorDropdown(swatchAttrName,swatchAttrValue, entitledItemId);
		
	},
	
	updateColorDropdown: function (swatchAttrName,swatchAttrValue, entitledItemId) {
		var id = "swatch_" + entitledItemId + "_" + swatchAttrValue;
		if (dojo.byId(id)) {
			if(dojo.hasClass(id, "color_swatch_disabled")){
				return false;
			}
		}
		document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchAttrValue).selected ="true";
	},
		
	/**
	* Constructs record and add to this.allSwatchesArray.
	* @param {String} swatchName The name of the swatch attribute.
	* @param {String} swatchValue The value of the swatch attribute.	
	* @param {String} swatchImg1 The path to the swatch image.
	**/
	addToAllSwatchsArray: function(swatchName, swatchValue, swatchImg1, entitledItemId) {
		
		var swatchList = this.allSwatchesArrayList[entitledItemId];
		if(swatchList == null){
			swatchList = new Array();;
		}
		if (!this.existInAllSwatchsArray(swatchName, swatchValue, swatchList)) {
			var swatchRecord = new Array();
			swatchRecord[0] = swatchName;
			swatchRecord[1] = swatchValue;
			swatchRecord[2] = swatchImg1;
			if(document.getElementById("swatch_link_" + entitledItemId + "_" + swatchValue) != null){
				swatchRecord[4] = document.getElementById("swatch_link_" + entitledItemId + "_" + swatchValue).onclick;
			}
			swatchList.push(swatchRecord);
			this.allSwatchesArrayList[entitledItemId] = swatchList;
		}
	},

	/**
	* Checks if a swatch is already exist in this.allSwatchesArray.
	* @param {String} swatchName The name of the swatch attribute.
	* @param {String} swatchValue The value of the swatch attribute.		
	* @return boolean Value indicating whether or not the specified swatch name and value exists in the allSwatchesArray.
	*/
	existInAllSwatchsArray: function(swatchName, swatchValue, swatchList) {
		for(var i=0; i<swatchList.length; i++) {
			var attrName = swatchList[i][0];
			var attrValue = swatchList[i][1];
			if (attrName == swatchName && attrValue == swatchValue) {
				return true;
			}
		}
		return false;
	},
	
	/**
	* Check the entitledItems array and pre-select the first entited SKU as the default swatch selection.
	* @param {String} entitledItemId The ID of the SKU.
	* @param {String} doNotDisable The name of the swatch attribute that should never be disabled.		
	**/
	makeDefaultSwatchSelection: function(entitledItemId, doNotDisable) {
		if (this.entitledItems.length == 0) {
			if (dojo.byId(entitledItemId)!=null) {
				 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
			}
			this.setEntitledItems(entitledItemJSON);
		}
		
		// need to make selection for every single swatch
		for(x in this.entitledItems){
			var Attributes = this.entitledItems[x].Attributes;
			for(y in Attributes){
				var index = y.indexOf("_");
				var swatchName = y.substring(0, index);
				var swatchValue = y.substring(index+1);
				this.makeSwatchSelection(swatchName, swatchValue, entitledItemId, doNotDisable);
			}
			break;
		}
	},
	
	/**
	* Update swatch images - this is called after selection of a swatch is made, and this function checks for
	* entitlement and disable swatches that are not available
	* @param selectedAttrName The attribute that is selected
	* @param {String} entitledItemId The ID of the SKU.
	* @param {String} doNotDisable The name of the swatch attribute that should never be disabled.	
	**/
	updateSwatchImages: function(selectedAttrName, entitledItemId, doNotDisable, swatchAttrValue) {
		bundlePage = (('undefined' === typeof bundlePage) || (bundlePage === null)) ? false : bundlePage;
		var swatchToUpdate = new Array();
		var cssUpdateArray = new Array();
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		var selectedAttrValue = selectedAttributes[selectedAttrName];
		var swatchList = this.allSwatchesArrayList[entitledItemId];
		
		// finds out which swatch needs to be updated, add to swatchToUpdate array
		for(var i=0; swatchList != null && i<swatchList.length; i++) {
			var attrName = swatchList[i][0];
			var attrValue = shoppingActionsJS.unescapeHTML(swatchList[i][1]);
			var attrImg1 = swatchList[i][2];
			var attrImg2 = swatchList[i][3];
			var attrOnclick = swatchList[i][4];
	
			if (attrName == selectedAttrName) {
				var swatchRecord1 = new Array();
				swatchRecord1[0] = attrName;
				swatchRecord1[1] = attrValue;
				swatchRecord1[2] = attrImg1;
				swatchRecord1[4] = attrOnclick;
				swatchRecord1[5] = false;
				cssUpdateArray.push(swatchRecord1);
			}
			
			if (attrName != doNotDisable && attrName != selectedAttrName) {
				var swatchRecord = new Array();
				swatchRecord[0] = attrName;
				swatchRecord[1] = attrValue;
				swatchRecord[2] = attrImg1;
				swatchRecord[4] = attrOnclick;
				swatchRecord[5] = false;
				swatchToUpdate.push(swatchRecord);
			}
		}
		
		//updating the css changes for the selected swatch
		for(z in cssUpdateArray){
			var attrn = cssUpdateArray[z][0];
			var attrval = cssUpdateArray[z][1];
			var aa = document.getElementById(attrn + "_" + attrval);
			if (aa) {
				if(attrval == swatchAttrValue && attrn == selectedAttrName) {	
					aa.className="cur";
				} else {
					aa.className="sug";
				}
			}
			
		}
		
		// finds out which swatch is entitled, if it is, image should be set to enabled
		// go through entitledItems array and find out swatches that are entitled 
		var updateCount = 0;
		for (x in this.entitledItems) {
			var Attributes = this.entitledItems[x].Attributes;

			for(y in Attributes){
				var index = y.indexOf("_");
				var entitledSwatchName = y.substring(0, index);
				var entitledSwatchValue = y.substring(index+1);	
				
				//the current entitled item has the selected attribute value
				if (entitledSwatchName == selectedAttrName && entitledSwatchValue == selectedAttrValue) {
					//go through the other attributes that are available to the selected attribute
					//exclude the one that is selected
					for (z in Attributes) {
						var index2 = z.indexOf("_");
						var entitledSwatchName2 = z.substring(0, index2);
						var entitledSwatchValue2 = z.substring(index2+1);
						
						if(y != z){ //only check the attributes that are not the one selected
							for (i in swatchToUpdate) {
								var swatchToUpdateName = swatchToUpdate[i][0];
								var swatchToUpdateValue = swatchToUpdate[i][1];
								
								if (entitledSwatchName2 == swatchToUpdateName && entitledSwatchValue2 == swatchToUpdateValue) {
									swatchToUpdate[i][5] = true;
									updateCount++;
								}
							}
						}
					}
				}
			}
		}

		// Now go through swatchToUpdate array, and update swatch images
		var disabledAttributes = [];
		var isDefault = (updateCount > 0);
		var defaultAttributeName, defaultAttributeValue;
		for (i in swatchToUpdate) {
			var swatchToUpdateName = swatchToUpdate[i][0];
			var swatchToUpdateValue = swatchToUpdate[i][1];
			var swatchToUpdateImg1 = swatchToUpdate[i][2];
			var swatchToUpdateImg2 = swatchToUpdate[i][3];
			var swatchToUpdateOnclick = swatchToUpdate[i][4];
			var swatchToUpdateEnabled = swatchToUpdate[i][5];	
			
			var swatchEl = document.getElementById(swatchToUpdateName+'_'+swatchToUpdateValue);
			var node = document.getElementById("swatch_" + entitledItemId + "_" + swatchToUpdateValue);
			var link = document.getElementById("swatch_link_" + entitledItemId + "_" + swatchToUpdateValue);
			var dropdown = document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue);
			
			if (swatchEl) {
				swatchEl.className = 'sug';
			}
			if (node) {
				shoppingActionsJS.setSwatchClass("swatch_" + entitledItemId + "_" + swatchToUpdateValue, "color_swatch");
			}
			if (swatchToUpdateEnabled) {
				if (link) {
					link.onclick = swatchToUpdateOnclick;
				}
				//select previously selected attribute or first available one 
				if (isDefault || (selectedAttributes[swatchToUpdateName] == swatchToUpdateValue)) {
					isDefault = false;
					defaultAttributeName = swatchToUpdateName;
					defaultAttributeValue = swatchToUpdateValue;
					
					if (dropdown) {
						dropdown.selected = true;
					}
				}
			} else {
				if(swatchToUpdateName != doNotDisable){
					if (node) {
						shoppingActionsJS.setSwatchClass("swatch_" + entitledItemId + "_" + swatchToUpdateValue, "color_swatch_disabled");
					}
					if (link) {
						link.onclick = null;
					}

					//The previously selected attribute is now unavailable for the new selection
					//Need to switch the selection to an available value
					//if(selectedAttributes[swatchToUpdateName] == swatchToUpdateValue){
					//	disabledAttributes.push(swatchToUpdate[i]);
					//}
				}
			}
			
			if (dropdown) {
				dropdown.style.display = (swatchToUpdateEnabled ? 'block' : 'none');
			}
		}
		
		if (defaultAttributeName && defaultAttributeValue) {
			var el =document.getElementById(defaultAttributeName+'_'+defaultAttributeValue);
			if (el) {
				el.className = 'cur';
			}
			el = document.getElementById("swatch_" + entitledItemId + "_" + defaultAttributeValue);
			if (el) {
				shoppingActionsJS.setSwatchClass("swatch_" + entitledItemId + "_" + defaultAttributeValue, "color_swatch_selected");
			}
			el = document.getElementById("swatch_selection_" + entitledItemId + "_" + defaultAttributeName);
			if (el) {
				el.innerHTML = defaultAttributeValue;
			}
			
			this.setSelectedAttribute(defaultAttributeName, defaultAttributeValue, entitledItemId);
			if(bundlePage)
			{
				var productId=entitledItemId.split("_"); 
			    productId = productId[1];
			    shoppingActionsJS.setSelectedAttributeOfProduct(productId, defaultAttributeName, defaultAttributeValue, false);
			}
		}
	},
	/* SwatchCode end */
		
	/**
	* This function is used to change the price displayed in the Product Display Page on change of  a attribute of the product using an AJAX call. 
	* This function will resolve the catentryId using entitledItemId and displays the price of the catentryId.
	*				
	* @param {Object} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {Boolean} isPopup If the value is true, then this implies that the function was called from a quick info pop-up.
	* @param {Boolean} displayPriceRange If the value is true, then display the price range. If it is false then donot display the price range.
	*
	**/
	changePrice : function(entitledItemId,isPopup,displayPriceRange,productId,bridalISEligible,isBuyable,tempListPrice){
		this.displayPriceRange = displayPriceRange;
		this.isPopup = isPopup;
		var entitledItemJSON;
	    var listPrice='';
	    var offerPrice='';
	    var smartvalue='';
	    var sublistPrice='';
	    var subofferPrice='';
	    var saleFlag = false;
	    var bridalEligibility = bridalISEligible;
	    var el = dojo.byId(entitledItemId);
		if (el != null && !this.isPopup) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ el.innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		var catalogEntryId = null;
		this.setEntitledItems(entitledItemJSON);
		var tempCat = [];
		if(this.selectedProducts[productId]){
			tempCat = this.getCatalogEntryIdforProduct(this.selectedProducts[productId]);
			var catalogEntryId = tempCat[0];
		} else {
			tempCat = this.getCatalogEntryId(entitledItemId);
			var catalogEntryId = tempCat[0];
		}
		
		var priceDisplay = document.getElementById('price_display_'+productId);
		priceDisplay.style.display = "block";
		priceDisplay.innerHTML = '<span></span>';

		if (catalogEntryId) {
			//check if the json object is already present for the catEntry.
			if(this.itemPriceJsonOject[catalogEntryId] != null && this.itemPriceJsonOject[catalogEntryId] != 'undefined'){
				this.displayPrice(this.itemPriceJsonOject[catalogEntryId].catalogEntry,productId);
				//console.debug("ShoppingActions.changePrice: using stored json object.");
			}
			//if json object is not present, call the service to get the details.
			else {
				for (var x in this.entitledItems) {
					var catID = this .entitledItems[x].catentry_id;
					if(catID == catalogEntryId) {
		  				 listPrice = this.entitledItems[x].listPrice;
		  				 offerPrice = this.entitledItems[x].offerPrice;
		  				 smartvalue = this.entitledItems[x].smartvalue;
		  				 saleFlag = this.entitledItems[x].saleFlag;
		  			}
		  		}

				//points
				if (typeof pointsCalculation !== 'undefined') {
					var pointsEl = document.getElementById('points');
					if (pointsEl && offerPrice) {
						// 4355 Fix - Andy - modified to calculate proper points for both English and French currency
						// For Fr, remove all non-numeric characters except commas, and replace comma with dot
						// For En, remove all non-numeric characters except dots.
						var points = (langId == '-25') ? 
							parseInt(parseFloat(offerPrice.replace(/[^\d,]/g, '').replace(/\,/g, '.')) * pointsCalculation) :
							parseInt(parseFloat(offerPrice.replace(/[^\d.]/g, '')) * pointsCalculation); 

						pointsEl.innerHTML = (points > 0 ? points : '');
					}
				}
				
				//price
				var innerHTML = '';
				smartvalue = smartvalue || '';
				listPrice = listPrice || '';
				offerPrice = offerPrice || '';
				if(bridalEligibility =='Y' && isBuyable==0){ 
					
						var tempOfferPrice = "";
						innerHTML = '<span id="price" class="ora">' + tempListPrice + '</span>' ;
			           // + '<span id="offerPrice" class="sale" >' + smartvalue +'</span>';
				}else{
					if(!saleFlag){
						innerHTML = '<span id="price" class="ora">' + offerPrice + '</span>' +
						            '<span id="offerPrice" class="sale" >' + smartvalue +'</span>';
									
					}
					else{
						// Defect 2052 fix - switch offerPrice and smartvalue positioning

					innerHTML = '<span id="listPrice" class="ora">' + listPrice + '</span>' +
								'<span id="offerPrice" class="sale">' + smartvalue + ' ' + offerPrice + '</span>';
					}
				}
				priceDisplay.innerHTML = innerHTML;
				innerHTML = '';
			}
		}
		else {
			//console.debug("ShoppingActions.changePrice: all attributes are not selected.");
		}
		/**
		*International Shipping UC-7 Changes start
		***/
		var cookieValue=dojo.cookie("INTL");
		if(cookieValue!=null && typeof(cookieValue) != 'undefined'){
			var splitValues=cookieValue.split("|");
			var cookieCountry = splitValues[1];
			if(cookieCountry !== "US"){	
				if(HBCLocalizationUtilJS!=null && typeof(HBCLocalizationUtilJS) != 'undefined'){
					HBCLocalizationUtilJS.fnInitialize();
				}
			}
		}
		/**
		*International Shipping UC-7 Changes end
		***/		
	},
	
	/** 
	 * Displays price of the catEntry selected with the JSON objrct returned from the server.
	 * 
	 * @param {object} serviceRepsonse The JSON response from the service.
	 * @param {object} ioArgs The arguments from the service call.
	 */	
	 displayPriceServiceResponse : function(serviceResponse, ioArgs){
		var productId = ioArgs['args'].content['productId'];
		//stores the json object, so that the service is not called when same catEntry is selected.
		shoppingActionsJS.itemPriceJsonOject[serviceResponse.catalogEntry.catalogEntryIdentifier.uniqueID] = serviceResponse;
		
		shoppingActionsJS.displayPrice(serviceResponse.catalogEntry,productId);
	 },
	 
	
	 
	 /** 
	 * Displays price of the attribute selected with the JSON oject.
	 * 
	 * @param {object} catEntry The JSON object with catalog entry details.
	 */	
	 displayPrice : function(catEntry,productId){

		var tempString;
		var popup = shoppingActionsJS.isPopup;

		if(popup == true){
			document.getElementById('productPrice').innerHTML = catEntry.offerPrice;
			document.getElementById('productName').innerHTML = catEntry.description[0].name;
			document.getElementById('productSKUValue').innerHTML = catEntry.catalogEntryIdentifier.externalIdentifier.partNumber;
		}
		
		if(popup == false){
			var innerHTML = "";
			var listPrice = dojo.currency.parse(catEntry.listPrice,{symbol: this.currencySymbol});
			var offerPrice = dojo.currency.parse(catEntry.offerPrice,{symbol: this.currencySymbol});
			
			this.setPriceInProductList(productId,offerPrice);
			
			if(!catEntry.listPriced || listPrice <= offerPrice){
				innerHTML = "<span id='price' class='price'>" + catEntry.offerPrice + "</span>";
			}
			else{
				innerHTML = "<span id='listPrice' class='old_price'>" + catEntry.listPrice + "</span>"+
							"<span id='offerPrice' class='price'>" + catEntry.offerPrice + "</span>";
			}
			document.getElementById('price_display_'+productId).innerHTML = innerHTML;
			
			innerHTML = "";
			if(shoppingActionsJS.displayPriceRange == true){
				for(var i in catEntry.priceRange){
					if(catEntry.priceRange[i].endingNumberOfUnits == catEntry.priceRange[i].startingNumberOfUnits){
						tempString = storeNLS['PQ_PRICE_X'];
						innerHTML = innerHTML + "<p>" + dojo.string.substitute(tempString,{0: catEntry.priceRange[i].startingNumberOfUnits});
					}
					else if(catEntry.priceRange[i].endingNumberOfUnits != 'null'){
						tempString = storeNLS['PQ_PRICE_X_TO_Y'];
						innerHTML = innerHTML + "<p>" + dojo.string.substitute(tempString,{0: catEntry.priceRange[i].startingNumberOfUnits, 
							1: catEntry.priceRange[i].endingNumberOfUnits});
					}
					else{
						tempString = storeNLS['PQ_PRICE_X_OR_MORE'];
						innerHTML = innerHTML + "<p>" + dojo.string.substitute(tempString,{0: catEntry.priceRange[i].startingNumberOfUnits});
					}					
					innerHTML = innerHTML + "<span class='price'>" + catEntry.priceRange[i].localizedPrice + "</span></p>";
				}
			}
			quantityDiscount = dojo.query(".quantity_discount")[0];
			if(null != quantityDiscount){
				if("" != innerHTML){
					innerHTML = storeNLS['PQ_PURCHASE'] + innerHTML;
				}
				quantityDiscount.innerHTML = innerHTML;
			}
			document.getElementById('product_name_'+productId).innerHTML = catEntry.description[0].name;
			if(document.getElementById('product_SKU_'+productId)){
				document.getElementById('product_SKU_'+productId).innerHTML = storeNLS['SKU'] + " " + catEntry.catalogEntryIdentifier.externalIdentifier.partNumber;
			}
		}
	 },

	/**
	 *This method will show the WC Dialog popup
	 *@param{String} widgetId The ID of the WC Dialog which should be shown
	 */
	showWCDialogPopup : function(widgetId){
		var popup = dijit.byId(widgetId); //Change the id of the popup div if it is changed in the html
		if(popup != null){
			popup.closeButtonNode.style.display='none';
			popup.show();
		}
		else {
			console.debug(widgetId +" does not exist");
		}
	},
	
	/**
	 * To notify the change in attribute to other components that is subscribed to attributesChanged event.
	 */
	notifyAttributeChange: function(catalogEntryID){
		this.baseCatalogEntryId = catalogEntryID;
		var selectedAttributes = this.selectedAttributesList["entitledItem_" + catalogEntryID];
		dojo.publish('attributesChanged_'+catalogEntryID, [dojo.toJson(selectedAttributes)]);
		dojo.publish('attributesChanged', [dojo.toJson(selectedAttributes)]);
	},
	
	/**
	 * To notify the change in quantity to other components that is subscribed to attributesChanged event.
	 */
	notifyQuantityChange: function(quantity){
		dojo.publish('quantityChanged', [quantity]);
	},
	
	/**
	 * Initializes the compare check box for all the products added to compare.
	 */
	initCompare: function(){
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var newCookieValue = "";
		dojo.cookie(cookieKey, newCookieValue, {path:'/'});
	},
	
	/**
	 * Change the compare box status to checked or unchecked
	 * @param{String} cbox The ID of the compare check box of the given catentry identifier.
	 * @param{String} catEntryIdentifier The catalog entry identifer to current product.
	 */
	changeCompareBox: function(cbox,catEntryIdentifier) {
		box = document.getElementById(cbox);
		box.checked = !box.checked;
		this.addOrRemoveFromCompare(catEntryIdentifier,box.checked);
	},
	
	/**
	 * Adds or removes the product from the compare depending on the compare box checked or unchecked.
	 * @param{String} catEntryIdentifier The catalog entry identifer to current product.
	 * @param{boolean} checked True if the checkbox is checked or False
	 */
	addOrRemoveFromCompare: function(catEntryIdentifier,checked){
		//box = eval(cbox);
		if(checked){
			this.addToCompare(catEntryIdentifier);
		}
		else{
			this.removeFromCompare(catEntryIdentifier);
		}
	},
	
	/**
	 * Adds the product to the compare cookie.
	 * @param{String} catEntryIdentifier The catalog entry identifer to current product.
	 */
	addToCompare:function(catEntryIdentifier){
		
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var cookieValue = dojo.cookie(cookieKey);
		
		if(cookieValue != null){
			if(cookieValue.indexOf(catEntryIdentifier) != -1 || catEntryIdentifier == null){
				MessageHelper.displayErrorMessage(MessageHelper.messages["COMPARE_ITEM_EXISTS"]);
				return;
			}
		}
		
		var currentNumberOfItemsInCompare = 0;
		if(cookieValue != null && cookieValue != ""){
			currentNumberOfItemsInCompare = cookieValue.split(this.cookieDelimiter).length;
		}
		
		if (currentNumberOfItemsInCompare < parseInt(this.maxNumberProductsAllowedToCompare)) {
			var newCookieValue = "";
			if(cookieValue == null || cookieValue == ""){
				newCookieValue = catEntryIdentifier;
			}
			else{
				newCookieValue = cookieValue + this.cookieDelimiter + catEntryIdentifier;
			}
			dojo.cookie(cookieKey, newCookieValue, {path:'/'});
			document.getElementById("compare_"+catEntryIdentifier).style.visibility = "visible";
			document.getElementById("compare_"+catEntryIdentifier).style.backgroundColor = "white";
			console.debug("Product added to cookie");
			currentNumberOfItemsInCompare = currentNumberOfItemsInCompare + 1;
			if(currentNumberOfItemsInCompare == this.minNumberProductsAllowedToCompare){
				var compareButtonDisabled = document.getElementById("compare_button_disabled");
				var compareButtonEnabled = document.getElementById("compare_button_enabled");
				//compareButton.className = "button_primary";
				//compareButton.onclick = function()
				//{
				//	setCurrentId('compare_button');
				//	shoppingActionsJS.compareProducts();
				//}
				compareButtonDisabled.style.display = "none";
				compareButtonEnabled.style.display = "block";
				dojo.removeClass("compare_button", "disabled");
			}
		} else {
			//MessageHelper.displayErrorMessage(storeNLS["COMPATE_MAX_ITEMS"]);
			this.showWCDialogPopup('widget_product_comparison_popup');
			document.getElementById("comparebox_"+catEntryIdentifier).checked = false;
			console.debug("You can only compare up to 4 products");				
		}
	},
	
	/**
	 * Removes the product from the compare cookie.
	 * @param{String} catEntryIdentifier The catalog entry identifer to current product.
	 */
	removeFromCompare: function(catEntryIdentifier){
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var cookieValue = dojo.cookie(cookieKey);
		var currentNumberOfItemsInCompare = 0;
		if(cookieValue != null){
			if(dojo.trim(cookieValue) == ""){
				dojo.cookie(cookieKey, null, {expires: -1});
			}else{
				var cookieArray = cookieValue.split(this.cookieDelimiter);
				var newCookieValue = "";
				for(index in cookieArray){
					if(cookieArray[index] != catEntryIdentifier){
						if(newCookieValue == ""){
							newCookieValue = cookieArray[index];
						}else{
							newCookieValue = newCookieValue + this.cookieDelimiter + cookieArray[index];
						}
					}
				}
				dojo.cookie(cookieKey, newCookieValue, {path:'/'});
				currentNumberOfItemsInCompare = newCookieValue.split(this.cookieDelimiter).length;
			}
			document.getElementById("compare_"+catEntryIdentifier).removeAttribute("style");
			console.debug("Product removed from cookie");
			if(currentNumberOfItemsInCompare < this.minNumberProductsAllowedToCompare){
				var compareButtonDisabled = document.getElementById("compare_button_disabled");
				var compareButtonEnabled = document.getElementById("compare_button_enabled");
				//compareButton.className = "button_secondary";
				//compareButton.removeAttribute("onclick");
				compareButtonDisabled.style.display = "inline";
				compareButtonEnabled.style.display = "none";
				dojo.addClass("compare_button", "disabled");
			}
		}
	},
	
	/**
	 * Re-directs the browser to the CompareProductsDisplay page to compare products side-by-side.
	 */
	compareProducts:function(){
		var url = "CompareProductsDisplayView?storeId=" + this.storeId + "&catalogId=" + this.catalogId + "&langId=" + this.langId + "&compareReturnName=" + this.compareReturnName;
		
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var cookieValue = dojo.cookie(cookieKey);
		if(cookieValue != null && dojo.trim(cookieValue) != ""){
			url = url + "&catentryId=" + cookieValue;
		}
		url = url + "&returnUrl=" + encodeURIComponent(document.location.href);
		document.location.href = getAbsoluteURL() + url;
	},
	
	/**
	 * Sets the quantity of a product in the list (bundle)
	 * 
	 * @param {String} catalogEntryType, type of catalogEntry (item/product/bundle/package)
	 * @param {int} catalogEntryId The catalog entry identifer to current product.
	 * @param {int} quantity The quantity of current product.
	 * @param {float} price The price of current product.
	 */
	setProductQuantity: function(catalogEntryType, catalogEntryId, quantity, price){
		var productDetails = null;
		if(this.productList[catalogEntryId]){
			productDetails = this.productList[catalogEntryId];
		} else {
			productDetails = {};
			this.productList[catalogEntryId] = productDetails;
			productDetails.baseItemId = catalogEntryId;
			if("item" == catalogEntryType){
				productDetails.id = catalogEntryId;
			} else {
				productDetails.id = 0;
			}
		}
		productDetails.quantity = quantity;
		dojo.publish('quantityChanged', [dojo.toJson(productDetails)]);
		
		productDetails.price = dojo.number.parse(price);
		this.calculateTotal();
	},
	
	/**
	 * Sets the quantity of a product in the list (bundle)
	 * 
	 * @param {int} catalogEntryId The catalog entry identifer to current product.
	 * @param {int} quantity The quantity of current product.
	 */
	quantityChanged: function(catalogEntryId, quantity){
		if(this.productList[catalogEntryId]){
			var productDetails = this.productList[catalogEntryId];
			productDetails.quantity = dojo.trim(quantity);
			dojo.publish('quantityChanged', [dojo.toJson(productDetails)]);
			this.calculateTotal();
		}
	},
	
	/**
	 * Sets the price of a product in the list (bundle)
	 * 
	 * @param {int} catalogEntryId The catalog entry identifer to current product.
	 * @param {int} price The price of current product.
	 */
	setPriceInProductList: function(catalogEntryId, price){
		var productDetails = this.productList[catalogEntryId];
		if(productDetails){
			productDetails.price = price;
			this.calculateTotal();
		}
	},
	
	/**
	 * Calculates the total bundle price based on the quantity and price of the each item in the bundle
	 */
	calculateTotal: function(){
		var total = 0;
		var isBundle = false;
		for(productId in this.productList){
			isBundle = true;
			var productDetails = this.productList[productId];
			var price = productDetails.price;
			var quantity = dojo.number.parse(productDetails.quantity);
			if(!isNaN(quantity) && quantity > 0){
				total += (quantity*price);
			}
		}
		if(isBundle){
			var bundlePriceDiv = dojo.byId("bundle_price");
			if(bundlePriceDiv != null){
				bundlePriceDiv.innerHTML = dojo.currency.format(total,{round:2, symbol: this.currencySymbol});
			}
		}
	},
	
	/**
	 * Select bundle item swatch
	 * 
	 * @param {int} catalogEntryId The catalog entry identifer to current product.
	 * @param {String} swatchName
	 * @param {String} swatchValue
	 * @param {String} doNotDisable, the first swatch, that should not be disabled
	 */
	 selectBundleItemSwatch: function(catalogEntryId, swatchName, swatchValue, doNotDisable){
		if(dojo.byId("swatch_" + catalogEntryId + "_" + swatchName + "_" + swatchValue) != null){
			if(dojo.hasClass("swatch_" + catalogEntryId + "_" + swatchName + "_" + swatchValue, "color_swatch_disabled")){
				return false;
			}	
		}
		
		if (dojo.byId("entitledItem_"+catalogEntryId)!=null) {
			var entitledItemJSON;
			var currentSwatchkey = swatchName + "_" +swatchValue;
			//the json object for entitled items are already in the HTML. 
			entitledItemJSON = dojo.fromJson(dojo.byId("entitledItem_"+catalogEntryId).innerHTML);
			var validSwatchArr = new Array();
			for(idx in entitledItemJSON){
				var validItem = false;
				var entitledItem = entitledItemJSON[idx];
				for(attribute in entitledItem.Attributes){
					
					if(currentSwatchkey == attribute){
						validItem = true;
						break;
					}
				}
				if(validItem){
					for(attribute in entitledItem.Attributes){
						var currentSwatch = attribute.substring(0, attribute.lastIndexOf("_"));
						if(currentSwatch != doNotDisable && currentSwatch != swatchName){
							validSwatchArr.push(attribute);
						}
					}
				}
			}
			
			var swatchesDisabled = new Array();
			var selectedSwatches = new Array();
			for(idx in entitledItemJSON){
				var entitledItem = entitledItemJSON[idx];
				for(attribute in entitledItem.Attributes){
					var currentSwatch = attribute.substring(0, attribute.lastIndexOf("_"));
					if(currentSwatch != doNotDisable && currentSwatch != swatchName){
						var swatchId = "swatch_" + catalogEntryId +"_" + attribute;
						if(validSwatchArr.indexOf(attribute) > -1){
							if(!dojo.hasClass(swatchId,"color_swatch_selected")){
								shoppingActionsJS.setSwatchClass(swatchId, "color_swatch");
							}
						} else if(swatchesDisabled.indexOf(attribute) == -1){
							swatchesDisabled.push(attribute);
							if(dojo.hasClass(swatchId,"color_swatch_selected")){
								
								selectedSwatches.push(swatchId);
							}
							shoppingActionsJS.setSwatchClass(swatchId, "color_swatch_disabled");
						}
					}
				}
			}
			
			for(idx in selectedSwatches){
				var selectedSwatch = selectedSwatches[idx];
				var idSelector = selectedSwatch.substring(0, selectedSwatch.lastIndexOf("_"));
				var swatchSelected = false;
				dojo.query("[id^='" + idSelector + "']").forEach(function(node, index, arr){
					if(!swatchSelected && dojo.hasClass(node,"color_swatch")){
						var values = node.id.split("_");
						shoppingActionsJS.selectBundleItemSwatch(values[1],values[2],values[3], doNotDisable);
						shoppingActionsJS.setSelectedAttributeOfProduct(values[1],values[2],values[3],false);
						swatchSelected = true;
					}
				});
			}
		}
		
		dojo.byId("swatch_selection_" + catalogEntryId + "_" + swatchName).innerHTML = swatchValue;
		
		var swatchItem = "swatch_" + catalogEntryId + "_" + swatchName + "_";
		
		dojo.query("img[id^='" + swatchItem + "']").forEach(function(node, index, arr){
			if(dojo.hasClass(node, "color_swatch_disabled")){
				dojo.removeClass(node, "color_swatch")
			} else {
				dojo.addClass(node, "color_swatch");
			}
			dojo.removeClass(node, "color_swatch_selected");
		});
		shoppingActionsJS.setSwatchClass(swatchItem + swatchValue, "color_swatch_selected");
		
		this.setSelectedAttributeOfProduct(catalogEntryId, swatchName, swatchValue,false);
		// select image
		this.changeBundleItemImage(catalogEntryId, swatchName, swatchValue, "productThumbNailImage_" + catalogEntryId);
		
	},
	
	changeBundleItemImage: function(catalogEntryId, swatchAttrName, swatchAttrValue, skuImageId){
		var entitledItemId = "entitledItem_" + catalogEntryId;
		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}

		this.setEntitledItems(entitledItemJSON);

		var skuImage = null;
		var imageArr = shoppingActionsJS.getImageForBundleItem(catalogEntryId);
		if(imageArr != null){
			skuImage = imageArr[1];
		}
		
		if(skuImageId != undefined){
			this.setSKUImageId(skuImageId);
		}
		
		if(skuImage != null){
			if(dojo.byId(this.skuImageId) != null){
				document.getElementById(this.skuImageId).src = skuImage;	
			}
		} else {
			var imageFound = false;
			for (x in this.entitledItems) {
				var Attributes = this.entitledItems[x].Attributes;
				var itemImage = this.entitledItems[x].ItemThumbnailImage;
				
				for(y in Attributes){
					var index = y.indexOf("_");
					var entitledSwatchName = y.substring(0, index);
					var entitledSwatchValue = y.substring(index+1);	
					
					if (entitledSwatchName == swatchAttrName && entitledSwatchValue == swatchAttrValue) {
						document.getElementById(this.skuImageId).src = itemImage;		
						imageFound = true;
						break;
					}
				}
				
				if(imageFound){
					break;
				}
			}
		}	
	},
	
	getImageForBundleItem: function(entitledItemId){
		var attributeArray = [];
		var selectedAttributes = this.selectedProducts[entitledItemId];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveImageForSKU(attributeArray);
	},
	
	/**
	 * Check if any product is already selected for compare in other pages and select them
	 */
	checkForCompare: function() {
		var cookieKey = this.cookieKeyPrefix + this.storeId;
		var cookieValue = dojo.cookie(cookieKey);
		var currentNumberOfItemsInCompare = 0;
		var catEntryIds = cookieValue.split(this.cookieDelimiter);
		
		for(idx=0; idx<catEntryIds.length; idx++){
			var catEntryIdentifier = catEntryIds[idx];
			
			if(null != dojo.byId("compare_"+catEntryIdentifier)){
				dojo.byId("comparebox_"+catEntryIdentifier).checked = true;
				dojo.byId("compare_"+catEntryIdentifier).style.visibility = "visible";
				dojo.byId("compare_"+catEntryIdentifier).style.backgroundColor = "white";
			}
			
			if(++currentNumberOfItemsInCompare == this.minNumberProductsAllowedToCompare){
				var compareButtonDisabled = dojo.byId("compare_button_disabled");
				var compareButtonEnabled = dojo.byId("compare_button_enabled");
				compareButtonDisabled.style.display = "none";
				compareButtonEnabled.style.display = "block";
				dojo.removeClass("compare_button", "disabled");
			}
		}
	},
	
	/**
	* replaceItemAjaxHelper This function is used to replace an item in the cart. This will be called from the {@link fastFinderJS.ReplaceItemAjax} method.
	*
	* @param {String} catalogEntryId The catalog entry of the item to replace to the cart.
	* @param {int} qty The quantity of the item to add.
	* @param {String} removeOrderItemId The order item ID of the catalog entry to remove from the cart.
	* @param {String} addressId The address ID of the order item.
	* @param {String} shipModeId The shipModeId of the order item.
	* @param {String} physicalStoreId The physicalStoreId of the order item.
	*
	**/
	replaceItemAjaxHelper : function(catalogEntryId,qty,removeOrderItemId,addressId,shipModeId,physicalStoreId){
		
		var params = [];
		params.storeId = WCParamJS.storeId;
		params.catalogId = WCParamJS.catalogId;
		params.langId = WCParamJS.langId;
		params.orderItemId	= removeOrderItemId;
		params.orderId = ".";
		if(CheckoutHelperJS.shoppingCartPage){	
			params.calculationUsage = "-1,-2,-5,-6,-7";
		}else{
			params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		}

		var params2 = [];
		params2.storeId = WCParamJS.storeId;
		params2.catalogId = WCParamJS.catalogId;
		params2.langId = WCParamJS.langId;
		params2.catEntryId	= catalogEntryId;
		params2.quantity = qty;
		params2.orderId = ".";
		if(CheckoutHelperJS.shoppingCartPage){	
			params2.calculationUsage = "-1,-2,-5,-6,-7";
		}else{
			params2.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		}

		var params3 = [];
		params3.storeId = WCParamJS.storeId;
		params3.catalogId = WCParamJS.catalogId;
		params3.langId = WCParamJS.langId;
		params3.orderId = ".";
		if(CheckoutHelperJS.shoppingCartPage){	
			params3.calculationUsage = "-1,-2,-5,-6,-7";
		}else{
			params3.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		}
		
		var shipInfoUpdateNeeded = false;
		var orderItemReqd = true;
		if(addressId != null && addressId != ""){
			params3.addressId = addressId;
		}
		if(shipModeId != null && shipModeId != ""){
			params3.shipModeId = shipModeId;
		}
		if(physicalStoreId != null && physicalStoreId != ""){
			params3.physicalStoreId = physicalStoreId;
			orderItemReqd = false;
		}
		if(params3.shipModeId != null && (params3.addressId != null || params3.physicalStoreId != null)){
			shipInfoUpdateNeeded = true;
		}
		
		if(orderItemReqd){
			params3.allocate="***";
			params3.backorder="***";
			params3.remerge="***";
			params3.check="*n";
		}
		
		//Delcare service for deleting item...
		wc.service.declare({
			id: "AjaxReplaceItem",
			actionId: "AjaxReplaceItem",
			url: "AjaxOrderChangeServiceItemDelete",
			formId: ""

			,successHandler: function(serviceResponse) {
				//Now add the new item to cart..
				if(!shipInfoUpdateNeeded){
					//We dont plan to update addressId and shipMOdeId..so call AjaxAddOrderItem..
					wc.service.invoke("AjaxAddOrderItem", params2);
				}
				else{
					//We need to update the adderessId and shipModeId..so call our temp service to add..
					wc.service.invoke("AjaxAddOrderItemTemp", params2);
				}
			}

			,failureHandler: function(serviceResponse) {
				if (serviceResponse.errorMessage) {
							 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
					  } else {
							 if (serviceResponse.errorMessageKey) {
									MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
							 }
					  }
					  cursor_clear();
			}

		});

		//Delcare service for adding item..
		wc.service.declare({
			id: "AjaxAddOrderItemTemp",
			actionId: "AjaxAddOrderItemTemp",
			url: "AjaxOrderChangeServiceItemAdd",
			formId: ""

			,successHandler: function(serviceResponse) {
				if(orderItemReqd){
					// setting the newly created orderItemId
					params3.orderItemId = serviceResponse.orderItemId[0];
				}
				
				MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_ADDED"]);
				
				//Now item is added.. call update to set addressId and shipModeId...
				wc.service.invoke("OrderItemAddressShipMethodUpdate", params3);
			}

			,failureHandler: function(serviceResponse) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			}
		});

		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   
		cursor_wait();
		wc.service.invoke("AjaxReplaceItem",params);
	},
	setForCoach : function(entitledItemId){
		var entitledItemJSON;
       // alert("enter");
		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 //entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
			entitledItemJSON = dojo.fromJson(dojo.byId(entitledItemId).innerHTML);
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
	},
	replaceSwatchImage : function(entitledItemId,swatchvalue,catalogEntryId){
		
		var entitledItemJSON;

		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 //entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
			entitledItemJSON = dojo.fromJson(dojo.byId(entitledItemId).innerHTML);
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
		var imageFound = false;
		for (x in this.entitledItems) {
			var Attributes = this.entitledItems[x].Attributes;
			var ItemSwatchImage = this .entitledItems[x].ItemSwatchImage;
			var ItemSwatchImage2 = this .entitledItems[x].ItemSwatchImage2;
			
			for(y in Attributes){
				var index = y.indexOf("_");
				var entitledSwatchName = y.substring(0, index);				
				var entitledSwatchValue = y.substring(index+1);				
				
				if (entitledSwatchName == "VendorColor" && entitledSwatchValue == swatchvalue) {		
					if(document.getElementById("swatch_entitledItem_" + catalogEntryId + "_" + swatchvalue) != null){
						document.getElementById("swatch_entitledItem_" + catalogEntryId + "_" + swatchvalue).src = ItemSwatchImage;
					}
					if(document.getElementById("swatch_entitledItem2_" + catalogEntryId + "_" + swatchvalue) !=null){
						document.getElementById("swatch_entitledItem2_" + catalogEntryId + "_" + swatchvalue).src = ItemSwatchImage2;
					}
					imageFound = true;
					break;
				}
			}
			
			if(imageFound){
				break;
			}
		}	
	},
	/**
	* checkInventory This function is used to replace an item in the cart. This will be called from the {@link fastFinderJS.ReplaceItemAjax} method.
	*
	* @param {String} catalogEntryId The catalog entry of the item to replace to the cart.
	* @param {int} qty The quantity of the item to add.
	* @param {String} removeOrderItemId The order item ID of the catalog entry to remove from the cart.
	* @param {String} addressId The address ID of the order item.
	* @param {String} shipModeId The shipModeId of the order item.
	* @param {String} physicalStoreId The physicalStoreId of the order item.
	*
	**/
	checkInventory : function(entitledItemId){
		
		var entitledItemJSON;
		var el = dojo.byId(entitledItemId);
		if (el != null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ el.innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
		var tempCat = [];
		tempCat = this.getCatalogEntryId(entitledItemId);
		var catalogEntryId = tempCat[0];
		var inventory = '';
		var offerPrice = '';
		var outOfStock = false;
		var partNumber = '';
		var buyable = '';
		var buyableStatus = '';
		var status = dojo.byId('inventorystatus');
		status.innerHTML = ' ';
		var vDSEnabled = '';
		var iNTLEnabled = '';
		var listPrice = '';

		var BOPISEligible = '';
		var vdsDisclaimerDiv = document.getElementById('vdsDisclaimer');
		var shopRunnerDiv = document.getElementById('shopRunnerDiv');
		var vdsShippingInfoDiv = document.getElementById('vdsShippingInfoDiv');
		var intlShippingInfoDiv = document.getElementById('intlShippingInfoDiv');	
		var normalShippingInfoDiv = document.getElementById('normalShippingInfoDiv');
		var storePickUPMessageDisclaimer = document.getElementById('storePickUPMessageDisclaimer');
		var isBuyableStatus = 'true';

		if (catalogEntryId != null) {
			var catentryId='';
			for (var x in this.entitledItems) {
				catentryId= this .entitledItems[x].catentry_id;
				var catID = this .entitledItems[x].catentry_id;
				if (catID == catalogEntryId) {
	                  vDSEnabled = this.entitledItems[x].VDSEnabled || '';
					  iNTLEnabled = this.entitledItems[x].INTLSHIPEligible || '';
	                  BOPISEligible = this.entitledItems[x].BOPISEligible || '';
					  offerPrice = this.entitledItems[x].offerPrice || '';
	                  inventory = this.entitledItems[x].inventoryStatus || '';
	                  outOfStock = this.entitledItems[x].outOfStock;
	                  partNumber = this.entitledItems[x].partNumber;
	                  buyable = this.entitledItems[x].buyable;
	                  buyableStatus = this.entitledItems[x].buyableStatus || '';
	                  // Added listprice variable for bloomsearch - Guru - Jan3
	                  listPrice = this.entitledItems[x].listPrice || '';

	             }
			}
			isBuyableStatus = dojo.trim(dojo.byId('isBuyableStatus').innerHTML);
			//Buyable code - Sugat
			if (isBuyableStatus == 'false') {
				// Do Nothing
			} 
			else if(outOfStock || offerPrice == '' || buyable == 'no'){
				
				dojo.removeClass('addtobag', 'allbutton');
				dojo.addClass('addtobag', 'allbuttonDisabled');
				dojo.addClass('inventorystatus', 'invSts1');
				dojo.removeAttr(dojo.byId('addtobag'), 'href');
			} else {
				
				var catalogEntryID = dojo.trim(dojo.byId('storeCatalogEntryID').innerHTML);
				var qty = dojo.byId('quantity').value;
				var productId=dojo.byId('productId').value;
				var sku=dojo.byId('sku').value;
				var name=dojo.byId('name').value;
				//removed some bloomsearch variables which were causing issue, also some variables already exists 

				var displayStyle = $('#hbcDisplayStyle').val();
				var eventFlag = $('#eventFlag').val();
				var script ="";
				dojo.removeClass('addtobag', 'allbuttonDisabled');
				dojo.addClass('addtobag', 'allbutton');
				dojo.addClass('inventorystatus', 'invSts');
				//if DSV Elgible flag is true pass custom params with key as dropship and catentryId as value to Add2ShopCartAjax()
				// Changed Bloomsearch variables, since some are existing already
				if(vDSEnabled == 'Y') {
					 script = "javascript: setCurrentId('addtobag'); shoppingActionsJS.Add2ShopCartAjax('entitledItem_" + catalogEntryID + "'," + qty + ",false" +
					",{partNumber: '" + partNumber + "',dropShip: '" + catalogEntryId + "'});";
				} else {
					 script = "javascript: setCurrentId('addtobag'); shoppingActionsJS.Add2ShopCartAjax('entitledItem_" + catalogEntryID + "'," + qty + ",false" +
						",{partNumber: '" + partNumber + "'});";
				}
				
				if(eventFlag == 'ON')
					{
					script = script+"shoppingActionsJS.addBloomEventTacking('" + br_data.prod_id + "','" + br_data.sku + "','" + name + "','" + listPrice +"','"+ offerPrice + "','entitledItem_" + catalogEntryID + "');";
					}
				
				dojo.attr(dojo.byId('addtobag'), 'href',script);
			}
			//Buyable code - Sugat
            if(buyable == 'yes' && isBuyableStatus == 'true'){
            	status.innerHTML = inventory;	
            }
            if(buyable == 'no' && isBuyableStatus == 'true'){
            	status.innerHTML = buyableStatus;	
            }
            // display VDS div
            if(vDSEnabled == 'Y'){
            	if(vdsDisclaimerDiv != null){
            		vdsDisclaimerDiv.style.display = 'block';
            	}
            	if(shopRunnerDiv != null){
            		shopRunnerDiv.style.display = 'none';
            	}
            	if(vdsShippingInfoDiv != null){
            		vdsShippingInfoDiv.style.display = 'block';
            	}
            	if(normalShippingInfoDiv != null){
                	normalShippingInfoDiv.style.display = 'none';            		
            	}
            } else {
            	if(vdsDisclaimerDiv != null){
            		vdsDisclaimerDiv.style.display = 'none';
            	}
            	if(shopRunnerDiv != null){
            		shopRunnerDiv.style.display = 'block';
            	}
            	if(vdsShippingInfoDiv != null){
            		vdsShippingInfoDiv.style.display = 'none';
            	}
            	if(normalShippingInfoDiv != null){
            		normalShippingInfoDiv.style.display = 'block';            		
            	}
            }
            if(UtilitiesJS.isIntlFlowRequired()){

			if(iNTLEnabled == 'Y'){
				if(intlShippingInfoDiv != null){
            		intlShippingInfoDiv.style.display = 'block';
            	}				
            	if(normalShippingInfoDiv != null){
                	normalShippingInfoDiv.style.display = 'none';            		
            	}
			}
			else{
				if(intlShippingInfoDiv != null){
            		intlShippingInfoDiv.style.display = 'none';
            	}
            	if(normalShippingInfoDiv != null){
                	normalShippingInfoDiv.style.display = 'block';            		
            	}
			}
            }
            if(BOPISEligible == 'Y'){
            	if(storePickUPMessageDisclaimer != null){
            		storePickUPMessageDisclaimer.style.display = 'block';
            	}
            } else {
            	if(storePickUPMessageDisclaimer != null){
            		storePickUPMessageDisclaimer.style.display = 'none';
            	}
            }
		}
		//Gift Registry changes begin
		if(HBC.isGRFlowEnabled()){
			dojo.query("div#inventoryCheck a#addtobag").style({ display:"none" }); 
			dojo.query("div#grFlow dl.grFlowMsg ").style({ display:"block" }); 
		 }	
		//Gift Registry changes end
	},
	
	checkInventoryOnCart : function(removeOrderItemId, entitledItemId){
		
		var entitledItemJSON;
		var el = dojo.byId(entitledItemId);
		if (el != null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ el.innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
		var tempCat = [];
		tempCat = this.getCatalogEntryId(entitledItemId);
		var catalogEntryId = tempCat[0];
		var inventory = '';
		var offerPrice = '';
		var outOfStock = false;
		var partNumber = '';
		var buyable = '';
		var buyableStatus = '';
		var status = dojo.byId('inventorystatus');
		status.innerHTML = ' ';
		var vDSEnabled = '';
		var iNTLEnabled = '';
		var listPrice = '';

		var BOPISEligible = '';
		var vdsDisclaimerDiv = document.getElementById('vdsDisclaimer');
		var shopRunnerDiv = document.getElementById('shopRunnerDiv');
		var vdsShippingInfoDiv = document.getElementById('vdsShippingInfoDiv');
		var intlShippingInfoDiv = document.getElementById('intlShippingInfoDiv');	
		var normalShippingInfoDiv = document.getElementById('normalShippingInfoDiv');
		var storePickUPMessageDisclaimer = document.getElementById('storePickUPMessageDisclaimer');
		var isBuyableStatus = 'true';

		if (catalogEntryId != null) {
			var catentryId='';
			for (var x in this.entitledItems) {
				catentryId= this .entitledItems[x].catentry_id;
				var catID = this .entitledItems[x].catentry_id;
				if (catID == catalogEntryId) {
	                  vDSEnabled = this.entitledItems[x].VDSEnabled || '';
					  iNTLEnabled = this.entitledItems[x].INTLSHIPEligible || '';
	                  BOPISEligible = this.entitledItems[x].BOPISEligible || '';
					  offerPrice = this.entitledItems[x].offerPrice || '';
	                  inventory = this.entitledItems[x].inventoryStatus || '';
	                  outOfStock = this.entitledItems[x].outOfStock;
	                  partNumber = this.entitledItems[x].partNumber;
	                  buyable = this.entitledItems[x].buyable;
	                  buyableStatus = this.entitledItems[x].buyableStatus || '';
	                  // Added listprice variable for bloomsearch - Guru - Jan3
	                  listPrice = this.entitledItems[x].listPrice || '';

	             }
			}
			isBuyableStatus = dojo.trim(dojo.byId('isBuyableStatus').innerHTML);
			//Buyable code - Sugat
			if (isBuyableStatus == 'false') {
				// Do Nothing
			} 
			else if(outOfStock || offerPrice == '' || buyable == 'no'){
				
				dojo.removeClass('addtobag', 'allbutton');
				dojo.addClass('addtobag', 'allbuttonDisabled');
				dojo.addClass('inventorystatus', 'invSts1');
				dojo.removeAttr(dojo.byId('addtobag'), 'href');
			} else {
				
				var catalogEntryID = dojo.trim(dojo.byId('storeCatalogEntryID').innerHTML);
				var qty = dojo.byId('quantity').value;
				var productId=dojo.byId('productId').value;
				var sku=dojo.byId('sku').value;
				var name=dojo.byId('name').value;
				//removed some bloomsearch variables which were causing issue, also some variables already exists 

				var displayStyle = $('#hbcDisplayStyle').val();
				var eventFlag = $('#eventFlag').val();
				var script ="";
				dojo.removeClass('addtobag', 'allbuttonDisabled');
				dojo.addClass('addtobag', 'allbutton');
				dojo.addClass('inventorystatus', 'invSts');
				//if DSV Elgible flag is true pass custom params with key as dropship and catentryId as value to Add2ShopCartAjax()
				// Changed Bloomsearch variables, since some are existing already
				
				
				script = "javascript: var newquantity = dojo.byId('quantity').value; setCurrentId('addtobag');  shoppingActionsJS.ReplaceItemAjax(" + removeOrderItemId + ",'entitledItem_" + catalogEntryID + "', newquantity);";
				
				if(eventFlag == 'ON')
					{
					script = script+"shoppingActionsJS.addBloomEventTacking('" + br_data.prod_id + "','" + br_data.sku + "','" + name + "','" + listPrice +"','"+ offerPrice + "','entitledItem_" + catalogEntryID + "');";
					}
				
				dojo.attr(dojo.byId('addtobag'), 'href',script);
			}
			//Buyable code - Sugat
            if(buyable == 'yes' && isBuyableStatus == 'true'){
            	status.innerHTML = inventory;	
            }
            if(buyable == 'no' && isBuyableStatus == 'true'){
            	status.innerHTML = buyableStatus;	
            }
            // display VDS div
            if(vDSEnabled == 'Y'){
            	if(vdsDisclaimerDiv != null){
            		vdsDisclaimerDiv.style.display = 'block';
            	}
            	if(shopRunnerDiv != null){
            		shopRunnerDiv.style.display = 'none';
            	}
            	if(vdsShippingInfoDiv != null){
            		vdsShippingInfoDiv.style.display = 'block';
            	}
            	if(normalShippingInfoDiv != null){
                	normalShippingInfoDiv.style.display = 'none';            		
            	}
            } else {
            	if(vdsDisclaimerDiv != null){
            		vdsDisclaimerDiv.style.display = 'none';
            	}
            	if(shopRunnerDiv != null){
            		shopRunnerDiv.style.display = 'block';
            	}
            	if(vdsShippingInfoDiv != null){
            		vdsShippingInfoDiv.style.display = 'none';
            	}
            	if(normalShippingInfoDiv != null){
            		normalShippingInfoDiv.style.display = 'block';            		
            	}
            }
            if(UtilitiesJS.isIntlFlowRequired()){

			if(iNTLEnabled == 'Y'){
				if(intlShippingInfoDiv != null){
            		intlShippingInfoDiv.style.display = 'block';
            	}				
            	if(normalShippingInfoDiv != null){
                	normalShippingInfoDiv.style.display = 'none';            		
            	}
			}
			else{
				if(intlShippingInfoDiv != null){
            		intlShippingInfoDiv.style.display = 'none';
            	}
            	if(normalShippingInfoDiv != null){
                	normalShippingInfoDiv.style.display = 'block';            		
            	}
			}
            }
            if(BOPISEligible == 'Y'){
            	if(storePickUPMessageDisclaimer != null){
            		storePickUPMessageDisclaimer.style.display = 'block';
            	}
            } else {
            	if(storePickUPMessageDisclaimer != null){
            		storePickUPMessageDisclaimer.style.display = 'none';
            	}
            }
		}
		//Gift Registry changes begin
		if(HBC.isGRFlowEnabled()){
			dojo.query("div#inventoryCheck a#addtobag").style({ display:"none" }); 
			dojo.query("div#grFlow dl.grFlowMsg ").style({ display:"block" }); 
		 }	
		//Gift Registry changes end
	},
	
	inventoryStatus: function(entitledItemId) {
	
		this.checkInventory(entitledItemId);
	},
	inventoryStatusOnCart: function(entitledItemId) {
	
		this.checkInventoryOnCart(entitledItemId);
	},
	
	selectSwatchCheckOut: function(selectedAttributeName, selectedAttributeValue, entitledItemId, doNotDisable, count, isOnLoad, imageField) {
		/*if(dojo.hasClass("swatch_" + entitledItemId + "_" + selectedAttributeValue, "color_swatch_disabled")){
			
			return false;
		}*/
		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
		//var catalogEntryId = this.getCatalogEntryId(entitledItemId);
		
	  if(selectedAttributeValue != 'size_dropdown_entitledItem_SELECT_SIZE'){
//		var selectedAttributes = this.selectedAttributesList[entitledItemId];	
//		for (attribute in selectedAttributes) {
//			if (attribute == selectedAttributeName) {
//				// case when the selected swatch is already selected with a value, if the value is different than
//				// what's being selected, reset other swatches and deselect the previous value and update selection
//				if (selectedAttributes[attribute] != selectedAttributeValue) {
//					// deselect previous value and update swatch selection
//					//document.getElementById("swatch_" + entitledItemId + "_" + selectedAttributes[attribute]).className = "color_swatch";
//				}
//			}
//		}
		
		this.makeSwatchSelectionCheckOut(selectedAttributeName, selectedAttributeValue, entitledItemId, doNotDisable, count, isOnLoad, imageField);
	  }	
	},

	makeSwatchSelectionCheckOut: function(swatchAttrName, swatchAttrValue, entitledItemId, doNotDisable, count, isOnLoad, imageField) {
		 
		this.setSelectedAttribute(swatchAttrName, swatchAttrValue, entitledItemId);
		//document.getElementById("swatch_" + entitledItemId + "_" + swatchAttrValue).className = "color_swatch_selected";
		//document.getElementById("swatch_selection_label_" + entitledItemId + "_" + swatchAttrName).className = "heading color_swatch_label left";
		//document.getElementById("swatch_selection_" + entitledItemId + "_" + swatchAttrName).innerHTML = swatchAttrValue;
		//this.changeProdImage(entitledItemId, swatchAttrName, swatchAttrValue, skuImageId, imageField);
		if(swatchAttrName != 'Size' && swatchAttrName != 'SIZE') {
			this.updateSwatchImagesCheckOut(swatchAttrName, entitledItemId, doNotDisable, count, isOnLoad);
			//this.updateColorDropdownCheckOut(swatchAttrName,swatchAttrValue, entitledItemId,count);
		}
	},
	
	updateColorDropdownCheckOut: function (swatchAttrName, swatchAttrValue, entitledItemId,count) {
		//if(swatchAttrValue != 'color_dropdown_entitledItem_SELECT_COLOR'){
		document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchAttrValue +"_"+ count).selected ="true";
	    //}
	},

	updateSwatchImagesCheckOut: function(selectedAttrName, entitledItemId, doNotDisable, count, isOnLoad) {
		
		var swatchToUpdate = new Array();
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		var selectedAttrValue = selectedAttributes[selectedAttrName];
		var swatchList = this.allSwatchesArrayList[entitledItemId];
		
		// finds out which swatch needs to be updated, add to swatchToUpdate array
		for(var i=0; i<swatchList.length; i++) {
			var attrName = swatchList[i][0];
			var attrValue = swatchList[i][1];
			var attrImg1 = swatchList[i][2];
			var attrImg2 = swatchList[i][3];
			var attrOnclick = swatchList[i][4];
			
			if (attrName != doNotDisable && attrName != selectedAttrName) {
				var swatchRecord = new Array();
				swatchRecord[0] = attrName;
				swatchRecord[1] = attrValue;
				swatchRecord[2] = attrImg1;
				swatchRecord[4] = attrOnclick;
				swatchRecord[5] = false;
				swatchToUpdate.push(swatchRecord);
			}
		}
		
		// finds out which swatch is entitled, if it is, image should be set to enabled
		// go through entitledItems array and find out swatches that are entitled 
		var updateCount = 0;
		for (x in this.entitledItems) {
			var Attributes = this.entitledItems[x].Attributes;

			for(y in Attributes){
				var index = y.indexOf("_");
				var entitledSwatchName = y.substring(0, index);
				var entitledSwatchValue = y.substring(index+1);	
				
				//the current entitled item has the selected attribute value
				if (entitledSwatchName == selectedAttrName && entitledSwatchValue == selectedAttrValue) {
					//go through the other attributes that are available to the selected attribute
					//exclude the one that is selected
					for (z in Attributes) {
						var index2 = z.indexOf("_");
						var entitledSwatchName2 = z.substring(0, index2);
						var entitledSwatchValue2 = z.substring(index2+1);
						
						if(y != z){ //only check the attributes that are not the one selected
							for (i in swatchToUpdate) {
								var swatchToUpdateName = swatchToUpdate[i][0];
								var swatchToUpdateValue = swatchToUpdate[i][1];
								
								if (entitledSwatchName2 == swatchToUpdateName && entitledSwatchValue2 == swatchToUpdateValue) {
									updateCount++;
									swatchToUpdate[i][5] = true;
								}
							}
						}
					}
				}
			}
		}

		// Clear select boxes
		var endSelect = document.getElementById("size_swatch_link_"+entitledItemId+"_"+count);
		/* Clear out the current options */
		/*for (i = 0; i < endSelect.options.length; i++) {
		    endSelect.options[i] = null;
		}*/	
		
		endSelect.options.length=0;
		// End Clear select boxes
		
		// Now go through swatchToUpdate array, and update swatch images
		var disabledAttributes = [];
		var isDefault = (updateCount == 1);
		var defaultAttributeName, defaultAttributeValue;
		for (i in swatchToUpdate) {
			var swatchToUpdateName = swatchToUpdate[i][0];
			var swatchToUpdateValue = swatchToUpdate[i][1];
			var swatchToUpdateImg1 = swatchToUpdate[i][2];
			var swatchToUpdateImg2 = swatchToUpdate[i][3];
			var swatchToUpdateOnclick = swatchToUpdate[i][4];
			var swatchToUpdateEnabled = swatchToUpdate[i][5];		
			
			if (swatchToUpdateEnabled) {
				//alert("Enabled atributes .. Name :"+ swatchToUpdateName+" Value :"+swatchToUpdateValue);
				/*if(document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue).disabled){
				  document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue).disabled ="false";
				}*/
				
				// Add options to the select box
				var optn = document.createElement("OPTION");
				optn.text = swatchToUpdateValue;
				optn.value = swatchToUpdateValue;
				optn.id = "size_dropdown_"+ entitledItemId +"_"+ swatchToUpdateValue +"_"+ count;
				endSelect.options.add(optn);
				// End Add options to the select box
				
				if (isDefault || (selectedAttributes[swatchToUpdateName] == swatchToUpdateValue)) {
					isDefault = false;
					defaultAttributeName = swatchToUpdateName;
					defaultAttributeValue = swatchToUpdateValue;
					
					optn.selected = true;
				} else {
					optn.selected = false;
				}
				
				/*if(!document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue).selected){
					  document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue).selected ="true";
				}*/
				
				/*if(document.getElementById("swatch_" + entitledItemId + "_" + swatchToUpdateValue).className != "color_swatch_selected"){
					document.getElementById("swatch_" + entitledItemId + "_" + swatchToUpdateValue).className = "color_swatch";
				}
				document.getElementById("swatch_link_" + entitledItemId + "_" + swatchToUpdateValue).onclick = swatchToUpdateOnclick;*/
			} else {
				if(swatchToUpdateName != doNotDisable){
					//alert("Disabled atributes .. Name :"+ swatchToUpdateName+" Value :"+swatchToUpdateValue);
					/*if(document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue).selected){
						  document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue).selected ="false";
					}
					if(!document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue).disabled){
						document.getElementById("color_dropdown_" + entitledItemId + "_" + swatchToUpdateValue).disabled ="true";
					}*/
										
					//document.getElementById("swatch_" + entitledItemId + "_" + swatchToUpdateValue).className = "color_swatch_disabled";					
					//document.getElementById("swatch_link_" + entitledItemId + "_" + swatchToUpdateValue).onclick = null;

					//The previously selected attribute is now unavailable for the new selection
					//Need to switch the selection to an available value
					if(selectedAttributes[swatchToUpdateName] == swatchToUpdateValue){
						disabledAttributes.push(swatchToUpdate[i]);
					}
				}
			}
			
			/*if(!document.getElementById("color_dropdown_entitledItem_SELECT_COLOR").selected){
				document.getElementById("color_dropdown_entitledItem_SELECT_COLOR").selected ="true";
			}*/
		}
		
        //
		var optn = document.createElement("OPTION");
		optn.text = "SELECT";
		optn.value = "size_dropdown_entitledItem_SELECT_SIZE";
		optn.id = "size_dropdown_entitledItem_SELECT_SIZE";
		if((isOnLoad != null && isOnLoad != undefined && isOnLoad) || (defaultAttributeName && defaultAttributeValue)){
			optn.selected = false;
		}else{
			optn.selected = true;
		}
		
		endSelect.options.add(optn);
		
//		//If there were any previously selected attributes that are now unavailable
//		//Find another available value for that attribute and update other attributes according to the new selection
//		for(i in disabledAttributes){
//			var disabledAttributeName = disabledAttributes[i][0];
//			var disabledAttributeValue = disabledAttributes[i][1];
//
//			for (i in swatchToUpdate) {
//				var swatchToUpdateName = swatchToUpdate[i][0];
//				var swatchToUpdateValue = swatchToUpdate[i][1];
//				var swatchToUpdateEnabled = swatchToUpdate[i][5];	
//				
//				if(swatchToUpdateName == disabledAttributeName && swatchToUpdateValue != disabledAttributeValue && swatchToUpdateEnabled){
//					//	this.makeSwatchSelection(swatchToUpdateName, swatchToUpdateValue, entitledItemId, doNotDisable);
//					break;
//				}
//			}
//		}
		
		if (defaultAttributeName && defaultAttributeValue) {
			this.setSelectedAttribute(defaultAttributeName, defaultAttributeValue, entitledItemId);
		}
	},
	ReplaceItemAjax : function(removeOrderItemId, entitledItemId,quantity){
		
	
		var entitledItemJSON;

		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		this.setEntitledItems(entitledItemJSON);
		//var catalogEntryId = this.getCatalogEntryId();

		    var tempCat = [];
		    tempCat = this.getCatalogEntryId(entitledItemId);
	    	var catalogEntryId = tempCat[0];
		// var removeOrderItemId = "";
		// if(entitledItemJSON[0] != null){
		//   removeOrderItemId = entitledItemJSON[0].orderItemId_remove;
		// }
		//var removeOrderItemId = replaceOrderItemId;
		var typeId = document.getElementById("shipmentTypeId");
		var addressId = "";
		var shipModeId = "";
		if(typeId != null && typeId != ""){
			if(typeId.value == "2"){
				//Multiple shipment..each orderItem will have its own addressId and shipModeId..
				addressId = document.getElementById("MS_ShipmentAddress_"+removeOrderItemId).value;
				shipModeId = document.getElementById("MS_ShippingMode_"+removeOrderItemId).value;
			}
			else {
				//Single Shipment..get the common addressId and shipModeId..
				addressId = document.getElementById("addressId_all").value;;
				shipModeId = document.getElementById("shipModeId_all").value;
			}
		}
		if(catalogEntryId!=null){
			if(removeOrderItemId == ""){
				//Just add new catentryId to shop cart in ajax way, since this is AjaxCheckout page
				//This code will never be executed, since we dont have Add To Cart link..
				/*var params = [];
				params.storeId		= this.storeId;
				params.catalogId	= this.catalogId;
				params.langId			= this.langId;
				params.orderId		= ".";
				params.catEntryId	= catalogEntryId;
				params.quantity		= quantity;
				params.addressId = addressId;
				params.shipModeId = shipModeId;
				wc.service.invoke("AjaxAddOrderItem", params);
				*/
			}
			else{
				
				//Else remove existing catEntryId and then add new one...
				this.ReplaceItemAjaxHelperCheckOut(catalogEntryId,quantity,removeOrderItemId,addressId,shipModeId);
			}
		}
		else{
			    var errorMsg = 'ERR_RESOLVING_SKU'+ '_'+ tempCat[1].toUpperCase();
				MessageHelper.displayErrorMessage(MessageHelper.messages[errorMsg]);
		}
	},
	
	addBloomEventTacking: function(productId,sku,name,listPrice,offerPrice,entitledItemId)
	{
			var accId = $("#bloomreachAccountId").val();
			
			var brtrk = document.createElement('script');
			brtrk.type = 'text/javascript';
			brtrk.async = true;
			brtrk.src = 'https:' == document.location.protocol ? "https://cdns.brsrvr.com/v1/br-trk-"+accId+".js" : "http://cdn.brcdn.com/v1/br-trk-"+accId+".js";
			
			var s = document.getElementsByTagName('script')[0];
			//s.parentNode.insertBefore(brtrk, s);
			
			// Added for getting color attribute of the item - Guru - Jan 6 2014 - Start
			var prodColor = '';
			var selectedAttributes = this.selectedAttributesList[entitledItemId];
			for (attribute in selectedAttributes) {
				
				if (attribute == 'VendorColor') {
					prodColor = selectedAttributes[attribute];
					
				}
			}
			 
			if(typeof BrTrk != undefined)
				{ 
				//Added try catch block for Quick view issue
				try {
			BrTrk.getTracker().logEvent('Cart', 'add', {'acct_id':accId,'prod_id': br_data.prod_id, 'sku' : br_data.sku, 'prod_name': name,'prod_color': prodColor },
			{'price' : listPrice, 'sale_price' : offerPrice});
				}
				catch(err)
				{
					
					//Need to add code for logging
				}
				}
			
			// Added for getting color attribute of the item - Guru - Jan 6 2014 - End
	},
	getPriceForBRTracking :function(){
		var offerPrice = this.entitledItems[x].offerPrice || '';
        var listPrice = this.entitledItems[x].listPrice || '';
        $('#priceBR').val(listPrice);
        $('#salePriceBR').val(offerPrice);
        
	},
	/**
	* ReplaceItemAjaxHelper This function is used to replace an item in the cart. This will be called from the {@link fastFinderJS.ReplaceItemAjax} method.
	*
	* @param {String} catalogEntryId The catalog entry of the item to replace to the cart.
	* @param {int} qty The quantity of the item to add.
	* @param {String} removeOrderItemId The order item ID of the catalog entry to remove from the cart.
	* @param {String} addressId The address ID of the order item.
	* @param {String} shipModeId The shipModeId of the order item.
	*
	**/
	ReplaceItemAjaxHelperCheckOut : function(catalogEntryId,qty,removeOrderItemId,addressId,shipModeId){
		
		var params = [];
		params.storeId = this.storeId;
		params.catalogId = this.catalogId;
		params.langId = this.langId;
		params.orderItemId	= removeOrderItemId;
		params.orderId = (this.orderId != null && this.orderId != 'undefined' && this.orderId != '')?this.orderId:".";
		params.calculationUsage = "-1";

		var params2 = [];
		params2.storeId = this.storeId;
		params2.catalogId = this.catalogId;
		params2.langId = this.langId;
		params2.catEntryId	= catalogEntryId;
		params2.quantity = qty;
		params2.orderId = (this.orderId != null && this.orderId != 'undefined' && this.orderId != '')?this.orderId:".";
		params2.calculationUsage = "-1";

		var params3 = [];
		params3.storeId = this.storeId;
		params3.catalogId = this.catalogId;
		params3.langId = this.langId;
		params3.orderId = (this.orderId != null && this.orderId != 'undefined' && this.orderId != '')?this.orderId:".";
		params3.calculationUsage = "-1";
		params3.allocate="***";
		params3.backorder="***";
		params3.remerge="***";
		params3.check="*n";
		
		var shipInfoUpdateNeeded = false;
		if(addressId != null && addressId != "" && shipModeId != null && shipModeId != ""){
			params3.addressId = addressId;
			params3.shipModeId = shipModeId;
			shipInfoUpdateNeeded = true;
		}

		//Delcare service for deleting item...
		wc.service.declare({
			id: "AjaxReplaceItem",
			actionId: "AjaxReplaceItem",
			url: "AjaxOrderChangeServiceItemDelete",
			formId: ""

			,successHandler: function(serviceResponse) {
				//Now add the new item to cart..
				if(!shipInfoUpdateNeeded){
					//We dont plan to update addressId and shipMOdeId..so call AjaxAddOrderItem..
					
					if (parent != null && typeof(parent) != 'undefined' && parent.qvDialog != null && typeof(parent.qvDialog) != 'undefined')
					{
						parent.wc.service.invoke("AjaxAddOrderItem", params2);
					}
					else
					{
						wc.service.invoke("AjaxAddOrderItem", params2);
					}
					
				}
				else{
					//We need to update the adderessId and shipModeId..so call our temp service to add..
					wc.service.invoke("AjaxAddOrderItemTemp", params2);
				}
			}

			,failureHandler: function(serviceResponse) {
				if (serviceResponse.errorMessage) {
							 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
					  } else {
							 if (serviceResponse.errorMessageKey) {
									MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
							 }
					  }
					  cursor_clear();
			}

		});

		//Delcare service for adding item..
		wc.service.declare({
			id: "AjaxAddOrderItemTemp",
			actionId: "AjaxAddOrderItemTemp",
			url: "AjaxOrderChangeServiceItemAdd",
			formId: ""

			,successHandler: function(serviceResponse) {
				//Now item is added.. call update to set addressId and shipModeId...
				wc.service.invoke("OrderItemAddressShipMethodUpdate", params3);
			}

			,failureHandler: function(serviceResponse) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			}
		});

		//For Handling multiple clicks
		//if(!submitRequest()){
		//	return;
		//}   
		cursor_wait();
		wc.service.invoke("AjaxReplaceItem",params);
	},
	
	Add2WishListAjax : function(entitledItemId,bridalEligibility,isBuyable) //bridalEligibility - added for Klein Feld
	{	
		var entitledItemJSON;

		if (dojo.byId(entitledItemId)!=null) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
		var tempCat = [];
		  tempCat = this.getCatalogEntryId(entitledItemId);
		var catalogEntryId = tempCat[0];
		
		if (catalogEntryId!=null) {
			
		if(bridalEligibility=='Y' && isBuyable==0)
			var quantity=1;
		else
			var quantity = dojo.byId('quantity').value;
			
			quickInfoPage = (('undefined' === typeof quickInfoPage) || (quickInfoPage === null)) ? false : quickInfoPage;
			userType =  (('undefined' === typeof userType) || (userType === null)) ? 'R' : userType;
			var hasParentWindow = (('undefined' === typeof parent) || (parent === null)) ? false : true; 
			
			// Quick info and guest user.  Fix for defect 2091 - add to wishlist for guest user in quick info page,
			//  needs to redirect parent window to login page.  Need to not call ajax for add 2 wish list,
			//  or else WC OOTB (ajax + js) will attempt to redirect current window (iframe) to logon page.
			if (quickInfoPage && (userType == 'G') && hasParentWindow) {
				
				var nextUrl = 'AjaxInterestItemAdd?updateable=0&catalogId=' + catalogId + '&catEntryId=' + catalogEntryId + '&field3=' + bridalEligibility +
							  '&langId=' + langId + '&requesttype=ajax&quantity=' + quantity + 
							  '&storeId=' + storeId + '&URL=SuccessfulAJAXRequest';
				
				nextUrl = nextUrl.replace('?', '%3F');
				nextUrl = nextUrl.replace(/&amp;/g, '%26');						
				nextUrl = nextUrl.replace(/&/g, '%26');
				nextUrl = nextUrl.replace(/=/g, '%3D');				
				
				var theUrl = 'LogonForm?nextUrl=' + nextUrl + '&storeId=' + storeId + '&catalogId=' + catalogId + 
					'&langId=' + langId + '&myAcctMain=1';
				
				console.debug('QuickInfo and guest user, forwarding parent window to logon page:' + theUrl);
				parent.document.location.href = theUrl;
			} 
			// Not quick info or not guest user, normal behavior
			else {
				categoryDisplayJS.Add2WishListAjaxByID(catalogEntryId, quantity,bridalEligibility); //bridalEligibility - added for Klein Feld

				if(dijit.byId('second_level_category_popup') != null){
					hidePopup('second_level_category_popup');
				}				
			}
		}
		else if (isPopup == true){
			dojo.byId('second_level_category_popup').style.zIndex = '1';
			var errorMsg = 'ERR_RESOLVING_SKU'+ '_'+ tempCat[1].toUpperCase();
			MessageHelper.formErrorHandleClient('addToCartLinkAjax', MessageHelper.messages[errorMsg]);			
		} else{
			var errorMsg = 'ERR_RESOLVING_SKU'+ '_'+ tempCat[1].toUpperCase();
			MessageHelper.displayErrorMessage(MessageHelper.messages[errorMsg]);
			this.baseItemAddedToCart=false;
		}
	},
	
	changePriceCheckOut : function(entitledItemId,isPopup,displayPriceRange){
		this.displayPriceRange = displayPriceRange;
		this.isPopup = isPopup;
		var entitledItemJSON;

		if (dojo.byId(entitledItemId)!=null && !this.isPopup) {
			//the json object for entitled items are already in the HTML. 
			 entitledItemJSON = eval('('+ dojo.byId(entitledItemId).innerHTML +')');
		}else{
			//if dojo.byId(entitledItemId) is null, that means there's no <div> in the HTML that contains the JSON object. 
			//in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
			entitledItemJSON = this.getEntitledItemJsonObject(); 
		}
		
		this.setEntitledItems(entitledItemJSON);
		var tempCat = [];
		  tempCat = this.getCatalogEntryId();
		var catalogEntryId = tempCat[0];
		
		if(catalogEntryId!=null){
			//check if the json object is already present for the catEntry.
			if(this.itemPriceJsonOject[catalogEntryId] != null && this.itemPriceJsonOject[catalogEntryId] != 'undefined'){
				this.displayPrice(this.itemPriceJsonOject[catalogEntryId].catalogEntry);
				console.debug("CategoryDisplay.changePrice: using stored json object.");
			}
			//if json object is not present, call the service to get the details.
			else{
				var parameters = {};
				parameters.storeId = this.storeId;
				parameters.langId= this.langId;
				parameters.catalogId= this.catalogId;
				parameters.productId= catalogEntryId;
				parameters.onlyCatalogEntryPrice = 'true';

				dojo.xhrPost({
					url: getAbsoluteURL() + "GetCatalogEntryDetailsByID",				
					handleAs: "json-comment-filtered",
					content: parameters,
					service: this,
					load: categoryDisplayJS.displayPriceServiceResponse,
					error: function(errObj,ioArgs) {
						console.debug("CategoryDisplay.changePrice: Unexpected error occurred during an xhrPost request.");
					}
				});
			}
		}
		else{
			console.debug("CategoryDisplay.changePrice: all attributes are not selected.");
		}
	},
    unescapeHTML : function(html) {
        var htmlNode = document.createElement("DIV");
        htmlNode.innerHTML = html;
        if(htmlNode.innerText !== undefined)
        return htmlNode.innerText; // IE
        return htmlNode.textContent; // FF
    },
	// If quickinfo page - then send event in parent window so mini cart is updated
	//  and destroy quickinfo dialog iframe if closeQuickView == true
    quickViewAddToCart : function (closeQuickView) {
		var isQuickInfoPage = (('undefined' === typeof quickInfoPage) || (quickInfoPage === null)) ? false : quickInfoPage;
		var hasParentWindow = (('undefined' === typeof parent) || (parent === null)) ? false : true;
		shoppingActionsJS.acloseQuickView = closeQuickView;
		if (isQuickInfoPage && hasParentWindow) {
			var message=[];
			message.actionId='AddOrderItem';
			parent.dojo.publish('modelChanged',[message]);
			
			if (closeQuickView && (wc.render.getRefreshControllerById("PromotionFreeGifts_Controller").skipPWPpop() || wc.render.getRefreshControllerById("PromotionFreeGifts_Controller").doneWithOffers())) {
				parent.dojo.disconnect(parent.qvScroll);
				parent.qvDialog.destroyRecursive();
			}
		}
    },
    processSwatch: function(swatchName, swatchValue, catalogEntryId, doNotDisable, checkPrice, displayPriceRange) {
    	shoppingActionsJS.selectSwatch(swatchName,swatchValue,"entitledItem_"+catalogEntryId,doNotDisable);
    	if(!outOfStock.isProcessingDisabled()){
    		shoppingActionsJS.notifyAttributeChange(catalogEntryId);
    		if(checkPrice){
    			shoppingActionsJS.changePrice("entitledItem_"+catalogEntryId,false,displayPriceRange,catalogEntryId);
    		}
    		
    		shoppingActionsJS.checkInventory("entitledItem_"+catalogEntryId);
    	}
    },
    setSwatchClass: function(id, clsId){
		dojo.removeClass(id,"color_swatch color_swatch_selected color_swatch_disabled");
		dojo.addClass(id,clsId);	
    }
}

/*
**  Defect 2530 start
**
**  Make size and color combinations disabled
**  
**  When a color swatch is clicked, disable all out-of-stock size swatches; similarly
**  disable out-of-stock color swatches upon click of the corresponding size swatch.
**
*/
var outOfStock = (function(){
	return {
		disableProcessing: false
		/*
		**  Get the id of the div(?!) that contains the item json:
		*/
		,getItem: function(){
			var sId = dojo.query("div[id^='entitledItem_']", dojo.byId("main_content"))[0].id;

			return sId;
		}

		/*
		**  Get the item json from the div(?!) that contains it:
		*/
		,getJson: function(sId){
			var oItem = dojo.byId(sId);
			var sItemGuts = oItem.innerHTML;
			var oItemJson = JSON && JSON.parse(sItemGuts) || dojo.fromJson(sItemGuts);

			return oItemJson;
		}

		/*
		**  Get an array of all items that are out of stock:
		*/
		,getOOS: function(oItems){
			var aOOSItems = [];

			for(var i in oItems){
			    if ( (oItems[i].hasOwnProperty("outOfStock") && oItems[i].outOfStock) ){
			    	aOOSItems.push(oItems[i]);
			    }
			}
			console.log("Total out of stock items found: " + aOOSItems.length);

			return aOOSItems;
		}

		/*
		**  Disable a single swatch:
		*/
		,disableSwatch: function(sId){
			var oElem = dojo.byId(sId);
			var oElemDiv = "#"+sId.replace("_link_","_");
	
			dojo.addClass(oElem, "disabled");
			dojo.query(oElemDiv,oElem).addClass("disabled");

			//dojo.attr(oElem, "href", "javascript:return false;");
		}

		/*
		**  Enable a single swatch:
		*/
		,enableSwatch: function(sId){
			var oElem = dojo.byId(sId);
			var oElemDiv = "#"+sId.replace("_link_","_");
			
			dojo.removeClass(oElem, "disabled");
			dojo.query(oElemDiv,oElem).removeClass("disabled");
		}

		/*
		**  Enable all swatches:
		*/
		,enableSwatches: function(){
			dojo.query(".color_swatch_list > ul > li > a", dojo.byId("main_content")).forEach(function(oElem){
				outOfStock.enableSwatch(oElem.id);
			});
		}

		/*
		**  Given a swatch value, sVal, disable the corresponding out-of-stock 
		**    color or size swatches for it as indicated by sSwatchType:
		*/
		,disableOOSSwatches: function(sVal, sSwatchType){
			var sItemId = this.getItem();
			var oItems = this.getJson(sItemId);
			var aOOSItems = this.getOOS(oItems);
			var aOOSSwatches = [];
			var sElemId = "";
			var sBase = "swatch_link_";

			// Collect all OOS items that have sVal into an array of OOS swatches, aOOSSwatches:
			for(var oItem in aOOSItems){
				for(var sProp in aOOSItems[oItem].Attributes){
					if(sProp.toLowerCase().indexOf(sVal.toLowerCase()) > -1){
						aOOSSwatches.push(aOOSItems[oItem]);
					}
				}
			}
			console.log("Out of stock " + sSwatchType + "s for " + sVal + ": " + aOOSSwatches.length);

			// Clear any previously disabled swatches by enabling all:
			this.enableSwatches();
	
			// Disable all swatches in the OOS swatches array that are the indicated swatch type:
			for(var i in aOOSSwatches){
				for(var sProp in aOOSSwatches[i].Attributes){
					if(sProp.toLowerCase().indexOf(sSwatchType) > -1){
						sId = sBase + sItemId + sProp.substring(sProp.indexOf("_"), sProp.length);
						this.disableSwatch(sId);
					}
				}
			}
		}

		/*
		**  Given a size swatch value, disable the out of stock 
		**    color swatches for it:
		*/
		,disableOOSColorsForSize: function(evt){
			var sElemId = (evt && evt.target ? evt.target.id : window.event.srcElement.id);
			var aElemId = sElemId.split("_");
			
			outOfStock.processingDisabled(aElemId);
			
			var sVal = aElemId.pop();
			outOfStock.disableOOSSwatches(sVal, "color");
		}
		/*
		**  Given a color swatch value, disable the out of stock 
		**    size swatches for it:
		*/
		,disableOOSSizesForColor: function(evt){
			var sElemId = (evt && evt.target ? evt.target.id : window.event.srcElement.id);
			var aElemId = sElemId.split("_");
			
			outOfStock.processingDisabled(aElemId);
			
			var sVal = aElemId.pop();
			outOfStock.disableOOSSwatches(sVal, "size");
		}
		
		,processingDisabled: function(sVal){
			disableProcessing = false;
			var parentNode = dojo.byId(sVal[0]+"_link_"+sVal[1]+"_"+sVal[2]+"_"+sVal[3]);
			if(dojo.hasClass(parentNode,"disabled")){
				disableProcessing = true;
			}
		}
		
		,isProcessingDisabled: function(){
			return disableProcessing;
		}
	};
}());

dojo.addOnLoad(function(){

	dojo.query(".color_swatch_list > ul.detail_size > li", dojo.byId("main_content")).forEach(function(oElem){
		dojo.connect(oElem, "onclick", outOfStock.disableOOSColorsForSize);
	});
	dojo.query(".color_swatch_list > ul.detail_color > li", dojo.byId("main_content")).forEach(function(oElem){
		dojo.connect(oElem, "onclick", outOfStock.disableOOSSizesForColor);
	});
	
	//Modified for Related widgets- Bloomsearch 
	if( dojo.query(".br-related-query").length ==0 && dojo.query(".br-sf-widget").length ==0 ){
		hideElementById("br_widget");
	}
 
});
/*
**  Defect 2530 end
			//adding droship to params
			if(customParams['dropShip'] != null && customParams['dropShip'] != undefined){
				params['dropShip'] = customParams['dropShip'];
			}
			//end
		//setting dsv flag value from productTabsDetails.jsp
		var dropShipItemFlagVal= false;
		if(document.getElementById("dropShipItemFlag")!=null)
			{
		dropShipItemFlagVal = document.getElementById("dropShipItemFlag").value;
			}
			var catentryId='';
				catentryId= this .entitledItems[x].catentry_id;
				//if DSV Elgible flag is true pass custom params with key as dropship and catentryId as value to Add2ShopCartAjax()
				if(dropShipItemFlagVal)
					{
					var script = "javascript: setCurrentId('addtobag'); shoppingActionsJS.Add2ShopCartAjax('entitledItem_" + catalogEntryID + "'," + qty + ",false" +
					",{partNumber: '" + partNumber + "',dropShip: '" + catalogEntryId + "'} )";
					}
				else
					{
					}
*/
