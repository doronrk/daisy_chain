//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2007, 2011 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

//
//

/**
* @fileOverview This file holds methods to perform client side operations in relation to catalog browsing, usually at the category level.<b> 
* 			For example, this file holds methods to add items to the shopping cart, wish list and compare zone and to resolve SKUs.<b> 
*			This file is referenced in a collection of JSPs including all of the catalog entry display JSPs such as
*			CachedBundleDisplay.jsp, CachedItemDisplay.jsp , CachedPackageDisplay.jsp, CachedProductOnlyDisplay.jsp.
*			As well this file is included in CategoryOnlyResultsDisplay.jsp and in none catalog browsing pages such as 
*			CatalogSearchDisplay.jsp and MyAccountDisplay.jsp.
*
* @version 1.0
**/

/**
* @class categoryDisplayJS This class defines all the variables and functions used by the CategoryDisplay.js. Any page that will use a function in this file
*		can access that function thru this class. Pages that use categoryDisplayJS include CachedProductOnlyDisplay.jsp which is responsible for
*		displaying product details. As well CategoryOnlyResultsDisplay.jsp uses this page to facilitate the category browsing functionality such as add to cart, 
*		wish list and compare zone.
*
**/
categoryDisplayJS={
	
	/** An array of entitled items which is used in various methods throughout CategoryDisplay.js **/
	entitledItems:[],
	
	entitledItemsArray:[],
	
	/** An map which holds the attributes of a set of products **/
	selectedProducts:new Object(),
	
	/** A map of attribute name value pairs for the currently selected attribute values **/
	selectedAttributes:new Object(),
	
	/** Can be used to hold a map of error messages **/
	errorMessages: new Object(),
	
	/** The language ID currently in use **/
	langId: "-1",
	
	/** The store ID currently in use **/
	storeId: "",
	
	/** The catalog ID currently in use **/
	catalogId: "",
	
	/** The order ID currently in use if being called from the pending order details page.**/
	orderId: "",
	
	/** Holds a boolean value indicating whether or not AJAX shopping cart is enabled or not. **/
	ajaxShopCart:true,
	
	/** Holds a boolean value indicating whether or not AJAX My Account is enabled or not. **/
	ajaxMyAccount:true,
	
	/** Can be used to indicate whether or not there has been a context change event **/
	contextChanged:false, 
	
	/** Set to true in the goBack and goForward methods **/
	isHistory:false,
	
	/** Holds an array of  JSON objects representing properties of merchandising associations **/
	merchandisingAssociationItems:[],
	
	/** Holds an array of JSON objects holding information about the parent catalog entries of merchandising associations **/
	baseCatalogEntryDetails:[],
	
	/** Used to determine the index of the next association to display and is used as a global storage variable to share data between methods. **/
	associationThumbnailIndex:1,
	
	/** A count of the number of merchandising associations available. **/
	totalAssociationCount:0,
	
	/** A boolean used in a variety of the add to cart methods to tell whether or not the base item was added to the cart. **/
	baseItemAddedToCart:false,
	
	/** A boolean used to determine whether or not to add merchandising associations to the cart **/
	merchandisingProductAssociationAddToCart:false,
	
	/** The form which holds information about merchandising associations to be added to the cart **/
	merchandisingProductAssociationForm:"",
	
	/** A boolean used to determine whether or not the parent catalog entry is a bundle bean. **/
	isParentBundleBean:false,
	
	/** Holds the current user type such as guest or registered user. Allowed values are 'G' for guest and 'R' for registered.**/
	userType:"",
	
	/** A variable used to form the url dynamically for the more info link in the Quickinfo popup */
	moreInfoUrl :"",
	/** The text to display as an alt to the image used on the MerchandisingAssociationDisplay.jsp to show the previous assoication **/
	displayPrevAssociation:"",
	
	/** The text to display as an alt to the image used on the MerchandisingAssociationDisplay.jsp to show the next assoication **/
	displayNextAssociation:"",
	
	/** A map holding a mapping between product IDs as its key and the first entitled item ID of that product as its value **/
	defaultItemArray:[],

	/** The type of the catalog page that the user is currently viewing **/
	currentPageType:"",

	/** The identifier of the catalog entry that the current page is displaying **/
	currentCatalogEntryId:"",
	
    /** a JSON object that holds attributes of an entitled item **/
    entitledItemJsonObject: null,

    /** A map of attribute name value pairs for the currently selected attribute values **/
	selectedAttributesList:new Object(),
	
    /** 
	* stores all name and value of all swatches 
	* this is a 2 dimension array and each record i contains the following information:
	* allSwatchesArray[i][0] - attribute name of the swatch
	* allSwatchesArray[i][1] - attribute value of the swatch
	* allSwatchesArray[i][2] - image1 of swatch (image to use for enabled state)
	* allSwatchesArray[i][3] - image2 of swatch (image to use for disabled state)
	* allSwatchesArray[i][4] - onclick action of the swatch when enabled
	**/
	allSwatchesArrayList : new Object(),
	
	/**
	* A boolean used to to determine is it from a Qick info popup or not. 
	**/
	isPopup : false,

	/**
	* A boolean used to to determine whether or not to diplay the price range when the catEntry is selected. 
	**/
	displayPriceRange : true,

	/**
	* This array holds the json object retured from the service, holding the price information of the catEntry.
	**/
	itemPriceJsonOject : [],
	
	/**
	* This string holds catentryDisplay Url.
	**/
	catEntryDisplayURL :"",
	
	/**
	* This string holds quickInfoDetails Url.
	**/
	quickInfoDetailsURL :"",
    
	/**
	* initHistory This function will take elementId and changeUrl as inputs and create a new history tracker object and sets the initial state.
	*			  This is used on CategoriesDisplay.jsp to initialize the page history to the CategoryDisplay URL of the category you are on.
	* @param {String} elementId  HistoryTracker elementId.
	* @param {String} changeUrl HistoryTracker URL.
	*
	**/
	initHistory:function(elementId, changeUrl){
		var historyObject = new categoryDisplayJS.HistoryTracker(elementId, changeUrl);
		dojo.back.setInitialState(historyObject);	
	},


	/* This function processes the category URL and loads the content based on what is present after the hash in the URL.
	*/
	processCategoryURL:function(){
		var hashString = location.hash;		
		var needContextUpdate = false;	
		var wholeUrl;
		if(hashString){
			hashString = hashString.substring(1, hashString.length);
			/* Remove the identifier attached*/ 
			wholeUrl = hashString;
			var indexOfIdentifier = hashString.indexOf("identifier", 0);
			if(indexOfIdentifier >= 0){
				wholeUrl = hashString.substring(0, indexOfIdentifier);
			}
			needContextUpdate = true;
			wholeUrl = unescape(wholeUrl);
		 }
		if(needContextUpdate){			
			isHistory=true;
			wc.render.getRefreshControllerById("CategoryDisplay_Controller").url = wholeUrl;
			wc.render.updateContext("CategoryDisplay_Context");
		}
	},
	
	/**
	* setCatEntryDisplayURL This function will set the catEntryDisplayURL for category pages.
	*
	* @param {String} catEntryDisplayURL String URL.
	*
	**/
	setCatEntryDisplayURL:function(catEntryDisplayURL){
		this.catEntryDisplayURL = catEntryDisplayURL;
	},
	
	/**
	* setQuickInfoDetailsURLThis function will set the QuickInfoDetailsURL for category pages.
	*
	* @param {String} quickInfoDetailsURL String URL.
	*
	**/
	setQuickInfoDetailsURL:function(quickInfoDetailsURL){
		this.quickInfoDetailsURL = quickInfoDetailsURL;
	},
	
	/**
	* getCatEntryDisplayURL This function will get the catEntryDisplayURL for category pages.
	*
	*
	**/
	getCatEntryDisplayURL:function(){
		return this.catEntryDisplayURL;
	},
	
	/**
	* getQuickInfoDetailsURL This function will get the quickInfoDetailsURL for category pages.
	*
	*
	**/
	getQuickInfoDetailsURL:function(){
		return this.quickInfoDetailsURL;
	},
	
	/**
	* setAjaxShopCart This function will set the flag "ajaxShopCart" which is used to determine if the shopping cart is using the Ajax flow or not.
	*
	* @param {Boolean} ajaxShopCart Flag which indicates whther to use AJAX shopping cart or not.
	*
	**/
	setAjaxShopCart:function(ajaxShopCart){
		this.ajaxShopCart = ajaxShopCart;
	},
	
	/**
	* setAjaxMyAccount This function will set the flag "ajaxMyAccount" which is used to determine if the My Account page is using the Ajax flow or not.
	*
	* @param {Boolean} ajaxMyAccount Flag which indicates whether to use AJAX My Account or not.
	*
	**/	
	setAjaxMyAccount:function(ajaxMyAccount){
		this.ajaxMyAccount = ajaxMyAccount;
	},	
	
	/**
	* setCommonParameters This function initializes storeId, catalogId, and langId.
	*
	* @param {String} langId The language id to use.
	* @param {String} storeId The store id to use.
	* @param {String} catalogId The catalog id to use.
	* @param {String} userType The type of user. G for Guest user.
	* 
	**/
	setCommonParameters:function(langId,storeId,catalogId,userType){
		this.langId = langId;
		this.storeId = storeId;
		this.catalogId = catalogId;
		this.userType = userType;
	},
	
	/**
	* setEntitledItems Sets an array of entitled items for a product. 
	*				   This function is used in CachedBundleDisplay.jsp to add all the entitled SKUs of the products in a particular bundle to this array.
	*				   The array that is generated is used later in {@link fastFinderJS.resolveSKU}.
	* 
	* @param {Object} entitledItemArray An object which holds both the catalog entry ID as well as an array of attributes for the entitled items of a product.
	*
	**/
	setEntitledItems : function(entitledItemArray){
		this.entitledItems = entitledItemArray;
	},

	/**
	* setEntitledItemsArray Sets an array of entitled items for a bundle with multiple products. 
	*				   This function is used in CachedBundleDisplay.jsp to add all the entitled SKUs of the products in a particular bundle to this array.
	*				   The array that is generated is used later in {@link fastFinderJS.resolveSKU}.
	* 
	* @param {Object} entitledItemArray An object which holds both the catalog entry ID as well as an array of attributes for the entitled items of a product.
	*
	**/
	setEntitledItemsArray : function(productId, entitledItemArray){
		this.entitledItemsArray[productId] = entitledItemArray;
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
		console.debug(selectedAttributeName +" : "+ selectedAttributeValue);
		var selectedAttributes = this.selectedAttributesList[entitledItemId];
		if(selectedAttributes == null){
			selectedAttributes = new Object();
		}
		selectedAttributes[selectedAttributeName] = selectedAttributeValue;
		this.moreInfoUrl=this.moreInfoUrl+'&'+selectedAttributeName+'='+selectedAttributeValue;
		this.selectedAttributesList[entitledItemId] = selectedAttributes;
	},

	/**
	* setSelectedAttributeJS Sets the selected attribute value for a particular attribute not in reference to any catalog entry.
	*					   One place this function is used is on the quick info pop up where there is a drop down box of attributes.
	*					   When an attribute is selected from that drop down this method is called to update the selected value for that attribute.
	*
	* @param {String} selectedAttributeName The name of the attribute.
	* @param {String} selectedAttributeValue The value of the selected attribute.
	*
	**/
	setSelectedAttributeJS : function(selectedAttributeName , selectedAttributeValue){ 
		console.debug(selectedAttributeName.replace(/'/g,"&#039;") +" : "+ selectedAttributeValue.replace(/'/g,"&#039;"));
		this.selectedAttributes[selectedAttributeName.replace(/'/g,"&#039;")] = selectedAttributeValue.replace(/'/g,"&#039;");
		this.moreInfoUrl=this.moreInfoUrl+'&'+selectedAttributeName.replace(/'/g,"&#039;") +'='+selectedAttributeValue.replace(/'/g,"&#039;");
	},

	/**
	* This function is used to change the price displayed in the Product Display Page on change of  a attribute of the product using an AJAX call. 
	* This function will resolve the catentryId using entitledItemId and displays the price of the catentryId.
	*				
	* @param {Object} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {Boolean} isPopup If the value is true, then this implies that the function was called from a quick info pop-up.
	* @param {Boolean} displayPriceRange If the value is true, then display the price range. If it is false then donot display the price range.
	*
	**/
	changePrice : function(entitledItemId,isPopup,displayPriceRange){
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
		var catalogEntryId = this.getCatalogEntryId();
		
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

	/** 
	 * Displays price of the catEntry selected with the JSON objrct returned from the server.
	 * 
	 * @param {object} serviceRepsonse The JSON response from the service.
	 * @param {object} ioArgs The arguments from the service call.
	 */	
	 displayPriceServiceResponse : function(serviceResponse, ioArgs){
		
		//stores the json object, so that the service is not called when same catEntry is selected.
		categoryDisplayJS.itemPriceJsonOject[serviceResponse.catalogEntry.catalogEntryIdentifier.uniqueID] = serviceResponse;

		categoryDisplayJS.displayPrice(serviceResponse.catalogEntry);
	 },

	/** 
	 * Displays price of the attribute selected with the JSON oject.
	 * 
	 * @param {object} catEntry The JSON object with catalog entry details.
	 */	
	 displayPrice : function(catEntry){

		var tempString;
		var popup = categoryDisplayJS.isPopup;

		if(popup == true){
			document.getElementById('productPrice').innerHTML = catEntry.offerPrice;
			document.getElementById('productName').innerHTML = catEntry.description[0].name;
			document.getElementById('productSKUValue').innerHTML = catEntry.catalogEntryIdentifier.externalIdentifier.partNumber;
		}
		
		if(popup == false){
			var innerHTML = "";
			if(!catEntry.listPriced ||  catEntry.listPrice <= catEntry.offerPrice){
				innerHTML = "<span class='price bold'>"+MessageHelper.messages['PRICE']+" "+"</span>" +
							"<span class='price bold'>" + catEntry.offerPrice + "</span>";
			}
			else{
				innerHTML = "<span class='price bold'>"+MessageHelper.messages['PRICE']+" "+"</span>" +
							"<span class='price listPrice bold'>" + catEntry.listPrice + "</span>"+
							"<div class='price offerprice bold'>" + catEntry.offerPrice + "</div>";
			}

			innerHTML = innerHTML +	"<br />";
			
			if(categoryDisplayJS.displayPriceRange == true){
				for(var i in catEntry.priceRange){
					if(catEntry.priceRange[i].endingNumberOfUnits != 'null'){
						tempString = MessageHelper.messages['TieredPricingDisp'];
						tempString = tempString.replace('{0}',catEntry.priceRange[i].startingNumberOfUnits);
						tempString = tempString.replace('{1}',catEntry.priceRange[i].endingNumberOfUnits);
						tempString = tempString.replace('{2}',catEntry.priceRange[i].localizedPrice);
						innerHTML = innerHTML + "<span class='price bold'>" + tempString + "</span>";;
					}
					else{
						tempString = MessageHelper.messages['TieredPricingDispLast'];
						tempString = tempString.replace('{0}',catEntry.priceRange[i].startingNumberOfUnits);
						tempString = tempString.replace('{1}',catEntry.priceRange[i].localizedPrice);
						innerHTML = innerHTML + "<span class='price bold'>" + tempString + "</span>";;
					}
					innerHTML = innerHTML + "<br />";
				}
			}
			document.getElementById('WC_CachedProductOnlyDisplay_div_4').innerHTML = innerHTML;
			document.getElementById('catalog_link').innerHTML = catEntry.description[0].name;
		}
	 },	
	
	/**
	* setSelectedAttributeOfProduct Sets the selected attribute value for an attribute of a specified product.
	*								This function is used to set the assigned value of defining attributes to specific 
	*								products which will be stored in the selectedProducts map.
	*
	* @param {String} productId The catalog entry ID of the catalog entry to use.
	* @param {String} selectedAttributeName The name of the attribute.
	* @param {String} selectedAttributeValue The value of the selected attribute.
	*
	**/
	setSelectedAttributeOfProduct : function(productId,selectedAttributeName,selectedAttributeValue){
		
		selectedAttributesForProduct = new Object();

		if(this.selectedProducts[productId]) selectedAttributesForProduct = this.selectedProducts[productId];
		
		selectedAttributesForProduct[selectedAttributeName] = selectedAttributeValue;
		this.selectedProducts[productId] = selectedAttributesForProduct;
		
	},
	
	// Function for subcategory display pagination	
	
	/**
	* gotoASubCategoryDisplayPage  This function is used to validate the entered page number and loads the page if valid or displays an error message otherwise.
	*
	* @param {String} pageNum The page number entered.
	* @param {String} totalPages The total number of pages.
	* @param {String} pageSize The page size.
	* @param {String} subCatDispUrl The sub category display URL.
	*
	**/
	gotoASubCategoryDisplayPage : function(pageNum, totalPages, pageSize, subCatDispUrl) {
		pageNum = trim(pageNum);
		if (pageNum == "") {	
			 MessageHelper.formErrorHandleClient(document.getElementById('subCategoriesListDisplayPageNum').id,MessageHelper.messages['ERROR_EMPTY_NUM']);
			return;
		}
		
		if (MessageHelper.IsNumeric(pageNum,false) == false){ 
			 MessageHelper.formErrorHandleClient(document.getElementById('subCategoriesListDisplayPageNum').id,MessageHelper.messages['ERROR_PAGE_NUM']);

			return;
		}	
		
		if (pageNum >= 1 && pageNum <= totalPages) {
		    MessageHelper.hideAndClearMessage();
			var url = subCatDispUrl + "&beginIndex=" + ((pageNum-1) * pageSize);
			this.loadSubCategoryContentURL(url)
		} else {
			MessageHelper.formErrorHandleClient(document.getElementById('subCategoriesListDisplayPageNum').id,MessageHelper.messages['ERROR_PAGE_NUM']);
			
			return;
		}
	}, 

	/**
	* getCatalogEntryId Returns the catalog entry ID of the catalog entry with the selected attributes as specified in the {@link fastFinderJS.selectedAttributes} value.
	*					This method uses {@link fastFinderJS.resolveSKU} to find the SKU with the selected attributes values.
	*
	* @see fastFinderJS.resolveSKU
	*
	* @return {String} catalog entry ID.
	*
	**/
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
	* getCatalogEntryIdforBundleProduct Returns the catalog entry ID for a catalog entry that has the same attribute values as a specified product's selected attributes as passed in via the selectedAttributes parameter.
	*
	* @param {String[]} selectedAttributes The array of selected attributes upon which to resolve the SKU.
	*
	* @return {String} catalog entry ID of the SKU.
	*
	**/
	getCatalogEntryIdforBundleProduct : function(productId, selectedAttributes){
		var attributeArray = [];
		for(attribute in selectedAttributes){
			attributeArray.push(attribute + "_" + selectedAttributes[attribute]);
		}
		return this.resolveSKUForBundleProduct(productId, attributeArray);
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
	
		console.debug("Resolving SKU >> " + attributeArray +">>"+ this.entitledItems);
		var catentry_id = "";
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
				return catentry_id;
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
					return catentry_id;
				}
			}
		}
		return null;
	},

	/**
	* resolveSKUForBundleProduct Resolves a SKU using an array of defining attributes. Function to be used for bundles since there can be multiple products in the bundle.
	*
	* @param {String} productId One of product id from the bundle.
	* @param {String[]} attributeArray An array of defining attributes upon which to resolve a SKU.
	*
	* @return {String} catentry_id The catalog entry ID of the SKU.
	*
	**/
	resolveSKUForBundleProduct : function(productId, attributeArray){
	
		console.debug("Resolving SKU >> " + attributeArray +">>"+ this.entitledItemsArray[productId]);
		var catentry_id = "";
		var attributeArrayCount = attributeArray.length;
		
		for(x in this.entitledItemsArray[productId]){
			var catentry_id = this.entitledItemsArray[productId][x].catentry_id;
			var Attributes = this.entitledItemsArray[productId][x].Attributes;
			var attributeCount = 0;
			for(index in Attributes){
				attributeCount ++;
			}

			// Handle special case where a catalog entry has one sku with no attributes
			if (attributeArrayCount == 0 && attributeCount == 0){
				return catentry_id;
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
					return catentry_id;
				}
			}
		}
		return null;
	},

	/**
	* updateParamObject This function updates the given params object with a key to value pair mapping.
	*				    If the toArray value is true, It creates an Array for duplicate entries otherwise it overwrites the old value.
	*			        This is useful while making a service call which accepts a few parameters of type array.
	*					This function is used to prepare a a map of parameters which can be passed to XMLHttpRequests. 
	* 					The keys in this parameter map will be the name of the parameter to send and the value is the corresponding value for each parameter key.
	* @param {Object} params The parameters object to add name value pairs to.
	* @param {String} key The new key to add.
	* @param {String} value The new value to add to the specified key.
	* @param {Boolean} toArray Set to true to turn duplicate keys into an array, or false to override previous values for a specified key.
	* @param {int} index The index in an array of values for a specified key in which to place a new value.
	*
	* @return {Object} params A parameters object holding name value pairs.
	*
	**/
	updateParamObject:function(params, key, value, toArray, index){
	
	   if(params == null){
		   params = [];
	   }

	   if(params[key] != null && toArray)
	   {
			if(dojo.lang.isArrayLike(params[key]))
			{
				//3rd time onwards
			    if(index != null && index != "")
				{
					//overwrite the old value at specified index
				     params[key][index] = value;
				}
				else
				{
				    params[key].push(value);
			     }
		    }
			else
			{
			     //2nd time
			     var tmpValue = params[key];
			     params[key] = [];
			     params[key].push(tmpValue);
			     params[key].push(value);
		    }
	   }
	   else
	   {
			//1st time
		   if(index != null && index != "" && index != -1)
		   {
		      //overwrite the old value at specified index
		      params[key+"_"+index] = value;
		   }
		   else if(index == -1)
		   {
		      var i = 1;
		      while(params[key + "_" + i] != null)
			  {
			       i++;
		      }
		      params[key + "_" + i] = value;
		   }
		   else
		   {
		      params[key] = value;
		    }
	   }
	   return params;
	 },
	 
	 /**
	  *  This function associates the product id with its first entitledItemId.
	  *  @param {String} productId The id of the product.
	  *  @param {String} entitledItemId The id of the first entitledItem of the product.
	  */
	 setDefaultItem : function(productId,entitledItemId){
		this.defaultItemArray[productId] = entitledItemId;
		
},
	/*
     *	This function retrieves the first entitledItemId of the product.
	 *  @param {String} productId The id of the product.
	 *  
	 *  @return {String} The id of the first entitledItem of the product.
	 */
getDefaultItem : function(productId){
		return this.defaultItemArray[productId];
},


	/**
	* AddBundle2ShopCartAjax This function is used to add a bundle to the shopping cart. This is for the ajax flow which will take a form as input and retrieves all the items catentry IDs and adds them to the form.
	*						 
	* @param {form} form The form which contains all the inputs for the bundle.
	*					 The form is expected to have the following values: 
	*						numberOfProducts The number of products in the bundle.
	*						catEntryId_<index> where index is between 1 and numberOfProduct.
	*						quantity_<index> where index is between 1 and numberOfProduct.
	**/
	AddBundle2ShopCartAjax : function(form){
		
		var params = [];
		//var queryString = dojo.io.encodeForm(dojo.byId(form));

		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.orderId		= ".";
		params.calculationUsage = "-1";
			
		var productCount = form["numberOfProduct"].value;
		for(var i = 1; i <= productCount; i++){
			var catEntryId = form["catEntryId_" + i].value;
			if(this.selectedProducts[catEntryId])
				catEntryId = this.getCatalogEntryIdforProduct(catEntryId, this.selectedProducts[catEntryId]);
			var qty = form["quantity_" + i].value;
			if(qty == null || qty == "" || qty<=0){ MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']); return;}
			if(qty!=null && qty!='' && catEntryId!=null){
				this.updateParamObject(params,"catEntryId",catEntryId,false,-1);
				this.updateParamObject(params,"quantity",qty,false,-1);
				this.baseItemAddedToCart=true;
			}
			else{
				MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
				return;
			}
			var contractIdElements = document.getElementsByName('contractSelectForm_contractId_' + catEntryId);
			if (contractIdElements != null && contractIdElements != "undefined") {
				for (j=0; j<contractIdElements.length; j++) {
					if (contractIdElements[j].checked) {
						form["contractId_" + i].value = contractIdElements[j].value;
						break;
					}
				}
			}
			var contractId = form["contractId_" + i].value;
			if (contractId != null && contractId != '') {
				this.updateParamObject(params,"contractId",contractId,false,-1);
			}
		}
		//For Handling multiple clicks
		///if(!submitRequest()){
			//return;
		//}   		
		cursor_wait();		
		wc.service.invoke("AjaxAddOrderItem", params);

	},


	/**
	* AddBundle2ShopCart This function is used to add a bundle to the shopping cart. This is for the non ajax flow which  will take a form as input and submits the form.
	*
	* @param {form} form The form which contains all the inputs for the bundle.
	*					 The form is expected to have the following values:
	*						numberOfProducts The number of products in the bundle.
	*						catEntryId_<index> where index is between 1 and numberOfProduct.
	*						quantity_<index> where index is between 1 and numberOfProduct. 
	*
	**/
	AddBundle2ShopCart : function(form){
		
		form.URL.value = "AjaxOrderItemDisplayView";
		var productCount = form["numberOfProduct"].value;
		for(var i = 1; i <= productCount; i++){
			var catEntryId = form["catEntryId_" + i].value;
			if(this.selectedProducts[catEntryId]){
				catEntryId = this.getCatalogEntryIdforBundleProduct(catEntryId, this.selectedProducts[catEntryId]);
				if(catEntryId != null)
				form["catEntryId_" + i].value = catEntryId;
				else{
					MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
					return;
				}
			}
			var qty = form["quantity_" + i].value;
			if(qty == null || qty == "" || qty<=0){ MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']); return;}
			var contractIdElements = document.getElementsByName('contractSelectForm_contractId_' + catEntryId);
			if (contractIdElements != null && contractIdElements != "undefined") {
				for (j=0; j<contractIdElements.length; j++) {
					if (contractIdElements[j].checked) {
						form["contractId_" + i].value = contractIdElements[j].value;
						break;
					}
				}
			}
		}
		
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}
		
		form.submit();
	},
	
	
	/**
	* Add2ShopCart This function is used to add to a catalog entry to the shopping cart. This will resolve the catentryId using entitledItemId and adds the item to the cart.
	*			   This function will call AddItem2ShopCart after resolving the entitledItemId to a SKU.
	*
	* @param {String} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {form} form The form which contains all the inputs for the item. The catEntryId and productId values of the form you pass in
	*					 will be set to the catalog entry Id of the SKU resolved from the list of skus whos defining attributes match those in the {@link fastFinderJS.selectedAttributes} array.
	* @param {int} quantity quantity of the item.
	* @param {String} isPopup If the value is true, then this implies that the function was called from a quick info pop-up.				
	*
	**/
	Add2ShopCart : function(entitledItemId,form,quantity,isPopup){
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
		var catalogEntryId = this.getCatalogEntryId();
		if(catalogEntryId!=null){
			if(this.merchandisingProductAssociationAddToCart){
				this.AddAssociation2ShopCart(catalogEntryId,quantity);
				return;
			}
			form.catEntryId.value = catalogEntryId;
			form.productId.value = catalogEntryId;
			this.AddItem2ShopCart(form,quantity);
			hidePopup('second_level_category_popup');
		} else if (isPopup == true){
			dojo.byId('second_level_category_popup').style.zIndex = '1';
			MessageHelper.formErrorHandleClient('addToCartLink', MessageHelper.messages['ERR_RESOLVING_SKU']);		
		} else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
		}

	},
	
	
	
	/**
	* AddItem2ShopCart This function is used to add a SKU to the shopping cart.
	*
	* @param {form} form The form which contains all the inputs for the item.
    * 					The form must have the following values:
    *						quantity The quantity of the item that you want to add to the cart.
	* @param {int} quantity The quantity of the item to add to the shopping cart.
	*
	**/
	AddItem2ShopCart : function(form,quantity){
		if(!isPositiveInteger(quantity)){
			MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
			return;
		}
		
		form.quantity.value = quantity;
		
		var contractIdElements = document.getElementsByName('contractSelectForm_contractId');
		if (contractIdElements != null && contractIdElements != "undefined") {
			for (i=0; i<contractIdElements.length; i++) {
				if (contractIdElements[i].checked) {
					form.contractId.value = contractIdElements[i].value;
					break;
				}
			}
		}
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}
		
		form.submit();
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
		var catalogEntryId = this.getCatalogEntryId();
		if(catalogEntryId!=null){
			this.AddItem2ShopCartAjax(catalogEntryId,quantity,customParams);
			this.baseItemAddedToCart=true;
			//hidePopup('second_level_category_popup');
		}
		else if (isPopup == true){
			dojo.byId('second_level_category_popup').style.zIndex = '1';
			MessageHelper.formErrorHandleClient('addToCartLinkAjax', MessageHelper.messages['ERR_RESOLVING_SKU']);			
		} else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
			this.baseItemAddedToCart=false;
		}
	},
    
	/**
	 * sets the entitledItemJsonObject
	 * @param (object) jsonObject the entitled item JSON objects
	 */
    setEntitledItemJsonObject: function(jsonObject) {
        this.entitledItemJsonObject = jsonObject;
    },
    
    /**
     * retrieves the entitledItemJsonObject
     */
    getEntitledItemJsonObject: function () {
    	return this.entitledItemJsonObject;
    },

	/**
	* ReplaceItemAjax This function is used to replace an item in the shopping cart when the AJAX Checkout flow is enabled. This will be called from the shopping cart and checkout pages.
	*
	* @param {String} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {int} quantity The quantity of the item to add to the shopping cart.
	*
	**/
	ReplaceItemAjax : function(entitledItemId,quantity){
	
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
		var catalogEntryId = this.getCatalogEntryId();
		var removeOrderItemId = "";
		//if(entitledItemJSON[0] != null){
		//	removeOrderItemId = entitledItemJSON[0].orderItemId_remove;
		//}
		var removeOrderItemId = replaceOrderItemId;
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
				this.ReplaceItemAjaxHelper(catalogEntryId,quantity,removeOrderItemId,addressId,shipModeId);
			}
		}
		else{
				MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
		}
	},

	/**
	* ReplaceItemNonAjax This function is used to replace an item in the shopping cart when the Non Ajax checkout flow is enabled. This will be called from shopcart and checkout pages.
	* 
	* @param {String} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {int} quantity The quantity of the item to replace in the shopping cart.
	* @param {form} form The form which contains all the inputs for the item.
	*
	**/ 
	ReplaceItemNonAjax : function(entitledItemId,quantity,form){
	
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
		var catalogEntryId = this.getCatalogEntryId();
		var removeOrderItemId = "";
		//if(entitledItemJSON[0] != null){
		//	removeOrderItemId = entitledItemJSON[0].orderItemId_remove;
		//}
		var removeOrderItemId = replaceOrderItemId;
		if(catalogEntryId!=null){
			if(removeOrderItemId == ""){
				//Prepare form to just add this item.. This code will never be executed...
				//Needed only when we plan to show add to cart link also in the quick info..
				//form.action = "orderChangeServiceItemAdd";
				//form.submit();
			}
			else{
				//Else remove existing catEntryId and then add new one...
				form.orderItemId.value = removeOrderItemId;
				var addressId, shipModeId;
				if(quantity == 0){
					console.debug("An invalid quantity was selected");

				}
				if(form.shipmentTypeId != null && form.shipmenTypeId != ""){
					if(form.shipmentTypeId.value == "2"){
						//Multiple shipment..each orderItem will have its own addressId and shipModeId..
						addressId = document.getElementById("MS_ShipmentAddress_"+removeOrderItemId).value;;
						shipModeId = document.getElementById("MS_ShippingMode_"+removeOrderItemId).value;;
					}
					else {
						//Single Shipment..get the common addressId and shipModeId..
						addressId = document.getElementById("addressId_all").value;;
						shipModeId = document.getElementById("shipModeId_all").value;
					}
					form.URL.value = "OrderChangeServiceItemAdd?calculationUsage=-1,-2,-3,-4,-5,-6,-7&catEntryId="+catalogEntryId+"&quantity="+quantity+"&addressId="+addressId+"&shipModeId="+shipModeId+"&URL=OrderChangeServiceShipInfoUpdate?URL="+form.URL.value;
			    }
				else{
					form.URL.value = "OrderChangeServiceItemAdd?calculationUsage=-1,-2,-3,-4,-5,-6,-7&catEntryId="+catalogEntryId+"&quantity="+quantity+"&URL="+form.URL.value;
				}

				//For Handling multiple clicks
				if(!submitRequest()){
					return;
				}
				
				form.submit();
			}
		}
		else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
		}
	},

	/**
	* AddItem2ShopCartAjax This function is used to add a single or multiple items to the shopping cart using an ajax call.
							If an array is passed for catEntryIdentifier and quantity parramters, then multiple items can be added.	In this case, catEntryIdentifier[i] corresponds to quantity[i]
							Else, catEntryIdentifier  and quantity parramters represent a single catalog entry.
	*
	* @param {Array|String} catEntryIdentifier An array of catalog entry identifiers or a single catalog entry ID of the item to add to the cart.
	* @param {Array|int} quantity An array of quantities corresponding to the catEntryIdentifier array or a single quantity of the item to add to the cart.
	* @param {Object} customParams - Any additional parameters that needs to be passed during service invocation.
	*
	**/
	AddItem2ShopCartAjax : function(catEntryIdentifier, quantity, customParams)
	{		
		//Google Analytics Begin		
		_addEventMap.action = 'Add';
		_addEventMap.opt_value = quantity;
		
		if (customParams != null && customParams != 'undefined' && customParams['partNumber'] != null && customParams['partNumber'] != undefined) {
			_addEventMap.opt_name = customParams['partNumber'];
			delete customParams['partNumber'];
		} else {
			_addEventMap.opt_name = '';
		}
		//Google Analytics End

		var params = [];
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.orderId		= ".";
		params.calculationUsage = "-1";
		var ajaxShopCartService = "AjaxAddOrderItem";
		var nonAjaxShopCartService = "AjaxAddOrderItem_shopCart";
		
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
				nonAjaxShopCartService = "AjaxAddPreConfigurationToCart_shopCart";
			}
			if(customParams['giftAmount'] != null && customParams['giftAmount'] != undefined){
				params['giftAmount'] = customParams['giftAmount'];
				
			}
			if(customParams['giftCardItem'] != null && customParams['giftCardItem'] != undefined){
				params['giftCardItem'] = customParams['giftCardItem'];
				
			}
			if(customParams['virtualGiftCardItem'] != null && customParams['virtualGiftCardItem'] != undefined){
				params['virtualGiftCardItem'] = customParams['virtualGiftCardItem'];
				
			}
			if(customParams['giftCardSender'] != null && customParams['giftCardSender'] != undefined){
				params['giftCardSender'] = customParams['giftCardSender'];
				
			}
			if(customParams['giftCardRecipient'] != null && customParams['giftCardRecipient'] != undefined){
				params['giftCardRecipient'] = customParams['giftCardRecipient'];
				
			}
			if(customParams['giftCardEmail'] != null && customParams['giftCardEmail'] != undefined){
				params['giftCardEmail'] = customParams['giftCardEmail'];
				
			}
			if(customParams['giftCardMessage'] != null && customParams['giftCardMessage'] != undefined){
				params['giftCardMessage'] = customParams['giftCardMessage'];
				
			}
		}

		var contractIdElements = document.getElementsByName('contractSelectForm_contractId');
		if (contractIdElements != null && contractIdElements != "undefined") {
			for (i=0; i<contractIdElements.length; i++) {
				if (contractIdElements[i].checked) {
					params.contractId = contractIdElements[i].value;
					break;
				}
			}
		}
		
		//For Handling multiple clicks
	//	if(!submitRequest()){
		//	return;
	//	}   
		//cursor_wait();		
		if(this.ajaxShopCart){
			wc.service.invoke(ajaxShopCartService, params);
			this.baseItemAddedToCart=true;
		}else{
			wc.service.invoke(nonAjaxShopCartService, params);
			this.baseItemAddedToCart=true;
		}
		if(document.getElementById("headerShopCartLink")&&document.getElementById("headerShopCartLink").style.display != "none")
		{
			document.getElementById("headerShopCart").focus();
		}
		else
		{
			if(document.getElementById("headerShopCart1")){
				document.getElementById("headerShopCart1").focus();
			}
		}
	},
	
	/**
	* ConfigureDynamicKit This function is used to call the configurator page for a dynamic kit.
	* @param {String} catEntryIdentifier A catalog entry ID of the item to add to the cart.
	* @param {int} quantity A quantity of the item to add to the cart.
	* @param {Object} customParams - Any additional parameters that needs to be passed to the configurator page.
	*
	**/
	ConfigureDynamicKit : function(catEntryIdentifier, quantity, customParams)
	{
		var params = [];
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.catEntryId	= catEntryIdentifier;
		params.quantity		= quantity;
		
		if(!isPositiveInteger(quantity)){
			MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
			return;
		}

		var contractIdElements = document.getElementsByName('contractSelectForm_contractId');
		if (contractIdElements != null && contractIdElements != "undefined") {
			for (i=0; i<contractIdElements.length; i++) {
				if (contractIdElements[i].checked) {
					params.contractId = contractIdElements[i].value;
					break;
				}
			}
		}
		
		//Pass any other customParams set by other add on features
		if(customParams != null && customParams != 'undefined'){
			for(i in customParams){
				params[i] = customParams[i];
			}
		}

		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   
		cursor_wait();
		
		var configureURL = "ConfigureView";
		var i =0;
		for(param in params){
			configureURL += ((i++ == 0)? "?" : "&") + param + "=" + params[param];
		}
		document.location.href = getAbsoluteURL() + configureURL;
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
	ReplaceItemAjaxHelper : function(catalogEntryId,qty,removeOrderItemId,addressId,shipModeId){
		
		var params = [];
		params.storeId = this.storeId;
		params.catalogId = this.catalogId;
		params.langId = this.langId;
		params.orderItemId	= removeOrderItemId;
		params.orderId = (this.orderId != null && this.orderId != 'undefined' && this.orderId != '')?this.orderId:".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";

		var params2 = [];
		params2.storeId = this.storeId;
		params2.catalogId = this.catalogId;
		params2.langId = this.langId;
		params2.catEntryId	= catalogEntryId;
		params2.quantity = qty;
		params2.orderId = (this.orderId != null && this.orderId != 'undefined' && this.orderId != '')?this.orderId:".";
		params2.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";

		var params3 = [];
		params3.storeId = this.storeId;
		params3.catalogId = this.catalogId;
		params3.langId = this.langId;
		params3.orderId = (this.orderId != null && this.orderId != 'undefined' && this.orderId != '')?this.orderId:".";
		params3.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
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
		
	/**
	* AddBundle2WishList This function is used to add a bundle to the wish list and it can be called by the product/bundle/package details pages.
	*
	* @param {form} form The form which contains all the inputs for the bundle.
	*
	**/	
	AddBundle2WishList : function(form){
		if (!isAuthenticated) { 
			setWarningMessageCookie('WISHLIST_GUEST_ADDITEM');
		}
		var productCount = form["numberOfProduct"].value; 
		for(var i = 1; i <= productCount; i++){
			var catEntryId = form["catEntryId_" + i].value;
			if(this.selectedProducts[catEntryId]){
				catEntryId = this.getCatalogEntryIdforBundleProduct(catEntryId, this.selectedProducts[catEntryId]);
				if(catEntryId != null)
				form["catEntryId_" + i].value = catEntryId;
				else{
					MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
					return;
				}
			}
		}
			form.action="InterestItemAdd";
			form.page.value="customerlinkwishlist";			
		if (this.ajaxMyAccount){
			if(this.userType=='G'){
				form.URL.value='InterestItemDisplay';
			}else {
				form.URL.value='AjaxLogonForm';
			}
		}else{
			if(this.userType=='G'){
				form.URL.value='InterestItemDisplay';
			}else {
				form.URL.value='NonAjaxAccountWishListDisplayView';
			}
		}
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}
		
		form.submit();
	},
	
	/**
	* AddBundle2WishListAjax This fuction is used to add a bundle to the wish list using the ajax flow and it is called by the product/bundle/package details pages.
	*
	* @param {form} form The form which contains all the inputs for the bundle.
	*
	**/
	AddBundle2WishListAjax : function(form){
		if (!isAuthenticated) { 
			setWarningMessageCookie('WISHLIST_GUEST_ADDITEM');
		}
		var params = [];
		//var queryString = dojo.io.encodeForm(dojo.byId(form));

		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.updateable	= 0;
		params.orderId		= ".";
			
		var catEntryArray = [];
		catEntryArray = form.catEntryIDS.value.toString().split(",");
		
		for(var i = 0; i < catEntryArray.length; i++){
			var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
			var catEntryId = catEntryArray[i];
			if(this.selectedProducts[catEntryArray[i]])
				catEntryId = this.getCatalogEntryIdforBundleProduct(catEntryId,this.selectedProducts[catEntryArray[i]]);
			if(qty==0 || qty == null) qty = 1;
			if(qty!=null && qty!='' && catEntryId!=null){
				this.updateParamObject(params,"catEntryId",catEntryId,false,-1);
				this.updateParamObject(params,"quantity",qty,false,-1);
			}
			else{
				MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
				return;
			}
		}
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   		
		cursor_wait();		
		wc.service.invoke("AjaxInterestItemAdd", params);

	},
	
	/**
	* Add2WishListAjaxByID. This function is used to add a catalog entry to the wish list using ajax by passing in a catalog entry ID.
	*
	* @param {int} catalogEntryId The catalog entry ID of the catalog entry.
	*
	**/
	Add2WishListAjaxByID:function(catalogEntryId, quantity,bridalEligibility) //bridalEligibility - added for Klein Feld
	{
		if (catalogEntryId) {
			/** Commented for HBC WishList to Work
			if (!isAuthenticated) { 
				setWarningMessageCookie('WISHLIST_GUEST_ADDITEM');
			}**/
			var params = [];
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId			= this.langId;
			params.catEntryId	= catalogEntryId;
			params.updateable	= 0;
			params.quantity = quantity;
			params.field3	= bridalEligibility; //Passed to save in IITEM for bridal products - Add to wish list
			params.URL = "SuccessfulAJAXRequest";
			var el = document.getElementById("controllerURLWishlist"); 
			if(el) {
				CommonControllersDeclarationJS.setControllerURL("WishlistDisplay_Controller", el.value);
			}

			//For Handling multiple clicks
			//if(!submitRequest()){
			//	return;
		    //}   
			cursor_wait();			
			if(this.ajaxShopCart) {
				wc.service.invoke("AjaxInterestItemAdd", params);
			} else {
				wc.service.invoke("AjaxInterestItemAdd_shopCart", params);
			}
		} else { 
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']); 
		}
	},
	
	/**
	* Add2WishListAjax This function is used to add an item to the wishlist using ajax by passing in the id of an HTML element containing a JSON object representing a catalog entry.
	*				   This fuction is called by product/bundle/package detail pages.
	* 
	* @param {HTMLDivElement} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	*
	**/
	Add2WishListAjax:function(entitledItemId)
	{
		/**Commented for HBC WishList to Work
		if (!isAuthenticated) { 
			setWarningMessageCookie('WISHLIST_GUEST_ADDITEM');
		}
		**/
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
		var catalogEntryId = this.getCatalogEntryId(entitledItemId);
		this.Add2WishListAjaxByID(catalogEntryId);
		
	},
	
	/**
	* AddItem2WishListAjax. This function is used to add an item to the wishlist using AJAX by passing in its catentryId. 
	* 						This function can be called by item detail page.
	*
	* @param {String} itemId The catalog entry ID of the catalog entry to add to the wish list.
	*
	**/
	AddItem2WishListAjax:function(itemId)
	{
		/**Commented for HBC WishList to Work
		 * if (!isAuthenticated) { 
			setWarningMessageCookie('WISHLIST_GUEST_ADDITEM');
		}
		**/
		var params = [];
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId			= this.langId;
		params.catEntryId	= itemId;
		params.updateable	= 0;
		params.URL = "SuccessfulAJAXRequest";
		if(document.getElementById("controllerURLWishlist")!=null && document.getElementById("controllerURLWishlist")!='undefined')
					CommonControllersDeclarationJS.setControllerURL("WishlistDisplay_Controller",document.getElementById("controllerURLWishlist").value);

		//For Handling multiple clicks
		//if(!submitRequest()){
			//return;
		//}   		
		cursor_wait();			
		if(this.ajaxShopCart)
			wc.service.invoke("AjaxInterestItemAdd", params);
		else
			wc.service.invoke("AjaxInterestItemAdd_shopCart", params);
	},

	/**
	* Add2WishList This function is used to add a catalog entry to the wish list using the non ajax flow by passing in the ID of an HTML element containing a JSON which represents a catalog entry 
	*			   This fuction is called by the product/bundle/package detail pages.
	*
	* @param {String} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {form} form form to submit the request.
	*
	**/
	Add2WishList:function(entitledItemId,form)
	{
		if (!isAuthenticated) { 
			setWarningMessageCookie('WISHLIST_GUEST_ADDITEM');
		}
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
		var catalogEntryId = this.getCatalogEntryId();
		this.Add2WishListByID(catalogEntryId,form);
	},


	/**
	* Add2WishListByID Add a catalog entry to the wish list using the non-AJAX flow. This fuction is called by the product/bundle/package detail pages.
	*
	* @param {String} catalogEntryId The catalog entry ID of the catalog entry to be added.
	* @param {form} form  form to submit the request.
	*
	**/
	Add2WishListByID:function(catalogEntryId,form)
	{
		if (!isAuthenticated) { 
			setWarningMessageCookie('WISHLIST_GUEST_ADDITEM');
		}
		if(catalogEntryId!=null){
			form.productId.value = catalogEntryId;
			form.catEntryId.value = catalogEntryId;
			form.action="InterestItemAdd";
			form.page.value="customerlinkwishlist";
		if (this.ajaxMyAccount){
			if(this.userType=='G'){
				form.URL.value='InterestItemDisplay';
			}else {
				form.URL.value='AjaxLogonForm';
			}
		}else{
			if(this.userType=='G'){
				form.URL.value='InterestItemDisplay';
			}else {
				form.URL.value='NonAjaxAccountWishListDisplayView';
			}
		}
			form.quantity.value = "1";
			
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			}
			
			form.submit();
		}
		else MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
	},
	
	
	/** 
	* AddItem2WishList Add a SKU to the wish list using the non-AJAX flow. This function is called by the item detail page.
	*
	* @param {form} form The form to submit the request.
	*
	**/
	AddItem2WishList:function(form)
	{
		if (!isAuthenticated) { 
			setWarningMessageCookie('WISHLIST_GUEST_ADDITEM');
		}
		form.action="InterestItemAdd"
		form.quantity.value = "1";
		form.page.value="customerlinkwishlist";
		if (this.ajaxMyAccount){
			if(this.userType=='G'){
				form.URL.value='InterestItemDisplay';
			}else {
				form.URL.value='AjaxLogonForm';
			}
		}else{
			if(this.userType=='G'){
				form.URL.value='InterestItemDisplay';
			}else {
				form.URL.value='NonAjaxAccountWishListDisplayView';
			}
		}
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}
			
		form.submit();
	},
	
	/**
	* loadContentURL Sets the URL of the page to load into CategoryDisplay_Controller which in turn is used to display categories
	* 				 on the CategoryDisplay.jsp and DepartmentDisplay.jsp. The HistoryTracker is also updated.
	*
	* @param {String} contentURL The URL to load contents from.
	*
	**/
	loadContentURL:function(contentURL){
		
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   		
		cursor_wait();
		CommonControllersDeclarationJS.setControllerURL('CategoryDisplay_Controller',contentURL);		
		wc.render.updateContext("CategoryDisplay_Context");
	},
	
	
	/**
	* loadSubCategoryContentURL Sets the URL of the page to load into SubCategoryDisplay_Controller which in turn is used to display sub categories 
	* 							on the CategoryDisplay.jsp and DepartmentDisplay.jsp. The HistoryTracker is also updated.
	* 
	* @param {String} contentURL The URL to display for a sub category.
	*
	**/
	loadSubCategoryContentURL:function(contentURL){
		
		MessageHelper.hideAndClearMessage();

		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}   		
		cursor_wait();
		CommonControllersDeclarationJS.setControllerURL('SubCategoryDisplay_Controller',contentURL);	
		wc.render.updateContext("SubCategoryDisplay_Context");
	},
	
	/**
	* goBack Called when the back button is clicked in the browser. 
	*		 Uses the changeUrl set by the HistoryTracker and calls the loadContentURL method so that the state of the page get 
	* 		 loaded from a previous state in the page history.
	**/
	goBack:function(){
		
		categoryDisplayJS.loadContentURL(this.changeUrl);
		categoryDisplayJS.isHistory=true;

	},


	/**
	* goForward Called when the forward button is clicked in the browser. 
	*			Uses the changeUrl set by HistoryTracker and calls the loadContentURL method so that the state of the page gets
	*           loaded from the next available point in the page history.
	**/
	goForward:function(){
		
		categoryDisplayJS.loadContentURL(this.changeUrl);
		isHistory=true;
	},


	/**
	* HistoryTracker Used to track the history for the browser back and forward buttons.
	*
	* @param {String} elementId HistoryTracker id.
	* @param {String} changeUrl The change url of the current state.
	*
	**/
	HistoryTracker:function(elementId, changeUrl){
	
		this.elementId = elementId; 
		this.changeUrl =  changeUrl;

	},
	
	/**
	* processBookmarkURL Processes the bookmark using the bookmarkId which is stored in location.hash.
	**/
	processBookmarkURL : function(){
		
			var bookmarkId = location.hash;	
			if(bookmarkId){					        
				bookmarkId = bookmarkId.substring(1, bookmarkId.length);
			}   
			if(bookmarkId){
				var indexOfIdentifier = bookmarkId.indexOf("identifier", 0);
				if ( indexOfIdentifier >= 0) {
					var realUrl = bookmarkId.substring(0, indexOfIdentifier - 1);
				}
			}

			if(bookmarkId == null || bookmarkId == ""){

			}
	},
	
	
	/**
	* initializeMerchandisingAssociation Since the merchandising associations are only displayed one at a time with a scrolling widget this method
	*									 will initialize that widget with a specified starting index represented by thumbnailIndex so that the correct 
	*									 merchandising association is displayed first.
	*									 This function is called on MerchandisingAssociationsDisplay.jsp.s
	* 
	* @param {String} thumbnailIndex The index of the association that needs to be displayed.
	*
	**/
	initializeMerchandisingAssociation:function(thumbnailIndex){
	
	var associationDisplay = document.getElementById("marchandisingAssociationDisplay");
	var totalPriceMsg = document.getElementById("totalPriceMsg").value;
	var baseCatEntryJSON = eval('('+ dojo.byId("baseCatEntryDetails").innerHTML +')');
	this.baseCatalogEntryDetails = baseCatEntryJSON;
	var basePrice=this.baseCatalogEntryDetails[0].baseCatEntry_Price;
	this.totalAssociationCount= this.baseCatalogEntryDetails[0].totalAssociations;
	var identifierJSON = "associatedCatEntries_"+thumbnailIndex;
	var associationEntryJSON = eval('('+ dojo.byId(identifierJSON).innerHTML +')');
	this.merchandisingAssociationItems = associationEntryJSON;
	var totalPrice = parseFloat(basePrice)+ parseFloat(this.merchandisingAssociationItems[0].catEntry_Price);
	var dragType = "";
		
	if(this.merchandisingAssociationItems[0].catEntry_Type =='ProductBean'){
		dragType = "product";
	}else if (this.merchandisingAssociationItems[0].catEntry_Type =='ItemBean'){
		dragType = "item";
	}else if (this.merchandisingAssociationItems[0].catEntry_Type =='PackageBean'){
		dragType = "package";
	}else if (this.merchandisingAssociationItems[0].catEntry_Type =='BundleBean'){
		dragType = "bundle";
	}
//Creates the inner HTML of the associated item determined by the thumbnailIndex which needs to be displayed in the page.
var widgetHTML = "";
if(document.getElementById('addToCartLink')){
var url = "AjaxOrderItemDisplayView?storeId="+this.storeId+"&catalogId="+this.catalogId+"&langId="+this.langId;
						widgetHTML = widgetHTML
						+"<form name='OrderItemAddForm_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' action='OrderChangeServiceItemAdd' method='post' id='OrderItemAddForm_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'>\n"
						+"<input type='hidden' name='storeId' value='"+this.storeId+"' id='OrderItemAddForm_storeId_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' name='orderId' value='.' id='OrderItemAddForm_orderId_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' name='catalogId' value='"+this.catalogId+"' id='OrderItemAddForm_orderId_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' name='URL' value='"+ url + "' id='OrderItemAddForm_url_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' name='errorViewName' value='InvalidInputErrorView' id='OrderItemAddForm_errorViewName_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' name='catEntryId' value='"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' id='OrderItemAddForm_catEntryId_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' name='productId' value='"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' id='OrderItemAddForm_productId_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' value='1' name='quantity' id='OrderItemAddForm_quantity_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' value='' name='page' id='OrderItemAddForm_page_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' value='-1,-2,-3,-4,-5,-6,-7' name='calculationUsage' id='OrderItemAddForm_calcUsage_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' value='0' name='updateable' id='OrderItemAddForm_updateable_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"<input type='hidden' value='' name='giftListId' id='OrderItemAddForm_giftListId_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'/>\n"
						+"</form>\n";
						}
widgetHTML = widgetHTML					
			+"<div class='scroller' id='WC_CategoryDisplayJS_div_1'>";
			if(this.totalAssociationCount > 1){
				if(this.associationThumbnailIndex < this.totalAssociationCount){
					widgetHTML = widgetHTML
					+"		<a href='Javascript:categoryDisplayJS.showNextAssociation()'  id='WC_ProductAssociation_UpArrow_Link_1'>";
				}
				widgetHTML = widgetHTML
				+"		<img src='"+this.baseCatalogEntryDetails[0].storeImage_Path+"i_up_arrow.png' alt='"+this.displayNextAssociation+"'/></a>";
			}
			widgetHTML = widgetHTML +" <br />"
			+"<div id='baseContent_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"'";
			if(this.merchandisingAssociationItems[0].showProductQuickView == 'true'){
				widgetHTML = widgetHTML
				+" onmouseover='showPopupButton("+this.merchandisingAssociationItems[0].catEntry_Identifier+");' onmouseout='hidePopupButton("+this.merchandisingAssociationItems[0].catEntry_Identifier+");'>";
			}else{
				widgetHTML = widgetHTML
				+" >";
			}
			if(this.merchandisingAssociationItems[0].productDragAndDrop == 'true'){
				widgetHTML = widgetHTML
					+" <div dojoType='dojo.dnd.Source' jsId='dndSource' id="+this.merchandisingAssociationItems[0].catEntry_Identifier+" copyOnly='true' dndType='"+dragType+"'>"
					+"		<div class='dojoDndItem' dndType='"+dragType+"' id='WC_CategoryDisplayJS_div_draganddrop'>";
			}
			widgetHTML = widgetHTML
			+"	<a href='"+this.merchandisingAssociationItems[0].catEntry_ProductLink+"'  id='img"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' onfocus='showPopupButton("+this.merchandisingAssociationItems[0].catEntry_Identifier+");'>";
					if(this.merchandisingAssociationItems[0].productDragAndDrop == 'true' && dojo.isIE == 6)
					{
						widgetHTML = widgetHTML
						+"<iframe class='productDnDIFrame' scrolling='no' frameborder='0' src='"+getImageDirectoryPath()+"images/empty.gif'></iframe>";
					}
			widgetHTML = widgetHTML
			+"		<img src='"+this.merchandisingAssociationItems[0].catEntry_Thumbnail+"' alt='"+this.merchandisingAssociationItems[0].catEntry_ShortDescription+"' class='img' width='70' height='70'/>"
			+"	</a><br />";
			if(this.merchandisingAssociationItems[0].productDragAndDrop == 'true'){
				widgetHTML = widgetHTML
					+"		</div>"
					+"	</div>";
			}
			if(this.merchandisingAssociationItems[0].showProductQuickView == 'true'){
				widgetHTML = widgetHTML
				+" <div id='popupButton_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' class='main_quickinfo_button'>"
					+"<span class='secondary_button' >\n"
						+"<span class='button_container' >\n"
							+"<span class='button_bg' >\n"
								+"<span class='button_top'>\n"
									+"<span class='button_bottom'>\n"
										+"<a id='QuickInfoButton_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' href='#' onclick='javaScript:var actionListImageAcct = new popupActionProperties(); actionListImageAcct.showWishList="+this.merchandisingAssociationItems[0].associationProductBuyable+"; actionListImageAcct.showAddToCart="+this.merchandisingAssociationItems[0].associationProductBuyable+"; showPopup("+this.merchandisingAssociationItems[0].catEntry_Identifier+",event,null,null,actionListImageAcct);' onkeypress='javaScript:var actionListImageAcct = new popupActionProperties(); actionListImageAcct.showWishList="+this.merchandisingAssociationItems[0].associationProductBuyable+"; actionListImageAcct.showAddToCart="+this.merchandisingAssociationItems[0].associationProductBuyable+"; showPopup("+this.merchandisingAssociationItems[0].catEntry_Identifier+",event,null,null,actionListImageAcct);' onblur='hidePopupButton("+this.merchandisingAssociationItems[0].catEntry_Identifier+");' role='wairole:button' waistate:haspopup='true'>"+this.merchandisingAssociationItems[0].showProductQuickViewLable+"</a>"
									+"</span>\n"
								+"</span>\n"
							+"</span>\n"
						+"</span>\n"
					+"</span>\n"										
				+"</div>\n";
			}
			widgetHTML = widgetHTML
			+"</div>";	
		
			if(this.totalAssociationCount > 1){
				if(this.associationThumbnailIndex > 1 ){
					widgetHTML = widgetHTML
					+"		<a href='Javascript:categoryDisplayJS.showPreviousAssociation()'  id='WC_ProductAssociation_DownArrow_Link_1'>";
				}
				widgetHTML = widgetHTML
				+"		<img src='"+this.baseCatalogEntryDetails[0].storeImage_Path+"i_down_arrow.png' alt='"+this.displayPrevAssociation+"'/></a>";
			}
			
			var comboText = this.baseCatalogEntryDetails[0].associatedProductsName.replace(/%0/, this.baseCatalogEntryDetails[0].baseCatEntry_Name);
			comboText = comboText.replace(/%1/, this.merchandisingAssociationItems[0].catEntry_Name);
			
			widgetHTML = widgetHTML
			+"</div>"
			+"<div class='combo_text' id='WC_CategoryDisplayJS_div_2'>\n"
			+"	<h1 id='maHeader' class='status_msg'>"+ comboText +"</h1>\n"
			+"	<span id='maPrice' class='grey'>"+totalPriceMsg+dojo.currency.format(totalPrice.toFixed(2), {currency: this.baseCatalogEntryDetails[0].currency})+"</span>\n"
			+"</div>\n";
			widgetHTML = widgetHTML
			+"<input type='hidden' id='compareImgPath_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' value='"+this.merchandisingAssociationItems[0].catEntry_Thumbnail_compare+"'/>"
			+"<input type='hidden' id='compareProductDetailsPath_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' value='"+this.merchandisingAssociationItems[0].catEntry_ProductLink+"'/>"
			+"<input type='hidden' id='compareImgDescription_"+this.merchandisingAssociationItems[0].catEntry_Identifier+"' value='"+this.merchandisingAssociationItems[0].catEntry_ShortDescription+"'/>";
			associationDisplay.innerHTML=null;
			associationDisplay.innerHTML=widgetHTML;
			dojo.parser.parse(associationDisplay);
},


	/**
	* showNextAssociation Displays the next association in the association array. No action is performed if it is already at the last item.
	*				      This function is used with the merchandising association widget on the MerchandisingAssociationDisplay.jsp to display the next
	*					  association available.
	**/
	showNextAssociation : function(){
		
		if(this.associationThumbnailIndex < this.totalAssociationCount){
			this.associationThumbnailIndex = this.associationThumbnailIndex+1;
			this.initializeMerchandisingAssociation(this.associationThumbnailIndex);
		}
	},

	/**
	* showPreviousAssociation Displays the previous association in the association array. No action is performed if it is already the first item.
	*				      This function is used with the merchandising association widget on the MerchandisingAssociationDisplay.jsp to display the previous
	*					  association available.
	**/
	showPreviousAssociation : function(){
		
	if(this.associationThumbnailIndex > 1 ){
			this.associationThumbnailIndex = this.associationThumbnailIndex-1;
			this.initializeMerchandisingAssociation(this.associationThumbnailIndex);
		}
	},

	/**
	* AddAssociation2ShopCartAjax Adds the associated product to the shopping cart when AjaxAddToCart is enabled.
	*
	* @param {String} baseProductId The catalog entry ID of the parent product.
	* @param {int} baseProductQuantity The quantity of the parent product to add.
	*
	**/
	AddAssociation2ShopCartAjax:function(baseProductId,baseProductQuantity){
	
		var identifierJSON = "associatedCatEntries_"+this.associationThumbnailIndex;
		//Get the associated item from the JSON object.
		var associationEntryJSON = eval('('+ dojo.byId(identifierJSON).innerHTML +')');
		this.merchandisingAssociationItems = associationEntryJSON;
		this.baseItemAddedToCart = false;
		//Add the parent product to the cart.
		if(this.merchandisingAssociationItems[0].catEntry_Type=='ProductBean'){
			this.Add2ShopCartAjax(baseProductId,baseProductQuantity);
			if(this.baseItemAddedToCart){
				//Show the pop-up to select the attributes of the associated product.
				showPopup(this.merchandisingAssociationItems[0].catEntry_Identifier,function(e){return e;},'marchandisingAssociationDisplay');
			}
		}else if (this.merchandisingAssociationItems[0].catEntry_Type=='ItemBean' || this.merchandisingAssociationItems[0].catEntry_Type=='PackageBean' || this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
			//Get the associated item from the JSON object.
			var entitledItemJSON = eval('('+ dojo.byId(baseProductId).innerHTML +')');
			this.setEntitledItems(entitledItemJSON);
			var catalogEntryId = this.getCatalogEntryId();
			var params = [];
				params.storeId		= this.storeId;
				params.catalogId	= this.catalogId;
				params.langId			= this.langId;
				params.orderId		= ".";
				params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			if(catalogEntryId!=null){
				this.updateParamObject(params,"catEntryId",catalogEntryId,false,-1);
				this.updateParamObject(params,"quantity",baseProductQuantity,false,-1);
				if(this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
					var form = document.getElementById(this.merchandisingAssociationItems[0].catEntry_BundleFormId);
					var catEntryArray = [];
					// add the individual bundle items to the request.
					catEntryArray = form.catEntryIDS.value.toString().split(",");
					for(var i = 0; i < catEntryArray.length; i++){
						var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
						var catEntryId = catEntryArray[i];
						if(this.getDefaultItem(catEntryArray[i]))
							catEntryId = this.getDefaultItem(catEntryArray[i]);
						if(qty==0 || qty == null) qty = 1;
						if(qty!=null && qty!='' && catEntryId!=null){
							this.updateParamObject(params,"catEntryId",catEntryId,false,-1);
							this.updateParamObject(params,"quantity",qty,false,-1);
						}else{
							MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
							return;
						}
					}
				}else{
					this.updateParamObject(params,"catEntryId",this.merchandisingAssociationItems[0].catEntry_Identifier,false,-1);
					this.updateParamObject(params,"quantity",1,false,-1);
				}
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
				return;
			}
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			}   		
			cursor_wait();				
			//Invoke service to add to the cart.
			wc.service.invoke("AjaxAddOrderItem", params);
		}
	},

	/**
	* AddMarchandisingAssociation2ShopCart Adds the associated product to the shopping cart when AjaxAddToCart is disabled.
	*
	* @param {String} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	* @param {form} form The form which contains the details of the item that needs to be added to the cart. This method will set the quanitty, catEntryId_1, productId_1 as well as
	*					 quantity_2, catEntryId_2 and productId_2 values in the form based on the values from the quantity you enter into this method and the catalog entry ID 
	* 					 resolved from retrieving the catalog entry ID of the entitled item passed in.						
	* @param {int} quantity The quantity of the parent product to add.
	*
	**/
	AddMarchandisingAssociation2ShopCart : function(entitledItemId,form,quantity){
	
	var identifierJSON = "associatedCatEntries_"+this.associationThumbnailIndex;
	var associationEntryJSON = eval('('+ dojo.byId(identifierJSON).innerHTML +')');
	this.merchandisingAssociationItems = associationEntryJSON;
	//get the item form the JSON object	
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
	var catalogEntryId_1 = this.getCatalogEntryId();
	//Add the product to the cart if the product attributes are selected otherwise show the pop-up dialog.	
	if(this.merchandisingAssociationItems[0].catEntry_Type=='ProductBean'){
		if(catalogEntryId_1!=null){
			form.catEntryId_1.value = catalogEntryId_1;
			form.productId_1.value = catalogEntryId_1;
			form.quantity_1.value = quantity;
			this.merchandisingProductAssociationAddToCart = true;
			this.merchandisingProductAssociationForm = form;
			showPopup(this.merchandisingAssociationItems[0].catEntry_Identifier,function(e){return e;},'marchandisingAssociationDisplay');
		}else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
			return;
		}
	}else if (this.merchandisingAssociationItems[0].catEntry_Type=='ItemBean' || this.merchandisingAssociationItems[0].catEntry_Type=='PackageBean' || this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
		//Add the  items to the shop cart.
		if(catalogEntryId_1!=null){
			form.catEntryId_1.value = catalogEntryId_1;
			form.productId_1.value = catalogEntryId_1;
			form.quantity_1.value = quantity;
			if(this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
				// add the individual bundle items to the request.
				var bundleForm = document.getElementById(this.merchandisingAssociationItems[0].catEntry_BundleFormId);
				var catEntryArray = [];
				catEntryArray = bundleForm.catEntryIDS.value.toString().split(",");
				var catEntryCount = 3;
				for(var i = 0; i < catEntryArray.length; i++){
					var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
					var catEntryId = catEntryArray[i];
					if(this.getDefaultItem(catEntryArray[i]))
							catEntryId = this.getDefaultItem(catEntryArray[i]);
					if(qty==0 || qty == null) qty = 1;
					if(qty!=null && qty!='' && catEntryId!=null){
						if(i==0){
							form.catEntryId_2.value = catEntryId;
							form.productId_2.value = catEntryId;
							form.quantity_2.value = qty;	
						}else{
							var input1 = document.createElement("input");
							input1.setAttribute("id", "OrderAssociationItemAddForm_catEntryId_"+catEntryId);
							input1.setAttribute("type", "hidden");
							input1.setAttribute("name", "catEntryId_"+catEntryCount);
							input1.setAttribute("value", catEntryId);
							form.appendChild(input1);
							var input2 = document.createElement("input");
							input2.setAttribute("id", "OrderAssociationItemAddForm_productId_"+catEntryId);
							input2.setAttribute("type", "hidden");
							input2.setAttribute("name", "productId_"+catEntryCount);
							input2.setAttribute("value", catEntryId);
							form.appendChild(input2);
							var quantity1 = document.createElement("input");
							quantity1.setAttribute("id", "OrderAssociationItemAddForm_quantity_"+catEntryId);
							quantity1.setAttribute("type", "hidden");
							quantity1.setAttribute("name", "quantity_"+catEntryCount);
							quantity1.setAttribute("value", "1");
							form.appendChild(quantity1);
							catEntryCount = catEntryCount+1;
						}
						
					}else{
						MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
						return;
					}
				}
			}else{
				form.catEntryId_2.value = this.merchandisingAssociationItems[0].catEntry_Identifier;
				form.productId_2.value = this.merchandisingAssociationItems[0].catEntry_Identifier;
				form.quantity_2.value = "1";
			}
			
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			}

			// submit the form to add the items to the shop cart.
			form.submit();	
		}else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
			return;
		}
		}
	},

	/** 
	* AddAssociation2ShopCart Adds an associated product to the shopping cart. This function is called by other functions in the FastFinderDisplay.js such as Add2ShopCart().
	* 
	* @param {String} associatedItemId The catalog entry ID of the associated item.
	* @param {int} quantity The quantity of the associated item to add.
	*
	**/
	AddAssociation2ShopCart:function(associatedItemId,quantity){
	
	var form = this.merchandisingProductAssociationForm;
	this.merchandisingProductAssociationAddToCart = false;
	if(this.isParentBundleBean){
		// add the individual bundle items to the request.
		var catEntryArray = [];
		catEntryArray = form.catEntryIDS.value.toString().split(",");
		var bundleItemsCount = 1;
		for(var i = 0; i < catEntryArray.length; i++){
			var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
			var catEntryId = catEntryArray[i];
			if(this.selectedProducts[catEntryArray[i]])
				catEntryId = this.getCatalogEntryIdforProduct(this.selectedProducts[catEntryArray[i]]);
			if(qty==0 || qty == null) qty = 1;
			if(qty!=null && qty!='' && catEntryId!=null){
				var input1 = document.createElement("input");
				input1.setAttribute("id", "OrderItemAddForm_catEntryId_"+catEntryId);
				input1.setAttribute("type", "hidden");
				input1.setAttribute("name", "catEntryId_"+bundleItemsCount);
				input1.setAttribute("value", catEntryId);
				bundleItemsCount = bundleItemsCount + 1;
				form.appendChild(input1);
			}else{
				MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
				return;
			}
		}
		var input2 = document.createElement("input");
		input2.setAttribute("id", "OrderItemAddForm_catEntryId_"+associatedItemId);
		input2.setAttribute("type", "hidden");
		input2.setAttribute("name", "catEntryId_"+bundleItemsCount);
		input2.setAttribute("value", associatedItemId);
		form.appendChild(input2);
		var quantity1 = document.createElement("input");
		quantity1.setAttribute("id", "OrderItemAddForm_quantity_"+associatedItemId);
		quantity1.setAttribute("type", "hidden");
		quantity1.setAttribute("name", "quantity_"+bundleItemsCount);
		quantity1.setAttribute("value", quantity);
		form.appendChild(quantity1);
		form.URL.value = "AjaxOrderItemDisplayView";
		this.isParentBundleBean = false;
	}else{
		form.catEntryId_2.value = associatedItemId;
		form.productId_2.value = associatedItemId;
		form.quantity_2.value = quantity;
	}
	
	//For Handling multiple clicks
	if(!submitRequest()){
		return;
	}
	
	// submit the form to add the items to the shop cart.
	form.submit();
	this.merchandisingProductAssociationForm = "";
	},

	/**
	* AddAssociationItem2ShopCartAjax Adds the associated item to the shopping cart when AjaxAddToCart is enabled.
	*								  This function is called from MerchandisingAssociationsDisplay.jsp to add an associated item to the shopping cart.
	*
	* @param {String} baseItemId The catalog entry ID of the item to add.
	* @param {int} baseItemQuantity The quantity to add.
	* @param {Object} customParams - Any additional parameters that needs to be passed during service invocation.
	*
	**/
	AddAssociationItem2ShopCartAjax:function(baseItemId , baseItemQuantity, customParams) {
	
	var ajaxShopCartService = "AjaxAddOrderItem";
	var identifierJSON = "associatedCatEntries_"+this.associationThumbnailIndex;
	//get the item form the JSON object	
	var associationEntryJSON = eval('('+ dojo.byId(identifierJSON).innerHTML +')');
	this.merchandisingAssociationItems = associationEntryJSON;
	this.baseItemAddedToCart = false;
	//Add the parent item to the cart and if the associated catentry is a product bean then show the pop-up dialog.
	if(this.merchandisingAssociationItems[0].catEntry_Type=='ProductBean'){
		this.AddItem2ShopCartAjax(baseItemId,baseItemQuantity,customParams);
		if(this.baseItemAddedToCart){
			showPopup(this.merchandisingAssociationItems[0].catEntry_Identifier,function(e){return e;},'marchandisingAssociationDisplay');
		}
	}else if (this.merchandisingAssociationItems[0].catEntry_Type=='ItemBean' || this.merchandisingAssociationItems[0].catEntry_Type=='PackageBean' || this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
			var params = [];
				params.storeId		= this.storeId;
				params.catalogId	= this.catalogId;
				params.langId			= this.langId;
				params.orderId		= ".";
				params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			this.updateParamObject(params,"catEntryId",baseItemId,false,-1);
			this.updateParamObject(params,"quantity",baseItemQuantity,false,-1);
			// add the individual bundle items to the request.
			if(this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
				var form = document.getElementById(this.merchandisingAssociationItems[0].catEntry_BundleFormId);
				var catEntryArray = [];
				catEntryArray = form.catEntryIDS.value.toString().split(",");
				for(var i = 0; i < catEntryArray.length; i++){
					var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
					var catEntryId = catEntryArray[i];
					if(this.getDefaultItem(catEntryArray[i]))
							catEntryId = this.getDefaultItem(catEntryArray[i]);
					if(qty==0 || qty == null) qty = 1;
					if(qty!=null && qty!='' && catEntryId!=null){
						this.updateParamObject(params,"catEntryId",catEntryId,false,-1);
						this.updateParamObject(params,"quantity",qty,false,-1);
					}else{
						MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
						return;
					}
				}
			}else{
				this.updateParamObject(params,"catEntryId",this.merchandisingAssociationItems[0].catEntry_Identifier,false,-1);
				this.updateParamObject(params,"quantity",1,false,-1);
			}
			
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			} 			
			cursor_wait();			
			//Invoke service to add item to the cart.
			if(customParams != null && customParams != 'undefined'){
				if(customParams['catalogEntryType'] == 'dynamicKit' ){
					ajaxShopCartService = "AjaxAddPreConfigurationToCart";
				}
			}

			wc.service.invoke(ajaxShopCartService, params);
		}
	},

	/**
	* AddAssociationItem2ShopCart Adds the parent item with associated catentry to the shopping cart when AjaxAddToCart is disabled.
	*
	* @param {form} form The form which contains the details of the item that needs to be added to the cart. The {@link fastFinderJS.merchandisingProductAssociationForm}
	*				      is set to the the form passed in. The forms quanitity_1 and quantity_2 values are set according to the values passed in 
	*					  for quantity and the value of the quantity_<catEntryId> element for the two quantity values respectively. The catEntryId_2 and productId_2 values
	*					  are also set. 
	* @param {int} quantity The quantity of the item to add to the cart.
	*
	**/
	AddAssociationItem2ShopCart : function(form,quantity){

	var identifierJSON = "associatedCatEntries_"+this.associationThumbnailIndex;
	//Get the associated item from the JSON object.
	var associationEntryJSON = eval('('+ dojo.byId(identifierJSON).innerHTML +')');
	this.merchandisingAssociationItems = associationEntryJSON;
	//Add the parent item to the cart and if the associated catentry is a product bean then show the pop-up dialog.
	if(this.merchandisingAssociationItems[0].catEntry_Type=='ProductBean'){
		if(quantity) form.quantity_1.value = quantity;
		this.merchandisingProductAssociationAddToCart = true;
		this.merchandisingProductAssociationForm = form;
		showPopup(this.merchandisingAssociationItems[0].catEntry_Identifier,function(e){return e;},'marchandisingAssociationDisplay');
	}else if (this.merchandisingAssociationItems[0].catEntry_Type=='ItemBean' || this.merchandisingAssociationItems[0].catEntry_Type=='PackageBean' || this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
		if(quantity) form.quantity_1.value = quantity;
			// add the individual bundle items to the request.
			if(this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
				var bundleForm = document.getElementById(this.merchandisingAssociationItems[0].catEntry_BundleFormId);
				var catEntryArray = [];
				catEntryArray = bundleForm.catEntryIDS.value.toString().split(",");
				var catEntryCount = 3;
				for(var i = 0; i < catEntryArray.length; i++){
					var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
					var catEntryId = catEntryArray[i];
					if(this.getDefaultItem(catEntryArray[i]))
							catEntryId = this.getDefaultItem(catEntryArray[i]);
					if(qty==0 || qty == null) qty = 1;
						if(i==0){
							form.catEntryId_2.value = catEntryId;
							form.productId_2.value = catEntryId;
							form.quantity_2.value = qty;	    
						}else{
							var input1 = document.createElement("input");
							input1.setAttribute("id", "OrderAssociationItemAddForm_catEntryId_"+catEntryId);
							input1.setAttribute("type", "hidden");
							input1.setAttribute("name", "catEntryId_"+catEntryCount);
							input1.setAttribute("value", catEntryId);
							form.appendChild(input1);
							var input2 = document.createElement("input");
							input2.setAttribute("id", "OrderAssociationItemAddForm_productId_"+catEntryId);
							input2.setAttribute("type", "hidden");
							input2.setAttribute("name", "productId_"+catEntryCount);
							input2.setAttribute("value", catEntryId);
							form.appendChild(input2);
							var quantity1 = document.createElement("input");
							quantity1.setAttribute("id", "OrderAssociationItemAddForm_quantity_"+catEntryId);
							quantity1.setAttribute("type", "hidden");
							quantity1.setAttribute("name", "quantity_"+catEntryCount);
							quantity1.setAttribute("value", "1");
							form.appendChild(quantity1);
							catEntryCount = catEntryCount+1;
						}
					}
			}else{
				form.catEntryId_2.value = this.merchandisingAssociationItems[0].catEntry_Identifier;
				form.productId_2.value = this.merchandisingAssociationItems[0].catEntry_Identifier;
				form.quantity_2.value = "1";
			}
			
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			}
			
			//submit the form to add the item to the cart.
			form.submit();	
		}
	},

	/**
	* AddAssociationBundle2ShopCartAjax Adds the parent bundle and associated products to the shopping cart when AjaxAddToCart is enabled.
	*									This function is used on MerchandisingAssociationsDisplay.jsp.
	*
	* @param {form} form The form which contains the details of the catalog entries that need to be added to the cart.
	* 				      This form is expected to have a comma separated list of catalog entry IDs of catalog entries in the bundle which should be added to the shopping cart.
	*
	**/
	AddAssociationBundle2ShopCartAjax:function(form){

	var identifierJSON = "associatedCatEntries_"+this.associationThumbnailIndex;
	//Get the associated item from the JSON object.
	var associationEntryJSON = eval('('+ dojo.byId(identifierJSON).innerHTML +')');
	this.merchandisingAssociationItems = associationEntryJSON;
	this.baseItemAddedToCart = false;
//Add the parent bundle to the cart and show the pop-up dialog for the associated product.
			
			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			params.orderId		= ".";
			params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		// add the individual bundle items of the parent bundle to the request.
			var catEntryArray = [];
			catEntryArray = form.catEntryIDS.value.toString().split(",");
			for(var i = 0; i < catEntryArray.length; i++){
				var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
				var catEntryId = catEntryArray[i];
				if(this.getDefaultItem(catEntryArray[i]))
							catEntryId = this.getDefaultItem(catEntryArray[i]);
				if(qty==0 || qty == null) qty = 1;
				if(qty!=null && qty!='' && catEntryId!=null){
					this.updateParamObject(params,"catEntryId",catEntryId,false,-1);
					this.updateParamObject(params,"quantity",qty,false,-1);
					this.baseItemAddedToCart = "true";
				}else{
					MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
					return;
				}
			}
			// add the individual bundle items of the associated bundle to the request.
			if(this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
					var bundleForm = document.getElementById(this.merchandisingAssociationItems[0].catEntry_BundleFormId);
					var innerCatEntryArray = [];
					innerCatEntryArray = bundleForm.catEntryIDS.value.toString().split(",");
					for(var i = 0; i < innerCatEntryArray.length; i++){
						var qty = document.getElementById("quantity_" + innerCatEntryArray[i]).value;
						var innerCatEntryId = innerCatEntryArray[i];
						if(this.getDefaultItem(innerCatEntryArray[i]))
							innerCatEntryId = this.getDefaultItem(innerCatEntryArray[i]);
						if(qty==0 || qty == null) qty = 1;
						if(qty!=null && qty!='' && innerCatEntryId!=null){
							this.updateParamObject(params,"catEntryId",innerCatEntryId,false,-1);
							this.updateParamObject(params,"quantity",qty,false,-1);
						}else{
							MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
							return;
						}
					}
				}else if(this.merchandisingAssociationItems[0].catEntry_Type=='PackageBean' || this.merchandisingAssociationItems[0].catEntry_Type=='ItemBean'){
					this.updateParamObject(params,"catEntryId",this.merchandisingAssociationItems[0].catEntry_Identifier,false,-1);
					this.updateParamObject(params,"quantity",1,false,-1);
				}
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			}   
			cursor_wait();			
			//Invoke service to add to the cart.
			wc.service.invoke("AjaxAddOrderItem", params);
	
	   if(this.merchandisingAssociationItems[0].catEntry_Type=='ProductBean'){
		   showPopup(this.merchandisingAssociationItems[0].catEntry_Identifier,function(e){return e;},'marchandisingAssociationDisplay');
	   }
},

/** 
* Sets the orderID if it is not already set on the Current Order page. 
* The order ID is used to determine which order to act upon such as in the case of replacing an order item in an order.
* @param {String} orderId The orderID to use.
*/
setOrderId : function(orderId)
{
	this.orderId = orderId;
},

	/**
	* AddAssociationBundle2ShopCart Adds the parent bundle and associated product to the shopping cart when AjaxAddToCart is disabled.
	*								This function is used on MerchandisingAssociationsDisplay.jsp. 
	* 
	* @param {form} form The form which contains the details of the catalog entries that need to be added to the cart.
	* 						The {@link fastFinderJS.merchandisingProductAssociationForm} is set to the form passed in.
	*						The form is expected to have a value for catEntryIDS which is a list of catalog entry IDs of the catalog entries in the bundle which should be
	*						added to the shopping cart.
	*
	**/
	AddAssociationBundle2ShopCart : function(form){
	
	var identifierJSON = "associatedCatEntries_"+this.associationThumbnailIndex;
	//get the item form the JSON object	
	var associationEntryJSON = eval('('+ dojo.byId(identifierJSON).innerHTML +')');
	this.merchandisingAssociationItems = associationEntryJSON;
	this.isParentBundleBean = true;
	//Add the parent bundle to the cart and show the pop-up dialog for the associated product.
	if(this.merchandisingAssociationItems[0].catEntry_Type=='ProductBean'){
		this.merchandisingProductAssociationAddToCart = true;
		this.merchandisingProductAssociationForm = form;
		var catEntryArray = [];
		// add the individual bundle items of the parent bundle to the request.
		catEntryArray = form.catEntryIDS.value.toString().split(",");
		var bundleItemsCount = 1;
		for(var i = 0; i < catEntryArray.length; i++){
			var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
			var catEntryId = catEntryArray[i];
			if(this.getDefaultItem(catEntryArray[i]))
							catEntryId = this.getDefaultItem(catEntryArray[i]);
			if(catEntryId != null)
							form["catEntryId_" + catEntryArray[i]].value = catEntryId;				
			else{
					MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
					return;
			}
			bundleItemsCount = bundleItemsCount + 1;
			
		}
		showPopup(this.merchandisingAssociationItems[0].catEntry_Identifier,function(e){return e;},'marchandisingAssociationDisplay');
	}else if (this.merchandisingAssociationItems[0].catEntry_Type=='ItemBean' || this.merchandisingAssociationItems[0].catEntry_Type=='PackageBean' || this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
		var catEntryArray = [];
		// add the individual bundle items of the parent bundle to the request.
		catEntryArray = form.catEntryIDS.value.toString().split(",");
		var bundleItemsCount = 1;
		for(var i = 0; i < catEntryArray.length; i++){
			var qty = document.getElementById("quantity_" + catEntryArray[i]).value;
			var catEntryId = catEntryArray[i];
			if(this.getDefaultItem(catEntryArray[i]))
							catEntryId = this.getDefaultItem(catEntryArray[i]);
			if(catEntryId != null)
							form["catEntryId_" + catEntryArray[i]].value = catEntryId;				
			else{
					MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
					return;
			}
			bundleItemsCount = bundleItemsCount + 1;
			
		}
		if(this.merchandisingAssociationItems[0].catEntry_Type=='BundleBean'){
			// add the individual bundle items of the associated bundle to the request.
			var bundleForm = document.getElementById(this.merchandisingAssociationItems[0].catEntry_BundleFormId);
			var innerCatEntryArray = [];
			innerCatEntryArray = bundleForm.catEntryIDS.value.toString().split(",");
			for(var i = 0; i < innerCatEntryArray.length; i++){
				var qty = document.getElementById("quantity_" + innerCatEntryArray[i]).value;
				var innerCatEntryId = innerCatEntryArray[i];
				if(this.getDefaultItem(innerCatEntryArray[i])){
							innerCatEntryId = this.getDefaultItem(innerCatEntryArray[i]);
							}
				if(qty==0 || qty == null) qty = 1;
				if(qty!=null && qty!='' && innerCatEntryId!=null){
					var input2 = document.createElement("input");
					input2.setAttribute("id", "OrderItemAddForm_catEntryId_"+innerCatEntryId);
					input2.setAttribute("type", "hidden");
					input2.setAttribute("name", "catEntryId_"+bundleItemsCount);
					input2.setAttribute("value", innerCatEntryId);
					form.appendChild(input2);
					var quantity2 = document.createElement("input");
					quantity2.setAttribute("id", "OrderItemAddForm_quantity_"+innerCatEntryId);
					quantity2.setAttribute("type", "hidden");
					quantity2.setAttribute("name", "quantity_"+bundleItemsCount);
					quantity2.setAttribute("value", "1");
					form.appendChild(quantity2);
					bundleItemsCount = bundleItemsCount + 1;
				}else{
					MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU']);
					return;
				}
			}
		}else{
			var input2 = document.createElement("input");
			input2.setAttribute("id", "OrderItemAddForm_catEntryId_"+this.merchandisingAssociationItems[0].catEntry_Identifier);
			input2.setAttribute("type", "hidden");
			input2.setAttribute("name", "catEntryId_"+bundleItemsCount);
			input2.setAttribute("value", this.merchandisingAssociationItems[0].catEntry_Identifier);
			form.appendChild(input2);
			var quantity2 = document.createElement("input");
			quantity2.setAttribute("id", "OrderItemAddForm_quantity_"+this.merchandisingAssociationItems[0].catEntry_Identifier);
			quantity2.setAttribute("type", "hidden");
			quantity2.setAttribute("name", "quantity_"+bundleItemsCount);
			quantity2.setAttribute("value", "1");
			form.appendChild(quantity2);
		}
		form.URL.value = "AjaxOrderItemDisplayView";
		
		//For Handling multiple clicks
		if(!submitRequest()){
			return;
		}
		
		//submit the form to add to cart.
		form.submit();
	}
	
},

	/**
	 * Resolves the SKU and adds the item to a new requisition list.
	 *  
	 * @param {String} entitledItemId The catalog entry ID of the item to add to the requisition list.
	 * @param {String} quantityElemId The ID of the Quantity field.
	 * @param {String} currentPage The URL of the current page. When a customer clicks Cancel on the requisition list creation page, they are redirected to the current page.
	 */
	addToNewListFromProductDetail:function (entitledItemId,quantityElemId,currentPage) {
		MessageHelper.hideAndClearMessage();
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
		var catalogEntryId = this.getCatalogEntryId();
		if(catalogEntryId!=null){
			this.addItemToNewListFromProductDetail(catalogEntryId, quantityElemId, currentPage);
		}
		else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU_REQ_LIST']);
			//Close the quick info pop-up if it exists
			if(dijit.byId('second_level_category_popup') != null){
				hidePopup('second_level_category_popup');
			}
			return;			
		}
	},
	
	/**
	 * Adds the item to a new requisition list.
	 *  
	 * @param {String} catalogEntryId The resolved catalog entry ID of the item to add to the requisition list.
	 * @param {String} quantityElemId The ID of the Quantity field.
	 * @param {String} currentPage The URL of the current page. When a customer clicks Cancel on the requisition list creation page, they are redirected to the current page.
	 */
	addItemToNewListFromProductDetail:function (catalogEntryId,quantityElemId,currentPage) {
		MessageHelper.hideAndClearMessage();
		if(catalogEntryId!=null){
			var quantity = document.getElementById(quantityElemId).value;
			if (quantity == null || quantity == "" || quantity<=0 || !RequisitionList.isNumber(quantity)) {
				MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
				//Close the quick info pop-up if it exists
				if(dijit.byId('second_level_category_popup') != null){
					hidePopup('second_level_category_popup');
				}
				return;
			}
			if(this.ajaxMyAccount){
				var URL = "AjaxLogonForm?page=createrequisitionlist";
			} else {
				var URL = "RequisitionListDetailView?editable=true&newList=true";
			}
			
			//using the form because the previousPage url can be very long
			var formObj = document.createElement("form");
			formObj.setAttribute("method","POST");
			
			var input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("value", currentPage);
			input.setAttribute("name", "previousPage");
			formObj.appendChild(input);
			
			formObj.action = URL + "&catEntryId="+catalogEntryId +"&quantity="+quantity+ "&storeId=" + this.storeId +"&catalogId=" + this.catalogId + "&langId=" + this.langId;
			
			document.body.appendChild(formObj); // have to add this form to the body node before submitting.
			formObj.submit();
		}
		else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU_REQ_LIST']);
		}
	},	
	
	/**
	 * Adds the bundle to a new requisition list.
	 *  
	 * @param {form} form The form that contains all of the inputs for the bundle.
	 * @param {String} currentPage The URL of the current page. When a customer clicks Cancel on the requisition list creation page, they are redirected to the current page.
	 */
	addBundleToNewListFromProductDetail:function (form,currentPage) {
		var productCount = form["numberOfProduct"].value;
		var URL = "";
		if(this.ajaxMyAccount){
			URL = "AjaxLogonForm?page=createrequisitionlist";
		} else {
			URL = "RequisitionListDetailView?editable=true&newList=true";
		}	
		
		for(var i = 1; i <= productCount; i++){
			var catEntryId = form["catEntryId_" + i].value;
			if(this.selectedProducts[catEntryId]) {
				catEntryId = this.getCatalogEntryIdforBundleProduct(catEntryId, this.selectedProducts[catEntryId]);
			}
			
			var qty = form["quantity_" + i].value;
			if(qty == null || qty == "" || qty<=0 || !RequisitionList.isNumber(qty)){ 
				MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']); 
				return;
			} else if(catEntryId!=null){			
				URL = URL + "&catEntryId=" + catEntryId + "&quantity=" + qty;
			} else{
				MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU_REQ_LIST']);
				return;
			}
		}
		
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("value", currentPage);
		input.setAttribute("name", "previousPage");
		form.appendChild(input);		
		
		URL = URL +"&numberOfProduct="+form.numberOfProduct.value+ "&storeId=" + this.storeId +"&catalogId=" + this.catalogId + "&langId=" + this.langId; 
		form.action=URL;
		form.submit();
	},	
	
	/**
	* Resolves the SKU and adds the item to an existing requisition list.
	*
	* @param {string} entitledItemId The catalog entry ID of the item to add to the requisition list.
	* @param {string} quantityElemId The ID of the Quantity field.
	* @param {boolean} ajaxAddToCart Indicates whether the AJAX Add to Cart flexflow is enabled.
	*/
	addToExistingRequisitionList:function (entitledItemId,quantityElemId,ajaxAddToCart) {
		//resolve the SKU for the product
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
		var catalogEntryId = this.getCatalogEntryId();
		
		if(catalogEntryId!=null){
			//Add the resolved SKU to the selected requisition list
			this.addItemToExistingRequisitionList(catalogEntryId,quantityElemId,ajaxAddToCart);
		} else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU_REQ_LIST']);
		}
	},	
	
	/** 
	* Adds the bundle to an existing requisition list.
	*
	* @param {form} form The form that contains all of the inputs for the bundle.
	* @param {boolean} ajaxAddToCart Indicates whether the AJAX Add to Cart flexflow is enabled.
	*/
	addBundleToExistingRequisitionList:function(form,ajaxAddToCart){
		//Get all the requisition list radio button inputs
		var reqListSelection = document.getElementsByName("RequisitionListTableDisplay_RequisitionListSelection");
		
		//Retrieve the requisition list id from the radio button selection
		for (var i=0; i<reqListSelection.length; i++) {
			if (reqListSelection.item(i).checked) {
				var requisitionListId = reqListSelection.item(i).value;
			} 
		}
		
		if(ajaxAddToCart){
			var params = [];
	
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			params["requisitionListId"] = requisitionListId;
				
			var productCount = form["numberOfProduct"].value;
			for(var i = 1; i <= productCount; i++){
				var catEntryId = form["catEntryId_" + i].value;
				if(this.selectedProducts[catEntryId]) {
					catEntryId = this.getCatalogEntryIdforBundleProduct(catEntryId,this.selectedProducts[catEntryId]);
				}
				
				var qty = form["quantity_" + i].value;
				if(qty == null || qty == "" || qty<=0 || !RequisitionList.isNumber(qty)){ 
					MessageHelper.displayeErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']); 
					return;
				} else if(qty!=null && qty!='' && catEntryId!=null){
					this.updateParamObject(params,"catEntryId",catEntryId,false,-1);
					this.updateParamObject(params,"quantity",qty,false,-1);
					this.baseItemAddedToCart=true;
				} else{
					MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU_REQ_LIST']);
					return;
				}
			}
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			}   		
			cursor_wait();		
			wc.service.invoke("requisitionListAddItem_popup", params);
		} else {
			form.action = "RequisitionListItemUpdate?requisitionListId="+requisitionListId;
			
			if(this.ajaxMyAccount){
				form.URL.value = "AjaxLogonForm?page=editrequisitionlist&requisitionListId=" + requisitionListId + "&editable=true";
			} else {
				form.URL.value = "RequisitionListDetailView?requisitionListId=" + requisitionListId + "&editable=true";
			}			
			
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			}   		
			cursor_wait();
			form.submit();
		}	
	},	

	/**
	* Adds the resolved SKU of an item to an existing requisition list.
	* Assumes that the catalogEntryId is a resolved SKU.
	*
	* @param {string} catalogEntryId The resolved catalog entry ID of the item to add to the requisition list.
	* @param {string} quantityElemId The ID of the Quantity field.
	* @param {boolean} ajaxAddToCart Indicates whether the AJAX Add to Cart flexflow is enabled.
	*/
	addItemToExistingRequisitionList:function (catalogEntryId,quantityElemId,ajaxAddToCart) {
		if(catalogEntryId!=null){
			//Validate the quantity value
			var quantity = document.getElementById(quantityElemId).value;
			if (!RequisitionList.isNumber(quantity) || quantity <= 0) {
				if(quantityElemId == "productPopUpQty"){
					MessageHelper.displayErrorMessage(MessageHelper.messages['QUANTITY_INPUT_ERROR']);
					//Close the quick info pop-up if it exists
					if(dijit.byId('second_level_category_popup') != null){
						hidePopup('second_level_category_popup');
					}
					return;
				} else {
					MessageHelper.formErrorHandleClient(quantityElemId,MessageHelper.messages["QUANTITY_INPUT_ERROR"]); 
					return;
				}
			}		
	
			//Get all the requisition list radio button inputs
			var reqListSelection = document.getElementsByName("RequisitionListTableDisplay_RequisitionListSelection");
			
			//Retrieve the requisition list id from the radio button selection
			for (var i=0; i<reqListSelection.length; i++) {
				if (reqListSelection.item(i).checked) {
					var requisitionListId = reqListSelection.item(i).value;
				} 
			}
						
			//For Ajax "Add to Cart" flexflow, add item and remain on the same page
			if(ajaxAddToCart){
				var params = {};
				
				params["requisitionListId"] = requisitionListId;
				params["catEntryId"] = catalogEntryId;
				params["quantity"] = quantity;
				params.storeId = this.storeId;
				params.catalogId = this.catalogId;
				params.langId = this.langId;
				
				/*For Handling multiple clicks. */
				if(!submitRequest()){
					return;
				}			
				cursor_wait();
				wc.service.invoke('requisitionListAddItem_popup',params);				
			} else { 
				//For Non-Ajax add to cart
				var form = document.forms["RequisitionListPopupForm"];
				form.requisitionListId.value = requisitionListId;
				form.quantity.value = quantity;
				form.catEntryId.value = catalogEntryId;
				
				if(this.ajaxMyAccount){
					form.URL.value = "AjaxLogonForm?page=editrequisitionlist&requisitionListId=" + requisitionListId + "&editable=true";
				} else {
					form.URL.value = "RequisitionListDetailView?requisitionListId=" + requisitionListId + "&editable=true";
				}
				
				/*For Handling multiple clicks. */
				if(!submitRequest()){
					return;
				}			
				cursor_wait();
				form.submit();
			}
		} else{
			MessageHelper.displayErrorMessage(MessageHelper.messages['ERR_RESOLVING_SKU_REQ_LIST']);
		}		
	},
	
	/**
	* Adds all the items in the wishlit to the cart.
	*
	* @param {string} customParams .
	*/
	AddAllWishListItem2ShopCartAjax : function(customParams)
    {
    var wishListItemJson = "";
   
            if (dojo.byId("wishListAddToCartEligibleItems")!=null) {
              //the json object for entitled items are already in the HTML.
              wishListItemJson = eval('('+dojo.byId("wishListAddToCartEligibleItems").innerHTML +')');
            }else{
                    //Don't do any thing
            }
            //alert("Wish List Item JSON --> "+wishListItemJson);
            var catEntryIdentifier = new Array();
            var quantity = new Array();
            var giftListItem = new Array();
            var counter = 0;
            for(x in wishListItemJson){
            	if(wishListItemJson[x]!="" && wishListItemJson[x]!=null){
            		if(dojo.byId('wishlist_priceexists_'+wishListItemJson[x].catentry_id) != null){
                			
                            var catentry_id = wishListItemJson[x].catentry_id;
                            catEntryIdentifier[counter] = catentry_id;
                            quantity[counter] = wishListItemJson[x].quantity;
                            counter = counter + 1;
                    	}
                         
            	}
            	   //giftListItem[x] = wishListItemJson[x].giftListId;
                        //alert("Wish List Catentry Id "+catentry_id)
                        //var Attributes = this.entitledItems[x].Attributes;
            	
            } 
            
            if((catEntryIdentifier!="" && quantity!="") && (catEntryIdentifier!=null && quantity!=null))
            	this.AddItem2ShopCartAjax(catEntryIdentifier, quantity, customParams);
              
    },
    
	/**
	* Sets the currentPageType variable. 
	* This variable determines the type of catalog pages that are being viewed, such as product or item pages.
	*
	* @param {Boolean} pageType Indicates the type of catalog page viewed by the customer.
	*
	**/
	setCurrentPageType:function(pageType){
		this.currentPageType = pageType;
	},	
	
	/**
	* Sets the currentCatalogEntryId variable. 
	* This variable stores the catalogEntryId of the catalog item being viewed.
	*
	* @param {Boolean} catalogEntryId The ID of the new catalog item viewed by the customer.
	*
	**/
	setCurrentCatalogEntryId:function(catalogEntryId){
		this.currentCatalogEntryId = catalogEntryId;
	},
	
	/**
	 * Submits a category subscription request.
	 * If AjaxAddToCart is enabled, then invoke the AjaxCategorySubscribe service; otherwise submit the form and reload the page.
	 * 
	 * @param {String} formId The form Id.
	 * @param {Boolean} ajaxEnabled A true/false value that indicates if AjaxAddToCart is enabled.
	 */
	handleCategorySubscription:function(formId, ajaxEnabled){
		if(ajaxEnabled == true || ajaxEnabled == "true"){
			var form = document.forms[formId];
			var params = {};
			params["DM_ReqCmd"] = form.DM_ReqCmd.value;
			params["storeId"] = form.storeId.value;
			params["catalogId"] = form.catalogId.value;
			params["langId"] = form.langId.value;
			params["categoryId"] = form.categoryId.value;
			if(!submitRequest()){
				return;
			}
			cursor_wait();
			wc.service.invoke("AjaxCategorySubscribe", params);
		}else{
			var form = document.forms[formId];
			form.URL.value = location.href;
			form.submit();
		}
	},
	
	clearFilters:function (clearAllUrl){
		// Current URL
	    var url = clearAllUrl;
	    if(url == null || url == undefined){
	    	url = document.getElementsByName("filterRefreshBaseURL")[0].value;
	    }
	    //location.href = url;
    	document.getElementsByName("lastRefreshURL")[0].value = url;
    	
    	// This is to undo infinite scroll if required
    	HBCCatalogSearchDisplayJS.goToFirstPage('','');
    	
    	HBCCatalogSearchDisplayJS.goToResultPage(url,'catalogSearchResultDisplay_Controller', 'catalogSearchResultDisplay_Context');
    	MessageHelper.displayStatusMessage(MessageHelper.messages['PAGE_REFRESH_WAIT']);
	},
	clearAllUrl:"",
	facetUrl:"",
	
    filterWithSelectedFilters:function (){

		// Base URL
		var baseUrl = document.getElementsByName("filterRefreshBaseURL")[0].value;
		// Current URL
		var lastRefreshUrl = document.getElementsByName("lastRefreshURL")[0].value;
		// Refresh URL
		var url = baseUrl;
	    
	    // Retrieve selected filters
	    var facetValue = '';
	    facetValue = this.updateFacetValue(facetValue, "mfName_ntk_cs", "filter_mfName_ntk_cs");
	    facetValue = this.updateFacetValue(facetValue, "price_USD", "filter_price_USD");
	    facetValue = this.updateFacetValue(facetValue, "price_CAD", "filter_price_CAD");
	    
	    for(var i=1; i<=30; i++){
	    	facetValue = this.updateFacetValue(facetValue, "ads_f"+i+"_ntk_cs", "filter_ads_f"+i+"_ntk_cs");
	    }
	    for(var i=1; i<=40; i++){
	    	facetValue = this.updateFacetValue(facetValue, "xf_ads_f"+i+"_ntk_cs", "filter_xf_ads_f"+i+"_ntk_cs");
	    }
	    //facetValue = this.updateFacetValue(facetValue, "ads_f8_ntk_cs", "colorFilter");
	    //facetValue = this.updateFacetValue(facetValue, "ads_f7_ntk_cs", "sizeFilter");

	    // If a filter is selected
	    if (facetValue != ''){
			var preFacet = url.match(/&facet=[^&]+/g);
			if(preFacet != null && preFacet[0] != null){
				preFacet = preFacet[0].split('=');
				if(preFacet != null){
					preFacet = preFacet[1];
				} else {
					preFacet = '';
				}
			}

			url = url.replace(/&facet=[^&]*/g,'');
	    	url += '&filterSelected=true&facet='+facetValue;
			if(preFacet != null && preFacet != ''){
				url += '|' + preFacet;
			}
	    	while(url.indexOf(' +OR+ ') != -1){
		    	url = url.replace(' +OR+ ', '+OR+');
	    	}
	    }

	    if(url != lastRefreshUrl){
	    	console.debug("lastRefreshUrl: "+lastRefreshUrl);
	    	console.debug("new url: "+url);
	    	document.getElementsByName("lastRefreshURL")[0].value = url;
	    	
	    	// This is to undo infinite scroll if required
	    	HBCCatalogSearchDisplayJS.goToFirstPage('','');
	    	
	    	HBCCatalogSearchDisplayJS.goToResultPage(url,'catalogSearchResultDisplay_Controller', 'catalogSearchResultDisplay_Context');
	    	MessageHelper.displayStatusMessage(MessageHelper.messages['PAGE_REFRESH_WAIT']);
    	}
	},
	
	updateFacetValue: function(facetValue, filterType, elementName){
	    // Get facet parameters
	    //var newfacetValue = facetValue;
		var params = '';
	    var n = document.getElementsByName(elementName);
	    var l = 0;
	    if(n != undefined && n != null){
	    	l = n.length;
	    }
	
	    // Foreach filter checkbox
		if(filterType != 'price_USD' && filterType != 'price_CAD'){
		    for(var i=0; i<l; i++) {
		    	if (n[i].name == elementName && n[i].checked && n[i].value != 'ViewAll'){
	    		  if(params != ''){
	    			  var facettmpName = n[i].value;	
	    			  var idx = facettmpName.indexOf("+");
	    				 if(idx != -1){
	    					 //Fix for defect 382 Begin- Filter not working properly (cases with + facet)
	    					 var param1 = facettmpName.substr(0,idx);//correcting the logic to get the correct params.previously facettmpName.substr(0,idx-1);
	    					 var param2 = facettmpName.substr(idx+1);
	    					 params += 'OR"' +param1+"%252B"+param2+'"'; //Adding proper Encoding for '+' Previously %2B%252B%2B
	    					 
	    					//Fix for defect 382 End- Filter not working properly (cases with + facet)
	 	    			 }else{
	 	    				params += 'OR"' + encodeURIComponent(n[i].value) + '"';
	 	    			 }
	    		  }
	    		  else{
	    			  	var facettmpName = n[i].value;
	    			  	var idx = facettmpName.indexOf("+");
	    				 if( idx != -1){
	    					//Fix for defect 382 Begin- Filter not working properly (cases with + facet)
	    					 var param1 = facettmpName.substr(0,idx);//correcting the logic to get the correct params.previously facettmpName.substr(0,idx-1);
	    					 var param2 = facettmpName.substr(idx+1);
	    					 params += '"' +param1+"%252B"+param2+'"';//Adding proper Encoding for '+' Previously %2B%252B%2B
	    					
	    					//Fix for defect 382 End- Filter not working properly (cases with + facet)
	 	    			 }else{
	 	    				params += '"' + encodeURIComponent(n[i].value) + '"';
	 	    			 }
	    		  	}
		    	 }
		    }
		}else {
		    for(var i=0; i<l; i++) {
		    	if (n[i].name == elementName && n[i].checked && n[i].value != 'ViewAll'){
	    		  if(params != ''){
	    			  params += '+OR+' + n[i].value;
	    		  }
	    		  else{
	    			  params += n[i].value;
	    		  }
		    	}
		    }
		}

	    if(params != ''){
	    	if(facetValue != ''){
	    		facetValue += '|' + filterType + ':(' + params + ')';
	    	}else{
	    		facetValue += filterType + ':(' + params + ')';
	    	}
	    }
	    return facetValue;
	},
	
	removeFacetSelection: function(elementName, removeValue){

	    var n = document.getElementsByName(elementName);
	    var l = 0;
	    if(n != undefined && n != null){
	    	l = n.length;
	    }

	    for(var i=0; i<l; i++) {
	    	if (n[i].name == elementName && n[i].checked && n[i].value == removeValue){
	    		n[i].checked = false;
	    		//exit;
	    	}
	    }
	    
	    this.filterWithSelectedFilters();
	},
	
	createCookie: function(fname,fvalue,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = fname+"="+fvalue+expires;
	},
	/* Fixed as part of defect # 3875 - BEGINS HERE */
	linkColorUpdate : function(xyz,name1){
		 var url = xyz ;
		 //removing the parameter as it does not seem to be needed anymore and it is not a SEO URL - EY 09/30/2013
		 //url += "&linkCategoryName="+escape(name1);
		 location.href=url;
	  }, 
	/* Fixed as part of defect # 3876 - Ends HERE */ 
	readCookie: function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	giftPriceVGC: function(giftProductId){
		var giftJSON;
		if (document.getElementById("VGC")!=null) {
			//the json object for entitled items are already in the HTML. 
			giftJSON = eval('('+ document.getElementById("VGC").innerHTML +')');
		}
		var productObject = giftJSON.giftVGCJson;
		var amountVGC = document.getElementById("amount_select2");
		
		if(amountVGC != null && amountVGC != undefined){
			while(amountVGC.hasChildNodes()) {
				amountVGC.removeChild(amountVGC.firstChild);
			}
		
		amountVGC.length=0;
		var aOption = document.createElement("option");
		amountVGC.options[amountVGC.length] = aOption;
		aOption.text = MessageHelper.messages["DefaultValue"];
		aOption.value = "";
	
		for (var i = 0; i < productObject.length; i++)
		{
			var itemObject = productObject[i];
			// Added null check for defect 1672, since productObject.length mismatch between mozilla and IE8. IE8 is showing improper length
			if(itemObject != null && itemObject != undefined){
				if(itemObject.productIdVGC == giftProductId){
					if (itemObject.itemsVGC.length > 0)
					{
						for (var j = 0; j < itemObject.itemsVGC.length; j++)
						{
							var listPrice = itemObject.itemsVGC[j].listPrice;
							var offerPrice = itemObject.itemsVGC[j].offerPrice;
							var validPrice = "";
		
							if (offerPrice != null && offerPrice != 0.00) {
								validPrice = itemObject.itemsVGC[j].offerPriceFmt;
							}
							else {
								validPrice = itemObject.itemsVGC[j].listPriceFmt;
							}
							
							aOption = document.createElement("option");
							amountVGC.options[amountVGC.length] = aOption;
							
							aOption.text = validPrice;
							aOption.value = itemObject.itemsVGC[j].catentry_id;
						}
					}
				}
			}
		}
	}
},
	giftPrice: function(giftProductId){
		var giftJSON;
		if (document.getElementById("TGC")!=null) {
			//the json object for entitled items are already in the HTML. 
			giftJSON = eval('('+ document.getElementById("TGC").innerHTML +')');
		}
		var productObject = giftJSON.giftTGCJson;
		var amountTGC = document.getElementById("amount_select");
		
		if(amountTGC != null && amountTGC != undefined){
			while(amountTGC.hasChildNodes()) {
				amountTGC.removeChild(amountTGC.firstChild);
			}
			amountTGC.length=0;
			var aOption = document.createElement("option");
			amountTGC.options[amountTGC.length] = aOption;
			aOption.text = MessageHelper.messages["DefaultValue"];
			aOption.value = "";
			for (var i = 0; i < productObject.length; i++)
			{
				var itemObject = productObject[i];
				// Added null check for defect 1672, since productObject.length mismatch between mozilla and IE8. IE8 is showing improper length
				if(itemObject != null && itemObject != undefined){
					if(itemObject.productIdTGC == giftProductId){
						if (itemObject.itemsTGC.length > 0)
						{
							for (var j = 0; j < itemObject.itemsTGC.length; j++)
							{
								var listPrice = itemObject.itemsTGC[j].listPrice;
								var offerPrice = itemObject.itemsTGC[j].offerPrice;
								var validPrice = "";
								if (offerPrice != null && offerPrice != 0.00) {
									validPrice = itemObject.itemsTGC[j].offerPriceFmt;
								}
								else {
									validPrice = itemObject.itemsTGC[j].listPriceFmt;
								}
								aOption = document.createElement("option");
								amountTGC.options[amountTGC.length] = aOption;
								aOption.text = validPrice;
								aOption.value = itemObject.itemsTGC[j].catentry_id;
							}
						}
					}
				}
			}
		}
	},
	/**
	* sortOptions - Sorts Gift Cards by Price in Ascending Order
	*
	* @param {String} id - Id of the Amount Select Dropdown.
	*
	**/
	sortOptions: function(id) {
	    var prePrepend = "#";
	    if (id.match("^#") == "#") prePrepend = "";
	    $(prePrepend + id).html($(prePrepend + id + " option").sort(
	        function (a, b) { 
	        	if(langId == '-25'){
	        		var a1 =  a.text.replace(/(-?\d+.?\d+)?\s?[$]/, '\$1').replace(/\,/,".");
	    		    var b1 =  b.text.replace(/(-?\d+.?\d+)?\s?[$]/, '\$1').replace(/\,/,".");
	    		}
	        	else{
	        		var a1 =  a.text.replace(/[$]?(-?\d+.?\d+)/, '\$1');
	    	        var b1 =  b.text.replace(/[$]?(-?\d+.?\d+)/, '\$1');
	        	}
	        	return a1 - b1
	    })	
	    );
	    document.getElementById(id).options[0].selected = true;
	}

}

categoryDisplayJS.HistoryTracker.prototype.back = categoryDisplayJS.goBack;
categoryDisplayJS.HistoryTracker.prototype.forward=categoryDisplayJS.goForward;
		
		
	
