
jQuery(function($) {


    // Read querystring
    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));


    var getSidekickUrl = function() {
        try {
            if (sessionStorage) return sessionStorage.getItem('sidekickUrl');
        }
        catch(err) {
            //Local storage doesn't work!
        }
        return null;
    };

    // show the back to filter button if appropriate category
    var showSidekickUIElement = function() {

        // Wait 500ms to show it wasn't there to begin with
        setTimeout(function() {

            $('#breadcrumb').html('<a id="backToSidekick" style="background-color: #C30404;color: #FFFFFF;cursor: pointer;font-weight: bold;padding: 6px">Back to Finder</a>');

            $('#backToSidekick').bind('click', function() {
                // get the back url from session
                var sidekickUrl = getSidekickUrl();

                // Load this from session variable
                window.location = sidekickUrl;

                // clear session per MJ spec.
                clearSessionState()
            });

        }, 500);

    };

    var clearSessionState = function() {
        if (sessionStorage) sessionStorage.removeItem('sidekickUrl');
    }

    var getCategoryFromPage = function() {
        // determine category
        var breadcrumbs = $('#breadcrumb');

        // ensure there is a bread crumb
        if (!breadcrumbs || breadcrumbs.length == 0) return null;

        // get just the text
        var breadcrumbText = breadcrumbs.text().toLowerCase();

        // Only show if valid category
        if (breadcrumbText.indexOf('packs') > -1) {
            return 'packs';
        }

        return null;
    };


    // determine if we have previously indicated that user came from sidekick
    var cameFromSideKick = function() {

        // try the localStorage first
        if (getSidekickUrl()) {
            return true;
        }

        // if qs value is set
        if (qs['sidekickUrl']) {

            try {
                // Put the object into storage
                if (sessionStorage) sessionStorage.setItem('sidekickUrl', qs['sidekickUrl']);
            }
            catch(err) {
                //Local storage doesn't work!
            }

            return true;
        }

        // possibly resort to cookies to support IE7 and below?


        // Otherwise they did not come from sidekick
        return false;
    };


    // Check to see if we've come from a sidekick page
    if (cameFromSideKick()) {

        // get the category from the page
        var category = getCategoryFromPage();

        // Only show if a valid category page
        if (category) {
            showSidekickUIElement();
        }
    }

});
