var OakleyConfigure = {
    ACCEPT_TERMS_ALIAS: 'accept_terms',
    ADD_LENS_ALIAS: 'add_lens',
    ETCH_OR_LOGO_ALIAS: 'etch_or_logo',
    AV_ID_YES: 'av27407',
    AV_ID_NO: 'av27408',
    urlParameters: {},
    configParams: {},
    baseUrl: null,
    configureHtml: null,
    configureApi: null,
    productId: null,
    vendorId: null,
    region: null,
    currency: null,
    locale: null,
    customerId: null,
    workflow: null,
    environment: null,
    recipeId: null,
    productType: 'unset',
    etchingDialogOpen: false,
    etchingActive: false,
    hasPersonalization: true,
    addToCart: null,
    productQuantity: null,
    configureContainer: null,
    progressBar: null,
    zoomShareComponent: null,
    updatingRecipe: false,
    firstLensAlias: '',
    allowedInJapan: false,
    accordion: null,
    CREATED_EVENT: null,

    productTypeCustomization: {
        "Glasses": {
            personalization_dialog_title: 'Personalize Your Glasses',
            personalization_title: 'Add Etching',
            view_name: 'Share',
            etching_alias: 'ocp_etching_font',
            mlb_alias: 'ocp_etch_sp_logo',
            etching_text_alias: 'ocp_etching_text',
        },
        "Goggle": {
            personalization_dialog_title: 'Personalize Your Goggle',
            personalization_title: 'Add Etching',
            view_name: 'Share',
            etching_alias: 'ocp_etching_font',
            etching_text_alias: 'ocp_etching_text',
        },
        "Pack": {
            personalization_dialog_title: 'Personalize Your Pack',
            personalization_title: 'Add Embroidery',
            view_name: 'Back',
            etching_alias: 'oacp_embr_font',
            etching_text_alias: 'oacp_embr_text',
        },
        "Pack Embroidery Left View": {
            personalization_dialog_title: 'Personalize Your Pack',
            personalization_title: 'Add Embroidery',
            view_name: 'Share',
            etching_alias: 'oacp_embr_font',
            etching_text_alias: 'oacp_embr_text',
        },
        "Pack Embroidery Back View": {
            personalization_dialog_title: 'Personalize Your Pack',
            personalization_title: 'Add Embroidery',
            view_name: 'AlphaCharlieEmbroidery',
            etching_alias: 'oacp_embr_font',
            etching_text_alias: 'oacp_embr_text',
        },
        'unset': {
            personalization_dialog_title: 'Personalize Your Product',
            personalization_title: 'Personalize',
            view_name: 'Front',
            etching_alias: 'ocp_etching_font',
            etching_text_alias: 'oacp_embr_text',
        }
    },

    productAttributes: {},

    launchConfigure: function() {
        var instance = this;
        this.configureContainer = jQuery('#configureContainer');

        // This first block just parses the url parameters into this urlParams array.
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            instance.urlParameters[key] = value;
        });

        // correct for recipe URLs including the leading 'p_'
        var tmpProductId = this.urlParameters['productId'];
        if ('undefined' != typeof(tmpProductId) && tmpProductId.indexOf('p_') == -1) {
            tmpProductId = 'p_' + tmpProductId;
        }

        // setup url parameters and their defaults
        this.workflow = this.urlParameters['wf'] || 'qa';
        if(this.workflow == 'prod') {
        this.baseUrl = this.urlParameters['baseUrl'] || "http://configurepublish.cf.fluidretail.net";
        } else  {
        this.baseUrl  = this.urlParameters['baseUrl'] || "http://fluid-configure-published.s3.amazonaws.com";
        }
        this.environment = this.urlParameters['productEnv'] || 'prod';
        this.customerId = this.urlParameters['customerId'] || '1479';
        this.productId = (tmpProductId || 'p_20450');
        this.vendorId = this.urlParameters['vendorId'] || null;
        this.region = this.urlParameters['region'] || 'US';
        this.currency = this.urlParameters['currency'] || 'USD';
        this.number = this.currency;
        this.analyticsAccountName = this.urlParameters['analyticsAccountName'] || 'US';
        //this.locale  = this.urlParameters['lang'] || 'en_us';

        var locale = 'en_us';
        if(this.urlParameters['lang']) { locale = this.urlParameters['lang']; };
        if(this.urlParameters['locale']) { locale = this.urlParameters['locale']; };
        this.locale = this.parseLanguageCodes(locale);
        if (this.urlParameters['recipeId']) {
        this.recipeId = this.urlParameters['recipeId'];
        } //|| this.productAttributes[this.productId].defaultRecipe;

        // setup default state container for option breakdown
        this.productAttributes[this.productId] = {
        "aliases": {},
        "changed": {}
        };

        // setup onpage elements
        this.addHtml(instance.configureContainer);

        // assemble parameters to pass to configure
        this.configParams = {
            //recipeId: this.recipeId,
            customerId: this.customerId,
            productId: this.productId,
            locale: this.locale,
            currency: this.currency,
            number: this.number,
            baseUrl: this.baseUrl + '/' + this.environment + '/' + this.workflow,
            analyticsAccountName: this.analyticsAccountName,
            facetFilters : [{"facet": "REGION", "facetValue": this.region}],
            urlGenerator: function (options, cb) {
                // Get the recipe JSON
                instance.configureApi.getRecipeAsync(options.recipeId, function(err, recipe) {
                    var region = instance.region.toLowerCase(),
                        webserver = ( region === 'us' ) ? 'www' : region,
                        url = 'http://'+ webserver +'.oakley.com/'+ options.locale +'/custom-product/OCP-'+ recipe.product.vendor_id +'?recipeId='+ options.recipeId;
                    return cb(null, url);
                });
            }
        };

        if (this.recipeId) {
        this.configParams.recipeId = this.recipeId;
        }

        // any value for dev will use the local css rather than the theme uploaded to the admin tool
        _dev = this.urlParameters["dev"] || false;
        if (_dev) {
        this.configParams['themeUrl'] = 'theme/jquery-ui-1.8.21.custom.css';
        } else {
        this.configParams['themeUrl'] = this.baseUrl + '/prod/' + this.workflow + '/customers/c' + this.customerId + '/configureHtml/css/custom.css'
        }
        if (this.vendorId) {
            lookupRealtimeAvailability(this.vendorId, this.region);
        } else if (this.vendorId) {
            lookupVendorId(this.vendorId, 'loadConfigureByVendorId');
        } else {
            this.instantiateConfigure();
        }
    },

    instantiateConfigure: function() {
        var ConfigureHtml = fluid.retail.configure.controls.ConfigureHtml;
        // use the new event if it exists, otherwise fallback to the 6.2.x event
        this.CREATED_EVENT = ConfigureHtml.COMPONENTS_LOADED || ConfigureHtml.APPLICATION_CREATED;

        // Instantiate a new Configure instance, passing the pertinent parameters
        this.configureHtml = new ConfigureHtml(this.configParams);
        // The method indicated here will be run once the Configure content has been instantiated.
        this.configureHtml.addEventListener(
            this.CREATED_EVENT,
            this, this.applicationCreatedHandler);
        this.configureHtml.embed('configureContainer');

        this.configureHtml.addEventListener(ConfigureHtml.LOADER_PERCENTAGE_UPDATE, null, function(event){
            if( event.data.percentage === 100 ){
                 if ( typeof Oakley !== 'undefined' && typeof Oakley.configureLoaded !== 'undefined' ) {
                    Oakley.configureLoaded();
                } else {
                    console.error('Oakley.configureLoaded() is not defined, OCE-552');
                }
            }
        });

        // Add workflow to the body tag
        $('body').addClass('configure-' + this.workflow);

        if( this.urlParameters['debug'] ) {
            $('body').removeClass('configure-' + this.workflow);
        }
    },

    // Once the Configure content has been instantiated, this method will run.  Set up additional event listeners here.
    applicationCreatedHandler: function() {
        this.configureHtml.removeEventListener(
            this.CREATED_EVENT,
            this, this.applicationCreatedHandler);

        this.configureApi = this.configureHtml.getConfigureApi();
        this.configureApi.addEventListener(
            fluid.retail.html.configure.FConfigureApi.ADD_TO_CART_EVENT,
            this, this.addedToCartHandler);

        this.configureApi.configureApp.addEventListener(
            fluid.retail.html.configure.FConfigureApplication.BEFORE_SELECT_VALUE,
            this, this.beforeSelectValueHandler);

        this.configureApi.addEventListener(
            fluid.retail.html.configure.FConfigureApi.RECIPE_CHANGED_EVENT,
            this, this.recipeChangedHandler);

        this.configureApi.addEventListener(
            fluid.retail.html.configure.FConfigureApi.GENERATE_IMAGES_EVENT,
            this, this.handleGenerateImagesEvent);

        this.configureApi.addEventListener(
            fluid.retail.html.configure.FConfigureApi.START_OVER_EVENT,
            this, this.startOverHandler);

        if( 'true' == this.urlParameters['loadStartingPoints'] ) {
            this.loadStartingPoints();
        }

        this.initComponents();
    },

    initComponents: function() {
        var instance = this;

        var productData = instance.configureApi.getPrice().product;
        var productName = instance.configureApi.getProductName();
        jQuery('.options-list .product-title').html(productName);
        // setup default state container for option breakdown
        instance.productAttributes[instance.productId] = {
            "aliases": {},
            "changed": {}
        };

        // populate the attribute accounting objects
        jQuery.each(instance.getAllAttributes(), function(id, attr) {
            instance.productAttributes[instance.productId]['aliases'][attr.getAlias()] = instance.getAttributeLabel(attr);
            instance.productAttributes[instance.productId]['changed'][attr.getAlias()] = false;
        });

        // run product specific setup/customization code
        instance.doProductSpecificSetup();

        // load messaging
        jQuery('.messaging-area').html(instance.configureApi.configureApp.product.getDescription());

        // setup custom zoom control by replacing existing zoom button
        zoom_html = jQuery('div.configure-zoom').html();
        zoom_html = zoom_html.replace('Zoom', 'Enlarge');
        // replacing the html with its string kills any configure events attached
        jQuery('div.configure-zoom').html(zoom_html);
        jQuery('div.configure-zoom').on("click touchend", function() {
            instance.openZoomDialog();
        });

        // test for personalization
        if (instance.detectPersonalization()) {
            instance.enablePersonalization();
        } else {
            instance.disablePersonalization();
        }

        jQuery('#continueToPersonalizationMainContainer .kineticClickableChild').on("click touchend", function() {
            if (instance.hasPersonalization) {
                instance.openPersonalizationDialog();
            } else {
                jQuery('#ecommerce-' + instance.customerId + '-' + instance.productId + '-addToCart_button').click();
            }
        });

        jQuery('.custom-share-controls .share-email-icon').on("click touchend", function() {
            instance.configureApi.share("shareEmail");
        });
        jQuery('.custom-share-controls .share-pinterest-icon').on("click touchend", function() {
            instance.configureApi.share("sharePinterest");
        });
        jQuery('.custom-share-controls .share-twitter-icon').on("click touchend", function() {
            instance.configureApi.share("shareTwitter");
        });
        jQuery('.custom-share-controls .share-facebook-icon').on("click touchend", function() {
            instance.configureApi.share("shareFacebook");
        });

        // read product type facet - might be missing, just catch the exception
        try {
            jQuery.each(instance.configureApi.configureApp.product.customerConfiguration.productFacets, function(k, v) {
            if ('Product Type' == instance.translateText(v.facetName)) {
                instance.productType = instance.translateText(v.facetValues[0]['facetValueName']);
            }
            if ('Allowed in Japan' == instance.translateText(v.facetName)) {
                instance.allowedInJapan = (instance.translateText(v.facetValues[0]['facetValueName']) == 'Yes');
            }
            });
        } catch (e) {}


        // CUSTOM: move the selected value elements directly above the swatches
        var aliases = instance.productAttributes[instance.productId]['aliases'];
        jQuery.each(aliases, function(alias, label) {
            attr = instance.getProductAttributeByAlias(alias);
            if ('undefined' == typeof(attr) || attr.selectorType != 'swatch') {
                // skip invalid non-swatch attributes
                return true;
            }

            if (attr.productAttributeId.indexOf("__") != -1) {
                // grouped attributes are special
                var selector = '#selector-component-' + instance.customerId + '-' + instance.productId + '-_accordion_productAttribute_' + attr.productAttributeId;
            } else {
                var selector = 'div[productattributeid=' + attr.productAttributeId + '] .configure-product-attribute-container';
            }

            var swatch_wrapper = selector + ' > div > .configure-accordion-swatch-wrapper';
            var error_wrapper = selector + ' > div > div > .selected-value-container';

            jQuery(swatch_wrapper).before(jQuery(error_wrapper).parent());
        });

        // CUSTOM: best guess as to the alias of the first lens CA
        jQuery.each(aliases, function(alias, label) {
            if ( alias.indexOf('lens_') !== -1 && alias.indexOf('_tab') < 0 ) {
                instance.firstLensAlias = alias;
                return false;
            }
        });

        // CUSTOM: remove titles and selected values for button group CAs,
        // we're just using those for tabbed panel effects
        var aliases = instance.productAttributes[instance.productId]['aliases'];
        jQuery.each(aliases, function(alias, label) {
            attr = instance.getProductAttributeByAlias(alias);
            if ('undefined' == typeof(attr) || attr.selectorType != 'buttongroup') {
                // skip invalid non-swatch attributes
                return true;
            }
            var selector = '#selector-component-' + instance.customerId + '-' + instance.productId +
                '-_accordion_productAttribute_' + attr.productAttributeId +
                '-configurable-options-container';

            jQuery(selector + " > span.configure-product-attribute-title").first().remove();
            jQuery(selector + " > div").first().remove();
        });

        // CUSTOM: remove titles and whitespace for lens hopups
        $("span.configure-product-attribute-title:contains('Lens Tint')").hide();

        // CUSTOM: remove subtitles and whitespace for lens tabs
        jQuery.each(aliases, function(alias, label) {
            attr = instance.getProductAttributeByAlias(alias);
            if ('undefined' == typeof(attr) || alias.indexOf('lens') == -1 || attr.productAttributeId.indexOf('__') != -1 ) {
                // skip invalid or non-lens or non-top-level attributes
                return true;
            }
            var selector = '#selector-component-' + instance.customerId + '-' + instance.productId +
                '-_accordion_productAttribute_' + attr.productAttributeId +
                '-configurable-options-container';

            jQuery(selector + " .configure-product-attribute-container " +
                "span.configure-product-attribute-title").remove();
        });

        if( 'true' != this.urlParameters['loadStartingPoints'] ) {
            instance.setRegion( instance.region );
        }

        $('#continueToPersonalizationMainContainer').css('visibility','');

        // CUSTOM: cache the accordion component object without referring to it by name...
        jQuery(instance.configureApi.configureApp.components).each( function( i,c ) {
            if( 'undefined' != typeof( c.renderStrategy ) && 'undefined' != typeof( c.renderStrategy.openedPopups ) ) {
                instance.accordion = c;
                return false;
            }
        });

        // CUSTOM: DANGER WILL ROBINSON: Monkeypatch .configureApi.configureApp.selectFacetValue
        if( 'undefined' != typeof(instance.configureApi.configureApp.selectFacetValue) ) {
            var oldSelectFacetValue = instance.configureApi.configureApp.selectFacetValue;

            instance.configureApi.configureApp.selectFacetValue = function() {
                oldSelectFacetValue.apply( instance.configureApi.configureApp, arguments );
                if( instance.accordion.renderStrategy.openedPopups.length > 0 ) {
                    // scan for empty swatches
                    if( jQuery('.configure-accordion-swatch-wrapper .configure-swatch:visible').length == 0 ) {
                        instance.accordion.renderStrategy.openedPopups[0].html
                            .find('.configure-accordion-swatch-wrapper:visible:not(:has(:visible))')
                            .last().parent().find('.configure-facet-no-values').show();
                    } else {
                        instance.accordion.renderStrategy.openedPopups[0].html
                            .find('.configure-accordion-swatch-wrapper:visible:has(:visible)')
                            .last().parent().find('.configure-facet-no-values').hide();
                    }
                }
            };
        }

        // FINALLY: populate the empty selected value list on first load
        instance.recipeChangedHandler({
            data: {
                productAttributeId: 'dummy'
            }
        });

    },

    startOverHandler: function(event) {
        var instance = this;

        // clear the option breakdown list
        instance.productAttributes[instance.productId]['changed'] = {};

        // load starting point or clear out personalization and set region
        if( 'true' == this.urlParameters['loadStartingPoints'] ) {
            this.loadStartingPoints();
        } else {
            instance.setRegion( instance.region );
        }

        // force accept_terms to No
        var attr = instance.getProductAttributeByAlias(instance.ACCEPT_TERMS_ALIAS);
        if ('undefined' != typeof(attr) &&
            instance.AV_ID_NO !== instance.getAttributeValueId(attr.productAttributeId)) {
            // getFirstActiveValue copied from setDefault in recipe
            instance.deferCall( function() {
                instance.configureApi.configureApp.selectValue(
                    attr.getConfigProductAttributeId(), attr.getFirstActiveValue());
            });
        }

        // force clear of Personalization CAs
        instance.resetEtchingAttributes();

        // force clear of Personalization additional price
        $('.additional-cost-price').html( instance.formatMoney('0.00') );

        // force re-populate the selected value list on first load
        instance.recipeChangedHandler({
            data: {
                productAttributeId: 'dummy'
            }
        });
    },

    loadStartingPoints: function() {
        if( this.urlParameters['debug'] ) {
            console.log( 'Loading starting points...' );
        }

        // Setup the URL to our startingPoints.js file
        var startingPointsUrl = this.baseUrl + '/' + this.environment + '/' + this.workflow + '/customers/c' + this.customerId + '/configureHtml/products/' + this.productId + '/startingPoints.js';

        // GET call
        $.get(startingPointsUrl, {}, null, 'jsonp');
    },

    translateText: function(t) {
        return FCLocalizationUtils.getProductOrApplicationText(this.configureApi.configureApp, t);
    },

    formatMoney: function(amount) {
        return fluid.retail.html.util.localization.formatMoney(amount);
    },

    parseLanguageCodes: function(language) {
        var lang_parts = language.split("_");
        //Hopefully, we won't need any special language processing...
        return lang_parts[0];
    },

    hasAttributeWithAlias: function(alias) {
        // test for personalization
        var attr = this.getProductAttributeByAlias(alias);
        if ('undefined' === typeof(attr)) {
            return false;
        } else {
            return true;
        }
    },

    detectPersonalization: function() {
        return this.hasAttributeWithAlias( this.ACCEPT_TERMS_ALIAS );
    },

    enablePersonalization: function() {
        var instance = this;
        instance.hasPersonalization = true;
        jQuery('.configure-custom-continueToPersonalization-button span.ui-button-text').html('Continue');
    },

    disablePersonalization: function() {
        var instance = this;
        instance.hasPersonalization = false;
        jQuery('.configure-custom-continueToPersonalization-button span.ui-button-text').html('Add to Cart');
    },

    // configure doesn't seem to return attributes in their proper order
    // return them in parent then child order, not children then parent
    getAllAttributes: function() {
        var instance = this;
        //return instance.configureApi.configureApp.product.allProductAttributes;

        var attributes = [];
        jQuery.each(instance.configureApi.configureApp.product.getProductAttributes(), function(id, attr) {
            //attributes[id] = attr;
            //jQuery.each( attr.subProductAttributes, function( subId, subAttr ) {
            //  attributes[subId] = subAttr;
            //})
            attributes.push(attr);
            //Tree walk through the sub attributes.
            instance.getSubAttributes(attr, attributes);
        });
        return attributes;
    },

    //RECURSIVE!
    getSubAttributes: function(attribute, attributes) {
        var instance = this;
        //Break the recursion is the attribute has no sub attributes
        if (!attribute.subProductAttributes) {
            return attributes;
        }
        //recurse through the sub attributes
        jQuery.each(attribute.subProductAttributes, function(subId, subAttr) {
            attributes.push(subAttr);
            instance.getSubAttributes(subAttr, attributes);
        });
        return attributes;
    },

    doProductSpecificSetup: function() {
        var instance = this;
        // nothing to do at the moment
    },

    generateImages: function(params, callback) {
        if ('undefined' != typeof(callback)) {
            this.handleGenerateImagesCallback = callback;
            this.configureApi.generateImages(params);
        } else {
            this.handleGenerateImagesCallback = undefined;
        }
    },

    handleRawGenerateImages: function(event) {
        if ('undefined' != typeof(this.handleGenerateImagesCallback)) {
            this.handleGenerateImagesCallback.call(this, {
                'data': {
                    'imagesUrl': event
                }
            });
        }
        this.handleGenerateImagesCallback = undefined;
    },

    handleGenerateImagesEvent: function(event) {
        if ('undefined' != typeof(this.handleGenerateImagesCallback)) {
            this.handleGenerateImagesCallback.call(this, event);
        }
        this.handleGenerateImagesCallback = undefined;
    },

    openZoomDialog: function() {
        var instance = this;

        // show progress bar
        instance.progressBar = instance.configureApi.configureApp.createProgressBar();
        instance.progressBar.addElementToLoad("template");
        instance.progressBar.show();

        // build alternate views control
        $('#oakley-configure-custom-zoom-container').empty();
        var html = jQuery('.configure-viewThumbsControl').parent().html();
        // no duplicate ids, please
        html = html.replace(/id="([^"]+)"/g, 'id="$1-zoom"');
        $('#oakley-configure-custom-zoom-container').append(html);

        var params = {
            "views": [],
            "padding": "0",
            "width": 1200,
            "height": 720,
            "purpose": "zoomDisplay",
            "displayType": "zoom",
            "zoom": "true"
        };

        // dynamically pull views from the alternate views control
        // TODO: use product data: OakleyConfigure.configureApi.configureApp.product.customerConfiguration.views
        $('.configure-viewThumbsControl-thumb-container').children().each(function() {
            var thumbId = $(this).attr('id');
            thumbId = thumbId.split('-')[1];
            params['views'].push({
                "viewId": thumbId,
                "format": "jpg",
                "quality": "75",
                "backgroundColor": "#FFF",
                "displayType": "zoom",
                "zoom": "true"
            });
        });

        this.generateImages(params, this.zoomImagesDoneHandler);

    },

    zoomImagesDoneHandler: function(event) {
        var instance = this;

        var html = '';
        jQuery.each(event.data.imagesUrl, function(key, imageUrl) {
            // view_name = key; // FCImageGenerator doesn't mangle the view name
            view_name = key.split('__')[1]; // standard generateImages mangles the names
            html += '<div id="configure_c' + instance.customerId + '_' + instance.productId + '-';
            html += view_name + '-zoom-full" class="custom-full-zoom-image" style="display:none;">';
            // ensure zoom=true parameter is in the url
            if (imageUrl.indexOf("zoom=true") === -1) {
                imageUrl += "&zoom=true";
            }
            html += '<img src="' + imageUrl + '">';
            html += '</div>';
        });

        var productData = this.configureApi.getPrice().product;

        if (instance.hasPersonalization) {
            var buttonText = 'Continue';
        } else {
            var buttonText = 'Add to Cart';
        }

        $('#oakley-configure-custom-zoom-container').prepend(html);
        $('#oakley-configure-custom-zoom-container').prepend(
            '<button id="oakley-configure-custom-zoom-container-close" ' +
            ' class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close ui-state-hover ui-state-active">' +
            '<span class="ui-button-icon-primary ui-icon ui-icon-closethick">' +
            '</span><span class="ui-button-text">close</span></button>' +
            '<div id="zoomShareContainer">' +
            '<div class="custom-share-controls">' +
            '  <span class="custom-share-button share-facebook-icon"></span>' +
            '  <span class="custom-share-button share-twitter-icon"></span>' +
            '  <span class="custom-share-button share-pinterest-icon"></span>' +
            '  <span class="custom-share-button share-email-icon"></span>' +
            '</div>' +
            '</div>' +
            '<div id="continueToPersonalizationContainer">' +
            '<div class="configure-custom-continueToPersonalization">' +
            '<div class="kineticClickableChild configure-custom-continueToPersonalization-button configure-oakley-custom-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
            'role="button" aria-disabled="false" ><span class="ui-button-text">' + buttonText + '</span></div></div>' +
            '</div>' +
            '<div class="configure-ecommerce-container ui-widget ui-widget-content clearfix">' +
            '<div class="configure-ecommerce-header">' +
            '<span class="configure-ecommerce-price-header configure-ecommerce-price">' + instance.formatMoney( productData.price ) + '</span>' +
            '</div></div>');

        var selectedId = $('#oakley-configure-custom-zoom-container .configure-viewThumbsControl-thumb-selected').attr('id');
        $('#' + selectedId + '-full').show(); //configure_c1479_p_20450-Front-zoom

        $('#oakley-configure-custom-zoom-container .configure-viewThumbsControl-thumb').on("click touchend", function() {
            $('#oakley-configure-custom-zoom-container .configure-viewThumbsControl-thumb').removeClass('configure-viewThumbsControl-thumb-selected');
            $(this).addClass('configure-viewThumbsControl-thumb-selected');
            $('#oakley-configure-custom-zoom-container .custom-full-zoom-image').hide();
            $('#' + $(this).attr('id') + '-full').show();
        });

        $('#oakley-configure-custom-zoom-container #oakley-configure-custom-zoom-container-close').on("click touchend", function() {
            instance.closeZoomDialog();
        });

        jQuery('#continueToPersonalizationContainer .kineticClickableChild').on("click touchend", function() {
            if (instance.hasPersonalization) {
                instance.openPersonalizationDialog();
            } else {
                try {
                    instance.closeZoomDialog();
                } catch (e) {}
                jQuery('#ecommerce-' + instance.customerId + '-' + instance.productId + '-addToCart_button').click();
            }
        });

        jQuery('#zoomShareContainer .custom-share-controls .share-email-icon').on("click touchend", function() {
            instance.configureApi.share("shareEmail");
        });
        jQuery('#zoomShareContainer .custom-share-controls .share-pinterest-icon').on("click touchend", function() {
            instance.configureApi.share("sharePinterest");
        });
        jQuery('#zoomShareContainer .custom-share-controls .share-twitter-icon').on("click touchend", function() {
            instance.configureApi.share("shareTwitter");
        });
        jQuery('#zoomShareContainer .custom-share-controls .share-facebook-icon').on("click touchend", function() {
            instance.configureApi.share("shareFacebook");
        });

        instance.progressBar.addElementLoaded("template");

        instance.showOverlay(15000);

        $dialog = $('#oakley-configure-custom-zoom-container');
        $dialog.css('width', '1200px');
        $dialog.css('height', '800px');
        $dialog.fillViewport(15001);
        $dialog.fadeIn('fast');
    },

    closeZoomDialog: function() {
        $('#oakley-configure-custom-zoom-container').hide();
        this.hideOverlay();
    },

    openPersonalizationDialog: function() {
        var instance = this;
        try {
            instance.closeZoomDialog();
        } catch (e) {}
        instance.showSmallOverlay(18000);

        instance.configureContainer.addClass('etching_enabled');

        /*
        // show progress bar
        instance.progressBar = instance.configureApi.configureApp.createProgressBar();
        instance.progressBar.addElementToLoad("template");
        instance.progressBar.show();
        */

        // force first lens to be selected. only first lens can be personalized
        // sometimes the attribute is lens_tab, sometimes it's lens_tabs
        $.each(instance.productAttributes[instance.productId].aliases, function(k, v) {
            var attr = instance.getProductAttributeByAlias(k);
            if (attr.selectorType == 'buttongroup' && k.indexOf('lens') != -1) {
                var attrId = attr.getConfigProductAttributeId();
                attrId = attrId.replace('.', '__');
                var attrVal = attr.getProductAttributeValues()[0];

                instance.configureApi.configureApp.selectValue(attrId, attrVal);
            }
        });

        var personalizationView = instance.productTypeCustomization[instance.productType].view_name;
        var params = {
            "views": [{
                "viewId": personalizationView,
                "scale": "1.0",
                "format": "jpg",
                "quality": "75",
                "backgroundColor": "#FFF"
            }],
            "padding": "0",
            "width": 1000,
            "height": 600
        };

        this.generateImages(params, this.loadPersonalizationImagesDoneHandler);
    },

    loadPersonalizationImagesDoneHandler: function(event) {
        var instance = this;

        instance.etchingDialogOpen = true;

        $dialog = $('#oakley-configure-custom-personalization-container');

        instance.configureContainer.append($dialog);
        $dialog.css('position', 'absolute');
        $dialog.css('top', '0px');
        $dialog.css('left', '0px');
        $dialog.css('z-index', 17000);
        $dialog.css('background-color', '#FFF');
        $dialog.css('width', '100%');
        $dialog.css('height', '100%');
        $dialog.fadeIn('fast');

        if ($('#oakley-configure-custom-personalization-container').children().length == 0) {
            var productName = instance.configureApi.getProductName();
            var html = '<form action="javascript:void;">';

            // title text
            var dialogTitleText = instance.productTypeCustomization[instance.productType].personalization_dialog_title;
            var titleText = instance.productTypeCustomization[instance.productType].personalization_title;

            // add title
            html += '<div class="personalization-title-block">';
            html += "<h1>" + dialogTitleText + "</h1>";
            html += "<h2>" + productName + "</h2>";
            html += '</div>';
            html += '<div id="personalization-images-container">';

            // load view
            jQuery.each(event.data.imagesUrl, function(key, value) {
                view_name = key.split('__')[1];
                html += '<div id="configure_c' + instance.customerId + '_' + instance.productId + '-';
                html += view_name + '-personalize-full" class="custom-full-personalize-image">';
                html += '<img src="' + value + '">';
                html += '</div>';
            });

            html += '</div>';

            html += '<div id="personalization-attribute-container">';
            html += '<div class="additional-cost-display">';
            html += '<span class="additional-cost-label">Additional Cost</span><span class="additional-cost-price">'
            html += instance.formatMoney( '0.00' );
            html += '</span>';
            html += '</div>';
            html += '<div class="continue-buttons"><div id="oak-pers-add-and-continue" style="display:none;">' +
                '<button id="oakley-personalization-add-and-continue-button" ' +
                ' class="ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active">' +
                '<span class="ui-button-text">ADD ETCHING</span></button>';
            html += '<span class="skip-or-continue-text">OR</span></div>';
            html += '<button id="oakley-personalization-skip-and-continue-button" ' +
                ' class="ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active">' +
                '<span class="ui-button-text">SKIP TO CART</span></button></div>';


            html += '</div>';

            // add close button
            html += '<button id="oakley-configure-custom-personalization-container-close" ' +
                ' class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close ui-state-hover ui-state-active">' +
                '<span class="ui-button-icon-primary ui-icon ui-icon-closethick">' +
                '</span><span class="ui-button-text">Back to Editor</span></button></form>';

            $('#oakley-configure-custom-personalization-container').html(html);

            $('#oakley-configure-custom-personalization-container #oakley-configure-custom-personalization-container-close').on("click touchend", function() {
                instance.etchingDialogOpen = false;
                instance.closePersonalizationDialog();
            });

            // add attribute accordion
            // get id for alias + '-hopup'
            var attr = instance.getProductAttributeByAlias(instance.ACCEPT_TERMS_ALIAS);
            if ('undefined' != typeof(attr)) {
                var attributeId = attr.getConfigProductAttributeId();

                // HUGE MESS: finish setting up the hopup manually
                // find the right product attribute group id
                var groupId = '';
                jQuery.each( instance.configureApi.configureApp.productAttributeGroups, function( gid, group ) {
                    jQuery.each( group.productAttributes, function( attrId, attribute ) {
                        if( attrId == attributeId ) {
                            groupId = gid;
                            return false;
                        }
                    });
                    if( groupId != '' ) {
                        return false;
                    }
                });

                try {
                    var hopupComponent = instance.accordion.renderStrategy.accordionsByProductAttributeGroupId[groupId];

                    //Add tooltips (see openHopUpForAProdductAttribute::initializeKinetic)
                    var tooltips = [];
                    var productAttributeId;
                    for (productAttributeId in hopupComponent.productAttributeComponents) {
                        if (hopupComponent.productAttributeComponents.hasOwnProperty(productAttributeId)) {
                            var productAttributeComponent = hopupComponent.productAttributeComponents[productAttributeId];
                            tooltips = tooltips.concat(productAttributeComponent.getTooltips());
                        }
                    }

                    for (var i = 0; i < tooltips.length; i = i + 1) {
                        tooltips[i].initialize();
                    }
                    window.fluid.trigger('configure:productAttribute-in-accordion-opened', attributeId);
                } catch (e) {
                    console.log(e);
                }

                jQuery('#personalization-attribute-container').prepend(jQuery('#' + attr.productAttributeId + '-hopup').detach());
                jQuery('#' + attr.productAttributeId + '-hopup .configure-product-attribute-title span').first().html(titleText);
                jQuery('#' + attr.productAttributeId + '-hopup .configure-product-attribute-title').first().addClass('personalize-hopup-title ui-dialog-titlebar');


                // Required for working on lazy loading accordions DEV-2958
                instance.configureApi.openMenu(attr.productAttributeId, function () {

                    jQuery('#personalization-attribute-container .jqTransformCheckboxContainer').on("click touchend", function () {
                        jQuery("#personalization-attribute-container .kineticContainer").css("height", "auto").css("width", "auto");
                    });

                    jQuery('#personalization-attribute-container').children().show();

                    jQuery('#personalization-attribute-container .kineticContainer').css('height', 'auto').css('width', 'auto');

                    $('#oakley-configure-custom-personalization-container #oakley-personalization-add-and-continue-button').on("click touchend", function() {
                        instance.etchingDialogOpen = false;
                        instance.closePersonalizationDialog();
                        $('#ecommerce-' + instance.customerId + '-' + instance.productId + '-addToCart_button').click();
                    });

                    $('#oakley-configure-custom-personalization-container #oakley-personalization-skip-and-continue-button').on("click touchend", function() {
                        instance.etchingDialogOpen = false;
                        instance.closePersonalizationDialog();

						if (instance.AV_ID_NO !== instance.getAttributeValueId(attr.productAttributeId)) {
			// getFirstActiveValue copied from setDefault in recipe
                            instance.configureApi.configureApp.selectValue(
                                attr.getConfigProductAttributeId(),
                                attr.getFirstActiveValue());
                            instance.resetEtchingAttributes();
                        }
                        $('#ecommerce-' + instance.customerId + '-' + instance.productId + '-addToCart_button').click();
                    });

                    var $tandc = jQuery('#personalization-attribute-container .configure-checkbox-text').first();
                    $tandc.html('I Accept the <a href="#" id="terms-and-conditions-link">Terms &amp; Conditions</a>');
                    jQuery('#terms-and-conditions-link').on("click", function() {
                        jQuery('#oakley-configure-terms-and-conditions-container').fadeIn().center();
                    });

                    jQuery('#oakley-configure-terms-and-conditions-container').on("click", function() {
                        jQuery('#oakley-configure-terms-and-conditions-container').fadeOut();
                    });
                });
            }
        } else {
            // DEV-2979 OCE-601 Make sure the personalization container's contents are visible so kinetic container sees it
            // when calculating min div height. Its visiblility can be hidden if a user has previously reset
            // their design using "Start Over"
            jQuery('#personalization-attribute-container').children().show();
            jQuery('#personalization-attribute-container .kineticContainer').css('height', 'auto').css('width', 'auto');

            var html = '';
            // update left view
            jQuery.each(event.data.imagesUrl, function(key, value) {
                view_name = key.split('__')[1];
                html += '<div id="configure_c' + instance.customerId + '_' + instance.productId + '-';
                html += view_name + '-personalize-full" class="custom-full-personalize-image">';
                html += '<img src="' + value + '">';
                html += '</div>';
            });
            $('#personalization-images-container').html(html);
        }

        instance.hideSmallOverlay();
    },

    closePersonalizationDialog: function() {
        $('#oakley-configure-custom-personalization-container').hide();
        this.configureContainer.removeClass('etching_enabled');
        this.hideOverlay();
        this.hideSmallOverlay();
    },

    getLensPopupContentContainer: function(alias, callback) {
        var instance = this;
        var attr = instance.configureApi.configureApp.product.getProductAttributeByAlias(alias);
        if ('undefined' != typeof(attr)) {
            $lens = jQuery('.configure-product-attribute-hopup-body[productattributeid=' + attr.productAttributeId + '] .configure-kinetic-content .configure-product-attribute-container').children().first();
            if ($lens.length == 1) {
                callback($lens);
            }
        }
    },

    getProductAttributeByAlias: function(alias) {
        // NOTE: custom code here b/c the standard implementation doesn't
        //       include sub-attributes when searching by alias
        var attr = undefined;
        allAttributes = this.getAllAttributes();

        // Updated method to accept a string or an array
        var alias_array = (typeof alias !== 'string') ? alias : [alias];

        for ( var i=0; i<alias_array.length; i++ ) {
            if ( !attr ) {
                jQuery.each(allAttributes, function(id, attribute) {
                    if (alias_array[i] == attribute.getAlias()) {
                        attr = attribute;
                        return false;
                    }
                });
            }
        }

        return attr;
    },

    getAttributeValue: function(attributeId) {
        var instance = this;
        return instance.configureApi.configureApp.recipe.selectedProductAttributeValues[attributeId];
    },

    getAttributeValueId: function(attributeId) {
        var attrObj = this.configureApi.configureApp.recipe.selectedProductAttributeValues[attributeId];
        return attrObj.productAttributeValueId;
    },

    getAttributeValueName: function(attributeId) {
        var attrObj = this.configureApi.configureApp.recipe.selectedProductAttributeValues[attributeId];
        return attrObj.getName();
    },

    getAttributeValueKeyByName: function(name) {
        var attrs = this.configureApi.configureApp.product.productAttributeValues;

        for ( var attr in attrs ) {
            if ( this.translateText(attrs[attr].valueConfig.name) === name ) {
                return attr;
            }
        }
        return false;
    },

    getProductAttributeValueIdByAlias: function(alias) {
        var instance = this;
        var attr = instance.getProductAttributeByAlias(alias);
        if ('undefined' !== typeof(attr)) {
            var value = instance.getAttributeValue(attr.productAttributeId);
            if ('undefined' !== typeof(value)) {
                return value.productAttributeValueId;
            }
            return '';
        }
        return '';
    },

    getProductAttributeValueNameByAlias: function(alias) {
        var instance = this;
        var attr = instance.getProductAttributeByAlias(alias);
        if ('undefined' != typeof(attr)) {
            var value = instance.getAttributeValueName(attr.productAttributeId);
            if ('undefined' != typeof(value)) {
                return value;
            }
            return '';
        }
        return '';
    },

    getAttributeLabel: function(attr) {
        return attr.getName();
    },

    getSelectedValueAttributeValueUsageUpcharge: function(attributeId) {
        try {
            var attrObj = this.configureApi.configureApp.recipe.selectedProductAttributeValues[attributeId];
            var avuId = attributeId.replace('__', '.');
            return attrObj.valueConfig.valueUsages[avuId].upcharge;
        } catch (e) {
            return "0.0";
        }
    },

    updatePersonalizationAdditionalPrice: function() {
        var instance = this;
        var attr = this.getProductAttributeByAlias(instance.productTypeCustomization[instance.productType].etching_alias);
        if (instance.is_logo_etching()) {
            attr = this.getProductAttributeByAlias(instance.productTypeCustomization[instance.productType].mlb_alias);
        }
        if ('undefined' != typeof(attr)) {
            var upcharge = this.getSelectedValueAttributeValueUsageUpcharge(attr.productAttributeId);
            if ('object' === typeof(upcharge)) {
                upcharge = upcharge[instance.currency];
            }
            if ('undefined' === typeof(upcharge)) {
                upcharge = '0.0';
            }
            $('.additional-cost-price').html( instance.formatMoney( upcharge ) );
        } else {
            $('.additional-cost-price').html( instance.formatMoney('0.00') );
        }
    },

    beforeSelectValueHandler: function(event) {
        var instance = this;
        var aliases = instance.productAttributes[instance.productId]['aliases'];

        var changedAttr =
            instance.configureApi.configureApp.product.getProductAttribute(event.data.productAttributeId);

        if (instance.urlParameters['debug']) {
            console.log('beforeSelectValueHandler called: ' + attr.getAlias());
        }

        jQuery.each(aliases, function(alias, label) {
            attr = instance.getProductAttributeByAlias(alias);

            if (event.data.productAttributeId == attr.productAttributeId) {
                value_name = event.data.newProductAttributeValue.getName();
                instance.productAttributes[instance.productId]['changed'][alias] = true;
            }
        });

    },

    recipeChangedHandler: function(event) {
        var instance = this;
        var aliases = instance.productAttributes[instance.productId]['aliases'];
        var html = '';
        // Simple counter to know how many CA's are added to the UI
        var ca_count = 0;
        if (instance.updatingRecipe) {
            return false;
        }

        // Set the region to ensure the recipes are still valid
        instance.setRegion( instance.region );

        if (instance.urlParameters['debug']) {
            console.log('recipeChangedHandler called');
        }
        if (instance.detectPersonalization()) {
            instance.etchingActive = (instance.AV_ID_YES === instance.getProductAttributeValueIdByAlias(instance.ACCEPT_TERMS_ALIAS));
        }

        // OCI-597: disable etching when the facet requires it
        var etching_allowed = instance.getProductAttributeFacetValueByName(instance.firstLensAlias, 'OCP_ETCHING');
        if (etching_allowed == 'no' || etching_allowed == 'No' || etching_allowed == 'NO') {
            if (instance.hasPersonalization) {
                instance.disablePersonalization();
            }
        } else {
            // NOTE: only re-enable if personalization is available at all
            if (!instance.hasPersonalization && instance.detectPersonalization()) {
                instance.enablePersonalization();
            }
        }

        var lens_tab_dataid = '',
            icon_tab_dataid = '';
        // CUSTOM: update option breakdown list
        jQuery.each(aliases, function(alias, label) {
            var attr = instance.getProductAttributeByAlias(alias);
            if ('undefined' == typeof(attr)) {
                console.log('Bad attr alias ' + alias);
                // skip to next item
                return true;
            }

            if (instance.urlParameters['debug']) {
                console.log(alias + ": " + instance.getAttributeValueName(attr.productAttributeId));
            }

            // do product specific logic for recipe changed
            instance.doProductSpecificRecipeChangedHandler(alias, label, attr);

            var isLens = (attr.selectorType == 'swatch') && (alias.indexOf('lens') != -1);
            var isMultilens = isLens; // Cache this value so it's not overwritten later

            // test for optional second lens checked
            var addLens = instance.getProductAttributeByAlias(instance.ADD_LENS_ALIAS),
                lens_tabs = instance.getProductAttributeByAlias(['lens_tabs', 'len_tabs', 'lens_tab']),
                secondLens = instance.getProductAttributeByAlias('lens_2');

            if ( lens_tabs ) {
                lens_tab_dataid = ' data-tabid="'+ lens_tabs.productAttributeId +'"';
            }

            if ('undefined' != typeof(addLens) &&
                'No' == instance.getProductAttributeValueNameByAlias(instance.ADD_LENS_ALIAS)) {
                // let visibility take over if add_lens is unchecked
                isLens = false;
            }

            var isIcon = (attr.selectorType == 'swatch') && (alias.indexOf('icon') != -1),
                icon_tabs = instance.getProductAttributeByAlias(['icon_tab', 'icon_tabs']);

            if ( icon_tabs ) {
                icon_tab_dataid = ' data-tabid="'+ icon_tabs.productAttributeId +'"';
            }

            // ignore any personalization swatches for embroidery
            var isPersonalization = false;
            var parent = attr.parent;
            while( parent != null ) {
                if( parent.getAlias() == instance.ACCEPT_TERMS_ALIAS ) {
                    isPersonalization = true;
                }
                parent = parent.parent;
            }

            if ( isPersonalization || (!attr.isVisible() && !isLens && !isIcon) || (attr.selectorType != 'swatch')) {
                // skip personalization related, invisible or non-swatch attributes
                return true;
            }

            // skip attributes excluded by region
            if ( instance.region !== 'US' && !instance.is_in_region(attr.getFirstActiveValue()) ) {
                return true;
            }

            var value_name = instance.getAttributeValueName(attr.productAttributeId);
            var finished;
            if (instance.productAttributes[instance.productId]['changed'][alias]) {
                finished = ' class="finished"';
            } else {
                finished = '';
            }

            // Cache the alias so we can override it
            var _alias = alias,
                // Simple flag to trigger second lens button
                lens_num = '',
                multipart = '',
                lens_av = '',
                dataId_temp = '';

            // If this is a Lens set the correct alias for openMenu
            if ( (isLens && addLens) || (isLens && secondLens) || (isLens && lens_tabs) ) {
                _alias = 'lenses';

                lens_num = ( alias.indexOf('2') !== -1 ) ? '2' : '1';

                // Define which lens is displaying
                multipart = ' data-part="'+ lens_num +'"';
                lens_av   = ' data-partav="'+ instance.getAttributeValueKeyByName('Lens ' + lens_num) + '"';
                dataId_temp = lens_tab_dataid;
            }

            // If the product offers a lens upsell
            if ( isMultilens && typeof addLens !== 'undefined' ) {
                _alias = 'lenses';
            }

            if ( isIcon && icon_tabs ) {
                _alias = 'icon_group';

                icon_num = ( alias.indexOf('2') !== -1 ) ? '2' : '1';

                lens_av   = ' data-partav="'+ instance.getAttributeValueKeyByName('Icon ' + icon_num) + '"';
                multipart = ' data-part="'+ icon_num +'"';
                dataId_temp = icon_tab_dataid;
            }

            html += '<li' + finished + ' data-alias="' + _alias + '"'+ multipart +''+ dataId_temp +''+ lens_av +'><div class="item-shell"><span class="configurable-item">';
            html += label;
            html += '</span><span class="chosen-item">';
            html += value_name;
            html += '</span><div class="clearfix"></div></div></li>' + "\n";

            ca_count++;
            tab_dataid = '';
        });

        jQuery('.options-list ul')
            .html(function() {
                var classes = $('#configureContainer').attr('class').split(' ');

                for (var i = 0; i < classes.length; i++) {
                    if (classes[i].indexOf('ca-item-count') >= 0) {
                        instance.configureContainer.removeClass(classes[i]);
                    }
                }

                instance.configureContainer.addClass('ca-item-count-' + ca_count);

                return html;
            })
            .find('li')
            .click(function(e) {
                var $this = $(this);

                instance.configureApi.openMenu($this.data('alias'), function(err) {
                    if ( $this.data('part') && $this.data('tabid') ) {
                        instance.configureApi.selectValue($this.data('tabid'), $this.data('partav'));
                    }
                });
            });

        // CUSTOM: if box is unchecked, reset ocp_etching_text and ocp_etch_sp_logo
        // personalization CAs to 'null' values to clear pricing - facet filters
        // aren't doing the job
        if( !instance.etchingActive ) {
            instance.resetEtchingAttributes();
        }

        if (instance.etchingDialogOpen) {

            var personalizationView = instance.productTypeCustomization[instance.productType].view_name;
            // update image on change
            var params = {
                "views": [{
                    "viewId": personalizationView,
                    "scale": "1.0",
                    "format": "jpg",
                    "quality": "75",
                    "backgroundColor": "#FFF"
                }],
                "padding": "0",
                "width": 1000,
                "height": 600
            };

            instance.generateImages(params, this.updatePersonalizationImagesDoneHandler);
            instance.updatePersonalizationAdditionalPrice();
            // enable add and continue if personalization is complete
            if (instance.personalizationIsComplete()) {
                $('#oak-pers-add-and-continue').show();
            } else {
                $('#oak-pers-add-and-continue').hide();
            }
        }
        instance.updateOakleyData();
    },

    resetEtchingAttributes: function() {
        var instance = this;
        if( instance.getProductAttributeValueNameByAlias('ocp_etching_text') != '' ) {
            // defer until the current configure event handler completes
            instance.deferCall( function() {
                instance.configureApi.configureApp.clearPersonalizedTexts();
            });
        }
        if( instance.getProductAttributeValueNameByAlias('ocp_etch_sp_logo') != 'NO MLB LOGO' ) {
            var mlbAttr = instance.getProductAttributeByAlias('ocp_etch_sp_logo');
            if( 'undefined' != typeof(mlbAttr) ) {
                var attrId = mlbAttr.productAttributeId;
                var attrVal;
                jQuery(mlbAttr.productAttributeValues).each( function(i,val) {
                    if( 'NO MLB LOGO' == val.getName() ) {
                        attrVal = val;
                    }
                });
                if( 'undefined' != typeof(attrVal) ) {
                    // defer until the current configure event handler completes
                    instance.deferCall( function() {
                        instance.configureApi.configureApp.selectValue(attrId, attrVal);
                    });
                }
            }
        }
        $('#oak-pers-add-and-continue').hide();
    },

    setRegion: function(region) {
        var instance = this;
        instance.set_matching_av_by_vendor_id('region', region);
    },

    updateOakleyData: function() {
        var instance = this;
        //even though we all hate try catch blocks, I am using one here because I am suppressing events
        try {
            //suppress the recipe changed handler
            instance.updatingRecipe = true;
            var aliases = instance.productAttributes[instance.productId]['aliases'];
            //User has unchecked the accept terms box;
            var etching_alias = instance.productTypeCustomization[instance.productType].etching_alias;
            if (etching_alias == 'ocp_etching_font') {
                instance.update_goggles_and_glasses();
            }
            if (etching_alias == 'oacp_embr_font') {
                instance.update_packs();
            }
        } catch (ex) {
            console.log(ex);
        } finally {
            instance.updatingRecipe = false;
        }
    },

    update_packs: function() {
        var instance = this;
        var etching_alias = instance.productTypeCustomization[instance.productType].etching_alias;
        var embroidery = "no-embroid";
        var embroidery_color = "no-embroid";
        if (instance.etchingActive) {
            embroidery = instance.get_selected_av_vendor_id('font', embroidery);
            embroidery_color = instance.get_selected_av_vendor_id('color', embroidery_color);
        }
        instance.set_matching_av_by_vendor_id(etching_alias, embroidery);
        instance.set_matching_av_by_vendor_id('oacp_embr_col', embroidery_color);
    },

    update_goggles_and_glasses: function() {
    var instance = this;
    var etching_alias = instance.productTypeCustomization[instance.productType].etching_alias;
    //set the defaults for the no values
    var font_etching = "ocpno-etching";
    var mlb_etching = "no-mlb-logo";
    var accepted = (instance.AV_ID_YES === instance.getProductAttributeValueIdByAlias(instance.ACCEPT_TERMS_ALIAS));
    //we want etching and mlb
    if (accepted && instance.is_logo_etching()) {
        font_etching = "ocpmlblogo";
        mlb_etching = instance.get_selected_av_vendor_id('etching_selector', mlb_etching);
    }
    //we want etching and no mlb
    if (accepted && !instance.is_logo_etching()) {
        font_etching = instance.get_selected_av_vendor_id('font', font_etching);
    }

    instance.set_matching_av_by_vendor_id(etching_alias, font_etching);
    instance.set_matching_av_by_vendor_id('ocp_etch_sp_logo', mlb_etching);
    instance.update_optional_second_lens();
    },

    update_optional_second_lens: function() {
    var instance = this;
    var second_lens_vendor_id = "ocpno2ndlens";
    var optional_lens = instance.getProductAttributeByAlias(instance.ADD_LENS_ALIAS);
    if ('undefined' != typeof(optional_lens)) {
        if (instance.AV_ID_YES == instance.getProductAttributeValueIdByAlias(instance.ADD_LENS_ALIAS)) {
        second_lens_vendor_id = instance.get_selected_av_vendor_id('lens_2_color', second_lens_vendor_id);
        }
        instance.set_matching_av_by_vendor_id('ocp_lens_ref_2', second_lens_vendor_id);
    }
    },

    //make sure the av is in the specific region by looking up the fact information
    is_in_region: function(av) {
    var instance = this;
    var product_fi18n = Fi18n["configure_" + instance.productId][instance.locale];
    var facet = av.facetsConfig.f21831;
    //only care if the AV has a region facet
    if ( typeof facet === 'undefined' ) {
        return false;
    }
    var result = false;
    $.each(facet, function(index, facetValue) {
        var fv_name = product_fi18n['FacetValue_name_' + facetValue.replace(/\D/g,'')] ;
        if ( fv_name === instance.region ) {
        result = true;
        //found a result, exiting closure
        return;
        }
    });
    return result;
    },

    set_matching_av_by_vendor_id: function(ca_alias, vendor_id) {
    var instance = this;
    var recipe = instance.configureApi.configureApp.recipe;
    var ca = instance.getProductAttributeByAlias(ca_alias);
    if('undefined' != typeof(ca)) {
        $.each(ca.productAttributeValues, function(index, av) {
        split_parts = vendor_id.split('_');
        if(instance.is_in_region(av) && (vendor_id == av.valueConfig.vendorId || split_parts[0] == av.valueConfig.vendorId)) {
            recipe.setAttributeValue(ca.productAttributeId, av);
            return;
        }
        });
    }
    },


    get_selected_av_vendor_id: function(ca_alias, default_value) {
    var instance = this;
    var vendorId = default_value;
    var recipe = instance.configureApi.configureApp.recipe;
    var selector = instance.getProductAttributeByAlias(ca_alias);
        if ('undefined' != typeof(selector)) {
            var selected_av = recipe.selectedProductAttributeValues[selector.productAttributeId];
            if ('undefined' != typeof(selected_av)) {
                vendorId = selected_av.valueConfig.vendorId;
            };
        }
        return vendorId;
    },

    has_etching_choice: function() {
        var instance = this;
        return instance.hasAttributeWithAlias( instance.ETCH_OR_LOGO_ALIAS );
    },

    is_logo_etching: function() {
        var instance = this;
        // test for having text or logo vs just text
        if (instance.has_etching_choice()) {
            if (instance.getProductAttributeValueNameByAlias(instance.ETCH_OR_LOGO_ALIAS) == 'Logo Etching') {
                return true;
            }
        }
        return false;
    },

    personalizationIsComplete: function() {
        var instance = this;
        // must have checked box
        if (instance.AV_ID_NO == instance.getProductAttributeValueIdByAlias(instance.ACCEPT_TERMS_ALIAS)) {
            instance.etchingActive = false;
            return false;
        }
        var etching_text_alias = instance.productTypeCustomization[instance.productType].etching_text_alias;
        //Only evaluate if we have to choose between etching and MLB
        if (instance.has_etching_choice()) {
            //If logo etching is selected, there must be a value by default
            if (instance.is_logo_etching()) {
                return true;
            } else {
                return (instance.getProductAttributeValueNameByAlias(etching_text_alias) != '');
            }
        }
        //else we have a personalzation box and it's complete only if they entered text.
        return (instance.getProductAttributeValueNameByAlias(etching_text_alias) != '');
    },

    updatePersonalizationImagesDoneHandler: function(event) {
        var instance = this;
        var html = '';

        // load personalization view
        jQuery.each(event.data.imagesUrl, function(key, value) {
            jQuery('<img src="' + value + '"/>').on('load', function() {
                jQuery('#personalization-images-container img').attr('src', value);
            });
            return false;
        });
    },

    doProductSpecificRecipeChangedHandler: function(alias, label, attr) {
        var instance = this;
        // nothing to do at the moment
    },

    getProductAttributeFacetValueByName: function(alias, name) {
        var instance = this;
        var attr = instance.getProductAttributeByAlias(alias);
        var result = '';
        if (attr) {
            var value = attr.valueOf();
            var selectedValue =
                instance.configureApi.configureApp.recipe.selectedProductAttributeValues[attr.productAttributeId];
            if (value) {
                jQuery.each(value.facets, function(facet_id, facet) {
                    if (facet.getName() == name) {
                        var selected_value_id = selectedValue.facetsConfig[facet_id][0];
                        result = facet.getFacetValue(selected_value_id).getName();
                    }
                });
            }
        }
        return result;
    },

    logAllValuesAndFacets: function() {
        var instance = this;
        jQuery.each(instance.productAttributes[instance.productId]['aliases'], function(k, v) {
            var ca = instance.getProductAttributeByAlias(k);
            if (ca) {
                var value = ca.valueOf();
                if (value) {
                    jQuery.each(value.facets, function(facet_id, facet) {
                        console.log("ATTR: " + ca.getName() + " FACET: " + facet.getName());
                    });
                }
            }
        });

    },


    // When "Add to Cart" is clicked, this method will be called (as specified above),
    // AFTER the Recipe is saved and related images are generated.
    addedToCartHandler: function(event) {
        var instance = this;
        var recipeId = event.data.recipeId;
        var retrieveRecipeUrl = this.configureApi.configureApp.settings.customerConfiguration.configureServers.getRecipe.url;
        var baseUrl = this.baseUrl + '/' + this.environment + '/' + this.workflow;

        $fluidJquery.ajax({
            type: "POST",
            url: retrieveRecipeUrl,
            dataType: "jsonp",
            data: {
                licenseeKey: 'OakleyKey',
                recipeId: recipeId,
                format: 'verboseJson',
                baseUrl: baseUrl
            },
            success: function(e) {
                if (e.success) {
                    // make sure the returned recipe is an object and not a string
                    var recipe = e.verboseJsonRecipe;
                    if (typeof(recipe) == "string") {
                        recipe = $fluidJquery.parseJSON(recipe);
                    }
                    // don't call static callback unless it's actually
                    // defined to avoid throwing an error
                    if ('function' == typeof(oakley_product_added_to_cart)) {
                        //oakley_product_added_to_cart( event.data, recipe );
                        instance.buildBillOfReceipt(event.data, recipe);
                    }

                }
            }
        });
    },

    findAVById: function(ca, avId) {
        var instance = this;
        return instance.configureApi.configureApp.product.productAttributeValues[avId];
        //  var av = null;
        //  var retVal;
        //  if ( ca.productAttributeValues )
        //  {
        //      $.each(ca.productAttributeValues, function(i, av)
        //      {
        //          if ( av.productAttributeValueId == avId )
        //              retVal = av;
        //      })
        //  }
        //  return retVal;
    },

    filterRegionAttributes: function(attributes) {
    var instance = this;
    //Only filter out attributes for the JP region
    //All other regions get all the values
    if(instance.region == 'JP') {
        //Counting backwards so we can preserve the index
        for(var i = attributes.length; i--;) {
        var remove = false;
        switch(attributes[i].alias) {
        case 'ocp_etch_sp_logo':
            //always remove the mlb etching regardless of the whitelist rules
            remove = true;
            break;
        case 'ocp_lens_ref_2':
        case 'ocp_etching_text_2':
        case 'ocp_etching_font_2':
            //Remove these attributes if not allowed in Japan (a product level facet)
            if(!instance.allowedInJapan) { remove = true };
            break;
        }
        //if we tagged it for removal, then splice it
        if(remove) {
            attributes.splice(i, 1)
        };
        }
    }
    return attributes;
    },

    //data: response from get recipe
    //recipe: the actual recipe
    buildBillOfReceipt: function(data, recipe) {
    var instance = this;
    var product_fi18n = Fi18n["configure_" + instance.productId][instance.locale];
    var price = this.configureApi.getPrice();
    var receipt = {};
    receipt.price = price.product.price;
    receipt.quantity = data.quantities.product;
    receipt.currency = instance.currency;
    receipt.vendorId = recipe.vendorId;
    receipt.attributes = instance.filterRegionAttributes(recipe.attributes);
    //for each included attribute
    $.each(receipt.attributes, function(attribute_index, attribute) {
        var ca = instance.getProductAttributeByAlias(attribute.alias);
        if (ca) {
        var ca_name = instance.getAttributeLabel(ca);
        attribute.name = ca_name;
        attribute.options = [];
        var av_id = attribute.value.id;
        raw_av_id = av_id.replace(/\D/g, '');
        attribute["value"].name = product_fi18n['AttributeValue_name_' + raw_av_id];
        attribute["value"].description = product_fi18n['AttributeValue_description_' + raw_av_id];
        var attribute_value = instance.findAVById(ca, av_id);
        if (attribute_value) {
            $.each(attribute_value.facetsConfig, function(facet_id, fvArray) {
            var facet_name = product_fi18n['Facet_name_' + facet_id.replace(/\D/g, '')];
            $.each(fvArray, function(i, fv_id) {
                var fv_name = product_fi18n['FacetValue_name_' + fv_id.replace(/\D/g, '')];
                option = {};
                option[facet_name] = fv_name;
                attribute.options.push(option);
            });
            });
            attribute.pricing = attribute_value.valueConfig.upcharge;
        }
        }
    });
    receipt.recipe = recipe;
    oakley_product_added_to_cart(data, receipt);
    },

    addHtml: function(container) {
    var buttonClasses = 'configure-oakley-custom-button custom-share-button kineticClickableChild'
        container.attr('style', 'height:825px; min-height: 825px;background:#fff;');
        container.addClass('product-' + this.productId);
        container.html(
            '<div class="custom-share-controls">' +
            '  <span class="' + buttonClasses + ' share-facebook-icon" role="button" aria-disabled="false">&nbsp;</span>' +
            '  <span class="' + buttonClasses + ' share-twitter-icon" role="button" aria-disabled="false">&nbsp;</span>' +
            '  <span class="' + buttonClasses + ' share-pinterest-icon" role="button" aria-disabled="false">&nbsp;</span>' +
            '  <span class="' + buttonClasses + ' share-email-icon" role="button" aria-disabled="false">&nbsp;</span>' +
            '</div>' +
            '<div id="continueToPersonalizationMainContainer" style="visibility:hidden;">' +
            '<div class="configure-custom-continueToPersonalization">' +
            '<div class="kineticClickableChild configure-custom-continueToPersonalization-button configure-oakley-custom-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" ' +
            'role="button" aria-disabled="false" ><span class="ui-button-text">Continue</span></div></div>' +
            '</div>' +
            '<div class="messaging-area"></div>' +
            '<div class="options-list">' +
            '  <h2 class="product-title"></h2>' +
            '  <ul>' +
            '  </ul>' +
            '</div>');
        //container.after(
        //  '<div class="clearfix"></div>' +
        //  '<div><a class="return-link" href="index.html">Back to products</a></div>' +
        //  '<div class="clear"></div>');
        jQuery('body').append(
            '<div id="oakley-configure-custom-zoom-container" style="display:none;"></div>' +
            '<div id="oakley-configure-custom-personalization-container" style="display:none;"></div>' +
            '<div id="oakley-configure-terms-and-conditions-container" style="display: none;">' +
            '<div class="configure-tooltip-template top-level-tooltip">' +
            '<span class="tooltip-titlebar">Oakley Custom Program Policy' +
            '<button id="oakley-terms-custom-tooltip-close" ' +
            ' class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close ui-state-hover ui-state-active">' +
            '<span class="ui-button-icon-primary ui-icon ui-icon-closethick">' +
            '</span><span class="ui-button-text">close</span></button>' +
            '</span>' +
            '<div class="main-tooltip">' +
            '<p class="valueDescription">' +
            'Oakley custom products are offered for personal use only, ' +
            'and are not to be used for any commercial gain. Oakley reserves the ' +
            'right to refuse any orders that contain wording or symbols Oakley believes ' +
            'in its sole discretion to be inappropriate, infringing of other\'s rights or ' +
            'disparaging to the Oakley brand in any way. By ordering a custom Oakley product, ' +
            'the consumer agrees to take full responsibility and to indemnify Oakley for any ' +
            'claims made by a third party that any part of the personalization created by the ' +
            'customer infringes the rights of or otherwise damages the third party.</p></div></div>'+
            '<style type="text/css">'+
            "#configureContainer-loader { margin:0 auto; width:132px; }\n" +
            ".configure-loader { background-image:url(" +
            this.baseUrl + '/prod/' + this.workflow + '/customers/c' + this.customerId +
            '/configureHtml/css/images/OCP-Loader.gif) !important; background-position: 0 0 !important; '+
            "width:132px !important; height:66px !important; }\n" +
            ".configure-initial-loader-percentage-number, .configure-initial-loader-percentage {" +
            " text-align:center; color:#222; }\n" +
            ".configure-initial-loader-percentage-number { padding-left:54px; }\n"+
            '</style>');
    },


    showOverlay: function(zindex) {
        if ('undefined' === typeof(zindex)) {
            zindex = 16000;
        }


        jQuery('body').append('<div class="modalOverlay ui-widget-overlay"' + ' style="position: fixed; width: 100%; height: 100%; z-index: ' + zindex + ';"' + '></div>');
    },

    hideOverlay: function() {
        jQuery('.modalOverlay').remove();
    },

    showSmallOverlay: function(zindex) {
        var instance = this;
        if ('undefined' === typeof(zindex)) {
            zindex = 17000;
        }
        var offset = instance.configureContainer.offset();
        var posY = offset.top;
        var posX = offset.left;
        var width = instance.configureContainer.outerWidth();
        var height = instance.configureContainer.outerHeight();

        jQuery('body').append('<div class="modalOverlay ui-widget-overlay"' + ' style="position: absolute; ' + 'top: ' + posY + 'px; left: ' + posX + 'px; ' + 'width: ' + width + 'px; height: ' + height + 'px; z-index: ' + zindex + ';"' + '></div>');
    },

    hideSmallOverlay: function() {
        jQuery('.modalOverlay').remove();
    },

    deferCall: function( fn ) {
        setTimeout( fn, 10 );
    }

};

jQuery.fn.center = function(zindex) {
    if ('undefined' === typeof(zindex)) {
        zindex = 17000;
    }

    this.css('position', 'fixed');
    this.css('top', '50%');
    this.css('left', '50%');
    this.css('margin-top', -(this.outerHeight() / 2) + 'px');
    this.css('margin-left', -(this.outerWidth() / 2) + 'px');
    this.css('z-index', zindex);

    return this;
};

jQuery.fn.fillViewport = function(zindex) {
    if ('undefined' === typeof(zindex)) {
        zindex = 17000;
    }

    this.css('position', 'fixed');
    this.css('top', '0px');
    this.css('left', '0px');
    this.css('width', '100%');
    this.css('hight', '100%');
    this.css('z-index', zindex);

    return this;
};


function loadStartingPoints(_data) {
    if( OakleyConfigure.urlParameters['debug'] ) {
        console.log( '... file loaded.  Recipe is: ' + _data.startingPoints.recipeGroups[0].recipes[0].jsonRecipe );
        console.log( _data.startingPoints );
    }

    // get the first recipe in the default group if there is one, otherwise
    // fallback to the first recipe in the first group
    var recipe = {};
    jQuery(_data.startingPoints.recipeGroups).each( function( i, recipeGroup ) {
        if( recipeGroup.name.indexOf('efault') !== -1 && recipeGroup.recipes.length ) {
            recipe = recipeGroup.recipes[0].jsonRecipe;
            return false;
        }
    });

    // If the region is now the US, update the starting point with the correct region
    if ( OakleyConfigure.region !== 'US' ) {
        var av_id = OakleyConfigure.getAttributeValueKeyByName('Region - ' + OakleyConfigure.region),
            ca_id = OakleyConfigure.getProductAttributeByAlias('region').productAttributeId,
            region_obj = {};

        region_obj[ca_id] = av_id;

        recipe = $.extend({}, recipe, region_obj);
    }

    OakleyConfigure.configureHtml.getConfigureApi().loadRecipe( recipe );
    OakleyConfigure.setRegion( OakleyConfigure.region );
}

function Fi18n_configure_EN_jsonp_callback() {
    conf = null;
    if ("undefined" != typeof(Fi18n.configure.EN)) {
        conf = Fi18n.configure.EN;
    }
    if ("undefined" != typeof(Fi18n.configure.en_us)) {
        conf = Fi18n.configure.en_us;
    }
}

// come versions of the PMR define this callback with alternate case for the language code
function Fi18n_configure_en_us_jsonp_callback() {
    Fi18n_configure_EN_jsonp_callback()
}

function oakley_product_added_to_cart(data, recipe) {
    console.log(data);
}

function lookupRealtimeAvailability(vendorId, region) {
    var webserviceUrl = 'http://hyb-qa-www.oakley.com/fluid/availability/'
    if(OakleyConfigure.workflow == 'prod') {
    webserviceUrl = 'http://hyb-origin-www.oakley.com/fluid/availability/'
    }
    webserviceUrl = webserviceUrl +  vendorId + '/region/' + region;
    $.ajax({
        type: 'get',
        dataType: "jsonp",
            contentType: "application/javascript",
        url: webserviceUrl,
            jsonp: "rta_lookup"
    }).error(function(xhr, error, data) {
        //lookupVendorId(OakleyConfigure.vendorId, 'loadConfigureByVendorId');
    });
}

//Oakley JSON P function. This is the padding function returned by their api. With their current version of jquery, the ajax call always errors because of a parseerror, even though the mime type
//is application/javascript and the function passes json lint.
function rta_lookup(data) {
    var product_overrides = {
        'values': {}
    };
    $.each(data.product_data, function(sku_index, sku) {
        product_overrides['values'][sku.sku] = {};
        product_overrides['values'][sku.sku]['valueUsages'] = {};
        product_overrides['values'][sku.sku]['valueUsages'][sku.sku] = {};
        product_overrides['values'][sku.sku]['valueUsages'][sku.sku] = (sku.available ? {
            active: "true"
        } : {
            active: "false"
        }); //{ active: "false"};
        //product_overrides['values'][sku.sku]['valueUsages'][sku.sku] = { active: "false"};
        //return false;
    });
    OakleyConfigure.configParams['productOverrides'] = product_overrides;
    lookupVendorId(OakleyConfigure.vendorId, 'loadConfigureByVendorId');
}


function lookupVendorId(vendorId, callback_name) {
    var baseUrl = OakleyConfigure.baseUrl + '/prod/' + OakleyConfigure.workflow;
    var webserviceUrl = 'https://rt.fluidretail.net/fcs/configureHtml/retrieveProductId.php';
    $.ajax({
        type: 'GET',
        dataType: "jsonp",
        data: $.param({
            customerId: OakleyConfigure.customerId,
            vendorProductId: OakleyConfigure.vendorId,
            baseUrl: baseUrl,
            jsonpCallback: callback_name
        }),
        url: webserviceUrl,
        //success: function() { console.log("derp"); },
        //error: function() { console.log("derpo"); },
    });
}

//Handler function. For some reason, I cannot jquery to suppress the jsonp callback, thus we must pass the name of this function to just return the product id
function getVendorId(response) {
    console.log(response);
    return response;
}

//Handler function. For some reason, I cannot jquery to suppress the jsonp callback, thus we must pass the name of this function
function loadConfigureByVendorId(response) {
    console.log(response);
    OakleyConfigure.productId = response.productId;
    OakleyConfigure.configParams.productId = response.productId;
    OakleyConfigure.configParams.baseUrl = OakleyConfigure.baseUrl + '/' + OakleyConfigure.environment + '/' + OakleyConfigure.workflow;
    OakleyConfigure.instantiateConfigure();
    console.log(OakleyConfigure.configParams);
}
