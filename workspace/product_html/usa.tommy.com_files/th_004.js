var THStickyHeader=THStickyHeader ||
{
    construct:function()
    {
        THStickyHeader.$element=$(THStickyHeader.SELECTOR);
    },

    init:function()
    {
        if(!THUtil.isCheckout()) TH.$window.scroll(THStickyHeader._position).resize(THStickyHeader._position);
    },

    finalize:function()
    {
    	if(!THUtil.isCheckout())
    	{
    		THStickyHeader.$logo=THStickyHeader.$element.find(THUtil.isOutlet() ? '.outlet.logo' : '.full.logo');
    		THStickyHeader.$logoImg=THStickyHeader.$logo.find('img');
        	THStickyHeader._initLogoImgHeight=THStickyHeader.$logoImg.height();
        	THStickyHeader._initPaddingTop=THStickyHeader.$element.css('padding-top');
        	THStickyHeader._initSiteMessageBarMarginTop=THSiteMessageBar.$element.css('margin-top');
        	THStickyHeader._initMiniCartTop=THMiniCart.$element.position().top;
        	if(THUtil.isDepartmentPage())
        	{
        		if(THUtil.isIE8()) THStickyHeader._initDeptBackgroundPosition=TH.$outerContainer.css('background-position-y');
        		else THStickyHeader._initDeptBackgroundPosition=TH.$outerContainer.css('background-position');
        	}
        	
            if(THStickyHeader._timeline && TH.$window.scrollTop()>0) THStickyHeader._timeline.totalProgress(1);
            else THStickyHeader._position();
    	}
    },
    
    _position:function()
    {
    	var $stickyHeader=THStickyHeader.$element;
    	var scrollTop=TH.$window.scrollTop();
        var logoHeight=THStickyHeader.$logoImg.height();
        if(scrollTop>0 && logoHeight==THStickyHeader._initLogoImgHeight)
        {
        	var isOutlet=THUtil.isOutlet();
            THStickyHeader._timeline=new TimelineLite({overwrite:true});
            THStickyHeader._timeline.to($stickyHeader,THStickyHeader._duration,{paddingTop:50},0);
            THStickyHeader._timeline.to(THStickyHeader.$logoImg,THStickyHeader._duration,{height:isOutlet ? 25 : 16},0);
            THStickyHeader._timeline.to(THSiteMessageBar.$element,THStickyHeader._duration,{marginTop:isOutlet ? 51 : 40,onUpdate:THStickyHeader._onUpdate},0);
            THStickyHeader._timeline.to(THMiniCart.$element,THStickyHeader._duration,{top:isOutlet ? 73 : 64},0);
            if(THUtil.isDepartmentPage())
            {
            	if(THUtil.isIE8()) THStickyHeader._timeline.to(TH.$outerContainer,THStickyHeader._duration,{backgroundPositionY:isOutlet ? 80 : 65},0);
            	else THStickyHeader._timeline.to(TH.$outerContainer,THStickyHeader._duration,{backgroundPosition:isOutlet ? '0 80px' : '0 65px'},0);
            }
            THStickyHeader._timeline.to($stickyHeader,THStickyHeader._duration,{borderBottomColor:THUtil.TOMMY_RED,onComplete:function()
            {
                THHeader.$element.css('border-bottom-color',THUtil.TRANSPARENT);
                THSiteMessageBar.pause();
            }},0);
        } else if(scrollTop==0 && logoHeight<THStickyHeader._initLogoImgHeight)
        {
            if(THStickyHeader._timeline) THStickyHeader._timeline.kill();
            TweenLite.to($stickyHeader,THStickyHeader._duration,{paddingTop:THStickyHeader._initPaddingTop});
            TweenLite.to(THStickyHeader.$logoImg,THStickyHeader._duration,{height:THStickyHeader._initLogoImgHeight});
            TweenLite.to(THSiteMessageBar.$element,THStickyHeader._duration,{marginTop:THStickyHeader._initSiteMessageBarMarginTop,onUpdate:THStickyHeader._onUpdate});
            TweenLite.to(THMiniCart.$element,THStickyHeader._duration,{top:THStickyHeader._initMiniCartTop});
            if(THUtil.isDepartmentPage())
            {
            	if(THUtil.isIE8()) TweenLite.to(TH.$outerContainer,THStickyHeader._duration,{backgroundPositionY:THStickyHeader._initDeptBackgroundPosition});
            	else TweenLite.to(TH.$outerContainer,THStickyHeader._duration,{backgroundPosition:THStickyHeader._initDeptBackgroundPosition});
            }

            $stickyHeader.css('border-bottom-color',THUtil.TRANSPARENT);
            THHeader.$element.css('border-bottom-color',THUtil.TOMMY_RED);
            THSiteMessageBar.restart();
        }
    },
    
    _onUpdate:function()
    {
    	var $cloudZoom=$('.cloudzoom-zoom-inside, .cloudzoom-blank');
    	if($cloudZoom.length) $cloudZoom.css({top:Math.ceil($('.product_image').offset().top)+1});
    },

    SELECTOR:'#stickyHeader',
    $element:null,
    $logo:null,
    $logoImg:null,
    _duration:.2,
    _timeline:null,
    _initLogoImgHeight:0,
    _initSiteMessageBarMarginTop:0,
    _initMiniCartTop:0,
    _initDeptBackgroundPosition:'0 0',
    _initPaddingTop:0,
};
