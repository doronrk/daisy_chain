FSR.surveydefs = [{
    name: 'browse',
    invite: {
        when: 'onentry'
    },
	lock: 1,
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 0.7,
        lf: 3
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    language: {
        locale: 'en'
    },
    
	exclude: {
	},
	
    invite: {
        content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\"><b><font size=\"3\">We\'d like your feedback.</b></font><br><br>Thank you for visiting A�ropostale and P.S. from A�ropostale! You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.<br><br><b>The survey is designed to measure your entire site experience and will appear at the <u>end of your visit</u>.</b><br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee Results.</font><br></div></div></BODY></HTML>',
        //content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\"><b><font size=\"3\">We\'d like your feedback.</b></font><br><br>Thank you for visiting our site. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.<br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee Results.</font><br></div></div></BODY></HTML>', 
        exclude: {
            local: [],
            referrer: []
        },        
        include: {
            local: ['.']
        },
        
        width: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        timeout: 0,
        buttons: {
            accept: "Yes, I'll give feedback",
            decline: 'No thanks'
        },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        hide: []
    },
    
    tracker: {
        width: '500',
        height: '330',
        timeout: 3,
        adjust: true,
		alert: {
			enabled: true,
			message: 'The survey is now available.'
		},
        url: 'tracker.html'
    },
    
    survey: {
        width: 550,
        height: 600,
        loading: false
    },
    
    qualifier: {
        width: '625',
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
        css: false,
        url: 'qualifying.html'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
    },
    
    loading: {
        url: 'survey_loading.html'
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
        url_params: false
    },
    
    events: {
        enabled: true,
        id: true,
        codes: {
            purchase: 800,
            items: 801,
            dollars: 802
        },
        pd: 7,
        custom: {
           purchase: {
               enabled: true,
               repeat: false,
               source: 'url',
               patterns: [/\/checkout\/index.jsp\?process=thanks/]
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

    
    pool: 100,
    
    previous: false,
    
    analytics: {
        google: false
    },
    
    mode: 'first-party'
};
