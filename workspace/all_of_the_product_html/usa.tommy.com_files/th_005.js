var THHeader=THHeader ||
{
    construct:function()
    {
		THHeader.$element=TH.$header;
		THHeader.$dropDown=TH.$body.find(THHeader.DROP_DOWN_SELECTOR);
		THHeader.$headerNavWrapper=THHeader.$element.find(THHeader.HEADER_NAV_WRAPPER_SELECTOR);
		THHeader.$nav=THHeader.$headerNavWrapper.children(THHeader.NAV_SELECTOR);
    },
    
    init:function()
    {
    	TH.$window.resize(THHeader._resize);
    	
    	if(THUtil.isTouch())
    	{
    		THHeader.$element.find(THHeader.NAV_ITEM_SELECTOR).click(function(event)
			{
    			var $this=$(this);
				if(!$this.hasClass(THHeader.VISIBLE_CLASS))
				{
					$this.addClass(THHeader.VISIBLE_CLASS);
					THMiniCart.close();
					return false;
				} else $this.removeClass(THHeader.VISIBLE_CLASS);
			}).bind('blur mouseleave',function() {  $(this).removeClass(THHeader.VISIBLE_CLASS); });
    	} else
    	{
    		THHeader.$headerNavWrapper.mouseleave(function()
	    	{
	    		THHeader.$headerNavWrapper.data(THHeader._DATA_IS_MOUSE_OVER,null);
	    	});
	    	
	    	THHeader.$element.find(THHeader.NAV_ITEM_SELECTOR).hover(function()
	    	{
	    		var $this=$(this);
	    		var show=function()
	    		{
	    			$this.addClass(THHeader.VISIBLE_CLASS);
	    			$this.data(THHeader._DATA_TIMEOUT_ID,null);
	    			THMiniCart.close();
	    		}
	    		
	    		if(THHeader.$headerNavWrapper.data(THHeader._DATA_IS_MOUSE_OVER)==true) show();
	    		else
	    		{
	    			$this.data(THHeader._DATA_TIMEOUT_ID,setTimeout(function()
		    		{
		    			show();
		    			THHeader.$headerNavWrapper.data(THHeader._DATA_IS_MOUSE_OVER,true);
		    		},200));
	    		}
	    	},function()
	    	{
	    		var $this=$(this);
	    		$this.removeClass(THHeader.VISIBLE_CLASS);
	    		var timeoutId=$this.data(THHeader._DATA_TIMEOUT_ID);
	    		if(timeoutId)
	    		{
	    			clearTimeout(timeoutId);
	    			$this.data(THHeader._DATA_TIMEOUT_ID,null);
	    		}
	    	});
    	}
    },
    
    finalize:function()
    {
    	var $dropDown=THHeader.$nav.find(THHeader.DROP_DOWN_SELECTOR);
    	var $menu=$dropDown.find(THHeader.MENU_SELECTOR);
    	$menu.filter(function(){ return $(this).children().length==0; }).remove();
    	$dropDown.filter(function(){ return $(this).find(THHeader.MENU_SELECTOR).length==0; }).remove();
    	
    	var href=$('nav .selectedCategory').attr('href');
    	if(href) $menu.find(join('[href="',href,'"]')).addClass('selectedCategory');
    	
    	THHeader._resize();
    },
    
    _resize:function()
    {
    	var containerWidth=THHeader.$element.outerWidth();
		var left=-THHeader.$nav.position().left-THHeader.$headerNavWrapper.position().left;
		
		THHeader.$nav.find(THHeader.DROP_DOWN_SELECTOR).each(function()
		{
			var $dropDown=$(this);
			if($dropDown.width()!=containerWidth) $dropDown.width(containerWidth);
			$dropDown.css({left:left-$dropDown.parent().position().left});
			
			var $megaMenu=$dropDown.find(THHeader.MENU_SELECTOR);
			$megaMenu.height('auto');
			var $parent=$megaMenu.parent();
			$parent.width(10000);
			var maxHeight=$parent.height();
			$parent.css({width:''});
			$megaMenu.height(maxHeight);
		});
    },
    
    NAV_ITEM_SELECTOR:'.globalNavItem',
    DROP_DOWN_SELECTOR:'.dropDown',
    HEADER_NAV_WRAPPER_SELECTOR:'#headerNavWrapper',
    MENU_SELECTOR:'.mega-menu',
    NAV_SELECTOR:'nav',
    VISIBLE_CLASS:'visible',
    _DATA_TIMEOUT_ID:'timeout-id',
    _DATA_IS_MOUSE_OVER:'is-mouse-over',
    $element:null,
    $headerNavWrapper:null,
    $nav:null
};
