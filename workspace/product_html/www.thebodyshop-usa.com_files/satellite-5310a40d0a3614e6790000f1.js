_satellite.pushAsyncScript(function(event, target, $variables){
  if (window.adb_page_url.indexOf("cyEmail=") > 0) {
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

function cyQueryStr(queryName) {
	var queryString = window.location.search.substring(1);
	var queryStringSplit = queryString.split("&");
	for (i=0;i<queryStringSplit.length;i++) {
		queryResult = queryStringSplit[i].split("=");
		if (queryResult[0] == queryName) {
			return queryResult[1];
		}
	}
}

var strTPSeeWhyCode = (("https:" == document.location.protocol) ? "https://" : "http://");
	strTPSeeWhyCode += 'd2uevgmgh16uk4.cloudfront.net/webEvent/cywevent.js?';
	strTPSeeWhyCode += 'servicecode=' + window.adb_seeWhy_id;
	strTPSeeWhyCode += '&options=slider';

addScript(strTPSeeWhyCode,function () {
		cy.control.cookieinfo.domain = window.adb_Domain;   
		cy.control.defaults.Custom1="Guest";
		cy.control.defaults.UserId=unescape(cyQueryStr('cyEmail'));
		cy.control.defaults.FunnelLevel="0";
		cy_getImageSrc();
    return true;
});
}
});
