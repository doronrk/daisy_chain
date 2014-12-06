var OptionManager = (function( $, _, OptionData ){	
	_.templateSettings = {
		interpolate : /\{\{=(.+?)\}\}/g
	};
	
	var EventSource = {
		bind: function( event_type, handler ) {
			this.handlers = this.handlers || {};
			this.handlers[ event_type ] = this.handlers[ event_type ] || [];
			this.handlers[ event_type ].push( handler );
		},
	
		unbind: function( event_type, handler ) {
		
		},
	
		trigger: function( event_type, event_data ) {
			if ( this.handlers && this.handlers[ event_type ] ) {
				var event_object = {
					type: event_type,
					data: event_data
				};
			
				for ( var i = 0; i < this.handlers[ event_type ].length; i++ ) {
					this.handlers[ event_type ][i].call( null, event_object );
				}
			}
		}
	};
	
	var OptionTemplates = {
			//option_type_container:	_.template( '<li class="option-type" data-pk="{{= pk }}" data-size="" data-code="{{= code }}"><label>{{= label }}</label><ul /></li>' ),
			option_type_container:	_.template( '<li class="option-type" data-pk="{{= pk }}" data-size="" data-code="{{= code }}"><label style="display:none">{{= label }}</label><ul /></li>' ),
			//option_price_container:	_.template( '<li data-pk="{{= pk }}" data-size="" data-code="{{= code }}"><ul id="priceGroup"/></li>' ),
			option_type_label:		_.template( 'You have selected: <strong>{{= label }}</strong>' ),
			option_item_container:	_.template( '<li class="option enabled" data-pk="{{= pk }}" data-code="{{= code }}" data-available="true" data-label="{{= label}}" data-price="{{= regularPrice }}" data-sale-price="{{= salePrice }}">{{= label}}</li>' ),
			option_item: {
				color:				_.template( '<img src="{{= img }}" alt="{{= label }}" title="{{= label }}" />' )
			}
		};
	
	var OptionManager = function( params ) {
		this.init( params );
	};
	
	$.extend( OptionManager.prototype, {
		init: function( params ) {
			var self = this, model;
			
			this.model = model = params.model || {};
			this.option_types = {};
			this.option_index = {};

			this.sku_index = {};
			
			this.selections = {};
			
			// Bind DOM
			this.$el = $( "#item-options" );
			this.$el.empty();
			
			this.$price = $( ".display-price" );
		
			this.$form_option = $( 'input[name="option"]' );
			this.$form_option_types = $( 'input[name="optionTypes"]' );
			
			// Initialize OptionTypeControllers
			_.each( model.option_types, function( option_type, index ) {
				var controller;
				var events = ( option_type.code && params.events[option_type.code] ) || {};
				
				self.selections[option_type.pk] = null;
				
				controller = new OptionTypeController({ model: option_type, events: events });
				controller.bind( 'select', $.proxy( self.update, self ) );
				
				self.$el.append( controller.$el );
				
				// Index Option Type
				self.option_types[option_type.pk] = { controller: controller, index: index };
				
				// Index Options
				_.each( option_type.options, function( option ) {
					self.indexOption( option, option_type );
				});
			});
			
			// Index Configurations (SKUs)
			_.each( model.skus, function( sku ) {
				self.indexSku( sku );
			});
			
			
			// Index Configurations (SKUs)
			_.each( model.skus, function( sku ) {
				self.indexSku( sku );
			});

			
			// Register Dependencies
			if ( model.option_types.length > 1 ) {
				_.each( model.option_types, function( option_type, index ) {
					var dependant = index + 1;
					if ( dependant == model.option_types.length ) dependant = dependant - 2;
				
					self.option_types[option_type.pk].dependant = self.option_types[model.option_types[dependant].pk];
				});
			};
			
			if ( model.option_types.length > 1 ) {
				_.each( model.option_types, function( option_type, index ) {
					if(option_type.options.length == 1){
						self.update({data: {option_type: option_type , option: option_type.options[0]}});
					}
				});
			};
			
			if(model.skus.length == 1){
				_.each(model.option_types, function(option_type,index) {
						self.update({data: {option_type: option_type , option: option_type.options[index]}});
				});
			}
			
			_.each( model.option_types, function( option_type, index ) {
				if (option_type.options.length == 1) {
					var param= "li[data-pk=" + option_type.pk+"]";
					jQuery(param).attr("data-size", "1"); 
				}
				if (option_type.code == 'size') {
					var sizeParam = "li[data-code="+option_type.code+"]";
					$(sizeParam).append("<a id='sizeInfo' href='void(0);' onclick='javascript:openSize();return false;' style='display:none;'> Sizing Info </a>");
				}
			});
				
		},
		
		update: function( event ) {
			var data = event.data, option_type = data.option_type, option = data.option;
			
			// Store Selection
			this.selections[option_type.pk] = option.pk;
			
			// Update Form
			this.updateForm();
			
			// Update Dependant Options
			if ( this.option_types[option_type.pk].dependant && this.option_types[option_type.pk].dependant.controller ) {
				this.option_types[option_type.pk].dependant.controller.update( this.filter( option.pk ) );
			}
			
			var optData = eval(OptionData);
//			var optionTypeValues1 = eval("optionTypeValues_" + optData.product_pk);
			var optionTypeValues = jQuery("optionTypeValues_" + optData.product_pk);

			if(optionTypeValues.val() == "none"){
				if(optData.option_types.length == 1){
//					optionTypeValues.value = option_type.pk + "=" + option.pk;
					optionTypeValues.val(option_type.pk + "=" + option.pk);
				}
				else{
//					optionTypeValues.value = optData.option_types[1].pk + "=" + optData.option_types[1].options[0].pk + ":" + option_type.pk + "=" + option.pk;
					optionTypeValues.val(optData.option_types[1].pk + "=" + optData.option_types[1].options[0].pk + ":" + option_type.pk + "=" + option.pk);
				}
			}
			//Update ScarcityMsg
			this.updateScarcityMsg();
			this.updateReorderDateMsg();
			//this.updateOutOfStockMsg(optData.product_pk);
		
		},
		
		updateForm: function() {
			var parts = [], values = [], i, sku, price;
			
			for ( i in this.selections ) {
				if ( !this.selections[i] ) return false;
				
				values.push( this.selections[i] );
				parts.push( [i, this.selections[i]].join( "=" ) );
			}
			
			// Update Hidden Form Element
			this.$form_option.val( parts.join( ":" ) );
			
			// Update Display Price
			if ( sku = this.find( values ) ) {
				if ( sku.prices ) {
					if ( sku.prices.length == 1 ) {
						price = sku.prices[0];
					}
					else if ( sku.prices.length > 1 ) {
						price = sku.prices.join( " - " );
					}
					
					this.$price.text( price );
				}
			}
			
			return true;
		},
		
		indexOption: function( option, option_type ) {
			var index = this.option_index;
			
			index[ option.pk ] = $.extend( {}, option, { option_type: option_type } );
		},
		
		indexSku: function( sku ) {
			var index = this.sku_index, options = sku.options, i;
		},
		
		filter: function( option ) {
			var i, skus = this.model.skus, collection = {}, key;
			
			for ( i = 0; i < skus.length; i++ ) {
				if ( _.contains( skus[i].options, option )&& skus[i].in_stock ) {
					key = (option == skus[i].options[0] ) ? skus[i].options[1] : skus[i].options[0];
					collection[key] = skus[i];
				}
			}
			
			return collection;
		},
		
		find: function( options ) {
			var i, results = this.model.skus, key;
			
			for ( i = 0; i < options.length; i++ ) {
				key = options[i];
				results = _.filter( results, function( sku ) { return _.contains( sku.options, key ); });
			}
			
			return ( results.length == 1 ) ? results[0] : false;
		},

		updateScarcityMsg: function(){
			var sku = this.getSku();
			var productCode = this.model.product_id;
			var isScarcityDisplayed = jQuery('div#scarcityMsg').size() > 0  ;
			if(sku != null && isScarcityDisplayed) {
				var _data = sku.code;
				var _url = "/scarcityStockAvailable.do?r="+ Math.random();
				if ($.mobile){
					_url = "/mobile"+_url;
				}
				$.ajax({
					type: "POST",
					url: _url,  
					data: {"skuCode":sku.code, "productCode" : productCode},
					success: function(data) {
						data = $.trim(data);
						if(jQuery(data).filter('div#remainingStock').size()>0){ //sucess
							var scarcityMessage = jQuery(data).filter('div#remainingStock');
							var styleClass = jQuery('div#scarcityMsg div').attr("class");
							
							jQuery('div#scarcityMsg').html(scarcityMessage);
							jQuery('div#scarcityMsg div').addClass(styleClass);
							if(data.indexOf('img ') == -1){
								jQuery('div#scarcityMsg div').css("visibility","hidden");
							}
							
						} else {
						}
					},
					error: function(e){
					}
				});
			}
			return false;
		},
		
		getSku: function() {
			var values = [], i, sku;
			for ( i in this.selections ) {
				if ( !this.selections[i] ) return null;
				values.push( this.selections[i] );
			}
			if ( sku = this.find( values ) ) {
				return sku;
			}
			return null;
		},
		
		updateReorderDateMsg: function(){
			var sku = this.getSku();
			var isOutOfStockDisplayed = jQuery('div#reorderDateMsg').size() > 0  ;
			if(isOutOfStockDisplayed && sku != null && sku.reorder_date.length > 0) {
				var reorderdate = sku.reorder_date.substr(0,sku.reorder_date.lastIndexOf("-")+3);
				jQuery('div#reorderDateMsg').html("Expected to ship "+ reorderdate);
				jQuery('div#reorderDateMsg').css("visbility","visible");
			}
			else {
				jQuery('div#reorderDateMsg').html("");
				jQuery('div#reorderDateMsg').css("visbility","hidden");
			}
		},
		
		updateOutOfStockMsg: function(productPk){
			var sku = this.getSku();
			if(sku != null && !sku.in_stock){
				jQuery(".add-cart-container").css("display","none");
				jQuery(".quantity-option").css("display","none");
				jQuery("#outOfStockText_" + productPk).css("display","block");
			} else {
				jQuery(".add-cart-container").css("display","block");
				jQuery(".quantity-option").css("display","block");
				jQuery("#outOfStockText_" + productPk).css("display","none");
			}
		}
	});
	
	var OptionTypeController = function( options ) {
		this.init( options );
	};
	
	$.extend( OptionTypeController.prototype, EventSource, {
		init: function( options ) {
			var self = this, model;
			
			this.model = model = options.model || {};
			this.events = options.events || {};
			
			// Bind DOM
			this.$el = $( OptionTemplates.option_type_container( model ) );
			this.$label = this.$el.find( "label" );
			this.$ul = this.$el.find( "ul" );
			this.render();
		},
		
		update: function( options ) {
			var self = this;
			this.$ul.find( "li" ).removeClass( "enabled" ).attr( "data-available", "false" );
			var init = this.$ul.find( "li.init" );
			if(init.size() > 0 && !init.attr('data-pk')){
				init.attr('data-available','true');
			}
			_.each( options, function( value, key ) {
				self.$ul.find( '[data-pk="' + key + '"]' ).addClass( "enabled" ).attr( "data-available", "true" );
			});
		},
		
		render: function() {
			var self = this, model = this.model;
			
			self.$ul.empty();
			_.each( model.options, function( option ) {
				var $li = $( OptionTemplates.option_item_container( option ) ), event_type;
				$li.click( function() { self.select( this, option ); } );
				
				for ( event_type in self.events ) {
					$li.bind( event_type, function() { self.events[event_type].call( this, { option_type: model, choice: option } ); });
				}
				
				if ( OptionTemplates.option_item[ model.code ] ) {
					try{
						$li.html( OptionTemplates.option_item[ model.code ]( option ) );
					}
					catch(e){
						
					}
					try{
						if(model.code=='color'){
							var priceInfo = $li.attr("data-price").replace('$','').replace('.','_');
							var priceSaleInfo = $li.attr("data-sale-price").replace('$','').replace('.','_');
							if (priceInfo != "0_00"){
								var ulSelector = "li#priceInfo_"+priceInfo+"_"+priceSaleInfo;
								var $ulPriceOption = self.$ul.find(ulSelector); 
								if($ulPriceOption.size() == 0){
									var $ulPriceOption = $("<li id='priceInfo_"+priceInfo+"_"+priceSaleInfo+"'><label class='price'>"+$li.attr("data-price")+"</label></li>");
									if(priceSaleInfo != "0_00" && priceSaleInfo != priceInfo){
										var $onSaleLabel= $("<label class='price onsale'>"+$li.attr("data-sale-price")+"</label>");
										$ulPriceOption.find("label").addClass("regular");
										$ulPriceOption.prepend($onSaleLabel);
									}
									self.$ul.append($ulPriceOption);
								}
								$li.insertAfter($ulPriceOption);
							} else {
								self.$ul.append($li);
							}
						} 
					}  catch(e){
						alert(e);
					};
				} else {
					self.$ul.append($li);
				}
			});
			if(self.$ul.find("li[id*='priceInfo']").size()>0){
				self.$ul.find("li[id*='priceInfo'] > label").css("display","block");
			} 
		},
		
		select: function( target, option ) {
			var $target = $( target );
			
			if ( $target.attr( "data-available" ) != "true" ) return false;
			
			$target.addClass( "selected" ).siblings().removeClass( "selected" );
			//this.$label.html( OptionTemplates.option_type_label( option ) );
			
			this.current_selection = option;
			this.trigger( 'select', { option_type: this.model, option: option } );
		}
	});
	
	return OptionManager;
})( jQuery, _, OptionData || {} );