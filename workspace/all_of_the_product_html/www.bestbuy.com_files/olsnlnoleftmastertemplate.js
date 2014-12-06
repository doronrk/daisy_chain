/* UI BUILD: Wednesday, Nov 19 2014 at 10:31:50 AM -- BUILD ID: BRANCH_NAME: com.bestbuy.atg-apps.release.1443 VERSION: 14.43.127 */
/* MD5: 95d5f992958b95989c9306b157caa84d */

var agt = navigator.userAgent.toLowerCase();
var is_major = parseInt(navigator.appVersion);
var is_minor = parseFloat(navigator.appVersion);
var is_nav = ((agt.indexOf("mozilla") != -1) && (agt.indexOf("spoofer") == -1) && (agt.indexOf("compatible") == -1) && (agt.indexOf("opera") == -1) && (agt.indexOf("webtv") == -1) && (agt.indexOf("hotjava") == -1));
var is_nav2 = (is_nav && (is_major == 2));
var is_nav3 = (is_nav && (is_major == 3));
var is_nav4 = (is_nav && (is_major == 4));
var is_nav4up = (is_nav && (is_major >= 4));
var is_navonly = (is_nav && ((agt.indexOf(";nav") != -1) || (agt.indexOf("; nav") != -1)));
var is_nav6 = (is_nav && (is_major == 5));
var is_nav6up = (is_nav && (is_major >= 5));
var is_gecko = (agt.indexOf("gecko") != -1);
var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
var is_ie3 = (is_ie && (is_major < 4));
var is_ie4 = (is_ie && (is_major == 4) && (agt.indexOf("msie 4") != -1));
var is_ie4up = (is_ie && (is_major >= 4));
var is_ie5 = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0") != -1));
var is_ie5_5 = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") != -1));
var is_ie5up = (is_ie && !is_ie3 && !is_ie4);
var is_ie5_5up = (is_ie && !is_ie3 && !is_ie4 && !is_ie5);
var is_ie6 = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.") != -1));
var is_ie6up = (is_ie && !is_ie3 && !is_ie4 && !is_ie5 && !is_ie5_5);
var is_aol = (agt.indexOf("aol") != -1);
var is_aol3 = (is_aol && is_ie3);
var is_aol4 = (is_aol && is_ie4);
var is_aol5 = (agt.indexOf("aol 5") != -1);
var is_aol6 = (agt.indexOf("aol 6") != -1);
var is_opera = (agt.indexOf("opera") != -1);
var is_opera2 = (agt.indexOf("opera 2") != -1 || agt.indexOf("opera/2") != -1);
var is_opera3 = (agt.indexOf("opera 3") != -1 || agt.indexOf("opera/3") != -1);
var is_opera4 = (agt.indexOf("opera 4") != -1 || agt.indexOf("opera/4") != -1);
var is_opera5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
var is_opera5up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4);
var is_webtv = (agt.indexOf("webtv") != -1);
var is_TVNavigator = ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1));
var is_AOLTV = is_TVNavigator;
var is_hotjava = (agt.indexOf("hotjava") != -1);
var is_hotjava3 = (is_hotjava && (is_major == 3));
var is_hotjava3up = (is_hotjava && (is_major >= 3));
var is_js;
if (is_nav2 || is_ie3) {
	is_js = 1
} else {
	if (is_nav3) {
		is_js = 1.1
	} else {
		if (is_opera5up) {
			is_js = 1.3
		} else {
			if (is_opera) {
				is_js = 1.1
			} else {
				if ((is_nav4 && (is_minor <= 4.05)) || is_ie4) {
					is_js = 1.2
				} else {
					if ((is_nav4 && (is_minor > 4.05)) || is_ie5) {
						is_js = 1.3
					} else {
						if (is_hotjava3up) {
							is_js = 1.4
						} else {
							if (is_nav6 || is_gecko) {
								is_js = 1.5
							} else {
								if (is_nav6up) {
									is_js = 1.5
								} else {
									if (is_ie5up) {
										is_js = 1.3
									} else {
										is_js = 0
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
var is_win = ((agt.indexOf("win") != -1) || (agt.indexOf("16bit") != -1));
var is_win95 = ((agt.indexOf("win95") != -1) || (agt.indexOf("windows 95") != -1));
var is_win16 = ((agt.indexOf("win16") != -1) || (agt.indexOf("16bit") != -1) || (agt.indexOf("windows 3.1") != -1) || (agt.indexOf("windows 16-bit") != -1));
var is_win31 = ((agt.indexOf("windows 3.1") != -1) || (agt.indexOf("win16") != -1) || (agt.indexOf("windows 16-bit") != -1));
var is_winme = ((agt.indexOf("win 9x 4.90") != -1));
var is_win2k = ((agt.indexOf("windows nt 5.0") != -1));
var is_win98 = ((agt.indexOf("win98") != -1) || (agt.indexOf("windows 98") != -1));
var is_winnt = ((agt.indexOf("winnt") != -1) || (agt.indexOf("windows nt") != -1));
var is_win32 = (is_win95 || is_winnt || is_win98 || ((is_major >= 4) && (navigator.platform == "Win32")) || (agt.indexOf("win32") != -1) || (agt.indexOf("32bit") != -1));
var is_os2 = ((agt.indexOf("os/2") != -1) || (navigator.appVersion.indexOf("OS/2") != -1) || (agt.indexOf("ibm-webexplorer") != -1));
var is_mac = (agt.indexOf("mac") != -1);
if (is_mac && is_ie5up) {
	is_js = 1.4
}
var is_mac68k = (is_mac && ((agt.indexOf("68k") != -1) || (agt.indexOf("68000") != -1)));
var is_macppc = (is_mac && ((agt.indexOf("ppc") != -1) || (agt.indexOf("powerpc") != -1)));
var is_sun = (agt.indexOf("sunos") != -1);
var is_sun4 = (agt.indexOf("sunos 4") != -1);
var is_sun5 = (agt.indexOf("sunos 5") != -1);
var is_suni86 = (is_sun && (agt.indexOf("i86") != -1));
var is_irix = (agt.indexOf("irix") != -1);
var is_irix5 = (agt.indexOf("irix 5") != -1);
var is_irix6 = ((agt.indexOf("irix 6") != -1) || (agt.indexOf("irix6") != -1));
var is_hpux = (agt.indexOf("hp-ux") != -1);
var is_hpux9 = (is_hpux && (agt.indexOf("09.") != -1));
var is_hpux10 = (is_hpux && (agt.indexOf("10.") != -1));
var is_aix = (agt.indexOf("aix") != -1);
var is_aix1 = (agt.indexOf("aix 1") != -1);
var is_aix2 = (agt.indexOf("aix 2") != -1);
var is_aix3 = (agt.indexOf("aix 3") != -1);
var is_aix4 = (agt.indexOf("aix 4") != -1);
var is_linux = (agt.indexOf("inux") != -1);
var is_sco = (agt.indexOf("sco") != -1) || (agt.indexOf("unix_sv") != -1);
var is_unixware = (agt.indexOf("unix_system_v") != -1);
var is_mpras = (agt.indexOf("ncr") != -1);
var is_reliant = (agt.indexOf("reliantunix") != -1);
var is_dec = ((agt.indexOf("dec") != -1) || (agt.indexOf("osf1") != -1) || (agt.indexOf("dec_alpha") != -1) || (agt.indexOf("alphaserver") != -1) || (agt.indexOf("ultrix") != -1) || (agt.indexOf("alphastation") != -1));
var is_sinix = (agt.indexOf("sinix") != -1);
var is_freebsd = (agt.indexOf("freebsd") != -1);
var is_bsd = (agt.indexOf("bsd") != -1);
var is_unix = ((agt.indexOf("x11") != -1) || is_sun || is_irix || is_hpux || is_sco || is_unixware || is_mpras || is_reliant || is_dec || is_sinix || is_aix || is_linux || is_bsd || is_freebsd);
var is_vms = ((agt.indexOf("vax") != -1) || (agt.indexOf("openvms") != -1));
function openContextSensitiveLink(a) {
	URL = "olspage.jsp?id=" + pageContextId + "&type=" + pageType + "&contentId=" + a + "&entryURLID=" + entryURLID + "&entryURLType=" + entryURLType;
	javascript: popUp(URL, "Content_Sensitive_Help_Topic", "3", "0")
}
function openContextSensitiveLinkCheckout(a) {
	URL = "olspage.jsp?id=" + chkoutContextId + "&type=" + pageType + "&contentId=" + a + "&entryURLID=" + entryURLID + "&entryURLType=" + entryURLType;
	javascript: popUp(URL, "Context_Sensitive_Help_Topic_Checkout", "3", "0")
}
function ratingPopup(c, b) {
	var a = "olspage.jsp?id=" + c + "&contentId=" + b + "&type=page";
	popUp(a, "ratingWindow", "3", "0")
}
function handleEnterKeyPress(a) {
	var b = a.txtkeywords.value;
	b = trim(b);
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			if (searchButtonClicked) {
				return false
			} else {
				searchButtonClicked = true
			}
			if (b == "") {
				alert("Please specify a string to search");
				a.txtkeywords.value = "";
				a.txtkeywords.focus();
				searchButtonClicked = false;
				return false
			} else {
				a.submit()
			}
		}
	}
	if (navigator.appName == "Netscape") {
		canSearch = true;
		if (arguments.callee.caller.arguments[0].which == 13) {
			if (searchButtonClicked) {
				return false
			} else {
				searchButtonClicked = true
			}
			if (b == "") {
				alert("Please specify a string to search");
				a.txtkeywords.value = "";
				a.txtkeywords.focus();
				searchButtonClicked = false;
				canSearch = false;
				return false
			} else {
				a.submit()
			}
		}
	}
}
var canSearch = true;
function checkForEmptyField(a) {
	if (searchButtonClicked) {
		return false
	} else {
		searchButtonClicked = true
	}
	var b = a.txtkeywords.value;
	b = trim(b);
	if (b == "") {
		alert("Please specify a search string");
		a.txtkeywords.value = "";
		a.txtkeywords.focus();
		searchButtonClicked = false;
		return false
	}
}
function trim(a) {
	while ("" + a.charAt(0) == " ") {
		a = a.substring(1, a.length)
	}
	while ("" + a.charAt(a.length - 1) == " ") {
		a = a.substring(0, a.length - 1)
	}
	return a
}
function showRebateWindow(a, c, b) {
	popUp("olspage.jsp?id=" + a + "&productId=" + b + "&type=page&contentId=" + c, "Rebate", "3", "0")
}
function openSite(a, b) {
	popUpRawURL(a, "thirdPartyWindow", b, "0")
}
function buildcontext(a) {
	prevUrl = a.href;
	parameters = prevUrl.slice(prevUrl.indexOf("?"));
	prevPathname = a.pathname;
	actualUrl = addJsessionIdIfRequired(contextRoot + "/" + prevPathname + parameters);
	a.href = actualUrl
}
function addSiteMapJsessionId(a) {
	prevUrl = a.href;
	parameters = prevUrl.slice(prevUrl.indexOf("?"));
	prevPathname = a.pathname;
	if (prevPathname.charAt(0) != "/") {
		prevPathname = "/" + prevPathname
	}
	actualUrl = addJsessionIdIfRequired(prevPathname + parameters);
	a.href = actualUrl
}
function displayImg(e, b, c, d, f) {
	var a = '<img src="' + imgServer;
	if (e) {
		if (e) {
			a = a + e + '"'
		}
		if (b) {
			a = a + " height=" + b
		}
		if (c) {
			a = a + " width=" + c
		}
		a = a + " border=0";
		if (d) {
			a = a + ' alt="' + d + '"'
		}
		if (f) {
			a = a + ' align="' + f + '"'
		}
		a = a + ">";
		document.write(a)
	} else {}
}
var newWindow;
var intspacerstrheight;
var strwidth;
var strheight;
var stringurl;
var intadjust;
var intspacerheight;
agt = navigator.userAgent.toLowerCase();
if (agt.indexOf("win") != -1) {
	intadjust = "0"
} else {
	intadjust = "16"
}
function popUp(a, d, c, b) {
	if (a.indexOf("olspage") == 0) {
		a = contextRoot + "/" + a
	}
	popUpCommon(a, d, c, b, true)
}
function vehiclePopUp(a, d, c, b) {
	if (a.indexOf("olspage") == 0) {
		a = contextRoot + "/" + a
	}
	popUpCommon(a, d, c, b, true)
}
function popUpRawURL(a, d, c, b) {
	if (a.indexOf("://") == -1) {
		a = "http://" + a
	}
	popUpCommon(a, d, c, b, true, true)
}
function popUpCommon(b, g, e, d, a, f) {
	e = e + "";
	if (newWindow) {
		if (newWindow.closed == false) {
			newWindow.close()
		}
	}
	switch (e) {
	case "6":
		strwidth = "800";
		strheight = "550";
		intspacerheight = (parseInt(intadjust) + 488);
		break;
	case "5":
		strwidth = "680";
		strheight = "450";
		intspacerheight = (parseInt(intadjust) + 387);
		break;
	case "4":
		strwidth = "687";
		strheight = "450";
		intspacerheight = (parseInt(intadjust) + 387);
		break;
	case "3":
		strwidth = "420";
		strheight = "350";
		intspacerheight = (parseInt(intadjust) + 287);
		break;
	case "2":
		strwidth = "290";
		strheight = "300";
		intspacerheight = (parseInt(intadjust) + 237);
		break
	}
	if (a) {
		var c = "?";
		if (b.indexOf("?") != -1) {
			c = "&"
		}
		b = b + c + "h=" + intspacerheight
	}
	if (!f) {
		b = addJsessionIdIfRequired(b)
	}
	newWindow = window.open(b, g, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=" + d + ",width=" + strwidth + ",height=" + strheight + ",left=50,top=200")
}
function openDiscographyPopup(b, a) {
	popUp("olspage.jsp?id=" + a + "&ArtistId=" + b + "&type=page", "Discography", "4", "0")
}
function handleEnterKey(a) {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			a.submit()
		}
	}
}
function openDetailPage(a) {
	a = addJsessionIdIfRequired(a);
	if (window.opener != null) {
		if ((window.opener) && (!(window.opener.closed))) {
			window.opener.location.href = a;
			window.opener.focus()
		} else {
			newWindow = window.open(a, "pdpWindow", "toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1");
			newWindow.focus()
		}
		window.close()
	} else {
		window.location.href = a
	}
}
function addJsessionIdIfRequired(a) {
	var b = getJSessionId();
	if ((b != null) && (a.indexOf("jsessionid")) == -1) {
		a = a.replace("?", ";" + b + "?")
	}
	return a
}
function getJSessionId() {
	var a = document.location.href;
	var b = a.match(/jsessionid=[a-z0-9]+/i);
	return b
}
function MD(c, b, a) {
	this.menuId = c;
	this.prop = b;
	this.cElements = a
}
function renderMenu(a) {
	for (i = 0; i < a.length; i++) {
		currMenuData = a[i];
		writeMenuStart(currMenuData.menuId, currMenuData.prop[0], currMenuData.prop[1], currMenuData.prop[2], currMenuData.prop[3], currMenuData.prop[4], currMenuData.prop[5], currMenuData.prop[6], currMenuData.prop[7], currMenuData.prop[8], currMenuData.prop[9], currMenuData.prop[10], currMenuData.prop[11], currMenuData.prop[12], currMenuData.prop[13]);
		for (j = 0; j < currMenuData.cElements.length; j++) {
			writeMenu(currMenuData.cElements[j][0], currMenuData.cElements[j][1], currMenuData.prop[6], currMenuData.prop[7], currMenuData.prop[8], currMenuData.prop[9], currMenuData.prop[12])
		}
		writeMenuEnd()
	}
}
function writeMenuStart(l, e, o, f, q, k, c, h, n, a, m, g, b, d, p) {
	pAnchorTag = addJsessionIdIfRequired('<a href = "' + m + "site/olspage.jsp?id=" + g + "&type=page&categoryRep=" + b + '" class="' + d + '">' + p + "</a>");
	if (document.layers) {
		document.write("<layer id=" + l + " pagex=" + e + " pagey=" + o + " visibility=hide z-index=3 onmouseout=\"Hide('" + l + "');\" onmouseover=\"Show('" + l + "');\"> ")
	} else {
		document.write("<div id=" + l + ' Style="Position:Absolute;Left:' + e + ";Top:" + o + ';Visibility:hidden;z-index:3" onmouseout="Hide(\'' + l + "');\" onmouseover=\"Show('" + l + "');\"> ")
	}
	document.write('<table border=0 cellpadding=0 cellspacing=0 bgcolor="' + f + '"> ');
	if (c != null) {
		document.write('<tr><td><table border=0 cellpadding=2 cellspacing=1 onMouseOver="javascript:' + q + ".src='" + k + '\';" onmouseout="javascript:' + q + ".src='" + c + "';\"> ")
	} else {
		document.write('<tr><td><table border=0 cellpadding=2 cellspacing=1 onMouseOver="javascript:' + q + ".src='" + k + "';\"> ")
	}
	document.write('<tr bgcolor="' + h + '" onmouseover="javascript:style.backgroundColor=\'' + n + "';\" onmouseout=\"javascript:style.backgroundColor='" + a + "';\"><td>" + pAnchorTag + "</td></tr> ")
}
function writeMenu(b, c, g, f, a, d, e) {
	pAnchorTag = addJsessionIdIfRequired('<a href="' + d + "site/olspage.jsp?id=" + b + '&type=category" class="' + e + '">' + c + "</a>");
	document.write('<tr bgcolor="' + g + '" onmouseover="javascript:style.backgroundColor=\'' + f + "';\" onmouseout=\"javascript:style.backgroundColor='" + a + "';\"><td>" + pAnchorTag + "</td></tr> ")
}
function writeMenuEnd() {
	document.write("</table></td></tr></table>");
	if (document.layers) {
		document.write("</layer>")
	} else {
		document.write("</div>")
	}
}
function logout() {
	document.logoutForm.submit()
}
function openContextSensitiveLinkForBottomNav(c, b) {
	var a = b + "&contentId=" + c + "&entryURLID=" + entryURLID + "&entryURLType=" + entryURLType;
	javascript: popUp(a, "Content_Sensitive_Help_Topic", "3", "0")
}
function popup(b, a) {
	prevUrl = b.href;
	parameters = prevUrl.slice(prevUrl.indexOf("?"));
	prevPathname = b.pathname;
	actualUrl = contextRoot + "/" + prevPathname + parameters;
	if (a == "") {
		a = "3"
	}
	popUp(actualUrl, "DeepLink", a, "0")
}
function openDiscographyPopupArtistType(c, a, b) {
	popUp("olspage.jsp?id=" + a + "&ArtistId=" + c + "&type=page&productType=" + b, "Discography", "4", "0")
}
function openOfferDetails(c, b) {
	var a = "olspage.jsp?id=" + b + "&type=page&contentId=" + c;
	javascript: popUp(a, "Offer_Details_Popup", "3", "0")
}
function closeWindow() {
	window.close()
}
function submitOnEnterKeyPress(b, a) {
	if (isEnterKeyPress(b)) {
		a.submit();
		return true
	}
}
function isEnterKeyPress(a) {
	var b = 0;
	if (window.event) {
		b = window.event.keyCode
	} else {
		if (a) {
			b = a.which
		}
	}
	if (b == 13) {
		return true
	} else {
		return false
	}
}
function handleZipCodeEnterKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			document.rosForm.submit();
			return true
		}
	}
}
function handleZipContinue() {
	document.rosForm.submit()
}
function handleSignInEnterKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			document.frmSignIn.submit();
			return true
		}
	}
}
function handleCIDEnterKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			document.frmCidCheck.submit();
			return true
		}
	}
}
function handleCIDCheck() {
	document.frmCidCheck.submit()
}
function changedirection(a, b) {
	document.frmmapcontrol.PV.value = a;
	document.frmmapcontrol.PH.value = b;
	document.frmmapcontrol.submit()
}
function handleQuickStoresEnterKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			document.frmCartQuickStores.submit();
			return true
		}
	}
}
function handleQuickStoresSearchEnterKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			document.frmStoresSearchForm.submit();
			return true
		}
	}
}
function handleProductQuickStoresSearchEnterKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			clearOrderURL();
			document.frmStoresSearchForm.submit();
			return true
		}
	}
}
function clearOrderURL() {
	var b;
	var a;
	clearURLValue(document.getElementById("orderSuccessURL"));
	clearURLValue(document.getElementById("orderErrorURL"));
	b = document.frmStoresSearchForm.listingType.value;
	document.frmStoresSearchForm.listingType.value = b;
	a = document.frmStoresSearchForm.sourceUrl.value;
	document.frmStoresSearchForm.sourceUrl.value = a;
	return true
}
function clearURLValue(b) {
	if (b != null) {
		if (b.length == null) {
			b.value = ""
		} else {
			var a = b.length;
			for (i = 0; i < a; i++) {
				b[i].value = ""
			}
		}
	}
	return true
}
function parseValues() {
	var selString = "";
	for (mainIdx = 0; mainIdx < idx; mainIdx++) {
		bolflg = false;
		if (eval("document.frmOrder.RadShippingAddress" + mainIdx) != null) {
			if (eval("document.frmOrder.RadShippingAddress" + mainIdx).value == null) {
				radcnt = eval("document.frmOrder.RadShippingAddress" + mainIdx).length;
				chk = 0;
				for (subIdx = 0; subIdx < radcnt; subIdx++) {
					if (eval("document.frmOrder.RadShippingAddress" + mainIdx + "[" + subIdx + "]").checked == true) {
						chk = chk + 1;
						if (eval("document.frmOrder.RadShippingAddress" + mainIdx + "[" + subIdx + "]").value == "homeDelivery") {
							selString = selString + "A" + eval("document.frmOrder.drpShippingAddress" + mainIdx).value + ","
						} else {
							selString = selString + "S" + eval("document.frmOrder.RadShippingAddress" + mainIdx + "[" + subIdx + "]").value + ","
						}
					}
				}
				if (chk == 0) {
					selString = selString + "ANoValue,"
				}
			} else {
				if (eval("document.frmOrder.RadShippingAddress" + mainIdx).value == "homeDelivery") {
					selString = selString + "A" + eval("document.frmOrder.drpShippingAddress" + mainIdx).value + ","
				} else {
					selString = selString + "S" + eval("document.frmOrder.RadShippingAddress" + mainIdx).value + ","
				}
			}
		} else {
			selString = selString + "ANoValue,"
		}
	}
	return selString
}
function popupQuick(a) {
	a = a + "&selVal=" + parseValues();
	popUp(a, "newWin", "4", "0")
}
function chkRadio(id) {
	if (eval("document.frmOrder.RadShippingAddress" + id).value == null) {
		radcnt = eval("document.frmOrder.RadShippingAddress" + id).length;
		for (subIdx = 0; subIdx < radcnt; subIdx++) {
			if (eval("document.frmOrder.RadShippingAddress" + id + "[" + subIdx + "]").value == "homeDelivery") {
				eval("document.frmOrder.RadShippingAddress" + id + "[" + subIdx + "]").checked = true
			}
		}
	}
}
function fnMoveItemToWishListPickupPage(a) {
	document.frmWishList.selValues.value = parseValues();
	document.frmWishList.tempItemId.value = a;
	document.frmWishList.callMoveItemsFromCart.value = "true";
	document.frmWishList.submit()
}
function checkRoute(pageCat1, pageCat2) {
	var radcnt = 0;
	var bolflg = true;
	itemarray = new Array();
	for (mainIdx = 0; mainIdx < idx; mainIdx++) {
		if (wrntArray[mainIdx] != "Wrnty") {
			bolflg = false;
			if (eval("document.frmOrder.RadShippingAddress" + mainIdx) != null) {
				if (eval("document.frmOrder.RadShippingAddress" + mainIdx).value == null) {
					radcnt = eval("document.frmOrder.RadShippingAddress" + mainIdx).length;
					for (subIdx = 0; subIdx < radcnt; subIdx++) {
						if (eval("document.frmOrder.RadShippingAddress" + mainIdx + "[" + subIdx + "]").checked == true) {
							bolflg = true
						}
					}
				} else {
					bolflg = eval("document.frmOrder.RadShippingAddress" + mainIdx).checked
				}
			}
			itemarray[mainIdx] = bolflg
		} else {
			itemarray[mainIdx] = true
		}
	}
	bolflg = false;
	asgnIdx = 0;
	for (tmpIdx = 0; tmpIdx < itemarray.length; tmpIdx++) {
		if (itemarray[tmpIdx] == false) {
			asgnIdx = tmpIdx;
			bolflg = true;
			break
		}
	}
	if (bolflg) {
		if (splArray[asgnIdx] == "true") {
			popupAdd(cItemArray[asgnIdx], splArray[asgnIdx], pageCat1)
		} else {
			popupAdd(cItemArray[asgnIdx], splArray[asgnIdx], pageCat2)
		}
	} else {
		document.frmOrder.submit()
	}
}
function popupEdit(index, itemId, pageCatId) {
	val = eval("document.frmOrder.drpShippingAddress" + index).options[eval("document.frmOrder.drpShippingAddress" + index).selectedIndex].value;
	popUp("olspage.jsp?id=" + pageCatId + "&type=page&edit=" + val + "&itemId=" + itemId + "&selVal=" + parseValues(), "newWin", "4", "0")
}
function popupAdd(c, b, a) {
	if (b == "true") {
		popUp("olspage.jsp?id=" + a + "&type=page&itemId=" + c + "&selVal=" + parseValues(), "newWin", "3", "0")
	} else {
		popUp("olspage.jsp?id=" + a + "&type=page&itemId=" + c + "&selVal=" + parseValues(), "newWin", "4", "0")
	}
}
function handlePaymentEnterKeyPress(a) {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			document.frmPaymentInfo.chkFlag.value = a;
			document.frmPaymentInfo.submit();
			return false
		}
	}
}
function handleSubmission(a) {
	document.frmPaymentInfo.chkFlag.value = a;
	document.frmPaymentInfo.submit();
	return false
}
function handleSubmissionNewCust(a) {
	document.paymentform.chkFlag.value = a;
	document.paymentform.submit();
	return false
}
function callCheckCIDNumberPage(a) {
	popUp("olspage.jsp?id=" + a + "&type=page", "Check_CID_Number_Location", "4", "0");
	return
}
function editCardPopup(a) {
	val = document.frmPaymentInfo.drpCreditCard.options[document.frmPaymentInfo.drpCreditCard.selectedIndex].value;
	popUp("olspage.jsp?id=" + a + "&type=page&edit1=" + val, "newWin", "4", "0")
}
function onCreditCardChange() {
	var a = document.paymentform.selCreditCardType.options[document.paymentform.selCreditCardType.selectedIndex].value;
	var b = document.paymentform.existCardType.value;
	if (a == "HRS" || b == "HRS") {
		document.paymentform.submitForm.value = "false";
		document.paymentform.submit()
	}
}
function editShippingAddress(c, d, e, f) {
	var a = document.paymentform.selAddress.options[document.paymentform.selAddress.selectedIndex].value;
	if (a != "") {
		var b = document.paymentform.editShipAddress.value;
		b = b + "&addressId=" + a;
		var b = addJsessionIdIfRequired("olspage.jsp?id=" + c + "&type=page&addressId=" + a + "&sourceId=" + f + "&fn=" + e);
		location.href = b
	} else {
		alert("Please select an address to edit");
		return
	}
}
function setnicknameAddEdit(a) {
	document.frmPaymentAdd.isBilling.value = a;
	document.frmPaymentAdd.submitForm.value = "false";
	document.frmPaymentAdd.submit()
}
function setAction(a) {
	document.shippingmethod.event.value = a;
	document.shippingmethod.submit()
}
function shpChange(b, c) {
	var a = c.name;
	document.shippingmethod.cItem.value = a.substring(3);
	document.shippingmethod.shipMethod.value = c.options[c.selectedIndex].value;
	document.shippingmethod.event.value = b;
	document.shippingmethod.submit()
}
function fnMoveItemToWishListMethPage(a) {
	document.frmWishList.tempItemId.value = a;
	document.frmWishList.callMoveItemsFromCart.value = "true";
	document.frmWishList.submit()
}
function submitOrder() {
	if (!buttonClicked) {
		buttonClicked = true;
		document.frmOrderSubmit.submit();
		if (document.frmOrderSubmit.submitPaymentType.value != "paypal") {
			document.getElementById("pleasewait").style.display = "block";
			document.getElementById("centerwellcontainer").style.display = "none"
		}
	}
	return false
}
function opensurveypage() {
	window.open("https://eval.bizrate.com/popup.pl?id=17474", "thisName", "directories=0,height=160,width=425")
}
function netscapeKeyPressNewCreditCard(a) {
	if (a.which == 13) {
		handleSubmissionNewCust("true")
	}
}
function microsoftKeyPressNewCreditCard() {
	if (window.event.keyCode == 13) {
		handleSubmissionNewCust("true")
	}
}
function deleteAddress() {
	document.frmDelete.submit()
}
function editAddress(a) {
    document.frmEdit.addressId.value = a;
	document.frmEdit.nickname.value = a;
	document.frmEdit.fn.value = "edit";
	document.frmEdit.reDirect.value = true;
	document.frmEdit.submit()
}
function cancelDelete() {
	document.frmRequestCancel.submit()
}
function submitAddFormBusinessAddressCheck(a) {
	document.frmCheckCompanyNameRequired.HdnAddressType.value = a;
	document.frmCheckCompanyNameRequired.HdnNewAddressErrorURL.value = document.frmAddAddress.newAddressErrorURL.value;
	document.frmCheckCompanyNameRequired.HdnAddressName.value = document.frmAddAddress.TxtAddressName.value;
	document.frmCheckCompanyNameRequired.HdnPrefix.value = document.frmAddAddress.DrpPrefix.value;
	document.frmCheckCompanyNameRequired.HdnFirstName.value = document.frmAddAddress.TxtFirstName.value;
	document.frmCheckCompanyNameRequired.HdnMI.value = document.frmAddAddress.TxtMI.value;
	document.frmCheckCompanyNameRequired.HdnLastName.value = document.frmAddAddress.TxtLastName.value;
	document.frmCheckCompanyNameRequired.HdnSuffix.value = document.frmAddAddress.DrpSuffix.value;
	document.frmCheckCompanyNameRequired.HdnCompanyName.value = document.frmAddAddress.TxtCompanyName.value;
	document.frmCheckCompanyNameRequired.HdnAddress1.value = document.frmAddAddress.TxtAddress1.value;
	document.frmCheckCompanyNameRequired.HdnAddress2.value = document.frmAddAddress.TxtAddress2.value;
	document.frmCheckCompanyNameRequired.HdnCity.value = document.frmAddAddress.TxtCity.value;
	document.frmCheckCompanyNameRequired.HdnState.value = document.frmAddAddress.DrpState.value;
	document.frmCheckCompanyNameRequired.HdnZIP.value = document.frmAddAddress.TxtZIP.value;
	document.frmCheckCompanyNameRequired.HdnCountry.value = document.frmAddAddress.DrpCountry.value;
	document.frmCheckCompanyNameRequired.HdnDayPhoneAreaCode.value = document.frmAddAddress.TxtDayPhoneAreaCode.value;
	document.frmCheckCompanyNameRequired.HdnDayPhonePrefix.value = document.frmAddAddress.TxtDayPhonePrefix.value;
	document.frmCheckCompanyNameRequired.HdnDayPhoneSufix.value = document.frmAddAddress.TxtDayPhoneSufix.value;
	document.frmCheckCompanyNameRequired.HdnEvenPhoneAreaCode.value = document.frmAddAddress.TxtEvenPhoneAreaCode.value;
	document.frmCheckCompanyNameRequired.HdnEvenPhonePrefix.value = document.frmAddAddress.TxtEvenPhonePrefix.value;
	document.frmCheckCompanyNameRequired.HdnEvenPhoneSufix.value = document.frmAddAddress.TxtEvenPhoneSufix.value;
	if (document.frmAddAddress.ChkSave.checked == true) {
		document.frmCheckCompanyNameRequired.HdnSave.value = true
	} else {
		document.frmCheckCompanyNameRequired.HdnSave.value = false
	}
	document.frmCheckCompanyNameRequired.submit()
}
function submitEditFormBusinessAddressCheck(a) {
	document.frmCheckCompanyNameRequired.HdnAddressType.value = a;
	document.frmCheckCompanyNameRequired.HdnUpdateAddressErrorURL.value = document.frmUpdateAddress.updateAddressErrorURL.value;
	document.frmCheckCompanyNameRequired.HdnNewNickname.value = document.frmUpdateAddress.TxtAddressName.value;
	document.frmCheckCompanyNameRequired.HdnNickname.value = document.frmUpdateAddress.nick.value;
	document.frmCheckCompanyNameRequired.HdnPrefix.value = document.frmUpdateAddress.DrpPrefix.value;
	document.frmCheckCompanyNameRequired.HdnFirstName.value = document.frmUpdateAddress.TxtFirstName.value;
	document.frmCheckCompanyNameRequired.HdnMI.value = document.frmUpdateAddress.TxtMI.value;
	document.frmCheckCompanyNameRequired.HdnLastName.value = document.frmUpdateAddress.TxtLastName.value;
	document.frmCheckCompanyNameRequired.HdnSuffix.value = document.frmUpdateAddress.Suffix.value;
	document.frmCheckCompanyNameRequired.HdnCompanyName.value = document.frmUpdateAddress.TxtCompanyName.value;
	document.frmCheckCompanyNameRequired.HdnAddress1.value = document.frmUpdateAddress.TxtAddress1.value;
	document.frmCheckCompanyNameRequired.HdnAddress2.value = document.frmUpdateAddress.TxtAddress2.value;
	document.frmCheckCompanyNameRequired.HdnCity.value = document.frmUpdateAddress.TxtCity.value;
	document.frmCheckCompanyNameRequired.HdnState.value = document.frmUpdateAddress.DrpState.value;
	document.frmCheckCompanyNameRequired.HdnZIP.value = document.frmUpdateAddress.TxtZIP.value;
	document.frmCheckCompanyNameRequired.HdnCountry.value = document.frmUpdateAddress.DrpCountry.value;
	document.frmCheckCompanyNameRequired.HdnDayPhoneAreaCode.value = document.frmUpdateAddress.TxtDayPhoneAreaCode.value;
	document.frmCheckCompanyNameRequired.HdnDayPhonePrefix.value = document.frmUpdateAddress.TxtDayPhonePrefix.value;
	document.frmCheckCompanyNameRequired.HdnDayPhoneSufix.value = document.frmUpdateAddress.TxtDayPhoneSufix.value;
	document.frmCheckCompanyNameRequired.HdnEvenPhoneAreaCode.value = document.frmUpdateAddress.TxtEvenPhoneAreaCode.value;
	document.frmCheckCompanyNameRequired.HdnEvenPhonePrefix.value = document.frmUpdateAddress.TxtEvenPhonePrefix.value;
	document.frmCheckCompanyNameRequired.HdnEvenPhoneSufix.value = document.frmUpdateAddress.TxtEvenPhoneSufix.value;
	if (document.frmUpdateAddress.ChkSave.checked == true) {
		document.frmCheckCompanyNameRequired.HdnSave.value = true
	} else {
		document.frmCheckCompanyNameRequired.HdnSave.value = false
	}
	document.frmCheckCompanyNameRequired.submit()
}
function cancelRequest() {
	window.opener.document.frmCancelLast.submit();
	window.close()
}
function checkCardType(b) {
	var a = document.frmAddress.selCreditCardType.value;
	var c = b.creditCardType.options[b.creditCardType.selectedIndex].value;
	document.frmAddress.selCreditCardType.value = b.creditCardType.options[b.creditCardType.selectedIndex].value;
	document.frmAddress.selAddress.value = b.selAddress.options[b.selAddress.selectedIndex].value;
	document.frmAddress.creditCardNumber.value = b.TxtCardNumber.value;

	if (a != "HRS") {
		document.frmAddress.expirationMonth.value = b.DrpExpMonth.options[b.DrpExpMonth.selectedIndex].value;
		document.frmAddress.expirationYear.value = b.DrpExpYear.options[b.DrpExpYear.selectedIndex].value
	}
	if (a == "HRS") {
		document.frmAddress.submit()
	}
	if (c == "HRS") {
		document.frmAddress.submit()
	}
}
function selectAddress(b) {
	var a = document.frmAddress.selCreditCardType.value;
	var c = b.creditCardType.options[b.creditCardType.selectedIndex].value;
	document.frmAddress.selCreditCardType.value = b.creditCardType.options[b.creditCardType.selectedIndex].value;
	document.frmAddress.selAddress.value = b.selAddress.options[b.selAddress.selectedIndex].value;
	document.frmAddress.creditCardNumber.value = b.TxtCardNumber.value;

	if (a != "HRS") {
		document.frmAddress.expirationMonth.value = b.DrpExpMonth.options[b.DrpExpMonth.selectedIndex].value;
		document.frmAddress.expirationYear.value = b.DrpExpYear.options[b.DrpExpYear.selectedIndex].value
	}
	document.frmAddress.submit()
}
function populate() {
	var a = document.frmCreateAccountExplicit.TxtPostalCode.value;
	document.frmCreateAccountExplicit.TxtShipPostalCode.value = a;
	document.frmCreateAccountExplicit.TxtBillPostalCode.value = a;
	document.frmCreateAccountExplicit.submit();
	return true
}
function setPrimaryCreditCard(id) {
	document.setPrimaryCreditCardForm.creditCardId.value = id;
	document.setPrimaryCreditCardForm.submit()
}
function editMyAccountCreditCard(a) {
	document.editCardFrm.editCreditCardId.value = a;
	document.editCardFrm.fn.value = "edit";
	document.editCardFrm.submit()
}
function removeMyAccountCreditCard(a) {
	document.frmRemoveCCard.creditCardId.value = a;
	document.frmRemoveCCard.submit()
}
function fnAddToCartFromWishlist(productid, skuid, pGiftlistId, pGiftlistItemId, formCount) {
	var frmObj = eval("document.frmAddToCart" + formCount);
	frmObj.productId.value = productid;
	frmObj.tempCatalogRefId.value = skuid;
	frmObj.giftlistItemId.value = pGiftlistItemId;
	frmObj.giftlistId.value = pGiftlistId;
	frmObj.addFromCart.value = "true";
	frmObj.submit()
}
function fnAddToCartFromPrivatelist(b, d, a, c) {
	document.frmAddToCart.productId.value = b;
	document.frmAddToCart.tempCatalogRefId.value = d;
	document.frmAddToCart.giftlistItemId.value = c;
	document.frmAddToCart.giftlistId.value = a;
	document.frmAddToCart.addFromPrivatelist.value = "true";
	document.frmAddToCart.submit()
}
function navigate(a, b) {
	document.frmNavigate.currentPage.value = a;
	document.frmNavigate.startIndex.value = b;
	document.frmNavigate.submit()
}
function submitChangePrimary(a) {
    document.changePrimary.addressId.value=a;
	document.changePrimary.nickname.value = a;
	document.changePrimary.submit()
}
function canDeleteAddress1(a) {
    document.frmCanDelete.addressId.value = a;
	document.frmCanDelete.nickname.value = a;
	document.frmCanDelete.submit()
}
function submitSortValue() {
	if (document.frmAddresslist.DrpSortOrder.value != "") {
		document.frmAddresslist.submit()
	}
}
function submitIndex() {
	document.frmSearchOrder.TxtOrderNo.value = trim(document.frmSearchOrder.TxtOrderNo.value);
	document.frmSearchOrderDetail.orderId.value = document.frmSearchOrder.TxtOrderNo.value;
	document.frmSearchOrderDetail.submit()
}
function handleEnterKeyPressInViewOrders() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			submitIndex();
			return false
		}
	}
}
function openReceiptPage(d, b, c, a) {
	popUp("olspage.jsp?id=" + d + "&type=page&orderDate=" + c + "&orderId=" + b + "&guestUser=" + a, "OrderReceipt", "4", "0")
}
function handleEnterKeyPressInMyAccount(a) {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			a.submit();
			return false
		}
	}
}
function handleKeyCode() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			populate();
			return true
		}
	}
}
function handleCreateEnterKeyPress() {
	handleKeyCode()
}
function mapanddirections1(e, l, k, h, g, m, c, f) {
	var b = l + "+" + k;
	b = b.replace(" ", "+");
	var n = h.replace(" ", "+");
	var d = g.replace(" ", "+");
	var a = m.replace(" ", "+");
	javascript: popUp("olspage.jsp?id=" + f + "&type=page&allstores=no&mode=fromProfile&storeId=" + e + "&storeAddress=" + b + "&storeCity=" + n + "&storeState=" + d + "&storeZip=" + a + "&ozipcode=" + c, "MapAndDirections", "4", "0")
}
function mapanddirections1FromMyAccount(e, m, l, k, g, o, c, f, n) {
	var b = m + "+" + l;
	b = b.replace(" ", "+");
	var p = k.replace(" ", "+");
	var d = g.replace(" ", "+");
	var a = o.replace(" ", "+");
	var h = "?";
	if (n.indexOf("?") != -1) {
		h = "&"
	}
	javascript: popUp(n + h + "id=" + f + "&type=page&allstores=no&mode=fromProfile&storeId=" + e + "&storeAddress=" + b + "&storeCity=" + p + "&storeState=" + d + "&storeZip=" + a + "&ozipcode=" + c, "MapAndDirections", "4", "0")
}
function popupredirection(c, d, b, a) {
	checknextlocation(d);
	if (c == "yes") {
		popUp("olspage.jsp?id=" + b + "&type=page&storeId=" + a, "updatealert", 3, 0)
	}
}
function checknextlocation(a) {
	if (a == "accessed") {
		window.history.forward(1)
	}
}
function openWeeklyAd(b, a) {
	var c = b + "?zipcode=" + a;
	popUpRawURL(c, "thirdPartyWindow", 4, "0")
}
function submitLevel(a) {
	document.frmmapcontrol.LV.value = a;
	document.frmmapcontrol.submit()
}
function goBack(a, b) {
	if (a == "ok") {
		window.location.href = addJsessionIdIfRequired("olspage.jsp?id=" + b + "&type=page")
	} else {
		window.close()
	}
}
function mapall(a) {
	javascript: popUp("olspage.jsp?id=" + a + "&type=page&allstores=yes", "MapAll", "4", "0")
}
function mapanddirection(b, a) {
	window.open(addJsessionIdIfRequired("olspage.jsp?id=" + a + "&type=page&allstores=no&mode=fromResult&storeId=" + b), "MapAndDirections", "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=550,height=450,left=50,top=200")
}
function submitpreferredstoredelete(b, a) {
	if (b == "yes") {
		window.opener.location.reload();
		window.opener.location.href = addJsessionIdIfRequired("olspage.jsp?id=" + a + "&type=page");
		window.close()
	}
}
function redirecttomyaccount(a) {
	window.opener.location.href = addJsessionIdIfRequired(a);
	window.close()
}
function titleCase(d) {
	d = d.toLowerCase();
	var c = "";
	var b = "";
	var a = d.split(" ");
	for (i = 0; i < a.length; i++) {
		if (i > 0) {
			c += " "
		}
		if (a[i].length > 0) {
			if (a[i].length == 2) {
				b = a[i].substr(0).toUpperCase();
				if (b == "AL" || b == "AK" || b == "AS" || b == "AZ" || b == "AR" || b == "CA" || b == "CO" || b == "CT" || b == "DE" || b == "DC" || b == "FM" || b == "FL" || b == "GA" || b == "GU" || b == "HI" || b == "ID" || b == "IL" || b == "IN" || b == "IA" || b == "KS" || b == "KY" || b == "LA" || b == "ME" || b == "MH" || b == "MD" || b == "MA" || b == "MI" || b == "MN" || b == "MS" || b == "MO" || b == "MT" || b == "NE" || b == "NV" || b == "NH" || b == "NJ" || b == "NM" || b == "NY" || b == "NC" || b == "ND" || b == "MP" || b == "OH" || b == "OK" || b == "OR" || b == "PW" || b == "PA" || b == "PR" || b == "RI" || b == "SC" || b == "SD" || b == "TN" || b == "TX" || b == "UT" || b == "VT" || b == "VI" || b == "VA" || b == "WA" || b == "WV" || b == "WI" || b == "WY" || b == "AE" || b == "AA" || b == "AE" || b == "AP") {
					c += b.toUpperCase()
				} else {
					c += a[i].charAt(0).toUpperCase() + a[i].substr(1)
				}
			} else {
				b = a[i].substr(0);
				if (b.charAt(0) == "(") {
					c += a[i].charAt(0);
					c += a[i].charAt(1).toUpperCase() + a[i].substr(2)
				} else {
					c += a[i].charAt(0).toUpperCase() + a[i].substr(1)
				}
			}
		}
	}
	document.write(c)
}
function openArtistBioPopup(b, a) {
	popUp("olspage.jsp?id=" + a + "&biographyId=" + b + "&type=page", "Biography", "3", "0")
}
function openDiscographyPopupFromMyAccount(b, a, c) {
	popUp(b + "?id=" + a + "&type=page&ArtistId=" + c, "Discography", "4", "0")
}
function frmComparePriceLink(d, b, c, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&skuId=" + d + "&productId=" + b + "&categoryId=" + c + "&pageIdentity=businessDriven", "ProductCompare", "6", "0")
}
function fnPopShippingDetails(b, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&skuId=" + b, "ShippingDetails", "4", "0")
}
function fnPopSFSShippingDetails(b, a, c, d) {
	popUp("olspage.jsp?id=" + a + "&type=page&skuId=" + b + "&sellerId=" + c + "&listingId=" + d, "ShippingDetails", "4", "0")
}
function fnPopInstorePick(b, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&skuId=" + b, "CheckDeliveryInCart", "2", "0")
}
function fnPopCheckDelivery(b, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&skuId=" + b, "CheckDelivery", "3", "0")
}
function Show(name) {
	if (is_nav6up) {
		eval('document.getElementById("' + name + "\").style.visibility='visible'")
	} else {
		if (is_nav4up) {
			eval("document." + name + ".visibility='show'")
		} else {
			eval("document.all." + name + ".style.visibility='visible';");
			if (is_ie5up) {
				hideAllDiv()
			}
		}
	}
}
function Hide(name) {
	if (is_nav6up) {
		eval('document.getElementById("' + name + "\").style.visibility='hidden'")
	} else {
		if (is_nav4up) {
			eval("document." + name + ".visibility='hide'")
		} else {
			eval("document.all." + name + ".style.visibility='hidden'");
			if (is_ie5up) {
				showAllDiv()
			}
		}
	}
}
function onSubmitOrderCardChange() {
	document.frmOrderSubmit.chkFlag.value = "cardChange";
	document.frmOrderSubmit.submit()
}
function editCreditCard(b, c, d) {
	val = document.frmOrderSubmit.drpCreditCard.options[document.frmOrderSubmit.drpCreditCard.selectedIndex].value;
	var a = addJsessionIdIfRequired("olspage.jsp?id=" + b + "&type=page&edit1=" + val + "&fn=" + d);
	location.href = a
}
function handleSubmitOrderRemoveRz(a) {
	document.frmOrderSubmit.chkFlag.value = a;
	document.frmOrderSubmit.submit()
}
function handleSubmitOrderRemoveRwzCert(a, b) {
	document.frmOrderSubmit.chkFlag.value = a;
	document.frmOrderSubmit.TxtRemoveRwzCertNum.value = b;
	document.frmOrderSubmit.submit()
}
function checkoutAddAddress(a) {
	document.frmAssignAddress.txtShipGroupId.value = a;
	document.frmAssignAddress.addrEvent.value = "addAddr";
	document.frmAssignAddress.submit()
}
function handleSubmitOrderRemoveDigitalCoupon(a, c, b) {
	document.frmOrderSubmit.chkFlag.value = a;
	document.frmOrderSubmit.TxtRemovalDigitalDiscountId.value = c;
	document.frmOrderSubmit.TxtDigitalDiscountType.value = b;
	document.frmOrderSubmit.submit()
}
function handlePromotionApplyDD(a) {
	document.frmChkPromoOffers.chkFlag.value = a;
	document.frmChkPromoOffers.submit()
}
function handlePromotionRemoveDD(a, c, b) {
	document.frmChkPromoOffers.chkFlag.value = a;
	document.frmChkPromoOffers.promoCode.value = c;
	document.frmChkPromoOffers.promoType.value = b;
	document.frmChkPromoOffers.submit()
}
function fnAddItemToCartWithAccessories(c, a) {
	var b = "";
	var f = "";
	var e;
	if (c != null) {
		f = c + "^"
	}
	if (a != null) {
		b = a + "^"
	}
	for (var d = 0; d < document.frmCart.elements.length; d++) {
		if (document.frmCart.elements[d].type == "checkbox" && document.frmCart.elements[d].name.indexOf("accessory") != -1) {
			if (document.frmCart.elements[d].checked == "1") {
				e = document.frmCart.elements[d].value;
				f = f + e.substr(0, e.indexOf(",")) + "^";
				b = b + e.substr(e.indexOf(",") + 1, e.length) + "^"
			}
		}
	}
	b = b.substr(0, b.length - 1);
	f = f.substr(0, f.length - 1);
	document.frmCart.skuIds.value = b;
	document.frmCart.productIds.value = f;
	document.frmCart.submit()
}
function handleAddSVC(a) {
	document.frmSVCAdd.chkFlag.value = a;
	document.frmSVCAdd.submit()
}
function handleSVCRemoveSubmission(b, a) {
	document.frmSVCAdd.chkFlag.value = b;
	document.frmSVCAdd.paymentGrpId.value = a;
	document.frmSVCAdd.submit();
	return false
}
function handleRWZRemoveSubmission(b, a) {
	document.frmRWZAdd.chkFlag.value = b;
	document.frmRWZAdd.paymentGrpId.value = a;
	document.frmRWZAdd.submit();
	return false
}
function handleRemoveSubmission(b, a) {
	document.frmPaymentInfo.chkFlag.value = b;
	document.frmPaymentInfo.paymentGrpId.value = a;
	document.frmPaymentInfo.submit();
	return false
}
function handleRemoveSubmissionNewCust(b, a) {
	document.paymentform.chkFlag.value = b;
	document.paymentform.paymentGrpId.value = a;
	document.paymentform.submit();
	return false
}
function handleSubmitOrderRemoveSVC(b, a) {
	document.frmOrderSubmit.chkFlag.value = b;
	document.frmOrderSubmit.paymentGrpId.value = a;
	document.frmOrderSubmit.submit();
	return false
}
function handleSubmitOrderUpdateFinPlan() {
	document.frmOrderSubmit.chkFlag.value = "updateFinPlan";
	document.frmOrderSubmit.submit();
	return false
}
function handleAddRWZ(a) {
	document.frmRWZAdd.chkFlag.value = a;
	document.frmRWZAdd.submit()
}
function redirectPage(b) {
	var a = document.getElementById("yourcard").value;
	if (a == "Stop Accepting Contributions") {
		document.getElementById("stopContribute").disabled = false;
		if (b == "mylistForm") {
			document.mylistForm["/bestbuy/digiterra/userprofiling/ProfileAddressFormHandler.updatePitchIn"].value = "submit";
			document.mylistForm.submit()
		} else {
			document.recipientViewForm["/bestbuy/digiterra/userprofiling/ProfileAddressFormHandler.updatePitchIn"].value = "submit";
			document.recipientViewForm.submit()
		}
	} else {
		if (a == "Accept Contributions") {
			document.getElementById("stopContribute").disabled = false;
			if (b == "mylistForm") {
				document.mylistForm["/bestbuy/digiterra/userprofiling/ProfileAddressFormHandler.updatePitchIn"].value = "submit";
				document.mylistForm.submit()
			} else {
				document.recipientViewForm["/bestbuy/digiterra/userprofiling/ProfileAddressFormHandler.updatePitchIn"].value = "submit";
				document.recipientViewForm.submit()
			}
		} else {
			if (a == "View Account Summary") {
				if (b == "mylistForm") {
					window.location.href = document.getElementById("viewAccount").value
				} else {
					window.location.href = document.getElementById("viewAccount").value
				}
			} else {
				if (a == "") {
					document.getElementById("ErrorBlock").style.display = "block";
					document.getElementById("checkID").innerHTML = "Please select an action."
				} else {
					window.open(a, "_top")
				}
			}
		}
	}
}
function acceptContribute(a) {
	document.getElementById("stopContribute").disabled = false;
	if (a == "mylistForm") {
		document.mylistForm["/bestbuy/digiterra/userprofiling/ProfileAddressFormHandler.updatePitchIn"].value = "submit";
		document.mylistForm.submit()
	} else {
		document.recipientViewForm["/bestbuy/digiterra/userprofiling/ProfileAddressFormHandler.updatePitchIn"].value = "submit";
		document.recipientViewForm.submit()
	}
}
function fnAddToCartForGiverViewForPitchin(d, c, f, b, e, a) {
	if (d == "mylistForm") {
		document.mylistForm.productId.value = c;
		document.mylistForm.tempCatalogRefId.value = f;
		document.mylistForm.giftlistItemId.value = e;
		document.mylistForm.giftlistId.value = b;
		document.mylistForm["/atg/commerce/order/ShoppingCartModifier.pitchInAcctId"].value = a;
		document.mylistForm["/atg/commerce/order/ShoppingCartModifier.pitchIn"].value = true;
		document.mylistForm.addFromCart.value = "true";
		document.getElementById("iAddToCart").disabled = false;
		document.mylistForm["/atg/commerce/order/ShoppingCartModifier.addGiftItemToOrder"].value = "submit";
		document.mylistForm.submit()
	} else {
		document.recipientViewForm.productId.value = c;
		document.recipientViewForm.tempCatalogRefId.value = f;
		document.recipientViewForm.giftlistItemId.value = e;
		document.recipientViewForm.giftlistId.value = b;
		document.recipientViewForm["/atg/commerce/order/ShoppingCartModifier.pitchInAcctId"].value = a;
		document.recipientViewForm["/atg/commerce/order/ShoppingCartModifier.pitchIn"].value = true;
		document.recipientViewForm.addFromCart.value = "true";
		document.getElementById("iAddToCart").disabled = false;
		document.recipientViewForm["/atg/commerce/order/ShoppingCartModifier.addGiftItemToOrder"].value = "submit";
		document.recipientViewForm.submit()
	}
}
function handleDeleteGiftlist(a) {
	document.mylistForm.pGiftlistId.value = a;
	document.getElementById("iRemove").disabled = false;
	document.mylistForm["/atg/commerce/gifts/GiftlistFormHandler.removeGiftlist"].value = "submit";
	document.mylistForm.submit()
}
function populateAddress(a) {
	document.giftlistUpdateForm.nickname.value = a;
	document.getElementById("editAddress").disabled = false;
	document.giftlistUpdateForm["/bby/commerce/gifts/BBYProfilePitchInGiftListFormHandler.editAddress"].value = "submit";
	document.giftlistUpdateForm.submit()
}
function handleEnterKeyForContribution(k, o, n, g, d, b, h, a) {
	var c = (k.type.toLowerCase().indexOf("key") != -1) ? k.keyCode || k.which : 0;
	var f = navigator.appVersion;
	var m = f.indexOf("Safari");
	var l = f.indexOf("Apple");
	if (c == 13 || (c == 3 && m > 0 && l > 0)) {
		o(n, g, d, b, h, a);
		return false
	} else {
		return true
	}
}
function fnAddToCartFromPrivatelistCart(b, d, a, c) {
	document.frmMiniCart.productId.value = b;
	document.frmMiniCart.tempCatalogRefId.value = d;
	document.frmMiniCart.giftlistItemId.value = c;
	document.frmMiniCart.giftlistId.value = a;
	document.frmMiniCart.addFromPrivatelist.value = "true";
	document.frmMiniCart.submit()
}
function netscapeKeyPress(a) {
	if (a.which == 13) {
		fnCheckout()
	}
}
function microsoftKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.srcElement.name != "st" && window.event.srcElement.name != "goButton") {
			if (window.event.keyCode == 13) {
				fnCheckout()
			}
		}
	} else {
		if (navigator.appName == "Netscape") {
			if (arguments.callee.caller.arguments[0].target.name != "st" && arguments.callee.caller.arguments[0].target.name != "goButton") {
				if (arguments.callee.caller.arguments[0].which == 13) {
					fnCheckout()
				}
			}
		}
	}
}
if (navigator.appName == "Netscape") {
	window.onKeyPress = netscapeKeyPress
}
function fnCheckout() {
	document.frmCart.ischeckout.value = "true";
	document.frmCart.submit()
}
function fnUpdate() {
	document.frmCart.ischeckout.value = "false";
	document.frmCart.addFromCart.value = "false";
	document.frmCart.submit()
}
function setRemoveId(a) {
	document.frmRemoveItem.removalIds.value = a;
	document.frmRemoveItem.submit()
}
function fnAddToCartItem(a, b) {
	document.frmCart.productId.value = a;
	document.frmCart.tempCatalogRefId.value = b;
	document.frmCart.addFromCart.value = "true";
	document.frmCart.submit()
}
function fnMoveItemToWishListCart() {
	document.frmWishList.callMoveItemsFromCart.value = "true";
	document.frmWishList.submit()
}
function checkMessageAvailability() {
	parent.window.opener.location.reload();
	window.close()
}
function handleEnterKeyPressCart(a) {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			a.submit()
		}
	}
}
function doSubmit(b, c) {
	var a = b[b.selectedIndex].value;
	document.frmShipping.shipMethod.value = a;
	document.frmShipping.shipId.value = c;
	if (a != "") {
		document.frmShipping.action = document.frmShipping.tAction.value;
		document.frmShipping.onChangeSubmit.value = "true";
		document.frmShipping.submit()
	}
}
function checkStoreSelection() {
	if (document.frmInStorePickup.RadStore == null) {
		window.close();
		return false
	}
	return
}
function checkRadio() {
	if (document.frmInStorePickup != null && document.frmInStorePickup.RadStore != null) {
		if (document.frmInStorePickup.RadStore.value != null && document.frmInStorePickup.RadStore.checked == false) {
			document.frmInStorePickup.RadStore.checked = true
		} else {
			if (document.frmInStorePickup.RadStore.value == null && document.frmInStorePickup.RadStore.length > 1) {
				var len = document.frmInStorePickup.RadStore.length;
				var flag = false;
				for (var idx = 0; idx < len; idx++) {
					if (eval("document.frmInStorePickup.RadStore[" + idx + "]").checked == true) {
						flag = true;
						break
					}
				}
				if (flag == false) {
					document.frmInStorePickup.RadStore[0].checked = true
				}
			}
		}
	}
}
function fnAddAccToCart(a, b) {
	document.frmAccessoriesContent.productId.value = a;
	document.frmAccessoriesContent.tempCatalogRefId.value = b;
	document.frmAccessoriesContent.addFromCart.value = "true";
	document.frmAccessoriesContent.submit()
}
function displayProdFriendlyDetail(a) {
	parent.window.opener.location.href = a;
	window.close()
}
function displayProdDetail(a, b) {
	parent.window.opener.location.href = addJsessionIdIfRequired("olspage.jsp?id=" + a + "&type=product&productCategoryId=" + b);
	window.close()
}
function fnPopCheckDeliveryCart(b, c, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&commerceItemId=" + b + "&itemId=" + c, "CheckDeliveryInCart", "3", "0")
}
function fnPopShippingDetailsCart(a) {
	popUp("olspage.jsp?id=" + a + "&type=page", "ShippingDetails", "4", "0")
}
function fnPopInstorePickCart(b, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&commerceItemId=" + b, "StorePickup", "2", "0")
}
function fnMoreAccessory(a, b) {
	popUp("olspage.jsp?id=" + b + "&type=page&commerceItemId=" + a, "CheckDeliveryInCart", "4", "0")
}
function fnchooseStateAccessory(d, c, a, b) {
	javascript: popUp("olspage.jsp?id=" + b + "&type=page&pspPrdId=" + d + "&pspSkuId=" + c + "&cItemId=" + a, "PSP", "4", "0")
}
function checkAddToCart() {
	var len = document.frmAccessoriesContent.addToCart.length;
	var chkFlag = false;
	for (var idx = 0; idx < len; idx++) {
		if (eval("document.frmAccessoriesContent.addToCart[" + idx + "].checked") == true) {
			chkFlag = true
		}
	}
	if (chkFlag == false) {
		alert("Please select a item");
		return false
	}
	return true
}
function changeSelectedCategory() {
	document.searchResultsForm.currentPageHidden.value = 1;
	document.searchResultsForm.sortOptionHidden.value = "Relevance";
	document.searchResultsForm.selectedCategoryHidden.value = document.searchResultsForm.ResultsFound[document.searchResultsForm.ResultsFound.selectedIndex].value;
	document.searchResultsForm.submit()
}
function changeSelectedCategorySecond() {
	document.searchResultsForm.currentPageHidden.value = 1;
	document.searchResultsForm.sortOptionHidden.value = "Relevance";
	document.searchResultsForm.selectedCategoryHidden.value = document.searchResultsForm.ResultsFoundSecond[document.searchResultsForm.ResultsFoundSecond.selectedIndex].value;
	document.searchResultsForm.submit()
}
function initiateNewSearch(a) {
	document.searchResultsForm.sortOptionHidden.value = "Relevance";
	document.searchResultsForm.currentPageHidden.value = 1;
	document.searchResultsForm.itemsPerPageHidden.value = 10;
	document.searchResultsForm.selectedCategoryHidden.value = "Electronics";
	document.searchResultsForm.queryStringHidden.value = a
}
var canSearch = true;
function checkForEmptyFieldHelpSearch(a) {
	if (searchButtonClicked) {
		return false
	} else {
		searchButtonClicked = true
	}
	var b = a.TxtSearch.value;
	b = trim(b);
	if (b == "") {
		alert("Please enter a word(s) to search for");
		a.TxtSearch.value = "";
		a.TxtSearch.focus();
		searchButtonClicked = false;
		return false
	}
}
function handleEnterKeyPressHelpSearch(a) {
	var b = a.TxtSearch.value;
	b = trim(b);
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			if (searchButtonClicked) {
				return false
			} else {
				searchButtonClicked = true
			}
			if (b == "") {
				alert("Please enter a word(s) to search for");
				a.TxtSearch.value = "";
				a.TxtSearch.focus();
				searchButtonClicked = false;
				return false
			} else {
				a.submit()
			}
		}
	}
	if (navigator.appName == "Netscape") {
		canSearch = true;
		if (arguments.callee.caller.arguments[0].which == 13) {
			if (searchButtonClicked) {
				return false
			} else {
				searchButtonClicked = true
			}
			if (b == "") {
				alert("Please enter a word(s) to search for");
				a.TxtSearch.value = "";
				a.TxtSearch.focus();
				searchButtonClicked = false;
				canSearch = false;
				return false
			} else {
				a.submit()
			}
		}
	}
}
function setWindowTitle() {
	this.document.title = window.document.title
}
function returnToParent(b, a) {
	window.opener.location.href = addJsessionIdIfRequired("olspage.jsp?id=" + a + "&type=page&categoryId=" + b);
	self.close()
}
function onChangeSubmitSubTopic() {
	var a = document.frmContactusForm.subTopics.options.selectedIndex;
	document.frmContactusForm.subTopicVal.value = document.frmContactusForm.subTopics.options[a].value;
	document.frmContactusForm.specTopicVal.value = "";
	submitTestForm()
}
function onChangeSubmitSpecTopic() {
	var a = document.frmContactusForm.spTopics.options.selectedIndex;
	document.frmContactusForm.specTopicVal.value = document.frmContactusForm.spTopics.options[a].value;
	submitTestForm()
}
function submitMailForm() {
	if (document.frmContactusForm.subTopicValFlg.value == "true") {
		var a = document.frmContactusForm.subTopics.options.selectedIndex;
		document.frmContactusForm.subTopicVal.value = document.frmContactusForm.subTopics.options[a].value;
		document.frmContactusForm.subTopicTxt.value = document.frmContactusForm.subTopics.options[a].text
	}
	if (document.frmContactusForm.specTopicValFlg.value == "true") {
		var a = document.frmContactusForm.spTopics.options.selectedIndex;
		document.frmContactusForm.specTopicVal.value = document.frmContactusForm.spTopics.options[a].value;
		document.frmContactusForm.specTopicTxt.value = document.frmContactusForm.spTopics.options[a].text
	}
	submitTestForm()
}
function submitTestForm() {
	document.testForm.store.value = document.frmContactusForm.storeType.value;
	document.testForm.subTopicFlg.value = document.frmContactusForm.subTopicFlg.value;
	document.testForm.specTopicFlg.value = document.frmContactusForm.specTopicFlg.value;
	document.testForm.subTopicVal.value = document.frmContactusForm.subTopicVal.value;
	document.testForm.specTopicVal.value = document.frmContactusForm.specTopicVal.value;
	document.testForm.subTopicTxt.value = document.frmContactusForm.subTopicTxt.value;
	document.testForm.specTopicTxt.value = document.frmContactusForm.specTopicTxt.value;
	document.testForm.submit()
}
function winopenhelpfaq(b, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&faqID=" + b, "FAQ", "4", "0")
}
function handleStoreEnterKeyPress(a) {
	var b = document.frmStoreLocatorSearch.TxtStoreLocatorZipCode.value;
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			document.frmStoreLocatorSearch.submit();
			return true
		}
	}
}
function submitContactUsForm() {
	document.frmContactusForm.submit()
}
function validate() {
	var a = document.frmSignIn.TxtEmail.value;
	document.temp.TxtEmail.value = a;
	document.temp.submit()
}
function populateKiosk() {
	var a = document.frmCreateAccountKiosk.TxtZipCode.value;
	document.frmCreateAccountKiosk.TxtShipPostalCode.value = a;
	document.frmCreateAccountKiosk.TxtBillPostalCode.value = a;
	document.frmCreateAccountKiosk.submit();
	return true
}
function loadCartPage() {
	if (retParam == "any") {
		focusParent()
	} else {
		parent.window.opener.location.href = addJsessionIdIfRequired(url);
		self.close()
	}
}
function submitMainForm() {
	document.frmSignIn.submit()
}
function handleSignInEnterKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			submitMainForm();
			return true
		}
	}
}
function handleCreateKioskEnterKeyPress() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (window.event.keyCode == 13) {
			populateKiosk();
			return true
		}
	}
}
function frmCartSubmit() {
	var a = "";
	var d = "";
	var c;
	for (var b = 0; b < document.frmCart.elements.length; b++) {
		if (document.frmCart.elements[b].type == "checkbox") {
			if (document.frmCart.elements[b].checked == "1") {
				c = document.frmCart.elements[b].value;
				d = d + c.substr(0, c.indexOf(",")) + "^";
				a = a + c.substr(c.indexOf(",") + 1, c.length) + "^"
			}
		}
	}
	a = a.substr(0, a.length - 1);
	d = d.substr(0, d.length - 1);
	document.frmPromoCart.skuIds.value = a;
	document.frmPromoCart.productIds.value = d;
	document.frmPromoCart.submit()
}
function loadWindow(c, b) {
	var a = addJsessionIdIfRequired(c + b);
	if (opener && !opener.closed) {
		parent.window.opener.location.href = a
	} else {
		var d = window.open(a);
		opener = d
	}
	window.close()
}
function setFilterValue(a) {
	var b = a[a.selectedIndex].value;
	if (b == "ALL") {
		document.frmOption.isChildRootLookUp.value = "true";
		document.frmOption.selectedComboVal.value = "ALL";
		document.frmOption.filterSubmit.value = "";
		document.frmOption.submit()
	} else {
		if (b == "NOTALL") {
			document.frmOption.isChildRootLookUp.value = "false";
			document.frmOption.selectedComboVal.value = "NOTALL";
			document.frmOption.filterSubmit.value = "";
			document.frmOption.submit()
		} else {
			document.frmNext.isChildRootLookUp.value = "true";
			document.frmNext.subCategoryId.value = a[a.selectedIndex].value;
			document.frmNext.selectedComboVal.value = a[a.selectedIndex].value;
			document.frmNext.filterSubmit.value = "";
			document.frmNext.submit()
		}
	}
}
function setAlphaFilterValue(a) {
	document.frmNext.alphaFilterHidden.value = a[a.selectedIndex].value;
	document.frmNext.submit()
}
function setGenreFilterValue(a) {
	document.frmNext.genreFilterHidden.value = a[a.selectedIndex].value;
	document.frmNext.submit()
}
function setEsrbFilterValue(a) {
	document.frmNext.esrbFilterHidden.value = a[a.selectedIndex].value;
	document.frmNext.submit()
}
function setPlatformFilterValue(a) {
	document.frmNext.platfromFilterHidden.value = a[a.selectedIndex].value;
	document.frmNext.submit()
}
function setMpaaFilterValue(a) {
	document.frmNext.mpaaFilterHidden.value = a[a.selectedIndex].value;
	document.frmNext.submit()
}
function setAmgFilterValue(a) {
	document.frmNext.amgFilterHidden.value = a[a.selectedIndex].value;
	document.frmNext.submit()
}
function setParentalFilterValue(a) {
	document.frmNext.parentalFilterHidden.value = a[a.selectedIndex].value;
	document.frmNext.submit()
}
function loadProductPage(c, b) {
	var a = addJsessionIdIfRequired("olspage.jsp?type=" + c + "&id=" + b);
	if (opener && !opener.closed) {
		parent.window.opener.location.href = a
	} else {
		var d = window.open(a);
		opener = d
	}
	window.close()
}
function focusParent() {
	parent.window.opener.focus();
	self.close()
}
function fnPopDownloadMedia(a, b, c) {
	popUp("olspage.jsp?id=" + b + "&type=page&productId=" + c + "&mediaType=" + a, "Digital_Media_Download", "4", "0")
}
function fnMoveItemToWishList(a, b) {
	document.frmAddItemToWishList.productId.value = a;
	document.frmAddItemToWishList.tempCatalogRefId.value = b;
	document.frmAddItemToWishList.id.value = a;
	document.frmAddItemToWishList.redirectURL.value = document.frmAddItemToWishList.redirectURL.value + "&privateListProductId=" + a + "&privateListSkuId=" + b;
	document.frmAddItemToWishList.submit()
}
function fnProductView(f, d, e, c, b, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&skuId=" + d + "&productId=" + f + "&defurl=" + e + "&count=" + c + "&total=" + b, "Other_Views", "5", "0")
}
function fnHardlineProductView(d, b, c, a) {
	javascript: popUp("olspage.jsp?id=" + a + "&type=page&skuId=" + b + "&productId=" + d + "&defurl=" + c, "Other_Views", "5", "0")
}
function fnOpenAccessoryPopup(c, a, b) {
	javascript: popUp("olspage.jsp?id=" + b + "&type=page&productId=" + c + "&skuId=" + a, "Accessories", "3", "0")
}
function fnchooseState(f, c, a, e, d, b) {
	javascript: popUp("olspage.jsp?id=" + b + "&type=page&pspPrdId=" + f + "&pspSkuId=" + c + "&cItemId=" + a + "&ppId=" + e + "&pSkuId=" + d + "&pageType=PDPPage", "PSP", "4", "0")
}
function winopengld(c, b, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&contentId=" + c + "&categoryId=" + b + "", "Glossary", "4", "0")
}
function winopenfaq(c, b, a) {
	popUp("olspage.jsp?id=" + a + "&categoryId=" + b + "&type=page&faqID=" + c, "FAQ", "4", "0")
}
function submitformforremove(b, a) {
	document.frmCompareProducts.removable.value = "true";
	document.frmCompareProducts.productPosition.value = b;
	document.frmCompareProducts.pageIdentity.value = a;
	document.frmCompareProducts.submit()
}
function productShow(a) {
	parent.window.opener.location.href = addJsessionIdIfRequired(a);
	window.close()
}
function callcartpage(a) {
	parent.window.opener.location.href = addJsessionIdIfRequired(a);
	window.close()
}
function fnAddToCartForCompare(b, e, a) {
	for (var c = 0; c <= document.forms.length; c++) {
		var d = document.forms[c].name;
		if ((document.forms[c].name && (d == "frmMainMusic") || (d == "frmMainBundle") || (d == "frmMainMovie") || (d == "frmCompareProducts") || (d == "frmMainHardGoods") || (d == "frmSoftwareProductDetail"))) {
			document.forms[c].productId.value = b;
			document.forms[c].tempCatalogRefId.value = e;
			document.forms[c].addFromCart.value = "true";
			if (document.forms[c].name == "frmCompareProducts") {
				document.forms[c].pageIdentity.value = a
			}
			document.forms[c].submit();
			return
		}
	}
}
function fnAddToCartForMAPCart(a, b) {
	document.frmMapCart.productId.value = a;
	document.frmMapCart.tempCatalogRefId.value = b;
	document.frmMapCart.addFromCart.value = "true";
	document.frmMapCart.submit();
	return
}
function fnProductDetailsView(d, b, c, a) {
	popUp("olspage.jsp?id=" + a + "&type=page&skuId=" + b + "&productId=" + d + "&defurl=" + c, "ProductView", "4", "0")
}
function frmChooseDisplayList(b, a) {
	b.pageNumber.value = a;
	b.submit()
}
function vehicleFitGuidePopup(b, a) {
	if (a.indexOf("type=product") != -1) {
		fitGuideURL = "olspage.jsp?id=" + trim(b) + "&isPDP=true&type=page&parentURL=" + escape(a)
	} else {
		fitGuideURL = "olspage.jsp?id=" + trim(b) + "&type=page&parentURL=" + escape(a)
	}
	vehiclePopUp(fitGuideURL, "FitGuide", "4", "0")
}
function yearChange(a) {
	a.hiddenYear.value = a.Year[a.Year.selectedIndex].value;
	if (a.Year.selectedIndex != 0) {
		a.hiddenYearName.value = a.Year[a.Year.selectedIndex].text
	} else {
		a.hiddenYearName.value = ""
	}
	a.SelectedValue.value = "year";
	a.hiddenMake.value = "";
	a.hiddenMakeName.value = "";
	a.hiddenModel.value = "";
	a.hiddenModelName.value = "";
	a.hiddenBodyTypeTrim.value = "";
	a.hiddenBodyTypeTrimName.value = "";
	a.hiddenSubmitClicked.value = false;
	a.Changed.value = true;
	a.submit()
}
function makeChange(a) {
	a.hiddenMake.value = a.Make[a.Make.selectedIndex].value;
	if (a.Make.selectedIndex != 0) {
		a.hiddenMakeName.value = a.Make[a.Make.selectedIndex].text
	} else {
		a.hiddenMakeName.value = ""
	}
	a.SelectedValue.value = "make";
	a.hiddenModel.value = "";
	a.hiddenModelName.value = "";
	a.hiddenBodyTypeTrim.value = "";
	a.hiddenBodyTypeTrimName.value = "";
	a.hiddenSubmitClicked.value = false;
	a.Changed.value = true;
	a.submit()
}
function modelChange(a) {
	a.hiddenModel.value = a.Model[a.Model.selectedIndex].value;
	if (a.Model.selectedIndex != 0) {
		a.hiddenModelName.value = a.Model[a.Model.selectedIndex].text
	} else {
		a.hiddenModelName.value = ""
	}
	a.SelectedValue.value = "model";
	a.hiddenBodyTypeTrim.value = "";
	a.hiddenBodyTypeTrimName.value = "";
	a.hiddenSubmitClicked.value = false;
	a.Changed.value = true;
	a.submit()
}
function bodyTypeTrimChange(a) {
	a.hiddenBodyTypeTrim.value = a.BodyTypeTrim[a.BodyTypeTrim.selectedIndex].value;
	if (a.BodyTypeTrim.selectedIndex != 0) {
		a.hiddenBodyTypeTrimName.value = a.BodyTypeTrim[a.BodyTypeTrim.selectedIndex].text
	} else {
		a.hiddenBodyTypeTrimName.value = ""
	}
	a.SelectedValue.value = "bodyTypeTrim";
	a.hiddenSubmitClicked.value = false;
	a.Changed.value = true;
	a.submit()
}
function buttonClick(a) {
	a.hiddenSubmitClicked.value = "true";
	a.SelectedValue.value = "";
	a.submit()
}
function continueBrowsing() {
	if ((window.opener) && (!(window.opener.closed))) {
		window.opener.focus();
		window.close()
	} else {
		newWindow = window.open(addJsessionIdIfRequired(VehicleFitGuide.parentURL.value), "parentWindow", "toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1");
		newWindow.focus();
		window.close()
	}
}
function setValueAndSubmit() {
	document.BrowseMoreForm.browsedCategory.value = document.BrowseMoreForm.BrowseCategories[document.BrowseMoreForm.BrowseCategories.selectedIndex].value;
	document.BrowseMoreForm.categoryID.value = document.BrowseMoreForm.BrowseCategories[document.BrowseMoreForm.BrowseCategories.selectedIndex].value;
	document.BrowseMoreForm.submit()
}
function doSubmitShipping(b) {
	var a = b[b.selectedIndex].value;
	document.frmShipping.productShipMethod.value = a;
	if (a != "") {
		document.frmShipping.action = document.frmShipping.tAction.value;
		document.frmShipping.onChangeSubmit.value = "true";
		document.frmShipping.submit()
	}
}
function pdpPopupClose(a) {
	var b = addJsessionIdIfRequired("olspage.jsp?type=page&id=" + a);
	opener.location.href = b;
	window.close()
};