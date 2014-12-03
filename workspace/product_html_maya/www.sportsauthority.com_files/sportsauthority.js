
if ((location.href.indexOf("/cart/") != -1 || location.href.indexOf("/checkout/") != -1) && location.href.indexOf("process=thanks") == -1) {
	usi_delayedLoad = function() {
        var USIqs = USIqs = "220244250211314314307326336300306341295306278280276279311314";
        var USIsiteID = "5839";
        var USI_key = "";
        
        if (USIqs != "") {
            var USI_headID = document.getElementsByTagName("head")[0];
            var USI_dynScript = document.createElement("script");
            USI_dynScript.setAttribute("type","text/javascript");
            USI_dynScript.setAttribute("src","//www.upsellit.com/upsellitJS4.jsp?qs="+USIqs+"&siteID="+USIsiteID+"&keys="+USI_key);
            USI_headID.appendChild(USI_dynScript);
        }
	}
	setTimeout("usi_delayedLoad()", 2000);
}
