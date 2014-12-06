/*
 * Contains recommendations plugin
 */
(function($) { // Hide scope, no $ conflict
    var vars = {
        recs : new Object()	,
        zoneDiv : null
    };
    var defaultsettings = {
        pageType : '',
        returnType : 'html', //json, html
        set : {'productid':'','email':'','amount':'','optin':'','skus':''},
        addCartItemQtySubtotal : [], //{'sku':'','qty':'','amount':''}
        zone : '',
        heading : '',
    };
    var settings = {
        pageType : '',
        id : '',
        returnType : 'html', //json, html
        set : {'productid':'','email':'','amount':'','optin':''},
        addCartItemQtySubtotal : [], //{'sku':'','qty':'','amount':''}
        zone : '',
        pt : 'prod',
        imageSrc : '//images.champssports.com/pi/',
        imageSize : 'large',
        heading : '',
        grpSize : '2',
        productTemplate : '[product.image][product.title][product.price]',
        callback : ''
    };
    var methods = {
        init : function(options) {
            settings = $.extend(settings, defaultsettings);
            if(typeof(jqueryRecommendSettings) !== 'undefined'){
                try {
                    settings = $.extend(settings, jqueryRecommendSettings);
                } catch(err){}
            }
            settings = $.extend(settings, options);

            //initial setup
            return this.each(function() {

                var $element;
                $element = $(this);
                $element.html($('<div />', {'mybuyszone':settings.zone,'id':'mybuyspagezone'+settings.zone}));
                if(mybuys.zoneKeysToZoneDivIds.indexOf('mybuyspagezone'+settings.zone) === -1) {
                    mybuys.zoneKeysToZoneDivIds[settings.zone] = 'mybuyspagezone'+settings.zone;
                }
                window.renderZones = function(zones) {
                    for (zonekey in zones){
                        try {
                            if (typeof zones[zonekey] == 'function') {
                                continue;
                            }
                        } catch(e) {
                            continue;
                        }
                        var zoneDivId = zones[zonekey].divId;
                        settings.zoneDiv = $element.children('#'+zoneDivId);
                        if(settings.zoneDiv) {
                            vars.recs = zones[zonekey].recs;
                            if(settings.returnType == 'html') {
                                methods.returnHTML();
                            } else if(settings.returnType == 'json') {
                                methods.returnJSON();
                            }
                        }
                    }
                    if(typeof(settings.callback) === 'function') {
                        settings.callback();
                    }
                }
                mybuys.setPageType(settings.pageType);
                //mybuys.setZoneDivId = 'mybuyszone'+zone;
                $.each(settings.addCartItemQtySubtotal, function(i, item) {
                    mybuys.addCartItemsQtySubtotal(item.sku, item.qty, item.amount);
                });

                $.each(settings.set, function(s, set) {
                    mybuys.set(s, set);
                });
                mybuys.set('pt',settings.pt);
                mybuys.set('wrz',settings.zone);

                mybuys.setDataResponseCallback(renderZones);
                mybuys.initPage();
            });
        },
        returnHTML : function() {
            var htmlContent = '<!-- start Recommendations -->';
            htmlContent += '	<div class="title">'+settings.heading+'</div>';
            htmlContent += '	<div id="'+settings.id+'recommendations_spotlight" class="spotlight"><div class="slide_content"><ul class="content">';
            for (var i=0; i < vars.recs.length; i++) {
                if(vars.recs[i]){
                    htmlContent += '<li class="product_item">';
                    for(var items = 0; items < settings.grpSize; items++) {
                        if(i < vars.recs.length) {
                            htmlContent += methods.getLineItem(i);
                            if(items+1 != settings.grpSize) {
                                i++;
                            }
                        }
                    }

                    htmlContent += '</li>';
                }
            }
            htmlContent += '</ul></div><div class="slide_buttons" style="display: block;"><a href="#" class="sl_previous left-arrow pdp_sprite"></a><a href="#" class="sl_next arrow pdp_sprite"></a></div></div>';
            htmlContent += '<!-- end Recommendations -->';
            settings.zoneDiv.html(htmlContent);
            settings.callback(htmlContent);
        },
        returnJSON : function() {
            var jsonContent = {};
            jsonContent.RECS = [];
            for (var i=0; i < vars.recs.length; i++) {
                if(vars.recs[i]){
                    jsonContent.RECS.push(methods.getProductObject(i));
                }
            }
            settings.callback(jsonContent);
        },
        getSectionHTML : function(section, i) {
            var htmlContent = '';
            if(section == 'image') {
                var title = $.trim(vars.recs[i].name.toString().toLowerCase());
                title = title.replace(/'/ig,'');
                title = title.replace(/ +/ig,'-');
                title = title.replace(/-+/ig,'-');
                title = title.replace(/_+/ig,'-');

                if(vars.recs[i].productCode) {
                    htmlContent += '<span class="product_image"><img src="'+settings.imageSrc+vars.recs[i].productCode+'/'+settings.imageSize+'/'+title+'/" alt="' + vars.recs[i].name + '" border="0" /></span>';
                } else {
                    htmlContent += '<span class="product_image"><img src="'+vars.recs[i].imageUrl+'" alt="' + vars.recs[i].name + '" border="0" /></span>';
                }

                return htmlContent;

            }
            if(section == 'price') {

                if(vars.recs[i].list_price != '') {
                    htmlContent += '<span class="sale_product"><span class="price">' + vars.recs[i].list_price + '</span><span class="sale_price">' + vars.recs[i].price +'</span></span>';
                } else {
                    htmlContent += '<span class="price">' + vars.recs[i].price + '</span>'
                }
                return htmlContent;

            }
            if(section == 'title') {

                htmlContent += '<span class="product_title">'+ vars.recs[i].name+'</span>';
                return htmlContent;

            }
        },
        getProductObject : function(i) {
            var product = {};
            product.trackUrl = vars.recs[i].trackUrl;
            product.title = vars.recs[i].name;
            product.brand = vars.recs[i].brand;
            product.productUrl = vars.recs[i].productUrl;
            if(vars.recs[i].list_price != '') {
                product.list_price = vars.recs[i].list_price;
                product.price = vars.recs[i].price
            } else {
                product.list_price = vars.recs[i].price;
            }
            return product;
        },
        getLineItem : function(i) {
            var trackUrl = "mybuys.track('" + vars.recs[i].trackUrl + "')";
            var htmlContent = '';
            htmlContent += '<a href="' + vars.recs[i].productUrl + '" title="' + vars.recs[i].name + '" data-sku="'+vars.recs[i].productCode+'" data-trackurl="'+trackUrl+'" onclick="return false;">';

            htmlContent += settings.productTemplate.replace(/(\[product\.)([^\]]*)(\])/gi, function(m, p1, section, p3){return methods.getSectionHTML(section, i);});

            htmlContent += '</a>';

            return htmlContent;
        }
    };

    $.fn.recommendations = function(method) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.recommendations' );
        }
    };
})(jQuery);
/* END recommendations */