
// Client Specific Information *****************************************
	var wm_DSMM_client = "LoveCulture";
	var wm_DSMM_is1PCCookieEnabled = false;
	var wm_DSMM_is3PCCookieEnabled = false;
	var wm_DSMM_isTrackingEnabled = false; 
	var wm_DSMM_isPPCTrackingEnabled = false;
	var wm_DSMM_isSEOTrackingEnabled = false; 
	var wm_DSMM_TrackAllConversions = false; 
	var wm_DSMM_CookieTypeUsed = "3";
	var wm_DSMM_DSMMTracker_Path = "//tracking.dsmmadvantage.com/DBScripts/";
	var wm_DSMM_1PCCookie = "1";
	var wm_DSMM_3PCCookie = "3";
	var wm_DSMM_SEM_PPC = "1";
	var wm_DSMM_SEM_SEO = "2";
	var wm_DSMM_Click = "1";
	var wm_DSMM_Conversion = "2";
	var wm_DSMM_1PCCookieExpirationPeriod = 90;
	var wm_DSMM_3PCCookieExpirationPeriod = 90;
// Client Specific Information *****************************************


// Utlities ************************************************************

function IncludeJavaScript(jsFile)
{
  document.write('<script type="text/javascript" src="'
    + jsFile + '"></script>'); 
}

IncludeJavaScript('//tracking.dsmmadvantage.com/Includes/Webmetro_DSMMTracker_Functions.js');
IncludeJavaScript('//tracking.dsmmadvantage.com/Includes/Webmetro_DSMMTracker_Code.js');