
//
// REQUIRES: jQuery, UnderscoreJS
// NOTES: Currently attribute groups only work when they are drop downs; otherwise, they are ignored
// 

(function ($) {

    //
    // Basic Element
    //

    var BasicElementMethods = {
        display: function (show) {
            if (typeof show !== 'undefined') {
                if (show == true) {
                    this._show();
                }
                else {
                    this._hide();
                }
            }
            else {
                // Pass; Nothing to set
            }
            return this._isShown();
        },
        _isShown: function () {
            return $(this.selector).is(":visible");
        },
        _show: function () {
            $(this.selector).show();
        },
        _hide: function () {
            $(this.selector).hide();
        },
        visible: function (makeVisible) {
            if (typeof makeVisible !== 'undefined') {
                if (makeVisible == true) {
                    this._makeVisible();
                }
                else {
                    this._makeInvisible();
                }
            }
            else {
                // Pass; Nothing to set
            }
            return this._isVisible();
        },
        _isVisible: function () {
            return $(this.selector).css("visibility") == "visible";
        },
        _makeVisible: function () {
            $(this.selector).css({ visibility: "inherit" });
        },
        _makeInvisible: function () {
            $(this.selector).css({ visibility: "hidden" });
        }
    };

    //
    // Product Element
    //

    ProductElement = function (productSelector) {

        // Constructor

        this.selector = productSelector;

        // Attribute groups
        this.attributeGroups = [];
        var productElement = this;
        $(this.selector + " #Attributes .Option .AttributeDropDown").each(function (grpIndex, grpElement) {
            var grpSelector = "#" + $(grpElement).attr("id");
            productElement.attributeGroups.push(new AttributeGroupElement(productElement, grpSelector));
        });

        // Attribute groups by ID
        this.attributeGroupsById = {};
        $.each(this.attributeGroups, function (grpIndex, grp) {
            var grpId = $(grp.selector).attr("id");
            productElement.attributeGroupsById[grpId] = grp;
        });

        // Attribute group IDs
        this.attributeGroupIds = Object.keys(this.attributeGroupsById);

        // Gallery
        this.gallery = new GalleryElement(this, this.selector + " .LeftPanel");

    };
    _.extend(ProductElement.prototype, BasicElementMethods);

    //
    // Attribute Group Element
    //

    AttributeGroupElement = function (productElement, attributeGroupSelector) {

        // Constructor

        this.product = productElement;
        this.selector = attributeGroupSelector;

        this.labels = this._labels();

    };
    _.extend(AttributeGroupElement.prototype, BasicElementMethods);

    AttributeGroupElement.prototype._labels = function () {
        var labels = [];
        $(this.selector + " option").each(function (index, labelElement) {
            var label = $(labelElement).text();
            labels.push(label);
        });
        return labels;
    };
    AttributeGroupElement.prototype.selectedLabel = function () {
        return $(this.selector + " :selected").text();
    };
    AttributeGroupElement.prototype.selectedValue = function () {
        return $(this.selector + " :selected").val();
    };
    AttributeGroupElement.prototype.isNoneSelected = function () {
        return this.selectedValue() === "0";
    };

    //
    // Gallery Element
    //

    GalleryElement = function (productElement, gallerySelector) {

        // Constructor
        this.product = productElement;
        this.selector = gallerySelector;

        // Populate items
        this.items = [];
        var itemSelector = this.selector + " #CatalogImageSlider .CatalogImage_element";
        var itemCount = $(itemSelector).length;
        for (var itemIndex = 0; itemIndex < itemCount; itemIndex++) {
            var galleryItem = new GalleryItemElement(this, itemSelector + ":nth-child(" + (itemIndex + 1) + ")");
            this.items.push(galleryItem);
        }

        // Instantiate main image element
        this.mainImage = new GalleryMainImageElement(this, this.selector + " .ProductPageImageContainer");

    };
    _.extend(GalleryElement.prototype, BasicElementMethods);

    GalleryElement.prototype.items_SliceByFilePrefix = function (prefix) {
        return new ImageListHelper(this.items).sliceByFilePrefix(prefix);
    };
    GalleryElement.prototype.items_SliceByCallback = function (callback) {
        return new ImageListHelper(this.items).sliceByCallback(callback);
    };
    GalleryElement.prototype.selectFirstVisibleItem = function () {
        var BREAK = false;
        $.each(this.items, function (itemIndex, item) {
            if (item.display()) {
                item.select();
                return BREAK;
            }
            else {
                // Pass
            }
        });
    };

    GalleryElement.prototype.showAll = function () {
        $.each(this.items, function (itemIndex, item) {
            item.display(true);
        });
    };
    GalleryElement.prototype.showByCallback = function (callback) {
        var items = this.items_SliceByCallback(callback);
        this.showGalleryItems(items);
    };
    GalleryElement.prototype.showByFilePrefix = function (prefix) {
        var items = this.items_SliceByFilePrefix(prefix);
        this.showGalleryItems(items);
    };
    GalleryElement.prototype.showByFilePrefixes = function (prefixes) {
        var gallery = this;
        $.each(prefixes, function (index, prefix) {
            gallery.showByFilePrefix(prefix);
        });
    };
    GalleryElement.prototype.showGalleryItems = function (items) {
        $.each(items, function (itemIndex, item) {
            item.display(true);
        });
    };

    GalleryElement.prototype.hideAll = function () {
        $.each(this.items, function (index, item) {
            item.display(false);
        });
    };
    GalleryElement.prototype.hideByFilePrefix = function (prefix) {
        var items = this.items_SliceByFilePrefix(prefix);
        this.hideGalleryItems(items);
    };
    GalleryElement.prototype.hideByCallback = function (callback) {
        var items = this.items_SliceByCallback(callback);
        this.hideGalleryItems(items);
    };
    GalleryElement.prototype.hideByFilePrefixes = function (prefixes) {
        var gallery = this;
        $.each(prefixes, function (index, prefix) {
            gallery.hideByFilePrefix(prefix);
        });
    };
    GalleryElement.prototype.hideGalleryItems = function (items) {
        $.each(items, function (itemIndex, item) {
            item.display(false);
        });
    };

    GalleryMainImageElement = function (galleryElement, productImageSelector) {

        // Constructor

        this.gallery = galleryElement;
        this.selector = productImageSelector;

        this.fileSource = $(this.selector + " #ProductImageWrapper img").attr("src");
        this.fileName = this.fileSource.split("/").pop();

    };
    _.extend(GalleryMainImageElement.prototype, BasicElementMethods);

    //
    // Gallery Item Element
    //

    GalleryItemElement = function (galleryElement, itemSelector) {

        // Constructor

        this.gallery = galleryElement;
        this.selector = itemSelector;

        this.fileSource = this._fileSource();
        this.fileName = this._fileName();

    };
    _.extend(GalleryItemElement.prototype, BasicElementMethods);

    GalleryItemElement.prototype.isSelected = function () {
        return this.gallery.mainImage.fileName == this.fileName;
    };
    GalleryItemElement.prototype.select = function () {
        // See "ImageMagnifierSlideItMooSwitches" for details on how the image button selector is defined
        var imageButtonSelector = this.selector + " .Image";
        $(imageButtonSelector).trigger("click");
    };
    GalleryItemElement.prototype._fileSource = function () {
        var imageSelector = this.selector + " .Image img";
        return $(imageSelector).attr("src");
    };
    GalleryItemElement.prototype._fileName = function () {
        return this._fileSource().split("/").pop();
    };

    //
    // Image List Helper
    //

    ImageListHelper = function (items) {
        this.items = items;
    };
    ImageListHelper.prototype.sliceByFilePrefix = function (prefix) {
        var result = [];
        $.each(this.items, function (itemIndex, item) {
            var isMatch = item.fileSource.split("/").pop().indexOf(prefix) == 0;
            if (isMatch) {
                result.push(item);
            }
            else {
                // Pass
            }
        });
        return result;
    };
    ImageListHelper.prototype.sliceByCallback = function (isMatchCallback) {
        var result = [];
        $.each(this.items, function (itemIndex, item) {
            if (isMatchCallback(item)) {
                result.push(item);
            }
            else {
                // Pass
            }
        });
        return result;
    };

})(jQuery);
