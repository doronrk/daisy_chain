(function (EBGLOBAL) {
	'use strict';

	EBGLOBAL.pdp = {};

	EBGLOBAL.pdp.init = function () {
		$(document).on('pdp-color-size.success', EBGLOBAL.pdp.findInStore);
	};

	EBGLOBAL.pdp.findInStore = function () {
		var $findInStore = $('.pdp-find'),
			$findInStoreButton = $findInStore.find('button'),
			$findInStoreUrl = $findInStoreButton.attr('data-href'),
			$onlineExclusive = $('.pdp-online-exclusive'),
			$styles = $('.style-selection'),
			$swatchHolder = $('.swatch-holder'),
			$swatchHolderClearance = $('.swatch-holder-clearance'),
			disabledClass = 'pdp-find-disabled',
			isClearanceItem = false,
			isDefaultStyle,
			isEnabled,
			isOnlineExclusive,
			textClearance = 'Find in Store not available for Clearance items',
			textDisabled = 'Not currently available in store',
			textEnabled = 'Check In Store Availability',

			checkClearance = function () {
				isClearanceItem = $swatchHolder.parent().prev('.clearance-text').length > 0 ||
					($('.pdp-clearance-container').not(':hidden').length < 1 && $swatchHolderClearance.find('.selected').length > 0);
			},

			checkOnlineExclusive = function () {
				isOnlineExclusive = $styles.filter(':checked').attr('data-channelCode') === 'IC';

				if (isOnlineExclusive) {
					$onlineExclusive.removeClass('hidden');
				} else {
					$onlineExclusive.addClass('hidden');
				}
			},

			checkStyle = function () {
				isDefaultStyle = $styles.filter(':checked').attr('data-index') === '0';
			},

			determineState = function (isInitialRun, setClearanceState) {
				if (typeof setClearanceState === 'boolean') {
					isClearanceItem = setClearanceState;
				} else {
					checkClearance();
				}

				checkOnlineExclusive();
				checkStyle();

				if (isDefaultStyle && !isOnlineExclusive && !isClearanceItem) {
					enable();
				} else {
					if (isInitialRun) isEnabled = true;
					disable();
				}
			},

			disable = function () {
				$findInStore
					.addClass(disabledClass)
					.find('p').text(isClearanceItem ? textClearance : textDisabled);

				if (isEnabled) {
					isEnabled = false;

					$findInStoreButton
						.off()
						.on('click.disabled', function (e) {
							e.preventDefault();
						});
				}
			},

			enable = function () {
				if (isEnabled) return;
				isEnabled = true;

				$findInStore
					.removeClass(disabledClass)
					.find('p').text(textEnabled);

				$findInStoreButton
					.on('click.tracking', function (e) {
						e.preventDefault();
						var $this = $(this);
						cmCreateElementTag('Find in Store  - ' + $this.attr('data-productName') + '(' + $this.attr('data-productId') + ')', 'PDP FIS');
					});

				showModal($findInStoreButton, null, $findInStoreUrl + '&ajax=true', null, 900, false, '5%', EBGLOBAL.pdp.findInStoreModal, null, null, null, true, null, null, null);
			},

			init = function () {
				determineState(true);
				watch();
			},

			watch = function () {
				// swatches
				var isClearanceSwatch = $swatchHolder.parent().prev('.clearance-text').length > 0;

				$swatchHolder.on('click', 'a', function () {
					determineState(false, isClearanceSwatch);
				});

				// clearance swatches
				$swatchHolderClearance.on('click', 'a', function () {
					determineState(false, true);
				});

				// style
				$styles.on('change', function () {
					determineState();
				});
			};

		init();
	};

	EBGLOBAL.pdp.findInStoreModal = function () {
		var $modal = $('.pdp-find-modal'),
			$form = $modal.find('form'),
			$city = $form.find('#city'),
			$distance = $form.find('#distance'),
			$state = $form.find('#state'),
			$swatchHolder = $form.find('.swatch-holder'),
			$zip = $form.find('#zipCode'),
			addressFormatted,
			isZipSearch,
			isZipSearchClicked,

			availabilityFilter = function () {
				$modal.on('change', '.pdp-filter-stores input', function () {
					var showAll = $(this).val() === 'all',
						$stores = $('.pdp-find-stores'),
						$storeItems = $stores.find('ol li'),
						$storesWithAvailability = $storeItems.filter('.store-availability-in, .store-availability-limited');

					if (showAll) {
						$storeItems.show();
						$stores.find('.pdp-find-error').remove();
					} else {
						$storeItems.hide();

						if ($storesWithAvailability.length > 0) {
							$storesWithAvailability.show();
						} else {
							$stores.append(
								'<div class="pdp-find-error">' +
									'<p>No results were found for ' + addressFormatted + ' within a ' + $distance.val() + ' mile radius.</p>' +
								'</div>'
							);
						}
					}
				});
			},

			addFormFieldError = function ($destination, message, isLeft) {
				var position = $destination.position(),
					top = position.top + ($destination === $swatchHolder ? 0 : 6),
					left = position.left + (isLeft ? '' : $destination.outerWidth(true) + 12),
					variation = 'error-tooltip-' + (isLeft ? 'left' : 'right');

				$('<div class="error-tooltip ' + variation + '" style="top: ' + top + 'px; left: ' + left + 'px;">' +
						'<p>' + message + '</p>' +
					'</div>'
				).insertAfter($destination).fadeIn(400);
			},

			removeFormFieldError = function ($destination) {
				$destination.parent().find('.error-tooltip').fadeOut(600, function () {
					$(this).remove();
				});
			},

 			enterMapState = function ($anchor) {
				$modal
					.addClass('pdp-map-modal pdp-find-modal-loading')
					.children().hide();

				$.ajax({
					url: $anchor.attr('href')
				}).done(function (data) {
					var receiveMessage = function (e) {
						if (e.data === 'find-store-back') {
							exitMapState();
						}
					};

					$modal
						.removeClass('pdp-find-modal-loading')
						.append(data);

					if (window.addEventListener) {
						window.addEventListener('message', receiveMessage, false);
					} else if (el.attachEvent) {
						window.attachEvent('message', receiveMessage);
					}
				});
			},

			exitMapState = function () {
				$modal
					.removeClass('pdp-map-modal')
					.find('iframe').remove();

				$modal.children().show();
			},

			formReSubmit = function () {
				if ($('.pdp-find-stores').children().length > 0) {
					formValidate();
				}
			},

			formSubmit = function (successUrl) {
				var $stores = $('.pdp-find-stores'),
					loading = 'pdp-find-stores-loading';

				// console.log(successUrl);

				$stores
					.addClass(loading)
					.children().remove();

				$stores.load(successUrl + ' .pdp-find-stores', function (data) {
					showSavedAddress();
					$stores.find('.pdp-find-stores').unwrap();
					$stores.removeClass(loading);
				});
			},

			formValidate = function () {
				var city = $city.val().replace(/ /g, '+'),
					color = $swatchHolder.find('input:checked').val(),
					distance = $distance.val(),
					errors = false,
					isZipCanadian = /[a-z][0-9][a-z](-| |)[0-9][a-z][0-9]/i,
					isZipNotNumeric = /[^0-9]/g,
					itemId = $form.find('#itemId').val(),

					$size = $form.find('#sizeId'),
					size = $size.val(),

					state = $state.val().replace(/ /g, '+'),
					zip = $zip.val(),

					addressQuery,
					zipQuery = zip,
					cityStateQuery = city + ',+' + state;

				// color
				if (!color) {
					addFormFieldError($swatchHolder, 'Please select a color', true);
					errors = true;
				}

				// size
				if (!size) {
					addFormFieldError($size, 'Please select a size', true);
					errors = true;
				}

				// city/state or zip
				if (isZipSearch) {
					removeFormFieldError($city);
					removeFormFieldError($state);

					if (!zip || (isZipNotNumeric.test(zip) && !isZipCanadian.test(zip))) {
						addFormFieldError($zip, 'Please enter a zip code or postal code', false);
						errors = true;
					}

					addressFormatted = zip;
					addressQuery = zipQuery;
				} else {
					removeFormFieldError($zip);

					if (!city && !state) {
						addFormFieldError($city, 'Please enter a City and select a State or Province', false);
						errors = true;
						addressFormatted = state;
					}

					if (!city && state) {
						addFormFieldError($city, 'Please enter a City', false);
						errors = true;
						addressFormatted = state;
					}

					if (city && !state) {
						addFormFieldError($state, 'Please select a State or Province', false);
						errors = true;
						addressFormatted = city + ', ' + state;
					}

					addressQuery = cityStateQuery;
				}

				if (!errors) {
					formSubmit($form.attr('action') + '&itemId=' + itemId + '&addressQuery=' + addressQuery + '&distance=' + distance + '&ajax=true');

					if (addressQuery === zipQuery) {
						saveAddress('', '', zip);
					} else {
						saveAddress($city.val(), state, '');
					}
				}
			},

			init = function () {
				var $swatchSelected;

				// swatch / color
				$swatchHolder
					.on('mouseenter focusin', 'a', function () {
						populateColorTextHover($(this).attr('data-colorid'), $('.style-selection:checked').val(), styleColors, $modal);
					})
					.on('mouseleave focusout', 'a', function () {
						$swatchSelected = $swatchHolder.find('a.selected');

						if ($swatchSelected) {
							$modal.find('.pdp-color-text').text($swatchSelected.attr('data-color'));
						} else {
							resetColorText($modal);
						}
					})
					.on('click', 'a', function (e) {
						e.preventDefault();

						var	$this = $(this),
							colorId = $this.attr('data-colorid');

						removeFormFieldError($swatchHolder);
						populateColorText(colorId, $('.style-selection:checked').val(), styleColors, $modal);
						populateCanvasImage(colorId, colorImageMap, colorImageAltMap, $modal);
						updateItemId({ colorId: colorId });

						$this
							.addClass('selected')
							.parent().find('input[type="radio"]').prop('checked', true);
					});

				// set selected swatch
				resetColorText($modal);
				$swatchSelected = $swatchHolder.find('a.selected');

				if ($swatchSelected) {
					$swatchSelected.trigger('click');
				}

				// distance
				$distance.on('change', function () {
					formReSubmit(true);
				});

				// size
				$form
					.find('#sizeId')
					.on('change', function () {
						updateItemId({ sizeId: $(this).val() });
					})
					.find('option[value="' + $('#pdpSelectSize').val() + '"]').attr('selected', true);
				if($('#pdpSelectSize').val()){
					updateItemId({ sizeId: $('#pdpSelectSize').val() });
				}

				// form
				$form
					.on('click', 'button', function () {
						isZipSearchClicked = $(this).val() === 'zip';
					})
					.on('submit', function (e) {
						e.preventDefault();

						var $active = $(document.activeElement),
							active = $active.val(),
							isCity = active === 'city-state' || $active.is($city),
							isZip = active === 'zip' || $active.is($zip);

						if (isZip) isZipSearch = true;
						if (isCity) isZipSearch = false;
						if (!isZip && !isCity) isZipSearch = isZipSearchClicked;

						formValidate();
					});

				// map link
				$modal.on('click', '.pdp-find-map-link', function (e) {
					e.preventDefault();
					enterMapState($(this));
				});

				availabilityFilter();
				showSavedAddress();
			},

			saveAddress = function (city, state, zip) {
				if (!window.localStorage) return;

				localStorage.setItem(
					'findInStoreAddress',
					JSON.stringify({
						city: city,
						state: state,
						zip: zip
					})
				);
			},

			showSavedAddress = function () {
				if (!window.localStorage) return;

				var address = localStorage.getItem('findInStoreAddress');

				if (address) {
					address = JSON.parse(address);

					$city.val(address.city);
					$state.val(address.state);
					$zip.val(address.zip);
				}
			},

			updateItemId = function (data) {
				var $itemId = $modal.find('#itemId'),
					itemId = $itemId.val();

				if (data.colorId) {
					itemId = itemId.substring(0, 7) + data.colorId + itemId.substring(10, 17);
				}

				if (data.sizeId) {
					if (data.sizeId === 'n/a') {
						data.sizeId = '0000';
					}

					itemId = itemId.substring(0, 14 - data.sizeId.length) + data.sizeId;
				}

				$itemId.prop('value', itemId);

				formReSubmit();
			};

		init();
	};

	EBGLOBAL.pdp.init();
}(window.EBGLOBAL = window.EBGLOBAL || {}));