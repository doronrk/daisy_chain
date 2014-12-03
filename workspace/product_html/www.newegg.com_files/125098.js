/*
OnlineOpinion v5.7.6
Released: 10/01/2013. Compiled 10/01/2013 11:54:52 AM -0500
Branch: master ae5eff31bfa9c332359238010da3e0d3fb05d5c2
Components: Full
UMD: disabled
The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/


/* Run the Invitation instance */
new OOo.Invitation({
/* REQUIRED - Asset identification */
    pathToAssets: 'http://www.newegg.com/promotions/ooresource/'
/* OPTIONAL - Configuration */
    , responseRate: .5
    , repromptTime: 7776000
    , asm:2
    , newWindowSize: [800, 600] // The width (800) and height (600) dimensions of the survey pop up
    , promptDelay: 3
    , popupType: 'popunder'
//  , companyLogo: '/onlineopinionV5/logo.gif'  // 355px by 55px
    , referrerRewrite: {
          searchPattern: /:\/\/[^\/]*/  
        , replacePattern: '://invite.newegg.com'
    }
    , neverShowAgainButton: true
    , customVariables: {
        UTMA: Web.StateManager.Cookies.get(Web.StateManager.Cookies.Name.UTMA)
        , NVTC: Web.StateManager.Cookies.get(Web.StateManager.Cookies.Name.NVTC)
    }
});