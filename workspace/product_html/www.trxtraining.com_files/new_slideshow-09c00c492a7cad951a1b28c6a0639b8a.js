(function () {
    trx.namespace("widget.slideshow");

    // slideshow javascript used for the slideshow widget
    // requires thumbnails and large images with matching rel attributes for ordering
    trx.widget.slideshow = (function () {

        var MAXIMUM_THUMBNAILS_IN_SLIDESHOW = 5;
        var thumbnailCount;
        var currentSetIndex;

        var _activateCarouselThumbnails = function (setNumber) {

            // activates display of thumbnails under carousel
            // setNumber is 1-based

            totalSets = Math.ceil(thumbnailCount / MAXIMUM_THUMBNAILS_IN_SLIDESHOW);

            if (setNumber > totalSets || setNumber < 1) {
               return; 
            }

            var thumbnails = $('.slideshow-thumbnail-images > li');

            thumbnails.hide();

            var startIndex = (setNumber - 1) * MAXIMUM_THUMBNAILS_IN_SLIDESHOW;
            var endIndex = startIndex + 5 - 1;

            if (setNumber == totalSets) {
                var maxThumbnailCount = totalSets * MAXIMUM_THUMBNAILS_IN_SLIDESHOW;
                var remainder = maxThumbnailCount % thumbnailCount;
                endIndex = maxThumbnailCount - remainder - 1;
            } 

            for (var i = startIndex; i <= endIndex; i++) {
                thumbnails.siblings("[rel='" + i + "']").show();
            }
        };

        var carousel_prev = function (evt) {
            if (currentSetIndex > 1) {
                currentSetIndex--;
                _activateCarouselThumbnails(currentSetIndex);
            }
        };

        var carousel_next = function (evt) {
            if (currentSetIndex < totalSets) {
                currentSetIndex++;
                _activateCarouselThumbnails(currentSetIndex);
            }
        };

        var carousel_select_thumbnail = function (evt) {
            var selectedElement = $(evt.currentTarget);

            _activateShowcase(selectedElement.attr("rel"));


        };

        var carousel_select_thumbnail_playIcon = function (evt) {
            var selectedElement = $(evt.currentTarget);
            _activateShowcase(selectedElement.parent().parent().attr("rel"));

        };

        var _activateShowcase = function (index) {
            var $showcaseToDisplay = $('.slideshow-showcase-images').find("[rel='" + selectedIndex + "']");
            var $showcaseToDisplay1 = $('.slideshow-showcase-images').find("[rel='" + index + "']");

            if ($showcaseToDisplay) {
                $showcaseToDisplay.hide();
            }

            $showcaseToDisplay1.show();
            selectedIndex = index;

        };

        var selectedIndex = 0;
        var previousIndex = 0;

        var init = function () {
            var thumbnails = $('.slideshow-thumbnail-images > li');
            var playThumbnails = $('.play-icon');
            thumbnailCount = thumbnails.length;

            var prev = $('.slideshow-prev');
            var next = $('.slideshow-next');

            thumbnails.click(carousel_select_thumbnail);
            playThumbnails.click(carousel_select_thumbnail_playIcon);

            var _centerThumbnail;
            if (thumbnails.length > MAXIMUM_THUMBNAILS_IN_SLIDESHOW) {
                prev.show();
                next.show();

                prev.click(carousel_prev);
                next.click(carousel_next);

                thumbnails.hide();
                currentSetIndex = 1;
                _activateCarouselThumbnails(currentSetIndex);

            } else {
                prev.hide();
                next.hide();
            }

            _activateShowcase(selectedIndex);
        };

        return {
            init: init
        }
    }());

    $(document).ready(trx.widget.slideshow.init);
})();
