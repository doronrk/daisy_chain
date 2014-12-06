var resizesliderlock=false;
var currserviceslideperpage;
var curraccessoriesslideperpage;

$(document).ready(function () {

var sliderLoaded = false;
var content_parsed = false;
	

if (runResponsive)	{
	var checkAndChangeHtml = function() {
	   if (!content_parsed)	{
	   if(matchMedia("screen and (max-width : 800px)").matches) {
	   
	   } else {
		   if (!sliderLoaded){
		   category_slider_global();
		   sliderLoaded = true;
		   }
		  content_parsed = true;
	   }
	   }
	   
};

window.addEventListener('resize', checkAndChangeHtml);
checkAndChangeHtml();

}else{
	//IE support: 1 Initialize scripts and then 2.parse the content of <script type="text/conditional-html" id="featured_products_source">
category_slider_global();

}
});



$(document).ready(function(){
	// JS for model_PLP
	$('.page_view').click(function(e) {
    if ($(this).hasClass('grid')) {
			makeActive(this);
			$('.product-card').removeClass("listview");
			$("#model-plp-body").removeClass("listview");
    }
    else if($(this).hasClass('list')) {
			makeActive(this);
			$('.product-card').addClass("listview");
			$("#model-plp-body").addClass("listview");
    }
		setellipsis();
		checkModelproductname();
		
		function makeActive (el){
			$('.page_view').removeClass('active');
			$(el).addClass('active');
			return true;
		}
	});
	
	setellipsis();
	checkModelproductname();
	
	$(window).on('resize',  function( e ) {
		if ($("#model-plp-body").length) 
		{
			if (($(window).width() > 800) && ($('.page_view_controls #listView').hasClass('active')))
			{
				$('.product-card').addClass("listview");
			}
			else
			{
				$('.product-card').removeClass("listview");
			}
		}
		$('.product-card .item1column h3').trigger("update.dot");
		$('.product-card .item1column ul.firstFeaturesList >li').trigger("update.dot");
		$('.product-card .item1column ul.secondFeaturesList >li').trigger("update.dot");
		checkModelproductname();
	});
});
	
function setellipsis(){
	$('.product-card .item1column h3').dotdotdot({height:75});
	$('.product-card .item1column ul.firstFeaturesList >li').dotdotdot({height:40});
	$('.product-card .item1column ul.secondFeaturesList >li').dotdotdot({height:40});
}
//END JS for model PLP

$(document).ready(function(){
	//JS for model PDP
	$(window).on('resize',  function( e ) {
		if (($("#viewalloption").length) && ($("#viewalloption").css("display")!="none")) 
		{
			if ($(window).width() > 800)
			{
				$('#viewalloption .listviewproductarea .product-card').addClass("listview");
			}
			else
			{
				$('#viewalloption .listviewproductarea .product-card').removeClass("listview");
			}
		}
		checkModelproductname();
	});
	//END JS for model PDP
});

	//JS for model attached
	var serviceslider;  //variable stores the bxslider for reference later
	var accessoriesslider;  //variable stores the bxslider for reference later
$(document).ready(function(){	
	if (document.documentElement.clientWidth < 497) {
		serviceslider = createbxslider('#servicesliderarea ul.slider',1,249,10,
																	 "#servicesliderarea .prevcolumn #servicesliderprev",
																	 "#servicesliderarea .nextcolumn #serviceslidernext",
																	 '#servicesliderarea .prevcolumn',
																	 '#servicesliderarea .nextcolumn',
																	 '#servicesliderarea .slidercolumn');
		if (serviceslider.getCurrentSlide()=="0")
		{
			$("#servicesliderarea .slidercolumn").addClass("leftalign");
		}
		else
		{
			$("#servicesliderarea .slidercolumn").removeClass("leftalign");
		}
		currserviceslideperpage = 1;										
	}
	else if (document.documentElement.clientWidth < 801) {
		serviceslider = createbxslider('#servicesliderarea ul.slider',2,225,10,
																	 "#servicesliderarea .prevcolumn #servicesliderprev",
																	 "#servicesliderarea .nextcolumn #serviceslidernext",
																	 '#servicesliderarea .prevcolumn',
																	 '#servicesliderarea .nextcolumn',
																	 '#servicesliderarea .slidercolumn');
		currserviceslideperpage = 2;
		if (serviceslider.getCurrentSlide()=="0")
		{
			$("#servicesliderarea .prevcolumn #servicesliderprev").addClass("disable");
		}
		else
		{
			$("#servicesliderarea .prevcolumn #servicesliderprev").removeClass("disable");
		}
		if (((serviceslider.getCurrentSlide() + 1) * currserviceslideperpage) > serviceslider.getSlideCount())
		{
			$("#servicesliderarea .nextcolumn #serviceslidernext").addClass("disable");
		}
		else
		{
			$("#servicesliderarea .nextcolumn #serviceslidernext").removeClass("disable");
		}
		$("#servicesliderarea .prevcolumn").css("visibility","visible");
		$("#servicesliderarea .nextcolumn").css("visibility","visible");										
	}
	else {
		serviceslider = createbxslider('#servicesliderarea ul.slider',3,260,10,
																	 "#servicesliderarea .prevcolumn #servicesliderprev",
																	 "#servicesliderarea .nextcolumn #serviceslidernext",
																	 '#servicesliderarea .prevcolumn',
																	 '#servicesliderarea .nextcolumn',
																	 '#servicesliderarea .slidercolumn');
		currserviceslideperpage = 3;
		if (serviceslider.getCurrentSlide()=="0")
		{
			$("#servicesliderarea .prevcolumn #servicesliderprev").addClass("disable");
		}
		else
		{
			$("#servicesliderarea .prevcolumn #servicesliderprev").removeClass("disable");
		}
		if (((serviceslider.getCurrentSlide() + 1) * currserviceslideperpage) > serviceslider.getSlideCount())
		{
			$("#servicesliderarea .nextcolumn #serviceslidernext").addClass("disable");
		}
		else
		{
			$("#servicesliderarea .nextcolumn #serviceslidernext").removeClass("disable");
		}
		$("#servicesliderarea .prevcolumn").css("visibility","visible");
		$("#servicesliderarea .nextcolumn").css("visibility","visible");										
	}
													
	if (document.documentElement.clientWidth < 497) {
		accessoriesslider = createbxslider('#accessoriessliderarea ul.slider',1,249,10,
																	 "#accessoriessliderarea .prevcolumn #accessoriessliderprev",
																	 "#accessoriessliderarea .nextcolumn #accessoriesslidernext",
																	 '#accessoriessliderarea .prevcolumn',
																	 '#accessoriessliderarea .nextcolumn',
																	 '#accessoriessliderarea .slidercolumn');
		if (accessoriesslider.getCurrentSlide()=="0")
		{
			$("#accessoriessliderarea .slidercolumn").addClass("leftalign");
		}
		else
		{
			$("#accessoriessliderarea .slidercolumn").removeClass("leftalign");
		}
		curraccessoriesslideperpage = 1;										
	}
	else if (document.documentElement.clientWidth < 801) {
		accessoriesslider = createbxslider('#accessoriessliderarea ul.slider',2,225,10,
																	 "#accessoriessliderarea .prevcolumn #accessoriessliderprev",
																	 "#accessoriessliderarea .nextcolumn #accessoriesslidernext",
																	 '#accessoriessliderarea .prevcolumn',
																	 '#accessoriessliderarea .nextcolumn',
																	 '#accessoriessliderarea .slidercolumn');
		curraccessoriesslideperpage = 2;
		if (accessoriesslider.getCurrentSlide()=="0")
		{
			$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").addClass("disable");
		}
		else
		{
			$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").removeClass("disable");
		}
		if (((accessoriesslider.getCurrentSlide() + 1) * curraccessoriesslideperpage) > accessoriesslider.getSlideCount())
		{
			$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").addClass("disable");
		}
		else
		{
			$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").removeClass("disable");
		}
		$("#accessoriessliderarea .prevcolumn").css("visibility","visible");
		$("#accessoriessliderarea .nextcolumn").css("visibility","visible");
	}
	else {
		accessoriesslider = createbxslider('#accessoriessliderarea ul.slider',3,260,10,
																	 "#accessoriessliderarea .prevcolumn #accessoriessliderprev",
																	 "#accessoriessliderarea .nextcolumn #accessoriesslidernext",
																	 '#accessoriessliderarea .prevcolumn',
																	 '#accessoriessliderarea .nextcolumn',
																	 '#accessoriessliderarea .slidercolumn');
		curraccessoriesslideperpage = 3;	
		if (accessoriesslider.getCurrentSlide()=="0")
		{
			$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").addClass("disable");
		}
		else
		{
			$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").removeClass("disable");
		}
		if (((accessoriesslider.getCurrentSlide() + 1) * curraccessoriesslideperpage) > accessoriesslider.getSlideCount())
		{
			$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").addClass("disable");
		}
		else
		{
			$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").removeClass("disable");
		}
		$("#accessoriessliderarea .prevcolumn").css("visibility","visible");
		$("#accessoriessliderarea .nextcolumn").css("visibility","visible");									
	}
		
	/*if (document.documentElement.clientWidth < 497) {
		$('#model_attached .productinfoarea .productinfo .productname').dotdotdot({});
		$('#model_attached .slidercolumn .productname').dotdotdot({height:60});
	}
	else {
		$('#model_attached .productinfoarea .productinfo .productname').dotdotdot({height:80});
		$('#model_attached .slidercolumn .productname').dotdotdot({height:80});
	}*/
	
	resetcontrollerposition("#servicesliderarea .prevcolumn #servicesliderprev",
													"#servicesliderarea .nextcolumn #serviceslidernext",
													'#servicesliderarea .slidercolumn .bx-viewport');
	
	resetcontrollerposition("#accessoriessliderarea .prevcolumn #accessoriessliderprev",
													"#accessoriessliderarea .nextcolumn #accessoriesslidernext",
													'#accessoriessliderarea .slidercolumn .bx-viewport');

		
	$("#servicesliderarea .prevcolumn #servicesliderprev").click(function(){
		if (serviceslider.getCurrentSlide()!="0")
		{
    	serviceslider.goToPrevSlide();
			if (serviceslider.getCurrentSlide()=="0")
			{
				$("#servicesliderarea .prevcolumn #servicesliderprev").addClass("disable");
			}
			else
			{
				$("#servicesliderarea .prevcolumn #servicesliderprev").removeClass("disable");
			}
			$("#servicesliderarea .nextcolumn #serviceslidernext").removeClass("disable");
			$("#servicesliderarea .prevcolumn").css("visibility","visible");
			$("#servicesliderarea .nextcolumn").css("visibility","visible");
		}
    return false;
  });
	
	$("#servicesliderarea .nextcolumn #serviceslidernext").click(function(){
		if (((serviceslider.getCurrentSlide() + 1) * currserviceslideperpage) <= serviceslider.getSlideCount())
		{
    	serviceslider.goToNextSlide();
			if (((serviceslider.getCurrentSlide() + 1) * currserviceslideperpage) > serviceslider.getSlideCount())
			{
				$("#servicesliderarea .nextcolumn #serviceslidernext").addClass("disable");
			}
			else
			{
				$("#servicesliderarea .nextcolumn #serviceslidernext").removeClass("disable");
			}
			$("#servicesliderarea .prevcolumn #servicesliderprev").removeClass("disable");
			$("#servicesliderarea .prevcolumn").css("visibility","visible");
			$("#servicesliderarea .nextcolumn").css("visibility","visible");
		}
    return false;
  });
	
	$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").click(function(){
		if (accessoriesslider.getCurrentSlide()!="0")
		{
			accessoriesslider.goToPrevSlide();
			if (accessoriesslider.getCurrentSlide()=="0")
			{
				$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").addClass("disable");
			}
			else
			{
				$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").removeClass("disable");
			}
			$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").removeClass("disable");
			$("#accessoriessliderarea .prevcolumn").css("visibility","visible");
			$("#accessoriessliderarea .nextcolumn").css("visibility","visible");
		}
    return false;
  });
	
	$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").click(function(){
		if (((accessoriesslider.getCurrentSlide() + 1) * curraccessoriesslideperpage) <= accessoriesslider.getSlideCount())
		{
    	accessoriesslider.goToNextSlide();
			if (((accessoriesslider.getCurrentSlide() + 1) * curraccessoriesslideperpage) > accessoriesslider.getSlideCount())
			{
				$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").addClass("disable");
			}
			else
			{
				$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").removeClass("disable");
			}
			$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").removeClass("disable");
			$("#accessoriessliderarea .prevcolumn").css("visibility","visible");
			$("#accessoriessliderarea .nextcolumn").css("visibility","visible");
		}
    return false;
  });
	
	$("#servicesliderarea .slidercolumn ul li").click(function(){
		var listItem;
		if (document.documentElement.clientWidth < 497)
		{
    	listItem = document.getElementById("#servicesliderarea .slidercolumn ul li" );
			serviceslider.goToSlide($(this).index( listItem ));
			if (serviceslider.getCurrentSlide()=="0")
			{
				$("#servicesliderarea .slidercolumn").addClass("leftalign");
			}
			else
			{
				$("#servicesliderarea .slidercolumn").removeClass("leftalign");
			}
		}
  });
	
	$("#accessoriessliderarea .slidercolumn ul li").click(function(){
		var listItem;
		if (document.documentElement.clientWidth < 497)
		{
    	listItem = document.getElementById("#accessoriessliderarea .slidercolumn ul li" );
			accessoriesslider.goToSlide($(this).index( listItem ));
			if (accessoriesslider.getCurrentSlide()=="0")
			{
				$("#accessoriessliderarea .slidercolumn").addClass("leftalign");
			}
			else
			{
				$("#accessoriessliderarea .slidercolumn").removeClass("leftalign");
			}
		}
  });
	
	$(window).resize(function() { 
		if ((document.documentElement.clientWidth < 497) && (currserviceslideperpage != 1)) {
			reloadbxslider(serviceslider,currserviceslideperpage,1,249,10,
										 "#servicesliderarea .prevcolumn #servicesliderprev",
										 "#servicesliderarea .nextcolumn #serviceslidernext",
										 '#servicesliderarea .prevcolumn',
										 '#servicesliderarea .nextcolumn',
										 '#servicesliderarea .slidercolumn');
			if (serviceslider.getCurrentSlide()=="0")
			{
				$("#servicesliderarea .slidercolumn").addClass("leftalign");
			}
			else
			{
				$("#servicesliderarea .slidercolumn").removeClass("leftalign");
			}
			currserviceslideperpage = 1;		
		}
		else if ((document.documentElement.clientWidth >= 497) && (document.documentElement.clientWidth < 801) && (currserviceslideperpage != 2)){
			reloadbxslider(serviceslider,currserviceslideperpage,2,225,10,
										 "#servicesliderarea .prevcolumn #servicesliderprev",
										 "#servicesliderarea .nextcolumn #serviceslidernext",
										 '#servicesliderarea .prevcolumn',
										 '#servicesliderarea .nextcolumn',
										 '#servicesliderarea .slidercolumn');
			currserviceslideperpage = 2;
			if (serviceslider.getCurrentSlide()=="0")
			{
				$("#servicesliderarea .prevcolumn #servicesliderprev").addClass("disable");
			}
			else
			{
				$("#servicesliderarea .prevcolumn #servicesliderprev").removeClass("disable");
			}
			if (((serviceslider.getCurrentSlide() + 1) * currserviceslideperpage) > serviceslider.getSlideCount())
			{
				$("#servicesliderarea .nextcolumn #serviceslidernext").addClass("disable");
			}
			else
			{
				$("#servicesliderarea .nextcolumn #serviceslidernext").removeClass("disable");
			}
			$("#servicesliderarea .prevcolumn").css("visibility","visible");
			$("#servicesliderarea .nextcolumn").css("visibility","visible");			
		}
		else if ((document.documentElement.clientWidth >=801) && (currserviceslideperpage != 3)){
			reloadbxslider(serviceslider,currserviceslideperpage,3,260,10,
										 "#servicesliderarea .prevcolumn #servicesliderprev",
										 "#servicesliderarea .nextcolumn #serviceslidernext",
										 '#servicesliderarea .prevcolumn',
										 '#servicesliderarea .nextcolumn',
										 '#servicesliderarea .slidercolumn');
			currserviceslideperpage = 3;
			if (serviceslider.getCurrentSlide()=="0")
			{
				$("#servicesliderarea .prevcolumn #servicesliderprev").addClass("disable");
			}
			else
			{
				$("#servicesliderarea .prevcolumn #servicesliderprev").removeClass("disable");
			}
			if (((serviceslider.getCurrentSlide() + 1) * currserviceslideperpage) > serviceslider.getSlideCount())
			{
				$("#servicesliderarea .nextcolumn #serviceslidernext").addClass("disable");
			}
			else
			{
				$("#servicesliderarea .nextcolumn #serviceslidernext").removeClass("disable");
			}
			$("#servicesliderarea .prevcolumn").css("visibility","visible");
			$("#servicesliderarea .nextcolumn").css("visibility","visible");				
		}
		
		if ((document.documentElement.clientWidth < 497) && (curraccessoriesslideperpage != 1)) {
			reloadbxslider(accessoriesslider,curraccessoriesslideperpage,1,249,10,
										 "#accessoriessliderarea .prevcolumn #accessoriessliderprev",
										 "#accessoriessliderarea .nextcolumn #accessoriesslidernext",
										 '#accessoriessliderarea .prevcolumn',
										 '#accessoriessliderarea .nextcolumn',
										 '#accessoriessliderarea .slidercolumn');
			if (accessoriesslider.getCurrentSlide()=="0")
			{
				$("#accessoriessliderarea .slidercolumn").addClass("leftalign");
			}
			else
			{
				$("#accessoriessliderarea .slidercolumn").removeClass("leftalign");
			}
			curraccessoriesslideperpage = 1;		
		}
		else if ((document.documentElement.clientWidth >= 497) && (document.documentElement.clientWidth < 801) && (curraccessoriesslideperpage != 2)){
			reloadbxslider(accessoriesslider,curraccessoriesslideperpage,2,225,10,
										 "#accessoriessliderarea .prevcolumn #accessoriessliderprev",
										 "#accessoriessliderarea .nextcolumn #accessoriesslidernext",
										 '#accessoriessliderarea .prevcolumn',
										 '#accessoriessliderarea .nextcolumn',
										 '#accessoriessliderarea .slidercolumn');
			curraccessoriesslideperpage = 2;
			if (accessoriesslider.getCurrentSlide()=="0")
			{
				$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").addClass("disable");
			}
			else
			{
				$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").removeClass("disable");
			}
			if (((accessoriesslider.getCurrentSlide() + 1) * curraccessoriesslideperpage) > accessoriesslider.getSlideCount())
			{
				$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").addClass("disable");
			}
			else
			{
				$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").removeClass("disable");
			}
			$("#accessoriessliderarea .prevcolumn").css("visibility","visible");
			$("#accessoriessliderarea .nextcolumn").css("visibility","visible");				
		}
		else if ((document.documentElement.clientWidth >=801) && (curraccessoriesslideperpage != 3)){
			reloadbxslider(accessoriesslider,curraccessoriesslideperpage,3,260,10,
										 "#accessoriessliderarea .prevcolumn #accessoriessliderprev",
										 "#accessoriessliderarea .nextcolumn #accessoriesslidernext",
										 '#accessoriessliderarea .prevcolumn',
										 '#accessoriessliderarea .nextcolumn',
										 '#accessoriessliderarea .slidercolumn');
			curraccessoriesslideperpage = 3;
			if (accessoriesslider.getCurrentSlide()=="0")
			{
				$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").addClass("disable");
			}
			else
			{
				$("#accessoriessliderarea .prevcolumn #accessoriessliderprev").removeClass("disable");
			}
			if (((accessoriesslider.getCurrentSlide() + 1) * curraccessoriesslideperpage) > accessoriesslider.getSlideCount())
			{
				$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").addClass("disable");
			}
			else
			{
				$("#accessoriessliderarea .nextcolumn #accessoriesslidernext").removeClass("disable");
			}
			$("#accessoriessliderarea .prevcolumn").css("visibility","visible");
			$("#accessoriessliderarea .nextcolumn").css("visibility","visible");					
		}
		
		/*if (document.documentElement.clientWidth < 497) {
			$('#model_attached .productinfoarea .productinfo .productname').dotdotdot({});
			$('#model_attached .slidercolumn .productname').dotdotdot({height:60});
		}
		else {
			$('#model_attached .productinfoarea .productinfo .productname').dotdotdot({height:80});
			$('#model_attached .slidercolumn .productname').dotdotdot({height:80});
		}*/

		resetcontrollerposition("#servicesliderarea .prevcolumn #servicesliderprev",
														"#servicesliderarea .nextcolumn #serviceslidernext",
														'#servicesliderarea .slidercolumn .bx-viewport');
		
		resetcontrollerposition("#accessoriessliderarea .prevcolumn #accessoriessliderprev",
														"#accessoriessliderarea .nextcolumn #accessoriesslidernext",
														'#accessoriessliderarea .slidercolumn .bx-viewport');
	});
	//END JS for model attached
});

function resetcontrollerposition(prevelement,nextelement,sliderviewport){
	$(prevelement).position({
		"my": "right center",
		"at": "left-45 center",
		"of": $(sliderviewport),
		"collision": "none none"
	});
	
	$(nextelement).position({
		"my": "left center",
		"at": "right+45 center",
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
		onSliderLoad: function(){
			resetcontrollerposition(prevelement, nextelement, sliderelementcolumn + " " + ".bx-viewport");
		},
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
			resetcontrollerposition(prevelement, nextelement, sliderelementcolumn + " " + ".bx-viewport");
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
		onSliderLoad: function(){
			resetcontrollerposition(prevelement, nextelement, sliderelementcolumn + " " + ".bx-viewport");
		},
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
			resetcontrollerposition(prevelement, nextelement, sliderelementcolumn + " " + ".bx-viewport");
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

function checkModelproductname(){
	$('.product-card.modelproduct .item1column h3').each(function(e) {
		if ((!($(this).parents(".product-card.modelproduct").hasClass("listview"))) && ($(this).height() > 45))
		{
			$(this).parent().siblings('.secondFeaturesList').children('li:nth-child(2)').css("display","none");
		}
		else
		{
			$(this).parent().siblings('.secondFeaturesList').children('li:nth-child(2)').css("display","block");
		}
	});
	
	$('.product-card.skuproduct .item1column h3').each(function(e) {
		if ((!($(this).parents(".product-card.skuproduct").hasClass("listview"))) && ($(this).height() > 45))
		{
			$(this).parent().siblings('.secondFeaturesList').children('li').css("display","none");
		}
		else
		{
			$(this).parent().siblings('.secondFeaturesList').children('li').css("display","block");
		}
	});
}