// JavaScript Document
$(document).ready(function(){
	
	$("#findbycartridgenumber").css("display","none");
	$("#printernumberoptionmodearea").click(function(){
		$("#printernumberoptionmodearea").addClass("active");
		$("#findprinteroptionmodearea").removeClass("active");
		$("#cartridgenumberoptionmodearea").removeClass("active");
		$("#findbyprintertype").css("display","none");
		$("#findbyprinternumber").css("display","block");
		$("#findbycartridgenumber").css("display","none");
	
		
	});
	$("#findprinteroptionmodearea").click(function(){
		$("#cartridgenumberoptionmodearea").removeClass("active");
		$("#printernumberoptionmodearea").removeClass("active");
		$("#findprinteroptionmodearea").addClass("active");
		$("#findbyprinternumber").css("display","none");
		$("#findbycartridgenumber").css("display","none");
		$("#findbyprintertype").css("display","block");
		


	});
	
	$("#cartridgenumberoptionmodearea").click(function(){
		$("#printernumberoptionmodearea").removeClass("active");
		$("#findprinteroptionmodearea").removeClass("active");
		$("#cartridgenumberoptionmodearea").addClass("active");
		$("#findbyprinternumber").css("display","none");
		$("#findbyprintertype").css("display","none");
		$("#findbycartridgenumber").css("display","block");


	});
	
	$("#accessoriesfinder .exploreCategory .exploremodearea .bytypearea").click(function(){
		$("#accessoriesfinder .exploreCategory .exploremodearea .bytypearea").addClass("active");
		$("#accessoriesfinder .exploreCategory .exploremodearea .byusearea").removeClass("active");
		$("#accessoriesfinder .exploreCategory .byusescenario").css("display","none");
		$("#accessoriesfinder .exploreCategory .bytypescenario").css("display","block");
	});
	$("#accessoriesfinder .exploreCategory .exploremodearea .byusearea").click(function(){
		$("#accessoriesfinder .exploreCategory .exploremodearea .bytypearea").removeClass("active");
		$("#accessoriesfinder .exploreCategory .exploremodearea .byusearea").addClass("active");
		$("#accessoriesfinder .exploreCategory .bytypescenario").css("display","none");
		$("#accessoriesfinder .exploreCategory .byusescenario").css("display","block");
	});
	
	var featuredaccessoriesslider = $('#featuredaccessories ul').bxSlider({
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 250,
		slideMargin: 10,
		controls: false,
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		onSlideNext: function(){
			if(((featuredaccessoriesslider.getCurrentSlide() + 1) *4)  >= featuredaccessoriesslider.getSlideCount())
			{
				$('#featuredaccessories .nextcolumn').css("display","none");
			}
			$('#featuredaccessories .slidercolumn').css("margin-left","0em");
			$('#featuredaccessories .prevcolumn').css("display","block").css("visibility","visible");
  	},
		onSlidePrev: function(){
			if(featuredaccessoriesslider.getCurrentSlide() == 0)
			{
				$('#featuredaccessories .prevcolumn').css("display","block").css("visibility","hidden");
				$('#featuredaccessories .slidercolumn').css("margin-left","15px");
			}
			$('#featuredaccessories .nextcolumn').css("display","block");
		},
	});
	
	$('#featuredaccessories #prev').click(function(){
    featuredaccessoriesslider.goToPrevSlide();
    return false;
  });
	
	$('#featuredaccessories #next').click(function(){
    featuredaccessoriesslider.goToNextSlide();
    return false;
  });
 
	
});	
