
// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 9;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Revision of Flash required
var requiredRevision = 22;
// the version of javascript supported
var jsVersion = 1.0;

var bvIsLoaded = false;
var myCartItemCount = 0;
// -----------------------------------------------------------------------------
// -->



//THIS IS FOR FLASH DETECTION.THIS MUST APPEAR BELOW THE CODE IN HEADER
jsVersion = 1.1;
// JavaScript helper required to detect Flash Player PlugIn version information
function JSGetSwfVer(i)
{
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	if (navigator.plugins != null && navigator.plugins.length > 0)
	{
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"])
		{
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			descArray = flashDescription.split(" ");
			tempArrayMajor = descArray[2].split(".");
			versionMajor = tempArrayMajor[0];
			versionMinor = tempArrayMajor[1];
			if (descArray[3] != "")
			{
				tempArrayMinor = descArray[3].split("r");
			} else
			{
				tempArrayMinor = descArray[4].split("r");
			}
			versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		} else
		{
			flashVer = -1;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	// Can't detect in all other cases
	else
	{
		flashVer = -1;
	}
	return flashVer;
}

// If called with no parameters this function returns a floating point value
// which should be the version of the Flash Player or 0.0
// ex: Flash Player 7r14 returns 7.14
// If called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	//reqVer = parseFloat(reqMajorVer + "." + reqMinorVer + "." + reqRevision);
	reqVer = parseFloat(reqMajorVer + "." + reqRevision);
	var isIE = $.browser.msie;
	var isWin = typeof VBGetSwfVer != "undefined";
	var isOpera = $.browser.opera;
	// loop backwards through the versions until we find the newest version
	for (i = 25; i > 0; i--)
	{
		if (isIE && isWin && !isOpera)
		{
			versionStr = VBGetSwfVer(i);
		} else
		{
			versionStr = JSGetSwfVer(i);
		}
		if (versionStr == -1)
		{
			return false;
		} else if (versionStr != 0)
		{
			if (isIE && isWin && !isOpera)
			{
				tempArray = versionStr.split(" ");
				tempString = tempArray[1];
				versionArray = tempString.split(",");
			} else
			{
				versionArray = versionStr.split(".");
			}
			versionMajor = versionArray[0];
			versionMinor = versionArray[1];
			versionRevision = versionArray[2];

			//versionString     = versionMajor + "." + versionMinor + "." + versionRevision;   // 7.0r24 == 7.0.24
			versionString = versionMajor + "." + versionRevision;   // 7.0r24 == 7.24
			versionNum = parseFloat(versionString);
			if ((versionMajor > reqMajorVer) && (versionNum >= reqVer))
			{
				//alert("Lemme esplain ... \n 1. JavaScript starts by saying you have Flash " + versionStr + " \n 2. There are required Major (" + reqMajorVer + "), Minor (" + reqMinorVer + ") and Revision (" + versionRevision + ") of Flash \n\n You seem to have:\n - Major= " + versionMajor + "\n - Minor= " + versionMinor + "\n - Revision= " +  versionRevision + "\n\n This prompt, A2, the FP_DetectKit says: versionMajor (" + versionMajor + ") > reqMajorVer (" + reqMajorVer + ") && versionNum (" + versionNum + ") >= reqVer (" + reqVer + "), " + ((versionNum >= reqVer) ? "says it is." : "but says no."));
				return true;
				//	}
				//}
			} else
			{
				//alert("Lemme esplain ... \n 1. JavaScript starts by saying you have Flash " + versionStr + " \n 2. There are required Major (" + reqMajorVer + "), Minor (" + reqMinorVer + ") and Revision (" + reqRevision + ") of Flash \n\n You seem to have:\n - Major= " + versionMajor + "\n - Minor= " + versionMinor + "\n - Revision= " +  versionRevision + "\n\n This prompt, B2, my FP_DetectKit checked if: versionMajor (" + versionMajor + ") > reqMajorVer (" + reqMajorVer + ") && versionNum (" + versionNum + ") >= reqVer (" + reqVer + ")" + ((versionNum >= reqVer) ? "" : ", but it doesn't") + ", and now it checks if versionMajor (" + versionMajor + ") >= reqMajorVer (" + reqMajorVer + ") && versionMinor (" + versionMinor + ") >= reqMinorVer (" + reqMinorVer + "), " + ((versionMajor >= reqMajorVer && versionMinor >= reqMinorVer) ? " which is true, so we check versionMinor >= reqMinorVer || versionNum >= reqVer, " + ((versionMinor >= reqMinorVer || versionNum >= reqVer) ? " which is also true" : "which is false") : " which is false."));
				//return ((versionNum >= reqVer && versionMinor >= reqMinorVer) ? true : false );

				// Check Major version:
				if (versionMajor > reqMajorVer)
				{ // If newer Major entirely, it passes.
					return true;
				} else if (versionMajor == reqMajorVer)
				{ // If required Major version...
					// Check Minor version:
					if (versionMinor > reqMinorVer)
					{ // If newer Minor entirely, it passes.
						return true;
					} else if (versionMinor == reqMinorVer)
					{ // If required Major version...
						// Check revision:
						if (versionRevision >= reqRevision)
						{ // If required or higher Revision version, it passes.
							return true;
						} else
						{
							return false;
						}
					} else
					{
						return false;
					}
				} else
				{
					return false;
				}
			}
		}
	}
	return (reqVer ? false : 0.0);
}

function PlayVideoReviewElements(element, flvName, swfName, height, width, startMovie, volume, imgURL, prodImgUrl, sku, channel)
{
	var hasRightVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
	var strFlashVar = "";
	var strImgURL = "";
	var strProdImgURL = "";
	var strControlLock = "";
	var strSWFName = swfName;
	if (strSWFName == 'expotvProduct' || strSWFName == 'trailerReview' || strSWFName == '3x2videoplayer')
	{
		strFlashVar = "videoURL=";
		strSWFName = "video_player3";
		height = "198";
		width = "352"
		if (imgURL != "autoplay")
		{
			if (imgURL == "")
			{
				strImgURL = "&loaderURL=0";
			} else
			{
				strImgURL = "&loaderURL=" + imgURL;
			}
		}
		if (prodImgUrl == "")
		{
			strProdImgURL = "&productURL=0";
		} else
		{
			strProdImgURL = "&productURL=" + prodImgUrl;
		}
		//alert("here");
	} else if (strSWFName == 'contestVideo' || strSWFName == 'buytvProduct' || strSWFName == '16x9videoplayer')
	{
		strFlashVar = "videoURL=";
		strSWFName = "video_player3";
		//BuyTV_169_productimage
		height = "198";
		width = "352"
		if (imgURL != "autoplay")
		{
			if (imgURL == "")
			{
				strImgURL = "&loaderURL=0";
			} else
			{
				strImgURL = "&loaderURL=" + imgURL;
			}
		}
		if (prodImgUrl == "")
		{
			strProdImgURL = "&productURL=0";
		} else
		{
			strProdImgURL = "&productURL=" + prodImgUrl;
		}
		//alert(prodImgUrl + "###");

		if (swfName == 'contestVideo')
			strControlLock = "&controlLock=true";
	} else
	{
		strFlashVar = "clips=";
	}
	if (hasRightVersion)
	{  // if we've detected an acceptable version
		if (startMovie == 1)
		{
			//alert(element+','+flvName+','+swfName+','+strSWFName+','+height+','+width+','+startMovie+','+volume);
			if (document.getElementById(element) != null)
			{
				if (swfName == 'buyTVYouTube' || swfName == 'spotlightYouTube' || swfName == 'youtube')
				{
					document.getElementById(element).innerHTML = '<object width="352" height="195"><param name="wmode" value="transparent" /><param name="movie" value="' + flvName + '" /><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><embed src="' + flvName + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="352" height="195" wmode="transparent"></embed></object>'
				}
				else if (swfName == 'brightcove')
				{
					document.getElementById(element).innerHTML = '<object id="flashObj" width="350" height="243" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,47,0"><param name="wmode" value="transparent" /><param name="movie" value="' + flvName + '" /><param name="bgcolor" value="#FFFFFF" /><param name="flashVars" value="' + volume + '" /><param name="base" value="http://admin.brightcove.com" /><param name="seamlesstabbing" value="false" /><param name="wmode" value="transparent" /><param name="allowFullScreen" value="true" /><param name="swLiveConnect" value="true" /><param name="allowScriptAccess" value="always" /><embed src="' + flvName + '" bgcolor="#FFFFFF" flashVars="' + volume + '" base="http://admin.brightcove.com" name="flashObj" width="350" height="243" seamlesstabbing="false" type="application/x-shockwave-flash" allowFullScreen="true" swLiveConnect="true" allowScriptAccess="always" wmode="transparent" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed></object>'
				}
				else
				{
					document.getElementById(element).innerHTML = '<embed name="' + swfName + '" src="http://ast1.r10.io/buy_assets/flashplayers/' + strSWFName + '.swf" loop="false" menu="false" wmode="transparent" quality="high"'
					+ 'width="' + width + '" height="' + height + '" align="left" '
					+ 'play="true" '
					+ 'loop="false" '
					+ 'quality="high" '
					+ 'allowScriptAccess="always" '
					+ 'type="application/x-shockwave-flash" '
					+ 'swLiveConnect="true" '
					+ 'allowFullScreen="true" '
					+ 'FlashVars="' + strFlashVar + flvName + strImgURL + strProdImgURL + strControlLock + '&volumeLevel=' + volume + '&videoPageID=' + sku + '|' + channel + '" '
					+ ' pluginspage="http://www.macromedia.com/go/getflashplayer">'
					+ '<\/embed>';
					//alert("FlashVars="+strFlashVar+flvName+strImgURL+strProdImgURL+"&defaultvolume="+volume+"&videoPageID=|"+sku+"|"+channel)
				}
			}
		} else
		{ //startMovie == 0, so stop the movie
			if (document.getElementById(element) != null)
			{
				if (swfName == 'grouper')
				{
					document.getElementById(element).innerHTML = flvName; //flvName is the full embed for grouper.
				} else
				{
					document.getElementById(element).innerHTML = '';
				}
			}
		}
	} else if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null)
	{
		document.getElementById(element).innerHTML = '<video src="' + flvName + '" controls="controls" autoplay="autoplay" height="' + height + '" width="' + width + '" poster="' + prodImgUrl + '"></video>';

	} else
	{  // flash is too old or we can't detect the plugin
		if (volume == "0")
		{ //get rid of the no volume starup movie
			if (document.getElementById('prodImgTab_2') != null)
			{
				document.getElementById('prodImgTab_2').style.display = "none";
				if (document.getElementById('prodImgSec_2') != null)
				{
					document.getElementById('prodImgSec_2').style.display = "none";
				}
				showTabContent('prodImgTab', 1, 'prodImgSec', 1);
			}
		} else
		{
			document.getElementById(element).innerHTML = '<a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"><img src="http://ast1.r10.io/buy_assets/buytv/flash7needed_product.jpg" alt="Requires Flash 7 or Higher" border="0" /></a>';
		}
	}
}
function MusicClipsPlayer(element, swfName, srcUrl, height, width, trackNum, UPC)
{
	var hasRightVersion = true;
	if (hasRightVersion)
	{  // if we've detected an acceptable version
		if (document.getElementById(element) != null)
		{
			document.getElementById(element).innerHTML = '<embed name="' + swfName + '" src="' + srcUrl + '" loop="false" menu="false" wmode="transparent" quality="high"'
				+ 'width="' + width + '" height="' + height + '" align="middle" '
				+ 'play="true" '
				+ 'loop="false" '
				+ 'quality="high" '
				+ 'allowScriptAccess="sameDomain" '
				+ 'type="application/x-shockwave-flash" '
				+ 'swLiveConnect="true" '
				+ 'allowFullScreen="true" '
				+ 'FlashVars="trackNum=' + trackNum + '&UPC=' + UPC + '" '
				+ ' pluginspage="http://www.macromedia.com/go/getflashplayer">'
				+ '<\/embed>';
			//alert("trackNum=" + trackNum + "&UPC=" + UPC);
		}

	} else
	{  // flash is too old or we can't detect the plugin
		document.getElementById(element).innerHTML = '<a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"><img src="http://ast1.r10.io/buy_assets/buytv/flash7needed_product.jpg" alt="Requires Flash 7 or Higher" border="0" /></a>';
		// insert non-flash content
	}
}
function showHideProdVideos(showhide)
{
	var videoReviewsTDElement = document.getElementById("videoReviewsTD");
	var showMoreVideosElement = document.getElementById("showMoreVideos");
	var hideMoreVideosElement = document.getElementById("hideMoreVideos");
	if (showhide == 1)
	{
		if (videoReviewsTDElement)
		{
			videoReviewsTDElement.style.display = '';
		}
		if (showMoreVideosElement)
		{
			showMoreVideosElement.style.display = 'none';
		}
		if (hideMoreVideosElement)
		{
			hideMoreVideosElement.style.display = '';
		}
	} else
	{
		if (videoReviewsTDElement)
		{
			videoReviewsTDElement.style.display = 'none';
		}
		if (showMoreVideosElement)
		{
			showMoreVideosElement.style.display = '';
		}
		if (hideMoreVideosElement)
		{
			hideMoreVideosElement.style.display = 'none';
		}
	}
}

function largeIMTop(n, z, i)
{
	var PROD_lrgImgElement = document.getElementById("PROD_lrgImg");
	if (PROD_lrgImgElement)
		PROD_lrgImgElement.innerHTML = '<table cellpadding="0" cellspacing="0" border="0" style="border-width:1px; border-color:#000000; border-style:solid;"><tr><td style="background-color: #000000; align="left"><div style="margin-top : 2px; margin-left : 2px; margin-bottom : 2px;"><b style="color:#fff;">&nbsp;Click image to close</b></div></td></tr><tr><td><a href="javascript:void(0);" onclick="largeIMTop_hideandchange(\'' + n + '\',\'' + z + '\',\'' + i + '\');"><img border="1" name="ib" alt="large image view" src=' + n + '></a></td></tr></table>';

}
function largeIMTop_hideandchange(n, z, i)
{
	var PROD_mainImgElement = document.getElementById("PROD_mainImg");
	var PROD_lrgImgElement = document.getElementById("PROD_lrgImg");
	if (PROD_lrgImgElement)
		PROD_lrgImgElement.innerHTML = "";

	if (PROD_mainImgElement)
	{
		if (z != '' && i < 1)
			PROD_mainImgElement.src = z;
		else
			PROD_mainImgElement.src = n;
	}
}
function thumbIMTop(n, z, i)
{
	var PROD_mainImgElement = document.getElementById("PROD_mainImg");
	var lrgImgLinkElement = document.getElementById("PROD_lrg_img_link");
	var lrgImgLinkThumbElement = document.getElementById("PROD_lrg_img_thumblink");
	if (PROD_mainImgElement)
	{

		if (z != '' && i < 1)
		{
			PROD_mainImgElement.src = z;
		} else
		{
			PROD_mainImgElement.src = n;
		}
	}

	if (lrgImgLinkElement)
		lrgImgLinkElement.href = 'javascript:moveImagePopup(); largeIMTop(\'' + n + '\',\'' + z + '\',\'' + i + '\');'

	if (lrgImgLinkThumbElement)
		lrgImgLinkThumbElement.href = 'javascript:moveImagePopup(); largeIMTop(\'' + n + '\',\'' + z + '\',\'' + i + '\');'

}
function lightup(imageobject, opacity)
{
	if (navigator.appName.indexOf("Netscape") != -1
	  && parseInt(navigator.appVersion) >= 5)
		imageobject.style.MozOpacity = opacity / 100
	else if (navigator.appName.indexOf("Microsoft") != -1
	  && parseInt(navigator.appVersion) >= 4)
		imageobject.filters.alpha.opacity = opacity
}

function ChangeWarrantyOption(id)
{
	for (var wrty = 0; wrty < 5; wrty++)
	{
		if (id != "sqtWarranties_ctrl" + wrty + "_warrantysku")
		{
			if (document.getElementById("sqtWarranties_ctrl" + wrty + "_warrantysku"))
				document.getElementById("sqtWarranties_ctrl" + wrty + "_warrantysku").checked = false;
		}
	}
}

function BuyAddItems(elPre, elSuf, count)
{
	var wrntySku = "0";
	var wrtyEl = null;
	var prodQty = "1";
	var prodSku = "0";
	var btnId = "0";
	var regex = new RegExp("^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$");
	var addProdStr = "http://cart.rakuten.com/CO/basket/additem.aspx";
	var addItemStr = "";
	var hostStr = location.host;
	var mainSku = document.getElementById("mainSku");
	var mainSkuIsListing = document.getElementById("mainSkuIsListing");
	var productsku = document.getElementById("productsku");
	var mainSkuQty = document.getElementById("qty");
	var marketplaceCouponSku = document.getElementById("marketplaceCouponSku");
	var mainSkuCtl = document.getElementById(elPre + "_ctl00_" + elSuf + "MainCheckBox");
	var accSkuEl = null;
	var accSkuIsListing = null;
	if (location.host.indexOf("beta.rakuten.com") > -1)
	{
		addProdStr = "http://checkout.beta.rakuten.com/CO/basket/additem.aspx";
	} else if (location.host.indexOf("test.rakuten.com") > -1)
	{
		addProdStr = "http://test.cart.rakuten.com/CO/basket/additem.aspx";
	}

	if (elPre == "mainprod")
		btnId = "1";
	else if (elPre.indexOf("RelatedProducts") > -1)
		btnId = "6";
	else if (elPre == "RecommendationsPTT")
		btnId = "5";

	for (var wrty = 0; wrty < 5; wrty++)
	{
		wrtyEl = document.getElementById("sqtWarranties_ctrl" + wrty + "_warrantysku")
		if (wrtyEl && wrtyEl.checked)
		{
			wrntySku = wrtyEl.value;
			break;
		}
	}
	if (mainSkuQty)
	{
		if (regex.test(mainSkuQty.value))
			prodQty = mainSkuQty.value;
	}
	if (productsku)
	{
		prodSku = productsku.value;
	}

	if (elPre == "" || elPre == "mainprod")
	{
		addItemStr = "?sku=";
		if (mainSkuIsListing && mainSkuIsListing.value == "true")
		{
			addItemStr = "?listingid=";
		}
		addProdStr += addItemStr + mainSku.value + "|" + prodQty + "&";
		if (marketplaceCouponSku)
		{
			if (marketplaceCouponSku.value == "0")
			{
			} else
			{
				addProdStr += "promosku=" + marketplaceCouponSku.value + "&";
			}
		}
		if (wrntySku == "0")
		{
		} else
		{
			addProdStr += "warrantySku=" + wrntySku + "|" + prodSku + "&";
		}
		addItemStr = "";
	} else
	{
		if (mainSkuCtl && mainSkuCtl.checked)
		{
			addItemStr = "?sku=";
			if (mainSkuIsListing && mainSkuIsListing.value == "true")
			{
				addItemStr = "?listingid=";
			}
			addProdStr += addItemStr + mainSkuCtl.value + "|" + prodQty + "&";
			if (marketplaceCouponSku)
			{
				if (marketplaceCouponSku.value == "0")
				{
				} else
				{
					addProdStr += "promosku=" + marketplaceCouponSku.value + "&";
				}
			}
			if (wrntySku == "0")
			{
			} else
			{
				addProdStr += "warrantySku=" + wrntySku + "|" + prodSku + "&";
			}
		} else
		{
			addProdStr += "?";
		}
		addItemStr = "";
		for (var skuid = 1; skuid < count + 1; skuid++)
		{
			if (skuid < 10)
			{
				accSkuEl = document.getElementById(elPre + "_ctl0" + skuid + "_" + elSuf + "Checkbox");
				accSkuIsListing = document.getElementById(elPre + "_ctl0" + skuid + "_" + elSuf + "IsListing");
			} else
			{
				accSkuEl = document.getElementById(elPre + "_ctl" + skuid + "_" + elSuf + "Checkbox");
				accSkuIsListing = document.getElementById(elPre + "_ctl" + skuid + "_" + elSuf + "IsListing");
			}
			if (accSkuEl && accSkuEl.checked)
			{
				if (accSkuIsListing && accSkuIsListing.value == "true")
				{
					addItemStr += "listingid=" + accSkuEl.value + "|" + prodQty + "&";
				} else
				{
					if (addProdStr.indexOf(accSkuEl.value) > -1)
					{
					} else
					{
						addItemStr += "sku=" + accSkuEl.value + "|" + prodQty + "&";
					}
				}
			}
		}
		addProdStr += addItemStr;
	}

	if (addProdStr.indexOf("&") > -1)
		addProdStr = addProdStr.substring(0, addProdStr.length - 1);

	addProdStr += "&BtnPosID=" + btnId;
	window.location = addProdStr;
}

function disableEnterKey(e)
{
	var key;
	if (window.event)
		key = window.event.keyCode; //IE
	else
		key = e.which; //firefox      

	return (key != 13);
}

function Querystring(qs)
{
	this.params = {};

	if (qs == null) qs = location.search.substring(1, location.search.length);
	if (qs.length == 0) return;
	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&');

	for (var i = 0; i < args.length; i++)
	{
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);

		var value = (pair.length == 2)
			? decodeURIComponent(pair[1])
			: name;

		this.params[name] = value;
	}
}

Querystring.prototype.get = function (key, default_)
{
	var value = this.params[key];
	return (value != null) ? value : default_;
}

Querystring.prototype.contains = function (key)
{
	var value = this.params[key];
	return (value != null);
}

function setDispTypeOnFocus()
{
	var qs = new Querystring();
	var disptype = "";

	//alert(qs.get("disptype"));
	if (qs.get("dispType") != null)
	{
		disptype = qs.get("dispType");
		if (disptype == "wr")
		{
			if (document.getElementById("wRevSec"))
				window.location = "#wRevSec";
		}
	}
	else if (qs.get("rID") != null)
	{
		disptype = qs.get("rID");
		window.location = "#a" + disptype;
	}
}

function openFSOffer(page)
{
	window.open(page, 'FreeShippingOffer', 'width=350,height=250,scrollbars=no');
}
function openTentoe(page)
{
	window.open(page, 'Tentoe', 'width=550,height=340,scrollbars=no');
}
function hideTabContent(element)
{
	for (var x = 1; x < 15; x++)
	{
		if (document.getElementById(element + '_' + x) != null)
		{
			document.getElementById(element + '_' + x).style.display = 'none';
		}
	}
}
function showImgVidContent(element, id)
{
	hideTabContent(element);
	if (document.getElementById(element + '_' + id) != null)
	{
		document.getElementById(element + '_' + id).style.display = 'block';
	}
}
function showTabContent(tab, tabId, element, id)
{
	hideTabContent(element);
	changeTabBack(tab);
	if (document.getElementById(element + '_' + id) != null)
	{
		document.getElementById(element + '_' + id).style.display = 'block';
	}
	if (document.getElementById(tab + '_' + tabId) != null)
	{
		document.getElementById(tab + '_' + tabId).style.backgroundImage = 'url(http://ast1.r10.io/buy_assets/v6/menu/prod_selected_back.jpg)';
		document.getElementById(tab + '_' + tabId).style.color = '#ff7e00';
		document.getElementById(tab + '_' + tabId).style.fontWeight = 'bold';
	}
}
function changeTabBack(element)
{
	for (var x = 1; x < 15; x++)
	{
		if (document.getElementById(element + '_' + x) != null)
		{
			document.getElementById(element + '_' + x).style.backgroundImage = 'url(http://ast1.r10.io/buy_assets/v6/menu/prod_unselected_back.jpg)';
			document.getElementById(element + '_' + x).style.color = '#000000';
			document.getElementById(element + '_' + x).style.fontWeight = 'normal';
		}
	}
}
function chgMoreImg(thisSku, imgNum, bLrgImg, imgCount)
{
	var imgNumPre;
	var innerHtml;
	var skuFolder = thisSku.substring(thisSku.length - 3, thisSku.length);
	var tdMoreImgElement = document.getElementById("tdMoreImg");
	var tdNextPrevElement = document.getElementById("tdNextPrev");
	var ssImageElement = document.getElementById("ssImage");

	if (ssImageElement)
	{
		(imgNum < 10) ? imgNumPre = '00' : imgNumPre = '0';
		if (imgNum > 1)
			ssImageElement.src = 'http://ast1.r10.io/db_assets/screen_shot_images/' + skuFolder + '/' + thisSku + '_' + imgNumPre + imgNum + '.jpg';
		else
			ssImageElement.src = 'http://ast1.r10.io/db_assets/large_images/' + skuFolder + '/' + thisSku + '.jpg';
	}
	if (tdNextPrevElement)
	{
		innerHtml = '<div align="center" style="padding-top:10px;">';
		if (imgNum > 1)
		{
			if (imgNum == 2)
			{
				if (bLrgImg == 1)
					innerHtml += '<b class="standardText" style="font-size:14px;">< </b><a href="#moreimg" class="standardText" style="font-size:14px;" onClick="chgMoreImg(\'' + thisSku + '\',1,' + bLrgImg + ',' + imgCount + ')"><b>Previous</b></a>&nbsp;&nbsp;';
			} else
			{
				innerHtml += '<b class="standardText" style="font-size:14px;">< </b><a href="#moreimg" class="standardText" style="font-size:14px;" onClick="chgMoreImg(\'' + thisSku + '\',' + (imgNum - 1) + ',' + bLrgImg + ',' + imgCount + ')"><b>Previous</b></a>&nbsp;&nbsp;';
			}
		}
		if (imgNum < imgCount)
			innerHtml += '<a href="#moreimg" class="standardText" style="font-size:14px;" onClick="chgMoreImg(\'' + thisSku + '\',' + (imgNum + 1) + ',' + bLrgImg + ',' + imgCount + ')"><b>Next</b></a><b class="standardText" style="font-size:14px;"> ></b>';

		innerHtml += '</div>';
		tdNextPrevElement.innerHTML = innerHtml
	}
}
function changeAccessoryProds(elementPrefix, currentID, iCount)
{
	var elementProdNext = document.getElementById(elementPrefix + "_prod_next");
	var elementProdBack = document.getElementById(elementPrefix + "_prod_back");

	var itdCounter = 1;
	if (iCount > 0)
	{
		for (var x = 1; x <= iCount; x++)
		{
			if (document.getElementById(elementPrefix + "_" + x) != null)
			{
				document.getElementById(elementPrefix + "_" + x).style.display = "none";
			}
		}

		for (var x = currentID; x <= currentID + 3; x++)
		{
			if (document.getElementById(elementPrefix + "_" + x) != null)
			{
				document.getElementById(elementPrefix + "_" + x).style.display = "";
			}
		}
	}

	if (elementProdNext && (currentID + 3) < iCount)
	{
		elementProdNext.innerHTML = '<a href=\"javascript:void(0);\" onclick=\"changeAccessoryProds(\'' + elementPrefix + '\',' + (currentID + 4) + ',' + iCount + ');\"><img src=\"http://ast1.r10.io/buy_assets/v6/header/2009/elements/topsellers/rightON.png\" align=\"top\" border=\"0\" alt=\"topsellers back button\" /></a>';
	} else
	{
		elementProdNext.innerHTML = '<img src=\"http://ast1.r10.io/buy_assets/v6/header/2009/elements/topsellers/rightOFF.png\" align=\"top\" border=\"0\" alt=\"topsellers back button\" />';
	}
	if (elementProdBack && currentID > 4)
	{
		elementProdBack.innerHTML = '<a href=\"javascript:void(0);\" onclick=\"changeAccessoryProds(\'' + elementPrefix + '\',' + (currentID - 4) + ',' + iCount + ');\"><img src=\"http://ast1.r10.io/buy_assets/v6/header/2009/elements/topsellers/leftON.png\" align=\"top\" border=\"0\" alt=\"topsellers next button\" /></a>';
	} else
	{
		elementProdBack.innerHTML = '<img src=\"http://ast1.r10.io/buy_assets/v6/header/2009/elements/topsellers/leftOFF.png\" align=\"top\" border=\"0\" alt=\"topsellers next button\" />';
	}

}

function showElement(object)
{
	if (document.getElementById)
	{
		document.getElementById(object).style.display = 'block';
	}
	else if (document.layers && document.layers[object])
	{
		document.layers[object].style.display = 'block';
	}
	else if (document.all)
	{
		document.all[object].style.display = 'block';
	}
}

function hideElement(object)
{
	if (document.getElementById)
	{
		document.getElementById(object).style.display = 'none';
	}
	else if (document.layers && document.layers[object])
	{
		document.layers[object].style.display = 'none';
	}
	else if (document.all)
	{
		document.all[object].style.display = 'none';
	}
}

// when you click on a thumbnail image
function thumbIMClick(sku, prodImg, largeImg)
{
	sku += ""; //convert to string
	var imgName = sku;
	var path = "", lPath = "";

	path = prodImg;
	lPath = largeImg;

	//TODO: move these into the global scope so we aren't requerying the dom every function call
	var prodImgSec_0 = document.getElementById('prodImgSec_0');
	var prodImgSec_1 = document.getElementById('prodImgSec_1');
	var prodSavings = document.getElementById('prodSavings');
	var buyTVEmbed = document.getElementById('buyTVEmbed');
	var grpVideoDiv = document.getElementById('grpVideoDiv');

	prodImgSec_0.style.display = 'none';
	if (prodImgSec_1.style.display == 'none')
		showImgVidContent('prodImgSec', 1);

	if (prodSavings)
		prodSavings.style.display = 'none';
	if (buyTVEmbed)
		buyTVEmbed.innerHTML = '';
	if (grpVideoDiv)
		grpVideoDiv.innerHTML = '';

	thumbIMTop(lPath, path, 0);
}

function hrefClick(sender)
{
	var loc = sender.href;
	window.location(loc);
	return false;
}

function omSetRecCookie(tracking)
{
	var exdate = new Date();
	exdate.setTime(exdate.getTime() + (1000 * 60));
	document.cookie = "prRecTrack=" + tracking + ";expires=" + exdate.toGMTString() + ";path=/";
}

function omGetRecCookie() {
	var prTrackCookie = GetCookie("prRecTrack");
	var exdate = new Date();
	exdate.setTime(exdate.getTime());
	if (prTrackCookie != "null")
		dtmc_product_recommendation = prTrackCookie;
	document.cookie = "prRecTrack=;expires=" + exdate.toGMTString() + ";path=/";
} 

function omGetConvCookie() {
	var prConvTrackCookie = GetCookie("prConvTrack");
	var exdate = new Date();
	exdate.setTime(exdate.getTime());

	if (prConvTrackCookie != "null")
		dtmc_product_conversion = prConvTrackCookie;

	document.cookie = "prConvTrack=;expires=" + exdate.toGMTString() + ";path=/";
}

function scrollLoader(string1, string2)
{
	var position = $("#askAnswersContainer").offset().top;
	var scllwidth = $(window).scrollTop() + $(window).height();
	if (!bvIsLoaded && scllwidth > position)
	{
		$.get("/PR/Answers.aspx?prodsku=" + string1 + "&page=" + string2, function (data) { $('#askAnswersContainer').html(data); });
		bvIsLoaded = true;
	}
}
function RemovePrViewHistoryFromArray(arrayToModify, index)
{
	if (index > arrayToModify.length)
		return arrayToModify;

	arrayToModify.splice(index, 1);
	return arrayToModify.join("|");
}

function ClearPrViewHistoryCookie()
{
	var exdate = new Date();
	exdate.setTime(exdate.getTime());
	document.cookie = "prViewHistory=;expires=" + exdate.toGMTString() + ";path=/";
	$("#prodViewHistory").html("");
}

function UpdatePrViewHistoryCookie(sSku)
{
	var tmpProdHistory = GetCookie("prViewHistory");
	var strProdHistory = "";
	var exdate = new Date();
	exdate.setTime(exdate.getTime() + (1000 * 60 * 60 * 24 * 30));

	document.cookie = "prViewHistory=;expires=Thu, 01-Jan-70 00:00:01 GMT;domain=rakuten.com;path=/";

	if (tmpProdHistory != "null")
	{
		//alert(tmpProdHistory);
		var aryProdHist = tmpProdHistory.split("|");
		for (var i = 0; i < aryProdHist.length; i++)
		{
			if (aryProdHist[i] == sSku)
				tmpProdHistory = RemovePrViewHistoryFromArray(aryProdHist, i);
			if (i == 24)
			{
				//remove the last/oldest one.
				tmpProdHistory = RemovePrViewHistoryFromArray(aryProdHist, i);
			}
		}

		if (tmpProdHistory != "")
			document.cookie = "prViewHistory=" + sSku + "|" + tmpProdHistory + ";expires=" + exdate.toGMTString() + ";path=/";
		else
			document.cookie = "prViewHistory=" + sSku + ";expires=" + exdate.toGMTString() + ";path=/";
	}
	else
		document.cookie = "prViewHistory=" + sSku + ";expires=" + exdate.toGMTString() + ";path=/";
}

function moveImagePopup()
{
	var leftText = $("#PROD_lrgImg").css("left");

	if (leftText == "0px" || leftText == "auto")
	{
		var objPosition = findPos(document.getElementById("divProdLargeImg"));
		var objOffsetPosition = findPos(document.getElementById("pr-main"));
		var left = 0;
		var top = 0;

		left = objPosition[0] - objOffsetPosition[0];
		top = objPosition[1];

		$("#PROD_lrgImg").css("left", left + "px").css("top", top + "px");
	}
}

function loadPopup(p_strDivID, p_strParams, p_blnDontOpen)
{
	if ($("#" + p_strDivID).html() == "")
		$.get('/PR/PopupMessageAjax.aspx?' + p_strParams, function (data)
		{
			$("#" + p_strDivID).html(data);
			if (!p_blnDontOpen && p_strParams.indexOf("mo=1") == -1)
				$("#" + p_strDivID + " div.popup-info-box").show();
		});
}

//the function is a little bit confusing to use, but it's better than having one function for each popup
var mouseTooFastTimer = null;
function togglePopup(p_strDivID, p_strLeftElementID, p_strTopElementID, p_intLeftOffset, p_intTopOffset, p_strSetLeft, p_strSetTop, p_strParams, p_blnShowPopup)
{
	if (p_blnShowPopup == null)
		p_blnShowPopup = true;

	//hidePopups(p_strDivID);
	if ($("#" + p_strDivID).length < 1)
	{
		$.get('/PR/PopupMessageAjax.aspx?' + p_strParams, function (data)
		{
			$("#divPopupsGoHere").append(data);

			if (p_blnShowPopup)
			{
				setPosition(p_strDivID, p_strLeftElementID, p_strTopElementID, p_intLeftOffset, p_intTopOffset, p_strSetLeft, p_strSetTop);
				$("#" + p_strDivID).show();
				//sometimes mouse goes past area where popup will be before it's moved there and shown which makes it so no mouse events fire
				//and it will stay there, this closes it if they aren't in the div when it pops up
				/*
				if (p_strParams.indexOf("mo=1") != -1)
				{
					clearTimeout(mouseTooFastTimer);
					mouseTooFastTimer = window.setTimeout(function () { hidePopups(); }, 500);
				}
				*/
			}
		});
	}
	else if (p_blnShowPopup)
	{
		setPosition(p_strDivID, p_strLeftElementID, p_strTopElementID, p_intLeftOffset, p_intTopOffset, p_strSetLeft, p_strSetTop);
		$("#" + p_strDivID).toggle();
		//sometimes mouse goes past area where popup will be before it's moved there and shown which makes it so no mouse events fire
		//and it will stay there, this closes it if they aren't in the div when it pops up
		/*
		if (p_strParams.indexOf("mo=1") != -1)
		{
			clearTimeout(mouseTooFastTimer);
			mouseTooFastTimer = window.setTimeout(function () { hidePopups(); }, 500);
		}
		*/
	}
}

function setPosition(p_strDivID, p_strLeftElementID, p_strTopElementID, p_intLeftOffset, p_intTopOffset, p_strSetLeft, p_strSetTop)
{
	var objOffSetMain = null;
	var objLeftOffSetElement = $("#" + p_strLeftElementID).offset();
	var objTopOffSetElement = null;
	var strTop = "";
	var strLeft = "";

	if ($("#pr-main").length > 0)
		objOffSetMain = $("#pr-main").offset();
	else if ($("#main").length > 0)
		objOffSetMain = $("#main").offset();
	else
		objOffSetMain = $("div:first").offset();

	if (p_strSetTop == "" || p_strSetTop == null)
	{
		if (p_strTopElementID)
			objTopOffSetElement = $("#" + p_strTopElementID).offset();

		if (objTopOffSetElement)
			strTop = (objTopOffSetElement.top + p_intTopOffset) + "px";
		else
			strTop = (objLeftOffSetElement.top + p_intTopOffset) + "px";
	}
	else
		strTop = p_strSetTop;

	if (p_strSetLeft == "" || p_strSetLeft == null)
		strLeft = ((objLeftOffSetElement.left - objOffSetMain.left) + p_intLeftOffset) + "px";
	else
		strLeft = p_strSetLeft;

	$("#" + p_strDivID).css("left", strLeft).css("top", strTop);
}

//finds left and top position of an element
function findPos(obj)
{
	var curleft = curtop = 0;

	if (obj.offsetParent)
	{
		do
		{
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}

	return [curleft, curtop];
}

function hidePopups(p_strExcludeID)
{
	if (p_strExcludeID != "divAlsoAvailablePopup" && $("#divAlsoAvailablePopup").filter(":visible").length != 0)
		$("body").unbind("click");

	if (p_strExcludeID && p_strExcludeID != "")
		$("div.popup-info-box").not("#" + p_strExcludeID).hide();
	else
		$("div.popup-info-box").hide();
}

function addPopupMouseOut(p_strElementID)
{
	$("#" + p_strElementID).unbind("mouseover").unbind("mouseout").removeAttr("onmouseover").removeAttr("onmouseout");
	//sometimes mouse goes past area where popup will be before it's moved there and shown which makes it so no mouse events fire
	//and it will stay there, this stops that if they are in the div when it pops up
	$("#" + p_strElementID).attr("onmouseover", "clearTimeout(mouseTooFastTimer);");
	//wouldn't work in ie without both attr() and bind() set, no idea why
	$("#" + p_strElementID).bind("mouseover", function (e)
	{
		clearTimeout(mouseTooFastTimer);
	});
	$("#" + p_strElementID).bind("mouseout", function (e)
	{
		if (!e) var e = window.event;
		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
		while (reltg && reltg.tagName != 'BODY')
		{
			if (reltg.id == this.id) { return; }
			reltg = reltg.parentNode;
		}

		hidePopups(null);
	});
}

function setSelectorInfo()
{
	if (typeof (setDefaultSelectorInfo) == "function")
		setDefaultSelectorInfo();
}

function scrollToLoader(container, url)
{
	var position = $(container).offset().top;
	var scllwidth = $(window).scrollTop() + $(window).height();
	if (scllwidth > position)
	{
		$.get(url, function (data) { $(container).css("opacity", "0").html(data).animate({ opacity: '1' }); });
		$(window).unbind("scroll", scrollToLoader.caller);
	}
}

/*
jQuery (character and word) counter
Copyright (C) 2009  Wilkins Fernandez
//Modified for our use. See jquery site for full version

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function ($)
{
	$.fn.extend({
		counter: function ()
		{
			return this.each(function ()
			{
				var msg;
				var $obj = $(this);

				// Sets the appropriate message based on the options
				function get_msg_equation(objLength)
				{
					msg = " characters (<b style=\"color:#3143A9;\">250 min. to earn Superpoints</span>)";
					return objLength;
				}
				// * Initialize *: the bind event needs an object to bind to
				$('<div id=\"' + this.id + '_counter\"><span>' + get_msg_equation($($obj).val().length) + '</span>' + msg + '</div>').insertAfter($obj);

				// Cache the counter selector
				var $currentCount = $("#" + this.id + "_counter" + " span");

				// Bind events to a function that returns the length
				// of the characters || words in the given text field.
				$obj.bind('keyup click blur focus change paste', function (new_length)
				{
					// Update characters depending on the option selected
					new_length = $($obj).val().replace(/\s+/g, " ").length;

					$currentCount.text(get_msg_equation(new_length));
				}); // END Bind
			}); //END return
		} // END counter function
	}); // END extend
}) // END function
(jQuery); // Return jQuery object

function setAlsoAvailable(qsSku)
{
	if ($("#divAlsoAvailablePopup").filter(":visible").length == 0)
	{
		togglePopup('divAlsoAvailablePopup', 'anchorAlsoAvailable', null, -100, 15, null, null, 'pw=ThreeHundred&pn=AlsoAvailable&sku=' + qsSku, true);
		var temp = window.setTimeout(function () { addAlsoAvailableFocusCheck(); }, 100);
	}
}
function addAlsoAvailableFocusCheck()
{
	$("body").unbind("click").bind("click", function (e)
	{
		if (e)
		{
			var targ;
			if (e.target) targ = e.target;
			else if (e.srcElement) targ = e.srcElement;
			if (targ.nodeType == 3) targ = targ.parentNode;
			if ($(targ).closest("#divAlsoAvailablePopup").length == 0)
			{
				$('#divAlsoAvailablePopup').hide();
				$("body").unbind("click");
			}
		}
	});
}

function koboProductClick(url) {
	hidePopups(null);
	var prKoboCookie = GetCookie("prShowKoboDesc");
	if (prKoboCookie == "0")
		window.location = url + "?utm_source=buydotcom&utm_medium=web&utm_campaign=retailer";
	else {
		togglePopup('divKoboEditionPopup', 'whatsThisKobo', null, -758, -150, null, null, 'pw=SevenHundred&pn=KoboEdition&kpl=' + url, true);
		$('#spanKoboPopupButtons').show();
	}
}
function koboProductClickContinue(url) {
	if ($("#chkKoboShowDesc").is(':checked')) {
		var prKoboCookie = GetCookie("prShowKoboDesc");
		var exdate = new Date();
		exdate.setTime(exdate.getTime() + (1000 * 60 * 60 * 24 * 30));
		document.cookie = "prShowKoboDesc=0;expires=" + exdate.toGMTString() + ";path=/";
	}

	window.location = url + "?utm_source=buydotcom&utm_medium=web&utm_campaign=retailer";
}

/*
BuyZoom
Copyright (c) 2011 Buy.com Inc.
*/
(function (a) { a.fn.BuyZoom = function (b) { b = a.extend({}, a.fn.BuyZoom.defaultOpts, b || {}); var d = this, c = a(b.OverviewContainer || this); return this.each(function (z) { var G = a(this); var J = G.data("buyzoom"); if (!J) { return } var h = a(c.get(z)); var q, u, j, e, s, g; var p; var m, k, F, E, D, B; var w, I, t, r, l, H; var o; var A = new Image(); a(A).load(y); A.src = J.src; var n, x; function y() { G.css({ position: "relative", cursor: "pointer" }); q = G.width(); u = G.height(); j = h.width(); e = h.height(); p = G.offset(); if (b.ZoomContainer) { n = a(b.ZoomContainer); n.css({ backgroundImage: 'url("' + A.src + '")', backgroundRepeat: "no-repeat", backgroundPosition: "0 0", cursor: "move" }) } else { n = a("<div></div>"); n.css({ position: "absolute", width: q, height: u, zIndex: 90, top: 0, left: 0, boxShadow: "0 0 5px 1px #CCCCCC inset", backgroundImage: 'url("' + A.src + '")', backgroundRepeat: "no-repeat", backgroundPosition: "0 0", cursor: "move" }); G.prepend(n) } s = n.width(); g = n.height(); n.hide(); w = q * s / A.width; I = u * g / A.height; t = q - w; r = u - I; l = Math.ceil(j * (w / q)); H = Math.ceil(e * (I / u)); x = a('<div class="overviewFrame"></div>'); x.css({ zIndex: 89, position: "absolute", display: "none", width: l, height: H, backgroundImage: 'url("http://ast1.r10.io/buy_assets/v10/product/zoom_grid.gif")' }); h.append(x); G.mouseenter(C).mouseleave(v); if ("ontouchstart" in document.documentElement) { n.click(function (K) { m = K.pageX - p.left; k = K.pageY - p.top; var i = n.css("background-position").split(" "); i[0] = parseInt(i[0], 10) * -1; i[1] = parseInt(i[1], 10) * -1; D = m - q / 2; B = k - u / 2; F = i[0] + D; E = i[1] + B; if (F < 0) { F = 0 } else { if (F > A.width - q) { F = A.width - q } } if (E < 0) { E = 0 } else { if (E > A.height - u) { E = A.height - u } } n.css("background-position", "-" + (F >> 0) + "px -" + (E >> 0) + "px"); x.css({ left: (F * (j / A.width)) >> 0, top: (E * (e / A.height)) >> 0 }) }) } else { G.bind("mousemove.buyzoom", f) } if (b.LoadedCallback) { b.LoadedCallback.call(G) } } function C(i) { p = G.offset(); f(i); o = window.setTimeout(function () { n.css("background-image", 'url("' + A.src + '")'); n.stop(false, true).fadeIn(300); x.fadeIn(200) }, 200) } function v(i) { window.clearTimeout(o); n.stop(false, true).fadeOut(250); x.hide() } function f(i) { m = i.pageX - p.left; k = i.pageY - p.top; D = m - w / 2; B = k - I / 2; if (D < 0) { D = 0 } else { if (D > t) { D = t } } if (B < 0) { B = 0 } else { if (B > r) { B = r } } F = (D / q) * A.width; E = (B / u) * A.height; n.css("background-position", "-" + (F >> 0) + "px -" + (E >> 0) + "px"); x.css({ left: (F * (j / A.width)) >> 0, top: (E * (e / A.height)) >> 0 }) } }) }; a.fn.BuyZoom.defaultOpts = { LoadedCallback: null, OverviewContainer: null, ZoomContainer: null} })(jQuery);

function openRefurbInfo(p_strContainer)
{
	if ($("#" + p_strContainer).html() == "")
		loadPopup(p_strContainer, 'pw=FiveHundred&pn=RefurbInfo&ps=Pointy', false);
	else
		$("#" + p_strContainer).find('#divRefurbInfoPopup').toggle(); //do find for ie7
}

function openWhosThis()
{
	if ($("#divWhosThisContainer").html() == "")
		loadPopup('divWhosThisContainer', 'pw=FiveHundred&pn=MPInfo&ps=Pointy', false);
	else
		$('#divMPInfoPopup').toggle();
}

function openListPrice()
{
	if ($("#divListPriceContainer").html() == "")
		loadPopup('divListPriceContainer', 'pw=FiveHundred&pn=ListPrice&ps=Pointy', false);
	else
		$('#divListPricePopup').toggle();
}

function openShippingRestrictions(attributeList)
{
	if ($("#anchorShippingRestrictionsContainer").html() == "")
		loadPopup('anchorShippingRestrictionsContainer', 'pw=ThreeHundred&pn=ShippingRestrictions&ps=Pointy&rt=' + attributeList, false);
	else
		$('#divShippingRestrictionsPopup').toggle();
}

function openCheckoutForPrice()
{
	if ($("#anchorCheckoutPriceContainer").html() == "")
		loadPopup('anchorCheckoutPriceContainer', 'pw=FiveHundred&pn=CheckoutPrice&ps=Pointy', false);
	else
		$('#divCheckoutPricePopup').toggle();
}

function openCartForPrice()
{
	if ($("#anchorCartForPriceContainer").html() == "")
		loadPopup('anchorCartForPriceContainer', 'pw=FiveHundred&pn=CartForPrice&ps=Pointy', false);
	else
		$('#divCartForPricePopup').toggle();
}

function showSellerListings(p_listingId)
{
	switchTab('divMoreBuyingOptions');
	if (p_listingId != null)
		$('#spanScrollTo' + p_listingId).ScrollTo(800);
	else
		$('#divSellerListings').ScrollTo(800);
}

//////////////////// scroll ////////////////////////////////////////////////////////////////////////////
jQuery.getPos = function (e)
{
	var l = 0;
	var t = 0;
	var w = jQuery.intval(jQuery.css(e, 'width'));
	var h = jQuery.intval(jQuery.css(e, 'height'));
	var wb = e.offsetWidth;
	var hb = e.offsetHeight;
	while (e.offsetParent)
	{
		l += e.offsetLeft + (e.currentStyle ? jQuery.intval(e.currentStyle.borderLeftWidth) : 0);
		t += e.offsetTop + (e.currentStyle ? jQuery.intval(e.currentStyle.borderTopWidth) : 0);
		e = e.offsetParent;
	}
	l += e.offsetLeft + (e.currentStyle ? jQuery.intval(e.currentStyle.borderLeftWidth) : 0);
	t += e.offsetTop + (e.currentStyle ? jQuery.intval(e.currentStyle.borderTopWidth) : 0);
	return { x: l, y: t, w: w, h: h, wb: wb, hb: hb };
};
jQuery.getClient = function (e)
{
	var w = null;
	var h = null;

	if (e)
	{
		w = e.clientWidth;
		h = e.clientHeight;
	} else
	{
		w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
		h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
	}
	return { w: w, h: h };
};
jQuery.getScroll = function (e)
{
	var t = null;
	var l = null;
	var w = null;
	var h = null;

	if (e)
	{
		t = e.scrollTop;
		l = e.scrollLeft;
		w = e.scrollWidth;
		h = e.scrollHeight;
	} else
	{
		if (document.documentElement && document.documentElement.scrollTop)
		{
			t = document.documentElement.scrollTop;
			l = document.documentElement.scrollLeft;
			w = document.documentElement.scrollWidth;
			h = document.documentElement.scrollHeight;
		} else if (document.body)
		{
			t = document.body.scrollTop;
			l = document.body.scrollLeft;
			w = document.body.scrollWidth;
			h = document.body.scrollHeight;
		}
	}
	return { t: t, l: l, w: w, h: h };
};

jQuery.intval = function (v)
{
	var v = parseInt(v);
	return isNaN(v) ? 0 : v;
};

jQuery.fn.ScrollTo = function (s)
{
	var o = jQuery.speed(s);
	return this.each(function ()
	{
		new jQuery.fx.ScrollTo(this, o);
	});
};

jQuery.fx.ScrollTo = function (e, o)
{
	var z = this;
	z.o = o;
	z.e = e;
	z.p = jQuery.getPos(e);
	z.s = jQuery.getScroll();
	z.clear = function () { clearInterval(z.timer); z.timer = null };
	z.t = (new Date).getTime();
	z.step = function ()
	{
		var t = (new Date).getTime();
		var p = (t - z.t) / z.o.duration;
		if (t >= z.o.duration + z.t)
		{
			z.clear();
			setTimeout(function () { z.scroll(z.p.y, z.p.x); }, 13);
		} else
		{
			st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
			sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
			z.scroll(st, sl);
		}
	};
	//in small browser creates page shifting issue when you scroll because of shop together, it makes the page more than 1000px wide and adds an x-axis scroll bar, lame
	//z.scroll = function (t, l) { window.scrollTo(l, t) };
	z.scroll = function (t, l) { window.scrollTo(0, t) };
	z.timer = setInterval(function () { z.step(); }, 13);
};

//////////////////// scroll ////////////////////////////////////////////////////////////////////////////

function saveForLater(p_sku)
{
	if (GetCookie("BuyShopperID") != null)
	{
		$.ajax({
			url: "http://cart.rakuten.com/CO/Basket/MobileCartServiceV5.asmx/SaveForLaterItemAddJSONP?cartItemID=0&callbackName=saveForLaterCallback&sku=" + p_sku + "&shopperID=" + GetCookie("BuyShopperID"),
			dataType: 'jsonp'
		});
	}
	else
		alert("Sorry, there was an error and your item was not added.");
}

function saveForLaterCallback(data)
{
	if (data)
		alert("Your item has been added.");
	else
		alert("Sorry, there was an error and your item was not added.");
}

//uses js to remove characters until the height of the title is 2 lines
function handleTitleLength()
{
	var $titleContainer = $("#titleSectionContainer");
	var $title = $("#AuthorArtistTitle_productTitle .pr-show-title");
	if ($titleContainer.length > 0 && $title.length > 0 && $titleContainer.height() > 60)
	{
		var $hiddenTitle = $("#AuthorArtistTitle_productTitle .pr-hidden-title");
		var tempTitle = "";
		var showMore = "";
		
		//hide some extra title elements
		$("#AuthorArtistTitle_spanMarketingTitle").hide();
		$("#AuthorArtistTitle_boldFormatTitle").hide();
		$("#AuthorArtistTitle_spanZOriginalRelease").hide();
		$("#AuthorArtistTitle_spanMarketingTitle").hide();

		$title.find(".pr-show-title-link").show();
		
		tempTitle = $title.html();
		//using toLowerCase() because ie8 and older have <SPAN as html, all the others have <span
		showMore = tempTitle.substring(tempTitle.toLowerCase().indexOf("<span"));
		tempTitle = tempTitle.substring(0, tempTitle.toLowerCase().indexOf("<span"));
		//add elipses and the show more link so the extra width get's added
		$title.html(tempTitle + "..." + showMore);
		//copy full title to hidden span
		$hiddenTitle.html(tempTitle);
		//remove characters until the height goes down
		var i = 0;
		while ($titleContainer.height() > 60 && i < 1000)
		{
			tempTitle = $title.html();
			tempTitle = tempTitle.substring(0, tempTitle.indexOf("...") - 1); //remove last character
			$title.html(tempTitle + "..." + showMore);
			//add a limit just in case to prevent browser killing infinite loops
			i++;
		}
	}
}

function toggleSuperPointsPopup() {
	$('#divSPPopup').toggle();
	$('#addItemOverlay').toggle();
}

function switchTab(contentId) {
	$("#divTabContent .pr-tabContent").hide();
	$("#" + contentId).show();
	$("#divTabsContainer .pr-tabButt").removeClass("active");
	$("#" + contentId + "Tab").addClass("active");
}

function renderReviewPreview() {

	//validation
	var isvalid = true;
	if ($("#reviewTitle").val().length == 0)
	{
		$("#valRequiredReviewTitle").show();
		isvalid = false;
	}
	else
	{                                                    
		$("#valRequiredReviewTitle").hide();
		if ((/^[<>]+/).test($("#reviewTitle").val()))
		{
			$("#valRegxValidateReviewTitle").show();
			isvalid = false;
		}
		else
		{
			$("#valRegxValidateReviewTitle").hide();
		}
	}

	if ($("#reviewContent").val().length == 0)
	{
		$("#valRequiredReviewContent").show();
		isvalid = false;
	}
	else
	{
		$("#valRequiredReviewContent").hide();
		if ((/^[<>]+/).test($("#reviewContent").val()))
		{
			$("#valRegxValidateReviewContent").show();
			isvalid = false;
		}
		else
		{
			$("#valRegxValidateReviewContent").hide();
															
		}
	}

	$("#valRequiredReviewName").hide();
	if ((/^[<>]+/).test($("#reviewName").val()))
	{
		$("#valRegxValidateReviewName").show();
		isvalid = false;
	}
	else
	{
		$("#valRegxValidateReviewName").hide();
	}
													
	if ($("#reviewLocation").val().length == 0)
	{
		$("#valRequiredReviewLocation").show();
													   
		isvalid = false;
	}
	else
	{
		$("#valRequiredReviewLocation").hide();
		if ((/^[<>]+/).test($("#reviewLocation").val()))
		{
			$("#valRegxValidateReviewLocation").show();
			isvalid = false;
		}
		else
		{
			$("#valRegxValidateReviewLocation").hide();
		}
	}
	if ($("#reviewContent").val().length > 4000)
	{
		$("#valReviewContentCount").show();
		isvalid = false;
	}
	else
	{
		$("#valReviewContentCount").hide();
	}
													
	if (isvalid)
	{
		$("#reviewRatingPreview").html($("#ratingSelect").val() + " of 5 ");

		var reviewNameValue = " " + $("#reviewName").val();
		if (reviewNameValue.length > 0)
			$("#reviewNamePreview").html(reviewNameValue);
		else
			$("#reviewNamePreview").html("A customer");

		$("#reviewLocationPreview").html("from " +" " + $("#reviewLocation").val());

		$("#reviewContentPreview").html($("#reviewContent").val());
		$("#reviewTitlePreview").html($("#reviewTitle").val());

		$("#reviewEditSection").hide(500);
		$("#reviewPreviewSection").show();
		window.location.hash = "wRevSec";
	}
}
function buttonReviewEdit_Click() {
	$("#reviewEditSection").show(500);
	$("#reviewPreviewSection").hide();
}
function buttonReviewSubmit_Click(qsSku, reviewsRand) {
													
	$("#reviewEditSection").hide();
	$("#reviewPreviewSection").hide();

	var url = "/pr/writereview.aspx";
	var data = {};
	data.reviewTitle = $("#reviewTitle").val();
	data.subrating1Select = $("#subrating1Select").val();
	data.subrating2Select = $("#subrating2Select").val();
	data.subrating3Select = $("#subrating3Select").val();
	data.ratingSelect = $("#ratingSelect").val();
	data.reviewName = $("#reviewName").val();
	data.reviewLocation = $("#reviewLocation").val();
	data.reviewContent = $("#reviewContent").val();
	data.sku = qsSku;
	data.rand = reviewsRand;

	$.getJSON(url, data, function (json, textStatus, jqXHR) {
		if (json.success) {
			$("#reviewSubmitted").show();
		}
		else {
			if (json.message)
				$("#reviewSubmitErrorMessage").html("<br />Message: " + json.message);
			$("#reviewSubmitError").show();
		}
	}
	)
}