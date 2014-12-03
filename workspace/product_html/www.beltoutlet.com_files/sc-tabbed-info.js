(function($){
	$.fn.tabbedInfo = function(options){
		var defaults = {
			firetab: 0,
			tabbtns: ".tabbtns", // button container
			tabinfo: ".tabinfo", // info container
			tabactive: "tabactive", // active button class
			tabcontactive: "tabcontactive", // active info class
			remotebtns: ".remotetab" // remote button class
		};
		var settings = $.extend({},defaults,options);
		$(".tabbtns").css("display","block");
		/* load product reviews off screen and insert in temporary div */
		if($("#scProductReviews")){
			var newDiv = $(document.createElement("div")).addClass("tabsub").css({"visibility":"hidden", "position":"absolute", "left":"-10000"});
			newDiv.append($("#scProductReviews")).insertAfter(".tabinfomain");
		}
		// find buttons assign click
		$(settings.tabbtns+" a").each(function(i){
						$(this).click(function(e){ 
								processTabs(i); 
								e.preventDefault();
						});
					}
				);
		// product reviews remote
		$("#scReviewsPInfoAvgRating a").click(function(){
			$(settings.tabbtns+" a").each(function(i){
				var revtxt = $(this).text();
				var regex = /reviews/i;
				if(regex.test(revtxt)){  
					processTabs(i);
				}
			});
		});
		
		// setup remote tab access
		$(settings.remotebtns).click(function(e){ processTabs($(this).attr("name")-1); e.preventDefault();});
		$(".tabbtns").click(
							  function(e){
								  
								}
							);
		
		// process buttons & info when clicked
		function processTabs(tabnum){
			$(settings.tabinfo).css("display","none");
			$(settings.tabbtns+" a").removeClass(settings.tabactive).parent().removeClass(settings.tabcontactive);
			$(settings.tabbtns+" a").eq(tabnum).addClass(settings.tabactive).parent().addClass(settings.tabcontactive);
			$(settings.tabinfo).eq(tabnum).fadeIn(300);
			// bring product reviews into the info tab
			var revtxt = $(settings.tabbtns+" a").eq(tabnum).text();
			var regex = /reviews/i;
			if(regex.test(revtxt)){
				newDiv.css({"visibility":"visible", "position":"relative", "left":"0"});
				$(settings.tabinfo).eq(tabnum).append(newDiv);
				$(".scfeaturestatus").fadeOut(400);
			}
		}
		// fire first button
		processTabs(settings.firetab);
	}
})(jQuery);
	