$(function() {
/*ATG-5549 issue fix starts*/
if($('#isNewimg').is(':visible') && $('.isBogoimg').is(':visible')){
	
	$('#isNewimg').css("display","none");
}
/*ATG-5549 issue fix ends*/
	
/*JIRA ATG-5342 code fix starts*/
$("#increase,#decrease,.quantity-title").disableSelection();
/*JIRA ATG-5342 code fix ends*/
/*JIRA-409 fix Starts*/
if($("#size-drop-down").is(':visible')){
$('#s-waist-size').css("display","none");
}
/*JIRA-409 fix ends*/
prodId=$("#skava_productId").val();
try {
	$BV.ui("qa", "show_questions", {productId:prodId,subjectType: "product"});
} catch(e) {
	$log.error('$BV.ui call failed', e);
}
/*JITA-402 fix starts*/
$("#s-waist-size_lbl").text($("#s-waist-size_lbl").text().replace(/\s/g, ""));
/*JITA-402 fix ends*/
/*jira 331 */
$(document).on('click',function(e) {
	   var target=$(e.target);
	   if(target.is(".s-waist-number"))
	   {
	      if(target.parent().hasClass("size_unavail")){
	        return true;
	       }
		   else{
			$(".size-holder").removeClass("pdp-s-error-yellow");
			$(".Enr_Id_tooltip").hide(); 
		   }
	   }
	   else if(!target.is(".btnImage,.s-addtoBag,#increase,#decrease,.add_to_list")){
			$(".size-holder,.quantity-left-column,#resultNumber").removeClass("pdp-s-error-yellow");
			$(".quantity-left-column,#resultNumber").removeClass("pdp-s-qty-yellow");
			$(".Enr_maxqty_tooltip,.Enr_Id_tooltip,.Enr_qty_tooltip,#error_display1,#error").hide();
    } 
}); 
/*story *351 fix code starts*/
$(".swatch").live("click",function(){
var actlen=$(".size-waist").children("div.border2pxBlack").children('a').length;
if(actlen !=0){
	$(".add-to-bag-pdp").removeClass("bag_disable");
	$('#error_display1').hide();
}
});
$(".size_off_left1").live("click",function(){
		if($(this).hasClass("size_unavail")){
			$(this).unbind("click");
		}
		else{
		$(".add-to-bag-pdp").removeClass("bag_disable");
		}
});
/*story *351 fix code ends*/

	 function showtoolTip(){
        $(".Enr_Id_tooltip").fadeIn();
	}

	function hidetoolTip(){
		$(".Enr_Id_tooltip").fadeOut();
	}
	$('.disabled, .size_unavail').unbind('click');
	var $addItem = parseInt($("#resultNumber").val(), 10), // Data Type Conversion; String to Integer (int)
	lowThreshhold = 1; 
	var maxQty = parseInt($("#skuMaxPurchaseQty").val(), 10);
	if( isNaN($addItem) ) {
		$addItem=1;
		$("#resultNumber").val(1); 		
	}else{
		// added to support UPDATE BAG
		$("#resultNumber").val($addItem);		
	}

// Min Quantity
/*
Show the /increased/decreased/entered quantity, logic to show max/min quantity
*/
$("#resultNumber").live('change', function () {
	var inputs = $("input[type='text']#resultNumber").val();
	if (inputs < lowThreshhold) {
	inputs = lowThreshhold;
	} else {
	inputs = $("input[type='text']#resultNumber").val();
	}
	$("#resultNumber").val(inputs);
	$addItem = parseInt(inputs, 10);
});
/*click event handlers functionality, remove max quantity logic if it is not required.*/
$('#increase').unbind('click').bind('click',function(){
	var $item=parseInt($("#resultNumber").val(),10);
	if($("#resultNumber").hasClass('free_gift'))
		{
			return false;
		}
	else if ( $(this).attr('id') === 'increase') {
		/*for mingle story #436 starts*/
		if(maxQty == 0){
		$("#resultNumber").val($addItem = $addItem + 1);
		$(".Enr_qty_tooltip").hide();
		dynamicGWPAddToCartANDMsgDisplay(prodId);
		}
		else if($("#resultNumber").val() >= maxQty){
		$(".quantity-left-column,#resultNumber").addClass("pdp-s-qty-yellow");
		$(".Enr_qty_tooltip").fadeIn();
		}
		else{
		$("#resultNumber").val($addItem = $addItem + 1);
		$(".Enr_qty_tooltip").hide();
		dynamicGWPAddToCartANDMsgDisplay(prodId);
		}
		  /* mingle story #436 ends*/
	}
});
/*JIRA-5175 code fix starts*/
$("#resultNumber").live('keypress',function(event){
		/*ATG-5658 code fix starts*/
		if(!$.browser.webkit){
			$(this).val($(this).val().replace(/[^\d].+/, ""));
		}
	    /*ATG-5658 code fix ends*/
		if ( !((event.which > 47 && event.which < 58 )|| event.which == 13 || event.which == 8)) {
			event.preventDefault();
		}
	});
/*JIRA-5175 code fix ends*/
/*for mingle story #436 starts */
$("#resultNumber").bind('keyup blur',function(event){
		if(maxQty == 0){
		   return 1;
		}
		else if($(this).val() > maxQty){
			$(".quantity-left-column,#resultNumber").addClass("pdp-s-qty-yellow");
			$(".Enr_qty_tooltip").fadeIn();
			$(this).val(maxQty);
		}
		else
		{
			$(".quantity-left-column,#resultNumber").removeClass("pdp-s-qty-yellow");
			$(".Enr_qty_tooltip").hide();
		}
});
/*for mingle story #436 ends */
$('#decrease').unbind("click").bind('click',function () {
var $item=parseInt($("#resultNumber").val(),10);
/*for mingle story #436 starts */
$(".quantity-left-column,#resultNumber").removeClass("pdp-s-qty-yellow");
$(".Enr_qty_tooltip").hide();
/*for mingle story #436 ends */
if ($addItem > lowThreshhold && $(this).attr('id') === 'decrease') {
$("#resultNumber").val($addItem = $addItem - 1);
dynamicGWPAddToCartANDMsgDisplay(prodId);

}
});
/*
add final quantitiy to the Add to bag and set the deafult to 1
*/
$("#addToBag").live('click', function () {
	var len=$(".size-waist").children("div").children('a').length;
	var actlen=$(".size-waist").children("div.border2pxBlack").children('a').length;
	if(len>0 && actlen>0){
		$(window).scrollTop(0);
	}
	$("#shoppingBag").text($addItem);
	$(".quantity-left-column,#resultNumber").removeClass("pdp-s-qty-yellow");
	$(".Enr_qty_tooltip").hide();
	// Added to support UPDATE BAG
	if ( $('button').hasClass('s-addtoBag') ){
		$("#resultNumber").val(1);
		//setting the $addItem quantity to 1
		$addItem = 1;
	}
});
$('.btnImage').bind('click',function(event) {
/*start fixed code for story number- 362*/
if($(".size-waist").children("div").hasClass("size_off_left1")){
	var len=$(".size-waist").children("div").children('a').length;
	var actlen=$(".size-waist").children("div.border2pxBlack").children('a').length;
	if(len>0 && actlen == 0){
		$("#skuerror").text('Please Select Size');
		$("#error_display1").show();
		$(".size-holder").addClass("pdp-s-error-yellow");
		$(".Enr_Id_tooltip").show();
		return false;
	}
}
else{
	var sizeoptval=$("#size-drop-down").find('option:selected').attr("value");
	if(sizeoptval == ""){
		$("#skuerror").text('Please Select Size');
		$("#error_display1").show();
		$(".size-holder").addClass("pdp-s-error-yellow");
		$(".Enr_Id_tooltip").show();
		return false;
	}
}
/*end fixed code for story number- 362*/
 	 var elementId = event.target, elSplit,prodId="", enableStore, pageName;
       if(elementId && elementId.id!= ""){
           elSplit= elementId.id.split("_");
           prodId = elSplit[2];
       }
       
       enableStore = $(this).hasClass("s-addtostore");
       pageName=$("input[name='fisPageName']").attr("value");
       //var fisErrorMsg=$("#errorMessage span").html();
       if(enableStore){
           var isQuickView = $('[name=fisQuickView]').val();
          window.modelWindowDisplay(prodId, isQuickView);
         }else{
       	 
   	 if(pageName=="sku_pdp" || pageName=="sku_pdp_collection"){
   	if($("#sSelectWaistSizeBox").length!=0){
   	$("#error_display1").find("ol").find("li:eq(0)").html("Please select a size");
   	 	$("#error_display1").show();
   	 	/* $("#sSelectWaistSizeBox").addClass("s-error-red"); */
   	}
   	 	   	 	
   	 }
   	 
   	 if(pageName=="sku_pdp_collection2"){
   	var len=fisErrorEle.length, i;
   	for(i=0; i<len;i++){
   	fisErrorEle[i].removeClass("s-error-red");
   	}
   	 	var ele=$('#T'+prodId+".prod_description1").find("#sSelectWaistSizeBox");
   	 	if(ele.length!=0){
   	 	ele.addClass("s-error-red");
   	 	$("#error_display1").find("ol").find("li:eq(0)").html("Please select a size");
   	 	$("#error_display1").show();
   	 	fisErrorEle.push(ele);	
   	 	}	   	 	
   	 }  	 
      }
});

// model window functionality
window.modelWindowDisplay = function(prodId, isQuickView){
var imageUrl=$('[name=fisImageURL_'+prodId+']').val();
  var skuIdSel=$('[name=fisSkuId_'+prodId+']').val();
  var title=$('[name=fisTitleName_'+prodId+']').val();
  var color=$('[name=fisSkuColor_'+prodId+']').val();
  var pSize=$('[name=fisPrimarySize_'+prodId+']').val();
  var sSize=$('[name=fisSecondarySize_'+prodId+']').val();
  var prdId=$('[name=fisProductId_'+prodId+']').val();
 
$('#selectedSku').val(prodId);
//Start:Mingle Story : 304 changes
//Added skuId parameter
var fisURL = "/catalog/findinstore/findstore.jsp?pagetype=findstore&prodId="+prdId+"&skuId="+skuIdSel;
//End:Mingle Story : 304 changes
if(isQuickView) {
window.parent.$("#fancybox-close").hide();
var productPanel = $('.product_Lpanel');
var height=$.browser.msie?"262px":"240px";
   
var findInStoreDiv = $("<div id=qvfisDiv style=width:100%;height:"+height+';><iframe style="width:100%;height:100%;" scrolling="no" frameborder="0" src=' + fisURL + 'hspace="0"></iframe><a id="qvfisBackBtn" href="#" class="button_back_qv"></a></div>');
window.parent.document.getElementById('fancybox-content').style.height= '310px';
productPanel.after( findInStoreDiv);
productPanel.hide();
$("#qvfisBackBtn").click(function() {
window.parent.$("#fancybox-close").show();
$("#qvfisDiv").remove();
productPanel.show();
window.parent.parent.document.getElementById('fancybox-content').style.height= '550px';	
/* added perheight for GVWEB-130 issue */
//var perheight = $('.product_Lpanel').height();
//window.parent.parent.document.getElementById('fancybox-content').style.height= perheight;
});
} else {
  $(".showStorelocatoroverlay").fancybox({
         'width'                : 840,
         //'height'               :450,
         'autoScale'            : true,
         'scrolling'	  :'yes',
         'href'	  :fisURL,
         'autoDimensions'       :true,
		 'centerOnScroll'       : true,
         'type'                :'iframe',
         'showCloseButton'	:false,
         'onComplete' : function() {
         	 
         $('#fancybox-frame').load(function() { // wait for frame to load and then gets it's height
       	 if ($.browser.msie){
       	 window.parent.document.getElementById('fancybox-content').style.height= '262px';
       	 }      	 
       	 else {
       	 //$('#fancybox-content').height($(this).contents().find('body').height());
       	 window.parent.document.getElementById('fancybox-content').style.height= '380px';
       	 }

       	 $("#fis_backBtn").hide();
       	 
     });
       }
     });	
}
   	
  }

  // Showing video for products that has it
  $("#viewProductVideo").fancybox({
    'type'            : 'iframe',
    'scrolling'       : 'yes',
    'titleShow'       : false,
    'width'           : 806,
    'height'          : 700,
    'centerOnScroll'  : true,
	'onComplete' : function() {
	          	 
				$('#fancybox-frame').load(function() { // wait for frame to load and then gets it's height
	        	  if ($.browser.msie){
	        		  window.parent.document.getElementById('fancybox-content').style.height= '550px';
	        	  }
		});
	}		
  });
  
  //sizeguide link
  
  $("#sizeGuideLink").fancybox({
	'type'            : 'iframe',
    'scrolling'       : 'auto',
    'titleShow'       : true,
    'width'           : 800,
    'height'          : 600,
    'centerOnScroll'  : true
  }); 
  
  /*for JIRA ATGEN-361 fix*/
$(".suppressed").children('a').attr("href","javascript:void(0)");
$("#Suppressed_Message").children('a').attr("href","javascript:void(0)");

  /*For size guide link (story #466 functionality issue)*/
  $('#sizeguide').live("click",function() {
         Kjs.accordion('pdp').open('sizing', false);
         setOmniTracking($("#sizingTitle").val());
		 $('html, body').animate({scrollTop : $('.opened').offset().top-50},1500);
  });
  /*For rebate Leranmore link logic Story #461*/
  $('#rebate-link').live('click',function() {
	 Kjs.accordion('pdp').open('rebates', false);
	 setOmniTracking($("#rebatesTitle").val());
	 $('html, body').animate({scrollTop : $('.opened').offset().top-50},1500);
  });
  /*For GWP Learn more link logic Story #463*/
  $('#gwp-link').live('click',function() {
	  Kjs.accordion('pdp').open('gwp', false);
	  setOmniTracking($("#gwpTitle").val());
		$('html, body').animate({scrollTop : $('.opened').offset().top-50},1500);
  });
   
  /*For PWP Learn more link logic Story #463*/
  $('#pwp-link').live('click',function() {
	  Kjs.accordion('pdp').open('pwp', false);
	  setOmniTracking($("#pwpTitle").val());
	  $('html, body').animate({scrollTop : $('.opened').offset().top-50},1500);
  });
  
  /*For exclusion Leranmore link logic #561*/
  $('#exlusion-link').live('click',function() {
		Kjs.accordion('pdp').open('exclusions', false);
		setOmniTracking($("#exclusionTitle").val());
		$('html, body').animate({scrollTop : $('.opened').offset().top-50},1500);
  });
  
   /*For ATGEN-361  Suppressed Leranmore */
  $('#special-price').live('click',function() {
   Kjs.accordion('pdp').open('pricing', false);
   setOmniTracking($("#pricingTitle").val());
   $('html, body').animate({scrollTop : $('.opened').offset().top-50},1500);
  });
   /*For ATGEN-412 Shipping Surcharge LTL link*/
  $('#shipping_retuns').live('click',function() {
   Kjs.accordion('pdp').open('shipping',false);
   setOmniTracking($("#shippingTitle").val());
   $('html, body').animate({scrollTop : $('.opened').offset().top-50},1500);
  });
  function setOmniTracking(title){
      s.events = 'event63';
      //s.eVar63 = id;
      s.prop51 = title;
      s.eVar34 = '';
      s.eVar58 = '';
      var s_code=s.t();if(s_code)document.write(s_code);
  }
 
  setTimeout(function(){ 
	/*addtoList/addtoRegistry fix starts*/
	$("#add_to_registry").find(".khrg_AddToListCenterBtn").html("<input class='khwl_addToListBtn' type='button' alt='Add to Registry' value='Add to Registry' />");
	$("#new_findinstore input[type='button']").val("Find in Store");
	$("#add_to_list input[type='button']").val("Add to List");
	$("#add_to_registry input[type='button']").val("Add to Registry");
	/*addtoList/addtoRegistry fix ends*/
	/*Add to Black Friday list fix starts*/
	$("#add_to_listcustomButton_id").find("#khwl_id_addToBlackFridayList_addtolist").text("Add to black Friday list");
	/*Add to Black Friday list fix ends*/
  },0);
  
 /*JIRA - 5119 fix Starts */
	if ($('.scrollToTop').length > 0)
	{
		$('.scrollToTop').css("display","none");
		//Check to see if the window is top if not then display button
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('.scrollToTop').css("display","block");
			} else {
				$('.scrollToTop').css("display","none");
			}
		});
		//Click event to scroll to top
		$('.scrollToTop').click(function(){
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
	}
/*JIRA - 5119 fix ends */

/*JIRA defect ATG-5055 issue fix starts*/
setInterval(function(){
	
	if($('#BVQASummaryBoxViewQuestionsID a').is(':visible')){
		
		$("#BVQASummaryBoxViewQuestionsID a").removeAttr('onclick');
	}
	
},100);
	
/*JIRA defect ATG-5055 issue fix ends*/
}) // closing jq ready function
 /*bazaar voice Q&A tab link functionality fix*/
$(window).load(function(){
/*JIRA ATGEN-490 code fix strats*/
$("#BVQAAskQuestionID").html(" ");
$("#BVQAAskQuestionID").attr("style","display:block !important;");
$("#BVQAAskQuestionID").html($("#BVQASummaryBoxAskFirstQuestionID").html());
/*JIRA ATGEN-490 code fix ends*/
/*JIRA ATG-5055 code fix strats*/
$("#BVRRRatingSummaryLinkReadID a").removeAttr('href');
$("#BVQASummaryBoxViewQuestionsID a").removeAttr('onclick');
$("#BVQASummaryBoxViewQuestionsID a").click(function(e){
	$("#collection-content").removeClass("display-none").css("display","block");
	$('#rating-content').css("display","none");
	$('.productcdMenu').find('a').removeClass('active');
	$('#Qusetionstab').addClass('active');
	 var nw_offset = ($('.product-cd').position().top-40);
	 $("html,body").animate({scrollTop:nw_offset}, '1000');
	e.preventDefault();
});
$('#BVZDCloseLinkID').live('click', function(){
setTimeout(function(){
$("#BVQASummaryBoxViewQuestionsID a").removeAttr('onclick');
$("#BVQASummaryBoxViewQuestionsID a").click(function(e){
	$("#collection-content").removeClass("display-none").css("display","block");
	$('#rating-content').css("display","none");
	$('.productcdMenu').find('a').removeClass('active');
	$('#Qusetionstab').addClass('active');
	 var nw_offset = ($('.product-cd').position().top-40);
	 $("html,body").animate({scrollTop:nw_offset}, '1000');
	 e.preventDefault();
});
},1000);
});
/*JIRA ATG-5055 code fix ends*/
/*JIRA-369 code Starts*/
$(".bott").click(function(){
$("#leftCarousel").css("top",0);
$(".top").css("visibility","visible");
});
/*JIRA-369 code ends*/	
/*Story-363 code starts*/	
$("#size-drop-down").on("change",function(){
var sizeval=$(this).find('option:selected').attr("value");
if(sizeval == ""){
	$(".add-to-bag-pdp").addClass("bag_disable");
}
else{
	$(".add-to-bag-pdp").removeClass("bag_disable");
}
});
/*JIRA-463 code Starts*/
var heroimage = $("#easyzoom_wrap a img").attr('src').split("?");
$(".ver-carousel ul li a").each(function(){
var altImage=$(this).attr('rel').split("?"); 
if(altImage[0] == heroimage[0])
{
$(this).find('img').addClass('active');
}
});
/*JIRA-463 code ends*/
	if( ($('input[type="submit"]').hasClass('updated')) == true ) {
		var colorSel = $(".selectedActive").children("a.swatch-color").attr('title');
	}else{
		var colorSel = $(".swatch.active").children("a.swatch-color").attr('title');
	}
	$('.size-color-block').find('span#s-color-value-pdt').empty();
	if( ($('input[type="submit"]').hasClass('updated')) == true ) {
		$('.size-color-block').find('span#s-color-value-pdt').text(colorSel);
	}else{
	$('.swatch.active').parents('.price-varitions').prev(".colorblock").find('span#s-color-value-pdt').text(colorSel);
}
/* to disable/enable add_to_bag code starts*/
if($(".size-waist").children("div").hasClass("size_off_left1")){
	var len=$(".size-waist").children("div").children('a').length;
	var actlen=$(".size-waist").children("div.border2pxBlack").children('a').length;
	if(len>0 && actlen == 0){
		$(".add-to-bag-pdp").addClass("bag_disable");
	}
	else{
		$(".add-to-bag-pdp").removeClass("bag_disable");
	}
}
else{
	var sizeoptval=$("#size-drop-down").find('option:selected').attr("value");
	if(sizeoptval == ""){
		$(".add-to-bag-pdp").addClass("bag_disable");
	}
	else{
		$(".add-to-bag-pdp").removeClass("bag_disable");
	}
}
/*to disable/enable add_to_bag code ends*/

/*JIRA-5067 fix Starts*/
$('.original').each(function(){
	if($(".suppressed").html() ==""){
		if(!($(this).hasClass('original-reg')))
		{
			if(!($(this).prev('div.sale').find('span').hasClass('price_label')))
			{
			if(!($(this).parent('.multiple-price').children('.original').hasClass('original-reg')))
				{
					$(this).parent('.multiple-price').children('.original').addClass('original-reg');
				}
			}
		}
	}

});
/*JIRA-5067 fix ends*/
/*Regular Price for GWP/PWP*/
if( $('body').find('.your_price_lable').length >0){
	$('.sale').hide();
	if($('.original').hasClass('original-reg')){
		$('.original').removeClass('original-reg');
	}
}
/*ends*/


//Fix for Defect - ATG-5651
alignRegistryLink();

$(".khrg_AddToListCenterBtn").on({
    mouseenter:function(){ 
    	alignRegistryLink();
    },
    mouseleave:function(){ 
    	alignRegistryLink();
    }
  });

function alignRegistryLink(){
	var isUpdateRegistry = document.getElementById('khrg_id_addtolist_updatelist');	   
    if(isUpdateRegistry){
        $('.khrg_AddToListContainer').addClass('display-none');
    	$('.pdp_c_content #add_to_registry').attr('style','padding-bottom:0px !important');
    }
	
}


//Defect fix for ATGEN-522
var productTitleStrLength = 55;
var conEllipsis="...";
/*ATGEN-508 issue fix Starts*/
$(".PWPprodTitle").each(function( index ) {
var imglink=$('.groupimage').eq(index).attr("href");
   var trimmedText = trimStringWithEllipsis($(this).text(),productTitleStrLength);
$(this).html("<a href="+imglink+">"+trimmedText+"</a>");
   
});

$( ".prodTitle" )
.filter(function( index ) {
        var trimmedText = trimStringWithEllipsis($(this).text(),productTitleStrLength);
	$(this).text(trimmedText);
    
})




function trimStringWithEllipsis(e,d){
	var b="";
	var a=isSafeForDisplay(e,d);
	try{
		if(a){
			b=e;
		}else{
			b=e.substring(0,d-conEllipsis.length)+conEllipsis;
		}	
	}catch(c){
		b=e;
	}
	return b;
}


function isSafeForDisplay(d,b){
	var c=false;
	try{
		if(d.length<=b){
			c=true;
		}	
	}catch(a){
		
	}
	return c;
}

});


