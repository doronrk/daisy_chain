jQuery(document).ready(function() {
	/*if (jQuery.browser.msie && jQuery.browser.version < 9) {
		try {
			jQuery('input[type="text"], input[type="password"]').placeholder();
		}
		catch (exception) { 
			// do nothing  
		}
		
		jQuery('input[type="text"], input[type="password"]').each(function() {
			var	context = jQuery(this), lh = (context.outerHeight() - 8) + "px";
			var	currentLH = context.css('line-height');

			if (currentLH == "normal") 
				context.css( { "line-height":lh } );
		});
	}*/
	
	if (jQuery.browser.msie && jQuery.browser.version < 9) {
		jQuery('.recommendedProductDetail').live('click', function() {
			var context = jQuery(this),
			href = context.attr('href');
			window.location = href;
			
			return false;
		});
	}
	
	if (jQuery.browser.msie && jQuery.browser.version < 8) {
		if (jQuery('.activeCategoryTypeChangerTab').length && jQuery('.inactiveCategoryTypeChangerTab').length) {
			jQuery('.categoryTypeChanger').css( { marginLeft:"-22px" } );
		}
	}
	
	/*
	jQuery('input[type="text"], input[type="password"]').each(function() {
		var	context = jQuery(this), inputValue = context.val();
		
		context.bind('blur', function() {
			if (jQuery(this).attr('type') == "password" && jQuery(this).val() == "") {
				jQuery(this).hide();
				jQuery(this).prev('input[type="text"]').show();
				
				return true;
			}

			if (jQuery(this).val() == "") {
				jQuery(this).val(inputValue);
			}
		});
		
		context.bind('focus', function() {
			if (jQuery(this).siblings('input[type="password"]').length) {
				jQuery(this).attr('style', 'display:none');
				jQuery(this).siblings('input[type="password"]').attr('style', 'display:block');
				jQuery(this).siblings('input[type="password"]').trigger('focus');
				
				return true;
			}
			
			if (jQuery(this).val() == inputValue) {
				jQuery(this).val("");
			}
		});
	});*/
});

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}