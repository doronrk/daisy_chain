/*
OnlineOpinion v5.8.2
Released: 02/27/2014. Compiled 04/23/2014 09:51:37 AM -0500
Branch: CLIENTREQ-219 Apr
Components: Full
UMD: disabled
The following code is Copyright 1998-2014 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com
*/

/*
Define Paths to HTML Assets.
You must update the pathToAssets value to properly reflect
where you hosted the HTML invite assets.
They must be hosted locally to the domain you execute the code on.
*/
var pathToAssets = '/onlineopinionV5/',
    invitePercent = 75,
    rp = '://invitation.',
    fd = ['http://' + window.location.hostname, 'https://' + window.location.hostname],
    cv = {};

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

/* Run the Invitation instance */
window.oo_invite = new OOo.Invitation({

    // REQUIRED - Asset identification
    pathToAssets: pathToAssets,

    // Percent of users served. Leave at 100 for testing
    responseRate: invitePercent,

    // Duration of cookie set for repeat visitors - 90 days
    repromptTime: 7776000,

    // Number of pages before invite prompt
    pagesHit: 2,

    // Number of seconds to delay prompt on 2nd page
    promptDelay: 0,

    // End of visit comment card
    popupType: 'popunder',

    // Advanced Survey Module
    asm: 1,

    // Change asm: 2 to pass your own survey window dimensions
//    newWindowSize: [400,400],

    // Logo for invitation prompt
//    companyLogo: '/onlineopinionV5/logo.gif',

    // Prepend invitation to domain
    referrerRewrite: {
        searchPattern: /:\/\//,
        replacePattern: rp
    },

    // friendly domains defined above
    friendlyDomains: fd,

    // custom variables defined above
    customVariables: cv
});
