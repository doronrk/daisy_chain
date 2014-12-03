function handle_menu_click(click_event){
    //run the css test
    var csstest = $('.hidden').css('position');
    if (csstest !== 'absolute') {return;}
    // We don't want the link to act normally
    click_event.preventDefault();
    // assign variable for href
    var href = $(this).attr('href').replace("#", "");
    // if already active or href equals #blank don't change tab, just return
    if ($(this).parents('li').hasClass('active') || href === "#blank" || $(this).parents('li').hasClass('disabled')) {return;}
    $('.active').removeClass('active');
    $(this).parent('li').addClass('active');
    $('.open').addClass('hidden').removeClass('open');
    $('a[name='+href+']').parent('.target').removeClass('hidden').addClass('open');
    if ($(this).attr('id') == 'description') {
    	$('#productDesc').removeClass('hidden').addClass('open');
    	$('.detailsWrapper').removeClass('hidden').addClass('open');
    	$('#BVRRSummaryContainer').removeClass('bvDown');
    	$('#BVRRContainer').removeClass('open').addClass('hidden');
    }
    if ($(this).attr('id') == 'reviews') {
    	$('#productDesc').removeClass('open').addClass('hidden');
    	$('.detailsWrapper').removeClass('open').addClass('hidden');
    	$('#BVRRSummaryContainer').addClass('bvDown');
    	$('#BVRRContainer').removeClass('hidden').addClass('open');
    }
}

$(document).ready(function(){
    // bind the click function
    $('.trigger').find('a').click(handle_menu_click);
    // hide all targets except the default open
    $('.target').each(function(){
        $('.topLink').addClass('hidden');
        if (!$(this).hasClass('open')) {
            $(this).addClass('hidden');
        }
    });
    // handle linking to an open tab
    if (window.location.href.indexOf("#") > 0 && window.location.href.indexOf("#reviewsTab") < 1) {
    	if (!$('.tab-container').hasClass('no-tabs')) {
	        $('.active').removeClass('active');
	        $('.open').addClass('hidden').removeClass('open');
	        $('#productDesc').removeClass('open').addClass('hidden');
	        $('#BVRRSummaryContainer').addClass('bvDown');
	    	$('#BVRRContainer').addClass('open').removeClass('hidden');
	        href = window.location.href.substring(window.location.href.indexOf("#"), window.location.href.length).replace("#", "");
	        $('a[name='+href+']').parent('.target').removeClass('hidden').addClass('open');
	        var trigger = "#" + href;
	        $('a[href='+trigger+']').parent('li').addClass('active');
    	}
    }
    if (navigator.appVersion.toLowerCase().indexOf('msie 7') != -1) {
    	for (var i = 1; i < 21; i++) {
    		setTimeout("fixIE()", i * 1000);
    	}
	}
});