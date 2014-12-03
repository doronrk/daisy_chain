var envVars = "";
    var Locale = {
        getGsiLocaleData: function () {
            try {
                return config.locale.toLowerCase();
            }
            catch (err) {
                var xtraFlashParams = sendXtraFlashParam();
                return xtraFlashParams.split(urlencode("lang="))[1].toLowerCase();
            }
        },
        getLocaleData: function (pageHost) {
            //console.log('pageHost: ' + pageHost);
            if (!pageHost) {
                var pageHost = window.location.hostname.toLowerCase()
            }
            var queryLocale = '';

            if (pageHost == 'www.ralphlauren.com' || pageHost == 'polo.preview.gsipartners.com' || pageHost == 'polo-uat01.uat.gsipartners.com') {
                locale = 'en-us';
                pageLocale = 'en-us';
            }
            if (pageHost == 'www.ralphlauren.co.uk' || pageHost == 'rluk.preview.eur.gsipartners.com') {
                locale = 'en-gb';
                pageLocale = 'en-gb';
            }
            if (pageHost == 'www.ralphlauren.fr' || pageHost == 'rlfr.preview.eur.gsipartners.com') {

                try {
                    try { queryLocale = GetQsVal(window.location.href, 'locale').locale.toLowerCase(); }
                    catch (err) { queryLocale = locale.getGsiLocaleData(); }
                }
                catch (err) { }

                switch (queryLocale) {
                    case 'en_fr':
                        locale = 'en-fr';
                        pageLocale = 'en-fr';
                        break;
                    case 'it_fr':
                        locale = 'it-fr';
                        pageLocale = 'it-fr';
                        break;
                    case 'fr_fr':
                        locale = 'fr-fr';
                        pageLocale = 'fr-fr';
                        break;
                    default:
                        locale = 'fr-fr';
                        pageLocale = 'fr-fr';
                        break;
                }
            }
            if (pageHost == 'www.ralphlauren.de' || pageHost == 'rlde.preview.eur.gsipartners.com') {

                try {
                    try { queryLocale = GetQsVal(window.location.href, 'locale').locale.toLowerCase(); }
                    catch (err) { queryLocale = locale.getGsiLocaleData(); }
                }
                catch (err) { }

                switch (queryLocale) {
                    case 'en_de':
                        locale = 'en-de';
                        pageLocale = 'en-de';
                        break;
                    case 'de_de':
                        locale = 'de-de';
                        pageLocale = 'de-de';
                        break;
                    default:
                        locale = 'de-de';
                        pageLocale = 'de-de';
                        break;
                }
            }
            if (pageHost.indexOf('localhost') > -1 ||
                pageHost.indexOf('creative.ralphlauren.com') > -1 ||
                pageHost.indexOf('rtms') > -1) {
                try {
                    try { queryLocale = GetQsVal(window.location.href, 'locale').locale.toLowerCase(); }
                    catch (err) { queryLocale = locale.getGsiLocaleData(); }
                }
                catch (err) { }

                switch (queryLocale) {
                    case 'en_us':
                        locale = 'en-us';
                        pageLocale = 'en-us';
                        break;
                    case 'en_gb':
                        locale = 'en-gb';
                        pageLocale = 'en-gb';
                        break;
                    case 'en_fr':
                        locale = 'en-fr';
                        pageLocale = 'en-fr';
                        break;
                    case 'it_fr':
                        locale = 'it-fr';
                        pageLocale = 'it-fr';
                        break;
                    case 'fr_fr':
                        locale = 'fr-fr';
                        pageLocale = 'fr-fr';
                        break;
                    case 'en_de':
                        locale = 'en-de';
                        pageLocale = 'en-de';
                        break;
                    case 'de_de':
                        locale = 'de-de';
                        pageLocale = 'de-de';
                        break;
                    case 'en':
                        locale = 'en';
                        pageLocale = 'en';
                        break;
                    default:
                        locale = 'en-us';
                        pageLocale = 'en-us';
                }
            }

            return pageLocale;
        }
    }


    var Environment = {

        init: function () {
            return {
                gsiDomainHost: null,
                icgDomainHost: null,
                icgLocale: "en-us",
                cartContentsUrl: null,
                addToCartUrl: null,
                checkoutUrl: null,
                getData: function (hostname) {
                    this.icgLocale = Locale.getLocaleData(window.location.host);
                    var hostname = (hostname === undefined) ? window.location.hostname : hostname;
                    var url = 'http://qa.shop.ralphlauren.com/settings/' + hostname + '/' + this.icgLocale + '/';

                    return $j.ajax({
                        url: url,
                        jsonpCallback: "$",
                        dataType: "jsonp"
                    });
                }
            }
        }
    };

    var findinstore = {
        productId: null,
        colorId: null,
        sizeId: null,
        domain: null,
        environment: null,
        init: function () {
            //findinstore.productId = "41671606";
            findinstore.productId = findinstore.GetQsVal("productId");

            //Set colorID
            findinstore.colorId = jQuery("#color-swatches li.active").attr("data-value");

            //Set sizeID
            findinstore.sizeId = jQuery("#size-swatches li.active").attr("data-value");

            if (this.productId != null && this.productId != "undefined") {
                this.environment = Environment.init();
                var self = this;
                $j.when(this.environment.getData()).then(function (data) {

                    var currentVariables = JSON.parse(data.settings)[0].locales[0];

                    //set vars
                    self.environment.gsiDomainHost = 'http://' + currentVariables.gsiHost;
                    self.environment.icgDomainHost = 'http://' + currentVariables.mvcHost;
                    self.environment.cartContentsUrl = currentVariables.cartPath;
                    self.environment.addToCartUrl = currentVariables.addToCartPath;
                    self.environment.checkoutUrl = 'http://' + currentVariables.gsiHost + currentVariables.checkoutPath + '?ab=global_bag_qs_ctc';

                    envVars = self.environment.icgDomainHost;

                    jQuery.getScript(self.environment.icgDomainHost + '/scripts/lib/jquery.blockUI.js', function () {
                        findinstore.load(findinstore.productId, findinstore.colorId, findinstore.sizeId, "findinstore.display");
                    });
                });
            }
        },
        GetQsVal: function (sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        },
        center: function (element) {
            element.css("position", "absolute");
            element.css("top", (jQuery(window).height() - element.height()) / 2 + jQuery(window).scrollTop() + "px");
            element.css("left", (jQuery(window).width() - element.width()) / 2 + jQuery(window).scrollLeft() + "px");
            return element;
        },
        processEnv: function (data) {
            findinstore.load(data.settings, findinstore.productId, findinstore.colorId, findinstore.sizeId, "findinstore.display");
        },
        load: function (productId, colorId, sizeId, callback) {

            //console.log('gsiDomainHost: ' + this.environment.gsiDomainHost);
            //console.log('this.environment.icgDomainHost: ' + this.environment.icgDomainHost);

            var modalWidth = 700;
            var modalHeight = 350;

            jQuery.unblockUI();
            jQuery.blockUI.defaults.css = {};
            jQuery.blockUI({
                message: '<div class="loader" style="position: fixed; width: 32px;height:32px;top:50%;left:50%;margin: -16px 0px 0px -16px;">' +
                        '<div class="loader_in">' +
                          '<img src="' + this.environment.icgDomainHost + '/Content/Variation/common/shop/img/loader_white.gif" alt="" />' +
                        '</div>' +
                     '</div>',
                blockMsgClass: 'prodFiS',
                css: {
                    top: '100%',
                    left: '100%',
                    width: modalWidth,
                    height: modalHeight,
                    margin: '-' + Math.ceil(modalHeight / 2) + 'px 0px 0px -' + Math.ceil(modalWidth / 2) + 'px'
                },
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.6
                },
                fadeIn: 0 // Disabled fadeIn to fix overlay issue in Chrome
            });

            findinstore.center(jQuery('.prodFiS'));

            //jQuery.getScript(this.environment.icgDomainHost + "/api/en-us/home/FindInStore?productId=" + productId + "&colorId=" + findinstore.colorId + "&sizeId=" + findinstore.sizeId + "&callback=" + callback);
            jQuery.getScript(this.environment.icgDomainHost + "/FindInStore/en-us/home/FindInStore?productId=" + productId + "&colorId=" + findinstore.colorId + "&sizeId=" + findinstore.sizeId + "&callback=" + callback);

            var evt_type = ("ontouchstart" in window) ? 'touchstart' : 'click';
            jQuery(".blockOverlay, .prod_pop_close").live(evt_type, function () {
                jQuery.unblockUI();
                return false;
            });

            jQuery(window).resize(function () {
                var modal = jQuery(".blockUI.prodFiS");
                if (modal.length > 0) {
                    modal.center();
                }
            });
            return false;
        },
        display: function (data) {

            findinstore.center(jQuery('.prodFiS').html(data.view));
            jQuery(".blockUI.prodFiS").css("cursor", "default");
        }
    };

    jQuery(document).ready(function () {
        jQuery("#find-in-store").click(function (e) {
            e.preventDefault();
            findinstore.init();
        });
    });