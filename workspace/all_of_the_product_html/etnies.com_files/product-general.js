defaultNavListCutoff = 10;

$(document).ready(function(){
	
	// Color/size filter cutoffs
	$(".colorfilter, .colourfilter").each(function() {
		
		if ($(this).hasClass("colorfilter") || $(this).hasClass("colourfilter")) navListCutoff = 4;
		else navListCutoff = defaultNavListCutoff;
	
		if ($(this).find("li").length > navListCutoff) {
		
			$(this).find("li:gt(" + navListCutoff + ")").hide();
			$(this).append("<a href=\"#\" onclick=\"expand(this); return false;\">Show more...</a>");
			
		}
		
	});
	
	// Review deletion
	$(".deletereview").click(function(){
		return confirm("Deleting reviews cannot be undone.");
	});
	
	// Recent views / recommended widget
	
	// Determine list widths
	$("#related ul").each(function() {
		listWidth = $(this).children().length * $(this).children("li").innerWidth();
		$(this).width(listWidth);
		if (listWidth <= $(this).parent().width()) $(this).parent().find(".next").addClass("disabled");
	});
	
	// Switch sections
	$("#related section h3").click(function() {
		
		// Return on disabled
		if ($(this).parent().hasClass("disabled")) return false;
		
		// Set active
		$("#related section").removeClass("active");
		$(this).parent().addClass("active");
	});
	
	// Next/prev buttons
	$("#related .next").click(function() {
	
		if ($(this).hasClass("disabled")) return false;
		$(this).parent().find("ul:not(:animated)").animate({marginLeft: "-=" + $(this).parent().width() + "px"}, "medium", function() {
			if (parseInt($(this).css("marginLeft").replace(/px/, "")) + $(this).width() <=  $(this).parent().width()) $(this).parent().find(".next").addClass("disabled");
			$(this).parent().find(".previous").removeClass("disabled");
		});
		
	});
	$("#related .previous").click(function() {
	
		if ($(this).hasClass("disabled")) return false;
		$(this).parent().find("ul:not(:animated)").animate({marginLeft: "+=" + $(this).parent().width() + "px"}, "medium", function() {
			if (parseInt($(this).css("marginLeft").replace(/px/, "")) >=  0) $(this).parent().find(".previous").addClass("disabled");
			$(this).parent().find(".next").removeClass("disabled");
		});
		
	});
	
	// Feature-headers
	$("#collection-header img, #collection-header.on-sale h1").click(function() {

	    $("#collection-header").toggleClass("clicked");	    
		$("#collection-header div").slideToggle();
		
	});
	
});

// Expand filter menu
function expand(e) {

	$(e).parent().find("li").show();
	$(e).hide();
	
}
