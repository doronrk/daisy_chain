var chatCoBrowse = function(win, doc){
	 try{
        var ADMIN_SERVER = "https://live.qvcchat.com";
        var WEB_CONTEXT = "system" ;
        if (!win.eGain) win.eGain = {};
        var cbStarter = function() {
            if (win.eGain.cobrowse && win.eGain.cobrowse.startCobrowse && win.eGain.cobrowseConfig && win.eGain.cobrowseConfig.cdnBase) {
                win.eGain.cobrowse.startCobrowse();
            } else {
                setTimeout(cbStarter, 100);
            }
        };
        win.eGain.initCobrowse = function(doNotStart) {
            var el = doc.createElement("script"), s = doc.getElementsByTagName("script")[0];
            el.type = "text/javascript"; el.async = true; el.src = ADMIN_SERVER + "/" + WEB_CONTEXT + "/cb/admin/js/allow_cobrowse.js";
            s.parentNode.insertBefore(el, s);
            if(!doNotStart)
			  cbStarter();
        };

		win.eGain.getCookie = function (name) {
			var Argument = name + "=",
				ArgumentLength = Argument.length,
				CookieLength = document.cookie.length,
				EndString,
				i = 0;
			while (i < CookieLength) {
				var j = i + ArgumentLength;
				if (document.cookie.substring(i, j) == Argument) {
					EndString = document.cookie.indexOf(";", j);
					if (EndString == -1)
						EndString = document.cookie.length;
					return unescape(document.cookie.substring(j, EndString));
				}
				i = document.cookie.indexOf(" ", i) + 1;
				if (i == 0)
					break;
			}
			return (null);
		}
        
        if(win.eGain.getCookie("EGCB_SESSION_STATE")  == "true"){
            win.eGain.initCobrowse(true);
        }
        else if(location.href.toLowerCase().indexOf("cbautostart=true") != -1){
            win.eGain.initCobrowse();
        }
    }catch(e){
        //alert("Could not initialize cobrowse");
    }
}

window.setTimeout("chatCoBrowse(window, document)",1000);
//window.onload =chatCoBrowse(window, document);