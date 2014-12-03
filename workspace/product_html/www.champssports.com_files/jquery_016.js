/*
 * Contains quickview plugin
 */
(function($) { // Hide scope, no $ conflict
	var vars = {
		structure : new Object()
	};
	var defaults = {
		site : 'eastbay',
		tab : 'Featured',
		position : 1
	};
	var settings = {
		site : 'eastbay',
		tab : 'Featured',
		sku : '',
		scrollTarget : '#flyin_container .flyin_content .qv_scroll',
		position: 1,
        title:''
	};
	var methods = {
		init : function(options) {
		    settings = $.extend(settings, options);

			if(!settings.sku == '') {
			
				//initial setup
				if($('#pdp_view').length == 0) {
					$('body').append('<div id="pdp_view" data-title="'+settings.tab+'"></div>');	
				}
				var element = $('#pdp_view');
				$('#pdp_view').flyin({'title':settings.title,'initial_width':'480px','position':1,'callback':function(){$('#pdp_view').inlinepdp(settings); settings = {}; $.extend(settings, defaults);}});
			}
		}
	};
	
	$.quickview = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.fullScreen' );
	    } 
	};
})(jQuery);
/* END quickview */
