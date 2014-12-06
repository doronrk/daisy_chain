/**
 * @Author Aatif Farooq
 * @AuthorEmail se_aatif@yahoo.com
 * @AuthorURL http://AatifSoft.com/
 * @Copyright 2013
 *
 * @Dependancy jQuery
 * @Description A plugin to open info popup on hover.
 */
(function($){$.fn.infopopup=function(settings){var defaults={'popup_selector':'.popup','hide_interval':200,'adjustment':{top:60,left:-13,right:-14},};var $s=$.extend(defaults,settings);$($s.popup_selector).hide();if($('#info-popup').length<=0){var $info_popup=$('<div/>',{'id':'info-popup','style':'position: absolute; z-index: 999; display: none;'}).appendTo('body');$info_popup.hover(function(){$info_popup.data('hover',true);},function(){$info_popup.data('hover',false);hide_popup();});}else{var $info_popup=$('#info-popup');}$(this).hover(function(e){var cHover=$(this),cPopup=$(this).find($s.popup_selector),c_pos=cHover.offset();$info_popup.data('hover',true);$info_popup.html($(cPopup).clone(true).show());var popup_pos={left:c_pos.left+(cHover).outerWidth()+$s.adjustment.left,top:c_pos.top-((cHover).outerHeight()/2)+$s.adjustment.top};if(c_pos.left+$info_popup.outerWidth()+30>$(document).width()){popup_pos.left=c_pos.left-$info_popup.width()-$s.adjustment.right;$info_popup.find($s.popup_selector).addClass('left-aligned');}$info_popup.css(popup_pos).delay('1200').fadeIn('fast');},function(e){$info_popup.data('hover',false);hide_popup();}).click(function(e){e.preventDefault();$info_popup.data('hover',false);hide_popup();});function hide_popup(){clearTimeout($s.hide_timeout_id);$s.hide_timeout_id=setTimeout(function(){if(!$info_popup.data('hover'))$info_popup.fadeOut('fast');},$s.hide_interval);}}})(jQuery);