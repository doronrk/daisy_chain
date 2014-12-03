var THProduct = THProduct ||
{
    construct:function() {},

    init:function()
    {
    	THProduct.addShareWishlistListeners();
    	
    	$('.sizeGuide[data-ems-name]').click(function()
    	{
    		THOverlay.open({emsName:$(this).data('ems-name')},true,null,null,true);
    	});
    },

    finalize:function()
    {
    	var transparentImageURL=THUtil.getTransparentPDPImageURL();
    	$.fn.CloudZoom.defaults.errorCallback=function(error)
    	{
    		var $img=error.$element;
    		if($img.attr('src')!=transparentImageURL)
			{
				$img.parent().addClass('no-image');
				$img.attr('src',transparentImageURL);
			}
    	};
    	
    	var $prodImage=$('#product .cloud-zoom[data-src]');
    	$prodImage.attr('data-cloudzoom',THUtil.updateImageSrc($prodImage.attr('data-cloudzoom'),null,THUtil.LOOKBOOK_ZOOM_HEIGHT));
    	$prodImage.productImage();
    	THProduct.setupDescription();
    },
    
    addShareWishlistListeners:function()
    {
    	if(!THUtil.isMobile())
    	{
    		$('.share > a, #add2WishlistRight > a').unbind('click mouseenter mouseleave').hover(function()
	    	{
	    		var $img=$(this).children('img');
	    		var src=$img.attr('src');
	    		$img.attr('src',$img.data('hover-src')).data('src',src);
	    	},function()
	    	{
	    		var $img=$(this).children('img');
	    		var src=$img.attr('src');
	    		$img.attr('src',$img.data('src'));
	    	}).mouseleave();
    	}
    },
    
    removeWishlistListeners:function(productId)
    {
    	
    	var $wishlist=productId ? $('#productPageAdd2Wishlist_'+productId) : $('#add2WishlistRight > a');
		$wishlist.unbind('click mouseenter mouseleave');
		var $img=$wishlist.children('img');
		$img.attr('src',$img.data('added-src'));
    },
    
    setupDescription:function()
    {
    	if(!THUtil.isMobile())
    	{
    		var $itemDescriptionTrigger=$('.itemDescriptionTrigger');
        	$itemDescriptionTrigger.removeClass('hidden');
        	$itemDescriptionTrigger.text($itemDescriptionTrigger.data('more'));
        	
        	var $itemDescription=$('.itemDescription');
        	$itemDescription.removeClass('hidden');
    		$itemDescription.css('height','');
    		$itemDescription.data('is-open',false);
    		
        	if(THUtil.getAutoHeight($itemDescription)<=$itemDescription.height())
        	{
        		$itemDescriptionTrigger.addClass('hidden');
        		$itemDescription.height('auto');
        	} else
        	{
        		$itemDescriptionTrigger.unbind('click').click(function()
    			{
    	    		var duration=.25;
    	    		var $this=$(this);
    	    		var $itemDescription=$this.siblings('.itemDescription');
    				if($itemDescription.data('is-open'))
    				{
    					$itemDescription.data('is-open',false);
    					$this.text($this.data('more'));
    					var currentHeight=$itemDescription.height();
    					$itemDescription.css('height','');
    					cssHeight=$itemDescription.height();
    					$itemDescription.height(currentHeight);
    					TweenLite.to($itemDescription,duration,{height:cssHeight});
    				} else
    				{
    					$itemDescription.data('is-open',true);
    					$this.text($this.data('less'));
    					TweenLite.to($itemDescription,duration,{height:THUtil.getAutoHeight($itemDescription)});
    				}
    			});
        	}
    	}
    }
}
