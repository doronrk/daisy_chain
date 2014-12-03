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
var cyCustName = "";
var strTPSeeWhyCust = (("https:" == document.location.protocol) ? "https://" : "http://");
strTPSeeWhyCust += 'd2uevgmgh16uk4.cloudfront.net/webEvent/cywevent.js?';
strTPSeeWhyCust += 'servicecode=' + window.adb_seeWhy_id;
addScript(strTPSeeWhyCust,function () {	
	cy.control.cookieinfo.domain = window.adb_Domain;
    if (window.adb_page_url.indexOf("one-page-checkout.aspx") > 0) {
        cyCustName = document.getElementById('ctl00_ctl00_brandlayout0_ctl00_mainbody0_ctl00_ctl01_ctl02_ctl01_fname');
      	
    } else if (window.adb_page_url.indexOf("payment.aspx") > 0) {
        cyCustName = document.getElementById('ctl00_ctl00_brandlayout0_ctl00_mainbody0_ctl00_ctl00_ctl00_ctl00_ctl02_ctl00_shippingEdit_shippingEdit_ctl00_fname');
    } 
    cy.FunnelLevel = "4";
	if (adb_cust_is_loyalty_profile) {
		cy.Custom2="yes";
		cy.Custom3=adb_cust_LYB_number;
		cy.Custom4=adb_cust_LYB_expiry_date;
		cy.Custom11=adb_cust_LYB_points;
	}
	cy.Custom5="";
	cy.Custom6=adb_basket_last_added_product_category;	
	cy.Value=adb_basket_total;
	cy.ReturnToLink=location.href;
	cy.UserId=adb_cust_email_actual_id;	
  if (cyCustName != null) {
   cyCustName.onchange = function() {
        cy.Custom1 = cyCustName.value;
        cy_getImageSrc();
        return true;
    	}
  }
});
});
