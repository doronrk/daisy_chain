try{
rei.prod = { // product page NS
	regID: '',
	itCameFromImgClick: false,
	itCameFromRetailSelect: false,

	addItemHeroSwap: function(){
		rei.prod.showThumbnailImage($('#sku').trigger('click'));
	}, // addItemHeroSwap()
	showThumbnailImage: function($styleDD, clickImage){
		if($styleDD.val() === '' || $styleDD.attr('selectedIndex') < 0){
			return;
		}

		var fullColorName = '';
		try{
			fullColorName = $('option', $styleDD).eq($styleDD.attr('selectedIndex')).attr('fullcolorname').toUpperCase();
		}
		catch(err){}
		if(fullColorName !== null && fullColorName !== ''){
			var list = $('#productCarousel a[alt="'.concat( fullColorName, '"]'));
			if(list.length === 0){
				list = $('#productCarousel a[alt*="'.concat( fullColorName, '"]'));
			}
			if(list.length === 0 && fullColorName.indexOf("'") > -1){
				var partColor = fullColorName.split("'")[0];
				$('#productCarousel a').each(function(index){
					if($(this).attr('alt').toUpperCase().indexOf(partColor) > -1){
						$(this).attr({alt2:partColor});
					}
				});
				list = $('#productCarousel a[alt2="'.concat(partColor, '"]'));
			}
			showThumbnail = function(){
				var img = null;
				try{
					// prefer ' on body'/front view
					img = $(list).filter('[alt*=FRONT]:first')[0]||list[0];
				}catch(err){ }

				if(img !== null){
					$(img).trigger('click');
				}
				else{
					//stay on the current image
				}
			};
			if(list.length === 0){
				colorObj = mediaFiles[fullColorName];
				if(colorObj !== null){
					var highRes = colorObj.highResImage;
					//highRes = location.protocol.concat('//www.rei.com',highRes);
					var lowRes = colorObj.lowResImage;

					if(fullColorName.toLowerCase() !== 'none'){
						$('#imgLabel').html(fullColorName);
					}
					else{
						$('#imgLabel').html('');
					}

					$('#featuredImg').attr({src:'http://www.rei.com' + lowRes});
					$('#featuredImg').attr({hiresimg:highRes});
					$('#zoomLink').attr({href:highRes});
					$('#productCarousel li.active').removeClass('active');
					$('#wrapper').attr({'class':'zoomEnabled'});
				}
				else{
					showThumbnail();
				}
			}
			else{
				showThumbnail();
			}
		}

	},
	zoomLoadTimer: 0,
	zoomVars: {offset:{top:0,left:0},axis:'',scale:0,hiresW:0,hiresH:0,lgW:0,lgH:0,loupeW:0,loupeH:0,loupeL:0,loupeT:0,styleAttr:'',loupeXmax:0,loupeYmax:0,w:430,h:330,centerX:0,centerY:0,centerYzoom:0,centerXzoom:0,hiresYmin:0,hiresXmin:0},
	zoomImgLoad: function(a){
		var axis, h, w = document.getElementById('featuredImg'),
			o = rei.prod.zoomVars;
		// w is the DOM element img#featuredImg!
		h = o.lgH = w.offsetHeight;
		// overwrite w
		w = o.lgW = w.offsetWidth;
		o.hiresW = this.width;
		o.hiresH = this.height;
		// the image dimensions don't match, figure out the scale based on the longer axis
		// assume both #featuredImg and #zoomImg have the same long axis (but different sizes)
		axis = o.axis = this.height > this.width ? 'vert':'horiz';
		// fraction showing in static sized viewport box (#zoomBox)
		o.scale = (axis == 'vert') ? (this.height/h):(this.width/w);
		// what fraction is #featuredImg relative to #zoomImg
		o.scaleLoupe = (axis == 'vert') ? (h/this.height):(w/this.width);
		// fraction relative to smaller img#zoomLink
		// scale of hiresimg with respect to viewport (#zoomBox)
		o.loupeW = o.scaleLoupe * o.w;
		o.loupeH = o.scaleLoupe * o.h;

		// half the size shifted into center of viewport
		o.centerX = o.hiresW/2 - 215;
		o.centerY = o.hiresH/2 - 165;

		o.loupeL = o.loupeW/2;
		o.loupeT = o.loupeH/2;
		// max is size of zoomImgOverlay: 422x330 (less 2px for border) - size of box
		o.loupeXmax = 420-o.loupeW;
		o.loupeYmax = 328-o.loupeH;
		o.hiresYmin = (this.height - o.h) * -1;
		o.hiresXmin = (this.width - o.w) * -1;

		o.styleAttr = 'width:'.concat(o.loupeW,'px;height:',o.loupeH,'px;');
	}, // zoomImgLoad()
	zoomInit: function(e){
		var prod = rei.prod;
		clearTimeout(prod.zoomLoadTimer);
		prod.zoomLoadTimer = setTimeout(function(){
			try{
				document.getElementById('zoomImg').src =
					document.getElementById('zoomLink').href;
			}catch(err){}
		},300);
	}, // zoomInit()
	zoomPan: function(e){
		e.preventDefault();
		e.stopPropagation();
		var prod = rei.prod;
		switch(e.target.id){
		case 'zoomImgOverlay':
		// animate zoom
			var o = prod.zoomVars;
			e = e.originalEvent.touches ? e.originalEvent.touches[0]:e;
			var _left = (e.layerX||(e.offsetX||(e.pageX-o.offset.left))), _top = (e.layerY||(e.offsetY||(e.pageY-o.offset.top)));
			var x = Math.round(_left-o.loupeL),
				y = Math.round(_top-o.loupeT);
			if(isNaN(y) || isNaN(x)) return;
			x = x < 0 ? 0:(x > o.loupeXmax ? o.loupeXmax:x);
			y = y > o.loupeYmax ? o.loupeYmax:(y <= 0 ? 0:y);
			var l = document.getElementById('zoomLoupe');
			var styl = o.styleAttr+'left:'+x+'px;top:'+y+'px;';
			l.setAttribute('style',styl),
				l.style.cssText = styl;
			// img#zoomImgOverlay is 422x330, so half that gives its center @ 211,165:
			// box center
			x = Math.round(o.centerX + (_left-211)*o.scale) * -1,
				y = Math.round(o.centerY + (_top-165)*o.scale) * -1;
			if(isNaN(y) || isNaN(x)) return;
			// min,max due to rounding errors
			x = x >= 0 ? 0:(x < o.hiresXmin ? o.hiresXmin:x);
			y = y >= 0 ? 0:(y < o.hiresYmin ? o.hiresYmin:y);
			//styl = 'left:'.concat(x,'px;top:',y,'px');
			styl = 'left:'+x+'px;top:'+y+'px;';
			l = document.getElementById('zoomImg');
			l.setAttribute('style',styl),
				l.style.cssText = styl;
			l = styl = 0;
		break;
		default:
		// hide zoom
			prod.zoomPanEnd(e);
		}
	}, // zoomPan()
	zoomPanEnd: function(e){
		var prod = rei.prod;
		clearTimeout(prod.zoomPanTimer);
		switch(e.type){
		case 'touchend':
			$('#zoomImgOverlay').unbind('touchmove',prod.zoomPan).unbind('touchend',prod.zoomPanEnd).bind('touchstart',prod.zoomPanInit);
		break;
		default:
			$(document).unbind('mousemove',prod.zoomPan);
			$('#zoomImgOverlay').bind('mousemove',prod.zoomPanInit);
		}
		document.getElementById('container').className = '';
	},
	zoomPanInit: function(e){
		var hiResImageUrl = $('#productCarousel .jcarousel-item.active a').attr('hiresimg');

		if(hiResImageUrl !== undefined && hiResImageUrl !== null && hiResImageUrl !== ''){

			$imgKim = $('#imgKim');
			$imgKim.attr({src:hiResImageUrl});

			var $lowResImage = $('img[name=product_img]');
			var $zoomLink = $('#zoomLink');

			var properties = {
				hiResImageUrl : hiResImageUrl,
				highResHeight : $imgKim.height(),
				highResWidth : $imgKim.width(),
				targetDivHeight : 386,
				targetDivWidth : 470,
				lowResImageHeight : $lowResImage.height(),
				lowResImageWidth : $lowResImage.width()
			};

			if($('#divKim').length === 0){
				$('#product').before('<div id="divKim" style="position:absolute;z-index:10;height:386px;width:470px;background:white; background-repeat:no-repeat;background-position: 0 0; background-image:url(' + $('#zoomImg').attr('src') + ')"></div>');
				$('body').append('<img id="imgKim" style="position: absolute; top:-2000px; left: -2000px;" />');
			}




			var diffWidth = ($zoomLink.width() - properties.lowResImageWidth)/2;
			var diffHeight = ($zoomLink.height() - properties.lowResImageHeight)/2;

			var offsetX = 0, offsetY = 0;
			if (!e.offsetX){
				offsetX = e.layerX - $(e.target).position().left;
				offsetY = e.layerY - $(e.target).position().top;
			}
			else{
				offsetX = e.offsetX;
				offsetY = e.offsetY;
			}

			var actualImageX = offsetX-diffWidth;
			var actualImageY = offsetY-diffHeight;

			if(actualImageX < 0){
				actualImageX = 0;
			}

			if(actualImageY < 0){
				actualImageY = 0;
			}


			//console.log('actualImageX:' + actualImageX + ',actualImageY:' + actualImageY);
			var highResLeft = actualImageX * -1 * (properties.highResWidth/properties.lowResImageWidth);
			var highResTop = actualImageY * -1  * (properties.highResHeight/properties.lowResImageHeight);


			var bgPosX = highResLeft + properties.targetDivWidth/2;
			var maxX = 0, minX = -1*properties.highResWidth + properties.targetDivWidth;
			if(bgPosX > 0){
				bgPosX = 0;
			}
			else if(bgPosX < minX){
				bgPosX = minX;
			}

			var bgPosY = highResTop + properties.targetDivHeight/2;
			var maxY = 0, minY = -1*properties.highResHeight + properties.targetDivHeight;
			if(bgPosY > 0){
				bgPosY = 0;
			}
			else if(bgPosY < minY){
				bgPosY = minY;
			}
			//console.log('bgPosX:' + bgPosX + ',bgPosY:' + bgPosY);

			$divKim = $('#divKim');
			$divKim.show().css({'background-image': 'url(' + $('#zoomImg').attr('src') + ')','background-position': bgPosX + 'px ' + bgPosY + 'px'});
			$('#product').css({visibility:'hidden'});

			/*start display loupe box*/
			var loupeWidth = 78;
			var loupLeft = offsetX - loupeWidth/2;
			var maxLoupeLeft = $zoomLink.width() - loupeWidth-2;
			if(loupLeft < 0){
				loupLeft = 0;
			}
			else if(loupLeft > maxLoupeLeft){
				loupLeft = maxLoupeLeft;
			}
			var loupeHeight = 60;
			var loupeTop = offsetY - loupeHeight/2;
			var maxLoupeTop = $zoomLink.height() - loupeHeight-2;
			if(loupeTop < 0){
				loupeTop = 0;
			}
			else if(loupeTop > maxLoupeTop){
				loupeTop = maxLoupeTop;
			}
			$('#zoomLoupe').css({top:loupeTop, left: loupLeft, height:loupeHeight, width:loupeWidth}).show();
			/*end display loupe box*/
		}
	},
	zoomPanShow: function(){
		var prod = rei.prod;
		prod.zoomFadeStep = 0;
		document.getElementById('container').className = 'zoomShow';
		prod.setOpacity(0);
		prod.zoomFade();
	}, // zoomPanShow()
	zoomPopupImgClick: function(e){
		e.preventDefault();
		var hiresimg = $(e.target).attr('hiresimg');
		if(!hiresimg) return;
		$(e.target.parentNode).addClass('active').siblings('.active').removeClass('active');
		var alt = $('#zoomPopupElement > h2').text((e.target.getAttribute('alt')||'').replace(/ FRONT$/, ' ')).text().toUpperCase();
		$('#zoomPopupElement > img').attr({src: hiresimg, 'alt':alt, 'title':alt});

	},
	zoomPopupElement: $(document.createElement('div')).attr({id:'zoomPopupElement'}).append('<h2 class="imgLabel"></h2><img id="zoomPopupImg" src="/etc/static/rei-wcm/pix/common/pixel.gif" alt="" title="" />'),
	zoomPopupCarouselScrollIntoView: function(carousel){
		var c = carousel;
		rei.prod.zoomPopupCarouselScrollIntoView = function(){
			c.scroll($.jcarousel.intval($('#zoomPopupCarousel li.active').attr('jcarouselindex')));
		};
	},
	zoomPopupClose: function(list, i, opts){
		$('#zoomPopupElement').addClass('hide');
		$('body').append($('#zoomPopupElement'));
	}, // zoomPopupClose()
	zoomPopupOpen: function(list, i, opts){
	// fancybox destroys content, we append the dom element here to work around this
		var l = rei.prod.zoomPopupElement;
		$('#zoomPopupElement').removeClass('hide');
		$('#fancybox-content').html('').append($('#zoomPopupElement')).find('#zoomPopupImg').attr('style','max-height:'.concat(Math.floor(opts.height-54), 'px;'));
		$('#zoomPopupCarousel ul.jcarousel-list-vertical').css({top:0});
//manually set image and label
		$('#zoomPopupImg').attr({src:$('#featuredImg').attr('hiresimg')});
		$('.imgLabel').html($('#imgLabel').html());

		// correct thumbnail
		$('#zoomPopupCarousel a[hiresimg*='.concat($('#zoomImg').attr('src').replace(/^(?:https?:\/\/[^\/]+)?(\/.+\.[jpengif]{2,5})\/?.*/,'$1'), ']')).trigger('click');
		setTimeout(rei.prod.zoomPopupCarouselScrollIntoView,0);
	}, // zoomPopupOpen()

	setOpacity: function(){
		var fn = function(i){
			document.getElementById('zoomBox').style.opacity = (i/10).toFixed(1);
		};
		/*@cc_on
		fn = function(i){
			document.getElementById('zoomImg').style.filter = document.getElementById('zoomBox').style.filter = 'alpha(opacity='.concat((i*10).toFixed(0),')');
		};
		@*/
		return fn;
	}(),
	// timers/util
	zoomFade: function(){
		var t = 30;
		// ie is slower so shorten delay
		/*@cc_on t=15 @*/
		var fn = function(){
		var prod = rei.prod;
		clearTimeout(prod.zoomFadeTimer);
		prod.setOpacity(prod.zoomFadeStep++);
		if(prod.zoomFadeStep < 11) prod.zoomFadeTimer = setTimeout(prod.zoomFade,t);
		};
		return fn;
	}(),
	zoomPanTimer: 0,
	zoomFadeTimer: 0,
	zoomFadeStep: 0,
	showProduct: function(){
		// prefer ' on body'/front view
		var onBodyRe = / FRONT$/;
	return function(e){
		var prod = rei.prod;

		try{
			e.preventDefault();
			e.stopPropagation();
		}
		catch(err){}
		// note that e.target does not exist for 'product image coming soon', see rei.prod.showProduct.call({
		if(!document.getElementById('imgLabel')) return;
		var _alt = this.getAttribute('alt');

		var colorName = '';
		if(_alt !== null && _alt.toLowerCase() !== 'none'){
			colorName = _alt;
		}
		$('#imgLabel').html(colorName);

		document.getElementById('featuredImg').src = this.getAttribute('lgimg');


		if(e.target) $(e.target.parentNode).addClass('active').siblings('.active').removeClass('active');
		else $('#productCarousel li.active').removeClass('active');
		var hiresimg = this.getAttribute('hiresimg') || '';
		$('#featuredImg').attr('hiresimg',hiresimg);

		if(hiresimg){
			document.getElementById('zoomLink').href=hiresimg;
			document.getElementById('productMedia').className = 'zoomEnabled';
		}else{
			document.getElementById('zoomLink').href='/etc/static/rei-wcm/pix/common/pixel.gif';
			document.getElementById('productMedia').className = '';
		}


	}; }(), // showProduct()
	cartTimeout: 0,
	invalidColorSizeQuantity: function(){
		var sku = document.additem.sku; //sku;
		var errors = 0;
		if(!sku[sku.selectedIndex].value){
			++errors;
			$('#skuError').removeClass('hidden').parent().addClass('errBox');
		}else{ $('#skuError').addClass('hidden').parent().removeClass('errBox'); }
		var quantity = document.additem.quantity;
		var n = Math.round(parseFloat(quantity.value,10));
		if(isNaN(n)) n = 0;
		quantity.value = n;
		if(n < 1){
			++errors;
			$('#quantityError').removeClass('hidden').parent().addClass('errBox');
		}else{ $('#quantityError').addClass('hidden').parent().removeClass('errBox'); }
		return !errors ? false:true;
	}, // invalidColorSizeQuantity()
	formSetup: function(){
	var prod = rei.prod;
	// note this.id does NOT work as expected
	switch($(this).attr('id')){
	case 'productSelectForm2':
		$('#sku').bind('change',function(e){
			// remove any error shown for Color/Size selector
			if(this[this.selectedIndex].value) $('#skuError').addClass('hidden').parent().removeClass('errBox');
		}).bind('change',prod.addItemHeroSwap);
		$('#quantity').bind('change',function(e){
			// remove any error message for quantity
			var n = Math.round(parseFloat(this.value,10));
			if(isNaN(n)) n = 0;
			this.value = n;
			if(n > 0) $('#quantityError').addClass('hidden').parent().removeClass('errBox');
		});
		if(window.freeShippingThreshold) $('#sku').bind('change',rei.prod.checkItemPrice_4MFS);
		$(this).submit(function(e){
			e.preventDefault();

			if(this.disabled) return false;
			this.disabled = true;
			this.className += ' busy';
			clearTimeout(prod.cartTimeout);

			if(prod.invalidColorSizeQuantity()){
				prod.reenableCart();
				return false;
			}
			//var req = (this.action).toString().concat('?',$(this).serialize());
			//Using add to cart web service - /rest/cart/item
			var req = ('/rest/cart/item').toString().concat('?',$(this).serialize());
			$(this).find("#cartFormButton").attr("disabled",true);
			// max 30s wait
			prod.cartTimeout = setTimeout(prod.reenableCart,10000);
			try{ // minicart.addToCart changes the analytic tags for the page. Trigger addToCart analytics before calling the minicart.addToCart will report correct analytic page tags.
				rei.analytics.addToCart(document.additem.itemNumber.value,rei.analytics.options.page_name);
			}catch(err){}
			minicart.addToCart(req, prod.reenableCart);

			return false;
		}).find('input[name=URL]').val('/minicart?storeId=' + storeId);
	break;

	case 'addtoregistryform2':
	$(this).submit(function(e){
		if(prod.invalidColorSizeQuantity()){
			return false;
		}
		// copy values from additem form to registry form
		var n = document.additem;
		this.quantity.value = n.quantity.value;
		n = n.sku;
		n = n[n.selectedIndex].value;
		this.sku.value = n;
		// may not need this:  this.catentryId.value = this.catEntryId.value = $("#sku option:selected").attr("catentryid");
		this.URL.value = '/GiftRegistryEditProductsDisplay/regID?storeId=8000&catalogId=40000008000&langId=-1';
		this.addToRegistry.value= "yes";
		this.registryId.value = rei.prod.regID;
		return true;
	});
	break;

	case 'addtowishlistform2':
	$(this).submit(function(e){
		if(prod.invalidColorSizeQuantity()){
			return false;
		}
		// copy values from additem form to wishlist form
		var n = document.additem;
		this.quantity.value = n.quantity.value;
		this.qty.value = n.quantity.value;
		n = n.sku;
		n = n[n.selectedIndex].value;
		this.sku.value =  n;
		try{
			//rei.analytics.addToWishList(document.additem.itemNumber.value);
		}catch(err){}
		return true;
	});
	break;
	} // switch

	}, // formSetup()
	reenableCart: function(){
	var busyRe = /\bbusy\b/g;
	return function(){
		clearTimeout(rei.prod.cartTimeout);
		var l = document.getElementById('productSelectForm2');
		if( l !== null )
		{
		    l.disabled = false;
		    l.className = l.className.replace(busyRe,' ');
		    $(l).find("#cartFormButton").attr("disabled",false);
		    l = 0;
		}
		return false;
	}; }(), // reenableCart()
	checkItemPrice_4MFS: function(){
		$('#priceRange_jsMessaging').show();
		$('#priceRange_xslMessaging').hide();
		// freeShippingThreshold, minValue from skus.xsl
		var sku = document.additem.sku;
		var ddlVal = sku[sku.selectedIndex].text;
		ddlVal = ddlVal.substring(ddlVal.indexOf('$')+1, ddlVal.length);
		if(isNaN(ddlVal)){ ddlVal = minValue; }

		if(parseFloat(ddlVal) >= parseFloat(freeShippingThreshold)){
			$('#priceRange_MFS_Y').show();
			$('#priceRange_MFS_N').hide();
		}else if(parseFloat(ddlVal) < parseFloat(freeShippingThreshold)){
			$('#priceRange_MFS_Y').hide();
			$('#priceRange_MFS_N').show();
		}
	}, // checkItemPrice_4MFS()
	load: function(){
		var prod = rei.prod;
		prod.reenableCart();
		// initialize the carousel
		if(document.additem && document.additem.sku.selectedIndex){ // is > 0
		// if the there is a style selected in the form, activate the corresponding image
			prod.addItemHeroSwap();

		}else{
		// otherwise initialize the first carousel thumbnail (xsl pairs the first and hero)

			$('#productCarousel a.imgSwatch:first').trigger('click');
		}

		// setup zoomImg events (via featuredImg load)
		$('#zoomImg').load(prod.zoomImgLoad);

		// initial img load event doesn't fire consistently across browsers, so bind and then trigger here
		$('#featuredImg').load(prod.zoomInit).trigger('load');


		//addthis, lazy load addthis js file, load on mouseover
		var addThisBound = false;
		var addThisUrl = $('.share').attr('href');
		$('.share').attr({href:''});
		$('.share').bind('mouseover', function(){
			if(addThisBound === false){
				addThisBound = true;
				// loaded in rei.js now
				//prod.loadAddThisJs();
				$('.share').attr({href:addThisUrl});
				return false;
			}
		});//end addthis

		// deferred code will wait for page to load:
		setTimeout( function(){
			//PUP Page Redirect

			$('#pupRedirectLink, #pupRedirectImg').bind('click',function(e){
				rei.analytics.sendSpEvent('pagecontent-_-online_btn-_-' + pupRedirectLinkTitle);
				rei.analytics.eVar38=sp_val;
				rei.analytics.eVar39=scPageName;
				rei.analytics.linkTrackVars="eVar38,eVar39,events,products";
				rei.analytics.products=';' + document.additem.itemNumber.value;
				rei.analytics.tl(true,"o",'SP Event');

			});
			$('#pupRedirectButton').bind('click',function(e){
				rei.analytics.sendSpEvent('pagecontent-_-online_btn-_-Take me to the new one');
				rei.analytics.eVar38=sp_val;
				rei.analytics.eVar39=scPageName;
				rei.analytics.linkTrackVars="eVar38,eVar39,events,products";
				rei.analytics.products=';' + document.additem.itemNumber.value;
				rei.analytics.tl(true,"o",'SP Event');

			});
			//End REI Difference

			//var URL = location.href;
			// original facebook like button implementation
			//$('#actionBar ul').append('<li><iframe width="90" scrolling="no" frameborder="0" style="border:none;overflow:visible;width:90px;height:21px;" src="http://www.facebook.com/plugins/like.php?href='.concat(encodeURIComponent(URL),'&amp;layout=button_count&amp;show_faces=false&amp;width=90&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe></li>'));

		}, 0);
		//people who bought analytics
		try{
			$('#mboxRegion ul li').each(function(index){
				$('a', this).each(function(j){
					var itemName = $(this).text();
					var href = $(this).attr('href');
					$(this).unbind('click').bind('click', function(e){
						rei.analytics.push(function(){
							var s = s_gi(s_account);
							s.linkTrackEvents = s.events ='event68';
							s.eVar39 = scPageName;
							s.eVar38 = 'cm_sp-_-pagecontent-_-prodinfor_horz-_' + itemName;
							s.linkTrackVars +="eVar38,eVar39,events";
							s.tl(true,"o",'SP Event');

						});
					});
				});
			});
		}
		catch(err){
		}
		//end people who bought analytics

		//remove default analytics for thumbnails
		$('#productCarousel a.img').unbind('click').bind('click', function(){

		});

	}, // load()
	ready: function(){
		var prod = rei.prod;
		 /**
			Manages Analytics Events for the product page components.  Utility class
			providing helper methods that send interaction data from knockout
			bindings to rei.analytics.
		*/

// TODO! may need to look into adding these click events back


		$('.imgSwatch').click(function(){
			prod.itCameFromImgClick = true;
		});

	try{
		try{
			if(preferredSku !== ''){
				$('#featuredImg').css({visibility:'visible'});
				$('#sku').change();
			}
		}
		catch(e){

		}

		document.body.className += ' js';
		prod = rei.prod;
		var prod_purchase_cook_obj = ReadGRCookie("GiftRegistryPurchase") || false;
		var prod_setup_cook_obj = ReadGRCookie("GiftRegistrySetup") || false;
		if (prod_setup_cook_obj) {
			prod.regID = escapeHTML(prod_setup_cook_obj.id);
		}
		// back_to_table is the "Back to John Jones's Registry." line under the Order box.
		var back_to_table = false;
		// order caveat stuff replaced by XSL. Left in until proper function is confirmed.
		var order_caveat_open = '<p class="giftBoxNote">';
		var seasonal_txt = '';
		var order_caveat_close = '</p>';
		var order_caveat_txt = "";

        //The outlet class is added to DOM only for outlet products. Using the same to determine whether its rei or outlet product
        var isNotOutlet = $( "div:has('.outlet')" ).length === 0 ;

        //Show the gift registry link only for rei(non-outlet) products
		if(isNotOutlet){
			if (prod_setup_cook_obj) {
				// enable add to registry link: setup handler and show it
				$('#submitAddToRegistry').bind('click',function(e){
					e.preventDefault();
					$(document.addtoregistryform).submit();
				}).removeClass('is-hidden');
				$('.ggChild.g3').removeClass('mt11');
				$('#userLists').addClass('has-registry');
				back_to_table = prod_setup_cook_obj;
				// is_seasonal from productDisplay.xsl
				if (window.is_seasonal) {
					if (order_caveat_txt.length > 0) {
						order_caveat_txt += seasonal_txt;
					} else {
						order_caveat_txt = order_caveat_open;
						order_caveat_txt += seasonal_txt;
						order_caveat_txt += order_caveat_close;
					}
				}
			} else {
				var l = $('#rspu_message');
				if($(l).attr('rspuOnly') == 'true' || parseInt($(l).attr('miscCharges'),10) > 0) $(l).removeClass('hidden');
			}
		}

		// enable addToWishList and show 'add to wish list' link
		$( '#submitAddToWishList' ).bind( 'click', function( e ){
			e.preventDefault();
			e.stopPropagation();

			$( document.addtowishlistform ).submit();
		});
		$('#userLists').removeClass('hidden');


		$('.siv-fancyBox').fancybox({
			'height': 595,
			'padding': 0,
			'width': 870,
			'scrolling':'no',
			'autoScale': false,
			onComplete: function(){
				$('#fancybox-content').css({padding:0});
			}
		});

		$('#shipping a').fancybox({
			'height': 513,
			'width': 730,
			'type': 'iframe'
		});

		$('#memberRefundLnk').fancybox({
			'height': 447,
			'width': 730,
			'type': 'iframe'
		}).bind('click',function(e){
			e.preventDefault();
			try{
			rei.analytics.sendSpEvent($(this).attr('manual_cm_re'));
			}catch(err){}
		});
		// TODO! use class name fancybox on sizechart link and remove this
		$('#sizeChart').fancybox({
			'type': 'iframe'
		});

		$('form').each(prod.formSetup);
		// initialize form features
			var addFormItems = '';
			// The registryEntryId parameter will be passed in from the Gift Registry list page.
			var regEntId = QueryString("registryEntryId");
			if (regEntId) addFormItems += '<input type="hidden" name="registryEntryId" value="' + regEntId + '">';
			if (prod_setup_cook_obj) addFormItems += '<input type="hidden" name="registryId" value="' + prod_setup_cook_obj.id + '">';
			if(addFormItems) $('#productSelectForm2 fieldset:nth-child(1)').append(addFormItems);
			if(order_caveat_txt) $('#productSelectForm2 fieldset:nth-child(1) div.purchase').append(order_caveat_txt);
		if(back_to_table){
			$('#productSelect div.productSelect:first').append(
			'<p id="backRegistry"><span></span>Back to <a href="/GiftRegistry'.concat(
				(prod_setup_cook_obj ? 'EditProducts/':'Details/'),
				escapeHTML(back_to_table.id),
				'">',escapeHTML(back_to_table.personal_name),
				"'s Registry.</a></p>"
			));
		}

	}catch(err){ rei.error.push(err); }

	$('#zoomPopupCarousel li.jcarousel-item a').unbind('click').bind('click', function(e){
		/* Zoom popup thumbnail click handling
		*/
		e.preventDefault();
		var hiresimg = $(this).attr('hiresimg');
		var title = $(this).attr('alt');
		$('#zoomPopupImg').attr('src', hiresimg);
		$('#zoomImgLabel').html(title);
	});

	}, // ready()
	showZoomImage: function($src, noScrollToView){
		$('#zoomPopupCarousel li.jcarousel-item').removeClass('active');
		$('#zoomPopupImg').attr({src:$src.attr('hiresimg')});
		$active_list = $src.parent();
		$active_list.addClass('active');
		if(noScrollToView === false){
			var jcarouselindex = $active_list.attr('jcarouselindex');
			var pageNo = Math.ceil(
				jcarouselindex / rei.zoomModal.countOfThumbnailToShow
			);
			rei.zoomModal.thumbnailCurrentPageNo = pageNo;
			rei.zoomModal.scrollToThumbnailPage(pageNo, false, false);
		}
		if(
			typeof $src.attr('alt') !== 'undefined' &&
			$src.attr('alt').toLowerCase() === 'none'
		){
			$('.imgLabel').html('');
		}
	}
}; // rei.prod

//rei.prod

$(window).load(function() {

		// annual member refund modal link
		$('#MemDivJoin2Learn').fancybox({
			'height': 480,
			'padding': 10,
			'width': 350,
			'scrolling':'no',
			'autoScale': false,
			'titleShow': false,
			'type': 'iframe'
		});

	});
$(window).load(rei.prod.ready);
$(window).load(rei.prod.load); // load()

}catch(err){
	rei.error.push(err);
}
