FSR.surveydefs = [{
    name: 'mobile',
    repeatdays: 90,
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your mobile experience?",
            attribution: "Conducted by ForeSee.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll help",
            error: "Error"
        }], [{
            reverseButtons: false,
            headline: "Thank you for helping!",
            blurb: "Please provide your email address. After your visit we'll send you a link to the survey. Your email will only be used for delivering the survey and will be discarded afterwards.",
            attribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
            declineButton: "Cancel",
            acceptButton: "email/text me",
            error: "Error",
            mobileExitDialog: {
                support: "e", //e for email only, s for sms only, b for both
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
    pin: 1,
    criteria: {
        sp: [15, 15],
        lf: 3
    },
    cancel: {
        url: 'cancel.html'
    },
    include: {
        urls: ['.']
    },
    platform: 'phone'
}, {
    name: 'tablet',
    repeatdays: 90,
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your mobile experience?",
            attribution: "Conducted by ForeSee.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll help",
            error: "Error"
        }], [{
            reverseButtons: false,
            headline: "Thank you for helping!",
            blurb: "Please provide your email address. After your visit we'll send you a link to the survey.",
            attribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
            declineButton: "Cancel",
            acceptButton: "email me",
            error: "Error",
            mobileExitDialog: {
                support: "e", //e for email only, s for sms only, b for both
                inputMessage: "email",
                emailMeButtonText: "email me",
                textMeButtonText: "text me",
                fieldRequiredErrorText: "Enter an email address",
                invalidFormatErrorText: "Format should be: name@domain.com"
            }
        }]]
    },
    pop: {
        when: 'later'
    },
    pin: 1,
    criteria: {
        sp: [25, 25],
        lf: 3
    },
    cancel: {
        url: 'cancel.html'
    },
    include: {
        urls: ['.']
    },
    platform: 'tablet'
}, {
    name: 'browse',
    repeatdays: [90, 21],
    section: 'b2b',
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting the Samsung Business Solutions website. You have been selected to participate in a brief business customer survey to let us know how we can improve the website and make for a better business customer experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            error: "Error",
            warnLaunch: "this will launch a new window"
        
        }]]
    },
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    qualifier: {
        url: 'qualifying_b2b.html'
    },
    pin: 1,
    criteria: {
        sp: [100, 100],
        lf: 2
    },
    cancel: {
        url: 'cancel.html'
    },
    include: {
        urls: ['/business', '/it_solutions', '/printersolutions/#home']
    },
    platform: 'desktop'
}, {
    name: 'browse',
    repeatdays: 90,
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    criteria: {
        sp: [0, 75],
        lf: 3
    },
    cancel: {
        url: 'cancel.html'
    },
    
    include: {
        urls: ['.']
    },
    links: {
        attach: [{
            tag: 'a',
            attribute: 'href',
            patterns: ['/us/support/register/product'],
            sp: 6,
            when: 'later'
        }]
    },
    platform: 'desktop'
}];
FSR.properties = {

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
            urls: ['ThankYouPage', 'shop.us.samsung.com', 'gc.digitalriver.com', '/us/support/contact', '/us/support/register/product', '/us/support/email/product/', '/registrations', '/us/aboutsamsung', '/us/news', 'checkout.do', 'addtocart.do', 'modifyitem.do', 'payment.do'],
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
        height: 600,
        host: "www.foreseeresults.com"
    },
    
    qualifier: {
        footer: '<div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
        width: '690',
        height: '700',
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
        custom: {}
    },
    
    previous: false,
    
    analytics: {
        google_local: false,
        google_remote: false
    },
    
    cpps: {
        opSupportCreative: {
            source: 'cookie',
            name: 'opSupportCreative'
        },
        Paid_Channel: {
            source: 'parameter',
            name: 'cid'
        },
        Purchase_Program: {
            source: 'cookie',
            name: 'tmktname',
            init: 'N'
        }
    },
    
    mode: 'first-party'
};
