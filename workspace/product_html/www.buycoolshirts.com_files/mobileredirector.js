
function setCookie ( name, value, exp_s, domain, path, secure ) {
	var cookie_string = name + "=\"" +  value.replace(/"/g,"\\\"")  + "\"";
	exp_s = exp_s || 1800;
	if ( exp_s ) {
		var expires = new Date ();
		expires.setTime(expires.getTime() + (exp_s * 1000));
		cookie_string += "; expires=" + expires.toGMTString();
	}
	if ( path )
		cookie_string += "; path=" + escape ( path );
	if ( domain )
		cookie_string += "; domain=" + escape ( domain );
	if ( secure )
		cookie_string += "; secure";
	document.cookie = cookie_string;
}




function getCookie(c_name)
{
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}



var mobileIndicators = [
	"Droid", /* must be first */

	"802SH",
	"Alcatel-",
	"amoi",
	"Android",
	"AnexTek",
	"AU-MIC",
	"AUDIOVOX-",
	"AvantGo",
	"BlackBerry",
	"Blazer",
	"CDM-",
	"Dopod-",
	"Ericsson",
	"hiptop",
	"Hitachi-",
	"HPiPAQ-",
	"HTC-",
	"IEMobile",
	"iPhone",
	"iPod",
	"KDDI",
	"LG",
	"MM-",
	"MO01",
	"MOT-",
	"Motorola",
	"N515i",
	"N525i",
	"NEC-",
	"Nokia",
	"NOKIA",
	"OpenWeb",
	"Opera mini",
	"Operamini",
	"OPWV",
	"Palm",
	"Panasonic",
	"Pantec",
	"PG-",
	"PLS",
	"PM-",
	"PN-",
	"portalmmm",
	"QCI-",
	"RL-",
	"SAGEM",
	"Samsung",
	"SCH",
	"SCP-",
	"SEC-",
	"Sendo",
	"SGH-",
	"SHARP-",
	"SIE-",
	"Smartphone",
	"SonyEricsson",
	"SPH",
	"SPV",
	"UP.Browser",
	"UP.Link",
	"V60t",
	"VI600",
	"VK530",
	"VM4050",
	"Vodafone",
	"WindowsCE",
	"ZTE"
 ];

var mobileExclusions = [
	"A100 ",
	"Dell Streak 7",
	"GT-N8000",
	"GT-N8005",
	"GT-N8010",
	"GT-N8013",
	"GT-P1000", 
	"GT-P5100",
	"GT-P5113",
	"GT-P7100",
	"GT-P7500",
	"GT-P7510",
	"GT-P7511",
	"iPad",
	"LogicPD Zoom2",
	"MID7015",
	"Nexus 10",
	"SCH-I800",
	"SCH-I905",
	"SGH-I957",
	"SGH-T859",
	"SHW-M180L",
	"SHW-M180S",
	"SHW-M180W",
	"SHW-M380S",
	"Tablet PC 2.0",
	"tablet",
	"TF101",
	"ViewPad7",
	"Xoom"
];

var additionalExclusions = additionalExclusions || [];
if(additionalExclusions.length > 0){
	for(var i = 0; i < additionalExclusions.length; i++){
		mobileExclusions.push(additionalExclusions[i]);
	}
}

function mobileQueryString(ji) {
	hu = window.location.search.substring(1);
	gy = hu.split("&");
	for (i = 0; i < gy.length; i++) {
		ft = gy[i].split("=");
		if (ft[0] == ji) {
			return ft[1];
		}
	}
	return (false);
}

var fromMobileCookie = getCookie("fromMobileSite");
if (fromMobileCookie.indexOf('true') == -1) {

	var fromMobile = mobileQueryString("fromMobileSite");
	if ((fromMobile == 'false') || (fromMobile == '')) {

		var isMobile = false;
		var agent = navigator.userAgent.toLowerCase();
		for (var i = 0; i < mobileIndicators.length; i++){ 
			var indicator = mobileIndicators[i].toLowerCase();
			if (agent.indexOf(indicator) > -1) {

				if (indicator.indexOf("droid") > -1 && agent.indexOf("mobile") == -1){
					isMobile = false;
				}else{
					isMobile = true;
					break;
				}

			}
		}
		for (var i = 0; i < mobileExclusions.length; i++){ 
			var exclusion = mobileExclusions[i].toLowerCase();
			if (agent.indexOf(exclusion) > -1) {
				isMobile = false;
				break;
			}
		}
		if (isMobile) {
			if (location.host.indexOf(website) != -1) {
				var domainParts = location.hostname.split("."), domain;
				if(domainParts.length >= 2){
					domain = "." + domainParts[domainParts.length-2] + "." + domainParts[domainParts.length-1];
				}
				setCookie("uc_refoverride", document.referrer + "|" + domain, 60, domain, "/");
				var host = "http://" + mobilesite + location.pathname + location.search;
				location.replace(host);
			}
		}
	
	} else {
		setCookie('fromMobileSite', 'true', null, null, '/');
	}

}
