/*
 * Contains cart plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var vars = {
		data : null,
		hasSFS : false,
		hasBORIS : false,
		skuArray : [],
		itemTotal : 0,
		element : null,
		activeBundle : '',
		editingLineitemid: null,
		user : 'UNREG',
		cm_clientID : '',
		cm_categoryID : 'UNREG',
		cm_pageID : 'UNREG',
		BORISEnabled: 'false'
	};
	
	var settings = {
		type : 'normal',
		elem : null,
		initCall : true,
		cartEdited : false,
		editedItem: new Object(),
		action : 'view',
		trackTagging : true,
		company : 'champssports',
		lineItemTemplate : '[product.image]<span class="product_info">[product.title][product.price][product.size][product.sku][product.color][product.qty]</span>[product.sfsmessage][product.pdp_fulfillmenttype][product.storepickup]',
		itemValues : {'qty':'1','sku':'','size':''},
		data : null,
		refresh : false,
		cm_clientID : '',
		promo_id : 6,
		width : '480',
		loadingHTML : 'Fetching Data',
		itemEvent : null,
		sku: '', //Product Number
		selected_size : null,
		qty : 1,
		pdp_fulfillmentType : 'SHIP_FROM_HOME',
		SFSMessage: ' - Only ships to lower 48 states',
		backorderMessage: '<span class="message" id="boNoticeMessage">Back-ordered, Expected to Ship {DATE}</span>',
		freeShippingMessage: '<span title="Item is eligible for FREE Shipping. View details." class="free-shipping-icon info_icon" data-tooltip="We offer FREE SHIPPING on thousands of items every day! Look for the &quot;Free Shipping&quot; indicator on all eligible merchandise. Shipping will automatically be deducted at checkout. *Please note: This offer is valid only on eligible items, and does not apply to in-store orders. This offer is limited to standard delivery within the 48 contiguous US states and APO/FPO addresses. Excludes bulk orders and drop ships. Entire order must ship to a single address. Customer is responsible for shipping costs on returned merchandise. May not be used toward purchase of Gift Cards or team orders. Promotion may be modified or terminated at any time. Certain restrictions and exclusions may apply."></span>',
		storeNumber: 0,
		changeStore : false,
		storeCostOfGoods : null,
		updateCallback : function(){},
		addToCartCallback : function(){},
		messageContainer : '#member_welcome',
		removeFromCartCallback : function(){},
		checkoutCallback : function(){},
		checkoutPayPalCallback : function() {},
		callback : function(){}
	};
	var methods = {
		init : function(options) {
			
			if(typeof(jqueryCartSettings) !== 'undefined'){
				try {
					settings = $.extend(settings, jqueryCartSettings);	
				} catch(err){}
			}
			settings = $.extend(settings, options);
			//set user var
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
			            if($(settings.messageContainer).length > 0) {
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
            /*
			//check if user is logged in
			if($.cookie('read','SESSION') !== "" && $(settings.messageContainer).length > 0)
				vars.user = "Reg Auth";
			else if($.cookie('read','SESSION') === "" && $(settings.messageContainer).length > 0)
				vars.user = "Reg Recg";
			*/
			//initial setup
			 return this.each(function() {
		    	var $element;
		    	$element = $(this);
				settings.elem = $element;
				$element.width(settings.width);
				if(settings.trackTagging) {
					$element.html('<div id="cart_loading">'+settings.loadingHTML+'</div>');
					methods.initCart($element, true);
				}
			 });
		},
		initCart : function(element, refresh) {
			settings.refresh = refresh;
			window.validateProduct = function() {
				return "";
			};
			window.showBubble = function(message) {
				console.log("Show Bubble");
			}
			window.hideBubble = function(message) {
				console.log("Hide Bubble");
			}
			window.loadBORISWidget = function() {
			}
			if(settings.data == null) {
				element.html($.cartActions('getCartInfo',function(data){
					vars.data = data;
					methods.createCart(element);
				}, settings.refresh));
			} else {
				vars.data = settings.data;
				settings.data = null;
				methods.createCart(element);
			}
			
		},
		createCart : function(element) {
			settings.initCall = true;
			vars.data.data.cart.lines.reverse();
			//methods.initCart($element, settings.refresh);
			settings.checkoutPayPalCallback = function() {
				$.cartActions('getCartInfo', function(cartdata) {
					if(cartdata.data.cart.lines.length > 0){
						document.location='https://'+location.hostname+'/checkout/paypalExpress.cfm';
					} else  {
						showCart(true, true);
					}	
				}, true);
			}
			$.cartActions('validateCart');
						
			var lineItems = '<ul class="cart">';
			
			$.each(vars.data.data.cart.lines, function(l, line) {
				if(vars.data.data.cart.lines[l].FULFILLMENTTYPE != 'SHIP_TO_HOME') {
					vars.hasBORIS = true;	
				}
				lineItems += methods.getLineItem(l);
				vars.itemTotal += parseInt(vars.data.data.cart.lines[l].QTY);
			});
			
			lineItems += '</ul>';
			
			methods.displayCart(element, lineItems);
			
			element.width('auto');
			
			var data = {'promo_id':settings.promo_id,'product_id':vars.skuArray.join('|')};
			
			if(settings.trackTagging) {
				$.conversant({'data':data});
				settings.trackTagging = false;
			}
			
			vars.skuArray = [];
			
			settings.callback();
			vars.itemTotal = 0;
			settings.refresh = false;
			vars.hasBORIS = false;
		},
		getSectionHTML : function(section, line) {
			var html = '';
			if(section == 'image') {
			    var title = $.trim(vars.data.data.cart.lines[line].PRODUCTNAME.toString().toLowerCase());
			    var imageTitle = title;
				title = title.replace(/'/ig,'');
				title = title.replace(/ +/ig,'-');
				title = title.replace(/-+/ig,'-');
				title = title.replace(/_+/ig,'-');
				html += '<a href="javascript:void(0);" class="product_image" title="'+imageTitle+'"><img src="//images.champssports.com/pi/'+vars.data.data.cart.lines[line].SKU+'/large/'+title+'" border="0" alt="'+imageTitle+'" / ></a>';
				return html;
				
			}
			if(section == 'items') {
				
				html += '<div class="items_in_cart">'+vars.itemTotal+'</div>';
				return html;
				
			}
			if(section == 'qty') {
				if(vars.data.data.cart.lines[line].ISLAUNCHSKU === 'Y') {
					html += '<div class="static_qty">'+vars.data.data.cart.lines[line].QTY+'</div>';
				} else {
					//QUANTITY
					html = '<span class="product_quantity">';
					html += '<a href="javascript:void(0);" class="subtract_quantity" title="Decrease Quantity">-</a>';
					html += '<input type="tel" id="quantity_'+vars.data.data.cart.lines[line].SKU+'" size="3" maxlength="2" name="quantity" readonly="readonly" value="'+vars.data.data.cart.lines[line].QTY+'">';
					html += '<a href="javascript:void(0);"class="add_quantity" title="Increase Quantity">+</a>';
					html += '</span>';
				}
				return html;
			}
			if(section == 'subtotal') {
				
				html += '<div class="subtotal">'+parseFloat(vars.data.data.cart.subtotal).toFixed(2)+'</div>';
				return html;
				
			}
			if(section == 'price') {
				
				if(parseFloat(vars.data.data.cart.lines[line].LISTPRICE).toFixed(2) > parseFloat(vars.data.data.cart.lines[line].DISCOUNTPRICE).toFixed(2) || vars.data.data.cart.lines[line].CARTPROMOID != '') {
					html += '<span class="sale_product"><span class="price">' + parseFloat(vars.data.data.cart.lines[line].LISTPRICE).toFixed(2) + '</span><span class="sale_price">' + parseFloat(vars.data.data.cart.lines[line].DISCOUNTPRICE).toFixed(2) +'</span></span>';
				} else {
					html += '<span class="price">' + parseFloat(vars.data.data.cart.lines[line].DISCOUNTPRICE).toFixed(2) + '</span>'
				}
				return html;
				
			}
			if(section == 'title') {
				
				html += '<a href="javascript:void(0);" class="product_title">'+vars.data.data.cart.lines[line].PRODUCTNAME+'</a>';
				return html;
				
			}
			if(section == 'size') {
				if(typeof(vars.data.data.cart.lines[line].SIZE) !== 'undefined' && $.trim(vars.data.data.cart.lines[line].SIZE) !== '') {
					html += '<span class="product_size">'+vars.data.data.cart.lines[line].SIZE+'</span>';
				}
				return html;
				
			}
			if(section == 'sku') {
				
				html += '<span class="product_sku">'+vars.data.data.cart.lines[line].SKU+'</span>';
				return html;
				
			}
			
			if(section.toLowerCase() == 'sfsmessage'){
				//sfsmessage
				html += '<div data-info="sfsmessage" data-sfsmessage="false"><span>'+settings.SFSMessage+'</span></div>';
				return html;
			}		
			//Cart Messaging
			if (section.toLowerCase() == 'cartmessaging') {
			    var messages = '';

                //Backorder
			    if (vars.data.data.cart.lines[line].AVAILABILITYSTATUS.toLowerCase() == 'backordered' && 
                    (vars.data.data.cart.lines[line].FULFILLMENTTYPE == 'SHIP_TO_HOME' || vars.data.data.cart.lines[line].FULFILLMENTTYPE == 'SEND_TO_STORE')) {
			        messages += settings.backorderMessage.replace('{DATE}', vars.data.data.cart.lines[line].BACKORDERDATE);
			    }
			    if (messages != '') {
			        html += '<div data-info="cartmessages">' + messages + '</div>';
			    }
                //
                return html;
			}

			if(section == 'storepickup') {
				if(vars.data.data.cart.lines[line].STORENUMBER !== '0') {
					html += '<span class="storename" data-storenumber="'+vars.data.data.cart.lines[line].STORENUMBER+'">';
					
					html += '<span data-text="store_pickup_message"></span>';
					
					html += '<span class="store_location"';
					
					$.each(vars.data.data.storeInfo[vars.data.data.cart.lines[line].STORENUMBER], function(d, data) {
						html += ' data-'+d+'="'+data+'"';
					});
					
					html += '></span>';
					
					html += '<a href="javascript:void(0);" class="lbl_storepickup" data-text="change_store" title="Change Store Pickup Location"><span></span></a>';
				
					html += '</span>';
				
					vars.data.data.storeInfo[vars.data.data.cart.lines[line].SKU]
				}
				return html;
			}
			
			if(section == 'color') {
				
				html += '<span class="product_color">'+vars.data.data.cart.lines[line].COLOR+'</span>';
				return html;
				
			}
			if (section.toLowerCase() == "pdp_fulfillmenttype") {
			    var hideIntangible = '';
			    if (vars.data.data.cart.lines[line].ISINTANGIBLE == true) {
			        hideIntangible = ' intangible';
			    } else {
			        hideIntangible = '';
			    }
				if(vars.data.data.cart.lines[line].SHIPTOSTORE_ELIGIBLE.toLowerCase() != 'n') {
					html += '<form id="shipform_'+vars.data.data.cart.lines[line].LINEITEMID+'">';
					html += '<div class="delivery'+hideIntangible+'" data-info="product_delivery" data-fulfillmenttype="'+vars.data.data.cart.lines[line].FULFILLMENTTYPE+'">';
						html += '<div id="dm_shiptohome">';
							html += '<span class="radio_btn">';
							
								html += '<input id="radioHomeShipOption_'+vars.data.data.cart.lines[line].LINEITEMID+'" name="radioShipOption_'+vars.data.data.cart.lines[line].LINEITEMID+'" value="shiptohome" type="radio"';
								
								if(vars.data.data.cart.lines[line].FULFILLMENTTYPE != 'PICKUP_IN_STORE' && vars.data.data.cart.lines[line].FULFILLMENTTYPE != 'SEND_TO_STORE') {
									html += ' checked="checked"';	
								}
								
								html += ' />';
							
							html += '</span>';
							html += '<label id="lbl_shiptohome" class="lbl_shiptohome" for="radioHomeShipOption_'+vars.data.data.cart.lines[line].LINEITEMID+'">';
								html += '<span data-image="ship-truck"></span>';
								html += '<span class="pdp_sprite" data-image="radio_btn"></span>';
								html += '<span data-text="fulfillmenttype">';
									if(vars.data.data.cart.lines[line].SHIPCHARGETYPE == 'FREE_STANDARD_SHIPPING') {
										html += '<div id="pdp_freeShipping">';
										html += '<div class="black"><span class="red" data-message="free_shipping"></span>'+settings.freeShippingMessage+'</div>';
										html += '</div>';
									}
								html += '</span>';
							html += '</label>';
						html += '</div>';
						html += '<div id="dm_storepickup">';
							html += '<span class="radio_btn">';
								
								html += '<input id="radioStoreShipOption_'+vars.data.data.cart.lines[line].LINEITEMID+'" name="radioShipOption_'+vars.data.data.cart.lines[line].LINEITEMID+'" value="storepickup"';
								
								if(vars.data.data.cart.lines[line].FULFILLMENTTYPE !== 'SHIP_TO_HOME' && vars.data.data.cart.lines[line].FULFILLMENTTYPE !== 'SHIP_FROM_STORE') {
									html += ' checked="checked"';	
								}
								
								html +=' type="radio" />';
								
							html += '</span>';
							html += '<label style="opacity: 1;" id="lbl_storepickup" class="lbl_storepickup" for="radioStoreShipOption_'+vars.data.data.cart.lines[line].LINEITEMID+'">';
								html += '<span data-image="ship-store"></span>';
								html += '<span class="pdp_sprite" data-image="radio_btn"></span>';
								html += '<span data-text="fulfillmenttype">';
								html += '<div id="storepickup_msg"><span class="small_link"><span id="deliveryMethod_link" title="Find A Store To Pickup Order At"></span></span></div>';
								html += '</span>';
							html += '</label>';
						html += '</div>';
					html += '</div>';
					html += '</form>';
				} 
				return html;
			}
		},
		getLineItem : function(line) {
			var sfs = 'false';
			if(vars.data.data.cart.lines[line].INSTOREAVAILABILITYSTATUS == "IN STOCK" && vars.data.data.cart.lines[line].AVAILABILITYSTATUS == 'OUTOFSTOCK') {
				sfs = 'true';
				vars.hasSFS = true;
			}
			var showBundle = false;
			var html = '<li data-sku="'+vars.data.data.cart.lines[line].SKU+'" data-model="'+vars.data.data.cart.lines[line].MODEL_NBR+'"'
			            + ' data-instore="'+vars.data.data.cart.lines[line].SHIPTOSTORE_ELIGIBLE+'" data-lineitemid="'+vars.data.data.cart.lines[line].LINEITEMID+'"'
		                + ' data-qty="'+vars.data.data.cart.lines[line].QTY+'" data-size="'+vars.data.data.cart.lines[line].SIZE.toString()+'"'
		                + ' data-fulfillmentType="'+vars.data.data.cart.lines[line].FULFILLMENTTYPE+'" data-storeNumber="'+vars.data.data.cart.lines[line].STORENUMBER+'"'
		                + ' data-storeCostOfGoods="' + vars.data.data.cart.lines[line].STORECOSTOFGOODS + '" data-sfs="' + sfs + '"'
		                + ' data-boris="' + vars.data.data.cart.lines[line].BORIS_ELIGIBLE + '" data-available="' + vars.data.data.cart.lines[line].AVAILABILITYSTATUS + '"';
			
					if(vars.activeBundle != vars.data.data.cart.lines[line].CARTPROMOID && vars.data.data.cart.lines[line].CARTPROMOID != '') {
							html += ' data-bundle="start"';
							showBundle = true;
					} else if(vars.activeBundle == vars.data.data.cart.lines[line].CARTPROMOID && vars.data.data.cart.lines[line].CARTPROMOID != '') {
							html += ' data-bundle="additional"';
					}
					vars.activeBundle = vars.data.data.cart.lines[line].CARTPROMOID;
			
					html += '>';
					html += '<a href="javascript:void(0);" class="button remove" data-btnType="remove" title="Remove Item From Cart"><span></span></a>'
					
					if(showBundle) {
						html += '<div class="bundle_title"><div class="label"></div><a href="/XYPromo/model:'+vars.data.data.cart.lines[line].MODEL_NBR+'/sku:'+vars.data.data.cart.lines[line].SKU+'/?xyMessage=back">'+vars.data.data.cart.lines[line].PROMOTITLE+'</a></div>';	
					}
					
					html += '<div class="lineitem">'+ settings.lineItemTemplate.replace(/(\[product\.)([^\]]*)(\])/gi, function(m, p1, section, p3){return methods.getSectionHTML(section, line);}) + '</div>';
			html += '</li>';
			vars.skuArray.push(vars.data.data.cart.lines[line].SKU);
			return html;
		},
		isaCartCallback: function (sku, size, qty, storeNumber, fulfillmentType, storeCostOfGoods) {
			if(fulfillmentType != 'SHIP_TO_HOME') {
				methods.conversionEventTag('Shopping Cart','Change Store');
			}
			methods.updateItem(sku, size, qty, storeNumber, fulfillmentType, storeCostOfGoods, vars.editingLineitemid, function(){methods.initCart(settings.elem, true)});
			
		},
		updateItem : function(sku, size, qty, storeNumber, fulfillmentType, storeCostOfGoods, lineitemid, callback) {
			settings.sku = sku;
			settings.selected_size = size;
			settings.qty = qty;
			settings.storeNumber = storeNumber;
			settings.pdp_fulfillmentType = fulfillmentType;
			settings.storeCostOfGoods = storeCostOfGoods;
			
			/*switch (fulfillmentType) {
			case "PICKUP_IN_STORE":
			case "SEND_TO_STORE":
					$('#product_form').attr('action', replaceURL($('#product_form').attr('action'), 'cm', 'ISA PICKUPHERE'));
					break;
			case "SHIP_TO_HOME":
					$('#product_form').attr('action', replaceURL($('#product_form').attr('action'), 'cm', 'ISAADDTOCART'));
					break;
			}*/

			$.cartActions('update', settings.editedItem, {'qty':settings.qty,'sku':settings.sku,'size':settings.selected_size,'fulfillmentType':settings.pdp_fulfillmentType,'storeNumber':settings.storeNumber,'storeCostOfGoods':settings.storeCostOfGoods,'lineitemid':lineitemid}, function(data){
				settings.addToCartCallback(data);
				settings.cartEdited = true;
				if(typeof(callback) === 'function'){callback();}
			});
			return false;
		},
		// Loads Recommendations(MyBuys)
		getRecommendations : function(element) {
			if(typeof(mybuys) !== 'undefined') {
				
				var skus = [];
				
				$.each(vars.data.data.cart.lines, function(i, item) {
					mybuys.addCartItemQtySubtotal(item.SKU,item.QTY,item.PRICE);
				});
				
				var mybuyssettings = {
					'pageType' : 'SHOPPING_CART',
					'zone':'1',
					'pt' : 'cart',
					'id' : 'cart_',
					'set' : {'amount':vars.data.data.cart.subtotal},
					'callback':function(data){$('.recommendations .content a').off('click');$('.recommendations .content a').on('click', function(){
						$.quickview({'sku':$(this).attr('data-sku')});
						try {
							eval($(this).attr('data-trackurl'));
						} catch(err) {}
						return false;
						
					})
					if(typeof(settings.recommendCallback) == 'function') {
							settings.recommendCallback();
						}
					}
				}
				
				$('#cart_recommendations .content').recommendations(mybuyssettings)
				
			}
		},
		updateHLSKU : function(sku) {
			// sku,qty|sku,qty
			var hlincart = readCookie("HLCOUNT");
			if (hlincart != null) {
				var hlitems = decodeURIComponent(hlincart).split( "|" );
				for (var e = 0; e < hlitems.length; e++) {
					var hlitem = hlitems[ e ].split(":");
					if (hlitem[ 0 ] == sku) { 
						hlitem[1] = parseInt(hlitem[1]) - 1;
						hlitems[ e ] = sku + ':' + hlitem[1];
					}
					
				}
				$.cookie('create', 'HLCOUNT', encodeURIComponent(JSON.stringify(hlitems.join('|'))));
			}
			return 0
		},
	
		// Add listener for labels
		addRadioListener : function(container) {
		   $("input:checked").each(function(index) {
				$("label[for='" + $(this).attr("id") + "']").addClass('radio_checked'); 
			});
			
			$('input:radio').click( function() {
				$('label').removeClass('radio_checked');
				$("input:checked").each(function(index) {
					$("label[for='" + $(this).attr("id") + "']").addClass('radio_checked'); 
				});
			});
		},
		renderCMTags : function(action){
			if(settings.trackTagging) {
				var catID = vars.user;
				var pageID = vars.user;
				var shopAction = true;
	
				switch (action){
					case "add":
						catID += " CART VIEW ADD";
						pageID += " CART VIEW: ADD TO CART";
						break;
				    case "remove":
				        catID += " CART VIEW REMOVE";
				        pageID += " CART VIEW: REMOVE FROM CART";
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
				if (shopAction) {
					$.each(vars.data.data.cart.lines, function(i, item) {
						methods.shopAction5Product(item);
					});
					cmDisplayShop5s();
				}
			}
		},
		conversionEventTag : function(conversionCategory,conversionEvent) {
			try {
				cmCreateConversionEventTag(conversionCategory,1,conversionEvent,0);
			} catch(err){}
		},
		shopAction5Product : function(lineitem) {
			var totalReviewsCount = lineitem.BAZAARVOICE_NUMBEROFREVIEWS;
			var avgRating = lineitem.BAZAARVOICE_PRODUCTRATING;
			var buyAgainPercentage = lineitem.BAZAARVOICE_PCTRECOMMENDED;
			var isProductMaskedPricing = lineitem.ISPRODUCTMASKEDPRICING;
			var isLaunchSku = lineitem.ISLAUNCHSKU;
			var cm_Attributes = null;
			if (
				(totalReviewsCount != "" || totalReviewsCount != null)
				&& (avgRating != "" || avgRating != null)
				&& (buyAgainPercentage != "" || buyAgainPercentage != null)
				&& (isProductMaskedPricing != "" || isProductMaskedPricing != null)
				&& (isLaunchSku != "" || isLaunchSku != null)
				) {
				cm_Attributes = totalReviewsCount + "-_-" + avgRating + "-_-" + buyAgainPercentage + "-_-" + isProductMaskedPricing + "-_-" + isLaunchSku + "-_-" + "Fullsite";
			}
			else {
				cm_Attributes = null;
			}
			cmCreateShopAction5Tag(
				lineitem.SKU
			,	lineitem.PRODUCTNAME
			,	lineitem.QTY
			,	lineitem.PRICE
			,	lineitem.REPORTINGCATEGORY_NM
			,	cm_Attributes);
		},
		coremetrics : function() {
			try {
				//cmSetClientID(vars.cm_clientID,false,'rpt.'+settings.company+'.com',settings.company+'.com'); 
				cmSetupOther({"cm_TrackImpressions":""});
			} catch(err) {}
			
		},
		displayCart : function(element, lineItems) {
			var $element = element;
			if(vars.itemTotal > 0) {
				$('#sku').val(settings.sku);
				$('#QV_size').val(settings.selected_size);
				$('#QV_quantity').val(settings.qty);
				$("form#spcoForm #shipMethodPane_edit input#overlayLineItemId").val(vars.editingLineitemid);
				
				element.html('<form id="spcoForm"><div id="shipMethodPane_edit"><input type="hidden" id="sku" value="" /><input type="hidden" id="QV_size" value="" /><input type="hidden" id="QV_quantity" value="1" /><input type="hidden" id="overlayLineItemId" value="0" /></div></form>');
				
				element.append('<div class="cart_header">'+methods.getSectionHTML('items') + methods.getSectionHTML('subtotal') + '</div>');
				
				element.append(lineItems);
				
				element.append('<div class="estimator_wrapper"><a href="#cart_estimator"><span></span></a><div id="cart_estimator" style="display:none;"><div class="error" data-cartvalue="error"><div class="label"></div><div class="value"></div></div><a href="#cart_estimator" class="close" data-btnType="close" title="Close Cart Estimator" data-btnName="estimator_close"><span></span></a><div class="content"></div></div></div>');
				
				element.append('<div class="cart_summary"><div data-cartvalue="sourcecode"><div class="label"></div><div class="value"></div></div><div data-cartvalue="subtotal"><div class="label"></div><div class="value"></div></div><div data-cartvalue="shipping"><div class="label"></div><div class="value"></div></div><div data-cartvalue="savings"><div class="label"></div><div class="value"></div></div> <div data-cartvalue="orderTotal"><div class="label"></div><div class="value"></div></div> <div class="taxcallout"></div></div><div class="cart-divider"></div>');
				
				$('.qv_close').show();
				$('[data-btnname*="savechanges"]').hide();
				
				if(settings.type !== 'checkout') {
					element.append('<div class="checkout_btn"><a href="javascript:void(0);" class="button cta_button" data-btnname="cart_checkout" title="Checkout Button"><span></span></a></div>');
					if (!vars.hasBORIS && !vars.hasSFS) {
					    element.append('<div class="paypal_cart_btn"><a href="javascript:void(0);" data-btnname="cart_paypal"] class="button cta_button" title="Checkout With PayPal"></a></div>');
					}
				}
				
				element.append('<div id="cart_recommendations" class="recommendations"><div class="title"></div><div class="content"></div></div>');
					
				element.find('[data-sfs="true"]').find('[data-sfsmessage]').attr('data-sfsmessage','true');
				
                /* Moved Cart Estimator out to separate function */
				methods.showEstimator();

				methods.getRecommendations(element);			
				
				$('ul.cart li a.remove').on('click', function () {
				    var $item = $(this).parent('li'); $(this).parent('li').prepend('<div class="remove_progress"></div>');
				    $.cartActions('remove', $(this).parent('li').attr('data-lineitemid'), function (data) {
				        settings.cartEdited = true;
				        var conversantData = { 'promo_id': settings.promo_id, 'product_id': vars.skuArray.join('|') };
				        settings.trackTagging = true;
				        settings.removeFromCartCallback(data);
				        methods.updateHLSKU($item.attr('data-sku'));
				        methods.initCart($element, true);
				        return false;
				    });
				});
				
				$('[data-fulfillmentType="SEND_TO_STORE"]').each(function() {
					$(this).find('[value="shiptohome"]').removeAttr('checked');
					$(this).find('[value="storepickup"]').attr('checked','checked');
				});
				
				$('ul.cart li .lineitem .product_quantity a').on('mouseup', function() {
				    var $lineitem = $(this).parents('li[data-sku]');
				    $(this).parents('li').prepend('<div id="update' + $lineitem.attr('data-sku') + '" class="updating_progress"></div>');
					$('ul.cart li .lineitem .product_quantity a').off('mouseup');
					
					settings.editedItem = {'qty':$lineitem.attr('data-qty'),'sku':$lineitem.attr('data-sku'),'size':$lineitem.attr('data-size'),'fulfillmentType':$lineitem.attr('data-fulfillmenttype'),'storeNumber':$lineitem.attr('data-storenumber'),'storeCostOfGoods':$lineitem.attr('data-storecostofgoods'),'lineitemid':$lineitem.attr('data-lineitemid')};
					
					$lineitem.attr('data-qty',$(this).parent('.product_quantity').children('input[name="quantity"]').val());
					methods.updateItem($lineitem.attr('data-sku'),$lineitem.attr('data-size'),$lineitem.attr('data-qty'),$lineitem.attr('data-storenumber'),$lineitem.attr('data-fulfillmenttype'),$lineitem.attr('data-storecostofgoods'),$lineitem.attr('data-lineitemid'), function(){methods.initCart($element, true)});
					return false;
				});
				
				$('ul.cart li .lineitem a.product_title').off('click');
				$('ul.cart li .lineitem a.product_title').on('click', function() {
					if(settings.itemEvent !== null) {
						settings.itemEvent();	
					} else {
						try {
							var $lineitem = $(this).parents('li[data-sku]');
					
							settings.editedItem = {'qty':$lineitem.attr('data-qty'),'sku':$lineitem.attr('data-sku'),'size':$lineitem.attr('data-size'),'fulfillmentType':$lineitem.attr('data-fulfillmenttype'),'storeNumber':$lineitem.attr('data-storenumber'),'storeCostOfGoods':$lineitem.attr('data-storecostofgoods'),'lineitemid':$lineitem.attr('data-lineitemid')};
					
							$.quickview({'sku':$(this).parents('li').attr('data-sku'),'model':$(this).parents('li').attr('data-model'),'selected_size':$(this).parents('li').attr('data-size'),'qty':$(this).parents('li').attr('data-qty'),'pdp_fulfillmentType':$(this).parents('li').attr('data-fulfillmentType'),'storeNumber':$(this).parents('li').attr('data-storeNumber'),'storeCostOfGoods':$(this).parents('li').attr('data-storeCostOfGoods'),'type':'update','updateItem':settings.editedItem,'lineitemid':$(this).parents('li').attr('data-lineitemid')});
						} catch(err) {}
					}
					return false;
				});

				$('ul.cart li .lineitem a.product_image').off('click');
				$('ul.cart li .lineitem a.product_image').on('click', function() {
					if(settings.itemEvent !== null) {
						settings.itemEvent();	
					} else {
						try {
							var $lineitem = $(this).parents('li[data-sku]');
					
							settings.editedItem = {'qty':$lineitem.attr('data-qty'),'sku':$lineitem.attr('data-sku'),'size':$lineitem.attr('data-size'),'fulfillmentType':$lineitem.attr('data-fulfillmenttype'),'storeNumber':$lineitem.attr('data-storenumber'),'storeCostOfGoods':$lineitem.attr('data-storecostofgoods'),'lineitemid':$lineitem.attr('data-lineitemid')};
							$.quickview({'sku':$(this).parents('li').attr('data-sku'),'model':$(this).parents('li').attr('data-model'),'selected_size':$(this).parents('li').attr('data-size'),'qty':$(this).parents('li').attr('data-qty'),'pdp_fulfillmentType':$(this).parents('li').attr('data-fulfillmentType'),'storeNumber':$(this).parents('li').attr('data-storeNumber'),'storeCostOfGoods':$(this).parents('li').attr('data-storeCostOfGoods'),'type':'update','updateItem':settings.editedItem,'lineitemid':$(this).parents('li').attr('data-lineitemid')});
						} catch(err) {}
					}
					return false;
				});

				$('[data-instore="Y"] [data-info="product_delivery"]').show();
				$('.intangible').hide();

				$('.free-shipping-icon').on('click', function (e) {
				    e.stopPropagation();
				    Tipped.create(this, $(this).attr('data-tooltip'), { 'showOn': settings.tooltipAction, 'closeButton': global_settings.TOUCH_DEVICE, maxWidth: 350 }).show();
				});

				$('ul.cart .lbl_shiptohome').off('click');
				$('ul.cart .lbl_shiptohome').on('click', function (e) {
					var homeType = 'SHIP_TO_HOME';
					if($(this).parents('li').attr('data-sfs') == 'true') {
						homeType = 'SHIP_FROM_STORE';	
					}
					var $lineitem = $(this).parents('li[data-sku]');
					
					settings.editedItem = {'qty':$lineitem.attr('data-qty'),'sku':$lineitem.attr('data-sku'),'size':$lineitem.attr('data-size'),'fulfillmentType':$lineitem.attr('data-fulfillmenttype'),'storeNumber':$lineitem.attr('data-storenumber'),'storeCostOfGoods':$lineitem.attr('data-storecostofgoods'),'lineitemid':$lineitem.attr('data-lineitemid')};
					
					$lineitem.attr('data-qty',$(this).parent('.product_quantity').children('input[name="quantity"]').val());
					methods.updateItem($lineitem.attr('data-sku'),$lineitem.attr('data-size'),$lineitem.attr('data-qty'),$lineitem.attr('data-storenumber'),homeType,$lineitem.attr('data-storecostofgoods'),$lineitem.attr('data-lineitemid'), function(){methods.initCart($element, true)});
					
					settings.pdp_fulfillmentType = 'SHIP_TO_HOME';
                    //Set displayed values
					$('[data-cartvalue="shipping"], [data-cartvalue="savings"], [data-cartvalue="orderTotal"]').each(function () {
					    $(this).find('.value').attr('data-type', 'alpha').attr('data-value', 'TBD');
					});
				    //Inform estimator reset itself
					if ($('#cart_estimator_form').length > 0) {
					    $('#cart_estimator_form').attr('data-reset', 'true');
					    $('form#cart_estimator_form [data-btnname="_calculate"]').click();
					}
					try{
						cmCreateElementTag("ShipToHome", "Shopping Cart", "");
					} catch (err) { }

					return false;
				});

				$('ul.cart .lbl_storepickup').off('click');
				$('ul.cart .lbl_storepickup').on('click', function() {
					settings.sku = $(this).parents('li').attr('data-sku');
					settings.selected_size = $(this).parents('li').attr('data-size');
					settings.qty = $(this).parents('li').attr('data-qty');
					settings.storeNumber = $(this).parents('li').attr('data-storeNumber');
					settings.pdp_fulfillmentType = $(this).parents('li').attr('data-fulfillmentType');
					settings.storeCostOfGoods = $(this).parents('li').attr('data-storeCostOfGoods');
					vars.editingLineitemid = $(this).parents('li').attr('data-lineitemid');
					
					var $lineitem = $(this).parents('li[data-sku]');
					settings.editedItem = {'qty':$lineitem.attr('data-qty'),'sku':$lineitem.attr('data-sku'),'size':$lineitem.attr('data-size'),'fulfillmentType':$lineitem.attr('data-fulfillmenttype'),'storeNumber':$lineitem.attr('data-storenumber'),'storeCostOfGoods':$lineitem.attr('data-storecostofgoods'),'lineitemid':$lineitem.attr('data-lineitemid')};
										
					$('#sku').val(settings.sku);
					$('#QV_size').val(settings.selected_size);
					$('#QV_quantity').val(settings.qty);
					$("form#spcoForm #shipMethodPane_edit input#overlayLineItemId").val(vars.editingLineitemid);
					
					try{
						cmCreateElementTag("StorePickup", "Shopping Cart", "");
						methods.conversionEventTag('Shopping Cart', 'ISAStorePickup');
					} catch (err) { }
					
					try{ 
						$.modal.data.isLoading = false;
						$.modal.data.isOpen = false;
					} catch (err) { }

					$('<div />',{'id':'modal-container','data-title':'In-Store Availability'}).html($('<div />',{'id':'isaOverlay'})).flyin({'openTab':true,'keepTab':'true','callback':function() {
						try{
							vars.element = $element;
							$('a[data-tab="In-Store Availability"]').hide();
							$.modal.defaults.containerId = "isaContainer";
							
							
							if(typeof(processStoreLookupForm) == 'undefined') {
								$.modal.defaults.onAfterOpen = function() {
									methods.afterOpen();	
								}
							} else {
								$.modal.defaults.onAfterOpen = function() {}
								methods.afterOpen();								
							}
							
							
						} catch(err) {}
						//onFindStoreLinkClick();
						$('#qv_content [data-title="In-Store Availability"] [data-action="closeisa"]').remove();
						$('#qv_content [data-title="In-Store Availability"]').prepend('<a href="javascript:void(0);" data-action="closeisa" onclick="onCloseButtonClick(\'top\')" class="button modal-close" data-btnname="isa_cancel" title="Cancel Button"><span></span></a>');
						$('#qv_content [data-title="In-Store Availability"] a[data-action="closeisa"]').off('click')
						$('#qv_content [data-title="In-Store Availability"] a[data-action="closeisa"]').on('click', function() {
							$.flyin('removeTab','In-Store Availability');
						});
						//onFindStoreLinkClick();
						//cartStorePickupOverlay(settings.sku,settings.selected_size,settings.qty,$(this).attr('data-lineitemid'), 'selectStoreLink')
						launchStorePickupOverlay('cart', methods.isaCartCallback,0,0);
					
					}
					});

					return false;
						
					/* NON-FLYIN
					onFindStoreLinkClick();
					launchStorePickupOverlay('pdp', methods.isaCartCallback,0,0); */
					
				});

				$("label[for],input[type='radio']").bind("click", function(e) {
					e.stopPropagation();
				});

				methods.addRadioListener('.delivery');
				methods.renderCMTags(settings.action);
				$(window).trigger('resize');
			} else {
				$('[data-btnname*="_checkout"]').remove();
				element.html('<span class="empty_cart"><span data-text="empty_cart"></span><a href="/" class="button" data-btnname="emptycart_continueShopping" data-btntype="continue"><span></span></a></span>');
				
				methods.coremetrics();
				methods.renderCMTags('empty');
			}

			$('[data-btnname="cart_checkout"]').on('click', function() {
				try {
					$.cartActions('checkout', function(data) {settings.checkoutCallback(data);methods.conversionEventTag('Shopping Cart','Checkout');});
					$(this).addClass('processing');
					
				} catch(err) {}
			});

			$('[data-btnname*="_savechanges"]').on('click', function() {
				try {
					spco.turnOffConfirm();
					$.cartActions('checkout', function(data) {settings.checkoutCallback(data);methods.conversionEventTag('Shopping Cart','Checkout');});
					$(this).addClass('processing');
					
				} catch(err) {}
			});

			$('[data-btnname="cart_paypal"]').on('click', function() {
				try {
					$.cartActions('checkout', function(data) {
						settings.checkoutPayPalCallback();
						methods.conversionEventTag('Shopping Cart','Pay Pal Checkout');
					});
					
				} catch(err) {}
			});	
			if(typeof(settings.callback) === 'function') {
				settings.callback();
			}
			if(settings.type == 'checkout') {
				$('.fade').remove();
				$('body').prepend('<div class="fade"></div>');
				$('.fade').css({'height':$(document).outerHeight(),'width':'100%'});
				if(settings.cartEdited) {
					element.append('<div class="checkout_btn"><a href="javascript:void(0);" class="button cta_button" data-btnname="cart_savechanges" title="Save Changes Button"><span></span></a></div>');
					$('.qv_close').hide();
					$('[data-btnname*="savechanges"]').show();
					
				}

				$('.qv_close').off('click');
				$('.qv_close').on('click', function() {
					$('.fade').remove();
					return false;
				});

				$('[data-btnname="emptycart_continueShopping"]').off('mouseup');
				$('[data-btnname="emptycart_continueShopping"]').on('mouseup', function(e) {
					try {
						spco.turnOffConfirm();
						location.href = 'http://'+location.hostname+'/';
						e.stopPropagation();
					} catch(err) {}
				});

				if(vars.itemTotal == 0) {
					$('[data-btnname*="_savechanges"]').hide();
				}
			}
		},
		showEstimator: function () {
		    var tempCode = '';
		    $('[href="#cart_estimator"]').off();
		    try {
		        settings.estimatorObj = $('#cart_estimator .content').cartEstimator({
		            'hasSFS': vars.hasSFS,
		            'displaySteps': true,
		            'displayCount': true,
		            'labelCountry': true,
		            'labelProvince': true,
		            'labelZip': true,
		            'labelPromo': true,
		            'labelShipping': true,
		            'callback': function (data) {
		                $.each(data.estimates, function (i, item) {
		                    var value;
		                    switch (i) {
		                        case 'error':
		                            if (typeof data.messages.error != 'undefined') {
		                                value = data.messages.error;
		                            } else {
		                                value = '';
		                            }
		                            break;
		                        case 'shipping':
                                    /*
		                            if (item === '0') {
		                                item = "Free";
		                                value = "Free";
		                            } else if (item === '-1') {
		                                item = "TBD";
		                                value = "TBD";
		                            } else {
		                                value = item;
		                            }
                                    */
		                            value = parseFloat(item) - parseFloat(data.estimates.shippingSavings);
		                            value = value.toFixed(2);
		                            if (value == 0.00) {
		                                item = "Free";
		                                value = "Free";
		                            } else if (value === -1 || isNaN(value)) {
		                                item = "TBD";
		                                value = "TBD";
		                            } else {
		                                item = value;
		                            }
		                            break;
		                        case 'savings':
		                            if (item === '0') {
		                                item = "TBD";
		                                value = "TBD";
		                            } else {
		                                value = item;
		                            }
		                            break;
		                        default:
		                            value = item;
		                            break;
		                    }

		                    $('[data-cartvalue="' + i + '"] .value').attr('data-type', 'alpha');
		                    if (!isNaN(parseFloat(item))) {
		                        $('[data-cartvalue="' + i + '"] .value').attr('data-type', 'currency');
		                        value = parseFloat(item).toFixed(2);
		                    }
		                    $('[data-cartvalue="' + i + '"] .value').attr('data-value', value);
		                    //$('[data-cartvalue="'+i+'"] .value').html(value)
		                });
		                $('[data-cartvalue="sourcecode"] .value').attr('data-type', 'alpha');
		                if(data.messages.sourcecode != ''){
		                    tempCode = $('<span>' + data.messages.sourcecode + '</span>').text();
		                }
		                $('[data-cartvalue="sourcecode"] .value').attr('data-value', data.values.sourcecode.toUpperCase() + ': ' + tempCode);
		                if (data.values.sourcecode != '' && $('#cart_estimator_form').attr('data-estimated') == 'true') {
		                    $('[data-cartvalue="sourcecode"]').show();
		                } else {
		                    $('[data-cartvalue="sourcecode"]').hide();
		                }
		                vars.hasSFS = false;
		                
		                if ($('#cart_estimator_form').attr('data-estimated') == 'true' && $('#cart_estimator_form').attr('data-estimated') != ''
                            && $('[data-cartvalue="orderTotal"]').css('display') == 'none') {
		                    $('[data-cartvalue="shipping"], [data-cartvalue="savings"], [data-cartvalue="orderTotal"]').show();
		                }
		            }
		        });
		    } catch (err) { }

		    $('[href="#cart_estimator"]').pushdown({
		        open: function () {
		            $('[data-cartvalue="shipping"], [data-cartvalue="savings"], [data-cartvalue="orderTotal"]').show();
		            if ($('#cart_estimator_form #estimator_sourcecode').val() != '' && $('#cart_estimator_form').attr('data-estimated') == 'true') {
		                $('[data-cartvalue="sourcecode"]').show();
		            } else {
		                $('[data-cartvalue="sourcecode"]').hide();
		            }
		        },
		        close: function () {
		            if ($('#cart_estimator_form').attr('data-estimated') == 'false') {
		                $('[data-cartvalue="shipping"], [data-cartvalue="savings"], [data-cartvalue="orderTotal"], [data-cartvalue="sourcecode"]').hide();
		            }
		            $('[data-cartvalue="sourcecode"]').hide();
		        }
		    });
		    
		},
		afterOpen : function() {

		    window.isaCartCloseCallback = function (e) {
		        //if (window.location.pathname.substring(1).split('/')[0] === 'shoppingcart') {
		         
				e.stopPropagation();
				return false;
			}
		    window.processStoreLookupForm = function () {
		        var findBtnInterval, opCount = 0;
			    if (gotStoresForLocation) {
			        $('#storepickup form button[data-btnname="isa_checkSize"]').removeClass('processingbtn');
			        window['findButtonInterval'] = null;
			        window['finderCount'] = 0;
			        findBtnInterval = window.setInterval(function () {
			            var fsdlink, freeshipdetails;
			            //Look for store pickup buttons
			            if ($('#storepickup form button[data-btnname="isa_pickupHere"]').length > 0) {
			                $('#storepickup form button[data-btnname="isa_pickupHere"]').attr('title', 'Pickup Here Button');
			                //Look for free shipping details link
			                if ($('#shiptohome p.method').text().lastIndexOf('FREE') >= 0 && $('#shiptohome span.method a').length > 0) {
			                    fsdlink = $('#shiptohome span.method a');
			                    //The HTML sets the href to a javascript call with the data we need
			                    //so we break it up on ' and find the message we want (at index 3)
			                    freeshipdetails = fsdlink.attr('href').split('\'')[3];
			                    //Build this if defined, since the interval might cycle halfway through the last time run through.
			                    if (typeof freeshipdetails != 'undefined') {
			                        //Update out free shipping details link
			                        $('#map').before('<span id="freeshippingbubble" style="display:none;">' + freeshipdetails + '</span>');
			                        fsdlink.attr('id', 'freeshipdetails').attr('href', 'javascript:void(0);');
			                        Tipped.create($('#freeshipdetails'), 'freeshippingbubble', { 'showOn': settings.tooltipAction, 'target': '#freeshippingdetails', 'hook': 'topmiddle', 'inline': true, 'closeButton': global_settings.TOUCH_DEVICE, maxWidth: 350 });
			                        fsdlink.attr('title', 'View Free Shipping Details');
			                    }
			                    window.clearInterval(findBtnInterval); //Kill the interval
			                } else {
			                    //Catch to help prevent infinite looping
			                    opCount++;
			                    if (opCount >= 20) {
			                        window.clearInterval(findBtnInterval);
			                    }
			                }
			            } else {
			                //Catch to help prevent infinite looping
			                opCount++;
			                if (opCount >= 20) {
			                    window.clearInterval(findBtnInterval);
			                }
			            }
			            opCount++;
			        }, 300);
			        $('#storepickup').on('click', '.delivery form button[data-btnname]', function () {
			            $(this).addClass('processingbtn');
                        //Set displayed values
			            $('[data-cartvalue="shipping"], [data-cartvalue="savings"], [data-cartvalue="orderTotal"]').each(function () {
			                $(this).find('.value').attr('data-type', 'alpha').attr('data-value', 'TBD');
			            });
                        //Inform estimator reset itself
			            if ($('#cart_estimator_form').length > 0) {
			                $('#cart_estimator_form').attr('data-reset', 'true');
			                $('form#cart_estimator_form [data-btnname="_calculate"]').click();
			            }
			        });
			        return false;
			    }
				$("#three.step").hide();
				
				var form = $(this);
				var location = form.find("input[name=location]").val();
					var saveLocationParam = "";
				if (location != "" && ! gotStoresForLocation) {
					clearMarkers();
					geocoder.geocode({'address': location}, function(results, status) {	
						if (validateGeocoding(results, status)) {
							setCenter(results[0]);
			
							displayProcessing();
			
							hideDistance = !areResultsSpecific(results[0].address_components);
			
									if(storePickupSaveLocation) {
											saveLocationParam = "&setLocation=" + location;
											storePickupSaveLocation=false;
									}
			
							$.getJSON("/storepickup/locations?action=getLocations" + saveLocationParam + "&latlng=" + geoLocation.toUrlValue() + "&requestKey=" + locRequestKey + "&rnd=" + getRandom(), function(response) {
								if (response.success) {
									gotStoresForLocation = true;
									locRequestKey = response.nextRequestKey;
									storeLocations = response.data.locations;
									if (favoriteStoresEnabled && sourceOfCall == "myAccount") {
										storeLocations = spliceOutFavoriteStores(storeLocations, true);
									}
									displayStoreListing(storeLocations, false);
									if(!methods.isaCheck(false)) {
										$('#one form').trigger('submit');
									}
									//$('#storepickup form button[data-btnname="isa_checkSize"]').click();
									if(settings.selected_size == '') {
										$('#flyin_container #storepickup form button[data-btnname="isa_findStores"]').css({'display':'block'});
									} else { 
										$('#flyin_container #storepickup form button[data-btnname="isa_findStores"]').hide()
									}
								}
								else {
									displayServiceUnavailable(1);
								}
								
								hideProcessing();
							});
						}
						else {
							storeLocations = [];
							displayStoreListing(storeLocations, false);
							settings.initCall = false;
						}
					});
				}
				return false;
			}
			$('#storepickup #map').each(function() {
				$(this).appendTo($(this).parent('.content'));
			});
			$('#storepickup #nav').each(function() {
				$('#one').appendTo($(this));
				$(this).prependTo($(this).parent('.content'));
			});
			$('#isaContainer').removeClass('favContainer');
			//window.processCheckSizesForm = function(){};
			
			$('#storepickup form button[data-btnname="isa_checkSize"]').off('click');
			$('#storepickup form button[data-btnname="isa_checkSize"]').on('click', function() {
			    if (!methods.isaCheck()) {
			        $(this).addClass('processingbtn');
			        $('#one form').trigger('submit', [true]);
			    }
				return false;
			});
			$('#one form').unbind('submit');
			$('#one form').bind('submit',function(e, manual) {
				e.stopPropagation();
				
				if(manual && !methods.isaCheck(manual) && !methods.isaCheck(manual)) {
					$('#two form').submit();
				}
				//$('#storepickup form button[data-btnname="isa_checkSize"]').click();
			});
			$('<label for="location" />').insertBefore('#one input[name="location"]');
			$('label[for="isa_sizes"]').text('');
			$('#storepickup').prepend('<div class="isa-header"><span class="heading"></span><span class="subheading"></span></div>');
			$('#storegrid').prepend('<div class="storegridheader"><label for="storegrid"></label></div>');
			$('#one form').attr('id', 'locationForm');
			$('#two form').attr('id', 'sizeForm');
			$('#storepickup form button[data-btnname="isa_checkSize"]').attr('title', 'Find Stores Button');
			$('#storepickup form button[data-btnname="isa_addToCart"]').attr('title', 'Add To Cart Button');

			try{
			    displayProductOptions();
			    //Move the size select 
			    var box = $('<div class="content"></div>');
			    var sizeSelector = $('#sizeForm').detach();
			    box.insertAfter('#two .messaging');
			    box.append(sizeSelector);
				/*window.processStoreLookupForm = function() {
					$('#one form input[type="image"]').click();
					$('#two form input[type="image"]').click();
					return false;
				}*/
			} catch(err) {}	
		},
		isaCheck : function(manual) {
			$('#isa_size_error').remove();
			$('#isa_zip_error').remove();
			var errors = false;
			if(manual) {
				if($('#storepickup select[name="sizes"]').val() == 'null') {
					$('#storepickup select[name="sizes"]').before('<div id="isa_size_error">Please Select a Size</div>');
					errors = true;
				} 
				
				if($('#storepickup input[name="location"]').val() == '' || $('#storepickup input[name="location"]').val().toLowerCase() == 'zip code or city, state') {
					$('#storepickup input[name="location"]').before('<div id="isa_zip_error">Please Select a Location</div>');
					errors = true;
				}
			}
			if (errors === true) {
			    $('#storepickup form button[data-btnname="isa_checkSize"]').removeClass('processingbtn');
			}
			settings.initCall = false;
			return errors;
		}
	};
	
	$.fn.cart = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.cart' );
	    } 
	};

	
})(jQuery);
/* END cart */