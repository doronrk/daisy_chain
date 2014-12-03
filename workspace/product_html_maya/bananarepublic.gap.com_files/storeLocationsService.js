/**
 * This Service Class is concerned with displaying store locations information based on
 * inputs of postal code and product or sku ID's at different locations around the site.
 * @author Andrew Southwick, Nichole Shannon
 */
var StoreLocationsService = Class.create();
StoreLocationsService.prototype = {
	initialize: function() {
	},
	constants: {
		STORE_LOCATIONS_SERVICE_URL: "/resources/storeLocations/v1",
		CLIENTID: "gid",
		JP_POSTAL_CODE_LENGTH:7,
		
		SORT_FUNC_MAP: {},
		
		requestParameters : {
			PID_PARAMETER: "pid",
			SKU_ID_PARAMETER: "skuid",
			STORE_ID_PARAMETER: "storeid",
			SEARCH_RADIUS_PARAMETER: "searchRadius",
			LOCALE_PARAMETER: "locale",
			LATITUDE_PARAMETER: "lat",
			LONGITUDE_PARAMETER: "long",
			MOCK_DATA_PARAMETER: "isMockActive",
			POSTAL_CODE_SINGLE_STORE_PARAMETER : "store",
			GEO_PARAMETER: "geo",
            CLIENTID_PARAMETER: "clientid"
		},
		templates : {
            STORE_LOCATIONS_OVERLAY_STORE_LIST_ENTRY: new Template(
                    "<div id=\"store_#{storeId}\" class=\"storeLocationListEntry\" role=\"row\">" +
                    "	<div class=\"storeOrdinaryData clearfix\">" +
                    "		<div class=\"storeNameAndAddress\" role=\"rowheader\">" +
                    "			<span class=\"storeName\"><a class=\"storeNameLink\" id=\"storeLink_#{storeId}\" href=\"/customerService/store.do?storeid=#{storeId}\">#{storeName}<span class=\"screenreader\">, #{storeAvailability}.</span></a></span>" +
                    "			<span class=\"addressLine1\">#{addressLine1}</span>" +
                    "			<div class=\"storeCityGroup\">" +
                    "				<span class=\"cityName\">#{cityName}</span>, " +
                    "				<span class=\"stateProvinceCode\">#{stateProvinceCode}</span> " +
                    "				<span class=\"postalCode\">#{postalCode}</span>" +
                    "			</div>" +
                    "			<span class=\"screenreader\">phone number is</span>" +		
                    "			<span class=\"phoneNumber\">#{phoneNumber}</span>" +
                    "		</div>" +
                    "		<div class=\"storeHours\" role=\"gridcell\">#{storeHoursWeekday}</div>" +
                    "		<div class=\"fistDistance clearfix\">" +
                    "			<span class=\"storeDistance\" role=\"gridcell\">#{storeDistance} #{unitOfMeasure}</span>" +
                    "			<a id=\"mapDirections_#{storeId}\" href=\"javascript:void(0)\" class=\"mapDirectionsButton\">#{mapDirectionsMsg}</a>" +
                    "		</div>" +
                    "		#{availability}" +
                    "	</div>" +
                    "</div>"
            ),
            STORE_LOCATIONS_OVERLAY_STORE_LIST_ENTRY_CA: new Template(
                    "<div id=\"store_#{storeId}\" class=\"storeLocationListEntry\">" +
                    "	<div class=\"storeOrdinaryData clearfix\">" +
                    "		<div class=\"storeNameAndAddress\">" +
                    "			<span class=\"storeName\">#{storeName}<span class=\"screenreader\">, #{storeAvailability}.</span></span>" +
                    "			<span class=\"addressLine1\">#{addressLine1}</span>" +
                    "			<div class=\"storeCityGroup\">" +
                    "				<span class=\"cityName\">#{cityName}</span>, " +
                    "				<span class=\"stateProvinceCode\">#{stateProvinceCode}</span> " +
                    "				<span class=\"postalCode\">#{postalCode}</span>" +
                    "			</div>" +
                    "			<span class=\"phoneNumber\">#{phoneNumber}</span>" +
                    "		</div>" +
                    "		<div class=\"storeHours\">#{storeHoursWeekday}</div>" +
                    "		<div class=\"fistDistance clearfix\">" +
                    "			<span class=\"storeDistance\">#{storeDistance} #{unitOfMeasure}</span>" +
                    "			<a id=\"mapDirections_#{storeId}\" href=\"javascript:void(0)\" class=\"mapDirectionsButton\">#{mapDirectionsMsg}</a>" +
                    "		</div>" +
                    "		#{availability}" +
                    "	</div>" +
                    "</div>"
            ),
            STORE_LOCATIONS_OVERLAY_STORE_LIST_ENTRY_JP: new Template(
                    "<div id=\"store_#{storeId}\" class=\"storeLocationListEntry\">" +
                    "	<div class=\"storeOrdinaryData clearfix\">" +
                    "            <div class=\"storeNameAndAddressJP\">" +
                    "			<span class=\"storeName\"><a class=\"storeNameLink\" id=\"storeLink_#{storeId}\" href=\"/customerService/store.do?storeid=#{storeURL}\">#{storeName}<span class=\"screenreader\">, #{storeAvailability}.</span></a></span>" +
                    "               <span class=\"postalCode\">#{postalCode}</span>" +
                    "			<div class=\"storeCityGroup\">" +
                    "				<span class=\"cityName\">#{stateProvinceCode} #{cityName} #{addressLine1}</span> " +
                    "			<span class=\"addressLine1\">#{addressLine2}</span>" +
                    "			</div>" +
                    "			<span class=\"phoneNumber\">#{phoneNumber}</span>" +
                    "		</div>" +
                    "		<div class=\"storeHoursJP\">#{storeHoursWeekday}</div>" +
                    "		<div class=\"fistDistance clearfix\">" +
                    "			<span class=\"storeDistance\">#{storeDistance} #{unitOfMeasure}</span>" +
                    "			<a id=\"mapDirections_#{storeId}\" href=\"javascript:void(0)\" class=\"mapDirectionsButton\">#{mapDirectionsMsg}</a>" +
                    "		</div>" +
                    "		#{availability}" +
                    "	</div>" +
                    "</div>"
            ),
            AVAILABILITY: new Template("<div id='availability' role='gridcell'><div id='availabilityStatus' class='#{style}'>#{message}#{img}</div><div id='reserveInStore_#{storeId}' class='reserveInStore'>#{reserveInStoreButton}</div></div>"),
            STORE_LOCATIONS_OVERLAY_STORES_LIST: new Template(
                "	<div id=\"storeLocationsListHeader\" class=\"storeLocationsListHeader\">" +
                "    	<div id=\"sortByDiv\">" +
                "			<label for=\"sortBy\">#{sortBy}:</label>" +
                "			<select id=\"sortBy\">"+
                "				<option value='distance' #{distanceSelected}>#{sortByDistance}</option>"+
                "				<option value='availability' #{availabilitySelected}>#{sortByAvailability}</option></select>" +
                "		</div>" +
                "       <div id=\"locationEdit\"></div>" +
                "		<h5 class=\"screenreader\">Find in Store Results</h5>" +
                "    	<div id=\"storeLocationsColumns\" role=\"row\">" +
                "  			<div class=\"resultsHead store jp\" role=\"columnheader\">#{headerStores}</div>" +
                "			<div class=\"resultsHead hours jp\" role=\"columnheader\">#{headerHours}</div>" +
                "			<div class=\"resultsHead distance jp\" role=\"columnheader\">#{headerDistance}</div>" +
                "			<div id='availabilityHeader' class=\"resultsHead available\" role=\"columnheader\">#{headerAvailability}</div>" +
                "		</div>" +
                "	</div>" +
                "	<div id=\"storeLocationsList\" class=\"storeLocationsList\">" +
                "		<div id='sizeAlertMessage' aria-live='polite'>#{selectASize}</div>" +
                "	</div>" +
                "	<div id=\"storeLocationDirections\" class=\"storeLocationDirections\"></div>" +
                "	<div id='surveyLink'></div>" + 
                "	<div id=\"legalNotesMessage\"><span class='emphasize'>#{storeNote}</span> #{legalText}</div>"
            )
		},
    	INVENTORY_LEVELS: {
    		HIGH: {
    			message: resourceBundleValues.storeLocations.available,
    			style: 'available',
    			sortValue: 0
    		},
    		LIMITED: {
    			message: resourceBundleValues.storeLocations.limited,
    			style: 'limited',
    			sortValue: 0
    		},
    		LOW: {
    			message: resourceBundleValues.storeLocations.limited,
    			style: 'limited',
    			sortValue: 0
    		},
    		OUTOFSTOCK: {
    			message: resourceBundleValues.storeLocations.unavailable,
    			style: 'unavailable',
    			sortValue: 1
    		},
    		NA: {
    			message: resourceBundleValues.storeLocations.unavailable,
    			style: 'unavailable',
    			sortValue: 1
    		}
        }
	},
	constructors : {
		abstractLocatorManager : null
	},
	api: {
		ie7HackForCorrectingMessagePosition: function() {
			storeLocationsService.view.ie7HackForCorrectingMessagePosition();
		},
		findStoreById: function(storeId) {
			return storeLocationsService.model.storeDataMap[storeId];
		}
	},
	model: {
		isModelReady: false,
		countryCode: null,
		searchRadius: 25,
		jsonResponse: null,
		viewContainer: null,
		storeDataMap: {}
	},
	controller: {
		init: {
			main: function() {
				storeLocationsService.constants.SORT_FUNC_MAP = {
		    		distance: storeLocationsService.controller.sortStoreListByDistance,
		    		availability: storeLocationsService.controller.sortStoreListByAvailability
				};
				
				var sort = gidLib.getCookieVar('globalSession', 'fistDefaultSort');
				
				if (sort == undefined || sort === '') {
					sort = 'availability';
				}
				
				storeLocationsService.model.selectedSort = sort;
			}
		},

        requestHost: function () {
            return window.location.host;
        },

		/** Basic validation only.  */
		validators : {
			validatePostal: function(value){
				var regex = storeLocationsService.controller.getPostalCodeRegex();
				if (value == null)
					return false;
				
				var trimmedValue = value.strip();	
				return regex.test(trimmedValue);
			}
		},
		eventHandlers: {
			getStoreLocationsDataHandlers: {
				successHandler: function(skuInfo){
					storeLocationsService.view.render(skuInfo);
					storeLocationsService.controller.indexById(storeLocationsService.model.jsonResponse.storeLocationList);
				},
				exceptionHandler: function(){
					var log = loggingService.api.getLog();
					log.error("StoreLocationsService AJAX failure.");
				}
			},

            mouseOverLimitedBubbleHandler: function(message, event) {
				gidLib.rolloverBubble.openBubble(event,{content: message});
				var newTop =  Event.pointerY(event) - ($('rolloverBubbleContainer').getHeight() + 5) + "px" ;
				var newLeft = Event.pointerX(event) - 15 + "px";
				var newStyle = "z-index: 1001; top: "+ newTop + "; left: "+ newLeft +";";
				$('rolloverBubbleContainer').setStyle(newStyle);
            },
            
            sortBy: function(event) {
            	gidLib.setCookieVar('globalSession', 'fistDefaultSort', event.target.getValue());
            	storeLocationsService.model.selectedSort = event.target.getValue();
            	storeLocationsService.view.render();
            }
		},
		/**
		 * This method should get the postal code if available from the personalizationService object.
		 * If this object is not available in Pre-production environments then hard code a constant
		 * location postal code in the storeLocationsService.constants.DEFAULT_POSTAL_CODE as a temp
		 * measure for the 11.10 release.
		 */
		getStoreLocationsData: function(skuInfo, searchRadius) {
			var storeLocationsServiceURL = storeLocationsService.controller.getStoreLocationsServiceURL(skuInfo, searchRadius);
			var log = loggingService.api.getLog();
			log.debug("REST request URL",storeLocationsServiceURL);
			if(storeLocationsServiceURL){
				storeLocationsService.view.renderStoreListWaitingSpinner();
				
				new Ajax.Request( storeLocationsServiceURL,{
					method: "get",
					onSuccess: function(response){
						storeLocationsService.model.jsonResponse = response.responseJSON.storeLocations;
						
						storeLocationsService.model.isModelReady = true;
						storeLocationsService.controller.eventHandlers.getStoreLocationsDataHandlers.successHandler(skuInfo);
					},
					onFailure: function(response){
						storeLocationsService.model.jsonResponse = response.status;
						storeLocationsService.controller.eventHandlers.getStoreLocationsDataHandlers.exceptionHandler();
					}
				});
			}
		},
		/** 
		 * This method constructs the URL used to request the Store Locations REST service 
		 * The format of this URL MUST conform to: 
		 * /resources/storeLocations/v1/{countryCode:}/{postalCode:}/?foo=1&bar=2
		 * countryCode && postalCode are required, all additional parameters are optional at this point. 
		 * */
		getStoreLocationsServiceURL:function(skuInfo, searchRadius) {
			var sku = null;
			if(skuInfo && skuInfo.skuId){ //means this function has been called by merchLocationsManager
				sku = skuInfo.skuId;
			}
			var log = loggingService.api.getLog();
			var STORE_LOCATIONS_SERVICE_URL = storeLocationsService.constants.STORE_LOCATIONS_SERVICE_URL;
			var requestProtocol = null;
			var requestHost = storeLocationsService.controller.requestHost();
			if (window.location.protocol == "http:") {
				requestProtocol = "http:";
			} else {
				requestProtocol = "https:";
			}
			
			var countryCode = storeLocationsService.controller.getCountryCodeFromPersonalizationServiceModel();
            var locationInfo = storeLocationsService.controller.getLocationInfo();
			var postalCode = locationInfo.zipForService;
			var latitude = locationInfo.latitude;
			var longitude = locationInfo.longitude;
			
			if(postalCode == null && (latitude == null || longitude == null)){
				log.warn("No location information found.");
				return null;
			}
			
			if (countryCode == 'jp' || countryCode == 'JP') {
				postalCode = storeLocationsService.controller.getJPFormatPostalCode(postalCode);
			}
			var storeLocationsServiceURL = requestProtocol + "//" + requestHost + STORE_LOCATIONS_SERVICE_URL + "/" + countryCode + "/" + postalCode + "/";
			var queryParametersUrlFormatted = storeLocationsService.controller.getQueryParametersUrlFormatted(sku, searchRadius);
			if (queryParametersUrlFormatted !== null) {
				storeLocationsServiceURL = storeLocationsServiceURL + "?" + queryParametersUrlFormatted;
			}
			return storeLocationsServiceURL;
		},
		/** 
		 * Japan market replaces spaces with an empty string
		 * */
		getJPFormatPostalCode : function(postalCode) {
			var postalCode = postalCode.replace(/\s+/g, '');
			if (postalCode.length == storeLocationsService.constants.JP_POSTAL_CODE_LENGTH) {
				postalCode = postalCode.substring(0, 3) + '-'+ postalCode.substring(3, 7);
			}
			return postalCode;
		},
		/** 
		 * Get any query parameters and append the REST URL string with these params
		 * */
		getQueryParametersUrlFormatted: function(selectedSkuId, searchRadius) {
			var constants = storeLocationsService.constants.requestParameters;
			var queryParameters = [];
			var skuParameter = gidLib.getQuerystringParam(constants.SKU_ID_PARAMETER, true);

			var currentLocale = brandConst.BRAND_LOCALE;
			var mockDataParameter = gidLib.getQuerystringParam(constants.MOCK_DATA_PARAMETER, true);
			var latitude = storeLocationsService.controller.getLocationInfo().latitude;
			var longitude = storeLocationsService.controller.getLocationInfo().longitude;

            queryParameters.push(constants.SEARCH_RADIUS_PARAMETER + "=" + searchRadius);
			
			var skuParameterEncoded = null;
			if (selectedSkuId != null) {
				skuParameterEncoded = encodeURIComponent(selectedSkuId);
			} else if (skuParameter != null && skuParameter != "") {
				skuParameterEncoded = encodeURIComponent(skuParameter);
			}
			if (skuParameterEncoded != null) {
				queryParameters.push(constants.SKU_ID_PARAMETER + "=" + skuParameterEncoded);
			}
			if (currentLocale != null && currentLocale != "") {
				var localeParameterEncoded = encodeURIComponent(currentLocale);
				queryParameters.push(constants.LOCALE_PARAMETER + "=" + localeParameterEncoded);
			}
			if (mockDataParameter != null && mockDataParameter != "") {
				var mockDataParameterEncoded = encodeURIComponent(mockDataParameter);
				queryParameters.push(constants.MOCK_DATA_PARAMETER + "=" + mockDataParameterEncoded);
			}

			if (latitude != null && longitude != null) {
				var latitudeParameterEncoded = encodeURIComponent(latitude);
				var longitudeParameterEncoded = encodeURIComponent(longitude);
				queryParameters.push(constants.LATITUDE_PARAMETER + "=" + latitudeParameterEncoded);
				queryParameters.push(constants.LONGITUDE_PARAMETER + "=" + longitudeParameterEncoded);
			}

            queryParameters.push(constants.CLIENTID_PARAMETER + "=" + storeLocationsService.constants.CLIENTID);
			
			return queryParameters.join("&");
		},
		
		getSelectedSkuId: function() {
			var selectedSkuId = null;
			if (window["productPage"]) {
				var isSkuSelected = false;
				var intSizeDimensionsCount = productPage.objV.objStyleSizeInfo.intSizeDimensionsCount;
				if ((intSizeDimensionsCount == 1) && (productPage.selectedSizeDimension1 != -1)) {
					isSkuSelected = true;
				} else if ((intSizeDimensionsCount == 2) && (productPage.selectedSizeDimension1 != -1) && (productPage.selectedSizeDimension2 != -1)) {
					isSkuSelected = true;
				}
				if (isSkuSelected) {
					if (productPage.objV.objStyleSizeInfo.intSizeDimensionsCount >= 1) {
						var strColorId = productPage.objV.arrayVariantStyleColors[productPage.selectedColor].strColorCodeId;
						var strSize1Id = productPage.arrayAllSizeDimension1[productPage.selectedSizeDimension1].strId;
						var strSize2Id = "";
					}
					if (productPage.objV.objStyleSizeInfo.intSizeDimensionsCount == 2) {
						strSize2Id = productPage.arrayAllSizeDimension2[productPage.selectedSizeDimension2].strId;
					}
					var strSkuId = productPage.objV.arrayVariantSkus[strColorId + "_" + strSize1Id + "_" + strSize2Id].strSkuId;
					if (strSkuId) {
						if (strSkuId.length > 0) {
							selectedSkuId = strSkuId;
						}
					}
				}
				return selectedSkuId;
			}
		},
		
		getLocationInfo: function() {
			var locationInfo = {
				zipForService: null,
				zipForDisplay: null
			};

			var cookieLocation = gidLib.getCookieVar('globalSession', 'pcode');
			var akamaiLocation = personalizationService.model.personalizationData.personalizationInfoV1.marketingMessageInfo.geoLocation;
            var countryCode = storeLocationsService.controller.getCountryCodeFromPersonalizationServiceModel();

            if (cookieLocation != null && cookieLocation != '') {
                locationInfo.zipForService = cookieLocation;
                locationInfo.zipForDisplay = cookieLocation;
                if (countryCode == 'jp' || countryCode == 'JP') {
                    locationInfo.zipForDisplay = storeLocationsService.controller.getJPFormatPostalCode(locationInfo.zipForDisplay);
                }
                if (countryCode === "ca" || countryCode === "CA"){
                    return storeLocationsService.controller.locationInfoForCA(locationInfo);
                }
			} else if (akamaiLocation != null) {
				var zipcodeMatches = akamaiLocation.match(/zip=([\d\w- ]+)/);
				
                try {
                    locationInfo.zipForDisplay = zipcodeMatches ? storeLocationsService.controller.getFormattedPostalCode(zipcodeMatches[1]) : undefined;

                  if (!storeLocationsService.controller.validators.validatePostal(locationInfo.zipForDisplay)) {
                      locationInfo.zipForDisplay = null;
                  }
                  locationInfo.zipForService = locationInfo.zipForDisplay;

                    if (countryCode === "ca" || countryCode === "CA"){
                      return storeLocationsService.controller.locationInfoForCA(locationInfo);
                  }
                } catch (error) {
                    return {
                        zipForService: null,
                        zipForDisplay: null
                    };
                }
            }

			return locationInfo;
		},

        locationInfoForCA: function(location) {
            if(location.zipForDisplay === storeLocationsService.constants.requestParameters.GEO_PARAMETER){
                return location;
            }
            return {
                "zipForService": location.zipForService.substring(0,3).toUpperCase(),
                "zipForDisplay": location.zipForDisplay.toUpperCase()
            }
        },

		pluckSingleZip: function(postalcode){
			var zip = postalcode.match(/^\d{5}/);
			if (zip) return zip[0].toUpperCase();
			
			return null;
		},

		pluckFirstValidPostalCode: function(postalcode){
			var pcode = postalcode.match(/^([a-ceghj-npr-tvxy]\d[a-ceghj-npr-z]) ?(\d[a-ceghj-npr-z]\d)?/i);
			var formattedCode = pcode[1];
			if (pcode[2]) formattedCode += ' ' + pcode[2];
			formattedCode = formattedCode.toUpperCase();
			
			return formattedCode;
		},
		pluckFormattedJPPostalCode: function(postalcode){
			return postalcode;
		},
		/**
		 * Country code is required by the REST service
		 * Retrieve this from the personalizationService
		 * TODO: set this in the client via dropdown list for Europe market in the future? */
		getCountryCodeFromPersonalizationServiceModel: function(){
			var cCode = null;
			var countryCode = personalizationService.model.personalizationData.personalizationInfoV1.userContext.globalShippingCountryCode;
			/* Get postal code from Akemi header which is stored in the personalizationService geoLocation object */
			if(countryCode){
				cCode = countryCode;
			}
			/* Else no postal code is available (edge case) */
			else{
				cCode = null;			
			}
			storeLocationsService.model.countryCode = cCode;
			return cCode;
		}, 
		
		sortStoreListByDistance: function(storeList) {
			if (!storeList) return storeList;
			
			return storeList.sortBy(function(store) {
				return (parseFloat(store.storeDistance) * 1000) + storeLocationsService.constants.INVENTORY_LEVELS[store.inventoryStatusCode].sortValue; 
			});
		},
		
		sortStoreListByAvailability: function(storeList) {
			if (!storeList) return storeList;
			
			return storeList.sortBy(function(store) {
				return (storeLocationsService.constants.INVENTORY_LEVELS[store.inventoryStatusCode].sortValue * 1000) + parseFloat(store.storeDistance);
			});
		},
		
		storeListHasOneOrZeroStores: function(storeList) {
			return (!storeList || storeList.length === 1 || storeList.length === 0);
		},
		arrayified: function(obj){
			if(obj && !Object.isArray(obj)){
				 obj = new Array(obj);
			} 
			return obj;
		},
        
        valueOrEmptyString: function(value){
        	return (typeof(value) != "undefined") ? value : "";
        },
        
        sortStores: function(sortOn, storeList) {
        	return storeLocationsService.constants.SORT_FUNC_MAP[sortOn](storeList);
        },
        
        getCurrentMarket: function() {
        	var US = 'us';
        	var CA = 'ca';
        	var JP = 'jp';
        	
        	var markets = {
        		1: US, 2: US, 3: US, 4: US, 7: CA, 8: CA, 9: CA, 10: US, 24: JP, 25: JP	
        	};
        	
        	return markets[gidBrandSiteConstruct.currentBrandCode];
        },
        
        getPostalCodeRegex: function(){
        	var marketRegex = {
        			'us': /(^\d{5}(-\d{4})?$)/,
        			'ca': /^[a-ceghj-npr-tvxy]\d[a-ceghj-npr-z]( )?(\d[a-ceghj-npr-z]\d)?$/i,
        			'jp': /(^\d{3}[- ](\d{4})?$)|(^\d{3}(\d{4})?$)/
        	};
        	return marketRegex[storeLocationsService.controller.getCurrentMarket()];
        },
        getFormattedPostalCode: function(value){
        	var marketRules = {
        		'us': storeLocationsService.controller.pluckSingleZip,
        		'ca': storeLocationsService.controller.pluckFirstValidPostalCode,
        		'jp': storeLocationsService.controller.pluckFormattedJPPostalCode
        	};
        	return marketRules[storeLocationsService.controller.getCurrentMarket()](value);
        },
        
		/**
		 * Function getting Overlays based on the market code.
		 */
		getStoreOverlaysByMarket : function(countryCode) {
			if (countryCode == 'jp' || countryCode == 'JP') {
				return storeLocationsService.constants.templates.STORE_LOCATIONS_OVERLAY_STORE_LIST_ENTRY_JP;
      } else if (countryCode == 'ca') {
				return storeLocationsService.constants.templates.STORE_LOCATIONS_OVERLAY_STORE_LIST_ENTRY_CA;
			} else {
				return storeLocationsService.constants.templates.STORE_LOCATIONS_OVERLAY_STORE_LIST_ENTRY;
			}
		},
		
		indexById: function(storeData) {
			
			if (!Object.isArray(storeData)) {
				storeData = $A([storeData]);
			}
			
			storeData.each(function(storeInfo) {
				storeLocationsService.model.storeDataMap[storeInfo.storeId] = storeInfo; 
			});
		},
		
		availabilityReportingValue: function(storeList) {
			var isGreen = storeList.any(function(store) { return store.inventoryStatusCode === 'HIGH';});
			if (isGreen) return 'Green: Available';			

			var isYellowLimited = storeList.any(function(store) { return store.inventoryStatusCode === 'LIMITED';});
			if (isYellowLimited) return 'Yellow: Limited';
			
			var isYellowLow = storeList.any(function(store) { return store.inventoryStatusCode === 'LOW';});
			if (isYellowLow) return 'Yellow: Low';
			
			return 'Red: Unavailable';
		}
	},
	/**
	 * All view methods typically go in the appropriate Managers unless truly
	 * universal to all
	 */
	view:{
        render: function(skuInfo) {
        	var storeLocations = (storeLocationsService.model.jsonResponse)? storeLocationsService.controller.arrayified(storeLocationsService.model.jsonResponse["storeLocationList"]): null;
        	var storeList = storeLocationsService.controller.sortStores(storeLocationsService.model.selectedSort, storeLocations);
            var listHtml = storeLocationsService.view.buildStoreList(skuInfo, storeList);
            
            if (storeLocationsService.model.jsonResponse) {
            	$('availabilityHeader').update(resourceBundleValues.storeLocations.headerAvailability + '<br/><div class="updatedAvailability">' 
            			+ resourceBundleValues.storeLocations.updatedAvailability + '</div>');
            	
            	var disableSortBy = storeLocationsService.controller.storeListHasOneOrZeroStores(storeList);
            	$('sortBy').disabled = disableSortBy;
            	if (disableSortBy) {
            		$('sortByDiv').addClassName('disabled');
            	} else {
            		$('sortByDiv').removeClassName('disabled');
            	}
            }
        	
            $("storeLocationsList").update(listHtml);
            $$('#storeLocationsList > *').invoke('hide');
            $$('#storeLocationsList > *').invoke('appear', { duration: 0.5 }); 
            
        	$$('.limitedBubble[reservable=false]').invoke('observe', 'mouseover', storeLocationsService.controller.eventHandlers.mouseOverLimitedBubbleHandler.curry(resourceBundleValues.storeLocator.limitedBubble)); 
        	$$('.limitedBubble[reservable=true]').invoke('observe', 'mouseover', storeLocationsService.controller.eventHandlers.mouseOverLimitedBubbleHandler.curry(resourceBundleValues.storeLocator.limitedBubbleReservable)); 
            
            $$('.limitedBubble').invoke('observe', 'mouseout', function(event) {
				gidLib.rolloverBubble.closeBubble();
			}); 
            
            $$('div.reserveInStore > button').invoke('observe', 'click', function(event) {
            	reserveInStoreManager.api.open($('bodyContainer'), event.element(), $(productStyleService.constants.PRODUCT_IMAGE_ID).src);
            });
            
            reportingService.controller.viewManagers.findInStore.findInStoreAvailabilityViewManager.controller.getReportRequest({
            	eVars: {
            		63: storeLocationsService.controller.availabilityReportingValue(storeList)
            	}
            });
            $('storeLocationsList').fire('findInStore:storeListRendered');
        },
        
        convertToTwelveHourTime: function(twentyFourHourHour) {
        	var twelveHour = {};
        	if (twentyFourHourHour <= 11) {
        		twelveHour.period = 'am';
        		twelveHour.value = parseInt(twentyFourHourHour, 10);
        		if (twelveHour.value == 0) twelveHour.value = 12;
        	} else {
        		twelveHour.period = 'pm';
        		twelveHour.value = parseInt(twentyFourHourHour, 10);
        		if (twelveHour.value > 12) twelveHour.value -= 12;
        	}
        	
        	return twelveHour;
        },
        
        shouldShowReserveInStore: function (storeAcceptsReservations, skuReservable) {
        	return environmentModelValues.isReserveInStoreActive.toLowerCase() === 'true' && 
        	storeAcceptsReservations && storeAcceptsReservations.toLowerCase() === 'true' &&
        	skuReservable && skuReservable.toLowerCase() === 'true';
        },
        
        renderReserveInStoreButton: function(storeAcceptsReservations, skuReservable, availabilityCode, storeId) {
        	if (storeLocationsService.view.shouldShowReserveInStore(storeAcceptsReservations, skuReservable)) {
        		return '<button storeId="' + storeId + '" inventoryStatus="' + availabilityCode + '" class="btn">' + resourceBundleValues.reserveInStore.featureButtonLabel + '</button>';
        	}
        	return '';
        },
        
        buildAvailabilityView: function(availabilityCode, storeAcceptsReservations, skuReservable, storeId) {
            var inventoryLevel = storeLocationsService.view.getInventoryLevel(availabilityCode);
            var img;
            var countryCode = storeLocationsService.controller.getCountryCodeFromPersonalizationServiceModel();	
            var reserveInStoreButton = storeLocationsService.view.renderReserveInStoreButton(storeAcceptsReservations, skuReservable, availabilityCode, storeId);
            var reservable = reserveInStoreButton !== '';
            
            if(countryCode == 'jp' || countryCode == 'JP')
			{
            	img = (availabilityCode == "LOW")? " <img id='limitedBubble"+ storeId +"' class='limitedBubble' src='/gid/assets/customerService/storeLocator/en/icon_bubble_jp.gif' />": "";
			}
            else
            {
            	img = (availabilityCode == "LOW")? " <img id='limitedBubble"+ storeId +"' class='limitedBubble' src='/gid/assets/customerService/storeLocator/en/icon_bubble.gif' reservable='" + reservable + "'/>": "";	
            }
            
            
        	return storeLocationsService.constants.templates.AVAILABILITY.evaluate({
        		message: inventoryLevel.message,
        		style: inventoryLevel.style,
        		img: img,
        		storeId: storeId,
        		reserveInStoreButton: reserveInStoreButton
        	});
        },

        getInventoryLevel: function(availabilityCode) {
            if (!availabilityCode || availabilityCode == '0') {
                availabilityCode = 'NA';
            }

            var INVENTORY_LEVELS = storeLocationsService.constants.INVENTORY_LEVELS;
            if (!INVENTORY_LEVELS[availabilityCode]) {
                throw 'Error! Invalid inventory status code: "' + availabilityCode + '"';
            }

            return INVENTORY_LEVELS[availabilityCode];
        },
        
        formatOneDayStoreHours: function(dayAndHours) {
        	var day = dayAndHours.substring(0, 4);
        	var hours = dayAndHours.substring(5);
        	
        	return '<span class="hoursListDay">' + day + '</span>' + hours;
        },

        renderStoreLocationHours:function(storeHours, storeId){
        	var html = '';
          var hours = (typeof storeHours === "string" ? [storeHours] : storeHours || []);
          var size = hours.length;

        	if(hours && size > 0){
        		html = "<ul id='storeLocationsHours_" + storeId + "'>";
        		for(var i = 0; i < size; i++){
        			html += "<li>" + storeLocationsService.view.formatOneDayStoreHours(hours[i]) + "</li>";
        		}
        		html += "</ul>";
        	}
        	return html;
        },
        
        buildStoreList:function(skuInfo, storeList) {
            storeList = storeLocationsService.controller.arrayified(storeList);
            
            var unavailableMessage = "<div id='sizeAlertMessage'>" + resourceBundleValues.storeLocator.unavailableInStores + "</div>";
            var noStoresMessage = "<div id='sizeAlertMessage'>" + resourceBundleValues.storeLocator.noStoresInList + "</div>";
            
            if (skuInfo && !skuInfo.inList) {
            	return unavailableMessage;
            }
            
            if (storeList == null || storeList.length < 1) {
            	return noStoresMessage;
            } 
            
           	//var storeLocationsHTML = storeList.collect(storeLocationsService.view.renderStoreLine).join('');
            
            //var storeLocationsHTML = storeList.collect(function(store) {
//       			return storeLocationsService.view.renderStoreLine(store,skuInfo);
//       	}).join('');

            var storeLocationsHTML = '';
           	storeList.each(function(store) {
           		storeLocationsHTML = storeLocationsHTML + storeLocationsService.view.renderStoreLine(store,skuInfo.reservable);
           	});
           	
            return storeLocationsHTML;
        },
        
        renderStoreLine: function(store,skuReservable) {
            var storeId = storeLocationsService.controller.valueOrEmptyString(store.storeId);
            var storeHours = storeLocationsService.view.renderStoreLocationHours(store.storeHours, storeId);
            var countryCode = storeLocationsService.controller.getCountryCodeFromPersonalizationServiceModel();	
            
            return  storeLocationsService.controller.getStoreOverlaysByMarket(countryCode).evaluate({
                storeId: storeId,
                storeName: storeLocationsService.controller.valueOrEmptyString(store.storeName),
                storeURL: storeLocationsService.controller.valueOrEmptyString(store.storeURL),
                addressLine1: storeLocationsService.controller.valueOrEmptyString(store.storeAddress.addressLine1),
                addressLine2: storeLocationsService.controller.valueOrEmptyString(store.storeAddress.addressLine2),
                cityName: storeLocationsService.controller.valueOrEmptyString(store.storeAddress.cityName),
                stateProvinceCode: storeLocationsService.controller.valueOrEmptyString(store.storeAddress.stateProvinceCode),
                postalCode: storeLocationsService.controller.valueOrEmptyString(store.storeAddress.postalCode),
                phoneNumber: storeLocationsService.controller.valueOrEmptyString(store.storeAddress.phoneNumber),
                storeHoursWeekday:storeLocationsService.controller.valueOrEmptyString(storeHours),
                storeDistance: storeLocationsService.controller.valueOrEmptyString(store.storeDistance),
                unitOfMeasure: resourceBundleValues.storeLocator.unitOfMeasure,
                mapDirectionsMsg: resourceBundleValues.storeLocations.mapDirectionsMsg,
                availability: storeLocationsService.view.buildAvailabilityView(store.inventoryStatusCode, store.canTakeReservation, skuReservable, storeId),
                storeAvailability: storeLocationsService.view.getInventoryLevel(store.inventoryStatusCode).message
            });
        },
        
        ie7HackForCorrectingMessagePosition: function() {
        	if($('sizeAlertMessage')){
        		$('sizeAlertMessage').hide().show();
        	}
        },
        
        buildStoreListHeader: function(containerElement) {
            var html = storeLocationsService.constants.templates.STORE_LOCATIONS_OVERLAY_STORES_LIST.evaluate({
                sortBy: resourceBundleValues.storeLocations.sortBy,
                headerStores: resourceBundleValues.storeLocations.headerStores,
                headerHours: " " + resourceBundleValues.storeLocations.headerHours,
                headerDistance: resourceBundleValues.storeLocations.headerDistance,
                headerAvailability: resourceBundleValues.storeLocations.headerAvailability,
                selectASize: resourceBundleValues.storeLocator.selectASize,
                distanceSelected: storeLocationsService.model.selectedSort == 'distance' ? 'selected="selected"' : '',
                availabilitySelected: storeLocationsService.model.selectedSort == 'availability' ? 'selected="selected"' : '',
                storeNote: resourceBundleValues.storeLocator.legalPleaseNote,
                legalText: resourceBundleValues.storeLocator.legalText,
                sortByDistance: resourceBundleValues.storeLocations.headerDistance,
                sortByAvailability: resourceBundleValues.storeLocations.headerAvailability
            });
            
            containerElement.update(html);
            
            $('sortBy').disabled = true;
            $('sortByDiv').addClassName('disabled');
            $('sortBy').observe('change', storeLocationsService.controller.eventHandlers.sortBy);
        },
        
    	renderStoreListWaitingSpinner: function() {
    		$('storeLocationsList').update('<img id="spinner" src="/assets/common/navigation/en_US/loadIndicator32.gif"/>');
    	}
	}
};

var storeLocationsService = new StoreLocationsService();
storeLocationsService.controller.init.main();
