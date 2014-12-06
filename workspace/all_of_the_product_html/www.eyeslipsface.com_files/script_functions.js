var websiteurl = 'http://www.eyeslipsface.com/'
var contenturl  = 'http://content.eyeslipsface.com/'
var i




//* Document ready -----------------------------------------------------*/
$(document).ready(function() {
 	  
	if($('#hp_slides_div').length>0){   
		 
		$('#hp_slides_lst .hp_slides').each( function(i, val) {  
			if ($(this).find('#hp_slide_img_' + $(this).attr("id")).length == 0) { 
				  var theImg = $(this).find('#hp_slide_src_' + $(this).attr("id")).val(); 
				  $(this).prepend('<img src="' + theImg + '" usemap="#hp_feature_' + $(this).attr("id") + '" id="hp_slide_img_' + $(this).attr("id") + '">');
			}
		});  
		
		i = setTimeout("hpBannersSlide()", 5000 ); 
		
		$('#hp_slide_steps ul li').click(
			function() {
			
			clearTimeout(i);
			
			var divNum = $(this).attr("id")
			divNum = divNum.replace("hp_slide_steps_","");
			
			var $active = $('#hp_slides_lst div.active-banner');
	
		    if ( $active.length == 0 ) $active = $('#hp_slides_lst div:last');
		 
		    var $next =  $('#hp_slides_lst #'+ divNum);
		  	
			
			if ($($next).find('#hp_slide_img_' + $next.attr("id")).length == 0) { 
				  var theImg = $($next).find('#hp_slide_src_' + $next.attr("id")).val();
				  $next.prepend('<img src="' + theImg + '" usemap="#hp_feature_' + $next.attr("id") + '" id="hp_slide_img_' + $next.attr("id") + '">');
			}
			
		    $active.addClass('last-active-banner');
		
		    $next.css({opacity: 0.0})
		        .addClass('active-banner')
		        .animate({opacity: 1.0}, 1000, function() {
		            $active.removeClass('active-banner last-active-banner');
		        });
				 
			$('#hp_slide_steps ul li').css("background-image", "url(http://content.eyeslipsface.com/images/hp_slide_step_bkgd.gif)"); 
			$('#hp_slide_steps_' + $next.attr("id")).css("background-image", "url(http://content.eyeslipsface.com/images/hp_slide_step_bkgd_on.gif)"); 
			
		});
	
	};
	
	if($('.cart_mag_details').length>0){ 
			 
			$(".cart_mag_details").fancybox({  
				'href'			:	'magPopup.asp?display=2', 
				'overlayColor'	: '#000000',
				'overlayOpacity' : .8,
				'titleShow' : false
			}); 		
			
	};

	if($('#header_promo').length>0){ 
		
		if ($.cookie('header_promo_seen') == '0') {
			 $('#header_promo_inside').css("display","none");
			 	document.getElementById('header_promo_close').innerHTML = "<img src='http://content.eyeslipsface.com/images/arrow_down.gif'> open special offer";
		} else if ($.cookie('header_promo_seen') == '1') {
			 $('#header_promo_inside').css("display","inline");
		} else { 
			$('#header_promo_inside').slideDown(800);  
			$.cookie('header_promo_seen', '1');
		}
		
		//$('#header_promo_inside').animate({ opacity: 1.0}, 800);
		var header_promo_height = $('#header_promo_inside').css("height");
		
		$('#header_promo_close').click( 
			
			function() {     
			
				if ( $('#header_promo_inside').css("display") != "none" ) { 
					header_promo_height = $('#header_promo_inside').css("height");
					$('#header_promo_inside').animate({height: 1}, 200, function() { $('#header_promo_inside').css("display","none"); }); 
					$.cookie('header_promo_seen', '0');
					
					//$('#header_promo_inside').animate({ opacity: 0.0}, 800);  
					document.getElementById('header_promo_close').innerHTML = "<img src='http://content.eyeslipsface.com/images/arrow_down.gif'> open special offer";
				} else  {
					$('#header_promo_inside').css("display","inline");
					$('#header_promo_inside').animate({height: header_promo_height}, 800);
					//$('#header_promo_inside').slideDown(800);  
					//$('#header_promo_inside').animate({ opacity: 1.0}, 800);
					document.getElementById('header_promo_close').innerHTML = "<img src='http://content.eyeslipsface.com/images/close.gif'> close"; 
					$.cookie('header_promo_seen', '1');
				}
		});
	};
	
	
	$('.dept_list_sp_div').click(  
		function() {      
			var dept = $(this).attr("id")
			dept = dept.replace('SP_','')
			
			
			$.fancybox({  
				'href'			: 'http://www.eyeslipsface.com/showquicklook.asp?dept_id=' + dept, 
				'overlayColor'	: '#000000',
				'overlayOpacity' : .8,
				'titleShow' : false
			}); 
			$('#fancybox-outer').css("background","transparent");
			$('#fancybox-content').css("border","0px"); 
			$('#fancybox-close').css({ 
			   right : '15px', 
			   top : '10px' , 
			   width: '120px',
			   height: '60px', 
			   background : 'transparent url(\'..\images\spacer.gif\') -40px 0px' 
			});  
	});
	
	
	$('.product_zoom').click(  
		function() {     
		
			var dept = $('#dept_id').val();  
			
			$.fancybox({  
				'href'			: 'http://www.eyeslipsface.com/product_popup.asp?dept_id=' + dept, 
				'overlayColor'	: '#000000',
				'overlayOpacity' : .8,
				'titleShow' : false
			}); 
			$('#fancybox-outer').css("background","transparent");
			$('#fancybox-content').css("border","0px"); 
			$('#fancybox-close').css({ 
			   right : '35px', 
			   top : '40px' , 
			   width: '60px',
			   height: '15px',
			   background : 'transparent url(\'..\images\spacer.gif\') -40px 0px' 
			});  
	});
	 
});	



function display_QV(the_id){

document.getElementById('QV_'+the_id).style.display='block'
}

function hide_QV(the_id){
document.getElementById('QV_'+the_id).style.display='none'
}


function openCheckoutFaqs(rec_id) {
		var arrayPageSize = this.getPageSize(); 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = arrayPageSize[0] + 'px';
        overlay.style.height = arrayPageSize[1]  + 'px';
        overlay.style.backgroundColor = '#000000';
		overlay.className = 'transparent2'; 
		
		document.body.scrollTop  = document.getElementById('FAQ_popup').offsetTop - 100; 
		getData('http://www.eyeslipsface.com/showCheckoutFaqs.asp?rec_id=' + rec_id,'FAQ_popup');
	}
	
 
function display_product_info(the_id){
the_left  =  document.getElementById('QV_'+the_id).offsetLeft
the_top = document.getElementById('QV_'+the_id).offsetTop

the_top  = the_top - 150
the_left = the_left - 150

document.getElementById('product_preview').style.top=the_top
document.getElementById('product_preview').style.left=the_left
document.getElementById('product_preview').style.display='block'
document.getElementById('dept_gopher').src='product_quick_view.asp?product_id='+the_id

}

function hide_product_info(){
document.getElementById('product_preview').innerHTML="<div style='margin-top:110px'><img src='images/loader.gif' align='middle'></div>"
document.getElementById('product_preview').style.display='none'
}

function add_to_cart(product_id)
{	
	var thevars='';
	qty       = document.getElementById('prod_qty_'+product_id).value
	totalvars = document.getElementById('total_vars').value
	rolled    = document.getElementById('rt_'+product_id).value

		for(i=1; i <= totalvars; i++)
		  {   if(i != 1){
		  			thevars = thevars + ',' + document.getElementById('v_'+product_id+'_'+i).value 
				}
				else
				{
						thevars = thevars  + document.getElementById('v_'+product_id+'_'+i).value 
				}
		   }
		
	document.getElementById("AddProd").src=" addtocart.asp?product_id="+product_id+'&vars='+thevars+'&qty='+qty+'&rolled='+rolled
	slidedown2('cart_contents')	

 window.scroll(0,0);
}

function add_to_cart2(product_id,vars,qty,rolled)
{	
	document.getElementById("AddProd").src="https://dev.blueswitch.com/hanky_panky/addtocart.asp?product_id="+product_id+'&vars='+vars+'&qty='+qty+'&rolled='+rolled
	slidedown2('cart_contents')	
}


function clear_field(the_text,the_element){
	if (document.getElementById(the_element).value==the_text)
		{
			document.getElementById(the_element).value=''
		}
}


function zoom(factor) {
	var emap=floater.document.getElementById('the_image');
	
	
	
	var mapHeight = emap.height
	var mapWidth = emap.width
	
	var slope = mapHeight/mapWidth
	
	var newWidth = mapWidth + factor
	var newHeight=mapHeight+(factor*slope)
	
	var diffHeight =  newHeight - mapHeight
	
	
	
	//if ((emap.offsetTop+Math.floor(diffHeight/2))<300){
	emap.style.top=Math.round(emap.offsetTop-(diffHeight/2))+'px'
	//}
	//if ((emap.offsetLeft+Math.floor(diffWidth/2))<500){
	emap.style.left=Math.round(emap.offsetLeft-(factor/2))+'px'
	//}
	//document.getElementById('the_results').innerHTML = document.getElementById('the_results').innerHTML + '<br>' + Math.round(emap.offsetTop-(diffHeight/2))+'px' + '|' + Math.round(emap.offsetLeft-(factor/2))+'px'
	//document.getElementById('the_results2').innerHTML = document.getElementById('the_results2').innerHTML + '<br>' + Math.round(newWidth)+'px' + '|' + Math.round(newHeight)+'px'
	emap.style.width=Math.round(newWidth)+'px';
	emap.style.height=Math.round(newHeight)+'px';
}


function zoomin(fact,i,x,num_frames){
	var msg;
	var x ;
	var the_timeout = 1;
	
	
	if (x<num_frames) {
		if(x==1){
			
			
			if(((document.getElementById('zoom_level').value)>0)&&((document.getElementById('zoom_level').value)<4)){
				document.getElementById('zoom_level').value = parseInt(document.getElementById('zoom_level').value)+i
				}
			if(document.getElementById('zoom_level').value==4 && i==-1){
				document.getElementById('zoom_level').value = 3
			
			}
			if(document.getElementById('zoom_level').value==0 && i==1){
				document.getElementById('zoom_level').value = 2
			
			}
			
			
		
		
		}
		if(((document.getElementById('zoom_level').value)>0)&&((document.getElementById('zoom_level').value)<4)){
		
		if((document.getElementById('zoom_level').value)>3||(document.getElementById('zoom_level').value)>2&&fact<0){ 
			zoom(fact*3);
			num_frames = 15
			the_timeout = 1
		}
		else{
			zoom(fact);
		}
		//zoom(fact);
		}
		
		x+=1
		setTimeout('zoomin('+fact+','+i+','+x+','+num_frames+');',the_timeout)
		}
}


function zoomout(fact,i){

	var msg;
	if (i>fact) {
		zoom(i);
		i=i-.001
		setTimeout('zoomout('+fact+','+i+');',30)
		}
}



function display_image(the_image){
document.getElementById('the_prod').src='gallery_huge/'+the_image
document.getElementById('pop_up').style.display="block"
}


function submit_shipping_change(){
document.getElementById('update_shipping').value='1'
document.purchase_order_form.submit()
}


function display_account_info(the_action,the_plus){

	if(document.getElementById(the_action).style.display=='none')
	{
		slideup('account_info')
		slideup('order_info')
		slideup('wish_info')
		
		document.getElementById('pm_ai').innerHTML='+'
		document.getElementById('pm_oi').innerHTML='+'
		document.getElementById('pm_wi').innerHTML='+'
		
		slidedown3(the_action)
		
		document.getElementById(the_plus).innerHTML='-'
	}
	else{
		slideup(the_action)
		document.getElementById(the_plus).innerHTML='+'
	}

}

function close_size(){
document.getElementById('size_chart').style.display='none';
}

function display_size_chart(){
document.getElementById('size_chart').style.display='block';
}

function email_close(){
document.getElementById('email_friends').style.display='none';
}

function email_open(){
document.getElementById('email_friends').style.display='block';
}



function add_to_wish(product_id)
{	
	var thevars='';
	qty       = document.getElementById('prod_qty_'+product_id).value
	totalvars = document.getElementById('total_vars').value
	rolled    = document.getElementById('rt_'+product_id).value

		for(i=1; i <= totalvars; i++)
		  {   if(i != 1){
		  			thevars = thevars + ',' + document.getElementById('v_'+product_id+'_'+i).value 
				}
				else
				{
						thevars = thevars  + document.getElementById('v_'+product_id+'_'+i).value 
				}
		   }
		
	document.getElementById("AddProd").src="addtowish.asp?product_id="+product_id+'&vars='+thevars+'&qty='+qty+'&rolled='+rolled
	slidedown2('cart_contents')	
}

function update_personalize(){

	item_1 = document.getElementById('cp_1').value;	
	item_2 = document.getElementById('cp_2').value;
	item_3 = document.getElementById('cp_3').value;
	item_4 = document.getElementById('cp_4').value;
	item_5 = document.getElementById('cp_5').value;
	item_6 = document.getElementById('cp_6').value;
	


	prods = item_1+','+item_2+','+item_3+','+item_4+','+item_5+','+item_6

document.getElementById("personalize_product").src="http://dev.blueswitch.com/hanky_panky/addtopersonalize.asp?prods="+prods
	

}

function switch_rolled(product_id)
{
document.location.href='product_detail.asp?product_id='+product_id

}


function populate_color()
{
document.getElementById('color_swatcher').src='http://dev.blueswitch.com/hanky_panky/generate_colors.asp'
}



function display_swatch(swatch_id){
the_left  = document.getElementById('cs_loc_'+swatch_id).offsetLeft;
the_left2 = document.getElementById('container').offsetLeft;



the_left = the_left + the_left2 +207
document.getElementById('cs_'+swatch_id).style.left=the_left+'px'
document.getElementById('cs_'+swatch_id).style.display='block'

}


function hide_swatch(swatch_id){
document.getElementById('cs_'+swatch_id).style.display='none'
}



function arrow_left()
  {
    if (document.getElementById('thumbnails_container').scrollLeft>0) {
  	document.getElementById('thumbnails_container').scrollLeft = document.getElementById('thumbnails_container').scrollLeft - 75
	}
	//else
	//document.getElementById('thumbnails_container').scrollLeft = document.getElementById('thumbnails_container').scrollWidth
  }
  
  
  
function arrow_right()
  {

  if(document.getElementById('thumbnails_container').scrollWidth-document.getElementById('thumbnails_container').scrollLeft == 300)
	{//document.getElementById('thumbnails_container').scrollLeft=0
	} 
	else
	document.getElementById('thumbnails_container').scrollLeft = document.getElementById('thumbnails_container').scrollLeft + 75
  }
  
  
  
function display_press(image_name){
document.getElementById('press_image').innerHTML="<img src='gallery_press/"+image_name+"' height='700'>"
document.getElementById('press_gallery').style.display="block"
}

function close_press(image_name){
document.getElementById('press_image').innerHTML=""
document.getElementById('press_gallery').style.display="none"
}

function update_color(product_id,color_id){
document.getElementById('AddProd').src="image_color_updater.asp?product_id="+product_id+"&color_id="+color_id
}

function update_swatch(product_id,variant_id){
the_value = document.getElementById(variant_id).value
document.getElementById('AddProd').src="image_color_updater.asp?product_id="+product_id+"&variant_id="+the_value
}

function tabChangeQL(changeTo){  

	document.getElementById('tab_description').style.display = 'none';
	document.getElementById('tab_colors').style.display = 'none'; 
	 
	if (document.getElementById('tab_hdr_description')) {
	document.getElementById('tab_hdr_description').style.color = '#000000';
	}
	if (document.getElementById('tab_hdr_colors')) {
	document.getElementById('tab_hdr_colors').style.color = '#000000';
	} 
	document.getElementById('tab_' + changeTo).style.display = 'inline';
	document.getElementById('tab_hdr_' + changeTo).style.color ='#ed0b6f';
	
}


   
	 	var colorOpt;
		colorOpt = 0; 
		function tabChange(changeTo){   
			 
			document.getElementById('tab_ingredients').style.display = 'none';
			document.getElementById('tab_press').style.display = 'none';
			document.getElementById('tab_video').style.display = 'none';
			document.getElementById('tab_directions').style.display = 'none';
			 
			if (document.getElementById('tab_hdr_ingredients')) {
			document.getElementById('tab_hdr_ingredients').style.color = '#000000';
			}
			if (document.getElementById('tab_hdr_video')) {
			document.getElementById('tab_hdr_video').style.color = '#000000';
			}
			if (document.getElementById('tab_hdr_press')) {
			document.getElementById('tab_hdr_press').style.color = '#000000';
			}
			if (document.getElementById('tab_hdr_directions')) {
			document.getElementById('tab_hdr_directions').style.color = '#000000';
			}
			
			document.getElementById('tab_' + changeTo).style.display = 'inline';
			document.getElementById('tab_hdr_' + changeTo).style.color ='#ed0b6f';
			
		}
		
		
		
	
function tabToggle(changeTo){   
 
	$('#beautybook_tabs_open').children().css('display', 'none'); 
	$('#blackbarlist').children().css('color', '#FFFFFF'); 
			
	$('#tab_' + changeTo).fadeIn("fast");
	$('#tab_hdr_' + changeTo).css('color', '#ed0b6f'); 
	
}
	
  
  		function changeColorQL(product_id, productDesc, prodSmudge, prodImg) { 
			document.getElementById('notification_form').style.display = 'none';
			document.getElementById('out_of_stock_sw').style.display = 'none';
			document.getElementById('out_of_stock_prod').style.display = 'none';
			document.getElementById('productInfo').innerHTML = productDesc;
			document.images.prodImage.src = contenturl + 'gallery_medium/' + prodImg;
			document.images.prodSmudge.src =  contenturl + '/Swatches/' + prodSmudge; 
			 
			if (document.getElementById('out_of_stock_'+product_id)) {
				document.getElementById('notification_form').style.display = 'block';
				document.getElementById('out_of_stock_'+product_id).style.display = 'inline';
				document.getElementById('out_of_stock_sw').style.display = 'inline';
				document.getElementById('out_of_stock_prod').style.display = 'inline';
				document.getElementById('notification_product_id').value = product_id;
				
			}
		}
		
		
		function changeColor(product_id, productDesc, prodSmudge, prodImg) { 
			document.getElementById('notification_form').style.display = 'none';
			document.getElementById('out_of_stock_sw').style.display = 'none';
			document.getElementById('out_of_stock_prod').style.display = 'none';
			document.getElementById('productDesc').innerHTML = productDesc;
			document.images.prodImage.src =  contenturl + 'gallery_medium/' + prodImg;
			document.images.prodSmudge.src =  contenturl + 'Swatches/' + prodSmudge; 
			 
			if (document.getElementById('out_of_stock_'+product_id)) {
				if (document.getElementById('is_seasonal_'+product_id).value != 1) {
					document.getElementById('notification_form').style.display = 'block';
				}
				document.getElementById('out_of_stock_'+product_id).style.display = 'inline';
				document.getElementById('out_of_stock_sw').style.display = 'inline';
				document.getElementById('out_of_stock_prod').style.display = 'inline';
				document.getElementById('notification_product_id').value = product_id;
				
			}
		}
		
		function changeOutofStock(product_id ) {  
			document.getElementById('out_of_stock_sw').style.display = 'none';
			document.getElementById('out_of_stock_prod').style.display = 'none';
			document.getElementById('notification_form').style.display = 'none'; 
			
			if (document.getElementById('out_of_stock_'+product_id)) {
				if (document.getElementById('is_seasonal_'+product_id).value != 1) {
				document.getElementById('notification_form').style.display = 'block';
				}
				document.getElementById('notification_product_id').value = product_id;
				document.getElementById('out_of_stock_'+product_id).style.display = 'none';
				document.getElementById('out_of_stock_sw').style.display = 'inline';
				document.getElementById('out_of_stock_prod').style.display = 'inline';
			}
		}
		
		function showOutofStock(product_id ) {  
		if (document.getElementById('is_seasonal_'+product_id).value != 1) {
			document.getElementById('notification_form').style.display = 'block'; 
			}
			document.getElementById('out_of_stock_sw').style.display = 'none';
			document.getElementById('out_of_stock_prod').style.display = 'none';
			if (document.getElementById('out_of_stock_'+product_id)) { 
				document.getElementById('notification_product_id').value = product_id;
				document.getElementById('out_of_stock_'+product_id).style.display = 'inline';
				document.getElementById('out_of_stock_sw').style.display = 'inline';
				document.getElementById('out_of_stock_prod').style.display = 'inline';
			}
		}
		
		function changeDDOpt(product_id) {
			if (document.getElementById('holdingForm_' + colorOpt) ) { 
				var sel = document.getElementById('holdingForm_' + colorOpt ).getElementsByTagName('*')['add_product_id'];  
			} else {
				var sel = document.getElementById('add_product_id'); 
			}; 
			
			for (x=0; x<sel.options.length; x++) {
				if (sel.options[x].value == product_id) { 
					sel.options.selectedIndex = x;
				} 
			}
		}
		
		function addCartForm() {
			var currentFields = document.getElementById('cartForm').innerHTML;
			var newFields =  document.getElementById('addDiv').innerHTML;
			//document.getElementById('cartForm').innerHTML = currentFields + '<br>' + newFields;   cannot do this becuase FF wont keep selected option
			colorOpt = colorOpt + 1
			var newdiv = document.createElement('div');
			var divIdName = 'holdingForm_' + colorOpt;
			newdiv.setAttribute('id',divIdName); 
			newdiv.innerHTML = newFields;
		 	document.getElementById('cartForm').appendChild(newdiv);
 		}
		
		function openWindow(address, width, height) {
		
			var newWindow = window.open(address, 'elfReviews', 'width=' + width + ',height=' + height +',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');	
			newWindow.focus();
		}
		
		function viewMorePress() {
			slideup = document.getElementById("tab_press2");
			var broswerType=navigator.appVersion
			if (broswerType.indexOf('MSIE') > 1 ) {
					slideup.style.filter="revealTrans(Duration=1,Transition=5)";
					slideup.filters[0].Apply();
					slideup.style.visibility = "visible";  
					slideup.filters[0].Play(); 
					slideup.style.visibility = "visible";  
			} else { 
				 slideup.style.visibility = "visible"; 
			}	
			
		}
		
 	function openProductImg(dept_id, prodImg) {
		var arrayPageSize = this.getPageSize(); 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = arrayPageSize[0] + 'px';
        overlay.style.height = arrayPageSize[1]  + 'px';
        overlay.style.backgroundColor = '#000000';
		overlay.className = 'transparent2'; 
		
		document.body.scrollTop  = document.getElementById('productImgPopup').offsetTop - 100; 
		getData('http://www.eyeslipsface.com/product_popup.asp?prodImg=' + prodImg + '&dept_id=' + dept_id,'productImgPopup');
	}
		

	
	function closeProductImg() { 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = '0px';
        overlay.style.height = '0px';
        overlay.style.backgroundColor = '#FFFFFF'; 

		document.getElementById('productImgPopup').innerHTML='';
	}
 
 
	function closeCheckoutFAQ() { 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = '0px';
        overlay.style.height = '0px';
        overlay.style.backgroundColor = '#FFFFFF'; 

		document.getElementById('FAQ_popup').innerHTML='';
	}
 
	function changeProduct(product_id, dept_id, product_name, product_img, smudge_img)
	{
	  document.getElementById('product_id').value=product_id;
	  prodList = eval("document.getElementById('allProducts_" + dept_id + "')");
	  allprods = prodList.value.split(",");
	 
	/*  for(x = 0; x < allprods.length; x++) {
	  	if (allprods[x] != "") {
			tdName = "CSQ_" + allprods[x]  
			document.getElementById(tdName).style.border='';
		}
	  }
	  
	  document.getElementById('CSQ_' + product_id).style.border='1px solid #d9678c';
		
		*/
		document.getElementById('productInfo').innerHTML=product_name;
		document.images.productImage.src='http://content.eyeslipsface.com/gallery_medium/' + product_img;
		document.images.smudgeImage.src='http://content.eyeslipsface.com/Swatches/' + smudge_img;
	}  
	
	function closeSP() {  
		var arrayPageSize = this.getPageSize(); 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = arrayPageSize[0] + 'px';
        overlay.style.height = arrayPageSize[1]  + 'px';
        overlay.style.backgroundColor = '#000000';
		overlay.className = 'transparent2';  
		alldepts = deptList.value.split(",");
	  	
		for(x = 0; x < alldepts.length; x++) {
	  	if (alldepts[x] != "") {
			tdName = "QL_" + alldepts[x]   
			if ( document.getElementById(tdName) != null ) {
				document.getElementById(tdName).innerHTML='';
			}
			}
	  	} 
	}
	
	function openQL(dept_id) {
		
		var arrayPageSize = this.getPageSize(); 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = arrayPageSize[0] + 'px';
        overlay.style.height = arrayPageSize[1]  + 'px';
        overlay.style.backgroundColor = '#000000';
		overlay.className = 'transparent2'; 
		
		document.body.scrollTop  = document.getElementById('QL_' + dept_id).offsetTop - 100; 
		getData('http://www.eyeslipsface.com/showquicklook.new.asp?dept_id=' + dept_id,'QL_' + dept_id);
	}
	
	function closeThis(dept_id) { 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = '0px';
        overlay.style.height = '0px';
        overlay.style.backgroundColor = '#FFFFFF'; 

		document.getElementById('QL_' + dept_id).innerHTML='';
	}
	
	function closeThisonParent(dept_id) { 
		var  overlay =  parent.document.getElementById('overlay')
        overlay.style.width = '0px';
        overlay.style.height = '0px';
        overlay.style.backgroundColor = '#FFFFFF'; 

		parent.document.getElementById('QL_' + dept_id).innerHTML='';
	}
	
	
	function runDeptSlideShow(){ 
	
	if (document.all){
	    document.images.deptImg.style.filter="blendTrans(duration=crossFadeDuration)";
	    document.images.deptImg.filters.blendTrans.Apply();
	    document.images.deptImg.filters.blendTrans.Play();
		}  
	
	if (document.images.deptImg){
	    document.images.deptImg.src = Pic[j];    
	    document.getElementById('deptLink').href = PicLink[j]; 
	    document.getElementById('dept_banner_txt').innerHTML = PicText[j]; 
	    j = j + 1
	    if (j > (p-1)) j=0
	    t = setTimeout('runDeptSlideShow()', speed)}    
	
	}
	
	
	
	
	
	
	
	
	
	
	
var timerlen = 5;
var slideAniLen = 250;

var timerID = new Array();
var startTime = new Array();
var obj = new Array();
var endHeight = new Array();
var moving = new Array();
var dir = new Array();

	
function slidedown(objname,rec_id,objname2){
        
		var allSlides=document.getElementById(objname2).value
		var mySplitResult = allSlides.split(","); 
		
		for (i=0;i<mySplitResult.length;i++) 
		{   element_to  = "display_more_"+(mySplitResult[i]) 
   
			if (document.getElementById(element_to))
			{	 
				slideup(element_to) 
			}
		}
		
		if(moving[objname])
                return;

        if(document.getElementById(objname).style.display != "none")
                return; // cannot slide down something that is already visible

        moving[objname] = true;
        dir[objname] = "down";
		
		document.getElementById('display_more_'+rec_id).style.display="block"
		
		full_height = document.getElementById('display_more_'+rec_id).offsetHeight
		full_height = full_height + 10
		document.getElementById('display_more_'+rec_id).style.display="none" 
		
		startslide(objname,full_height);
}

function slideup(objname){
        if(moving[objname])
                return;
				 
        if(document.getElementById(objname).style.display == "none")
                return; // cannot slide up something that is already hidden
 
        moving[objname] = true;
		
	
		
		full_height = document.getElementById(objname).offsetHeight
		full_height = full_height + 10
		dir[objname] = "up";
				
		startslide(objname,full_height);
		
		
	
}

function startslide(objname,full_height){
        obj[objname] = document.getElementById(objname);

        endHeight[objname] = full_height;
        startTime[objname] = (new Date()).getTime();

        if(dir[objname] == "down"){
                obj[objname].style.height = "1px";
        }

        obj[objname].style.display = "block";

        timerID[objname] = setInterval('slidetick(\'' + objname + '\');',timerlen);
}

function slidetick(objname){
        var elapsed = (new Date()).getTime() - startTime[objname];

        if (elapsed > slideAniLen)
                endSlide(objname)
        else {
                var d =Math.round(elapsed / slideAniLen * endHeight[objname]);
                if(dir[objname] == "up")
                        d = endHeight[objname] - d;

                obj[objname].style.height = d + "px";
        }

        return;
}

function endSlide(objname){
        clearInterval(timerID[objname]);

        if(dir[objname] == "up")
                obj[objname].style.display = "none";

        obj[objname].style.height = endHeight[objname] + "px";

        delete(moving[objname]);
        delete(timerID[objname]);
        delete(startTime[objname]);
        delete(endHeight[objname]);
        delete(obj[objname]);
        delete(dir[objname]);

        return;
}



	 function closeThisDD() { 
	  document.getElementById('dropdown').style.visibility='hidden';
	 }
	

	
	  function echeck(str) {

		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   alert("Please enter a valid email address")
		   return false
		}

		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   alert("Please enter a valid email address")
		   return false
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    alert("Please enter a valid email address")
		    return false
		}

		 if (str.indexOf(at,(lat+1))!=-1){
		    alert("Please enter a valid email address")
		    return false
		 }

		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    alert("Please enter a valid email address")
		    return false
		 }

		 if (str.indexOf(dot,(lat+2))==-1){
		    alert("Please enter a valid email address")
		    return false
		 }
		
		 if (str.indexOf(" ")!=-1){
		    alert("Please enter a valid email address")
		    return false
		 }

 		 return true					
	}

	function openBrushGuide(dept_id,img_name) { 
		var arrayPageSize = this.getPageSize(); 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = arrayPageSize[0] + 'px';
        overlay.style.height = arrayPageSize[1]  + 'px';
        overlay.style.backgroundColor = '#000000';
		overlay.className = 'transparent2'; 
		
		document.body.scrollTop  = document.getElementById('brushguide_pop').offsetTop - 100; 
		getData('http://www.eyeslipsface.com/showbrushguide.asp?dept_id=' + dept_id + '&img_name=' + img_name,'brushguide_pop');
	}
	
	function closeBrushGuide(dept_id) { 
		var  overlay =  document.getElementById('overlay')
        overlay.style.width = '0px';
        overlay.style.height = '0px';
        overlay.style.backgroundColor = '#FFFFFF'; 

		document.getElementById('brushguide_pop').innerHTML='';
	}
	
	   function openwin2(windowname) {
	    window.open(windowname,'wtcwin2','width=700,height=550,directories=no,location=no,menubar=no,scrollbars=yes,status=no,toolbar=no,resizable=yes');
	    }
	    
	    function popUp(url) {
	    sealWin=window.open(url,"win",'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=750,height=600');
	    self.name = "mainWin";
	    }
		
		
		
function showDD(theDiv) {   
		if (theDiv != 'dropDown_') { hideDD('dropDown_') }; 
		if (theDiv != 'dropDown_1682') { hideDD('dropDown_1682') };
		if (theDiv != 'dropDown_2044') { hideDD('dropDown_2044') }; 
		//if (theDiv != 'dropDown_2265') { hideDD('dropDown_2265') };
		if (theDiv != 'dropDown_1190') { hideDD('dropDown_1190') };
		if (theDiv != 'dropDown_1285') { hideDD('dropDown_1285') }; 
		if (theDiv != 'dropDown_2588') { hideDD('dropDown_2588') };  
		if (theDiv != 'dropDown_3347') { hideDD('dropDown_1190') }; 
		
		theDivT = document.getElementById(''+ theDiv + '_T');
		theDiv = document.getElementById(''+ theDiv);
		theDiv.style.display='block';
		theDivT.style.display='block';   
		 
}


		
function showMagDD(theDiv) {    
		 
		theDiv = document.getElementById(''+ theDiv);
		theDiv.style.display='block'; 
		document.getElementById('viewall_mag').style.display='none';
		 
}


function showDiv(theDiv) {  
	document.getElementById( theDiv).style.display='block';
}


function hideDD(theDiv) {  
	document.getElementById(''+  theDiv).style.display='none';
	document.getElementById(''+ theDiv + '_T').style.display='none';
}

function slideupfunc() {
 window.onscroll = function () 
	 		{
                slideup = document.getElementById('slideup');        
				var footerHeight = slideup.offsetHeight;    
				var windowHeight = window.innerHeight?  window.innerHeight :  document.body.clientHeight;       
				var pageOffSet = document.body.scrollTop  
				slideup.style.top = ( pageOffSet +  windowHeight - 240) + "px";
            }

	var slideup;
	
	var broswerType=navigator.appVersion
	slideup = document.getElementById('slideup');
	
	if (broswerType.indexOf('MSIE') > 1 ) {
	
		slideup.filters[0].Apply();
		
		if (slideup.style.visibility == "visible") { 
			slideup.style.visibility = "hidden"; 
			slideup.filters.revealTrans.transition=4; 
		} else { 
			//getData("showSubscribe.asp?showSub=1","slideup");
			slideup.style.visibility = "visible";  
			slideup.filters[0].transition=4; 
			
			
		} 
			
		slideup.filters[0].Play(); 
		
	} else {
		
		if (slideup.style.visibility == "visible") { 
			slideup.style.visibility = "hidden"; 
		} else { 
			slideup.style.visibility = "visible"; 
		} 
	}	
}


function changelink_switch(){
		document.all._switch.style.color='#FF9933'; 
		document.all._switch.style.textDecoration='underline';
		document.all._blue.style.color='#00479C'; 
		document.all._blue.style.textDecoration='underline';
	}
	
	function changeback_switch(){
		document.all._switch.style.color='#b8b7ba'; 
		document.all._switch.style.textDecoration='none';
		document.all._blue.style.color='#b8b7ba'; 
		document.all._blue.style.textDecoration='none';
	}
	
		function changelink_blue(){
		document.all._blue.style.color='#00479C'; 
		document.all._blue.style.textDecoration='underline';
		document.all._switch.style.color='#FF9933'; 
		document.all._switch.style.textDecoration='underline';
	}
	
	function changeback_blue(){
		document.all._blue.style.color='#b8b7ba'; 
		document.all._blue.style.textDecoration='none';
		document.all._switch.style.color='#b8b7ba'; 
		document.all._switch.style.textDecoration='none';
	}
	
	
function changetab(tabID, theImg, theLink, theTarget, theLink2, theTarget2) {  
		document.getElementById('tab1_img').src= 'http://content.eyeslipsface.com/images/hp_step1.gif';
		document.getElementById('tab2_img').src= 'http://content.eyeslipsface.com/images/hp_step2.gif';
		document.getElementById('tab3_img').src= 'http://content.eyeslipsface.com/images/hp_step3.gif';
		document.getElementById('tab4_img').src= 'http://content.eyeslipsface.com/images/hp_step4.gif';
		
		document.getElementById('hp_mainFeature').src= theImg; 
		document.getElementById('FeatureLink').href= theLink; 
		document.getElementById('FeatureLink').target= theTarget; 
		document.getElementById('FeatureLink2').href= theLink2;  
		document.getElementById('FeatureLink2').target= theTarget2; 
		document.getElementById(tabID +'_img').src= 'http://content.eyeslipsface.com/images/hp_step' +  tabID + '_on.gif'; 
	 } 
	  
	  
function show_sp_button(dept_id) {document.getElementById('SP_'+dept_id).style.display='block';}	
function hide_sp_button(dept_id) {document.getElementById('SP_'+dept_id).style.display='none';}

function hide_dropdown() {document.getElementById('dropdown').style.visibility='hidden';}

function notificatio_form (product_id, email) {
	AddProd.document.location.href='http://www.eyeslipsface.com/showProdNotifications.asp?product_id=' + product_id +'&email='+ email;
}

function showaddtocart(dept_id) {
	
	//document.getElementById('dropdown').style.visibility='hidden';
	document.addProducts.action='http://www.eyeslipsface.com/showAddtoCart.asp?dept_id=' + dept_id + '&multiadd=1';
	scroll(0,0);
}

function showaddtofavs(dept_id) {
	document.getElementById('dropdown').style.visibility='hidden';
	document.addProducts.action='http://www.eyeslipsface.com/showAddtoFavProds.asp?dept_id=' + dept_id + '&multiadd=1';
	scroll(0,0);
}

function showaddrecprodstocart(dept_id, product_id) {
	//document.getElementById('dropdown').style.visibility='hidden';
	AddProd.document.location.href='http://www.eyeslipsface.com/showAddtoCart.asp?dept_id=' + dept_id + '&cartadd=1&product_id=' + product_id + '&qty=1';
	scroll(0,0);
}

function showaddrecprodstocartb(dept_id, product_id) {
	document.getElementById('dropdown').style.visibility='hidden';
	//AddProd.document.location.href='http://www.eyeslipsface.com/showAddtoCart.asp?dept_id=' + dept_id + '&cartadd=1&product_id=' + product_id + '&qty=1';
	$('#AddProd').attr('src','showAddtoCart.asp?dept_id=' + dept_id + '&cartadd=1&product_id=' + product_id + '&qty=1&incart=1');
	//document.location.href='cartviewedit.asp';
}


function getAllProds()
	{
	  allprods = document.getElementById('prodList').value.split(",");
	  document.getElementById('prodQty').value = '';
	  
	  for(x = 0; x < allprods.length; x++) {
	  	if (allprods[x] != "") {
			tdName = eval("document.getElementById('qty_" + allprods[x] + "')")
			document.getElementById('prodQty').value = document.getElementById('prodQty').value + '|' + allprods[x] + ',' + tdName.value;
		}
	  } 
	
	}  
	
	
function fitPic() {
	iWidth = (NS)?window.innerWidth:document.body.clientWidth;
	iHeight = (NS)?window.innerHeight:document.body.clientHeight;
	iWidth = document.images[1].width - iWidth;
	iHeight = document.images[1].height - iHeight;
	self.focus();
};

function tabChangeBlog(changeTo){  
		document.getElementById('tab_archives').style.display = 'none';
		document.getElementById('tab_tags').style.display = 'none'; 
		 
		if (document.getElementById('tab_archives')) {
		document.getElementById('tab_hdr_archives').style.background = 'url(http://content.eyeslipsface.com/images/bar_bkgd_gry.jpg)';
		}
		if (document.getElementById('tab_tags')) {
		document.getElementById('tab_hdr_tags').style.background = 'url(http://content.eyeslipsface.com/images/bar_bkgd_gry.jpg)';
		}
	 	
		document.getElementById('tab_' + changeTo).style.display = 'inline';
		document.getElementById('tab_hdr_' + changeTo).style.background =' url(http://content.eyeslipsface.com/images/bar_bkgd_pnk.jpg)';
		
	
	}
	
	
	function showArchive(which_one){
			if(document.getElementById(which_one).style.display==''){
				document.getElementById('arrow_'+which_one).src = 'http://content.eyeslipsface.com/images/blog_arrow_right.gif'
				document.getElementById(which_one).style.display='none';
				
			}
			else{
				document.getElementById('arrow_'+which_one).src = 'http://content.eyeslipsface.com/images/blog_arrow_down.gif'
				document.getElementById(which_one).style.display='';
			}
		} 
		
		
function blogshowtitle(rec_id) {
	document.getElementById('blogTitle_'+rec_id).style.display='inline';
	}
function bloghidetitle(rec_id) {
	document.getElementById('blogTitle_'+rec_id).style.display='none';
	}
	
function openTellaFriend(rec_id) {
	window.open('emailfriend.asp?blog_id=' + rec_id,'emailfriend','width=480,height=670,resizable=yes,toolbar=no,menubar=no,scrollbars=yes');
}

function showbloghelp() { 
	document.getElementById('blog_help_pop').style.visibility='visible';
}
function hidebloghelp() {
	document.getElementById('blog_help_pop').style.visibility='hidden';
}


function showHideReplies(the_id){
		
	for (var x = 101; x <= 150; x++)
   	{
  	
	var the_rec = document.getElementById(the_id+''+x)
	
	if(the_rec != null){
	
		
	if(document.getElementById(the_id+''+x).style.display==''){
		document.getElementById('label_'+the_id).innerHTML = 'Open Thread'
		document.getElementById(the_id+''+x).style.display='none';
		
	}
	else{
		document.getElementById('label_'+the_id).innerHTML = 'Close Thread'
		document.getElementById(the_id+''+x).style.display='';
	}
	}
   	}
}		

function checkForm(the_form){
				
				if(document.getElementById('nickname').value==''){
					alert("Please enter a nickname.")
					return false;
					
				}
				if(document.getElementById('comment').value==''){
					alert("Please enter a comment/reply.")
					return false;
					
				}
				
			
			}
			
			
			
function open_email_a_friend_look(look_id) {

	window.open('emailfriend.asp?look_id=' + look_id,'emailfriend','width=480,height=670,resizable=yes,toolbar=no,menubar=no,scrollbarsT=yes');
}

function looks_add_to_cart () {

	document.getElementById('dropdown').style.visibility='hidden';
	AddProd.document.location.href='showAddtoCart.asp?multiadd=1&prodQty=' + document.getElementById('prodQty').value + '&add_qty=' + document.getElementById('qtyList').value + '&add_product_id=' + document.getElementById('prodList').value;
	scroll(0,0);

	}
	
function looks_add_color_to_cart(prv_dept_id, prv_product_id) {
	document.getElementById('dropdown').style.visibility='hidden';
	AddProd.document.location.href='showAddtoCart.asp?cartadd=1&product_id=' + document.getElementById('product_'+ prv_dept_id +'_'+ prv_product_id).value + '&qty=1';
	scroll(0,0);
}


	function changeLookProd(product_id, look_prod, dept_id, prodImg)
	{
	  var productList
	  var elmName, prodImgID
	 document.getElementById('product_' + dept_id + '_' + look_prod).value = product_id;
	prodImgID =  'productImage_' + dept_id + '_'+ look_prod;
	 document.getElementById(prodImgID).src=contenturl + 'gallery_tiny/' +prodImg; 
	}  
	
	function changeLook(look_id)
	{
	  var lookList
	  var elmName
	  
	  lookList = document.getElementById('allLooks').value;
	  arrLooks = lookList.split(",");
	   
	  for(x = 0; x < arrLooks.length; x++) {
	  	if (arrLooks[x] != "") {
			tdName = "tn_" + arrLooks[x]  
			document.getElementById(tdName).style.border='1px solid #ffffff';
			document.getElementById('tn_img_' + arrLooks[x]).className='lookOff';
	  
		}
	  } 
	  
	  document.getElementById('tn_' + look_id).style.border='1px solid #000000';
	  document.getElementById('tn_img_' + look_id).className='lookOn';
	  document.getElementById('new_look').value=look_id;
	}  

function go_to_look() {
	document.location.href='looks.asp?look_id=' + document.getElementById('selectLook').options[document.getElementById('selectLook').selectedIndex].value;
	}
	
	
	
	var orgPosition, orgPositionMag, thePos
	var t, t2, totalMags
	orgPositionMag = 0;
	
	function ScrollLoad(div_id, scrollOver){  
		if (document.getElementById(div_id).scrollLeft <= document.getElementById(div_id).scrollWidth &&  document.getElementById(div_id).scrollLeft <= scrollOver) {
		document.getElementById(div_id).scrollLeft =  scrollOver;
		t=setTimeout("ScrollLoad('"+div_id+"'," + scrollOver + ");",100);
		}  
	}
	
	function ScrollLeftArrow(div_id){
		orgPosition = document.getElementById(div_id).scrollLeft ;
		clearTimeout(t); 
		ScrollLeftSlide(div_id);
		
	}
	
	function ScrollLeftSlide(div_id){
		if (document.getElementById(div_id).scrollLeft>0 && document.getElementById(div_id).scrollLeft >= orgPosition - 840) {
		document.getElementById(div_id).scrollLeft =  document.getElementById(div_id).scrollLeft -20;
		t=setTimeout("ScrollLeftSlide('"+div_id+"');",100);
		} else {clearTimeout(t);  } 
	}
	
	function ScrollRightArrow(div_id){
		orgPosition = document.getElementById(div_id).scrollLeft;
		clearTimeout(t); 
		ScrollRightSlide(div_id);
	}
		
	function ScrollRightSlide(div_id){
		if (document.getElementById(div_id).scrollLeft < document.getElementById(div_id).scrollWidth && document.getElementById(div_id).scrollLeft < orgPosition + 840 ) { 
			document.getElementById(div_id).scrollLeft =  document.getElementById(div_id).scrollLeft +20;
			t=setTimeout("ScrollRightSlide('"+div_id+"');",100);
		}  else {clearTimeout(t);  } 
	}
	
	
	function ScrollMagLeftArrow(div_id){
		orgPositionMag = document.getElementById(div_id).scrollLeft ;
		clearTimeout(t2); 
		ScrollMagLeftSlide(div_id);
		
	}
	
	function ScrollMagLeftSlide(div_id){
		if (document.getElementById(div_id).scrollLeft>0 && document.getElementById(div_id).scrollLeft >= orgPositionMag - 140) {
		document.getElementById(div_id).scrollLeft =  document.getElementById(div_id).scrollLeft -20;
		t2=setTimeout("ScrollMagLeftSlide('"+div_id+"');",100);
		} else {clearTimeout(t2);  } 
	}
	
	function ScrollMagRightArrow(div_id){
		orgPositionMag = document.getElementById(div_id).scrollLeft;
		clearTimeout(t2); 
		ScrollMagRightSlide(div_id);
	}
		
	function ScrollMagRightSlide(div_id){
		if (document.getElementById(div_id).scrollLeft < document.getElementById(div_id).scrollWidth && document.getElementById(div_id).scrollLeft < orgPositionMag + 140 ) { 
			document.getElementById(div_id).scrollLeft =  document.getElementById(div_id).scrollLeft +20;
			t2=setTimeout("ScrollMagRightSlide('"+div_id+"');",100);
		}  else {clearTimeout(t2);  } 
	}
	 
	function ScrollMag(div_id, whichWay){
		totalMags = document.getElementById('totalMags').value;
		totalMags = parseInt(totalMags);
		
		document.getElementById('Mag_Arrow_R').style.visibility='';
		document.getElementById('Mag_Arrow_L').style.visibility='';
		
		if (whichWay == 1) { 
			orgPositionMag = orgPositionMag + 1 
			if (totalMags - orgPositionMag <= 5) { 
				orgPositionMag = totalMags - 5;
				document.getElementById('Mag_Arrow_R').style.visibility='hidden';
			}
		} else { orgPositionMag = orgPositionMag - 1 
			if (orgPositionMag <= 0 ) { 
				orgPositionMag = 0;
				document.getElementById('Mag_Arrow_L').style.visibility='hidden';
			}
		}  
		
		getData('showMagScroll.asp?filterDate=<%= filterDate %>&filterBy=<%= filterBy %>&mag_id=' +  document.getElementById('mag_id').value + '&startPos=' + orgPositionMag, div_id);
		
	}
	 
	function changeProduct(product_id, dept_id)
	{
	  document.getElementById('product_id').value=product_id;
	  /* prodList = eval("document.getElementById('allProducts_" + dept_id + "')");
	  allprods = prodList.value.split(",");
	 
	 for(x = 0; x < allprods.length; x++) {
	  	if (allprods[x] != "") {
			tdName = "CSQ_" + allprods[x]  
			document.getElementById(tdName).style.border='';
		}
	  }
	  
	  document.getElementById('CSQ_' + product_id).style.border='1px solid #d9678c';
	*/	 
	}  
	
	function changeMag(mag_id, mag_img)
	{ 
	  
	  magList = eval("document.getElementById('allMags')");
	  arrMag = magList.value.split(",");
	  
	  for(x = 0; x < arrMag.length; x++) {
	  	if (arrMag[x] != "") {
			tdName = "magDiv_" + arrMag[x]  
			document.getElementById(tdName).style.border='1px solid #FFFFFF';
			imgSrc = document.getElementById('Mag_' + arrMag[x]).src;
			imgSrc = imgSrc.replace('gallery_sm_med','gallery_small');
			imgSrc = imgSrc.replace('gallery_med','gallery_small') ;
			document.getElementById('Mag_' + arrMag[x]).src=imgSrc;
		}
	  }  
	  document.getElementById('mag_id').value = mag_id;
	  document.getElementById('magDiv_' + mag_id).style.border='1px solid #e988a8'; 
	  document.getElementById('Mag_' + mag_id).src= contenturl + 'asseenin/gallery_med/'+mag_img; 
	  thePos =  findPos(document.getElementById('Mag_' + mag_id));
	  if (thePos > orgPositionMag && thePos < orgPositionMag + 800 ) {
	  	document.getElementById('magBox').scrollLeft =  document.getElementById('magBox').scrollLeft -100;
	  } else if (orgPositionMag + 800 < thePos + 150)  {  
	  	document.getElementById('magBox').scrollLeft =  document.getElementById('magBox').scrollLeft +100;
	  }
			
	
	  window.scrollTo(0, 300);
	}  
	
	function findPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				//curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		return [curleft];//,curtop];
		}
	}

	function change_month(theDate) {
	document.location.href='tab_buzz.asp?filterDate='+theDate;
	}
	
	
	function mag_add_to_cart (dept_id) {
	parent.document.getElementById('dropdown').style.visibility='hidden';
	AddProd.document.location.href='showAddtoCart.asp?dept_id=' + dept_id + '&cartadd=1&product_id='  + document.getElementById('product_id').value + '&qty=' + document.getElementById('qty').value;
	parent.scroll(0,0);
}


	var orgPosition, orgPositionMag, thePos
	var t, t2, totalMags
	orgPositionMag = 0;
	 
	
	function ScrollLeftArrow(div_id){
		orgPosition = document.getElementById(div_id).scrollLeft ;
		clearTimeout(t); 
		ScrollLeftSlide(div_id);
		
	}
	
	function ScrollLeftSlide(div_id){
		if (document.getElementById(div_id).scrollLeft>0 && document.getElementById(div_id).scrollLeft >= orgPosition - 110) {
		document.getElementById(div_id).scrollLeft =  document.getElementById(div_id).scrollLeft - 10;
		t=setTimeout("ScrollLeftSlide('"+div_id+"');",100);
		} else {clearTimeout(t);  } 
	}
	
	function ScrollRightArrow(div_id){
		orgPosition = document.getElementById(div_id).scrollLeft;
		clearTimeout(t); 
		ScrollRightSlide(div_id);
	}
		
	function ScrollRightSlide(div_id){
		if (document.getElementById(div_id).scrollLeft < document.getElementById(div_id).scrollWidth && document.getElementById(div_id).scrollLeft < orgPosition + 110 ) { 
			document.getElementById(div_id).scrollLeft =  document.getElementById(div_id).scrollLeft +10;
			t=setTimeout("ScrollRightSlide('"+div_id+"');",100);
		}  else {clearTimeout(t);  } 
	}
	  
	    
	function findPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				//curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		return [curleft];//,curtop];
		}
	}

	
	function shiftUp(img_div) {   
		var manager = new jsAnimManager(5);  
		var anim = manager.createAnimObject('brush_' + img_div); 
		anim.add({property: Prop.top, from: 1, to: -30, duration: 100, ease: jsAnimEase.linear}); 
		
		var start_point
		var pos_div
		start_point = document.getElementById('brushes_scroll').scrollLeft ;
		//end_point =start_point + 880;
		pos_div = findPos(document.getElementById('brush_' + img_div));
		
		if (pos_div > start_point + 550) { //half way through so turn arrow around  
			document.getElementById('brush_arrow_l_' + img_div).style.backgroundImage = 'url(http://content.eyeslipsface.com/images/spacer.gif)';
			document.getElementById('brush_arrow_r_' + img_div).style.backgroundImage = 'url(http://content.eyeslipsface.com/images/calloutarrowR.png)';
			document.getElementById('brush_name_' + img_div).style.marginLeft =-180;
			document.getElementById('brush_name_' + img_div).style.display = 'inline';
		} else {		
		
			document.getElementById('brush_arrow_r_' + img_div).style.backgroundImage = 'url(http://content.eyeslipsface.com/images/spacer.gif)';
			document.getElementById('brush_arrow_l_' + img_div).style.backgroundImage = 'url(http://content.eyeslipsface.com/images/calloutarrow.png)';
			document.getElementById('brush_name_' + img_div).style.marginLeft =50;
			document.getElementById('brush_name_' + img_div).style.display = 'inline';
		} 
		//
		//document.getElementById(img_div).style.marginTop = -20;
	}
	
	 
	function shiftDown(img_div) {
		document.getElementById('brush_name_' + img_div).style.display = 'none';
		img_div = 'brush_' + img_div
		var manager = new jsAnimManager(5);   
		var anim = manager.createAnimObject(img_div); 
		anim.add({property: Prop.top, from: -30, to: 1, duration: 50, ease: jsAnimEase.linear});    
		
		//document.getElementById(img_div).style.marginTop = 20;
	}
	 
	 
	 function giftsOver(dept_id) {
	 	document.getElementById('holiday_gift_arrow_'+ dept_id).src = contenturl + 'images/holiday_gift_arrow_pnk.gif'
	 }
	 
	
	 function giftsOut(dept_id) {
	 	document.getElementById('holiday_gift_arrow_'+ dept_id).src = contenturl + 'images/holiday_gift_arrow_blk.gif'
	 
	 }
	
	function giftsClick(dept_url) {
		document.location.href = websiteurl + 'makeup/gifts/' + dept_url
	} 
	
	
	function openGiftCard() {  
		theLink = 'giftcard_email.asp?fromname=' +  document.getElementById('fromname').value + '&toname=' +  document.getElementById('toname').value + '&cardmessage=' + document.getElementById('cardmessage').value + '&amount=' +  document.getElementById('amount').value;
		var newWindow = window.open(theLink, 'giftcard', 'width=700,height=920,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');	
		newWindow.focus();
	}
	
	

function brush_guide_tab(brand_id) {

	brush_guide_brand_id = brand_id;
	
	document.getElementById('brush_guide_l_2044').src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabL.jpg'
	document.getElementById('brush_guide_r_2044').src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabR.jpg'
	document.getElementById('brush_guide_tab_2044').className = 'brushes-guide-tab'
	
	document.getElementById('brush_guide_l_1285').src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabL.jpg'
	document.getElementById('brush_guide_r_1285').src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabR.jpg'
	document.getElementById('brush_guide_tab_1285').className = 'brushes-guide-tab'
	
	//document.getElementById('brush_guide_l_1190').src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabL.jpg'
	//document.getElementById('brush_guide_r_1190').src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabR.jpg'
	//document.getElementById('brush_guide_tab_1190').className = 'brushes-guide-tab'

	document.getElementById('brush_guide_l_' + brand_id).src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabL-on.jpg'
	document.getElementById('brush_guide_r_' + brand_id).src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabR-on.jpg'
	document.getElementById('brush_guide_tab_' + brand_id).className = 'brushes-guide-tab-on'
	
	getData('show_brush_guide.asp?brand_id=' + brand_id,'brush_guide');
}


function brush_guide_tab_over(brand_id) {
	
	var tab_text;
	if (brand_id == 2044) {
		tab_text = 'ALL BRUSHES JUST $1'
	} else if (brand_id == 1285) {
		tab_text = 'ALL BRUSHES JUST $3'
	} else if (brand_id == 1190) {
		tab_text = 'ALL BRUSHES JUST $5' 
	} else if (brand_id == 3632) {
		tab_text = 'STARTING AT $4' 
	}
	
	document.getElementById('brush_guide_l_' + brand_id).src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabL-on.jpg'
	document.getElementById('brush_guide_r_' + brand_id).src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabR-on.jpg'
	document.getElementById('brush_guide_tab_' + brand_id).className = 'brushes-guide-tab-on'
	document.getElementById('brush_guide_tab_' + brand_id).innerHTML = tab_text
	
	
}	

function brush_guide_tab_out(brand_id) {
	
	var tab_text;
	if (brand_id == 2044) {
		tab_text = 'ESSENTIALS BRUSH GUIDE'
	} else if (brand_id == 1285) {
		tab_text = 'STUDIO BRUSH GUIDE'
	} else if (brand_id == 1190) {
		tab_text = 'MINERALS BRUSH GUIDE'
	} else if (brand_id == 3632) {
		tab_text = 'GEM BRUSH GUIDE'
	}
	
	if (brush_guide_brand_id != brand_id ) {
		document.getElementById('brush_guide_l_' + brand_id).src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabL.jpg'
		document.getElementById('brush_guide_r_' + brand_id).src = 'http://content.eyeslipsface.com/images/Brush_Guides_tabR.jpg'
		document.getElementById('brush_guide_tab_' + brand_id).className = 'brushes-guide-tab'
	}
	document.getElementById('brush_guide_tab_' + brand_id).innerHTML = tab_text
	
}

function addCoupon(coupon_trigger) { 

	document.getElementById('AddProd2').src='cartviewedit.asp?coupon=' + coupon_trigger;
}


var timeInSeconds;
var dynamic_ticker; 

function startTicker(div, seconds) {
	timeInSeconds = seconds;
	dynamic_ticker = setInterval("dynamic_tick('" + div + "')",1000); 
}


function dynamic_tick(div) {
	
	var secs = timeInSeconds;
	if (secs > 0) { 
		timeInSeconds--; 
	} else {
		clearInterval(dynamic_ticker); // stop counting at zero
		document.getElementById(div).innerHTML = "Sale has ended";
	}

	var days = Math.floor(secs/86400);
	secs %= 86400;
	var hours= Math.floor(secs/3600);
	secs %= 3600;
	var mins = Math.floor(secs/60);
	secs %= 60;

	var result = ((hours < 10 ) ? "0" : "" ) + hours + ":" + ( (mins < 10) ? "0" : "" ) + mins + ":" + ( (secs < 10) ? "0" : "" ) + secs;
	//result = days + " Days: " + result;
	document.getElementById(div).innerHTML = result;
}


function mag_popup_hp() {
window.open('magPopup.asp?display=2','Subscription','width=550,height=400,directories=no,location=no,menubar=no,scrollbars=yes,status=no,toolbar=no,resizable=yes');

}
 
		function createHeaderDetailsOLD(theID) {    
			if (theID  == '') { 
				$('#headerDetailsDiv').hide(false);
			
			} else {
				$('#headerDetailsTxt').children().css('display', 'none');
				$('#' + theID).css('display','inline');
				$('#headerDetailsDiv').show();
			}
		}
		
		function createHeaderDetailsShow() {    
			 $('#headerDetailsDiv').show(); 
		}
		
		
		
function hpBannersSlide() {
 	var $active = $('#hp_slides_lst div.active-banner');

    if ( $active.length == 0 ) $active = $('#hp_slides_lst div:last');
 
    var $next =  $active.next().length ? $active.next()
        : $('#hp_slides_lst div:first');
  
    $active.addClass('last-active-banner');
	
/*
	if ($($next).find('#hp_slide_img_' + $next.attr("id")).length == 0) { 
		  var theImg = $($next).find('#hp_slide_src_' + $next.attr("id")).val();
		  $next.prepend('<img src="' + theImg + '" usemap="#hp_feature_' + $next.attr("id") + '" id="hp_slide_img_' + $next.attr("id") + '">');
	}
	*/
    $next.css({opacity: 0.0})
        .addClass('active-banner')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active-banner last-active-banner');
        });
		 
	$('#hp_slide_steps ul li').css("background-image", "url(http://content.eyeslipsface.com/images/hp_slide_step_bkgd.gif)"); 
	$('#hp_slide_steps_' + $next.attr("id")).css("background-image", "url(http://content.eyeslipsface.com/images/hp_slide_step_bkgd_on.gif)"); 
	
	i = setTimeout("hpBannersSlide()", 5000 );
}

 
		