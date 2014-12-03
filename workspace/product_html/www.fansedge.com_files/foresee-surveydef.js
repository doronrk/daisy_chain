FSR.surveydefs = [{
    site: 'nflshop.com',
    name: 'browse',
    invite: {
        when: 'onentry',
        siteLogo: "sitelogo_nfl.gif"
    },
    tracker: {
        url: 'tracker_nfl.html'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 7,
        lf: 5
    },
    include: {
        urls: ['.']
    }
},
{
    site: 'fansedge.com',
    name: 'browse',
    invite: {
        when: 'onentry',
        siteLogo: "sitelogo.gif"
    },
    tracker: {
        url: 'tracker_fansedge.html'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 10,
        lf: 4
    },
    include: {
        urls: ['.']
    }
},
{
    site: 'fanatics.com',
    name: 'browse',
    invite: {
        when: 'onentry',
        siteLogo: "sitelogo_fan.gif"
    },
    tracker: {
        url: 'tracker_fan.html'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 1.5,
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

        // Is this an MDOT Site?
        isMDOT: false,

        // Is this site zoomable? (aka pinch-able)
        isZoomable: false,

        // For no site logo, comment this line:
        siteLogo: "sitelogo.gif",

        /* Desktop */
        dialogs: [{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback"

        }],

        exclude: {
            local: ['/cart/view', '/checkout/login', '/checkout/address', '/checkout/payment', 'go=MyAccount', 'lt=checkout&ctl=CheckoutStart', 'lt=checkout&ctl=OrderConfirmation'],
            referrer: []
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
        footer: '<div div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
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
        custom: {}
    },

    previous: false,

    analytics: {
        google_local: false,
        google_remote: false
    },

    cpps: {},

    mode: 'first-party'
};
