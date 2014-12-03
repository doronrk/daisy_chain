var domLoadMiniCart = function() {
    (function($){
		var miniCartSubmit = window.miniCartSubmit = function(formObject, redirect) {		
            var callback = null
            if (arguments.length > 3) {
                if (clearOmni) {} else { var clearOmni = {}; }
                callback = arguments[2];
                clearOmni = arguments[3];
            }
            
            $.getJSON('/cartHandler/ajax.jsp?clearOmni='+clearOmni, $(formObject).serialize() + '&async=true&no_cache=' + new Date().getTime(), function (json) {
                if (json.rdir) {
                    window.location.href = json.rdir;
                } else {
                    updateCartItemDisplay(json.itemCount);
                    if (callback) {
                        if(!callback(formObject)){
                            return false;
                        }
                    }
                    if (redirect) {
                        window.location.href = '/cart/index.jsp' + '?ias2VwCartSkusAdded=' + json.skusAdded;
                    } else {
                        window.minicartJson = json;
                        showCart(true);
                    }
                }
            }).error(function() {
                $(formObject).append('<input type="hidden" name="showProductInCart" value="true"/>').submit();
            });
        };

        var hideCart = function() {
            $('#minicart').hide();
	    $('#hdrCart').removeClass('active').css('z-index', 'auto');
        };

        var cartLoaded = false;
        var showCart = function(init) {
            if (!cartLoaded || init) {
		$.ajax({
			type: "GET",
			url:'/minicart/index.jsp',
			dataType:'html',
			success:function(response){
				var resp = $('<div>'+response+'</div>');
				resp.find('#trackingPixels').remove();
				 $('#minicart').html(resp);
				var cartTop =  $('#minicart').parent().position().top, 
				bodyelem = $('html, body');
				if (navigator.userAgent.toLowerCase().indexOf('safari')>-1 && navigator.userAgent.toLowerCase().indexOf('chrome')==-1) {
					bodyelem = $("body");
				}
				if (cartTop < bodyelem.scrollTop()) {
					bodyelem.animate({scrollTop: cartTop}, 'slow');
				}
				cartLoaded = true;
				if (init) {
                    setMinicartTimeout(minicartTimeOut);
                }
			}		
		});
            }
            $('#minicart').show();
            $('#hdrCart').css('z-index', 9999);
            $('#hdrCart').addClass('active');
        };

        var miniCartCloseTime;
        var minicartCloseTimer;
        var setMinicartTimeout = function(duration) {
            var now = new Date().getTime();
            miniCartCloseTime = now + duration;
            clearTimeout(minicartCloseTimer);
            minicartCloseTimer = setTimeout(hideCart, miniCartCloseTime - now);
        };

        var updateCartItemDisplay = window.updateCartItemDisplay = function(itemCount) {
            $("#hdrCart .cartItemCount").text(itemCount);
        };

        $('#minicart').delegate('.minicart_close', 'click', hideCart);
		
		var minStore = "";
		if(jQuery('#hdrSection1').find('.bru').hasClass('active')){
				minStore='BRU';
		}else{
				minStore='TRU';
		}		
		
		jQuery('#hdrCart').delegate('.minicart_product a','click',function(){					
			if(this.href.indexOf('&minCartRedir=')==-1){
				this.href += '&minCartRedir='+minStore;
			}
		});

        var cartOpen = function(e) {
            if (!$(e.currentTarget).hasClass('minicartDisabled')) {
                $('#minicart').show();
                $('#hdrCart').css('z-index', 9999);
                showCart(false);
            }
            clearTimeout(minicartCloseTimer);
        }

        var cartClose = function(e) {
            var now = new Date().getTime();
            if (now > miniCartCloseTime) {
                hideCart();
            } else {
                clearTimeout(minicartCloseTimer);
                minicartCloseTimer = setTimeout(hideCart, miniCartCloseTime - now);
            }
        }

        if("ontouchstart" in window) {
            $('#hdrCart > .cartButton').bind("touchstart", function(e) {
                e.preventDefault();
                cartOpen(e);
            });
            $("html").bind("touchstart", function(e) {
                var closest = $(e.target).closest('#hdrCart');
                if(!closest.length) {
                    cartClose(e);
                }
            });
        }		
        $('#hdrCart').mouseenter(function(e) {
            cartOpen(e);
        }).mouseleave(function(e) {
            cartClose(e);
        });

    })(jQuery);
}
//Hate to do this ugly fix, but performance on product pages is taking a toll.
domLoadMiniCart();
