FSR.surveydefs = [{
    site: 'toysrus.ca',
    name: 'browse',
    invite: {
        when: 'onentry',
        siteLogo: "sitelogo2.gif",
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            locales: {
                "fr_CA": {
                    reverseButtons: false,
                    headline: "Vos commentaires sont les bienvenus!",
                    blurb: "Merci de visiter notre site Web. Vous avez été sélectionné(e) pour participer à un court sondage sur la satisfaction de la clientèle pour nous aider à améliorer votre expérience.",
                    noticeAboutSurvey: "Ce sondage est conçu pour mesurer votre expérience dans son ensemble. Vous le trouverez à la <u>fin</u> de votre visite.",
                    attribution: "Ce sondage est mené par ForeSee, une entreprise indépendante, pour le compte du site que vous visitez.",
                    closeInviteButtonText: "Click to close.",
                    declineButton: "Non, merci.",
                    acceptButton: "Oui, je fournirai des commentaires."
                }
            }
        }]]
    },
    tracker: {
        url: 'tracker_en_CA.html',
        locales: [{
            locale: 'fr_CA',
            alert: {
                enabled: true,
                message: 'Votre sondage est maintenant disponible.'
            },
            url: 'tracker_fr_CA.html'
        }]
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 50,
        lf: 3,
        locales: [{
            locale: 'fr_CA',
            sp: 50,
            lf: 3
        }]
    },
    links: {
        cancel: [{
            tag: 'a',
            attribute: 'href',
            patterns: ['birthdaysrus.com', 'secure.ed4.net', 'firstusa.com', 'babiesrus.einvite.com', 'toysrus.einvite.com', 'toysrus.com/our/tru/prom/store_index.cfm', 'toysrus.com/investor/index.cfm', 'toysrusca.shoplocal.com', '207.245.252.195', 'toysruscanada.ca/eng/about.asp', 'toysruscanada.tms.hrdepartment.com']
        }]
    },
    include: {
        variables: [{
            name: ['subStore'],
            value: ['tru']
        }]
    }
}, {
    site: 'toysrus.com',
    name: 'checkout2',
    section: 'toys',
    pin: 1,
    invite: false,
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    criteria: {
        sp: 0,
        lf: 0
    },
    include: {
        urls: ['/checkout', '/cart']
    },
    links: {
        attach: [{
            tag: 'button',
            attribute: 'id',
            patterns: ['proceedToCheckout'],
            sp: 30,
            when: 'later'
        }],
        cancel: [{
            tag: 'button',
            attribute: 'class',
            patterns: ['sendOrder']
        },{
            tag: 'input',
            attribute: 'value',
            patterns: ['PAY_PAL']
        }, {
            tag: 'a',
            attribute: 'href',
            patterns: ['rewardsrus.toysrus.com', 'toysrus.cardways.com', 'birthdaysrus.com/grownups', 'toysrus.shoplocal.com', 'toysrusinc.com', 'babiesrus.einvite.com', 'toysrus.einvite.com', 'paypal.com', 'checkout.google.com', 'secure.ed4.net', 'firstusa.com']
        }]
    }
}, {
    site: 'toysrus.com',
    name: 'browse',
    section: 'babies',
    pin: 1,
    invite: {
        when: 'onentry'
    },
    lock: 1,
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 8,
        lf: 3
    },
    include: {
        variables: [{
            name: 'fsrSection',
            value: 'BRU'
        }]
    },
    links: {
        cancel: [{
            tag: 'a',
            attribute: 'id',
            patterns: ['googleCheckout']
        }, {
            tag: 'a',
            attribute: 'href',
            patterns: ['rewardsrus.toysrus.com', 'toysrus.cardways.com', 'birthdaysrus.com/grownups', 'toysrus.shoplocal.com', 'toysrusinc.com', 'babiesrus.einvite.com', 'toysrus.einvite.com', 'paypal.com', 'checkout.google.com', 'secure.ed4.net', 'firstusa.com']
        }]
    }
}, {
    site: 'toysrus.com',
    name: 'browse',
    section: 'toys',
    invite: {
        when: 'onentry'
    },
    lock: 1,
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 8,
        lf: 3
    },
    include: {
        variables: [{
            name: 'fsrSection',
            value: 'TRU'
        }]
    },
    links: {
        cancel: [{
            tag: 'a',
            attribute: 'id',
            patterns: ['googleCheckout']
        }, {
            tag: 'a',
            attribute: 'href',
            patterns: ['rewardsrus.toysrus.com', 'toysrus.cardways.com', 'birthdaysrus.com/grownups', 'toysrus.shoplocal.com', 'toysrusinc.com', 'babiesrus.einvite.com', 'toysrus.einvite.com', 'paypal.com', 'checkout.google.com', 'secure.ed4.net', 'firstusa.com']
        }]
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en',
        src: 'variable',
        type: 'client',
        name: 'locale',
        locales: [{
            match: 'fr_CA',
            locale: 'fr_CA'
        }]
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
            acceptButton: "Yes, I'll give feedback"
        
        }]],

        exclude: {
            urls: ['/checkout'],
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
            message: 'The survey is now available.',
            locales: [{
                locale: 'fr_CA',
                message: 'Votre sondage est maintenant disponible.'
            }]
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
        custom: {
            purchase: {
                enabled: true,
                repeat: false,
                source: 'url',
                patterns: [/checkout.jsp(?!(.))/]
            },
            items: {
                enabled: true,
                repeat: false,
                source: 'variable',
                name: 'item_quantity'
            },
            dollars: {
                enabled: true,
                repeat: false,
                source: 'variable',
                name: 'total_amount'
            }
        }
    },
    
    previous: false,
    
    analytics: {
        google_local: false,
        google_remote: false
    },
    
    cpps: {
        OrderID: {
            source: 'variable',
            name: 'OrderID'
        },
        ClientID: {
            source: 'variable',
            name: 'ClientID'
        }
    },
    
    mode: 'first-party'
};
