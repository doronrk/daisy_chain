var TH = TH ||
{
	/* construct methods should be used for look-ups, but NO actual work should be done */
    _construct:function()
    {
        TH.$window=$(window);
        TH.$doc=$(document);
        TH.$html=TH.$doc.children('html');
        TH.$body=TH.$html.children('body');
        TH.$outerContainer=TH.$body.children('#outerContainer');
        TH.$main=TH.$outerContainer.children('main');
        TH.$header=TH.$outerContainer.children('header');
        TH.$tabs=TH.$outerContainer.children('#headerTabs');
        TH.$footer=TH.$body.children('footer');

        if(typeof THHeader!=THUtil.UNDEFINED) THHeader.construct();
        if(typeof THStickyHeader!=THUtil.UNDEFINED) THStickyHeader.construct();
        if(typeof THMobileHeader!=THUtil.UNDEFINED) THMobileHeader.construct();
        if(typeof THSiteMessageBar!=THUtil.UNDEFINED) THSiteMessageBar.construct();
        if(typeof THFooter!=THUtil.UNDEFINED) THFooter.construct();
        if(typeof THAutoSuggest!=THUtil.UNDEFINED) THAutoSuggest.construct();
        if(typeof THMiniCart!=THUtil.UNDEFINED) THMiniCart.construct();
        if(typeof THNewsletter!=THUtil.UNDEFINED) THNewsletter.construct();
        if(typeof THDepartment!=THUtil.UNDEFINED) THDepartment.construct();
        if(typeof THProductCell!=THUtil.UNDEFINED) THProductCell.construct();
        if(typeof THProduct!=THUtil.UNDEFINED) THProduct.construct();
        if(typeof THBundle!=THUtil.UNDEFINED) THBundle.construct();
        if(typeof THSwatch!=THUtil.UNDEFINED) THSwatch.construct();
        if(typeof THFilter!=THUtil.UNDEFINED) THFilter.construct();
        if(typeof THPagination!=THUtil.UNDEFINED) THPagination.construct();
        if(typeof THCheckout!=THUtil.UNDEFINED) THCheckout.construct();
    },
    
    /* init methods should be used to perform calculations, add listeners, set variables, etc. */
    _init:function()
    {
    	TweenLite.defaultEase=Sine.easeOut;
    	
    	THUtil.init();
    	if(typeof THHeader!=THUtil.UNDEFINED) THHeader.init();
    	if(typeof THStickyHeader!=THUtil.UNDEFINED) THStickyHeader.init();
    	if(typeof THMobileHeader!=THUtil.UNDEFINED) THMobileHeader.init();
    	if(typeof THSiteMessageBar!=THUtil.UNDEFINED) THSiteMessageBar.init();
    	if(typeof THFooter!=THUtil.UNDEFINED) THFooter.init();
    	if(typeof THAutoSuggest!=THUtil.UNDEFINED) THAutoSuggest.init();
    	if(typeof THMiniCart!=THUtil.UNDEFINED) THMiniCart.init();
    	if(typeof THNewsletter!=THUtil.UNDEFINED) THNewsletter.init();
        if(typeof THDepartment!=THUtil.UNDEFINED) THDepartment.init();
        if(typeof THProductCell!=THUtil.UNDEFINED) THProductCell.init();
        if(typeof THSwatch!=THUtil.UNDEFINED) THSwatch.init();
        if(typeof THProduct!=THUtil.UNDEFINED)
        {
        	THProduct.init();
            if(typeof THFullscreen!=THUtil.UNDEFINED) THFullscreen.init(THProduct.$element);
        }
        if(typeof THBundle!=THUtil.UNDEFINED) THBundle.init();
        if(typeof THFilter!=THUtil.UNDEFINED) THFilter.init();
        if(typeof THPagination!=THUtil.UNDEFINED) THPagination.init();
        if(typeof THCheckout!=THUtil.UNDEFINED) THCheckout.init();
    },
    
    /* finalize methods should be used to position/resize elements and start animations */
    _finalize:function()
    {
    	THUtil.finalize();
    	if(typeof THHeader!=THUtil.UNDEFINED) THHeader.finalize();
    	if(typeof THStickyHeader!=THUtil.UNDEFINED) THStickyHeader.finalize();
    	if(typeof THMobileHeader!=THUtil.UNDEFINED) THMobileHeader.finalize();
    	if(typeof THFooter!=THUtil.UNDEFINED) THFooter.finalize();
    	if(typeof THMiniCart!=THUtil.UNDEFINED) THMiniCart.finalize();
    	if(typeof THNewsletter!=THUtil.UNDEFINED) THNewsletter.finalize();
        if(typeof THDepartment!=THUtil.UNDEFINED) THDepartment.finalize();
        if(typeof THProductCell!=THUtil.UNDEFINED) THProductCell.finalize();
        if(typeof THSwatch!=THUtil.UNDEFINED) THSwatch.finalize();
        if(typeof THProduct!=THUtil.UNDEFINED) THProduct.finalize();
        if(typeof THBundle!=THUtil.UNDEFINED) THBundle.finalize();
        if(typeof THFilter!=THUtil.UNDEFINED) THFilter.finalize();
        if(typeof THPagination!=THUtil.UNDEFINED) THPagination.finalize();
        if(typeof THCheckout!=THUtil.UNDEFINED) THCheckout.finalize();
        THUtil.polyfillIE8();
        TH.$body.addClass('ready');
    },
    
    $doc:null,
    $window:null,
    $html:null,
    $body:null,
    $outerContainer:null,
    $main:null,
    $header:null,
    $tabs:null,
    $footer:null
};

/* ALL th.objects should be constructed, initialized, and finalized by TH, so ready handlers that are added in eSpots/JSP are run after everything has been finalized. */
$(function()
{
    TH._construct();
    TH._init();
    TH._finalize();
});
