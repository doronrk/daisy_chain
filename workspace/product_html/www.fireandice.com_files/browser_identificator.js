/*
$Id: browser_identificator.js,v 1.6 2008/10/17 07:25:02 max Exp $
vim: set ts=2 sw=2 sts=2 et:
*/
var scriptNode = document.createElement("script");
scriptNode.type = "text/javascript";
setTimeout(
	function() {
		if (!scriptNode)
			return;

		scriptNode.src = xcart_web_dir + "/adaptive.php?send_browser=" +
			(localIsDOM ? "Y" : "N") + (localIsStrict ? "Y" : "N") + (localIsJava ? "Y" : "N") + "|" + 
			localBrowser + "|" + 
			localVersion + "|" + 
			localPlatform + "|" + 
			(localIsCookie ? "Y" : "N") + "|" + 
			screen.width + "|" + 
			screen.height + "|" + 
			current_area;
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	},
	3000
);
