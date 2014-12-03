/*
OnlineOpinion v5.7.3
Released: 6/4/2013. Compiled 06/04/2013 08:37:25 AM -0500
Branch: master 122a760d8e979af7090004b5d3cb086d5b0896be
Components: Full
The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/
if(typeof opinionLabOrderId != 'undefined'){
	var oo_orderComplete = new OOo.Ocode({
		customVariables: {
		  coreID6: OOo.readCookie('CoreID6')
		, timestamp: new Date().getTime()
		, orderId: opinionLabOrderId
		, email: opinionLabEmail
		, total: opinionLabTotal
		, promotion: opinionLabPromoAmount
		, giftWrap: opinionLabGiftWrapTotal
		, numberOfItems: opinionLabNumberOfItems
	  }, referrerRewrite: {
          searchPattern: /:\/\/[^\/]*/
        , replacePattern: '://online.postpurchasesurvey.dillards.com'
      }
	});
}
/*global window, document, OOo*/
(function (w, d, o) {
    'use strict';

    /* Shim Date.now() for older browsers */
    if (!Date.now) {
        Date.now = function() { return new Date().getTime(); };
    }

    var OpinionLabInit = function () {

        var tStamp = Date.now(),
            tab_cust = d.createElement('div'),
            tab_div  = d.createElement('div'),
            regSpan  = d.createElement('span'),
            waypoint = d.createElement('div');

        waypoint.onclick = function () {
            o.hideWaypoint();
        };
        

        waypoint.innerHTML ='<div id="oo_waypoint_container"><div id="oo_waypoint_content"><div id="oo_w_header">We value your opinion...</div><div class="close"></div>' +
            '<div id="oo_waypoint_content_1">' +
                '<a href="javascript:void(0)" class="oo_waypoint_button" onClick="OOo.oo_website_fb.show()">Website Feedback</a>' +
            '</div>' +
            '<div id="oo_waypoint_content_2">' +
                '<a href="javascript:void(0)" class="oo_waypoint_button" onClick="OOo.oo_store_fb.show()">Store Feedback</a>' +
            '</div>' +
            '<div id="oo_waypoint_content_3">' +
                '<a href="javascript:void(0)" class="oo_waypoint_button" onClick="OOo.oo_product_fb.show()">Product Feedback</a>' +
            '</div>' +
            '</div>' +
            '<div id="oo_waypoint"></div>';

        tab_cust.id = 'oo_tab';
        tab_cust.className = 'oo_tab_right';
        tab_cust.style.index = '0';

        tab_cust.onclick = function () {
            o.showWaypoint();
        };
        
		if(!document.domain.match("^m")){
			d.body.appendChild(tab_cust);
			tab_cust.appendChild(tab_div);
			tab_cust.appendChild(regSpan);
		}
       
        /* Product feedback object */
        o.oo_product_fb = new o.Ocode({
            referrerRewrite: {
                searchPattern: /:\/\/[^\/]*/,
                replacePattern: '://product.waypoint.dillards.com'
            },
            customVariables: {
                coreID6: o.readCookie('CoreID6'),
                timestamp: tStamp
            }
        });

        /* Store feedback object */
        o.oo_store_fb = new o.Ocode({
            referrerRewrite: {
                searchPattern: /:\/\/[^\/]*/,
                replacePattern: '://store.waypoint.dillards.com'
            },
            customVariables: {
                coreID6: o.readCookie('CoreID6'),
                timestamp: tStamp
            }
        });

        /* Website feedback object */
        o.oo_website_fb = new o.Ocode({
            customVariables: {
                coreID6: o.readCookie('CoreID6'),
                timestamp: tStamp
            }
        });

        o.hideWaypoint = function () {
            d.body.removeChild(waypoint);
        };

        o.showWaypoint = function () {
            d.body.appendChild(waypoint);
        };

    };

    o.addEventListener(w, 'load', OpinionLabInit, false);

})(window, document, OOo);