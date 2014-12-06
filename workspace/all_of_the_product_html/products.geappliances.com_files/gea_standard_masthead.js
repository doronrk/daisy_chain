/* -*- fill-column: 79 -*- */
/*jslint browser: true, sloppy: true, white: true */
/*global jQuery, alert, unescape */
/******************************************************************************
Lines above are for jslint, the JavaScript verifier.  http://www.jslint.com/
******************************************************************************/

/* On GEAppliances.com, this script depends on things defined in
 * /scripts/gea_global.js.  On GEApplianceParts.com, this script duplicates
 * them. */

var addthis_config = { 
	username: 'irenenewsom', 
	data_track_clickback: true 
};

var Base_Href, UnSecure_Base_Href;
var validateSiteSearchForm, validateAdvancedSearchForm, appendCSS;
var openTermsPopup, openPrivacyPolicyPopup;

/*****************************************************************************/

// Used by getDocumentWriteContext().
function generateID() {
	/*jslint regexp: true */
	var time_t, random, result;
	time_t = String((new Date()).getTime());
	random = String(Math.random());
	result = time_t + "_" + random;
	result = result.replace(/[^A-Za-z0-9_]+/g, "_");
	return result;
}

// Determines where a document.write() statement would insert its next element.
// Used by footer to determine whether the "cursor" is inside certain
// structures used by the parts site.  Could potentially be used by masthead as
// well.
function getDocumentWriteContext() {
	var id, element, context;
	id = generateID();
	/*jslint evil: true */
	document.write("<div style=\"display: none;\" id=\"" + id + "\"></div>");
	/*jslint evil: false */
	element = document.getElementById(id);
	context = element.parentNode;
	if (context) {
		context.removeChild(element);
	}
	return context;
}

// Within a script being called via a <script> element, gets that script's URL.
// When being called from certain dev environments, we use the URL of this
// script, as it's being referred to by the page, to determine the URLs by
// which to call the masthead and footer stylesheets.
function getCurrentScriptURL() {
	var scripts, script;
	scripts = document.getElementsByTagName("script");
	if (scripts) {
		script = scripts[scripts.length - 1];
		if (script) {
			return script.src;
		}
	}
	return undefined;
}

/*****************************************************************************/

// for pages that are not pulling in gea_global.js.
if (!Base_Href || !UnSecure_Base_Href) {
	if (/\bteamsite\./.test(location.host)) {
		if (/\/secure\.geappliances\.com\//.test(location.pathname)) {
			Base_Href          = location.protocol + "//" + location.host;
			UnSecure_Base_Href = "http://www.geappliances.com";
		} else {
			Base_Href          = location.protocol + "//" + location.host;
			UnSecure_Base_Href = "http://" + location.host;
		}
	} else if (location.protocol === "https:") {
		Base_Href          = "https://secure.geappliances.com";
		UnSecure_Base_Href = "http://www.geappliances.com";
	} else {
		Base_Href          = "http://www.geappliances.com";
		UnSecure_Base_Href = "http://www.geappliances.com";
	}
}

// for pages that are not pulling in gea_global.js.
if (!validateSiteSearchForm) {
	validateSiteSearchForm = function (form) {
		if (form.hasOwnProperty("q")) {
			if (!/\S/.test(form.q.value)) {
				return false;
			}
		}
		return true;
	};
}

// for pages that are not pulling in gea_global.js.
if (!validateAdvancedSearchForm) {
	validateAdvancedSearchForm = function (form) {
		if (/\S/.test(form.as_q.value) || /\S/.test(form.as_epq.value) || /\S/.test(form.as_oq.value)) {
			return true;
		}
		alert("Please enter a search term in at least one of the first three fields.");
		form.as_q.focus();
		form.as_q.select();
		return false;
	};
}

if (!appendCSS) {
	appendCSS = function (url, options) {
		var head, link;
		head = document.getElementsByTagName("head")[0];
		link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", url);
		if (options && options.media) {
			link.setAttribute("media", options.media);
		}
		head.appendChild(link);
	};
}

if (!openTermsPopup) {
	openTermsPopup = function(url) {
		var w;
		w = window.open(url, "GEATerms", "width=640,height=500,resizable=yes,scrollbars=yes");
		if (w) {
			w.focus();
		}
	};
}

if (!openPrivacyPolicyPopup) {
	openPrivacyPolicyPopup = function(url) {
		var w;
		w = window.open(url, "GEAPrivacyPolicy", "width=640,height=500,scrollbars=yes,resizable=yes");
		if (w) {
			w.focus();
		}
	};
}

/*****************************************************************************/

// Now that the parts site will be using the GEA standard masthead and footer,
// there are a few things that will be used on one site but not the other.

function isOnGEAppliancesPage() {
	var i, styles, href;
	styles = document.getElementsByTagName("link");
	for (i = 0; i < styles.length; i += 1) {
		if (styles[i].getAttribute("rel") === "stylesheet") {
			href = styles[i].href;
			if (/(^|\/)styles\/gea_main(_2012)?\.css$/.test(href)) {
				return true;
			}
		}
	}
	return false;
}

function isOnGEAppliancePartsPage() {
	var i, styles, href;
	styles = document.getElementsByTagName("link");
	for (i = 0; i < styles.length; i += 1) {
		if (styles[i].getAttribute("rel") === "stylesheet") {
			href = styles[i].href;
			if (/(^|\/)GEApplianceParts\/stylesheet\/main\.css$/.test(href)) {
				return true;
			}
			if (/\/2013_09_parts_store_redesign\//.test(href)) {
				return true;
			}
			if (/\/store\/stylesheet\/appliances\//.test(href)) {
				return true;
			}
		}
	}
	return false;
}

/*************** BEGIN ANALYTICS ***************/

/*jslint nomen: true */
// OwnerIQ Analytics tag. 10/23/13 RITM0099506
var _oiqq = _oiqq || [];
_oiqq.push(['oiq_doTag']);
(function () {
	/*jslint vars: true */
	var oiq = document.createElement('script'); oiq.type = 'text/javascript'; oiq.async = true;
	oiq.src = document.location.protocol + '//px.owneriq.net/stas/s/ge.js';	
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(oiq, s);
}());
/*jslint nomen: false */

// Versa tag added Jan 2014 per RITM0123802l
(function(){ 
var versaTag = {}; 
versaTag.id = "1020" 
versaTag.sync = 0 
versaTag.dispType = "js" 
versaTag.ptcl = "HTTPS" 
versaTag.bsUrl = "bs.serving-sys.com/BurstingPipe" 
//versaTag.mobile = 1 
//VersaTag activity parameters include all conversion parameters including custom parameters. Syntax: "ParamName1":"ParamValue1", "ParamName2":"ParamValue2". ParamValue can be empty. 
versaTag.activityParams = {}; 
//Static retargeting tags parameters. Syntax: "TagID1":"ParamValue1", "TagID2":"ParamValue2". ParamValue can be empty. 
versaTag.retargetParams = {}; 
//Dynamic retargeting tags parameters. Syntax: "TagID1":"ParamValue1", "TagID2":"ParamValue2". ParamValue can be empty. 
versaTag.dynamicRetargetParams = {}; 
//Third party tags conditional parameters. Syntax: "TagID1":"ParamValue1", "TagID2":"ParamValue2". ParamValue can be empty. 
versaTag.conditionalParams = {}; 
var a = document.createElement('script'); 
a.id = 'ebOneTagUrlId'; 
a.type = 'text/javascript'; 
a.src = 'https://secure-ds.serving-sys.com/SemiCachedScripts/ebOneTag.js' 
document.getElementsByTagName('body')[0].appendChild(a); 
window.versaTag = versaTag;
})(); 
// End of Versa tag

/*************** END ANALYTICS ***************/

(function ($) {
	var mastheadHTML = "", form_type, elementWithId_document, scriptURL;
	
	form_type = "product";
	if (/(^|\/)search\/results\/support_literature_product\.htm\b/.test(location.pathname)) {
		form_type = "support-product-literature";
	} else if (/(^|\/)search\/results\/support_product_literature\.htm\b/.test(location.pathname)) {
		form_type = "support-literature-product";
	}

	if (location.protocol === ":" || location.protocol === "file:" || /\bteamsite\b/.test(location.search)) {
		/*jslint regexp: true */
		scriptURL = getCurrentScriptURL();
		scriptURL = scriptURL.replace(/\/includes\/.*$/, "");
		appendCSS(scriptURL + '/styles/gea_standard_masthead_2013.css');
	} else {
		appendCSS(Base_Href + '/styles/gea_standard_masthead_2013.css');
	}

	if (isOnGEAppliancesPage()) {
		if (document.getElementById("document")) {
			mastheadHTML += '</td>';
			mastheadHTML += '</tr>';
			mastheadHTML += '</table>';
		}
	}

	mastheadHTML += '<div class="geaMasthead2013">';
	mastheadHTML += '    <div class="mastheadTop">';
	mastheadHTML += '        <div class="leftSide">';
	mastheadHTML += '            <a href="' + UnSecure_Base_Href + '/"><img src="' + Base_Href + '/images/logo_ge_blue.gif" width="170" height="57" alt="GE Appliances" title="GE Appliances" /></a>';
	mastheadHTML += '        </div>';
	mastheadHTML += '        <div class="rightSide">';
	mastheadHTML += '            <ul>';
	mastheadHTML += '                <li>';
	mastheadHTML += '                    <a href="https://www.geoutletstore.com/GEStore/Appliances/BuyOnline/Home?StoreType=OSD&StoreId=cs7567&omni_key=geatopnav_warehouse" target="_blank">Warehouse Sale</a>';
	mastheadHTML += '                </li>';
	mastheadHTML += '                <li>';
	mastheadHTML += '                    <a href="https://www.geapplianceparts.com/store/order/myaccount-login?omni_key=NavGeaMyAccount">My Account</a>';
	mastheadHTML += '                </li>';
	mastheadHTML += '                <li>';
	mastheadHTML += '                    <a href="' + UnSecure_Base_Href + '/buy/?icid=topnav_wtb">Where to Buy</a>';
	mastheadHTML += '                </li>';
	mastheadHTML += '                <li>';
	mastheadHTML += '                    <a href="' + UnSecure_Base_Href + '/service_and_support/contact/?ICID=NavGEA_Contact">Contact Us</a>';
	mastheadHTML += '                </li>';
	mastheadHTML += '                <li>';
	mastheadHTML += '                    <a class="myPartsCart" href="https://www.geapplianceparts.com/store/order/shoppingcart?omni_key=NavGeaCart">My Parts Cart</a>';
	mastheadHTML += '                </li>';
	mastheadHTML += '            </ul>';
	mastheadHTML += '        </div>';
	mastheadHTML += '    </div>';
	mastheadHTML += '    <div class="topNavRight">';

	if (form_type === "product") {
		mastheadHTML += '        <form class="masthead2013SearchForm" action="' + UnSecure_Base_Href + '/search/results/product.htm" method="get">';
		mastheadHTML += '            <div class="searchBox">';
		mastheadHTML += '                <input class="pill" type="text" name="q" maxlength="150" />';
		mastheadHTML += '                <input class="magnifier" type="submit" title="Product Search" value="" />';
		mastheadHTML += '            </div>';
		mastheadHTML += '        </form>';
	} else if (form_type === "support-product-literature") {
		mastheadHTML += '        <form class="masthead2013SearchForm" action="' + UnSecure_Base_Href + '/search/results/support_literature_product.htm" method="get">';
		mastheadHTML += '            <div class="searchBox">';
		mastheadHTML += '                <input class="pill" type="text" name="q" maxlength="150" />';
		mastheadHTML += '                <input class="magnifier" type="submit" title="Knowledge Base Search" value="" />';
		mastheadHTML += '            </div>';
		mastheadHTML += '        </form>';
	} else if (form_type === "support-literature-product") {
		mastheadHTML += '        <form class="masthead2013SearchForm" action="' + UnSecure_Base_Href + '/search/results/support_product_literature.htm" method="get">';
		mastheadHTML += '            <div class="searchBox">';
		mastheadHTML += '                <input class="pill" type="text" name="q" maxlength="150" />';
		mastheadHTML += '                <input class="magnifier" type="submit" title="Knowledge Base Search" value="" />';
		mastheadHTML += '            </div>';
		mastheadHTML += '        </form>';
	}

	mastheadHTML += '    </div>';
	mastheadHTML += '    <div class="topNav">';
	mastheadHTML += '        <ul class="topNavMenu">';
	mastheadHTML += '            <li class="hasFlyout">';
	mastheadHTML += '                <a class="flyoutToggler">Kitchen</a>';
	mastheadHTML += '                <div class="flyout kitchenFlyout" style="display: none;">'; // style="display: none;" is for good measure
	mastheadHTML += '                    <div class="flyoutColumns productCategories">';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <div class="imageBlock">';
	mastheadHTML += '                                <div class="image"><img src="' + Base_Href + '/images/masthead_2013/refrigeration.png" width="48" height="89" alt="Refrigeration" title="Refrigeration" /></div>';
	mastheadHTML += '                                <div class="text">';
	mastheadHTML += '                                    <h3>Refrigeration</h3>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </div>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/refrigerators.htm?ICID=kitchenflyout-refer">Refrigerators</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/freezer.htm?ICID=kitchenflyout-freezer">Freezers</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <div class="imageBlock">';
	mastheadHTML += '                                <div class="image"><img src="' + Base_Href + '/images/masthead_2013/cleaning.png" width="48" height="62" alt="Cleaning" title="Cleaning" /></div>';
	mastheadHTML += '                                <div class="text">';
	mastheadHTML += '                                    <h3>Cleaning</h3>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </div>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/dishwasher.htm?ICID=kitchenflyout-dish">Dishwashers</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/garbage-disposal.htm?ICID=kitchenflyout-disposer">Disposers</a></li>';
	mastheadHTML += '                                <li><a href="http://products.geappliances.com/ApplProducts/html/GEAResults.htm?#Category=Compactors&ICID=kitchenflyout-trashcomp">Trash Compactors</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <div class="imageBlock">';
	mastheadHTML += '                                <div class="image"><img src="' + Base_Href + '/images/masthead_2013/cooking.png" width="52" height="77" alt="Cooking" title="Cooking" /></div>';
	mastheadHTML += '                                <div class="text">';
	mastheadHTML += '                                    <h3>Cooking</h3>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </div>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/range-stove.htm?ICID=kitchenflyout-range">Ranges</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/wall-oven.htm?ICID=kitchenflyout-walloven">Wall Ovens</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/speedcooking-oven.htm?ICID=kitchenflyout-advantium">Advantium Ovens</a></li>';
	mastheadHTML += '                                <li><a href="http://products.geappliances.com/ApplProducts/html/GEAResults.htm#Category=Venting_Systems_and_Hoods&ICID=kitchenflyout-hoods">Range Hoods &amp; Vents</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn withNoLeftBorder">';
	mastheadHTML += '                            <div class="spaceWhereAnImageBlockWouldNormallyGo">';
	mastheadHTML += '                            </div>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/cooktop.htm?ICID=kitchenflyout-cooktops">Cooktops</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/microwave-oven.htm?ICID=kitchenflyout-MWO">Microwaves</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/warming-drawer.htm?ICID=kitchenflyout-warmingdrawer">Warming Drawers</a></li>';
	mastheadHTML += '                                <li><a href="http://www.gehousewares.com/">Housewares</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn buttonsColumn">';
	mastheadHTML += '                            <p><a class="blueButton  withALittleExtraHeight displayBlock font16" href="' + UnSecure_Base_Href + '/appliances/?ICID=kitchenflyout-viewall">View all Products</a></p>';
	mastheadHTML += '                            <p><a class="greenButton withALittleExtraHeight displayBlock font16" href="' + UnSecure_Base_Href + '/buy/?ICID=kitchenflyout-WTB">Where to Buy</a></p>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                    </div>';
	mastheadHTML += '                    <div class="applianceCollections">';
	mastheadHTML += '                        <h2>Explore Our Appliance Collections</h2>';
	mastheadHTML += '                        <ul>';
	mastheadHTML += '                            <li>';
	mastheadHTML += '                                <div class="imageBlock">';
	mastheadHTML += '                                    <div class="image"><img src="' + Base_Href + '/images/masthead_2013/ge_collection.png" width="87" height="115" alt="GE&reg; and GE Profile&trade; Series" title="GE&reg; and GE Profile&trade; Series" /></div>';
	mastheadHTML += '                                    <div class="text">';
	mastheadHTML += '                                        <a href="' + UnSecure_Base_Href + '/products/profile/?ICID=kitchenflyout-profile">GE<sup style="vertical-align:top;">&reg;</sup> &amp; GE Profile&trade; Series</a>';
	mastheadHTML += '                                    </div>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </li>';
	mastheadHTML += '                            <li>';
	mastheadHTML += '                                <div class="imageBlock">';
	mastheadHTML += '                                    <div class="image"><img src="' + Base_Href + '/images/masthead_2013/artistry_collection.png" width="94" height="116" alt="GE Artistry&trade; Series" title="GE Artistry&trade; Series" /></div>';
	mastheadHTML += '                                    <div class="text">';
	mastheadHTML += '                                        <a href="' + UnSecure_Base_Href + '/products/artistry/?ICID=kitchenflyout-artistry">GE Artistry&trade;<br />Series</a>';
	mastheadHTML += '                                    </div>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </li>';
	mastheadHTML += '                            <li>';
	mastheadHTML += '                                <div class="imageBlock">';
	mastheadHTML += '                                    <div class="image"><img src="' + Base_Href + '/images/masthead_2013/cafe_collection.png" width="89" height="115" alt="GE Caf&eacute;&trade; Series" title="GE Caf&eacute;&trade; Series" /></div>';
	mastheadHTML += '                                    <div class="text">';
	mastheadHTML += '                                        <a href="' + UnSecure_Base_Href + '/products/cafe/?ICID=kitchenflyout-cafe">GE Caf&eacute;&trade;<br />Series</a>';
	mastheadHTML += '                                    </div>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </li>';
	mastheadHTML += '                            <li>';
	mastheadHTML += '                                <div class="imageBlock">';
	mastheadHTML += '                                    <div class="image"><img src="' + Base_Href + '/images/masthead_2013/monogram_collection.png" width="112" height="115" alt="Monogram" title="Monogram" /></div>';
	mastheadHTML += '                                    <div class="text">';
	mastheadHTML += '                                        <a href="http://www.monogram.com/?omni_key=GEAkitchenflyout-monogram">Monogram</a>';
	mastheadHTML += '                                    </div>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </li>';
	mastheadHTML += '                        </ul>';
	mastheadHTML += '                    </div>';
	mastheadHTML += '                </div>';
	mastheadHTML += '            </li>';
	mastheadHTML += '            <li class="hasFlyout">';
	mastheadHTML += '                <a class="flyoutToggler">Laundry &amp; Home</a>';
	mastheadHTML += '                <div class="flyout laundryHomeFlyout" style="display: none;">'; // style="display: none;" is for good measure
	mastheadHTML += '                    <div class="flyoutColumns productCategories">';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <div class="imageBlock">';
	mastheadHTML += '                                <div class="image">';
	mastheadHTML += '                                    <img src="' + Base_Href + '/images/masthead_2013/laundry.png" width="75" height="64" alt="Laundry" title="Laundry" />';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                                <div class="text">';
	mastheadHTML += '                                    <h3>Laundry</h3>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </div>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/washer/?ICID=laundryflyout-washer">Washers</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/dryer/?ICID=laundryflyout-dryer">Dryers</a></li>';
	mastheadHTML += '                                <li><a href="http://products.geappliances.com/ApplProducts/html/GEAResults.htm?#Category=Stacked_Washer_Dryer_Combo&ICID=laundryflyout-stacked">Space-Saving Laundry Units</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/commercial_laundry/?ICID=laundryflyout-commerciallaundry">Commercial Laundry</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <div class="imageBlock">';
	mastheadHTML += '                                <div class="image">';
	mastheadHTML += '                                    <img src="' + Base_Href + '/images/masthead_2013/water_products.png" width="71" height="82" alt="Water Products" title="Water Products" />';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                                <div class="text">';
	mastheadHTML += '                                    <h3>Water Products</h3>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </div>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/products/water/refrigerator-icemaker-replacement-filters.htm?ICID=laundryflyout-replacementfilters ">Replacement Filters</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/heat-pump-hot-water-heater/">Water Heaters</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/products/water/water_softeners.htm?ICID=laundryflyout-softeners">Water Softeners</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/products/water-filtration.htm?ICID=laundryflyout-waterfiltration">Water Filtration Systems</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <div class="imageBlock">';
	mastheadHTML += '                                <div class="image">';
	mastheadHTML += '                                    <img src="' + Base_Href + '/images/masthead_2013/home_products.png" width="74" height="47" alt="Home Products" title="Home Products" />';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                                <div class="text">';
	mastheadHTML += '                                    <h3>Home Products</h3>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </div>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/room-air-conditioner.htm?ICID=laundryflyout-roomair">Residential Air Conditioners</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/products/introductions/zoneline/?ICID=laundryflyout-zoneline">Commercial Air Conditioners</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/dehumidifier.htm?ICID=laundryflyout-airpurifiers">Air Purifiers</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/appliances/dehumidifier.htm?ICID=laundryflyout-dehums">Dehumidifiers</a></li>';
	mastheadHTML += '                                <li><a href="http://www.gegenerators.com/">Home Generators</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                                ';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <div class="imageBlock">';
	mastheadHTML += '                                <div class="image"><img src="' + Base_Href + '/images/masthead_2013/small_electronics.png" height="71" alt="Small Electronics" title="Small Electronics" /></div>';
	mastheadHTML += '                                <div class="text">';
	mastheadHTML += '                                    <h3>Small Electronics</h3>';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </div>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="http://www.ge.com/digitalcameras/">Cameras</a></li>';
	mastheadHTML += '                                <li><a href="http://www.jascoproducts.com/">Electronic Accessories</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn buttonsColumn">';
	mastheadHTML += '                            <p><a class="blueButton  withALittleExtraHeight displayBlock font16" href="' + UnSecure_Base_Href + '/appliances/?ICID=laundryflyout-viewall">View all Products</a></p>';
	mastheadHTML += '                            <p><a class="greenButton withALittleExtraHeight displayBlock font16" href="' + UnSecure_Base_Href + '/buy/?ICID=laundryflyout-WTB">Where to Buy</a></p>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                    </div>';
	mastheadHTML += '                </div>';
	mastheadHTML += '            </li>';
	mastheadHTML += '            <li>';
	mastheadHTML += '                <a href="' + UnSecure_Base_Href + '/rebates_promotions/?ICID=topnav-rebates">Rebates</a>';
	mastheadHTML += '            </li>';
	mastheadHTML += '            <li>';
	mastheadHTML += '                <a href="https://www.geapplianceparts.com/store?omni_key=NavGea">Filters &amp; Parts</a>';
	mastheadHTML += '            </li>';
	mastheadHTML += '            <li class="hasFlyout">';
	mastheadHTML += '                <a class="flyoutToggler">Support</a>';
	mastheadHTML += '                <div class="flyout supportFlyout" style="display: none;">'; // style="display: none;" is for good measure
	mastheadHTML += '                    <div class="flyoutColumns productCategories">';
	mastheadHTML += '                        <div class="flyoutColumn doubleColumn">';
	mastheadHTML += '                            <h2>Troubleshoot Your Product</h2>';
	mastheadHTML += '                            <h4>Search our Knowledge Base</h4>';
	mastheadHTML += '                            <form class="masthead2013KnowledgeBaseSearchForm" action="' + UnSecure_Base_Href + '/search/results/support_literature_product.htm?q=keyword" method="get" onsubmit="return validGEACSearch(this);">';
	mastheadHTML += '                                <div class="searchBox">';
	mastheadHTML += '                                    <input class="pill" type="text" name="q" />';
	mastheadHTML += '                                    <input class="magnifier" type="submit" title="Search our Knowledge Base" value="" />';
	mastheadHTML += '                                </div>';
	mastheadHTML += '                            </form>';
	mastheadHTML += '                            <h4>More Tools</h4>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/service_and_support/?ICID=supportflyout-supportbyPL">Service &amp; Support by Product Line</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/videos/side-by-side-refrigerator-troubleshooting-fix.htm?ICID=supportflyout-videos">Troubleshooting &amp; Support Videos</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/service_and_support/faqs/?ICID=supportflyout-FAQ">Frequently Asked Questions</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/products/recall/?ICID=supportflyout-recall">Recall Information</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/service_and_support/donation.htm?ICID=supportflyout-donate">Appliance Donation Centers</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <h2>Owner&rsquo;s Center</h2>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a href="https://secure.geappliances.com/service_and_support/register/?ICID=supportflyout-register">Register Your Appliance</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/service_and_support/literature/?ICID=supportflyout-manuals">Manuals &amp; Literature</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/service_and_support/service/?ICID=supportflyout-service">Service &amp; Repair</a></li>';
	mastheadHTML += '                                <li><a href="' + UnSecure_Base_Href + '/service_and_support/shop-for-extended-service-plans.htm?ICID=supportflyout-extendedservice">Extended Service Plans</a></li>';
	mastheadHTML += '                                <li><a href="https://www.geapplianceparts.com/store?omni_key=supportflyout-parts">Parts &amp; Accessories</a></li>';
	mastheadHTML += '                                <li><a href="https://www.geapplianceparts.com/store/order/myaccount-login?omni_key=supportflyout-smartorder">My SmartOrder Account</a></li>';
	mastheadHTML += '                                <li><a href="https://www.geapplianceparts.com/store/order/order-status-returns?omni_key=GEAsupportflyout-orderstatus">Check Part Order Status</a></li>';
	mastheadHTML += '                                <li><a href="https://www.geapplianceparts.com/store/order/order-status-returns?omni_key=GEAsupportflyout-returns">Return a Part/Accessory</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn">';
	mastheadHTML += '                            <h2>Contact Us</h2>';
	mastheadHTML += '                            <ul>';
	mastheadHTML += '                                <li><a class="withPhoneIcon" href="' + UnSecure_Base_Href + '/service_and_support/contact/phone-numbers.htm?ICID=supportflyout-contactphone">By Phone</a></li>';
	mastheadHTML += '                                <li><a class="withEmailIcon" href="' + UnSecure_Base_Href + '/service_and_support/contact/form_email.htm?ICID=supportflyout-contactemail">By Email</a></li>';
	mastheadHTML += '                            </ul>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                        <div class="flyoutColumn buttonsColumn">';
	mastheadHTML += '                            <p><a class="blueButton  withALittleExtraHeight displayBlock font16" href="' + UnSecure_Base_Href + '/service_and_support/?ICID=supportflyout-viewall">View all Support</a></p>';
	mastheadHTML += '                            <p><a class="greenButton withALittleExtraHeight displayBlock font16" href="https://genet.geappliances.com/eService/Service/home?icid=supportflyout-schedule">Schedule Service</a></p>';
	mastheadHTML += '                        </div>';
	mastheadHTML += '                    </div>';
	mastheadHTML += '                </div>';
	mastheadHTML += '            </li>';
	mastheadHTML += '        </ul>';
	mastheadHTML += '    </div>';
	mastheadHTML += '    <div style="clear: both;"></div>';
    mastheadHTML += '</div>';

	// BEGIN PROMO STRIPE
	mastheadHTML += '<style>';
	mastheadHTML += '    .headerPromoStripe { padding-top: 5px; padding-bottom: 5px; text-align: center; }';
	mastheadHTML += '    .headerPromoStripe a:hover { text-decoration: none; }';
	mastheadHTML += '    .headerPromoStripe h3 { font-size: 20px; color: #000; background: transparent; padding: 0; margin: 0; }'; /* overrides for styles in email subscription center (2014-11-19) */
	mastheadHTML += '    .headerPromoStripe h3 { margin-bottom: 0; }';
	mastheadHTML += '    .headerPromoStripe h3 a.link1 { color: #ed8000; }';
	mastheadHTML += '    .headerPromoStripe a.link2 { font-size: 16px; color: #555555; }';
	mastheadHTML += "    .headerPromoStripeGradient {";
	mastheadHTML += "        background: rgb(255,255,255); /* Old browsers */";
	mastheadHTML += "        background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 100%); /* FF3.6+ */";
	mastheadHTML += "        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(249,249,249,1))); /* Chrome,Safari4+ */";
	mastheadHTML += "        background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(249,249,249,1) 100%); /* Chrome10+,Safari5.1+ */";
	mastheadHTML += "        background: -o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(249,249,249,1) 100%); /* Opera 11.10+ */";
	mastheadHTML += "        background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(249,249,249,1) 100%); /* IE10+ */";
	mastheadHTML += "        background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(249,249,249,1) 100%); /* W3C */";
	mastheadHTML += "        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f9f9f9',GradientType=0 ); /* IE6-9 */";
	mastheadHTML += "    }";
	mastheadHTML += '</style>';

    mastheadHTML += '<div class="headerPromoStripeGradient">';
    mastheadHTML += '    <div class="headerPromoStripe">';
    mastheadHTML += '        <h3><a class="link1" href="' + UnSecure_Base_Href + '/rebates_promotions/cafe-profile-rebates-nov-2014/?icid=topnav_rebatepromo">SAVE up to $2000</a></h3>';
    mastheadHTML += '        <a class="link2 inspira" href="' + UnSecure_Base_Href + '/rebates_promotions/cafe-profile-rebates-nov-2014/?icid=topnav_rebatepromo">when you purchase eligible appliance packages &rsaquo;</a>';
	mastheadHTML += '    </div>';
	mastheadHTML += '</div>';
	// END PROMO STRIPE

	if (isOnGEAppliancesPage()) {
		if (document.getElementById("document")) {
			mastheadHTML += '<table cellpadding="0" cellspacing="0" class="mainContain">';
			mastheadHTML += '<tr>';
			mastheadHTML += '<td>';
		}
	}

	/*jslint evil: true */
	document.write(mastheadHTML);
	/*jslint evil: false */

	jQuery(function ($) {
		var $togglers, $containers, $flyouts;
		$togglers   = $(".flyoutToggler");
		$containers = $(".hasFlyout"); // each element of which contains both a toggler and a flyout.
		$flyouts    = $containers.find(".flyout");
		$togglers.click(function () {
			var $toggle, $container, $flyout;
			$toggle    = $(this);
			$container = $toggle.parents(".hasFlyout").eq(0);
			$flyout    = $container.find(".flyout");
			$containers.not($container).removeClass("selected");
			$container.toggleClass("selected");
			if ($container.hasClass("selected")) {
				$flyouts.not($flyout).hide();
				$flyout.show();
			} else {
				$flyouts.not($flyout).hide(); // for good measure
				$flyout.hide();
			}
			return false; // good measure to tell browser not to take link's default action.
		});
	});

	// If a flyout is open, any click anywhere hides it, EXCEPT if the user
	// clicks inside the topnav or inside a flyout.  Any browser default
	// actions are still performed.
	//
	// We are not using anything like stopEventPropagation beacuse that
	// could potentially conflict with other event-driven code that might
	// find its way to this page.
	(function () {
		function innerHandler(clickEvent) {
			// executed first if user clicks inside a topnav or
			// flyout.
			var $target = $(clickEvent.target); // $target in outerHandler will be the same as this.
			$target.data("doNotCloseTheFlyout", true);
			// REMINDER: don't stop event propagation or anything
			// here.
		}
		function outerHandler(clickEvent) {
			// executed second if user clicks inside a topnav or
			// flyout.
			var $target = $(clickEvent.target); // $target here is the same object as in innerHandler.
			if ($target.data("doNotCloseTheFlyout")) { // i.e., user has clicked inside the top nav menu or inside a flyout.
				$target.removeData("doNotCloseTheFlyout");
				// otherwise do nothing
			} else {
				$(".hasFlyout").removeClass("selected");
				$(".flyout").hide();
			}
			// REMINDER: don't stop event propagation or anything
			// here, either.
		}
		$(function () {
			if (jQuery.fn.on) {
				$("ul.topNavMenu").on("click", innerHandler);
				$(document).on("click", outerHandler);
			} else {
				// for jQuery < 1.7
				$("ul.topNavMenu").bind("click", innerHandler);
				$(document).bind("click", outerHandler);
			}
		});
	}());

}(jQuery));

if (!String.prototype.negateEveryWord) {
	String.prototype.negateEveryWord = function () {
		var s = this;
		s = s.replace(/(^|\s)(?=\S)/g, "$1-");
		return s;
	};
}

if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, "");
	};
}

function fixWindows1252isms(string) {
	string = string.replace(/\u0080/g, "\u20ac");
	string = string.replace(/\u0082/g, "\u201a");
	string = string.replace(/\u0083/g, "\u0192");
	string = string.replace(/\u0084/g, "\u201e");
	string = string.replace(/\u0085/g, "\u2026");
	string = string.replace(/\u0086/g, "\u2020");
	string = string.replace(/\u0087/g, "\u2021");
	string = string.replace(/\u0088/g, "\u02c6");
	string = string.replace(/\u0089/g, "\u2030");
	string = string.replace(/\u008a/g, "\u0160");
	string = string.replace(/\u008b/g, "\u2039");
	string = string.replace(/\u008c/g, "\u0152");
	string = string.replace(/\u008e/g, "\u017d");
	string = string.replace(/\u0091/g, "\u2018");
	string = string.replace(/\u0092/g, "\u2019");
	string = string.replace(/\u0093/g, "\u201c");
	string = string.replace(/\u0094/g, "\u201d");
	string = string.replace(/\u0095/g, "\u2022");
	string = string.replace(/\u0096/g, "\u2013");
	string = string.replace(/\u0097/g, "\u2014");
	string = string.replace(/\u0098/g, "\u02dc");
	string = string.replace(/\u0099/g, "\u2122");
	string = string.replace(/\u009a/g, "\u0161");
	string = string.replace(/\u009b/g, "\u203a");
	string = string.replace(/\u009c/g, "\u0153");
	string = string.replace(/\u009e/g, "\u017e");
	string = string.replace(/\u009f/g, "\u0178");
	return string;
}

function myDecodeURIComponent(string) {
	// sometimes what's in the query string is not URL-encoded UTF-8 but
	// URL-encoded Windows-1252 (or URL-encoded ISO-Latin-1) instead.
	// There has to be a smarter way to detect this than catching a
	// 'malformed URI sequence' exception.
	var result;
	try {
		result = decodeURIComponent(string);
	} catch (e1) {
		result = fixWindows1252isms(unescape(string));
	}
	return result;
}

function populateMastheadSearchForm() {
	if (typeof jQuery !== "undefined") {
		jQuery(document).ready(function ($) {
			var query;
			/*jslint regexp: true */
			if (/(?:^|\?|\&)q=([^\?\&\=]+)/.test(location.search) ||
			    /(?:^|\?|\&)as_q=([^\?\&\=]+)/.test(location.search) ||
			    /(?:^|\?|\&)as_epq=([^\?\&\=]+)/.test(location.search) ||
			    /(?:^|\?|\&)as_oq=([^\?\&\=]+)/.test(location.search)) {
				// extract the first nonblank of the following:
				// - q      = regular search
				// - as_q   = advanced search: all these words
				// - as_epq =                  exact wording or phrase
				// - as_oq  =                  one or more of these words
				query = myDecodeURIComponent(RegExp.$1.replace(/\+/g, " ")).trim();
				if (/(?:^|\?|\&)as_eq=([^\?\&\=]+)/.test(location.search)) {
					// as_eq = unwanted words
					query = query + " " + 
						(myDecodeURIComponent(RegExp.$1.replace(/\+/g, " ")).
						 trim().
						 negateEveryWord());
				}
				$("form.mastheadSearchForm").find("input[name='q']").val(query);
			}
		});
	}
}

function addSearchFormValidation() {
	if (typeof jQuery !== "undefined") {
		jQuery(document).ready(function ($) {
			function mastheadSearchSubmit() {
				var form = this;
				if (validateSiteSearchForm) {
					form.onsubmit = function () {
						return validateSiteSearchForm(this);
					};
				}
			}
			function advancedSearchSubmit() {
				var form = this;
				if (validateAdvancedSearchForm) {
					form.onsubmit = function () {
						return validateAdvancedSearchForm(this);
					};
				}
			}
			$("form.mastheadSearchForm").each(mastheadSearchSubmit);
			$("form.masthead2013SearchForm").each(mastheadSearchSubmit);
			$("form.advancedSearchForm").each(advancedSearchSubmit);
		});
	}
}

populateMastheadSearchForm();
addSearchFormValidation();


/***********************
RightNow Engagement Engine code.
RITM0146726
************************/
var atgScript = document.createElement('script');
atgScript.setAttribute('type', 'text/javascript');
atgScript.setAttribute('src', 'https://static.atgsvcs.com/js/atgsvcs.js')
document.getElementsByTagName("head")[0].appendChild(atgScript);

jQuery(document).ready(function($) {
    if (window.ATGSvcs) { // ATGSvcs has already loaded
      ATGSvcs.setEEID("200106306479");
      ATGSvcs.start();
    } else {  // ATGSvcs has not yet loaded
      ATGSvcs = { eeid: "200106306479", setupFn: function() { ATGSvcs.start(); } } 
    } 
    (function() {
        var l = 'geappliances.custhelp.com',d=document,ss='script',s=d.getElementsByTagName(ss)[0];
        function r(u) {
            var rn=d.createElement(ss);
            rn.type='text/javascript';
            rn.defer=rn.async=!0;
            rn.src = "//" + l + u;
            s.parentNode.insertBefore(rn,s);
        }
        r('/rnt/rnw/javascript/vs/1/vsapi.js');
        r('/vs/1/vsopts.js');
    })();
});
/***********************
RightNow Engagement Engine code ended.
************************/
