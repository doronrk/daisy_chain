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
var adb_merchant_ID = "TheBodyShop";
var strTPMercerntCode = (("https:" == document.location.protocol) ? "https://" : "http://");
strTPMercerntCode += 'cdn.mercent.com/js/tracker.js';
addScript(strTPMercerntCode ,function () {
//<![CDATA[

    mr_merchantID = "TheBodyShop";
    mr_cookieDomain = window.adb_Domain;
    mr_Track();
    
  	if (strLocationURL.indexOf("/checkout/mybasket.aspx") > 0) {
      mr_conv["type"] = "shopper";
			mr_conv["customerId"] = window.adb_cust_email_id;
			mr_sendConversion();
    }  
  

  	if (strLocationURL.indexOf("/account/register.aspx") > 0) {
                        mr_conv["type"] = "lead";
                        mr_conv["customerId"] = window.adb_cust_email_id;
                        mr_sendConversion();
    } 
  
   	if (strLocationURL.indexOf("/checkout/orderreceipt.aspx") > 0) {

         var mercentAmount = (window.adb_order_total - window.adb_order_tax_total - window.adb_basket_shipping_total + parseFloat(window.adb_basket_discount_total)).toFixed(2);

                        mr_conv["type"] = "order";
                        mr_conv["id"] = window.adb_order_id;
                        mr_conv["customerId"] = window.adb_cust_email_id;
                        mr_conv["amount"] = mercentAmount;
                        mr_conv["shipping"] = window.adb_basket_shipping_total;
                        mr_conv["tax"] = window.adb_order_tax_total;
                        mr_conv["discount"] = window.adb_basket_discount_total;
                        mr_conv["postalCode"] = window.adb_order_zipcode;
                        mr_conv["countryCode"] = "US";
      
                       
       for (var i = 0; i < window.adb_arProductSKUs.length; ++i) {
                        mr_convOrderItem["sku"] = window.adb_arProductSKUs[i];
                        mr_convOrderItem["title"] = window.adb_arProductNames[i];
                        mr_convOrderItem["url"] = window.adb_arProductUrl[i];
                        mr_convOrderItem["qty"] = window.adb_arProductQty[i];
                        mr_convOrderItem["extPrice"] = window.adb_arProductNewPrice[i];
                        mr_addConvOrderItem(mr_convOrderItem);   

                                                            }
       
       mr_sendConversion();
                       
    }
  

//]]>
}); 
});
