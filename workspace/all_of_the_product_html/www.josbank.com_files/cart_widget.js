var cart_widget;

$().ready(function(){
    cart_widget = new Cart_Widget();
});

function Cart_Widget(){
    var hideIn;
    var scrollTime;
    var ph;
    
    InitiateWidget();
    
    //Public Methods
    this.addToCart = AddToCart;
    this.close = Close;
    
    //private methods	
    function InitiateWidget(){
        hideIn = 15000;
        scrollTime = 1000;
        ph = $('#cw_ph');
        if (ph.length != 1) {
            ph = '<div id="cw_ph"></div>';
            ph = $(ph);
            $('#wrapper').append(ph);
        }
        ph.css('width', '348');
    }
    
    function AddToCart(resp){
                //insert new content in placeholder
                ph.html(resp);
                //updating image and cart totals
                var miniCartCookie = readCookie("WCX_MINICART");
				var totalItems = 0;
				var totalAmount = "$0.00";
				if (miniCartCookie != null)
				{
					var miniCartTotalsArray = miniCartCookie.split('|');
					totalItems = miniCartTotalsArray[1];
					totalAmount = miniCartTotalsArray[0];
				}
				var intlCookie = readCookie("isIntl_cookie");
				var roundCoeff =getCookie('round_cookie');
				if (isNaN(roundCoeff)) {
					roundCoeff = 2;
				}
				var lcpCoeff =getCookie('lcp_coeff_cookie'); 
			    if (isNaN(lcpCoeff)) { 
			       lcpCoeff = 1; 
			    } 
				var userCurrencySymbol = "$";
				if(intlCookie == 'TRUE'){
					var userCurrency = getCookie('currency_cookie') || 'USD';
					var fxrate = getCookie('fx_rate_cookie');
					var price = parseFloat(totalAmount.replace(/[^0-9/.]+/g,''));						
				    if (isNaN(fxrate) || userCurrency == 'USD') {
				        totalAmount = price.toFixed(2);
				        
				    }else {
				    	totalAmount = price * lcpCoeff * fxrate;
				    	if (roundCoeff >= 0) {
							totalAmount = parseFloat(totalAmount.toFixed(roundCoeff)).toFixed(2);
						} else if (roundCoeff== -1) {
							 totalAmount /= 10;
							 totalAmount = Math.round(totalAmount);
							 totalAmount *= 10;
							 totalAmount = totalAmount.toFixed(2);				
						} else if (roundCoeff== -2) {
							 totalAmount /= 100;
							 totalAmount = Math.round(totalAmount);
							 totalAmount *= 100;
							 totalAmount = totalAmount.toFixed(2);			
						}
				        userCurrencySymbol = userCurrency;
				    }
				}
                ph.find('#addToCartOverlay_totals').html("<li><b>"+totalItems+" items in cart</b></li><li>Cart Subtotal: "+userCurrencySymbol+" "+totalAmount+"</li>");
				ScrollToTop();
                DisplayWidget();
        //stop browser defaults
        return false;
    }
    
    function DisplayWidget(){
        ph.show();
        if($().bgiframe){ph.bgiframe();}
        ph.find('.close').click(function(){
            cart_widget.close();
        });
        setTimeout(function(){
            Close();
        }, hideIn);
    }
    
    function ScrollToTop(){
        $('html,body').animate({
            scrollTop: 0
        }, scrollTime);
    }
    
    function Close(){
        ph.hide();
        //stop browser defaults
        return false;
    }
}
