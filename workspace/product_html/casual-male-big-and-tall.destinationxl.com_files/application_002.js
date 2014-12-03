/*
--------------------------------------------------

Casual Male DXL

Site-Wide Scripts [application.js]

Dacia James [dacia.james@acquitygroup.com]
9/13/2010

Copyright (c) 2008-2010 Acquity Group LLC

--------------------------------------------------
*/

// Textarea Character Count
/**
 *
 * Copyright (c) 2007 Tom Deater (http://www.tomdeater.com)
 * Project site http://www.tomdeater.com/jquery/character_counter/
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * Copyright (c) 2009 Todd Horst (http://www.managingmeals.com)
 * Project site  http://managingmeals.com/blog/?p=138
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($) {
	/**
	 * attaches a character counter to each textarea element in the jQuery object
	 * usage: $("#myTextArea").charCounter(max, settings);
	 */

	$.fn.charCounter = function (max, settings) {
		max = max || 100;
		settings = $.extend({
			container: "<span></span>",
			classname: "charcounter",
			format: "(%1 characters remaining)",
			pulse: true,
			delay: 0
		}, settings);
		var p, timeout;
		var isCtrl = false;

		function count(el, container) {
			el = $(el);
			if (el.val().length > max) {
			    el.val(el.val().substring(0, max));
			    if (settings.pulse && !p) {
			    	pulse(container, true);
			    };
			};
			if (settings.delay > 0) {
				if (timeout) {
					window.clearTimeout(timeout);
				}
				timeout = window.setTimeout(function () {
					container.html(settings.format.replace(/%1/, (max - el.val().length)));
				}, settings.delay);
			} else {
				container.html(settings.format.replace(/%1/, (max - el.val().length)));
			}
		};

		function pulse(el, again) {
			if (p) {
				window.clearTimeout(p);
				p = null;
			};
			el.animate({ opacity: 0.1 }, 100, function () {
				$(this).animate({ opacity: 1.0 }, 100);
			});
			if (again) {
				p = window.setTimeout(function () { pulse(el) }, 200);
			};
		};

		function remCTRL(e) {
			if(e.which == 17) isCtrl=false;
		}

		function keyBLOCK(e,el) {
			el = $(el);
			if (el.val().length >= max) {
				if(e.which == 17) {
					isCtrl=true;
					return true;
				} else if(e.which == 65 && isCtrl == true) {
					return true;//allow ctrl+a (select all)
				} else if(e.which == 88 && isCtrl == true) {
					return true;//allow ctrl+x (cut)
				} else if(e.which == 67 && isCtrl == true) {
					return true;//allow ctrl+c (copy)
				} else if(e.which == 90 && isCtrl == true) {
					return true;//allow ctrl+z (undo)
				} else if(e.which == 8 || e.which == 46 || e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
					return true;//up, down, left, right, delete, backspace
				} else {
					return false;//Block any other characters
				}
			} else {
				return true;
			}
		}

		return this.each(function () {
			var container = (!settings.container.match(/^<.+>$/))
				? $(settings.container)
				: $(settings.container)
					.insertAfter(this)
					.addClass(settings.classname);
			$(this)
				.bind("keydown", function (e) { return keyBLOCK(e,this); })
				.bind("keyup", function (e) { remCTRL(e); })
				.bind("focus", function () { count(this, container); })
				.bind("mouseover", function () { count(this, container); })
				.bind("mouseout", function () { count(this, container); })
				.bind("paste", function () {
					var me = this;
					setTimeout(function () { count(me, container); }, 10);
				});
			if (this.addEventListener) {
				this.addEventListener("input", function () { count(this, container); }, false);
			};
			count(this, container);
		});
	};


})(jQuery);


$(document).ready(function() {

	// Gives each field a title tag with the text from the label
	// Custom titles set for month/year fields
	$('.inline-prompt').each(function() {
		$(this).attr("title", $("label[for='" + $(this).attr('id') + "']").html());
	}).focus(function() {
		if ($(this).val() == $(this).attr("title"))
			$(this).val("").removeClass("inline-prompt");
	}).blur(function() {
		if ($(this).val() == "")
			$(this).val($(this).attr("title")).addClass("inline-prompt");
	});
	
	$('body').click(function(event) {
		var target = event.target || event.srcElement;
	    if (!$(event.target).closest('#miniCart').length && 
	    		(target.id != "dontHideMiniCart" && target.parentNode.id != "dontHideMiniCart")
	    		&& event.target.className.indexOf("StrInv") == -1) {
	    	//don't slide up when replicating PDP click on store inventory modal
	        $('#miniCart').slideUp("slow");
	    };
	});
	
	// Mini Cart Trigger
	$('#dontHideMiniCart').live('click',function() {	
		$('#miniCart').slideDown('slow');
	});
	// Mini Cart Close Button
	$('#closeMiniCart a, #miniCart #persistentCart a.items').live('click',function() {
		$('#miniCart').slideUp('slow');
	});




//  IE6
	if ((/msie 6./i).test(navigator.appVersion) == true) {
		$("div.hr.background").pngFix();
		$("select").bgiframe();

		$("#topNav .nav li a img").each(function() {
			var topNavImageWidth = $(this).width();
			$(this).parent("a").css("width", topNavImageWidth);
		});

	}

// General jQuery
	$("#userNav ul.nav li.shopBy a:first").css("margin-right", "2px");

// Navigation Functionality
	$("#topNav .nav > li").mouseenter(function() {
		$(this).addClass("navHover");
	});
	
	$('#topNav .nav > li > ul > li > a').mouseenter(function() {
		
		// reset
		$('#topNav .nav > li > ul').css({ 'height': 'auto' });
		$('#topNav .nav > li ul li ol').removeClass('show');		// hide all submenus
		$('#topNav .nav > li ul li').removeClass('grey-arrow');		// remove all grey arrows
		
		if ( $(this).next().hasClass('submenu') ) {
			$(this).parent().addClass('grey-arrow');
			
			var mainMenu = $(this).parent().parent();
			var subMenu = $(this).next();
			
			var mainMenuHeight = mainMenu.height();
			mainMenu.css({ 'height': mainMenuHeight + 'px' });
			mainMenu.addClass('show-submenu');
			
			subMenu.addClass('show');
			
			// if the submenu exceeds the main menu height,
			// increase the height of the main menu
				
			var totalMainMenu = mainMenu.offset().top + 7 + mainMenu.height();
			var totalSubMenu = subMenu.offset().top + subMenu.height();
			
			if ( totalSubMenu > totalMainMenu ) {
				var newHeight = totalSubMenu - mainMenu.offset().top;
				mainMenu.css({ 'height': newHeight + 'px' });
			}
			
			// if the menus go over the edge,
			// move submenu to the left
			if ( mainMenu.offset().left + mainMenu.width() > $(window).width() )
				mainMenu.addClass('move-submenu-left');
			
		} else {
			// because there's no submenu, shrink the menu
			// make the height adjust to content
			$('#topNav .nav > li ul').removeClass('show-submenu move-submenu-left');
		}
	});

	$("#topNav .nav > li").mouseleave(function() {
		$(this).removeClass("navHover");
		
		// hide all submenus that are shown
		$('#topNav .nav > li ul').removeClass('show-submenu move-submenu-left');
		$('#topNav .nav > li ul li').removeClass('grey-arrow');
		$('#topNav .nav > li ul li ol').removeClass('show');
		$('#topNav .nav > li > ul').css({ 'height': 'auto' });
	});

	$("#topNav .nav li > ul").mouseleave(function() {
		$(this).removeClass("navHover");
	});
	
	
	
	
	
	
	
	
    $(".paidInStore").change(function() {
        if (this.checked) {
        	$("#creditCardSubmitSection").css('display','none');
        }else{
        	$("#creditCardSubmitSection").css('display','block');
        }
    });
	

    $("#infiniteScroll a.prodLink,#infiniteScroll a.name").live('click', function(){
	   var newURL = updateURLParameter($(this).attr('href'),"scrollTop",$(window).scrollTop());
       newURL = updateURLParameter(newURL, "pg",parseInt($("input[name='qfh_p']").val()) - 1);
	   $(this).attr('href',newURL);
    });
    
    $("#pqvlongdescription a").live('click', function(){
       if($("input[name='qfh_p']",window.parent.document).length > 0){
		   var newURL = updateURLParameter($(this).attr('href'),"scrollTop",$(window.parent).scrollTop());
	       newURL = updateURLParameter(newURL, "pg",parseInt($("input[name='qfh_p']",window.parent.document).val()) - 1);
		   $(this).attr('href',newURL);
       }
    });

	$(".account.contentBlock #secondaryContent ul li").live("click", function() {
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$(this).addClass("selected");
			$(this).siblings().not(this).removeClass("selected");
		}
	});

	$(".account.contentBlock #secondaryContent ul li").click(function() {
		$(this).addClass("navHover");
		$("ul", this).fadeIn("fast");
	}, function() {
		$(this).removeClass("navHover");
	});

// Show/Hide
	// View More Brands
	$("a.viewLess").hide();
    $("a.viewAll").click(function() {
        $("a.viewLess").show();
        $("a.viewAll").hide();
        $("#filterBrand").addClass("toggleContent");
    });
    $("a.viewLess").click(function() {
        $("a.viewLess").hide();
        $("a.viewAll").show();
        $("#filterBrand").removeClass("toggleContent");
    });

	 // Quick View Hover
	$("div.item a").mouseenter(function(event) {
		$(this).next("a.quickViewHover").removeClass("hidden");
	 });

	 $("div.item a").mouseleave(function(event) {
		$(this).next("a.quickViewHover").addClass("hidden");
	 });

	 $("a.quickViewHover").hover(function(event) {
		$(this).removeClass("hidden");
	 });


		// Show 2 more fields on the billing.jsp page for gift cards


		$(".billingGiftCardShowMoreLink").click(function() {
			var counter = 0;
			var afterCounter = 0;
			$(this).siblings("p").each (function(){
				if($(this).hasClass('toggleContent')) {
					if (counter < 2) {
						$(this).toggleClass("toggleContent");
						counter++;
					}
				}

				if($(this).hasClass('toggleContent')) {
					afterCounter++;
				}

			});

			if (afterCounter == 0) { // we are at the end
				$(this).addClass('toggleContent');
			}
			return false;
		});



	// Toggle Content
	$(".giftMessage a").click(function() {
		$(this).siblings("div").toggleClass("toggleContent");
	});

	$(".giftMessage .typeCheck input").change(function() {
		if(!$(".giftMessage .typeCheck input").checked){
			var index = this.value;
			$("#shippingMethod".concat(index)).val('');
			$(".shippingMethod").keyup();
		}
		$(this).parent(".typeCheck").siblings("div").toggleClass("toggleContent");
	});


	// Gift Message length limit
	$(".shippingMethod").keyup(function() {
		var count = $(this).val().length;
		//math!
		count = 33-count;
		if (count >= 0) {
			$(this).siblings("span").html('<strong>' + count + ' characters remaining</strong>');
		} else {
			$(this).siblings("span").html('<strong style="color:red">' + count + ' characters remaining</strong>');
		}
	});

	$(".tabContent fieldset dd a.edit").click(function(event) {
		$(this).parent("dd").parent("dl").siblings("div").toggleClass("toggleContent");
	});

	$(".quickView p.sizeChart a, #shopBySizes p.sizeChart a").click(function(event) {
		$(".quickView").hide();
		$(".showSizeChart").show();
	});


	$(".showSizeChart .sizeChart .back").click(function(event) {
		$(".quickView").show();
		$(".showSizeChart").hide();
	});

	$("a.shopByOn").click(function(event) {
		if ($(this).hasClass("active")) {
			$("#userNav ul.nav li.shopBy a.shopByOn, #sideNav #shopBySize p a.shopByOn").removeClass("active");
			$("#userNav ul.nav li.shopBy a.shopByOff, #sideNav #shopBySize p a.shopByOff").addClass("active");
		} else {
			$("#userNav ul.nav li.shopBy a.shopByOn, #sideNav #shopBySize p a.shopByOn").addClass("active");
			$("#userNav ul.nav li.shopBy a.shopByOff, #sideNav #shopBySize p a.shopByOff").removeClass("active");
		}
		$(".shopBySizeOff").toggle();
		$(".shopBySizeOn").toggle();
	});

	$("a.shopByOff").click(function(event) {
		if ($(this).hasClass("active")) {
			$("#userNav ul.nav li.shopBy a.shopByOn, #sideNav #shopBySize p a.shopByOn").addClass("active");
			$("#userNav ul.nav li.shopBy a.shopByOff, #sideNav #shopBySize p a.shopByOff").removeClass("active");
		} else {
			$("#userNav ul.nav li.shopBy a.shopByOn, #sideNav #shopBySize p a.shopByOn").removeClass("active");
			$("#userNav ul.nav li.shopBy a.shopByOff, #sideNav #shopBySize p a.shopByOff").addClass("active");
		}
		$(".shopBySizeOff").toggle();
		$(".shopBySizeOn").toggle();
	});



		//Add to wishlist quantity.
	$("input.addWishlist").click(function() {
		var quantity = $(".cartQuantity").val();
		$(".wishListQuantity").val(quantity);
		$("#wishlistSkuAttributes").val($("#skuAttributes").val());

	});



	//forgot password
	$("a.forgotPassword").click(function(event) {
		$("#resetPasswordSuccess").css("display","none");
		$(".forgotEmailAddress").val("");
		$("#resetPassword").toggle('slow', function() {
    		// Animation complete.
  		});

	});

	$("#createNewAccount-loyaltyProgramOptIn").click(function(event) {
		$("#loyalityPrefs").toggle('slow', function() {
			// animation complete.
		});
	});


	// confirm remove address
	$(".deleteAddress").click(function() {
		var answer = confirm('Are you sure you wish to delete this address?');
		return answer;
	});

	// confirm remove credit card 
	$(".deleteCreditCard").click(function() {
		var answer = confirm('Are you sure you wish to delete this credit card?');
		return answer;
	});

	//confirm remove wishlist item
	$(".removeGiftItem").click(function() {
		var answer = confirm('Are you sure you wish to remove this item?');
		return answer;
	});

	//confirm remove wishlist
	$(".removeGiftList").click(function() {
		var answer = confirm('Are you sure you wish to delete your wish list?');
		return answer;
	});

	$("#forwardToFriend").click(function() {
		$('#emailFriend').toggle('slow',function() {
			// animation complete.
		})
	});

	// wishlist choose address link
	$("#wishListChooseShippingAddressLink").click(function() {
		$('#wishListChooseShippingAddressSubmit').click();
	})

    $("label.errorState input").each(function() {
		$("<em>Please fix this error to continue.</em>").insertBefore(this);
	});
    $("label.errorState select").each(function() {
		$("<em>Please fix this error to continue.</em>").insertBefore(this);
	});

	//wishlist slide
	$("#savedAddressBlock").hide();
	$("#wishListToggle").click(function() {
		$('#savedAddressBlock').toggle('fast',function() {
			// animation complete.
		})
	})

// Textarea Chacter Count
	$(".comment").charCounter(80, {
		container: "<span></span>",
		format: "<strong>%1</strong> Characters Remaining"
	});

// Tabs
	$(".tabContent").hide(); //Hide all content
	$(".tabbedContent .nav li:first").addClass("active").show(); //Activate first tab
	$(".tabContent:first, .sizeChart .tabContent:first").show(); //Show first tab content

	//On Click Event
	$(".tabbedContent .nav li").click(function() {
		$(".tabbedContent .nav li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tabContent").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});

//	function findSelectedMin() {
//		if ($('#currentMinPrice').val()) {
//			return parseInt($('#currentMinPrice').val());
//		} else {
//			var foundMinPrice = findMinPrice();
//			return foundMinPrice
//		}
//		
//	}
	
//	function calculateOffset(selected, absMin, absMax){
//		return (selected-absMin)/(absMax-absMin)*100*(167/180);
//	}
	
	function findSelectedMin() {
		var currentMinPrice, startingMinPrice, startingMaxPrice, minLeftPosition;
		if ($('#currentMinPrice').val()) {
//			currentMinPrice = parseInt( $('#currentMinPrice').val());
//			startingMinPrice = parseInt($('#startingMinPrice').val());
//			startingMaxPrice = parseInt($('#startingMaxPrice').val());			
//			minLeftPosition = calculateOffset(currentMinPrice, startingMinPrice, startingMaxPrice);
			//$('#minPrice').css({left: minLeftPosition + '%'});
			
			return parseInt($('#currentMinPrice').val());
		} else {
			var foundMinPrice = findMinPrice();
			return foundMinPrice
		}
		
	}
	function findSelectedMax() {
		var currentMaxPrice, startingMinPrice, startingMaxPrice, maxLeftPosition;
		if ($('#currentMaxPrice').val()) {
//			currentMaxPrice = parseInt( $('#currentMaxPrice').val());
//			startingMinPrice = parseInt($('#startingMinPrice').val());
//			startingMaxPrice = parseInt($('#startingMaxPrice').val());			
//			maxLeftPosition = calculateOffset(currentMaxPrice, startingMinPrice, startingMaxPrice);
			//$('#maxPrice').css({left: maxLeftPosition + '%'});
			
			return parseInt($('#currentMaxPrice').val());
		} else {
			var foundMaxPrice = findMaxPrice();
			return foundMaxPrice;
		}
		
	}
	function findMinPrice() {
		//if(!$("#masterMinMax").val()) {
			return parseInt($("#startingMinPrice").val());
		//} else {
			//masterMinMax should have a - delimiter
		//	var minMax = $("#masterMinMax").val();
		//	var splitResult = minMax.split("-");
		//	return parseInt(splitResult[0]);
		//}
	}

	function findMaxPrice() {
		//if(!$("#masterMinMax").val()) {
			return parseInt($("#startingMaxPrice").val());
		//} else {
			//masterMinMax should have a - delimiter
		//	var minMax = $("#masterMinMax").val();
		//	var splitResult = minMax.split("-");
		//	return parseInt(splitResult[1]);
		//}
	}



// Slider
	var currencyCode = "$";
	if($('#currencyCode').val() && $('#currencyCode').val() != "USD") {
		currencyCode = $('#currencyCode').val() + " ";
	}
	$("#slider-range").slider({
		range: true,
		min: findMinPrice(),
		max: findMaxPrice(),
		values: [findSelectedMin(), findSelectedMax()],
		step: 10,
		slide: function(event, ui) {
			$("#minPrice").html(currencyCode + ui.values[0]);
			$("#maxPrice").html(currencyCode + ui.values[1]);
        },
        change: function(event, ui) {
        		
        	var minPrice = $("#minPrice").html().replace(currencyCode, "");
        	var maxPrice = $("#maxPrice").html().replace(currencyCode, "");
        	
        	var priceFilterString = minPrice + "-" + maxPrice
        	$('#priceFilterInput').val(priceFilterString);
        	
        	$("div.facetLinkClicked").click();
        	var targetURL = $('#currentURL').val() + "&pr=" + priceFilterString
        	window.location=targetURL
        }
	});
	
	
	
	/*
		console.log("startingMinPrice: " + $("#startingMinPrice").val() + " startingMaxPrice: " +  $("#startingMaxPrice").val());
		console.log("sliderMin: " + $("#slider-range").slider( "option", "min" ));
		console.log("sliderMax: " + $("#slider-range").slider( "option", "max" ));
		console.log("sliderValue0: " + $("#slider-range").slider("values", 0));
		console.log("sliderValue1: " + $("#slider-range").slider("values", 1));

	alert( $("#slider-range").slider("values", 0));
	alert( $("#slider-range").slider("values", 1));
	*/

	//alert( $("#slider-range").slider("values", 0));
	//alert( $("#slider-range").slider("values", 1));
	$("#minPrice").html(currencyCode + $("#slider-range").slider("values", 0));
    $("#maxPrice").html(currencyCode + $("#slider-range").slider("values", 1));

    // SBS
    $("#perferredsizeform").submit(function() {
    	updateSelectedSizes();

    });

	$(".sbsSize").click(function () {

	// Changing the logic around

	/*
	if ($(this).hasClass("selected")) {
		$(this).removeClass("selected");
	} else {
		$(this).addClass("selected");
	}
	*/

		/*

		var fieldId = $(this).attr('id');
		var currentSizes=$("#selectedSizes").val();

		if (currentSizes && currentSizes.indexOf(fieldId)>0){
			// this is to deselect a selected perference
			// remove it from the selected size list and change the css class
			var start=currentSizes.indexOf(fieldId);
			var end=start+(fieldId).length;
			currentSizes=currentSizes.substr(0,start)+currentSizes.substr(end,currentSizes.length);
			$("#selectedSizes").val(currentSizes);
			$(this).removeClass("selected");

			//update the removedSizes input
			var removedSize=$('#removedSizes').val()+(','+fieldId);
			$("#removedSizes").val(removedSize);
		}else{

			var currentSizes = $('#selectedSizes').val() + ','+ fieldId;
			$("#selectedSizes").val(currentSizes);


			$(this).addClass("selected");


			//if this currently exists in the remove sizes remove it as we just selected it.
			var removedSizes=$("#removedSizes").val();
			if (removedSizes && removedSizes.indexOf(fieldId)>0) {
				var start=removedSizes.indexOf(fieldId);
				var end=start+(fieldId).length;
				removedSizes=removedSizes.substr(0,start)+removedSizes.substr(end,removedSizes.length);
				$("#removedSizes").val(removedSizes);

			}


		}
		*/

		$("#tabFourContent").show(); // Ticket 824 - Not sure exactly why the visibility is getting changed.
									// this is a quick fix for now, but causes the content to disappear/appear
									// in the long term the core problem should be identified. 4/27/2011
		$("#tabFourTab").attr('class','active');
	});



	//checkboxes
	$(".searchCheckbox").click(function() {
		var facetTrailString = $(this).val();
		var splitString = facetTrailString.split(':');

		var facetId;
		var facetVal;
		var srchString;
		if(splitString[0] == "SRCH") {

			srchString = splitString[0] + ":" + splitString[1];
			facetId = splitString[2];
			facetVal = splitString[3];
		} else {
			facetId = splitString[0];
			facetVal = splitString[1];
		}

		//alert(facetId);


		//pick the correct inputs
		var temp = $("#tempvalues").val();
		if(temp != "") {
			temp = temp + "|" + facetVal;
		} else {
			temp = facetVal;
		}


		$("#tempvalues").val(temp);

		temp = facetId + ":" + temp;

		if(srchString != null) {

			temp = srchString + ":" + temp;

		}

		$("."+facetId).val(temp);
	});

	//TODO: tfanning need to pass trailString param on form submit.
	$("#Brand").submit(function() {
		$("#Brand .question").val($("#Brand .trail").val());

	});

	/* copy the values from the state selector to the state input.
		do this because name field gets nuked by ATG if explicitly declared
	*/
	$("#stateSelector").change(function() {
		var state = $("#stateSelector option:selected").val();
		$("#stateValue").val(state);
	});

	$("#savedAddressSelector").change(function() {
		var addressId = $("#savedAddressSelector option:selected").val();
				$.post('/mens-big-and-tall-store/checkout/fragments/lookupAddress.jsp',
				{addressId: addressId},
		 		function(data) {
		 			$("#selectedAddress").html(data);
				});
		});

	$("#addAddressLink").click(function() {
		$("#addAdditionalAddress").toggle('slow', function() {
			// animation complete.
		});
	});
	
	// Clear Default Input Values
	(function($){
		$.fn.clearDefault = function(){
			return this.each(function(){
				var default_value = $(this).val();
				$(this).focus(function(){
					if ($(this).val() == default_value) $(this).val("");
				});
				$(this).blur(function(){
					if ($(this).val() == "") $(this).val(default_value);
				});
			});
		};
	})(jQuery);
	
	// Clear default values for selected fields
	// (quick search, email offer sign up, store locator)
	$('#quickSearch-query, .signUp input, #location input, #giftlistTable input.quantity, #enteredPrice, #fb_local_store #store_city, #fb_local_store #store_zipcode').clearDefault();

	//empty out the sku attribute hidden input since something seems to be reserving its value
	$("input#skuAttributes").val("");

	/* FROM CASUAL MALE 3/25/2011 */
	/*
	// Brand Header Tabs Hover Tooltip
		 var bLis = $('#brands ul li');
		 var bTip = ["","Rochester B&amp;T","Casual Male XL","BT Direct","Shoes XL","Living XL"];
		 $.each($('#brands ul li a'),function(i,v){
		// Removing target blank
			if (i>0) {
				$(v).attr('target','_blank');
			};
		// Removing the tooltip that says you will be leaving this site
			var tId = $(bLis[i]).attr('id')+'-tip';
			if ($('#'+tId).length==0) {
				if (bTip[i]!=null && bTip[i]!="") {
					$('body').append('<div class="brandsTip" id="'+tId+'" style="position:absolute;">By clicking '+bTip[i]+'<br>you will be leaving<br>DestinationXL.com</div>');
					var offset = $(bLis[i]).offset();
					$('#'+tId).css({'top':(offset.top+42),'left':offset.left});
					$('#'+tId).hide();
				}
			};
			$(v).hover(
			  function (e) {
				if (e.target) {
					var tId = $(e.target).parent().attr('id')+'-tip';
					$('#'+tId).fadeIn('fast');
				}
			  },
			  function (e) {
				if (e.target) {
					var tId = $(e.target).parent().attr('id')+'-tip';
					$('#'+tId).fadeOut('fast');
				}
			  }
			);
			$(v).click(
			  function (e) {
				if (e.target) {
					var tId = $(e.target).parent().attr('id')+'-tip';
					$('#'+tId).fadeOut('fast');
				}
			  }
			);
		});
	*/
	/* /end FROM CASUAL MALE 3/25/2011 */
	

	alignSliderLabels();
	
	$(function() {
		if(!(/iPhone|iPod|iPad|Android|BlackBerry|webOS|Windows Phone/).test(navigator.userAgent)) {
			if($('#brands-wrap').length && $('.sideNavFilter').length){
				var sticky_go_to_top_link = $('.sideNavFilter').offset().top + $('.sideNavFilter').height() - 100;
			    var sticky_go_to_top = function(){
			        var scroll_top = $(window).scrollTop(); // our current vertical position from the top
			        
			        // sticky for go to top link when on product listing page
			        if (scroll_top + ($(window).height()/2) + 60 >= $('#footer').offset().top) {
			        	$('#infiniteScrollGoToTop').removeClass('sticky-go-to-top');
			        } else if (scroll_top > sticky_go_to_top_link && $("#TB_overlay").length == 0 
			        		&& !($("#rn_Dialog_0_c").is(':visible')) && !($("#fancybox-overlay").is(':visible'))) {
			        	$('#infiniteScrollGoToTop').addClass('sticky-go-to-top');
			        } else {
			        	$('#infiniteScrollGoToTop').removeClass('sticky-go-to-top');
			        }
			    };
			     
			    // run our function on load
			    sticky_go_to_top();
			    // and run it again every time you scroll
			    $(window).scroll(function() {
			    	sticky_go_to_top();
			    });
			}
		}
	});
});


function  updateSelectedSizes() {
	var selectedSizesString = "";
	$("li.selected").each(function() {
		var fieldId = $(this).attr('id');
		selectedSizesString += (fieldId + ",");
	});

	$("#selectedSizes").val(selectedSizesString);
}

function populateStoredCreditCard(ccValue, creditCardType, month, year) {
	  var creditCardName = creditCardType;
	  if(creditCardName == "JCB"){
		creditCardName = creditCardName.toLowerCase();
	  }
	  creditCardName = creditCardName.charAt(0).toLowerCase() + creditCardName.slice(1);
	  $("#creditCardNumber").val(ccValue);
	  $("#"+creditCardName+"Radio").attr("checked","checked");
	  $("#creditCardNumber").attr("disabled","disabled");
		$(".cardTypes :radio").each(function(){
			$(this).attr("disabled","disabled");
		})
	  $("#month").val(month);
	  $("#year").val(year);
}

function populateSessionCreditCard(ccValue,creditCardType, month, year){
	var creditCardValue = ccValue;
	if(creditCardValue.length > 0){
	  var creditCardName = creditCardType;
	  if(creditCardName == "JCB"){
		creditCardName = creditCardName.toLowerCase();
	  }
	  creditCardName = creditCardName.charAt(0).toLowerCase() + creditCardName.slice(1);
	  $("#creditCardNumber").val(ccValue);
	  $("#"+creditCardName+"Radio").attr("checked","checked");
	  $("#month").val(month);
	  $("#year").val(year);
}
}

function miniCartItemAdded(){
	$('#miniCart').slideDown('slow');
	var timer = setTimeout(function () {
			$('#miniCart').slideUp("slow");
		}, 5000); 
	// Click on Mini Cart to prevent closing it
	$('#miniCart').click(function() {
			clearTimeout(timer);
	});	
	// Mini Cart Trigger
	$('#dontHideMiniCart').click(function() {				
			$('#miniCart').slideDown('slow');
	});
	// Mini Cart Close Button
	$('#closeMiniCart a, #miniCart #persistentCart a.items').click(function() {
				$('#miniCart').slideUp('slow');
	});
}


function alignSliderLabels() {
	if(!$('#slider-range').length) return;
	//$('#minPrice').css({left: $('#slider-range a:first').position().left + 'px' });
	//$('#maxPrice').css({left: ($('#slider-range a:last').position().left +  $('#slider-range a:last').width()) + 'px'});
	if( parseInt($('#slider-range a:first')[0].style.left) > 0){
		$('#minPrice').css({left: ($('#slider-range a:first').position().left + $('#slider-range a:first').width() - $('#minPrice').width()) + 'px' });		
	}
	if(parseInt($('#slider-range a:last')[0].style.left) < 100){
		$('#maxPrice').css({marginLeft: 0, left: $('#slider-range a:last').position().left + 'px', right: 'auto'});
	}
	
}

$(function() {
	//make sure user is not on a mobile device
	if(!(/iPhone|iPod|iPad|Android|BlackBerry|webOS|Windows Phone/).test(navigator.userAgent)) {
	    // grab the initial top offset of the navigation
		if($('#brands-wrap').length){
		    var sticky_navigation_offset_top = $('#brands-wrap').offset().top;
		     
		    // our function that decides whether the navigation bar should have "fixed" css position or not.
		    var sticky_navigation = function(){
		        var scroll_top = $(window).scrollTop(); // our current vertical position from the top
		         
		        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
		        // otherwise change it back to relative
		        if (scroll_top > sticky_navigation_offset_top && $("#TB_overlay").length == 0 
		        		&& !($("#fancybox-overlay").is(':visible')) && !($(".ui-dialog").is(':visible')) && !($("#tinycontent #modal").is(':visible'))) {
		            $('#brands-wrap').addClass('sticky-wrap');
		            $('#brands').addClass('sticky');
		            $('#miniCart').addClass('sticky-cart');
		            $('#header-block').addClass('sticky-block');
		            $('#headerContent').addClass('sticky-content-background');
		            $('#contextChooserLinkWrapper').removeClass('contextChooserLinkTopMargin');
		        } else {
		            $('#brands-wrap').removeClass('sticky-wrap');
					$('#brands').removeClass('sticky');
					$('#miniCart').removeClass('sticky-cart');
					$('#header-block').removeClass('sticky-block');
					$('#headerContent').removeClass('sticky-content-background');
					$('#contextChooserLinkWrapper').addClass('contextChooserLinkTopMargin');
		        }
		    };
		     
		    // run our function on load
		    sticky_navigation();
		    
		 // and run it again every time you scroll
		    $(window).scroll(function() {
		         sticky_navigation();
		    });
		}
	}
});

function applyScripts(){
//	$('.productResultLayout').find('a.selected').click();
	
	$("div.item a").mouseenter(function(event) {
		$(this).next("a.quickViewHover").removeClass("hidden");
	 });

	 $("div.item a").mouseleave(function(event) {
		$(this).next("a.quickViewHover").addClass("hidden");
	 });

	 $("a.quickViewHover").hover(function(event) {
		$(this).removeClass("hidden");
	 });
	 
	 tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
	 
	 addZoomOnMouseOver();
}

function addZoomOnMouseOver(){
	$(".mouseHoverProductImage").mouseenter(function() {     
		swapImageOnHover($(this).find(".product").attr('id'));
    });
    $(".mouseHoverProductImage").mouseleave(function() { 
    	revertImage($(this).find(".product").attr('id'));
    }); 
}

$(function() {
    var chatLadyScroll = function(){
        $('#chatLadyDiv').css('top', $(window).scrollTop() + 302);
    };
     
    chatLadyScroll();
    
    $(window).scroll(function() {
    	chatLadyScroll();
    });
});