/*
 * Contains cartEstimator plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var vars = {
		dataOptions : null,
		userData: {}
	};
	var settings = {
	    template: '<div data-id="cartEstimator"><div class="title"></div><div class="content">[cart.country][cart.zipcode][cart.province][cart.method][cart.promotional]</div></div>',
	    data: {},
	    messages: {},
	    displaySteps: false,
	    displayCount: false,
	    labelCountry: false,
	    labelProvince: false,
	    labelShipping: false,
	    labelZip: false,
	    labelPromo: false,
	    verifyShippingMessage: 'Please confirm selected shipping after updating zip code.',
	    stsMessage: 'Some of the above store pickup items are not available today and will need to be shipped to the store for free (Est. delivery time 5-6 Business Days). Faster options are available below and during checkout',
	    noCountryMessage: 'If your country is not listed, you will need to pay by Western Union QUICK Pay. Please email us or call Customer Service at 1.800.991.6813 for further information on placing your order.',
        hasSFS: false,
        hasEstimated: false,
        labels : {
            country:     'Select Country: ',
            province:    'Select Province ',
            zipcode:     'Enter Zip Code',
            shipping:    'Select Shipping Method ',
            sourcecode:  'Enter Promo Code'
        },
		callback: function(){}
	};
	var methods = {
        //Initializer
	    init: function (options) {
            //THERE CAN BE ONLY ONE!!
	        if ($('#cart_estimator_form').length > 0) {
	            return;
	        }
			//Merge settings with external settings object if it exists
			if(typeof(jqueryEstimatorSettings) !== 'undefined'){
				try {
					settings = $.extend(settings, jqueryEstimatorSettings);	
				} catch(err){}
			}
            //Otherwise, merge settings with specified options
			settings = $.extend(settings, options);

			vars.userData.values = $.extend(vars.userData.values, settings.data);
			vars.userData.messages = $.extend(vars.userData.messages, settings.messages);
			//initial setup
			 return this.each(function() {
		    	var $element;
		    	$element = $(this);
				methods.initEstimator($element);
			 });
		},
        //Initialize based on the reply from the service gateway
		initEstimator : function(element) {
		    var $element = element;
		    
			//Make call to Estimator Gateway
			$.cartActions('getEstimateData', vars.userData.values, function (data) {
                //Merge local data over returned data (local takes precidence)
			    vars.userData.values = $.extend(data.data.values, vars.userData.values);
			    if (typeof (vars.userData.estimates) === 'undefined') {
					data.data.estimates.shippingSavings = data.data.estimates.shipping = data.data.estimates.savings = 'TBD';
					data.data.values.zipcode = '';
				}
                //Merge returned estimates over local estimates (returned takes precidence)
			    vars.userData.estimates = $.extend(vars.userData.estimates, data.data.estimates);
			    vars.userData.messages = $.extend(vars.userData.messages, data.data.messages);
				vars.dataOptions = data;
				methods.createEstimator($element);
			});
						
		},
        //Validate display of certain fields
		validateData: function (element) {
		    if ($('#estimator_country').parent().css('display') == 'none') {
		        $('#estimator_country').parent().show();
		    }
            //Hide province and zip code for now
		    $('#estimator_province').hide();
		    $('#estimator_zipcode').hide();
            //US gets Zip Code shown
		    if(methods.isUS(vars.dataOptions.data.values.country)) {
		        vars.userData.values.province = '';
		        $('#estimator_zipcode').show();	
		    }
            //CA gets Province shown
		    if(vars.dataOptions.data.values.country == 'CA') {
		        vars.userData.values.zipcode = '';	
		        $('#estimator_province').show();	
		    }
		    if(settings.hasSFS) {
		        //methods.successFalse('SFS');
		        settings.hasSFS = false;
		    }
            //If there is an error, we should display it to the user
		    if (vars.userData.estimates.success == false && vars.userData.messages.error != '') {
		        $('form#cart_estimator_form [data-btnname="_calculate"]').before('<div id="estimator_error">' + vars.userData.messages.error + '</div>');
		    } else {
		        $('form#cart_estimator_form #estimator_error').remove();
		    }
            
		    var sthCount = 0;
		    var stsCount = 0;
		    var sfsCount = 0;
		    var borisCount = 0;
		    //Get all the line items to analyze what they are...
		    var selector = '';
		    if ($('#cart').length > 0) {
		        selector = '#cart .cart>li';
		    } else {
		        selector = '#page_cart .cart>li';
		    }

		    $(selector).each(function () {
                //Is a BORIS
		        if ($(this).attr('data-boris') == 'Y' &&  $(this).attr('data-fulfillmenttype') == 'PICKUP_IN_STORE') {
		            borisCount++;
		            return;
		        }
                //Is a SFS
		        if ($(this).attr('data-sfs') == 'true' && $(this).attr('data-fulfillmenttype') == 'SHIP_FROM_STORE') {
		            sfsCount++;
		            return;
		        }
                //Is a STS
		        if($(this).attr('data-instore') == 'Y' && $(this).attr('data-fulfillmenttype') == 'SEND_TO_STORE'){
		            stsCount++;
		            return;
		        }
                //Is a S2H
		        if($(this).attr('data-fulfillmenttype') == 'SHIP_TO_HOME'){
		            sthCount++;
		            return;
		        }
		    });
		    //console.info('S2H:' + sthCount + ' STS:' + stsCount + ' SFS:' + sfsCount + ' BORIS:' + borisCount);
            //If there are Ship to Home Items, ignore special cases
		    if (sthCount == 0) {
                //No Ship To Home, hide country, province, and zip code
		        $('#estimator_country').parent().hide();
		        $('#estimator_province').hide();
		        $('#estimator_zipcode').hide();

		        if (stsCount > 0) {
		            //If there's a Ship To Store item, display the STS notice and ensure shipping shows
		            if ($('#sts_message').length == 0) {
		                $('#estimator_shipping').parent().before('<div id="sts_message">' + settings.stsMessage + '</div>');
		                $('[data-cartvalue="error"]').hide();
		            }
		            $('#estimator_shipping').parent().show();

		        } else if (borisCount > 0 || sfsCount > 0) {
		            //If there's a BORIS ot SFS item, remove STS message and hide shipping.
		            $('#estimator_shipping').parent().hide();
		            $('#sts_message').remove();
		        }

		    } else {
                //Ship to Home items need a country to ship to, make sure it shows
		        if ($('#estimator_country').parent().css('display') == 'none') {
		            $('#estimator_country').parent().show();
		        }
                //Make sure shipping shows correctly
		        $('#estimator_shipping').parent().show();
		        $('[data-cartvalue="error"]').show();
                $('#sts_message').remove();
		    }             
		},
		labelFields: function () {
		    //Display step labels
		    //Kind of complicated because of all the show/hide down on the front end.
		    if (settings.displaySteps === true) {
		        var rowCount = 0;
		        var label = '';
		        //Get input elements from estimator
		        var estRows = $('form#cart_estimator_form > div').find('select, input');
		        for (var i = 0; i < estRows.length; i++) {
		            //Setup the labels for each field
		            label = settings.labels[estRows.eq(i).attr('name').toLowerCase()];
		            if (estRows.eq(i).parent().css('display') != 'none' && settings.displayCount === true) {
		                //Only apply a step number if this thing's parent is not set to none and we want to display the 'count'
		                rowCount++;
		                label = rowCount + '. ' + label;
		            }
		            //IF LABEL ELEMENTS
		            if ($('form#cart_estimator_form label[for="' + estRows.eq(i).attr('id') + '"]').length > 0) {
		                //In case we want to, you know, use labels for labeling...
		                $('form#cart_estimator_form label[for="' + estRows.eq(i).attr('id') + '"]').text(label);
		                //Strip placeholders for selects, since we aren't using them here
		                if (estRows.eq(i).find('option').length > 0) {
		                    estRows.eq(i).find('option').each(function () {
		                        $(this).text($(this).text().replace(/\{L\}/g, ''));
		                    });
		                }
		                //IF SELECT ELEMENTS WITH NO LABELS
		            } else if (estRows.eq(i).find('option').length > 0) {
		                //Select boxes are special. We want the label on either the selected item...
		                if (estRows.eq(i).find('option[selected="selected"]').length > 0) {
		                    estRows.eq(i).find('option[selected="selected"]').text(estRows.eq(i).find('option[selected="selected"]').text().replace(/\{L\}/g, label));
		                    //...and all of the other items in the select get no labeling...
		                    estRows.eq(i).find('option').not('[selected="selected"]').each(function () {
		                        $(this).text($(this).text().replace(/\{L\}/g, ''));
		                    });
		                } else {
		                    //...or, failing that, the first option...
		                    var allOpts = estRows.eq(i).find('option');
		                    allOpts.eq(0).text(allOpts.eq(0).text().replace(/\{L\}/g, label));
		                    for (var j = 1; j < allOpts.length; j++) {
		                        //...and no labels for the other options
		                        allOpts.eq(j).text(allOpts.eq(j).text().replace(/\{L\}/g, ''));
		                    }
		                }
		                //IF TEXT INPUTS WITH NO LABELS
		            } else if (estRows.eq(i).attr('type') == 'text') {
		                //Text fields are easy. Set the place holder!
		                estRows.eq(i).attr('placeholder', label);
		            }
		        }
		    }
		},
		successFalse : function(error) {
			$('[data-value="estimator_value"]').hide();
			$('#estimator_sourcecode').show();
		},
		createEstimator : function(element) {
		    var $element = element;
		    var tempCode = '';
            //Set up HTML for estimator
			$element.html('<form id="cart_estimator_form">' + settings.template.replace(/(\[cart\.)([^\]]*)(\])/gi, function (m, p1, section, p3) { return methods.getSectionHTML(section); }) + '<button data-btnType="submit" class="button" data-btnName="_calculate"><span></button></form>');
			methods.updateEstimator();
			methods.validateData($element);
			methods.labelFields();
            //Attach listeners to elements
			methods.addListeners($element);

			if (!vars.dataOptions.success) {
			    //methods.successFalse();	
			}

			$('form#cart_estimator_form').attr('data-estimated', '' + settings.hasEstimated + '');
			$('[data-cartvalue="subtotal"] .value').attr('data-value', vars.userData.estimates.subtotal);

			if (settings.hasEstimated == 'true' && vars.userData.estimates.success !== false) {
			    $('[data-cartvalue="shipping"] .value').attr('data-value', vars.userData.estimates.shipping);
			    $('[data-cartvalue="savings"] .value').attr('data-value', vars.userData.estimates.savings);
			    $('[data-cartvalue="orderTotal"] .value').attr('data-value', vars.userData.estimates.orderTotal);
			    if (vars.userData.values.sourcecode != '') {
			        $('[data-cartvalue="sourcecode"]').show();
			        if (data.messages.sourcecode != '') {
			            tempCode = $('<span>' + data.messages.sourcecode + '</span>').text();
			        }
			        $('[data-cartvalue="sourcecode"] .value').attr('data-value', data.values.sourcecode.toUpperCase() + ': ' + tempCode);
			    } else {
			        $('[data-cartvalue="sourcecode"]').hide();
			    }
			}
			
			if(typeof(settings.callback) === 'function') {
				settings.callback(vars.userData);
			}
		},
        //Update the estimator's stored data
		updateEstimator: function () {
		    $('[data-value="estimator_value"]').each(function () {
				vars.userData.values[$(this).attr('name')] = $(this).val();
				if(vars.userData.values[$(this).attr('name')] == null) {
					vars.userData.values[$(this).attr('name')] = '';	
				}
                /* Handle fix for IE < 10 placeholders */
				if (methods.ie() > 0 && methods.ie() <= 9) {
				    if (vars.userData.values[$(this).attr('name')] == $(this).attr('placeholder')) {
				        vars.userData.values[$(this).attr('name')] = '';
				    }
				}
                //Reset estimator to it's ground state
				if ($('#cart_estimator_form').attr('data-reset') == 'true') {
				    vars.userData.values = {};
				    vars.userData.estimates = {};
				    $('#cart_estimator_form').removeAttr('data-estimated');
				    $('#cart_estimator_form').removeAttr('data-reset');
				    settings.hasEstimated = false;
				}
			});
		},
        //Attach listeners to UI elements
		addListeners : function(element) {
		    var $element = element;
		    var keyUpTimer = null;
		    $('[data-type="estimator_select"]').on('change', function () {
		        $('form#cart_estimator_form [data-btnname="_calculate"]').addClass('processing');
			    methods.updateEstimator();
				if($(this).attr('name') == 'country') {
					vars.userData.estimates.shipping = 'TBD';
					vars.userData.values.shipping = '';
					vars.userData.values.zipcode = '';
					vars.userData.values.province = '';
				}
				methods.initEstimator($element);
		    });
            //Display messaging when entering the Zip Code field
			$('form#cart_estimator_form #estimator_zipcode').on('focus', function () {
			    $('form#cart_estimator_form [data-btnname="_calculate"]').before('<div id="shippingVerifyMessage">' + settings.verifyShippingMessage + '</div>');
			});
            //Remove the messaging then exiting the Zip Code Field
			$('form#cart_estimator_form #estimator_zipcode').on('blur', function () {
			    $('form#cart_estimator_form #shippingVerifyMessage').remove();
			});
            //Handle estimator form submission
			$('form#cart_estimator_form').on('submit', function(e) {
			    e.stopPropagation();
			    $('form#cart_estimator_form [data-btnname="_calculate"]').addClass('processing');
			    settings.hasEstimated = true;
			    $(this).attr('data-estimated', 'true');
			    vars.userData.values.estimateTotal = true;
				methods.updateEstimator();
				methods.initEstimator($element);
				return false;
			});
			$('.country a.nocountry').each(function () {
			    if (typeof Tipped != 'undefined' && typeof Tipped.create == 'function') {
			        Tipped.create(this, $(this).attr('data-tooltip'), { 'showOn': 'click', 'closeButton': global_settings.TOUCH_DEVICE, 'maxWidth': 350 });
			    }
			});
            /* Handle IE < 10 not handling placeholders correctly */
			if (methods.ie() > 0 && methods.ie() <= 9) {
			    $('form#cart_estimator_form input[type="text"]').each(function () {
			        if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
			            $(this).val($(this).attr('placeholder'));
			        }
			    });
			    $('form#cart_estimator_form input[type="text"]').on('focus', function () {
			        if ($(this).val() == $(this).attr('placeholder')) {
			            $(this).val('');
			        }
			    });
			    $('form#cart_estimator_form input[type="text"]').on('blur', function () {
			        if ($(this).val() == '') {
			            $(this).val($(this).attr('placeholder'));
			        }
			    });
			}
		},
        //Test if Country/Territory is US or US Territory
		isUS : function(country) {			
			for (i = 0; i < vars.dataOptions.data.options.USTerritories.length; i++) {
				if (country == vars.dataOptions.data.options.USTerritories[i])
					return true;
			}
			return false;
		},
        //Get HTML for the Estimator based on section
		getSectionHTML : function(section) {
		    var html = '';
		    var label = '';
            //If labeling, we need this place holder for replacement later.
		    if (settings.displaySteps === true) {
		        label = '{L}';
		    }
            //Display Country Dropdown
		    if (section == 'country') {
		        var disabled = '';
		        html += '<div class="country">';
		        if(settings.displaySteps && settings.labelCountry){
		            html +='<label for="estimator_country">' + label + '</label>';
		        }
		        html +='<select name="country" title="Select Country" data-type="estimator_select" data-value="estimator_value" id="estimator_country">';
		        $.each(vars.dataOptions.data.options.countries, function (c, country) {
		            if ($.trim(country.CD) == false) {
		                disabled = 'disabled = "disabled"';
		            } else {
		                disabled = '';
		            }
		            if (!settings.labelCountry) {
		                country.NM = label + ' ' + country.NM;
		            }
		            if (vars.dataOptions.data.values.country == $.trim(country.CD)) {
					    html += '<option value="' + $.trim(country.CD) + '" selected="selected" ' + disabled + '>' + country.NM + '</option>';
					} else {
					    html += '<option value="' + $.trim(country.CD) + '" ' + disabled + '>' + country.NM + '</option>';
					}
				});
		        html += '</select><a class="nocountry" style="cursor:pointer;" data-tooltip="' + settings.noCountryMessage + '" title="Country Not Listed?">Country Not Listed?</a></div>';
				return html;				
		    }
		    //Display Province Dropdown
		    if (section == 'province') {
		        var disabled = '';
		        html += '<div class="province" id="estimator_province">';
		        if (settings.displaySteps && settings.labelProvince) {
		           html +='<label for="estimator_province">' + label + '</label>';
		        }
		        html += '<select name="province" title="Select Province" data-type="estimator_select" data-value="estimator_value" id="estimator_province">';
		        if (!settings.labelProvince) {
		            html += '<option value="">'+label+'</option>';
		        }
		        $.each(vars.dataOptions.data.options.provinces, function (p, province) {
		            if ($.trim(province.CD) == false) {
		                disabled = 'disabled = "disabled"';
		            } else {
		                disabled = '';
		            }
		            if (vars.dataOptions.data.values.province == $.trim(province.CD)) {
		                html += '<option value="' + $.trim(province.CD) + '" selected="selected" ' + disabled + '>' + province.NM + '</option>';
					} else {
		                html += '<option value="' + $.trim(province.CD) + '" ' + disabled + '>' + province.NM + '</option>';
					}
				});
				html += '</select></div>';
				return html;				
		    }
		    //Display Zip Code Field
		    if (section == 'zipcode') {
		        var placeholder = '';
		        html += '<div class="zipcode" id="estimator_zipcode">';
		        if (settings.displaySteps && settings.labelZip) {
		            html += '<label for="estimator_zipcode">' + label + '</label>';
		        } else {
		            placeholder = label;
		        }
		        html += '<input type="text" name="zipcode" id="estimator_zipcode" maxlength="5" placeholder="'+placeholder+'" title="Enter Zip Code" data-value="estimator_value" value="' + vars.dataOptions.data.values.zipcode + '" />';
		        html += '</div>';
				return html;				
		    }
		    //Display Shipping Method Dropdown
		    if (section == 'method') {
		        var disabled = '';
		        html += '<div class="shipping">';
		        if (settings.displaySteps && settings.labelShipping) {
		            html += '<label for="estimator_shipping">' + label + '</label>';
		        }
		        html += '<select name="shipping" title="Select Shipping Method" data-type="estimator_select" data-value="estimator_value" id="estimator_shipping">';
		        if (!settings.labelShipping) {
		            html += '<option value="">'+label+'</option>';
		        }
		       	$.each(vars.dataOptions.data.options.shippingMethods, function (m, method) {
		       	    if ($.trim(method.CD) == false) {
		       	        disabled = 'disabled = "disabled"';
		       	    } else {
		       	        disabled = '';
		       	    }
		       	    if (method.ESTIMATE.replace(/[^\d\.]/g, '') == '0.00') {
		       	        method.ESTIMATE = 'Free';
		       	    }
		       	    if (vars.dataOptions.data.values.shipping == $.trim(method.CD)) {
		       	        html += '<option value="' + $.trim(method.CD) + '" selected="selected" ' + disabled + '>' + method.NM + ', ' + method.ESTIMATE + '</option>';
					} else {
		       	        html += '<option value="' + $.trim(method.CD) + '" ' + disabled + '>' + method.NM + ', ' + method.ESTIMATE + '</option>';
					}
				});
				html += '</select></div>';
				return html;				
			}
		    //Display Promo Code Field
		    if (section == 'promotional') {
		        placeholder = '';
		        html += '<div class="sourcecode">';
		        if (settings.displaySteps && settings.labelPromo) {
		            html += '<label for="estimator_sourcecode">' + label + '</label>';
		        } else {
		            placeholder = label;
		        }
				html += '<input type="text" name="sourcecode" id="estimator_sourcecode" placeholder="'+placeholder+'" title="Enter Promo Code" data-value="estimator_value" value="' + vars.dataOptions.data.values.sourcecode + '" size="32">'
				html += '</div>';
				return html;		
			}
		},
		ie : function () { /* IE version testing for earlier than 10 */
		    var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');
		    while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i>< ![endif]-->',
                all[0]
            );
		    return v > 4 ? v : -1;
		}
	};
	//Constructor
	$.fn.cartEstimator = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.cartEstimator' );
	    }
	};
})(jQuery);
/* END cartEstimator */