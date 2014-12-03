<!--   AFFILIATE COOKIE START --> 
var pj_cookie_name = 'PepperJam_Referral';
var pj_cookieage = 10368000;
var generalDelimiter = '|';
var sourceParamName = 'source';
var affIdParamName = 'affiliateId';
var clickIdParamName = 'clickId';
var affCustomIdParamName = 'affiliateCustomId';

function getUnixTimeInEpoch() {
	var ts = Math.round((new Date()).getTime() / 1000);
	return ts;
}


function createUpdateAffiliateCookie() {
	var source = getQuerystringValue(window.location.href, sourceParamName);
    if (source != null && source != "" && source != undefined && source.startsWith("PJ_AD")) {
    
		var affId = getQuerystringValue(window.location.href, affIdParamName);
		var clickId = getQuerystringValue(window.location.href, clickIdParamName);
		var affCustomId = getQuerystringValue(window.location.href, affCustomIdParamName);
		var dateTimeStr = $.formatDateTime('mmddyy:hhiissa', new Date());
				
		// Encode only source and datetime
		source = encodeURIComponent(source);
		dateTimeStr = encodeURIComponent(dateTimeStr);
	
	    var pjCookieValue = '';	
		pjCookieValue = pjCookieValue + source + generalDelimiter;
		pjCookieValue = pjCookieValue + affId + generalDelimiter;
		pjCookieValue = pjCookieValue + affCustomId + generalDelimiter;
		pjCookieValue = pjCookieValue + clickId + generalDelimiter;
		pjCookieValue= pjCookieValue + dateTimeStr;
		
		var urlDomain = "";
		createCookie(pj_cookie_name, pjCookieValue, urlDomain, pj_cookieage, '/');
	}
}
<!--   AFFILIATE COOKIE END -->

<!-- TRUEEFFECT COOKIE START -->
function createUpdateTrueEffectCookie() {
	var trueEffectGeneralDelimter = '&';
	var teCookieValue = '';
	var te_cookieage=851472000;
	
	
	var teCookieName = 'ub_Bebe';
	var teVisitCookieName = 'te_visit';
	var te_cookie = getCookie(teCookieName);
	var teUrlDomain = '';	
	var timeInSecondsStr = getUnixTimeInEpoch();
	var equalOperatorEncoded = '%3D';


	var fvdParamName='fvd';
	var lvdParamName='lvd';
	var novParamName='nov';
	var rvpidParamName='rvpid';
	var rvcidParamName='rvcid';
	var cpidParamName='cpid';
	var camtParamName='camt';
	var cdtParamName='cdt';
	var lordpidsParamName='lordpids';
	var lorddateParamName='lordate';
	var ordAmtParamName='ordamt';
	var zipParamName='zp';

	if (te_cookie == null) {
  
	
  
	  	teCookieValue = fvdParamName + equalOperatorEncoded + timeInSecondsStr + trueEffectGeneralDelimter ;
		//Last Visit Date -
		teCookieValue = teCookieValue + lvdParamName + equalOperatorEncoded + timeInSecondsStr + trueEffectGeneralDelimter ;
		//Number of Visits
		teCookieValue = teCookieValue + novParamName + equalOperatorEncoded + '1' + trueEffectGeneralDelimter ;
		//Recently Viewed Products - Product Page
		teCookieValue = teCookieValue + rvpidParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		//Recently Viewed Categories - Parent Category Page
		teCookieValue = teCookieValue + rvcidParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		//Cart Product IDs - Basket Page
		teCookieValue = teCookieValue + cpidParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		//Cart Amount Value - Basket Page
		teCookieValue = teCookieValue + camtParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		//Cart Update Date - Basket Page
		teCookieValue = teCookieValue + cdtParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		//Products in Last Order - Receipt Page
		teCookieValue = teCookieValue + lordpidsParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		//Last Order Date - Receipt Page
		teCookieValue = teCookieValue + lorddateParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		//Order Amount - Receipt Page
		teCookieValue = teCookieValue + ordAmtParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		//Customer Zip - ??
		teCookieValue = teCookieValue + zipParamName + equalOperatorEncoded + '0' + trueEffectGeneralDelimter ;
		
		createCookie(teCookieName, teCookieValue, teUrlDomain, te_cookieage, '/');
		
		//Create the Session Cookie so that we can track the no of visit	
		var teVisitCookieAge = -1;
		createCookie(teVisitCookieName, '',teUrlDomain, teVisitCookieAge,'/');
  

	} else {
	    //check if session cookie exists
	    var te_visitCookie = getCookie(teVisitCookieName);
	    if (te_visitCookie == null) {
	    	var teVisitCookieAge = -1;
			createCookie(teVisitCookieName, '',teUrlDomain, teVisitCookieAge,'/');
			
			//Get the current value for nov
	        //Get the current cookie value        
	        var paramsArray = te_cookie.split(trueEffectGeneralDelimter);
	        if (paramsArray != null && paramsArray.length > 1) {
	            var nov = 1;
	            var foundNovParam=false;
	            var foundLVDParam=false;
	            for (t = 0; t < paramsArray.length ; t++) {
	            	
	            	var paramEntry = paramsArray[t];
	            	var tmpParamEntry = decodeURIComponent(paramEntry);
	            	var paramValuesArray = tmpParamEntry.split('=');
	            	if (paramValuesArray != null && paramValuesArray.length > 0) {
	            	     if (paramValuesArray[0] == novParamName && foundNovParam == false) {
	            	     	nov = paramValuesArray[1];
							var newnov = parseInt(nov) + 1;
							paramValuesArray[1] = newnov;  
							foundNovParam=true;          	     	
	            	     }
	            	     
	            	     if (paramValuesArray[0] == lvdParamName && foundLVDParam == false) {
	            	          paramValuesArray[1] = timeInSecondsStr;
							  foundLVDParam=true;
	            	     }
	            	}
	            	
	            	if (foundNovParam == true || foundLVDParam == true) {
	            			tmpParamEntry = paramValuesArray.join("=");						
				    }
				    
				    paramsArray[t] = encodeURIComponent(tmpParamEntry);
	            	
	            }
	            
	            var newCookieVal = paramsArray.join(trueEffectGeneralDelimter);
	            
	            createCookie(teCookieName, newCookieVal, teUrlDomain, te_cookieage, "/");
	        }
	    } 
	}
}
<!-- TRUEEFFECT COOKIE END -->

function createCookie(name, value, domain, secs, path) {
    var date, expires;
    if (typeof(secs) == 'undefined' || secs <= 0) {
        expires = "";
    } else {
        date = new Date();
        date.setTime(date.getTime() + (secs * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=" + (path || "/") + (domain ? "; domain=" + domain : "");
}

