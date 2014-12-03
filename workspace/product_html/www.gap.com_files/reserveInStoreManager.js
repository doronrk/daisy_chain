var ReserveInStoreManager = Class.create();

ReserveInStoreManager.prototype = {
    initialize: function() {
    },
	constants: {
		templates: {
			MAIN_OVERLAY: new Template('<div id="reserveInStoreOverlay" class="#{brandCode}">' +
										'	<div id="risTitleBar" class="risOverlayHandle" tabindex="0">' +
										'		<div id="risBrandLogo"></div>' +
										'		<div id="risCloseButton"><img id="risCloseButtonImg" alt="close" role="button" class="universalButtonSprite universalButtonSpriteQuickLookClose" src="/assets/common/clear.gif"></div>' +
										'		<div id="risTitleMessage" role="heading" aria-level="4">#{title}</div>' +
										'	</div>' +
										'	<div id="risMain">' +
										'		<div id="risLeft">' +
										'			<div id="risProductInfo">#{productInfo}</div>' +
										'			<div id="risStoreInfo">#{storeInfo}</div>' +
										'		</div>' +
										'		<div id="risRight">' +
										'			<div id="risForm" role="application"  aria-labelledby="risDescribeMe">' +
										'				<div id="risDescribeMe" tabindex="0" aria-labelledby="risHeader risInfo hiddenDisclaimer">' +
										'					<div id="risHeader" class="risHeader">#{header}</div>' +
										'					<div id="risInfo" class="risInfo">#{info}</div>' +
										'					<div id="hiddenDisclaimer" class="screenreader">#{holdMessage}</div>' +
										'				</div>' +
										'				<img id="risSpinner" src="/assets/common/navigation/en_US/loadIndicator32.gif" />' +
										'				<div id="risUserInput">' +
										'					<div id="risFirstNameField">' +
										'						<div id="risFirstNameError" class="risErrorMessage notShownTakesSpace" aria-live="polite">#{firstNameError}</div>' +
										'						<label for="risFirstName">#{firstNameLabel}</label><input id="risFirstName" type="text" role="textbox" placeholder="#{required}" aria-required="true" maxlength="30" />'+
										'					</div>' +
										'					<div id="risLastNameField">' +
										'						<div id="risLastNameError" class="risErrorMessage notShownTakesSpace" aria-live="polite" >#{lastNameError}</div>' +
										'						<label for="risLastName">#{lastNameLabel}</label><input id="risLastName" type="text" role="textbox" placeholder="#{required}" aria-required="true" maxlength="30" />' +
										'					</div>' +
										'					<div id="risEmailField">' +
										'						<div id="risEmailError" class="risErrorMessage notShownTakesSpace" aria-live="polite">#{emailError}</div>' +
										'						<label for="risEmail">&#8224; #{emailLabel}</label><input id="risEmail" type="text" placeholder="#{required}" aria-required="true" aria-describedby="risLegalMessage" maxlength="50" />' +
										'					</div>' +
										'					<div id="risMobileNumberField" class="noSMS">' +
										'						<div id="risTextOption" class="risCheckBoxContainer">' +
										'							<input id="risSendText" type="checkbox" aria-required="false" aria-labelledby="risSendTextLabel" class="risCheckBox"/> <div id="risSendTextLabel" class = "risCheckBoxLabel">#{textMessage}</div>' +
										'						</div>' +
										'						<div id="risMobileNumberError" class="risErrorMessage notShownNoSpace" aria-live="polite">#{mobileError}</div>' +
										'						<div id="risMobileInnerGrouping">' +
										'							<div id="risMobileLabelContainer">' +
										'								<label for="risMobileNumber" class="grayable">&#8224; #{mobileNumberLabel}</label> ' +
										'							</div>' +
										'							<div id="risMobileInputContainer">' +
										'								<input id="risMobileNumber" type="text" placeholder="#{includeAreaCode}" maxlength="12" aria-describedby="risLegalMessage risDataRatesMessage " aria-required="false" disabled />' +
										'								<div id="risDataRatesMessage" class="grayable">#{dataRatesMessage}</div>' +
										'							</div>' +
										'						</div>' +
										'					</div>' +
                   	'       		<div id="risOptInOption" class="risCheckBoxContainer">' +
                    '          		<input id="risOptIn" type="checkbox" aria-required="false" aria-labelledby="risOptInLabel"  class="risCheckBox"/> <div id="risOptInLabel" class="risCheckBoxLabel">#{optInMessage}</div>' +
                    '       		</div>' +
										'			    	<div id="risSpecialHandlingOption" class="risCheckBoxContainer">' +
										'		    			<input id="risSpecialHandling" type="checkbox" aria-required="false" aria-labelledby="risSpecialHandlingLabel" class="risCheckBox"/><div id="risSpecialHandlingLabel" class="risCheckBoxLabel">#{specialHandling}</div>' +
										'	    			</div>' +
										'				</div>' +
										'				<div id="risReserveOrCancel">' +
										'					<button id="risReserveButton" type="button" class="btn">#{reserveButtonLabel}</button> #{buttonSeperator} <a id="risCancelButton" role="button">#{cancelButtonLabel}</a>' +
										'				</div>' +
										'				<div id="risLegalMessage">&#8224; #{legalMessage}</div>' +
										'			</div>' +
										'		</div>' +
										'	</div>' +
										'	<div id="risBottom">#{holdMessage}</div>' +
										'</div>'),
				THANK_YOU: new Template('<div id="thankYou" class="risThankYou #{openOrClosed}" aria-describedby="risHeader" aria-live="assertive" role="alert">' +
										'	<div class="risCenter">' +
										'		<div id="checkImage"><img src="/gid/assets/customerService/storeLocator/en/reserveInStore/icn-check.png" /></div>' +
										'		<div class="risHeader" id="risHeader">' +
										'			#{thanksHeaderLine1}<br/>' +
										'			#{thanksHeaderLine2}' +
										'		</div>' +
										'		<div id="risThanksOpener" class="risInfo">#{opener}</div>' +
										'	</div>' +
										'	<div class="risInfo">' +
										'		<div id="risInfoBody1" class="risThankYouBody">#{risInfoBody1}</div>' +
										'		<div id="risInfoBody2" class="risThankYouBody">#{risInfoBody2}</div>' +
										'		<div id="risInfoBody3" class="risThankYouBody">#{risInfoBody3}</div>' +
										'	</div>' +
										'	<div class="risCenter">' +
										'		<div id="risThanksCloser">#{closer}</div>' +
										'		<button id="risContinue" type="button" class="btn">#{continueButtonLabel}</button>' +
										'	</div>' +
										'</div>'),
			PRODUCT_INFO: new Template('<div id="risProductInfoTop">' +
										'	<img id="risProductImage" src="#{imageSrc}" alt="product image" />' +
										'	<div id="risProductDescription">#{description}</div>' +
										'</div>' +
										'<div id="risProductInfoBottom">' +
										'	<table>' +
										'		<tbody>' +
										'			<tr><td class="risProductInfoLabel">#{colorLabel}</td><td class="risProductInfoValue">#{color}</td></tr>' +
										'			#{sizeRow}' +
										'			<tr><td class="risProductInfoLabel">#{priceLabel}</td><td class="risProductInfoValue">#{price}</td></tr>' +
										'		</tbody>' +
										'	</table>' +
										'</div>'),
			STORE_INFO: new Template('<div aria-labelledby="risYouveSelected risStoreInfoName" role="dialog">' +
					'<div id="risYouveSelected">#{youveSelected}</div>' +
					'<div id="risStoreBox">' +
					'	<div id="risStoreInfoBrandLogoBox">' +
					'		<img id="risStoreInfoBrandLogo" src="/assets/customerService/storeLocator/logo32x32.gif" />' +
					'	</div>' +
					'	<div id="risStoreAddress">' +
					'		<div id="risStoreInfoName"><a href="/customerService/store.do?storeid=#{storeId}">#{storeName}</a></div>' +
					'		<div id="risAddressLine1">#{addressLine1}</div>' +
					'		<div id="risAddressLine2">#{addressLine2}</div>' +
					'		<div id="risAddressCityState">#{addressCityState}</div>' +
					'	</div>' +
					'</div>' +
					'<div tabindex="0" aria-labelledby="risTryAnotherStore"><a id="risTryAnotherStore" class="risTryAnotherStore">#{tryAnotherStore}</a></div>' +
					'<div id="risStoreHours">' +
					'	<div id="risRegularHours">' +
					'		#{storeHoursLabel}<br/>' +
					'		#{storeHours}' +
					'	</div>' +
					'	#{specialHours}' +
					'</div>' +
					'</div>'),
			SIZE_ROW: new Template('<tr><td class="risProductInfoLabel">#{sizeLabel}</td><td class="risProductInfoValue">#{size} #{variantLabel}</td></tr>'),
			SPECIAL_HOURS: new Template('<div id="risSpecialHours" class="storeSpecialHours">' +
										'	<div class="storeHoursSpecialLabel">#{label}</div>' +
										'	<div class="storeHoursSpecial">#{hours}</div>' +
										'</div>'),
			FAILURE: new Template('<div id="risServiceError"><p class="pageError">#{header}</p><p>#{body}</p></div>'),
			OVER_CAPACITY_INFO_2: new Template(resourceBundleValues.reserveInStore.overCapacityInfoBody2),
			OVER_CAPACITY_INFO_3: new Template(resourceBundleValues.reserveInStore.overCapacityInfoBody3)
		}
	},
	model: {
		storeId: null,
		inventoryStatus: null,
		productImgUrl: null,
		ie7PoolResponseIntervalId: null,
		useHttpsForRISService: null,
		useCORSForSecureRISService: null
	},

	view: {
		setFocusForAccessibility: function(element) {
			element.focus();
		},

		variantNameForDisplay: function(dimensionIndex) {
			var variantName = productStyleFistOverlayView.getVariantNameForDimension(dimensionIndex);
			if (dimensionIndex !== 1 || variantName === resourceBundleValues.common.regularVariant) return '';

			return variantName;
		},

		buildIframeForWindowsPostMessage: function(){
			var cframe = "<div><iframe src='"+reserveInStoreManager.controller.buildPostMessageIframeURL()+"' id='hiddenIframeForAjax' scrolling='no'/></div>";
			$("reserveInStoreOverlay").insert(cframe);
			if (window.addEventListener) {
				window.addEventListener("message", reserveInStoreManager.controller.processReservationPostMessageEvent);
			} else {
				window.attachEvent("onmessage", reserveInStoreManager.controller.processReservationPostMessageEvent);
			}
		},

		/** Adds iframe necessary for non-CORS compatible browsers */
		loadHiddenIframeForCrossDomainAjax: function(){
			if ('withCredentials' in new XMLHttpRequest())  {
				//if CORS solution is enabled, then do CORS , otherwise load Iframes
				if(reserveInStoreManager.model.useCORSForSecureRISService){
					return;
				}
				// add iframe for doing windows.postMessage if we do not want to use CORS
				reserveInStoreManager.view.buildIframeForWindowsPostMessage();
			} else if (!!window.postMessage) {
				// add iframe accepting postMessage for IE 8 and 9
				reserveInStoreManager.view.buildIframeForWindowsPostMessage();
			} else {
				// add secure outer iframe for IE 7
				var cframe = "<div><iframe src='" + reserveInStoreManager.controller.secureUrlForCurrentBrand() + "/gid/html/en/ie7SecureIframeHack.html' id='securehiddenIframeForIE7' scrolling='no'/></div>";
				$("reserveInStoreOverlay").insert(cframe);
			}
		},

		buildSizeRows: function() {
			return [1, 2].collect(function(dimensionIndex) {
				var dimension = productStyleService.controller.getCurrentSizeDimensionInfo(dimensionIndex);
				if (dimension.selectedIndex > -1) {
					return reserveInStoreManager.constants.templates.SIZE_ROW.evaluate({
						sizeLabel: dimension.sizeDimensionLabelName,
						size: dimension.sizeOptions[dimension.selectedIndex].sizeOptionName,
						variantLabel: reserveInStoreManager.view.variantNameForDisplay(dimensionIndex)
					});
				}
			}).join('');
		},

		formatPrice: function(stringValue) {
			return resourceBundleValues.currency + parseFloat(stringValue).toFixed(2);
		},

		buildPrice: function(productStyleColorPrice) {
			if (productStyleColorPrice.currentMaxPrice === productStyleColorPrice.regularMaxPrice) {
				return reserveInStoreManager.view.formatPrice(productStyleColorPrice.currentMaxPrice);
			}

			return '<span class="priceDisplayStrike">' + reserveInStoreManager.view.formatPrice(productStyleColorPrice.regularMaxPrice) +
					'</span> <span class="priceDisplaySale">' + reserveInStoreManager.view.formatPrice(productStyleColorPrice.currentMaxPrice) +'</span>';
		},

		buildProductInfo: function() {
			return reserveInStoreManager.constants.templates.PRODUCT_INFO.evaluate({
				imageSrc: reserveInStoreManager.model.productImgUrl,
				description: productStyleService.model.productStyleName,
				itemLabel: resourceBundleValues.reserveInStore.itemLabel,
				colorLabel: resourceBundleValues.reserveInStore.colorLabel,
				priceLabel: resourceBundleValues.reserveInStore.priceLabel,
				item: '#' + productStyleService.model.productId,
				color: productStyleService.model.colorSwatchSelected,
				sizeRow: reserveInStoreManager.view.buildSizeRows(),
				price: reserveInStoreManager.view.buildPrice(productStyleService.controller.getCurrentStyleColors().get(productStyleService.model.selectedStyleColorId).productStyleColorPrice)
			});
		},

		buildStoreCityState: function(storeAddress) {
			return storeAddress.cityName + ', ' + storeAddress.stateProvinceCode + ' ' + storeAddress.postalCode;
		},

		buildSpecialHours: function(specialHours) {
			if (!specialHours) return '';
			if(specialHours && !Object.isArray(specialHours)){
				specialHours = new Array(specialHours);
			}

			var hoursFormated = specialHours.collect(function(hoursLine) {
				var splitLine = hoursLine.split(": ");
				return '<div class="specialHoursDate">' + splitLine[0] + ':</div><div class="specialHoursHours">' + splitLine[1] + '</div>';
			}).join('');

			return reserveInStoreManager.constants.templates.SPECIAL_HOURS.evaluate({
				label: resourceBundleValues.reserveInStore.specialHoursLabel,
				hours: hoursFormated
			});
		},

		buildStoreInfo: function(storeId) {
			return reserveInStoreManager.constants.templates.STORE_INFO.evaluate({
				storeId: storeId,
				youveSelected: resourceBundleValues.reserveInStore.youveSelected,
				storeName: storeLocationsService.model.storeDataMap[storeId].storeName,
				addressLine1: storeLocationsService.model.storeDataMap[storeId].storeAddress.addressLine1,
				addressLine2: storeLocationsService.model.storeDataMap[storeId].storeAddress.addressLine2,
				addressCityState: reserveInStoreManager.view.buildStoreCityState(storeLocationsService.model.storeDataMap[storeId].storeAddress),
				tryAnotherStore: resourceBundleValues.reserveInStore.tryAnotherStore,
				storeHoursLabel: resourceBundleValues.reserveInStore.storeHoursLabel,
				storeHours: storeLocationsService.view.renderStoreLocationHours(storeLocationsService.model.storeDataMap[storeId].storeHours, storeId),
				specialHours: reserveInStoreManager.view.buildSpecialHours(storeLocationsService.model.storeDataMap[storeId].storeSpecialHours)
			});
		},

		open: function(parentContainer, triggeredBy, productImgUrl) {
			merchLocationsManager.view.storeLocationsListOverlay.close();
			reserveInStoreManager.model.storeId = triggeredBy.getAttribute('storeId');
			reserveInStoreManager.model.inventoryStatus = triggeredBy.getAttribute('inventoryStatus');
			reserveInStoreManager.model.productImgUrl = productImgUrl;

			var overlayContents = reserveInStoreManager.constants.templates.MAIN_OVERLAY.evaluate({
				brandCode: brandConst.BRAND_ID,
				title: resourceBundleValues.reserveInStore.baseTitle + storeLocationsService.api.findStoreById(reserveInStoreManager.model.storeId).storeName,
				productInfo: reserveInStoreManager.view.buildProductInfo(),
				storeInfo: reserveInStoreManager.view.buildStoreInfo(reserveInStoreManager.model.storeId),
				required: resourceBundleValues.reserveInStore.required,
				header: resourceBundleValues.reserveInStore.needInfoHeader,
				info: resourceBundleValues.reserveInStore.emailMessage,
				firstNameLabel: resourceBundleValues.reserveInStore.firstNameLabel,
				firstNameError: resourceBundleValues.reserveInStore.firstNameError,
				lastNameLabel: resourceBundleValues.reserveInStore.lastNameLabel,
				lastNameError: resourceBundleValues.reserveInStore.lastNameError,
				emailLabel: resourceBundleValues.reserveInStore.emailLabel,
				emailError: resourceBundleValues.reserveInStore.emailError,
        		optInMessage: resourceBundleValues.reserveInStore.optInMessage,
				textMessage: resourceBundleValues.reserveInStore.textMessage,
				specialHandling: resourceBundleValues.reserveInStore.specialHandling,
				mobileNumberLabel: resourceBundleValues.reserveInStore.mobileNumberLabel,
				mobileError: resourceBundleValues.reserveInStore.mobileNumberError,
				includeAreaCode: resourceBundleValues.reserveInStore.includeAreaCode,
				dataRatesMessage: resourceBundleValues.reserveInStore.dataRatesMessage,
				reserveButtonLabel: resourceBundleValues.reserveInStore.reserveButtonLabel,
				buttonSeperator: resourceBundleValues.reserveInStore.buttonSeperator,
				cancelButtonLabel: resourceBundleValues.reserveInStore.cancelButtonLabel,
				legalMessage: resourceBundleValues.reserveInStore.legalMessage,
				holdMessage: resourceBundleValues.reserveInStore.holdMessage
			});

			parentContainer.insert(overlayContents);

			//Add hidden iframe to reseveInStoreOverlay which are not CORS supported
			//if ris service is not invoked in https, then there is no cross domain, so no need of CORS or iframes to make cross domain calls.
			if(reserveInStoreManager.model.useHttpsForRISService){
				reserveInStoreManager.view.loadHiddenIframeForCrossDomainAjax();
			}


			if (clientBrowser.isFirefox) {
				$('reserveInStoreOverlay').addClassName('firefox');
			}

			$('risStoreHours').hide();

			['risFirstName', 'risLastName', 'risEmail', 'risMobileNumber'].each(function(fieldName) {
				$(fieldName).value = gidLib.getCookieVar('globalSession', fieldName);
			});

			$('risSendText').checked = 'true' === gidLib.getCookieVar('globalSession', 'risSendText').toLowerCase();
			if ($('risSendText').checked) {
				$('risMobileNumberField').removeClassName('noSMS');
			}

      		if (gidLib.getCookie("customerId") || gidLib.getCookieVar('globalSession', 'risOptedIn')) {
        		$('risOptInOption').hide();
      		}

			if ($('risSendText').checked) {
				$('risMobileNumber').enable();
			}

            $('risReserveButton').observe('click', function (event) {
            	reserveInStoreManager.controller.submitForm();
            });

            var validate = function(event) {
            	reserveInStoreManager.controller.validateField(event.element());
            };

            ['change','blur'].each(function(eventName) {
            	$$('#risEmail, #risMobileNumber, #risFirstName, #risLastName').invoke('observe', eventName, validate);
            });

            $('risSendText').observe('click', function(event) {
            	if (event.element().checked === true) {
            		$('risMobileNumber').enable();
            		$('risMobileNumberField').removeClassName('noSMS');
            	} else {
            		$('risMobileNumber').disable();
            		$('risMobileNumber').value = '';
            		$('risMobileNumberField').removeClassName('withError');
            		$('risMobileNumberField').addClassName('noSMS');
            	}
            	reserveInStoreManager.view.supportPlaceholderInIe();
            });

            $('risCloseButton').observe('click', function (event) {
            	reserveInStoreManager.view.close();
            });

            $('risCancelButton').observe('click', function (event) {
            	reserveInStoreManager.view.close();
            });

            $('risTryAnotherStore').observe('click', function (event) {
            	reserveInStoreManager.view.close();
            	merchLocationsManager.view.storeLocationsListOverlay.open();
            });

            new Draggable('reserveInStoreOverlay', { revert: false, handle: 'risOverlayHandle' });
            merchLocationsManager.view.centerElementOnScreen($('reserveInStoreOverlay'));
            reserveInStoreManager.view.supportPlaceholderInIe();

            reportingService.controller.viewManagers.findInStore.reserveInStoreOverlayOpenViewManager.controller.getReportRequest();

            reserveInStoreManager.view.setFocusForAccessibility($('risTitleBar'));
		},

		close: function() {
			$('reserveInStoreOverlay').remove();
		},

		buildThanksHeaderLine1: function(firstName) {
			return resourceBundleValues.reserveInStore.thanksHeaderLine1MinusName.replace('#{NAME}', firstName.trim());
		},

		buildTomorrow: function(tomorrowDate) {
			var days = [
	            resourceBundleValues.common.sunday,
				resourceBundleValues.common.monday,
				resourceBundleValues.common.tuesday,
				resourceBundleValues.common.wednesday,
				resourceBundleValues.common.thursday,
				resourceBundleValues.common.friday,
				resourceBundleValues.common.saturday
			];

			var months = [
	            resourceBundleValues.common.january,
	            resourceBundleValues.common.february,
	            resourceBundleValues.common.march,
	            resourceBundleValues.common.april,
	            resourceBundleValues.common.may,
	            resourceBundleValues.common.june,
	            resourceBundleValues.common.july,
	            resourceBundleValues.common.august,
	            resourceBundleValues.common.september,
	            resourceBundleValues.common.october,
	            resourceBundleValues.common.november,
	            resourceBundleValues.common.december
			];
			// ex: "03/14/2013 11:49 AM"
			var dateParts = /^(\d\d)\/(\d\d)\/(\d{4})/.exec(tomorrowDate);
			var nextOpenDate = new Date(dateParts[3], dateParts[1] - 1, dateParts[2]);

			return days[nextOpenDate.getDay()] + ', ' + months[nextOpenDate.getMonth()] + ' ' + dateParts[2];
		},

		doChangesForThankYou: function() {
			if ($('risTryAnotherStore') !== null) $('risTryAnotherStore').remove();
			if ($('risBottom') !== null) $('risBottom').remove();
			if ($('risStoreHours') !== null) $('risStoreHours').show();
		},

		showThankYouMessage: function(firstName, response) {
			reserveInStoreManager.view.doChangesForThankYou();

			$('risTitleMessage').insert(resourceBundleValues.reserveInStore.titleRequestReceived);

			if (response.responseJSON.open !== 'false') {
				$('risRight').update(reserveInStoreManager.constants.templates.THANK_YOU.evaluate({
					openOrClosed: 'open',
					thanksHeaderLine1: reserveInStoreManager.view.buildThanksHeaderLine1(firstName),
					thanksHeaderLine2: resourceBundleValues.reserveInStore.thanksOpenHeaderLine2,
					opener: resourceBundleValues.reserveInStore.risOpenerOpen,
					risInfoBody1: resourceBundleValues.reserveInStore.risInfoBodyOpen1,
					risInfoBody2: resourceBundleValues.reserveInStore.risInfoBodyOpen2,
					risInfoBody3: resourceBundleValues.reserveInStore.risInfoBodyOpen3 + ' ' + reserveInStoreManager.view.buildTomorrow(response.responseJSON.nextOpenTime) + '.',
					closer: resourceBundleValues.reserveInStore.risCloserOpen,
					continueButtonLabel: resourceBundleValues.reserveInStore.continueButtonLabel
				}));
			} else {
				$('risRight').update(reserveInStoreManager.constants.templates.THANK_YOU.evaluate({
					openOrClosed: 'closed',
					thanksHeaderLine1: reserveInStoreManager.view.buildThanksHeaderLine1(firstName),
					thanksHeaderLine2: resourceBundleValues.reserveInStore.thanksClosedHeaderLine2,
					risInfoBody1: resourceBundleValues.reserveInStore.risInfoBodyClosed1,
					risInfoBody2: resourceBundleValues.reserveInStore.risInfoBodyClosed2,
					closer: resourceBundleValues.reserveInStore.risCloserClosed,
					continueButtonLabel: resourceBundleValues.reserveInStore.continueButtonLabel
				}));
			}

			if ($('risMain').getHeight() > $('thankYou').getHeight()) {
				$('thankYou').setStyle({height: ($('risMain').getHeight() - 18) + 'px'});
			}

            $('risContinue').observe('click', function (event) {
            	reserveInStoreManager.view.close();
            });
		},

		showOpenCloseFailure: function(firstName) {
			reserveInStoreManager.view.doChangesForThankYou();

			$('risTitleMessage').insert(resourceBundleValues.reserveInStore.titleRequestReceived);

			$('risRight').update(reserveInStoreManager.constants.templates.THANK_YOU.evaluate({
				openOrClosed: 'openCloseFailure',
				thanksHeaderLine1: reserveInStoreManager.view.buildThanksHeaderLine1(firstName),
				thanksHeaderLine2: resourceBundleValues.reserveInStore.openClosedServiceFailureHeader2,
				opener: resourceBundleValues.reserveInStore.risOpenerClosed,
				risInfoBody1: resourceBundleValues.reserveInStore.openClosedServiceFailureBody,
				closer: resourceBundleValues.reserveInStore.risCloserClosed,
				continueButtonLabel: resourceBundleValues.reserveInStore.continueButtonLabel
			}));

			// The -18 seems to be necessary to compensate because of some miscalculation of padding by the browser
			$('thankYou').setStyle({height: ($('risMain').getHeight() - 18) + 'px'});

            $('risContinue').observe('click', function (event) {
            	reserveInStoreManager.view.close();
            });
		},

		showFailure: function(message) {
			$('risRight').update(reserveInStoreManager.constants.templates.FAILURE.evaluate({
				header: resourceBundleValues.reserveInStore.reservationRequestFailureHeader,
				body: resourceBundleValues.reserveInStore.reservationRequestFailureBody
			}));
		},

		showInvalidFieldError: function(element) {
			$(element.id + 'Field').addClassName('withError');
			var errorMessage = $(element.id + 'Error').innerHTML;
			$(element.id + 'Error').update(errorMessage);
		},

		hideAllInvalidErrors: function() {
			$$('#risUserInput input[type=text]').each(function(element) {
				$(element.id + 'Field').removeClassName('withError');
			});
		},

		disableRisButton: function() {
			$('risReserveButton').disabled = true;
			$('risReserveButton').setOpacity(0.25);
		},

		enableRisButton: function() {
			$('risReserveButton').disabled = false;
			$('risReserveButton').setOpacity(1);
		},

		showSpinner: function() {
			$('risSpinner').setStyle({display: 'block'});
			$('risUserInput').setOpacity(0.25);
		},

		hideSpinner: function() {
			$('risSpinner').setStyle({display: 'none'});
			$('risUserInput').setOpacity(1);
		},

		supportPlaceholderInIe: function() {
			jQuery.placeholder.shim({color: '#b9b9b9'});
		},
		showBeyondStoreCapacity: function(firstName) {
			$('risTitleMessage').insert(resourceBundleValues.reserveInStore.overCapacityTitleExtension);

			$('risRight').update(reserveInStoreManager.constants.templates.THANK_YOU.evaluate({
				openOrClosed: 'overCapacity',
				thanksHeaderLine1: resourceBundleValues.reserveInStore.overCapacityHeaderLine1,
				thanksHeaderLine2: resourceBundleValues.reserveInStore.overCapacityHeaderLine2,
				opener: resourceBundleValues.reserveInStore.overCapacityOpener,
				risInfoBody1: resourceBundleValues.reserveInStore.overCapacityInfoBody1,
				risInfoBody2: reserveInStoreManager.constants.templates.OVER_CAPACITY_INFO_2.evaluate({
					storeId: reserveInStoreManager.model.storeId,
					storeName: storeLocationsService.model.storeDataMap[reserveInStoreManager.model.storeId].storeName,
					phoneNumber: storeLocationsService.model.storeDataMap[reserveInStoreManager.model.storeId].storeAddress.phoneNumber
				}),
				risInfoBody3: reserveInStoreManager.constants.templates.OVER_CAPACITY_INFO_3.evaluate({
					storeId: reserveInStoreManager.model.storeId,
					storeName: storeLocationsService.model.storeDataMap[reserveInStoreManager.model.storeId].storeName
				}),
				closer: resourceBundleValues.reserveInStore.overCapacityCloser,
				continueButtonLabel: ''
			}));

            $('risAnotherStore').observe('click', function (event) {
            	reserveInStoreManager.view.close();
            	merchLocationsManager.view.storeLocationsListOverlay.open();
            });
		},
		showProductExclusion: function() {
			$('risRight').update(reserveInStoreManager.constants.templates.THANK_YOU.evaluate({
				openOrClosed: 'productExclusion',
				thanksHeaderLine1: "We're sorry, this item",
				thanksHeaderLine2: 'is not able to be reserved online.',
				opener: '',
				risInfoBody1: 'If you plan to visit the store, you may want to call to confirm this item is still in stock.',
				closer: resourceBundleValues.reserveInStore.overCapacityCloser,
				continueButtonLabel: ''
			}));
		}
	},
	controller: {

		validateForm: function() {
			var invalidFields = $$('#risUserInput input[type=text]').findAll(function(element) {
				return !reserveInStoreManager.controller.validateField(element);
			});

			return invalidFields.length === 0;
		},

		submitForm: function() {
			reserveInStoreManager.view.hideAllInvalidErrors();
			var valid = reserveInStoreManager.controller.validateForm();
			if (!valid) return;

			gidLib.setCookieVar("globalSession", "risFirstName", $('risFirstName').value);
			gidLib.setCookieVar("globalSession", "risLastName", $('risLastName').value);
			gidLib.setCookieVar("globalSession", "risEmail", $('risEmail').value);
			gidLib.setCookieVar("globalSession", "risSendText", $('risSendText').checked);
			gidLib.setCookieVar("globalSession", "risMobileNumber", $('risMobileNumber').value);
      		if ($('risOptIn').checked) {
        		gidLib.setCookieVar("globalSession", "risOptedIn", true);
      		}

			reserveInStoreManager.controller.reserve(reserveInStoreManager.controller.buildParams(),$('risFirstName').value);
		},

		buildParams: function() {
			var skuInfo = productStyleService.api.getSelectedSkuInfo();
	        return {
	        	firstName: $('risFirstName').value,
	        	lastName: $('risLastName').value,
	        	emailAddress: $('risEmail').value,
        		mobilePhoneNumber: $('risMobileNumber').value,
        		skus: [{
        			skuId: skuInfo.skuId,
        			productStyleUrl: window.location.toString(),
        			fullyQualifiedProductImageUrl: reserveInStoreManager.model.productImgUrl,
        			inventoryStatus: reserveInStoreManager.model.inventoryStatus
        		}],
        		storeId: reserveInStoreManager.model.storeId,
            marketingOptInIndicator: $('risOptIn').checked ? 'Y' : 'N',
        		textMsgIndicator: $('risSendText').checked ? 'Y' : 'N',
        		specialHandlingIndicator: $('risSpecialHandling').checked ? 'Y' : 'N',
        		requestedLocale: brandConst.BRAND_LOCALE,
        		marketCode: 'US', 						// Expand this when RIS goes into other countries
        		brandCode: brandConst.BRAND_CODE+  '',  // This is the old, pre-international brand code
        		busUnitId: gidBrandSiteConstruct.currentBrandCode+  '' // Notice the mismatch of names here
        	};
		},

		handleRequestFailure: function(response){
			var paramNameToIdMap = {
				firstName: 'risFirstName',
				lastName: 'risLastName',
				emailAddress: 'risEmail',
				mobilePhoneNumber: 'risMobileNumber'
			};
			if (response.status === 400 && response.responseJSON && response.responseJSON.invalidFields) {
				reserveInStoreManager.view.hideSpinner();
				reserveInStoreManager.view.enableRisButton();
				response.responseJSON.invalidFields.each(function(fieldName) {
					var id = paramNameToIdMap[fieldName];
					if (id !== undefined) {
						invalidFieldFromService = true;
						reserveInStoreManager.view.showInvalidFieldError($(id));
					}
				});
			} else if (response.status === 409) {
				reserveInStoreManager.view.showBeyondStoreCapacity();
			} else if (response.status === 403) {
				reserveInStoreManager.view.showProductExclusion();
			} else {
				reserveInStoreManager.view.showFailure(resourceBundleValues.reserveInStore.reservationRequestFailureBody);
			}
		},

		//Keep pooling for the Iframe  hash values. Pooling is through window.setInterval [For I.E 7 and other old browsers which don't support windows.postMessage and CORS]
		checkForIframeMessage: function(params) {
			var iwin = window.open('', "iframeSameDomain");
			var changedSrc = iwin.location;
			var hashValue = changedSrc.hash;
			hashValue = hashValue.substring(1, hashValue.length);
			if (hashValue.startsWith("resp=")) {
				var response = hashValue.evalJSON();
				if (response.succeeded) {
					reserveInStoreManager.controller.reserveSuccess(response, params);
				} else {
					reserveInStoreManager.controller.handleRequestFailure(response);
				}
				clearInterval(reserveInStoreManager.model.ie7PoolResponseIntervalId);
			}
		},

		//Keep listening to a post message from iframe [ For windows.postMessage supported browsers]
		processReservationPostMessageEvent: function(event) {
			var message = event.data.evalJSON();
			if (message.succeeded) {
				reserveInStoreManager.controller.reserveSuccess(message, reserveInStoreManager.controller.buildParams());
			} else {
				reserveInStoreManager.controller.handleRequestFailure(message);
			}
		},

		//Send the json params to iframe as hashValue(URL Fragmentation). [For I.E 7 and other old browsers which don't support windows.postMessage and CORS]
		reserveWithHashTransport: function(params) {
			var reservationUrl = reserveInStoreManager.controller.buildSecureResourceURL();
			var resDetails = Object.toJSON(params);
			var message = {
				params: resDetails,
				url: reservationUrl,
				originurl: document.location.href,
				secureDomain: reserveInStoreManager.controller.secureUrlForCurrentBrand(),
				unsecureDomain: reserveInStoreManager.controller.unsecureUrlForCurrentBrand()
 	        };
			var hashMsg =  "msg="+Object.toJSON(message);
			document.getElementById('securehiddenIframeForIE7').src =  document.getElementById('securehiddenIframeForIE7').src+"#"+hashMsg;
			reserveInStoreManager.model.ie7PoolResponseIntervalId = setInterval(function() { reserveInStoreManager.controller.checkForIframeMessage(params); }, 1000);
		},

		//post the json params  to iframe window using windows.postMessage [all browsers which support window.postMessage , but not CORS]
		reserveWithLegacyBrowser: function(params){
			var reservationUrl = reserveInStoreManager.controller.buildSecureResourceURL();
			var resDetails = Object.toJSON(params);
			if (!!window.postMessage) {
	        	 //Windows. postMessage supported browsers.[ IE 8 and 9 supports this]
				var message = {
					params: resDetails,
					url: reservationUrl
	            };
	            $('hiddenIframeForAjax').contentWindow.postMessage(Object.toJSON(message), reserveInStoreManager.controller.secureUrlForCurrentBrand());
	         } else {
	        	 //hash transport [old browsers to very old browsers]. [I.E 7 in the list]
	        	 reserveInStoreManager.controller.reserveWithHashTransport(params);
	         }
		},

		//Main method to do reservation. Code branches out to different methods based on browser comptability
		reserve: function(params) {
			reserveInStoreManager.view.showSpinner();
			reserveInStoreManager.view.disableRisButton();
			//ris service call on https
			if(reserveInStoreManager.model.useHttpsForRISService){
				reserveInStoreManager.controller.reserveWithSecureUrl(params);
			}else{
				//ris service on  http call
				var url = reserveInStoreManager.controller.buildResourceURL();
				new Ajax.Request(url,{
					method: "post",
					contentType: 'application/json',
					postBody: Object.toJSON(params),
					onSuccess: function(response){
						var openCloseUrl = reserveInStoreManager.controller.buildOpenCloseURL(reserveInStoreManager.model.storeId);
						new Ajax.Request(openCloseUrl,{
							method: "get",
							contentType: 'application/json',
							postBody: Object.toJSON(params),
							onSuccess: function(response){
								reserveInStoreManager.view.showThankYouMessage(params.firstName, response);
							},
							onFailure: function(response) {
								reserveInStoreManager.view.showOpenCloseFailure(params.firstName);
							}
						});
						reportingService.controller.viewManagers.findInStore.reserveInStoreConfirmationViewManager.controller.getReportRequest();
					},
					onFailure: reserveInStoreManager.controller.handleRequestFailure
				});
			}
		},

		reserveWithSecureUrl: function(params){
			var reservationUrl = reserveInStoreManager.controller.buildSecureResourceURL();
			var resDetails = Object.toJSON(params);
			//CORS supported browser and IF CORS model value is true
			if ('withCredentials' in new XMLHttpRequest() && reserveInStoreManager.model.useCORSForSecureRISService) {
	            new Ajax.Request(reservationUrl,{
					method: "post",
					contentType: 'application/json',
					postBody: resDetails,
					onSuccess: function(response) {
						if (response.status === 200) {
							reserveInStoreManager.controller.reserveSuccess(response, params);
						} else {
							reserveInStoreManager.controller.handleRequestFailure(response);
						}
					},
					onFailure: function(response) {
						reserveInStoreManager.controller.handleRequestFailure(response);
					}
				});
	         } else {
	        	 reserveInStoreManager.controller.reserveWithLegacyBrowser(params);
	         }
		},

		reserveSuccess: function(response, params) {
			var openCloseUrl = reserveInStoreManager.controller.buildOpenCloseURL(reserveInStoreManager.model.storeId);
			new Ajax.Request(openCloseUrl,{
				method: "get",
				contentType: 'application/json',
				postBody: Object.toJSON(params),
 				onSuccess: function(response){
					var openCloseUrl = reserveInStoreManager.controller.buildOpenCloseURL(reserveInStoreManager.model.storeId);
					new Ajax.Request(openCloseUrl,{
						method: "get",
						contentType: 'application/json',
						postBody: Object.toJSON(params),
						onSuccess: function(response){
							reserveInStoreManager.view.showThankYouMessage(params.firstName, response);
						},
						onFailure: function(response) {
							reserveInStoreManager.view.showOpenCloseFailure(params.firstName);
						}
					});
					reportingService.controller.viewManagers.findInStore.reserveInStoreConfirmationViewManager.controller.getReportRequest();
					reserveInStoreManager.view.showThankYouMessage(params.firstName, response);
 				},
				onFailure: function(response) {
					reserveInStoreManager.view.showOpenCloseFailure(params.firstName);
				}
 			});
			reportingService.controller.viewManagers.findInStore.reserveInStoreConfirmationViewManager.controller.getReportRequest();
 		},

		parsePhoneNumber: function(entry) {
			var matches = /^\s*\(?(\d{3})\)?[^\d\w]*(\d{3})[^\d\w]*(\d{4})\s*$/.exec(entry);

			if (matches === null || matches.size() !== 4) return null;

			return matches[1] + matches[2] + matches[3];
		},

		validateEmail: function(entry) {
			return (/[\w\._-]+@\w+(\.[\w\._-]+)+/).match(entry);
		},

		checkNameField: function(entry) {
			return entry.trim() !== '' && entry.match(/^[a-zA-Z- ]+$/) !== null;
		},

		validateField: function(element) {
			if (element.disabled === true) return true;

			var validators = {
				risFirstName: reserveInStoreManager.controller.checkNameField,
				risLastName: reserveInStoreManager.controller.checkNameField,
				risEmail: reserveInStoreManager.controller.validateEmail,
				risMobileNumber: function(entry) {
					return null !== reserveInStoreManager.controller.parsePhoneNumber(entry);
				}
			};

			if (!validators[element.getAttribute('id')](element.value)) {
				reserveInStoreManager.view.showInvalidFieldError(element);
				reserveInStoreManager.view.supportPlaceholderInIe();
				return false;
			} else {
				$(element.id + 'Field').removeClassName('withError');

				return true;
			}
		},

		buildResourceURL: function() {
			var host = window.location.host;
			var protocol = window.location.protocol;
			return protocol + '//' + host + '/resources/storeReservationsResource/v1/reservationRequest';
		},

		buildSecureResourceURL: function() {
			return this.secureUrlForCurrentBrand() + '/resources/storeReservationsResource/v1/reservationRequest';
		},

		buildPostMessageIframeURL: function() {
			return this.secureUrlForCurrentBrand() + '/gid/html/en/makeReservationPostMessage.html';
		},

		secureUrlForCurrentBrand: function() {
			return gidBrandSiteConstruct.gidBrandSites[gidBrandSiteConstruct.currentBrandCode].secureUrl;
		},

		unsecureUrlForCurrentBrand: function() {
			return gidBrandSiteConstruct.gidBrandSites[gidBrandSiteConstruct.currentBrandCode].unsecureUrl;
		},

		buildOpenCloseURL: function(storeId) {
			var host = window.location.host;
			var protocol = window.location.protocol;

			return protocol + '//' + host + '/resources/storeInfo/v1/store/' + storeId + '/open-close';
		}
	},
	api: {
		open: function(parentContainer, triggeredBy, productImgUrl) {
			reserveInStoreManager.view.open(parentContainer, triggeredBy, productImgUrl);
		}
	}
};

var reserveInStoreManager = new ReserveInStoreManager();
