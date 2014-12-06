/*
 * Contains conversant plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var vars = {
		userData : {},
		initialized : false
	};
	
	var settings = {
		data : {},
		callback : function(){}
	};
	var methods = {
		init : function(options) {
			
			if(typeof(jqueryConversantSettings) !== 'undefined'){
				try {
					settings = $.extend(settings, jqueryConversantSettings);	
				} catch(err){}
			}
			settings = $.extend(settings, options);
			
			vars.userData = $.extend(vars.userData, settings.data);
			
			settings.data = {};
			
			window.MasterTmsUdo = {};
			
			$.extend(window.MasterTmsUdo, vars.userData);
			
			if(!vars.initialized) {
				(function(e){var t="1014",n=document,r,i,s={http:"http://cdn.mplxtms.com/s/MasterTMS.min.js",https:"https://secure-cdn.mplxtms.com/s/MasterTMS.min.js"},o=s[/\w+/.exec(window.location.protocol)[0]];i=n.createElement("script"),i.type="text/javascript",i.async=!0,i.src=o+"#"+t,r=n.getElementsByTagName("script")[0],r.parentNode.insertBefore(i,r),i.readyState?i.onreadystatechange=function(){if(i.readyState==="loaded"||i.readyState==="complete")i.onreadystatechange=null}:i.onload=function(){try{e()}catch(t){}}})(function(){vars.initialized = true;});
				
				
			} else {
				methods.conversantAjaxCall();	
			}
		},
		conversantAjaxCall:function(){
			window.top.Pulse.Master = window.top.Pulse.runWidget({type: "MasterTMS",runNow: !0,selector: null});
		}

	};
	
	$.conversant = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.conversant' );
	    } 
	};
})(jQuery);
/* END conversant */