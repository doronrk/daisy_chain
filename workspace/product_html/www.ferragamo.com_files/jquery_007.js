/*jslint browser: true*/
/*global $*/
/*global jQuery*/
"use strict";
function createCleanrowPlugin($) {
    $.cleanrow = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        // Add a reverse reference to the DOM object
        base.$el.data("cleanrow", base);
        //console.log("$el ",  base.$el);
        base.init = function () {
			
			BrowserDetect.init();
			base.browser = BrowserDetect.browser;
			base.browserversion = BrowserDetect.version;
		
            base.options = $.extend({}, $.cleanrow.defaultOptions, options);
            base.$el.attr('style','');
            if (base.$el.hasClass('cleanrow--case1')) {
                base.calculateMinHeightChildren_case1();
            } else if (base.$el.hasClass('cleanrow--case2')) {
                base.calculateMinHeightChildren_case2();
            } else if (base.$el.hasClass('cleanrow--case3')) {
                base.calculateMinHeightChildren_case3();
            } else if (base.$el.hasClass('cleanrow--case4')) {
                base.calculateMinHeightChildren_case4();
            } else {
                base.calculateMinHeightChildren();
            }
        };

        base.caption = function (height) {
            $("figcaption", base.el).each(function () {
                var h = $(this).outerHeight();
                //console.log($(this).html() + h);
                $(this).css({
                    "bottom": "auto",
                    "top": height - (h + base.options.spacer)
                });
            });
        };

        base.calculateMinHeightChildren = function () {
            var minHeight = 10000;
            $("> *", base.el).each(function () {
                var height;
                height = $(this).height();
                if ((height < minHeight) && (height!=0)) { // VANGOGH: aggiunto check sul valore zero 
                    minHeight = height;
                }
            });
            base.minHeight = minHeight;
            base.setRowHeight();

            // VANGOGH: Setta l'altezza delle "figure"
            $("> *", base.el).each(function(index) {
                $(this).height("100%").css({'overflow': 'hidden'});
            });

        };

        /*
         * 1 . 2 . 3+4 
         */
        base.calculateMinHeightChildren_case1 = function () {
            var minHeight = 10000, h_box_1 = 0;
            $("> *", base.el).each(function (index) {
                var height;
                switch (index) {
                case 2:
                    h_box_1 = $(this).outerHeight(true);
                    break;
                case 3:
                    h_box_1 = h_box_1 + base.getChildHeight(this);
                    height = h_box_1;
                    break;
                default:
                    height = base.getChildHeight(this);
                }

                if ((height < minHeight) && (height!=0)) { // VANGOGH: aggiunto check sul valore zero 
                    minHeight = height;
                }
            });
            base.minHeight = minHeight;
            base.setRowHeight();

            // VANGOGH: Setta l'altezza delle "figure"
            $("> *", base.el).each(function(index) {
                if ($(this).hasClass('frg13_top')) {
                    $(this).css( {'height': '50%', ' overflow': 'hidden'} );
                } else if ($(this).hasClass('frg13_bottom')) {
                    $(this).css( {'height': '50%','overflow': 'hidden'} ); 
                } else {
                    $(this).height("100%").css({'overflow': 'hidden'});
                }
            });

        };

        /*
         * 1 . 2 . 3+4 
         */
        base.calculateMinHeightChildren_case4 = function () {
            var minHeight = 10000, h_box_1 = 0;
            $("> *", base.el).each(function (index) {
                var height;
                switch (index) {
                case 0:
                    h_box_1 = $(this).outerHeight(true);
                    break;
                case 1:
                    h_box_1 = h_box_1 + base.getChildHeight(this);
                    height = h_box_1;
                    break;
                default:
                    height = base.getChildHeight(this);
                }

                if ((height < minHeight) && (height!=0)) { // VANGOGH: aggiunto check sul valore zero 
                    minHeight = height;
                }
            });
            base.minHeight = minHeight;
            base.setRowHeight();

            // VANGOGH: Setta l'altezza delle "figure"
            $("> *", base.el).each(function(index) {
                if ($(this).hasClass('frg13_top')) {
                    $(this).css( {'height': '50%', ' overflow': 'hidden'} );
                } else if ($(this).hasClass('frg13_bottom')) {
                    $(this).css( {'height': '50%','overflow': 'hidden'} ); 
                } else {
                    $(this).height("100%").css({'overflow': 'hidden'});
                }
            });

        };


        base.calculateMinHeightChildren_case2 = function () {
            var minHeight = 10000, h_box_0 = 0, h_box_1 = 0, h_box_2;
            $("> *", base.el).each(function (index) {
                var height;
                switch (index) {
                case 0:
                    h_box_0 += base.getChildHeight(this);
                    break;
                case 1:
                    h_box_1 = $(this).outerHeight(true);
                    h_box_2 = h_box_1;
                    break;
                case 2:
                    h_box_1 += base.getChildHeight(this);
                    break;
                case 3:
                    h_box_2 += $(this).outerHeight(true);
                    break;
                case 4:
                    h_box_2 += base.getChildHeight(this);
                    break;
                }
            });
            if (h_box_0!=0) {
                base.minHeight = parseInt(Math.min(h_box_0, h_box_1, h_box_2), 10);
            } else {
                base.minHeight = parseInt(Math.min(h_box_1, h_box_2), 10);
            }
            base.setRowHeight();

            // VANGOGH: Setta l'altezza delle "figure"
            $("> *", base.el).each(function(index) {
                if ($(this).hasClass('frg13_top')) {
                    $(this).css( {'height': '67.2%', ' overflow': 'hidden'} );
                } else if ($(this).hasClass('frg13_bottom')) {
                     $(this).css( {'height': '32.8%', ' overflow': 'hidden'} );
                } else {
                    $(this).css( {'height': '100%', ' overflow': 'hidden'} );
                }
            });
        };

        /*
         * Box template promo (usa la max-height)
         */
        base.calculateMinHeightChildren_case3 = function () {
            var maxHeight = 0;
            $("> *", base.el).each(function (index) {
                var height;
                $(this).attr('style', '');
                height = base.getChildHeight(this);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });
            base.minHeight = maxHeight-12;
            base.setRowHeight();
             $("> *", base.el).each(function(index) {
                $(this).css( {'height': '100%', ' overflow': 'hidden'} );
            });
        };

        base.setRowHeight = function () {
            base.minHeight -= base.options.tolerance; //tollerance
            $(base.el).height(base.minHeight).css({'overflow': 'hidden'});
            //base.caption(base.minHeight); COMMENTATO DA VANGOGH, ora è gestita via css
        };

        base.getChildHeight = function (el) {
            return $(el).height();
        };

        base.init();
		
		// if(base.browser == 'Explorer' && base.browserversion == 8){
		
		// 	this.currentHeight = null;
		// 	this.currentWidth = null;
			
		// 	document.body.onresize = function (e){
			
		// 		var windowHeight = $(window).height();
		// 		var windowWidth = $(window).width();
				
		// 		if (this.currentHeight == null || this.currentWidth == null) {
						
		// 			base.init;
		// 			//location.reload();
					
		// 			this.currentHeight = windowHeight;
		// 			this.currentWidth = windowWidth;
		// 		} else if (this.currentHeight != windowHeight || this.currentWidth != windowWidth) {
						
		// 			//base.init;
		// 			location.reload();
					
		// 			this.currentHeight = windowHeight;
		// 			this.currentWidth = windowWidth;
		// 		}
		// 	};
			
		// } else {
		// 	$(window).resize(base.init);
		// }
    };

    $.cleanrow.defaultOptions = {
        tolerance: 0,
        spacer: 11
    };

    $.fn.cleanrow = function (options) {
        return this.each(function () {
            var obj = new $.cleanrow(this, options);
        });
    };
}

createCleanrowPlugin(jQuery);
