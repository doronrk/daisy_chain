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
if (( window.window.adb_prop2.indexOf(">") > -1 ) && ( window.adb_events.indexOf("prodView") == -1 )) {
var cachebust = (Math.random() + "").substr(2);
strRFConversion = (("https:" == document.location.protocol) ? "https://" : "http://");
strRFConversion += '//20590087p.rfihub.com/ca.gif?rb=839&ca=20590087&ra=';
strRFConversion += cachebust;
strRFConversion += '&t=cat&pid=' + window.adb_rocketfuel_products_five;
addScript(strRFConversion);
}

  

});