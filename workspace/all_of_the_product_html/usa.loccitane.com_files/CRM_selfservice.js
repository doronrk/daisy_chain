/**
 * _SelfService
 *
 * @overview Object related to the Eptica SelfService Integration.
 *
 * @version 1.0.11
 *
 * @author Alexandre PEREIRA (ALE)
 * @author Fabien CALMETTES (FAB)
 *
 * @history
 * ------------------------------------------------------------------------
 * 2013-03-14 | ALE | Version.1.0.0 | Creation of the file.
 * ------------------------------------------------------------------------
 * 2013-07-06 | ALE | Version.1.0.1 | Adding the staging logics.
 * ------------------------------------------------------------------------
 * 2013-08-27 | ALE | Version.1.0.2 | Forcing the session to change with the locale parameter on the default home.
 * ------------------------------------------------------------------------
 * 2013-09-10 | ALE | Version.1.0.3 | Fixing a querystring forcing issue on the idsec query.
 * ------------------------------------------------------------------------
 * 2013-09-19 | ALE | Version.1.0.4 | JSdoc implementation.
 *                                  | Fixing a url generation issue on the logged user on the popin.
 * ------------------------------------------------------------------------
 * 2013-10-10 | ALE | Version.1.0.5 | Adjustments for MEL.
 * ------------------------------------------------------------------------
 * 2013-10-24 | ALE | Version.1.0.6 | Stage domain recognition fixes, adding a dynamic variable in _config.domain.
                                    | Removing the title query in the base64 encoding when logged.
 * ------------------------------------------------------------------------
 * 2013-11-06 | ALE | Version.1.0.7 | Updated config for MEL to support en_FR locale.
 * ------------------------------------------------------------------------
 * 2014-03-21 | ALE | Version.1.0.8 | Calling the b64 library in relative url.
 * ------------------------------------------------------------------------
 * 2014-06-23 | ALE | Version.1.0.9 | Adding Ireland.
 * ------------------------------------------------------------------------
 * 2014-06-24 | ALE | Version.1.0.10 | Debugging some user connection issues.
 * ------------------------------------------------------------------------
 * 2014-10-13 | ALE | Version.1.0.11 | Adding a new country : HK CN OCC.
 * ------------------------------------------------------------------------
 * @copyright 2013 L'Occitane en Provence
*/

/**
 * _SelfService {Object} - Main OCMS Object
 * @namespace
*/
var _SelfService = {
    /**
     * _SelfService.b64check - Testing the B64 encoder presence
     * @function
     * @memberof _SelfService
     *
     * @return {Boolean} returning if the Base64 JS plugin presence.
    */
    b64check: function () {
        return (typeof (Base64) == "function");
    },

    /**
     * _SelfService.titleArray {Array} - Array containing the titles available in OCMS
     * @memberof _SelfService
     *
     * @TODO : push MEL variables for Titles
    */
    titleArray: [
		{ 'title': ' Frau', 'countryID': 77, 'id': 13 },
		{ 'title': ' Frau', 'countryID': 78, 'id': 13 },
		{ 'title': ' juffrouw', 'countryID': 50, 'id': 13 },
		{ 'title': ' juffrouw', 'countryID': 79, 'id': 13 },
		{ 'title': ' mevrouw', 'countryID': 50, 'id': 13 },
		{ 'title': ' mevrouw', 'countryID': 79, 'id': 13 },
		{ 'title': ' Mlle ', 'countryID': 74, 'id': 13 },
		{ 'title': ' Mme ', 'countryID': 74, 'id': 13 },
		{ 'title': ' Sra.', 'countryID': 76, 'id': 13 },
		{ 'title': ' Srta.', 'countryID': 76, 'id': 13 },
		{ 'title': 'De heer', 'countryID': 50, 'id': 11 },
		{ 'title': 'De heer', 'countryID': 79, 'id': 11 },
		{ 'title': 'deletedFrau', 'countryID': 77, 'id': 13 },
		{ 'title': 'DeletedHerr', 'countryID': 77, 'id': 11 },
		{ 'title': 'Dr', 'countryID': 83, 'id': 11 },
        { 'title': 'Dr', 'countryID': 103, 'id': 11 },
		{ 'title': 'dresses', 'countryID': 82, 'id': 13 },
		{ 'title': 'Erkek', 'countryID': 45, 'id': 11 },
		{ 'title': 'F', 'countryID': 43, 'id': 13 },
		{ 'title': 'Female', 'countryID': 45, 'id': 13 },
		{ 'title': 'Frau', 'countryID': 77, 'id': 13 },
		{ 'title': 'Frau', 'countryID': 78, 'id': 13 },
		{ 'title': 'Helga', 'countryID': 82, 'id': 13 },
		{ 'title': 'Herr', 'countryID': 77, 'id': 11 },
		{ 'title': 'Herr', 'countryID': 78, 'id': 11 },
		{ 'title': 'juffrouw', 'countryID': 50, 'id': 13 },
		{ 'title': 'juffrouw', 'countryID': 79, 'id': 13 },
		{ 'title': 'Kadin', 'countryID': 45, 'id': 13 },
		{ 'title': 'Lady', 'countryID': 83, 'id': 13 },
		{ 'title': 'Lord', 'countryID': 83, 'id': 11 },
        { 'title': 'Lady', 'countryID': 103, 'id': 13 },
		{ 'title': 'Lord', 'countryID': 103, 'id': 11 },
		{ 'title': 'M', 'countryID': 43, 'id': 11 },
		{ 'title': 'M.', 'countryID': 57, 'id': 11 },
		{ 'title': 'M.', 'countryID': 74, 'id': 11 },
		{ 'title': 'M.', 'countryID': 76, 'id': 11 },
		{ 'title': 'M.', 'countryID': 78, 'id': 11 },
		{ 'title': 'M.', 'countryID': 79, 'id': 11 },
		{ 'title': 'M.', 'countryID': 82, 'id': 11 },
		{ 'title': 'M.', 'countryID': 83, 'id': 11 },
        { 'title': 'M.', 'countryID': 103, 'id': 11 },
		{ 'title': 'mevrouw', 'countryID': 50, 'id': 11 },
		{ 'title': 'mevrouw', 'countryID': 79, 'id': 11 },
		{ 'title': 'Miss', 'countryID': 56, 'id': 13 },
		{ 'title': 'Miss', 'countryID': 83, 'id': 13 },
        { 'title': 'Miss', 'countryID': 103, 'id': 13 },
		{ 'title': 'Miss.', 'countryID': 8, 'id': 13 },
		{ 'title': 'Mlle', 'countryID': 74, 'id': 13 },
		{ 'title': 'Mlle', 'countryID': 76, 'id': 13 },
		{ 'title': 'Mlle', 'countryID': 78, 'id': 13 },
		{ 'title': 'Mlle', 'countryID': 79, 'id': 13 },
		{ 'title': 'Mlle', 'countryID': 82, 'id': 13 },
		{ 'title': 'Mlle', 'countryID': 83, 'id': 13 },
        { 'title': 'Mlle', 'countryID': 103, 'id': 13 },
		{ 'title': 'Mlle.', 'countryID': 79, 'id': 13 },
		{ 'title': 'Mme', 'countryID': 74, 'id': 13 },
		{ 'title': 'Mme', 'countryID': 76, 'id': 13 },
		{ 'title': 'Mme', 'countryID': 78, 'id': 13 },
		{ 'title': 'Mme', 'countryID': 79, 'id': 13 },
		{ 'title': 'Mme', 'countryID': 82, 'id': 13 },
		{ 'title': 'Mme', 'countryID': 83, 'id': 13 },
        { 'title': 'Mme', 'countryID': 103, 'id': 13 },
		{ 'title': 'Mme.', 'countryID': 79, 'id': 13 },
		{ 'title': 'Mr', 'countryID': 74, 'id': 11 },
		{ 'title': 'Mr', 'countryID': 78, 'id': 11 },
		{ 'title': 'Mr', 'countryID': 82, 'id': 11 },
		{ 'title': 'Mr', 'countryID': 83, 'id': 11 },
        { 'title': 'Mr', 'countryID': 103, 'id': 11 },
		{ 'title': 'Mr.', 'countryID': 8, 'id': 11 },
		{ 'title': 'Mr.', 'countryID': 43, 'id': 11 },
		{ 'title': 'Mr.', 'countryID': 56, 'id': 11 },
		{ 'title': 'Mrs', 'countryID': 82, 'id': 13 },
		{ 'title': 'Mrs', 'countryID': 83, 'id': 13 },
        { 'title': 'Mrs', 'countryID': 103, 'id': 13 },
		{ 'title': 'Mrs.', 'countryID': 8, 'id': 13 },
		{ 'title': 'Mrs.', 'countryID': 43, 'id': 13 },
		{ 'title': 'Mrs.', 'countryID': 56, 'id': 13 },
		{ 'title': 'Ms', 'countryID': 57, 'id': 11 },
		{ 'title': 'Ms', 'countryID': 74, 'id': 11 },
		{ 'title': 'Ms', 'countryID': 78, 'id': 11 },
		{ 'title': 'Ms', 'countryID': 82, 'id': 11 },
		{ 'title': 'Ms', 'countryID': 83, 'id': 11 },
        { 'title': 'Ms', 'countryID': 103, 'id': 11 },
		{ 'title': 'Sig.', 'countryID': 80, 'id': 11 },
		{ 'title': 'Sig.na', 'countryID': 80, 'id': 13 },
		{ 'title': 'Sig.ra', 'countryID': 80, 'id': 13 },
		{ 'title': 'Sr.', 'countryID': 8, 'id': 11 },
		{ 'title': 'Sr.', 'countryID': 43, 'id': 11 },
		{ 'title': 'Sr.', 'countryID': 76, 'id': 11 },
		{ 'title': 'Sra.', 'countryID': 8, 'id': 13 },
		{ 'title': 'Sra.', 'countryID': 43, 'id': 13 },
		{ 'title': 'Sra.', 'countryID': 76, 'id': 13 },
		{ 'title': 'Sra.', 'countryID': 82, 'id': 13 },
		{ 'title': 'Srita.', 'countryID': 8, 'id': 13 },
		{ 'title': 'Srta.', 'countryID': 76, 'id': 13 }
    ],

    /**
     * _SelfService.countryArray - Array containing the Eptica countries configurations
     * @memberof _SelfService
     *
    */
    countryArray: {
        'mel': [
            { 'OCMSid': '2-1', 'EPTICAid': 58, 'prefix': 'frfr', 'locale': 'fr_FR' },
            { 'OCMSid': '2-2', 'EPTICAid': 58, 'prefix': 'frfr', 'locale': 'fr_FR' }
        ],
        'occ': [
		    { 'OCMSid': '74-1', 'EPTICAid': 58, 'prefix': 'frfr', 'locale': 'fr_FR' },
		    { 'OCMSid': '79-1', 'EPTICAid': 57, 'prefix': 'frbe', 'locale': 'fr_BE' },
		    { 'OCMSid': '78-1', 'EPTICAid': 56, 'prefix': 'frch', 'locale': 'fr_CH' },
		    { 'OCMSid': '77-2', 'EPTICAid': 60, 'prefix': 'dede', 'locale': 'de_DE' },
		    { 'OCMSid': '78-2', 'EPTICAid': 56, 'prefix': 'dech', 'locale': 'de_CH' },
		    { 'OCMSid': '76-2', 'EPTICAid': 59, 'prefix': 'eses', 'locale': 'es_ES' },
		    { 'OCMSid': '80-2', 'EPTICAid': 62, 'prefix': 'itit', 'locale': 'it_IT' },
            { 'OCMSid': '79-2', 'EPTICAid': 57, 'prefix': 'nlbe', 'locale': 'nl_BE' },
		    { 'OCMSid': '50-2', 'EPTICAid': 63, 'prefix': 'nlnl', 'locale': 'nl_NL' },
            { 'OCMSid': '83-1', 'EPTICAid': 253, 'prefix': 'engb', 'locale': 'en_GB' },
            { 'OCMSid': '82-1', 'EPTICAid': 254, 'prefix': 'enus', 'locale': 'en_US' },
            { 'OCMSid': '103-1', 'EPTICAid': 284, 'prefix': 'enie', 'locale': 'en_IE' },
            { 'OCMSid': '19-1', 'EPTICAid': 285, 'prefix': 'enca', 'locale': 'en_CA' },
            { 'OCMSid': '39-1', 'EPTICAid': 289, 'prefix': 'enhk', 'locale': 'en_HK' },
            { 'OCMSid': '39-2', 'EPTICAid': 289, 'prefix': 'zhhk', 'locale': 'zh_HK' }
        ]
    },

    /**
     * _SelfService.isstaging - Testing the OCMS environment
     * @function
     * @memberof _SelfService
     * 
     * @return {Boolean} if stage or not.
    */
    isstaging: function () {
        if (location.hostname == 'stage.ocms.loccitane.com' || location.hostname == 'stage.mcms.loccitane.com') {
            return true;
        } else {
            return false;
        }
    },

    /**
     * _SelfService.config_stage {Object} - Eptica Stage core config
     * @memberof _SelfService
     * 
    */
    config_stage: {
        'occ': {
            ept_url: 'loccitanetest.epticahosting.com/selfloccitanetest',
            ept_cookie: 'stage_CRM_Eptica_lastpage',
            domain: 'stage.ocms.loccitane.com'
        },
        'mel': {
            ept_url: 'help.melvita.com/selfloccitane',
            ept_cookie: 'stage_CRM_Eptica_lastpage_MEL',
            domain: 'stage.mcms.loccitane.com'
        }
    },

    /**
     * _SelfService.config_stage {Object} - Eptica Prod core config
     * @memberof _SelfService
     * 
    */
    config_prod: {
        'occ': {
            ept_url: 'help.loccitane.com/selfloccitane',
            ept_cookie: 'CRM_Eptica_lastpage',
            domain: 'loccitane.com'
        },
        'mel': {
            ept_url: 'help.melvita.com/selfloccitane',
            ept_cookie: 'CRM_Eptica_lastpage_MEL',
            domain: 'melvita.com'
        }
    },

    /**
     * _SelfService.getTitleID
     * @function
     * @memberof _SelfService 
     *
     * @param {String} country - the couple IDCountry-IDlang.
     * @param {String} title - the current user title (from the Datalayer object) .
     *
     * @return {Integer} the Eptica title id.
    */
    getTitleID: function (country, title) {
        if (title !== "") {
            var result = $.grep(_SelfService.titleArray, function (obj) { return ((obj.title == title) && (obj.countryID == country)); });
            return result[0].id;
        } else {
            return 11;
        }
    },

    /**
     * _SelfService.getCountryConf
     * @function
     * @memberof _SelfService
     *
     * @param {String} OCMSid - the couple IDCountry/IDlang.
     * @return {Object} the country Eptica core config from _SelfService.countryArray
    */
    getCountryConf: function (OCMSid) {
        var result = $.grep(_SelfService.countryArray[OCMS.GlobalVars.Brand], function (obj) { return (obj.OCMSid == OCMSid); });
        return result[0];
    },

    /**
     * _SelfService.loadEptica
     * @function
     * @memberof _SelfService
     *
     * @param {Boolean} iframe - should I load Eptica in a Popin or in an OCMS Article.
     * @param {Integer} artId - optional idArticle to load directly an article.
     * @param {Integer} artSec - optional idSection to load directly a section.
     * 
    */
    loadEptica: function (iframe, artId, artSec) {

        // testing the environment
        switch (this.isstaging()) {
            case true:
                var _config = this.config_stage[OCMS.GlobalVars.Brand];
                break;
            case false:
                var _config = this.config_prod[OCMS.GlobalVars.Brand];
                break;
        }

        // global variables
        if (location.host != 'localhost') {
            switch (OCMS.GlobalVars.Brand) {
                case 'occ':
                    document.domain = _config.domain;
                    break;
                case 'mel':
                    document.domain = _config.domain;
                    break;
                default:
                    break;
            }
        } else {
            document.domain = 'localhost';
        }

        var isLogged = dataLayer[0].userIsLogged;
        var deepLink = false;

        // declaring the Eptica brandId regarding the OCMS.GlobalVars.Brand value
        switch (OCMS.GlobalVars.Brand) {
            case 'occ':
                var brandId = 51;
                break;
            case 'mel':
                var brandId = 54;
                break;
            case 'cdm':
                var brandId = 52;
                break;
            default:
                var brandId = null;
                break;
        }

        // declaring the local from the country config
        var ept_locale = _SelfService.getCountryConf(OCMS.GlobalVars.C + '-' + OCMS.GlobalVars.L).locale;
        var ept_article = 'template-group.do?locale=' + ept_locale;
        var ept_sep = '&';

        // getting the values of the optional eptid & eptsec url param of the iframe
        if (OCMS.getQuerystring('eptid').length > 0) {
            artId = OCMS.getQuerystring('eptid');
        }

        if (OCMS.getQuerystring('eptsec').length > 0) {
            artSec = OCMS.getQuerystring('eptsec');
        }

        // do we load directly an article ? have a look on the optional artId param
        if (typeof (artId) !== "undefined") {
            if (artId.length > 0) {
                ept_article = 'template.do?id=' + artId;
                ept_sep = '&';
                deepLink = true;
            }
        }

        // do we load directly a section ? have a look on the optional artSec param
        if (typeof (artSec) !== "undefined") {
            if (artSec === "contact") {
                switch (isLogged) {
                    case 'true':
                        ept_article = "submit.do";
                        break;
                    case 'false':
                        ept_article = "submit-external.do";
                        break;
                }
                ept_sep = '?';
            } else if ((artSec === "requests") && (isLogged === true)) {
                ept_article = "requests.do";
                ept_sep = '?';
            } else if (artSec.length > 0) {
                ept_article = ept_article + '&id=' + artSec;
                ept_sep = '&';
            }
            deepLink = true;
        }

        // finding the country prefix from _SelfService.countryArray
        var eptCountry = _SelfService.getCountryConf(OCMS.GlobalVars.C + '-' + OCMS.GlobalVars.L).prefix;

        var _brandprefix = OCMS.GlobalVars.Brand == 'mel' ? 'mel' : '';

        if (isLogged == 'true') {
            // Auth
            var usrEmail = dataLayer[0].userEmail;
            var usrId = dataLayer[0].userId;
            var usrTTL = OCMS.GlobalVars.Brand == 'mel' ? 11 : _SelfService.getTitleID(OCMS.GlobalVars.C, dataLayer[0].userTitle);
            var usrLast = dataLayer[0].userLastName;
            var usrFirst = dataLayer[0].userFirstName;
            var usrCountry = _SelfService.getCountryConf(OCMS.GlobalVars.C + '-' + OCMS.GlobalVars.L).EPTICAid;

            // removing the Title in the encoding process on MEL
            var usrSalutation = OCMS.GlobalVars.Brand == 'mel' ? '' : '&customer.Salutation=' + usrTTL;

            var usr_req = 'customer.EMail=' + usrEmail + '&customer.SelfPass=0ccEptcrm13&customer.FirstName=' + usrFirst + '&customer.LastName=' + usrLast + usrSalutation + '&customer.Brand=' + brandId + '&customer.CountryCode=' + usrCountry + '&customer.CustIdentifier=' + usrId + '&createCustomerWhen=now';
        }

        // checking the presence of a cookie to load the last page visited first
        if (null !== $.cookie(_config.ept_cookie) && deepLink === false) {
            if(isLogged == 'true'){
                var iframeUrl = $.cookie(_config.ept_cookie).split('base64parameters')[0] + ept_sep + 'base64parameters=' + Base64.encode(usr_req);
            }else{
                var iframeUrl = $.cookie(_config.ept_cookie).split('base64parameters')[0];
            }
        } else {
            if(isLogged == 'true'){
               var iframeUrl = location.protocol + '//' + _config.ept_url + '/' + _brandprefix + 'webauth' + eptCountry + '/' + ept_article + '' + ept_sep + 'base64parameters=' + Base64.encode(usr_req);
            } else {
               var iframeUrl = location.protocol + '//' + _config.ept_url + '/' + _brandprefix + 'webano' + eptCountry + '/' + ept_article;
            }
        }

        // if iframe == true => load in an article , else , in a popin
        if (iframe === true) {
            var iframeBuild = '<iframe id="CRMIframe" src="' + iframeUrl + '" height="3200" border="0" frameborder="0" scrolling="no" allowTransparency="true" style="display:block;width:100%;margin:0 auto;background: url("https://www.loccitane.com/img/OCC/redesign/design/basic_bg.png") left top;"></iframe>';
            $(iframeBuild).appendTo('#content');

            $('#CRMIframe').load(function () {
                var _iframe = $('iframe[src*="' + _config.ept_url + '"]')[0].contentWindow;

                var _innerHeight = _iframe.document.body.offsetHeight;
                document.getElementById('CRMIframe').height = (_innerHeight) + "px";

                var _currenturl = _iframe.location.href;
                $.cookie(_config.ept_cookie, _currenturl);

                _iframe.$('a[href*="submit"]').click(function () {
                    document.getElementById('CRMIframe').height = "3200px";
                });
            });
        } else {
            var _popinStyle = function () {
                switch (OCMS.GlobalVars.Brand) {
                    case 'occ':
                        return 'background: url("https://www.loccitane.com/img/OCC/redesign/design/basic_bg.png") left top;';
                    default:
                        return 'background: white';
                }
            };
            OCMS.Popin.open({
                id: 'selfServicePopin',
                content: '<iframe src="' + iframeUrl + '" width="1010px" height="500px" frameborder="0" scrolling="auto"  style="' + _popinStyle() + '" ></iframe>',
                displayHeader: false,
                displayFooter: false,
                onBeforeOpen: function (ocms, popin) {
                    popin.container.find('.popinContent').css('padding', '0px');
                    popin.container.center();
                    OCMS.Popin.overlay.css('cursor', 'pointer');
                    return true;
                },
                onOpen: function (ocms, popin) {
                    popin.container.center();
                },
                onOverlayClick: function (event) {
                    OCMS.Popin.close();
                    OCMS.Popin.overlay.css('cursor', 'default');
                },
                computeWidth: false
            });
        }
    }
};

// Condition, checking if the base64 library is already called or not
if (_SelfService.b64check() === false) {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s); js.id = id;
        js.src = '/js/base64encoder.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'base64enc'));
}