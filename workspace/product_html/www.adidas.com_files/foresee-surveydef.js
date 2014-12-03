FSR.surveydefs = [{
    site: 'adidas.de',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 6,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }, {
            tag: 'input',
            attribute: 'value',
            patterns: ['onlinetransfer']
        }]
    },
    include: {
        urls: ['adidas.de']
    }
}, {
    site: 'adidas.fr',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 7,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }]
    },
    include: {
        urls: ['adidas.fr']
    }
}, {
    site: 'adidas.nl',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 9,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }, {
            tag: 'input',
            attribute: 'value',
            patterns: ['ideal']
        }]
    },
    include: {
        urls: ['adidas.nl']
    }
}, {
    site: 'adidas.co.uk',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 6,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }]
    },
    include: {
        urls: ['adidas.co.uk']
    }
}, {
    site: 'adidas.es',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 6,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }]
    },
    include: {
        urls: ['adidas.es']
    }
}, {
    site: 'adidas.it',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 6,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }]
    },
    include: {
        urls: ['adidas.it']
    }
}, {
    site: 'adidas.ru',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 6,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }]
    },
    include: {
        urls: ['adidas.ru']
    }
}, {
    site: 'adidas.com.br',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 6,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }]
    },
    include: {
        urls: ['adidas.com.br']
    }
}, {
    site: 'adidas.com',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 6,
        lf: 2
    },
    links: {
        cancel: [{
            tag: 'input',
            attribute: 'value',
            patterns: ['paypal']
        }]
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

    language: {
        locale: 'en',
        src: 'location',
        locales: [{
            match: 'adidas.de',
            locale: 'gr'
        }, {
            match: 'adidas.fr',
            locale: 'fr'
        }, {
            match: 'adidas.nl',
            locale: 'du'
        }, {
            match: 'adidas.co.uk',
            locale: 'uk'
        }, {
            match: 'adidas.es',
            locale: 'sp'
        }, {
            match: 'adidas.it',
            locale: 'it'
        }, {
            match: 'adidas.ru',
            locale: 'ru'
        }, {
            match: 'adidas.com.br',
            locale: 'br'
        }]
    },

    exclude : {
    },

    zIndexPopup : 2147483900,

    ignoreWindowTopCheck : false,

    ipexclude : 'fsr$ip',

    mobileHeartbeat : {
        delay : 60, /*mobile on exit heartbeat delay seconds*/
        max : 3600  /*mobile on exit heartbeat max run time seconds*/
    },

    invite : {

        // For no site logo, comment this line:
        siteLogo : "sitelogo.gif",

        //alt text fore site logo img
		siteLogoAlt : "",

        /* Desktop */
        dialogs : [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            locales: {
                // German
                "gr": {
                    headline: "Vielen Dank für Ihren Besuch auf unserer Website.",
                    blurb: "Sie wurden nach dem Zufallsprinzip zur Teilnahme an einer Kundenzufriedenheitsumfrage ausgewählt. Über diese Umfrage können Sie uns wissen lassen, was wir tun können, um Ihr Nutzungserlebnis beim Besuch unserer Website zu verbessern.",
                    noticeAboutSurvey: "Diese Umfrage soll Ihre Gesamterfahrung beim Besuch der Website messen und erscheint daher am <u>Ende Ihres Besuchs</u>.",
                    attribution: "Diese Umfrage wird von ForeSee, einem unabhängigen Unternehmen, durchgeführt.",
                    closeInviteButtonText: "",
                    declineButton: "Nein, danke",
                    acceptButton: "Ja, ich möchte Feedback geben"
                },
                // French
                "fr": {
                    headline: "Merci d’avoir visité notre site.",
                    blurb: "Vous avez été choisi(e) au hasard pour participer à une enquête de satisfaction de la clientèle afin de nous faire savoir comment nous pouvons améliorer votre expérience sur notre site Internet.",
                    noticeAboutSurvey: "L’enquête vise à évaluer votre expérience sur la totalité du site et s’affichera à la <u>fin de votre visite</u>.",
                    attribution: "Cette enquête est menée par une entreprise indépendante, ForeSee.",
                    closeInviteButtonText: "",
                    declineButton: "Non, merci",
                    acceptButton: "Oui, je vous donnerai mon avis."
                },
                // Dutch
                "du": {
                    headline: "Bedankt voor uw bezoek aan onze site.",
                    blurb: "U bent willekeurig uitgekozen om deel te nemen aan een klantenenquête, zodat u ons kunt vertellen hoe we uw ervaring op onze website kunnen verbeteren.",
                    noticeAboutSurvey: "Deze enquête is ontworpen om de volledige ervaring van uw bezoek aan de site in kaart te brengen, en zal pas aan het <u>einde van uw bezoek</u> verschijnen.",
                    attribution: "Deze enquête wordt uitgevoerd door een onafhankelijk bureau, ForeSee.",
                    closeInviteButtonText: "",
                    declineButton: "Nee, bedankt",
                    acceptButton: "Ja, ik geef graag feedback"
                },
                // UK
                "uk": {
                    headline: "Thank you for visiting our site.",
                    blurb: "You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.",
                    noticeAboutSurvey: "The survey is designed to measure your entire site experience and will appear at the <u>end of your visit</u>.",
                    attribution: "This survey is conducted by an independent company, ForeSee.",
                    closeInviteButtonText: "",
                    declineButton: "No thanks",
                    acceptButton: "Yes, I'll give feedback"
                },
                // SP
                "sp": {
                    headline: "¡Le agradecemos sus opiniones y comentarios!",
                    blurb: "Le agrademos su visita a nuestro sitio web. Usted ha sido elegido(a) al azar para participar en una breve encuesta de satisfacción del cliente para informarnos acerca de cómo podemos mejorar su experiencia con nosotros.",
                    noticeAboutSurvey: "La encuesta está diseñada para medir toda su experiencia con nosotros. Por favor, búsquela al <u>finalizar</u> su visita.",
                    attribution: "Esta encuesta se realiza a través de una empresa independiente, ForeSee, en nombre del sitio que está usted visitando.",
                    closeInviteButtonText: "",
                    declineButton: "No, gracias.",
                    acceptButton: "Sí, realizaré comentarios."
                },
                // IT
                "it": {
                    headline: "Vogliamo il tuo feedback!",
                    blurb: "Grazie per aver visitato il nostro sito web. Sei stato selezionato per prendere parte al nostro breve sondaggio, che ci aiuterà a capire come poterti assistere al meglio.",
                    noticeAboutSurvey: "Il sondaggio mira ad avere una tua valutazione, che potrai esprimere al <u>termine</u> della tua visita.",
                    attribution: "Il sondaggio è gestito dalla società indipendente ForeSee per conto del sito che hai visitato.",
                    closeInviteButtonText: "",
                    declineButton: "No, grazie",
                    acceptButton: "Sì, intendo dare il mio feedback"
                },
				// RU
				"ru": {
					headline: "Нам важно Ваше мнение.",
            		blurb: "Благодарим Вас за посещение нашего веб-сайта. Вас выбрали для участия в кратком опросе об удовлетворенности клиентов, который поможет нам узнать, как мы можем улучшить качество Вашей работы с веб-сайтом.",
            		noticeAboutSurvey: "Опрос предназначен для оценки Ваших впечатлений в целом. Пожалуйста, пройдите его по <u>завершении</u>  Вашего посещения.",
            		attribution: "Опрос проводит независимая компания ForeSee в интересах веб-сайта, на котором Вы сейчас находитесь.",
            		closeInviteButtonText: "Нажмите, чтобы закрыть.",
            		declineButton: "Нет, спасибо.",
            		acceptButton: "Да, я выскажу свое мнение" 
				},
				// BR
				"br": {
					headline: "Nós agradecemos o seu feedback!",
            		blurb: "Obrigado por visitar nosso website. Você foi selecionado para participar de uma breve pesquisa de satisfação do cliente para nos informar como podemos melhorar a sua experiência.",
            		noticeAboutSurvey: "Esta pesquisa é projetada para medir toda a sua experiência. Procure por ela na <u>conclusão</u> da sua visita.",
            		attribution: "Esta pesquisa é realizada por uma empresa independente, a ForeSee, em nome do site que você está visitando.",
            		closeInviteButtonText: "Clique para fechar.",
            		declineButton: "Não, obrigado.",
            		acceptButton: "Sim, gostaria de dar feedback."  
				}
            }
        }]],

        exclude : {
            urls:['/cart/', '/checkout/', 'https', 'reebok.com/US/login', 'reebok.com/US/register', 'reebok.com/US/my-account'],
            referrers:[],
            userAgents:[],
            browsers:[],
            cookies:[],
            variables:[]
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

    tracker: {
        width: '690',
        height: '415',
        timeout: 3,
        adjust: true,
        alert: {
            enabled: true,
            message: 'The survey is now available.'
        },
        url: 'tracker.html',
        locales: [{
            locale: 'gr',
            url: 'tracker_de.html',
            height: '415'
        }, {
            locale: 'fr',
            url: 'tracker_fr.html',
            height: '415'
        }, {
            locale: 'du',
            url: 'tracker_nl.html',
            height: '415'
        }, {
            locale: 'uk',
            url: 'tracker_co_uk.html',
            height: '415'
        }, {
            locale: 'sp',
            url: 'tracker_sp.html',
            height: '415'
        }, {
            locale: 'it',
            url: 'tracker_it.html',
            height: '415'
        }, {
            locale: 'ru',
            url: 'tracker_ru.html',
            height: '415'
        }, {
            locale: 'br',
            url: 'tracker_br.html',
            height: '415'
        }]
    },

    survey : {
        width : 690,
        height : 600
    },

    qualifier : {
        footer : '<div div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
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
        entry_params : false
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

    cpps : {},

    mode : 'hybrid'
};