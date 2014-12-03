
function ImageMagnifierSlideItMooSwitcher(options) {

    jQuery(document).ready(function () {

        // Prevent clicking links
        //jQuery(options.fromContainer + " a").click(function (event) {
        //    event.preventDefault();
        //});

        // Handle clicking target
        jQuery(options.fromContainer).each(function (index) {
            jQuery(this).click(function (event) {

                event.preventDefault();

                // Replace image
                var imageUrl = jQuery(this).find(options.fromImageSubElement).attr("data-image");
                //console.log("Image URL: " + imageUrl);
                jQuery(options.toImageElement).attr("src", imageUrl);

                // Replace magnifier image
                var magnifierImageUrl = jQuery(this).find(options.fromMagnifierImageSubElement).attr("data-magnifier-image");
                jQuery(options.toMagnifierElement).attr("data-magnifier-image", magnifierImageUrl);

                var productZoomUrl = jQuery(this).find(options.fromMagnifierImageSubElement).attr("data-href");
                jQuery(options.toMagnifierElement).attr("data-href", productZoomUrl);

            });
        });

    });
}
