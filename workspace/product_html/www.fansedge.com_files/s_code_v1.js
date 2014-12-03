/* SiteCatalyst code version: H.26.1
Copyright 1996-2013 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
// fanatics_s_account should be set prior to calling this s_code file.

var $s=s_gi(fanatics_s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */
$s.currencyCode = "USD"
/* Link Tracking Config */
$s.trackDownloadLinks = true
$s.trackExternalLinks = true
$s.trackInlineStats = true
$s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
$s.linkInternalFilters = "javascript:,.fanatics.com,.footballfanatics.com,localhost,127.0.0.1,www.paypal.com,integration.richrelevance.com";	
$s.linkLeaveQueryString = false
$s.linkTrackVars = "None"
$s.linkTrackEvents = "None"

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
$s.visitorNamespace = "fanatics"
$s.trackingServer = "fanatics.112.2o7.net"
$s.dc = "112";

// UTM Global Variables
var sc_utm_source = '';
var sc_utm_medium = '';
var sc_utm_term = '';
var sc_utm_content = '';
var sc_utm_campaign = '';
var sc_placement = '';
var sc_adposition = '';
var sc_affiliateid = '';
var sc_matchtype = '';
var sc_adtype = '';

// Setup User Agent and Hostname
$s.eVar52 = navigator.userAgent;
$s.prop52 = navigator.userAgent;
$s.eVar54 = document.location.hostname;
$s.prop54 = document.location.hostname;
// The referrer of the tracking call is the current page URL.
$s.prop50 = "D=Referer";
$s.eVar50 = "D=Referer"; // "Referer" with one r is the correct spelling of this header.
// The "r" parameter in the tracking call is the referring URL.
$s.prop51 = "D=r";
$s.eVar51 = "D=r";

//Setup Clickmap
function s_getObjectID(o) {
    var ID = o.href;
    return ID;
}
$s.getObjectID = s_getObjectID;

/* Configure Channel Manager */
$s._channelParameter = "Paid Search|pcrid";
$s._channelPattern="email|EML";

/* Plugin Config */
$s.usePlugins = true
function s_doPlugins(fanatics_s_code) {
	
	// Page view call actions
	if (!$s.linkType){
		// Add event30 (custom page view event) to s.events for all page view calls
		$s.events = $s.apl($s.events, 'event30', ',', 2);
	}
	
	//set current domain in linkInternalFilters
	$s.getLinkInternalDomain();
	
	// Put pageName in prop22 & eVar43 for correlation to other variables, especially in link tracking calls, which do not record pageName
	if (!!$s.pageName)
		$s.prop22 = $s.pageName;
		$s.eVar43 = $s.pageName;
	
    // Add calls to plugins here 
    // Copy search term and set aggregate search event 
    if ($s.prop4) {
        $s.eVar1 = $s.prop4;
        $s.events = $s.apl($s.events, 'event1', ',', 2);
    }
   
    // Copy search type prop into eVar 
    if ($s.prop7) {
        $s.eVar2 = $s.prop7;
    }

    // automate event27 (more than 3000 search results) 
    if ($s.prop5 && parseInt($s.prop5) > 3000)
        $s.events = $s.apl($s.events, "event27", ",", 2);

    // Do not refire search events if the same search term passed in twice in a row 
    var t_search = $s.getValOnce($s.eVar1, 's_stv', 0);
    if (t_search == '') {
        var a = $s.split($s.events, ',');
        var e = '';
        for (var i = 0; i < a.length; i++) {
            if (a[i] == 'event1' || a[i] == 'event2' || a[i] == 'event3' || a[i] == 'event4')
                continue;
            else
                e += a[i] ? a[i] + ',' : a[i];
        }
        $s.events = e.substring(0, e.length - 1);
    }
    //Get Page Prior to Search
    var s_prevPage = $s.getPreviousValue($s.pageName, 's_prevPage', 0);
    if ($s.prop4 && s_prevPage) {
        $s.prop8 = s_prevPage;
    }
    else if ($s.prop4) {
        $s.prop8 = "non-internal referrer to search results";
    }
    //Get PageType Prior to Search
    var s_prevPageType = $s.getPreviousValue($s.prop3, 's_prevProp3', 0);
	if ($s.prop4 && s_prevPageType) {
        $s.prop10 = s_prevPageType;
    }
    else if ($s.prop4) {
        $s.prop10 = "non-internal referrer to search results";
    }
	
    // Automate Custom ProdView Event 
    if ($s.events && $s.events.indexOf('prodView') > -1)
        $s.events = $s.apl($s.events, 'event5', ',', 2);

	   // Automate Finding Method eVar
    var internalFlag = false;
    if (document.referrer) {
        var filters = $s.split($s.linkInternalFilters, ',');
        var docRef = $s.split(document.referrer, '/');
        docRef = docRef[2];
        for (var f in filters) {
            if (docRef.indexOf(filters[f]) > -1)
                internalFlag = true;
        }
    }
    
	// create productmerch product for merchandising eVar binding 
    if ($s.eVar6 && (!$s.products || ($s.products && $s.products.indexOf(';productmerch') > -1) || $s.newProduct == 'true'))
    {
        if (!$s.c_r('productnum'))
            $s.productNum = 1;
        else
            $s.productNum = parseInt($s.c_r('productnum')) + 1;
        $s.products = ';productmerch' + $s.productNum;			//record an instance with orig allocation - must bind to brand new product every time
        var e = new Date();
        e.setTime(e.getTime() + (30 * 86400000));
        $s.c_w('productnum', $s.productNum, e);
		if ($s.linkTrackVars == "None" || $s.linkTrackVars == '')
			$s.linkTrackVars = 'events,products';
        else
			$s.linkTrackVars = $s.apl($s.linkTrackVars, 'events,products', ',', 2);
        if ($s.linkTrackEvents == "None" || $s.linkTrackEvents == ''){
			$s.linkTrackEvents = $s.events = 'event15';
		} else {
			$s.linkTrackEvents = $s.apl($s.linkTrackEvents, 'event15', ',', 2);
	        $s.events = $s.apl($s.events, 'event15', ',', 2);
		}
    }
	if($s.products)
		{
		$s.events = $s.apl($s.events, 'event15', ',', 2);
		}
		
    if ($s.c_r('productnum') && $s.events.indexOf('purchase') > -1)
        $s.c_w('productnum', '0', 0);	
		
    //  Automate OrderID eVar
    if ($s.purchaseID)
        $s.eVar21 = $s.purchaseID;

    // Set Internal Campaign 
    if (!$s.eVar5) {
        $s.eVar5 = $s.getQueryParam('ab');
        $s.eVar5 = $s.getValOnce($s.eVar5, 's_ev5', 0);
    }

    // Set Campaign Variables
    var s_InUrl = window.location.href;
	var s_Url = "";
	s_InUrl = s_InUrl.split('&');
	jQuery.each(s_InUrl, function (i, item) {
		if (item.substr(0, 2) !== "e=") {
			s_Url = s_Url + '&' + item;
		}
	});
	s_Url = s_Url.substr(1,s_Url.length);
	//TODO: Delete and write from scratch per Justice. Compare to Marketing Channels in SC Admin. Kevin Winstead at Fanatics is providing his MC logic to Justice week of 7/22.
    var s_Cpgn = parseSource(s_Url);
    $s.channelManager('pcrid', ':', 'c_m', '0', 'cm_dl', '1');
    if ($s._channel) {
		// Correct channels based on /source/ parameter, which is in s_Cpgn
        if ($s._channel == "Natural Search" && !!s_Cpgn){
			$s._channel = "Paid Search";
		}
		// Set Campaign Channel eVar3
        if ($s._channel == "Paid Search") {
            $s.eVar3 = "ppc";
			$s.eVar6 = "Paid Search";
        }
        if ($s._channel == "Natural Search") {
            $s.eVar3 = "organic search";
        }
        if ($s._channel == "Other Natural Referrers") {
            $s.eVar3 = "referral";
        }
        if ($s._channel == "Typed/Bookmarked") {
            $s.eVar3 = "direct";
        }
    }
    // Set campaign variables that won't trigger CM
    if (s_Cpgn.indexOf('eml') > -1) {
        $s.eVar3 = "email";
    }
    if (s_Cpgn.indexOf('callcenter') > -1) {
        $s.eVar3 = "call center";
    }
	
	// Set s.campaign to <channel>|<referring domain>|<keywords>|<campaign code>
	$s.campaign="";
	// Channel
	// Set per Jan 2013 requirements
	if ($s.eVar3)
		$s.campaign+=$s.eVar3;
	else
		$s.campaign+="n/a";
	$s.campaign+="|";
	// Referring Domain
	if (($s._referringDomain)&&($s._referringDomain!="Typed/Bookmarked"))
		$s.campaign+=$s._referringDomain;
	else
		$s.campaign+="n/a";
	$s.campaign+="|";
	// Keywords
	if ($s._keywords)
		$s.campaign+=$s._keywords;
	else
		$s.campaign+="n/a";
	$s.campaign+="|";
	// Campaign Code
	if (s_Cpgn)
	{
		$s.campaign+=s_Cpgn;
		$s.eVar53 = s_Cpgn;
		$s.prop53 = s_Cpgn;
	}
	else
	{
		$s.campaign+="n/a";
		$s.eVar53 = "n/a";
		$s.prop53 = "n/a";
	}
	// Blank out campaign when no channel or campaign was detected
	if ($s.campaign.indexOf('n/a|n/a|n/a|n/a') > -1)
		$s.campaign="";
	
    // Campaign Stacking
    if ($s.eVar3) $s.eVar4 = $s.crossVisitParticipation($s.eVar3, 's_cvpcpgn', '1', '5', '>', 'purchase', 30);	
	
	 //Product Finding Method Automation
    if ($s.eVar6) {
	//keep pre-set value
    }
    else if ($s.eVar3=="organic search") {
        $s.eVar6 = 'organic search';
    }
    else if ($s.campaign) {
        $s.eVar6 = 'external campaign';
    }
    else if (document.referrer && !internalFlag) {
        $s.eVar6 = 'referral';
    }
    else if ($s.eVar1 && $s.eVar1 != 'non-search') {
        $s.eVar6 = 'internal search results';
    }
    else if ($s.eVar5 && $s.eVar5 != 'non-internal campaign') {
        $s.eVar6 = 'internal campaign';
    }
    else if ($s.eVar7 && $s.eVar7 != 'non-browse') {
        $s.eVar6 = 'browse';
    }
    else if ($s.events.indexOf('purchase') > -1) {
        $s.eVar6 = 'unknown at time of purchase';
    }
    //Setup Clickmap Object IDs
    $s.setupDynamicObjectIDs();
    // Set Partner ID Variables
    if (typeof sc_PSID != 'undefined' && sc_PSID != '') {
        $s.eVar16 = sc_PSID;
		$s.prop11 = sc_PSID;
	} else {
		$s.eVar16 = window.location.hostname;
		$s.prop11 = window.location.hostname;
	}
	// Set Cart Created Date
	if (!!$s.events && $s.events.indexOf("scOpen") > -1) {
		var e = new Date();
		$s.eVar47 = e.getMonth() + 1 + '/' + e.getDate() + '/' + e.getFullYear();
	}
    // Filter Category Stacking
    if ($s.eVar23)
        $s.eVar25 = $s.crossVisitParticipation($s.eVar23, 's_cvpva', '1', '5', '>', 'purchase', 1);
		$s.prop17 = $s.crossVisitParticipation($s.eVar23, 's_cvpva', '1', '5', '>', 'purchase', 1);
    // Filter Selection Stacking
    if ($s.eVar24)
        $s.eVar26 = $s.crossVisitParticipation($s.eVar24, 's_cvpvb', '1', '5', '>', 'purchase', 1);
		$s.prop18 = $s.crossVisitParticipation($s.eVar24, 's_cvpvb', '1', '5', '>', 'purchase', 1);
    //Lowercase all variables
    $s.manageVars('lowercaseVars');
}
$s.doPlugins = s_doPlugins

/******************** CONVENIENCE FUNCTIONS *************************/
function s_setError(errorList, thePageName) {
    $s.linkTrackVars = 'pageName,prop12,prop19,prop22,prop50';
    $s.pageName = thePageName;
    $s.prop12 = errorList;
	$s.prop19 = errorList;
    $s.tl(true, 'o', 'Track Error');
}
function s_findMethod(findMethod) {
    $s.linkTrackVars = 'eVar6';
    $s.eVar6 = findMethod;
    $s.tl(true, 'o', 'Finding Method');
}
function s_beginCheckout(products) {
    //s_beginCheckout(';SKU1,;SKU2,;SKU3')
    $s.linkTrackVars = 'eVar28,prop9,events,products';
    $s.linkTrackEvents = 'scCheckout';
	$s.events = 'scCheckout';
    $s.eVar28 = 'Checkout';
    $s.prop9 = 'Checkout';
    $s.products = products;
    $s.tl(true, 'o', 'Checkout');
}
function linkInteraction(elem,linkName) {
    $s.linkTrackVars = 'eVar28,prop9,eVar43';
    $s.eVar28 = linkName;
    $s.prop9 = linkName;
    if ($s.pageName) {
        $s.eVar43 = $s.pageName;
    }
    $s.tl(elem, 'o', linkName);
	return false;
}
/* Used to parse campaign code from URL */
function parseSource(pUrl) {
    if (pUrl.indexOf("/source") > -1) {
        var iBegin = pUrl.indexOf("/source") + 8;
		var iEnd = pUrl.length;
		pUrl = pUrl.substr(iBegin, iEnd);
		if (pUrl.indexOf("/") > -1) {
			iEnd = pUrl.indexOf("/");
		} else {
			if (pUrl.indexOf("?") > -1) {
				iEnd = pUrl.indexOf("?");
			} else {
				iEnd = pUrl.length;
			}
		}
        pUrl = pUrl.substr(0, iEnd);
    } else {
		pUrl = "n/a";
	}
    return pUrl.toLowerCase();
}
/* Function to track Email sign-ups*/
function s_emailSignup(s_step, s_teams) {
    if (s_step == "1") {
        $s.pageName = "email signup:choose teams";
        $s.eVar43 = "email signup:choose teams";
        $s.channel = "email signup";
        $s.prop3 = "pages";
        $s.events = "event30,event32";
        $s.t();
    }
    if (s_step == "2") {
        $s.pageName = "email signup:confirmation";
        $s.eVar43 = "email signup:confirmation";
        $s.channel = "email signup";
        $s.prop3 = "pages";
        $s.list1 = s_teams;
        $s.events = "event30,event16";
        $s.t();
    }
}
/* Function to track PageViews from Tabs/AJAX */
function s_PageView(s_Page, s_PageType) {
    $s.clearVars();
    $s.pageName = s_Page.toLowerCase();
    var pageArray = $s.split($s.pageName, ':');
    if (pageArray.length >= 1)
        $s.channel = pageArray[0];
    if (pageArray.length >= 2) {
        $s.prop1 = pageArray[1];
    }
    if (pageArray.length >= 3) {
        $s.prop2 = pageArray[2];
    }
    $s.prop3 = s_PageType;
    $s.events = "event30";
    $s.t();
}
function s_imgInteraction(uniqueID, productID) {
    $s.linkTrackVars = 'events,products';
    $s.linkTrackEvents = 'event18';
    $s.events = 'event18:' + uniqueID;
    if (productID)
        $s.products = ';' + productID;
    $s.tl(true, 'o', 'Product Image Interaction');
}
function s_prodShare(shareType, productID) {
    $s.linkTrackVars = 'events,products,eVar30';
    $s.linkTrackEvents = 'event29';
    $s.events = 'event29';
    $s.eVar30 = shareType;
    if (productID)
        $s.products = ';' + productID;
    $s.tl(true, 'o', 'Product Share: ' + shareType);
}
function s_moreInfo(productID) {
    $s.linkTrackVars = 'events,products';
    $s.linkTrackEvents = 'event20';
    $s.events = 'event20';
    if (productID)
        $s.products = ';' + productID;
    $s.tl(true, 'o', 'More Info Link Click');
}
function s_needItFast(productID) {
    $s.linkTrackVars = 'events,products';
    $s.linkTrackEvents = 'event21';
    $s.events = 'event21';
    if (productID)
        $s.products = ';' + productID;
    $s.tl(true, 'o', 'Need it Faster Link Click');
}
function s_haveSuggestion(productID) {
    $s.linkTrackVars = 'events,products';
    $s.linkTrackEvents = 'event22';
    $s.events = 'event22';
    if (productID)
        $s.products = ';' + productID;
    $s.tl(true, 'o', 'Have a Suggestion Expansion Click');
}
function s_suggestionSuccess(reason, productID) {
    $s.linkTrackVars = 'events,products,eVar39';
    $s.linkTrackEvents = 'event17';
    $s.events = 'event17';
    $s.eVar39 = reason;
    if (productID)
        $s.products = ';' + productID;
    $s.tl(true, 'o', 'Successful Suggestion Submission');
}
function s_updateItem(productID) {
    $s.linkTrackVars = 'events,products';
    $s.linkTrackEvents = 'event24';
    $s.events = 'event24';
    $s.products = '';
    if (productID) {
        var prodArray = $s.split(productID, ':')
        for (var i = 0; i < prodArray.length; i++) {
            if (i == 0)
                $s.products = $s.products + ';' + prodArray[i];
            else
                $s.products = $s.products + ',;' + prodArray[i];
        }
    }
    $s.tl(true, 'o', 'Update Item click');
}
function s_sizeChange(productID) {
    $s.linkTrackVars = 'events,products';
    $s.linkTrackEvents = 'event31';
    $s.events = 'event31';
    $s.products = '';
    if (productID) {
        var prodArray = $s.split(productID, ':')
        for (var i = 0; i < prodArray.length; i++) {
            if (i == 0)
                $s.products = $s.products + ';' + prodArray[i];
            else
                $s.products = $s.products + ',;' + prodArray[i];
        }
    }
    $s.tl(true, 'o', 'Size Change Interaction');
}
function selectProduct(s_productSlot) {
    $s.linkTrackVars = 'eVar42';
    $s.eVar42 = s_productSlot;
    $s.tl(true, 'o', 'product slot');
}
/* Checkout */
function s_Checkout(s_products, s_linkName) {
    $s.linkTrackVars = 'products,eVar28,prop9,events';
    $s.linkTrackEvents = 'scCheckout';
    $s.eVar28 = s_linkName;
    $s.prop9 = s_linkName;
    $s.events = 'scCheckout';
    $s.products = '';
    var prodArray = $s.split(s_products, ':');
    for (var i = 0; i < prodArray.length; i++) {
        if (i == 0)
            $s.products = $s.products + ';' + prodArray[i];
        else
            $s.products = $s.products + ',;' + prodArray[i];
    }
    $s.tl(this, 'o', 'checkout');
}

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/*
 * Function: getLinkInternalDomain - parse the URL and return the domain for linkInternalFilter string
 */
$s.getLinkInternalDomain=new Function("",""
+ "var s_InUrl = window.location.href;"
+ "var s_Url = '';"
+ "s_InUrl = s_InUrl.split('&');"
+ "jQuery.each(s_InUrl, function (i, item) {"
+ "	if (item.substr(0, 2) !== 'e=') {"
+ "		s_Url = s_Url + '&' + item;"
+ "	}"
+ "});"
+ "s_Url = s_Url.substr(1,s_Url.length);var urlString=s_Url;var urlPattern=new RegExp('(ht"
+"tp|https)://(.*?)/.*$');var parsedUrl=urlString.match(urlPattern);v"
+"ar domain=parsedUrl[2];var parts=domain.split('.');if(parts.length>"
+"2){parts.shift();domain=parts.join('.');}else {domain=domain;}$s.lin"
+"kInternalFilters=$s.linkInternalFilters+','+domain;");

/*
* Utility manageVars v1.4 - clear variable values (requires split 1.5)
*/
$s.manageVars = new Function("c", "l", "f", ""
+ "var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
+ "geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
+ ",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
+ "'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
+ "it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
+ "a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
+ "}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
+ ");return true;}else{return false;}");
$s.clearVars = new Function("t", "var s=this;s[t]='';");
$s.lowercaseVars = new Function("t", ""
+ "var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index"
+ "Of('D=')!=0){s[t]=s[t].toLowerCase();}}");

/*
* Plugin: getQueryParam 2.4
*/
$s.getQueryParam = new Function("p", "d", "u", "h", ""
+ "var s_InUrl = window.location.href;"
+ "var s_Url = '';"
+ "s_InUrl = s_InUrl.split('&');"
+ "jQuery.each(s_InUrl, function (i, item) {"
+ "	if (item.substr(0, 2) !== 'e=') {"
+ "		s_Url = s_Url + '&' + item;"
+ "	}"
+ "});"
+ "s_Url = s_Url.substr(1,s_Url.length);var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s_Url);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+ "?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+ "')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+ "g(i==p.length?i:i+1)}return v");
$s.p_gpv = new Function("k", "u", "h", ""
+ "var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+ "string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
$s.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+ "epa(v)}return''");

/*
* Plugin: getValOnce v1.1
*/
$s.getValOnce = new Function("v", "c", "e", "t", ""
+ "var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+ "0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+ "==0?0:a);}return v==k?'':v");

/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
$s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
* Plugin Utility: apl v1.1
*/
$s.apl = new Function("l", "v", "d", "u", ""
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)l=l?l+d+v:v;return l");

/*
* Function - read combined cookies v 0.35
*/

if (!$s.__ccucr) {
    $s.c_rr = $s.c_r;
    $s.__ccucr = true;
    function c_r(k) {
        var s = this, d = new Date, v = s.c_rr(k), c = s.c_rr('s_pers'), i, m, e;
        if (v) return v; k = s.ape(k); i = c.indexOf(' ' + k + '='); c = i < 0 ? s.c_rr('s_sess') : c;
        i = c.indexOf(' ' + k + '='); m = i < 0 ? i : c.indexOf('|', i); e = i < 0 ? i : c.indexOf(';', i);
        m = m > 0 ? m : e; v = i < 0 ? '' : s.epa(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
        if (m > 0 && m != e) if (parseInt(c.substring(m + 1, e < 0 ? c.length : e)) < d.getTime())
        { d.setTime(d.getTime() - 60000); s.c_w(s.epa(k), '', d); v = ''; } return v;
    }
    $s.c_r = c_r;
}

/*
* Function - write combined cookies v 0.36
*/

if (!$s.__ccucw) {
    $s.c_wr = $s.c_w;
    $s.__ccucw = true;
    function c_w(k, v, e) {
        var s = this, d = new Date, ht = 0, pn = 's_pers', sn = 's_sess', pc = 0, sc = 0, pv, sv, c, i, t;
        d.setTime(d.getTime() - 60000); if (s.c_rr(k)) s.c_wr(k, '', d); k = s.ape(k);
        pv = s.c_rr(pn); i = pv.indexOf(' ' + k + '='); if (i > -1)
        { pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1); pc = 1; } sv = s.c_rr(sn);
        i = sv.indexOf(' ' + k + '='); if (i > -1) {
            sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
            sc = 1;
        } d = new Date; if (e) {
            if (e.getTime() > d.getTime()) {
                pv += ' ' + k + '=' + s.ape(v) + '|' + e.getTime() + ';';
                pc = 1;
            } 
        } else { sv += ' ' + k + '=' + s.ape(v) + ';'; sc = 1; } sv = sv.replace(/%00/g, '');
        pv = pv.replace(/%00/g, ''); if (sc) s.c_wr(sn, sv, 0); if (pc) {
            t = pv; while (t && t.indexOf(';') != -1) {
                var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
                t = t.substring(t.indexOf(';') + 1); ht = ht < t1 ? t1 : ht;
            } d.setTime(ht); s.c_wr(pn, pv, d);
        }
        return v == s.c_r(s.epa(k));
    }
    $s.c_w = c_w;
}

/*
* DynamicObjectIDs v1.5: Setup Dynamic Object IDs based on URL
*/
$s.setupDynamicObjectIDs = new Function(""
+ "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+ ">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+ " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+ "lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+ "re=1}");
$s.setOIDs = new Function("e", ""
+ "var s=s_c_il[" + $s._in + "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+ ",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+ "{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+ "=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+ "objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+ "pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+ "if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+ ")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+ "s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+ "]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

/*
* Plugin Utility: Replace v1.0
*/
$s.repl = new Function("x", "o", "n", ""
+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
* Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
*/
$s.getNewRepeat = new Function("d", "cn", ""
+ "var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+ "'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+ "=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+ "-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+ "ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/*
* Plugin: getPreviousValue_v1.0 - return previous value of designated
*   variable (requires split utility)
*/
$s.getPreviousValue = new Function("v", "c", "el", ""
+ "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+ "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+ "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+ ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+ "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
* Plugin Utility - first only
*/
$s.p_fo = new Function("n", ""
+ "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+ "new Object;return 1;}else {return 0;}");

/*
* Plugin: getTimeParting 2.1 
*/
$s.getTimeParting = new Function("t", "z", "y", "l", "j", ""
+ "var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+ "tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+ ".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+ "|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+ "=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+ "g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+ "=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+ "a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+ " Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+ "etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+ "nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+ "Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+ "00';if(C>30){X='30'}if(j=='1'){if(C>15){X='15'}if(C>30){X='30'}if(C"
+ ">45){X='45'}}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6||D==0)"
+ "{A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Available'}els"
+ "e{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){return A"
+ "}}else{return Z+', '+W}}}");

/*
* channelManager v2.7 - Tracking External Traffic
*/
$s.channelManager = new Function("a", "b", "c", "d", "e", "f", ""
+ "var s=this,g=new Date,h=0,i,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D"
+ ",E,F,G,H,I,J,K,L,M,N,O,P,Q,R;g.setTime(g.getTime()+1800000);if(e){h"
+ "=1;if(s.c_r(e))h=0;if(!s.c_w(e,1,g))s.c_w(e,1,0);if(!s.c_r(e))h=0;}"
+ "i=s.referrer?s.referrer:document.referrer;i=i.toLowerCase();if(!i)j"
+ "=1;else {k=i.indexOf('?')>-1?i.indexOf('?'):i.length;l=i.substring("
+ "0,k);m=s.split(i,'/');n=m[2].toLowerCase();o=s.linkInternalFilters."
+ "toLowerCase();o=s.split(o,',');for(p=0;p<o.length;p++){q=n.indexOf("
+ "o[p])==-1?'':i;if(q)break;}}if(!q&&!j){r=i;t=u=n;v='Other Natural R"
+ "eferrers';w=s.seList+'>'+s._extraSearchEngines;if(d==1){l=s.repl(l,"
+ "'oogle','%');l=s.repl(l,'ahoo','^');i=s.repl(i,'as_q','*');}x=s.spl"
+ "it(w,'>');for(y=0;y<x.length;y++){z=x[y];z=s.split(z,'|');A=s.split"
+ "(z[0],',');for(B=0;B<A.length;B++){C=l.indexOf(A[B]);if(C>-1){if(z["
+ "2])D=u=z[2];else D=n;if(d==1){D=s.repl(D,'#',' - ');i=s.repl(i,'*',"
+ "'as_q');D=s.repl(D,'^','ahoo');D=s.repl(D,'%','oogle');}E=s.split(z"
+ "[1],',');for(F=0;F<E.length;F++){if(i.indexOf(E[F]+'=')>-1||i.index"
+ "Of('https://www.google.')==0)G=1;H=s.getQueryParam(E[F],'',i).toLow"
+ "erCase();if(G||H)break;}}if(G||H)break;}if(G||H)break;}}if(!q||f!='"
+ "1'){q=s.getQueryParam(a,b);if(q){u=q;if(D)v='Paid Search';else v='U"
+ "nknown Paid Channel';}if(!q&&D){u=D;v='Natural Search';}}if(j==1&&!"
+ "q&&h==1)r=t=u=v='Typed/Bookmarked';I=s._channelDomain;if(I&&n){J=s."
+ "split(I,'>');for(K=0;K<J.length;K++){L=s.split(J[K],'|');M=s.split("
+ "L[1],',');N=M.length;for(O=0;O<N;O++){P=M[O].toLowerCase();Q=n.inde"
+ "xOf(P);if(Q>-1){v=L[0];break;}}if(Q>-1)break;}}I=s._channelParamete"
+ "r;if(I){J=s.split(I,'>');for(K=0;K<J.length;K++){L=s.split(J[K],'|'"
+ ");M=s.split(L[1],',');N=M.length;for(O=0;O<N;O++){Q=s.getQueryParam"
+ "(M[O]);if(Q){v=L[0];break;}}if(Q)break;}}I=s._channelPattern;if(I){"
+ "J=s.split(I,'>');for(K=0;K<J.length;K++){L=s.split(J[K],'|');M=s.sp"
+ "lit(L[1],',');N=M.length;for(O=0;O<N;O++){P=M[O].toLowerCase();Q=q."
+ "toLowerCase();R=Q.indexOf(P);if(R==0){v=L[0];break;}}if(R==0)break;"
+ "}}S=v?q+t+v+H:'';c=c?c:'c_m';if(c!='0')S=s.getValOnce(S,c,0);if(S){"
+ "s._campaignID=q?q:'n/a';s._referrer=r?r:'n/a';s._referringDomain=t?"
+ "t:'n/a';s._campaign=u?u:'n/a';s._channel=v?v:'n/a';s._partner=D?D:'"
+ "n/a';s._keywords=G?H?H:'Keyword Unavailable':'n/a';}");

/* Top 130 Search Engines */
$s.seList = "altavista.co|q,r|AltaVista>aol.co.uk,search.aol.co.uk|query"
+"|AOL - United Kingdom>search.aol.com,search.aol.ca|query,q|AOL.com "
+"Search>ask.com,ask.co.uk|ask,q|Ask Jeeves>www.baidu.com|wd|Baidu>da"
+"um.net,search.daum.net|q|Daum>google.co,googlesyndication.com|q,as_"
+"q|Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as"
+"_q|Google - Australia>google.at|q,as_q|Google - Austria>google.com."
+"bh|q,as_q|Google - Bahrain>google.com.bd|q,as_q|Google - Bangladesh"
+">google.be|q,as_q|Google - Belgium>google.com.bo|q,as_q|Google - Bo"
+"livia>google.ba|q,as_q|Google - Bosnia-Hercegovina>google.com.br|q,"
+"as_q|Google - Brasil>google.bg|q,as_q|Google - Bulgaria>google.ca|q"
+",as_q|Google - Canada>google.cl|q,as_q|Google - Chile>google.cn|q,a"
+"s_q|Google - China>google.com.co|q,as_q|Google - Colombia>google.co"
+".cr|q,as_q|Google - Costa Rica>google.hr|q,as_q|Google - Croatia>go"
+"ogle.cz|q,as_q|Google - Czech Republic>google.dk|q,as_q|Google - De"
+"nmark>google.com.do|q,as_q|Google - Dominican Republic>google.com.e"
+"c|q,as_q|Google - Ecuador>google.com.eg|q,as_q|Google - Egypt>googl"
+"e.com.sv|q,as_q|Google - El Salvador>google.ee|q,as_q|Google - Esto"
+"nia>google.fi|q,as_q|Google - Finland>google.fr|q,as_q|Google - Fra"
+"nce>google.de|q,as_q|Google - Germany>google.gr|q,as_q|Google - Gre"
+"ece>google.com.gt|q,as_q|Google - Guatemala>google.hn|q,as_q|Google"
+" - Honduras>google.com.hk|q,as_q|Google - Hong Kong>google.hu|q,as_"
+"q|Google - Hungary>google.co.in|q,as_q|Google - India>google.co.id|"
+"q,as_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google."
+"is|q,as_q|Google - Island>google.co.il|q,as_q|Google - Israel>googl"
+"e.it|q,as_q|Google - Italy>google.com.jm|q,as_q|Google - Jamaica>go"
+"ogle.co.jp|q,as_q|Google - Japan>google.jo|q,as_q|Google - Jordan>g"
+"oogle.co.ke|q,as_q|Google - Kenya>google.co.kr|q,as_q|Google - Kore"
+"a>google.lv|q,as_q|Google - Latvia>google.lt|q,as_q|Google - Lithua"
+"nia>google.com.my|q,as_q|Google - Malaysia>google.com.mt|q,as_q|Goo"
+"gle - Malta>google.mu|q,as_q|Google - Mauritius>google.com.mx|q,as_"
+"q|Google - Mexico>google.co.ma|q,as_q|Google - Morocco>google.nl|q,"
+"as_q|Google - Netherlands>google.co.nz|q,as_q|Google - New Zealand>"
+"google.com.ni|q,as_q|Google - Nicaragua>google.com.ng|q,as_q|Google"
+" - Nigeria>google.no|q,as_q|Google - Norway>google.com.pk|q,as_q|Go"
+"ogle - Pakistan>google.com.py|q,as_q|Google - Paraguay>google.com.p"
+"e|q,as_q|Google - Peru>google.com.ph|q,as_q|Google - Philippines>go"
+"ogle.pl|q,as_q|Google - Poland>google.pt|q,as_q|Google - Portugal>g"
+"oogle.com.pr|q,as_q|Google - Puerto Rico>google.com.qa|q,as_q|Googl"
+"e - Qatar>google.ro|q,as_q|Google - Romania>google.ru|q,as_q|Google"
+" - Russia>google.st|q,as_q|Google - Sao Tome and Principe>google.co"
+"m.sa|q,as_q|Google - Saudi Arabia>google.com.sg|q,as_q|Google - Sin"
+"gapore>google.sk|q,as_q|Google - Slovakia>google.si|q,as_q|Google -"
+" Slovenia>google.co.za|q,as_q|Google - South Africa>google.es|q,as_"
+"q|Google - Spain>google.lk|q,as_q|Google - Sri Lanka>google.se|q,as"
+"_q|Google - Sweden>google.ch|q,as_q|Google - Switzerland>google.com"
+".tw|q,as_q|Google - Taiwan>google.co.th|q,as_q|Google - Thailand>go"
+"ogle.bs|q,as_q|Google - The Bahamas>google.tt|q,as_q|Google - Trini"
+"dad and Tobago>google.com.tr|q,as_q|Google - Turkey>google.com.ua|q"
+",as_q|Google - Ukraine>google.ae|q,as_q|Google - United Arab Emirat"
+"es>google.co.uk|q,as_q|Google - United Kingdom>google.com.uy|q,as_q"
+"|Google - Uruguay>google.co.ve|q,as_q|Google - Venezuela>google.com"
+".vn|q,as_q|Google - Viet Nam>google.co.vi|q,as_q|Google - Virgin Is"
+"lands>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor"
+"|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|quer"
+"y,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sez"
+"nam.cz>abcsok.no|q|Startsiden>tiscali.it|key|Tiscali>virgilio.it|qs"
+"|Virgilio>yahoo.com,search.yahoo.com|p|Yahoo!>ar.yahoo.com,ar.searc"
+"h.yahoo.com|p|Yahoo! - Argentina>au.yahoo.com,au.search.yahoo.com|p"
+"|Yahoo! - Australia>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Can"
+"ada>fr.yahoo.com,fr.search.yahoo.com|p|Yahoo! - France>de.yahoo.com"
+",de.search.yahoo.com|p|Yahoo! - Germany>hk.yahoo.com,hk.search.yaho"
+"o.com|p|Yahoo! - Hong Kong>in.yahoo.com,in.search.yahoo.com|p|Yahoo"
+"! - India>yahoo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>kr.yah"
+"oo.com,kr.search.yahoo.com|p|Yahoo! - Korea>mx.yahoo.com,mx.search."
+"yahoo.com|p|Yahoo! - Mexico>ph.yahoo.com,ph.search.yahoo.com|p|Yaho"
+"o! - Philippines>sg.yahoo.com,sg.search.yahoo.com|p|Yahoo! - Singap"
+"ore>es.yahoo.com,es.search.yahoo.com|p|Yahoo! - Spain>telemundo.yah"
+"oo.com,espanol.search.yahoo.com|p|Yahoo! - Spanish (US : Telemundo)"
+">tw.yahoo.com,tw.search.yahoo.com|p|Yahoo! - Taiwan>uk.yahoo.com,uk"
+".search.yahoo.com|p|Yahoo! - UK and Ireland>yandex|text|Yandex.ru>s"
+"earch.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink"
+" Search>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRu"
+"nner Search>optimum.net|q|Optimum Search";

/*
*	Plug-in: crossVisitParticipation v1.7 - stacks values from
*	specified variable in cookie and returns value
*/
$s.crossVisitParticipation = new Function("v", "cn", "ex", "ct", "dl", "ev", "dv", ""
+ "var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+ " ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+ "ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+ "f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+ "v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+ ";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length; q++){z=a"
+ "rry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\", '');"
+ "arry[q] = s.split(z, ',');}}var e=new Date();e.setFullYear(e.getFul"
+ "lYear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry["
+ "arry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,n"
+ "ew Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;va"
+ "r td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.ro"
+ "und((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(a"
+ "rry[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{de"
+ "lim:',',front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.jo"
+ "in(h,{delim:dl});if(ce)s.c_w(cn,'');return r;");

/*
* s.join: 1.0 - Joins an array into a string
*/
$s.join = new Function("v", "p", ""
+ "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+ ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+ ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+ "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
* Utility clearVars v0.1 - clear variable values (requires split 1.5)
*/
$s.clearVars = new Function("l", "f", ""
+ "var s=this,vl,la,vla;l=l?l:'';f=f?f:'';vl='pageName,purchaseID,chan"
+ "nel,server,pageType,campaign,state,zip,events,products';for(var n=1"
+ ";n<51;n++)vl+=',prop'+n+',eVar'+n+',hier'+n;if(l&&(f==1||f==2)){if("
+ "f==1){vl=l}if(f==2){la=s.split(l,',');vla=s.split(vl,',');vl='';for"
+ "(x in la){for(y in vla){if(la[x]==vla[y]){vla[y]=''}}}for(y in vla)"
+ "{vl+=vla[y]?','+vla[y]:'';}}s.pt(vl,',','p_clr',0);return true}else"
+ " if(l==''&&f==''){s.pt(vl,',','p_clr',0);return true}else{return fa"
+ "lse}");
$s.p_clr = new Function("t", "var s=this;s[t]=''");

/*Plugin: facebookSocialPlugins v1.1*/
$s.facebookSocialPlugins = new Function("a", "b", "c", "d", "e", "f", "g", "h", ""
+ "var s=this;s.fbICount++;if(s.fbICount>=5){clearInterval(socialInter"
+ "val);}if(typeof(FB)!='undefined'){clearInterval(socialInterval);fun"
+ "ction re(a,b){a=s.split(a,'>'),FB.Event.subscribe(b,function(){trac"
+ "k(a[0],a[1]);});}if(b){re(b,'edge.create');}if(c){re(c,'edge.remove"
+ "');}if(d){re(d,'comment.create');}if(e){re(e,'comment.remove');}if("
+ "f){re(f,'auth.login');}if(g){re(g,'auth.logout');}if(h){re(h,'messa"
+ "ge.send');}}function track(m,n){s.ltVT=s.linkTrackVars;s.ltET=s.lin"
+ "kTrackEvents;s.etE=s.events;s.linkTrackVars=a?(a+',events'):'events"
+ "';s.linkTrackEvents=n;s.events=n;if(a){s[a]=m;}s.tl(this,'o',m);con"
+ "sole.log(m);s.linkTrackVars=s.ltVT;s.linkTrackEvents=s.ltET;s.event"
+ "s=s.etE;}");
$s.fbICount = 0;
var socialInterval = setInterval(function () { $s.facebookSocialPlugins('eVar30', 'facebook:like>event29'); }, 1000);


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.26.1';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLow"
+"erCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.vers"
+"ion+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd["
+"imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');"
+"if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['"
+"+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<"
+"500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a"
+"){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if("
+"x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexO"
+"f(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.s"
+"p(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.l"
+"ength-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(s"
+"k in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn"
+"++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);n"
+"f=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.c"
+"ontextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;els"
+"e if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){va"
+"r s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s"
+".pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if ("
+"s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>"
+"=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.subs"
+"tring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationSer"
+"ver'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase"
+"()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProv"
+"ider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='"
+"c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionTyp"
+"e')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k]"
+",fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='"
+"retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop'"
+")q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h"
+"){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+"
+"1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef"
+"=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.inde"
+"xOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_"
+"il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf"
+")=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s."
+"d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEvent"
+"Listener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!="
+"\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&("
+"!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf("
+"s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.m"
+"etaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.tar"
+"get;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.p"
+"rotocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':''"
+")+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'|"
+"|t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if("
+"o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'"
+"||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oi"
+"d};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u="
+"'+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function("
+"t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=functio"
+"n(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.pro"
+"totype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return"
+" s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\""
+"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s"
+".b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.M"
+"ouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.vi"
+"sitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>"
+"v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i"
+"+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m="
+"s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=t"
+"his;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;i"
+"f(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n="
+"n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;f"
+"or(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\""
+"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m"
+"._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,"
+"f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}"
+"}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;i"
+"f(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i"
+">=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s"
+":'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}"
+"';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.cre"
+"ateElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':"
+"'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i"
+"(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s["
+"k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Dat"
+"e,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli"
+")s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.ma"
+"xDelay)s.maxDelay=250;s.dlt()};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floo"
+"r(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s."
+"applyADMS=function(){var s=this,vb=new Object;if(s.wd.ADMS&&!s.visitorID&&!s.admsc){if(!s.adms)s.adms=ADMS.getDefault();if(!s.admsq){s.visitorID=s.adms.getVisitorID(new Function('v','var s=s_c_il['"
+"+s._in+'],l=s.admsq,i;if(v==-1)v=0;if(v)s.visitorID=v;s.admsq=0;if(l){s.admsc=1;for(i=0;i<l.length;i++)s.t(l[i]);s.admsc=0;}'));if(!s.visitorID)s.admsq=new Array}if(s.admsq){s.vob(vb);vb['!visitorI"
+"D']=0;s.admsq.push(vb);return 1}else{if(s.visitorID==-1)s.visitorID=0}}return 0};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000)"
+":tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+"
+"tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',"
+"c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>"
+"=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if"
+"(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled"
+"()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d"
+".documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\""
+"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<"
+"s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHe"
+"ight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}s.fid=s.gfid();if(s.applyADMS())return '';if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.a"
+"bort){"
+ "var s_InUrl = window.location.href;"
+ "var s_Url = '';"
+ "s_InUrl = s_InUrl.split('&');"
+ "jQuery.each(s_InUrl, function (i, item) {"
+ "	if (item.substr(0, 2) !== 'e=') {"
+ "     if (item.indexOf('?e=') > 0) {"
+ "     s_Url = s_Url + '&' + item.substr(0, item.indexOf('?e=')+1);"
+ "     } else {"
+ "		s_Url = s_Url + '&' + item;"
+ "     }"
+ "	}"
+ "});"
+ "s_Url = s_Url.substr(1,s_Url.length);s_Url = s_Url.replace('?&','?');var l=s_Url,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.l"
+"nk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t"
+"=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQuery"
+"String||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;i"
+"f(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-"
+"id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb"
+">=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)=="
+"ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;"
+"try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oi"
+"dt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if"
+"(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd."
+"s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.li"
+"nkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=th"
+"is,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c"
+"']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_i"
+"l')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq."
+"length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagN"
+"ame('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Oper"
+"a')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));els"
+"e if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;el"
+"se if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,fi"
+"d,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,ligh"
+"tProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomain"
+"Periods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,"
+"events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.s"
+"p(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl"
+"_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicA"
+"ccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,link"
+"TrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){"
+"s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()

/********************** CUSTOM FUNCTIONS SECTION ********************/
/* You may insert any custom functions you wish to use here.        */

// Custom function for Product Quick View
function siteCatalyst_ProdQuickView(productID,inStock,outStock,isSale,prodName)
{
	$s.pageName="Quick View: " + prodName;
    $s.events="prodView,event6";
    $s.products=";" + productID + ";;;;";
	$s.eVar8=sc_TeamName.split("_").join(" ");
	$s.eVar10=sc_LeagueName.split("_").join(" ");
	$s.eVar17=isSale;
	$s.eVar18=inStock;
	$s.eVar19=outStock;
    $s.linkTrackVars="events,products,eVar8,eVar10,eVar17,eVar18,eVar19";
	$s.linkTrackEvents='prodView,event6';
    $s.tl(true, 'o', 'Product QuickView');
}
// Custom function for Product Quick View Add to Cart
function siteCatalyst_QuickViewAddToCart(pid, sku, cartCount, qty)
{
	var cartEvents = "scAdd,event7";
	if ( cartCount - qty == 0 )
	{
		// First add
		cartEvents += ",scOpen";
	}
    $s.events = cartEvents;
    $s.products = ";" + pid + ";;;;eVar22=" + sku;
	$s.eVar20 = cartCount;
    $s.linkTrackVars="events,products,eVar20";
	$s.linkTrackEvents='scAdd,scOpen';
    $s.tl(true, 'o', 'Minibag Add To Cart');
}
// Custom function for Product JCP Add to Cart
function siteCatalyst_JCPAddToCart(pid, sku, cartCount, qty)
{
	var cartEvents = "scAdd,event7";
	if ( cartCount - qty == 0 )
	{
		// First add
		cartEvents += ",scOpen";
	}
    $s.events = cartEvents;
    $s.products = ";" + pid + ";;;;eVar22=" + sku;
	$s.eVar20 = cartCount;
    $s.linkTrackVars="events,products,eVar20";
	$s.linkTrackEvents='scAdd,scOpen';
    $s.tl(true, 'o', 'JCP Add To Cart');
}
// Custom function for jQuery Validate Form Failures
function siteCatalyst_jQueryValidateFailures(formName)
{
    $s.events="event35";
    $s.prop12=formName;
	$s.prop19=formName;	
    $s.linkTrackVars="events,prop12,prop19,prop22";
	$s.linkTrackEvents='event35';
    $s.tl(true, 'o', 'Form Validation Failure');
}
// Custom function for Remove Item from Mini Cart
function siteCatalyst_miniCartRemoveItem(productID, SKU)
{
    $s.events="scRemove";
    $s.products=';' + productID + ';;;;eVar22=' + SKU;
	$s.eVar11='mini cart'
	$s.linkTrackVars="events,products,eVar22,eVar11";
	$s.linkTrackEvents='scRemove';
    $s.tl(true, 'o', 'Remove Item From Mini Cart');
}
// Custom utility function for getting breadcrumb item count
function sc_browseItemCount()
{
	var sc_BreadCrumbProdNum = 0;
	var sc_BreadCrumb = jQuery("div.browseHeaderBreadCrumbs").html();
	if (sc_BreadCrumb == null)
	{
		sc_BreadCrumb = "";
	}
	if ( sc_BreadCrumb.length > 0 )
	{
		if (sc_BreadCrumb.indexOf("items)") > 0) {
			var sc_BreadCrumbRegexp = /\(([0-9]+) items\)/g;
			var sc_BreadCrumbMatches = sc_BreadCrumbRegexp .exec(sc_BreadCrumb);
			sc_BreadCrumbProdNum = sc_BreadCrumbMatches[1];
		}
	}
	return sc_BreadCrumbProdNum;
}
// Custom function for rewards clicks
// event37=Promo Click, event38=PageSignupComplete, event39=ModalSignupComplete, event40=LearnMoreClick
function siteCatalyst_rewardsClick()
{
    $s.events="event37";
    $s.linkTrackVars="events,prop50";
	$s.linkTrackEvents='event37';
    $s.tl(true, 'o', 'Rewards Promo Click');
}
function siteCatalyst_rewardsPageSignup()
{
    $s.events="event38";
    $s.linkTrackVars="events,prop50";
	$s.linkTrackEvents='event38';
    $s.tl(true, 'o', 'Rewards Page Signup');
}
// Recently viewed event tracking for SiteCatalyst
jQuery("div.rvpContainer").on("click", "div.ImageLink a", function() 
{      
	var rvpProductID = jQuery(this).parents("div.ItemContainer").find("div.hiddenProductID").html();
	s_findMethod("Recently Viewed");
});
// You May Also Like for SiteCatalyst
jQuery("form.mwsRelatedForm a").live("click", function ()
{
    var scProductID = jQuery(this).closest("form").find("div.Item").attr("id");
	scProductID = scProductID.replace("Item","");
	var scLinkName = "recommended products:internal";
	if (jQuery(this).hasClass("RichRecs")) {
		scLinkName = "recommended products:rich relevance";	
	}
    $s.linkTrackVars = 'eVar28,prop9,eVar43,prop33,prop11,eVar16,prop54,eVar54';
	$s.eVar16 = sc_PSID;
    $s.eVar28 = scLinkName;
	$s.eVar54 = document.location.hostname;
    $s.prop9 = scLinkName;
	$s.prop11 = sc_PSID;
    $s.prop33 = scProductID;
	$s.prop54 = document.location.hostname;
    if ($s.pageName) {
        $s.eVar43 = $s.pageName;
    }
    $s.tl(true, 'o', scLinkName);
});
// Minibag "Continue Shopping" Link
jQuery("body").on("click", "a.mbContinueShopping", function ()
{
    linkInteraction(true, "mini cart:continue shopping");
});
// Removed Item from minibag
jQuery("body").on("click", "a.mbItemRemoveTarget", function ()
{
    siteCatalyst_miniCartRemoveItem(jQuery(this).data("product-id"), jQuery(this).data("sku"));
});
// Click on a Rewards Link
jQuery("body").on("click", "a.rewardsClubLinkJS", function ()
{
    siteCatalyst_rewardsClick();
});
// Click on a Rewards Link
jQuery("body").on("rewards_rewardsPageSignupCustomEvent", function ()
{
    siteCatalyst_rewardsPageSignup();
});
// jQuery Validate errors
jQuery("form").on("jQueryValidationError", function ()
{
    var formName = jQuery(this).attr("name");
    siteCatalyst_jQueryValidateFailures(formName);
});
// header checkout link click
jQuery("div#headerFrameCartCheckoutContainer").on("click", "a#headerCartCheckoutLink", function ()
{
    s_beginCheckout(sc_OrderItemsString);
});
// minibag checkout click
jQuery("body").on("click", "a.mbCheckout", function ()
{
    s_beginCheckout(sc_OrderItemsString);
    linkInteraction(true, "mini cart:check out now");
});
// Guided nav click tracking
var s_category = $s.c_r('s_gf_cat');
var s_selection = $s.c_r('s_gf_sel');
if ( ( s_category != "" ) && ( s_selection != "" ) )
{
    $s.eVar23 = s_category;
    $s.prop15 = s_category;
    $s.eVar24 = s_selection;
    $s.prop16 = s_selection;
}
var date1DayOld = new Date();
date1DayOld.setDate(date1DayOld.getDate()-1);
$s.c_w('s_gf_cat', '', date1DayOld);
$s.c_w('s_gf_sel', '', date1DayOld);
jQuery("body").on("click", "div.GuidedFilterContainer ul li a", function (e)
{
    var s_category = jQuery(this).parents("div.GuidedFilterContainer").find("h2").html();
    var s_selection = jQuery(this).html();
    $s.c_w('s_gf_cat', s_category , 0);
    $s.c_w('s_gf_sel', s_selection , 0);
});
function siteCatalyst_savedCardUser()
{
    $s.events="event48";
    $s.linkTrackVars="events";
	$s.linkTrackEvents='event48';
    $s.tl(true, 'o', 'Saved Card User');
}

s_InUrl = window.location.href;
s_InUrl = s_InUrl.split('&');
jQuery.each(s_InUrl, function (i, item) {
	if (item.indexOf("?") > 0) {
		item = item.substring(item.indexOf("?")+1,item.length);
	}
	paramLookup = item.split('=');
	switch (paramLookup[0]) {
		case 'utm_source':
			sc_utm_source = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'utm_medium':
			sc_utm_medium = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'utm_term':
			sc_utm_term = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'utm_content':
			sc_utm_content = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'utm_campaign':
			sc_utm_campaign = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'placement':
			sc_placement = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'adposition':
			sc_adposition = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'affiliateid':
			sc_affiliateid = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'matchtype':
			sc_matchtype = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
		case 'adtype':
			sc_adtype = paramLookup[1].replace(new RegExp("%20","g")," ");
			break;
	}
});
$s.eVar39 = sc_utm_source;
$s.eVar40 = sc_utm_medium;
$s.eVar41 = sc_utm_term;
$s.eVar42 = sc_utm_content;
$s.eVar44 = sc_utm_campaign;
if (sc_adposition.length > 0) {
	$s.eVar45 = sc_adposition;
} else {
	$s.eVar45 = sc_placement;
};
if (sc_adtype.length > 0) {
	$s.eVar46 = sc_adtype;
} else {
	if (sc_matchtype.length > 0) {
		$s.eVar46 = sc_matchtype;
	} else {
		$s.eVar46 = sc_affiliateid;
	}
};
// 's' replaced with 'fanatics_s_code' on 3/8/2013 - RMC
// 'fanatics_s_code' replaced with '$s' on 7/25/2013 - MA

//	Version Information
//	1.1 - 05/07/2014 - Saved Cart User
//			- added siteCatalyst_savedCardUser()
//	1.2 - ??/??/2014 - Fixed Quick View / Mini Bag
//			- moved call for siteCatalyst_QuickViewAddToCart() to solution
//			- fixed pageName (evar43)
//	1.4 - 08/27/2014 - Added code to strip out e (email) parameter from URL
//	1.5 - 09/03/2014 - Added UTM variables in URL to get stored in eVars
//  1.6 - 09/24/2014 - Fixed source parse to find it anywhere within the URL
//  1.7 - 10/17/2014 - Added recommended products click interaction with Rich Recs and internal distinction
//  1.8 - 10/27/2014 - Added site ID and host name to recommended click throughs

// temporary mobile fix for zoom on PDP
jQuery(document).ready(function () {
    if (jQuery('#pdpMainImageContainer').length) {
        jQuery('#zoomIcon').hide();
        jQuery("a.iPopupContainer").off('click');
    }
});
