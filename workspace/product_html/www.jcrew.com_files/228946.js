$(function () {
	$('#singlePDP .productContainer').add('#multiPDP .product-container').each(function () {

    	var productId = $(this).find('.prod-main-img, .prod-main-image').data('productcode');

		var unisexMessageHTML;

		if (productId == 'A4088' ||
			productId == 'A4089' ||
			productId == 'A4092' ||
			productId == 'A4087' ||
			productId == '17554' ||
			productId == 'B3307' ||
			productId == 'B3306' ||
			productId == 'B3305' ||
			productId == 'B3304' ||
			productId == 'B4181' ||
			productId == '70806') {

			// Vans			
			unisexMessageHTML = '<div class="unisex-size-msg">\
								Unisex sizing: Women, please order one and a half sizes smaller than your regular size.\
								</div>';
		} else if (productId == 'B0414') {
			
			// Adidas Slides
			unisexMessageHTML = '<div class="unisex-size-msg">\
								Men&rsquo;s sizing (order two sizes down for women).\
								</div>';
		} else if (productId == 'B1245') {
			
			// SANDERS
			unisexMessageHTML = '<div class="unisex-size-msg">\
								Unisex sizing: Women, please order two sizes smaller than your regular size.\
								</div>';
		} else if (productId == 'B0492' ||
			productId == 'B0493') {

			// Adidas Sneakers			
			unisexMessageHTML = '<div class="unisex-size-msg">\
								Unisex sizing: Women, please order two sizes smaller than your regular size.\
								</div>';
		}

		if (unisexMessageHTML) {
			if($(this).find('section.sizes .international-size-msg').length > 0) {
				$(this).find('section.sizes .international-size-msg').before(unisexMessageHTML);
			} else {
				$(this).find('section.sizes header').append(unisexMessageHTML);
			}
		}
	});
});