/*
 * Contains cartActions plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var vars = {
		cartdata : null,
		checkoutdata : null,
		addedLineitemid : null,
		adddata : null,
		removedata : null,
		user : 'UNREG',
		estimatedata : null,
		validateCheckoutCallback : null,
		addtype :'add',
		timeToHL: -1
	};
	
	var user;
	
	var settings = {
		cartGatewayURL : '/shoppingcart/gateway?',
		itemValues : {'qty':'1','sku':'','size':''},
		ajaxErrorMessage : 'We\'re sorry but this item is currently out of stock and no longer available.',
		cm: '', //required coremetrics tag
		success: '', //successful add to cart
		checkouterrors: null, //error adding to cart
		carterrors: null, //error adding to cart
		adderrors: null, //error adding to cart
		addToCartCallback : function(){},
		removeFromCartCallback : function(){},
		messageContainer : '#member_welcome',
		validateAddCallback : function() {},
		actionCallback : function(){},
		itemEvent : null,
		callback : function(){}
	};
	var methods = {
		init : function(options) {
			
			
			
			settings = $.extend(settings, options);
				
		},
		updateUser: function () {
            /*
			//set user var
			vars.user = "Unreg";
			//check if user is logged in
			if($.cookie('read','SESSION') !== "" && $(settings.messageContainer).length > 0)
				vars.user = "Reg Auth";
			else if($.cookie('read','SESSION') === "" && $(settings.messageContainer).length > 0)
				vars.user = "Reg Recg";
            */
		    vars.user = "UNREG";
		    //Test if auth tokent already set
		    if (typeof window['authToken'] == 'undefined') {
		        window['authToken'] = {};
		    }
		    if (!window['authToken'].hasOwnProperty('isAuthenticated')) {
		        try {
		            //Get auth 'token' from session service
		            $.getJSON(window.location.protocol + '//' + window.location.host + '/session/', function (token) {
		                window['authToken'] = token.data.user;
		                //Check authentication versus recognized
		                if (window['authToken'].isAuthenticated === true && $(settings.messageContainer).length > 0) {
		                    vars.user = "REG AUTH";
		                } else if (window['authToken'].isAuthenticated !== true && $(settings.messageContainer).length > 0) {
		                    vars.user = "REG RECG";
		                }
		            }).fail(function () {
		                //If there was a failure making the request, log the failure and test if we are at least recognized
		                if ($(settings.messageContainer).length > 0) {
		                    vars.user = "REG RECG";
		                }
		                if (typeof console.log != 'undefined') {
		                    console.log('Error fetching session information: Session Service Unavailable');
		                }
		            });
		        } catch (e) {
		            //If there was an undefined failure, log the failure and test if we are at least recognized
		            if ($(settings.messageContainer).length > 0) {
		                vars.user = "REG RECG";
		            }
		            if (typeof console.log != 'undefined') {
		                console.log('Error fetching session information: ' + e.message);
		            }
		        }
		    } else {
		        //Check authentication versus recognized
		        if (window['authToken'].isAuthenticated === true && $(settings.messageContainer).length > 0) {
		            vars.user = "REG AUTH";
		        } else if (window['authToken'].isAuthenticated !== true && $(settings.messageContainer).length > 0) {
		            vars.user = "REG RECG";
		        }
		    }
		},
		update : function(itemValues, updatedValues, callback) {
			var itemVals = updatedValues;
			
			vars.addtype = 'update';
						
			methods.remove(itemValues.lineitemid, function() {
				delete updatedValues['lineitemid'];
				methods.add(updatedValues, function(data) {
					if(data.success) {
						methods.renderCMTags('update');
						if(typeof(callback) == 'function') {
							callback(data);	
						}
						
					} else {
						var errorData = data;
						methods.add(itemValues, function(data) {
							itemValues.lineitemid = vars.addedLineitemid;
							$.extend(itemVals, {'type':'update','updateItem':itemValues,'errors':errorData.errors});
							$.quickview(itemVals);	
						});
					}
				});
			});
			
			/*methods.remove(itemVals.lineitemid, function(removedata) {
			methods.add(itemVals, function(data) {
				if(data.success) {
						callback(removedata);	
					});
				} else {
					if(typeof(callback) == 'function') {
						callback(data);	
					}
				}
			});
			*/
			/*methods.remove(itemValues.lineitemid, function() {
				delete itemValues['lineitemid'];
				methods.add(itemValues, callback);
			});*/
		},
		getParamURL : function() {
			var itemArray = [];
			$.each(settings.itemValues, function(v, val) {
				itemArray.push(v+'='+val);
			});
			return itemArray.join('&');
		},
		add : function(itemValues, callback){
			$.extend(settings.itemValues, itemValues);
			delete settings.itemValues['lineitemid'];
			settings.adderrors = null;
			$.ajax({
				method : 'GET',
				url: settings.cartGatewayURL + 'action=add&' + methods.getParamURL(),
				cache : false,
				dataType: 'json'
			}).done(function(data) {
				if(typeof(data.data.cart) !== 'undefined') {
					$.each(data.data.cart.lines, function(i, item) {
						var matchItem = false;
						if(typeof(vars.adddata) !== 'undefined' && vars.adddata !== null && typeof(vars.adddata.data.cart) !== 'undefined') {
							$.each(vars.adddata.data.cart.lines, function(cart, cartItem) {
								if(cartItem.LINEITEMID == item.LINEITEMID) {
									matchItem = true;
									return false;	
								}
							});
						} else {
							matchItem = false;	
						}
						if(!matchItem) {
							vars.addedLineitemid = item.LINEITEMID;
							return false;	
						}
					});
					methods.renderCMTags('add');
				}
				vars.adddata = data;
				vars.cartdata = data;
				if(typeof(callback) === 'function') {
					settings.validateAddCallback = callback;
				}
				methods.validateAdd();
				if(vars.addtype !== 'update') {
					settings.addToCartCallback(data);
				}
			}).error(function(jqXHR, textStatus, errorThrown) {
				if(settings.adderrors == null) {
					settings.adderrors = [];
				}
				settings.adderrors.push({'type':'InternalServerError','value':'InternalServerError'});
				methods.ajaxError('add', jqXHR, textStatus, errorThrown);
			});			
		},
		remove : function(lineItemId, callback){
			var $lineItemId = '';
			if(lineItemId) {
				$lineItemId = lineItemId;
			}
			if($lineItemId !== '') {
				$.ajax({
					method : 'GET',
					url: settings.cartGatewayURL + 'action=delete&lineItemId=' + $lineItemId,
					cache : false,
					dataType: 'json'
				}).done(function(data) {					
					if(typeof(callback) == 'function') {
						settings.removeFromCartCallback = callback;
					}
					vars.removedata = data;
					vars.cartdata = data;
					settings.removeFromCartCallback(data);
				}).error(function(jqXHR, textStatus, errorThrown) {
					if(settings.adderrors == null) {
						settings.carterrors = [];
					}
					settings.carterrors.push({'type':'InternalServerError','value':'InternalServerError'});
					methods.ajaxError('cart', jqXHR, textStatus, errorThrown);
				});
			}
			
		},
		clearAddError : function(num) {
			settings.adderrors.splice(num,1);
		},
		clearCartError : function(num) {
			settings.carterrors.splice(num,1);
		},
		clearCheckoutError : function(num) {
			settings.checkouterrors.splice(num,1);
		},
		getAddErrors : function() {
			
			if(settings.adderrors == null) {
				settings.adderrors = [];
				
				//Out Of Stock
				if(vars.adddata.errors.length > 0) {
					$.each(vars.adddata.errors, function(i, item){
						settings.adderrors.push({'type':item.REPORTINGCATEGORYID,'value':item.DETAIL});
					});
				}
				
			}
			return settings.adderrors;
		},
		getCartErrors : function() {
			
			if(settings.carterrors == null) {
				settings.carterrors = [];
				//Out Of Stock
				if(vars.cartdata.data.persistentCart.outOfStockLines.length > 0) {
					$.each(vars.cartdata.data.persistentCart.outOfStockLines, function(i, item){
						settings.carterrors.push({'type':'outOfStock','value':item});
						methods.renderCMTags('oos');
					});
				}
				
				//Persistent Merged
				if(vars.cartdata.data.persistentCart.wasMerged) {
					settings.carterrors.push({'type':'persistentCartMerged','value':''});
				}
				
				//ineligbleLines
				if(vars.cartdata.data.persistentCart.ineligbleLines.length > 0) {
					$.each(vars.cartdata.data.persistentCart.ineligbleLines, function(i, item){
						settings.carterrors.push({'type':'ineligbleLines','value':item});
					});
				} 
				
				//sharedCart Merged
				if(vars.cartdata.data.sharedCart.wasMerged) {
					settings.carterrors.push({'type':'sharedCartMerged','value':''});
				}
			}
			return settings.carterrors;
		},
		getCheckoutErrors : function(skip) {
			
			if(settings.checkouterrors == null || skip) {
				settings.checkouterrors = [];
				
				//Out Of Stock
				if(vars.checkoutdata.data.inventory.outOfStockLines.length > 0) {
					$.each(vars.checkoutdata.data.inventory.outOfStockLines, function(i, item){
						settings.checkouterrors.push({'type':'outOfStock','value':item});
					});
					
				}
				
				//Launch Queue
				if(vars.checkoutdata.data.queue.containsLaunchItems && vars.checkoutdata.data.queue.checkoutQueueEnabled && vars.checkoutdata.data.queue.checkoutTimeSecondsUntil > 0) {
					settings.checkouterrors.push({'type':'launchQueue','value':vars.checkoutdata.data.queue});
					methods.renderCMTags('hotqueue');
				}
				
			}
			return settings.checkouterrors;
		},
		startLaunchTimer : function(element) {
			var $element = element;
			if(vars.timeToHL < 0) {
				methods.checkout();
				return;	
			} else {
					
				var secTil = vars.timeToHL % 60;
				var minTil = parseInt(vars.timeToHL / 60) % 60;
				var hourTil = parseInt(vars.timeToHL / (60 * 60));
				
				var checkoutTime = new Date($element.attr('data-checkoutTime'));
				var sec = checkoutTime.getSeconds();
				var min = checkoutTime.getMinutes();
				var hour = checkoutTime.getHours();
				var timeofday = 'am';				
				
				if(hour > 12) {
					timeofday = 'pm';
					hour = hour - 12;	
				} else if(hour == 0) {
					hour = 12;	
				}
				if(sec < 10) {
					sec = '0' + sec;	
				}
				if(min < 10) {
					min = '0' + min;	
				}
				if(hour < 10) {
					hour = '0' + hour;	
				}
				
				$element.html('<span class="estimatedTime" data-timeofday="' + timeofday + '" title="' + hour + ':' + min + ':' + sec + '"><span class="hours">' + hour + '</span><span class="minutes">' + min + '</span><span class="seconds">' + sec + '</span></span>');
				$element.append('<span class="time" title="' + hourTil + ':' + minTil + ':' + secTil + '"><span class="hours">' + hourTil + '</span><span class="minutes">' + minTil + '</span><span class="seconds">' + secTil + '</span></span>');
				
				vars.timeToHL -= 1;
				//$element.attr('data-checkouttimesecondsuntil', $element.attr('data-checkouttimesecondsuntil') - 1);
				//$element.append('<span class="launch_copy">'+settings.launchCopy+'</span>');
				
				clearTimeout([window].checkoutLaunchTimerID);
				
				[window].checkoutLaunchTimerID = setTimeout(function() {
					methods.startLaunchTimer($element);
				}, 1000);
			}

		},
		launchTimer : function() {
			$('[data-checkouttimesecondsuntil]').each(function() {
				var $element = $(this);
				vars.timeToHL = parseInt($(this).attr('data-checkouttimesecondsuntil'));
				if(vars.timeToHL > 0) {
					methods.startLaunchTimer($element);	
				}
			});
		},
		validateAdd : function(callback) {
			$('.attention[data-message]').remove();
			if(methods.getAddErrors().length > 0) {
				if(vars.addtype !== 'update') {
					methods.displayAttention('add', methods.getAddErrors()[0].type, methods.getAddErrors()[0].value);
				} else {
					settings.validateAddCallback(vars.adddata);
				}
			} else {
				if(typeof(settings.validateAddCallback) === 'function') {
					settings.validateAddCallback(vars.adddata);
				}
			}
		},
		validateCart : function(callback) {
			$('.attention[data-message]').remove();
			if(methods.getCartErrors().length > 0) {
				methods.displayAttention('cart', methods.getCartErrors()[0].type, methods.getCartErrors()[0].value);
			}
		},
		validateCheckout : function(callback) {
			$('.attention[data-message]').remove();
			if(methods.getCheckoutErrors().length > 0) {
				methods.displayAttention('checkout', methods.getCheckoutErrors()[0].type, methods.getCheckoutErrors()[0].value);
			} else {
				if(typeof(vars.validateCheckoutCallback) === 'function') {
					vars.validateCheckoutCallback();
					vars.validateCheckoutCallback = null;
					//location.href = 'https://'+location.hostname+'/checkout/';
				}
			}
		},
		ajaxError : function(section, jqXHR, textStatus, errorThrown) {
			methods.displayAttention(section,'errorThrown',settings.ajaxErrorMessage);
		},
		displayAttention: function (section, type, value) {
			var html = '<div class="attention" data-message="'+type+'" data-section="'+section+'">';
				
			html += '<div class="fade"></div>';
			
			html += '<div class="container">';
			
				html += '<div class="inner" data-message="'+type+'" data-section="'+section+'">';
			
					html += '<div class="title"></div>'
					
					html += '<div class="message"></div>';
					html += '<div class="submessage"></div>';
					
					if(value != '') {
					
						if(type == 'launchQueue') {
						
							html += '<div class="timer" data-checkoutTime="'+value.checkoutTime+'" data-checkoutTimeSecondsUntil="'+value.checkoutTimeSecondsUntil+'" data-queueToken="'+value.queueToken+'"></div>';
						
						} else if(typeof(value) === 'string') {
							
							html += '<div class="message_details">'+value+'</div>';
						} else {
							
							html += '<ul class="items">';
							
							var productName = value.PRODUCTNAME;
							
							productName = $.trim(productName.toString().toLowerCase());
							productName = productName.replace(/'/ig,'');
							productName = productName.replace(/ +/ig,'-');
							productName = productName.replace(/-+/ig,'-');
							productName = productName.replace(/_+/ig,'-');
		   					
							var $lineItem = $('#cart [data-lineitemid="'+value.LINEITEMID+'"]');
							
							html += '<li><span class="product_image"><img src="http://images.champssports.com/pi/'+value.SKU+'/large/'+productName+'" border="0" / ></span><span class="product_info"><span class="product_title">'+value.PRODUCTNAME+'</span><span class="product_size">'+$lineItem.attr('data-size')+'</span><span class="product_number">'+$lineItem.attr('data-sku')+'</span><span class="product_color"><span class="color">'+value.COLOR+'</span><span class="width">'+value.WIDTH+'</span></span><a href="javascript:void(0);" data-sku="'+value.SKU+'" data-lineitemid="'+value.LINEITEMID+'" data-model="'+value.MODEL_NBR+'" class="button" data-btnName="_product" title="View Other Styles"><span></span></a></span></li>';
							
							html += '</ul>';
						}
					}
					
					if(type !== 'launchQueue') {
						html += '<div class="buttons">';
						
						if(typeof(value) !== 'string') {
						
						    html += '<a href="javascript:void(0);" data-sku="' + value.SKU + '" data-lineitemid="' + value.LINEITEMID + '" data-model="' + value.MODEL_NBR + '" class="button" title="Check a local store for this product" data-btnName="_checkstores"><span></span></a>';
							
						}

						html += '<a href="javascript:void(0);" class="button cta_button" title="Continue Button" data-btnName="_continue"><span></span></a>';
						
						
						html += '</div>';
					}
					
				html += '</div>';
			
			html += '</div>';
			
			html += '</div>';
			
			$('body').append(html);
			$('.attention .container').css({
				'position' : 'absolute',
				'top' : $(window).scrollTop(),
				'left' : 0
			});
			if(type == 'launchQueue') {
				methods.launchTimer();
			}
			$('[data-section="checkout"] a[data-btnName="_checkstores"]').on('click', function(e) {
				//e.stopPropagation();
				methods.clearCheckoutError(0);
				try {
					$('ul.cart li[data-lineitemid="'+$(this).attr('data-lineitemid')+'" a.remove').click();
					$.quickview({'sku':$(this).attr('data-sku'),'model':$(this).attr('data-model'),'showISA':true});
					$('.attention[data-message]').remove();
				} catch(err) {}
			});
			$('[data-section="checkout"] a[data-btnName="_product"]').on('click', function() {
				methods.clearCheckoutError(0);
				try {
					$('ul.cart li[data-lineitemid="'+$(this).attr('data-lineitemid')+'" a.remove').click();
					$.quickview({'sku':$(this).attr('data-sku'),'model':$(this).attr('data-model')});
					$('.attention[data-message]').remove();
				} catch(err) {}
			});
			$('[data-section="add"] a[data-btnName="_continue"]').on('click', function() {
				methods.clearAddError(0);
				methods.validateAdd();
				try {
					$('ul.cart li[data-lineitemid="'+$(this).attr('data-lineitemid')+'" a.remove').click();
					$.quickview({'sku':$(this).attr('data-sku'),'model':$(this).attr('data-model')});
				} catch(err) {}
			});
			$('[data-section="checkout"] a[data-btnName="_continue"]').on('click', function() {
				methods.clearCheckoutError(0);
				methods.validateCheckout();	
			});
			$('[data-section="cart"] a[data-btnName="_continue"]').on('click', function() {
				methods.clearCartError(0);
				methods.validateCart();	
			});
			
			settings.actionCallback(section, type, value);
		},
		getCartInfo : function(callback, refresh) {
			if(typeof(callback) === 'function') {
				if(vars.cartdata != null && !refresh) {
					callback(vars.cartdata);
				} else {
					$.ajax({
						method : 'GET',
						dataType : 'json',
						cache : false,
						url: settings.cartGatewayURL + 'action=get'
					}).done(function(data) {
						vars.cartdata = data;
						callback(vars.cartdata);
					}).error(function(jqXHR, textStatus, errorThrown) {
						if(settings.adderrors == null) {
							settings.carterrors = [];
						}
						settings.carterrors.push({'type':'InternalServerError','value':'InternalServerError'});
						methods.ajaxError('cart', jqXHR, textStatus, errorThrown);
					});
				}
			}
		},
		getEstimateData : function(data, callback) {
			$.ajax({
				method : 'GET',
				url: settings.cartGatewayURL + 'action=estimate',
				cache : false,
				data : data,
				dataType: 'json'
			}).done(function(data) {
				vars.estimatedata = data;
				if(typeof(callback) == 'function') {
					callback(vars.estimatedata);
				}
			}).error(function(jqXHR, textStatus, errorThrown) {
				if(settings.adderrors == null) {
					settings.carterrors = [];
				}
				settings.carterrors.push({'type':'InternalServerError','value':'InternalServerError'});
				methods.ajaxError('cart',jqXHR, textStatus, errorThrown);
			});
		},
		renderCMTags : function(action) {
			methods.updateUser();
			var catID = vars.user;
			var pageID = vars.user;

			switch (action){
				case "add":
					catID += " CART VIEW ADD";
					pageID += " CART VIEW: ADD TO CART";
					break;
				case "update":
					catID += " CART UPDT";
					pageID += " UPDATE CART";
					break;
				case "empty":
					catID += " CART EMPTY";
					pageID += " VIEW CART: EMPTY";
					break;
				case "closed":
					catID += " CART CLOSED";
					pageID += " VIEW CART: CLOSED";
					break;
				case "oos":
					//remove " AUTH" from cm tag
					catID = catID.replace(" AUTH","");
					pageID = pageID.replace(" AUTH","");
					catID += " CART OOS";
					pageID += " CART: ERROR: ITEM OUT OF STOCK";
					shopAction=false;
					break;
				case "inv":
					catID += " CART ER INV API";
					pageID += " CART: ERROR: INVENTORY CHECK REQUIRED";
					break;
				case "hotqueue":
					catID += " Cart Ckout Queue";
					pageID += " Cart: Checkout Queue";
					shopAction=false;
				case "wishListItemadd":
					catID  = catID;
					pageID = pageID;
					break;
				case "catalogquickorderitemadded":
					catID  += " CART VIEW";
					pageID += " CART VIEW: ADD TO CART";
					break;
				default:
					catID += " CART VIEW";
					pageID += " CART VIEW";
			}

			cmCreatePageviewTag(pageID, catID, null, null);
		},
		checkout : function(callback) {
			settings.checkouterrors = null;
			$.ajax({
				method : 'GET',
				url: settings.cartGatewayURL + 'action=checkout',
				cache : false,
				dataType: 'json'
			}).done(function(data) {
				vars.checkoutdata = data;
				if(typeof(callback) == 'function'){
					vars.validateCheckoutCallback = callback;
				}
				methods.validateCheckout();
			}).error(function(jqXHR, textStatus, errorThrown) {
				methods.ajaxError('checkout',jqXHR, textStatus, errorThrown);
			});
		}
	};
	
	$.cartActions = function(method) {
		// Method calling logic
		if(typeof(jqueryCartActionsSettings) !== 'undefined'){
			try {
				settings = $.extend(settings, jqueryCartActionsSettings);	
			} catch(err){}
		}
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.cartActions' );
	    } 
	};
})(jQuery);
/* END cart */