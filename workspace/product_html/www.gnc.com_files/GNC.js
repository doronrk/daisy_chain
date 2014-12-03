jQuery(document).ready(function(e) {
/* Code for GNC Global Header */
	/* Limit Account Name to 16 characters then "..." */
	if(jQuery("#myAccount").length > 0) {
		var userName = jQuery("#myAccount").text();
		if (userName != "" && userName.length > 16) {
			userName = userName.substr(0, 16) + "...";
			jQuery("#myAccount").html(userName);
		}
		jQuery("#myAccount").append(" Account");
	}
	
	/* Limit Cart Product names to 16 characters then "..." */
	if(jQuery("div.minicart-item").length > 0) {
		jQuery("p.minicart-link").dotdotdot({
			/* The HTML to add as ellipsis. */
			ellipsis : '...',
			 
			/* How to cut off the text/html: 'word'/'letter'/'children' */
			wrap : 'word',
			 
			/* Wrap-option fallback to 'letter' for long words */
			fallbackToLetter: true,
			 
			/* jQuery-selector for the element to keep and put after the ellipsis. */
			after : null
		});
	}
	
	/* Positioning for SubNav Menu Items within dropdown */
	if(jQuery("#mainNavContainer").length > 0) {
		/* declare all the needed variables for the menu */
		var tempOWidth, tempIWidth, colHeight, prevOWidth, colItems, itemCount, className, colCount, totalItems, maxHeight = jQuery("div.mainNavSubContainer").height();
		
		jQuery("ul.mainNavSub").each(function(index, element) {
			/* Reset Variables for new SubNav Loop */
			tempOWidth = 0, tempIWidth = 0,
			colHeight = 0,
			prevOWidth = 0,
			totalItems = jQuery(this).children('li').length,
			colItems = [], itemCount = 0,
			className = "", colCount = 1;
			
			jQuery(this).children("li").each(function(index2, element2) {
				/* Add subCat class to li elements first to include padding in measurements */
				className = "subCats"+(itemCount+1);
				jQuery(this).addClass(className);
				
				/* Check height stipulation */
				if(colHeight+jQuery(this).outerHeight(true) >= maxHeight) {
					/* Set to last item of column */
					jQuery(this).prev('li').addClass("last");
					
					/* Set Width for Current Column before switching to new column */
					for(i = 0; i < colItems.length; i++) {
						colItems[i].css("width", tempIWidth);
						/* Set height of item to fill rest of column for full right border extension */ 
						if(i == colItems.length-1) {
							colItems[i].css("height", colItems[i].height()+(maxHeight-colHeight));
						}
					}
					
					/* Store previous width for Left positioning and Container Width */
					prevOWidth += tempOWidth;
					
					/* Expand width of Item Container */
					jQuery(this).parent('ul').css("width", prevOWidth);
				
					/* Reset Variables for new Column */
					colHeight = 0,
					tempOWidth = 0, tempIWidth = 0,
					colItems = [], itemCount = 0;
					
					/* Swap to new column class */
					colCount++;
					jQuery(this).removeClass(className);
					className = "subCats"+(itemCount+1);
					jQuery(this).addClass(className);
				}
				
				/* Add subCat class to li elements first to include padding in measurements */
				if(colCount == 1) {
					jQuery(this).addClass("firstCol");
				}
				
				/* Check width stipulation */
				if(jQuery(this).outerWidth(true) > tempOWidth) {
					tempOWidth = jQuery(this).outerWidth(true); // for CSS position
					tempIWidth = jQuery(this).width(); // for CSS width
				}
				
				/* Set position of current item */
				jQuery(this).css({
					top: colHeight,
					left: prevOWidth
				});
				
				/* add new height to colHeight for top positoning and Column tracking */
				colHeight += jQuery(this).outerHeight(true);
				
				/* add item to Array to keep track of items in Current Column */
				colItems[itemCount] = jQuery(this);
				
				/* Advance count of items in column */
				itemCount++;
				
				/* If last item... */
				if(index2 == totalItems-1) {
					/* Set Width for Current Column */
					for(i = 0; i < colItems.length; i++) {
						colItems[i].css("width", tempIWidth);
						colItems[i].addClass("lastCol");
						/* Set height of item to fill rest of column for full right border extension */
						if(i == colItems.length-1 && i != 0) {
							colItems[i].css("height", colItems[i].height()+(maxHeight-colHeight));
						}
					}
					/* Expand width of Item Container */
					tempOWidth = jQuery(this).outerWidth(true); // for CSS position
					/* Store previous width for Left positioning and Container Width */
					prevOWidth += tempOWidth;
					
					/* Expand width of Item Container */
					jQuery(this).parent('ul').css("width", prevOWidth);
				}
			});			
        });
		
		/* Position SubNav to stay within page body */
		var posLeft, subNavWidth, subNavContainer, subNavParent,pageWidth = jQuery("#header").width();
		
		/* Cycle through all subNav containers */
		jQuery("td.mainNavItem").each(function(index, element) {
			subNavContainer = jQuery(this).children("div.mainNavSubContainer").eq(0);
			subNavParent = jQuery(this);
			posLeft = subNavParent.position().left, subNavWidth = subNavContainer.outerWidth();
			/* If Left Position of subNav + its width is greater than the width of the body content */
			if(posLeft+subNavWidth > pageWidth) {
				/* set the left position of this subNav container to negative overflow value */
				subNavContainer.css("left", pageWidth-(posLeft+subNavWidth));
			}
        });
	}
});