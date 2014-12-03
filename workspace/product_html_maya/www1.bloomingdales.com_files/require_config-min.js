(function() {
    var paths = {
        /* js still in script.jsp of responsive */
        autoCompleteLegacy: "/web20/assets/script/bloomies/base/autoComplete",
        baseLegacy: "/web20/assets/script/bloomies/base/base_2",
        bcomVideoLegacy: "/web20/assets/script/bloomies/catalog/videoSecure",
        cookieJar: "/javascript/cookieJar",
        cookieLegacy: "/web20/assets/script/bloomies/util/cookie",
        dynamicHeader: "/web20/assets/script/bloomies/hfr/dynamicHeader",
        featureDetection: "/web20/assets/script/bloomies/modernizr/featureDetection",
        flashLegacy: "/web20/assets/script/bloomies/util/flashUtility",
        flyoutLegacy: "/web20/assets/script/bloomies/hfr/flyout",
        modernizrLegacy: "/web20/assets/script/modernizr/modernizr-2.6.2-min",
        priceDataLegacy: "/shop/international/priceData",
        quickTimeLegacy: "/web20/assets/script/bloomies/util/quickTimeUtility",
        seasonalAd: "/web20/assets/script/bloomies/hfr/seasonalAd",
        standardLegacy: "/javascript/standard_2",
        userObjectLegacy: "/web20/assets/script/bloomies/base/userObject",

        /* bcom third party libraries */
        bcomBrightcove: "//sadmin.brightcove.com/js/BrightcoveExperiences"

        /* DO NOT REMOVE OR CHANGE THESE 2 LINES.  THEY ARE USED TO AUTOGENERATE THE COMMON CONFIGS*/
        /* macysJS GENERATED COMMON paths START */
        ,
        "async": "js/min/vendor/script/requirejs/async",
        "backbone": "js/min/vendor/script/backbonejs/backbone",
        "backbonerelational": "js/min/vendor/script/backbone-relational/backbone-relational",
        "domReady": "js/min/vendor/script/requirejs/domReady",
        "handlebars": "js/min/vendor/script/handlebars/handlebars.runtime",
        "jquery": "js/min/vendor/script/jquery/jquery-1.9.1",
        "jqueryui": "js/min/vendor/script/jqueryui/jquery-ui-1.10.2.custom",
        "jqueryui-amd": "js/min/vendor/script/jqueryui-amd",
        "require": "js/min/vendor/script/requirejs/require",
        "swfobject": "js/min/vendor/script/swfobject/swfobject",
        "text": "js/min/vendor/script/requirejs/text",
        "underscore": "js/min/vendor/script/underscorejs/underscore",
        "webfont": "js/min/vendor/script/requirejs/webfont",
        "iscroll": "js/min/vendor/script/iscroll/iscroll",
        "iscrollIE8": "js/min/vendor/script/iscroll/iscroll-ie8",
        "iscrollinfinite": "js/min/vendor/script/iscroll/iscroll-infinite",
        "fastClick": "js/min/vendor/script/fastClick/fastclick",
        "zeroclipboard": "js/min/vendor/script/zeroclipboard/zeroclipboard",
        "accordian": "js/min/common/components/Accordian",
        "addressModel": "js/min/common/backbone/models/address/AddressModel",
        "analyticsBase": "js/min/common/util/AnalyticsBase",
        "autoTab": "js/min/common/util/AutoTabbing",
        "baseModel": "js/min/common/backbone/models/BaseModel",
        "baseNestedModel": "js/min/common/backbone/models/BaseNestedModel",
        "baseView": "js/min/common/views/Base",
        "browser": "js/min/common/util/Browser",
        "buttonZoomer": "js/min/common/components/ButtonZoomer",
        "category": "js/min/common/models/Category",
        "categoryCollection": "js/min/common/collections/CategoryCollection",
        "carousel": "js/min/common/components/Carousel",
        "cacheManager": "js/min/common/util/CacheManager",
        "channel": "js/min/common/util/facade/Channel",
        "clientSideStorage": "js/min/common/util/ClientSideStorage",
        "clock": "js/min/common/features/clock/Clock",
        "colorSwatches": "js/min/common/components/colorSwatches",
        "commonjs": "js/min/common",
        "contextFramework": "js/min/common/components/ContextFramework",
        "cookie": "js/min/common/util/Cookie",
        "coremetricsAttributes": "js/min/common/util/CoremetricsAttributes",
        "creditCardsList": "js/min/common/backbone/models/creditCard/CreditCardsList",
        "creditCardModel": "js/min/common/backbone/models/creditCard/CreditCardModel",
        "dateUtil": "js/min/common/util/DateUtil",
        "deviceInterchange": "js/min/common/util/DeviceInterchange",
        "drawerView": "js/min/common/components/base/DrawerView",
        "equalizer": "js/min/common/util/Equalizer",
        "footerView": "js/min/common/components/base/FooterView",
        "form": "js/min/common/util/Form",
        "globals": "js/min/common/util/Globals",
        "googleConfig": "js/min/bcom/base/GoogleConfig",
        "googleMaps": "js/min/common/components/stores/GoogleMaps",
        "hbsFormHelpers": "js/min/common/hbsHelpers/FormHelpers",
        "hbsHelpers": "js/min/common/hbsHelpers/Helpers",
        "hbsUtils": "js/min/common/hbsHelpers/Utils",
        "hostConfig": "js/min/bcom/base/HostConfig",
        "imageUtils": "js/min/common/util/ImageUtils",
        "iShip": "js/min/common/components/iShip",
        "keycodeFilter": "js/min/common/util/KeycodeFilter",
        "localStorage": "js/min/common/util/LocalStorageCache",
        "logger": "js/min/common/util/Logger",
        "mapCache": "js/min/common/util/MapCache",
        "models": "js/min/common/backbone/models",
        "objectUtil": "js/min/common/util/ObjectUtil",
        "overlayView": "js/min/common/components/base/OverlayView",
        "offersList": "js/min/common/backbone/models/offers/OffersList",
        "offersModel": "js/min/common/backbone/models/offers/OffersModel",
        "phoneModel": "js/min/common/backbone/models/phone/PhoneModel",
        "pubsub": "js/min/common/util/PublishSubscribe",
        "pubsubMixin": "js/min/common/util/PublishSubscribeMixin",
        "productModel": "js/min/common/backbone/models/Product",
        "productThumbnail": "js/min/common/components/productThumbnail",
        "recommendation": "js/min/common/components/Recommendation",
        "registryUtil": "js/min/common/util/RegistryUtil",
        "rewardCardsList": "js/min/common/backbone/models/rewardCard/RewardCardsList",
        "rewardCardModel": "js/min/common/backbone/models/rewardCard/RewardCardModel",
        "sampleModule": "js/min/common/base/SampleModule",
        "security": "js/min/common/util/Security",
        "segmentation": "js/min/common/util/Segmentation",
        "serviceHandler": "js/min/common/util/ServiceHandler",
        "sideBySideImageZoomer": "js/min/common/components/SideBySideImageZoomer",
        "sortedMap": "js/min/common/util/SortedMap",
        "store": "js/min/common/components/stores/Store",
        "storeAvailability": "js/min/common/components/stores/StoreAvailability",
        "storeCollection": "js/min/common/components/stores/StoresCollection",
        "storeDataMergeHandler": "js/min/common/components/stores/StoreDataMergeHandler",
        "storeFactory": "js/min/common/components/stores/StoresFactory",
        "storesMap": "js/min/common/components/stores/StoresMap",
        "storesNearby": "js/min/common/components/stores/StoresNearby",
        "subCategory": "js/min/common/models/SubCategory",
        "subCategoryCollection": "js/min/common/collections/SubCategoryCollection",
        "user": "js/min/common/models/User",
        "mathUtil": "js/min/common/util/MathUtil",
        "navigation": "js/min/common/collections/Navigation",
        "stringUtil": "js/min/common/util/StringUtil",
        "textBoxClearable": "js/min/common/components/TextBoxClearable",
        "textBoxFilterList": "js/min/common/components/TextBoxFilterList",
        "thumbnail": "js/min/common/components/Thumbnail",
        "userLocation": "js/min/common/components/stores/UserLocation",
        "validation": "js/min/common/components/validation/Validation",
        "validationManager": "js/min/common/components/validation/ValidationManager",
        "validators": "js/min/common/components/validation/validators/Common",
        "wishList": "js/min/common/components/WishList/WishList",
        "wishListCollection": "js/min/common/components/WishList/WishListCollection",
        "wishListInfo": "js/min/common/components/WishList/WishListInfo",
        "hbsTemplates": "/templates",
        "hbsCommonTemplates": "templates/common",
        "bcomAjaxHandler": "js/min/bcom/util/AjaxHandler",
        "bcomBag": "js/min/bcom/features/bag",
        "bcomBase": "js/min/bcom/base/Base",
        "bcomBaseView": "js/min/bcom/views/BaseView",
        "bcomBopsCookie": "js/min/bcom/features/bops/BopsCookie",
        "bcomCatalog": "js/min/bcom/features/catalog",
        "bcomCmHeaderTablet": "js/min/bcom/components/header/CoremetricsHeaderTablet",
        "bcomColorSwatches": "js/min/bcom/components/colorSwatches",
        "bcomCommon": "js/min/bcom/base/Common",
        "bcomConvertIntlPrice": "js/min/bcom/util/ConvertIntlPrice",
        "bcomCoremetrics": "js/min/bcom/components/analytics/Coremetrics",
        "bcomEmailOfferAdd": "js/min/bcom/features/account/wallet/EmailOfferAdd",
        "bcomErrorMessages": "js/min/bcom/components/validation/errors",
        "bcomFacetDrawerTablet": "js/min/bcom/features/facet/facetDrawerTablet",
        "bcomFitPredictor": "js/min/bcom/features/fitPredictor/FitPredictor",
        "bcomFormHandler": "js/min/bcom/util/FormHandler",
        "bcomHbsHelpers": "js/min/bcom/hbsHelpers/Helpers",
        "bcomHbsPartials": "js/min/bcom/hbsHelpers/Partials",
        "bcomHeaderTablet": "js/min/bcom/components/header/headerTablet",
        "bcomInput": "js/min/bcom/components/custom/Input",
        "bcomJqueryui": "js/min/vendor/script/jquery/jquery-ui/jquery-ui-1.10.3.bcom",
        "bcomLeftNav": "js/min/bcom/components/leftNav",
        "bcomLottery": "/web20/assets/script/bloomies/util/lottery",
        "bcomLoyalty": "js/min/bcom/features/loyalty",
        "bcomMask": "js/min/bcom/components/security/Mask",
        "bcomPanel": "js/min/bcom/components/panel/Panel",
        "bcomPDP": "js/min/bcom/features/pdp",
        "bcomProductThumbnail": "js/min/bcom/components/productThumbnail",
        "bcomPartials": "templates/bcom/partials",
        "bcomQuickBag": "js/min/bcom/components/quickBag/quick_Bag",
        "bcomRegistry": "js/min/bcom/features/registry",
        "bcomRecommendation": "js/min/bcom/components/recommendation",
        "bcomServiceHandler": "js/min/bcom/util/ServiceHandler",
        "bcomSlideshow": "js/min/bcom/components/flex/Slideshow",
        "bcomStore": "js/min/bcom/features/store",
        "bcomTemplates": "templates/bcom",
        "bcomTileInput": "js/min/bcom/components/custom/TileInput",
        "bcomUIValidationHandler": "js/min/bcom/components/validation/UIValidationHandler",
        "bcomVideo": "js/min/bcom/components/flex/Video",
        "bcomWallet": "js/min/bcom/features/account/wallet",
        "bcomWishList": "js/min/bcom/features/wishlist",
        "bcomZoomer": "js/min/bcom/features/zoomer"
        /* macysJS GENERATED COMMON paths END ---- DO NOT ADD any entry AFTER this line */
    },
        shim = {
            /* bcom */
            "autoCompleteLegacy": {
                deps: ["jqueryui-amd/autocomplete"],
                exports: "BLOOMIES.AutoComplete"
            },
            "baseLegacy": {
                exports: "BLOOMIES"
            },
            "cookieLegacy": {
                deps: ["baseLegacy"],
                exports: "MACYS.util.Cookie"
            },
            "dynamicHeader": {
                deps: ["jquery", "baseLegacy"],
                exports: "BLOOMIES.dynamicHeader"
            },
            "featureDetection": {
                deps: ["baseLegacy", "modernizrLegacy"]
            },
            "flashLegacy": {
                deps: ["baseLegacy"],
                exports: "MACYS.util.flashUtility"
            },
            "flyoutLegacy": {
                deps: ["baseLegacy", "jqueryui"],
                exports: "BLOOMIES.flyouts.headerFlyout"
            },
            "priceDataLegacy": {
                deps: ["baseLegacy"],
                exports: "BLOOMIES.iShip"
            },
            "quickTimeLegacy": {
                deps: ["baseLegacy"],
                exports: "BLOOMIES.util.quickTimeUtility"
            },
            "seasonalAd": {
                deps: ["jquery"]
            },
            "userObjectLegacy": {
                deps: ["cookieJar"]
            },

            /* bcom third party libraries */
            "bcomBrightcove": {
                exports: 'brightcove'
            }

            /* DO NOT REMOVE OR CHANGE THESE 2 LINES.  THEY ARE USED TO AUTOGENERATE THE COMMON CONFIGS*/
            /* macysJS GENERATED COMMON shims START */
            ,
            bcomJqueryui: {
                deps: ['jquery'],
                exports: 'jQuery.ui'
            },
            "jqueryui": {
                "deps": ["jquery"],
                "exports": "jQuery.ui"
            },
            "backbone": {
                "deps": ["underscore", "jquery"],
                "exports": "Backbone"
            },
            "backbonerelational": {
                "deps": ["backbone"],
                "exports": "Backbone.RelationalModel"
            },
            "underscore": {
                "exports": "_"
            },
            "handlebars": {
                "exports": "Handlebars"
            },
            "swfobject": {
                "exports": "swfobject"
            },
            "iscroll": {
                "exports": "IScroll"
            },
            "iscrollIE8": {
                "exports": "IScroll"
            },
            "fastClick": {
                "exports": "fastClick"
            }

            /* macysJS GENERATED COMMON shims END ---- DO NOT ADD any entry AFTER this line */
        };

    require.config({
        baseUrl: commonAssetsServer || "/",
        // Add this map config in addition to any baseUrl or
        // paths config you may already have in the project.
        map: {
            // '*' means all modules will get 'jquery-private'
            // for their 'jquery' dependency.
            '*': {
                'jquery': 'jquery-private',
                'jqueryui': 'bcomJqueryui',
                'handlebars': 'bcomHbsHelpers'
            },

            // 'jquery-private' wants the real jQuery module
            // though. If this line was not here, there would
            // be an unresolvable cyclic dependency.
            'jquery-private': {
                'jquery': 'jquery'
            },


            // 'hbsHelpers' wants the real handlebars module
            'hbsHelpers': {
                'handlebars': 'handlebars'
            },

            // 'hbsFormHelpers' wants the real handlebars module
            'hbsFormHelpers': {
                'handlebars': 'handlebars'
            },

            // 'bcomPartials' wants the real handlebars module
            'bcomPartials': {
                'handlebars': 'handlebars'
            },

            // 'bcomHbsPartials' wants the real handlebars module
            'bcomHbsPartials': {
                'handlebars': 'handlebars'
            },

            // 'bcomHandlebars' wants the real handlebars module
            'bcomHbsHelpers': {
                'handlebars': 'handlebars'
            }
        },
        paths: paths,
        shim: shim
    });

    // and the 'jquery-private' module
    define("jquery-private", ['jquery'], function(jq) {
        window.$b = jq;

        /*
         * Override jQuery ajax(url, settings) method
         * Keep it within this if condition, so that it does not execute more than once
         */
        var fnAjax = jq.ajax;

        jq.extend({
            ajax: function(url, settings) {

                if (settings && !settings.data && settings.form) {
                    /* create a shallow copy, so that data does not get added to the original object */
                    settings = jq.extend({}, settings);
                    settings.data = jq(settings.form).serialize();
                }

                return fnAjax.call(this, url, settings);
            }
        });

        return jq.noConflict();
    });
})();