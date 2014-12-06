renderAddthisButtons();

function renderAddthisButtons() {
    var addthis = document.getElementsByTagName('ad:addthis');
    renderArray(addthis);

    addthis = document.getElementsByTagName('addthis');
    renderArray(addthis);
}

function renderArray(addthis) {
    for (var i = 0; i < addthis.length; i++) {
        var addthiscontrol = document.createElement("div");

        var control = addthis[i];

        addthiscontrol.setAttribute("id", control.getAttribute("id"));

        var pubid = control.getAttribute("pubid");

        if (control.getAttribute("disable") == "true")
            addthiscontrol.innerHTML += '<div style=" width: 251px; height:100px; position:absolute; z-index:1; opacity:0; filter:alpha(opacity=0); cursor:default;"><\/div>';

        switch (control.getAttribute("buttonset")) {
            case 'toolbox':
                addthiscontrol.innerHTML += '<div class="addthis_toolbox addthis_default_style ">' +
                                            '<a href="https:\/\/www.addthis.com\/bookmark.php?v=250&amp;pubid=' + pubid + '" class="addthis_button_compact">Share</a>' +
                                            '<span class="addthis_separator" style="margin: 0 2px">|</span>' +
                                            '<a class="addthis_button_twitter"></a>' +
                                            '<a class="addthis_button_google_plusone_share"></a>' +
                                            '<a class="addthis_button_pinterest_share"></a>' +
                                            '<a class="addthis_button_email"></a>' +
                                            '</div>';
                break;
            case 'toolbox-simple':
                addthiscontrol.innerHTML += '<div class="addthis_toolbox addthis_default_style ">' +
                                            '<a href="https://www.addthis.com/bookmark.php?v=250&amp;pubid=' + pubid + '" class="addthis_button_compact">Share</a>' +
                                            '</div>';
                break;
            case 'toolbox-smallicons':
                addthiscontrol.innerHTML += '<div class="addthis_toolbox addthis_default_style" style="display:inline!important">' +
                                            '<a class="addthis_button_twitter"></a>' +
                                            '<a class="addthis_button_google_plusone_share"></a>' +
                                            '<a class="addthis_button_pinterest_share"></a>' +
                                            '<a class="addthis_button_email"></a>' +
                                            '<a class="addthis_button_compact"></a>' +
                                            '</div>';
                break;
            case 'toolbox-largeicons':
                addthiscontrol.innerHTML += '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" style="display:inline!important">' +
                                            '<a class="addthis_button_twitter"></a>' +
                                            '<a class="addthis_button_google_plusone_share"></a>' +
                                            '<a class="addthis_button_pinterest_share"></a>' +
                                            '<a class="addthis_button_email"></a>' +
                                            '<a class="addthis_button_compact"></a>' +
                                            '</div>';
                break;
            case 'button':
                addthiscontrol.innerHTML += '<a class="addthis_button" href="https://www.addthis.com/bookmark.php?v=250&amp;' + pubid + '"><img src="https://s7.addthis.com/static/btn/v2/lg-share-en.gif" width="125" height="16" alt="Bookmark and Share" style="border:0"/></a>';
                break;
            case 'button-simple':
                addthiscontrol.innerHTML += '<a class="addthis_button" href="https://www.addthis.com/bookmark.php?v=250&amp;' + pubid + '"><img src="https://s7.addthis.com/static/btn/sm-share-en.gif" width="83" height="16" alt="Bookmark and Share" style="border:0"/></a>';
                break;

        }

        if (control.getAttribute("analytics") == "true")
            var addthis_config = { "data_track_clickback": true };

        control.parentNode.replaceChild(addthiscontrol, control);
    }
}
