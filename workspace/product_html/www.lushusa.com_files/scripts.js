/* Common scripts for Lush site */
var LUSH = (function(){
	function init(){
		// append the current site ID to the body tag
		jQuery('body').addClass(app.currentSiteId).addClass(app.currentSiteLocale);
		bindEvents(jQuery);
		setupToolTips(jQuery);
	}

	function bindEvents($){

		responsiveEvents();
		
		// enable flexslider if it's available: http://www.woothemes.com/flexslider/
		if($.fn.flexslider) {
			// don't force it to be ul/li
			$('.flexslider').flexslider({selector: ".slides > *"});
		}
		
		// catalogue and newsletter signup popup
		// TODO: why not trigger this on some generic class, like .pop-up 
		$(".catalogue-signup, .newsletter-signup").click(function(e) {
			e.preventDefault();
			var url = $(this).attr('href');
			app.dialog.open(url, $(this).attr('title'));
		});

		$('form#maillist').submit(function(){
	
			// submit the email form.
			// on success or failure, open up the form to get more information.
			var postdata = {
				ltkSubscriptionCode : $('[name=ltkSubscriptionCode]',this).val(),
				maillistinput: $('[name=maillistinput]',this).val(),
				getsuccess: 'yes',
				isFooter: $('[name=ltkSubscriptionCode]', this).val()
			};
			var dialogtitle = $(this).attr('title');
			
			if(postdata.isFooter == 'footerSignup'){
				var dialogurl = $('[name=dialogurl]',this).val() + '?email='+postdata.maillistinput+'&ft=t';	
			}else{
			    var dialogurl = $('[name=dialogurl]',this).val() + '?email='+postdata.maillistinput;
			}

			/*$.post(
				$(this).attr('action'),
				postdata,
				function(data){
				}
			);*/
		
			app.dialog.open({url:dialogurl});
			return false;
		});
		
		/**Mail sign up footer **/
		$('form#maillist-footer').submit(function(){
			// submit the email form.
			// on success or failure, open up the form to get more information.
			var postdata = {
				ltkSubscriptionCode : $('[name=ltkSubscriptionCode]',this).val(),
				maillistinput: $('[name=maillistinput-footer]',this).val(),
				getsuccess: 'yes'
			};
			var dialogtitle = $(this).attr('title');
			var dialogurl = $('[name=dialogurl]',this).val() + '?email='+postdata.maillistinput;
			$.post(
				$(this).attr('action'),
				postdata,
				function(data){
				}
			);
			
			app.dialog.open({url:dialogurl});
			return false;
		});
		



				
		$('.youtube a, a.youtube').click(function(e){
			 if(app.isMobileUserAgent){return true;}else{
			  e.preventDefault();
			  app.dialog.openYoutubebig($(this).attr('href'),$(this).attr('title'));
			 }
		});
		
		
		/** Toggle header banner promotional slot ***/
		$('.fs-promo, .promo-banner, .sample-promo').on('click','.closebutton',function(){
			var $toggleDiv = $(this).parent().closest('div');
			var sessionUrl = app.urls.bonusSessionOff;
			
			expandClass($toggleDiv.is(':visible'),$(this));
			
			$.ajax({
		        type: "GET",
		        async: true,
		        url: sessionUrl,
		        success: function (data) { 
		        	$toggleDiv.fadeToggle(200);		        		
		         }

		    });	
			
		
			
			//if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth ) { }
	      });
		
		 
		
		/* toggle the header's mobile search field */
		$('#header #header-searchcontrol').on('click', function() {
			var hsearch = $("#header-search");
			if(hsearch.css('display') !== 'none'){
				hsearch.hide();
				  hsearch.removeAttr("style");
					$(this).removeClass('active');
			}else{
		  
			
			hsearch.show();
			 if(app.isMobileUserAgent){
				 hsearch.find('input, textarea').first().focus();   
				  }
			//$("#header-search").slideToggle(200);
			$(this).addClass('active');
				}
		});

		
		/* toggle the header's mobile search field */
		$('#headerWide').on('click', '#header-searchcontrol' , function() {
			var hsearch = $("#header-search");
			var headerCont = $("#headerWide");
			
			if(hsearch.css('display') !== 'none'){
				
				 hsearch.removeAttr("style").removeClass('showSearch');
				 headerCont.removeClass('extend');
				 $(this).removeClass('active');

			}else{
		  
		    headerCont.addClass('extend');    
			setTimeout(
					  function() 
					  {
						  hsearch.addClass('showSearch');
						  hsearch.find('input#q').focus(); 
					  }, 250);
			
			 
				    
				 if(app.isMobileUserAgent){  }
			//$("#header-search").slideToggle(200);
			$(this).addClass('active');
				}
		});
		
		
		
		// tabs
		$('.tabs > span').click(function(e){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			var divopen = $('.'+$(this).attr('rel'));
			divopen.siblings().each(function(){
				if(!$(this).hasClass('tabs')){
					$(this).hide();
				}
			});
			divopen.show();
		});
		
		// scroll internal links
		$('.link-scroll, .pr-snippet-read-reviews a').click(function(e){
			e.preventDefault();
			var scrollTo = $($(this).attr('href')).offset().top;
			$('html,body').animate({
				scrollTop: scrollTo
			},1000);
		});
		
		$('.scroll-divs-container').each(function(i){
			carousel($(this));
		});
		
		// on body scroll, if minicart goes out of view, set it as fixed
		$(document).scroll(function(e){
			if( $(this).scrollTop() > 30 ) {
				$('.mini-cart-content').addClass('minicart-fixed');
			} else {
				$('.mini-cart-content').removeClass('minicart-fixed');
			}
		});
		
		// the more-text link
		$('.more-less-link').click(function(){
			var $self = $(this);
			var $moreText = $self.parent('div').parent('div').find('.text-more');
			var $lessText = $self.parent('div').parent('div').find('.text-less');
			if( $(this).hasClass('more') ) {
				$lessText.slideUp(500,function(){
					$moreText.slideDown(500);
				})
			} 
			else if( $(this).hasClass('less') ) {
				$moreText.slideUp(500,function(){
					$lessText.slideDown(500);
				})
			}
		});

		// Fix variant selection for product searches
		$('#wrapper').on('change keyup', '.search-result-content .product-tile .variantdropdown select', function() {
			updateGridPrices($(this).parents('.product-tile'));
		});
		
		// Slightly altered event of old variant selection update to match new bootstrap layout
		$('#product-grid').on('click', '.product-item .variant-choice', function() {
			updateProductVals($(this).parents('.product-item'), $(this));
		});
		
		// Log out users from gigya social
		$('a[title="Logout"]').on('click',function(e){
			e.preventDefault();
			gigya.services.socialize.logout({
				callback: gigyaLogout,
				context: $(this)
			});
		});
		
		// prevent customer care phone number in footer from being clickable unless on mobile
		$('li#footer-nav-customer-care ul li.cc-phone a').on('click',function(e){
			var currW = jQuery('#wrapper');
			if( currW.width() > app.responsive.tabletLayoutWidth ) {
				e.preventDefault();
			}
		});
		
	} // end of bindEvents
	
	function responsiveEvents(){
		// checkout summary show/hide car
		$('.summary').on('click','.section-header',function(){
			
				var $toggleDiv = $(this).next();
				expandClass($toggleDiv.is(':visible'),$(this));
				$toggleDiv.fadeToggle(200);
				//if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth ) { }
		});
		
		$('#footer-links ul li h3').on('click',this,function(){
			var currW = jQuery('#wrapper');
			if( currW.width() <= app.responsive.tabletLayoutWidth ) {
				$(this).toggleClass("open");
				parentDiv = $(this).parent();
				if(app.isMobileUserAgent){ 	 
				jQuery(parentDiv).children("div.contentasset, ul").fadeToggle( 350 , 'ease', $('html,body').animate({
		            scrollTop: $(this).offset().top
		        }, 650, 'easeInOutExpo'));
				}else{
					jQuery(parentDiv).children("div.contentasset, ul").slideToggle(350); }
				
			

			}
			
		});
		
	}
	

	
	function expandClass(bool,$obj){
		if(bool){
			$obj.removeClass('expanded');
		} else {
			$obj.addClass('expanded');
		}
	}
	
	/* Custom HTML popups
	* assumes an <a> title surrounding an img tag
	* TODO: replace this with some kind of plug-in, activate only if desktop (not mobile)
	*/
	function setupToolTips($) {
		// title popups
		// assumes an <a> title surrounding an img tag
		$('.tooltip-title').live('mouseover',function(){
			var ttdiv = document.createElement('div');
			$(ttdiv).attr('id','ttdiv');
			$(ttdiv).append('<div class="top">' + $(this).attr('title') + '</div><div class="arrow"></div>');
			
			$('body').append(ttdiv);
			
			// center the tooltip on the first image found in the div
			// if no img tag found, center on the current object
			var $img = $('img',this);
			if($img.length == 0){
				$img = $(this);
			}
			var offset = $img.offset();
			var left = offset.left + ($img.width() / 2 - $(ttdiv).width() / 2);
			var top = offset.top - $(ttdiv).height() - 2;
			$(ttdiv).css({left: left + 'px',top: top + 'px'});
		}).live('mouseout',function(){
			$('#ttdiv').remove();
		});
		
		$('.tooltip-html').live('mouseover',function(){
			var ttdiv = document.createElement('div');
			
			var ctitle = $(this).attr('rel');
			
			var ttcontent = document.getElementById(ctitle).innerHTML;
			
			$(ttdiv).attr('id','ttdiv');
			$(ttdiv).append('<div class="bottomarrow"></div><div class="bottom">' + ttcontent + '</div>');
			$('body').append(ttdiv);
			
			
			// center the tooltip on the first image found in the div
			// if no img tag found, center on the current object
			var $img = $('img',this);
			if($img.length == 0){
				$img = $(this);
			}
			var offset = $img.offset();
			
			var left = offset.left + ($img.width() / 2 - $(ttdiv).width() / 2);
			var top = offset.top + $(ttdiv).height() + 35;
			$(ttdiv).css({left: left + 'px',top: top + 'px'});
		}).live('mouseout',function(){
			$('#ttdiv').remove();
		});
		
		
		// Custom HTML popups
		// assumes an <a> title surrounding an img tag
		$('.tooltip-html-top').live('mouseover',function(){
			var ttdiv = document.createElement('div');
			
			var ctitle = $(this).attr('rel');
			
			var ttcontent = document.getElementById(ctitle).innerHTML;
			
			$(ttdiv).attr('id','ttdiv');
			$(ttdiv).append('<div class="topbox">' + ttcontent + '</div><div class="arrow"></div>');
			$('body').append(ttdiv);
			
			
			
			// center the tooltip on the first image found in the div
			// if no img tag found, center on the current object
			var $img = $('img',this);
			if($img.length == 0){
				$img = $(this);
			}
			var offset = $img.offset();
			var left = offset.left + ($img.width() / 2 - $(ttdiv).width() / 2);
			var top = offset.top - $(ttdiv).height() + 5;
		
			$(ttdiv).css({left: left + 'px',top: top + 'px'});
		}).live('mouseout',function(){
			$('#ttdiv').remove();
		});		
	} // end setupToolTips
		
	function updateGridPrices (object) {
		var $selected = jQuery('.variantdropdown select option:selected',object);
		var val = $selected.val();
		if(val == '-1'){
			jQuery('.add-to-cart',object).addClass("disabled");
		} else {
			var rel = $selected.attr('rel');
			if (typeof(rel) != 'undefined' && rel != '') {
				var relSplit = rel.split('|');
				jQuery('.product-sales-price',object).text(relSplit[0]);
				jQuery('input[name="pid"]',object).val(relSplit[1]);
			}
			// enable the add to cart button - not doing so was creating bugs in Firefox and Safari Mac
			jQuery('.add-to-cart',object).removeClass("disabled");
		}
	}
	
	//Slightly altered function of "updateGridPrices" to match new bootstrap layout
	function updateProductVals(object, selectedVariant) {
		var currentSelectedID = jQuery('.variants-box .selected', object).data('product-id');
		var selectedID = selectedVariant.data('product-id');
		var selectedPrice = selectedVariant.data('product-price');
		
		if(currentSelectedID == selectedID) { 
			return;
		} else {
			jQuery('.variant-choice', object).removeClass('selected');
			selectedVariant.addClass('selected');
			jQuery('.product-sales-price',object).text(selectedPrice);
			jQuery('input[name="pid"]',object).val(selectedID);
		}
	}
	
	/* TODO: replace with flexslider maybe??? */
	function carousel($co){
		// $co = carousel object
		// add nav items
		var prev = document.createElement('div');
		var itemsPerScroll = 4;
		jQuery(prev).addClass('prev');
		var next = document.createElement('div');
		jQuery(next).addClass('next');
		$co.parent().append(prev).append(next);
		var itemWidth = jQuery('.scroll-item',$co).outerWidth(true);
		var containerWidth = itemWidth * jQuery('.scroll-item',$co).length;
		jQuery('.scroll-divs',$co).width(containerWidth);
		showhidearrows($co.parent(),0,itemWidth,containerWidth,itemsPerScroll);
		
		jQuery(prev).click(function(){
			var self = this;
			var pos = jQuery('.scroll-divs',$co).position();
			var newleft = pos.left + itemWidth * itemsPerScroll;
			if(newleft > 0) {
				newleft = 0;
			}
			jQuery('.scroll-divs',$co).animate({left: newleft + 'px'},300,function(){
				showhidearrows($co.parent(),newleft,itemWidth,containerWidth,itemsPerScroll);
			});
		});
		jQuery(next).click(function(){
			var self = this;
			var pos = jQuery('.scroll-divs',$co).position();
			var newleft = pos.left - itemWidth * itemsPerScroll;
			if(newleft <= containerWidth * -1 + itemWidth * itemsPerScroll) {
				newleft = containerWidth * -1 + itemWidth * itemsPerScroll;
			}
			jQuery('.scroll-divs',$co).animate({left: newleft + 'px'},300,function(){
				showhidearrows($co.parent(),newleft,itemWidth,containerWidth,itemsPerScroll);
			});
		});
		
		function showhidearrows(container,left,iW,cW,count){
			var $prev = jQuery('.prev',container);
			var $next = jQuery('.next',container);
			$prev.show();
			$next.show();
			if (jQuery('.scroll-item',container).length <= count) {
				$prev.hide();
				$next.hide();
			} else if(left >= 0) {
				$prev.hide();
			} else if (left <= ( cW * -1 ) + ( iW * count ) ) {
				$next.hide();
			}
		}
	}
	
	function formlabels($container){
		//THIS FUNCTION IS REQUIRED BECAUSE THE COMPS FOR THESE FORMS HAVE THE LABELS WITHIN THE INPUTS THEMSELVES
		// go through each input and set click events for placing the label in the box
		
		jQuery('input.input-text',$container).each(function(){
			var $self = jQuery(this);
			var $formfield = $self.parents('.form-row');
			var $label = jQuery('label',$formfield);
			var label = jQuery('span:first-child',$label).text();
			
			if(typeof($self.attr('data-default')) != "undefined")
				$self.val($self.attr('data-default'));

			// look for error label if empty
			if(label == '') {
				var label = jQuery('.errorlabel',$formfield).text();
			}
			if($self.val() == '' || $self.val() == label){
				// set value and click handler
				$self.val(label).attr('placeholder',label);
				$self.focus(function(){
					if($self.val() == label){
						$self.val('');
					}
				});
				$self.blur(function(){
					if($self.val() == ''){
						$self.val(label);
					}
				});
			}
		}).eq(0).focus();
		
		// update select primary options
		jQuery('select',$container).each(function(){
			var $self = jQuery(this);
			var $formfield = $self.parents('.formfield');
			var label = jQuery('label',$formfield).text();
			if(label == '') {
				var label = jQuery('.errorlabel',$formfield).text();
			}
			jQuery('option',$self).eq(0).text(label).attr('label',label);
		});
	}
	
	return {
		init: init,
		carousel: carousel,
		formlabels: formlabels,
		expandClass: expandClass
	};
}());

jQuery(document).ready(function(){

	/*Constants*/
	
	$lushwrapper = jQuery('#wrapper');
	$lushcontainer = jQuery('#main.container');
	
	LUSH.init();
	
});


//* IOs6 ajax post cache fix **/
/*if (/OS 6_/.test(navigator.userAgent)) {
    $.ajaxSetup({ cache: false });
  }*/

 
/* Video Cycler */
function videoCycler(plyID,container) {  
	var playlistID = plyID;
	var playlistContainer = container;
	   var playListURL = '//gdata.youtube.com/feeds/api/playlists/'+ playlistID +'?v=2&alt=json&callback=?';
	   var videoURL= '//youtu.be/';
	   jQuery.getJSON(playListURL, function(data, textStatus) {
	       var list_data="";
	       jQuery.each(data.feed.entry, function(i, item) {
	           var feedTitle = item.title.$t;
	           var feedURL = item.link[1].href;
	           var fragments = feedURL.split("/");
	           var videoID = fragments[fragments.length - 2];
	           var url = videoURL + videoID;
	           var thumb = "https://img.youtube.com/vi/"+ videoID +"/mqdefault.jpg";
	           
	           if(videoID !== 'videos' && videoID !== null){
	           list_data += '<li class="video-item youtubesliderbig"><a href="'+ url +'" title="'+ videoID +'" class="teaserImgOverlay"><img alt="'+ feedTitle+'" src="'+ thumb +'"><p class="teaserSmall">'+ feedTitle+'</p></a></li>';
	           }
	        
	       });
	       jQuery(list_data).appendTo(container);
	       
	        
	       if (textStatus == 'success') {
	    	   
	    	   jQuery('.youtubesliderbig a').click(function(e){
	    			e.preventDefault();
	    			app.dialog.openYoutubebig(jQuery(this).attr('href'),jQuery(this).attr('title'));
	    		});  
	    	   var lis = jQuery("li.video-item");
	    	   var lisnav= '';
	    	   for(var i = 0; i < lis.length; i+=3) {
	    	     lis.slice(i, i+3).wrapAll("<ul class='vblock'> </ul>");
	    	   }
	            
	    	   if(lis.length > 3){
	    		    lisnav = true
	    		    jQuery('.videocontrolstop').css({'display': 'block'});
	    		    app.rotatingcontent.init(jQuery('.video-teaser-box'),'ul');
	    		    
	    	       }else{
	    	    	lisnav=false
	    	    	jQuery('.videocontrolstop').css({'display': 'none'});
	    	       }
	    	   
	    	   //jQuery('.loadingVids').css({'display': 'none'});
	    	   
	        }
	        else {
	        	alert('could not load playlist');
	           //only shows if the data object was returned
	        }
    
	   });  
}

// GIGYA Specific scripts
// Publish to activity feed
function publishFeed(linkback, title, desc, src, type) {  
    var act = new gigya.services.socialize.UserAction();
    act.setLinkBack(linkback);
    act.setTitle(title);
    act.setDescription(desc);
    if(typeof(src) != 'undefined') {
	    /**/
	    act.addMediaItem({ // Adding a Media
	    	'src': src,  
	        'href': linkback,  
	        'type': type  
	    });
	    /**/
    }
    act.setActionName("shared");  
      
    // Parameters for the publishUserAction method,   
    var params = {  
        userAction: act,   // including the UserAction object  
        scope: "internal", // the Activity Feed will be published internally only (site scope), not to social networks  
        privacy: "public",
        callback: publishAction_callback
    };
      
    // Publish the User Action 
    gigya.services.socialize.publishUserAction(params);  

}  

// Display a status message according to the response from publishUserAction.  
function publishAction_callback(response)  
{   
    switch (response.errorCode )  
    {  
        case 0:  
            jQuery('#status').css({ color: "green" });
            jQuery('#status').html("Activity Feed item published, and will be presented shortly on the Activity Feed Plugin.");
            break;  
        default:
//        	jQuery('#status').css({ color: "red" });
//   		jQuery('#status').html("Unable to send Feed item. status="   
//                    + response.errorCode + "; " + response.errorMessage + ";<br />"   
//                    + "Please make sure you are logged in to Gigya. "   
//                    + "You may log in using the Login Plugin inside the 'Me' tab of the Activity Feed Plugin.");
    }  
}

function gigyaLogout(response) {
	location.href = response.context.attr('href');
}

$(document).on('click', '.addloader', function(e) {    	
	if ($(this).children('.tempLoaderTransparent').length == 0) {	 	
		var temploaderdark = jQuery('<div> </div>');
		var bwidth = $(this).width();
		temploaderdark.css({'width': bwidth+'px'});
		temploaderdark.addClass('tempLoaderTransparent'); 
		jQuery(this).find('span').html(temploaderdark); 
	//	if ($(this).children('.secure').length > 0){ jQuery(this).find('.secure').hide();}
		
	 }else{ 
		 var temploaderdark = jQuery(this).find('.tempLoaderTransparent');
		 var bwidth = $(this).width();
		 temploaderdark.css({'width': bwidth+'px'});
		 temploaderdark.show();
		// if ($(this).children('.secure').length > 0){ jQuery(this).find('.secure').hide();}
		 jQuery(this).find('span').hide(); 
	
	 }

}); 

jQuery(window).bind('resize orientationchange', function() {
 	ww = document.body.clientWidth;
 	 
 	
 });

//Emulates HTML5 "placeholder" functionality for browsers that don't support it

$('[placeholder]').focus(function() {
	var input = $(this);
	if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
		}
	}).blur(function() {
		var input = $(this);
		if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
}).blur();

$('[placeholder]').parents('form').submit(function() {
	$(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
			input.val('');
		}
	})
});


// prevents clicks on the site-switcher icon for the site you're currently on
$(document).on('click', 'li.footer-nav-siteswitch-icons li.active a', function(e) {
	e.preventDefault();
}); 