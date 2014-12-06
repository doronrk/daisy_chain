// JavaScript Document
	function initUIBehavior () {
		$('.shopping-cart-global .show-shopping-cart').click(function(){
			//$('.link-checkout').addClass('active');
			$('.popup-shopping-cart').slideToggle("slow");		
		});		
		//for input search on header
		$(".frm-search-global input[type='text']").click(function(){
			if(this.value == 'Start your search here...') this.value='';
		});
		$(".frm-search-global input[type='text']").focusout(function(){
			if(this.value == '') {
				this.value='Start your search here...';			
				$(this).css('color','#ccc');
			}
		});
		$(".frm-search-global input[type='text']").keydown(function(){
			$(this).css('color','#666666');
		});	
		// for input email at bottom homepage
		$(".ui-txt-type input[type='text']").click(function(){
			if(this.value == 'Enter Email Address') this.value='';
		});
		$(".ui-txt-type input[type='text']").focusout(function(){
			if(this.value == '') this.value='Enter Email Address';
		});	
		//ORDER RETURN Page: set class last for last div.past-order-item inside .list-past-orders
		$(".list-past-orders div.past-order-item:last").addClass('last');
		$(".list-shopped-items > li:last").addClass('last');
		//SHOPPING CART Page: set class last for last div .pd-item-info
		$(".nav-policy li:last").addClass('last');
		//$(".main-content-type2 .customers-item-purchased .list-pd-items div.pd-item-info:nth-child(4n)").addClass("noMarginR");
		$(".inner-general .tit-type-blue2 + .list-pd-items div.pd-item-info:nth-child(4n)").addClass("noMarginR");
		//$(".sidebar .list-pd-items div.pd-item-info:last").removeClass("noMarginR");
		
		//SHOP BY BRAND: add border left/top for each brand in some cases
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(1)").addClass('with-border-top');
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(2)").addClass('with-border-top');
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(3)").addClass('with-border-top');
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(4)").addClass('with-border-top');
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(5)").addClass('with-border-top');
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(6)").addClass('with-border-top');
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(7)").addClass('with-border-top');
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(8)").addClass('with-border-top');
		$(".shop-by-brand .list-brands-to-shop > div .brand-alphabet:nth-child(8n+1)").addClass('with-border-left');
		
		//CATEGORY page: add border left/top for each brand in some cases
		$(".the-brands .list-brands-to-shop .brand-alphabet:nth-child(5n)").addClass('noBorderR');
		$(".customer-reviews .review-entry:last").addClass('last');		
	}

	$(function(){
		initUIBehavior();
		//alert('hi there');	
		//WISH LIST PAGE
		$(".wishlist .tbl-items-ordered tr:last-child").addClass("last");
		$(".wishlist .tbl-items-ordered tr:only-child").addClass("only");							
	});
	
