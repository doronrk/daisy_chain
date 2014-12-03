(function($)
{
	//settings.$content - jQuery DOM element to add
	//settings.contentSelector - Selector of DOM element to add
	//settings.contentURL - URL to load
	//settings.emsName - eSpot name to load
	$.fn.overlay=function(settings,autoDestroy,onLoad,onClose)
	{
		var $this=this;
		
		var close=function()
		{
			if($getRequest) $getRequest.abort();
			TH.$window.unbind('resize.THOverlay',resize);
			
			if(autoDestroy) $content.remove();
			else
			{
				var $parent=$content.data('parent');
				if($parent && $parent.length) $content.appendTo($parent);
				$content.hide();
			}
			
			$thOverlay.remove();
			
			if(onClose instanceof Function) onClose();
		}
		
		var load=function($content)
		{
			$content.data('parent',$content.parent());
			$thOverlayContent.append($content);
			$content.show();
			
			$this.append($thOverlay);
			resize();
			
			if(onLoad instanceof Function) onLoad();
		}
		
		var resize=function()
		{
			$thOverlayContent.css('max-height',TH.$window.height()-(TH.$tabs.height()*2)-8);
		}
		
		var $thOverlay=$('<div class="thOverlay"><div class="thOverlayContainer"><div class="thOverlayContentWrapper"><div class="thOverlayCloseX"></div><div class="thOverlayContent"></div></div></div><div class="thOverlayBG"></div></div>');
		var $thOverlayContent=$thOverlay.find('.thOverlayContent');
		$thOverlay.find('.thOverlayCloseX, .thOverlayBG').click(close);
		TH.$window.bind('resize.THOverlay',resize);
		
		var $content=settings.$content;
		if(THUtil.isNotNull(settings.contentSelector)) $content=$(settings.contentSelector);
		if(THUtil.isNotNull($content)) load($content);
		else
		{
			if(THUtil.isNotNull(settings.contentUrl)) var url=settings.contentUrl;
			else if(THUtil.isNotNull(settings.emsName)) var url=join(THUtil.getStorePathForSecureURL(),'EspotOverlayView?storeId=',THUtil.getStoreId(),'&emsName=',settings.emsName);
			
			if(url)
			{
				var $getRequest=$.get(url,function(data)
				{
					$getRequest=null;
					$content=$(data);
					load($content);
				});
			} else console.debug('THOverlay - No content specified for the overlay.');
		}
		
		$thOverlay.data('close',close);
		return $thOverlay;
	};
})(jQuery);
