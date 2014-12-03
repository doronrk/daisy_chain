FSR.surveydefs = [{
    name: 'browse',
    site: 'gbyguess',
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting gbyguess.com. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            error: "Error",
            warnLaunch: "this will launch a new window"
        }]],
        siteLogo: "logo-gby.gif"
    },
    tracker: {
        url: 'tracker_gby.html'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 25,
        lf: 3
    },
    include: {
        urls: ['gbyguess.com']
    }
}, {
    name: 'browse',
    site: 'factory',
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting guessfactory.com. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            error: "Error",
            warnLaunch: "this will launch a new window"
        }]],
        siteLogo: "logo-guessfactory.gif"
    },
    tracker: {
        url: 'tracker_f.html'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 25,
        lf: 3
    },
    include: {
        urls: ['guessfactory.com']
    }
}, {
    name: 'browse',
    site: 'marciano',
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting guessbymarciano.com. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            error: "Error",
            warnLaunch: "this will launch a new window"
        }]],
        siteLogo: "logo-marciano.gif"
    },
    tracker: {
        url: 'tracker_m.html'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 25,
        lf: 2
    },
    include: {
        urls: ['guessbymarciano']
    }
}, {
    name: 'browse',
    site: 'main',
    invite: {
        when: 'onentry',
		siteLogo: "logo-guess.gif"
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 50,
        lf: 3
    },
    include: {
        urls: ['guess.com']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en'
    },
    
    exclude: {},
    
    zIndexPopup: 10000,
    
    ignoreWindowTopCheck: false,
    
    ipexclude: 'fsr$ip',
    
    mobileHeartbeat: {
        delay: 60, /*mobile on exit heartbeat delay seconds*/
        max: 3600 /*mobile on exit heartbeat max run time seconds*/
    },
    
    invite: {
    
        // For no site logo, comment this line:
        siteLogo: "sitelogo.gif",
        
        //alt text fore site logo img
        siteLogoAlt: "",
        
        /* Desktop */
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            error: "Error",
            warnLaunch: "this will launch a new window"
        }]],
        
        exclude: {
            urls: [/\/checkout/i, /\/account\//i, /\/shoppingbag/i, /\/order\/receipt\//i, /\/subscription/i, /\/termsandconditions/i, /\/privacypolicy/i],
            referrers: [],
            userAgents: [],
            browsers: [],
            cookies: [],
            variables: []
        },
        include: {
            local: ['.']
        },
        
        delay: 0,
        timeout: 0,
        
        hideOnClick: false,
        
        hideCloseButton: false,
        
        css: 'foresee-dhtml.css',
        
        hide: [],
        
        hideFlash: false,
        
        type: 'dhtml',
        /* desktop */
        // url: 'invite.html'
        /* mobile */
        url: 'invite-mobile.html',
        back: 'url'
    
        //SurveyMutex: 'SurveyMutex'
    },
    
    tracker: {
        width: '690',
        height: '415',
        timeout: 3,
        adjust: true,
        alert: {
            enabled: true,
            message: 'The survey is now available.'
        },
        url: 'tracker.html'
    },
    
    survey: {
        width: 690,
        height: 600
    },
    
    qualifier: {
        footer: '<div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
        width: '690',
        height: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        url: 'qualifying.html'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '690',
        height: '400'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    meta: {
        referrer: true,
        terms: true,
        ref_url: true,
        url: true,
        url_params: false,
        user_agent: false,
        entry: false,
        entry_params: false
    },
    
    events: {
        enabled: true,
        id: true,
        codes: {
            purchase: 800,
            items: 801,
            dollars: 802,
            followup: 803,
            information: 804,
            content: 805
        },
        pd: 7,
        custom: {
            purchase: {
                enabled: true,
                repeat: false,
                source: 'url',
                patterns: [/\/order\/receipt\//i]
            }
        }
    },
    
    previous: false,
    
    analytics: {
        google_local: false,
        google_remote: false
    },
    
    cpps: {
        Email_Campaign: { //this will be the name of the cpp
            init: 'N',
            source: 'variable',
            name: 'DCMP' //the value sent will be the value of the parameter
        },
        External_Campaign: {
            init: 'N',
            source: 'variable',
            name: 'CMP'
        },
        Loyalty: {
            init: 'N',
            source: 'function',
            value: function(){
                var out = "";
                if (typeof dataLayer != 'undefined' && dataLayer != null && typeof dataLayer[0] != 'undefined' && dataLayer[0] != null) {
                    out += dataLayer[0].visitorLoyalty;
                }
                return out;
            }
        },
        Order_ID: {
            init: 'N',
            source: 'function',
            value: function(){
                var out = "";
                if (typeof dataLayer != 'undefined' && dataLayer != null && typeof dataLayer[0] != 'undefined' && dataLayer[0] != null) {
                    out += dataLayer[0].orderId;
                }
                return out;
            }
        },
        Logged_Status: {
            source: 'function',
            value: function(){
                var out = "";
                if (typeof dataLayer != 'undefined' && dataLayer != null && typeof dataLayer[0] != 'undefined' && dataLayer[0] != null) {
                    out += dataLayer[0].visitorSignedIn;
                }
                return out;
            }
        }
    },
    
    mode: 'first-party'
};