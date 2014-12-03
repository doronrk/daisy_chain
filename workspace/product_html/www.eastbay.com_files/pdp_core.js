
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        if (this === undefined || this === null) {
            throw new TypeError('"this" is null or not defined');
        }

        var length = this.length >>> 0; // Hack to convert object.length to a UInt32

        fromIndex = +fromIndex || 0;

        if (Math.abs(fromIndex) === Infinity) {
            fromIndex = 0;
        }

        if (fromIndex < 0) {
            fromIndex += length;
            if (fromIndex < 0) {
                fromIndex = 0;
            }
        }

        for (; fromIndex < length; fromIndex++) {
            if (this[fromIndex] === searchElement) {
                return fromIndex;
            }
        }

        return -1;
    };
}

(function () {
    var method;
    var noop = function () { };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Handle undefined methods
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

if (typeof (cmSetupOther) == 'function') { cmSetupOther({ "cm_TrackImpressions": "" }); }

var productVariables = {
    timeStart: 0,
    timeEnd: 0,
    timerID: new Object(),
    additionalColors: '',
    timeToHL: -1,
    pageLoadedTS: -1,
    globalTimer: -1,
    globalTimerHandle: null,
    hlEnd: -1,
    adjust: $('#fixed_banner').height(), // Adjustment for Fixed bar at top of site when scroll to
    styleData: window['styles_' + model_nbr],
    scrollTarget: 'html, body',
    modelData: window['model'],
    nonSaleLabel: '', // Default label in front of Reg Price when not on Sale
    saleLabel: 'NOW', // Default label in front of Sale Price
    percentLabel: 'Discount: ', // Default label in front of Percent Off
    savingsLabel: 'Save: ', // Default label in front of Savings
    priceInCartLabel: 'See price in cart',
    displayPercent: false, // Display Percent Off
    displaySavings: false, // Display Savings
    outOfStockMessage: '', // Display after out of stock size
    displaySFS: true,
    productName: '',
    SFSMessage: ' - Only ships to lower 48 states',
    inlineZoomDim: ['1000', '1000'],
    productSpotlight: new Object(),
    stylesSpotlight: new Object(),
    stylesSpotlightSettings: new Object(),
    mainImageSize: ['zoom', '500'],
    timerLabels: ['This item is available in:', 'hrs', 'min', 'sec'],
    launchCopy: 'Please note: Your order is not finalized until the checkout process is complete and you receive a shipment confirmation email.',
    launchMaxCopy: 'Product added to the cart is not guaranteed until the checkout process is completed.',
    hot_launch_max_per_order: 1,
    recentlyViewedOptions: { 'maxProducts': 3, 'imageSize': ['large', 'l'], 'imageDomain': '//images.eastbay.com', 'noProducts': '', 'requestData': true, 'template': '[rv.image][rv.modelname][rv.listprice]' },
    otherStylesOptions: { 'maxProducts': 4, 'imageSize': ['small', 's'] },
    TOUCH_DEVICE: (typeof document.ontouchstart != "undefined") ? true : false,
    tooltipAction: 'click',
    tooltipSettings: { 'showOn': 'click', 'maxWidth': 350 },
    fitGuarentee: '/customerserv/help:returnPolicy/?cm_sp=PDP-_-Sizing-_-FitSatisfaction',
    fitInfoJSON: '/ns/common/pdp/js/fit-info.js', // FIT Info JSON feed
    fitInfoObject: {},
    fitInfoImgBaseURL: '/images/fl/iconFlags/',
    productIcons: '/images/products/iconFlags/',
    striperpediaContent: '/shared/json/productContent?site=striperpedia&sku=',
    sizingURL: '/catalog/productSpecificSizing.cfm?sizechart_cd=', //  Base Size chart URL, append Size Chart ID
    includedMetadata: null,
    netItemMessage: '<span class="message" id="newItem">New Item</span>',
    excludedMessage: '<span class="message" id="excludedMessage" title="Item is excluded from discount. View details."> Excluded From Discount <a class="pdp_sprite info_icon" data-tooltip="The dollar value of this item will count toward meeting a required minimum purchase total necessary to receive a discount, but the price of this item itself will not be discounted. Only other eligible items in your cart will be discounted. (Example: You can purchase this product to reach the order threshold to receive a discount, but you will only receive the discount on other eligible items in your cart.)"></a></span>',
    freeShippingMessage: '<span class="message" id="freeShippingMessage" title="Item is eligible for FREE shipping. View details."> Free Shipping <a class="pdp_sprite info_icon" data-tooltip="We offer FREE SHIPPING on thousands of items every day! Look for the &quot;Free Shipping&quot; indicator on all eligible merchandise. Shipping will automatically be deducted at checkout. *Please note: This offer is valid only on eligible items, and does not apply to in-store orders. This offer is limited to standard delivery within the 48 contiguous US states and APO/FPO addresses. Excludes bulk orders and drop ships. Entire order must ship to a single address. Customer is responsible for shipping costs on returned merchandise. May not be used toward purchase of Gift Cards or team orders. Promotion may be modified or terminated at any time. Certain restrictions and exclusions may apply."> Free Shipping </a></span>',
    shipRestrictionMessage: '<span class="message" id="shipRestrictionMessage" title="There are shipping restrctions on this item. View details."> International shipping restrictions may apply <a class="pdp_sprite info_icon" data-tooltip="International shipping restrictions apply. International customers will be informed during check-out if restrictions apply to your country. "></a></span>',
    seePriceInCartMessage: '<span class="message" id="seePriceInCartMessage" title="A lower price for this item will be shown in the cart. View details."><a class="pdp_sprite info_icon" data-tooltip="Please add this item to your cart to see a special price just for you!"></a></span>',
    bogoMessage: '<span class="message" id="bogoMessage" title="Buy One, Get One 50% Off"> Buy One, Get One 50% Off <a class="pdp_sprite info_icon" data-tooltip="Discount will be applied once both items are in your cart. Only one discount per order."></a></span>',
    webExclusive: '<span class="message" id="webExclusive">Web Exclusive</span>',
    selectedSize: null, // Current Size selected
    // sizesWritten: false,
    pdpStyle: 'tabbed', // Changes layout of PDP --- inline, tabbed, jumpinline
    alternateColorStyle: 'pushdown', //pushdown, spotlight
    pinInfo: false,
    pinTabs: false,
    initCall: true,
    reviewsLoaded: false,
    regularPriceLabel: '',
    showOutOfStock: true, // Display out of stock sizes
    launchLoaded: false,
    launchHelp: '/content/launchHelp',
    inlineZoomSettings: { 'type': 'drag', 'initAction': 'click', 'zoomLevels': ['100%', '1000'], 'zoomSize': 500 },
    productSpotlightSettings: { 'swipe': true },
    readmoreSettings: { 'readmoretext': 'read more +', 'readlesstext': 'read less -' },
    showTrueSize: true,
    pdpVideoSettings: { 'ajaxVideoURL': '/shared/pdp/product_videos?site=eastbay&' },
    sizeSelectSize: 1,
    sizeChart: '/sizingData/?returnType=html&SizeChart_cd=',
    backorderMessage: '<span class="message boNoticeMessage">Back-ordered, Expected to Ship {DATE}</span>',
    pdpTop: parseInt($('.pdp_wrapper').offset().top) - 45,
    originalSku: sku_nbr,
    nonScene7url: 'http://images.eastbay.com/pi/',
    scene7url: 'http://images.eastbay.com/is/',
    dragging: false,
    styleReference: [
		'attributes',  // 0
		'excludedFromDiscount',  // 1
		'availableForPurchase',  // 2
		'XforY',  // 3
		'fitIcon',  // 4
		'listPrice',  // 5
		'salePrice',  // 6
		'availableSizes',  // 7
		'scene7Enabled',  // 8
		'hasArticles',  // 9
		'hasVideos',  // 10
		'tieredPricing',  // 11
		'metadata',  // 12
		'team',  // 13
		'player',  // 14
		'color',  // 15
		'width',  // 16
		'shortDescription',  // 17
		'icon1',  // 18
		'icon2',  // 19
		'shippingChargeAmount',  // 20
		'shippingChargeType',  // 21
		'hasYMALS',  // 22
		'hasXforY',  // 23
		'primaryColor',  // 24
		'secondaryColor',  // 25
		'premierSourceCodes'  // 26
    ]
}

var productFunctions = {

    // initialize PDP functionality
    init: function () {
        $('div[data-info=product_images]').empty();
        if (typeof layout !== 'undefined') {
            productVariables.pdpStyle = layout;
        }
        $('.pdp_top_nav').attr('data-layout', productVariables.pdpStyle);

        productFunctions.updateImages(false);

        // test
        //productVariables.timeToHL = 10;
        //Prod
        $.getScript('/images/common/js/timevariable.cfm?variable=curTime', function () {

            productVariables.timeToHL = parseInt(productLaunchTimeUntil);
            //   console.log(productVariables.timeToHL);
            productVariables.globalTimer = productVariables.pageLoadedTS = epoch;
            productVariables.hlEnd = productVariables.pageLoadedTS + productVariables.timeToHL;
            productVariables.globalTimerHandle = setInterval(function () {
                productVariables.globalTimer++;
            }, 1000);
            productFunctions.initHotLaunch();

        });


        $.ajax({
            url: productVariables.fitInfoJSON,
            dataType: 'json',
            async: false,
            error: function (error) {
                //console.log('ERROR'+ error);
            },
            success: function (data) {
                productVariables.fitInfoObject = data;
                //console.log(productVariables.fitInfoObject);
            }
        });

        if (productVariables.TOUCH_DEVICE) {
            productVariables.tooltipAction = 'click';
        }

        // productFunctions.getDescription(); //THIS IS ACTUALLY FOR SPECIFIC SHOE CALLOUTS SUCH AS "TURF"

        productFunctions.getOtherStyles();

        productFunctions.getVideos();
        //productFunctions.getRecentlyViewed();  THIS IS NOW IN DEFER.JS 
        //productFunctions.getRecommendations(); THIS IS NOW IN DEFER.JS  
        productFunctions.getReviews();
        productFunctions.getQuestions();

        productFunctions.updateAttr();

        productFunctions.updateMessaging();
        productFunctions.updatePrice();
        productFunctions.getFitInfo();
        // Uses Ratings jquery.lib plugin to display Star Ratings
        $('.ratings').ratings();

        productFunctions.initTabs();

        // Load initially hidden items for inline view
        if (productVariables.pdpStyle.indexOf('inline') !== -1) {

            $('[data-tabcontent]').show();
            $('[data-layout="inline"]').show();
            productFunctions.getSizing();
        } else {
            $('[data-layout="tabbed"]').show();
        }

        productFunctions.initDock();
        productFunctions.loadHash();

        // iOS fix for label functionality
        $("label[for],input[type='radio']").bind("click", function (e) {
            e.stopPropagation();
        });
        //productFunctions.addRadioListener('.delivery');
        if (productVariables.TOUCH_DEVICE) {
            $('body').attr('data-touch', 'true');
        }

        if (productVariables.selectedSize != '') {
            productFunctions.searchSize(productVariables.selectedSize);
        }

        productFunctions.initInfoI();
    },

    initInfoI: function () {
        //  console.log("func initInfoI");
        $('.info_icon').each(function () {
            if ($(this).attr('data-loaded') != 'true') {
                try {
                    if (typeof (productVariables.tooltipSettings.closeButton) === 'undefined') {
                        $.extend(productVariables.tooltipSettings, { 'closeButton': productVariables.TOUCH_DEVICE });
                    }
                    Tipped.create(this, $(this).attr('data-tooltip'), productVariables.tooltipSettings);
                    $(this).attr('title', $(this).parent().attr('title'));
                    $(this).attr('data-loaded', 'true');
                } catch (err) { }
            }
        });
    },

    initHotLaunch: function () {
        //  console.log('func initHotLaunch');
        productVariables.timeToHL = productVariables.hlEnd - productVariables.globalTimer;
        productFunctions.killHotLaunchTimer();
        $("#pdp_timer").empty();
        $('[data-info=add_to_cart]').hide();
        $('[data-info=add_to_wishlist]').hide();
        $('[data-launchhide]').hide();

        //console.log(productVariables.timeToHL);
        //console.log(productFunctions.checkHotLaunchItem($("#pdp_selectedSKU").val()));

        if (productVariables.timeToHL < 0 || !productFunctions.checkHotLaunchItem($("#pdp_selectedSKU").val())) {
            //console.log('hotLaunch Update Size');
            productFunctions.updateSizes();
            $("#pdp_addToCart").show();
            $('[data-info=add_to_cart]').show();
            $('[data-info=add_to_wishlist]').show();
            $('[data-launchhide]').css({ 'display': 'block' });
            $("#pdp_timer").hide();
            $("#pdp_hotsku_max").hide();
            $('#launchPreCopy').hide();
            $('#launchPostCopy').hide();
            productFunctions.killHotLaunchTimer();
            if (productLaunchStyles.indexOf($("#pdp_selectedSKU").val()) !== -1) {
                if (productFunctions.checkHotSkuQtyOverMax($("#pdp_selectedSKU").val(), $("#pdp_quantity").val())) {
                    $("#pdp_timer").append('<span class="launch_max_copy">' + productVariables.launchMaxCopy + '</span>');
                }
            }
            if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['ELIGIBLE_SHIPTOSTORE'] && productLaunchStyles.indexOf($("#pdp_selectedSKU").val()) === -1) {
                if (BORISEnabled) {
                    $('[data-info=product_delivery] #dm_storepickup').show();
                    $('[data-info=product_delivery]').show();
                }
                $('#addToWishlist').show();
            }
            if (productLaunchStyles.indexOf($("#pdp_selectedSKU").val()) !== -1) {
                if ($('#launchPostCopy').length == 0) {
                    $('#launchPostCopy').remove();
                    $('#select_size').after($('<div />', { 'id': 'launchPostCopy' }).html('<span class="launch_copy">' + productVariables.launchCopy + '</span>'));
                } else {
                    $('#launchPostCopy').html('<span class="launch_copy">' + productVariables.launchCopy + '</span>')
                }
                $('#launchPostCopy').show();
                $('#deliveryMethod_shiptohome').click();
            }
            return;
        } else {
            $('[data-info=product_delivery]').hide();
            $('#launchPreCopy').show();
            $('#launchPostCopy').hide();
            $('div[data-info=product_sizes]').html('<div id="pdp_timer"></div>');
            $("#pdp_timer").show();
            $("#pdp_hotsku_max").show();
        }
        var sec = productVariables.timeToHL % 60;
        var min = parseInt(productVariables.timeToHL / 60) % 60;
        var hour = parseInt(productVariables.timeToHL / (60 * 60));

        $("#pdp_timer").append('<span class="title">' + productVariables.timerLabels[0] + '</span><span class="time">' + hour + " " + productVariables.timerLabels[1] + " " + min + " " + productVariables.timerLabels[2] + " " + sec + " " + productVariables.timerLabels[3] + '</span>');
        $("#launchPreCopy").html('<span class="launch_copy">' + productVariables.launchCopy + '</span>');
        productVariables.timerID = setTimeout("productFunctions.initHotLaunch()", 1000);
    },
    killHotLaunchTimer: function () {
        //console.log('func killHotLaunchTimer');
        clearTimeout(productVariables.timerID);
    },
    checkHotLaunchItem: function (sku) {
        //console.log('func checkHotLaunchItem');
        return (productLaunchStyles.indexOf(sku) !== -1 && productVariables.timeToHL > 0) ? true : false;
    },
    checkHotSkuQtyOverMax: function (sku, quantity) {
        //console.log('func checkHotSkuQtyOverMax');
        if (productLaunchStyles.indexOf(sku) !== -1 && productVariables.hot_launch_max_per_order > 0 && productFunctions.checkHowManyHLSKU(sku) + parseInt(quantity) > productVariables.hot_launch_max_per_order) {
            return true;
        }
        return false;
    },
    checkHowManyHLSKU: function (sku) {
        //console.log('func checkHowManyHLSKU');
        // sku,qty|sku,qty
        var hlincart = readCookie("HLCOUNT");
        var cartskus = readCookie("CARTSKUS");
        if (hlincart != null) {
            var matchSku = false;
            var skuitems = decodeURIComponent(cartskus).split(",");
            for (var s = 0; s < skuitems.length; s++) {
                if (skuitems[s] == sku) {
                    matchSku = true;
                }
            }
            var hlitems = decodeURIComponent(hlincart).split("|");
            for (var e = 0; e < hlitems.length; e++) {
                var hlitem = hlitems[e].split(":");
                if (hlitem[0] == sku && matchSku) {
                    return parseInt(hlitem[1]);
                }
            }
        }
        return 0
    },
    validateProduct: function () {
        var size = $("#pdp_selectedSize").val();
        var quantity = $("#pdp_quantity").val();
        var sku = $("#pdp_selectedSKU").val();
        var style = styles[sku];
        var errMsg = "";
        var errCount = 0;
        if (productFunctions.checkHotLaunchItem(sku) || !productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableForPurchase')]) {
            errMsg = "<li role='alert'>This item is currently unavailable for purchase.</li>";
            return errMsg;
        }

        if (!model.HASSIZES || ("PICKUP_IN_STORE" == $("#pdp_fulfillmentType").val() || (size != ""))) {
            var selectedSizeAvailable = true;
        } else {
            var selectedSizeAvailable = false;
        }
        if (model.HASSIZES && size.trim() == "") {
            errMsg += "<li role='alert'>Select a size.</li>";
            errCount++;
        }

        if (/^\d+$/.test(quantity) == false || quantity <= 0 || quantity >= 256) {
            errMsg += "<li role='alert'>Please enter a valid quantity.</li>";
            errCount++;
        }

        if (errCount < 2 && typeof hasgriptape != 'undefined' && hasgriptape == true) {
            var griptape = $("#pdp_griptape").val();
            if (griptape.trim() == "") {
                errMsg += "<li role='alert'>Please select a grip tape.</li>";
                errCount++;
            }
        }

        if (productFunctions.checkHotSkuQtyOverMax(sku, quantity)) {
            errMsg = "<li role='alert'>Order quantity is limited on this product to " + productVariables.hot_launch_max_per_order + " per customer.</li>";
            return errMsg;
        }

        return errMsg;
    },
    displayError: function (obj, message) {
        //console.log('func displayError');
        //console.log(obj.html());
        //console.log(obj);
        obj.html(message);
        obj.show();
        $(document).off('click', productFunctions.clearError).on('click', { obj: obj, message: message }, productFunctions.clearError);
    },
    clearError: function (e) {
        //console.log('func clearError');
        e.data.obj.hide();
        $(document).unbind('click', productFunctions.clearError);
    },
    // Call To Swap Sku/Style
    changeSku: function (sku, selected) {
        //   console.log("func changeSku");
        var tempSku = sku_nbr;
        sku_nbr = sku;

        //$('.add_to_cart input').removeClass('active_step');
        productFunctions.updateAttr();

        if (!selected) {
            productFunctions.updateImages(sku);
        } else {
            if (sku != tempSku || $('#selected_item').html() == null) {
                productFunctions.updateImages(false);
                // productFunctions.updateSizes(); //Problem function on hover
                $('a[data-sku=' + sku + ']').addClass('selected');
            }
        }

        productFunctions.updatePrice();
        productFunctions.getFitInfo();
        productFunctions.updateMessaging();

        $('#pdp_model').val(model_nbr);
        $('[data-info=product_sku]').html(sku);

        productFunctions.initInfoI();

        if (!selected) {
            sku_nbr = tempSku;
        }
        $('#pdp_selectedSKU').val(sku_nbr);
        productFunctions.initHotLaunch();
    },
    scene7Unavailable: function (error) {
        //  console.warn('func scene7Unavail');
        $('.fullscreen-maximize').remove();
        $('#zoominit').hide();
        $('#product_images').removeClass('full');
    },
    // Call to Scene7 to update Alternate Views TODO
    updateImages: function (sku) {
        //  console.log("func updateImages");

        //IF HOVERING OVER PRODUCT
        if (typeof (sku) === 'string') {

            if ($('div[data-info=product_images] #hover_item').html() == null) {
                $('div[data-info=product_images]').append('<div id="hover_item">'
					+ '<ul><li></li>'
					+ '</ul>'
				+ '</div>');
            }

            if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('scene7Enabled')]) {
                //$('#zoominit').show();
                $('div[data-info=product_images] #hover_item ul li').html('<img src="' + productVariables.scene7url + sku + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" class="reg_image a" title="View Full Screen" data-imageType="scene7" data-pisrc="' + productVariables.nonScene7url + sku + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" border="0" alt="' + productVariables.modelData.NM + '" />');
            } else {
                //$('#zoominit').hide();
                $('div[data-info=product_images] #hover_item ul li').html('<img src="' + productVariables.nonScene7url + sku + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" class="reg_image" border="0" alt="' + productVariables.modelData.NM + '" />');
                //$('.shoe_images').removeClass('hidden');
            }
            $('[data-imageType="scene7"]').error(productFunctions.scene7ErrorLoad);
        } else {
            //IF PRODUCT WAS CLICKED or on page load
            //Duplicate product image fix

            if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('scene7Enabled')]) {

                //$('#zoominit').show();
                $.ajax({
                    url: scene7url + 'EBFL/' + sku_nbr + '?req=imageset,json'
					, dataType: 'script'
					, error: function (error) {
					    ;
					}
					, success: function (data) {
					    ;
					}
                    // 's7jsonResponse' is the named function returned by the ajax object above (data)
                });
            } else {
                $('#product_images').remove();
                if ($('div[data-info=product_images] #selected_item').html() == null) {
                    $('.shoe_images').append('<div data-info="product_images"><div id="selected_item" class="slide_content">'
                        + '<ul><li></li>'
                        + '</ul>'
                    + '</div></div>');
                }
                $('div[data-info=product_images]').attr({ 'id': 'product_images', 'class': 'spotlight' });

                $('div[data-info=product_images] #selected_item ul li').html('<img src="' + productVariables.nonScene7url + sku_nbr + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" class="reg_image" border="0" alt="' + productVariables.modelData.NM + '" /><div class="pdp_sprite product_shadow"></div>');
                $('#product_images .slide_buttons').remove();
                if (typeof (productVariables.productSpotlight.numSlides) != 'undefined') {
                    productVariables.productSpotlight.numSlides = 1;
                }
                productFunctions.scene7Unavailable();
                //$('#zoominit').hide();			
            }

        }
        $('.shoe_images').removeClass('hidden');

        $('#hover_item').css({ 'position': 'absolute', 'display': 'none' });
    },

    // Call to Update Messaging
    updateMessaging: function () {
        //$('[data-info=product_messaging]').empty();
        //  console.log("func updateMessaging");
        $('.fs_badge, .xy_badge').empty();
        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['FREE_STANDARD_SHIPPING'] && freeShippingEnabled) {
            $('.fs_badge').html(productVariables.freeShippingMessage).show();
            $('#dm_shiptohome').attr('data-free_shipping', 'true');
        } else {
            $('.fs_badge').html('').hide();
            $('#dm_shiptohome').attr('data-free_shipping', 'false');
        }

        /*if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['CHANNEL_AVAIL_ICON'] == 'WEB_ONLY') {
            $('[data-info=product_messaging]').append(productVariables.webExclusive);
        }
        if (typeof (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['IS_NEW_ARRIVAL']) !== 'undefined' && productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['IS_NEW_ARRIVAL']) {
            $('[data-info=product_messaging]').append(productVariables.netItemMessage);
        } */
        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('hasXforY')]) {
            var xyMSG = '';

            //Remove extension
            var tempXY = productVariables.styleData[sku_nbr][productFunctions.getStyleValue('XforY')].split('.')[0];

            if (tempXY) {
                tempXY = tempXY.split('for');
                if (typeof tempXY[1] !== 'undefined') {
                    var length = tempXY[1].length;

                    var tempDollar = tempXY[1].substring(0, length - 2);
                    var tempChange = tempXY[1].substring(length - 2, length);
                }

                var newXY = "<span><b>" + tempXY[0] + "</b> for <b>$" + tempDollar + "." + tempChange + "</b></span><span>See More <b>&gt;</b></span>";
                $('.xy_badge').append('<a title="View X for Y deal" href="/XYPromo/model:' + model_nbr + '/sku:' + sku_nbr + '/?xyMessage=back" class="message">' + newXY + '</a>');
            }
        }
        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')] !== "truesize.gif" && productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')] !== '') {
            $('[data-info=product_messaging]').html('<div class="fitIcon" data-fiticon="' + productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')].split('.')[0] + '"></div>');
        }
        if ($('#pdp_selectedSize').val() != '') {
            var currentSelectedSize = $('.product_sizes_content .product_sizes a[data-modelsize=' + $.trim($('#pdp_selectedSize').val()).replace(/[^0-9a-z-]/gi, '_') + ']');
            // console.log(currentSelectedSize.attr('data-backordered'));
            if (typeof currentSelectedSize.attr('data-backordered') != 'undefined') {
                $('[data-info=product_messaging]').html(productVariables.backorderMessage.replace('{DATE}', currentSelectedSize.attr('data-backordered')));
                $('[data-availability] span').html(productVariables.backorderMessage.replace('{DATE}', currentSelectedSize.attr('data-backordered')));
            }
            else {
                $('[data-info=product_messaging]').empty();
                $('[data-availability] span').text('In Stock');
            }
        }


        /*Team Promo link*/

        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')].TEAM_PROMO) {

            //CODE BELOW HERE NEEDS TO BE FIXED YET
            $("#teamSalesLink").show();
            $("#teamSalesLink").html('<a title="Ordering 12 or More?" id="TSlink" href="/ns/pdp/images/team-overlay-image-032814a.jpg">ORDERING 12 OR MORE?</a>');

        }
        else {
            $("#teamSalesLink").hide();
            $("#teamSalesLink").html('');
        }

        productFunctions.initInfoI();
    },

    // Call to Update Select Size section for current SKU
    updateSizes: function () {
        //   console.log("func updateSizes");
        $('.pdp_wrapper').attr('data-hassizes', model.HASSIZES);

        if (model.HASSIZES) {
            //$('.product_sizes_content .product_sizes').empty();

            if (productVariables.showOutOfStock) {
                var count = 1;

                //   if (!productVariables.sizesWritten) {
                var tempHTML = '';
                //Get all sizes in Model                   
                for (var m = 0; m < (productVariables.modelData.AVAILABLE_SIZES).length; m++) {
                    var modelSize = productVariables.modelData.AVAILABLE_SIZES[m];
                    if (count == 6) {
                        tempHTML += '<a title="Size ' + $.trim(modelSize) + '" data-value="' + $.trim(modelSize) + '" data-modelsize="' + $.trim(modelSize).replace(/[^0-9a-z-]/gi, '_') + '" class="size_button last disabled">' + $.trim(modelSize) + '</a>';
                        // $('.product_sizes_content .product_sizes').append('<a title="Size ' + $.trim(modelSize) + '" data-value="' + $.trim(modelSize) + '" data-modelsize="' + $.trim(modelSize).replace(/[^0-9a-z-]/gi, '_') + '" class="size_button last disabled">' + $.trim(modelSize) + '</a>');
                        count = 0;
                    } else {
                        //$('.product_sizes_content .product_sizes').append('<a title="Size ' + $.trim(modelSize) + '" data-value="' + $.trim(modelSize) + '" data-modelsize="' + $.trim(modelSize).replace(/[^0-9a-z-]/gi, '_') + '" class="size_button disabled">' + $.trim(modelSize) + '</a>');    
                        tempHTML += '<a title="Size ' + $.trim(modelSize) + '" data-value="' + $.trim(modelSize) + '" data-modelsize="' + $.trim(modelSize).replace(/[^0-9a-z-]/gi, '_') + '" class="size_button disabled">' + $.trim(modelSize) + '</a>';
                    }
                    count++;
                }
                $('.product_sizes_content .product_sizes').html(tempHTML);

                //     productVariables.sizesWritten = true;
                //}

                //Enable available sizes in sku
                $('.product_sizes_content .product_sizes a[data-value]').addClass('disabled');

                for (var s in productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')]) {
                    var size = productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][s];
                    $('.product_sizes_content .product_sizes a[data-modelsize=' + $.trim(size[0]).replace(/[^0-9a-z-]/gi, '_') + ']').removeClass('disabled').attr('href', 'javascript:void(0);');

                    if (size[6] !== 'N') {
                        $('.product_sizes_content .product_sizes a[data-modelsize=' + $.trim(size[0]).replace(/[^0-9a-z-]/gi, '_') + ']').attr('data-backordered', size[3]);
                    }
                }

            } else {
                var tempHTML = '';
                for (var s in productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')]) {
                    var size = productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][s];

                    // $('.product_sizes_content .product_sizes').append('<a href="javascript:void(0);" data-value="' + $.trim(size[0]) + '" data-modelsize="' + $.trim(size[0]).replace(/[^0-9a-z-]/gi, '_') + '" class="size_button">' + $.trim(size[0]) + '</a>');
                    tempHTML += '<a title="Size ' + $.trim(size[0]) + '" href="javascript:void(0);" data-value="' + $.trim(size[0]) + '" data-modelsize="' + $.trim(size[0]).replace(/[^0-9a-z-]/gi, '_') + '" class="size_button">' + $.trim(size[0]) + '</a>';

                    if (size[4].toLowerCase() == 'n' && size[5].toLowerCase() == 'y') {
                        // $('.product_sizes_content .product_sizes a[data-modelsize='+$.trim(size[0]).replace(/[^0-9a-z-]/gi, '_')+']').append(productVariables.SFSMessage).attr('data-sfs','true');
                    }
                    if (size[6] !== 'N') {
                        $('.product_sizes_content .product_sizes a[data-modelsize=' + $.trim(size[0]).replace(/[^0-9a-z-]/gi, '_') + ']').attr('data-backordered', size[3]);
                    }
                }

                $('.product_sizes_content .product_sizes').append(tempHTML);
            }
            if ($('[href=".product_sizes_content"]').attr('data-pushdown') !== 'true') {
                $('[href=".product_sizes_content"]').pushdown({
                    close: function () { $('.qv_close').addClass('hide'); },
                    callback: function () {

                        /*Animating once size box opens if it is below the fold*/
                        if ($("#pdp_size_select").hasClass('selected')) {
                            if ($('.product_sizes_content').offset().top + $('.product_sizes_content').outerHeight() > $(window).scrollTop() + $(window).height()) {
                                $(productVariables.scrollTarget).animate({
                                    scrollTop: $('.product_sizes_content').offset().top + $('.product_sizes_content').height() - $(window).height() + 50
                                }, 400);
                            }
                            $('.qv_close').removeClass('hide');
                            $('a.close').focus();
                        }
                    }
                });
                $('[href=".product_sizes_content"]').attr('data-pushdown', 'true');
            }
            //$('div[data-info=product_sizes] #sizes select option:disabled').append(productVariables.outOfStockMessage);
            $('.product_sizes_content .product_sizes a[data-value]').off('click').on('click', productFunctions.selectSize);

            //TODO DELEGATE LISTENERS
            if (!productVariables.TOUCH_DEVICE) {
                $('.product_sizes_content .product_sizes a[data-value]').off('mouseover').on('mouseover', productFunctions.mouseoverSize);
                $('.product_sizes_content .product_sizes a[data-value]').off('mouseout').on('mouseout', productFunctions.mouseoutSize);
            }
            $('[data-info="sizing_link"]').off('click').on('click', function () {
                productFunctions.swapTabs('sizing', true);
            });

            if ($("#pdp_selectedSize").val() != '' && ($('.product_sizes_content a[data-value="' + $("#pdp_selectedSize").val() + '"]').length > 0 && !$('.product_sizes_content a[data-value="' + $("#pdp_selectedSize").val() + '"]').hasClass('disabled'))) {
                //TODO
                //$('.product_sizes_content a[data-value="' + $("#pdp_selectedSize").val() + '"]').click();
                $('.product_sizes_content a[data-value="' + $("#pdp_selectedSize").val() + '"]').trigger('mouseout');
                //$('div[data-info=product_sizes] #sizes select').change();
            } else {
                $('.select_size [href=".product_sizes_content"]').html('-').removeClass('size_selected');
                $('[data-btnname*="_addToCart"]').addClass('disabled');
                $('.other_styles a[data-sku]').attr('data-size', 'true');
                $('.other_styles a[data-sku]').removeClass('unavailable');
            }
        } else {
            productFunctions.selectSize('');
        }

        if (productVariables.selectedSize != '') {
            productFunctions.searchSize(productVariables.selectedSize);
        }
    },

    searchSize: function (size) {
        //  console.log("func searchSize");

        if (size) {
            $('.product_sizes_content .product_sizes a[data-value]').removeClass('selected');

            $('#pdp_selectedSize').val(size);
            $('.product_content .size_button[data-value="' + size + '"]').addClass('selected');

            $('.select_size [href=".product_sizes_content"]').addClass('size_selected');
            $('.select_size [href=".product_sizes_content"]').html(size);


            $('[data-btnname*="_addToCart"]').removeClass('disabled');
            $('[data-btnname*="_addToCart"]').removeAttr('disabled');

            productFunctions.updateMessaging();

            productFunctions.updateAlternateColors($('#pdp_selectedSize').val());

            $('#pdp_size_select').focus(); //ADA
            productFunctions.updatePrice();

        }
    },

    // Action when size is selected
    selectSize: function (size) {
        // console.log("func selectSize");

        if (!$(this).hasClass('disabled')) {
            $('#pdp_selectedSize').val('');
            if (size) {
                $('.product_sizes_content .product_sizes a[data-value]').removeClass('selected');
                $(this).addClass('selected');
                $('.product_sizes_content:first-child').focus(); //ADA
                //$('#product_sizes_header a').html($(this).attr('data-value')).addClass('size_selected');

                $('#pdp_selectedSize').val($(this).attr('data-value'));
                // $('.select_size #pdp_size_select').text($(this).attr('data-value'));
                try {
                    $('[href=".product_sizes_content"]').pushdown('close');
                } catch (err) { }

                productVariables.selectedSize = $(this).attr('data-value');
            }

            $('.select_size [href=".product_sizes_content"]').addClass('size_selected');
            $('.select_size [href=".product_sizes_content"]').html($(this).attr('data-value'));
            try {
                $('[href=".product_sizes_content"]').pushdown('close');
            } catch (err) { }
            $('[data-btnname*="_addToCart"]').removeClass('disabled');
            $('[data-btnname*="_addToCart"]').removeAttr('disabled');

            productFunctions.updateMessaging();
            if (size) {
                productFunctions.updateAlternateColors($('#pdp_selectedSize').val());
            }

            $('[data-info=add_errors]').empty().hide();

            $('[data-info=wishlist_errors]').empty().hide();
        }
        $('#pdp_size_select').focus(); //ADA
        productFunctions.updatePrice();
        productFunctions.initInfoI();
    },

    updateAlternateColors: function (size) {
        //  console.log("func updateAlternate");
        if (size.trim() == "") {
            return false;
        }

        var counter = 0;

        for (var x in productVariables.styleData) {
            var sizes = productVariables.styleData[x][productFunctions.getStyleValue('availableSizes')];

            for (var i = 0; i < sizes.length; i++) {

                var dataSize = sizes[i][0];
                dataSize = dataSize.trim();

                if (dataSize == size) {
                    counter++;
                    $('.other_styles a[data-sku="' + x + '"]').attr('data-size', "true");
                    $('.other_styles a[data-sku="' + x + '"]').removeClass('unavailable');
                    i = sizes.length;
                }
                else {
                    $('.other_styles a[data-sku="' + x + '"]').attr('data-size', "false");
                    $('.other_styles a[data-sku="' + x + '"]').addClass('unavailable');
                }
            }
        }

        $('.other_style_count').text(counter);
        $('.other_size_filter').html('SIZE: ' + size + ' <a id="size_remove" title="Unselect size ' + size + '" href="javascript:void(0);"> [x] </a>');
    },

    // Updates Attributes below product image
    updateAttr: function () {
        // console.log('func updateAttr');
        //console.log(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('attributes')]);
        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('attributes')] != '') {
            $('[data-info=product_attr]').html("Selected Style: " + productVariables.styleData[sku_nbr][productFunctions.getStyleValue('attributes')]);
        }

        $('.sku_messaging').empty();
        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('excludedFromDiscount')]) {
            $('.product_info .sku_messaging').append(productVariables.excludedMessage);
        }
        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')].SHIPPING_RESTRICTION_EXISTS) {
            $('.product_info .sku_messaging').append(productVariables.shipRestrictionMessage);
        }
        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')].PREMIER_BOGO) {
            $('.product_info .sku_messaging').append(productVariables.bogoMessage);
        }
    },

    // Get FIT Info  TODO
    getFitInfo: function () {
        //console.log("func getFitInfo");
        var fitIcon = productVariables.styleData[sku_nbr][productFunctions.getStyleValue('fitIcon')];
        var tempHTML = '';
        // //console.log(productVariables.fitInfoObject.length);

        if (fitIcon !== '' && typeof (fitIcon) !== 'undefined' /*&& productVariables.fitInfoObject.length != 0*/) {

            $('div[data-info=fit_info]').attr('data-fitinfo', fitIcon);

            if (fitIcon !== 'truesize.gif' || productVariables.showTrueSize) {
                tempHTML += '<div class="fitInfoTitle"><span class="fit-notice-left-shoe pdp_sprite"></span><span class="title"></span><span class="fit-notice-shoe pdp_sprite"></span></div><div class="fitInfoContent">';

                if (fitIcon !== 'truesize.gif')
                    tempHTML += '<p title="Length runs ' + productVariables.fitInfoObject[fitIcon][1] + '. Width runs ' + productVariables.fitInfoObject[fitIcon][2] + '">' + productVariables.fitInfoObject[fitIcon][4] + '</p>';
                else
                    tempHTML += '<p title="Length runs ' + productVariables.fitInfoObject[fitIcon][1] + '. Width runs ' + productVariables.fitInfoObject[fitIcon][2] + '">Item runs true to size. ' + productVariables.fitInfoObject[fitIcon][4] + '</p>';

                tempHTML += '</div>'
                //$('div[data-info=fit_info]').html('</div>');
                $('div[data-info=fit_info]').html(tempHTML);
            } else {
                $('div[data-info=product_sizes]').attr('data-showfit', 'false');
            }
            if (fitIcon != '' && fitIcon != null) {
                $('div[data-info=fit_icon]').html('<div class="heading">Fit Guide<span class="highlight"></span></div><img src="' + productVariables.fitInfoImgBaseURL + fitIcon + '" border="0" /><div><span class="fit_description">' + productVariables.fitInfoObject[fitIcon][3] + '<span></div><div class="fit_info_wrappers"><div><span data-label="fit_length" class="label"></span><span data-value="fit_length" class="value">' + productVariables.fitInfoObject[fitIcon][1] + '<span></div><div><span data-label="fit_width" class="label"></span><span data-value="fit_width" class="value">' + productVariables.fitInfoObject[fitIcon][2] + '<span></div></div>');
                $('.pdp_sizing div[data-info=fit_icon]').show();
            }

            if (productVariables.fitInfoObject[fitIcon][1].toLowerCase().indexOf('true') === -1) {
                $('[data-value="fit_length"]').addClass('highlight');
            }
            if (productVariables.fitInfoObject[fitIcon][2].toLowerCase().indexOf('true') === -1) {
                $('[data-value="fit_width"]').addClass('highlight');
            }
        } else {

            $('.pdp_sizing div[data-info=fit_icon]').hide();
            $('div[data-info=product_sizes]').attr('data-showfit', 'false');

            if ($.trim(model.SIZECHART_CD) == '') {
                $('a[data-tab=sizing]').hide();
                $('a[data-tabnav=sizing]').hide();
                $('.pdp_sizing').hide();
                $('.fit_sizing [data-info="sizing_link"]').hide();
            } else {
                $('a[data-tab=sizing]').show();
            }
        }
    },

    // Updates price of current SKU
    updatePrice: function () {
        // console.log('func updatePrice');

        if ($('#pdp_selectedSize').val() != '') {
            // If a size has been selected then we want to look that size up in the array to determine if it's price/sale price are different.
            var newSize = $('#pdp_selectedSize').val(); // Set a variable with the newly selected size.
            var arrayOfSizes = productVariables.styleData[sku_nbr][7]; // Create new array equal to the the "array of sizes" based upon the selected sku.
            var sizePrice = 0; // Initialize sizePrice.
            var sizeSalePrice = 0; // Initialize sizeSalePrice.

            //Product_masked_pricing == true DONT SHOW SALE PRICE


            for (i = 0; i < arrayOfSizes.length; i++) {
                // Loop through the array of sizes and look for a match with the selected size. 
                // Each element in the array is another array with the details of that particular size.
                var sizeData = arrayOfSizes[i]; // Create and array with the details for this size.
                // console.log(sizeData[0].trim());
                if (sizeData[0].trim() == newSize) {
                    // console.log("MATCH");
                    // If the size of the array element we are working with matches the selected size update the prices and break out of the loop.
                    sizePrice = sizeData[1]; // Update price.
                    sizeSalePrice = sizeData[2]; // Update saleprice.
                    break; // Break out of the loop.
                }
            }

            if (sizePrice == 0) {
                // If the variable sizePrice is still 0 that means we didn't find a match and we should set the price back to the sku level values.
                var sizePrice = parseFloat(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('listPrice')]).toFixed(2);
                var sizeSalePrice = parseFloat(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('salePrice')]).toFixed(2);
            }
        } else {
            // A size hasn't been selected; we should set the prices based on the sku level values.
            var sizePrice = parseFloat(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('listPrice')]).toFixed(2);
            var sizeSalePrice = parseFloat(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('salePrice')]).toFixed(2);
        }

        var tempSizePrice = sizePrice.toString().split('.');
        var tempSizeSalePrice = sizeSalePrice.toString().split('.');

        if (tempSizePrice[0].length == '4') {
            sizePrice = tempSizePrice[0].substr(0, 1) + ',' + tempSizePrice[0].substr(1, 4) + "." + tempSizePrice[1];
        }
        if (tempSizeSalePrice[0].length == '4') {
            sizeSalePrice = tempSizeSalePrice[0].substr(0, 1) + ',' + tempSizeSalePrice[0].substr(1, 4) + "." + tempSizeSalePrice[1];
        }

        $('div[data-info=product_price]').html('<div class="regular_price"><span class="label">' + productVariables.nonSaleLabel + '</span> <span class="value">$' + sizePrice + '</span></div>');

        if (sizePrice != sizeSalePrice && !productVariables.styleData[sku_nbr][12].PRODUCT_MASKED_PRICING) {
            $('div[data-info=product_price] .regular_price').attr({ 'class': 'old' });
            $('div[data-info=product_price] .old .label').html(productVariables.regularPriceLabel);
            $('div[data-info=product_price]').append('<div class="sale"><span class="label">' + productVariables.saleLabel + '</span> <span class="value">$' + sizeSalePrice + '</span></div>');

            var discount = sizePrice - sizeSalePrice;
            var sale = discount / sizePrice;

            if (productVariables.displayPercent) {
                $('div[data-info=product_price]').append('<div class="percent"><span class="label">' + productVariables.percentLabel + '</span> <span class="value">' + Math.floor(sale.toFixed(2) * 100) + '%</span></div>');
            }

            if (productVariables.displaySavings) {
                $('div[data-info=product_price]').append('<div class="savings"><span class="label">' + productVariables.savingsLabel + '</span> <span class="value">$' + discount.toFixed(2) + '</span></div>');
            }
        }
        if (productVariables.styleData[sku_nbr][12].PRODUCT_MASKED_PRICING) {
            $('div[data-info=product_price] .regular_price').css({ 'display': 'inline-block' });
            $('div[data-info=product_price]').append('<div class="cartPrice">' + productVariables.priceInCartLabel + productVariables.seePriceInCartMessage + '</div>');

        }
    },

    getStyleValue: function (index) {
        //console.log('func getStyleValue');
        return productVariables.styleReference.indexOf(index);
    },

    // Loads Recommendations(MyBuys)
    getRecommendations: function (element) {
        // console.log("func getRecommendations");
        if (typeof (mybuys) !== 'undefined') {

            var settings = {
                'pageType': 'PRODUCT_DETAILS',
                'zone': '2',
                'pt': 'prod',
                'set': { 'productid': sku_nbr },
                'callback': function (data) {
                    $('.recommendations .content a').off('click'); $('.recommendations .content a').on('click', function () {
                        $.quickview({ 'title': 'View Featured Product', 'sku': sku_nbr });
                        try {
                            eval($(this).attr('data-trackurl'));
                        } catch (err) { }
                    });
                    var pdpRecommendSpotlight = $('.recommendations #recommendations_spotlight').spotlight({ transition: 'slide', rotate: false });
                    if ($('.recommendations #recommendations_spotlight ul li').length > 0) {
                        $('.recommendations #recommendations_spotlight .sl_previous').click(function () { pdpRecommendSpotlight.previousSlide(); });
                        $('.recommendations #recommendations_spotlight .sl_next').click(function () { pdpRecommendSpotlight.nextSlide(); });
                    } else {
                        $('.recommendations #recommendations_spotlight .sl_previous').hide();
                        $('.recommendations #recommendations_spotlight .sl_next').hide();
                    }
                }
            }

            $('form#product_form .recommendations .content').recommendations(settings);

            if ($('.recommendations .content').length > 0) {
                $('.recommendations').removeClass('hide');
            }
        }
    },

    // Load Recently Viewed with jquery.lib plugin based on cookie value
    getRecentlyViewed: function () {
        // console.log("func getRecentlyViewed");
        var skus = $.cookie('read', 'CARTSKUS');
        var skuArray = skus.split(',');
        skuArray.push(sku_nbr);
        $.extend(productVariables.recentlyViewedOptions, { 'excludedSkus': skuArray });
        $('.recently_viewed .rv_content').recentlyViewed(productVariables.recentlyViewedOptions);
        if ($('.recently_viewed .rv_content ul li').length > 0) {
            $('.recently_viewed').removeClass('hide');
        }
    },
    scene7ErrorLoad: function (e) {
        //console.log('SCENE7 IMAGE : ' + $(this).attr('data-pisrc'))
        $(this).attr('src', $(this).attr('data-pisrc'));
        //$('#zoominit').hide();
        //console.log('ERROR SCENE7');
    },
    // Handles the the hiding/showing of available color area
    showOtherStyles: function (toggle) {
        // console.log("func showOtherStyles");
        if (toggle) {
            $(".other_styles").toggleClass('expanded');
        }
        else {
            $(".other_styles").addClass('expanded');
        }

        if ($(".other_styles").attr('data-loaded') == 'false') {
            $(".other_styles").append(productVariables.additionalColors).attr('data-loaded', 'true');
            productFunctions.updateAlternateColors($('#pdp_selectedSize').val());
        }

        if ($(".other_styles").hasClass('expanded')) {
            $('#showHide').html("<span class='pdp_sprite'></span>Hide").addClass("open").attr('title', "Hide");
            $('[data-overflow="true"]').css({ "display": "inline-block" });
            //  cmCreateConversionEventTag('Show All', 2, 'Show All Alternate Colors', 0);
        }
        else {
            $('#showHide').html("<span class='pdp_sprite'></span>Show All").removeClass("open").attr('title', "Show All Colors");;
            $('[data-overflow="true"]').css({ "display": "none" });
            // cmCreateConversionEventTag('Hide', 2, 'Show All Alternate Colors', 0);
        }
    },
    // Loads other styles (if loading via AJAX)
    getOtherStyles: function () {
        // console.log("func getOtherStyles");

        var imgCount = 0;
        var extraImgCount = 1;
        var html = '';
        var selectedThumb = '';
        var topBorderHTML = '<span class="tlr"></span><span class="tlb"></span><span class="trl"></span><span class="trb"></span>';
        var bottomBorderHTML = '<span class="blr"></span><span class="blt"></span><span class="brl"></span><span class="brt"></span>';
        var removeSelected = 0;
        var selectedSku = sku_nbr;

        productVariables.productName = $("#model_name").html();
        productVariables.productName = $.trim(productVariables.productName.toString().toLowerCase());
        productVariables.productName = productVariables.productName.replace(/'/ig, '');
        productVariables.productName = productVariables.productName.replace(/ +/ig, '-');
        productVariables.productName = productVariables.productName.replace(/-+/ig, '-');
        productVariables.productName = productVariables.productName.replace(/_+/ig, '-');

        if (productVariables.alternateColorStyle == 'pushdown') {

            for (var s in productVariables.styleData) {
                //Find selected sku to place first in thumbnail list
                if (s == selectedSku) {
                    selectedThumb = '<a class="selected" href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '">';
                    selectedThumb += topBorderHTML;
                    selectedThumb += '<img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" />';
                    selectedThumb += bottomBorderHTML;
                    selectedThumb += '</a>';
                    removeSelected = 1;
                }
                else {
                    if (imgCount < (5 + removeSelected)) {
                        if (imgCount == (4 + removeSelected)) {
                            html += '<a class="last" href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '">';
                            html += topBorderHTML;
                            html += '<img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" />';
                            html += bottomBorderHTML;
                            html += '</a>';
                        }
                        else {
                            html += '<a href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '">';
                            html += topBorderHTML;
                            html += '<img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" />';
                            html += bottomBorderHTML;
                            html += '</a>';
                        }
                    }
                    else {
                        if (extraImgCount % 7 == 0) {
                            productVariables.additionalColors += '<a class="last" href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '" data-overflow="true">';
                            productVariables.additionalColors += topBorderHTML;
                            productVariables.additionalColors += '<img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" />';
                            productVariables.additionalColors += bottomBorderHTML;
                            productVariables.additionalColors += '</a>';

                        }
                        else {
                            productVariables.additionalColors += '<a href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '" data-overflow="true">';
                            productVariables.additionalColors += topBorderHTML;
                            productVariables.additionalColors += '<img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" />';
                            productVariables.additionalColors += bottomBorderHTML;
                            productVariables.additionalColors += '</a>';
                        }
                        extraImgCount++;
                    }
                }
                imgCount++;
            }

            if (imgCount > 1 && model.BRAND != 'UPS') {
                $('div[data-info=product_styles]').append(selectedThumb + '' + html).attr('data-loaded', 'false');
                $('span.other_style_count').text(imgCount);
                $('.other_style_count').attr("data-original", imgCount);
                $('.colors_badge').attr('title', imgCount + ' colors').html('<span class="badge_icon pdp_sprite"></span>' + imgCount + ' colors');
                $('.other_styles, .colors_badge, [data-tabnav="colors"]').removeClass('hide');
            } else if (model.BRAND == 'UPS') {
                $('div[data-info=product_styles]').append(selectedThumb + '' + html).attr('data-loaded', 'false');
                $('.other_styles_info, .colors_badge, [data-tabnav="colors"]').addClass('hide');
            }

            if (imgCount > 6) {
                $('#showHide').removeClass('hide');
            }

            $('.pdp_top_nav').removeClass('hide');
        } //END PUSHDOWN IF STATEMENT

        /*
           if (productVariables.alternateColorStyle == 'spotlight') { //console.log("SPOTLIGHT"); 

               $('div[data-info=product_styles]').attr({ 'id': 'product_styles', 'class': 'spotlight other_styles' });

               if ($('div[data-info=product_styles] .slide_content').html() == null) {
                   $('div[data-info=product_styles]').html('<div class="slide_content">'
                       + '<ul><li></li>'
                       + '</ul>'
                   + '</div>');
               }
               $('div[data-info=product_styles] .slide_content ul').empty();
		
	
               for (var s in productVariables.styleData) {
             
                if(imgCount == 0) {
                    html += '<li><span class="group">';
                   }

               if(s == selectedSku){
				
                   //selectedThumb = '<a href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '"><img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" data-pisrc="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" /></a>';
                   selectedThumb = '<a class="selected" href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '"><img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" data-pisrc="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" /></a>';
			   
                   matchedSku = true;
		
               }
               else {
                   //html += '<a href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '"><img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" data-pisrc="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" /></a>';
                   html += '<a href="javascript:void(0);" title="Style Color ' + productVariables.styleData[s][15] + ' ' + productVariables.styleData[s][16] + ' Material ' + productVariables.styleData[s][17] + '"  data-sku="' + s + '"><img src="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" data-pisrc="' + productVariables.nonScene7url + s + '/' + productVariables.otherStylesOptions.imageSize[0] + '/' + productVariables.productName + '" border="0" /></a>';
               }
			


               imgCount++;
			
               if(!matchedSku && firstSlide){
                   if(imgCount == productVariables.otherStylesOptions.maxProducts - 1) {
                       html += '</span></li>';
                       imgCount = 0;
                       firstSlide = false;
                   }
               }else if(matchedSku && !firstSlide){
                   if(imgCount == productVariables.otherStylesOptions.maxProducts) {
                       html += '</span></li>';
                       imgCount = 0;
                       matchedSku = false
                   }
               }else{
                   if(imgCount == productVariables.otherStylesOptions.maxProducts) {
                       html += '</span></li>';
                       imgCount = 0;
                       firstSlide = false;
                   }	
               }
           }

		$('div[data-info=product_styles] .slide_content ul').html(html);
				
		if($('div[data-info=product_styles] .slide_content ul li').length > 1) {
			$('div[data-info=product_styles]').append('<div class="slide_buttons" style="display: block;">'+
				'<a href="javascript:void(0);" class="sl_previous left-arrow pdp_sprite disable" title="View Previous Page of Alternate Styles"></a>'+
				'<a href="javascript:void(0);" class="sl_next arrow pdp_sprite" title="View Next Page of Alternate Styles"></a>'+
			'</div>');
		}
		$('[data-imageType="scene7"]').error(productFunctions.scene7ErrorLoad);
		$.extend(productVariables.stylesSpotlightSettings, {'transition':'slide','endStop':true,'rotate':false,'onSnap':function() {
			$('div[data-info=product_styles] .slide_buttons a').removeClass('disable');
			if(productVariables.stylesSpotlight.curSlide == 0) {
				$('div[data-info=product_styles] .sl_previous').addClass('disable');
			}
			if(productVariables.stylesSpotlight.curSlide == $('div[data-info=product_styles] .slide_content ul li').length - 1) {
				$('div[data-info=product_styles] .sl_next').addClass('disable');
			}
		}});
		productVariables.stylesSpotlight = $('#product_styles').spotlight(productVariables.stylesSpotlightSettings);
		$('div[data-info=product_styles]').attr('data-numslides',productVariables.stylesSpotlight.numSlides);
		
		$(".slideitem0 .group").prepend(selectedThumb);

        $('div[data-info=product_styles]').on('click', '.sl_previous' function(e) {
			e.preventDefault();
			productVariables.stylesSpotlight.previousSlide();
		});
		$('div[data-info=product_styles]').on('click', '.sl_next' function(e) {
			e.preventDefault();
			productVariables.stylesSpotlight.nextSlide();
		});
		
           } END SPOTLIGHT IF STATEMENT */


        $('div[data-info=product_styles]').on('click touchend', 'a[data-sku]', function () {

            //Make sure user isn't dragging
            if (productVariables.dragging && TOUCH_DEVICE) {
                return;
            }

            //Throw alert if shoe is unavailabe is specific size
            if ($(this).attr('data-size') == 'false') {
                $('.size_unavailable').remove();
                // $('.product_overview').prepend("<div role='alert' class='size_unavailable'>"+ $(this).attr('title') +" is unavailable in size " + $('#pdp_size_select').text() + " </div>");
                $(this).prepend("<div role='alert' class='size_unavailable'>Sorry! This is not available in your size at this time.</div>");
                return false;
            }

            //if($(this).attr('data-sku') != $('#pdp_selectedSKU').val()) {
            $('div[data-info=product_styles] a[data-sku]').removeClass('selected');

            productFunctions.changeSku($(this).attr('data-sku'), true);
            //}
            $(this).addClass('selected');

            var hashString = "#sku-" + $(this).attr('data-sku');
            var locationHash = location.hash;
            var newLocation = location + '';
            if (locationHash.trim() != '') {
                newLocation = newLocation.hash = hashString;
            } else {
                newLocation = newLocation + hashString;
            }
            //necessary for safari javascript urls
            if ($.browser.safari) {
                newLocation = newLocation.replace('%2F', '%252F');
            }
            location.replace(newLocation);

            if ($('.left_column').offset().top + ($('.left_column').outerHeight() / 2) < $(window).scrollTop()) {
                $(productVariables.scrollTarget).animate({
                    scrollTop: $('.breadCrumb').offset().top
                }, 400);
            }

            bvcreateproductviewtag(
                productVariables.totalReviewsCount,
                productVariables.avgRating,
                productVariables.recommendPercentage,
                productVariables.cm_isProductMaskedPricing,
                productVariables.cm_isLaunchSku);

            //location.hash = 'sku-'+$(this).attr('data-sku');

        });

        if (!productVariables.TOUCH_DEVICE) {

            $('div[data-info=product_styles]').off('mouseenter', 'a[data-sku]');
            $('div[data-info=product_styles]').off('mouseleave');

            $('div[data-info=product_styles]').on('mouseenter', 'a[data-sku]', function (e) {
                e.preventDefault();
                e.stopPropagation();

                //If you are hovering over a color that doesn't have a size available
                if ($(this).attr('data-size') == 'false') {
                    return false;
                } else {

                    //If it is not the selected shoe color
                    // if ($(this).attr('data-sku') != sku_nbr) {
                    $('div[data-info=product_styles] a[data-sku]').removeClass('selected');

                    productFunctions.changeSku($(this).attr('data-sku'), false);
                    $('#product_images').height($('#selected_item').outerHeight());
                    $('#hover_item').css({ 'position': 'relative', 'margin': 'auto', 'width': 475 });
                    $('#selected_item').hide();
                    $('#hover_item').show();
                    // }
                }
            }).on('mouseleave', function (e) {
                e.preventDefault();
                e.stopPropagation();

                $('#hover_item').css({ 'position': 'absolute' });
                if ($(this).attr('data-sku') != sku_nbr) {
                    productFunctions.changeSku(sku_nbr, true);
                }
                $('#selected_item').show();
                $('#hover_item').hide();
                $('#product_images').height('auto');
                $('a[data-sku="' + sku_nbr + '"]').addClass('selected');
            });
        }
    },
    getDescription: function () {
        //  console.log("func getDESCRIPTION");
        for (var i = 1; i < 3; i++) {
            $('.icons[data-icon' + i + ']').each(function () {
                if ($(this).attr('data-icon' + i) != '') {
                    $(this).append('<img src="' + productVariables.productIcons + $(this).attr('data-icon' + i) + '" border="0" />');
                }
            });
        }
        if ($('.pdp_description .technical ul li').length == 0) {
            $('.pdp_description .technical .heading').remove();
        }
    },
    // Loads videos with jquery.lib plugin and Video Feed
    getVideos: function () {
        //  console.log("func getVideo");

        //if (productFunctions.getStyleValue('hasVideos')) {
        if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('hasVideos')]) {
            $('#product_videos').html('<a id="show_videos" class="pdp_sprite" title="Play Video" href="javascript:void(0);"></a>');
            $('body').prepend('<div class="hide video_container"></div><div class="video_screen"></div>');
            // $('#product_videos').show();

            $.extend(productVariables.pdpVideoSettings, { //TODO
                'sku': sku_nbr,
                'domain': '',
                'initPlay': 1,
                'swfpath': '/ns/flash/video-player/uat/',
                'onPlay': function () {

                    //$('#video_player_wrapper').show();

                    if ($('#video_player_wrapper').children('#close_vid').length === 0) {
                        // $('#video_player_wrapper').prepend('<a title="Close Product Video" href="javascript:void(0);" id="close_vid">X</a>');
                        // $('#close_vid').on('click',function() {
                        //   $('#show_videos').show();
                        // $('#product_videos .content').hide();
                        //});
                        $('[data-video="0"]').addClass('selected');
                    }
                }, 'callback': function () {
                    ////console.log($('#product_videos #video_gallery').html());
                    if ($('#product_videos #video_gallery').html() == null) {
                        ////console.log($('#product_videos #video_gallery').html())
                        // $('#product_videos').empty();
                    }
                }
                //console.warn(productVariables.pdpVideoSettings);
            });

            $('#product_videos .content').hide();
            $('.video_container').show();
            $('#show_videos').on('click', function () {
                //$('#show_videos').hide();         

                $('.video_container').pdpVideo(productVariables.pdpVideoSettings).css({
                    'top': $(window).scrollTop() + 120
                });

                $('.video_container').removeClass('hide');
                $('.video_screen').removeClass('hide');

                $('.video_container').prepend('<a title="Close Product Video" href="javascript:void(0);" class="eb-bold" id="close_vid">X</a>');
                $('.video_screen').height($(document).height());

                $('#product_videos .content').show();
                $('[data-video="0"]').addClass('selected');
            });

        }
    },

    // Load Sizing and Fit information
    getSizing: function () {
        // console.log("func getSizing");

        $.get(productVariables.sizeChart + model.SIZECHART_CD, function (data) {

            var fitInfo = $('.product_sizes_content .fitInfoContent').html();

            if (fitInfo) {
                $('[data-tabcontent="sizing"] .sizing_data').html('<div class="fitInfoContent eb-bold">' + fitInfo + '</div>');
            }

            $('[data-tabcontent="sizing"] .sizing_data').append(data);

            $('.hdr_right a').empty().html("<div id='promise_icon'>Fit Promise Guarantee</div><div class='policy'>View our policy</div>");

            $('.sizeDropdown').eq(2).css({ 'margin-right': 0 });
            $('.sizeDropdown').eq(5).css({ 'margin-right': 0 });

            //If ball and bat are in title remove select box
            var chartTitle = $('.sizeChartTitle').text();

            if (chartTitle.toLowerCase().indexOf('ball') > 0 && chartTitle.toLowerCase().indexOf('bat') > 0) {
                $('.sizeDropdown').hide();
            }
            if (chartTitle.toLowerCase().indexOf('levi') >= 0 && chartTitle.toLowerCase().indexOf('men') >= 0) {
                $('.sizeDropdown').hide();
            }

            $('.sizeDropdown').each(function () {
                $(this).prepend('<span class="pdp_sprite"></span>');
                /* $(this).find(">:first-child").text("SELECT");
                  
                  $(this).find('option[value^="opt"]').each(function () {
                      var tempText = $(this).text();
                      tempText = tempText.substring(tempText.indexOf(" - ") + 3, tempText.length);
                     $(this).text(tempText);
  
                  });*/

            });

            $('.sizeListClass').change(function (evt) {
                var si = evt.target.selectedIndex;
                for (var i = 1; i <= sizeSelectCount; i++) {
                    document.getElementById('sizeList_' + i).selectedIndex = si;
                }
            });

            // insert the proxy link to the size chart popup
            if (sizeImagePath.length != 0 && sizeImagePath.toLowerCase() != 'none' && sizeImagePath != "" && chartTitle.toLowerCase().indexOf('youth shoes') < 0) {
                //$('#sizeChartDiv').html('<img src="' + sizeImagePath + '" />').show();
                $('.size_img').show();
                //$('#sizeImageLink').html('<p><a title="Measurement Help" href="" onClick="return clickSizeChart()">Measurement Help</a></p>');
            }
            if (sizeSelectCount == 0) {
                //    $('#product_sizing_content').append('<span class="default_size_text">Please <a title="Click here for sizing information" href="/catalog/defaultsizingchart.cfm" target="_blank">click here</a> for sizing information on this product.</span>');
            }
            //cmCreateConversionEventTag("Sizing Information - Open", 2, "PDP - SIZING", 0);
        });

        productFunctions.getFitInfo();
    },
    getQuestions: function () {
        //  console.log('func getQuestions');
        $BV.ui("qa", "show_home", {
            productId: model_nbr,
            subjectType: "product",

            onEvent: function (json) {
                var questionCount = json.attributes.numQuestions;
                var answerCount = json.attributes.numAnswers;
                if (json.eventSource == "Display") {
                    // move code from BVQADisplayed here
                    if (questionCount > 0) {
                        var bvALPLink = document.getElementById("BVALPLinkContainer");
                        if (bvALPLink) { bvALPLink.style.display = "block"; }
                    }
                }
            },
            doShowContent: function () {
                //console.log('func doShowcontent');
                // move A&A code from bvShowTab code here
                //viewTab('answers', true);
                //adjustTabSize('pdp_tabContent_answers', 'div');
                $('[title="Ask a New Question "]').attr('title', 'Ask a New Question Button');
                $('#BVQASearchFormTextInputID').attr('title', 'Search for a question')
                $('#BVQASearchFormSubmitButtonID').attr('title', 'Submit Search');
                productFunctions.swapTabs('questions')
                //bvGoToTab('answers');
            }
        });
    },
    //Load Ratings and Reviews (BazaarVoice)
    getReviews: function () {
        // console.log("func getReviews");
        $BV.configure("global", {
            submissionContainerUrl: reviewSubmissionURL
        });
        $BV.ui("rr", "show_reviews", {
            productId: model_nbr,
            onEvent: function (json) {
                var totalReviewsCount = json.attributes.numReviews;
                var avgRating = json.attributes.avgRating;
                var ratingsOnlyReviewCount = json.attributes.numRatingsOnlyReviews;
                var recommendPercentage = json.attributes.percentRecommend;
                var productID = json.productId;
                //Setup titles for BV elements
                $('.BVRRRatingEntry .BVRRRatingNormalImage img').each(function () {
                    $(this).attr('title', 'Product Rating of ' + $(this).attr('alt'));
                });
                $('.BVRRRatingsHistogramButton .BVRRRatingsHistogramButtonImage').attr('title', 'View rating breakdown');

                $('.BVRRPager .BVRRPageNumber a').each(function () {
                    $(this).attr('title', 'Go to Page ' + $(this).attr('title').replace('Go to Page ', ''));
                });
                $('.BVRRPreviousPage a').attr('title', 'Go to Previous Page of Reviews');
                $('.BVRRNextPage a').attr('title', 'Go to Next Page of Reviews');
                if (json.eventSource == "Display") {
                    // move code from ratingsDisplayed here
                    productVariables.totalReviewsCount = totalReviewsCount;
                    productVariables.avgRating = avgRating;
                    productVariables.recommendPercentage = recommendPercentage;
                    productVariables.cm_isProductMaskedPricing = cm_isProductMaskedPricing;
                    productVariables.cm_isLaunchSku = cm_isLaunchSku;
                    bvcreateproductviewtag(totalReviewsCount, avgRating, recommendPercentage, cm_isProductMaskedPricing, cm_isLaunchSku);
                    if (totalReviewsCount > 0) {
                        var pdp_review_tab = document.getElementById("pdp_tabContent_reviews");
                        if (pdp_review_tab != null) { pdp_review_tab.scrollTop = 0; }
                        var bvRevCntr = document.getElementById("BVRRContainer");
                        if (bvRevCntr) { bvRevCntr.style.display = "block"; }
                        var bvSVPLink = document.getElementById("BVSVPLinkContainer");
                        if (bvSVPLink) { bvSVPLink.style.display = "block"; }
                        var bvSCRPLink = document.getElementById("BVRRSecondarySummaryContainer");
                        if (bvSCRPLink) { bvSCRPLink.style.display = "none"; }

                        $('.review_total').remove();
                        $('.product_info #BVRRSummaryContainer img').after("<span class='pdp_sprite review_total eb-bold'>" + totalReviewsCount + " Reviews <span class='pdp_sprite'></span></span>");
                        $('.tab_container a[data-tab="reviews"]').text("Reviews (" + totalReviewsCount + ")");
                        $('#pdp_tabContent_reviews h2[data-layout]').text("Reviews (" + totalReviewsCount + ")");
                        $('#BVRRRatingSummaryLinkWriteID, #BVRRRatingSummaryLinkWriteFirstID').hide();
                    }
                    else {
                        var bvSCRPLink = document.getElementById("BVRRSecondarySummaryContainer");
                        if (bvSCRPLink) { bvSCRPLink.style.display = "block"; }
                        var bvSumLink = document.getElementById("BVRRContainer");
                        if (bvSumLink) { bvSumLink.style.display = "none"; }

                        $('.review_total').remove();
                        $('.tab_container a[data-tab="reviews"]').text("Reviews (0)");
                    }
                    $(".BVRRSecondaryRatingsContainer").hide();
                    $("#BVRRSummaryContainer .BVRRBuyAgainContainer").hide();
                    productFunctions.reviewsLoaded();
                }

            },
            doShowContent: function () {
                // move R&R code from bvShowTab code here
                //viewTab('reviews', true);
                //adjustTabSize('pdp_tabContent_reviews', 'div');
                //bvGoToTab('reviews');
                productFunctions.swapTabs('reviews', true);
                return false;
            }
        });

        //console.timeEnd("reviews");
    },

    reviewsLoaded: function () {
        //  console.log("func reviewsLoaded");
        $('div[data-tabcontent=reviews]').attr('data-loaded', 'true');
        if (productVariables.reviewsLoaded) {

            $('html, body').stop();
            $('html, body').animate({ scrollTop: ($('.pdp_wrapper #BVRRDisplayContentID').offset().top - $('#fixed_banner').outerHeight()) }, 400, function () {
            });
            //methods.swapTabs('reviews', true);
        }
        productVariables.reviewsLoaded = true;
    },

    // Initiates pinning of elements on scroll
    initDock: function () {
        //  console.log("func initDock");
        if (!productVariables.TOUCH_DEVICE) {
            if (productVariables.pinInfo) {
                $('.right_column').pinElement({ pinTop: 110, pinTrigger: 110, container: '.pdp_wrapper' });
            }
            if (productVariables.pinTabs) {
                $('.pdp_header').pinElement({ pinTop: 45, pinTrigger: 45 });
            }
        } else {
            $('.right_column').addClass('touch_device');
            $('.pdp_header').addClass('touch_device');
        }
    },

    // Actions to jump to current section/tab
    swapTabs: function (tab, scroll) {
        // console.log("func swapTabs");
        if (productVariables.pdpStyle === 'tabbed') {

            if (tab != 'colors' && tab != 'overview') {
                $('div[data-tabcontent]').hide();
                $('div[data-tabcontent=' + tab + ']').css({ 'display': 'inline-block' });
                $('a[data-tab]').removeClass('selected');
                $('a[data-tab=' + tab + ']').addClass('selected');
                $('#show_videos').show();
                $('#product_videos .content').hide();
            }

            if ($('div[data-tabcontent=' + tab + ']').attr('data-loaded') == 'true') {

            } else {
                if (tab == 'sizing') {
                    productFunctions.getSizing();
                    $('div[data-tabcontent=' + tab + ']').attr('data-loaded', 'true');
                } else if (tab == 'reviews') {
                    productFunctions.getReviews();
                    $('div[data-tabcontent=' + tab + ']').attr('data-loaded', 'true');
                }

            }
            if (scroll) {
                $(productVariables.scrollTarget).stop();
                $(productVariables.scrollTarget).animate({ scrollTop: ($('[data-tab=' + tab + ']').offset().top - productVariables.adjust) - 10 }, 400)
            }
            $(window).resize();
            $(window).scroll();
        }
        if (tab == 'colors') {
            productFunctions.showOtherStyles(false);
            // $(".other_styles").toggleClass('expanded');
            //  $('#showHide').text('Hide');
            // $('[data-overflow="true"]').css({ "display": "inline-block" });
        }
        if (productVariables.pdpStyle.indexOf('jump') !== -1 && typeof tab !== 'undefined') {
            $('html, body').stop();
            $('html, body').animate({ scrollTop: ($('[data-tab=' + tab + ']').offset().top - productVariables.adjust) }, 700)
        }
        $(window).resize();
        $(window).scroll();
    },

    // Initiates Tab listeners
    initTabs: function () {
        // console.log("func initTabs");
        $('.tab_container').on('click', 'a[data-tab]', function () {
            var tab = $(this).attr('data-tab');
            productFunctions.swapTabs(tab);
            cmCreateConversionEventTag(tab, 2, 'PDP Tabs', 0);
            return false;
        });
    },

    mouseoverSize: function () {
        $('div[data-info="availability"] span').hide();
        $('div[data-info="availability"]').attr('data-availability', 'instock');
        $('div[data-info="availability"]').attr('data-backordered', '');
        $('div[data-info="availability"] span').html('In Stock');
        for (var index = 0; index < productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')].length; index++) {
            if ($.trim(productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][index][0]) == $.trim($(this).attr('data-value'))) {
                if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][index][6] != 'N') {
                    $('div[data-info="availability"]').attr('data-availability', 'backordered');
                    $('div[data-info="availability"]').attr('data-date', productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][index][3]);
                    $('div[data-info="availability"] span').html(productVariables.backorderMessage.replace('{DATE}', productVariables.styleData[sku_nbr][productFunctions.getStyleValue('availableSizes')][index][3]));
                    break;
                }
            }
        }
        if ($(this).hasClass('disabled')) {
            $('div[data-info="availability"]').attr('data-availability', 'outofstock');
            $('div[data-info="availability"] span').html('Out of Stock');
        }
        $('div[data-info="availability"] span').show();
    },

    mouseoutSize: function () {
        $('div[data-info="availability"] span').hide();
        //$('div[data-info="availability"]').attr('data-availability','instock');
        if (model.HASSIZES && ($('#pdp_selectedSize').val().trim() == "" || ($('[data-info="product_sizes"] a.selected[data-value]').length == 0 && $('#storepickup select[name="sizes"]').val() == null))) {
            $('div[data-info="availability"]').attr('data-availability', 'none');
        }
        $('div[data-info="availability"] span').show();

        if ($('.size_button.selected').length > 0) {
            if ($('.size_button.selected').attr('data-backordered')) {
                $('div[data-info="availability"]').attr('data-availability', 'backordered');
                $('div[data-info="availability"] span').html(productVariables.backorderMessage.replace('{DATE}', $('.size_button.selected').attr('data-backordered')));
            }
            else {
                $('div[data-info="availability"]').attr('data-availability', 'instock');
                $('div[data-info="availability"] span').html('In Stock');
            }
            // $('div[data-info="availability"]').attr('data-availability', 'backordered');
        }
        else {
            $('div[data-info="availability"] span').html('Select a Size');
        }

    },

    // Loads Hash values for dynamic loading of tabs/sku/sizes
    loadHash: function () {
        // console.log("func loadHash");

        var actions = location.hash.split('\\');
        var sizes = document.URL.split('&size=');

        $.each(actions, function (a, value) {
            if (value.split('-')[0].toLowerCase().replace(/#/, '') == 'sku') {
                $('.other_styles a[data-sku]').removeClass('selected');
                productFunctions.changeSku(value.split('-')[1], true);
            }
            if (value.split('-')[0].toLowerCase().replace(/#/, '') == 'tab') {
                productFunctions.swapTabs(value.split('-')[1]);
            }
            if (value.split('-')[0].toLowerCase().replace(/#/, '') == 'size') {
                productVariables.selectedSize = value.split('-')[1];
            }
            if (value.split('-')[0].toLowerCase().replace(/&/, '') == 'size') {
                productVariables.selectedSize = value.split('-')[1];
            }

        });
        if (sizes[1]) {
            productVariables.selectedSize = decodeURIComponent(sizes[1]);
        }

        if (location.hash.toLowerCase().replace(/#/, '').indexOf('tab-') === -1) {
            productFunctions.swapTabs($('.pdp_header [data-tab]:first-child').attr('data-tab'));
        }
    }
};

$(document).ready(function (e) {

    var prodTitle = $('.product_info .product_title').text();

    if (model.GENDER_AGE != "") {
        var tempArray = prodTitle.split('-');
        tempArray.pop();
        prodTitle = tempArray.join(' - ');
    }

    $('.product_info .product_title').text(prodTitle);
    $('.product_info .product_genderAge').text(model.GENDER_AGE);
    $('.product_info .title').removeClass('hidden');

    $("body").on("touchmove", function () {
        productVariables.dragging = true;
    });
    $("body").on("touchend", function () {
        if (productVariables.dragging)
            return;
    });
    $("body").on("touchstart", function () {
        productVariables.dragging = false;
    });

    $("[data-tabnav]").on("mouseenter mouseleave", function (e) {

        /** the width and height of the current div **/
        var w = $(this).width();
        var x = ($(this).offset().left);

        var mouse = e.pageX;

        if (mouse >= x + (w / 2)) {
            $(this).removeClass('left');
            $(this).addClass('right');
        }
        else {
            $(this).removeClass('right');
            $(this).addClass('left');
        }
    });

    $('#pdp_size_select').keypress(function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            setTimeout(function () {
                if ($('.product_sizes_content').height() > 0) {
                    $('#pdp_size_select').attr('title', 'Select a Size - Close size box');
                }
                else {
                    $('#pdp_size_select').attr('title', 'Open Select a Size');
                }
            }, 200);
        }
    });

    $('#social_share a').keypress(function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {

            setTimeout(function () {
                $('.social iframe').focus();
            }, 1000);
        }

    });

    $('.product_sizes_content').on('keydown', '.product_sizes a', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            setTimeout(function () {
                var size = e.currentTarget.innerHTML;
                $('#pdp_size_select').attr('title', 'Select a Size - Size ' + size + ' selected');
            }, 1000);
        }

    });

    productFunctions.init();
    $("form#product_form").submit(function (e) {
        e.preventDefault();
        addToCart();
        return false;
    });
    $("#addToWishlist").click(function (e) {
        var errMsg = productFunctions.validateProduct();

        if (errMsg != "") {
            productFunctions.displayError($('[data-info=wishlist_errors]'), '<span class="pdp_sprite"></span><ul>' + errMsg + '</ul>');
            return false;
        } else {
            $('[data-info=wishlist_errors]').empty();
        }
        e.stopPropagation();
        addToWishlist('PDP');
        try {
            cmCreateConversionEventTag('ADD TO WISH LIST', 2, 'PDP SKU ' + sku_nbr, 0);
        } catch (err) { }
    });

    $("#showHide").on('click', function (e) {
        productFunctions.showOtherStyles(true);
        // $(".other_styles").toggleClass('expanded');
        /* if($(".other_styles").attr('data-loaded') == 'false'){
             $(".other_styles").append(productVariables.additionalColors);
             $(".other_styles").attr('data-loaded', 'true');
         }*/
        if ($(".other_styles").hasClass('expanded')) {
            cmCreateConversionEventTag('Show All', 2, 'Show All Alternate Colors', 0);
        }
        else {
            //    $(this).text("Show All");
            //    $('[data-overflow="true"]').css({"display":"none"});
            cmCreateConversionEventTag('Hide', 2, 'Show All Alternate Colors', 0);
        }
    });

    // add listeners to quantity input to only allow numbers
    $('input[name="quantity"]').keyup(function (e) {
        if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 37 && e.keyCode !== 39) {
            var raw_text = $(this).val();
            var return_text = raw_text.replace(/[\D]/g, '');
            $(this).val(return_text);
        }
    });

    $('input[name="quantity"]').focus(function () {
        if (this.value == 1)
            this.value = "";
    });
    $('input[name="quantity"]').blur(function () {
        var raw_text = this.value;
        var return_text = raw_text.replace(/[^0-9 _]/g, '');
        if (return_text == '' || return_text == 0)
            this.value = 1;
        else if (return_text >= 256)
            this.value = 255;
        else
            this.value = return_text;
    });

    // listener for share link
    $('#social_share').on('click', 'a', function () {
        var curOpac = $('.social').attr('data-visible');
        if (curOpac == 'true') {
            $('.social').css({ 'height': '0' }).attr('data-visible', 'false').attr('tabindex', -1);
        } else {
            $('.social').css({ 'height': '25px' }).attr('data-visible', 'true').attr('tabindex', 0);
        }
    });

    $('.colors_badge').on('click', function () {

        $(productVariables.scrollTarget).stop();
        productFunctions.showOtherStyles(false);

        $(productVariables.scrollTarget).animate({
            scrollTop: ($('.other_styles').offset().top - productVariables.adjust)
        }, 400);

        cmCreateConversionEventTag('Colors Badge', 2, 'PDP Badges', 0);
    });

    $('.info_badges').on('click', '.xy_badge a.message', function (e) {
        e.preventDefault();
        cmCreateConversionEventTag('X for Y Badge', 2, 'PDP Badges', 0);
        location.href = 'http://' + document.domain + $(this).attr('href');
    });

    $('.product_overview').on('click', '#size_remove', function (e) {
        e.preventDefault();
        $('.other_style_count').text($('.other_style_count').attr('data-original'));
        $('.other_size_filter').empty();
        $('#pdp_selectedSize').val('');
        $('#pdp_size_select').text('-');
        $('.other_styles a[data-sku]').removeClass('unavailable');
        $('.other_styles a[data-sku]').attr('data-size', 'true');
        $('.size_button').removeClass('selected');
        $('#pdp_size_select').removeClass('size_selected');
        $('.add_to_cart button').addClass('disabled');
        productVariables.selectedSize = '';
    });

    $('body').on('click', function (e) {
        e.stopPropagation();
        $('.size_unavailable').remove();
        $('.add_section [data-info="add_errors"]').empty();
        $('.add_section [data-info="wishlist_errors"]').empty();
        miniAddToCart.closeMiniAddToCart();
    });

    $("body").on('click touchend', ".video_screen", function () {
        $(".video_container").empty().addClass('hide');
        $('.video_screen').addClass('hide');
    });

    $("body").on('click', "#close_vid", function () {
        $(".video_container").empty().addClass('hide');
        $('.video_screen').addClass('hide');
    });



    //APPEND PROD WEIGHT BOX TO DETAILS TAB
    var product_weight = $('.description ul li:last-child').text();
    if (product_weight[product_weight.length - 1] === ".") {
        product_weight = product_weight.slice(0, -1);
    }
    if (productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['SHOE_WEIGHT']) {
        $('.pdp_description').append('<div class="weight_callout"><div id="weight_icon" class="pdp_sprite"></div><span class="weight_header">WEIGHT:</span><span class="weight">' + productVariables.styleData[sku_nbr][productFunctions.getStyleValue('metadata')]['SHOE_WEIGHT'] + '</span></div><div class="clear"></div>');
    }
        //logic to grab weight from unordered list
    else if (product_weight.indexOf("Wt.") >= 0) {
        product_weight = product_weight.substring(product_weight.indexOf("Wt.") + 3, product_weight.length);
        $('.pdp_description').append('<div class="weight_callout"><div id="weight_icon" class="pdp_sprite"></div><span class="weight_header">WEIGHT:</span><span class="weight">' + product_weight + '</span></div><div class="clear"></div>');
    }

    $('.product_info').on('click', '.BVRRRatingNormalImage', function () {
        productFunctions.swapTabs('reviews', true);
        cmCreateConversionEventTag("Review Stars", 2, "PDP Reviews", 0);
    })

    $('.pdp_top_nav').off('click', 'a').on('click', 'a', function () {
        var navData = $(this).attr('data-tabnav');
        productFunctions.swapTabs(navData, true);
        cmCreateConversionEventTag(navData, 2, 'PDP Nav', 0);
    });

    window.miniCartLegacyYMALTemplate = location.protocol + "//" + location.host + "/miniAddToCart/ymal.cfm";
    window.cartTemplate = location.protocol + "//" + location.host + "/catalog/orderSummary.cfm";
    window.miniCartYmalsTemplate = location.protocol + "//" + location.host + "/miniAddToCart/miniCartYmals.cfm";
    window.moreYmalsTemplate = location.protocol + "//" + location.host + "/miniAddToCart/miniCartExtendedYmals.cfm";
    window.moreYmalsImage = location.protocol + "//" + location.host + "/images/fl/buttons/btn_minicart_more_ymal.jpg";

    $('body').on('click', '[data-info="fit_promise"]', function () {
        Shadowbox.open({
            content: '#fit_msg',
            player: 'inline',
            height: 425,
            width: 852
        });
        $('#sb-info').css('display', 'none');
        $('#sb-wrapper-inner').css('margin', '0');
    });

    $('body').on('click', '#TSlink', function (e) {
        e.preventDefault();

        Shadowbox.open({
            content: '<img src="/ns/pdp/images/team-overlay-image-062414a.jpg" />',
            player: 'html',
            height: 518,
            width: 846
        });
        $('#sb-info').css('display', 'none');
        $('#sb-wrapper-inner').css('margin', '0');
    });

});

// Scene7 AJAX Response TODO
function s7jsonResponse(obj, id) {
    //  console.log("func S7jsonResponse");

    var imageSetArray = [];
    productVariables.views = [];

    try {

        imageSetArray = obj['IMAGE_SET'].split(",");
        productVariables.views = imageSetArray;

        $('div[data-info=product_images]').attr({ 'id': 'product_images', 'class': 'spotlight full' });
        if ($('div[data-info=product_images] #selected_item').html() == null) {
            $('div[data-info=product_images]').append('<div id="selected_item" class="slide_content">'
                + '<ul>'
                + '</ul>'
                + '</div>');
        }
        $('div[data-info=product_images] #selected_item').html('<ul></ul>');
        $('div[data-info=product_images] .slide_buttons').remove();

        if (imageSetArray.length >= 1 && imageSetArray != "") {

            var tempHTML = '';
            for (var i = 0; i < (imageSetArray).length; i++) {
                tempHTML += '<li><div class="alt_view"><img class="reg_image d" src="' + scene7url + '/' + imageSetArray[i].split(";")[0] + '?hei=500&wid=500" border="0" alt="' + productVariables.modelData.NM + '"/></div></li>';
            }
            $('div[data-info=product_images] #selected_item ul').append(tempHTML);
            // $('#product_images .alt_view').inlineZoom(productVariables.inlineZoomSettings);
            $.extend(productVariables.productSpotlightSettings, {
                'transition': 'slide', 'endStop': true, 'rotate': false, 'onSnap': function () {
                    $('div[data-info=product_images] .slide_buttons a').removeClass('disable');
                    if (productVariables.productSpotlight.curSlide == 0) {
                        $('div[data-info=product_images] .sl_previous').addClass('disable');
                    }
                    if (productVariables.productSpotlight.curSlide == $('div[data-info=product_images] .slide_content ul li').length - 1) {
                        $('div[data-info=product_images] .sl_next').addClass('disable');
                    }
                }
            });

            productVariables.productSpotlight = $('#product_images').spotlight(productVariables.productSpotlightSettings);

            if (imageSetArray.length > 1) {
                if ($('div[data-info=product_images] .slide_buttons').length == 0) {
                    $('div[data-info=product_images]').append('<div class="slide_buttons" style="display: block;">' +
                        '<a href="javascript:void(0);" class="sl_previous left-arrow pdp_sprite disable" title="View Previous Image"></a>' +
                        '<a href="javascript:void(0);" class="sl_next arrow pdp_sprite" title="View Next Image"></a>' +
                        '</div>');
                    $('div[data-info=product_images]').off('click', '.sl_previous').on('click', '.sl_previous', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        productVariables.productSpotlight.previousSlide();
                    });
                    $('div[data-info=product_images]').off('click', '.sl_next').on('click', '.sl_next', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        productVariables.productSpotlight.nextSlide();
                    });
                }
            } else {
                $('div[data-info=product_images] .slide_buttons').remove();
            }

            $('#selected_item').show();
            $('#zoominit').show();
            productVariables.productSpotlight.resizeSpotlight();

            //Check to see if its already on the page
            if ($('.fullscreen-maximize').length === 0) {

                $('#mixed_media_controls').prepend('<a href="#full_screen" id="open_pushdown" class="full full_toggle pdp_sprite fullscreen-maximize" title="View Full Screen"></a>');

                // $('#open_pushdown').fullScreen({ data: obj, scene7url : 'http://images.eastbay.com/is/image/', fullTemplate: '<div class="full_screen_header"><span class="inner_header"><span class="product_container"><span class="product_name"><span class="product_genderAge eb-bold"></span><span class="product_title"></span></span></span>[pdp.alternateviews][pdp.zoomcontrols][pdp.close]</span></div>[pdp.mainview]' });
                //$('#selected_item').fullScreen({ data: obj, scene7url : 'http://images.eastbay.com/is/image/', fullTemplate: '<div class="full_screen_header"><span class="inner_header"><span class="product_container"><span class="product_name"><span class="product_genderAge eb-bold"></span><span class="product_title"></span></span></span>[pdp.alternateviews][pdp.zoomcontrols][pdp.close]</span></div>[pdp.mainview]' });
                $('#open_pushdown').on('click', cmConversionEventViewLargerImage);
            };
            $('#product_images').addClass('full');

            $('.full').fullScreen({ data: obj, group: true, scene7url: 'http://images.eastbay.com/is/image/', fullTemplate: '<div class="full_screen_header"><span class="inner_header"><span class="product_container"><span class="product_name"><span class="product_genderAge eb-bold"></span><span class="product_title"></span></span></span>[pdp.alternateviews][pdp.zoomcontrols][pdp.close]</span></div>[pdp.mainview]' });

            $('.inner_header .product_genderAge').text($('.product_info .product_genderAge').text());
            $('.inner_header .product_title').text($('.product_info .product_title').text());

        } else {
            //console.error("ERROR");
            $('#product_images').remove();
            if ($('div[data-info=product_images] #selected_item').html() == null) {
                $('.shoe_images').append('<div data-info="product_images"><div id="selected_item" class="slide_content">'
                    + '<ul><li></li>'
                    + '</ul>'
                + '</div></div>');
            }
            $('div[data-info=product_images]').attr({ 'id': 'product_images', 'class': 'spotlight' });
            //$('div[data-info=product_images] #selected_item').html('<ul><li></li></ul>');
            // $('div[data-info=product_images] #selected_item ul li').html('<img src="' + productVariables.nonScene7url + sku_nbr + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" class="reg_image" border="0" alt="' + productVariables.modelData.NM + '" /><div class="pdp_sprite product_shadow"></div>');

            //console.log('NON-SCENE7');
            $('div[data-info=product_images] #selected_item ul').html('<li><img src="' + productVariables.nonScene7url + '/' + sku_nbr + '/' + productVariables.mainImageSize[0] + '/' + productVariables.productName + '" class="reg_image" border="0" alt="' + productVariables.modelData.NM + '" /></li>');
            if (typeof (productVariables.productSpotlight.numSlides) != 'undefined') {
                productVariables.productSpotlight.numSlides = 1;
            }
            productFunctions.scene7Unavailable();
        }
    } catch (err) { }
    //console.timeEnd("s7");
}

function checkHotLaunchItem() {
    return false;
}

function validateProduct() {
    return "";
}

function disableToCartButton() {
    $('[data-info="add_to_cart"] button').attr("disabled", "true");
    $('[data-info="add_to_cart"] button').addClass('processing');
}

function enableToCartButton() {
    $('[data-info="add_to_cart"] button').attr("disabled", null);
    $('[data-info="add_to_cart"] button').removeClass('processing');
    $('#miniAddToCart_close').focus();
}

function addToCart(skip) {

    $('#storepickup select[name="sizes"]').val()
    if ($('[data-info="product_sizes"] a.selected[data-value]').length == 0 && $('#storepickup select[name="sizes"]').val() == null) {
        $('#size').val(' ');
        $('#pdp_selectedSize').val(' ');
    }

    $("#pdp_quantity").val($('#quantity').val());
    var errMsg = productFunctions.validateProduct();
    if (errMsg != "") {
        productFunctions.displayError($('[data-info=add_errors]'), '<span class="pdp_sprite"></span><ul>' + errMsg + '</ul>');
        $('[data-info="add_to_cart"] button').removeClass('processing');
        return;
    } else {
        $('[data-info=add_errors]').empty();
    }

    disableToCartButton();
    var sku = $('#pdp_selectedSKU').val();
    var size = $('#pdp_selectedSize').val();
    var qty = $('#pdp_quantity').val();
    var pdp_fulfillmentType = $('#pdp_fulfillmentType').val();
    var storeNumber = $('#pdp_storeNumber').val();
    var storeCostOfGoods = $('#pdp_storeCostOfGoods').val();
    window.displayLaunchHelp = function () {
        return false;
    };
    $('#launchHalt a').on('click', 'a', function (e) {
        var $element = $(this);
        e.stopPropagation();
        $.ajax({
            url: productVariables.launchHelp,
            dataType: 'html',
            error: function (error) {
                //console.log('ERROR'+ error);
            },
            success: function (data) {
                $element.parent('#launchHalt').html(data);
            }
        });
        return false;
    });
    if ($("#pdp_hasXYPromo").length == 0 || $("#pdp_hasXYPromo").val() == "true") {
        /*	try{
         $.cartActions('add',{'qty':qty,'sku':sku,'size':size,'fulfillmentType':pdp_fulfillmentType,'storeNumber':storeNumber,'storeCostOfGoods':storeCostOfGoods}, function(data){
         jqueryPDPSettings.addToCartCallback(data);
         });
         } catch(err){}*/
        miniAddToCart.openMiniAddToCart("product_form", function () {
            enableToCartButton();
        });
    }

    return false;
}

function bvcreateproductviewtag(totalReviewsCount, avgRating, buyAgainPercentage, cm_isProductMaskedPricing, cm_isLaunchSku) {

    var model_name = $("#model_name").html();
    var sku = $("#pdp_selectedSKU").val();
    cm_Attributes = totalReviewsCount + "-_-" + avgRating + "-_-" + buyAgainPercentage + "-_-" + cm_isProductMaskedPricing + "-_-" + cm_isLaunchSku;
    if (cm_Attributes != null) {
        $("#bvRRAttributes").val(cm_Attributes);
    }
    if (cm_CategoryID == '') {
        cm_CategoryID = null;
    }
    if (cm_Attributes == '') {
        cm_Attributes = null;

    }
    if (cm_ProductTemplate == '') {
        cm_ProductTemplate = null;
    }
    if (cm_microsite == '') {
        cm_microsite = null;
    }
    if (sku == productVariables.originalSku)
        cmCreateProductviewTag(sku, model_name, cm_CategoryID, cm_ProductTemplate, cm_microsite, cm_Attributes);
    else
        cmCreateProductviewTag(sku, model_name, cm_CategoryID, 'Other Styles', cm_microsite, cm_Attributes);

}
function cmConversionEventViewLargerImage() {
    cmCreateConversionEventTag("View Larger", 1, "PDP Images", 0);
    cmCreateConversionEventTag("View Larger", 2, "PDP Images", 0);
}

function cmConversionEventSPPDPLink() {
    cmCreateConversionEventTag("SP PDP Link", 1, "Striperpedia", 0);
    cmCreateConversionEventTag("SP PDP Link", 2, "Striperpedia", 0);
}

function showBubble(message) {
    //console.log("Show Bubble");
}
