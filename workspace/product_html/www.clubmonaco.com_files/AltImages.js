/**
 * Alternate Images functionality
 */
var AltImages = {

	init: function (colorCode) {
		var self = AltImages;

		// create data object the first time
		if (!self.data) self.data = self.getDataFromProductJSON();

		self.activeProdImg = null; // used on CYO page
		self.isCYOProduct = (ess.poloCustomProduct != undefined) ? true : false;
		self.isQuickShop = jQuery('body.quickshop-page').length ? true : false;

		self.wrapper = jQuery('#alternate-views');
		self.container = jQuery('#alternate-images');
		self.colorCode = colorCode || null;

		self.createSwatchArray();
		self.populateAltViews();
	},

	createSwatchArray: function () {
		var self = AltImages;

		self.swatchArray = [];

		// append color level alt views
		if (self.colorCode != null && self.data[self.colorCode] != undefined && self.data[self.colorCode].length) {
			jQuery.each(self.data[self.colorCode], function () {
				self.swatchArray.push(this);
			});
		}

		// append product level alt views
		var colorAltCount = self.swatchArray.length;
		if (colorAltCount <= 1) { // only display product alts if there 1 or less color alts
			jQuery.each(self.data.product, function (index, value) {
				if (index > (colorAltCount - 1)) { // start where color alts left off
					self.swatchArray.push(this);
				}
			});
		}

		// append main image thumbnail to array
		if (!self.isCYOProduct && self.swatchArray.length) {
			var colorData = {};
			if (self.colorCode != null) { // grab color swatch
				colorData = self.getDataFromColorCode(self.colorCode);
				colorData.name = 'color';
			} else { // grab product level swatch
				colorData.t100 = ess.productJSON.t100ImageURL;
				colorData.x50 = ess.productJSON.smallSwatchImageURL;
				colorData.zoom = ess.productJSON.zoomImageURL.substr(ess.productJSON.zoomImageURL.indexOf('sku=') + 4);
				colorData.name = 'product';
			}
			self.swatchArray.unshift(colorData);
		}
	},

	sortByName: function (a, b) {
		return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
	},

	populateAltViews: function () {
		var self = AltImages;

		self.container.attr('rel', self.colorCode); // set rel to active color code
		self.container.html('');

		if (self.swatchArray.length) {

			self.wrapper.show();

			jQuery.each(self.swatchArray, function () {
				//if (typeof this.t100 !== "undefined" && this.t100 !== "") { // Only show the alternative image if it exists
					self.container.append('<li class="swatch" rel="' + this.name + '"><div class="image-border"></div><a href="#"><img src="' + this.t100 + '" /></a></li>');
				//}
			});

			self.container.find('li.swatch')
				.click(function (e) {
					e.preventDefault();
					jQuery(this).siblings().removeClass('active');
					jQuery(this).addClass('active');

					var thisIndex = jQuery(this).index();
					var thisAlt = self.swatchArray[thisIndex];

					if (self.isQuickShop) {
						jQuery('#mainProductImage').attr('src', thisAlt.main);
					} else {
						// flyout zoom for non-CYO if enabled
						if (scene7Enabled && !self.isCYOProduct && thisAlt.zoom) {
							constructFlyout(thisAlt.zoom);
						} else { // no scene 7
							if (scene7Enabled) {
								resetStaticImage();
							}
							jQuery('#mainProductImage').attr('src', thisAlt.main);
						}
					}

					// fire engagement impression
					self.fireImpression('pr:alt-views');
					return false;
				});

			if (!self.isCYOProduct) {
				// set first alt as "active"
				self.container.find('li.swatch').eq(0).addClass('active');

			} else {
				// CYO rollover functionality
				self.container.find('li.swatch')
					.hover(
						function () {
							if (!jQuery(this).hasClass('active')) {
								self.activeProdImg = jQuery('#mainProductImage').attr('src');
								jQuery('#mainProductImage').attr('src', self.swatchArray[jQuery(this).index()].main);
							}
						},
						function () {
							if (!jQuery(this).hasClass('active')) {
								jQuery('#mainProductImage').attr('src', self.activeProdImg);
							}
						}
					);
			}
		}

	},

	getDataFromProductJSON: function () {
		var self = AltImages;
		var altData = {};

		altData.altText = ess.productJSON.alternateViewsAltText;

		// get slice level alternate images
		jQuery.each(ess.getColorSliceArray(), function () {
			if (this.alternateViews.length) {
				var thisColorId = this.colorId;
				altData[thisColorId] = [];

				jQuery.each(this.alternateViews, function () {
					var sliceAltData = {};
					jQuery.each(this.otherImages, function () {
						if (this.type == 'T50') sliceAltData.x50 = this.url;
						if (this.type == 'T240x400') sliceAltData.quick = this.url;
						if (this.type == 'T100') sliceAltData.t100 = this.url;
						if (this.type == 'VBIG') sliceAltData.vbig = this.url;
					});
					sliceAltData.main = this.enhancedImageURL;
					sliceAltData.zoom = this.zoomImageURL;
					sliceAltData.name = 'c-' + this.viewId;
					altData[thisColorId].push(sliceAltData)
				});

				if (altData[thisColorId].length) {
					altData[thisColorId].sort(self.sortByName); // sort by alt name
				} else {
					delete altData[thisColorId]; // delete empty color array
				}
			}
		});

		// get product level alt image data
		altData.product = [];
		jQuery.each(ess.productJSON.alternateViews, function () {
			if (this.T100 != undefined && this.enhancedImageURL != undefined) {
				var prodAltData = {};
				prodAltData.t100 = this.T100;
				prodAltData.x50 = this.T50;
				prodAltData.main = this.enhancedImageURL;
				prodAltData.vbig = this.vbigImageURL;
				prodAltData.quick = this.quickshopImageURL;
				prodAltData.zoom = this.zoom;
				prodAltData.name = 'p-' + this.name;
				altData.product.push(prodAltData);
			}
		});

		// sort by alt name
		altData.product.sort(self.sortByName);

		return altData;
	},

	getDataFromColorCode: function (colorCode) {
		var self = AltImages;
		var colorData = {};

		jQuery.each(ess.productJSON.colorSliceValues, function () {
			if (this.colorId == colorCode) {
				colorData.t100 = this.t100ImageURL;
				colorData.x50 = (this.v50ImageURL != '') ? this.v50ImageURL : this.minicartThumbnailImageURL; // V50 or T50 backup
				colorData.main = this.enhancedImageURL;
				colorData.vbig = this.vbigImageURL;
				colorData.quick = this.quickShopImageURL;
				colorData.zoom = this.zoomImageURL;
			}
		});

		return colorData;
	},

	fireImpression: function (eventName) {
		document.fire(eventName);
	}
};

jQuery(document).ready(function() {
	colorCode = ess.getColorSliceArray()[0].colorId;
	AltImages.init(colorCode);
});