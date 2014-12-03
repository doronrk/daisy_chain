// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: true,
      getWidthFrom: '.mainLayoutTable',
      responsiveWidth: false
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;
        // Resetting
        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css('position', '') 
			  .css('background','url("/images/delias/en_us/global/globalgraphics/bg_topnav.gif") repeat-x fixed top')
			  .css('z-index','2000')  //.css('width','990px')			  
              .css('top', '');
            s.stickyElement.trigger('sticky-end', [s]).parent().removeClass(s.className);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
		  // Moving
          if (s.currentTop != newTop) {
            s.stickyElement
              .css('position', 'fixed')			  
			  .css('z-index','2000') //.css('width','990px')
			  .css('background','url("/images/delias/en_us/global/globalgraphics/bg_topnav-reduced.gif") repeat-x top')
			  .css('top', newTop);

            if (typeof s.getWidthFrom !== 'undefined') {
              s.stickyElement.css('width', $(s.getWidthFrom).width());
            }

            s.stickyElement.trigger('sticky-start', [s]).parent().addClass(s.className);
            s.currentTop = newTop;
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i];
        if (typeof s.getWidthFrom !== 'undefined' && s.responsiveWidth === true) {
          s.stickyElement.css('width', $(s.getWidthFrom).width());
        }
      }
    },
    methods = {
      init: function(options) {
        var o = $.extend({}, defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName 
          var wrapper = $('<div></div>')
            .attr('id', stickyId + '-sticky-wrapper')
            .addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);

          if (o.center) {
            stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css('height', stickyElement.outerHeight()+5);
          sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom,
            responsiveWidth: o.responsiveWidth
          });
        });
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var unstickyElement = $(this);

          var removeIdx = -1;
          for (var i = 0; i < sticked.length; i++)
          {
            if (sticked[i].stickyElement.get(0) == unstickyElement.get(0))
            {
                removeIdx = i;
            }
          }
          if(removeIdx != -1)
          {
            sticked.splice(removeIdx,1);
            unstickyElement.unwrap();
            unstickyElement.removeAttr('style');
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }

  };
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);


function reduceStickyBar(reduce) {

			if (reduce) {
			
			    jQuery("#headerWrapper").css('background','#fff');
		
		       	jQuery("#topNav .centerBar .topNavSearch").css('top','14px');								
				jQuery("#topNav .centerBar .topNavSearch").css('-webkit-transition','top 0.1s');
				jQuery("#topNav .centerBar .topNavSearch").css('-webkit-transition','top 0.1s');
				jQuery("#topNav .centerBar .topNavSearch").css('transition','top 0.1s');
					
				jQuery("#topNav .centerBar .topNavBag").css('top','14px');
				jQuery("#topNav .centerBar .topNavBag").css('-webkit-transition','top 0.1s');
				jQuery("#topNav .centerBar .topNavBag").css('transition','top 0.1s');
				
				jQuery("#topNav .centerBar .topNavLogo").css('top','11px');				
				jQuery("#topNav .centerBar .topNavLogo").css('margin','0 0 0 40px');								
				jQuery("#topNav .centerBar").css('padding','0 0 3px');
								
				jQuery("#logo").css('width','96px');
				jQuery("#logo").css('height','28px');						
				jQuery("#logo").attr('src','/images/delias/en_us/global/globalnav/logo_main_small.gif');		
				jQuery("#logo").css('-webkit-transition','height 0.1s');
				jQuery("#logo").css('transition','height 0.1s');
				jQuery("#logo").css('-webkit-transition','width 0.1s');
				jQuery("#logo").css('transition','width 0.1s');
														
				jQuery(".navHeader").html('');
				
				jQuery("body.main").css('background','url("/images/delias/en_us/global/globalgraphics/bg_topnav-reduced.gif") repeat-x fixed top');			
				jQuery("#headerWrapper").css('background','url("/images/delias/en_us/global/globalgraphics/bg_topnav-reduced.gif") repeat-x top');
				
			} else {
			    jQuery("#topNav .centerBar .topNavSearch").css('top','32px');
				jQuery("#topNav .centerBar .topNavSearch").css('-webkit-transition','top 0.1s');
				jQuery("#topNav .centerBar .topNavSearch").css('transition','top 0.1s');
				
				jQuery("#topNav .centerBar .topNavBag").css('top','35px');
				jQuery("#topNav .centerBar .topNavBag").css('-webkit-transition','top 0.1s');
				jQuery("#topNav .centerBar .topNavBag").css('transition','top 0.1s');
				
				jQuery("#topNav .centerBar .topNavLogo").css('top','17px');
				jQuery("#topNav .centerBar .topNavLogo").css('-webkit-transition','top 0.1s');
				jQuery("#topNav .centerBar .topNavLogo").css('transition','top 0.1s');
				
				jQuery("#topNav .centerBar .topNavLogo").css('margin','0');				
				jQuery("#topNav .centerBar .topNavLogo").css('-webkit-transition','margin 0.1s');
				jQuery("#topNav .centerBar .topNavLogo").css('transition','margin 0.1s');
				
				jQuery("#topNav .centerBar").css('padding','15px 0 23px');
				jQuery("#topNav .centerBar").css('-webkit-transition','padding 0.1s');
				jQuery("#topNav .centerBar").css('transition','padding 0.1s');
								
				jQuery("#logo").css('width','185px');
				jQuery("#logo").css('height','52px');				
				jQuery("#logo").attr('src','/images/delias/en_us/global/globalnav/logo_main.gif');		
				
				jQuery("#logo").css('-webkit-transition','height 0.1s');
				jQuery("#logo").css('transition','height 0.1s');
				jQuery("#logo").css('-webkit-transition','width 0.1s');
				jQuery("#logo").css('transition','width 0.1s');
								
				jQuery(".navHeader").html('MY BAG');
                 
                jQuery('body.main').css('background','url("/images/delias/en_us/global/globalgraphics/bg_topnav.gif") repeat-x top');				 
				
				/*jQuery("img[name^='category:']").css('width','100%');
				jQuery("img[name^='category:']").css('height','100%');*/
			
			}
}

