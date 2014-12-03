
// Set the utag_data JSON Object from the fully constructed JSON
var utag_data = [];

var tag_mgmt = function() {
	return {
		account		: "pcrg",
		is_touch	: (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)),
		is_mobile	: (window.location.host.search(/^m./) != -1 || window.location.host.search('.bbhosted.') != -1),
		environment	: (window.location.href.search('www.') != -1) ? 'prod' : 'dev',
		carousel_pos	: false,
		initialized	: false,
		//debug_mode	: (window.location.href.search('-rev') != -1),
		debug_mode	: false,
		udo_json	: {},
		ml_udo_json	: {},
		last_udo_json	: {},

		// Mapping of "link_position" / "event_type" combinations passed into this.trackAnayticsAction ==> Omniture Events
		omni_event_xwalk : {
			'header'		: {	"modal" 	:	10,
							"hover" 	:	11,
							"account"	:	12,
							"view_edit"	:	17,
							"save"		:	18,
							"checkout"	:	19
						  },
			'footer'		: {	"email" 	:	1,
							"social" 	:	2
						  },
			'my account'		: {	"click" 	:	12
						  },
			'banner'		: {	"click"		:	20,
							"hover"		:	15
						  },
			'gateway'		: {	"click"		:	37
						  },
			'directory'		: {},
			'search'		: {	"qs"		: 	3,
							"term"		:	4,
							"autosuggest"	:	5,
							"facet"		:	8
						  },
			'auto_suggest'		: {	"selected"	:	27
						  },
			'quickshop'		: {	"click"		:	3
						  },
			'carousel'		: {	"click"		:	9,
							"hover"		:	21
						  },
			'print'			: {	"click"		:	37
						  },
			'basket'		: {	"stateCode"	:	23,
							"shipMethod"	:	24,
							"continue"	:	25,
							"update"	:	26,
							"print"		:	27,
							"save"		:	28,
							"apply"		:	29,
							"remove"	:	22,
							"checkout"	:	30,
							"paypal"	:	31
						  },
			'checkout'		: {	"apply"		:	29,
							"remove"	:	22,
							"sign_in"	:	12,
							"guest"		:	89,
							"register"	:	90,
							"password"	:	91,
							"opt_out"	:	92,
							"new_addr"	:	93,
							"gift"		:	65,
							"paypal"	:	31,
							"place_order"	:	68
						  },
			'thank_you'		: {	"register"	:	90,
							"no_register"	:	99,
							"print"		:	76,
							"continue"	:	25

						}
		},

		trackLink : function (event, layout_section, layout_detail) {
			var event_type    = (event.type == "mouseover" || event.type == "touchstart") ? "hover" : "click";
			layout_detail = (layout_detail === false) ? "" : layout_detail;

			layout_detail    += event.currentTarget.alt;

			this.trackAnayticsAction(event, layout_section, layout_detail, event_type);
		},

		trackHover : function (elm, layout_section, layout_detail) {
			if (this.is_touch) {
				elm.ontouchstart =
					function (event, layout_section) {
						tag_mgmt.trackLink(event, layout_section, layout_detail);
					};
			} else {
				elm.onmouseover =
					function (event, layout_section) {
						tag_mgmt.trackLink(event, layout_section,layout_detail);
					};
			}
		},

		trackAnayticsAction : function (event, link_position, link_detail, event_type) {
			if (this.initialized === true) {
				var log_txt = '';

				var original_link_position = link_position;
				var original_link_detail   = link_detail;

				link_position         = link_position.replace(/\+/g, ' ');
				link_detail           = link_detail.replace(/\+/g, ' ');

				var page_name        = "s.pagename + '|" + link_position + ":" + link_detail + "'";

				// Map Analytics Specific Tracking Vars Too
				var traffic_mod      = (event.type == "mouseover" || event.type == "touchstart") ? "11" : "10";
				var traffic_property = "prop"  + traffic_mod;
				var traffic_var      = "eVar"  + traffic_mod;

				// fire Omniture specific tracking rules
				var link_json      = {	link_position : link_position,
							link_detail   : link_detail
						     }
				link_json[traffic_property] = page_name;
				link_json[traffic_var]      = page_name;
				link_json['prop23']         = this.udo_json['page_type'] + ":" + this.udo_json['page_id'] + '|' + link_position;
				link_json['eVar23']         = this.udo_json['page_type'] + ":" + this.udo_json['page_id'] + '|' + link_position;

				log_txt  = "\nCoded JS Event:\ntag_mgmt.trackAnayticsAction(event, '" + original_link_position + "', '" + original_link_detail + "', '" + event_type + "');";
				log_txt += "\n\nTealium JS Call Made:";

				var link_mod    = link_position.split(":")[0].toLowerCase();
				var link_func   = "utag.link({";
				if (this.omni_event_xwalk[link_mod] && this.omni_event_xwalk[link_mod][event_type]) {
					link_json['events'] = "event" + this.omni_event_xwalk[link_mod][event_type];

					link_func      += "linkTrackVars : \"" + traffic_property + "," + traffic_var + ",prop23,eVar23,events\"";
					link_func      += ", linkTrackEvents  : \"" + link_json['events'] + "\"";
				} else {
					link_func      += "linkTrackVars : \"" + traffic_property + "," + traffic_var + ",prop23,eVar23\"";
				}
				link_func      += ", link_position : \"" + link_position + "\"";
				link_func      += ", link_detail : \"" + link_detail + "\"";

				link_func      += "});";

				log_txt += "\n" + link_func;
				log_txt += "\n\n" + "Expected Omniture JS via Tealium:\n";
				log_txt += "s." + traffic_property + " = " + link_json[traffic_property] + ";\n";
				log_txt += "s." +  traffic_var + " = " + link_json[traffic_var] + ";\n";

				// Is there Custom Event Tracking needed for this call?
				if (this.omni_event_xwalk[link_mod] && this.omni_event_xwalk[link_mod][event_type]) {
					log_txt += "s.events" + ' = "' + link_json['events'] + '"\n';
				}

				log_txt += "s.prop23 = " + link_json['prop23'] + ";\n";
				log_txt += "s.eVar23 = " + link_json['eVar23'] + ";\n";
				log_txt += "s.tl(event.currentTarget, 'O', '|" + link_position + ':' + link_detail + "');";

				if (this.debug_mode === true) {
					if (window.console) {
						//console.clear();
						console.log(log_txt);
					} else {
						alert(log_txt);
					}
				}

				eval(link_func);
			}
		},

		setProductIdView : function () {
			try {
				this.udo_json['product_id_view'] = this.udo_json['page_id'].replace(/ QS/i, '');

				if (this.udo_json['page_type']) {
					switch (this.udo_json['page_type'].toUpperCase()) {
						case 'BASKET':
						case 'PRINTABLE BASKET':
						case 'ORDER CONFIRMATION':
							this.udo_json['product_id_view'] = this.udo_json['product_id'];
							break;
					}
				} else if (window.location.href.search('multiProductAddToBasket.do') != -1){
					//  Page Type missing on Multi-Product Modals
					this.udo_json['page_type'] = 'Multi-Product Modal';
					this.udo_json['product_id_view'] = this.getUrlParam('productCodes').split(',');
				}
			} catch(err) {
			}
		},

		initializeAnalytics : function () {
			if (!this.udo_json['site_name']) {
				if (window.console) {
					console.log('Tag Mgmt Initialization Failed: No Site Name');
				}

				return false;
			}

			this.ml_udo_json = this.udo_json;

			if (window.location.href.search('accordioncheckout.do') != -1) {
				this.updateCheckoutState(1);
			}

			this.setProductIdView();

			if (this.udo_json['site_name'] && this.is_mobile) {
				this.udo_json['site_name'] += 'M';
			}

			this.getUdoCookie();

			this.udo_json['user_agent'] = navigator.userAgent;
			this.setUdoFromCookie('JSESSIONID', 'jsession_id');
			this.setUdoFromCookie('kioskid', 'kiosk_id');
			this.setUdoFromCookie('basket', 'basket_id');
			this.setUdoFromCookie('customer', 'customer_id');

			this.udo_json['jvm'] = this.udo_json['jsession_id'].split('.')[1];

			if (this.debug_mode === true && window.console) {
				console.log(	  "tag_mgmt.udo_json['user_agent'] = " + this.udo_json['user_agent'] + "\n"
						+ "tag_mgmt.udo_json['jsession_id'] = " + this.udo_json['jsession_id'] + "\n"
						+ "tag_mgmt.udo_json['kiosk_id'] = " + this.udo_json['kiosk_id'] + "\n"
						+ "tag_mgmt.udo_json['basket_id'] = " + this.udo_json['basket_id'] + "\n"
						+ "tag_mgmt.udo_json['customer_id'] = " + this.udo_json['customer_id'] + "\n"
						+ "tag_mgmt.udo_json['basket_cnt'] = " + this.udo_json['basket_cnt']
				);
			}

			this.setConcatenatedPageName();

			window.utag_data = this.udo_json;
/*
			for (var field in this.udo_json) {
				window.utag_data[field] = this.udo_json[field];
			}
*/
			var js   = document.createElement('script');
			js.src   = '//tags.tiqcdn.com/utag/' + this.account + '/' + this.udo_json['site_name'].toLowerCase() + '/' + this.environment + '/utag.js';
			js.type  = 'text/javascript';
			js.async = true;

			var script = document.getElementsByTagName('script')[0];
			script.parentNode.insertBefore(js, script);

			this.initialized = true;

			switch (this.udo_json['page_type']) {
				case 'Video':
					try {
						utag.link({
							media_type:		'open',
							media_name:		this.udo_json['page_name'],
							media_player_name:	'swfobject'
						});

						utag.link({
							media_type:	'play',
							media_offset:	0
						});
					} catch (err) {
					}
					break;
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log('tag_mgmt.initialized = true;');
			}

			if (this.is_mobile === false) {
				try {
					// ML Value Fixes
					if (this.udo_json.page_id == "Locate Store" && $$('#eslSearchInput1')[0]) {
						$$('#eslSearchInput1')[0].type = 'text';
					}

					// Add Global Header / Footer Tags
					this.tagGlobalHeader();
					this.tagSeoLinks();
					this.tagGlobalFooter();

					if (this.debug_mode === true && window.console) {
						if (!document.all) {
							console.timeStamp();
						}
						console.log('tag_mgmt.initializeAnalytics  :: Block 1');
					}

					// Add In House Tags
					this.tagInHouseHtml();

					if (this.debug_mode === true && window.console) {
						if (!document.all) {
							console.timeStamp();
						}
						console.log('tag_mgmt.initializeAnalytics  :: Block 2');
					}

					// Add iFrame Tags
					this.tagGlobalBanner();
					this.tagNavBanner();

					if (this.debug_mode === true && window.console) {
						if (!document.all) {
							console.timeStamp();
						}
						console.log('tag_mgmt.initializeAnalytics  :: Block 3');
					}

					// Add Ajax Tags
					this.tagMyAccount();

					if (this.debug_mode === true && window.console) {
						if (!document.all) {
							console.timeStamp();
						}
						console.log('tag_mgmt.initializeAnalytics  :: Block 4');
					}

					switch (this.udo_json['page_type'].toUpperCase()) {
						case 'FAMILY':
							this.tagCarousel();
							this.tagFamilyPage();

							// Hide Select Jump Links
							var jump_lnk = document.querySelectorAll('div#jumptolinks a');
							if (jump_lnk && window.location.href.search(/balloons\.do/i) == -1) {
								for (var i = 0; i < jump_lnk.length; i ++) {
									console.log(jump_lnk[i].href.match(/#.+/)[0]);
									switch (decodeURIComponent(jump_lnk[i].href.match(/#.+/)[0])) {
										case '#Solid Color Balloons':
										case '#Balloon Accessories':
										case '#Accessories':
										case '#Favor Containers':
											jump_lnk[i].parentNode.style.display = 'none';
											break;
									}
								}
							}
							break;
						case 'DIRECTORY':
							this.tagLeftNav();
							this.tagDirectoryBanner();
							this.tagDirectory();
							break
						case 'GATEWAY':
							this.tagLeftNav();
							break;
						case 'SEARCH RESULTS':
							this.tagSearchResults();
							this.tagDirectory();
							break;
						case 'PDP':
							this.tagCarousel();
							this.tagPDP();

							setReviewsToggle();
							break;
						case 'BASKET':
							this.tagBasket();
							break;
						case 'ORDER CONFIRMATION':
							this.tagThankYou();
							break;
						case 'PARTY IDEAS':
							this.tagPartyIdeas();
							break;
						case 'ARTICLE':
							this.tagArticle();
							break;
						case 'GALLERY':
							this.tagGallery();
							break;
						case 'GUIDE':
							this.tagGuide();
							break;
						case 'SINGLE FILLSLOT':
							this.tagSingleFillslot();
							break;
					}

					if (this.debug_mode === true && window.console) {
						if (!document.all) {
							console.timeStamp();
						}
						console.log('tag_mgmt.initializeAnalytics  :: Block 5 :: ' + this.udo_json['page_type']);
					}

					// Save UDO for last page viewed to cookie
					this.setUdoCookie();
				} catch (err) {
					if (window.console) {
						console.log(err);
					}
				}
			}
		},

		reinitializeAnalytics : function () {
			try {
				this.setConcatenatedPageName();

				utag.view(this.udo_json);
			} catch (err) {
				if (window.console) {
					console.log(err);
				}
			}
		},

		setDebugActions : function () {
			jQuery($$('a[href]]')).attr('href', 'javascript:');
			jQuery($$('area[href]]')).attr('href', 'javascript:');
			jQuery($$('form')).attr('target', '_blank');
			jQuery($$('input[type="button"]')).attr('onclick', null);

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log('tag_mgmt.setDebugActions = true;');
			}
		},

		updateCheckoutState : function (step) {
			try {
				// ML Value Fixes
				//if (navigator.userAgent.match(/Mac OS X.*Safari/i) && $$('#postalCode')) {
				if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0 && $$('#postalCode')) {
					$$('#postalCode')[0].type = "text";
				}

				switch (step) {
					case 1:
						if ($$('input[alt="Apply Button"]')[0]) {
							this.udo_json['page_id'] = 'Single Page Checkout';
							this.udo_json['page_type'] = 'Checkout';
							this.udo_json['page_section_name'] = 'Checkout';
							this.udo_json['page_category_name'] = 'Checkout';

							this.udo_json['page_name'] = 'Step 1:Sign In';

							if ($$('input[alt="Apply Button"]')[0]) {
								jQuery($$('input[alt="Apply Button"]')[0]).bind('click',
									function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Apply Source Code:' + this.value, 'apply');
									}
								);
							}

							if ($$('input[alt="Remove Button"]')[0]) {
								jQuery($$('input[alt="Remove Button"]')[0]).bind('click',
									function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Remove Source Code:' + this.value, 'remove');
									}
								);
							}

							if ($$('#registeredUserContinue')[0]) {
								jQuery($$('#registeredUserContinue')[0]).bind('click',
									function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Sign In', 'sign_in');
									}
								);
							}

							if ($$('#guestUserContinue')[0]) {
								jQuery($$('#guestUserContinue')[0]).bind('click',
									function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Guest Checkout', 'guest');
									}
								);
							}

							if ($$('#guestUserRegister')[0]) {
								jQuery($$('#guestUserRegister')[0]).bind('click',
									function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Register', 'register');
									}
								);
							}

							if ($$('#loginForm a')[0]) {
								jQuery($$('#loginForm a')[0]).bind('click',
									function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Forgot Password', 'password');
									}
								);
							}
						} else {
							window.setTimeout("tag_mgmt.updateCheckoutState(1)", .5 * 1000);
						}

						break;
					case 2:
						this.udo_json['page_id'] = 'Single Page Checkout:Billing';
						this.udo_json['page_name'] = 'Step 2:Billing';

						this.reinitializeAnalytics();

						if ($$('[name="emailSignup"]')[0]) {
							jQuery($$('[name="emailSignup"]')[0]).bind('click',
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Email Opt Out', 'opt_out');
								}
							);
						}

						if ($$('[name="strTaxID"]')[0]) {
							jQuery($$('[name="strTaxID"]')[0]).bind('blur',
								function (event) {
									tag_mgmt.udo_json['tax_exempt'] = this.value;

									utag.view({tax_exempt : tag_mgmt.udo_json['tax_exempt']});
								}
							);
						}
						break;
					case 3:
						this.udo_json['page_id'] = 'Single Page Checkout:Shipping';
						this.udo_json['page_name'] = 'Step 3:Shipping';

						this.reinitializeAnalytics();

						if ($$('[name="modtype"]')[0]) {
							jQuery($$('[name="modtype"]')[0]).bind('click',
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Gift Services', 'gift');
								}
							);
						}
						break;
					case 4:
						this.udo_json['page_id'] = 'Single Page Checkout:Payment';
						this.udo_json['page_name'] = 'Step 4:Payment';

						this.reinitializeAnalytics();

						if ($$('#btnContinuePaymentForm')[0]) {
							jQuery($$('#btnContinuePaymentForm')[0]).bind('click',
								function (event) {
									if ($$('[name="paypalCheckoutSelected"][value="YES"]')[0].checked) {
										tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Paypal', 'paypal');
									}
								}
							);
						}
						break;
					case 5:
						this.udo_json['page_id'] = 'Single Page Checkout:Confirm';
						this.udo_json['page_name'] = 'Step 5:Confirm';

						this.reinitializeAnalytics();

						if ($$('#btnSubmitOrder')[0]) {
							jQuery($$('#btnSubmitOrder')[0]).bind('click',
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Checkout', 'Place Order', 'place_order');
								}
							);
						}
						break;
				}

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("tag_mgmt.updateCheckoutState(" + step + ")");
				}
			} catch (err) {
			}
		},

		tagPartyIdeas : function () {
			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagPartyIdeas()");
			}
		},

		tagArticle : function () {
			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagArticle()");
			}
		},

		tagGallery : function () {
			var slide = $$('#carousel_items li');
			if (slide) {
				for (var i = 0; i < slide.length; i ++) {
					jQuery(slide[i]).bind('click',
						{i: i},
						function (event) {
							tag_mgmt.trackAnayticsAction(event, 'Gallery', 'Slide:' + event.data.i, 'click');
						}
					);
				}
			}

			if ($$('.featuredPartyLink')) {
				jQuery($$('.featuredPartyLink')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Gallery', 'Featured Party:' + tag_mgmt.trim(this.textContent), 'click');
					}
				);
			}

			var more = $$('.moreIdeaBody a');
			if (more) {
				for (var i = 0; i < more.length; i ++) {
					jQuery(more[i]).bind('click',
						{i: i},
						function (event) {
							tag_mgmt.trackAnayticsAction(event, 'Gallery', 'More Ideas:Image ' + event.data.i + ':' + tag_mgmt.trim($$('.moreIdeaBodyText a')[event.data.i].textContent), 'click');
						}
					);
				}
			}

			more = $$('.moreIdeaBodyText a');
			if (more) {
				for (var i = 0; i < more.length; i ++) {
					jQuery(more[i]).bind('click',
						{i: i},
						function (event) {
							tag_mgmt.trackAnayticsAction(event, 'Gallery', 'More Ideas:Name ' + event.data.i + ':' + tag_mgmt.trim(this.textContent), 'click');
						}
					);
				}
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagGallery()");
			}
		},

		tagGuide : function () {
			if ($$('.jump-link')) {
				jQuery($$('.jump-link')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Guide', 'Jump:' + tag_mgmt.trim(this.textContent), 'click');
					}
				);
			}

			if ($$('#guides-jump-back a')) {
				jQuery($$('#guides-jump-back a')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Guide', 'Shop:' + tag_mgmt.trim(this.textContent), 'click');
					}
				);
			}

			var show_mode = $$('.show_more a');
			if (show_mode) {
				for (var i = 0; i < show_mode.length; i ++) {
					jQuery(show_mode[i]).bind('click',
						{i: i},
						function (event) {
							if (this.querySelector('img').alt == "Close More") {
								tag_mgmt.trackAnayticsAction(event, 'Guide', 'Close Section:' + tag_mgmt.trim($$('.jump-link')[event.data.i].textContent), 'click');
							} else {
								tag_mgmt.trackAnayticsAction(event, 'Guide', 'Click for Ideas:' + tag_mgmt.trim($$('.jump-link')[event.data.i].textContent), 'click');
							}
						}
					);
				}
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagGuide()");
			}
		},

		tagSingleFillslot : function () {
			// Has to happen by coding team

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagSingleFillslot()");
			}
		},

		tagThankYou : function () {
			if ($$('img[alt="Save My Information"]')[0]) {
				jQuery($$('img[alt="Save My Information"]')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Thank You', 'Register:Save My Information', 'register');
					}
				);
			}

			if ($$('img[alt="No Thank You"]')[0]) {
				jQuery($$('img[alt="No Thank You"]')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Thank You', 'Register:No Thank You', 'no_register');
					}
				);
			}

			if ($$('img[alt="Print Receipt"]')[0]) {
				jQuery($$('img[alt="Print Receipt"]')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Thank You', 'Print Receipt', 'print');
					}
				);
			}

			if ($$('img[alt="Continue Shopping"]')[0]) {
				jQuery($$('img[alt="Continue Shopping"]')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Thank You', 'Continue Shopping', 'continue');
					}
				);
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagThankYou()");
			}
		},

		tagBasket : function () {
			if ($$('.ETSBox select')) {
				jQuery($$('.ETSBox select')).bind('change',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Estimate Tax and Ship', this.name);
					}
				);
			}

			if ($$('img[alt="Continue Shopping"]')[0]) {
				jQuery(jQuery($$('img[alt="Continue Shopping"]')[0]).parent()[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Continue Shopping', 'continue');
					}
				);
			}

			if ($$('.basketMainButtons')[0]) {
				jQuery($$('.basketMainButtons')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Update Cart', 'update');
					}
				);
			}

			if ($$('.basket_print')[0]) {
				jQuery($$('.basket_print')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Print Basket', 'print');
					}
				);
			}

			if ($$('#printSaveBasket a')[0]) {
				jQuery($$('#printSaveBasket a')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Save Basket', 'save');
					}
				);
			}
/*
			// REMOVE THIS BLOCK OF CODE ON 2/18/2014
			if ($$('#sourceCode')[0]) {
				$$('#sourceCode')[0].autocomplete = 'off';
				jQuery($$('#sourceCode')[0]).bind('keyup',
					function (event) {
						if (this.value.toUpperCase() == "PCK3U") {
							this.value = "FREESHIPPING";
						}
					}
				);
			}
*/
			if ($$('input[alt="Apply Button"]')[0]) {
				jQuery($$('input[alt="Apply Button"]')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Apply Source Code:' + this.value, 'apply');
					}
				);
			}

			if ($$('input[alt="Remove Button"]')[0]) {
				jQuery($$('input[alt="Remove Button"]')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Remove Source Code:' + this.value, 'remove');
					}
				);
			}

			if ($$('input[alt="Checkout With Paypal"]')[0]) {
				jQuery($$('input[alt="Checkout With Paypal]')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Remove Source Code:' + this.value, 'paypal');
					}
				);
			}

			if ($$('#chk_btn')[0]) {
				jQuery($$('#chk_btn')[0]).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Basket', 'Checkout', 'checkout');
					}
				);
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagBasket();");
			}
		},

		tagPDP : function () {
			if ($$('#detailNew')[0]) {
				switch ($$('#detailNew')[0].nodeName) {
					case 'DIV':
						var template = 'PDP';

						// Size Chart
						if ($$('#sizeChart a')) {
							jQuery($$('#sizeChart a')).bind('click',
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Size Chart', '', 'click');
								}
							);
						}

						// Info Tabs
						var tab = $$('#tab_01, #tab_02, #tab_03');
						if (tab) {
							for (var i = 0; i < tab.length; i ++) {
								jQuery($$('#tab_01, #tab_02, #tab_03')).bind('click',
									{i: i},
									function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Info Tab: Pos ' + event.data.i, tag_mgmt.trim($(this).querySelector('div').textContent), 'click');
									}
								);
							}
						}
						break;
					case 'TABLE':
						var template = 'Couples';

						var tab = $$('#crossSellTab li');
						if (tab) {
							for (var i = 0; i < tab.length; i ++) {
								jQuery(tab[i]).bind('click',
									{i: i},
									function (event) {
										tag_mgmt.trackAnayticsAction(event, 'XSELL Tab:Pos ' + event.data.i, tag_mgmt.trim($(this).textContent), 'click');
									}
								);
							}
						}
						break;
				}

				//this.tagAffinity();;

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("tag_mgmt.tagPDP();");
				}
			} else {
				window.setTimeout("tag_mgmt.tagPDP()", .5 * 1000);
			}
		},

		tagDirectoryBanner : function () {
			var div = $$('.citydirpadding > div[style] > div')[0];

			if (div.children.length == 3) {
				var elm = $$('.citydirpadding > div[style] > div > div:first-child a, .citydirpadding > div[style] > div > div:first-child area');
				jQuery(elm).bind('click',
					function (event) {
						var alt = $(this).alt;
						if (!$(this).alt) {
							alt = ($(this).querySelector('img').alt) ? $(this).querySelector('img').alt : '';
						}

						tag_mgmt.trackAnayticsAction(event, 'Banner', alt, 'click');
					}
				);

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("tag_mgmt.tagDirectoryBanner();");
				}
			}
		},

		tagLeftNav : function () {
			if ($$('.navleftbg a')) {
				jQuery($$('.navleftbg a')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Left Nav', tag_mgmt.trim($(this).textContent), 'click');
					}
				);

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("tag_mgmt.tagLeftNav();");
				}
			}
		},

		tagSearchResults : function () {
			alphabetizeFacets()

			this.tagDisplayFilters();

			// Clear Links
			if ($$('.facetHeader .clear')) {
				jQuery($$('.facetHeader .clear')).bind('click',
					function (event) {
						var label = tag_mgmt.trim(jQuery($(this)).parent().prev()[0].textContent);

						tag_mgmt.trackAnayticsAction(event, 'Facet', label + ":Clear", 'click');
					}
				);
			}

			// More / Less
			if ($$('li.more')) {
				jQuery($$('li.more')).bind('click',
					function (event) {
						var label = tag_mgmt.trim(jQuery($(this)).parent().parent()[0].querySelector('.facetHeader .header').textContent);

						tag_mgmt.trackAnayticsAction(event, 'Facet', label + ":More", 'click');
					}
				);
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagSearchResults();");
			}
		},

		tagDisplayFilters : function () {
			if ($$('*[name="sortBy"]')) {
				jQuery($$('li.more')).bind('change',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Sort By', tag_mgmt.trim(this.value), 'click');
					}
				);
			}

			if ($$('.std_ProdSetPageSelectWidth')) {
				jQuery($$('.std_ProdSetPageSelectWidth')).bind('change',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Display', tag_mgmt.trim(this.value), 'click');
					}
				);
			}

			if ($$('*[name="dirPage"]')) {
				jQuery($$('*[name="dirPage"]')).bind('change',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Page', tag_mgmt.trim(this.value), 'click');
					}
				);
			}

			if ($$('img[alt="Previous"]')[0] && $$('img[alt="Previous"]')[0].parentNode) {
				jQuery($$('img[alt="Previous"]')[0].parentNode).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Page', "Previous", 'click');
					}
				);
			}

			if ($$('img[alt="Next"]')[0] && $$('img[alt="Next"]')[0].parentNode) {
				jQuery($$('img[alt="Next"]')[0].parentNode).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Page', "Next", 'click');
					}
				);
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagDisplayFilters();");
			}
		},

		tagCarousel : function (recheck) {
			if (recheck === false) {
				var div = $$('#product_detail_carousel > div');
			} else {
				var div = $$('#product_detail_carousel > div:first-child');
			}

			if (div) {
				var pos = false;
				var elm = false;
				var sku = false;
				var pos = false;
				var zoom = false;
				var handle = false;
				var event_type = false;
				if (div) {
					for (var i = 0; i < div.length; i ++) {
						switch (i) {
							case 0:
								handle = function (event) {
				 						sku = $(this).querySelector('img').src.match(/\/(\w?\d{3,})/)[1];

				 						elm = this.parentNode;
				 						for (var cnt = 0; cnt < 10 && elm.nodeName != 'LI'; cnt ++) {
											elm = elm.parentNode;
				 						}

				 						if (elm.nodeName == 'LI' && elm.className.search(/item-(\d+)/) != -1) {
											tag_mgmt.trackAnayticsAction(event, 'Carousel:' + sku, 'Pos ' + elm.getAttribute('jcarouselindex'), 'hover');

											tag_mgmt.carousel_pos =  elm.getAttribute('jcarouselindex');
										}

										//console.log(sku + ": " + elm.getAttribute('jcarouselindex'));

										//if ($$('.magnifierContent a')) {
											zoom = 	function (event) {
													sku  = $$('.magnifierContent a .prdthumb').src.match(/\/(\w?\d{3,})/)[1];

													//console.log(sku + "::" + tag_mgmt.carousel_pos);

													tag_mgmt.trackAnayticsAction(event, 'Carousel:' + sku, 'Pos ' + tag_mgmt.carousel_pos, 'click');
							 					};

											jQuery($$('.magnifierContent a')).unbind('click', zoom);
											jQuery($$('.magnifierContent a')).bind('click', zoom);
										//}
									 };

									jQuery($$('#product_detail_carousel li a')).unbind('mouseenter', handle);
									jQuery($$('#product_detail_carousel li a')).bind('mouseenter', handle);
								break;
							case 1:
								jQuery(div[i]).bind('click',
				 					function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Carousel', 'Prev', 'click');

										window.setTimeout("tag_mgmt.tagCarousel(" + recheck + ")", 1 * 1000);
									}
								 );
								break;
							case 2:
								jQuery(div[i]).bind('click',
				 					function (event) {
										tag_mgmt.trackAnayticsAction(event, 'Carousel', 'Next', 'click');

										window.setTimeout("tag_mgmt.tagCarousel(" + recheck + ")", 1 * 1000);
									}
								 );
								break;
						}
					}
				}

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("tag_mgmt.tagCarousel(" + recheck + ");");
				}
			} else {
				window.setTimeout("tag_mgmt.tagCarousel(" + recheck + ")", .5 * 1000);
			}
		},

		tagDirectory : function () {
			this.tagDisplayFilters();

			// Product Grid
			var product = $$('#PhotoGalleryProd');
			var sku  = false;
			var name = false;
			var qs   = false;
			if (product) {
				for (var i = 0; i < product.length; i ++) {
					name = tag_mgmt.trim(product[i].querySelector('.thumbheader a div').textContent);
					sku  = tag_mgmt.trim(product[i].querySelector('.prdthumb').src.match(/\/(\w?\d{3,})/)[1]);

					// Quick Shop
					qs  = product[i].querySelector('.qveThumbnail > div');
					if (qs) {
						jQuery(qs).bind('click',
							{	i: i,
								sku: sku,
								name: name
							},
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, "QS", 'click');
							}
						);
					}

					// Image
					if (product[i].querySelector('.imagecellbg a')) {
						product[i].querySelector('.imagecellbg a').bind('click',
								{	i: i,
									sku: sku,
									name: name
								},
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, "Image", 'click');
								}
							);
					}

					// Name
					if (product[i].querySelector('.thumbInfo a')) {
						product[i].querySelector('.thumbInfo a').bind('click',
								{	i: i,
									sku: sku,
									name: name
								},
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, "Name", 'click');
								}
							);
					}
				}
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagDirectory();");
			}
		},

		tagDynamicFamily: function () {
			// ML Value Fixes
			//familyKitInvFix();

			/*if (jQuery($$('#FamilyAlign'))) {
				jQuery($$('#FamilyAlign')).css('height', 'initial');
				jQuery($$('#FamilyAlign')).css('padding-bottom', '10px');
			}*/

			createScrollForMore();

			// Jump Links
			if ($$('#jumptolinks a')) {
				jQuery($$('#jumptolinks a')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Jump Link', tag_mgmt.trim($(this).href.replace(/^.+#/, '')), 'click');
					}
				);
			}

			// Top Links
			if ($$('div a[href="#backtotop"]')) {
				jQuery($$('div a[href="#backtotop"]')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Jump Link', "Top:" + tag_mgmt.trim(jQuery($(this)).parent()[0].querySelector('span').textContent), 'click');
					}
				);
			}

			// Product Grid
			var product = $$('.thumbtext');
			var sku  = false;
			var name = false;
			var list = false;
			var add  = false;
			var qs   = false;
			var type = false;
			if (product) {
				for (var i = 0; i < product.length; i ++) {
					name = tag_mgmt.trim(product[i].querySelector('.proddetailheading').textContent);
					sku  = tag_mgmt.trim(product[i].querySelector('.tablesaveditem').textContent.replace('SKU: ', ''));

					// Price List
					list = product[i].querySelectorAll('a[onclick]')[0];
					if (list) {

						jQuery(list).bind('click',
								{	i: i,
									sku: sku,
									name: name
								},
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, "Price List", 'click');
							}
						);
					}


					// Add to Basket
					add  = product[i].querySelectorAll('input[type="image"]')[0];
					if (add) {

						jQuery(add).bind('click',
								{	i: i,
									sku: sku,
									name: name
								},
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, 'Add to Basket', 'click');
							}
						);
					}

					// Quick Shop
					qs  = product[i].querySelectorAll('.qveThumbnail .familyPname, .qveThumbnail img');
					if (qs) {
						for (var j = 0; j < qs.length; j ++) {
							type = (qs[j].nodeName == 'IMG') ? 'Image' : 'Name';

							jQuery(qs[j]).bind('click',
								{	i: i,
									sku: sku,
									name: name,
									type: type
								},
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, "QS:" + event.data.type, 'click');
								}
							);
						}
					}
				}
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagDynamicFamily();");
			}
		},

		tagFamilyPage : function () {
			// ML Value Fixes
			//familyKitInvFix();

			/*if (jQuery($$('#FamilyAlign'))) {
				jQuery($$('#FamilyAlign')).css('height', 'initial');
				jQuery($$('#FamilyAlign')).css('padding-bottom', '10px');
			}*/

			createScrollForMore();

			// Clickable Hero Image
			if ($$('#detailTable td[rowspan="2"] img[onclick]')[0]) {
				if ($$('#detailTable td[rowspan="2"] img[onclick]')[0].onclick.toString().match(/(?:\d+\, *){2}(\d+)/)[1]) {
					this.udo_json.page_video = {0: mvideo[$$('#detailTable td[rowspan="2"] img[onclick]')[0].onclick.toString().match(/(?:\d+\, *){2}(\d+)/)[1]]};
				}

				jQuery($$('#detailTable td[rowspan="2"] img[onclick]')[0]).bind('click',
				 	function (event) {
						 tag_mgmt.trackAnayticsAction(event, 'Header', 'Video', 'click');
					 }
				 );
			}

			// Party Ideas Content
			if ($$('.std_CFDetPaddingLeft area')) {
				jQuery($$('.std_CFDetPaddingLeft area')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Header', tag_mgmt.trim($(this).alt), 'click');
					}
				);
			}

			// Jump Links
			if ($$('#jumptolinks a')) {
				jQuery($$('#jumptolinks a')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Jump Link', tag_mgmt.trim($(this).href.replace(/^.+#/, '')), 'click');
					}
				);
			}

			// Top Links
			if ($$('h2 a[href="#top"]')) {
				jQuery($$('h2 a[href="#top"]')).bind('click',
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Jump Link', "Top:" + tag_mgmt.trim(jQuery($(this)).parent()[0].querySelector('span').textContent), 'click');
					}
				);
			}

			// Product Grid
			var product = $$('.thumbtext');
			var sku  = false;
			var name = false;
			var list = false;
			var add  = false;
			var qs   = false;
			var type = false;
			if (product) {
				for (var i = 0; i < product.length; i ++) {
					name = tag_mgmt.trim(product[i].querySelector('.proddetailheading').textContent);
					sku  = tag_mgmt.trim(product[i].querySelector('.tablesaveditem').textContent.replace('SKU: ', ''));

					// Price List
					list = product[i].querySelectorAll('a[onclick]')[0];
					if (list) {

						jQuery(list).bind('click',
								{	i: i,
									sku: sku,
									name: name
								},
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, "Price List", 'click');
							}
						);
					}


					// Add to Basket
					add  = product[i].querySelectorAll('input[type="image"]')[0];
					if (add) {

						jQuery(add).bind('click',
								{	i: i,
									sku: sku,
									name: name
								},
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, 'Add to Basket', 'click');
							}
						);
					}

					// Quick Shop
					qs  = product[i].querySelectorAll('.qveThumbnail .familyPname, .qveThumbnail img');
					if (qs) {
						for (var j = 0; j < qs.length; j ++) {
							type = (qs[j].nodeName == 'IMG') ? 'Image' : 'Name';

							jQuery(qs[j]).bind('click',
								{	i: i,
									sku: sku,
									name: name,
									type: type
								},
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Pos ' + (event.data.i + 1) + ':' + event.data.sku + ":" + event.data.name, "QS:" + event.data.type, 'click');
								}
							);
						}
					}
				}
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagFamilyPage();");
			}
		},

		tagGlobalHeader : function () {
			if ($$('#divHeaderLogo a')[0]) {
				// Logo
				$$('#divHeaderLogo a')[0].onclick =
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Header', 'Logo', 'click');
					};

				// Header Links
				var top_links = $$('#toplinks a');
				for (var i = 0; i < top_links.length; i ++) {
					switch (this.trim(top_links[i].textContent)) {
						/*case 'Ship to':
							top_links[i].onclick =
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Header', 'Ship To Canada', 'click');
								};
							break;*/
						default:
							top_links[i].onclick =
								function (event) {
									tag_mgmt.trackAnayticsAction(event, 'Header', tag_mgmt.trim(this.textContent), 'click');
								};
							break;
					}
				}

				// International Site Changes
				if ($$('#intl_sites tr')) {
					jQuery($$('#intl_sites tr')).bind(
						'click',
						function (event) {
							tag_mgmt.trackAnayticsAction(event, 'Header', 'Ship To:' + tag_mgmt.trim(this.querySelector('td').textContent), 'click');
						}
					);
				}

				// Top Nav Tabs
				for (var i = 0; i < 4; i ++) {
					if ($$('a.topTab_' + i)[0]) {
						$$('a.topTab_' + i)[0].onclick =
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'Nav L1', tag_mgmt.trim(this.textContent), 'term');
							};
					}
				}

				// Global Search ... Auto Suggest handled by AJAX Call Back
				$$('.navsearchform')[0].onsubmit =
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Search', $$('#navsearchbox')[0].value.toLowerCase(), 'term');
					};

				// Top Nav
				var top_nav = $$('.sNavS');
				for (var i = 0; i < top_nav.length; i ++) {
					top_nav[i].onclick =
						function (event) {
							tag_mgmt.trackAnayticsAction(event, 'Nav L2', tag_mgmt.trim(this.textContent), 'click');
						};

					/* L2 HOVER TRACKING REMOVED Per W Louis-Paul on 2013-12-10
					if (!this.is_touch) {
						top_nav[i].onmouseover =
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'Nav L2', tag_mgmt.trim(this.textContent), 'hover');
							};
					}
					*/
				}

				// Fly Out Nav
				var sub_nav = $$('.flatCat a');
				for (var i = 0; i < sub_nav.length; i ++) {
					sub_nav[i].onclick =
						function (event) {
							var l2_nav = tag_mgmt.trim(jQuery(this).parents()[5].children[0].children[0].textContent);

							tag_mgmt.trackAnayticsAction(event, 'Nav L3', l2_nav + ":" + tag_mgmt.trim(this.textContent), 'click');
						};
				}

				var sub_nav_banner = $$('.flatCatPromos a');
				for (var i = 0; i < sub_nav_banner.length; i ++) {
					sub_nav_banner[i].onclick =
						function (event) {
							var l2_nav = tag_mgmt.trim(jQuery(this).parents()[5].children[0].children[0].textContent);
							var img    = this.children[0].src.split("/");

							tag_mgmt.trackAnayticsAction(event, 'Nav L3 Banner', l2_nav + ":" + img[img.length - 1], 'click');
						};
				}

				// Breadcrumbs
				var breadcrumb = $$('a.breadcrumb');
				for (var i = 0; i < breadcrumb.length; i ++) {
					jQuery(breadcrumb[i]).bind('click',
						{i: i},
						function (event) {
							tag_mgmt.trackAnayticsAction(event, 'Breadcrumb', 'Pos ' + event.data.i + ":" + tag_mgmt.trim(this.textContent), 'click');
						}
					);
				}

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("tag_mgmt.tagGlobalHeader();");
				}
			} else {
				window.setTimeout("tag_mgmt.tagGlobalHeader()", .5 * 1000);
			}
		},

		tagGlobalBanner : function() {
			// Global Banner
			try {
				var global_header_img = $$('#divAdLogo iframe')[0].contentWindow.document.getElementsByTagName('img')[0];

				if (global_header_img) {
					var area = $$('#divAdLogo iframe')[0].contentWindow.document.getElementById(global_header_img.useMap.replace('#', '')).children;

					for (var i = 0; i < area.length; i ++) {
						area[i].onclick =
							function (event) {
								var link_pos = (jQuery(this).parents()[0].childElementCount == 1) ? 'Discount' : 'Discount ' + parseInt(i + 1);
								var link_det = this.alt.replace(/(\d+)%/g, "$1P");
								var link_det = link_det.replace(/\$(\d+)/g, "$1D");

								var action = (this.href.search("PC_POP") == -1) ? 'click' : 'modal';

								parent.window.tag_mgmt.trackAnayticsAction(event, 'Header', 'Discount|' + link_pos + ":" + link_det, action);
							};


						if (!this.is_touch) {
							area[i].onmouseover =
								function (event) {
									var link_pos = (jQuery(this).parents()[0].childElementCount == 1) ? 'Discount' : 'Discount ' + parseInt(i + 1);
									var link_det = this.alt.replace(/(\d+)%/g, "$1P");
									var link_det = link_det.replace(/\$(\d+)/g, "$1D");

									var action = (this.href.search("PC_POP") == -1) ? 'click' : 'modal';

									parent.window.tag_mgmt.trackAnayticsAction(event, 'Header', 'Discount|' + link_pos + ":" + link_det, action);
								};
						}
					}

					if (this.debug_mode === true && window.console) {
						if (!document.all) {
							console.timeStamp();
						}
						console.log("tag_mgmt.tagGlobalBanner();");
					}
				} else if ($$('#divAdLogo iframe')[0]) {
					window.setTimeout("tag_mgmt.tagGlobalBanner()", .5 * 1000);
				}
			} catch (err) {

			}
		},

		tagNavBanner : function() {
			try {
				var ifrm = $$('iframe');

				for (var i = 0; i < ifrm.length; i ++) {
					if (ifrm[i].src && ifrm[i].src.search("/banners/nav/") != -1) {
						var nav_banner_img = ifrm[i].contentWindow.document.getElementsByTagName('img')[0];

						if (nav_banner_img) {
							var area = ifrm[i].contentWindow.document.getElementById(nav_banner_img.useMap.replace('#', '')).children;

							for (var j = 0; j < area.length; j ++) {
								area[j].onclick =
									function (event) {
										var link_pos = (jQuery(this).parents()[0].childElementCount == 1) ? 'Promo' : 'Promo ' + parseInt(j + 1);
										var link_det = this.alt.replace(/(\d+)%/g, "$1P");
										var link_det = link_det.replace(/\$(\d+)/g, "$1D");

										var action = (this.href.search("PC_POP") == -1) ? 'click' : 'modal';

										parent.window.tag_mgmt.trackAnayticsAction(event, 'Nav Banner', 'Promo|' + link_pos + ":" + link_det, action);
									};


								if (!this.is_touch) {
									area[j].onmouseover =
										function (event) {
											var link_pos = (jQuery(this).parents()[0].childElementCount == 1) ? 'Promo' : 'Promo ' + parseInt(j + 1);
											var link_det = this.alt.replace(/(\d+)%/g, "$1P");
											var link_det = link_det.replace(/\$(\d+)/g, "$1D");

											var action = (this.href.search("PC_POP") == -1) ? 'click' : 'modal';

											parent.window.tag_mgmt.trackAnayticsAction(event, 'Nav Banner', 'Promo|' + link_pos + ":" + link_det, action);
										};
								}
							}

							if (this.debug_mode === true && window.console) {
								if (!document.all) {
									console.timeStamp();
								}
								console.log("tag_mgmt.tagNavBanner();");
							}
						} else {
							window.setTimeout("tag_mgmt.tagNavBanner()", .5 * 1000);
						}
					}
				}
			} catch (err) {

			}
		},

		tagSeoLinks : function() {
			var seo = $$('#seo_links a');

			if (seo[0]) {
				for (var i = 0; i < seo.length; i ++) {
					seo[i].onclick =
						function (event) {
							tag_mgmt.trackAnayticsAction(event, 'SEO Link', tag_mgmt.trim(this.textContent), 'click');
						};
				}

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log('tag_mgmt.tagSeoLinks();');
				}
			}
		},

		tagGlobalFooter : function () {
			var area = $$('#globalfooter area');

			if ($$('#globalfooter area')) {
				// Why Shop && Social Site Links
				for (var i = 0; i < area.length; i ++) {
					area[i].onclick =
						function (event) {
							var event_type = (jQuery(this).parents()[0].children.length == 3) ? 'click' : 'social';

							tag_mgmt.trackAnayticsAction(event, 'Footer', tag_mgmt.trim(this.alt), event_type);
						};
				}

				// Email Sign Up
				$$('#email_submit_btn_foot')[0].onclick =
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Footer', 'Sign Up & Save', 'email');
					};

				// Footer Links
				var link = $$('#footerlinks a');
				for (var i = 0; i < link.length; i ++) {
					link[i].onclick =
						function (event) {
							tag_mgmt.trackAnayticsAction(event, 'Footer', tag_mgmt.trim(this.textContent), 'click');
						};
				}

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("tag_mgmt.tagGlobalFooter();");
				}
			} else {
				window.setTimeout("tag_mgmt.tagGlobalFooter()", .5 * 1000);
			}
		},

		tagInHouseHtml : function () {
			var link = $$('*[layout]');
			for (var i = 0; i < link.length; i ++) {
				link[i].onclick =
					function (event) {
						var alt = (this.querySelector('*[alt]')) ? this.querySelector('*[alt]').alt : this.alt;
						alt = (alt) ? tag_mgmt.trim(alt) : "";

						tag_mgmt.trackAnayticsAction(event, this.getAttribute('layout'), tag_mgmt.trim(alt), 'click');
					};
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagInHouseHtml();");
			}
		},

		tagGlobalBasket : function () {
			if (this.initialized === true) {
				if (!this.udo_json['basket_cnt']) {
					this.udo_json['basket_cnt'] = 0;
				}

				// Add user event tagging
				if ($$('.navQty')[0]) {
					this.udo_json['basket_cnt'] = $$('.navQty')[0].innerHTML.replace(/\s*items?/, '');

					if (this.is_touch) {
						$$('.popDownNav')[0].ontouchstart =
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'BasketModal', 'BasketTab', 'hover');
							};
					} else {
						$$('.popDownNav')[0].onmouseover =
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'BasketModal', 'BasketTab', 'hover');
							};
					}


					if ($$('.globalCartViewBasketBtn a')[0]) {
						$$('.globalCartViewBasketBtn a')[0].onclick =
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'BasketModal', 'View/Edit', 'view_edit');
							};
					}

					if ($$('.globalCartCheckoutBtn input')[0]) {
						$$('.globalCartCheckoutBtn input')[0].onclick =
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'BasketModal', 'Checkout', 'checkout');
							};
					}

					if ($$('.saveShopBasket')[0]) {
						$$('.saveShopBasket')[0].onclick =
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'BasketModal', 'Save Basket', 'save');
							};
					}

					if (this.debug_mode === true && window.console) {
						if (!document.all) {
							console.timeStamp();
						}
						console.log("tag_mgmt.tagGlobalBasket();");
					}

					// Track Basket Changes
					var cart_item = $$('.globalcartBody .itemImage img');
					var cart_name = $$('.globalcartBody .name a');
					this.udo_json['cart_item'] = {};
					this.udo_json['cart_name'] = {};
					var added_item = new Array();
					var product_code;
					if (cart_item) {
						for (var i = 0; i < cart_item.length; i ++) {
							product_code = cart_item[i].src.match(/City\/(\w?\d{3,})/)[1];

							if (added_item.indexOf(product_code) == -1) {
								this.udo_json['cart_item'][i] = product_code;
								added_item.push(this.udo_json['cart_item'][i]);
							}
						}
					} else {
						//this.last_udo_json['cart_item'] = this.udo_json['cart_item'];
					 	//this.last_udo_json['cart_name'] = this.udo_json['cart_name'];
					}

					added_item = new Array();
					if (cart_name) {
						for (var i = 0; i < cart_name.length; i ++) {
							if (added_item.indexOf(this.trim(cart_name[i].innerHTML)) == -1) {
								this.udo_json['cart_name'][i] = this.trim(cart_name[i].innerHTML);
								added_item.push(this.udo_json['cart_name'][i]);
							}
						}

						this.trackBasketChanges();
					}
				} else {
					window.setTimeout("tag_mgmt.tagGlobalBasket()", .5 * 1000);
				}
			} else {
				window.setTimeout("tag_mgmt.tagGlobalBasket()", .5 * 1000);
			}
		},

		tagMyAccount : function () {
			if ($$('.myAccount a')[0]) {
				$$('.myAccount a')[0].onclick =
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Header', 'Account', 'account');
					};

				$$('.accUserInfo a')[0].onclick =
					function (event) {
						tag_mgmt.trackAnayticsAction(event, 'Header', 'Account ' + tag_mgmt.trim(this.textContent), 'account');
					};

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("tag_mgmt.tagMyAccount();");
				}
			} else {
				window.setTimeout("tag_mgmt.tagMyAccount()", .5 * 1000);
			}
		},

		tagAutoSuggest : function () {
			if (this.initialized === true) {
				var div = $$('.autocomplete div');

				if (div) {
					for (var i = 0; i < div.length; i ++) {
						div[i].onclick =
							function (event) {
								tag_mgmt.trackAnayticsAction(event, 'AutoSuggest', $$('#navsearchbox')[0].value.toLowerCase() + ":" + tag_mgmt.trim(this.textContent.toLowerCase()), 'selected');
							};
					}
				}
			}

			if (this.debug_mode === true && window.console) {
				if (!document.all) {
					console.timeStamp();
				}
				console.log("tag_mgmt.tagAutoSuggest();");
			}
		},

		setConcatenatedPageName : function () {
			var result = this.udo_json['site_name'];

			if (this.udo_json['page_category_name']) {
				result += ":" + this.udo_json['page_category_name'];
			}

			if (this.udo_json['page_subcategory_name']) {
				result += ":" + this.udo_json['page_subcategory_name'];
			}

			if (this.udo_json['page_name']) {
				result += ":" + this.udo_json['page_name'];
			}

			this.udo_json['concatenated_page_name'] = result;
		},

		trackBasketChanges : function () {
			if (this.last_udo_json['cart_item'] != this.udo_json['cart_item']) {
				var added = {};
				var found;
				var cnt = 0;

				if (this.last_udo_json['cart_item']) {
					for (var i in this.udo_json['cart_item']) {
						found = false;
						for (var j in this.last_udo_json['cart_item']) {
							if (this.last_udo_json['cart_item'][j] == this.udo_json['cart_item'][i]) {
								found = true;
							}
						}

						if (found === false) {
							added[cnt] = this.udo_json['cart_item'][i];
							cnt ++;
						}
					}
				} else if (this.udo_json['cart_item']) {
					added = this.udo_json['cart_item'];
					cnt ++;
				}

				//console.log(added);
				//console.log(cnt);

				if (cnt > 0) {
					var product_name = {};
					var product_sku  = {};
					for (var i in added) {
						for (var j in this.udo_json['cart_item']) {
							if (added[i] == this.udo_json['cart_item'][j]) {
								product_name[i] = this.udo_json['cart_name'][j];
								product_sku[i]  = this.udo_json['cart_item'][j];
							}
						}
					}

					try {
						utag.link({
							product_name:		product_name,
							product_sku:		product_sku,
							link_text:		'cart add'
						});
					} catch (err) {
					}

					if (this.debug_mode === true && window.console) {
						if (!document.all) {
							console.timeStamp();
						}
						console.log("tag_mgmt.trackBasketChanges();");

						console.log(product_name);
						console.log(product_sku);
					}
				}

				this.last_udo_json['cart_item'] = this.udo_json['cart_item'];
				this.last_udo_json['cart_name'] = this.udo_json['cart_name'];

				this.setCookie('last_page_udo__cart_item', this.udo_json['cart_item']);
				this.setCookie('last_page_udo__cart_name', this.udo_json['cart_name']);
			}
		},

		setUdoFromCookie : function (name, index) {
			var result = this.readCookie(name);

			if (result !== false) {
				this.udo_json[index] = result;
			}
		},

		getUdoCookie : function() {
			var cookie = document.cookie.split(';');

			var name   = false;
			var value  = false;
			var result = false;

			for (var i = 0; i < cookie.length; i++) {
				value = cookie[i].split('=');

				if (value[0].match('last_page_udo__') != -1) {
					name = this.trim(value[0].replace('last_page_udo__', ''));

					this.last_udo_json[name] = this.readCookie(this.trim(value[0]));
				}
			}
		},

		setUdoCookie : function() {
			for (var i in this.udo_json) {
				switch (i) {
					case 'cart_item':
					case 'cart_name':
						this.setCookie('last_page_udo__' + i, this.udo_json[i]);
						break;
				}
			}
		},

		buildUdoFromAjax : function (ajax_url) {
			try {
				jQuery.ajax({
					type: "GET",
					url:  ajax_url,
					async: true,
					success: function(data) {
						var json = JSON.parse(data.match(/parseJSONObject\((.*)\);/i)[1]);

						for (var type in json) {
							for (var index in json[type]) {
								tag_mgmt.udo_json[index] = json[type][index];
							}
						}

						tag_mgmt.initializeAnalytics();
					},
					failure: function(data) {
						tag_mgmt.initializeAnalytics();
					}
				});
			} catch(e) {
				tag_mgmt.initializeAnalytics();
			}
		},

		readCookie : function(name) {
			try {
				var name_eq = name + "=";
				var cookie = document.cookie.split(';');

				var result = false;

				for (var i = 0; i < cookie.length && result === false; i++) {
					var c = cookie[i];

					value = c.split("=");
					if (this.trim(value[0]) == name) {
						result = '';
						for (var j = 1; j < value.length; j ++) {
							result += (result.length == 0) ? "" : "=";
							result += value[j];
						}
					}
				}

				if (typeof(result) == 'string') {
					if (result.match(/^\{.*\}$/) != null) {
						result = JSON.parse(result);
					} else if (result.match(/\[.*\]/) != null) {
						result = JSON.parse(JSON.parse(result));
					}
				}
			} catch (e) {
			}
				return result;
		},

		setCookie : function(name, value) {
			try {
				switch (typeof(value)) {
					case 'object':
						value = JSON.stringify(value);
						break;
					default:
						value = escape(value);
						break;
				}

				document.cookie = name + "=" + value + "; path=/";

				if (this.debug_mode === true && window.console) {
					if (!document.all) {
						console.timeStamp();
					}
					console.log("'" + name + "' Saved to Cookie");
				}
			} catch(e) {

			}
		},

		getUrlParam : function (name) {
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			var result = false;

			if (results.length >= 1) {
				result = results[1];
			}

			return result;
		},

		getTagMgmt : function () {
			return JSON.stringify(this);
		},

		getUdoValue : function (param) {
			if (this.initialized === true) {
				//return JSON.stringify(this.udo_json[param]);
				return this.udo_json[param];
			} else {
				return false;
			}
		},

		trim : function (txt) {
			return txt.replace(/^\s*|\s*$/g, "");
		}
	};
}();

function addScrollForMore () {
	var elm = document.createElement('img');

	elm.id = 'sfm_div';
	elm.display = 'block';
	elm.src = '/images/set_c/en_us/global/globalgraphics/scrollformore.png';

	elm.style.position = 'fixed';
	elm.style.bottom = '0px';
	elm.style.zIndex = 10;

	elm.style.cursor = "pointer";
	elm.style.fontFamily = "'Open Sans', Arial";

	elm.onclick = function () {window.scrollBy(0, 400);};

	document.body.appendChild(elm);

	setScrollForMorePos();

	jQuery(window).bind('scroll',
		function (event) {
			// Get Vertical Scroll
			var top = 0;

			if (typeof(window.pageYOffset) == 'number') {
				top = window.pageYOffset;
			} else if (document.body && document.body.scrollTop) {
				top = document.body.scrollTop;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				top = document.documentElement.scrollTop;
			} else {
				top = 0;
			}

			// Get % scrolled
			var w = (window.innerHeight) ? window.innerHeight : document.documentElement.clientHeight;
			var p = 1 - (top / (document.body.scrollHeight - w));

			try {
				document.getElementById('sfm_div').style.opacity = p;
			} catch(e){}
		}
	);
}

function setScrollForMorePos() {
	try {
		var elm = document.getElementById('sfm_div');
		var p = (window.innerWidth) ? window.innerWidth : document.documentElement.clientWidth;

		if (p > 1280) {
			elm.style.display = 'initial';

			var b = 990;
			var left = ((p - b) / 2) + b + 5;

			elm.style.left = left + 'px';
		} else {
			elm.style.display = 'none';
		}
	} catch (e) {}
}

function createScrollForMore() {
	if (self == top) {
		try {
			jQuery(window).bind('load',
				function (event) {
					addScrollForMore();
				}
			);

			jQuery(window).bind('resize',
				function (event) {
					setScrollForMorePos();
				}
			);
		} catch (e) {
			// If can't bind w jQuery, wait 1/2 a second and try again
			window.setTimeout("createScrollForMore()", .5 * 1000);
		}
	}
}

function alphabetizeFacets() {
	try {
		var facet = document.querySelector('div[data-facet="characterbranded"]');
		var character = document.querySelectorAll('div[data-facet="characterbranded"] > div[data-facet-value]');

		var list = [];
		var div = [];
		var name = false;

		for (var i = 0; i < character.length; i ++) {
			name = character[i].getAttribute('data-facet-value');
			list.push(name);
			div[name] = jQuery(character[i]).clone(true)[0];

			if (window.console) {
				console.log("CLONE: " + name);
			}
		}

		list.sort();
		facet.innerHTML = "";

		for (var i = 0; i < list.length; i ++) {
			facet.appendChild(div[list[i]]);
		}
	} catch (e) {
		// If error w jQuery, wait 1/2 a second and try again
		if (document.querySelector('div[data-facet="characterbranded"]')) {
			if (window.console) {
				console.log(e);
			}
			window.setTimeout("alphabetizeFacets()", .5 * 1000);
		}
	}
}

/*function alphabetizeFacets() {
	try {
		var facet = document.querySelector('div[data-facet="characterbranded"]');
		var character = document.querySelectorAll('div[data-facet="characterbranded"] > div[data-facet-value]');

		var list = [];
		var div = [];
		var name = false;

		for (var i = 0; i < character.length; i ++) {
			name = character[i].getAttribute('data-facet-value');
			list.push(name);
			div[name] = character[i].cloneNode(true);

			for (var event_type in jQuery(character[i]).data('events')) {
				if (event_type != 'undefined') {
					if (window.console) {
						console.log("div[" + name + "]." + event_type  + " = jQuery(character[i]).data('events')." +  event_type + ";");
					}
					eval("div[name]." + event_type  + " = jQuery(character[i]).data('events')." +  event_type + ";");
				}
			}
		}

		list.sort();
		//facet.innerHTML = "";

		for (var i = 0; i < list.length; i ++) {
			facet.appendChild(div[list[i]]);
		}
	} catch (e) {
		// If error w jQuery, wait 1/2 a second and try again
		if (document.querySelector('div[data-facet="characterbranded"]')) {
			if (window.console) {
				console.log(e);
			}
			window.setTimeout("alphabetizeFacets()", .5 * 1000);
		}
	}
}*/

/*
function alphabetizeFacets() {
	try {
		var facet = document.querySelector('div[data-facet="characterbranded"]');
		var character = document.querySelectorAll('div[data-facet="characterbranded"] > div[data-facet-value]');

		var list = [];
		var div = [];
		var name = false;

		for (var i = 0; i < character.length; i ++) {
			list.push(character[i].dataset.facetValue);
			div[character[i].dataset.facetValue] = character[i].cloneNode(true);

			for (var event_type in jQuery(character[i]).data('events')) {
				if (event_type != 'undefined') {
					if (window.console) {
						console.log("div[character[i].dataset.facetValue]." + event_type  + " = jQuery(character[i]).data('events')." +  event_type + ";");
					}

					eval("div[character[i].dataset.facetValue]." + event_type  + " = jQuery(character[i]).data('events')." +  event_type + ";");
				}
			}
		}

		list.sort();
		facet.innerHTML = "";

		for (var i = 0; i < list.length; i ++) {
			facet.appendChild(div[list[i]]);
		}
	} catch (e) {
			// If error w jQuery, wait 1/2 a second and try again
			if (window.console) {
				console.log(e);
			}
			if (document.querySelector('div[data-facet="characterbranded"]')) {
				window.setTimeout("alphabetizeFacets()", .5 * 1000);
			}
	}
}*/

function setReadToggle(cnt) {
	try {
		var lnk = document.querySelector('a[href="#BVTable"]');

		if (lnk) {
			jQuery(lnk).bind(
				'click',
				function (event) {
					var review_hdr = document.querySelector('#BVTable h3');
					var row = document.querySelectorAll('#BVTable #detailTable tr');

					jQuery(row).css('display', 'table-row');

					review_hdr.innerHTML = 'Customer Reviews &#9660;';

					review_hdr.setAttribute('state', 'open');
				}
			);
		} else {
			cnt ++;

			if (cnt < 5) {
				window.setTimeout("setReviewsToggle(" + cnt + ")", .5 * 1000);
			}
		}
	} catch(e) {
		if (window.console) {
			console.log(e);
		}
	}
}

function setReviewsToggle() {
	try {
		if (tag_mgmt.udo_json['reviews_shown'] == 'Star Rating') {
			var review_hdr = document.querySelector('#BVTable h3');
			var row = document.querySelectorAll('#BVTable #detailTable tr');

			if (review_hdr && row.length > 1) {
				review_hdr.innerHTML = 'Customer Reviews &#9654;';
				review_hdr.style.cursor = "pointer";
				review_hdr.setAttribute('state', 'closed');

				jQuery(row).css('display', 'none');
				jQuery(row[0]).css('display', 'table-row');

				jQuery(review_hdr).bind(
					'click',
					{hdr: review_hdr},
					function (event) {
						var row = document.querySelectorAll('#BVTable #detailTable tr');

						if (event.data.hdr.getAttribute('state') == 'open') {
							jQuery(row).css('display', 'none');
							jQuery(row[0]).css('display', 'table-row');

							event.data.hdr.innerHTML = 'Customer Reviews &#9654;';

							event.data.hdr.setAttribute('state', 'closed');
						} else {
							jQuery(row).css('display', 'table-row');

							event.data.hdr.innerHTML = 'Customer Reviews &#9660;';

							event.data.hdr.setAttribute('state', 'open');
						}
					}
				);

				setReadToggle(0);
			} else {
				window.setTimeout("setReviewsToggle()", .5 * 1000);
			}
		}
	} catch (e) {
		if (window.console) {
			console.log(e);
		}
	}
}

function familyKitInvFix () {
	try {
		var div = document.querySelectorAll('div.FamilyAlert span.messagealert');
		var qty = false;
		var hid = false;
		var id = false;
		var ipt = false;

		for (var i = 0; i < div.length; i ++) {
			if (div[i].innerHTML.toString().search(/customer service/i) != -1) {
				qty = div[i];

				do {
					qty = qty.parentNode;
				} while (qty.className != 'divQty');

				hid = qty;
				do {
					hid = hid.previousSibling;
				} while (hid.nodeName.search('#') != -1);

				id = hid.id.match(/_(\d+)$/)[1];

				ipt = document.createElement('input');
				ipt.type = 'hidden';
				ipt.name = 'optionTypes';
				ipt.value = 0;
				div[i].appendChild(ipt);

				ipt = document.createElement('input');
				ipt.type = 'hidden';
				ipt.id = 'optionTypeValues_' + id;
				ipt.value = 'none';
				ipt.value = 'none';
				div[i].appendChild(ipt);

				ipt = document.createElement('input');
				ipt.type = 'hidden';
				ipt.name = 'qty';
				ipt.value = 0;
				ipt.size = 3;
				ipt.maxLength = 3;
				div[i].appendChild(ipt);
			}
		}
	} catch(e) {}
}