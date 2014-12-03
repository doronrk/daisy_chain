var ConfigurableOptionSelector = {
    _selectorContainerTemplate: '<ul id="configurable-selector-#{attributeId}" class="select-grid" data-attribute-id="#{attributeId}"></ul>',
    _optionTemplate: '<li><a href="#" class="#{selected} #{disabled} #{offline} select-grid-value" title="#{titleText}" data-attribute-id="#{attributeId}" data-value="#{optionValue}">#{optionLabel}</a></li>',
    _selectedOptionTemplate: "<span class=\"selected-option\">#{text}</span>",

    init: function() {

        document.observe('scp:optionsChanged', function(ev) {
            var selectEl = $('attribute'+ev.memo.attributeId);
            this._generateOptionsSelector(selectEl);
        }.bind(this));

        document.observe('scp:optionsReloaded', function(ev) {
            var selectEl = ev.memo.element;

            // For some reason this event is fired with the qty select on
            // page load.  Bail if that's the case because there's nothing
            // we can do with qty.
            if (!selectEl.hasClassName('super-attribute-select')) {
                return;
            }

            this._generateOptionsSelector(selectEl);
        }.bind(this));

        document.observe('scp:simpleChanged', function(ev) {
            var productId = ev.memo.productId;
            if (!spConfig.config.childProducts[productId].saleable) {
                $$('.radiussearch-out-of-stock').invoke('show');
            } else {
                $$('.radiussearch-out-of-stock').invoke('hide');
            }
        }.bind(this));

        document.on('click', 'a.select-grid-value', function(ev) {
            ev.preventDefault();

            var optionEl = ev.target;

            // Don't change selection if disabled class is set.
            if (!optionEl.hasClassName('disabled')) {

                // Clear selected class from other list items and set on this one.
                optionEl.up('ul').getElementsBySelector('li a').invoke('removeClassName', 'selected');
                optionEl.addClassName('selected');

                var attributeId = optionEl.readAttribute('data-attribute-id');
                var value = optionEl.readAttribute('data-value');

                var selectEl = $('attribute'+attributeId);
                if (selectEl) {
                    var selectContainerEl = this._getContainerElement(selectEl);
                    var labelEl = this._getLabelElement(selectContainerEl);

                    this._selectOption(selectEl, value, labelEl);
                }
            }
            // remove validation error if exists
            if($('advice-required-entry-attribute491') != undefined) {
                $('advice-required-entry-attribute491').remove();
            }
        }.bind(this));
    },

    _selectOption: function(selectEl, value, labelEl) {
        selectEl.value = value;

        // Delay until at least after the current event handler finishes.
        setTimeout(function() {
            // Let the core JS know things have changed for image switching,
            // enabling other selects, etc.
            spConfig.configureElement(selectEl);
        }, 10);

        var valueText = null;
        var sizeLabels = {
            'S' : 'Small',
            'M': 'Medium',
            'L': 'Large',
            'XL' : 'Extra Large',
            'XXL' : 'Extra Extra Large'
        };
        for (var i = 0; i < selectEl.options.length; i++) {
            if (selectEl.options[i].value == value) {
                valueText = selectEl.options[i].text;
                if (sizeLabels[valueText]){
                    valueText = sizeLabels[valueText];
                } else {
                    valueText = selectEl.options[i].text;
                }
            }
        }

        // Put the selected option's label into a span next to the attribute name.
        labelEl.getElementsBySelector('span.selected-option').invoke('remove');
        if (valueText != null) {
            var selectedOptionText = this._selectedOptionTemplate.interpolate($H({text: valueText}));
            labelEl.insert({bottom: selectedOptionText});
        }
    },

    // Returns the dd element containing the option select box.
    _getContainerElement: function(selectEl) {
        return selectContainerEl = selectEl.up('dd');
    },

    // Returns the dt containing the label for a select given it's container.
    _getLabelElement: function(containerEl) {
        return selectContainerEl.previous('dt');
    },


    // Generates the "swatch" options.
    _generateOptionsSelector: function(selectEl) {

        // Bail if spConfig is not defined.  This can happen on QuickShop.  Not sure why.
        if (typeof spConfig == 'undefined') {
            return;
        }

        // Determine how many options there are aside from the placeholder (if it exists).
        var usableOptions = 0;
        var lastValueIdx = null;
        var i;
        for (i = 0; i < selectEl.options.length; i++) {
            if (selectEl.options[i].value != '') {
                usableOptions++;
                lastValueIdx = i;
            }
        }

        var selectContainerEl = this._getContainerElement(selectEl);
        var labelEl = this._getLabelElement(selectContainerEl);

        // Hide the native select.
        selectEl.setStyle({position: 'absolute', left: '-9999px'});

        // If there's only one option. select it and don't display the swatches.
        if (usableOptions == 1) {
            this._selectOption(selectEl, selectEl.options[lastValueIdx].value, labelEl);
            labelEl.addClassName('single-option');
            selectContainerEl.addClassName('single-option');
        } else {
            // Multiple options, display swatches.
            selectContainerEl.removeClassName('single-option');
            labelEl.removeClassName('single-option');

            var attributeId = selectEl.id.replace(/[a-z]*/, '');
            var optionContainerEl = $('configurable-selector-'+attributeId);
            if (optionContainerEl == null) {
                selectContainerEl.insert({bottom: this._selectorContainerTemplate.interpolate($H({attributeId: attributeId}))});
                optionContainerEl = $('configurable-selector-'+attributeId);
            }

            if (selectEl.value == '') {
                this._setDefaultFromCookie(attributeId, selectEl);
            }

            optionContainerEl.getElementsBySelector('li').invoke('remove');

            var numOutOfStock = 0;

            for (i = 0; i < selectEl.options.length; i++) {
                var option = selectEl.options[i];

                saleable = true;
                var selectedAttributeOptions = spConfig.state;
                selectedAttributeOptions[attributeId] = option.value;
                var productId = this._getMatchingProduct(selectedAttributeOptions);
                if (productId !== false) {
                    if (!spConfig.config.childProducts[productId].saleable) {
                        saleable = false;
                        numOutOfStock++;
                    }
                }

                this._createOptionSwatch(attributeId, optionContainerEl, option, selectEl.disabled, selectEl.value, saleable);
            }

            // If all of the sizes are out of stock, display the out of stock
            // message before a size is selected.
            if (numOutOfStock == selectEl.options.length-1) {
                $$('.radiussearch-out-of-stock').invoke('show');
            }

            if (selectEl.value == '') {
                labelEl.getElementsBySelector('span.selected-option').invoke('remove');
                var selectedOptionText = this._selectedOptionTemplate.interpolate($H({text: ("Select a "+spConfig.config.attributes[attributeId].label).toUpperCase()}));
                labelEl.insert({bottom: selectedOptionText});
            }

            // Ensure all of the selectors are the same width.  Find the widest
            // (minimum 36px), then set them all to be the same.
            var maxWidth = 34;
            optionContainerEl.getElementsBySelector('li a').each(function(el) {
                maxWidth = Math.max(maxWidth, el.measure('width'));
            });
            optionContainerEl.getElementsBySelector('li').invoke('setStyle', {width: maxWidth+"px"});
            Event.fire(document, 'scp:swatchesRendered', {attributeId: attributeId, selectEl: selectEl, optionContainerEl: optionContainerEl});
        }
    },

    _createOptionSwatch: function(attributeId, optionContainerEl, option, bDisabled, selectedValue, saleable) {
        if (option.value != '') {
            if (saleable) {
                var offline = '';
                var titleText = 'Available online and in store';
            } else {
                offline = 'offline';
                titleText = 'Available in store only';
            }

            var selected = option.value == selectedValue ? 'selected' : '';
            var disabled = bDisabled ? 'disabled' : '';

            var optionEl = this._optionTemplate.interpolate($H({
                selected: selected,
                disabled: disabled,
                offline: offline,
                titleText: titleText,
                optionValue: option.value,
                optionLabel: option.text,
                attributeId: attributeId
            }));
            optionContainerEl.insert({bottom: optionEl});
        }
    },

    _setDefaultFromCookie: function(attributeId, selectEl) {
        var cookieText = Mage.Cookies.get('configurable-attributes');
        if (cookieText !== null) {
            cookie = cookieText.evalJSON();
            if (typeof cookie[attributeId] != 'undefined') {
                for (var i = 0; i < selectEl.options.length; i++) {
                    if (selectEl.options[i].value == cookie[attributeId]) {
                        selectEl.selectedIndex = i;
                        return;
                    }
                }
            }
        }
    },

    _getMatchingProduct: function(attributeValues) {
        var candidateProducts = [];

        Object.keys(attributeValues).each(function (attributeId) {
            if (isNaN(parseInt(attributeId))) {
                // Bail on prototype klass artifacts like _object
                return;
            }

            var selectedOptionId = attributeValues[attributeId];
            spConfig.config.attributes[attributeId].options.each(function (option) {
                if (option.id == selectedOptionId) {
                    // On the first iteration of this loop, candidateProducts is empty
                    // so all products associated with the first selected option are candidates.
                    if (candidateProducts.length == 0) {
                        candidateProducts = option.products.slice(0);
                    } else {
                        candidateProducts.each(function(candidateId, idx) {
                            // If candidate is not available for this attribute
                            // option, eliminate it from consideration.
                            if (option.products.indexOf(candidateId) == -1) {
                                candidateProducts[idx] = undefined;
                            }
                        });
                    }
                }
            });
        });

        var selectedProductId;
        var numProducts = 0;

        candidateProducts.each(function(productId) {
            if (typeof productId != 'undefined') {
                selectedProductId = productId;
                numProducts++;
            }
        });

        if (numProducts != 1) {
            return false;
        }
        return selectedProductId;

    }
};
ConfigurableOptionSelector.init();


ZumAjaxAddToCartEnabler = Class.create({
    ev: null,
    clickedSubmit: null,

    initialize: function(selector, container) {
        this.selector = selector;
        if (typeof container != 'undefined') {
            this.container = container;
        } else {
            this.container = document;
        }
        this.bindEvents();
    },

    bindEvents: function() {
        Event.on(this.container, 'click', this.selector, this.onSubmit.bind(this));
    },

    onSubmit: function(ev) {
        ev.preventDefault();

        this.ev = ev;
        this.clickedSubmit = ev.element();

        var eventData = {
            allowAjax: true,  // Allow the event to stop the Ajax submit (e.g. because of a validation fail)
            buttonClicked: this.clickedSubmit
        };

        Event.fire(document, 'addToCart:preAjax', eventData);

        if (!eventData.allowAjax){
            ev.preventDefault();
            return false;
        }

        this.clickedSubmit.addClassName('loading');


        this.form = ev.target.up('form');

        // The event target might override the URL to submit the request to.
        // DYOC does this for quickshop for example.
        var overrideSubmitUrl = ev.target.readAttribute('data-submiturl');
        if (overrideSubmitUrl != null) {
            this.form.writeAttribute('action', overrideSubmitUrl);
        }

        document.fire('addToCart:ajaxBegin');

        this.form.request({
            onComplete: function(response) {
                document.fire('addToCart:ajaxFinished');
                this.clickedSubmit.removeClassName('loading');
                try {
                    var aResponse = JSON.parse(response.responseText);
                    if (aResponse.success != 'true') {
                        this.form.submit()
                    } else {
                        document.fire('addToCart:addComplete', aResponse);
                        return false;
                    }
                } catch (e) {
                    this.form.submit()
                }
            }.bind(this)
        });
    }
});


ZumAddToCartExtensions = Class.create({
    _contentWin: null,

    _tplAddSuccess: null,

    initialize: function() {
        // Ajax "Loading" indicator
        document.observe('addToCart:ajaxBegin', this.beginLoading.bind(this));
        document.observe('addToCart:ajaxFinished', this.endLoading.bind(this));

        // Update header on success
        document.observe('addToCart:addComplete', Zumiez.cartItems.init.bind(Zumiez.cartItems));

        // Update show modal momentarily on success
        document.observe('addToCart:addComplete', this.showSuccessDialog.bind(this));

        // Griptape validation before Ajax request is submitted.
        document.observe('addToCart:preAjax', this.gripTapeValidation.bind(this));

        // Standard Magento form validation before Ajax request is submitted.
        document.observe('addToCart:preAjax', this.magentoValidation.bind(this));

        // SOLD 4.0 validation and post data generation before Ajax request is submitted.
        document.observe('addToCart:preAjax', this.sold40ValidationAndFlag.bind(this));

        this._tplAddSuccess = Handlebars.compile($('mini-cart-template').innerHTML);
    },

    beginLoading: function(ev) {
        if (!this._isQuickshopPage()) {
            Zumiez.ajaxLoadOn();
        } else {
            // I don't like mixing Prototype and jQuery, but the colorbox is a
            // jQuery plugin and inaccessible from Prototype.
            $j('#qsBox').fadeOut();
            $j.colorbox.resize({
                height: 280,
                width: 550
            });
            $j('#cboxLoadingGraphic').fadeIn();
        }
    },

    endLoading: function(ev) {
        if (!this._isQuickshopPage()) {
            Zumiez.ajaxLoadOff();
        } else {
            // See note in beginLoading about jQuery and Prototype mixing.
            $j.colorbox.close();
        }
    },

    _isQuickshopPage: function() {
        return ($$('body.catalog-category-view').length > 0) || ($$('body.catalogsearch-result-index').length > 0) || ($$('body.dyoc-index-index').length > 0)
    },

    magentoValidation: function(ev) {
        // If Magento form validation fails, prevent the form submission.
        if (typeof productAddToCartForm != 'undefined') {
            if (!productAddToCartForm.validator.validate()) {
                ev.memo.allowAjax = false;
            }
        }
    },

    sold40ValidationAndFlag: function(ev) {
        var buttonClicked = ev.memo.buttonClicked;
        if (buttonClicked.tagName != "BUTTON") {
            buttonClicked = buttonClicked.up('button');
        }
        if (buttonClicked.id == 'zumiez-add-to-bag-pickup') {
            var selectedStoreEls = $$("input:radio[name='locator_id']:checked");
            if (selectedStoreEls.length == 0) {
                alert("Please select a pick up store.");
                ev.memo.allowAjax = false;
                return;
            }

            $$('input[name="pickup-in-store"]').invoke('setValue', 1);
        }

    },

    gripTapeValidation: function(ev) {
        // check if it needs griptape selection
        var gripTapeSelector = $('gripTapeSelector');
        if (gripTapeSelector != null ) {
            // TODO : make sure validation error goes away
            gripTapeSelector.observe('change', function() {
                $('gripTapeSelectionMsg').hide();
            });
            var selectorValue = gripTapeSelector.options[gripTapeSelector.selectedIndex].value;
            if(selectorValue){
                if((selectorValue) == "-1"){
                    $('gripTapeSelectionMsg').show();
                    ev.memo.allowAjax = false;
                }
            }
        }
    },

    showSuccessDialog: function(ev) {
        html = this._tplAddSuccess(ev.memo);
        $('mini-cart').update(html)

        this._contentWin = new Window({
            className: 'zumiez',
            recenterAuto: true,
            hideEffect: Element.hide,
            showEffect: Element.show,
            minWidth: 420,
            minHeight: 120,
            zIndex: 9000,
            destroyOnClose: true
        });

        this._contentWin.setContent('mini-cart');
        this._contentWin.setZIndex(20);
        this._contentWin.setCloseCallback(function() {
            $('mini-cart').hide();
            return true;
        });
        this._contentWin.showCenter(true);

        if (ev.memo.redirectTo != false) {
            window.location.href = ev.memo.redirectTo;
        } else {
            setTimeout(
                function () {
                    Windows.closeAll();
                }, 3000);  // 3 sec seems awfully fast, but that's what it was.
        }
    }
});
document.observe('dom:loaded', function() {
    var zumAjaxExtensions = new ZumAddToCartExtensions();
});

