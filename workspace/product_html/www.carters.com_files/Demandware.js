/*******************************************************************
 * 
 *  FiftyOne Global Functions 
 * 
 ******************************************************************/

if(typeof(Demandware)=='undefined')Demandware = {};
if(!Demandware.FiftyOne)Demandware.FiftyOne = {};

Demandware.FiftyOne.Global = 
{
	_country : 'US',
	_currency : 'USD',
	_rate : 1.00,
	_suppressMSRP : false,
	_roundingMethod : 2,
	_goToUrl : '',
	
		
	init: function()
	{
		var FiftyOne_Akamai = $.cookie("FiftyOne_Akamai");
		if(FiftyOne_Akamai != undefined)
		{
			var cookie_values = FiftyOne_Akamai.split('|');
			this._country = cookie_values[0];
			this._currency = cookie_values[1];
			this._rate = parseFloat(cookie_values[2]);
			this._roundingMethod = parseInt(cookie_values[3]);
			this._suppressMSRP = cookie_values[4];
			if(this._country != 'US')
			{
				this.updatePrices();
				this.domesticMessaging();
				$('body').addClass('international');
			}
		}
		$(document).on("updateSummaryComplete", function(event){Demandware.FiftyOne.Global.updatePrices();});
	},
	
	openShipping: function(url){
		this._goToUrl = '';
		app.dialog.settings.position = "top";
		app.dialog.open({url:url, target: '#countrySelector'});
	},
	openShipping: function(url,goToUrl){
		this._goToUrl = goToUrl;
		app.dialog.settings.position = "top";
		app.dialog.open({url:url, target: '#countrySelector'});
		
		var countrySelectorInterval = setInterval(function () {
			if ($("#countrySelector").dialog("isOpen") === true) {
				$(document).trigger("setupBorderFreeDialog");
				clearInterval(countrySelectorInterval);
			};
		}, 200);
		
	},
	switchToCountry: function(url,countryCode, currencyCode)
	{
		$('body').css('cursor', 'progress');
		url = app.util.appendParamsToUrl(url, {country:countryCode,currency: currencyCode});
		app.ajax.getJson({url: url, callback: function(data){
			
			if(data.success == "true")
			{
				if(Demandware.FiftyOne.Global._goToUrl && Demandware.FiftyOne.Global._goToUrl != '')
				{
					window.location.href = Demandware.FiftyOne.Global._goToUrl;
				} else
					if(typeof fiftyoneURL_RedirectTo === 'undefined' || fiftyoneURL_RedirectTo == '')
					{
						var reloadURL = app.util.removeParamFromURL(window.location.href, 'countryCode');
						window.location.href = reloadURL;
						window.location.reload();
					} else {
						window.location.href = fiftyoneURL_RedirectTo;
						window.location.reload();
					}
			}
			else
			{
				$('body').css('cursor', 'default');
				alert("There was a problem selecting your country.  Please try again.");
			}
				
		}});
		$('#countrySelector').dialog('close');
	},
	
	suppressMSRP: function()
	{
		$('.price-standard,.product-standard-price,.mini-cart-attributes .MSRP').remove();
	},
	
	convertPrices: function()
	{
		//Add additional classes for prices that need to be converted here
		$('.sale_price_display, .price-sales,.product-sales-price,.price-standard,.product-standard-price,.price-total,.price-adjusted-total,.price-unadjusted,.mini-cart-price,.mini-cart-subtotals .value,.mini-cart-attributes .price span').filter(':not(.converted)').each(
			function(){
				if($(this).text().indexOf('-') >= 0 ){
					var prices = $(this).text().split('-');
					var minPrice = Demandware.FiftyOne.Global.convertPriceFromUSD(prices[0],false);
					var maxPrice = Demandware.FiftyOne.Global.convertPriceFromUSD(prices[1],false);
					$(this).text(Demandware.FiftyOne.Global._currency + " " + minPrice + " - " + maxPrice);
				} else {
					$(this).text(Demandware.FiftyOne.Global.convertPriceFromUSD($(this).text(),true));
				}
				
				$(this).addClass('converted');
			}
		);
		
		
		$('.rowcoupons .discount').remove();
		$('.order-shipping-discount .value,.discount .value').filter(':not(.converted)').each(
				function(){
					$(this).text('-'+Demandware.FiftyOne.Global.convertPriceFromUSD($(this).text(),true));
					$(this).addClass('converted');
				}
			);
		
		
	},
	convertPriceFromUSD: function(price,showCurrency)
	{
		price = price.match(/\d+[\/.]?\d+/);
		var pow = Math.pow(10,this._roundingMethod);
		price = Math.round(price * this._rate * pow)/pow;
		if(this._roundingMethod > 0)
			price = price.toFixed(2);
		if(showCurrency)
			if(this._currency == 'USD')
				return '$'+String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			else
				return this._currency + " " + String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		else
			return price;
	},
	updatePrices: function()
	{
		if(this._country != 'US')
		{
			if(this._suppressMSRP == 'true')
			{
				this.suppressMSRP();
			}
			this.convertPrices();
			
		}
	},
	
	domesticMessaging: function()
	{
		if(this._country != 'US')
		{
			var domesticMSGContainer = $('#product-content .domestic-only, .product-tile .domestic-only');
			if(domesticMSGContainer.length > 0){
				domesticMSGContainer.removeClass('visually-hidden');
				$('#product-content #add-to-cart').remove();
			}	
		}
	},
	
	initShippingMethods: function()
	{
		$('.shipping_methods input').click(
				function()
				{
					Demandware.FiftyOne.Global.updateFiftyOneShippingMethod($(this).val(),$(this).attr('data-price'));
				}
		);
		$('.shipping_methods input').each(
			function(){
				if(isNaN($(this).attr('data-price')))
				{
					Demandware.FiftyOne.Global.quoteFiftyOneShippingMethod($(this).val());
				}
				
			}	
		);
		
		
		
	},
	updateFiftyOneShippingMethod: function(shippingMethod, price)
	{
			var url= app.urls.fiftyoneUpdateShippingMethod+'?shippingMethod='+shippingMethod+'&price='+price;
			$(document).on('updateSummaryComplete',
					function(event)
					{
						var currentSM = $('.shipping_methods input:checked').val();
						
						$('.shipping-method-price-'+currentSM).html(fiftyone_shippingTotal);
					});
			app.ajax.getJson({url: url, callback: function(data)
				{
					$('input[name="dwfrm_singleshipping_shippingAddress_shippingMethodID"]').val(data.currentDWShippingMethod);
					updateSummary();
				}
			});
	},
	
	quoteFiftyOneShippingMethod: function(shippingMethod)
	{
		var url =  app.urls.fiftyoneQuoteShippingMethod+'?shippingMethod='+shippingMethod;
		app.ajax.getJson({url: url, callback: function(data)
			{
				if(!$.isEmptyObject(data))
				{
					$('.shipping_methods .shipping-method-price-'+data.shippingID).html(data.shippingQuote);
				}
			}
		});
		
		
	}
	
	
	
	

};

jQuery(document).ready(function () {
	Demandware.FiftyOne.Global.init();
});

