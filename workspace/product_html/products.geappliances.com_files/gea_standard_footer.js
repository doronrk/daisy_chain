/* -*- fill-column: 79 -*- */
/*jslint browser: true, sloppy: true */
/*global Base_Href, UnSecure_Base_Href */
/*global jQuery, unescape */
/*global appendCSS */
/*global isOnGEAppliancesPage */
/*global isOnGEAppliancePartsPage */
/*global getDocumentWriteContext */
/******************************************************************************
Lines above are for jslint, the JavaScript verifier.  http://www.jslint.com/
******************************************************************************/

/* On GEAppliances.com, this script depends on things defined in
 * /scripts/gea_global.js.  On GEApplianceParts.com, this script's companion,
 * gea_standard_masthead.js, duplicates them. */

(function ($) {
	var footerHTML = "", getIn = "", context;

	if (location.protocol === ":" || location.protocol === "file:" || /\bteamsite\b/.test(location.search)) {
		scriptURL = getCurrentScriptURL();
		scriptURL = scriptURL.replace(/\/includes\/.*$/, "");
		appendCSS(scriptURL + '/styles/gea_standard_footer_2013.css');
	} else {
		appendCSS(Base_Href + '/styles/gea_standard_footer_2013.css');
	}

	if (isOnGEAppliancesPage()) {
		if (document.getElementById("document")) {
			footerHTML += '</td>';
			footerHTML += '</tr>';
			footerHTML += '</table>';
		}
	}

	footerHTML +=  '    <div id="geaPreFooter2013" class="footer geaPreFooter2013">';
	footerHTML +=  '        <div class="mainContain">';
	footerHTML +=  '            <div class="footerColumn1">';
	footerHTML +=  '                <div class="footerColumnWrapper">';
	footerHTML +=  '                    <h4>Find a GE Appliance</h4>';
	footerHTML +=  '                    <div class="footer-drop-down">';
	footerHTML +=  '                        <select id="dynamic_select">';
	footerHTML +=  '                            <option value="">SELECT A PRODUCT</option>';
	footerHTML +=  '                            <optgroup label="KITCHEN APPLIANCES">';
	footerHTML +=  '                                <option value="/appliances/refrigerators.htm">Refrigerators</option>';
	footerHTML +=  '                                <option value="/appliances/freezer.htm">Freezers</option>';
	footerHTML +=  '                                <option value="/appliances/wine-refrigerator-beverage-refrigerator.htm">Wine Refrigerators &amp; Beverage Centers</option>';
	footerHTML +=  '                                <option value="/appliances/cooktop.htm">Cooktops </option>';
	footerHTML +=  '                                <option value="/appliances/range-stove.htm">Ranges</option>';
	footerHTML +=  '                                <option value="/appliances/wall-oven.htm">Wall Ovens</option>';
	footerHTML +=  '                                <option value="/appliances/microwave-oven.htm">Microwave Ovens</option>';
	footerHTML +=  '                                <option value="/appliances/speedcooking-oven.htm">Speedcooking Ovens</option>';
	footerHTML +=  '                                <option value="/appliances/warming-drawer.htm">Warming Drawers</option>';
	footerHTML +=  '                                <option value="/appliances/vent-range-hood.htm">Venting Systems & Range Hoods</option>';
	footerHTML +=  '                                <option value="/appliances/dishwasher.htm">Dishwashers</option>';
	footerHTML +=  '                                <option value="/appliances/garbage-disposal-trash-compactor.htm">Disposers & Compactors</option>';
	footerHTML +=  '                            </optgroup>';
	footerHTML +=  '                            <optgroup label="HOME &amp; LAUNDRY">';
	footerHTML +=  '                                <option value="/appliances/washer/">Washers</option>';
	footerHTML +=  '                                <option value="/appliances/dryer/">Dryers</option>';
	footerHTML +=  '                                <option value="/heat-pump-hot-water-heater/">Water Heaters</option>';
	footerHTML +=  '                                <option value="/products/water/refrigerator-icemaker-replacement-filters.htm">Replacement Water Filters</option>';
	footerHTML +=  '                                <option value="/products/water/water_softeners.htm">Water Softeners</option>';
	footerHTML +=  '                                <option value="/products/water-filtration.htm">Water Filtration Systems</option>';
	footerHTML +=  '                                <option value="/appliances/room-air-conditioner.htm">Room Air Conditioners </option>';
	footerHTML +=  '                                <option value="/appliances/dehumidifier.htm">Dehumidifiers & Air Purifiers</option>';
	footerHTML +=  '                            </optgroup>';
	footerHTML +=  '                        </select>';
	footerHTML +=  '                    <div class="clear"></div>';
	footerHTML +=  '                    </div>';
	footerHTML +=  '                    <img src="/images/footer_dash.gif" width="311" height="36" alt="Divider" title="Divider" />';
	footerHTML +=  '                    <ul>';
	footerHTML +=  '                        <li><a href="http://www.monogram.com/?omni_key=GEA_foot" target="_blank">GE Monogram</a></li>';	
	footerHTML +=  '                        <li><a href="http://genet.geappliances.com/Recipes/Dispatcher?REQUEST=GERECIPE_HOMEPAGE&amp;ICID=Footer-Recipes">Recipes</a></li>';
	footerHTML +=  '                        <li><a href="http://www.geappliances.com/design_center/?ICID=Footer-RD">Design &amp; Remodeling Tools</a></li>';
	footerHTML +=  '                        <li><a href="/rebates_promotions/?icid=FOOT_rebatepromo">Rebates &amp; Promotions</a></li>';
	footerHTML +=  '                        <li><a href="http://www.geappliances.com/ge/">Visit Mobile Site</a></li>';
	footerHTML +=  '                        <li><a href="/products/brands/">Explore GE Brands</a></li>';
	footerHTML +=  '                        <li><a href="/employee-retiree-store.htm">Employee &amp; Retiree Store</a></li>';
	footerHTML +=  '                    </ul>';
	footerHTML +=  '                </div>';
	footerHTML +=  '            </div> <!-- / footerColumn1 -->';
	footerHTML +=  '            <div class="footerColumn2">';
	footerHTML +=  '                <div class="footerColumnWrapper">';
	footerHTML +=  '                    <h4>Customer Care</h4>';
	footerHTML +=  '                    <ul>';
	footerHTML +=  '                        <li><a href="/buy/?icid=footer_wtb">Find a Dealer</a></li>';
	footerHTML +=  '                        <li><a href="https://secure.geappliances.com/service_and_support/register/">Register an Appliance</a></li>';
	footerHTML +=  '                        <li><a href="/service_and_support/service/">Service an Appliance</a></li>';
	footerHTML +=  '                        <li><a href="/service_and_support/">Troubleshoot an Appliance</a></li>';
	footerHTML +=  '                        <li><a href="https://www.geapplianceparts.com/store/">Find Parts or Accessories</a></li>';
	footerHTML +=  '                        <li><a href="https://www.geapplianceparts.com/store/order/order-status-returns?omni_key=GEAFooter-orderstatus">Check Parts Order Status</a></li>';
	footerHTML +=  '                        <li><a href="https://www.geapplianceparts.com/store/order/order-status-returns?omni_key=GEAFooter-returns">Return a Part / Accessory</a></li>';
	footerHTML +=  '                        <li><a href="/videos/ge-announcements.htm">Browse Videos</a></li>';
	footerHTML +=  '                        <li><a href="/products/recall/">Recall Information</a></li>';
	footerHTML +=  '                        <li><a href="/service_and_support/contact/">Contact Us</a></li>';
	footerHTML +=  '                    </ul>';
	footerHTML +=  '                </div>';
	footerHTML +=  '            </div> <!-- / footerColumn2 -->';
	footerHTML +=  '            <div class="footerColumn3">';
	footerHTML +=  '                <div class="footerColumnWrapper">';
	footerHTML +=  '                    <h4>Our Company</h4>';
	footerHTML +=  '                    <ul>';
	footerHTML +=  '                        <li><a href="/plcy/appliances_worldwide.htm">GE Appliance Worldwide</a></li>';
	footerHTML +=  '                        <li><a href="/plcy/appliances_b2b.htm">B2B GE Appliances</a></li>';
	footerHTML +=  '                        <li><a href="http://www.ge.com/" target="_blank">Corporate</a></li>';
	footerHTML +=  '                        <li><a href="/about-ge-appliances/">Our Story</a></li>';
	footerHTML +=  '                        <li><a href="/corporate-social-responsibility/">Our Initiatives</a></li>';
	footerHTML +=  '                        <li><a href="http://pressroom.geappliances.com/" target="_blank">Press Room</a></li>';
	footerHTML +=  '                        <li><a href="http://www.geconsumerandindustrial.com/hr/careers/appliances.htm" target="_blank">Careers</a></li>';
	footerHTML +=  '                    </ul>';
	footerHTML +=  '                </div>';
	footerHTML +=  '            </div> <!-- / footerColumn3 -->';
	footerHTML +=  '            <div class="footerColumn4">';
	footerHTML +=  '                <div class="footerColumnWrapper">';
	footerHTML +=  '                    <div id="socialLinks">';
	footerHTML +=  '                        <a href="https://www.facebook.com/geappliances" target="_blank">';
	footerHTML +=  '                            <img src="/images/footer_fb.gif" width="114" height="32" alt="GE Appliances on Facebook" title="GE Appliances on Facebook" />';
	footerHTML +=  '                        </a>';
	footerHTML +=  '                        <br />';
	footerHTML +=  '                        <a href="https://twitter.com/#!/ge_appliances" target="_blank">';
	footerHTML +=  '                            <img src="/images/footer_twitter.gif" width="114" height="32" alt="GE Appliances on Twitter" title="GE Appliances on Twitter" />';
	footerHTML +=  '                        </a>';
	footerHTML +=  '                        <br />';
	footerHTML +=  '                        <a href="http://www.youtube.com/user/GEAppliances" target="_blank">';
	footerHTML +=  '                            <img src="/images/footer_youtube.gif" width="114" height="33" alt="GE Appliances on YouTube" title="GE Appliances on YouTube" />';
	footerHTML +=  '                        </a>';    
	footerHTML +=  '                        <br />';
	footerHTML +=  '                        <a href="http://pinterest.com/geappliances" target="_blank">';
	footerHTML +=  '                            <img src="/images/footer_pinterest.gif" width="114" height="32" alt="GE Appliances on Pinterest" title="GE Appliances on Pinterest" />';
	footerHTML +=  '                        </a>';
	footerHTML +=  '                        <br />';
	footerHTML +=  '                        <a href="https://plus.google.com/109463587407044566918" rel="publisher" target="_blank">';
	footerHTML +=  '                            <img src="/images/footer_google_plus.gif" width="114" height="32" alt="GE Appliances on Google+" title="GE Appliances on Google+" />';
	footerHTML +=  '                        </a>'; 
	footerHTML +=  '                        <br />';
	footerHTML +=  '                        <a href="http://instagram.com/geappliances" target="_blank">';
	footerHTML +=  '                            <img src="/images/footer_instagram.gif" width="114" height="32" alt="GE Appliances on Instagram" title="GE Appliances on Instagram" />';
	footerHTML +=  '                        </a>';
	footerHTML +=  '                        <br />';
	footerHTML +=  '                        <a href="http://geappliances.tumblr.com/?icid=GEA_soc_ftr " target="_blank">';
	footerHTML +=  '                            <img src="/images/footer_tumblr.gif" width="114" height="39" alt="GE Appliances on Tumblr" title="GE Appliances on Tumblr" />';
	footerHTML +=  '                        </a>';	
	footerHTML +=  '                    </div>';
	footerHTML +=  '                    <div class="clear"></div>';
	footerHTML +=  '                </div>';
	footerHTML +=  '            </div> <!-- / footerColumn4 -->';
	footerHTML +=  '            <div class="clear"><!-- DO NOT REMOVE --></div>';
	footerHTML +=  '        </div>';
	footerHTML +=  '    </div>';

	footerHTML +=  '    <div id="geaFooter2013" class="footer geaFooter2013">';
	footerHTML +=  '        <div class="mainContain">';
	footerHTML +=  '            <div class="clear"><!-- DO NOT REMOVE --></div>';
	footerHTML +=  '            <div class="floatLeft">';
	footerHTML +=  '                <img src="/images/logo_ge_footer.gif" width="49" height="46" alt="GE Appliances" title="GE Appliances" style="float: left;" />';
	footerHTML +=  '                <ul style="position: relative;" class="floatLeft">';
	footerHTML +=  '                    <li><a href="/site_map.htm">Site Map</a></li>';
	footerHTML +=  '                    <li><a href="/plcy/tandc2.htm" target="_blank" onclick="openTermsPopup(this.href); return false;">Terms </a></li>';
	footerHTML +=  '                    <li><a href="/privacy/privacy_policy.htm" target="_blank" onclick="openPrivacyPolicyPopup(this.href); return false;">Privacy Policy</a></li>';
	footerHTML +=  '                    <li><a href="/privacy/cookie_disclosure.htm" target="_blank" onclick="openPrivacyPolicyPopup(this.href); return false;">Cookie Disclosure</a></li>';
	footerHTML +=  '                    <li><a href="/plcy/newsletter/newsletter_signup.htm" target="_blank">Newsletter</a></li>';
	footerHTML +=  '                    <li><a href="/service_and_support/contact/">Contact Us</a></li>';
	footerHTML +=  '                </ul>';
	footerHTML +=  '            </div>';
	footerHTML +=  '            <div id="copyright" class="floatRight" style="text-align:right;">';
	footerHTML +=  '                &copy; Copyright ';
	footerHTML += String((new Date()).getFullYear());
	footerHTML +=  '                General Electric Company';
	footerHTML +=  '            </div>';
	footerHTML +=  '            <div style="clear: both;"></div>';
	footerHTML +=  '        </div>';
	footerHTML +=  '    </div> ';

	if (isOnGEAppliancesPage()) {
		if (document.getElementById("document")) {
			footerHTML +=  '<table style="display: none;"><!-- This must stay intact since every page closes a table -->';
			footerHTML +=  '<tr>';
			footerHTML +=  '<td>';
		}
	}

	if (isOnGEAppliancePartsPage()) {
		//--------------------------------------------------------------
		// Get out of <div class="mainBody"> (and don't get back in);
		// this is required for certain aspects of the footer styles to
		// work properly.
		// --------------------------------------------------------------
		context = getDocumentWriteContext();
		if (context && context.nodeType === 1 /* ELEMENT_NODE */ && context.tagName && String(context.tagName).toLowerCase() === "div" && /\bmainBody\b/.test(context.className)) {
			/*jslint evil: true */
			document.write("</div>");
		}

		//--------------------------------------------------------------
		// Get out of any <div class="document"> elements (and get back
		// into them later just in case any HTML after the footer
		// happens to rely on being in those div's).  This is also
		// required for certain aspects of the footer styles to work
		// properly.
		// --------------------------------------------------------------
		context = getDocumentWriteContext();
		if (context && context.nodeType === 1 /* ELEMENT_NODE */ && context.tagName && String(context.tagName).toLowerCase() === "div" && /\bdocument\b/.test(context.className)) {
			document.write("</div>");
			getIn = "<div class='" + context.className + "'>" + getIn;
			context = getDocumentWriteContext();
			if (context && context.nodeType === 1 /* ELEMENT_NODE */ && context.tagName && String(context.tagName).toLowerCase() === "div" && /\bdocument\b/.test(context.className)) {
				document.write("</div>");
				getIn = "<div class='" + context.className + "'>" + getIn;
			}
		}
	}

	// Spanish "Easy Link" functionality. MITR# 839381 and 906171
	// footerHTML +=  '<script type="text/javascript" id="mpelid" src="//espanol.geappliances.com/mpel/mpel.js"></script>';

	// modifies attributes like the following:
	//   src="/images/..."
	//   href="/foo/bar/..."
	//   (must start with / to be modified)
	// but leaves alone attributes like the following:
	//   src="//www.example.com/images/..."
	//   href="//www.example.com/foo/bar/..."
	//   src="anything://www.example.com/images/..."
	//   href="anything://www.example.com/foo/bar/..."
	footerHTML = footerHTML.replace(/src=\"\/(?!\/)/g, 'src="' + Base_Href + '/');
	footerHTML = footerHTML.replace(/href=\"\/(?!\/)/g, 'href="' + UnSecure_Base_Href + '/');
	footerHTML = footerHTML.replace(/value=\"\/(?!\/)/g, 'value="' + UnSecure_Base_Href + '/');

	/*jslint evil: true */
	document.write(footerHTML);
	document.write(getIn);
	/*jslint evil: false */

	if (isOnGEAppliancesPage()) {
		/*jslint evil: true */
		document.write("<script type='text/javascript' src='" + Base_Href + "/scripts/baynote_observer.js'></script>");
	}

	$(function() {
		function changeHandler() {
			var url = $(this).val(); // get selected value
			if (url) { // require a URL
				window.location = url; // redirect
			}
			return false;
		}
		if (jQuery.fn.on) {
			$('#dynamic_select').on('change', changeHandler);
		} else {
			$('#dynamic_select').bind('change', changeHandler);
		}
	});

}(jQuery));

