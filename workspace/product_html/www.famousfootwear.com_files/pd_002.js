// CAPITALIZE WORDS
String.prototype.capitalize = function() { var words = this.split(' '); for (var i in words) {words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase(); } return words.join(' '); }
// DEBUG LOGGER
if (typeof(console) !== 'undefined') {
	var bug = {active: (/\.dev|\.com\.local/.test(window.location.href)), extend:function(prop) {bug[prop] = function(){if (bug.active) {for (var i in arguments) {console[prop](arguments[i]); } } }; }, init:function(){if (console) {for (var i in console) {bug.extend(i); } } else {bug.log = function(){}; bug.warn = function(){}; } } };
	bug.init();
} else {
	var bug = { log:function(){} };
}

bug.active = false;

if ($.cookie('StoreInfo') && !/store/i.test(window.location.href)) {
	var storeInfo = jQuery.parseJSON($.cookie('StoreInfo'));
	if (storeInfo.store || storeInfo.ID) {
		var storeNumber = storeInfo.store ? storeInfo.store : storeInfo.ID;
		window.location.hash = '#store=' + storeNumber + '&resultsmode=';
	}
}


/* ---------------------------------------- */
/* SHARED SIZE SELECT FUNCTIONALITY ------- */
/* ---------------------------------------- */
var sizes = {
	timeout:false,
	selectedSize:false,
	updatePlaceholder: function(){
		var optEl = $('select.SizeWidth option:selected');
		var txt   = optEl.attr('data-short-text') ? optEl.attr('data-short-text') : optEl.text();
		if (typeof(colorThumbs) !== 'undefined') {
			if (!colorThumbs.selectedExp.test(txt) && !/size/i.test(txt)) {
				colorThumbs.selectedExp = new RegExp(txt.replace(/[\s]+/g, '[\\s]+').replace(/\(/g, '\\(').replace(/\)/g, '\\)'), 'i');
			}
		}
		var txty = $('.rightCol .sortby .select-placeholder');
		if (txt.length > 16) txt = txt.substring(0,16);
		txty.text( txt );
	},
	sizeSelect: function(){
		/* SHOP A STORE */
		if (typeof(sas) !== 'undefined') {
			if (typeof(sas.storeInfo) == 'object') {
				sas.storeInfo.size = $('select.SizeWidth option:selected').val();
				if (typeof(sas.storeInfo.size) == 'undefined') sas.storeInfo.size = sas.storeInfo.productId + '-000-00';
			}
		}
		/* // end SHOP A STORE */
		sizes.updatePlaceholder();
	},
	storeOnlyTemplate: pd.tmpl['cart-notice'],
	storeOnlyActive: false,
	storeOnlyCheck: function() {
		if (sas.storeOnlySizes) {
			if (!/-000-00/.test(sas.storeInfo.size)) {
				if ($.inArray(sas.storeInfo.size, sas.storeOnlySizes) > -1 && !this.storeOnlyActive || this.storeOnlyActive && $.inArray(sas.storeInfo.size, sas.storeOnlySizes) < 0 ) {
					this.storeOnlyActive = !this.storeOnlyActive;
					$('button.addToCart').toggleClass('inactive');
					$('#sas-cart-notice').html( Mustache.to_html(this.storeOnlyTemplate, this) );
				}
			}
		}
	},
	replaceSizeSelect: function(attributes) {
		for (var i = 0; i < attributes.Sizes.length; i++) {
	  	if (colorThumbs.selectedExp.test(attributes.Sizes[i].Name)) {
	  		attributes.Sizes[i].Active = true;
	  	}
	  	attributes.Sizes[i].LongText = attributes.Sizes[i].Name.replace(/[\s]*\(EU [0-9.]+\)/, '');
	  	attributes.Sizes[i].ShortText = attributes.Sizes[i].LongText.length > 13 ? attributes.Sizes[i].LongText.substr(0,13) + '...' : attributes.Sizes[i].LongText;
	  }
	  var selectWrap    = $(Mustache.to_html(colorThumbs.selectTmpl, attributes));
		var selectEl      = selectWrap.find('select');
		var placeholderEl = selectWrap.find('.select-placeholder');
	  $('select.SizeWidth, .rightCol .sortby').first().replaceWith( selectWrap );
		selectEl.change(function(){
			selectEl.removeClass('active');
			sizes.selectedSize = $('select.SizeWidth option:selected').text();
			sizes.sizeSelect();
			sas.sizeAvailable  = sas.sizeCheck() ? true : false;
			sizes.storeOnlyCheck();
			sas.renderNotice();
			if ($('#sas-choose').is(':visible')) {
				sas.api_query('availabilityAPI');
			}
		});
		if (/msie/i.test(navigator.userAgent) && $.browser.version <= 10) {
			selectEl.addClass('pp');
			placeholderEl.addClass('pp');
		}
		$('.rightCol .input-select .select-placeholder').click(function(){
			var elem = $(this).siblings('select').first();
			elem.toggleClass('active');
			if (document.createEvent) {
				var e = document.createEvent("MouseEvents");
				e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				elem[0].dispatchEvent(e);
			} else if (element.fireEvent) {
				elem[0].fireEvent("onmousedown");
			}
		});
		sizes.sizeSelect();
	},
	combineSizes: function(sizes1, sizes2) {
		/* COMBINE ONLINE AND IN-STORE SIZES */
		var combArr    = [];
		var combReturn = [];
		for (var i in sizes1) { if (sizes1[i].Value) combArr[sizes1[i].Value] = sizes1[i]; }
		for (var i in sizes2) { if (sizes2[i].Value) combArr[sizes2[i].Value] = sizes2[i]; }
		for (var i in combArr) {
			if (combArr[i].Value) combReturn.push( combArr[i] );
		}
		combReturn.sort(function(a, b) {
			if(a.Value < b.Value) return -1;
			if(a.Value > b.Value) return 1;
			return 0;
		});
		return combReturn;
	},
	sizeDiff: function(sizes1, sizes2) {
		/* RETURNS VALUES THAT ARE UNIQUE TO SIZES1 */
		var s1Vals = [];
		var s2Vals = [];
		for (var i in sizes1) { if (sizes1[i].Value) s1Vals.push(sizes1[i].Value); }
		for (var i in sizes2) { if (sizes2[i].Value) s2Vals.push(sizes2[i].Value); }
		var unique = $.grep(s1Vals, function(n, i){
		  return $.inArray(n, s2Vals) == -1;
		});
		bug.log('Store Only Sizes:', unique);
		return unique;
	}
};
/* ---------------------------------------------- */
/* //end SHARED SIZE SELECT FUNCTIONALITY ------- */
/* ---------------------------------------------- */


/* -------------------------------------- */
/* COLOR THUMBNAIL FUNCTIONALITY ------- */
/* ------------------------------------ */
var colorThumbs = {
	selectTmpl: pd.tmpl['select-sizes'],
	currProdID: $('.SKUtxt').text().match(/[0-9]+/)[0],
	selectedExp: /size/i,
	brand: $('.PD_Brand').text() ,
	style: $('.PD_Style').text(),
	currColor: $('select[name$="ddlColor"] option:selected').val().toLowerCase(),
	markup: '<p class="colorText">Selected Color: ' + $('select[name$="ddlColor"] option:selected').text().toLowerCase() + '</p>',
	ratingsPlaced:false,
	imageDoctor: function(img) {
		var testSrc = /shoes_/i.test($(img).attr('src')) ? $(img).attr('src').replace(/shoes_/i, 'FF_') : $(img).attr('src').replace(/ff_/i, 'shoes_');
		var testImage = new Image();
		$(testImage).load(function(){
			$(img).attr('src', testSrc);
		}).attr('src', testSrc);
	},
	initialize: function() {
		/* CAPTURE IMAGE ERRORS */
		$('#divExtThumbs img, .prodImg img').error(function(){
			colorThumbs.imageDoctor(this);
		});
		/* CLEAN UP ADD TO CART BINDINGS */
		$('.addToCart').click(function(){
			if (!/size/i.test($('[id$="ddlSizeAndWidth"]').val())) {
				if (!$(this).hasClass('inactive')) {
					sas.add_to_cart();
				}
			} else {
				alert('Please select a size');
			}
			return false;
		});

		/* ADD RATINGS */
		$BV.ui("rr", "show_reviews", {
			productId: colorThumbs.currProdID,
			subjectType: "product",
			onEvent: function(response) { 
				if (!colorThumbs.ratingsPlaced && response.attributes.numReviews > 0) {
					$('[id$="ProductPrice"]').after('<span class="starRating' + Math.round(response.attributes.avgRating / .5) * 5 + '"></span>');
					colorThumbs.ratingsPlaced = true;
				} else {
					$('#BVDefaultLink').hide();
				}
			}
		});

		colorThumbs.re = new RegExp(colorThumbs.currColor, 'i');
		var ths = $('#divExtThumbs img');
		var srcImg = ths.filter(function(k,im){ return /_ib|_i2/i.test($(im).attr('src')); });
		srcImg = srcImg.length > 0 ? $(srcImg[0]).attr('src') : $(ths[0]).attr('src');
		colorThumbs.srcImg = srcImg;
		colorThumbs.srcImg = colorThumbs.srcImg.replace(/_i2/, '_ib');
		colorThumbs.srcImg = /\?/.test(colorThumbs.srcImg) ? colorThumbs.srcImg.replace('details-thumb', 'trim.threshold=105&maxheight=54&maxwidth=62') : colorThumbs.srcImg + '?trim.threshold=105&maxheight=54&maxwidth=62';
		$('select[name$="ddlColor"]').each(function(){
			$(this).find('option').each(function(){
				var opt = $(this).val();
				var color = $(this).text();
				var cl = colorThumbs.re.test(opt) ? 'class="active"' : ''
				colorThumbs.markup += '<div class="color"><div class="color-wrap"><a ' + ( colorThumbs.re.test(opt) ? 'class="active"' : '' ) + ' href="/Shopping/ProductDetails.aspx?p=' + opt + '" title="' + color  + '" alt="' + color + '"><img src="' + colorThumbs.srcImg.replace(colorThumbs.re, opt) + '" onerror="colorThumbs.imageDoctor(this)" /></a></div></div>';
			});
		}).attr('onchange', '').unbind('change');

		$('div[id$="divChooseStep1"]').prepend( colorThumbs.markup ).find('select').unbind().attr('onchange', '').hide().end().find('a').click(function(){
			$(this).addClass('active').closest('.color').siblings().find('a').removeClass('active');
			var prodID = $(this).attr('href').match(/p=([0-9]+)/)[1];
			if ($('.addToCart').length < 1) {

			} else {
				/* UPDATE URL FOR MODERN BROWSERS */
				var origColorText = $(this).attr('title');
				var colorText = origColorText.replace(/[^a-z]+/ig, '_');
				if (history.replaceState) {
					var newLoc = window.location.href.replace(/[0-9]+-/, prodID+'-').replace(window.location.href.match(/http:\/\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/([^\/]+)\//)[1], colorText);
					window.history.replaceState("", document.title, newLoc);
				}
				if (typeof(colorThumbs.colorClick) == 'function') {
					colorThumbs.colorClick(prodID, origColorText);
					return false;
				}
			}
		});
		
		/* INITIATE THE NEW SELECT FIELD */
		var attributes = {};
		attributes.Sizes = [];
		$('select[id$="SizeAndWidth"] option').each(function(){
			if (!$(this).text().match(/select/i)) {
				attributes.Sizes.push({Name:$(this).text(),Value:$(this).val()});
			}
		});
		colorThumbs.sizes = attributes.Sizes;
		sizes.replaceSizeSelect(attributes);
	}
}
colorThumbs.initialize();
/* -------------------------------------------- */
/* //end COLOR THUMBNAIL FUNCTIONALITY ------- */
/* ------------------------------------------ */

/* ----------------------- */
/* ADDITIONAL ROW ------- */
/* --------------------- */
if ($.browser.msie && $.browser.version < 9) {
	$(document).ready(function(){ 
		var markup = pd.tmpl['product-row'];
		$('#ProdDetailsTabs').before( markup );
		$('.TurnToItemTeaser').appendTo( $('.prodRow .right') );
		$('.rightCol-infos').appendTo( $('.prodRow .right') );
		$('#ProductDescription').appendTo( $('.prodRow .left') );
	});
} else {
	$('#prodDetailWrap').after( pd.tmpl['product-row'] );
}
var placeIntervals = 0;
var placeRowContent = setInterval(function(){
	if ($('.rightCol #ProductDescription').length > 0) {
		clearInterval(placeRowContent);
		if (typeof(colorThumbs) == 'object') {
			sizes.sizeSelect();
		}
		$('.btn_Add2Cart').appendTo('[id$="divChooseStep2"]');
		if ($('.prodRow .right').length > 0) {
			$('.TurnToItemTeaser').appendTo( $('.prodRow .right') );
			$('.rightCol-infos').appendTo( $('.prodRow .right') );
			$('#ProductDescription').appendTo( $('.prodRow .left') );
		}

		/* WIRE UP NEW BUTTON... */
		var newBtnEl = $('button.addToCart');
		var btnEl = $('.btn_Add2Cart');
		var btnAttrs = {
			name: btnEl.attr('name'),
			alt: btnEl.attr('alt'),
			onclick: btnEl.attr('onclick')
		};
		
		// for (var i in btnAttrs) {
		// 	newBtnEl.attr(i, btnAttrs[i]);
		// }

	}
	placeIntervals++;
},100);
/* ----------------------------- */
/* //end ADDITIONAL ROW ------- */
/* --------------------------- */

/* -------------------- */
/* BREADCRUMBS ------- */
/* ------------------ */
(function(){
	var map = [false,false,'Gender',false,'Brand','Category'];
	var sortCrumbs = function(crumbs){
		var finds = ['Gender', 'Brand', 'Category'];
		var found = [];
		var names = [];
		var newCrumbs = [];
		for (var i in crumbs) {
			var c = crumbs[i];
			if (c.type === 'Gender') {
				var brandSlot = $.inArray('Brand', map);
				if (brandSlot > -1) {
					c.parts[brandSlot] = '_';
					c.href = c.parts.join('/');
				}
			}
			if ($.inArray(c.type, found) < 0 && $.inArray(c.name, names) && $.inArray(c.type, finds) > -1 > -1) {
				found.push(c.type);
				names.push(c.name);
				newCrumbs.push(c);
			} else if (c.type == 'Category' && $.inArray('Subcategory', found) < 0) {
				c.type = 'Subcategory';
				found.push(c.type);
				newCrumbs.push(c);
			}
		}
		return {crumbs:newCrumbs,product:[{name:$('[id$="DisplayName"]').text()}]};
	};
	var brandFound = false;
	var crumbs = [];
	$('#breadcrumbs li a').each(function(){
		var parts = [];
		var href = $(this).attr('href');
		if (!/http:/.test(href)) {
			var id = $(this).attr('id');
			if (/products/i.test(href)) {
				parts.push({href:href, p:href.split('/')});
				for (var i=0; i<parts.length;i++) {
					for (var j in map) {
						if (map[j] && parts[i].p[j] !== '_') {
							crumbs.push({type:map[j],name:parts[i].p[j].substring(parts[i].p[j].indexOf('~')).replace(/[^a-z0-9]+/ig, ' '),href:parts[i].href,parts:parts[i].p});
							if (map[j] == 'Gender' && !brandFound) {
								if ($('#brandLink').length > 0) {
									brandFound=true;
									crumbs.push({type:'Brand',name:$('#brandLink').text(),href: $('#brandLink').attr('href')});
								}
							}
						}
					}
				}
			}
		}
	});
	var currUrl = seoRoutesNativeUrl.replace(/famousfootwear\./, 'famous.').replace(/p=[^&]+/, 'p=' + colorThumbs.currProdID);
	var socialLinks = {
		links: [
			{
				name:'twitter',
				cl:'icon-twitter-bird',
				baseurl:'https://twitter.com/intent/tweet?', 
				vars: {
					url: currUrl,
					text: colorThumbs.brand + colorThumbs.style + ' at Famous Footwear',
					hashtags: 'famousfootwear',
					partnerID: 'social_p-tweet'
				}
			},
			{
				name:'pinterest',
				cl:'icon-pinterest',
				baseurl:'http://www.pinterest.com/pin/create/button/?',
				vars: {
					url: currUrl,
					partnerID: 'social_p-tweet',
					media: encodeURI(/\.com|\.dev|\.local/i.test($('.prodImg img').first().attr('src')) ? $('.prodImg img').first().attr('src') : window.location.href.split('/').slice(0,3).join('/') + $('.prodImg img').first().attr('src')),
					description: colorThumbs.brand + colorThumbs.style + ' at Famous Footwear #famousfootwear'
				}
			},
			{
				name:'facebook',
				cl:'icon-facebook',
				baseurl:'http://www.facebook.com/sharer.php?',
				vars: {
					u: currUrl
				}
			}
		],
		composer: function(){
			var assembledLinks = [];
			for(var i = 0; i < this.links.length; i++) {
				var urlPairs = [];
				for (var j in this.links[i].vars) {
					urlPairs.push( encodeURI(j + '=' + this.links[i].vars[j]) );
				}
				var data = {
					name: this.links[i].name,
					cl: this.links[i].cl,
					href: this.links[i].baseurl + urlPairs.join('&')
				};
				assembledLinks.push(data);
			}
			return assembledLinks;
		}
	};
	var compiled = sortCrumbs(crumbs);
	compiled.social = socialLinks.composer();
	$('#prodDetailWrap').before( Mustache.to_html( pd.tmpl['hansel-and-gretel'], compiled) );
	$('#newBreadcrumbs a').click(function(){
		var href = $(this).attr('href');
		var mediaLoc = /\.com|\.dev|\.local/i.test($('.prodImg img').first().attr('src')) ? $('.prodImg img').first().attr('src') : window.location.href.split('/').slice(0,3).join('/') + $('.prodImg img').first().attr('src');
		href = href.replace(/p=[^&]+/, 'p=' + colorThumbs.currProdID).replace(/media=[^&]+/, 'media=' + encodeURI(mediaLoc));
		if ($(this).closest('div').hasClass('social')) {
			var w = window.open(href,'name','height=500,width=750');
			return false;
		} else {
			$(this).attr('href', href);
		}
	});

})();
/* -------------------------- */
/* //end BREADCRUMBS ------- */
/* ------------------------ */

/* -------------------- */
/* PERCENT OFF ------- */
/* ------------------ */
(function(){
	var percentEl  = $('#SalePriceDiscount');
	if (percentEl.length > 0) {
		var percentOff = parseInt(percentEl.text().match(/[0-9]+/)[0]);
		if (percentOff < 10) {
			var price     = $('[id$="ProductPrice"]').text().match(/[0-9.]+/)[0];
			var origPrice = $('.origPrice').length > 0 ? $('.origPrice').text().match(/[0-9.]+/)[0] : price;
			var savings   = (origPrice - price).toFixed(2);
			if (savings % 5 == 0) {
				$('.salesTag-percOff').hide();
				percentEl.text('You save $' + savings);
			} else {
				percentEl.hide();
				$('.salesTag-percOff').hide();
			}
		}
	}
}());
/* -------------------------- */
/* //end PERCENT OFF ------- */
/* ------------------------ */


/* -------------------- */
/* SHOP A STORE ------- */
/* -------------------- */
var sas = (function(){
	var sas = {
		templates : {
			notice: pd.tmpl['sas-notice'],
			stores: pd.tmpl['sas-stores']
		},
		PC : /mac/i.test(navigator.userAgent) ? false : true,
		/* BASE STORE INFO FROM COOKIE TURN INTO JSON OBJECT */
		storeInfo : $.cookie('StoreInfo') ? $.parseJSON( $.cookie('StoreInfo') ) : false,
		storeSelected: this.storeInfo ? true : false,
		/* API INFORMATION */
		renderNotice: function(){
			var $notice = $( Mustache.to_html( sas.templates.notice, sas) );
			$notice.find('[data-action="stores"]').click(function(){
				/* HIDE IF VISIBLE // QUERY IF SIZE SELECTED // ALERT IF SIZE NEEDED */
				if ($('#sas-choose').is(':visible')) {
					$('#sas-stores-wrapper').html('');
				} else if (!/select/i.test(sas.storeInfo.size)) {
					sas.api_query('availabilityAPI');
				} else {
					alert('Please select a size');
				}
				return false;
			});
			$('#sas-notices-wrapper').html('').append( $notice );
		},
		sizeCheck: function() {
			if (sas.availableSizes.length > 0) {
				for (var i in sas.availableSizes) {
					if (sas.availableSizes[i].Value == sas.storeInfo.size) {
						return true;
					}
				}
			}
			if (/select/i.test(sas.storeInfo.size)) return true;
			return false;
		},
		sizeAPI: {
			// url: /stg\.www/i.test(window.location.href) ? 'http://stg.api.famousfootwear.com/api/store/v1/sizeAvailability?' : 'http://api.famousfootwear.com/api/store/v1/sizeAvailability?',
			url: 'http://ffapi.brownshoeinc.netdna-cdn.com/api/store/v1/sizeAvailability',
			dataType: 'json',
			vars: ['webStoreId', 'productId', 'storeNumber', 'json'],
			timeout:function(){ bug.log('timeout triggered'); },
			success: function(response) {
				sas.alsoAvailabeAt = false;
				sas.availableSizes = response.Sizes ? response.Sizes : [];
				if (sas.storeInfo.AddrLine2) {
					sas.daddr = encodeURI(sas.storeInfo.AddrLine2.replace(' ', '+').replace(/&.*/, '') + ', ' + sas.storeInfo.City.replace(' ', '+') + ' ' + sas.storeInfo.State + ' ' + sas.storeInfo.ZipCode.substring(0,5));
				}
				bug.log('Store Sizes: ', sas.availableSizes);
				sas.isAvailable    = sas.availableSizes.length > 0;
				sas.sizeAvailable  = sas.sizeCheck() ? true : false;
				if (typeof(colorThumbs) !== 'undefined' && typeof(sas) !== 'undefined') {
					sas.storeOnlySizes = sizes.sizeDiff(sas.availableSizes, colorThumbs.sizes);
					if (sas.storeOnlySizes.length > 0) {
						/* LET'S UPDATE THE SIZE SELECT IF THERE ARE STORE UNIQUE SIZES */
						var attributes = {};
						attributes.Sizes = sizes.combineSizes(sas.availableSizes, colorThumbs.sizes);
						sizes.replaceSizeSelect( attributes );
					}
				}
				if (sas.timeout) clearTimeout(sas.timeout);
				/* THIS IS THE GOOD ONE... */
				sas.renderNotice();
				sizes.storeOnlyCheck();
			},
			error: function(data) { bug.log('there was an error.'); }
		},
		availableSizes:[],
		availabilityAPI: {
			// url: /stg\.www/i.test(window.location.href) ? 'http://stg.api.famousfootwear.com/api/store/V1/productAvailabilityByZip' : 'http://api.famousfootwear.com/api/store/V1/productAvailabilityByZip',
			url: 'http://ffapi.brownshoeinc.netdna-cdn.com/api/store/V1/productAvailabilityByZip',
			dataType: 'json',
			vars: ['webStoreId', 'radius', 'zipCode', 'json', 'productId', 'size'],
			timeout:function(){ bug.log('timeout triggered'); },
			success: function(response) {
				var $input = $('.input-select input[name="storeZip"]');
				if (sas.Zip) {
					sas.ZipAvailable = true;
				} else if (($input.length > 0 || sas.storeInfo.ZipCode) && !sas.Zip) {
					sas.ZipAvailable = true;
					sas.Zip = $input.length > 0 ? ($input.val().length > 0 ?  $input.val() : sas.storeInfo.ZipCode.substring(0,5)) : sas.storeInfo.ZipCode.substring(0,5);
				} else if (!sas.Zip) {
					sas.ZipAvailable = false;
					sas.Zip = '';
				}
				if (response.Stores) {
					sas.alsoAvailableAt = true;
					sas.Stores = response.Stores;
					sas.Count = response.Stores.length;
					for (var i in sas.Stores) {
						sas.Stores[i].Address1 = sas.Stores[i].Address1.capitalize();
					}
				} else {
					/* NO STORES FALLBACK... */
					sas.alsoAvailableAt = false;
				}
				$('#sas-stores-wrapper').html( Mustache.to_html(sas.templates.stores, sas) ).show().find('.input-select a').click(function(){
					if (/^\d{5}$/.test($('#sas-stores-wrapper .input-select input').val())) {
						sas.Zip = $('#sas-stores-wrapper .input-select input').val();
						$('#sas-stores-wrapper .input-select input').removeClass('error');
						sas.api_query('availabilityAPI');
					} else {
						$('#sas-stores-wrapper .input-select input').addClass('error');
					}
					return false;
				}).end().find('.input-select input').keypress(function(e){
					if (e.which == 13) {
						if (/^\d{5}$/.test($('#sas-stores-wrapper .input-select input').val())) {
							$('#sas-stores-wrapper .input-select input').removeClass('error');
							sas.Zip = $('#sas-stores-wrapper .input-select input').val();
							sas.api_query('availabilityAPI');
						} else {
							$('#sas-stores-wrapper .input-select input').addClass('error');
						}
						return false;
					} else if (/^\d{5}$/.test($('#sas-stores-wrapper .input-select input').val())) {
						$('#sas-stores-wrapper .input-select input').removeClass('error');
					}
				}).keyup(function(e){
					if (/^\d{5}$/.test($('#sas-stores-wrapper .input-select input').val())) {
						$('#sas-stores-wrapper .input-select input').removeClass('error');
					}
				}).focus(function(){
					if (sas.Zip) { 
						if (sas.Zip.length < 1) $(this).blur();
						$(this).val( sas.Zip ).unbind('focus');
						if (/trident/i.test(navigator.userAgent)) {
							setTimeout(function(){
								var len = $('[name="storeZip"]').val().length;
								$('[name="storeZip"]')[0].setSelectionRange(len,len);
							},100);
						}
					}
				}).focus().end().find('a[data-store]').click(function(){
					bug.log('data-store clicked');
					var index = $(this).index('a[data-store]');
					var thesaurus = {
						Address1: 'AddrLine1',
						Address2: 'AddrLine2',
						Country: 'CountryName',
						IntersectionStreet: 'IntersectionStr',
						MilesAway: 'Miles',
						Name: 'StoreName',
						Number: 'ID',
						StoreHours: 'Hours',
						Zip: 'ZipCode',
						zipCode: 'ZipCode'
					};
					for (var i in sas.Stores[index]) {
						bug.log(i, sas.Stores[index][i])
						if (thesaurus[i]) {
							sas.storeInfo[ thesaurus[i] ] = sas.Stores[index][i];
						} else {
							sas.storeInfo[i] = sas.Stores[index][i];
						}
					}
					sas.storeSelected = true;
					sas.storeInfo.storeNumber = sas.Stores[index]['Number'];
					sas.storeInfo.ID          = sas.Stores[index]['Number'];
					sas.storeInfo.Store       = sas.Stores[index]['Number'];
					window.StoreInfoCookie = JSON.stringify( sas.storeInfo );
					$.cookie('StoreInfo', StoreInfoCookie, {path:'/', expires:365, domain:(/\.dev/.test(window.location.href) ? '.famousfootwear.dev' : '.famousfootwear.com') });
					$('#sas-stores-wrapper').html('');
					sas.init();
					$('#feature-links .choose-your-store').addClass('selected');
					$('#TopMargin .store-name .store').text( sas.storeInfo.AddrLine1 );
					if (typeof(sas.storeInfo.size) == 'undefined') sas.storeInfo.size = sas.storeInfo.productId + '-000-00';
					return false;
				}).end().find('[data-action="geolocation"]').click(function(){
					if (!navigator.geolocation) {
						alert('Sorry, your browser does not support geolocation');
					} else {
						$('[data-action="geolocation"]').html('<i class="icon-gps-location"></i> Loading...').addClass('loading');
						sas.geo();
					}
					return false;
				});
			},
			error: function(data) { bug.log('there was an error.'); }
		},
		availableStores:[],
		/* SHARED TIMEOUT VARIABLE */
		timeout:false,
		add_to_cart: function() {
			var staging_check = location.href.match('http:\/\/([^.]+)\.www')
			if (staging_check) {
				var api_url = 'http://' + staging_check[1] + '.api.famousfootwear.com/api/v1/cart';
			} else {
				var api_url = 'http://api.famousfootwear.com/api/v1/cart';
			}
			var item_data = {
			  "ProductId":colorThumbs.currProdID,
			  "VariantId":typeof($('[id$="ddlSizeAndWidth"]').val()) == 'undefined' ? colorThumbs.currProdID + '-000-00' : $('[id$="ddlSizeAndWidth"]').val(),
			  "Quantity":1
			};
			if (typeof(r_cart) == 'undefined') {
				$('[id$="btnAddToCart"]').trigger('click');
			} else if (typeof(colorThumbs.add) == 'function') {
				colorThumbs.add();
				return false;
			} else {
				$('html,body').animate({scrollTop: $('.cart-link').offset().top-60}, 400);
				r_cart.add(item_data.ProductId, item_data.VariantId, item_data.Quantity);
			}
		},
		/* SHARED API QUERY FUNCTION */
		api_query: function(apiVar){
			var api = this[apiVar];
			var parameters    = {};
			var undefinedFlag = false;
			for (var i in api.vars) {
				if (/zipcode/i.test(api.vars[i])) {
					/* THIS IS THE ZIPCODE INTERCEPT */
					var $input = $('.input-select input[name="storeZip"]');
					if (($input.length > 0 || sas.storeInfo.ZipCode) && !sas.Zip) {
						if (!sas.storeInfo.ZipCode) sas.storeInfo.ZipCode = '';
						sas.Zip = $input.length > 0 ? ($input.val().length > 0 ?  $input.val() : sas.storeInfo.ZipCode.substring(0,5)) : sas.storeInfo.ZipCode.substring(0,5);
					}
					// queryPairs.push(api.vars[i] + '=' + sas.Zip);
					parameters[ api.vars[i] ] = sas.Zip;
					if (typeof(sas.Zip) == 'undefined') undefinedFlag = true;
				} else {
					// queryPairs.push(api.vars[i] + '=' + this.storeInfo[api.vars[i]]);
					parameters[ api.vars[i] ] = this.storeInfo[api.vars[i]];
					if (typeof(this.storeInfo[api.vars[i]]) == 'undefined') undefinedFlag = true;
				}
			}
			if (undefinedFlag) {
				bug.log('undefined was in the query. running success function');
				api.success({});
			} else {
				$.cors(api.url, 'GET', function(response,status){ 
					clearTimeout(sas.timeout);
					if (typeof(api.success) == 'function') api.success(response);
					else alert('success function not defined for: ' + apiVar);
				}, parameters, (typeof(api.error) == 'function' ? api.error : function(){ bug.log('error not defined for: ' + apiVar); }) );
			}
		},
		/* IMPORTED LOAD SCRIPT FUNCTION */
		loading:[],
		test_load_script:function(src, func, test) {
			if (test && typeof(func) == 'function') {
				func();
			} else {
				this.load_script(src, func);
			}
		},
		load_script: function(src, func, test) {
			if (typeof(test) !== 'undefined') {
				this.test_load_script(src, func, test);
			} else if (sas.loading.indexOf(src) < 0) {
				if (typeof(window.initialize) !== 'function') { window.initialize = function(){}; }
				var head = document.getElementsByTagName('head')[0];
			  var script = document.createElement('script');
			  script.type = 'text/javascript';
			  if (typeof(func) == 'function') {
			  	script.onreadystatechange = function() {
				    if (this.readyState == 'complete') {
				      func();
				    }
				  };
				  script.onload = func;
			  }
			  script.src = src;
			  head.appendChild(script);
			} else {
				bug.log('tried to load something more than once...');
			}
		},
		/* GEOLOCATION */
		geoZip: false,
		geo:function(){
	    try {
	      window.navigator.geolocation.getCurrentPosition(this.geo_success,  this.geo_error);
	    } catch(e) {
	      console.log(e);
	      alert('Sorry, your browser does not support geolocation');
	    }
	  },
	  geo_success: function(position) {
	    sas.geo_position = position;
	    $.load_script('//maps.google.com/maps/api/js?key=AIzaSyAqd42TntiJsJfUjScDgp9K17PtyDnGqbo&sensor=true&v=3.12&callback=sas.geo_google', function(){}, typeof(google) !== 'undefined');
	    // sas.geo_google(position);
	  },
	  geo_error: function(error) {
	    var message = 'There was a generic error';
	    switch (error.code) {
	        case error.PERMISSION_DENIED:
	            message = "This website does not have permission to use " + 
	                      "the Geolocation API";
	            break;
	        case error.POSITION_UNAVAILABLE:
	            message = "The current position could not be determined.";
	            break;
	        case error.PERMISSION_DENIED_TIMEOUT:
	            message = "The current position could not be determined " + 
	                      "within the specified timeout period.";            
	            break;
	    }
	  },
	  geo_google: function() {
	    /* --- STEP 3 - USE GOOGLE TO TRANSLATE COORDS TO ZIP CODE */
	    var position  = sas.geo_position;
	    var latlng    = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	    var geocoder  = new google.maps.Geocoder();
	    sas.ltype     = 'geo';
	    geocoder.geocode({'latLng': latlng}, function(results, status) {
	      try{
	        var address_components = results[0].address_components;
	        for (var i in address_components) {
	          if ( address_components[i].types[0] == 'postal_code' ) {
	            sas.Zip = address_components[i].short_name;
	            sas.geoZip = sas.Zip;
	            break;
	          }
	        }
	        sas.type = 'geo';
	        sas.geo_zip();
	      } catch(e) {
	        sas.reset_form();
	        alert('Sorry, we had trouble using your GPS. Please enter your zip code.');
	        return false;
	      }
	    });
	  },
	  geo_zip: function(){
	    /* --- STEP 4 - QUERY SERVICE WITH ZIP */
	    var data = {
	      'webStoreId' : 20000,
	      'radius' : 25,
	      'zipCode'    : sas.Zip,
	      'json' : 'true'
	    };
	    $('[data-action="geolocation"]').html('<i class="icon-gps-location"></i> My Location').removeClass('loading');
	    $('.input-select input').val( sas.Zip );
	    sas.api_query('availabilityAPI');
	  },
		/* INITIALIZE AND EXTEND */
		init: function(){
			$('.addToCart').click(function(){
				if ($(this).hasClass('inactive') || $(this).hasClass('disabled')) {
					return false;
				}
			});
			if (!this.storeInfo) this.storeInfo = {};
			this.storeInfo.webStoreId = 20000;
			if (window.location.href.match(/([0-9]+)-/)) {
				this.storeInfo.productId  = window.location.href.match(/([0-9]+)-/)[1];
			}
			this.storeInfo.json = true;
			this.storeInfo.radius = 25;
			if (this.storeInfo.ZipCode) {
				this.storeInfo.ZipCode = this.storeInfo.ZipCode.substring(0,5);
				this.storeInfo.storeNumber =  this.storeInfo.storeNumber ? this.storeInfo.storeNumber : this.storeInfo.Store;
				this.storeInfo.size = $('.SizeWidth option:selected').val(),
				this.api_query( 'sizeAPI' );
			} else {
				this.renderNotice();
			}
			$('#content-body').click(function(ev){ 
				var testArr = ['aspnetForm', 'prodRow', 'prodDetailWrap'];
				var testID  = $(ev.target).attr('id').length > 0 ? $(ev.target).attr('id') : $(ev.target).attr('class');
				if ($.inArray(testID, testArr) > -1 && $('#sas-choose').length > 0) {
					if ($('#sas-choose').is(':visible')) { $('#sas-stores-wrapper').hide(); }
				}
			});
		},
	};
	sas.init();
	return sas;
})();
/* -------------------------- */
/* //end SHOP A STORE ------- */
/* -------------------------- */