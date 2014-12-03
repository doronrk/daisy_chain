(function( $ ){
	$.fn.expandCollapseList = function(attr) {
		attr = attr || {};
		attr.duration = attr.duration || "fast"; // values: string 'fast' or 'slow' or int in milliseconds
		attr.expandIcon = attr.expandIcon || "+"; // values: string image tag or text
		attr.collapseIcon = attr.collapseIcon || "-"; // values: string image tag or text 
		attr.expanded = attr.expanded || "none"; // values: 'all', 'none', [1,2,3]
		attr.moreLink = attr.moreLink || "more..."; // values: string text
		attr.lessLink = attr.lessLink || "less..."; // values: string text
		attr.maxChildren = attr.maxChildren || "all"; // values: int
		attr.showLessLink = attr.showLessLink || false; // values: boolean
	
		// helper method to help determine how to toggle the Plus/Minus text/image icons
		function matchIcons(sDomHTML, sAttr){
			// if it looks like a tag/image, compare sources
			if (sAttr.indexOf("<") != -1 && sAttr.indexOf(">") != -1){
				var oDomHTML = $(sDomHTML),
				oAttr = $(sAttr);
			
				return (oDomHTML.attr("src") == oAttr.attr("src"));
			
			// else compare strings
			} else {
				return (sDomHTML == sAttr);
			}
		}
	
		// loop through all children li nodes
		this.children("li").each(function(){
				// if this li node has a child UL node
				if ($('ul', this).length > 0) {
					// prepend the span tag for the Plus/Minus icon
					if (attr.expanded != "all") {
	
						$(this).prepend(
							$("<span/>", {
								html: attr.expandIcon,
								className: "plusMinus",
								click: function() {
									// slide down hidden UL
									$(this).parent().find("ul").slideToggle(attr.duration);
	
									// swap the Plus/Minus icons
									if (matchIcons($(this).html(), attr.expandIcon)){
										$(this).html(attr.collapseIcon);
									} else {
										$(this).html(attr.expandIcon);
									}
								}
							})
						);
	
					}
	
					// add the 'more' link if expanded == 'all' and li reaches max children length 
					if (attr.expanded == "all" && attr.maxChildren != "all" && $('ul', this).children("li").length > attr.maxChildren){
						var i;
						
						// hide children li greater than max
						for (i=0; i<$('ul', this).children("li").length; i++){
							if (i >= attr.maxChildren) $($('ul', this).children("li")[i]).hide();
						}
	
						// add the more link
						$('ul', this).append(
							$("<li/>", {
								html: attr.moreLink,
								className: "more",
								click: function(){
		
									if (attr.showLessLink){
	
										if ($(this).hasClass("more")){
											$(this).html(attr.lessLink);
											$(this).parent().children("li").slideDown(attr.duration);
										} else {
											$(this).html(attr.moreLink);
											var sTempHTML = $("<li/>", {html:attr.moreLink}).html();
											for (i=0; i<$(this).parent().children("li").length; i++){
												if (i >= attr.maxChildren && $($(this).parent().children("li")[i]).html() != sTempHTML){
													$($(this).parent().children("li")[i]).slideUp(attr.duration);
												}
											}
										}
	
										$(this).toggleClass("more");
										$(this).toggleClass("less");
	
									} else {
										// slide down hidden LIs
										$(this).parent().children("li").slideDown(attr.duration);	
	
										// remove more link
										$(this).remove();
									}
	
								}
							})
						);					
					}
	
				// no child UL node found, no need to expand/collapse functionality
				} else {
					if (attr.expanded != "all") {
						// prepend the span tag for the Not Expandable spacer
						$(this).prepend(
							$("<span/>", {
								html: "&nbsp;",
								className: "notExpandable"						
							})
						);
					}
				}
		});
		
		// expand an array of nodes [1,2,3]
		if ($.isArray( attr.expanded )) {
			var k,i;
			for (k=0; k<attr.expanded.length; k++ ){
				for (i=0; i<$(this).children("li").length; i++){
					if (attr.expanded[k] -1 == i){
						$($(this).children("li")[i]).find("ul").parent().find(".plusMinus").html(attr.collapseIcon);
						$($(this).children("li")[i]).find("ul").show();
					}
				}
			}
	
		// expand all nodes
		} else if (attr.expanded == "all") {
			$(".plusMinus").html(attr.collapseIcon);
			$(this).find("ul").show();
		
		// hide all nodes 
		} else {
			$(".plusMinus").html(attr.expandIcon);
			$(this).find("ul").hide();		
		}
		
		return this;
	}
})( jQuery );