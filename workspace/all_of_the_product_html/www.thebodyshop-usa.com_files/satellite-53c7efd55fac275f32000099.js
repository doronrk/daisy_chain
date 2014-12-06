_satellite.pushAsyncScript(function(event, target, $variables){
  var fbq_enabled = (typeof window._fbq !== 'undefined');
var _fbq;
if(fbq_enabled){
  _fbq = window._fbq;
}else{
  _fbq = [];
  window._fbq = _fbq;
}

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
if (!fbq_enabled) {
  var nanigan_src_src = '//connect.facebook.net/en_US/fbds.js';
  fbq_enabled = true; }
  addScript(nanigan_src_src ,function () {
  _fbq.push(['addPixelId', '897697013590329']);
  }); 
window._fbq = window._fbq || [];
window._fbq.push(['track', 'PixelInitialized', {}]);

function addImageDiv(sScriptSrc) {
     var oHead = document.getElementsByTagName('head')[0];
     var imageDiv = document.createElement("div");
     imageDiv.setAttribute("style", "display:inline");
     imageDiv.setAttribute("id", "nanigan_div");
     oHead.appendChild(imageDiv);
     var image = document.createElement("img");
     image.setAttribute("id", "nanigan_img");
     image.setAttribute("height", "1");
     image.setAttribute("width", "1");
     image.setAttribute("alt", "");
     image.setAttribute("src", strTnaniganConversion);
     document.getElementById("nanigan_div").appendChild(image);     
}
strTnaniganConversion = (("https:" == document.location.protocol) ? "https://" : "http://");
strTnaniganConversion += '//www.facebook.com';
strTnaniganConversion += '/tr?id=897697013590329';
strTnaniganConversion += '&ev=NoScript';
addImageDiv(strTnaniganConversion);

});
