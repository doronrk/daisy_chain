// colorswatch JS

// Fix color option labels
Product.Config.prototype.getOptionLabel = function(option, price) {
    return option.label;
}

var isProductListPage;
jQuery(document).ready(function(){
    isProductListPage = (jQuery('body.catalog-category-view,body.catalogsearch-result-index').length > 0);

    //var simpleProductId = (typeof(spConfig) != 'undefined') ? spConfig.getSelectedProductId() : 0;
    var configurableProductId = jQuery('input[name=product]').val();
    var options = jQuery('.super-attribute-select');
    var hash = window.location.hash;
    var colorLabel;

    jQuery('.super-attribute-swatch-box').click(function(e){
        e.preventDefault();
        var $target = jQuery(e.target);
        if (!$target.is('img')) {
            return;
        }
        var $link = $target.parent();

        if ($link.hasClass('colorswatch-active')) {
            return;
        }
        var swatchId = jQuery(this).attr('id');
        var label = $link.attr('alt');

        if ($link.hasClass('colorswatch-disabled')) {
            return;
        }
        $link.siblings().not('.colorswatch-disabled').attr('class', 'colorswatch');
        $link.parent().siblings('.super-attribute-swatch-box').children().not('.colorswatch-disabled').attr('class', 'colorswatch');
        $link.attr('class', 'colorswatch-active');
        
        if ($link.parent().attr('id') == "saleSwatch1034") {
        	jQuery('#swatch1034-value').html("");
        	jQuery('#colorSaleValue').html(label);
        } else {
        	jQuery('#'+$link.parent().attr('id') + '-value').html(label).addClass('selected');
        	jQuery('#colorSaleValue').html("");
        }
        

		colorswatch_updateImages(configurableProductId, options);

        jQuery(document).trigger({
            type: "colorswatch-change",
            swatchId: swatchId,
            label: label
        });
        if (jQuery("#swatch1042 .colorswatch").length == 1 && !jQuery("#swatch1042 .colorswatch-active").length) {
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
        if (jQuery("#saleSwatch1042 .colorswatch").length == 1 && !jQuery("#saleSwatch1042 .colorswatch-active").length) {
            jQuery('#saleSwatch1042 .colorswatch').each(function(index, swatch){
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
        return;

    });

    // load selected color if hash exists
    if (jQuery('body').hasClass('catalog-product-view')) {
        /**
         * @todo Improve weak query string parsing. This is brittle
         */
        if (hash && -1 != hash.indexOf('color=')) {

            hash = hash.substr(1).split('=');
            var colorLabel = hash[1].replace('-', ' ');

            // Set color attribute value (IE related issue)
            var colorId = null;
            jQuery('#attribute1034 option').each(function(){
                var option = jQuery(this);
                if (option.text().toLowerCase() == colorLabel) {
                    colorId = option.val();
                }
            });
            if (colorId) {
                jQuery('#attribute1034').val(colorId);
            }
        } else if (jQuery('#attribute1034').val() != '') {
            var colorLabel = jQuery('#attribute1034 option:selected').text();
        }

        if (typeof(colorLabel) != 'undefined') {
            colorLabel = colorLabel.toLowerCase();
            jQuery('.colorswatch').each(function(index, swatch){
                var $swatch = jQuery(swatch);
                if ($swatch.attr('alt').toLowerCase() == colorLabel) {
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
                }
            });
        }
    }
});

function colorswatch_updateImages(configurableProductId, options){

    var optionIds;
    var optionValues;
    var url;
    var simpleProductId = spConfig.getSelectedProductId();

    if (jQuery('.fancybox-wrap').length > 0) {
        url = '/colorswatch/index/imagespopup';
    } else {
        url = '/colorswatch/index/images';
    }

    var socialEnabled = (jQuery("div#social-share").length > 0)

    if (simpleProductId == 0){
        optionIds       = new Array();
        optionValues    = new Array();
        options.each(function(index, item){
            optionIds[index] = jQuery(item).attr('id');
            optionValues[index] = jQuery(item).children('option[selected=selected]').val();
        });

        var postData = {
            'simpleProductId'       : simpleProductId,
            'configurableProductId' : configurableProductId,
            'optionIds'             : JSON.stringify(optionIds),
            'optionValues'          : JSON.stringify(optionValues)
        };

        jQuery.post(url, postData, function(data, textStatus, jqXHR){
            jQuery('#pdp-image-wrap').replaceWith(data.response);
            if(jQuery('.view-full-details')){
                jQuery('#pdp-image-wrap a').attr('href', jQuery('.view-full-details').attr('href'));
            }
            if(socialEnabled) {
                jQuery("div#social-share > .image").text(data.social_image);
                jQuery("div#social-share > .upc").text(data.upc);
            }
            jQuery('#product-upc-wrap').css('display', 'none');
            jQuery('#product-default-upc').show();
            update_social_images();
        }, 'json');
    } else {
        var postData = {
            'simpleProductId'       : simpleProductId,
            'configurableProductId' : configurableProductId,
            'optionIds'             : JSON.stringify(optionIds),
            'optionValues'          : JSON.stringify(optionValues)
        };
        jQuery.post(url, postData, function(data, textStatus, jqXHR){
            jQuery('#pdp-image-wrap').replaceWith(data.response);
            if(jQuery('.view-full-details')){
                jQuery('#pdp-image-wrap a').attr('href', jQuery('.view-full-details').attr('href'));
            }
            if(socialEnabled) {
                jQuery("div#social-share > .image").text(data.social_image);
                jQuery("div#social-share > .upc").text(data.upc);
            }
            jQuery('#product-upc').text(data.upc);
            if (data.upc) {
                jQuery('#product-upc-wrap').css('display', 'block');
                jQuery('#product-default-upc').hide();
            } else {
                jQuery('#product-upc-wrap').css('display', 'none');
                jQuery('#product-default-upc').show();
            }
            update_social_images();
        }, 'json');
    }
}


function update_social_images() {
    var product_image = jQuery('#image').attr('src');

    if (jQuery("meta[property='og\\:image']").length != 0) {
    	jQuery("meta[property='og\\:image']").attr("content", product_image);
    } else {
    	jQuery('head').append('<meta property="og:image" content="'+product_image+'" />');
    }

    jQuery('#social-share ul > li > span').each(function(index, item){
        var $service = jQuery(item);

        // Quick view popup on product list page
        if (isProductListPage) {
            // ShareThis is creating an empty span tag for some reason. Removing this here
            $service.children().remove();
        }

        var options = {
            "service": $service.data('share-action'),
            "element": $service.get(0),
            "url": $service.attr('st_url'),
            // "title":"sharethis",
            "type": $service.data('share-type'),
            "text":"ShareThis" ,
            "image": $service.attr('st_image'),
            // "summary":"this is description1"
        };

        stWidget.addEntry(options);

        // Product detail page
        if (!isProductListPage) {
            // ShareThis is creating an empty span tag for some reason. Removing this here
            $service.children().remove();
        }
    });

}
