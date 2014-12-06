$(function() {

	/* VALIDATIONS */
	$('#CatalogQuickOrder input[type="text"]').autotab({ format: 'alphanumeric' }).click(function(){
		$(this).select();
	});

	$('#egcAssociate, #searchOrderNumber, #egcAssociate').autotab({ format: 'alphanumeric' });

	$('#searchOrderNumber').autotab({format: 'numeric'});

	if($('body').hasClass('customer-service-egc') || $('body').hasClass('customer-service-gc')) {
		$('#message').keyup(function(e) {
			var lengthF = $(this).val();
			if(lengthF.length >= 80) {
				$(this).val($(this).val().substr(0, 80));
				if (e.keyCode != 8 && e.keyCode != 46){
					return false;
				}

			}

		});
	}

	$('#headSearchSubmit').click(function(e) {
		$('.alt-error-tooltip').remove();
		if($.trim($('#searchText').val()) == '') {
			e.preventDefault();
			showSearchError($('#searchText'),'Please enter a keyword to search');
		}

	});

	//pSrch
	$('#headSearchForm').on('click', '#headSearchTypeAheadHolder a', function(e) {
		e.preventDefault();
		var searchVal = $.trim($('#searchText').val());
		var newLink = $(this).attr('href') + '&pSrch=' + escape(searchVal);
		location.href = newLink;
	});


	//type-ahead search method
	if (typeof searchSuggestObject != 'undefined') {
		$("#searchText").endecaSearchSuggest(searchSuggestObject);
	}

	if ($('#kiosk').length && $("#kiosk").is(":visible")) {
		kioskSession();
	}

	// image pre-loader
	$.fn.preload = function() {
		this.each(function(){
			$('<img/>')[0].src = this;
		});
	};


	//ipad modal repositioning
	$('body').on('gestureend', function(e) {
		if($('.overlay-modal').length)
			repositionModalForIpad();
	});


	//auto tab catalog quick order
	$('#deptMFT').keyup(function(e) {
		if(e.keyCode == 9 || e.keyCode == 16) {
			return false;
		}
		var inputVal = $(this).val();
		if(inputVal.length > 2) {
			$('#effortMFT').focus().select();
		}
	});

	$('#effortMFT').keyup(function(e) {
		if(e.keyCode == 9 || e.keyCode == 16) {
			return false;
		}
		var inputVal = $(this).val();
		if(inputVal.length > 2) {
			$('#itemMFT').focus().select();
		}
	});

	$('body').on('key-up', 'input[data-amount]', function() {
		var	context = $(this),
		value = isNaN(context.val()) ? 0 : context.val(),
		valueLimit = isNaN(context.data('amount')) ? 0 : context.data('amount');

		if (value > valueLimit) {
			context.val(valueLimit);
		}
	});

	$('#mainFooter .shopping').on('click', 'a', function(e){
		var $this = $(this);
		if($this.attr('href') == ''){
			e.preventDefault();
			window.location = '/gone-fishing.jsp';
		}
	});

	$('.site-map-group').on('click', 'a', function(e){
		var $this = $(this);
		if($this.attr('href') == ''){
			e.preventDefault();
			window.location = '/gone-fishing.jsp';
		}
	});

	//remove data error on focus
	$('input[type="text"]').focus(function() {
		$(this).removeClass('error-field');
		$(this).parent().find('.error-tooltip').remove();
		$(this).parent().find('.alt-error-tooltip').remove();
	});


	//add list item content and styles to pdp 51 tooltip
	$(document).on('click', '.alt-tip-trigger', function(e) {
		e.preventDefault();
		var modalUrl = '/checkout/includes/fifty-one-list-items.jsp';
		openFBModal(modalUrl,'type:ajax; width:300; height:150;');
	});

	//select all elements from 'errored' form
	var inputs = $('.error-field');
	showFormErrors(inputs);

	//checks field on blur and adds error and tooltip if empty
	$(document).on('blur', 'form .required', function(){
		check($(this), true);
	});

	//removes error and tooltip on field focus
	$(document).on('focus', 'input, select, textarea', function(){
		var $this = $(this);

		$this.removeClass('error-field');

		if ($this.hasClass('alt-error')) {
			$this.siblings().remove('.alt-error-tooltip');
		} else {
			$this.siblings().remove('.error-tooltip');
		}

		if ($('body').hasClass('custserv-email-us')) {

		} else {
			$this.data('error', "");
		}
	});

	if($('body').hasClass('proDeal')) {
		$('#proDeal').submit(function(e) {
			$this = $(this);
			if(!$this.hasClass('skip-validation')) {
				validateProDealsAddress($this, e, 'billing');
			}
		});
		$('#shipToBill').click(function() {
			if($(this).prop('checked')) {
				$('#shipAddress1').val($('#billAddress1').val());
				$('#shipAddress2').val($('#billAddress2').val());
				$('#shipCity').val($('#billCity').val());
				$('#shipState').val($('#billState').val());
				$('#shipZipCode').val($('#billZipCode').val());
				$('#shipCountry').val($('#billCountry').val());
			} else {
				$('#shipAddress1').val('');
				$('#shipAddress2').val('');
				$('#shipCity').val('');
				$('#shipState').val('');
				$('#shipZipCode').val('');
				$('#shipCountry').val('');
			}
		});
		$('#empToBill').click(function() {
			if($('#empToShip').prop('checked')) {
				$('#empToShip').prop('checked', false);
			}
			if($(this).prop('checked')) {
				$('#empAddress1').val($('#billAddress1').val());
				$('#empAddress2').val($('#billAddress2').val());
				$('#empCity').val($('#billCity').val());
				$('#empState').val($('#billState').val());
				$('#empZipCode').val($('#billZipCode').val());
				$('#empCountry').val($('#billCountry').val());
			} else {
				$('#empAddress1').val('');
				$('#empAddress2').val('');
				$('#empCity').val('');
				$('#empState').val('');
				$('#empZipCode').val('');
				$('#empCountry').val('');
			}
		});
		$('#empToShip').click(function() {
			if($('#empToBill').prop('checked')) {
				$('#empToBill').prop('checked', false);
			}
			if($(this).prop('checked')) {
				$('#empAddress1').val($('#shipAddress1').val());
				$('#empAddress2').val($('#shipAddress2').val());
				$('#empCity').val($('#shipCity').val());
				$('#empState').val($('#shipState').val());
				$('#empZipCode').val($('#shipZipCode').val());
				$('#empCountry').val($('#shipCountry').val());
			} else {
				$('#empAddress1').val('');
				$('#empAddress2').val('');
				$('#empCity').val('');
				$('#empState').val('');
				$('#empZipCode').val('');
				$('#empCountry').val('');
			}
		});


	}
	if($('body').hasClass('user-subscriptions')) {
		$('.subscribe-email-link').click(function(e) {
			e.preventDefault();
			showEmailSubscriptionModal($(this).data('email'));
		});
	}
	if($('body').hasClass('user-address-book')) {
		$('#addresses').on('click', '.delete-address', function(e) {
			e.preventDefault();
			$this = $(this);
			var success = function() {
				$($this.data('addressidsubmit')).click();
			}
			showModal(null, success, '/modals/confirmation/remove-address.jsp', null, 300, true, 'center', null, null, null, null, null, true);
		});
		/*$('#addresses').on('click', '.edit-address', function(e) {
			e.preventDefault();
			$($(this).data('addressidsubmit')).click();
		});*/
	}

	if($('body').hasClass('user-add-address') || $('body').hasClass('checkout')) {
		// address validation
		$('#addNewAddress, #bill-ship-address-checkout').submit(function(e) {
			$this = $(this);
			if(!$this.hasClass('skip-validation')) {

				var city = $.trim($('#addNewCity').val());
				var state = $.trim($('#addNewState').val());
				var zip = $.trim($('#addNewZip').val());
				var country = $.trim($('#addNewCountry').val());

				if(city != '' && state != '' && zip != '' && country != '') {
					$('#av-city').val(city);
					$('#av-state').val(state);
					$('#av-zip').val(zip);
					$('#av-country').val(country);
					var successCall = function(data) {
						if($.trim(data) != 'valid') {
							e.preventDefault();
							//show modal
							var success = function() {
								if(!$('#continueWithoutSuggestion').prop('checked') && $('#addressSelect').val() == '') {
									$('.address-validation-error').show();
									$('#addressSelect').addClass('error-field');
									return false;
								} else {
									$('.address-validation-error').hide();
									$('#addressSelect').removeClass('error-field');
								}
								if(!$('#continueWithoutSuggestion').prop('checked')) {
									$('#addNewCity').val($('#addressSelect option:selected').attr('data-city'));
									$('#addNewState').val($('#addressSelect option:selected').attr('data-state'));
									$('#addNewZip').val($('#addressSelect option:selected').attr('data-zip'));
								}
								$this.addClass('skip-validation');
								$this.find('input[type="image"]').click();
								$this.removeClass('skip-validation');
							}
							var onload = function() {
								$('#addressSelect').change(function() {
									if($('#addressSelect').val() != '') {
										$('#addressSelect').removeClass('error-field');
										$('.address-validation-error').hide();
									}
								});
							}
							showModal(null, success, null, null, 500, true, '20%', onload, null, data);
						} else if(($('#regPwd').val() != '' || $('#regConfirmPwd').val() != '')&& $('#create-user-billing').length && $('#addEmail').val() != '' && !$this.hasClass('skip-createuser')) {
							createUserFromBilling(e, $this);
						}
					}
					addressValidationSubmit($('#address-validation-form'), null, successCall, null, null);
				}
			} else {
				if($('#regPwd').val() != '' && $('#create-user-billing').length && $('#addEmail').val() != '' && !$this.hasClass('skip-createuser')) {
					createUserFromBilling(e, $this);
				}
			}
		});
	}


	productDetailPageFunctions();

	//wishlist share
	$('.wishlist-item-container, #sbWishlistHolder').on('click', '.share-wishlist-link', function(e) {
		e.preventDefault();
		var onload = shareWishlistEvents;
		showModal(null, null, '/modals/share/wish-list-share-form.jsp', null, 610, true, '5%', onload, null);
	});

	//account subscriptions
	if ($('body').hasClass('user-add-subscriptions')) {
		var $subInfo = $(".print-cat");

		if ($("#ebPrintCatalog").is(":checked")) {
			$("#subPrintCatalog").show();
			$subInfo.addClass("required");
		}

		$(document).on("click", "#ebPrintCatalog", function(e) {
			var $this = $(this);

			if ($this.is(":checked")) {
				$("#subPrintCatalog").show();
				$subInfo.addClass("required");
				showFormErrors(inputs);
			} else {
				$("#subPrintCatalog").hide();
				$subInfo.removeClass("required");
				showFormErrors(inputs);
			}
		});
	}
	if ($('body').hasClass('user-login') || $('body').hasClass('user-logout')) {
		$('form#loginForm').enableButtonCheck();
	}

	/* prepopulate country select box */
	if($('.state-dropdown').length) {
		$('.state-dropdown').on('change', function() {
			var $this = $(this);
			updateCountrySelect($this);
			checkRegionInput();
		});
	}
	if($('.country-dropdown').length) {
		$('.country-dropdown').on('change', function() {
			var $this = $(this);
			var country = $this.val();
			if(!isCAorUS())
				$('.state-dropdown').val('C6');
				checkRegionInput();
			if(isCAorUS() || zipRequired()) {
				$('span.zip-required').show();
			} else {
				$('span.zip-required').hide();
			}
		});
	}

	/************** WISHLIST EVENTS **********************/
	if ($('body').hasClass('user-wishlist')) {
		//remove error tooltip
		$('.wishlist-item-container').on('click', '.error-tooltip-alt', function(e) {
			e.preventDefault();
			$(this).remove();
		});

		//print wishlist
		$('.wishlist-item-container').on('click', '#print-wishlist', function(e) {
			e.preventDefault();
			window.print();
		});

		//update qty of item
		$('.wishlist-item-container').on('change', '.wl-item-quantity', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			showLoadingOverlay($('.wishlist-item-container'));
			var $this = $(this);
			var qtyid = $this.data('qtyid');
			$('#'+qtyid).val($this.val());
			var successCall = function() {
				reloadWishlistItems();
			};
			submitWishlist($this, successCall);
		});

		//remove wishlist item
		$('.wishlist-item-container').on('click', '.remove-item-from-wl', function(e) {
			e.preventDefault();
			var $this = $(this);
			var successCall = function() {
				$this.closest('div.wishlist-item').fadeOut('slow');
				var itemCnt = parseInt($('span.wl-item-count').text());
				itemCnt--;
				$('span.wl-item-count').text(itemCnt);
				$.get('/user/gadgets/wishlist-warnings.jsp?_=' + Math.random(), function(data) {$('.wl-error-message-container').replaceWith(data);});
			};
			var submitWl = function() {submitWishlist($this, successCall);}
			showModal(null, submitWl, '/modals/confirmation/remove-item-wishlist.jsp', null, 300, true, 'center', null, null, null, null, null, true);

		});

		//remove all wishlist items
		$('.wishlist-item-container').on('click', '#delete-wishlist', function(e) {
			e.preventDefault();
			var $this = $(this);
			var successCall = function() {
				$('.wishlist-item-container').load('/user/gadgets/wishlist-items.jsp?_=' + Math.random());
			};
			var submitWl = function() {submitWishlist($this, successCall);}
			showModal(null, submitWl, '/modals/confirmation/remove-item-wishlist.jsp?all=true', null, 300, true, 'center', null, null, null, null, null, true);
		});

		//move wishlist item to cart
		$('.wishlist-item-container').on('click', '.add-item-from-wl', function(e) {
			e.preventDefault();
			var $this = $(this);
			if ($this.hasClass('active-loading')) {
				return false;
			}
			$this.addClass('active-loading');

			var successCall = function() {
				location.href = '/checkout/bag.jsp';
			};
			submitWishlist($this, successCall);
		});

		//move all wishlist items to cart
		$('.wishlist-item-container').on('click', '#add-wishlist-to-cart', function(e) {
			e.preventDefault();
			var $this = $(this);
			if ($this.hasClass('active-loading')) {
				return false;
			}
			$this.addClass('active-loading');
			var fId = $this.data('formid');
			var formElement = $('#' + fId);
			$('input.wl-sku-qty').remove();
			$('div.wishlist-item').each(function() {
				var giId = $(this).find('select.wl-item-quantity').data('giftitemid');
				var qty = $(this).find('select.wl-item-quantity').val();
				formElement.append('<input class="wl-sku-qty" type="hidden" name="' + giId + '" value="' + qty + '"/>');
			});

			var successCall = function() {
				location.href = '/checkout/bag.jsp';
			};
			submitWishlist($this, successCall);
		});

		$('.wishlist-item-container').on('click', '.wishlist-edit', function(e) {
			e.preventDefault();
			showProductModal($(this));
		});
		//email wishlist
		$('.wishlist-item-container').on('click', '#share-wishlist', function(e) {
			e.preventDefault();
			var $this = $(this);
		});
	}

	//load order history orders on page load
	if($('body').hasClass('user-order-history')) {
		$('.orders').load('/user/gadgets/order-history-orders.jsp');
	}

	/************** END WISHLIST EVENTS **********************/

	//main nav events
	//bind main nav active
	$('#mainNav a').on('click', function(){
		var id = $(this).attr('id');
		setMainNavActive(id);
	});

	//bind main nav show flyouts
	$('#mainNav a').mouseenter(function(){
		$('#mainNav a').removeClass('hovered');
		mainNavDrop($(this));
	});

	//hide flyouts when nav boundary is exited
	$('#headerMid').mouseenter(function(e){
		flyoutHide();
		e.preventDefault();
	});

	$('#headerTop').mouseenter(function(e){
		flyoutHide();
		e.preventDefault();
	});

	$('#headerRail').mouseenter(function(e){
		flyoutHide();
		e.preventDefault();
	});

	$('.breadcrumbs').mouseenter(function(e){
		flyoutHide();
		e.preventDefault();
	});

	$('#siteContainer').mouseleave(function(e){
		flyoutHide();
		e.preventDefault();
	});

	//bind main nav hide flyouts
	$('.nav-flyout').mouseleave(function(e){
		flyoutHide();
		e.preventDefault();
	});

	//bind utility nav locator and help
	$('.ut-trigger').on('click', function(e){
		var $this = $(this);
		openUtNavWidget($this);
		e.preventDefault();
	});

	//accordion binds
	$('.expandable h3').click(function(e) {
		toggleAccordion(e);
		e.preventDefault();
	});

	$('.collapse-link').click(function(e) {
		collapseAccordionAll();
		$.ajax({
			type: 'get',
			url: '/xhr/set-facets-accordion.jsp?expand=false',
			cache: false,
			dataType: 'text',
			success: function(data) {
			}
		});
		e.preventDefault();
	});

	$('.expand-link').click(function(e) {
		expandAccordionAll();
		$.ajax({
			type: 'get',
			url: '/xhr/set-facets-accordion.jsp?expand=true',
			cache: false,
			dataType: 'text',
			success: function(data) {
			}
		});
		e.preventDefault();
	});
	if($('body').hasClass('category-page')) {
		if($('#results-list-prd-holder').data('expandallfacets')) {
			expandAccordionAll();
		}
	}

	//facet selector binds
	$('.facet-select input:checkbox').on('change', function(){
		facetCheck($(this));
	});

	//eb associates e-giftcard show field bind
	$('.customer-service-egc').on('click', '#egcAssocLinks a', function(e){
		egcAssociateToggle(this);
		e.preventDefault();
	});
	if($('#egcAssociate').length && $('#egcAssociate').val() != '')
		$('#egcAssocLinks .egc-associate-num').click();

	//order summary proceed to checkout trigger
	$('.order-summary-container').on('click', '#btnProceedToCheckout', function(e) {
		e.preventDefault();

		if ($('body').hasClass('checkout-review')) {
			var $this = $(this);

			if ($this.hasClass('active-loading')) {
				return false;
			} else {
				$this.addClass('active-loading');
				$('.checkout-form-submit').trigger('click');
			}
		} else {
			$('.checkout-form-submit').trigger('click');
		}
	});

	$('#checkoutHolder').on('click', '.checkout-form-submit', function(e) {
		if ($('body').hasClass('checkout-review')) {
			var $this = $(this);

			if ($this.hasClass('active-loading') || $('.sb-loading-overlay').length) {
				e.preventDefault();
				return false;
			} else {
				$this.addClass('active-loading');
				$('#btnProceedToCheckout').addClass('active-loading');
			}
		}
	});


	//bind for estimate tax/shipping link
	$('.order-summary-container').on('click', '.calculate-shipping-link', function(e){
		//reset the session time out when enter acting with the page
		EBGLOBAL.sessionTimeout.resetTimeout();
		e.preventDefault();
		$('#calcShipTaxHolder').slideToggle('fast');
	});

	//bind for estimate tax/shipping cancel btn
	$('.order-summary-container').on('click', '.os-cancel-btn', function(e){
		//reset the session time out when enter acting with the page
		EBGLOBAL.sessionTimeout.resetTimeout();
		e.preventDefault();

		if ($('.sb-loading-overlay').length) {
			return false;
		}

		var $this = $(this);
		var formId = '#shippingestimatorform234';
		var successCall = function() {
			reloadOrderSummary(false);
		};
		var completeCall = function() {

		}
		var beforeSend = function() {
			$('.error-tooltip-alt').remove();
			showLoadingOverlay($('.order-summary-container'));
		}
		var errorCall = function(data) {
			cartError($this, data.errors[0].message);
			removeLoadingOverlay($('.order-summary-container'));
		}
		ajaxFormSubmit($(formId), beforeSend, successCall, errorCall, completeCall);
	});

	$('.order-summary-container').on('keypress', '#osZipcode', function(e){
		if(e.keyCode == 13) {
			e.preventDefault();
			$('#taxEstimatorSubmit').click();
		}
	});

	//bind for estimate tax/shipping result
	$('.order-summary-container').on('click', '#taxEstimatorSubmit', function(e){
		e.preventDefault();

		if ($('.sb-loading-overlay').length) {
			return false;
		}
		var $this = $(this);
		var cont = validateShippingFields();

		if (cont) {
			$('#postal-validate-state').val($('#osStateSelect').val());
			$('#postal-validate-zip').val($('#osZipcode').val());
			var successCallOne = function() {
				populateEstimateShipTax();

				var successCall = function() {
					reloadOrderSummary(false);
				};
				var completeCall = function() {

				}
				var beforeSend = function() {
					$('.error-tooltip-alt').remove();
					showLoadingOverlay($('.order-summary-container'));
				}
				var errorCall = function(data) {
					cartError($this, data.errors[0].message);
					removeLoadingOverlay($('.order-summary-container'));
				}
				var formId = '#' + $this.data('formid');
				ajaxFormSubmit($(formId), beforeSend, successCall, errorCall, completeCall);
			};
			var completeCallOne = function() {

			}
			var beforeSendOne = function() {
				$('.error-tooltip-alt').remove();
			}
			var errorCallOne = function(data) {
				$('#osZipcode').addClass('error-field');
				showErrorToolTip($('#osZipcode'), data.errors[0].message);
			}
			ajaxFormSubmit($('#postal-validate'), beforeSendOne, successCallOne, errorCallOne, completeCallOne, true);
		}
	});

	$('.order-summary-container').on('change', '#osShipResult', function(e) {
		e.preventDefault();

		var state = $('#osStateSelect').data('state');
		var zip = $('#osZipcode').attr('data-zip');

		$('#osStateSelect').val(state);
		$('#osZipcode').val(zip);

		populateEstimateShipTax();

		if ($('.sb-loading-overlay').length) {
			return false;
		}
		var $this = $(this);


		var successCall = function() {
			reloadOrderSummary(false);
		};
		var completeCall = function() {

		}
		var beforeSend = function() {
			$('.error-tooltip-alt').remove();
			showLoadingOverlay($('.order-summary-container'));
		}
		var errorCall = function(data) {
			cartError($this, data.errors[0].message);
			removeLoadingOverlay($('.order-summary-container'));
		}
		var formId = '#' + $this.data('formid');
		ajaxFormSubmit($(formId), beforeSend, successCall, errorCall, completeCall);
	});

	//bind for edit tax/shipping result
	$('.order-summary-container').on('click', '.os-result-edit', function(e){
		$('#calcShipTaxHolder').show();
		$('#resultShipTaxHolder').hide();
		e.preventDefault();
	});


		//live chat add oracle js if live chat btn is on page
	// if($('.chat-btn')){
	//	$(document).append('<script src="/static/js/oracle-live-chat.min.js"></script>');
	// }

	/************** Modals **********************/

	//EB Friends informational modal
	$('.chkEBFriendsHolder').on('click', '.friends-info-link', function(e){
		e.preventDefault();
		showModal(null, null, '/modals/informational-guides/eb-friends-info.jsp', null, 500, true, '10%', null, null);
	});

	//msku about gb modal
	showModal($('.msku-about-gb'), null, '/modals/pdp/pdp-about-gift-boxes.jsp', null, 600, false, '10%', null, null);
	showModal($('.msku-about-monogram'), null, '/modals/pdp/pdp-about-monograms.jsp', null, 551, false, '10%', null, null);

	//customer service gift card additional information modal
	showModal($('.gc-additional-link'), null, '/modals/informational-guides/gc-additional-info.jsp', null, 600, false, '10%', null, null);


	$('.order-summary-container').on('click', '.donation-info', function(e) {
		e.preventDefault();
		showModal(null, null, '/modals/informational-guides/donation-info.jsp?skuId=' + $(this).attr('data-skuid'), null, 500, true, '20%', null, null);
	});



	//customer service gift card additional information modal
	showModal($('.egc-additional-link'), null, '/modals/informational-guides/egc-additional-info.jsp', null, 600, false, '10%', null, null);

	//customer service gift card additional information modal
	$('.gc-see-larger-link').click(function(e) {
		e.preventDefault();
		showModal(null, null, '/modals/informational-guides/gc-view-larger-card.jsp?skuId=' + $(this).attr('data-skuid'), null, 460, true, '10%', null, null);
	});


	//oversized item shipping modal
	$('.order-summary-container').on('click', '.oversized-shipping', function(e) {
		e.preventDefault();
		showModal(null, null, '/modals/informational-guides/oversized-shipping.jsp', null, 500, true, '30%', null, null);
	});

	showModal($('.fifty-one-terms'), null, '/modals/informational-guides/fifty-one-terms.jsp', null, 600, false, '15%', null, null);

	//multi sku sold out modal
	showModal($('.sold-out-trigger'), null, '/modals/pdp/sold-out.jsp', null, 500, false, '10%', multiSkuInit, null);

	//account sign up benefits modal
	showModal($('.user-benefits-modal'), null, '/modals/informational-guides/user-benefits.jsp', null, 500, false, '10%', null, null);

	//check address modal
	showModal($('.chk-example-holder a'), null, '/modals/errors/gift-box-shipping.jsp', null, 500, false, '10%', null, null);

	//find your gc number location modal

	//gift-card international disclaimer modal
	showModal($('.international-giftcard-modal-link'), null, '/modals/errors/international-giftcard-disclaimer.jsp', null, 500, false, '10%', null, null);

	//delivery rate modal
	$('.shipping-rate-link-cart, .shipping-methods-details-link').on('click', function(e) {
		e.preventDefault();
		//check to see if us or international
		var modalUrl = '/checkout/gadgets/bag/modal-shipping-rates-us.jsp';
		var modalLinkText = $(this).html();
		var mainContentClass = $('#mainContentHolder').attr("class");
		if (mainContentClass !== undefined && (mainContentClass.indexOf("International") != -1 || mainContentClass.indexOf("international") != -1) ){
			modalUrl = '/checkout/gadgets/bag/modal-shipping-rates-int.jsp?tabid=1';
			openFBModal(modalUrl,'type:ajax; width:580; height:600; afterItemStart: modalInit();');
		}else{
			modalUrl = '/checkout/gadgets/bag/modal-shipping-rates-us.jsp?tabid=0';
			openFBModal(modalUrl,'type:ajax; width:560; height:575; afterItemStart: modalInit();');
		}
	});

	//factory shipped modal
	$('.cart-items-container, .checkout-review-container').on('click', '.factory-shipped-modal-link', function(e) {
		e.preventDefault();
		showModal(null, null, '/modals/informational-guides/factory-shipped.jsp', null, 500, true, '20%', null, null);
	});

	//factory shipped modal
	$('#reviewInformation').on('click', '.factory-shipped-modal-link', function(e) {
		e.preventDefault();
		showModal(null, null, '/modals/informational-guides/factory-shipped.jsp', null, 500, true, '10%', null, null);
	});

	//'when will my order ship?' modal
	showModal($('.shipping-modal-link'), null, '/modals/informational-guides/when-will-order-ship.jsp', null, 500, false, '10%', null, null);

	//privacy modal
	showModal($('.privacy-modal-link'), null, '/modals/informational-guides/privacy.jsp', null, 500, false, '10%', null, null);

	//international shipping modal
	/*$('.order-summary-container').on('click', '.international-modal-link', function(e) {
		e.preventDefault();
		var onload = function() {
			$('.country-not-listed-link').on('click', function() {
				showModal(null, null, '/modals/informational-guides/tax-country-not-listed.jsp', null, 600, true, '30%', null, null, null, null, true);
			});
		}
		showModal(null, null, '/modals/informational-guides/international-delivery-rate.jsp', null, 500, true, '10%', onload, null);
	});*/

	//security modal
	showModal($('.security-modal-link'), null, '/modals/informational-guides/security.jsp', null, 500, false, '10%', null, null);

	//easy returns modal
	showModal($('.easy-returns-modal-link'), null, '/modals/informational-guides/easy-returns.jsp', null, 500, false, '20%', null, null);

	//estimated tax modal
	$(document).on('click', '.estimated-tax-link', function(e) {
		e.preventDefault();
		var modalUrl = '/checkout/gadgets/bag/modal-taxes-us.jsp?tabid=0';
		var modalLinkText1 = '';
		var modalLinkText2 = '';
		modalLinkText1 = $('.shipping-rate-link-cart').html();
		modalLinkText2 = $('.shipping-methods-details-link').html();
		if ((modalLinkText1 != "" && modalLinkText1 != "null" && modalLinkText1 != null && modalLinkText1.toLowerCase().indexOf("international") != -1 )
				|| (modalLinkText2 != "" && modalLinkText2 != "null" && modalLinkText2 != null && modalLinkText2.toLowerCase().indexOf("international") != -1 )) {
			modalUrl = '/checkout/gadgets/bag/modal-taxes-int.jsp?tabid=1';
			openFBModal(modalUrl,'type:ajax; width:580; height:250; afterItemStart: modalInit();');
		}else{
			openFBModal(modalUrl,'type:ajax; width:560; height:350; afterItemStart: modalInit();');
		}
	});

	//country not listed modal
	$('.order-summary-container').on('click', '.country-not-listed-link', function(e) {
		e.preventDefault();
		showModal(null, null, '/modals/informational-guides/tax-country-not-listed.jsp', null, 700, true, '30%', null, null, null, null, null);
	});

	//country not listed modal

	/************** SLIDE SHOWS **********************/
	//start hero slide show
	startHeroSlideshow();

	//tooltip setup (content on top)
	$('.tip-trigger[title]').tooltip({ 'layout': '<div><img class="tt-arrow" src="/static/img/tip-trigger-arrow.png" alt="" /></div>' });

	//tooltip setup (content on top)
	$('.tip-trigger-top[title]').tooltip({ 'layout': '<div><img class="tt-arrow" src="/static/img/tip-trigger-arrow.png" alt="" /></div>', position: 'top center', offset: [-10, 0] });

	//tooltip setup (content on bottom)
	$('.tip-trigger-bottom[title]').tooltip({ 'layout': '<div><img class="tt-arrow-bottom" src="/static/img/tip-trigger-arrow-top.png" alt="" /></div>', position: 'bottom center', offset: [10, 0] });

	//bind pdp page open size chart modal
	$('body').on('click', '.size-chart-link', function(e){
		getSizeChartRequest(this);
		e.preventDefault();
	});

	//bind for search form focus
	$('#searchZip').on('focus', function(){
		$('.ut-flyout').hide();
		$('.ut-trigger').parent().removeClass('ut-active');
		$('#headSearchTypeAheadHolder .ut-flyout').show();
	});



	//open veriSign new window
	$('.verisign-modal-link').on('click', function(e){
		window.open('https://sealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.eddiebauer.com&lang=en', '_blank', 'width=515, height=515');
		e.preventDefault();
	});

	//bind for wishlist hover zoom
	$('#wishlistHolder, .cart-items-container, #sbWishlistHolder, .checkout-review-container').on('mouseenter', '.wl-item-zoom', function () {
		var $this = $(this);
		var zoomImg = $this.data('img-zoom');
		wlZoomMouseenter($this, zoomImg);
	});

	//utility dropdown close when click event is not on trigger
	$(document).click(function(e) {
		var target = e.target;
		closeUtNavWidget(target, e);
	});

	//bind for back links
	$('#mainContentHolder').on('click', '.back-link', function(e){
		window.history.back();
		e.preventDefault();
	});

	//bind pdp video modal link
	$('#siteContainer').on('click', '.video-link', function(e){
		var $this = $(this);
		var video = $this.data('video');
		var fa = $this.data('fa');
		openYouTubeVideoModal(video, fa);
		e.preventDefault();
	});

	// set store locator binds
	initStoreLocator();

	//bind for footer email signup - validate on click
	$('#emailSignupForm').on('click', '#emailSignupSubmit', function(e){
		signupEmailValidate();
		e.preventDefault();
	});

	/************** CART ******************/
	if ($('body').hasClass('checkout-bag')) {

		fireUtag = false;
		//print wishlist
		$('#sbWishlistHolder').on('click', '#print-wishlist', function(e) {
			e.preventDefault();
			window.print();
		});

		//receive message from login
		$.receiveMessage(function(e) {
			if (e.data == 'loginSuccessFromCart') {
				addToWishlistFromLoginCart();
			}
		});

		//scroll to wishlist
		if ($('.scroll-to-wl').length) {
			scrollToElement($('#sbWishlistHolder'));
		}

		//edit wishlist qty
		$('#sbWishlistHolder').on('change', '.wl-item-quantity', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);
			var qtyid = $this.data('qtyid');
			$('#'+qtyid).val($this.val());
			var successCall = function() {
				reloadBagWishList();
			};
			var completeCall = function() {
			}
			var beforeSend = function() {
				$('.error-tooltip-alt').remove();
				showLoadingOverlay($('#sbWishlistHolder'));
			}
			submitWishlistFromCart($this, successCall, completeCall, beforeSend);
			var shopRunnerDivHtml=$('#srEligibleBag').html();
			var wishListCount=$("#wishListCount").val();
			setTimeout(function(){
				for(i=1;i<=wishListCount;i++) 
				{
					var id="srWLEligibleBagItem"+i;
					document.getElementById(id).innerHTML = shopRunnerDivHtml;
				}
			},3000);
		});

		//remove wishlist item
		$('#sbWishlistHolder').on('click', '.remove-item-from-wl', function(e) {
			e.preventDefault();
			var shopRunnerDivHtml=$('#srEligibleBag').html();
			var wishListCount=$("#wishListCount").val();
			wishListCount=wishListCount-1;
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);
			var successCall = function() {
				reloadBagWishList();
			};
			var completeCall = function() {
			}
			var beforeSend = function() {
				$('.error-tooltip-alt').remove();
				showLoadingOverlay($('#sbWishlistHolder'));
			}
			var submitWl = function() {submitWishlistFromCart($this, successCall, completeCall, beforeSend);}
			showModal(null, submitWl, '/modals/confirmation/remove-item-wishlist.jsp', null, 300, true, 'center', null, null, null, null, null, true);
			setTimeout(function(){
				for(i=1;i<=wishListCount;i++) 
				{
					var id="srWLEligibleBagItem"+i;
					document.getElementById(id).innerHTML = shopRunnerDivHtml;
				}
			},3000);

		});

		//remove all wishlist items
		$('#sbWishlistHolder').on('click', '#delete-wishlist', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);
			var successCall = function() {
				reloadBagWishList();
			};
			var completeCall = function() {
			}
			var beforeSend = function() {
				$('.error-tooltip-alt').remove();
				showLoadingOverlay($('#sbWishlistHolder'));
			}
			var submitWl = function() {submitWishlistFromCart($this, successCall, completeCall, beforeSend);}
			showModal(null, submitWl, '/modals/confirmation/remove-item-wishlist.jsp?all=true', null, 300, true, 'center', null, null, null, null, null, true);
		});

		//move wishlist item to cart
		$('#sbWishlistHolder').on('click', '.add-item-from-wl', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);
			var successCall = function() {
				fireUtag = true;
				reloadBagWishList();
				reloadOrderSummary(true);
				scrollToElement($('#sbShoppingBagHolder'));
			};
			var completeCall = function() {
			}
			var beforeSend = function() {
				$('.error-tooltip-alt').remove();
				showLoadingOverlay($('#sbWishlistHolder'));
			}
			submitWishlistFromCart($this, successCall, completeCall, beforeSend);
			var shopRunnerDivHtml=$('#srEligibleBag').html();
			var commerceItemCount=$("#commerceItemCountForSR").val();
			if (typeof commerceItemCount == "undefined") {
				commerceItemCount=0;
			}
			commerceItemCount=commerceItemCount+1;
			var wishListCount=$("#wishListCount").val();
			wishListCount=wishListCount-1;
			setTimeout(function(){
					for(i=1;i<=commerceItemCount;i++) 
					{
						var id="srEligibleBagItem"+i;
						document.getElementById(id).innerHTML = shopRunnerDivHtml;
					}
				},3000);
			setTimeout(function(){
				for(j=1;j<=wishListCount;j++) 
					{
						var id="srWLEligibleBagItem"+j;
						document.getElementById(id).innerHTML = shopRunnerDivHtml;
					}
				},3000);
		});

		//move all wishlist items to cart
		$('#sbWishlistHolder').on('click', '#add-wishlist-to-cart', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);
			var successCall = function() {
				fireUtag = true;
				reloadBagWishList();
				reloadOrderSummary(true);
				scrollToElement($('#sbShoppingBagHolder'));
			};
			var completeCall = function() {
			}
			var beforeSend = function() {
				$('.error-tooltip-alt').remove();
				showLoadingOverlay($('#sbWishlistHolder'));
			}
			submitWishlistFromCart($this, successCall, completeCall, beforeSend);
		});

		//remove all bag items
		$('.empty-entire-bag').click(function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);

			var submitFunction = function() {
				var successCall = function() {
					reloadOrderSummary(true);
				};
				var completeCall = function() {
					scrollToElement($('body'));
				}
				var beforeSend = function() {
					$('.error-tooltip-alt').remove();
					showLoadingOverlay($('.sb-item-container'));
					showLoadingOverlay($('.order-summary-container'));
				}
				var errorCall = function(data) {
					cartErrorRight($this, data.errors[0].message);
					removeLoadingOverlay($('.sb-item-container'));
					removeLoadingOverlay($('.order-summary-container'));
				}
				var formId = '#' + $this.data('formid');
				ajaxFormSubmit($(formId), beforeSend, successCall, errorCall, completeCall);
			}

			showModal(null, submitFunction, '/modals/confirmation/remove-item-bag.jsp?all=true', null, 300, true, 'center', null, null, null, null, null, true);
		});

		//change item quantity
		$('.cart-items-container').on('change', '.sb-quantity-select', function(e) {
			//reset the session time out when enter acting with the page
			var shopRunnerDivHtml=$('#srEligibleBag').html();
			var commerceItemCount=$("#commerceItemCountForSR").val();
			EBGLOBAL.sessionTimeout.resetTimeout();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);
			var originalQty = $this.data('originalqty');
			var index = $this.data('itemindex');
			var formId = '#' + $this.data('formid');
			$('.qty-value_' + index).val($this.val());
			buildCommerceItemInputs($(formId), index);

			var successCall = function() {
				fireUtag = true;
				reloadOrderSummary(true);
			};
			var completeCall = function() {
				$('.created-commerce-inputs').remove();
			}
			var beforeSend = function() {
				$('.error-tooltip-alt').remove();
				showLoadingOverlay($('.sb-item-container'));
				showLoadingOverlay($('.order-summary-container'));
			}
			var errorCall = function(data) {
				if (data.maxCartItems != null && data.maxCartItems) {
					showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
				} else {
					cartError($this, data.errors[0].message);
				}
				$this.val(originalQty);
				removeLoadingOverlay($('.sb-item-container'));
				removeLoadingOverlay($('.order-summary-container'));
			}

			ajaxFormSubmit($(formId), beforeSend, successCall, errorCall, completeCall);
			setTimeout(function(){
				for(i=1;i<=commerceItemCount;i++)
				{
					var id="srEligibleBagItem"+i;
					document.getElementById(id).innerHTML = shopRunnerDivHtml;
				}
			},3000);
		});

		//remove item from cart
		$('.cart-items-container').on('click', '.remove-item-from-cart', function(e) {
			//reset the session time out when enter acting with the page
			var shopRunnerDivHtml=$('#srEligibleBag').html();
			var commerceItemCount=$("#commerceItemCountForSR").val();
			EBGLOBAL.sessionTimeout.resetTimeout();
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);
			var formId = '#' + $this.data('formid');
			if(formId.indexOf("gift")==-1){
				commerceItemCount=commerceItemCount-1;
			}
			var submitFunction = function() {
				var successCall = function() {
					reloadOrderSummary(true);
				};
				var completeCall = function() {
				}
				var beforeSend = function() {
					$('.error-tooltip-alt').remove();
					showLoadingOverlay($('.sb-item-container'));
					showLoadingOverlay($('.order-summary-container'));
				}
				var errorCall = function(data) {
					cartError($this, data.errors[0].message);
					removeLoadingOverlay($('.sb-item-container'));
					removeLoadingOverlay($('.order-summary-container'));
				}

				ajaxFormSubmit($(formId), beforeSend, successCall, errorCall, completeCall);
				setTimeout(function(){
					$("#srMessage").load("/shoprunner/srIneligibleMessage.jsp")
					},100);
				setTimeout(function(){
					for(i=1;i<=commerceItemCount;i++)
					{
						var id="srEligibleBagItem"+i;
						document.getElementById(id).innerHTML = shopRunnerDivHtml;
					}
				},3000);
			}

			showModal(null, submitFunction, '/modals/confirmation/remove-item-bag.jsp', null, 300, true, 'center', null, null, null, null, null, true);
		});

		//move item from cart to wishlist
		$('.cart-items-container').on('click', '.move-item-to-wishlist', function(e) {
			//reset the session time out when enter acting with the page
			EBGLOBAL.sessionTimeout.resetTimeout();
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);
			var formId = '#' + $this.data('formid');
			if ($this.hasClass('notLoggedIn')) {
				$this.addClass('selected-bag-item-wishlist');
				showModal(null, null, '/modals/account/pdp-wishlist-login.jsp?commerceId=' + $this.attr('data-commerceid') + '&fromCart=true&parentUrl=' + encodeURIComponent(location.href), null, 950, true, '10%', null, null);
				return false;
			}
			var successCall = function() {
				scrollToWishList = true;
				reloadOrderSummary(true);
				reloadBagWishList();
			};
			var completeCall = function() {
			};
			var beforeSend = function() {
				$('.error-tooltip-alt').remove();
				showLoadingOverlay($('.sb-item-container'));
				showLoadingOverlay($('.order-summary-container'));
			};
			var errorCall = function(data) {
				if (data.maxWlItems != null && data.maxWlItems) {
					showModal(null, null, '/modals/pdp/pdp-wishlist-bag-full.jsp', null, 500, true, '30%', null, null);
				} else {
					cartError($this, data.errors[0].message);
				}
				removeLoadingOverlay($('.sb-item-container'));
				removeLoadingOverlay($('.order-summary-container'));
			}

			ajaxFormSubmit($(formId), beforeSend, successCall, errorCall, completeCall);
			var shopRunnerDivHtml=$('#srEligibleBag').html();
			var commerceItemCount=$("#commerceItemCountForSR").val();
			commerceItemCount=commerceItemCount-1;
			var wishListCount=$("#wishListCount").val();
			if (typeof wishListCount == "undefined") {
				wishListCount=0;
			}
			wishListCount=wishListCount+1;
			setTimeout(function(){
					for(i=1;i<=commerceItemCount;i++)
					{
						var id="srEligibleBagItem"+i;
						document.getElementById(id).innerHTML = shopRunnerDivHtml;
					}
					
				},3000);
				setTimeout(function(){
				for(j=1;j<=wishListCount;j++) 
					{
						var id="srWLEligibleBagItem"+j;
						document.getElementById(id).innerHTML = shopRunnerDivHtml;
					}
				},3000);
		});

		$('.cart-items-container').on('click', '.add-monogram', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);

			var onLoadFunction = function() {
				monogramEventsCart($this, false);
			}
			showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $this.attr('data-productid') + '&skuid=' + $(this).attr('data-skuid'), null, 619, true, '15%', onLoadFunction, null);
		});

		$('.cart-items-container').on('click', '.add-gift-box', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);

			var onLoadFunction = function() {
				giftBoxEventsCart($this, false);
			}
			showModal(null, null, '/modals/pdp/pdp-add-gift-box.jsp', null, 580, true, '20%', onLoadFunction, null);
		});

		$('.cart-items-container').on('click', '.edit-gift-box', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);

			var onLoadFunction = function() {
				giftBoxEventsCart($this, true);
			}
			showModal(null, null, '/modals/pdp/pdp-add-gift-box.jsp', null, 580, true, '20%', onLoadFunction, null);
		});

		$('.cart-items-container').on('click', '.edit-monogram', function(e) {
			e.preventDefault();
			if ($('.sb-loading-overlay').length) {
				return false;
			}
			var $this = $(this);

			var onLoadFunction = function() {
				monogramEventsCart($this, true);
			}
			showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $this.attr('data-productid') + '&skuid=' + $(this).attr('data-skuid'), null, 619, true, '15%', onLoadFunction, null);
		});

		$('.cart-items-container').on('click', '.edit-bag-item', function(e) {
			if($(this).hasClass('is-gc')) {
				return;
			}
			e.preventDefault();
			showProductModal($(this));
		});

		$('.cart-items-container').on('click', '.wl-prod-thumb, .product-title', function(e) {
			if($(this).hasClass('is-gc')) {
				return;
			}
			e.preventDefault();
			$(this).closest('.sb-item').find('.buy-another-item').click();
		});

		$('.cart-items-container').on('click', '.buy-another-item', function(e) {
			if($(this).hasClass('is-gc')) {
				return;
			}
			e.preventDefault();
			showProductModal($(this));
		});

		$('#sbWishlistHolder').on('click', '.bag-wishlist-edit', function(e) {
			e.preventDefault();
			showProductModal($(this));
		});

		$('#sbWishlistHolder').on('click', '.wish-list-login', function(e) {
			e.preventDefault();
			showModal(null, null, '/modals/account/pdp-wishlist-login.jsp?fromCart=true&parentUrl=' + encodeURIComponent(location.href), null, 950, true, '10%', null, null);
		});

	}

	//IE7 Gift Box input focus
	$(document).on('focus', '.ie7 .add-gb-modal input[type="text"]', function() {
		$(this).css({'background-color' : '#FFFF99'});
	}).on('blur', '.ie7 .add-gb-modal input[type="text"]', function() {
		$(this).css({'background-color' : '#FFFFFF'});
	});

	/************** multiproduct ******************/
	if ($('body').hasClass('multi-product')) {
		try {
			var validProducts = $('.valid-products').attr('data-productids');
			if(validProducts != '') {
				var validPrdArray = validProducts.split(',');
				var liSize = $('.gtl-thumbs li').size();
				var liCount = 1;
				var realCount = 1;
				$('.gtl-thumbs li').each(function() {
					$this = $(this);
					var prdId = $this.attr('data-productid');
					if($.inArray(prdId, validPrdArray) >= 0) {
						$this.show()
						if(realCount >= 2) {
							$this.prev('.ampersand-product').show()
						}
						realCount++;
					}
					liCount++;
				});
			} else {
				$('#msku-head').hide();
				$('#mskuTopHolder').hide();
				$('.mskuSubmitHolder').hide();
			}
		} catch(err){}

		try {
			getTheLookMap = null;
			if($('.getTheLookMap').length) {
				getTheLookMap = $.parseJSON($('.getTheLookMap').text());
			}
			styleColors = new Array();
			styleSizes = new Array();
			styleColorDriver = new Array();
			styleSizeDriver = new Array();
			styleHemInseam = new Array();
			stylesMap = new Array();
			hemStyles = new Array();
			colorImageMap = new Array();
			priceMap = new Array();
			//build arrays of drivers
			jQuery('.msku-item').each(function(index, value) {
				var $this = $(this);
				styleColors[index] = $.parseJSON($this.find('.styleColors').text());
				styleSizes[index] = $.parseJSON($this.find('.styleSizes').text());
				styleColorDriver[index] = $.parseJSON($this.find('.styleColorDriver').text());
				styleSizeDriver[index] = $.parseJSON($this.find('.styleSizeDriver').text());
				styleHemInseam[index] = $.parseJSON($this.find('.styleHemInseam').text());
				stylesMap[index] = $.parseJSON($this.find('.stylesMap').text());
				hemStyles[index] =  $.parseJSON($this.find('.hemStyles').text());
				colorImageMap[index] =  $.parseJSON($this.find('.colorImageMap').text());
				priceMap[index] =  $.parseJSON($this.find('.priceMap').text());
				if ($this.find('.hemstyle-selection').length) {
					populateHemStyle($this.find('.style-selection:checked').val(), styleHemInseam[index], hemStyles[index], $this.find('.hemstyle-selection'));
				}
				enableSizeChart($this.find('.main-size-chart-link'));
				checkAddToBag($this);
			});

		} catch(err) {
			//so we don't break any other javascript
			if(window.console) {
				console.log(err);
			}
		}

		//more info modal
		$('#mskuDetailsHolder').on('click', '.multi-sku-details-trigger', function(e) {
			e.preventDefault();
			$this = $(this);
			var indexElement = $this.closest('.msku-item');
			var imgUrl = indexElement.find('.msku-img-holder img').attr('src');
			var onload = function() {
				multiSkuInit($this);
			};
			$
			showModal(null, null, '/modals/pdp/multi-sku-product-details.jsp?productId=' + $(this).attr('data-productid') + '&imgUrl=' + encodeURIComponent(imgUrl), null, 500, true, '10%', onload, null);
		});

		$('#mskuDetailsHolder').on('mouseenter', '.swatch-holder a', function() {
			$(this).addClass('temp-selected');
		});
		$('#mskuDetailsHolder').on('mouseleave', '.swatch-holder a', function() {
			$(this).removeClass('temp-selected');
		});


		//user clicks on style
		$('.style-selection').click(function(e) {
			var $this = $(this);
			var selectedStyle = $this.val();
			var indexElement = $this.closest('.msku-item');
			var index = indexElement.data('index');
			removeAllPdpErrors();
			indexElement.find('.msku-item-color').text('');
			populateColorSwatches(selectedStyle, styleColors[index], indexElement.find('.msku-swatches'));
			populateSizes(selectedStyle, styleSizes[index], styleColorDriver[index], null, indexElement.find('.size-selection').val(), false, indexElement.find('.size-selection'));
			if (indexElement.find('.hemstyle-selection').length) {
				populateHemStyle(selectedStyle, styleHemInseam[index], hemStyles[index], indexElement.find('.hemstyle-selection'));
				populateInseam(null, null, styleHemInseam[index], indexElement.find('.inseam-selection'), indexElement.find('.inseam-length-container'));
			}
			populateColors(selectedStyle, styleColors[index], styleSizeDriver[index], null, indexElement.find('.color-selection').val(), false, indexElement.find('.color-selection'));

			if (indexElement.find('.size-selection').val() == '' && indexElement.find('.size-selection option').size() == 2) {
				indexElement.find('.size-selection').val(indexElement.find('.size-selection option').eq(1).val());
				indexElement.find('.size-selection').change();
			}
			if (indexElement.find('.color-selection').val() == '' && indexElement.find('.color-selection option').size() == 2) {
				indexElement.find('.color-selection').val(indexElement.find('.color-selection option').eq(1).val());
				indexElement.find('.color-selection').change();
			} else if(indexElement.find('.color-selection').val() != '') {
				indexElement.find('.color-selection').change();
			}
			var colorId = indexElement.find('.color-selection').val();
			if(colorId == '') {
				colorId = indexElement.find('.color-selection option').eq(1).val();
			}
			populateMultiProductImg(colorId, indexElement, colorImageMap[index], styleColors[index], false);
			checkAddToBag(indexElement);
		});

		//user changes hemstyle
		$('.hemstyle-selection').change(function(e) {
			var $this = $(this);
			var indexElement = $this.closest('.msku-item');
			var index = indexElement.data('index');
			if ($this.val() != '') {
				removePdpError($this);
			}
			populateInseam(indexElement.find('.style-selection:checked').val(), $this.val(), styleHemInseam[index], indexElement.find('.inseam-selection'), indexElement.find('.inseam-length-container'));
			checkAddToBag(indexElement);
		});

		//user changes inseam length
		$('.inseam-selection').change(function(e) {
			if ($(this).val() != '') {
				removePdpError($(this));
			}
			checkAddToBag($(this).closest('.msku-item'));
		});

		//user changes size
		$('.size-selection').change(function(e) {
			var $this = $(this);
			var indexElement = $this.closest('.msku-item');
			var index = indexElement.data('index');
			if($this.val() == '') {
				checkAddToBag();
				populateColors(indexElement.find('.style-selection:checked').val(), styleColors[index], styleSizeDriver[index], $this.val(), indexElement.find('.color-selection').val(), true, indexElement.find('.color-selection'));
				return false;
			}
			if ($this.val() != '' && !indexElement.find('.size-selected option:selected').hasClass('text-light')) {
				removePdpError($this);
				removePdpError(indexElement.find('.color-selection'));
			}
			populateColors(indexElement.find('.style-selection:checked').val(), styleColors[index], styleSizeDriver[index], $this.val(), indexElement.find('.color-selection').val(), true, indexElement.find('.color-selection'));
			if (indexElement.find('.color-selection').val() == '' && indexElement.find('.color-selection option').size() == 2) {
				indexElement.find('.color-selection').val(indexElement.find('.color-selection option').eq(1).val());
				indexElement.find('.color-selection').change();
			}
			checkAddToBag(indexElement);
		});

		//user changes color
		$('.color-selection').change(function(e) {
			var $this = $(this);
			var indexElement = $this.closest('.msku-item');
			var index = indexElement.data('index');
			if($this.val() == '') {
				checkAddToBag();
				indexElement.find('.swatch-holder a').removeClass('selected');
				populateSizes(indexElement.find('.style-selection:checked').val(), styleSizes[index], styleColorDriver[index], $this.val(), indexElement.find('.size-selection').val(), true, indexElement.find('.size-selection'));
				return false;
			}
			if ($this.val() != '' && !indexElement.find('.size-selected option:selected').hasClass('text-light')) {
				removePdpError($this);
				removePdpError(indexElement.find('.size-selection'));
			}
			populateColorTextMulti($this.val(), indexElement.find('.style-selection:checked').val(), styleColors[index], indexElement);
			populateSizes(indexElement.find('.style-selection:checked').val(), styleSizes[index], styleColorDriver[index], $this.val(), indexElement.find('.size-selection').val(), true, indexElement.find('.size-selection'));
			populateMultiProductPrice(styleColors[index], priceMap[index], indexElement);
			if (indexElement.find('.size-selection').val() == '' && indexElement.find('.size-selection option').size() == 2) {
				indexElement.find('.size-selection').val(indexElement.find('.size-selection option').eq(1).val());
				indexElement.find('.size-selection').change();
			}
			var colorId = indexElement.find('.color-selection').val();
			if(colorId == '') {
				colorId = indexElement.find('.color-selection option').eq(1).val();
			}
			populateMultiProductImg(colorId, indexElement, colorImageMap[index], styleColors[index], false);

			checkAddToBag(indexElement);
			/* **************** CHANGE IMAGE ******************* */
		});

		//user clicks on pdp swatch
		$('.msku-item').on('click', '.swatch-holder a', function(e) {
			e.preventDefault();
			var $this = $(this);
			var indexElement = $this.closest('.msku-item');
			var index = indexElement.data('index');
			populateColorTextMulti($this.attr('data-colorid'), indexElement.find('.style-selection:checked').val(), styleColors[index], indexElement);
			populateSizes(indexElement.find('.style-selection:checked').val(), styleSizes[index], styleColorDriver[index], $this.attr('data-colorid'), indexElement.find('.size-selection').val(), true, indexElement.find('.size-selection'));
			populateMultiProductPrice(styleColors[index], priceMap[index], indexElement);
			populateColors(indexElement.find('.style-selection:checked').val(), styleColors[index], styleSizeDriver[index], indexElement.find('.size-selection').val(), $this.attr('data-colorid'), true, indexElement.find('.color-selection'));

			if (indexElement.find('.size-selection option').size() == 2) {
				indexElement.find('.size-selection').val(indexElement.find('.size-selection option').eq(1).val());
				indexElement.find('.size-selection').change();
			}
			var colorId = indexElement.find('.color-selection').val();
			if(colorId == '') {
				colorId = indexElement.find('.color-selection option').eq(1).val();
			}
			populateMultiProductImg(colorId, indexElement, colorImageMap[index], styleColors[index], false);

			checkAddToBag(indexElement);
			/* **************** CHANGE IMAGE ******************* */
		});

		//user clicks on add to cart button
		$('#mskuSubmit').click(function(e) {
			e.preventDefault();
			var $this = $(this);
			if ($this.hasClass('active-loading') || $this.hasClass('disabled')) {
				return false;
			}
			var isValid = validateMultiProducts($this);
			if (isValid) {
				var cont = false;
				cont = buildCartFormValuesMulti(styleSizeDriver);
				if (cont) {
					var successCallBack = function(data){
						location.href = "/checkout/bag.jsp"
					};
					var errorCallBack = function(data) {
						if (data.maxCartItems != null && data.maxCartItems) {
							showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
						} else {
							showPdpError($('.add-multi-sku-cart'), data.errors[0].message);
						}
					}
					var beforeSend = function() {$this.addClass('active-loading');}
					var completeCallBack = function() {$this.removeClass('active-loading');};
					ajaxFormSubmit($('#add-to-bag-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
				}
			}
		});
		$('#mskuSubmitTop').click(function(e) {
			e.preventDefault();
			$('#mskuSubmit').click();
		});

		jQuery('.msku-item').each(function(index, value) {
			var $this = $(this);
			if ($this.find('.size-selection option').size() == 2) {
				$this.find('.size-selection').val($this.find('.size-selection option').eq(1).val());
				$this.find('.size-selection').change();
			}
			if ($this.find('.color-selection option').size() == 2) {
				$this.find('.color-selection').val($this.find('.color-selection option').eq(1).val());
				$this.find('.color-selection').change();
			}

			var prdId = $this.attr('data-productid');
			var dColor = '';
			var dSize = '';
			try {
				if(getTheLookMap != null && getTheLookMap[prdId] != null) {
					dSize = getTheLookMap[prdId]['sizeId'];
					dColor = getTheLookMap[prdId]['colorId'];
				}
			} catch(err){
			}
			//Get The Look.
			var validStyles = $('.valid-styles-'+index).attr('data-styleids');
			if(validStyles != '') {
				var styleId='';
				var validStyleArray = validStyles.split(',');
				jQuery.each(validStyleArray, function(ind, value) { 
					styleId=value;    //alert(styleId);
					var selStyle = '';
						$.each(styleColors[index][styleId], function(key, colorObj) { 
							if(colorObj.colorId == dColor) { 
								selStyle=styleId;
								$('.style-selection[value="' + styleId + '"]').prop('checked', true);
								$('.style-selection[value="' + styleId + '"]').click();
								return false;
							}
						});
						if(selStyle != '') {
							return false;
						} 
				});
			}	
			
			$this.find('.size-selection').val(dSize);
			if($this.find('.size-selection').val() != '') {
				if(dColor == '')
					$this.find('.size-selection').change();
			}
			if(dColor == '') {
			} else if($this.find('.color-selection option').size() > 2) {
				$this.find('.color-selection').val(dColor);
				if($this.find('.color-selection').val() != '') {
					$this.find('.color-selection').change();
				}
			}
			if($this.find('.color-selection').val() == '') {
				var colorId = $this.find('.color-selection').val();
				if(colorId == '') {
					colorId = $this.find('.color-selection').attr('data-defaultcolor');
					if($.trim(colorId) == '') {
						colorId = $this.find('.color-selection option').eq(1).val();
					}
				}
				populateMultiProductImg(colorId, $this, colorImageMap[index], styleColors[index], true);
				populateMultiProductPrice(styleColors[index], priceMap[index], $this);
			}

		});
	}

	$('.gcSku').on('click', function() {
		$('#gcSkuId').val($(this).val());
	});

	//user clicks on add to cart button for giftcard
	/*
	$('#buyGCSubmitBtn').on('click', function(e) {
		e.preventDefault();

		var $this = $(this);

		if ($this.hasClass('active-loading')) {
			return false;
		}

		$this.addClass('active-loading');

		var successCallBack = function(data, status, xhr){
			var successForm = $(data);

			window.location = "/checkout/bag.jsp";
			// showModal(null, null, '/modals/pdp/pdp-shopping-bag-added.jsp?commerceId=' + commerceId, null, 600, true, '15%', null, null, $('body'));
			// updateShoppingBagCount();
		};

		var errorCallBack = function(data) {
			$('#custServContent').html(data);
		}

		var completeCallBack = function() { $this.removeClass('active-loading'); };

		ajaxFormSubmit($('#add-to-bag-form'), null, successCallBack, errorCallBack, completeCallBack, false, 'html');
		$this.removeClass('active-loading');

		return false;
	});
	*/

	$('#egcAssociate').on('blur', function() {
		var	context = $(this),
		formItem = context.parents('fieldset.formItem');

		$.ajax({
			type:'post',
			url:'/catalog/submit/apply-coupon-code.jsp',
			data:formItem.serialize(),
			async:false
		});
	});

	$(window).load(function() {
		//$('.results-list #facetSelectionForm div h3').eq(0).addClass('open');
		$('.results-list input[checked="checked"]').attr('checked', "checked");
		$('.results-list input[checked="checked"]').parents('ul').siblings('h3').addClass('open');
	});

	if ($('.toggleCategoryImage').length) {
		$([$('.toggleCategoryImage').data('product-image')]).preload();
	}

	$('#resultsListHolder').on('click', '.toggleCategoryImage', function() {
		var	context	= $(this),
		sourceObject = { imageurl:context.data('product-image'),
							productlink:context.data('product-url') },
		targetObject = { image:context.parents('.prd-preview').find('.preview-thumb img.prd-image'),
							imagelink:context.parents('.prd-preview').find('.preview-thumb a.prd-name'),
							textlink:context.parents('.prd-preview').find('.preview-details a.prd-name') };

		for (var objectItem in targetObject) {
			if (objectItem == "image") {
				targetObject[objectItem].attr('src', sourceObject.imageurl);
			}
			else {
				targetObject[objectItem].attr('href', sourceObject.productlink);
			}

		}

		context.parents('.swatch-holder').find('.selected-swatch').removeClass('selected-swatch');
		context.addClass('selected-swatch');
		return false;
	});

	//TAGGING
	//A7
//	if(readCookie('a7') == null) {
//		if($('#headNotifier')) {
//			createCookie('a7','Yes',7);
//		}
//	}

});

//address validation for pro deals
function validateProDealsAddress($this, event, type) {
	var url = '/xhr/address-validation.jsp';
	if(type == 'billing') {
		var cityElem = $('#billCity');
		var stateElem = $('#billState');
		var zipElem = $('#billZipCode');
		var countryElem = $('#billCountry');
		$('#whichAddressType').val('billing');
		$('#address-validation-form').prop('action', url + '?whichType=billing');
	} else if(type == 'shipping') {
		var cityElem = $('#shipCity');
		var stateElem = $('#shipState');
		var zipElem = $('#shipZipCode');
		var countryElem = $('#shipCountry');
		$('#whichAddressType').val('shipping');
		$('#address-validation-form').prop('action', url + '?whichType=shipping');
	} else {
		var cityElem = $('#empCity');
		var stateElem = $('#empState');
		var zipElem = $('#empZipCode');
		var countryElem = $('#empCountry');
		$('#whichAddressType').val('employer');
		$('#address-validation-form').prop('action', url + '?whichType=employer');
	}
	var city = $.trim(cityElem.val());
	var state = $.trim(stateElem.val());
	var zip = $.trim(zipElem.val());
	var country = $.trim(countryElem.val());

	if(city != '' && state != '' && zip != '' && country != '') {
		$('#address-validation-form #av-city').val(city);
		$('#address-validation-form #av-state').val(state);
		$('#address-validation-form #av-zip').val(zip);
		$('#address-validation-form #av-country').val(country);
		var successCall = function(data) {
			if($.trim(data) != 'valid') {
				event.preventDefault();
				//show modal
				var success = function() {
					if(!$('#continueWithoutSuggestion').prop('checked') && $('#addressSelect').val() == '') {
						$('.address-validation-error').show();
						$('#addressSelect').addClass('error-field');
						return false;
					} else {
						$('.address-validation-error').hide();
						$('#addressSelect').removeClass('error-field');
					}
					if(!$('#continueWithoutSuggestion').prop('checked')) {
						cityElem.val($('#addressSelect option:selected').attr('data-city'));
						stateElem.val($('#addressSelect option:selected').attr('data-state'));
						zipElem.val($('#addressSelect option:selected').attr('data-zip'));
					}
					var whichType = $('#whichAddressType').val();
					if(whichType == 'billing') {
						validateProDealsAddress($this, event, 'shipping');
					} else if(whichType == 'shipping') {
						validateProDealsAddress($this, event, 'employer');
					} else {
						$this.addClass('skip-validation');
						$this.find('#proDealsSubmitBtn').click();
						$this.removeClass('skip-validation');
					}
				}
				var onload = function() {
					$('#addressSelect').change(function() {
						if($('#addressSelect').val() != '') {
							$('#addressSelect').removeClass('error-field');
							$('.address-validation-error').hide();
						}
					});
				}
				showModal(null, success, null, null, 500, true, '20%', onload, null, data);
			} else {
				var whichType = $('#whichAddressType').val();
				if(whichType == 'billing') {
					validateProDealsAddress($this, event, 'shipping');
				} else if(whichType == 'shipping') {
					validateProDealsAddress($this, event, 'employer');
				} else {
					$this.addClass('skip-validation');
					$this.find('#proDealsSubmitBtn').click();
					$this.removeClass('skip-validation');
				}
			}
		}
		addressValidationSubmit($('#address-validation-form'), null, successCall, null, null);
	} else {
		var whichType = $('#whichAddressType').val();
		if(whichType == 'billing') {
			validateProDealsAddress($this, event, 'shipping');
		} else if(whichType == 'shipping') {
			validateProDealsAddress($this, event, 'employer');
		} else {
			$this.addClass('skip-validation');
			$this.find('#proDealsSubmitBtn').click();
			$this.removeClass('skip-validation');
		}
	}
}

//end kiosk session after 5 minutes of inactivity
function kioskSession() {
	setTimeout(function() {
		location.href = $('#endKioskSession').attr('href');
	},300000);
}
function productDetailPageFunctions() {
	$('#pdpAlsoLike a').click(function(e) {
		var name = $(this).attr('title') + '(' + $(this).data('prdid') + ')';
		cmCreateElementTag(name, 'PDP YMAL');
	});
	$('.tabs li a').click(function(e) {
		var tabname = $(this).text();
		var pName = $('#product-display-name').text();
		var pId = $('#product-id-value').attr('data-realprdid');
		try {
			cmCreateElementTag(tabname, 'PDP Tabs');
		} catch(err){
			if(window.console) {
				console.log(err);
			}
		}
	});
	if (jQuery('body.pdp').length > 0) {
		var $activeButton = "";
		jQuery("#detailsModule #pdpTabHolder .tab-content a.viewer").attr("data-selected", "viewer");
		jQuery('a[href*="youtu.be"]').attr("data-selected", "youtube");

		jQuery("#detailsModule #pdpTabHolder .tab-content a.viewer").on('click', function() {
			$activeButton = jQuery(this).data("selected");
			eventClick($activeButton);
		});
		jQuery('a[href*="youtu.be"]').on('click', function() {
			$activeButton = jQuery(this).data("selected");
			eventClick($activeButton);
		});

		function eventClick(a) {
			switch (a) {
				case "viewer":
					jQuery("#youtube").remove();
					var style = document.createElement("style");
					style.type = "text/css";
					style.id = "viewer";
					style.innerHTML = "#fbBox #fbContent {width: 850px !important;}";
					document.body.appendChild(style);
					break;
				case "youtube":
					jQuery("#viewer").remove();
					var style = document.createElement("style");
					style.type = "text/css";
					style.id = "youtube";
					style.innerHTML = "#fbBox #fbContent {width: 664px !important;}";
					document.body.appendChild(style);
					break;
			}
		}
	}
	$('.tabs').tabs('.tab-content > div');

	$('.tab-content').find('.no-display').removeClass('no-display');
	//pdp share
	$('#productDetailsHolder').on('click', '.pdp-email-share', function(e) {
		e.preventDefault();
		if($('.wishlist-share').length) {
			return false;
		}
		var selectedColor = $('#pdpSelectColor').val();
		var skuId = '';
		if(selectedColor == '') {
			selectedColor = $('#pdpSelectColor').attr('data-defaultcolor');
		}
		if(selectedColor != '') {
			skuId = getSkuFromColorDriverObj($('.style-selection:checked').val(), null, selectedColor, styleColorDriver);
		}
		var onload = sharePdpEvents;
		showModal(null, null, '/modals/share/pdp-share-form.jsp?productId=' + $('#productDetailsHolder').attr('data-productid') + '&skuId=' + skuId, null, 610, true, '5%', onload, null, null, null, true);
	});
}

function showSoldOutState(soldOutObj) {
	$('.col-2.left').addClass('sold-out-exp');
	$('.col-3.left').hide();
	$('#pdpTabHolder').hide();
	$('#pdpShare').hide();
	$('#zoomThumbHolder').hide();
	$('.pdpSwatches').hide();
	$('#zoom').removeClass('MagicZoomPlus');
	$('.MagicZoomLoading').hide();
	$('.zoom-look').hide();
	$('#bazaarVoiceContainer').hide();
	$('#BVRRRatingSummarySourceID').hide();

	//sold out message
	$('<div class="sold-out-message"><h5>SOLD OUT</h5><span>We are sorry, this item has sold out and is no longer available</span></div>').insertAfter('#pdpPriceHolder');

	try {
		//load image
		var img = soldOutObj.img;
		var s7 = soldOutObj.s7;
		var colorName = soldOutObj.colorName;
		$('.med-zoom-img').attr('src', s7 + img);
		$('#zoom').show();
		$('.pdp-item-color').text(colorName);
		$('#imageZoom #zoom img').one('load', function() {
			$('#imageZoom').removeClass('pdp-image-holder');
		});
		if(soldOutObj.listPrice != '') {
			$('#pdpPriceHolder').html('<span class="regular-price">' + soldOutObj.listPrice + '</span><span class="sale-price">' + soldOutObj.ebPrice + '</span>');
		} else {
			$('#pdpPriceHolder').html('<span>' + soldOutObj.ebPrice + '</span>');
		}
	} catch(err) {}

	var catHtml = '';
	$('.breadcrumbs li').each(function(index, value) {
		var $this = $(this);
		if(index != 0 && $this.find('a').length)
			catHtml += '<li><a href="' + $this.find('a').attr('href') + '">' + $this.find('a').text() + '</a></li>';
	});
	var ymalHtml = '';
	$('#pdpAlsoLike li').each(function(index, value) {
		var $this = $(this);
		var link = $this.find('a').attr('href');
		var image = $this.find('img').data('imgurl');
		var name = $this.find('img').attr('alt');
		ymalHtml += '<li><a title="' + name + '" href="' + link + '"><img src="' + image + '" alt="' + name + '"/></a><p>' + name + '</p></li>';
	});


	var html =
		'<div id="sold-out-experience">' +
			'<span><strong>SHOP FOR SIMILAR ITEMS IN:</strong></span>' +
			'<ul class="nav-list related-categories">' +
				catHtml +
			'</ul>' +
			'<br>' +
			'<span><strong>OR YOU MAY ALSO LIKE:</strong></span>' +
			'<ul class="nav-list ymal-sold-out">' +
				ymalHtml +
			'</ul>' +
		'</div>';
	$('#detailsModule').append(html);
	//tealiumCallPdp();
}

function initializePdp(selectedColor) {
	$('#pdpAddCartForm').on('contextmenu', 'a, input', function() {
		return false;
	});
	
	$('#pdpSelectColor').attr('data-selectedcolor',selectedColor);

	enableSizeChart($('.main-size-chart-link'));
	/************** PDP ******************/
	try {
		productDisplayName =  $('<div/>').text($('#product-display-name').text()).html().replace('"', '&quot;');
		wishlistErrorMsg = $.trim($('.wishlist-all-selections-error').text());
		pdpErrorMsg = $.trim($('.bag-all-selections-error').text());
		styleColors = $.parseJSON($('.styleColors').text());
		styleSizes = $.parseJSON($('.styleSizes').text());
		styleColorDriver = $.parseJSON($('.styleColorDriver').text());
		styleSizeDriver = $.parseJSON($('.styleSizeDriver').text());
		styleHemInseam = $.parseJSON($('.styleHemInseam').text());
		stylesMap = $.parseJSON($('.stylesMap').text());
		hemStyles = $.parseJSON($('.hemStyles').text());
		colorImageMap = $.parseJSON($('.colorImageMap').text());
		colorImageAltMap = $.parseJSON($('.colorImageAltMap').text());
		clearanceColors = $.parseJSON($('.clearanceColors').text());
		allColorsMap = $.parseJSON($('.allColorsMap').text());
		priceMap = $.parseJSON($('.priceMap').text());
		if ($('#pdpSelectHemStyle').length) {
			populateHemStyle($('.style-selection:checked').val(), styleHemInseam, hemStyles, $('#pdpSelectHemStyle'));
		}
		if(clearanceColors != null) {
			populateColorSwatchesWithClearance($('.style-selection:checked').val(), styleColors, $('.pdpSwatches .swatch-holder'), clearanceColors);
		} else {
			populateColorSwatches($('.style-selection:checked').val(), styleColors, $('.pdpSwatches .swatch-holder'));
		}
		if($('#styleCutHolder').data('iseobonlyclearance')) {
			$('<div class="clearance-text">CLEARANCE</div>').insertBefore('.pdpSwatches');
		}
		populatePdpPrice(priceMap, 'all', styleColors);
		populateSkuId($('.style-selection:checked').val(), stylesMap);
	} catch(err) {
		//so we don't break any other javascript
		if(window.console) {
			console.log(err);
		}
	}
	$(document).ready(function() {
		$('.tip-trigger[title]').tooltip({ 'layout': '<div><img class="tt-arrow" src="/static/img/tip-trigger-arrow.png" alt="" /></div>' });
		/************** Receive Message from login modal ***************/

		$.receiveMessage(function(e) {
			if (e.data == 'loginSuccess') {
				addToWishlistFromLogin(styleSizeDriver);
			}
		});
		$('.parent-window').click(function(e) {
			e.preventDefault();
			parent.location.href=$(this).attr('href');
		});
		$('#productDetailsHolder').on('click', '.thumb-enlarge-text', function(e) {
			e.preventDefault();
			showPdpZoom();
		});
		/*$('#zoom').click(function(e) {
			e.stopImmediatePropagation();
			$('.thumb-enlarge-text a').click();
		});*/
		$('#eb-write-review').click(function(e){

			$(this).attr('href', $('#bv-write-review-link div.BVRRRatingSummaryLink').eq(1).find('a').attr('href'));

		});
		// Kids Slogan copy
		if(jQuery('body').hasClass('pdp')){
			var skuId = jQuery('.sku-id').html();
			var deptId = skuId.substring(0,3);
			if (deptId =="i87"){
			jQuery('#imageZoom').append( "<span id='mountainGuideText'>Mountain Guide In Training&trade;</span>" )
			}
		}
		//Add tooltip function to prevent the default click behavior on the PDP
		jQuery('body.pdp a.toolTip').bind('click', function(e){
			e.preventDefault();
		});
	});

	//pdp about gift box modal
	showModal($('.pdp-about-gb'), null, '/modals/pdp/pdp-about-gift-boxes.jsp', null, 600, false, '20%', null, null, null, null, true);

	//pdp about monograms modal
	showModal($('.pdp-about-monogram'), null, '/modals/pdp/pdp-about-monograms.jsp', null, 580, false, '20%', null, null, null, null, true);

	$('.style-selection').click(function(e) {
		var selectedStyle = $(this).val();
		removeAllPdpErrors();
		$('.pdp-color-text').text('');
		if(clearanceColors != null) {
			populateColorSwatchesWithClearance($('.style-selection:checked').val(), styleColors, $('.pdpSwatches .swatch-holder'), clearanceColors);
		} else {
			populateColorSwatches($('.style-selection:checked').val(), styleColors, $('.pdpSwatches .swatch-holder'));
		}
		populateSizes(selectedStyle, styleSizes, styleColorDriver, null, $('#pdpSelectSize').val(), false, $('#pdpSelectSize'));
		if ($('#pdpSelectHemStyle').length) {
			populateHemStyle(selectedStyle, styleHemInseam, hemStyles, $('#pdpSelectHemStyle'));
			populateInseam(null, null, styleHemInseam, $('#pdpSelectHemLength'), $('.inseam-length-container'));
		}
		populateColors(selectedStyle, styleColors, styleSizeDriver, null, $('#pdpSelectColor').val(), false, $('#pdpSelectColor'));
		populatePdpPrice(priceMap, 'style', styleColors);
		populateSkuId(selectedStyle, stylesMap);
		if ($('#pdpSelectSize').val() == '' && $('#pdpSelectSize option').size() == 2) {
			$('#pdpSelectSize').val($('#pdpSelectSize option').eq(1).val());
			$('#pdpSelectSize').change();
		}
		if ($('#pdpSelectColor').val() == '' && $('#pdpSelectColor option').size() == 2) {
			$('#pdpSelectColor').val($('#pdpSelectColor option').eq(1).val());
			$('#pdpSelectColor').change();
		} else if($('#pdpSelectColor').val() != '') {
			$('#pdpSelectColor').change();
		} else if($('#pdpSelectColor').val() == '') {
			var defaultcolorId = $('#pdpSelectColor').attr('data-defaultcolor');
			if(defaultcolorId != '' && colorImageMap[defaultcolorId] != null && (defaultcolorId in colorImageMap)) {
				populateCanvasImage(defaultcolorId, colorImageMap, colorImageAltMap);
			} else {
				populateCanvasImage($('#pdpSelectColor option').eq(1).val(), colorImageMap, colorImageAltMap);
			}
		}
	});

	//user changes hemstyle
	$('#pdpSelectHemStyle').change(function(e) {
		if ($(this).val() != '') {
			removePdpError($(this));
		}
		populateInseam($('.style-selection:checked').val(), $(this).val(), styleHemInseam, $('#pdpSelectHemLength'), $('.inseam-length-container'));
	});

	//user changes inseam length
	$('#pdpSelectHemLength').change(function(e) {
		if ($(this).val() != '') {
			removePdpError($(this));
		}
	});

	$('#pdpSelectQuantity').change(function(e) {
		removePdpError($('#pdpAddCartFormSubmit'));
	});

	//user changes size
	$('#pdpSelectSize').change(function(e) {
		if($(this).val() == '') {
			populateColors($('.style-selection:checked').val(), styleColors, styleSizeDriver, $(this).val(), $('#pdpSelectColor').val(), true, $('#pdpSelectColor'));
			return false;
		}
		if ($(this).val() != '' && !$('#pdpSelectSize option:selected').hasClass('text-light')) {
			removePdpError($(this));
			removePdpError($('#pdpAddCartFormSubmit'));
			removePdpError($('#pdpSelectColor'));
		}
		populateColors($('.style-selection:checked').val(), styleColors, styleSizeDriver, $(this).val(), $('#pdpSelectColor').val(), true, $('#pdpSelectColor'));
		if ($('#pdpSelectColor').val() == '' && $('#pdpSelectColor option').size() == 2) {
			$('#pdpSelectColor').val($('#pdpSelectColor option').eq(1).val());
			$('#pdpSelectColor').change();
		}
	});

	//user changes color
	$('#pdpSelectColor').change(function(e) {
		if($(this).val() == '') {
			$('.swatch-holder a').removeClass('selected');
			var	colorId = $(this).val(),
			styleId = $('.style-selection:checked').val();
			populateSizes(styleId, styleSizes, styleColorDriver, colorId, $('#pdpSelectSize').val(), true, $('#pdpSelectSize'));
			return false;
		}
		if ($(this).val() != '' && !$('#pdpSelectColor option:selected').hasClass('text-light')) {
			removePdpError($(this));
			removePdpError($('#pdpAddCartFormSubmit'));
			removePdpError($('#pdpSelectSize'));
		}

		var	colorId = $(this).val(),
		styleId = $('.style-selection:checked').val();

		populateColorText($(this).val(), $('.style-selection:checked').val(), styleColors);
		populateSizes(styleId, styleSizes, styleColorDriver, colorId, $('#pdpSelectSize').val(), true, $('#pdpSelectSize'));
		populatePdpPrice(priceMap, 'color', styleColors);
		populateCanvasImage(colorId, colorImageMap, colorImageAltMap);

		if ($('#pdpSelectSize').val() == '' && $('#pdpSelectSize option').size() == 2) {
			$('#pdpSelectSize').val($('#pdpSelectSize option').eq(1).val());
			$('#pdpSelectSize').change();
		}
		if($('.pdp-clearance-container').length && $('.pdp-clearance-container').is(':visible')) {
			populateSkuId($('.style-selection:checked').val(), stylesMap);
		}

	});

	//user clicks on pdp swatch
	$('.pdpSwatches, .pdp-swatches-clearance').on('click', '.swatch-holder a, .swatch-holder-clearance a', function(e) {
		e.preventDefault();

		var	colorId = $(this).attr('data-colorid'),
		styleId = $('.style-selection:checked').val();
		removePdpError($('#pdpSelectColor'));
		removePdpError($('#pdpAddCartFormSubmit'));
		removePdpError($('#pdpSelectSize'));
		populateColorText(colorId, $('.style-selection:checked').val(), styleColors);
		populateSizes(styleId, styleSizes, styleColorDriver, colorId, $('#pdpSelectSize').val(), true, $('#pdpSelectSize'));
		//$('#pdpSelectColor option').removeClass('no-display');

		var	imageUrl = colorImageMap[colorId].defaultCanvasImage;
		var	colorName = null;

		for (var colorItem in styleColors[styleId]) {
			if (styleColors[styleId][colorItem].colorId == colorId) {
				colorName = styleColors[styleId][colorItem].colorName;
			}
		}
		populateColors($('.style-selection:checked').val(), styleColors, styleSizeDriver, $('#pdpSelectSize').val(), colorId, true, $('#pdpSelectColor'));

		populatePdpPrice(priceMap, 'color', styleColors);
		populateCanvasImage(colorId, colorImageMap, colorImageAltMap);
		if ($('#pdpSelectSize').val() == '' && $('#pdpSelectSize option').size() == 2) {
			$('#pdpSelectSize').val($('#pdpSelectSize option').eq(1).val());
			$('#pdpSelectSize').change();
		}
		if($('.pdp-clearance-container').length && $('.pdp-clearance-container').is(':visible')) {
			populateSkuId($('.style-selection:checked').val(), stylesMap);
		}
	});

	$('.pdpSwatches, .pdp-swatches-clearance').on('mouseenter', '.swatch-holder a, .swatch-holder-clearance a', function(e) {
		var	colorId = $(this).attr('data-colorid'),
		styleId = $('.style-selection:checked').val();
		populateColorTextHover(colorId, $('.style-selection:checked').val(), styleColors);
	});

	$('.pdpSwatches, .pdp-swatches-clearance').on('mouseleave', '.swatch-holder a, .swatch-holder-clearance a', function(e) {
		resetColorText();
	});

	//user hovers over add to cart button
	$('#pdpAddCartFormSubmit, #buyBagItem, #editBagItem').hover(function() {
		var errorMsg = pdpErrorMsg;
		checkAddToBagHoverError($(this), errorMsg);
	},function() {
		removePdpErrorHover($(this));
	});

	//user hovers over add to wish list button
	$('#pdpAddCartForm').on('mouseenter', '#pdpAddToWishlist, #editWishlistItem, #editBagWishlistItem', function() {
		var errorMsg = wishlistErrorMsg;
		checkAddToBagHoverError($(this), errorMsg);
	});

	$('#pdpAddCartForm').on('mouseleave', '#pdpAddToWishlist, #editWishlistItem, #editBagWishlistItem', function () {
		removePdpErrorHover($(this));
	});

	//user clicks on add to cart button
	$('#pdpAddCartFormSubmit').click(function(e) {
		e.preventDefault();
		var hideMiniCartEligible=$('#hideMiniCartEligible').html();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		$this.addClass('active-loading');
		var errorMsg = pdpErrorMsg;
		var isValid = validatePdpDropdowns($this, errorMsg);
		if (isValid) {
			var cont = false;
			cont = buildCartFormValues(styleSizeDriver);
			if (cont) {
				if ($('#pdp-gift-box-option').prop('checked') && $('#pdp-monogram-option').prop('checked')) {
					var onLoadFunction = function() {
						giftBoxEvents(true);
					}
					showModal(null, null, '/modals/pdp/pdp-add-gift-box.jsp', null, 580, true, '20%', onLoadFunction, null);
					$this.removeClass('active-loading');
				} else if ($('#pdp-gift-box-option').prop('checked')) {
					var onLoadFunction = function() {
						giftBoxEvents(false);
					}
					showModal(null, null, '/modals/pdp/pdp-add-gift-box.jsp', null, 580, true, '20%', onLoadFunction, null);
					$this.removeClass('active-loading');
				} else if ($('#pdp-monogram-option').prop('checked')) {
					var onLoadFunction = monogramEvents;
					showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $('#bag-product-id').val() + '&skuid=' + $('#bag-skuId').val(), null, 619, true, '15%', onLoadFunction, null);
					$this.removeClass('active-loading');
				} else {
					var successCallBack = function(data){
						var commerceId = data.commerceId;
						var onload = addToBagModalLoad;
						showModal(null, null, '/modals/pdp/pdp-shopping-bag-added.jsp?commerceId=' + commerceId, null, 600, true, '15%', onload, null);
						updateShoppingBagCount();
					};
					var errorCallBack = function(data) {
						if (data.maxCartItems != null && data.maxCartItems) {
							showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
						} else {
							showPdpError($this, data.errors[0].message);
						}
					}
					var completeCallBack = function() {$this.removeClass('active-loading');};
					ajaxFormSubmit($('#add-to-bag-form'), null, successCallBack, errorCallBack, completeCallBack);
					setTimeout(function(){
						$('#srMiniCartEligible').html(hideMiniCartEligible);
						},2000);
				}
			}
		} else {
			$this.removeClass('active-loading');
		}

	});

	//edit item in cart
	$('#editBagItem').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		$this.addClass('active-loading');
		var errorMsg = pdpErrorMsg;
		var isValid = validatePdpDropdowns($this, errorMsg);
		if (isValid) {
			var cont = false;
			cont = buildCartFormValues(styleSizeDriver);
			if (cont) {
				if ($('#pdp-gift-box-option').prop('checked') && $('#pdp-monogram-option').prop('checked')) {
					var onLoadFunction = function() {
						giftBoxEvents(true, true);
					}
					showModal(null, null, '/modals/pdp/pdp-add-gift-box.jsp', null, 580, true, '20%', onLoadFunction, null, null, null, true);
					$this.removeClass('active-loading');
				} else if ($('#pdp-gift-box-option').prop('checked')) {
					var onLoadFunction = function() {
						giftBoxEvents(false, true);
					}
					showModal(null, null, '/modals/pdp/pdp-add-gift-box.jsp', null, 580, true, '20%', onLoadFunction, null, null, null, true);
					$this.removeClass('active-loading');
				} else if ($('#pdp-monogram-option').prop('checked')) {
					var onLoadFunction = function() {
						monogramEvents(true);
					}
					showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $('#bag-product-id').val() + '&skuid=' + $('#bag-skuId').val(), null, 619, true, '15%', onLoadFunction, null, null, null, true);
					$this.removeClass('active-loading');
				} else {
					var successCallBack = function(data) {
						try {
							var element = $('#selected-edit-values');
							var style = $.trim(element.attr('data-style'));
							var color = $.trim(element.attr('data-color'));
							var size = $.trim(element.attr('data-size'));
							var quantity = $.trim(element.attr('data-quantity'));

							var cstyle = $('.style-selection:checked').val();
							var ccolor = $('#pdpSelectColor').val();
							var csize = $('#pdpSelectSize').val();
							var cquantity = $('#pdpSelectQuantity').val();

							if((cstyle != '' && cstyle != style) || (ccolor != '' && ccolor != color) || (csize != '' && csize != size) || (cquantity != '' && cquantity != quantity))
								fireUtag = true;
						} catch(err){}
						if($this.hasClass('is-checkout')) {
							if(data.redirectPayment) {
								location.href= "/checkout/payment.jsp";
							} else {
								reloadCheckoutOrderSummary(false, false, true);
								$('.close.ir').click();
							}
						} else {
							$('.close.ir').click();
							reloadOrderSummary(true);
						}
					};
					var errorCallBack = function(data) {
						if (data.maxCartItems != null && data.maxCartItems) {
							showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null, null, null, true);
						} else {
							showPdpError($this, data.errors[0].message);
						}
					}
					var completeCallBack = function() {$this.removeClass('active-loading');};
					ajaxFormSubmit($('#add-to-bag-form'), null, successCallBack, errorCallBack, completeCallBack);
					var shopRunnerDivHtml=$('#srEligibleBag').html();
					var commerceItemCount=$("#commerceItemCountForSR").val();
					setTimeout(function(){
							for(i=1;i<=commerceItemCount;i++) 
							{
								var id="srEligibleBagItem"+i;
								document.getElementById(id).innerHTML = shopRunnerDivHtml;
							}
						},3000);
				}
			}
		} else {
			$this.removeClass('active-loading');
		}
	});


	//buy another
	$('#buyBagItem').click(function(e) {
		var shopRunnerDivHtml=$('#srEligibleBag').html();
		var commerceItemCount=$("#commerceItemCountForSR").val();
		commerceItemCount=parseInt(commerceItemCount)+1;
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		$this.addClass('active-loading');
		var errorMsg = pdpErrorMsg;
		var isValid = validatePdpDropdowns($this, errorMsg);
		if (isValid) {
			var cont = false;
			cont = buildCartFormValues(styleSizeDriver);
			if (cont) {
				if ($('#pdp-gift-box-option').prop('checked') && $('#pdp-monogram-option').prop('checked')) {
					var onLoadFunction = function() {
						giftBoxEvents(true, true);
					}
					showModal(null, null, '/modals/pdp/pdp-add-gift-box.jsp', null, 580, true, '20%', onLoadFunction, null, null, null, true);
					$this.removeClass('active-loading');
				} else if ($('#pdp-gift-box-option').prop('checked')) {
					var onLoadFunction = function() {
						giftBoxEvents(false, true);
					}
					showModal(null, null, '/modals/pdp/pdp-add-gift-box.jsp', null, 580, true, '20%', onLoadFunction, null, null, null, true);
					$this.removeClass('active-loading');
				} else if ($('#pdp-monogram-option').prop('checked')) {
					var onLoadFunction = function() {
						monogramEvents(true);
					}
					showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $('#bag-product-id').val() + '&skuid=' + $('#bag-skuId').val(), null, 619, true, '15%', onLoadFunction, null, null, null, true);
					$this.removeClass('active-loading');
				} else {
					var successCallBack = function(data){
						fireUtag = true;
						$('.close.ir').click();
						reloadOrderSummary(true);
					};
					var errorCallBack = function(data) {
						if (data.maxCartItems != null && data.maxCartItems) {
							showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null, null, null, true);
						} else {
							showPdpError($this, data.errors[0].message);
						}
					}
					var completeCallBack = function() {$this.removeClass('active-loading');};
					ajaxFormSubmit($('#add-to-bag-form'), null, successCallBack, errorCallBack, completeCallBack);
				}
			}

		} else {
			$this.removeClass('active-loading');
		}
		setTimeout(function(){
		$("#srMessage").load("/shoprunner/srIneligibleMessage.jsp")},100);
		setTimeout(function(){
			for(i=1;i<=commerceItemCount;i++)
			{
				var id="srEligibleBagItem"+i;
				document.getElementById(id).innerHTML = shopRunnerDivHtml;
			}
		},3000);
	});

	// "Save to wish list" link
	$('#pdpAddCartForm').on('click', '#pdpAddToWishlist', function (e) {
		e.preventDefault();

		var $this = $(this),
			isLoggedIn = !$this.hasClass('notLoggedIn'),
			isValid = validatePdpDropdowns($this, wishlistErrorMsg),
			loadingClass = 'active-loading';

		if ($this.hasClass(loadingClass)) return;
		if (!isValid) return;

		$this.addClass(loadingClass);

		if (isLoggedIn) {
			var complete = function () {
					$this.removeClass(loadingClass);
				},

				error = function (data) {
					if (data.maxWlItems != null && data.maxWlItems) {
						showModal(null, null, '/modals/pdp/pdp-wishlist-bag-full.jsp', null, 500, true, '30%', null, null);
					} else {
						showPdpError($this, data.errors[0].message);
					}
				},

				success = function (data) {
					showModal(null, null, '/modals/pdp/pdp-wishlist-added.jsp?giftId=' + data.giftItemId, null, 600, true, '20%', null, null);
				};

			buildWishlistFormValues(styleSizeDriver);
			ajaxFormSubmit($('#add-to-wishlist-form'), null, success, error, complete);
		} else {
			var location = window.location,
				saveProductData = function () {
					if (window.localStorage) {
						var $form = $('#pdpAddCartForm');

						localStorage.setItem(
							'wishListProduct',
							JSON.stringify({
								color: $form.find('#pdpSelectColor').val(),
								giftBox: $form.find('#pdp-gift-box-option').prop('checked'),
								hemLength: $form.find('#pdpSelectHemLength').val(),
								hemStyle: $form.find('#pdpSelectHemStyle').val(),
								monogram: $form.find('#pdp-monogram-option').prop('checked'),
								pathname: location.pathname,
								quantity: $form.find('#pdpSelectQuantity').val(),
								size: $form.find('#pdpSelectSize').val(),
								style: $form.find('[name="styleradiobutton"]:checked').val()
							})
						);
					}
				};

			saveProductData();
			location.href = $this.attr('href') + '?successUrl=' + location.pathname + location.search;
		}
	});

	// ---- "Save to wish list" path for logged out user ----
	if (window.localStorage && window.location.search.indexOf('loginSuccess=true') > 0) {
		var data = JSON.parse(localStorage.getItem('wishListProduct')),
			$form = $('#pdpAddCartForm'),
			showSavedProductData = function () {
				$form.find('#pdpSelectColor').val(data.color).change();

				if (data.giftBox) {
					$form.find('#pdp-gift-box-option').prop('checked', true);
				}

				// #pdpSelectHemStyle needs to modified before #pdpSelectHemLength
				$form.find('#pdpSelectHemStyle').val(data.hemStyle).change();
				$form.find('#pdpSelectHemLength').val(data.hemLength);

				if (data.monogram) {
					$form.find('#pdp-monogram-option').prop('checked', true);
				}

				$form.find('#pdpSelectQuantity').val(data.quantity);
				$form.find('#pdpSelectSize').val(data.size);
				$form.find('[name="styleradiobutton"][value="' + data.style + '"]').prop('checked', true);
			};

		if (!data) return;
		if (data.pathname !== window.location.pathname) return;

		showSavedProductData();
		localStorage.removeItem('wishListProduct');
		$('#pdpAddToWishlist').trigger('click');
	}

	// edit item in wishlist
	$('#pdpAddCartForm').on('click', '#editWishlistItem', function (e) {
		e.preventDefault();
		var $this = $(this);

		if ($this.hasClass('active-loading')) {
			return false;
		}

		$this.addClass('active-loading');
		var errorMsg = wishlistErrorMsg;
		var isValid = validatePdpDropdowns($this, errorMsg);

		if (isValid) {
			var cont = false;
			cont = buildWishlistFormValues(styleSizeDriver);

			if (cont) {
				var successCallBack = function (data) {
					$('.close.ir').click();
					reloadWishlistItems();
				};

				var errorCallBack = function(data) {
					if (data.maxWlItems != null && data.maxWlItems) {
						showModal(null, null, '/modals/pdp/pdp-wishlist-bag-full.jsp', null, 500, true, '30%', null, null, null, null, true);
					} else {
						showPdpError($this, data.errors[0].message);
					}
				}

				var completeCallBack = function () {
					$this.removeClass('active-loading');
				};

				ajaxFormSubmit($('#edit-wishlist-form'), null, successCallBack, errorCallBack, completeCallBack);
			}
		}
		$this.removeClass('active-loading');
	});
	//edit item in wishlist from cart
	$('#pdpAddCartForm').on('click', '#editBagWishlistItem', function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		$this.addClass('active-loading');
		var errorMsg = wishlistErrorMsg;
		var isValid = validatePdpDropdowns($this, errorMsg);
		if (isValid) {
		var cont = false;
		cont = buildWishlistFormValues(styleSizeDriver);
		if (cont) {
			var successCallBack = function(data){
				$('.close.ir').click();
				reloadBagWishList();
			};
			var errorCallBack = function(data) {
				if (data.maxWlItems != null && data.maxWlItems) {
					showModal(null, null, '/modals/pdp/pdp-wishlist-bag-full.jsp', null, 500, true, '30%', null, null, null, null, true);
				} else {
					showPdpError($this, data.errors[0].message);
				}
			}
			var completeCallBack = function() {$this.removeClass('active-loading');};
			ajaxFormSubmit($('#edit-wishlist-form'), null, successCallBack, errorCallBack, completeCallBack);
			var shopRunnerDivHtml=$('#srEligibleBag').html();
			var wishListCount=$("#wishListCount").val();
			setTimeout(function(){
					for(i=1;i<=wishListCount;i++) 
					{
						var id="srWLEligibleBagItem"+i;
						document.getElementById(id).innerHTML = shopRunnerDivHtml;
					}
				},3000);
		}
		}
		$this.removeClass('active-loading');
	});


	if ($('#selected-edit-values').length) {
		prePopulateProductInfo($('#selected-edit-values'));
	} else if($('#pdpSelectColor').attr('data-selectedcolor') != '') {
		populateSelectedColor($('#pdpSelectColor').attr('data-selectedcolor'), styleColors);
	} else if($('#eob-selected-style').length) {
		var style = $('#eob-selected-style').attr('data-style');
		$('.style-selection[value="' + style + '"]').prop('checked', true);
		$('.style-selection[value="' + style + '"]').click();
	}
	if ($('#pdpSelectSize option').size() == 2) {
		$('#pdpSelectSize').val($('#pdpSelectSize option').eq(1).val());
		$('#pdpSelectSize').change();
	}
	if ($('#pdpSelectColor option').size() == 2) {
		$('#pdpSelectColor').val($('#pdpSelectColor option').eq(1).val());
		$('#pdpSelectColor').change();
	}


	if ($('#pdpSelectColor').val() == '' && $('#pdpSelectColor').attr('data-selectedcolor') == '') {

		var colorId = $('#pdpSelectColor').attr('data-defaultcolor');
		var colorName = $('#pdpSelectColor').attr('data-defaultcolorname');
		if(colorImageMap[colorId] == null) {
			colorId = $('#pdpSelectColor option').eq(1).val();
		}

		if($.trim(colorId) == '') {
			colorId = $('#pdpSelectColor option').eq(1).val();
		}
		if($.trim(colorName) == '') {
			colorName = allColorsMap[colorId];
			if(colorName == '')
				colorName = $('#pdpSelectColor option').eq(1).text();
		}
		populateCanvasImage(colorId, colorImageMap, colorImageAltMap);
		$('.zoom-color .pdp-item-color').text(colorName);
	}

	showIconsEOB();
	//TEALIUM CALL for pdp
	//tealiumCallPdp();

}

function showIconsEOB() {
	if($('.icon-container-eob').length) {
		if($('#styleCutHolder').data('iseobonlyclearance')) {
			$('.icon-container-eob li').each(function() {
				var sEle = $(this).find('span');
				if(typeof sEle != 'undefined' && sEle != '') {
					var sText = sEle.text();
					sText = sText.toUpperCase();
					if(sText.indexOf('SALE') > -1)
						$(this).remove();
				}
			});
		}
		$('.icon-container-eob').removeClass('no-display');
	}
}

function updateCanvasColor(imageUrl) {
	$('.pdp-item-color').text(getAltImgColorTitle(imageUrl, true));
}

function getAltImgColorTitle(imageUrl, returnBlank) {
	try {
		var test = styleColors;
		var imgArray = imageUrl.split('EddieBauer/');
		var imgArr = imgArray[1].split('?');
		var imgAr = imgArr[0].split('_');
		var colorId = imgAr[1];
		var colorName = '';
		$.each(allColorsMap, function(key, color) {
			if(colorId.indexOf(key) >= 0) {
				colorName = color
				return false;
			}
		});
		if(colorName == '') {
			if(typeof returnBlank != 'undefined' && returnBlank) {
				colorName = '';
			} else {
				colorName = productDisplayName;
			}
		}
		return colorName;
	} catch(err) {
		if(typeof returnBlank != 'undefined' && returnBlank) {
			return '';
		} else {
			return productDisplayName;
		}
	}
}

function populateSelectedColor(colorId, styleColorsObj) {
	$('#pdpSelectColor').val(colorId);
	if($('#pdpSelectColor').val() == '') {
		var selStyle = '';
		$('.style-item').each(function() {
			var style = $(this).attr('data-styleid');
			if(styleColorsObj[style] != null) {
				$.each(styleColorsObj[style], function(index, colorObj) {
					if(colorObj.colorId == colorId) {
						selStyle = style;
						return false;
					}
				});
			}
			if(selStyle != '') {
				return false;
			}
		});
		$('.style-selection[value="' + selStyle + '"]').prop('checked', true);
		$('.style-selection[value="' + selStyle + '"]').click();
		$('#pdpSelectColor').val(colorId);
	}
	if($('#pdpSelectColor').val() != '') {
		$('#pdpSelectColor').change();
	}
	/*var colorName = '';
	$('.style-item').each(function() {
		var style = $(this).attr('data-styleid');
		if(styleColorsObj[style] != null) {
			$.each(styleColorsObj[style], function(index, colorObj) {
				if(colorObj.colorId == colorId) {
					colorName = colorObj.colorName;
					return false;
				}
			});
		}
	});

	if($.trim(colorId) == '') {
		colorId = $('#pdpSelectColor option').eq(1).val();
	}
	if($.trim(colorName) == '') {
		colorName = $('#pdpSelectColor option').eq(1).text();
	}
	populateCanvasImage(colorId, colorImageMap, colorImageAltMap);
	$('.zoom-color .pdp-item-color').text(colorName);*/
}


/*checks form return from server for errors then displays errors,
or removes disabled on buttons */
function showFormErrors(inputs){
	inputs.each(function() {
		check($(this));
	});
}

function isCAorUS() {
	if($('#addNewCountry').val() == '' || $('#addNewCountry').val().toUpperCase() == 'CAN' || $('#addNewCountry').val().toUpperCase() == 'CA' || $('#addNewCountry').val().toUpperCase() == 'US' || $('#addNewCountry').val().toUpperCase() == 'USA' ) {
		return true;
	} else {
		return false;
	}
}
function zipRequired() {
	var zipCountry = 'ARG,AUS,AUT,BGD,BEL,BRA,BRN,BGR,CAN,CHN,CYP,CZE,DNK,EST,FIN,FRA,GUF,DEU,GRC,GLP,GGY,HUN,ISL,IND,IDN,ISR,ITA,JPN,JEY,LVA,LIE,LTU,LUX,MDV,MTQ,MEX,MCO,NLD,NZL,NOR,PAK,PHL,POL,PRT,REU,ROU,RUS,SGP,SVK,SVN,ZAF,KOR,ESP,SWZ,SWE,TWN,THA,TUR,GBR';
	var zipCountryArr = zipCountry.split(',');

	var country = $('#addNewCountry').val();
	if(country != '')
		country = country.toUpperCase();
	if($.inArray(country, zipCountryArr) >= 0) {
		return true;
	} else {
		return false;
	}
}

function check($input, isBlur) {
	if (($input.val() == '' && $input.hasClass('required')) || $input.data('error') != ''){
		var errMsg = "This field is required";

		if ($input.data('error') != ''){
			errMsg = $input.data('error');
		}
		if($input.attr('id') == 'addNewZip' && !isCAorUS() && typeof isBlur != 'undefined' && isBlur) {

		} else {
			showErrorToolTip($input, errMsg);
		}
	}

	$input.parents('form').enableButtonCheck();
}

function showErrorToolTip($input, errMsg) {
	$input.addClass("error-field");
	if ($input.hasClass('alt-error')) {
		$input.parent()
		.append('<div class="alt-error-tooltip">' +
				'<img class="right" src="/static/img/tooltip-arrow-left.png" alt="" />' +
				'<p class="right">' + errMsg + '</p>' +
				'<span class="clear-break"></span>' +
				'</div>');
	} else if ($input.hasClass('textarea-error')) {
		$input.parent()
		.append('<div class="textarea-error-tooltip">' +
				'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
				'<p class="left">' + errMsg + '</p>' +
				'<span class="clear-break"></span>' +
				'</div>');
	} else {
		$input.parent()
		.append('<div class="error-tooltip">' +
				'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
				'<p class="left">' + errMsg + '</p>' +
				'<span class="clear-break"></span>' +
				'</div>');
		}
}

$.fn.enableButtonCheck = function() {
	//removes disable if required fields are not empty
	var empty = false;

	this.children('.required').each(function() {
		if ($(this).val() == '') {
			empty = true;
		}
	});

	if (this.children('.error-field').length) {
		empty = true;
	}

	if (empty) {
		//this.find('.button').attr('disabled', 'disabled');
	} else {
		//this.find('.button').removeAttr('disabled');
	}
};

function showProductModal(element) {
	var onbeforeload = function() {
		productDetailPageFunctions();
	}
	showModal(null, null, element.attr('href'), null, 970, true, '15%', null, null, null, null, null, null, null, onbeforeload);
}


function reloadWishlistItems() {
	showLoadingOverlay($('.wishlist-item-container'));
	$('.wishlist-item-container').load('/user/gadgets/wishlist-items.jsp?_=' + Math.random(), function() {
		removeLoadingOverlay($('.wishlist-item-container'));
	});

}

function showModal(element, successCall, pageUrl, height, width, load, topPosition, onLoadFunction, onCloseFunction, content, targetContent, multipleModal, isFixed, leftPosition, onBeforeLoadFunction) {
	//reset the session time out when enter acting with the page
	EBGLOBAL.sessionTimeout.resetTimeout();
	if(!load) {
		element.click(function(e) {
			e.preventDefault();
			showModalExecute(null, successCall, pageUrl, height, width, true, topPosition, onLoadFunction, onCloseFunction, content, targetContent, multipleModal, isFixed, leftPosition, onBeforeLoadFunction);
		});
	} else {
		showModalExecute(null, successCall, pageUrl, height, width, true, topPosition, onLoadFunction, onCloseFunction, content, targetContent, multipleModal, isFixed, leftPosition, onBeforeLoadFunction);
	}
}

function showModalExecute(element, successCall, pageUrl, height, width, load, topPosition, onLoadFunction, onCloseFunction, content, targetContent, multipleModal, isFixed, leftPosition, onBeforeLoadFunction) {
	var showMultipleModal = (typeof multipleModal != 'undefined' && multipleModal != null && multipleModal != '') ? multipleModal : false;
	if(!showMultipleModal) {
		$('.dummy-modal').remove();
		$('.overlay-modal').remove();
	}
	var random = Math.floor(Math.random()*1000);
	$('body').append('<div id="event_' + random + '" class="dummy-modal"></div>');
	var element = $('div#event_' + random);


	var randomTarget = 'overlay_' + Math.floor(Math.random()*1000);
	var	target = (typeof targetContent != 'undefined' && targetContent != null && targetContent != '') ? targetContent : '#' + randomTarget;
	$('.thumb-enlarge-text').data("target", "#" + randomTarget);
	if(!$(target).length) {
		$('body').append('<div id="' + randomTarget + '" class="overlay-modal" data-top="' + topPosition + '"><a href="JavaScript:void(0)" id="fbOuterClose" class="close ir">close</a><div class="overlay-modal-container"></div></div>');
	}
	var heightM = height;

	var isFixedPos = (typeof isFixed != 'undefined' && isFixed != null && isFixed != '') ? isFixed : false;
	var lPosition = (typeof leftPosition != 'undefined' && leftPosition != null && leftPosition != '') ? leftPosition : 'center';

	if(typeof pageUrl != 'undefined' && pageUrl != null && pageUrl.indexOf('pdp-shopping-bag-added.jsp') >= 0) {
		var ymalIds = '';
		$('.ymal-thumb-link').each(function() {
			ymalIds += $(this).attr('data-prdid') + ',';
		});
		pageUrl = pageUrl + '&ymalIds=' + ymalIds;
	}


	element.overlay({
		target: target,
		top: topPosition,
		left: lPosition,
		closeOnEsc: true,
		closeOnClick: true,
		close: $(".close.ir"),
		load: load,
		fixed: isFixedPos,
		oneInstance: false,
		onBeforeLoad: function() {
			if (heightM == null || heightM == '') {
				var height = 'auto'
			} else {
				var height = heightM + 'px';
			}
			if(width != null && width.toString().indexOf('%') > -1) {
				$(target).css('height', height).css('width', width);
			} else {
				$(target).css('height', height).css('width', width+'px');
			}
			$(target).find('.overlay-modal-container').html('');
			if(pageUrl != null && pageUrl != '') {
				$.ajax({
					type: 'get',
					url: pageUrl,
					cache: false,
					async: false,
					dataType: 'text',
					success: function(data) {
						$(target).find('.overlay-modal-container').html(data);
					},
					complete: function() {
						$(target).find('.overlay-modal-container .close').click(function(e) {
							e.preventDefault();
							element.overlay().close();
						});
						$('.confirm-modal').click(function(e) {
							e.preventDefault();
							element.overlay().close();
							if (successCall != null && successCall != '') {
								successCall();
							}

						});
					}
				});
			} else {
				$(target).find('.overlay-modal-container').html(content);
				$(target).find('.overlay-modal-container .close').click(function(e) {
					e.preventDefault();
					element.overlay().close();
				});
				$('.confirm-modal').click(function(e) {
					e.preventDefault();
					if (successCall != null && successCall != '') {
						successCall();
					}
				});
			}
			if (typeof onBeforeLoadFunction != 'undefined' && onBeforeLoadFunction != null && onBeforeLoadFunction != '') {
				onBeforeLoadFunction();
			}
			loadExposeMask();
		},
		onLoad: function(e) {
			if (onLoadFunction != null && onLoadFunction != '') {
				onLoadFunction();
			}
			reSizeMask();
		},
		onClose: function(e) {
			if (onCloseFunction != null && onCloseFunction != '') {
				onCloseFunction();
			}
			element.remove();
			$(target).remove();

			removeExposeMask();
			reSizeMask();
		}
	});
}

//
// Launch Floatbox modal
//

function openFBModal(modalURL, options) {
	if (modalURL !=""){
		//reset the session time out when enter acting with the page
		EBGLOBAL.sessionTimeout.resetTimeout();
		if (options !=""){
			fb.start(modalURL, options);
		}else{
			fb.start(modalURL, 'framed:true;');
		}
	}
}
// Sets the selected tabid in a modal
function FBModalTab(tabid){
	// Scroll to number in pixels
	jQuery('.anchor').live('click', function(e) {
		var scrollTopNumber = jQuery(this).attr('data-top');
		var selectedTabId = jQuery(this).attr('data-tab-id');
		var hrefId = jQuery(this).attr('href');
		if (scrollTopNumber != ""){
			jQuery(window).scrollTop(scrollTopNumber);
		}else{
			jQuery(window).scrollTop(0);
		}
		if (hrefId !=""){
			jQuery(hrefId).show();
		}
		if (selectedTabId !=""){
			$(".tabs" ).tabs('.ui-tabs-panel', {initialIndex: parseInt(selectedTabId)});
		}
	});
	//set default tab
	if (tabid !=''){
		$(".tabs" ).tabs('.ui-tabs-panel', {initialIndex: tabid});
	}
}
//scroll to in a modal
function FBModalScroll(scrollTo){
	//jQuery(window).scrollTop(scrollTo);
}
function reSizeMask() {
	try {
		var finalPos = 0;
		$('.overlay-modal').each(function() {
			if($(this).is(':visible')) {
				var modalPos = $(this).position().top+$(this).outerHeight(true);
				if(modalPos > finalPos)
					finalPos = modalPos;
			}
		});
		var bodyPos = $('body').position().top+$('body').outerHeight(true);
		if(finalPos > bodyPos) {
			var height = (finalPos + 50) / bodyPos * 100;
			$('#exposeMask').css('height', height + '%');
		} else {
			$('#exposeMask').css('height', '100%');
		}
	} catch(err){}
}

function loadExposeMask() {
	if(!$('#exposeMask').length) {
		$('body').append('<div id="exposeMask"></div>');
		$('#exposeMask').fadeTo(300, .4);
		$('#exposeMask').click(function() {
			removeExposeMask();
			$('.close.ir').click();
		});
	}
}
function removeExposeMask() {
	if(!$('.overlay-modal').length) {
		$('#exposeMask').fadeOut('100', function() {$('#exposeMask').remove()});
	}
}

function ajaxFormSubmit(formObject, beforeSend, successCallBack, errorCallBack, completeCallBack, isSync) {
	var submitUrl = formObject.prop('action'),
	isDataType = false,
	dataType = ((isDataType = (typeof arguments[6] != 'undefined') ? true : false) == true) ? arguments[6] : 'json';

	if (submitUrl.indexOf('?') >= 0) {
		submitUrl += '&_=' + Math.random();
	} else {
		submitUrl += '?_=' + Math.random();
	}
	var isAsync = true;
	if(isSync) {
		isAsync = false;
	}
	$.ajax({
		type: 'post',
		url: submitUrl,
		data: formObject.serialize(),
		dataType: dataType,
		async: isAsync,
		beforeSend: function() {
			if (beforeSend != null && beforeSend != '') {
				beforeSend();
			}
		},
		success: function(data, status, xhr) {
			if (data.success || (isDataType && data == "")) {
				if (successCallBack != null && successCallBack != '') {
					successCallBack(data, status, xhr);
				}

			} else {
				if (errorCallBack != null && errorCallBack != '') {
					errorCallBack(data);
				}
			}
		},
		complete: function() {
			if (completeCallBack != null && completeCallBack != '') {
				completeCallBack();
			}
		},
		error: function(xhr, text, error) {
			if(xhr.status == '409') {
				location.href="/index.jsp";
			} else {
				location.reload(true);
			}
		}
	});
}

function addressValidationSubmit(formObject, beforeSend, successCallBack, errorCallBack, completeCallBack, event) {
	var submitUrl = formObject.prop('action');
	if (submitUrl.indexOf('?') >= 0) {
		submitUrl += '&_=' + Math.random();
	} else {
		submitUrl += '?_=' + Math.random();
	}
	$.ajax({
		type: 'post',
		url: submitUrl,
		data: formObject.serialize(),
		dataType: 'html',
		async: false,
		context: event,
		beforeSend: function() {
			if (beforeSend != null && beforeSend != '') {
				beforeSend();
			}
		},
		success: function(data) {
			successCallBack(data);
		},
		complete: function() {
			if (completeCallBack != null && completeCallBack != '') {
				completeCallBack();
			}
		},
		error: function(xhr, text, error) {
			if(xhr.status == '409') {
				location.href="/index.jsp";
			} else {
				location.reload();
			}
		}
	});
}

function createUserFromBilling(e, $this) {


	$('#create-email').val($('#addEmail').val());
	$('#create-password').val($('#regPwd').val());
	$('#create-confirm-password').val($('#regConfirmPwd').val());

	var success = function(data) {
		var errorUrl = $('#errorURL').val();
		if (errorUrl.indexOf('?') >= 0) {
			errorUrl += '&newUser=true'
		} else {
			errorUrl += '?newUser=true';
		}
		$('#errorURL').val(errorUrl);
		var successUrl = $('#successUrl').val();
		if (successUrl.indexOf('?') >= 0) {
			successUrl += '&newUser=true'
		} else {
			successUrl += '?newUser=true';
		}
		$('#successUrl').val(successUrl);
	};
	var error = function(data) {
		e.preventDefault();
		if(data.email != '')
			showErrorToolTip($('#addEmail'), data.email);
		if(data.password != '')
			showErrorToolTip($('#regPwd'), data.password);
		if(data.confirmPassword != '')
			showErrorToolTip($('#regConfirmPwd'), data.confirmPassword);
		scrollToElement($('.error-field').eq(0), 30);
		$('.response-bg.bag-response').remove();
		$('.col-1.left').prepend('<div class="response-bg bag-response"> <img alt="" src="/static/img/error-icon.png" class="response-icon"><p class="response-text">' + data.generalMsg + '</p></div>');
	};
	var complete = function() {
		try{
			$('.dummy-modal').overlay().close();
		} catch(err){}
	}
	ajaxFormSubmit($('#create-user-billing'), null, success, error, complete, true);

}

/**************** update country list *****/
function checkRegionInput() {
	if($('.state-dropdown').val() == 'C6') {
		$('.region-input').show();
	} else {
		$('.region-input input').val('');
		$('.region-input').hide();
	}
}
function updateCountrySelect($this) {
	var stateSelect = $this;
	var stateSelectedOption = $('option:selected', stateSelect);
	var stateGroup = stateSelectedOption.parent().prop('label');
	var countrySelect = stateSelect.parent('.formItem').siblings().find('.country-dropdown');

	switch (stateGroup) {
		case '--------------Canada--------------':
			countrySelect.val('CAN');
			break;
		case '--------------International--------------':
			countrySelect.val('');
			break;
		default:
			countrySelect.val('US');
	}
	countrySelect.change();
	countrySelect.removeClass('error-field');
	countrySelect.closest('.formItem').find('.error-tooltip').remove();
}

/**************** WISHLIST ***************/

function shareWishlistEvents() {
	$('#wsPreviewEmailBtn').click(function(e) {
		e.preventDefault();
		var modalElement = $('.overlay-modal').filter(':visible').eq(0);
		var offset = modalElement.offset().top;
		if(validateShareFields('wl')) {
			populateShareValues('wl');
			var onload = function(e) {
				modalElement.css('visibility', 'hidden');
				scrollToElement(modalElement, 20, function() {
					modalElement.hide();
					$('.overlay-modal').filter(':visible').eq(0).css('position', 'absolute').css('top', offset + 'px');
					reSizeMask()
				});
				previewWishlistEvents();
			}
			var onclose = function() {
				if($('#exposeMask').is(':visible') && !$('#exposeMask').is(':animated')) {
					modalElement.css('visibility', 'visible');
					modalElement.fadeIn(150, function() {scrollToElement(modalElement);});
				}
			}
			var items = '';
			$('#wlShareItemsHolder .ws-select-item').each(function() {
				if($(this).prop('checked')) {
					items += $(this).val() + ',';
				}
			});
			showModal(null, null, '/modals/share/wish-list-share-preview.jsp?wlItems=' + escape(items), null, 660, true, '5%', onload, onclose, null, null, true, true);
		}
	});


	$('#wsSubmitEmailBtn').click(function(e) {
		e.preventDefault();
		$this = $(this);
		if ($this.hasClass('active-loading'))
			return false;

		if(validateShareFields('wl')) {
			populateShareValues('wl');
			var successCallBack = function(data) {
				var close = function() {
					$('.close.ir').click();
				}
				showModal(null, close, '/modals/confirmation/email-sent.jsp?type=wl', null, 370, true, '30%', null, null, null, null, null, true);
			};
			var errorCallBack = function(data) {
				showPdpError($('#wsSubmitEmailBtn'), data.errors[0].message);
			}
			var beforeSend = function() {$this.addClass('active-loading');}
			var completeCallBack = function() {$this.removeClass('active-loading');};
			ajaxFormSubmit($('#share-wishlist-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
		}
	});
}

function previewWishlistEvents() {
	$('#wsEditEmailBtn').click(function(e) {
		e.preventDefault();
		var modal = $(this).closest('.overlay-modal');
		modal.find('.close.ir').click();
	});
	$('#wsPreviewSubmitEmailBtn').click(function(e) {
		e.preventDefault();
		$this = $(this);
		if ($this.hasClass('active-loading'))
			return false;

		var successCallBack = function(data) {
			var close = function() {
				$('.close.ir').click();
			}
			showModal(null, close, '/modals/confirmation/email-sent.jsp?type=wl', null, 370, true, '30%', null, null, null, null, null, true);
		};
		var errorCallBack = function(data) {
			showPdpError($('#wsPreviewSubmitEmailBtn'), data.errors[0].message);
		}
		var beforeSend = function() {$this.addClass('active-loading');}
		var completeCallBack = function() {$this.removeClass('active-loading');};
		ajaxFormSubmit($('#share-wishlist-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
	});

	//populate preview
	var fName = $.trim($('#wishlistShareFName').val());
	var lName = $.trim($('#wishlistShareLName').val());
	var sEmail = $.trim($('#senderEmail').val());
	var rEmail = $.trim($('#receiverEmails').val());
	var subject = $('#emailSubject option:selected').text();
	var emailMsg = $.trim($('#emailMsg').val());

	$('#toEmailPreview').text(rEmail);
	$('#fromEmailPreview').text(sEmail);
	$('#subjectPreview').text(subject);
	$('#toNameShare').text(fName);
	$('#fromName').text(fName + ' ' + lName);
	if(emailMsg != '')
		$('<p><strong>Personal Message:</strong><br /><span>' + emailMsg + '</span>').insertAfter('span.personal-message');
}

function sharePdpEvents() {
	$('#wsPreviewEmailBtn').click(function(e) {
		e.preventDefault();
		if($('.pdp-email-share').hasClass('mini-pdp-opened')) {
			var modalElement = $(this).closest('.overlay-modal');
		} else {
			var modalElement = $('.overlay-modal').filter(':visible').eq(0);
		}
		var offset = modalElement.offset().top;
		if(validateShareFields('pdp')) {
			populateShareValues('pdp');
			var onload = function(e) {
				modalElement.css('visibility', 'hidden');
				scrollToElement(modalElement, 20, function() {
					modalElement.hide();
					$('#wsEditEmailBtn').closest('.overlay-modal').filter(':visible').eq(0).css('position', 'absolute').css('top', offset + 'px');
					reSizeMask();
				});
				previewPdpEvents();
			}
			var onclose = function() {
				if($('#exposeMask').is(':visible') && !$('#exposeMask').is(':animated')) {
					modalElement.css('visibility', 'visible');
					modalElement.fadeIn(150, function() {scrollToElement(modalElement);});
				}
			}
			showModal(null, null, '/modals/share/pdp-share-preview.jsp?productId=' + $('.ws-btns-holder').attr('data-productid') + '&skuId=' + $('.ws-btns-holder').attr('data-skuid'), null, 660, true, '5%', onload, onclose, null, null, true, true);
		}
	});


	$('#wsSubmitEmailBtn').click(function(e) {
		e.preventDefault();
		$this = $(this);
		if ($this.hasClass('active-loading'))
			return false;

		if(validateShareFields('pdp')) {
			populateShareValues('pdp');
			var successCallBack = function(data) {
				var close = function() {
					$('.close.ir').click();
				}
				showModal(null, close, '/modals/confirmation/email-sent.jsp?type=pdp', null, 370, true, '30%', null, null, null, null, null, true);
			};
			var errorCallBack = function(data) {
				showPdpError($('#wsSubmitEmailBtn'), data.errors[0].message);
			}
			var beforeSend = function() {$this.addClass('active-loading');}
			var completeCallBack = function() {$this.removeClass('active-loading');};
			ajaxFormSubmit($('#share-pdp-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
		}
	});
}

function previewPdpEvents() {
	$('#wsEditEmailBtn').click(function(e) {
		e.preventDefault();
		var modal = $(this).closest('.overlay-modal');
		modal.find('.close.ir').click();
	});
	$('#wsPreviewSubmitEmailBtn').click(function(e) {
		e.preventDefault();
		$this = $(this);
		if ($this.hasClass('active-loading'))
			return false;

		var successCallBack = function(data) {
			var close = function() {
				$('.close.ir').click();
			}
			showModal(null, close, '/modals/confirmation/email-sent.jsp?type=pdp', null, 370, true, '30%', null, null, null, null, null, true);
		};
		var errorCallBack = function(data) {
			showPdpError($('#wsPreviewSubmitEmailBtn'), data.errors[0].message);
		}
		var beforeSend = function() {$this.addClass('active-loading');}
		var completeCallBack = function() {$this.removeClass('active-loading');};
		ajaxFormSubmit($('#share-pdp-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
	});

	//populate preview
	var fName = $.trim($('#wishlistShareFName').val());
	var lName = $.trim($('#wishlistShareLName').val());
	var sEmail = $.trim($('#senderEmail').val());
	var rEmail = $.trim($('#receiverEmails').val());
	var subject = $('#emailSubject option:selected').text();
	var emailMsg = $.trim($('#emailMsg').val());

	$('#toEmailPreview').text(rEmail);
	$('#fromEmailPreview').text(sEmail);
	$('#subjectPreview').text(subject);
	$('#fromName').text(fName + ' ' + lName);
	if(emailMsg != '')
		$('<p><strong>Personal Message:</strong><br /><span>' + emailMsg + '</span>').insertAfter('span.personal-message');
}


function populateShareValues(type) {

	var fName = $.trim($('#wishlistShareFName').val());
	var lName = $.trim($('#wishlistShareLName').val());
	var sEmail = $.trim($('#senderEmail').val());
	var rEmail = $.trim($('#receiverEmails').val());
	var subject = $('#emailSubject option:selected').text();
	var emailMsg = $.trim($('#emailMsg').val());

	var items = '';
	var sIcons = '';
	if(type == 'wl') {
		$('#wlShareItemsHolder .ws-select-item').each(function() {
			if($(this).prop('checked')) {
				items += $(this).val() + ',';
				sIcons += getIconText($(this).closest('.ws-item').find('.prd-icons')) + '|';
			}
		});

	}
	if(type == 'pdp') {
		items = $('.ws-btns-holder').attr('data-productid') + ',' + $('.ws-btns-holder').attr('data-skuid');
		$('#sharePdpType').val($('#styleCutHolder').attr('data-pdptype'));
		if(!$('.pdp-email-share').hasClass('mini-pdp-opened')) {
			$('#sharePdpUrl').val(location.href);
		}
		sIcons = getIconText($('#emailShareItemsHolder ul.prd-icons'));
	}

	$('#shareFirstName').val(fName);
	$('#shareLastName').val(lName);
	$('#shareFromEmail').val(sEmail);
	$('#shareToEmails').val(rEmail);
	$('#shareSubject').val(subject);
	$('#shareItems').val(items);
	$('#shareMessage').val(emailMsg);
	$('#shareIcons').val(sIcons);
}

function getIconText(element) {
	if(element == null || !element.length || typeof element == 'undefined') {
		return ' ';
	} else {
		var text = '[';
		var size = element.find('li').size();
		var count = 1;
		element.find('li').each(function() {
			if(count == size) {
				text += $.trim($(this).text());
			} else {
				text += $.trim($(this).text()) + '_';
			}
			count++;
		});
		text += ']';
		return text;
	}
}


function validateShareFields(type) {
	$('.error-tooltip').remove();
	$('.alt-error-tooltip').remove();
	$('.error-field').removeClass('error-field');

	var fName = $('#wishlistShareFName');
	var lName = $('#wishlistShareLName');
	var sEmail = $('#senderEmail');
	var rEmail = $('#receiverEmails');
	var emailPattern = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]+$/;

	if($.trim(fName.val()) == '') {
		fName.addClass('error-field');
		showPdpError(fName, "Please enter your first name");
	}
	if($.trim(lName.val()) == '') {
		lName.addClass('error-field');
		showErrorToolTip(lName, "Please enter your last name");
	}

	if($.trim(sEmail.val()) == '') {
		sEmail.addClass('error-field');
		showErrorToolTip(sEmail, "Please enter your email address");
	} else if(!emailPattern.test(sEmail.val())) {
		sEmail.addClass('error-field');
		showErrorToolTip(sEmail, "Please enter a valid email address");
	}

	if($.trim(rEmail.val()) == '') {
		rEmail.addClass('error-field');
		showErrorToolTip(rEmail, "Please enter recipient email address(es)");
	}

	var remails = rEmail.val().split(',');
	var emailtmp;
	var isvalid = true;
	$.each(remails, function(index, email) {
		var emailtmp = $.trim(email);
		if(emailtmp != '') {
			if(!emailPattern.test(emailtmp)) {
				isvalid = false;
				return false;
			}
		}
	});
	if(!isvalid) {
		rEmail.addClass('error-field');
		showErrorToolTip(rEmail, "Please enter a valid email address(es)");
	}

	if(type == 'wl') {
		if(!$('.ws-select-item:checked').length) {
			$('#wlShareItemsHolder').addClass('error-field');
			if($('.out-of-stock').length) {
				showShareItemError($('.ws-info'), "To share your wish list at least one item must be in stock");
			} else {
				showShareItemError($('.ws-info'), "Please select at least 1 item");
			}
		}
	}

	if($('.error-field').length) {
		scrollToElement($('.error-field').eq(0), 30);
		return false;
	} else {
		return true;
	}
}

function showShareItemError(element, errMsg) {
	element.prepend('<div class="error-tooltip">' +
			'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
			'<p class="left">' + errMsg + '</p>' +
			'<span class="clear-break"></span>' +
			'</div>');
}



function submitWishlist(element, successCallback) {
	var formId = '#' + element.data('formid');

	var beforeSend = function() {$('.error-tooltip-alt').remove();}

	var error = function(data) {
		if (data.maxCartItems != null && data.maxCartItems) {
			showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
		} else if(data.maxWlItems != null && data.maxWlItems) {
			showModal(null, null, '/modals/pdp/pdp-wishlist-bag-full.jsp', null, 500, true, '30%', null, null);
		} else {
			wishlistError(element, data.errors[0].message);
		}
		if(element.hasClass('wl-item-quantity')) {
			element.val(element.find('option[selected]').val());
		}
	}

	var complete = function() {element.removeClass('active-loading');removeLoadingOverlay($('.wishlist-item-container'));}

	ajaxFormSubmit($(formId), beforeSend, successCallback, error, complete);
}

function submitWishlistFromCart(element, successCallback, complete, beforeSend) {
	var formId = '#' + element.data('formid');

	var error = function(data) {
		if (data.maxCartItems != null && data.maxCartItems) {
			showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
		} else if(data.maxWlItems != null && data.maxWlItems) {
			showModal(null, null, '/modals/pdp/pdp-wishlist-bag-full.jsp', null, 500, true, '30%', null, null);
		} else {
			wishlistError(element, data.errors[0].message);
		}
		if(element.hasClass('wl-item-quantity')) {
			element.val(element.find('option[selected]').val());
		}
		removeLoadingOverlay($('#sbWishlistHolder'));
	}

	ajaxFormSubmit($(formId), beforeSend, successCallback, error, complete);
}

function wishlistError(element, errMsg) {
	element.closest('li').append('<div class="error-tooltip-alt">' +
			'<p class="left">' + errMsg + '</p>' +
			'<img class="left" src="/static/img/tooltip-arrow-left.png" alt="" />' +
			'<span class="clear-break"></span>' +
			'</div>');
}

function showPdpError(element, msg) {
	element.closest('.formItem').append('<div class="alt-error-tooltip hide">' +
			'<img class="right" src="/static/img/tooltip-arrow-left.png" alt="" />' +
			'<p class="right">' + msg + '</p>' +
			'<span class="clear-break"></span>' +
			'</div>');
	$('.alt-error-tooltip').fadeIn(300);
}
function showPdpError(element, msg) {
	element.closest('.formItem').append('<div class="alt-error-tooltip hide">' +
			'<img class="right" src="/static/img/tooltip-arrow-left.png" alt="" />' +
			'<p class="right">' + msg + '</p>' +
			'<span class="clear-break"></span>' +
			'</div>');
	$('.alt-error-tooltip').fadeIn(300);
}

function showSearchError(element, msg) {
	element.closest('.form-item').append('<div class="alt-error-tooltip hide">' +
			'<img class="right" src="/static/img/tooltip-arrow-left.png" alt="" />' +
			'<p class="right">' + msg + '</p>' +
			'<span class="clear-break"></span>' +
			'</div>');
	$('.alt-error-tooltip').fadeIn(300);
}



/*********** END WISHLIST *************/


function scrollToElement(element, topSpacePx, callBack) {
	var padding = 0;
	if(typeof topSpacePx != 'undefined' && topSpacePx != null && topSpacePx != '') {
		padding += topSpacePx;
	}
	$('html, body').animate({
		scrollTop: element.offset().top - padding
	}, 800, function() {
		if(typeof callBack != 'undefined' && callBack != null && callBack != '') {
			callBack();
		}
	});
}

//update shopping bag count in header
function updateShoppingBagCount() {
	$.ajax({
		type: 'get',
		url: '/xhr/bag-header.jsp',
		cache: false,
		dataType: 'html',
		success: function(data) {
			$('#headShoppingHolder').html(data);
		}
	});
}


/*********** header nav  *************/

//show main nav flyouts
function mainNavDrop(x) {
	var trigger = $(x).attr('id');
	var id = trigger.replace('nav', 'flyout');
	var navPos = $('#mainNav').offset().left;
	var pos = $(x).offset().left;
	pos = Math.abs(navPos - pos);
	var arrowPos = $(x).width() / 2;
	var triggerWidth = $(x).outerWidth();
	var rPos = (pos + triggerWidth) - $('#' + id).outerWidth();

	$('.nav-flyout').hide();
	if ($('#' + trigger).hasClass('active')){
		$('#' + trigger).addClass('hovered');
	}

	if ($('#' + id).outerWidth() + pos < navPos + 995){
		$('#' + id + ' .f-arrow').css({ 'left': arrowPos - 8 + 'px' }).show();
		$('#' + id).css({ 'left': pos + 'px' }).show();
	} else {
		$('#' + id + ' .f-arrow').css({ 'left': ($('#' + id).outerWidth() - parseInt(arrowPos)) - 10 + 'px' }).show();
		$('#' + id).css({ 'left': rPos + 'px' }).show();

		//if flyout exceeds both boundaries
		if ($('#' + id).css('left') < 0 + 'px'){
			var left = $('#' + id).css('left').replace('px', '');
			var lPos = $('#' + id).outerWidth() - parseInt(arrowPos);
			lPos = (lPos - Math.abs(left) - 8);
			$('#' + id).css('left', 0 + 'px');
			$('#' + id + ' .f-arrow').css({ 'left': lPos + 'px' });
		}
	}
	$('#flyout-firstascent').css({
		left: '110px'
	});
	$('#flyout-sportshop').css({
		left: '0px',
		right: '200px'
	});
	$('#flyout-sale').css({
		left: '5px'
	});
	$('#flyout-firstascent .f-arrow').css({
		left: '508px'
	});
	$('#flyout-sale .f-arrow').css({
		left: '840px'
	});
	$('#flyout-travex').css({
		minWidth: '370px'
	});
	// Commenting out this code for sportshop to fix the sportshop flyout arrow issue
	// if(id == 'flyout-sportshop'){
	//	lPos = 712;
	//	$('#' + id + ' .f-arrow').css({ 'left': lPos + 'px' });
	// }
}

//hide main nav flyouts
function flyoutHide() {
	$('.nav-flyout').hide();
	$('.f-arrow').show();
}

//main nav selected states
function setMainNavActive(id) {
	$('.f-arrow').hide();
	$('#mainNav a').removeClass();
	$('#' + id).addClass('active');
}

//close utility nav widgets
function closeUtNavWidget(target, e){
	if (!$(target).is('.ut-flyout') && !$(target).parents().is('.ut-active') || $(target).is('.ut-close-btn') || $(target).is('.ut-close-btn span')) {
		$('.ut-flyout').hide();
		$('#utilityNav li').not($(target).parent()).removeClass('ut-active');
		$('.ut-trigger .downArrow').html('&nbsp;&#9660;');
		$('#headSearchCategoryHolder').removeClass('ut-active');
		if($(target).is('.ut-close-btn')) {
			e.preventDefault();
		}
	}
}

//open utility nav widgets
function openUtNavWidget($this) {
	$('.ut-trigger .downArrow').html('&nbsp;&#9660;');
	$('#utilityNav li').not($this.parent()).removeClass('ut-active');
	$('.ut-flyout').not($this).hide();
	$this.parent().toggleClass('ut-active', function() {
		if ($this.parent().hasClass('ut-active')){
			$this.next('div').show();
			$this.find('.downArrow').html('&nbsp;&#9650;');
		}
	});

	if($('#headSearchCats').attr('style') == 'display: none;'){
		$this.next('div').show();
		$('#headSearchCategoryHolder').addClass('ut-active');
		$this.find('.downArrow').html('&nbsp;&#9650;');
	}
}

/*********** slideshow and slider functions *********/

//hero slideshow
function startHeroSlideshow(){
	$(".hero #slideshow").css("overflow", "hidden");
	$(".hero ul#slides").cycle({
		fx: 'fade',
		pause: 1,
		prev: '.prev-btn',
		next: '.next-btn'
	});
}

function thumbnailSliderInit(){
	var totalImages = $(".thumbnail-gallery li").size(),
		imageWidth = $(".thumbnail-gallery > li:first").outerWidth(true),
		totalWidth = imageWidth * totalImages;
	if($('#mainContentHolder.mini-pdp').length) {
		var visibleImages = 4;
	} else {
		var visibleImages = 5;
	}
	var	visibleWidth = visibleImages * imageWidth;
	var	stopPosition = (visibleWidth - totalWidth);


	$(".thumbnail-gallery").width(totalWidth);

	if (totalImages <= visibleImages){
		$(".t-gal-prev").hide();
		$(".t-gal-next").hide();
	} else {
		$(".t-gal-prev").on("click", function(e){
			if ($(".thumbnail-gallery").position().left < 0 && !$(".thumbnail-gallery").is(":animated")){
				$(".thumbnail-gallery").animate({left : "+=" + imageWidth*visibleImages + "px"});
			}
			e.preventDefault();
		});

		$(".t-gal-next").on("click", function(e){
			if ($(".thumbnail-gallery").position().left > stopPosition && !$(".thumbnail-gallery").is(":animated")){
				$(".thumbnail-gallery").animate({left : "-=" + imageWidth*visibleImages + "px"});
			}
			e.preventDefault();
		});
	}
}

/*********** accordions  *********/
//accordions setup
function toggleAccordion(e){
	$(e.target).next('ul').siblings('ul').slideUp('fast');
	$(e.target).next('ul').slideToggle('fast');
	$(e.target).toggleClass('open');
}

function expandAccordionAll(){
	$('.expandable ul').slideDown('fast');
	$('.expandable h3').addClass('open');
}

function collapseAccordionAll(){
	$('.expandable ul').slideUp('fast');
	$('.expandable h3').removeClass('open');
}

/*********** facet selection  *********/
//facet selection toggle
function facetCheck(checkbox){
	window.location.href = checkbox.siblings('a').attr('href');
}


/********* size charts **************************/
function enableSizeChart(element) {
	var dept = element.attr('data-dept');
	try {
		dept = dept.replace(/\D/g,'');
		dept = Number(dept);
	} catch(err) {
		dept = '';
	}
	if(dept == '6' || dept == '8' || dept == '9' || dept == '06' || dept == '08' || dept == '09' || dept == '10' || dept == '11' || dept == '17' || dept == '31' || dept == '45'
		|| dept == '16' || dept == '20' || dept == '1' || dept == '4' || dept == '01' || dept == '04' || dept == '15' || dept == '29' || dept == '33' || dept == '34' || dept == '38'
			|| dept == '14' || dept == '19' || dept == '3' || dept == '87' || dept == '88' || dept == '89' || dept == '41' || dept == '4000' || dept == '4001' || dept == '4002'
				|| dept == '12' || dept == '3412' || dept == '3415') {
		element.show();
	}
}
function getSizeChartRequest(e){
	var $this = $(e);
	var dept = $this.attr('data-dept');
	if (dept == 'i03') {
		dept = 1;
	} else {
		try {
			dept = dept.replace(/\D/g,'');
			dept = Number(dept);
		} catch(err) {
			dept = '';
		}
	}
	var url = '';
	var index = 0;

	//if no size chart available
	if(dept == ''){
		showModal(null, null, '/modals/informational-guides/no-size-chart-available.jsp', null, 500, true, '40%', null, null, null, null, true);
	} else {
		/* womens size charts --------------------------------------------------*/
		//tab 1 womens clothing
		if(dept == '6' || dept == '8' || dept == '9' || dept == '06' || dept == '08' || dept == '09' || dept == '10' || dept == '11' || dept == '17' || dept == '31' || dept == '45'){
			url = 'womens-size-chart.jsp';
			index = 0;
		}
		//tab 1 womens accessories
		if (dept == '16') {
			url = 'womens-size-chart.jsp';
			index = 1;
		}
		//tab 2 womens footwear
		if (dept == '20') {
			url = 'womens-size-chart.jsp';
			index = 2;
		}

		/* mens size charts --------------------------------------------------*/
		//tab 1 mens clothing
		if(dept == '1' || dept == '4' || dept == '01' || dept == '04' || dept == '15' || dept == '29' || dept == '33' || dept == '34' || dept == '38'){
			url = 'mens-size-chart.jsp';
			index = 0;
		}
		//tab 2 mens accessories
		if(dept == '14'){
			url = 'mens-size-chart.jsp';
			index = 1;
		}
		//tab 3 mens footwear
		if(dept == '19'){
			url = 'mens-size-chart.jsp';
			index = 2;
		}
		//tab 4 hem styles
		if(dept == '3'){
			url = 'mens-size-chart.jsp';
			index = 3;
		}

		/* First Ascent size charts --------------------------------------------------*/
		//tab 1 fa mens
		if(dept == '88'){
			url = 'fa-size-chart.jsp';
			index = 0;
		}
		//tab 2 fa womens
		if(dept == '89'){
			url = 'fa-size-chart.jsp';
			index = 1;
		}
		//tab 3 fa accessories
		if(dept == '41'){
			url = 'fa-size-chart.jsp';
			index = 2;
		}

		/* kids size charts --------------------------------------------------*/
		//tab 1 baby clothing
		if(dept == '4000'){
			url = 'kids-size-chart.jsp';
			index = 0;
		}
		//tab 2 boys clothing
		if(dept == '4001' || dept == '87'){
			url = 'kids-size-chart.jsp';
			index = 1;
		}
		//tab 3 girls clothing
		if(dept == '4002'){
			url = 'kids-size-chart.jsp';
			index = 2;
		}

		/* swimwear size charts --------------------------------------------------*/
		if(dept == '12'){
			url = 'swim-size-chart.jsp';
			index = 0;
		}
		//tab 1 miraclesuit swimwear
		if(dept == '3412'){
			url = 'swim-miraclesuit-size-chart.jsp';
			index = 0;
		}
		//tab 1 athena swimwear
		if(dept == '3415'){
			url = 'swim-athena-size-chart.jsp';
			index = 0;
		}
		if(url == '') {
			showModal(null, null, '/modals/informational-guides/no-size-chart-available.jsp', null, 500, true, '40%', null, null, null, null, true);
		} else {
			openSizeChartModal(url, index);
		}
	}
}

//opens the correct size chart with tab selected
function openSizeChartModal(url, index){
	showModal(null, null, '/modals/informational-guides/' + url, null, 992, true, '15%', sizeChartInit, sizeChartOff, null, null, true);
	$('.size-chart .tabs').tabs('.tab-content > div', { initialIndex: index });
	$('.size-chart .tab-content').fadeTo(300, 1);
}

//initializing size chart inches/cm functionality
function sizeChartInit(){
	$('.sc-trigger').on('click', function(e){
		var $this = $(this);
		swapSizeChart($this);
		e.preventDefault();
	});

	var sizeContainer = $('.size-chart-holder').parent().parent().parent().parent();

	$(window).on('resize', function() {
		var sizeCenter = ($(document).width() / 2) - (sizeContainer.width() / 2);

		sizeContainer.css({
			top : '15%',
			left : sizeCenter + 'px'
		});

		var sizeOffset = sizeContainer.offset();

		if(sizeOffset.left < 0) {
			sizeContainer.css({
				top : '15%',
				left : '0'
			});
		}
	});
}

//Keep window resize from stacking on each modal opening
function sizeChartOff() {
	$(window).off('resize');
}

//swaps image, image map, and coords for size charts
function swapSizeChart(area){
	var $map = $(area).parent();
	var inCoords = $(area).attr('data-in');
	var cmCoords = $(area).attr('data-cm');
	var $mapImg = $(area).parent().siblings('img');
	var inSrc = $mapImg.attr('data-insrc');
	var cmSrc = $mapImg.attr('data-cmsrc');

	if ($(area).hasClass('sc-in')){
		$(area).removeClass('sc-in');
		$(area).addClass('sc-cm');
		$mapImg.attr('src', cmSrc);
		$(area).attr('coords', cmCoords);

		if($(area).hasClass('mc-trigger')){
			$('.mc-info').attr('src', $('.mc-info').attr('data-cmsrc'));
		}
	} else {
		$(area).removeClass('sc-cm');
		$(area).addClass('sc-in');
		$mapImg.attr('src', inSrc);
		$(area).attr('coords', inCoords);

		if($(area).hasClass('mc-trigger')){
			$('.mc-info').attr('src', $('.mc-info').attr('data-insrc'));
		}
	}
}



//if pdp details has only one description, remove tab functionality
function pdpTabContentCheck(){
	if ($('#pdpTabHolder .tab-content').children().length < 2){
		$('#pdpTabHolder .tabs').remove();
		$('#pdpTabHolder .tab-content').css({ 'border': 'none', 'padding-top': 0 });
		$('.swatch-holder').css({ 'margin-bottom': '10px' });
	}
}

function showMonogramError(element, errMsg, className) {
	element.closest('.show-the-error').append('<div class="error-tooltip ' + className + '">' +
			'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
			'<p class="left">' + errMsg + '</p>' +
			'<span class="clear-break"></span>' +
			'</div>');
}
//add monogram modal
function initMonogram(isEdit, styleColorMap) {
	var imagePath = "/static/img/monogramming/";

	$(".overlay-modal #monogramStyle").on("change", function() {
		$this = $(this);
		var styleVal = $this.val();
		populateTextColors(styleVal, styleColorMap);
		updateView();
	})

	$(".overlay-modal #monogramColor").on("change", function(e) {
		updateView();
		updatePreview();
	});
	$(".overlay-modal #monogramFont").on("change", function(e) {
		updateView();
		updatePreview();
	});
	$(".overlay-modal #monoFirstInitial").on("keyup", function(e) {
		if ($(this).val() != '') {
			$('.error-tooltip').remove();
			$(this).removeClass('error-field');
		}
		updateInitialPreview();
	});
	$(".overlay-modal #monoLastInitial").on("keyup", function(e) {
		if ($(this).val() != '') {
			$('.error-tooltip').remove();
			$(this).removeClass('error-field');
		}
		updateInitialPreview();
	});
	$(".overlay-modal #monoMiddleInitial").on("keyup", function(e) {
		if ($(this).val() != '') {
			$('.error-tooltip').remove();
			$(this).removeClass('error-field');
		}
		updateInitialPreview();
	});
	$(".overlay-modal #monogramNameWord").on("keyup", updateWordPreview);


	$('#enterInitials input').focus(function(e) {
		$(this).select();
	});


	if($('#monogramStyle option').size() == 2 && !isEdit) {
		$('#monogramStyle').val($('#monogramStyle option').eq(1).val()).change();
	}

	function populateTextColors(styleVal, styleColorMap) {
		var selColor = $('#monogramColor').val();
		$('.mono-style-color-options').remove();
		var colorHtml = '';
		var colorMap = styleColorMap[styleVal];
		if(colorMap != null) {
			$.each(colorMap, function(index, obj) {
				colorHtml += '<option data-displayname="' + obj.colorName + '" class="mono-style-color-options" value="' + obj.colorId + '">' + obj.colorName + '</option>';
			});
			$('#monogramColor').append(colorHtml);
		}
		$('#monogramColor').val(selColor).change();
	}

	//update view
	function updateView() {
		var selectedStyle = $("#monogramStyle option:selected").val();
		var selectedColor = $("#monogramColor option:selected").val();
		var selectedFont = $("#monogramFont option:selected").val();

		if (selectedStyle === "3" && selectedColor != "-1" && selectedFont != "-1") {
			clearWord();
			clearPreview();
			$(".monogram-3").show();
			$("#monogramPreview").show().append('<img src="/static/img/monogramming/blank.gif" id="mgmFirstInitial" class="mgmInitialImage" alt="" /><img src="/static/img/monogramming/blank.gif" id="mgmLastInitial" class="mgmInitialImageLg" alt="" /><img src="/static/img/monogramming/blank.gif" id="mgmMiddleInitial" class="mgmInitialImage" alt="" />');
		} else if (selectedStyle === "5" && selectedColor != "-1" && selectedFont != "-1") {
			clearInitials();
			clearPreview();
			$(".monogram-9").show();
			$("#monogramPreview").show();
		} else {
			clearInitials();
			clearWord();
			clearPreview();
		}
	}

	//clear monogram initials
	function clearInitials() {
		$("#monoFirstInitial").val("");
		$("#monoLastInitial").val("");
		$("#monoMiddleInitial").val("");
	}
	//clear monogram word
	function clearWord() {
		$("#monogramNameWord").val("");
	}
	//clear preview
	function clearPreview() {
		$(".monogram-3").hide();
		$(".monogram-9").hide();
		$("#monogramPreview").empty().hide();
	}

	//update preview area
	function updatePreview() {
		var selectedStyle = $("#monogramStyle option:selected").val();

		if (selectedStyle === "3") {
			updateInitialPreview();
		} else if (selectedStyle === "5") {
			updateWordPreview();
		}
	}
	//update initials preview
	function updateInitialPreview() {
		var fField = $("#monoFirstInitial");
		var mField = $("#monoMiddleInitial");
		var lField = $("#monoLastInitial");
		var first = $("#monoFirstInitial").val().toUpperCase();
		var middle = $("#monoMiddleInitial").val().toUpperCase();
		var last = $("#monoLastInitial").val().toUpperCase();
		var color = $("#monogramColor option:selected").val();

		var nextField;
		var isFirst = false;
		var isSecond = false;
		if (fField.is(':focus')) {
			nextField = lField;
			isFirst = true;
		} else if (lField.is(':focus')) {
			nextField = mField;
			isSecond = true;
		}

		if (first.match(/[a-zA-Z]/g)) {
			$("#mgmFirstInitial").attr('src', imagePath + color + '/' + first + '_gb_uc.gif');
			if (isFirst) {nextField.focus().select().focus();}

		} else {
			$("#mgmFirstInitial").attr('src', imagePath + 'blank.gif');
			fField.val(first.slice(0, -1));
		}

		if (middle.match(/[a-zA-Z]/g)) {
			$("#mgmMiddleInitial").attr('src', imagePath + color + '/' + middle + '_gb_uc.gif');
		} else {
			$("#mgmMiddleInitial").attr('src', imagePath + 'blank.gif');
			mField.val(middle.slice(0, -1));
		}

		if (last.match(/[a-zA-Z]/g)) {
			$("#mgmLastInitial").attr('src', imagePath + color + '/' + last + '_gb_uc.gif');
			if (isSecond) {nextField.focus().select().focus();}
		} else {
			$("#mgmLastInitial").attr('src', imagePath + 'blank.gif');
			lField.val(last.slice(0, -1));
		}
	}

	//update word preview
	function updateWordPreview() {
		$('.error-tooltip').remove();
		$('.error-field').removeClass('error-field');
		var field = $("#monogramNameWord");
		var word = field.val();
		word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		var wordLength = word.length;
		var color = $("#monogramColor option:selected").val();
		var container = $("#monogramPreview");


		field.val(word);
		container.empty();

		for(var i = 0; i < wordLength; i++) {
			var char = word.charAt(i);
			var letter = char.match(/[a-zA-Z]/g);
			var letterCase = char.match(/[a-z]/g) ? "lc" : "uc";
			var number = char.match(/[0-9]/g);
			var special = char.match(/[^\w]/g);

			if (char === " ") {
				container.append('<img src="' + imagePath + 'blank.gif" class="mgmWord" alt="' + char + '" />');
			} else if (number) {
				container.append('<img src="' + imagePath + color + '/' + char + '_gb.gif" class="mgmWord" alt="' + char + '" />');
			} else if (special) {
				switch (char) {
					case '&':
						container.append('<img src="' + imagePath + color + '/ampersand_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case ',':
						container.append('<img src="' + imagePath + color + '/comma_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case "'":
						container.append('<img src="' + imagePath + color + '/apostrophe_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case '-':
						container.append('<img src="' + imagePath + color + '/hyphen_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case '.':
						container.append('<img src="' + imagePath + color + '/period_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case '#':
						container.append('<img src="' + imagePath + color + '/pound_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case '"':
						container.append('<img src="' + imagePath + color + '/quote_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case '/':
						container.append('<img src="' + imagePath + color + '/slash_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case '@':
						container.append('<img src="' + imagePath + color + '/atsign_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					case '*':
						container.append('<img src="' + imagePath + color + '/asterisk_gb.gif" class="mgmWord" alt="' + char + '" />');
						break;
					default:
						field.val(word.slice(0, -1));
						return;
				}
			} else if (letter) {
				container.append('<img src="' + imagePath + color + '/' + char + '_gb_' + letterCase + '.gif" class="mgmWord" alt="' + char + '" />');
			} else {
				field.val(word.slice(0, -1));
				return;
			}
		}
	}
}


function validateMonogramInputs() {
	$('.error-tooltip').remove();
	$('.error-field').removeClass('error-field');

	var isValid = true;
	if ($('#monogramStyle').val() == "" || $('#monogramStyle').val() == -1) {
		isValid = false;
		$('#monogramStyle').addClass('error-field');
	}
	if ($('#monogramColor').val() == "" || $('#monogramColor').val() == -1) {
		isValid = false;
		$('#monogramColor').addClass('error-field');
	}
	if ($('#monogramFont').val() == "" || $('#monogramFont').val() == -1) {
		isValid = false;
		$('#monogramFont').addClass('error-field');
	}
	if (!isValid) {
		showMonogramError($('#monogramFont'), 'Please select all fields', 'monogram-error');
	}

	var inputValid = true;
	if ($('#enterInitials').is(':visible')) {
		if ($.trim($('#monoFirstInitial').val()) == "") {
			inputValid = false;
			$('#monoFirstInitial').addClass('error-field');
		}
		if ($.trim($('#monoLastInitial').val()) == "") {
			inputValid = false;
			$('#monoLastInitial').addClass('error-field');
		}
		if ($.trim($('#monoMiddleInitial').val()) == "") {
			inputValid = false;
			$('#monoMiddleInitial').addClass('error-field');
		}
		if (!inputValid) {
			isValid = false;
			showMonogramError($('#monoMiddleInitial'), 'Please enter all initials', 'monogram-input-error');
		}

	} else {
		if ($.trim($('#monogramNameWord').val()) == "") {
			$('#monogramNameWord').addClass('error-field');
			showMonogramError($('#monogramNameWord'), 'Please enter a valid monogram', 'monogram-input-error-word');
			isValid = false;
		}
	}

	return isValid;
}

function getMonogramInputText(selectedStyle) {
	var inputText = '';
	if ($('#enterInitials').is(':visible')) {
		inputText = $('#monoFirstInitial').val() + ' ' + $('#monoLastInitial').val() + ' ' + $('#monoMiddleInitial').val();
		inputText = inputText.toUpperCase();
	} else {
		inputText = $('#monogramNameWord').val();
	}
	return inputText;
}

//wishlist/shopping cart item thumb zoom in
function wlZoomMouseenter($this, zoomImg) {
	if (zoomImg != undefined){
		$this.parent().append('<img class="wl-item-zoom-img" src="' + zoomImg + '" alt="" />');
		if ($('.wl-item-zoom-img').not(':animated')){
			$('.wl-item-zoom-img').animate({
				width: 183 + 'px',
				opacity: 1
			}, 300);
			wlZoomMouseleave();
		}
	} else {
		$this.parent().append('<img class="wl-item-zoom-img" src="/static/img/photo-unavailable.png" alt="" />');
			if ($('.wl-item-zoom-img').not(':animated')){
			$('.wl-item-zoom-img').animate({
				width: 100 + 'px',
				opacity: 1
			}, 300);
			wlZoomMouseleave();
		}
	}
}

//wishlist/shopping cart item thumb zoom out
function wlZoomMouseleave(){
	$('.wl-item-zoom-img').off().mouseleave(function () {
		$('.wl-item-zoom-img').animate({
			width: 0,
			opacity: 0
		}, 300, function(){
			$('.wl-item-zoom-img').remove();
		});
	});
}

/*************** PDP FUNCTIONS *********************/
function prePopulateProductInfo(element) {
	var style = $.trim(element.attr('data-style'));
	var color = $.trim(element.attr('data-color'));
	var size = $.trim(element.attr('data-size'));
	var hemStyle = $.trim(element.attr('data-hemstyle'));
	var inseam = $.trim(element.attr('data-inseam'));
	var quantity = $.trim(element.attr('data-quantity'));


	if (!$('.style-selection[value="' + style + '"]').prop('checked')) {
		$('.style-selection[value="' + style + '"]').prop('checked', true);
		$('.style-selection[value="' + style + '"]').click();
	}

	$('#pdpSelectColor').val(color);
	if($('#pdpSelectColor').val() == '')
		$('#pdpSelectColor').val($('#pdpSelectColor').attr('data-defaultcolor'));
	$('#pdpSelectColor').change();

	$('#pdpSelectSize').val(size).change();


	$('#pdpSelectHemStyle').val($('#pdpSelectHemStyle option[data-hemstyle="' + hemStyle + '"]').val()).change();
	$('#pdpSelectHemLength').val(inseam);
	$('#pdpSelectQuantity').val(quantity);

	if($('#edit-item-monogram').data('ismonogram')) {
		$('#pdp-monogram-option').prop('checked', true);
	}
	if($('#edit-item-giftbox').data('isgiftbox')) {
		$('#pdp-gift-box-option').prop('checked', true);
	}
}

function getMonogramSku(styleColorMap) {
	try {
		var style = $('#monogramStyle').val();
		var color = $('#monogramColor').val();
		var colorMap = styleColorMap[style];
		var skuId = '';
		if(colorMap != null) {
			$.each(colorMap, function(index, obj) {
				if(color == obj.colorId) {
					skuId = obj.skuId;
				}
			});
		}
		return skuId;
	} catch(err) {
		return '';
	}
}

function monogramEvents(fromBag) {
	var fromTheBag = false;
	if(typeof fromBag != 'undefined' && fromBag != null) {
		fromTheBag = fromBag;
	}
	var styleColorMap = null;
	try {
		styleColorMap = $.parseJSON($('#monogramColorMap').text());
	} catch(err){}
	initMonogram(false, styleColorMap);


	if(fromTheBag && $('#edit-item-monogram').data('ismonogram')) {
		var element = $('#edit-item-monogram');
		var styleKey = "" + element.attr('data-stylekey');
		var colorKey = "" + element.attr('data-colorkey');
		var fontKey = "" + element.attr('data-fontkey');
		var inputText = "" + element.data('inputtext');

		$('#monogramStyle').val($('option[data-displayname="' + styleKey + '"]').val());
		$('#monogramStyle').change();
		$('#monogramColor').val($('option[data-displayname="' + colorKey + '"]').val());
		$('#monogramColor').change();
		$('#monogramFont').val($('option[data-displayname="' + fontKey + '"]').val());


		if (styleKey.indexOf('3') >= 0) {
			$('#monoFirstInitial').val(inputText.charAt(0));
			$('#monoLastInitial').val(inputText.charAt(2));
			$('#monoMiddleInitial').val(inputText.charAt(4)).keyup();
		} else {
			$('#monogramNameWord').val(inputText).keyup();
		}
	}

	$('.continue-with-monogram').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		var cont = validateMonogramInputs();
		if (cont) {
			var mskuId = getMonogramSku(styleColorMap);
			if(mskuId == null || mskuId == '') {
				showPdpError($('.continue-with-monogram'), 'Error adding monogram to your bag.');
				return false;
			}
			$('#bag-monogram-style').val($('#monogramStyle option:selected').text());
			$('#bag-monogram-style-key').val($('#monogramStyle').val());
			$('#bag-monogram-text-color').val($('#monogramColor  option:selected').text());
			$('#bag-monogram-text-style').val($('#monogramFont option:selected').text());
			$('#bag-monogram-sku').val(mskuId);
			var monogramInputText = getMonogramInputText();
			$('#bag-monogram-input-text').val(monogramInputText);

			if(fromTheBag) {
				var successCallBack = function(data) {
					if($('body').hasClass('checkout-review')) {
						if(data.redirectPayment) {
							location.href= "/checkout/payment.jsp";
						} else {
							reloadCheckoutOrderSummary(false, false, true);
							$('.close.ir').click();
						}
					} else {
						$('.close.ir').click();
						reloadOrderSummary(true);
					}
				};

				var errorCallBack = function(data) {
					if (data.maxCartItems != null && data.maxCartItems) {
						showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null, null, null, true);
					} else {
						showPdpError($this, data.errors[0].message);
					}
				}
				var completeCallBack = function() {$this.removeClass('active-loading');};
				var beforeSend = function() {
					$this.addClass('active-loading')
				}
			} else {
				var successCallBack = function(data){
					var commerceId = data.commerceId;
					var onload = addToBagModalLoad;
					showModal(null, null, '/modals/pdp/pdp-shopping-bag-added.jsp?commerceId=' + commerceId, null, 600, true, '15%', onload, null);
					updateShoppingBagCount();
				};
				var errorCallBack = function(data) {
					if (data.maxCartItems != null && data.maxCartItems) {
						showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
					} else {
						showPdpError($('.continue-with-monogram'), data.errors[0].message);
					}
				}
				var completeCallBack = function() {$this.removeClass('active-loading');};
				var beforeSend = function() {
					$this.addClass('active-loading')
				}
			}
			ajaxFormSubmit($('#add-to-bag-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
		} else {
			$this.removeClass('active-loading');
		}
	});

	$('.continue-without-monogram').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		$('#bag-is-monogram').val('false');
		if(fromTheBag) {
			var successCallBack = function(data) {
				if($('body').hasClass('checkout-review')) {
					if(data.redirectPayment) {
						location.href= "/checkout/payment.jsp";
					} else {
						reloadCheckoutOrderSummary(false, false, true);
						$('.close.ir').click();
					}
				} else {
					$('.close.ir').click();
					reloadOrderSummary(true);
				}
			};
			var errorCallBack = function(data) {
				if (data.maxCartItems != null && data.maxCartItems) {
					showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null, null, null, true);
				} else {
					showPdpError($this, data.errors[0].message);
				}
			}
			var completeCallBack = function() {$this.removeClass('active-loading');};
			var beforeSend = function() {
				$this.addClass('active-loading')
			}
		} else {

			var successCallBack = function(data){
				var commerceId = data.commerceId;
				var onload = addToBagModalLoad;
				showModal(null, null, '/modals/pdp/pdp-shopping-bag-added.jsp?commerceId=' + commerceId, null, 600, true, '15%', onload, null);
				updateShoppingBagCount();
			};
			var errorCallBack = function(data) {
				if (data.maxCartItems != null && data.maxCartItems) {
					showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
				} else {
					$('a.close.ir').click();
					showPdpError($('#pdpAddCartFormSubmit'), data.errors[0].message);
				}
			}
			var completeCallBack = function() {$this.removeClass('active-loading');};
			var beforeSend = function() {
				$this.addClass('active-loading')
			}
		}
		ajaxFormSubmit($('#add-to-bag-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
	});
}

function addToWishlistFromLogin(styleSizeDriverObj) {
	var effort = $('.pdp-wishlist-link.formItem').attr('data-effort'),
		isEOB = $('.pdp-wishlist-link.formItem').attr('data-iseob'),
		isSale = $('.pdp-wishlist-link.formItem').attr('data-issale');

	$('.pdp-wishlist-link.formItem').load('/xhr/pdp-wishlist-form.jsp?effort=' + effort + '&isEOB=' + isEOB + '&isSale=' + isSale + '&_=' + Math.random(), function() {
		var cont = false;
		$('#wishlist-product-id').val($('#bag-product-id').val());
		cont = buildWishlistFormValues(styleSizeDriverObj);

		if (cont) {
			var closeFunction = function () {
					location.reload(true);
				},

				completeCallBack = function () {
					$('#pdpAddToWishlist').removeClass('active-loading');
				},

				errorCallBack = function (data) {
					if (data.maxWlItems != null && data.maxWlItems) {
						showModal(null, null, '/modals/pdp/pdp-wishlist-bag-full.jsp', null, 500, true, '30%', null, closeFunction);
					} else {
						showPdpError($('#pdpAddToWishlist'), data.errors[0].message);
					}
				},

				successCallBack = function (data) {
					showModal(null, null, '/modals/pdp/pdp-wishlist-added.jsp?giftId=' + data.giftItemId, null, 600, true, '20%', null, closeFunction);
				};

			ajaxFormSubmit($('#add-to-wishlist-form'), null, successCallBack, errorCallBack, completeCallBack);
		}
	});
}

function populateSkuId(style,stylesMap) {
	try {
		if($('#product-display-name').text().toUpperCase() == stylesMap[style][0].toUpperCase()) {
			$('.pdp-item-id .style-name').text('');
		} else {
			$('.pdp-item-id .style-name').text(stylesMap[style][0]);
		}
	} catch(err) {}
	var styleText = '';
	if($('.pdp-clearance-container').length && $('.pdp-clearance-container').is(':visible')) {
		var stylearr = stylesMap[style][1].split(' ');
		if($.inArray($('#pdpSelectColor').val(), clearanceColors[$('.style-selection:checked').val()]) < 0) {
			styleText = stylearr[0] + ' ' + '792' + ' ' + stylearr[2];
		} else {
			styleText = stylearr[0] + ' ' + '709' + ' ' + stylearr[2];
		}
	} else {
		styleText = stylesMap[style][1];
	}
	if(styleText == '') {
		styleText = stylesMap[style][1];
	}
	$('.pdp-item-id .sku-id').text(styleText);
}

function giftBoxEvents(isMonogram, fromBag) {
	var fromTheBag = false;
	if(typeof fromBag != 'undefined' && fromBag != null) {
		fromTheBag = fromBag;
	}
	if(fromTheBag && $('#edit-item-giftbox').data('isgiftbox')) {
		var element = $('#edit-item-giftbox');
		$('#gift-box-to').val(element.data('giftboxto'));
		$('#gift-box-from').val(element.data('giftboxfrom'));
		$('#gift-box-message').val(element.data('giftboxmessage'));
	}

	$('#submit-gift-box').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		if ($.trim($('#gift-box-to').val()) == '') {
			$('#gift-box-to').addClass('error-field');
			showErrorToolTip($('#gift-box-to'), 'This field is required');
			return false;
		}
		if ($.trim($('#gift-box-from').val()) == '') {
			$('#gift-box-from').addClass('error-field');
			showErrorToolTip($('#gift-box-from'), 'This field is required');
			return false;
		}
		$('#bag-giftbox-to').val($('#gift-box-to').val());
		$('#bag-giftbox-from').val($('#gift-box-from').val());
		$('#bag-giftbox-message').val($('#gift-box-message').val());

		if (isMonogram) {
			if(fromTheBag) {
				$('.add-gb-modal').closest('.overlay-modal').find('.close.ir').click();
				var onLoadFunction = function() {
					monogramEvents(fromTheBag);
				};
				showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $('#bag-product-id').val() + '&skuid=' + $('#bag-skuId').val(), null, 619, true, '15%', onLoadFunction, null, null, null, true);
			} else {
				var onLoadFunction = function() {
					monogramEvents(fromTheBag);
				};
				showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $('#bag-product-id').val() + '&skuid=' + $('#bag-skuId').val(), null, 619, true, '15%', onLoadFunction, null);
			}
		} else {
			if(fromTheBag) {
				var successCallBack = function(data) {
					if($('body').hasClass('checkout-review')) {
						if(data.redirectPayment) {
							location.href= "/checkout/payment.jsp";
						} else {
							reloadCheckoutOrderSummary(false, false, true);
							$('.close.ir').click();
						}
					} else {
						$('.close.ir').click();
						reloadOrderSummary(true);
					}
				};
				var errorCallBack = function(data) {
					if (data.maxCartItems != null && data.maxCartItems) {
						showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null, null, null, true);
					} else {
						showPdpError($this, data.errors[0].message);
					}
				}
				var completeCallBack = function() {$this.removeClass('active-loading');};
				var beforeSend = function() {
					$this.addClass('active-loading')
				}
			} else {
				var successCallBack = function(data){
					var commerceId = data.commerceId;
					var onload = addToBagModalLoad;
					showModal(null, null, '/modals/pdp/pdp-shopping-bag-added.jsp?commerceId=' + commerceId, null, 600, true, '15%', onload, null);
					updateShoppingBagCount();
				};
				var errorCallBack = function(data) {
					if (data.maxCartItems != null && data.maxCartItems) {
						showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
					} else {
						$('a.close.ir').click();
						showPdpError($('#pdpAddCartFormSubmit'), data.errors[0].message);
					}
				}
				var completeCallBack = function() {$this.removeClass('active-loading');};
				var beforeSend = function() {
					$this.addClass('active-loading')
				}
			}
			ajaxFormSubmit($('#add-to-bag-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
		}
	});

	$('.no-gift-box').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		$('#bag-is-giftbox').val('false');

		if (isMonogram) {
			if(fromTheBag) {
				$('.add-gb-modal').closest('.overlay-modal').find('.close.ir').click();
				var onLoadFunction = function() {
					monogramEvents(fromTheBag);
				};
				showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $('#bag-product-id').val() + '&skuid=' + $('#bag-skuId').val(), null, 619, true, '15%', onLoadFunction, null, null, null, true);
			} else {
				var onLoadFunction = function() {
					monogramEvents(fromTheBag);
				};
				showModal(null, null, '/modals/pdp/pdp-add-monogram.jsp?productId=' + $('#bag-product-id').val() + '&skuid=' + $('#bag-skuId').val(), null, 619, true, '15%', onLoadFunction, null);
			}
		} else {
			if(fromTheBag) {
				var successCallBack = function(data) {
					if($('body').hasClass('checkout-review')) {
						if(data.redirectPayment) {
							location.href= "/checkout/payment.jsp";
						} else {
							reloadCheckoutOrderSummary(false, false, true);
							$('.close.ir').click();
						}
					} else {
						$('.close.ir').click();
						reloadOrderSummary(true);
					}
				};
				var errorCallBack = function(data) {
					if (data.maxCartItems != null && data.maxCartItems) {
						showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null, null, null, true);
					} else {
						showPdpError($this, data.errors[0].message);
					}
				}
				var completeCallBack = function() {$this.removeClass('active-loading');};
				var beforeSend = function() {
					$this.addClass('active-loading')
				}
			} else {
				var successCallBack = function(data){
					var commerceId = data.commerceId;
					var onload = addToBagModalLoad;
					showModal(null, null, '/modals/pdp/pdp-shopping-bag-added.jsp?commerceId=' + commerceId, null, 600, true, '15%', onload, null);
					updateShoppingBagCount();
				};
				var errorCallBack = function(data) {
					if (data.maxCartItems != null && data.maxCartItems) {
						showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
					} else {
						$('a.close.ir').click();
						showPdpError($('#pdpAddCartFormSubmit'), data.errors[0].message);
					}
				}
				var beforeSend = function() {
					$this.addClass('active-loading')
				}
				var completeCallBack = function() {$this.removeClass('active-loading');};
			}
			ajaxFormSubmit($('#add-to-bag-form'), beforeSend, successCallBack, errorCallBack, completeCallBack);
		}
	});
}

function addToBagModalLoad() {
	var link = $('#productDetailsHolder').data('referer');
	var name = $('#productDetailsHolder').data('catname');
	name=name.replace('_',"&");
	if($.trim(link) != '') {
		$('.back-to-category-link').attr('href', link);
		$('.back-to-category-link').removeClass('close').off();
		$('.back-to-category').text(decodeURIComponent(name));
		$('.back-to-category-link').click(function(e) {
			e.preventDefault();
			if(window.history.length <= 1) {
				location.href=$('.back-to-category-link').attr('href');
			} else {
				window.history.back();
			}
		});
	} else {
		$('.back-to-category').text('Previous Page');
	}
	$('.ymal-look-tab').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var index = $this.index();
		if($this.hasClass('active'))
			return false;
		$('.ymal-look-tab').removeClass('active');
		$this.addClass('active');
		$('.ymal-looks-content').hide();
		$('.ymal-looks-content').eq(index).fadeIn('fast');
	});

}

function populatePdpPrice(priceMapObj, fromWhere, styleColorsObj) {
	//EOB page
	if(clearanceColors != null) {
		if(fromWhere == 'style') {
			var colorId = $('#pdpSelectColor').val();
			if($.inArray(colorId, clearanceColors[$('.style-selection:checked').val()]) < 0) {
				populateMainPrice(priceMapObj,true);
				populateMainClearancePrice(false, priceMapObj);
			} else {
				populateMainClearancePrice(false, priceMapObj);
			}
		} else if(fromWhere == 'color') {
			var colorId = $('#pdpSelectColor').val();
			if($.inArray(colorId, clearanceColors[$('.style-selection:checked').val()]) < 0) {
				populateSideBarPrice(priceMapObj, styleColorsObj, false);
				populateMainPrice(priceMapObj, true);
			} else {
				populateSideBarPrice(priceMapObj, styleColorsObj, true);
				populateMainClearancePrice(false, priceMapObj);
			}
		} else {
			populateSideBarPrice(priceMapObj, styleColorsObj, false);
			populateMainPrice(priceMapObj, true);
			populateMainClearancePrice(true, priceMapObj);
		}
	} else {
		if(fromWhere == 'style') {
			populateMainPrice(priceMapObj, false);
		} else if(fromWhere == 'color') {
			populateSideBarPrice(priceMapObj, styleColorsObj, false);
			populateMainPrice(priceMapObj, false);
		} else {
			populateSideBarPrice(priceMapObj, styleColorsObj, false);
			populateMainPrice(priceMapObj, false);
		}
	}
}

function populateSideBarPrice(priceMapObj, styleColorsObj, showClearance) {
	$('#styleCutHolder .style-item').each(function() {
		$this = $(this);
		var styleId = $this.find('.style-selection').val();
		var selColorId = $('#pdpSelectColor').val();
		if(selColorId == '') {
			if(clearanceColors != null) {
				$.each(styleColorsObj[styleId], function(index, colorObj) {
					if($.inArray(colorObj.colorId, clearanceColors[styleId]) < 0) {
						selColorId = colorObj.colorId;
						return false;
					}
				});
				if(selColorId == '') {
					selColorId = styleColorsObj[styleId][0].colorId;
				}
			} else {
				selColorId = styleColorsObj[styleId][0].colorId;
			}
		}
		var skuPriceMap = priceMapObj[selColorId][styleId];
		var priceHtml = getPriceHtml(skuPriceMap);
		if(priceHtml == '') {
			if(showClearance) {
				var colorId = styleColorsObj[styleId][0].colorId;
				if(clearanceColors != null) {
					$.each(styleColorsObj[styleId], function(index, colorObj) {
						if($.inArray(colorObj.colorId, clearanceColors[styleId]) > -1) {
							colorId = colorObj.colorId;
							return false;
						}
					});
				}
				skuPriceMap = priceMapObj[colorId][styleId];
				priceHtml = getPriceHtml(skuPriceMap);
			} else {
				var colorId = styleColorsObj[styleId][0].colorId;
				if(clearanceColors != null) {
					$.each(styleColorsObj[styleId], function(index, colorObj) {
						if($.inArray(colorObj.colorId, clearanceColors[styleId]) < 0) {
							colorId = colorObj.colorId;
							return false;
						}
					});
				}
				skuPriceMap = priceMapObj[colorId][styleId];
				priceHtml = getPriceHtml(skuPriceMap);
			}
		}
		if(priceHtml != '') {
			$this.find('.pdp-style-price').html(priceHtml);
		}
	});
}

function populateClearancePriceInMain(priceMapObj) {
	var styleId = $('.style-selection:checked').val();
	var colorId = $('#pdpSelectColor').val();
	if(colorId == '') {
		colorId = $('.swatch-holder-clearance a').eq(0).attr('data-colorid');
	}
	var skuPriceMap = priceMapObj[colorId][styleId];
	var priceHtml = getPriceHtml(skuPriceMap);
	if(priceHtml != '') {
		$('.clearance-text').remove();
		$('<div class="clearance-text">CLEARANCE</div>').insertBefore('.pdpSwatches');
		copyClearanceSwatchesToMain();
		$('#pdpPriceHolder').html(priceHtml);
		$('.pdp-clearance-container').hide();
	}
}

function copyClearanceSwatchesToMain() {
	$('.swatch-holder').html($('.swatch-holder-clearance').html());
}

function populateMainPrice(priceMapObj, isEOB) {
	if(isEOB) {
		$('#pdpPriceHolder').next('.clearance-text').remove();
		var styleId = $('.style-selection:checked').val();
		if($('.swatch-holder a').eq(0).attr('data-colorid') == null || $('.swatch-holder a').eq(0).attr('data-colorid') == '') {
			populateClearancePriceInMain(priceMapObj);
			return;
		}
		var colorId = $('#pdpSelectColor').val();
		if(colorId == '') {
			colorId = $('.swatch-holder a').eq(0).attr('data-colorid');
		}
		var skuPriceMap = priceMapObj[colorId][styleId];
		var priceHtml = getPriceHtml(skuPriceMap);
		if(priceHtml != '') {
			$('#pdpPriceHolder').html(priceHtml);
		}
	} else {
		var priceHtmlMain = $('.style-selection:checked').closest('.formItem').find('.pdp-style-price').html();
		$('#pdpPriceHolder').html(priceHtmlMain);
	}
}

function populateMainClearancePrice(isPageLoad, priceMapObj) {
	if(isPageLoad) {
		var selColorId = $('.swatch-holder-clearance a').eq(0).attr('data-colorid');
		if(selColorId != null && selColorId != '') {
			var styleId = $('.style-selection:checked').val();
			var skuPriceMap = priceMapObj[selColorId][styleId];
			var priceHtml = getPriceHtml(skuPriceMap);
			if(priceHtml != '') {
				priceHtml += '<div class="clearance-text">CLEARANCE</div>';
				$('#pdpPriceHolderClearance').html(priceHtml);
			}
		}
	} else {
		if($('.pdp-clearance-container').length && !$('.pdp-clearance-container').is(':visible')) {
			populateMainPrice(priceMapObj, true)
		} else {
			var styleId = $('.style-selection:checked').val();
			var colorId = $('#pdpSelectColor').val();
			if(colorId == '') {
				colorId = $('.swatch-holder-clearance a').eq(0).attr('data-colorid');
				if(colorId == null || colorId == '') {
					return;
				}
			}
			var skuPriceMap = priceMapObj[colorId][styleId];
			var priceHtml = getPriceHtml(skuPriceMap);
			if(priceHtml != '') {
				priceHtml += '<div class="clearance-text">CLEARANCE</div>';
				$('#pdpPriceHolderClearance').html(priceHtml);
			}
		}
	}

}

function getPriceHtml(skuPriceMap) {
	if(skuPriceMap != null) {
		if(skuPriceMap.isSaleOrClearance && skuPriceMap.listPrice != null && skuPriceMap.listPrice > 0) {
			priceHtml = '<span class="regular-price">$' + skuPriceMap.listPrice + '</span><span class="sale-price">$' + skuPriceMap.realPrice + '</span>';
		} else {
			priceHtml = '<span>$' + skuPriceMap.realPrice + '</span>';
		}
		return priceHtml;
	} else {
		return '';
	}
}

function buildCartFormValues(styleSizeDriverObj) {
	//clear gift box and monogram values
	$('.bag-giftbox-values').val('');
	$('.bag-monogram-values').val('');

	$('#bag-quantity').val($('#pdpSelectQuantity').val());
	var skuId = getSkuFromSizeDriverObj($('.style-selection:checked').val(), $('#pdpSelectSize').val(), $('#pdpSelectColor').val(), styleSizeDriverObj);
	$('#bag-skuId').val(skuId);
	if ($('#pdpSelectHemStyle').length) {
		$('#bag-hemstyle').val($.trim($('#pdpSelectHemStyle option:selected').attr('data-hemstyle')));
		$('#bag-inseam').val($('#pdpSelectHemLength').val());
	}
	if ($('#pdp-gift-box-option').length) {
		$('#bag-is-giftbox').val($('#pdp-gift-box-option').prop('checked'));
	}
	if ($('#pdp-monogram-option').length) {
		$('#bag-is-monogram').val($('#pdp-monogram-option').prop('checked'));
	}
	return true;
}

function buildWishlistFormValues(styleSizeDriverObj) {
	var skuId = getSkuFromSizeDriverObj($('.style-selection:checked').val(), $('#pdpSelectSize').val(), $('#pdpSelectColor').val(), styleSizeDriverObj);
	$('#wishlist-skuId').val(skuId);
	$('#wishlist-quantity').val($('#pdpSelectQuantity').val());
	if ($('#pdpSelectHemStyle').length) {
		$('#wishlist-hemstyle').val($.trim($('#pdpSelectHemStyle option:selected').text()));
		$('#wishlist-inseam').val($('#pdpSelectHemLength').val());
	}
	return true;
}

function getSkuFromSizeDriverObj(style, size, color, styleSizeDriverObj) {
	var sku = '';
	if (size != null && size != '' && color != null && color != '') {
		if (styleSizeDriverObj[style][size] != null && styleSizeDriverObj[style][size] != '') {
			$.each(styleSizeDriverObj[style][size], function(key, colorObj) {
				if (color == colorObj.colorId) {
					sku = colorObj.skuId;
				}
			});
		}
	} else if((size != null && size != '') && (color == null || color == '')) {
		if (styleSizeDriverObj[style][size] != null && styleSizeDriverObj[style][size] != '') {
			$.each(styleSizeDriverObj[style][size], function(key, colorObj) {
				sku = colorObj.skuId;
				return false;
			});
		}
	}
	return sku;
}

function getSkuFromColorDriverObj(style, size, color, styleColorDriverObj) {
	var sku = '';
	if (color != null && color != '' && size != null && size != '') {
		if (styleColorDriverObj[style][size] != null && styleColorDriverObj[style][size] != '') {
			$.each(styleColorDriverObj[style][size], function(key, colorObj) {
				if (color == colorObj.colorId) {
					sku = colorObj.skuId;
				}
			});
		}
	} else if((color != null && color != '') && (size == null || size == '')) {
		if (styleColorDriverObj[style][color] != null && styleColorDriverObj[style][color] != '') {
			$.each(styleColorDriverObj[style][color], function(key, colorObj) {
				sku = colorObj.skuId;
				return false;
			});
		}
	}
	return sku;
}

function removeAllPdpErrors() {
	$('.error-tooltip').remove();
	$('.alt-error-tooltip').remove();
	$('select').removeClass('error-field');
}

function validatePdpDropdowns(element, errorMsg) {
	removeAllPdpErrors();
	checkAddToBagHoverError(element, errorMsg);
	var isValid = true;
	if ($('#pdpSelectSize').val() == '') {
		var msg = 'Please select a size';
		showPdpError($('#pdpSelectSize'), msg);
		$('#pdpSelectSize').addClass('error-field');
		isValid = false;
	} else if ($('#pdpSelectSize option:selected').hasClass('text-light')) {
		var size = $('#pdpSelectSize option:selected').text();
		var temp = size.split('-');
		size = temp[0];
		var color = $('#pdpSelectColor option:selected').text();
		var temp = color.split('-');
		color = temp[0];
		var msg = color + 'in Size ' + size + ' is no longer available. Please try a different color or size.';
		showPdpError($('#pdpSelectColor'), msg);
		$('#pdpSelectSize').addClass('error-field');
		$('#pdpSelectColor').addClass('error-field');
		isValid = false;
	}
	if ($('#pdpSelectHemStyle').length && $("#pdpSelectHemStyle").is(":visible") && $('#pdpSelectHemStyle').val() == '') {
		var msg = 'Please select a hem style';
		showPdpError($('#pdpSelectHemStyle'), msg);
		$('#pdpSelectHemStyle').addClass('error-field');
		isValid = false;
	}
	if ($('#pdpSelectHemStyle').length && $("#pdpSelectHemStyle").is(":visible") && ($('#pdpSelectHemStyle').val().indexOf('Cuff') > -1 && $('#pdpSelectHemLength').val() == '')) {
		var msg = 'Please select a inseam length';
		showPdpError($('#pdpSelectHemLength'), msg);
		$('#pdpSelectHemLength').addClass('error-field');
		isValid = false;
	}
	if ($('#pdpSelectColor').val() == '') {
		var msg = 'Please select a color';
		showPdpError($('#pdpSelectColor'), msg);
		$('#pdpSelectColor').addClass('error-field');
		isValid = false;
	}
	return isValid;
}

function checkAddToBagHoverError(element, errorMsg) {

	if ($('#pdpSelectSize').val() == '' || $('#pdpSelectSize option:selected').hasClass('text-light')) {
		if ($(element).closest('.formItem').find('.alt-error-tooltip').length) {
			$(element).closest('.formItem').find('.alt-error-tooltip').remove();
		}
		showPdpError(element, errorMsg);
	} else if ($('#pdpSelectHemStyle').length && $("#pdpSelectHemStyle").is(":visible") && $('#pdpSelectHemStyle').val() == '') {
		if ($(element).closest('.formItem').find('.alt-error-tooltip').length) {
			$(element).closest('.formItem').find('.alt-error-tooltip').remove();
		}
		showPdpError(element, errorMsg);
	} else if ($('#pdpSelectHemStyle').length && ($('#pdpSelectHemStyle').val().indexOf('Cuff') > -1 && $('#pdpSelectHemLength').val() == '')) {
		if ($(element).closest('.formItem').find('.alt-error-tooltip').length) {
			$(element).closest('.formItem').find('.alt-error-tooltip').remove();
		}
		showPdpError(element, errorMsg);
	} else if ($('#pdpSelectColor').val() == '' || $('#pdpSelectColor option:selected').hasClass('text-light')) {
		if ($(element).closest('.formItem').find('.alt-error-tooltip').length) {
			$(element).closest('.formItem').find('.alt-error-tooltip').remove();
		}
		showPdpError(element, errorMsg);
	}
}

function removePdpError(element) {
	element.removeClass('error-field');
	element.closest('.formItem').find('.error-tooltip').fadeOut(300, function(){$(this).remove()});
	element.closest('.formItem').find('.alt-error-tooltip').fadeOut(300, function(){$(this).remove()});
}

function removePdpErrorHover(element) {
	element.removeClass('error-field');
	if (element.closest('.formItem').find('.alt-error-tooltip').find('p').text() == wishlistErrorMsg ||
			element.closest('.formItem').find('.alt-error-tooltip').find('p').text() == pdpErrorMsg) {
		element.closest('.formItem').find('.alt-error-tooltip').fadeOut(300, function(){$(this).remove()});
	}
}

function populateColorText(selColorId, selStyle, styleColorsObj, $target) {
	var $target = $target || $('body');

	$target.find('.pdpSwatches .swatch-holder a, .swatch-holder-clearance a').removeClass('selected');
	$target.find('.pdp-color-text').text('');
	$target.find('#detailsModule a[data-colorid="' + selColorId + '"]').addClass('selected');

	if (styleColorsObj[selStyle] != null && selColorId != '') {
		$.each(styleColorsObj[selStyle], function(key, valueObj) {
			if (selColorId == valueObj.colorId) {
				$target.find('.pdp-color-text').text(valueObj.colorName);
				$target.find('.zoom-color .pdp-item-color').text(valueObj.colorName);
			}
		});
	}

	$target.find('#pdpSelectColor').val(selColorId);
}

function populateColorTextHover(selColorId, selStyle, styleColorsObj, $target) {
	var $target = $target || $('body');

	$target.find('.pdp-color-text').text('');
	$target.find('#detailsModule a[data-colorid="' +selColorId + '"]').addClass('selected');

	if (styleColorsObj[selStyle] != null && selColorId != '') {
		$.each(styleColorsObj[selStyle], function(key, valueObj) {
			if (selColorId == valueObj.colorId) {
				$target.find('.pdp-color-text').text(valueObj.colorName);
			}
		});
	}
}

function resetColorText($target) {
	var $target = $target || $('body'),
		$colorSelectbox = $('#pdpSelectColor'),
		colorId = $colorSelectbox.val(),
		$colorText = $target.find('.pdp-color-text'),
		colorText = colorId ? $colorSelectbox.find('option:selected').text() : '',
		$swatches = $target.find('.pdpSwatches .swatch-holder, .swatch-holder-clearance').find('a');

	$swatches.removeClass('selected');
	$colorText.text(colorText);

	if (colorId) {
		$swatches.filter('[data-colorid="' + colorId + '"]').addClass('selected');
	}
}

function populateColorTextMulti(selColorId, selStyle, styleColorsObj, element) {
	element.find('.swatch-holder a').removeClass('selected');
	element.find('.msku-item-color').text('');
	element.find('.swatch-holder a[data-colorid="' +selColorId + '"]').addClass('selected');
	if (styleColorsObj[selStyle] != null && selColorId != '') {
		$.each(styleColorsObj[selStyle], function(key, valueObj) {
			if (selColorId == valueObj.colorId) {
				element.find('.msku-item-color').text(valueObj.colorName);
			}
		});
	}
	element.find('.color-selection').val(selColorId);
}

function populateColorSwatchesWithClearance(selStyle, styleColorsObj, element, clearanceArray) {
	var swatchHtml = '';
	var swatchClearanceHtml = '';
	if (styleColorsObj[selStyle] != null && styleColorsObj[selStyle] != '') {
		$.each(styleColorsObj[selStyle], function(index, valueObj) {
			if(clearanceArray[selStyle] != null && $.inArray(valueObj.colorId, clearanceArray[selStyle]) > -1) {
				swatchClearanceHtml += '<a href="#" title="' + valueObj.colorName + '" data-colorid="' + valueObj.colorId + '"><img src="' + valueObj.colorUrl + '" alt="' +  valueObj.colorName + '" /></a>';
			} else {
				swatchHtml += '<a href="#" title="' + valueObj.colorName + '" data-colorid="' + valueObj.colorId + '"><img src="' + valueObj.colorUrl + '" alt="' +  valueObj.colorName + '" /></a>';
			}
		});
	}

	element.html(swatchHtml);
	if(swatchClearanceHtml != '') {
		$('.pdp-clearance-container').show();
	} else {
		$('.pdp-clearance-container').hide();
	}
	$('.swatch-holder-clearance').html(swatchClearanceHtml);
}

function populateColorSwatches(selStyle, styleColorsObj, element) {
	var swatchHtml = '';
	if (styleColorsObj[selStyle] != null && styleColorsObj[selStyle] != '') {
		$.each(styleColorsObj[selStyle], function(index, valueObj) {
			swatchHtml += '<a href="#" title="' + valueObj.colorName + '" data-colorid="' + valueObj.colorId + '" data-color="' + valueObj.colorName + '"><img src="' + valueObj.colorUrl + '" alt="' +  valueObj.colorName + '" /></a>';
		});
	}

	element.html(swatchHtml);
}

function showPdpZoom() {
	var	modalWidth = $(window).width() - 40;
	if(modalWidth < 685) {
		modalWidth = 750;
	}
	var	modalHeight = $(window).height() - 40;
	if(modalHeight < 250) {
		modalHeight = 250;
	}
	var onload = function() {
		initializeZoomHtml();
	};
	showModal(null, null, '/modals/pdp/pdp-smoothzoom.jsp', modalHeight, modalWidth, true, 'center', onload, null, null, null, true);
};

/* ********** smooth zoom ****************** */
function smoothZoomInit(initial){
	$('.zoom_thumbnails').find('li a').each(function (){
		$(this).bind('click', {src: $(this).attr('href')}, function (e){
			e.preventDefault();
			var	modalWidth = $(window).width() - 60;
			if(modalWidth < 685) {
				modalWidth = 730;
			}
			$('#modalContent .zoom_thumbnails a').removeClass('selected');
			$(this).addClass('selected');
			var zoomheight = $('#zoom_container').closest('.overlay-modal').height() - $('.zoom-details').height() - 40;
			//Add your zoom settings here
			$('#zoom_container').smoothZoom('destroy').css('background-image', 'url(/static/img/preloader.gif)');
			$('#zoom_container').html('<div class="zoomInstructions initial-load">' +
					'Click or use scroll wheel to zoom.<br> ' +
					'Drag the image to move around. ' +
					'</div> ' +
					'<div class="zoom-item-color">' +
					'<div><span>Shown in: </span><span class="modal-item-color">' + $.trim($('.zoom-swatches .modal-item-color').text()) + '</span></div>' +
					'</div>');

			$('.zoomInstructions').addClass('initial-load');
			$('.zoomInstructions').stop().fadeIn('fast');

			$('#zoom_container').smoothZoom({
				image_url: e.data.src,
				width: modalWidth,
				height: zoomheight + 'px',
				responsive: false,
				responsive_maintain_ratio: true,
				max_WIDTH: '',
				zoom_MAX: 100,
				max_HEIGHT: '',
				animation_SMOOTHNESS: 4,
				animation_SPEED_ZOOM: 5.5,
				animation_SPEED_PAN: 5.5,
				mouse_DOUBLE_CLICK: false,
				on_ZOOM_PAN_COMPLETE: function(){
					if(!$('.zoomInstructions').hasClass('initial-load')) {
						$('.zoomInstructions').stop().fadeOut('medium');
					}
					$('.zoomInstructions').removeClass('initial-load');
					updateZoomButtons();
				}
			});
		});
	});
	if(initial) {
		var index = $('.thumbnail-gallery a.selected').data('index');
		if(index < 1 || index == null || index == '') {
			$('.zoom_thumbnails li a').last().click();
		} else {
			$('.zoom_thumbnails li a[data-index="' + index + '"]').click();
		}
		$('#zoom_container').off().click(function() {
			$('#zoom-in-button').click();
		});
		$('#zoom-in-button').off().click(function(e) {
			e.preventDefault();
			$('#_zinorm').trigger('mousedown').trigger('mouseup');
		});
		$('#zoom-out-button').off().click(function(e) {
			e.preventDefault();
			$('#_zonorm').trigger('mousedown').trigger('mouseup');
		});
		$('#zoom-reset-button').off().click(function(e) {
			e.preventDefault();
			$('#_rsnorm').trigger('mousedown').trigger('mouseup');
		});
	} else {
		$('.zoom_thumbnails li a').last().click();
	}

};

function updateZoomButtons() {
	if($('#_zinorm').parent().css('opacity') < .5) {
		$('#zoom-in-button').removeClass('zoomIn').addClass('zoomInOff');
	} else {
		$('#zoom-in-button').removeClass('zoomInOff').addClass('zoomIn');
	}

	if($('#_zonorm').parent().css('opacity') < .5) {
		$('#zoom-out-button').removeClass('zoomOut').addClass('zoomOutOff');
	} else {
		$('#zoom-out-button').removeClass('zoomOutOff').addClass('zoomOut');
	}

	if($('#_rsnorm').parent().css('opacity') < .5) {
		$('#zoom-reset-button').removeClass('fitImage').addClass('fitImageOff');
	} else {
		$('#zoom-reset-button').removeClass('fitImageOff').addClass('fitImage');
	}
};

function populateZoomImageHtml(colorId, populateSwatches) {
	if(colorId == null || colorId =='') {
		var colorId = $('#pdpSelectColor').val();
		if(colorId == '') {
			colorId = $('#pdpSelectColor').attr('data-selectedcolor');
			if(colorId == '') {
				colorId = $('#pdpSelectColor').attr('data-defaultcolor');
				if(colorId == '') {
					colorId = $('#pdpSelectColor option').eq(1).val();
				}
			}
		}
	}
	if(populateSwatches) {
		populateColorSwatches($('.style-selection:checked').val(), styleColors, $('#modalContent .swatch-holder.modal-swatches'));
		$('#modalContent .swatch-holder.modal-swatches a[data-colorid="' + colorId + '"]').addClass('selected');
		$('#modalContent .modal-item-color').html($('#modalContent .swatch-holder.modal-swatches a[data-colorid="' + colorId + '"]').data('color'));
	}
	var imgMap = colorImageMap[colorId];
	var imgAltMap = colorImageAltMap;

	if(populateSwatches) {
		if(imgAltMap != null) {
			var altHtml = '';
			if(imgMap != null) {
				var mainImgUrl = imgMap.defaultCanvasImage;
				var smallImg = '';
				var zoomImg = '';
				if(mainImgUrl != '') {
					var imgArr = mainImgUrl.split('?');
					smallImg = imgArr[0] + '?$pdp-thumbnail$';
					zoomImg = imgArr[0] + '?$xlarge$';
				}
			}
			altHtml = '<li id="first-alternate-image-zoom"><a title="' + getAltImgColorTitle(mainImgUrl) + '" class="selected" data-size="500,400" href="' + zoomImg + '" data-index="' + 1 +  '">' +
			'<img src="' + smallImg + '" alt="" /></a></li>';
			$(altHtml).prependTo($('ul.zoom_thumbnails'));

			if(imgAltMap != null) {
				var count = 2;
				$.each(imgAltMap, function(index, imgObj) {
					var altImgUrl = imgObj.thumb;
					var canvasImgUrl = imgObj.main;
					var imgAltArr = canvasImgUrl.split('?');
					var canvasImgZoomUrl = imgAltArr[0] + '?$xlarge$';

					altHtml = '<li><a title="' + getAltImgColorTitle(canvasImgUrl) + '" href="' + canvasImgZoomUrl + '" data-size="500,400" data-index="' + count +  '">' +
						'<img src="' + altImgUrl + '" alt="" /></a></li>';
					$(altHtml).prependTo($('ul.zoom_thumbnails'));
					count++;
				});
			}
		}
	} else if(imgMap != null) {
		var mainImgUrl = imgMap.defaultCanvasImage;
		var smallImg = '';
		var zoomImg = '';
		if(mainImgUrl != '') {
			var imgArr = mainImgUrl.split('?');
			smallImg = imgArr[0] + '?$pdp-thumbnail$';
			zoomImg = imgArr[0] + '?$xlarge$';
		}
		var altHtml = '<a title="' + getAltImgColorTitle(mainImgUrl) + '" class="selected" data-size="500,400" href="' + zoomImg + '" data-index="' + 1 +  '">' +
			'<img src="' + smallImg + '" alt="" /></a>';
		$('ul.zoom_thumbnails li a').removeClass('selected');
		$('#first-alternate-image-zoom').empty().html(altHtml);

	}
	$('ul.zoom_thumbnails li a').off();
	if(populateSwatches) {
		smoothZoomInit(true);
	} else {
		smoothZoomInit(false);
	}
};

function initializeZoomHtml() {
	populateZoomImageHtml(null, true);
	$('#modalContent.pdp-smoothzoom').on('click', '.swatch-holder.modal-swatches a', function(e){
		e.preventDefault();
		var $this = $(this);
		var color = $this.data('color');
		var colorId = $this.attr('data-colorid');
		$('#modalContent .swatch-holder.modal-swatches a').removeClass('selected');
		$this.addClass('selected');
		$('#modalContent .modal-item-color').text(color);
		populateZoomImageHtml(colorId, false);
	});

	$('#modalContent .swatch-holder.modal-swatches a').hover(function(e) {
		var $this = $(this);
		$this.addClass('temp-selected');
		$('#modalContent .zoom-swatches .modal-item-color').text($this.data('color'));
	}, function() {
		var $this = $(this);
		$this.removeClass('temp-selected');
		$('#modalContent .zoom-swatches .modal-item-color').text($('#modalContent .swatch-holder.modal-swatches a.selected').data('color'));
	});
};

function populateCanvasImage(colorId, colorImageMapObj, colorImageAltMapObj, $target) {
	var altHtml = '',
		imgMap = colorImageMapObj[colorId],
		imgAltMap = colorImageAltMapObj,
		numOfImg = $('#pdpThumbSlider .thumbnail-gallery li').size();

	if (numOfImg < 1) {
		// build alt images
		if (imgMap != null) {
			var mainImgUrl = imgMap.defaultCanvasImage,
				smallImg = '',
				zoomImg = '';

			if (mainImgUrl != '') {
				var imgArr = mainImgUrl.split('?');
				smallImg = imgArr[0] + '?$pdp-thumbnail$';
				zoomImg = imgArr[0] + '?$xlarge$';
			}
		}

		altHtml = '<li id="first-alternate-image">' +
				'<a title="' + getAltImgColorTitle(mainImgUrl) + '" class="selected" href="' + zoomImg + '" rel="zoom-id: zoom; selectors-class: selected" rev="' + mainImgUrl + '" data-index="' + 1 +  '">' +
					'<img src="' + smallImg + '" alt="">' +
				+'</a>' +
			'</li>';

		if(imgAltMap != null) {
			var count = 2;

			$.each(imgAltMap, function (index, imgObj) {
				var altImgUrl = imgObj.thumb,
					canvasImgUrl = imgObj.main,
					imgAltArr = canvasImgUrl.split('?'),
					canvasImgZoomUrl = imgAltArr[0] + '?$xlarge$';

				altHtml += '<li>' +
						'<a title="' + getAltImgColorTitle(canvasImgUrl) + '" href="' + canvasImgZoomUrl + '" rel="zoom-id: zoom; selectors-class: selected" rev="' + canvasImgUrl + '" data-index="' + count +  '">' +
							'<img src="' + altImgUrl + '" alt="">' +
						'</a>' +
					'</li>';

				count++;
			});
		}
		$('#imageZoom #zoom').attr('href', zoomImg);
		$('#imageZoom #zoom img').attr('src', mainImgUrl);
		$('ul.thumbnail-gallery').html(altHtml);
		$('ul.thumbnail-gallery li a img').off().click(function() {
			updateCanvasColor($(this).prop('src'));
		});
		$('#pdpThumbSlider .thumbnail-gallery li a').off();
		thumbnailSliderInit();
		$('#zoom').css('height', 'auto');
		$('#zoom').off().click(function(e) {
			e.preventDefault();
			showPdpZoom();
		});

		if($('#zoom').hasClass('MagicZoomPlus')) {
			MagicZoomPlus.refresh();
		} else {
			$('#imageZoom #zoom img').one('load', function() {
				$('#imageZoom').removeClass('pdp-image-holder');
				$('#zoom').addClass('MagicZoomPlus');
				MagicZoomPlus.start();
			});
		}
	} else {
		// just build main image
		if (imgMap != null) {
			var mainImgUrl = imgMap.defaultCanvasImage,
				smallImg = '',
				zoomImg = '';

			if (mainImgUrl != '') {
				var imgArr = mainImgUrl.split('?');
				smallImg = imgArr[0] + '?$pdp-thumbnail$';
				zoomImg = imgArr[0] + '?$xlarge$';
			}
		}

		if ($target && $target.is('.pdp-find-modal')) {
			// update image in "Find in Store" modal
			$target.find('.pdp-find-item-overview img').attr('src', smallImg);
		} else {
			//altHtml = '<a title="' + getAltImgColorTitle(mainImgUrl) + '" href="' + zoomImg + '" rel="zoom-id: zoom; selectors-class: selected" rev="' + mainImgUrl + '" data-index="' + 1 +  '">' +
			//'<img src="' + smallImg + '" alt="" /></a>';
			//$('#imageZoom #zoom').attr('href', zoomImg);
			//$('#imageZoom #zoom img').attr('src', mainImgUrl);
			//$('#pdpThumbSlider .thumbnail-gallery li a').removeClass('selected');
			$('#first-alternate-image a').attr('href', zoomImg).attr('rev', mainImgUrl);
			$('#first-alternate-image a img').attr('src', smallImg);
			$('#first-alternate-image a').attr('title', allColorsMap[colorId]);

			$('#imageZoom #zoom').attr('href', zoomImg);
			$('#imageZoom #zoom img').attr('src', mainImgUrl);
			MagicZoomPlus.refresh();
			$('ul.thumbnail-gallery li a').removeClass('selected');
			$('#first-alternate-image a').addClass('selected');
		}
	}
	$('ul.thumbnail-gallery li a img').off().click(function() {
		updateCanvasColor($(this).prop('src'));
	});

};

function populateSizes(selStyle, styleSizesObj, styleColorDriverObj, selColor, selSize, showStockLevel, element) {
	var sizeHtml = '<option value="">Select Size</option>';
	if (styleSizesObj[selStyle] != null && styleSizesObj[selStyle] != '') {
		$.each(styleSizesObj[selStyle], function(index, sizeObj) {
			var selected = '';
			if (sizeObj.sizeId == selSize) {
				selected = 'selected="selected"';
			}
			if (showStockLevel && selColor != '' && selColor != null) {
				if (styleColorDriverObj[selStyle][selColor] != null) {
					var inArray = false;
					$.each(styleColorDriverObj[selStyle][selColor], function(ind, infoObj) {
						if (sizeObj.sizeId == infoObj.sizeId) {
							if (infoObj.isPurchasable) {
								if (infoObj.stockMessage != '') {
									sizeHtml += '<option ' + selected + ' value="' + sizeObj.sizeId + '">' + sizeObj.sizeName + ' - ' + infoObj.stockMessage + '</option>';
								} else {
									sizeHtml += '<option ' + selected + ' value="' + sizeObj.sizeId + '">' + sizeObj.sizeName + '</option>';
								}
							} else {
								//sizeHtml += '<option '  + ' class="no-display" value="' + sizeObj.sizeId + '">' + sizeObj.sizeName +'</option>';
							}
							inArray = true;
						}
					});
					if (!inArray) {
						//sizeHtml += '<option '  + ' class="no-display" value="' + sizeObj.sizeId + '">' + sizeObj.sizeName + '</option>';
					}
				}
			} else {
				sizeHtml += '<option '  + selected + ' value="' + sizeObj.sizeId + '">' + sizeObj.sizeName + '</option>';
			}
		});
	}
	element.html(sizeHtml);
};

function populateHemStyle(selStyle, styleHemInseamObj, hemObj, element) {
	var hemHtml = '<option value="">Select Hem Style</option>';
	var count = 0;
	if (hemObj != null && hemObj != '') {
		$.each(hemObj, function(key, valueObj) {
			if (styleHemInseamObj[selStyle] != null && styleHemInseamObj[selStyle] != '') {
				if (styleHemInseamObj[selStyle][key] != null && styleHemInseamObj[selStyle][key] != '') {
					count++;
					hemHtml += '<option value="' + key + '" data-hemstyle="' + hemObj[key] + '">' + hemObj[key] + '</option>';
				}
			}
		});
	}
	if(count < 2) {
		element.closest('.hemstyle-container').hide();
	} else {
		element.closest('.hemstyle-container').show();
	}
	element.html(hemHtml);
	if(count < 2) {
		element.val(element.find('option').eq(1).val());
		element.find('option').eq(1).attr('data-hemstyle', '');
	}
};

function populateInseam(selStyle, selHem, styleHemInseamObj, element, container) {
	element.prop('disabled', false);
	container.show();
	var hideInseam = false;
	if ((selStyle == null || selStyle == '') && (selHem == null || selHem == '')) {
		element.html('<option value="">Select Inseam Length</option>');
		element.val('');
		element.prop('disabled', true);
	} else {
		var inseamHtml = '<option value="">Select Inseam Length</option>';
		if (styleHemInseamObj[selStyle][selHem] != null && styleHemInseamObj[selStyle][selHem] != '') {
			$.each(styleHemInseamObj[selStyle][selHem], function(index, value) {
				if (value == 'hideInseam') {
					hideInseam = true;
				} else {
					inseamHtml += '<option value="' + value + '">' + value + '</option>';
				}
			});
		}
		element.html(inseamHtml);
		if (hideInseam) {
			container.hide();
		}
		if (selHem == '') {
			element.prop('disabled', true);
		}
	}
}

function populateColors(selStyle, styleColorsObj, styleSizeDriverObj, selSize, selColor, showStockLevel, element) {
	var colorHtml = '<option value="">Select Color</option>';
	if (styleColorsObj[selStyle] != null && styleColorsObj[selStyle] != '') {
		$.each(styleColorsObj[selStyle], function(index, colorObj) {
			var selected = '';
			if (colorObj.colorId == selColor) {
				selected = 'selected="selected"';
			}
			if (showStockLevel && selSize != null && selSize != '') {
				if (styleSizeDriverObj[selStyle][selSize] != null) {
					var inArray = false;
					$.each(styleSizeDriverObj[selStyle][selSize], function(ind, infoObj) {
						if (colorObj.colorId == infoObj.colorId) {
							if (infoObj.isPurchasable) {
								if (infoObj.stockMessage != '') {
									colorHtml += '<option ' + selected + ' value="' + colorObj.colorId + '">' + colorObj.colorName + ' - ' + infoObj.stockMessage + '</option>';
								} else {
									colorHtml += '<option ' + selected + ' value="' + colorObj.colorId + '">' + colorObj.colorName + '</option>';
								}
							} else {
								//colorHtml += '<option ' + ' class="no-display" value="' + colorObj.colorId + '">' + colorObj.colorName + '</option>';
							}
							inArray = true;
						}
					});
					if (!inArray) {
						//colorHtml += '<option ' + ' class="no-display" value="' + colorObj.colorId + '">' + colorObj.colorName + '</option>';
					}
				}
			} else {
				colorHtml += '<option ' + selected + ' value="' + colorObj.colorId + '">' + colorObj.colorName + '</option>';
			}
		});
	}
	element.html(colorHtml);
};

/* ************** CART FUNCTIONS ****************** */
function validateShippingFields() {
	$('.alt-error-tooltip').remove();
	$('.error-field').removeClass('error-field');

	var osStateSelect = $('#osStateSelect');
	var osZipcode = $('#osZipcode');
	var isValid = true;

	if (osStateSelect.val() === '') {
		isValid = false;
		osStateSelect.addClass('error-field');
		showErrorToolTip(osStateSelect, 'Please select a state');
	}

	if (osZipcode.val() === '' || !/^\d{5}(-\d{4})?$/.test(osZipcode.val())) {
		isValid = false;
		osZipcode.addClass('error-field');
		showErrorToolTip(osZipcode, 'Please enter a valid zip code');
	}

	return isValid;
};
function populateEstimateShipTax() {
	$('#estimate-state-val').val($('#osStateSelect').val());
	$('#estimate-zip-val').val($('#osZipcode').val());
	$('#estimate-country-val').val('US');
	$('#estimate-method-val').val($('#osShipResult').val());

};
function giftBoxEventsCart(element, isEdit) {
	if (isEdit) {
		$('#gift-box-to').val(element.data('giftboxto'));
		$('#gift-box-from').val(element.data('giftboxfrom'));
		$('#gift-box-message').val(element.data('giftboxmessage'));
	}

	$('#submit-gift-box').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		if ($.trim($('#gift-box-to').val()) == '') {
			$('#gift-box-to').addClass('error-field');
			showErrorToolTip($('#gift-box-to'), 'This field is required');
			return false;
		}
		if ($.trim($('#gift-box-from').val()) == '') {
			$('#gift-box-from').addClass('error-field');
			showErrorToolTip($('#gift-box-from'), 'This field is required');
			return false;
		}

		var formId = '#' + element.data('formid');
		var index = element.data('index');

		if (isEdit) {
			$('#bag-giftbox-to-edit_' + index).val($('#gift-box-to').val());
			$('#bag-giftbox-from-edit_' + index).val($('#gift-box-from').val());
			$('#bag-giftbox-message-edit_' + index).val($('#gift-box-message').val());
		} else {
			$('#bag-giftbox-to_' + index).val($('#gift-box-to').val());
			$('#bag-giftbox-from_' + index).val($('#gift-box-from').val());
			$('#bag-giftbox-message_' + index).val($('#gift-box-message').val());
		}

		var successCallBack = function(data){
			$('.dummy-modal').overlay().close();
			reloadOrderSummary(true);
		};
		var errorCallBack = function(data) {
			if (data.maxCartItems != null && data.maxCartItems) {
				showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
			} else {
				showPdpError($this, data.errors[0].message);
			}
		}
		var beforeSend = function() {
			$this.addClass('active-loading')
		}
		var completeCallBack = function() {$this.removeClass('active-loading');};
		ajaxFormSubmit($(formId), beforeSend, successCallBack, errorCallBack, completeCallBack);
		var shopRunnerDivHtml=$('#srEligibleBag').html();
		var commerceItemCount=$("#commerceItemCountForSR").val();
		setTimeout(function(){
		for(i=1;i<=commerceItemCount;i++)
		 {
			var id="srEligibleBagItem"+i;
			document.getElementById(id).innerHTML = shopRunnerDivHtml;
		 }
		},3000);
	});

	$('.no-gift-box').click(function(e) {
		e.preventDefault();
		$('.dummy-modal').overlay().close();
	});
};


function monogramEventsCart(element, isEdit) {
	var styleColorMap = null;
	try {
		styleColorMap = $.parseJSON($('#monogramColorMap').text());
	} catch(err){}
	initMonogram(isEdit, styleColorMap);
	if (isEdit) {
		var styleKey = "" + element.attr('data-stylekey');
		var colorKey = "" + element.attr('data-colorkey');
		var fontKey = "" + element.attr('data-fontkey');
		var inputText = "" + element.data('inputtext');

		$('#monogramStyle').val($('option[data-displayname="' + styleKey + '"]').val());
		$('#monogramStyle').change();
		$('#monogramColor').val($('option[data-displayname="' + colorKey + '"]').val());
		$('#monogramColor').change();
		$('#monogramFont').val($('option[data-displayname="' + fontKey + '"]').val());


		if (styleKey.indexOf('3') >= 0) {
			$('#monoFirstInitial').val(inputText.charAt(0));
			$('#monoLastInitial').val(inputText.charAt(2));
			$('#monoMiddleInitial').val(inputText.charAt(4)).keyup();
		} else {
			$('#monogramNameWord').val(inputText).keyup();
		}
	}

	$('.continue-with-monogram').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active-loading')) {
			return false;
		}
		var formId = '#' + element.data('formid');
		var index = element.data('index');

		var cont = validateMonogramInputs();
		if (cont) {
			var mskuId = getMonogramSku(styleColorMap);
			if(mskuId == null || mskuId == '') {
				showPdpError($('.continue-with-monogram'), 'Error adding monogram to your bag.');
				return false;
			}
			if (isEdit) {
				$('#bag-monogram-style-edit_' + index).val($('#monogramStyle option:selected').text());
				$('#bag-monogram-style-key-edit_' + index).val($('#monogramStyle').val());
				$('#bag-monogram-text-color-edit_' + index).val($('#monogramColor option:selected').text());
				$('#bag-monogram-text-style-edit_' + index).val($('#monogramFont option:selected').text());
				$('#bag-monogram-sku-edit_' + index).val(mskuId);
				var monogramInputText = getMonogramInputText();
				$('#bag-monogram-input-text-edit_' + index).val(monogramInputText);
			} else {
				$('#bag-monogram-style_' + index).val($('#monogramStyle option:selected').text());
				$('#bag-monogram-style-key_' + index).val($('#monogramStyle').val());
				$('#bag-monogram-text-color_' + index).val($('#monogramColor option:selected').text());
				$('#bag-monogram-text-style_' + index).val($('#monogramFont option:selected').text());
				$('#bag-monogram-sku_' + index).val(mskuId);
				var monogramInputText = getMonogramInputText();
				$('#bag-monogram-input-text_' + index).val(monogramInputText);
			}


			var successCallBack = function(data) {
				$('.dummy-modal').overlay().close();
				reloadOrderSummary(true);
			};
			var errorCallBack = function(data) {
				if (data.maxCartItems != null && data.maxCartItems) {
					showModal(null, null, '/modals/pdp/pdp-shopping-bag-full.jsp', null, 500, true, '30%', null, null);
				} else {
					showPdpError($this, data.errors[0].message);
				}
			}
			var beforeSend = function() {
				$this.addClass('active-loading')
			}
			var completeCallBack = function() {$this.removeClass('active-loading');};
			ajaxFormSubmit($(formId), beforeSend, successCallBack, errorCallBack, completeCallBack);
		} else {
			$this.removeClass('active-loading');
		}
	});

	$('.continue-without-monogram').click(function(e) {
		e.preventDefault();
		$('.dummy-modal').overlay().close();
	});
};

function addToWishlistFromLoginCart() {
	if(!$('.selected-bag-item-wishlist').length) {
		location.reload(true);
	} else {
		$('.no-display.wishlist-login-form').load('/xhr/pdp-wishlist-form.jsp?_=' + Math.random(), function() {
			var cont = false;
			var $this = $('.selected-bag-item-wishlist');

			$('#wishlist-product-id').val($this.attr('data-productid'));
			$('#wishlist-skuId').val($this.attr('data-skuid'));
			$('#wishlist-hemstyle').val($this.attr('data-hemstyle'));
			$('#wishlist-inseam').val($this.attr('data-inseam'));

			var closeFunction = function() {
				location.reload(true);
			}
			var successCallBack = function(data){
				location.reload(true);
			};
			var errorCallBack = function(data) {
				if (data.maxWlItems != null && data.maxWlItems) {
					showModal(null, null, '/modals/pdp/pdp-wishlist-bag-full.jsp', null, 500, true, '30%', null, closeFunction);
				} else {
					showPdpError($this, data.errors[0].message);
				}
			}
			var completeCallBack = function() {$('.move-item-to-wishlist').removeClass('selected-bag-item-wishlist')};
			ajaxFormSubmit($('#add-to-wishlist-form'), null, successCallBack, errorCallBack, completeCallBack);

		});
	}
};

function buildCommerceItemInputs(formObj, index) {
	$('.commerce-item-qty').each(function() {
		var ind = $(this).data('itemindex');
		if (ind != index) {
			var qty = $(this).data('qty');
			var ciId = $(this).data('cid');
			formObj.append('<input class="created-commerce-inputs" type="hidden" name="' + ciId + '" value="' + qty + '"/>');
		}
	});
};

function cartError(element, errMsg) {
	element.closest('li').append('<div class="error-tooltip-alt">' +
			'<p class="left">' + errMsg + '</p>' +
			'<img class="left" src="/static/img/tooltip-arrow-left.png" alt="" />' +
			'<span class="clear-break"></span>' +
			'</div>');
};

function cartErrorRight(element, errMsg) {
	element.closest('li').append('<div class="error-tooltip">' +
			'<p class="right">' + errMsg + '</p>' +
			'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
			'<span class="clear-break"></span>' +
			'</div>');

	element.parent().parent().find('.error-tooltip').css({
		left: ($('.empty-entire-bag').width() + 5)+'px',
		top: '-3px'
	}).find('img').css({
		'margin-top': '0'
	});
};

function showLoadingOverlay(elementContainer) {
	if(!elementContainer.hasClass('sb-loading-overlay')) {
		elementContainer.addClass('sb-loading-overlay');
		elementContainer.append('<div class="sb-loading-overlay-container">&nbsp;</div><img class="loading-spinner" src="/static/img/ajax-loader.gif" />');
	}
};

function removeLoadingOverlay(elementContainer) {
	elementContainer.find('.loading-spinner').remove();
	elementContainer.find('.sb-loading-overlay-container').fadeTo('slow', 1).remove();
	elementContainer.removeClass('sb-loading-overlay');
};

function reloadBagWishList() {
	showLoadingOverlay($('#sbWishlistHolder'));
	$('#sbWishlistHolder').load('/checkout/gadgets/bag/bag-wishlist.jsp?_=' + Math.random(), function() {
		removeLoadingOverlay($('#sbWishlistHolder'));
	});
};

function reloadCartItems() {
	showLoadingOverlay($('.sb-item-container'));

	$('.cart-items-container').load('/checkout/gadgets/bag/bag-items.jsp?_=' + Math.random(), function() {
		if (typeof scrollToWishList != 'undefined' && scrollToWishList) {
			scrollToElement($('#sbWishlistHolder'));
			scrollToWishList = false;
		}
		removeLoadingOverlay($('.sb-item-container'));
		removeLoadingOverlay($('.order-summary-container'));
		updateBagUtagData();

		if($('.sb-item-container').hasClass('no-items')) {
			$('.empty-entire-bag').hide();
		} else {
			$('.empty-entire-bag').show();
		}

	});
	$('.qualifier-container').load('/checkout/gadgets/bag/closeness-qualifier.jsp?_=' + Math.random());
};

//function to update utag_data values when the cart is updated via ajax
function updateBagUtagData() {
	var tpid = $('#tealProdId').val();
	if(typeof tpid != 'undefined' && tpid != '' && fireUtag) {
		try {
			utag.link(utag_data);
		} catch(err){}
		fireUtag=false;
	}
};

function reloadOrderSummary(reloadCart) {
	showLoadingOverlay($('.order-summary-container'));
	if ($('.checkout').length) {
		$('.order-summary-container').load('/checkout/gadgets/checkout-order-summary.jsp?_=' + Math.random(), function() {
			if (!reloadCart) {
				removeLoadingOverlay($('.order-summary-container'));
			}
			if (reloadCart) {
				reloadCartItems();
				updateShoppingBagCount();
			}
		});
	} else {
		$('.order-summary-container').load('/checkout/gadgets/bag/bag-order-summary.jsp?_=' + Math.random(), function() {
			if (!reloadCart) {
				removeLoadingOverlay($('.order-summary-container'));
			}
			if (reloadCart) {
				reloadCartItems();
				updateShoppingBagCount();
			}
		});
	}
};


/* ******************** CHECKOUT FUNCTIONS *************************** */
function reloadGiftCertificate() {
	showLoadingOverlay($('.gift-certificate-container'));
	$('.gift-certificate-container').load('/checkout/gadgets/payment-gift-certificate.jsp?_=' + Math.random(), function() {
		removeLoadingOverlay($('.gift-certificate-container'));
		removeLoadingOverlay($('.order-summary-container'));
		$('#paymentGCNumber').autotab({ format: 'alphanumeric' });
		$('#paymentGCAmount').autotab({ format: 'custom', pattern : '[^0-9\.]' });
	});
};

function reloadCheckoutOrderSummary(reloadGC, reloadPromo, reloadItems, isSelectShipping, reloadDelivery) {
	showLoadingOverlay($('.order-summary-container'));
	var param = '';
	if(isSelectShipping && $('#mainContentHolder').hasClass('is-international')) {
		param="isIntl=true&"
	}
	if($('body').hasClass('checkout-review'))
		param = 'reviewPage=true&';
	if(reloadGC) {
		param = 'reloadGc=true&';
	}
	$('.order-summary-container').load('/checkout/gadgets/checkout-order-summary.jsp?' + param + '_=' + Math.random(), function() {
		if (!reloadGC && !reloadPromo && !reloadItems) {
			removeLoadingOverlay($('.order-summary-container'));
		}
		if(reloadItems) {
			reloadReviewPage();
			updateShoppingBagCount();
		}
		if (reloadGC) {
			reloadGiftCertificate();
		}
		if(reloadPromo) {
			reloadPromoCode();
		}
		if(reloadDelivery) {
			reloadDeliveryOptions();
		}
	});
};

/* **************** MULTIPRODUCT FUNCTIONS ************** */

function multiSkuInit(element) {
	var priceHtml = element.closest('.msku-item').find('.style-selection:checked').closest('.formItem').find('.style-price').html();
	$('.multi-sku-modal-price').html(priceHtml);
	$('.tabs').tabs('.tab-content > div');
	$('.tip-trigger[title]').tooltip({ 'layout': '<div><img class="tt-arrow" src="/static/img/tip-trigger-arrow.png" alt="" /></div>' });
};

function populateMultiProductImg(colorId, indexElem, colorImageMapObj, styleColorsObj, initial) {
	if(colorImageMapObj[colorId] != null) {
		indexElem.find('.msku-img-holder img').attr('src', colorImageMapObj[colorId].defaultCanvasImage);
	}
	if(initial) {
		indexElem.find('.msku-item-color').text(indexElem.find('.color-selection option[value="' + colorId + '"]').text());
	}
};

function populateMultiProductPrice(styleColors, priceMap, container) {
	container.find('.style-item').each(function(ind, value) {
		var styleId = $(this).attr('data-styleid');
		var colorId = '';
		if($(this).find('.style-selection').is(':checked')) {
			colorId = container.find('.color-selection').val();
		}
		if(colorId == '') {
			colorId = styleColors[styleId][0].colorId;
		}
		var skuPriceMap = priceMap[colorId][styleId];
		priceHtml = getPriceHtml(skuPriceMap);
		$(this).find('.style-price').html(priceHtml);
	});
};

function checkAddToBag(element) {
	removePdpError($('.add-multi-sku-cart'));
	if (isItemValid(element, false) && element.find('.quantity-selection').val() == '0') {
		element.find('.quantity-selection').val('1');
	}
};

function isItemValid($this, checkQty, showErrors) {
	var checkQ = true;
	if(typeof checkQty == 'undefined' || checkQty == null) {
		checkQ = true;
	} else {
		checkQ = checkQty;
	}
	var errors = true;
	if(typeof showErrors == 'undefined' || showErrors == null) {
		errors = false;
	} else {
		errors = showErrors;
	}
	var isValid = true;
	if ($this.find('.size-selection').val() == '') {
		if(errors && $this.find('.quantity-selection').val() > 0) {
			var msg = 'Please select a size';
			showErrorToolTip($this.find('.size-selection'), msg);
			$this.find('.size-selection').addClass('error-field');
			isValid = false;
		}
		if(!errors)
			isValid = false;
	}
	if ($this.find('.hemstyle-selection').length && $this.find('.hemstyle-selection').val() == '') {
		if(errors && $this.find('.quantity-selection').val() > 0) {
			var msg = 'Please select a hem style';
			showErrorToolTip($this.find('.hemstyle-selection'), msg);
			$this.find('.hemstyle-selection').addClass('error-field');
			isValid = false;
		}
		if(!errors)
			isValid = false;
	}
	if ($this.find('.inseam-selection').length && $this.find('.hemstyle-selection').val().indexOf('Cuff') > -1 && $this.find('.inseam-selection').val() == '') {
		if(errors && $this.find('.quantity-selection').val() > 0) {
			var msg = 'Please select a inseam length';
			showErrorToolTip($this.find('.inseam-selection'), msg);
			$this.find('.inseam-selection').addClass('error-field');
			isValid = false;
		}
		if(!errors)
			isValid = false;
	}
	if ($this.find('.color-selection').val() == '') {
		if(errors && $this.find('.quantity-selection').val() > 0) {
			var msg = 'Please select a color';
			showErrorToolTip($this.find('.color-selection'), msg);
			$this.find('.color-selection').addClass('error-field');
			isValid = false;
		}
		if(!errors)
			isValid = false;
	}
	if ($this.find('.quantity-selection').val() == 0 && checkQ && !errors) {
		isValid = false;
	}
	return isValid;
};

function validateMultiProducts(element) {
	removeAllPdpErrors();
	var isValid = true;
	jQuery('.msku-item').each(function(index, value) {
		$this = $(this);
		if (!isItemValid($this, true, true)) {
			isValid = false;
			/*if ($this.find('.size-selection option:selected').hasClass('text-light')) {
				var size = $this.find('.size-selection option:selected').text();
				var temp = size.split('-');
				size = temp[0];
				var color = $this.find('.color-selection option:selected').text();
				var temp = color.split('-');
				color = temp[0];
				var msg = color + 'in Size ' + size + ' is no longer available. Please try a different color or size.';
				showErrorToolTip($this.find('.color-selection'), msg);
				$this.find('.size-selection').addClass('error-field');
				$this.find('.color-selection').addClass('error-field');
				isValid = false;
			}*/
		}
	});

	if (!isValid && $('.error-field').length) {
		scrollToElement($('.error-field').eq(0).closest('.msku-item'), 15);
	}
	return isValid;
};

function buildCartFormValuesMulti(styleSizeDriverArray) {
	var productIds = '';
	var skuIds = '';
	var quanties = '';
	var hemstyles = '';
	var inseams = '';

	jQuery('.msku-item').each(function(index, value) {
		$this = $(this);
		if (isItemValid($this, true)) {
			var skuId = getSkuFromSizeDriverObj($this.find('.style-selection:checked').val(), $this.find('.size-selection').val(), $this.find('.color-selection').val(), styleSizeDriverArray[index]);
			productIds += $this.attr('data-productid') + ',';
			skuIds += skuId + ',';
			quanties += $this.find('.quantity-selection').val() + ',';
			if($this.find('.hemstyle-selection').length) {
				hemstyles += $this.find('.hemstyle-selection option:selected').attr('data-hemstyle') + ',';
				if($this.find('.inseam-selection').length)
					inseams += $this.find('.inseam-selection').val() + ',';
			}
		}
	});

	$('#multi-productId').val(productIds);
	$('#multi-skuId').val(skuIds);
	$('#multi-quantity').val(quanties);
	$('#multi-hemstyle').val(hemstyles);
	$('#multi-inseam').val(inseams);

	return true;
};
/* ********** Store Locator validation **************************************** */
function initStoreLocator(){
	$('#headLocator input, #headLocator select').on('focus', function(){
		StoreLocator.RemoveErrorTooltips();
	});

	$('#utilityNav .button, #footLocatorHolder .button').on('click', function(e){
		e.preventDefault();
		StoreLocator.RemoveErrorTooltips();
		LocatorCheck.getInfo(this);
	});

	$('#storeLocatorZipSubmit').on('click', function(e){
		e.preventDefault();
		StoreLocator.RemoveErrorTooltips();
		StoreLocator.SearchByZip();
	});

	$('#storeLocatorCitySubmit').on('click', function(e){
		e.preventDefault();
		StoreLocator.RemoveErrorTooltips();
		StoreLocator.SearchByCity();
	});

	$('#Radius').on('change', function(e){
		e.preventDefault();
		StoreLocator.RadiusChanged();
	});

	$('#State_Province').on('change', function(e){
		e.preventDefault();
		StoreLocator.RemoveErrorTooltips();
	});
};

var LocatorCheck = {

	$btnClicked: '',
	$btnClickedId: '',
	$formItem: '',
	$inputField: '',
	$inputVal: '',
	$inputErrMsg: '',
	$selected: '',
	$selectId: '',
	$selectVal: '',
	$selectErrMsg: '',
	$searchType: '',

	getInfo: function(btn){
		LocatorCheck.$btnClicked = $(btn);
		LocatorCheck.$btnClickedId = LocatorCheck.$btnClicked.attr('id');
		LocatorCheck.$inputField = LocatorCheck.$btnClicked.siblings('input[type=text]');
		LocatorCheck.$inputVal = LocatorCheck.$inputField.val();
		LocatorCheck.$formItem = LocatorCheck.$btnClicked.parent();
		LocatorCheck.$inputErrMsg = LocatorCheck.$inputField.attr('data-error');
		LocatorCheck.$selected = LocatorCheck.$btnClicked.siblings('select');
		LocatorCheck.$selectId = LocatorCheck.$selected.attr('id');
		LocatorCheck.$selectVal = $('#' + LocatorCheck.$selectId + ' :selected').val();
		LocatorCheck.$selectErrMsg = LocatorCheck.$selected.attr('data-error');

		LocatorCheck.validateLocatorForm();
	},

	validateLocatorForm: function(){
		if(LocatorCheck.$btnClickedId == 'headLocatorZipSubmit' || LocatorCheck.$btnClickedId == 'locatorSubmit'){
			LocatorCheck.checkZipValidation();
		} else {
			LocatorCheck.checkStateValidation();
		}
	},

	checkZipValidation: function(){
		var isNumeric = /[^0-9]/g;
		var isCanadian = /[a-z][0-9][a-z](-| |)[0-9][a-z][0-9]/gi;

		if(LocatorCheck.$inputVal == '' || LocatorCheck.$inputVal.toLowerCase() == 'enter zip code' || (isNumeric.test(LocatorCheck.$inputVal) && !isCanadian.test(LocatorCheck.$inputVal))){
			LocatorCheck.$inputField.addClass('error-field');
			LocatorCheck.$formItem.append('<div class="error-tooltip">' +
				'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
				'<p class="left">' + LocatorCheck.$inputErrMsg + '</p>' +
				'<span class="clear-break"></span>' +
				'</div>');
		} else {
			window.location = '/storelocator/store_locator.jsp?PostalCode=' + LocatorCheck.$inputVal;
		}
	},

	checkStateValidation: function(){
		if(LocatorCheck.$selectVal.toLowerCase() == 'select one' && $('#headLocatorCity').val() == ''){
			LocatorCheck.$selected.addClass('error-field');
			$('#headLocatorCity').addClass('error-field');
			$('#headLocatorCity').parent().append('<div class="error-tooltip">' +
				'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
				'<p class="left">' + LocatorCheck.$selectErrMsg + '</p>' +
				'<span class="clear-break"></span>' +
				'</div>');
		} else if(LocatorCheck.$selectVal.toLowerCase() == 'select one' && $('#headLocatorCity').val() != ''){
			LocatorCheck.$selected.addClass('error-field');
			LocatorCheck.$formItem.append('<div class="error-tooltip">' +
				'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
				'<p class="left">Please select a State or Province.</p>' +
				'<span class="clear-break"></span>' +
				'</div>');
		} else if(LocatorCheck.$selectVal.toLowerCase() != 'select one' && $('#headLocatorCity').val() == ''){
			$('#headLocatorCity').addClass('error-field');
			$('#headLocatorCity').parent().append('<div class="error-tooltip">' +
				'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
				'<p class="left">Please enter a city.</p>' +
				'<span class="clear-break"></span>' +
				'</div>');
		} else {
			window.location = '/storelocator/store_locator.jsp?FooterTxtCity=' + $('#headLocatorCity').val() + '&FooterState_Province=' + LocatorCheck.$selectVal;
		}
	}
};

//validate email signup form in footer
function signupEmailValidate(){
	var email = $('#signupEmail').val().toLowerCase();
	var regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

	if(email == '' || !email.match(regex)){
		$('#signupEmail').addClass('error-field');
		$('#signupEmail').parent().append('<div class="error-tooltip clearfix">' +
				'<img class="left" src="/static/img/tooltip-arrow.png" alt="" />' +
				'<p class="left">Please enter a valid email.</p></div>');
	} else {
		showEmailSubscriptionModal(email);
	}
};

//submit footer email signup
function submitEmailSignup() {
	var emailAddressField = $('#signupEmailAddress');
	var verifyAddressField = $('#signupEmailVerifyEmail');
	var signUpForm = $('#emailSubscribeForm');
	var completeFunction = function() {
		if ($('.overlay-modal').is(':visible')) {
			$('.close.ir').click();
		}
		showModal(null, null, '/modals/email-signup/email-signup-thanks.jsp', null, 740, true, '10%', null, null);
	}

	if (verifyAddressField.val() != '' && verifyAddressField.val() != emailAddressField.val()) {
		$('#matchEmailMsg').removeClass('no-display');
	} else if (verifyAddressField.val() === '' || emailAddressField.val() === '') {
		$('#matchEmailMsg').addClass('no-display');
		return;
	} else {
		ajaxFormSubmit(signUpForm, null, null, null, completeFunction, true);
	}

}

function showEmailSubscriptionModal(email) {
	var content = '<iframe width="968" scrolling="auto" height="548" frameborder="0" align="middle" name="fbContent" src="//pages.em.eddiebauer.com/EddieBauerEmailSignUp?AFFILIATE_ID=225355676&amp;emailInputID='+email+'&amp;email='+email +'" title=""></iframe>';
	showModal(null, null, null, null, 968, true, '15%', null, null, content);
};

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

//open the video modal
function openYouTubeVideoModal(video, fa){
	var videoModal = function() {getModalVideo(video, fa)};
		showModal(null, null, '/modals/video/youtube-base-video.jsp', null, 700, true, '10%', videoModal, null);
}

//embed the video and show the correct logo
function getModalVideo(video, fa){
	//checks for First Ascent logo need
	if(fa == true){
		$('.vid-logo img').attr('src', '/static/img/logo-video-fa.png');
		$('.vid-logo img').show();
	} else{
		$('.vid-logo img').show();
	}

	//embed youtube video
	$('#videoHolder').addClass('loading-icon');
	$('#videoHolder').html('<object width="640" height="385">' +
			'<param name="movie" value="http://www.youtube.com/v/' + video + '?hl=en_US&amp;version=3"></param>' +
			'<param name="allowFullScreen" value="true"></param>' +
			'<param name="allowscriptaccess" value="always"></param>' +
			'<embed src="http://www.youtube.com/v/' + video + '?hl=en_US&amp;version=3" type="application/x-shockwave-flash" width="640" height="385" allowscriptaccess="always" allowfullscreen="true"></embed>' +
			'</object>');
	if($('#videoHolder').html() != ''){
		$('#videoHolder').removeClass('loading-icon');
	}

}

//shows e-gift card Employee discount field and links
function egcAssociateToggle(egcLink){
	$('.egc-associate-content').slideToggle('fast');
	$(egcLink).parent().removeClass('egc-active').siblings().addClass('egc-active');
}

function repositionModalForIpad() {
	try {
		$('.overlay-modal').each(function() {
			var $this = $(this);
			var top = $this.data('top').replace(/\D/g,'');
			var leftposition = 0;
			var modalWidth = $this.width();
			var screenWidth = $(window).width();
			if(modalWidth > screenWidth) {
				leftposition = 10;
			} else {
				leftposition = (screenWidth - modalWidth) / 2;
				if(leftposition < 10)
					leftposition = 10;
			}

			var topposition = 0;
			var t1 = $(window).height() * (top/100);
			var t2 = $('html').offset().top * -1;
			topposition = t1 + t2;

			$this.css('left', leftposition + 'px').css('top', topposition + 'px');
		});
	} catch(err){}
}

function activeLink(){
	var links = $(".side-nav #refineHolder .main .nav-list a");

	$(".side-nav #refineHolder .main .nav-list").on("click", "a", function(){
		for(var i = 0; i < links.length; i++){
			var link = links[i];
			$(link).removeClass("active");
		}

		$(this).addClass("active");
	});
	if($('.current-cat').length > 0){
		var currentCat = $('.current-cat').text();
		$(".side-nav #refineHolder .main .nav-list li").each(function(){
			if($(this).find('.category').text() == currentCat){
				$(this).find('a').addClass('active');
			}
		});
	}
}

activeLink();


/*
Since a style in the main page overrides the style from the imported style sheet,
the following is needed to override the style in the main page. I know the main page
comes from /gadgets/home.jsp and /includes/meta-details.jsp, but don't know exactly
where the styles embedded in the main page come from. This script is needed to correctly
align an icon for the sports shop item in the menu at the top. However, the following is
overridden by styles embedded in some other pages, so embedded styles for flyout-sportshop
should be removed by those who own and control the html that gets generated for each page,
and then the following should be removed. This is a temporary hack.
*/
$("#flyout-sportshop").css({"right": "200px"});


$("#returnGuaranteeHolder").on("click", "a.tip-trigger", function(e){
	var href = $(this).attr("href");

	if((href === "/custserv/customer-service-our-guarantee.jsp") ||
	(href === "/custserv/customer-service-returns-and-exchanges.jsp")){
			e.preventDefault();
	}
});
// Shipping modal
function modalInit(){
	//set up country toolTips
	jQuery('.Tooltip').mouseenter(function(){
		var $this = jQuery(this);
		var $position = $this.position();
		var $width = $this.find('.link').width();
		var $height = $this.find('.link').height();
		var $country = $this.attr('data-country');
		var imageURL = "/static/img/customer-service/shipping/"+$country+".png";
		var toolTipOffset = 0;
		var countryDiv = "<div class='countryList' style='position:absolute; z-index:99999; top:" + parseInt($position.top + $height+3) + "px; left:" + parseInt(toolTipOffset) + "px;'><img src='" + imageURL + "' class='countries'/></div>";
		jQuery(countryDiv).appendTo($this);
		$this.addClass('hover');
	}).mouseleave(function(){
		var $this = jQuery(this);
		$this.removeClass('hover');
		jQuery('.countryList').remove();
	});
	// create function for Email Us Here
	jQuery('.email').live('click', function(e){
		e.preventDefault();
		url ="/custserv/ask-eddie-email.jsp";
		window.location = url;
	});
	function emailLink(){
		url ="/custserv/ask-eddie-email.jsp";
		window.location = url;
	}
}


//get a cookie by name
if (typeof String.prototype.trimLeft !== "function") {
	String.prototype.trimLeft = function() {
		return this.replace(/^\s+/, "");
	};
}
if (typeof String.prototype.trimRight !== "function") {
	String.prototype.trimRight = function() {
		return this.replace(/\s+$/, "");
	};
}
if (typeof Array.prototype.map !== "function") {
	Array.prototype.map = function(callback, thisArg) {
		for (var i=0, n=this.length, a=[]; i<n; i++) {
			if (i in this) a[i] = callback.call(thisArg, this[i]);
		}
		return a;
	};
}
function getCookies() {
	var c = document.cookie, v = 0, cookies = {};
	if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
		c = RegExp.$1;
		v = 1;
	}
	if (v === 0) {
		c.split(/[,;]/).map(function(cookie) {
			var parts = cookie.split(/=/, 2),
				name = decodeURIComponent(parts[0].trimLeft()),
				value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
			cookies[name] = value;
		});
	} else {
		c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
			var name = $0,
				value = $1.charAt(0) === '"'
						? $1.substr(1, -1).replace(/\\(.)/g, "$1")
						: $1;
			cookies[name] = value;
		});
	}
	return cookies;
}
function getCookie(name) {
	return getCookies()[name];
}

function formatTwoDigits(n){
	return n > 9 ? "" + n: "0" + n;
}
function GetQueryString( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)",
		regex = new RegExp( regexS ),
		results = regex.exec( window.location.href );
	if( results == null ){
		return "";
	} else{
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
};

function getDate(date) {
	var y = date.substr(0,4),
	m = date.substr(4,2),
	d = date.substr(6,2),
	h = date.substr(8,2),
	mm = date.substr(10,2);

	return new Date(y,m,d,h,mm);
}
//get url parameters
function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam){
			return sParameterName[1];
		}
	}
};
