var modals = modals ? modals : {};
modals.imageZoom = { autoOpen: false, draggable: false, height: 620, width: 533, modal: true, resizable: false, show: 'fade' };
	
$(window).load (function() {
	if (typeof(ProductDetails.imageList) != 'undefined')
	{
		var counter = 1;		
		for (var keys in ProductDetails.imageList)
		{
			if(counter == 9)
				break;
			
			var newAltDiv = $('<li><div class="viewIdDiv" style="display:none;">' + counter + '</div><a href="#"><img src="' 
					+ ProductDetails.generateImageName(ProductDetails.altSizeString,counter) 
					+ '" alt="' + ProductDetails.shortDescription + '" onerror="this.onerror=\'\';this.src=\'' 
					+ wcs.globalImagePath + 'images/unavailable_50.png\'" ></a></li>');
			if (counter == 1) newAltDiv.addClass('active');
			$('#thumb_holder').append(newAltDiv);
			counter++;
		}
		ProductDetails.imageTotal = counter;
	}
	else
	{
		$('#large_images').css('border-bottom','none');
	}

	ProductDetails.isCarousel = false;
	if ($('.product-image-carousel li').length > 6) {
		$('.product-image-carousel').carousel({dispItems: 4});    
	}
	
	$('.thumbnail-viewer').each(function() {
		var me = this;
		this.setImage = function(viewId) {
			// update the rich fx modal window
			rfxProductColorChangeClick('Image1', viewId);
			$('#Image1').attr('src',ProductDetails.generateImageName(500,viewId));
			
			$('.images > li').hide();
			var nonClonedThumbnailIndex;
			if (ProductDetails.isCarousel)
			{
				nonClonedThumbnailIndex = ProductDetails.imageTotal + viewId - 2;
			}
			else
			{
				nonClonedThumbnailIndex = viewId - 1;
			}
			
			$('.thumbs > li').removeClass('active').eq(nonClonedThumbnailIndex).addClass('active');
			if($('.thumbs > li').eq(nonClonedThumbnailIndex).data('image')) {
				// show previously created html
				$('.thumbs > li').eq(nonClonedThumbnailIndex).data('image').show();
			} else {
				// create html the first time we view an image
				$('.thumbs > li').eq(nonClonedThumbnailIndex).data('image', $('<li><img src="'+ ProductDetails.generateImageName(ProductDetails.mainSizeString, viewId) +'" onerror="this.onerror=\'\';this.src=\'' + wcs.globalImagePath + 'images/unavailable_350.png\'" ></li>').appendTo($('.images',me)));
				$('.thumbs > li').eq(nonClonedThumbnailIndex).data('image').find("img").attr("alt",ProductDetails.shortDescription);
			}
		}
		$('.thumbs > li', me).click(function() { me.setImage($(this).find('.viewIdDiv').html()*1); return false; });
		$('#modal-zoom', me).dialog(modals.imageZoom);
		$('.zoom-link').click(function(){ $('#modal-zoom').dialog('open').bind('dialogbeforeclose', 
				function(e,ui){
					rfxZoomReset();
					return true;
					});
				$('#modal-zoom').focus();
			});
		});
	
	
});


// see if any zoomable images exist. List might not be in the sorted order
//based on image ID, so will compare to see if it is the lowest number found
ProductDetails.imageList = swatchData[ProductDetails.imageBaseName];

ProductDetails.generateImageName = 
	function(size, viewId)
	{
	
	var inStock = true;
	if($('.out-of-stock oos-overlay'))
		inStock = false;
	
	if(!inStock && size == '350')
		size = 'oos350';
			
	return ProductDetails.imageNameTemplate.replace(ProductDetails.sizePlaceholderString,size).replace(ProductDetails.viewIdPlaceholderString, viewId);
	
	}
