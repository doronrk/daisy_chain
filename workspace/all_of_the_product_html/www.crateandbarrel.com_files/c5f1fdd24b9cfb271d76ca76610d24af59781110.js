if (bt_parameter("preview")=="on") { document.cookie="BTpreview=true;domain=crateandbarrel.com;path=/"; console.log("BrightTag preview mode activated."); }
else if (bt_parameter("preview")=="off") { document.cookie="BTpreview=;domain=crateandbarrel.com;path=/;expires=Sun, 19 Aug 14 08:45:55 UTC"; console.log("BrightTag preview mode deactivated."); }
else if (bt_cookie("BTpreview")) { console.log("BrightTag preview mode.") }