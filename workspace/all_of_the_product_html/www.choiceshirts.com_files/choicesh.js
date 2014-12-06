function cl(msg){
    if(typeof console != 'undefined')
        console.log(msg);
}

jQuery.noConflict();



function showReviewsAdditional(event) {
    $('reviews_additional').show();
    $('toggle_reviews').hide();
};

document.observe('dom:loaded', function() {
    $$('a[rel="external"]').each(function(link) {
        if(link.readAttribute('href') != '' && link.readAttribute('href') != '#') {
            link.writeAttribute('target', '_blank');
        }
    });

    if($('toggle_reviews') != null) {
        $('toggle_reviews').observe('click', showReviewsAdditional);
    }
});

function toggleMenu(el, over, second) {
    if(!second && !over) {
        setTimeout(function(){toggleMenu(el, 0, 1);}, 100);
        el.setAttribute('sameAttribute', 1);
        return;
    } else if(!over && el.getAttribute('sameAttribute') == 0) {
        return;
    }
    el.setAttribute('sameAttribute', 0);

    if (over) {
        Element.addClassName(el, 'over');
    }
    else {
        Element.addClassName(el, 'hold');
        Element.removeClassName(el, 'over');
        setTimeout(function(){Element.removeClassName(el, 'hold');}, 300);
    }
}


jQuery(function($) {
    // Home Page Tabs
    $('#tabs').tabs().tabs('rotate',10000);
    
    
    // Product List hover
    $('.products-grid li a.product-image, .crosssell li a.product-image').hover(function() {
        if($(this).parents('li').hasClass('custom_bg')) {
            $('img', this).hide();
        } else if(!$(this).parents('li').hasClass('no_change')) {
            if($(this).parents('ul').hasClass('first') || $(this).parents('div').hasClass('product-details')) {
                $('img', this).css({
                    'height':80,
                    'left':50,
                    'top':35,
                    'width':80
                });
            } else {
                $('img', this).css({
                    'height':80,
                    'left':50,
                    'top':45,
                    'width':80
                });                
            }
        }
    }, function() {
        $('img', this).removeAttr('style');
    });
    
    
    // Product Image switcher
    $('.product-view dd.option-number-1').each(function() {
        var aBG = $('.product-image a');
        aBG.css({ backgroundPosition:'0px 0px' });
        
        $(this).find('select').change(function() {
            var optText = $('option:selected', this).text();
            if (optText === 'Adult T-Shirt') { aBG.css({ backgroundPosition:'0px 0px' }); }
            if (optText === 'Youth T-Shirt') { aBG.css({ backgroundPosition:'0px -427px' }); }
            if (optText === 'Adult Scoop Neck') { aBG.css({ backgroundPosition:'0px -854px' }); }
            if (optText === 'Adult Long Sleeve') { aBG.css({ backgroundPosition:'0px -1281px' }); }
            if (optText === 'Adult Sweatshirt' || optText === 'Youth Sweatshirt') { aBG.css({ backgroundPosition:'0px -1708px' }); }
            if (optText === 'Youth Sweatshirt') { aBG.css({ backgroundPosition:'0px -2135px' }); }
        });
    });
    
    
    // Make sidebar link active
    var curUrl = $(location).attr('href');
    
    $('.block-account a').each(function() {
        var href = $(this).attr('href');
        if(/(\/)$/.test(curUrl)) curUrl = curUrl.substring(0, curUrl.length -1);
        if(/(\/)$/.test(href)) href = href.substring(0, href.length -1);
        if(href == curUrl) $(this).parents('li').addClass('current');
    });     
});
