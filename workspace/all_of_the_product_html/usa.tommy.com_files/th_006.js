var THMiniCart=THMiniCart ||
{
    construct:function()
    {
		THMiniCart.$element=TH.$body.find(THMiniCart.SELECTOR);
    },
    
    init:function()
    {
    	var $miniCart=THMiniCart.$element.children('#mini_cart');
    	
    	THMiniCart._containerPadding=parseInt($miniCart.css('padding-left'))+parseInt($miniCart.css('padding-right'));
    	TH.$window.resize(THMiniCart.resize);
    	
    	if(THUtil.isTouch())
    	{
    		$('.shopping-bag').click(function(event)
			{
				if(THMiniCart.$element.css('visibility')=='hidden')
				{
					THMiniCart.$element.css({visibility:'inherit'});
					return false;
				} else THMiniCart.$element.css({visibility:''});
			}).bind('blur mouseleave',function() { THMiniCart.close(); });
    	}
    },
    
    finalize:function()
    {
    	THMiniCart.reverse();
    	THMiniCart.resize();
    	THMiniCart.loadImages();
    	//TODO: Also need to remove scrollLeft call, change .mini_cart_product to float left, and change the carousel container to position absolute
    	//THMiniCart.$element.find('.carousel').carousel(TH.$window,THMiniCart.PRODUCT_WRAPPER_SELECTOR,true);
    },
    
    refinalize:function()
    {
    	THMiniCart.finalize();
    },
    
    resize:function()
    {
    	var containerWidth=TH.$header.outerWidth();
		if(THMiniCart.$element.width()!=containerWidth) THMiniCart.$element.width(containerWidth);
		
		$prodWrapper=THMiniCart.$element.find(THMiniCart.PRODUCT_WRAPPER_SELECTOR);
		var $prod=$prodWrapper.children(THMiniCart.PRODUCT_SELECTOR);
		var width=$prod.length*$prod.outerWidth();
		var maxWidth=containerWidth-THMiniCart.$element.find('#mini_cart_summary').outerWidth()-THMiniCart._containerPadding;
		$prodWrapper.width(Math.max(width,maxWidth));
		
		THMiniCart.$element.find('#MiniShopCartAll').width(maxWidth).scrollLeft(100000);
    },
    
    reverse:function()
    {
    	$prodWrapper=THMiniCart.$element.find(THMiniCart.PRODUCT_WRAPPER_SELECTOR);
    	var $children=$prodWrapper.children(THMiniCart.PRODUCT_SELECTOR);
    	if($children.length>1) $prodWrapper.append($children.toArray().reverse());
    },
    
    loadImages:function()
    {
    	THUtil.loadImages(THMiniCart.$element.find('.productThumbnailImage'));
    },
    
    close:function()
    {
    	THMiniCart.$element.css({visibility:''});
    },
    
    SELECTOR:'#miniCartContainer',
    PRODUCT_WRAPPER_SELECTOR:'.mini_cart_product_wrapper',
    PRODUCT_SELECTOR:'.mini_cart_product',
    $productWrapper:null,
    _containerPadding:0
};
