var THOverlay=THOverlay ||
{
	isOpen:function()
	{
		return THOverlay._overlays.length>0;
	},
	
	open:function(settings,autoDestroy,onLoad,onClose,keepOthersOpen)
	{
		if(keepOthersOpen!=true) THOverlay.close();
		if(settings)
		{
			var $overlay=TH.$body.overlay(settings,autoDestroy,onLoad,function()
			{
				THOverlay._overlays.splice(THOverlay._overlays.indexOf($overlay),1);
				if(!THOverlay.isOpen())
				{
					THUtil.enableScrolling();
					TH.$tabs.removeClass('overlay');
				}
				if(onClose instanceof Function) onClose();
			});
			
			if(!THOverlay.isOpen())
			{
				THUtil.disableScrolling();
				TH.$tabs.addClass('overlay');
			}
			THOverlay._overlays.push($overlay);
		} else console.debug('THOverlay - open was called without the required parameter.');
	},
	
	close:function()
	{
		var length=THOverlay._overlays.length;
		for(var i=0;i<length;i++)
		{
			THOverlay._overlays[i].data('close')();
		}
	},
	
	scrollTo:function(scrollTop)
	{
		var $overlay=THOverlay._overlays[THOverlay._overlays.length-1];
		if($overlay)
		{
			var $thOverlayContent=$overlay.find('.thOverlayContent');
			if($thOverlayContent.length) THUtil.scrollTo(scrollTop,null,$thOverlayContent);
		}
	},
	
	SELECTOR:'.thOverlay',
	_overlays:[]
};
