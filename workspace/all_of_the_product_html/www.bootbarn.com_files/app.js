/*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 */

var app = (function(jQuery){

	if (!jQuery) {
		alert(app.resources["MISSING_LIB"]);
		return null;
	}
	
	// Global dw private data goes here	
	// This makes the dialog to close when clicking
	// outside of the dialog.
	jQuery(".ui-widget-overlay").click (function () {
		jQuery("#sizeChartDialog").dialog( "close" );
	});

	// dw scope public
	return {
		URLs			: {}, // holds dw specific urls, check htmlhead.isml for some examples
		resources		: {},  // resource strings used in js
		constants		: {}, // platform constants, initialized in htmlhead.isml
		containerId		: "content",
		ProductCache	: null,  // app.Product object ref to the current/main product
		clearDivHtml	: "<div class=\"clear\"><!-- W3C Clearing --></div>",
		currencyCodes	: {}, // holds currency code/symbol for the site

		// default dialog box settings
		dialogSettings: {
				bgiframe: true, // this is required mainly for IE6 where drop downs bleed into dialogs!!! it depends on 
				autoOpen: false,
				buttons: {},
				modal: true,
				overlay: {
		    		opacity: 0.5,
		     		background: "black"
				},
		    	height: 530,
		    	width: 800,
		    	title: '',
		    	// show: "slow", This is causing dialog to break in jquery 1.3.2 rel, show: "slide" works but not desired
		    	hide: "normal",
		    	resizable: false
		},

		// default tooltip settings
		tooltipSettings: {
				delay: 0,
				showURL: false,
				extraClass: "tooltipshadow tooltipshadow02",
				top: 15,
				left: 5
		},

		// global form validator settings
		validatorSettings: {
			errorClass : 'errorclient',
			errorElement: 'span',
			
		    onfocusout: function(element) {
				if ( !this.checkable(element) ) {
					this.element(element);
				}				
			}
		},

		// app initializations called from jQuery(document).ready at the end of the file
		init: function() {
			// register initializations here
			
			// quick view dialog div
			jQuery("<div/>").attr("id", "QuickViewDialog").html(" ").appendTo(document.body);
			
			// newsletter div
			jQuery("<div/>").attr("id", "NewsletterDialog").html(" ").appendTo(document.body);
			app.newsletter.bindEvents();
			
			jQuery("<div/>").attr("id", "VideoDialog").html(" ").appendTo(document.body);
			
			jQuery("<div/>").attr("id", "ThreeSixtyDegreeDialog").html(" ").appendTo(document.body);
			
			
			// micicart object initialization
			this.minicart.init();
			
			// execute unobtrusive js code
			this.execUjs();
			
			// renders horizontal/vertical carousels for product slots
			/*-------------------------*
			 * removed capture carousel
			 * because it throws an error in cart when the customer is logged in
			 *-------------------------*/
			/*jQuery('#horicarousel').jcarousel({
	        	scroll: 1,
				itemVisibleInCallback: app.captureCarouselRecommendations
		    });

		    jQuery('#vertcarousel').jcarousel({
		        scroll: 1,
				vertical: true,
				itemVisibleInCallback: app.captureCarouselRecommendations
		    });*/	
			
			/*** LYONS ***/
			// bonus product dialog div
			jQuery("<div/>").attr("id", "BonusProductDialog").html(" ").appendTo(document.body);
		},
	
		// sub namespace app.ajax.* contains application specific ajax components
		ajax: {
			Success: "success",
			currentRequests: {}, // request cache

			// ajax request to get json response
			// @param - reqName - String - name of the request
			// @param - async - boolean - asynchronous or not
			// @param - url - String - uri for the request
			// @param - data - name/value pair data request
			// @param - callback - function - callback function to be called
			getJson: function(options) {
				var thisAjax = this;

				// do not bother if the request is already in progress
				// and let go null reqName
				if (!options.reqName || !this.currentRequests[options.reqName]) {
					this.currentRequests[options.reqName] = true;
					if(options.async == "undefined") options.async = true;
					// make the server call
					jQuery.ajax({
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						url		: options.url,
						cache	: true,
						async	: options.async,
						data	: options.data,

						success: function(response, textStatus) {
							thisAjax.currentRequests[options.reqName] = false;

							if (!response.Success) {
								// handle failure
							}

							options.callback(response, textStatus);
						},

						error: function(request, textStatus, error) {
							if (textStatus === "parsererror") {								
								//alert(app.resources["BAD_RESPONSE"]);
							}
							
							options.callback({Success: false, data:{}});
						}
					});
				}
			},

			// ajax request to load html response in a given container
			// @param - reqName - String - name of the request
			// @param - url - String - uri for the request
			// @param - data - name/value pair data request
			// @param - callback - function - callback function to be called
			// @param - selector - string - id of the container div/span (#mycontainer) - it must start with '#'
			load: function(options) {

				var thisAjax = this;

				// do not bother if the request is already in progress
				// and let go null reqname
				if (!options.reqName || !this.currentRequests[options.reqName]) {
					this.currentRequests[options.reqName] = true;
					// make the server call
					jQuery.ajax({
						dataType: "html",
						url		: options.url,
						cache	: true,
						data	: options.data,

						success: function(response, textStatus) {
							thisAjax.currentRequests[options.reqName] = false;
							
							if (options.selector) {
								jQuery(options.selector).html(response);
							}

							(options.callback != undefined ? options.callback(response, textStatus): null)
						},

						error: function(request, textStatus, error) {
							if (textStatus === "parsererror") {								
								alert(app.resources["BAD_RESPONSE"]);
							}

							options.callback(null, textStatus);
						}
					});
				}
			}
		},

		startVideo : function(href, aspectratio) {
			
			var ratio = aspectratio;
			var vertical = 350;
			var horizontal = 580;

			if (ratio == "16to9") {
				vertical = 350;
				horizontal = 775;	
			}
			
			if(jQuery("#VideoDialogA").length) {
				jQuery("#VideoDialogA").remove();
			}
			
			app.createDialog({id: 'VideoDialog', options: {
		    	height: vertical,
		    	width: horizontal,
		    	dialogClass: 'video',
		    	title: 'Watching Video',
		    	resizable: false
			}});
			
			jQuery("<a />").attr("id", "VideoDialogA").attr("href", href).html(" ").appendTo(jQuery('#VideoDialog'));
		    jQuery('#VideoDialog').dialog('open');
		    
		    // Fix for IE
		    jQuery(".ui-dialog .ui-dialog-titlebar-close").click(
		    		function(){
		    			flowplayer(0).stop();
		    		}
		    );
		    
		    // app.URLs.flowPlayer defined in htmlhead.isml
			flowplayer("VideoDialogA", app.URLs.flowPlayer);
			
			return false;
		},
		
		start360Degree : function(href) {
			
			app.createDialog({id: 'ThreeSixtyDegreeDialog', options: {
		    	height: 400,
		    	width: 490,
		    	dialogClass: '360degree',
		    	title: 'touch and drag to rotate',
		    	resizable: false
			}});
			jQuery("#ThreeSixtyDegreeDialog").dialog('option', 'position', ['middle',100]);
			jQuery('#ThreeSixtyDegreeDialog').dialog('open');
			jQuery('#ThreeSixtyDegreeDialog').flash({swf:href, width: 480,height: 385});
			
			// This makes the dialog to close when clicking
			// outside of the dialog.
			jQuery(".ui-widget-overlay").click (function () {
				jQuery("#ThreeSixtyDegreeDialog").dialog( "close" );
			});

			return false;
		},
		
		
		openImageOverlay : function() {
			
			app.createDialog({id: 'ImageZoomContainer', options: {
		    	height: 'auto',
		    	width: 850,
		    	dialogClass: 'imagezoomoverlay',
		    	title: 'Image Zoom',
		    	resizable: true
			}});
			
			jQuery('#ImageZoomContainer').dialog('open');
			
			// This makes the dialog to close when clicking
			// outside of the dialog.
			jQuery(".ui-widget-overlay").click (function () {
				jQuery("#ImageZoomContainer").dialog( "close" );
			});
			return false;
		},
			
		// loads a product into a given container div
		// params
		// 		containerId - id of the container div, if empty then global app.containerId is used
		//		source - source string e.g. search, cart etc.
		//		label - label for the add to cart button, default is Add to Cart
		//		url - url to get the product
		//		id - id of the product to get, is optional only used when url is empty
		getProduct: function(options) { // id, source, start
			var cId 		= options.containerId || app.containerId;
			var source 		= options.source || "";
			var a2cBtnLabel = options.label || null;

			// show small loading image
			jQuery("#"+cId).html(app.showProgress("productloader"));

			var productUrl = options.url ? options.url : app.util.appendParamToURL(app.URLs.getProductUrl, "pid", options.id);
						
			productUrl = app.util.appendParamToURL(productUrl, "source", source);

			app.ajax.load({selector: "#"+cId, url: productUrl, callback: function(responseText, textStatus){
				// update the Add to cart button label if one provided
				(a2cBtnLabel != null ? jQuery("#"+cId+" .addtocartbutton:last").html(a2cBtnLabel) : '');
				// addthis.init(); --removed because share on PDP was removed 5/28/13
			}});
		},
		// sub name space app.minicart.* provides functionality around the mini cart
		minicart: {
			url   : '',  // during page loading, the Demandware URL is stored here
			timer : null, // timer for automatic close of cart item view

			// initializations
			init: function() {
				// reset all the existing event bindings
				app.minicart.reset();

				// bind hover event to the cart total link at the top right corner
				jQuery(".minicarttotal").hover(function(e){(app.minicart.isShow() ? '': app.minicart.slide());});
			
				jQuery('.minicartcontent')
				.mouseenter(function(e) {
					clearTimeout(app.minicart.timer);
					app.minicart.timer = null;
				})
				.mouseleave(function(e) {
					clearTimeout(app.minicart.timer);
					app.minicart.timer = null;
					// after a time out automatically close it
					app.minicart.timer = setTimeout( 'app.minicart.close()', 30 );
				});

				// register close button event
				jQuery('.minicartcontent .minicartclose').click(function() {
					// reset all the events bindings
					//app.minicart.reset();
					app.minicart.close(0);
				});
			},
			
			// returns a boolean if a minicart is visible/shown or hidden
			isShow: function() {
				return jQuery('.minicartcontent').css('display') == 'none' ? false : true;
			},
			
			// reset minicart
			reset: function() {
				jQuery(".minicarttotal").unbind("hover");
				jQuery('.minicartcontent').unbind("mouseenter").unbind("mouseleave");
				jQuery('.minicartcontent .minicartclose').unbind("click");
			},

			// shows the given content in the mini cart
			show: function(html) {
				jQuery('#minicart').html(html);
				
				// bind all the events
				app.minicart.init();
				
				if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
					// do nothing
					// the hook 'MiniCart.suppressSlideDown()' should have done the refresh
				}
				else {
					app.minicart.slide();
				}
			},
			
			// slide down and show the contents of the mini cart
			slide: function() {
				if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
					return;
				}
					
				// show the item
				jQuery('.minicartcontent').slideDown('slow');//show("slide", { direction: "up" }, 1000);

				clearTimeout(app.minicart.timer);
				app.minicart.timer = null;
					
				// after a time out automatically close it
				app.minicart.timer = setTimeout( 'app.minicart.close()', 6000 );
			},

			// adds a product to the mini cart
			// @params
			// progressImageSrc - source/url of the image to show when the item is being added to the cart
			// postdata - form data containing the product information to be added to mini-cart
			// callback - call back function/handler
			add: function(progressImageSrc, postdata, callback)
			{
				// get the data of the form as serialized string
				var postdata = postdata;

				// get button reference
				var addButtons = [];

				// the button to update
				var addButton = null;
				
				// it is an array of buttons, but we need only one all
				// other combinations are strange so far
				if (addButtons.length == 1)	{
					addButton = addButtons[0];
				}

				var previousImageSrc = null;

				// show progress indicator
				if (addButton != null) {
					previousImageSrc = addButton.src;
					addButton.src = progressImageSrc;
				}

				// handles successful add to cart
				var handlerFunc = function(req)	{
					// hide progress indicator
					if (addButton != null) {
						addButton.src = previousImageSrc;
					}

					// replace the content
					jQuery('#minicart').html(req);

					// bind all the events
					app.minicart.init();

					if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
						// do nothing
						// the hook 'MiniCart.suppressSlideDown()' should have done the refresh
					}
					else {
						app.minicart.slide();

						if (callback) callback();
					}
					
					// fire the BonusDiscountLineItemCheck event so we can check if there is a bonus discount line item
					jQuery(document).trigger(jQuery.Event("BonusDiscountLineItemCheck"));
				}

				// handles add to cart error
				var errFunc = function(req) {
					// hide progress indicator
					if (addButton != null) {
						addButton.src = previousImageSrc;
					}				}

				// closes a previous mini cart
				app.minicart.close();

				// add the product
				jQuery.ajax({
								type	: "POST",
								url		: app.minicart.url,
								cache	: true,
								data	: postdata,
								success	: handlerFunc,
								error	: errFunc
							});
			},

			// closes the mini cart with given delay
			close: function(delay) {
				if ( app.minicart.timer != null || delay == 0) {
					clearTimeout( app.minicart.timer );
					app.minicart.timer = null;					
					jQuery('.minicartcontent').fadeOut(); // hide with "slide" causes to fire mouse enter/leave events sometimes infinitely thus changed it to fadeOut
				}
			},

			// hook which can be replaced by individual pages/page types (e.g. cart)
			suppressSlideDown: function() {
				return false;
			}
		},

		// close quick view dialog if open and refresh the page
		refreshCart: function() {
			app.quickView.close();

			// refresh without posting
			location.href = location.href;
		},

		// Product quick view object
		quickView: {
			// bind browser events
			// options
			// buttonSelector - css selector for the quickview button
			// imageSelector - css selector for product image
			// buttonLinkSelector - css selector for quickview button link (a tag)
			// productNameLinkSelector - css selector for product name link (a tag)
			bindEvents: function(options) {
				// hide quickview buttons
				jQuery(options.buttonSelector).hide();

				// hovering
				jQuery(options.imageSelector).hover(
					function(e) {
						jQuery(this).children(options.buttonSelector).show();
						return false;
					},
					function(e) {
						jQuery(this).children(options.buttonSelector).hide();
						return false;
					}
				);

				// click binding for quick view
				jQuery(options.buttonLinkSelector).click(function(e) {
					app.quickView.show({url: this.href, source: "quickview"});
					return false;
				});

				/*
				To make bookmarking and browser back-button work correctly the browser URL needs 
				to change. To force that change we do a full-page load (not AJAX) when going from 
				search result page to product detail page.
				The implementation supports loading the product detail content with AJAX: just 
				uncomment this code block to bind the event handler.
				
				// click binding for name link
				if(options.productNameLinkSelector) {
					jQuery(options.productNameLinkSelector).click(function(e) {
						app.getProduct({url: this.href, source: "search"});
						return false;
					});
				}
				*/
			},

			// show quick view dialog and send request to the server to get the product
			// options.source - source of the dialog i.e. search/cart
			// options.url - product url
			show: function(options) {
				app.createDialog({id: 'QuickViewDialog', options: {
					height: 540,
			    	width: 815,
			    	dialogClass: 'quickview',
			    	title: 'Quick View',
			    	position: {
			    	   my: 'center',
			    	   at: 'center',
			    	   collision: 'fit',
			    	   using: function(pos) {
			    	        var topOffset = jQuery(this).css(pos).offset().top;
			    	        if (topOffset < 0) {
			    	        	jQuery(this).css('top', pos.top - topOffset);
			    	        }
			    	   }
			    	},
			    	resizable: false
			    	
			    	
				}});
				
				jQuery("#QuickViewDialog").dialog('option', 'position', ['top',0]);
				//jQuery("#QuickViewDialog").dialog('option', 'position', [0,0]);
				jQuery('#QuickViewDialog').dialog('open');
				
				// This makes the dialog to close when clicking
				// outside of the dialog.
				jQuery(".ui-widget-overlay").click (function () {
					jQuery("#QuickViewDialog").dialog( "close" );
				});
			    app.getProduct({containerId: "QuickViewDialog", source: options.source, url: options.url, label: options.label});
			    
			},
			// close the quick view dialog
			close: function() {
				//alert("closed");
				jQuery('#QuickViewDialog').dialog('close');
			}
		},
		//Bonus product view object
		bonusProductView: {
		  // show bonus product view dialog and send request to the server to get the
		  // bonus products
		  // options.url - bonus product url
		  show: function(options) {
			  app.createDialog({id: 'BonusProductDialog', options: {
			   height: 600,
			   width: 800,
			   dialogClass: 'quickview',
			   title: 'Select Bonus Product',
			   resizable: false,
			   close: function(){
				   
			   }
			  }});
			  jQuery("#BonusProductDialog").dialog('option', 'position', ['middle',100]);
			  jQuery('#BonusProductDialog').dialog('open');
			  //populate the dialog
			  app.ajax.load({selector: "#BonusProductDialog", url: options.url, callback: function(responseText, textStatus){ }});
			  
			  //jQuery("#" + "productresultarea").hide();
				// This makes the dialog to close when clicking
				// outside of the dialog.
				jQuery(".ui-widget-overlay").click (function () {
					jQuery("#BonusProductDialog").dialog( "close" );
				});

		  },
		  // close the quick view dialog
		  close: function() {
			  jQuery('#BonusProductDialog').dialog('close');
		  }
		},
		// Newsletter object
		newsletter: { 
			// bind browser events
			bindEvents: function() {
				// click binding for quick view
				jQuery("#smallNewsletterSubmit").click(function(e) {
					
					if(jQuery("#footerEmailInput1").val().match(/.*@.*\..*/)) {
					    app.newsletter.show('#footerEmailInput1');
					} else {
						alert("Please use a valid email address like bootbarn@example.com");
					}
					
					return false;
				});
				
				jQuery("#smallGoSubmit").click(function(e) {
					
					if(jQuery("#footerEmailInput").val().match(/.*@.*\..*/)) {
					    app.newsletter.show('#footerEmailInput');
					} else {
						alert("Please use a valid email address like bootbarn@example.com");
					}
					
					return false;
				});


			},

			// show quick view dialog and send request to the server to get the newsletter
			show: function(dialogID) {
				app.createDialog({id: 'NewsletterDialog', options: {
			    	height: 502,
			    	width: 447,
			    	dialogClass: 'ui-dialog-newsletter',
			    	title: '',
			    	resizable: false
				}});
				jQuery("#NewsletterDialog").dialog('option', 'position', ['middle',80]);
			    jQuery('#NewsletterDialog').dialog('open');
			    // load form
			    jQuery('#NewsletterDialog').html(app.showProgress("newsletterformloader"));
			    app.ajax.load({selector: "#NewsletterDialog", url: app.URLs.getNewsletterForm+"?email="+encodeURIComponent(jQuery(dialogID).val()), callback: function(responseText, textStatus){
			    	// does not work, the serialize function won't take this value
			    	//jQuery("#dwfrm_newsletter_email").val(jQuery("#footerEmailInput").val());
			    	
			    	// This code creates session hijacking intrusion issue when in the newsletter.xml
			    	// file the first element form has an attribute secure="true"
			    	// this was removed
			    	
			    	submitFunction = function() {
			    		  jQuery.ajax({
								type	: "POST",
								url		: jQuery("#dwfrm_newsletter").attr('action'),
								cache	: false,
								data	: jQuery("#dwfrm_newsletter").serialize(),
								success	: function (res) {
			    			        jQuery('#NewsletterDialog').html(res);
			    			       
			    			        jQuery("#dwfrm_newsletter").submit(submitFunction);
			    			        
			    		  		},
								error	: function (req) {
			    		  			alert("Error");
			    		  		}
						  });
			    		  return false;
			    		}
			    	
			    	jQuery("#dwfrm_newsletter").submit(submitFunction);
			    	
			    }});
			    
			},
			// close the quick view dialog
			close: function() {
				jQuery('#NewsletterDialog').dialog('close');
			}
		},

		// helper method to create a dialog with the given options
		// options - dialog box options along with id of the container
		createDialog: function(options) {
			jQuery('#'+options.id).dialog(jQuery.extend({}, app.dialogSettings, options.options));
		},

		// shows tooltip popup
		// options
		// id - id of the container
		// options - tooltip popup options
		tooltip: function(options) {
			if (options.id.charAt(0) !== '#') {
				options.id = "#"+options.id;
			}
			jQuery(options.id).tooltip(jQuery.extend({}, app.tooltipSettings, options.options));
		},
		
		/**
		 * Unobtrusively build tooltips on the page.
		 * it looks for a tooltip class anchor which contains a div with tooltip-body class as the body container.
		 */
		tooltipDefault: function () {	 
			 jQuery(document).ready(function() {
				jQuery(".tooltip").tooltip(jQuery.extend({}, app.tooltipSettings, {	
						bodyHandler: function() {
							return jQuery(this).children(".tooltip-body").html();
						}
					}
				));
			 });			
		},

		// renders a progress indicator on the page; this function can be used
		// to indicate an ongoing progress to the user; the optional parameter "className"
		// can be used to attach an additional CSS class to the container
		showProgress : function(className) {
			var clazz = "loading";
			if (className) clazz += " " + className;
			return jQuery("<div class=\"" + clazz + "\"/>").append(jQuery("<img/>").attr("src", app.URLs.loadingSmallImg));
		},

		// validation plugin intialization
		validator: function() {
			// override default required field message
			jQuery.validator.messages.required = function($1, ele, $3) {
				return "";
			};
			
			/**
			 * Add phone validation method to jQuery validation plugin.
			 * Text fields must have 'phone' css class to be validated as phone
			 * phoneUS is copied from http://docs.jquery.com/Plugins/Validation/CustomMethods/phoneUS
			 */
			jQuery.validator.addMethod("phone", function(phone_number, element) {
				// find out the country code
				var data 	= jQuery(element).data("data");
				var country = (data && data.country && data.country != "") ? data.country : "US"; // default to US phone validation
				
				// preserve this instance
				var that = this;
				
				// country specific phone validation handlers
				var phoneCA,
					phoneUS = phoneCA = function() {
						phone_number = phone_number.replace(/\s+/g, ""); 
						return that.optional(element) || phone_number.length > 9 &&
							phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})[- ]?[2-9]\d{2}[- ]?\d{4}$/);
					}
				
				window["eval"]("var phoneHandler = (typeof phone" + country + " != 'undefined') ? phone"+country+": null;");
				
			    // call the country specific phone validation handler
				return (phoneHandler && typeof phoneHandler == "function" ? phoneHandler() : true);
			}, app.resources["INVALID_PHONE"]);

			/**
			 * Add positive number validation method to jQuery validation plugin.
			 * Text fields must have 'positivenumber' css class to be validated as positivenumber
			 * it validates a number and throws error if it is below 0 or if it is not a number.
			 */
			jQuery.validator.addMethod("positivenumber", function(value, element) {
				if (value == '') return true;				
				return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value) && Number(value) >= 0;
			}, ""); // "" should be replaced with error message if needed
			
			// register form validator for form elements
			// except for those which are marked "suppress"
			jQuery.each(jQuery("form:not(.suppress)"), function() {
				jQuery(this).validate(app.validatorSettings);
			});
		},

		/**
		 * grab anything inside a hidden dom element and append it to its immediate previous sibling
		 * as data attribute i.e. jQuery().data("data", hiddenStr)
		 * if the hidden data specifies json in the class then this routine would attempt to 
		 * convert the hidden data into json object before adding it as data attribute.
		 * after adding the data, the hidden span/element is removed from the DOM.
		 */
		hiddenData : function() {
			jQuery.each(jQuery(".hidden"), function() {
				var hiddenStr = jQuery(this).html();
				
				if (hiddenStr === "") {
					return;
				}
				
				// see if its a json string
				if (jQuery(this).hasClass("json")) {
					// try to parse it as a json
					try {
						hiddenStr = window["eval"]("(" + hiddenStr + ")");
					}
					catch(e) {}				
				}
				
				jQuery(this).prev().data("data", hiddenStr);
				
				jQuery(this).remove();
			});
		},
		
		/**
		 * Process country drop downs and attach a change listener so that phone field 
		 * can be validated properly based on the currently selected country.
		 */
		addCountryListener: function() {
			var countryHandler = function(e) {
				var selectedCountry = this.options[this.selectedIndex].value;
				// for each field of type phone in the current form, set its country as a data attribute
				// to be used while doing phone field validatiaon see app.validator addMethod.
				jQuery(this).parents("form:first").find("input.phone").each(function() {
					var data = jQuery(this).data("data");
					var currentData = (data && typeof data == 'object') ? data : {};
					currentData.country = selectedCountry;
					jQuery(this).data("data", currentData);
				});						
			}
			jQuery("select.country").change(countryHandler).each(countryHandler);
		},
		
		/**
		 * Unobtrusive js api calls go here.
		 */
		 execUjs: function() {
			// make global nav drop downs with superfish jquery plugin
			jQuery('.categorymenu ul').addClass('sf-menu');			
			jQuery('ul.sf-menu').superfish({autoArrows	: false, dropShadows : false, onInit:function(){
				var theMenus = jQuery(this).find(".fullMenuContents");
				//onInit function...
				//cycle through the menus and resize/and left to appropriate containers
				
				if(theMenus.length > 0){
					//rework em!
					for(var i=0;i<theMenus.length;i++){
						var theMenu = jQuery(theMenus[i]);
						var theLis = theMenu.find("li:not(.cap,.endcap)");//all li's but end cap or endcap
						
						var rowCount = Math.max(1 ,Math.ceil(theLis.length/3));//5 get the row count (min value of 1)
						
						var fullWidth=0, fullHeight=0;
						if(theLis.length<3){ //5
							fullWidth = theLis.length*185;//187
						}else{
							fullWidth=815; //931
						}
					
						//compute height. There	will only be three columns of data per row.
						for(var y=1;y<=rowCount;y++){
							var thisRowHeight=0;
							
							for(var x=0;x<3;x++){//5
								
								if(x*y>theLis.length){
									break;
								}
								var thisLiHeight;
								if(jQuery(theLis[x*y]).children().length<=0){
									alert(jQuery(theLis[x*y]).children().length);
									thisLiHeight=0;
									
								}
								else{
									thisLiHeight=(jQuery(theLis[x*y]).children().length*32)+32;//Ben: this is crappy math
									
									
								}
								
									
								if(thisRowHeight<thisLiHeight){
									//set the RowHeight to the biggest of the Li's in it
									thisRowHeight = thisLiHeight;
									
								}
							}
						
							fullHeight+=thisRowHeight;
							
						}
						
						
						
						//size as if on a 5 x n grid, each li of dimension (171xMaxHeightForTheRow)
						//menus are max width of 899
						theMenu.height(fullHeight+30);//+fudge for top and bottom padding;
						theMenu.width(fullWidth);
						theMenu.css("top","48px");
						theMenu.siblings("ul").css("top","49px").css("background-position-y",(517/-2+fullHeight/2+15)+"px");
						
						//left position: first half of menu, draw from left, rest draw from right
						if(i>4){//the right five
							var newLeft = 815-fullWidth;//+40 to compensate for leftSide
							if(newLeft<0){
								newLeft=0;
							}
						}
						else{

							var newLeft = 0;//+40 to compensate for leftSide
						}
						theMenu.css("left",(newLeft+0)+"px");
						theMenu.siblings("ul").height(fullHeight+30).css("left",(newLeft+5)+"px");
						
						jQuery(".pagination").css("z-index","24");
					}
				}
				
			}}).find('ul').bgIframe();
			
			// process hidden data in the html markup and cnnvert it into data object(s)
			this.hiddenData();
			
			// initialize form validator plugin
			this.validator();
			
			// process country form fields and attach listeners
			this.addCountryListener();
			
			// process tooltips on the page
			this.tooltipDefault();

			/*$("ul.sf-menu").bind('click',function() {
                $('ul.sf-menu').hideSuperfishUl();
            });*/
			// Cannot use the above method for hiding the dropdown menu after clicking because
			// it causes the dropdown menus on the iPad to  not work.  Use the following instead.
			$("ul.fullMenuContents").bind('click',function() {
                  $('ul.sf-menu').hideSuperfishUl();
              });
		},
		
		// capture recommendation of each product when it becomes visible in the carousel
		captureCarouselRecommendations : function(c, li, index, state) {
			jQuery(li).find(".captureproductid").each(function() {
				dw.ac.capture({id:this.innerHTML, type:dw.ac.EV_PRD_RECOMMENDATION});
			});
		},

		// sub namespace app.producttile.* contains utility functions for product tiles
		producttile : {
			// initializes all product tiles contained in the current page
			initAll: function() {
				// bind quick view button toggling and click
				var quickViewOptions = {
					buttonSelector: "div.producttile div.quickviewbutton",
					imageSelector: "div.producttile div.image",
					buttonLinkSelector: "div.producttile div.quickviewbutton a"
				};
				app.quickView.bindEvents(quickViewOptions);
				
				// prepare swatch palettes and thumbnails
				jQuery("div.producttile div.swatches div.invisible").hide();
				jQuery("div.producttile div.swatches a.swatch img.hiddenthumbnail").hide();
				
				// show the palette
				jQuery("div.producttile div.swatches > a").click(function(e) {
					var cont = jQuery(this).parent().find("div.palette");
					cont.show().focus();
					return false;
				});
				
				// hide the palette
				jQuery("div.producttile div.swatches div.invisible").mouseout(function(e) {
					// fix for event bubbling (http://www.quirksmode.org/js/events_mouse.html)
					if(!e) var e = window.event;
					var tg = (window.event) ? e.srcElement : e.target;
					if(tg.nodeName != 'DIV') return;
					var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
					while(reltg != tg && reltg.nodeName != 'BODY')
						reltg = reltg.parentNode
					if (reltg == tg) return;
					
					// mouseout took place when mouse actually left layer
					// handle event now
					jQuery(this).hide();
					return false;
				});
				
				// thumb nail toggling
				jQuery("div.producttile div.swatches div.palette a.swatch").bind("mouseover mouseout", function(e) {
					var swatch = jQuery(this);
					app.producttile.toggleVariationThumbnail(swatch);
				});
				
				// color swatch selection
				jQuery("div.producttile div.swatches div.palette a.swatch").click(function(e) {
					var swatch = jQuery(this);
					app.producttile.selectVariation(swatch);
					// omit following the swatch link
					return false;
				});
			},

			// selects a certain variation in a product tile, replaces the current image with
			// the correct variation image, changes the link to the detail
			// page and the quick view
			selectVariation : function(swatch) {
				// get the new and the original image
				var currentImg = jQuery(swatch.parents()[3]).find(".productimage img");
				var newImg = swatch.children("img.hiddenthumbnail");
				if(!currentImg || !newImg) return;
				
				// get the anchors
				var nameAnchor = swatch.parents(".producttile").find(".name a");
				var quickViewAnchor = swatch.parents(".producttile").find(".quickviewbutton a");
				var imageAnchor = swatch.parents(".producttile").find(".productimage a");
				
				// change the link url to the detail page and quick view
				var newUrl = swatch.attr("href");
				nameAnchor.attr("href", newUrl);
				quickViewAnchor.attr("href", newUrl);
				imageAnchor.attr("href", newUrl);
				
				// remove all current markers
				jQuery(swatch.parents()[0]).find("a.swatch").removeClass("selected");
				
				// mark swatch as selected
				swatch.addClass("selected");
				// we just remove the markers at the images; the actual elements
				// are correct, since they were already swapped by mouse over
				currentImg.removeClass("temp original");
				newImg.removeClass("temp original");
			},

			// shows the thumb nail of a product; this function is used to
			// temporally display a new image and restore the original one
			toggleVariationThumbnail : function(swatch) {
				// get the new and the original image
				var currentImg = jQuery(swatch.parents()[3]).find(".productimage img");
				var newImg = swatch.children("img.hiddenthumbnail");
				if(!newImg || !currentImg) return;
				
				var selectedSwatch = jQuery(swatch.parents()[0]).find("a.selected");
				var selectedImg = selectedSwatch.children("img.hiddenthumbnail");

				// we do nothing in case the swatch is already selected
				if(swatch.hasClass("selected")) return;
				
				if(currentImg.hasClass("temp")) {
					// current image is just a temp image, restore original
					var newCopy = selectedImg.clone().show().removeClass("original hiddenthumbnail");
					currentImg.replaceWith(newCopy[0]);
				} else {
					// we create a copy of the swatch image, replace
					// the current and mark it with classes
					var newCopy = newImg.clone().show().addClass("temp").removeClass("hiddenthumbnail");
					currentImg.replaceWith(newCopy[0]);
				}
			}
		},

		// sub namespace app.util.* contains utility functions
		util : {
			// disables browser auto completion for the given element
			disableAutoComplete : function(elemId) {
				jQuery("#"+elemId).attr("autocomplete", "off");
			},

			// trims a prefix from a given string, this can be used to trim
			// a certain prefix from DOM element IDs for further processing on the ID
			trimPrefix : function(str, prefix) {
				return str.substring(prefix.length);
			},

			// appends the parameter with the given name and
			// value to the given url and returns the changed url
			appendParamToURL : function(url, name, value) {
				var c = "?";
				if(url.indexOf(c) != -1) {
					c = "&";
				}
				return url + c + name + "=" + encodeURIComponent(value);
			},

			// dynamically loads a CSS file
			loadCSSFile : function(url) {
				var elem = document.createElement("link");
				elem.setAttribute("rel", "stylesheet");
				elem.setAttribute("type", "text/css");
				elem.setAttribute("href", url);

				if(typeof elem != "undefined") {
					document.getElementsByTagName("head")[0].appendChild(elem);
					app.util.loadedCSSFiles.push(url);
				}
			},

			// array to keep track of the dynamically loaded CSS files
			loadedCSSFiles : [],

			// removes all dynamically loaded CSS files
			clearDynamicCSS : function() {
				for(var i=0; i<app.util.loadedCSSFiles.length; i++) {
					app.util.unloadCSSFile(app.util.loadedCSSFiles[i]);
				}
			},

			// dynamically unloads a CSS file
			unloadCSSFile : function(url) {
				var candidates = document.getElementsByTagName("link");
				for(var i=candidates.length; i>=0; i--) {
					if(candidates[i] && candidates[i].getAttribute("href") != null && candidates[i].getAttribute("href").indexOf(url) != -1) {
						candidates[i].parentNode.removeChild(candidates[i]);
					}
				}
			},

			// checks if cookies are enabled
			cookiesEnabled : function() {
				// first we'll split this cookie up into name/value pairs
				// note: document.cookie only returns name=value, not the other components
				var all_cookies = document.cookie.split( ';' );
				var temp_cookie = '';
				var cookie_name = '';
				var cookie_value = '';
				var cookie_found = false; // set boolean t/f default f

				for ( i = 0; i < all_cookies.length; i++ )
				{
					// now we'll split apart each name=value pair
					temp_cookie = all_cookies[i].split( '=' );

					// and trim left/right whitespace while we're at it
					cookie_name = temp_cookie[0].replace(/^\s+|\s+$/g, '');

					// if the extracted name matches the session cookie name 
					if ( cookie_name == 'sid' )
					{
						// we need to handle case where cookie has no value but exists (no = sign, that is):
						if ( temp_cookie.length > 1 )
						{
							cookie_value = unescape( temp_cookie[1].replace(/^\s+|\s+$/g, '') );
						}

						if (cookie_value.length > 0)
						{
							cookie_found = true;
							break;
						}
					}
					temp_cookie = null;
					cookie_name = '';
				}
				return cookie_found;
			},
			
			/**
			 * IE 6 multiple button submit issue work around.
			 * when a form has multiple buttons of submit type, then IE 6 submits all of them
			 * whenever form is submitted. e.g. Remove on cart page would remove the wrong item
			 * (always first item in the cart) because IE 6 submits all form data which includes all 
			 * remove links!!!
			 * the workaorund is to disable all buttons except the one which is being clicked.
			 * it should only be called for IE 6 (check out htmlhead.isml for usage)
			 */
			ie6ButtonFix: function() {
				jQuery('button').click(function(){
		        	// disable all buttons
		        	jQuery(this.form).find('button').attr("disabled", true);
		        	// enable the one being clicked
		            jQuery(this).attr("disabled", false);
			    });
			}
		},

		// sub namespace app.dialog.* provides convenient functions to handle dialogs
		// note, that this code relies on single dialog modals (multi dialog, e.g. modal in modal is not supported)
		dialog : {
			// opens a dialog using the given url
			open : function(url, title) {
				// create the dialog container if not present already
				if(jQuery("#dialogcontainer").length == 0) {
					jQuery(document.body).append("<div id=\"dialogcontainer\"></div>");
				}

				// set a default title
				title = title || "Dialog";

				// finally load the dialog, set the dialog title
				app.ajax.load({
					selector: "#dialogcontainer",
					url: url,
					callback: function() {
						app.dialog.checkOpen();
						app.dialog.setTitle(title);
					}
				});
			},

			// initializes the dialog with common dialog actions, like closing upon canceling
			// use this function in the dialog rendering template to re-bind common actions
			// upon dialog reload
			init : function() {
				jQuery(document).ready(function() {
					// binds the action to all buttons defining an action through the "name" attribute
					jQuery("#dialogcontainer button").each(function() {
						jQuery(this).click(function() {
							var action = jQuery(this).attr("name");
							if(action) {
								app.dialog.submit(action);
							}
							return false;
						});
					});

					// cancel button binding
					jQuery("#dialogCancelBtn").click(function() {
						app.dialog.close();
						return false;
					});
				});
			},

			// sets the title of the dialog
			setTitle : function(title) {
				jQuery("#dialogcontainer").dialog("option", "title", title);
			},

			// checks, if the dialog is in the state "open" and sets the state if not presently set
			// this function is implicitly called by app.dialog.open(url, title) in order to initialize
			// the dialog properly; use this function to recover the "open" state of a dialog
			checkOpen : function() {
				if(!jQuery("#dialogcontainer").dialog("isOpen"))
				{
					jQuery("#dialogcontainer").dialog({
						bgiframe: true,
						autoOpen: false,
						modal: true,
						overlay: {
				    		opacity: 0.5,
				     		background: "black"
						},
				    	height: 425,
				    	width: 460,
				    	resizable: false
					});
					jQuery("#dialogcontainer").dialog("open");
				}
			},

			// closes the dialog and triggers the "close" event for the dialog
			close : function() {
				jQuery("#dialogcontainer").dialog("close");
				jQuery(document.body).trigger("dialogClosed");
			},

			// attaches the given callback function upon dialog "close" event
			onClose : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogClosed", callback);
				}
			},

			// triggers the "apply" event for the dialog
			triggerApply : function() {
				jQuery(document.body).trigger("dialogApplied");
			},

			// attaches the given callback function upon dialog "apply" event
			onApply : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogApplied", callback);
				}
			},

			// triggers the "delete" event for the dialog
			triggerDelete : function() {
				jQuery(document.body).trigger("dialogDeleted");
			},

			// attaches the given callback function upon dialog "delete" event
			onDelete : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogDeleted", callback);
				}
			},

			// submits the dialog form with the given action
			submit : function(action) {
				// set the action
				jQuery("#dialogcontainer form").append("<input name=\"" + action + "\" type=\"hidden\" />");

				// serialize the form and get the post url
				var post = jQuery("#dialogcontainer form").serialize();
				var url = jQuery("#dialogcontainer form").attr("action");

				// post the data and replace current content with response content
		  		jQuery.ajax({
				   type: "POST",
				   url: url,
				   data: post,
				   dataType: "html",
				   success: function(data){
		  				jQuery("#dialogcontainer").empty().html(data);
				   },
				   failure: function(data) {
					   alert(app.resources["SERVER_ERROR"]);
				   }
				});
			}
		},
		mergePhoneFields: function() {
			if (jQuery("input.phone2")[0].value !== "") {
				jQuery("input.phone")[0].value = jQuery("input.phone")[0].value + 'x' + jQuery("input.phone2")[0].value;
				jQuery("input.phone2")[0].value = "";
			}
		},
		
		checkZipcode : function(zip,country) {
			   
			 
			if (country == "US") {
				var check = /^\d{5}(-\d{4})?$/;

		        var result = zip.search(check);

				if (result == -1) {
					var el = jQuery('.formfield.zip .label .labeltext').get(0);
					if (el) {
					  el.className="errorlabel";
					}
		 			return false;
				}
				else {

			
			         return true;
				}
			}
			else if (country == "CA") {  
				var check = /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/;
				var result = zip.search(check);

				if (result == -1) {
					
					var el = jQuery('.formfield.zip .label .labeltext').get(0);
					if (el) {
					   el.className="errorlabel";
					}
		 			return false;
				}
				else {
					return true;
				}
			}
			else {
		      return true;
			}
		},

	     checkPhone : function(phone,country,phone2) {

	        if(country == "US" || country == "CA") {
	        	var check = /^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})[- ]?[2-9]\d{2}[- ]?\d{4}$/;
		        var result = phone.search(check);
		        if (result == -1) {
		        	var el = jQuery('.formfield.phone .label .labeltext').get(0);
					if (el) {
					   el.className="errorlabel";
					}
					return false;
			     }
	        }
	        if (phone2.length > 0) {  
	        	var check = /^\d{1,7}$/;
	        	var result = phone2.search(check); 
	        	if (result == -1) {
	        		var el = jQuery('.formfield.phone .label .labeltext').get(0);
					if (el) {
					   el.className="errorlabel";
					}
					return false;
	            }
	        }

	        return true;
	     }
		
	}
})(jQuery);

// application initialization on dom ready
jQuery(document).ready(function(){
	app.init();
});
