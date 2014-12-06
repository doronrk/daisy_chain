function GoBackToLastSearch() {
    var cookies = new CookieManager();

    // Use browser "back" if possible this will re-position the user's page (if they are at the bottom of the search page).

    // If the referrer is results or products, go back. This is the simple case.
    if (document.referrer.match(/Results.aspx/) != null || document.referrer.match(/Products.aspx/) != null)  
    {
        history.go(-1);
    }
    // There are no track searches, go back.
    else if (cookies.getValue('trackSearches') == null) 
    {
        location.href = '/Shopping/Results.aspx?N=0'; 
    }
    // There are track searches, and the referrer matches the track search, go back.
    else if (cookies.getValue('trackSearches') != null 
        && document.referrer.match(cookies.getValue('trackSearches').replace(/\?/, '\\?').replace(/\+/g, '\\+')) != '0'
        && document.referrer.match(cookies.getValue('trackSearches').replace(/\?/, '\\?').replace(/\+/g, '\\+')) != null)
    {
        history.go(-1);
    }
    else 
    {
        location.href = cookies.getValue('trackSearches', '/');
    }
}

function GoBackToPreviousPage() {
    var cookies = new CookieManager();

    if (document.referrer.match(/Results.aspx/) || document.referrer.match(/Products.aspx/) ||
		(cookies.getValue('trackPreviousPage') && document.referrer.match(cookies.getValue('trackPreviousPage').replace('?', '\\?').replace('+', '\\+')))) {
        // use browser "back" if possible
        //   this will re-position the user's page for one (if they are at the bottom of the search page)
        history.go(-1);
    }
    else if (cookies.getValue('trackPreviousPage'))
        location.href = cookies.getValue('trackPreviousPage', '/');
    else
        GoBackToLastSearch();
}

$(function() {
    $(".aPrevPageBtn").click(function(e) {
        if (e.stop) e.stop();   //wonderful IE8, :p
        else e.preventDefault();
        GoBackToPreviousPage();
        return false;
    });
});