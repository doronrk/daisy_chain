
(function ($) {

    GallerySwatchify = function (productElement, swatchGroupSelector) {

        // Constructor

        this.product = productElement;
        this.swatchGroupSelector = swatchGroupSelector;
        this.swatchGroupId = $(swatchGroupSelector).attr("id");

    };
    GallerySwatchify.prototype.updateGallery = function () {
        
        if (this.swatchGroupId in this.product.attributeGroupsById) {
            var swatchGroup = this.product.attributeGroupsById[this.swatchGroupId];
            if (swatchGroup.isNoneSelected()) {

                // CASE: Nothing selected
                this.Show_NonSwatchImages(swatchGroup);

            }
            else {

                if (this.SwatchGroupHasExamples(swatchGroup)) {

                    // CASE: Swatch selected
                    this.Show_RelatedToSelectedSwatch(swatchGroup);

                }
                else {

                    // CASE: Swatch selected but gallery images missing for given swatch
                    //this.Show_NonSwatchImages();
                    this.HideAll();

                }

            }
        }
        else {

            // CASE: Swatch group isn't used on this page
            // Pass

        }
    };
    GallerySwatchify.prototype.Show_RelatedToSelectedSwatch = function (swatchGroup) {
        this.product.gallery.hideAll();
        this.product.gallery.showByCallback($.proxy(this.MatchSelectedSwatchName, this));
        this.product.gallery.selectFirstVisibleItem();
        this.product.gallery.mainImage.visible(true);
    };
    GallerySwatchify.prototype.Show_NonSwatchImages = function (swatchGroup) {
        this.product.gallery.showAll();
        this.product.gallery.hideByCallback($.proxy(this.MatchAnySwatchName, this));
        this.product.gallery.mainImage.visible(true);
    };
    GallerySwatchify.prototype.HideAll = function () {
        this.product.gallery.hideAll();
        this.product.gallery.mainImage.visible(false);
    };
    GallerySwatchify.prototype.SwatchGroupHasExamples = function (swatchGroup) {
        return this.product.gallery.items_SliceByCallback($.proxy(this.MatchSelectedSwatchName, this)).length > 0;
    };

    GallerySwatchify.prototype.ExtractSwatchName = function (galleryItem) {
        var testSegments = galleryItem.fileName.split("_");
        if (testSegments.length >= 3) {
            return testSegments[2];
        }
        else {
            // Problem extracting swatch name
            return null;
        }
    };
    GallerySwatchify.prototype.MatchSelectedSwatchName = function (galleryItem) {
        var testSwatchName = this.ExtractSwatchName(galleryItem);
        if (testSwatchName != null) {
            var swatchGroup = this.product.attributeGroupsById[this.swatchGroupId];
            //var labelToCompare = swatchGroup.selectedLabel().match(/[0-9]*$/);
            var labelToCompare = swatchGroup.selectedLabel().substring(0,3);

            return testSwatchName == labelToCompare;
        }
        else {
            return false;
        }
    };
    GallerySwatchify.prototype.MatchAnySwatchName = function (galleryItem) {
        var testSwatchName = this.ExtractSwatchName(galleryItem);
        if (testSwatchName != null) {

            var swatchGroup = this.product.attributeGroupsById[this.swatchGroupId];
            for (var swatchIndex = 0; swatchIndex < swatchGroup.labels.length; swatchIndex++) {
                //var labelToCompare = swatchGroup.labels[swatchIndex].match(/[0-9]*$/)[0];
                var labelToCompare = swatchGroup.labels[swatchIndex].substring(0, 3);
                if (testSwatchName == labelToCompare) {
                    return true;
                }
                else {
                    // Pass; Match not found yet
                }
            }

        }
        else {
            return false;
        }
    };

})(jQuery);
