(function () {
	
    //app.cart    
    var old_prototype = app.cart.init.prototype;
    var old_init = app.cart.init;
    app.cart.init = function () {
        old_init.apply(this, arguments);
        
        //save references to paypal form elements
        $cache.cartForm = $('form#cart-items-form #cart-table');
        $cache.paypalButton = $('.paypal-checkout');
        $cache.expresssCheckoutType = $('<input name="dwfrm_cart_expressCheckoutType" value="PayPal" type="hidden" />');
        $cache.hiddenPaypalButton = $('.hidden-paypal-button');

        //paypal express checkout button behavior
        $cache.paypalButton.on('click', function (){
        	$cache.cartForm.append($cache.expresssCheckoutType);
        	$cache.hiddenPaypalButton.click();
    	});
        
    };
    app.cart.init.prototype = old_prototype;
    
}) ();

(function () {
    	
    //app.checkout
    var old_prototype = app.checkout.init.prototype;
    var old_init = app.checkout.init;
    app.checkout.init = function () {
        old_init.apply(this, arguments);
        // Do something extra
        $('#PaymentMethod_PayPal a').click(function (){
        	var defaultLink = 'https://www.paypal.com/uk/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside';
        	if (app.resources && app.resources.LOCALE && app.resources.LOCALE !== "default"){
	        	if (app.resources.LOCALE == 'fr_CA'){
        			defaultLink = 'https://www.paypal.com/fr/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside';
          		}
        	}
    		window.open(defaultLink,'olcwhatispaypal','toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=yes, resizable=yes, width=400, height=500');
        });
    };
    app.checkout.init.prototype = old_prototype;
    
}) ();

