//
// This file contains scripts that are nessary for the proper rendering and interaction of the Global Header and Footer Project.
//
// Contains scripts for WHY tooltip, MINI CART, USER, LOCALIZTION and LOCALIZATION POPUP


/*plugins
===================================*/

//thd.label-over.js v.1.0 - http://ext-dev.homedepot.com/development/homedepot/workbench/index.php/tools/#label-over

jQuery.fn.labelOver=function(e){return this.each(function(){var t=jQuery(this),n=t.attr("for"),r=jQuery("#"+n);if(n){this.hide=function(){t.css({textIndent:-1e4})};this.show=function(){if(r.val()===""){t.css({textIndent:0})}};r.focus(this.hide);r.blur(this.show);t.addClass(e).click(function(){r.focus()});if(r.val()!==""){this.hide()}}})}

$(function(){
	//Hack to setup isotope until it is included from the back-end
	if(typeof $.fn.isotope === 'undefined'){ THDModuleLoader.$includeJS('/static/global/scripts/lib/plugins/jquery.isotope.min.js'); }
	//Include image load detection https://github.com/desandro/imagesloaded
	if(typeof $.fn.imagesLoaded === 'undefined'){ THDModuleLoader.$includeJS('/static/global/scripts/lib/plugins/jquery.imagesloaded.min.js'); }
	//Hack to setup search until hfapp files are included by all teams
	if(typeof THD.Global.Search === 'undefined'){ THDModuleLoader.$includeJS('/static/search/scripts/source/THD.Search.js'); }
});

var timeout, proHeader, consumerHeader;

function getHeaderStoreNum() {
	var locStoreStr = readCookie('THD_LOCSTORE'),
		sepLocStoreStr,	locStoreNum;
		
		sepLocStoreStr = (locStoreStr !== null && locStoreStr.length !== 0) ? locStoreStr.split('+') : 0;
		locStoreNum = sepLocStoreStr[0];
		return locStoreNum;
}
function hfAppToggle(userType){
	var showTab = $('#thdHeader').hasClass('showTab'),
	    toggleURL = (userType !== "pro") ? "/s/BuildLinkToHomeDepot?linktype=commerce&id=professional_contractor&st=P" : "";

	
	if (showTab){
		var proHeaderToggle = '<a id="proToggle" class="dwarf-'+userType+'" href="http://'+getHostNameNonSecure()+ toggleURL +'"></a>';
		$('#toggleButton').prepend(proHeaderToggle);
	}
}

function hfAppPro() {
	$('#thdHeader').remove();
	$('#hfappContainer').prepend(THD.hfAppPro.headerHTML);
	$('#thdHeader').addClass('pro');
	hfAppInit();
	if(THD.Global.TypeAhead){
		THD.Global.TypeAhead.initialize();
	}
}
function hfAppCheck(userType) {
	if (userType === "pro"){
		hfAppPro();
		hfAppToggle(userType);
	}
	else{
		hfAppToggle(userType);
			hfAppInit();
	}
	$("a#proToggle").click(function(){
		setCookieUserType();
	});

}

function setupFlyoutGrid($FlyoutContainer, $Pod){
	if ($FlyoutContainer){
		$FlyoutContainer.isotope({
			itemSelector : $Pod,
			masonry: {
				columnWidth: '1'
			}
		});
	}
}

function getHeaderLocalStore(type) {
	var storeFinderHref;
	var storeFinderUrl;
	var storeInfo;
	var localStoreMenu;
	var localStoreCompare;
	var localizationPopupTrigger;
	var storeLocDetails = getTHDLocalStoreInfo().split(',');
	try {
		var storeZip = getTHDStoreZip();
		var storeNum = getHeaderStoreNum();
		var storeName = getTHDStoreName();
		var storeString = storeName + ' #' + storeNum;
	} catch (e) {
		var storeZip = '';
	}
	// This grabs the ZIP from utlis.js and sets a global VAR
if($("#thdHeader").hasClass("pro")){

	if (storeZip != '' && storeZip != '0') {
		storeFinderHref = 'http://'+getHostNameNonSecure() + '/webapp/wcs/stores/servlet/THDStoreFinder?langId=-1&storeId=10051&catalogId=10053&zip=' + getTHDStoreZip();
		storeFinderUrl = '<a href='+storeFinderHref+' name="&lpos=p-header-store finder">Store Finder</a></li>';
		storeInfo = getTHDLocalStoreInfo();
		localStoreCompare = 'Based on My Store Location: <a style="color:white;" href="' + storeFinderHref + '" title="Store Finder">' + storeString + '</a> (<a class="thdOrange b" href="' + storeFinderHref + '" title="Change or update your local store">Change</a>)';
		localizationPopupTrigger='<div class="locStoreBlock"><p class="localizedPin fLeft"><a class="thdOrange small overlayTrigger" rel="localizationModule" href="#localizationModalContent" title="Change or update your local store" name="&amp;lpos=p-header-icon localization on" style="visibility: visible;"><i class="icon-localization-on" ></i></a></p><div class="fLeft"><p class="locYourStore">Your Store:</p><p class="fLeft"><a href="http://' + getHostNameNonSecure() + '/l/' + updateStoreDetails(storeName) + '/' + $.trim(storeLocDetails[1]) + '/' + updateStoreDetails($.trim(storeLocDetails[0])) + '/' + $.trim(storeZip) + '/' + $.trim(storeNum) + '" class="locStoreName">' + storeString + '</a> <a class="thdOrange small overlayTrigger" href="#localizationModalContent" rel="localizationModule" name="&amp;lpos=p-header-Change or Update Your Local Store" title="Change or update your local store" style="visibility: visible;"> (Change)</a></p></div></div>';
	} else {
		storeFinderUrl = '<a href="http://'+getHostNameNonSecure()+'/StoreFinder/index.jsp" name="&lpos=p-header-store finder">Store Finder</a></li>';
		localStoreCompare = '<a class="thdOrange b" href="' + storeFinderHref + '" title="Store Finder">Choose Your Local Store</a> <a class="tooltip" style="color:white;" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" title="Why?" id="why">(Why?)</a>';
		localizationPopupTrigger = '<a class="thdOrange b overlayTrigger" rel="localizationModule" href="#localizationModalContent" title="Store Finder" name="&lpos=p-header-Select Your Local Store-localization off"><i class="icon-localization-off"></i>Select </a> Your Local Store <a class="smallGreyLink tooltip" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" title="Why?" id="why" name="&lpos=p-header-Why select your local Store">(Why?)</a>';
		};
}
else{

	if (storeZip != '' && storeZip != '0') {
		storeFinderHref = 'http://'+getHostNameNonSecure() + '/webapp/wcs/stores/servlet/THDStoreFinder?langId=-1&storeId=10051&catalogId=10053&zip=' + getTHDStoreZip();
		storeFinderUrl = '<a href='+storeFinderHref+' name="&lpos=d-header-store finder">Store Finder</a></li>';
		storeInfo = getTHDLocalStoreInfo();
		localStoreCompare = 'Based on My Store Location: <a style="color:white;" href="' + storeFinderHref + '" title="Store Finder">' + storeString + '</a> (<a class="thdOrange b" href="' + storeFinderHref + '" title="Change or update your local store">Change</a>)';
		localizationPopupTrigger='<div class="locStoreBlock"><p class="localizedPin fLeft"><a class="thdOrange small overlayTrigger" rel="localizationModule" href="#localizationModalContent" title="Change or update your local store" name="&amp;lpos=d-header-icon localization on" style="visibility: visible;"><i class="icon-localization-on" ></i></a></p><div class="fLeft"><p class="locYourStore">Your Store:</p><p class="fLeft"><a href="http://' + getHostNameNonSecure() + '/l/' + updateStoreDetails(storeName) + '/' + $.trim(storeLocDetails[1]) + '/'+ updateStoreDetails($.trim(storeLocDetails[0])) + '/' + $.trim(storeZip) + '/' + $.trim(storeNum) + '" class="locStoreName">' + storeString + '</a> <a class="thdOrange small overlayTrigger" href="#localizationModalContent" rel="localizationModule" name="&amp;lpos=d-header-Change or Update Your Local Store" title="Change or update your local store" style="visibility: visible;"> (Change)</a></p></div></div>';
	} else {
		storeFinderUrl = '<a href="http://'+getHostNameNonSecure()+'/StoreFinder/index.jsp" name="&lpos=d-header-store finder">Store Finder</a></li>';
		localStoreCompare = '<a class="thdOrange b" href="' + storeFinderHref + '" title="Store Finder">Choose Your Local Store</a> <a class="tooltip" style="color:white;" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" title="Why?" id="why">(Why?)</a>';
		localizationPopupTrigger = '<a class="thdOrange b overlayTrigger" rel="localizationModule" href="#localizationModalContent" title="Store Finder" name="&lpos=d-header-Select Your Local Store-localization off"><i class="icon-localization-off"></i>Select </a> Your Local Store <a class="smallGreyLink tooltip" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" title="Why?" id="why" name="&lpos=d-header-Why select your local Store">(Why?)</a>';
		}
	}
	$('#myStore').html(localizationPopupTrigger);
	$('#navStoreFinder').html(storeFinderUrl);

	if (type === 'menu') {return localizationPopupTrigger;}
	if (type === 'href') {return storeFinderHref;}
	if (type === 'compare') {return localStoreCompare;}
	if (type === 'localization') {return localizationPopupTrigger;}
}

function updateStoreDetails(stParam){
	stParam = stParam.replace(/[ ,/]+/g, '-');
	var updatedStoreDetails = stParam.replace(/[\(\)]/g, "");
	return updatedStoreDetails;
}

function getAccountMenu(loc) {
	var localUserMenu,
		accountMenu,
		thdMyAccount = $('#thdMyAccount'),
		accountInfo = $('#accountInfo');

	try {
		var userName = getTHDUserName();
	} catch (e) {
		var userName = '';
	}
	if($("#thdHeader").hasClass("pro"))
	{
		if(userName !== ''){
			localUserMenu = '<a href="javascript:goToTHDMyAccountFromJS();" ><span id="navUserName">Hello '+getTHDUserName()+', </span></a>';
	        accountMenu = '<a href="javascript:goToTHDMyAccountFromJS();" rel="nofollow">Your Account<i class="icon-carrot-grey-down"></i></a>';
			signInOut = '<li><p><a href="http://'+getHostNameNonSecure()+'/webapp/wcs/stores/servlet/THDLogoff?langId=-1&amp;storeId=10051&amp;catalogId=10053&amp;personalizedCatalog=true&amp;changeUser=true&amp;URL=HomePageView" class="thdMyAccountRegister" data-lpos="p-header-your account-sign out" title="Sign Out">Sign Out</a></p></li>';

		}else{
			localUserMenu = '<a data-lpos="p-header-row3-Sign In" class="myAccount thdOrange b" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10053&" title="">Sign In</a><span> or </span><a data-lpos="p-header-row3-Register" class="thdOrange b" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/UserRegistrationForm?langId=-1&storeId=10051&catalogId=10053&new=Y" title="">Register</a>';
			accountMenu = '<a href="javascript:goToTHDMyAccountFromJS();" rel="nofollow">Your Account<i class="icon-carrot-grey-down"></i></a>';
			 signInOut = '<li><a data-lpos="p-header-your account-sign in" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10053&" class="myAccount btn-orange" title="Log in to your account">Sign In</a></li><li><p><a href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/UserRegistrationForm?langId=-1&storeId=10051&catalogId=10053&new=Y" data-lpos="p-header-your account-register" class="thdMyAccountRegister" title="Get faster online checkouts, project and shopping lists and more">Register</a> for an account.</p></li>';
	      }

	}

	else
	{

		if(userName !== ''){
			localUserMenu = '<a href="javascript:goToTHDMyAccountFromJS();" ><span id="navUserName">Hello '+getTHDUserName()+', </span></a>';
	        accountMenu = '<a href="javascript:goToTHDMyAccountFromJS();" rel="nofollow">Your Account<i class="icon-carrot-grey-down"></i></a>';
			signInOut = '<li><p><a href="http://'+getHostNameNonSecure()+'/webapp/wcs/stores/servlet/THDLogoff?langId=-1&amp;storeId=10051&amp;catalogId=10053&amp;personalizedCatalog=true&amp;changeUser=true&amp;URL=HomePageView" class="thdMyAccountRegister" data-lpos="d-header-your account-sign out" title="Sign Out">Sign Out</a></p></li>';

		}else{
			localUserMenu = '<a data-lpos="d-header-row3-Sign In" class="myAccount thdOrange b" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10053&" title="">Sign In</a><span> or </span><a data-lpos="d-header-row3-Register" class="thdOrange b" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/UserRegistrationForm?langId=-1&storeId=10051&catalogId=10053&new=Y" title="">Register</a>';
			accountMenu = '<a href="javascript:goToTHDMyAccountFromJS();" rel="nofollow">Your Account<i class="icon-carrot-grey-down"></i></a>';
			 signInOut = '<li><a data-lpos="d-header-your account-sign in" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10053&" class="myAccount btn-orange" title="Log in to your account">Sign In</a></li><li><p><a href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/UserRegistrationForm?langId=-1&storeId=10051&catalogId=10053&new=Y" data-lpos="d-header-your account-register" class="thdMyAccountRegister" title="Get faster online checkouts, project and shopping lists and more">Register</a> for an account.</p></li>';
	      }
  }

	accountInfo.html(localUserMenu+'<br>'+accountMenu);
	thdMyAccount.find('.linkList').append(signInOut);
	if (loc === 'user') { return localUserMenu;}
	if (loc === 'account') {return accountMenu;}
}

// Renders items from utils.js to display the MINI CART accordingly
function showCartBlock() {
	if (cookieManager !== undefined || cookieManager !== null) {
		cookieManager.initializeMasterCookie();

		var itemsInCart = getTHDNumberItemsInCart();
		if (itemsInCart !== '0' && itemsInCart !== '') {
			if(itemsInCart > 999){
				$("#miniCartNum").text("999+");
				$("#mcartnum").html("<span>999+</span>")
			}else{
				$("#miniCartNum").text(itemsInCart);
				$("#mcartnum").html("<span>"+itemsInCart+"</span>")
			}
			$("#cart").addClass('btn-orange');
		}
	}
}

/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
(function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else{if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}})(jQuery);


function setCookie(c_name, value, domain) {
	var c_value = escape(value) +  ";domain=" + domain + ";path=/";
	document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
}

//create cookie for cj info cookie
function createCJCookie(name, value, days, domain) {
	var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  else expires = "";
  var name;

  document.cookie = name + "=" + value + expires +  ";domain=" + domain + ";path=/";
}

//create cookie for ci info cookie
function createCICookie(name, value, days, domain) {
	var expires;
  	if (days) {
    	var date = new Date();
    	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    	expires = "; expires=" + date.toGMTString();
  	}
  	else expires = "";
  	var name;

  	document.cookie = name + "=" + value + expires +  ";domain=" + domain + ";path=/";
}

//Get url parameters
function getUrlParams( paraName ){
  paraName = paraName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+paraName+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( decodeURIComponent(window.location.href) );
    if( results === null ){return "";}
    else{return results[1];}
}

//Create cookie for Channel Junction; get url params and set them to the requested format.
function updateCJInfo(){
  //Set Parameters from URL to a variable
  var setCJValue = "AID=" + getUrlParams('AID') + "#SID=" + getUrlParams('SID') + "#PID=" + getUrlParams('PID') + "#cj=" + getUrlParams('cj');
  //Create Cookie
  createCJCookie("CJInfo", setCJValue, 30, getPopupCurrentCookieDomain());
}

//Create cookie for Channel Intelligence; get url params and set them to the requested format.
function updateCIinfo(){

	var setCIValue = getUrlParams('cm_mmc');

	if (setCIValue.indexOf("shopping-_-shopzilla") > -1) {   
		usercookie = "bizrate";
	}  
	if (setCIValue.indexOf("shopping-_-pricegrabber") > -1) {
		usercookie = "pricegrabber";
	}                                                                                                                                                                                                                                                     
	if (setCIValue.indexOf("shopping-_-bingpa") > -1) {  
		usercookie = "bing";
	}
	if (setCIValue.indexOf("CJ-_-500871") > -1) {        
		usercookie = "nexttag";
	}
	if (setCIValue.indexOf("CJ-_-500871") === -1 && setCIValue.indexOf("shopping-_-bingpa") === -1 && setCIValue.indexOf("shopping-_-pricegrabber") === -1 && setCIValue.indexOf("shopping-_-shopzilla") === -1) {
		if(setCIValue.indexOf("CJ-_-1319015") > -1 || setCIValue.indexOf("shopping") > -1) { 
			usercookie = "shopping";
		}
	}			
	/* SET THE COOKIE */
	createCICookie("CI_SHOPPING", usercookie, 30, getPopupCurrentCookieDomain());
}

/* PLP_loadPopup function load the pop up banner from globalHeadTop.html for the first time autolocalized scenario. and Auto localize failture scenario.*/

function loadBannerPopup() {
	var localized = true,
		strNbr = readCookie("THD_LOCSTORE"),
		autolocalizesession = readCookie("THD_AUTOLOCALIZED_SESSION"),
		thdSession = readCookie("THD_SESSION"),
		domain =  getPopupCurrentCookieDomain(),
		$nonLocBanner = $("#nonlocalizeBanner"),
		$locBanner = $("#localizeBanner");

//  if(domain.indexOf("http://") !== "-1"){domain = domain.replace("http://", "");}

	if(strNbr !== null && strNbr !== "") {
		localized = true;
	}else {
		localized = false;
	}


	if(thdSession.indexOf("C37=1") != "-1" ){
		thdSession = thdSession.replace("C37=1", "C37=2");

		if(localized) {

	//      cookieManager.createCookie("THD_AUTOLOCALIZED_SESSION","2",null)
			$("#localizeBanner").fadeIn("slow");
			timeout = setTimeout(function(){
			$("#localizeBanner").fadeOut("slow");
			},5000);
			setCookie("THD_SESSION", thdSession, domain);
		}else{

	//      cookieManager.createCookie("THD_AUTOLOCALIZED_SESSION","2",null)
			$("#nonlocalizeBanner").fadeIn("slow");
			timeout = setTimeout(function(){
			$("#nonlocalizeBanner").fadeOut("slow");
			},5000);
			setCookie("THD_SESSION", thdSession, domain);
		}
	}




	$("body").delegate("#localizeBanner,#nonlocalizeBanner","click",function(e){
		var $target = $(e.target);

		if($target.hasClass("close_text") || $target.hasClass("orange_x")){
			$locBanner.fadeOut("slow");
			$nonLocBanner.fadeOut("slow");
		}
	}).click(function(e){
		var $target = $(e.target);

		if( $target.parent().is("#localizeBanner,#nonlocalizeBanner") || $target.hasClass("banner_input")){
			e.stopPropagation();
		}else{
			$locBanner.fadeOut("slow");
			$nonLocBanner.fadeOut("slow");
		}
	});

	$('#localizeBanner').mouseenter(function (e) {
		if (timeout!==null){
		clearTimeout(timeout);
		}
	});

	$('#nonlocalizeBanner').mouseenter(function (e) {
		if (timeout!==null){
		clearTimeout(timeout);
		}
	});

	$('#nonlocalizeplpZipCode1').mouseenter(function (e) {

		if (timeout!==null){
		clearTimeout(timeout);
		}
	});
}

$(window).load(function() {

	/*Create cj info cookie if redirect url has cj parameter  */
	if(window.location.href.indexOf("cj=true") != -1){
		updateCJInfo();
	}

	/*Create ci info cookie if redirect url has cm_mmc parameter  */
	if (window.location.href.indexOf("cm_mmc") != -1) {
    	updateCIinfo();
	}
	
});


/*Top position for tophat localize and non-localize banner */

function getInternetExplorerVersion()
// Returns the version of Windows Internet Explorer or a -1
// (indicating the use of another browser).
{
   var rv = -1; // Return value assumes failure.
   if (navigator.appName === 'Microsoft Internet Explorer')
   {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) !== null)
			rv = parseFloat( RegExp.$1 );
   }
   return rv;
}


function getDomain(){
	var currentdomain = window.location.hostname;
	var currentProtocal = window.location.protocol;
	currentdomain = currentProtocal + "//" + currentdomain  ;
	if (currentdomain.indexOf("secure.") != "-1"){currentdomain = currentdomain.replace("secure.", "");}
	if (currentdomain.indexOf("https") != "-1"){ currentdomain = currentdomain.replace("https", "http");}
	return currentdomain;
}

function validateBannerZip() {
	var zipValuenonLocal = document.getElementById("nonlocalizeplpZipCode1").value;
	window.open("http://"+getHostNameNonSecure()+"/StoreFinder/index.jsp" + "?URL=" + getRedirectUrlForStoreFinder(false, false, "", true) + "&address=" + zipValuenonLocal, "_self");
}

function validateBannerZiponKeypress(evt, thisobj) {
	if (timeout !== null){clearTimeout(timeout);}
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if (evt) {
		if (evt.keyCode === 13 || evt.which === 13) { validateBannerZip();}
	}
}

function changeStore() {
	var storeZip = getTHDStoreZip();
	window.open("http://"+getHostNameNonSecure() + "/StoreFinder/index.jsp" + "?URL=" + getRedirectUrlForStoreFinder(false, false, "", true) + "&address=" + storeZip, "_self");
}

/*Checks to see which is cliked then pushes page as necessary*/
var headSignIn=false;/*initialize for track signIn trigger*/
$(document).on("click", "#thdHeader a,#thdFooter a",function(e){
	if(headSignIn===true){
	headSignIn = false;}

    var $this = $(this);

	if($this.hasClass("accountProfile")) {
		e.preventDefault();
		THD.MyAccount.ThdSignInModal.goToMyAccountProfile();
	}
	else if($this.hasClass("ordersPurchases")) {
		e.preventDefault();
		goToOrderStatusFromJS();
	}
	else if($this.hasClass("myList") && $this.text() === 'My Lists') {
		e.preventDefault();
		THD.MyAccount.ThdSignInModal.goToMyLists();
	}
	else if($this.hasClass("myProjectGuides")){
		e.preventDefault();
		goToTHDMyProjectsFromJS();
	}
	else if($this.hasClass("creditCenter")){
		e.preventDefault();
		goToTHDMyCreditFromJS();
	}
	else if($this.hasClass("myAccount")){
		e.preventDefault();
		headSignIn=true;
		THD.MyAccount.ThdSignInModal.goToMyAccountSignIn();
	}
	else if($this.hasClass("mainLink")){
		setCookieUserType();
	}
	else if($this.hasClass("proLink")){
		setCookieUserType();
	}
})
//call quick order module in secure iframe
.on("click","#quickorderModule, .quickorderModule, .quickOrder",function(e){
    e.preventDefault();
    var thisSecureDomain = getHostNameSecure();
	/**
	 * If mylist.js is not loaded already we are dynamicallly loading it.
	 * addToListFromPro will set if mylist.js is already loaded
	 **/	
	if(typeof(THD.MyAccount.addToListFromPro) === 'undefined'){
		var mylistURL = document.location.protocol + "//" + document.location.hostname +"/static/myaccount/scripts/source/myList.js"; // set the src attribute
		THDModuleLoader.$includeJS(mylistURL);
	}	
	if(typeof(THD.MyAccount.signInModalValidation) === 'undefined'){
		var popupURL = document.location.protocol + "//" + document.location.hostname +"/static/myaccount/scripts/source/popup.js"; // set the src attribute
		THDModuleLoader.$includeJS(popupURL);
	}
	
	/* commented the below code for QC # 42234 being addressed as part of release 7.26 */
	/*if($("head").find("link[href*='global_mylists.css']").length === 0){
		var mylistCSSURL = document.location.protocol + "//" + document.location.hostname +"/static/myaccount/styles/source/global_mylists.css"; // set the src attribute
		THDModuleLoader.$includeCSS(mylistCSSURL);
	}*/
	
    $.fancybox({
        'titleShow': false,
        'hideOnOverlayClick': false,
        'width': 841,
        'autoSize': false,
        'height': 690,
        'padding':0,
        'href' : "https://"+ thisSecureDomain + '/webapp/wcs/stores/servlet/THDQuickOrderFormAjaxResponseView?langId=-1&storeId=10051&catalogId=10053',
        'type': 'iframe',
        'overlayOpacity':0.7,
        'overlayColor':'#666',
        'scrolling': 'no',
        'autoScale': false,
        'transitionIn':'none',
        'transitionOut': 'none',
        'showCloseButton': true,
        'onClosed' : function(){
			window.location.reload();
        }
    });
});

	function hfAppInit(){
		getHeaderLocalStore('href');
		getAccountMenu('account');
		showCartBlock();
		THDModuleLoader.$includeModule('localizationpopup');
		//add files for localization pop up

		// displays the header WHY tooltip mouseover
		$('#why').mouseover(function(e){
			//xOffset = 348;
			var yOffset = 15;
			if ($('#whyToolTip').length == '0') {
				$('body').append('<div id="whyToolTip"></div>');
				var whyTip = $('#whyToolTip');
				var text = this.title;
				whyTip.text(text);
				this.title = '';
				var whyOffset = $('#why').offset();
				var whyTop = whyOffset.top;
				var whyLeft = whyOffset.left;
				var leftPos = whyLeft;
				var topPos = whyTop + yOffset;
				whyTip.css('top', topPos + "px").css("left", leftPos + 'px').fadeIn('fast');
			} else {
				var whyOffset = $('#why').offset();
				var whyTop = whyOffset.top;
				var whyLeft = whyOffset.left;
				var leftPos = whyLeft;
				var topPos = whyTop + yOffset;
				$('#whyToolTip').css('top', topPos + "px").css("left", leftPos + 'px').fadeIn('fast');
			}
		});
		$('#why').mouseout(function(){
			$('#whyToolTip').fadeOut('fast');
		});

		//Hover Intent Settings
		$("#hd-deptNav").find(".item").hoverIntent({
			sensitivity: 70, // number = sensitivity threshold (must be 1 or higher)
			interval: 150, // number = milliseconds of polling interval
			over: showFlyout, // function = onMouseOver callback (required)
			timeout: 150, // number = milliseconds delay before onMouseOut function call
			out: hideFlyout // function = onMouseOut callback (required)
		});
		
		function showFlyout(){
			$(this).addClass('active');
            var $FlyoutContainer = $(this).find('.flyout.grid_24'),
            $FlyoutImages = $FlyoutContainer.find('img'),
            $Pod = '.pod',
            $Mutlirow = $(this).find('.flyout.grid_24 div').hasClass('grid_24');
            if ($FlyoutImages.length > 0) {
                            if($Mutlirow){
                                            $FlyoutContainer = $(this).find('.flyout .grid_24');                                                                             
                            }
                            $FlyoutImages.imagesLoaded(setupFlyoutGrid($FlyoutContainer, $Pod));
            } else {
                            
                            setupFlyoutGrid($FlyoutContainer, $Pod);
            }
		}

		function hideFlyout(){ $(this).removeClass('active'); }


		/* for header search box, this removes error text on focus. This cannot go in
		utils.js with other header search stuff because jquery is loaded after.
		var searchFieldText is in utils.js
		9-13-2012 Search Project.
		*/
		function SearchErrorFunction() {
			var $searchFocus = $('#searchFocus');
			$searchFocus.focus(function(){
				if($searchFocus.val()==searchFieldText) {
					$searchFocus.val('');
				}
			});
		}
		var searchFieldText = 'Enter Keyword or SKU';

		SearchErrorFunction();

		$("ul#dept-list").delegate("a", "click", function(e){
			e.preventDefault();
			var $this = $(this),
				intIndex = $this.index(),
				strCategory = $this.text(),
				iWidthSearchTextBox,
				iTotalSearchBlockWidth = 404,
				ibuttonWidth = 45,
				iWidthDeptDropdown;
			//add category name
			$("#list span").text(strCategory);
			//Populating the values in the hidden fields for the breadcrumbs
			document.getElementById('encodedNVal').value=$this.attr('id');/*pxk8554*/
			//calcualte the width
			iWidthDeptDropdown = $("#dept-dropdown").width();
			//calculate the input control width
			iWidthSearchTextBox = iTotalSearchBlockWidth - ibuttonWidth - iWidthDeptDropdown;
			//apply the width
			$("#searchFocus").width(iWidthSearchTextBox);
		});
		//remove search label plugin
		$("form label.labelRemove").labelOver('over-apply');
		//Submit the email subscription form when the user clicks on the email button in the footer.
	    $("#btnEmailFooter").click(function(e){
	    	e.preventDefault();
	        $("#emailsub").submit();
	    });
	    $('.topHeaderNav li:last, .bottomHeaderNav li:last').addClass('omega');
	}

// Gets called after DOM is ready
$(function () {
	
    /*while moving from 3rd party site to main site using toggle, THD_PERSIST loses all the secured data, 
		Before redirecting the toggled page, THD_PERSIST_3P temporarily stores the complete data of THD_PERSIST
		so while loading the page we need to check if THD_PERSIST_3P has any data or not, if yes then we need to transfer it back into the THD_PERSIST
		*/
		var usercookie = readCookie("THD_PERSIST_3P"), locStoreNum, locStoreNumArr, jsonURL = "";

		if(usercookie){
				/*extract the store number from THD_PERSIST_3P*/
			
				locStoreNumArr = usercookie.split("C4=").slice(1);
				
				
				if(locStoreNumArr.length>0)	{
					locStoreNumArr = locStoreNumArr[0].split("+").slice(0);
					locStoreNum = locStoreNumArr[0];
			

					cookiedomain = getPopupCurrentCookieDomain();

					setCookie("THD_PERSIST",usercookie,cookiedomain);
					restoreLoclaization(locStoreNum,"www.homedepot.com");
					
					if (usercookie.indexOf("C13")>0){
						jsonURL = getAjaxDomain()+"/webapp/wcs/stores/servlet/UserExperienceUpdate?langId=-1&storeId=10051&catalogId=10053&operation=update&fromPage=header";
						jsonURL += (usercookie.indexOf("C40=C") > 0) ? "&demographicsField5=C" : "&demographicsField5=P";
						blnSetCookie = ajaxSetCookieDB(jsonURL);
						
					}//making sure that the C40 crumb is set after coming back to the home site form 3rd party site.
					
					/*empty the THD_PERSIST_3P*/
					setCookie("THD_PERSIST_3P","",cookiedomain);
				}
		}

		else
		  usercookie=readCookie('THD_PERSIST');

    if (usercookie){
       	if(usercookie.indexOf("C40=P")>0 ){hfAppCheck('pro');}
     	else {hfAppCheck('main');}
    }
    else {hfAppCheck('main');}
});


/*Restoring the localization details
locStoreNum: local store number ex: 121, 6498
domain: current domain to make the AJAX call,e x: www.hoemdepot.com or hd-st72.homedepotdev.com

*/
function restoreLoclaization(locStoreNum, domain){
	if(locStoreNum !== "" && locStoreNum > 0){							
		var setStoreURL = domain+"/webapp/wcs/stores/servlet/THDStoreFinderStoreSet?recordId=" + locStoreNum;
		$.ajax({
			url: setStoreURL,
			async:false,
			cache:true,
			success: function(){
				cookieManager.initializeMasterCookie();
				$('#myStore').html(getHeaderLocalStore('localization'));
				attachOverlays();								
			}
		});
	}
}

function isThirdParty(){
	 return (window.location.hostname.indexOf("www.") < 0 && window.location.hostname.indexOf("hd-") < 0)? true : false;
}

function getAjaxDomain(){
	/*if its a third party site*/   
	return (isThirdParty()) ? "http://www.homedepot.com" : window.location.protocol+"//"+window.location.hostname;  
}

function setCookieUserType(){
	    
	     var  usercookie=readCookie('THD_PERSIST'),
              blnSetCookie=false,
              loginId=readCookie("THD_USERNAME"),
              locStoreNum=getTHDStoreNo(),
              ajaxDomain=getAjaxDomain(),
              jsonURL=ajaxDomain+"/webapp/wcs/stores/servlet/UserExperienceUpdate?langId=-1&storeId=10051&catalogId=10053&operation=update&fromPage=header";
               
             

			 if (usercookie){ 
					if(usercookie.indexOf("C40")>0){ 
						if(usercookie.indexOf("C40=C")>0) {usercookie=usercookie.replace("C40=C","C40=P");jsonURL+="&demographicsField5=P";}
			         	else {usercookie=usercookie.replace("C40=P","C40=C");jsonURL+="&demographicsField5=C"}				
					}
					else{/*if there is no C40 crumb, this is never the case though*/
						usercookie+="C40=P:;C40_EXP=51840000"; jsonURL+="&demographicsField5=P";
					}
						
					setCookie("THD_PERSIST",usercookie,getPopupCurrentCookieDomain());/*set the cookie*/
					if(isThirdParty()){
						setCookie("THD_PERSIST_3P",usercookie,getPopupCurrentCookieDomain());
						}
					
					restoreLoclaization(locStoreNum,ajaxDomain);
					if (loginId!="" && loginId!=null && loginId!=undefined){blnSetCookie=ajaxSetCookieDB(jsonURL);}
					
			}
}

function getRedirectUrlForStoreFinder(removeBrowseOptionVar, removeProductCompareVar, browseOptionValue, bannerFlag) {
	var storeFinderRedirect = window.location.href;

	if(storeFinderRedirect.indexOf("?") == "-1"){storeFinderRedirect += "?";}
	if(removeBrowseOptionVar) {storeFinderRedirect = removeBrowseOption(storeFinderRedirect);}
	//if(removeProductCompareVar) {storeFinderRedirect = removeRecordCompare(storeFinderRedirect);}
	if(browseOptionValue !== null && browseOptionValue !== "") {storeFinderRedirect = storeFinderRedirect + "&browsestoreoption=" + browseOptionValue;}
	if(bannerFlag){storeFinderRedirect = storeFinderRedirect + "&fromAutolocaliseBanner=true";}
	// Double encoding to avaoid special characters like +, #.
	return encodeURIComponent(encodeURIComponent(storeFinderRedirect.replace('#', '&#')));
}


/************************* End of Search functionality**************************************************************************/

/************* Set THD_PERSIST C40=P or C*************************/
//AJAX call to set the database and the persist cookie
function ajaxSetCookieDB(jsonUrl)
{
       $.ajax({
            url:jsonUrl,
            type:"GET",
            async:false,
            success : function(response) {return true;},
            error : function(jqXHR,exception){var ajaxError = jqXHR.responseText+" - "+jqXHR.status+" - "+exception;return false;}
            });
}
function loadPro() {
	var usercookie = readCookie('THD_PERSIST');
    if(usercookie.indexOf("C40=P")>0) {
    	var redirectURL = 'http://'+getHostNameNonSecure() + '/webapp/catalog/servlet/ContentView?pn=Pro_Contractor&storeId=10051&langId=-1&catalogId=10053';
    	window.location.href = redirectURL;
    }
}

/*Display SIGN-In popup modal window start here*/
function goToLinkFromJS(nonRegisteredURL, RegisteredURL) {
 var splitIndex, ajaxURL, postData, response, redirectUrl = nonRegisteredURL, isLoggedOn = readCookie("THD_USERSTATUS");
  if(isLoggedOn) {/*check user has already logged in?*/
  redirectUrl = RegisteredURL;
  document.location.href = redirectUrl;/*redirect to requested page*/
  }else if(!isLoggedOn && THD.MyAccount.ThdSignInModal.checkThrdPrtyLinks()==false){/* check if not in Thirdparty page, sent Ajax Request to show signIn modal.*/
   splitIndex = nonRegisteredURL.indexOf('?');
   ajaxURL = '/webapp/wcs/stores/servlet/THDAjaxLogon';
   postData =nonRegisteredURL.slice(splitIndex+1);
    if(RegisteredURL!=""){
	postData = postData + 'reqFrom=DeepLink';
	}
	response = $.ajax({
	url: ajaxURL,
	type:"POST",
	data: postData,
	success: function(data){
	/* Check if LoadFancyPopup function Exist or not*/
	 if($.isFunction(window.loadFancyPopup)){
	 loadFancyPopup(data);
	 } else {
	 /* if LoadFancyPopup not exist then page redirecting to Sign in landing page */
	 document.location.href = redirectUrl;
	 }
	},complete:function(){
	/*updating the url in signIn page*/
	 if($('#AccountDisplayURL').length >0 && headSignIn === true){
	 var actualURL  =$('#AccountDisplayURL').val();
	 $("#URL").val(actualURL);
	 }
	},error: function(data){
	/* Ajax Failure Scenario*/
	document.location.href = redirectUrl;
	}
	});
} else{/*If it is thirdparty page then page will redirected to signIn page.*/
  document.location.href = redirectUrl;
  }
}/*end of display SIGN-In popup modal*/

/*On Click of help deep links Calling related function to show SIGN-IN popup modal*/
$(document).on("click", ".left_nav_wrapper a, .two_col_fragment_wrapper a, a.purchaseHistory",function(e){
 var deepLinksTxt = $(this).text();//get Link Text
 var imgHeadTxt=$(this).parent().find("h3").text(); // get Image Head Text.
 if(deepLinksTxt === 'My List') {
 e.preventDefault();
 THD.MyAccount.ThdSignInModal.goToMyLists();
 } else if(deepLinksTxt === 'My Projects') {
 e.preventDefault();
 goToTHDMyProjectsFromJS();
 } else if(deepLinksTxt === 'Order History') {
 e.preventDefault();
 THD.MyAccount.ThdSignInModal.goToOrderStatusPage();
 } else if(deepLinksTxt === 'My Account Sign In' || deepLinksTxt === 'MY ACCOUNT' || imgHeadTxt === 'MY ACCOUNT') {
 e.preventDefault();
 THD.MyAccount.ThdSignInModal.goToMyAccountPage();
 } else if(deepLinksTxt === 'Account Profile') {
 e.preventDefault();
 THD.MyAccount.ThdSignInModal.goToMyAccountProfile();
 }else if(deepLinksTxt === 'View Purchase History') {
 e.preventDefault();
 THD.MyAccount.ThdSignInModal.goToOrderStatusPage();
 }
 else{
 return true;
 }
 }); /*end of help deep links click function.*/
/*Sign in modal functionality starts here */
THD.MyAccount.ThdSignInModal = {
    goToMyAccountProfile: function () {//My Account URL Redirect
        var nonRegisteredTHDMyAcctURL = THDLogonCmd + "URL=UserRegistrationUpdateForm&",
            registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/UserRegistrationUpdateForm?storeId=10051&langId=-1&catalogId=10053';
        goToLinkFromJS(nonRegisteredTHDMyAcctURL, registeredURL);
    },
    goToMyLists: function () { //My List URL Redirect
        var nonRegisteredTHDMyAcctURL = THDLogonCmd + "URL=InterestItemDisplay&",
            registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/InterestItemDisplay?catalogId=10053&storeId=10051&ddkey=https:THDInterestItemVerify';
        goToLinkFromJS(nonRegisteredTHDMyAcctURL, registeredURL);
    },
    goToMyAccountSignIn: function () { //OnClick of header deep links SignIn & SignIn Button to show sign modal
        var nonRegisteredTHDMyAcctURL = THDLogonCmd,
            registeredURL = "";
        goToLinkFromJS(nonRegisteredTHDMyAcctURL, registeredURL);
    },
    goToOrderStatusPage: function () { /*Order History redirection from help deep links to show signIn modal*/
        var nonRegisteredURL = THDLogonCmd + "URL=OrderSummaryJSONView&",
            registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/OrderSummaryJSONView?storeId=10051&langId=-1&catalogId=10053&ParentPageName=OnlineOrdersPage&orderType=online';
        goToLinkFromJS(nonRegisteredURL, registeredURL);
    },
    goToMyAccountPage: function () { /*My Account redirection from help deep links to show signIn modal*/
        var nonRegisteredTHDMyAcctURL = THDLogonCmd + "URL=UserAccountView&",
            registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/UserAccountView?storeId=10051&langId=-1&catalogId=10053';
        goToLinkFromJS(nonRegisteredTHDMyAcctURL, registeredURL);
    },
    checkThrdPrtyLinks: function () { /*Check Third party page for restricting sign modal in the header links.*/
        var CurrentHostName = location.hostname; //get hostname from url
        if (CurrentHostName === getHostNameNonSecure() || CurrentHostName === getHostNameSecure()) { //compare hostname with environment hostname name
            return false;
        } else {
            return true;
        }
    }
};
/*Sign in modal functionality ends here */

/*
    THD.Global.AutoLocalization.Promise

    Dependencies:
        window.cookieManager - Object
        getHeaderLocalStore - Method
        THD.log - Method

    Methods:
        None

    Promises:
        THD.Global.AutoLocalization.Promise.loaded - Once AutoLocalizations have loaded correctly

    Usage:
        THD.Global.AutoLocalization.update();

        THD.Global.AutoLocalization.Promise.loaded.then(
            function () { ... },
            function () { ... }
        );
        THD.Global.AutoLocalization.Promise.loaded.done(function () { ... })
*/
(function (loc, locPromise) {
    /*
        Private Variables
    */
    var config = {
        url : {
            autoLocalizationService : '/p/triggerAutoLocalization'
        },
        text : {
            localizationFailed : 'error',
            cookieName : 'THD_LOCSTORE'
        }
    };

    var promises = {
        loaded:  $.Deferred()
    }

    /*
        Public Variables
    */
    locPromise.loaded = promises.loaded.promise();

    /*
        Private Functions
    */
    function cookiesNotLoaded() {
        // Read the cookie
        var testCookie = window.cookieManager.readCookie(config.text.cookieName),
            // cookieManager always returns empty string if not defined.
            result = (testCookie.length === 0);

        return result;
    }

    // Cookies automatically updated by the ajax request, but the
    // cookieManager must be updated
    function updateCookies() {
        // Update the cookie manager after getting the new cookies
        window.cookieManager.initializeMasterCookie();

        // Resolve the promise
        promises.loaded.resolve();
    }

    function handleError () {
        THD.log('Error occurred while attempting to load cookies via ajax service.');
        promises.loaded.reject();
    }

    /*
        Public Functions
    */
    loc.update = function () {
        var updateFunctionAvailable = (typeof getHeaderLocalStore !== 'undefined');

        if (updateFunctionAvailable) {
            // $('#myStore').html(getHeaderLocalStore('menu'));
            // is redudent
            getHeaderLocalStore('menu');
        } else {
            THD.log('Cannot update localization in header.');
        }
    }

    /*
        Initialization Events
    */
    function onLoad () {
        // When localized, then update
        locPromise.loaded.done(loc.update);
    }

    function onReady () {
        // Check if the cookies are loaded
        if (cookiesNotLoaded()) {
            // Request cookies from autolocalization service
            $.ajax(config.url.autoLocalizationService)
                .then(updateCookies, handleError);
        } else {
            // Already loaded, so resolve the promise
            promises.loaded.resolve();
        }
    }

    /*
        Bind Events
    */
    onLoad();

    $(document).ready(onReady);
}(
    THD.Utility.Namespace.createNamespace('THD.Global.AutoLocalization'),
    THD.Utility.Namespace.createNamespace('THD.Global.AutoLocalization.Promise')
));

/*
	Disabling Geolocalization Tophat as per ION-2140
	HTML5 Geo-Localization
	THD.Global.GeoLocalize will be initiated depending on THD_GEOLOCALIZED Cookie.
	For Persistent and InStore users this feature will not be available.


$(window).on("load", function(){
		var isManualSetStore = function(){
			var thdPersist =  readCookie("THD_PERSIST"),
                thdPersistCookieArray = thdPersist.split(';'),
                c4storeNum = "",
                c27storeNum = "";
				for(var i=0;i<thdPersistCookieArray.length-1;i++){
					if(thdPersistCookieArray[i].indexOf('C4=') !== -1){
						var setC4StoreNum = thdPersistCookieArray[i].split('+')[0].split('=');
						if(setC4StoreNum[1].indexOf(" ")!=-1){
							setC4StoreNum[1] = setC4StoreNum[1].split(' ')[0];
						}
						c4storeNum = setC4StoreNum[1];
						c4storeNum = (c4storeNum !== "")? c4storeNum : "";
					}
					if(thdPersistCookieArray[i].indexOf('C27=') !== -1){
							var setC27StoreNum = thdPersistCookieArray[i].split('+')[0].split('=');
							if(setC27StoreNum[1].indexOf(" ")!=-1){
								setC27StoreNum[1] = setC27StoreNum[1].split(' ')[0];
							}
							c27storeNum = setC27StoreNum[1];
							c27storeNum = (c27storeNum !== "")? c27storeNum : "";
					}
				}
				return c4storeNum !== c27storeNum; 
		}();
	if("geolocation" in navigator && isManualSetStore !== true){
		var loggedUser = readCookie("THD_USERNAME"),
			geoCookie = getCookie("THD_GEOLOCALIZED"),
			isCartPage = $('#cartContainer').length,
			isEmptyCartPage = $('#emptyCart').length,
			isInstore = window.localStorage.getItem("THD_IS_INSTORE"),
			determineHost = function(i){
			var sub = window.location.host;
			sub = sub.split(".");
			//checking to see if we are in and LLC
			try{
				secureLLC = Boolean(sub[1].indexOf("hd-") === 0);
			}catch (e){
				THD.isLogging = true;
				THD.log("Error: " + e + " - D'OH! You're getting this error becasue you are running on localhost:XXXX. The workaround is for you to update your hosts file localhost domain (127.0.0.1 localhost) to a genric domain like, local.homedepot.com!  Don't know how to change your hosts file you say? Check out this article: http://bit.ly/1fueDGB.");
			}
			sub = sub[i];
			return sub;
		},
		//Private: sets the full path of the resource based on environment
		path = function(){
			var httProtocol = window.location.protocol,
				subDomain = determineHost(0),
				topDomain = (secureLLC) ? determineHost(2) : determineHost(1);

			return (topDomain === "homedepotdev") ? httProtocol + "//" + subDomain + (httProtocol === "https:" ? "." + determineHost(1) : "") + "." + topDomain + ".com" : httProtocol + "//" + (httProtocol === "http:" && subDomain !== "secure2" ? "www" : "secure2") + ".homedepot.com";
		}(),
			inStoreURL = path+'/HFApp/servlet/GeoLocalization',
			inStoreUser = "";
		if(isInstore === null){
			$.ajax({
				type: "GET",
                url: inStoreURL,
                success: function(){
					window.localStorage.setItem('THD_IS_INSTORE', 'true');
					inStoreUser = readCookie("THD_INSTORE");
					if(inStoreUser !== "" || loggedUser !== "" || isCartPage > 0 || isEmptyCartPage > 0){
					return false;
					}
					else if(!geoCookie){
					THDModuleLoader.$includeJS('/static/scripts/modules/thdGeolocalize.js');
					}
				}
            });
		}
		else{
			inStoreUser = readCookie("THD_INSTORE");
				if(inStoreUser !== "" || loggedUser !== "" || isCartPage > 0 || isEmptyCartPage > 0){
						return false;
				}
				else if(!geoCookie){
						THDModuleLoader.$includeJS('/static/scripts/modules/thdGeolocalize.js');
				}
		}
	}	
});

	HTML5 Geo-Localization 
*/



/* ==============================================================
*	Ajax Static Flyout Module
* ==============================================================*/

!function (THD, $) {
	var output;

	THD.Global.HeaderFooter = {
		  "instance":"",
		  "env": "",
		  "pro": "",
		  "secureClient": "",
		  "cacheTime":"",
		  "host": ""
	};
	
	THD.Global.StaticFly = {};		
				
	//Checks to see if you are on pro site
	function checkProCookie() {
		var pro = false,
			usercookie = window.readCookie('THD_PERSIST');

		if(usercookie) {
			if(usercookie.indexOf("C40=P")>0) {
				pro = true;
			}
		}

		return pro;
	}
	
	THD.Global.StaticFly.init = function(){ 
		var $l1 = $("#main-nav-dropdown").find(".item");
		var instance = THD.Global.HeaderFooter.instance;
		var env = THD.Global.HeaderFooter.env;
		var secureClient = THD.Global.HeaderFooter.secureClient;
		var host = THD.Global.HeaderFooter.host;
		var cacheTime = THD.Global.HeaderFooter.cacheTime;
		isPro = checkProCookie();
		url = host + "/HFApp/rs/staticFly/headerFooterFlyout?instance="+instance+"&secureClient="+secureClient+"&env="+env+"&pro="+isPro+"&timeStamp="+cacheTime;
		THD.log('Making ajax call to : ' + url);

		//fetch the flyout
		$.ajax({
			type: 'GET',
			url: url,
			async: false,
			jsonpCallback: 'staticFlyCallback',
			dataType: 'jsonp',
			timeout: 10000,
			cache:true,
			contentType: 'application/json',
			success: function(data){
				output = data;
				THD.log('Successfully loaded the static fly via ajax service.');
				
			},error: function(data){
				THD.log('Error occurred while attempting to load static fly via ajax service.');
			}
		});

		$l1.hoverIntent({
			sensitivity: 70, // number = sensitivity threshold (must be 1 or higher)
			interval: 150, // number = milliseconds of polling interval
			over: showFlyOut, // function = onMouseOver callback (required)
			timeout: 150, // number = milliseconds delay before onMouseOut function call
			out: hideFlyOut // function = onMouseOut callback (required)
		});	
	};	
	
	var showFlyOut = function ($THDFlyout, $containerName){
		$THDFlyout = $(this).find('.flyout');
		$containerName = $(this).find('a').data('flyouturl');
		
		$THDFlyout.html(output[$containerName]);
		$(this).addClass('active');
        
        var $FlyoutContainer = $(this).find('.flyout.grid_24'),
        $FlyoutImages = $FlyoutContainer.find('img'),
        $Pod = '.pod',
        $Mutlirow = $(this).find('.flyout.grid_24 div').hasClass('grid_24');
        if ($FlyoutImages.length > 0) {
			if($Mutlirow){
				$FlyoutContainer = $(this).find('.flyout .grid_24');                                                                             
			}
			$FlyoutImages.imagesLoaded(setupFlyoutGrid($FlyoutContainer, $Pod));
		} else {
			setupFlyoutGrid($FlyoutContainer, $Pod);
		}
	};
	
	var hideFlyOut = function (THDFlyout){
		$(this).removeClass('active');
	};

	window.staticFlyCallback = function(){ return; };

	//iPad Navigation Fix, allows the navigation to have a hover effect.
$(document).on("click", '#hd-deptNav .sad', function(e) {

  if (THD.Utils.GestureHandler.touch === true) {
      e.preventDefault();
      var $switchesDisplay = $('.switches');

      if ($switchesDisplay.css('display') === 'block') {
          $switchesDisplay.css('display', 'none');
      } else {
          $switchesDisplay.css('display', '');
      }
  }
});

$(document).on("click", '#main-nav-dropdown > .item', function(e) {

  $(this).siblings('li').removeClass('active');

	if ($(this).attr('class') === 'item') {

	  if (THD.Utils.GestureHandler.touch === true) {
	      e.preventDefault();
	      
	  }
	}
});

}(window.THD, window.jQuery);
