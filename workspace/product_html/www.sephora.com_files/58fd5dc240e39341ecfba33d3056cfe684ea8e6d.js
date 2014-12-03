//wa2
wa.config.reportingStates = [{
    NAME: "production",
    HOSTS: ["www.sephora.com", "shop.sephora.com", "sephora.com", "m.sephora.com", "reviews.sephora.com", "community.sephora.com", "s.brandingbrandmobile.com", "beta.sephora.com", "illuminate.becho.net", "www.sephoracanada.com", "birthday.sephora.com", "sephoralove.com", "www.sephoralove.com", "sephoralove.ca", "www.sephoralove.ca", "app.sephora.com", "sephora.skedge.me", "reserve.sephora.com", "canada.sephora.com", "www.sephora.ca", "sephora.ca", "fr-canada.sephora.com", "coloroftheyear.sephora.com", "gallery.sephora.com", "sephora.cashstar.com"],
    SITECATALYST_REPORT: "sephoracom"
}, {
    NAME: "sephora 2.0 beta",
    HOSTS: ["beta.sephora.com", "illuminate.becho.net", "app.sephora.com"],
    SITECATALYST_REPORT: "sephora-2beta"
}, {
    NAME: "sephora canada",
	HOSTS: ["www.sephoracanada.com"],
	SITECATALYST_REPORT: "sephora-canada-prod"
}, {
	NAME: "preproduction",
	HOSTS: ["localhost", "qa.sephora.com", "preview.qa.sephora.com", "staging.merchantmail.net", "sandbox.qa.sephora.com", "origin.qa.sephora.com", "staging.illuminate.sephora.com", "staging.sephora.com", "dev.illuminate.sephora.com", "dev.sephora.com", "qa.illuminate.sephora.com", "m-qa.sephora.com", "m-qa.illuminate.sephora.com", "community.qa.sephora.com", "ebf.sephora.com", "qa-sephora.skedge.me", "dev.reserve.sephora.com", "dev-canada.sephora.com", "fr-dev-canada.sephora.com", "qa-canada.sephora.com", "fr-qa-canada.sephora.com", "fr-sephora-dev.onelink-translations.com", "fr-sephora-qa.onelink-translations.com", "gallery-qa.sephora.com", "sephora-semiprod.cashstar.com", new RegExp("\\d+\\.\\d+\\.\\d+\\.\\d+")],
	SITECATALYST_REPORT: "sephorarenew"
}, {
	NAME: "mobile preproduction",
	HOSTS: ["m-qa.sephora.com", "m-qa.illuminate.sephora.com"],
	SITECATALYST_REPORT: "sephora-mobile-dev"
}, {
	NAME: "mobile production",
	HOSTS: ["m.sephora.com", "s.brandingbrand.com", "illuminate.becho.net", "app.sephora.com"],
	SITECATALYST_REPORT: "sephora-mobile-prod"
}];
wa.config.sitecatalyst = {};
wa.config.orgDomains = ["google.", "bing.", "a9.", "*,q", "abacho.", "ah-ha.", "alexa.", "allesklar.", "wo,words", "alltheweb.", "q,query", "altavista.", "aol.", "arianna.", "query,b1", "asiaco.", "query,qry", "ask.", "q,ask", "atlas.", "austronaut.", "begriff,suche", "auyantepui.", "clave", "bluewin.", "qry,q", "centrum.", "club-internet.", "dino-online.", "dir.com.", "req", "dmoz.", "search", "dogpile.", "q,qkw", "eniro.", "euroseek.", "string,query", "exalead.", "excite.", "search,s,qkw", "findlink.", "key", "findwhat.", "mt", "fireball.", "freeserve.", "gigablast.", "go2net.", "general", "goeureka.", "key", "q,as_q,as_epq,as_oq", "googlesyndication.", "url", "greekspider.", "keywords", "hotbot.", "query,mt", "ilor.", "iltrovatore.", "index.nana.co.il.", "infoseek.", "qt,q", "infospace.", "qkw", "intuitsearch.", "iwon.", "ixquick.", "jubii.", "query,soegeord", "jyxo.", "s", "kanoodle.", "kataweb.", "kvasir.", "live.", "looksmart.", "qt,key,querystring", "lycos.", "query,mt,q,qry", "mamma.", "metacrawler.", "q,general,qry", "msn.", "q,mt", "mywebsearch.", "searchfor", "mysearch.", "netex.", "srchkey,keyword", "netscape.", "search,searchstring,query", "netster.", "nettavisen.", "query,q", "ninemsn.", "nlsearch.", "qr", "nomade.", "mt,s", "northernlight.", "oozap.", "overture.", "ozu.", "passagen.", "quick.", "ftxt_query", "savvy.", "scrubtheweb.", "keyword,q", "www.search.com.", "searchalot.", "searchhippo.", "sensis.", "find", "seznam.", "w", "soneraplaza.", "qt", "splatsearch.", "searchstring", "sprinks.", "terms", "spray.", "srch.", "supereva.", "teoma.", "thunderstone.", "tiscali.ch.", "key", "tjohoo.", "soktext,mt,query", "track.", "truesearch.", "tygo.", "vinden.", "virgilio.", "qs", "vivisimo.", "voila.", "kw", "walla.", "wanadoo.", "fkw", "web.", "su", "webcrawler.", "qkw,search,searchtext", "webwatch.", "findindb", "wepa.", "query", "wisenut.", "xpsn.", "kwd", "ya.", "yahoo.", "p,va,vp,vo", "ynet.", "q", "zerx."];
// processes existing wa object variables to generate content variables
// at the end of this fuction there should exist wa.path and wa.pageName
wa.contentVariables = function() {
	try {
		wa.siteName = wa.config.includeName;
		// reviews.sephora.com
		if (wa.cURL.indexOf('reviews.sephora.com') >= 0) {
			wa.path = ['reviews microsite', document.title];
			wa.pageType = 'reviews microsite';
		}
		// community.sephora.com
		if (wa.cURL.indexOf('community.sephora.com') >= 0) {
			wa.communityPage();
		}
		// site search fix - sale redirect and no results (in lieu of ILLUPH-10346)
		if (wa.isEmpty(wa.path) || wa.isEmpty(wa.path[0])) {
			if (wa.cURL.indexOf('saleResults') >= 0) {
				wa.path = ['sale'];
			} else if (wa.cURL.indexOf('noResults') >= 0) {
				wa.path = ['search', 'no results'];
			}
		}
		// brand content page fix - get value from class=current breadcrumb (in lieu of ILLUPH-10406)
		if (wa.cURL.indexOf('brandStore.jsp') >= 0) {
			if (wa.path.length < 3) {
				if (wa.config.jQueryFound) {
					var currentCrumb = jQuery.trim(jQuery(".current").text().toLowerCase());
					if (!wa.isEmpty(currentCrumb)) {
						wa.path.push(currentCrumb)
						wa.pageType = 'brand content';
					}
				}
			}
		}
		// set a pagename from URL
		if (!(wa.isEmpty(wa.prodViewEvent))) { // if product detail page
			wa.path = [];
			wa.path[0] = 'product';
			wa.path[1] = wa.prodViewEvent.productId;
			wa.path[2] = wa.prodViewEvent.productName;
		} else if (wa.isEmpty(wa.path) || //since wa.path is missing, dynamically build it using the current URL
		wa.isEmpty(wa.path[0])) {
			wa.path = wa.cURL.split('/');
			for (var i = 0; i < wa.path.length; i++) {
				if (wa.path[i].indexOf('http:') >= 0 || wa.path[i].indexOf('.com') >= 0 || wa.isEmpty(wa.path[i])) { //this part of wa.path is not useful
					wa.path.splice(i, 1); //remove this non-useful array element
					i--; //since we removed an array element, decrement the array pointer
				} else { //this part of wa.path is useful
					wa.path[i] = wa.path[i].replace(/.php|.jsp|.cfm|.com|.shtml/g, ''); //remove these filename extensions
					var stringPosition = wa.path[i].indexOf('?'); //and leave off any query string parameters--these begin with ?
					if (stringPosition > 0) {
						wa.path[i] = wa.path[i].substr(0, stringPosition)
					}
				}
			}
		}
		if (wa.isEmpty(wa.path)) {
			wa.path = [];
			wa.path[0] = 'unknown';
		}

		// CN: JIRA 19184 - mobile-web "shop" landing page is an empty category page, scraped for menus
		if (typeof wa.platform != 'undefined' && wa.platform == 'mobile' && wa.path.length > 1 && wa.path[1] == 'categoryContentTemplate') {
			wa.path[1] = 'shop'; // replace categoryContentTemplate with shop
		}
		if (wa.isEmpty(wa.pageName)) {
			wa.setPageName(wa.path.join(':'));
		}
		wa.path = wa.path.join(":").toLowerCase().split(":"); //convert an array to lowercase
		wa.setPageName(wa.getLocLangPrefix() + wa.pageName);
		/* commented out on 1-14-14 there is no s object so this crashed code here. do we need this?
        keep track of previous page's country (to determine when checkout path changes)
		wa.previousCountry = s.getPreviousValue(wa.country, 'gpv_country', '');
        */
        var pSignInStatus = wa.getCookie("pastSignInStatus");
        if(pSignInStatus && pSignInStatus !== wa.signInStatus){
            if(wa.signInStatus == "signed in"){
                wa.userJustSignedIn = true;
            }
        }
        wa.setCookie("pastSignInStatus", wa.signInStatus);
        if(!wa.ajaxOnlyLoadPages()){
          wa.prevPageName = wa.getCookie("prevPageName");
          wa.setCookie("prevPageName", wa.pageName);
        }
	} catch (e) {}
};
// Build pagename for Sephora Lithium Community Site (based on breadcrumb)...
wa.communityPage = function() {
	try {
		var cpName = "";
		var breadcrumb = "";
		var lastCrumb = "";
		var crumbName = "";
		var crumbName1 = "";
		var crumbElement = "";
		var crumb = jQuery(".lia-breadcrumb-node");
		for (var i = 0; i < crumb.length; ++i) {
			if (i != 0) //don't include 1st breadcrumb element
			{
				crumbName = crumb[i].innerHTML.split(">"); //get contents of crumb from HTML beginning with ">"
				crumbName1 = crumbName[1].split("<"); //keep contents of crumb from HTML ending with "<"
				crumbElement = crumbName1[0].toLowerCase().replace(/^\s+|\s+$/g, ""); //convert to lower; trim spaces
				crumbElement = crumbElement.replace(/\&amp;/g, "&"); //replace url-encoded &
				breadcrumb = breadcrumb + ":" + crumbElement;
				if (i == crumb.length - 1) //the last breadcrumb
				{
					lastCrumb = crumbElement.replace(/\u2026/g, "");
				} //u2026 = &hellip; = 3 dot ellipsis
			}
		}
		if (document.title.toLowerCase().indexOf(lastCrumb) == 0) {
			cpName = "Cmnty" + breadcrumb;
		} else {
			cpName = "Cmnty" + breadcrumb + ":" + document.title.toLowerCase().replace(/ - beauty talk/g, "");
		}
		wa.path = cpName.split(':');
		var pageFunction = "";
		if (location.href.indexOf("/forums/") >= 0) // /forums
		{
			startPos = location.href.indexOf("/forums/")
			sliceItem = location.href.slice(startPos + 8);
			sliceItem = sliceItem.split("/");
			pageFunction = sliceItem[0];
		} else if (location.href.indexOf("td-p") >= 0) {
			pageFunction = "threads page";
		} else if (location.href.indexOf("bd-p") >= 0) {
			pageFunction = "boards page";
		} else if (location.href.indexOf("ct-p") >= 0) {
			pageFunction = "category page";
		} else if (location.href.indexOf("qaq-p") >= 0) {
			pageFunction = "question page";
		} else if (location.href.indexOf("m-p") >= 0) {
			pageFunction = "message page";
		} else if (location.href.indexOf("viewprofilepage") >= 0) {
			pageFunction = "profile page";
		} else if (location.href.indexOf("gallerypage") >= 0) {
			pageFunction = "gallery page";
		} else if (location.href.indexOf("tag") >= 0) {
			pageFunction = "tag page";
		} else {
			pageFunction = "unknown page";
		}
		wa.pageType = wa.path[0] + ":" + pageFunction;
		wa.communitySearchTerm = wa.getQueryParam('q', wa.cURL).toLowerCase();
	} catch (e) {}
};
// creates marketing related wa variables
wa.campaignVariables = function() {
	try {
		wa.cURL = location.href.replace(/%3d/g, '='); // current
		wa.rURL = document.referrer; // referrer
		// facebook like referrer bug substitution
		// fb widgets randomly set referrers that are not true in certain IE versions
		if ((wa.rURL.indexOf('facebook.com') >= 0) && (wa.rURL.indexOf('like.php') >= 0)) {
			// if referrer is set but false pretend referrer is internal
			wa.rURL = 'http://www.sephora.com/facebook-like-php-dummy';
			wa.facebookBug = true;
		} else {
			wa.facebookBug = false;
		}
		// esv used to insert unique click ids into campaign codes
		// this logic strips out these click ids if they exist
		if (wa.cURL.indexOf('us_search-') > 0 || wa.cURL.indexOf('ca_search-') > 0) {
			if (wa.cURL.indexOf('-gg-') > 0 || wa.cURL.indexOf('-ya-') > 0 || wa.cURL.indexOf('-msn-') > 0 || wa.cURL.indexOf('-ask-') > 0) {
				var target = 0;
				if (wa.cURL.indexOf('{esvcid}') > 0) {
					target = wa.cURL.indexOf('{esvcid}');
				} else if (wa.cURL.indexOf('_agi') > 0) {
					target = wa.cURL.indexOf('_agi');
				}
				if (target > 0) {
					var endSlice = wa.cURL.lastIndexOf('-_-', target);
					wa.cURL = wa.cURL.slice(0, endSlice);
				}
			}
		}
		// campaign tracking code
		if (wa.getQueryParam('om_mmc', wa.cURL)) {
			// current tracking code
			wa.campaign = wa.getQueryParam('om_mmc', wa.cURL).toLowerCase();
		} else if (wa.getQueryParam('cm_mmc', wa.cURL)) {
			// depreciated coremetrics tracking code
			wa.campaign = wa.getQueryParam('cm_mmc', wa.cURL).toLowerCase();
		} else if (wa.rURL.toLowerCase().indexOf('blog.sephora.com') > -1) {
			// hard code campaign from blog.sephora.com
			wa.campaign = 'blog-sephora';
		} else if (!wa.isEmpty(wa.pageCampaign)) {
			// allow campaign to be set on page
			wa.campaign = wa.pageCampaign;
		} else if (wa.iPadApp) {
			wa.campaign = 'iPadApp-' + wa.appVersion;
		} else if (wa.iPhoneApp) {
			wa.campaign = wa.platform;
		}
		//**** URS logic
		if (!wa.isEmpty(wa.campaign)) {
			// create channel variable if campaign
			if (wa.getQueryParam('cm_mmc', wa.cURL) && wa.campaign.indexOf('us_') === 0) {
				var splitChannel = wa.campaign.split('_', 2);
				if (typeof splitChannel[1] == 'undefined') {
					splitChannel[1] = '';
				}
				wa.ursChannel = splitChannel[0] + '_' + splitChannel[1];
			} else {
				splitChannel = (wa.getQueryParam('cm_mmc', wa.cURL)) ? wa.campaign.split('_', 1) : wa.campaign.split('-', 1);
				wa.ursChannel = splitChannel[0];
			}
			wa.ursCampaign = wa.campaign;
			if (wa.ursChannel.indexOf('esv') == 0) { //replace esvXXXXXXXX with esv
				wa.ursChannel = 'esv';
			}
		}
		wa.rDomain = wa.rURL.replace(/(\/\/[^\/]+\/).*/, '$1');
		wa.rDomain = wa.rDomain.replace(/www.|http:|https:|\//g, '');
		if (wa.config.internalHosts.join(',').indexOf(wa.rDomain) >= 0) //don't process internal domains as referrers
		{
			wa.rURL = wa.rDomain = '';
		}
		if (!(wa.isEmpty(wa.campaign) && wa.isEmpty(wa.rDomain))) {
			var domainFound = '';
			for (var i = 0; i < wa.config.orgDomains.length; ++i) {
				if (domainFound != '') {
					var orgParams = wa.config.orgDomains[i].split(',');
					for (var j = 0; j < orgParams.length; j++) {
						var parsekw = wa.getQueryParam(orgParams[j], wa.rURL);
						if (parsekw) {
							if (wa.ursCampaign) {
								wa.paidSearchKeyword = parsekw;
							} else {
								wa.ursCampaign = wa.rDomain + ' [seo]';
								wa.naturalSearchKeyword = parsekw;
								wa.ursChannel = 'Natural Search or SEO';
							}
							break; //search keyword parameter was found--we can get out of the loop
						}
					}
					if (domainFound == "google." && !("ursCampaign" in wa)) { //checks for google encrypted organic search (keyword is missing in referring URL)
						wa.ursCampaign = wa.rDomain + ' [seo]';
						wa.naturalSearchKeyword = parsekw = "[google encrypted]";
						wa.ursChannel = 'Natural Search or SEO';
					}
					break; //no search keyword parameter was found for this referring URL--we can get out of the loop
				}
				if (wa.config.orgDomains[i].indexOf('.') >= 0 && wa.rURL.indexOf(wa.config.orgDomains[i]) >= 0) {
					domainFound = wa.config.orgDomains[i];
				}
				if (parsekw) {
					break;
				}
			}
			if (!parsekw && !wa.campaign && wa.rDomain) {
				wa.ursCampaign = wa.rDomain + ' [ref]';
				wa.ursChannel = 'Referrals';
			}
		}
		//**** end URS logic
		// esv paid search tracking
    	if (wa.getQueryParam('om_kwpur', wa.cURL)) {
			wa.keywordID = wa.getQueryParam('om_kwpur', wa.cURL);
		} else if (wa.getQueryParam('mkwid', wa.cURL)) {
			wa.keywordID = wa.getQueryParam('mkwid', wa.cURL);
		}

		if (wa.getQueryParam('cid', wa.cURL)) {
			wa.creativeID = wa.getQueryParam('cid', wa.cURL);
		}
		// email tracking ad integration
		if (wa.getQueryParam('emtc', wa.cURL)) {
			wa.emailTrackingCode = wa.getQueryParam('emtc', wa.cURL); // tracking code
		} else if (wa.ursCampaign) {
			wa.emailTrackingCode = 'non-email source';
		}

		if (wa.getQueryParam('ematg', wa.cURL)) {
			wa.emailATGID = wa.getQueryParam('ematg', wa.cURL); // atg id
		}
		// isolate affiliate id
		if (!wa.isEmpty(wa.campaign) && wa.campaign.toLowerCase().indexOf('aff-linkshare') > -1) {
			var affiliateMatch = wa.campaign.match(new RegExp('([^-]*)$'));
			if (!wa.isEmpty(affiliateMatch) && affiliateMatch.length > 0) {
				wa.affiliateId = affiliateMatch[0];
			}
		}
		// internal campaign
		if (wa.getQueryParam('icid', wa.cURL)) {
			wa.internalCampaign = wa.getQueryParam('icid', wa.cURL);
			wa.oldInternalCampaign = wa.getQueryParam('icid', wa.cURL);
		} else if (wa.getQueryParam('icid2', wa.cURL)) {
			wa.internalCampaign = wa.getQueryParam('icid2', wa.cURL);
		} else if (wa.getQueryParam('int_cid', wa.cURL)) {
			wa.internalCampaign = wa.getQueryParam('int_cid', wa.cURL);
			wa.oldInternalCampaign = wa.getQueryParam('int_cid', wa.cURL);
		}
		// google search rank
		if (wa.rURL.indexOf('.google.') >= 0) {
			if (wa.getQueryParam('cd', wa.rURL)) {
				wa.googleSearchDomain = wa.rDomain;
				wa.googleSearchRank = wa.getQueryParam('cd', wa.rURL);
			}
		}

	} catch (e) {}
};
// Platform (e.g., mobile, iPhone & iPad) variables processing
wa.platformVariables = function() {
	try {
		wa.userAgent = navigator.userAgent;
		var iPadAppIndex = wa.userAgent.indexOf('Sephora_iPad');
		if (iPadAppIndex > 0) {
			wa.iPadApp = true;
			wa.appVersion = wa.userAgent.substring(iPadAppIndex);
			wa.platform = wa.appVersion;
		} else if (typeof mobilePlatform == "undefined") {
			if (typeof orignPage == "undefined") {
				wa.platform = 'web';
			} else {
				wa.platform = 'mobile';
			}
		} else {
			cookieValue = getCookie("appVersion");
			if (!isVarEmpty(cookieValue)) {
				wa.iPhoneApp = true;
				wa.platform = cookieValue;
			}
		}
	} catch (e) {}
};
/*
 * Gets client date and adjusts to PST...
 */
wa.getLocalDate = function() {
	try {
		var pstOffset = '-8';
		var clientDate = new Date();
		var utcDate = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
		var serverDate = new Date(utcDate + (3600000 * (pstOffset)));
        var _m = (serverDate.getMonth() + 1);
        var _d = serverDate.getDate();
		return (serverDate.getFullYear() + '|' + (_m<10 ? "0"+_m : _m) + '|' + (_d<10?"0"+_d:_d) );
	} catch (e) {}
};

wa.clearSiteCatalystVariables = function() {
  try {
    s.pageName = s.channel = s.events = s.products = s.purchaseID = s.zip = s.state = '';
    s.linkTrackEvents = s.linkTrackVars = "None";
    for (var i = 1; i <= 75; i++) {
      delete s['prop' + i];
      delete s['eVar' + i];
      delete s['hier' + i];
      delete s['list' + i];
    }
  } catch (e) {}
};

// executes on every pageview
wa.init = function() {
	wa.campaignVariables();
	wa.contentVariables();
	wa.platformVariables();
	wa.pageNamePrefix = ""
	/*(bt_cookie("site_locale") != "us") ? (bt_cookie("site_locale") + ":" + bt_cookie("site_language") + ":") : "";*/
	// exclude certain useragents from making analytics calls
	wa.excludeUserAgent = false;
	wa.excludeUserAgent = (wa.userAgent.indexOf('GomezAgent') > -1) ? true : wa.excludeUserAgent;
	wa.excludeUserAgent = (wa.userAgent.indexOf('KTXN') > -1) ? true : wa.excludeUserAgent;
	wa.excludeUserAgent = (wa.userAgent.indexOf('Google Web Preview') > -1) ? true : wa.excludeUserAgent;
	// hack to prevent extra server calls for online reservations cross-domain iframes
	if (wa.cURL.indexOf('xdm_e=') != -1) {
		wa.allowPageView = false;
	}

	wa.waTagNodeComplete = true;
	$("body").trigger("waTagNodeReady");
};
wa.ajaxOnlyLoadPages = function() {
	return /category|brand|search/.test(wa.pageType) || (/coloriq/.test(wa.pageType) && (wa.path.indexOf("results") > -1 || wa.path.indexOf("brand") > -1) || (/skincareiq/.test(wa.pageType) && wa.path.length > 1 && wa.path[1].indexOf("skin concern") > -1));
};
wa.waInitReady = true;

//Takes a target element and tests whether or not it has been clicked before.  To avoid double tracking.


$("body").trigger("waInitReady");
(function() {
	var host = location.hostname.toLowerCase();
	// build sitecatalyst account string
	wa.config.sitecatalyst.scReports = '';
	wa.config.internalHosts = new Array();
	for (var len = wa.config.reportingStates.length, i = 0, found = 0; i < len; i++) {
		var state = wa.config.reportingStates[i];
		if (wa.inStringRegExpList(state.HOSTS, host)) {
			wa.config.sitecatalyst.scReports += (found > 0) ? ',' + state.SITECATALYST_REPORT : state.SITECATALYST_REPORT;
			wa.config.internalHosts = wa.config.internalHosts.concat(state.HOSTS);
			found++;
		}
	}
	if (wa.config.sitecatalyst.scReports == '') {
		wa.config.sitecatalyst.scReports = 'sephorarenew';
	}
})()
wa.init();