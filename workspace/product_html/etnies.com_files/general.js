$(document).ready(function(){

	// Make header fixed when scrolling past
	if ($("body > header").length) {
		headerPosition = $("body > header").offset().top - $("#admintools").height();
		$(window).scroll(function(){
			if ($(window).scrollTop() > headerPosition) $("body > header").addClass("sticky");
			else $("body > header").removeClass("sticky");
		});
	}

	// Help overlay
	$("a.help").click(function(){
	
		// Create overlay
		helpOverlay = new Overlay("helpoverlay");
		
		// Set loading message
		$(this).find(".message").addClass("loading").text("Loading...").show();
		
		// Get URL to load
		helpURL = $(this).attr("href") + "?popup=true";
		
		// Create iframe in overlay
		$("#helpoverlay .box").empty().append("<iframe src=\"" + helpURL + "\" width=\"400\" height=\"400\" seamless></iframe><a href=\"/help/\">Need more help?</a><input type=\"button\" value=\"I'm done! Thanks!\" class=\"close\" />");
		
		// Set margins to make sure tools are offset ok
		$(".overlay .box").css("margin-top", $("header").height() + $("#admintools").height() + $("#messagebar").height() + "px");
		
		// Set extra class for special links
		if ($(this).attr("id") == "size_chart") $(".overlay").addClass("size");

		if ($(this).hasClass("expanded")) $(".overlay").addClass("expanded");
		else $(".overlay").removeClass("expanded");
		
		// Activate overlay
		helpOverlay.activate();
		
		return false;
		
	});	
	
	// Change image on the fly with swatch behavior
	$(".swatches > li").click(function(){
		
		// Check if already active
		if ($(this).hasClass("active")) return true;
		
		// Main display
		productDisplay = $(this).parents("li");
	
		// Change image
		imagePath = $(this).find("a").attr("data-path") + "-thumb.png";
		$(productDisplay).find(".product-image, div > a").attr("href", $(this).find("a").attr("href")).find("img:not(.customoverlay)").attr("src", imagePath).removeAttr("width height");
		
		// Change colorway name
		$(productDisplay).find(".colorway").text($(this).find("img").attr("alt"));

		// Change stock message
		if ($(this).find(".unavailable").length) {
			if (!$(productDisplay).find("div > .unavailable").length) $(productDisplay).find("div > a").after("<span class=\"unavailable\">Out of stock!</span>");
			$(productDisplay).find("div > .unavailable").show();
		}
		else $(productDisplay).find("div > .unavailable").hide();
			
		// Change price
		$(productDisplay).find("div > a > .price").replaceWith($(this).find(".price").clone());
		
		// Change sale badge
		if ($(this).find(".sale").length) {
			if (!$(productDisplay).find(".badge.sale").length) $(productDisplay).find("div > a").after("<span class=\"badge sale\">On Sale</span>");
			$(productDisplay).find(".badge.sale").show();
		}
		else $(productDisplay).find(".badge.sale").hide();
			
		// Change new badge
		if ($(this).find(".new").length) {
			if (!$(productDisplay).find(".badge.new").length) $(productDisplay).find("div > a").after("<span class=\"badge new\">New</span>");
			$(productDisplay).find(".badge.new").show();
		}
		else $(productDisplay).find(".badge.new").hide();
		
		// Change state
		$(productDisplay).find(".swatches").children().removeClass("active");
		$(this).addClass("active");
		
		return false;
		
	});
	
	// Detect swatch limit exceeded
	swatchLimit = 5;
	$(".swatches").each(function() {
		if ($(this).children().length > swatchLimit) {
			$(this).after("<span onclick=\"showSwatches(this)\" class=\"more\">" + $(this).children(":gt(" + (swatchLimit - 1 )+ ")").length + " more</span>");
		}
	});
	
	// Region selector popup
	$("#regionselector, a.regionsetting").click(function() {
		
		// Create overlay
		regionOverlay = new Overlay("regionoverlay");
		
		// Set loading message
		$(this).addClass("loading");
		
		// Get URL to load
		regionSelectionURL = "/region/";
		if (typeof(unconfirmedRegion) != "undefined") regionSelectionURL += "confirm/";
		
		// Get region selector markup
		$("#regionoverlay .box").load(regionSelectionURL + " .regionselector", function(response, status, xhr) {
			
			// Activate overlay
			regionOverlay.activate();
			
			// Switch region views
			$(".regions > li").click(selectRegion);
			
			// Submit region selection
			$(".global.overlay form").attr("action", window.location);
			
			// Change selector message
			$("#regionselector .message").removeClass("loading").text("Click to change region");
			
			
		});
		
		return false;
		
	});
	
	// Region select
	$(".regions > li").click(selectRegion);
	
	// Confirm region
	if (typeof(unconfirmedRegion) != "undefined") $("#regionselector").click();
	
	// Auto-submit on double-click
	$(".regions > li").dblclick(function() {
		selectRegion();
		$(this).parents("form").submit();
	});

	// Announcement hide/save
	$(".announcement .close").click(function() {
		$(this).parent().slideUp("slow", function() {
			$("#messagebar").remove();			
		});
 
		$("body > header").removeClass("announcement");

		// Send message to save in session
		$.post("/", { readAnnouncement: $(this).parents(".announcement").attr("data-token") });		
	});
	// Announcement link tracking
	$(".announcement a").track("announcements", "messagebar", "link", function(e) { return e.parents(".announcement").data("token") });
	
	// Removal confirmation
	$("a.remove, .remove a").click(function(){
		return confirm("Are you sure?");
	});
	
	// Scroll to internal links
	$("a[href*=#]").on("click", scroll);
	
	// Fancybox openers
	if (jQuery().fancybox) {
		$(".thickbox, .bigger").fancybox({
			"hideOnContentClick"	:	true,
			"showCloseButton"	:	false
		});
	}
	
	// Login / Signup switchers
	$("#registerform h2").after("<a class=\"loginswitch\" onclick=\"switchLogin()\">Already have an account?</a>");
	$("#loginform h2").after("<a class=\"loginswitch\" onclick=\"switchLogin()\">Don't have an account yet?</a>");
	if ($("#content.register").length) {
		$("#registerform").addClass("active");
		$("#loginform").hide();
	}
	else if ($("#content.login").length) {
		$("#loginform").addClass("active");
		$("#registerform").hide();
	}

	// SNS outbound link tracking
	$("ul.sociallinks a").click(function() {
		outboundLink = "/outbound/" + $(this).parents("li").attr("class") + "/";
		_gaq.push(['_trackPageview', outboundLink], ['regional._trackPageview', outboundLink]);
		return true;
	});
	
	// Search filters condensing
	if ($(".search #filters").length && $(".search #filters").height() - 40 > $(".productlists").height()) {
		$(".search #filters").css("overflow-y", "hidden");
		$(".search #filters").data("height", $(".search #filters").height())
			.height($(".productlists").height())
			.append("<span class=\"more\">View all</span>");
		$("#filters .more").click(function() {
			$(".search #filters").animate({ height: $("#filters").data("height") });
			$(this).fadeOut();
		});
	}

});

// Currency conversion functions
String.prototype.toCents = function () {
	cents = parseInt(this.replace(/\D/g, ""));
	if (this.indexOf(".") < 0) cents *= 100;
	return cents;
};
$.fn.currency = function(amount) {
	$(this).each(function() {
		currencyAmount = new Number(amount / 100);
		$(this).text(currency + currencyAmount.toFixed(2));
	});
	return $(this);
};

// Add tracking data to links
$.fn.track = function(campaign, source, medium, content) {
	
	// If global tracking was set, don't track individual links
	if (typeof(utm_campaign) != "undefined" || typeof(utm_medium) != "undefined" || typeof(utm_source) != "undefined") return false;
	
	// Bind tracking variables on element click
	$(this).click(function() {
		params = {
			utm_campaign: campaign, 
			utm_source: source,
			utm_medium: medium,
			utm_content: $.isFunction(content) ? content($(this)) : content
		};
		//alert($(this).attr("href") + "?" + $.param(params));
		$(this).attr("href", $(this).attr("href") + "?" + $.param(params));
	});
	
	// Return element per jQuery convention
	return $(this);
}

// Smooth scroll
function scroll(e) {
	scrollOffset = 0;
	if (typeof(e.data) != "undefined" && typeof(e.data.offset) != "undefined") scrollOffset = e.data.offset;
	hash = $(this).attr("href").substring($(this).attr("href").indexOf('#'));
	if (!hash || hash == "#") return false;
	$("html, body").stop().animate({scrollTop: $(hash).offset().top - $("body > header").height() + scrollOffset}, 600);
	e.preventDefault();
}
	

// Select region shortcut
function selectRegion() {
	// submit form when clicking already active region
	if ($(this).hasClass("active")) {
		if ($("input#region").val() != region || typeof(unconfirmedRegion) != "undefined") $(this).parents("form").submit();
		else if ($("input#region").val() == region) $(".overlay.global").fadeOut("fast");
		return true;
	}
	$(this).parent().children().removeClass("active");
	$("input#region").val($(this).attr("class"));
	$(this).addClass("active");
}

// Show all swatches
function showSwatches(e) {
	$(e).hide().prev().css("width", "auto");
}

// Switch login / registration forms
function switchLogin() {
	
	// Set active
	$("form.active").fadeOut("fast", function() {
		$(this).removeClass("active").siblings("form").fadeIn("fast").addClass("active");
	});
	
}

// Custom etnies overlays
function Overlay(overlayID) {
	
	// Create markup if it doesn't exist
	boxHTML = "<div class=\"box\"><h2>Loading...</h2></div>";
	container = $("body > .container");
	if (!container.length) container = $("body");
	if (!$(".overlay.global").length) {
		$(container).append("<div id=\"" + overlayID + "\" class=\"overlay global\" style=\"display: none; height: " + ($("body").height() - $("#messagebar").height()) + "px;\">" + 
			boxHTML +
		"</div>");
	}
	else $(".overlay.global").attr("id", overlayID).empty().append(boxHTML);
		
	// Set id
	this.e = $("#" + overlayID);
	
	// Bind clicks outside of content area in overlay to close overlay
	this.e.click(function(e) {
		if ($(e.target).hasClass("overlay")) $(this).fadeOut("fast");
	});
	
}

// Overlay activation
Overlay.prototype.activate = function() {
	
	// Set height and width dynamically
	// $(".overlay .box").height($(".box > div").innerHeight()).css("margin-top", "-" + Math.round($(".box > div").innerHeight() / 2) + "px");	
	
	// Set close trigger
	this.e.find(".close").click(function() {
		$(".overlay.global").fadeOut("fast");
	});
	
	// Close on escape key too
	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			$(".overlay.global").fadeOut("fast");
		}
	});
	
	// Show overlay
	this.e.fadeIn("fast", function() {
		// Remove loading message(s)
		$(".loading").each(function() {
			if ($(this).data("prevText")) $(this).text($(this).data("prevText"));
			$(this).removeClass("loading");
		});
	});
	
}