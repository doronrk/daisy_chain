var resizesliderlock=false;
var currserviceslideperpage;
var curraccessoriesslideperpage;

$(document).ready(function(){
	
	//JS for model attached
	var productslider;  //variable stores the bxslider for reference later
	
	if (document.documentElement.clientWidth < 497) {
		productslider = createbxslider('#productsliderarea ul.slider',1,249,20,
																	 "#productsliderarea .prevcolumn #productsliderprev",
																	 "#productsliderarea .nextcolumn #productslidernext",
																	 '#productsliderarea .prevcolumn',
																	 '#productsliderarea .nextcolumn',
																	 '#productsliderarea .slidercolumn');
		
		if (productslider.getCurrentSlide()=="0")
		{
			$("#productsliderarea .slidercolumn").addClass("leftalign");
		}
		else
		{
			$("#productsliderarea .slidercolumn").removeClass("leftalign");
		}
															 
		currserviceslideperpage = 1;										
	}
	else if (document.documentElement.clientWidth < 801) {
		productslider = createbxslider('#productsliderarea ul.slider',3,225,10,
																	 "#productsliderarea .prevcolumn #productsliderprev",
																	 "#productsliderarea .nextcolumn #productslidernext",
																	 '#productsliderarea .prevcolumn',
																	 '#productsliderarea .nextcolumn',
																	 '#productsliderarea .slidercolumn');
		currserviceslideperpage = 2;										
	}
	else {
		productslider = createbxslider('#productsliderarea ul.slider',4,225,30,
																	 "#productsliderarea .prevcolumn #productsliderprev",
																	 "#productsliderarea .nextcolumn #productslidernext",
																	 '#productsliderarea .prevcolumn',
																	 '#productsliderarea .nextcolumn',
																	 '#productsliderarea .slidercolumn');
		currserviceslideperpage = 3;										
	}
	
	resetcontrollerposition("#productsliderarea .prevcolumn #productsliderprev",
													"#productsliderarea .nextcolumn #productslidernext",
													'#productsliderarea .slidercolumn .bx-viewport',35,40);
													
	
	
	/*if (document.documentElement.clientWidth < 801) {
		$('#model_attached .slidercolumn .productname').dotdotdot({height:50});
	}
	else {
		$('#model_attached .slidercolumn .productname').dotdotdot({height:60});
	}*/
		
	$("#productsliderarea .prevcolumn #productsliderprev").click(function(){
    productslider.goToPrevSlide();
    return false;
  });
	
	$("#productsliderarea .nextcolumn #productslidernext").click(function(){
    productslider.goToNextSlide();
    return false;
  });
	
	
	$("#productsliderarea .slidercolumn ul li").click(function(){
		var listItem;
		if (document.documentElement.clientWidth < 497)
		{
    	listItem = document.getElementById("#productsliderarea .slidercolumn ul li" );
			productslider.goToSlide($(this).index( listItem ));
			if (productslider.getCurrentSlide()=="0")
			{
				$("#productsliderarea .slidercolumn").addClass("leftalign");
			}
			else
			{
				$("#productsliderarea .slidercolumn").removeClass("leftalign");
			}
			//
			console.log (productslider.getCurrentSlide());															 
																	 
			if (productslider.getCurrentSlide() == (productslider.getSlideCount()-1)) {console.log('SI fue');
				$("#productsliderarea .slidercolumn").addClass("rightalign");
			} else
			{console.log('no fue');
				$("#productsliderarea .slidercolumn").removeClass("rightalign");
			}

			//
			
		}
  });
	
	$(window).resize(function() { 
		if ((document.documentElement.clientWidth < 497) && (currserviceslideperpage != 1)) {
			reloadbxslider(productslider,currserviceslideperpage,1,249,20,
										 "#productsliderarea .prevcolumn #productsliderprev",
										 "#productsliderarea .nextcolumn #productslidernext",
										 '#productsliderarea .prevcolumn',
										 '#productsliderarea .nextcolumn',
										 '#productsliderarea .slidercolumn');
	
			if (productslider.getCurrentSlide()=="0")
			{
				$("#productsliderarea .slidercolumn").addClass("leftalign");
			}
			else
			{
				$("#productsliderarea .slidercolumn").removeClass("leftalign");
			}
										 
			currserviceslideperpage = 1;		
		}
		else if ((document.documentElement.clientWidth >= 497) && (document.documentElement.clientWidth < 801) && (currserviceslideperpage != 2)){
			reloadbxslider(productslider,currserviceslideperpage,3,225,10,
										 "#productsliderarea .prevcolumn #productsliderprev",
										 "#productsliderarea .nextcolumn #productslidernext",
										 '#productsliderarea .prevcolumn',
										 '#productsliderarea .nextcolumn',
										 '#productsliderarea .slidercolumn');
			currserviceslideperpage = 2;				
		}
		else if ((document.documentElement.clientWidth >=801) && (currserviceslideperpage != 3)){
			reloadbxslider(productslider,currserviceslideperpage,4,225,30,
										 "#productsliderarea .prevcolumn #productsliderprev",
										 "#productsliderarea .nextcolumn #productslidernext",
										 '#productsliderarea .prevcolumn',
										 '#productsliderarea .nextcolumn',
										 '#productsliderarea .slidercolumn');
			currserviceslideperpage = 3;					
		}
		
		/*if (document.documentElement.clientWidth < 801) {
			$('#model_attached .slidercolumn .productname').dotdotdot({height:50});
		}
		else {
			$('#model_attached .slidercolumn .productname').dotdotdot({height:60});
		}*/

		resetcontrollerposition("#productsliderarea .prevcolumn #productsliderprev",
														"#productsliderarea .nextcolumn #productslidernext",
														'#productsliderarea .slidercolumn .bx-viewport',35,40);
		
	
	});
	//END JS for model attached
});



function resetcontrollerposition(prevelement,nextelement,sliderviewport,leftadjust,rightadjust){
	$(prevelement).position({
		"my": "right center",
		"at": "left-"+leftadjust+" center",
		"of": $(sliderviewport),
		"collision": "none none"
	});
	
	$(nextelement).position({
		"my": "left center",
		"at": "right+"+rightadjust+" center",
		"of": $(sliderviewport),
		"collision": "none none"
	});
}

function createbxslider(sliderelement,slideno,slidewidth,slidemargin,prevelement,nextelement,
												prevelementcolumn,nextelementcolumn,sliderelementcolumn){
													
	var slider = $(sliderelement).bxSlider({
		minSlides: slideno,
		maxSlides: slideno,
		slideWidth: slidewidth,
		slideMargin: slidemargin,
		controls: false,
		pager: false,
		infiniteLoop: false,
		preventDefaultSwipeX: true,
		onSlideNext: function(){
			if(((slider.getCurrentSlide() + 1) * slideno)  >= slider.getSlideCount())
			{
				$(nextelementcolumn).css("visibility","hidden");
			}
		},
		onSlidePrev: function(){
			if(slider.getCurrentSlide() == 0)
			{
				$(prevelementcolumn).css("visibility","hidden");
			}
		},
		onSlideAfter: function(){
			if(((slider.getCurrentSlide() + 1) * slideno)  < slider.getSlideCount())
			{
				$(nextelementcolumn).css("visibility","visible");
			}
			if(slider.getCurrentSlide() != 0)
			{
				$(prevelementcolumn).css("visibility","visible");
			}
			resetcontrollerposition(prevelement, nextelement, sliderelementcolumn + " " + ".bx-viewport",35,40);
		}
	});
	if(slider.getCurrentSlide() == 0)
	{
		$(prevelementcolumn).css("visibility","hidden");
	}
	else
	{
		$(prevelementcolumn).css("visibility","visible");
	}
	if(((slider.getCurrentSlide() + 1) * slideno)  >= slider.getSlideCount())
	{
		$(nextelementcolumn).css("visibility","hidden");
	}
	else
	{
		$(nextelementcolumn).css("visibility","visible");
	}
	
	return slider;
}


function reloadbxslider(sliderelement,originslideno,slideno,slidewidth,slidemargin,prevelement,nextelement,
												prevelementcolumn,nextelementcolumn,sliderelementcolumn){
	var prevslideno = sliderelement.getCurrentSlide();
	var currsliderno = Math.floor(prevslideno*originslideno/slideno);
	sliderelement.reloadSlider({
		minSlides: slideno,
		maxSlides: slideno,
		slideWidth: slidewidth,
		slideMargin: slidemargin,
		startSlide: currsliderno,
		controls: false,
		pager: false,
		infiniteLoop: false,
		preventDefaultSwipeX: true,		
		onSlideNext: function(){
			if(((sliderelement.getCurrentSlide() + 1) * slideno)  >= sliderelement.getSlideCount())
			{
				$(nextelementcolumn).css("visibility","hidden");
			}
		},
		onSlidePrev: function(){
			if(sliderelement.getCurrentSlide() == 0)
			{
				$(prevelementcolumn).css("visibility","hidden");
			}
		},
		onSlideAfter: function(){
			if(((sliderelement.getCurrentSlide() + 1) * slideno)  < sliderelement.getSlideCount())
			{
				$(nextelementcolumn).css("visibility","visible");
			}
			if(sliderelement.getCurrentSlide() != 0)
			{
				$(prevelementcolumn).css("visibility","visible");
			}
			resetcontrollerposition(prevelement, nextelement, sliderelementcolumn + " " + ".bx-viewport",35,40);
		}
	});
	if(sliderelement.getCurrentSlide() == 0)
	{
		$(prevelementcolumn).css("visibility","hidden");
	}
	else
	{
		$(prevelementcolumn).css("visibility","visible");
	}
	if(((sliderelement.getCurrentSlide() + 1) * slideno)  >= sliderelement.getSlideCount())
	{
		$(nextelementcolumn).css("visibility","hidden");
	}
	else
	{
		$(nextelementcolumn).css("visibility","visible");
	}
}
