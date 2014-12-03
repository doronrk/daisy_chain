jQuery(document).ready(function() {
	jQuery("#various4").fancybox({
		'padding' : 0,
		'autoScale' : false,
		'transitionIn' : 'none',
		'transitionOut' : 'none'
	});

	jQuery("#various1").fancybox({
		'titlePosition' : 'inside',
		'transitionIn' : 'none',
		'transitionOut' : 'none'
	});

	
	jQuery('a.pdpMainImg').click(function(e) {
		e.preventDefault();	
		captureOmniturePdpZoom();
		jQuery('#fancybox-content').css('background-color', '#ffffff');
		jQuery.fancybox({
			'transitionIn'			: 'elastic',
			'transitionOut'			: 'elastic',
			'speedIn'				: 300,
			'speedOut'				: 200,
			'titleShow' : false,
			'overlayColor' : '#000',
			'overlayOpacity' : 0.9,
			'autoDimensions' :false,
			'autoScale' : false,
			'width' : 980,
			'height' : 1217,
			'margin' : 40,
			'scrolling'	: 'no',
			'href' : jQuery(this).attr('href'),
			'onComplete' : function() {
				window.miniBuyStackPDP();
			},
			'onClosed' : function() {
				jQuery('#fancybox-content').css('background-color', 'transparent');
			}
		});
	});

	
	jQuery('.videocall').click(function(e) {
		e.preventDefault();
		var src = jQuery(this).attr('href');
		var wWidth = jQuery(window).width();
		if(wWidth > 980) {
			wWidth = 980;
		}
		var wHeight = wWidth / 1.373737;
		if(wHeight > jQuery(window).height()) {
			wHeight = jQuery(window).height();
			wWidth = wHeight * 1.373737;
		}
		
		if(wWidth == null || wWidth < 5) {
			wWidth = 680;
			wHeight = 495;
		}
		if(wHeight == null || wHeight < 5) {
			wHeight = 495;
			wWidth = 680;
		}
		jQuery.fancybox({
			'transitionIn'			: 'elastic',
			'transitionOut'			: 'elastic',
			'speedIn'				: 300,
			'speedOut'				: 200,
			'padding' : 0,
			'width' : wWidth,
			'height' : wHeight,
			'href' : src,
			'type' : 'swf',
			'swf' : {
				'wmode' : 'transparent',
				'allowfullscreen' : 'true'
			}
		});
	});
	
});