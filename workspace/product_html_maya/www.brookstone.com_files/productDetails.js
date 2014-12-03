///////////////////////////////////////////////////////////////////////////////
//	productDetails.js
///////////////////////////////////////////////////////////////////////////////

var validation = new Validation();
validation.addRule(new ValidationRule({name: 'customization_characters',
	msg: 'Customization characters are limited to alphanumeric, spaces, and the following special characters: \', #, &, +',
	regex: /^[0-9a-zA-Z'#&\+ ]+$/}));
validation.getRule('required').msg = 'Please enter an entry.';

//Add To Cart
var isSubmitting = false;
$(document).ready(function() {
	$addToCartWrappers = $(".add_to_cart_wrapper");
	$addToCartWrappers.each(function(index) {
		$this = $(this);
		$this.find('input:image').attr('disabled','disabled');
		$this.find('div.price_wrapper').data('original_price', $this.find('div.price_wrapper').html() );
		if($.trim($this.find('.ship_date').text()) == "") {
			$this.find('.ship_date').hide();
		}
		$selects = $this.find('select');
		if($selects.size() > 0) {
			setTimeout( "$selects.eq(0).attr('disabled','');", 1000);
			$this.find('input:text').attr('disabled','disabled');
		}
		if($selects.size() > 1) {
			$selects.not($selects.eq(0)).attr('disabled','disabled');
		}
		$selects.change(function() {
			$this = $(this);
			$select = $this;
			$addToCartWrapper = $select.closest('.add_to_cart_wrapper');
			$addToCartWrapper.find('input:text').attr('disabled','disabled');
			$addToCartWrapper.find('input.add_to_cart:image').attr({"src":"/webassets/images/btn_add_to_cart.png","disabled":""}).css('cursor','pointer');
			$addToCartWrapper.find('div.error span').hide();
			$addToCartWrapper.find('.ship_date').hide();
			$(document).find('#divInStock').html("");
			$(document).find('#spanWebOnly').html("");
			$(document).find('.itemMaster').html("");
			if($select.val() == "") {
				$addToCartWrapper.find('div.price_wrapper').html($addToCartWrapper.find('div.price_wrapper').data('original_price'));
			}
			$selects = $addToCartWrapper.find('select');
			$selects.slice($selects.index($select) + 1).attr('disabled','disabled').val('');
			if($this.val() != "") {
				var data = {};
				$selects.filter(':enabled').each(function() {
	//				data[$(this).attr('class')] = $(this).val();
	// GTB - account for Pinterest naming conflict
				var	sClass = $(this).attr('class');
				if ( sClass .indexOf( " " ) > -1 )
					sClass  = sClass .substring( 0, sClass.indexOf( " " ) );
					data[sClass] = $(this).val();
				});
				data.currentOptionName = $select.attr('class');
	// GTB - account for Pinterest naming conflict
				if ( data.currentOptionName.indexOf( " " ) > -1 )
					data.currentOptionName = data.currentOptionName.substring( 0, data.currentOptionName.indexOf( " " ) );
	// GTB - BUG 305 - fixed Quotes in Variants
	//			data.currentOptionValue = $select.val();
				var sCurrentOptionValue = $select.val().replace( /\\"/g, "&quot;" );
				if ( sCurrentOptionValue.indexOf( "'" ) >= 0 )
					eval( 'data.' + data.currentOptionName + '="'+encodeURIComponent(sCurrentOptionValue)+'"' );
				else
					eval( "data." + data.currentOptionName + "='"+encodeURIComponent(sCurrentOptionValue)+"'" );
				eval( "data." + data.currentOptionName + "= decodeURIComponent( data." + data.currentOptionName + " )" );

				data.currentOptionValue = sCurrentOptionValue;
				data.productId = $this.closest('.add_to_cart_wrapper').find('input.product_id').val();
				$.get(brookstone.context + "/catalog/gadgets/productOptions.jsp",
						data,
						function(data) {
							var sCurrentOptionName = $select.attr('class');
	// GTB - account for Pinterest naming conflict
							if ( sCurrentOptionName.indexOf( " " ) > -1 )
								sCurrentOptionName = sCurrentOptionName.substring( 0, sCurrentOptionName.indexOf( " " ) );
							if(!data) {
								if($addToCartWrapper.find('span.data_error').length > 0) {
									$addToCartWrapper.find('span.data_error').show();
								} else {
									$addToCartWrapper.find('div.error').prepend("<span class='data_error'>A problem was encountered. Please try a different option.</span>");
								}
								return;
							}
							if(data.errorMessage) {
								if($addToCartWrapper.find('span.data_error').length > 0) {
									$addToCartWrapper.find('span.data_error').html(data.errorMessage).show();
								} else {
									$addToCartWrapper.find('div.error').prepend("<span class='data_error'>" + data.errorMessage + "</span>");
								}
								return;
							}
							var j = 1;
							if($('body').hasClass("productDetails")) {
								if(data.imageURL) {
	//	GTB - BUG 200
									try {
										$("#image_wrap").html("<img alt='Main Product Image' src='"+ data.imageURL +"'/><div id=\"image_wrap_enlarge\" rel=\"overlay_image_viewer\"></div>");
									} catch(e) {}

									var imageFound = false;
									if (sCurrentOptionName == "Color" ||
											sCurrentOptionName == "Team" ||
											sCurrentOptionName == "Player" ||
											sCurrentOptionName == "Fabric" ||
											sCurrentOptionName == "Material" ||
											sCurrentOptionName == "Pattern"  ) {
										$(".scrollable .thumb").each(function(index) {
											$this = $(this);
	//										GTB - BUG 200
	//										if($this.find("input.big_image").val() == data.imageURL) {
	bFound = false;
	if($this.find("input.big_image").val() == data.imageURL)
	{
		bFound = true;
	}
	else
	{
		for(var i in data.imageVarURLs2)
		{
			if($this.find("input.big_image").val() == data.imageVarURLs2[i].imageVarURL )
			{
				bFound = true;
				break;
			}
		}
	}
	if ( bFound == true ) {
												imageFound = true;
	//											GTB - BUG 200
												var scrollToIndex = Math.floor(index/5);
	//											var scrollToIndex = Math.floor(index/4);
												$(".scrollable").data('scrollable').seekTo(scrollToIndex,1000);
												$this.click();
												//return false is only used here to break out of the $.each() logic.
												// break; does not work as it isn't a js-native loop.
												// again, you shoul rarely use "return false;" to prevent default browser behavior.
												// that's what event.preventDefault(); is for.
												return false;
											}
										});
									}else{
										imageFound = true;
									}
									if(!imageFound) {
										$('.thumb').removeClass('active');
										var img = new Image();
										img.onload = function() {
											// change the image
											$("#image_wrap").html("<img alt='Main Product Image' src='"+ data.imageURL +"'/><div id=\"image_wrap_enlarge\" rel=\"overlay_image_viewer\"></div>");
										};
										img.src = data.imageURL;
									}
								}
								if(data.shippingInformationHtml) {
									$("div.pane.shipping_info .content").html(data.shippingInformationHtml);
								} else {
									$("div.pane.shipping_info .content").html('');
								}
								if(data.protectionPlans) {
									$('div.protection .form_row').each(function() {
										$this = $(this);
										var match = false;
										for( var i in data.protectionPlans) {
											if(data.protectionPlans[i].id == $this.find('input').attr('id')) {
												match = true;
												data.protectionPlans.splice(i,1);
												break;
											}
										}
										if(!match) {
											$this.remove();
										}
									});

									for(var i in data.protectionPlans) {
									 $('div.protection .content').append(
									  '<div class="form_row">' +
									   '<label for="' + data.protectionPlans[i].id + '">' +
										'<span class="title">' + data.protectionPlans[i].displayName + '</span>' +
										'<span class="price">' + data.protectionPlans[i].price + '</span>' +
									   '</label>' +
									   '<input type="checkbox" class="checkbox" name="protectionPlan'+j+ '" id="' + data.protectionPlans[i].id + '">' +
									   '<input type="hidden"  name="protectionPlanValue'+j+ '" value="' + data.protectionPlans[i].id + '">' +
									   '<input type="hidden"  name="protectionPlanProd'+j+ '" value="' + data.protectionPlans[i].productId + '">' +
									   '<input type="hidden"  name="protectionPlanType'+j+ '" value="servicePlanCommerceItem" >' +
									  '</div>');
									 j++;
									}
									if($('div.protection .form_row').size() > 0) {
										$('div.protection').show();
									} else {
										$('div.protection').hide();
									}
								}
							} else if($('body').hasClass("ensembleDetails")) {
								var	sNewSKUImage = null;
	//							if ( typeOf(data.skuId) != "undefined" )
	//								sNewSKUImage = "/webassets/product_images/180x180/"+data.skuId+".jpg";
	//							else
									sNewSKUImage = data.imageURL.replace( "700x700", "180x180" );
								var	temp1 = $("div.add_to_cart_wrapper");
								var	temp2 = $("div.add_to_cart_wrapper input[class='product_id']");

								$("div.add_to_cart_wrapper input[class='product_id']").each(function() {
									$this = $(this);
									if ( $this.val() == data.pCodeId )
									{
										$this.parent().parent().find('div.image_wrapper img.view_details').eq(0).attr( "src", sNewSKUImage );
									}
								});
							}
							 if(data.inventoryHtml && jQuery.trim(data.inventoryHtml) != "") {
									$addToCartWrapper.find('input.add_to_cart:image').attr({"src":"/webassets/images/btn_add_to_cart_disabled.png","disabled":"disabled"}).css('cursor','default');
									$addToCartWrapper.find('input.qty').val('0').attr('disabled','disabled');
									$addToCartWrapper.find('span.stock_error').html(data.inventoryHtml).show();
								}

							if(data.isSkuSelected == 'true') {
								if(data.webOnly == 'true') {
										if(data.inStock == 'true') {
												$(document).find('#spanWebOnly').html(" - Online Only");
												$(document).find('#spanWebOnly').css( "padding-left", "5px");
										}
										else
										{
												$(document).find('#spanWebOnly').html("Online Only");
												$(document).find('#spanWebOnly').css( "padding-left", "0px");
										}
								}
								else {
									$(document).find('#spanWebOnly').html("");
								}
								if(data.inStock == 'true') {
									$(document).find('#divInStock').html("In Stock");
								}
								else {
									$(document).find('#divInStock').html("");
								}

	//	GTB - www-319 - added this
								if ((data.stockLevel > 0)&&(data.stockLevel <= 50)) {
									$(document).find("#divLowStock").html("Hurry, limited quantities!");
								}
								else {
									$(document).find("#divLowStock").html("");
								}

								if(data.itemMaster == 'true') {
									$(document).find('.itemMaster').html("Usually Ships in 24 hours");
								}
								else {
									$(document).find('.itemMaster').html("");
								}

								if(data.priceHtml) {
									$addToCartWrapper.find('div.price_wrapper').html(data.priceHtml);
								}
								if(data.skuId) {
									$addToCartWrapper.find('input.sku_id').val(data.skuId);
								}
								if(data.shipsOnDateString) {
									$addToCartWrapper.find('div.ship_date').html(data.shipsOnDateString).show();
								} else {
									$addToCartWrapper.find('div.ship_date').html('').hide();
								}
								if($('body').hasClass("productDetails")) {
									if(data.personalization == 'false') {
										$addToCartWrapper.find('input.personalization').remove();
									} else if(data.personalization == 'true') {
										if($addToCartWrapper.find('input.personalization').size() <= 0) {
											$addToCartWrapper.append($('<input class="personalization" type="hidden" />'));
										}
									}
									if(data.giftWrap) {
										//if exists, update attributes
										if($("div.form_row.gift_wrap").size() > 0) {
											$label = $("div.form_row.gift_wrap label");
											$label.attr('for',data.giftWrap.id);
											$label.find('span.title').html(data.giftWrap.displayName);
											$label.find('span.price').html(data.giftWrap.price);
											$("div.form_row.gift_wrap input:checkbox").attr({ "id": data.giftWrap.id });
											$("div.form_row.gift_wrap input[name*='giftWrapValue']").val(data.giftWrap.id);
											$("div.form_row.gift_wrap input[name*='giftWrapProd'").val(data.giftWrap.productId);
										} else {
										//otherwise create it
											html = "";
											html += '<div class="form_row gift_wrap">' +
													'	<label for="'+ data.giftWrap.id +'">' +
													'		<span class="title">'+ data.giftWrap.displayName +'</span>' +
													'		<span class="price">'+ data.giftWrap.price +'</span>' +
													'	</label>' +
													'	<input type="checkbox" class="checkbox" id="'+ data.giftWrap.id +'" name="'+ data.giftWrap.inputName + j +'" />' +
													'	<input type="hidden"  name="giftWrapValue'+j+'" value="' + data.giftWrap.id + '" />' +
													'	<input type="hidden"  name="giftWrapProd'+j+'"  value="' + data.giftWrap.productId + '" />' +
													'	<input type="hidden"  name="giftWrapType'+j+'" value="giftWrapCommerceItem" />' +
													'</div>';

											$("div.box.convenience div.content").prepend($(html));
										}
									} else {
										//remove the gift_wrap form_row
										$("div.form_row.gift_wrap").remove();
									}
									var $convenience = $("div.box.convenience");
									if($convenience.find("div.form_row").size() <= 0) {
											$convenience.hide();
										} else {
											$convenience.show();
										}
									//Code added 06/07/11 to check for the two protection plan/gift wrap boxes. If they both are empty, we need to hide
									// them as well as the second add to cart button. If they both exist and are shown,
									// we need to make sure the second add to cart button is shown.
									var $protection = $("div.protection");
									if($protection.is(":visible") || $convenience.is(":visible")) {
										$("input.add_to_cart:eq(1)").show();
									} else {
										$("input.add_to_cart:eq(1)").hide();
									}
								}
								$addToCartWrapper.find('input:text').attr('disabled','');
								if($addToCartWrapper.find('input:text').val() == '0') {
									$addToCartWrapper.find('input:text').val('1');
								}
								if(data.inventoryHtml && jQuery.trim(data.inventoryHtml) != "") {
									$addToCartWrapper.find('input.add_to_cart:image').attr({"src":"/webassets/images/btn_add_to_cart_disabled.png","disabled":"disabled"}).css('cursor','default');
									$addToCartWrapper.find('input.qty').val('0').attr('disabled','disabled');
									$addToCartWrapper.find('span.stock_error').html(data.inventoryHtml).show();
								}
							} else {
								if(data.nextSelection) {
									$selects = $addToCartWrapper.find('select');
									$nextSelect = $($selects.get($selects.index($select) + 1));
									if($nextSelect.size() > 0) {
										$nextSelect.empty();
										html = '<option value="">Select</option>';
										if(data.nextSelection.length < 1) {
											$addToCartWrapper.find('input.add_to_cart:image').attr({"src":"/webassets/images/btn_add_to_cart_disabled.png","disabled":"disabled"}).css('cursor','default');
											$addToCartWrapper.find('input.qty').val('0').attr('disabled','disabled');
											$addToCartWrapper.find('span.stock_error').html(data.inventoryHtml).show();
										} else {
											for(var i = 0; i < data.nextSelection.length; i++) {
	// GTB - BUG 305 - fixed Quotes in Variants
	//											html += '<option value="'+ data.nextSelection[i].id +'">'+ data.nextSelection[i].displayName +'</option>';
											var	sOptionValue = data.nextSelection[i].id.replace( /&#034;/g, "&quot;" );
												html += '<option value="'+ sOptionValue +'">'+ data.nextSelection[i].displayName +'</option>';
											}
											$nextSelect.html(html).attr('disabled','');
										}
									}
								}
							}
						},"json")
						.error(function() {
							alert("There was an error adding your items to your cart.");
						});
			}
		});
		$form = $this.closest('form');
		if(!$form.data('isAddToCartFunction') && index === 0) {
			$form.submit(function(e) {
				e.preventDefault();
				if(isSubmitting == true)
					return;
				isSubmitting = true;
				$this = $(this);
				$this.data('isAddToCartFunction',true);
				var canSubmit = true;
				var pdqty=0;
				var canSubmitEnsemble = false;
				$this.find('.add_to_cart_wrapper').each(function() {
					$this = $(this);
					$this.find('div.error span').hide();
					$quantity = $this.find('input.qty');
					pdqty = $quantity.val();
					if($('body').hasClass("productDetails")) {
						if($quantity.is(":disabled")) {
							$this.find('span.select_error').show();
							canSubmit = false;
							isSubmitting = false;
							return;
						}
						if(!$quantity.val().match('^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$')) {
							$this.find('span.quantity_error').show();
							canSubmit = false;
							isSubmitting = false;
							return;
						}
					} else {
						//ensemblePage logic
						if($quantity.is(":disabled")) {
	//						canSubmitEnsemble = true;
	//						canSubmit = false;
							isSubmitting = false;
							return;
						}
						if($quantity.val().match('^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$')) {
							canSubmitEnsemble = true;
							isSubmitting = false;
							return;
						} else if($quantity.val() != "0" && $quantity.val() != "" ) {
							$this.find('span.quantity_error').show();
						}
					}
				});
				if($('body').hasClass("productDetails")) {
					$personalization = $this.find('.personalization');
					if(canSubmit && ($personalization.size() > 0)) {
						if(!$("#productCustomization").data('overlay').isOpened()) {
								var data = {};
								data.productId = $this.find('input.product_id').val();
								data.skuId = $this.find('input.sku_id').val();
								data.quantity = $this.find('input.qty').val();
								$.get(brookstone.context + "/catalog/gadgets/productPersonalization.jsp",
										data,
										function(data) {
											$("#productCustomization .content").html(data.html);
											$("#productCustomization").data('overlay').load();
										},"json"
								);
								 isSubmitting = false;
								canSubmit = false;
								return;
						} else {
							$("#productCustomization .error").hide();

							var validationResult = validation.validate($("#productCustomization"));
							if (!validationResult.passed) {
								$.each(validationResult.errors, function (i, error) {
									var errorDiv = error.field.closest('div.option').find('div.error');
									errorDiv.html(error.message);
									errorDiv.show();
								});
							    canSubmit = false;
							    isSubmitting = false;
        					}
							if(canSubmit) {
								$("#productCustomization").data('overlay').close();
							} else {
								$("#productCustomization p.error").show();
							}

						}
					}
				} else {
					canSubmit = canSubmitEnsemble;
				}
				if(canSubmit) {
					//set zone information kp:20120627
					$.setZoneNewAddnsPD();
					
					// TellApart tracking
					try {
						var cartItems = [];
						var cartItem = {};
						var button = $(document.activeElement);
						var wrapper = button.parents('div.add_to_cart_wrapper');
						if (!wrapper || wrapper.length == 0) {
							wrapper = $('div.add_to_cart_wrapper');
						}
						cartItem.sku = wrapper.find('input.sku_id').val();
						var productId = wrapper.find('input.product_id').val();
						var product = $.grep($bks.products.viewing, function(e){ return productId === e.id })[0];
						cartItem.price = product.listPrice;
						if (product.salePrice && $.trim(product.salePrice).length > 0) {
							cartItem.price = product.salePrice;
						}
							cartItem.qty = wrapper.find('input.qty').val();
						cartItems.push(cartItem);
						$bks.TellApart.addToCart(cartItems);
					} catch (err) {
						try {
						    console.log(err);
						} catch(e) {}
					}

					$.post(brookstone.context + "/catalog/gadgets/dynCart.jsp?pdqty="+pdqty,
					$form.serialize(),
					function(data) {
						isSubmitting = false;
						window.location.href = "/cart/cart.jsp";
					});
					//setTimeout( 'window.location.href = "/cart/cart.jsp"', 500);
				}
				else if (($('body').hasClass("ensembleDetails"))&&( canSubmit == false )&&( canSubmitEnsemble == false ))	//  www-351: show an error on the Ensemble page
				{
					$("#divEnsembleErrorBox").data('overlay').load();
				}

				isSubmitting = false;
			});
		}
	});
	if($('body').hasClass("productDetails")) {
		//Hides the "protection plan" and "convience" boxes if either one is emtpy
		var $protectionBox = $("div.box.protection");
		var $convenienceBox = $("div.box.convenience");
		var $relatedAcc = $("div.box.related_accessories");
		var hideSecondAddToCart = true;
		if($convenienceBox.find("div.form_row").size() > 0) {
			$convenienceBox.show();
			hideSecondAddToCart = false;
		} else {
			$convenienceBox.hide();
		}
		if($protectionBox.find("div.form_row").size() > 0) {
			$protectionBox.show();
			hideSecondAddToCart = false;
		} else {
			$protectionBox.hide();
		}
		if($relatedAcc.find("div.product").size() > 0) {
			 $relatedAcc.show();
		} else {
		 $relatedAcc.hide();
	}

	//Hides the second "add to cart" button if they're both hidden.
		if(hideSecondAddToCart) {
			$("input.add_to_cart:eq(1)").hide();
		} else {
			$("input.add_to_cart:eq(1)").show();
		}
	}
	//This code allows checkboxes to act like radio buttons
	//Just surround the checkboxes with an element with class="check_only_one"
	//and the code will do the rest.
	// The reason radio buttons aren't used is because it needs to allow for de-selecting.
	$(".check_only_one input:checkbox").live('change',function() {
		$this = $(this);
		if($this.is(":checked")) {
			$this.closest('.check_only_one').find('input:checkbox').not(this).attr('checked','');
		}
	});
	//This code accounts for the "More..." button behavior if the product description exceeds the size of the box
	// next to the main product image.
	if($("#inner_product_description").height() > 385) {
		$("#more").css('visibility','visible');
		$("#more a").click(function(e) {
			e.preventDefault();
			$("#product_description").animate({
				height: $("#inner_product_description").height()
			},1000,function() { $("#less").show();$("#more").hide(); });
		});
		$("#less a").click(function(e) {
			e.preventDefault();
			$("#product_description").animate({
				height: 385
			},1000,function() { $("#less").hide();$("#more").show(); });
		});
	}
	//This code acounts for the clicking of the "enlarge" button that will hover over images
	$("#image_wrap_enlarge").live('click',function() {
		$('#overlay_main_image_wrapper').html($('#image_wrap img').clone());
		$('#overlay_image_thumbs').html($("#image_description .scrollable .thumb").clone());
		var $overlay_image_viewer = $("#overlay_image_viewer");
		if($overlay_image_viewer.data('overlay')) {
			$overlay_image_viewer.data('overlay').load();
		} else {
			$overlay_image_viewer.overlay({
				fixed: false,
				top: 50,
				oneInstance: false,
				mask: {
					color: '#000',
					// load mask a little faster
					loadSpeed: 200,
					// very transparent
					opacity: 0.4
				},
				// load it immediately after the construction
				load: true
			});
		}
	});

	$("#dynCart").overlay({
		fixed: false,
		oneInstance: false,
		top: 50,
		mask: {
			color: '#000',
			// load mask a little faster
			loadSpeed: 200,
			// very transparent
			opacity: 0.4
		}
	});
	$(".close").hover(
	  function () {
		$(this).addClass("close_hover");
	  },
	  function () {
		$(this).removeClass("close_hover");
	  }
	);
	$("#productCustomization").overlay({
		fixed: false,
		close: 'div.close',
		closeOnClick: false,
		oneInstance: false,
		top: 50,
		mask: {
			color: '#000',
			// load mask a little faster
			loadSpeed: 200,
			// very transparent
			opacity: 0.4,
			closeSpeed: 0
		}
	});
	$("#promo_lightbox").overlay({
		fixed: false,
		close: 'div.close',
		oneInstance: false,
		top: 50,
		mask: {
			color: '#000',
			// load mask a little faster
			loadSpeed: 200,
			// very transparent
			opacity: 0.4,
			closeSpeed: 200
		}
	});
	$("#overlay_item_viewer").overlay({
		fixed: false,
		top: 50,
		oneInstance: false,
		mask: {
			color: '#000',
			// load mask a little faster
			loadSpeed: 200,
			// very transparent
			opacity: 0.4
		}
	}
	);
	//Activates the "tab" functionailty
	$("#additional_information ul.tabs").tabs("#additional_information div.panes > div");

	//
	$(".scrollable").scrollable();
	//The next 4 lines account for the right arrow being visible if there are less than 5 images.
	// If 5 or fewer images exist (so, only 1 "group") it will hide the right scroll arrow
	var $scrollItems = $(".scrollable .items .group");
	if($scrollItems && $scrollItems.size() == 1) {
		$("a.right").css('visibility','hidden');
	}
	// Handles clicking a thumbnail image in either the main image viewer or the overlay viewer
	$("div.thumb").live('click',function() {
		$this = $(this);
		if($this.hasClass("active")) { return; }
		else {
			$this.parent().parent().find('.thumb').removeClass("active");
			$this.addClass("active");
		}
		var url = $this.children('input.big_image').val();
		if($this.hasClass("video")) {
	// GTB - fix for enlarging the video area
	g_bVideoRun = true;
			if($this.parent().attr('id') == 'overlay_image_thumbs') {
	// GTB - fix for enlarging the video area
	if ( url.indexOf( "/frameVideo" ) > -1 ) url = url.replace( "width='400'", "width='700'" ).replace( 'width="400"', 'width="700"' ).replace( "height='400'", "height='700'" ).replace( 'height="400"', 'height="700"' );
	// GTB - 360
	if ( url.indexOf( "beyond360imaging" ) > -1 ) url = '<iframe src="'+url+'" style="width:700px; height:700px;" frameborder=0 scrolling="no" ></iframe>';
	// GTB - LiveClicker
	//if ( url.indexOf( "liveclicker" ) > -1 ) url = '<iframe src="'+url+'" style="width:700px; height:700px;" frameborder=0 scrolling="no" ></iframe>';
				$("#overlay_main_image_wrapper").html(url);
			} else {
				$("#image_wrap").html(url);
			}
			return;
		}
		else {
			var img = new Image();

			if($this.parent().attr('id') == 'overlay_image_thumbs') {
				img.onload = function() {
					// change the image
					$("#overlay_main_image_wrapper").html("<img alt='Main Product Image' src='"+ url +"'/>");
				};
			} else {
				img.onload = function() {
					// change the image
					$("#image_wrap").html("<img alt='Main Product Image' src='"+ url +"'/><div id=\"image_wrap_enlarge\" rel=\"overlay_image_viewer\"></div>");
				};
			}
			img.src = url;
		}
	});
	$("#personalize_all_checkbox").live('change',function() {
		$this = $(this);
// GTB - www-198 - clear the personalization fields when you uncheck
/*
		if(!$this.is(":checked")) {
			return;
		}
		var values = [];
		$("#main_custom_product .option").each(function(i) {
			values[i] = $(this).find("input, select").val();
		});
		$("#additional_customizations .repeat_container").each(function() {
			$(this).find(".option").each(function(i) {
				$(this).find("input, select").val(values[i]);
			});
		});
*/		
		var values = [];		
		if(!$this.is(":checked")) {
			$("#main_custom_product .option").each(function(i) {
				values[i] = "";
			});

		}
		else
		{
			$("#main_custom_product .option").each(function(i) {
				values[i] = $(this).find("input, select").val();
			});
		}
		$("#additional_customizations .repeat_container").each(function() {
			$(this).find(".option").each(function(i) {
				$(this).find("input, select").val(values[i]);
			});
		});
	});

	$(".promo_lightbox").click(function() {
		$("#promo_lightbox .content").html($(this).closest('div.slot').find('input.lightbox_content').val());
		$("#promo_lightbox").data('overlay').load();
	});

	$(".view_details").click(function() {
		$("#overlay_item_viewer .content").html($(this).closest(".add_to_cart_wrapper").find('.lightbox_content').html());
		$("#overlay_item_viewer").data('overlay').load();
	});

	$("input.qty").keyup(function() {
		$this = $(this);
		if($this.val() == "") {
			return;
		}
		if($('body').hasClass("productDetails")) {
			if(!$this.val().match('^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$')) {
				try {
					var tempNum = parseInt($this.val(),10);
					if(isNaN(tempNum)) {
						$this.val("1");
					} else {
						$this.val(tempNum);
					}
				} catch(e) {
					$this.val("1");
				}
			}
		} else {
			if(!$this.val().match('^([0-9]|[0-9][0-9]|[0-9][0-9][0-9])$')) {
				try {
					var tempNum = parseInt($this.val(),10);
					if(isNaN(tempNum)) {
						$this.val("0");
					} else {
						$this.val(tempNum);
					}
				} catch(e) {
					$this.val("0");
				}
			}
		}
	});
	$("input.qty").blur(function() {
		$this = $(this);
		if($this.val() == "") {
			$this.val('0');
			return;
		}
	});
	//live function for closing dyn cart
	$('#inline_cart_footer .close').live('click', function() {
	  $('#dynCart').data('overlay').close();
	  if(!$('body').hasClass("productDetails")) {
		window.location.href=window.location.href;
	  }
	});

	//	show the FAQ if it has data	
	if ( $.trim( $("#divFAQ").text() ) != "" )
		$("#divFAQContainer").css( "display", "block" );

});

//code for product finding method req#6 kp:20120627
$.extend({
	countOfChkdAddnsPD: function (){
		/* returns the count of checked addons in the passed in form object*/
		var elements = $('#prodDetailAddonForm :input');
		var countofCheckedAddons = 0;
		for (i=0;i<elements.length;i++)
		{
			var element = elements[i];
			var elmntType = element.type;
			var elmntName = element.name;
			var elmntIsChkd = element.checked;
			if (elmntType=='checkbox' &&
					elmntIsChkd==true &&
					(elmntName.search(/giftWrap/i)!=-1
							|| elmntName.search(/protectionPlan/i)!=-1
							|| elmntName.search(/productConv/i)!=-1)){
				++countofCheckedAddons;
			}
		}
		return countofCheckedAddons;
	},

	setZoneNewAddnsPD: function () {
		/* sends eVar4 to omniture if any new addons were added */
		var cntOfTotalChkdAddns = $.countOfChkdAddnsPD();

		if (cntOfTotalChkdAddns>0){
try {
			var prevPageName = s.c_r('c4');
			var prevSubCatName = s.c_r('c3');
			if (prevSubCatName=="0") prevSubCatName=prevPageName;
			/* SET OMNITURE VARIABLE EVAR4 */
			s.linkTrackVars="eVar4";
		  	s.eVar4 =  'Addons_' + prevPageName + '_' + prevSubCatName;
		  	s.tl(true,'o','Add on');
} catch (e) {}
		}
	}
});

$(window).load(function() {

	 $addToCartWrappers = $(".add_to_cart_wrapper");
	 $addToCartWrappers.each(function(index) {
	  $this = $(this);
	  $this.find('input:image').attr('disabled','').css('cursor','pointer');
	  $('.disable_nostock').find('input:image').attr('disabled','disabled').css('cursor','default');
	 });



});

$(document).ready(function() {

	$addToCartWrappers = $(".add_to_cart_wrapper");
	$addToCartWrappers.each(function(index) {
		$this = $(this);
		$this.find('input:image').attr('disabled','').css('cursor','pointer');
		$('.disable_nostock').find('input:image').attr('disabled','disabled').css('cursor','default');
	 });

	 $('div.pr-snippet-read-reviews a').attr('href', '#additional_information');
	 
});

/**** GTB - remove invodo
// // GTB - added this invodo metrics code
// try {
// var newScript = document.createElement('script'); newScript.type = 'text/javascript'; newScript.src = 'https://e.invodo.com/3.0/js/invodo.js?a=brookstone.com';
// document.getElementsByTagName("head")[0].appendChild(newScript);
// } catch(e) {}
*/

// GTB - 360 - Start
function add360Link()
{
	try {
	var	apCodes = [ "733673p", "734328p" ];
	var	a360Urls = [ "http://liveimage.beyond360imaging.net/view/show.php?vid=65&opts=53&sku=748721_2", "http://liveimage.beyond360imaging.net/view/show.php?vid=65&opts=53&sku=734328_2" ];
	var elElements = document.getElementsByTagName('img');
		for ( n = 0; n < elElements.length; n++ )
		{
		var	s = elElements[n].getAttribute( "src" );
			for( var nIdx = 0; nIdx < apCodes.length; nIdx++ )
			{
			var bBreak = false;
			var	pCode = apCodes[nIdx ];
			var url360 = a360Urls[nIdx ];
//				if ( elElements[n].getAttribute( "src" ).indexOf( '/webassets/product_images/60x60/' + pCode + '.jpg' ) >=0 )
				if ( productID == pCode )
				{
//				var	divThumb = elElements[n].parentNode;
//				var	divGroup = divThumb .parentNode;
				var	divGroup = $("#product_promo_slot");
				var	div360 = document.createElement( "div" );
					div360.setAttribute( "id", "div360Thumb" );
					var	sImageTag = "<img src='webassets/images/360banner.gif' value='"+url360+"' onclick='try { show360Popup(this); } catch(ex) {} return( false );' style='margin-left:30px;cursor:pointer;cursor:hand;' />";
					divGroup.append( div360 );
					div360.className = "thumb";
					div360.innerHTML = sImageTag;
					bBreak = true;
					break;
				}
			}
			if ( bBreak == true )
				break;
		}
	} catch(e) { alert( "error: " + e.message ); }
}

function show360Popup( anchorTag )
{
try
{
var url = anchorTag.getAttribute( "value" );

//	$('#overlay_main_image_wrapper').html( '<iframe src="'+url+'" style="width:600px; height:600px;padding-left:100px;padding-top:100px;background-color:white;" frameborder=0 scrolling="no" ></iframe>' );
	$('#overlay_main_image_wrapper').html( '<iframe src="'+url+'" style="width:700px; height:600px;padding-left:000px;padding-top:100px;background-color:white;" frameborder=0 scrolling="no" ></iframe>' );
	$('#overlay_image_thumbs').html($("#image_description .scrollable .thumb").clone());


	var $overlay_image_viewer = $("#overlay_image_viewer");
	if($overlay_image_viewer.data('overlay')) {
		$overlay_image_viewer.data('overlay').load();
	} else {
		$overlay_image_viewer.overlay({
			fixed: false,
			top: 50,
			oneInstance: false,
			mask: {
				color: '#000',
				// load mask a little faster
				loadSpeed: 200,
				// very transparent
				opacity: 0.4
			},
			// load it immediately after the construction
			load: true
		});
	}
} catch( ex ) { return( false ); };
}
//setTimeout( "add360Link();", 500 );
// GTB - 360 - End

// GTB - Disable PowerReviews
/****
// $(".pane.reviews").css( 'display', 'none' );
// $(".review_box").css( 'display', 'none' );
// $(".review_box").css( 'display', 'none' );
// $("#prod_ratings").css( 'display', 'none' );
//
// if ( $(".pane.manuals").html() != null )
// {
// 	$(".pane.manuals").css( 'display', 'block' );
// 	$(".panes").css( 'display', 'block' );
// }
// else if ( $(".pane.shipping_info").html() != null )
// {
// 	$(".pane.shipping_info").css( 'display', 'block' );
// 	$(".panes").css( 'display', 'block' );
// }
//
// CSS changes
// ul.tabs li.reviews { display:none; }
// div.review_box { display:none; }
// div.prod_ratings { display:none; }
// div.pane reviews { display:none; }
// div.pr-snapshot { display:none; }
// div.panes { display:none; }
// div.warranty_info { display:block; }
// div.pane manuals { display:block; }
*/

/**** GTB - remove invodo
// setTimeout( "openVideo()", 5000 );
// function openVideo()
// {
// 	if ( g_b360Page == false )
// 		return;
// 	try
// 	{
// 		$(".thumb.video").click();
// //		$("#div360Thumb img").click();
// 	}
// 	catch( e ) {}
// }
*/

if ( $(".pane.reviews").html() != null )
{
        $(".pane.reviews").css( 'display', 'block' );
        $(".panes").css( 'display', 'block' );
}
else if ( $(".pane.specs").html() != null )
{
	$(".pane.specs").css( 'display', 'block' );
	$(".panes").css( 'display', 'block' );
}
else if ( $(".pane.manuals").html() != null )
{
	$(".pane.manuals").css( 'display', 'block' );
	$(".panes").css( 'display', 'block' );
}
else if ( $(".pane.shipping_info").html() != null )
{
	$(".pane.shipping_info").css( 'display', 'block' );
	$(".panes").css( 'display', 'block' );
}

///////////////////////////////////////////////////////////////////////////////
//	LiveClicker - Start
///////////////////////////////////////////////////////////////////////////////
try
{
var	iframeVideos = $(".thumb.video .big_image");
	for( n =0; n < iframeVideos.length; n++ )
	{
	var	iframeSrc = iframeVideos[n].value;
		if ( iframeSrc .indexOf( "WC3IxwK93rc" ) > -1 )
		{
			iframeSrc = 'http://vms.liveclicker.com/vms/previewstorevideo.php?video_id=WC3IxwK93rc&amp;source=youtube&amp;large=0';
			iframeVideos[n].value = iframeSrc;
			g_useNewVideo = true;
		}
	}
}
catch( ex1 )
{
}


function postLoad()
{
	try
	{
	var script = document.createElement('script');
//                script.src = "http://sv.liveclicker.net/service/getScript?account_id=1249&script_id=22";
//		script.src = "http://sv.liveclicker.net/service/getScript?account_id=1249&script_id=36";
//		script.src = "http://sv.liveclicker.net/service/getScript?account_id=1249&script_id=40";
	    script.src = "http://sv.liveclicker.net/service/getScript?account_id=1249&script_id=47";
		script.type = 'text/javascript';
		script.defer = true;
		document.getElementsByTagName('head').item(0).appendChild(script);
	}catch( e ) {}

}

try
{
var script = document.createElement('script');
        script.src = "http://edge.liveclicker.net/scripts/jquery.liveclicker.v1-29.js";
        script.type = 'text/javascript';
        script.defer = true;
        document.getElementsByTagName('head').item(0).appendChild(script);

        script = document.createElement('script');
        script.src = "http://edge.liveclicker.net/scripts/jquery.jcarousel.min.js";
        script.type = 'text/javascript';
        script.defer = true;
        document.getElementsByTagName('head').item(0).appendChild(script);

}catch( e ) {}
setTimeout( "postLoad();", 500 );

var productID = $("meta[property='og:image']").attr( "content" );
productID = productID.substring( productID.indexOf('700x700') + 8 );
productID = productID.substring( 0, productID.indexOf('.') );

///////////////////////////////////////////////////////////////////////////////
//LiveClicker - End
///////////////////////////////////////////////////////////////////////////////

if ( $("body.ensembleDetails").size() > 0  )
{
	$selects = $('select');
	$selects.attr('disabled','disabled');
	setTimeout( "enableEnsembleSelects();", 3000 );

//  www-351: show an error on the Ensemble page
	var vDiv = document.createElement('div');
	vDiv.id = "divEnsembleErrorBox";
	vDiv.className = "divEnsembleErrorBox overlay";
	var	sDialogData = '<img class="close" src="/webassets/images/close.png" alt="close button" title="close this window" style="float:right;margin-top: -25px; margin-right: -25px;" />';
	sDialogData += '<div class="content" style="font-size: 16px;;margin-top:10px;margin-left:10px;">';
	sDialogData += '<img src="/webassets/images/exlamation.gif" style="float: left; padding: 0px 10px 50px 5px;" />';
//	sDialogData += '<p>Hold on there, pardner!</p>';
	sDialogData += '<p>&nbsp;</p>';
	sDialogData += '<p>Please select a product option, and make sure the quantity is set to greater than 0.</p>';
	sDialogData += '</div>';
	vDiv.innerHTML= sDialogData;
	document.getElementsByTagName('body').item(0).appendChild( vDiv );
	$("#divEnsembleErrorBox").overlay({
		fixed: false,
		close: 'img.close',
		oneInstance: false,
		top: '40%',
		mask: {
			color: '#000',
			// load mask a little faster
			loadSpeed: 200,
			// very transparent
			opacity: 0.4,
			closeSpeed: 200
		}
	});

}

function enableEnsembleSelects()
{
	$selects = $('select');
	$selects.each( function() {
		if ( $(this).attr( "id" ) == "1" )
			$(this).removeAttr('disabled');
	});
}

///////////////////////////////////////////////////////////////////////////////
// Fix empty warranty display - start
// please remove when the JSP fix is completed.
///////////////////////////////////////////////////////////////////////////////
try {
	if ( $("body.productDetails").size() > 0 )
	{
//		if ( $.trim( $("div.warranty_info").first().text() ) == "Warranty" )
		if ( $.trim( $("div.warranty_info p").first().text() ) == "" )
		{
			$.get( "/global/gadgets/getinternalmedia.jsp?assetId=m370014", function( data ) {
				$("div.warranty_info p").first().html( data  );
			});

		}
	}
} catch( e ) {}
///////////////////////////////////////////////////////////////////////////////
//	Fix empty warranty display - end
///////////////////////////////////////////////////////////////////////////////
