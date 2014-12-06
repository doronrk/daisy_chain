(function(a){a.tiny=a.tiny||{};a.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:true,lockscroll:true,size:"auto",sizethumb:"auto",invertscroll:true}};a.fn.tinyscrollbar=function(d){var c=a.extend({},a.tiny.scrollbar.options,d);this.each(function(){a(this).data("tsb",new b(a(this),c))});return this};a.fn.tinyscrollbar_update=function(c){return a(this).data("tsb").update(c)};function b(q,g){var k=this,t=q,j={obj:a(".viewport",q)},h={obj:a(".overview",q)},d={obj:a(".scrollbar",q)},m={obj:a(".track",d.obj)},p={obj:a(".thumb",d.obj)},l=g.axis==="x",n=l?"left":"top",v=l?"Width":"Height",r=0,y={start:0,now:0},o={},e="ontouchstart" in document.documentElement;function c(){k.update();s();return k}this.update=function(z){j[g.axis]=j.obj[0]["offset"+v];h[g.axis]=h.obj[0]["scroll"+v];h.ratio=j[g.axis]/h[g.axis];d.obj.toggleClass("disable",h.ratio>=1);m[g.axis]=g.size==="auto"?j[g.axis]:g.size;p[g.axis]=Math.min(m[g.axis],Math.max(0,(g.sizethumb==="auto"?(m[g.axis]*h.ratio):g.sizethumb)));d.ratio=g.sizethumb==="auto"?(h[g.axis]/m[g.axis]):(h[g.axis]-j[g.axis])/(m[g.axis]-p[g.axis]);r=(z==="relative"&&h.ratio<=1)?Math.min((h[g.axis]-j[g.axis]),Math.max(0,r)):0;r=(z==="bottom"&&h.ratio<=1)?(h[g.axis]-j[g.axis]):isNaN(parseInt(z,10))?r:parseInt(z,10);w()};function w(){var z=v.toLowerCase();p.obj.css(n,r/d.ratio);h.obj.css(n,-r);o.start=p.obj.offset()[n];d.obj.css(z,m[g.axis]);m.obj.css(z,m[g.axis]);p.obj.css(z,p[g.axis])}function s(){if(!e){p.obj.bind("mousedown",i);m.obj.bind("mouseup",u)}else{j.obj[0].ontouchstart=function(z){if(1===z.touches.length){i(z.touches[0]);z.stopPropagation()}}}if(g.scroll&&window.addEventListener){t[0].addEventListener("DOMMouseScroll",x,false);t[0].addEventListener("mousewheel",x,false);t[0].addEventListener("MozMousePixelScroll",function(z){z.preventDefault()},false)}else{if(g.scroll){t[0].onmousewheel=x}}}function i(A){a("body").addClass("noSelect");var z=parseInt(p.obj.css(n),10);o.start=l?A.pageX:A.pageY;y.start=z=="auto"?0:z;if(!e){a(document).bind("mousemove",u);a(document).bind("mouseup",f);p.obj.bind("mouseup",f)}else{document.ontouchmove=function(B){B.preventDefault();u(B.touches[0])};document.ontouchend=f}}function x(B){if(h.ratio<1){var A=B||window.event,z=A.wheelDelta?A.wheelDelta/120:-A.detail/3;r-=z*g.wheel;r=Math.min((h[g.axis]-j[g.axis]),Math.max(0,r));p.obj.css(n,r/d.ratio);h.obj.css(n,-r);if(g.lockscroll||(r!==(h[g.axis]-j[g.axis])&&r!==0)){A=a.event.fix(A);A.preventDefault()}}}function u(z){if(h.ratio<1){if(g.invertscroll&&e){y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+(o.start-(l?z.pageX:z.pageY)))))}else{y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+((l?z.pageX:z.pageY)-o.start))))}r=y.now*d.ratio;h.obj.css(n,-r);p.obj.css(n,y.now)}}function f(){a("body").removeClass("noSelect");a(document).unbind("mousemove",u);a(document).unbind("mouseup",f);p.obj.unbind("mouseup",f);document.ontouchmove=document.ontouchend=null}return c()}}(jQuery));
(function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id)});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();$("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"absolute","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault();$('html, body').animate({scrollTop: $(modal_id).offset().top-50}, "400");})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);

var pdp = window.pdp || {};

pdp={
	objects:{
		pdpJsonObj : [], prodGroups:[], swatches:[], labels:[], currentItems:[], recentlyViewed:[], flyoutZoom : [], preloadImages:[], droplistArray :[], droplistArrayName :[], maxScroll:[], monogram:[],
	},
	alternates:{

	},
	options:{
		storeLocatorCmd:"COAStoreLocatorProductInventoryCmd",
		orderItemUpdateCmd : "OrderItemUpdate",
		InterestItemAddCmd : "InterestItemAdd",
		wishlistGetView : "WishlistGetView",
		recentlyViewedProductInfoView : "ProductShortDescriptionJSONView",
		GetBreadcrumbsInfoView : "GetBreadcrumbsInfoView",
		productBaseURL : "",
		SuccessView : "SuccessView",
		errorClass : "Err",
		errorTxtClass : "TxtErr",
		selectedClass : "selected",
		closeFullScreenElement : ".close-fullscreen, .fullscreen-back",
		pageId : "pdp_page",
		noTouch : false,
		isZooming: false,
		storePickup:false
	},
	images:{
		 mainImages:[], swatchImages:[], largeImages:[], xSells:[],
		// These Arbitrary 'test' values will be overwritten by PDP page from resource bundle which is store and langauge specific
		alternateImageStr : "?$pd_altsq$",
		mainimageStr : "?$pd_main$",
		recentlyViewedStr : "?$pd_recently$",
		crosssellsStr : "?$pd_suggest$",
		pd_bag : "?$pd_bag$",
		pdVertialStr :  "?$pd_vertical2$",
		pdHorizontalStr : "?$pd_horizontal$",
		pdFullStr : "?$pd_full$",
		pdSwatchStr: "_swatch?$pd_swatch$",
		fullPageCarousel:"?$pd_thumb$",
		clearPixel:"/wcsstore/Coach_US/images/Coach-Empty.gif",
		swatchesSuffix : "_swatch?$pd_swatch$",
		mImageTrigger : "",
		imageCounterFix : 0,
		mFixAImages : 0,
		mImageLength :""
	},
	canvas:{
		//WCS 7924
		preOrderTxt:"#preOrderTxt",
		//WCS 7924
		selectedSizeInventory: "#selectedSizeInventory",
		scrollbarId:"",

		pdpPickupCancel:"#pdpPickupCancel",
		pdpSearchAgain:"#pdpSearchAgain",
		pdpSavePick:"#pdpSavePick",
		pdpFetchStoresButon:"#pdpFetchStoresButon",
		pdpSavePickDisabled: "#pdpSavePickDisabled",


		pdpLeftColumn:"#pdp-left",
		pdpRightColumn:".prod_desc_container",
		monogramLink:"#monogramAction",
		instorePickupDesc:"#inStoreTxt",
		instorePickupLink:"#storePickupAccordion a",
		brandingSection : "#branding2, #topNavContainer",
		onlineExclusiveDiv: "#onlineExclusiveDiv",
		alternateImagesContents: "#alternateImagesContents",
		fullScreenCarouselContent: "#full-carousel-content",
		sizeChartContent : "#sizeChartContent",
		fullScreenMainImage : "#fullScreenMainImage",
		mainImagesContentsDiv : "#mainImagesContentsDiv",
		selectedQuantityElem : "#selectedQuantity .selected",
		selectedSizeElem : "#selectSize .selected",
		selectedInstoreSizeElem : "#selectInstoreSize .selected",
		selectedInstoreStateElem: "#instorePickupState .selected",
		quantityElem:"#selectedQuantity",
		inStorePickupRange:"#instorePickupDistance",
		inStorePickupState:"#instorePickupState",
		inStorePickupSize:"#selectInstoreSize",
		sizeElem:"#selectSize",
		monogramText: "#monogramText",
		popupCloseButton: ".popupClose",
		fullPageContentTrigger:".fullPageContent",
		fullScreenViewDiv:"#full-screen-view",
		overlayCloseDiv:"#lean_overlay",
		hideOnFullScreen:"#branding2, #topNavContainer, #supplementary, #nav",
		pdpColorSwatches:".div-productcolor-class"
	},
	constants:{
		maxRecentlyViewedCount : 3,
		inStorePickupTxt:"",
		inStorePickupScrollTxtHeader: "",
		inStorePickupScrollTxtBody: "",
		zoomText:"TAP AND HOLD TO ZOOM",
		storeId:"",
		catalogId:"",
		langId:"",
		zoomFactor:3.3,
		showFullPageTriggerItem: null
	},	
	messages:{
		inventoryInStock:'',
		inventoryOutOfStock : '',
		inventoryPreOrder : '',
		inventoryWSP : '',
		willship : '',
		breadcrumbNext : '',
		breadcrumbPrevious : '',
		salePriceText:'SALE',
		searchResults:'Search results for',
		piInterest:''		
	},		
	errors:{
		sizeSelectErr:{
			errElement:"#selectSize",
			errTxtElement:"#selectSizeErr",
			errTxt: "SELECT SIZE"
		},		
		inStorePickupEmptyZipOrStateErr:{
			errElement:"#instorePickupZipcode, #instorePickupState",
			errTxtElement:"#inStorePickupZipStateErr",
			errTxt:"SELECT ZIP CODE OR STATE"
		},
		inStorePickupInvalidZipErr:{
			errElement:"#instorePickupZipcode",
			errTxtElement:"#inStorePickupZipErr",
			errTxt:"Please enter a valid zipcode"
		},
		inStorePickupSelectStoreErr:{
			errElement:"#instorepickup-form-content",
			errTxtElement:"#instorepickup-form-Error",
			errTxt:"Please select a store to pickiup"
		},
		selectEBColorErr:{
			errElement:"#embossingColorContent",
			errTxtElement:"#embossingColorContentErr",
			errTxt:"Please select a embossing style"
		},
		selectHTColorErr:{
			errElement:"#handtagColorContent",
			errTxtElement:"#handtagColorContentErr",
			errTxt:"Please select a hangtag color"
		},
		enterEBTextErr:{
			errElement:"#monogramTextField",
			errTxtElement:"#monogramTextFieldErr",
			errTxt:"",
			errPreTxt:"#monogramPreText",
		},
		instorePickupsizeSelectErr:{
			errElement:"#selectInstoreSize",
			errTxtElement:"#selectInstoreSizeErr",
			errTxt:"Please select a store to pickiup"
		},
		editMonogramErr:{
			//errElement:"#monoButton",
			errTxtElement:"#monoButtonErr",
			errTxt:"Your monogram has been removed. Click ADD A MONOGRAM to make a selection."		
		}	
	},
	carousel:{
		carouselContainer:"carousel-container",carouselItems : 6, leftItem : 0, rightItem : 5, itemWidth : 100, currentOffset : 0, carouselLeft : "#carousel-left", carouselRight : "#carousel-right"
	},
	browser:{
		maxContainerWidth : 1132,
		docWidth: 1132,
		winWidth: 1132,
		docHeight: null,
		winHeight : null,
		leftColHeight: null,
		rightColHeight: null,
		mainImageMinHeight: null,
		fullPageOpenHeight:null,
		fullPageCloseHeight:null
	},
	functions:{
	
		closeInstorePickup: function ()
		{
			$(pdp.canvas.overlayCloseDiv).click();
		},
		displaySizeMap: function ()
		{
			$(pdp.canvas.sizeChartContent).show();
		},
		processWriteReview: function ()
		{
			processWriteReviewClickInGWT(productJSONObject.styleId, productJSONObject.selectedColorId,
			productJSONObject.selectedColorname,productJSONObject.selectedProductColorString);
		},
		 preload:function(arrayOfImages) {
		    $(arrayOfImages).each(function(){
		        $('<img/>')[0].src = this;
		        // Alternatively you could use:
		        // (new Image()).src = this;
		    });
		},
		buildAccordion:function(accordionSelector, toggleFirst){	
		  $(accordionSelector+" .pdContent").hide();
		  $(accordionSelector+" .pdHeading:first").toggleClass("pdExpanded").children(".expMe");
		  if (toggleFirst)
		  		$(accordionSelector+" .pdHeading").next(accordionSelector+" .pdContent:first").slideToggle('300');
		  //toggle the componenet with class msg_body
			$(accordionSelector+" .pdHeading").on("click",function(){
				//console.log("fired from "+accordionSelector);
				$(this).siblings().removeClass('pdExpanded');
			  	$(accordionSelector+" .pdContent").slideUp('300');
				if($(this).hasClass('pdExpanded')){
					//$(".expMe").html('+');
					//$(this).children(".expMe").html('+');
					$(this).toggleClass("pdExpanded");
					
				}
				else{
					//$(".expMe").html('+');
					//$(this).children(".expMe").html('-');
					$(this).next(accordionSelector+" .pdContent").slideToggle('300');
					$(this).toggleClass("pdExpanded");
					pdp.functions.omnitureTracker(this);
					
				}   
				
				setTimeout("pdp.functions.resetSizesTimeout()",500)
			})
		},
		setupSwatchHoverEffects:function(thumbImageContainer){
			if(pdp.options.noTouch){
				if(thumbImageContainer.length>0){
					$(thumbImageContainer).on({
						"mouseleave":function(){
							$(this).siblings().find("img").removeClass("dimmedImages");
						},
						"mouseenter":function(){
							$(this).siblings().find("img").addClass("dimmedImages");
							//console.log($(this).css("opacity"));
						}
					})
				}else{
					//console.log("nothing to do in setupSwatchHoverEffects...")
				}
			}
		},
		changeCommonSelectedSwatches:function(swatchId){
			$("#pdpSwatchSelectColor,#fullscreenSwatchWrapper, #instoreSwatchImgContainer").find("img").removeClass("selected");
			$("#fullscreenColorselectDiv_"+swatchId+" img").addClass("selected");
			$("#colorselectDiv_"+swatchId+" img").addClass("selected");
			$("#instoreColorselectDiv_"+swatchId+" img").addClass("selected");
			//console.log("changeCommonSelectedSwatches fired - id: "+swatchId);
		},
		showHideCarouselButtons:function(numItems){
			pdp.carousel.currentOffset = parseInt($("#"+pdp.carousel.carouselContainer).css("margin-left"));
			if(pdp.carousel.currentOffset==0){
				$(pdp.carousel.carouselLeft).hide();
			} else{
				if(pdp.carousel.currentOffset<0){
					$(pdp.carousel.carouselLeft).show();
				}else{
					$(pdp.carousel.carouselLeft).hide();
				}
			}
			if((pdp.carousel.currentOffset<=0)&& (numItems*pdp.carousel.itemWidth + pdp.carousel.currentOffset)>pdp.carousel.carouselItems*pdp.carousel.itemWidth){
				$(pdp.carousel.carouselRight).show();
			}
			else{
				$(pdp.carousel.carouselRight).hide();
			}
			//pdp.functions.setupFullScreenCarousel(numItems);
		},
		setupFullScreenCarousel:function(numItems){
			pdp.carousel.currentOffset = parseInt($("#"+pdp.carousel.carouselContainer).css("margin-left"));
			if(pdp.options.noTouch){
				$("#"+pdp.carousel.carouselContainer+" li img").on({
				   mouseleave:function(){
				     $(this).parent().siblings().css({"opacity":"1.00"});
				   },
				   mouseover:function(){ 
				     //console.log($(this).parent());
				     $(this).parent().css({"opacity":"1.00"});
				     $(this).parent().siblings().css({"opacity":"0.70"});
				   }
				 });
			}
			if(numItems==1) $("#"+pdp.carousel.carouselContainer+" li img").addClass("selected");

			var carouselLeft = (pdp.browser.docWidth-(pdp.carousel.carouselItems*pdp.carousel.itemWidth)+numItems*6)/2;			
			var selectedItemIndex = parseInt($("#"+pdp.carousel.carouselContainer+" img.selected").parent("li").attr("id"));
			var currentLeftMargin = parseInt($("#"+pdp.carousel.carouselContainer).css("margin-left"));
			if (numItems>pdp.carousel.carouselItems){
				//console.log("Carousel Required: setup Carousel.");
				if(selectedItemIndex>=pdp.carousel.carouselItems){
					pdp.carousel.currentOffset=(pdp.carousel.carouselItems-selectedItemIndex)*pdp.carousel.itemWidth;
				}else{ 
					pdp.carousel.currentOffset=0;
				}
				$("#"+pdp.carousel.carouselContainer).css({ //the UL
					"width"	: (pdp.carousel.itemWidth*numItems+numItems*6)+"px"
				});

				if ($(pdp.carousel.carouselRight).length==0){
					$(pdp.canvas.fullScreenCarouselContent).append("<div id='carousel-right' /><div id='carousel-left' />").wrap("<div id='carousel-holder' />");
				} else {
					//reset positions for less than carouselItems specified
				}
			
				$(pdp.carousel.carouselLeft).css({"left": (carouselLeft)-55+"px"}).on("click",function(){ //animate to left, hide 1st item, 
					if(pdp.carousel.currentOffset<0){
						$("#"+pdp.carousel.carouselContainer).animate({
							"margin-left": pdp.carousel.currentOffset+ pdp.carousel.itemWidth+6+"px"
						},function(){
							pdp.functions.showHideCarouselButtons(numItems);
						})
					}
				});
				$(pdp.carousel.carouselRight).on("click",function(){
					if((pdp.carousel.currentOffset<=0)&& (numItems*pdp.carousel.itemWidth + pdp.carousel.currentOffset)>pdp.carousel.carouselItems*pdp.carousel.itemWidth){
						$("#"+pdp.carousel.carouselContainer).animate({
							"margin-left": pdp.carousel.currentOffset - pdp.carousel.itemWidth-6+"px"
						}, function(){
							pdp.functions.showHideCarouselButtons(numItems);
						});
						//console.log("inside Carousel Right button Click handler");
					}
				});
				if((selectedItemIndex>=pdp.carousel.carouselItems)&&(currentLeftMargin)>=((pdp.carousel.carouselItems-selectedItemIndex)*pdp.carousel.itemWidth)){
					$("#"+pdp.carousel.carouselContainer).animate({
						"margin-left":  (pdp.carousel.carouselItems-selectedItemIndex-1)*pdp.carousel.itemWidth+6+"px"
					},function(){
						pdp.functions.showHideCarouselButtons(numItems);
					})
				} else{
					pdp.functions.showHideCarouselButtons(numItems);
				}
			}
		},
		setupFullScreenCarouselClicks:function(swatchObject){
			$(pdp.canvas.fullScreenCarouselContent+ " img").on("click touchstart",function() {
				//console.log("clicker active");
			  $(this).parent().siblings().find('img').removeClass("selected");
			  $(this).addClass("selected");
			  pdp.functions.reloadFullscreenMainImage(swatchObject,   pdp.functions.getIndexFromImageName( $(this).attr('src')) );
			});
		},
		addMonoLayout:function(mnobject) {
      			if(mnobject=== undefined){
			      	$('#handtagColor').hide();
					$('#embossingColor').removeAttr('id').attr('id','embossingColorWallet');
				}
		},
		updateSelectedMonogramAttribute: function (){
			
			$("#handtagColor #handtagColorContent .monogramHTColorClass img").removeClass("selected");
			$("#mnHTColorImg_" + productJSONObject.selectHTColor).addClass("selected");

			$("#embossingColorContent .monogramEBColorClass img").removeClass("selected"); //	$("#embossingColor #embossingColorContent .monogramEBColorClass img").removeClass("selected");
			$("#mnEBColorImg_" + productJSONObject.selectEBColor  ).addClass("selected");
		 	
		 },
		removeMonogram:function (){
			//Omniture Tracker
			pdp.functions.omnitureTracker('pdpRemoveMonogram');

			pdp.functions.removeErrorMessageToCustomer(pdp.errors.editMonogramErr, false);	
			productJSONObject.savedHTColor = null;
			productJSONObject.savedEBColor = null;
			productJSONObject.savedMonogramText = null;
			productJSONObject.selectHTColor = null;
			productJSONObject.selectEBColor = null;
			productJSONObject.savedFontSize = null;
			productJSONObject.selectFontSize = null;
			productJSONObject.savedCatentryId = null;
			productJSONObject.selectedCatentryId = null;
			
			$('#monogramAction').html(pdp.objects.monogram.addMonogram);
			//$(".monogramArrow").removeClass("hiddenItem");
			$("#pdp_monogram #popupHeader p").html(pdp.objects.monogram.addMonogram);
			$('#monogramTextField').val("");
			$('#monogramText').hide();
			$('#monogramRemoveAction').hide();
			pdp.functions.closePopup();

			pdp.functions.showOrHideInstorePickupOptions(pdp.functions.getSwatchObject(productJSONObject.selectedColorId),null);
		},
		setupLabel:function () {
		    if ($('.label_radio input').length) {
		        $('.label_radio').each(function() {
		            $(this).removeClass('r_on');
		        });
		        $('.label_radio input:checked').each(function() {
		            $(this).parent('label').addClass('r_on');
		            $(pdp.canvas.pdpSavePick).css("display","inline-block");
		            $(pdp.canvas.pdpSavePickDisabled).hide();
		        });
		    }
		},
		runWishListEffect : function () {
			thisTimer = setTimeout(function() {
						if(!insidePopup) {
							$("#add-to-wishlist-overlay").dialog("close");
						}
						clearTimeout(thisTimer);
					}, 2000);
		},
		showWishlist : function (wishlistURL)
		{
			window.location.href = pdp.functions.getBasePageURL() + wishlistURL;
		},
		closeWishlist : function ()
		{
			$( "#add-to-wishlist-overlay" ).dialog("close");
		},
		getSizeObject:function (swatchObject,catentryId){
			for (var sizesItr = 0 ;  sizesItr < swatchObject.sizes.length ; sizesItr++ ){
				if ( swatchObject.sizes[sizesItr].catEntryId == catentryId	){
					return swatchObject.sizes[sizesItr];			
				}
			}
		
			return null;
		},
		processAddItemToWishlist: function() {
			if ($('#wishlistButton').hasClass('pdpLightDisableButton')) return;
			if ( ! pdp.functions.validateItemInfo())
				return true;
			//WCS 7330
			if (!pdp.functions.isSizeAvailableToBuy(productJSONObject.sizeObject))
				return false;			
			processAddWishListClick(productJSONObject.selectedSizeId,productJSONObject.selectedColorId,
				productJSONObject.selectedColorCode, productJSONObject.selectedProductColorString ,productJSONObject.selectedSize);
		},
		removeErrorMessageToCustomer : function (inputObject,removeAllErrors){
			if (!removeAllErrors){
				if ($(inputObject.errElement))
					$(inputObject.errElement).removeClass(pdp.options.errorClass);
				if ($(inputObject.errTxtElement))
				{
					$(inputObject.errTxtElement).removeClass(pdp.options.errorTxtClass);
					$(inputObject.errTxtElement).hide();
					$(inputObject.errTxtElement).html('');
				}
				if ($(inputObject.errPreTxt)){$(inputObject.errPreTxt).show(); }
			} else{
				for (var i in pdp.errors){
					$(pdp.errors[i].errElement).removeClass(pdp.options.errorClass);
					$(pdp.errors[i].errTxtElement).removeClass(pdp.options.errorTxtClass).hide().html('');
				}
			}
		},
		getImageURL: function (swatchObject, suffix1, imageType){
			var imageURL =  pdp.functions.getSecene7BaseURL(); 

			imageURL = imageURL + productJSONObject.style.toLowerCase() + suffix1 +   imageType  ;
			return imageURL;
		},
		monogramTextKeyDown : function (textFieldObject,event){
		 
				if (   ! isCharacterEntered(event) ){
					return false;
				}
			
		},	
		monogramTextKeyUp : function (textFieldObject,event){
			textFieldObject.value = textFieldObject.value.toUpperCase();
			//textFieldObject.value = textFieldObject.value.replace(/[^A-Z0-9]/g, '') ;
			if ( textFieldObject.value != '' )
			{
				pdp.functions.removeErrorMessageToCustomer(pdp.errors.enterEBTextErr, false);
			}
		},
		selectInstoreInventorySize:function ( catentryId ){
			var swatchObject = productJSONObject.instoreColorObject ;
			var sizeObject = null;
			for (var sizesItr = 0 ;  sizesItr < swatchObject.sizes.length ; sizesItr++ )
			{
				if ( swatchObject.sizes[sizesItr].catEntryId == catentryId	)
				{
					sizeObject = swatchObject.sizes[sizesItr];
					break;
				}
			}
			productJSONObject.instoreSizeId = catentryId;
			productJSONObject.instoreSizeName = sizeObject.size;
			$("#instoreSelectedSizeInventory").html(pdp.functions.getInventoryStatus(sizeObject));
		},		
		getInstorePickupJSON:function (addressId){


			if ( productJSONObject.instorePickupJSON  == null ) return null;

			/*if ( productJSONObject.instorePickupJSON.addresses[addressId].addressId == addressId )*/
			else
			{
				return productJSONObject.instorePickupJSON.addresses[addressId];
				alert(productJSONObject.instorePickupJSON.addresses[addressId]);
			}

			//return null;
		},
		getMonogramFoilImage : function (monogramGroup,foilColor){
			if (pdp.functions.isMonogramHasHandTag(monogramGroup)){
				var htColor = "";
				if ( productJSONObject.selectHTColor != null ){
					htColor = productJSONObject.selectHTColor;
				} else {
					htColor =  pdp.functions.getDefaultHanttagObject(monogramGroup).color;
				}
				var foilImagePath = pdp.functions.getSecene7BaseURL() + foilColorcodeImagePath;
				foilImagePath = replaceStringPattern(foilImagePath,0,htColor.replace(/\\/g, '').toLowerCase());
				foilImagePath = replaceStringPattern(foilImagePath,1,monogramGroup.mnHandtagType.replace(/ /g, '').toLowerCase());
				foilImagePath = replaceStringPattern(foilImagePath,2,foilColor.replace(/\\/g, '').toLowerCase());
				return foilImagePath;
			} else {
				var foilImagePath = pdp.functions.getSecene7BaseURL() + embossingColorImagePath;		        	
		    	foilImagePath = replaceStringPattern(foilImagePath,0,productJSONObject.styleForImages+'_'+productJSONObject.selectedProductColorString+embossing_img_suffix);
		    	foilImagePath = replaceStringPattern(foilImagePath,1,embossing_img_prefix+foilColor.replace(/\\/g, '').toLowerCase());
		    	//foilImagePath = replaceStringPattern(foilImagePath,2,foilColor.replace(/\\/g, '').toLowerCase());            	
		    	return foilImagePath;
			}
		},
		getBasePageURL:function(){
			var baseURL = location.href;
			var productBaseURL = baseURL.split("Product-")[0];		
			pdp.options.productBaseURL = productBaseURL;	
			return productBaseURL;
		},
		isPageSecure:function (){
			if ( location.protocol == 'http:')
				return false;
			else
				return true;
		},
		getSecene7BaseURL: function (){
			if (pdp.functions.isPageSecure()){
				return scene7SecureBasePath;
			}else{
				return scene7NonSecureBasePath;
			}
		},
		closePopup:function (){
			$(pdp.canvas.overlayCloseDiv).click();
		},
		prepopulateAllImages:function (){
			if ( productJSONObject.swatchGroup.swatches.length ){
		 		for ( var swatchesItr = 0 ; swatchesItr < productJSONObject.swatchGroup.swatches.length ; swatchesItr++){
					pdp.functions.prepopulateSwatchImages(productJSONObject.swatchGroup.swatches[swatchesItr]);
				}
			}
		},
		/*setupSelectedClasses:function(parentElement){
		    $(parentElement).on("click",function() {
		        pdp.functions.selectColor ( this.id );
		        $(this).find("img").addClass(pdp.options.selectedClass);
		        $(this).siblings().find("img").removeClass(pdp.options.selectedClass);
		    });
		},*/
		reloadFullscreenMainImage: function (swatchObject,swatchIndex)
		{
			//$("html, body").animate({ scrollTop: 0 }, "fast");
			$(pdp.canvas.fullScreenMainImage).html("");
			$(pdp.canvas.fullScreenMainImage).html("<img id='fullscreenMainImages_" + swatchIndex + "' width='100%' src='" + pdp.functions.getImageURL(swatchObject,swatchIndex,pdp.images.pdFullStr) + "' />");	
			$(".prod_img_container").css({"visibility":"visible","opacity":"100"});
		},
		getOneSizeFromSwatch:function (productSwatch){
			if ( productSwatch.sizes != null && productSwatch.sizes.length > 0 ){
				if ((productSwatch.sizes[0].size=="ONESIZE")||(productSwatch.sizes.length == 1)){
					return productSwatch.sizes[0];
				}
			}
			return null;
		},
		resetSizes:function(){
			pdp.browser.docWidth= $(document).width();
			pdp.browser.winWidth= $(window).width();
			pdp.browser.docHeight= $(document).height();
			pdp.browser.winHeight= $(window).height();

			pdp.browser.rightColHeight = $(pdp.canvas.pdpRightColumn).outerHeight();
			pdp.browser.mainImageMinHeight=$(pdp.canvas.mainImagesContentsDiv).find("img").height();
			
			if(pdp.objects.currentItems.fullPageActive!==true){
				//$("#wrapper").height($(".prod_desc_container").height()+$("#pdp-top").height());
				//$("#alternateImageHolder").height()+$(".prod_img_container").height()+$("#supplementary").height()+$("#topNavContainer").height();
				if (pdp.browser.leftColHeight != $("#alternateImagesContents").height()+$(".prod_img_container").height()+$("#pdp-top").height())
					pdp.browser.leftColHeight = $("#alternateImagesContents").outerHeight()+$(".prod_img_container").outerHeight()+$("#pdp-top").outerHeight(); //2 is to enable bottom border $(pdp.canvas.pdpLeftColumn).height();
				if (pdp.browser.leftColHeight>pdp.browser.rightColHeight){
					/*$(pdp.canvas.pdpRightColumn).css("padding-bottom",(pdp.browser.leftColHeight-pdp.browser.rightColHeight)+"px");Avoid extra pdding for BG Change*/
					$("#wrapper_container").height(4+$("#alternateImagesContents").outerHeight()+$(".prod_img_container").outerHeight()+$("#pdp-top").outerHeight());
					pdp.browser.fullPageCloseHeight = $("#wrapper_container").outerHeight();
				} else {
					$(pdp.canvas.pdpRightColumn).css("padding-bottom","7px"); //7px is required to avoid cutting off
					$("#wrapper_container").height($(".prod_desc_container").outerHeight()+$("#pdp-top").outerHeight());
					pdp.browser.fullPageCloseHeight = $("#wrapper_container").outerHeight();
				}
			}
			//calculate zoom factor to match different sized zoom area to the zoom displayed
			if(pdp.browser.winWidth<=1024 && pdp.browser.winWidth>768) pdp.constants.zoomFactor=4;
			if(pdp.browser.winWidth<=768) pdp.constants.zoomFactor=5.95;
			if(pdp.browser.winWidth>1024) pdp.constants.zoomFactor=3.3;

			if(pdp.browser.winWidth>=980){ //ipad Orientation without META tags
				pdp.browser.leftColWidth=pdp.browser.docWidth - (pdp.browser.docWidth/100*3)-(496);
			}
			else{
				pdp.browser.leftColWidth=pdp.browser.docWidth -(412);
				//$("#pdp-left").css({"margin-right":"412px"});
			}
			
			if (pdp.objects.flyoutZoom.enabled){
				pdp.objects.flyoutZoom.setEnabled(false);
				$(pdp.canvas.mainImagesContentsDiv+" div").remove();
				pdp.objects.flyoutZoom=null;
			} 

			if (pdp.options.noTouch!==false){
				//reset Flyout Zoom on Device orientation change:
				if((typeof(Modernizr)!=="undefined")&&Modernizr.mq('only screen and (min-device-width : 760px) and (max-device-width : 1024px) and (orientation : portrait)')){
					var pdpLeftColumn =pdp.browser.winWidth-(412+24);
					pdp.constants.zoomFactor=3.3;
					/*$(".prod_img_container, .prod_secondary_container").animate({"width":pdp.browser.leftColWidth+"px"});
					$(".a-image, .m-image").animate({"width":(pdp.browser.leftColWidth/2)+"px"});*/
				    //alert('portrait');//works - but only parses on initial load not on orientation change.
				}
				else if((typeof(Modernizr)!=="undefined")&&Modernizr.mq('only screen and (min-device-width : 760px) and (max-device-width : 1024px) and (orientation : landscape)')){
					/*$(".prod_img_container, .prod_secondary_container, .c-image, .n-image").animate({"width":pdp.browser.leftColWidth+"px"});
					$(".a-image, .m-image").animate({"width":(pdp.browser.leftColWidth/2)+"px"});
				    */
				    //alert('landscape'); //works - but only parses on initial load not on orientation change.
				}

			}
			//$(".prod_img_container").css({"visibility":"visible","opacity":"100"});
			$("#pdp-left .pdpMainImage, .prod_secondary_container img").css({"visibility":"visible"}).animate({"opacity":"100"});		
		},
		showErrorMessageToCustomer: function (inputObject)
		{
			
			if ( $(inputObject.errElement)) 
				$(inputObject.errElement).addClass(pdp.options.errorClass);
			if ( $(inputObject.errTxtElement) ){
				$(inputObject.errTxtElement).html(inputObject.errTxt);
				$(inputObject.errTxtElement).show();
				$(inputObject.errTxtElement).addClass(pdp.options.errorTxtClass);
			}
			//if (inputObject.errElement == "#monogramTextField"){console.log("MAY THE FORCE BE WITH YOU")}
			if ($(inputObject.errPreTxt)){$(inputObject.errPreTxt).hide(); }
		},
		closeFullScreen:function(){ 
			pdp.objects.currentItems.fullPageActive=false;
			$("#wrapper_container").height(pdp.browser.fullPageCloseHeight);
			if(pdp.objects.currentItems.fullPageActive!==true) pdp.functions.resetSizesTimeout();
			//pdp.functions.resetSizes();
			$( pdp.canvas.fullScreenViewDiv ).fadeOut("fast").css({"z-index":-1,"visibility":"hidden"});
		   	$(pdp.canvas.hideOnFullScreen).show();
		   	$("#wrapper").css("overflow","visible");
		   	$("#fulldivider").hide();
		},
		showClickToZoom:function(){
			if($("#zoomText").length==0) $(pdp.canvas.mainImagesContentsDiv).append("<div id='zoomText'>  </div>");
			if((pdp.objects.flyoutZoom.isEnabled===undefined)&&("undefined"===(typeof pdp.objects.flyoutZoom.isEnabled)))
					$("#zoomText").animate({"opacity":"0.80"});
			else
				if(true!=pdp.objects.flyoutZoom.isEnabled()){
					$("#zoomText").animate({"opacity":"0.80"});
				}
		},
		touchClickToZoom:function(){
			if($("#zoomTouch").length==0) $(pdp.canvas.mainImagesContentsDiv).append("<div id='zoomTouch'>"+pdp.constants.zoomText+"</div>");
			$("#zoomTouch").animate({"opacity":"0.50"});
			setTimeout("$('#zoomTouch').animate({'opacity':'0'});",1230);
		},
		hideClickToZoom:function(){
			if($("#zoomText").length){				
				$(pdp.canvas.mainImagesContentsDiv+" #zoomText")
					.animate({"opacity":"0.00"},100,function(){
						$(this).remove();
					})
			}
		},
		/*WCS-4114*/
		sizeChartToggle: function(){
				$(".sizeChartDetails").hide();
				$('#header_measure').toggle(
				function(){
				$(".sizeChartDetails").slideDown();
				$('#header_measure span').addClass("chartMax");
				},
				function(){
				$(".sizeChartDetails").slideUp();
				$('#header_measure span').removeClass("chartMax");
		}	
		);
		},
		setupFullScreenView:function(){
			$(pdp.canvas.fullScreenViewDiv).css({"z-index":-1});
			$(pdp.canvas.fullPageContentTrigger).on("click",function(e){
				//Omniture Tracker
				pdp.functions.omnitureTracker('pdpViewFullScreen');
				var imageSource = pdp.functions.getIndexFromImageName( $(pdp.canvas.mainImagesContentsDiv+ ' img').attr('src')) ;
				pdp.functions.reloadFullscreenMainImage(pdp.objects.swatches, imageSource );
				pdp.functions.viewFullScreen(imageSource);
				//pdp.functions.changeCommonSelectedSwatches(pdp.objects.swatches.colorProductId);
			   	//console.log('clicked - fullpage link');
			});
			$(pdp.options.closeFullScreenElement).on("click",function(e){
				//e.preventDefault();
			   	//console.log('clicked - fullpage link');
			   	pdp.functions.closeFullScreen();
			   	pdp.objects.currentItems.fullPageActive = false;
			});
		},
		setupSelectedImageItem:function(triggerImageSrc, targetImageDivPrefix, targetImageDivHolder){
			$(targetImageDivHolder+" img").removeClass("selected").on({
				click:function(){
					pdp.functions.setupFullScreenCarouselClicks(pdp.objects.swatchObject);
				}
			});
			$("#"+targetImageDivPrefix+pdp.functions.getIndexFromImageName(triggerImageSrc,pdp.images.fullPageCarousel)).addClass("selected");
		},
		viewFullScreen:function(imageSource){
			pdp.objects.currentItems.fullPageActive = true;
		   	//console.log("viewFullScreen image source: "+imageSource);
		   	$(pdp.canvas.hideOnFullScreen).hide();
		   	if($("#fulldivider").length == 0){$("#full-size-nav").append("<div id='fulldivider'></div>");}
		   	else{$("#fulldivider").show();}
			
			//$("html, body").animate({ scrollTop: 0 }, "fast");
			$(pdp.canvas.fullScreenViewDiv).fadeIn("fast").css({"z-index":1098,"visibility":"visible"});
			$(".static_wrapper").css({"margin":"0"});/*BG Change*/
		 	pdp.functions.setupSelectedImageItem(imageSource, "fullscreenAlternateImages", pdp.canvas.fullScreenCarouselContent);
			//console.log('viewFullScreen called...'+pdp.objects.swatches.aImages.length);
			pdp.functions.setupFullScreenCarousel(pdp.objects.currentItems.currentCarouselItems);
			pdp.functions.setupSwatchHoverEffects("#fullscreenSwatchWrapper .swatchImgContainer>div");
			//pdp.functions.changeCommonSelectedSwatches(pdp.objects.swatches.colorProductId);
			pdp.browser.fullPageOpenHeight=$(window).width();
			$("#wrapper_container").height($(document).width()+140); //#fullScreenMainImage margin-top = 115
			$("#wrapper").css("overflow","hidden");
			var scrollToThis = $(window).width()-$(window).height() + parseInt($("#fullScreenMainImage").css("padding-top"));
			$("html, body").animate({ scrollTop: scrollToThis }, 800);
		},
		validateItemInfo:function (){
			if ( productJSONObject.selectedSizeId == null){
				pdp.functions.showErrorMessageToCustomer(pdp.errors.sizeSelectErr);
				return false;
			}
			return true;
		},
		addFlyout:function (id) {
			pdp.functions.hideClickToZoom();
			if($(window).scrollTop()>$(pdp.canvas.mainImagesContentsDiv).offset().top){ 
				// scrolls to top of Main Image only when user has scrolled more than the main image height
				$('html, body').animate({scrollTop: $(pdp.canvas.mainImagesContentsDiv).offset().top}, "400");
			}
			//if("ontouchstart" in document.documentElement) {
				//if ($("#"+id).length > 0) {
					//console.log(id);
					pdp.objects.flyoutZoom = new s7js.flyout.AdvancedFlyout();
					//var originalHtml = ($("#"+id+">img").attr("src"));
					pdp.objects.flyoutZoom.setParameter("zoomFactor", pdp.constants.zoomFactor);
					pdp.objects.flyoutZoom.setTargetId(id);
					var url = pdp.objects.flyoutZoom.zoomUrl || pdp.functions.getImageURL(pdp.objects.swatches,   pdp.functions.getIndexFromImageName( $(pdp.canvas.mainImagesContentsDiv+ ' img').attr('src')),pdp.images.pdFullStr ).split('?')[0];
					pdp.objects.flyoutZoom.createStaticImage();
					
					//$("body").find("#"+id).each(function () {
						pdp.objects.flyoutZoom.staticImageContainer = $(pdp.canvas.mainImagesContentsDiv)[0];//$("#"+id); //$(this)[0];
						url =  pdp.objects.flyoutZoom.zoomUrl || pdp.functions.getImageURL(pdp.objects.swatches,   pdp.functions.getIndexFromImageName( $(pdp.canvas.mainImagesContentsDiv+ ' img').attr('src')),pdp.images.pdFullStr ).split('?')[0];//"http://s7d2.scene7.com/is/image/Coach/70600_b4fn_a0";
						////$(this).find("img").attr("src").split('?')[0];
						if(null != url && "" != url) {
							//Omniture Tracker
							pdp.functions.omnitureTracker('pdpFlyoutZoom');
							pdp.objects.flyoutZoom.createFlyoutView();
							pdp.objects.flyoutZoom.createFlyoutFrame();
							pdp.objects.flyoutZoom.flyoutView.setImageUrl(url);
						}
						if (pdp.options.noTouch){
							$(".s7flyoutCursorDesktop").on({
								mousedown:function(e){
									e.stopPropagation();
									pdp.options.isZooming = true;
									var imageSource = pdp.functions.getIndexFromImageName($(pdp.canvas.mainImagesContentsDiv +" .pdpMainImage").attr('src'));
									pdp.functions.reloadFullscreenMainImage(pdp.objects.swatches, imageSource);
									//pdp.functions.setupFullScreenCarousel($(pdp.canvas.fullScreenCarouselContent+' li').length);
									pdp.functions.viewFullScreen(imageSource);
								}
							});
							$(pdp.canvas.mainImagesContentsDiv).on('mouseenter', function(event) {
								//pdp.objects.flyoutZoom.flyoutView.setImageUrl(url);
								if(null != url && "" != url) {
									pdp.objects.flyoutZoom.flyoutView.setImageUrl(url);
									//pdp.objects.flyoutZoom.init();
								}
							});
						} else {							
							$(pdp.canvas.mainImagesContentsDiv).on({
								'touchstart': function(event) {
									//pdp.objects.flyoutZoom.flyoutView.setImageUrl(url);
									pdp.objects.flyoutZoom.enabled=true;		
									pdp.objects.flyoutZoom.setEnabled(true);
									if(null != url && "" != url) {
										pdp.objects.flyoutZoom.flyoutView.setImageUrl(url);
										//pdp.objects.flyoutZoom.init();
									}
								}
							});

							/**/
						}
						pdp.objects.flyoutZoom.onFlyoutEnd = function() {
							pdp.objects.flyoutZoom.enabled=false;		
							pdp.objects.flyoutZoom.setEnabled(false);
							setTimeout("$(pdp.canvas.mainImagesContentsDiv).html($(pdp.canvas.mainImagesContentsDiv+'>img'))", 350);
							//pdp.objects.flyoutZoom.init();
						}
					//}); //.each of the IDs - not really required for this PDP
				//}
			//}
		}, //end flyout zoom
		contentScroll: function(dropDownElement){
	
						    	var bodyDrop="";

						    	for (i=0;i<$(dropDownElement+" li:not(.init)").length;i++) { 
						    		bodyDrop+=$(dropDownElement+" li:not(.init)")[i].outerHTML;
						    	};
						    	 						    	
						    	pdp.canvas.scrollbarId = dropDownElement.replace("#","");
						    	var part1 = '<div id="'+pdp.canvas.scrollbarId+'scrl" class="scrollbarDrop" ><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="overview">';
								var part2 = '</div></div></div>';
								var initer = dropDownElement+" li.init";
								$(dropDownElement+" li:not(.init)").remove()
								$(part1+bodyDrop+part2).insertAfter(initer);

								$(dropDownElement).remove('li:not(.init)');
								
								$(dropDownElement+"scrl").tinyscrollbar();
								$(dropDownElement).addClass("scrolling");
								$(dropDownElement+'scrl').hide()
		},

		dropDownChange:function(dropDownElement){

		if(!$(dropDownElement).hasClass("disabled")){

			//if($(dropDownElement+" li:not(.init)").length>10){
		if(dropDownElement===pdp.canvas.inStorePickupState){
				
				 $(dropDownElement+" li.init").on({


								"mousedown touchstart": function() {

							//SCROLLBAR FOR DROPDOWN
								
								if($(dropDownElement).hasClass("scrolling")){ $(dropDownElement+"scrl").show();//console.log("SCROLLING")
								}
								$(dropDownElement+"scrl").tinyscrollbar_update(0);
								},

								"mouseup touchend" : function(){
																	
									$('body').on({
										"keyup": function(e){ if (e.which !== 0) {

								        //console.log("Charcter was typed. It was: " + String.fromCharCode(e.which));
								        //console.log("Charcter was typed. It was: " + e.which);


								        	i = 0;
								        	o = 0;
								        	pdp.objects.droplistArray = [];
								        	pdp.objects.droplistArrayName = [];
								        	pdp.objects.maxScroll = $('#'+pdp.canvas.scrollbarId+'scrl .overview').height()-$('#'+pdp.canvas.scrollbarId+'scrl .viewport').height();
								        	var dataPrefix = "";
								        	//console.log("max scroll ==" +pdp.objects.maxScroll);
								        	
								        $('#'+pdp.canvas.scrollbarId+'scrl .overview').children('li:not(.init)').each(function(){
								        	
								        	i++;
								        	if(jQuery(this).first().text().substr(0,1).toUpperCase() == String.fromCharCode(e.which)){ 
								        		pdp.objects.droplistArray.push($(this).position().top);
								        		
								        		if($(this).attr("data-value")){
													dataPrefix = "data-value";
								        			pdp.objects.droplistArrayName.push($(this).attr(dataPrefix));
								        			
								        		}
								        		else{
								        			dataPrefix = "data";
								        			pdp.objects.droplistArrayName.push($(this).val());

								        		}
						        		
								        		//console.log(i+" == "+pdp.objects.droplistArray+" == name "+pdp.objects.droplistArrayName);
								        		if(pdp.objects.droplistArray[0]>pdp.objects.maxScroll){$('#'+pdp.canvas.scrollbarId+'scrl').tinyscrollbar_update(pdp.objects.maxScroll) }
								        		else{$('#'+pdp.canvas.scrollbarId+'scrl').tinyscrollbar_update(pdp.objects.droplistArray[0]);}

								        	//console.log($("#"+pdp.canvas.scrollbarId+"scrl .overview li["+dataPrefix+"="+pdp.objects.droplistArrayName[0]+"]").text());

								        	
								        	$("#"+pdp.canvas.scrollbarId+"scrl .overview li["+dataPrefix+"="+pdp.objects.droplistArrayName[0]+"]").addClass("hovered");
								        	$("#"+pdp.canvas.scrollbarId+"scrl .overview li["+dataPrefix+"="+pdp.objects.droplistArrayName[0]+"]").siblings().removeClass("hovered");

								        }
								        else{ }

								        });
								        	

								        	
								    		}
								    		
											}
										});

									$('#'+pdp.canvas.scrollbarId+'scrl .overview').children('li:not(.init)').click(function(){

										var allOptions = $('#'+pdp.canvas.scrollbarId+'scrl .overview').children('li:not(.init)');

										allOptions.removeClass('selected');
										

										$(this).addClass('selected');

										

										 if($(this).attr("data-value")){ 
												    	
												    	$(dropDownElement).children('.init').attr("data-value",$(this).attr("data-value"));

												    	//console.log($(this).text().length);

												    	if($(this).text().length>15){

															// Showing Data-Value $(dropDownElement).children('.init').html($(this).attr("data-value"));	
																$(dropDownElement).children('.init').html($(this).text().substring(0,14));
															
												    	}

												    	else{$(dropDownElement).children('.init').html($(this).html())}
													}


										else{
														$(dropDownElement).children('.init').val($(this).val());

														$(dropDownElement).children('.init').html($(this).html());
													}
												  
													$('#'+pdp.canvas.scrollbarId+'scrl').hide();

												      //console.log('select '+dropDownElement+' changed');
												    $(dropDownElement).css("z-index","9999");
												    /*$(dropDownElement).css("z-index","9999");*/
												    // Change Handling login for all dropdown elements
												    if ($(dropDownElement).find(".selected").attr("data-value")){
												    	//this seems to be on the State Selector drop-down only
												    	//console.log("Drop-Down ID: "+ $(dropDownElement).attr("id") + " --- Drop-down Value : " +$(dropDownElement).find(".selected").attr("data-value"));
												    }else{
												    	//all other dropdowns here
												    	//console.log("Drop-Down ID: "+ $(dropDownElement).attr("id") + " --- Drop-down Value : " +$(dropDownElement).find(".selected").attr("value"));
												    }
													
													if ( $(dropDownElement).attr("id")  == 'instorePickupState')
													{
														pdp.functions.removeErrorMessageToCustomer(pdp.errors.inStorePickupEmptyZipOrStateErr, false);
														//pdp.functions.removeErrorMessageToCustomer(pdp.errors.inStorePickupInvalidZipErr);
														
													}
													else if ( $(dropDownElement).attr("id")  == 'selectSize')
													{
														if ( $(dropDownElement).find(".selected").attr("val") != null && $(dropDownElement).find(".selected").attr("val") != '' ) 
														{
															 pdp.functions.selectSize($(dropDownElement).find(".selected").attr("val"));
															pdp.functions.removeErrorMessageToCustomer(pdp.errors.sizeSelectErr, false);
														
														}
													}
													else if ( $(dropDownElement).attr("id")  == 'selectInstoreSize')
													{
														
														if ( $(dropDownElement).find(".selected").attr("val") != null && $(dropDownElement).find(".selected").attr("val") != '' )
														{
															pdp.functions.removeErrorMessageToCustomer(pdp.errors.instorePickupsizeSelectErr, false);
															pdp.functions.selectInstoreInventorySize($(dropDownElement).find(".selected").attr("val"));
														}
														 
													}

									})
									}

				}); 




							
			}

			else{
				$(dropDownElement+" li").click(function(){
					var liValue = '';
					if($(dropDownElement).attr("id")  == 'selectSize' && pdp.constants.storeId == 13001) {
     					liValue = $(this).attr('val');
					} else {
						liValue = $(this).attr('val');
					}
					$("body").off("keyup");
				if($(dropDownElement).hasClass("scrolling")){
					//console.log('We are in scrolling mode!');

					var allOptions = $('#'+pdp.canvas.scrollbarId+'scrl .overview').children('li:not(.init)');

				}
				else{var allOptions = $(dropDownElement).children('li:not(.init)');}

				
		 		
			    allOptions.removeClass('selected');

			    $(this).addClass('selected');
			    $(this).siblings('.init').html($(this).html());
			    


			    if($(this).attr("data-value")){ 
			    	$(this).siblings('.init').attr("data-value",$(this).attr("data-value"))
				}

				else{
 				    if($(dropDownElement).attr("id")  == 'selectSize' && pdp.constants.storeId == 13001) {
	 				    $(this).siblings('.init').attr("val",liValue);
 				    } else {
 				    	$(this).siblings('.init').attr("val",liValue);
 					    //$(this).siblings('.init').val(liValue);
 				    }
					
				}
			    allOptions.toggle();

			    //console.log('select '+dropDownElement+' changed');
			    $(dropDownElement).css("z-index","9999");
			    /*$(dropDownElement).css("z-index","9999");*/
			    // Change Handling login for all dropdown elements
			    if ($(dropDownElement).find(".selected").attr("data-value")){
			    	//this seems to be on the State Selector drop-down only
			    	//console.log("Drop-Down ID: "+ $(dropDownElement).attr("id") + " --- Drop-down Value : " +$(dropDownElement).find(".selected").attr("data-value"));
			    }else{
			    	//all other dropdowns here
			    	//console.log("Drop-Down ID: "+ $(dropDownElement).attr("id") + " --- Drop-down Value : " +$(dropDownElement).find(".selected").attr("value"));
			    }
				
				if ( $(dropDownElement).attr("id")  == 'instorePickupState')
				{
					pdp.functions.removeErrorMessageToCustomer(pdp.errors.inStorePickupEmptyZipOrStateErr, false);
					//pdp.functions.removeErrorMessageToCustomer(pdp.errors.inStorePickupInvalidZipErr);
					
				}
				else if ( $(dropDownElement).attr("id")  == 'selectSize')
				{
					var sizeSelectedValue = '';
					if($(dropDownElement).attr("id")  == 'selectSize' && pdp.constants.storeId == 13001) {
						sizeSelectedValue = $(dropDownElement).find(".selected").attr("val");
					} else {
						sizeSelectedValue = $(dropDownElement).find(".selected").attr("val");
					}
					if ( sizeSelectedValue != null && sizeSelectedValue != '' ) 
					{
						 pdp.functions.selectSize(sizeSelectedValue);
						pdp.functions.removeErrorMessageToCustomer(pdp.errors.sizeSelectErr, false);
					
					}
				}
				else if ( $(dropDownElement).attr("id")  == 'selectInstoreSize')
				{
					
					if ( $(dropDownElement).find(".selected").attr("val") != null && $(dropDownElement).find(".selected").attr("val") != '' )
					{
						pdp.functions.removeErrorMessageToCustomer(pdp.errors.instorePickupsizeSelectErr, false);
						pdp.functions.selectInstoreInventorySize($(dropDownElement).find(".selected").attr("val"));
					}
					 
				}


		});

			}

				//SCROLLBAR FOR DROPDOWN


			$(dropDownElement).parent('div').on("mouseleave",function(){

					if($(dropDownElement).hasClass("scrolling")){ $("body").off("keyup");$('#'+pdp.canvas.scrollbarId+'scrl').hide();//console.log("MOUSELEAVE HIDE")
				}
					else{$(dropDownElement).children('li:not(.init)').hide(); }
					
					//console.log('mouse left dropdown');
					$(dropDownElement).css("z-index","999");
			});

//CLICK ON MENU ITEM


			}
			else{$(dropDownElement+" li.init").off();//console.log("DISABLED DROPDOWN");
			}
		},
		getSwatchObject:function (catentryId){
			if ( productJSONObject != null && productJSONObject.swatchGroup.swatches != null &&  productJSONObject.swatchGroup.swatches.length > 0 ){
		 		for ( var swatchesItr = 0 ; swatchesItr < productJSONObject.swatchGroup.swatches.length ; swatchesItr++){
					if (productJSONObject.swatchGroup.swatches[swatchesItr].iProductID == catentryId ){
						
						return productJSONObject.swatchGroup.swatches[swatchesItr];
		 			}
		 		}
			}
			return null;
		},
		refreshAlternateImages: function (actualSwatchObject){
			// read images from pojo
			pdp.images.imageCounterFix=0;
			pdp.images.mFixAImages=0;
			var swatchObject =  actualSwatchObject;
			if ( ! pdp.functions.isSwatchHavingImages(swatchObject)){
				swatchObject = pdp.objects.swatches;
			}
			
			var imagesStr = "";
			$(pdp.canvas.alternateImagesContents).html("");
			var square = "square";
			var imageCounter = 0 ;
			var imageCounterA = 0 ;
			var firstImage = null;
			if ( swatchObject.mImages != null &&  swatchObject.mImages.length > 0 ){
				imageCounter = 0 ;
				for ( var imageItr = 0 ;  imageItr < swatchObject.mImages.length ; imageItr++ ){
					var imageSuffix =  swatchObject.mImages[imageItr].imageName ;

					if ( imageCounter != 0 ){
						square =  "square" + imageCounter;
					}
					pdp.functions.appendImageToImageSrc(swatchObject,$(pdp.canvas.alternateImagesContents), 'm',imageItr, square,    imageSuffix,pdp.images.pdVertialStr);
					imageCounter++;
				}
				
			} else if ( swatchObject.nImages != null &&  swatchObject.nImages.length > 0 ){
				for ( var imageItr = 0 ;  imageItr < swatchObject.nImages.length ; imageItr++ )	{
					var imageSuffix =  swatchObject.nImages[imageItr].imageName  ;
					if ( imageCounter != 0 ){
						square =  "square" + imageCounter;
					}					
					pdp.functions.appendImageToImageSrc(swatchObject,$(pdp.canvas.alternateImagesContents),'n',imageItr, square, imageSuffix,pdp.images.pdHorizontalStr);
					imageCounter++;
				}
			} 
			for ( var imageItr = 0 ;  imageItr < swatchObject.aImages.length ; imageItr++ ){
				var aImagesSort = swatchObject.aImages;

					function sortByKey(array, key) {
					    return array.sort(function(a, b) {
					        var x = a[key]; var y = b[key];
					        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					    });
					}

					aImagesSort = sortByKey(aImagesSort, 'imageName');
				var imageSuffix =  swatchObject.aImages[imageItr].imageName  ;

				

				if (   imageSuffix.indexOf("_a0")  == -1 ){
					if ( imageCounter != 0 ){
						square =  "square" + imageCounter;
					}
					if(swatchObject.aImages.length==2){
						
						pdp.functions.appendImageToImageSrc(swatchObject,$(pdp.canvas.alternateImagesContents),'a', imageItr, square,   imageSuffix,pdp.images.mainimageStr,imageCounter,imageCounterA);
					}
					else{
					pdp.functions.appendImageToImageSrc(swatchObject,$(pdp.canvas.alternateImagesContents),'a', imageItr, square,   imageSuffix,pdp.images.alternateImageStr,imageCounter,imageCounterA);
					}
					imageCounterA++;
				}else{
					if ( firstImage == null )
						firstImage =  pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.alternateImageStr);
				}		 		
			}
			if ( firstImage != null ) 
				pdp.functions.reloadMainImage(swatchObject,    pdp.functions.getIndexFromImageName(firstImage )  );
			else
				pdp.functions.reloadMainImage(swatchObject,    "_" + productJSONObject.selectedProductColorString + "_a0" );
			
			if(pdp.objects.swatches.mImages.length && pdp.objects.swatches.aImages.length<=3 && pdp.objects.swatches.aImages.length>1){
				//add additional TRs to fill the empty a image cells
				/*if (pdp.objects.swatches.aImages.length==2){
					$("#pdp-left tfoot").append('<tr id="1row-a2"><td colspan="1" class="emptyCell"><img width="100%" style="visibility: visible; opacity: 100; display: inline-block;" class="emptyCell" id="alternateImages_a1" src="/wcsstore/Coach_US/images/inviso.gif"></td></tr>');
					$("#pdp-left tfoot").append('<tr id="1row-a3"><td colspan="1" class="emptyCell"><img width="100%" style="visibility: visible; opacity: 100; display: inline-block;" class="emptyCell" id="alternateImages_a1" src="/wcsstore/Coach_US/images/inviso.gif"></td></tr>');
				} else{
					$("#pdp-left tfoot").append('<tr id="1row-a3"><td colspan="1" class="emptyCell"><img width="100%" style="visibility: visible; opacity: 100; display: inline-block;" class="emptyCell" id="alternateImages_a1" src="/wcsstore/Coach_US/images/inviso.gif"></td></tr>');
				}*/
			}
		},
		refreshCrosssellsForColor:function (swatchObject){
			var htmlString = "";
			if ( swatchObject != null && swatchObject.xSells.length > 0 ){
				$('#productSuggestDiv, .productSuggest').show();
				for (var productArrayItr= 0 ; productArrayItr < swatchObject.xSells.length  &&  productArrayItr < 3 ; productArrayItr++)
				{
					var crosssellObject = swatchObject.xSells[productArrayItr];
					
					var productURL  =pdp.functions.getBasePageURL();		
					var crosssellURLString = productURL + "Product-" + crosssellObject.styleKeyword + "-" + pdp.constants.storeId + "-"
								+ pdp.constants.catalogId + "-" + crosssellObject.stylePartnumber + "-" + 
								crosssellObject.seoLang + "?cs=" + crosssellObject.colorName;
				
				
		 				htmlString =  htmlString +   "<div class='suggestItem' > <a   " 
						+ " title ='" + crosssellObject.styleName.toUpperCase() + "  " + crosssellObject.unitPrice  + "' href='"+   crosssellURLString +  "' > " +
						"<img class='lazy' src='/wcsstore/Coach_US/images/inviso.gif' data-original='" + pdp.functions.getSecene7BaseURL() +    crosssellObject.stylePartnumber.toLowerCase() + "_" + 
							crosssellObject.imageName + "_a0" + pdp.images.crosssellsStr + "' width='100%' border='0' > </a></div>";
		 			
				}
			}
			else
			{
				$('#productSuggestDiv, .productSuggest').hide();
			}
			$('#productSuggestContent').html( htmlString);
		},
		prepopulateSwatchImages: function (swatchObject){
	 		var firstImage = null;
	 		//var mainImages=[], swatchImages=[], largeImages=[], xSells=[];
			for ( var imageItr = 0 ;  imageItr < swatchObject.aImages.length ; imageItr++ ){
				var imageSuffix =  swatchObject.aImages[imageItr].imageName ;
				pdp.images.swatchImages.push(pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.alternateImageStr));
				pdp.images.mainImages.push(pdp.functions.getImageURL(swatchObject,  pdp.functions.getIndexFromImageName( pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.alternateImageStr)) ,pdp.images.mainimageStr));
				pdp.images.largeImages.push(pdp.functions.getImageURL(swatchObject,  pdp.functions.getIndexFromImageName( pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.alternateImageStr)) ,pdp.images.pdFullStr));
			}
			for ( var imageItr = 0 ;  imageItr < swatchObject.mImages.length ; imageItr++ ){
				var imageSuffix =  swatchObject.mImages[imageItr].imageName ;
				pdp.images.swatchImages.push(pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.pdVertialStr));
				pdp.images.mainImages.push(pdp.functions.getImageURL(swatchObject,  pdp.functions.getIndexFromImageName( pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.pdVertialStr)) ,pdp.images.mainimageStr));
				pdp.images.largeImages.push(pdp.functions.getImageURL(swatchObject,  pdp.functions.getIndexFromImageName( pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.pdVertialStr)) ,pdp.images.pdFullStr));
			}
	 		for ( var imageItr = 0 ;  imageItr < swatchObject.nImages.length ; imageItr++ ){
				var imageSuffix =  swatchObject.nImages[imageItr].imageName ;
				pdp.images.swatchImages.push(pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.pdHorizontalStr));
				pdp.images.mainImages.push(pdp.functions.getImageURL(swatchObject,  pdp.functions.getIndexFromImageName( pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.pdHorizontalStr)) ,pdp.images.mainimageStr));
				pdp.images.largeImages.push(pdp.functions.getImageURL(swatchObject,  pdp.functions.getIndexFromImageName( pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.pdHorizontalStr)) ,pdp.images.pdFullStr));
			}
			$(document).ready(function(e){
				// pre-load the Main and the Swatch Images once DOM is ready
				// pdp.functions.preload(pdp.images.swatchImages);
				pdp.functions.preload(pdp.images.mainImages);
			});
			$(window).load(function(){
				// pre-load Large Full Page images once all Windows elements are 
				// if(pdp.options.noTouch)	pdp.functions.preload(pdp.images.largeImages)
			});
		},
		selectSize:function ( catentryId ){
			var sizeObject = null;
			var swatchObject = productJSONObject.selectedColorObject;
			for (var sizesItr = 0 ;  sizesItr < swatchObject.sizes.length ; sizesItr++ ){
				if ( swatchObject.sizes[sizesItr].catEntryId == catentryId	){
					sizeObject = swatchObject.sizes[sizesItr];			
					break;
				}
			}
			pdp.functions.showOrHideInstorePickupOptions(swatchObject, sizeObject);
			productJSONObject.selectedSizeId = catentryId;
			productJSONObject.selectedSize=   sizeObject.size;
			productJSONObject.prevSelectedSize=   sizeObject.size;
			productJSONObject.sizeObject = sizeObject;
			$(pdp.canvas.selectedSizeInventory).html(pdp.functions.getInventoryStatus(sizeObject));
			pdp.functions.showOrHideAddToCartButton(sizeObject);
			//pdp.functions.dropDownChange(pdp.canvas.quantityElem); //WHY HERE?
		},
		getMonogramHandtagImage:function (handtagType,monogramColor){
				var imagePath = pdp.functions.getSecene7BaseURL() + handtagImagePath;
		 
				 imagePath = replaceStringPattern(imagePath,0,handtagType);
				imagePath = replaceStringPattern(imagePath,1,monogramColor.toLowerCase());
				return imagePath;
		},
		isMonogramHasHandTag:function (monogramGroup){
			if ( monogramGroup != null && monogramGroup.mnHtColor != null &&  monogramGroup.mnHtColor.length > 0 ){
				return true;
			}
			return false;
		},
		getDefaultHanttagObject: function (monogramGroup){
			if ( monogramGroup != null && monogramGroup.mnHtColor != null &&  monogramGroup.mnHtColor.length > 0 ){
				return monogramGroup.mnHtColor[0];
			}
			return null;
		},
		RecentViewedProduct:function( bundleId,productId,partNumber){
			this.pId = productId;
			this.bId = bundleId;
			this.pn = partNumber;
		},
		showRecentlyViewedItems: function (json){
			if (json.products != null && json.products.length > 0 ) {
				var htmlString  = "";
				
				var productBaseURL =pdp.functions.getBasePageURL();			
				var recentlyViewCounter = 0 ;
				var initValue = json.products.length   ;
				if ( json.products.length > pdp.constants.maxRecentlyViewedCount ) 
					initValue =	(json.products.length) - (json.products.length - pdp.constants.maxRecentlyViewedCount);
				for (var productArrayItr= initValue - 1 ;   productArrayItr >= 0     ; productArrayItr--)	{
					if (   json.products[productArrayItr].styleId != productJSONObject.styleId){
						htmlString =  htmlString +   "<div class='recentlyViewedItem'  id='Recentlyviewed_" + json.products[productArrayItr].catEntryId  + "'>  " ;
						 htmlString =  htmlString + " <a title ='" + json.products[productArrayItr].productName.toUpperCase() + "  " + json.products[productArrayItr].price  + "' href='" ;
						htmlString =  htmlString + productBaseURL + json.products[productArrayItr].productURL +  "' > " ;
						htmlString =  htmlString + "<img src='" + pdp.functions.getSecene7BaseURL() +    json.products[productArrayItr].stylePartnumber.toLowerCase() + "_" ;
						htmlString =  htmlString + json.products[productArrayItr].imageName.toLowerCase() + "_a0" + pdp.images.recentlyViewedStr + "' > </a></div>";
						recentlyViewCounter++;
					}
				}
				$("#recentlyViewedItemsContent").html(htmlString);
				$("#productViewedDiv").parent().show();
			}
		}, //end RV display
		refreshEBImages:function (){
			if (pdp.functions.isMonogramHasHandTag(productJSONObject.mnGroup)) 
			{
				for ( var mnEbColorItr = 0 ; mnEbColorItr < productJSONObject.mnGroup.mnEbColor.length ; mnEbColorItr++ )
				{
					$("#mnEBColorImg_" + productJSONObject.mnGroup.mnEbColor[mnEbColorItr].color ).attr('src', 
					pdp.functions.getMonogramFoilImage(productJSONObject.mnGroup ,productJSONObject.mnGroup.mnEbColor[mnEbColorItr].color ));
				}	
			}
		},
		populateSizesForColor:function (swatchObject){
			    var selectedSize = '';	
		        if ($(pdp.canvas.sizeElem).find(".selected").html() == null && getQueryParamValue("wishlistSelectedSize") != null &&  getQueryParamValue("wishlistSelectedSize") != '' && getQueryParamValue("source") != null && getQueryParamValue("source") != '' && getQueryParamValue("source") == "PDP" )
		        {			        	        
 				   pdp.objects.currentItems.selectedSize = decodeURIComponent(getQueryParamValue("wishlistSelectedSize"));
 				   selectedSize = decodeURIComponent(getQueryParamValue("wishlistSelectedSize"));
 				} else {
 				   pdp.objects.currentItems.selectedSize = $(pdp.canvas.sizeElem).find(".selected").html();
 				   selectedSize = $(pdp.canvas.sizeElem).find(".selected").html();
 				}
				//console.log("populateSizesForColor: "+pdp.objects.currentItems.selectedSize);
				if ( swatchObject.sizes != null && swatchObject.sizes.length > 0){		
					if (( swatchObject.sizes.length >= 1 )&&( swatchObject.sizes[0].size != 'ONESIZE' )){
						$('#selectSizeDiv').show();
						$(pdp.canvas.sizeElem).empty();
						$(pdp.canvas.sizeElem).append('<li class="init selected" val="">'+pdp.objects.currentItems.selectSize+'</li>');
					}else{
						$('#selectSizeDiv').hide();
						$("#pdpSelectSQ .dropdown").css({"margin-right":"0px"});
						return;
					}

					var selectedSizeObject = null;
					productJSONObject.selectedSizeId = null;
					productJSONObject.selectedSize=  null;
					
			
					for (var sizesItr = 0 ;  sizesItr < swatchObject.sizes.length ; sizesItr++ ){
						if ( selectedSize != '' && selectedSize == swatchObject.sizes[sizesItr].size ){
							selectedSizeObject =swatchObject.sizes[sizesItr];
						}					
							$(pdp.canvas.sizeElem).append('<li val="'+ 
								 swatchObject.sizes[sizesItr].catEntryId + '">' +
								  swatchObject.sizes[sizesItr].size + '</li>');		 			
					}
					
					if ( selectedSizeObject != null )
					{
						
						$(pdp.canvas.sizeElem +" li.init").html(selectedSizeObject.size);
						if($(pdp.canvas.sizeElem +" li.init").attr("data-value")){
							
							$(pdp.canvas.sizeElem +" li.init").attr("data-value",selectedSizeObject.catEntryId)
						}
						else{
							$(pdp.canvas.sizeElem +" li.init").val(selectedSizeObject.catEntryId);
						}						
					
					}

					$(pdp.canvas.sizeElem +" li .init").unbind("click");
					$(pdp.canvas.sizeElem).parent('div').unbind("mouseleave");
					$(pdp.canvas.sizeElem +" li").unbind("click");
					$(pdp.canvas.sizeElem).removeClass("scrolling");
					pdp.functions.dropDownChange(pdp.canvas.sizeElem);
					//pdp.functions.dropDownChange(pdp.canvas.quantityElem);
					
					/*
					$(pdp.canvas.sizeElem).change({color: swatchObject},function(event){
						 pdp.functions.selectSize(event.data.color, $(this).val());
					});				
					*/
					if ( selectedSizeObject != null)
					{
						pdp.functions.selectSize( selectedSizeObject.catEntryId);
					}
					
				}
		},
		reloadMainImage:function (swatchObject,swatchIndex)
		{	
			pdp.objects.currentItems.mainImageURL = pdp.functions.getImageURL(swatchObject,swatchIndex,pdp.images.mainimageStr);
			//$(pdp.canvas.mainImagesContentsDiv+" div").remove(); //remove scene7 divs
			$(pdp.canvas.mainImagesContentsDiv +" .pdpMainImage").attr({"id":"mainImages_" + swatchIndex, "src":pdp.objects.currentItems.mainImageURL});
			$("#mainImages_" + swatchIndex).on("load",function(){ //fired once the image is loaded
				$(pdp.canvas.mainImagesContentsDiv).css({"visibility":"visible","opacity":"100"});
				var preLoadZoomImageDims=parseInt($(this).width()*pdp.constants.zoomFactor);
				var preloadZoomUrl = [($(this).attr("src").split("?")[0]+"?wid="+preLoadZoomImageDims+"&hei="+preLoadZoomImageDims+"&fit=fit,1")];
				pdp.functions.preload(preloadZoomUrl);
			});
			if (!("ontouchstart" in document.documentElement)){
				$(pdp.canvas.mainImagesContentsDiv).on({
					"mousedown":function(e){
						if (!(pdp.objects.flyoutZoom.enabled)){
							pdp.functions.addFlyout($(pdp.canvas.mainImagesContentsDiv).attr('id'));
							pdp.objects.flyoutZoom.setEnabled(true);
							pdp.objects.flyoutZoom.enabled=true;				
						}
						$(pdp.canvas.fullPageContentTrigger).hide();
					},
					"mouseenter":function(e){
						pdp.objects.currentItems.onMainImage=true;
						if(pdp.options.noTouch && !(pdp.objects.flyoutZoom.enabled)) {
							pdp.functions.showClickToZoom();
						} else if (pdp.options.noTouch &&pdp.objects.flyoutZoom.enabled){
							$(pdp.canvas.fullPageContentTrigger).hide();
						}
					},
					"mouseleave":function(e){
						pdp.objects.currentItems.onMainImage=false;
						//console.log('mouse left - '+ $(this).attr('id')); // fade out click to zoom text here
						pdp.functions.hideClickToZoom(); //$(pdp.canvas.mainImagesContentsDiv+" #zoomText").animate({"opacity":"0.00"},100,function(){$(this).remove();});
						if (pdp.objects.flyoutZoom.enabled||pdp.options.isZooming){
							pdp.options.isZooming = false;
						}
						if(typeof(pdp.objects.flyoutZoom.isEnabled)=="function"){
							pdp.objects.flyoutZoom.setEnabled(false);
							pdp.objects.flyoutZoom.enabled = false;
						}
						$(pdp.canvas.fullPageContentTrigger).show();
					}
				});
			} else{
				if("ontouchstart" in document.documentElement) {
					pdp.functions.addTouchFlyoutZoom();
				}
			}/*
			pdp.objects.currentItems.mainImageURL = pdp.functions.getImageURL(swatchObject,swatchIndex,pdp.images.mainimageStr);
			//$(pdp.canvas.mainImagesContentsDiv+" div").remove(); //remove scene7 divs
			$(pdp.canvas.mainImagesContentsDiv +" .pdpMainImage").attr({"id":"mainImages_" + swatchIndex, "src":pdp.objects.currentItems.mainImageURL});
			$("#mainImages_" + swatchIndex).on("load",function(){ //fired once the image is loaded
				$(pdp.canvas.mainImagesContentsDiv).css({"visibility":"visible","opacity":"100"});
				var preLoadZoomImageDims=parseInt($(this).width()*pdp.constants.zoomFactor);
				var preloadZoomUrl = [($(this).attr("src").split("?")[0]+"?wid="+preLoadZoomImageDims+"&hei="+preLoadZoomImageDims+"&fit=fit,1")];
				pdp.functions.preload(preloadZoomUrl);
			});*/
		},
		addTouchFlyoutZoom:function(){
			$(pdp.canvas.mainImagesContentsDiv).html($(pdp.canvas.mainImagesContentsDiv+'>img'));
			setTimeout("pdp.functions.touchClickToZoom()",1000);
			var id=$(pdp.canvas.mainImagesContentsDiv).attr("id");
			if ($("#"+id).length > 0) {
				var flyout = new s7js.flyout.AdvancedFlyout();
				flyout.setTargetId(id);
				flyout.createStaticImage();
				var url = "";
				$("body").find("#"+id).each(function () {
					flyout.staticImageContainer = $(this)[0];
					url = pdp.objects.currentItems.mainImageURL;//$(this).find("img").attr("src");
					if(null != url && "" != url) {
						flyout.createFlyoutView();
						flyout.flyoutView.setImageUrl(url);
						flyout.createFlyoutFrame();
					}
					$(this).on('mouseenter touchstart', function() {
						flyout.setEnabled(true);
						//flyout.flyoutView.setImageUrl('/wcsstore/Coach_US/images/Coach-Empty.gif');
						url = pdp.objects.currentItems.mainImageURL;//$(this).find("img").attr("src");
						if(null != url && "" != url) {
							flyout.flyoutView.setImageUrl(url);
						}
					});
				});
				flyout.onFlyoutEnd = function() {	
					flyout.setEnabled(false);
				}
			}
		},
		slideMImage:function(index, interval){ /*THIS IS M-IMAGE ANIMATION FUNCTION*/

				
		    clearTimeout(pdp.images.mImageTrigger);
		    var slides = $('#m-imageBox img'),
		        slides_length = slides.length;
		    
		    var slide = slides.eq(index % slides_length);

		    slides.css({ "z-index":"0","position":"absolute","top":0,"left":0}).animate( {opacity:0.0},{ duration: 750, queue: false })
		    slide.css({ "position":"relative", "visibillty": "visible", "opacity": 0.0,"z-index":"100","display":"block" }).animate( {opacity:1.0},{ duration: 750, queue: false });
		    pdp.images.mImageTrigger = setTimeout(function() {
		    pdp.functions.slideMImage(++index, interval);
		    
		    }, interval)

			/*
			clearInterval(pdp.images.mImageTrigger)
			$('#m-imageBox img:gt(0)').hide();
			 pdp.images.mImageTrigger = setInterval(function(){        
			 $('#m-imageBox :first-child').css({"z-index":0}).fadeOut(750,function(){
			 $(this).css({'position':'absolute','top':0,'left':0})}) 
			 .next('img').css({"z-index":1}).fadeIn(750,function(){$(this).css({'position':'relative'})}) 
			 .end().appendTo('#m-imageBox'); 
			 
			 },    1500);
			 
		*/
		},
		wrapMe:function(imageIndex,imageType,swatchObject,imageCounter,imageCounterA){
			pdp.images.mImageLength = swatchObject.mImages.length;
			if(imageType=="m"){
				pdp.images.mFixAImages=1;

				if(imageIndex>0){	
					$("#m-imageBox").append($('#alternateImages_' + imageType + imageIndex));
					if(swatchObject.mImages.length == imageIndex+1){	
						$('#m-imageBox img:not(:first-child)').css({"visibility":"hidden"});
						
					}							
				}else{
					if((swatchObject.mImages.length<=1)&&(pdp.images.mImageTrigger!="")){
						clearTimeout(pdp.images.mImageTrigger);
					}
					$('#alternateImages_' + imageType + imageIndex).wrap("<tr id='row-"+imageType + imageIndex+"'><td id='m-imagesCell' rowspan='2' colspan='1' style='width:50%;'><div id='m-imageBox' style='display:block; margin:0px auto; position:relative;'></div></td></tr>");					
				}
				if(swatchObject.aImages.length<=3){
				var centerMe = 1;
					if(swatchObject.aImages.length==3) {centerMe = 2;}
					//console.log(centerMe);
				 $("#m-imagesCell").attr({"rowspan":"1","colspan":centerMe}).css({"width":"100%"}); 
				 $("#m-imagesCell div").css("width","50%");
				 if(swatchObject.aImages.length<=1){
					$("#m-imagesCell div").addClass("adjustHeight");
					$("#m-imagesCell").addClass("iPadMinWidth");
					}

				}
			
			}else if(imageType=="a"){
				if(imageCounterA==0){	
					pdp.images.imageCounterFix=1;
					imageCounterA=imageCounterA+pdp.images.imageCounterFix;
					//console.log(imageCounter+" if 0");
				}
				else{ 
					if(pdp.images.imageCounterFix==1){
						imageCounterA=imageCounterA+pdp.images.imageCounterFix;/*console.log(imageCounterA+" if was 0");*/
					} else{
						pdp.images.imageCounterFix=0;/*console.log(imageCounterA+" if wasn't 0");*/
					}	
				}
				if((swatchObject.mImages.length>0)&&(swatchObject.aImages.length>=4)){ 
					if(imageCounterA==1){
						$('#alternateImages_' + imageType + imageIndex).wrap("<td colspan='1' id='cell-ma"+imageIndex+"'></td>"); 
						$("#row-m0").prepend($("#cell-ma"+imageIndex)); 
												
						}
					else{
						if(imageCounterA==3){pdp.images.imageCounterFix=1;}
							
						if(imageCounterA<=3){
						$('#alternateImages_' + imageType + imageIndex).wrap("<tr id='1row-"+imageType + imageCounterA+"'><td colspan='1' ></td></tr>");
						
						}else{
							$('#alternateImages_' + imageType + imageIndex).wrap("<td colspan='1' id='col2-3"+imageIndex+"' ></td>");
							$("#1row-a3").append($("#col2-3"+imageIndex)); 
							//$("#1row-a3").append("<td class='noBorder'></td>");
							}
						
						}
				}
				else{	
					if(!swatchObject.mImages.length){imageCounterA=imageCounterA-1;}
					if(imageCounterA%2==pdp.images.mFixAImages){
						$('#alternateImages_' + imageType + imageIndex).wrap("<tr id='row-"+imageType + imageCounterA+"'><td colspan='1' ></td></tr>");
					}
					else{


						//console.log(imageCounter+" target "+imageIndex);
						$('#alternateImages_' + imageType + imageIndex).wrap("<td colspan='1'  id='cell-"+imageIndex+"'></td>");
						var newImageCounter = imageCounterA -1;
												
						//console.log($("#cell-"+imageIndex));
						$("#row-a"+newImageCounter).append($("#cell-"+imageIndex));
						
					}
				}
				//console.log(imageCounter+" element;Fix ="+pdp.images.imageCounterFix);
			}
			else if(imageType=="n"){
				$('#alternateImages_' + imageType + imageIndex).wrap("<tr id='row-"+imageType + imageCounter+"'><td colspan='2'></td></tr>");
			}else{
				$('#alternateImages_' + imageType + imageIndex).wrap("<tr id='row-"+imageType + imageIndex+"'><td colspan='1' ></td></tr>");
			}
		},
		appendImageToImageSrc:function (swatchObject,div,imageType, imageIndex, imageClass,  imageSuffix,imagePreset,imageCounter,imageCounterA){
			imageStyle="";
			imageClass= "lazy "+imageClass;
			imageSrc="/wcsstore/Coach_US/images/inviso.gif";
			if((swatchObject.aImages.length==2)&&(!swatchObject.mImages.length)&&((!swatchObject.nImages.length)||((swatchObject.nImages.length)&&(imageType=='a')))){
				imageType="c";
				imagePreset = pdp.images.mainimageStr;
				//console.log(imageType+"  "+imagePreset);
			}
			else if(imageType=="m"){ 
						if(imageIndex>0){ 
						imageClass=imageClass.replace("lazy","");
						imageStyle="position:absolute;top:0;left:0;visibility:hidden;display:none;";
						imageSrc= pdp.functions.getImageURL(swatchObject,imageSuffix,imagePreset);
					}
			}
			
			imgBody="<img style='"+imageStyle+"'  width='100%' class='" + imageClass + "' id='alternateImages_" + imageType + imageIndex + "'  src='"+imageSrc+"' data-original='" + pdp.functions.getImageURL(swatchObject,imageSuffix,imagePreset) + "' />";
			div.append(imgBody);
			pdp.functions.wrapMe(imageIndex,imageType,swatchObject,imageCounter,imageCounterA);
			
			
			$("#alternateImages_" + imageType + imageIndex).error(function(){
				  $(this).parent("div").remove();
			}).load(function() {
				$(this).unbind("click").click(function() {
					//Omniture Tracker
					pdp.functions.omnitureTracker('pdpAlternateImg');
					var imageSource = pdp.functions.getIndexFromImageName( $(this).attr('src'));
			 		pdp.functions.setupSelectedImageItem(imageSource, "fullscreenAlternateImages", pdp.canvas.fullScreenCarouselContent);
			 		pdp.functions.reloadFullscreenMainImage(swatchObject, imageSource);
			 		pdp.functions.viewFullScreen(imageSource);
					//console.log("alternate image clicked");
				});
			});
		},
		getIndexFromImageName:function (imageSrc){
			var imageSplit = imageSrc.split("\?");
			var imageSplitInded = imageSplit[0].split(productJSONObject.style.toLowerCase());
			return imageSplitInded[imageSplitInded.length -1 ];
		},
		isSwatchHavingImages:function (swatchObject){
			if (  ( swatchObject.mImages != null &&  swatchObject.mImages.length > 0 )
				|| ( swatchObject.nImages != null &&  swatchObject.nImages.length > 0 )
				|| ( swatchObject.aImages != null &&  swatchObject.aImages.length > 0 ) )
				return true ;
			return false;
		},
		getSwatchWithImages:function (swatchObject){
			return pdp.objects.swatches;
		},
		
		isSizeAvailableToBuy:function (swatchSize){
			var itemCanbeAddedToCart = false;
			if( swatchSize.sellable==="false" )
			{
				itemCanbeAddedToCart = false;
			}
			else if ("yes" == swatchSize.isBackOrdered){
				itemCanbeAddedToCart = true;
			}else if( swatchSize.backOrderDate != null && swatchSize.backOrderDate.length > 0 )
			{
				itemCanbeAddedToCart = true;
			}
			else if( swatchSize.inventory != null &&  swatchSize.inventory == 'true')
			{
				itemCanbeAddedToCart = true;
				
			}
			else if( swatchSize.wsp )
			{
				itemCanbeAddedToCart = false;
			}
			else
			{
				itemCanbeAddedToCart = false;
			}
			return itemCanbeAddedToCart;
			
			
		},		
		
		showOrHideAddToCartButton:function (swatchSize){
			var itemCanbeAddedToCart = pdp.functions.isSizeAvailableToBuy(swatchSize);
			 
			//WCS 7330
			if (itemCanbeAddedToCart)
			{
				$("#pdpAddToCartLink").removeClass('pdpDisableButton').addClass('pdpDarkButton'); 
				$("#wishlistButton").removeClass('pdpDisableButton').addClass('pdpLightButton');
			}
			else
			{
				$("#pdpAddToCartLink").addClass('pdpDisableButton').removeClass('pdpDarkButton'); 
				$("#wishlistButton").addClass('pdpDisableButton').removeClass('pdpLightButton');
			}
			
		},
		isAtleastOnecolorIsAvailableForPickup: function (swatchObject)
		{
			
			for (var sizesItr = 0 ;  sizesItr < swatchObject.sizes.length ; sizesItr++ )
			{
				if ( swatchObject.sizes[sizesItr].sellable == 'true' && 
					swatchObject.sizes[sizesItr].wsp == 'true' )
					return true;
			}
			return false;
			
		},
		showOrHideInstorePickupOptions:function (swatchObject, sizeObject){
			var showFlag = true;
			if ( showFlag && productJSONObject.savedEBColor != null )
				showFlag = false;
				
			if ( showFlag && ! productJSONObject.isWSPAvailable )
				showFlag = false;
			
			if ( showFlag && sizeObject == null  )
			{
				if ( ! pdp.functions.isAtleastOnecolorIsAvailableForPickup(swatchObject))
				{
					showFlag = false;
				}
			}
			else if  (  showFlag && sizeObject != null  )
			{
				if ( sizeObject.wsp != 'true')
					showFlag = false;
			}
			
			if ( showFlag )
				$('#storePickupAccordion').show();
				

				//  <fmt:message key="PDP_PICKUP_IN_STORE" bundle="${storeText}"/>
			else
				$('#storePickupAccordion').hide();
			
		},
		selectColorByPartNumber:function ( partNumber, divId ){
			var colorPartNumber = '';
			if ( partNumber.split("_").length > 1 ) 
				colorPartNumber =partNumber.split("_")[1];
			if ( colorPartNumber != '' && productJSONObject != null && productJSONObject.swatchGroup.swatches != null &&  productJSONObject.swatchGroup.swatches.length > 1 )		
			{
		 		for ( var swatchesItr = 0 ; swatchesItr < productJSONObject.swatchGroup.swatches.length ; swatchesItr++)
		 		{
					if ( productJSONObject.swatchGroup.swatches[swatchesItr].copyProductColor == colorPartNumber ) 
					{
 						pdp.functions.selectColor ( "div_" + productJSONObject.swatchGroup.swatches[swatchesItr].colorProductId );
						//pdp.functions.changeCommonSelectedSwatches(productJSONObject.swatchGroup.swatches[swatchesItr].colorProductId);
						/*
						$("#pdpSwatchSelectColor .swatchImgContainer .div-productcolor-class img").removeClass("selected");
						$("#colorselectDiv_"+productJSONObject.swatchGroup.swatches[swatchesItr].colorProductId+" img").addClass("selected");
						*/
						return;
					}
		  		}	
			}
			$( divId + " img").addClass("selected");
			pdp.functions.selectColor(divId);
		},
		selectColorByColorString:function ( colorString, divId ){
			 colorString = colorString.toLowerCase() ;
			if ( productJSONObject != null && productJSONObject.swatchGroup.swatches != null &&  productJSONObject.swatchGroup.swatches.length > 0 )		
			{
		 		for ( var swatchesItr = 0 ; swatchesItr < productJSONObject.swatchGroup.swatches.length ; swatchesItr++)
		 		{
					if ( productJSONObject.swatchGroup.swatches[swatchesItr].productColorString == colorString ) 
					{
 						pdp.functions.selectColor ( "div_" + productJSONObject.swatchGroup.swatches[swatchesItr].colorProductId );
						//pdp.functions.changeCommonSelectedSwatches(productJSONObject.swatchGroup.swatches[swatchesItr].colorProductId);
						/*
						$("#pdpSwatchSelectColor .swatchImgContainer .div-productcolor-class img").removeClass("selected");
						$("#colorselectDiv_"+productJSONObject.swatchGroup.swatches[swatchesItr].colorProductId+" img").addClass("selected");
						*/
						return;
					}
		  		}	
			}
		  $( divId + " img").addClass("selected");		
			pdp.functions.selectColor(divId);
		},
		
		selectColor:function ( divId ){
			$(pdp.canvas.mainImagesContentsDiv +">img").attr("src","/wcsstore/Coach_US/images/inviso.gif");
			var splitId =divId.split("_")[1];
			var swatchObject = pdp.functions.getSwatchObject(splitId);
			pdp.options.isZooming = false;
			var setBuyableFlag = true;

			pdp.objects.swatches=swatchObject; //creating a current list of swatches instance to be reused until selectColor is clicked again (revisit this)
			if ( ! productJSONObject.pageLoadColorId  )
				productJSONObject.pageLoadColorId = swatchObject.colorProductId;
			productJSONObject.selectedColorId = swatchObject.colorProductId;
			productJSONObject.selectedColorCode= swatchObject.copyProductColor;
			productJSONObject.selectedProductColorString = swatchObject.productColorString;
			productJSONObject.selectedColorname = swatchObject.name;
			productJSONObject.selectedPartNum = swatchObject.productPartNumber;
			productJSONObject.selectedColorObject = swatchObject;
			// WCS-8628 Buyable flag set for product
			if(productJSONObject.selectedColorObject.productBuyable == 'false'){
				setBuyableFlag = false;
			}
			pdp.functions.refreshAlternateImages(swatchObject);
			pdp.functions.refreshCrosssellsForColor(swatchObject);
			pdp.functions.selectFullScreenColor(divId); //setup full-screen div with the same swatch selection
			productJSONObject.selectedColorId = splitId;
			var swatchOneSize = pdp.functions.getOneSizeFromSwatch(swatchObject);
			
			$("#selectedColorText").html(swatchObject.name);
			if ( swatchObject.listPrice == swatchObject.unitPrice ){
			
				$("#pdTabProductPriceSpan").html(swatchObject.listPrice);
			}
			else
			{
				$("#pdTabProductPriceSpan").html("<strike>" + swatchObject.listPrice + "</strike>");
			}
			if ( swatchObject.listPrice == swatchObject.unitPrice ){
				//$("#pdTabProductSalePrice").html(swatchObject.unitPrice);
				$("#pdTabProductSalePrice").html("");
				$("#pdTabProductSalePrice").hide();
			}else{
				$("#pdTabProductSalePrice").html(pdp.messages.salePriceText + ' ' + swatchObject.unitPrice);
				$("#pdTabProductSalePrice").show();
			}
			
			if ( swatchObject.onlineExclusiveFlag !=null && swatchObject.onlineExclusiveFlag.length > 0 ){
				$('#onlineExclusiveDiv').html( swatchObject.onlineExclusiveFlag );
				$('#onlineExclusiveDiv').show();
			}else{
				$('#onlineExclusiveDiv').html( "" );
				$('#onlineExclusiveDiv').hide();
			}

			if ( swatchOneSize){
				productJSONObject.selectedSizeId = swatchOneSize.catEntryId;
				productJSONObject.selectedSize=   swatchOneSize.size;
				pdp.functions.showOrHideAddToCartButton(swatchOneSize);
				$(pdp.canvas.selectedSizeInventory).html(pdp.functions.getInventoryStatus(swatchOneSize));
				$('#selectSizeDiv').hide();
				$("#pdpSelectSQ .dropdown").css({"margin-right":"0px"});
				
				if ( swatchObject.preOrderFlag )
					$('#preorderFlagDiv').show();
				else
					$('#preorderFlagDiv').hide();	
				productJSONObject.sizeObject = swatchOneSize;
				pdp.functions.showOrHideInstorePickupOptions(swatchObject, swatchOneSize);
				if (swatchOneSize.sellable != 'true')
					setBuyableFlag = false;
			}else{
				$(pdp.canvas.selectedSizeInventory).html("");
				pdp.functions.populateSizesForColor(swatchObject);	
 				pdp.functions.showOrHideInstorePickupOptions(swatchObject, null);
 				for (var sizesItr = 0 ;  sizesItr < swatchObject.sizes.length ; sizesItr++ )
				{
					if ( swatchObject.sizes[sizesItr].sellable != 'true')
						setBuyableFlag = false;
				}
			}

			//console.log('selectColor has been fired');
			pdp.functions.changeCommonSelectedSwatches(pdp.objects.swatches.colorProductId);
			pdp.functions.removeErrorMessageToCustomer(pdp.errors, true);
			// WCS-8378 Monogram exclusion logic 			
			var mnGroupObject = pdp.functions.getMonogramObject(pdp.objects.swatches.colorProductId);							
			if ( mnGroupObject != null && mnGroupObject.mnMonogramExclude == 'YES')				
					$('#monoButton').hide();
				else {
					$('#monoButton').show();					
						if((productJSONObject.savedCatentryId != pdp.objects.swatches.colorProductId) && productJSONObject.savedMonogramText != null){									
							pdp.functions.showErrorMessageToCustomer(pdp.errors.editMonogramErr);
							pdp.functions.removeMonogramOnSwatchChange();
							if ( swatchOneSize){
							    pdp.functions.showOrHideInstorePickupOptions(swatchObject, swatchOneSize);	
							}else{
							    pdp.functions.showOrHideInstorePickupOptions(swatchObject, null);
							}
                            
                           
						}
					}						
			
			//Omniture Tracker
			//pdp.functions.omnitureTracker('swatchColorClick');
			if(pdp.objects.currentItems.fullPageActive!==true) pdp.functions.resetSizesTimeout();			
			//WCS-8628 - Buyable flag change starts	
			if(!setBuyableFlag)
			{
				pdp.functions.removeErrorMessageToCustomer(pdp.errors.editMonogramErr, true); 
				pdp.functions.buyableFlagChanges();
			}
			else
			{
				$("#pdpReviews").css("display","block");
				$("#BVRRContainer").css("display","block");
				//WCS-9031 -ADD to Bag button is not getting greyed out for Item Outofstock
				if( $(pdp.canvas.selectedSizeInventory).hasClass('outofstock')){
                $("#pdpAddToCartLink").addClass('pdpDisableButton').removeClass('pdpDarkButton');
                $("#wishlistButton").addClass('pdpDisableButton').removeClass('pdpLightButton').removeClass('pdpLightDisableButton');
                }
                else
                {
                $("#pdpAddToCartLink").removeClass('pdpDisableButton').addClass('pdpDarkButton');
                $("#wishlistButton").removeClass('pdpDisableButton').removeClass('pdpLightDisableButton').addClass('pdpLightButton');
                }
				$("#pdpAddToBagText").show();
				$("#pdpCurrentlyUnavailableText").hide();
				$("#pdpSelectSQ .dropdown").show();
				$("#sizeChartAccordion").css({"margin-right":"0%"});
				$("#storePickupAccordion").addClass('storePickup').removeClass('storePickupDisabled');
				$("#wspDiv").attr("href", "#storePickup");
			}			
			
		},
		resetSizesTimeout: function(){
			clearTimeout(pdp.objects.currentItems.resetSizesTimeout);
			pdp.objects.currentItems.resetSizesTimeout=setTimeout("pdp.functions.resetSizes()", 350);
		},
		fetchStoresForCatentry:function (  ){
			//validateInstorePickupInput();
		if(pdp.functions.validateInstorePickupInput()){
		        }
		else
			return;

			pdp.functions.omnitureTracker('pdpStoreFindBtn');//For capturing Omniture. 

			var country = '';
			var state  = '';
				if( $('#instorePickupState .selected').attr("data-value") != '' ){
				   var state = $('#instorePickupState .selected').attr("data-value") ;
					if( state.length> 2 ){
						state = state.substring( 3 );
						country = "CA";
					}else{
						country = "US";
					}
				}else{
					country = ( pdp.functions.isValidZipCode( $('#instorePickupZipcode').val(), true ) ? "US" : "CA" );
				}
	        var distance  = $('#instorePickupDistance .init').val() ;
			$.ajax({
				  type: "POST",
				  url: pdp.functions.getBasePageURL() +pdp.options.storeLocatorCmd,
				  data: {catEntryId: productJSONObject.instoreSizeId, catalogId: pdp.constants.catalogId,  // $("#selectInstoreSize .selected").val()
				  countryCode: country, langId: pdp.constants.langId, radius: distance, 
				  state : $(pdp.canvas.selectedInstoreStateElem).attr("data-value") , storeId : pdp.constants.storeId, zipCode : $('#instorePickupZipcode').val() },
				   success: function(data){
				   	productJSONObject.instorePickupJSON = data;
				   	pdp.functions.showInstorePickupOptions(data);
				 },
				  dataType: "json"
			});
		},
		addItemToCart:function() {
			if ($('#pdpAddToCartLink').hasClass('pdpDisableButton')) return;
						  			
			if ( ! pdp.functions.validateItemInfo())
				return true;			
			if (! pdp.functions.isSizeAvailableToBuy(productJSONObject.sizeObject))
				return false;	
					
			//addMiniCartPreloader(true);
			pdp.functions.removeErrorMessageToCustomer(pdp.errors.editMonogramErr, false);
			//$("#pdpAddToCartLink").addClass('pdpDisableButton'); disable until added
			var postData = {catEntryId_0: productJSONObject.selectedSizeId, quantity_0: $(pdp.canvas.quantityElem).find(".selected").attr("val"), storeId: pdp.constants.storeId, catalogId: pdp.constants.catalogId, primary: 0, addressType: 'B', URL: pdp.options.SuccessView};
									
			if (productJSONObject.savedCatentryId == pdp.objects.swatches.colorProductId){	
					if ( productJSONObject.savedEBColor != null && productJSONObject.savedEBColor.length > 0  ){
						postData.selectedMnEbColor_0 =productJSONObject.savedEBColor;
					}
		
					if ( productJSONObject.savedHTColor != null && productJSONObject.savedHTColor.length > 0  ){
						postData.selectedMnHtColor_0 = productJSONObject.savedHTColor;
					}
		
					if ( productJSONObject.savedMonogramText != null && productJSONObject.savedMonogramText.length > 0  ){
						postData.selectedMnEnteredText_0 =productJSONObject.savedMonogramText;
					}
					
					if ( productJSONObject.savedFontSize != null && productJSONObject.savedFontSize.length > 0  ){
						postData.mnFontSize_0 = productJSONObject.savedFontSize;
					}					
					//pdp.functions.removeMonogram();
				}			
			//if ( productJSONObject.mnGroup != null && productJSONObject.mnGroup.mnHandtagType != null &&  productJSONObject.mnGroup.mnHandtagType.length > 0  ){
				//postData.monogramHandTagtype_0 = productJSONObject.mnGroup.mnHandtagType;
			//} 

			$.ajax({
				  type: "POST",
				  url:  pdp.functions.getBasePageURL() + pdp.options.orderItemUpdateCmd,
				  data: postData,
				  success: [pdp.functions.showAddtoCartSuccess,
					$("#pdpAddToCartLink").removeClass('pdpDisableButton')
				  ],
				  dataType: "json"
			});
		},
		showAddtoCartSuccess:function (json){		
		removeCartLimitErrorMessage();
		if(typeof(json.exception) != "undefined") {
			addCartLimitErrorMessage();
			return;
		}
		if (json.success){
				/*var successData = {storeId: pdp.constants.storeId, catalogId: pdp.constants.catalogId, langId: pdp.constants.langId, orderId: '.',calculationUsageId: -1, URL: 'ShoppingCartView' };
				*/
				var successData = {storeId: pdp.constants.storeId, catalogId: pdp.constants.catalogId, langId: pdp.constants.langId, orderId: '.',calculationUsageId: -1, URL: 'MiniShoppingCartView' };
				$.ajax({
					type: "POST",
					url:  pdp.functions.getBasePageURL() + orderCalculateCmd,
					dataType: "json",
					onCreate :addMiniCartPreloader(true),
					data: successData,
					complete: function () {
						createMiniCart(true, true);
					}
				});
			}
			else{
				alert('Failed');
			}
		},
		processEmail : function (){
			processEmailClick(productJSONObject.selectedColorId);
			pdp.functions.omnitureTracker("pdpEmail");
		},
		processPrint : function (){
			var price = pdp.objects.swatches.unitPrice;
			price = price.replace(/[$|,]/g, "");
			price = parseInt(price) * 100;

			var size = productJSONObject.selectedSize;
			if (size == "ONESIZE")
				size = null;

			var colorString = productJSONObject.selectedColorCode.replace("/", "").toLowerCase();

			winPopup("/online/handbags/ProductDetailPrintView?langId=" + pdp.constants.langId + "&storeId=" + pdp.constants.storeId + "&catalogId=" + pdp.constants.catalogId + "&isNew=N&shortDescription=" + productJSONObject.productName + "&price=" + price + "&style=" + productJSONObject.style + "&size=" + size + "&color=" + productJSONObject.selectedColorname + "&colorString=" + colorString + "&macro=product_image", "product_detail_product", 750, 650, "no");
			pdp.functions.omnitureTracker("pdpPrint");
		},
		fetchAndDisplayRecentlyViewItems:function (divObject){
			//$('#productViewedDiv').hide();
			var productcookie = pdp.functions.getRecentViewedItems();
			var productIdString = "";
			var counter = 0 ;
			if ( productcookie != null && productcookie.sa && productcookie.sa.length > 0 )	{
				for (var storeArrayItr= 0 ; storeArrayItr < productcookie.sa.length   ; storeArrayItr++){
					if ( productcookie.sa[storeArrayItr].sId == pdp.constants.storeId ){
						for (var productArrayItr= 0 ; productArrayItr < productcookie.sa[storeArrayItr].pa.length   ; productArrayItr++)	{
							if (  productcookie.sa[storeArrayItr].pa[productArrayItr].pId != productJSONObject.selectedColorId )	{
								if ( counter == 0 )
									productIdString =  productcookie.sa[storeArrayItr].pa[productArrayItr].pId;
								else
									productIdString = productIdString + "|" +  productcookie.sa[storeArrayItr].pa[productArrayItr].pId;
								counter++;
							}
						}
					}
				}
				if ( productIdString != "" ){
					$.ajax({
						  type: "GET",
						  url: pdp.functions.getBasePageURL() + pdp.options.recentlyViewedProductInfoView,
						  data: {storeId: pdp.constants.storeId, catalogId : pdp.constants.catalogId, productIds : productIdString },
						  success: pdp.functions.showRecentlyViewedItems,
						  dataType: "json"
					});
				}
			}
 		},
		addProductToCookie: function (cookieName){
			if (cookieName==undefined) cookieName="recentlyViewedItems";
			var productCookie = readCookie(cookieName);
			var products = new Array();
			var counter = 0 ;

			var product = new pdp.functions.RecentViewedProduct(productJSONObject.styleId,productJSONObject.selectedColorId,productJSONObject.selectedPartNum);
			products[counter]= product;
			counter++;
			var storeItr = 0 ;
			
			var cookieJSON = {};
			cookieJSON.sa = new Array();
			
			if ( productCookie != null && productCookie.length > 0 ){
					var recentViewedObjects =   jQuery.parseJSON(productCookie);
					if ( recentViewedObjects != null && recentViewedObjects.sa && recentViewedObjects.sa.length>0){
						for ( var storeArrayItr = 0 ;      storeArrayItr < recentViewedObjects.sa.length ;storeArrayItr++ ){
							if ( recentViewedObjects.sa[storeArrayItr].sId == pdp.constants.storeId ){
								var productArraySize = recentViewedObjects.sa[storeArrayItr].pa.length;
								for ( var arrayItr = 0  ; arrayItr <  productArraySize ;  arrayItr++ ){
									if ( counter > 8 ) 
										break;
									if( recentViewedObjects.sa[storeArrayItr].pa[arrayItr].bId != 	productJSONObject.styleId	){
										products[counter]= recentViewedObjects.sa[storeArrayItr].pa[arrayItr];
										counter++;
									}
								}
							}else{
								cookieJSON.sa[storeItr] = (recentViewedObjects.sa[storeArrayItr]);
								storeItr++;
							}
						}
					}
			}else{
					var product = new pdp.functions.RecentViewedProduct(productJSONObject.styleId,productJSONObject.selectedColorId,productJSONObject.selectedPartNum);
					products[0]= product;
			}
			cookieJSON.sa[storeItr] ={sId: pdp.constants.storeId,pa: products};
			storeItr++;
			var productString = stringify(cookieJSON);
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000*24*30;
			now.setTime(time);
			document.cookie = "recentlyViewedItems=" + productString + "; expires=" + now.toGMTString();
		},
		isValidZipCode: function (theString,isUS){
			 	var regex1 = /^\d{5}$/;
				if (!isUS){
					regex1 = /^\s*[a-ceghj-npr-tvxy]\d[a-z](\s)?\d[a-z]\d\s*$/i;
				}
				return regex1.test(theString);
		},
		displayBreadcrumbsNextPrev:function (json ){
			var breadcrumbHtml = "";
			var breadcrumbString = "";
			if ( json != null && json.breadcrumbs != null && json.breadcrumbs.length > 0 ){
				for ( var breadcrumbsItr = 0 ; breadcrumbsItr < json.breadcrumbs.length ; breadcrumbsItr++ )
				{
					if ( breadcrumbsItr != 0 )
						breadcrumbHtml = breadcrumbHtml + " / ";
						breadcrumbHtml = breadcrumbHtml + '<span class="cat' + (breadcrumbsItr+1) + '"><a href="' + json.breadcrumbs[breadcrumbsItr].url + '">'
							+ json.breadcrumbs[breadcrumbsItr].name + '</a></span>' ;
						if ( breadcrumbsItr > 0 ) 
							breadcrumbString = breadcrumbString + "|";
						breadcrumbString = breadcrumbString + json.breadcrumbs[breadcrumbsItr].name ;
							 
				}
				$('#breadcrumbs').html(breadcrumbHtml);
				$('#breadcrumbs').show();
			}
			if ( json != null && json.breadcrumbs != null && json.breadcrumbs.length > 0 && needleParam )
			{
				needleParam.categoryId = breadcrumbString;
			}
			var navCatId = getQueryParamValue('navCatId') ;
			var viewType = getQueryParamValue('viewType') ;
			var categoryId = getQueryParamValue('catId') ;
			var additionalParams = '';
			if ( categoryId != null && categoryId != '' )
			{
				additionalParams = additionalParams + 'catId=' + categoryId;
			}	
			
			if ( navCatId != null && navCatId != '' )
			{
				additionalParams = additionalParams + "&navCatId=" + navCatId;
			}
			if ( viewType != null && viewType != '' )
			{
					additionalParams = additionalParams + "&viewType=" + viewType;
			}
			

			if ( json.nextCatentryId != null && json.previousCatentryId != null ){
				$('#prevNextSep').show();
			}
			else
				$('#prevNextSep').hide();
				
			if ( json.nextCatentryId != null || json.previousCatentryId != null ){
				$('#pdpPrevNextDiv').show();
			}
			else
				$('#pdpPrevNextDiv').hide();		
				
			if ( json.nextCatentryId != null ){
				var nextLink = '<a href="' + pdp.functions.getBasePageURL()  + 'Product-' + json.nextCatentryKeyword +  '-' + 
				pdp.constants.storeId + '-' + pdp.constants.catalogId + '-' + json.nextCatentryId  + '-' + seoLangId ;
				
				if ( json.nextDefaultColor != null && json.nextDefaultColor != '' ){ 
					nextLink =  nextLink + "?cs=" + json.nextDefaultColor;
				
					if (additionalParams != '')
					{
						nextLink = nextLink + "&" +   additionalParams;
					}				
					if ( json.nextCategoryId != null && json.nextCategoryId != '')
					{
						nextLink = nextLink + "&productCategoryId=" + json.nextCategoryId;						
					}
 					
 					nextLink = nextLink + "&LOC=NEXT" ;
				}
				else
				{
					var addedQM = false;
					if (additionalParams != '')
					{
						nextLink = nextLink + "?" + additionalParams;
						addedQM = true;
					}				
					if ( json.nextCategoryId != null && json.nextCategoryId != '')
					{
						if ( addedQM ) 
							nextLink = nextLink + "&productCategoryId=" + json.nextCategoryId;						
						else
							nextLink = nextLink + "?productCategoryId=" + json.nextCategoryId;						
					}
					if ( addedQM)
					{
						nextLink = nextLink + "&LOC=NEXT" ;
					}
					else
						nextLink = nextLink + "?LOC=NEXT" ;
				}
				

				nextLink = nextLink + '"> ' +  pdp.messages.breadcrumbNext + ' </a>';
				$('#pdpNext').html(nextLink);
			}else{
				$('#pdpNext').html('');
			}

			if ( json.previousCatentryId != null ){
				var prevLink = '';
				prevLink = '<a href="' + pdp.functions.getBasePageURL()  + 'Product-' + json.previousCatentryKeyword +  '-' + 
				pdp.constants.storeId + '-' + pdp.constants.catalogId + '-' + json.previousCatentryId + '-' + seoLangId ;
				if ( json.previousDefaultColor != null && json.previousDefaultColor != '' ){ 
					prevLink=  prevLink + "?cs=" + json.previousDefaultColor;
					if (additionalParams != '')
					{
						prevLink = prevLink +   "&" + additionalParams;
					}				
					if ( json.previousCategoryId != null && json.previousCategoryId != '')
					{
						prevLink = prevLink + "&productCategoryId=" + json.previousCategoryId;						
					}
					
					prevLink = prevLink + "&LOC=PREV" ;
				}
				else
				{
					var addedQM = false;
					if (additionalParams != '')
					{
						prevLink = prevLink + "?" + additionalParams;
						addedQM = true;
					}				
					if ( json.previousCategoryId != null && json.previousCategoryId != '')
					{
						if ( addedQM )
							prevLink = prevLink + "&productCategoryId=" + json.previousCategoryId;						
						else
							prevLink = prevLink + "?productCategoryId=" + json.previousCategoryId;						
					}
					if ( addedQM)
					{
						prevLink = prevLink + "&LOC=PREV" ;
					}
					else
						prevLink = prevLink + "?LOC=PREV" ;
					
					
				}
								
 				prevLink = prevLink + '"> ' +  pdp.messages.breadcrumbPrevious + '</a>';
				
 				
				$('#pdpPrevious').html(prevLink);
				
			}else{
				$('#pdpPrevious').html('');
			}	

		},
		populateBreadcrumbsNextPrev: function (){
			var navCatId = getQueryParamValue('navCatId') ;
			var viewType = getQueryParamValue('viewType') ;
			var categoryId = getQueryParamValue('catId') ;
			var searchKeyword = getQueryParamValue('searchKeyword');
			var productCategoryId = getQueryParamValue('productCategoryId');
			if ( categoryId != null && categoryId != "" ){
				var bundleId = productJSONObject.styleId;
				var productId = productJSONObject.pageLoadColorId;
				var postData = {storeId: pdp.constants.storeId, catalogId : pdp.constants.catalogId, categoryId : categoryId, bundleId : bundleId ,
					  productId : productId, partNumber : productJSONObject.style};
				if ( navCatId != null && navCatId != '' )
					postData.navCatId = navCatId;	  
				if ( viewType != null && viewType != '' )
					postData.viewType = viewType;	  					
				$.ajax({
					  type: "GET",
					  url: pdp.functions.getBasePageURL() + pdp.options.GetBreadcrumbsInfoView,
					  data: postData,
					  success: function(data){ pdp.functions.displayBreadcrumbsNextPrev(data); },
					  dataType: "json"
				});
			}
			else if ( searchKeyword != null && searchKeyword != "" ){
				var cacheableTerm = getCacheableTerm(searchKeyword);
				var URL = '/online/handbags/SearchResultsView?storeId=' + pdp.constants.storeId 
						+ '&catalogId=' + pdp.constants.catalogId + '&langId=' + 
						pdp.constants.langId + '&quickOrder=yes&searchKeyword=' + searchKeyword + '&cacheKeyword=' + cacheableTerm;
				var breadcrumbHtml = pdp.messages.searchResults + " <a href='" + URL + "'> "  + decodeURIComponent( searchKeyword ) + " </a>";
				$('#breadcrumbs').html(breadcrumbHtml);	
				/* WCS 8907
				if (  needleParam )
				{
					needleParam.categoryId = "Search: " + decodeURIComponent( searchKeyword ) ;
				} 
				*/
			}
		},
		getRecentViewedItems:function (){
			var productCookie = readCookie("recentlyViewedItems");
			//console.log(productCookie);
			if ( productCookie == null || productCookie =='')
				return null;
							
			pdp.objects.recentlyViewed = jQuery.parseJSON(productCookie);
			
			//console.log(pdp.objects.recentlyViewed);
			return pdp.objects.recentlyViewed;
		},
		setupAddToWishListOverlay:function(){
			$( "#add-to-wishlist-overlay").dialog({
				autoOpen:false,
				modal: false,
				show: "slideDown",
				hide: "slideUp",
				zindex: 10001,
				width: 412,
				dialogClass: 'no-close',
				open:function(){
					pdp.functions.runWishListEffect();
				}
			});
		},
		selectFullScreenColor:function (divId){
			if ($(pdp.canvas.fullScreenCarouselContent + " img").length)
				pdp.objects.currentItems.selectedImageStyle = $(pdp.canvas.fullScreenCarouselContent + " img.selected").attr("id").split("_")[$(pdp.canvas.fullScreenCarouselContent + " img.selected").attr("id").split("_").length-1];
			var splitId =divId.split("_")[1];
			var swatchObject = pdp.functions.getSwatchObject(splitId);

			if (swatchObject){
				$(pdp.canvas.fullScreenCarouselContent).html("");
			 
				var fullcarouselHTML = "<ul id='"+pdp.carousel.carouselContainer+"' >";
				var imageCounter = 0 ;
				var square = "square";
				var firstImage = null;
				var mainImageIndex = pdp.functions.getIndexFromImageName( $(pdp.canvas.mainImagesContentsDiv +" .pdpMainImage").attr('src')) ;
	 			fullcarouselHTML = fullcarouselHTML + "<li id='"+imageCounter+"'><img class=" + square 
	 			+ " id='fullscreenAlternateImages" + mainImageIndex + "' src='" 
	 			+ pdp.functions.getImageURL(swatchObject,mainImageIndex,pdp.images.fullPageCarousel) + "' /></li>";
				firstImage =  pdp.functions.getImageURL(swatchObject,mainImageIndex,pdp.images.fullPageCarousel);
				if ( swatchObject.mImages != null &&  swatchObject.mImages.length > 0 ){
					imageCounter = 0 ;
					for ( var imageItr = 0 ;  imageItr < swatchObject.mImages.length ; imageItr++ ){
						var imageSuffix =  swatchObject.mImages[imageItr].imageName ;
						square =  "square" + imageCounter;
						if ( firstImage == null ) 
							firstImage =  pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.fullPageCarousel);
						
						imageCounter++;
							
			 			fullcarouselHTML = fullcarouselHTML + "<li id='"+imageCounter+"'><img width='94' height='94' class=" + square + " id='fullscreenAlternateImages" + imageSuffix + "' src='" + pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.fullPageCarousel) + "' /></li>";
					}
					
				} else if ( swatchObject.nImages != null &&  swatchObject.nImages.length > 0 ){
					for ( var imageItr = 0 ;  imageItr < swatchObject.nImages.length ; imageItr++ )	{
						var imageSuffix =  swatchObject.nImages[imageItr].imageName  ;
						square =  "square" + imageCounter;
						if ( firstImage == null ) 
							firstImage =  pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.fullPageCarousel);
						
						imageCounter++;
			 			fullcarouselHTML = fullcarouselHTML + "<li id='"+imageCounter+"'><img width='94' height='94' class=" + square + " id='fullscreenAlternateImages" + imageSuffix + "' src='" + pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.fullPageCarousel) + "' /></li>";
					}
				}				
				
				for ( var imageItr = 0 ;  imageItr < swatchObject.aImages.length ; imageItr++ ){
					var imageSuffix =  swatchObject.aImages[imageItr].imageName  ;
					
						if (   imageSuffix.indexOf("_a0")  != -1 ){
							continue;
						}
						if ( imageCounter != 0 ){
							square =  "square" + imageCounter;
						}else {
							firstImage =  pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.fullPageCarousel);
						}
						imageCounter++;
			 			fullcarouselHTML = fullcarouselHTML + "<li id='"+imageCounter+"'><img width='94' height='94' class=" + square + " id='fullscreenAlternateImages" + imageSuffix + "' src='" + pdp.functions.getImageURL(swatchObject,imageSuffix,pdp.images.fullPageCarousel) + "' /></li>";
				}
				fullcarouselHTML = fullcarouselHTML + "</ul>"

				$(pdp.canvas.fullScreenCarouselContent).html(fullcarouselHTML);
				var correspondingImageStyleAvailable = false;
				$(pdp.canvas.fullScreenCarouselContent + " img")
				    .each(function(){
				        var splitLength = $(this).attr("id").split("_").length;
				        //console.log($(this).attr("id").split("_")[splitLength-1]);
				        if ($(this).attr("id").split("_")[splitLength-1]==pdp.objects.currentItems.selectedImageStyle){
				        	correspondingImageStyleAvailable = true;
				            $(this).addClass("selected");
							pdp.functions.reloadFullscreenMainImage(swatchObject,   pdp.functions.getIndexFromImageName( $(this).attr('src')  ));
				        }
				    });
				if ( firstImage != null && correspondingImageStyleAvailable==false ){ 
					pdp.functions.reloadFullscreenMainImage(swatchObject,   pdp.functions.getIndexFromImageName( $(pdp.canvas.mainImagesContentsDiv +" .pdpMainImage").attr('src')  ));
					$(pdp.canvas.fullScreenCarouselContent+' li:first-child').find('img').addClass('selected');
				}
				pdp.functions.setupFullScreenCarouselClicks(swatchObject);
				pdp.objects.currentItems.currentCarouselItems=$("#"+pdp.carousel.carouselContainer+" li").length;
				//console.log("currentItems : "+pdp.objects.currentItems.currentCarouselItems);
				if (pdp.objects.currentItems.fullPageActive) pdp.functions.setupFullScreenCarousel(pdp.objects.currentItems.currentCarouselItems);
			}
		},	
		removeMonogramOnSwatchChange:function (){
			//Omniture Tracker
			pdp.functions.omnitureTracker('pdpRemoveMonogram');			
			productJSONObject.savedEBColor = null;			
			productJSONObject.selectEBColor = null;
			productJSONObject.savedFontSize = null;
			productJSONObject.selectFontSize = null;
			productJSONObject.savedCatentryId = null;
			productJSONObject.selectedCatentryId = null;
			
			$('#monogramAction').html(pdp.objects.monogram.addMonogram);			
			$("#pdp_monogram #popupHeader p").html(pdp.objects.monogram.addMonogram);
			$('#monogramTextField').val("");
			$('#monogramText').hide();
			$('#monogramRemoveAction').hide();			
		},	
		getMonogramObject : function (catentryId){
			
			if ( productJSONObject != null && productJSONObject.mnGroup != null &&  productJSONObject.mnGroup.length > 0 ){
		 		for ( var monogramItr = 0 ; monogramItr < productJSONObject.mnGroup.length ; monogramItr++){		 		   
					if (productJSONObject.mnGroup[monogramItr].mnCatentryId == catentryId ){						
						return productJSONObject.mnGroup[monogramItr];
		 			}
		 		}
			}
			return null;
		},
		displayMonogramOptions:function () {			
			$("#mnEBColorImg_" + productJSONObject.selectEBColor  ).addClass("selected");
		 	$("#mnHTColorImg_" + productJSONObject.selectHTColor).addClass("selected");
		 	$("#monogramTextField").val(productJSONObject.savedMonogramText);
		 	pdp.functions.removeErrorMessageToCustomer(pdp.errors.enterEBTextErr, false);		 	
			var mnGroupObject = pdp.functions.getMonogramObject(pdp.objects.swatches.colorProductId);
			
			if (mnGroupObject == null){
				mnGroupObject = pdp.functions.getMonogramObject(productJSONObject.styleId);
			}
			
			var monogramInfo = "";
			
			if ( mnGroupObject)	{
								
				/*productJSONObject.selectHTColor = productJSONObject.savedHTColor ;
				productJSONObject.selectEBColor =	productJSONObject.savedEBColor ;*/
				
			
			
				$('#placementImage').html("<img src='"+ pdp.functions.getSecene7BaseURL() 
							+ replaceStringPattern(monogramPlacementImagePath,0,pdp.functions.getMonogramObject(productJSONObject.styleId).mnPlImage) + "'></img>" );
							
				
				if ( mnGroupObject.mnHtColor && mnGroupObject.mnHtColor.length > 0 )
				{
					$("#handtagColor").show();
					var mnHTColorHTML = "";
					for ( var mnHtColorItr = 0 ; mnHtColorItr < mnGroupObject.mnHtColor.length ; mnHtColorItr++ )
					{
						mnHTColorHTML = mnHTColorHTML + "<div class='monogramHTColorClass' id='mnHTColor_" + mnGroupObject.mnHtColor[mnHtColorItr].color + "' > " +
						"<img id='mnHTColorImg_" + mnGroupObject.mnHtColor[mnHtColorItr].color  + "' src='" + pdp.functions.getMonogramHandtagImage(mnGroupObject.mnHandtagType ,mnGroupObject.mnHtColor[mnHtColorItr].color ) +
							"'></img>" +
						" </div>";
					}
					$('#handtagColorContent').html(mnHTColorHTML);
					
					for ( var mnHtColorItr = 0 ; mnHtColorItr < mnGroupObject.length ; mnHtColorItr++ )
					{
							

							if(productJSONObject.savedHTColor === undefined || productJSONObject.savedHTColor === null){
									productJSONObject.selectHTColor = mnGroupObject.mnHtColor[0].color;
							$('#selectedHandTagColor').html(mnGroupObject.mnHtColor[0].name);
								}
									else{pdp.functions.updateSelectedMonogramAttribute();}


							
							
							
					        
					        $("#mnHTColor_" + mnGroupObject.mnHtColor[mnHtColorItr].color).click({param1: mnGroupObject.mnHtColor[mnHtColorItr]},function(event) {

					        	productJSONObject.selectHTColor = event.data.param1.color;
					        	$('#selectedHandTagColor').html(event.data.param1.name);
								pdp.functions.removeErrorMessageToCustomer(pdp.errors.selectHTColorErr, false);	
					        	pdp.functions.refreshEBImages();
								pdp.functions.updateSelectedMonogramAttribute();
		    			    });
					}			
				}
				else{
					$("#handtagColor").hide();
				}

				if ( mnGroupObject.mnEbColor && mnGroupObject.mnEbColor.length > 0 ){

					var mnEBColorHTML = "";
					for ( var mnEbColorItr = 0 ; mnEbColorItr < mnGroupObject.mnEbColor.length ; mnEbColorItr++ )
					{
		 				mnEBColorHTML = mnEBColorHTML +  "<div class='monogramEBColorClass' id='mnEBColor_" + mnGroupObject.mnEbColor[mnEbColorItr].color + "' > " +
						"<img id='mnEBColorImg_" + mnGroupObject.mnEbColor[mnEbColorItr].color + "'   src='" + pdp.functions.getMonogramFoilImage(productJSONObject.mnGroup ,mnGroupObject.mnEbColor[mnEbColorItr].color ) +
							"'></img>" +
						" </div>";
		 			}
					$('#embossingColorContent').html(mnEBColorHTML); 			
					for ( var mnEbColorItr = 0 ; mnEbColorItr < mnGroupObject.mnEbColor.length ; mnEbColorItr++ ){
									
									if(productJSONObject.savedEBColor === undefined || productJSONObject.savedEBColor === null){
									productJSONObject.selectEBColor = mnGroupObject.mnEbColor[0].color;
									$('#selectedEmbossingColor').html(mnGroupObject.mnEbColor[0].name);
								}
									else{pdp.functions.updateSelectedMonogramAttribute();}

							        $("#mnEBColor_" + mnGroupObject.mnEbColor[mnEbColorItr].color).click({param1: mnGroupObject.mnEbColor[mnEbColorItr]},function(event) {
					        		$('#selectedEmbossingColor').html(event.data.param1.name);
					        		productJSONObject.selectEBColor = event.data.param1.color;	
									pdp.functions.removeErrorMessageToCustomer(pdp.errors.selectEBColorErr, false);	
									pdp.functions.updateSelectedMonogramAttribute();														
		    			    });

					}			
				}
				pdp.functions.updateSelectedMonogramAttribute();	
				productJSONObject.selectFontSize = mnGroupObject.mnFontSize;
				productJSONObject.selectedCatentryId = pdp.objects.swatches.colorProductId;
			}
			pdp.functions.setupSwatchHoverEffects("#embossingColorContent>div");
			pdp.functions.setupSwatchHoverEffects("#handtagColorContent>div");
		},
		showInstoreSearchOptions: function(){
			var instoreSwatchImages = "";
			//alert ( $('#instoreSwatchImgContainer').html() );
			$("#instorePickupZipcode").on({"focus":function(){$(pdp.canvas.inStorePickupState+" .init").html("SELECT STATE").attr("data-value",""); }});
			$(pdp.canvas.inStorePickupState+" .init").on({"click":function(){$("#instorePickupZipcode").val(""); }});
			$('#inStoreDesc').show();
			$('#scrollbar1').hide();
			$('#instorePickupNoResults').hide();
			$('#instorePickupResult').hide();
			$('#instorepickup-form-content').html("");
			$("#instorePickupZipcode").val(''); //RESETING VALUES
			// SEARCH AGAIN KEEP STATE $("#instorePickupState .init").attr("data-value","").text('select state');
			if($("#selectInstoreSize").length){ $("#selectInstoreSize .init").val("").text('select size');}
			$("#instorePickupDistance .init").val("10").text('10 miles');
			pdp.functions.removeErrorMessageToCustomer(pdp.errors.inStorePickupEmptyZipOrStateErr, false);
			pdp.functions.removeErrorMessageToCustomer(pdp.errors.inStorePickupInvalidZipErr, false);
			pdp.functions.removeErrorMessageToCustomer(pdp.errors.instorePickupsizeSelectErr, false);
			
			$("#instorePickupZipcode").unbind('keyup');
			$('#instorePickupZipcode').keyup(function() {
				pdp.functions.removeErrorMessageToCustomer(pdp.errors.inStorePickupEmptyZipOrStateErr, false);
				pdp.functions.removeErrorMessageToCustomer(pdp.errors.inStorePickupInvalidZipErr, false);
				
			});

			$(pdp.canvas.pdpSavePick).hide();
			$(pdp.canvas.pdpSavePickDisabled).hide();
			
			$(pdp.canvas.pdpPickupCancel).hide();
			$(pdp.canvas.pdpFetchStoresButon).show();
			$(pdp.canvas.pdpSearchAgain).hide();
			var selectSwatchId = null;
			if ( productJSONObject != null && productJSONObject.swatchGroup.swatches != null &&  productJSONObject.swatchGroup.swatches.length > 1 )
			{
		 		for ( var swatchesItr = 0 ; swatchesItr < productJSONObject.swatchGroup.swatches.length ; swatchesItr++)
		 		{
					var swatchObject = productJSONObject.swatchGroup.swatches[swatchesItr];
					instoreSwatchImages = instoreSwatchImages +  '<div class="in-store-swatch" id="instoreColorselectDiv_' + swatchObject.colorProductId + '"  style="display: inline;" > ' +
						'<img id="instoreSwatchImage_' + swatchObject.colorProductId + '"  class="pdSwatch"  style="cursor: pointer;" src="' 
						+  pdp.functions.getSecene7BaseURL() + productJSONObject.styleForImages + 
							"_" + swatchObject.productColorString + pdp.images.swatchesSuffix + '" /> </div>';
		 		}
				$('#instoreSwatchImgContainer').html(instoreSwatchImages);
		 		for ( var swatchesItr = 0 ; swatchesItr < productJSONObject.swatchGroup.swatches.length ; swatchesItr++)
		 		{
					var swatchObject = productJSONObject.swatchGroup.swatches[swatchesItr];
					$("#instoreColorselectDiv_" + swatchObject.colorProductId).on("click",function() {
						/*
						$('#instoreSwatchImgContainer div img').removeClass('selected');
						$('#' + this.id + ' img').addClass("selected");
						*/
						pdp.functions.selectInstoreColor ( this.id );
						pdp.functions.selectColor ( this.id );
					});
		  		}
		  		pdp.functions.setupSwatchHoverEffects("#instoreSwatchImgContainer>div");
				selectSwatchId = productJSONObject.swatchGroup.swatches[0].colorProductId;
				if (productJSONObject.selectedColorId  == null || productJSONObject.selectedColorId != '' )
					selectSwatchId = productJSONObject.selectedColorId ;
				$('#instoreSwatchImgContainer div img').removeClass('selected');
				$('#instoreSwatchImage_' + selectSwatchId ).addClass("selected");
				
				pdp.functions.selectInstoreColor('div_'+ selectSwatchId);
			}
			else if ( productJSONObject != null && productJSONObject.swatchGroup.swatches != null &&  productJSONObject.swatchGroup.swatches.length == 1 )
			{
				$('#instoreSwatchImage_' + productJSONObject.swatchGroup.swatches[0].colorProductId + " img").addClass("selected");
				pdp.functions.selectInstoreColor('div_'+ productJSONObject.swatchGroup.swatches[0].colorProductId);
			}
			
		},
		validateInstorePickupInput: function (){
			var errorOccured = false;

			if ( productJSONObject.instoreSizeId == null  || productJSONObject.instoreSizeId == '' )
			{
				
				pdp.functions.showErrorMessageToCustomer(pdp.errors.instorePickupsizeSelectErr);
				errorOccured = true;
			}
			
				if( $('#instorePickupZipcode').val().length == 0 )
				{
					var state = $('#instorePickupState .selected').attr("data-value");
					if(state.length == 0 )
					{
						pdp.functions.showErrorMessageToCustomer(pdp.errors.inStorePickupEmptyZipOrStateErr);
						errorOccured = true;
					}
				}
				else
				{
					if( ! pdp.functions.isValidZipCode( $('#instorePickupZipcode').val(), true ) )
					{
						

						if( ! pdp.functions.isValidZipCode( $('#instorePickupZipcode').val(), false ) )
						{
							pdp.functions.showErrorMessageToCustomer(pdp.errors.inStorePickupInvalidZipErr);					
							errorOccured = true;				
						}

					}
				}

		        return (! errorOccured);
		        
		},
		showInstorePickupOptions: function (json){

			$('#inStoreDesc').hide();
			$('#scrollbar1').show();
			$('#scrollbar1').tinyscrollbar();
			var addressString  = "";

			if (json!=null && json.addresses != null && json.addresses.length > 0 ) 
			{
				for ( var addressesItr = 0 ; addressesItr < json.addresses.length ;  addressesItr++)
				{

					addressString = addressString + " <div class='citylist'><label class='label_radio' ><input type='radio' name='instorePickupId' value='" + addressesItr + "'/></label>  <div class='shopBox'><div id='storeName'>"+json.addresses[addressesItr].firstName+"</div><br/><div class='firstLine'>"+json.addresses[addressesItr].address1 + "</div><div id='secondLine'> " + json.addresses[addressesItr].city + ", " + json.addresses[addressesItr].state + " " +json.addresses[addressesItr].zipCode + "</div><div id='thirdLie'> " + json.addresses[addressesItr].phone1 + "</div></div></div><br/> ";
				}
				$(pdp.canvas.pdpSavePick).hide();
				$(pdp.canvas.pdpSavePickDisabled).css("display","inline-block");
		 		$(pdp.canvas.pdpPickupCancel).show();
				$(pdp.canvas.pdpSearchAgain).hide();
				$(pdp.canvas.pdpFetchStoresButon).hide();
				$('#instorepickup-form-content').html(addressString);
				$('#instorePickupResult').show();
			}	
			else
			{
				$(pdp.canvas.pdpPickupCancel).hide();
				$(pdp.canvas.pdpSavePick).hide();
				$(pdp.canvas.pdpSavePickDisabled).show();
				$(pdp.canvas.pdpSearchAgain).show();		
				$(pdp.canvas.pdpFetchStoresButon).hide();
				$('#instorePickupNoResults').show();
			}
			
			
			
		/*
				$( '#instorepickup-form' ).dialog({
					autoOpen: false,
					height: 300,
					width: 350,
					modal: true,
					buttons: {
						"Save And Pickup": function() {
								if ($('input[name=instorePickupRadio]:checked').val() != null) {           
								   alert($('input[name=instorePickupRadio]:checked').val());
								}
								$( this ).dialog( "close" );
						},
						Cancel: function() {
							$( this ).dialog( "close" );
						}
					},
					close: function() {
						allFields.val( "" ).removeClass( "ui-state-error" );
					}
				});
			*/	
			$("#scrollbar1").tinyscrollbar();
			$('#storePickup label').click(function() {
			    $(this).children("input").prop("checked", true);
			    pdp.functions.setupLabel();
			});
			pdp.functions.setupLabel();

		},
		saveMonogramInformation:function (){
			var errorOccured = false;
			if ( productJSONObject.selectEBColor == null ){
				pdp.functions.showErrorMessageToCustomer(pdp.errors.selectEBColorErr);						
				errorOccured = true;
			}
			if ( pdp.functions.isMonogramHasHandTag(productJSONObject.mnGroup) && productJSONObject.selectHTColor == null ){
				pdp.functions.showErrorMessageToCustomer(pdp.errors.selectHTColorErr);							
				errorOccured = true;
			}	
			if ( $('#monogramTextField').val() == null || $('#monogramTextField').val().length < 2  || ! isAlphaNumeric($('#monogramTextField').val())) {
				
				pdp.functions.showErrorMessageToCustomer(pdp.errors.enterEBTextErr);
				errorOccured = true;
			}
			if ( errorOccured  )
				return;
				
			pdp.functions.removeErrorMessageToCustomer(pdp.errors.editMonogramErr, false);		
			productJSONObject.savedCatentryId = productJSONObject.selectedCatentryId;
			productJSONObject.savedFontSize = productJSONObject.selectFontSize;
			productJSONObject.savedHTColor = productJSONObject.selectHTColor;
			productJSONObject.savedEBColor = productJSONObject.selectEBColor;
			productJSONObject.savedMonogramText = $('#monogramTextField').val();
			$('#monogramText').html($('#monogramTextField').val());
			$('#monogramAction').html(pdp.objects.monogram.editMonogram+":");
			$("#pdp_monogram #popupHeader p").html(pdp.objects.monogram.editMonogram);
			$('#monogramRemoveAction').show();
			$('#monogramText').css({"display":"inline","font-weight":"700"});
			//$(".monogramArrow").addClass("hiddenItem");

			//Omniture Tracker
			pdp.functions.omnitureTracker('pdpSaveMonogram');

			$(pdp.canvas.overlayCloseDiv).click();

			pdp.functions.showOrHideInstorePickupOptions(pdp.functions.getSwatchObject(productJSONObject.selectedColorId),null);

		},
		selectStoreForPickup: function (){
			if ($('#pdpSavePick').hasClass('pdpDisableButton')) return;
			if( $('#instorePickupId').val() == ''){
				pdp.functions.showErrorMessageToCustomer(pdp.errors.inStorePickupSelectStoreErr);					
			}
			//pdp.functions.omnitureTracker('pdpSaveAndPickup');//For capturing Omniture.
			//addMiniCartPreloader(true);

			var postData =  {catEntryId_0: productJSONObject.instoreSizeId, catalogId: pdp.constants.catalogId,  storeId: pdp.constants.storeId, addressType : 'W', URL : pdp.options.SuccessView
				  ,primary : 0 , quantity_0 : $(pdp.canvas.quantityElem).find(".selected").attr("val"), calculateOrder : 1 };
			var addressObject  = productJSONObject.instorePickupJSON.addresses[ $(".label_radio.r_on input").val()];
			
			if ( addressObject != null ){
				postData.shipModeId = productJSONObject.instorePickupJSON.wspShipModeId;
				postData.firstName =  addressObject.firstName;
				postData.lastName = addressObject.lastName;
				postData.address1 = addressObject.address1;
				postData.address2 = addressObject.address2;
				postData.city = addressObject.city;
				postData.state = addressObject.state;
				postData.zipCode = addressObject.zipCode;
				postData.country = addressObject.country;
				postData.phone1 = addressObject.phone1;	
				postData.organizationName = addressObject.organizationName;
				postData.orgainizationUnitName = addressObject.organizationUnitName;
				postData.field1 = addressObject.addressId;
			//console.log(postData);
			}
			$.ajax({
				  type: "POST",
				  url:  pdp.functions.getBasePageURL() + pdp.options.orderItemUpdateCmd,
				  data: postData,
				  success: function (dataCheck) {				  		
				  		removeCartLimitErrorMessage();
						if(typeof(dataCheck.exception) != "undefined") {				
							addCartLimitErrorMessage();
							return;
						}
					  	pdp.functions.closePopup();					  	
					  	pdp.options.storePickup = true;						
						addMiniCartPreloader(true);
						createMiniCart(true, true);						
				  },
				  /*success: [
				  	pdp.functions.showAddtoCartSuccess,
				  	pdp.functions.closePopup()
				  	],*/
				  dataType: "json"
			});		

		},
		getInventoryStatus:function (swatchSize){
			var infoStatus = "";
			$(pdp.canvas.quantityElem).removeClass("disabled");
			$(pdp.canvas.selectedSizeInventory).attr("class","selection");
			if( !swatchSize.sellable ){
				// Display out of stock message
			   infoStatus = pdp.messages.inventoryOutOfStock;

			   $(pdp.canvas.selectedSizeInventory).addClass("outofstock");
			   $(pdp.canvas.quantityElem).addClass("disabled");

			}else 
				if ("yes" == swatchSize.isBackOrdered){
					infoStatus = "";

				}else 
					if( "true" == swatchSize.itemPreOrderEnable ){
						infoStatus = pdp.messages.inventoryPreOrder;
						$(pdp.canvas.selectedSizeInventory).addClass("preorder");
						// Display backordered message
					}else 
						if( swatchSize.inventory != null &&  swatchSize.inventory == 'true'){
							// Display in stock message
							infoStatus = pdp.messages.inventoryInStock;
							$(pdp.canvas.selectedSizeInventory).addClass("instock");
							

							

						}else 
							if( swatchSize.wsp ){
								// Display wsp message
								infoStatus = pdp.messages.inventoryOutOfStock;/*pdp.messages.inventoryWSP;*/
								$(pdp.canvas.selectedSizeInventory).addClass("outofstock");
								$(pdp.canvas.quantityElem).addClass("disabled");
							} else {
								// Display out of stock message
								infoStatus = pdp.messages.inventoryOutOfStock;
								$(pdp.canvas.selectedSizeInventory).addClass("outofstock");
								$(pdp.canvas.quantityElem).addClass("disabled");
							}
			if("true" == swatchSize.itemPreOrderEnable){
				var backDate = $.datepicker.parseDate("mm/dd/yy",  swatchSize.backOrderDate);
				infoStatus = '<span id="preOrderTxt">'+infoStatus + '</span> <span id="willShipTxt">'+ pdp.messages.willship + '</span> <span id="shipDateTxt">'+ $.datepicker.formatDate('M dd yy',backDate) + '</span>';
				$(pdp.canvas.selectedSizeInventory).addClass("preorder");
			}
			return infoStatus;
		},
		selectInstoreColor: function ( divId ){
			var splitId =divId.split("_")[1];
			
			var swatchObject = pdp.functions.getSwatchObject(splitId);
			var swatchOneSize = pdp.functions.getOneSizeFromSwatch(swatchObject);
			
			
			productJSONObject.instoreColorId = swatchObject.colorProductId;
			productJSONObject.instoreColorObject = swatchObject;
			$("#instoreSelectedColorText").html(swatchObject.name);

			if ( swatchOneSize){
				productJSONObject.instoreSizeId = swatchOneSize.catEntryId;
				$("#instoreSelectedSizeInventory").html(pdp.functions.getInventoryStatus(swatchOneSize));
				$('#selectSizeDiv').hide();
				$("#pdpSelectSQ .dropdown").css({"margin-right":"0px"});

			}else{
				pdp.functions.populateInstoreSizesForColor(swatchObject);	
				$("#instoreSelectedSizeInventory").html('');
			}
		},
		populateInstoreSizesForColor:function (swatchObject){
				if ( swatchObject.sizes != null && swatchObject.sizes.length > 0)
				{
					var selectedSize = '';
					if ( productJSONObject.instoreSizeName != null &&   productJSONObject.instoreSizeName != '' )
					{
						selectedSize = productJSONObject.instoreSizeName;
					}
					if ( selectedSize == '' ) 
					{
						selectedSize = $(pdp.canvas.sizeElem).find(".selected").html();
					}
					var sizePresent = false;
					for (var sizesItr = 0 ;  sizesItr < swatchObject.sizes.length ; sizesItr++ )
					{
						if ( selectedSize != '' && selectedSize == swatchObject.sizes[sizesItr].size )
						{
							sizePresent = true;
						}
					}
					
					if ( (swatchObject.sizes.length != 1)&&(swatchObject.sizes[0].size!="ONESIZE"))
					{
						$('#selectInstoreSizeDiv').show();
						$(pdp.canvas.inStorePickupSize).empty();
						$(pdp.canvas.inStorePickupSize).append('<li class="init selected" val="">Select Size</li>');
					}
					else
					{
						$('#selectInstoreSizeDiv').hide();
						return;
					}

					var selectedSizeObject = null;
			
		 				for (var sizesItr = 0 ;  sizesItr < swatchObject.sizes.length ; sizesItr++ )
						{
							if ( selectedSize != '' && selectedSize == swatchObject.sizes[sizesItr].size )
							{
								selectedSizeObject=swatchObject.sizes[sizesItr];
							}					
							$(pdp.canvas.inStorePickupSize).append('<li val="'+ 
								 swatchObject.sizes[sizesItr].catEntryId + '">' +
								  swatchObject.sizes[sizesItr].size + '</li>');		 			
		 				}
						
							if ( selectedSizeObject != null )
							{
							
								$(pdp.canvas.inStorePickupSize +" li.init").html(selectedSizeObject.size);
								if($(pdp.canvas.inStorePickupSize +" li.init").attr("data-value")){
									
									$(pdp.canvas.inStorePickupSize +" li.init").attr("data-value",selectedSizeObject.catEntryId)
								}
								else{
									$(pdp.canvas.inStorePickupSize +" li.init").val(selectedSizeObject.catEntryId);
								}						
							
							}
										
					
					
					$(pdp.canvas.inStorePickupSize +" li .init").unbind("click");
					$(pdp.canvas.inStorePickupSize).parent('div').unbind("mouseleave");
					$(pdp.canvas.inStorePickupSize +" li").unbind("click");
					
					
					pdp.functions.dropDownChange(pdp.canvas.inStorePickupSize);
					if ( selectedSizeObject != null && selectedSize != null  && selectedSize != '' )
					{
						pdp.functions.selectInstoreInventorySize(selectedSizeObject.catEntryId);
					}
					else
					{
						productJSONObject.instoreSizeId =  '';
					}
				}
		},
		showAddtoWishlistSuccess:function (json, selectedProductId, selectSizeId){
			var wishlistJSON = ""
			if ( json.success ) 
			{	
				var selectedSwatchObject = pdp.functions.getSwatchObject(selectedProductId);
				var selectedSizeObject = pdp.functions.getSizeObject(selectedSwatchObject,selectSizeId);
			
				wishlistJSON = "<li id ='prd1'  class='wishlist-product-item'><div class='wishlist-product-image'><img alt='Product Image' src='"
						+ pdp.functions.getImageURL(selectedSwatchObject, "_" + selectedSwatchObject.productColorString + "_a0" ,pdp.images.pd_bag)  
						+ "'></div><div class='product-desc'><div class='desc-top'><div class='prdStyleWishList'>STYLE NO."+productJSONObject.style
						+ "</div><div class='prdName'>"+ productJSONObject.productName 
						+ "</div><div class='prdColor'>COLOR: <font style='font-weight:bold'>"+ selectedSwatchObject.name +"</font></div> " ;
				if ( pdp.functions.getOneSizeFromSwatch(selectedSwatchObject) == null )
				{
						wishlistJSON = wishlistJSON + "<div class='title'>Size: "+ selectedSizeObject.size +"</div> " ;
				}
				//WCS-7327 Incorrect price on wishlist popup when Price is greater than 3 digits
				if(productJSONObject.selectedColorObject.unitPrice != null && productJSONObject.selectedColorObject.unitPrice != ''){
					var wishListPrice1= (((productJSONObject.selectedColorObject.unitPrice).replace("$", "")).replace(",",""));
					var wishListPrice2= (parseFloat(wishListPrice1)).toFixed(2);

				}
				wishlistJSON = wishlistJSON +  "<div class='prdQty'>QTY: <font style='font-weight:bold'>"+ $(pdp.canvas.quantityElem).find(".selected").attr("val") 
						+ "</font></div></div><div class='wislist-desc-bottom'><div class='prdPrice'>" 
						+ "$"+wishListPrice2
						+ "</div> </div></div></li>";

				$('#wishlistContent').empty();
				$('#wishlistContent').html(wishlistJSON);
				$("#add-to-wishlist-overlay").dialog('open');
			}
		},
		buildFBLike: function() {
			var fbAppId = '139745982760837';//PDC-US
			var fbLikeURL = pdp.functions.getBasePageURL() + "Product-" 
					+ productJSONObject.productName.replace(/ /g, "_").toLowerCase()
					+ "-" + pdp.constants.storeId + "-" + pdp.constants.catalogId
					+ "-" + productJSONObject.style + "-en?cid=SMCO0001";
					//cs="
					//+ productJSONObject.selectedProductColorString;

			/*window.fbAsyncInit = function() {
				FB.init({appId: fbAppId, status: true, cookie: true, xfbml: true, channelUrl: '/wcsstore/Coach_US/channel.html'});
				FB.Event.subscribe('edge.create', function (href, widget, response){
						pdp.functions.omnitureTracker("pdpFBLike");
					});
			};*/
			$("#fbLike").attr("href", fbLikeURL);
		},
		openPinterest: function() {
			var pinterestURL = pdp.functions.getBasePageURL() + "Product-" 
					+ productJSONObject.productName.replace(/ /g, "_").toLowerCase()
					+ "-" + pdp.constants.storeId + "-" + pdp.constants.catalogId
					+ "-" + productJSONObject.style + "-en?cs="
					+ productJSONObject.selectedProductColorString
					+ encodeURIComponent("&")+"cid=Z_Pinsharedtools2";
			var prdName = "The " + capitaliseFirstLetter(productJSONObject.productName) + " from Coach";
			var prdImgURL = "http://s7d2.scene7.com/is/image/Coach/" + productJSONObject.style.toLowerCase() + "_"+productJSONObject.selectedProductColorString + "_a0";
			
			//<c:out value="${jsonProduct.styleNumber}" />_<c:out value="${productColorCode}" />_a0?
			window.open("http://pinterest.com/pin/create/button/?url=" + pinterestURL + "&description=" + encodeURIComponent(prdName) + "&media=" + prdImgURL, '_blank');
			// Omniture tracker
			pdp.functions.omnitureTracker("pdpPinterest");
		},
		
		buyableFlagChanges: function(){
			productJSONObject.notBuyableProductFound = true;
			$("#pdpReviews").css("display","none");
			$("#BVRRContainer").css("display","none");
			$("#pdpAddToCartLink").addClass('pdpDisableButton').removeClass('pdpDarkButton'); 
			$("#wishlistButton").addClass('pdpLightDisableButton').removeClass('pdpLightButton');
			$("#monoButton").hide();
			$("#pdpAddToBagText").hide();
			$("#pdpCurrentlyUnavailableText").show();
			$("#pdpSelectSQ .dropdown").hide();
			$("#sizeChartAccordion").css({"margin-right":"77%"});
			$("#storePickupAccordion").addClass('storePickupDisabled').removeClass('storePickup');
			$("#wspDiv").attr("href", "#");
		},
		
		omnitureTracker: function(eName) {
			if(eName.nodeType == 1) {
				eName = eName.id;
			}
			//s = s_gi(s_account);
			switch (eName) {
				case "onLoad":
					var s = window.s;
					s.linkTrackVars = "prop1,prop1,prop3,prop4";
					s.events = "prodView,event12";
					s.products = ";" + productJSONObject.style;
					s.pageName = "product detail";
					s.prop1 = "product detail";
					s.prop2 = "product detail";
					s.prop3 = "product detail";
					s.prop4 = "product detail";
					s.t();
					// SKU View Custom Link
					s.linkTrackVars = "events,products";
					s.linkTrackEvents = "event24";
					s.events = "event24";
					//WCS 7924
					if (null != $(pdp.canvas.preOrderTxt).html()){
						s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedProductColorString+";;;;"+"eVar21="+$(pdp.canvas.preOrderTxt).html();
					}else{
						s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedProductColorString+";;;;"+"eVar21="+$(pdp.canvas.selectedSizeInventory).html();
					}
					//WCS 7924
					s.tl(true,"o","SKU View");
					break;
				case "swatchColorClick":
					var s = window.s;
					s.linkTrackVars = "events,products";
					s.linkTrackEvents = "event24,event19";
					//WCS 7924
					if (null != $(pdp.canvas.preOrderTxt).html()){
						s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedProductColorString+";;;;"+"eVar21="+$(pdp.canvas.preOrderTxt).html();
					}else{
						s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedProductColorString+";;;;"+"eVar21="+$(pdp.canvas.selectedSizeInventory).html();
					}
					//WCS 7924
					s.pageName = "product detail";
					s.events = "event24,event19";
					s.tl(true,"o","SKU View");
					break;
				case "pdpDesc":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc expand description";
					s.prop13 = "pdc expand description";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpViewDetailsLink":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc view details link";
					s.prop13 = "pdc view details link";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpDetails":
					var s = window.s;	
					s.linkTrackVars = "events,products,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc expand details";
					s.prop13 = "pdc expand details";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpReviews":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc expand reviews";
					s.prop13 = "pdc expand reviews";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpAddToCartIsFirstIn":
					var s = window.s;
					s.linkTrackVars = "events,products";
					s.linkTrackEvents = "scAdd,scOpen";
					s.events = "scAdd,scOpen";
					s.products = ";" + productJSONObject.style;//<insert style #>
					s.pageName = "product detail";
					s.tl(true,"o","Site Content Click");
					s.linkTrackEvents = "event25";
					s.events = "event25";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;//<insert style-color>
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpAddToCart":
					var s = window.s;
					s.linkTrackVars = "events,products";
					s.linkTrackEvents = "scAdd";
					s.events = "scAdd";
					s.products = ";" + productJSONObject.style;//<insert style #>
					s.pageName = "product detail";
					s.tl(true,"o","Site Content Click");
					s.linkTrackEvents = "event25";
					s.events = "event25";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;//<insert style-color>
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpAddToCartWspIsFirstIn":
					var s = window.s;
					s.linkTrackVars = "products,events";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "scAdd,scOpen,event22";
					s.events = "scAdd,scOpen,event22"
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpAddToCartWsp":
					var s = window.s;
					s.linkTrackVars = "products,events";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "scAdd,event22";
					s.events = "scAdd,event22"
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpAddToWishlist":
					var s = window.s;
					s.linkTrackVars = "events,products";
					s.linkTrackEvents = "event1";
					s.events = "event1";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;//<insert style-color>
					s.pageName = "product detail";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpFBLike":
					var s = window.s;
					s.linkTrackVars = 'products,pageName'; 
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "event43";
					s.events = "event43";
					s.tl(true,"o","Facebook Like");
					break;
				case "pdpPinterest":
					var s = window.s;
					s.linkTrackVars = 'products,pageName';
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "event42";
					s.events = "event42";
					s.tl(true,"o","Pinterest");
					break;
				case "pdpTwitter":
					var s = window.s;
					s.linkTrackVars = 'products,pageName';
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "event35";
					s.events = "event35";
					s.tl(true,"o","Twitter");
					break;
				case "pdpEmail":
					var s = window.s;
					s.linkTrackVars = "products,pageName";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "event2";
					s.events = "event2";
					s.tl(true,"o","Email");
					break;
				case "pdpPrint":
					var s = window.s;
					s.linkTrackVars = 'products,pageName';
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "event3";
					s.events = "event3";
					s.tl(true,"o","Print");
					break;
				case "pdpCrossSell":
					var s = window.s;
					s.linkTrackVars = 'events,eVar19,eVar20';
					s.linkTrackEvents = "event41";
					s.eVar19 = productJSONObject.style+"-"+productJSONObject.selectedColorCode;//<insert-style-color-size>
					s.eVar20 = "product detail page";
					s.events = "event41";
					s.pageName = "product detail";
					s.tl(true,"o","CrossSellLink");
					break;
				case "pdpRecentlyViewed":
					var s = window.s;
					s.linkTrackVars = "events,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.eVar13 = "pdc recently viewed";
					s.prop13 = "pdc recently viewed";
					s.events = "event23";
					s.pageName = "product detail";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpSizeChart":
					var s = window.s;
					s.linkTrackVars = "products,events,eVar13,prop13";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "event23";
					s.eVar13 = "pdc size chart";
					s.prop13 = "pdc size chart";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpStorePickUpLink":
					var s = window.s;	
					s.linkTrackVars = "events,products,eVar13,prop13";	
					s.linkTrackEvents = "event23";	
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc expand store find";
					s.prop13 = "pdc expand store find";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpStoreFindBtn":
					var s = window.s;
					s.linkTrackVars = "products,events";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.linkTrackEvents = "event21";
					s.events = "event21"
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpViewFullScreen":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc main image full screen";
					s.prop13 = "pdc main image full screen";
					s.events = "event23";
					s.tl(true,'o','Site Content Click');
					break;
				case "pdpAlternateImg":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc alt image full screen";
					s.prop13 = "pdc alt image full screen";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpFlyoutZoom":
					var s = window.s;
					s.linkTrackVars = "events,products";
					s.linkTrackEvents = "event20";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.events = "event20";
					s.tl(true,"o","Zoom Click");
					break;
				case "pdpAddMonogram":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc add monogram";
					s.prop13 = "pdc add monogram";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpSaveMonogram":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar23";
					s.linkTrackEvents = "event36";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar23 = productJSONObject.selectedColorCode + "-" + productJSONObject.savedHTColor + "-" + productJSONObject.savedEBColor;
					s.events = "event36";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpRemoveMonogram":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar23";
					s.linkTrackEvents = "event37";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar23 = "no monogram";
					s.events = "event37";
					s.tl(true,"o","Site Content Click");
					break;
				case "monoPopHelperTitle":
					var s = window.s;
					s.linkTrackVars = "events,products,eVar13,prop13";
					s.linkTrackEvents = "event23";
					s.products = ";" + productJSONObject.style+"-"+productJSONObject.selectedColorCode;
					s.pageName = "product detail";
					s.eVar13 = "pdc learn about monogramming";
					s.prop13 = "pdc learn about monogramming";
					s.events = "event23";
					s.tl(true,"o","Site Content Click");
					break;
				case "pdpBackToTop":
					var s = window.s;
					s.linkTrackVars = 'events,eVar13,prop13';
					s.linkTrackEvents = 'event23';
					s.eVar13 = 'back to top';
					s.prop13 = 'back to top';
					s.events = 'event23';
					s.pageName = "product detail";
					s.tl(true,'o','Site Content Click');
					break;	
				default:
					//alert('testOmni');
			}
		},
		fullScreenSwipe:function(event, direction){
			switch (direction){
				case "right" :
					$(pdp.canvas.fullScreenMainImage).parent().find("#full-carousel img.selected").parent("li").prev().find("img").click();
					break;
				case "left":
					$(pdp.canvas.fullScreenMainImage).parent().find("#full-carousel img.selected").parent("li").next().find("img").click();
					break;
			}
			pdp.functions.setupFullScreenCarousel(pdp.objects.currentItems.currentCarouselItems);
		},
		fullPageCarouselSwipe:function(event, direction){
			switch (direction){
				case "left" :
					if($("#carousel-right").length>0) $("#carousel-right").click();
					break;
				case "right" :
					if($("#carousel-left").length>0) $("#carousel-left").click();
					break;
			}
			pdp.functions.setupFullScreenCarousel(pdp.objects.currentItems.currentCarouselItems);
		},
		getStaticScript:function(fileUrl, runOnComplete){
			$.ajax({
				  type: "GET",
				  cache : true,
				  dataType: "script",
				  url: fileUrl,
				  complete: runOnComplete
			})
		},
		resetProdGridHeight:function(e){	
			if(pdp.objects.currentItems.fullPageActive!==true){
				if ($("#pdp-left").height()>$(".prod_desc_container").height()){
					if ( $.browser.msie && $.browser.version<=8)
						{
						$("#wrapper_container").height($("#pdp-left").height()+$("#pdp-top").height()+9);
						}
					else{
						$("#wrapper_container").height($("#pdp-left").height()+$("#pdp-top").height()+11);
						}
				}else{
					$("#wrapper_container").height($(".prod_desc_container").height()+$("#pdp-top").height()+18);
				}
				pdp.browser.fullPageCloseHeight = $("#wrapper_container").height();
			}
		},
		styleProductName: function(){
			var firstW = $("h1:[itemprop='name']").text().split(" ", 1);
			var restStr = $.trim(($("h1:[itemprop='name']").text()).replace(firstW, "")).toLowerCase().toString().replace("ipad", "iPad").toString().replace("iphone", "iPhone");
			var secondLineStr = restStr.toString().split(/\bin\b/, 1);
			var thirdLineStr = $.trim(restStr.toString().replace(secondLineStr, ""));

			$("h1:[itemprop='name']").empty();
			$("h1:[itemprop='name']").html("<span class='firstW'>"+firstW.toString().toUpperCase()+"</span><span class='secondLineText'>"+secondLineStr+"</span><span class='thirdLineText'>"+thirdLineStr+"</span>");
		},
		domReadyInitItems:function(){
				setInterval(pdp.functions.resetProdGridHeight,1000);

				pdp.functions.buildAccordion(".pdExpand", true);
				pdp.functions.buildAccordion("#monoPopHelper", false);


				$("#wishlistButton").on({click:function(){pdp.functions.processAddItemToWishlist(pdp.options.wwcmStoreId,pdp.options.wwcmCatalogId)}});
				$("#pdpAddToCartLink").on({click:function(){pdp.functions.addItemToCart(pdp.options.wwcmStoreId,pdp.options.wwcmCatalogId)}});
				$(".pdSwatch").on({click:function(){
					pdp.functions.selectColor($(this).parent("div").attr("id"));

					$("img.lazy:not(#m-imageBox img.lazy)").lazyload({threshold : 300,effect : "fadeIn",load:function(){window.setTimeout('pdp.functions.resetSizesTimeout()',50)}}); //lazy loading JSON images on click of the Swatch
					
					if(pdp.images.mImageLength>1){
						$("m-imageBox img:last-child").load(pdp.functions.slideMImage(0,1500))
						$("#m-imageBox img.lazy").lazyload({threshold : 300,load:pdp.functions.resetSizes()})
					}
					else{$("#m-imageBox img.lazy").lazyload({threshold : 300,effect : "fadeIn",load:pdp.functions.resetSizes()})}
				}})

				$("#monogramSaveAction").on("click",function(e){ pdp.functions.saveMonogramInformation()});
				$("#monogramRemoveAction").on("click",function(e){ pdp.functions.removeMonogram()});

				$("#pdpPintBtn").on("click",function(e){ pdp.functions.openPinterest()});
				$("#pdpTwitterBtn").on("click",function(e){ openTwitter(productJSONObject.style, productJSONObject.productName)});
				$("#shareEmailBtn").on("click",function(e){ pdp.functions.processEmail()});
				$("#sharePrintBtn").on("click",function(e){ pdp.functions.processPrint()});
				$("#productSuggestContent").on("click",function(e){ pdp.functions.omnitureTracker('pdpCrossSell')});	
				$("#viewDetails").on("click",function(e){ pdp.functions.omnitureTracker('pdpViewDetailsLink')});				
				$("#recentlyViewedItemsContent").on("click",function(e){ pdp.functions.omnitureTracker('pdpRecentlyViewed')});
				$("#sizeChartAccordion a").on("click",function(e){ pdp.functions.omnitureTracker('pdpSizeChart')});
				$("#storePickupAccordion a").on("click",function(e){ $(pdp.canvas.inStorePickupState+" .init").html("SELECT STATE").attr("data-value",""); pdp.functions.contentScroll(pdp.canvas.inStorePickupState);pdp.functions.dropDownChange(pdp.canvas.inStorePickupState);  pdp.functions.omnitureTracker('pdpStorePickUpLink')});
				$("[href='#pdp_monogram']:contains('ADD A MONOGRAM')").on("click",function(e){ pdp.functions.omnitureTracker('pdpAddMonogram')});
				$("#swatchImgContainer").on("click",function(e){ pdp.functions.omnitureTracker('swatchColorClick')});

				$("#pdpPickupCancel").on("click",function(e){ pdp.functions.showInstoreSearchOptions(); removeCartLimitErrorMessage();enablePdpButton();});
				$("#pdpSearchAgain").on("click",function(e){ pdp.functions.showInstoreSearchOptions()});
				$("#pdpSavePick").on("click",function(e){ pdp.functions.selectStoreForPickup(pdp.constants.storeId,pdp.constants.catalogId,pdp.constants.langId)});

				/* the following was already commented out in USProductDetailsWrapper.jsp - and can be un-commented if required to add the same functionality without onClick methods
				$("#selectStoreForPickup").on("click",function(e){ pdp.functions.selectStoreForPickup(pdp.constants.storeId,pdp.constants.catalogId,pdp.constants.langId)});
				$("#pdpFetchStoresButon").on("click",function(e){ pdp.functions.fetchStoresForCatentry(pdp.constants.storeId,pdp.constants.catalogId,pdp.constants.langId)});
				*/
				$("#showWishList").on("click",function(e){ pdp.functions.showWishlist('MyAccountView?storeId='+pdp.constants.storeId+'&catalogId='+pdp.constants.catalogId+'&langId='+pdp.constants.langId+'&expandWishlist=1')});

				$('a[rel*=leanModal]').leanModal({ top : 100, closeButton: ".modal_close" });

				for (i=0;i<productJSONObject.swatchGroup.swatches.length;i++){
					pdp.objects.prodGroups.push(productJSONObject.swatchGroup.swatches[i]);
					if (productJSONObject.swatchGroup.swatches[i].colorProductId==productJSONObject.defaultColorId) {
						pdp.objects.swatches=productJSONObject.swatchGroup.swatches[i];
/*
						pdp.objects.currentItems.productId=productJSONObject.swatchGroup.productId;
						pdp.objects.currentItems.colorId=productJSONObject.defaultColorId;
						pdp.objects.currentItems.hasMonogram=productJSONObject.isMNDisplayMonogram;
						pdp.objects.currentItems.isNew=productJSONObject.isNew;
						pdp.objects.currentItems.isWishlistItem=productJSONObject.isWSPAvailable;
						pdp.objects.currentItems.colorCode=productJSONObject.selectedColorCode;
						pdp.objects.currentItems.hasSizeChart=productJSONObject.isPTRStyle;
*/
					}
				}

				$('#monogramTextField').keydown(function(event) {return pdp.functions.monogramTextKeyDown(this,event);});    
				$('#monogramTextField').keyup(function(event) {	return pdp.functions.monogramTextKeyUp(this,event);	});      
				$("#storePickupAccordion a").on("click",function(){ pdp.functions.showInstoreSearchOptions(); });

					//pdp.functions.changeCommonSelectedSwatches(pdp.objects.swatches.colorProductId);
					//pdp.functions.setupSelectedClasses("#instoreSwatchImgContainer div");
				
				$("#monogramAction").on("click",function(){							
					//pdp.functions.removeErrorMessageToCustomer(pdp.errors.editMonogramErr, false);
					
					if(productJSONObject.savedCatentryId != pdp.objects.swatches.colorProductId) {					 
						productJSONObject.selectEBColor = null;
						productJSONObject.savedEBColor = null;
					}
					pdp.functions.displayMonogramOptions();							
					});
				
			 	$("#pdpFetchStoresButon").on("click", function(){
			 		pdp.functions.fetchStoresForCatentry(pdp.constants.storeId,pdp.constants.catalogId,pdp.constants.langId)
			 	});

			    pdp.functions.setupFullScreenView();
			    /*WCS-4114*/
			    pdp.functions.sizeChartToggle();
			    pdp.functions.setupAddToWishListOverlay();

				if(pdp.objects.currentItems.fullPageActive!==true) pdp.functions.resetSizesTimeout();
	
				$("#add-to-wishlist-overlay").mouseenter(function() {
					insidePopup = true;
					clearTimeout(thisTimer);
				}).mouseleave(function() {
					insidePopup = false;
					clearTimeout(thisTimer);
					thisTimer = setTimeout(function() {
								if(!insidePopup) {
									$("#add-to-wishlist-overlay").dialog("close");
								}
								clearTimeout(thisTimer);
							}, timeoutTime);
				});
				$('#backtotop').on({"click":function(){
					$('html, body').animate({ scrollTop: 0 }, 800);
					pdp.functions.omnitureTracker("pdpBackToTop");
				}})
		  		$(window).on({
		  			"scroll": function(){
			            if ($(window).scrollTop() > 300) {
			                $('#backtotop').fadeIn();
			            } else {
			                $('#backtotop').fadeOut();
			            }
			        }
		        }); 
			if ( $.browser.msie && $.browser.version<=8) $("html, body").animate({ scrollTop: 1 }, "fast");
			var resizeTimer;
			$(window).on({
				"resize":function() {
					if($(pdp.canvas.hideOnFullScreen).css("display")!="block"){$("#wrapper_container").height($(document).width()+140);}
					if(pdp.objects.currentItems.fullPageActive!==true) window.setTimeout("pdp.functions.resetSizes()", 200);//pdp.functions.resetSizes();
					/*
				    clearTimeout(resizeTimer);
				    resizeTimer = window.setTimeout("pdp.functions.resetSizes()", 100);
					//pdp.functions.resetSizes();
					//console.log("Window Resize fired...");				
					*/
				},
				"orientationchange": function(event) {
  					//alert('new orientation:' + event.orientation);
  					if($(pdp.canvas.hideOnFullScreen).css("display")!="block"){$("#wrapper_container").height($(document).width()+140);}
					if(pdp.objects.currentItems.fullPageActive!==true) window.setTimeout("pdp.functions.resetSizes()", 200);//pdp.functions.resetSizes();
  					pdp.functions.addTouchFlyoutZoom();
				}
			});

		},
		windowLoadInitItems:function(){

		    $("#productStyle").val(pdp.options.productStyle);
		    $("#productColorCode").val(pdp.options.productColorCode);
		    $("#productColor").val(pdp.options.productColor);

			if (typeof showBVReviewsForProduct === 'function') showBVReviewsForProduct(pdp.options.bundleId); // this is a function from another JS... TODO: move this back to JSP
			
			
			//pdp.functions.addProductToCookie( productJSONObject.styleId, productJSONObject.selectedColorId, productJSONObject.selectedPartNum); //TODO: Veera: this works, function is broken/doesn't add
			//pdp.functions.fetchAndDisplayRecentlyViewItems($('#recentlyViewedItemsContent'), pdp.options.wwcmStoreId, pdp.options.wwcmCatalogId);
			var resizeTimer;
			$(window).on({
				"resize":function() {
					if($(pdp.canvas.hideOnFullScreen).css("display")!="block"){$("#wrapper_container").height($(document).width()+140);}
					if(pdp.objects.currentItems.fullPageActive!==true) window.setTimeout("pdp.functions.resetSizes()", 200);//pdp.functions.resetSizes();
					/*
				    clearTimeout(resizeTimer);
				    resizeTimer = window.setTimeout("pdp.functions.resetSizes()", 100);
					//pdp.functions.resetSizes();
					//console.log("Window Resize fired...");				
					*/
				},
				"orientationchange": function(event) {
  					//alert('new orientation:' + event.orientation);
  					if($(pdp.canvas.hideOnFullScreen).css("display")!="block"){$("#wrapper_container").height($(document).width()+140);}
					if(pdp.objects.currentItems.fullPageActive!==true) window.setTimeout("pdp.functions.resetSizes()", 200);//pdp.functions.resetSizes();
  					pdp.functions.addTouchFlyoutZoom();
				}
			});


			
			pdp.tempMessage = pdp.tempMessage + " setting the dropdownch in product js " ;
			//pdp.functions.dropDownChange(pdp.canvas.sizeElem);
			
			$(pdp.canvas.popupCloseButton).click(function(){pdp.functions.closePopup()});
			//$(pdp.canvas.instorePickupLink).click(function(){$(pdp.canvas.inStoreDesc).html('').html(pdp.constants.inStorePickupTxt)}); //inserting Description On click
			
			//pdp.functions.fetchAndDisplayRecentlyViewItems($('#recentlyViewedItemsContent'), pdp.options.wwcmStoreId, pdp.options.wwcmCatalogId);

			if ( $.browser.msie && $.browser.version<=8) $("html, body").animate({ scrollTop: 0 }, "fast");
			if(pdp.objects.currentItems.fullPageActive!==true) pdp.functions.resetSizesTimeout();
			//pdp.functions.resetSizes()
		}
		//end of pdp.functions
	}
}

/************************************************************************************************************************************************/
/*
	THE FOLLOWING IS EXECUTED BEFORE DOM IS LOADED - THIS IS ONE OF 3 SECTIONS WHERE JS STAGGERING CAN BE DONE.
*/
	$("html").attr("id","pdp_page");
	pdp.functions.getStaticScript("/wcsstore/Coach_US/scripts/modernizr.min.js",function(){
		pdp.options.noTouch = !Modernizr.touch; //!(("ontouchstart") in window);
	  	if (!pdp.options.noTouch){
			pdp.functions.getStaticScript("/wcsstore/Coach_US/scripts/jquery.touchSwipe.min.js",function(){
				$(pdp.canvas.fullScreenMainImage).swipe({swipeLeft:pdp.functions.fullScreenSwipe, swipeRight:pdp.functions.fullScreenSwipe, allowPageScroll:"vertical", threshold:200});
				$(pdp.canvas.fullScreenCarouselContent).swipe({swipeLeft:pdp.functions.fullPageCarouselSwipe, swipeRight:pdp.functions.fullPageCarouselSwipe});
			});
	  	} 
		pdp.functions.prepopulateAllImages();
	});

/*
	THE FOLLOWING IS EXECUTED AFTER THE DOM IS LOADED (ALL HTML IS LOADED, ALL ASSETS, IMAGES, JS MAY NOT YET BE LOADED)
*/
$(document).ready(function(e){ //begin DOM ready events - .ready()
	pdp.functions.styleProductName();
	pdp.functions.domReadyInitItems(); // all .ready() items to be initialized can be placed in this function

	pdp.functions.getStaticScript("/wcsstore/Coach_US/scripts/jquery.lazyload.min.js",function(){
		$("img.lazy:not(#m-imageBox img.lazy)").lazyload({threshold : 300,skip_invisible: false,effect : "fadeIn",load:pdp.functions.resetSizes()})
		
		if(pdp.images.mImageLength>1){
		$("m-imageBox img:last-child").load(pdp.functions.slideMImage(0,1500))
		$("#m-imageBox img.lazy").lazyload({threshold : 300, skip_invisible: false, load:pdp.functions.resetSizes()})
	}
	else{$("#m-imageBox img.lazy").lazyload({threshold : 300, skip_invisible: false, effect : "fadeIn",load:pdp.functions.resetSizes()})}
		
	});
	pdp.functions.setupSwatchHoverEffects("#swatchImgContainer>div");
			/*IN ORDER TO PREVENT FAST USER CLICKS moving from .load to .ready*/
			$(pdp.canvas.monogramLink).click(function(){pdp.functions.addMonoLayout(productJSONObject.mnGroup.mnHtColor)}); 
			
			pdp.functions.dropDownChange(pdp.canvas.inStorePickupRange);
			
			pdp.functions.dropDownChange(pdp.canvas.inStorePickupSize);
			
					/*pdp.functions.dropDownChange(pdp.canvas.sizeElem);*/
					pdp.functions.dropDownChange(pdp.canvas.quantityElem);

}); // end of DOM ready event - .ready()
/*
	THE FOLLOWING IS EXECUTED AFTER EVERYTHING IS LOADED (ALL HTML, ALL ASSETS, IMAGES AND JS HAS BEEN LOADED)
*/
$(window).load(function(e){
	pdp.functions.omnitureTracker("onLoad");
	pdp.functions.buildFBLike();
	pdp.functions.windowLoadInitItems();
	//pdp.functions.resetSizes();
	//if(!pdp.options.noTouch) alert($(window).width());
})
/*
Following are GWT Specific functions needed for PDP page
*/
function errorAddtoWishlistSuccess( jqXHR,  textStatus,  errorThrown)
{
	alert(textStatus);
}

function addItemToWishlist()
{
	if ( ! pdp.functions.validateItemInfo())
		return true;
	var postData =  {catEntryId: productJSONObject.selectedSizeId, catalogId: pdp.constants.catalogId, 
		storeId: pdp.constants.storeId, URL: pdp.options.SuccessView, quantity: $(pdp.canvas.quantityElem).find(".selected").attr("val"), listId: '.'};
	var selectedCatentryId = productJSONObject.selectedSizeId;
	var selectedProductId= productJSONObject.selectedColorId;
	$.ajax({
		  type: "POST",
		  url: pdp.functions.getBasePageURL() + pdp.options.InterestItemAddCmd,
		  data: postData,
		  success: function(data){ pdp.functions.showAddtoWishlistSuccess(data,selectedProductId, selectedCatentryId);pdp.functions.omnitureTracker("pdpAddToWishlist"); },
		  error: errorAddtoWishlistSuccess,
		  dataType: "json"  	
	});
	
}

$( "#wspDiv" ).click(function() {
	if(!productJSONObject.notBuyableProductFound){
		removeCartLimitErrorMessage();
  		enablePdpButton();
	} 
});

/*
END of GWT Specific functions needed for PDP page
*/