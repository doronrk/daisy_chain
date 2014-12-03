//WORK TO GET RID OF ALL THE LINK DELAYS YOU CAN
//if (bt_cookie("mode")=="debug") {
//set in console:  document.cookie="mode=debug"

if (bt_cookie("mode")=="debug"){ console.log("--- Link Delay: Enabled ---");}

    // add (using a push()) any selectors you want to INCLUDE
    // should at minimum keep the "a" selector to target all links
    // NOTE: the element MUST have an href value
    var _inclusions = [];
        _inclusions.push(".mod-recommend a[href='/profile/MyAccount/personalized/personalized.jsp']");
        _inclusions.push(".bihq-top .bag a, .bihq-top .purchase a");
        _inclusions.push(".basket .list-items a");
        _inclusions.push("#modal-intl-welcome a");
        _inclusions.push(".footer .int-shipping a");
        _inclusions.push('.meganav a[href*="community.sephora.com/beautyadvice"], .meganav a[title="Beauty Board"], .meganav a[title="The Sephora Glossy"], .meganav a[title="BeautyTalk"]');
        _inclusions.push('.view-all a');
        _inclusions.push('.brand-banner a');
        _inclusions.push('.ratings-content .actions a');
        _inclusions.push('.pdp-related-links a');
        _inclusions.push('.color-iq-results #resultsHead .start-over, .color-iq-lookup .head a');
        _inclusions.push('.storehq-result .services a');
        _inclusions.push('a[data-analytic-tclick-glossy]');


    // add (using a push()) any selectors you want to EXCLUDE
    var _exclusions = [];

    // Merge it into a format that jQuery can use
    var _selector = _inclusions.join(', ');
        if (_exclusions.length>0) { _selector += ":not(" + _exclusions.join(', ') + ")"; }

    // set the number of milliseconds to delay
    var _delay = 1000;

    // Bind to the selector

    jQuery("body").on("click", _selector, function(e) {
      // stop the event
      e.preventDefault();
      var link = $(e.currentTarget);
      setTimeout(function() {
        var url = link.attr("href");
        // make sure there IS a url (ie, account for invalid selectors)
        if (typeof url=="string") {
          if(link.attr("target")== "_blank"){
            var win = window.open(url, '_blank');
            win.focus();
            return;
          }
          // if the link is a hash change, just modify the URL instead of navigating
          // TODO: Some browsers will still "JUMP" to that anchor
          if (url.indexOf("#")==0) {
            // remove the "#" before setting
            window.location.hash = url.slice(1);
          }
          else {
            // navigate to the stored URL
            document.location = url;
          }
        }
      }, _delay);
    });

//}