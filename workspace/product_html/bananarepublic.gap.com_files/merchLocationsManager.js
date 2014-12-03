/**
 * This Service Class is concerned with displaying store locations information based on
 * inputs of postal code and product or sku ID's at different locations around the site.
 * @author Andrew Southwick, Nichole Shannon
 */
var MerchLocationsManager = Class.create();
var currentLocaleCode = brandConst.BRAND_LOCALE;
MerchLocationsManager.prototype = {
    initialize: function() {
    },
    constants: {
        FIST_OVERLAY_STORES_LIST: "findInStoreOverlay_list",
        FIST_OVERLAY_EDIT: "postalCodeOverlay_edit",
		JP_POSTAL_CODE_LENGTH:7,
        templates: {
            POSTAL_CODE_OVERLAY_EDIT_LINK: new Template(
                "<a class='postalEdit #{brandId}' href=\"javascript:void(0)\" aria-labelledby='findInStorePostalMsg'>#{editText}</a>"
            ),
            POSTAL_CODE_OVERLAY: new Template(
                "<div id=\"#{id}\" class=\"postalCodeOverlay #{brandId}\" role=\"form\" aria-label=\"#{titleText}\" tabindex=\"-1\" >" +
                "<h4 class=\"screenreader\"> #{titleText} </h4>" +
                "   <div id=\"postalCodeHeader\">" + 
                "      <div id=\"postalCodeTitle\" class=\"postalCodeTitle\">#{titleText}</div>" +
                "      <div id=\"postalCodeClose\" class=\"fistOverlayWindowClose\">" +
                "          <img src=\"/assets/browse/product/en/button_closeWindow_zipPopup.gif\" aria-label=\"close\" alt=\"close\" id=\"postalCodeCloseImg\" />" +
                "      </div>" +
                "   	<div style=\"clear: both\"></div>" +
                "   </div>" +
                "   <div id=\"postalCodeOverlay-content\">" +
                "   	<div id=\"postalCodeEntry\" class=\"postalCodeEntry\">" +
                "       	<span>#{within}</span>" +
                "       	<select role=\"listbox\" aria-label=\"within miles of zipcode\" id=\"postalCodeOverlayMiles\">" +
                "   			<option role=\"option\">5</option>" +
                "   			<option role=\"option\">10</option>" +
                "   			<option role=\"option\">15</option>" +
                "   			<option role=\"option\" aria-checked=\"true\" selected=\"selected\">25</option>" +
                "   			<option role=\"option\">50</option>" +
                "   			<option role=\"option\">100</option>" +
                "   		</select>" +
                "   		<span>#{milesOfPcode} </span><input aria-label=\"Enter zip code\" aria-required=\"true\" role=\"input\" id=\"postalCodeOverlayPostalCode\" size=\"10\" value=\"#{postalCode}\"/>" +
                "       </div>" +
                "		<div id=\"errorPlaceholder\" role=\"alert\" class=\"error\"></div>" +
                "       <div id=\"postalCodeSubmitContainer\">" +
                "   	    <button id=\"postalCodeOverlaySubmit\" role=\"button\" type=\"button\" class=\"postalCodeOverlaySubmit\"></button>" +
                "       </div>" +
                "   </div>" +
                "</div>"
            ),
            
            POSTAL_CODE_OVERLAY_JP: new Template(
                    "<div id=\"#{id}\" class=\"postalCodeOverlay #{brandId}\">" +
                    "   <div id=\"postalCodeHeader\">" +
                    "      <div id=\"postalCodeTitle\" class=\"postalCodeTitle\">#{titleText}</div>" +
                    "      <div id=\"postalCodeClose\" class=\"fistOverlayWindowClose\">" +
                    "          <img src=\"/assets/browse/product/en/button_closeWindow_zipPopup.gif\" alt=\"close\" id=\"postalCodeCloseImg\" />" +
                    "      </div>" +
                    "   	<div style=\"clear: both\"></div>" +
                    "   </div>" +
                    "   <div id=\"postalCodeOverlay-content\">" +
                    "   	<div id=\"postalCodeEntry\" class=\"postalCodeEntry\">" +
                    "       	<span>#{within}</span>" +
                    "       	<input id=\"postalCodeOverlayPostalCode\" size=\"10\" value=\"#{postalCode}\"/>" +
                    "       	<span>#{within2}</span>" +
                    "       	<select id=\"postalCodeOverlayMiles\">" +
                    "   			<option>5</option>" +
                    "   			<option>10</option>" +
                    "   			<option>15</option>" +
                    "   			<option selected=\"selected\">25</option>" +
                    "   			<option>50</option>" +
                    "   			<option>100</option>" +
                    "   		</select>" +
                    "   		<span>#{milesOfPcode} </span>" +
                    "       </div>" +
                    "		<div id=\"errorPlaceholder\" class=\"error\"></div>" +
                    "       <div id=\"postalCodeSubmitContainer\">" +
                    "   	    <button id=\"postalCodeOverlaySubmit\" type=\"button\" class=\"postalCodeOverlaySubmit\"></button>" +
                    "       </div>" +
                    "   </div>" +
                    "</div>"
                ),
            STORE_LOCATIONS_OVERLAY: new Template(
                "<div id=\"#{id}\" class=\"findInStoreOverlay clearfix #{brandId}\" tabindex=\"-1\" role='application'>" +
                "	<div id=\"findInStoreOverlayHead\" class=\"#{brandId} overlayHandle\">" +
                "       <div id=\"fistOverlayLogo\" class=\"fistOverlayLogo cursorMove #{brandId}\"></div>" +
                "       <div id=\"fistOverlayWindowClose\" class=\"fistOverlayWindowClose #{brandId}\">" +
                "           <img src=\"/assets/common/clear.gif\" class=\"universalButtonSprite universalButtonSpriteQuickLookClose\" role=\"button\" tabindex=\"0\" alt=\"close #{fistTitle}\" id=\"quickLookClose\"/>" +
                "       </div>" +
                "       <div id=\"fistOverlayTitle\" class=\"fistOverlayTitle cursorMove\">#{fistTitle}</div>"+
                "   </div>" +
                "  	<div id=\"findInStoreOverlay-content\" class=\"brand#{brandCode}\"><div id=\"storeResults\" aria-role=\"grid\"></div>" +
                "</div>"
            ),
            POSTAL_CODE_US_CAN_ERROR: new Template("<div id=\"postalCodeEntryError\" class=\"error\" style=\"color:red;padding:6px 0;\">#{validateUsCanMsg}</div>"),
            FIST_HIGHLIGHT: new Template(
	            '<div id="fistHighlight">' +
					'<div id="fistHighlightLeft"></div>'+ 
					'<div id="fistHighlightMiddle">#{checkStoreAvailability}</div>' +
					'<div id="fistHighlightRight"></div>' +
				'</div>')
        }
    },
    constructors: {},
    api: {
        refresh: function() {
            merchLocationsManager.view.storeLocationsListOverlay.refresh();
        },
        afterProductStyleUpdate: function() {
        	merchLocationsManager.view.storeLocationsListOverlay.afterProductStyleUpdate();
        }
    },
    model: {
        isMerchLocationsManagerActive: false,
        isMerchLocator:false,
        productPage: null,
        skuInfo: null
    },
    controller: {
        init: {
            main: function(productPage) {
                if ((/product.do$/.test(document.location.pathname))) {
                    merchLocationsManager.model.isMerchLocator = true;
                }

                Event.observe(document, "dom:loaded", function() {
                    merchLocationsManager.controller.eventHandlers.domReadyHandler();
                });

                merchLocationsManager.model.productPage = productPage;
                productStyleService.controller.init.main(gidLib.getQuerystringParam('pid', true), [productStyleFistOverlayView, productStyleProductPageView]);

                var searchRadius = gidLib.getCookieVar('globalSession', 'searchRadius');
                if (searchRadius) {
                    storeLocationsService.model.searchRadius = searchRadius;
                }
            }
        },

        validators:{},

        setRadius: function(val) {
            gidLib.setCookieVar("globalSession", "searchRadius", val);
            storeLocationsService.model.searchRadius = val;
        },

        eventHandlers: {
            /**
             * Method is called on the domReady event.
             *
             * Processing flow:
             * 1) This method fires an event before and after the executeApplicationProcessingRegistry.
             * "executeApplicationProcessingRegistryBegin" and "executeApplicationProcessingRegistryEnd"
             * 2) Then the method fires and event before and after the executeContentProcessingRegistry.
             * "executeContentProcessingRegistryBegin" and "executeContentProcessingRegistryEnd".
             * The siteWidePerformanceMonitor will capture these events and record delta time so that these
             * can be testable and recordable metrics.
             */
            domReadyHandler: function() {
                if (personalizationService.model.isPersonalizationDataReady) {
                    merchLocationsManager.controller.eventHandlers.personalizationDataReadyHandler();
                } else {
                    Event.observe(document, "personalizationData:ready", function() {
                        merchLocationsManager.controller.eventHandlers.personalizationDataReadyHandler();
                    });
                }
                
                Event.observe(document, 'merchLocator:highlightFistOn', merchLocationsManager.view.renderFistHighLight.curry($('findInStoreButtonBox')));
                Event.observe(document, 'merchLocator:highlightFistOff', merchLocationsManager.view.removeFistHighLight);
                
                merchLocationsManager.model.isDomReady = true;
                merchLocationsManager.model.isMerchLocationsManagerActive = true;
                document.fire("merchLocationsManager:ready");
            },
            /** Controller handler for for productPageReady Event
             *     Calls the view and updates any model information.
             *  Make the Ajax request to the storeLocations REST Service.
             *
             */
            personalizationDataReadyHandler: function() {
                if (merchLocationsManager.model.isMerchLocator) {
                    merchLocationsManager.view.initializeFistBoxOnProductPage();
                    $('findInStoreButton').observe('click', function (event) {
                        merchLocationsManager.view.storeLocationsListOverlay.open();
                    });
                }
                if (storeLocationsService.model.isModelReady) {
                	merchLocationsManager.controller.updateStores();
                } else {
                    Event.observe(document, "storeLocationsServiceModel:ready", function() {
                    	merchLocationsManager.controller.updateStores();
                  });
                }
            }
        },
        updateStores: function(){
        	storeLocationsService.controller.eventHandlers.getStoreLocationsDataHandlers.successHandler(merchLocationsManager.model.skuInfo);
        	merchLocationsManager.model.skuInfo = null;
        },
        
        isMerchLocatorActive: function() {
        	return $('findInStoreButton') !== null && $('findInStoreTabWindow').visible() && $('findInStoreButton').disabled === false;
        },
        
        handleUserInput: function(radius, postalCode, passFunc, failFunc){
			if(storeLocationsService.controller.validators.validatePostal(postalCode)) {
				passFunc(radius, storeLocationsService.controller.getFormattedPostalCode(postalCode));
			}else{
				failFunc();
			}
       },
       
       /**
		 * Function getting Japan Overlay based on the locale.
		 */
		getPostalCodeOverlaysByLocale : function(locale) {
			if (locale != null && locale == "ja_JP") {
				return merchLocationsManager.constants.templates.POSTAL_CODE_OVERLAY_JP;

			} else {
				return merchLocationsManager.constants.templates.POSTAL_CODE_OVERLAY;
			}

		}
	},
    

    view:{
        displayPostalCodeErrorMessage: function() {
        	$('errorPlaceholder').update(resourceBundleValues.storeLocations.validateUsCanMsg);
            $('postalCodeOverlayPostalCode').addClassName('errorBorder');
        },

        drawDistanceAndRadiusWidget: function(parentDiv, radius, postalCode, wrap) {
        	if($(parentDiv) == null) return;
        	
        	var output = merchLocationsManager.view.buildZipSearchDisplay(true, postalCode, radius, wrap);
        	$(parentDiv).update(output);
        	
            $$('.postalEdit').invoke('observe', 'click', function(event) {
                merchLocationsManager.view.postalCodeOverlay.open();
            });
        },

        buildStoresWithinXMilesText: function(radius, postalCode, wrap) {
            if (postalCode == null) {
                return resourceBundleValues.storeLocations.locNotFound;
            }
            
            if (currentLocaleCode != null && currentLocaleCode == "ja_JP"){
            	return resourceBundleValues.storeLocations.storesWithin +  postalCode + " " + resourceBundleValues.storeLocations.storesWithin2 + " " + radius + " " + resourceBundleValues.storeLocations.milesOf;
            }
            else if (wrap){	
            	return resourceBundleValues.storeLocations.storesWithin + " " + radius + " " + resourceBundleValues.storeLocations.milesOfWrapped + " " + postalCode;
            } else {
            	return resourceBundleValues.storeLocations.storesWithin + " " + radius + " " + resourceBundleValues.storeLocations.milesOf + " " + postalCode;
            }
        },

        buildEditLink: function(postalCode, editLinkId) {
            return (postalCode != null) ? merchLocationsManager.constants.templates.POSTAL_CODE_OVERLAY_EDIT_LINK.evaluate(
            		{id: editLinkId, brandId: brandConst.BRAND_ID, editText:resourceBundleValues.storeLocations.edit}) : "";
        },

        initializeFistBoxOnProductPage:function() {
            $('findInStoreButton').disabled = false;

            var zip = storeLocationsService.controller.getLocationInfo().zipForDisplay; 
            merchLocationsManager.view.drawDistanceAndRadiusWidget("findInStorePostalMsg", storeLocationsService.model.searchRadius, zip, true);
        },
        
        populateStoreList: function(hasValidSku) {
        	if(hasValidSku){
        		if ($('sizeAlertMessage')) $('sizeAlertMessage').update();
        		merchLocationsManager.view.storeLocationsListOverlay.refresh();
        	}
        },

        initializeFindInStoreOverlay: function() {
            var overlay = merchLocationsManager.constants.templates.STORE_LOCATIONS_OVERLAY.evaluate({
                id: merchLocationsManager.constants.FIST_OVERLAY_STORES_LIST,
                brandBadgePath: brandConst["BRAND" + brandConst.BRAND_ID + "_BADGE_CONTENT_PATH"],
                brandId: brandConst.BRAND_ID,
                brandCode: brandConst.BRAND_CODE,
                fistTitle: resourceBundleValues.storeLocations.fistTitle
            });
            $("bodyContainer").insert(overlay);
            
            merchLocationsManager.view.allowStylingBasedOnClientBrowser(merchLocationsManager.constants.FIST_OVERLAY_STORES_LIST);

            storeLocationsService.view.buildStoreListHeader($('storeResults'));
            
            productStyleService.controller.queryRestService();
            
            storeLocationsService.model.viewContainer = $("storeLocationsList");
            var zip = storeLocationsService.controller.getLocationInfo().zipForDisplay;
            merchLocationsManager.view.drawDistanceAndRadiusWidget("locationEdit", storeLocationsService.model.searchRadius, zip);

            new Draggable(merchLocationsManager.constants.FIST_OVERLAY_STORES_LIST,
                    { revert: false, handle: 'overlayHandle' });

            $('fistOverlayWindowClose').observe('click', function() {
                merchLocationsManager.view.storeLocationsListOverlay.close();
            });
            
            merchLocationsManager.view.centerElementOnScreen($(merchLocationsManager.constants.FIST_OVERLAY_STORES_LIST));
            merchLocationsManager.view.setFocusForAccessibility($('findInStoreOverlay_list'));
            
            reportingService.controller.viewManagers.findInStore.productPageOverlayViewManager.controller.getReportRequest();
        },
        setFocusForAccessibility: function(element){
        	 element.focus();
        },
        buildFistBoxCopy: function(isEnabled){
			var postalCode = storeLocationsService.controller.getLocationInfo().zipForDisplay;
			           
            return merchLocationsManager.view.buildZipSearchDisplay(isEnabled, postalCode, storeLocationsService.model.searchRadius, true);
        },
        
        buildZipSearchDisplay: function(isEnabled, postalCode, radius, wrap) {
        	if (typeof wrap == 'undefined') {
        		wrap = false;
        	}
        	
			if(!isEnabled) {
				return resourceBundleValues.storeLocator.onlyAvailableOnline;
			} else if (postalCode == null) { 
				return resourceBundleValues.storeLocations.locNotFound;
			} else {
	            var storesWithinMessage = merchLocationsManager.view.buildStoresWithinXMilesText(radius, postalCode, wrap);
	            var editLink = merchLocationsManager.view.buildEditLink(postalCode);
	            
	            return storesWithinMessage + ' ' + editLink;
			}
        },
        
        listStoresInRadius: function(){
            if ($('findInStoreOverlay_list')) {
                merchLocationsManager.view.populateStoreList(productStyleService.api.getSelectedSkuInfo().skuId != null);
            } else {
                merchLocationsManager.view.storeLocationsListOverlay.open();
            }
        },
        storeLocationsListOverlay: {
            open: function() {
            	if ($('findInStoreOverlay_list')) return;  // already open
            	
            	if (storeLocationsService.controller.getLocationInfo().zipForService == null) {
            		merchLocationsManager.view.postalCodeOverlay.open();
            		return;
            	}
            	
            	var page = merchLocationsManager.model.productPage;
            	
                productStyleService.api.populateModelFromProductPage( {
    	    		productId: page.objP.strProductId,
    	    		vendorId: page.objP.strVendorId,
    	    		variantId: page.strVariantId,
    	    		variantCatalogItemId: page.objV.strCatalogItemId,
    	    		hasVariants: page.objP.hasSplitVariants || page.objP.hasMergeVariants,

    	    		selectedStyleColorId: page.objP.arrayVariantStyles[page.strVariantId].arrayVariantStyleColors[page.selectedColor].strColorCodeId,
    	    		colorSwatchSelected: page.selectedColorName,
    	    		selectedDimension1Index : page.selectedSizeDimension1,
    	    		selectedDimension2Index : page.selectedSizeDimension2,
                    currentVariantName: page.objP.arrayVariantStyles[page.strVariantId].strVariantName
                });
                
                productStyleService.controller.callbacks.skuSelected = merchLocationsManager.api.refresh;
                productStyleService.controller.callbacks.afterUpdate = merchLocationsManager.api.afterProductStyleUpdate;
                
                merchLocationsManager.view.initializeFindInStoreOverlay();
            },
            refresh: function() {
            	merchLocationsManager.model.skuInfo = productStyleService.api.getSelectedSkuInfo();

            	if(merchLocationsManager.model.skuInfo && !merchLocationsManager.model.skuInfo.inList){
            		merchLocationsManager.controller.updateStores();
            	}else{
            		storeLocationsService.controller.getStoreLocationsData(merchLocationsManager.model.skuInfo, storeLocationsService.model.searchRadius);
            	}
            },
            close: function() {
            	productStyleService.api.onClose();
                $(merchLocationsManager.constants.FIST_OVERLAY_STORES_LIST).remove();
            },
            afterProductStyleUpdate: function() {
            	merchLocationsManager.view.centerElementOnScreen($(merchLocationsManager.constants.FIST_OVERLAY_STORES_LIST));
            	storeLocationsService.api.ie7HackForCorrectingMessagePosition();
            }
        },

        postalCodeOverlay: {
        	selectOption: function(elementName, value) {
        		for (var i=0; i<$(elementName).options.length; i++) {
        			if ($(elementName).options[i].text == value) {
        				$(elementName).selectedIndex = i;
        			}
        		}
        	},
        	
        	postalCodeEditClick: function (event) {
                Event.stop(event);
                merchLocationsManager.view.postalCodeOverlay.submit();
            },
            postalCodeEditEnterKey: function(event){
            	if(event.keyCode == Event.KEY_RETURN) {
            		merchLocationsManager.view.postalCodeOverlay.postalCodeEditClick(event);
            	}
            },
            open: function() {            	
            	if ($('postalCodeOverlay_edit'))             		
            		return;  // already open
            	          	
                var pCode = storeLocationsService.controller.getLocationInfo().zipForDisplay;
                if (pCode == null) {
                	pCode = '';
                }
                var overlayHTML =merchLocationsManager.controller.getPostalCodeOverlaysByLocale(currentLocaleCode).evaluate({
                    id: merchLocationsManager.constants.FIST_OVERLAY_EDIT,
                    postalCode: pCode,
                    milesOfPcode: resourceBundleValues.storeLocator.milesOfPcode,
                    brandId: brandConst.BRAND_ID,
                    titleText: resourceBundleValues.storeLocator.postalCodeEditTitle,
                    within: resourceBundleValues.storeLocator.within,
                    within2: resourceBundleValues.storeLocations.storesWithin2
                });

                /** This needs a switch between overlay or product page */
                if ($(merchLocationsManager.constants.FIST_OVERLAY_STORES_LIST)) {
                    $("storeLocationsListHeader").insert(overlayHTML);
                }
                else {
                    $("findInStoreButtonBox").insert(overlayHTML);
                }
                merchLocationsManager.view.postalCodeOverlay.selectOption('postalCodeOverlayMiles', storeLocationsService.model.searchRadius);
          		merchLocationsManager.view.setFocusForAccessibility($('postalCodeOverlay_edit'));
                
                $('postalCodeOverlaySubmit').observe('click', merchLocationsManager.view.postalCodeOverlay.postalCodeEditClick);
                $('postalCodeClose').observe('click', function () {
                    merchLocationsManager.view.postalCodeOverlay.close();
                });
                $('postalCodeOverlayPostalCode').observe('keypress', merchLocationsManager.view.postalCodeOverlay.postalCodeEditEnterKey); 
	            $('postalCodeOverlayMiles').observe('keypress', merchLocationsManager.view.postalCodeOverlay.postalCodeEditEnterKey);

                reportingService.controller.viewManagers.findInStore.zipCodeOverlayViewManager.controller.getReportRequest();
            },

            close: function() {
                $(merchLocationsManager.constants.FIST_OVERLAY_EDIT).remove();
            },

            submit: function() {
                var radius = $F("postalCodeOverlayMiles");
                var postalCode = $F("postalCodeOverlayPostalCode");

               merchLocationsManager.controller.handleUserInput(radius, postalCode, 
            		   merchLocationsManager.view.postalCodeOverlay.drawValidUserInput,
            		   merchLocationsManager.view.displayPostalCodeErrorMessage);
            },
            drawValidUserInput: function(radius, postalCode){
                merchLocationsManager.controller.setRadius(radius);
                gidLib.setCookieVar('globalSession', 'pcode', postalCode.toUpperCase());
                
                 if (currentLocaleCode == 'ja_JP') {
					postalCode = storeLocationsService.controller.getJPFormatPostalCode(postalCode);
				}
                
                merchLocationsManager.view.drawDistanceAndRadiusWidget("findInStorePostalMsg", radius, postalCode);
                merchLocationsManager.view.drawDistanceAndRadiusWidget("locationEdit", radius, postalCode);

                merchLocationsManager.view.postalCodeOverlay.close();

                merchLocationsManager.view.listStoresInRadius();
            }
        },
       
        centerElementOnScreen: function(element) {
        	var viewDimensions = document.viewport.getDimensions();
        	var scrollOffset = document.viewport.getScrollOffsets();
        	
        	var newX = Math.floor((viewDimensions.width / 2) - (element.getWidth() / 2) + scrollOffset.left);
        	var newY = Math.floor((viewDimensions.height / 2) - (element.getHeight() / 2) + scrollOffset.top);
        	
        	if (newX < 0) newX = 0;
        	if (newY < 0) newY = 0;
        	
        	element.setStyle({
        		top: newY + "px",
        		left: newX + "px"
        	});
        },
        
        renderFistHighLight: function(parentElement) {
        	if (merchLocationsManager.controller.isMerchLocatorActive()) {
        		var html = merchLocationsManager.constants.templates.FIST_HIGHLIGHT.evaluate({
        			checkStoreAvailability: resourceBundleValues.storeLocator.checkStoreAvailability
        		});
        		parentElement.insert(html);
        	}
        },
        
        removeFistHighLight: function() {
        	if ($('fistHighlight')) {
        		$('fistHighlight').remove();
        	}
        },
        
        allowStylingBasedOnClientBrowser: function(parentDiv) {
			if (clientBrowser.isFirefox) {
				$(parentDiv).addClassName('firefox');
			}
        }
    }
};

var merchLocationsManager = new MerchLocationsManager();
var productStyleService = new ProductStyleService();
productStyleProductPageView.buildFistBoxCopy = merchLocationsManager.view.buildFistBoxCopy;