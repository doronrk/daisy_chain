/*! Copyright (c) 2011-2013 EasyAsk LLC. All Rights Reserved.
 * Use, reproduction, transfer, publication or disclosure is prohibited 
 * except in accordance with the License Agreement.
 */
var autoComplete = easyAskServer + '/EasyAsk/AutoComplete-1.2.0.jsp';

(function( $, undefined ) {
	
	EAAutoComplete = function(){
		return {
			defaults: {
				dict: null,
				submitFctn: function () {},
				id: 'question',
				sort: 'weight',
				reduce: 'cluster',
				matchAllSearchWords: true,
				matchAnySuggestionWord: true,
				delay: 300,
				minLength: 2,
				prompt: null,
				handler: null,
				serverSearch: '',
				urlSearch: '/EasyAsk/apps/Advisor.jsp?indexed=1&oneshot=1&ie=UTF-8&disp=json&RequestAction=advisor&RequestData=CA_Search&CatPath=All Products&defarrangeby=////NONE////',
				server: '',
				url: autoComplete,
				xOffset: 0,
				yOffset: 0,
				widthOffset: 0,
				search: {
					heading:{
						display: true,
						format: '<span class="ea-sug-sec-head-title">Search Suggestions for:&nbsp;</span><span class="ea-sug-sec-head-value">{value}</span>'
					},
					size: 5
				}
			},
			defaultProducts: {
				products: {
					size: 5,
					value: function(item,field){ return item[field]; },
					fields: {
						thumbnail: 'thumbnail',
						name: 'name',
						link: 'link',
						description: 'description',
						price: 'price'
					},
					heading:{
						display:true,
						format: '<span class="ea-sug-sec-head-title">Products</span><span class="ea-sug-sec-head-count">total:&nbsp;{count}</span>'
					},

					sizes: {
						name: 45,
						description: 100
					}
				},
				navigation: {
					size: 2,
					heading:{
						display: true,
						format: '<span class="ea-sug-sec-head-title">{title}</span><span class="ea-sug-sec-head-count">total:&nbsp;{count}</span>'
					},
					sections: [{
						type: 'category',
						size: 5,
						title: 'Category'
					}]
				}
			},
			init: function(opts, dct){
				var options = $.extend(true,this.defaults,{
					dict: dct,
					position: {
						collision: "none",
						my: (opts.horizAlign || "right") + " top",
						at: (opts.horizAlign || "right") + " bottom"
					}
				},opts.products?$.extend(true,{},this.defaultProducts,opts):opts);
				if (options.dict){
					if (options.xOffset || options.yOffset){
						options.position.offset = options.xOffset + " " + options.yOffset;
					}
					this._init(options);
				}
				return this;
			},
			_init: function(opts){
				var options = $.extend({},opts,{
					source: function(request, response ) {
						this.lastSearch = null;
						var self = this;
						$.ajax({
							url: self.options.server + self.options.url,
							dataType: "jsonp",
							data: {
								dct: self.options.dict,
								num: self.options.search.size,
								key: request.term
							},
							success: function( data ) {
								if (data.suggests){
									if (data.input == self._value()){
										if (self.options.handler){
											self.options.handler(data.input,data.suggests);
										}
										else {
											response( $.map( data.suggests, function( item, _idx ) {
												return {
													label: item.val,
													value: item.val,
													start: item.start,
													end: item.end
												};
											}));
										}
										if (data.suggests && 0 < data.suggests.length){
											// add a spacer for options (rounded corners);
											self.menu.element.find('li :last').after($('<div class="ea-sug-last-spacer"></div>'));
											self.newSearch = true;
											self.findProducts(data.suggests[0].val,true);
											self.showSuggestions();
										}
									}
								}
								else {
									self.disable();
								}
							}
						});
					},

					select: function( event, ui ) {
						var widget = $(this).data("autocomplete");
						setTimeout(function(){ 
							widget.term = '';
							widget.options.submitFctn();
						},10);  // let the select complete then process it
					},

					create: function(evt, ui){
						var widget = $(this).data("autocomplete");
						widget._on({
							keydown: function(event){
								var keyCode = $.ui.keyCode;
								if (keyCode.ENTER == event.keyCode || keyCode.NUMPAD_ENTER == event.keyCode){
									clearTimeout(widget.searching); 
									if (!widget.menu.active && widget.menu.element.is(':visible')){
										setTimeout(function(){widget.close(event);},10);
									}
									setTimeout(function() { 
										$('#searchButton').click();//asj 7/9/13
										$('#searchText').val(''); //clearing inputs
										}, 10);
								}
							}
						});
					},
					open: function() {
						var widget = $(this).data("autocomplete");
						widget.openCnt++;
						this.currentWidth = undefined;
						if (widget.wrapperId){
							$(widget.wrapperId).show();
						}

					},

					close: function(event,ui) {
						var widget = $(this).data("autocomplete");
						widget.openCnt = 0;
						this.currentWidth = undefined;
						widget.term = '';  // clear copy since using ajax
						$(widget.wrapperId).hide();
					},

					focus: function(event,ui){
						if (ui.item && (event.keyCode || $(this).data("autocomplete").options.hover)){ // only on keyboard unless hover
							$(this).data("autocomplete").findProducts(ui.item.label,false); 
						}
					}
				});
				this._widget = $('#' + options.id).autocomplete(options).data("autocomplete");
				// emulate placeholder support if prompt is specified
				if (options.prompt){
					var supportsPlaceholder = ('placeholder' in document.createElement('input'));
					if (supportsPlaceholder){
						$('#' + options.id).attr('placeholder',options.prompt);
					}
					else {
						$('#' + options.id).each(function(){
							var placeholder = options.prompt;
							if ($(this).val() === '') {
								$(this).val(placeholder).addClass('ea-sug-placeholder');
							}
							$(this).bind('focus',function() {
								if ($(this).val() === placeholder) {
									$(this).val('').removeClass('ea-sug-placeholder');
								}
							})
							.bind('blur',function() {
								if ($(this).val() === '' && $(this).val() !== placeholder) {
									$(this).val(placeholder).addClass('ea-sug-placeholder');
								}
							});
						});
					}
				}
			},
			disable: function() { 
				this._widget.cancelSearch = true; 
			}
		};
	};

	$(function() {
		var acprototype = $.ui.autocomplete.prototype;
		var ac_renderMenu = acprototype._renderMenu;
		var ac_create = acprototype._create;
		$.extend(acprototype,{
			openCnt: 0,
			// overrides
			_create: function(){
				ac_create.call(this);
				this.element.attr("spellcheck","false");
				var menu = this.menu.element;
				var zindex = parseInt(menu.css('z-index')) || 100;    
				var widget = this;
				var divWrapper = $('<div class="ea-sug-wrapper" ></div>')
				.on(
						'mousedown', function(event){
							event.preventDefault();
							widget.cancelBlur = true;
							widget._delay(function() {
								delete widget.cancelBlur;
							});
						})
						.zIndex(zindex)
						.width('0px')
						.css('display','none')
						.uniqueId().appendTo('body');
				this.wrapperId = '#' + divWrapper.attr('id');
				var divLeftCol = $('<div class="ea-sug-nav ea-sug-nav-left" style="float:left;display:none;z-index:' + (zindex+1) + '"></div>')
				.uniqueId().appendTo(divWrapper);
				this.leftColId = '#' + divLeftCol.attr('id');
				var divMenu = $('<div class="ea-sug-section"></div>').uniqueId().appendTo(divLeftCol);
				this.menuId = '#'+divMenu.attr('id');
				if (this.options.search && this.options.search.heading.display){
					$('<div class="ea-sug-sec-heading ea-sug-sug">'+this.generateHeading(this.options.search.heading.format,null,'&nbsp;',null)+ '</div>').appendTo(divMenu);
				}
				menu.zIndex((zindex+1).toString());
				menu.removeClass('ui-corner-all ui-autocomplete').detach().appendTo(divMenu);
				this.rightColId = '#' + $('<div class="ea-sug-nav ea-sug-nav-right" style="float:left;display:none;z-index:' + (zindex+1) + '"></div>')
				.uniqueId().appendTo(divWrapper).attr('id');
				this.spacerId = '#'+$('<div class="ea-sug-spacer" style="height:0px;clear:both;"></div>').uniqueId().appendTo(divWrapper).attr('id');
				this.txtNode = $('<span style="display:none;"></span>');
			},
			_renderItem: function(ul,item){
				return $('<li class="ui-menu-item" style="width:auto;"></li>')
				.append($('<a class="ui-corner-all"></a>').data('ui-autocomplete-item',item)
						.append($('<div></div>').css('whiteSpace','nowrap')
								.append($('<span class="ea-sug-text">' + item.label.substring(0,item.start) + 
										'</span><span class="ea-sug-match">' + item.label.substring(item.start,item.end) + 
										'</span><span class="ea-sug-text">' + item.label.substring(item.end)+'</span>'))))
										.appendTo(ul);
			},
			_renderMenu: function( ul, items ) {
				$(this.menuId + ' .ea-sug-sec-head-value').text('"' + this.term + '"');
				ac_renderMenu.call(this,ul,items);
				ul.addClass('ea-sug-menu').removeClass('ui-widget-content');
			},
			_resizeMenu: function() {
				var ul = this.menu.element;
				if (ul.is(':hidden')){
					ul.outerWidth( Math.max(
							// Firefox wraps long text (possibly a rounding bug)
							// so we add 1px to avoid the wrapping (#7513)
							ul.width( "" ).outerWidth() + 1,
							this.options.fixedWidth || this.element.outerWidth()
					) ); 
				}
			},
			_suggest: function( items ) {
				var ul = this.menu.element
				.empty()
				.zIndex( this.element.zIndex() + 1 );
				this._renderMenu( ul, items );
				this.menu.refresh();

				// size and position menu
				var wasHidden = ul.is(':hidden');
				ul.show();
				this._resizeMenu();
				if (wasHidden) {
					ul.position( $.extend({
						of: this.element
					}, this.options.position ));
				}
				if ( this.options.autoFocus ) {
					this.menu.next();
				}
			},

			// extensions
			trimString: function(val, len){
				if (val){
					if (val.length < len){
						return val;
					}
					else {
						var sub = val.substring(0,len);
						var idx = sub.lastIndexOf(' ');
						if (-1 < idx){
							sub = sub.substring(0,idx);
						}
						sub += '...';
						return sub;
					}
				}
				return val;
			},

			setColWidth: function(elt,width){
				elt.outerWidth(width);
				var inner = elt.width();
				elt.children('.ea-sug-section').each(function(){$(this).outerWidth(inner);});
			},

			showSuggestions: function(){
				if (this.newSearch && this.openCnt < 2){
					this.newSearch = false;
					var width = this.menu.element.outerWidth(true);
					var inner = $(this.wrapperId).outerWidth(width)
					.show()
					.position($.extend({
						of: this.element
					},this.options.position))
					.width();
					$(this.leftColId).show();
					this.setColWidth($(this.leftColId),inner);
					$(this.menuId).css('position','static');
					this.menu.element.css({'position':'relative','float':'','width':'','top':'0px','left':'0px'});
					this.currentWidth = this.originalWidth = inner;
				}
			},

			addSearch: function(data,srch) { 
				if (data && 0 == data.returnCode && data.source && data.source.products && data.source.products.items){
					var htmlProd = this.generateProducts(data,this.options.products.heading);
					var htmlNav = this.generateNavigation(data);
					if (htmlNav){ // 2 col
						$(this.rightColId).addClass('ea-sug-multi-column');
					}
					var inner = this.originalWidth;
					var menuDiv = $(this.menuId);
					var widthLeft = htmlNav?((inner/2 + .5) | 0):inner; // default 50%
					if (htmlNav){
						var splitPos = this.options.leftWidth;
						if (splitPos){
							// already a number (default in px)
							if (!isNaN(splitPos) && 0 < splitPos && splitPos < inner){
								widthLeft = splitPos | 0;
							}
							else {
								var val = parseFloat(splitPos);
								if (!isNaN(val)){
									if (splitPos.charAt(splitPos.length-1) == '%' && 0.0 < val && val < 100.0){
										widthLeft = (inner * val / 100.0 + .5) | 0;
									}
									else if (splitPos.toLowerCase().substring(splitPos.length-2) == 'px' && 0.0 < val && val < inner){
										widthLeft = val | 0;
									}
								}
							}
						}
					}
					if (htmlNav){
						$(this.rightColId).show();
						this.currentWidth = widthLeft;
					}
					else {
						widthLeft = this.originalWidth;
						$(this.rightColId).hide();
					}
					$(this.spacerId).width(inner);
					if (htmlProd){
						var cnt = data.source.products.itemDescription.totalItems;
						if (this.prodId){
							$(this.prodId).remove();
						}
						var divProd = $('<div class="ea-sug-section ea-sug-prod ea-sug-section-vertical-space"></div>').uniqueId(); 
						this.prodId = '#' + divProd.attr('id');
						divProd.appendTo($(this.leftColId)).show();
					}
					else if (this.prodId){
						$(this.prodId).hide();
					}
					this.setColWidth($(this.leftColId),widthLeft);
					var widthRight = inner-widthLeft-2; // 2 for borders on nav
					if (htmlProd){
						this.setColWidth($(this.rightColId),widthRight);
					}
					this.renderNavigation(htmlNav);
					this.renderProducts(htmlProd);
				}
				else {
					// no products -> no html, widen to original
					$(this.rightColId).hide();
					$(this.prodId).hide();
					this.setColWidth($(this.leftColId),this.originalWidth);
				}
			},

			generateHeading: function(format, title, value, cnt){
				var html = '';
				if (format){
					var html = format;
					var idx;
					if (title){
						idx = html.indexOf('{title}');
						if (-1 < idx){
							html = html.substring(0,idx) + title + html.substring(idx+'{title}'.length);
						}
					}
					if (value){
						idx = html.indexOf('{value}');
						if (-1 < idx){
							html = html.substring(0,idx) + value + html.substring(idx+'{value}'.length);
						}
					}
					if (cnt){
						var idx = html.indexOf('{count}');
						if (-1 < idx){
							html = html.substring(0,idx) + cnt + html.substring(idx+'{count}'.length);
						}
					}
				}
				return html;
			},

			generateCategory: function(cat,pathStart){
				return '<li class="ea-sug-nav-value">' +
				'<a class="ea-sug-nav-link" ea_link="' + this.htmlEncode(pathStart+cat.nodeString) + '" href="#">' + cat.name + '</a>' + (0 < cat.productCount?('<span class="ea-sug-nav-count">&nbsp;(' + cat.productCount +')</span>'):'') + '</li>';
			},
			generateCategories: function(size,title,lstCats,pathStart,format){
				if (lstCats && 0 < lstCats.length){
					var lst = '<div class="ea-sug-sec-heading">' + this.generateHeading(format,title,null,lstCats.length) + '</div><ul class="ea-sug-choices">';
					for(var i = 0; i < size && i < lstCats.length; i++){
						lst += this.generateCategory(lstCats[i],pathStart);
					}
					lst += '</ul>';
					return lst;
				}
			},


			generateAttribute: function(av,pathStart){
				return '<li class="ea-sug-nav-value">' +
				'<a class="ea-sug-nav-link" ea_link="' + this.htmlEncode(pathStart + av.nodeString) + '" href="#">' + av.attributeValue + '</a>' + (0 < av.productCount?('<span class="ea-sug-nav-count">&nbsp;(' + av.productCount +')</span>'):'') + '</li>';
			},

			generateAttributes: function(size,title,attr,pathStart,format,full){
				if (attr){
					// use full or initial, if initial and none, then use full
					var valList = full?attr.attributeValueList:(attr.initialAttributeValueList || attr.attributeValueList);
					if (valList && 0 < valList.length){
						var lst = '<div class="ea-sug-sec-heading">' + this.generateHeading(format,title,null,valList.length) + '</div><ul class="ea-sug-choices">';
						for(var i = 0; i < size && i < valList.length; i++){
							lst += this.generateAttribute(valList[i],pathStart);
						}
						lst += '</ul>';
						return lst;
					}
				}
			},

			getCategories: function(ds,full){
				// use full or initial list, if initial and none then use full
				return ds.categories?(full?ds.categories.categoryList:(ds.categories.initialCategoryList || ds.categories.categoryList)):null;
			},

			getAttributes: function(ds,name){
				if (ds.attributes){
					var lcName = name.toLowerCase();
					for(var i = 0; i < ds.attributes.attribute.length;i++){
						var attr = ds.attributes.attribute[i];
						if (attr.name.toLowerCase() == lcName){
							return attr;
						}
					}
				}
				return null;
			},

			SEARCH_NODE: 3,

			getSearch: function(ds){
				var npl = ds.navPath.navPathNodeList;
				if (npl && 0 < npl.length){
					var node = npl[npl.length-1];
					if (node.navNodePathType == this.SEARCH_NODE){
						return node.seoPath+'/';
					}
				}
				return "";
			},
			textOnly: function(val){
				if (val){
					try {
						return this.txtNode.html(val).text();
					}
					catch(err){}
				}
				return val;
			},
			generateProduct: function(item){
				var fields = this.options.products.fields;
				var sizes = this.options.products.sizes;
				var value = this.options.products.value;
				var link = value(item,fields.link);
				var thumbnail = value(item,fields.thumbnail);
				var name = this.trimString(this.textOnly(value(item,fields.name)),sizes.name);
				var price = this.textOnly(value(item,fields.price));
				var description = this.trimString(this.textOnly(value(item,fields.description)),sizes.description);
				return '<tr class="ea-sug-product">' + 
				'<td class="ea-sug-product-picture">' +
				(link?'<a class="ea-sug-product-picture-link" href="' + (link || '#') + '">':'') + 
				(thumbnail?'<image class="ea-sug-product-image"  src="' + thumbnail +'">':'') + 
				(link?'</a>':'') + 
				'</td>' +
				'<td class="ea-sug-product-info">' + 
				(link?'<a class="ea-sug-product-info-link" href="' + (link || '#') + '">':'') +
				(name?'<div class="ea-sug-product-name">' + name + '</div>':'') +
				(description?'<div class="ea-sug-product-desc">' + description + '</div>':'') + 
				(price?'<div class="ea-sug-product-price">' + price + '</div>':'') +
				(link?'</a>':'') +
				'</td>' +
				'</tr>';
			},

			generateProducts: function(data,heading){
				var ds = data && 0 == data.returnCode?data.source:null;
				if (ds && ds.products && ds.products.items){
					var cnt = ds.products.itemDescription.totalItems;
					var html = '';
					if (heading && heading.display){
						html = '<div class="ea-sug-sec-heading">' + this.generateHeading(heading.format,null,null,cnt) + '</div>';
					}
					html += '<table class="ea-sug-products" border="0" style="width:100%"><tbody>';
					var self = this;
					$.map( data.source.products.items, function(item,_idx){       
						html += self.generateProduct(item);
					});
					html += '</tbody></table>';
					return html;
				}
				return null;
			},

//			defaultSectionHeaderFormat: '<span class="ea-sug-sec-head-title">{title}</span><span class="ea-sug-sec-head-count">{count}</span>',

			generateNavigation: function(data){
				var ds = data && 0 == data.returnCode?data.source:null;
				if (ds){
					var navOpts = this.options.navigation.sections || [];
					var html = '';
					var navGenerated = 0;
					var pathStart = this.getSearch(ds);
					var maxSections = this.options.navigation.size || 2;
					for(var i = 0; i < navOpts.length && navGenerated < maxSections; i++){
						var classType = '';
						var itemHtml = null;
						var navOpt = navOpts[i];
						var format = null;
						if (navOpts.heading){
							if (navOpts.heading.display){
								format = navOpts.heading.format || this.options.navigation.heading.display;
							}
						}
						else if (this.options.navigation.heading.display){
							format = this.options.navigation.heading.format;
						}
						if (navOpt.type.toLowerCase() == 'category'){
							itemHtml = this.generateCategories(navOpt.size,navOpt.title || 'Category',this.getCategories(ds,navOpt.full),pathStart,format);
							classType = ' ea-sug-cat';
						}
						else {
							itemHtml = this.generateAttributes(navOpt.size,navOpt.title,this.getAttributes(ds,navOpt.type),pathStart,format,navOpt.full);
							classType = ' ea-sug-attr';
						}
						if (itemHtml){
							var extraClass = 0 == navGenerated++?'':' ea-sug-section-vertical-space';
							html += ('<div class="ea-sug-section' + classType + extraClass + '">'+itemHtml+'</div>');
						}
					}
					if (html){
						html += ('<div class="ea-sug-section-vertical-space" style="clear:both;height:30px"></div>'); 
						html += ('<div class="ea-sug-nav-tm">&nbsp;</div>');
					}
					return html;
				}
				return null;
			},

			renderProducts: function(html){
				$(this.prodId).html(html).show();
				$('.ea-sug-product').each(function(){
					$(this).hover(function() {
						$(this).find('.ea-sug-product-name').toggleClass('ui-state-hover');
					});
				});
				$('.ea-sug-product :not(:last)').find('.ea-sug-product-info').addClass('ea-sug-product-separator');
				$('.ea-sug-product-name').addClass('ui-corner-all');
			},

			renderNavigation: function(html){
				if (html){
					var nav = $(this.rightColId);
					nav.empty().append($(html));
					nav.find('.ea-sug-section').find('li :last').after($('<div class="ea-sug-last-spacer"></div>')); // last entries in each section need padding
					nav.show();
					var widget = this;
					$('a.ea-sug-nav-link').each(function(){
						var link = $(this);
						link.unbind('click').click(function(event){
							widget.close();
							widget.options.submitFctn('nav',$(link).attr('ea_link'));
							event.stopImmediatePropagation();
						});
					});
					$('.ea-sug-nav-value').each(function(){
						$(this).addClass('ui-corner-all')
						.on({
							mouseenter: function( event ) {
								$( event.currentTarget ).addClass( "ui-state-hover ui-state-focus" );
							},
							mouseleave: function( event ) {
								$( event.currentTarget ).removeClass( "ui-state-hover ui-state-focus" );
							},
							click: function(event){
								$(event.target).closest('.ea-sug-nav-value').find('a.ea-sug-nav-link').click();
							}
						});
					});

				}
				return;
			},

			findProducts: function(q,s){
				if (this.options.products){
					if (this.lastSearch == q){
						return;
					}
					this.lastSearch=q;
					this.getProducts(q,s);
				}
			},

			htmlEncode: function (str) {
				return String(str)
				.replace(/&/g, '&amp;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
			},

			getProducts: function(q,s){
				var self = this;
				$.ajax({
					url: self.options.serverSearch + self.options.urlSearch,
					dataType: 'jsonp',
					data: {
						dct: this.options.dict,
						q: q,
						ResultsPerPage: this.options.products.size
					},
					success: function(prods){
						self.addSearch(prods,s);
					}
				});
			}
		});
	});


}( jQuery ));
