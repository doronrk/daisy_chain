FSR.surveydefs = [{
    name: 'browse-tablet',
    platform: 'tablet',
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your tablet experience?",
            attribution: "Conducted by ForeSee.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll help"
        }], [{
            reverseButtons: false,
            headline: "Thank you for helping!",
            blurb: "Please provide your email address or mobile number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.",
            attribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
            declineButton: "Cancel",
            acceptButton: "email/text me",
            mobileExitDialog: {
                support: "b", //e for email only, s for sms only, b for both
                inputMessage: "email or mobile number",
                emailMeButtonText: "email me",
                textMeButtonText: "text me",
                fieldRequiredErrorText: "Enter a mobile number or email address",
                invalidFormatErrorText: "Format should be: name@domain.com or 123-456-7890"
            }
        }]]
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 75,
        lf: 2
    },
    include: {
        urls: ['lg.com/us', 'usstore.lg.com']
    }
}, {
    name: 'browse',
    section: 'purchase',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later',
		what: 'qualifier'
    },
    criteria: {
        sp: 100,
        lf: 1
    },
    include: {
        urls: ['id=ThankYouPage']
    }
}, {
    name: 'browse',
    section: 'mylg',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later',
		what: 'qualifier'
    },
    criteria: {
        sp: 100,
        lf: 1
    },
    include: {
        urls: ['/support/mylg']
    }
}, {
    name: 'browse',
    section: 'support',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later',
		what: 'qualifier'
    },
    criteria: {
        sp: 35,
        lf: 3
    },
    include: {
        urls: ['/support']
    }
}, {
    name: 'browse',
    section: 'us_main',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later',
		what: 'qualifier'
    },
    criteria: {
        sp: 75,
        lf: 3
    },
    include: {
        urls: ['lg.com/us', 'usstore.lg.com']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {
        name: 'IPERCEPTIONS_526',
        domain: 'lg.com',
        path: '/',
        value: 'IPRCEPTIONS_526_COOKIE',
        persistent: false
    },
    
    language: {
        locale: 'en'
    },
    
    exclude: {
        cookies: [{
            name: 'IPERCEPTIONS_526',
            value: 'IPRCEPTIONS_526_COOKIE'
        }]
    },
    
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
            urls: ['usstore.lg.com(?!(.)*ThankYouPage(.)*)', 'sign-in.jsp', 'join-my-lg.jsp', 'support-message.jsp', 'forgot-username-password.jsp'],
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
        entry: true,
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
        custom: {}
    },
    
    previous: false,
    
    analytics: {
        google_local: false,
        google_remote: false
    },
    
    cpps: {
        mylg: {
            source: 'url',
            init: 'N',
            patterns: [{
                regex: '/support/mylg',
                value: 'Y'
            }]
        },
        G2_See: {
            source: 'url',
            init: 'N',
            patterns: [{
                regex: '/mobile-phones/g2',
                value: 'Y'
            }]
        },
        pageName_last: {
            source: 'variable',
            name: 's.pageName'
        },
        campaign: {
            source: 'variable',
            name: 's.campaign'
        }
    },
    
    mode: 'first-party'
};
