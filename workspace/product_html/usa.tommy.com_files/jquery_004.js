(function($)
{
	$.fn.colorSwatchImage=function()
	{
		return this.each(function()
		{
			var $this=$(this);
			var $parent=$this.parent();
			
			var error=function()
			{
				$parent.children('.no-image-swatch').remove();
				$parent.prepend('<div class="no-image-swatch"/>');
				THUtil.fadeIn($parent);
				$this.addClass('invisible');
			};
			
			var src=$this.data('src');
			if(src!=undefined)
			{
				if(THUtil.isTouch())
				{
					src=src.replace(/(wid|hei)=\d+/gi,'$1=40');
					$this.attr('src',src);
				}
				
				$this
				.load(function()
				{
					THUtil.fadeIn($parent);
				})
				.error(error);
				
				setTimeout(function()
				{
					$this.attr('src',src);
				},0);
			} else error();
		});
	};
})(jQuery);
