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

if(typeof(MerchandisingAssociationJS) == "undefined" || MerchandisingAssociationJS == null || !MerchandisingAssociationJS) {
	
	MerchandisingAssociationJS = {
		storeParams: {},
		baseItemParams: {},
		merchandisingAssociations: [],
		associationIndex: 0,
	
		/**
		* Method to set values
		*
		* @param {Object} storeParams params specific to a store
		* @param {Object} baseItemParams params specific to base Item
		* @param {Array} merchandisingAssociations items associated with the base item
		* 
		**/
		setValues: function (storeParams, baseItemParams, merchandisingAssociations) {
			this.storeParams = storeParams;
			this.baseItemParams = baseItemParams;
			this.baseItemParams.quantity = 1;
			this.merchandisingAssociations = merchandisingAssociations;
		},
	
		/**
		 * Setter for baseItemQuantity
		 * 
		 * @param Integer baseItemQuantity
		 */
		setBaseItemQuantity: function(baseItemQuantity){
			var baseItemQuantity = dojo.fromJson(baseItemQuantity);
			// If the quantity is an object with multiple quantities
			if(baseItemQuantity.length){
				for(idx=0;idx<baseItemQuantity.length;idx++){
					for(idx2=0;idx2<this.baseItemParams.components.length;idx2++){
						if(this.baseItemParams.components[idx2].skus){
							for(idx3=0;idx3<this.baseItemParams.components[idx2].skus.length;idx3++){
								if(this.baseItemParams.components[idx2].skus[idx3].id == baseItemQuantity[idx].id){
									this.baseItemParams.components[idx2].id = baseItemQuantity[idx].id;
									break;
								}
							}
						}
						if(this.baseItemParams.components[idx2].id == baseItemQuantity[idx].id){
							this.baseItemParams.components[idx2].quantity = baseItemQuantity[idx].quantity;
							break;
						}
					}
				}
			// If the quantity is a single value
			} else {
				this.baseItemParams.quantity = baseItemQuantity;
			}
		},
		
		/**
		 * Setter for baseItemAttributes
		 * 
		 * @param Integer baseItemQuantity
		 */
		setBaseItemAttributes: function(baseItemAttributes){
			this.baseItemParams.attributes = dojo.fromJson(baseItemAttributes);
		},
		
		/**
		* changeItem scrolls the associated catEntries up and down
		*
		* @param {int} direction +1, scrolls up and -1, scrolls down
		*
		**/
		changeItem: function(direction){
			if((this.associationIndex + direction) >= 0 && (this.associationIndex + direction) < this.merchandisingAssociations.length) {
				this.associationIndex = this.associationIndex + direction;
				// sets the associated item name
				dojo.byId("association_item_name").innerHTML = this.merchandisingAssociations[this.associationIndex].name;
				// sets the associated thumbnail image of the item
				dojo.byId("association_thumbnail").src = this.merchandisingAssociations[this.associationIndex].thumbnail;
				// sets the associated item name to alt text
				dojo.byId("association_thumbnail").alt = this.merchandisingAssociations[this.associationIndex].name;
				// sets the total offered price
				dojo.byId("combined_total").innerHTML = this.merchandisingAssociations[this.associationIndex].offeredCombinedPrice;
				// sets the total list price
				dojo.byId("list_total").innerHTML = this.merchandisingAssociations[this.associationIndex].listedCombinedPrice;
				// sets the product url href
				dojo.byId("association_url").href = this.merchandisingAssociations[this.associationIndex].url;
				// sets the product url title
				dojo.byId("association_url").title = this.merchandisingAssociations[this.associationIndex].shortDesc;
				// sets the href for quick info
				dojo.byId("merchandisingAssociation_QuickInfo").href = "javascript:QuickInfoJS.showDetails("+this.merchandisingAssociations[this.associationIndex].id+");";
				if(0 == this.associationIndex){
					// changing the up arrow to disabled style
					dojo.query("#up_arrow").removeClass("up_active");
					dojo.query("#down_arrow").addClass("down_active");
					dojo.byId("down_arrow").focus();
				}else if((this.merchandisingAssociations.length-1) == this.associationIndex){
					// changing the down arrow to disabled style
					dojo.query("#down_arrow").removeClass("down_active");
					dojo.query("#up_arrow").addClass("up_active");
					dojo.byId("up_arrow").focus();
				} else {
					// changing the arrows to enabled style
					dojo.query("#up_arrow").addClass("up_active");
					dojo.query("#down_arrow").addClass("down_active");
				}
			}
		},
		
		setCommonParams: function(){
			var params = new Object();
			params.storeId		= this.storeParams.storeId;
			params.catalogId	= this.storeParams.catalogId;
			params.langId		= this.storeParams.langId;
			params.orderId		= ".";
			params.calculationUsage = "-1,-2,-5,-6,-7";
			params.inventoryValidation = "true";
			return params;
		},
		
		validate: function(){
			if(this.baseItemParams.type =='BundleBean'){
				for(idx=0;idx<this.baseItemParams.components.length;idx++){
					if(!isPositiveInteger(this.baseItemParams.components[idx].quantity)){
						MessageHelper.displayErrorMessage(storeNLS['QUANTITY_INPUT_ERROR']);
						return;
					}
				}
			} else if(this.baseItemParams.type =='ProductBean' && 
					(null == this.baseItemParams.attributes || "undefined" == this.baseItemParams.attributes)) {
				MessageHelper.displayErrorMessage(storeNLS['ERR_RESOLVING_SKU']);
				return;
			} else if(!isPositiveInteger(this.baseItemParams.quantity)){
				MessageHelper.displayErrorMessage(storeNLS['QUANTITY_INPUT_ERROR']);
				return;
			} 
		},
		
		/**
		* addBoth2ShopCart Adds both base product and the associated product to the shopping cart
		*
		*
		**/
		addBoth2ShopCart: function(){
			this.validate();
			var params = this.setCommonParams();
			var associationQty = 1;
			//Add the parent product to the cart.
			if(this.baseItemParams.type == 'ItemBean'
				|| this.baseItemParams.type == 'PackageBean'
				||this.baseItemParams.type == 'DynamicKitBean'){
				updateParamObject(params,"catEntryId",this.baseItemParams.id,false,-1);
				updateParamObject(params,"quantity",this.baseItemParams.quantity,false,-1);
				if(this.baseItemParams.type == 'DynamicKitBean'){
					updateParamObject(params,"catalogEntryType","dynamicKit",-1);
				}
			} else if(this.baseItemParams.type=='BundleBean'){
				// Add items in the bundle
				for(idx=0;idx<this.baseItemParams.components.length;idx++){
					updateParamObject(params,"catEntryId",this.baseItemParams.components[idx].id,false,-1);
					updateParamObject(params,"quantity",this.baseItemParams.components[idx].quantity,false,-1);
				}
			} else {
				// Resolve ProductBean to an ItemBean based on the attributes in the main page
				var sku = this.resolveSKU();
				if(-1 == sku){
					MessageHelper.displayErrorMessage(storeNLS['ERR_RESOLVING_SKU']);
					return;
				} else {
					updateParamObject(params,"catEntryId",sku,false,-1);
					updateParamObject(params,"quantity",this.baseItemParams.quantity,false,-1);
				}
			}
			if (this.merchandisingAssociations[this.associationIndex].type=='ItemBean'
				|| this.merchandisingAssociations[this.associationIndex].type=='PackageBean'
				|| this.merchandisingAssociations[this.associationIndex].type=='DynamicKitBean'){
				updateParamObject(params,"catEntryId",this.merchandisingAssociations[this.associationIndex].id,false,-1);				
				var qtyspecified = this.merchandisingAssociations[this.associationIndex].quantity;
				if(null == qtyspecified || "undefined" == qtyspecified || '' == qtyspecified){
					qtyspecified = associationQty;
				}
				updateParamObject(params,"quantity",qtyspecified,false,-1);
				this.addItems2ShopCart(params);
			} else if(this.merchandisingAssociations[this.associationIndex].type=='BundleBean'){
				// Add items in the bundle
				for(idx=0;idx<this.merchandisingAssociations[this.associationIndex].components.length;idx++){
					updateParamObject(params,"catEntryId",this.merchandisingAssociations[this.associationIndex].components[idx].id,false,-1);
					updateParamObject(params,"quantity",associationQty,false,-1);
				}
				this.addItems2ShopCart(params);
			} else {
				// Resolve ProductBean to an ItemBean based on the attributes in the popup
				QuickInfoJS.showDetails(this.merchandisingAssociations[this.associationIndex].id,params);
			}
		},
		
		resolveSKU: function() {
			for(idx=0;idx<this.baseItemParams.skus.length;idx++){
				var matches = 0;
				var attributeCount = 0;
				for(attribute in this.baseItemParams.skus[idx].attributes){
					attributeCount++;
					if(this.baseItemParams.attributes && this.baseItemParams.skus[idx].attributes[attribute] == this.baseItemParams.attributes[attribute]){
						matches++;
					} else {
						break;
					}
				}
				if(matches == attributeCount){
					return this.baseItemParams.skus[idx].id;
				}
			}
			return -1;
		},
		
		/**
		* AddItem2ShopCartAjax This function is used to add a single or multiple items to the shopping cart using an ajax call.
		*
		* @param {Object} params, parameters that needs to be passed during service invocation.
		*
		**/
		addItems2ShopCart : function(params){
			var shopCartService = "AddOrderItem";
			if(params['catalogEntryType'] == 'dynamicKit' ){
				shopCartService = "AddPreConfigurationToCart";
			}
			//For Handling multiple clicks
			if(!submitRequest()){
				return;
			}   
			cursor_wait();		
			wc.service.invoke(shopCartService, params);
		},
		
		/**
		* This function is used to subscribe to dojo events that indicate quantity change and attribute changes.
		*
		* @param {Object} params, parameters that needs to be passed during service invocation.
		*
		**/
		subscribeToEvents : function(baseCatalogEntryId){
			dojo.subscribe("quantityChanged", MerchandisingAssociationJS, MerchandisingAssociationJS.setBaseItemQuantity);
			dojo.subscribe("attributesChanged_"+baseCatalogEntryId, MerchandisingAssociationJS, MerchandisingAssociationJS.setBaseItemAttributes);
		}
	}

}