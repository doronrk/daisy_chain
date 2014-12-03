(function($) { // Hide scope, no $ conflict
	var user, settings;
	var methods = {
		init: function(options) {
			settings = $.extend({
				updateEl: "#order_summary_content", //element to update total
				cm: "", //required coremetrics tag
				success: "", //successful add to cart
				error: "", //error adding to cart
				update : false
			}, options);
			
			if(settings.cm === "")
				$.error("Coremetrics tag required.");
			
			//set user var
			user = "Unreg JSCart";
			//check if user is logged in
			if(methods.readCookie("SESSION") !== "" && $("#member_welcome").html() != null)
				user = "Reg Auth JSCart";
			else if(methods.readCookie("SESSION") === "" && $("#member_welcome").html() != null)
				user = "Reg Recg JSCart";
		},
		//add an item to the cart
		add: function(sku, size, qty) {
			if(qty === undefined)
				qty = 1;
			
			//create data for adding to cart
			var data = {
				"sku": sku,
				"size": size,
				"qty": qty,
				"cm": settings.cm,
				"cm_pageId": user + "View: Add to JSCart",
				"cm_categoryId": user + " Add"
			}
			if(settings.update) {
				$.extend(data, {"xyMessage":"added"});
			}
			//console.log(data);
			
			if(typeof add2cartJS === "function") {
				//add to cart
				add2cartJS(data, function(data, status) {
					//notify user that item has been added
					if(data.STATUS === "success" && typeof settings.success === "function") 
						settings.success(data, sku);
					else if(data.STATUS === "error" && typeof settings.error === "function") //error
						settings.error(data, sku);
					
					//update cart total
					$.get('/catalog/getCartDetail.cfm', function(data) {
					    $.get('/catalog/orderSummary.cfm', function(data) {
					    	if(typeof settings.updateEl === "object")
					    		settings.updateEl.html(data);
					    	else
								$(settings.updateEl).html(data);
						});
					});

				});
			}
			else
				$.error("Could not add to cart. Function add2cartJS not defined.");
		},
		readCookie: function(c_name) {
			if (document.cookie.length > 0) {
		        c_start = document.cookie.indexOf(name + "=");
		        if (c_start != -1) {
		            c_start = c_start + c_name.length + 1;
		            c_end = document.cookie.indexOf(";", c_start);
		            if (c_end == -1) {
		                c_end = document.cookie.length;
		            }
		            return unescape(document.cookie.substring(c_start, c_end));
		        }
		    }
		    return "";
		}
	};
	
	$.addToCart = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.addToCart' );
	    } 
	};
})(jQuery);
