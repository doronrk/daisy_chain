(function () {
	
    //app.cart
    (function(){
        var old_prototype = app.cart.init.prototype;
        var old_init = app.cart.init;
        app.cart.init = function () {
            old_init.apply(this, arguments);
            
            //save references to paypal form elements
            $cache.paypalForm = $('form.cart-action-paypal');
            $cache.paypalButton = $('button[name$="_expressCheckout"]', $cache.paypalForm);
            $cache.expresssCheckoutType = $('<input name="dwfrm_cart_expressCheckoutType" value="PayPal" type="hidden" />');

            //paypal express checkout button behavior
            $cache.paypalButton.click(function (){
            	$cache.paypalForm.append($cache.expresssCheckoutType);
        	});
            
        };
        app.cart.init.prototype = old_prototype;
    })();
    //app.checkout
    (function(){
        var old_prototype = app.checkout.init.prototype;
        var old_init = app.checkout.init;
        app.checkout.init = function () {
            old_init.apply(this, arguments);
            // Do something extra
            $('#PaymentMethod_PayPal a').click(function (){
        		window.open('https://www.paypal.com/uk/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside','olcwhatispaypal','toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=yes, resizable=yes, width=400, height=500');
        	});
        };
        app.checkout.init.prototype = old_prototype;
    })();
    
}) ();

