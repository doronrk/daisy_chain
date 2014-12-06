FSR.surveydefs = [{
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 8,
        lf: 3
    },
    locales: [{
        locale: 'gb',
        sp: 15,
        lf: 3
    }, {
        locale: 'de',
        sp: 15,
        lf: 3
    }, {
        locale: 'fr',
        sp: 15,
        lf: 3
    }, {
        locale: 'jp',
        sp: 15,
        lf: 3
    }, {
        locale: 'hk',
        sp: 15,
        lf: 3
    }, {
        locale: 'au',
        sp: 15,
        lf: 3
    },  {
        locale: 'sg',
        sp: 15,
        lf: 3
    }, {
        locale: 'tw',
        sp: 15,
        lf: 3
    }, {
        locale: 'br',
        sp: 15,
        lf: 3
    }, {
        locale: 'kr',
        sp: 15,
        lf: 3
    }],
    links: {
        pop: [{
            tag: 'img',
            attribute: 'id',
            patterns: ['continueBilling'],
            pu: true
        }]
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
        locale: fsrlocale
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
        siteLogo: "sitelogo.jpg",
        
        //alt text fore site logo img
        siteLogoAlt: "",
        
        /* Desktop */
        dialogs: [{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click here to close this window",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            
            locales: {
                "us": {
                    skipThisInvite: true
                },
                "gb": {
                    skipThisInvite: true
                },
                "de": {
                    skipThisInvite: true
                },
                "fr": {
                    skipThisInvite: true
                },
                "jp": {
                    skipThisInvite: true
                },
                "au": {
                    skipThisInvite: true
                },
                "sg": {
                    skipThisInvite: true
                },
                "hk": {
                    locale: "hk-en"
                },
                "tw": {
                    skipThisInvite: true
                },
                "br": {
                    skipThisInvite: true
                },
                "kr": {
                    skipThisInvite: true
                },
                "es": {
                    skipThisInvite: true
                }
            
            }
        }, {
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click here to close this window",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            
             locales: {
                "gb": {
                    headline: "We'd welcome your feedback!",
                    blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
                    noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
                    attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
                    closeInviteButtonText: "Click here to close this window",
                    declineButton: "No, thanks",
                    acceptButton: "Yes, I'll give feedback"
                },
                "de": {
                    headline: "Wir freuen uns auf Ihr Feedback!",
                    blurb: "Vielen Dank für Ihren Besuch auf unserer Website. Sie wurden ausgewählt, um an einer kurzen Umfrage zur Kundenzufriedenheit teilzunehmen und uns mitzuteilen, wie wir noch besser sein könnten.",
                    noticeAboutSurvey: "Mit dieser Umfrage wird Ihr Gesamteindruck gemessen. Bitte schauen Sie nach ihr <u>am Ende</u> Ihres Besuchs.",
                    attribution: "Diese Umfrage wird von einem unabhängigen Unternehmen, ForeSee, im Auftrag der von Ihnen besuchten Website durchgeführt.",
                    closeInviteButtonText: "Klicken Sie hier, um dieses Fenster zu schließen",
                    declineButton: "Nein, danke",
                    acceptButton: "Ja, ich möchte Feedback geben"
                },
                "fr": {
                    headline: "Dites-nous ce que vous pensez !",
                    blurb: "Merci d’avoir consulté notre site Web. Vous avez été choisi(e) pour participer à une brève enquête de satisfaction client pour nous aider à améliorer votre expérience.",
                    noticeAboutSurvey: "Cette enquête a pour but d'évaluer votre expérience globale. Vous la trouverez à la <u>fin</u> de votre visite.",
                    attribution: "Cette enquête est réalisée par ForeSee, une société indépendante, pour le compte de ce site.",
                    closeInviteButtonText: "Cliquez ici pour fermer la fenêtre",
                    declineButton: "Non merci",
                    acceptButton: "Oui, je souhaite m’exprimer"
                },
                "jp": {
                    headline: "ご意見をお聞かせください。",
                    blurb: "クロックス オンラインショップをご覧いただき、ありがとうございます。お客様の満足度調査のためのアンケートを実施しております。",
                    noticeAboutSurvey: "このアンケートはお客様の全体的な体験を測定することを目的としています。クロックス オンラインショップの閲覧終了時にアンケートをご覧ください。",
                    attribution: "このアンケートは、独立市場調査会社であるForeSeeが代表して行います。",
                    closeInviteButtonText: "閉じる。",
                    declineButton: "いいえ。",
                    acceptButton: "はい。アンケートに答えます。"
                },
                "hk": {
                    headline: "Crocs歡迎你提供寶貴意見。",
                    blurb: "感謝你瀏覽crocs.com.hk。你已被隨機選中參與一份簡短的客戶滿意度意見問卷調查，讓我們了解如何提升你的購物體驗。",
                    noticeAboutSurvey: "本問卷調查的目的是用以評測你的整體購物體驗，請於瀏覽結束後進行填寫。",
                    attribution: "本問卷調查由獨立市場調查研究公司ForeSee代表本網站負責進行。",
                    closeInviteButtonText: "點擊此處關閉。",
                    declineButton: "我不參加，謝謝!",
                    acceptButton: "我願意提供意見。"
                },
                "au": {
                    headline: "We'd welcome your feedback!",
                    blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
                    noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
                    attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
                    closeInviteButtonText: "Click here to close this window",
                    declineButton: "No, thanks",
                    acceptButton: "Yes, I'll give feedback"
                },
                "sg": {
                    headline: "We'd welcome your feedback!",
                    blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
                    noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
                    attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
                    closeInviteButtonText: "Click here to close this window",
                    declineButton: "No, thanks",
                    acceptButton: "Yes, I'll give feedback"
                },
                "tw": {
                    headline: "Crocs卡駱馳歡迎您提供寶貴意見。",
                    blurb: "感謝您瀏覽crocs.com.tw。您已被隨機選中參與一份簡短的客戶滿意度意見問卷調查，讓我們了解如何提升您的購物經驗。",
                    noticeAboutSurvey: "本問卷調查的目的是用以評估您的整體購物經驗，請於瀏覽結束後進行填寫。",
                    attribution: "本問卷調查由獨立市場調查研究公司ForeSee代表本網站負責進行。",
                    closeInviteButtonText: "點擊此處關閉。",
                    declineButton: "我不參加，謝謝!",
                    acceptButton: "我願意提供意見。"
                },
                "br": {
                    headline: "Nós agradecemos o seu feedback",
                    blurb: "Obrigado por visitar nosso website. Você foi selecionado para participar de uma breve pesquisa de satisfação do cliente para nos informar como podemos melhorar a sua experiência.",
                    noticeAboutSurvey: "A pesquisa é projetada para medir toda a sua experiência. Procure por ela na conclusão da sua visita.",
                    attribution: "Esta pesquisa é realizada por uma empresa independente, a ForeSee, em nome do site que você está visitando.",
                    closeInviteButtonText: "Clique para fechar.",
                    declineButton: "Não, obrigado.",
                    acceptButton: "Sim, gostaria de dar feedback."
                },
                "kr": {
                    headline: "크록스는 고객님의 의견을 환영합니다.",
                    blurb: "크록스 웹사이트를 방문해 주셔서 감사합니다.  크록스의 서비스를 향상시키기 위하여 고객님을 고객 만족도 조사에 참여 시키고자 합니다.",
                    noticeAboutSurvey: "만족도 조사는 고객님의 경험에 근거하여 측정됩니다. 방문 하셔서 참여해주시기 바랍니다.",
                    attribution: "이 조사서는 고객님이 방문하는 사이트와 별개의 독립된 회사에서 운영되는것입니다.",
                    closeInviteButtonText: "윈도우 창을 닫기 위하여 여기를 클릭해주십시요",
                    declineButton: "아니오, 참여하지 않겠습니다.",
                    acceptButton: "네, 의견을 주도록 하겠습니다."
                }
            }
        }],
        
        exclude: {
            urls: ['/Cart-StartCheckout', '/COShipping-BackShip', '/COShipping-StartShippingMethod', '/Paypal-ExpressFromCart', '/COBilling-Start', '/COBilling-BackBilling', '/COCheckout-Step', '/Cart-Show', '/CustomerService-ContactUs', '/Newsletter-Subscribe', '/customer-service/', '/Store-Locator/', '/Login-Show', '/Login-Register', '/Customer-Account', '/Order-Track', '/Address-AddressBook', '/PaymentInstruments-List', '/Customer-MyProfile', '/Wishlist-Show', '/Customer-ResetPassword', '/Cart-AddProduct', 'cid=homepage', '/Customer-CrocsClubProfile'],
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
        
        hideOnClick: true,
        
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
                locale: 'gb',
                message: 'The survey is now available.'
            }, {
                locale: 'de',
                message: 'Ihre Umfrage steht jetzt zur Verfügung.'
            }, {
                locale: 'fr',
                message: 'Votre questionnaire est désormais disponible.'
            }, {
                locale: 'jp',
                message: 'アンケート調査をお受けになる準備ができました。 '
            }, {
                locale: 'hk',
                message: '本意見調查現在可供使用。'
            }, {
                locale: 'au',
                message: 'The survey is now available.'
            }, {
                locale: 'sg',
                message: 'The survey is now available.'
            }, {
                locale: 'tw',
                message: '本意見調查現在可供使用。'
            }, {
                locale: 'br',
                message: 'A pesquisa está disponível. '
            }, {
                locale: 'kr',
                message: '고객 만족도 조사에  지금 참여 하실 수 있습니다.'
            }]
        },
        url: 'tracker.html',
        locales: [{
            locale: 'gb',
            url: 'tracker_uk.html'
        }, {
            locale: 'de',
            url: 'tracker_de.html'
        }, {
            locale: 'fr',
            url: 'tracker_fr.html'
        }, {
            locale: 'jp',
            url: 'tracker_jp.html'
        }, {
            locale: 'hk',
            url: 'tracker_hk.html'
        }, {
            locale: 'au',
            url: 'tracker_au.html'
        }, {
            locale: 'sg',
            url: 'tracker_sg.html'
        }, {
            locale: 'tw',
            url: 'tracker_tw.html'
        }, {
            locale: 'br',
            url: 'tracker_br.html'
        }, {
            locale: 'kr',
            url: 'tracker_kr.html'
        }]
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
    
    cpps: {
        orderTotal: {
            source: 'variable',
            name: 'orderTotal'
        },
        orderNum: {
            source: 'variable',
            name: 'orderNum'
        },
        orderSKUs: {
            source: 'variable',
            name: 'orderSKUs'
        }
    },
    
    mode: 'first-party'
};
