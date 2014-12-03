/**
 * @author misenberg
 */

<!-- Include ONCE for ALL buttons in the page -->

(function() {
    window.PinIt = window.PinIt || { loaded:false };
    if (window.PinIt.loaded) return;
    window.PinIt.loaded = true;
    function async_load(){
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        if (window.location.protocol == "https:")
            s.src = "https://assets.pinterest.com/js/pinit.js";
        else
            s.src = "http://assets.pinterest.com/js/pinit.js";
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
    }
    if (window.attachEvent)
        window.attachEvent("onload", async_load);
    else
        window.addEventListener("load", async_load, false);
})();


//function openPinterest(linkToProduct,productName,productUrl,productImage){
/*function openPinterest(productName,productImage){
	var linkToProduct = window.location.href;
	var productImageURL = "http://s7d2.scene7.com/is/image/Coach/"+productImage;
	window.open("http://pinterest.com/pin/create/button/?url=" + linkToProduct + "&description=" + encodeURIComponent(productName) + "&media=" + productImageURL, '_blank');
	pdp.functions.omnitureTracker("pdpPinterest");
}*/
