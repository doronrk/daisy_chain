var generic = generic || {};
generic.env = generic.env || {};
var brx = brx || {};
brx.productView = brx.productView || {};
brx.productView.EDD = brx.productView.EDD || {};
brx.rb = brx.rb || {};

brx.rb.getRBKeys = function() {
    brx.rb.language = generic.rb('language');
    brx.rb.tempOutOfStock = brx.rb.language.get('temp_out_of_stock');//2
    brx.rb.soldOut = brx.rb.language.get('sold_out'); //7
    brx.rb.soldOutBasicReorder = brx.rb.language.get('sold_out_basic_reorder'); //7
    brx.rb.comingSoon = brx.rb.language.get('coming_soon'); //3
    brx.rb.inactive = brx.rb.language.get('inactive'); //5
    brx.rb.concern = brx.rb.language.get('concern');
    brx.rb.shade = brx.rb.language.get('shade');
    brx.rb.size = brx.rb.language.get('size');
    brx.rb.finish = brx.rb.language.get('finish');
    brx.rb.colourGroup = brx.rb.language.get('colour_group');
    brx.rb.more = brx.rb.language.get('more');
    brx.rb.email_format = "Please enter your email address in the box below."; //brx.rb.language.get('enter_email_address'); 

    //EDD Related RB Keys
    brx.rb.edd_hour_unit = brx.rb.language.get('edd_hour_unit');
    brx.rb.edd_minutes_unit = brx.rb.language.get('edd_minutes_unit');
    brx.rb.edd_days_unit = brx.rb.language.get('edd_days_unit');
    brx.rb.edd_tomorrow_unit = brx.rb.language.get('edd_tomorrow_unit');
}

brx.rb.getRBKeys();

brx.productView.isDramming = false; // setDefault

brx.productView.single = function (args) {
    var productData = args.productData;
    var skuMenuSelectNode;
    var skuMenuFields = [
        { label: brx.rb.concern, field: 'STRENGTH' },
        { label: brx.rb.shade, field: 'SHADENAME' },
        { label: brx.rb.size, field: 'PRODUCT_SIZE' }
        //{ label: brx.rb.soldOut, field: 'INVENTORY_STATUS' }
    ];
    
    // d52133 - isDramming (manually set to test)
    brx.productView.isDramming = args.productData.isDramming;
    //brx.productView.isDramming = true;
    var isDramming = brx.productView.isDramming;
    
    return {
        getDescriptionContainerNode : function() {
            return this.descriptionContainerNode;
        },
        render : function(args) {
            productData.urlDomain = generic.env.domain;
            productData.desc = productData.DESCRIPTION;
            // Origins wants variable height on the (R) and (tm) stuff so this code should accomplish that.
            eval1 = productData.PROD_RGN_NAME.split(" ");
            e1len = eval1.length - 1;
            eval2 = eval1[e1len].split("&");
            eval3 = eval2[0].charAt(eval2[0].length-1);
            // Checks the product title for symbols before template is loaded to prevent flicker. Bug #39802.
            // If better ideas are thought of, please replace.
            regexSearchOne = productData.PROD_RGN_NAME.search(/&#174;|&reg;/);
            regexSearchTwo = eval3.search(/l|d|b|t|f/);
            if (regexSearchOne == -1) {
                if (regexSearchTwo == -1) {
                    productData.title = productData.PROD_RGN_NAME.replace(/(&#8482;|&#153;|&trade;)/,"<sup class='spp-header-tm-lower'>$1</sup>");
                } else {
                    productData.title = productData.PROD_RGN_NAME.replace(/(&#8482;|&#153;|&trade;)/,"<sup class='spp-header-tm-higher'>$1</sup>");
                }
            } else {
                if (regexSearchTwo == -1) {
                    productData.title = productData.PROD_RGN_NAME.replace(/(&#174;|&reg;)/,"<sup class='spp-header-reg-lower'>$1</sup>");
                } else {
                    productData.title = productData.PROD_RGN_NAME.replace(/(&#174;|&reg;)/,"<sup class='spp-header-reg-higher'>$1</sup>");
                }
            }
            var self = this;
            if (Object.isElement(args.imageContainerNode)) {
                generic.templatefactory.get({path: '/templates/products/single-view-image.tmpl'}).evaluateCallback({
                    object: productData,
                    callback: function(html) {
                        args.imageContainerNode.update(html);
                    }
                });
            }
            if (Object.isElement(args.descriptionContainerNode)) {
                this.descriptionContainerNode = args.descriptionContainerNode;
                generic.templatefactory.get({path: '/templates/products/single-view-description.tmpl'}).evaluateCallback({
                    object: productData,
                    callback: function(html) {
                        args.descriptionContainerNode.update(html);
                        // create a SKU menu if this prod has multiple skus; otherwise insert price
                        var priceContainerNode = args.descriptionContainerNode.select("div.price_display_container")[0];
                        var skuMenuContainerNode = args.descriptionContainerNode.select("div.sku_menu_container")[0];
                        if (Object.isElement(skuMenuContainerNode)
                                && generic.productData.validateSkusArray(productData.skus)
                                && productData.skus.length > 1) {
                            self.renderSkuMenu({
                                productData: productData,
                                priceContainerNode: skuMenuContainerNode
                            });
                        }
                        if (Object.isElement(priceContainerNode)) {
                            self.renderPrice({
                                skuData: productData.skus[0],
                                priceContainerNode: priceContainerNode
                            });
                        }
                        args.descriptionContainerNode.select("a.spp_email").each(function(friendLink) {
                            friendLink.observe("click", function(e) {
                            var selBox = skuMenuContainerNode.select("select")[0];
                            if (!selBox) {
                               selectID = 0;
                            } else {
                               selectID = selBox.selectedIndex;
                            }
                            var url = "/templates/email_a_friend.tmpl?";
                                url += "CATEGORY_ID=" + window.CATEGORY_ID;
                                url += "&PRODUCT_ID=" + productData.PRODUCT_ID;
                                url += "&SOURCE=product";
                                url += "&SELECT=" + selectID;
                                window.open(url, '', "width=375,height=400,toolbar=0");
                                e.preventDefault();
                            });
                        });
						
                        args.descriptionContainerNode.select("a.spp_print").each(function(printLink) {
                            printLink.observe("click", function(e) {
                            var selBox = skuMenuContainerNode.select("select")[0];
                            var selectID = '';
                            if (!selBox) {
                               selectID = 0;
                            } else {
                               selectID = selBox.selectedIndex;
                            }
                            var url = "/products/spp/index_print.tmpl?";
                                url += "CATEGORY_ID=" + window.CATEGORY_ID;
                                url += "&PRODUCT_ID=" + productData.PRODUCT_ID;
                                url += "&SELECT=" + selectID;
                                window.open(url, '', "width=630,height=500,toolbar=1"); 
                                e.preventDefault();
                            });
                        });

                        /*
                        var titleNode = args.descriptionContainerNode.select("h1.spp-title")[0];
                        if (titleNode) {
                          var item = titleNode.innerHTML.match(/\u2122|\u00AE/);
                          if (item && item.length>0) {
                              var re1 = item[0];
                              // var re2 = "<font size=\"2\">"+re1+"</font>";
                              var re2 = "<sup class='spp-header-tm'>"+re1+"</sup>";
                              var test = titleNode.innerHTML.replace(re1, re2);
                              titleNode.innerHTML = test;
                          }
                        }
                        */
                        
                        var descriptionNode = args.descriptionContainerNode.select("p.spp-description")[0];
                        if (descriptionNode) {

                          if(isDramming) {
                            generic.templatefactory.get({path: '/dramming/templates/dramming-markup.tmpl'}).evaluateCallback({
                                callback: function(html) { 
                                    descriptionNode.insert(html);

                                    if(args.isQuickshop) {

                                    }
 
                                }
                            });
                          } else {
                            self.renderDescription({
                                isQuickshop: args.isQuickshop,
                                productData: productData,
                                descriptionNode: descriptionNode
                            });
                          }
                        }
                        
                        var attrContainer = args.descriptionContainerNode.select("p.spp-attributes")[0];
                        if (attrContainer) {
                            brx.productView.displayAttributes({
                                containerNode : attrContainer,
                                productData   : productData
                            });
                        }
                        
                        var howNode = args.descriptionContainerNode.select("p.spp-how")[0];
                        if (howNode && productData.PRODUCT_USAGE && !args.isQuickshop) {
                            self.initHowBtn({
                                productData: productData,
                                howNode: howNode
                            });
                        }
                        // Hide all the buttons but the Add to Bag for the Holiday Card SKU.
                        if (productData.PROD_BASE_ID == 29163) {
                           var conNode = args.descriptionContainerNode;
                           conNode.select("a.favorites-add-link")[0].addClassName("hidden");
                           conNode.select("div.add-to-gift")[0].addClassName("hidden");
                           //conNode.select("a.spp_email")[0].addClassName("hidden");
                           //conNode.select("a.spp_print")[0].addClassName("hidden");
                           conNode.select("div.shades-container")[0].addClassName("hidden");
                        }
                        var addButtonNode = $(args.descriptionContainerNode).select("a.description-add-link")[0];
                        var addFavoritesNode = $(args.descriptionContainerNode).select("a.favorites-add-link")[0];
                        var addKitNode = $(args.descriptionContainerNode).select("a.kit-add-link")[0];
                        var progressNode = $(args.descriptionContainerNode).select("span.add-progress")[0];
                        var errorNode = $(args.descriptionContainerNode).select("ul.error_messages")[0];
                        var replenishContainer = $(args.descriptionContainerNode).select("div#replenishment-container")[0];
                        var tosButtonNode = $(args.descriptionContainerNode).select("a.description-tos")[0];
                        if (args.type == 'kit') {
                            if (addButtonNode) {
                                addButtonNode.addClassName('hidden');
                            }
                            if (addFavoritesNode) {
                                addFavoritesNode.addClassName('hidden');
                            }
                            if (addKitNode) {
                                addKitNode.removeClassName('hidden');
                            }
                            if (addKitNode) {
                                self.initAddButton({
                                    productData: productData,
                                    addButtonNode: addKitNode,
                                    tosButtonNode: tosButtonNode,
                                    progressNode: progressNode,
                                    itemType: 'kit'
                                });
                            }   
                        } else {
                            if (addKitNode) {
                                addKitNode.addClassName('hidden');
                            }                            
                            if (addButtonNode) {
                                self.initAddButton({
                                    productData: productData,
                                    addButtonNode: addButtonNode,
                                    tosButtonNode: tosButtonNode,
                                    progressNode: progressNode,
                                    replenishContainer: replenishContainer,
									errorNode:errorNode,
                                    itemType: 'cart'
                                });
                                self.initGiftButton({
                                    isQuickshop: args.isQuickshop,
                                    productData: productData,
                                    containerNode: args.descriptionContainerNode
                                });
                            }
                            
                            var favoritesProgressNode = args.descriptionContainerNode.select("span.favorites-progress")[0];
                            if (addFavoritesNode) {
                                self.initAddButton({
                                    productData: productData,
                                    addButtonNode: addFavoritesNode,
                                    tosButtonNode: tosButtonNode,
                                    progressNode: favoritesProgressNode,
									errorNode:errorNode,
                                    itemType: 'favorites'
                                });
                            }                
                        }
                        
                        
                        var invStatusNode = args.descriptionContainerNode.select("div.inventory_status")[0];
                        brx.productView.displayInventoryStatus({
                            skuData: productData.skus[0],
                            node: invStatusNode
                        });
                        var shadesContainerNode = args.descriptionContainerNode.select("div.shades-container")[0];                        
                        if (Object.isElement(shadesContainerNode) && productData.shaded) {
                            self.initShadePicker({
                                productData: productData,
                                shadesContainerNode: shadesContainerNode
                            });
                        }
                        
                        // Listen for "select:sku" event. If Prod ID from this event matches
                        // Prod ID for this view, update iventory status & price display.
                        document.observe('select:sku', function(evt) {
                            if (evt.memo.PRODUCT_ID == productData.PRODUCT_ID) {
                                brx.productView.displayInventoryStatus({
                                    skuData: evt.memo,
                                    node: invStatusNode
                                });
                                self.renderPrice({
                                    skuData: evt.memo,
                                    priceContainerNode: priceContainerNode
                                });

                                var selectedSkuProductData = new Object;
                                selectedSkuProductData.skus = new Array;
                                selectedSkuProductData.skus[0] = evt.memo;
                                selectedSkuProductData.allowedInGiftSets = true;
                                //show hide add to bag, tos, ect.....
                                /*if(brx.productData.isTempOutOfStock(args.productData.skus[0])
                    			    || brx.productData.isComingSoon(args.productData.skus[0])
                    			    || brx.productData.isSoldOut(args.productData.skus[0])
                    			    || brx.productData.isInactive(args.productData.skus[0])) {
                    			*/
                    			if (brx.productData.isSoldOut(selectedSkuProductData.skus[0])) {
                                    if (brx.productData.isBasicReorder(selectedSkuProductData.skus[0])) {
                                        args.descriptionContainerNode.select('.description-add-link')[0].addClassName("hidden");
                                        args.descriptionContainerNode.select('.description-tos')[0].removeClassName("hidden");
                                    } else {
                                        args.descriptionContainerNode.select('.description-add-link')[0].addClassName("hidden");
                                        args.descriptionContainerNode.select('.description-tos')[0].addClassName("hidden");
                                    }
                                } else {
                                    args.descriptionContainerNode.select('.description-add-link')[0].removeClassName("hidden");
                                    args.descriptionContainerNode.select('.description-tos')[0].addClassName("hidden");
                                }
                                                            
                                self.initGiftButton({
                                    isQuickshop: args.isQuickshop,
                                    productData: selectedSkuProductData,
                                    containerNode: args.descriptionContainerNode
                                });
                            }
                        });   
                        
                        if (Object.isFunction(args.postRenderCallback)) {
                            args.postRenderCallback();
                        }                  

                        //catch any added links
                        generic.overlay.initLinks();
                        
                    }
                });
            }
        }, // end render
        renderDescription : function (args) {
            if (!args.productData || !args.descriptionNode) {
                return null
            };
            var truncatedDescription = args.productData.DESCRIPTION;
            if (!truncatedDescription) {
                return null;
            }
            var charPositionToBreak = truncatedDescription.indexOf(" ", 165);
            if (charPositionToBreak > -1 && args.isQuickshop && args.productData.PROD_BASE_ID != 29163) {
                truncatedDescription = truncatedDescription.substring(0, charPositionToBreak);
                truncatedDescription += "...";
                if (args.productData.url && args.productData.url.length > 0) {
                    var linkNode = new Element('a', { href: args.productData.url });
                    var linkString = new Element('em');
                    linkString.update(brx.rb.more);
                    linkNode.update(linkString);
                    args.descriptionNode.insert(linkNode);
                }
            }
            if (!args.isQuickShop && page_data && page_data.description_extras) {
                truncatedDescription += '<br/>' + page_data.description_extras;
            }
            if(!isDramming) args.descriptionNode.insert({ top: truncatedDescription });

        },        
        renderPrice : function(args) {
            // fetch HTML template          
            if (args.skuData.limitedSupply == 1) {
                args.skuData.limitedSupplyFormatted = 'Only a few left!';
            }
            generic.templatefactory.get({path: '/templates/products/single-view-price.tmpl'}).evaluateCallback({
                object: args.skuData,
                callback: function(html) {
                    args.priceContainerNode.update(html);
                }
            });
        },
        renderSkuMenu : function(args) {
            var self = this;
            // Inner function that chooses which fields to display in menu.
            // Potential field and label names are listed in the private skuMenuFields variable.
            var findMenuFields = function(skus) {
                var fields = skuMenuFields || [];
                var countUnique = function(field) {
                    return skus.pluck(field).uniq().length;
                }
                var fieldsForMenu = [];
                for (var i=0, len=fields.length; i<len; i++) {
                    if (countUnique(fields[i].field) > 1) {
                        fieldsForMenu.push(fields[i]);
                    }
                }
                return fieldsForMenu;
            };
            var selectSku = function(skuData) {
                var self = this;
                var optsArray = $A(skuMenuSelectNode.options);
                var opt = optsArray.detect(function(opt, idx) {
                    if (opt.value == skuData.SKU_BASE_ID) {
                        return opt;
                    }
                });
                skuMenuSelectNode.selectedIndex = optsArray.indexOf(opt);
                // selectMe(this.htmlSelectID, optsArray.indexOf(opt), selects.indexOf(slct), false);
            };
            
            // Inner function that is called after HTML from template is inserted into DOM.
            // Creates OPTION nodes for SELECT menu and wires up event handlers.
            var initMenu = function (initArgs) {
                //skuMenuSelectNode = initArgs.priceContainerNode.select("select.sku-menu")[0];
                var cssMenuSelectorStr = (isDramming)?'select.sku-menu-qs-extended':'select.sku-menu';
                skuMenuSelectNode = initArgs.priceContainerNode.select(cssMenuSelectorStr)[0];
                if (!skuMenuSelectNode) {
                    return;
                }
                var skus = initArgs.skuData;
                // check for which unique value(s) will be displayed in menu
                var fieldObjArray = findMenuFields(skus);
                if (Object.isArray(fieldObjArray) && fieldObjArray.length > 0) {
                    // include price in the text of the select options if there
                    // is more than one unique price in the Array of SKUs
                    var includePrice = false;
                    if (skus.pluck("PRICE").uniq().length > 1) {
                        includePrice = true;
                    }
                    // pull out names of data fields
                    var selectFields = [];
                    for (var i=0; i<fieldObjArray.length; i++) {
                        selectFields.push(fieldObjArray[i].field);
                    }
                    var selectLabel = "Select a " + fieldObjArray[0].label;
                    var lblNode = initArgs.priceContainerNode.select("#shadelbl")[0];
                    if (lblNode) {
                        lblNode.update(selectLabel);
                    }
                }
                // iterate through SKUs, building HTML OPTION nodes
                skus.each(function(sku, i) {
                    var fieldValues = [];
                    // Choose first menu field for dropdown, i.e., strength > shade > size
                    //for (var i=0; i<selectFields.length; i++) {
                        var fieldName = selectFields[0];
                        var optionLabel;
                        optionLabel = sku[fieldName];
                        fieldValues.push( optionLabel );
                    //}
                    var txt = fieldValues.join(" - ");
                    if (includePrice) {
                        txt += ' ' + generic.productData.getPriceDisplay(sku, ' ');
                    }
                    // build OPTION tag & insert into menu
                    var opt = new Element('option', {value: sku.SKU_BASE_ID}).update(txt);
                    skuMenuSelectNode.insert(opt);
                });
                // set up event handler for menu change.
                skuMenuSelectNode.observe('change', function(evt) {
                    var skuBaseId = $F(evt.target);
                    if (skuBaseId && skuBaseId.length > 0) {
                        var sku = skus.detect(function(sku) {
                            return sku.SKU_BASE_ID == skuBaseId;
                        });
                    }
                    evt.target.fire("select:sku", sku);

                    //dramming
                    if(isDramming) changeThreePartSmoosh(sku);
                });
                // set up event handler for SKU selection elsewhere (e.g., from Shade Picker).
                document.observe('select:sku', function(evt) {
                    if (evt.target !== skuMenuSelectNode) {
                        selectSku(evt.memo);
                    }
                });
                
                
                // build custom menu
                // var skuMenuObj = origins.customMenu({selectNode: skuMenuSelectNode});
                
                
                
            }; // end initMenu
            // fetch HTML template
            generic.templatefactory.get({path: '/templates/products/single-view-price-menu.tmpl'}).evaluateCallback({
                object: args.productData,
                callback: function(html) {
                    args.priceContainerNode.update(html);
                    initMenu({
                        skuData: args.productData.skus,
                        priceContainerNode: args.priceContainerNode
                    });
                }
            });
            
        }, // end renderSkuMenu
        
        initHowBtn: function(args) {
            if (!args.productData || !args.howNode) {
                return null;
            }
            args.howNode.removeClassName('hidden');
            args.howNode.observe('click', function(e) {
                var howInfoContainer = $$('span.spp-how-info-container')[0];
                if (howInfoContainer) {
                    generic.templatefactory.get({path: '/templates/products/how-to-use.tmpl'}).evaluateCallback({
                        object: args.productData,
                        callback: function(html) {
                            if (howInfoContainer) {
                                howInfoContainer.update(html);
                                var howInfoPop = howInfoContainer.select('.spp-how-info')[0];
                                var infoPopHeight = howInfoPop.getHeight() + 12;
                                howInfoPop.setStyle({
                                    //changed the top to .5 because long how-to boxes were off the top of the page
                                    top: -.5 * infoPopHeight + 'px'
                                });
                                var closeBtn = howInfoContainer.select('.close-link')[0];
                                closeBtn.observe('click', function(evt) {
                                    evt.preventDefault();
                                    howInfoContainer.update();
                                });
                            }
                        }
                    });
                }
            });
        },
        
        renderReplenishMenu : function(args) {
            var self = this;
            var isRefillable = args.skuInfo.REFILLABLE;
            if (isRefillable) {
                generic.templatefactory.get({path: '/templates/products/replenish_menu.tmpl'}).evaluateCallback({
                    callback: function(html) {
                        args.replenishContainer.update(html);
                        generic.overlay_cus.initLinks();
                        self.initReplenishMenu({
                            addBtn: args.addBtn,
                            skuInfo : args.skuInfo,
                            replenishContainer : args.replenishContainer
                        })
                    }
                });
            } else {
                args.replenishContainer.update('');
                generic.overlay_cus.initLinks();
            }
        },
        /**
         */
        initAddButton: function(args) {
	        if (!args.addButtonNode || !args.productData || !args.productData.skus) {
                return null;
            }
            // set default type to 'cart'
            var options = Object.extend({
                itemType: args.itemType || 'cart' 
            }, args);
            var skus = options.productData.skus;
            if (generic.productData.validateSkusArray(skus)) {
                var self = this;
                var btn = brx.productView.addButton({
                    addButtonNode: options.addButtonNode,
                    tosButtonNode: options.tosButtonNode,
                    progressNode: options.progressNode,
					errorNode: options.errorNode,
                    skuData: skus[0],
                    itemType: options.itemType,
                    productCategoryId: options.productData.PARENT_CAT_ID
                });
                if (btn.getItemType() === 'cart') {
                    btn.setShoppable();                 
                } else if (btn.getItemType() === 'kit') {
                    btn.setItemType({
                        itemType: 'kit',
                        altParams: options.productData
                    });
                    btn.setShoppable();
                }
                // Listen for "select:sku" event. If Prod ID from this event matches
                // Prod ID for this button, change the SKU ID associated with the button.
                document.observe('select:sku', function(evt) {
                    var skuData = evt.memo;
                    if (skuData.PRODUCT_ID == options.productData.PRODUCT_ID) {
                        btn.setSkuData(skuData);
                        if (btn.getItemType() === 'cart' || btn.getItemType() === 'kit') {
                            btn.setShoppable();                 
                        }
                    }
                    // self.addButton.setShoppable(productPage.isActive(skuData));
                });
                
                // If there is a replenishment node, initiate the menu.
                if (args.replenishContainer) {
                    var replenishMenu = self.renderReplenishMenu({
                        addBtn: btn,
                        skuInfo : skus[0],
                        replenishContainer : args.replenishContainer
                    });
                };
            }
            
            
        }, // end initAddButton

        initKitButton: function(args) {
            if (!args.addKitNode || !args.productData || !args.productData.skus) {
                return null;
            }
            // set default type to 'cart'
            var options = Object.extend({
                itemType: 'cart'
            }, args);
            var productData = options.productData;
            var skus = productData.skus;
            if (generic.productData.validateSkusArray(skus)) {
                var self = this;
                options.addKitNode.observe('click', function(evt) {
                    evt.preventDefault();
                    options.progressNode.style.display = "block";
                    options.addKitNode.style.display = "none";
                    document.fire("kit:addSku", productData);
                });
            }
        },
        initReplenishMenu : function (args) {
            if (!args.replenishContainer || !args.skuInfo || !args.addBtn) {
                return null;
            }
            var replenishSelectNode = args.replenishContainer.select('#replenish_select')[0];
            var skuBaseId = args.skuInfo.SKU_BASE_ID;
            var addBtn = args.addBtn;
            if (replenishSelectNode) {
                var freqValue = "0";
                var setReplenishmentItemType = function(freqValue) {
                    if (!freqValue) {
                        return;
                    }
                    addBtn.setItemType({
                        itemType: 'replenishment',
                        altParams: {
                            REPLENISHMENT_FREQ: freqValue
                        }
                    });
                };
                replenishSelectNode.observe('change', function(evt) {
                    evt.preventDefault();
                    freqValue = evt.target.value; 
                    setReplenishmentItemType(freqValue);               

                    // hide gifting if replen is selected
                    var container = (args.isQuickshop) ? $$("#temp_qs_container")[0] : $$("body")[0];
                    var addToGift = container.select(".add-to-gift")[0];
                    if (freqValue > 0  &&  addToGift ) {
                        addToGift.hide();
                    } else {
                        addToGift.show();
                    }
                });
                setReplenishmentItemType(freqValue);
            }
        },

        initShadePicker: function(pickerArgs) {
            var shadePicker = brx.productView.shadePicker({
                productData: pickerArgs.productData,
                shadesContainerNode: pickerArgs.shadesContainerNode,
                singleProductView: this,
                isDramming: isDramming
            });


            // if (productData.shaded) {
            //     var args = {
            //         cellsPerRow : 4,
            //         pickerContainerID : "tab_shaded" + this.productTabs.idSuffix,
            //         productData : productData,
            //         viewContainerID : this.viewContainerID,
            //         categoryID : CATEGORY_ID
            //     };
            //     this.shadePicker = new productPage.ShadePicker(args);
            // }
        },

        initGiftButton: function(args) {
            // no add to gift on page. i.e. - Canada
            if (!$$('.add-to-gift').length) {
                return;
            }

            // don't show add to gift for giftsets..a bit hackish but I don't really have access
            // to the category on the server side when rendering the necessary quickshops/spps
            if (!args.productData.allowedInGiftSets) {
                args.containerNode.select('.add-to-gift')[0].hide();
                return;
            }
			
			// Don't show add to gift for out of stock items
			// NOTE: skuData isn't even available here...this is breaking every
			// single 'add to gift' button
			if(brx.productData.isTempOutOfStock(args.productData.skus[0])
			    || brx.productData.isComingSoon(args.productData.skus[0])
			    || brx.productData.isSoldOut(args.productData.skus[0])
			    || brx.productData.isInactive(args.productData.skus[0])) {
                    args.containerNode.select('.add-to-gift')[0].hide();
                    return;
			} else {
                args.containerNode.select('.add-to-gift')[0].show();
            }

            document.observe("giftsets:loaded", function(evt) {
                args.giftsets = evt.memo;
                brx.productView.giftButton(args);
            });

            // gift sets need to be refreshed in the case that there are multiple
            // 'add to gift' buttons on a page. User must be able to add a gift
            // on one, then see the added gift name on another
            generic.jsonrpc.fetch({
                method: 'user.giftSets',
                params: [],
                onSuccess: function(jsonRpcResponse) {
                    var giftsets = jsonRpcResponse.getValue();
                    document.fire("giftsets:loaded", giftsets);
                },
                onFailure: function(jsonRpcResponse) {
                    console.log('failed to get gift sets');
                }
            });
        }
    };
};

// move this out into it's own namespace so it can be more easily reused
brx.productView.giftButton = function(args) {

    var multiAdd = args.multiAdd;

    if ((!args.productData || !args.productData.skus) && !multiAdd) {
        return null;
    }

    // set default type to 'cart'
    var skus = args.productData ? args.productData.skus : [];
    if (!generic.productData.validateSkusArray(skus) && !multiAdd) {
        return;
    }

    var giftSkuId = !multiAdd ? skus[0].SKU_BASE_ID : undefined;
    var giftSkuIds = multiAdd ? args.skus : undefined;

    // Decide which Add to Gift section to focus on
    var container;
    if (args.containerNode) {
        container = args.containerNode;
    } else {
        container = (args.isQuickshop) ? $$("#temp_qs_container")[0] : $$("body")[0];
    }

    // reason #3,048,105 IE is stupid: the ternary operator that was here was preventing
    // the addToGiftSelector value from being set. Have to use an if/else.
    var addToGiftSelector;
    if (multiAdd) {
        addToGiftSelector = ".add-all-to-gift";
    } else {
        addToGiftSelector = ".add-to-gift";
    }
    var addToGift  = container.select(addToGiftSelector)[0];
    var chooseGift = addToGift.select(".choose-gift-set")[0];
    var dropdown   = addToGift.select(".choose-gift-set-dropdown")[0];

    var addToGiftLocation = args.isQuickshop ? 'QV' : 'SPP';

    var resetDropdown = function(items) {
        dropdown.innerHTML = "";
        if( typeof (items.each) != "undefined" ) {
            items.each(function(set) {
                dropdown.insert(
                    new Element('li', {
                        'class': 'option gift',
                        'id': set.COLLECTION_ID
                    }).update(set.COLLECTION_NAME)
                );
            });
        }

        // insert "new" option
        dropdown.insert(
            new Element('li', {
                'class': 'option create-new new',
                'id': 'new'
            }).update('Create a New Gift') //FIXME: rb-ify me
        );
    };

    // append dropdown options to container
    var giftsets = args.giftsets || [];

    resetDropdown(giftsets);

    // Add to Gift button & form
    var giftButton = addToGift.select(".add-btn")[0];

    var addNewItem = addToGift.select(".add-new-item")[0];
    var createNewGiftBtn = addToGift.select(".add-new-item")[0].select(".btn")[0];
    var newGiftText = addToGift.select(".add-new-item-text")[0];

    var dropdownAddBtn = chooseGift.select(".btn")[0];
    var dropdownAddBtnProgress = chooseGift.select(".progress")[0];

    var chosenGiftsetID = chooseGift.select(".gift-set-selection-id");
    var chosenGiftsetName = chooseGift.select(".gift-set-selection-name");
	
	var closeButton = addToGift.select(".gift-close-link")[0];
	var closeGiftButton = chooseGift.select(".gift-close-link")[0];

    var resetDropdownOptions = function() {
        var dropdownOptions = dropdown.select(".option");
        dropdownOptions.each( function(singleOption) {
            singleOption.observe('click', function(e) {
                chosenGiftsetID.value = this.id;
                chosenGiftsetName.value = this.innerHTML;
                if (this.hasClassName("create-new")) {
                    var btn = chooseGift.select(".btn")[0];
                    newGiftText.clear();
					btn.click();
				} else {
					dropdownOptions.each( function(s) { 
								s.removeClassName('active')
					});
					this.addClassName("active");
				}
            });
        });
    };

    resetDropdownOptions();
	
	// Allow for Enter Keypress to submit new gift
	var giftName = document.getElementById("add-new-item-text");
	giftName.onkeydown = function(e) {
		var evt = e ? e:event;
		var keyCode = evt.keyCode;
		if(keyCode == 13) {
			if(addNewItem.hasClassName("hidden")) {
				return;
			} else {
				addToGift.focus();
				createNewGiftBtn.simulate('click');
			}
			Event.stop(evt);
		}
	};
	
	
	
	//Click close button
	closeButton.stopObserving('click');
    closeButton.observe('click', function(){   
        //toggleVisible(giftForm);
        // if the dropdown has at least one user-specified option,
        // show the dropdown. Otherwise, show the text field.

        if (dropdown.childElements().length > 1 && addNewItem.hasClassName('hidden')){
            toggleVisible(chooseGift);  // show dropddown and button
        } else {
            toggleVisible(addNewItem);  // show text field and button
        }

        toggleArrow(giftButton); // rotate arrow

    });
	
	closeGiftButton.stopObserving('click');
    closeGiftButton.observe('click', function(){   
        //toggleVisible(giftForm);
        // if the dropdown has at least one user-specified option,
        // show the dropdown. Otherwise, show the text field.

        if (dropdown.childElements().length > 1 && addNewItem.hasClassName('hidden')){
            toggleVisible(chooseGift);  // show dropddown and button
        } else {
            toggleVisible(addNewItem);  // show text field and button
        }

        toggleArrow(giftButton); // rotate arrow

    });

    // these events are re-attached when the list is refreshed...
    // detach (potentially) old handlers before attaching

    // Click "Add to Gift" button
    giftButton.stopObserving('click');
    giftButton.observe('click', function(){   
        //toggleVisible(giftForm);
        // if the dropdown has at least one user-specified option,
        // show the dropdown. Otherwise, show the text field.

        if (dropdown.childElements().length > 1 && addNewItem.hasClassName('hidden')){
            toggleVisible(chooseGift);  // show dropddown and button
        } else {
            toggleVisible(addNewItem);  // show text field and button
        }

        toggleArrow(giftButton); // rotate arrow

    });

    createNewGiftBtn.stopObserving('click');
    createNewGiftBtn.observe("click", function(){
        
        var newGiftName = newGiftText.value;    // get text from textfield

        //if there isn't any text, alert the user
		// NOTE: Had to do the check for "Enter a name for your gift" as IE was using the placeholder text as input. Its a hack but it works.
        if (/^\s*$/.test(newGiftName) || newGiftName == "Enter a name for your gift") {
            newGiftText.addClassName("error");
            generic.showErrors([{text: 'Please name your gift.'}]);
        } else {
            newGiftText.removeClassName("error");
            generic.showErrors([{text:''}]);

            chosenGiftsetID.value = '';
            chosenGiftsetName.value = newGiftName;

            toggleVisible(addNewItem);  // hide the text field + button
            toggleVisible(chooseGift);  // display the dropdown + button
            dropdownAddBtn.simulate('click');
        }
    });

    // Click "Create New Gift" button

    if (!multiAdd) {
        document.observe('select:sku', function(evt) {
            giftSkuId = evt.memo.SKU_BASE_ID;
        });
    }

    var showProgress = function() {
        dropdownAddBtnProgress.show();
        createNewGiftBtn.hide();
    };

    var hideProgress = function() {
        dropdownAddBtnProgress.hide();
        createNewGiftBtn.show();
    };

    var hideChooseGift = function() {
        toggleVisible(chooseGift);
        toggleArrow(giftButton); // rotate arrow
    };

    // TODO: User chooses "Create New Gift" and clicks "Add"
    var addHandler = function() {
        showProgress();
        // see if final, i.e., "Create New Gift", option is selected.
        if (chosenGiftsetID.value == "new") {
            toggleVisible(chooseGift);  // hide dropdown
            toggleVisible(addNewItem);  // show text field + button
			newGiftText.focus(); // hack for IE to show placeholder
			giftButton.focus();
			hideProgress();
            return; //don't remove this
        }

        // add the item to the gift
        var collection_id = chosenGiftsetID.value;
        var collection_name = chosenGiftsetName.value;

        if (!collection_id && !collection_name) {
            generic.showErrors([{text: 'Please select a gift.'}]);
            hideProgress();
            return;
        } else {
            generic.showErrors([{text:''}]);
        }

        /* this call adds item to kit */
        var params;
        if (multiAdd) {
            params = [{
                "_SUBMIT": "alter_collection",
                "action": "add,save",
                "COLLECTION_TYPE": "UKIT",
                "COLLECTION_ID": collection_id,
                "COLLECTION_NAME": collection_name || "",
                "COLLECTION_SUBTYPE": 'SITEWIDE_GIFT',
                "SKU_BASE_ID": giftSkuIds,
                "INCREMENT": 1
            }];
        } else {
            params = [{
                "_SUBMIT": "alter_collection",
                "action": "add,save",
                "COLLECTION_TYPE": "UKIT",
                "COLLECTION_ID": collection_id,
                "COLLECTION_NAME": collection_name || "",
                "COLLECTION_SUBTYPE": 'SITEWIDE_GIFT',
                "SKU_BASE_ID": [giftSkuId],
                "INCREMENT": 1,
                "QTY": "1"
            }];
        }

        generic.jsonrpc.fetch({
            method : 'rpc.form',
            params: params,
            onSuccess: function(jsonRpcResponse) {
                hideProgress();
                hideChooseGift();
                var cartResponse = jsonRpcResponse.getCartResults();
                document.fire("cart:updated", cartResponse);

                if (!multiAdd) {
                    var item = cartResponse.getItem();
                    var prod_name = item.product.PROD_RGN_NAME;
                    // FIXME: collection_name isn't returning from the server 
                    document.fire("kit:success", { collection_name: collection_name, product_name: prod_name.replace(/&.{0,}?;/, ""), giftLocation: addToGiftLocation });
                }
                document.fire("giftset:added");
		resetDropdown(cartResponse.getAllItems());
		resetDropdownOptions();
            },
            onFailure: function(errorRpcResponse) {
                hideProgress();
                hideChooseGift();
                var errorObjectsArray = errorRpcResponse.getMessages()
                var rberrorHash = generic.rb('error_messages');
                var message = rberrorHash.get('under.min_skus.collection');
                var errorMessage = errorObjectsArray[0].text;
                if(errorMessage.match("UKIT:SITEWIDE_GIFT:")) {
                   errorObjectsArray[0].text = message;
                }
                generic.showErrors(errorObjectsArray);
            }
        });
    };

    dropdownAddBtn.stopObserving('click');
    dropdownAddBtn.observe("click", addHandler); // end dropdownAddBtn
}

var isVisible = function(elem) {
    return (elem.getStyle("display") != "none");
}

var ensureHidden = function(elem){
    elem.addClassName("hidden");
}

var toggleVisible = function(elem){
    if (elem.hasClassName("hidden")) {
        elem.removeClassName("hidden");
    } else {
        elem.addClassName("hidden");
    }
}

var toggleArrow = function(arrowElem){
    if (arrowElem.hasClassName("arrow-down")) {
        arrowElem.removeClassName("arrow-down");
    } else  {
        arrowElem.addClassName("arrow-down");
    }
}


   // temploc for custom spp - TODO put in namespace
   var changeThreePartSmoosh = function(skuData) {

        var hexVal = skuData.HEX_VALUE_STRING.split(',');
        var lblVal = skuData.SHADE_LABEL.split(',');

        //dramming
        $$('.three-part-smoosh .smoosh_panel').each(function(n,index){
            n.select('img')[0].setStyle({'backgroundColor':hexVal[index]});
        });
        $$('.three-part-smoosh .smoosh_label').each(function(n,index){
            n.update(lblVal[index]);
        });

    }

brx.productView.shadePicker = function (args) {

    var swatchWidth = args.swatchWidth || 22;
    var swatchHeight = args.swatchHeight || 22;
    var tableNode;
    var onState;
    var selectedSkuData;
    var smooshPanelNode = null;
    var singleProductView;
    var shadesContainerNode = args.shadesContainerNode;
    var detailDescriptionNode, detailTosNode, detailShadeNameNode, detailLimitedNode;

    //dramming
    // args.isDramming available but set to outside 
    // scope for cross namespace usage
    var isDramming = brx.productView.isDramming; 
    var firstSku = args.productData.skus[0];

    var cellsPerRow = isDramming?6:8;

    var drawSwatch = function(cellNode, skuData) {
        var self = this;

        if (!skuData.HEX_VALUE_STRING || skuData.HEX_VALUE_STRING.length < 1) {
            return;
        }
        cellNode.skuBaseId = skuData.SKU_BASE_ID;
        var swatchContainerNode = cellNode.select('div.swatch-container')[0];
        var linkNode = cellNode.select('a')[0];
        var hexVals = skuData.HEX_VALUE_STRING.split(',');
        var swatchShadeWidth = Math.ceil(swatchWidth/hexVals.length);
        var defaultStyle = getSwatchBaseStyle(cellNode, skuData, hexVals);

        if(isDramming) swatchShadeWidth = swatchWidth;

        swatchContainerNode.setStyle({
            width: swatchWidth + "px",
            height: swatchHeight + "px"
        });

        for (var i=0; i<hexVals.length; i++) {
         
            //dramming   
            if(isDramming && i>0) break;

            var d = new Element("div", {});
            d.setStyle(Object.extend(defaultStyle, {
                left: (swatchShadeWidth * i) + "px",
                width: swatchShadeWidth + "px",
                height: swatchHeight + "px",
                zIndex: 10, //need a z-index to make IE6 rollover state work
                backgroundColor: hexVals[i] }));
            swatchContainerNode.insert(d);
        }
        // add an empty div with a 3px border. it will be displayed as an on-state.
        var onStateNode = new Element("div", { 'class':'onstate' });
        onStateNode.setStyle({
            width: swatchWidth -6 + "px",
            height: swatchHeight -6 + "px",
            display: 'none'
        });
        swatchContainerNode.insert(onStateNode);

        // Mouseover handler.
        cellNode.observe('mouseover', function(skuData, evt){
            linkNode.fire("swatch:mouseover", skuData);
            onState = skuData.SKU_BASE_ID;
            cellNode.addClassName('over');
        }.curry(skuData));
        // Mouseout handler. call after 0.25 seconds to prevent flicker
        cellNode.observe('mouseout', function(skuData, evt){
            linkNode.fire("swatch:mouseout", skuData);
            onState = "";
            var offState = function(){
                if (onState != skuData.SKU_BASE_ID) {
                    cellNode.removeClassName('over');
                }
            };
            setTimeout(offState, 250);
        }.curry(skuData));
        // Click handler. Fires "select:sku" event.
        linkNode.observe('click', function(skuData, evt) {
            evt.preventDefault();
            // linkNode.fire("swatch:click", skuData);
            if (tableNode) {
                tableNode.fire("select:sku", skuData);
                if(isDramming) changeThreePartSmoosh(skuData);
            }
            selectTableSku(skuData);
        }.curry(skuData));

        document.observe('select:sku', function(evt) {

        });

    };

    var getSwatchBaseStyle = function(cellNode, skuData, hexVals) {
        var defaultStyle = {
            position: "absolute",
            top: "0px",
            backgroundImage: "none"
        };
        // if (!skuData.SMOOSH_PATH_STRING)
        //     return defaultStyle;
        // swatchSrc = skuData.SMOOSH_PATH_STRING;
        // defaultStyle.backgroundImage = swatchSrc;
        // 
        // if (/MSIE (\d+\.\d+)/.test(navigator.userAgent) && parseFloat(RegExp.$1) < 7) {
        //     defaultStyle.filter = "progid:dximagetransform.Microsoft.AlphaImageLoader(src='" +
        //         defaultStyle.backgroundImage + "', sizingMethod='image')";
        //     defaultStyle.backgroundImage = "none";
        // } else {
        //     defaultStyle.backgroundImage =  "url('" + defaultStyle.backgroundImage + "')";
        // }

        return defaultStyle;
    };


    var renderShadePickerTable = function(tableArgs) {
        var tableContainerNode = tableArgs.tableContainerNode;
        var cellsPerRow = tableArgs.cellsPerRow;
        if (!tableContainerNode) {
            return null;
        }
        
        tableNode = new Element("table", {"class":"table-swatches"} );
        var tbod = new Element("tbody", {"class":"tbody-swatches"} );
        tableContainerNode.update(tableNode);
        tableNode.insert(tbod);
        var trow;
        var skus = tableArgs.productData.skus;
        // var skusToDisplay = skus.select(function(s) {
        //     return !!s.display;
        // });
        var skusToDisplay = skus;
        for (var i=0; i<skusToDisplay.length; i++) {
            //
            // create new row when necessary
            if (i % cellsPerRow === 0) {
                trow = new Element("tr");
                tbod.insert(trow);
            }
            generic.templatefactory.get({path: '/templates/products/shade-table-cell.tmpl'}).evaluateCallback({
                object: skusToDisplay[i],
                callback: function(trow, i, html) {
                    trow.insert(html);
                    drawSwatch(trow.select('td')[i%cellsPerRow], skusToDisplay[i]);
                    // self.initListeners();
                    // once all the swatches have been rendered, select the first one
                    if (i + 1 === skusToDisplay.length) {
                        selectTableSku(skusToDisplay[0]);
                        // initialize scroll container
                        // initScroller();
                    }
                }.curry(trow, i)
            });
        }
        
    }; // end renderShadePickerTable


    var selectTableSku = function(skuData) {
        var cells = tableNode.select("td");
        cells.each(function(cell){
            cell.removeClassName('active');
            if (cell.skuBaseId == skuData.SKU_BASE_ID) {
                cell.addClassName('active');
            }
        });
    }; // end selectTableSku

    var initDetailView = function(detailArgs) {
        var containerNode = detailArgs.shadeDetailContainerNode;
        var skuData = detailArgs.productData.skus[0];
        var template_path = '/templates/products/shade-thumb.tmpl';
        //skuData.SMOOSH_PATH_STRING = '/images/place-holder/alphatest.png'
        
        // dramming variation d52133
        if(isDramming) { template_path = '/dramming/' + template_path; }

        generic.templatefactory.get({path: template_path}).evaluateCallback({
            object: skuData,
            callback: function (productData, html) {
                containerNode.update(html);
                // for (var i=0; i<4; i++) {
                //     smooshPanels[i] = containerNode.select('.smoosh_panel_' + i)[0];
                // }
                
                // dramming variation d52133
                if(!isDramming) { smooshPanelNode = containerNode.select('.smoosh_panel')[0]; }

                // var addButtonNode = containerNode.select(".smoosh-add-link")[0];
                // singleProductView.initAddButton({
                //     productData: productData,
                //     addButtonNode: addButtonNode                    
                // });

                detailDescriptionNode = containerNode.select(".shade-details")[0];
                detailTosNode = containerNode.select(".smoosh-btn-tos")[0];
                detailShadeNameNode = containerNode.select("h3.shade-name")[0];
                detailLimitedNode = containerNode.select(".limited")[0];

                selectDetailSku(skuData)
                
                // bump shade thumb up if sku menu is visible.
                // I know, it's ugly, and I'm sorry
                if (productData.skus.length > 1) {
                    containerNode.setStyle({marginTop: "-60px"});
                }

            }.curry(detailArgs.productData)
        });        
    };
    
    var selectDetailSku = function(s) {
        selectedSkuData = s;
        renderDetailView(s);
    };
    
    var renderDetailView = function(skuData) {
        var self = this;
        var shade_details = "";
        if (skuData.SHADE_DESCRIPTION !== null && typeof(skuData.SHADE_DESCRIPTION) != "undefined") {
            shade_details += "<p>" +
                    skuData.SHADE_DESCRIPTION +
                    "</p>\n";
        }
        if (skuData.FINISH !== null && typeof(skuData.FINISH) != "undefined") {
            shade_details += "<strong>" + brx.rb.finish + ": </strong>" +
                    skuData.FINISH +
                    "<br />\n";
        }
        if (skuData.ATTRIBUTE_COLOR_FAMILY !== null && typeof(skuData.ATTRIBUTE_COLOR_FAMILY) != "undefined") {
            shade_details += "<strong>" + brx.rb.colourGroup + ": </strong>" +
                    skuData.ATTRIBUTE_COLOR_FAMILY +
                    "<br />\n";
        }
        detailShadeNameNode.update(skuData.SHADENAME);
        renderSmooshImages(skuData);

    };
   /**
    * This method pieces together the correct smoosh images and adds color.
    * We have to jump through some hoops to accommodate IE6. These elements
    * are created and added to the DOM as follows:
    * 'smoosh_container' = the top-level container of all the smoosh image nodes
    * 'smoosh_panel_X' = smoosh_container contains these 4 child divs, which break it into
    *      a 4-panel grid. They serve as containers for...
    * 'smoosh_panel_inner_X' = These divs are generated below and placed into
    *      their corresponding parent nodes by index. The smoosh image is placed
    *      in them by CSS background image (non-IE6) or filter (IE6). The divs are
    *      positioned in their parents according to the number of hex values in
    *      the SKU. These positions are stored in an associative array along with the
    *      image names and BG colors.
    */
    var renderSmooshImages = function(skuData) {

        if (!skuData.HEX_VALUE_STRING || !skuData.SMOOSH_PATH_STRING) {
            return;
        }
        var hexVal = skuData.HEX_VALUE_STRING;
        var smooshVal = skuData.SMOOSH_PATH_STRING;

        if(isDramming) changeThreePartSmoosh(skuData);
       
        //
        // Retrieve each panel. Create & append the child panel. Assign
        // browser-specific style attributes to the child.
        var styleObj = {
            backgroundImage: smooshVal,
            backgroundColor: hexVal,
            top  : "0px",
            left : "0px"
        };
        //
        // Test for IE<7. Browser sniffing is problematic, but it seems
        // like the only choice here.
        // the goal is to get the following line into the CSS of each inner div:
        // filter:progid:dximagetransform.Microsoft.AlphaImageLoader(src='/images/example.png', sizingMethod='image')
        if (/MSIE (\d+\.\d+)/.test(navigator.userAgent) && parseFloat(RegExp.$1) < 7) {
            styleObj.filter = "progid:dximagetransform.Microsoft.AlphaImageLoader(src='" +
                              styleObj.backgroundImage + "', sizingMethod='image')";
            styleObj.backgroundImage = "none";
        } else {
            styleObj.backgroundImage =  "url('" + styleObj.backgroundImage + "')";
        }
        var innerDiv = new Element("div", {
            'class': 'smoosh_panel_inner',
            'id': 'smoosh_panel_inner' });
        innerDiv.setStyle(styleObj);
        var spacerImg = new Element("img", {
            'src' : '/images/global/transparent.gif',
            'width' : '125',
            'height': '116' });
        innerDiv.update(spacerImg);
        if(!isDramming) { smooshPanelNode.update(innerDiv); }

    };

    var initPickerListeners = function() {
        var self = this;
        self.mouseOverState = false;
        shadesContainerNode.observe('swatch:mouseover', function(evt) {
            self.mouseOverState = true;
            if (self.mouseoutTimeout) {
                clearTimeout(self.mouseoutTimeout);
            }
            renderDetailView(evt.memo);
        });
        var displaySelected = function(){
            if (!self.mouseOverState) {
                renderDetailView(selectedSkuData);
            }
        }
        shadesContainerNode.observe('swatch:mouseout', function(evt) {
            self.mouseOverState = false;
            self.mouseoutTimeout = setTimeout(displaySelected, 250);
        });
        shadesContainerNode.observe('select:sku', function(evt) {
            selectDetailSku(evt.memo);
            var tbl = tableNode;
            if (tbl !== evt.target) {
                selectTableSku(evt.memo);
            }
        });

        var descNode = singleProductView.getDescriptionContainerNode();
        if (Object.isElement(descNode)) {
            descNode.observe('select:sku', function(evt) {
                selectDetailSku(evt.memo);
                selectTableSku(evt.memo);
            });            
        }
    }; // end initPickerListeners
    
    
    // fetch HTML template            
    generic.templatefactory.get({path: '/templates/products/shade-picker.tmpl'}).evaluateCallback({
        object: args.productData,
        callback: function(html) {
            args.shadesContainerNode.update(html);
            var tableContainerNode = args.shadesContainerNode.select("div.swatch-table-container")[0];
            var shadeDetailContainerNode = args.shadesContainerNode.select("div.smoosh-container")[0];
            singleProductView = args.singleProductView;
            renderShadePickerTable({
                cellsPerRow : cellsPerRow,
            //     includeFilters : true,
                tableContainerNode: tableContainerNode,
                productData: args.productData,
                //dramming
                isDramming: args.isDramming
            });

            var initDetailViewArgs = {
                shadeDetailContainerNode: shadeDetailContainerNode,
                productData: args.productData
            }

            initDetailView(initDetailViewArgs);
            initPickerListeners();

        }
    });
    
    
}; // end brx.productView.shadePicker()


/**
	* This method is used to display the quickshop popovers for the product pages.
	* generic.templatefactory is first called to grab the quickshop template and
	* then on callback, generic.overlay.launch is used to set up the overlay 
	* with the html that is returned.
	* 'overlay-container' is the top level container for the quickshop.
	* brx.productView.single is used to set up view on callback.
	* @requires param{args} Individual product data object passed.
 	* @methodOf brx.productView
*/
brx.productView.quickshop = function(args) {
    
    var view = brx.productView.single({
        //isQuickshop : 1,
        productData : args.productData        
    });
    //notify analytics.js of QV and productID
    document.fire("MPP:productQV", {prodId: args.productData.PRODUCT_ID, catId: args.productData.PARENT_CAT_ID });
 
    generic.templatefactory.get({path: '/templates/products/quickshop.tmpl'}).evaluateCallback({
        callback: function(html) {

            var renderArgs = {};
            var tempContainerAttributes = {id:"temp_qs_container"}
            var overlayContainerNode = $$('.overlay-container')[0];

            // dramming variation d52133
            if(args.productData.isDramming) tempContainerAttributes = { 'class' : 'dramming' } 
            //if(brx.productView.isDramming) tempContainerAttributes = { 'class' : 'dramming' } 
            var tempContainer = new Element("div",tempContainerAttributes);
            $(document.body).insert(tempContainer);
            tempContainer.insert(html);
           
            var imageContainerNode = tempContainer.select("div.spp-product-left")[0];
            if (imageContainerNode) {
                renderArgs.imageContainerNode = imageContainerNode;
            };
            var descriptionContainerNode = tempContainer.select("div.description-container")[0];
            if (descriptionContainerNode) {
                renderArgs.isQuickshop = 1;
                renderArgs.addHeaderLink = 1;           
                renderArgs.type = args.type;
                renderArgs.descriptionContainerNode = descriptionContainerNode;
            };
            //renderArgs.postRenderCallback = function() {
                generic.overlay.launch({content: tempContainer, cssClass: "quick-popup",   includeBackground: true});
            //};

            view.render(renderArgs);

        }
    });
    
};


brx.productView.initQuickshopLink = function(linkNode) {
    var chkFlag = linkNode.hasClassName("qsl-set");
    if(chkFlag == false){
        //get the product number from the class 
        var prdnum = linkNode.readAttribute("class").match(/PROD\w*\d*/)[0];

        linkNode.addClassName("qsl-set");
    }
};

brx.productView.initQuickshopLinks = function() {
    $$("a.quickshoplink").each(function(o){
        brx.productView.initQuickshopLink(o);
    });
};

document.observe("cart:updated", function(cartEvt) {
    generic.overlay.hide();
});

document.observe("kit:updated", function(cartEvt) {
    generic.overlay.hide();
});


brx.productView.quickshopById = function(productID, categoryID, type) {
    var prodFields, skuFields;
    if (rb.page_data_configuration && rb.page_data_configuration["catalog.spp.productFields"]) {
        prodFields = rb.page_data_configuration["catalog.spp.productFields"];
    } else {
        prodFields = ["ATTRIBUTE_COVERAGE", "DEFAULT_CAT_ID", "DESCRIPTION", "LARGE_IMAGE", "PARENT_CAT_ID", "PRODUCT_ID", "PRODUCT_USAGE", "PROD_CAT_DISPLAY_ORDER", "PROD_CAT_IMAGE_NAME", "PROD_RGN_NAME", "PROD_RGN_SUBHEADING", "SHORT_DESC", "SKIN_CONCERN_1", "SKIN_CONCERN_2", "SMALL_IMAGE", "SUB_LINE", "THUMBNAIL_IMAGE", "ABOUT_INGREDIENT", "shaded", "sized", "skus", "worksWith", "AVERAGE_RATING", "TOTAL_REVIEW_COUNT", "RATING_IMAGE", "RATING_RANGE", "url"];
    }
    if (rb.page_data_configuration && rb.page_data_configuration["catalog.spp.skuFields"]) {
        skuFields = rb.page_data_configuration["catalog.spp.skuFields"];
    } else {
        skuFields = ["ATTRIBUTE_COLOR_FAMILY", "DISPLAY_ORDER", "FINISH", "HEX_VALUE", "HEX_VALUE_STRING", "INVENTORY_STATUS", "PRICE", "PRODUCT_ID", "PRODUCT_SIZE", "REFILLABLE", "SHADENAME", "SHADE_DESCRIPTION", "SKIN_TONE", "SKIN_TYPE", "SKU_BASE_ID", "SKU_ID", "SMOOSH_DESIGN", "SMOOSH_PATH_STRING", "STRENGTH", "formattedPrice", "limitedSupply"];
    }
    
    generic.productData.getProductData({
        productId: productID,
        categoryId: categoryID,
        productFields:  prodFields,
        skuFields : skuFields,
        callback: function(d) {
            console.log("getProductData callback");
            console.log(d);
            brx.productView.quickshop({
                type: type,
                productData: d
            });
        }
    });
};



/**
 * This method determines which optional attribute fields are present in a product data object.
 * It then renders a UL that contains those field values along with labels and drops that UL
 * into a container node that it receives as a parameter.
 * The fields which get selected as attributes can be modified in the "fields" array
 * @param {Node} args.containerNode the node into which the UL will be inserted
 * @param {Object} productData JSON-formatted data that contains product information.
 */
brx.productView.displayAttributes = function(args) {
    if (!args.containerNode) { 
        return;
    }
    var p = args.productData;
    //if (!p.SKIN_CONCERN_1 || !p.SKIN_CONCERN_2) {
     //   return;
    //}
    var fields = [
        { label: brx.rb.language.formula, field: p.SKIN_CONCERN_1 },
        { label: brx.rb.language.coverage, field: p.SKIN_CONCERN_2 }
    ];
    var ul = new Element('ul', {'class':'attributes'});
    args.containerNode.update(ul);
    for (var i=0, len=fields.length; i<len; i++) {
        if (fields[i].field && fields[i].field.length > 0) {
            // var strEle = new Element('strong').update(fields[i].label + ': ');
            // var li = new Element('li').update(strEle);
            var li = new Element('li');
            li.insert(fields[i].field);
            ul.insert(li);
        }
    }
};
    
brx.productView.displayInventoryStatus = function(args) {
    if (!args.node || !args.skuData) {
        return null;
    }
    var msg = '';
    if (brx.productData.isTempOutOfStock(args.skuData)) {
		msg = brx.rb.tempOutOfStock;
	} else if (brx.productData.isComingSoon(args.skuData)) {
		msg = brx.rb.comingSoon;
	} else if (brx.productData.isSoldOut(args.skuData)) {
        if (brx.productData.isBasicReorder(args.skuData)) {
		    msg = brx.rb.soldOutBasicReorder;
        } else {
		    msg = brx.rb.soldOut;
        }
	} else if (brx.productData.isInactive(args.skuData)) {
		msg = brx.rb.inactive;
	}
    args.node.update(msg);

    //Show EDD info based on inventory status
    //EDD info is shown only for US locale
    if( generic.cookie("LOCALE") == "en_US" ) {
        brx.productView.showEstimatedDeliveryDate({
            isShoppable: brx.productData.isShoppable(args.skuData)
        });
    }
};

brx.productView.showEstimatedDeliveryDate = function(args) {
    var estimated_delivery_date = $$('.edd')[0];
    estimated_delivery_date.hide();

    if(args.isShoppable) {
        estimated_delivery_date.show();
        brx.productView.getEstimatedDeliveryDate();
    }
};

brx.productView.getEstimatedDeliveryDate = function() {
    var edd_containers = $$('.edd .edd_info')[0];
    if( !edd_containers.hasAttribute("data-ticker-id") ) {
        generic.jsonrpc.fetch({
            method: 'address.estimateDeliveryDateSPP',
            params: [],
            onSuccess: function(jsonRpcResponse) {
                var getEddInfo = jsonRpcResponse.getValue();
                var need_it;
                var order_within;

                brx.productView.EDD.units = { hour : brx.rb.edd_hour_unit,
                                              minute : brx.rb.edd_minutes_unit,
                                              day : brx.rb.edd_days_unit,
                                              tomorrow : brx.rb.edd_tomorrow_unit };

                if( getEddInfo.tomorrow )  { //Ex: tomorrow, Wednesday, August 13
                    need_it = brx.productView.EDD.units.tomorrow + ", " +
                              getEddInfo.need_on_day_name + ", " +
                              getEddInfo.need_on_month + " " +
                              getEddInfo.need_on_day;
                } else { //Ex: Wednesday, August 13
                    need_it = getEddInfo.need_on_day_name + ", " +
                              getEddInfo.need_on_month + " " +
                              getEddInfo.need_on_day;
                }

                if( getEddInfo.order_by_days == 0 ) { //Ex: 13h 10min
                    order_within = getEddInfo.order_by_hours + brx.productView.EDD.units.hour + " " +
                                   getEddInfo.order_by_mins + brx.productView.EDD.units.minute;
                } else { //Ex: 1d 13h 10min
                    order_within = getEddInfo.order_by_days + brx.productView.EDD.units.day + " " +
                                   getEddInfo.order_by_hours + brx.productView.EDD.units.hour + " " +
                                   getEddInfo.order_by_mins + brx.productView.EDD.units.minute;
                }


                var edd_copy = $$('.edd .edd_info p.copy');

                edd_copy.each(function(ele) {
                    ele.writeAttribute({ "data-order-by-days" : getEddInfo.order_by_days,
                                         "data-order-by-hours" : getEddInfo.order_by_hours,
                                         "data-order-by-mins" : getEddInfo.order_by_mins });
                    ele.getElementsByClassName('need_on')[0].update(need_it);
                    ele.getElementsByClassName('order_within')[0].update(order_within);
                });

                var ticker_id = setInterval(brx.productView.updateEstimatedDeliveryDate, 60000);
                edd_containers.setAttribute("data-ticker-id", ticker_id);

                $$('.edd').each(function(ele) { ele.removeClassName('hide') });
            },
            onFailure: function(jsonRpcResponse) {
                console.log('Failed to get EDD info');
            }
        });
    }
};

brx.productView.updateEstimatedDeliveryDate = function() {
    var edd_copy = $$('.edd .edd_info p.copy')[0];
    var days = edd_copy.getAttribute("data-order-by-days");
    var hours = edd_copy.getAttribute("data-order-by-hours");
    var mins = edd_copy.getAttribute("data-order-by-mins");
    var order_within = edd_copy.getElementsByClassName('order_within')[0];

    if( mins == 0 && hours == 0 && days == 0) {
        var edd_containers = $$('.edd .edd_info')[0];
        clearInterval(edd_containers.getAttribute("data-ticker-id"));
        edd_containers.removeAttribute("data-ticker-id");
        brx.productView.getEstimatedDeliveryDate();
        return;
    }

    if( mins > 0 ) {
        mins = mins - 1;
    } else if( hours > 0 ) {
        hours = hours - 1;
        mins = 59;
    } else if( days > 0 ) {
        days = days - 1;
        hours = 23;
        mins = 59;
    }

    edd_copy.writeAttribute({ "data-order-by-days" : days,
                              "data-order-by-hours" : hours,
                              "data-order-by-mins" : mins });
    if(days == 0) {
        order_within.update(hours + brx.productView.EDD.units.hour + " " +
                            mins + brx.productView.EDD.units.minute);
    } else {
        order_within.update(days + brx.productView.EDD.units.day + " " +
                            hours + brx.productView.EDD.units.hour + " " +
                            mins + brx.productView.EDD.units.minute);
    }
};

document.observe('dom:loaded', function(e) {
    brx.productView.initQuickshopLinks();
});

document.observe('dom:loaded', function(e) {
    var dqsl = $('dramming-qs-link'); //sanity check to see if the banner exists
    if(dqsl){
        $('dramming-qs-link').observe('click',function(){
            brx.productView.quickshopById( 'PROD23185', 'CAT9439' ,'' );
        });
    }
});
