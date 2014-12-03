/*
 * Contains cartInfo plugin
 */
(function($) { // Hide scope, no $ conflict
	var settings = {
		cookieValue : 'INLINECARTSUMMARY',
		summaryText : '<span class="label">Items:</span><span class="value">[ITEMS]</span><span class="label">Subtotal:</span><span class="value">[VALUE]</span>',
		noSummaryText : '<span class="label">Items:</span><span class="value">[ITEMS]</span><span class="label">Subtotal:</span><span class="value">[VALUE]</span>',
		beginningTier : '',
		endingTier : '',
		tiers : [{'value':75,'message':'You are [VALUE] away from Free Shipping'}],
		tracked : false,
		endtracked : false
	};
	var uniqueSettings = {
		
	};
	
	var methods = {
		init : function(options) {
			//initial setup
			uniqueSettings = $.extend(uniqueSettings, settings);
			uniqueSettings = $.extend(uniqueSettings, options);
			uniqueSettings.tiers = methods.sortTiers(uniqueSettings.tiers);
		},
		create : function(name, value, days) {
			if (days) {
		        var date = new Date();
		        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		        var expires = "; expires=" + date.toGMTString();
		    }
		    else var expires = "";
		    document.cookie = name + "=" + value + expires + "; path=/";
		},
		read : function(name) {
            c_name = name;
			if (document.cookie.length > 0) {
		        c_start = document.cookie.indexOf(name + "=");
		        if (c_start != -1) {
		            c_start = c_start + c_name.length + 1;
		            c_end = document.cookie.indexOf(";", c_start);
		            if (c_end == -1) {
		                c_end = document.cookie.length;
		            }
		            return unescape(document.cookie.substring(c_start, c_end));
		        }
		    }
		    return "";
		},
		destroy : function(name) {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
		},
		getCartSummary : function() {
			return this.each(function() {
		    	var $element;
		    	$element = $(this);
				var cookieVal = methods.read(uniqueSettings.cookieValue);
				if(cookieVal != null && cookieVal != '') {
					var values = cookieVal.split(',');
					var html = uniqueSettings.summaryText.replace(/\[ITEMS\]/, values[0]).replace(/\[VALUE\]/, '$'+values[1]);
					$element.html(html);
				} else {
					var html = uniqueSettings.noSummaryText.replace(/\[ITEMS\]/, '0').replace(/\[VALUE\]/, '$0.00');	
					$element.html(html);				
				}
			});
			
		},
		captureCode : function(code) {
			if(code) {
				methods.create('source_code',code);
			} else {
				methods.destroy('source_code');
			}
		},
		getTierMessaging : function() {
			return this.each(function() {
		    	var $element;
		    	$element = $(this);
				var cookieVal = methods.read(uniqueSettings.cookieValue);
				if(cookieVal != null && cookieVal != '') {
					var price = decodeURIComponent(cookieVal).split(',')[1];
					if(parseFloat(price).toFixed(2) != 0.00) {
						var showdefault = true;
						$.each(uniqueSettings.tiers, function(t, tier) {
							if(parseFloat(price).toFixed(2) < parseFloat(tier.value)) {
								$element.html(tier.message.replace(/\[VALUE\]/,(parseFloat(tier.value)-parseFloat(price)).toFixed(2)));
								showdefault = false;
								return false;								
							} else {
								if(tier.source_code != undefined) {
									methods.captureCode(tier.source_code);
								} else {
									if(methods.read('source_code') == '') {
										methods.captureCode();
									}
								}
							}
						});
						if(showdefault) {
							$element.html(uniqueSettings.endingTier);
							if(typeof (cmCreateConversionEventTag) === 'function' && !uniqueSettings.tracked && methods.read('source_code') == '') {
								try {
									methods.captureCode('0');
									cmCreateConversionEventTag("Threshold", 1, "Ticker", 0);
									uniqueSettings.tracked = true;
								} catch(err) {
									
								}
							}
							
						}
						
					} else {
						$element.html(uniqueSettings.beginningTier);
					}
				} else {
					$element.html(uniqueSettings.beginningTier);
				}
				if(typeof (cmCreateConversionEventTag) === 'function' && !uniqueSettings.endtracked && typeof (cartTierEndTrack) !== 'undefined' && methods.read('source_code') !== '') {
					try {
						cmCreateConversionEventTag("Threshold", 2, "Ticker", 0);
						uniqueSettings.endtracked = true;
						methods.captureCode();
					} catch(err) {
						
					}
				}
			});
		},
		sortTiers : function(tier) {
			function dynamicSort(a,b) {
				return a.value - b.value;
			}
			return tier.sort(dynamicSort);
		}

	};
	$.cartInfoSetup = function(options) {
		settings = $.extend(settings, options);
		settings.tiers = methods.sortTiers(settings.tiers);
	};
	$.fn.cartInfo = function(method, options) {
		// Method calling logic
	    if ( methods[method] ) {
			if(options) {
				methods.init(options);
			} else {
				uniqueSettings = $.extend(uniqueSettings, settings);
			}
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.cartInfo' );
	    } 
	};
})(jQuery);
/* END cartInfo */