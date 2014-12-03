FSR.surveydefs = [{
    name: 'tablet',
	    invite: {
        when: 'onentry',
        isMDOT: false,
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your mobile experience?",
            attribution: "Conducted by ForeSee.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll help",
            locale: "en"
        }], [{
            reverseButtons: false,
            headline: "Thank you for helping!",
            blurb: "Please provide your email address or phone number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.<br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br /><br />",
            attribution: "Conducted by ForeSee.",
            declineButton: "Cancel",
            acceptButton: "email/text me",
            locale: "en",
            mobileExitDialog: {
                support: "b", //e for email only, s for sms only, b for both
                inputMessage: "email or phone number",
                emailMeButtonText: "email me",
                textMeButtonText: "text me",
                fieldRequiredErrorText: "Enter a phone number or email address",
                invalidFormatErrorText: "Format should be: name@domain.com or 123-456-7890"
            }
        }]]
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 30,
        lf: 3
    },
    platform: 'tablet',
	    include: {
        urls: ['.']
    }
},{
    name: 'browse',
	section: 'checkout_photo',
    pop: {
        when: 'later'
    },
    pin: 1,
    criteria: {
    	sp :0,
		lf :1
    },
    include: {
        urls: ['/searchstore/', '/billinginfo/',
				'/reviewpickuporder/', '/editshipping/',
				'/editshipping/mode=ship/']
    }
},{
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
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
    
        // For no site logo, comment this line:
        siteLogo: "sitelogo.gif",
        
        //alt text fore site logo img
        siteLogoAlt: "",
        
        /* Desktop */
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd like your feedback.",
            blurb: "Thank you for visiting our site. You are among a select group chosen to participate in a survey that will shape the future of Walgreens.com.<br><br>This is your chance to tell us exactly what you think, good or bad.<br><br>ForeSee, an independent company, will conduct the survey on behalf of Walgreens.<br><br>Once you have chosen to participate, a small window will open in the background. The survey will begin after you leave the site.<br>(Note: Firefox users will need to switch to the survey window to begin.)<br><br>Would you like to take the survey?",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback"
        
        }]],
        
        exclude: {
            urls: ['pharmacy\/history(?!(.)*prescriptionhist(.)*)',
					'checkout(?!(.)*confirmorder(.)*)',
					'pharmacy\/register(?!(.)*thankyou(.)*)', '/hipaa/',
					'/messaging/', '/messaging/psm/', '/pharmacy/autoorder/',
					'/pharmacy/healthcard/', '/pharmacy/history/',
					'/pharmacy/immunization/', '/pharmacy/immunization/',
					'/pharmacy/insurance/', '/pharmacy/order/',
					'/pharmacy/pin', '/pharmacy/report/', 'login.jsp'],
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
        url: 'invite-mobile.jsp',
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
        url: 'tracker.jsp'
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
        url: 'qualifying.jsp'
    },
    
    cancel: {
        url: 'cancel.jsp',
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
        AB_test: {
            source: 'parameter',
            name: 'FSRtt'
        },
		AB_test2: {
            source: 'variable',
            name: 'FSRtt2'
        }

    },
    
    mode: 'first-party'
};
