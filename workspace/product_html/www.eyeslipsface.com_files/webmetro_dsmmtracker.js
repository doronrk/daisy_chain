
// Client Specific Information *****************************************
	var wm_DSMM_client = "Elf";
	var wm_DSMM_is1PCCookieEnabled = false;
	var wm_DSMM_is3PCCookieEnabled = true;
	var wm_DSMM_isTrackingEnabled = true; 
	var wm_DSMM_isPPCTrackingEnabled = false;
	var wm_DSMM_isSEOTrackingEnabled = true; 
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




// Utlities ************************************************************


function wm_DSMM_setCookie(name, value, expires, path, domain, secure)
{
    var exdate = new Date();

    path = "/";
    	
	if (expires == null)
	{
		exdate.setTime(exdate.getTime()+(90*24*3600*1000));
	}
	else
	{
		exdate.setTime(exdate.getTime()+(expires*24*3600*1000))
	}
    document.cookie= name + "=" + escape(value) +
        "; expires=" + exdate +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function wm_DSMM_getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function wm_DSMM_deleteCookie(name, path, domain)
{
    if (wm_DSMM_getCookie(name))
    {
        document.cookie = name + "=" + 
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function wm_DSMM_GetTimeInMillisec()
{
    var wm_DSMM_Now = new Date();
    var wm_DSMM_TimeStamp = wm_DSMM_Now.getTime();
	return wm_DSMM_TimeStamp;
}

function wm_DSMM_Querystring(wm_DSMM_qs_local) { // optionally pass a querystring to parse
	this.wm_DSMM_params = new Object()
	this.get=wm_DSMM_Querystring_get

	if (wm_DSMM_qs_local == null)
		wm_DSMM_qs_local=location.search.substring(1,location.search.length)

	if (wm_DSMM_qs_local.length == 0) return

// Turn <plus> back to <space>
// See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
	wm_DSMM_qs_local = wm_DSMM_qs_local.replace(/\+/i, ' ')
	var wm_DSMM_args = wm_DSMM_qs_local.split('&') // parse out name/value pairs separated via &

// split out each name=value pair
	for (var wm_DSMM_i=0;wm_DSMM_i<wm_DSMM_args.length;wm_DSMM_i++) {
		var wm_DSMM_value;
		var wm_DSMM_pair = wm_DSMM_args[wm_DSMM_i].split('=')
		var wm_DSMM_name = unescape(wm_DSMM_pair[0])
		if (wm_DSMM_pair.length == 2)
			wm_DSMM_value = unescape(wm_DSMM_pair[1])
		else
			wm_DSMM_value = wm_DSMM_name
		
		this.wm_DSMM_params[wm_DSMM_name] = wm_DSMM_value
	}
}

function wm_DSMM_Querystring_get(wm_DSMM_key, wm_DSMM_default_) {
	// This silly looking line changes UNDEFINED to NULL
	if (wm_DSMM_default_ == null) wm_DSMM_default_ = null;
	
	var wm_DSMM_value=this.wm_DSMM_params[wm_DSMM_key]
	if (wm_DSMM_value==null) wm_DSMM_value=wm_DSMM_default_;
	
	return wm_DSMM_value
}

function wm_DSMM_getReferrerDomain(wm_DSMM_strUrl) {
	if (wm_DSMM_strUrl == "")
	{
		return "";
	}
	var wm_DSMM_domain = wm_DSMM_strUrl.match( /:\/\/(www\.)?([^\/:]+)/ ); 
	
	if ((wm_DSMM_domain == null) || (wm_DSMM_domain == ""))
	{
		return "";
	}
	
	if ((wm_DSMM_domain[2] == null) || (wm_DSMM_domain[2] == ""))
	{
		return "";
	}
	
	return wm_DSMM_domain[2];
}

function wm_DSMM_getReferrerDomain_NotUsed(wm_DSMM_strUrl) {
	if (wm_DSMM_strUrl.indexOf("?") > -1)
	{
		wm_DSMM_strUrl = wm_DSMM_strUrl.substring(0,wm_DSMM_strUrl.indexOf("?"));	
	}
    var wm_DSMM_e=/^((http|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+\.[^#?\s]+)(#[\w\-]+)?$/;
    if (wm_DSMM_strUrl.match(wm_DSMM_e)) 
    {
		return RegExp.$3;
    }
	else
	{
		return "";
	}
}

function wm_DSMM_TrackConversion(wm_DSMM_OrderID, wm_DSMM_Revenue, wm_DSMM_ConversionType)
{
    var wm_ConversionURL = window.location.href;
    var wm_ConversionReferrerURL = document.referrer;
    var wm_DSMM_src_Conversion = wm_DSMM_DSMMTracker_Path + "conversion_hash.asp?wm_DSMM_client=" + wm_DSMM_client + "&wm_DSMM_ckid=" + wm_DSMM_getCookie("wm_" + wm_DSMM_client) + "&wm_DSMM_ctid_PPC=" + wm_DSMM_getCookie("wm_DSMM_ctid_PPC") + "&wm_DSMM_kwid_PPC=" + wm_DSMM_getCookie("wm_DSMM_kwid_PPC") + "&wm_DSMM_referrer_PPC=" + escape(wm_DSMM_getCookie("wm_DSMM_referrer_PPC")) + "&wm_DSMM_referrerDomain_PPC=" + wm_DSMM_getCookie("wm_DSMM_referrerDomain_PPC") + "&wm_DSMM_lpid_PPC=" + wm_DSMM_getCookie("wm_DSMM_lpid_PPC") + "&wm_DSMM_crid_PPC=" + wm_DSMM_getCookie("wm_DSMM_crid_PPC") + "&wm_DSMM_venue_crid_PPC=" + wm_DSMM_getCookie("wm_DSMM_venue_crid_PPC") + "&wm_DSMM_venue_id_PPC=" + wm_DSMM_getCookie("wm_DSMM_venue_id_PPC") + "&wm_DSMM_defaultURL_PPC=" + escape(wm_DSMM_getCookie("wm_DSMM_defaultURL_PPC")) + "&wm_DSMM_serverredirect_PPC=" + wm_DSMM_getCookie("wm_DSMM_serverredirect_PPC") + "&wm_DSMM_mtid_PPC=" + wm_DSMM_getCookie("wm_DSMM_mtid_PPC") + "&wm_DSMM_landingPage_PPC=" + escape(wm_DSMM_getCookie("wm_DSMM_landingPage_PPC")) + "&wm_DSMM_landingPage_SEO=" + escape(wm_DSMM_getCookie("wm_DSMM_landingPage_SEO")) + "&wm_DSMM_referrer_SEO=" + escape(wm_DSMM_getCookie("wm_DSMM_referrer_SEO")) + "&wm_DSMM_referrerDomain_SEO=" + wm_DSMM_getCookie("wm_DSMM_referrerDomain_SEO") + "&wm_DSMM_orderID=" + wm_DSMM_OrderID + "&wm_DSMM_Revenue=" + wm_DSMM_Revenue + "&wm_DSMM_ConversionType=" + wm_DSMM_ConversionType + "&wm_DSMM_TrackAllConversions=" + wm_DSMM_TrackAllConversions + "&wm_DSMM_CookieTypeUsed=" + wm_DSMM_CookieTypeUsed + "&wm_DSMM_ConversionPage=" + wm_ConversionURL + "&wm_DSMM_ConversionReferrerPage=" + wm_ConversionReferrerURL + "&wm_DSMM_tag1_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag1_PPC") + +"&wm_DSMM_tag2_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag2_PPC") + "&wm_DSMM_tag3_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag3_PPC") + "&wm_DSMM_tag4_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag4_PPC") + "&wm_DSMM_tag5_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag5_PPC") + "&wm_DSMM_tag1_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag1_SEO") + +"&wm_DSMM_tag2_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag2_SEO") + "&wm_DSMM_tag3_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag3_SEO") + "&wm_DSMM_tag4_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag4_SEO") + "&wm_DSMM_tag5_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag5_SEO");

	if (location.search.indexOf("wm_debug=true") > -1)
	{		
		window.open(wm_DSMM_src_Conversion,'Conversion_DSMM','location=yes'); 
	}
	else
	{
     		//document.write('<img border=0 height=1 width=1 src="' + wm_DSMM_src_Conversion + '">');

		var wm_TrackingPixel_Conversion= new Image();
		wm_TrackingPixel_Conversion.src= wm_DSMM_src_Conversion;
	}

}

function wm_DSMM_AddConversion(wm_DSMM_OrderID, wm_DSMM_Revenue, wm_DSMM_ConversionType, wm_DSMM_ConversionAttributes) 
{
    if (wm_DSMM_ConversionAttributes == undefined) 
    {
        wm_DSMM_ConversionAttributes = "";
    }
    var wm_ConversionURL = window.location.href;
    var wm_ConversionReferrerURL = document.referrer;
    var wm_DSMM_src_Conversion = wm_DSMM_DSMMTracker_Path + "conversion_hash.asp?wm_DSMM_client=" + wm_DSMM_client + "&wm_DSMM_ckid=" + wm_DSMM_getCookie("wm_" + wm_DSMM_client) + "&wm_DSMM_ctid_PPC=" + wm_DSMM_getCookie("wm_DSMM_ctid_PPC") + "&wm_DSMM_kwid_PPC=" + wm_DSMM_getCookie("wm_DSMM_kwid_PPC") + "&wm_DSMM_referrer_PPC=" + escape(wm_DSMM_getCookie("wm_DSMM_referrer_PPC")) + "&wm_DSMM_referrerDomain_PPC=" + wm_DSMM_getCookie("wm_DSMM_referrerDomain_PPC") + "&wm_DSMM_lpid_PPC=" + wm_DSMM_getCookie("wm_DSMM_lpid_PPC") + "&wm_DSMM_crid_PPC=" + wm_DSMM_getCookie("wm_DSMM_crid_PPC") + "&wm_DSMM_venue_crid_PPC=" + wm_DSMM_getCookie("wm_DSMM_venue_crid_PPC") + "&wm_DSMM_venue_id_PPC=" + wm_DSMM_getCookie("wm_DSMM_venue_id_PPC") + "&wm_DSMM_defaultURL_PPC=" + escape(wm_DSMM_getCookie("wm_DSMM_defaultURL_PPC")) + "&wm_DSMM_serverredirect_PPC=" + wm_DSMM_getCookie("wm_DSMM_serverredirect_PPC") + "&wm_DSMM_mtid_PPC=" + wm_DSMM_getCookie("wm_DSMM_mtid_PPC") + "&wm_DSMM_landingPage_PPC=" + escape(wm_DSMM_getCookie("wm_DSMM_landingPage_PPC")) + "&wm_DSMM_landingPage_SEO=" + escape(wm_DSMM_getCookie("wm_DSMM_landingPage_SEO")) + "&wm_DSMM_referrer_SEO=" + escape(wm_DSMM_getCookie("wm_DSMM_referrer_SEO")) + "&wm_DSMM_referrerDomain_SEO=" + wm_DSMM_getCookie("wm_DSMM_referrerDomain_SEO") + "&wm_DSMM_orderID=" + wm_DSMM_OrderID + "&wm_DSMM_Revenue=" + wm_DSMM_Revenue + "&wm_DSMM_ConversionType=" + wm_DSMM_ConversionType + "&wm_DSMM_TrackAllConversions=" + wm_DSMM_TrackAllConversions + "&wm_DSMM_CookieTypeUsed=" + wm_DSMM_CookieTypeUsed + "&wm_DSMM_ConversionAttributes=" + wm_DSMM_ConversionAttributes + "&wm_DSMM_ConversionPage=" + wm_ConversionURL + "&wm_DSMM_ConversionReferrerPage=" + wm_ConversionReferrerURL + "&wm_DSMM_tag1_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag1_PPC") + +"&wm_DSMM_tag2_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag2_PPC") + "&wm_DSMM_tag3_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag3_PPC") + "&wm_DSMM_tag4_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag4_PPC") + "&wm_DSMM_tag5_PPC=" + wm_DSMM_getCookie("wm_DSMM_tag5_PPC") + "&wm_DSMM_tag1_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag1_SEO") + +"&wm_DSMM_tag2_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag2_SEO") + "&wm_DSMM_tag3_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag3_SEO") + "&wm_DSMM_tag4_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag4_SEO") + "&wm_DSMM_tag5_SEO=" + wm_DSMM_getCookie("wm_DSMM_tag5_SEO");

    if (location.search.indexOf("wm_debug=true") > -1) {
        window.open(wm_DSMM_src_Conversion, 'Conversion_DSMM', 'location=yes');
    }
    else {
        document.write('<img border=0 height=1 width=1 src="' + wm_DSMM_src_Conversion + '">');
        
    }

}

// Utlities ************************************************************


	var wm_NoInsertTimeDuration = 30;
	var dt = new Date("January 01, 1970 00:00:00");
	var wm_DSMM_lastClickTimeStamp = dt.getTime(); 
	var wm_DSMM_lastClickReferrer = "";
	var wm_DSMM_ClickReferrer = document.referrer;
	var wm_DSMM_ClickTimeStamp = wm_DSMM_GetTimeInMillisec();
	var wm_DSMM_NoTrack=false;


	if ((wm_DSMM_is1PCCookieEnabled) && (wm_DSMM_isTrackingEnabled))
	{
	

		if (document.referrer != null)
		{
					if (wm_DSMM_getCookie("wm_DSMM_TimeStamp_PPC") != null)
					{
						if (wm_DSMM_getCookie("wm_DSMM_TimeStamp_SEO") != null)
						{
							if ((wm_DSMM_getCookie("wm_DSMM_TimeStamp_PPC") - wm_DSMM_getCookie("wm_DSMM_TimeStamp_SEO"))>0)
							{
								wm_DSMM_lastClickTimeStamp = wm_DSMM_getCookie("wm_DSMM_TimeStamp_PPC");
								wm_DSMM_lastClickReferrer = wm_DSMM_getCookie("wm_DSMM_referrer_PPC");
							}
							else
							{
								wm_DSMM_lastClickTimeStamp = wm_DSMM_getCookie("wm_DSMM_TimeStamp_SEO");
								wm_DSMM_lastClickReferrer = wm_DSMM_getCookie("wm_DSMM_referrer_SEO");
								}
						}
						else
						{
								wm_DSMM_lastClickTimeStamp = wm_DSMM_getCookie("wm_DSMM_TimeStamp_PPC");
								wm_DSMM_lastClickReferrer = wm_DSMM_getCookie("wm_DSMM_referrer_PPC");
						}
					
					}
					else
					{
						if (wm_DSMM_getCookie("wm_DSMM_TimeStamp_SEO") != null)
						{
							   wm_DSMM_lastClickTimeStamp = wm_DSMM_getCookie("wm_DSMM_TimeStamp_SEO"); 
							   wm_DSMM_lastClickReferrer = wm_DSMM_getCookie("wm_DSMM_referrer_SEO");
						}
					}

				
				if (wm_DSMM_lastClickTimeStamp == null)
				{
					wm_DSMM_lastClickTimeStamp = 0;
				}

				if (wm_DSMM_lastClickReferrer == null)
				{
					wm_DSMM_lastClickReferrer = "";
				}
					
				if ((((wm_DSMM_ClickTimeStamp - wm_DSMM_lastClickTimeStamp)/1000) < wm_NoInsertTimeDuration) && (wm_DSMM_lastClickReferrer.replace(/\+/g, " ") == wm_DSMM_ClickReferrer.replace(/\+/g, " ")) )
				{
						wm_DSMM_NoTrack=true;

				}
		}
		


	}
	

	
if (!wm_DSMM_NoTrack)
{

    var wm_DSMM_ckid = wm_DSMM_GetTimeInMillisec();
	

// PPC Variables Initialization ******************
	var wm_DSMM_uri = location.search;
	var wm_DSMM_start = wm_DSMM_uri.indexOf("?");
	var wm_DSMM_param = wm_DSMM_uri.substring(wm_DSMM_start+1,wm_DSMM_uri.length);
	wm_DSMM_param = wm_DSMM_param.toLowerCase();
	var wm_DSMM_qs = new wm_DSMM_Querystring(wm_DSMM_param);
	var wm_DSMM_ctid = wm_DSMM_qs.get("wm_ctid");
	var wm_DSMM_kwid = wm_DSMM_qs.get("wm_kwid");
	var wm_DSMM_lpid = wm_DSMM_qs.get("wm_lpid");
	var wm_DSMM_crid = wm_DSMM_qs.get("wm_crid");

	var wm_DSMM_defaultURL = wm_DSMM_qs.get("wm_defaulturl");
    var wm_DSMM_serverredirect = wm_DSMM_qs.get("wm_sd");

    if (wm_DSMM_serverredirect != null)
    {
	    wm_DSMM_isPPCTrackingEnabled = false;
    }

	var wm_DSMM_mtid = wm_DSMM_qs.get("wm_mtid");
	var wm_DSMM_content = wm_DSMM_qs.get("wm_content");
	var wm_DSMM_landingPage_PPC = location;
	var wm_DSMM_referrer_PPC=document.referrer;
	var wm_DSMM_referrerDomain_PPC=wm_DSMM_getReferrerDomain(document.referrer);

	var wm_DSMM_venue_crid = '';
	var wm_DSMM_venue_id = '';

	var wm_DSMM_tag = wm_DSMM_qs.get("wm_tag");

	    if (wm_DSMM_tag != null) {
	        wm_DSMM_isPPCTrackingEnabled = true;
	        wm_DSMM_ctid = 366;

	        if (wm_DSMM_tag == 'ewaydirect') {
	            wm_DSMM_kwid = 31492523;
	            wm_DSMM_mtid = 32;
	        }

	        if (wm_DSMM_tag == 'cj') {
	            wm_DSMM_kwid = 31492517;
	            wm_DSMM_mtid = 128;
	        }
			
			if (wm_DSMM_tag == 'mediaforge') {
	            wm_DSMM_kwid = 31492519;
	            wm_DSMM_mtid = 167;
	        }
	    }

	if (wm_DSMM_qs.get("wm_g_crid") != null)
	{
		wm_DSMM_venue_crid = wm_DSMM_qs.get("wm_g_crid")
		wm_DSMM_venue_id=1
	}
	else
	{
		if (wm_DSMM_qs.get("wm_m_crid") != null)
		{
			wm_DSMM_venue_crid = wm_DSMM_qs.get("wm_m_crid")
			wm_DSMM_venue_id=14
		}
	 	else
		{
			if (wm_DSMM_qs.get("wm_y_crid") != null)
			{
				wm_DSMM_venue_crid = wm_DSMM_qs.get("wm_y_crid")
				wm_DSMM_venue_id=25
			}
		}
	}

	

// PPC Variables Initialization ******************


	if ((wm_DSMM_is1PCCookieEnabled) || (wm_DSMM_isTrackingEnabled))
	{
		if (wm_DSMM_getCookie("wm_" + wm_DSMM_client) == null)
		{
		    wm_DSMM_setCookie("wm_" + wm_DSMM_client, wm_DSMM_ckid, wm_DSMM_1PCCookieExpirationPeriod);
			
			if (wm_DSMM_getCookie("wm_" + wm_DSMM_client) == null)
			{
				wm_DSMM_ckid = null;
			}
		}
		else
		{
			wm_DSMM_ckid = wm_DSMM_getCookie("wm_" + wm_DSMM_client);
			
		}
	}



	if ((wm_DSMM_isPPCTrackingEnabled) && (wm_DSMM_isTrackingEnabled)) 
	{
		if (wm_DSMM_ctid > 0) 
		{
			
			if (wm_DSMM_content == 1)
			{
				wm_DSMM_mtid = 4;
			}
			
				//Added wm_tag varibles
	        var wm_DSMM_tag1_PPC = wm_DSMM_qs.get("wm_tag1");
	        var wm_DSMM_tag2_PPC = wm_DSMM_qs.get("wm_tag2");
	        var wm_DSMM_tag3_PPC = wm_DSMM_qs.get("wm_tag3");
	        var wm_DSMM_tag4_PPC = wm_DSMM_qs.get("wm_tag4");
	        var wm_DSMM_tag5_PPC = wm_DSMM_qs.get("wm_tag5");

	        var wm_DSMM_src_PPC = wm_DSMM_DSMMTracker_Path + "click_hash.asp?wm_DSMM_client=" + wm_DSMM_client + "&wm_DSMM_ckid=" + wm_DSMM_ckid + "&wm_DSMM_ctid_PPC=" + wm_DSMM_ctid + "&wm_DSMM_kwid_PPC=" + wm_DSMM_kwid + "&wm_DSMM_referrer_PPC=" + escape(wm_DSMM_referrer_PPC) + "&wm_DSMM_referrerDomain_PPC=" + wm_DSMM_referrerDomain_PPC + "&wm_DSMM_lpid_PPC=" + wm_DSMM_lpid + "&wm_DSMM_crid_PPC=" + wm_DSMM_crid + "&wm_DSMM_venue_crid_PPC=" + wm_DSMM_venue_crid + "&wm_DSMM_venue_id_PPC=" + wm_DSMM_venue_id + "&wm_DSMM_defaultURL_PPC=" + escape(wm_DSMM_defaultURL) + "&wm_DSMM_serverredirect_PPC=" + wm_DSMM_serverredirect + "&wm_DSMM_mtid_PPC=" + wm_DSMM_mtid + "&wm_DSMM_content_PPC=" + wm_DSMM_content + "&wm_DSMM_landingPage_PPC=" + escape(wm_DSMM_landingPage_PPC) + "&wm_DSMM_SEMType=" + wm_DSMM_SEM_PPC + "&wm_DSMM_CookieTypeUsed=" + wm_DSMM_CookieTypeUsed + "&wm_DSMM_CookieExpirationPeriod=" + wm_DSMM_3PCCookieExpirationPeriod + "&wm_DSMM_tag1_PPC=" + wm_DSMM_tag1_PPC + "&wm_DSMM_tag2_PPC=" + wm_DSMM_tag2_PPC + "&wm_DSMM_tag3_PPC=" + wm_DSMM_tag3_PPC + "&wm_DSMM_tag4_PPC=" + wm_DSMM_tag4_PPC + "&wm_DSMM_tag5_PPC=" + wm_DSMM_tag5_PPC;

			// 1st Party Cookie - PPC Tracking *************************************
	
			if (wm_DSMM_is1PCCookieEnabled)
			{
			    wm_DSMM_setCookie("wm_DSMM_ctid_PPC", wm_DSMM_ctid, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_kwid_PPC", wm_DSMM_kwid, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_crid_PPC", wm_DSMM_crid, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_venue_crid_PPC", wm_DSMM_venue_crid, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_venue_id_PPC", wm_DSMM_venue_id, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_defaultURL_PPC", wm_DSMM_defaultURL, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_serverredirect_PPC", wm_DSMM_serverredirect, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_lpid_PPC", wm_DSMM_lpid, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_mtid_PPC", wm_DSMM_mtid, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_referrer_PPC", wm_DSMM_referrer_PPC, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_referrerDomain_PPC", wm_DSMM_referrerDomain_PPC, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_landingPage_PPC", wm_DSMM_landingPage_PPC, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_cookieType_PPC", wm_DSMM_1PCCookie, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_TimeStamp_PPC", wm_DSMM_ClickTimeStamp, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_tag1_PPC", wm_DSMM_tag1, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_tag2_PPC", wm_DSMM_tag2, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_tag3_PPC", wm_DSMM_tag3, wm_DSMM_1PCCookieExpirationPeriod);
			    wm_DSMM_setCookie("wm_DSMM_tag4_PPC", wm_DSMM_tag4, wm_DSMM_1PCCookieExpirationPeriod);			    			    
			    wm_DSMM_setCookie("wm_DSMM_tag5_PPC", wm_DSMM_tag5, wm_DSMM_1PCCookieExpirationPeriod);			    

				//	wm_DSMM_setCookie("wm_DSMM_FirstClicked_PPC",wm_DSMM_FirstClicked_PPC);
				wm_DSMM_src_PPC = wm_DSMM_src_PPC + "&wm_DSMM_is1PCCookieEnabled="+wm_DSMM_is1PCCookieEnabled;
			}
		// 1st Party Cookie - PPC Tracking *************************************

		// 3rd Party Cookie - PPC Tracking *************************************
			if (wm_DSMM_is3PCCookieEnabled)
			{
				wm_DSMM_src_PPC = wm_DSMM_src_PPC + "&wm_DSMM_is3PCCookieEnabled="+wm_DSMM_is3PCCookieEnabled;
				
			}
		// 3rd Party Cookie - PPC Tracking *************************************
			if ((wm_DSMM_is1PCCookieEnabled) || (wm_DSMM_is3PCCookieEnabled))
			{
				if (location.search.indexOf("wm_debug=true") > -1)
				{		
					window.open(wm_DSMM_src_PPC,'PPC_DSMM','location=yes'); 
				}
				else
				{
					var wm_TrackingPixel_Click_PPC= new Image();
					wm_TrackingPixel_Click_PPC.src= wm_DSMM_src_PPC;
				}
			}			
		}
	}	
 

// SEO Variables Initialization ******************		
	var wm_DSMM_referrerDomain_SEO=wm_DSMM_getReferrerDomain(document.referrer);
	wm_DSMM_referrerDomain_SEO=wm_DSMM_referrerDomain_SEO.toLowerCase();
	var wm_DSMM_google = wm_DSMM_referrerDomain_SEO.match(/google./g);
	var wm_DSMM_yahoo = wm_DSMM_referrerDomain_SEO.match(/search.yahoo.com/g);
	var wm_DSMM_msn = wm_DSMM_referrerDomain_SEO.match(/bing./g);
	var wm_DSMM_aol = wm_DSMM_referrerDomain_SEO.match(/aol.com/g);
	var wm_DSMM_ask = wm_DSMM_referrerDomain_SEO.match(/askjeeves.com/g);
	var wm_DSMM_net = wm_DSMM_referrerDomain_SEO.match(/netscape.com/g);
	var wm_DSMM_search = wm_DSMM_referrerDomain_SEO.match(/search.com/g);
	var wm_DSMM_url = location.search;
	wm_DSMM_url = wm_DSMM_url.toLowerCase();
	var wm_DSMM_match=wm_DSMM_url.match(/wm_ctid=/g);
	var wm_DSMM_seodebug = wm_DSMM_url.match(/wm_dsmm_seodebug=/g); 
	var wm_DSMM_landingPage_SEO = location;
	var wm_DSMM_referrer_SEO = document.referrer;
	var wm_DSMM_hash_param = location.hash.toLowerCase();

    var wm_DSMM_hash_qs = new wm_DSMM_Querystring(wm_DSMM_hash_param.substring(1,wm_DSMM_hash_param.length));
    var wm_DSMM_tag1_SEO = wm_DSMM_hash_qs.get("wm_tag1");
    var wm_DSMM_tag2_SEO = wm_DSMM_hash_qs.get("wm_tag2");
    var wm_DSMM_tag3_SEO = wm_DSMM_hash_qs.get("wm_tag3");
    var wm_DSMM_tag4_SEO = wm_DSMM_hash_qs.get("wm_tag4");
    var wm_DSMM_tag5_SEO = wm_DSMM_hash_qs.get("wm_tag5");


// SEO Variables Initialization ******************

	var ar_wm_DSMM_excluded_SEODomains = new Array("mail.google.com", "webmail.aol.com");
	var IsExcludedDomain = false;

	for (var i = 0; i < ar_wm_DSMM_excluded_SEODomains.length; i++) 
	{
	    if (wm_DSMM_referrerDomain_SEO.indexOf(ar_wm_DSMM_excluded_SEODomains[i]) > -1) 
	    {
	        IsExcludedDomain = true;
	    }
	}

	if (!IsExcludedDomain)
	{
	
		if ((wm_DSMM_isSEOTrackingEnabled) && (wm_DSMM_isTrackingEnabled)) 
		{

		    if ((wm_DSMM_seodebug || wm_DSMM_google || wm_DSMM_yahoo || wm_DSMM_msn || wm_DSMM_aol || wm_DSMM_ask || wm_DSMM_net || wm_DSMM_search || (wm_DSMM_tag1_SEO != null) || (wm_DSMM_tag2_SEO != null) || (wm_DSMM_tag3_SEO != null) || (wm_DSMM_tag4_SEO != null) || (wm_DSMM_tag5_SEO != null)) && (!wm_DSMM_match))
		    {


		        var wm_DSMM_src_SEO = wm_DSMM_DSMMTracker_Path + "click_hash.asp?wm_DSMM_client=" + wm_DSMM_client + "&wm_DSMM_ckid=" + wm_DSMM_ckid + "&wm_DSMM_landingPage_SEO=" + escape(wm_DSMM_landingPage_SEO) + "&wm_DSMM_referrer_SEO=" + escape(wm_DSMM_referrer_SEO) + "&wm_DSMM_referrerDomain_SEO=" + wm_DSMM_referrerDomain_SEO + "&wm_DSMM_SEMType=" + wm_DSMM_SEM_SEO + "&wm_DSMM_CookieTypeUsed=" + wm_DSMM_CookieTypeUsed + "&wm_DSMM_CookieExpirationPeriod=" + wm_DSMM_3PCCookieExpirationPeriod + "&wm_DSMM_tag1_SEO=" + wm_DSMM_tag1_SEO + "&wm_DSMM_tag2_SEO=" + wm_DSMM_tag2_SEO + "&wm_DSMM_tag3_SEO=" + wm_DSMM_tag3_SEO + "&wm_DSMM_tag4_SEO=" + wm_DSMM_tag4_SEO + "&wm_DSMM_tag5_SEO=" + wm_DSMM_tag5_SEO;
    			
			    // 1st Party Cookie - SEO Tracking *************************************

			    if (wm_DSMM_is1PCCookieEnabled)
			    {
			        wm_DSMM_setCookie("wm_DSMM_referrer_SEO", wm_DSMM_referrer_SEO, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_referrerDomain_SEO", wm_DSMM_referrerDomain_SEO, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_landingPage_SEO", wm_DSMM_landingPage_SEO, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_cookieType_SEO", wm_DSMM_1PCCookie, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_TimeStamp_SEO", wm_DSMM_ClickTimeStamp, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_tag1_SEO", wm_DSMM_tag1_SEO, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_tag2_SEO", wm_DSMM_tag2_SEO, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_tag3_SEO", wm_DSMM_tag3_SEO, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_tag4_SEO", wm_DSMM_tag4_SEO, wm_DSMM_1PCCookieExpirationPeriod);
			        wm_DSMM_setCookie("wm_DSMM_tag5_SEO", wm_DSMM_tag5_SEO, wm_DSMM_1PCCookieExpirationPeriod);			        			        			        
				    //	wm_DSMM_setCookie("wm_DSMM_FirstClicked_PPC",wm_DSMM_FirstClicked_PPC);
				    wm_DSMM_src_SEO = wm_DSMM_src_SEO + "&wm_DSMM_is1PCCookieEnabled="+wm_DSMM_is1PCCookieEnabled;
			    }
			    // 1st Party Cookie - SEO Tracking *************************************

			    // 3rd Party Cookie - SEO Tracking *************************************
			    if (wm_DSMM_is3PCCookieEnabled)
			    {
				    wm_DSMM_src_SEO = wm_DSMM_src_SEO + "&wm_DSMM_is3PCCookieEnabled="+wm_DSMM_is3PCCookieEnabled;
			    }
			    // 3rd Party Cookie - SEO Tracking *************************************

			    if ((wm_DSMM_is1PCCookieEnabled) || (wm_DSMM_is3PCCookieEnabled))
			    {


    			


				    if (location.search.indexOf("wm_debug=true") > -1)
				    {		
					    window.open(wm_DSMM_src_SEO,'SEO_DSMM','location=yes'); 
				    }
				    else
				    {
					    var wm_TrackingPixel_Click_SEO= new Image();
					    wm_TrackingPixel_Click_SEO.src= wm_DSMM_src_SEO;
				    }
			    }
    			
		    }
        }

	}
}