document.write('<script src="/javascript/storelocator.js?v=1" type="text/javascript"></script>')
function getElementAbsolutePosition(elemID) {
    var offsetTrail = document.getElementById(elemID);
    var offsetLeft = 0;
    var offsetTop = 0;
    while (offsetTrail) {
        offsetLeft += offsetTrail.offsetLeft;
        offsetTop += offsetTrail.offsetTop;
        offsetTrail = offsetTrail.offsetParent;
    }
    if (navigator.userAgent.indexOf('Mac') != -1 && typeof document.body.leftMargin != 'undefined') {
        offsetLeft += document.body.leftMargin;
        offsetTop += document.body.topMargin;
    }
    return { left: offsetLeft, top: offsetTop };
}


/* This function shows the feeback form. Otari: 132894
It requires 10 parameters:
1. Link Id, 2. Wrapper div Id, 3. Path of the html content page, etc...(variables)
*/
function GetHtmlFeedbackForm(lnk_id, wrapper_id, aj_path, edpno, FeedbackDesc, SKU, FeedbackEmail, ImageHost, CaptchaError, hBoogie) {	
	var elm_lnk = $('#' + lnk_id);
	var elm_wrp = $('#' + wrapper_id);
	var win = $(window);
	var loc = window.location;
	var url = loc.protocol + '//' + loc.hostname + aj_path;
	
	jQuery.ajax({
		type: "POST",
		url: url,
		data: {fb_EdpNo: edpno, fb_FeedbackDesc: FeedbackDesc, fb_SKU: SKU, fb_FeedbackEmail: FeedbackEmail, fb_ImageHost: ImageHost, fb_CaptchaError: CaptchaError, fb_hBoogie: hBoogie},
		dataType: "html",
		async: true,
		success: function(data, textStatus) {
			//clear 
			elm_wrp.empty();
			//get data
			elm_wrp.html(data);	
			//position div				
			var elm_pos = $(elm_lnk).offset();    			
			//var elm_wth = $(elm_lnk).outerWidth();
			var left = elm_pos.left + "px";
			var top = (elm_pos.top + 1) + "px"; 
			elm_wrp.css( { 
				//position: 'absolute',
				zIndex: 5000,
				//left: left, 
				top: top			
			});	    
			//show div
			elm_wrp.css({ display: 'block' });
			//reposition div if below fold
			var win_pos = win.scrollTop() + win.height();
			var abs_pos = elm_wrp.offset().top + elm_wrp.height();
			var new_pos = (elm_pos.top + (win_pos - abs_pos)) + 'px';
			if( abs_pos > win_pos  ) {
			  elm_wrp.css({ top: new_pos });	
			} 
		},      
		error: function(jqXHR, textStatus, errorThrown){ 
			alert("An error has occurred, please try again.\n" + errorThrown);
		}
	});

	return false;
}

 //Item details tabs version 
//Fix z-index youtube video embedding
	$(document).ready(function (){
		$('iframe').each(function(){
		var url = $(this).attr("src");
		if (url.indexOf('reviews_ss.asp')<-1)
		{
			$(this).attr("src",url+"?wmode=transparent");
		}
		});
	});;

	$(document).ready(function (){
	$("#RebateInfoAnchor,#rebateTerms,#rebatelink").click(function (){

		$( "ul.tabs a" ).removeClass("selected");
		$( "#warrantytab a" ).addClass("selected");
		$( "#prodinfo, #spec, #review, #recommendation" ).hide();
		$( "#warranty" ).show();
		
		$('html, body').animate({
		  scrollTop: $("#RebateInfo").offset().top -70
		}, 1000);
		});
	$("#returnlink").click(function (){

		$( "ul.tabs a" ).removeClass("selected");
		$( "#warrantytab a" ).addClass("selected");
		$( "#prodinfo, #spec, #review, #recommendation" ).hide();
		$( "#warranty" ).show();
		
		$('html, body').animate({
		  scrollTop: $("#LimitedExchange").offset().top -70
		}, 1000);
		});
	
	 $("#tabWarrantyTerms,#Warrantylink").click(function (){

		$( "ul.tabs a" ).removeClass("selected");
		$( "#warrantytab a" ).addClass("selected");
		$( "#prodinfo, #spec, #review, #recommendation" ).hide();
		$( "#warranty" ).show();
		
		$('html, body').animate({
		  scrollTop: $("ul.tabs").offset().top 
		}, 1000);
		});
		
		
		$("#reviews").click(function (){

			$( "ul.tabs a" ).removeClass("selected");
			$( "#reviewtab a" ).addClass("selected");
			$( "#prodinfo, #spec,  #review, #recommendation" ).hide();
			$( "#review" ).show();
			
			$('html, body').animate({
				scrollTop: $("ul.tabs").offset().top
			}, 1000);
		});
		$(".backtotop").click(function (){

		
			$('html, body').animate({
				scrollTop: $("html").offset().top
			}, 1000);
		});
		$("#AdditionalResources").click(function (){

			$('html, body').animate({
				scrollTop: $("#ProductManuals").offset().top - 70
			}, 1000);
		});
		showReviewTab();
	  
	 if(window.location.href.indexOf('#WriteReview') > -1)
	{
		$("#Writereviews,#Writereviewsbtn").click(function (){
			showWriteReview();
	});
	}
	
	//For QA Tab
	if(window.location.href.indexOf('body=QA') > -1 || window.location.href.indexOf('Body=QA') > -1)
	{	
		$( "ul.tabs a" ).removeClass("selected");
		$( "#QATab a" ).addClass("selected");
		$( "#prodinfo, #spec, #review, #recommendation" ).hide();
		$( "#QA" ).show();

		$('html, body').animate({
		scrollTop: $("ul.tabs").offset().top 
		}, 1000);
	}
   });

   function showReviewTab(){
	if(window.location.href.indexOf('#CustomerReviewsBlock') > -1)
	{
		$( "ul.tabs a" ).removeClass("selected");
		$( "#reviewtab a" ).addClass("selected");
		$( "#prodinfo, #spec, #review, #recommendation" ).hide();
		$( "#review" ).show();

		$('html, body').animate({
		scrollTop: $("ul.tabs").offset().top 
		}, 1000);
	}
	
	if(window.location.href.indexOf('#WriteReview') > -1)
	{
		showWriteReview();
	}
	} 
   function showWriteReview()
   {
	$( "ul.tabs a" ).removeClass("selected");
	$( "#reviewtab a" ).addClass("selected");
	$( "#prodinfo, #spec, #review, #recommendation" ).hide();
	$( "#review" ).show();

	$( "#WriteReviewBox" ).css({ display: "block" });

	$('html, body').animate({
		scrollTop: $("#WriteReviewBox").offset().top - 70
		}, 1000);
}
	 $(window).scroll(function(e) { var y = $(this).scrollTop();
if (y > 550)  { $('#stickheader').fadeIn(1000);
} else  { $('#stickheader').fadeOut();
}

});

//New template

//bundles and upgrades layer
 $(window).scroll(function(e) { var y = $(this).scrollTop();
	if (y > 100) { $('#Upsell').fadeIn(1000);
   
	}
});


function setTab(link, event) { 
  if(event) { event.preventDefault();  }

  var ulobj = $(link).closest('ul');

  $(ulobj).find('a').removeClass('selected');
  $(link).addClass('selected').blur();

  var duration = ulobj.hasClass('fading') ? 'slow' : 0;
  $('a', ulobj).each(function(i, item) { var tabobj = $(item).attr('rel');
	$(tabobj).hide();
  });
  $($(link).attr('rel')).fadeTo(duration, 1);
  	   $('#close_upsell').addClass("openIcon");
	   $('#slidehide').slideUp();
  }

	// Handle tab selection
  $('ul.tabs > li > a').live('click', function(e) { setTab(this, e);
  
	//Get Location of tab's content
	var contentLocation = $(this).attr('href');
  
	//Let go if not a hashed one
	if(contentLocation.charAt(0)=="#") { e.preventDefault();
  
	  //Make Tab Active
	  $(this).parent().siblings().children('a').removeClass('selected');
	  $(this).addClass('selected');
  
	  //Show Tab Content & add active class
	  $(contentLocation).show().addClass('selected').siblings('.bd').hide().removeClass('selected');
	}
  });

	function setHomeStoreAvailability(availability){		
		if(availability){
			$("#nearest-store-availability").text("Available in-store").removeClass("not-availableGray").addClass("available");
		}
		else {
			$("#nearest-store-availability").text("Not Available in-store").removeClass("available").addClass("not-availableGray");
		}
	}