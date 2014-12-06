/*
OnlineOpinion v5.8.2
Released: 02/27/2014. Compiled 04/23/2014 09:51:37 AM -0500
Branch: CLIENTREQ-219 Apr
Components: Full
UMD: disabled
The following code is Copyright 1998-2014 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com
*/

var cv = {};

if (window.location.hostname.search(/us\./) > -1) {
    cv = {
        s_vi: OOo.readCookie('s_vi'),
        customerID: typeof s !== 'undefined' ? s.eVar20 : '',
        webstoreOrderID: typeof s !== 'undefined' ? s.eVar16 : '',
        internalCC: typeof s !== 'undefined' ? s.eVar1 : '',
        orderValue: typeof s !== 'undefined' ? s.eVar9 : '',
        referringMedium: typeof s !== 'undefined' ? s.prop4 : '',
        pageName: typeof s !== 'undefined' ? s.pageName : '',
        siteSection: typeof s !== 'undefined' ? s.channel : '',
        products: typeof s !== 'undefined' ? s.products : '',
        pageType: typeof s !== 'undefined' ? s.prop2 : '',
        prevPageName: typeof s !== 'undefined' ? s.prop15 : '',
        currPageName: typeof s !== 'undefined' ? s.prop14 : '',
        markTrackCodes: typeof s !== 'undefined' ? s.campaign : ''
    }
} else {
    cv = {
        bdId: OOo.readCookie('bdID')
    }
}

/* Inline feedback object */
window.oo_feedback = new OOo.Ocode({
    customVariables: cv
});
