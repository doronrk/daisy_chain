(function($)
{
	//Element needs .next and .prev controls
	//containerSelector must be absolutely positioned
	$.fn.carousel=function($window,containerSelector,setParentHeight)
	{
		if(!arguments.length) throw new Error('$.fn.carousel(containerSelector) - containerSelector parameter is required');
		return this.each(function()
		{
			var $this=$(this);
			var $container=$this.find(containerSelector);
			var $slide=$container.children();
			var $next=$this.find('.next');
			var $prev=$this.find('.prev');
			var numSlides=$slide.length;
			var currentIndex=1;
			var numColumns=4;
			var DISBLED_CLASS='disabled';
			var easing=Strong.easeOut;
			var duration=1.75;
			
			if($container.css('position')!='absolute') throw new Error('$.fn.carousel(containerSelector) - containerSelector must be absolutely positioned');
			
			var getLeftPosition=function()
			{
				return -$($slide[currentIndex-1]).position().left;
			};
			
			var resize=function()
			{
				//$container.css('left',getLeftPosition());
			};
			
			var moveHome=function()
			{
				onBeginningReached();
				currentIndex=1;
				resize();
			};
			
			var moveNext=function()
			{
				if(currentIndex==1) onBeginningLeft();
				
				if(currentIndex+numColumns<=numSlides)
				{
					currentIndex+=numColumns;
					TweenLite.to($container,duration,{left:getLeftPosition(),ease:easing});
					
					if(currentIndex>numSlides-numColumns) onEndReached();
				}
			};
			
			var movePrev=function()
			{
				if(currentIndex>numSlides-numColumns) onEndLeft();
				
				if(currentIndex-numColumns>0)
				{
					currentIndex-=numColumns;
					TweenLite.to($container,duration,{left:getLeftPosition(),ease:easing});
					
					if(currentIndex==1) onBeginningReached();
				}
			};
			
			var onBeginningReached=function()
			{
				$prev.addClass(DISBLED_CLASS);
				$prev.unbind('click');
			};

			var onBeginningLeft=function()
			{
				$prev.removeClass(DISBLED_CLASS);
				$prev.click(movePrev);
			};
			
			var onEndReached=function()
			{
				$next.addClass(DISBLED_CLASS);
				$next.unbind('click');
			};
			
			var onEndLeft=function()
			{
				$next.removeClass(DISBLED_CLASS);
				$next.click(moveNext);
			};
			
			if(setParentHeight)
			{
				var maxHeight=0;
				$slide.each(function()
				{
					maxHeight=Math.max(maxHeight,$(this).outerHeight());
				});
				$container.parent().height(maxHeight);
			}
			
			$window.resize(resize);
			$prev.click(movePrev);
			$next.click(moveNext);
			
			moveHome();
		});
	};
})(jQuery);
