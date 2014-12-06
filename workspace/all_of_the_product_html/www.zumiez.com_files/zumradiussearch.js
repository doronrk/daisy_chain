// Shim for indexOf in IE < 9
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}


var ZumPDPRadiusSearch = {
    _searchUrl: '',
    _addressSearchUrl: '',

    _filterStores: [],
    _contentWin: null,

    _configurableChildId: null,

    _tplRadiusSearch: null,

    _addButtons: [],

    init: function(searchUrl, addressSearchUrl) {
        this._searchUrl = searchUrl;
        this._addressSearchUrl = addressSearchUrl;

        if ($('radiussearch-store-results') !== null) {
            this._tplRadiusSearch = Handlebars.compile($('radiussearch-store-results').innerHTML);
        }

        this.initAddButtons();

        document.observe('radiusSearch:storeChanged', function(ev) {
            var storeInfo = ev.memo;
            this._filterStores = [];
            storeInfo.filter.each(function(store) {
                this._filterStores.push(store.storeId);
            }.bind(this));
            this._filterStores = this._filterStores.join(',');
        }.bind(this));


        document.observe('scp:simpleChanged', function(ev) {
            this._configurableChildId = ev.memo.productId;

            if (this._configurableChildId === null && typeof spConfig.childProducts[this._configurableChildId] != 'undefined') {
                $('radiussearch-store-container').update('');
            } else {
                this._sendAjaxRequest(this._searchUrl, {
                    productId: this._configurableChildId,
                    stores: this._filterStores
                });

                var childProduct = spConfig.config.childProducts[this._configurableChildId];
                this._addButtons.each(function(el) {
                    el.disabled = !childProduct.saleable;
                });
            }
        }.bind(this));

        $$('#radiussearch-search-minimodal form').each(function (el) {
            el.observe('submit', function(ev) {
                ev.preventDefault();
                this._contentWin.close();

                if (this._configurableChildId === null) {
                    $('radiussearch-store-container').update('');
                } else {
                    this._sendAjaxRequest(this._addressSearchUrl, {
                        productId: this._configurableChildId,
                        address: $('storelocator:address').getValue(),
                        radius: $('storelocator:radius').getValue()
                    });
                }
            }.bind(this));
        }.bind(this));

        document.on('click', 'a#radiussearch-other-stores', function(ev) {
            ev.preventDefault();

            this._contentWin = new Window({
                className: 'zumiez',
                recenterAuto: false,
                maximizable: false,
                minimizable: false,
                resizable: false,
                hideEffect: Element.hide,
                showEffect: Element.show,
                minWidth: 420,
                height: 120,
                zIndex: 9000,
                destroyOnClose: true
            });

            this._contentWin.setContent('radiussearch-search-minimodal');
            this._contentWin.setZIndex(20);
            this._contentWin.setCloseCallback(function() {
                $('radiussearch-search-minimodal').hide();
                return true;
            });
            this._contentWin.showCenter(true);

            setTimeout(function() {
                $$('.chosen-select').each(function(el) {
                    if (typeof el.chosenObj == 'undefined') {
                        el.chosenObj = new Chosen(el, {disable_search:true});
                    }
                });
            }, 10);

        }.bind(this));

    },

    initAddButtons: function() {
        ['zumiez-add-to-bag', 'zumiez-quick-add-to-bag'].each(function (selector) {
            var el = $(selector);
            if (el !== null) {
                this._addButtons.push(el);
                el.disabled = true;
            }
        }.bind(this));
    },

    _sendAjaxRequest: function (searchUrl, getParams) {
        // No radiussearch container on category page.
        if (this._tplRadiusSearch !== null) {
            $('radiussearch-store-container').update('<p>Loading...</p>');

            new Ajax.Request(searchUrl, {
                method: 'get',
                parameters: getParams,
                evalJSON: 'force',
                onSuccess: function(response) {
                    this._updateRadiusSearchBlock(response.responseJSON);
                    this._updateQtySelect(response.responseJSON);
                }.bind(this)
            });
        }

    },

    _updateRadiusSearchBlock: function(responseJson) {
        // Template will be null on the category page where this functionality
        // is only used for quickshop.
        if (this._tplRadiusSearch !== null) {
            html = this._tplRadiusSearch(responseJson);
            $('radiussearch-store-container').update(html);

            // Select the fitst store which has the product in stock by default.
            var firstAvailStoreEl = $$("#radiussearch-store-container input[name='locator_id']:enabled").first();
            if (typeof firstAvailStoreEl != 'undefined') {
                firstAvailStoreEl.checked = 1;
            }
        }
    },

    _updateQtySelect: function(responseJson) {
        var maxQty = responseJson.maxQty;

        var qtySelect = $$('select#qty').first();

        // Save the previously selected quantity so that we can select it again afterwards.
        var previousQty = qtySelect.options[qtySelect.selectedIndex].value;

        // Remove the existing options before we re-populate.
        while (qtySelect.options.length > 0){
            qtySelect.remove(0);
        }

        if (maxQty >= 1) {

            for(var i = 1; i <= maxQty; i++) {
                qtySelect.add(new Option(i, i));
            };

            if (previousQty) {
                qtySelect.setValue(previousQty);
            }

						qtySelect.disabled = false;
        } else {
            qtySelect.add(new Option(0, 0));

            qtySelect.disabled = true;
        }

        // Notify the chosenified version of changes
        Event.fire('qty', 'chosen:updated');

    }
};


var ZumCategoryRadiusSearch = {

    _storeZip: '',
    _radius: '',
    _productId: '',
    _catalogPackageType: '',
    _categoryUrl: '',
    _initialJoiner: '',
    _modalBaseUrl: '',
    _contentWin: null,
    _instoreVal: 'instore',

    init: function(categoryUrl, initialJoiner, modalUrl, productId, catalogPackageType) {
        this._categoryUrl = categoryUrl;
        this._initialJoiner = initialJoiner;
        this._modalBaseUrl = modalUrl;
        this._productId = productId;
        this._catalogPackageType = catalogPackageType;

        if ($('radiussearch-store-change') !== null) {
            $('radiussearch-store-change').observe('click', function (ev) {
                ev.preventDefault();
                this._openSearchModal(this._storeZip, this._radius, this._productId);
            }.bind(this));
        }

        document.observe('radiusSearch:storeChanged', function(ev) {
            cookieData = ev.memo;

            var vStoreTemplate = '#{title}<br>';
            var vStoreNames = '';
            var aStoreIds = [];
            var vStoreIds = '';
            var catalogPackageType = this._catalogPackageType;
            cookieData['filter'].each(function(store) {             // TODO: Need to check if the store is snow store; if the product is snow / DYOC
                if(catalogPackageType != '') {
                    if(aStoreIds.length == 0) {
                        if((catalogPackageType == 'snow' && store.snowLab == 1) || catalogPackageType != 'snow') {
                            store.title = store.title.split('+').join(' ');
                            vStoreNames += vStoreTemplate.interpolate(store);
                            aStoreIds.push(store.storeId);
                            throw $break;
                        }
                    }
                } else {
                    store.title = store.title.split('+').join(' ');
                    vStoreNames += vStoreTemplate.interpolate(store);
                    aStoreIds.push(store.storeId);
                }
            });

            $$('.list-stock .selected-stores').invoke('update', vStoreNames);
            $$('input[name="radiussearch_selected_stores"]').each(function(el) {
                el.setValue(aStoreIds.join(','));
            });

            // If there are no filter stores selected, disable the "In Store" option.
            if ($('radiussearch:instore') !== null) {
                $('radiussearch:instore').writeAttribute('disabled', aStoreIds.length == 0);
            }

            var elsChecked = 0;
            //$$('.radiussearch-multiselect').each(function(el) {
            //    var cbStoreId = el.readAttribute('data-storeId');
            //    el.checked = (aStoreIds.indexOf(cbStoreId) != -1);
            //    elsChecked++;
            //});
            //
            $$('.radiussearch-radio').each(function(el) {
                var cbStoreId = el.readAttribute('data-storeId');
                el.checked = (aStoreIds.indexOf(cbStoreId) != -1);
                if(el.checked) {
                    elsChecked++;
                    throw $break;
                }
            });
                if ($('radiussearch-multiselect-button') != undefined) {
                    if (elsChecked == 0) { // if none selected "disable" submit button
                        $('radiussearch-multiselect-button').addClassName('disabled').disable();
                    } else {
                        $('radiussearch-multiselect-button').removeClassName('disabled').enable();
                    }
                }
            this._storeZip = cookieData['zip'];
            this._radius = cookieData['radius'];
        }.bind(this));


        document.on('click', '#radiussearch-multiselect-button', function() {
            if(typeof this._productId == "undefined" || this._productId == "") {
                selectedStores = [];
                $$('.radiussearch-multiselect').each(function(el) {
                    if (el.checked) {
                        selectedStores.push(el.readAttribute('data-storeId'));
                    }
                });
            } else {
                var radio = $$('.radiussearch-radio:checked').first();
                if (typeof radio != "undefined") {
                    selectedStores = [];
                    //TODO: Get selected radiobutton. NEED TO SWITCH MULTI-SELECT AND RADIO.
                    $$('.radiussearch-radio').each(function(el) {
                        if (el.checked) {
                            selectedStores.push(el.readAttribute('data-storeId'));
                        }
                    });
                } else {
                    alert("Please select a store.");
                }
            }
            if (selectedStores.length > 0) { // need at least one selection
                this._submitRadiusSearch('instore', selectedStores.join(','));
            }
        }.bind(this));

        // On page load check the checkbox if needed and add interaction.
        document.observe('dom:loaded', function() {
            var vars = window.location.href.parseQuery();
            var toggleBox = $('radiussearch:instore');
            var isInstore = typeof(vars.instock) != 'undefined';
            if (toggleBox !== null) {
                toggleBox.writeAttribute('checked', isInstore);
                toggleBox.observe('change', function () {
                    this._submitRadiusSearch(!isInstore, $$('input[name="radiussearch_selected_stores"]').first().getValue());
                }.bind(this));
            }
        }.bind(this));
    },

    _onModalSubmit: function(ev) {
        ev.preventDefault();
        var address = ev.target.elements.address.value;
        var radius = ev.target.elements.radius.value;

        this._openSearchModal(address, radius, this._productId);        // this._productId is used on the modal for DYOC package. When clicking on 'View Stores', productId is provided.
    },

    _openSearchModal: function(storeZip, radius, productId) {           // productId is used for DYOC package(product)
        $('radiussearch-store-modal-content').update('<p>Loading...</p>');

        if (this._contentWin === null) {
            this._contentWin = new Window({
                className: 'zumiez',
                recenterAuto: false,
                maximizable: false,
                minimizable: false,
                resizable: false,
                hideEffect: Element.hide,
                showEffect: Element.show,
                minWidth: 940,
                minHeight: 460,
                destroyOnClose: true
            });

            this._contentWin.setContent('radiussearch-store-modal');
            this._contentWin.setCloseCallback(function() {
                $('radiussearch-store-modal').hide();
                this._contentWin = null;
                return true;
            }.bind(this));
            this._contentWin.setZIndex(20);
            this._contentWin.showCenter(true);
        }

        var modalUrl = this._modalBaseUrl;
        if (storeZip != null) {
            if(productId === null
                || typeof productId == "undefined"
                || productId == ''
                ){
                modalUrl += "search?address="+encodeURIComponent(storeZip)+'&radius='+encodeURIComponent(radius);
            }else{
                modalUrl += "search?address="+encodeURIComponent(storeZip)+'&radius='+encodeURIComponent(radius) + '&product_id=' + encodeURIComponent(productId);
            }
        }

        new Ajax.Updater($('radiussearch-store-modal-content'), modalUrl, {
            onComplete: function() {
                Event.fire(document, 'radiussearch:hasCookie');
                $$('.chosen-select').each(function(el) {
                    if (typeof el.chosenObj === 'undefined') {
                        el.chosenObj = new Chosen(el, {disable_search:true});
                    }
                });

                $$('#radiussearch-store-modal-content form').each(function(el) {
                    el.observe('submit', this._onModalSubmit.bind(this));
                }.bind(this));

                document.on('click', 'input.radiussearch-multiselect', function() {
                    allow = false;
                    $$('input.radiussearch-multiselect').each(function(el) {
                        if(el.checked) { // see if any are checked
                            allow = true;
                        }
                    })
                    if(allow === false) { // if none selected "disable" submit button
                        $('radiussearch-multiselect-button').addClassName('disabled').disable();
                    } else {
                        $('radiussearch-multiselect-button').removeClassName('disabled').enable();
                    }
                });

            }.bind(this),
            evalScripts: true
        });

    },

    _submitRadiusSearch: function(includeStores, selectedStores) {
        var redirectUrl = this._categoryUrl;
        if (includeStores) {
            redirectUrl += this._initialJoiner + 'instock=' + this._instoreVal + '&storeids='+ encodeURIComponent(selectedStores);
        }
        window.location.href = redirectUrl;
    }
}



