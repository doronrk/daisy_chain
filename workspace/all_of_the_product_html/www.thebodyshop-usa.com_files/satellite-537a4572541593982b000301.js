_satellite.pushAsyncScript(function(event, target, $variables){
  function addScript(sScriptSrc, oCallback) {
     var oHead = document.getElementsByTagName('head')[0];
     var oScript = document.createElement('script');
     oScript.type = 'text/javascript';
	 oScript.async = true;
     oScript.src = sScriptSrc;
     oScript.onload = oCallback; // most browsers
     oScript.onreadystatechange = function() { // IE 6 & 7
          if (this.readyState == 'complete') {
               oCallback();
          }
     }
     oHead.appendChild(oScript);
}
var strTPCriteoCode = (("https:" == document.location.protocol) ? "https://" : "http://");
strTPCriteoCode += 'static.criteo.net/js/ld/ld.js';
addScript(strTPCriteoCode,function () {
window.criteo_q = window.criteo_q || [];
  var criteoDeviceType;
  if (window.adb_device_type == "desktop") {
       criteoDeviceType="d";
    } else {
        criteoDeviceType="m";
    }
window.criteo_q.push(
{ event: "setAccount", account: window.adb_criteo_mid },
{ event: "setCustomerId", id: window.adb_cust_email_id },
{ event: "setSiteType", type: criteoDeviceType },
{ event: "viewItem", item: window.adb_product_variant_code }

);
});


});
