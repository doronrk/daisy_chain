//global fn called by vendor
function ratingsDisplayed(totalReviewCount, avgRating, ratingsOnlyReviewCount) {
    $('.BVRatingSummaryLinks a[href="#reviews"]').click(function() { $('.ui-tabs-nav a[href="#RatingsAndReviews"]').trigger('click') });
}

/*global $ document*/
var DELL = window.DELL || {};
DELL.com = DELL.com || {};
DELL.com.BV = DELL.com.BV || {};

(function($, d) {
    (function() {
        var bvUrlDiv= d.getElementById('BVUrl'),
            $bvJs = $('#bvJs'),
        
        onload = {
            initialize: function () {
                bvUrlDiv = d.getElementById('BVUrl'),
                    bvContainer = d.getElementById('BVContainerPageURL');

                d.domain = 'dell.com';
                
                if (bvContainer != null) 
                    bvContainer.innerHTML = bvContainer.innerHTML.replace(/http:\/\/[^\/]*/i, 'http://' + document.location.host);

                if (bvUrlDiv && bvUrlDiv.innerHTML !== 'undefined') 
                    DELL.com.BV.asyncReviewsFrame(bvUrlDiv.innerHTML);
            }
        };

        this.asyncReviewsFrame = function(u) {
            if (u) {
                var htmCntnr = d.getElementById('bazaarVoice'),
                    bvframe = d.createElement('iframe');

                if (htmCntnr) {
                    bvframe.name = bvframe.id = 'BVFrame';
                    bvframe.style.cssText = 'visibility:hidden;width:1px;height:1px;position:absolute;left:-999px;top:-999px;';

                    htmCntnr.appendChild(bvframe);
                    setTimeout(function () {
                        redirectIframe(u, bvframe);
                    }, 4);
                }
                
            }
        };

        var redirectIframe = function(u, fr, t) {
            if (typeof fr !== 'undefined' && typeof fr.src !== 'undefined')
                fr.src = u;
        };

        //render the non blocking iframe immediately if container available
        $(d).ready(function () {
            if ($bvJs.length > 0) {
                $.getScript($bvJs.attr('data-src'), function () {
                    onload.initialize()
                });
            } else {
                onload.initialize();
            }
        });

    }).call(DELL.com.BV)
})(jQuery, document);
