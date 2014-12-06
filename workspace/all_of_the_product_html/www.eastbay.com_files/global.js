var global_settings = {
	TOUCH_DEVICE : (typeof document.ontouchstart != "undefined") ? true : false
};
$(document).ready(function(e) {
	$('body').attr('data-touchdevice', 'false');
	if(global_settings.TOUCH_DEVICE) {
		$('body').attr('data-touchdevice', 'true');
	}
	try{$("img[data-original]").lazyload({effect:"fadeIn"});}catch(err){}
	try{$("[data-rating]").ratings()}catch(err){}
});