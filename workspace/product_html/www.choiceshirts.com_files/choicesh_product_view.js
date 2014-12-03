var prevActiveEl = 'sizing_t_shirt';
function showHideSizing(ele, link) {
    if(ele != prevActiveEl) {
        $$('#sizing_tabs a').invoke('removeClassName', 'active');
        $(link).addClassName('active');
        $(prevActiveEl).hide();
        $(ele).show();
        prevActiveEl = ele;
    }
}

document.observe('dom:loaded', function() {
    jQuery('a[rel="product_images"]').fancybox();
    jQuery('a.sizing-chart').fancybox({
        width:          453,
        height:         600,
        autoDimensions: false,
        margin:         0,
        padding:        0
    });
    jQuery('a.shirt-styles').fancybox({
        width:          523,
        height:         551, 
        autoDimensions: false,
        margin:         0,
        padding:        0
    }); 
    jQuery('a.report-a-problem').fancybox({
        width:              760,
        height:             550, 
        autoDimensions:     false,
        centerOnScroll:     true,
        margin:             0,
        padding:            0,
        hideOnContentClick: false,
        scrolling:          'no'
    });
    
    if($('attribute563') && $('configurable_swatch_color')) {
        var styles = $('attribute563');
        var colors = $$('#configurable_swatch_color li');
        var noShow = $$('.none-enabled');
        styles.observe('change', function(event){
           if($(this).selectedIndex == 0) {
               colors.invoke('removeClassName', 'enabled').invoke('addClassName', 'disabled');
               noShow.invoke('setStyle', {display:'block'});
           } else {
               noShow.invoke('setStyle', {display:'none'});
           }
        });
    }

});

Event.observe(window, 'load', function(){
    jQuery('#load_sizing_chart').load(BASE_URL + 'sizing-chart #sizing_chart');
    jQuery('#load_shirt_styles').load(BASE_URL + 'sizing-chart #shirt_styles');
});