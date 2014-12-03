FSR.surveydefs = [{
    site: 'kmart',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    tracker: {
        url: 'k_tracker.html'
    },
    lock: 1,
    criteria: {
        sp: 3,
        lf: 3
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
        siteLogo: "k_sitelogo.gif",

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
            urls: [/calculation/i, '/s/FetchBilling', '/s/FetchOrderDetail'],
            referrers: [],
            userAgents: ['SHC Automation'],
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
        timeout: 5,
        adjust: false,
        alert: {
            enabled: true,
            message: 'The survey is now available.'
        },
        url: 'k_tracker.html'
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
                patterns: [/OrderConfirmationRedesignView/i]
            }
        }
    },

    previous: false,

    analytics: {
        google_local: false,
        google_remote: false
    },

    cpps: {
        usrSessionID: {
            source: 'cookie',
            name: 'JSESSIONID'
        }},

    mode: 'hybrid'
};