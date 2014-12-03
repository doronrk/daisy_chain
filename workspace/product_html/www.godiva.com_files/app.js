/*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded. 
 */
// semi-colon to assure functionality upon script concatenation and minification
; 
  
// if jQuery has not been loaded, load from google cdn
if (!window.jQuery) {
	var s = document.createElement('script');
	s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
	s.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
}

var app = (function (app, $) {
	document.cookie="dw=1";
	/******** private functions & vars **********/
	
	// cache dom elements accessed multiple times
	// app.ui holds globally available elements
	function initUiCache() {
		app.ui = {
			searchContainer 		: $("#navigation .header-search-block"),
			printPage				: $("a.print-page"),
			reviewsContainer		: $("#pwrwritediv"),
			main					: $("#main"),
			primary					: $("#primary"),
			secondary				: $("#secondary"),
			modalLink				: $("a.modal-link"),
			removeProduct			: $("a.removeProduct"),
			personalizedRibbonMsg	: $('.customizedRibbonMessageDialog'),
			headerPromoModalLink	: $("#top-menu-bg .homeassetdetails a")
		};		
	}

	
	
	/*
	   **  Returns the caret (cursor) position of the specified text field.
	   **  Return value range is 0-oField.length.
	   */
	   function doGetCaretPosition (oField) {
	 
	     // Initialize
	     var iCaretPos = 0;
	 
	     // IE Support
	     if (document.selection) { 
	 
	       // Set focus on the element
	       oField.focus ();
	 
	       // To get cursor position, get empty selection range
	       var oSel = document.selection.createRange ();
	 
	       // Move selection start to 0 position
	       oSel.moveStart ('character', -oField.value.length);
	 
	       // The caret position is selection length
	       iCaretPos = oSel.text.length;
	     }
	 
	     // Firefox support
	     else if (oField.selectionStart || oField.selectionStart == '0')
	       iCaretPos = oField.selectionStart;
	 
	     // Return results
	     return (iCaretPos);
	   }
	 
	 
	   /*
	   **  Sets the caret (cursor) position of the specified text field.
	   **  Valid positions are 0-oField.length.
	   */
	   function doSetCaretPosition (oField, iCaretPos) {
	 
	     // IE Support
	     if (document.selection) { 
	 
	       // Set focus on the element
	       oField.focus ();
	 
	       // Create empty selection range
	       var oSel = document.selection.createRange ();
	 
	       // Move selection start and end to 0 position
	       oSel.moveStart ('character', -oField.value.length);
	 
	       // Move selection start and end to desired position
	       oSel.moveStart ('character', iCaretPos);
	       oSel.moveEnd ('character', 0);
	       oSel.select ();
	     }
	 
	     // Firefox support
	     else if (oField.selectionStart || oField.selectionStart == '0') {
	       oField.selectionStart = iCaretPos;
	       oField.selectionEnd = iCaretPos;
	       oField.focus ();
	     }
	   }
	  
	   //Code for opening up a modal to show the product piece count

	   $("#getProductPieces").live("click", function(e){
		    //Prevent normal form submission
		    e.preventDefault();
		    var productId = $(this).attr('productid');
		    var piececount = app.urls.piececount;
		    var data = 'format=ajax' + '&productId='+productId;
		    $.ajax({
				url: piececount,
				data: data,
				method: "POST",
				dataType:"html"
			}).success(function(response){
				var data = $(response);
				var ajaxResponse = data.filter("#allpieces").html();
				$('#truffles-overlay').html(ajaxResponse);
				 jQuery('#truffles-overlay').dialog({
						bgiframe: true,
						autoOpen: false,
						modal: true,
						overlay: {
				    		opacity: 0.5,
				     		background: "black"
						},
				    	height: 600,
				    	width: 640,
				    	resizable: false
					});
					 jQuery("#truffles-overlay").dialog('open');
							 jQuery('.carouseldiv ul').carouFredSel({
							width: "518px",
							align: "left",
							height: "600px",
							auto    : false,
							items: {
								visible: 1,					
							},
							
						});
							 var carouselPos = jQuery(this).parent().find('.zoomCountID').text();				 
							 carouselPos=parseInt(carouselPos);				
							 jQuery(".carouseldiv ul").trigger("slideTo",carouselPos);
				/*eval($('#couponAjax #sandeep').text());
				$('.view-all,.dialogify,.resetAll,a.modal-link').css('pointer-events','auto').css('cursor','pointer');*/
				setupLabel();
			});
		});
	   
		   $("#truffle_next").live("click", function(e){ 
           jQuery(".carouseldiv ul").trigger("next");
         	return false ;
      	});
		   $("#truffle_prev").live("click", function(e){ 
          	 
          	jQuery(".carouseldiv ul").trigger("prev");
          	return false ;
       	});
	   
	   //Code for opening up a modal to show the product piece count
	   
	// Code for adding product to cart from add to bag icon.
		
		  $(".addtobagicon").live("click",function(e){
				
				var pid = $(this).parents(".product-tile").attr("data-itemid");
				var qty = 1;

				reqURL = app.util.appendParamsToUrl(app.urls.addProduct, {pid:pid,Quantity:qty,format:"ajax"});
		
				$.ajax(reqURL, {
					 type: "POST",
			           cache: false
				   	}).success(function(response){
				   		if($(".recommendationcheckoutscroll").find(".addtobagicon").length>0)
				   			{
				   				window.location.href=app.urls.cartShow;
				   			}
				   		else
				   			{
				   				app.minicart.show(response);
				   			}
				   	});
				 
			});
		  
		  
		// Code for adding product to cart from add to bag icon.
			
		  $(".addtobagbuttonmobile").live("click",function(e){
				
				var pid = $(this).parents(".product-tile").attr("data-itemid");
				var qty = 1;

				reqURL = app.util.appendParamsToUrl(app.urls.addProduct, {pid:pid,Quantity:qty,format:"ajax"});
		
				$.ajax(reqURL, {
					 type: "POST",
			           cache: false
				   	}).success(function(response){
				   		app.minicart.show(response);
				   	});
				 
			});	  
		  
	// Code for opening popup of video
		  
		  $(".thumbnail-link-video").click(function(e){
				app.dialog.popupVideo(this);
				return false;
			});
		  $(".truffle-video-popup").click(function(e){
				app.dialog.TrufflepopupVideo(this);
				return false;
			});
			
			
	// Code for sorting on addresses page in my account
			
			  $("#sortAddress").change(function(e){
				  
				  if($(this).val()!='0')
					{
					  window.location.href= app.util.appendParamsToUrl(app.urls.sortAddresses, {sortBy:$(this).val()});
					}
			});
			  
			  
	// Code for getting stores on store dropdown change.
				
			  $(".stateselectstorelocator").on("change",function(e){
					
					var state = $(this).val();
			
					 if(state!='')
					 {
						 window.location.href= app.util.appendParamsToUrl(app.urls.getStores, {stateCode:state});
					 }
					 
				});	
			  
		// Code for opening store landing page.
				
			  $(".findboutiquepdp").live("click",function(e){
					
				  window.location.href= app.urls.openboutiquefinder;
					 
				});		  
	

	function initializeEvents() {
		var controlKeys = ["8", "13", "46", "45", "36", "35", "38", "37", "40", "39"];
		// apply dialogify event handler to all elements that match
		// one or more of the specified selectors
		$("body").on("click", ".dialogify, [data-dlg-options], [data-dlg-action]", app.util.setDialogify)
		.on("keydown", "textarea[data-character-limit]", function(e) {
			var text = $.trim($(this).val()),
				charsLimit = $(this).data("character-limit"),
				charsUsed = text.length;
							
				if ((charsUsed >= charsLimit) && (controlKeys.indexOf(e.which.toString()) < 0)) {					
					e.preventDefault();
				}					
		})
		.on("change keyup mouseup", "textarea[data-character-limit]", function(e) {
			var text = $.trim($(this).val()),
				charsLimit = $(this).data("character-limit"),
				charsUsed = text.length,
				charsRemain = charsLimit - charsUsed;
			
			if(charsRemain < 0) {
				$(this).val( text.slice(0, charsRemain) );
				charsRemain = 0;
			}
			
			$(this).next('div.char-count').find('.char-remain-count').html(charsRemain);
		})
		.on("change keyup mouseup", "textarea.linelimit[rows]", function(e) {
			try {
				var text = $(this).val(),
				returnLimit = parseInt($(this).attr("rows")) - 1,
				returnCount = text.match(/[^\n]*\n[^\n]*/gi).length,
				i = returnCount - returnLimit;
			
				for ( ; i > 0 ; i--) {
					var lastReturnIndex = text.lastIndexOf("\n");
					text = text.substring(0, lastReturnIndex) + text.substring(lastReturnIndex + 1);
				}
				
				$(this).val(text);
			} catch (ex) {
				return;
			}
		})
		.on("keyup ", "input.giftline[data-character-limit]", function(e) {
			$(this).next('div.char-count-input').hide();
			
			var text = $(this).val(),
				charsLimit = $(this).data("character-limit"),
				charsUsed = text.length,
				charsRemain = charsLimit - charsUsed;
			/*gift message modification syed*/
			var line1 =  $(".line1").val().length;
			var line2 =  $(".line2").val().length;
			var line3 =  $(".line3").val().length;
			var line4 =  $(".line4").val().length;
			var line5 =  $(".line5").val().length;
			var unicodeshipping=e.charCode? e.charCode : e.keyCode
			
			/*if (unicodeshipping == 46 || unicodeshipping == 8){
				 var positionvalue=doGetCaretPosition(this);
	       
				var str1= $(".line1").val();
				var str2 =str1.concat($(".line2").val());
				var str3 =str2.concat($(".line3").val());
				var str4 =str3.concat($(".line4").val());
				var str5 =str4.concat($(".line5").val());
				//var input = 'abcdefghijklmn1234567890';
				arry=str5.match(/.{1,35}/g)
				$(".line1").val(arry[0])
				$(".line2").val(arry[1])
				$(".line3").val(arry[2])
				$(".line4").val(arry[3])
				$(".line5").val(arry[4])	
				doSetCaretPosition(this,positionvalue);
			}*/
			var totalChars = 175;
			
	
				
				if (unicodeshipping == 8 && text==''){ 					
					$(this).parent().prev().find("input.giftline").focus();
				}
		
			
			if((charsUsed >= charsLimit) && e.ctrlKey !=1 && unicodeshipping != 17)
		      {
				$(this).parent().next().find("input.giftline").focus();
		      }

			var enteredChars=line1+line2+line3+line4+line5;
			var remainingChars= totalChars - enteredChars;
			var totalLinesRemaining , totalLinesFilled = 0;
			$('"input.giftline[data-character-limit]"').each(function(){
				if($(this).val()){
					totalLinesFilled++;
				}
			});
			totalLinesRemaining = 5 - totalLinesFilled;
			$('div.giftlineTotal').find('span.TotalRemaining').html(remainingChars);
			//$('div.giftlineTotal').find('span.totalLinesRemaining').html(totalLinesRemaining);
			$('.charResults').show();
			$('div.giftlineTotal').find('span.char-count-input').html(charsRemain);
			///$(this).parent(".form-row").find(".focusedLineCount").html(charsRemain);
			$(this).parents('form').find('div.giftlineTotal .focusedLineStatus').html(' '+charsRemain +' characters remaining this line');
			/*gift message modification syed*/
			
			$(this).next('div.char-count-input').find('.char-remain-count').html(charsRemain);
		})
		.on("blur", "input.giftline[data-character-limit]", function(e) {
			$(this).next('div.char-count-input').delay(500).fadeOut();
			$(this).parents('form').find('div.giftlineTotal .focusedLineStatus').html(' 35 characters remaining this line');
			//$(this).parent(".form-row").find(".focusedLineCount").remove();
		})
		.on("focus", "input.giftline[data-character-limit]", function(e) {
			var text = $(this).val(),
			charsLimit = $(this).data("character-limit"),
			charsUsed = text.length,
			charsRemain = charsLimit - charsUsed;
			$(this).parents('form').find('div.giftlineTotal .focusedLineStatus').html(' '+charsRemain +' characters remaining this line');
			//$(this).parent(".form-row").append('<span class="char-count-input focusedLineCount">'+ charsRemain +'</span>');
		})
		.on("keydown", "input.giftline[data-character-limit]", function(e) {
			if (e.which == 13){
				$(this).parent().next().find('.giftline ').focus();
				e.preventDefault();
			}
		})
		.on("click", "div.textboxAstextarea", function(e) {
			var that , focusFirstLine = true;
			$(this).css("cursor","none");
			$(this).find("input").each(function(){ 
				that = $(this);
				if(that.val()){
					focusFirstLine = false;
					return false;
				}
			});
			if(focusFirstLine){
				$(this).find(".line1").focus();
				$(this).parent().find('div.giftlineTotal .focusedLineStatus').html(' '+35 +' characters remaining this line');
			}
			
			$(this).css("cursor","default");
		})
		.on("keyup", "input.couponCode", function(e) {
			if (e.which == 13){
				e.preventDefault();
			}
		});
		

		//initialize search suggestions
		//app.searchsuggest.init(app.ui.searchContainer, app.resources.SIMPLE_SEARCH);

		// print handler
		app.ui.printPage.on("click", function () { window.print(); return false; });

		// modal link handler
		app.ui.modalLink.live("click", function (event) { 
			event.preventDefault(); 
			app.caculatingpopupsize = new caculatingpopupsize(this);				
			var options = {title : this.title, dialogClass : "modal-link-dialog dialog-scroll"};
			dlgOptionslik = $.extend({},app.dialog.settings, $(this).data("dlg-options"),app.caculatingpopupsize.settingresponsivewidth,options || {});	
			app.dialog.open({url:this.href, options:dlgOptionslik});
		});
		app.ui.removeProduct.on("click", function (event) { 
			event.preventDefault(); 
			app.caculatingpopupsize = new caculatingpopupsize(this);
			var clickId=$(this).attr('buttonId');
			height=190, width=320;
			if($(this).attr('height')!=null){
				height = $(this).attr('height');
			}
			if($(this).attr('width')!=null){
				width = $(this).attr('width');
			}
			$('#lineItemId').val(clickId);
			if($(this).attr('pidtoremove') != null && $(this).attr('pidtoremove') != '') {
				$('#pidtoremove').val($(this).attr('pidtoremove'));
			}
			if($(this).attr('pliid') != null && $(this).attr('pliid') != '') {
				$('#productLineItemID').val($(this).attr('pliid'));
			}
			var productName = $(this).attr('productName');
		
			
			if($(window).width()<=960){
				
			 var options = {title : this.title, dialogClass : "modal-link-dialog dialog-scroll",height:app.caculatingpopupsize.settingresponsivewidth.height,width:app.caculatingpopupsize.settingresponsivewidth.width};
			}else{
			var options = {title : this.title, dialogClass : "modal-link-dialog dialog-scroll",height:height,width:width};
			}
			app.dialog.openCustom({url:this.href, options:options, product: productName});
		});
		// personalised Ribbon msg pop up on cart page
		app.ui.personalizedRibbonMsg.on("click", function (event) { 
			event.preventDefault(); 
			app.caculatingpopupsize = new caculatingpopupsize(this);
			var clickId=$(this).attr('buttonId');
			height=200, width=700;
			if($(this).attr('height')!=null){
				height = $(this).attr('height');
			}
			if($(this).attr('width')!=null){
				width = $(this).attr('width');
			}
			$('#lineItemId').val(clickId);
			if($(this).attr('pidtoremove') != null && $(this).attr('pidtoremove') != '') {
				$('#pidtoremove').val($(this).attr('pidtoremove'));
			}
			
			var productName = $(this).attr('productName');
		
			
			if($(window).width()<=960){
				
			 var options = {title : this.title, dialogClass : "modal-link-dialog dialog-scroll",height:app.caculatingpopupsize.settingresponsivewidth.height,width:app.caculatingpopupsize.settingresponsivewidth.width};
			}else{
			var options = {title : this.title, dialogClass : "modal-link-dialog dialog-scroll",height:height,width:width};
			}
			app.dialog.openCustom({url:this.href, options:options, product: productName});
		});
		// header modal link handler
		app.ui.headerPromoModalLink.on("click", function (event) { 
			event.preventDefault(); 
			var options = {
					title : this.title,
					dialogClass : "header-promo-modal dialog-scroll",
					height : 300,
					width : 400,
					position : {
						my : "left top",
						at : "right top",
						of : $(this).parents("li"),
						offset : "20 -10"
					}
			};
			app.dialog.open({url:this.href, options:options});
		});

		// add show/hide navigation elements
		$('.secondary-navigation .toggle').click(function(){
			$(this).toggleClass('expanded').next('ul').toggle();
		});
		
		// add generic toggle functionality
		$('.toggle').next('.toggle-content').hide();
		$('.toggle').click(function(){
			$(this).toggleClass('expanded').next('.toggle-content').toggle();
		});
		
		$("select").on("change", function() {
			$(this).selectBox('value',$(this).val());
		});
		
		// close dialogs on background click
		$("body").on("click", ".ui-widget-overlay", function(){
			//Godiva - 724
			if($('#dialog-container').parent().hasClass('addNewAddressForm'))
				return;
			$('#dialog-container').dialog( "close" );
		});
		
		//clear input if value = title
		app.ui.main.on("focus", "input[type='text']", function() {
			if($(this).attr("title") == $(this).val()) {
				$(this).val("");
			}
		});
		
		$("#footer-region-selector").on("change", "form select", function(e){
			if($(this).val() != "US") {
				window.location.href =$(this).val();
			}
		});
		
	}

	function initializeDom() {
		// add class to html for css targeting
		$('html').addClass('js');

		// load js specific styles
		app.util.loadCssFile(app.util.staticUrl("/css/js-style.css"));		
		app.util.limitCharacters();
		app.util.limitCharactersInput();
		
		// initialize scrollbars
		$('.scrollpane').jScrollPane({
			autoReinitialise: true
		});
		
		// append anchor tag if needed (for anchor workaround in content assets)
		var uri = app.util.getUri(window.location.href);
		var sectionName = uri.queryParams['anchor'];
		if(sectionName != null && sectionName != "") {
			app.util.gotoAnchorHash(sectionName);
		}
		$(".checkoutPromoBanner #cart-banner-slideshow").cycle({ fx: 'fade' });
		$(".checkoutPromoBanner #shipping-banner-slideshow").cycle({ fx: 'fade' });
		$(".checkoutPromoBanner #billing-banner-slideshow").cycle({ fx: 'fade' });
		$(".checkoutPromoBanner #summary-banner-slideshow").cycle({ fx: 'fade' });
	}


	// _app object
	// "inherits" app object via $.extend() at the end of this seaf (Self-Executing Anonymous Function
	var _app = {
		containerId		: "content",
		ProductCache	: null,  // app.Product object ref to the current/main product
		ProductDetail	: null,
		clearDivHtml	: '<div class="clear"></div>',
		currencyCodes	: app.currencyCodes || {}, // holds currency code/symbol for the site

		/**
		 * @name init
		 * @function
		 * @description Master page initialization routine
		 */
		init: function () {
			
			if (document.cookie.length===0) {
				$("<div/>").addClass("browser-compatibility-alert").append($("<p/>").addClass("browser-error").html(app.resources.COOKIES_DISABLED)).appendTo("#browser-check");
			}
			
			
			// init global cache
			initUiCache();

			// init global dom elements
			initializeDom();

			// init global events
			initializeEvents();

			// init specific global components
			app.tooltips.init();
			app.minicart.init();
			app.validator.init();
			app.components.init();
			app.searchplaceholder.init();
			app.emailsubscribe.init();
			// execute page specific initializations
			var ns = app.page.ns;
			var namespace = app.page.namespace;
			
			if (namespace && app[namespace] && app[namespace].init) {
				app[namespace].init();
			}
			if ((ns != namespace) && ns && app[ns] && app[ns].init) {
				app[ns].init();
			}
		}
	};

	return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));


jQuery(document).ready(function() {
    //Dynamic Menu positioning
    jQuery("#navigation ul.level-1 > li").each(function(i) {
		var childMenu = jQuery(this).children("#navigation div.level-2").outerWidth();
		jQuery(this).children("div.level-2").css('width', childMenu );
	 });

	jQuery("#navigation").css('position', 'relative');
	
	jQuery("#navigation ul.level-1 > li").hover(
			function () {
				jQuery(this).addClass("hover");
				
				// stop any running nav animations
				//jQuery(this).find('div.level-2').stop(true,true).hide();

				jQuery(this).find('div.level-2').stop(true,true).slideDown(700);
				
				if($('#wrapper').width() <= 959 ) {
					jQuery(this).css({'margin-bottom': '0px','padding-bottom': '18px'})
				} else {
					jQuery(this).css({'margin-bottom': '0px','padding-bottom': '15px'})
				}
				
				//$('#sitesearchcontainer').hide();
				$('.header-search-icon').find('span').css('background-position', '1px -330px');
				
				var widthMainWrapper = 960;
				
				//Get width of #hunt3
				var hunt3Width = jQuery("li.hover div.level-2").innerWidth();
				
				//check to see if .sfHover exist; if so get li sfHover position
				if (jQuery('li.hover').length) {
					var curLiPosition = jQuery("li.hover").position().left;
				}
				
				//Calculate the amount of overhang of the catitemWrapper
				var offsetWrapper =   widthMainWrapper - (curLiPosition + hunt3Width);
					
			},
			
			function () {
				jQuery(this).removeClass("hover");
				jQuery(this).find('div.level-2').stop(true,true).hide();
				//$('#sitesearchcontainer').show();
				if($('#wrapper').width() <= 959 ) {
					jQuery(this).css({'margin-bottom': '18px','padding-bottom': '0px'})
				} else {
					jQuery(this).css({'margin-bottom': '15px','padding-bottom': '0px'})
				}				
				
			}
		);
		
		jQuery("ul#menu-utility-links > li").on('mouseenter', function () {						
			jQuery('.menu-utility-dropdown').stop(true,true).hide();
			jQuery(this).find('.menu-utility-dropdown').stop(true,true).slideDown(700);	
			jQuery(".menu-utility-dropdown").on('mouseenter', function () {	
				jQuery(this).show();
			})
		}).on('mouseleave',function () {
			jQuery(this).find('.menu-utility-dropdown').stop(true,true).hide();
		})
	
});


//app.tooltips
(function (app, $) {
	var $cache = {};
	app.tooltips = {
			
		init : function () {
			
			$('.tooltip').tooltip({
				track: true,
				showURL: false,
				top: -60, 
			    left: 0, 
			    bodyHandler: function() {
					// add a data attribute of data-layout="some-class" to your tooltip-content container if you want a custom class
					var tooltipClass = "";
					if( tooltipClass = $(this).find('.tooltip-content').data("layout") ) {
						tooltipClass = " class='" + tooltipClass + "' ";
					}
		        	return "<div " + tooltipClass + ">" + $(this).find('.tooltip-content').html() + "</div>"; 
				}, 
				showURL: false 
			});
		}
	};

}(window.app = window.app || {}, jQuery));


//SelectBox
jQuery("SELECT").selectBox();

//Custom Radio and Checkboxes
function setupLabel() {
    if (jQuery("input[type='radio']").length) {
        jQuery("input[type='radio'] + label").each(function(){ 
            $(this).removeClass('r_on');
        });
        jQuery("input[type='radio']:checked").each(function(){ 
            $(this).next('label').addClass('r_on');
        });
    };

    if ( jQuery("input[type='checkbox']").length) {
    	 jQuery("input[type='checkbox']").addClass("checkbox-styled");
    	 jQuery("input[type='checkbox']").prev("label").addClass('custom-checkbox');
    	 jQuery("input[type='checkbox']").prev("label").removeClass('r_on');

        jQuery("input[type='checkbox']:checked").each(function(){ 
            $(this).prev('label').addClass('r_on');
        });
    };

    if ( jQuery(".rememberme input[type='checkbox']").length) {
    	 jQuery(".rememberme label").each(function(){ 
            jQuery(this).removeClass('r_on');
        });
        jQuery(".rememberme input[type='checkbox']:checked").each(function(){ 
        	 jQuery(this).prev('label').addClass('r_on');
        });
    };
    
    if ( jQuery(".shipment-strawberry input[type='radio']").length) {
    	jQuery(".shipment-strawberry").each(function(){ 
            jQuery(this).removeClass('r_on');
        });
        jQuery(".shipment-strawberry input[type='radio']:checked").each(function(){ 
        	 jQuery(this).prev('label').addClass('r_on');
        });
    }   
    
    if ( jQuery(".shipment-strawberry input[type='radio']").length == 1) {
    	jQuery("#sdate").next().addClass("r_on");
    }

};

    jQuery('body').addClass('has-js');
    jQuery('body').on("change", ".rememberme input[type='checkbox'], input[type='checkbox'], input[type='radio']", function(){
        setupLabel();
    });
    setupLabel(); 

//Accordion
jQuery("#accordion").accordion();


//app.emailsubscribe
(function (app, $) {
	var $cache = {};
	app.emailsubscribe = {			
		init : function () {
		
			var subscribeForm	= $(".subscribe-form");
			var subscribeEmail = $(".subscribe-email");
			
			subscribeEmail.focus(function () {
				var val = $(this).val();
				if(val.length > 0 && val !== app.resources.SUBSCRIBE_EMAIL_DEFAULT) {
					return; // do not animate when contains non-default value
				}

				$(this).animate({ color: '#999999'}, 500, 'linear', function () {
					$(this).val('').css('color','#333333');
				});
				
				//Hide error/thanks messages
				$(this).parent().parent().find(".subscribe-form-thank-you").hide();
				
			}).blur(function () {
				var val = $.trim($(this).val());
				if(val.length > 0) {
					return; // do not animate when contains value
				}

				$(this).val(app.resources.SUBSCRIBE_EMAIL_DEFAULT)
					   .css('color','#999999')
					   .animate({color: '#333333'}, 500, 'linear');

			});
			
			$("form[name='subscribe-form']").on("submit", function(e){
				//Prevent normal form submission
				e.preventDefault();
				
				//Check if form is valid
				if($(this).find(".subscribe-email").hasClass("valid")) {

					//Submit form and display thank you message
					var data = $(this).serialize(); 
					$.ajax({
						type: "POST",
						url: $(this).attr("action"),
						data: data
					})
					.done(function(response) {
						if(response === "ERROR"){							
							
							$(".subscribe-form").parent().find(".subscribe-form-thank-you").hide();
							$(".subscribe-form").parent().find(".subscribe-form-error").show();
						}else{
							$(".subscribe-form").parent().find(".subscribe-form-error").hide();
							$(".subscribe-form").parent().find(".subscribe-form-thank-you").show();
							if(app.constants.COMMISIONJUNCTION_TAG_ENABLED)
							{
								var sourceURL = app.constants.COMMISIONJUNCTION_EMAIL_SIGNUP_SOURCE ;
								var datetime = new Date().getTime();
								sourceURL = sourceURL + datetime;
								$('<iframe height="1" width="1" frameborder="0" scrolling="no" src="'+sourceURL+'" name="cj_conversion" ></iframe>').appendTo('.subscribe-form-thank-you');
							}
							if(app.constants.LightningBolt_Enabled)
							{
								lbReload(app.constants.LightningBolt_MediaCom,'','','');
							}
						}
					});
				}
			});
		}
	};

}(window.app = window.app || {}, jQuery));


/**
 @extending the function prototype to serialize forms as objects
 */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


/**
 @ app.data : A hook to store objects into the Local DB and populate  the data into forms from local DB...
 */
(function (app, $) {
	var $cache = {};
	app.data = {
			
set: function(key, value) {
    if (!key || !value) {return;}

    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  get: function(key) {
    var value = localStorage.getItem(key);

    if (!value) {return;}

    // assume it is an object that has been stringified
    if (value[0] == "{") {
      value = JSON.parse(value);
    }

    return value;
  } ,
  
  removeItem : function(key){
  
  localStorage.removeItem(key);
  
  },
  
  autoFillShippingFormFromLocalDBIfApplicable : function(shipmentID){
  
  var shippingForm = $cache.checkoutForm ;
  var ShippingObjectFromLocalDB = app.data.get(shipmentID);
  if( typeof ShippingObjectFromLocalDB == 'undefined'){
	  return ;
  }
  var shipdate =ShippingObjectFromLocalDB['selectedDate'];
  var selectedShipmentType =ShippingObjectFromLocalDB['latestClick'];
   $.each(ShippingObjectFromLocalDB, function(key, element) {
    
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_firstName')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addressFields_firstName]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_lastName')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addressFields_lastName]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_companyName')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addressFields_companyName]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_address1')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addressFields_address1]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_address2')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addressFields_address2]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_city')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addressFields_city]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_country')
     {
    	jQuery("select[name=dwfrm_singleshipping_shippingAddress_addressFields_country]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_states_state')
     {
    	jQuery("select[name=dwfrm_singleshipping_shippingAddress_addressFields_states_state]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_zip')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addressFields_zip]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_addressFields_phone')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addressFields_phone]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine1')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine1]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine2')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine2]").val(element);
     }
      if(key == 'dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine3')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine3]").val(element);
     }
      if(key == 'dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine4')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine4]").val(element);
     }
      if(key == 'dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine5')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_giftOptions_giftMessage_giftMessageLine5]").val(element);
     }
     if(key == 'dwfrm_singleshipping_shippingAddress_shippingMethodID' && selectedShipmentType == 'shipmentMethod')
      {
    	var id = '#shipping-method-' + element;
    	jQuery(id).attr("checked", true);
    	jQuery(id).next().removeClass("r_off");
     	jQuery("SELECT").selectBox();
		setupLabel(); 
      } 
     if(key == 'dwfrm_singleshipping_shippingAddress_addToAddressBook')
     {
    	jQuery("input[name=dwfrm_singleshipping_shippingAddress_addToAddressBook]").attr("checked", element);
		setupLabel(); 
     } 
      if(key == 'dwfrm_singleshipping_shipByDateType' && selectedShipmentType == 'shipByDate'){
    	  var shipBydate = shipdate;
    	  if(shipBydate != '')
    		  {
		  var shipByDateType = element[0];
    	  //reselectShippingMethods(shipBydate,currentSelectedShippingMethodID,shipByDateType); 
		  if(shipByDateType == "date" ||shipByDateType == "week" ||shipByDateType == "holiday" ){
		        
		        var dateArray = shipBydate.split("-");
			    dateString = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
			    var selector = "#"+shipByDateType ;
			    var id = '';
			    if(jQuery(selector).length >0){
				    jQuery(selector).click();
		            if(shipByDateType == "week") {
		            	id = '#week';
		            	jQuery(id).attr("checked", true);
						//jQuery("#week").click();
						//jQuery("span.weekresult").removeClass('hide');
						jQuery("#shipByDateDate").val(shipBydate);
						jQuery("#displayweek").html(dateString);
					} 
		            else if(shipByDateType == "date") {
		            	id = '#date';
		            	jQuery(id).attr("checked", true);
						//jQuery("#date").click();
						//jQuery("span.dateresult").removeClass('hide');
						jQuery("#shipByDateDate").val(shipBydate);
						jQuery("#displaydate").html(dateString);
					} 
		            else if(shipByDateType == "holiday") {
		            	id = '#holiday';
		            	jQuery(id).attr("checked", true);
						jQuery("#holiday").click();
					 	jQuery("#shipByDateDate").val(date);
					}
		            else {
						jQuery("#shipByDateDate").val(date);
					}
		           }
		        
							 
							        
		        }
      }
      }
     
      
});
  
 
  
  }
	};

}(window.app = window.app || {}, jQuery));



/**
 @class app.product
 */
(function (app, $) {
	var $cache;

	/*************** app.product private vars and functions ***************/
	function loadProductNavigation() {
		var pidInput = $cache.pdpForm.find("input[name='pid']").last();
		var navContainer = $("#product-nav-container");
		// if no hash exists, or no pid exists, or nav container does not exist, return
		if (window.location.hash.length <= 1 || pidInput.length===0 || navContainer.length===0) {
			return;
		}

		var pid = pidInput.val();
		//var hashParams = window.location.hash.substr(1);
		var hashParams = window.location.href.split("#")[1];//

		if (hashParams.indexOf("pid="+pid) < 0) {
			hashParams+="&pid="+pid;
		}

		var url = app.urls.productNav+(app.urls.productNav.indexOf("?") < 0 ? "?" : "&")+hashParams;
		app.ajax.load({url:url, target: navContainer});
	}

	/**
	 @description Sets the main image attributes and the href for the surrounding <a> tag
	 @param {Object} atts Simple object with url, alt, title and hires properties
	 */
	function setMainImage(atts) {
		var imgZoom = $cache.pdpMain.find("a.main-image");
		if (imgZoom.length>0) {
			imgZoom.attr("href", atts.hires);
		}

		imgZoom.find("img.primary-image").attr({
			"src" : atts.url,
			"alt" : atts.alt,
			"title" : atts.title
		});
	}

	/**
	 @description helper function for swapping main image on swatch hover
	 @param {Element} element DOM element with custom data-lgimg attribute
	 */
	function swapImage(element) {
		var lgImg = $(element).data("lgimg");

		var newImg = $.extend({}, lgImg);
		var imgZoom = $cache.pdpMain.find("a.main-image");
		var mainImage = imgZoom.find("img.primary-image");
		// store current image info
		lgImg.hires = imgZoom.attr("href");
		lgImg.url = mainImage.attr("src");
		lgImg.alt = mainImage.attr("alt");
		lgImg.title = mainImage.attr("title");
		// reset element's lgimg data attribute
		$(element).data(lgImg);
		// set the main image
		setMainImage(newImg);
	}

	function loadZoom() {
		if(app.quickView.isActive() || !app.zoomViewerEnabled) { return; }

		//zoom properties
		var options = {
			zoomType: 'innerzoom',
			alwaysOn : 0, // setting to 1 will load load high res images on page load
			//Eve
			//zoogetpopupwidth : 473,
			//zoogetpopupheight : 475,
			//position:'right',
			//preloadImages: 0, // setting to 1 will load load high res images on page load
			//xOffset: 0,
			//yOffset:0,
			showEffect : 'fadein',
			hideEffect: 'fadeout'
		};

		// Added to prevent empty hires zoom feature (if images don't exist)
		var mainImage = $cache.pdpMain.find("a.main-image");
		
		 if( typeof mainImage[0] != "undefined"){
		if( mainImage[0].href != '' && mainImage[0].href.indexOf('noimagelarge')<0 ) {
			mainImage.removeData("jqzoom").jqzoom(options);
		}
		  }
	}

	function replaceImages() {		
		var newImages = $("#update-images");
		var imageContainer = $cache.pdpMain.find("div.product-image-container");
		
		imageContainer.html(newImages.html());
		newImages.remove();
		setMainImageLink();
		
		loadZoom();
	}
	
	function setMainImageLink() {
		if (app.quickView.isActive() || app.isMobileUserAgent) {
			$cache.pdpMain.find("a.main-image").removeAttr("href");
		}
		else {
			$cache.pdpMain.find("a.main-image").addClass("image-zoom");
		}
	}
	
	function removeImageZoom() {
		$cache.pdpMain.find("a.main-image").removeClass("image-zoom");
	}

	function initializeDom() {
		$cache.pdpMain.find('.quickview-tabs').tabs();
		
		//SelectBox
		jQuery("SELECT").selectBox();

		loadProductNavigation();
		setMainImageLink();		

		if ($cache.productSetList.length>0) {
			var unavailable = $cache.productSetList.find("form").find("button.add-to-cart[disabled]");
			if (unavailable.length > 0) {
				$cache.addAllToCart.attr("disabled", "disabled");
				$cache.addToCart.attr("disabled", "disabled"); // this may be a bundle
			}
		}
		
		//initialize recommendations tabs (remove empty tabs)
		var emptyTabs = $cache.pdpMain.find(".tab-content .hiddenTab").parent();
		emptyTabs.each(function(index) {
			$cache.pdpMain.find(".tabs-menu a[href='#" + this.id + "']").parent().remove();
			$(this).remove();	
		});	
		$cache.pdpMain.find('.product-tabs').tabs();
		
		//initialize read more link
		if($("a.product-read-more-link-generated").length > 0) {
			//check overflow height vs. computed height to see if read more is necessary
			var shortDescription = $(".product-short-description");
			shortDescription.wrapInner('<div />');
						              
			var descriptionHidden = shortDescription.height() < shortDescription.children('div').height();
			shortDescription.children('div').replaceWith( shortDescription.children('div').html() );
                if(descriptionHidden)
                	{
                	$(".product-short-description, a.product-read-more-link").show();
                       // $("a.product-read-more-link-generated").show();
                	}
		}
	}

	function initializeCache() {
		$cache = {
			productId : $("#pid"),
			pdpMain : $("#pdpMain"),
			productContent : $("#product-content"),
			thumbnails : $("#thumbnails"),
			bonusProductGrid : $(".bonusproductgrid"),
			imageContainer : $(".product-primary-image"),
			productSetList : $("#product-set-list"),
			addToCart : $("#add-to-cart"),
			addAllToCart : $("#add-all-to-cart"),
			personalizationLimit : $("#personalization-limit")
		};
		$cache.detailContent = $cache.pdpMain.find("div.detail-content");
		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
		$cache.swatches = $cache.pdpMain.find("ul.swatches");
		$cache.mainImageAnchor = $cache.imageZoom = $cache.imageContainer.find("a.main-image");
		$cache.mainImage = $cache.mainImageAnchor.find("img.primary-image");
	}

	function initializeEvents() {
		var availabilityContainer = $cache.pdpMain.find("div.availability");
		
		app.product.initAddThis();
		
		
			
		
		// add or update shopping cart line item
		app.product.initAddToCart();
		$cache.pdpMain.on("change keyup", "form.pdpForm input[name='Quantity']", function (e) {
			availabilityContainer = $cache.pdpMain.find("div.availability");
			app.product.getAvailability(
				$cache.productId.val(),
				$(this).val(),
				function (data) {
					if (!data) {
						$cache.addToCart.removeAttr("disabled");
						availabilityContainer.find(".availability-qty-available").html();
						availabilityContainer.find(".availability-msg").show();
						return;
					}else{
						var avMsg = null;
						$('#outOfStock').html('');
						var avRoot = availabilityContainer.find(".availability-msg").html('');
						$cache.addToCart.removeAttr("disabled");
						
						// Look through levels ... if msg is not empty, then create span el
						if( data.levels.IN_STOCK> 0 ) {
							avMsg = avRoot.find(".in-stock-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("in-stock-msg").appendTo(avRoot);
							}
							if( data.levels.PREORDER==0 && data.levels.BACKORDER==0 && data.levels.NOT_AVAILABLE==0 ) {
								// Just in stock
								avMsg.text(app.resources.IN_STOCK);
							} else {
								// In stock with conditions ...
								//avMsg.text(data.inStockMsg);
								$('#outOfStock').html(data.inStockMsg);
								$('.not-available-msg-strawbery').show();
							}
						}
						if( data.levels.PREORDER> 0 ) {
							avMsg = avRoot.find(".preorder-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("preorder-msg").appendTo(avRoot);
							}
							if( data.levels.IN_STOCK==0 && data.levels.BACKORDER==0 && data.levels.NOT_AVAILABLE==0 ) {
								// Just in stock
								avMsg.text(app.resources.PREORDER);
							} else {
								avMsg.text(data.preOrderMsg);
							}
						}
						if( data.levels.BACKORDER> 0 ) {
							avMsg = avRoot.find(".backorder-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("backorder-msg").appendTo(avRoot);
							}
							if( data.levels.IN_STOCK==0 && data.levels.PREORDER==0 && data.levels.NOT_AVAILABLE==0 ) {
								// Just in stock
								avMsg.text(app.resources.BACKORDER);
							} else {
								avMsg.text(data.backOrderMsg);
							}
						}
						if( data.inStockDate != '' ) {
							avMsg = avRoot.find(".in-stock-date-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("in-stock-date-msg").appendTo(avRoot);
							}
							avMsg.text(String.format(app.resources.IN_STOCK_DATE,data.inStockDate));
						}
						if( data.levels.NOT_AVAILABLE> 0 ) {
							avMsg = avRoot.find(".not-available-msg");
							$cache.addToCart.attr("disabled", "disabled");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("not-available-msg").appendTo(avRoot);
							}
							if( data.levels.PREORDER==0 && data.levels.BACKORDER==0 && data.levels.IN_STOCK==0 ) {
								avMsg.text(app.resources.NOT_AVAILABLE);
							} else {
								avMsg.text(app.resources.REMAIN_NOT_AVAILABLE);
							}
						}
						return;
					}
					$cache.addToCart.attr("disabled", "disabled");
					availabilityContainer.find(".availability-msg").hide();
					var avQtyMsg = availabilityContainer.find(".availability-qty-available");
					if (avQtyMsg.length===0) {
						avQtyMsg = $("<span/>").addClass("availability-qty-available").appendTo(availabilityContainer);
					}
					avQtyMsg.text(data.inStockMsg).show();
					
					var avQtyMsg = availabilityContainer.find(".availability-qty-available");
					if (avQtyMsg.length===0) {
						avQtyMsg = $("<span/>").addClass("availability-qty-available").appendTo(availabilityContainer);
					}
					avQtyMsg.text(data.backorderMsg).show();
				});
			
			// check for personalization tooltip if it exists
			if($cache.personalizationLimit.length > 0) {
				var personalizationLimitQuantity = parseInt($cache.personalizationLimit.val());
				
				// show personalization message if entered quantity is greater than personalization limit
				// otherwise, hide message in case it is currently shown
				if(personalizationLimitQuantity > 0 && (parseInt($(this).val()) > personalizationLimitQuantity)) {
					$(".product-personalization-information").show();
				} else {
					$(".product-personalization-information").hide();
				}
			}

		});
		$cache.pdpMain.on("click", "a.wl-action", function (e) {
			// work around for bundle products. options dropdown not included within form.
			e.preventDefault();
			
			var data = app.util.getQueryStringParams($cache.pdpForm.serialize());
			if (data.cartAction) {
				delete data.cartAction;
			}
			var url = app.util.appendParamsToUrl(this.href, data);
			url = this.protocol + "//" + this.hostname + ((url.charAt(0)==="/") ? url : ("/"+url));
			window.location.href = url;
		});

		$cache.pdpMain.on("hover", "ul.Color a.swatchanchor", function () {
			swapImage(this);
		});
		// productthumbnail.onclick()
		$cache.pdpMain.on("click", "img.productthumbnail", function () {
			var lgImg = $(this).data("lgimg");

			// switch indicator
			$cache.pdpMain.find("div.product-thumbnails li.selected").removeClass("selected");
			$(this).closest("li").addClass("selected");

			setMainImage(lgImg);
			// load zoom if not quick view
			if( lgImg.hires != '' && lgImg.hires.indexOf('noimagelarge')<0 ){
				setMainImageLink();
				loadZoom();
			} else {
				removeImageZoom();
			}
		});

		// dropdown variations
		$cache.pdpMain.on("change", ".product-options select", function (e) {
			var salesPrice = $cache.pdpMain.find("div.product-add-to-cart .price-sales");
			
			var selectedItem = $(this).children().filter(":selected").first();
			var combinedPrice = selectedItem.data("combined");
			salesPrice.text(combinedPrice);
		});
		
		// ribbon (color) swatch dropdown
		$cache.pdpMain.on("click", ".dropdown-ribbon .dropdown dt span", function() {
            $(".dropdown-ribbon .dropdown dd ul").toggle();
        });

		$(document).on("click", function(e) {
			var $clicked = $(e.target);
            if (! $clicked.parents().hasClass("dropdown"))
            	$(".dropdown dd ul").hide();
            
            $("dt span a.thumb").click(function(e) {
            	e.preventDefault();
			});
            $('#preview-ribbon').remove();
        });
		
		$cache.pdpMain.on("click", ".dropdown-ribbon .dropdown dd ul li span.title", function() {
			var text = $(this).html();
			$cache.pdpMain.find(".dropdown-ribbon .dropdown dt span.title").html(text);
			$cache.pdpMain.find(".dropdown-ribbon .dropdown dd ul").hide();
            
            var swatchesColor = $cache.pdpMain.find(".swatches.Color");
            var selectedValue = $(this).find("span.value").html();
            swatchesColor.find("a[title=\"" + selectedValue + "\"]").click();
        });
		
		$cache.pdpMain.on("click", ".dropdown-ribbon a.thumb", function(e) {
			e.preventDefault();
			$("#ribbon-preview").remove();
		});

		$cache.pdpMain.on("mouseenter", ".dropdown-ribbon a.thumb", function() {
			this.t = this.title;
			this.title = "";	
			var c = (this.t != "") ? "<br/>" + this.t : "";
			$(this).append("<span id='ribbon-preview'><img src='"+ this.href +"' alt='Image preview' />"+ c +"</span>");
		});
		
		$cache.pdpMain.on("mouseout", ".dropdown-ribbon a.thumb", function() {
			this.title = this.t;	
			$("#ribbon-preview").remove();
		});

		// prevent default behavior of thumbnail link and add this Button
		$cache.pdpMain.on("click", ".thumbnail-link, .addthis_toolbox a", false);
		$cache.pdpMain.on("click", "li.unselectable a", false);
		
		$cache.pdpMain.on("change", ".variation-select", function(e){
			if ($(this).val().length===0) {return;}
			var qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				productSet = $(this).closest('.subProduct'),
				category = $cache.pdpForm.find("input[name='cgid']").first().val(),
				params = {
					Quantity : isNaN(qty) ? "1" : qty,
					cgid : category,	
					format : "ajax"
			};
			var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
			var url = app.util.appendParamsToUrl($(this).val(), params);
			app.progress.show($cache.pdpMain);

			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					$("update-images").remove();				
				}
			});
		});
		
		$cache.pdpMain.on("change", ".product-add-to-cart  #Quantity", function(e){
			e.preventDefault();
			var qty = $cache.pdpForm.find("input[name='Quantity']").first().val();
			
			if(qty <=0 || isNaN(qty))
				{
					$cache.addToCart.attr("disabled","disabled");				
				}
			else
				{
					$cache.addToCart.removeAttr("disabled");		
				}
			
		});

		// swatch anchor onclick()
		$cache.pdpMain.on("click", "div.product-detail a[href].swatchanchor", function (e) {
			e.preventDefault();
			if ($(this).parent("li").hasClass("selected")) {
				return;
			}
			var checkQuickView= $("#quickView").val();
			var setQuickView= false;
			if(checkQuickView == "true"){
				setQuickView = true;
			}
			var isColor = $(this).closest("ul.swatches").hasClass("Color");
						
			var anchor = $(this),
				qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				productSet = $(anchor).closest('.subProduct'),
				category = $cache.pdpForm.find("input[name='cgid']").first().val(),
				params = {
					Quantity : isNaN(qty) ? "1" : qty,
					cgid : category
				};
			
			var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
			var url = app.util.appendParamsToUrl(this.href, params);
			url = url + "&setQuickView=" +setQuickView;
			app.progress.show($cache.pdpMain);		
						
			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					app.product.initVariant();
					if (isColor) {
						replaceImages();
					}					
				}
			});
		});
		
		// nutrition onclick()
		$cache.pdpMain.on("click", "a.product-nutrition-link", function (e) {			
			e.preventDefault();
			$('.product-nutrition-container').show();
			var productTablewidth=$('.product-nutrition > table').width();
			$('.product-nutrition-container').hide();
			var settingresponsivewidthnut={}
			settingresponsivewidthnut={width:productTablewidth+"px"};
			if($(window).width()<=960){settingresponsivewidthnut={width: $(window).width()*0.8,height:$(window).height()*0.8}}
				dlgOptionsnut = $.extend({},app.dialog.settings, $(this).data("dlg-options"),settingresponsivewidthnut || {});				
			    dlgOptionsnut.title = dlgOptionsnut.title || $(this).attr("title") || "";
			    app.dialog.open({selector: ".product-nutrition-container", options:dlgOptionsnut});
			    
			return false;
		});
		
		// read more onclick()
		$cache.pdpMain.on("click", "a.product-read-more-link", function (e) {
			e.preventDefault();
			$(".product-short-description, a.product-read-more-link").hide();
			$(".product-long-description, a.product-read-less-link").show();
		});
		
		$cache.pdpMain.on("click", "a.product-read-less-link", function (e) {
			e.preventDefault();
			$(".product-short-description, a.product-read-more-link").show();
			$(".product-long-description, a.product-read-less-link").hide();
		});
		
		// look inside onclick()
		$cache.pdpMain.on("click", "a.look-inside", function (e) {
			e.preventDefault();
			
			// get max height so dialog is not too tall for smaller screens
			var dialogMaxHeight = $(window).height() * .75;
			$("<style>.piece-grid { max-height: " + dialogMaxHeight + "px !important; }</style>").appendTo(document.documentElement);

			var options = {title : this.title, 
					width: '1024',
					dialogClass: 'dialog-look-inside'
			};
			app.dialog.open({url: this.href, options:options});
		});

		$cache.productSetList.on("click", "div.product-set-item li a[href].swatchanchor", function (e) {
			e.preventDefault();
			// get the querystring from the anchor element
			var params = app.util.getQueryStringParams(this.search);
			var psItem = $(this).closest(".product-set-item");

			// set quantity to value from form
			var qty = psItem.find("form").find("input[name='Quantity']").first().val();
			params.Quantity = isNaN(qty) ? "1" : qty;

			var url = app.urls.getSetItem + "?" + $.param(params);

			// get container
			var ic = $(this).closest(".product-set-item");
			ic.load(url, function () {
				app.progress.hide();
				if ($cache.productSetList.find("button.add-to-cart[disabled]").length>0) {
					$cache.addAllToCart.attr("disabled","disabled");
					$cache.addToCart.attr("disabled","disabled"); // this may be a bundle
				}
				else {
					$cache.addAllToCart.removeAttr("disabled");
					$cache.addToCart.removeAttr("disabled"); // this may be a bundle
				}
				
				app.product.initAddToCart(ic);

			});
		});

		$cache.addAllToCart.on("click", function (e) {
			e.preventDefault();
			var psForms = $cache.productSetList.find("form").toArray(),
				miniCartHtml = "",
				addProductUrl = app.util.ajaxUrl(app.urls.addProduct);

			// add items to cart
			function addItems() {
				var form = $(psForms.shift());
				var itemid = form.find("input[name='pid']").val();

				$.ajax({
					dataType : "html",
					url: addProductUrl,
					data: form.serialize()
				})
				.done(function (response) {
					// success
					miniCartHtml = response;
				})
				.fail(function (xhr, textStatus) {
					// failed
					var msg = app.resources.ADD_TO_CART_FAIL;
					$.validator.format(msg, itemid);
					if(textStatus === "parsererror") {
						msg+="\n"+app.resources.BAD_RESPONSE;
					} else {
						msg+="\n"+app.resources.SERVER_CONNECTION_ERROR;
					}
					window.alert(msg);
				})
				.always(function () {
					if (psForms.length > 0) {
						addItems();
					}
					else {
						app.quickView.close();
						app.minicart.show(miniCartHtml);
					}
				});
			}
			addItems();
			return false;
		});
		app.sendToFriend.initializeDialog($cache.pdpMain, "a.send-to-friend");
		
		$cache.pdpMain.find("button.add-to-cart[disabled]").attr('title', $cache.pdpMain.find(".availability-msg").html() );
		
		
	}
	
	function setAddToCartHandler(e) {
		var buttonClicked = $(this);
		var form = $(this).closest("form");
		var qty = form.find("input[name='Quantity']");
		var pid = form.find("input[name='pid']");
		var pName = form.find("input[name='pName']");
		var pPrice = form.find("input[name='pPrice']");
		var isSubItem = $(this).hasClass("sub-product-item");
		var cgid = form.find("input[name='cgid']");
		var qty1 = form.find("input[name='Quantity']").val();
		var pid1 = form.find("input[name='pid']").val();
		var cartURL = app.urls.qtycheck;
		cartURL = cartURL + "?pid=" + pid1 + "&Quantity=" + qty1;
		if($(this).hasClass("checkPersonalizedMessage")){
			var validator = $( ".pdpForm" ).validate();
			validator.element( ".checkQuantity" );
			var parentForm = $(this).parents('.pdpForm'),
				personalizedMsg = parentForm.find("#addPersonalizedMsg");
			if(!parentForm.find('#giftMessageConfirmBox').is(":checked")){
				parentForm.find(".checkboxErrorMessage").removeClass("contentHider");
				return false;
			}
			parentForm.find(".checkboxErrorMessage").addClass("contentHider");
			if(parentForm.find("#Quantity").hasClass("error")){
				return false;
			}
			
			var addToCart=true;
			//Check Quantity in Cart
			  $.ajax({
					url: cartURL,
					method: "POST",
					async: false,
					dataType:"html"
				}).success(function(response){
					if($(response)[0].value === "true"){
						buttonClicked.parent().find(".quantityExceeded").removeClass('contentHider');
						addToCart = false;
						return false;
					}else{
						buttonClicked.parent().find(".quantityExceeded").addClass('contentHider');
						addToCart = true;
					}
				});
			
			  if(!addToCart){
				  return false;  
			  }
				
			
			
			if(personalizedMsg.hasClass("placeholder"))
				personalizedMsg.val(" ");
		}
		
		if($(this).hasClass("giftCardProduct")){
			var addToCart=true;
			  $.ajax({
					url: cartURL,
					method: "POST",
					async: false,
					dataType:"html"
				}).success(function(response){
					if($(response)[0].value === "true"){
						buttonClicked.parent().find(".quantityExceeded").removeClass('contentHider');
						addToCart = false;
						return false;
					}else{
						buttonClicked.parent().find(".quantityExceeded").addClass('contentHider');
						addToCart = true;
					}
				});
			  if(!addToCart){
				  return false;  
			  }
			
		}
		e.preventDefault();		
		
		if(qty.length === 0 || isNaN(qty.val()) || parseInt(qty.val(), 10) === 0) {
			qty.val("1");
		}
		
		var data = form.serialize();
		app.cart.update(data, function (response) {
			var uuid = form.find("input[name='uuid']");
			if (uuid.length > 0 && uuid.val().length > 0) {
				app.cart.refresh();
			}
			else {				
				if (!isSubItem) {
					app.quickView.close();
				}
				app.minicart.show(response);
			}
			
		});
		
		if(typeof pid[0] != 'undefined' && pid[0].value!=null)
		{	
			cmCreateShopAction5Tag(pid[0].value,pName[0].value,qty[0].value,pPrice[0].value,cgid[0].value);
		}
		cmDisplayShops();
		if($(this).hasClass("checkPersonalizedMessage")){
			personalizedMsg.val('');
		}
	}
	
	

	/*************** app.product public object ***************/
	app.product = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			loadZoom();
		},
		get : function (options) {
			// loads a product into a given container div
			// params
			//		containerId - id of the container div, if empty then global app.containerId is used
			//		source - source string e.g. search, cart etc.
			//		label - label for the add to cart button, default is Add to Cart
			//		url - url to get the product
			//		id - id of the product to get, is optional only used when url is empty
			var target = options.target || app.quickView.init();
			var source = options.source || "";

			var productUrl = options.url || app.util.appendParamToURL(app.urls.getProductUrl, "pid", options.id);
			if(source.length > 0) {
				productUrl = app.util.appendParamToURL(productUrl, "source", source);
			}			

			// show small loading image
			//app.progress.show(app.ui.primary);
			app.ajax.load({
				target : target,
				url : productUrl,
				data : options.data || "",
				// replace with callback passed in by options
				callback : options.callback || app.product.init
			});
		},
		getAvailability : function (pid, quantity, callback) {
			app.ajax.getJson({
				url: app.util.appendParamsToUrl(app.urls.getAvailability, {pid:pid, Quantity:quantity}),
				callback: callback
			});
		},
		initAddThis : function () {
			
			//re-load twitter widgets.js (cached)
			$.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true});
			
			//re-load pinterest script (cached)
			$.ajax({ url: '//assets.pinterest.com/js/pinit.js', dataType: 'script', cache:true});
			/*
			var addThisServices = ["facebook","twitter","pinterest_share"],
				addThisToolbox = $(".addthis_toolbox"),
				addThisLinks="";
				
			var i,len=addThisServices.length; 
			for (i=0;i<len;i++) {
				if (addThisToolbox.find(".addthis_button_"+addThisServices[i]).length==0) {
					addThisLinks += '<a class="addthis_button_'+addThisServices[i]+'"></a>';
				}
			}
			if (addThisLinks.length===0) { return; }
			
			addThisToolbox.html(addThisLinks);
			addthis.toolbox(".addthis_toolbox");
			*/
		},
		initAddToCart : function (target) {
			if (target) {
				target.on("click", ".add-to-cart", setAddToCartHandler);
			}
			else {
				$(".add-to-cart").on("click", setAddToCartHandler);
			}
		},
		// Some items need to be re-initialized whenever changing variants
		initVariant : function () {
			initializeDom();
			initializeCache();
			$cache.pdpMain.find("input[name='Quantity']").change();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.product.tile
(function (app, $) {
	var $cache = {};

	function initializeDom() {
		var tiles = $cache.container.find(".product-tile");
		if (tiles.length===0) { return; }
		$cache.container.find(".grid-tile .product-tile").syncHeight()
												.each(function (idx) {$(this).data("idx",idx);});
	}

	function initializeEvents() {
		app.quickView.initializeButton($cache.container, ".product-image");
		$cache.container.on("click", ".swatch-list a.swatch", function (e) {
			e.preventDefault();
			if ($(this).hasClass("selected")) { return; }
			
			var tile = $(this).closest(".grid-tile");
			$(this).closest(".swatch-list").find(".swatch.selected").removeClass("selected");
			$(this).addClass("selected");
			tile.find("a.thumb-link").attr("href", $(this).attr("href"));
			tile.find("a.name-link").attr("href", $(this).attr("href"));
		}).on("hover", ".swatch-list a.swatch", function (e) {
			if ($(this).hasClass("selected")) { return; }
			
			// get current thumb details
			var tile = $(this).closest(".grid-tile");
			var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
			var swatchImg = $(this).children("img").filter(":first");			
			var data = swatchImg.data("thumb");			
			
			var currentAtts = {
				src : thumb.attr("src"),
				alt : thumb.attr("alt"),
				title : thumb.attr("title")
			}
			
			thumb.attr({
				src : data.src,
				alt : data.alt,
				title : data.title
			});
			
			swatchImg.data("thumb", currentAtts);			
		});
	}

	/*************** app.product.tile public object ***************/
	app.product.tile = {
		init : function () {
			$cache = {
				container : $(".tiles-container")
			};
			initializeEvents();
			initializeDom();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.product.compare
(function (app, $) {
	var $cache = {},
		_currentCategory = "",
		_isClearing = false,
		MAX_ACTIVE = 6,
		CI_PREFIX = "ci-";

	/************** private ****************/
	function refreshContainer() {
		if (_isClearing) { return; }
		
		var ac = $cache.compareContainer.find(".active").length;

		if (ac < 2) {
			$cache.compareButton.attr("disabled", "disabled");
		}
		else {
			$cache.compareButton.removeAttr("disabled");
		}
		
		// update list with sequential classes for ui targeting
		var compareItems = $cache.compareContainer.find('.compare-item');
		for( i=0; i < compareItems.length; i++ ){
			compareItems.removeClass('compare-item-' + i);
			$(compareItems[i]).addClass('compare-item-' + i);
		}
		
		$cache.compareContainer.toggle(ac > 0);
		
	}

	function addToList(data) {
		// get the first compare-item not currently active
		var item = $cache.compareContainer.find(".compare-item").not(".active").first();
		if (item.length===0) { return; } // safety only

		// if already added somehow, return
		if ($("#"+CI_PREFIX+data.uuid).length > 0) {
			return;
		}
		// set as active item
		item.addClass("active")
			.attr("id", CI_PREFIX+data.uuid)
			.data("itemid", data.itemid);

		// replace the item image
		var itemImg = item.children("img.compareproduct").first();
		itemImg.attr({src : $(data.img).attr("src"), alt : $(data.img).attr("alt")});

		// refresh container state
		refreshContainer();

		var tile = $("#"+data.uuid);
		if (tile.length===0) { return; }

		// ensure that the associated checkbox is checked
		tile.find(".compare-check")[0].checked = true;
	}

	function removeFromList(uuid) {
		var item = $("#"+CI_PREFIX+uuid);
		if (item.length===0) { return; }

		// replace the item image
		var itemImg = item.children("img.compareproduct").first();
		itemImg.attr({src : app.urls.compareEmptyImage, alt : app.resources.EMPTY_IMG_ALT});

		// remove class, data and id from item
		item.removeClass("active")
			.removeAttr("id")
			.removeAttr("data-itemid")
			.data("itemid", "");

		// use clone to prevent image flash when removing item from list
		var cloneItem = item.clone();
		item.remove();
		cloneItem.appendTo($cache.comparePanel);
		refreshContainer();
		// ensure that the associated checkbox is not checked
		var tile = $("#"+uuid);
		if (tile.length === 0 ) { return; }

		tile.find(".compare-check")[0].checked = false;
	}

	function initializeCache() {
		$cache = {
			primaryContent : $("#primary"),
			compareContainer : $("#compare-items"),
			compareButton : $("#compare-items-button"),
			clearButton : $("#clear-compared-items"),
			comparePanel : $("#compare-items-panel")
		};
	}

	function initializeDom() {
		_currentCategory = $cache.compareContainer.data("category") || "";
		var active = $cache.compareContainer.find(".compare-item").filter(".active");
		active.each(function () {
			var uuid = this.id.substr(CI_PREFIX.length);
			var tile = $("#"+uuid);
			if (tile.length === 0 ) { return; }

			tile.find(".compare-check")[0].checked = true;
		});
		// set container state
		refreshContainer();
	}

	function initializeEvents() {
		// add event to buttons to remove products
		$cache.primaryContent.on("click", ".compare-item-remove", function (e, async) {
			var item = $(this).closest(".compare-item");
			var uuid = item[0].id.substr(CI_PREFIX.length);
			var tile = $("#"+uuid);
			var args = {
				itemid : item.data("itemid"),
				uuid : uuid,
				cb :  tile.length===0 ? null : tile.find(".compare-check"),
				async : async
			};
			app.product.compare.removeProduct(args);
			refreshContainer();
		});

		// Button to go to compare page
		$cache.primaryContent.on("click", "#compare-items-button", function () {
			window.location.href = app.util.appendParamToURL(app.urls.compareShow, "category", _currentCategory);
		});

		// Button to clear all compared items
		$cache.primaryContent.on("click", "#clear-compared-items", function () {
			_isClearing = true;
			$cache.compareContainer.hide()
								   .find(".active .compare-item-remove")
								   .trigger("click", [false]);
			_isClearing = false;

		});
	}

	/*************** app.product.compare public object ***************/
	app.product.compare = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
		},
		initCache : initializeCache,
		addProduct : function (args) {
			var items = $cache.compareContainer.find(".compare-item");
			var cb = $(args.cb);
			var ac = items.filter(".active").length;
			if(ac===MAX_ACTIVE) {
				if(!window.confirm(app.resources.COMPARE_CONFIRMATION)) {
					cb[0].checked = false;
					return;
				}

				// remove product using id
				var item = items.first();

				// safety check only. should never occur.
				if (item[0].id.indexOf(CI_PREFIX)!==0) {
					cb[0].checked = false;
					window.alert(app.resources.COMPARE_ADD_FAIL);
					return;
				}
				var uuid = item[0].id.substr(CI_PREFIX.length);
				app.product.compare.removeProduct({
					itemid: item.data("itemid"),
					uuid: uuid,
					cb: $("#"+uuid).find(".compare-check")
				});
			}

			app.ajax.getJson({
				url : app.urls.compareAdd,
				data : { 'pid' : args.itemid, 'category' : _currentCategory },
				callback : function (response) {
					if (!response || !response.success) {
						// response failed. uncheck the checkbox return
						cb.checked = false;
						window.alert(app.resources.COMPARE_ADD_FAIL);
						return;
					}

					// item successfully stored in session, now add to list...
					addToList(args);
				}
			});
		},

		removeProduct : function (args) {
			if (!args.itemid) { return; }
			var cb = args.cb ? $(args.cb) : null;
			app.ajax.getJson({
				url : app.urls.compareRemove,
				data : { 'pid' : args.itemid, 'category' : _currentCategory },
				async: args.async,
				callback : function (response) {
					if (!response || !response.success) {
						// response failed. uncheck the checkbox return
						if (cb && cb.length > 0) { cb[0].checked = true; }
						window.alert(app.resources.COMPARE_REMOVE_FAIL);
						return;
					}

					// item successfully removed session, now remove from to list...
					removeFromList(args.uuid);
				}
			});
		}
	};

}(window.app = window.app || {}, jQuery));

// app.compare
(function (app, $) {
	var $cache = {};

	function initializeCache() {
		$cache = {
			compareTable : $("#compare-table"),
			categoryList : $("#compare-category-list")
		};
	}

	function initializeDom() {
		app.product.tile.init();
	}

	function initializeEvents() {
		$cache.compareTable.on("click", ".remove-link", function (e) {
			e.preventDefault();
			app.ajax.getJson({
				url : this.href,
				callback : function (response) {
					app.page.refresh();
				}
			});
		})
		.on("click", ".open-quick-view", function (e) {
			e.preventDefault();
			var form = $(this).closest("form");
			app.quickView.show({
				url:form.attr("action"),
				source:"quickview",
				data:form.serialize()
			});
		});

		$cache.categoryList.on("change", function () {
			$(this).closest("form").submit();
		});
	}

	/*************** app.compare public object ***************/
	app.compare = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			app.product.initAddToCart();
		}
	};


}(window.app = window.app || {}, jQuery));

// send to friend
(function (app, $) {
	var $cache = {},
		initialized=false;
	function initializeEvents() {
		app.util.limitCharacters();		
		if (initialized) {return; }			
		$cache.dialog.on("click", ".preview-button, .send-button, .edit-button", function (e) {
			e.preventDefault();
			//$cache.form.validate();
			if (!$cache.form.valid()) {
				return false;
			}
			var requestType = $cache.form.find("#request-type");
			if (requestType.length>0) {
				requestType.remove();
			}
			$("<input/>").attr({id:"request-type", type:"hidden", name:$(this).attr("name"), value:$(this).attr("value")}).appendTo($cache.form);
			var data = $cache.form.serialize();
			app.ajax.load({url:$cache.form.attr("action"),
				   data: data,
				   target: $cache.dialog,
				   callback: function() {
						app.validator.init();
						app.util.limitCharacters();
						$cache.form = $("#send-to-friend-form");
						$(".ui-dialog-content").dialog("option", "position", "center");													
				   }
			});
		})
		.on("click", ".cancel-button, .close-button", function (e) {
			e.preventDefault();
			$cache.dialog.dialog("close");
		});
		initialized=true;
	}

	/*************** app.sendToFriend public object ***************/
	app.sendToFriend = {
		init : function () {
			$cache = {
				form: $("#send-to-friend-form"),
				dialog: $("#send-to-friend-dialog"),
				pdpForm: $("form.pdpForm")
			};			
			initializeEvents();
		},
		initializeDialog : function (eventDelegate, eventTarget) {
			$(eventDelegate).on("click", eventTarget, function (e) {
				var settingresponsivewidthsend={}

				if($(window).width()<=960){settingresponsivewidthsend={width: $(window).width()*0.8,height:$(window).height()*0.8}}
				else{settingresponsivewidthsend={width:450,height:400}}
				e.preventDefault();
				var dlg = app.dialog.create({target:$("#send-to-friend-dialog"), options:{
					width:settingresponsivewidthsend.width,
					height:settingresponsivewidthsend.height,
					title:this.title,
					open:function() {
						app.sendToFriend.init();
						app.validator.init();
					}
				}});

				var data = app.util.getQueryStringParams($("form.pdpForm").serialize());
				if (data.cartAction) {
					delete data.cartAction;
				}
				
				var url = app.util.appendParamsToUrl(this.href, data);
				 
				var params = app.util.getQueryStringParams(window.location.href.split("?")[1]);
				
				 
				if(params['campaign']){
					var url = app.util.appendParamsToUrl(url, params);
				}
				 
				url = this.protocol + "//" + this.hostname + ((url.charAt(0)==="/") ? url : ("/"+url));

				app.ajax.load({
					url:app.util.ajaxUrl(url),
					target:dlg,
					callback: function () {
						dlg.dialog("open");	 // open after load to ensure dialog is centered
					}
				});
			});
		}
	};

}(window.app = window.app || {}, jQuery));


// app.search
(function (app, $) {
	var $cache = {};

	/**
	 *  replaces breadcrumbs, lefthand nav and product listing with ajax and puts a loading indicator over the product listing
	 */
	function updateProductListing(isHashChange) {
		
		//var hash = window.location.hash;
		var hash = (window.location.href.split("#").length > 1)?"#"+window.location.href.split("#")[1]:window.location.hash;//TempFirefox
		
		if(hash==='#results-content' || hash==='#results-products') { return; }

		var refineUrl = null;
		if (hash.length > 0) {
			refineUrl = window.location.pathname+"?"+hash.substr(1);
		}
		else if (isHashChange) {
			refineUrl = window.location.href;
			
		}

		if (!refineUrl) { return; }

		app.progress.show($cache.content);
		$cache.main.load(app.util.appendParamToURL(refineUrl, "format", "ajax"), function () {
			app.product.compare.init();
			app.product.tile.init();
			initializeRefinements();
			updateCategoryListing();
			app.progress.hide();
			godiva.colExpand.init();
		});
	}
	
	/**
	 *  updates category listing page content slots
	 */
	function updateCategoryListing() {
//		//Only update if this is a category listing page
//		if($(".category-search-result-items").length > 0) {
//			//Get all the promo content slots
//			var largePromo = $("#large-promo");
//			var fullRowPromo1 = $("#full-row-promo-1");
//			var fullRowPromo2 = $("#full-row-promo-2");
//			var smallPromoLeft = $("#small-promo-left");
//			var smallPromoRight1 = $("#small-promo-right-1");
//			var smallPromoRight2 = $("#small-promo-right-2");
//
//			//Count products
//			var productCount = $(".grid-tile .product-tile").length;
//
//			/*  
//				Re-position slots if any previous slots are vacant using offset to
//				calculate new position.
//
//				For each slot:
//					Determine if a content slot has content
//					If so:
//						Use offset to calculate new position and move slot (if needed)
//						Update offset
//				The offset represents how many non-product grid positions are used by a content slot
//			*/
//			var offset = 0;
//
//			if(largePromo.length > 0 && largePromo.html().replace(/<!--(.*?)-->/g, "").trim() != "") {
//				offset += 4;
//			} else {
//				largePromo.hide();
//			}
//			if(smallPromoRight1.length > 0 && smallPromoRight1.html().replace(/<!--(.*?)-->/g, "").trim() != "" && productCount > 7-offset) {
//				if(offset < 4) {
//					smallPromoRight1.insertAfter(".grid-tile:eq(" + (7-offset) + ")");
//				}
//				offset += 1;
//			} else {
//				smallPromoRight1.hide();
//			}
//			if(fullRowPromo1.length > 0 && fullRowPromo1.html().replace(/<!--(.*?)-->/g, "").trim() != "" && productCount > 12-offset) {
//				if(offset < 5) {
//					fullRowPromo1.insertBefore(".grid-tile:eq(" + (12-offset) + ")");
//				}
//				offset += 3;
//			} else {
//				fullRowPromo1.hide();
//			}
//			if(smallPromoLeft.length > 0 && smallPromoLeft.html().replace(/<!--(.*?)-->/g, "").trim() != "" && productCount > 18-offset) {
//				if(offset < 8) {
//					smallPromoLeft.insertBefore(".grid-tile:eq(" + (18-offset) + ")");
//				}
//				offset += 1;
//			} else {
//				smallPromoLeft.hide();
//			}
//			if(fullRowPromo2.length > 0 && fullRowPromo2.html().replace(/<!--(.*?)-->/g, "").trim() != "" && productCount > 24-offset) {
//				if(offset < 9) {
//					fullRowPromo2.insertBefore(".grid-tile:eq(" + (24-offset) + ")");
//				}
//				offset += 3;
//			} else {
//				fullRowPromo2.hide();
//			}
//			if(smallPromoRight2.length > 0 && smallPromoRight2.html().replace(/<!--(.*?)-->/g, "").trim() != "" && productCount > 31-offset) {
//				if(offset < 12) {
//					smallPromoRight2.insertAfter(".grid-tile:eq(" + (31-offset) + ")");
//				}
//				offset += 1;
//			} else {
//				smallPromoRight2.hide();
//			}
//		}
	}
	
	/** 
	 *  initializes price slider
	 */
	function initializeRefinements() {
		// initialize scrollbars
		$('.scrollpane').jScrollPane({
			autoReinitialise: true
		});
		
		//SelectBox
		jQuery("SELECT").selectBox();
		
		// initialize price slider
		// make sure slider exists and get initialization values 
		if($("#price-refinement-slider").length > 0) {
			var priceFullRangeMin = $("#price-refinement-slider .slider-full-range-min").val();
			var priceFullRangeMax = $("#price-refinement-slider .slider-full-range-max").val();
			var priceSelectedMin = $("#price-refinement-slider .amount-low").html();
			var priceSelectedMax = $("#price-refinement-slider .amount-high").html();
			
			//set values parameter to match current refinements
			$("#price-refinement-slider .slider-range" ).slider({
				range: true,
				min: parseInt(priceFullRangeMin),
				max: parseInt(priceFullRangeMax),
				step: 5,
				values: [ priceSelectedMin, priceSelectedMax ],
				slide: function( event, ui ) {
					$("#price-refinement-slider .amount-low").html(ui.values[0]),
					$("#price-refinement-slider .amount-high").html(ui.values[1]);
				}
			});
		}
	}

	function initializeEvents() {
		
		// price slider
		$cache.main.on("slidechange", "#price-refinement-slider .slider-range", function (e) {
			var priceSlider = $(this);
			var priceRangeLow = priceSlider.slider("values",0);
			var priceRangeHigh = priceSlider.slider("values",1);

			var params = {'pmin' : priceRangeLow,
							'pmax' : priceRangeHigh
			};
			
			var url = $("#price-refinement-slider").find(".price-refine-url").attr("href");

			url = app.util.appendParamsToUrl(url, params);

			var uri = app.util.getUri(decodeURI(url));
			var refineUrl = uri.query.length > 1 ? decodeURIComponent(uri.query.substr(1)) : "";

			window.location.hash = encodeURI(refineUrl);
			return false;
		});

		// compare checked
		$cache.main.on("click", "input[type='checkbox'].compare-check", function (e) {
			var cb = $(this);
			var tile = cb.closest(".product-tile");

			var func = this.checked ? app.product.compare.addProduct : app.product.compare.removeProduct;
			var itemImg = tile.find("div.product-image a img").first();
			func({
				itemid : tile.data("itemid"),
				uuid : tile[0].id,
				img : itemImg
			});

		});

		// handle toggle refinement blocks
		//$cache.main.on("click", ".refinement h3 span", function (e) {
			//$(this).parent().toggleClass('expanded').siblings('ul').toggle();
		//});
		
		// handle events for updating grid
		$cache.main.on("click", ".refinements .refinement:not(.Category) a, .pagination a, .breadcrumb-refinement-value a", function (e) {
			e.preventDefault();
			if($(this).parent().hasClass("unselectable")) { return; }
			var uri = app.util.getUri(this);
			
			if( uri.query.length > 1 ) {
				window.location.hash = encodeURI(decodeURIComponent(uri.query.substring(1))); //TempFirefox 
			} else {
				window.location.href = encodeURI(this.href);
			}
			return false;
		});

		// handle events item click. append params.
		/*$cache.main.on("click", ".product-tile a:not('#quickviewbutton','.addtobagicon')", function (e) {
			var a = $(this);
			// get current page refinement values
			var wl = window.location;
			
			var qsParams = (wl.search.length > 1) ? app.util.getQueryStringParams(wl.search.substr(1)) : {};
			//var hashParams = (wl.hash.length > 1) ? app.util.getQueryStringParams(wl.hash.substr(1)) : {};
			//var hashParams = (wl.hash.length > 1) ? app.util.getQueryStringParams(wl.href.split("#")[1]) : {}; //

			var aParams = app.util.getQueryStringParams(a.attr('href').substr(1));

			// merge hash params with querystring params
			var params = $.extend(hashParams, qsParams);
			if (!params.start) {
				params.start = 0;
			}
			
			if (!params.cgid && aParams.cgid && aParams.cgid != 'Search') {
				params.cgid = aParams.cgid;
			}
			
			// get the index of the selected item and save as start parameter
			var tile = a.closest(".product-tile");
			var idx = tile.data("idx") ? +tile.data("idx") : 0;

			// convert params.start to integer and add index
			params.start=(+params.start)+(idx+1);
			
			// set the hash and allow normal action to continue
			a[0].hash = $.param(params);
		});*/

		// handle sorting change
		$cache.main.on("change", ".sort-by select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			return false;
		})
		.on("change", ".items-per-page select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			return false;
		});

		// handle hash change
		$(window).hashchange(function () {
			updateProductListing(true);
		});
	}

	app.search = {
		init : function () {
			$cache = {
				main : $("#main"),
				items : $("#search-result-items")
			};
			$cache.content = $cache.main.find(".search-result-content");
			//if (app.product.compare) {
				app.product.compare.init();
			//}
			updateProductListing(false);
			updateCategoryListing();
			app.product.tile.init();
			initializeRefinements();
			initializeEvents();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.bonusProductsView
(function (app, $) {
	var $cache = {};
	var selectedList = [];
	var maxItems = 1;
	var bliUUID = "";

	function getBonusProducts() {
		var o = {};
		o.bonusproducts = [];

		var i, len;
		/*for (i=0, len=selectedList.length;i<len;i++) {
			var p = { pid : selectedList[i].pid,	qty : selectedList[i].qty, options : {} };
			var a, alen, bp=selectedList[i];
			for (a=0,alen=bp.options.length;a<alen;a++) {
				var opt = bp.options[a];
				p.options = {optionName:opt.name,optionValue:opt.value};
			}
			o.bonusproducts.push({product:p});
		}*/
		for (i=0, len=selectedList.length;i<len;i++) {
			var p = { pid : selectedList[i].pid,	qty : selectedList[i].qty };
			var a, alen, bp=selectedList[i];
			
			o.bonusproducts.push({product:p});
		}
		return o;
	}

	function updateSummary() {
		
		if (selectedList.length===0) {
			$cache.bonusProductList.find("li.selected-bonus-item").remove();
		}
		else {
			var ulList = $cache.bonusProductList.find("ul.selected-bonus-items").first();
			var itemTemplate = ulList.children(".selected-item-template").first();
			$cache.bonusProductList.find("li.selected-bonus-item").remove();
			var i, len;
			for (i=0, len=selectedList.length;i<len;i++) {
				var item = selectedList[i];
				var li = itemTemplate.clone().removeClass("selected-item-template").addClass("selected-bonus-item");
				
				li.attr("data-uuid",item.uuid);
				li.attr("data-pid",item.pid);
				  
				li.find(".item-name").html(item.name);
				li.find(".item-qty").html(item.qty);
				var ulAtts = li.find(".item-attributes");
				var attTemplate = ulAtts.children().first().clone();
				ulAtts.empty();
				var att;
				for (att in item.attributes) {
					var attLi = attTemplate.clone();
					attLi.addClass(att);
					attLi.children(".display-name").html(item.attributes[att].displayName);
					attLi.children(".display-value").html(item.attributes[att].displayValue);
					attLi.appendTo(ulAtts);
				}
				li.appendTo(ulList);
			}
			ulList.children(".selected-bonus-item").show();
		}
		
		// get remaining item count
		var remain = maxItems - selectedList.length;
		$cache.bonusProductList.find(".bonus-items-available").text(remain);
		if (remain <= 0) {
			$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
		}
		else {
			$cache.bonusProductList.find("button.button-select-bonus").removeAttr("disabled");
		}
	}
	/********* public app.bonusProductsView object *********/
	app.bonusProductsView = {
		init : function () {
			$cache = {
				bonusProduct : $("#bonus-product-dialog"),
				resultArea : $("#product-result-area")
			};
		},
		show : function (url) {
			// add element to cache if it does not already exist
			if(!$cache.bonusProduct) {
				app.bonusProductsView.init();
			}

			// create the dialog
			$cache.bonusProduct = app.dialog.create({
				target : $cache.bonusProduct,
				options : {
					width: 650,
					dialogClass : 'quickview',
					title : app.resources.BONUS_PRODUCTS
				}
			});

			// load the products then show
			app.ajax.load({
				target : $cache.bonusProduct,
				url : url,
				callback : function () {
					$cache.bonusProduct.dialog('open');
					app.bonusProductsView.initializeGrid();
				}
			});

		},
		// close the quick view dialog
		close : function () {
			$cache.bonusProduct.dialog('close');
		},
		loadBonusOption : function () {
			$cache.bonusDiscountContainer = $(".bonus-discount-container");
			if ($cache.bonusDiscountContainer.length===0) { return; }

			app.dialog.create({
				target : $cache.bonusDiscountContainer,
				options : {
					height : 'auto',
					width : 350,
					dialogClass : 'quickview',
					title : app.resources.BONUS_PRODUCT
				}
			});
			$cache.bonusDiscountContainer.dialog('open');

			// add event handlers
			$cache.bonusDiscountContainer.on("click", ".select-bonus-btn", function (e) {
				e.preventDefault();
				var uuid = $cache.bonusDiscountContainer.data("lineitemid");
				var url = app.util.appendParamsToUrl(app.urls.getBonusProducts,
													 {
														bonusDiscountLineItemUUID : uuid,
														source : "bonus"
													 });

				$cache.bonusDiscountContainer.dialog('close');
				app.bonusProductsView.show(url);
			}).on("click", ".no-bonus-btn", function (e) {
				$cache.bonusDiscountContainer.dialog('close');
			});
		},
		initializeGrid : function () {
			$cache.bonusProductList = $("#bonus-product-list"),
				bliData = $cache.bonusProductList.data("line-item-detail");

			maxItems = bliData.maxItems;
			bliUUID = bliData.uuid;
			
			if (bliData.itemCount>=maxItems) {
				$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
			}
			
			var cartItems = $cache.bonusProductList.find(".selected-bonus-item");
			
			cartItems.each(function() {
				var ci = $(this);
				
				var product = {
					uuid : ci.attr("data-uuid"),
					pid : ci.attr("data-pid"),
					qty : ci.find(".item-qty").text(),
					name : ci.find(".item-name").html(),
					attributes: {}
				};
				var attributes = ci.find("ul.item-attributes li");
				attributes.each(function(){
					var li = $(this);
					product.attributes[li.data("attributeId")] = {
						displayName:li.children(".display-name").html(),
						displayValue:li.children(".display-value").html()
					};
				});
				selectedList.push(product);
			});

	
			$cache.bonusProductList.on("click", "div.bonus-product-item a[href].swatchanchor", function (e) {
				e.preventDefault();

				var anchor = $(this),
					bpItem = anchor.closest(".bonus-product-item"),
					bpForm = bpItem.find("form.bonus-product-form"),
					qty = bpForm.find("input[name='Quantity']").first().val(),
					params = {
						Quantity : isNaN(qty) ? "1" : qty,
						format : "ajax",
						source : "bonus",
						bonusDiscountLineItemUUID : bliUUID
					};

				var url = app.util.appendParamsToUrl(this.href, params);

				app.progress.show(bpItem);
				app.ajax.load({
					url: url,
					callback : function (data) {
						bpItem.html(data);
					}
				});
			})
			.on("click", "button.button-select-bonus", function (e) {
				e.preventDefault();
				if (selectedList.length>=maxItems) {
					$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
					$cache.bonusProductList.find("bonus-items-available").text("0");
					return;
				}

				var form = $(this).closest("form.bonus-product-form"),
					detail = $(this).closest(".product-detail");
					uuid = form.find("input[name='productUUID']").val(),
					qtyVal = form.find("input[name='Quantity']").val(),
					qty = isNaN(qtyVal) ? 1 : (+qtyVal);

				var product = {
					uuid : uuid,
					pid : form.find("input[name='pid']").val(),
					qty : qty,
					name : detail.find(".product-name").text(),
					attributes : detail.find(".product-variations").data("current"),
					options : []
				};

				var optionSelects = form.find("select.product-option");

				optionSelects.each(function (idx) {
					product.options.push({
						name : this.name,
						value : $(this).val(),
						display : $(this).children(":selected").first().html()
					});
				});
				selectedList.push(product);
				updateSummary();
			})
			.on("click", ".remove-link", function(e){
				e.preventDefault();
				var container = $(this).closest("li.selected-bonus-item");
				if (!container.attr("data-uuid")) { return; }
				
				var uuid = container.attr("data-uuid");
				var i, len = selectedList.length;
				for(i=0;i<len;i++) {
					if (selectedList[i].uuid===uuid) {
						selectedList.splice(i,1);
						break;
					}
				}
				updateSummary();
			})
			.on("click", ".add-to-cart-bonus", function (e) {
				e.preventDefault();
				var url = app.util.appendParamsToUrl(app.urls.addBonusProduct, {bonusDiscountLineItemUUID:bliUUID});
				var bonusProducts = getBonusProducts();
				// make the server call
				$.ajax({
					type : "POST",
					dataType : "json",
					cache	: false,
					contentType : "application/json",
					url : url,
					data : JSON.stringify(bonusProducts)
				})
				.done(function (response) {
					// success
					app.page.refresh();
				})
				.fail(function (xhr, textStatus) {
					// failed
					if(textStatus === "parsererror") {
						window.alert(app.resources.BAD_RESPONSE);
					} else {
						window.alert(app.resources.SERVER_CONNECTION_ERROR);
					}
				})
				.always(function () {
					$cache.bonusProduct.dialog("close");
				});
			});
		}
	};
	
	/**************** app.pwpProductsView object *********************/
	
	app.pwpProductsView = {
			init : function () {
				$cache = {
					pwpProduct : $("#pwp-product-dialog"),
					resultArea : $("#product-result-area")
				};
			},
			show : function (url) {
				
				// add element to cache if it does not already exist
				if(!$cache.pwpProduct) {
					app.pwpProductsView.init();
				}
				
				// create the dialog
				$cache.pwpProduct = app.dialog.create({
					target : $cache.pwpProduct,
					options : {
						width: 660,
						dialogClass : 'quickview',
						title : app.constants.PWP_MODAL_TITLE,
						 close: function(event, ui)
					        {
							 $(this).dialog('destroy').remove();
					        }
					}
				});
				
				// load the products then show
				app.ajax.load({
					target : $cache.pwpProduct,
					url : url,
					callback : function () {
						$cache.pwpProduct.dialog('open');
						app.pwpProductsView.initGrid();
					}
				});
				
			},
			// close the quick view dialog
			close : function () {
				$cache.pwpProduct.dialog('destroy').remove();
			},
			loadPwpOption : function () {	
				// CHECK IF bonus-discount-container EXISTS
				
				// If yes, popups for PWP should not be there
				$cache.bonusContainer = $(".bonus-discount-container");
				
				if($cache.bonusContainer.length > 0){
					return;
				}
			
				// else show the popup
				$cache.pwpContainer = $(".pwp-discount-container");
				if($cache.pwpContainer.length === 0){return;}
			    $cache.pwpContainer.css("display","block");
					app.dialog.create({
					target : $cache.pwpContainer,
					options : {
						height : 'auto',
						width : 350,
						dialogClass : 'quickview',
						title : app.constants.PWP_MODAL_TITLE,
						 close: function(event, ui)
					        {
							 $(this).dialog('destroy').remove();
					        }
					}
				});
				$cache.pwpContainer.css("display","none");
				$cache.pwpContainer.dialog('open');
	
				$cache.pwpContainer.on("click", ".select-pwp-btn", function (e) {
					e.preventDefault();
					var url = app.urls.selectPwpProduct;
					
					$cache.pwpContainer.dialog('destroy').remove();
				
					app.pwpProductsView.show(url);
				}).on("click", ".no-bonus-btn", function (e) {
					$cache.pwpContainer.dialog('destroy').remove();
					
				});
				
			},
			initGrid : function () {
				
				$cache.pwpProductList = $("#pwp-product-list");
				
				$cache.pwpProductList.on("blur", "input[name='Quantity']" , function (e) {
					
					var selectedProduct = '#' + $(this).attr('productID');
					var allowedQty = $cache.pwpProductList.find("input[name='pwpAllowedQtyPerProduct']").val();
					var qty = $(this).closest(".pwpProductDetailContainer").find("input[name='Quantity']").val();
					var a2cButton = $cache.pwpProductList.find(".add-to-cart-pwp"); 
										
					// check for allowed qty based on site pref value
					if(qty > allowedQty) {
							$(selectedProduct).attr("disabled","disabled");
							a2cButton.attr("disabled","disabled");
										
					} else if (qty <= allowedQty) {
						var attr = a2cButton.attr('disabled');
						if (typeof attr !== 'undefined' && attr !== false) {
							a2cButton.removeAttr("disabled");
							
						}
						var selectButtonAttr = $(selectedProduct).attr('disabled');
						if (typeof selectButtonAttr !== 'undefined' && selectButtonAttr !== false) {
								$(selectedProduct).removeAttr("disabled");
							}
						}
				})
				.on("click", ".add-to-cart-pwp", function (e) { // add to cart on popup coming from the cart page
					e.preventDefault();
					
					var pid = $cache.pwpProductList.find(".product-number > span").html();
					var qty = $cache.pwpProductList.find("input[name='Quantity']").val();
					
					//add-to-cart url
					var url = app.util.appendParamsToUrl(app.urls.addProduct, {pid:pid,Quantity:qty,format:"ajax"});
						
					// make the server call
					$.ajax({
						type : "POST",
						cache	: false,
						url : url
					})
					.done(function (response) {
						// success
						app.page.refresh();
					})
					.fail(function (xhr, textStatus) {
						// failed
						if(textStatus === "parsererror") {
							window.alert(app.resources.BAD_RESPONSE);
						} else {
							window.alert(app.resources.SERVER_CONNECTION_ERROR);
						}
					})
					
				})
				.on("click", ".button-select-pwp", function (e){
					e.preventDefault();
					var parentContainer = $(this).closest(".pwpProductDetailContainer");
					var plistStr = "<li>"+ $(parentContainer).find('.product-number > span').html() +"##########"+ $(parentContainer).find("input[name='Quantity']").val() +"</li>";
					
					$('#pwpProduct_list').append(plistStr);
				
				})
				.on("click", ".add-to-cart-pwp-global", function (e){
					// global add to cart btn code
					
					e.preventDefault();
					var str = "";
					$('#pwpProduct_list li').each(function(){
						var arr = $(this).text().split('##########');
						str = "pid="+ arr[0] + "&Quantity="+arr[1];
						var url = app.urls.addProduct+'?'+str+'&format=ajax';
					
						$.ajax({
							type : "POST",
							cache	: false,
							url : url
						})
						.done(function (response) {
							// success
							app.page.refresh();
						})
						.fail(function (xhr, textStatus) {
							// failed
							if(textStatus === "parsererror") {
								window.alert(app.resources.BAD_RESPONSE);
							} else {
								window.alert(app.resources.SERVER_CONNECTION_ERROR);
							}
						})
					});
										
				});
			}
		};

}(window.app = window.app || {}, jQuery));

// app.giftcard
(function (app, $) {
	
	app.giftcard = {
		checkBalance : function (id, pin, callback) {
			// load gift certificate details
			var url = app.util.appendParamToURL(app.urls.giftCardCheckBalance, "giftCertificateID", id);
			url = app.util.appendParamToURL(url, "giftCertificatePin", pin);
			app.ajax.getJson({
				url: url,
				callback: callback
			});
		},
	
		apply : function(id, pin){
			var url = app.util.appendParamToURL(app.urls.giftCardApply, "giftCertificateID", id);
			url = app.util.appendParamToURL(url, "giftCertificatePin", pin);
			url = url + "#redemption";
			window.location=url;
			//app.page.refresh();
			/*app.ajax.getJson({
				url: url,
				callback: callback
			});*/
		}
	};
}(window.app = window.app || {}, jQuery));

// app.checkout
(function (app, $) {
	var $cache = {},
		isShipping = false,
		isBilling = false,
		shippingMethods = null;

	/**
	 * Helper method which constructs a URL for an AJAX request using the
	 * entered address information as URL request parameters.
	 */
	function getShippingMethodURL(url) {
		var newUrl = app.util.appendParamsToUrl(url, 
												{
													countryCode:$cache.countryCode.val(),
												 	stateCode:$cache.stateCode.val(),
												 	postalCode:$cache.postalCode.val(),
												 	city:$cache.city.val()
												 },
												 true);
		return newUrl;
	}

	//updates the order summary based on a possibly recalculated
	//basket after a shipping promotion has been applied
	function updateSummary() {
		var url = app.urls.summaryRefreshURL;
		var summary = $("#secondary.summary");
		// indicate progress
		app.progress.show(summary);

		// load the updated summary area
		summary.load( url, function () {
			// hide edit shipping method link
			summary.fadeIn("fast");
			summary.find('.checkout-mini-cart .minishipment .header a').hide();
			summary.find('.order-totals-table .order-shipping .label a').hide();
		});
	}

	//selects a shipping method for the default shipment
	//and updates the summary section on the right hand side
	function selectShippingMethod(shippingMethodID) {
		// nothing entered
		if(!shippingMethodID) {
			return;
		}
		// attempt to set shipping method
		var url = app.util.appendParamsToUrl(app.urls.selectShippingMethodsList,
											 { countryCode:$cache.countryCode.val(),
											   stateCode:$cache.stateCode.val(),
											   postalCode:$cache.postalCode.val(),
											   city:$cache.city.val(),
											   shippingMethodID:shippingMethodID
											 },
											 true);

		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				updateSummary();
				if(!data || !data.shippingMethodID) {
					window.alert("Couldn't select shipping method.");
					return false;
				}
				// display promotion in UI and update the summary section,
				// if some promotions were applied
				$(".shippingpromotions").empty();
				if(data.shippingPriceAdjustments && data.shippingPriceAdjustments.length > 0) {
					var i,len=data.shippingPriceAdjustments.length;
					for(i=0; i<len; i++) {
						var spa = data.shippingPriceAdjustments[i];
					}
				}
			}
		});
	}

	/**
	 * Make an AJAX request to the server to retrieve the list of applicable shipping methods
	 * based on the merchandise in the cart and the currently entered shipping address
	 * (the address may be only partially entered).  If the list of applicable shipping methods
	 * has changed because new address information has been entered, then issue another AJAX
	 * request which updates the currently selected shipping method (if needed) and also updates
	 * the UI.
	 */
	function updateShippingMethodList() {
		if ($cache.shippingMethodList == null || $cache.shippingMethodList.length === 0) { return; }
		var url = getShippingMethodURL(app.urls.shippingMethodsJSON);

		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					window.alert("Couldn't get list of applicable shipping methods.");
					return false;
				}
				if (shippingMethods && shippingMethods.toString() === data.toString())
				{
					// No need to update the UI.  The list has not changed.
					return true;
				}

				// We need to update the UI.  The list has changed.
				// Cache the array of returned shipping methods.
				shippingMethods = data;

				var smlUrl = getShippingMethodURL(app.urls.shippingMethodsList);

				// indicate progress
				app.progress.show($cache.shippingMethodList);

				// load the shipping method form
				$cache.shippingMethodList.load( smlUrl, function () {
					$cache.shippingMethodList.fadeIn("fast");
					// rebind the radio buttons onclick function to a handler.
					$cache.shippingMethodList.find("[name$='_shippingMethodID']").click(function () {
						selectShippingMethod($(this).val());
					});

					// update the summary
					
					updateSummary();
					app.progress.hide();
					app.tooltips.init();
				});
			}
		});
		 
	}
	
function updateShippingMethodsonPOBoxDeselect(cCode, sCode, pCode, selectedCity, Address1, Address2) {
		
		var url = app.util.appendParamsToUrl(app.urls.shippingMethodsList, 
			{
				countryCode:cCode,
			 	stateCode:sCode,
			 	postalCode:pCode,
			 	city:selectedCity,
			 	address1:Address1,
			 	address2:Address2
			});
		
		jQuery.ajax({	
			type: "POST",
			url: url,
			dataType: 'html',
			success: function(data){
				jQuery(".shippingmethods.singleship").html(data);
				setupLabel();
	      		jQuery(".shipping-method").find(".input-radio:eq(0)").click();
			},
			failure: function(data) {
				alert("An error was encountered while processing your request");		
			}
		});
		
	}
	/** 
	 * Update shipping methods and dates (triggered on address change)
	 */
	function updateShippingMethods() {
						  
		//if($cache.countryCode.val()!='' && $cache.stateCode.val()!='' && $cache.postalCode.val()!=''&& $cache.city.val()!=''){
			
		var currentSelectedShippingMethodID =  jQuery(".shipping-method").find(".input-radio").filter(':checked').attr("id");
		var shipBydate = jQuery("#shipByDateDate").val();
		var shipByDateType = jQuery("#shipByDateType").val();
		var isShipmentSaved = "";
		if($('.shipmentmethodslide li').length > 1) {
	var truckObject = $(this).find(
    '.lorry-icon-container');
	
		isShipmentSaved=truckObject.hasClass("exclime");
}
		
		var url = app.util.appendParamsToUrl(app.urls.shippingMethodsList, 
			{
				countryCode:$cache.countryCode.val(),
			 	stateCode:$cache.stateCode.val(),
			 	postalCode:$cache.postalCode.val(),
			 	city:$cache.city.val(),
			 	address1:$cache.address1.val(),
			 	ispobox:jQuery('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').is(":checked"),
			 	address2:$cache.address2.val(),
			 	selectedAddressID:$("#selectedAddressID").val()
			});
		
		
		if ( $('.shipmentmethodslide li').length > 1 ) {
			
	 
			url = app.util.appendParamsToUrl(app.urls.shippingMethodsListForMultiShipment, 
					{
						countryCode:$cache.countryCode.val(),
					 	stateCode:$cache.stateCode.val(),
					 	postalCode:$cache.postalCode.val(),
					 	city:$cache.city.val(),
					 	address1:$cache.address1.val(),
					 	address2:$cache.address2.val(),
					 	ispobox:jQuery('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').is(":checked"),
					 	address2:$cache.address2.val(),
					 	uuid: jQuery("#shipmentuuid").val(),
					 	selectedAddressID:$("#selectedAddressID").val()
					});
				
		}
		
		if(!isShipmentSaved) {
			url = url + "&saveAddress=false";
		}else {
			url = url + "&saveAddress=true";
		}
		
		var isShippingtoPOBox = $("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").is(":checked");
		var strawberryBlock = $('.shipment-strawberry').length;
		
		
		
		jQuery.ajax({
			type: "POST",
			url: url,
			dataType: 'html',
			async: false,
			success: function(data){
								
				jQuery(".shippingmethods.singleship").html(data);
				var shippingmethodSelected = $('#shippingMethodSelected').val();
				var disableBillingButton = $("#disableBillingButton").val();
				if(shippingmethodSelected == 'false' || disableBillingButton == 'false'){
					jQuery(".singleship-button .button-fancy-large").attr("disabled", true).addClass('disable');
				}else {
					jQuery(".singleship-button .button-fancy-large").attr("disabled", false).removeClass('disable');
				}
				var address1PO = $('#isPOBoxAddress1').val();
				var address2PO = $('#isPOBoxAddress2').val();
				var stateCode = $cache.stateCode.val();

				if((isShippingtoPOBox == true || address1PO == 'true' || address2PO == 'true') && (stateCode == 'AK' || stateCode == 'HI')){
					$(".akhi-PO").show();					
				}else {
					$(".akhi-PO").hide();
				}
				if(address1PO == 'true' || address2PO == 'true' || isShippingtoPOBox == true){
					$("#poboxmessagecontent").show();
					if(isShippingtoPOBox == true) {
						$("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").attr("checked", true);
					} else {
						$("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").attr("checked", false);
					}
					
					if(strawberryBlock == 1){
						if($('.shipment-strawberry').find('.shipping-disclaimer').length == 1){
							//$("button[name='dwfrm_singleshipping_shippingAddress_save']").attr('disabled','true').addClass('disable');
						}
					}
				}
				else {
					$("#poboxmessagecontent").hide();
					if(isShippingtoPOBox == false) {
						$("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").attr("checked", false);
					} else {
						$("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").attr("checked", true);
					}
					
					if(strawberryBlock == 1){
						if(stateCode == "AK" || stateCode == "HI" || stateCode == 'AA' || stateCode == 'AE' || stateCode == 'AP') {
							$("button[name='dwfrm_singleshipping_shippingAddress_save']").attr('disabled','true').addClass('disable');
						} else {							
							$("button[name='dwfrm_singleshipping_shippingAddress_save']").removeAttr('disabled').removeClass('disable');	
						}
					}
				}
				
				setupLabel();
	      		//reselectShippingMethods(shipBydate,currentSelectedShippingMethodID,shipByDateType);
	      		$('.view-all,.dialogify,.resetAll,a.modal-link').css('pointer-events','auto').css('cursor','pointer');
	      		
	
	      		if(jQuery(".shipment-strawberry").find(".date_selector").length == 1) {	   				
	      			jQuery(".shipment-strawberry").find(".date_selector").show();
					jQuery("#sdate").next().addClass("r_on");	
										
					if(typeof(shipingmethodtitleClicked) == 'undefined'){
						var dateString = jQuery('.strawberryDateAfterSave').val();						
	      			} else {
	      				var dateString = jQuery(shipingmethodtitleClicked).parent().find('.strawberryDateAfterSave').val();
	      			}					
				
					jQuery(".shipping-delivery-date").hide();
					if(jQuery('#strawberryDate').val() == ''){						
						jQuery(".shipping-delivery-date").show();
						jQuery("#displaysdate").html(dateString);
						
						if(dateString.split("/").length == 3)
						{	
							var sdateArray = dateString.split("/");
							var sdateString = "";
							sdateString = sdateArray[2] + "-" + sdateArray[0] + "-" + sdateArray[1];
							jQuery("#strawberrySelectedDate").val(sdateString);
						}
						
						
					} else {					
						jQuery(".shipping-delivery-date").show();
						jQuery("#displaysdate").html(jQuery('#strawberryDate').val());	
						
						if(jQuery('#strawberryDate').val().split("/").length == 3)
						{	
							var sdateArray = jQuery('#strawberryDate').val().split("/");
							var sdateString = "";
							sdateString = sdateArray[2] + "-" + sdateArray[0] + "-" + sdateArray[1];
							jQuery("#strawberrySelectedDate").val(sdateString);
						}
							
					}
	                					
					if(jQuery("#displaysdate").text() == '' || jQuery("#displaysdate").text() == ' '){
      					jQuery("span.sdateresult").addClass('hide');
      					$('#shiping-method-form-data').find(".date_selector").show();
                    	//$('#shiping-method-form-data').find(".strawberry-shipping-msg").hide();
                    	//$('#shiping-method-form-data').find(".shipping-standard").hide(); 
                    	//$("button[name='dwfrm_singleshipping_shippingAddress_save']").attr('disabled','true').addClass('disable');
      				} else {
      					jQuery("span.sdateresult").removeClass('hide');
      					//jQuery(".shipment-strawberry").find(".date_selector").hide();
      					//$('#shiping-method-form-data').find(".date_selector").hide();
      					$('#shiping-method-form-data').find(".strawberry-shipping-msg").show().css({'top': '0px', 'opacity': '1'});
      					//$('#shiping-method-form-data').find(".shipping-standard").show();   
      					//$("button[name='dwfrm_singleshipping_shippingAddress_save']").removeAttr('disabled').removeClass('disable');	
      				}
				}
	      		var excludedZipCode = $("#excludedZipCode").val();
	        	if(excludedZipCode == "true"){
	        		$("#excludedZipCodeErrMsg").removeClass("contentHider");
	        	}
	        	else if (excludedZipCode == "false"){
	        		$("#excludedZipCodeErrMsg").addClass("contentHider");
	        	}
	      		 
			},
			failure: function(data) {
				alert("An error was encountered while processing your request");		
			}
		});
		//}
	}

				//reselectShippingMethods is a function that attempts to set the same shipping method the user selected even though ,the user changed the address later on
				//as long as the shipping method is applicable to the new address, if nto it defaults to the standard shippin method

     function  reselectShippingMethods(date,currentSelectedShippingMethodID,shipByDateType){
     
        if(shipByDateType == "date" ||shipByDateType == "week" ||shipByDateType == "holiday" ){
        
	        var dateArray = date.split("-");
		    dateString = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
	           var selector = "#"+shipByDateType ;
	           if(jQuery(selector).length >0){
	        	   	jQuery(selector).click();
					if(shipByDateType == "week") {
						jQuery("#week").click();
						jQuery("span.weekresult").removeClass('hide');
						jQuery("#shipByDateDate").val(date);
						jQuery("#displayweek").html(dateString);
					} else if(shipByDateType == "date") {
						jQuery("#date").click();
						jQuery("span.dateresult").removeClass('hide');
						jQuery("#shipByDateDate").val(date);
						jQuery("#displaydate").html(dateString);
					} else if(shipByDateType == "holiday") {
						jQuery("#holiday").click();
						jQuery("#shipByDateDate").val(date);
					} else {
						jQuery("#shipByDateDate").val(date);
					}
	           }
					        
        } else {
	         var selector = "#"+currentSelectedShippingMethodID ;
	         if(jQuery(".shipping-method").find(selector).length >0){
	        	 jQuery(".shipping-method").find(selector).click();
	         } else {
	        	 jQuery(".shipping-method").find(".input-radio:eq(0)").click();
	         }        
        }
     
     }
	//shipping page logic
	//checkout gift message counter
	function initGiftMessageBox() {
		// show gift message box, if shipment is gift
		$cache.giftMessage.toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);

	}

	function shippingLoad() {
				
		var strawberryBlock = $('.shipment-strawberry').length;
		if(strawberryBlock==1) {	
			//$('#shiping-method-form-data').find(".shipping-standard").hide();
			
			if(typeof(shipingmethodtitleClicked) == 'undefined'){  
				var dateString = jQuery('.strawberryDateAfterSave').val();
			} else {
				var dateString = jQuery(shipingmethodtitleClicked).parent().find('.strawberryDateAfterSave').val();
			}
			
			$('#shiping-method-form-data .shipment-strawberry').find("span.sdateresult").removeClass('hide');
			
			$('#shiping-method-form-data .shipment-strawberry').find("#displaysdate").html(dateString);
			
			
			if(typeof(dateString) != 'undefined' && dateString.split("/").length == 3)
			{	
				var sdateArray = dateString.split("/");
				var sdateString = "";
				sdateString = sdateArray[2] + "-" + sdateArray[0] + "-" + sdateArray[1];
				jQuery("#strawberrySelectedDate").val(sdateString);
			}
			
			if($('#shiping-method-form-data .shipment-strawberry').find("#displaysdate").text() == ''){
			  	$('#shiping-method-form-data .shipment-strawberry').find(".date_selector").show();
			  	//$('#shiping-method-form-data').find(".strawberry-shipping-msg").hide();
			  	//$('#shiping-method-form-data').find(".shipping-standard").hide(); 
			  	//$("button[name='dwfrm_singleshipping_shippingAddress_save']").attr('disabled','true').addClass('disable');
			} else {				
				jQuery(".shipping-delivery-date").show();
				//$('#shiping-method-form-data').find(".date_selector").hide();
				$('#shiping-method-form-data').find(".strawberry-shipping-msg").show().css({'top': '0px', 'opacity': '1'});
				//$('#shiping-method-form-data').find(".shipping-standard").show();
				//$("button[name='dwfrm_singleshipping_shippingAddress_save']").removeAttr('disabled').removeClass('disable');
			}
			
		} else {
			//$('#shiping-method-form-data').find(".shipping-standard").show();	
		}		
				
		$cache.checkoutForm.on("click", "#is-gift-yes, #is-gift-no", function (e) {
			$cache.checkoutForm.find(".gift-message-text").toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);
		})
		.on("change",
			"select[name$='_addressFields_states_state'], " +
			"input[name$='_addressFields_city'], " +
			"input[name$='_addressFields_zip'], " +
			"input[name$='_addressFields_address1'], " +
			"input[name$='_addressFields_address2'],"+
			"input[name$='_addressFields_ispobox'],",
			updateShippingMethods
		);
		// save shipping Form to LocalDB for autoFill When Needed
		
			$cache.checkoutForm.on("change",
			"select[name$='_addressFields_states_state'], " +
			"input[name$='_addressFields_city'], " +
			"input[name$='_addressFields_zip'], " +
			"input[name$='_addressFields_address1'], " +
			"input[name$='_addressFields_address2'], " +
			"input[name$='_addressFields_firstName'], " +
			"input[name$='_addressFields_lastName'], " +
			"input[name$='_addressFields_companyName'], " +
			"input[name$='_addressFields_ispobox'], " +
			"select[name$='_addressFields_country'], " +
			"input[name$='_addressFields_phone'], " +
			"input[name$='_addToAddressBook'], " +
			"input[name$='_shippingAddress_shippingMethodID'], " +
			"input[name$='dataePicker'], " +
			"input[name$='weekPicker'], " +
			"input[name$='latestClick'], " +
			"input[name$='_giftOptions_giftMessage_giftMessageLine1'], " +
			"input[name$='_giftOptions_giftMessage_giftMessageLine2'], " +
			"input[name$='_giftOptions_giftMessage_giftMessageLine3'], " +
			"input[name$='_giftOptions_giftMessage_giftMessageLine4'], " +
			"input[name$='_giftOptions_giftMessage_giftMessageLine5']" ,
			  function (e) {
			setupLabel();
			$('#currentShipmentEdited').val('true');
			 var checkoutFormObject = $($cache.checkoutForm).serializeObject() ;
		     app.data.set(checkoutFormObject.shipmentIDtoBeProcessed,checkoutFormObject);
			 return false ;
		 }
		);
		
		//P.O box ch
		$cache.checkoutForm.on("change", "#dwfrm_singleshipping_shippingAddress_addressFields_ispobox", function(e) {
			var isShippingtoPOBox = $("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").is(":checked");
			var stateCode = $cache.stateCode.val();
			setupLabel();
			if(isShippingtoPOBox == false && (stateCode == 'AK' || stateCode == 'HI')){
				$(".akhi-surcharge").show();
				var countryCode= $("#dwfrm_singleshipping_shippingAddress_addressFields_country").val();
				var stateCode = $("#dwfrm_singleshipping_shippingAddress_addressFields_states_state").val();
				var postalCode = $("#dwfrm_singleshipping_shippingAddress_addressFields_zip").val();
				var city = $("#dwfrm_singleshipping_shippingAddress_addressFields_city").val();
				var address1 = $("#dwfrm_singleshipping_shippingAddress_addressFields_address1").val();
				var address2 = $("#dwfrm_singleshipping_shippingAddress_addressFields_address2").val();
				$('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').attr('disabled','true');
				//$('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').prev("label").removeClass('custom-checkbox');
				$('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').prev("label").addClass('r_db');
				$(".akhi-PO").hide();
				$("#poboxmessagecontent").hide();					
				updateShippingMethodsonPOBoxDeselect(countryCode, stateCode, postalCode, city, address1, address2);
			}
			else {
				$("#poboxmessagecontent").show();
				updateShippingMethods();
			}
		});
		
		$cache.checkoutForm.on("change","#dwfrm_singleshipping_shippingAddress_addressFields_states_state", function() {
			
			$cache.checkoutForm.validate().element($(this));
			var stateCode = $(this).val();
			if(stateCode == "AK" || stateCode == "HI") {
				
				$(".akhi-surcharge").show();
				var isShippingtoPOBox = $("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").is(":checked");
				var address1PO = $('#isPOBoxAddress1').val();
				var address2PO = $('#isPOBoxAddress2').val();
				if(isShippingtoPOBox == true || (address1PO == 'true' || address2PO == 'true')){
					$(".akhi-PO").show();
					return;
				}
				else{
					$('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').attr('disabled','true');
					//$('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').prev("label").removeClass('custom-checkbox');
					$('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').prev("label").addClass('r_db');
				}
				
				if(strawberryBlock == 1){
					if($('.shipment-strawberry').find('.shipping-disclaimer').length == 1){
						//$("button[name='dwfrm_singleshipping_shippingAddress_save']").attr('disabled','true').addClass('disable');
					}	
				}
					
			} else {
				$(".akhi-surcharge").hide();
				$(".akhi-PO").hide();
				$('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').removeAttr('disabled');
				$('#dwfrm_singleshipping_shippingAddress_addressFields_ispobox').prev("label").removeClass('r_db');
				
				if(strawberryBlock == 1){
					//$("button[name='dwfrm_singleshipping_shippingAddress_save']").removeAttr('disabled').removeClass('disable');
				}
			}
			updateShippingMethods();
		});

		// update available states
		app.util.updateStateOptions($("select.country"));

		// gift message character limitation
		initGiftMessageBox();
		return null;
	}	

	function startCountryStates()
	{
		if(jQuery("select.country").val() == "US" || jQuery("select.country").val() == "CA" || jQuery("select.country").val() == "" || jQuery("select.stateselect").val() == null)
		{
			jQuery("select.stateselect").parent().show();			
			jQuery("select.stateselect").addClass('required').addClass('valid');
			jQuery("select.stateselect").closest('.form-row').addClass('required');
			jQuery("a.stateselect").addClass('required');
			jQuery("input.stateprovince").parent().hide();
			
		}
		else
		{
			jQuery("select.stateselect").parent().hide();
			jQuery("select.stateselect option[value='OTHER']").attr('selected', 'selected');
			jQuery("select.stateselect").removeClass("required").removeClass('valid');
			jQuery("a.stateselect").removeClass('required');
			jQuery("select.stateselect").closest('.form-row').removeClass('required error');
			jQuery("input.stateprovince").parent().show();
		}
	}
	
	function addressLoad() {
				
		// select address from list
		$cache.addressList.on("change", function () {
			
            jQuery("#dwfrm_singleshipping_shippingAddress_updateAddress").prev().removeClass("r_on");
			var addresss = $('#addresses').val();
			var selectedAddress = $(this).children(":selected").first().val(); 
			
			$("#selectedAddressID").val(selectedAddress);
			var id = $(this).attr('rel');
			var page = $('#page').val();			
			var selected = $(this).children(":selected").first();
			var data = $(selected).data("address");
			var containsPRAddress = addresss.indexOf(data.ID);
			if(containsPRAddress != -1 && page == 'shipping'){
				$('#PRError').show();
				return;
			}
			$('#PRError').hide();
			if (!data) { return; }
			var p;
			var invokeUpdateShippingMethods = false;
			for (p in data) {
				if(p == 'postBox') {
					if(data[p] == true) {
						jQuery("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").attr("checked", true);
					}
					else {
						jQuery("#dwfrm_singleshipping_shippingAddress_addressFields_ispobox").attr("checked", false);
					}
					setupLabel();
				}
				if ($cache[p] && data[p] && p!='postBox') {
					$cache[p].val(data[p].replace("^","'"));
					// special handling for countrycode => stateCode combo
					if ($cache[p]===$cache.countryCode) {
						$cache.countryCode.trigger("change");
						app.util.updateStateOptions($cache[p]);
						if(data[p] == "US" || data[p] == "CA")
						{
							$cache.stateCode.val(data.stateCode);
							$cache.stateCode.trigger({
								type:"change",
							    _fake:"1"
						   });
						}
						else{
							$cache.stateProvince.val(data.stateCode);
							$cache.stateProvince.trigger("change");
							
							
						}
					}
					else {
						invokeUpdateShippingMethods = true;
						//updateShippingMethods();
					}
				}
				jQuery('input[name="discardAddress"]:hidden').attr('value',1); 
				jQuery("#dwfrm_singleshipping_shippingAddress_updateAddress").attr("checked", false);
				$('#addToAddresBookCheckbox').hide();
				$('#updateAddresscheckbox').show();
				$('#addToAddresBookCheckboxBilling').hide();
				$('#updateAddresscheckboxBilling').show();
				$('.updateAddress').attr("disabled", true);
				$cache.checkoutForm.on("change",
						"input[name$='_addressFields_city'], " +
						"input[name$='_addressFields_zip'], " +
						"input[name$='_addressFields_address1'], " +
						"input[name$='_addressFields_address2'], " +
						"input[name$='_addressFields_firstName'], " +
						"input[name$='_addressFields_lastName'], " +
						"input[name$='_addressFields_companyName'], " +
						"input[name$='_addressFields_phone']",
						  function(e){
					var updateCheckboxVal=jQuery("#dwfrm_singleshipping_shippingAddress_updateAddress").prev().hasClass("r_on");
					var discardUpdateVal=jQuery('input[name="discardAddress"]:hidden').val();
				if(!e._fake && updateCheckboxVal==false && discardUpdateVal=='1')
				$('#updateAddress-Confirm-Warning')
			    .dialog({
			        title: "Update Address",
			        modal: true,
			        overlay: {
                        opacity: 0.5,
                        background: "black"
                    }
			    });
				});
				
			}
			
			if(invokeUpdateShippingMethods)
				updateShippingMethods();
			
			if(page == 'shipping') {
			var f_name=$('#dwfrm_singleshipping_shippingAddress_addressFields_firstName').val().length; 
        	var l_name=$('#dwfrm_singleshipping_shippingAddress_addressFields_lastName').val().length; 
        	 result_val=parseInt(l_name)+parseInt(f_name); 
        	if(result_val>35)
        		{
        		 $("#error_msg_last").text("Firstname and Lastname should not exceed 35 characters");
        		 $("#error_msg_last").css("display","inline");
        		}
        	 if(result_val<=35)
    		{ 
        		 $("#error_msg_last").css("display","none");
    		}
			}
        	         	
			// re-validate the form
			/* Commenting out the form validation (billing page) on change of address from address list.
			 * This is because the entire form is being validated, on change of address, if no card is pre-selected the credit card section 
			 * is throwing validation errors.
			 */ 
			//$cache.checkoutForm.validate().form();
		});

		// update state options in case the country changes
		/*$cache.countryCode.on("change", function () {
			app.util.updateStateOptions(this);
		});*/
		
		$("body").on("change", "select.country", function () {
			app.util.updateStateOptions(this);
		});
		
	/*----------------------------Registration Validation----------------------------------------------------*/	
		
		 /*$("#dwfrm_profile_customer_lastname, #dwfrm_profile_customer_firstname").keydown(function(){ 
	        	
	        	var f_name=$('#dwfrm_profile_customer_firstname').val().length; 
	        	var l_name=$('#dwfrm_profile_customer_lastname').val().length; 
	        	 result_val_billing=parseInt(l_name)+parseInt(f_name); 
	        	if(result_val_billing>34)
	        		{ 
	        		 $("#error_msg_last_register").text("Firstname and Lastname should not exceed 35 characters");
	        		 $("#error_msg_last_register").css("display","inline");
	        		} 
	        });*/
	        $("#dwfrm_profile_customer_lastname, #dwfrm_profile_customer_firstname").keyup(function(){ 
	        	var f_name=$('#dwfrm_profile_customer_firstname').val().length; 
	        	var l_name=$('#dwfrm_profile_customer_lastname').val().length; 
	        	 result_val_billing=parseInt(l_name)+parseInt(f_name); 
	        	 if(result_val_billing<=35)
	    		{ 
	        		 $("#error_msg_last_register").css("display","none");
	    		}
	        	 if(result_val_billing>35)
	        		{
	        		 $("#error_msg_last_register").text("Firstname and Lastname should not exceed 35 characters");
	        		 $("#error_msg_last_register").css("display","inline");
	        		} 
	        	
	        });
		
		/*----------------------------Registration Validation 35 characters----------------------------------------------------*/		
		
		$("#dwfrm_profile_confirm").click(function(){
			var f_name=$('#dwfrm_profile_customer_firstname').val().length; 
        	var l_name=$('#dwfrm_profile_customer_lastname').val().length; 
        	var result_val_billing=parseInt(l_name)+parseInt(f_name); 
        	if(result_val_billing>35)
        		{ 
        		 $("#error_msg_last_register").text("Firstname and Lastname should not exceed 35 characters");
        		  $("#dwfrm_profile_customer_firstname").focus();
        		  $(window).scrollTop(0); 
        		  return false;
        		}
        	
        	else if ($('#RegistrationForm').valid() == true) {
        		//Commenting the scroll to top. Single ship redesign
                //$(window).scrollTop(0);
            }
			if(jQuery("select.country").val() == "US" || jQuery("select.country").val() == "CA")
			{				
				jQuery("input.stateprovince").val(jQuery("select.stateselect option:selected").val());
				
			}
			else {
				
				jQuery("select.stateselect option[value='AL']").attr('selected', 'selected');				
			}
			
			if(jQuery("select.country").val() != "US" && jQuery("#dwfrm_profile_customer_rewards").prev().hasClass("r_on"))
			{
				var options = {
						title : $("#rewards-alert h2.title").html(),
						dialogClass : "no-title",
						height : 150,
						width : 400
				};
				app.dialog.open({selector: "#rewards-alert", options: options});	
				return false;				
			};		
			return;
		});

		jQuery("select.country").on("change", function() {
			
		
			if(jQuery(this).val() == "US" || jQuery(this).val() == "CA")
			{
				
			
				jQuery("select.stateselect").parent().show();
				jQuery("select.stateselect").addClass('required').addClass('valid');
				jQuery("select.stateselect").closest('.form-row').addClass('required');
				jQuery("a.stateselect").addClass('required');
				jQuery("input.stateprovince").parent().hide();
				if(jQuery(this).val() == "US")
					{ jQuery("#dwfrm_profile_customer_rewards").removeAttr("disabled"); }
				else
				{
					jQuery("#dwfrm_profile_customer_rewards").attr("checked", false);
					jQuery("#dwfrm_profile_customer_rewards").attr("disabled", true);
					jQuery("#dwfrm_profile_customer_rewards").prev().removeClass("r_on");
				}
				
			}
			else
			{	
				jQuery("select.stateselect").removeClass('required').removeClass('valid');
				jQuery("select.stateselect option[value='OTHER']").attr('selected', 'selected');
				jQuery("a.stateselect").removeClass('required');
				jQuery("select.stateselect").closest('.form-row').removeClass('required');
				jQuery("select.stateselect").parent().hide();
				jQuery("input.stateprovince").val(" ");
				jQuery("input.stateprovince").parent().show();
				jQuery("#dwfrm_profile_customer_rewards").attr("checked", false);
				jQuery("#dwfrm_profile_customer_rewards").attr("disabled", true);
				jQuery("#dwfrm_profile_customer_rewards").prev().removeClass("r_on");			
				
			}
		});
		jQuery("select.stateselect").on("change", function() {
			
			jQuery("input.stateprovince").val(jQuery("select.stateselect option:selected").val());
		});
		jQuery("input.stateprovince").on("change", function() {
			
			jQuery("select.stateselect option[value='AL']").attr('selected', 'selected');
		});

		startCountryStates();
		if(jQuery("select.stateselect option:selected").val() > '' && !(jQuery("input.stateprovince").val() > ''))
		{
			jQuery("input.stateprovince").val(" ");
		}


	}

	//changes the payment method form
	function changePaymentMethod(paymentMethodID) {
		$cache.paymentMethods.removeClass("payment-method-expanded");
		var pmc = $cache.paymentMethods.filter("#PaymentMethod_"+paymentMethodID);
		if (pmc.length===0) {
			pmc = $("#PaymentMethod_Custom");
		}
		pmc.addClass("payment-method-expanded");

		// ensure checkbox of payment method is checked
		if($("#is-" + paymentMethodID)[0] != null && $("#is-" + paymentMethodID)[0] != '') {
		$("#is-" + paymentMethodID)[0].checked = true;
		
		var bmlForm = $cache.checkoutForm.find("#PaymentMethod_BML");
		bmlForm.find("select[name$='_year']").removeClass("required");
		bmlForm.find("select[name$='_month']").removeClass("required");
		bmlForm.find("select[name$='_day']").removeClass("required");
		bmlForm.find("input[name$='_ssn']").removeClass("required");
		}
		if (paymentMethodID==="BML") {
			var yr = bmlForm.find("select[name$='_year']");
			bmlForm.find("select[name$='_year']").addClass("required");
			bmlForm.find("select[name$='_month']").addClass("required");
			bmlForm.find("select[name$='_day']").addClass("required");
			bmlForm.find("input[name$='_ssn']").addClass("required");
		}
		app.validator.init();
	}

	function setCCFields(data) {
		
		//Handling of expired credit cards
		
		var expiryYearMonth= new Date(data.expirationYear,parseInt(data.expirationMonth)-1);		
		var presentYearMonth= new Date(data.presentYear,data.presentMonth);		
		if(expiryYearMonth.getFullYear()<presentYearMonth.getFullYear()){
			$('#dialogmessage').dialog({ title: "Expired Credit Card " ,modal: true, dialogClass: "expiredCard", buttons: [ { text: "close",  click: function() { $( this ).dialog( "close" ); } } ] });
			$('.expiredCard button').addClass("button-fancy-large");
			return;
		}
		if(expiryYearMonth.getFullYear()==presentYearMonth.getFullYear()){
			if(expiryYearMonth.getMonth()<presentYearMonth.getMonth()) 	
				{
					$('#dialogmessage').dialog({ title: "Expired Credit Card ",modal: true, dialogClass: "expiredCard", buttons: [ { text: "close",  click: function() { $( this ).dialog( "close" ); } } ] });
					$('.expiredCard button').addClass("button-fancy-large");
					return;
				}			
		}
		
		// fill the form / clear the former cvn input
		$cache.ccOwner.val(data.holder);
		$cache.ccType.val(data.type);
		$(".cardTypes span").removeClass('removeOpacity');
		$("." +data.type).addClass('removeOpacity');
		
		$('#dwfrm_billing_paymentMethods_creditCard_selectedCardType').val(data.type);
		$cache.ccNum.val(data.maskedNumber);
		$cache.ccMonth.val(data.expirationMonth);
		$cache.ccYear.val(data.expirationYear);
		$cache.ccCcv.val("");
		
		// also set the jQuery select box values
		$cache.ccType.selectBox('value', data.type);
		$cache.ccMonth.selectBox('value', data.expirationMonth);
		$cache.ccYear.selectBox('value', data.expirationYear);

		// remove error messages
		$cache.ccContainer.find(".errormessage")
						  .toggleClass("errormessage")
						  .filter("span").remove();

		$cache.ccContainer.find(".errorlabel").toggleClass("errorlabel");
	}

	//updates the credit card form with the attributes of a given card
	function populateCreditCardForm(cardID) {
		// load card details
		var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					window.alert(app.resources.CC_LOAD_ERROR);
					return false;
				}
				$cache.ccList.data(cardID, data);
				setCCFields(data);
			}
		});
	}

	//loads billing address, Gift Certificates, Coupon and Payment methods
	function billingLoad() {
		app.util.updateStateOptions($cache.countryCode);
		$cache.paymentMethodId.on("click", function () {
			changePaymentMethod($(this).val());
			
		});

		// get selected payment method from payment method form
		var paymentMethodId = $cache.paymentMethodId.filter(":checked");
		changePaymentMethod(paymentMethodId.length===0 ? "CREDIT_CARD" : paymentMethodId.val());

		// select credit card from list
		$cache.ccList.on("change", function () {
			var cardUUID = $(this).val();
			if(!cardUUID) { return; }
			var ccdata = $cache.ccList.data(cardUUID);
			if (ccdata && ccdata.holder) {
				setCCFields(ccdata);
				return;
			}
			populateCreditCardForm(cardUUID);
		});

		// handle whole form submit (bind click to continue checkout button)
		// append form fields of current payment form to this submit
		// in order to validate the payment method form inputs too

		$cache.save.on('click', function (e) {
			
			var giftc = $("#dwfrm_billing_giftCertCode").val();
			var giftp = $("#dwfrm_billing_giftCertPin").val();
			if(giftc.length == 0 && giftp.length == 0)
			{
				return;
			}
			
			else if((giftc.length == 0 || giftp.length == 0)||(giftc.length > 0 || giftp.length > 0)){
				//alert("hi");
				if(giftc.length > 0 ){
				$('html, body').animate({
				      scrollTop: ($('.gift-card-row').first().offset().top)
				  },300);
				}
				else if(giftp.length > 0){
					$('html, body').animate({
					      scrollTop: ($('.gift-card-row').first().offset().top)
					  },300);
					return false;
					}
					
				}
			
			// determine if the order total was paid using gift cert or a promotion
			if ($("#noPaymentNeeded").length > 0 && $(".giftcertpi").length > 0) {
				// as a safety precaution, uncheck any existing payment methods
				$cache.paymentMethodId.filter(":checked").removeAttr("checked");
				// add selected radio button with gift card payment method
				$("<input/>").attr({
									name:$cache.paymentMethodId.first().attr("name"),
									type:"radio",
									checked:"checked",
									value:app.constants.PI_METHOD_GIFT_CERTIFICATE})
							 .appendTo($cache.checkoutForm);
			}
			
			//
			if ($cache.gcCode.val()!="") {
				$cache.gcCode.addClass("error");
				if ($cache.gcPin.val()!="") {
					$cache.gcPin.addClass("error");
				}								
				// error
				var error = $cache.balance.find("span.error");
				if (error.length===0) {
					error = $("<span>").addClass("error").appendTo($cache.balance);
				}
				error.html(app.resources.GIFT_CERT_NOT_APPLIED);
				return false;
			}
			
			var tc = $cache.checkoutForm.find("input[name$='bml_termsandconditions']");
			if ($cache.paymentMethodId.filter(":checked").val()==="BML" && !$cache.checkoutForm.find("input[name$='bml_termsandconditions']")[0].checked) {
				alert(app.resources.BML_AGREE_TO_TERMS);
				return false;
			}
			
		});

		$(".gcRemove").live("click", function(e){
			e.preventDefault();
			var id = $(this).attr('giftCertificateID');
			var url = app.util.appendParamToURL(app.urls.removeGiftCertificate, "giftCertificateID", id);
			url = url + "#redemption";
			
			
			$.ajax({
				type: "POST",
				url: url,
				dataType: 'html'
				
			})
			.done(function(response) {
				var result = $(response);
				$('#giftCardContainer').html(response);
				// Godiva-603
				/*var gcSection = result.filter("#giftCardSection").html();
				var paymentSection = result.filter("#paymentMethodsSection").html();
				$('#giftCardSection').empty().html(gcSection);
				$('#paymentMethodsSection').empty().html(paymentSection);
				var noPaymentMethodNeeded = $('#noPaymentNeeded').val();
				if(noPaymentMethodNeeded != true) {
					$('.paymentMethodsSection').show();
				}
				app.init();
				jQuery("SELECT").selectBox();
				jQuery("#dwfrm_singleshipping_shippingAddress_addressFields_states_state").selectBox('refresh');
				jQuery("#dwfrm_billing_addressList").selectBox('refresh');
				jQuery("#dwfrm_billing_billingAddress_addressFields_country").selectBox('refresh');
				jQuery("#dwfrm_billing_paymentMethods_creditCard_type").selectBox('refresh');
				jQuery("#dwfrm_billing_paymentMethods_creditCard_month").selectBox('refresh');
				jQuery("#dwfrm_billing_paymentMethods_creditCard_year").selectBox('refresh');*/
			});
				
			
		});
		
		$cache.gcCheckBalance.on("click", function (e) {
			e.preventDefault();
			$cache.gcCode = $cache.gcCode || $cache.checkoutForm.find("input[name$='_giftCertCode']");
			$cache.gcPin = $cache.gcPin || $cache.checkoutForm.find("input[name$='_giftCertPin']");
			//$cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
			$cache.balance = $cache.checkoutForm.find("div.balance");
			var gcCode = $cache.gcCode.val().replace(/\s+/g,'');
			var gcPin = $cache.gcPin.val().replace(/\s+/g,'');
			if (gcCode.length===0 || gcPin.length===0) {
				var error = $cache.balance.find("span.error");
				if (error.length===0) {
					error = $("<span>").addClass("error").appendTo($cache.balance);
				}
				if(gcCode.length===0) {
				error.html(app.resources.GIFT_CERT_MISSING);
				}
				else {
					error.html(app.resources.GIFT_CERT_PIN_MISSING);
				}
				return;
			}
			
			
			app.giftcard.checkBalance(gcCode, gcPin, function (data) {
				
				$cache.balance.html('');
				if(!data || !data.giftCertificate) {
					// error
					var error = $cache.balance.find("span.error");
					if (error.length===0) {
						error = $("<span>").addClass("error").appendTo($cache.balance);
					}
					error.html(app.resources.GIFT_CERT_INVALID);
					return;
				}
				// display details in UI
				$cache.balance.find("span.error").remove();
				var balance = data.giftCertificate.balance;
				$cache.balance.html(app.resources.GIFT_CERT_BALANCE+" "+balance);
			});
		});
		
		$cache.gcApply.on("click", function (e) {
			e.preventDefault();
			var validCard = true;
			$cache.gcCode = $cache.gcCode || $cache.checkoutForm.find("input[name$='_giftCertCode']");
			var gcCode = $cache.gcCode.val().replace(/\s+/g,'');
			$cache.gcPin = $cache.gcPin || $cache.checkoutForm.find("input[name$='_giftCertPin']");
			var gcPin = $cache.gcPin.val().replace(/\s+/g,'');
			$cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
			if (gcCode.length===0 || gcPin.length===0) {
				var error = $cache.balance.find("span.error");
				if (error.length===0) {
					error = $("<span>").addClass("error").appendTo($cache.balance);
				}
				if(gcCode.length===0) {
				error.html(app.resources.GIFT_CERT_MISSING);
				}
				else {
					error.html(app.resources.GIFT_CERT_PIN_MISSING);
				}
				return;
			}
			
			app.giftcard.checkBalance(gcCode, gcPin, function (data) {
				
				$cache.balance.html('');
				if(data.giftCertificaterror) {
					var error = $cache.balance.find("span.error");
					if (error.length===0) {
						error = $("<span>").addClass("error").appendTo($cache.balance);
					}
					error.html(app.resources.GIFT_CERT_CONNECTION_FAILURE);
					return;
				}
				else if(!data || !data.giftCertificate || data.giftCertificate.balance == '0.00') {
					// error
					var error = $cache.balance.find("span.error");
					if (error.length===0) {
						error = $("<span>").addClass("error").appendTo($cache.balance);
					}
					error.html(app.resources.GIFT_CERT_INVALID);
					return;
				} else {
					
					//var id = $cache.gcCode.val();
					var pin =$cache.gcPin.val();
					var url = app.util.appendParamToURL(app.urls.giftCardApply, "giftCertificateID", gcCode);
					url = app.util.appendParamToURL(url, "giftCertificatePin", gcPin);
					url = url + "#redemption";
					
					
					$.ajax({
						type: "POST",
						url: url,
						dataType: 'html'
						
					})
					.done(function(response) {
						var result =response;
						$cache.gcCode.val('');
						$cache.gcPin.val('');
                        $('#giftCardContainer').html(response);
                        // Godiva-603
						/*var gcSection = result.filter("#giftCardSection").html();
						var paymentSection = result.filter("#paymentMethodsSection").html();
						$('#giftCardSection').empty().html(gcSection);
						$('#paymentMethodsSection').empty().html(paymentSection);
						var noPaymentMethodNeeded = $('#noPaymentNeeded').val();
						if(noPaymentMethodNeeded) {
							$('.paymentMethodsSection').hide();
						}
						jQuery("SELECT").selectBox();
						jQuery("#dwfrm_singleshipping_shippingAddress_addressFields_states_state").selectBox('refresh');
						jQuery("#dwfrm_billing_addressList").selectBox('refresh');
						jQuery("#dwfrm_billing_billingAddress_addressFields_country").selectBox('refresh');
						jQuery("#dwfrm_billing_paymentMethods_creditCard_type").selectBox('refresh');
						jQuery("#dwfrm_billing_paymentMethods_creditCard_month").selectBox('refresh');
						jQuery("#dwfrm_billing_paymentMethods_creditCard_year").selectBox('refresh');
						app.init();*/
					});
					
					
				/*app.giftcard.apply($cache.gcCode.val(), $cache.gcPin.val(), function (data) {
					
					//var url = app.util.appendParamToURL(app.urls.giftCardApply, "giftCertificateID", id);
					//url = app.util.appendParamToURL(url, "giftCertificatePin", pin);
					
					
					
					//alert(data);
					//to be uncommented
					
					//$cache.redemption.html('');
					if(!data || !data.redemption) {
						// error
						var error = $cache.redemption.find("span.error");
						if (error.length===0) {
							error = $("<span>").addClass("error").appendTo($cache.redemption);
						}
						error.html(app.resources.GIFT_CERT_INVALID);
						return;
				}
					// display details in UI
					$cache.redemption.find("span.error").remove();
					var redemption = data.redemption.amount;
					//var html = "<div class='success giftcert-pi' id='gc-" + $cache.gcCode.val() + "'>Gift Card " + $cache.gcCode.val() + " for " + redemption + " applied. </div>";					
					var html1 = app.resources.GIFT_CERTIFICATE_MASKED + $cache.gcCode.val().toString().substring(11,15) 
								+ "</i><span><b>-" +redemption + app.resources.GIFT_CERTIFICATE_APPLIED +
								"</b></span> <a href='javascript:void(0);' id="
								+$cache.gcCode.val()+" class='remove' giftCertificateID="+$cache.gcCode.val()+"></a>";
					$cache.redemption.append(html1);
				});*/}
			});
			/*app.giftcard.apply($cache.gcCode.val(), $cache.gcPin.val(), function (data) {
				
				var url = app.util.appendParamToURL(app.urls.giftCardApply, "giftCertificateID", id);
				url = app.util.appendParamToURL(url, "giftCertificatePin", pin);
				app.
				$cache.redemption.html('');
				if(!data || !data.redemption) {
					// error
					var error = $cache.redemption.find("span.error");
					if (error.length===0) {
						error = $("<span>").addClass("error").appendTo($cache.redemption);
					}
					error.html(app.resources.GIFT_CERT_INVALID);
					return;
				}
				// display details in UI
				$cache.redemption.find("span.error").remove();
				var redemption = data.redemption.amount;
				var html = "<div class='success giftcert-pi' id='gc-" + $cache.gcCode.val() + "'>Gift Card " + $cache.gcCode.val() + " for " + redemption + " redeemed. </div>";
				$cache.redemption.html(html);
			});*/
		});
		
		$cache.addCoupon.on("click", function(e){
			e.preventDefault();
			$cache.couponCode = $cache.couponCode || $cache.checkoutForm.find("input[name$='_couponCode']");
			$cache.redemption = $cache.redemption || $cache.checkoutForm.find("div.redemption.coupon");
			var val = $cache.couponCode.val();
			if (val.length===0) { 
				var error = $cache.redemption.find("span.error");
				if (error.length===0) {
					error = $("<span>").addClass("error").appendTo($cache.redemption);
				}
				error.html(app.resources.COUPON_CODE_MISSING);					
				return;
			}
			
			var url = app.util.appendParamsToUrl(app.urls.addCoupon, {couponCode:val,format:"ajax"});
			$.getJSON(url, function(data) {
				var fail = false;
				var msg = "";
				if (!data) {
					msg = app.resources.BAD_RESPONSE;
					fail = true;
				}
				else if (!data.success) {
					msg = data.message;
					fail = true;
				}
				if (fail) {
					var error = $cache.redemption.find("span.error");
					if (error.length===0) {
						$("<span>").addClass("error").appendTo($cache.redemption);
					}
					error.html(msg);					
					return;
				}
				
				$cache.redemption.html(data.message);
			});
		});
	}

	function initializeDom() {
		isShipping = $(".checkout-shipping").length > 0;
		isBilling = $(".checkout-billing").length > 0;

	}

	function initializeCache() {
		$cache.checkoutForm = $("form.address");
		$cache.addressList = $cache.checkoutForm.find(".select-address select[id$='_addressList']");
		$cache.firstName = $cache.checkoutForm.find("input[name$='_firstName']");
		$cache.lastName = $cache.checkoutForm.find("input[name$='_lastName']");
		$cache.companyName = $cache.checkoutForm.find("input[name$='_companyName']");
		$cache.address1 = $cache.checkoutForm.find("input[name$='_address1']");
		$cache.address2 = $cache.checkoutForm.find("input[name$='_address2']");
		$cache.city = $cache.checkoutForm.find("input[name$='_city']");
		$cache.postBox = $cache.checkoutForm.find("checkbox[name$='_ispobox']");
		$cache.postalCode = $cache.checkoutForm.find("input[name$='_zip']");
		$cache.phone = $cache.checkoutForm.find("input[name$='_phone']");
		$cache.countryCode = $cache.checkoutForm.find("select[id$='_country']");
		$cache.stateCode = $cache.checkoutForm.find("select[id$='_state']");
		$cache.stateProvince = $cache.checkoutForm.find("input[name$='_stateprovince']");
		$cache.addToAddressBook = $cache.checkoutForm.find("input[name$='_addToAddressBook']");

		if ($cache.checkoutForm.hasClass("checkout-shipping")) {
			// shipping only
			$cache.useForBilling = $cache.checkoutForm.find("input[name$='_useAsBillingAddress']");
			$cache.giftMessage = $cache.checkoutForm.find(".gift-message-text");
			$cache.shippingMethodList = $("#shipping-method-list");
		}

		if ($cache.checkoutForm.hasClass("checkout-billing")) {
			// billing only
			$cache.email = $cache.checkoutForm.find("input[name$='_emailAddress']");
			$cache.save = $cache.checkoutForm.find("button[name$='_billing_save']");
			$cache.paymentMethods = $cache.checkoutForm.find("div.payment-method");
			$cache.paymentMethodId = $cache.checkoutForm.find("input[name$='_selectedPaymentMethodID']");
			$cache.ccContainer = $("#PaymentMethod_CREDIT_CARD");
			$cache.ccList = $("#creditCardList");
			$cache.ccOwner = $cache.ccContainer.find("input[name$='creditCard_owner']");
			$cache.ccType = $cache.ccContainer.find("select[name$='_type']");
			$cache.ccNum = $cache.ccContainer.find("input[name$='_number']");
			$cache.ccMonth = $cache.ccContainer.find("[name$='_month']");
			$cache.ccYear = $cache.ccContainer.find("[name$='_year']");
			$cache.ccCcv = $cache.ccContainer.find("input[name$='_cvn']");
			$cache.BMLContainer = $("#PaymentMethod_BML");
			$cache.gcCode = $cache.checkoutForm.find("input[name$='_giftCertCode']");
			$cache.gcPin = $cache.checkoutForm.find("input[name$='_giftCertPin']");
			$cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
			$cache.redemption = $cache.redemption || $cache.checkoutForm.find("div.redemption");
			$cache.gcCheckBalance = $("#gc-checkbalance");
			$cache.gcApply = $("#gc-apply");
			$cache.addCoupon = $("#add-coupon");
			$cache.gcRemove = $(".gcRemove");
		}
	}

	function initializeEvents() {
		addressLoad();
		if (isShipping) {
			shippingLoad();
		}
		if(isBilling) {
			billingLoad();
		}
	}

	/******* app.checkout public object ********/
	app.checkout = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
		}
	};
	
	
    jQuery(".address-register-user").live("click", function() {
  	jQuery('.address-register-user-container').hide();
    jQuery('#shipping-method-checkout-form .firstfieldset').show();
  	
  	var data = jQuery(this).data("address");
  	if (!data) { return; }
  	var p;
  	for (p in data) {
  		if ($cache[p] && data[p]) {
  			$cache[p].val(data[p].replace("^","'"));
  			// special handling for countrycode => stateCode combo
  			if ($cache[p]===$cache.countryCode) {
  				$cache.countryCode.trigger("change");
  				app.util.updateStateOptions($cache[p]);
  				if(data[p] == "US" || data[p] == "CA")
  				{
  					$cache.stateCode.val(data.stateCode);
  					$cache.stateCode.trigger("change");
  				}
  				else{
  					$cache.stateProvince.val(data.stateCode);
  					$cache.stateProvince.trigger("change");
  				}
  			}
  			else {
  				updateShippingMethods();
		}
		}
	}
  	// re-validate the form
  	$cache.checkoutForm.validate().form();
  });
    

}(window.app = window.app || {}, jQuery));


// app.quickview
(function (app, $) {
	var $cache = {};

	/*function bindQvButton() {
		$cache.qvButton.one("click", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : $(this).attr("href"),
				source : "quickview"
			});
		});
	}*/
	// Kamatchi Pandiarajan added for Carousel (What's inside)
	caculatingpopupsize= function(objectthis){	

		 this.settingresponsivewidth={}
		var getpopupwidth;
		var getpopupheight;
	
		if($(window).width()<=960){
			var temp
			if($(objectthis).data("dlg-options") == undefined){
				temp=$(objectthis).data("dlg-optionsremove");
			}else{
				temp=$(objectthis).data("dlg-options");
			}
			
			var getpopupheight,getpopupwidth;	
			if(temp!= undefined && temp.height != undefined){
			var tempheight=temp.height;
			if(tempheight>$(window).height()*0.8){
				getpopupheight=$(window).height()*0.8;
				}
			else{
				getpopupheight=tempheight;
				}
			}
			else{
				//getpopupheight=$("#wrapper").height()*0.8;
				getpopupheight="auto";
			}
			if(temp!= undefined && temp.width != undefined){
				var tempwidth=temp.width;					
				if(tempwidth>$("#wrapper").width()*0.8){
					getpopupwidth=$("#wrapper").width()*0.8;
				}
				else{
					getpopupwidth=tempwidth;
				}
			}
			else{
					getpopupwidth=$("#wrapper").width()*0.8;						
			}
			this.settingresponsivewidth.width = getpopupwidth;
			this.settingresponsivewidth.height= getpopupheight;
			}
	}
	app.quickviewcarouFredSel =function(){
			// toggle bottom slider		
			var imgDeskWh;			
			if( $('#wrapper').width() <= 480 ) {
				imgDeskWh = 2;
			}else {
				imgDeskWh = 4;	
			}
		
			jQuery('.product-horizontal-product-carousel-4x1 ul').carouFredSel({
				width: "100%",
				align: "center",
				height: "auto",
				circular: false,
				infinite: false,
				swipe: {
					onMouse: true,
					onTouch: true
				},						
				items: {
					visible: imgDeskWh,
					height: "variable",
					width: "variable"
				},
				auto : {
					 play : false
				 },
				scroll: {
					wipe: true,
					items: 3,
					pauseOnHover: true
				},
				prev: { button : function() {
		            return $(this).parents(".horizontal-product-carousel").find("#slide-prev");
					 }},
				next: { button :  function() {
		            return $(this).parents(".horizontal-product-carousel").find("#slide-next");
		       								 }},
				pagination: { 
					container   : function() {
					            return $(this).parents(".horizontal-product-carousel").find(".slider-control");
					        }
						},
				onCreate:function(data){
						var itemHeight=$(this).find('li:first-child').height();						
						$(this).css('height',itemHeight);
						$(this).parent().css('height',itemHeight);
						var imgHeight=$(this).find('li:first-child a.thumb-link').height();
						var iArrow=(itemHeight/2)+(imgHeight/2);
						$(this).parent().parent().find('#slide-next').css('margin-top',iArrow*-1);
						$(this).parent().parent().find('#slide-prev').css('margin-top',iArrow*-1);
						
				}								
			});
			
			if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				$('.expandcontainer_inside').hide();
			}
	};


	app.quickView = {
		initializeButton : function (container, target) {
			// quick view button
			$(container).on("mouseenter", target, function (e) {
				/*if(!$cache.qvButton) {
					$cache.qvButton = $("<a id='quickviewbutton'/>");					
				}*/
				//bindQvButton();
				
				var link = $(this).children("a:first");
				/*$cache.qvButton.attr({
					"href" : link.attr("href"),
					"title" : link.attr("title")
				}).appendTo($(this));*/
			});
		},
		init : function () {
			if(app.quickView.exists()) {
				return $cache.quickView;
			}

			$cache.quickView = $("<div/>").attr("id", "QuickViewDialog").appendTo(document.body);
			return $cache.quickView;
		},
		// show quick view dialog and send request to the server to get the product
		// options.source - source of the dialog i.e. search/cart
		// options.url - product url
		show : function (options) {
			options.target = app.quickView.init();
			options.callback = function () {
				app.product.init();
				app.dialog.create({
					target : $cache.quickView,
					options : {
						height : 'auto',
						width : 800,
						dialogClass : 'quickview',
						title : 'Product Quickview',
						resizable : false,
						position : 'center',
						open : function () {							
							app.progress.hide();
							$('.scrollpane').jScrollPane({
								autoReinitialise: true
							});
						}
					}
				});
				$cache.quickView.dialog('open');
			};
			app.product.get(options);

			return $cache.quickView;
		},
		// close the quick view dialog
		close : function () {
			if($cache.quickView) {
				$cache.quickView.dialog('close').empty();
				return $cache.quickView;
			}
		},
		exists : function () {
			return $cache.quickView && ($cache.quickView.length > 0);
		},
		isActive : function () {
			return $cache.quickView && ($cache.quickView.length > 0) && ($cache.quickView.children.length > 0);
		},
		container : $cache.quickView
	};

}(window.app = window.app || {}, jQuery));

//app.richArticle
(function (app, $) {
	var $cache = {};

	function initializeCache() {
		$cache = {
			article : $("#article-container")
		};
	}

	function initializeDom() {
		$cache.article.find('.product-tabs').tabs();
	}

	/*************** app.compare public object ***************/
	app.richArticle = {
		init : function () {
			initializeCache();
			initializeDom();
		}
	};


}(window.app = window.app || {}, jQuery));

// app.util
(function (app, $) {

	// sub namespace app.util.* contains utility functions
	app.util = {
		
		// trims a prefix from a given string, this can be used to trim
		// a certain prefix from DOM element IDs for further processing on the ID
		trimPrefix : function (str, prefix) {
			return str.substring(prefix.length);
		},

		setDialogify : function (e) {			
			e.preventDefault();
			app.caculatingpopupsize = new caculatingpopupsize(this);			
			var actionSource = $(this),				
				dlgAction = $(actionSource).data("dlg-action") || {}, // url, target, isForm
				dlgOptions = $.extend({},app.dialog.settings, $(actionSource).data("dlg-options"),app.caculatingpopupsize.settingresponsivewidth || {});				
				dlgOptions.title = dlgOptions.title || $(actionSource).attr("title") || "";
			    
			var url = dlgAction.url // url from data
					  || (dlgAction.isForm ? $(actionSource).closest("form").attr("action") : null) // or url from form action if isForm=true
					  || $(actionSource).attr("href"); // or url from href

			if (!url) { return; }
			
			var form = jQuery(this).parents('form');
			var method = form.attr("method")||"POST";
			
			// if this is a content link, update url from Page-Show to Page-Include
			if ($(this).hasClass("attributecontentlink")) {
				var uri = app.util.getUri(url);
				url = app.urls.pageInclude+uri.query;
			}
			if (method && method.toUpperCase() == "POST") 
			{
		         var postData = form.serialize() + "&"+ jQuery(this).attr("name") + "=submit";
		    } 
			else 
			{
		         if (url.indexOf('?') == -1 ) 
		         {
		          url+='?';
		         } 
		         else 
		         {
		          url += '&'
		         }
		         url += form.serialize();
		         url = app.util.appendParamToURL(url, jQuery(this).attr('name'), "submit");
			}
			
			var dlg = app.dialog.create({target:dlgAction.target, options : dlgOptions});

			app.ajax.load({
				url:$(actionSource).attr("href") || $(actionSource).closest("form").attr("action"),
				target:dlg, callback: function () {
					dlg.dialog("open");	// open after load to ensure dialog is centered
					app.validator.init(); // re-init validator
					if($(".modal-continue").length>0){
					$.extend($(".modal-continue").validate().settings, { onkeyup: false, onfocusout: false }); 
					}

					app.dialog.initSubmit();
					dlg.scrollTop(0);
					if( /Android|iPhone/i.test(navigator.userAgent)) {
						//Added for Sign-In Modal - Scrolling on Modal fix
						$('#main,#footer').hide();
						$('.ui-icon.ui-icon-closethick, .ui-dialog :button').click(function(){
							$('#main,#footer').show();
						});
					}
				},
				data : !$(actionSource).attr("href") ? postData : null
				
			});
			dlg.scrollTop(0);
			
		},

		padLeft : function (str, padChar, len) {
			var digs = len || 10;
			var s = str.toString();
			var dif = digs - s.length;
			while(dif > 0) {
				s = padChar + s;
				dif--;
			}
			return s;
		},
		// appends the parameter with the given name and
		// value to the given url and returns the changed url
		appendParamToURL : function (url, name, value) {

			var c = "?";
			if(url.indexOf(c) !== -1) {
				c = "&";
			}
			return url + c + name + "=" + encodeURIComponent(value);
		},

		appendParamsToUrl : function (url, params) {			
			
			var uri = app.util.getUri(url),
				includeHash = arguments.length < 3 ? false : arguments[2];
			
			var qsParams = $.extend(uri.queryParams, params);
			var result = uri.path+"?"+$.param(qsParams);
			if (includeHash) {
				result+=uri.hash;
			}
			if (result.indexOf("http")<0 && result.charAt(0)!=="/") {
				result="/"+result;	
			}
			
			return result;
		},

		removeParamFromURL : function (url, parameter) {
			var urlparts = url.split('?');

			if(urlparts.length >= 2) {
				var urlBase = urlparts.shift();
				var queryString = urlparts.join("?");

				var prefix = encodeURIComponent(parameter) + '=';
				var pars = queryString.split(/[&;]/g);
				var i=pars.length;
				while(0 > i--) {
					if(pars[i].lastIndexOf(prefix, 0) !== -1) {
						pars.splice(i, 1);
					}
				}
				url = urlBase + '?' + pars.join('&');
			}
			return url;
		},

		staticUrl : function (path) {
			if(!path || $.trim(path).length === 0) {
				return app.urls.staticPath;
			}

			return app.urls.staticPath + (path.charAt(0) === "/" ? path.substr(1) : path );
		},

		ajaxUrl : function (path) {
			return app.util.appendParamToURL(path, "format", "ajax");
		},
		
		toAbsoluteUrl : function (url) {
			if (url.indexOf("http")!==0 && url.charAt(0)!=="/") {
				url = "/"+url;
			}
			return url;
		},

		loadDynamicCss : function (urls) {
			var i, len=urls.length;
			for(i=0; i < len; i++) {
				app.util.loadedCssFiles.push(app.util.loadCssFile(urls[i]));
			}
		},

		// dynamically loads a CSS file
		loadCssFile : function (url) {
			return $("<link/>").appendTo($("head")).attr({
				type : "text/css",
				rel : "stylesheet"
			}).attr("href", url); // for i.e. <9, href must be added after link has been appended to head
		},
		// array to keep track of the dynamically loaded CSS files
		loadedCssFiles : [],

		// removes all dynamically loaded CSS files
		clearDynamicCss : function () {
			var i = app.util.loadedCssFiles.length;
			while(0 > i--) {
				$(app.util.loadedCssFiles[i]).remove();
			}
			app.util.loadedCssFiles = [];
		},

		getQueryStringParams : function (qs) {
			if(!qs || qs.length === 0) { return {}; }

			var params = {};
			// Use the String::replace method to iterate over each
			// name-value pair in the string.
			qs.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
						function ( $0, $1, $2, $3 ) {	params[ $1 ] = $3; }
			);
			return params;
		},

		getUri : function (o) {
			var a;
			if (o.tagName && $(o).attr("href")) {
				a = o;
			}
			else if (typeof o === "string") {
				a = document.createElement("a");
				a.href = o;
			}
			else {
				return null;
			}
			return {
				protocol : a.protocol, //http:
				host : a.host, //www.myexample.com
				hostname : a.hostname, //www.myexample.com'
				port : a.port, //:80
				path : a.pathname, // /sub1/sub2
				query : a.search, // ?param1=val1&param2=val2
				queryParams : a.search.length > 1 ? app.util.getQueryStringParams(a.search.substr(1)) : {},
				//hash : a.hash, // #OU812,5150
				hash : a.href.split("#")[1], //TempFirefox
				url : a.protocol+ "//" + a.host + a.pathname,
				urlWithQuery : a.protocol+ "//" + a.host + a.port + a.pathname + a.search
			};
		},

		postForm : function (args) {
			var form = $("<form>").attr({action:args.url,method:"post"}).appendTo("body");
			var p;
			for (p in args.fields) {
				$("<input>").attr({name:p,value:args.fields[p]}).appendTo(form);
			}
			form.submit();
		},

		getMessage : function (key, bundleName, callback) {
			if (!callback || !key || key.length===0) {
				return;
			}
			var params = {key:key};
			if (bundleName && bundleName.length===0) {
				params.bn = bundleName;
			}
			var url = app.util.appendParamsToUrl(app.urls.appResources, params);
			$.getJSON(url, callback);
		},
		
		updateStateOptions : function(countrySelect) {
			var country = $(countrySelect);
			if (country.length===0 || !app.countries[country.val()]) {
				 return; 
			}
			var form = country.closest("form");
			var stateField = country.data("stateField") ? country.data("stateField") : form.find("select[name$='_state']");
			if (stateField.length===0) {
				return;
			}
			
			var currentStateSelection = stateField.val();
			
			var form = country.closest("form"),	
				c = app.countries[country.val()],
				arrHtml = [],
				labelSpan = form.find("label[for='"+stateField[0].id+"'] span").not(".required-indicator");
			
			// set the label text
			labelSpan.html(c.label);
	
			var s;
			for (s in c.regions) {
				if(s==currentStateSelection)
					arrHtml.push('<option selected=selected value="'+s+'">'+c.regions[s]+'</option>');
				else
				arrHtml.push('<option value="'+s+'">'+c.regions[s]+'</option>');
			}
			// clone the empty option item and add to stateSelect
			var o1 = stateField.children().first().clone();
			stateField.html(arrHtml.join("")).removeAttr("disabled").children().first().before(o1);
			stateField[0].selectedIndex=0;
			
			// try to select a state if one was already selected before country selection
			stateField.val(currentStateSelection);
			jQuery("#dwfrm_billing_billingAddress_addressFields_states_state").selectBox('refresh');
			jQuery("#dwfrm_singleshipping_shippingAddress_addressFields_states_state").selectBox('refresh');
			jQuery("#dwfrm_profile_address_states_state").selectBox('refresh');

		},
		
		limitCharacters : function () {
			$('form').find('textarea[data-character-limit]').each(function(){				
				var characterLimit = $(this).data("character-limit");
				var charCountHtml = String.format(app.resources.CHAR_LIMIT_MSG, 
										'<span class="char-remain-count">'+characterLimit+'</span>',
										'<span class="char-allowed-count">'+characterLimit+'</span>');
				var charCountContainer = $(this).next('div.char-count');
				if (charCountContainer.length===0) {
					charCountContainer = $('<div class="char-count"/>').insertAfter($(this)); 
				}
				charCountContainer.html(charCountHtml);
				// trigger the keydown event so that any existing character data is calculated
				$(this).change();
			});
		},
		
		setDeleteConfirmation : function(container, message) {
			$(container).on("click", ".delete", function(e){
				return confirm(message);
			});
		},
		
		limitCharactersInput : function () {
			$('form').find('input[data-character-limit]').each(function(){				
				var characterLimit = $(this).data("character-limit");
				var charCountHtml = String.format(app.resources.CHAR_LIMIT_MSG, 
										'<span class="char-remain-count">'+characterLimit+'</span>',
										'<span class="char-allowed-count">'+characterLimit+'</span>');
				var charCountContainer = $(this).next('div.char-count-input');
				if (charCountContainer.length===0) {
					charCountContainer = $('<div class="char-count-input"/>').insertAfter($(this)); 
				}
				charCountContainer.html(charCountHtml);
				charCountContainer.hide();
				// trigger the keydown event so that any existing character data is calculated
				$(this).change();
			});
		},
		
		scrollBrowser : function (xLocation) {
			$('html, body').animate({ scrollTop: xLocation }, 500);
		},
		
		gotoAnchorHash : function (sectionName) {
			if(sectionName != null) {
				window.location.hash = sectionName;
			}
		},
		
		// disables browser auto completion for the given element
		disableAutoComplete : function(elemId) {
			jQuery("#"+elemId).attr("autocomplete", "off");
		}

	};
}(window.app = window.app || {}, jQuery));

// app.page
(function (app, $) {

	app.page = {
		title : "",
		type : "",
		setContext : function (o) {
			$.extend(app.page, o);
		},
		params : app.util.getQueryStringParams(window.location.search.substr(1)),
		refresh : function() {
			var t=setTimeout("window.location.assign(window.location.href);",500);
			
		}
	};
}(window.app = window.app || {}, jQuery));

// app.registry
(function (app, $) {
	var $cache = {};

	function populateBeforeAddressForm(addressID) {
		// load address details
		var url = app.urls.giftRegAdd + addressID;
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data || !data.address) {
					window.alert(app.resources.REG_ADDR_ERROR);
					return false;
				}
				// fill the form
				$cache.addressBeforeFields.filter("[name$='_addressid']").val(data.address.ID);
				$cache.addressBeforeFields.filter("[name$='_firstname']").val(data.address.firstName);
				$cache.addressBeforeFields.filter("[name$='_lastname']").val(data.address.lastName);
				$cache.addressBeforeFields.filter("[name$='_companyname']").val(data.address.companyName);
				$cache.addressBeforeFields.filter("[name$='_address1']").val(data.address.address1);
				$cache.addressBeforeFields.filter("[name$='_address2']").val(data.address.address2);
				$cache.addressBeforeFields.filter("[name$='_city']").val(data.address.city);
				$cache.addressBeforeFields.filter("[name$='_zip']").val(data.address.postalCode);
				$cache.addressBeforeFields.filter("[name$='_state']").val(data.address.stateCode);
				$cache.addressBeforeFields.filter("[name$='_stateprovince']").val(data.address.stateCode);
				$cache.addressBeforeFields.filter("[name$='_country']").val(data.address.countryCode);
				$cache.addressBeforeFields.filter("[name$='_phone']").val(data.address.phone);
				$cache.registryForm.validate().form();
			}
		});
	}

	//updates the after address form with the attributes of a given address
	function populateAfterAddressForm(addressID) {
		// load address details
		var url = app.urls.giftRegAdd + addressID;
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data || !data.address) {
					window.alert(app.resources.REG_ADDR_ERROR);
					return false;
				}
				// fill the form
				$cache.addressAfterFields.filter("[name$='_addressid']").val(data.address.ID);
				$cache.addressAfterFields.filter("[name$='_firstname']").val(data.address.firstName);
				$cache.addressAfterFields.filter("[name$='_lastname']").val(data.address.lastName);
				$cache.addressAfterFields.filter("[name$='_companyname']").val(data.address.companyName);
				$cache.addressAfterFields.filter("[name$='_address1']").val(data.address.address1);
				$cache.addressAfterFields.filter("[name$='_address2']").val(data.address.address2);
				$cache.addressAfterFields.filter("[name$='_city']").val(data.address.city);
				$cache.addressAfterFields.filter("[name$='_zip']").val(data.address.postalCode);
				$cache.addressAfterFields.filter("[name$='_state']").val(data.address.stateCode);
				$cache.addressAfterFields.filter("[name$='_stateprovince']").val(data.address.stateCode);
				$cache.addressAfterFields.filter("[name$='_country']").val(data.address.countryCode);
				$cache.addressAfterFields.filter("[name$='_phone']").val(data.address.phone);
				$cache.registryForm.validate().form();
			}
		});
	}

	//copy address before fields to address after fields
	function copyBeforeAddress() {
		$cache.addressBeforeFields.each(function () {
			var fieldName = $(this).attr("name");
			var afterField = $cache.addressAfterFields.filter("[name='"+fieldName.replace("Before","After")+"']");
			afterField.val($(this).val());
		});
	}

	// disable the address after fields
	function setAfterAddressDisabled(disabled) {
		if (disabled) {
			$cache.addressAfterFields.attr("disabled", "disabled");
		}
		else {
			$cache.addressAfterFields.removeAttr("disabled");
		}
	}

	function initializeCache() {
		$cache = {
			registryForm : $("form[name$='_giftregistry']"),
			registryTable : $("#registry-results")
		};
		$cache.copyAddress = $cache.registryForm.find("input[name$='_copyAddress']");
		$cache.addressBeforeFields = $cache.registryForm.find("fieldset[name='address-before'] input:not(:checkbox), fieldset[name='address-before'] select");
		$cache.addressAfterFields = $cache.registryForm.find("fieldset[name='address-after'] input:not(:checkbox), fieldset[name='address-after'] select");
	}

	function initializeDom() {
		$cache.addressBeforeFields.filter("[name$='_country']").data("stateField", $cache.addressBeforeFields.filter("[name$='_state']"));
		$cache.addressAfterFields.filter("[name$='_country']").data("stateField", $cache.addressAfterFields.filter("[name$='_state']"));		
		
		if ($cache.copyAddress.length && $cache.copyAddress[0].checked) {
			// fill the address after fields
			copyBeforeAddress();
			setAfterAddressDisabled(true);
		}
	}

	function initializeEvents() {
		app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
		app.util.setDeleteConfirmation("table.item-list", String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_GIFTREGISTRY));
		
		$cache.copyAddress.on("click", function () {
			if (this.checked) {
				// fill the address after fields
				copyBeforeAddress();
			}
		});
		$cache.registryForm.on("change", "select[name$='_addressBeforeList']", function (e) {
			var addressID = $(this).val();
			if (addressID.length===0) { return; }
			populateBeforeAddressForm(addressID);
			if ($cache.copyAddress[0].checked) {
				copyBeforeAddress();
			}
		})
		.on("change", "select[name$='_addressAfterList']", function (e) {
			var addressID = $(this).val();
			if (addressID.length===0) { return; }
			populateAfterAddressForm(addressID);
		})
		.on("change", $cache.addressBeforeFields.filter(":not([name$='_country'])"), function (e) {
			if (!$cache.copyAddress[0].checked) { return; }
			copyBeforeAddress();			
		});
		
		
		$("form").on("change", "select[name$='_country']", function(e) {
			app.util.updateStateOptions(this);
			
			if ($cache.copyAddress.length > 0 && $cache.copyAddress[0].checked && this.id.indexOf("_addressBefore") > 0) {
				copyBeforeAddress();
				$cache.addressAfterFields.filter("[name$='_country']").trigger("change");
			}
		});
	}


	app.registry = {
		init : function () {			
			initializeCache();
			initializeDom();
			initializeEvents();
			app.product.initAddToCart();
			
		}

	};

}(window.app = window.app || {}, jQuery));

// app.progress
(function (app, $) {
	var loader;
	app.progress = {
		show: function (container) {
			var target = (!container || $(container).length===0) ? $("body") : $(container);
			loader = loader || $(".loader");

			if (loader.length===0) {
				loader = $("<div/>").addClass("loader")
									.append($("<div/>").addClass("loader-indicator"), $("<div/>").addClass("loader-bg"));

			}
			return loader.appendTo(target).show();
		},
		hide: function () {
			if (loader) { loader.hide(); }
		}
	};
}(window.app = window.app || {}, jQuery));

// app.components
(function (app, dw, $) {
	// capture recommendation of each product when it becomes visible in the carousel

	function captureCarouselRecommendations(c, li, index, state) {
		if (!dw) { return; }

		$(li).find(".capture-product-id").each(function () {
			dw.ac.capture({
				id : $(this).text(),
				type : dw.ac.EV_PRD_RECOMMENDATION
			});
		});
	}


	app.components = {
		carouselSettings : {
			scroll : 1,
			itemFallbackDimension: '100%',
			itemVisibleInCallback : app.captureCarouselRecommendations
		},
		horizontalProductCarouselSettings : {
			scroll : 3,
			itemFallbackDimension: '100%',
			itemVisibleInCallback : app.captureCarouselRecommendations
		},
		init : function () {
			// renders horizontal/vertical carousels for product slots
			//$('#horizontal-carousel').jcarousel(app.components.carouselSettings);
			$('#vertical-carousel').jcarousel($.extend({vertical : true}, app.components.carouselSettings));
			//$('.horizontal-product-carousel').jcarousel(app.components.horizontalProductCarouselSettings);
			
			$("body").on("click", ".slider-control a", function(event){ event.preventDefault(); });
			
			if(jQuery('.horizontal-product-carousel-3x1 ul').length > 0) {
				jQuery('.horizontal-product-carousel-3x1 ul').carouFredSel({
					width: "100%",
					align: "left",
					height: "auto",
					circular: false,
					infinite: true,						
					items: {
						visible: 3,
						height: "variable",
						width: "variable"
					},
					scroll: {
						wipe: true,
						items: 3,
						pauseOnHover: true
					},
					auto: {
						play: false
					},
					prev: { button : function() {
			            return $(this).parents(".horizontal-product-carousel").find("#slide-prev");
					}},
					next: { button :  function() {
			            return $(this).parents(".horizontal-product-carousel").find("#slide-next");
			       	}},
					pagination: {
						container : function() {
			       			return $(this).parents(".horizontal-product-carousel").find(".slider-control");
						}
					}
				});
			}
			
			if(jQuery('.horizontal-product-carousel-4x1 ul').length > 0) {
				jQuery('.horizontal-product-carousel-4x1 ul').carouFredSel({
					width: "100%",
					align: "left",
					height: "auto",
					circular: false,
					infinite: false,						
					items: {
						visible: 4,
						height: "variable",
						width: "variable"
					},
					scroll: {
						wipe: true,
						items: 4,
						pauseOnHover: true
					},
					auto: {
						play: false
					},
					prev: { button : function() {
			            return $(this).parents(".horizontal-product-carousel").find("#slide-prev");
					}},
					next: { button :  function() {
			            return $(this).parents(".horizontal-product-carousel").find("#slide-next");
			       	}},
					pagination: { 
						container   : function() {
				            return $(this).parents(".horizontal-product-carousel").find(".slider-control");
				        }
					}							
				});
			}
			
			$("#hero-slider").carouFredSel({
				responsive: true,
				width: "100%",
				items: {
					visible: 1,
					height: "auto"
				},
				scroll: {
					wipe: true,
					fx: "crossfade",
					duration: 1000,
					pauseOnHover: true
				},
				pagination: {
				    container: ".hero-slider-control"
				  } 
			});
			$("#hero-slider-new").carouFredSel({
				responsive: true,
				duration: 10000,
				width:"100%",
				items: {
					visible: 1,
					height:"100%"
				},
				scroll: {
					duration: 1000,
					easing : "linear",
					timeoutDuration	: 10000,
					pauseOnHover	: "immediate"

				},
				pagination: {
				    container: ".hero-slider-control-new",
				  }				  
			});
			
			$("#hero-slider-landing-new").carouFredSel({
				responsive: true,				
				duration: 10000,
				width:"100%",
				items: {
					visible: 1,
					height:"100%"
				},				
				scroll: {
					duration: 1000,
					easing : "linear",
					timeoutDuration	: 10000,
					pauseOnHover	: "immediate"

				},
				pagination: {
				    container: ".hero-slider-control-new",
				  }				  
			}).css('visibility','visible');
			
		    	jQuery('ul.category-slider').carouFredSel({
				width: "100%",
				align: "left",
				height: "auto",
				circular: false,
				infinite: true,						
				items: {
					visible: 4,
					height: "variable",
					width: "variable"
				},
				scroll: {
					wipe: true,
					items: 4,
					pauseOnHover: true
				},
				prev: { button : function() {
		            return $(this).parents(".category-slider-contain").find("#slide-prev");
					 }},
				next: { button :  function() {
		            return $(this).parents(".category-slider-contain").find("#slide-next");
		       								 }},
				pagination: { 
					container   : function() {
					            return $(this).parents(".category-slider-contain").find(".slider-control");
					        }
						}							
			});


			jQuery('.horizontal-product-carousel-3x1 ul').carouFredSel({
				width: "100%",
				align: "left",
				height: "auto",
				circular: false,
				infinite: true,						
				items: {
					visible: 3,
					height: "variable",
					width: "variable"
				},
				scroll: {
					wipe: true,
					items: 3,
					pauseOnHover: true
				},
				prev: { button : function() {
		            return $(this).parents(".horizontal-product-carousel").find("#slide-prev");
					 }},
				next: { button :  function() {
		            return $(this).parents(".horizontal-product-carousel").find("#slide-next");
		       								 }},
				pagination: { 
					container   : function() {
					            return $(this).parents(".horizontal-product-carousel").find(".slider-control");
					        }
						}							
			});
			
					
			
		}
	};
}(window.app = window.app || {}, window.dw, jQuery));

// app.cart
(function (app, $) {
	var $cache = {};

	function updateCart(postdata, callback) {
		var url = app.util.ajaxUrl(app.urls.addProduct);
		$.post(url, postdata, callback || app.cart.refresh);
	}

	function initializeCache() {
		$cache = {
			cartTable : $("#cart-table"),
			itemsForm : $("#cart-items-form"),
			addCoupon : $("#add-coupon"),
			couponCode : $("input[name$='_couponCode']")
		};
	}

	function initializeEvents() {
		$cache.cartTable.on("click", ".item-edit-details a", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : e.target.href,
				source : "cart"
			});
		})
		.on("click", ".bonus-item-actions a", function (e) {
			e.preventDefault();
			app.bonusProductsView.show(this.href);
		})
		.on("click", ".pwp-item-actions a", function (e) {
			e.preventDefault();
			app.pwpProductsView.show(this.href);
		});

		// override enter key for coupon code entry
		$cache.couponCode.on("keydown", function (e) {
			if (e.which === 13) { return false; }
			else {
				return;
			}
		});
		$cache.couponCode.on("keyup", function (e) {
			if (e.which === 13) { 
				e.preventDefault();
				$cache.couponCode = $cache.couponCode || $cache.checkoutForm.find("input[name$='_couponCode']");
				var val = $cache.couponCode.val();
	
				if (val.length===0) { 
					return false;
				}
				else {
					$("#addCoupon").click();}
				}
			else{
				 this.value = this.value.toUpperCase();
					return;
				}
		});
	}

	app.cart = {
		add : function (postdata, callback) {
			updateCart(postdata, callback);
		},
		remove : function () {
			return;
		},
		update : function (postdata, callback) {
			updateCart(postdata, callback);
		},
		refresh : function () {
			// refresh without posting
			app.page.refresh();
		},
		init : function () {
			// edit shopping cart line item
			initializeCache();
			initializeEvents();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.account
(function (app, $) {
	var $cache = {};

	function initializeAddressForm(form) {			
		var form = $("#edit-address-form");
		
		form.find("input[name='format']").remove();
		//$("<input/>").attr({type:"hidden", name:"format", value:"ajax"}).appendTo(form);
		form
		.on("click", ".apply-button", function(e) {
			var addressId = form.find("input[name$='_addressid']");
			addressId.val(addressId.val().replace(/[^\w+-]/g, "-"));
			if (!form.valid()) {
				return false; 
			}
			
			app.dialog.close();
			app.page.refresh();
			
		})
		.on("click", ".cancel-button, .close-button", function(e){
			e.preventDefault();
			app.dialog.close();
		})
		.on("click", ".delete-button", function(e){
			e.preventDefault();
			if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
				var url = app.util.appendParamsToUrl(app.urls.deleteAddress, {AddressID:form.find("#addressid").val(),format:"ajax"});
				$.ajax({
					url: url,
					method: "POST",
					dataType:"json"
				}).done(function(data){
					if (data.status.toLowerCase()==="ok") {
						app.dialog.close();
						app.page.refresh();
					}
					else if (data.message.length>0) {
						alert(data.message);
						return false;
					}
					else {
						app.dialog.close();
						app.page.refresh();
					}
				});
			}
		});
		
		$cache.countrySelect = form.find("select[id$='_country']");
		$cache.countrySelect.on("change", function(){ 
			app.util.updateStateOptions(this); 
		});
		
		app.validator.init();
	}
	
	function toggleFullOrder () {
		$('.order-items')
			.find('li.hidden:first')
				.prev('li')
					.append('<a class="toggle">View All</a>')
					.children('.toggle')
						.click(function() {
							$(this).parent().siblings('li.hidden').show();
							$(this).remove();
						});
	}
	
	function initAddressEvents() {
		var addresses = $("#addresses");
		if (addresses.length===0) { return; }
		addresses.on("click", "a.address-edit, .address-create", function(e){
			e.preventDefault();
			var options = {open: initializeAddressForm, dialogClass: "dialog-custom-submit"};
			
			app.dialog.open({url:$(this).attr("href"), options:options});
		}).on("click", ".delete", function(e){
			e.preventDefault();
			if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
				$.ajax({
					url: app.util.appendParamsToUrl($(this).attr("href"), {format:"ajax"}),
					dataType:"json"
				}).done(function(data){
					if (data.status.toLowerCase()==="ok") {
						app.page.refresh();
					}
					else if (data.message.length>0) {
						alert(data.message);
					}
					else {
						app.page.refresh();
					}
				});
			}
		});
	}
	function initPaymentEvents() {
		var paymentList = $(".payment-list");
		if (paymentList.length===0) { return; }
		
		app.util.setDeleteConfirmation(paymentList, String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_CREDITCARD));
// Remove Ajax request per dwre support ticket 97064 to prevent delete page refresh issue		
//		$("form[name='payment-remove']").on("submit", function(e){
//			e.preventDefault();
//			// override form submission in order to prevent refresh issues
//			var button = $(this).find("button.delete");
//			$("<input/>").attr({type:"hidden", name:button.attr("name"), value:button.attr("value")||"delete card"}).appendTo($(this));
//			var data = $(this).serialize(); 
//			$.ajax({
//				type: "POST",
//				url: $(this).attr("action"),
//				data: data
//			})
//			.done(function(response) {
//			//	app.page.refresh();	
//			});
//		});
	}
	function initAddressFormValidation() {
		/*----------------------------------Account edit address 35 characters-------------------------------------------------*/
		/*$("#dwfrm_profile_address_lastname, #dwfrm_profile_address_firstname").keydown(function(){ 
	    	
	    	var f_name=$('#dwfrm_profile_address_firstname').val().length; 
	    	var l_name=$('#dwfrm_profile_address_lastname').val().length; 
	    	 result_val_billing=parseInt(l_name)+parseInt(f_name); 
	    	if(result_val_billing>34)
	    		{ 
	    		 $("#error_msg_last_edit_addr").text("Firstname and Lastname should not exceed 35 characters");
	    		 $("#error_msg_last_edit_addr").css("display","inline");
	    		} 
	    });*/
	    $("#dwfrm_profile_address_lastname, #dwfrm_profile_address_firstname").keyup(function(){ 
	    	var f_name=$('#dwfrm_profile_address_firstname').val().length; 
	    	var l_name=$('#dwfrm_profile_address_lastname').val().length; 
	    	 result_val_billing=parseInt(l_name)+parseInt(f_name); 
	    	 if(result_val_billing<=35)
			{ 
	    		 $("#error_msg_last_edit_addr").css("display","none");
			}
	    	 if(result_val_billing>35)
	    		{ 
	    		 $("#error_msg_last_edit_addr").text("Firstname and Lastname should not exceed 35 characters");
	    		 $("#error_msg_last_edit_addr").css("display","inline");
	    		} 
	    	
	    });
	    $("#addAddress").on("click", function(e){
	    	e.preventDefault();
	    	var f_name=$('#dwfrm_profile_address_firstname').val().length; 
	    	var l_name=$('#dwfrm_profile_address_lastname').val().length; 
	    	var result_val_billing=parseInt(l_name)+parseInt(f_name); 
	    	if(result_val_billing>35)
	    		{ 
	    		 $("#error_msg_first_edit_addr").css("display:block;");
	    		 // $("#error_msg_first_edit_addr").text("Firstname and Lastname should not exceed 35 characters");
	    		 // $("#dwfrm_billing_billingAddress_addressFields_firstName").val('');
	    		//  $("#dwfrm_billing_billingAddress_addressFields_lastName").val('');
	    		  $("#dwfrm_profile_address_firstname").focus();
	    		  //$(window).scrollTop(0);
	    		  return false;
	    		}
	    	
	    	else if ($('#edit-address-form').valid() == true) {
	    		$("#edit-address-form").submit();
	        }
	    });
	    /*----------------------------------Account edit address 35 characters-------------------------------------------------*/
	}
	
	function initializeEvents() {
		toggleFullOrder();
		initAddressEvents();
		initPaymentEvents();
		initAddressFormValidation();
		
	}
		
	app.account = {
		init : function () {			
			initializeEvents();
		}
	};
}(window.app = window.app || {}, jQuery));

// app.wishlist
(function (app, $) {
	var $cache = {};

	function initializeEvents() {
		app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
		$cache.editAddress.on('change', function () {
			window.location.href = app.util.appendParamToURL(app.urls.wishlistAddress, "AddressID", $(this).val());
		});
	}

	app.wishlist = {
		init : function () {
			$cache.editAddress = $('#editAddress');
			app.product.initAddToCart();
			initializeEvents();
			
		}
	};
}(window.app = window.app || {}, jQuery));

// app.minicart
(function (app, $) {
	// sub name space app.minicart.* provides functionality around the mini cart

	var $cache = {}, 
		initialized = false;

	var timer = {
		id : null,
		clear : function () {
			if(timer.id) {
				window.clearTimeout(timer.id);
				delete timer.id;
			}
		},
		start : function (duration) {
			timer.id = setTimeout(app.minicart.close, duration);
		}
	};

	app.minicart = {
		url : "", // during page loading, the Demandware URL is stored here

		// initializations
		init : function () {
			$cache.minicart = $(".mini-cart");
			$cache.mcTotal = $cache.minicart.find(".mini-cart-total");
			$cache.mcContent = $cache.minicart.find(".mini-cart-content");
			$cache.mcClose = $cache.minicart.find(".mini-cart-close");
			$cache.mcProductList = $cache.minicart.find(".mini-cart-products");
			$cache.mcProducts = $cache.mcProductList.children(".mini-cart-product");
			$cache.mcBag = $cache.mcTotal.find(".mini-cart-link").children('span');

			/*var collapsed = $cache.mcProductList.children().not(":first").addClass("collapsed");*/


			// bind hover event to the cart total link at the top right corner
			$cache.minicart.on("mouseenter", ".mini-cart-total", function () {
				if($cache.mcContent.not(":visible")) {
					app.minicart.slide();
					$cache.mcBag.removeClass('mini-cart-qty').addClass('mini-cart-qty-over');
					/*if($('.menu-category').css('display') == 'block'){
						$('.menu-category').hide();
					}*/
				} else {
					$cache.mcBag.addClass('mini-cart-qty').removeClass('mini-cart-qty-over');
				}
			})
			.on("mouseenter", ".mini-cart-content", function (e) {
				timer.clear();
				$cache.mcBag.removeClass('mini-cart-qty').addClass('mini-cart-qty-over');
			})
			.on("mouseleave", ".mini-cart-content", function (e) {
				timer.clear();
				timer.start(30);
				$cache.mcBag.addClass('mini-cart-qty').removeClass('mini-cart-qty-over');
			})
			.on("mouseleave", ".mini-cart-total", function (e) {
				$cache.mcBag.addClass('mini-cart-qty').removeClass('mini-cart-qty-over');								
			})
			.on("click", ".mini-cart-close", app.minicart.close);

			
			/*$cache.mcProducts.append('<div class="mini-cart-toggler">&nbsp;</div>');

			$cache.mcProductList.toggledList({toggleClass : "collapsed", triggerSelector:".mini-cart-toggler", eventName:"click"});*/

			initialized = true;
		},
		// shows the given content in the mini cart
		show : function (html) {
			$cache.minicart.html(html);
			app.util.scrollBrowser(0);
			app.minicart.init();
			app.minicart.slide();
			app.bonusProductsView.loadBonusOption();
			//app.pwpProductsView.loadPwpOption();
		},
		// slide down and show the contents of the mini cart
		slide : function () {			
		
			if(!initialized) {
				app.minicart.init();
			}

			if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
				return;
			}

			timer.clear();

			// show the item
			$cache.mcContent.slideDown('slow');

			// after a time out automatically close it
			timer.start(6000);
		},
		// closes the mini cart with given delay
		close : function (delay) {
			timer.clear();
			$cache.mcContent.slideUp();
			if( /Android/i.test(navigator.userAgent)) {
				$('#main,#homepage-slider,.slide-content-bottom-promo,#footer').show();
			}
		},
		// hook which can be replaced by individual pages/page types (e.g. cart)
		suppressSlideDown : function () {
			return false;
		}
	};
}(window.app = window.app || {}, jQuery));

if( /Android|iPhone/i.test(navigator.userAgent)) {
	$('.mini-cart-link').removeAttr('href');	
}

/*Mini cart scroll issue-START*/
$('document').ready(function(){
	if( /Android/i.test(navigator.userAgent)) {
		$('#mini-cart').click(function(){			
				if($('.mini-cart-content').css('display')=='block'){
					$('#main,#homepage-slider,.slide-content-bottom-promo,#footer').hide();
				}			
		});
		$('.mini-cart-content').on('touchstart', function(e){		
			e.stopPropagation();
		});
		$('html').on('touchstart', function(e){		
			$('#main,#homepage-slider,.slide-content-bottom-promo,#footer').show();
		});
		
		$($('.mini-cart-totals .mini-cart-link-cart.button')[0]).on('touchstart', function(e){
			$('#main,#homepage-slider,.slide-content-bottom-promo,#footer').show();
			$('.mini-cart-content').hide();
			setTimeout(function(){
				location.href=$($('.mini-cart-totals .mini-cart-link-cart.button')[0]).attr('href');
			},100);
			
		});
	}
});

/*Mini cart scroll issue-END*/

// app.dialog
(function (app, $) {
	// private

	var initAjaxDialogSubmit = function(e){
		app.dialog.submit("submit");
		e.preventDefault();
		
		
	}

	var $cache = {};
	// end private

	app.dialog = {
		create : function (params) {
			// options.target can be an id selector or an jquery object
			var target = $(params.target || "#dialog-container");

			// if no element found, create one
			if(target.length === 0) {
				if(target.selector && target.selector.charAt(0) === "#") {
					id = target.selector.substr(1);
				}
				target = $("<div>").attr("id", id).addClass("dialog-content").appendTo("body");
			}

			// create the dialog
			$cache.container=target;
			$cache.container.dialog($.extend(true, {}, app.dialog.settings, params.options || {}));
			return $cache.container;
		},
		TrufflepopupVideo : function(selector) {
				var settingresponsivewidthvideo={}
				var parent = $(selector).parent();
				if($(window).width()<=757){
					if(window.innerHeight > window.innerWidth){settingresponsivewidthvideo={width: $("#wrapper").width()*0.7,height:$("#wrapper").width()*0.7-40}}
					else{settingresponsivewidthvideo={width: $("#wrapper").width()*0.7,height:150}}
					}
				else{settingresponsivewidthvideo={width: $(selector).attr('width'),height: $(selector).attr('height')}}	
				parent.append('<div class="video_dialog" style="display: none;"><iframe width="' + settingresponsivewidthvideo.width + '"' + ' height="' + settingresponsivewidthvideo.height + '" src="http://www.youtube.com/embed/'+ $(selector).attr('vid')+ '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>');
				parent.find('.video_dialog').dialog({ 
			    	title: $(selector).attr('title'),
			    	width: settingresponsivewidthvideo.width, 
			    	height:settingresponsivewidthvideo.height,
			    	modal: true,
			    	overlay: {
			    		opacity: .5,
			     		background: "black"
					},
					position: 'center',
					close: function(event, ui) {
				    	jQuery('.video_dialog').remove();
				    }
				 });
				jQuery('.video_dialog').attr('style', 'height=auto');
		},
		
		//opens up a popup video
		popupVideo : function(selector) {
			var settingresponsivewidthvideo={}		
		
				var parent = $(selector).parent();
				if($(window).width()<=960){settingresponsivewidthvideo={width: $("#wrapper").width()*0.8,height:$(window).height()*0.8}}
				else{settingresponsivewidthvideo={width: $(selector).attr('width'),height: $(selector).attr('height')}}	
				parent.append('<div class="video_dialog" style="display: none;"><iframe width="' + settingresponsivewidthvideo.width + '"' + ' height="' + settingresponsivewidthvideo.height + '" src="http://www.youtube.com/embed/'+ $(selector).attr('vid')+ '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>');
				parent.find('.video_dialog').dialog({ 
			    	title: $(selector).attr('title'), width: settingresponsivewidthvideo.width, height:settingresponsivewidthvideo.height,
				    close: function(event, ui) {
				    	jQuery('.video_dialog').remove();
				    }
				 });
			    jQuery('.video_dialog').attr('style', 'height=auto');
		},

		
		// opens a dialog using the given url or selector
		open : function (params) {
			// dialog has option to load existing page content or load via ajax
			if(params.selector && params.selector.length !== 0) {
				$cache.container = app.dialog.create(params);
				$cache.container.html($(params.selector).html());
				
				if($cache.container.dialog("isOpen")) {	return;	}
				app.validator.init();
				app.dialog.initSubmit();
				$cache.container.dialog("open");
				
			} else {
				if(!params.url || params.url.length===0) { return; }
				$cache.container = app.dialog.create(params);
				params.url = app.util.appendParamsToUrl(params.url, {format:"ajax"});
	
				// finally load the dialog
				app.ajax.load({
					target : $cache.container,
					url : params.url,
					callback : function () {
						if(!$cache.container.hasClass("dialog-custom-submit")) {
							app.dialog.initSubmit();
						}
						if($cache.container.dialog("isOpen")) {	return;	}
						$cache.container.dialog("open");
						//hide custom scrollbars on dialogs
						/*
						$('.scrollpane, .dialog-scroll .dialog-content, .modal-link-dialog .dialog-content .content-asset').jScrollPane({
							autoReinitialise: true
						});
						*/
					}
				});
			}
		},
		openCustom : function (params) {
			var prodName = params.product;
			// dialog has option to load existing page content or load via ajax
			if(params.selector && params.selector.length !== 0) {
				$cache.container = app.dialog.create(params);
				$cache.container.html($(params.selector).html());
				
				if($cache.container.dialog("isOpen")) {	return;	}
				app.validator.init();
				app.dialog.initSubmit();
				$cache.container.dialog("open");
				
			} else {
				if(!params.url || params.url.length===0) { return; }
				$cache.container = app.dialog.create(params);
				params.url = app.util.appendParamsToUrl(params.url, {format:"ajax"});
	
				// finally load the dialog
				app.ajax.loadCustom({
					target : $cache.container,
					url : params.url,
					prodName : prodName,
					callback : function () {
						if(!$cache.container.hasClass("dialog-custom-submit")) {
							app.dialog.initSubmit();
						}
						if($cache.container.dialog("isOpen")) {	return;	}
						$cache.container.dialog("open");
						//hide custom scrollbars on dialogs
						/*
						$('.scrollpane, .dialog-scroll .dialog-content, .modal-link-dialog .dialog-content .content-asset').jScrollPane({
							autoReinitialise: true
						});
						*/
					}
				});
			}
		},
		// closes the dialog and triggers the "close" event for the dialog
		close : function () {
			if(!$cache.container) {
				return;
			}
			$cache.container.dialog("close");
		},
		// triggers the "apply" event for the dialog
		triggerApply : function () {
			$(this).trigger("dialogApplied");
		},
		// attaches the given callback function upon dialog "apply" event
		onApply : function (callback) {
			if(callback) {
				$(this).bind("dialogApplied", callback);
			}
		},
		// triggers the "delete" event for the dialog
		triggerDelete : function () {
			$(this).trigger("dialogDeleted");
		},
		// attaches the given callback function upon dialog "delete" event
		onDelete : function (callback) {
			if(callback) {
				$(this).bind("dialogDeleted", callback);
			}
		},
		initSubmit : function () {
			$("#dialog-container").find("form:first").on("submit", initAjaxDialogSubmit);
		},
		killSubmit : function () {
			$("#dialog-container").find("form:first").off("submit", initAjaxDialogSubmit);
		},
		// submits the dialog form with the given action
		submit : function (action) {
			var form = $cache.container.find("form:first");
			// set the action
			$("<input/>").attr({
				name : action,
				type : "hidden"
			}).appendTo(form);

			// serialize the form and get the post url
			var post = form.serialize();
			var url = form.attr("action");
			var src = $(".src").val();
			var dest = $(".dest").val()
		

			// post the data and replace current content with response content
			$.ajax({
				type : "POST",
				url : app.util.appendParamToURL(url,"format","ajax"),
				data : post,
				dataType : "html",
				success : function (data) {
					var response = jQuery(data);
					var dataErrors = $(response).find(".hasDataError").val();
					
					if(dataErrors!="true" && src=="cart" && dest=="singleship")
						{ 
							window.location.href =app.urls.shippingSingle;
						}
					else if(dataErrors!="true" && src=="cart" && dest=="multiship")
						{
							window.location.href =app.urls.shippingMultiple;
						}
					else if(dataErrors!="true" && src=="cart" && dest=="cart")
						{ 
							window.location.href =app.urls.cartShow;
						}
					else
						{
					$cache.container.html(data);
					app.validator.init(); // re-init validator
					app.dialog.initSubmit();
							
						}
				},
				failure : function (data) {
					window.alert(app.resources.SERVER_ERROR);
				}
			});
		},
		settings : {
			autoOpen : false,
			resizable : false,
			bgiframe : true,
			modal : true,
			height : 'auto',
			width : '800',
			buttons : {},
			title : '',
			position : 'center',
			overlay : {
				opacity : 0.5,
				background : "black"
			},
			close : function (event, ui) {
				//kill any iframes (video fix)
				$cache.container.find("iframe").remove();
				$(this).dialog("destroy");
			}
		}
	};
}(window.app = window.app || {}, jQuery));

// app.validator
(function (app, $) {

	var naPhone = /^\(?([2-9][0-8]\d)\)?[\-\. ]?([2-9]\d{2})[\-\. ]?(\d{4})$/,
		regex = {
			phone : {
				us : naPhone,
				ca : naPhone
			},
			postal : {
				us : /^\d{5}(-\d{4})?$/,
				ca : /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/,
				gb : /^GIR?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])?[0-9][ABD-HJLNP-UW-Z]{2}$/
			},
			email : /^[\w.%+\-]+@[\w.\-]+\.[\w]{2,6}$/
		},
		settings = {
			// global form validator settings
			errorClass : 'error',
			errorElement : 'span',
			ignore: [],
			onkeyup : false,
			onfocusout : function (element) {
				if($(element).hasClass('customErrorMessage')){
					$(element).removeClass('customErrorMessage');
					$(element.form).find("span[for=" + element.id + "]").remove();
				}
					
				if($('.checkout-login-singledhiping .login-box-content input').val() == ""){return false;}
				else if(!this.checkable(element)) {
					this.element(element);
				}
			},
			invalidHandler: function(form, validator) {
				 	$('span.error').each(function() {
						  if($(this).css('display')=='block'){
					 		 $('html, body').animate({
						            scrollTop: $(this).offset().top-100
						        }, 500);
					 		return false;
						  }
						});			       
		    },
		    highlight: function (element, errorClass, validClass) {
		    	if (element.type === 'radio') {
					this.findByName(element.name).addClass(errorClass).removeClass(validClass);
				} else {
					$(element).addClass(errorClass).removeClass(validClass);
				}
		    	if($(element).hasClass('appendToErrorContainer'))
		    		$(element.form).find("label[for=" + element.id + "]").addClass("highlightLabel");
		    },
		    unhighlight: function (element, errorClass, validClass) {
		    	if (element.type === 'radio') {
					this.findByName(element.name).removeClass(errorClass).addClass(validClass);
				} else {
					$(element).removeClass(errorClass).addClass(validClass);
				}
		    	if($(element).hasClass('appendToErrorContainer'))
		    		$(element.form).find("label[for=" + element.id + "]").removeClass("highlightLabel");
		    },
		   
			errorPlacement: function(error, element) {
				var currentFormElement = $(element),
				errorsContainer = currentFormElement.parents('form').find('div.errorsContainer'),
				defaultErrorContainer,
				defaultErrorMessage = "Error: please review and correct all required fields to continue.";
				
				if(errorsContainer.length && currentFormElement.hasClass('appendToErrorContainer')){
					defaultErrorContainer =$(errorsContainer).find('.defaultErrorContainer');
					if(currentFormElement.hasClass('customErrorMessage'))
					error.appendTo($(errorsContainer));
					else{
						$(error).html(defaultErrorMessage);
						if(defaultErrorContainer.length){
							error.appendTo($(defaultErrorContainer));
						}	
						else
							errorsContainer.prepend('<div class="defaultErrorContainer">'+error.get(0).outerHTML+'</div>');
						
					}
					
				}
				else{
					
					if (element.is("select") && element.parent().hasClass("form-row")) {
			            error.appendTo(element.parent())
			        } else {
			        	//Code added for Personalized Ribbon Requirement
			        	if(element.hasClass('checkQuantity')){
			        		element.parents(".pdpForm").find(".quantityErrorMessage").append(error);
			        		//error.insertAfter(element.parent());
			        	}else if(element.hasClass('checkQuantityCart')){
			        		element.parent().find(".quantityErrorMessage").append(error);
			        	}
			        	else
			        	error.insertAfter(element);
			        	
			        }
					
				}
				
		    },
		    rules: {
				dwfrm_billing_paymentMethods_creditCard_number: {
					creditcard2: function(){
						var noPaymentNeeded = $('#noPaymentNeeded').val();
						if(noPaymentNeeded) {
							return;
						}
						else{
						return $('#dwfrm_billing_paymentMethods_creditCard_type').val();
						}
					}
				}
			}
		};

	function removeCustomErrorMessage(currentElement){
		if($(currentElement).hasClass('appendToErrorContainer')){
			$(currentElement).addClass('customErrorMessage');
			$(currentElement.form).find("span[for=" + currentElement.id + "]").remove();
		}
	}
	
	function validatePhone(value, el) {
		removeCustomErrorMessage(el);
		var country = $(el).closest("form").find(".country");
		if(country.length === 0 || country.val().length === 0 || !regex.phone[country.val().toLowerCase()]) {
			return true;
		}
		
		var rgx = regex.phone[country.val().toLowerCase()];
		var isOptional = this.optional(el);
		var isValid = rgx.test($.trim(value));
		
		if (isValid){
			$(el).val($.trim(value).replace(rgx, "$1$2$3"));
		}

		return isOptional || isValid;
	}

	function validateEmail(value, el) {
		removeCustomErrorMessage(el);
		
		var isOptional = this.optional(el);
		var isValid = regex.email.test($.trim(value));
		return isOptional || isValid;
	}
	
	function usernameConditionalLogin(value, el) {
		removeCustomErrorMessage(el);
		var $form = $(el).closest("form");
		 
		var $username_email = $(".username-conditional-login");
		var $password = $(".password-conditional-login");
		var $rewards_number = $(".rewards-number-conditional-login");
		var $rewards_email = $(".rewards-email-conditional-login");
		
		var valid = true;
		
		
		var usernameEmailValid = regex.email.test($.trim($username_email.val()));
		var passwordValid = $password.val().length > 0;
		var usernameEmailEmpty = $username_email.val().length == 0;
		var passwordEmpty = $password.val().length == 0;
		if(typeof $rewards_number.val() != 'undefined')
		{
		var rewardsNumberValid = $rewards_number.val().length > 0;
		var rewardsEmailValid = regex.email.test($.trim($rewards_email.val()));
		var rewardsNumberEmpty = $rewards_number.val().length == 0;
		var rewardsEmailEmpty = $rewards_email.val().length == 0;
		
			valid = usernameEmailValid || (usernameEmailEmpty && passwordEmpty && rewardsNumberValid && rewardsEmailValid);
			 
		}
		else
		{
			 
			valid = (usernameEmailValid  && !usernameEmailEmpty) || (usernameEmailValid  && usernameEmailEmpty);
			 
		}
		
		return valid;
	}
	
	function passwordConditionalLogin(value, el) {
		removeCustomErrorMessage(el);
		var $form = $(el).closest("form");
		var $username_email = $(".username-conditional-login");
		var $password = $(".password-conditional-login");
		var $rewards_number = $(".rewards-number-conditional-login");
		var $rewards_email = $(".rewards-email-conditional-login");
		
		var valid = true;
		
		
		var usernameEmailValid = regex.email.test($.trim($username_email.val()));
		var passwordValid = $password.val().length > 0;
		var usernameEmailEmpty = $username_email.val().length == 0;
		var passwordEmpty = $password.val().length == 0;
		if(typeof $rewards_number.val() != 'undefined')
		{
		var rewardsNumberValid = $rewards_number.val().length > 0;
		var rewardsEmailValid = regex.email.test($.trim($rewards_email.val()));
		var rewardsNumberEmpty = $rewards_number.val().length == 0;
		var rewardsEmailEmpty = $rewards_email.val().length == 0;
		
		valid = passwordValid || (usernameEmailEmpty && passwordEmpty && rewardsNumberValid && rewardsEmailValid);
		}
		else
		{
			valid = (passwordValid && !passwordEmpty) || (passwordValid && passwordEmpty);
			 
		}
		
		return valid;
	}
	
	function rewardsNumberConditionalLogin(value, el) {
		removeCustomErrorMessage(el);
		var $form = $(el).closest("form");
		var $username_email = $(".username-conditional-login");
		var $password = $(".password-conditional-login");
		var $rewards_number = $(".rewards-number-conditional-login");
		var $rewards_email = $(".rewards-email-conditional-login");
		
		var valid = true;
		
		
		var usernameEmailValid = regex.email.test($.trim($username_email.val()));
		var passwordValid = $password.val().length > 0;
		var usernameEmailEmpty = $username_email.val().length == 0;
		var passwordEmpty = $password.val().length == 0;
		var rewardsNumberValid = $rewards_number.val().length > 0;
		var rewardsEmailValid = regex.email.test($.trim($rewards_email.val()));
		var rewardsNumberEmpty = $rewards_number.val().length == 0;
		var rewardsEmailEmpty = $rewards_email.val().length == 0;
		
		valid = rewardsNumberValid || (rewardsNumberEmpty && rewardsEmailEmpty);
		
		return valid;
	}
	
	function rewardsEmailConditionalLogin(value, el) {
		removeCustomErrorMessage(el);
		var $form = $(el).closest("form");
		var $username_email = $(".username-conditional-login");
		var $password = $(".password-conditional-login");
		var $rewards_number = $(".rewards-number-conditional-login");
		var $rewards_email = $(".rewards-email-conditional-login");
		
		var valid = true;
		
		
		var usernameEmailValid = regex.email.test($.trim($username_email.val()));
		var passwordValid = $password.val().length > 0;
		var usernameEmailEmpty = $username_email.val().length == 0;
		var passwordEmpty = $password.val().length == 0;
		var rewardsNumberValid = $rewards_number.val().length > 0;
		var rewardsEmailValid = regex.email.test($.trim($rewards_email.val()));
		var rewardsNumberEmpty = $rewards_number.val().length == 0;
		var rewardsEmailEmpty = $rewards_email.val().length == 0;
		
		valid = rewardsEmailValid || (rewardsNumberEmpty && rewardsEmailEmpty);
		
		return valid;
	}
	
	
	
	
	
	function conditionalBirthday() {
		if($("#dwfrm_profile_customer_birthmonth, #dwfrm_profile_customer_birthday").length) {
			$("#dwfrm_profile_customer_birthmonth, #dwfrm_profile_customer_birthday").rules("add", {
			 required: function(element) {
			    	var rewards_checked= $("#dwfrm_profile_customer_rewards").is(":checked");
		    		var conditional_birthcheck = $("#dwfrm_profile_customer_rewards").hasClass("conditional-for-birthday");
			        return rewards_checked && conditional_birthcheck;
			      }
			});
		}
	}
	
	
	$.validator.addMethod("username-conditional-login", usernameConditionalLogin, app.resources.CONDITIONAL_LOGIN_EMAIL);
	$.validator.addMethod("password-conditional-login", passwordConditionalLogin, app.resources.CONDITIONAL_LOGIN_PASSWORD);
	$.validator.addMethod("rewards-number-conditional-login", rewardsNumberConditionalLogin, app.resources.CONDITIONAL_LOGIN_REWARDS);
	$.validator.addMethod("rewards-email-conditional-login", rewardsEmailConditionalLogin, app.resources.CONDITIONAL_LOGIN_EMAIL);
	
	/**
	 * Check for characters.
	 * Text fields must have 'checkCharacters' css class
	 */
	$.validator.addMethod("checkCharacters", function(value,el){
		 var filter = /^[a-zA-Z1234567890# @<>\?\:\"\-\.\'=!”$%&’()*\+,\/;\[\\\]\^_`{|}~]+$/;
         var testCharacters = filter.test(value);
         if (testCharacters === false)
         {
             return false;
         }
         return true;
	}, "Please enter a valid Name");
	
	
	
	/**
	 * Check ZIP Code Check to jQuery validation plugin.
	 * Text fields must have 'checkZIP' css class
	 */
	$.validator.addMethod("checkZIP", function(value,el){
		removeCustomErrorMessage(el);
		if(value.length > 5) 
		return false;
		return true;
	}, app.resources.POSTAL_CODE_ERROR);
	
	
	/**
	 * Add Quantity Check for Personalized Ribbon to jQuery validation plugin.
	 * Text fields must have 'checkQuantity' css class
	 */
	$.validator.addMethod("checkQuantity", function(value,el){
		var restrictAddQty = $("#restrictAddQty"); 
		if(parseInt(value) > 5) return false;
		if(restrictAddQty && (restrictAddQty.val() === "true")) return false;
		return true;
	}, app.resources.QUANTITY_EXCEEDED);
	
	$.validator.addMethod("checkQuantityCart", function(value,el){
		if(parseInt(value) > 5){
			$("#checkout-form button").attr("disabled","disabled");
			return false;
		} 
		if(cartPage.enableCheckout())
		$("#checkout-form button").removeAttr("disabled");
		return true;
	}, app.resources.QUANTITY_EXCEEDED_CART);
	
	/**
	 * Add PR State validation method to jQuery validation plugin.
	 * Select Box must have 'validateState' css class
	 */
	$.validator.addMethod("validateState", function(value, el){
		removeCustomErrorMessage(el);
		if(value === "PR") return false;
		return true;
	}, app.resources.PR_ERROR_MESSAGE);

	/**
	 * Add phone validation method to jQuery validation plugin.
	 * Text fields must have 'phone' css class to be validated as phone
	 */
	$.validator.addMethod("phone", validatePhone, app.resources.INVALID_PHONE);

	/**
	 * Add email validation method to jQuery validation plugin.
	 * Text fields must have 'email' css class to be validated as email
	 */
	$.validator.addMethod("email", validateEmail, app.resources.INVALID_EMAIL);
	
	/**
	 * Add gift cert amount validation method to jQuery validation plugin.
	 * Text fields must have 'gift-cert-amont' css class to be validated
	 */
	$.validator.addMethod("gift-cert-amount", function(value, el){
		removeCustomErrorMessage(el);
		var isOptional = this.optional(el);
		var isValid = (!isNaN(value)) && (parseFloat(value)>=5) && (parseFloat(value)<=5000);
		return isOptional || isValid;
	}, app.resources.GIFT_CERT_AMOUNT_INVALID);

	/**
	 * Add positive number validation method to jQuery validation plugin.
	 * Text fields must have 'positivenumber' css class to be validated as positivenumber
	 */
	$.validator.addMethod("positivenumber", function (value, element) {
		removeCustomErrorMessage(element);
		if($.trim(value).length === 0) { return true; }
		return (!isNaN(value) && Number(value) >= 0);
	}, "");
	// "" should be replaced with error message if needed

	$.validator.messages.required = function ($1, ele, $3) {
		var $ele = $(ele);
		var ele_id = $ele.attr("id");
		var resource_name;
		 
		if (ele_id.match(/dwfrm_profile_customer_/)) {
			resource_name = "MISSING_"+ele_id.replace("dwfrm_profile_customer_", "").toUpperCase();
			if (app.resources[resource_name] != undefined) {
				return app.resources[resource_name];
			} else {
				//console.log("undefined: "+ resource_name);
			}
		} else if (ele_id.match(/dwfrm_profile_login_/)) {
			resource_name = "MISSING_"+ele_id.replace("dwfrm_profile_login_", "").toUpperCase();
			if (app.resources[resource_name] != undefined) {
				return app.resources[resource_name];
			} else {
				//console.log("undefined: "+ resource_name);
			}
		} else if (ele_id.match(/dwfrm_profile_address_/)) {
			resource_name = "MISSING_"+ele_id.replace("dwfrm_profile_address_", "").toUpperCase();
			if (app.resources[resource_name] != undefined) {
				return app.resources[resource_name];
			} else {
				//console.log("undefined: "+ resource_name);
			}
		} else {
			//console.log(ele_id + " will fall back to default messaging");
		}
		
		var label_name;
		var error_message;
		
		label_name = $(ele).siblings("label").find("span.labelname").text();
		error_message = app.resources.MISSINGVAL.replace("{0}", label_name);
		if($(ele).hasClass('appendToErrorContainer')){
			$(ele.form).find("span[for=" + ele.id + "]").remove();
			if(!$(ele).hasClass('customErrorMessage'))
				error_message = "Error: please review and correct all required fields to continue.";
		}
			

			
		
		return error_message;
	};

	app.validator = {
		regex : regex,
		settings : settings,
		init : function () {
			
			$("form:not(.suppress)").each(function () {
				$(this).validate(app.validator.settings);
			});
			
			//conditionalBirthday();
			
		},
		initForm : function(f) {
			$(f).validate(app.validator.settings);
			//conditionalBirthday();
		}
	};
}(window.app = window.app || {}, jQuery));

// app.ajax
(function (app, $) {

	var currentRequests = [];
	// request cache

	// sub namespace app.ajax.* contains application specific ajax components
	app.ajax = {
		// ajax request to get json response
		// @param - async - boolean - asynchronous or not
		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		getJson : function (options) {
			options.url = app.util.toAbsoluteUrl(options.url);
			// return if no url exists or url matches a current request
			if(!options.url || currentRequests[options.url]) {
				return;
			}
			
			currentRequests[options.url] = true;

			// make the server call
			$.ajax({
				dataType : "json",
				url : options.url,
				async : (typeof options.async==="undefined" || options.async===null) ? true : options.async,
				data : options.data || {}
			})
			// success
			.done(function (response) {
				if(options.callback) {
					options.callback(response);
				}
			})
			// failed
			.fail(function (xhr, textStatus) {
				if(textStatus === "parsererror") {
					window.alert(app.resources.BAD_RESPONSE);
				}
				if(options.callback) {
					options.callback(null);
				}
			})
			// executed on success or fail
			.always(function () {
				// remove current request from hash
				if(currentRequests[options.url]) {
					delete currentRequests[options.url];
				}
			});
		},// ajax request to load html response in a given container

		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		// @param - target - Object - Selector or element that will receive content
		loadCustom : function (options) {
			options.url = app.util.toAbsoluteUrl(options.url);
			// return if no url exists or url matches a current request
			if(!options.url || currentRequests[options.url]) {
				return;
			}

			currentRequests[options.url] = true;
			
			var loadURL = options.url;
			
			//append format=ajax only if not already in url
			var params = app.util.getQueryStringParams(loadURL);
			if (!params.format) {
				loadURL = app.util.appendParamToURL(options.url, "format", "ajax");
			}

			// make the server call
			$.ajax({
				dataType : "html",
				url : loadURL,
				data : options.data
			})
			.done(function (response) {
				// success
				if(options.target) {
					var customResponse = response.replace('$1$', options.prodName);
					options.callback(customResponse);
					$(options.target).empty().html(customResponse);
				}
				/*	if(options.callback) {
					var customResponse = response.replace('$1$', options.prodName);
					alert(customResponse);
					options.callback(customResponse);
				}*/

			})
			.fail(function (xhr, textStatus) {
				// failed
				if(textStatus === "parsererror") {
					window.alert(app.resources.BAD_RESPONSE);
				}
				options.callback(null, textStatus);
			})
			.always(function () {
				app.progress.hide();
				// remove current request from hash
				if(currentRequests[options.url]) {
					delete currentRequests[options.url];
				}
			});
		},
		// ajax request to load html response in a given container

		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		// @param - target - Object - Selector or element that will receive content
		load : function (options) {
			options.url = app.util.toAbsoluteUrl(options.url);
			// return if no url exists or url matches a current request
			if(!options.url || currentRequests[options.url]) {
				return;
			}

			currentRequests[options.url] = true;
			
			var loadURL = options.url;
			
			//append format=ajax only if not already in url
			var params = app.util.getQueryStringParams(loadURL);
			if (!params.format) {
				loadURL = app.util.appendParamToURL(options.url, "format", "ajax");
			}

			// make the server call
			$.ajax({
				dataType : "html",
				url : loadURL,
				data : options.data
			})
			.done(function (response) {
				// success
				if(options.target) {
					$(options.target).empty().html(response);
				}
				if(options.callback) {
					options.callback(response);
				}

			})
			.fail(function (xhr, textStatus) {
				// failed
				if(textStatus === "parsererror") {
					window.alert(app.resources.BAD_RESPONSE);
				}
				options.callback(null, textStatus);
			})
			.always(function () {
				app.progress.hide();
				// remove current request from hash
				if(currentRequests[options.url]) {
					delete currentRequests[options.url];
				}
			});
		}
	};
}(window.app = window.app || {}, jQuery));

// app.searchsuggest
(function (app, $) {
	// add searchsuggest to namespace
	app.searchsuggest = {
		// configuration parameters and required object instances
		acListTotal   :  0,
		acListCurrent : -1,
		acDelay       : 400,			
		acFormId      : null,
		acSearchId	  : null,
		acResultsId	  : null,
		acSearchField : null,
		acResultsDiv  : null,
		fieldDefault  : null,
		suggestionsJson: null,
		acGetSuggestHitsURL: null,			
		
		init : function(formId, fieldId, fieldDefault, resultsId, getSuggestionHitsURL ) {
			// initialize vars				
			app.searchsuggest.acFormId = "#" + formId;
			app.searchsuggest.acSearchId = "#" + fieldId;
			app.searchsuggest.acResultsId = "#" + resultsId;
			//app.searchsuggest.acURL = url;				
			app.searchsuggest.acGetSuggestHitsURL = getSuggestionHitsURL;				
			app.searchsuggest.fieldDefault = fieldDefault;
			
			// disable browser auto comlete
			app.util.disableAutoComplete(fieldId);			
			// create the results div
			jQuery(".sitesearch-block").append("<div id=\"" + resultsId + "\"></div>");
		
			// register mostly used vars (jQuery object)
			app.searchsuggest.acSearchField = jQuery(app.searchsuggest.acSearchId);
			app.searchsuggest.acResultsDiv = jQuery(app.searchsuggest.acResultsId);
		
			// reposition div
			//app.searchsuggest.repositionResultsDiv();
			
			 $("#" + resultsId).fadeOut();
			// on blur listener
			app.searchsuggest.acSearchField.blur(function(){ setTimeout("app.searchsuggest.clear()", 200) });
		
			// on key up listener
			app.searchsuggest.acSearchField.keyup(function(e) {
				// get keyCode (window.event is for IE)
				var keyCode = e.keyCode || window.event.keyCode;
				//console.log(app.searchsuggest.acSearchField);
				var lastVal = app.searchsuggest.acSearchField.val();
				// check an treat up and down arrows
				if(app.searchsuggest.updownArrow(keyCode, this)){
					return;
				}
				// check for an ENTER or ESC
				if(keyCode == 27) {
					app.searchsuggest.clear();
					return;
				}
		
				// if is text, call with delay
				setTimeout(function() { app.searchsuggest.suggest(lastVal) }, app.searchsuggest.acDelay);
			});
			
			// on focus listener (clear default value)
			app.searchsuggest.acSearchField.focus(function() {
				$(".simplesearchinput").css("color","#472d27");
				var val = app.searchsuggest.acSearchField.val();
				if(val == app.searchsuggest.fieldDefault)
				{
					app.searchsuggest.acSearchField.val("");
				}
			});
			
			// on submit we do not submit the form, but change the window location
			// in order to avoid https to http warnings in the browser
			jQuery(app.searchsuggest.acFormId).submit(function(e) {
				
				e.preventDefault();
				var searchURL = $('#searchURL').val();
									
				if((searchURL != '') && (searchURL!= undefined)){						
					
					if(jQuery(".productDeatils.dropdownselected.selected").find("a").attr("href") != undefined){
						var tempURL = jQuery(".productDeatils.dropdownselected.selected").find("a").attr("href");
					}else if(jQuery(".article.dropdownselected.selected").find("a").attr("href") != undefined){
						var tempURL = jQuery(".article.dropdownselected.selected").find("a").attr("href");
					}else{							
						var tempURL = searchURL;
					}

					window.location = tempURL;
				} else {						
					
					var searchUrl = jQuery(app.searchsuggest.acFormId).attr("action");
					//var searchTerm = app.searchsuggest.acSearchField.val();
					var searchTerm  = jQuery(".suggestionterm.dropdownselected.selected").attr("id");
					if(searchTerm != undefined){						
						window.location = app.util.appendParamToURL(searchUrl, "q", searchTerm);
					}else{
						searchTerm = app.searchsuggest.acSearchField.val();							
						window.location = app.util.appendParamToURL(searchUrl, "q", searchTerm);
					}
				}
								
				/*var searchUrl = jQuery(app.searchsuggest.acFormId).attr("action");
				var searchTerm = app.searchsuggest.acSearchField.val();
				window.location = app.util.appendParamToURL(searchUrl, "q", searchTerm);
				return false;*/
			});
		},
		
		// trigger suggest action
		suggest : function(lastValue)
		{	
			// get the field value
			var part = app.searchsuggest.acSearchField.val();
		
			// if it's empty clear the resuts box and return
			if(part == "") {
				app.searchsuggest.clear();
				return;
			}
		
			// if it's equal the value from the time of the call, allow
			if(lastValue != part) {
				return;
			}
			
			// build the request url
			//var reqUrl = app.util.appendParamToURL(app.searchsuggest.acURL, "q", part);		
			//var displaySearchHitsBol = app.searchsuggest.displaySearchHitsSwitch;
			var ansLength=0;
																	
			var newData = "";
			
				if( part != null ){								
					var getHitsUrl = app.util.appendParamToURL(app.searchsuggest.acGetSuggestHitsURL, "q", part);
					getHitsUrl = app.util.appendParamToURL(getHitsUrl, "len", lastValue.length);
					
						$.ajax({
							  url	: getHitsUrl,
							  dataType: "html",						  
							  success: function(data){
								  if(data.indexOf("emptyInput") != -1){
									  app.searchsuggest.clear();
								  }else{
									
									  app.searchsuggest.acResultsDiv.html(newData + "" + data);
										
										app.searchsuggest.acResultsDiv.css("display","block");
										// reposition in case user resizes browser between searches
										app.searchsuggest.repositionResultsDiv();																						
								  }
								  app.searchsuggest.selectionHover();
								  var totalList  = $('div.suggestionterm').length;
								  	  totalList += $('div.productDetails').length;
								  	  totalList += $('div.article').length;
								  	  app.searchsuggest.acListCurrent = 0;
								  	  app.searchsuggest.acListTotal = totalList;
							  }															
						});	
				}else{								
					//app.searchsuggest.suggestionsJson = json.suggestions;
					// update the results div
					//app.searchsuggest.acResultsDiv.html(newData);
				}
											
					
					// on click copy suggestion to search field, hide the list and submit the search
					
				//} else {
				//	app.searchsuggest.clear();
				//}
			//});
					
		},
		
		// clear suggestions
		clear : function()
		{
			app.searchsuggest.acResultsDiv.html("");
			app.searchsuggest.acResultsDiv.css("display","none");
		},
		
		// reposition the results div accordingly to the search field
		repositionResultsDiv : function()
		{
			// get the input position
			//var inPos = app.searchsuggest.acSearchField.offset();
			//var inTop = $('#header').height();
			//var inLeft = $('#header').width();
			
			// get the field size
			//var inHeight = app.searchsuggest.acSearchField.height();
			var inWidth = app.searchsuggest.acSearchField.width();
			
		
			var position = $('.posRight').position();		
			
			//("left: " + position.left + ", top: " + position.top);			
			
			// apply the css styles
			//console.log(app.searchsuggest.acResultsDiv);
			app.searchsuggest.acResultsDiv.addClass("suggestions");
			/*app.searchsuggest.acResultsDiv.css("right", "-14px");
			app.searchsuggest.acResultsDiv.css("top", "77px");
			app.searchsuggest.acResultsDiv.css("width", "320px");
			app.searchsuggest.acResultsDiv.css("z-index", "7777");*/
			
			
		},
		selectionHover : function() {	
			//This method handles onHover and Click events.
			$(".suggestionterm, .productDetails, .article").mouseover(function(){
				$(this).removeClass("unselected").addClass("selected");
			    }).mouseout(function(){						    	
			    $(this).removeClass("selected").addClass("unselected");      
			});
			
			$(".suggestionterm").click(function(){
				if($(this).hasClass("selected")){
					var suggestTermID = $(this).attr('id');
					//app.searchsuggest.acSearchField.val(suggestTermID);
					//app.searchsuggest.clear();
					//jQuery(app.searchsuggest.acFormId).submit();
					var searchUrl = jQuery(app.searchsuggest.acFormId).attr("action");
					window.location = app.util.appendParamToURL(searchUrl, "q", suggestTermID);
				}
				  
			});
			$(".productDetails").click(function(){
				if($(this).hasClass("selected")){
					var url = $(this).find('.shopnow a').attr('href');
					app.searchsuggest.clear();
					window.location.href = url;
				}
				  
			});
			$(".article").click(function(){
				if($(this).hasClass("selected")){
					var url = $(this).find('.artRedirectURL').attr('value');
					app.searchsuggest.clear();
					window.location.href = url;
				}
				  
			});
			
		},
		// treat up and down key strokes defining the next selected element
		updownArrow : function(keyCode , ele) {
			var suggestTermID = $(this).attr('id');
			var suggestTermID1 = ele.id;				
			//app.searchsuggest.acListCurrent = 0;
			if(keyCode == 40 || keyCode == 38) {
				
				if(keyCode == 38) { // keyUp
					if(app.searchsuggest.acListCurrent == 0 || app.searchsuggest.acListCurrent == -1) {
						app.searchsuggest.acListCurrent = app.searchsuggest.acListTotal ;
					} else {
						app.searchsuggest.acListCurrent--;
					}
				} else { // keyDown
					//console.log(keyCode);
					if(app.searchsuggest.acListCurrent == app.searchsuggest.acListTotal) {
						app.searchsuggest.acListCurrent = 0;							
					} else {
						app.searchsuggest.acListCurrent++;
					}
				}
				
				// loop through each result div applying the correct style
				app.searchsuggest.acResultsDiv.children('div').each(function(i) {
					if(i == app.searchsuggest.acListCurrent){
						if($(this).find("a").length != 0) {
							$('#searchURL').val($(this).find("a").attr("href"));
						}
						else{
							$('#searchURL').val("");
							app.searchsuggest.acSearchField.val(suggestTermID);
						}
						
						//$('#searchURL').val(suggestTermID);							
						
						$(this).removeClass("unselected");
						$(this).addClass("selected");							
					} else {
						$(this).removeClass("selected");
						$(this).addClass("unselected");
					}
				});
				return true;
			} else {
				// reset
				app.searchsuggest.acListCurrent = -1;
				return false;
				app.searchsuggest.acLit
			}
		}
	} // end searchsuggest
}(window.app = window.app || {}, jQuery));

// app.searchplaceholder
(function (app, $) {
	
	function initializeEvents() {
		$('#q').focus(function () {
			var input = $(this);
			if (input.val() === input.attr("placeholder")) {
				input.val("");
			}
		})
		.blur(function () {
			var input = $(this);
			if (input.val() === "" || input.val() === input.attr("placeholder")) {
				input.val(input.attr("placeholder"));
			}
		})
		.blur();
	}
	
	app.searchplaceholder = {
		init : function () {
			initializeEvents();
		}
	};
}(window.app = window.app || {}, jQuery));

// jquery extensions
(function ($) {
	// params
	// toggleClass - required
	// triggerSelector - optional. the selector for the element that triggers the event handler. defaults to the child elements of the list.
	// eventName - optional. defaults to 'click'
	$.fn.toggledList = function (options) {
		if (!options.toggleClass) { return this; }

		var list = this;
		function handleToggle(e) {
			e.preventDefault();
			var classTarget = options.triggerSelector ? $(this).parent() : $(this);
			classTarget.toggleClass(options.toggleClass);
			// execute callback if exists
			if (options.callback) { options.callback(); }
		}

		return list.on(options.eventName || "click", options.triggerSelector || list.children(), handleToggle);
	};

	$.fn.syncHeight = function () {
		function sortHeight(a, b) {
			return $(a).height() - $(b).height();
		}

		var arr = $.makeArray(this);
		arr.sort(sortHeight);
		return this.height($(arr[arr.length-1]).height());
	};
}(jQuery));

// general extension functions
(function () {
	String.format = function() {
		var s = arguments[0];
		var i,len=arguments.length - 1;
		for (i = 0; i < len; i++) {       
			var reg = new RegExp("\\{" + i + "\\}", "gm");             
			s = s.replace(reg, arguments[i + 1]);
		}
		return s;
	};
})();

if ($.browser.webkit) {
    $('#dwfrm_profile_customer_emailconfirm').attr('autocomplete', 'off');
    $('#dwfrm_profile_login_password').attr('autocomplete', 'off');
}
$(window).load(function () {
	if ($.browser.webkit) {
	    $('#dwfrm_profile_customer_emailconfirm').attr('autocomplete', 'off');
	    $('#dwfrm_profile_login_password').attr('autocomplete', 'off');
	}
	if($('#isRegistration') && $('#isRegistration').val()=="true"){
		
		$('#dwfrm_profile_customer_email').val('');
		$('#dwfrm_profile_customer_emailconfirm').val('');
		 $('#dwfrm_profile_login_password').val('');
		$('#dwfrm_profile_login_passwordconfirm').val('');
		
	}
});

// initialize app
jQuery(document).ready(function () {
	app.init();
});
//Set Element value for radio button group
function setElementValue(id, value) {
	   var e = document.getElementById(id);
	      e.value = value;
}


