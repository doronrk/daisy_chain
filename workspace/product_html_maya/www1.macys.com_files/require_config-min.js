(function() {

    var paths = {
        // third party libraries
        async: '/js/min/vendor/script/requirejs/async',
        backbone: '/js/min/vendor/script/backbonejs/backbone',
        backbonerelational: '/js/min/vendor/script/backbone-relational/backbone-relational',
        domReady: '/js/min/vendor/script/requirejs/domReady',
        handlebars: '/js/min/vendor/script/handlebars/handlebars.runtime',
        jquery: '/js/min/vendor/script/jquery/jquery-1.9.1',
        jqueryui: '/js/min/vendor/script/jqueryui/jquery-ui-1.10.2.custom',
        'jqueryui-amd': '/js/min/vendor/script/jqueryui-amd',
        require: '/js/min/vendor/script/requirejs/require',
        swfobject: '/js/min/vendor/script/swfobject/swfobject',
        text: '/js/min/vendor/script/requirejs/text',
        underscore: '/js/min/vendor/script/underscorejs/underscore',
        webfont: '/js/min/vendor/script/requirejs/webfont',
        iscroll: '/js/min/vendor/script/iscroll/iscroll',
        iscrollIE8: '/js/min/vendor/script/iscroll/iscroll-ie8',
        iscrollinfinite: '/js/min/vendor/script/iscroll/iscroll-infinite',
        fastClick: '/js/min/vendor/script/fastClick/fastclick',
        zeroclipboard: '/js/min/vendor/script/zeroclipboard/zeroclipboard',

        // common
        accordian: '/js/min/common/components/Accordian',
        addressModel: '/js/min/common/backbone/models/address/AddressModel',
        analyticsBase: '/js/min/common/util/AnalyticsBase',
        autoTab: '/js/min/common/util/AutoTabbing',
        baseModel: '/js/min/common/backbone/models/BaseModel',
        baseNestedModel: '/js/min/common/backbone/models/BaseNestedModel',
        baseView: '/js/min/common/views/Base',
        browser: '/js/min/common/util/Browser',
        buttonZoomer: '/js/min/common/components/ButtonZoomer',
        category: '/js/min/common/models/Category',
        categoryCollection: '/js/min/common/collections/CategoryCollection',
        carousel: '/js/min/common/components/Carousel',
        cacheManager: '/js/min/common/util/CacheManager',
        channel: '/js/min/common/util/facade/Channel',
        clientSideStorage: '/js/min/common/util/ClientSideStorage',
        clock: '/js/min/common/features/clock/Clock',
        colorSwatches: '/js/min/common/components/colorSwatches',
        commonjs: '/js/min/common',
        contextFramework: '/js/min/common/components/ContextFramework',
        cookie: '/js/min/common/util/Cookie',
        coremetricsAttributes: '/js/min/common/util/CoremetricsAttributes',
        creditCardsList: '/js/min/common/backbone/models/creditCard/CreditCardsList',
        creditCardModel: '/js/min/common/backbone/models/creditCard/CreditCardModel',
        dateUtil: '/js/min/common/util/DateUtil',
        deviceInterchange: '/js/min/common/util/DeviceInterchange',
        drawerView: '/js/min/common/components/base/DrawerView',
        equalizer: '/js/min/common/util/Equalizer',
        footerView: '/js/min/common/components/base/FooterView',
        form: '/js/min/common/util/Form',
        globals: '/js/min/common/util/Globals',
        googleConfig: '/js/min/mcom/base/GoogleConfig',
        googleMaps: '/js/min/common/components/stores/GoogleMaps',
        hbsFormHelpers: '/js/min/common/hbsHelpers/FormHelpers',
        hbsHelpers: '/js/min/common/hbsHelpers/Helpers',
        hbsUtils: '/js/min/common/hbsHelpers/Utils',
        hostConfig: '/js/min/mcom/base/HostConfig',
        imageUtils: '/js/min/common/util/ImageUtils',
        iShip: '/js/min/common/components/iShip',
        keycodeFilter: '/js/min/common/util/KeycodeFilter',
        localStorage: '/js/min/common/util/LocalStorageCache',
        logger: '/js/min/common/util/Logger',
        mapCache: '/js/min/common/util/MapCache',
        models: '/js/min/common/backbone/models',
        objectUtil: '/js/min/common/util/ObjectUtil',
        overlayView: '/js/min/common/components/base/OverlayView',
        offersList: '/js/min/common/backbone/models/offers/OffersList',
        offersModel: '/js/min/common/backbone/models/offers/OffersModel',
        phoneModel: '/js/min/common/backbone/models/phone/PhoneModel',
        pubsub: '/js/min/common/util/PublishSubscribe',
        pubsubMixin: '/js/min/common/util/PublishSubscribeMixin',
        productModel: '/js/min/common/backbone/models/Product',
        productThumbnail: '/js/min/common/components/productThumbnail',
        recommendation: '/js/min/common/components/Recommendation',
        registryUtil: '/js/min/common/util/RegistryUtil',
        rewardCardsList: '/js/min/common/backbone/models/rewardCard/RewardCardsList',
        rewardCardModel: '/js/min/common/backbone/models/rewardCard/RewardCardModel',
        sampleModule: '/js/min/common/base/SampleModule',
        security: '/js/min/common/util/Security',
        segmentation: '/js/min/common/util/Segmentation',
        serviceHandler: '/js/min/common/util/ServiceHandler',
        sideBySideImageZoomer: '/js/min/common/components/SideBySideImageZoomer',
        sortedMap: '/js/min/common/util/SortedMap',
        store: '/js/min/common/components/stores/Store',
        storeAvailability: '/js/min/common/components/stores/StoreAvailability',
        storeCollection: '/js/min/common/components/stores/StoresCollection',
        storeDataMergeHandler: '/js/min/common/components/stores/StoreDataMergeHandler',
        storeFactory: '/js/min/common/components/stores/StoresFactory',
        storesMap: '/js/min/common/components/stores/StoresMap',
        storesNearby: '/js/min/common/components/stores/StoresNearby',
        subCategory: '/js/min/common/models/SubCategory',
        subCategoryCollection: '/js/min/common/collections/SubCategoryCollection',
        user: '/js/min/common/models/User',
        mathUtil: '/js/min/common/util/MathUtil',
        navigation: '/js/min/common/collections/Navigation',
        stringUtil: '/js/min/common/util/StringUtil',
        textBoxClearable: '/js/min/common/components/TextBoxClearable',
        textBoxFilterList: '/js/min/common/components/TextBoxFilterList',
        thumbnail: '/js/min/common/components/Thumbnail',
        userLocation: '/js/min/common/components/stores/UserLocation',
        validation: '/js/min/common/components/validation/Validation',
        validationManager: '/js/min/common/components/validation/ValidationManager',
        validators: '/js/min/common/components/validation/validators/Common',
        wishList: '/js/min/common/components/WishList/WishList',
        wishListCollection: '/js/min/common/components/WishList/WishListCollection',
        wishListInfo: '/js/min/common/components/WishList/WishListInfo',
        // handlebar templates base location
        hbsTemplates: '/templates',
        hbsCommonTemplates: '/templates/common'
    };

    var shims = {
        'jqueryui': {
            deps: ['jquery'],
            exports: 'jQuery.ui'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backbonerelational: {
            deps: ['backbone'],
            exports: 'Backbone.RelationalModel'
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        swfobject: {
            exports: 'swfobject'
        },
        iscroll: {
            exports: 'IScroll'
        },
        iscrollIE8: {
            exports: 'IScroll'
        },
        fastClick: {
            exports: 'fastClick'
        }
    };

    // set up require
    require.config({
        paths: paths,
        shim: shims
    });

})();
var paths = {

    //[COMMON CONFIG INJECTED HERE]

    // mcom
    account2: '/js/min/mcom/features/account2',
    accountHelpers: '/js/min/mcom/features/account2/hbsHelpers/accountHelpers',
    addOffersView: '/js/min/mcom/features/account2/wallet/views/AddOffersView',
    alternateImages: '/js/min/mcom/components/AlternateImages',
    base: '/js/min/mcom/components/Base',
    mcomBopsCookie: "/js/min/mcom/features/bops/bops_Cookie",
    mcomBopsCoreMetrics: '/js/min/mcom/features/refineByFacet/BopsCoremetrics',
    mcomBopsFacetCommon: '/js/min/mcom/features/refineByFacet/BopsCommon',
    mcomBopsFacetOverlay: '/js/min/mcom/features/refineByFacet/BopsOverlay',
    mcomBopsFacetSelect: '/js/min/mcom/features/refineByFacet/BopsSelect',
    mcomBopsGME: '/js/min/mcom/features/refineByFacet/BopsGme',
    breadcrumbs: '/js/min/mcom/features/stores/jquery.rcrumbs',
    cmElement: '/js/min/mcom/util/CoreMetricsElement',
    creditCardView: '/js/min/mcom/features/account2/wallet/views/CreditCardView',
    creditCardAddView: '/js/min/mcom/features/account2/wallet/views/AddCreditCardView',
    colorSizeTypeManager: '/js/min/mcom/backbone/views/ColorSizeTypeManager',
    commonOverlay: '/js/min/mcom/features/account2/commonOverlay',
    detailsExclusionsView: '/js/min/mcom/features/account2/wallet/views/DetailsExclusionsView',
    eventSearchDetailView: '/js/min/mcom/features/stores/event/view/EventSearchDetailView',
    eventSearchResultView: '/js/min/mcom/features/stores/event/view/EventSearchResultView',
    eventSearchRouter: '/js/min/mcom/features/stores/event/model/EventSearchRouter',
    eventSearchView: '/js/min/mcom/features/stores/event/view/EventSearchView',
    footerTablet: '/js/min/mcom/components/footer/FooterTablet',
    formValidation: '/js/min/mcom/util/FormValidation',
    header: '/js/min/mcom/features/header/Header',
    headerFlyout: '/js/min/mcom/features/header/HeaderFlyout',
    headerFOBNav: '/js/min/mcom/features/header/HeaderFOBNavigation',
    headerNavTablet: '/templates/mcom/features/header/TabletHeaderNavigation',
    menuTablet: '/js/min/mcom/components/header/MenuTablet',
    loader: '/js/min/mcom/components/Loader',
    loyaltyFeature: '/js/min/mcom/features/loyalty',
    mcomAnalytics: '/js/min/mcom/components/analytics/Coremetrics',
    mcomjs: '/js/min/mcom',
    mcomColorSwatches: '/js/min/mcom/components/colorSwatches',
    mcomColorSwatchesTemplates: '/templates/mcom/component/colorSwatches',
    mcomErrorMessages: "/js/min/mcom/components/validation/errors",
    mcomFormValidators: "/js/min/mcom/components/validation/formValidators",
    mcomOverlay: '/js/min/mcom/components/Overlay',
    mcomProductThumbnail: '/js/min/mcom/components/productThumbnail',
    mcomSecurityResetPassword: '/js/min/mcom/features/account2/securityresetpassword',
    mcomTemplates: '/templates/mcom',
    mcomZoomer: '/js/min/mcom/features/zoomer',
    messagingLib: "/js/min/mcom/util/MessagingLib",
    noCreditCardView: '/js/min/mcom/features/account2/wallet/views/NoCreditCardView',
    noOffersView: '/js/min/mcom/features/account2/wallet/views/NoOffersView',
    newSizeChart: '/js/min/mcom/features/pdp/views/SizeChart',
    ocwOffersInListView: '/js/min/mcom/features/account2/wallet/views/offers/EachInList',
    ocwOffersRemoveView: '/js/min/mcom/features/account2/wallet/views/offers/Remove',
    ocwOffersSectionView: '/js/min/mcom/features/account2/wallet/views/offers/Section',
    ocwOffersAddView: '/js/min/mcom/features/account2/wallet/views/offers/Add',
    ocwOverlayManager: '/js/min/mcom/features/account2/wallet/views/OverlayManager',
    orderDetailsTracking: '/js/min/mcom/features/ordermanagement/OrderDetailsTracking',
    offerListView: '/js/min/mcom/features/account2/wallet/views/OfferListView',
    offerRemoveView: '/js/min/mcom/features/account2/wallet/views/OfferRemove',
    promoHandler: '/js/min/mcom/components/header/PromoHandler',
    qvAdapter: '/js/min/mcom/components/quickView/QVAdapter',
    qvAddToBagModel: "/js/min/mcom/backbone/models/QVAddToBag",
    qvAddToBagView: '/js/min/mcom/backbone/views/QVAddToBagView',
    qvAddToWishlistModel: '/js/min/mcom/backbone/models/QVAddToWishlist',
    qvProductModel: '/js/min/mcom/backbone/models/QVProductModel',
    qvProductView: '/js/min/mcom/backbone/views/QVProductView',
    registry: '/js/min/mcom/features/registry/registry',
    returnTracking: '/js/min/mcom/features/ordermanagement/ReturnTracking',
    search: '/js/min/mcom/features/search/Search',
    storeDataCache: '/js/min/mcom/features/bops/storeCache',
    storeEvent: '/js/min/mcom/features/stores/event/model/StoreEvent',
    storeEventCollection: '/js/min/mcom/features/stores/event/model/StoreEventCollection',
    storeOverlay: "/js/min/mcom/features/bops/storeOverlay",
    storeRouter: '/js/min/mcom/features/stores/StoreRouter',
    storeView: '/js/min/mcom/features/stores/StoreView',
    storeHelpers: '/js/min/mcom/features/stores/hbsHelpers/storeHelpers',
    sizeChart: '/js/min/mcom/features/pdp/SizeChart',
    textBoxAutoComplete: '/js/min/mcom/components/TextBoxAutoComplete',
    thumbCarousel: '/js/min/mcom/components/thumbCarousel/ThumbCarousel',
    thumbCarouselHelpers: '/js/min/mcom/components/thumbCarousel/hbsHelpers/ThumbHelpers',
    thumbCarouselView: '/js/min/mcom/components/thumbCarousel/ThumbView',
    thumbsCarouselView: '/js/min/mcom/components/thumbCarousel/ThumbsView',
    bagContent: '/js/min/mcom/components/thumbCarousel/BagContent',
    prosZSPController: '/js/min/mcom/components/thumbCarousel/controller/ZeroSearchPage',
    prosATBController: '/js/min/mcom/components/thumbCarousel/controller/AddToBagPage',
    prosBagController: '/js/min/mcom/components/thumbCarousel/controller/BagRecommendations',
    prosProductDetailsController: '/js/min/mcom/components/thumbCarousel/controller/ProductDetailsPage',
    prosOcpController: '/js/min/mcom/components/thumbCarousel/controller/OrderConfirmationPage',
    tabletNavigationTemplate: '/templates/mcom/component/header/menuTablet',
    tabletNavigation: '/js/min/mcom/features/navigation/Tablet',
    tracking: '/js/min/mcom/util/tracking',
    trafficSplitter: '/js/min/mcom/util/TrafficSplitter',
    walletPageView: '/js/min/mcom/features/account2/wallet/views/WalletPageView',
    walletStart: '/js/min/mcom/features/account2/wallet/wallet',
    wishListView: '/js/min/mcom/features/wishlist/wishListView',
    zoomer: '/js/min/mcom/components/quickView/zoomer',

    // handlebar templates base location
    tabletHeaderTemplate: '/templates/mcom/features/header/TabletHeaderNavigation',
    loyalty: '/js/min/mcom/features/loyalty/bag/Loyalty'

};

var shims = {
    //[COMMON SHIMS INJECTED HERE]
};

// set up require
require.config({
    shim: shims,
    paths: paths
});
require.config({
    urlArgs: 'timenow=2.6.0.10'
});