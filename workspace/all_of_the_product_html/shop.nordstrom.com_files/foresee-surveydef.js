(function(){

    var FSR;

    // Do we support AMD?
    var supports_amd =
        typeof(window.define) === 'function' && window.define.amd &&
            (!window.FSR || window.FSR.supportsAMD);

    if(!supports_amd)
        FSR = window.FSR;
    else
        FSR = {};

    FSR.surveydefs = [{
    name: 'mobile_web',
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Can we email you later a brief customer satisfaction survey so we can improve your mobile experience?",
            attribution: "Conducted by ForeSee.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll help",
            locale: "en"
        }], [{
            reverseButtons: false,
            headline: "Thank you for helping!",
            blurb: "Please provide your email address. After your visit we'll send you a link to the survey.",
            attribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
            declineButton: "Cancel",
            acceptButton: "email me",
            locale: "en",
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
    platform: 'phone',
    pop: {
        when: 'later'
    },
    criteria: {
        sp: [6, 6],
        lf: 2
    },
    include: {
        urls: ['.']
    }
}, {
    name: 'tablet',
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Can we email you later a brief customer satisfaction survey so we can improve your mobile experience?<br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br />Nordstrom's <a class='fsrPrivacy' href='http://shop.nordstrom.com/c/nordstrom-privacy?origin=footer' target='_blank'>Privacy Policy</a>",
            attribution: "Conducted by ForeSee.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll help"
        }], [{
            reverseButtons: false,
            headline: "Thank you for helping!",
            blurb: "Please provide your email address. After your visit we'll send you a link to the survey.<br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br />Nordstrom's <a class='fsrPrivacy' href='http://shop.nordstrom.com/c/nordstrom-privacy?origin=footer' target='_blank'>Privacy Policy</a><br /><br />",
            attribution: "Conducted by ForeSee.",
            declineButton: "Cancel",
            acceptButton: "email me",
            locale: "en",
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
    platform: 'tablet',
    pop: {
        when: 'later'
    },
    criteria: {
        sp: [10, 30],
        lf: 2
    },
    include: {
        urls: ['.']
    }
}, {
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: [0, 30],
        lf: 2
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en'
    },
    
    exclude: {
        userAgents: ['GomezAgent'],
        variables: [{
            name: 'strIP',
            value: [/^10\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}$/, /^64\.213\.38\.[\d]{1,3}$/, /^65\.203\.288\.[\d]{1,3}$/, /^161\.181\.[\d]{1,3}\.[\d]{1,3}$/, /^192\.168\.[\d]{1,3}\.[\d]{1,3}$/, '38.112.225.71', '38.112.225.84', '172.16.1.3']
        }, {
          name: 'PageParameters.tto.internalCustomer',
          value: ['true']
        }, {
          name: 'nord.config.settings.tto.internalCustomer',
          value: ['true']
        }, {
          name: 'PageParameters.userIPAddress',
          value: ['161.181.53.10','161.181.53.20']
        }, {
          name: 'nord.config.settings.shopper.ipAddress',
          value: ['161.181.53.10','161.181.53.20']
        }]
    },
    
    /* Invite branding sample property
     brands : [{"c":"Foresee","p":33}, {"c":"Answers", "p":33}, {"c":"ForeseeByAnswers", "p":33}],
     */
    zIndexPopup: 10000,
    
    ignoreWindowTopCheck: false,
    
    ipexclude: 'strIP',
    
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
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting. <a class='fsrPrivacy' href='http://shop.nordstrom.com/c/nordstrom-privacy?origin=footer' target='_blank'>Nordstrom's Privacy Policy</a>",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            error: "Error",
            warnLaunch: "this will launch a new window"

        }]],

        exclude: {
            urls: ['about.nordstrom.com', 'secure.nordstrom.com', 'about.dev.nordstrom.com', 'secure.dev.nordstrom.com'],
            referrers: [],
            userAgents: [],
            browsers: [],
            cookies: [],
            variables: []
            // [name (content), http-equiv (content), itemprop (content),  charset] possible attributes for meta tag element http://devdocs.io/html/meta
            // metas:[{"name":{"key":"value", "content":"value"}}, {"http-equiv":{"key":"value", "content":"value"}}, {"itemprop":{"key":"value", "content":"value"}}, {"charset":{"key":"value"}}]
        
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
        url: 'tracker.asp'
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
        referrer: false,
        terms: false,
        ref_url: false,
        url: false,
        url_params: false,
        user_agent: false,
        entry: false,
        entry_params: false,
        viewport_size: false,
        document_size: false,
        scroll_from_top: false,
        invite_URL: false
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
      shopperID: {
        source: 'variable',
        name: 'nord.config.settings.shopper.id',
        init: ''
      },
      sessionID: {
        source: 'variable',
        name: 'nord.config.settings.shopper.sessionId',
        init: ''
      }
    },
    
    mode: 'first-party'
};


    if(supports_amd)
        define(function(){ return FSR; })
})();
