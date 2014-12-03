var THFooter = THFooter ||
{
    construct:function()
    {
		THFooter.$element=TH.$footer;
		THFooter._$footerContainer=THFooter.$element.find(THFooter.FOOTER_CONTAINER_SELECTOR);
		THFooter._$backToTop=THFooter._$footerContainer.children(THFooter.BACK_TO_TOP_SELECTOR);
    },

    init:function()
    {
    	THFooter._exposedHeight=THFooter._$footerContainer.children('.exposed').height();
    	THFooter._heightOffset=THFooter._$footerContainer.height()-THFooter._exposedHeight;
		TH.$window.scroll(THFooter._position).resize(THFooter._position);
    },
    
    finalize:function()
    {
    	if(THFooter._$backToTop.length && THFooter._finalizeBackToTop()) THFooter._fadeInOutBackToTop();
    	THFooter._position();
    },
    
	_finalizeBackToTop:function()
	{
		if(THUtil.isHomepage() || THUtil.isCategoryPage() || THUtil.isSearchPage() || THUtil.isBundlePage() || THUtil.isProductPage())
		{
			TH.$window.scroll(THFooter._fadeInOutBackToTop).resize(THFooter._fadeInOutBackToTop);
			THFooter._$backToTop.data(THFooter._DATA_FADED_IN,false);
			
			THFooter._$backToTop.click(function()
			{
				THUtil.scrollTo(0,.5);
		    });
			
			return true;
		} else
		{
			THFooter._$backToTop.addClass('hidden');
			return false;
		}
	},
	
    _position:function()
	{
		if(THFooter.$element.position().top>=TH.$window.scrollTop()+TH.$window.height()-THFooter._exposedHeight)
		{
			if(THFooter._$footerContainer.css('position')!='fixed') THFooter._$footerContainer.css({bottom:-THFooter._heightOffset,position:'fixed'});
		} else if(THFooter._$footerContainer.css('position')!='relative') THFooter._$footerContainer.css({bottom:'',position:''});
	},
	
	_fadeInOutBackToTop:function()
	{
		var scrollTop=TH.$window.scrollTop();
		if(scrollTop>THFooter._scrollTopToShowHideBackToTop)
		{
			if(THFooter._$backToTop.data(THFooter._DATA_FADED_IN)==false)
			{
				THFooter._$backToTop.data(THFooter._DATA_FADED_IN,true);
				THUtil.fadeIn(THFooter._$backToTop);
			}
		} else if(THFooter._$backToTop.data(THFooter._DATA_FADED_IN))
		{
			THFooter._$backToTop.data(THFooter._DATA_FADED_IN,false);
			THUtil.fadeOut(THFooter._$backToTop);
		}
	},
	
    FOOTER_CONTAINER_SELECTOR:'#footerContainer',
    BACK_TO_TOP_SELECTOR:'#backToTop',
    $element:null,
    _$footerContainer:null,
    _$backToTop:null,
    _DATA_FADED_IN:'faded-in',
    _heightOffset:0,
    _exposedHeight:0,
    _scrollTopToShowHideBackToTop:1
}
