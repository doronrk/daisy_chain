function browserVersion() {
	var browser;
	if (navigator.userAgent.indexOf('Firefox/2') > -1) {
		browser = 'FF2';
	}
	return browser;
}

function handle_menu_click(click_event, node){
    //run the css test
    var csstest = $('.hidden').css('position');
    if (csstest !== 'absolute') {return;}
    // We don't want the link to act normally
    click_event.preventDefault ? click_event.preventDefault() : click_event.returnValue = false;
    // assign variable for href
    var href = $(node).attr('href').replace("#", "");
    // if already active or href equals #blank dont change tab, just return
    if ($(node).parents('li').hasClass('active') || href === "#blank" || $(node).parents('li').hasClass('disabled')) {return;}
    $('.active').removeClass('active');
    $(node).parent('li').addClass('active');
    // migrate form values
    $('.open').addClass('hidden').removeClass('open');
    $('a[name='+href+']').parent('.target').removeClass('hidden').addClass('open');
    // show summary div
    $('#BVRRSummaryContainer').addClass('open').removeClass('hidden');
    // IE 7 fix
    $('.open').css('zoom', '1');
}

$(document).ready(function(){

    // hide all targets except the default open
    $('.target').each(function(){
        $('.topLink').addClass('hidden');
        if (!$(this).hasClass('open')) {
            $(this).addClass('hidden');
        }
    });

    // handle linking to an open tab
    if (window.location.href.indexOf("#") > 0) {
    	if (!$('.tab-container').hasClass('no-tabs')) {
	        $('.active').removeClass('active');
	        $('.open').addClass('hidden').removeClass('open');
	        href = window.location.href.substring(window.location.href.indexOf("#"), window.location.href.length).replace("#", "");
	        $('a[name='+href+']').parent('.target').removeClass('hidden').addClass('open');
	        var trigger = "#" + href;
	        $('a[href='+trigger+']').parent('li').addClass('active');
    	}
    }
    
    $('#BVRRSummaryContainer').addClass('open').removeClass('hidden');
});