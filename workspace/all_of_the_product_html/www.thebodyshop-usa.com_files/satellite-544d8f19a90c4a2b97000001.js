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

var strConvertoCode = (("https:" == document.location.protocol) ? "https://" : "http://");
strConvertoCode += 'd1ivexoxmp59q7.cloudfront.net/thebodyshop/live.js';
addScript(strConvertoCode ,function () {
//<![CDATA[

$CVO = window.$CVO || [];

    if (window.adb_cust_role == "Created Account" || window.adb_cust_role == "Guest Account") {  
						cust_type = "sale-new";
					} else if (window.adb_cust_role == "Existing Account") {
						cust_type = "sale-repeat";
					}

  	if (strLocationURL.indexOf("/account/signin.aspx") > 0) {
                    $CVO = window.$CVO || [];
                    $CVO.push([ 'trackEvent', {
                    type: 'log-in',
                    id: null,
                    amount: '1'
                    }]);
    } 
  
    	if (strLocationURL.indexOf("/account/members/index.aspx") > 0) {
            
                     $CVO.push([ 'trackEvent', {
                     type: 'register',
                     id: null,
                     amount: '1'
                     }]);
        
            $CVO = window.$CVO || [];
            $CVO.push([ 'trackUser', {
            id: window.adb_cust_email_id
            }]);
    } 
  

  	if (strLocationURL.indexOf("/account/register.aspx") > 0) {
                     $CVO.push([ 'trackEvent', {
                     type: 'register',
                     id: null,
                     amount: '1'
                     }]);
      
      $CVO = window.$CVO || [];
            $CVO.push([ 'trackUser', {
            id: window.adb_cust_email_id
            }]);
    } 
  
    	if (strLocationURL.indexOf("/checkout/mybasket.aspx") > 0) {
                   $CVO = window.$CVO || [];
                   $CVO.push([ 'trackEvent', {
                   type: 'add-to-cart',
                   id: null,
                   amount: '1'
//This tag is essentially a COUNT. Where id/amount are hard-coded.

                   }]);
	   
	   
    }  
  
  
   	if (strLocationURL.indexOf("/checkout/orderreceipt.aspx") > 0) {
        var convertoAmount = (window.adb_order_total - window.adb_order_tax_total - window.adb_basket_shipping_total + parseFloat(window.adb_basket_discount_total)).toFixed(2);
             $CVO = window.$CVO || [];
             $CVO.push([ 'trackEvent', {
             type: cust_type,
             id: window.adb_order_id,
             amount: convertoAmount
             }]);
      
            $CVO = window.$CVO || [];
            $CVO.push([ 'trackUser', {
            id: window.adb_cust_email_id
            }]);
                       
    }
  

//]]>
}); 
});
