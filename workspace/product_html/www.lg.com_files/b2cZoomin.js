var set_img;
$(function(){
	viewConsole=function(e){console.log(e);}
});


$(document).ready(function(){
	//set_img=null;
	var set_img_time;


	var center_img='<div class="zoom-center-img" style="position:absolute;top:200px;left:230px;width:50px;height:40px;background: url(/lg3-common/images/global/lg-global-sprite.png) no-repeat scroll 11px -892px transparent;"></div>';

	var data_high=false;  //exist big images

	set_img=$('.pane img');
	if(set_img.eq(0).attr('data-high')){
		data_high=true;
		$('.product-info-zoomin-img').remove();
		$('.product-info').append('<div class="product-info-zoomin-img"><img src="'+set_img.attr('data-high')+'" /></div>');
		$('.sign-mouse-position').remove();
		$('.pane.active img').after('<div class="sign-mouse-position"></div>');
	}

	$('.product-carousel  li').click(function(){
		var imgIndex = $(this).index();

		var set_img=$('.pane img').eq(imgIndex);
		$('.product-info-zoomin-img').remove();
		if(set_img.attr('data-high') && set_img.attr('data-high')!=''){
			data_high=true;
			$('.product-info').append('<div class="product-info-zoomin-img"><img src="'+set_img.attr('data-high')+'" /></div>');
			$('.sign-mouse-position').remove();
			$('.pane.active img').after('<div class="sign-mouse-position"></div>'+center_img);
		}else{
			data_high=false;
		}

		$img_w 	= $('.pane.active img').width();
		$img_h	=	$('.pane.active img').height();
		$cursor_w	=	parseInt($('.sign-mouse-position').width()/2);
		$cursor_h = parseInt($('.sign-mouse-position').height()/2);
		$abs_x=0;
		$abs_y=0;
		$per_x=0;
		$per_y=0;
	});


	//set_img=$('.pane.active img');
	//$('.product-info').append('<div class="product-info-zoomin-img"><img src="'+set_img.attr('src')+'" /></div>');
	//$('.pane.active img').after('<div class="sign-mouse-position"></div>');
	$img_w 	= $('.pane.active img').width();
	$img_h	=	$('.pane.active img').height();
	$cursor_w	=	parseInt($('.sign-mouse-position').width()/2);
	$cursor_h = parseInt($('.sign-mouse-position').height()/2);
	$abs_x=0;
	$abs_y=0;
	$per_x=0;
	$per_y=0;




	var alt = $('.popup-image-wrapper .popup-large-img img').attr('alt');


	$(document).bind('mousemove',function(e){
		if($('.popup-zoom-in').hasClass('open')){
			return;
		}

		if(data_high==false){
			return;
		}

		$offset_document_x=e.pageX;
		$offset_document_y=e.pageY;
		$offset_img 	= set_img.offset();
		$offset_img_x1	=	parseInt($offset_img.left);
		$offset_img_y1	=	parseInt($offset_img.top);
		$offset_img_x2	=	parseInt($offset_img_x1+$('.pane.active img').width());
		$offset_img_y2	=	parseInt($offset_img_y1+$('.pane.active img').height());


		if(($offset_document_x > $offset_img_x1 && $offset_document_x < $offset_img_x2) && ($offset_document_y > $offset_img_y1 && $offset_document_y < $offset_img_y2)){

			if(data_high){
				$('.zoom-center-img').hide();
			}


			var cursor_x=$offset_document_x-$cursor_w;
			var cursor_y=($offset_document_y-$cursor_h)-$(document).scrollTop();

			if(cursor_x < $offset_img_x1){
				cursor_x=$offset_img_x1;
			}

			if((cursor_x+($cursor_w*2)) > $offset_img_x2){
				cursor_x=$offset_img_x2-($cursor_w*2);
			}

			if(cursor_y < ($offset_img_y1-$(document).scrollTop())){
				cursor_y=($cursor_h*2)-$(document).scrollTop();
			}

			if((cursor_y+($cursor_h*2)+$(document).scrollTop()) > ($offset_img_y2)){
				cursor_y=$offset_img_y2-($cursor_h*2)-$(document).scrollTop();
			}


			$('.sign-mouse-position').show();
			$('.product-info').addClass('active-zoomin');
			$('.sign-mouse-position').css({'left':(cursor_x),'top':(cursor_y)});
			$abs_x	=	$offset_document_x - $offset_img_x1;
			$abs_y 	=	$offset_document_y - $offset_img_y1;
			$per_x	=	parseInt(($abs_x/$img_w)*100);
			$per_y	=	parseInt(($abs_y/$img_h)*100);
			move_zoomin_img($per_x,$per_y);
			$('.product-info.active-zoomin .product-info-zoomin-img').show(100);
		}else{
			if(data_high){
				$('.zoom-center-img').show();
			}
			$('.sign-mouse-position').hide();
			$('.product-info.active-zoomin .product-info-zoomin-img').hide(100);
		}
	});


	move_zoomin_img	=	function($px,$py){
		$zoom_img_w	=	parseInt($('.product-info-zoomin-img img').width());
		$zoom_img_h	=	parseInt($('.product-info-zoomin-img img').height());
		$sub_w	=	-(460/100)*$px;
		$sub_h	=	-(350/100)*$py;
		$tx=($zoom_img_w*($px/100))+$sub_w;
		$ty=($zoom_img_h*($py/100))+$sub_h;
		$('.product-info-zoomin-img img').css({'left':(-$tx),'top':(-$ty)});
	}


	/* $('.sign-mouse-position').on('click',function(e){
		e.preventDefault();
		$('.pane-aside .enlarge > a.hotspot').click();
	}); */


	//popup -------------------------------------------------------------------------------------------------------- popup .S
	var is_pop_large=false; //in-pop exist large image


	var zoomRatio=0.5;
	var size_window_w=770;
	var size_window_h=493;

	var set_img_width=0;
	var set_img_height=0;
	var set_img_posi_x=0;
	var set_img_posi_y=0;

	init_zooom_img_set=function(){


		$get_img=$('.popup-image-wrapper .popup-large-img img');

		//alert($get_img);

		var original_img=new Image();
				original_img=$get_img.attr('src');

		var tmp_src=new Image();
		tmp_src.src=$get_img.attr('src')
		

		$get_img_data_w=tmp_src.width;
		$get_img_data_h=tmp_src.height;

		if($get_img.hasClass('medium')){
			set_img_width=parseInt($get_img_data_w);
			set_img_height=parseInt($get_img_data_h);
		}else{
			set_img_width=parseInt($get_img_data_w*zoomRatio);
			set_img_height=parseInt($get_img_data_h*zoomRatio);
		}

		$get_img.width(set_img_width);
		$get_img.height(set_img_height);

		$set_img_posi_x=(size_window_w/2)-(set_img_width/2);
		$set_img_posi_y=(size_window_h/2)-(set_img_height/2);


		$get_img.css({'left':$set_img_posi_x,'top':$set_img_posi_y});

		$('.popup-large-img img:not(.medium)').css('cursor','url(/lg3-common-v4/images/zoomin/enhance_cursor_plus.cur),auto');

		init_zoom_large_move();
	}

	init_zooom_img=function(){

		if(zoomRatio > 2){
			$('.popup-large-img img').css('cursor','url("/lg3-common-v4/images/zoomin/enhance_cursor_minor.cur"),auto');
		}else{
			$('.popup-large-img img').css('cursor','url("/lg3-common-v4/images/zoomin/enhance_cursor_plus.cur"),auto');
		}

		$get_img=$('.popup-image-wrapper .popup-large-img img');

		var original_img=new Image();
				original_img=$get_img.attr('src');

		var tmp_src=new Image();
				tmp_src.src=$get_img.attr('src');

		$get_img_data_w=tmp_src.width;
		$get_img_data_h=tmp_src.height;

		set_img_width=parseInt($get_img_data_w*zoomRatio);
		set_img_height=parseInt($get_img_data_h*zoomRatio);
		//$get_img.width(set_img_width);
		//$get_img.height(set_img_height);

		$set_img_posi_x=(size_window_w/2)-(set_img_width/2);
		$set_img_posi_y=(size_window_h/2)-(set_img_height/2);

		//$get_img.css({'left':$set_img_posi_x,'top':$set_img_posi_y});
		$get_img.animate({
    	left:$set_img_posi_x,
    	top:$set_img_posi_y,
    	height:set_img_height,
    	width:set_img_width
  	},500,function(){
			$get_img.draggable();
  	});

	}
	
	/* 20140328 choyearang add : arrow controller */
	$('.popup-image-zoom.arrow a').click(function(e){
		var $movePixel = 100,
			$speed = 300,
			isMoving = false,
			$get_img=$('.popup-image-wrapper .popup-large-img img');
		
		if(is_pop_large){
			if(isMoving == false){
				if($(this).hasClass('top')){
					isMoving = true;
					$get_img.animate({top:parseInt($get_img.css("top"))+$movePixel+"px"},$speed,function(){isMoving = false});
				
				} else if ($(this).hasClass('bottom')){
					isMoving = true;
					$get_img.animate({top:parseInt($get_img.css("top"))-$movePixel+"px"},$speed,function(){isMoving = false});
				
				} else if ($(this).hasClass('left')){
					isMoving = true;
					$get_img.animate({left:parseInt($get_img.css("left"))+$movePixel+"px"},$speed,function(){isMoving = false});
				
				} else if ($(this).hasClass('right')){
					isMoving = true;
					$get_img.animate({left:parseInt($get_img.css("left"))-$movePixel+"px"},$speed,function(){isMoving = false});
				}
			}
		} 
		
		e.preventDefault();
	});


	var now_zoom_posi=0;
	var cnt_obj_zoom=0;
	var now_zoom_page=0;
	init_zoom_large_move=function(){
		cnt_obj_zoom=parseInt($('.popup-product-carousel .carousel-mask ul li').length-1);
		$('.popup-product-carousel .carousel-mask ul li').each(function(index){
			if($(this).hasClass('active')){
				now_zoom_posi=index;
			}
		});

		if(now_zoom_posi > 0){
			$('.zoom-image-move-btn.left img').fadeTo('fast',1.0).addClass('active');
		}else{
			$('.zoom-image-move-btn.left img').fadeTo('fast',0.3).removeClass('active');
		}

		if(now_zoom_posi < cnt_obj_zoom){
			$('.zoom-image-move-btn.right img').fadeTo('fast',1.0).addClass('active');
		}else{
			$('.zoom-image-move-btn.right img').fadeTo('fast',0.3).removeClass('active');
		}
	}


	$('.zoom-image-move-btn').on('click',function(e){
		if($(this).hasClass('left')){
			if(now_zoom_posi > 0){
				now_zoom_posi--;
				if((now_zoom_posi > 0)&&(now_zoom_posi%5==4) ){
					$('.popup-product-carousel .carousel-arrow-left a').click();
					$('.popup-product-carousel .carousel-mask ul li').eq(now_zoom_posi).click();
				}else{

					$('.popup-product-carousel .carousel-mask ul li').eq(now_zoom_posi).click();
				}
			}
			now_zoom_page=0;
		}else if($(this).hasClass('right')){
			if(now_zoom_posi < cnt_obj_zoom){
				now_zoom_posi++;
				if((now_zoom_posi > 0)&&(now_zoom_posi%5==0) ){
					$('.popup-product-carousel .carousel-arrow-right a').click();
					$('.popup-product-carousel .carousel-mask ul li').eq(now_zoom_posi).click();
				}else{

					$('.popup-product-carousel .carousel-mask ul li').eq(now_zoom_posi).click();
				}

			}
		}
		e.preventDefault();
	});


	var init_popup_pop;
	var init_popup_large;
	
	init_first_loading=function(){
		/* 20140519 choyearang modify */
		init_popup_pop=$('.popup-product-carousel li:eq('+now_zoom_posi+') .galleryPop').attr('value');
		init_popup_large=$('.popup-product-carousel li:eq('+now_zoom_posi+') .galleryMedium').attr('value');


		if(init_popup_pop!='' && init_popup_pop != 'null'){
			is_pop_large=true;
			$('.popup-image-wrapper .popup-large-img').html('<img src="'+init_popup_pop+'" class="enc_img_large" style="cursor:url(/lg3-common-v4/images/zoomin/enhance_cursor_plus.cur),auto;" alt="' + alt +'" />');

			$('.popup-image-zoom-ctl').fadeIn();
		}else{
			is_pop_large=false;
			$('.popup-image-wrapper .popup-large-img').html('<img src="'+init_popup_large+'" class="enc_img_large medium" style="cursor:pointer;" alt="' + alt +'" />');
			$('.popup-image-zoom-ctl').fadeOut();
		}


		$('.popup-image-wrapper .popup-large-img img').load(function(){
			init_zooom_img_set();
		});
	}




	$('.pane-aside .enlarge > a').click(function(e){
		e.preventDefault();

		/* 20140519 choyearang modify */
		init_popup_pop=$('.popup-product-carousel li:eq('+now_zoom_posi+') .galleryPop').attr('value');
		init_popup_large=$('.popup-product-carousel li:eq('+now_zoom_posi+') .galleryMedium').attr('value');


		if(init_popup_pop!='' && init_popup_pop != 'null' && init_popup_pop != null ){

			is_pop_large=true;
			$('.popup-image-wrapper .popup-large-img').html('<img src="'+init_popup_pop+'" class="enc_img_large" style="cursor:url(/lg3-common-v4/images/zoomin/enhance_cursor_plus.cur),auto;" alt="' + alt +'" />');

			$('.popup-image-zoom-ctl').fadeIn();
		}else{
			//alert(init_popup_large+' etst');
			is_pop_large=false;
			$('.popup-image-wrapper .popup-large-img').html('<img src="'+init_popup_large+'" class="enc_img_large medium" style="cursor:pointer!important" alt="' + alt +'" />');
			$('.popup-image-zoom-ctl').fadeOut();
		}


		$('.popup-image-wrapper .popup-large-img img').load(function(){

			init_zooom_img_set();

			//check
			now_zoom_posi=$('.product-carousel  .carousel-mask li.active').index();
			$('.popup-product-carousel .carousel-mask li').eq(now_zoom_posi).click();


			// ######################################################################################### page move add.S
			//TASK START
			//now_zoom_page=0;
			if(now_zoom_page == parseInt(now_zoom_posi/5)){
				//now_zoom_page=parseInt(now_zoom_posi/5);
			}else{
				if(now_zoom_page > parseInt(now_zoom_posi/5)){
					$('.popup-zoom-in .carousel-arrow-left').click();
				}else if(now_zoom_page < parseInt(now_zoom_posi/5)){
					$('.popup-zoom-in .carousel-arrow-right').click();
				}
				now_zoom_page=parseInt(now_zoom_posi/5);
			}
			//TASK END
			// ######################################################################################### page move add.E

		});
	});

	$('.popup-product-carousel li').click(function(){

		//zoomRatio=0.25;
		zoomRatio=0.5;

		$('.popup-product-carousel li').removeClass('active');
		$(this).addClass('active');

		/* 20140519 choyearang modify */
		var galleryPop=$('.galleryPop',this).attr('value');
		var galleryMedium=$('.galleryMedium',this).attr('value');
		var gallerySmall=$('.gallerySmall',this).attr('data-src');

		if(galleryPop!='' && galleryPop!='null'){
			is_pop_large=true;
			$('.popup-image-wrapper .popup-large-img').html('<img src="'+galleryPop+'" class="enc_img_large" style="cursor:url(/lg3-common-v4/images/zoomin/enhance_cursor_plus.cur),auto;" alt="' + alt +'" />');
			$('.popup-image-zoom-ctl').fadeIn();
		}else{
			is_pop_large=false;
			$('.popup-image-wrapper .popup-large-img').html('<img src="'+galleryMedium+'" class="enc_img_large medium" style="cursor:pointer!important" alt="' + alt +'" />');
			$('.popup-image-zoom-ctl').fadeOut();
		}

		$('.popup-image-wrapper .popup-large-img img').load(function(){
		 	init_zooom_img_set();
		});
	});

	//zoom in-out
	$('.img_zoom').click(function(e){
		e.preventDefault();
		if(is_pop_large)
		{
			if($(this).hasClass('zoomin')){
				if(zoomRatio > 2){
					return;
				}
				zoomRatio=(zoomRatio*2);
			}else if($(this).hasClass('zoomout')){

				if(zoomRatio < 0.26){
					return;
				}
				zoomRatio=(zoomRatio/2);
			}
			init_zooom_img();
		}
	});

	$('.popup-large-img').on('click',function(){
		if(is_pop_large)
		{
			if(zoomRatio > 2){
				return;
			}
			zoomRatio=(zoomRatio*2);
    	init_zooom_img();
  	}
	});

	$(".popup-large-img").on("contextmenu",function(e){
		e.preventDefault();
		if(is_pop_large)
		{
			if(zoomRatio < 0.26){
				return;
			}
			zoomRatio=(zoomRatio/2);
			init_zooom_img();
		}
	});

});
