SwatchDisplayJS = {

	activeWaist : null,
	activeLength : null,
	activeColor : null,
	activeSize : null,
	lastChanged : null,
	productId : null,
	sizeJSON : null,
	colorJSON : null,
	mode : null,
	setActiveWaist : function(id) {
		if (this.isSizeDisabled(id))
			return;
		if (this.activeWaist == id) {
			this.reset();
			return;
		}
		this.deactivateSize(this.activeWaist);
		this.activeWaist = id;
		this.activateSize(this.activeWaist);
		this.lastChanged = 'waist';
		this.refeshProductDisplay();
		MessageHelper.clearAllErrorMessages();
	},
	setActiveLength : function(id) {
		if (this.isSizeDisabled(id))
			return;
		if (this.activeLength == id) {
			this.reset();
			return;
		}
		this.deactivateSize(this.activeLength);
		this.activeLength = id;
		this.activateSize(this.activeLength);
		this.lastChanged = 'length';
		this.refeshProductDisplay();
		MessageHelper.clearAllErrorMessages();
	},
	setActiveColor : function(id) {
		if (this.isColorDisabled(id))
			return;
		if (this.activeColor == id) {
			return;
		}
		this.deactivateColor(this.activeColor);
		this.activeColor = id;
		this.activateColor(this.activeColor);
		var $swatch=$(join('#',id));
		if(typeof altImages!=THUtil.UNDEFINED) altImages.update($swatch.data('color-code'));
		this.lastChanged = 'color';
		this.refeshProductDisplay();
		MessageHelper.clearAllErrorMessages();
	},
	setActiveSize : function(id) {
		if (this.isSizeDisabled(id))
			return;
		if (this.activeSize == id) {
			this.reset();
			return;
		}
		this.deactivateSize(this.activeSize);
		this.activeSize = id;
		this.activateSize(this.activeSize);
		this.lastChanged = 'size';
		this.refeshProductDisplay();
		MessageHelper.clearAllErrorMessages();
	},
	activateSize : function(id) {
		if (this.notNull(id)) {
			dojo.query('#' + id).addClass('selected');
		}
	},
	deactivateSize : function(id) {
		if (this.notNull(id)) {
			dojo.query('#' + id).removeClass('selected');
		}
	},
	activateColor : function(id) {
		if (this.notNull(id)) {
			dojo.query('#' + id).addClass('active');
		}
	},
	deactivateColor : function(id) {
		if (this.notNull(id)) {
			dojo.query('#' + id).removeClass('active');
		}
	},
	disableSize : function(id) {
		if (this.notNull(id)) {
			var e = dojo.query('#' + id);
			e.addClass('disabled');
			e.removeClass('available');
		}
	},
	enableSize : function(id) {
		if (this.notNull(id)) {
			var e = dojo.query('#' + id);
			e.removeClass('disabled');
			e.addClass('available');
		}
	},
	disableColor : function(id) {
		if (this.notNull(id)) {
			var e = dojo.query('#' + id);
			e.addClass('disabled');
		}
	},
	enableColor : function(id) {
		if (this.notNull(id)) {
			var e = dojo.query('#' + id);
			e.removeClass('disabled');
		}
	},
	isSizeDisabled : function(id) {
		if (this.notNull(id))
			return dojo.hasClass(id, 'disabled');
		return false;
	},
	isColorDisabled : function(id) {
		if (this.notNull(id))
			return dojo.hasClass(id, 'disabled');
		return false;
	},
	buildSizeId : function(val, type) {
		/* Fix for sizes with a decimal 9460 */
		val = val.replace(".", "-");
		val = val.replace(/\s/g, "-");
		return 'size_' + type + '_' + val;
	},
	buildColorId : function(val) {
		if (this.mode == 'QuickView')
			return 'swatch_catentry_' + val;
		return 'catentry_' + val;
	},
	findJSONByColor : function(color) {
		for ( var i in this.colorJSON) {
			var item = this.colorJSON[i];
			if (item.color == color)
				return item;
		}
		return null;
	},
	disableSizes : function(sizes, type) {
		dojo.forEach(sizes, function(item) {
			var id = SwatchDisplayJS.buildSizeId(item, type);
			SwatchDisplayJS.disableSize(id);
		});
	},
	enableSizes : function(sizes, type) {
		if( Object.prototype.toString.call( sizes ) === '[object Array]' ) {
			dojo.forEach(sizes, function(item) {
				var id = SwatchDisplayJS.buildSizeId(item, type);
				SwatchDisplayJS.enableSize(id);
			});
		}
		else{
			for ( var size in sizes) {
				var id = this.buildSizeId(size, type);
				this.enableSize(id);
			}
		}
	},
	disableColors : function(colors) {
		dojo.forEach(colors, function(item) {
			var id = SwatchDisplayJS.buildColorId(item.catentryId);
			SwatchDisplayJS.disableColor(id);
		});
	},
	enableColors : function(colors) {

		for ( var color in colors) {
			var json = this.findJSONByColor(color);
			if (this.notNull(json)) {
				var id = this.buildColorId(json.catentryId);
				this.enableColor(id);
			}
		}

		dojo.forEach(colors, function(item) {
			var json = SwatchDisplayJS.findJSONByColor(item);
			var id = SwatchDisplayJS.buildColorId(json.catentryId);
			SwatchDisplayJS.enableColor(id);
		});

	},
	reset : function() {

		this.deactivateSize(this.activeSize);
		this.deactivateSize(this.activeLength);
		this.deactivateSize(this.activeWaist);
		this.activeSize = null;
		this.activeLength = null;
		this.activeWaist = null;
		this.lastChanged = 'color';

		/* Clear out any values that may have been set in categoryDisplayJS */
		categoryDisplayJS.setSelectedAttribute("Size", '');
		categoryDisplayJS.setSelectedAttribute("Color", '');

		if (this.mode == 'QuickView') {
			updateMoreInfoUrl();
		}

		dojo.query('ul.productswatches li').removeClass('disabled');

		this.refeshProductDisplay();

	},
	refeshProductDisplay : function() {

		if (!this.notNull(this.productId))
			return;

		var size = null, color = null, waist = null, length = null;

		if (this.notNull(this.activeLength)) {
			length = dojo.query('#' + this.activeLength + ' span')[0].innerHTML;
		}

		if (this.notNull(this.activeWaist)) {
			waist = dojo.query('#' + this.activeWaist + ' span')[0].innerHTML;
		}

		if (this.notNull(length) && this.notNull(waist)) {
			size = waist + '/' + length;
		}

		if (this.notNull(this.activeSize)) {
			size = dojo.query('#' + this.activeSize + ' span')[0].innerHTML;
		}

		if (this.notNull(this.activeColor)) {
			color = dojo.query('#' + this.activeColor + ' a img')[0];
			if (this.notNull(color))
				color = color.title;
			else {
				color = null;
				this.activeColor = null;
			}
		}

		if (this.notNull(color)) {
			var colorLbl = dojo.byId('colorValue');
			colorLbl.innerHTML = color;
		}

		/**
		 * Handle for non split sizes
		 */
		if (!this.sizeJSON.split) {

			if (this.lastChanged == 'color' && this.notNull(color)) {
				this.disableSizes(this.sizeJSON.sizes, 'S');
				var sizesToEnable = this.sizeJSON.colorToSize[color];
				this.enableSizes(sizesToEnable, 'S');
			} else if (this.lastChanged == 'size' && this.notNull(size)) {
				this.disableColors(this.colorJSON);
				var colorsToEnable = this.sizeJSON.sizeToColor[size];
				this.enableColors(colorsToEnable);
			}
			
		} else { /* handle split sizes */

			if (this.lastChanged == 'waist' && this.notNull(waist)) {
				/* need to update color and length */
				this.disableColors(this.colorJSON);
				var colorsToEnable = this.sizeJSON.waistToColorAndLength[waist].colors;
				this.enableColors(colorsToEnable);

				this.disableSizes(this.sizeJSON.lengths, 'L');
				var sizesToEnable = this.sizeJSON.waistToColorAndLength[waist].colors[color];
				this.enableSizes(sizesToEnable, 'L');

			} else if (this.lastChanged == 'length' && this.notNull(length)) {
				/* need to update color and waist */
				this.disableColors(this.colorJSON);
				var colorsToEnable = this.sizeJSON.lengthToColorAndWaist[length].colors;
				this.enableColors(colorsToEnable);

				this.disableSizes(this.sizeJSON.waists, 'W');
				var sizesToEnable = this.sizeJSON.lengthToColorAndWaist[length].colors[color];
				this.enableSizes(sizesToEnable, 'W');

			} else if (this.lastChanged == 'color' && this.notNull(color)) {
				/* need to update waist and length */
				this.disableSizes(this.sizeJSON.waists, 'W');
				var sizesToEnable = null;

				if (this.notNull(length)) {
					sizesToEnable = this.sizeJSON.colorToWaistAndLength[color].lengths[length];
				} else {
					sizesToEnable = this.sizeJSON.colorToWaistAndLength[color].waists;
				}
				this.enableSizes(sizesToEnable, 'W');

				this.disableSizes(this.sizeJSON.lengths, 'L');
				var sizesToEnable = null;

				if (this.notNull(waist)) {
					sizesToEnable = this.sizeJSON.colorToWaistAndLength[color].waists[waist];
				} else {
					sizesToEnable = this.sizeJSON.colorToWaistAndLength[color].lengths;
				}

				this.enableSizes(sizesToEnable, 'L');
			}
		}

		/* Check if we have a disabled value selected */
		if (this.isSizeDisabled(this.activeSize)) {
			this.deactivateSize(this.activeSize);
			this.activeSize = null;
			size = null;
		} else if (this.isSizeDisabled(this.activeLength)) {
			this.deactivateSize(this.activeLength);
			this.activeLength = null;
			size = null;
			this.refeshProductDisplay();
			return;
		} else if (this.isSizeDisabled(this.activeWaist)) {
			this.deactivateSize(this.activeWaist);
			this.activeWaist = null;
			size = null;
			this.refeshProductDisplay();
			return;
		} else if (this.isColorDisabled(this.activeColor)) {
			this.deactivateColor(this.activeColor);
			this.activeColor = null;
			color = null;
		}

		if (this.notNull(size) && this.notNull(color) && this.notNull(this.productId)) {
			categoryDisplayJS.setSelectedAttribute("Size", size);
			categoryDisplayJS.setSelectedAttribute("Color", color);
			categoryDisplayJS.changePrice("entitledItem_" + this.productId, false, true);
			categoryDisplayJS.updateInventory();
		} else {
			categoryDisplayJS.setSelectedAttribute("Size", '');
			categoryDisplayJS.setSelectedAttribute("Color", '');
		}

		if (this.mode == 'QuickView') {
			updateMoreInfoUrl();
		}

		/*if (this.mode == 'ProductDisplay' && this.notNull(color)) {
			 Update productMainImage for cloud zoom 
			var imgTag = dojo.byId('productMainImage');
			var newImg = this.findJSONByColor(color).hoverImage;
			imgTag.parentNode.href = newImg;
			imgTag.src = this.findJSONByColor(color).fullImage;
		}*/

	},
	notNull : function(val) {
		if (typeof val != 'undefined' && val != '' && val != null)
			return true;
		else
			return false;
	},
	updateCatEntryDisplay : function(caller, targetId, imagePath, itemUrl, container) {

		var con = dojo.byId(targetId);
		con.href = itemUrl;

		var img = con.children[0];
		img.src = imagePath;

		dojo.query('#' + container + ' ul li').removeClass('active');

		dojo.query('#' + caller).addClass('active');

	},

	updateColorProductDisplay : function(caller, targetId, imagePath, colorName, container, productId) {

		var colorLbl = dojo.byId('colorValue');
		colorLbl.innerHTML = colorName;

		if (caller.substring(0, 1) == '#') {
			caller = caller.substring(1, caller.length);
		}
		this.setActiveColor(caller);

	},

	updateSizeProductDisplay : function(caller, size, productId) {
		this.setActiveSize(caller);
	},

	updateColorQuickView : function(caller, targetId, imagePath, colorName, container, productId) {

		var colorLbl = dojo.byId('colorValue');
		colorLbl.innerHTML = colorName;

		categoryDisplayJS.setSelectedAttributeJS("Color", colorName);
		categoryDisplayJS.changePrice("entitledItem_" + productId, true, false);
		updateMoreInfoUrl();

		dojo.query('#' + container + ' ul li').removeClass('active');

		dojo.query('#' + caller).addClass('active');
	},

	updateSizeQuickView : function(caller, size, productId) {

		categoryDisplayJS.setSelectedAttribute("Size", size);
		categoryDisplayJS.changePrice("entitledItem_" + productId, true, false);
		updateMoreInfoUrl();

		dojo.query('#sizeNormal ul li').removeClass('selected');

		dojo.query('#' + caller).addClass('selected');
	},
	toggle : function(target) {
		if (dojo.byId(target).style.display == "none") {
			dojo.byId(target).style.display = "block";
		} else {
			dojo.byId(target).style.display = "none";
		}
	}
}