//Engage
jQuery(document).ready(function(){
	var cyclePrevClicked = false;
	var clickedSetIndex = false;
	$('#cycle-2').on('cycle-after', function(e, opts) {
		if (clickedSetIndex == true) {
			clickedSetIndex = false;
			return;
		}
		if (cyclePrevClicked == false) {
		 	var nextIndex = (opts.currSlide + 1);
		 	if (nextIndex == opts.slideCount) {
		 		nextIndex = 0;
		 	}
	    	// advance the other slideshow
	    	$('#cycle-1').cycle('goto', nextIndex);
	    } else {
		 	var nextIndex = (opts.currSlide - 1);
		 	if (nextIndex < 0) {
		 		nextIndex = opts.slideCount - 1;
		 	}
		 	cyclePrevClicked = false;
	    	// advance the other slideshow
	    	$('#cycle-1').cycle('goto', nextIndex)
	    }
	});

	var slideshows = $('#cycle-2').on('cycle-prev', function(e, opts) {
		cyclePrevClicked = true;
	});

	$('#cycle-2 .cycle-slide').click(function(){
	    //
	    // KLUGE: Cycle's getSlideIndex() is broken when allow-wrap is on.
	    // Furthermore, Cycle apparently adds an extra <li> element to the <ul>.
	    // We we need to subtract 1 from $('#cycle-1 li').size() to get the actual number of slides.
	    //
	    //alert('size = ' + $('#cycle-1 li').size());
	    var index = $('#cycle-2').data('cycle.API').getSlideIndex(this) % ($('#cycle-1 li').size() - 1);
	    clickedSetIndex = true;
	    $('#cycle-1, #cycle-2').cycle('goto', index);
	});

	$('.banner-thumb').on('click', function(e){
		e.preventDefault();
	});

	/*$('.slides').cycle({
	    fx: 'fade',
	    speed: 150,
	    timeout: 7000,
	    pause: 1,
	    cleartype: true,
	    cleartypeNoBg: true,
	    pager: '.slide-thumbs',
	    //prev: '.prev-link',
	    //next: '.next-link',
	    pagerAnchorBuilder: function(idx, slide) {
	        return '.slide-thumbs li:eq(' + (idx) + ') a';
	    },
	    onPrevNextEvent: function(dir, id, el) {
	        if (dir === true) {
			if (id >= 3) { //replace '3' with your number of visible elements
				$('.next-link').click();
			}
	        }
	        else {
			if (id >= 1) {
				$('.prev-link').click();
			}
	        }
	    }
    });

    $(".slide-thumbs").jCarouselLite({
  		btnNext: ".next-link",
    	btnPrev: ".prev-link",
    	circular: false,
    	visible: 3
	});*/



	//Universal layout fixes
	jQuery('.primary-nav ul li:last-child, .promotions ul li:last-child, .pod:last-child, .small.box:odd, .secondary-nav li:last-child, .select-card ul li:last, .category-filter li:last').addClass('last-item');
	jQuery('.card-options > div:last').css({'margin-right': '0'});

	//Big Carousel

	jQuery(".scroller").simplyScroll({
    	auto: false,
		speed: 8
	});
	jQuery(".simply-scroll").hover(
		function(){
			jQuery(this).find('.simply-scroll-btn').fadeIn('fast')
		},
		function() {
			jQuery(this).find('.simply-scroll-btn').fadeOut('fast')
		}
	);

	//Small Carousels
	jQuery('.carousel.small').each(function(){
		var total = jQuery(this).find('.overview').children().length;
		var counter = jQuery(this).find('.counter')
		var total = total/4;
		var total = Math.round(total)+1;
		jQuery(this).tinycarousel({
			pager: true,
			duration: 200,
			display: 3,
			pager: true,
			callback: function(i){
	            var currentSlideNo = $(i).index()+1;
	            counter.text(currentSlideNo + ' of '+ total);
	        }
		});
	});

	jQuery('.carousel.medium').each(function(){
		var total = jQuery(this).find('.overview').children().length;
		var counter = jQuery(this).find('.counter')
		var total = total/6;
		var total = Math.round(total)+3;
		jQuery(this).tinycarousel({
			pager: true,
			duration: 200,
			display: 3,
			pager: true,
			callback: function(i){
	            var currentSlideNo = $(i).index()+1;
	            counter.text(currentSlideNo + ' of '+ total);
	        }
		});
	});

	/*jQuery('.carousel.large').each(function(){
		var total = jQuery(this).find('.overview').children().length;
		var counter = jQuery(this).find('.counter')
		var total = total/8;
		var total = Math.round(total);
		jQuery(this).tinycarousel({
			pager: true,
			duration: 200,
			display: 7,
			pager: true,
			callback: function(i){
	            var currentSlideNo = $(i).index()+1;
	            counter.text(currentSlideNo + ' of '+ total);
	        }
		});
	});*/

	var tableheight = jQuery('.carousel.table-carousel ul li').height();

	jQuery('.table-container .viewport').css({'height': tableheight + 'px'});

	jQuery('.carousel.table-carousel').each(function(){
		var total = jQuery(this).find('li.slide').length;
		var counter = jQuery('.counter');
		jQuery(this).tinycarousel({
			pager: true,
			duration: 200,
			display: 1,
			pager: true,
			callback: function(i){
	            var currentSlideNo = $(i).index()+1;
	            counter.text(currentSlideNo + ' of '+ total);
	        }
	    });

	});

	//Placeholder Fix
	jQuery('[placeholder]').focus(function() {
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

	//Product Grid Functions
	jQuery('.carousel .disable').click(function(e){
		e.preventDefault();
	});

	jQuery('.popup-container').infopopup({popup_selector: '.pop-up'});

	if (!jQuery.browser.opera) {

        jQuery('select.select').each(function(){
            var title = $(this).attr('title');
            if( jQuery('option:selected', this).val() != ''  ) title = jQuery('option:selected',this).text();
            $(this)
                .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
                .after('<span class="select">' + title + '</span>')
                .change(function(){
                    val = $('option:selected',this).text();
                    $(this).next().text(val);
                    })
        });

    };

    //Info Popup
    jQuery('a.info-graphic').hover(function () {
		jQuery('div.info').stop(true, true).fadeIn(100);
	},
	function () {
		jQuery('div.info').stop(true, true).fadeOut(100);
	});
	//Modal
    jQuery(".modal").click(function() {
      $("#myModal").reveal();
      return false;
    });

    //Tabs
	$('ul.tab-nav').each(function(){

		var $active, $content, $links = $(this).find('a');

		//if theres the URL has hash in it, use it to find the active tab
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		//or if there's a 'tab' name/value pair in the query string, use it
		var tabIndex = window.location.search.indexOf("&tab=");
		if (tabIndex > 0)
		{
			var currentTab = window.location.search.substr((tabIndex + 5), 4);
			$active = $($links.filter('[href="#'+currentTab+'"]')[0] || $links[0]);
		}

		$active.addClass('active');
		$content = $($active.attr('href'));

		// Hide the remaining content
		$links.not($active).each(function () {
		$($(this).attr('href')).hide();
		});

		// Bind the click event handler
		$(this).on('click', 'a', function(e){
			// Make the old tab inactive.
			$active.removeClass('active');
			$content.hide();

			// Update the variables with the new link and content
			$active = $(this);
			$content = $($(this).attr('href'));

			// Make the tab active.
			$active.addClass('active');
			$content.fadeIn();

			// Prevent the anchor's default click action
			e.preventDefault();
		});
	});

    //Tabs
	$('ul.tabs-nav').each(function(){

		var $active, $content, $links = $(this).find('a');

		//if theres the URL has hash in it, use it to find the active tab
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		//or if there's a 'tab' name/value pair in the query string, use it
		var tabIndex = window.location.search.indexOf("&tab=");
		if (tabIndex > 0)
		{
			var currentTab = window.location.search.substr((tabIndex + 5), 4);
			$active = $($links.filter('[href="#'+currentTab+'"]')[0] || $links[0]);
		}

		$active.addClass('current');
		$active.parent().addClass('current');
		$content = $($active.attr('href'));

		// Hide the remaining content
		$links.not($active).each(function () {
			$($(this).attr('href')).hide();
		});

		// Bind the click event handler
		$(this).on('click', 'a', function(e){
			// Make the old tab inactive.
			$active.removeClass('current');
			$active.parent().removeClass('current');
			$content.hide();

			// Update the variables with the new link and content
			$active = $(this);
			$content = $($(this).attr('href'));

			// Make the tab active.
			$active.addClass('current');
			$active.parent().addClass('current');
			$content.fadeIn();

			// Prevent the anchor's default click action
			e.preventDefault();
		});
	});

	//Read More Function Open
	$('.more-collapse').on('click', 'button', accordion);

	function accordion() {
		var button = $(this);
		var collapseContainer = button.parent().prev();
		var collapsable = collapseContainer.children('.collapsable-content');
		var collapsableHeight = collapsable.height();
		if(button.hasClass('more')){
			collapseContainer.animate({
				'height' : collapsableHeight + 'px'
			});
			button.removeClass('more').addClass('collapse');
		} else {
			collapseContainer.animate({
				'height' : '190px'
			});
			button.removeClass('collapse').addClass('more');
		}
		return false;
	}

 });


 jQuery(function($) {
        $('input:radio').change(function(){
            var val = $('input:radio:checked').val();
            $('#GC').val(0)
            $('.one, .two, .three').hide();
            $('.' + val).show();
        });
    });

	function getParameterByName(name, url) {
		var match = RegExp('[?&]' + name + '=([^&]*)').exec(url.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}

	function getParameterByName(name, url) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(url);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	//add items to the cart using AJAX...
	function processCartAddButtonEvent(e) {
		//check to see if we're on the cart page, if so, don't hijack it.
		if (document.URL.indexOf("/s/cart/") > 0) {
			return true;
		}

		var url = this.href;
		if (url.indexOf("/s/cart/") != -1) {
			e.preventDefault();

			var flyImageId;
			if (document.URL.indexOf("/s/tees+/catalog/") != -1) {
				var catId = getParameterByName("catId", url);
				flyImageId = 'fly-image-' + catId;
			} else {
				var idPosition = url.indexOf("&id=");
				var productId = url.substring((idPosition+4),(idPosition+11));
				flyImageId = 'fly-image-' + productId;
			}
			var cartURL = url + "&ajaxRequest=true";
			ajaxAddToCart(cartURL, flyImageId, e);
		}
	}

		$(document).on('click', '.sell.button', processCartAddButtonEvent);

		$(document).on('click', '.blue.button', processCartAddButtonEvent);

		$(document).on('click', '.green.button', processCartAddButtonEvent);

		$(document).on('click', '.preorder.button', processCartAddButtonEvent);


	$(function () {
		$("#cart-dialog").dialog({
		    autoOpen: false,
		    show: {
		        effect: "blind",
		        duration: 1000
		    },
		    hide: {
		        effect: "explode",
		        duration: 1000
		    },
		    modal: true,
		    buttons: {
		        Ok: function () {
		            $(this).dialog("close");
		        }
		    },
		    open: function () {
		        $('.ui-widget-overlay').bind('click', function () {
		            $('#cart-dialog').dialog('close');
		        })
		    }
		});
	});

	function ajaxAddToCart(cartURL, flyImageId, e) {
	    $.ajax({
	        url: cartURL,
	        dataType: "json",
	        type: 'GET',
	        data: {
	            ajaxRequest: true
	        },
	        success: function (data) {
	            if (data.updateSuccessful == true) {
	                flyImageToCart(flyImageId, data.numberOfCartItems, e);
	                //remove the green-buy used button, if there's only one 1 used item in stock
	                if (($('.last-one').length == 1) &&
	                    (cartURL.indexOf('condition=used') >= -1)) {
	                    $('.last-one').hide();
	                    $('.green.button').text("No longer available used").removeClass('green button');
	                }
	            }
	            if (data.errorMessages != null) {
	                //close any open popups.
	                $('.pop-up').hide();
	                $("#cart-dialog").text(data.errorMessages).dialog("open");
	            }
	        },
	        error: function (header, textStatus, errorThrown) {
	            console.log("ajax error");
	            console.log(textStatus);
	            console.log(errorThrown);
	            $("#cart-dialog").text("We're sorry we had an issue adding that item to the cart.  Please try again later.").dialog("open");
	        }
	    });
	}

	function flyImageToCart(flyImageId, numItems, e) {
		if (flyImageId == null) {
			return;
		}

	    // Determine whether to use mobile or desktop assets
	    var windowWidth = $(window).width();

	    // Get image object
        if (windowWidth <= 479) {
        	var imgtodrag = $(".product-details-mobile").find("#" + flyImageId);
        } else {
			var imgtodrag = $(".product-image").find("#" + flyImageId);
        }

        // Get cart object
        if (windowWidth <= 767) {
        	var cart = $(".top-links-mobile #cart-total");
        } else {
        	var cart = $(".top-links-desktop #cart-total");
        }

        // Override image object for non-list pages
        if (!imgtodrag.length) {
        	var imgtodrag = $("#" + flyImageId);
        }

	    if (imgtodrag) {
	    	var leftOffest = imgtodrag.offset().left;
	    	if (leftOffest < 0) {
	    		//since we have a neg left offset, use the mouse click as the starting location instead
	    		//if 'blue' button subtract 150px to the left, if 'green' subtract 250px to the left
	    		//this should only happen on the FYE home page, within the Just For You carousel.
	    		if (e.target.className.indexOf("green") >= 0) {
	    			leftOffest = e.clientX - 250;
	    		} else {
	    			leftOffest = e.clientX - 150;
	    		}
	    	}
	    	var imgclone = imgtodrag.clone()
	        	.offset({
	            	top: imgtodrag.offset().top,
	            	left: leftOffest
	            })
	       		.css({
	       			'opacity': '1',
	        		'position': 'absolute',
	                'height': imgtodrag.outerHeight(true),
	                'width': imgtodrag.outerWidth(true),
	                'z-index': '500'
	            })
	            .appendTo($('body'))
	            .animate({
	            	'top': cart.offset().top + 10,
	                'left': cart.offset().left + 10,
	                'width': 75,
	                'height': 75
	            }, 1050, 'easeInOutExpo');

	            imgclone.animate({
	                'width': 0,
	                'height': 0
	            }, function () {
	                $(this).detach();
					if (numItems == 1) {
						$(".top-links-mobile #cart-total").text("Item " + numItems);
						$(".top-links-desktop #cart-total").text("Item " + numItems);
					} else {
						$(".top-links-mobile #cart-total").text("Items " + numItems);
						$(".top-links-desktop #cart-total").text("Items " + numItems);
					}

	    			// Determine which cart object to use, mobile or desktop
	    			var windowWidth = $(window).width();
			        if (windowWidth <= 767) {
			        	var cartRef = $(".top-links-mobile #cart");
			        	var cartMsg = $(".top-links-mobile #cart-msg");
			        } else {
			        	var cartRef = $(".top-links-desktop .cart");
			        	var cartMsg = $(".top-links-desktop #cart-msg");
			        }

	            	var pos = cartRef.position();
	            	var width = cartRef.outerWidth(true);
	            	var height = cartRef.outerHeight(true);
				    $(cartMsg).css({
				        position: "absolute",
				        top: pos.top + "px",
				        left: (pos.left) + "px",
				        height: height,
						width: width
				    }).show().delay(2000).hide(1000);
	            });
	        }
	    }
