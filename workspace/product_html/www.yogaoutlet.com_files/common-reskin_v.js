ROCookies = {
    createCookie: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: function(name) {
        ROCookies.createCookie(name, "", -1);
    }
}

var topBannerHtml;
/*topBannerHtml = "<style>";
topBannerHtml += ".banner-holiday-shop { background:url('/images/banner/banner-holiday-shop-topnav2.jpg') 50% 0 no-repeat; margin-bottom:1px;}";
topBannerHtml += ".banner-holiday-shop a { display:block; height:58px; text-indent:-9999px; text-align:center;}";
topBannerHtml += ".banner-holiday-shop a:hover { text-decoration:none;}";
topBannerHtml += "</style>";
topBannerHtml += '<div class="banner-holiday-shop"><a href="/yoga-holiday-shop-c13177/" title="Holiday Shop 2014">Holiday Shop 2014</a></div>';*/

/*topBannerHtml='<div class="banner-blackfri-nav"><a title="BLACK FRIDAY SALE" href="/black-friday-doorbusters-c14902/">BLACK FRIDAY SALE</a></div>';
topBannerHtml+='<style>';
topBannerHtml+='.banner-blackfri-nav { background:#1C1C1C url(/images/banner/banner-blackfri-topnav.jpg) 50% 0 no-repeat; margin-bottom:1px;}';
topBannerHtml+='.banner-blackfri-nav a { display:block; height:58px; text-indent:-9999px; text-align:center;}';
topBannerHtml+='.banner-blackfri-nav a:hover { text-decoration:none;}';
topBannerHtml += '</style>';*/

topBannerHtml ='<style>.banner-cyber-nav {background: url("/images/banners/banner-cyberweek-topnav-95.jpg") no-repeat scroll 50% 0 #78797b;margin-bottom: 1px;</style>';
topBannerHtml +='<div class="banner-cyber-nav"><a title="Cyber Week Sale" href="/yoga-sale-c2518/?topbanner">Cyber Week Sale</a></div>';

TopBanner = {
	closeTopBanner: function() {
		$("#divTopBanner").attr("style","display:none!important");	
		ROCookies.createCookie('SHOWTOPBANNER', 'OFF', 100);		
	},
showTopBanner: function () {
        var currentBannerUrl = location.href.toLowerCase();
	    var BannerCategoryID = TopBanner.GetCategoryID(currentBannerUrl);
	    if (BannerCategoryID == "2518" || currentBannerUrl.indexOf("shoppingcart") > -1 || currentBannerUrl.indexOf("placeorder") > -1 || currentBannerUrl.indexOf("orderfinished") > -1)
			return;
	    //if ($('#divTopBanner').length && ROCookies.readCookie('SHOWTOPBANNER') != 'OFF') 
	    if ($(".top-nav").length == 1) {
	        //$('#divTopBanner').html(topBannerHtml);
	        $(topBannerHtml).insertBefore(".top-nav");
	    }
	},
    GetCategoryID: function (url) {
	    var banner_categoryid = "";
	    url = url.toLowerCase();
	    url = url.replace(window.location.hash.toLowerCase(), "");

	    url = url.replace("http://", "");
	    url = url.replace("https://", "");
	    if (url.indexOf(".asp") < 0) {
	        if (url.indexOf("?") > -1)
	            url = url.substr(0, url.indexOf("?"));
	        if (url.substr(url.length - 1, 1) == "/")
	            url = url.substr(0, url.length - 1);

	        url = url.replace("www.yogaoutlet.com/", "");
	        var banner_urlCategoriespage = url.split("/")[0];
	        if (banner_urlCategoriespage.indexOf("-") > -1) {
	            banner_categoryid = banner_urlCategoriespage.split("-")[banner_urlCategoriespage.split("-").length - 1];
	            if (banner_categoryid != "" && banner_categoryid.substr(0, 1) == "c")
	                banner_categoryid = banner_categoryid.replace("c", "");
	        }
	    } else if (url.indexOf("/searchresults.asp") > -1) {
	        url = url.replace("www.yogaoutlet.com/searchresults.asp?", "");
	        url = url.split("&")[0];
	        if (url.indexOf("cat=") > -1)
	            banner_categoryid = url.replace("cat=", "");
	    }
	    return banner_categoryid;
	},	
	showFooterIcon: function() {										
		if ($('#fconnect').length){ 
			clearInterval(intervalFooterIcon);
			$('#fconnect').append("<a href='/pin-it-to-win-it?bottombanner=Y' style='margin-top: 11px;'><img width='170' height='79' src='/images/pinterest-contest/pinit-fotter.png'></a>");	
		}
	}
}
TopBanner.showTopBanner();
//var intervalFooterIcon;
//intervalFooterIcon = setInterval("TopBanner.showFooterIcon()", 500);


CountrySupport = {
    setCountryPopupPosition: function(divName) {
        var div;
        div = document.getElementById(divName);
        var wndWidth = 0, wndHeight = 0;
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            wndWidth = window.innerWidth;
            wndHeight = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            //IE 6+ in 'standards compliant mode'
            wndWidth = document.documentElement.clientWidth;
            wndHeight = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE 4 compatible
            wndWidth = document.body.clientWidth;
            wndHeight = document.body.clientHeight;
        }
        var scrOfX = 0, scrOfY = 0;
        if (typeof (window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        var objWidth = div.offsetWidth; //534; 
        var objHeight = div.offsetHeight; //471; 

        var top = Math.max(0, ((wndHeight - objHeight) / 2) + scrOfY);
        var left = Math.max(0, ((wndWidth - objWidth) / 2) + scrOfX);

        div.style.top = top + 'px';
        div.style.left = left + 'px';
    },
    UseCustomFancyCSS: function() {
        if ($('#divFixFancyboxCanada') != null) {
            var str = "<style>#fancybox-outer, #fancy-bg-n, #fancy-bg-ne, #fancy-bg-w, #fancy-bg-e, #fancy-bg-se, #fancy-bg-s, #fancy-bg-sw, #fancy-bg-w, #fancy-bg-nw {background:none !important; background-image: none !important;} </style>";
            $('#divFixFancyboxCanada').html(str);
        }
    },
    revertCSSToOriginal: function() {
        if ($('#divFixFancyboxCanada') != null) {
            var str = "<style>#fancy-bg-w, #fancy-bg-e {background-image:url(../scripts/fancybox/fancybox-shgrey_1.png)!important;} </style>";
            var t = setTimeout("$('#divFixFancyboxCanada').html('" + str + "')", 300);
        }
    },
    clearCSSFancy: function(str) {

    },

    DetectUserLocation: function() {
        var currentCountryShort = ROCookies.readCookie("USERLOCATIONSHORT");
        var currentCountryLong = ROCookies.readCookie("USERLOCATIONLONG");
        if ((currentCountryShort == "" && currentCountryLong == "") || (currentCountryShort == null && currentCountryLong == null)) {
            var _data;
            _data = "r=" + Math.random();
            $.ajax({
                type: "GET",
                url: '/incpages/countrypopupdetect.asp',
                data: _data,
                success: function(msg) {
                    if (msg != '') {
                        $('#liCountryFlag').html(msg);
                    }
                },
                error: function(xhr, status, error) { }
            });
        } else {
            var innerHtml;
            innerHtml = '<a id="popupCountryImg" href="/incpages/countrypopup.asp?cs=' + currentCountryShort + '&cl=' + currentCountryLong + '" onClick="CountrySupport.UseCustomFancyCSS()">';
            innerHtml = innerHtml + '<img src="/images/CountryIcon/' + currentCountryShort + '_Flag.gif" width="16" height="11" alt="" /></a>'
            $('#liCountryFlag').html(innerHtml);
            $("#popupCountryImg").fancybox({
                'autoScale': false,
                'transitionIn': 'fade',
                'transitionOut': 'fade',
                'type': 'iframe',
                'overlayShow': true,
                'hideOnOverlayClick': false,
                'hideOnContentClick': false,
                'enableEscapeButton': false,
                'showCloseButton': false,
                'centerOnScroll': true,
                'overlayColor': '#000'
            });
        }
    },
    SetDefaultCountry: function(CountryShort, CountryLong) {
        ROCookies.eraseCookie("USERLOCATIONSHORT");
        ROCookies.eraseCookie("USERLOCATIONLONG");
        ROCookies.createCookie("USERLOCATIONSHORT", CountryShort, 365);
        ROCookies.createCookie("USERLOCATIONLONG", CountryLong, 365);
    }
}

var CloseContactUsPopupHandler = function(e) {

    var evt = (e) ? e : event;

    var theElem = (evt.srcElement) ? evt.srcElement : evt.target;

    if (theElem != null) {
        if (theElem.id == "divContactUsPopup" || theElem.id == "linkHeaderContactUs") {
            return true;
        }
        if ($(theElem).closest("div.ab-content").length) { return true; }
        if ($(theElem).closest("#divContactUsPopup").length || $(theElem).closest("#divHelpContact").length) {
            return true;
        }
    }

    /*$('#divContactUsPopup').animate({
        width: 'toggle',
        height: 'toggle',
        left: '+=220',
        opacity: 'toggle'
    }, 1000, 'linear', function() {

    });*/
	$('#divContactUsPopup').hide();
    $(document).unbind('click', CloseContactUsPopupHandler);
}

Common = {
    OpenContactUsPopup: function() {

        $(document).unbind('click', CloseContactUsPopupHandler);

        if ($("#divContactUsPopup").html() != "") {
            $("#divContactUsPopup").show();
            CountrySupport.setCountryPopupPosition("divContactUsPopup");
            $(document).bind('click', CloseContactUsPopupHandler);
        }
        else {
            var _data;
            _data = "r=" + Math.random();
            $.ajax({
                type: "GET",
                url: '/ajaxopencontactpopup.aspx?r=' + Math.random(),
                data: _data,
                success: function(msg) {
                    if (msg != '') {
                        $("#divContactUsPopup").html(msg);
                        $("#divContactUsPopup").show();
                        CountrySupport.setCountryPopupPosition("divContactUsPopup");
                        /*$(window).scroll(function() {
                        CountrySupport.setCountryPopupPosition("divContactUsPopup");
                        });*/
                        $(document).bind('click', CloseContactUsPopupHandler);
                    }
                }
            });
        }
        _gaq.push(['_trackEvent', 'Header', 'Clicks', 'Contact Us']); //SWIMOUTLET-4643 
    },
    GetQueryString: function(ji) {
        hu = window.location.search.substring(1);
        gy = hu.split("&");
        for (i = 0; i < gy.length; i++) {
            ft = gy[i].split("=");
            if (ft[0].toLowerCase() == ji.toLowerCase()) {
                return ft[1];
            }
        }
        return "";
    },
    showHideFreeShippingPromoPopup: function(mode) {
        if (mode == 1) {
            $("#divFreeShipPromoPopup").fadeIn();
            if ($.browser.msie) {
                $("#divFreeShipPromoBg").height($(document).height());
            }
            $("#divFreeShipPromoBg").fadeIn();
            CountrySupport.setCountryPopupPosition("divFreeShipPromoPopup");
            $(window).scroll(function() {
                CountrySupport.setCountryPopupPosition("divFreeShipPromoPopup");
            });
        } else {
            $("#divFreeShipPromoPopup").fadeOut();
            $("#divFreeShipPromoBg").fadeOut();
        }
    },
    CheckShoppingCartStatus: function() {
        //$("#divShoppingCartStatus").html("<p class='bold'>Loading...</p>");
        $("#divShoppingCartStatus").find("p").html("Loading...");
		var hu, gy, valClick, currentURL;
		currentURL = window.location.href;
		valClick = "";
		if (currentURL.indexOf(".asp") < 0) {
			hu = window.location.search.substring(1);
			gy = hu.split("&");
			for (i = 0; i < gy.length; i++) {
				ft = gy[i].split("=");
				if (ft[0].toLowerCase() == "click") {
					valClick = ft[1];
				}
			}
		}
        var _data;
        _data = "r=" + Math.random();
		if (valClick != "") { _data += "&Click=" + valClick; }
		
        $.ajax({
            type: "GET",
            url: '/viewcart-reskin.asp?r=' + Math.random(),
            data: _data,
            success: function(msg) {
                if (msg != '') {
                    $("#divShoppingCartStatus").html(msg);
                }
            }
        });
    },
    c_go_search: function() {
        //change class for submit button
        $("a.btn-search").attr('class', 'btn-search-click');
        setTimeout(function() {
            $("a.btn-search-click").attr('class', 'btn-search');
            if ($("#Search") != null && $("#Search").val() == "Start your search here...") {
                $("#Search").val("");
            }
            $('#formSearch').submit();
        }, 100);
    }
}
$(document).ready(function() {
    //CountrySupport.DetectUserLocation(); //===> detect country
    CountrySupport.SetDefaultCountry("US","US"); //===> set default country to US
    Common.CheckShoppingCartStatus(); //===> check shopping status    
});
var ShippingPolicy = '<style>   .so_popup_free_shipping { background-image:url(/images/so_popup_bg.png); background-repeat:no-repeat; width:534px; height:347px; position:absolute; z-index:999; } .so_popup_free_shipping_align { padding:21px 15px; position:relative; }    .icon_free_shipping { display:block; background-image:url(/images/so_popup_free_shipping_icon.png); background-repeat: no-repeat; }    .icon_free_shipping    {width:71px; height:54px; float:left; margin-right:15px; }    .so_popup_free_shipping    { font-family:Arial; } .so_popup_free_shipping h1 { float:none; margin-top:0; width:auto; margin:0; padding: 0 0 10px; color: #1A3E55; font-size:23px; font-weight:bold; line-height:60px; }    .so_free_policy    { font-family: Arial; padding-left: 35px;    }    .so_free_policy table    {border-collapse:collapse; font-size:18px; color: #666666; }   .so_free_policy .so_free_policy thead,  .so_free_policy .so_free_policy_name    { font-size:17px; color: #1A3E55; font-weight: normal;   }    .so_free_policy .so_free_policy_name { text-align:left;}    .so_free_policy td, .so_free_policy th    {border-bottom:1px solid #CCCCCC; border-right:1px solid #CCCCCC; padding:7px 10px; text-align:center;  }    .so_free_policy_name    {    }    .so_free_policy_free    {        color: #008ECC;        font-weight: bold;    }    .so_free_policy_note    { color: #666; font-size: 11px; font-style: italic; display: block; padding-top: 15px;  padding-bottom: 12px; }    .so_free_visit    {        background-image: url(/images/so_popup_free_shipping_icon.png); background-repeat: no-repeat; background-position: 0 -77px; padding-left: 14px; color: #2C9EC5;  text-decoration: none; font-size: 12px;  font-family:Arial;  }    a:hover    { text-decoration: underline;}    .so_free_policy_fotter { font-family:Arial; font-size:11px; color:#666666; border-top:1px solid #E1E1E1; padding-top:15px; line-height:17px; padding-left:35px;}   .so_free_policy_fotter a { color:#2C9EC5; }  .so_popup_free_shipping_close { width:29px; height:30px; background-position:0 -105px; background-image: url(/images/so_popup_free_shipping_icon.png); background-repeat: no-repeat; position:absolute; right: -6px; top: -7px; cursor:pointer; } .so_popup_free_shipping_white_bg { filter: alpha(opacity=0.75);  -moz-opacity: 0.75;  -khtml-opacity: 0.75; opacity: 0.75; background-color:White; position:fixed; *position:absolute;left:0; right:0; top:0; bottom:0; width:100%; z-index:998; *background-image:url(/images/so_popup_free_shipping_bg_transparent.png); *background-repeat:repeat; *background-color:Transparent;}  .so_free_policy td { font-size:15px;}      </style>';
ShippingPolicy = ShippingPolicy + '<div id="divFreeShipPromoBg" style="display:none" class="so_popup_free_shipping_white_bg"></div><div id="divFreeShipPromoPopup" style="display:none" class="so_popup_free_shipping"><div class="so_popup_free_shipping_align"><div class="so_popup_free_shipping_close" onclick="Common.showHideFreeShippingPromoPopup(0)"></div><h1><span class="icon_free_shipping"></span>Shipping Policy</h1><div class="so_free_policy"><table><thead><tr><th></th><th style="color:#193E54">Under $49</th><th style="color:#193E54">Over $49</th><th style="border-right:none; color:#193E54">Over $99</th></tr></thead><tbody><tr><td class="so_free_policy_name" style="color:#193E54"><b>Standard</b></td><td>$4.99</td><td class="so_free_policy_free">FREE</td><td style="border-right:none;" class="so_free_policy_free">3% CREDIT</td></tr><tr><td style="border-bottom:none;" class="so_free_policy_name" style="color: #193E54"><b>1-2 Day</b></td><td style="border-bottom:none;">$9.99</td><td style="border-bottom:none;">$4.99</td><td style="border-right:none; border-bottom:none;" class="so_free_policy_free">FREE</td></tr></tbody></table><span class="so_free_policy_note">1 Day Guaranteed Shipping $19.99 &nbsp;&nbsp;*Standard Shipping is 2-6 Business Days </span><a href="/shipping-options" class="so_free_visit">Visit Shipping Options Page</a></div><br /><div class="so_free_policy_fotter">Additional fees apply to orders bound for Alaska, Hawaii, US Territories, and APO / FPO destinations. Visit our <a href="/shipping-options">shipping options</a> page for full details.</div></div></div>';
$('#divShippingPolicy').html(ShippingPolicy);



var isShowTopHeader8801;
isShowTopHeader8801 = "Variation1";
$(document).ready(function() {
    if (isShowTopHeader8801 == "control") {
        $("#topreasons").show();
        $("#topPropositions").hide();
    }
    else {
        $("#topreasons").hide();
        $("#topPropositions").show();
    }
});

/*Video play with audio---------------------------------------------*/
function getRandomAudio(site)
{
	var rand = 1;
	if(site == "SO"){		
		rand = Math.floor(Math.random() * 11) + 1;
		return "/Videos/Product_Video/audio/SO/audio" + rand + ".mp3";
	}else if (site == "YO"){
		rand = Math.floor(Math.random() * 6) + 1;
		return "/Videos/Product_Video/audio/YO/audio" + rand + ".mp3";
	}else if(site == "RO"){		
		rand = Math.floor(Math.random() * 11) + 1;
		return "/Videos/Product_Video/audio/RO/audio" + rand + ".mp3";
	} else if(site == "SFO"){		
		rand = Math.floor(Math.random() * 11) + 1;
		return "/Videos/Product_Video/audio/SFO/audio" + rand + ".mp3";
	}
	return "/Videos/Product_Video/audio/SO/audio1.mp3";                                        
}
/*--------------------------------------------------------------------*/
/*--------------------------------------------------------------------*/
/*SWIMOUTLET-11129*/
var totalMinuteShipSameDay;
function processcountdown() {
    if (totalMinuteShipSameDay == 0) {
        window.clearInterval(timerCoundown);
        $("#divcoundown").hide();

    }
    else {
        $("#divcoundown").show();
        totalMinuteShipSameDay = totalMinuteShipSameDay - 1;
        var hour, minute;
        hour = parseInt(totalMinuteShipSameDay / 60);
        minute = totalMinuteShipSameDay % 60;
        if (hour == 0) hour = "";
        else hour = hour + " hr ";

        if (minute == 1) {
            $(".timecountdown").html(hour + minute + " min");
        }
        else {
            $(".timecountdown").html(hour + minute + " mins");
        }
    }
}
/**/
/*------------------------------Zendesk Chat--------------------------------------*/
/*var currentUrlSiteWide = location.href.toLowerCase();
if (currentUrlSiteWide.indexOf("zentest=1") > -1 || ROCookies.readCookie("zentest") == "1") {
	var script1 = document.createElement('script');
	script1.setAttribute("type", "text/javascript");
	script1.setAttribute("src", "//assets.zendesk.com/external/zenbox/v2.6/zenbox.js");
	document.body.appendChild(script1);
	var style1 = document.createElement('style');
	style1.setAttribute("type", "text/css");
	style1.setAttribute("media", "screen, projection");
	style1.appendChild(document.createTextNode("@import url(//assets.zendesk.com/external/zenbox/v2.6/zenbox.css);"));
	document.body.appendChild(style1);
	var style2 = document.createElement('style');
	style2.setAttribute("type", "text/css");	
	style2.appendChild(document.createTextNode("#zenbox_tab { border:none!important; background-color:Transparent!important; } #zenbox_close { left: 25px; top: 11px; } #zenbox_body { width: 644px!important; }"));
	document.body.appendChild(style2);	
}
$( document ).ready(function() {	
	if (typeof(Zenbox) !== "undefined") {Zenbox.init({dropboxID:   "20137310",url:"https://yogaoutlet.zendesk.com",tabTooltip:  "Ask Us",tabImageURL: "https://www.yogaoutlet.com/images/live-chat/chat-tab.png",tabColor:    "",tabPosition: "Left"});}
	setTimeout(function(){if($("#zenbox_tab").length == 0) {if (typeof(Zenbox) !== "undefined") {Zenbox.init({dropboxID:   "20137310",url:"https://yogaoutlet.zendesk.com",tabTooltip:  "Ask Us",tabImageURL: "https://www.yogaoutlet.com/images/live-chat/chat-tab.png",tabColor:    "",tabPosition: "Left"});}}},1000);
});*/ /*removed 03142014 YOGAOUTLET-503*/
/*--------------------------------------------------------------------*/

if (ROCookies.readCookie("ClosePopup") != null && /*ROCookies.readCookie("AlreadyShowTopSignIn") == null &&*/ ROCookies.readCookie("www%2Eyog%2FCustomerID") == null) //SO16147
{
	var currentUrlSiteWideTop = location.href.toLowerCase();
	currentUrlSiteWideTop = currentUrlSiteWideTop.replace("https://","");
	currentUrlSiteWideTop = currentUrlSiteWideTop.replace("http://","");
	currentUrlSiteWideTop = currentUrlSiteWideTop.replace("www.yogaoutlet.com","");	
	if (currentUrlSiteWideTop == "" || currentUrlSiteWideTop == "/" || currentUrlSiteWideTop.indexOf("/default.asp") >= 0 || currentUrlSiteWideTop.indexOf("/shoppingcart_devices.asp") >= 0 || currentUrlSiteWideTop.indexOf("/an_default.htm") >= 0) 
	{		
		$('#divTopSignIn').show().delay(8000).fadeOut();
		//ROCookies.createCookie("AlreadyShowTopSignIn","Y",1);
		$('.link-my-account').parent().hover(	
			function(){$('#divTopSignIn').show();},
			function(){$('#divTopSignIn').hide();}
		);
	}
}

var isTurnOnSearchSuggestion = true;
var intervalSearchSuggestion;
if (isTurnOnSearchSuggestion == true) {
    intervalSearchSuggestion = setInterval('SearchSuggestions()', 200);
}
var keywordTemp = '', previousKeyword = '';
function OnHoverSearchSuggestion(el) {
    if ($('#search-suggestion p.highlighted').length) {
        $('#search-suggestion p.highlighted').removeClass('highlighted');
    }
    $(el).addClass('highlighted');
}

function imgError(el, pc) {
    imgErrorLevel1(el, 'http://' + window.location.host.toString() + '/photos/' + pc + '-1.jpg');
}

function imgErrorLevel1(el, src) {
    var img = new Image();
    img.onload = function () {
        el.setAttribute("src", src);
    };
    img.onerror = function () {
        el.setAttribute("src", "/templates/1/images/nophoto-TN80x98.gif");
    };
    img.src = src;
}

function SearchSuggestions() {
    if ($("#Search").length) {
        clearInterval(intervalSearchSuggestion);
        $("#Search").keyup(function (event) {
            var key = event.which ? event.which : event.keyCode;
            if (key === 37 || key === 38 || key === 39 || key === 40) {
                if ($('#search-suggestion').is(':visible')) {
                    $('#Search').blur();
                    var _this;
                    if ($('#search-suggestion p.highlighted').length == 0) {
                        if (key === 38) { // up arrow 
                            $('#search-suggestion p.last').addClass('highlighted');
                        }
                        else if (key === 40) { // down arrow 
                            $('#search-suggestion p.first').addClass('highlighted');
                        }
                    }
                    else {
                        _this = $('#search-suggestion p.highlighted');
                        $('#search-suggestion p').removeClass('highlighted');
                        if (key === 38) { // up arrow 
                            if (_this.hasClass('first') == false) {
                                _this.prevAll('p.search-suggestion:first').addClass('highlighted');
                            }
                        }
                        else if (key === 40) { // down arrow 
                            if (_this.hasClass('last') == false) {
                                _this.nextAll('p.search-suggestion:first').addClass('highlighted');
                            }
                        }
                    }

                    if ($('#search-suggestion p.highlighted').length == 0) {
                        $('#Search').val(keywordTemp);
                    }
                    else {
                        $('#Search').val($('<div/>').html($('#search-suggestion p.highlighted').eq(0).find('a').html()).text());
                    }
                    $('#Search').focus();
                }
            }
            else if (key === 13) {
                if ($('#search-suggestion p.highlighted').length) {
                    window.location.href = $('#search-suggestion p.highlighted').eq(0).find('a').attr('href');
                }
                else {
                    Common.c_go_search();
                }
            }
            else {
                var searchbox = $.trim($('#Search').val());
                keywordTemp = searchbox;
                if (searchbox == '') {
                    $('#search-suggestion').empty().hide();
                }
                else if (searchbox != previousKeyword) {
                    var keywordPatt = /^\s*[a-zA-Z0-9]/gi;
                    var result = keywordPatt.test(searchbox);
                    if (result) {
                        var dataString = 'keyword=' + searchbox;
                        $.ajax({
                            url: "/ajax/searchsuggestions.aspx?" + dataString,
                            cache: false,
                            success: function (data) {
                                if (data != '') {
                                    var html = '';
                                    data = JSON.parse(data);
                                    var products = data.products;
                                    var p_length = products.length;
                                    var brands = data.brands;
                                    var b_length = brands.length;
                                    var categories = data.categories;
                                    var c_length = categories.length;
                                    if (p_length > 0) {
                                        html += '<div><span>Top Products</span></div>';
                                        var customStyle = '';
                                        for (var i = 0; i < products.length; i++) {
                                            if (i == 0) customStyle = ' first';
                                            else if (i == p_length - 1 && c_length == 0 && b_length == 0) customStyle = ' last';
                                            else customStyle = '';
                                            //html += '<p class="search-suggestion' + customStyle + '" onmouseover="OnHoverSearchSuggestion(this);"><a href="/p/' + products[i].seo_link + '-' + products[i].item_id + '/">' + products[i].item_name + '</a></p>';
                                            html += '<p class="search-suggestion' + customStyle + '" onmouseover="OnHoverSearchSuggestion(this);">';
                                            html += '<a href="/p/' + products[i].seo_link + '-' + products[i].item_id + '/">';
                                            html += '<img style="width: 43px; height: 48px; vertical-align: -29px;" src="/photos/options/auto-thumbnails/shopping/55x74/' + products[i].item_id + '-T-55x74-AUTO.jpg" onerror="imgError(this,' + products[i].item_id + ')" />' + products[i].item_name + '</a></p>';
                                        }
                                    }
                                    if (c_length > 0) {
                                        html += '<div><span>Top Categories</span></div>';
                                        var customStyle = '';
                                        for (var i = 0; i < categories.length; i++) {
                                            if (i == 0 && p_length == 0) customStyle = ' first';
                                            else if (i == c_length - 1 && b_length == 0) customStyle = ' last';
                                            else customStyle = '';
                                            html += '<p class="search-suggestion' + customStyle + '" onmouseover="OnHoverSearchSuggestion(this);"><a href="/' + categories[i].seo_link + '-c' + categories[i].item_id + '/">' + categories[i].item_name + '</a></p>';
                                        }
                                    }
                                    if (b_length > 0) {
                                        html += '<div><span>Top Brands</span></div>';
                                        for (var i = 0; i < brands.length; i++) {
                                            if (i == 0 && p_length == 0 && c_length == 0) customStyle = ' first';
                                            else if (i == b_length - 1) customStyle = ' last';
                                            else customStyle = '';
                                            html += '<p class="search-suggestion' + customStyle + '" onmouseover="OnHoverSearchSuggestion(this);"><a href="/' + brands[i].seo_link + '/"><img src="/templates/1/images/brand/' + brands[i].seo_link.replace(/\//gi, '') + '-logo_117_50.gif" />' + brands[i].item_name + '</a></p>';
                                        }
                                    }
                                    if (html != '' && $.trim($('#Search').val()) != '') {
                                        $('#search-suggestion').html(html).show();
                                    }
                                    else {
                                        $('#search-suggestion').empty().hide();
                                    }
                                }
                                else {
                                    $('#search-suggestion').empty().hide();
                                }
                            }
                        });
                    }
                }
            }
            previousKeyword = $.trim($('#Search').val());
            return false;
        });

        $("#Search").on('click', function () {
            if ($.trim($('#Search').val()) != '' && $('#search-suggestion').html() != '') {
                $('#search-suggestion').show();
            }
        });
    }
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if ($clicked.parents('#search-suggestion').length == 0 && $clicked.attr('id') != 'Search') {
        $('#search-suggestion').hide();
    }
});