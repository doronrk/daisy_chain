FSR.surveydefs = [{
    site: 'sears',
    name: 'tablet_web',
    platform: 'tablet',
    invite: {
        when: 'onentry',
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your mobile experience?",
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
        sp: 50,
        lf: 2
    },
    include: {
        urls: ['.']
    }
}, {
    site: 'sears',
    name: 'checkout',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    pin: 1,
    tracker: {
        url: 's_tracker.html'
    },
    criteria: {
        sp: 75,
        lf: 1
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['PayPal']
        }]
    },
    include: {
        urls: ['/s/CheckOutLoginView', '/s/Calculation', '/s/FetchBilling', '/s/FetchOrderDetail']
    }
}, {
    site: 'sears',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    lock: 1,
    tracker: {
        url: 's_tracker.html'
    },
    criteria: {
        sp: 7,
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
        siteLogo: "s_sitelogo.gif",
        siteLogoAlt: "",
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting Sears.com. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of Sears customer experience team.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback"
        }]],

        exclude: {
            urls: [/calculation/i, '/s/FetchBilling', '/s/FetchOrderDetail','CheckOutLoginView'],
            referrers: [],
            userAgents: ['SHC Automation'],
            browsers: [],
            cookies: [{
			name: 'isDelver',
			value: 'Y'}
			],
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
        url: 'invite-mobile.html',
        back: 'url'
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
        url: 's_tracker.html'
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
        custom: {
            purchase: {
                enabled: true,
                repeat: false,
                source: 'url',
                patterns: [/OrderConfirmationRedesignView/i, /OrderConfirmationDisplayView/i]
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
        }
    },

    mode: 'hybrid'
};