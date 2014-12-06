// Double click prevention
// Find all code matching elements run on click, kill all its binds, and fire that code ONCE on click
// Kill binds of all other matching elements upon click of any one
var PreventDoubleClick = (function($, undefined) {

	function prepareMatchingElements() {
	
		$(".oneClickOnly").not(".oneClickChecked").each(function() {
    
	        var $that                   = $(this),
	            function_hrefJavaScript = function() {},
	            function_onClickAttr    = function() {},
	            function_clickBind      = [],
	            content_hrefJavaScript  = "",
	            content_onClickAttr     = "",
	            href                    = $that.attr("href"),
	            onclick                 = $that.attr("onclick"),
	            events                  = $._data( $that[0], "events"),
	            clickEvents             = (events) ? events.click : undefined,
	            isSubmitButton			= $that.is("[type=submit]");
	        
	        // Save href javascript, if applicable
	        if (href && href.substring(0, 11).toLowerCase() === "javascript:") {
	            
	            content_hrefJavaScript  = href.substring(11);
	            function_hrefJavaScript = function() { eval(content_hrefJavaScript); };
	            
	        } else if (href) {
	        
	        	content_hrefJavaScript  = "document.location = '" + href + "';";
	        	function_hrefJavaScript = function() { eval(content_hrefJavaScript); };
	        }
	        
	        // Save onclick inline javascript, if applicable
	        if (onclick) {
	        
	            content_onClickAttr     = (onclick.substring(0, 11).toLowerCase() === "javascript:") ? onclick.substring(11) : onclick;
	            function_onClickAttr    = function() { eval(content_onClickAttr); };
	        }
	        
	        // Save bound click events, if applicable
	        if (clickEvents) {
	        
	            for (var x = 0; x < clickEvents.length; x++) {
	            
	                function_clickBind[x] = clickEvents[x].handler;
	            }
	        }
	
	        // Clear all existing click events
	        $that
	            .attr("href", "javascript:void(0);")
	            .attr("onclick", null)
	            .prop("onclick", null)
	            .off("click")
	            .unbind("click")
	            .die("click")
	            .addClass("oneClickChecked");
	
	        // Attach new click event, which can only fire once
	        $that.one("click", function() {
	        
	            function_hrefJavaScript();
	            function_onClickAttr();
	            
	            for (var x = 0; x < function_clickBind.length; x++) {
	            
	                function_clickBind[x]();
	            }
	            
	            if (isSubmitButton) { $(this).parents("form").submit(); }
	            
	            $(this).addClass("clicked").attr("disabled", "disabled");
                
                // Kill click bind for all other single click binds on page
                $(".oneClickOnly").off("click");
	        });
	    }); // .oneClickOnly each loop
	} // prepareMatchingElements function
	
	// Document ready call
	$(prepareMatchingElements);
	
	return {
		
		scan : prepareMatchingElements
	}
}(jQuery));