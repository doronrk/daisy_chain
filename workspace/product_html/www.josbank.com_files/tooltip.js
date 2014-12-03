jQuery.fn.toolTip= function()
{
	return this.each(
		function()
		{
			var $target = jQuery(this);
			var $tt = jQuery(this).next('.tool_tip');
			//just in case it can't be right next to target
			if($tt.length==0){
				$tt = jQuery(this).closest('div').find('.tool_tip');
			}
			var $arrow = $tt.find('.arrow').eq(0);
			if ($tt.length > 0) {
				init();
			}
			
			var hideHoverTimer;
			var showHoverTimer;
			
			
			function init(){
					if($().bgiframe){$tt.bgiframe();}
					if ($target.hasClass('tt_hover')) {
						$target.bind("mouseenter", me_Hover);
						$target.bind("mouseleave", ml_Hover);
						$tt.bind("mouseenter", me_Hover);
						$tt.bind("mouseleave", ml_Hover);
					}
					if ($target.hasClass('tt_focus')) {
						$target.bind("focus", showHover);
						$target.bind("blur", hideHover);
					}
					if ($target.hasClass('tp_focus')) {
						$target.bind("mouseenter", me_Hover);
						$target.bind("mouseleave", ml_Hover);
						$tt.bind("mouseenter", me_Hover);
						$tt.bind("mouseleave", ml_Hover);
					}
			}
			
			function showHover(){
				var targPos = $target.position();
				var targHeight = $target.height();
				var targWidth = $target.outerWidth();
				var arrowWidth = $arrow.width();
				var arrowHeight = $arrow.height();
				var tipWidth = $tt.width();
				var tipHeight = $tt.height();
				
				var arrTop;
				var Top =  targPos.top;
				var Left = targPos.left;
				Left += targWidth + arrowWidth;
				
				var posHalf = $target.offset().top + (targHeight/2) + (tipHeight/2);
				var winBot = $(window).height() + $(document).scrollTop();
				
				//determine if tip will go below fold if centered vertically with target
				if(posHalf > winBot){// goes below fold - bottom align
					Top += -tipHeight + targHeight + arrowHeight;
					arrTop = tipHeight - targHeight - (arrowHeight/2);
				}
				else{//shouldn't go below fold if centered vertically
					Top += -(tipHeight/2) + (targHeight/2);
					arrTop = (tipHeight/2) - (arrowHeight/2);
				}
				
				$arrow.css('top', arrTop);
				$tt.css('left', Left).css('top', Top).show();
			}
			
			function hideHover(){
				$tt.css('left', -99999);
			}
			
			function me_Hover(){
				clearTimeout(hideHoverTimer);
				clearTimeout(showHoverTimer);
				showHoverTimer = setTimeout(function(){
					showHover();
				}, 200);
			}
			
			function ml_Hover(){
				clearTimeout(showHoverTimer);
				clearTimeout(hideHoverTimer);
			    hideHoverTimer = setTimeout(function(){
			        hideHover();
			    }, 200);
			}				
		}
	)
};


$().ready(function(){
		$('.tt_hover, .tt_focus,.tp_focus').toolTip();
});

