function redirectHttps() {
    var url = window.location.href;
    // Do not redirect local host
    if (url.indexOf("localhost") >= 0) {
        return;
    }

    // Do not redirect address with ip

    if (url.indexOf("localhost") >= 0) {
        return;
    }

    var needToRedirect = false;
    // Is https?
    if (url.indexOf("https://") == -1) {
        url = url.replace("http://", "https://");
        needToRedirect = true;
    }

    //Is it IP address
    var preIP = "https://";
    var preIPStringLength = preIP.length;
    if (url.charAt(preIPStringLength).match(/[0-9]/) == null)
    {
        // Is www?
        if (url.indexOf("https://www.") == -1) {
            url = url.replace("https://", "https://www.");
            needToRedirect = true;
        }
    }

    if( needToRedirect == true)
        window.location = url;
}

    
// Force whole site to HTTPS
redirectHttps();


function renderFlaggedLabel(label) {
    var htmlBuffer = new StringBuffer();

    htmlBuffer.append('<table class="flagged-label"><tr>');

    htmlBuffer.append('<td class="left-cap">&nbsp;</td>');
    htmlBuffer.append('<td class="content">');
    htmlBuffer.append(label);
    htmlBuffer.append('</td>');
    htmlBuffer.append('<td class="right-cap">&nbsp;</td>');

    htmlBuffer.append('</tr></table>');
    return htmlBuffer.toString();
}
function renderBreadbrumbs(breadcrumbs, sep) {
    sep = typeof(sep) != 'undefined' ? sep : '/';

    var htmlBuffer = new StringBuffer();

    htmlBuffer.append('<ul class="breadcrumb">');

    for (var i=0; i<breadcrumbs.Links.length-1; i++) {
        var link = breadcrumbs.Links[i];

        if (i > 0)
            htmlBuffer.append('<li class="breadcrumb-sep">'+sep+'</li>');

        htmlBuffer.append('<li class="breadcrumb-item');
        if (i==0)
            htmlBuffer.append(" first");
        if (i == breadcrumbs.Links.length - 1)
            htmlBuffer.append(" last");
        htmlBuffer.append('">');

        if (link.Url && i<(breadcrumbs.Links.length-1))
            htmlBuffer.append('<a href="'+link.Url+'">'+link.Label.toUpperCase()+'</a>');
        else
            htmlBuffer.append(link.Label.toUpperCase());
            

        htmlBuffer.append("</li>");
    }

    htmlBuffer.append('</ul>');

    return htmlBuffer.toString();
}
function renderTitleFromBreadbrumbs(breadcrumbs) {
    var htmlBuffer = new StringBuffer();

    for (var i = 0; i < breadcrumbs.Links.length-1; i++) {
        if (i > 0) {
            var link = breadcrumbs.Links[i];

            if (i > 1)
                htmlBuffer.append(' ');
            htmlBuffer.append(link.Label);
        }
    }

    return htmlBuffer.toString().toLowerCase();
}
function trimText(t, l) {
    if (t.length <= l) {
        return t;
    }
    return t.substring(0, l - 3) + '...';
}