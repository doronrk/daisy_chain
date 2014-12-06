(function($){
	//Top postion for roll-over thumbnail based on top postion of carousel outer box
	var TOP_MARGIN_ADDING = -3;
	//Left postion for roll-over thumbnail based on Left postion of carousel inner box
	var LEFT_MARGIN_ADDING = 45;
	/**
		Function name: attachMagnifier
		Purpose: Attach a roll-over thumbnail into carousel item
		params:
			totalNumber: totalNumber of items in Carousel
	*/
	$.fn.attachMagnifier=function(totalNumber){
		//Get outer Div of roll-over thumbnail
		var magnifier=$("#product_detail_carousel_manifier");
		//Get inner Div of roll-over thumbnail
		var magnifierContent=magnifier.children("div.magnifierContent");
		//Find thumbnail carousel image
		var itemImages=$('#product_detail_carousel ul').find(".imagecellbg img");
		//attach event for mouseover/mouseenter
		itemImages.unbind("mouseenter").bind("mouseenter",function(){
			//remove the rollver content before
			magnifierContent.empty();
			var imgObj=$(this);
			//get <li> element that is thumbnail item
			var li = imgObj.parents("li").eq(0);
			//get index of thumbnail item
			var index = parseInt(li.attr("jcarouselindex"));
			//calculate the correct index of item with 1-based index
			if (index <= 0)
				index = index % totalNumber + totalNumber;
			else if (index > totalNumber)
				index = index % totalNumber;
			if (index == 0)
				index = totalNumber;
			//get data to show on roll-over thumbnail
			var contentData = $("#product_detail_carousel_rollover_" + index);
			//show it on roll-over thumbnail
			magnifierContent.append(contentData.html());
			// Start to calculate postion of roll-over thumbnail
			// get carousel outer box
			var contextMain=$("#product_detail_carousel");
			var ulMain = contextMain.find("ul");
			var csswidth = function(elem) {return new Number(elem.css("width").replace("px",""))};
			// set top position of roll-over thumbnail
			magnifier.css("top",contextMain.offset().top + TOP_MARGIN_ADDING);
			// calculate left postion of roll-over thumbnail. Left postion need to be adjusted more.
			var magnifierLeft=contextMain.offset().left + ulMain.position().left + li.position().left-((magnifier.outerWidth()-csswidth(li))/2);
			// get margin left or padding left of outer box
			var marginleft=parseInt(contextMain.css("margin-left").replace("px",""));
			var paddingLeft= parseInt(contextMain.css("padding-left").replace("px",""));
			if (!marginleft) marginleft=0;
			if (!paddingLeft) paddingLeft=0;
			if(contextMain.length>0){
				// if left postion of roll-over thumbnail is less than less postion of inner content of outer box
				// set it to left postion of inner content of outer box (for first thumbnail in carousel)
				if(magnifierLeft<contextMain.offset().left+marginleft+paddingLeft) {
					magnifierLeft=contextMain.offset().left+marginleft+paddingLeft;
				}
				// if left postion of roll-over thumbnail makes the thumbnail floating over right edge of inner content of outer box
				// set it so that thumbnail only floating inside inner content of outer box (for Last thumbnail in carousel)
				else if( (magnifierLeft+magnifier.outerWidth()+LEFT_MARGIN_ADDING) > (contextMain.offset().left+csswidth(contextMain)+marginleft+paddingLeft) ) {
					magnifierLeft=contextMain.offset().left+csswidth(contextMain)-magnifier.outerWidth()+marginleft+paddingLeft;
				}
				//(for thumbnails in carousel except first and last )
				else {
					magnifierLeft=magnifierLeft+LEFT_MARGIN_ADDING;
				}
			}
			//set left postion
			magnifier.css("left",magnifierLeft);
			//set display
			magnifier.css("display","block");

			// support thumbnails watches feature for carousel module
			window.MarketLive && window.MarketLive.ThumbnailSwatches && MarketLive.ThumbnailSwatches.addThumbnailSwatchBehaviors(magnifierContent);
		});
		/**
			Function name: hideMagnifier
			Purpose: hide roll-over thumbnail
		*/
		var hideMagnifier=function(){
			magnifierContent.empty();
			magnifier.css("display","none");
		};
		//attach mouseout/mouseleave to hideEvent for roll-over thumbnail
		magnifierContent.bind("mouseleave",hideMagnifier);
	};
})(jQuery);