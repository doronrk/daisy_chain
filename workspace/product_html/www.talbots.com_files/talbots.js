// TALBOTS.JS - GLOBAL JS INCLUDE
// Written and Compiled by Eric Webster (ewebster) and Mark Catalano(mcatalano)
// December 2008


// Global Page Functions

// Eric Webster:
// FOR ATG AJAX REQUESTS
// THE NORMAL JQUERY SERIALIZE FUNCTION DOES NOT INCLUDE THE SUBMIT BUTTON
// ATG USES THIS TO DIRECT THE FORM, THE BELOW INCLUDES THE SUBMIT BUTTON IN ALL FORM POSTS

// Define the JavaScript console if it is not available
if(!window.console) {console={}; console.log = function(){};}

//THIS IS THE IMAGE LOADER WHICH CHECKS FOR AN ALTERNATE IMAGE, IF IT DOESN'T FIND IT, REPLACES IT WITH A DEFAULT IMAGE
var imageLoader = function(el, def)
{
	//HACK-A-ROO: UPPER CASE ALL IMAGE NAMES FOR SCENE7
	var src = $(el).attr("src");
	src = src.substring(src.lastIndexOf('/') + 1);
	src = src.substr(0, src.indexOf('?'));
	
	if(src != src.toUpperCase())
	{
		var orig = $(el).attr("src");
		orig = orig.replace(src, src.toUpperCase());
		
		// Commented out, for reference during testing
		//$(el).attr("longdesc", orig);
	}
	
		
	var backup = $(el).attr("longdesc");
	if(backup){
		//NEED TO UPDATE THE IMAGE SENT TO THE ZOOM PLAYER OTHERWISE ZOOM WILL BREAK
		var newImg = $(el).attr("longdesc");
		newImg = newImg.substring(newImg.lastIndexOf('/') + 1);
		newImg = 'Talbots%2F' + newImg.substr(0, newImg.indexOf('?'));
		
		$("#dynArgsForZoom").attr("name", newImg);
		
		//Commented out, for reference during testing.
		//$(el).attr("longdesc", "");
		$(el).removeAttr("longdesc");

		$(el).attr("src", backup);
		
	} else {
		$(el).attr("src", def);
	}
	
}

var hideSelects = function(){
	$("select").each(function(){
		$(this).css("visibility", "hidden").attr("tempDisabled", "true")

	})
}
var showSelects = function(){
	$("select[tempDisabled=true]").each(function(){
		$(this).css("visibility", "visible").attr("tempDisabled", "")

	})
}

$.fn.serializeArray = function() {
	return this.map(function(){
		return jQuery.nodeName(this, "form") ?
			jQuery.makeArray(this.elements) : this;
	})
	.filter(function(){
		return this.name && !this.disabled &&
			(this.checked || /select|textarea/i.test(this.nodeName) ||
				/text|hidden|submit|password/i.test(this.type));
	})
	.map(function(i, elem){
		var val = jQuery(this).val();
		return val == null ? null :
			val.constructor == Array ?
				jQuery.map( val, function(val, i){
					return {name: elem.name, value: val};
				}) :
				{name: elem.name, value: val};
	}).get();
}
$.fn.search = function() {
	return this.focus(function() {
		if( this.value == this.defaultValue ) {
			this.value = "";
		}
	}).blur(function() {
		if( !this.value.length ) {
			this.value = this.defaultValue;
		}
	});
}

$.fn.addToWishList = function(){
	var quant = $("#quantitySku").val();
	$("#quantityWish").attr("value", quant);

	var target = $(this).get(0);
	var pid = $(target).parent().parent().parent().children(".prodId").val();
	var isUserLoggedin  = "false";// $("#isUserLoggedin").val();
	$.ajax({
		type: "get",
		data: $("#wishListForm").serialize(),
		method: $("#wishListForm").attr("method"),
		url: "/online/browse/includes/wishlist_service.jsp",
		cache: false,
		dataType: "json", 
		beforeSend: function(xhr) {
						xhr.setRequestHeader( "Content-Type", "application/json" );
						xhr.setRequestHeader( "Accept", "application/json" );
					},

					success: function(response){
					//response =JSONObject.escape(response);
					
				
					if(response.product!=undefined){
					
					
						$('#formErrors').children("div").children("ul").children("li").hide();
					}
					
					
				 if(response.eError!=undefined){
				 	$('#formErrors').children("div").children("ul").children("li").show();
					$('#formErrors').children("div").children("ul").children("li").html(response.eError);
						
						$("#wishListConfirmation").show();
						$("#itemAdded").hide();
						$("#formErrors").show();
						var timer = setInterval(function(){
										$("#wishListConfirmation").hide();
										showSelects();
									}, 1000);
					 }
						else if(response.isProfileTransient=='true')
							{
							
							
							window.location=response.loginUrl;
							
							}
						
						else 
							{
							
								var offset = $(target).offset();
								var newElemnt = $(target);
								
						
								var mywishListObj=document.getElementById("wishlist");
								if(mywishListObj != null){
									var myWishListMsg="WISH LIST("+response.wishListCount+")";
									mywishListObj.firstChild.firstChild.nodeValue = myWishListMsg;
								}
								var fromPageObj =document.getElementById("fromPageID");
								if(fromPageObj != null && fromPageObj.value == 'quickview')
								{
									$('#quickViewContainer').jqmHide();
									showSelects();
								}
								else if(response.product != undefined)
								{
								
								$("#wishListItem").children("h3").html(response.product.name);
								$("#wishListItem").children("span.productSku").html(response.product.catalogRefId);
								$("#wishListItem").children("span.colorName").html(response.product.color);
								$("#wishListItem").children("span.sizing").html("Size: "+response.product.size);
								$("#wishListItem").children("span.status").html("Status: "+response.product.status);
								if(response.product.onSale=='true'){
								$(".normalPrice").html(response.product.normalPrice);
								$(".salePrice").html(response.product.salePrice);
								$(".price").hide();
								}
								else if(response.product.onSale=='false'){
								$(".normalPrice").hide();
								$(".salePrice").hide();
								$(".price").html(response.product.normalPrice);
								}
								
								$(".chip").attr("src",response.product.imageForSku);
								$(".thumb").attr("src",response.product.thumbImage+"$wishlist$");
								
									hideSelects();
									$("#wishListConfirmation").show();
									var timer = setInterval(function(){
										$("#wishListConfirmation").hide();
										showSelects();
									}, 1000);
									var timer2 = setInterval(function(){
										$('#quickViewContainer').jqmHide();
										showSelects();
									}, 1000);
								}
								//create a fadeIn timer to fadein the modal, wait 3000ms then trigger the close function
							}

						

				},
		error: function(response){
					
		}
	});
}


$.fn.openCartOnLoad = function(){
	$()
	/*return this.each(function() {
		$("#shoppingBag").children("h3").addClass("active");

		if($("#table").children(".cartItem")!=null){
			$("#table").children(".cartItem").hide();
		}

		$("#persistentCart").fadeIn(function(){
			$("#persistentCart").addClass("open");
		});

	});
	*/
}

$.fn.openCart = function(){
	return this.each(function() {
	if(navigator.userAgent.match(/msie [6]/i) && jQuery.browser.version < 6.99){
		hideSelects();
	}
	$("#shoppingBag").children("h3").addClass("active");
	if($("#table").children(".cartItem")!=null){
		$("#table").children(".cartItem").show();
	}

	$("#persistentCart").fadeIn(function(){
			$("#persistentCart").addClass("open");

	});
	});
}

$.fn.closeCart = function(){
	return this.each(function() {
	$("#persistentCart").removeClass("open");
	$("#persistentCart").fadeOut(function(){
		$("#shoppingBag").children("h3").removeClass("active");
	});	
	if($("#persistentCart").length == 0 ){
		$("#shoppingBag").children("h3").removeClass("active");		
	}
	if(navigator.userAgent.match(/msie [6]/i) && jQuery.browser.version < 6.99){
		showSelects();
	}
	});
}




$.fn.openFindStore = function(){
	$(this).closeOpenHeaderMenus("findastore");
	return this.each(function() {
	if(navigator.userAgent.match(/msie [6]/i) && jQuery.browser.version < 6.99){
		//hideSelects();
	}
	$("#findastoreAjaxForm").children("h3").addClass("active");
	$("#findastoreLayout").fadeIn('fast',function(){
			$("#findastoreLayout").addClass("open"); 
			$("#findastoreLayout").children(".findastoreItem").show();
			if($("#findastoreItem")!=null){
				$("#findastoreItem").show();
			}

	});
	});
}

$.fn.closeFindStore = function(){
	return this.each(function() {
	$("#findastoreLayout").removeClass("open");
	$("#findastoreLayout").fadeOut(function(){
		$("#findastoreAjaxForm").children("h3").removeClass("active");
	});
	if(navigator.userAgent.match(/msie [6]/i) && jQuery.browser.version < 6.99){
		showSelects();
	}
	});
}



$.fn.openEmail = function(){
	$(this).closeOpenHeaderMenus("email");
	return this.each(function() {
	if(navigator.userAgent.match(/msie [6]/i) && jQuery.browser.version < 6.99){
		//hideSelects();
	}
	$("#emailAjaxForm").children("h3").addClass("active");
	$("#emailLayout").fadeIn('fast',function(){
			$("#emailLayout").addClass("open");
			if($("#emailItem")!=null){
				$("#emailItem").show();
			}

	});
	});
}

$.fn.closeEmail = function(){
	return this.each(function() {
	$("#emailLayout").removeClass("open");
	$("#emailLayout").fadeOut(function(){
		$("#emailAjaxForm").children("h3").removeClass("active");
	});
	if(navigator.userAgent.match(/msie [6]/i) && jQuery.browser.version < 6.99){
		showSelects();
	}
	});
}



$.fn.openSearch = function(){
	$(this).closeOpenHeaderMenus("search");
	return this.each(function() {
	if(navigator.userAgent.match(/msie [6]/i) && jQuery.browser.version < 6.99){
		//hideSelects();
	}
	$("#searchAjaxForm").children("h3").addClass("active");
	$("#searchLayout").fadeIn('fast',function(){
			$("#searchLayout").addClass("open");
			if($("#searchItem")!=null){
				$("#searchItem").show();
			}

	});
	});
}

$.fn.closeSearch = function(){
	return this.each(function() {
	$("#searchLayout").removeClass("open");
	$("#searchLayout").fadeOut(function(){
		$("#searchAjaxForm").children("h3").removeClass("active");
	});
	if(navigator.userAgent.match(/msie [6]/i) && jQuery.browser.version < 6.99){
		showSelects();
	}
	});
}

$.fn.closeOpenHeaderMenus = function(selectedHeaderItem){

	if($("#findastoreLayout").hasClass("open") && selectedHeaderItem != "findastore"){
		$(this).closeFindStore();
	}
	
	if($("#emailLayout").hasClass("open") && selectedHeaderItem != "email"){
		$(this).closeEmail();
	}
	
	if($("#searchLayout").hasClass("open") && selectedHeaderItem != "search"){
		$(this).closeSearch();
	}
	
}

$(document).ready(function(){
	
	$.ajaxSetup ({
	    // Disable caching of AJAX responses
	    cache: false
	});

	//ajax call to populate the persistent cart 
	$('#quickNav').load('/online/global/includes/header_ajax.jsp', function() {
		
		// BEGIN Search Box Functions
		
		// Something to do with fixing the search box pre-text
		$(":input[data-watermark]").each(function () {
			$(this).val($(this).attr("data-watermark"));
			$(this).bind('focus', function () {
				if ($(this).val() == $(this).attr("data-watermark")) $(this).val('');
			});
			$(this).bind('blur', function () {
				if ($(this).val() == '') $(this).val($(this).attr("data-watermark"));
				$(this).css('color','#a8a8a8');
			});
		});
		// Submit handler for the top nav search form
		$('#quickNavSearch').submit(function(e) {
			e.preventDefault();
			
			//validate search term input
			var defaultval = $("#search").defaultValue;
			var searchterm = $("#search").val();

			if (searchterm != defaultval) {
				window.location = $(this).attr('action') + '_/Ntt-' + searchterm;
			}
			
			return false;
		});

		// Intercept the faux-submit's click to submit its parent form
		$('#quickNavSearch input[type=image]').click(function(e) {
			e.preventDefault();
			$('#quickNavSearch').submit();
		});

				
		// END Search Box Functions
	
		$("#CapitalizeTest").addClass("Capitalizefirst");	
	
		$("#findastoreLayout").removeClass("open");
		//findastore form
		$("#findastoreAjaxForm").hoverIntent({
			sensitivity: 2,
			interval: 100,
			timeout: 500,
			over: function(){
				$(this).openFindStore();
			}
		})
		
		

		$("#emailLayout").removeClass("open");
		//email form
		$("#emailAjaxForm").hoverIntent({
			sensitivity: 2,
			interval: 100,
			timeout: 500,
			over: function(){
				$(this).openEmail();
			}
		})
			
	
		$(this).openSearch();
		$("#searchLayout").removeClass("open");
		//search form
		$("#searchAjaxForm").hoverIntent({
			sensitivity: 2,
			interval: 100,
			timeout: 500,
			over: function(){
				$(this).openSearch();
			}
		})
		
		//SignIn SignOut hover
		$("#signInOut").hoverIntent({
			sensitivity: 2,
			interval: 200,
			timeout: 500,
			over: function(){
				$("#signInOut").children("h3").addClass("active");
			},
			out: function(){
				$("#signInOut").children("h3").removeClass("active");
			}
		})
		
		//persistent cart
		$("#shoppingBag").hoverIntent({
			sensitivity: 2,
			interval: 200,
			timeout: 500,
			over: function(){
				$(this).openCart();
			},
			out: function(){
				$(this).closeCart();
			}
		})
		$(".closeCartTrigger").click(function(){
			$("#shoppingBag").closeCart();
		})

		$(".disabled").css("opacity",.5);
		// auto clear search fields on click
		$("#search, #email, #location, #emailAddress, #footerlocation, #footeremailAddress").search();
		// This function checks to see if the shopping cart should be opened on page load.
		if($("#shoppingBag").hasClass("openMe") && !$("#checkoutShoppingBag").length > 0){

			$("#shoppingBag").openCart()
			var closeCartTimer = setTimeout(function(){
					$("#shoppingBag").closeCart();
					$("#shoppingBag").removeClass("openMe");
			},7000);

		}

		//drop down, pull up for secondary nav
		$("#secondaryNav li").hoverIntent({
			sensitivity: 2,
			interval: 200,
			timeout: 500,
			over: function(){
				$(this).addClass("active").children('ul').slideDown();
			},
			out: function(){
				$(this).removeClass("active").children('ul').slideUp();
			}
		});

		//drop down, pull up for main nav
		$("#mainNav li").hoverIntent({
			sensitivity: 2,
			interval: 200,
			timeout: 500,
			over: function(){
				$(this).addClass("active").children('div').slideDown();
			},
			out: function(){
				$(this).removeClass("active").children('div').slideUp();
			}
		});

		//Select Drop Down redirect
		$(".selectRedirect").change(function(){
			var redirect = $(this).val();

			if (redirect != "null"){
				document.location.href=redirect;
			}
		});

		//Superpopup

		//if the wishlist container exists, prepare to use it.

		if($("#wishListConfirmation").length > 0){
			$.jqm.params.overlay = 0;
			$("#wishListConfirmation").jqm({
				trigger: 'a.closeButton',
				onShow: function(hash){
					var mTop = "-" + Math.round(hash.w.outerHeight() / 2) + "px";
					var mLeft = "-" + Math.round(hash.w.outerWidth() / 2) + "px";
					hash.w.css({
						'margin-top': mTop,
						'margin-left': mLeft
					}).fadeIn();

				},
				onHide: function(hash){
					hash.w.fadeOut().css('opacity',0);
				}
			});
		}
		//submit bind function

		// Global Event Manager - Bind functionality here.
		$("body").click(function(e){

			var target = $(e.target).get(0);
			if($(target).hasClass("wishlistTrigger")){
				$(target).addToWishList();
				return false;
			} else if($(target).hasClass("findPopup")){
				var popupLink = $(target).attr("href");
				superPopup({
					type : "findInStore",
					url : popupLink
				});
				return false;
			} else if($(target).hasClass("finalSale")){
				var popupLink = $(target).attr("href");
				superPopup({
					type : "finalsale",
					url : popupLink,
					width : 400,
					height : 30
				});
				return false;
			} else if($(target).hasClass("finalSaleCheckout")){
				var popupLink = $(target).attr("href");
				superPopup({
					type : "finalsale",
					url : popupLink,
					width : 400,
					height : 30
				});
				return false;
			} else if($(target).hasClass("sizingChart")){
				var popupLink = $(target).attr("href");
				superPopup({
					type: "sizeChart",
					url : popupLink
				});
				return false;
			}
			else if($(target).hasClass("sendmail")){

				//Instantiate the message auto tabbing system.
				$('#line1').autotab({ target: 'line2'});
				$('#line2').autotab({ target: 'line3', previous: 'line1' });
				$('#line3').autotab({ target: 'line4', previous:'line2'});
				$('#line4').autotab({ previous: 'line3'});

					var offset = $(this).offset();
					var currentPage = (location.href);
					$("#emailFriend").fadeIn(250).css({display:"block", left:offset.left -200 , top:offset.top + 35});
					$("#emailMessage span").html('<a href="' + currentPage + '">'+ currentPage +'</a>');
					$("input#line1").focus();


				$(".closeButton, input#cancel").click(function(){
					$("#emailFriend").fadeOut(500);
					return false;
				});

				$("#emailFriend label input").focus(function() {

				});

			}
		});
	});
});

$(document).ready(function() {

	// Make entire gray area in top nav clickable
	$('li.nav-item').click(function(e) {
		$($(this).find('a')).click();
	});
	$('li.nav-item a').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		window.location = $(this).attr('href');
	});
	
	// Remove empty drop downs from the top nav
	$('ul.nav-subnav').each(function() {
		var dropdown = $(this);
		if (dropdown.find('li').length == 0) {
			dropdown.remove();
		}
	});
});