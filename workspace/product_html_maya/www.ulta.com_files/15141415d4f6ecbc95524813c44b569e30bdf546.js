jQuery(document).ajaxComplete(function(a,b,c) { addAjaxEvent("document", a, b, c); });

function addAjaxEvent(scope, ajaxEvent, ajaxRequest, ajaxOptions) {
    var _url = ajaxOptions.url;
	var _data = ajaxOptions.data || "";
	var _responseText = "{}";
        try { _responseText = ajaxRequest.responseText } catch(e) {};
	var _responseObject = "{}";
        try { _responseObject = JSON.parse(_responseText) } catch(e) {};
	
	//console.info("=== AJAX EVENT ===");
//	console.info("   SCOPE => " + scope);
//	console.info("   URL => " + _url);
//	console.info("   DATA => " + _data);
//	console.info("   RESPONSE => " + _responseText);
//	console.dir(_responseObject);
    
    // Check for specific cases now
    
    if (_url.indexOf("productQuickViewInventoryCheck.jsp")>0) {
        //console.log("InventoryCheck");
        var _skuID = _data.skuId || _url.split("skuId=")[1].split("&")[0];
        if (_responseText == "false") {
            //console.log("\tFAIL");
            //jQuery(document).trigger("InventoryCheck_Fail", _skuID, "Quick-view Add-to-Basket Failed");
             jQuery(document).trigger("InventoryCheck_Fail", [_skuID, "Quick-view Add-to-Basket Failed"]);
        }
        else if (_responseText == "true") {
            //console.log("\tSUCCESS");
            //jQuery(document).trigger("InventoryCheck_Success", _skuID, "Quick-view Add-to-Basket Success");
             jQuery(document).trigger("InventoryCheck_Success", [_skuID]);
        }
    }
}
