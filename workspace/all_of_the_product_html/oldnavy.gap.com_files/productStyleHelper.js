/**
 * This Service Class is concerned with displaying store locations information based on
 * inputs of postal code and product or sku ID's at different locations around the site.
 * @author Andrew Southwick, Nichole Shannon
 */
var ProductStyleService = Class.create();
var log = loggingService.api.getLog();

ProductStyleService.prototype = {
	initialize: function() {
	},
	constants: {
		SWATCHES_SIZE_NAME_BASE: "fistSizeMessage",
		SWATCHES_COLOR_NAME_BASE: "colorSwatchName",
		PRODUCT_IMAGE_ID: 'fistProductImage_0',
		requestParameters:{
			CID_PARAMETER: "cid",
			SCID_PARAMETER: "scid",
			PID_PARAMETER: "pid",
			VID_PARAMETER: "vid",
			SKU_ID_PARAMETER: "skuid",
			STORE_ID_PARAMETER: "storeid",
			LOCALE_PARAMETER: "locale"
		},
        DEFAULT_VARIANT_NAME : 'Regular'
	},
	constructors: {
		//TODO: determine if this is necessary
		AbstractProductStyleManager:function() {
			this.initialize = function() {};
			this.constants = {};
			this.model = {
				isActive:false,
				id:null,
				name:null,
				description:null
			};
			this.controller = {
				init:{
					main : function() {}
				},
				handlers : {
				}
			};
			this.view = {
				// The abstract renderer returns an empty string
				renderProductStyle : function(productStyleContract) {
					return "";
				}
			};
		}
	},
	model: {
		productId: null,
		productStyleName: null,
		vendorId: null,
		previousSkuId: -1,
		selectedStyleColorId: null,  // deprecated
		colorSwatchSelected: null,  // deprecated
		variantId: null,
		variantCatalogItemId: null,
		variantSkus: null,
		viewContainer: null,
		variants: null,
		selectedDimension1Index: -1, // deprecated
		selectedDimension2Index: -1, // deprecated
		oAoMarketingFlags: null
	},
	view: null, // Will be injected in contructor
	controller: {
		init: {
			main: function(productId, views) {
				productStyleService.views = views;
				
		        Event.observe(document, "productStyleService:sizeChange", productStyleService.controller.eventHandlers.sizeChange);
		        Event.observe(document, "productStyleService:colorChange", productStyleService.controller.eventHandlers.colorChange);
						        
		        productStyleService.views.invoke('init');
			}
		},
		validators:{
		},
		eventHandlers: {
			ajaxSuccessCallback: function(response) {
				productStyleService.model.productStyleName = response.responseJSON['productStyleV1'].name;
				
				var variantsFromJson = productStyleService.controller.arrayified(response.responseJSON['productStyleV1'].productStyleVariantList);
				productStyleService.model.variants = productStyleService.controller.mapVariantListJson(variantsFromJson);
							
				productStyleService.controller.setVariantSkus(variantsFromJson);
				
	            productStyleService.controller.getCurrentSizeDimensionInfo(1).selectedIndex = productStyleService.model.selectedDimension1Index;
	            productStyleService.controller.getCurrentSizeDimensionInfo(2).selectedIndex = productStyleService.model.selectedDimension2Index;
	            
	            productStyleService.api.renderFullProductDisplay({viewContainer: $("findInStoreOverlay-content")});
			},
			
			ajaxFailureCallback: function(response) {
				productStyleService.model.viewContainer.update("<div>Something is wrong.</div>");
			},
			
			sizeChange: function(event) {
				var params = event.memo;
				productStyleService.controller.getCurrentSizeDimensionInfo(params.dimensionInfo.dimension).selectedIndex = params.index;
				if(productStyleService.controller.hasCompleteSelection() && productStyleService.controller.hasNewSku()){
					productStyleService.controller.callbacks.skuSelected();
				}
			},
			
			colorChange: function(event) {
				productStyleService.model.selectedStyleColorId = event.memo.index;
				productStyleService.model.colorSwatchSelected = event.memo.colorName;
				
				if(productStyleService.controller.hasCompleteSelection() && productStyleService.controller.hasNewSku()){
					productStyleService.controller.callbacks.skuSelected();
				}
			}
		},
		isSelectionComplete: function(selection){
			if (selection.size1Index == null || selection.size1Index < 0 || selection.colorId == null  
					|| (productPage.arrayAllSizeDimension2
            		&& productPage.arrayAllSizeDimension2.length > 0 
            		&& (selection.size2Index == null || selection.size2Index == -1 ))) {
                return false;
            }
			return true;			
		},
		
		isOnlyAvailableOnlineFromMarketingFlag: function() {
			if (productStyleService.model.oAoMarketingFlags) {
				var splittedFlags = productStyleService.model.oAoMarketingFlags.toLowerCase().split(",");

				/*
				 * var flags = ['gap.com exclusive style', 'Online Exclusive',
				 * 'gap.com exclusive', 'only at gap.com', 'Only at
				 * Oldnavy.com'];
				 */

				if (productPage.objP.objMarketingFlag && productPage.objP.objMarketingFlag.strMarketingFlagName) {
					if (splittedFlags.indexOf(productPage.objP.objMarketingFlag.strMarketingFlagName.toLowerCase()) > -1) {
						return true;
					}
				}
			}
			
			return false;
		},
		
		isOnlyAvailableOnline: function(selection){
			return productStyleService.controller.isOnlyAvailableOnlineFromData(selection) 
				|| productStyleService.controller.isOnlyAvailableOnlineFromVariants()
				|| productStyleService.controller.isOnlyAvailableOnlineFromMarketingFlag();
		},
		isOnlyAvailableOnlineFromVariants: function(){
			var oaoVariants = {
					1: ['2','3','8','5','6'],
					2: ['2'],
					3: ['2','3','5','6','8','12'],
					10: ['8']
				};
				
				return oaoVariants[brandConst.BRAND_CODE].indexOf(productPage.objV.strVariantId + '') != -1;
		},
		isOnlyAvailableOnlineFromData: function(selection){
			//this solution is in place temporarily while OAO is coming through productData.do
			//for ProductStyleService implementation, see revision 510442
			
			
			if (productStyleService.controller.isSelectionComplete(selection)) {
				var key = selection.colorId + "_" + productPage.arrayAllSizeDimension1[selection.size1Index].strId;
				if (selection.size2Index != undefined && selection.size2Index != -1){
					key += "_" + productPage.arrayAllSizeDimension2[selection.size2Index].strId;
				} else {
					key += "_";
				}
				var sku = productPage.objV.arrayVariantSkus[key];
				if(sku == undefined){
					return false;
				}
				return sku.onlyAvailableOnline === 'true';
			}
			
			var colorIdToIndex = function(colorId) {
				for(var i = 0; i < productPage.objV.arrayVariantStyleColors.length; i++){
					if(productPage.objV.arrayVariantStyleColors[i].strColorCodeId === colorId){
						return i;
					}
				}
			};

			return productPage.objV.arrayVariantStyleColors[colorIdToIndex(selection.colorId)].onlyAvailableOnline === 'true';
		},
		createRestUrl: function(productId){
			var rootUrl = "/resources/productStyle/v1/";
			return rootUrl + productId + "?locale=" + brandConst.BRAND_LOCALE + "&clientid=GID";
		},
		makeAjaxRequest: function(url, params){
			new Ajax.Request(url, params);
		}, 
		queryRestService: function(){
			var url = productStyleService.controller.createRestUrl(productStyleService.model.productId);
			productStyleService.controller.makeAjaxRequest(url, {
				method: "get",
				onSuccess: productStyleService.controller.eventHandlers.ajaxSuccessCallback,
				onFailure: productStyleService.controller.eventHandlers.ajaxFailureCallback
			});
		},
		mapVariantListJson: function (variantList){
			var wrappedVariantList = productStyleService.controller.arrayified(variantList);
			var variants = new Hash();
			wrappedVariantList.each(function(variant) {
				variants.set(variant.variantId, {variantId: variant.variantId});
				variants.get(variant.variantId).onlyAvailableOnline = variant.onlyAvailableOnline;
				variants.get(variant.variantId).productStyleColors = productStyleService.controller.buildColorsMap(variant.productStyleColors);
				variants.get(variant.variantId).sizeInfo = [{
					dimension: 1,
					selectedIndex : productStyleService.model.selectedDimension1Index,
					sizeDimensionLabelName : variant.productStyleVariantSizeInfo.sizeDimension1.sizeDimensionLabelName,
					sizeOptions : productStyleService.controller.arrayified(variant.productStyleVariantSizeInfo.sizeDimension1SizeOptions)
				},
				{
					dimension: 2,
					selectedIndex : productStyleService.model.selectedDimension2Index,
					sizeDimensionLabelName : (variant.productStyleVariantSizeInfo.sizeDimension2)? variant.productStyleVariantSizeInfo.sizeDimension2.sizeDimensionLabelName : null,
					sizeOptions : (variant.productStyleVariantSizeInfo.sizeDimension2SizeOptions)? productStyleService.controller.arrayified(variant.productStyleVariantSizeInfo.sizeDimension2SizeOptions): null
				}];
			});
			return variants;
		},
		
		buildColorsMap: function(productStyleColors){
			var colorsMap = new Hash();
			var wrappedProductStyleColors = productStyleService.controller.arrayified(productStyleColors);
			$A(wrappedProductStyleColors).each(function(productStyleColor){
				colorsMap.set(productStyleColor.businessCatalogItemId, productStyleColor);
			});
			return colorsMap;
		},
		getCurrentVariant: function(){
			return productStyleService.model.variants.get(productStyleService.model.variantId);
		},
		getCurrentSizeDimensionInfo: function(dimension){
			return productStyleService.controller.getCurrentVariant().sizeInfo[dimension - 1];
		},
		getCurrentStyleColors: function(){
			return productStyleService.model.variants.get(productStyleService.model.variantId).productStyleColors;
		},
		hasCompleteSelection: function(){
			var model = productStyleService.model;
			var index1 = productStyleService.controller.getCurrentSizeDimensionInfo(1).selectedIndex;
			var index2 = productStyleService.controller.getCurrentSizeDimensionInfo(2).selectedIndex;
			
			if (index1 == null || index1 < 0 || model.selectedStyleColorId == null  
					|| (productStyleService.controller.getCurrentSizeDimensionInfo(2).sizeOptions 
            		&& productStyleService.controller.getCurrentSizeDimensionInfo(2).sizeOptions.length > 0 
            		&& (index2 == null || index2 == -1 ))) {
                return false;
            }
			return true;
		},		
		hasNewSku: function(){
			var skuInfo = productStyleService.controller.getSkuInfo();
			if (skuInfo.skuId !== productStyleService.model.previousSkuId){
				productStyleService.model.previousSkuId = skuInfo.skuId;
				return true;
			}
			return false;
		},	
        getSkuInfo: function() {
        	var model = productStyleService.model;
			var index1 = productStyleService.controller.getCurrentSizeDimensionInfo(1).selectedIndex;
			var index2 = productStyleService.controller.getCurrentSizeDimensionInfo(2).selectedIndex;
        	
            var colorId = productStyleService.controller.getCurrentStyleColors().get(model.selectedStyleColorId).businessCatalogItemId;
            var size1Id = (index1 != null &&  index1 > -1) ? productStyleService.controller.getCurrentSizeDimensionInfo(1).sizeOptions[index1].sizeOptionId : "";
            var size2Id = (index2 != null &&  index2 > -1) ? productStyleService.controller.getCurrentSizeDimensionInfo(2).sizeOptions[index2].sizeOptionId : "0";
           
            var sku = model.variantSkus[model.variantId + "_" + colorId + "_" + size1Id + "_" + size2Id];
            var info = {isComplete: productStyleService.controller.hasCompleteSelection(),
            			inList: sku != undefined,
            			skuId: (sku && sku.skuId)? sku.skuId: null,
            			reservable: (sku && sku.reservable)? sku.reservable: 'true'};
            return info;
		},
		setSelectedStyleColor : function() {},

		setSelectedStyleSize : function() {},
		getProductFullDisplay: function(){
 
			productStyleService.views.invoke('render',productStyleService.model.viewContainer, {
				selectedStyleColorId: productStyleService.model.selectedStyleColorId,
				productStyleName: productStyleService.model.productStyleName,
				colorSwatchSelected: productStyleService.model.colorSwatchSelected,
				productId: productStyleService.model.productId,
				vendorId: productStyleService.model.vendorId,
				styleColors: productStyleService.controller.getCurrentStyleColors(),
				sizeDimensionInfo1: productStyleService.controller.getCurrentSizeDimensionInfo(1),
				sizeDimensionInfo2: productStyleService.controller.getCurrentSizeDimensionInfo(2)
			});
            
			if(productStyleService.controller.hasCompleteSelection() && productStyleService.controller.hasNewSku()){
				productStyleService.controller.callbacks.skuSelected();
			}
			
			productStyleService.controller.callbacks.afterUpdate();			
		},
		callbacks: {
			skuSelected: function(){},
			afterUpdate: function(){}
		},
		setVariantSkus: function(variants){
			var variantSkus = {};
			
			$A(variants).each(function(variant){
				var colors = productStyleService.controller.arrayified(variant.productStyleColors);
				$A(colors).each(function(color){
					var mySkus = productStyleService.controller.arrayified(color.productStyleColorSkus);
					$A(mySkus).each(function(sku) {
						variantSkus[variant.variantId + "_" + color.businessCatalogItemId + '_' + sku.sizeDimension1Id + '_' + sku.sizeDimension2Id] = sku;
					});
				});
			});
			productStyleService.model.variantSkus = variantSkus;
		},
		
		arrayified: function(obj){
			if(obj && !Object.isArray(obj)){
				 return new Array(obj);
			} 
			return obj;
		}
	},
	
	api:{
        getSelectedSkuInfo: function() {
        	return productStyleService.controller.getSkuInfo();
        },
        populateModelFromProductPage: function(modelParams) {
            Object.extend(productStyleService.model, modelParams);
        },
		renderFullProductDisplay: function(opts) {
			Object.extend(productStyleService.model, opts);
			return productStyleService.controller.getProductFullDisplay();
		},
		onClose: function(){
			productStyleService.model.previousSkuId = -1;
		}
	}
};
