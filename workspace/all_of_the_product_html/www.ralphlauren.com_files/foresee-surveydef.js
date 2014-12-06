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
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 7,
        lf: 2,
        locales: [{
            locale: 'uk',
            sp: 10,
            lf: 2
        }/*,{
            locale: 'jp',
            sp: 10,
            lf: 2
        }*/]
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays : 90,

    repeatoverride : false,

    altcookie : {
    },

    language : {
    
        locale: 'en',
        src: 'location',
        locales: [{
            match: 'co.uk',
            locale: 'uk'
        }/*, {
            match: 'co.jp',
            locale: 'jp'
        }*/]
    },

    exclude : {
    },

    zIndexPopup : 10000,

    ignoreWindowTopCheck : false,

    ipexclude : 'fsr$ip',

    mobileHeartbeat : {
        delay : 60, /*mobile on exit heartbeat delay seconds*/
        max : 3600  /*mobile on exit heartbeat max run time seconds*/
    },

    invite : {

        // For no site logo, comment this line:
        siteLogo : "sitelogo.png",

        //alt text fore site logo img
		siteLogoAlt : "Ralph Lauren",

        /* Desktop */
        dialogs : [[{
            reverseButtons: true,
            headline: "WE WANT TO HEAR FROM YOU",
            blurb: "Help us improve your shopping experience at RalphLauren.com <br /> by taking a brief survey <b> at the end of your visit. </b>",
            noticeAboutSurvey: "",
            attribution: "",
            closeInviteButtonText: "Click to close.",
            declineButton: "NO, THANK YOU",
            acceptButton: "YES, I'LL SHARE FEEDBACK",
            error: "Error",
            warnLaunch: "this will launch a new window",

            locales: {
                "uk": {
                    reverseButtons: true,
                    headline: "WE WANT TO HEAR FROM YOU",
					blurb: "Help us improve your shopping experience at RalphLauren.co.uk <br /> by taking a brief survey <b> at the end of your visit. </b>",
            		noticeAboutSurvey: "",
           			attribution: "",
            		closeInviteButtonText: "Click to close.",
            		declineButton: "NO, THANK YOU",
            		acceptButton: "YES, I'LL SHARE FEEDBACK"
                }/*,
                "jp": {
                    reverseButtons: false,
                    headline: "私達はあなたから聞きたい。",
                    blurb: "弊社のウェブサイトをご覧いただき、ありがとうございます。このたび、お客様の体験を改善するプロジェクトの一環として、お客様の満足度に関するアンケートへのご案内を送信させていただきました。",
                    noticeAboutSurvey: "このアンケート調査はお客様の全体的な体験を測定することを目的としています。本サイトの閲覧終了時に<u>結果</u>をご覧ください。",
                    attribution: "このアンケート調査は、完全独立会社である ForeSee が、ご覧いただいているサイトを代表して実施します。",
                    closeInviteButtonText: "閉じる。",
                    declineButton: "いいえ、ありがとうございます",
                    acceptButton: "はい。調査に参加します"    
                }*/
            }
        }]],

        exclude : {
            urls: ['/cart/', '/checkout/index.jsp', '/search/', '/helpdesk/','/transparencyact/','/checkout.jsp','/searchHandler/','/giftCertificates/','login.jsp', 'register.jsp','/secure/'],
            referrers:[],
            userAgents:[],
            browsers:[],
            cookies:[],
            variables:[]
			// [name (content), http-equiv (content), itemprop (content),  charset] possible attributes for meta tag element http://devdocs.io/html/meta
            // metas:[{"name":{"key":"value", "content":"value"}}, {"http-equiv":{"key":"value", "content":"value"}}, {"itemprop":{"key":"value", "content":"value"}}, {"charset":{"key":"value"}}]
        
        },
        include : {
            local : [ '.' ]
        },

        delay : 0,
        timeout : 0,

        hideOnClick : false,

        hideCloseButton : false,

        css : 'foresee-dhtml.css',

        hide : [],

        hideFlash: false,

        type : 'dhtml',
        /* desktop */
        // url: 'invite.html'
        /* mobile */
        url : 'invite-mobile.html',
        back: 'url'

        //SurveyMutex: 'SurveyMutex'
    },

    tracker : {
        width : '690',
        height : '415',
        timeout : 3,
        adjust : true,
        alert : {
            enabled : true,
            message: 'The survey is now available.',
            locales: [/*{
                locale: 'jp',
                message: 'アンケート調査をお受けになる準備ができました。 '
            },*/{
                locale: 'uk',
            message : 'The survey is now available.'
            }]
        },
        url: 'tracker.jsp',
        locales: [/*{
            locale: 'jp',
            url: 'tracker_jp.html'
        },*/{
            locale: 'uk',
            url: 'tracker_uk.jsp'
        }]
    },

    survey : {
        width : 690,
        height : 600
    },

    qualifier : {
        footer : '<div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
        width : '690',
        height : '500',
        bgcolor : '#333',
        opacity : 0.7,
        x : 'center',
        y : 'center',
        delay : 0,
        buttons : {
            accept : 'Continue'
        },
        hideOnClick : false,
        css : 'foresee-dhtml.css',
        url : 'qualifying.html'
    },

    cancel : {
        url : 'cancel.html',
        width : '690',
        height : '400'
    },

    pop : {
        what : 'survey',
        after : 'leaving-site',
        pu : false,
        tracker : true
    },

    meta : {
        referrer : true,
        terms : true,
        ref_url : true,
        url : true,
        url_params : false,
        user_agent : false,
        entry : false,
        entry_params : false,
		viewport_size: false,
        document_size: false,
        scroll_from_top: false
    },

    events : {
        enabled : true,
        id : true,
        codes : {
            purchase : 800,
            items : 801,
            dollars : 802,
            followup : 803,
            information : 804,
            content : 805
        },
        pd : 7,
        custom : {}
    },

    previous : false,

	analytics : {
		google_local : false,
		google_remote : false
	},

    cpps: {
        mktg_source: {
            source: 'variable',
            name: 'utm_source'
        }
    },

    mode : 'first-party'
};

    if(supports_amd)
        define(function(){ return FSR; })
})();
