function CoBranding() {

  var _self = this;

  //URL constants
  var PLAQUES_SERVICE_URL = 'https://binary.rolex.com/plaque/validate_dealer.rlx';
  var GENERATOR_URL = 'https://binary.rolex.com/plaque/plaque_test.rlx';

  var languageTranslator = {};
  languageTranslator['fr'] = 'fr';
  languageTranslator['en'] = 'en';
  languageTranslator['de'] = 'de';
  languageTranslator['it'] = 'it';
  languageTranslator['ja'] = 'ja';
  languageTranslator['es'] = 'es';
  languageTranslator['ko'] = 'ko';
  languageTranslator['ru'] = 'ru';
  languageTranslator['zh-hans'] = 'zh-hans';
  languageTranslator['zh-hant'] = 'zh-hant';
  languageTranslator['zh-cn'] = 'zh-hans';
  languageTranslator['zh-tw'] = 'zh-hant';
  languageTranslator['zh_cn'] = 'zh-hans';
  languageTranslator['zh_tw'] = 'zh-hant';
  languageTranslator['pt-br'] = 'pt_br';
  languageTranslator['pt_br'] = 'pt_br';

  //configs
  var FRONT_URLS = new Array('http://www.tudorwatch.com', 'http://www.rolex.com');
  var JS_URLS = new Array(FRONT_URLS[0] + '/corners/js/omniture/s_code');
  var JS_FUNCTION_NAMES = new Array('trackTudorPlaqueClick(this);', '');
  var GATEWAY_URLS = new Array(FRONT_URLS[0], FRONT_URLS[1]);

  imageHtml = '<img style="border: 0;" src="__PLAQUES_SERVICE_URL__?lang=__LANG__&amp;dealerAPIKey=__DEALER_API_KEY__&amp;colour=__COLOUR__&amp;domain=__DOMAIN__&amp;ts=__TIMESTAMP__&amp;format=h&amp;height=__HEIGHT__&amp;width=__WIDTH__&amp;nw=__NO_WATCH____BRAND__">';
  imageHtmlV4 = '<img style="border: 0;" src="__PLAQUES_SERVICE_URL__?lang=__LANG__&amp;dealerAPIKey=__DEALER_API_KEY__&amp;copy=__COPY__&amp;size=__SIZE__&amp;colour=__COLOUR__&amp;domain=__DOMAIN__&amp;ts=__TIMESTAMP__&amp;format=__FORMAT__">';


  this.getCoBranding = function(config) {

    this.config = config;

    var hrefHtml = '__GATEWAY_URL__/content/rolexcom/__SHORT_LANG__/leaving-dealer-site.html/dealerAPIKey=__DEALER_API_KEY__/cmpid=__CMPID__/targetLink=/content/rolexcom/__SHORT_LANG__.html';
    if ('tudor' == config.brand) {
      hrefHtml = '__GATEWAY_URL__?dealerDomain=__DOMAIN__&dealerAPIKey=__DEALER_API_KEY__&cmpid=__CMPID__';
    }


    var image = config.v4 ? imageHtmlV4 : imageHtml;
    var LINK_HTML = '<a href="' + hrefHtml + '" target="_blank" onclick="__JS_FUNCTION_NAME__">' + image + '</a>';

    //update the form text with new values
    var newForm = LINK_HTML;
    var indexConfig = 1;

    if ('tudor' == config.brand) {
      newForm = this.replaceValue(newForm, '__BRAND__', '&tudor=1');
      indexConfig = 0;
      GATEWAY_URLS[0] += '/' + config.shortLang.toLowerCase();
    } else {
      newForm = this.replaceValue(newForm, '__BRAND__', '');
    }
    newForm = this.replaceValue(newForm, '__JS_FUNCTION_NAME__', JS_FUNCTION_NAMES[indexConfig]);
    newForm = this.replaceValue(newForm, '__GATEWAY_URL__', GATEWAY_URLS[indexConfig]);
    newForm = this.replaceValue(newForm, '__DEALER_API_KEY__', config.dealerAPIKey);
    newForm = this.replaceValue(newForm, '__PLAQUES_SERVICE_URL__', PLAQUES_SERVICE_URL);
    newForm = this.replaceValue(newForm, '__LANG__', config.lang);
    newForm = this.replaceValue(newForm, '__COLOUR__', config.colour);
    newForm = this.replaceValue(newForm, '__DOMAIN__', config.domain);
    newForm = this.replaceValue(newForm, '__TIMESTAMP__', this.createTimeStamp());

    // v4 specific
    if (config.format)
      newForm = this.replaceValue(newForm, '__FORMAT__', config.format);
    if (config.copy)
      newForm = this.replaceValue(newForm, '__COPY__', config.copy);
    if (config.size)
      newForm = this.replaceValue(newForm, '__SIZE__', config.size);
    if (config.lang && config.v4)
      newForm = this.replaceValue(newForm, '__SHORT_LANG__', languageTranslator[config.lang.toLowerCase()]);

    // v5 specifc
    if (config.shortLang)
      newForm = this.replaceValue(newForm, '__SHORT_LANG__', languageTranslator[config.shortLang.toLowerCase()]);
    if (config.width)
      newForm = this.replaceValue(newForm, '__WIDTH__', config.width);
    if (config.height)
      newForm = this.replaceValue(newForm, '__HEIGHT__', config.height);
    if (config.nw)
      newForm = this.replaceValue(newForm, '__NO_WATCH__', config.nw);



    if ('false' == config.tracking) {
      newForm = this.replaceValue(newForm, '__CMPID__', 'test_plaque');
    } else {
      newForm = this.replaceValue(newForm, '__CMPID__', config.domain + '_plaque');
    }


    newForm = this.replaceValue(newForm, '/content/rolexcom/en', '');
    newForm = this.replaceValue(newForm, '=.html', '=/');
    newForm = this.replaceValue(newForm, '/content/rolexcom/', '/');

    //add the form to the page
    var targetHTML = document.getElementById(_self.getContainerId());
    targetHTML.innerHTML = newForm;

    var trackingScriptTag = document.createElement('script');
    trackingScriptTag.type = 'text/javascript';
    trackingScriptTag.src = 'https://secure.rolex.com/etc/clientlibs/foundation/sitecatalyst/sitecatalyst.js';

    trackingScriptTag.addEventListener('load', function(event) {
      _self.initTracking();
    });

    document.getElementsByTagName('head')[0].appendChild(trackingScriptTag);
  };

  this.getContainerId = function() {
    return (typeof this.config.containerId !== 'undefined' ? this.config.containerId : (this.config.v4 ? 'rolex-dealer-plaque' : 'cobranding'));
  };

  this.createTimeStamp = function() {
    return new Date().getTime();
  };

  this.replaceValue = function(target, key, value) {
    return target.split(key).join(value);
  };

  this.__trackPlaque = function(el, s) {
    s.tl(el, 'o', 'PlaqueExit');
  };

  this.initTracking = function() {
    var _self = this;
    if (s_gi) {
      var s_account = "rolexcornerrv5";
      var s = s_gi(s_account);
      s.fpCookieDomainPeriods = "0";
      s.currencyCode = 'USD';
      s.trackInlineStats = true;
      s.linkTrackVars = 'None';
      s.charSet = 'UTF-8';
      s.linkLeaveQueryString = false;
      s.linkExternalFilters = '';
      s.linkTrackEvents = true;
      //s.trackExternalLinks= true;
      s.linkDownloadFileTypes = 'exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls';
      s.linkInternalFilters = 'javascript:,' + window.location.hostname;
      s.trackDownloadLinks = true;

      s.visitorNamespace = "rolex";
      s.trackingServer = "metrics.rolex.com";
      s.trackingServerSecure = "rolex.112.2o7.net";

      // track plaque impression
      s.pageName = "Impression plaque";
      s.prop14 = this.config.domain;
      var s_code = s.t();
      if (s_code) document.write(s_code);

      // track plage click
      var plaqueContainer = document.getElementById(_self.getContainerId());
      if (plaqueContainer && plaqueContainer != null) {
        var nodeList = plaqueContainer.getElementsByTagName('a');
        if (nodeList.length > 0) {
          var a = nodeList.item(0);

          a.addEventListener('mouseup', function(event) {
            event.preventDefault();

            var s = s_gi(s_account);
            s.pageName = "Impression plaque";
            s.linkTrackEvents = "event28";
            s.linkTrackVars = "eVar13,eVar20";
            s.eVar13 = _self.config.domain;
            s.eVar20 = "Plaque";
            s.events = "event28";

            setTimeout(function() {
              _self.__trackPlaque(a, s);
            }, 500);

          });
        }
      }
    }
  };
}

/**
 *	RolexDealerPlaque v4
 */
RolexDealerPlaque = function() {
  var _self = this;
  CoBranding.call(this);
  this.getPlaque = function(config) {
    config.v4 = true;
    _self.getCoBranding.call(_self, config);
  };
};
