/**
 * product.js
 *
 * Client-side functionalities for the product pages
 *
 * @author Ivo Janssen <ivo@codedealers.com>
 * @package plant_market
 * @subpackage scripts
 */
$(document).ready(function(){
	
	// Set the review count	
	reviewcount = $("#reviews .container > ul > li").index();

	if ( reviewcount > 2 ) {		
		
		// Hide all reviews except the first three
		$("#reviews .container ul li:nth-child(n+4)").hide();		
		
		// Add the Show more reviews button
		if(!$("#reviews .container .showall").length) $("#reviews .container").append("<span class=\"showall\">Show more reviews</span>")

		// Toggle more reviews on click of button
		$("#reviews .container .showall").click(function(){

			if ($(".reviewsshowing").length) {				
				// Hide reviews if they're showing
				$("#reviews .container ul li:nth-child(n+4)").hide()
				$(this).html("Show more reviews").removeClass("reviewsshowing");
				return false;
			} 
			else {
				// Show reviews if they're hidden
				$("#reviews .container ul li").show();
				$(this).html("Hide more reviews").addClass("reviewsshowing");
			}
		
		});
	
	}
	
	// Make links/forms on condensed page open in parent except colorway links
	if ($("body.condensed").length) $("a").not("#colorways a").attr("target", "_parent");

	// Add to cart interceptor and display
	$("#product_add").click(function(){
		
		// Disable button and change text
		newText = $(this).attr("value");
		$(this).attr("value", "Adding to your cart...").attr("disabled", "disabled");
		
		// Find size if applicable
		size = false;
		if ($("#product_size").attr("disabled") != true) size = $("#product_size").attr("value");
		
		// Get product and variation ids
		addToCart($("#product_id").attr("value"), $("#variation_id").attr("value"), size);
		
		return false;
		
		
	});
	
	// Size UI transformer
	if ($("#product_size").length) {
		$("#product_size").hide().before("<ul id=\"sizeselector\" />");
		$("#product_size option").each(function() {
			if ($(this).val() == "none") return true;
			sizeOption = $("<li id=\"size" + $(this).val() + "\" title=\"This size is available.\" onclick=\"selectSize(this);\">" + $(this).text() + "</li>");
			if ($(this).attr("disabled")) sizeOption.addClass("unavailable").attr("title", "This size is sold out!");
			else if ($(this).attr("selected")) sizeOption.addClass("active");
			sizeOption.data("convert", $(this).data("convert"));
			$("#sizeselector").append(sizeOption);	
		});
		
		// Hovers on size selections
		$("#sizeselector li").mouseover(function(e) {
			hoveredSize = $(this).attr("id").replace(/size/, "");
			if (typeof(allSizes[hoveredSize]) != "undefined" && $(this).data("convert") == true) {
				if (!$("#product_size_container .overlay").length) $("#product_size_container").append("<div class=\"overlay\">Sizes</div>");
				sizes = "";
				$.each(allSizes[hoveredSize], function(regionToken, size) {
					if (sizes) sizes += " / ";
					sizes += regionToken.toUpperCase() + ": " + size;
				});
				$("#product_size_container .overlay").html(sizes);
				$("#product_size_container .overlay").stop(true, true).show();
			}
		});
		
		$("#sizeselector li").mouseout(function() {
			$("#product_size_container .overlay").fadeOut("fast");
		});
		
	}
	
	// Product zoom/unzoom
	$(".zoom a").click(function() {
		
		// Set loading message
		$(this).addClass("loading").data("prevText", $(this).text()).text("One sec... Loading!");
		
		// Create overlay
		zoomOverlay = new Overlay("zoomoverlay");
		
		// Set zoom markup
		$(".overlay").empty().append($("#summary hgroup").clone()).append(
			"<img class=\"zoomed\" src=\"" + $(this).attr("href") + "\" alt=\"Large View\" title=\"Zoom in!\" />" +
			"<ul class=\"tools\"><li class=\"close\">Close Zoom</li></ul>"
		);
		
		// Add alternates if present
		if ($(".imagery .alternates").length) $(".overlay").append("<ul class=\"alternates\">" + $(".imagery .alternates").html() + "</ul>");
				
		// Set draggability
		lastClickX = 0;
		lastClickY = 0;
		dragged = false;
		$(".overlay .zoomed").data("currentX", 0);
		$(".overlay .zoomed").data("currentY", 0);
		$(".overlay .zoomed").draggable({
			start: function(event, ui) {
				if ($(this).hasClass("compressed")) return false;
				lastClickX = event.pageX;
				lastClickY = event.pageY;
			},
			drag: function(event, ui) {
				dragged = true;
				if ($(this).hasClass("compressed")) return false;
				$(this).css({ top: ($(this).data("currentY") + (event.pageY - lastClickY)), left: ($(this).data("currentX") + (event.pageX - lastClickX)) });
			},
			stop: function(event, ui) {
				if ($(this).hasClass("compressed")) return false;
				$(this).data("currentX", $(this).offset().left);
				$(this).data("currentY", $(this).offset().top - $(window).scrollTop());
			}
		});
		
		// Click to zoom in/out
		$(".overlay .zoomed").click(function() {
			if (dragged) {
				dragged = false;
				return false;
			}
			if ($(this).hasClass("compressed")) zoomIn($(this));
			else zoomOut($(this));
		});
		
		// Alternate views
		$(".overlay .alternates a").click(function() {
			if (!$(this).parent().hasClass("active")) $(this).parent().addClass("active loading").siblings().removeClass("active").removeClass("loading");
			
			$(".zoomed").attr("src", $(this).find("img").attr("src").replace(/-thumb|-altthumb/,"-orig")).removeClass("portrait");
			
			return false;
		});
					
		// Check for image load
		$(".zoomed").load(function() {
			
			// Set margins to make sure tools are offset ok
			$(".overlay hgroup, .overlay .tools, .overlay .alternates").css("margin-top", $("header").height() + $("#admintools").height() + $("#messagebar").height() + "px");
			
			// Activate overlay
			zoomOverlay.activate();
			
			// Check width and zoom in if necessary
			if ($(this).width() < $(window).width() && $(this).height() < $(window).height()) zoomIn($(this));
			else zoomOut($(this));
			
		});
		
		return false;
		
	});
	
	// Extra zoom on image
	$(".hero img").click(function() {
		if ($(".zoom a").length) if (!$("body.condensed").length) $(".zoom a").click();
	});
	
	// Hovers on size selections
	$("#colorways li").mouseover(function() {
		if (!$("#colorways .overlay").length) $("#colorways").append("<div class=\"overlay\"></div>");
		$(".overlay").html($(this).find("a").attr("title"));
		$("#colorways .overlay").stop(true, true).show();
	});
	
	$("#colorways li").mouseout(function() {
		$("#colorways .overlay").fadeOut("fast");
	});
	
	// Review form show/hide
	if (typeof reviewFormActive == "undefined") {
		$("#reviewform").hide();
		$("#reviewform").before("<input type=\"button\" onclick=\"return toggleReviewForm();\" id=\"reviewtoggle\" value=\"Leave a review!\" />");	
	}
	else {
		$("#reviewform").before("<input type=\"button\" onclick=\"return toggleReviewForm();\" id=\"reviewtoggle\" value=\"Close review box\" />");
	}
	
	// Review rating selection
	$("form .rating input").each(function() {
		starRating = $("<span title=\"" + $(this).attr("title") + "\"></span>");
		starRating.bind("click", function() {
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
			$(this).parent().children("input").eq($(this).prevAll().length).attr("checked", "checked");
		});
		if ($(this).attr("checked")) starRating.addClass("active");
		starRating.insertBefore($(this).siblings("label"));
		$(this).hide();
	});
	
	// (regular) 360 views
	if (!$(".rotator.custom").length) {
		
		// Set direction to deal with legacy 360 rotations
		if ($("#product_id").length && $("#product_id").attr("value") > 3370) direction360 = "backward";
		else direction360 = "forward";
		
		$(".rotator > img").rotodrag({
			angles: 36,
			direction: direction360,
			startFrame: 1,
			play: true,
			playLimit: 36
		});
	}
	
	// Links for condensed product page open in parent
	if ($("article.condensed").length) {
		$("#product_save, .view360 a").attr("target", "_parent");
	}
	
	// Alternate image switches
	$(".alternates a").click(function() {
		
		if ($(this).parent().hasClass("active")) return false;
		if ($(this).parent().hasClass("view360") || $(this).parent().hasClass("video") || $(".alternates .view360.active").length) return true;
		
		productToken = $("#product_token").val() + "-" + $("#variation_token").val();
		productRegex = new RegExp(productToken + "(-[^-]+)?(-(large|orig))?\.(png|jpg)");
	
		key = $(this).parent().data("key");
		if (key == "main") key = "";
		else key = "-" + key;
		
		mainImage = $(".imagery .hero img");
		mainImage.removeAttr("width").removeAttr("height").hide();
		mainImage.attr("src", mainImage.attr("src").replace(productRegex, productToken + key + ".jpg"));
		$(".zoom a").attr("href", $(".zoom a").attr("href").replace(productRegex, productToken + key + "-orig.png"));
		
		mainImage.parent().addClass("loading");
		if (!mainImage.parent().find(".indicator").length) mainImage.parent().append("<span class=\"indicator\" style=\"filter: alpha(opacity=0); opacity: 0; visibility: hidden;\">Loading...</span>");
		$(this).parent().addClass("active").siblings().removeClass("active");
	
		return false;
		
	});
	
	// Set min heights and end loading state after image loading
	$(".imagery .hero img").load(function() {
		$(this).parent().removeClass("loading");
		$(this).css("margin-left", "-" + Math.round($(this).width() / 2) + "px").css("margin-top", "-" + Math.round($(this).height() / 2) + "px").fadeIn();
	});
		
	// This makes the click and drag to spin functionality work with the fixed header
	if ($("#control360").length) $("#control360").css("margin-top",-$("#header").outerHeight());

	// Social networking tools
	
	// Facebook
	$("#sntools .facebook a").click(function() {
	
		addURL = "http://facebook.com/sharer.php?";
		addURL = addURL + "u=" + encodeURIComponent(window.location.toString());
		if ($("#summary h1").length) addURL = addURL + "&t=" + encodeURIComponent($("#summary h1").text() + " in " + $("#summary h2").text());
		else addURL = addURL + "&t=etnies Online Store";
				
		if (typeof analyticsAccount != 'undefined') {
			shareHit = "/social/facebook/" + $("#product_token").attr("value") + "/" + $("#variation_token").attr("value") + "/";
			_gaq.push(["_trackPageview", shareHit]);
			_gaq.push(["regional._trackPageview", shareHit]);
		}
	
		window.open(addURL);
		return false;
		
	});
	
	// Twitter
	$("#sntools .twitter a").click(function() {
	
		$.get("/shorten/?url=" + encodeURI(window.location.toString()), function(result) {

			// Random insert
			randomWords = "Check out";
	
			addURL = "http://twitter.com/?status=" + randomWords + " ";
			addURL = addURL + encodeURIComponent($("#summary h1").text() + " in " + $("#summary h2").text() + " - " + result);
				
			if (typeof analyticsAccount != 'undefined') {
				twitHit = "/social/twitter/" + $("#product_token").attr("value") + "/" + $("#variation_token").attr("value") + "/"; 
				_gaq.push(["_trackPageview", twitHit]);
				_gaq.push(["regional._trackPageview", twitHit]);
			}
	
			window.open(addURL);
		
		});
		return false;

	});
		
});

// Add to cart function
function addToCart(productID, variationID, size) {
	
	// Make cart overlay checkout clicks inside product iframe open in parent window
	condensedTarget = "";
	if ($("body.condensed").length) condensedTarget = "target=\"_parent\"";

	
	addURL = "/cart/add/?format=json&product_id=" + productID + "&variation_id=" + variationID;
	if (typeof size != "undefined" && size != "one-size") addURL += "&product_size=" + size;
	//alert(addURL);
	
	// Ajax to the cart
	$.getJSON(addURL, function(results) {
		
		// Modify quantities if necessary
 		if (results.updatedquantity) {
 			
 			// Make sure amount is present
 			if (!$(".cartamount").length) $("#cart strong").append("<span class=\"cartamount\"></span>");
 			
 			// Write total price to page
		 	totalPrice = new Number(results.updatedtotal / 100);
		 	$(".cartamount").text(currency + totalPrice.toFixed(2));
		 	$("#cart h3").attr("title", "Your Cart (" + currency + totalPrice.toFixed(2) + ")");
		 	
			// Write new quantity to page
			if ($("body.condensed").length){
			 	$(".numitems", window.parent.document).text(results.updatedquantity).attr("title", results.updatedquantity + " items in your cart");
		 	} else {
			 	$(".numitems").text(results.updatedquantity).attr("title", results.updatedquantity + " items in your cart");
		 	}


		 	
		 	// Keep cart dropdown up to date
		 	quicklookMax = parseInt($("#cart").data("maxitemcount"));
		 	if (!$("#cart ul").length) $("#cart .subtotal").before("<ul></ul>");
		 	$("#cart ul").prepend("<li><a href=\"" + results.item.url + "\"><img src=\"" + results.item.thumbURL + "\" alt=\"New item\" /></a></li>");
		 	$("#cart li:gt(" + (quicklookMax - 1) + ")").remove();
		 	$("#cart .more .amount").text(results.updatedquantity - quicklookMax);
		 	
		 	// Create overlay
		 	cartOverlay = new Overlay("cartoverlay");
		 	
		 	// Create message
		 	$(".overlay .box").empty().append("<div class=\"addedtocart\">" + 
				"<p class=\"message\">Item added to your cart!</p>" +
				"<div class=\"item\">" +
					"<img src=\"" + results.item.thumbURL + "\" alt=\"New item\" />" +
					"<div>" +
						"<span class=\"name\">" + results.item.name + "</span>" +
						"<span class=\"colorsize\">" + results.item.color + "</span>" +
						"<span class=\"price\">" + results.item.price + "</span>" +
					"</div>" +	
				"</div>" +
				"<a class=\"checkout button\"" + condensedTarget + "href=\"/cart/\">Checkout now &raquo;</a>" +
				"<a class=\"continue close\">&laquo; Continue shopping</a>" +
				"<span class=\"close\">Close this</span>" + 
			"</div>");
			
			// Add size
			if (results.item.size) $(".overlay .item .colorsize").append(", Size: " + results.item.size);
				
			// Show overlay
			cartOverlay.activate();
			
			newText = "Add Another!";		 	
 			
 		}
 		// Display error messages if present
 		else if (results.errors) {
 			for (var i = 0; i < results.errors.length; i++) {
 				alert(results.errors[i].message);
 			}
 		}
		
		// Undo button hold
		$("#product_add").attr("value", newText).removeAttr("disabled");
		
	});		
	
	return true;
	
}

// Size selection
function selectSize(sizeItem) {
	
	if (!$(sizeItem).length) {
		$("#product_add").attr("disabled", "disabled").attr("value", "Out of stock!").attr("title", "Sorry, we don't have this item in stock!");
		$("#product_p2p").attr("disabled", "disabled").attr("title", "Sorry, this item is unavailable from retailers!");
		$("#p2p").hide();
		return false;
	}

	// Select size in drop down and add classes for visuals
	if ($(sizeItem).hasClass("unavailable")) return false;
	selectedSize = $(sizeItem).attr("id").replace(/size/, "");
	sizeOption = $("#product_size option[value='" +  selectedSize + "']");
	wishlistBase = $("#product_save").attr("data-baseurl");
	if (sizeOption.length) {
		$("#sizeselector li").removeClass("active");
		$(sizeItem).addClass("active");
		sizeOption.attr("selected", "selected");
		$("#product_save").attr("href", wishlistBase + selectedSize + "/");
	}
	
	// Set low stock warning
	if (items[selectedSize].local.quantity != undefined) {
		if (!$("#stockwarning").length) $("#shopping fieldset").append("<div id=\"stockwarning\"></div>");
		$("#stockwarning").html("Only " + items[selectedSize].local.quantity + " left in stock!").show();
	}
	else $("#stockwarning").hide();
	
}

// Update cart display
function updateCartDisplay() {
	
	totalPrice = 0;
	totalQuantity = 0;
	
	// Check quantities on each item
 	$("tr.item").each(function(){
 		
 		itemPrice = parseInt($(this).find(".price").text().replace(/\$|\.|\s/g, ""));
 		itemQuantity = parseInt($(this).find(".quantity").attr("value"));
 		itemTotal = itemPrice * itemQuantity;
 		totalPrice += itemTotal;
 		totalQuantity += itemQuantity;
 		
 		// Write item total to page
 		itemTotalNumber = new Number(itemTotal / 100);
 		$(this).find(".totalcolumn strong").text(currency + itemTotalNumber.toFixed(2));
 		
 	});
 
 	// Write total price to page
 	totalPrice = new Number(totalPrice / 100);
 	$(".cartamount").text(currency + totalPrice.toFixed(2));
 	
 	// check and see if this DOM is embedded in an iframe, and if so update the totalQuantity in the parent frame.
	if ($("body.condensed").length){
	 	$(".numitems", window.parent.document).text(totalQuantity); 		

	 	// Write new quantity to page
 	} else {
	 	$(".numitems").text(totalQuantity);

 	}
	
}

// Show/hide review form
function toggleReviewForm() {

	$("#reviewform").slideToggle("medium", function() {
	
		// Change text
		if ($("#reviewform:visible").length) {
			$("#reviewtoggle").attr("value", "Close Review Form").addClass("engaged");
		}
		else {
			$("#reviewtoggle").attr("value", "Leave a review!").removeClass("engaged");
		}
		
	});
	
}

// Zoom in
function zoomIn(image) {

	// Set correct class
	$(image).removeClass("compressed").addClass("uncompressed");
	
	// Set title
	$(image).removeAttr("title");
	
	// Set position
	$(image).data("currentX", Math.round(($(window).width() / 2) - ($(image).width() / 2)));
	$(image).data("currentY", Math.round(($(window).height() / 2) - ($(image).height() / 2)));
	$(image).css("left", $(image).data("currentX") + "px");
	$(image).css("top", $(image).data("currentY") + "px");
	$(image).css("margin-left", "");
	
}

// Zoom out
function zoomOut(image) {
	
	// Don't zoom out if the image is smaller than the browser window
	if ($(image).width() < $(window).width() && $(image).height() < $(window).height()) return false;
	
	// Set correct class
	$(image).removeClass("uncompressed").addClass("compressed");
	if ($(image).height() > $(window).height()) $(image).addClass("portrait");
	if ($(image).hasClass("portrait")) $(image).css("margin-left", "-" + Math.round($(image).width() / 2) + "px");
	
	// Remove css
	$(image).css("left", "").css("top", "");
	
}