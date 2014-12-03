// formatting power reviews on product page

if(typeof(trus) == "undefined")
    trus = {}

trus.powerReviews = {}

trus.powerReviews.prReformat = function(source, data) {
    // tab subheadings
    var reviewCount = data.getFullReviewCount();
    if(reviewCount)
        jQuery('<div class="subhead">Reviewed By ' + reviewCount + ' Customer(s)</div>').insertAfter('#prod_ratings_control');
    else {
        jQuery('<div class="subhead">Be the first to Rate and Review this item</div>').insertAfter('#prod_ratings_control');
        jQuery('#prod_ratings').addClass('noRatings');
        jQuery('#prod_ratings.noRatings .pr-snapshot-no-ratings').html(jQuery('#prod_ratings.noRatings .pr-snapshot-no-ratings').html().replace('Not yet rated.', ''));
    }
    jQuery('#prSnippet .pr-pa-snippet-questions .pr-snippet-link').text('Ask a Question').attr('href', '#customerReviews');
}

trus.powerReviews.prTabs = function() {
    jQuery('#customerReviews .tabset-control li').click(function() {
        var el = jQuery(this).find('.tabset-control-link');
        el.closest('.tabset-control').find('.tabset-control-link').removeClass('tabset-control-link-active').closest('li').removeClass('active');
        el.addClass('tabset-control-link-active').closest('li').addClass('active');
        if(jQuery(this).find("#prod_ratings_control").length) {
            jQuery("#prod_ratings").css("display", "block");
            jQuery("#prod_answers").css("display", "none");
        } else {
            jQuery("#prod_answers").css("display", "block");
            jQuery("#prod_ratings").css("display", "none");
        }
    });
    jQuery('#prod_ratings').on('click', '.pr-page-prev a, .pr-page-next a', function() {
        setTimeout(function() {
            window.scrollTo(0, jQuery('#prod_ratings').position().top);
        }, 100);
    });
    jQuery('#prSnippet').delegate('.pr-snippet-read-reviews .pr-snippet-link', 'click', function() {
        jQuery('#prod_ratings_control').click();
    });
    jQuery('#prSnippet').delegate('.pr-pa-snippet-questions .pr-snippet-link', 'click', function() {
        jQuery('#prod_answers_control').click();
    });
}

POWERREVIEWS.display.registerCallback(trus.powerReviews.prReformat);

trus.powerReviews.prTabs();
