jQuery(function($) {
    if ($('body').hasClass('catalog-product-view')) {
        $(document).on('colorswatch-change', function(e) {

            if (e.swatchId.substring(6) == '1034') {                
				jQuery("#swatch1042-value").text('SELECT SIZE');
                var normalizedLabel = e.label.replace(' ', '-').toLowerCase();
                window.location.replace('#color=' + normalizedLabel);
                if(jQuery("#swatch1042 .colorswatch").length == 1) {                    
                    jQuery('#swatch1042 .colorswatch').each(function(index, swatch){
                    var $swatch = jQuery(swatch);                
                        /**
                         * Play nice with the existing Prototype code and fire a native click event on the
                         * swatch link
                         */
                        var el = $swatch.get(0);
                        if (jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) { // IE
                            (el.fireEvent('onclick'));
                        } else { // Standard browsers
                            var evObj = document.createEvent('Events');
                            evObj.initEvent('click', true, false);
                            el.dispatchEvent(evObj);
                        }

                        var event = jQuery.Event('click');
                        event.target = $swatch.children('img').get(0);
                        $swatch.parent().trigger(event);

                    });
                }
            }
        });
    }
});