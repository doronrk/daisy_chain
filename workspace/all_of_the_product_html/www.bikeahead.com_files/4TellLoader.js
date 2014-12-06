(function (_4TellBoost) {
    if ((_4TellBoost.alias === null) || (_4TellBoost.alias.length < 1))
        return;
    if (window != window.top && "object" == typeof(window.top._4TellBoost)) {
        _4TellBoost.mode = window.top._4TellBoost.mode;    
        _4TellBoost.version = window.top._4TellBoost.version;    
    }
    _4TellBoost.loadpath = _4TellBoost.devPath || (_4TellBoost.mode === "stage" && "//4tcdnstage.blob.core.windows.net/4tjs/")
        || "//4tcdn.blob.core.windows.net/4tjs/";
    //Checking jQuery version like this also catches the possibility that it's UNDEF.
    var d = new Date();

    var version = (_4TellBoost.version) || d.getHours();
    if (typeof jQuery == 'undefined' || !jQuery.fn.jquery ) {   //Load jQuery and all other libraries.
        document.write('<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>');
        document.write('<script type="text/javascript" src="' + _4TellBoost.loadpath + 'jquery.tools.min.js"></script>');
        document.write('<script type="text/javascript" src="' + _4TellBoost.loadpath + 'jail.min.js"></script>');
        var __noconflict = true;
    } else {
        if (typeof jQuery().scrollable == 'undefined' || !(jQuery.tools.version > "v1.1.2")) {   //make sure jQuery Tools is defined
            document.write('<script type="text/javascript" src="' + _4TellBoost.loadpath + 'jquery.tools.min.js"></script>');
        }
        if (typeof jQuery().jail == "undefined") {//Load the lazyload library
            document.write('<script type="text/javascript" src="' + _4TellBoost.loadpath + 'jail.min.js"></script>');
        }
    }
    //cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js
    if (typeof JSON == 'undefined' || typeof JSON.stringify == 'undefined') {   //make sure JSON lib is defined
        document.write('<script type="text/javascript" src="' + _4TellBoost.loadpath + 'json2.js"></' + "script>");
    }

    //load 4-Tell scripts
    document.write('<script type="text/javascript" src="' + _4TellBoost.loadpath + 'config/'
    				+ _4TellBoost.alias + '.js?' + version + '"></script>');
    document.write('<script type="text/javascript" src="' + _4TellBoost.loadpath + '4TellBoost.js?' + version + '"></script>');
}(window._4TellBoost));
