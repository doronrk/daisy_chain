/* ecommerce --> prefix eco */

var itemLink = document.getElementById("eco-mini-basket");

if(itemLink!=null) {
	itemLink.setAttribute("storeLink", itemLink.getAttribute("href"))
	itemLink.removeAttribute("href")
}

var eCommerce={
	init:function(){
		eCommerce._basket();
		$.ajax({
			url:apiURL,
			dataType: 'jsonp',
			data: 'jsonp=replaceCart'
		});

	},
	_basket:function(){
		$('a.eco-addtobasket').click(function(e){ //click 'add to basket' updata basket data.
			//e.preventDefault();
			//alert($(this).closest('[data-commerce-key]').attr('data-commerce-key'));
		});
	}
}

// ================================================================================= banner process  .S
var eCommerceSet = (function(){
	var init_ecommerce_width=960;
	var ecommerce_detetc_num=0;
	var cnt_banner = ($('.e-commerce-banner .carousel-mask li.hotspot').length)-1;

	var obj_ecommerce=$('.carousel-mask > ul');
	var ecommerce_carousel_width=parseInt(cnt_banner*init_ecommerce_width); //carousel total width
	var ecommerce_each_width=parseInt(ecommerce_carousel_width/cnt_banner); //carousel each width

	if(cnt_banner > 2)
	{
		var body_indecator ='<div class="counsel-indicator">';
				body_indecator+='<div class="ec-banner-left">';
				body_indecator+='<ul class="ec-banner-select">';
				for(var i=0;i <= cnt_banner;i++){
					if(i==0){
						body_indecator+='<li class="sel"></li>';
					}else{
						body_indecator+='<li class="no-sel"></li>';
					}
				}
				body_indecator+='</ul>';
				body_indecator+='</div>';
				body_indecator+='<div class="ec-banner-right"></div>';
				body_indecator+='</div>';

		$('.e-commerce-banner').append(body_indecator);
		var width_indicator=$('.counsel-indicator').width();
		$('.counsel-indicator').css('left',((init_ecommerce_width/2)-(width_indicator/2)));

		$('.counsel-indicator .ec-banner-select li').each(function(index){  //indicator click
			$(this).click(function(){
				check_indicator();
				if(ecommerce_detetc_num!=index){
					var tmp_cnt=Math.abs(ecommerce_detetc_num-index);



					/*
					var tmp_cnt=Math.abs(index);
					var tmp_posi=0;
					if(ecommerce_detetc_num > index){
						tmp_posi=(tmp_cnt*init_ecommerce_width);
					}else{
						tmp_posi=-(tmp_cnt*init_ecommerce_width);
					}

					obj_ecommerce.animate({left:tmp_posi},1000);
					*/



					if(ecommerce_detetc_num > index){
						for(var i=0;i < tmp_cnt;i++)
						{
							$('.carousel-arrow-left').click();
						}
					}else{
						for(var i=0;i < tmp_cnt;i++)
						{
							$('.carousel-arrow-right').click();
						}
					}
					ecommerce_detetc_num=index;


				}
			});
		});
		//sign indicator set

		var ecommerceID;
		check_indicator=function(){

			ecommerce_detetc_num=parseInt(Math.abs(obj_ecommerce.position().left)/init_ecommerce_width);
			$('.counsel-indicator .ec-banner-select li').removeClass('sel').addClass('no-sel');
			$('.counsel-indicator .ec-banner-select li').eq(ecommerce_detetc_num).removeClass('no-sel').addClass('sel');
			ecommerceID=setTimeout('check_indicator()', 150);
		}

		$('.carousel-arrow-left,.carousel-arrow-right').click(function(){
			clearTimeout(ecommerceID);
			check_indicator();
		});


	}
});
// ================================================================================= banner process  .E

function replaceCart(a){

	if(a.lineItems < 1){
		$('.eco-mini-basket').removeClass('active').addClass('deactive');
	}else{
		$('.eco-mini-basket').removeClass('deactive').addClass('active');
	}

	$('.eco-mini-basket span').remove()
	$('.eco-mini-basket').prepend('<span>('+a.lineItems+')</span>')

	var itemLink = document.getElementById("eco-mini-basket");

	if(itemLink!=null) {
		itemLink.setAttribute("href", itemLink.getAttribute("storeLink"))
		itemLink.removeAttribute("storeLink")
	}

}

function cartTagging(){
	var s=s_gi(s_account);
	s.linkTrackVars='None';
	s.linkTrackEvents='None';
	s.tl(this,'o','us:header-shopping-cart');
}

head.ready(function(){

	eCommerceSet()
	eCommerce.init();

})