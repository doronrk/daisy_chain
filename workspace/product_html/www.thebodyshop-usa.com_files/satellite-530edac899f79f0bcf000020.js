_satellite.pushAsyncScript(function(event, target, $variables){
  // Google Re-marketing Buyer Tag (Product & Search Page)
/* <![CDATA[ */
var google_tag_params = {
    prodid: '',
    pagetype: 'product'
};
var google_conversion_id = window.adb_google_ads_custom_conversion_id;
var google_conversion_label = "UHsCCMSCjgMQhMTK5QM";
var google_remarketing_only = true;
/* ]]> */

var req_data_google_b = [];
for (var x in google_tag_params) {
	if (google_tag_params[x]) {
		req_data_google_b.push([x,'=',encodeURIComponent(google_tag_params[x])].join(''));
	}
}
function addScript(sScriptSrc, oCallback) {
	var oHead = document.getElementsByTagName('head')[0];
	var oScript = document.createElement('script');
	oScript.type = 'text/javascript';
	oScript.async = true;
	oScript.src = sScriptSrc;
	oHead.appendChild(oScript);
}

var strTPGoogleRmktCodeB = (("https:" == document.location.protocol) ? "https://www." : "http://www.");
strTPGoogleRmktCodeB += 'googleadservices.com/pagead/conversion.js';
addScript(strTPGoogleRmktCodeB);

strTPGoogleRmktCodeB = (("https:" == document.location.protocol) ? "https://www." : "http://www.");
strTPGoogleRmktCodeB += 'googleadservices.com/pagead/conversion/' + google_conversion_id;
strTPGoogleRmktCodeB += '/?label=' + google_conversion_label;
strTPGoogleRmktCodeB += '&' + req_data_google_b.join('&');
strTPGoogleRmktCodeB += '&format=3';
strTPGoogleRmktCodeB += '&value=0';
strTPGoogleRmktCodeB += '&language=en';
strTPGoogleRmktCodeB += '&color=ffffff';
addScript(strTPGoogleRmktCodeB);

//Google Ads Double Click Tag
function addImageDiv(sScriptSrc) {
     var oHead = document.getElementsByTagName('head')[0];
     var imageDiv = document.createElement("div");
     imageDiv.setAttribute("style", "display:inline");
     imageDiv.setAttribute("id", "google_div");
     oHead.appendChild(imageDiv);
     var image = document.createElement("img");
     image.setAttribute("id", "google_img");
     image.setAttribute("height", "1");
     image.setAttribute("width", "1");
     image.setAttribute("style", "border-style:none");
     image.setAttribute("src", strTPGoogleRmktConversion);
     document.getElementById("google_div").appendChild(image);     
}
var strTPGoogleRmktConversion = (("https:" == document.location.protocol) ? "https://www." : "http://www.");
strTPGoogleRmktConversion += "googleads.g.doubleclick.net/pagead/viewthroughconversion/" + google_conversion_id;
strTPGoogleRmktConversion += "/?label=" + google_conversion_label + "&value=0&guid=ON&script=0";
addImageDiv(strTPGoogleRmktConversion);
});
