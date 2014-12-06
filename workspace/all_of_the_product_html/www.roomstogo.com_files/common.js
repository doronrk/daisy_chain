/* mcoleman common.js file 7/7/2014 */


var cartMoving = false;
var wishlistMoving = false;

/*********************************************************************** jQuery Plugins */
$.fn.preload = function(){
	this.each(function(){
		$('<img/>')[0].src = this;
	});
};

$.fn.center = function(){
	this.css("position","absolute");
	this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
	this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
	return this;
};//end center


/*********************************************************************** end jQuery Plugins */
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/*********************************************************************** Common Functions */
request = {
	url: function(item){
		var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	}
};//usage request.url("myURLpram")

var taskDone = (function(){
	var timers = {};
	return function (cal, mili, uniqueId){
		if(timers[uniqueId]){
			clearTimeout(timers[uniqueId]);
		};
		timers[uniqueId] = setTimeout(cal, mili);
	};
})(); //taskDone(function(){}, 500, "some unique string");

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value+";path=/";
};//end setCookie

function getCookie(c_name){
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if(c_start == -1){ c_start = c_value.indexOf(c_name + "="); }
	if(c_start == -1){
		c_value = null;
	}else{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if(c_end == -1){ c_end = c_value.length; }
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
};//end getCookie

function kill_cookie(name, value, path, domain, secure){
	var cookie_string = name + "=" + escape ( value );
		cookie_string += "; expires=0";

	if(path) cookie_string += "; path=" + escape ( path );
	if(domain) cookie_string += "; domain=" + escape ( domain );
	if(secure) cookie_string += "; secure";
	document.cookie = cookie_string;
};//end kill_cookie

var globalTimeout = null;
function strengthTest(password, passwordConfirmation, confirmationMessage){
	var intScore = 0;
	//password length
	if(password.val().length < 5 && password.val().match(/[a-z]/)){
		//length 4 or less
		intScore =(intScore + 5);
	}else if(password.val().length > 4 && password.val().match(/[a-z]/)){
		//length between 5 and 7
		intScore =(intScore + 10);
	};

	//numbers
	if(password.val().match(/\d+/)){
		intScore =(intScore + 10);
	};

	if(intScore < 10){
		$(".weak").animate({ opacity:1, width:"20px" }, 500);
		$(".good").animate({ opacity:0, width:"0px" }, 500);
		$(".strong").animate({ opacity:0, width:"0px" }, 500);
	}else if(intScore > 9 && intScore < 19){
		$(".weak").animate({ opacity:0, width:"0px" }, 500);
		$(".good").animate({ opacity:1,  width:"40px" }, 500);
		$(".strong").animate({ opacity:0,  width:"0px" }, 500);
	}else{
		$(".weak").animate({ opacity:0, width:"0px" }, 500);
		$(".good").animate({ opacity:0, width:"0px" }, 500);
		$(".strong").animate({ opacity:1, width:"60px" }, 500);
	}

	if(password.val() == passwordConfirmation.val()){
		$(".confirm").text("passwords match");
	}
	else{
		$(".confirm").text("passwords do not match");
	}
};//strengthTest

function passwordStrength(password, passwordConfirmation, confirmationMessage){
	var globalTimeout = null;

	password.keyup(function(){
		if(globalTimeout != null)
			clearTimeout(globalTimeout);

		setTimeout(function(){
			strengthTest(password, passwordConfirmation, confirmationMessage);
		}, 700);
	});

	passwordConfirmation.keyup(function(){
		if(password.val() == passwordConfirmation.val()){
			confirmationMessage.text("passwords match");
		}
		else{
			confirmationMessage.text("passwords do not match");
		}
	});
};//passwordStrength





function animateCart(){
	var context = $(".miniCartLink"),
		linkPosition = context.position(),
		miniCartLinkHeight = context.outerHeight(),
		cartMoving = true;

	if($("#miniCartModal").is(":visible")){
		$("#miniCartModal").slideUp("fast", function(){
			context.removeClass("miniCartOpened");
			var isOpened = context.hasClass("miniCartOpened") ? "Close " : "";

			var miniquantity = $("#miniCartQuantity").text();

			if(miniquantity > 0){
				context.html(isOpened + 'Checkout / Cart (<span id="miniCartQuantity">' + $('#miniCartQuantity').text() + '</span>)');
			}else{
				context.html(isOpened + 'Cart (<span id="miniCartQuantity">' + $('#miniCartQuantity').text() + '</span>)');
			};
			var buttonRef = $("#addToCartSubmit");
			buttonRef.removeClass("adding");
			buttonRef.attr("src", buttonRef.attr("osrc"));
			cartMoving = false;
		});

	}else{

		if($("#wishListModal").is(":visible")) animateWishlist();

		$("#miniCartModal").slideDown("fast", function(){
			if(!(context.hasClass("miniCartOpened"))){
				context.toggleClass("miniCartOpened");
			};
			var isOpened = context.hasClass("miniCartOpened") ? "Close " : "";
			context.html(isOpened + 'Cart (<span id="miniCartQuantity">' + $('#miniCartQuantity').text() + '</span>)');
			cartMoving = false;
		});
	};
};//animateCart





function animateWishlist(){
	var context = $("#wishListLink"),
		linkPosition = context.position(),
		wishlistMoving = true;

	if($("#wishListModal").is(":visible")){
		$("#wishListModal").slideUp("fast", function(){
			context.removeClass("wishListOpened");
			var isOpened = context.hasClass("wishListOpened") ? "Close " : "";
			context.html(isOpened + 'Wishlist (<span id="wishListQuantity">' + $('#wishListQuantity').text() + '</span>)');
			wishlistMoving = false;
		});
	}else{
		$("#wishListModal").slideDown("fast", function(){
			if(!(context.hasClass("wishListOpened"))){
				context.addClass("wishListOpened");
			};
			var isOpened = context.hasClass("wishListOpened") ? "Close " : "";
			context.html(isOpened + 'Wishlist (<span id="wishListQuantity">' + $('#wishListQuantity').text() + '</span>)');
			wishlistMoving = false;
		});
	};
};//animateWishlist

function handleAjaxError(jqXHR, shortMessage, message){
	location.reload();
};//handleAjaxError

$(document).on("submit", ".asyncJsonForm.addToCart", function() {
	$.post($(this).attr("action"), $(this).serialize(), function(jsonResponse) {
		$('.miniCartLink').triggerHandler('click', 'addtocart');
	}, "json").fail(function(jqXHR, shortMessage, message) {handleAjaxError(jqXHR, shortMessage, message);});
	return false; // prevent normal submit
});



function receiveMessage(event){
	if(event.data == "moveToHomePage"){
		window.location = "/index.jsp";
		return false;
	}else if(event.data == "moveToLogin"){
		window.location = "/myaccount/login.jsp";
		return false;
	}else if(event.data == "moveToAccountHome"){
		window.location = "/myaccount/profile.jsp";
		return false;
	}else if(event.data == "stayOnSamePage"){
		try{
			handleStayOnSamePage(event.data,"*");
		}catch(error){
			window.location = window.location.href;
		}
		return false;
	}else if(event.data == "moveToCart"){
		window.location = "/cart/cart.jsp";
		return false;
	}else if(event.data == "moveToRegistration"){
		window.location = "/myaccount/registration.jsp";
		return false;
	}else if(event.data == "moveToCheckout"){
		window.location = "/checkout/index.jsp";
		return false;
	}else if(event.data == "moveToPasswordReset"){
		window.location = "/myaccount/passwordReset.jsp";
		return false;
	}else if(event.data == "displayWishlist"){
		$("#wishListModal .miniCartCheckoutContainer:hidden").show();
		$("#wishListLink").trigger("click");
		return false;
	}
	return false;
};//receiveMessage





Number.prototype.formatCurrency = function(c, d, t){
	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};//formatCurrency

function postModalMessage(framename, message){
	var modalWindow = $("#" + framename)[0].contentWindow;
	modalWindow.postMessage(message, $("#" + framename)[0].contentDocument.location.href);
};//postModalMessage

function loadErrorMessage(errorMessage){
	$(".modalGuestContent .errorBlock").html('<div class="errorString blockContainer">' + errorMessage + '</div>');
	$(".errorString").fadeIn("slow");
};//loadErrorMessage










/******************************************************* social media ***************/
function loadFacebookWidget(){
	var	emailButton = $(".loadEmailAFriend"),
	position = emailButton.offset(),
	height = emailButton.outerHeight(),
	width = emailButton.outerWidth() + 8;
};//end loadFacebookWidget

function setMediaButtons(){
	if($("#facebookLike").length > 0){
		/*convert image and URLs to encoded string to push to social media*/
		getURLs = { type :function(type){
			switch(type){
				default:
				case "url":
					var currentURL = document.URL;
					var indexURL = currentURL.indexOf(';');
					strip1URL = currentURL.substring(0, indexURL != -1 ? indexURL :currentURL.length);
					var indexURL = strip1URL.indexOf('?');
					strip2URL = strip1URL.substring(0, indexURL != -1 ? indexURL :strip1URL.length);
					encodedURL = encodeURIComponent(strip2URL);
					return encodedURL;
				break;
				case "img":
					imageURL = $("#productImage").attr("src");
					imageURLhttp = (imageURL.indexOf("http") > -1) ? encodeURIComponent(imageURL) :encodeURIComponent("http:" + imageURL);
					encodedImage = imageURLhttp;
					return encodedImage;
				break;
				case "monogram":
					encodedUrl = encodeURIComponent($("#monogramUrl").val());
					return encodedUrl;
				break;
			}
		}};//end processLikeUrl

		//get and bind Facebook / pinit link button to proper URL
		var currentLikeUrl = $("iframe#facebookLike").attr("src");
		var currentPinitUrl = "//www.pinterest.com/pin/create/button/";

		//monogram check
		if($("iframe#facebookLike").hasClass("monogram")){
			$("iframe#facebookLike").attr("src", currentLikeUrl + getURLs.type("monogram"));	
			$("#pinit > a").attr("href", currentPinitUrl + "?url=" + getURLs.type("monogram") + "&media=" + getURLs.type("img") + "&description=" + $('#socialText').val());
		}else{
			$("iframe#facebookLike").attr("src", currentLikeUrl + getURLs.type("url"));
			$("#pinit > a").attr("href", currentPinitUrl + "?url=" + getURLs.type("url") + "&media=" + getURLs.type("img") + "&description=" + $('#socialText').val());
		};
		//force pinit to new window
	};//if facebook exists
};//end pinit and facebook social buttons
/******************************************************* end social media ***************/


function showModalDiv(divId){
	var hashedDivId = "#"+divId;

	$(hashedDivId).overlay({
		onBeforeLoad:function(){},
		mask:{
			color:"#000",
			loadSpeed:500,
			opacity:0.5
		},
		closeOnClick:false,
		onClose:function(){},
		onBeforeClose:function(e,u){
			$(hashedDivId).close();
			$(hashedDivId).remove();
		}
	});
	//example to create another class based on genericModal
	$(".genericModal").addClass(divId);
};//end showModalDiv


function showModalFromUrl(url, divId){
	var hashedDivId = "#"+divId;
	if($(hashedDivId).length <= 0){
		var	modalDivString = '<div id="' + divId + '" />';
		$("body").append(modalDivString);
	};
	$(hashedDivId).load(url, function(){
		showModalDiv(divId);
	});
};//end showModalFromUrl


/******************************************************* cart/wishlist ***************/
function getLatestCart(callback){
	$.post("/cart/json/cartItems.jsp", function(postResponse){
		var	postObject = postResponse;
		var	rowMarkup = "";
		var	totalQuantity = 0;

		var miniquantitystart = $("#miniCartQuantity").text();

		for(var i = 0; i < postObject.items.length; i++){
			var fabricProtection = "";
			if(postObject.items[i].fabricProtection == "true")
				fabricProtection = '<span class="miniCartAvailability">'+postObject.items[i].fabricProtectionText+'</span>'
			var childItems = postObject.items[i].childItems;
			var fillerValue = "";
			if(postObject.items[i].fillerValue != null)
				fillerValue = '<span>'+postObject.items[i].fillerValue+'</span>'

			var listPrice = '';
			if(postObject.items[i].prices[0].listPrice)
				listPrice = postObject.items[i].prices[0].listPrice;

			var cartItemImageUrl = postObject.items[i].imageUrl;

			if(cartItemImageUrl != null && cartItemImageUrl.indexOf("?") < 0)
				cartItemImageUrl += '?$PDP_Recommend_79x54$';
			else
				cartItemImageUrl += '&$PDP_Recommend_79x54$';

			rowMarkup += ''
						+ '<tr>'
						+ '<td class="productImage">'
						+ '<img class="miniCartProductImage" src="' + cartItemImageUrl + '" alt="' + postObject.items[i].name + '" />'
						+ '</td>';
			if(listPrice == ''){
						rowMarkup += '<td class="productDescription">';
			}
			else{
						rowMarkup += '<td class="productDescription discount">';
			}

			rowMarkup += '<a href="' + postObject.items[i].url+ '">' + postObject.items[i].name + '</a>'
						+ '<div class="productDescriptionWrapper">'
						+ fillerValue
						+ childItems
						+ fabricProtection
						+ '</div>'
						+ '<span class="miniCartAvailability">' + postObject.items[i].availability + '</span>'
						+ '<span class="miniCartQuantity">Qty: ' + postObject.items[i].prices[0].quantity + '</span>'
						+ '</td>';

			rowMarkup += '<td class="productPrice">';

			if(listPrice != ''){
				rowMarkup += '<span><del>' + listPrice + '</del></span><br />';
			}

			rowMarkup += '<span>' + postObject.items[i].prices[0].price + '</span>'
						+ '</td>'
						+ '<td class="productDelete">'
						+ '<form id="miniCartForm_' + (i + 1) + '" action="#" class="blockContainer">'
						+ '<input type="hidden" name="commerceId" value="' + postObject.items[i].commerceItemId + '" />'
						+ '<a id="miniCartForm_' + (i + 1) + 'Submit" class="deleteRow blockContainer" href="#" rel="cartlist">DELETE</a>'
						+ '<input id="miniCartForm_' + (i + 1) + 'SubmitForm" type="hidden" value="#miniCartForm_' + (i + 1) + '" />'
						+ '<input id="miniCartForm_' + (i + 1) + 'SubmitAction" type="hidden" value="remove-item-submit.jsp" />'
						+ '</form>'
						+ '</td>'
						+ '</tr>';

			totalQuantity += +postObject.items[i].prices[0].quantity;
		}

		var	subTotal = '$0.00';
		var discountedOrder = 0;
		var discountAmount = '$0.00';

		if(postObject.items.length > 0){
			subTotal = postObject.subtotal;
			discountedOrder = postObject.discountedOrder;
			discountAmount = postObject.discountAmount;
		}else{
			rowMarkup = '<tr>'
				+ '<td class="emptyCartContainer">'
				+ '<div class="emptyHeading blockContainer">'
				+ '<img src="/static/img/site/modal-login/modal-logo.png" alt="">&nbsp;&nbsp;<span>Your cart is empty</span>'
				+ '</div>'
				+ '<a href="/index.jsp">Continue Shopping</a>'
				+ '</td>'
				+ '</tr>';
		}

		$(".miniCartLink #miniCartQuantity").text(totalQuantity);
		$("#miniCartModal .miniCartText table").html(rowMarkup);
		$(".shoppingCartContainer #cartSubtotal").text(subTotal);
		$(".shoppingCartContainer #discountAmount").text(discountAmount);

		if(discountedOrder == 1){
			$(".shoppingCartContainer .discount").css("display","");
		}else{
			$(".shoppingCartContainer .discount").css("display","none");
		}

		var miniquantityend = $('#miniCartQuantity').text();

		if(miniquantityend > miniquantitystart){
			$.ajax({
				url:"/cart/gadgets/kenshoo.jsp",
				type:"post",
				dataType:"html",
				async:true,
				success:function(markup){
					$(".kenshoo").html(markup);
				}
			});
		}
		if(callback){ callback(); }
	}, "json");
};//end getLatestCart





function getLatestWishlist(callback){

	$.ajax({
		type:"post",
		url:"/giftlists/json/wishlistItems.jsp",
		data:{},
		dataType:"json",
		beforeSend:function(){},
		success:function(data){
			var	postObject = data;
			var	rowMarkup = "";
			var	totalQuantity = 0;

			for(var i = 0; i < postObject.items.length; i++){
				rowMarkup += ''
							+ '<tr>'
							+ '<td class="productImage">'
							+ '<img class="miniCartProductImage" src="' + postObject.items[i].imageUrl + '" alt="' + postObject.items[i].name + '" />'
							+ '</td>'
							+ '<td class="productDescription">'
							+ '<a href="' + postObject.items[i].url+ '">' + postObject.items[i].name + '</a>'
							+ '<span class="miniCartAvailability">' + postObject.items[i].availability + '</span>';
							if(typeof postObject.items[i].regionAvailability != 'undefined'){
								rowMarkup += '<span class="miniCartRegionAvailability"><a href="'+postObject.items[i].url+'">' + postObject.items[i].regionAvailability + '</a></span>'
							}
				rowMarkup += '<span class="miniCartQuantity">Qty: ' + postObject.items[i].quantityDesired + '</span>'
							+ '</td>'
							+ '<td class="productPrice">';

				if(postObject.items[i].prices[0].listPrice != null)
				rowMarkup += '<span>' + postObject.items[i].prices[0].listPrice + '</span>';
				rowMarkup += '</td>'
							+ '<td class="productDelete">'
							+ '<form id="wishlistForm_' + (i + 1) + '" action="#" class="blockContainer">'
							+ '<input type="hidden" name="giftId" value="' + postObject.items[i].giftId + '" />'
							+ '<a id="wishlistForm_' + (i + 1) + 'Submit" class="deleteRow blockContainer" href="#" rel="wishlist">DELETE</a>'
							+ '<input id="wishlistForm_' + (i + 1) + 'SubmitForm" type="hidden" value="#wishlistForm_' + (i + 1) + '" />'
							+ '<input id="wishlistForm_' + (i + 1) + 'SubmitAction" type="hidden" value="remove-giftlist-item-submit.jsp" />'
							+ '</form>'
							+ '</td>'
							+ '</tr>';

				totalQuantity += +postObject.items[i].quantityDesired;
			};//end for loop

			if(postObject.itemCount <= 0){
				rowMarkup = '<tr>'
					+ '<td class="emptyCartContainer">'
					+ '<div class="emptyHeading blockContainer">'
					+ '<img src="/static/img/site/modal-login/modal-logo.png" alt="">&nbsp;&nbsp;<span>Your wishlist is empty</span>'
					+ '</div>';
					if($("#loginStatus").val() == "false"){
						rowMarkup += '<div class="signInBtn"><a href="/myaccount/login.jsp" class="redBtn">Sign In to Add to Wish List</a></div>';
					}
					rowMarkup += '</td>'
					+ '</tr>';
			};//no items in wishlist

			$("#wishListLink #wishListQuantity").text(totalQuantity);
			$("#wishListModal .miniCartText table").html(rowMarkup);

			if(callback){
				if(postObject.items.length > 0){
				   callback(postObject.items[postObject.items.length - 1].skuId);
				}else{
					callback();
				};
			};//end callback

		},
		error:function(xhr, status, error){
			//console.log(xhr.responseText + '- ajax error');
		}
	});



}
/******************************************************* end cart/wishlist ***************/
















/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/*********************************************************************** DOM ready - keep at end of file */
$(function(){

/**************************** common calls */
	//if breadcrumbs exist move them out of sidebar
	//added facet trail after breadcrumbs
	if($(".refinementAncestors").length > 0){
		var facets = $(".actionDelete"), title = "", link = "";
		var breadCrumbString = "<div id='breadWrap'>";
		breadCrumbString += $(".refinementAncestors").first().html();

		if(facets.length){
			breadCrumbString += "<div id='facetTrail'><span class='divider'>&gt;</span>";
			$(facets).each(function(){
				title = $(this).text();
				link = $(this).attr("href");
				breadCrumbString += "<a href='"+link+"' class='actionDelete'>&nbsp;"+title+"</a>";
			});
			breadCrumbString += "</div>";
		};
		breadCrumbString += "</div>";
		$(breadCrumbString).insertBefore("#atg_store_content").addClass("newCrumb");
		var parentWidth = $("#atg_store_refinementAncestorsLinks").parent().outerWidth();
		var crumbWidth = $("#atg_store_refinementAncestorsLinks").outerWidth();
		$("#facetTrail").css({"width":((parentWidth-crumbWidth)-20)+"px"});
	};

	//prevent chrome from adding yellow backgrounds to inputs
	$("html[data-useragent*='Chrome'] form").attr("autocomplete","off");

	if($("body").hasClass("atg_store_pageProductDetail")){
		setMediaButtons(); //binds URLs to social media buttons
	};

	$.fn.sameHeight = function() {
		if($(this).length > 0){
			var ulHeight = 0;
			$(this).each(function(i,e){
				if($(this).height() > ulHeight){
					ulHeight = $(this).height();
				};
			});

			ulHeight = ulHeight+"px";
			$(this).each(function(i,e){
				$(this).css({'height':ulHeight})
			});
		}
	}

	$(".browseByCategoryBlock .childCategory").sameHeight();


/**************************** common calls */






/**************************** modals */

	$(document).on("click", ".modalLink", function(){
		var url = $(this).attr("href");
		var divId = $(this).attr("rel");
		showModalFromUrl(url, divId);
		return false;
	});

	$(".modalLogins").click(function(){
		var	context = $(this),
			modalAction = context.attr('rel').replace(".", "");

		if($("#loginStatus").val() == "false"){
			var	modalTarget = $('<div class="genericModal modalsContainer modalWindow ' + modalAction + '"  />');

			$("body").append(modalTarget);
			modalTarget.overlay({
				mask:{
					color:"#000",
					loadSpeed:500,
					opacity:0.5
				},
				closeOnClick:false,
				load:true,
				onLoad:function(){
					$("html, body").animate({ scrollTop: 0 }, "slow");
					var bodyOffset = $("body").offset().top - 24;

					$("html, body").animate({
						scrollTop:bodyOffset
					}, "1000");
				},
				onClose:function(){
					modalTarget.remove().end();
				},
				onBeforeLoad:function(){
					$.ajax({
						url:"/global/gadgets/loginModal.jsp?modalOption=" + modalAction + "&modalRedirect=" + modalAction,
						type:"post",
						dataType:"html",
						success:function(responseData){
							modalTarget.append(responseData);
						},
						error:function(x, y, z){
							window.location.reload();
						}
					});
				}
			});
			return false;
		}
	});//end login

	try{
		$(".modalLogins").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onClose:function(){
				$("#loginModalFrame").attr("src", $("#loginModalFrame").attr("src"));
				$("#moveToCheckoutModalFrame").attr("src", $("#moveToCheckoutModalFrame").attr("src"));
			},
			onBeforeLoad:function(){
				naf.omni.trackLoginPage();
			}
		});
	}catch(exception){}

	try{
		$(".loadFabricSwatches, .liveHelp, .bunkieInfoModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}catch(exception){}

	try{
		$(".shareWishlist").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){
				$(".errorString").html("");
				$(".errorString").css("display","none");
				$(".atg_store_wishListformActionItem").css("display","block");
			}
		});
	}catch(exception){}

	try{
		if(!$("#noConfiguration").length){
			$(".configuratorDropDown").overlay({
				mask:{
					color:"#000",
					loadSpeed:500,
					opacity:0.5
				},
				closeOnClick:false,
				onLoad:function(){
					var bodyOffset = $("body").offset().top - 24;
					$("html, body").animate({
						scrollTop:bodyOffset
					}, '1000');
				},
				onBeforeLoad:function(){}
			});
		}
	}catch(exception){}

	try{
		$(".emailSubmit").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			onLoad:function(){
				$("html, body").animate({ scrollTop: 0 }, "slow");
				$("#atg_store_EmailInput").val($("#emailEntry").val());
			},
			onBeforeLoad:function(){}
		});

		$("input#emailEntry").live("keypress", function(e){
			if(e.which == 13){
				$("a.emailSubmit").trigger("click");
				return false;
			}
		});
	}catch(exception){}

	try{
		$(".loadEmailAFriend").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){
				if(!$("#emailAFriendFormfield").length){
					var	productId = $("#productId").val();
					var	region = $("#region").val();
					$("#EmailAFriendForm").load("/browse/templates/gadgets/emailAFriendForm.jsp?productId=" + productId + "&region=" + region);
				}


			}
		});
	}catch(exception){}

	try{
		$(".loadConfigurableSet").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			onLoad:function(){
				var bodyOffset = $("body").offset().top - 24;

				$("html, body").animate({
					scrollTop:bodyOffset
				}, "1000");
			},
			onBeforeLoad:function(){}
		});
	}catch(exception){}

	try{
		$(".changeLocation").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){
				gaEvent("ChangeLocation");
			}
		});
	}catch(exception){}


	if($("#emailSignupThanks").length){
		$(".thanksModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#emailSignupError").length){
		$(".emailErrorModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#fabricSwatchThanks").length){
		$(".thanksModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#fabricSwatchError").length){
		$(".fabricSwatchErrorModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#emailAFriendSuccess").length){
		$(".thanksModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#emailAFriendError").length){
		$(".emailAFriendModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#emailAFriendMonogramSuccess").length){
		$(".monogramThanksModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#emailAFriendMonogramError").length){
		$(".emailAFriendMonogramModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}
	if($("#expressDeliveryResult").length){
		$(".expressModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:false,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){},
			onClose:function(){
				$("#expressAvailabilityResults").hide();
				$("#expressAvailabilityZipInput").val("");
				$("#expressModalContentId").removeClass("expressModalNextDaySubmitContent").addClass("expressModalSubmitContent");
			}
		});
		$(".expressModal").overlay().load();
	}

	try{
		$(".loadExpressDelivery").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:false,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){},
			onClose:function(){
				$("#expressAvailabilityResults").hide();
				$("#expressZipPrompt").val("");
				$("#expressModalContentId").removeClass("expressModalNextDaySubmitContent").addClass("expressModalSubmitContent");
			}
		});
	}catch(exception){}


	if($("#changeLocationError").length){
		$(".changeLocationModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#giftcardBalanceInquiry").length){
		$(".giftcardBalanceModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#liveHelpSuccess").length){
		$(".liveHelpSuccessModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	if($("#liveHelpError").length){
		$(".liveHelpModal").overlay({
			mask:{
				color:"#000",
				loadSpeed:500,
				opacity:0.5
			},
			closeOnClick:false,
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad:function(){}
		});
	}

	$(".bunkieInfoLink").bind("click", function(event, extra){
		$(".bunkieInfoModal").overlay().load();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	$(".promoMessageContainer").overlay({
		mask:{
			color:"#000",
			loadSpeed:500,
			opacity:0.5
		},
		closeOnClick:false,
		close:$(".closePromoMessage"),
		load:false,
		onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
		onBeforeLoad:function(){}
	});

	$(".taxStatesMessageContainer").overlay({
		mask: {
			color:"#fff",
			loadSpeed:500,
			opacity:0
		},
		closeOnClick:false,
		close: $(".closeTaxStatesMessage"),
		load: false,
		onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
		onBeforeLoad: function(){}
	});

	/* Site Feedback */
	try{
		$(".siteFeedbackLink").overlay({
			mask: {
				color: "#000",
				loadSpeed: 500,
				opacity: 0.5
			},
			closeOnClick: false,
			onClose: function(){
				$("#siteFeedbackMessage").val("");
			},
			load:false,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad: function(){
			}
		});
	}catch(exception){};

	if($("#siteFeedbackSuccess").length){
		$(".siteFeedbackSuccessModal").overlay({
			mask: {
				color: "#000",
				loadSpeed: 500,
				opacity: 0.5
			},
			closeOnClick: false,
			onClose: function(){
				location.reload();
			},
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad: function(){}
		});
	};

	if($("#siteFeedbackError").length){
		$(".siteFeedbackModal").overlay({
			mask: {
				color: "#000",
				loadSpeed: 500,
				opacity: 0.5
			},
			closeOnClick: false,
			onClose: function(){
				$("#siteFeedbackErrorBlock").hide();
			},
			load:true,
			onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
			onBeforeLoad: function(){}
		});
	};


/****** ajax modals */
	$(document).on("click", ".genericAjax", function(e){
		e.preventDefault();
		var url = $(this).attr("href");
		var divId = $(this).attr("rel");

		$("body").append('<div id="aj_' + divId + '" />');
		$("#aj_"+divId).addClass("genericModal");
		$.ajax({
			url:url,
			type:"POST",
			async:false,
			success:function(markup){
				$("#aj_"+divId).prepend(markup);
				$("#aj_"+divId).overlay({
					mask:{
						color:"#000",
						loadSpeed:500,
						opacity:0.5
					},
					load:true,
					onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
					onClose:function(){
						$("#aj_"+divId).remove();
					}
				});
			}
		});
		return false;
	});


	$("a.displayPromoDetails").click(function(e){
		$(".promoMessageContainer").overlay().load();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		$.ajax({
			url:"/browse/get-finance-plan-tdrs-promo.jsp",
			type:"POST",
			async:false,
			success:function(markup){
				$(".promoMessageContent").html(markup);
			}
		});
		return false;
	});


	$("a.displayTaxStates").live("click", function(e){
		$(".taxStatesMessageContainer").overlay().load();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		$.ajax({
			url: "/cart/gadgets/get-tax-states.jsp",
			type: "post",
			async: false,
			success: function(markup){
				$(".taxStatesMessageContent").html(markup);
			}
		});
		return false;
	});


	$(document).on("submit", ".asyncForm", function(){
		var hashedDivResultId = "#" + $(this).attr("id") + "ResultDiv";
		$.post($(this).attr("action"), $(this).serialize(), function(html){
			$(hashedDivResultId).html(html);
		});
		return false; // prevent normal submit
	});





	/*team swap*/
	$(document).on("click", ".seeInStore", function(event){
		event.preventDefault();
		var url = $(this).attr("href"),
			divId = $(this).attr("rel"),
			description = $(this).attr("desc"),
			teamName = $(this).attr("data-js").toLowerCase().replace(/ /g,'').replace(/[^a-z0-9\s]/gi, '');

		$.ajax({
			type:"GET",
			url:url,
			beforeSend:function(){
				$("body").append('<div id="' + divId + '" />');
				$("#"+divId).addClass("genericModal");
			},
			success:function(data){
				/*find and replace tean name within image URL*/
				var dom = $(data);
				dom.find("#storeProductImg").each(function(){
					var currentSrc = $(this).attr("src"),
						newSrc = currentSrc.replace("dolphins", teamName).replace("universityofflorida", teamName).replace("cowboys", teamName).replace("falcons", teamName).replace("universityofgeorgia", teamName).replace("universityoftexas", teamName);
						$(this).attr("src", newSrc);
				});

				$("#"+divId).empty();
				$("#"+divId).html(dom);

				$("#"+divId).overlay({
					mask:{
						color:"#000",
						loadSpeed:500,
						opacity:0.5
					},
					closeOnClick:false,
					load:true,
					onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
					onClose:function(){
						$("#"+divId).remove();
					}
				});
			},
			error:function(){}
		});
	});//end team swap


	$(".upgradeInformationLink").bind("click", function(){
		var context = $(this),
		position = context.offset(),
		linkType = context.attr("rev"),
		linkData = null,
		options = null;

		if(linkType == "message"){
			linkData = context.attr("rel");
			options = { param:"message" };
		}else if(linkType == "template"){
			linkData = context.attr('href');
			options = { "popupInformation":linkData, param:"template" };
		};

		var	isTemplate = (linkType == "template");
		var	templateView = isTemplate ? "/global/gadgets/largeInformationLinkPopup.jsp" : "/global/gadgets/smallInformationLinkPopup.jsp";

		$.ajax({
			url: templateView,
			data: options,
			type: "post",
			dataType: "html",
			success: function(responseData){
				if($("#informationPopupModal").length){
					$("#informationPopupModal").remove().end();
				};

				var	containerString = isTemplate ? $('<div class="genericModal modalWindow largeInformationModal" />').html(responseData) : $('<div id="informationPopupModal" class="genericModal informationPopupContainer informationModal" />').html(responseData);

				$("body").append(containerString);

				var	modalTarget = isTemplate ? $(".largeInformationModal") : $(".informationPopupContainer");
				var	overlayLeft = (position.left - 84), overlayTop = (position.top - (modalTarget.outerHeight() - 14));

				if(isTemplate){
					modalTarget.overlay({
						mask: {
							color: "#000",
							loadSpeed: 500,
							opacity: 0.5
						},
						closeOnClick: false,
						load:true,
						onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
						onBeforeLoad: function(){},
						onClose: function(){
							$(".largeInformationModal").remove();
						}
					});
				}else{
					modalTarget.overlay({
						mask: {
							color:"#fff",
							loadSpeed:500,
							opacity:0
						},
						closeOnClick:false,
						load:true,
						left:overlayLeft,
						top:overlayTop,
						onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
						onBeforeLoad: function(){
							if(linkType == "message"){
								modalTarget.find(".messageContainer").html(linkData);
							};
						},
						onClose: function(){
							$(".informationPopupContainer").remove();
						}
					});
				}
			}
		});
		return false;
	});


	$(".financeTerms").click(function(){ /*suspect legacy*/
		$.ajax({
			url: "/navigation/gadgets/financePlanLookup.jsp",
			data: { "financePlanId":$("#financePlanId").val() },
			type: "post",
			dataType: "html",
			success: function(responseData){
				var	responseObject = responseData;

				$("#financePlanTerms").html(responseObject);
				$(".financePlanTermsModal").overlay({
					mask: {
						color: "#000",
						loadSpeed: 500,
						opacity: 0.5
					},
					onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
					closeOnClick: false,
					load:true,
					onBeforeLoad: function(){}
				}).load();
			},
			error: function(x, y, z){
				//console.log("error");
			}
		});
		return false;
	});

	var videoLink; //used for videos
	var s7_videoview;
	$(document).on("click", ".toolsModal", function(event){
		event.preventDefault();
			if($(this).hasClass("video")){
				videoLink = $(this).attr("data-video");
				//videoLink = "roomstogo/Serta iComfort-Insight_v4-AVS";
			};
			var url = $(this).attr("href");
			var divId = $(this).attr("rel");

		$.ajax({
			type: 'GET',
			url: url,
			beforeSend:function(){
				$("#"+divId).remove();
				$("body").append('<div id="' + divId + '" ><a class="close"></a></div>');
			},
			success:function(data){
				var dom = $(data);

				$("#"+divId).addClass("tModal");
				$("#"+divId).empty();
				$("#"+divId).html(dom);
				$("#"+divId).overlay({
					mask: {
						color: "#000",
						loadSpeed: 500,
						opacity: 0.5
					},
					onLoad:function(){ $("html, body").animate({ scrollTop: 0 }, "slow"); },
					closeOnClick: false,
					load:true,
					onBeforeLoad: function(){},
					onClose: function(){

					},
					onBeforeClose: function () {
						if(s7_videoview.videoplayer !== null){
							s7_videoview.videoplayer.stop();
							// remove resize method from viewer: this is throwing errors
							s7_videoview.videoplayer.resize = function () {
								return false;
							};
							// delete viewer instance
							s7_videoview = null;
						};
					}
				}).load();

				s7_videoview = new s7viewers.VideoViewer({
					containerId : "rtgVideo", // containerId must match the name of the viewer DIV
					params : {
						asset : videoLink, //roomstogo/Serta iComfort-Insight_v4-AVS this is the only variable that needs to be set for each video
						serverurl : "http://images2.roomstogo.com/is/image/",
						contenturl: "http://images2.roomstogo.com/skins/",
						config: "roomstogo/RoomstoGo_HTML5_Video",
						emailurl: "http://images2.roomstogo.com/s7/emailFriend",
						videoserverurl: "http://images2.roomstogo.com/is/content/",
						autoplay: "1"
					}
				});
				s7_videoview.init();
			},
			error:function(){}
		});

	});

	$(".tModal a.close").not(".tModalVideo.tModal a.close").click(function(){
		$(this).parent().fadeOut(400, function(){
			$(this).remove();
		});
		$("#exposeMask").fadeOut(400, function(){
			$(this).remove();
		});
	});//end .tModal a.close click

/****** end ajax modals */
/**************************** end modals */

/**************************** various methods */
	$(".fullMobileURL").click(function(){
		kill_cookie("StopMobile", null, "/", ".roomstogo.com", "" );
		window.location.reload();
	});

	$("#locateProductButton").click(function(){
		$("#productLocationsText").css("overflow-y", "scroll");
	});

	$(".fullMobileURLKids").click(function(){
		kill_cookie("StopMobile", null, "/", ".roomstogokids.com", "" );
		window.location.reload();
	});
/**************************** end various methods */










/**************************** cart/wishlist methods */
	$(".atg_store_main #atg_store_cart .lineItemRow .quantity .atg_store_numericInput").bind("change", function(event){
		event.preventDefault();
		event.stopPropagation();

		var context = $(this);
		var contextId = $(this).attr("id");

		if(context != undefined && context != ""){
			if(contextId.indexOf("quantityDesired") > -1){
				var targetContextIndex = contextId.substring("quantityDesired".length, contextId.length);
				if($("#newQty" + targetContextIndex) != undefined){
					$("#newQty" + targetContextIndex).val(context.val());
				}
			}
		}
	});

	$(".deleteRow").live("click", function(event){
		event.preventDefault();
		event.stopPropagation();

		var buttonRef = $(this);
		var relativeId = buttonRef.attr("id");
		var relativeUrl = $("#" + relativeId + "Form").val();

		var formContext = $(relativeUrl);
		var queryString = formContext.serialize();
		var submitAction = $("#" + relativeId + "Action").val();
		var actionIdentity=buttonRef.attr("rel");
		$.ajax({
			url:"/cart/actions/" + submitAction,
			data:queryString,
			type:"post",
			dataType:"json",
			success:function(responseData){
				if(actionIdentity =="wishlist"){
					getLatestWishlist();
				}else{
					getLatestCart();
				}
			},
			error:function(x, y, z){
				window.location.reload();
			}
		});
		return false;
	});

	$("#atg_store_checkout").bind("click", function(){
		if($("#loginStatus").val() == "false"){
			var	modalTarget = $('<div class="genericModal modalsContainer modalWindow moveToCheckout" />');

			$("body").append(modalTarget);
			modalTarget.overlay({
				mask:{
					color:"#000",
					loadSpeed:500,
					opacity:0.5
				},
				closeOnClick:false,
				load:true,
				onLoad:function(){
					var bodyOffset = $("body").offset().top - 24;

					$("html, body").animate({
						scrollTop:bodyOffset
					}, "1000");
				},
				onClose:function(){
					modalTarget.remove().end();
				},
				onBeforeLoad:function(){
					$.ajax({
						url:"/global/gadgets/loginModal.jsp?modalOption=moveToCheckout&modalRedirect=stayOnSamePage",
						type:"post",
						dataType:"html",
						success:function(responseData){
							modalTarget.append(responseData);
						},
						error:function(x, y, z){
							window.location.reload();
						}
					});
				}
			});
			return false;
		}else{
			return true;
		}
	});

	$("#miniCartCheckoutButton").click(function(){
		if($("#loginStatus").val() == "false"){
			var	modalTarget = $('<div class="genericModal modalsContainer modalWindow moveToCheckout" />');

			$("body").append(modalTarget);
			modalTarget.overlay({
				mask:{
					color:"#000",
					loadSpeed:500,
					opacity:0.5
				},
				closeOnClick:false,
				load:true,
				onLoad:function(){
					var bodyOffset = $("body").offset().top - 24;

					$("html, body").animate({
						scrollTop:bodyOffset
					}, "1000");
				},
				onClose:function(){
					modalTarget.remove().end();
				},
				onBeforeLoad:function(){
					$.ajax({
						url:"/global/gadgets/loginModal.jsp?modalOption=moveToCheckout&modalRedirect=stayOnSamePage",
						type:"post",
						dataType:"html",
						success:function(responseData){
							modalTarget.append(responseData);
						},
						error:function(x, y, z){
							window.location.reload();
						}
					});
				}
			});
			return false;
		}else{
			return true;
		}
	});

	$(".removeFromGiftList").bind("click", function(){
		var	context = $(this);
		context.parents(".lineItemRow").find(".wishlistRemove").trigger("click");
	});

	$("#addAllToBagButton").bind("click", function(event){
		var	queryString = $("#updateGiftlistForm").serialize();
		event.preventDefault();
		$.ajax({
			url:"/myaccount/actions/update-wishlist-submit.jsp",
			data:queryString,
			type:"post",
			dataType:"html",
			success:function(responseData){
				queryString = $("#addToOrderForm").serialize();
				$.ajax({
					url:"/myaccount/actions/add-all-to-bag-submit.jsp",
					type:"post",
					data:queryString,
					success:function(data){
						if($.trim(data) == "true"){
							$(".miniCartLink").trigger("click");
						};
					}
				});
			},
			error:function(x, y, z){
				return false;
			}
		});
		return false;
	});
	
/**************************** end cart/wishlist methods */



/**************************** grid page functions */
	function runFacetSidebar(isAjax){
	if($(".facetCollection").length){
		var facetCollection = $(".facetCollection");
			items = $(".facetCollection ul li"),
			count = items.size(),
			i = 10,
			sum = 0;

			if(count > i && !isAjax){
				$(items).slice(0,i).each(function(index){
		   sum += $(this).height();
		});
				sum += 40;

				$(facetCollection).css({"height":sum+'px'});
				$(facetCollection).parent().append('<ul><li class="showMore"><a href="#">[ More Options ]</a></li></ul>');
				$(facetCollection).prepend('<input id="collectionSearch" type="text" placeholder="Search Collections" class="facetSearch" /><div id="collectionSuggest"></div>');

			}else{
		if(count > i){
					$(items).slice(0,i).each(function(index){
						sum += $(this).height();
					});
					sum += 40;

					$(facetCollection).css({"height":sum+'px'});

					if($("#collectionSearch").length < 1){
			$(facetCollection).parent().append('<ul><li class="showMore"><a href="#">[ More Options ]</a></li></ul>');
			$(facetCollection).prepend('<input id="collectionSearch" type="text" placeholder="Search Collections" class="facetSearch" /><div id="collectionSuggest"></div>');
		};
			}else{
					$("#collectionSearch").add("#collectionSuggest").remove();
					$(facetCollection).css({"height":"auto"});
			};
			};
		};
	};//end runFacetSidebar
	runFacetSidebar();

	function runSuggest(isAjax){
		if ($.Autocomplete) { // if autocomplete exist
			var facetCollectionJSON = [];
			$(".facetCollection .facetOptions a").each(function(){
				var fname = $.trim($(this).text()),
					fdata = $(this).attr("href");

				facetCollectionJSON.push({ value: fname, data: fdata});
			});

		$("#collectionSearch").autocomplete({
			lookup: facetCollectionJSON,
			appendTo: $("#collectionSuggest"),
			onSelect: function (suggestion){
				window.location.assign(suggestion.data);
			}
		});
		}
	};//end runSuggest

	if($("#collectionSearch").length > 0){ runSuggest(); };


	$(document).on("click", ".showMore a", function(e){
		e.preventDefault();
		if($(".showMore a").hasClass("open")){
			$(".showMore a").text("[ More Options ]");
			$(".facetCollection").animate({ "height": sum+'px' }, 800);
		}else{
			$(".showMore a").text("[ Less Options ]");
			$(".facetCollection").animate({ "height": items.parent().height() }, 800);
	};
		$(".showMore a").toggleClass("open");
	});//end .showMore a click

	function runPagination(isAjax){
		if($(".paginationWrap").length > 1){
			$(".paginationWrap").each(function(){

				var paginationWrap = $(this),
					paginationDiv = $(paginationWrap).find("div.pagination"),
					paginationUl = $(paginationDiv).find("ul"),
					paginationList = $(paginationUl).find("li"),
					paginationItems =  $(paginationList).toArray(),
					paginationActive = $(paginationUl).find("li.active"),

					paginationPrev = $(paginationActive).prevAll("li"), // all pages before active page
					paginationNext = $(paginationActive).nextAll("li"), // all pages after active page
					paginationFirst = $(paginationUl).find("li:first").addClass("first"), // first page
					paginationLast = $(paginationUl).find("li:last").addClass("last"); // last page

				$(paginationActive).show(); // always show active page link
				$(paginationNext).slice(0,3).show(); // display next 3 on first page
				$(paginationPrev).slice(0,3).show(); // display prev 3 on last page

				//iterate through this array in reverse order
				for(var z = paginationPrev.length - 1; z >= 0; --z){
					if($(paginationFirst).hasClass("active")){
						//$(paginationNext).slice(0,3).show();
					}else if($(paginationLast).hasClass("active")){
						//$(paginationPrev).slice(0,3).show();
					}
					else if($(z).slice(0,3)){ // after 3rd element of the array, place active element in middle of 4 items
						$(paginationPrev).hide().slice(0,2).show();
						$(paginationNext).hide().slice(0,2).show();
					}
				}

				var paginationPrevPage = $(paginationActive).prev("li").find("a").attr("href"),
					paginationNextPage = $(paginationActive).next("li").find("a").attr("href"),
					paginationFirstPage = $(paginationFirst).find("a").attr("href"),
					paginationLastPage = $(paginationLast).find("a").attr("href"),

					prevPageMarkup = '<a rel="nofollow" title="Prev Page" href="'+ paginationPrevPage +'" class="paginationLeft" id="paginationLink">&lt;</a>',
					firstPageMarkup = '<a rel="nofollow" title="First" href="'+ paginationFirstPage +'" class="paginationLeft" id="paginationLink">First</a>',
					lastPageMarkup = '<a rel="nofollow" title="Last" href="'+ paginationLastPage +'" class="paginationRight" id="paginationLink">Last</a>',
					nextPageMarkup = '<a rel="nofollow" title="Next Page" href="'+ paginationNextPage +'" class="paginationRight" id="paginationLink">&gt;</a>';

				if($(paginationPrev).length > 0){ // if Prev page exist
					$(paginationDiv).after(firstPageMarkup + prevPageMarkup);
				}

				if($(paginationNext).length > 0){ // if next page page exist
					$(paginationDiv).before(nextPageMarkup + lastPageMarkup);
				}

				var paginationLink = $(paginationWrap).find("#paginationLink"),
					paginationLeft = $(paginationWrap).find(".paginationLeft"),
					paginationRight = $(paginationWrap).find(".paginationRight");

				// delete extra elements
				$(paginationPrev).slice(3).remove();
				$(paginationNext).slice(3).remove();

				if($(paginationFirst).is(":visible")) { // if page first is shown, remove "first" link
					$(paginationLeft).filter("[title='First']").remove();
				}

				if($(paginationLast).is(":visible")) { // if page last is shown, remove "last" link
					$(paginationRight).filter("[title='Last']").remove();
				}
			});
		};
	};//end runPagination
	runPagination();





/**************************** grid page facet ajax functions */
/*
if($.browser.msie && $.browser.version < 10){}else{

	var aUrl, newData, newSidebar, newHref, newText, thisTitle;
	function runAjax(aUrl, aCount, onlyPanel){
		if(aUrl != "#" && aCount != "(1)"){
			$("html,body").animate({ scrollTop:0 }, 500);

			$.ajax({
				type: "GET",
				url: aUrl,
				beforeSend:function(){
					window.history.pushState("", "", aUrl);
					$("#ajaxContainer").add(".twoColumnSidebar").fadeTo("fast", 0.2);
					$("<img class='spinner' src='/static/img/svg/spinningBubbles.svg' />").appendTo($("#ajaxSpinner"));
				},
				success:function(data){
					if(onlyPanel){
						newData = $(data).find("#ajaxContainer").html();
						$("#ajaxContainer").empty().append(newData);
					}else{
						newData = $(data).find("#ajaxContainer").html();
						$("#ajaxContainer").empty().append(newData);

						newSidebar = $(data).find(".twoColumnSidebar").html();
						$(".twoColumnSidebar").empty().append(newSidebar);
					}
				},
				complete:function(){
					$("#ajaxContainer").add(".twoColumnSidebar").fadeTo("fast", 1);
					taskDone(function(){
						if(onlyPanel){
							runPagination(true);
						}else{
							runPagination(true);
							runFacetSidebar(true);
							runSuggest(true);
	};
					}, 500, "runSidebar");
				},
				error:function(){}
			});
		};//end # check
	};//end runAjax

	$(document).on("click", ".twoColumnSidebar a[href]", function(e){
		e.preventDefault();
		aUrl = $(this).attr("href");
		aCount = $(this).find(".productCount").text();
		runAjax(aUrl, aCount);
	});//end atg_store_facets a click


	$(document).on("click", ".paginationWrap a[href]", function(e){
		e.preventDefault();
		aUrl = $(this).attr("href");
		runAjax(aUrl, null, true);
	});//end paginationWrap a click


	$(document).on("change", "#sortBySelect", function(e){
		e.preventDefault();
		aUrl = $(this).val();
		runAjax(aUrl, null, true);
	});

	// handle the back and forward buttons
	$(window).bind("popstate", function(event) {
		$.ajax({
			type: "GET",
			url: window.location.href,
			beforeSend:function(){
				$("#ajaxContainer").add(".twoColumnSidebar").fadeTo("fast", 0.2);
				$("<img class='spinner' src='/static/img/svg/spinningBubbles.svg' />").appendTo($("#ajaxSpinner"));
			},
			success:function(data){
				newData = $(data).find("#ajaxContainer").html();
				newSidebar = $(data).find(".twoColumnSidebar").html();
				$("#ajaxContainer").empty().append(newData);
				$(".twoColumnSidebar").empty().append(newSidebar);
			},
			complete:function(){
				//$(".spinner").remove();
				$("#ajaxContainer").add(".twoColumnSidebar").fadeTo("fast", 1);
				taskDone(function(){
					runFacetSidebar(true);
					runPagination(true);
					runSuggest(true);
				}, 500, "runSidebar");
			},
			error:function(){}
		});
	});

	// when the page first loads update the history entry with the URL
	history.replaceState({ path: window.location.href }, "");

};//end no IE8 / IE9 check
*/
/**************************** end grid page facet ajax functions */

/**************************** end grid page functions */














/**************************** pdp page functions */
	var swatchPickerContainer = $('.swatchPickerContainer'),
		pickerContainer = $('.atg_store_pickerContainer'),
		colorsBlock = $('strong.selector'),
		colorsBlockTotal = $(colorsBlock).size(),
		colorsBlockItems = $(colorsBlock).toArray(),
		colorsBlockHeight = $(colorsBlock).parent().height(),
		colorsBlockHeightTotal = colorsBlockHeight * colorsBlockTotal,
		i = 1;

	//$(colorsBlock).sameHeight();
	$(pickerContainer).css("max-height",colorsBlockHeight);

	$(".showMoreColors, .viewAllProducts").bind("click", function(event){

		$(colorsBlockItems).slice(0,colorsBlockTotal).css('display','inline-block');

		var context = $(this),
			isExpanded = context.hasClass("expanded"),
			toggleText = { "moreColors": { "labels" : [ "More Colors", "Fewer Colors" ] }, "viewProducts": { "labels" : [ "View All", "View Less" ] } },
			textKey = (context.hasClass("showMoreColors")) ? "moreColors" : "viewProducts";

		i++

		if(isExpanded){
			context.prev().animate({ "max-height": colorsBlockHeight }, 750, function(){
				context.html(toggleText[textKey].labels[0]);
				context.toggleClass("expanded");
			});
		}else{
			context.prev().animate({ "max-height": colorsBlockHeightTotal }, 750, function(){
				context.html(toggleText[textKey].labels[1]);
				context.toggleClass("expanded");
			});
		}

		return false;
	});

	$("#addToCartSubmit.addToCart, .recomendedProduct").live("click", function(event){
		event.preventDefault();
		event.stopPropagation();

		var buttonRef = $(this),
			relativeId = buttonRef.attr("id"),
			fromcart = buttonRef.attr("rel"),
			relativeUrl = $("#" + relativeId + "Form").val(),
			formContext = $(relativeUrl),
			queryString = formContext.serialize(),
			submitAction = $("#" + relativeId + "Action").val();

		if(buttonRef.hasClass("adding")){ return false; };

		buttonRef.addClass("adding");
		if(buttonRef.attr("id") == "addToCartSubmit"){
			buttonRef.attr("osrc", buttonRef.attr("src"));
		};

		$.ajax({
			url: "/browse/templates/actions/" + submitAction,
			data: queryString,
			type: "post",
			dataType: "json",
			success: function(responseData){
				var	resultObject = responseData;

				if(resultObject == null){ return false; };

				if(resultObject.step == "addtocart"){
					for (var i = 0; i < resultObject.forms.length; i++){
						//display error message
						if(resultObject.forms[i].result == "error"){
							window.location.reload();
							return false;
						}
					}
				};

				if(fromcart != null && fromcart == "fromcart"){
					window.location = "/cart/cart.jsp";
					return false;
				};

				var cartOffset = $(".cartListContainer").offset().top - 24;

				$(".miniCartContainer:visible").slideToggle("250");
				$("html, body").animate({ scrollTop:cartOffset }, "1000", function(){
					var target = $(this);

					if(target.is("body")){
						$(".miniCartLink").triggerHandler("click", "addtocart");
					}
				});
			},
			complete: function(){
				buttonRef.removeClass("adding");
				var productIdFieldName="#"+relativeId+"ProductId";
				if(typeof userDisplayedPage != "undefined" && userDisplayedPage == "wishlist"){
					wishlistToCart($.trim($(productIdFieldName).val()));
				}else{
					callOmnitureAddToCart($.trim($(productIdFieldName).val()));
				}
			},
			error: function(x, y, z){
				buttonRef.removeClass("adding");
				return false;
			}
		});
		return false;
	});



	$(".fromWishList").live("click", function(event){
		event.preventDefault();
		event.stopPropagation();

		var buttonRef = $(this),
			relativeId = buttonRef.attr("id"),
			fromcart = buttonRef.attr("rel"),
			//relativeUrl = $("#" + relativeId + "Form").val(),
			relativeUrl = $(this).next().val(),
			formContext = $(relativeUrl),
			queryString = formContext.serialize(),
			//submitAction = $("#" + relativeId + "Action").val();
			submitAction = $(this).next().next().val();

		if(buttonRef.hasClass("adding")){ return false; }

		buttonRef.addClass("adding");
		if(buttonRef.attr("id") == "addToCartSubmit"){
			buttonRef.attr("osrc", buttonRef.attr("src"));
		}

		$.ajax({
			url: "/browse/templates/actions/" + submitAction,
			data: queryString,
			type: "post",
			dataType: "json",
			success: function(responseData){
				var	resultObject = responseData;

				if(resultObject == null){ return false; };

				if(resultObject.step == "addtocart"){
					for (var i = 0; i < resultObject.forms.length; i++){
						//display error message
						if(resultObject.forms[i].result == "error"){
							window.location.reload();
							return false;
						};
					};
				};

				if(fromcart != null && fromcart == 'fromcart'){
					window.location = "/cart/cart.jsp";
					return false;
				};

				var cartOffset = $(".cartListContainer").offset().top - 24;

				$(".miniCartContainer:visible").slideToggle("250");
				$("html, body").animate({ scrollTop:cartOffset }, "1000", function(){
					var target = $(this);

					if(target.is("body")){
						$(".miniCartLink").triggerHandler("click", "addtocart");
					}
				});
			},
			complete: function(){
				buttonRef.removeClass("adding");
				var productIdFieldName="#"+relativeId+"ProductId";
				if(typeof userDisplayedPage != "undefined" && userDisplayedPage == "wishlist"){
					wishlistToCart($.trim($(productIdFieldName).val()));
				}else{
					callOmnitureAddToCart($.trim($(productIdFieldName).val()));
				}
			},
			error: function(x, y, z){
				buttonRef.removeClass("adding");
				return false;
			}
		});
		return false;
	});


	$(".atg_store_addressGroup").sameHeight(); // additional address book


	$(".sendEmailAFriend").bind("click", function(event){
		event.preventDefault();
		event.stopPropagation();

		var buttonRef = $(this);
		var relativeId = buttonRef.attr("id");
		var relativeUrl = $("#" + relativeId + "Form").val();

		var formContext = $(relativeUrl);
		var queryString = formContext.serialize();
		var submitAction = $("#" + relativeId + "Action").val();

		$.ajax({
			url: "/browse/templates/actions/" + submitAction,
			data: queryString,
			type: "post",
			dataType: "json",
			success: function(responseData){
				var	resultObject = responseData;

				if(resultObject == null){
					return false;
				};

				if(resultObject.form == "EmailAFriendForm"){
					if(resultObject.result == "pageerror"){
						var callback = (resultObject.redirect == null) ? "" : resultObject.redirect;
					}else if(resultObject.result == "message"){
					}else if(resultObject.result == "success"){
						var	productId = $("#productId").val();
						$("#EmailAFriendForm").load("/browse/gadgets/emailAFriendConfirm.jsp?productId=" + productId);
					}else if(resultObject.result == "error"){
						var errors = resultObject.errors;
					}
				}
			},
			error: function(x, y, z){
				return false;
			}
		});
		return false;
	});



	$("#wishListLink").click(function(event, extra){
		var context = $(this),
			linkPosition = context.position(),
			miniCartLinkHeight = context.outerHeight();

		if(context.hasClass("disabled")){
			return false;
		};

		if($("#miniCartModal").is(":visible")){
			animateCart();
		};

		if($("#wishListModal").is(":visible")){
			animateWishlist();
		};

		if($("#wishListModal").is(":hidden")){
			context.toggleClass("wishListOpened");
			$("#wishListModal").css({ "top":(linkPosition.top + miniCartLinkHeight), "left":linkPosition.left, "margin-left":"-259px" });
			animateWishlist();
		};

		var wishlistCallback = function(skuId){
			//animateWishlist();

			if(extra == "addtowishlist"){
				omnitureAddToWishlist(skuId);
				$(".wishListOpened").toggleClass("disabled");

				setTimeout(
				function(){
					$("#wishListModal .miniCartCheckoutContainer:hidden").show();
					$(".wishListOpened").toggleClass("disabled");
					animateWishlist();
				}, 3000);
			}
			if(extra == "addisofatowishlist" || extra == "addmonogramtowishlist"){
				$(".wishListOpened").toggleClass("disabled");
				setTimeout(
				function(){
					$("#wishListModal .miniCartCheckoutContainer:hidden").show();
					$(".wishListOpened").toggleClass("disabled");
					animateWishlist();
				}, 3000);
			}
		};
		getLatestWishlist(wishlistCallback);
		return false;
	});


	$("#addToWishlistSubmit").click(function(event){
		event.preventDefault();
		event.stopPropagation();

		var buttonRef = $(this),
			relativeId = buttonRef.attr("id"),
			relativeUrl = $("#" + relativeId + "Form").val(),
			formContext = $(relativeUrl),
			queryString = formContext.serialize(),
			submitAction = $("#" + relativeId + "Action").val();

		$.ajax({
			url: "/browse/templates/actions/" + submitAction,
			data: queryString,
			type: "post",
			dataType: "json",
			success: function(responseData){
				var	resultObject = responseData;

				if(resultObject == null){
					window.location.reload();
					return false;
				};

				if(resultObject.form == "addtowishlist"){
					if(resultObject.result == "pageerror"){
						var callback = (resultObject.redirect == null) ? "" : resultObject.redirect;
					}else if(resultObject.result == "message"){
					}else if(resultObject.result == "failure"){
						var cartOffset = $(".cartListContainer").offset().top - 24;

						$(".miniCartContainer:visible").slideToggle("250");

						$("html, body").animate({scrollTop:cartOffset}, "3000", function(){
							var target = $(this);

							if(target.is("body")){
								$("#wishListLink").triggerHandler("click", "addtowishlist");
							}
						});

					}else if(resultObject.result == "success"){

						var cartOffset = $(".cartListContainer").offset().top - 24;

						$(".miniCartContainer:visible").slideToggle("250");

						$("html, body").animate({scrollTop:cartOffset}, "3000", function(){
							var target = $(this);

							if(target.is("body")){
								$("#wishListLink").triggerHandler("click", "addtowishlist");
							}
						});

					}else if(resultObject.result == "failure"){

						var errors = resultObject.errors;

						if(errors != undefined && typeof errors == "string" && errors.indexOf("notLoggedIn") >= 0){
							$(".profileCartBlock div#atg_store_logOut.blockContainer ul li a.modalLogins").get(0).click();

							setTimeout(function(){
								postModalMessage("loginModalFrame", "Please Sign In or Create Account to add to wishlist.");
							}, 700);
						}
					}
				}
			},
			error: function(x, y, z){
				window.location.reload();
			}
		});
		return false;
	});

	$(".closeEmailAFriend").live("click", function(event){
		$(this).parents(".modalWindow").find("a.close").trigger("click");
		return false;
	});

	if($(".zoomWidget").length > 0){

		var imageMask = $("#imageMask"),
			zoomWidget = $(".zoomWidget"),
			productImage = $("#productImage"),
			loadingWait = $(".loadingWait"),
			zoomerScroller = $("#zoomerScroller");
		zoomerState = "default";

		$(".zoomWidget a").click(function(event){
			event.preventDefault();
			var activeZoomControl = $(this);

			if(activeZoomControl.hasClass("active")){
				return false;
			};

			var clickedZoomerState = activeZoomControl.attr("rel"),
				currentZoomerState = $(this).find(".upper .active").attr("rel"),
				zoomWidgetActive = $(zoomWidget).find(".active"),

				imageMaskStates ={ "default":"imageMask", "zoomed":"imageMaskZoomed", "panned":"imageMaskPanned" },
				imageStatesIds ={ "default":"#imageDefault", "zoomed":"#imageZoomed", "panned":"#imagePanned" },
				zoomedImageStates ={ "default":"productImage", "zoomed":"productImageZoomed", "panned":"productImagePanned" },
				zoomerControlStates ={ "default":"zoomerScrollerContainer", "zoomed":"zoomerScrollerContainerZoomed", "panned":"zoomerScrollerContainerPanned" };

			zoomWidgetActive.toggleClass("active");
			$("[rel='"+clickedZoomerState+"']").addClass("active");

			// Check Loading
			function checkLoading(){
				if(!$(imageMask).hasClass("loaded")){
					$(imageMask).addClass("loading");
					$(loadingWait).css("display","block");
					$(loadingWait).fadeTo(0,0.7);
				};
			};//end checkLoading

			function preAnimation(targetState){

				var	targetImage = $(imageStatesIds[targetState])
					productImage = $(productImage),
					img_presets ={ "default": "$PDP_Primary_525x366$",
									"zoomed": "$PDP_Zoom_912x636$",
									"panned": "$PDP_Pan_3000x2091$" };

				var	imageSrc =($(productImage).attr("src") != targetImage.val()) ? $(productImage).attr("src", targetImage.val()) : $(productImage).attr("src"),
					img_url = productImage.attr("src"),
					img_new_url = img_url.replace(img_presets[currentZoomerState],img_presets[clickedZoomerState]),
					$img = $("<img/>")[0];

				$img.src = img_new_url;
				$(imageMask).removeClass("loaded");

				var spinner = setTimeout(checkLoading, 3000),
					fbIframeWidget = $(".fb_iframe_widget"),
					storeContentText = $(".storeContentText"),
					productSummaryContainer = $(".atg_store_productSummaryContainer"),
					productImageContainer = $(".atg_store_productImageContainer"),
					draggableMasked = $("#draggableMasked"),
					panhandle = $("#panhandle");

				if(targetState == "default"){
					$(fbIframeWidget).fadeOut(0);
					$(storeContentText).animate({ "padding-top":"8px" }, 350);
					$(productSummaryContainer).animate( { "margin-top":"-444px" }, 850, function(){
						try{
							loadFacebookWidget();
						}
						catch(exception){
							// do nothing
						}
					});

					$(productImageContainer).animate( { "height":"444px" }, 150);
				}
				else{
					var	imageMaskHeight = "646",
						//contentContainerHeight = $(".contentHeaderContainer").outerHeight(),
						storeContentPadding = (imageMaskHeight) + "px";

					$(fbIframeWidget).fadeOut(0);
					$(productImageContainer).animate( { "height":"0px" }, 850);
					$(storeContentText).css("position","relative");

					$(storeContentText).animate({ "padding-top":storeContentPadding}, 850, function(){
						try{
							loadFacebookWidget();
						}
						catch(exception){
							// do nothing
						}
					});

					$(productSummaryContainer).animate( { "margin-top":"0px" }, 350);

					$(".loadAlternateImage").live("click", function(){ // includedInThisRoom
						var includedInThisRoomImg = $("#includedInThisRoom").find("img").attr("src");
						$("#includedInThisRoom").attr("rel",includedInThisRoomImg);
					});
				}

				if(!$.browser.msie){ /// Fix zoomer spinner for IE
					$($img).load(function(){
						productImage.attr("src", $img.src);
						$(imageMask).removeClass("loading").addClass("loaded");
						$(loadingWait).css("display","none");
						clearTimeout(spinner);
						if(targetState == "panned"){
							if((navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPhone") != -1)){
								$(draggableMasked).zoombie({on: "toggle"});
								$(draggableMasked).prepend("<div class='zoomTip'>Tap to Zoom</div>");
							}else{
								$(draggableMasked).zoombie({on: "grab"});
								$(draggableMasked).prepend("<div class='zoomTip'>Click &amp; Drag to Zoom</div>");
							};
						}else{
							$(".zoomImg").remove();
							$(".zoomTip").remove();
						};
					});
				}else{
					$.ajax({
						cache: false,
						url: $img.src
					}).always(function(){
						productImage.attr("src", $img.src);

						$(imageMask).removeClass("loading").addClass("loaded");
						$(loadingWait).css("display","none");
						clearTimeout(spinner);
						if(targetState == "panned"){
							if((navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPhone") != -1)){
								$(draggableMasked).zoombie({on: "toggle"});
								$(draggableMasked).prepend("<div class='zoomTip'>Tap to Zoom</div>");
							}else{
								$(draggableMasked).zoombie({on: "grab"});
								$(draggableMasked).prepend("<div class='zoomTip'>Click &amp; Drag to Zoom</div>");
							};
						}else{
							$(".zoomImg").remove();
							$(".zoomTip").remove();
						};
					});
				};

				var currentImageState = $(productImage).attr("class"),
					currentMaskState = $(imageMask).attr("class"),
					currentControlState = $(zoomerScroller).attr("class");

				$(productImage).removeClass(currentImageState).addClass(zoomedImageStates[targetState] + " fillerImage");
				$(imageMask).removeClass(currentMaskState).addClass(imageMaskStates[targetState]);

				if ($(zoomerScroller).hasClass("alternateViews")) { // for items with alternative view scroll
					$(zoomerScroller).removeClass(currentControlState).addClass(zoomerControlStates[targetState] + " alternateViews");
				} else if($(zoomerScroller).hasClass("mattressZoomer")){ // room scroll
					$(zoomerScroller).removeClass(currentControlState).addClass(zoomerControlStates[targetState] + " imgGallery gridWrap mattressZoomer");
				} else {
					$(zoomerScroller).removeClass(currentControlState).addClass(zoomerControlStates[targetState]);
				}

			};//end preAnimation

			function animation(targetState){
				if(targetState != "default"){
					$(imageMask).animate({
						width: "912px",
						height: "636px"
					}, 400);
					$(productImage).animate({
						width: "912px",
						height: "636px"
					}, 400);
					$("#swapButton").hide();  // refractor // after zoom state, swap team and new default image is invalid // quick solution for defect #D-02328
				}else if(targetState == "default"){
					$(imageMask).animate({
						width: "525px",
						height: "444px"
					}, 400);
					$(productImage).animate({
						width: "525px",
						height: "366px"
					}, 400);
					$("#swapButton").show();
				};
			};//end animation

			// GOOGLE ANALYTICS

			if((currentZoomerState == "default" && clickedZoomerState == "zoomed") || (clickedZoomerState == "panned") || (clickedZoomerState == "zoomed")){
				gaEvent("ZoomOut");
			};

			if((currentZoomerState == "panned" && clickedZoomerState == "zoomed")  || (clickedZoomerState == "default")){
				gaEvent("ZoomIn");
			};

			preAnimation(clickedZoomerState);
			animation(clickedZoomerState);
			zoomerState = clickedZoomerState;

			return false;
		});

	};//end zoomWidget

/**************************** end pdp page functions */

/******************************************************* IE specific ***************/
	if($("html").attr("data-useragent")){
		if($("html").attr("data-useragent").indexOf("MSIE 8") > 1){

			//fades in details & see in store buttons on grid
			$(".productList li a").hover(
				function(){
					$(".detailButtons").fadeOut();
					$(this).next().fadeIn();
				},
				function(){
					$(this).next().fadeOut();
				}
			);


		};//end IE 8 detect
	};
/******************************************************* end IE specific ***************/

	/// roomConfigurator, keeping height consistent during item overflow
	$('#configuratorDropDown').on('click', function() {
		$('.changeableProductListConfigure').sameHeight();
		$('.selectRoomContainer').each(function(){
			var roomSetContainerHeight = $(this).prev('.roomSetContainer').height(); 
			$(this).height(roomSetContainerHeight);
		});
	});

	///

	$(".emailSubmitModal .close").on('click', function(){
		$(this).parent().find(".errorBlock").remove();
	});


});//end dom ready
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/*********************************************************************** end DOM ready - keep at end of file */



































/*
 * Some methods for omniture scenarios (not all the scenarios) are written here, use that methods and pass the appropriate
 * arguments/parameter to the methods at your appropriate places in the code.
 * Already script.js and roomstogo.checkout.js and frg_omniture_tags.jsp files are there to capture other scenrios.
 */


// WishList

function shareWishlistFacebook(){
	naf.omni.shareWishlist("facebook");
}

function shareWishlistEmail(){
	naf.omni.shareWishlist("email");
}

/*
 * one or more products to add, here skuIds=";sku1" or skuIds=";sku1,;sku2,;sku3"
 * wishlistToCart() method below is not used, instead use omnitureAddToWishlist() down below.
 */
function wishlistToCart(skuIds){
	naf.omni.wishlistToCart(skuIds);
}

//share product page

function shareContentFacebook(skuId){
	naf.omni.shareContent(skuId, "facebook");
}

function shareContentEmail(skuId){
	naf.omni.shareContent(skuId, "email");
}


function shareContentPrint(skuId){
	naf.omni.shareContent(skuId, "print");
}


/*******************************************************/

function initiateChat(){
	naf.omni.initiateChat();
}

//Location="dallas, tx"
function changeLocation(oldLocation, newLocation){
	naf.omni.changeLocation(oldLocation, newLocation);
};//end changeLocation


function callOmnitureAddToCart(skuId){
	naf.omni.addToCart(skuId);
};//end callOmnitureAddToCart

function omnitureAddToCart(){
	$.ajax({
		url: "/cart/json/cartItems.jsp",
		data:{},
		type: "post",
		dataType: "json",
		success: function(responseData){
			var productData = responseData;
			var itemsCount = responseData.itemCount;
			var itemsArray = responseData.items;
			var	skuId = itemsArray[itemsArray.length-1].skuId.split("-")[1];
			//alert(scCategoryName);alert(scSkuId);
			// get category name
			var scSkuId=skuId;
			var scCategoryName="";

			if(typeof scCategoryName != "undefined"){
				if(scCategoryName){
					s.prop3 = scCategoryName;  scCategoryName = "";
				};
			}else{
				if(typeof parentCategoryName != "undefined"){
					s.prop3 = parentCategoryName;
				}else{
					s.prop3="isofa";
				};
			};

			// get skuID
			if(scSkuId){
				skuId = scSkuId; scSkuId="";
			}else{
				var Url = '/' + document.URL;
				var cartproduct = Url.substring(Url.lastIndexOf('/')+1);
				if(cartproduct == ""){ Url = Url.substring(0, Url.length - 1); cartproduct = Url.substring(Url.lastIndexOf('/')+1); }
				skuId = cartproduct;
			}

			//alert("FINAL SKU: " + skuId);	alert("FINAL SUBCAT: " + s.prop3);

			if(s.prop1 != null && s.prop1 != "" && s.prop3 != null && s.prop3 != ""){
				naf.omni.addToCart(";" + skuId + ";;;;eVar1=" + s.prop1 + "|eVar9=" + s.prop3);
			}
			else if(s.prop1 != null && s.prop1 != "" && (s.prop3 == null || s.prop3 == "")){
				naf.omni.addToCart(";" + skuId + ";;;;eVar1=" + s.prop1);
			}
			else if((s.prop1 != null || s.prop1 != "") && s.prop3 != null && s.prop3 != ""){
				naf.omni.addToCart(";" + skuId + ";;;;eVar9=" + s.prop3);
			}
			if((s.prop1 == null || s.prop1 == "") && (s.prop3 == null || s.prop3 == "")){
				naf.omni.addToCart(";" + skuId);
			}

			/*
			s.linkTrackVars="products,events";
			//prop1, prop2 and prop3 are being derived in frg_omniture_tags.jsp included in  product.jsp page
			if(s.prop3 != null && s.prop3 != ""){
				s.products = ";" + itemsArray[itemsArray.length-1].skuId + ";;;;eVar1="+s.prop1+"|evar9="+s.prop2+":"+s.prop3;
			}
			else {
				s.products = ";" + itemsArray[itemsArray.length-1].skuId + ";;;;eVar1="+s.prop1+"|evar9="+s.prop2;
			}
			*/

			if(itemsCount == 1){
				//s.linkTrackEvents="scAdd,scOpen";
				//s.events = "scAdd,scOpen";
				//s.tl(true, 'o', 'AddToCart - Add');

				//_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Open-Add',  escape(itemsArray[itemsArray.length-1].name)]);
				//dataLayer.push({
				//	'event': 'gaEvent',
				//	'eventCategory': 'Cart Event',
				//	'eventAction' :"Cart Open-Add",
				//	'eventLabel' : escape(itemsArray[itemsArray.length-1].name),
				//});
			}else{
				//s.linkTrackEvents="scAdd";
				//s.events = "scAdd";
				//s.products = ";" + itemsArray[itemsArray.length-1].skuId + ";;;;eVar4=" + omnitureData.eVar4;
				//s.tl(true, 'o', 'AddToCart - Add');

				//_gaq.push(['ga._trackEvent', 'Cart Event', 'Cart Add', escape(itemsArray[itemsArray.length-1].name)]);
				//dataLayer.push({
				//	'event': 'gaEvent',
				//	'eventCategory': 'Cart Event',
				//	'eventAction' :"Cart Add",
				//	'eventLabel' : escape(itemsArray[itemsArray.length-1].name),
				//});
			}
		},
		error: function(x,y,z){
			//alert(x + '\n' + y + '\n' + z);
		}
	});
};//end omnitureAddToCart

//Removes an item from the cart
function removeFromCart(skuId){
	naf.omni.removeFromCart(skuId);
};//end removeFromCart

//AddToWishlist
function omnitureAddToWishlist(skuId){
	s.pageName = "store:account:wishlist:add";

	s.linkTrackVars='products,events';
	s.linkTrackEvents='event12';
	s.channel = "store";
	s.prop1 = "account";
	s.prop2 = "wishlist";
	s.events = "event12";
	s.products = ";" + skuId;

	s.tl(true,'o','WishList - Add');
}

//RemoveFromWishList
function omnitureRemoveFromWishlist(skuId){
	s.pageName = "store:account:wishlist:remove";

	s.linkTrackVars='products,events';
	s.linkTrackEvents='event13';
	s.channel = "store";
	s.prop1 = "account";
	s.prop2 = "wishlist";
	s.events = "event13";
	s.products = ";" + skuId;

	s.tl(true,'o','WishList - Remove');
}

//CHECKOUT STEPS

//checkout 2nd step (delivery schedule)
function omnitureCheckoutDelivery(skuIds){
	nafData.pagename = "store:checkout:delivery";
	nafData.site_section = "store:checkout";
	nafData.events="event5";
	nafData.products=";"+skuIds;
}

//checkout 3rd step (showing order summary)
function omnitureCheckoutOrderSummary(skuIds){
	nafData.pagename = "store:checkout:ordersummary";
	nafData.site_section = "store:checkout";
	nafData.events="event6";
	nafData.products=";"+skuIds;
}

//checkout 4th step (payment)
function omnitureCheckoutPayment(skuIds){
	nafData.pagename = "store:checkout:payment";
	nafData.site_section = "store:checkout";
	nafData.events="event7";
	nafData.products=";"+skuIds;
}


//checkout 5th step (orderConfirmation)
function omnitureCheckoutConfirmation(skuIds){
	nafData.pagename = "store:checkout:confirmation";
	nafData.site_section = "store:checkout";
	nafData.events="event7";
	nafData.products=";"+skuIds;
}

//Tracking Pixel, it needs orderid and orderTotal
function pixelCheckoutConfirmation(orderId, orderTotal, zipCode){
	$('body').append('<s'+'cript language="javascript" src="https://view.atdmt.com/jaction/bvkrtk_RoomsToGoTY_1/v3/ato.'+'orderId'+'/atm1.1/atm2.'+'orderTotal'+'/atc1.'+'orderId'+'"></s'+'cript>');
}


