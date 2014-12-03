(function($)
{
	$.fn.productImage=function()
	{
		var transparentImageURL=THUtil.getTransparentPDPImageURL();
		
		return this.each(function()
		{
			var $img=$(this);
			$img.unbind('load error');
			$img.parent().removeClass('no-image');
			
			$img.bind('cloudzoom_ready',function()
			{
				if($img.attr('src')!=transparentImageURL) $img.parent().removeClass('no-image');
			});
			
			var src=$img.data('src');
			var error=function()
			{
				if($img.attr('src')!=transparentImageURL)
				{
					$img.parent().addClass('no-image');
					$img.attr('src',transparentImageURL);
				} else $img.unbind('error');
			};
			
			$img.load(function()
			{
				$img.unbind('load error');
				if($img.attr('src')!=transparentImageURL)
				{
					$img.parent().removeClass('no-image');
					$img.add($('.cloudzoom-gallery')).CloudZoom();
				}
			}).error(error);
			
			if(THUtil.isNotNull(src))
			{
				setTimeout(function()
				{
					$img.attr('src',THUtil.updateImageSrcForPDP(src));
				},0);
			} else error();
		});
	};
})(jQuery);
