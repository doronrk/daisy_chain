	var wwwlocation="shop.lululemon.com";
	var cdnURL = "cdn.lululemon.com/lulustatic/";


nextContinue = false;
prevContinue = false;
ntm = null;
ptm = null;
function scrollPrevImg() {
	if(!prevContinue) {
		return false;
	}
	jQuery('#btnPrev').click();
	ptm = setTimeout('scrollPrevImg();', 200);
}
function scrollNextImg() {
	if(!nextContinue) {
		return false;
	}
	jQuery('#btnNext').click();
	ntm = setTimeout('scrollNextImg();', 200);
}
function enablePDPCarousel() {	
	
	jQuery('#btnPrev').live('mouseenter', function() {
		prevContinue = true;
		scrollPrevImg();
	});
	jQuery('#btnPrev').live('mouseleave', function() {
		if(ptm != null) {
			clearTimeout(ptm);
		}
		prevContinue = false;
	});
	
	jQuery('#btnNext').live('mouseenter', function() {
		nextContinue = true;
		scrollNextImg();
	});
	jQuery('#btnNext').live('mouseleave', function() {
		if(ntm != null) {
			clearTimeout(ntm);
		}
		nextContinue = false;
	});
	
	//TEASER: PDP vertical carousel
	var carouselPdP = jQuery('body.pdp #carousel ul');
	if(carouselPdP.length > 0){
		var listSize = jQuery('body.pdp #carousel ul li').size();
		jQuery(carouselPdP).carouFredSel({
			circular	: false,
			infinite	: false,
			items		: 7,
			auto		: false,
			direction	: 'up',
			height		: 'auto',
			scroll		: { duration:'100', easing:'linear', wipe:'true', items: 1, onAfter: checkArrows },
			prev		: { button:'#btnPrev' },
			next		: { button:'#btnNext' },
			onCreate	: function() {
				if(listSize < 8) {
					jQuery('.nextContainer').hide();
					jQuery('.prevContainer').hide();
				} else {
					jQuery('.prevContainer').hide();
				}
			}
		});
	}
	
	//TEASER: Mini PDP vertical carousel
	var carouselPdP = jQuery('body.qvpdp #carousel ul');
	if(carouselPdP.length > 0){
		var listSize = jQuery('body.qvpdp #carousel ul li').size();
		jQuery(carouselPdP).carouFredSel({
			circular	: false,
			infinite	: false,
			items		: 5,
			auto		: false,
			direction	: 'up',
			height		: 'auto',
			scroll		: { duration:'100', easing:'linear', wipe:'true', items: 1, onAfter: checkArrows },
			prev		: { button:'#btnPrev' },
			next		: { button:'#btnNext' },
			onCreate	: function() {
				if(listSize < 6) {
					jQuery('.nextContainer').hide();
					jQuery('.prevContainer').hide();
				} else {
					jQuery('.prevContainer').hide();
				}
			}
		});
	}
}
function checkArrows() {
	if(jQuery('#btnNext').hasClass('disabled')) {
		jQuery('.nextContainer').hide(); 
	} else {
		jQuery('.nextContainer').show(); 
	}
	if(jQuery('#btnPrev').hasClass('disabled')) {
		jQuery('.prevContainer').hide();
	} else {
		jQuery('.prevContainer').show();
	}
}

jQuery(document).ready(function() {
//begin
	
	var currentURL;
	var currentProtocol;
	try {
		currentURL = window.location;
		currentProtocol = window.location.protocol;
	} catch(err) {
		//do nothing
	}

	if(jQuery('#wwwURL').length && jQuery('#wwwURL').val().length){
		wwwlocation=jQuery('#wwwURL').val();
	}
	
	if(jQuery('#wwwURL').length && jQuery('#wwwURL').val().length){
		cdnURL=jQuery('#cdnURL').val();
	}
	
	
	if(jQuery('#shoppingBagLink').length) {
		if(currentProtocol == 'https:') {
			jQuery('#shoppingBagLink').attr('href', '/secure/shopping-bag.jsp');
		}
	}

	//show filters
	if(jQuery('.productFilterForm-field').length) {
		jQuery('.productFilterForm-field').show();
	}
	
	

	//add all to bag
	jQuery('#addAllToBagButton').click(function(e) {
		e.preventDefault();
		jQuery('#wlProcessing').show();
		jQuery.ajax({
			url:'/shop/gadgets/addAllToBagResult.jsp',
			type: "post",
			data: jQuery('#addToOrderForm').serialize(),
			success: function(data) {
				jQuery('#wlProcessing').hide();
				if(jQuery.trim(data) == 'true') {
					jQuery('#shoppingBagLink').click();
					updateCartNav();
				} else {
					errorDecision(data, '');
				}
			}
		});
	})


	//*** find a store button
	jQuery('#findAStoreButton').click(function() {
		document.location.href= "http://"+wwwlocation+"/stores";
	});


	//STATIC
	jQuery('a.static').live('click', function(event) {
		event.preventDefault();
	});

	jQuery('.hoverImage').hover(
		function(){
			origSrc = this.src;
			newSrc = this.src;
			newSrc = newSrc.substring(0,(newSrc.length-4));
			this.src = newSrc + "-hover.png";
		},
		function(){
			this.src = origSrc;
		}
	);


	//UTILITY NAV
	function openSubMenu() {
		jQuery(this).find('div').prev().addClass('on');
		jQuery(this).find('div').show();
	};
	function closeSubMenu() {
		jQuery(this).find('div').prev().removeClass('on');
		jQuery(this).find('div').hide();
	};
	jQuery('.utilityMenu > li').hover(openSubMenu, closeSubMenu);
	//jQuery('#regionSelector').hover(openSubMenu, closeSubMenu);

	// start new region selector REGION NAV
	function openRegion() {
		jQuery('.regionSelector').addClass('on');
			jQuery('.regionSelector').show();
			jQuery('.regionGrey').show();
			var screenTop = $(document).scrollTop();
			jQuery('.regionSelector .regionSelectorStyle').css('top', screenTop);			
	};
	function closeRegion() {
		jQuery('.regionSelector').removeClass('on');
		jQuery('.regionSelector').hide();
		jQuery('.regionGrey').hide();
	};
	function toggleSubMenu(){
		var myDiv = jQuery('.regionSelector');
		var x = myDiv.hasClass('on');
		if (x == true){
			closeRegion();
		}else{
			openRegion();
		}
	}	
	
	jQuery(".closeRegionSelector").bind("click",function() {
		omnitureReset();
		s=s_gi(s_account);
		s.linkTrackVars="events,prop29, eVar29";
		s.linkTrackEvents="event57";
		s.prop29="glb:intl ship to:pop-up:close-modal";
		s.eVar29="glb:intl ship to:pop-up:close-modal";
		s.events="event57";
		s.tl(this,'o','glb:intl ship to:pop-up:close-modal');
	});
	jQuery('.regionGrey').click(function (e) {
		e.preventDefault();
		closeRegion();
	});
		
	jQuery('#regionSelector').click(function (e) {
		e.preventDefault();
		toggleSubMenu();
	});
	
	jQuery('a.closeRegionSelector').click(function(e) {
		e.preventDefault();
		jQuery('.regionSelector').hide();
		jQuery('.regionSelector').removeClass('on');
		jQuery('.regionGrey').hide();
	});
	
	jQuery('.closeCookieMessage').click(function(e) {
		e.preventDefault();
		jQuery('.regionChange').hide();
		jQuery('.regionCatchAll').hide();
	});
	
	try{
		countrySelectSetup();
	}catch(err){		
	} 
	
	// end new region selector / UTILITY NAV

	//MEGA-NAV
	function openSubNav() {
		jQuery(this).addClass('on');
		jQuery(this).find('.mnSubMenu').show();
	};
	function closeSubNav() {
		jQuery(this).removeClass('on');
		jQuery(this).find('.mnSubMenu').hide();
	};
	jQuery('#NAV li.mnMain').hover(openSubNav, closeSubNav);
	jQuery('html, #HEADER, #NAV, #MAIN, #FOOTER').click(function() { /* ipad */ });

	var SUBMENU_WIDTH = 174;
	var SUBMENU_HEIGHT_ADJUST = 70;
	//women
	var multiColumnWidthWomen = jQuery('#NAV #women.mnSubMenu .multiColumn ul').length * SUBMENU_WIDTH;
		multiColumnWidthWomen = multiColumnWidthWomen +'px';
		jQuery('#NAV #women.mnSubMenu .multiColumn').css('width',multiColumnWidthWomen);
	var multiColumnWomenHeight = jQuery('#NAV #women.mnSubMenu').height()-SUBMENU_HEIGHT_ADJUST;
		jQuery('#NAV #women.mnSubMenu .multiColumn ul').css('height',multiColumnWomenHeight);
	//men
	var multiColumnWidthMen = jQuery('#NAV #men.mnSubMenu .multiColumn ul').length * SUBMENU_WIDTH;
		multiColumnWidthMen = multiColumnWidthMen +'px';
		jQuery('#NAV #men.mnSubMenu .multiColumn').css('width',multiColumnWidthMen);
	var multiColumnMenHeight = jQuery('#NAV #men.mnSubMenu').height()-SUBMENU_HEIGHT_ADJUST;
		jQuery('#NAV #men.mnSubMenu .multiColumn ul').css('height',multiColumnMenHeight);
	//shop by
	var multiColumnWidthShopBy = jQuery('#NAV #shopBy.mnSubMenu .multiColumn ul').length * SUBMENU_WIDTH;
		multiColumnWidthShopBy = multiColumnWidthShopBy +'px';
		jQuery('#NAV #shopBy.mnSubMenu .multiColumn').css('width',multiColumnWidthShopBy);
	var multiColumnShopByHeight = jQuery('#NAV #shopBy.mnSubMenu').height()-SUBMENU_HEIGHT_ADJUST;
		jQuery('#NAV #shopBy.mnSubMenu .multiColumn ul').css('height',multiColumnShopByHeight);


	//TEASER: homepage teaser carousel
	var carouselHomePage = jQuery('body.home #carousel ul');
	if(carouselHomePage.length > 0){
		jQuery(carouselHomePage).carouFredSel({
			circular	: true,
			infinite	: false,
			items		: 3,
			auto		: false,
			scroll		: { duration:'auto', easing:'easeOutBack', wipe:'true'},
			prev		: { button:'#btnPrev' },
			next		: { button:'#btnNext' }
		});
	}

	
	if(jQuery('body.cdp').length) {
		jQuery('.productFilterForm-field select').each(function() {
			if(jQuery(this).val() != -1) {
				//jQuery(this).next().find('.sbSelector').css('color', '#000000').css('font-weight', 'bold'); 
			}
		});
	}
	
	jQuery('.pickSizeGrid').live('click', function(e) {
		
		if (jQuery('#gridList').hasClass('disableFilter'))
			return;
		
		var sortparam = '';
		if(jQuery('#sortoption').attr('value') == 'bestSellers' || jQuery('#sortoption').attr('value') == 'newArrivals' || jQuery('#sortoption').attr('value') == 'price') {
			sortparam = '&sort=' + jQuery('#sortoption').attr('value');
		}
		var loc = jQuery(location).attr('pathname') +  '?' + 'categoryId=' + jQuery('#categoryId').attr('value') + sortparam;

		
		loc = loc + '&filterType1=size' + '&filterValue1=' + jQuery(this).attr('rem');
		
		if(jQuery('#viewAll').length!=0){
			loc = loc +'&viewAll='+ jQuery('#viewAll').attr('value');
		}
		window.location = loc;
	});
	
	jQuery( "#radio-jquery-ui label" ).click(function(){
		
		var sortparam = '';
		if(jQuery('#sortoption').attr('value') == 'bestSellers' || jQuery('#sortoption').attr('value') == 'newArrivals' || jQuery('#sortoption').attr('value') == 'price') {
			sortparam = '&sort=' + jQuery('#sortoption').attr('value');
		}
		var loc = jQuery(location).attr('pathname') +  '?' + 'categoryId=' + jQuery('#categoryId').attr('value') + sortparam;

		if (!jQuery(this).attr('value').match('-1')) {
			loc = loc + '&filterType1=size' + '&filterValue1=' + jQuery(this).attr('value');
		}
		if(jQuery('#viewAll').length!=0){
			loc = loc +'&viewAll='+ jQuery('#viewAll').attr('value');
		}
		window.location = loc;
		
	  });
	
	//CDP Page filter selectors
	jQuery('#sizeSelector').bind('change', function() {
		var sortparam = '';
		if(jQuery('#sortoption').attr('value') == 'topSellers' || jQuery('#sortoption').attr('value') == 'newArrivals' || jQuery('#sortoption').attr('value') == 'priceLowtohigh' || jQuery('#sortoption').attr('value') == 'priceHightolow') {
			sortparam = '&sort=' + jQuery('#sortoption').attr('value');
		}
		var loc = jQuery(location).attr('pathname') +  '?' + 'categoryId=' + jQuery('#categoryId').attr('value') + sortparam;

		if (jQuery(this).attr('value').match('--'))
			return;
		
		if (!jQuery(this).attr('value').match('-1')) {
			loc = loc + '&filterType1=size' + '&filterValue1=' + jQuery(this).attr('value');
		}
		if(jQuery('#viewAll').length!=0){
			loc = loc +'&viewAll='+ jQuery('#viewAll').attr('value');
		}
		window.location = loc;
	});

	jQuery('#fitSelector').bind('change', function() {
		var sortparam = '';
		if(jQuery('#sortoption').attr('value') == 'topSellers' || jQuery('#sortoption').attr('value') == 'newArrivals' || jQuery('#sortoption').attr('value') == 'priceLowtohigh'|| jQuery('#sortoption').attr('value') == 'priceHightolow') {
			sortparam = '&sort=' + jQuery('#sortoption').attr('value');
		}
		var loc = jQuery(location).attr('pathname') +  '?' + 'categoryId=' + jQuery('#categoryId').attr('value') + sortparam;

		if (!jQuery(this).attr('value').match('-1')) {
			loc = loc + '&filterType4=fit' + '&filterValue4=' + jQuery(this).attr('value');
		}
		if(jQuery('#viewAll').length!=0){
			loc = loc +'&viewAll='+ jQuery('#viewAll').attr('value');
		}
		window.location = loc;
	});

	jQuery('#activitySelector').bind('change', function() {
		var sortparam = '';
		if(jQuery('#sortoption').attr('value') == 'topSellers' || jQuery('#sortoption').attr('value') == 'newArrivals' || jQuery('#sortoption').attr('value') == 'priceLowtohigh'|| jQuery('#sortoption').attr('value') == 'priceHightolow') {
			sortparam = '&sort=' + jQuery('#sortoption').attr('value');
		}
		var loc = jQuery(location).attr('pathname') +  '?' + 'categoryId=' + jQuery('#categoryId').attr('value') + sortparam;

		if (!jQuery(this).attr('value').match('-1')) {
			loc = loc + '&filterType2=function' + '&filterValue2=' + jQuery(this).attr('value');
		}
		if(jQuery('#viewAll').length!=0){
			loc = loc +'&viewAll='+ jQuery('#viewAll').attr('value');
		}
		window.location = loc;
	});
	
	jQuery('#sortParamSelector').bind('change', function() {	
		
		if (!jQuery(this).attr('value').match('-1')) {	
			var loc = jQuery(location).attr('pathname') +  '?' + 'categoryId=' + jQuery('#categoryId').attr('value') +  '&' + 'sort='+jQuery(this).attr('value');
			
		
		if(jQuery('#viewAll').length!=0){
			loc = loc +'&viewAll='+ jQuery('#viewAll').attr('value');
					}
		if(jQuery('#filter1').length!=0){
			loc = loc + '&filterType1=size' + '&filterValue1=' +jQuery('#filter1').attr('value');
				}		 
		if(jQuery('#filter2').length!=0){
			loc = loc + '&filterType2=function' + '&filterValue2=' + jQuery('#filter2').attr('value');
				}
		if(jQuery('#filter4').length!=0){
			loc = loc + '&filterType4=fit' + '&filterValue4=' + jQuery('#filter4').attr('value');
				}
			
			 
		window.location = loc;
		}		
		});

	//wnp - HOT FIX 11/10/2011
	/*if(jQuery('body').hasClass('wnp')) {
		jQuery('.product').each(function() {
			var prdId = jQuery(this).attr('id');
			jQuery('#' + prdId + '_prodText').attr('href', jQuery('.' + prdId + '_prodImage').eq(0).attr('href'));
		})
	}*/

	//CDP color swatch mouse hover
	var timeout = null;
	
	$('body').on('mouseenter click','.switchThumb', function(e) {

		// get all the elements we need
		var _this 			= $(this);
        var _ul				= _this.closest('ul');
		var sku 			= _this.attr('sku');
		var _parentDiv 		= _this.closest('.product');
		var _currentImage	= _parentDiv.find('.product-images li.current');
		var  delay 			= 500;
		
		if(e.type == 'click'){
			  delay = 0;
			}

		// only if the color is different from the current one
		if (!_currentImage.hasClass('sku-'+sku)) {
			
			// set the timeout that will change the main picture
			timeout = setTimeout(function() {

			 	// get all the elements we need
			 	var _allImages		= _parentDiv.find('.product-images li');
			 	var _imageToDisplay = _parentDiv.find('.product-images li.sku-'+sku).first();

			 	// move red border to active color swatch
			 	_ul.find('.switchThumb').removeClass('active');
			 	_this.addClass('active');
			 	
			 	// hide the current image and display the new one			 	
			 	_allImages.stop().animate({opacity:0}, 500, function(){
			 		_allImages.removeClass('current');
			 		_allImages.css('z-index',1);
			 	});

			 	_imageToDisplay.stop().animate({opacity:1}, 500, function(){
			 		_imageToDisplay.addClass('current');
			 		_imageToDisplay.css('z-index',5);
			 	});

				// reset the timeout
				timeout = null;

			},delay);
		}

		return false;
	});
	
	//Compare button on cdp: NA-267
	/**
	 * Handle the process related to a click on the checkbox
	 * @param  {jQuery Element} cbx   Checkbox that has been clicked
	 * @param  {jQuery Event} event Click event
	 */
	var checkboxManager = function(cbx, event){

		// get the information we need
		var checked 			= cbx.checked;
		var _this 				= $(cbx);
		var _compareParent		= _this.closest('.compare');
		var _compareTrigger		= _compareParent.find('a.compare-trigger');
		var _label 			 	= _compareParent.find('span');
		var _labelAndImg		= _compareParent.find('span, img');
		var _compareDivs		= $('.compare');
		var _checkedCbx 		= _compareDivs.find('input[type="checkbox"]:checked');
		var _uncheckedCbx		= _compareDivs.find('input[type="checkbox"]:not(:checked)');
		var _uncheckedLabel		= _uncheckedCbx.next('span');
		var _checkedLabels		= _checkedCbx.next('a.compare-trigger').find('span');
		var numberOfCheckedCbx 	= _checkedCbx.length;


		// text variables
		var maxProducts = 4;
		var defaultText = 'add to compare';
		var checkedText	= 'compare '+numberOfCheckedCbx+' of ' + maxProducts;


		// be sure to block the number of compared products to 4 max
		if(numberOfCheckedCbx > maxProducts){

			// this specific case shouldn't happen but...
			if(event !== null) { event.preventDefault(); }
			return;

		}else{

			// disable the other checkboxes if necessary
			if(numberOfCheckedCbx == maxProducts){
				// disable all the other checkboxes
				_uncheckedCbx.attr('disabled','disabled');
				_uncheckedLabel.addClass('disabled');
			}


			// handle the checkbox
			if(checked){
				jQuery('#disabledCompare, #disabledCompareBottom').hide();
				jQuery('#enabledCompare, #enabledCompareBottom').show();
				// change the label of the span
				_label.html(checkedText);
				_checkedLabels.html(checkedText);
				// wrap the span and the image into a link
				_labelAndImg.wrapAll('<a href="#" class="compare-trigger" />');

			}else{
				if(numberOfCheckedCbx == 0){
				jQuery('#disabledCompare, #disabledCompareBottom').show();
				jQuery('#enabledCompare, #enabledCompareBottom').hide();
				}
				// change the label of all the span concerned
				_label.html(defaultText);
				_checkedLabels.html(checkedText);
				// unwrap the span and the image from the link
				_labelAndImg.unwrap();
				// enable the checboxes again, in case
				_uncheckedCbx.removeAttr('disabled');
				_uncheckedLabel.removeClass('disabled');


			}

		}

	};


	/**
	 * Compare checkboxes management
	 * @param  {jQueryEvent} e Click Event
	 */
	$('.compare input[type="checkbox"]').on('click',function(e){
		// call the manager
		return checkboxManager(this,e);
	});
	
	/**
	 * Reset the checkbox when the page is refreshed
	 */
	$('.compare input[type="checkbox"]').prop('checked', false);
	
	
	
	// initialize the tooltips in the page
	function initTooltipForCompareTool(selector){

		// cache the body
		var _body = $('body');
		var _html = $('html');
		var _selector = $(selector);

		_selector.tooltipster({
			theme: '.tooltipster-shadow',
			trigger: 'click',
			delay: 100,
			functionReady: function(_origin,_tooltip){

				// get the arrow
				var _arrow = _tooltip.find('.tooltipster-arrow');


				// center the tooltip in relation to the product picture and move the arrow over the question mark
				var tooltipLeft 		= _tooltip.css('left').replace('px','');
				tooltipLeft				= parseInt(tooltipLeft,10);
				var _badgeContainer		= _origin.closest('.badge');

				// close the tooltip when you click somewhere on the page
				_html.one('click',function(e){
					var _target = $(e.target);
					if(!_target.hasClass('tooltip-trigger') && !_target.hasClass('tooltip-trigger-alt')){
						_body.tooltipster('hide');
					}
				});
			}
		});

		// click on the alternative trigger (basically, the text before the question mark)
		$(selector+'-alt').unbind('click');
		_body.on('click',selector+'-alt',function(e){
			
			// stop the click
			e.preventDefault();
			
			// simulate a click 
			var _this 	= $(this);
			var _trigger = _this.next('.tooltip-trigger');
			_trigger.trigger('click');
			
		});

	}
	
		
	$('.products').on('click', '.fitButton, .compare-trigger', function(e){

		// stop the click
		e.preventDefault();
		
		var _compareDivs		= $('.compare');
		var _checkedCbx 		= _compareDivs.find('input[type="checkbox"]:checked');
		var prodIdList			= '';
		var prodOmniList        = '';
		var prodOmniDesc        = '';
		var prodSkuMap			= {};
		var prodSelSku 			= '';
		var prodSelSkuList		= '';
		
		_checkedCbx.each(function(index) {
			var _prodDiv 	= $(this).closest('.product');
			var prodId 		= _prodDiv.attr('id');
			var prodDesc 	= _prodDiv.attr('title');
			var delimit 	=''
			prodSelSku 		= '';
			var _item		= '';
			if (index > 0){
				prodIdList = prodIdList + ',';
				prodOmniList = prodOmniList + ","
				prodOmniDesc = prodOmniDesc + ":";
			}
			prodIdList = prodIdList + prodId;
			prodOmniList = prodOmniList + ';' + prodId;
			prodOmniDesc = prodOmniDesc + prodDesc;
			var _currentProdImg = _prodDiv.find('.product-images li.current');

			if (_currentProdImg && _currentProdImg.attr('class')){
				var classList = _currentProdImg.attr('class').split(/\s+/);
				$(classList).each(function(index,value){
					if(value.indexOf('sku-') > -1)
						prodSelSku = value.substring(4);
				});
			}
			
			if (prodSelSku){
				if(prodSelSkuList)
					delimit = ',';
				_item = prodId + ':' + prodSelSku;
				prodSelSkuList = prodSelSkuList + delimit + _item;
			}
		});
		
		var prdIds		=prodIdList;
		var omniprdIds	=prodOmniList;
		var omniprdDesc = prodOmniDesc;
		var catId 		= jQuery('#catIdForCompareTool').attr('value');

		jQuery.ajax({
			type: 'post',
			url: '/shop/compare/compareProducts.jsp',
			data: {'compareProducts': prdIds, 'catId': catId, 'prodSelSkuList':prodSelSkuList },
			cache: false,
			success: function(data) {
				jQuery.fancybox({
					//'padding' : 0,
					'transitionIn' : 'elastic',
					'transitionOut' : 'elastic',
					//'scrolling' : 'no',
					//'autoDimensions' : false,
					//'autoScale' : false,
					//'width' : 'auto',
					//'height' : 'auto',
					'content' : jQuery.trim(data),
					onComplete:function(){
						$('#compare-tool .badge').each(function() {
							var classname = jQuery(this).attr('class').replace('.','').replace('badge ','');
							var val = jQuery('.cdp #'+classname+'_tooltip').val();
							var _chldTriggerEle = jQuery(this).find('.tooltip-trigger');
							_chldTriggerEle.attr('title', val);
						});
						$('.fabric-details a').attr('target','_blank');
						initTooltipForCompareTool('#compare-tool .tooltip-trigger');
						
						//added the class dynamically to the fancy box
						$('body.cdp div#fancybox-content').css('background','#fff');
						$('body.cdp div#fancybox-content').css('padding','20px 30px 0 30px');
					}
				});
			}, error: function(xhr,status,error) {

			}
					
		});
		omnitureCompareToolLaunch(omniprdIds, omniprdDesc);
	});
	
	// COMPARE TOOL starts: NA-268
	
	/**
	 * Event fired when you remove a product from the compare popup
	 * @param  {jQuery Event} e Click fired
	 */
	jQuery('body').on('click','.compare-tool-remove a',function(e){

		// stop the click
		e.preventDefault();

		
		// get the element we need
		var _this 				= jQuery(this);
		var _productDiv			= _this.closest('.product');
		var _td 				= _this.closest('td');
		var _table 				= _td.closest('table');
		var index 				= _td.index();
		var _trs				= _table.find('tr');
		var _columnElements		= _trs.find('td:eq('+index+')');
		var numberOfColumns		= _trs.first().find('td').length;
		var _body				= jQuery('body');

		
		// remove all the tooltips
		_body.tooltipster('hide');	


		// uncheck the checkbox related to this product
		var productId 	= _productDiv.attr('id').replace('-compare','');
		var _cbx 		= jQuery('#'+productId+'-cbx');
		var cbx 		= _cbx.get();

		if(_cbx.is(':checked')){
			_cbx.removeAttr('checked');
			checkboxManager(cbx, null);	
		}


		// first, check if it's the last column
		if(numberOfColumns <= 2){
			jQuery.fancybox.close();
		}


		// start fading out the column
		_columnElements.animate({opacity:0},300,'swing',function(){

			// then, hide the column
			_columnElements
				.html('')
				.animate({width:0, padding:0},250,'swing',function(){

					// jQueryfy the element
					var _this = jQuery(this);

					// if we take care of the last td in the column
					if(_this.is(_columnElements.last())){

						// resize manually the fancybox
						var _fancyboxWrap 	= jQuery('#fancybox-content');
						var fancyboxWidth 	= _fancyboxWrap.width();
						var newWidth  		= fancyboxWidth - 180;

						_fancyboxWrap.animate({width:newWidth},250,'swing',function(){
							jQuery.fancybox.resize();
						});

						// remove the tds
						_columnElements.remove();

						// update the columns color
						var _oddTds 	= _trs.find('td:odd');
						var _evenTds 	= _trs.find('td:even');
						
						_oddTds.css({background:'#f6f6f6'});
						_evenTds.css({background:'#fff'});
					}

				});

		});

	});
	
	//clicking on print
	$('body').on('click','.compare-tool-print', function(e){
		// stop the click
		e.preventDefault();
		// launch the print
		window.print();
	});
	
	//clicking the show-details button on compare tool
	$('body').on('click','.show-fabric-details',function(e){
		


		// stop the click
		e.preventDefault();

		// get the elements we need
		var _this = $(this);
		var _detailsBlocs = $('.fabric-details');
		
		// toggle the details
		_detailsBlocs.toggle();

		// change the text
		if(_detailsBlocs.is(':visible')){
			_this.html(_this.html().replace('show','hide').replace('afficher','cacher'));
		}else{
			_this.html(_this.html().replace('hide','show').replace('cacher','afficher'));
		}

	});
	
	jQuery('body').on('click','.compare-tool-more-details',function(e){
		var _productDiv			= $(this).closest('.product');
		var productDesc 	    = _productDiv.attr('title');
		omnitureProductDetails(productDesc);
		});
	
	
	//COMPARE Tool ends
	
	//reset timer for color mouse over image change when user moves out of color swatch 
	jQuery('.switchThumb').bind('mouseleave', function() {
		if(timeout != null) { clearTimeout(timeout); }
	});
	
	//COLOR SWATCHES (hide/show)
	jQuery('.moreColors, .hideColorsLink').hide();
	
	$('body').on('click','li.moreColorsLink a', function(e) {

		e.preventDefault();
		captureMoreColorClick();
		var productId = jQuery(this).parent().parent().parent().attr('id');
		var moreColElements		= jQuery('#'+productId).find('.moreColors').length;
		jQuery('#'+productId+' .moreColorsLink').hide(-1, function() { 
			jQuery('#'+productId+' .moreColors').slideDown(); });
		
		
		
		// resize manually the fancybox
		var _fancyboxWrap 	= jQuery('#fancybox-content');
		var fancyboxHeight 	= _fancyboxWrap.height();
				
		var increaseUnits	= (moreColElements/6).toFixed(0);
		var correction		= increaseUnits * 10;
		
		if (correction > 0){
			var newHeight  		= fancyboxHeight + correction;

			_fancyboxWrap.animate({height:newHeight},250,'swing',function(){
				jQuery.fancybox.resize();
			});
		}
		
	});

	//WHAT'S NEW: scrolling to mens/women's
	function scrollToElement(thisElement){
		jQuery('html, body').animate({
			scrollTop: jQuery(thisElement).position().top
		}, 2000);
	}
	jQuery('body.wnp #seeMensLink').live('click', function(){
		omnitureReset();
		scrollToElement('#whatsNewForMen');
		s.pageName="store:whats new:men";
		s.channel="store";
		s.prop1="whats new";
		s.prop2="men";
		var s_code=s.t();if(s_code)document.write(s_code);
	});
	jQuery('body.wnp #seeWomensLink').live('click', function(){
		omnitureReset();
		scrollToElement('#whatsNewForWomen');
		s.pageName="store:whats new:women";
		s.channel="store";
		s.prop1="whats new";
		s.prop2="women";
		var s_code=s.t();if(s_code)document.write(s_code);
	});


	


	//SEARCH
	jQuery('#search').live('click', function() {
		if(jQuery('#searchField').is( ":focus" )==false){
			submitSearch();
		}
	});
	jQuery('#searchField').live('focus', function() {
		if(jQuery(this).val() == 'search') {
			jQuery(this).val('');
		}
	});
	jQuery('#searchField').live('blur', function() {
		if(jQuery(this).val() == '') {
			jQuery(this).val('search');
		}
	});
    jQuery('#searchField').bind('keypress', function(e) {
    	var code = (e.keyCode ? e.keyCode : e.which);
    	if(code == 13) {
    		submitSearch()
    	}
    });

	//Search on 404 asana
	jQuery('#searchfield1').live('focus', function() {
		if(jQuery(this).val() == 'search lululemon') {
			jQuery(this).val('');
		}
	});
	
	jQuery('#searchfield1').live('blur', function() {
		if(jQuery(this).val() == '') {
			jQuery(this).val('search lululemon');
		}
	});
	
    jQuery('#searchfield1').bind('keypress', function(e) {
    	var code = (e.keyCode ? e.keyCode : e.which);
    	if(code == 13) {
			submitSearch404Asana();
    	}
    });
	
	jQuery('#searchbutton').live('click', function() {
		if(jQuery('#searchfield1').val()!="search lululemon"){
			submitSearch404Asana();
		}
		return false;
	});	
	
    //Send Gift Receipt Email to User
    jQuery('#sendGiftReceiptSubmit').live('click', function (evt) {
		var giftReceipent = jQuery('#giftReceipent').val();
		var orderId = jQuery('#encryptedOrderId').val();

		if (validateEmail(giftReceipent)) {
			jQuery.ajax({
				type: 'get',
				url: '/secure/orders/giftReceiptEmail.jsp?emailRecepient=' + giftReceipent,
				cache: false,
				success: function() {
	
					$("#tempDiv").empty();
					$("#tempDiv").append('<p> <b>Success!</b> The gift receipt has been sent to ' + giftReceipent + '</p> <br/>' +  
						'<a href="initiategiftreceipt.jsp?orderId=' + orderId +  '"> create another gift receipt from this order </a>  &nbsp;&nbsp; <span class="btn" style="position:absolute;"><input value="print receipt" class="btn" type="button" onclick=printDiv("printableArea")></span>');
				}
			});
		} else {
			errorDecision('Please enter valid email address', '');
		}
	});

	function validateEmail(email) {
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	//EMAIL SIGN-UP
	jQuery('.emailSignUpField').live('focus', function() {
		if(jQuery(this).val() == 'enter your email address' || jQuery(this).val() == 'please enter a valid email' || jQuery(this).val() == 'error signing up, please try again') {
			jQuery(this).val('');
			jQuery(this).css('color', '#777C84');
		}
	});
	jQuery('.emailSignUpField').live('blur', function() {
		if(jQuery(this).val() == '') {
			jQuery(this).val('enter your email address');
		}
	});

	//PRINT WISHLIST
	jQuery('#printWishList').live('click',function(evt){
		evt.preventDefault();
		window.print();
	});

	//PRINT ORDER CONFIRMATION
	jQuery('#printConfirmation').live('click',function(evt){
		evt.preventDefault();
		window.print();
	});

	//TOOLTIP
	jQuery('.emailSignUpField').qtip({
		content: 'Sign up to receive emails about<br/> products from lululemon athletica<br/> (you can unsubscribe at any time)<br/> <a href="http://'+wwwlocation+'/terms" target="_blank"> terms and conditions</a>',
		show: {
			when: 'focus'
		},
		hide: {
			when: 'blur',
			fixed: true
		},
		style: {
			background: '#fff2cc',
			border: {
				color: '#f4de9f',
				width: 2,
				radius: 2
			},
			color: '#000',
			name: 'cream',
			padding: 10,
			tip: true
		},
		position: {
			corner: {
				target: 'bottomMiddle',
				tooltip: 'topMiddle'
			},
			adjust: {
				y: -10
			}
		}
	});

	//TOOLTIP (wishlist add)
	jQuery('.wishlistPublic').qtip({
		content: 'Making your wish list public will allow others to search for your wish list using your email address. Non-public wish lists are not searchable by others but you can email them to friends.',
		show: {
			when: 'click'
		},
		hide: {
			when: 'unfocus',
			fixed: true
		},
		style: {
			background: '#fff2cc',
			border: {
				color: '#f4de9f',
				width: 2,
				radius: 2
			},
			color: '#000',
			name: 'cream',
			padding: 10,
			tip: true
		},
		position: {
			corner: {
				target: 'bottomMiddle',
				tooltip: 'topMiddle'
			}
		}
	});


	//EMAIL SIGN UP ON HOMEPAGE
	jQuery('#CTAemailSignUpField').val('enter your email address');
	jQuery('#CTAsignMeUpButton').click(function(e) {
		e.preventDefault();
		var emailAddr = jQuery('#CTAemailSignUpField').val();

		//processing
		jQuery('#CTAemailProcessing').show();
		jQuery('#CTAemailSignUpField, #CTAemailSignUpForm span.btn').hide();

		//handler
		jQuery.ajax({
			url: "/elements/emailSignUp.jsp",
			type: "POST",
			data: {email : emailAddr},
			dataType: "jsonp",
			jsonpCallback : "emailSignUp",
			success: function(data){
				jQuery('#CTAemailProcessing').hide();
				var messaging  = jQuery.trim(data.formMessage);
				jQuery('#CTAemailMessaging').text(messaging);
				if(data.result == 'success') {
					jQuery('#CTAemailMessaging').fadeIn();
				} else if(data.result == 'exists') {
					jQuery('#CTAemailMessaging').fadeIn();
				} else {
					jQuery("#CTAemailMessaging").hide();
					jQuery("#CTAemailSignUpField").val(messaging);
					jQuery("#CTAemailSignUpField").css('color', '#FF1543');
					jQuery("#CTAemailSignUpField").show();
					jQuery("#CTAsignMeUpButton").show();
					jQuery("#CTAsignMeUpButton").parent().show();
				}
				captureEmailSignUp();
				_gaq.push(['ga._trackEvent', 'User Event', 'Email Signup', 'lululcom']);
				//jQuery('#CTAemailSignUpField, #CTAemailSignUpForm span.btn').fadeIn();
			}
		});
	});

	//FIND A STORE ON HOMEPAGE
	jQuery('#CTAfindAStoreButton').click(function(e) {
		window.location = 'http://'+wwwlocation+'/stores/';
	});

	//EMAIL SIGN UP IN FOOTER
	jQuery('#emailSignUpField').val('enter your email address');
	jQuery('#signMeUpButton').click(function(e) {
		e.preventDefault();
		var emailAddr = jQuery('#emailSignUpField').val();

		//processing
		jQuery('#emailProcessing').show();
		jQuery('#emailSignUpField, #emailSignUpForm span.btn').hide();

		//handler
		jQuery.ajax({
			url: "/elements/emailSignUp.jsp",
			type: "post",
			data: {email : emailAddr},
			dataType: "jsonp",
			jsonpCallback : "emailSignUp",
			success: function(data){
				jQuery('#emailProcessing').hide();
				var messaging  = jQuery.trim(data.formMessage);
				jQuery('#emailMessaging').text(messaging);
				if(data.result == 'success') {
					jQuery('#emailMessaging').fadeIn();
				} else if(data.result == 'exists') {
					jQuery('#emailMessaging').fadeIn();
				} else {
					jQuery("#emailMessaging").hide();
					jQuery("#emailSignUpField").val(messaging);
					jQuery("#emailSignUpField").css('color', '#FF1543');
					jQuery("#emailSignUpField").show();
					jQuery("#signMeUpButton").show();
					jQuery("#signMeUpButton").parent().show();
				}
				 captureEmailSignUp();
				_gaq.push(['ga._trackEvent', 'User Event', 'Email Signup', 'lululcom']);
				//jQuery('#CTAemailSignUpField, #CTAemailSignUpForm span.btn').fadeIn();
			}
		});
	});

	jQuery(".videoplayer").click(function() {
		jQuery.fancybox({
			'padding' 		: 0,
			'scrolling'		: 'no',
			'autoScale' 	: false,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'overlayShow'	: true,
			'href' 			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
			'type' 			: 'swf',
			'swf' 			: {
				'wmode' : 'transparent',
				'allowfullscreen' : 'true'
			}
		});
		captureVideoView();
		return false;
	});

	jQuery("a.iframe").fancybox({
		'autoDimensions'		: false,
		'autoScale'				: false,
		'autoSizeIframe' 		: false,
		'hideOnContentClick'	: false,
		'height'				: 1500,
		'width'					: 800,
		'transitionIn'			: 'elastic',
		'transitionOut'			: 'elastic',
		'speedIn'				: 600,
		'speedOut'				: 200,
		'overlayShow'			: true,
		'scrolling'				: 'no',
		'onComplete':function() {
		}
	});

	jQuery('body').on('click', '#viewSizeChart', function(e){
        
        // stop the click
        e.preventDefault();

        // get the link
        var _this               = $(this);
        var link = _this.attr('href');

        // open the popup
        parent.jQuery.fancybox({
                        'padding' : 0,
                        'autoDimensions': true,
						'autoScale': false,
						'hideOnContentClick': false,
						'height': 1500,
						'width': 800,
						'transitionIn': 'elastic',
						'transitionOut': 'elastic',
						'speedIn': 600,
						'speedOut': 200,
						'overlayShow': true,
						'scrolling': 'no',
						'modal': false,
                        'type' : 'iframe',
                        'href' : link
        });
	});

	
	jQuery('#shoppingBag a#shoppingBagLink').live('click',function(event){
		event.preventDefault();
		var pIndex = 0;
		var appendUrl = '';
		
		jQuery.ajax({
			url:'/browse/cart-validate.jsp',
			type: "post",
			dataType: "json",
			async: false,
			success: function(postResponse) {
				var shoppingCartResponse = postResponse;
				if (shoppingCartResponse.step == "validateItemInCart") {
					if (shoppingCartResponse.result == "error") {
						appendUrl = "?cartUpdated=true";
						if (shoppingCartResponse.outOfStockSKUs != null) {
							appendUrl = appendUrl + "&outOfStockSKUs=" + shoppingCartResponse.outOfStockSKUs;
						}
						if (shoppingCartResponse.alternateColorSKUs != null) {
							appendUrl = appendUrl + "&alternateColorSKUs=" + shoppingCartResponse.alternateColorSKUs;
						}
						if (shoppingCartResponse.alternateSizeSKUs != null) {
							appendUrl = appendUrl + "&alternateSizeSKUs=" + shoppingCartResponse.alternateSizeSKUs;
						}
					}
				}
			}
		});
		
		jQuery('#fancybox-content').css('background-color', '#ffffff');
		jQuery.fancybox({
			'autoDimensions'		: true,
			'autoScale'				: false,
			'hideOnContentClick'	: false,
			'height'				: 870,
			'width'					: 980,
			'transitionIn'			: 'elastic',
			'transitionOut'			: 'elastic',
			'speedIn'				: 600,
			'speedOut'				: 200,
			'overlayShow'			: true,
			'scrolling'				: 'no',
			'modal'					: false,
			'type'					: 'iframe',
			'href'					: jQuery(this).attr('href')+appendUrl,
			'onClosed'				: function() {
				jQuery('#fancybox-content').css('background-color', 'transparent');
				jQuery.ajax({
					url:'/elements/gadgets/shoppingCartItemCount.jsp',
					type:'post',
					dataType:'json',
					data: {buttonCheck : true},
					success: function(data) {
						var allInstock = jQuery.trim(data.allInStock);
						var abTestData = jQuery.trim(data.abTest);
						var count = jQuery.trim(data.count);
						if(count > 0 && allInstock  && abTestData!='hide') {
							jQuery('#checkoutLink').removeClass('hideCheckoutButton');
						} else {
							jQuery('#checkoutLink').addClass('hideCheckoutButton')
						}
						jQuery('#shoppingBag .itemCount').text(count);
					}
				});
			}
		});
	});

	jQuery('#checkoutLink').live('click',function(event){
		event.preventDefault();
		var pIndex = 0;
		var appendUrl = '';
		var redirectToShoppingBag = "false";
		var _this	= $(this);
		var _a =  _this.closest('a');
		var profileTransient = _a.data('profilestatus');
		
		jQuery.ajax({
			url:'/browse/cart-validate.jsp',
			type: "post",
			dataType: "json",
			async: false,
			success: function(postResponse) {
				var shoppingCartResponse = postResponse;
				if (shoppingCartResponse.step == "validateItemInCart") {
					if (shoppingCartResponse.result == "error") {
						appendUrl = "?cartUpdated=true";
						if (shoppingCartResponse.outOfStockSKUs != null) {
							appendUrl = appendUrl + "&outOfStockSKUs=" + shoppingCartResponse.outOfStockSKUs;
						}
						if (shoppingCartResponse.alternateColorSKUs != null) {
							appendUrl = appendUrl + "&alternateColorSKUs=" + shoppingCartResponse.alternateColorSKUs;
						}
						if (shoppingCartResponse.alternateSizeSKUs != null) {
							appendUrl = appendUrl + "&alternateSizeSKUs=" + shoppingCartResponse.alternateSizeSKUs;
						}
						redirectToShoppingBag = "true";
						
					} else if (shoppingCartResponse.result == "successful") {
						var checkoutUrl = jQuery('#checkoutLink').val();
						if(profileTransient == true){
							parent.location.href = '/checkout/login/checkoutLogin.jsp';
						}else{
							parent.location.href = '/checkout/spk/index.jsp';
						}
					}
				}
			}
		});
		
		if (redirectToShoppingBag == "true") {
			jQuery('#fancybox-content').css('background-color', '#ffffff');
			jQuery.fancybox({
				'autoDimensions'		: true,
				'autoScale'				: false,
				'hideOnContentClick'	: false,
				'height'				: 870,
				'width'					: 980,
				'transitionIn'			: 'elastic',
				'transitionOut'			: 'elastic',
				'speedIn'				: 600,
				'speedOut'				: 200,
				'overlayShow'			: true,
				'scrolling'				: 'no',
				'modal'					: false,
				'type'					: 'iframe',
				'href'					: '/shop/shopping-bag.jsp'+appendUrl,
				'onClosed'				: function() {
					jQuery('#fancybox-content').css('background-color', 'transparent');
					jQuery.ajax({
						url:'/elements/gadgets/shoppingCartItemCount.jsp',
						type:'post',
						dataType:'json',
						data: {buttonCheck : true},
						success: function(data) {
							var allInstock = jQuery.trim(data.allInStock);
							var abTestData = jQuery.trim(data.abTest);
							var count = jQuery.trim(data.count);
							if(count > 0 && allInstock  && abTestData!='hide') {
								jQuery('#checkoutLink').removeClass('hideCheckoutButton');
							} else {
								jQuery('#checkoutLink').addClass('hideCheckoutButton')
							}
							jQuery('#shoppingBag .itemCount').text(count);
						}
					});
				}
			});
		}
	});
	
	

	jQuery("body.cdp div.product .cdpInstagramTag, body.wnp div.product .cdpInstagramTag").click(function(e) {
		location.href = jQuery(this).next('a').prop('href');
	});
	
	jQuery('body.cdp div.product a.pic span.btn, body.wnp div.product a.pic span.btn').live('click', function(e) {
		e.preventDefault();
		var productUrl = jQuery(this).parent().attr('href') + "&isQuickView=true&fullProductUrl=" + escape(jQuery(this).parent().attr('href'));
		jQuery('#fancybox-content').css('background-color', '#ffffff');
		jQuery.fancybox({
			'padding' : 0,
			'transitionIn' : 'elastic',
			'transitionOut' : 'elastic',
			'scrolling' : 'no',
			'autoDimensions' : false,
			'autoScale' : false,
			'width' : 980,
			'height' : 670,
			'type' : 'iframe',
			'href' : productUrl,
			'autoSizeIframe' : false,
			'onClosed' : function() {
				jQuery('#fancybox-content').css('background-color', 'transparent');
			}
		});
	});

	//BV: reviews link on QV
	if(jQuery('body.qvpdp').length > 0){
		jQuery('#BVRRCustomReviewCountLinkReadID a').live('click',function(e){
			e.preventDefault();
			parent.window.location.href = jQuery('a.productDetailsLink').attr('href') + "#BVRRWidgetID";
		});
	}
	//BV: scroll to reviews on PDP
	if((jQuery('body.pdp').length > 0) && (jQuery('body.qvpdp').length < 1)){
		jQuery('#BVRRCustomReviewCountLinkReadID a').live('click',function(e){
			e.preventDefault();
			jQuery('html, body').animate({
				scrollTop: jQuery('#BVRRWidgetID').position().top
			}, 2000);
		});
	}

	jQuery('body.qvpdp a.productDetailsLink, body.qvpdp a.productNameLink').on('click', function(e) {
		e.preventDefault();
		var colorCode = jQuery('.pickColor.active').attr('rev');
		var sizeCode = '';
		var skuIdValue = '';
		
		if(jQuery('.pickSize.active').attr('title') != null || jQuery('.pickSize.active').attr('title') != '' || jQuery('.pickSize.active').attr('title') !== undefined){
			sizeCode = jQuery('.pickSize.active').attr('title');
		}
		
		if(sizeDriverObj[sizeCode] != null) {
			jQuery.each(sizeDriverObj[sizeCode], function(index, value) {
				var cSkuObj = sizeDriverObj[sizeCode][index];
				var color = cSkuObj[0];
				var skuId = cSkuObj[1];
				if(colorCode != null && colorCode != "" && color == colorCode) {
					skuIdValue = skuId;
				}
			});
		}
		if((sizeCode == null || sizeCode =='') || (skuIdValue == null || skuIdValue =='')){
			parent.location.href = jQuery(this).attr('href')+"&cc="+colorCode;
		}else{
			parent.location.href = jQuery(this).attr('href')+"&cc="+colorCode+"&szCode="+sizeCode+"&skuId="+skuIdValue;
		}
	});
	
	$(document).ready(function() {
		if(jQuery('body.qvpdp').hasClass('gift-pack')){
				try {
	            var newColorDriverObj = jQuery.parseJSON(jQuery.trim(jQuery('#colorDriverString').text()));
	            if ((newColorDriverObj != undefined) && (newColorDriverObj != null)) {
	            	colorDriverObj = newColorDriverObj;
	            }
		    } catch(err) {
		    }
		    try {
		    	var newPrdPrice = jQuery('#price').html();
		        if ((newPrdPrice != undefined) && (newPrdPrice != null)) {
		        	prdPrice = newPrdPrice;
		        }
		    } catch(err) {
		    }
			var pickSize = jQuery('.pickSize.active').attr('rev');
			if((pickSize != null) || (pickSize != '') || (pickSize !== undefined)){
				var colorCode =jQuery('.pickColor.active').attr('rev');
				var activeSZ = jQuery('#sizes .active').attr('rev');
				var isAvail = false;
				jQuery('.skuAlert').each(function(){
					jQuery('.skuAlert').css("display","none");					
						});
				jQuery('#'+colorCode+'_skuAlert').css("display","block"); 
				//change size states
				jQuery('.pickSize').addClass('soldOut');
				jQuery.each(colorDriverObj[colorCode], function(index, value) {
					var szSkuObj = colorDriverObj[colorCode][index];
					var size = szSkuObj[0].replace(' ', '');
					var skuId = szSkuObj[1];
					//populate active sku
					if(activeSZ != null && activeSZ != "" && size == activeSZ.replace(' ', '')) {
						jQuery('#skuNumber').text(skuId);
						jQuery('#pdpSelectedSku').val(skuId);
						isAvail = true;
						jQuery.post('/shop/gadgets/selectedSkuPricing.jsp', { "productId":jQuery('#productId').val(), "selectedSkuId":skuId }, function (data) {
							skuPrice = (jQuery.trim(data) != "") ? jQuery.trim(data) : jQuery('#price').html();
							jQuery('#price').html(skuPrice);
						});
					}
		
					jQuery('a[rev="' + size + '"]').removeClass('soldOut');
		
				});
				if(activeSZ != null && activeSZ != "" && !isAvail) {
					jQuery('#skuNumber').text('');
					jQuery('#pdpSelectedSku').val('out of stock');
					jQuery('#price').html(prdPrice);
				}
			}
		}
	});
	
	
	jQuery("body.cdp div.product a.prodbox").click(function(event) {
		event.preventDefault();
		jQuery.fancybox({
			'padding' : 0,
			'transitionIn' : 'none',
			'transitionOut' : 'none',
			'scrolling' : 'no',
			'autoDimensions' : false,
			'width' : 980,
			'height' : 650,
			'type' : 'iframe',
			'href' : jQuery(this).attr("href"),
			'onComplete' : function() {
			}
		});
	});

	//LOGIN, REGISTER
	jQuery("a#signInLink, #fbLoginLink, #registerLink, #loginModalLink, a.signInLink, a#wishListTransient").click(function(event) {
		
		var isReloadOnClose =  true;
		
		//NA MAINT Rls 14.2:NA-675 - Let sing-in and register links redirect to login page
		if(!jQuery(this).hasClass('utilitySignIn') && jQuery(this).attr("id") != "registerLink"){
			event.preventDefault();
		}
		
		if(jQuery(this).hasClass('checkoutSignIn')) {
			var loadUrl = jQuery(this).attr("href");
			omnCheckoutSignIn();
		} else if(jQuery(this).hasClass('wishlistlanding')) {
			var loadUrl = jQuery(this).attr("href");
		}else {
			var loadUrl = jQuery(this).attr("href") + '?=reloadUrl=' + escape(currentURL);
		}
		if (jQuery(this).hasClass('wishListLink')){
			var loadUrl = jQuery(this).attr("href");
			isReloadOnClose =  false;
		}
		if (jQuery(this).hasClass('utilitySignIn')){
			omnUtilitySignIn();
		}
		
		//NA MAINT Rls 14.2:NA-675 - code change. Modals will not pop-up for sign-in and register
		if(!jQuery(this).hasClass('utilitySignIn') && jQuery(this).attr("id")!="registerLink"){
			jQuery.fancybox({
				'padding' : 0,
				'transitionIn' : 'none',
				'transitionOut' : 'none',
				'scrolling' : 'no',
				'autoDimensions' : true,
				'autoScale' : false,
				'width' : 501,
				'height' : 369,
				'type' : 'iframe',
				'href' : loadUrl,
				'onComplete' : function() {
				},
				'onClosed' : function(){
					if (isReloadOnClose == true)
						closeAndRefresh();	
				}
			});
		}
	});
	
	jQuery("#register").click(function(event){
		s=s_gi(s_account);
		s.linkTrackVars="eVar17,events";
		s.linkTrackEvents="event81";
		s.eVar17="store:account:register:register";
		s.events="event81";
		s.tl(this,'o','store:account:register:register');
	});
	
	
	jQuery("#checkOutRegister").click(function(event){
		s=s_gi(s_account);
		s.linkTrackVars="eVar17,events";
		s.linkTrackEvents="event81";
		s.eVar17="store:account:checkout:register";
		s.events="event81";
		s.tl(this,'o','store:account:checkout:register');
	});
	
	jQuery("#wishlistSignIn").click(function(event){
		s=s_gi(s_account);
		s.linkTrackVars="eVar17,events";
		s.linkTrackEvents="event81";
		s.eVar17="store:account:wishlist:signin";
		s.events="event81";
		s.tl(this,'o','store:account:wishlist:signin');
	});
	
	jQuery("#wishlistRegister").click(function(event){
		s=s_gi(s_account);
		s.linkTrackVars="eVar17,events";
		s.linkTrackEvents="event81";
		s.eVar17="store:account:wishlist:register";
		s.events="event81";
		s.tl(this,'o','store:account:wishlist:register');
	});
	
	//validation
	jQuery('#searchField').autotab_filter({format: 'custom', pattern: '[^0-9a-zA-Z!#$%&()+-.;,:=?@*\\[\\]{}~_^/|\\\"`\\\\ \\]]' });
	
	
/*	jQuery('#gcCheckBalance').click(function(e) {
		e.preventDefault();
		jQuery('#fancybox-content').css('background-color', '#ffffff');
		jQuery.fancybox({
			'autoScale'				: false,
			'hideOnContentClick'	: false,
			'height'				: 360,
			'width'					: 275,
			'transitionIn'			: 'elastic',
			'transitionOut'			: 'elastic',
			'speedIn'				: 400,
			'speedOut'				: 200,
			'overlayShow'			: true,
			'scrolling'				: 'no',
			'centerOnScroll'		: true,
			'type'					: 'iframe',
			'href'					: '/shop/giftcard-balance-check.jsp',
			'onClosed'				: function() {
				jQuery('#fancybox-content').css('background-color', 'transparent');
			}
		});
	});*/
	
});

function submitSearch(){
	if(jQuery('#searchField').val()!="search"){
		var safeSearch = encodeURIComponent(jQuery('#searchField').val());
		var locale = jQuery('#userRegionForSearch').val()
		parent.location = "//"+searchServer + "/search?region="+locale+"&asug=&w=" + safeSearch;
	}
}

function submitSearch404Asana(){
	if(jQuery('#searchfield1').val()!="search lululemon"){
		var safeSearch = encodeURIComponent(jQuery('#searchfield1').val());
		var locale = jQuery('#userRegionForSearch').val()
		parent.location = "//"+searchServer + "/search?region="+locale+"&asug=&w=" + safeSearch;
	}
}

function captureAddToWishlist() {
	//capture omniture var for wishlist
	s.events="event51";
	s.products = ';' + jQuery('#pdpSelectedSku').val();
	var s_code=s.tl();if(s_code)document.write(s_code);
	_gaq.push(['ga._trackEvent', 'User Event', 'Add to Wishlist', '']);

}

function captureMoreColorClick() {
	s.events = "event28";
	s.eVar22="more colors";
	s.linkTrackVars="eVar22,events";
	s.linkTrackEvents="event28";
	var s_code=s.tl(this,'o','more colors');
}

function captureVideoView(title) {
	omnitureReset();
	s.events = "event31";
	var s_code=s.tl();if(s_code)document.write(s_code);
}
function updateCartNav() {
	jQuery.ajax({
		url:'/elements/gadgets/shoppingCartItemCount.jsp',
		type:'post',
		dataType:'json',
		data: {buttonCheck : true},
		success: function(data) {
			var allInstock = jQuery.trim(data.allInStock);
			var abTestData = jQuery.trim(data.abTest);
			var count = jQuery.trim(data.count);
			if(count > 0 && allInstock  && abTestData!='hide') {
				jQuery('#checkoutLink').removeClass('hideCheckoutButton');
			} else {
				jQuery('#checkoutLink').addClass('hideCheckoutButton')
			}
			jQuery('#shoppingBag .itemCount').text(count);
		}
	});

}

/*
 * NA 306 : Omniture Tagging : START
 */


function omnCheckoutSignIn(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar17,events";
	s.linkTrackEvents="event81";
	s.eVar17="store:account:checkout:signin";
	s.events="event81";
	s.tl(this,'o','store:account:checkout:signin');
}

/*
 * NA 306 : Omniture Tagging : END
 */

//***Popups
function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function set_cookie(cookie_name)
{
	document.cookie = cookie_name+"=true;path=/;domain=lululemon.com";

}

//start new region selector / Detailed cookie creator
function set_cookieUK(cookie_name,cookie_value,days,domain)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + days);
	if (!domain){var domain = location.hostname}
	document.cookie = cookie_name+"="+cookie_value+";path=/;domain="+domain+";expires="+exdate.toUTCString();
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function shopRegionalizedPopup(region)
{
	$(window).load(function() {
	var popupNoShow = get_cookie("popupNoShow");
	var isNZParam = getURLParameter("country")=="NZ";
	
	if(isNZParam==false)//*** get userregion from form on page and checks to see if the country is NZ... No double popup
	{
	
		var country = get_cookie("Country");
		var url = null;
		var width = 500;
		
		if(country==null){country="US"}
		
		if(popupNoShow==null){
			
			set_cookie("popupNoShow");
			
			if(region=="au"){
				if(country=="NZ"){	
					srcContent = '<iframe width="500" height="400" frameborder="0" src="//'+wwwlocation+'/popups/AU_NZ.php"; scrolling="no" ></iframe>';
					height = 400;
				}
			}else{
				//*** NA Site
					if(country=="NZ"){	
						srcContent = '<iframe width="500" height="400" frameborder="0" src="//'+wwwlocation+'/popups/INT_NZ.php"; scrolling="no" ></iframe>';
						height = 400;
					}
					
					if(country=="AU"){
						srcContent = '<iframe width="500" height="400" frameborder="0" src="//'+wwwlocation+'/popups/INT_AU.php"; scrolling="no" ></iframe>';
						height = 400;
					}
					if(country=="HK" || country=="SG"){					 
					    srcContent = '<iframe width="732" height="750" frameborder="0" src="//'+wwwlocation+'/popups/INT_HK.php"; scrolling="no" ></iframe>';
                        height = 750;
						width = 732;                     }

					if(country=="UK"){					
					srcContent = '<iframe width="500" height="442" frameborder="0" src="//'+wwwlocation+'/popups/INT_UK.php"; scrolling="no" ></iframe>';
					height = 442;
					}
			}
	
			
			if(srcContent!=null){
				
				jQuery.fancybox({
					'hideOnContentClick': false,
                    'titleShow':false,
                    'scrolling':'no',
                    'content' : srcContent,
                    'width' : width,
                    'height' : height,
                    'autoScale' : false,
                    'autoDimensions' : false ,
                    'scrolling' : 'no',
                    'padding' : 0,
					'margin' : 0					
				});
				
			}
		}
	}
	});
	
}
   

//function updateRegionInt(regId){
//	jQuery('#newLocale').val(regId);
//	jQuery('#changeLocaleButton').click();
//}


function updateRegionAus(regId,shopURL){
		if(regId=="en_AU"){
			country = get_cookie("Country");	
			location.href='//'+shopURL+'/?locale='+regId+"&country="+country;	
		} else if(regId =='en_HK'){
			country = get_cookie("Country");	
			location.href='//'+shopURL+'/?locale='+regId+"&country="+country;	
		} else if(regId =='fr_CA'){
			var unifiedUrl=jQuery('#changeCountryUnifiedUrl').val();
			location.href='//'+shopURL+unifiedUrl+'/?locale='+regId;
			
		} else if(regId =='en_CA'){
			var unifiedUrl=jQuery('#changeCountryUnifiedUrl').val();
			location.href='//'+shopURL+unifiedUrl+'/?locale='+regId;
		} else{
		location.href='//'+shopURL+'/?locale='+regId;
		}
}


function captureCreateWishlistClick() {
	var pageName = s.pageName;
	omnitureReset();
	s.pageName = pageName;
	s.events="event49";
	s.eVar16="${selectedCountry}";
	var s_code=s.tl();if(s_code)document.write(s_code);
	_gaq.push(['ga._trackEvent', 'Cart Event', 'Create Wishlist', '']);
}

function captureEmailSignUp() {
	omnitureReset();
	s.pageName="www:Home";
	s.events="event5";
	s.prop1="Home";
	s.prop2="";
	s.prop3="";
	s.prop4="";
	s.channel="www";
	s.prop17="www:Home";
	var s_code=s.tl();if(s_code)document.write(s_code);

}

/* omniture tagging for popup region link */
function captureRegionChange(country) {
	omnitureReset();
	s=s_gi(s_account);
	s.linkTrackVars="events,prop29, eVar29";
	s.linkTrackEvents="event57";
	s.prop29="glb:intl ship to:pop-up:"+ country;
	s.eVar29="glb:intl ship to:pop-up:"+ country;
	s.events="event57";
	s.tl(this,'o','glb:intl ship to:pop-up:'+ country);
}

/* omniture tagging for compare tool launch */
function omnitureCompareToolLaunch(prdIds, prdDesc) {
	var pageName = s.pageName;
	omnitureReset();
	s.pageName = 'cdp-compare:' + pageName;
	s.events="event63";
	s.products=prdIds;
	s.prop35=prdDesc;
	void(s.t());
}

/* omniture tagging for product detail page */
function omnitureProductDetails(prdDesc) {
	var pageName = s.pageName;
	omnitureReset();
	s=s_gi(s_account);
	s.linkTrackVars="prop29,eVar29,events"; 
	s.linkTrackEvents="event64,event57";
	s.eVar29="cdp-compare:" + pageName + ":" + prdDesc;
	s.prop29="cdp-compare:" + pageName + ":" + prdDesc;
	s.events="event64,event57";
	s.tl(this,'o','cdp-compare:'+ pageName + ":" + prdDesc);
}

function omnitureReset() {
	s.pageName="";
	s.products="";
	s.prop1 = "";
	s.prop2 = "";
	s.prop3 = "";
	s.prop4 = "";
	s.prop17 = "";
	s.channel = "";
	s.event="";
}

function removePrefixFromSku(skuId) {
	var imgId = "";
    imgId = skuId.substring(skuId.indexOf("_") + 1, skuId.length);
    return imgId;
}

	// start new region selector / Code to build the region/country list in the region selection box.

// start new region selector / build URL / some urls have more than one URL variable, this finds out if that's true and adds sl variable accordingly
function updateRegionInt(country,regId,regUrl){
	var flagID = regId.split("_")[1];
	var hasUrlVar = regUrl.indexOf("?");
	var preFix = '&sl=';
	if (hasUrlVar < 0){
		preFix = '?sl=';
	}
	if(regUrl.indexOf('sl=') > -1) {
		flagID = '';
		preFix = '';
	}
	if (regUrl.indexOf("fr.shop.lululemon.com") !=-1 || regUrl.indexOf("fr.qa.lululemon.com") !=-1 || regUrl.indexOf("fr.stage.lululemon.com") !=-1) {
			set_cookieUK("rememberFR",true,30,"lululemon.com");
	} else {
		set_cookieUK("rememberFR",false,-1,"lululemon.com");
	}
	// dynamic addition of local, stage or qa if already in test environment
	var currentLocation = new String(window.location.href);
	captureRegionChange(country);
	if (currentLocation.indexOf("local.") !=-1) {
		regUrl=regUrl.replace("www.","");
		window.location="http://local."+regUrl+preFix+flagID;
    }else if(currentLocation.indexOf("stage10.") > -1 || currentLocation.indexOf("stage.") > -1 || currentLocation.indexOf("fr-") > -1){
    	if(regUrl=='www.lululemon.com/?locale=en_US'){
    		regUrl=regUrl.replace("www.","stage.");
        	window.location="http://"+regUrl+preFix+flagID;
    	}else if (regUrl=='www.lululemon.com/?locale=en_CA'){
    		regUrl=regUrl.replace("www.","stage.");
        	window.location="http://"+regUrl+preFix+flagID;
    	}else if (regUrl=='fr.shop.lululemon.com'){
    		regUrl = 'fr.stage.lululemon.com/';
    		//regUrl=regUrl.replace("www.","stage.");
        	window.location="http://"+regUrl+preFix+flagID;
    	}else{
    		regUrl=regUrl.replace("www.","");
    		if(currentLocation.indexOf("qa.") !=-1){
    			window.location="http://qa."+regUrl+preFix+flagID;
    		}else{
    			if(flagID == 'NZ' || flagID == 'AU'){
                           window.location="http://stage10."+regUrl+preFix+flagID;
                        }else{
                          window.location="http://stage."+regUrl+preFix+flagID;
                        }

    		}
    	}
    }else if(currentLocation.indexOf("qa.") !=-1){
	if(regUrl=='www.lululemon.com/?locale=en_US'){
    		regUrl=regUrl.replace("www.","qa.");
        	window.location="http://"+regUrl+preFix+flagID;
    	}else if (regUrl=='www.lululemon.com/?locale=en_CA'){
    		regUrl=regUrl.replace("www.","qa.");
        	window.location="http://"+regUrl+preFix+flagID;
    	}else if (regUrl=='fr.shop.lululemon.com'){
    		regUrl = 'fr.qa.lululemon.com/?sl=CA';
    		//regUrl=regUrl.replace("www.","stage.");
        	window.location="http://"+regUrl+preFix+flagID;
    	} else {
    		regUrl=regUrl.replace("www.","qa.");
    		window.location="http://"+regUrl+preFix+flagID;
    	}
    }else{
    	if(regUrl.indexOf('sl=') > -1) {
    		flagID = '';
    		preFix = '';
    	}
    	window.location="http://"+regUrl+preFix+flagID;
    }
	
	var cookieShown = get_cookie('regionMsgShown');
	if (cookieShown==null){
		set_cookieUK("regionMsgShown",true,1);
	}
}
// end new region selector / build URL

function countrySelectSetup(){
	// temporary flag reset -- for testing from some other country than the one you're in.
	// set_cookieUK('Country','US',5,'.lululemon.com.hk');

	function captureRegionPopup(){	
		omnitureReset();
		s=s_gi(s_account);
		s.pageName = "international ship to: pop-up";
		s.t();
	}
	// start new region selector / handle flags & shipping country
	function openRegionwCookie() {
		var cookieShown = get_cookie('regionMsgShown');
		if (cookieShown==null){
			jQuery('.regionSelector').addClass('on');
			jQuery('.regionSelector').show();
			jQuery('.regionGrey').css('display','block');
			var screenTop = $(document).scrollTop();
			jQuery('.regionSelector .regionSelectorStyle').css('top', screenTop);
			set_cookieUK("regionMsgShown",true,365);
			captureRegionPopup();			
			regionFirst = 1; // variable to disable cookie message popup
		}else {regionFirst = 0;}
	};
	function findCountry(arr,obj) {
	    return (arr.indexOf(obj)); // look for country cookie value in set list of active countries for this site.
	}

	// set list to check against for valid sl or country cookie
	var crList;
	var crListCompare;
	if(location.hostname.search(".co.uk") != -1) {
		crList = ['UK'];
		crListCompare = ['UK'];
		defaultFlag = 'UK';
	}
	else if(location.hostname.search(".com.hk") != -1) {
		crList = ['HK','SG','BD','MY','VN','CN'];
		crListCompare = ['HK','SG','BD','MY','VN','CN'];
		defaultFlag = 'HK';
	}
	else if(location.hostname.search(".com.au") != -1) {
		crList = ['AU'];
		crListCompare = ['AU'];
		defaultFlag = 'AU';
	}else if(location.hostname.search(".co.nz") != -1) {
		crList = ['NZ'];
		crListCompare = ['NZ'];
		defaultFlag = 'NZ';
	}
	else if(location.hostname.search("eu.lululemon.com") != -1) {
		//crList = ['AT','BE','DK','DE','GR','IE','PT','SK','SI','NO','CH','EE','FI','FR','IT','LU','NL','ES','SE'];
		crList = ['AT','BE','CZ','DK','EE','FI','FR','DE','GR','IE','IT','LV','LT','LU','MC','NL','NO','PL','PT','SK','SI','ES','SE','CH'];
		crListCompare = ['AT','BE','CZ','DK','EE','FI','FR','DE','GR','IE','IT','LV','LT','LU','MC','NL','NO','PL','PT','SK','SI','ES','SE','CH'];
		defaultFlag = 'EU';
	}
	else {
		// assume US site
		//crList = ['US','CA','AS','MS','BS','BR','KY','BH','ID','IL','JP','AE','KW','PH','SA','HR','CZ','LV','LI','PL','PR','MX','GU','VI','KR','TW','GL','IS','LT','MC','BM'];
		crList=  ['AS','BS','BH','BM','BR','CA','KY','HR','GL','GU','IS','ID','IL','JP','KR','KW','LI','MX','MS','PH','PR','SA','TW','AE','US','VI','AR','AW','BB','BO','CL','CO','DO','EC','GD','GT','HN','IN','JM','PA','PE','RU','ZA','TZ','TT','TR','TC','UA','VE'];
		if(get_cookie("UsrLocale") == 'en_CA' || get_cookie("UsrLocale") == 'fr_CA') {
			crListCompare = ['CA'];
		} else {
			crListCompare = ['AS','BS','BH','BM','BR','CA','KY','HR','GL','GU','IS','ID','IL','JP','KR','KW','LI','MX','MS','PH','PR','SA','TW','AE','US','VI','AR','AW','BB','BO','CL','CO','DO','EC','GD','GT','HN','IN','JM','PA','PE','RU','ZA','TZ','TT','TR','TC','UA','VE'];
		}
		defaultFlag = 'US';
	}
	var currentURL;
	// order of priority for flag sl-URL, sl-Cookie, country-cookie, default
	var slDefined = getURLParameter('sl');
	var slCook = get_cookie('sl');
	var cookFlag = get_cookie("Country");
	var testForFlag = "";

	// if sl isn't passed as url or cookie, use country-cookie
	if((slDefined == 'null' || slDefined == null || slDefined == '') && (slCook == 'null' || slCook == null || slCook == '')){
		// sl not passed in url or empty. try cookie value for flag.
		// cookie value null or same as default. show default flag for this site.
		if (!cookFlag || cookFlag == defaultFlag){
			// nothing needs to happen we're already using default
			testForFlag = defaultFlag;
		}else {
			// set flag to cookie flag value
			testForFlag = cookFlag;
		}
	}else{
		// sl passed in url or cookie. update flag cookie and display correct flag
		if(slDefined == 'null' || slDefined == null || slDefined == ''){
			// sl did not come from URL, come from cookie, define test and update cookie
			testForFlag = slCook;
		}else{
			if(crList.indexOf(slDefined) !=-1){
				testForFlag = slDefined;
			}else{
				testForFlag = defaultFlag;
			}			
		}
	}
	// test value against valid list
	var flagTest = findCountry(crListCompare,get_cookie("Country"));
	if (flagTest !== -1){

		// change flag image
		updateFlag(testForFlag); // update flag
		set_cookieUK("sl",testForFlag,365); // set or update cookie
		if((slDefined != 'null' && slDefined != null && slDefined != '') && crList.indexOf(slDefined) ==-1){
			jQuery('.regionSelector').addClass('on');
			jQuery('.regionSelector').show();
			jQuery('.regionGrey').css('display','block');
		}
	}else{
		openRegionwCookie();
	}

	function updateFlag(flagID){
		if(flagID == '') {
			fagID = 'US';
		}
		flagID = flagID.toUpperCase();
		var image = jQuery('#regionSelector a span img');
		var src = image.attr("src");
		// special case for ireland <<removed in case hard coding EU image works
//		if (cookFlag == 'IE' && (((slDefined == 'null' || slDefined == null || slDefined == '') && (slCook == 'null' || slCook == null || slCook == '')) || ((slDefined == 'IE') || slCook =='IE'))){
//			flagID = 'IE2';
//		}
		var newSrc = src.replace(/flag-en_[^.]+/i, 'flag-en_'+flagID);
		image.attr("src", newSrc);
	}
	// end new region selector / handle flags & shipping country

	var cookieShown = get_cookie('cookieMsgShown');
	if (cookieShown==null && regionFirst == 0 && location.hostname.search(".co.uk") != -1){
		jQuery('.regionChange').show();
		set_cookieUK("cookieMsgShown",true,365);
	}

	// ***** THIS is the area you can edit to add/remove/edit countries or regions *****
	//['region name',[['country name'],['locale for image path'],['complete url minus http://']],[['repeat'],['repeat'],['repeat']]]
	var arr = [['north america',[['canada (english)'],['en_CA'],['www.lululemon.com/?locale=en_CA']],[['canada (fran&#231;ais)'],['fr_CA'],['fr.shop.lululemon.com']],[['united states of america'],['en_US'],['www.lululemon.com/?locale=en_US']]],	           
	           ['europe',[['united kingdom'],['en_UK'],['www.lululemon.co.uk']],[['austria'],['en_AT'],['www.eu.lululemon.com']],[['finland'],['en_FI'],['www.eu.lululemon.com']],[['ireland'],['en_IE'],['www.eu.lululemon.com']],[['monaco'],['en_MC'],['www.eu.lululemon.com']],[['slovenia'],['en_SI'],['www.eu.lululemon.com']],[['belgium'],['en_BE'],['www.eu.lululemon.com']],[['france'],['en_FR'],['www.eu.lululemon.com']],[['italy'],['en_IT'],['www.eu.lululemon.com']],[['netherlands'],['en_NL'],['www.eu.lululemon.com']],[['spain'],['en_ES'],['www.eu.lululemon.com']],[['croatia'],['en_HR'],['www.lululemon.com/?locale=en_US']],[['germany'],['en_DE'],['www.eu.lululemon.com']],[['latvia'],['en_LV'],['www.eu.lululemon.com']],[['norway'],['en_NO'],['www.eu.lululemon.com']],[['sweden'],['en_SE'],['www.eu.lululemon.com']],[['czech republic'],['en_CZ'],['www.eu.lululemon.com']],[['greece'],['en_GR'],['www.eu.lululemon.com']],[['liechtenstein'],['en_LI'],['www.lululemon.com/?locale=en_US']],[['poland'],['en_PL'],['www.eu.lululemon.com']],[['switzerland'],['en_CH'],['www.lululemon.ch']],[['denmark'],['en_DK'],['www.eu.lululemon.com']],[['greenland'],['en_GL'],['www.lululemon.com/?locale=en_US']],[['lithuania'],['en_LT'],['www.eu.lululemon.com']],[['portugal'],['en_PT'],['www.eu.lululemon.com']],[['ukraine'],['en_UA'],['www.lululemon.com/?locale=en_US']],[['estonia'],['en_EE'],['www.eu.lululemon.com']],[['iceland'],['en_IS'],['www.lululemon.com/?locale=en_US']],[['luxembourg'],['en_LU'],['www.eu.lululemon.com']],[['slovakia'],['en_SK'],['www.eu.lululemon.com']]],
			   ['australia and new zealand',[['australia'],['en_AU'],['lululemon.com.au']],[['new zealand'],['en_NZ'],['lululemon.co.nz']]],
			   ['asia pacific',[['hong kong'],['en_HK'],['www.lululemon.com.hk']],[['singapore'],['en_SG'],['www.lululemon.com.hk']], [['china'],['en_CN'],['www.lululemon.com.hk']],[['american samoa'],['en_AS'],['www.lululemon.com/?locale=en_US']],[['indonesia'],['en_ID'],['www.lululemon.com/?locale=en_US']],[['korea (republic of)'],['en_KR'],['www.lululemon.com.hk']],[['philippines'],['en_PH'],['www.lululemon.com/?locale=en_US']],[['taiwan'],['en_TW'],['www.lululemon.com.hk']],[['bangladesh'],['en_BD'],['www.lululemon.com.hk']],[['india'],['en_IN'],['www.lululemon.com/?locale=en_US']],[['malaysia'],['en_MY'],['www.lululemon.com.hk']],[['russia'],['en_RU'],['www.lululemon.com/?locale=en_US']],[['vietnam'],['en_VN'],['www.lululemon.com.hk']],[['guam'],['en_GU'],['www.lululemon.com/?locale=en_US']],[['japan'],['en_JP'],['www.lululemon.com.hk']]],
	           ['middle east and africa',[['bahrain'],['en_BH'],['www.lululemon.com/?locale=en_US']],[['kuwait'],['en_KW'],['www.lululemon.com/?locale=en_US']],[['south africa'],['en_ZA'],['www.lululemon.com/?locale=en_US']],[['turkey'],['en_TR'],['www.lululemon.com/?locale=en_US']],[['united arab emirates'],['en_AE'],['shop.lululemon.com/home.jsp?locale=en_US']],[['israel'],['en_IL'],['www.lululemon.com/?locale=en_US']],[['saudi arabia'],['en_SA'],['www.lululemon.com/?locale=en_US']],[['tanzania'],['en_TZ'],['www.lululemon.com/?locale=en_US']]],	           
	           ['latin america and caribbean',[['aruba'],['en_AW'],['www.lululemon.com/?locale=en_US']],[['cayman islands'],['en_KY'],['www.lululemon.com/?locale=en_US']],[['honduras'],['en_HN'],['www.lululemon.com/?locale=en_US']],[['montserrat'],['en_MS'],['www.lululemon.com/?locale=en_US']],[['trinidad and tabago'],['en_TT'],['www.lululemon.com/?locale=en_US']],[['bahamas'],['en_BS'],['www.lululemon.com/?locale=en_US']],[['dominican republic'],['en_DO'],['www.lululemon.com/?locale=en_US']],[['jamaica'],['en_JM'],['www.lululemon.com/?locale=en_US']],[['panama'],['en_PA'],['www.lululemon.com/?locale=en_US']],[['turks and caicos islands'],['en_TC'],['www.lululemon.com/?locale=en_US']],[['barbados'],['en_BB'],['www.lululemon.com/?locale=en_US']],[['grenada'],['en_GD'],['www.lululemon.com/?locale=en_US']],[['mexico'],['en_MX'],['www.lululemon.com/?locale=en_US']],[['puerto rico'],['en_PR'],['www.lululemon.com/?locale=en_US']],[['virgin islands'],['en_VI'],['www.lululemon.com/?locale=en_US']],[['bermuda'],['en_BM'],['www.lululemon.com/?locale=en_US']],[['guatemala'],['en_GT'],['www.lululemon.com/?locale=en_US']]],
	           ['south america',[['argentina'],['en_AR'],['www.lululemon.com/?locale=en_US']],[['bolivia'],['en_BO'],['www.lululemon.com/?locale=en_US']],[['colombia'],['en_CO'],['www.lululemon.com/?locale=en_US']],[['peru'],['en_PE'],['www.lululemon.com/?locale=en_US']],[['venezuela'],['en_VE'],['www.lululemon.com/?locale=en_US']],[['brazil'],['en_BR'],['www.lululemon.com/?locale=en_US']],[['chile'],['en_CL'],['www.lululemon.com/?locale=en_US']],[['ecuador'],['en_EC'],['www.lululemon.com/?locale=en_US']]]];

	// ***** End edit for countries & regions *****

	var txt='<div id="regionsCountriesBox" class="regionsCountriesBox">';
	var length = arr.length;
	for (var i = 0; i < length; i++) {
		var ctxt = '';
		txt=txt+'<div class="regionBox'+i+'" id="regionBox"><h2>'+arr[i][0]+'</h2><ul>';
		var x = arr[i].length;
		 var cinr = x - 1;
		 var breakPoint = 4;
		  if (cinr>12){
			 breakPoint = 5;
		 }
		 else if (cinr<5){
			 breakPoint = 2;
		 }
		 var breakTest = 0;
		 var iLength = arr[i].length;
		for (var y = 0; y < iLength; y++) {
				if (y != 0){
					// If list is longer than 12, break
					/*if(breakPoint == breakTest){
						
						breakTest = 0;
					}*/
					breakTest = breakTest + 1;
					var regionUpdate = "'"+arr[i][y][0]+"','"+arr[i][y][1]+"','"+arr[i][y][2]+"'";
				  	ctxt = ctxt+'<li><a href="javascript:updateRegionInt('+regionUpdate+')"><img src="//'+cdnLulustaticUrl+'/hr/img/flag-'+arr[i][y][1]+'.jpg" alt="'+arr[i][y][0]+'""> '+arr[i][y][0]+'</a></li>';
				}
				if(y==(iLength-1))
				ctxt=ctxt+'</ul></div><div class="regionBox" id="regionBox"><ul>';
			}
		txt=txt+ctxt+'</ul></div>';
		if (i == 1 || i == 2 || i ==4){
				// break row for these regions as they finish... if more regions are added these numbers will change
				txt = txt+'</div><div class="regionHR"></div><div id="regionsCountriesBox" class="regionsCountriesBox">';
		}		
	  }
	jQuery("#regionsCountriesBoxWrapper").html(txt);
}

/**
 * Manage the product image rollover
 * @param  {jQuery Event} e Event fired on mouseenter and mouseleave
 */

//first make sure IE8 hide all the images...
if(!jQuery.support.opacity){
	$('ul.product-images').each(function(i, el){
		var _el = $(el);
		_el.find('li:not(:first)').css({opacity:0});
	});
}

// set the variables required
var rolloverTimeout = null;
$('body').on('mouseenter mouseleave','ul.product-images',function(e){

	// get all the elements we need
	var _item 			= $(this);
	var _current 		= _item.find('li.current');
	if(_current.attr('class') != undefined) {
		var currentSku 		= _current.attr('class').replace('current','');
		var _medias			= _item.find('li.'+currentSku);
		var numberOfmedias	= _medias.length;
	
		// variables related to the animation
		var duration 		= 500;
		var delay 			= 500;
	
		// if there is only one media (pic or whatever type of file), we don't need to do anything
		if(numberOfmedias <= 1) { return; }
		// the delay has to be greater than the duration to avoid weird behavior
		if(delay < duration) { delay = duration; }// initialize the interval
	
		// add the listener on the mouseover
		if(e.type === 'mouseenter'){
			rolloverTimeout = setTimeout(function(){
				displayNextImage(_item, _medias, delay, duration);
				_item.data('imageChanged',true);
			}, delay);
		}
	
		if(e.type === 'mouseleave'){
			clearTimeout(rolloverTimeout);
			if(_item.data('imageChanged')){
				setTimeout(function(){
					displayNextImage(_item, _medias, delay, duration);
					_item.data('imageChanged',false);
				}, delay);
			}
		}
	} 
});


/**
 * Function that will display the next image in a container with an fade effect
 * @param  {jQuery Element} _item    Media container
 * @param  {jQuery Element} _medias  List of all the images
 * @param  {integer} delay    Delay before the animation starts
 * @param  {integer} duration Duration of the animation
 */
var displayNextImage = function(_item, _medias, delay, duration){

	var _lastMedia		= _medias.last();
	var _firstMedia		= _medias.first();

	// get the current media
	var _currentMedia = _item.find('.current');
	if(_currentMedia.length == 0){
		_currentMedia = _medias.first();
		_currentMedia.addClass('current');
	}

	// get the next media
	var _nextMedia = null;
	if(_currentMedia.is(_lastMedia)){
		_nextMedia = _firstMedia;
	}else{
		_nextMedia = _currentMedia.next('li');
	}

	// display the next media instead of the current one
	_currentMedia
		.animate({'opacity':0}, duration, function(){
			_currentMedia.removeClass('current');
		});
	_nextMedia
		.animate({'opacity':1}, duration, function(){
			_nextMedia.addClass('current');
		});

};

//on page-load, loads the dynamic content of the tooltip on the element
jQuery('.pdp .term').each(function() {
      var key = jQuery(this).attr('rel');
      var val = jQuery('.pdp #prodDefn_'+key).html();
      


      //if val present then apply tooltip to element
      if (val){
            
            
            jQuery(this).tooltipster({
              theme: '.tooltipster-pdp-shadow',
            	  interactive: true,
            	  interactiveTolerance: 300,
            	  content:val,
            	  functionReady: function(origin, tooltip){
            		  tooltip.find('a').attr('target','_blank');
            	}

            });
      }

});	//	end new region selector / Code to build the region/country list in the region selection box.

/*
 * NA-305 | Wishlist on PDP
 */
// put the body in cache
var _body = jQuery('body');
// default new wishlist name
var defaultWishlistName = 'wishlist name...';

//Omniture tags added for PDP wishlist implementation
function omnWishlistCreateWishList(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,events";
	s.linkTrackEvents="event49";
	s.eVar29="wishlist:pdp:create-wishlist";
	s.events="event49";
	s.tl(this,'o','wishlist:pdp:create-wishlist');
}

function omnWishlistAddItemToWishList(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,events";
	s.linkTrackEvents="event51";
	s.eVar29="wishlist:pdp:save-to-wishlist";
	s.events="event51";
	s.tl(this,'o','wishlist:pdp:save-to-wishlist');
}

function omnClickWishlistLink(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29";
	s.eVar29="wishlist:pdp:add-to-wishlist-link";
	s.tl(this,'o','wishlist:pdp:add-to-wishlist-link');
}

/**
 * NOT used after NA Rel-14.2
 * Select the wishlist passed in parameter and update the UI accordingly
 * @param  {integer} wlid ID of the wishlist
 */
var selectWL = function(wlid,wldesc,wlname){
	// cache the elements
	var _link 		= $('a.'+wlid);
	var _li 		= _link.parent('li');
	var _triggerDiv = $('.popup-dd-trigger');
	var _trigger 	= _triggerDiv.find('a');
	var _ul			= _triggerDiv.next('ul');
	var _hidden 	= $('.popup-submit input[name="wlid"]');
	var _hiddenDesc	= $('.popup-submit input[name="wldesc"]');
	var _hiddenName	= $('.popup-submit input[name="existwlname"]');
	var _selected	= _ul.find('.selected');	

	// change the selected option
	_selected.removeClass('selected');
	_li.addClass('selected');
	// update the text in the trigger
	_trigger.html(_link.html());
	// toggle the fake dropdown
	_ul.toggle();
	_triggerDiv.toggleClass('closed');
	// update the hidden input
	_hidden.val(wlid);
	_hiddenDesc.val(wldesc);
	_hiddenName.val(wlname);
};

/**
 * NOT used after NA Rel-14.2
 * Display / hide the fake dropdown containing all the wishlists
 * @param  {jQueryEvent} e Click fired
 */
_body.on('click','.popup-dd-trigger a', function(e){
	// stop the click
	e.preventDefault();

	// cache the elements
	var _trigger 	= $(this);
	var _parent 	= _trigger.parent('.popup-dd-trigger');
	var _ul			= _parent.next('ul');

	// toggle the fake dropdown
	_ul.toggle();
	_parent.toggleClass('closed');
});


/**
 * NOT used after NA Rel-14.2
 * Handle the click on an wishlist choice within the fake dropdown
 * @param  {jQueryEvent} e Click fired
 */
_body.on('click','.popup-dd li a', function(e){
	// stop the click
	e.preventDefault();
	// get the class of the selected option
	var _this = $(this);
	var wlid = _this.attr('class');
	var wldesc = _this.attr('rel');
	var wlname = _this.text();
	var _li = _this.closest('li');
	
	//do nothing if the item is inactive
	if(_li.hasClass("inactive"))
		return;

	//remove submit button disable
	var _subBtn		= $('.popup-submit form button')
	_subBtn.removeClass('wlBtnDisable');
	_subBtn.removeAttr('disabled');
	
	// update the UI
	selectWL(wlid, wldesc, wlname);
});


/**
 * NOT used after NA Rel-14.2
 * Empty the new wishlist name field when you click on it
 */
_body.on('focus','li.create input[name="name"]',function(){	
	
	var _error_div 	= $(".popup-wrapper .wishlist-error-msg");
	//hide the error-msg
	_error_div.hide();
	
	// get the content of the field
	var value = this.value;
	// remove the text on focus if it's the default one
	if(defaultWishlistName == value) { this.value = ''; }
});



/**
 * NOT used after NA Rel-14.2
 * New wishlist creation
 * @param  {jQueryEvent} e Submit event fired
 */
_body.on('submit','li.create form',function(e){

	// stop the submission
	e.preventDefault();

	//Wishlist on click event when create button is clicked
	omnWishlistCreateWishList();
	
	// cache the elements
	var _form 		= $(this);
	
	var _li 		= _form.parent('li');
	var _trigger	= $('.popup-dd-trigger');
	var _wrapper 	= $('#fancybox-content');
	
	// get the input values
	var name 		= _form.find('input[name="name"]').val();
	var pid 		= _form.find('input[name="pidCreate"]').val();
	var skuid 		= _form.find('input[name="skuidCreate"]').val();
	var qty 		= _form.find('input[name="qtyCreate"]').val();
	var _error_div 	= $(".popup-wrapper .wishlist-error-msg");

	//hide the error-msg
	_error_div.hide();
	
	
	if(name == "wishlist name...")
		name = "my wishlist";
	
	jQuery.ajax({
		type: 'post',
		url: '/shop/wishlist-add-submit.jsp',
		data: {pid:pid, skuid:skuid, qty:qty, wlid:"", wlname:name },
		dataType: 'json',
		success: function(data) {

			if(data.success) {
				
				// put the elements in cache
				var _toRemove 	= $('.popup-dd, .popup-submit');
				var _title 		= $('.popup-wrapper .header');
				var _subtitle 	= $('.popup-wrapper > p');
				
				// remove the useless UI elements
				_toRemove.animate({opacity:0, height:0, marginTop:0, marginBottoms:0}, 300, function(){
					_toRemove.remove();
				});
				// update the title
				_title.animate({opacity:0},300, function(){
					_title.html('added to wishlist!');
					_title.animate({opacity:1},300);
					// resize the popup
					/*_wrapper.css({width:'+=30px;'});
					jQuery.fancybox.resize();*/
				});
				// update the subtitle
				_subtitle.animate({opacity:0, marginBottom:0},300, function(){

					var isGiftGuideClicked = $('#isGiftGuideClicked').val();
					var _anchor = $('<a/>')
						.attr('href','/shop/wishlist-landing.jsp')
						.html('view my wishlists');
					
					// for GiftGuide/GiftPack, open the new page in parent window
					if (isGiftGuideClicked)
						_anchor = $('<a/>')
							.attr('href','/shop/wishlist-landing.jsp')
							.attr('target','_parent')
							.html('view my wishlists');
					
					_subtitle.html(_anchor);
					_subtitle.animate({opacity:1},300);
				});
				
				// close the modal popup after 3 secs
				var isTransientUser = $('#isTransientUser').val();
				var isGiftGuideClicked = $('#isGiftGuideClicked').val();
				var ggTab = $('#ggTab').val();
				var href = window.parent.location+'?activeTab='+ggTab;
				setTimeout(function(){
					if(isTransientUser){
						if(isGiftGuideClicked){
							window.parent.location.href = href;
						}else{
							closeAndRefresh();
						}
					}else{					
						jQuery.fancybox.close();
					}
				},3000);
				
			}else{
			//get the error-msg
			var error_msg 	= data.errors;
			_error_div.html(error_msg);
			_error_div.show();
		}
				
		}, error: function(xhr,status,error) {

		}
	
	});
});



/**
 * Not used anymore after Rel14.2 my account- wishlist redesign
 * Add the product to a wishlist
 * @param  {jQueryEvent} e Submit event fired
 */
_body.on('submit','.popup-submit form',function(e){

	// stop the submission
	e.preventDefault();

	//omniture onclick event
	omnWishlistAddItemToWishList();
	
	// get the values to send in the server
	var _form 		= $(this);
	var _wrapper 	= $('#fancybox-content');
	var wlname		= "";
	
	var pid 		= _form.find('input[name="pid"]').val();
	var skuid 		= _form.find('input[name="skuid"]').val();
	var qty 		= _form.find('input[name="qty"]').val();
	var wlid 		= _form.find('input[name="wlid"]').val();
	var wldesc 		= _form.find('input[name="wldesc"]').val();
	var existwlname = _form.find('input[name="existwlname"]').val();
	var _error_div 	= $(".popup-wrapper .wishlist-error-msg");
	var _popupDiv	= $(".popup-dd-trigger a");
	var selWLName	= _popupDiv.text();
	
	//hide the error-msg
	_error_div.css('display','none');
	
	// if default wishlist selected, then set wishlist name
	if(selWLName == "my wishlist" && !wlid)
		wlname = selWLName;

	// Send these parameters to the server and let the JS know if the operation was successful or not
	// If it was, update the UI	
	jQuery.ajax({
		type: 'post',
		url: '/shop/wishlist-add-submit.jsp',
		data: {pid:pid, skuid:skuid, qty:qty, wlid:wlid, wlname:wlname, wldesc:wldesc, existwlname:existwlname },
		dataType: 'json',
		success: function(data) {
			if(data.success) {
				
				// put the elements in cache
				var _toRemove 	= $('.popup-dd, .popup-submit');
				var _title 		= $('.popup-wrapper .header');
				var _subtitle 	= $('.popup-wrapper > p');
				
				// remove the useless UI elements
				_toRemove.animate({opacity:0, height:0, marginTop:0, marginBottoms:0}, 300, function(){
					_toRemove.remove();
				});
				// update the title
				_title.animate({opacity:0},300, function(){
					_title.html('added to wishlist!');
					_title.animate({opacity:1},300);
					// resize the popup
					/*_wrapper.css({width:'+=30px;'});
					jQuery.fancybox.resize();*/
				});
				// update the subtitle
				_subtitle.animate({opacity:0, marginBottom:0},300, function(){

					var isGiftGuideClicked = $('#isGiftGuideClicked').val();
					var _anchor = $('<a/>')
						.attr('href','/shop/wishlist-landing.jsp')
						.html('view my wishlists');
					
					// for GiftGuide/GiftPack, open the new page in parent window
					if (isGiftGuideClicked)
						_anchor = $('<a/>')
							.attr('href','/shop/wishlist-landing.jsp')
							.attr('target','_parent')
							.html('view my wishlists');
						
					_subtitle.html(_anchor);
					_subtitle.animate({opacity:1},300);
				});
				
				// close the modal popup after 3 secs
				var isTransientUser = $('#isTransientUser').val();
				var isGiftGuideClicked = $('#isGiftGuideClicked').val();
				var ggTab = $('#ggTab').val();
				var href = window.parent.location+'?activeTab='+ggTab;
				setTimeout(function(){
					if(isTransientUser){
						if(isGiftGuideClicked){
							window.parent.location.href = href;
						}else{
							closeAndRefresh();
						}
					}else{					
						jQuery.fancybox.close();
					}
				},3000);
				
			}
				
		}, error: function(xhr,status,error) {

		}
	
	});
	
});

function qs(key, href) {
    var vars = [], hash;
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[key];
}

/**
 * On click of the "add to wishlist" link from PDP
 * @param  {jQueryEvent} e Click fired
 */
jQuery('body.pdp a#wishListLink').on('click', function(e){

	// stop the click
	e.preventDefault();
	e.stopPropagation();

	//Calling omniture onclick event
	omnClickWishlistLink();
	
	// get the elements
	var _this = jQuery(this);
	var hrefVal = _this.attr("href");
	
	// When link disabled, dont do anything
	if(_this.hasClass('wlLinkDisabled')){
		return;
	}
		
	// if you're not logged in	
	if(_this.hasClass('addToWishListLinkNonLoggedIn')){
		parent.location.href = hrefVal;
	}else {
		//omniture onclick event
		omnWishlistAddItemToWishList();
		
		// get the values to send in the server
		var pid 		= qs('productId', hrefVal);
		var skuid 		= qs('skuId', hrefVal);
		var wlid 		= qs('giftListId', hrefVal);

		// Send these parameters to the server and let the JS know if the operation was successful or not
		// If it was, update the UI	
		jQuery.ajax({
			type: 'post',
			url: '/shop/wishlist-actions.jsp',
			data: {pid:pid, skuid:skuid, wlid:wlid, operation: "add to wishlist" },
			dataType: 'json',
			success: function(data) {
				if(data.success) {
				
					var _wlAddToBag = $('#wishListLink');
					_wlAddToBag.css("display","none");
					
					var _wlremove 	= $('.wlSaved');
					_wlremove.css("display","block");
				}
			}, error: function(xhr,status,error) {
				
			}
		});
	}
});

/**
 * Called when "remove" link is clicked from PDP
 * @param  {jQueryEvent} e Click fired
 */
jQuery('body.pdp a#wishListRemoveLink').on('click', function(e){

	// stop the click
	e.preventDefault();
	e.stopPropagation();

	//Calling omniture onclick event
	//omnClickWishlistLink();
	// get the elements
	var _this = jQuery(this);
	var hrefVal = _this.attr("href");
	
	// get the values to send in the server
	var pid 		= qs('productId', hrefVal);
	var skuid 		= qs('skuId', hrefVal);
	var wlid 		= qs('giftListId', hrefVal);
	
	jQuery.ajax({
		type: 'post',
		url: '/shop/wishlist-actions.jsp',
		data: {pid:pid, skuid:skuid, wlid:wlid, operation: "remove item from wishlist by skuid" },
		dataType: 'json',
		success: function(data) {
			if(data.success) {
				
				var _wlAddToBag = $('#wishListLink');
				_wlAddToBag.css("display","block");
				
				var _wlremove 	= $('.wlSaved');
				_wlremove.css("display","none");
				
			}
				
		}, error: function(xhr,status,error) {
			
		}
	
	});
	
});

//NA-674 - show shipping time on PDP

try{

	jQuery('.shipping-pop').tooltipster({
		  theme: '.tooltipster-pdp-shadow',
		       interactive: true,
		       maxWidth: 350,
		       fixedWidth: 350,
		       position: "bottom",
		       content:jQuery('.shipping-tooltip')
		});
		
}catch (err){
	//Do Nothing
}

//NA-674 - ends

//NA-266 Omniture Changes
function clpMenLoadOmniture(country) {
	omnitureReset();
	s=s_gi(s_account);
	s.pageName="store:men";
	s.eVar3="browse";
	s.eVar16=country;
	s.prop1="product category";
	s.prop2=" ";
	s.prop3=" ";
	s.prop4=" ";
	s.channel="store";
	s.events="event4";
	s.tl();
}

function clpWomenLoadOmniture(country) {
	omnitureReset();
	s=s_gi(s_account);
	s.pageName="store:women";
	s.eVar3="browse";
	s.eVar16=country;
	s.prop1="product category";
	s.prop2=" ";
	s.prop3=" ";
	s.prop4=" ";
	s.channel="store";
	s.events="event4";
	s.tl();
}

function viewAllMenClickOmniture(region) {
	omnitureReset();
	s=s_gi(s_account);
	s.eVar29 = region + ":store:men:viewallclothing";
	s.prop29 = region + ":store:men:viewallclothing";
	s.events="event57";
	s.tl();
}

function viewAllWomenClickOmniture(region) {
	omnitureReset();
	s=s_gi(s_account);
	s.eVar29 = region + ":store:women:viewallclothing";
	s.prop29 = region + ":store:women:viewallclothing";
	s.events="event57";
	s.tl();
}

function closeAndRefresh(){
	  window.parent.location.href=document.URL; // or opener.location.href = opener.location.href;
}

function setGGCDPOmnitureTag(){
	omnitureReset();
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="giftguide-category > cdp back button";
	s.eVar29="giftguide-category - cdp back button";
	s.tl(this,'o','CDP - CLP:back button');
}

jQuery('#vmeShortChkDiv').live('click', function(e) {
	e.preventDefault();
	s=s_gi(s_account);
	s.linkTrackVars="eVar29";
	s.eVar29="v-me:short-process";
	s.tl(this,'o','v-me:short-process');
});

jQuery('#vmeLongChkDiv').live('click', function(e) {
	e.preventDefault();
	s=s_gi(s_account);
	s.linkTrackVars="eVar29";
	s.eVar29="v-me:long-process";
	s.tl(this,'o','v-me:long-process');
});

/* NA-677 : Scripts */
jQuery('#guestCheckout').click(function() {
	document.location.href= "/checkout/spk/index.jsp?guestCheckout=true";
});

(function($){
	'use strict';
	
	// cache
	var _body		= $('body'),
		_signupBox	= $('.ma-box-checkout-signup'),
		_signupRows	= _signupBox.find('.ma-row');


	/**
	 * The first time you submit the form, actually shows the form instead...
	 * @param  {jQueryEvent} e Submit event jQueryfied
	 */
	_signupBox.one('submit','form', function(e){
		//first remove thw error place holder of sign-in page if in case user has selected that option before
		jQuery('#sign_errors').hide();
		// stop the submission
		e.preventDefault();
		// show the form
		_signupRows.show();
	});

})(jQuery);
/* NA-677 : Scripts */

//New omniture tagging

/* Home > My Account - Navigation - Start*/
//sign-in link
function omnUtilitySignIn(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29,events";
	s.linkTrackEvents="event7";
	s.prop29="my-account:global-navigation:signin";
	s.eVar29="my-account:global-navigation:signin";
	s.events="event7";
	s.tl(this,'o','my-account:global-navigation: signin');
}

//register link
jQuery('#registerLink').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29,events";
	s.linkTrackEvents="event24";
	s.prop29="my-account:global-navigation:register";
	s.eVar29="my-account:global-navigation:register";
	s.events="event24";
	s.tl(this,'o','my-account:global-navigation: register');
});

//track order link
jQuery('#trackOrderLink').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:global-navigation:trackorders";
	s.eVar29="my-account:global-navigation:trackorders";
	s.tl(this,'o','my-account:global-navigation: trackorders');
});
/* Home > My Account - Navigation - End*/

/* Login Page - Navigation - Start*/
//Sign-In - Button
jQuery('#signInButton').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29,events";
	s.linkTrackEvents="event7";
	s.prop29="my-account:login page:signin";
	s.eVar29="my-account:login page:signin";
	s.events="event7";
	s.tl(this,'o','my-account:login page:signin');
});

//Register - Button
jQuery('#createAccountButton').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:login page:createaccount";
	s.eVar29="my-account:login page:createaccount";
	s.tl(this,'o','my-account:login page:createaccount');
});

//Forgot password link
jQuery('#forgotPwdLink').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:login page:forgotpassword";
	s.eVar29="my-account:login page:forgotpassword";
	s.tl(this,'o','my-account:login page:forgotpassword');
});
/* Login Page - Navigation - End*/

/*Login Page - Checkout - Start*/
//Guest checkout button
jQuery('#guestCheckout').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:checkout:guestcheckout";
	s.eVar29="my-account:checkout:guestcheckout";
	s.tl(this,'o','my-account:checkout:guestcheckout');
});

//Sign-in button
jQuery('#checkoutLoginButton').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29,events";
	s.linkTrackEvents="event7";
	s.prop29="my-account:checkout:signin";
	s.eVar29="my-account:checkout:signin";
	s.events="event7";
	s.tl(this,'o','my-account:checkout:signin');
});

//Forgot password link
jQuery('#checkoutForgotPwdLink').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:checkout:forgotpassword";
	s.eVar29="my-account:checkout:forgotpassword";
	s.tl(this,'o','my-account:checkout:forgotpassword');
});

//Create Account button
jQuery('#checkoutCreateAcnBtn').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:checkout:createaccount";
	s.eVar29="my-account:checkout:createaccount";
	s.tl(this,'o','my-account:checkout:createaccount');
});
/*Login Page - Checkout - End*/

/* Login Page - Forgotten Password - Start */
//Reset Button
jQuery('#forgotPwdResetBtn').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:forgetten password:resetpassword";
	s.eVar29="my-account:forgotten password:resetpassword";
	s.tl(this,'o','my-account:forgotten password:resetpassword');
});
/* Login Page - Forgotten Password - End */

/* Login Page - Password Reset Inititated - Start */
//Return home button
jQuery('#returnHomeBtn').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:password reset initiated:returnhome";
	s.eVar29="my-account:password reset initiated:returnhome";
	s.tl(this,'o','my-account:password reset initiated:returnhome');
});
/* Login Page - Password Reset Inititated - End */

/* Login Page - Password Reset - Start */
jQuery('#reset').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="my-account:login page:password reset:savepassword";
	s.eVar29="my-account:login page:password reset:savepassword";
	s.tl(this,'o','my-account:login page:password reset:savepassword');
});

/* Login Page - Password Reset - End */


jQuery('#gg2014_backtogg_button').click(function(){
	s=s_gi(s_account);
	s.linkTrackVars="eVar29,prop29";
	s.prop29="giftguide-category > pdp back button";
	s.eVar29="giftguide-category - pdp back button";
	s.tl(this,'o','CPP - PDP:back button');
});





