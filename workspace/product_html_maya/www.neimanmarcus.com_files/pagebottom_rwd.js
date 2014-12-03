// JSLint settings:
/*global
 alert,
 clearTimeout,
 console,
 jQuery,
 setTimeout
 */

var nm = window.nm || {};
nm.endeca = nm.endeca || {};

nm.endeca.searchBox = (function ($) {
	// Strict mode.
	'use strict';

	var qry = "", ac, isSale = false, url, isSecure = false, selected = false;

	function init(b_isSecure, s_url, position) {
		url = s_url;
		isSecure = b_isSecure;

		//var searchFormInputs = $('#brandheader form input#searchInput, header form input#searchInput, form#mobile-search-form input#mobile-search-input');
		var searchForms = $('#brandheader form.searchBox, header form, form#mobile-search-form');

		if (searchForms.length < 1) {
			searchForms = $('#searchnav form input#searchInput');
			if (searchForms.length < 1) {
				searchForms = $('#prodSearchBox form input#searchInput, #saleDISearch form input#searchInput');
			}
			isSale = true;
		}

		if (searchForms.length > 0 && $(window).scrollTop() === 0) {
			$.each(searchForms, function (index, searchForm) {
				var searchInput = $(searchForm).find('[type="text"]');

				if (searchInput.length > 0 && (searchInput[0].id=="brSearchInput" || searchInput[0].id=="mobileBrSearchInput" ))
					return;
				//  removed looping - sleija
				//if ($('form input[type="text"]').not('#brandheader form input, .sitefooter form input, form input#searchInput').length <= 0) {
				if (searchInput.find(".showCursor").val() === 'Y' && !isTouchEnabled()) {
					searchForm.focus().val('');
				}
				//}

				searchInput.one('focus', function () {
					if (searchInput.val() === nm.endeca.defaultSearchText && !nm.endeca.newLCSearch) {
						searchInput.val('');
					}
				});

				var sourceStr = "/suggest";
				if (isSale) {
					sourceStr = "/suggest?saletree=true";
				}

				searchInput.data("useSuggest", "NO");

				var options = {
					source: sourceStr,
					minLength: 3,
					appendTo: '#' + searchForm.id + '-suggest',
					search: function (e, ui) {
						qry = searchInput.val().toLowerCase().replace(/^\s+/, '');
					},
					focus: function (e, ui) {
						searchInput.data("useSuggest", "YES");
					},
					select: function (e, ui) {
						selected = true;
					},
					close: function (e, ui) {
						if (selected) {
							$(searchForm).submit();
						}
					}
				};

				if (position === 'relative') {
					options.position = {
						my: 'top left',
						at: 'top left',
						of: '#' + searchForm.id + '-suggest'
					};
				}

				ac = searchInput.autocomplete(options);

				ac.data("ui-autocomplete")._renderItem = function (ul, item) {
					var idx = item.label.toLowerCase().indexOf(qry);
					if (idx > -1) {
						item.label = item.label.substring(0, idx) + "<span class='match'>" + item.label.substr(idx, qry.length) + "</span>" + item.label.substring(idx + qry.length);
					}
					return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
				};
			});
		}
	}

	function runSearch(obj) {
		var searchFormObj = $(obj), val, strippedVal, searchInput = searchFormObj.find('[type=text]');

		//console.info(obj);
		//console.info(searchInput);

		if (searchInput) {
			val = searchInput.val();
			strippedVal = val.replace(/^\s+/, '');
		} else {
			//form behavior has not been initialized because the user interacted with the search before the script call
			isSecure = ("https:" === document.location.protocol);
			val = searchInput.val();
			strippedVal = val.replace(/^\s+/, '');
		}
		if (strippedVal !== '' && val !== nm.endeca.defaultSearchText) {

			if (searchInput.data("useSuggest") === "YES") {
				searchFormObj.find('.usedTypeAhead').val(searchInput.val());
				searchFormObj.find('.typedValue').val(qry);
			}

			if (isSecure) {
				window.location = url + "?N=0&Ntt=" + escape(utf8_encode(searchInput.val()));
				return false;
			} else {
				//document.searchBox.submit();
				return true;
			}
		} else {
			return false;
		}
	}

	function utf8_encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}

	function startSearch(brand) {
		var screenWidth = $(window).width();
		if (brand === 'Neiman Marcus Last Call' && screenWidth > 767 && !nm.util.isMobile()) {
			var boxWidth = 725;
			if (screenWidth < 860) {
				boxWidth = screenWidth - 220;
			} else if (screenWidth < 920) {
				boxWidth = screenWidth - 230;
			} else if (screenWidth <= 1024) {
				boxWidth = screenWidth - 265;
			}
			var sboxWidth = boxWidth.toString() + "px";
			$('#searchInput').animate({width: sboxWidth, height: "40px"}, 300).show();
			$('.promoitems').hide();
			$('#searchIcon').animate({height: "31px", width: "41px", paddingTop: "8px"}, 300).show();
			//$('html, body').animate({scrollLeft: $("#searchInput").offset().top}, 300);

			$('#searchInput').addClass("enlargedSearchTextRich");
			var srchInput = document.getElementById("searchInput");
			moveCaretToStart(srchInput);

			// Work around for chrome & safari
			window.setTimeout(function () {
				moveCaretToStart(srchInput);
			}, 100);
		}
	}

	function moveCaretToStart(el) {
		if ($('#searchInput').val() === nm.endeca.defaultSearchText) {
			$('#searchInput').removeClass("enlargedSearchTextRich").addClass("enlargedSearchTextNormal");
			if (typeof el.selectionStart === "number") {
				el.selectionStart = el.selectionEnd = 0;
			}
			else if (typeof el.createTextRange !== "undefined") {
				el.focus();
				var range = el.createTextRange();
				range.collapse(true);
				range.select();
			}
		}
	}

	$('#searchInput').mouseup(function () {
		if (nm.endeca.newLCSearch) {
			moveCaretToStart(document.getElementById("searchInput"));
		}
	});

	$('#searchInput').keydown(function () {
		if (nm.endeca.newLCSearch) {
			if ($('#searchInput').val() === nm.endeca.defaultSearchText) {
				$('#searchInput').val('');
			}
			$('#searchInput').removeClass("enlargedSearchTextNormal").addClass("enlargedSearchTextRich");
		}
	});

	$('#searchInput').keyup(function () {
		if (nm.endeca.newLCSearch) {
			if ($('#searchInput').val() === '') {
				$('#searchInput').val(nm.endeca.defaultSearchText);
				$('#searchInput').removeClass("enlargedSearchTextRich").addClass("enlargedSearchTextNormal");
				$('#searchInput')[0].setSelectionRange(0, 0);
			}
		}
	});

	$("#searchIcon").mouseover(function () {
		$(this).attr("src", "/category/search/images/search_go_yellow.png");
	});

	$("#searchIcon").mouseout(function () {
		$(this).attr("src", "/category/search/images/search_go_gray.png");
	});

	return {
		init: init,
		runSearch: runSearch,
		startSearch: startSearch
	};
})(jQuery.noConflict());
/* SiteCatalyst code version: H.27.4
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
/*Last Modified Date - 10/09/2014 */

/* Get Load Time */
s_getLoadTime();

/* Determine Brand, Country Code, Currency Code */
function s_setRSID(s){

	var
		/* list of country names (values must correspond to CCs below) */
		CNs= 'Antigua and Barbuda|Argentina|Aruba|Australia|Austria|Bahrain|Bangladesh|Barbados|Belgium|Belize|'
			+'Bermuda|Bolivia|Brazil|Brunei Darussalam|Bulgaria|China|Cambodia|Canada|Cayman Islands|Chile|'
			+'Colombia|Costa Rica|Cyprus|Czech Republic|Denmark|Dominica|Dominican Republic|Ecuador|Egypt|El Salvador|'
			+'Estonia|Finland|France|French Guiana|Germany|Gibraltar|Greece|Grenada|Guadeloupe|Guatemala|'
			+'Guernsey|Honduras|Hong Kong|Hungary|Iceland|India|Indonesia|Ireland|Israel|Italy|'
			+'Jamaica|Japan|Jersey|Jordan|Korea, Republic of|Kuwait|Latvia|Liechtenstein|Lithuania|Luxembourg|'
			+'Macao|Maldives|Malta|Martinique|Mexico|Monaco|Montserrat|Netherlands|New Zealand|Nicaragua|'
			+'Norway|Oman|Pakistan|Panama|Paraguay|Peru|Philippines|Poland|Portugal|Qatar|'
			+'R?union|Reunion|R?union|Romania|Russia|Russian Federation|Saint Kitts and Nevis|Saint Lucia|Saudi Arabia|Singapore|'
			+'Slovakia|Slovenia|South Africa|Spain|Sri Lanka|Sweden|Switzerland|Taiwan|Thailand|Trinidad and Tobago|'
			+'Turkey|Turks and Caicos Islands|UAE|United Arab Emirates|United Kingdom|United States',
		/* list of country codes (values must corresond to CNs above) */
		CCs= 'ag|ar|aw|au|at|bh|bd|bb|be|bz|'
				+'bm|bo|br|bn|bg|cn|kh|ca|ky|cl|'
				+'co|cr|cy|cz|dk|dm|do|ec|eg|sv|'
				+'ee|fi|fr|gf|de|gi|gr|gd|gp|gt|'
				+'gg|hn|hk|hu|is|in|id|ie|il|it|'
				+'jm|jp|je|jo|kr|kw|lv|li|lt|lu|'
				+'mo|mv|mt|mq|mx|mc|ms|nl|nz|ni|'
				+'no|om|pk|pa|py|pe|ph|pl|pt|qa|'
				+'re|re|re|ro|ru|ru|kn|lc|sa|sg|'
				+'sk|si|za|es|lk|se|ch|tw|th|tt|'
				+'tr|tc|ae|ae|gb|us',
		W=window, //shorthand for window
		loCNs = ["china","uae","bahrain","kuwait","saudi arabia","qatar"]; //array of localized country names
		loCCs= ["cn","ae","bh","kw","sa","qa"];  //array of localized country codes
		var rsCN="";
		isLocalized=function(cn,cc){ //determine if content is localized
			cn=typeof cn=='string'?cn.toLowerCase():'';
			cc=typeof cc=='string'?cc.toLowerCase():'';
			var inLoCN= s_checkArray(cn,loCNs);
			var inLoCC= s_checkArray(cc,loCCs);
			if(inLoCN===true||inLoCC===true){
				//group countries into middle east report suite
				if(cc=="ae"||cc=="bh"||cc=="kw"||cc=="sa"||cc=="qa")rsCN="middleeast";
				else rsCN=cn;
			rsCN=rsCN.replace(/\s/g, '');	//remove spaces from country name
			}
			return inLoCN||inLoCC;
		};

	W.s_account=(W.s_account||'').toLowerCase(); //set s_account to empty string if undefined, make lower case
	if(typeof W.s_accountO!='string')W.s_accountO=W.s_account; //if this the first time we're setting the RSID, save original s_account value
	W.s_accountP=W.s_account; //save previous s_account value (in order to subsequently detect if it changed)

	s=typeof W.s=='object'?W.s:{}; //get pointer to the s object, or a dummy if it doesn't exist yet

	/* Determine country name and code */
	var cn=s_scrubWS(
					(typeof W.s_prop51=='string'?s_prop51:'')	//set country name from NM global variable if present,
					||(typeof s.prop51=='string'?s.prop51:'')		//or from s.prop51 if present,
					||(typeof s.eVar34=='string'?s.eVar34:'')); //or from s.eVar34 if present,
	var cc=(s_matchList(cn,CNs,CCs,'|',-1) //set country code by lookup on country name,
					||(typeof W.s_prop13=='string'&&s_prop13.length==2?s_prop13:'') //if not found, look in s_prop13,
					||(typeof s.prop13=='string'&&s.prop13.length==2?s.prop13:'') //if not found, look in s.prop13,
					||(typeof s.eVar44=='string'&&s.eVar44.length==2?s.eVar44:'') //if not found, look in s.eVar44,
					||'us').toLowerCase(); //else default to U.S.
	W.NM_cc=cc; //save country code in global variable

	if(!s.prop13)s.prop13=cc; //save country code in prop13
	if(!s.eVar44)s.eVar44=cc; //save country code in eVar44
	if(!cn)cn=cc?s_matchList(cc,CCs,CNs,'|',-1):'United States'; //if we have a country code and not a name, lookup country name using code, else default to United States
	W.NM_cn=cn; //save country name in global variable
	if(!s.prop51)s.prop51=cn; //save country name in prop
	if(!s.eVar34)s.eVar34=cn; //save country name in eVar

	/* Determine language code */
	var bod=document.getElementsByTagName('body')[0]; //get pointer to body element
	var lc=(bod?bod.lang:'')||(typeof s.prop14=='string'&&s.prop14)||'en'; //language code check: html body tag, prop14, else default to English
	lc=s_scrubWS(lc.toLowerCase()).substring(0,2); //clean up language code
	W.NM_lc=lc; //save language code in global variable
	if(!s.prop14)s.prop14=lc; //save language code in prop14

	/* Determine currency code */
	if(!s.currencyCode)s.currencyCode='USD'; //Set to U.S. Dollars if undefined

	/* Determine brand */
	var br=s_scrubWS(
			(typeof W.s_prop50=='string'?s_prop50:'') //set brand from NM global variable if present,
		||(typeof s.prop50=='string'?s.prop50:'')); //or from s.prop50 if present
	if(!br){ //if brand still unknown, try to determine it from the url
				 if(h.indexOf('neimanmarcus')>-1||h.indexOf('wntest')>-1||h.indexOf('wn.test')>-1)br='nm';
		else if(h.indexOf('bergdorfgoodman')>-1||h.indexOf('wbtest')>-1)br='bg';
		else if(h.indexOf('horchow')>-1||h.indexOf('whtest')>-1)br='hc';
		else if(h.indexOf('cusp')>-1||h.indexOf('cutest'))br='cu';
		else if(h.indexOf('lastcall')>-1||h.indexOf('lc'))br='lc';
		else if(h.indexOf('mynmg')>-1)br='mynmg';
		else if(h.indexOf('michaelkors')>-1||h.indexOf('mk')>-1)br='kors';
		else if(h.indexOf('incircle')>-1)br='incircle';
		else if(h.indexOf('davidyurman')>-1)br='yurman';
	}
	br=s_scrubWS(br||'nm').toLowerCase(); //if not set, assume brand is 'nm' for Neiman Marcus, clean up
	W.NM_br=br; //save brand in global variable
	if(!s.prop50)s.prop50=br; //save brand in prop50

	/* Determine if this is a localized non-U.S. site */
	var lo=isLocalized(cn,cc);
	W.NM_lo=lo; //save in global variable
	W.NM_loCN=rsCN;  //save in global variable

	/* Determine if on a mobile app */
	var appType=s_getQueryStr('type')||s_c_r('exp_type'); //Check for 'type' query string or app type cookie
	if(appType)s_c_w('exp_type',appType); //set (or reset) app type cookie if there's an app type

	/* Determine if on a dev/qa/prod, and if original s_account was set to a brand-country suite */
	var h=s_getShortHn().toLowerCase(); //get hostname of the current url
	var dev=s_accountO.match(/dev$/)||W.NM_dev?'dev':''; //DEV site? check: end of original s_account, NM global dev variable
	var qa=!dev&&(s_accountO.match(/qa$/)||h.indexOf('test')>-1||W.NM_qa)?'qa':''; //QA site? check: end of original s_account, hostname, NM global dev variable
	var prod=qa||dev?'':'prod'; //production site?
	var brandc=s_accountO.indexOf('nmgincglobal')==0; //is the original s_account value a brand-country suite?

	/* Set and return RSIDs */
	var rsid=s_accountO; //assume the RSID will remain unchanged from the original s_account value
	
	if(appType=='CFA'){ //if on a mobile app
		rsid='nmgincnmstoreappprod'; //set primary RSID to mobile app suite
	}else if(appType=='CFAdev'){ //if on a mobile app in dev environment
		rsid='nmgincnmstoreappdev'; //set primary RSID to mobile app dev suite
	}else if(brandc){ //if on a country-brand site
		if(lo===true){ //if on a localized site
			rsid='nmgincintlglobal'+dev+qa+prod+',nmginc'+br+rsCN+dev+qa+prod; //set the primary suite to the localized global dev/prod/qa suite
		}
		rsid+=',nmgincglobalww'+dev+qa+prod; //add the global world-wide suite as secondary
	}
	if(!rsid)rsid='nmgincglobaldev'; //if we still don't have an rsid value, set to global dev
	
	W.s_account=rsid; //set s_account to the value determined in this function
   
	return W.s_account!=W.s_accountP; //return true if the s_account value has changed
}

s_setRSID(); //set the s_account value
var s=s_gi(s_account)

/************************** CONFIG SECTION **************************/
s.trackDownloadLinks=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.trackExternalLinks=true
if(s_account=="nmgincglobal"){s.trackExternalLinks=true}
s.linkInternalFilters="javascript:,pinterest.com,www.facebook.com,twitter.com," + document.domain
s.trackInlineStats=true
s.linkLeaveQueryString=false
s.linkTrackVars="prop50"
s.linkTrackEvents="None"
s.ActionDepthTest=true;
s.cookieDomainPeriods="2"
s.fpCookieDomainPeriods="2"
s.charSet=""

/* Cookie Config */
s.pers="s_pers"
s.sess="s_sess"

/* Configure Modules and Plugins */
s.maxDelay='3000'; //max time to wait for 3rd party api response in milliseconds
s.loadModule("Integrate")
s.Integrate.onLoad=function(s,m){
s.socialAuthors();
/*add other integration module dependent functions here*/
};


/* WARNING: Changing the visitor namespace will cause drastic changes
to how your visitor data is collected.  Changes should only be made
when instructed to do so by your account manager.*/
s.visitorNamespace="neimanmarcus"
s.trackingServer="om.neimanmarcus.com" //identifies tracking server domain for unsecure (http) traffic
s.trackingServerSecure="oms.neimanmarcus.com" //identifies tracking server domain for secure (https) traffic
s.dc=112 //specifies that your data should go to the San Jose data center

/* DynamicObjectIDs config */
function s_getObjectID(o) { 
var m=!(!(s._dynamicObjectIDs_URLMatch))?s.split(s._dynamicObjectIDs_URLMatch,','):'',n=!(!(s._dynamicObjectIDs_Include)),v=s.split(s._dynamicObjectIDs_RemoveQSP,','),w,j,k=true,ID=o.href; 
if(m.length>0) 
for(j=0;j<m.length&&k;j++){ 
k=((!n&&ID.indexOf(m[j])<0)||(n&&ID.indexOf(m[j])>-1)); 
if(!k)ID=''; 
} 
for(w=0;w<v.length;w++){ 
ID=ID.replace(new RegExp('&'+v[w]+'=[^&]*','i'),'');ID=ID.replace(new RegExp('\\?'+v[w]+'=[^&]*&','i'),'?'); 
} 
return ID;} 
s.getObjectID=s_getObjectID 


/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {

if(s_setRSID())s.sa(s_account); //if the s_account value changed, re-inititlize s object with new RSID value(s)

/* set visitorID with mobile app visitor cookie value  */
if (s.getQueryParam('appvi')) {
	s.new_vi_date=new Date;
    s.new_vi_date.setFullYear(s.new_vi_date.getFullYear() + 5);
    s.c_w('app_vi',s.getQueryParam('appvi'),s.new_vi_date);
    s.visitorID=s.c_r('app_vi');
}
else if (s.c_r('app_vi')) {
    s.visitorID=s.c_r('app_vi');
}
	/* get load time - product plugin */
	var t=s_getLoadTime();
	if(t<0)t=0;
	if(t>999)t=999;
	if(t)t=Math.floor(t/10);
	if(t)s.events=s.apl(s.events,'event46='+t,',',1);

	/* items to track only on page load */
	if (s.eo === undefined) {
		//capture dwell time on page
		var oldTime=""
		var loadTime=Math.round(new Date().getTime()/1000.0);  
		var oldTime=s.c_r('orgTime');

		if (!oldTime==""&&oldTime<=loadTime){
			var calc=loadTime-oldTime;
		}
		else if (oldTime==""){
			calc = "start of session"
		}
		s.prop57=calc;
	
		s.c_w('orgTime',loadTime,0);
	}

	/*Set device type*/
	var width=s.browserWidth;
	if(width>1024)
		s.prop35="desktop";
	else if(width>900 && width<=1024)
		s.prop35="tablet(landscape)";	
	else if(width>=768 && width<=900)
		s.prop35="tablet(portrait)";
	else if(width>=480 && width<767) 
		s.prop35="mobile(landscape)";
	else if(width<480) 
		s.prop35="mobile(portrait)";
	

	/*channel manager - used to capture natural search as a PFM*/
	s.channelManager('ecid');
	if (s._channel){
	if(s._channel&&s._channel=='Natural Search'){
		s.eVar4=s._channel;
	}
	//Remove plus signs from keywords where plus signs weren't originally used
	if(s._keywords.indexOf('+')==0)
		s._keywords=s._keywords.replace('+','  ');
	 s._keywords=s.repl(s._keywords,'+',' ');
	 s._keywords=s.repl(s._keywords,'  ',' +').replace(/^\s+/,"");
		
	}
	// overwrite referrer if needed
	var ref=s.getQueryParam('ref')
	if(ref){s.referrer=ref}
	
	// external campaigns
	if(!s.campaign){var extCampaign=s.getQueryParam('ecid')}
	s.prop7=extCampaign;
	checkVal=s.getValOnce(extCampaign,"s_v0",0); //checks to see if value has already previously been set in cookie, if not set s.campaign
	if(!checkVal==""){  
		s.campaign=extCampaign;
		s.eVar1=s.campaign;
	}
	
	// internal promo codes
	var intCampaign=s.getQueryParam('icid')
	checkVal=s.getValOnce(intCampaign,"s_v3",0);
	if(!checkVal=="")
		s.eVar3=intCampaign;
		
// create content hierarchy from s.hier1 or s.pageName variables
	var tempContentHier;
	if(s.hier1)
		tempContentHier=s.split(s.hier1,'|');
	else if(s.pageName)
		tempContentHier=s.split(s.pageName,':');

	if(tempContentHier){
		if(tempContentHier[0])
			s.channel=tempContentHier[0];		
	}
	// channel and server
	if(!s.channel){s.channel="Misc"}
	s.server=document.domain
	
	/*determine whether a visitor is a new or repeat visitor within the last 365 days  */
	s.eVar65=s.getNewRepeat(365);
	if((s.eVar65&&s.eVar9)&&(s.eVar65=='New'&&s.eVar9=='logged in'))
		s.eVar65='Repeat';

	/*Set eVar6 equal to prop2. Set eVar16 equal to prop4.  Add event2 to the list of events when prop2 has a value.  
	When no results are returned, set prop3 equal to "zero" and add event66 to the list of events.  */
	if(s.prop2)
	{
		s.prop2=s.prop2.toLowerCase();
		s.eVar6=s.prop2;
		s.eVar16=s.prop4;
		s.events=s.apl(s.events,'event2',',',2);
		if(s.prop3&&(s.prop3=='0'||s.prop3=='zero'))
		{
			s.prop3='zero';
			s.events=s.apl(s.events,'event66',',',2);
		}
	}
	/* Do not refire search event if the same search term passed in twice */
	var t_search=s.getValOnce(s.eVar6,'s_stv',0);
	if(t_search=='')
	{	
		var a=s.split(s.events,',');
		var e='';
		for(var i = 0; i < a.length ; i++ )
		{
			if(a[i]=='event2'||a[i]=='event66')
				continue;
			else
				e += a[i]?a[i]+',':a[i];
		}
		s.events=e.substring(0,e.length-1);
	}

	// clear prop3/4 for quick view in cusp
	if(s.prop50 == 'cu' && s.prop1 && s.prop1.indexOf('Quick') > -1) {
	    delete s.prop3;
	    delete s.prop4;
	}
	
	var time= getDateTime(365);
	// linked email 
	if(s.eVar29){
		s.c_w('s_v29',s.eVar29,time);
	checkVal=s.getValOnce(s.eVar29,"gvo_v29",0);
	if(checkVal=="")
		delete s.eVar29; //remove from image request
	}
	// profile email and historical ID
	if(s.eVar49){
		s.c_w('s_v49',s.eVar49,time);
	checkVal=s.getValOnce(s.eVar49,"gvo_v49",0);
	if(checkVal=="")
		delete s.eVar49; //remove from image request
	}
	
	// customer segment
	if(s.prop5){
		s.c_w("s_v17",s.prop5,time);
		s.eVar17=s.prop5;
	}
	if(s.prop8){
		s.c_w("s_v18",s.prop8,time);
		s.eVar18=s.prop8;
	}
	if(s.prop10){
		s.c_w("s_v20",s.prop10,time);
		s.eVar20=s.prop10;
	}
	//ATG Web Profile ID
	if(s.prop9){
		s.c_w("s_v19",s.prop9,time);
		s.eVar19="D=c9";
	}
	//OpinionLab Customer Satisfaction Rating
	if(s.prop62)
		s.c_w("s_p62",s.prop62,time);
		
	// session start
	s.prop49=s.getSessionStart('s_p49_start');
	if(s.prop49=="1")
		s.eVar39=s.prop20;
		
	// customer flag
	if(s.events){
		if(s.events.indexOf("purchase")>-1){s.eVar41="c"}
	}
	/*override sale designer index  */
	if(((document.referrer.indexOf("/templates/SaleDesignerIndexAZ.jsp")>-1)&&(document.location.href.indexOf("/search.jsp")>-1||s.pageName=="Search:Sale"))||((s.pageName=="search"||s.pageName=="Search:Sale")&&(document.location.href.indexOf("from=saledi")>-1)))
	{	
		
		s.pageName=s.eVar5="Sale:DesignerIndexAZ:"+s.getQueryParam('Ntt');
		s.eVar4="Browse";
		s.channel=s.hier1="Sale";
		s.eVar6="non-Search";
		s.events = s.repl(s.repl(s.events,'event2',''), ',,', ',');
		s.prop2=s.prop3=s.prop4=s.eVar16=s.eVar25=s.eVar45="";
	}
	if(document.location.href.indexOf("from=saledi")>-1&&s.events.indexOf("event2")>-1)
	{
		s.eVar6="non-Search";
		s.events = s.repl(s.repl(s.events,'event2',''), ',,', ',');
		s.prop2=s.prop3=s.prop4=s.eVar16=s.eVar25=s.eVar45="";
	}
	
	// product view event
	if(s.events){
		// remove event20 for alt image view in cusp
		if(s.prop50 == 'cu' && s.pageName == 'Alt Image View') {
			s.events = s.repl(s.repl(s.events,'event20',''), ',,', ',')
		} else {
			if(s.events.indexOf("prodView")>-1){
				s.events=s.apl(s.events,"event20",",",2);
				s.linkTrackVars=s.apl(s.linkTrackVars,"events",",",2);
				s.linkTrackEvents=s.apl(s.linkTrackEvents,"event20",",",2);
			}
		}
	}
	
	s.eVar40 = s.crossVisitParticipation(s.eVar3,'s_icid','1','10','>','purchase',0);

   /*set prop55 equal to a combination of the current day and current hour.   
	Set eVar31 equal to the value of prop55 via dynamic syntax. */
	s.prop55=s.getTimeParting('h','-6') + "|" + s.getTimeParting('d','-6') + "|" + s.getTimeParting('w','-6');
	s.eVar31="D=c55";

   /* add page name to video name*/
	if(s.prop12)
   		s.prop13=s.prop12+' : '+s.pageName;
   		
	if(s.eVar47)
		s.eVar47=s.eVar48+' : '+s.pageName;

	/*set up dynamic object IDs*/
	s.setupDynamicObjectIDs();
	
	/*collect navid parameter*/
	if(!s.eVar46)
		s.eVar46=s.getQueryParam('navid');
		
	// product finding method
	/*MYNM page*/
	if(!s.eVar4&&(s.pageName=='myNM')){
		s.eVar4="MyNM";
		s.eVar5=s.pageName;	
		if(!s.eVar6)
			s.eVar6='non-Search';		
	}
	
	/*myNM PFM*/
	if(!s.eVar4&&((document.referrer.indexOf("myNM.jsp")>-1)||s.prop37=="myNM")){
		var widgetName=s.c_r('s_mynmwidget');
		if(widgetName&&widgetName!=''){
			s.eVar4="MyNM:"+widgetName;
			s.c_w('s_mynmwidget','',0);
			if(!(s.pageName=='Product Detail')){
				s.eVar5=s.pageName;
				if(!s.eVar6)
					s.eVar6='non-Search';
			}
		}						
	}
	
	/*NMFavs PFM*/
	if(s.pageName){
		if(!s.eVar4&&(s.pageName.indexOf('My Favorites')>-1)&&document.location.href.indexOf("view=favi")>-1) {
			s.eVar4='My Favorites';
			s.eVar5=s.pageName;
			if(!s.eVar6)
				s.eVar6='non-Search';
		}	
	}
	
	/* set the merchandising category and eliminate false browse or search pages */
	if(s.eVar4&&(s.eVar4=="Browse"||s.evar4=="Search"||s.eVar4=="boutique"))
	{
		// excluded pages: list pages to exclude from browse category tracking here
	 	var excludePages=new Array("Product Detail","productImagesPopupZoom","SC Product Detail:","YMALDetail","Checkout:EasyCart","NM Credit Card");
	 	
	 	// excluded channels: list channels to exclude from browse category tracking here
	 	var excludeChannels=new Array("Checkout");
	 
	 	var excludeStatus="include";
	 	for(var i = 0; i < excludePages.length ; i++ ){
				if(s.pageName.indexOf(excludePages[i]) != -1){
				s.eVar4="";
				s.eVar5="";
				//clear search related vars for quick look
				s.prop2=s.eVar6=s.prop11=s.prop21=s.eVar26=s.eVar45=s.eVar56=s.eVar25="";
				excludeStatus="exclude";
				break;
				}
			
		}
		if (excludeStatus=="include"&&(s.eVar4=="Browse"||s.eVar4=="boutique")){
			for(var i=0; i < excludeChannels.length; i++)
			{
				if(s.channel.indexOf(excludeChannels[i]) != -1){s.eVar4="";s.eVar5="";break;}
				else{
					if(s.pageName=="Category"){
					   s.pageName=s.rep(s.hier1,"|",":")
					   }
					s.eVar5=s.pageName;
					if(!s.eVar6)
						s.eVar6='non-Search';}
			}
		}
	}
	

	if(s.campaign&&!s.eVar4){ s.eVar4='Marketing Campaign';	}
	if(s.getQueryParam('RROS')){s.eVar4="ROOS";} //Rich Relevance OOS
	if(s.prop21&&!(s.prop21=="NO")) {s.eVar4 = 'Search Type Ahead';}
	if(s.events&&s.events.indexOf('event66')>-1) {s.eVar4="RR_NullSearch";} 
	if(s.eVar4 && !(s.eVar4=="Browse"||s.eVar4=="You May Also Like"||s.eVar4=="Internal Promotion"||s.eVar4=="boutique"||s.eVar4.indexOf('My Favorites')>-1||s.eVar4.indexOf('MyNM')>-1)){s.eVar5="non-Browse"}
	if(s.eVar4 && !(s.eVar4=="Search"||s.eVar4=="Search Type Ahead"||s.eVar4=="Internal Promotion"||s.eVar4=="Browse"||s.eVar4=="boutique") && !(s.eVar6)){s.eVar6="non-Search";s.eVar16=s.eVar6;}
	
	//to accomodate purchase binding event and help eliminate none
	if(s.events&&s.events.indexOf('purchase')>-1)
	{		
		s.eVar4='unknown at time of purchase';
		s.eVar6=s.eVar5='D=v4';
	}
	
	/* create productmerch product for merchandising eVar binding (Merchandising Instance) */
	if(s.eVar4 && (!s.products||(s.products&&s.products.indexOf(';productmerch')>-1)) && (s.p_fo('onemerch')==1||(s.linkType!=''&&s.linkTrackVars.indexOf('eVar4')>-1)))
	{
		s_productMerch();
	}
	if(s.c_r('productnum')&&s.events.indexOf('purchase')>-1)
		s.c_w('productnum','0',0);
	
	/*Custom Page View */
	s.events=s.apl(s.events,"event32",",",2);
	/*Capture the full URL  */
	s.prop31="D=g"; 
	/*Capture the full user-agent */
	s.prop32="D=User-Agent"; 
	
	/*Get previous page name value*/
	if(!s.prop37)
		s.prop37=s.getPreviousValue(s.pageName,'gpv','');
	
	/*Get percent of page viewed */
	if(s.prop37)
	{
		var ppv_c=s.getPercentPageViewed(s.pageName);	//Get values for prior page, pass this page's identifier
		if(ppv_c&&s.prop37==ppv_c[0])s.prop38=ppv_c[1]+'|'+ppv_c[2]; //Extract last page's total % viewed and initial % viewed, separated by '|'
	}
	
/*Add to cart location */
	if(s.events&&s.events.indexOf('scAdd')>-1)
	{
	s.linkTrackVars=s.apl(s.linkTrackVars,'eVar63',',',2);
	if(s.pageName && !s.eVar63)
		s.eVar63=s.pageName;
	}	


if (document.referrer != '' && document.referrer != 'undefined' && !(document.referrer.indexOf('domain.com') > -1)){
var refStringArray = document.referrer.split('/');
if (refStringArray != 'undefined' && refStringArray.length > 0) {
s.prop22 = refStringArray[2];
}
}


/*Copy the purchase id to an eVar*/
s.eVar52=s.purchaseID;

/*Corrects an issue with Google Secured Search by inserting Google Secure Search when referrer is Google and there is no value after q=*/
var kr=document.referrer,kk=s.getQueryParam("q","",kr),ks=s.getQueryParam("esrc","",kr);
if(kr.indexOf("www.google.")&&!kk&&ks=="s"){var ksr=kr.split("q="),kq="q=Google%20Secure%20Search";
s.referrer=ksr[0]+kq+ksr[1]};

if(document.referrer=="https://www.google.com/"){
    s.referrer="https://www.google.com/?q=google%20secure%20search";
}


/** Grab s_vi value and store in prop23 **/
s.prop23 = 'D=s_vi';

/*Get rid of browser plugins.  Not used in SC15/not needed*/
	s.plugins='';

/* Grab true browser width and height and store in prop65 */
	s.prop65 = document.documentElement.clientWidth + " x " + document.documentElement.clientHeight;

/*Store s.fid in prop66*/
	s.prop66 = s.fid;

/* Store clicktale in eVar59 */

if(typeof ClickTaleGetUID=='function' && typeof ClickTaleIsRecording=='function'){
	if(ClickTaleIsRecording())
		s.contextData['clicktale_uid']=ClickTaleGetUID();
}

/* TNT Plugin - added 8/21/12*/

s.tnt=s.trackTNT();

/*socialPlatforms v1.0 - used for SocialAnalytics*/
	s.socialPlatforms();

s.linkTrackVars=s.apl(s.linkTrackVars,'prop50,prop5,prop8,prop9,prop10,prop24,prop23,prop31,prop32,eVar9,eVar31',',',2);	

}
s.doPlugins=s_doPlugins
/*********************** CONVENIENCE FUNCTIONS **********************/
// function to track when an item is added to the cart and the add to cart location is provided
function s_cartAdd(product,qty,price,location,replenishment){
	if(arguments.length == 5)
		return s_cartAdd_3(product,qty,price,location,replenishment);
	else if(arguments.length == 4)	
		return s_cartAdd_2(product,qty,price,location);
	else 
		return s_cartAdd_1(product,qty,price);
}
// function to track when an item is added to the cart and has replenishment value
function s_cartAdd_3(product,qty,price,location,replenishment){
	s.linkTrackVars='products,events,eVar63,prop25';
	s.linkTrackEvents='scOpen,scAdd,event5,event6';
	s.events='scAdd,scOpen,event5,event6'; //scOpen is serialized in the interface to 1x/visit
	s.products='';
	s.prop25='';
	 var prodArray=s.split(product,':');
	 var unitsArray=s.split(qty,':');
	 var revenueArray=s.split(price,':');
	 var replenishArray=s.split(replenishment,':');
	 for(var i = 0; i < prodArray.length; i++){
		 if(typeof s.products != 'undefined' && s.products){
			 s.products=s.products+',;'+prodArray[i]+';;;event6='+unitsArray[i]+'|event5='+revenueArray[i];
			 if (typeof replenishArray[i] !='undefined'&& replenishArray[i]!=''&&s.prop25!='')
				s.prop25=s.prop25+'|'+prodArray[i]+':'+replenishArray[i];
			else{
				if(typeof replenishArray[i] !='undefined'&& replenishArray[i]!=''&&s.prop25=='')
				s.prop25=prodArray[i]+':'+replenishArray[i];
			}	
		 }
		 else{
			 s.products=';'+prodArray[i]+';;;event6='+unitsArray[i]+'|event5='+revenueArray[i];
			 if (typeof replenishArray[i] != 'undefined'&& replenishArray[i]!='')
				s.prop25=prodArray[i]+':'+replenishArray[i];
		 }
	 }
	 s.eVar63=location;
	 s.tl(true,'o','Add to Cart');

}
// function to track when an item is added to the cart from Save For Later (or any other location on the site that needs to be explicitly denoted)
function s_cartAdd_2(product,qty,price,location){
	s.linkTrackVars='products,events,eVar63';
	s.linkTrackEvents='scOpen,scAdd,event5,event6';
	s.events='scAdd,scOpen,event5,event6'; //scOpen is serialized in the interface to 1x/visit
	 s.products='';
	 var prodArray=s.split(product,':');
	 var unitsArray=s.split(qty,':');
	 var revenueArray=s.split(price,':');
	 for(var i = 0; i < prodArray.length; i++){
		 if(typeof s.products != 'undefined' && s.products){
			 s.products=s.products+',;'+prodArray[i]+';;;event6='+unitsArray[i]+'|event5='+revenueArray[i];
		 }
		 else{
			 s.products=';'+prodArray[i]+';;;event6='+unitsArray[i]+'|event5='+revenueArray[i];
		 }
	 }
	 s.eVar63=location;
	 s.tl(true,'o','Add to Cart');
}
// function to track when an item is added to the cart
function s_cartAdd_1(product,qty,price){
	s.linkTrackVars='products,events';
	s.linkTrackEvents='scOpen,scAdd,event5,event6';
	s.events='scAdd,scOpen,event5,event6'; //scOpen is serialized in the interface to 1x/visit
	 s.products='';
	 var prodArray=s.split(product,':');
	 var unitsArray=s.split(qty,':');
	 var revenueArray=s.split(price,':');
	 for(var i = 0; i < prodArray.length; i++){
		 if(typeof s.products != 'undefined' && s.products){
			 s.products=s.products+',;'+prodArray[i]+';;;event6='+unitsArray[i]+'|event5='+revenueArray[i];
		 }
		 else{
			 s.products=';'+prodArray[i]+';;;event6='+unitsArray[i]+'|event5='+revenueArray[i];
		 }
	 }
	 s.tl(true,'o','Add to Cart');
}

// function to track when an item is removed from the cart
function s_cartRemove(product,qty,price){
	s.linkTrackVars='products,events';
	s.linkTrackEvents='scRemove,event7,event8';
	s.events='scRemove,event7,event8';
	s.products=';'+product+';;;event7='+price+'|event8='+qty;
	s.tl(true,'o','Remove from Cart');
}

//function to track when an alert message is presented
function alertTrack(msg){
	s.linkTrackVars='prop54,prop42,events';
	s.linkTrackEvents='None';
	s.events='';
	s.prop54='alert: '+ msg;
	s.prop42=s.pageName;
	s.tl(this, 'o', s.prop54);
}

//function to track various clicks located throughout the site
function clickInteraction(desc){
	s.linkTrackVars='prop41,prop42,events';
	s.linkTrackEvents='None';
	s.events='';
	s.prop41=desc; 
	s.prop42=s.pageName;
	s.tl(this,'o',desc);
}

//function to track share interactions
function socialShareInteraction(shareType,product){
	s.linkTrackVars='events,eVar62,products';
	s.linkTrackEvents='event60';
	s.events='event60'; 
	s.eVar62=shareType; 
	s.products=';'+ product; 
	s.tl(this,'o','share this:' + shareType);
}

//function to track various interactions on the PDP
function productInteraction(interaction,product){
	s.linkTrackVars='eVar8,prop41,prop42,products,events';
	s.linkTrackEvents='event78';
	s.events='event78';
	s.eVar8=interaction; 
	s.prop41=product + ':' + interaction;
	s.prop42=s.pageName;
	s.products=';'+ product; 
	s.tl(this,'o','product interaction:' + interaction); 
}

//function to capture merch instance event and generic product
function s_productMerch(){
if(!s.c_r('productnum'))
			s.productNum=1;
		else
			s.productNum=parseInt(s.c_r('productnum'))+1;
		s.products=';productmerch' + s.productNum;
		var e=new Date();
		e.setTime(e.getTime()+(30*86400000));
		s.c_w('productnum',s.productNum,e);
		s.linkTrackVars=s.apl(s.linkTrackVars,'events,products',',',2);
		s.linkTrackEvents=s.apl(s.linkTrackEvents,'event71',',',2);
		s.events=s.apl(s.events,'event71',',',2);
		return;
}

//function to get date/time in milliseconds.  Used for setting persistent cookie
function getDateTime(days)
	{
		var e=new Date();
		e.setTime(e.getTime()+(days*86400000));
		return e;
	}
//get query parm	
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}	

//get cookie
function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}
/************************** PLUGINS SECTION *************************/
/* Get Session Start
*/
s.getSessionStart=new Function("c",""+"var s=this,v=1,t=new Date;"+"if(s.c_r(c)){v=0}"+"else{s.c_w(c,1,0)}"+"return v;");

/*
* Plugin: getQueryParam 2.4
*/
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");
/*  
 * Function - read combined cookies v 0.37  */
	if(!s.__ccucr)
	{
		s.c_rr=s.c_r;s.__ccucr=true;     
		function c_r(k)     
		{

			var s=this,d=new Date,v=s.c_rr(k),c=s.c_rspers(),i, m, e;
			if(v)return v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;
			i=c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|', i);e=i<0?i:c.indexOf(';', i);
			m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length, m<0?c.length:m));
			return v;
			}     
			function c_rspers()     
			{

			var cv=s.c_rr("s_pers");var date=new Date().getTime();var expd=null;
			var cvarr=[];var vcv="";if(!cv)return vcv;cvarr=cv.split(";");for(var i=0,l=cvarr.length;i<l;i++)
			{expd=cvarr[i].match(/\|([0-9]+)$/);if(expd && parseInt(expd[1]) >= date){vcv += cvarr[i]+";";}}return vcv;
		}     
		s.c_rspers=c_rspers;
		s.c_r=c_r; 
	} 
/*  
 * Function - write combined cookies v 0.37  */
	if(!s.__ccucw) 
	{
		s.c_wr=s.c_w;s.__ccucw=true;
		function c_w(k, v, e)     
		{

			var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv, sv, c, i, t;d.setTime(d.getTime() - 60000);
			if(s.c_rr(k))s.c_wr(k, '', d);k=s.ape(k);pv=s.c_rspers();i=pv.indexOf(' '+k+'=');if(i>-1){

			pv=pv.substring(0, i)+pv.substring(pv.indexOf(';', i)+1);pc=1;}sv=s.c_rr(sn);i=sv.indexOf(' '+k+'=');
			if(i>-1){sv=sv.substring(0, i)+sv.substring(sv.indexOf(';', i)+1);sc=1;}d=new Date;
			if(e){if(e.getTime()>d.getTime()){pv += ' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}
			else{sv += ' '+k+'='+s.ape(v)+';';sc=1;}sv=sv.replace(/%00/g, '');pv=pv.replace(/%00/g, '');
			if(sc)s.c_wr(sn, sv, 0);if(pc){t=pv;while(t && t.indexOf(';') != -1){var t1=parseInt(t.substring(t.indexOf('|')+1, t.indexOf(';')));
			t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.setTime(ht);s.c_wr(pn, pv, d);}return v==s.c_r(s.epa(k));     
		}     
		s.c_w=c_w; 
	} 
/*
 * Plugin: getValOnce_v1.1
 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");

/*
 * Plugin: getTimeParting 3.1 
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,B,C,D,U,W,X,Y,Z;d=new Date();A=d.getFullYear();if(A="
+"='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if(A=='2013'){B="
+"'10';C='03'}if(A=='2014'){B='09';C='02'}if(A=='2015'){B='08';C='01'"
+"}if(A=='2016'){B='13';C='06'}if(A=='2017'){B='12';C='05'}if(!B||!C)"
+"{B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000"
+"');if(D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}el"
+"se{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new Date(C);W=new Date"
+"();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.getTimezoneOffset()*"
+"60000);W=new Date(W+(3600000*z));X=['Sunday','Monday','Tuesday','We"
+"dnesday','Thursday','Friday','Saturday'];B=W.getHours();C=W.getMinu"
+"tes();if(C<10){C='0'+C};D=W.getDay();Z=X[D];U='AM';A='weekday';X='0"
+"0';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6|"
+"|D==0){A='weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availabl"
+"e'}else{if(t){if(t=='h'){return W}if(t=='m'){return B+':'+C+' '+U}i"
+"f(t=='d'){return Z}if(t=='w'){return A}if(t=='f'){return B+':'+C+' "
+"'+U+' - '+Z}}else{return Z+', '+W}}}");


/* 
* Plug-in: crossVisitParticipation v1.7 - stacks values from 
* specified variable in cookie and returns value 
*/
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;"); 


/* 
 * DynamicObjectIDs v1.5: Setup Dynamic Object IDs based on URL 
*/
s.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}"); 
s.setOIDs=new Function("e",""
+"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * s.join: 1.0 - s.join(v,p)
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/* 
 *Plugin Utility:  First Only Utility 
 */
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
 * Plugin: getActionDepth v1.0 - Returns the current
 * page number of the visit
 */
s.getActionDepth=new Function("c",""
+ "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);"
+ "if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}"
+ "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");
/************************ Test&Target Plugin Start *************************/
/*
* TNT Integration Plugin v1.0
*/
s.trackTNT=new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");
/*********************** Test&Target Plugin End *************************/
/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Plugin: getPercentPageViewed v1.72
 */
s.getPercentPageViewed=new Function("n",""
+"var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load"
+"','unload','scroll','resize','zoom','keyup','mouseup','touchend','o"
+"rientationchange','pan'];W.s_Obj=s;s_PPVid=(n=='-'?s.pageName:n)||s"
+".pageName||location.href;if(!W.s_PPVevent){s.s_PPVg=function(n,r){v"
+"ar k='s_ppv',p=k+'l',c=s.c_r(n||r?k:p)||'',a=c.indexOf(',')>-1?c.sp"
+"lit(',',10):[''],l=a.length,i;a[0]=unescape(a[0]||'');r=r||(n&&n!=a"
+"[0])||0;a.length=10;if(typeof a[0]!='string')a[0]='';for(i=1;i<9;i+"
+"+)a[i]=!r&&i<l?parseInt(a[i])||0:0;if(l<10||typeof a[9]!='string')a"
+"[9]='';if(r){s.c_w(p,c);s.c_w(k,'?')}return a};W.s_PPVevent=functio"
+"n(e){var W=window,D=document,B=D.body,E=D.documentElement,S=window."
+"screen||0,Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='cl"
+"ientWidth',Hc='clientHeight',C=100,M=Math,J='object',N='number',P='"
+",',s=W.s_Obj||W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('"
+"on'))e=e.substring(2);s_PPVi=W.s_PPVi||0;if(W.s_PPVt&&!e){clearTime"
+"out(s_PPVt);s_PPVt=0;if(s_PPVi<2)s_PPVi++}if(typeof s==J){var h=M.m"
+"ax(B[Hs]||E[Hs],B[Ho]||E[Ho],B[Hc]||E[Hc]),X=W.innerWidth||E[Wc]||B"
+"[Wc]||0,Y=W.innerHeight||E[Hc]||B[Hc]||0,x=S?S.width:0,y=S?S.height"
+":0,r=M.round(C*(W.devicePixelRatio||1))/C,b=(D.pageYOffset||E[Ts]||"
+"B[Ts]||0)+Y,p=h>0&&b>0?M.round(C*b/h):0,O=W.orientation,o=!isNaN(O)"
+"?M.abs(o)%180:Y>X?0:90,L=e=='load'||s_PPVi<1,a=s.s_PPVg(s_PPVid,L),"
+"t,V=function(i,v,f,n){i=parseInt(typeof a==J&&a.length>i?a[i]:'0')|"
+"|0;v=typeof v!=N?i:v;v=f||v>i?v:i;return n?v:v>C?C:v<0?0:v};if(new "
+"RegExp('(iPod|iPad|iPhone)').exec((window.navigator&&navigator.user"
+"Agent)||'')&&o){t=x;x=y;y=t}o=o?'L':'P';a[9]=L||!a[9]?o:a[9].substr"
+"ing(0,1);if(a[9]!='L'&&a[9]!='P')a[9]=o;s.c_w('s_ppv',escape(W.s_PP"
+"Vid)+P+V(1,p,L)+P+(L||!V(2)?p:V(2))+P+V(3,b,L,1)+P+X+P+Y+P+x+P+y+P+"
+"r+P+a[9]+(a[9]==o?'':o))}if(!W.s_PPVt&&e!='unload')W.s_PPVt=setTime"
+"out(W.s_PPVevent,333)};for(var f=W.s_PPVevent,i=0;i<E.length;i++)if"
+"(EL)EL(E[i],f,false);else if(AE)AE('on'+E[i],f);f()};var a=s.s_PPVg"
+"();return !n||n=='-'?a[1]:a");

/*************************** preSlib v1.43 **************************/
// preSlib enabler functions
function s_is(x){var t=x===null?'null':typeof x;if(t=='object'&&typeof x.length=='number')t='array';return t}
function s_isNU(x){return s_is(x)=='null'}
function s_isU(x){return s_is(x)=='undefined'}
function s_isN(x){return s_is(x)=='number'}
function s_isS(x){return s_is(x)=='string'}
function s_isB(x){return s_is(x)=='boolean'}
function s_isO(x){return s_is(x)=='object'}
function s_isAO(x){return s_isA(x)||s_isO(x)}
function s_isA(x){return s_is(x)=='array'}
function s_isF(x){return s_is(x)=='function'}
function s_MC(a,c){try{if(s_isS(c))c=c=='lc'?-1:c=='uc'?1:0;if(!s_isN(c))c=c?1:0;a+='';a=c<0?a.toLowerCase(a):c>0?a.toUpperCase(a):a}catch(e){}return a}
function s_LC(a){return s_MC(a,'lc')}
function s_UC(a){return s_MC(a,'uc')}
function s_scrubWS(t){try{if(t==null)t='';t=t.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ')}catch(e){}return t}
function s_split(l,d){var i,x=0,a=new Array;if(!d)d=',';while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length)}return a}
function s_getHTMLtag(y){var a='',v='',g='',t='',f='',c='lc',p=arguments,l=p.length,i;if(!y)return f;if(l>1){i=s_LC(p[l-1]);if(i=='uc'||i=='lc'||i=='mc'){c=i;l--}}y=s_LC(y);if(l==2)g=s_LC(p[1]);else if(l>=3){a=s_LC(p[1]);v=s_MC(p[2],c);if(l>=4)g=s_MC(p[3],c)}if(document.getElementsByTagName)t=document.getElementsByTagName(y);if(typeof t!='object')return f;for(i=0;!f&&i<t.length;i++){f=t[i];if(a&&v&&s_MC(f.getAttribute(a),c)!=v)f=''}if(!f||typeof f!='object'||!g)return f;if(g!='text')return f.getAttribute(g);f=f.innerText||f.textContent||'';f=f.replace(/\s*>\s*/g,'>').replace(/^>+/,'').replace(/>+$/,'');return f}
function s_parseUri(){var u=arguments.length==0?window.location.href:arguments[0],e,a=document.createElement('a'),p='',r={};a.setAttribute('href',u+'');for(e in a)if(typeof a[e]=='string')r[e]=a[e];delete a;a=null;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathname='/'+p;return r}

// preSlib utilities
function s_setIf(){var O='object',L=null,a=arguments,al=a.length,S='',i,z=0,n,o=window,l=0,c=0,d=0;try{if(typeof a[al-1]=='number'){n=a[--al];l=n&1;c=n&2;d=n&4}if(al>=2&&(typeof a[0]!=O||typeof a[1]==O))S=a[z++];if(!S&&!d)return L;if(S&&(l||c)){try{if(l)S=s_LC(S);if(c)S=s_scrubWS(S)}catch(e){}}if(typeof a[z]==O)o=a[z++];for(i=z;i<al;i++){n=a[i];if(typeof n=='string'&&((!d&&S)||(d&&!o[n]))){try{o[n]=S;L=S}catch(e){}}}}catch(e){}return L}
function s_def(){var a=arguments,b=new Array,i;for(i=0;i<a.length;i++)b.push.apply(b,[a[i]]);if(typeof b[i-1]=='number')b[i]|=4;else b.push.apply(b,[4]);return s_setIf.apply(this,b)}
function s_toNum(t,f,l){var v=NaN,k=1,i=0,c,o,D='0123456789',d=0,u=typeof t,m=f?1e306:1e14;if(u=='number')return t;if(u=='object')t+='';if(u!='string'||!t)return NaN;for(;l&&i<t.length;i++){c=t.substring(i,i+1);if(c>' ')break}c=t.substring(i,i+1);if(!d&&c=='+')i++;if(!d&&c=='-'){k=-1;i++}if(f&&!d&&c=='.'){d=1;i++}for(;i<t.length;i++){c=t.substring(i,i+1);o=D.indexOf(c);if(f&&c=='.'&&!d)d=1;else{if(o<0)return l?k*v:NaN;if(v>m)return NaN;if(isNaN(v))v=0;if(d){d=d/10;v=v+o*d}else v=10*v+o}}return k*v}
function s_toInt(t){var l=arguments.length>1&&!!arguments[1];return s_toNum(t,0,l)}
function s_toFloat(t){var l=arguments.length>1&&!!arguments[1];return s_toNum(t,1,l)}
function s_round(v,p,d,b){var N='number';if(typeof d!=N)d=NaN;if(typeof v!=N)v=s_toFloat(v);if(isNaN(v))return d;if(typeof p!=N||p<0)p=0;if(!b||typeof b!=N||b<2)b=10;p=Math.pow(b,isNaN(p)?0:p);return Math.floor(v*p+0.5)/p}
function s_getCharSet(){var v=s_getHTMLtag('meta','http-equiv','content-type','content'),i;if(!v)return'';i=v.indexOf('charset=');if(i==-1)return'';return s_UC(v.substring(i+8,99).replace(/[\'\";, ].*/,''))}
function s_getQueryStr(n,u){var g,h,i,a='&',q=u||window.location.search,p=q.toLowerCase().replace(/\?/g,a)+a;n=a+n.toLowerCase();g=n+'=';h=p.indexOf(g);if(h>-1){i=h+g.length;return decodeURIComponent(q.substring(i,p.indexOf(a,i)).replace(/\+/g,' '))}g=n+a;return p.indexOf(g)>-1?' ':''}
function s_apl(l,v,d,u){var m=0;if(!l)l='';if(u){var i,n,a=s_split(l,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(s_LC(n)==s_LC(v)))}}if(!m)l=l?l+d+v:v;return l}
function s_getShortHn(){return s_LC(s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname.replace(/^www-?[0-9]*\./i,''))}
function s_getOwnerHn(){return s_LC(s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname.replace(/^www[0-9]*\./i,'').replace(/\.(gov|edu|com|mil|org|net|int).*/,'').replace(/\.[a-z][a-z]$/,'').replace(/.*\./,''))}
function s_getTLDlevels(){var h=s_parseUri(arguments.length>0?arguments[0]:window.location.href).hostname;return h.match(RegExp("\\.co\\..{2}$","i"))||h.match(RegExp("\\.(gov|edu|com|mil|org|net|int)\\..{2}$","i"))?3:2}
function s_getCookieDomain(){var h=s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname,n=s_getTLDlevels(),a=s_split(h,'.'),i=a.length-n;for(h='';i<a.length;i++)h+='.'+a[i];return h}
function s_c_w(n,v,e,p,d){if(n){v+='';var t=v?'':-60,e;if(e&&t){e=new Date;e.setTime(e.getTime()+(t*1000))}document.cookie=n+'='+escape(v)+';'+' path='+(p||'/')+';'+(e?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s_c_r(n)==v}}
function s_c_r(n){var c=' '+document.cookie,i=c.indexOf(' '+n+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':unescape(c.substring(i+2+n.length,e<0?c.length:e));return v}
function s_c_d(n,p,d,s){document.cookie=n+'=;'+' expires=Thu, 01 Jan 1970 00:00:01 GMT;'+' path='+(p||'/')+(d?' domain='+d+';':'')+(s?' secure':'')}
function s_findCode(a,c){var i=0,j;if(typeof a!='string')return'';for(a=s_LC(a);i<c.length;i+=2){j=c.substring(i,i+2);if(a==j)return j}return''}
function s_findCC(a){var c='adaeafagaialamanaoaqarasatauawaxazbabbbdbebfbgbhbibjblbmbnbobrbsbtbvbwbybzcacccdcfcgchcickclcmcncocrcucvcxcyczdedjdkdmdodzeceeegeheresetfifjfkfmfofrgagbgdgegfggghgiglgmgngpgqgrgsgtgugwgyhkhmhnhrhthuidieiliminioiqirisitjejmjojpkekgkhkikmknkpkrkwkykzlalblclilklrlsltlulvlymamcmdmemfmgmhmkmlmmmnmompmqmrmsmtmumvmwmxmymznancnenfngninlnonpnrnunzompapepfpgphpkplpmpnprpsptpwpyqarerorsrurwsasbscsdsesgshsisjskslsmsnsosrstsvsysztctdtftgthtjtktltmtntotrtttvtwtzuaugumusuyuzvavcvevgvivnvuwfwsyeytzazmzw';if(typeof s_findCCadd=='string')c+=s_findCCadd.replace(/,/g,'');return s_findCode(a,c)}
function s_findLC(a){var l='abaaaeafakamanarasavayazbabebgbhbibmbnbobrbscacechcocrcscucvcydadedvdzeeeleneoeseteufafffifjfofrfygagdglgngugvhahehihohrhthuhyhziaidieigiiikioisitiujajvkakgkikjkkklkmknkokrkskukvkwkylalblglilnloltlulvmgmhmimkmlmnmrmsmtmynanbndnengnlnnnonrnvnyocojomorospapiplpsptqurmrnrorurwsascsdsesgsiskslsmsnsosqsrssstsusvswtatetgthtitktltntotrtstttwtyugukuruzvevivowawoxhyiyozazhzu';return s_findCode(a,l)}
function s_matchList(v,l,m,d,c){if(s_isS(m)&&m.length==1){c=d;d=m;m=0}if(s_isN(m)){c=m;m=d=0}if(s_isN(d)){c=d;d=0}if(!d)d=',';if(s_isS(l))l=s_split(l,d);if(s_isS(m))m=s_split(m,d);if(!s_isAO(m))m=0;if(s_isS(v)){v=s_MC(v,c);for(var i=0,n=m.length;i<l.length;i++)if(v==s_MC(l[i],c))return!m?true:i<n?m[i]:n>0?m[n-1]:v}return m?v:false}
function s_mapURLs(l){var O='object',U='undefined',S='string',g=function(p,t,v){var i,e,r,x,m,j=0,a,d=typeof v!=O,m,z,q;if(d)var v={Match:0};for(i in t){q=null;r=typeof t[i]==O?t[i]:{};if(typeof r.defaults==U)r.defaults=0;x=typeof r.urls==S?r.urls:'~';m=d?r.defaults:!r.defaults&&x=='';if(!m&&!d){try{q=new RegExp(x,'');m=q.test(p)}catch(z){}}if(m){if(!d)v.Match=j;for(e in r){if(e!='urls'&&e!='defaults'){z=r[e];if(!d&&x&&typeof z==S&&z.indexOf('$')>-1&&q){m=q.exec(p);if(m.length>1)z=m[0].replace(q,z);z=z.replace(/\$[0-9]/g,'')}v[e]=z}}return v}j++}return v},v=null,u=s_parseUri(arguments.length>1?arguments[1]:window.location.href),p=u.hostname+u.pathname+u.search;try{if(typeof l==O){v=g(p,l,0);v=g(p,l,v)}}catch(e){}if(typeof v!=O)v={Match:0};if(typeof v.Match!='number')v.Match=0;return v}
function s_intercept(f,n,c){var F='function',T='typeof ',O='object',o=c||'window',g='',r='';f=o+'.'+f;var r=f+'_orig';try{if(eval(T+o)==O&&eval(T+r)!=F&&eval(T+f)==F&&eval(T+n)==F){eval(r+'='+f+';'+f+'='+n);g=r}}catch(e){}return g}
function s_deintercept(f,c){var F='function',T='typeof ',O='object',o=c||'window',g='',r='';f=o+'.'+f;r=f+'_orig';try{if(eval(T+o)==O&&eval(T+r)==F&&eval(T+f)==F){eval(f+'='+r+';'+r+'=null');g=f}}catch(e){}return g}
function s_loadJS(p,a){try{if(p)if(a){var e=document.createElement('script');e.type='text/javascript';e.language='JavaScript';e.async=true;e.src=p;var j=document.getElementsByTagName('script')[0];j.parentNode.insertBefore(e,j)}else{document.write('<scr'+'ipt type="text/javascript" language="JavaScript" src="'+p+'"></sc'+'ript>')}}catch(e){}}
function s_clt(n){try{var o=0,r=true,a=arguments,l=a.length,t='o',i=1,v;if(typeof window.s=='object'){o={linkTrackVars:s.linkTrackVars||'',linkTrackEvents:s.linkTrackEvents||'',events:s.events||''}}else{s=s_gi(s_account)}if(!s.events||typeof s.events!='string'||s.events.toLowerCase=='none')s.events='';if(typeof s!='object')return r;if(l>1&&a[1].length==1){t=a[1];i=2}while(i<l){v=a[i++].replace(/^v([0-9])$/,'eVar$1').replace(/^c([0-9])$/,'prop$1').replace(/^e([0-9])/,'event$1');if(v.indexOf('event')==0){s.linkTrackEvents=s.apl(s.linkTrackEvents,v,',',1);s.events=s.apl(s.events,v,',',1);v='events'}else if(i<l){if(o)o[v]=s[v]||'';s[v]=a[i++]}s.linkTrackVars=s.apl(s.linkTrackVars,v,',',1)}r=s.tl(1,t,n);if(o)for(i in o)s[i]=o[i]}catch(e){}return r}
function s_ta(){try{var i,b=('campaign,channel,events,hier1,hier2,hier3,hier4,hier5,list1,list2,list3,pageName,pageType,pageURL,pev2,products,purchaseID,referrer,server,state,transactionID,visitorID,zip').split(','),c=function(n,i){eval('if(s.'+n+i+")s."+n+i+'=\'\'')},m=function(n){if(window['s_'+n]){s[n]=window['s_'+n]}};if(typeof window.s=='object'){for(i=1;i<=75;i++){c('prop',i);c('eVar',i)}for(i=0;i<b.length;i++)c(b[i],'')}else{s=s_gi(s_account)}if(typeof s=='object'){m('linkInternalFilters');m('linkTrackVars');m('linkTrackEvents');return s.t()}}catch(e){}return''}
function s_saveAcc(){if(window.s_account&&!window.s_errorPage){s_c_w('s_gpv_acc',s_account);s_c_w('s_gpv_url',window.location.href)}}
function s_restoreAcc(){if(typeof s=='undefined'){s_account='';var a=s_c_r('s_gpv_acc');if(a)s_account=a}if(!s_errorRef)s_errorRef=s_c_r('s_gpv_url')}
function s_jsFileInfo(m){if(!m)m='';var u,f,c,v,d,l,t,i,j,e,o;try{throw new RangeError('')}catch(z){e=z}u=f=c=v=d=l='';if(!m&&e&&e.fileName)u=e.fileName;else{t=document.getElementsByTagName('script');if(t){for(i=t.length;--i>=0;){u=t[i].src;if(u&&(m&&u.indexOf(m)>-1)||u.match(/\.js$/))break}if(!m&&i<0)i=t.length-1;u=i>=0?t[i].src:''}}f=typeof window.s_fileVer=='string'?s_fileVer:'';c=typeof window.s=='object'&&s.version?s.version:'';v=f+(c&&f?' ':'')+c;l=u+(u&&v?' ':'')+v;d=l.replace(/.*\//,'').replace(/\.js/,'');o={url:u,fver:f,cver:c,ver:v,desc:d,ldesc:l};return o}
function s_getLoadTime(){if(!window.s_loadT){var o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round(((o.domInteractive||new Date().getTime())-a)/100):''}return s_loadT}
function s_clog(){try{var A='array',O='object',U='undefined',F='function',a=arguments,al=a.length,i,j,v,l='',o=l,e=l,c=l,x=0,d=0,z=0,p,q,f0=1,f1=1,f3=1,m=1<<16,W=function(o){try{c+=o+'\n';if(window.s_Debug){if(typeof s_debugW!=O)s_debugW=window.open('','_debugWin','height=600,width=900,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');if(typeof s_debugW==O){if(typeof s_debugD!=O)s_debugD=s_debugW.document;if(typeof s_debugD==O){if(typeof s_debugD.write==F)s_debugD.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html><head><title>debugWin</title><style>* {font-family:Andale Mono,OCR A Extended,Consolas,monospace,serif;font-size:9pt;word-wrap:break-word;padding:0px} p {display:block;clear:both;margin:1px;width:100%;border:none;border-bottom:1px solid #dddddd;}</style></head><body>');if(typeof s_debugD.write==F)s_debugD.write('<p>'+o.replace(/[ \t]/g,'&nbsp;').replace(/\</gi,'&lt;').replace(/\>/gi,'&gt;').replace(/\n$/,'').replace(/\n/gi,'<br/>')+'</p>');if(typeof s_debugW.scrollBy==F)s_debugW.scrollBy(0,100)}}}else if(typeof console.log==F||typeof console.log==O){console.log('%s',o)}}catch(e){}},B=function(v){v=v+'';var j,b,r,w,c,f=1;for(j=0;j<v.length;j++){b=v.substr(j,1);r=b=='\n';w=b<=' ';c=b<'A';if(r||(f&&c&&l.length>140)||(f&&l.length+v.substring(j).replace(/\n.*/,'').length>140)){o+=l;z+=o.length;if(o.length>2048){W(o);o=''}else o+='\n';l=r?'':'  ';x=!r;f=0}if(!r&&(!x||!w)){l+=b;x=f=0}}},P=function(v){var d=0,i,err=0,T=function(z){var t=z===null?'null':typeof z;if(t=='array')t='object';return t},u=function(z){var t=T(z);if(t=='string')B("'"+z+"'");else if(t=='boolean')B(z?'true':'false');else if(t=='function')B('function(){...}');else if(t=='null')B('null');else if(t=='undefined')B('undefined');else B(z+'')},b=function(v){if(++d>99){d--;B('/* ERROR! TRUNCATED: TOO DEEP */');return}var o=typeof v=='object'&&typeof v.length!='number',p,x,f=1,j=0;B(o?'{':'[');for(p in v){j++;B(f?'':',');if(o){B('\n');for(i=0;i<d;i++)B(' ')}if(j>1000){B('/* ERROR! TRUNCATED: TOO LARGE */');err=1}if(!err){if(o)B(p+': ');x=v[p];if(T(x)!='object')u(x);else b(x)}f=0}d--;if(o){B('\n');for(i=0;i<d;i++)B(' ');B('}')}else B(']')};if(T(v)!='object')u(v);else b(v)},FN=function(c){var n='',v,j;try{if(c){c=c+'';if(!c.indexOf('function '))c=c.substring(9);j=c.indexOf('(');if(j>-1)c=c.substring(0,j);if(!c)c='anonymous';n=c}}catch(e){}return n};var dp=s_getQueryStr('s_debug');if(dp>''){dp=dp==' '?1:parseInt(dp)||0;s_c_w('s_debug',String(dp))}dp=s_c_r('s_debug');s_Debug=dp>''?parseInt(dp):window.s_Debug||0;for(i=0;i<al;i++){v=a[i];if(typeof v==O){for(p in v){if(z<m&&z>=0){if(isNaN(p))B(p+'=');P(v[p])}}}else if(v=='-f'){f0=0}else if(v=='+f'){f0=1}else if(v=='-u'){f1=0}else if(v=='+u'){f1=1}else if(v=='+n'){f2=1}else if(v=='+n'){f2=1}else if(v=='arguments'){v=arguments.callee.caller;for(j=v;j;j=j.caller)q=FN(j)+(q?'>'+q:'');B(q);P(v.arguments)}else if(v=='function'){B(FN(arguments.callee.caller))}else if(v=='stack'){B(st())}else B(v);B(' ')}o+=l;o=o.replace(/^[ \t]*\n/,'').replace(/[ \t\n]*$/,'');if(o)W(o)}catch(e){}return c}
function s_getVisitStart(c){d=s_getVisitDuration();return d<.1}
function s_getVisitDuration(c){if(!c)c='s_dur';var M=60000,V=1800000,a=new Date(),t=a.getTime(),v=s_toInt(s_c_r(c)),d=0;if(isNaN(v)||(t-v)>V)v=t;d=t-v;a.setTime(t+1800000);s_c_w(c,v+'',a);c=s_c_r(c);return d/M}
function s_getVisitNum(p,a,b){var D=new Date,P,V,T=D.getTime(),d,i,t=0,k,o,y,H=1800000,s_dimo=function(m,y){var d=new Date(y,m+1,0);return d.getDate()},s_endof=function(x){var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=='m')d=s_dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;else if(x=='w')d=7-t.getDay();else d=1;t.setDate(t.getDate()+d);return t};if(!p)p='m';if(p=='m'||p=='w'||p=='d'){o=s_endof(p);y=o.getTime();D.setTime(y)}else{d=p*86400000;D.setTime(T+d)}if(!a)a='s_vnum';if(!b)b='s_invisit';P=s_c_r(a);if(P){i=P.indexOf('&vn=');t=s_toInt(P.substring(i+4,P.length));if(isNaN(t)||t<0)t=0}V=s_c_r(b);if(V){if(t){D.setTime(T+H);s_c_w(b,'Y',D)}return t}else{if(t){t++;k=P.substring(0,i);D.setTime(k);s_c_w(a,k+'&vn='+t,D);D.setTime(T+H);s_c_w(b,'true',D);return t}else{s_c_w(a,D.getTime()+'&vn=1',D);D.setTime(T+H);s_c_w(b,'Y',D);return 1}}return 1}
function s_getDaysSinceLastVisit(k,f){if(typeof k!='string'||!k){f=k?k:1;k=''}k=k||'s_lv';f=!!f;var M=60000,V=30*M,D=48*V,a=new Date(),t=a.getTime(),l=k+'_s',u=s_c_r(k),v=s_c_r(l),c=new Date(t+V),d=new Date(t+999*D),x=0;u=u&&!isNaN(u)?parseInt(u):0;if(u&&v&&!isNaN(v)){x=parseInt(v)}else{x=u?Math.floor((t-u)/D+0.5):-1;if(x>999)x=999;if(x<0)x=-1;a=new Date(a.getFullYear(),a.getMonth(),a.getDate());t=a.getTime();s_c_w(k,t,d)}s_c_w(l,x+'',c);if(!f)x=x<0?'New':(x<7?'Less than '+(x<1?'1 day':'7 days'):('More than '+(x<30?'7':'30')+' days'));return x}
// END preSlib
function s_checkArray(k,a){var f=false;outerloop:for(var i=0;i<a.length;i++){if(k.match(a[i]))f=true;if(f===true)break outerloop}return f}
/*
 * channelManager v2.8 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f","g",""
+"var s=this,h=new Date,i=0,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E"
+",F,G,H,I,J,K,L,M,N,O,P,Q,R,S;h.setTime(h.getTime()+1800000);if(e){i"
+"=1;if(s.c_r(e))i=0;if(!s.c_w(e,1,h))s.c_w(e,1,0);if(!s.c_r(e))i=0;i"
+"f(f&&s.c_r('s_tbm'+f))i=0;}j=s.referrer?s.referrer:document.referre"
+"r;j=j.toLowerCase();if(!j)k=1;else {l=j.indexOf('?')>-1?j.indexOf('"
+"?'):j.length;m=j.substring(0,l);n=s.split(j,'/');o=n[2].toLowerCase"
+"();p=s.linkInternalFilters.toLowerCase();p=s.split(p,',');for(q=0;q"
+"<p.length;q++){r=o.indexOf(p[q])==-1?'':j;if(r)break;}}if(!r&&!k){t"
+"=j;u=v=o;w='Other Natural Referrers';x=s.seList+'>'+s._extraSearchE"
+"ngines;if(d==1){m=s.repl(m,'oogle','%');m=s.repl(m,'ahoo','^');j=s."
+"repl(j,'as_q','*');}y=s.split(x,'>');for(z=0;z<y.length;z++){A=y[z]"
+";A=s.split(A,'|');B=s.split(A[0],',');for(C=0;C<B.length;C++){D=m.i"
+"ndexOf(B[C]);if(D>-1){if(A[2])E=v=A[2];else E=o;if(d==1){E=s.repl(E"
+",'#',' - ');j=s.repl(j,'*','as_q');E=s.repl(E,'^','ahoo');E=s.repl("
+"E,'%','oogle');}F=s.split(A[1],',');for(G=0;G<F.length;G++){if(j.in"
+"dexOf(F[G]+'=')>-1||j.indexOf('https://www.google.')==0)H=1;I=s.get"
+"QueryParam(F[G],'',j).toLowerCase();if(H||I)break;}}if(H||I)break;}"
+"if(H||I)break;}}if(!r||g!='1'){r=s.getQueryParam(a,b);if(r){v=r;if("
+"E)w='Paid Search';else w='Unknown Paid Channel';}if(!r&&E){v=E;w='N"
+"atural Search';}}if(k==1&&!r&&i==1)t=u=v=w='Typed/Bookmarked';J=s._"
+"channelDomain;if(J&&o){K=s.split(J,'>');for(L=0;L<K.length;L++){M=s"
+".split(K[L],'|');N=s.split(M[1],',');O=N.length;for(P=0;P<O;P++){Q="
+"N[P].toLowerCase();R=o.indexOf(Q);if(R>-1){w=M[0];break;}}if(R>-1)b"
+"reak;}}J=s._channelParameter;if(J){K=s.split(J,'>');for(L=0;L<K.len"
+"gth;L++){M=s.split(K[L],'|');N=s.split(M[1],',');O=N.length;for(P=0"
+";P<O;P++){R=s.getQueryParam(N[P]);if(R){w=M[0];break;}}if(R)break;}"
+"}J=s._channelPattern;if(J){K=s.split(J,'>');for(L=0;L<K.length;L++)"
+"{M=s.split(K[L],'|');N=s.split(M[1],',');O=N.length;for(P=0;P<O;P++"
+"){Q=N[P].toLowerCase();R=r.toLowerCase();S=R.indexOf(Q);if(S==0){w="
+"M[0];break;}}if(S==0)break;}}S=w?r+u+w+I:'';c=c?c:'c_m';if(c!='0')S"
+"=s.getValOnce(S,c,0);if(S){s._campaignID=r?r:'n/a';s._referrer=t?t:"
+"'n/a';s._referringDomain=u?u:'n/a';s._campaign=v?v:'n/a';s._channel"
+"=w?w:'n/a';s._partner=E?E:'n/a';s._keywords=H?I?I:'Keyword Unavaila"
+"ble':'n/a';if(f&&w!='Typed/Bookmarked'){h.setTime(h.getTime()+f*864"
+"00000);s.c_w('s_tbm'+f,1,h);}}");
/* Top 130 - Grouped */
s.seList="google.,googlesyndication.com|q,as_q|Google>yahoo.com,yahoo"
+".co.jp|p,va|Yahoo!>bing.com|q|Bing>altavista.co,altavista.de|q,r|Al"
+"taVista>.aol.,suche.aolsvc.de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>w"
+"ww.baidu.com|wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|i"
+"cq>myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|N"
+"aver>netscape.com|query,search|Netscape Search>reference.com|q|Refe"
+"rence.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www."
+"tiscali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text"
+"|Yandex.ru>search.cnn.com|query|CNN Web Search>search.earthlink.net"
+"|q|Earthlink Search>search.comcast.net|q|Comcast Search>search.rr.c"
+"om|qs|RoadRunner Search>optimum.net|q|Optimum Search";
/*
 * Plugin: dynComp v2.03
 */
var s_Obj=window.s; //right-hand side must be the SiteCatalyst 's' object
s.dynComp=new Function("H",""
+"try{var s=this,T='string',O='object',F='function',N='number',Y='D='"
+",Q='\"',Z=s.dynCompS,i,j,k,m,n,v,d,t,u,w='pageURL,referrer,campaign"
+",channel,hier1,hier2,hier3,hier4,hier5,visitorID,zip,state,server,p"
+"ageName,pageType,products,purchaseID,transactionID,events,linkURL,l"
+"inkName',x='g,r,v0,ch,h1,h2,h3,h4,h5,vid,zip,state,server,pageName,"
+"pageType,products,purchaseID,xact,events,pev1,pev2',y=w.split(','),"
+"z=x.split(','),l=0,p=[],q=[],K={},L=[],W=function(v,t){return typeo"
+"f v==t},E=function(v){v=escape(v||'');return v.length},M=function(n"
+",v){var p=n.substring(4);return E(v)<=(p=='eVar'||p=='hier'||p=='pa"
+"ge'||p=='camp'||p=='r'?255:p=='prod'||p=='even'?2000:100)},X=functi"
+"on(v){var r='';if(W(v,N)||v)try{r=v+''}catch(e){r=''}return r},A=fu"
+"nction(n,t){if(n=='pageURL'&&!s[n]&&document.location.href.length<2"
+"56)s[n]=document.location.href;if(n=='referrer'&&!s[n]&&document.re"
+"ferrer.length<256)s[n]=document.referrer||'';v=X(s[n]);var w=window"
+",a=s.linkType||s.lnk||s.linkName||s.linkURL|w.s_linkName||w.s_linkT"
+"ype,b=s.eo||s.pe,d=s.pe||s.pev1||s.pev2||s.pev3;if(v){if(!(a||b||d)"
+"||!W(s.linkTrackVars,T)||(','+s.linkTrackVars+',').indexOf(','+n+',"
+"')>=0){p[l]=n;q[l++]=t}}},R=function(i){var P='+',o=P+q[i]+P;x;if(("
+"P+(s.dynCompExclude||'').replace(/,/g,P)+P).indexOf(P+p[i]+P)>-1)re"
+"turn 1;for(k=0;k<l;k++){x=X(s[p[k]]);if(!x.indexOf(Y)){x=P+x.substr"
+"ing(2)+P;if(x.indexOf(o)>-1)return 1}}return 0},P=function(D){var V"
+"=function(v){var a,b,c,f,t,u,z,d='',r=v!=s[p[i]];D++;if(D<5){for(j="
+"D?l-1:0;!d&&(D?j>=0:j<l);D?j--:j++){t=q[j];u=X(s[p[j]]);z=u.length;"
+"if(n!=p[j]&&u.indexOf(Y)!=0&&M(u)){if(D&&v!=u&&v.indexOf(Q)<0){if(v"
+".indexOf(u)==0){c=v.substring(z);d=(D==1?Y:'')+t+'+';d=E(d+Q+c+Q)<E"
+"(v)?d+V(c):''}if(!d){a=v.length-z;b=v.indexOf(u,a);if(b>0){f=v.subs"
+"tring(0,a);d=D==1?Y:'';d=E(d+Q+f+Q+'+'+t)<E(v)?d+V(f)+'+'+t:''}}if("
+"!d){a=v.indexOf(u);if(a>0){c=v.substring(0,a);b=a+z;f=v.substring(b"
+");d=D==1?Y:'';d=E(d+Q+c+Q+'+'+t+'+'+Q+f+Q)<E(v)?d+V(c)+'+'+t+'+'+V("
+"f):''}}}if(!d&&v==u){d=(r?'':Y)+t;if(E(d)>=E(v))d=''}}}}if(!s.dynCo"
+"mpNoCookies){k=d;for(j=0;j<L.length;j++){t=L[j];if(v==K[t]){d=(r?''"
+":Y)+t;if(E(d)>=E(k||v+(r?'\"\"':'')))d=k;else break}}}if(!d&&r)d=Q+"
+"v+Q;D--;return d},o=function(n,v){return E(n)/1000+E(X(v))};for(i=0"
+";i<l;i++){for(j=0;j<l-i-1;j++){k=j+1;if(o(q[j],s[p[j]])>o(q[k],s[p["
+"k]])){t=p[k];p[k]=p[j];p[j]=t;t=q[k];q[k]=q[j];q[j]=t}}}for(i=0;i<L"
+".length;i++){for(j=0;j<L.length-i-1;j++){k=j+1;if(o(L[j],K[L[j]])>o"
+"(L[k],K[L[k]])){t=L[k];L[k]=L[j];L[j]=t}}}for(i=l-1;i>=0;i--){n=p[i"
+"];v=X(s[n]);if(v.indexOf(Y)!=0&&!R(i)){d=V(v);if(d&&E(d)<E(v)&&M(n,"
+"d)){Z.s[n]=s[n];s[n]=d}}}},C=function(){if(Z.a){Z.a=0;for(i=1;i<76;"
+"i++){A('prop'+i,'c'+i);A('eVar'+i,'v'+i)}for(i=0;i<y.length;i++)A(y"
+"[i],z[i]);k=document.cookie.split('; ');if(K){delete K;K={}}if(L)L."
+"length=0;for(i=0,j=0;i<k.length;i++){t=k[i].split('=');n=t[0];if(n."
+"match('^[a-zA-Z][a-zA-Z_0-9]*$')&&!n.match('^[cv][0-9][0-9]?$')&&('"
+",'+x+',').indexOf(','+n+',')<0){K[n]=t[1];L[j++]=n}}if(Z.s)delete Z"
+".s;Z.s={};P(-1);P(0)}},U=function(){try{if(W(Z,O)&&W(Z.s,O)){for(i "
+"in Z.s)s[i]=Z.s[i];delete Z.s;Z.s={}}}catch(e){}},I=function(){if(!"
+"W(Z.a,N))Z.a=0;if(!W(Z.s,O))Z.s={};if(!W(s.t_O,F))s.t_O=s.t;if(!W(s"
+".t_W,F)){s.t_W=function(){var s=this,a=arguments,r;s.dynCompS.a=1;i"
+"f(!s.usePlugins)s.dynComp(101);r=typeof s.t_O==F?s.t_O.apply(s,a):s"
+".t!=s.t_W?s.t.apply(s,a):-1;s.dynComp(102);return r}}if(s.t!=s.t_W)"
+"s.t=s.t_W;if(!W(s.dp_O,F)&&typeof s.doPlugins==F)s.dp_O=s.doPlugins"
+";if(!W(s.dp_W,F)){s.dp_W=function(){var s=this,a=arguments,r;r=type"
+"of s.dp_O==F?s.dp_O.apply(s,a):s.doPlugins!=s.dp_W?s.doPlugins.appl"
+"y(s,a):-1;if(s.dynCompS.a)s.dynComp(101);return r}}if(s.doPlugins!="
+"s.dp_W)s.doPlugins=s.dp_W};if(!W(s.dynCompS,O))Z=s.dynCompS={};if(H"
+"==100)I();if(H==101)C();if(H==102)U()}catch(e){U()}");
s_dynCompI=function(){var w=window,F='function',s=s_Obj;if(typeof s==
'object')s.dynComp(100);if(typeof w.s_gi_O!=F)s_gi_O=s_gi;if(typeof
w.s_gi_W!=F){s_gi_W=function(){var w=window,a=arguments,s=w.s_Obj;if(
typeof s=='object')s.dynComp(102);s.dynComp(100);w.s_Obj=s=typeof
w.s_gi_O==F?w.s_gi_O.apply(w,a):w.s_gi!=w.s_gi_W?w.s_gi.apply(w,a):-1;
return s}}if(w.s_gi!=w.s_gi_W)s_gi=s_gi_W}
//s_dynCompI();

/*
 * Plugin: socialPlatforms v1.1
 */
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F,i;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){s.contextData['a.socialcontentprovider']=D[1];}}");
 
s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga|metacafe.com>Metacafe|pinterest.com>Pinterest";

/*  
 * socialAuthors v1.5.2
 */
s.socialAuthors=new Function("",""
+"var s=this,g;g=s.referrer?s.referrer:document.referrer;if(g.indexOf"
+"('http://t.co/')===0||g.indexOf('https://t.co/')===0||g.indexOf('pi"
+"nterest.com/pin')!==-1||g.indexOf('tumblr.com')!==-1||g.indexOf('yo"
+"utube.com')!==-1){s.Integrate.add('SocialAuthor');s.Integrate.Socia"
+"lAuthor.tEvar='reserved';s.Integrate.SocialAuthor.get('//sa-se"
+"rvices.social.omniture.com/author/name?var=[VAR]&callback=s.socialA"
+"uthorSearch&rs='+encodeURIComponent(s_account)+'&q='+encodeURICompo"
+"nent(g));s.Integrate.SocialAuthor.delay();s.Integrate.SocialAuthor."
+"setVars=function(s,p){if(p.tEvar==='reserved'){s.contextData['a.soc"
+"ialauthor']=s.user;}else{s[p.tEvar]=s.user;}}}");
s.socialAuthorSearch=new Function("obj",""
+"var s=this;if(typeof obj==='undefined'||typeof obj.author==='undefi"
+"ned'){s.user='Not Found';}else{s.user=obj.author;}s.Integrate.Socia"
+"lAuthor.ready();");

/*********Media Module Calls**************/

s.loadModule('Media');
s.Media.autoTrack=false;
s.Media.playerName='HTML5';
s.Media.segmentByMilestones=true;
s.Media.trackMilestones='100';
s.Media.trackUsingContextData=true;
s.Media.contextDataMapping = {
'a.media.name':'eVar47,prop12',
'a.media.view':'event14',
'a.media.timePlayed':'event69'
}
s.Media.trackVars='events,eVar47,prop12';
s.Media.trackEvents='event14,event69';


/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.ad=0;i.adpn;i.adpp;i.adppp;i.clk;i.CPM;i.co=0;i.cot=0;i.lm=0;i.l"
+"om=0;m.l[n]=i}};m.openAd=function(n,l,p,pn,pp,ppp,CPM,b){var m=this,i=new Object;n=m.cn(n);m.open(n,l,p,b);i=m.l[n];if(i){i.ad=1;i.adpn=m.cn(pn);i.adpp=pp;i.adppp=ppp;i.CPM=CPM}};m._delete=function"
+"(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new "
+"Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.click=function(n,o"
+"){this.e(n,7,o)};m.complete=function(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=v"
+"o.linkTrackEvents,pe='m_i',pev3,c=vo.contextData,x;if(i.ad){ns+='ad.';if(i.adpn){c['a.media.name']=i.adpn;c[ns+'pod']=i.adpp;c[ns+'podPosition']=i.adppp;}if(!i.vt)c[ns+'CPM']=i.CPM;}if (i.clk) {c[n"
+"s+'clicked']=true;i.clk=0}c['a.contentType']='video'+(i.ad?'Ad':'');c['a.media.channel']=m.channel;c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0)c[ns+'length']=i.l;if(Math.floor(i.ts)>0)c[ns+'ti"
+"mePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView'"
+"]=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3=c['a.contentType'];vo.pe="
+"pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='strin"
+"g'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y=='view'||y=='segmentView'||y=='clicked'||y=='complete'||y=='timePlayed'||y=='CPM'){if("
+"e)e+=','+a;if(y=='timePlayed'||y=='CPM'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x"
+"+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.even"
+"ts2?',':'')+d[x+'s'][c[x]]}}if(c[x])c[x]=undefined;if(y=='segment'&&c[x+'Num'])c[x+\"Num\"]=undefined}}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='"
+"--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!"
+"=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.tr"
+"ackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;if(!m.channel)m.channel=m.s.wd.location.hostnam"
+"e;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(i.ad){ti=m.adTrackSeconds;tp=m.adTrackMilestones;to=m.adTrackOffsetMilestones;sm=m.adSegmentByMilestones;so=m.adSegmentByOffsetMilestones}if(o<0){if(i"
+".lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.ad=i.ad;w.length=i.l;w.openTi"
+"me=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?"
+"'TRACK':(x==5?'COMPLETE':(x==7?'CLICK':('CLOSE')))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if("
+"(x<=3||x>=5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c"
+"&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w"
+".mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0"
+";if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=="
+"'E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if((x>=2||i.x>=100)&&i.lo<o){i.t+=o-i.lo;i.ts+"
+"=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||("
+"x<=3&&i.x>=100)){if(i.lx!=2)i.e+='E'+Math.floor(o);x=0;v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==7){w.clicked=i.clk=1;t=1}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m."
+"completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime"
+"=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new "
+"Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i)"
+";else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,"
+"pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){"
+"var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7"
+"='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new"
+" Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch("
+"e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p="
+"'Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8"
+")x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x."
+"type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p=="
+"2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTime"
+"Scale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x"
+"!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c"
+");o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetL"
+"ength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10|"
+"|!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new"
+" Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack"
+"&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd."
+"addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";s.m_i("Media");

/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p"
+".get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m."
+"l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=func"
+"tion(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*10000"
+"000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf('[',x);if(x>=0){y=u.indexOf(']',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring(0,2)=='s."
+"'){v=s[z.substring(2)];if(!v)v=''}else{v=''+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z) {u=u.substring(0,x)+s.rep(escape(v),'+','%2B')+u.substring(y+1);x=y-(z.length-v.length+1)} else {x=y}}}"
+"}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule('Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay"
+"=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&"
+"&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){var p=this,m"
+"=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.s"
+"cript=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
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
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.tagContainerMarker='';s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingS"
+"erverSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net"
+"';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobi"
+"le?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+(s.tagContainerMarker?\"-\"+s.tagContainerMarker:\"\")+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv"
+">=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+"
+"'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;fo"
+"r(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=windo"
+"w,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s."
+"forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_"
+"top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'"
+"};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v)"
+"{var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLo"
+"werCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google'"
+")>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(',"
+"'+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf"
+",vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',"
+"')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk]"
+";if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(ty"
+"peof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else "
+"if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.subs"
+"tring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv="
+"','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[m"
+"n].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x"
+"=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q"
+"='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocatio"
+"nHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='authState')q='as';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k"
+"=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=functi"
+"on(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFi"
+"lters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.inde"
+"xOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.ln"
+"k=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct."
+"href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForce"
+"dLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcEl"
+"ement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a"
+".parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent"
+"\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var"
+" x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n"
+"=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=t"
+"his,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.p"
+"rotocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagN"
+"ame;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t"
+"=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toL"
+"owerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if"
+"(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.inde"
+"xOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=funct"
+"ion(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s"
+".epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s"
+".sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]"
+"]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var "
+"s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf("
+"\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclic"
+"k',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTrackin"
+"g=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s"
+"_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m)"
+"{if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}retu"
+"rn 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m"
+";l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s"
+".un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl"
+"=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e'"
+",'_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m["
+"l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))r"
+"eturn;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).ind"
+"exOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s."
+"m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).i"
+"ndexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.l"
+"oadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}"
+"else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._i"
+"n+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250"
+";if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/"
+"javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,"
+"u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){v"
+"ar s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=fu"
+"nction(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i"
+"=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s"
+".maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.d"
+"lt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloud"
+"VisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID "
+"= false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck("
+");};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s."
+"audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWa"
+"itingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;"
+"s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisito"
+"rID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisitorID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marke"
+"tingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnaly"
+"ticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalytics"
+"VisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;"
+"s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint ="
+" true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudience"
+"ManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarke"
+"tingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingF"
+"orAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceMa"
+"nagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToT"
+"rack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;i"
+"f (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWh"
+"enReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack())"
+" {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._call"
+"backWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrac"
+"k=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {}"
+";for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s"
+".callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexO"
+"f('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));"
+"if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),s"
+"ess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '"
+"+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if (s.visitor) {if (s.visitor.getAuthState) {s.authState = s.visitor.getAuthState();}if ((!s.supplementalDataID) && ("
+"s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}}if(s.mpc('t',arguments))return;s.g"
+"l(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='"
+"',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.to"
+"Precision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';"
+"if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv"
+">=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.of"
+"fsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return h"
+"p');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30)"
+"{ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectio"
+"nType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);"
+"if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s"
+".eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}i"
+"f(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLea"
+"veQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else "
+"trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-"
+"object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx"
+";if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt"
+"(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s',"
+"'var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+"
+"(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m("
+"'t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageURLRest=s.lnk=s.e"
+"o=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=t"
+"his;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagC"
+"ontainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];"
+"y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='functi"
+"on'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply"
+"(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagNa"
+"me){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('"
+"Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parse"
+"Float(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;"
+"if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalDat"
+"aID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,"
+"ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteL"
+"ightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIn"
+"crementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,authState,linkName,linkType';var n;for(n="
+"1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,re"
+"solution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trac"
+"kingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccoun"
+"tMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,light"
+"TrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=functi"
+"on(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
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
function displayContextChooserIfRequired() {
	if (!contextChooserHasBeenDisplayed) {
		var QueryString = location.href.substring ( location.href.indexOf ( "?" ) );
		
		if (QueryString.indexOf("showContextChooser") > 0) {
			nm.headerScript.loadContextChooserForFiftyOne();
		}
		
		var contextChooserHasBeenDisplayed = 1;
	}
}

function wlcme51func(url) {
	var countryName = '<c:out value="${country}"/>';
	var wlcme51 = document.createElement("script");
	wlcme51.src = url;
	wlcme51.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(wlcme51);
}

