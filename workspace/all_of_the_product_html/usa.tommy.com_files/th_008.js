var THUtil = THUtil ||
{
	init:function()
	{
		var isHome=TH.$body.hasClass('HOME');
		THUtil._build=$.trim(TH.$body.data('build'));
		THUtil._isOutlet=TH.$body.hasClass('outlet');
		THUtil._isMobile=TH.$body.hasClass('mobile');
		THUtil._isTablet=isTablet;
		THUtil._isHomepage=TH.$body.hasClass('homepage');
		THUtil._isDepartmentPage=TH.$body.hasClass('departmentPage');
		THUtil._isCategoryPage=TH.$body.hasClass('categoryPage');
		THUtil._isSearchPage=TH.$body.hasClass('searchPage');
		THUtil._isSearchResultsPage=TH.$body.hasClass('searchResultsPage');
		THUtil._isProductPage=TH.$body.hasClass('productPage');
		THUtil._isBundlePage=TH.$body.hasClass('bundlePage');
		THUtil._isHomeBundlePage=THUtil._isBundlePage && isHome;
		THUtil._isLookbookPage=THUtil._isBundlePage && !isHome;
		THUtil._isShoppingBagPage=TH.$body.hasClass('shoppingBagPage');
		THUtil._isCheckout=TH.$body.hasClass('orderShippingBillingPage');
		THUtil._isIE8=TH.$html.hasClass('dj_ie8');
		THUtil._transparentImageURL=join(THUtil.getAkamaiPath(),'transparent_',THUtil.IMAGE_WIDTH,'x',THUtil.IMAGE_HEIGHT,'.gif');
		THUtil._transparentPDPImageURL=join(THUtil.getAkamaiPath(),'transparent_',THUtil.PDP_WIDTH_HEIGHT,'x',THUtil.PDP_WIDTH_HEIGHT,'.gif');
	},
	
	finalize:function()
	{
        THUtil.setupDropKick();
	},
	
	setupGrid:function()
	{
		THUtil.setupDropKick();
		if(THUtil.isCategoryPage() || THUtil.isSearchPage()) THProductCell.refinalize();
		
		setTimeout(function()
		{
			if(TH.$window.scrollTop()!=1) TH.$window.scrollTop(1);
		},0);
	},
	
	setupDropKick:function()
	{
		if(THUtil.isCategoryPage() || THUtil.isSearchPage() || THUtil.isProductPage() || THUtil.isBundlePage()) $('select').dropkick();
	},
	
	/* GET FUNCTIONS */
	getStorePath:function()
	{
		return '/webapp/wcs/stores/servlet/en/thb2cus/';
	},
	
	getStorePathForSecureURL:function()
	{
		return '/webapp/wcs/stores/servlet/';
	},

	
	getStoreId:function()
	{
		return storeId;
	},
	
	getBuild:function()
	{
		return THUtil._build;
	},
	
	getQSVars:function()
	{
		return $.getQSVars();
	},
	
	getQSVar:function(name)
	{
		return $.getQSVar(name);
	},
	
	getCookie:function(name)
	{
		return $.cookie(name);
	},
	
	getAkamaiPath:function()
	{
		return thAkamaiPath;
	},
	
	getESpot:function(emsName,callback)
	{
		var url=join('/webapp/wcs/stores/servlet/EspotOverlayView?storeId=',THUtil.getStoreId(),'&emsName=',emsName);
		$.get(url,callback);
	},
	
	getTransparentImageURL:function()
	{
		return THUtil._transparentImageURL;
	},
	
	getTransparentPDPImageURL:function()
	{
		return THUtil._transparentPDPImageURL;
	},
	
	getAutoHeight:function($elem)
	{
		var initDisplay=$elem.css('display');
		if(initDisplay=='none') $elem.css('display','block');
		
		var initHeight=$elem.height();
		var autoHeight=$elem.height('auto').height();
		if(initHeight!=autoHeight) $elem.height(initHeight);
		if(initDisplay=='none') $elem.css('display','none');
		
		return autoHeight;
	},

	/* IS FUNCTIONS */
	isNull:function(val)
	{
		return val=='' || val==null;
	},
	
	isNotNull:function(val)
	{
		return !THUtil.isNull(val);
	},
	
	isOutlet:function()
	{
		return THUtil._isOutlet;
	},
	
	isFull:function()
	{
		return !THUtil._isOutlet;
	},

	isHomepage:function()
	{
		return THUtil._isHomepage;
	},
	
	isDepartmentPage:function()
	{
		return THUtil._isDepartmentPage;
	},
	
	isCategoryPage:function()
	{
		return THUtil._isCategoryPage;
	},
	
	isSearchPage:function()
	{
		return THUtil._isSearchPage;
	},
	
	isSearchResultsPage:function()
	{
		return THUtil._isSearchResultsPage;
	},
	
	isProductPage:function()
	{
		return THUtil._isProductPage;
	},
	
	isBundlePage:function()
	{
		return THUtil._isBundlePage;
	},
	
	isHomeBundlePage:function()
	{
		return THUtil._isHomeBundlePage;
	},
	
	isLookbookPage:function()
	{
		return THUtil._isLookbookPage;
	},
	
	isShoppingBagPage:function()
	{
		return THUtil._isShoppingBagPage;
	},
	
	isCheckout:function()
	{
		return THUtil._isCheckout;
	},
	
	isIE8:function()
	{
		return THUtil._isIE8;
	},
	
	isBuild:function(major,minor)
	{
		if(isNaN(major) || isNaN(minor)) console.error('THUtil.isBuild requires both major and minor parameters');
		else return new RegExp('^THCK-RC'+major+'-'+minor+'$').test(THUtil._build);
	},

	isMobile:function()
	{
		return THUtil._isMobile;
	},
	
	isTouch:function()
	{
		return THUtil.isMobile() || THUtil._isTablet;
	},
	
	isAncestorOf:function($target,$ancestor)
	{
		return $target.closest($ancestor).length>0;
	},
	
	/* ANIMATION FUNCTIONS */
    scrollTo:function(scrollTop,duration,$target,syncToExpandCollapse)
    {
		if(THUtil.isNull(duration) || isNaN(duration)) duration=.75;
		if(syncToExpandCollapse) duration=THUtil._EXPAND_COLLAPSE_DURATION;
		else var ease=Power3.easeIn;
        return TweenLite.to($target ? $target : [TH.$html,TH.$body],duration,{scrollTop:scrollTop,ease:ease});
    },

    fadeIn:function(elem,delay)
    {
    	return TweenLite.to(elem,.35,{autoAlpha:1,delay:delay,overwrite:true,ease:Sine.easeIn});
    },
    
    fadeOut:function(elem,onComplete)
    {
    	return TweenLite.to(elem,.35,{autoAlpha:0,overwrite:true,onComplete:onComplete,ease:Sine.easeIn});
    },
    
    expand:function($elem)
	{
		$elem.css({display:'block'});
		TweenLite.to($elem,THUtil._EXPAND_COLLAPSE_DURATION,{autoAlpha:1,height:THUtil.getAutoHeight($elem),onComplete:function()
		{
			$elem.height('auto');
		}});
	},

	collapse:function($elem)
	{
		TweenLite.to($elem,THUtil._EXPAND_COLLAPSE_DURATION,{autoAlpha:0,height:0,onComplete:function() { $elem.css({display:'none'}); }});
	},
    
    /* HELPER FUNCTIONS */
    loadSizeGuide:function(masterCatalogIdentifier,$target)
    {
    	var tween=THUtil.fadeOut($target);
    	var emsName=join(masterCatalogIdentifier,'_size_guide',THUtil.isOutlet() ? '_outlet' : '');
    	THUtil.getESpot(emsName,function(data)
    	{
    		if(tween.totalProgress()==1)
    		{
    			$target.html(data);
    			THUtil.fadeIn($target);
    		} else
    		{
    			tween.eventCallback('onComplete',function()
    			{
    				$target.html(data);
    				THUtil.fadeIn($target);
    			});
    		}
    	})
    },
    
    queryParam: function (uri, key, value) {
		var re, separator;
		if(value == undefined){
			return decodeURIComponent(
					(RegExp('[?|&]' + key + '=(.+?)(&|$)').exec(uri)||[null,null])[1]
			);
		} else {
			re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i"),
			value = encodeURIComponent(value);
			separator = uri.indexOf('?') !== -1 ? "&" : "?";
			if (uri.match(re)) {
				return uri.replace(re, '$1' + key + "=" + value + '$2');
			}
			else {
				return uri + separator + key + "=" + value;
			}
		}
	},
	
	decodeAmps:function(url)
	{
		return url ? url.replace(/&amp;/gi,'&') : null;
	},
	
	updateImageSrcForGrid:function(src)
	{
		return THUtil.updateImageSrc(src,THUtil.IMAGE_WIDTH,THUtil.IMAGE_HEIGHT);
	},
	
	updateImageSrcForPDP:function(src)
	{
		return THUtil.isLookbookPage() ? THUtil.updateImageSrc(src,THUtil.LOOKBOOK_WIDTH) : THUtil.updateImageSrc(src,THUtil.PDP_WIDTH_HEIGHT,THUtil.PDP_WIDTH_HEIGHT);
	},
	
	updateImageSrc:function(src,wid,hei)
	{
		return src ? src.replace(/wid=\d+&/,wid ? join('wid=',wid,'&') : '').replace(/hei=\d+&/,hei ? join('hei=',hei,'&') : '') : null;
	},
	
	updateCloudZoomData:function(url,zoomImageData)
	{
		if(url==null) return null;
		else
		{
			if(url.match(/zoomImage/)) return url.replace(/(^.*zoomImage\s*:\s*('|"))(.*?)(\2.*$)/,join('$1',zoomImageData,'$4'));
			else return join(url,", zoomImage:'",zoomImageData,"'")
		}
	},
	
	getCloudZoomURL:function(zoomImageData)
	{
		return zoomImageData ? zoomImageData.replace(/(^.*zoomImage\s*:\s*('|"))(.*?)(\2.*$)/,'$3') : null;
	},
	
	loadImages:function($img,dataVar)
    {
		if(THUtil.isNull(dataVar)) dataVar='src';
		
    	var transparentImageURL=THUtil.getTransparentImageURL();
    	$img.load(function()
		{
    		var $this=$(this);
    		$this.unbind('load error');
			if($this.attr('src')!=transparentImageURL) $this.parent().removeClass('no-image');
		}).error(function()
		{
			var $this=$(this);
			if(!$this.attr('src')!=transparentImageURL) $this.attr('src',transparentImageURL).parent().addClass('no-image');
			else $this.unbind('error');
		}).each(function()
		{
			var $this=$(this);
			setTimeout(function()
			{
				$this.attr('src',$this.data(dataVar));
			},0);
		});
    },
    
    enableScrolling:function()
    {
    	THUtil._disabledScrollLevel--;
    	if(THUtil._disabledScrollLevel==0)
    	{
    		if(THUtil.isTouch()) TH.$html.add(TH.$body).css({overflow:''});
    		else TH.$html.css({overflow:''});
        	TH.$window.scrollTop(THUtil._currentScrollTop);
    	}
    },

    disableScrolling:function()
    {
    	THUtil._disabledScrollLevel++;
    	if(THUtil._disabledScrollLevel==1)
    	{
    		THUtil._currentScrollTop=TH.$window.scrollTop();
        	if(THUtil.isTouch()) TH.$html.add(TH.$body).css({overflow:'hidden'});
    		else TH.$html.css({overflow:'hidden'});
    	}
    },
    
    polyfillIE8:function()
	{
    	$('html.dj_ie8 *:last-child').addClass('last-child');
	},
    
    /* VARIABLES */
    _build:null,
    _isOutlet:false,
	_isMobile:false,
	_isTablet:false,
	_isHomepage:false,
	_isDepartmentPage:false,
	_isCategoryPage:false,
	_isSearchPage:false,
	_isSearchResultsPage:false,
	_isProductPage:false,
	_isBundlePage:false,
	_isHomeBundlePage:false,
	_isLookbookPage:false,
	_isShoppingBagPage:false,
	_isCheckout:false,
	_isIE8:false,
	_transparentImageURL:null,
	_transparentPDPImageURL:null,
	_currentScrollTop:0,
	_disabledScrollLevel:0,
	_EXPAND_COLLAPSE_DURATION:.4,
    TOMMY_RED:'#F00001',
    TOMMY_BLUE:'#081C2B',
    TRANSPARENT:'transparent',
    UNDEFINED:'undefined',
    ERROR:'error',
    IMAGE_WIDTH:218,
    IMAGE_HEIGHT:326,
    PDP_WIDTH_HEIGHT:530,
    LOOKBOOK_WIDTH:500,
    LOOKBOOK_ZOOM_HEIGHT:1500,
    BODY_BG_COLOR:'#FFF'
};
