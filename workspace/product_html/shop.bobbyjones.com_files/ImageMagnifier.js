
function goodEnoughValidationPasses() {

    // Instead of cycling through all the elements to check the bounds, 
    // it is good enough to count the number if items underneath the mouse when the hover occurs
    var hoverElementCount = document.querySelectorAll(":hover").length;
    
    var testResult = false;
    switch (window.location.host) {
        case "shop.bobbyjones.com":
        case "shop.bobbyjones.localhost":
        case "bobbyjones.princetennis.com":
            // The test result is when the magnifier under pointer or when mouse enters area either in element area or directly over image and element area.
            var inChrome = hoverElementCount == 3 || hoverElementCount == 5 || hoverElementCount == 17 || hoverElementCount == 20;
            var inIE     = hoverElementCount == 2 || hoverElementCount == 5 || hoverElementCount == 17 || hoverElementCount == 20;
            testResult   = inChrome || inIE;
            break;
        default:
            var inChrome = hoverElementCount == 3 || hoverElementCount == 5 || hoverElementCount == 13 || hoverElementCount == 14;
            var inIE     = hoverElementCount == 2 || hoverElementCount == 5 || hoverElementCount == 13 || hoverElementCount == 14;
            testResult   = inChrome || inIE;
            break;
    }
    return testResult;
}

function validationPasses() {
    // Check whether certain elements are under the mouse
    var validationPasses = true;
    var under = document.querySelectorAll(":hover");
    for (underIndex in under) {

        var underItem = under[underIndex];
        switch (underItem.id) {
            case "PageHeader":
                return false;
                break;
            default:
                // Unknown
                break;
        }
    }
}

jQuery(document).ready(function () {

    jQuery("[data-magnifier-target]").each(function () {

        var containerElement = this;
        var targetElement = jQuery(containerElement).attr("data-magnifier-target");

        // Implement function to watch mouse movement
        jQuery(document).mousemove(function (event) {

            if (goodEnoughValidationPasses()) {

                //console.log("validation passes");

                var mouseX = event.pageX;
                var mouseY = event.pageY;

                var boundsX1 = jQuery(containerElement).offset().left;
                var boundsX2 = jQuery(containerElement).offset().left
                             + jQuery(containerElement).width();
                var boundsY1 = jQuery(containerElement).offset().top;
                var boundsY2 = jQuery(containerElement).offset().top
                             + jQuery(containerElement).height();

                var inBoundsX = boundsX1 <= mouseX && mouseX <= boundsX2;
                var inBoundsY = boundsY1 <= mouseY && mouseY <= boundsY2;
                var inBounds = inBoundsX && inBoundsY;

                if (inBounds) {

                    // Set hover state
                    jQuery(containerElement).addClass('hover');

                    // Create magnifier if it doesn't already exist
                    if (jQuery("#magnifier").length <= 0) {
                        //console.log(containerElement);
                        var magnifiedImageUrl = jQuery(containerElement).attr("data-magnifier-image");
                        var productZoomUrl = jQuery(containerElement).attr("data-href");
                        var magnifierHtml = "<div id='magnifier' style='position:absolute;z-index:5000;left:0px;top:0px;overflow:hidden'><a href='" + productZoomUrl + "' target='_blank'><img src='" + magnifiedImageUrl + "' style='position:absolute;border-size:0px'/></a></div>";
                        jQuery(magnifierHtml).appendTo("body");
                    }
                    else {
                        // continue
                    }

                    jQuery("#magnifier").each(function () {

                        var magnifierElement = this;

                        var deltaX = jQuery(magnifierElement).width() / 2;
                        var deltaY = jQuery(magnifierElement).height() / 2;

                        // New position
                        var posX = mouseX - deltaX;
                        var posY = mouseY - deltaY;

                        // Have magnifier follow the mouse
                        jQuery(magnifierElement).css("left", posX);
                        jQuery(magnifierElement).css("top", posY);


                        var magnifierImage = jQuery(magnifierElement).find('img');

                        // Get position relative to target image
                        var mouseDeltaX = mouseX - jQuery(targetElement).offset().left;
                        var mouseDeltaY = mouseY - jQuery(targetElement).offset().top;

                        // Get width of inner image (get ratio)
                        var mouseRatioX = jQuery(magnifierImage).width() / jQuery(targetElement).width();
                        var mouseRatioY = jQuery(magnifierImage).height() / jQuery(targetElement).height();

                        // Adjust to new position times ratio
                        jQuery(magnifierImage).css('left', -mouseDeltaX * mouseRatioX + deltaX);
                        jQuery(magnifierImage).css('top',- mouseDeltaY * mouseRatioY + deltaY);

                    });

                }
                else {

                    // Remove hover state
                    jQuery(containerElement).removeClass('hover');

                    // Remove magnifier
                    jQuery("#magnifier").remove();

                }

            }
            else {

                // Validation failed
                //console.log("validation failed");

                // Remove hover state
                jQuery(containerElement).removeClass('hover');

                // Remove magnifier
                jQuery("#magnifier").remove();

            }


        }); // End $(document).mousemove(...)

    }); // End $(target).each(...)

}); // End $(document).ready(...);
