if(gnc) {
}else{
	var gnc={};
}
gnc.Product = function(productJSONObject) {
	this.colorId = '';
	this.skuId = '';
	this.quantity = 0;
	this.cp = productJSONObject.cp;
	this.globalCategoryId = productJSONObject.globalCategoryId;
	this.skus = productJSONObject.skus;
	this.productId = productJSONObject.productId;
	this.colorSliceValues = productJSONObject.colorSliceValues;
	this.alternateViews = productJSONObject.alternateViews;
	this.mainImageURL = productJSONObject.mainImageURL;
	this.enhancedImageURL = productJSONObject.enhancedImageURL;
	this.familyImageURL = productJSONObject.familyImageURL;
	this.largeSwatchImageURL = productJSONObject.largeSwatchImageURL;
	this.pageURL = productJSONObject.pageURL;
	this.colorChangeListeners = new Array();
	this.viewChangeListeners = new Array();
	this.qtyChangeListeners = new Array();
	this.skuChangeListeners = new Array();
	this.viewIndex = 0;
	this.currentView = this;
	this.currentColorSlice = null;
	
	this.addColorChangeListener = function(listener) {
		this.colorChangeListeners[this.colorChangeListeners.length] = listener;
	};
	this.addViewChangeListener = function(listener) {
		this.viewChangeListeners[this.viewChangeListeners.length] = listener;
	};
	this.addQtyChangeListener = function(listener) {
		this.qtyChangeListeners[this.qtyChangeListeners.length] = listener;
	};
	this.addSkuChangeListener = function(listener) {
		this.skuChangeListeners[this.skuChangeListeners.length] = listener;
	};
	this.getAvailableSizes = function() {
		var sizes = new Array();
		if(this.colorId != '') {
			var skus = this.getCurrentColorSliceValue().availableSkuIds;
			for(var i=0; i < skus.length; i++) {
				sizes[i] = this.getSkuById(skus[i]).size;
			}
		}
		return sizes;
	}

	this.getCurrentColorSliceValue = function() {
		return this.currentColorSliceValue;
	}
	this.getSkuById = function(id) {
		for(var i=0; i< this.skus.length; i++) {
			if(this.skus[i].sku_id == id) {
				return this.skus[i];
			}
		}
		return null;
	}
	this
	this.getCurrentView = function() {
		return this.currentView;	
	}
	this.changeColor = function(colorId) {
		this.colorId = colorId;
		//this should be updated to select the correct sku id
		this.currentColorSliceValue = null;
		for(var i=0; i < this.colorSliceValues.length; i++) {
			if(this.colorSliceValues[i].colorId == this.colorId) {
				this.currentColorSliceValue = this.colorSliceValues[i];
				break;
			}
		}
		this.changeSku(this.getCurrentColorSliceValue().availableSkuIds[0]);

		this.changeView(0);
		for(var i=0; i < this.colorChangeListeners.length; i++) {
			this.colorChangeListeners[i].observeProductColorChange(this);
		}
	}
	this.setQuantity = function(qty) {
		this.quantity = qty;
		for(var i=0; i < this.qtyChangeListeners.length; i++) {
			this.qtyChangeListeners[i].observeProductQtyChange(this);
		}
	}
	
	this.changeSku = function(skuId) {
		this.skuId = skuId;
		for(var i=0; i < this.skuChangeListeners.length; i++) {
			this.skuChangeListeners[i].observeProductSkuChange(this);
		}
	}
	
	this.changeView = function(viewIndex) {
		this.viewIndex = viewIndex;
		if(viewIndex==0&&this.getCurrentColorSliceValue()==null) {
			this.currentView = this;
		} else {
			this.currentView = null;
			if(this.getCurrentColorSliceValue()!=null) {
				if(viewIndex==0) {
					this.currentView = this.getCurrentColorSliceValue();
				} else {
					if(this.getCurrentColorSliceValue().alternateViews.length>viewIndex-1) {
						this.currentView =  this.getCurrentColorSliceValue().alternateViews[viewIndex-1];
					} else if(this.getCurrentColorSliceValue().alternateViews.length>0) {
						this.currentView = this.getCurrentColorSliceValue().alternateViews[0];
					}
				}
			}
			
			if(this.currentView==null) {
				if(this.alternateViews.length>viewIndex-1) {
					this.currentView = this.alternateViews[viewIndex-1];
				} else if(this.alternateViews.length>0) {
					this.currentView = this.alternateViews[0];
				} else {
					this.currentView = this;
				}
			}
		}
		for(var i=0; i < this.viewChangeListeners.length; i++) {
			this.viewChangeListeners[i].observeProductViewChange(this);
		}
	}
	

}







