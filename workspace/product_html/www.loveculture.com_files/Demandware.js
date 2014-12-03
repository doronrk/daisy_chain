/*******************************************************************
 * 
 *  Functionality to invoke the FiftyOne Welcome Mat
 * 
 ******************************************************************/
 
if(typeof(Demandware)=='undefined')Demandware = {};
if(!Demandware.FiftyOne)Demandware.FiftyOne = {};

Demandware.FiftyOne.ContextChooser = new function()
{
	//constructor
	new function()
	{
		$(document).bind("ready", setEnvoyWidth);
		$(document).bind("ready", initialize);
	}
	
	function setEnvoyWidth()
	{
		$("#divFiftyOneCheckout").find("iframe").css("width", "100%");
	}
	
	function initialize()
	{
		//reposition to wrapper element
		$("#contextChooser").prependTo($("#wrapper"));
		var init_left = $("#wrapper").position().left;
		var init_top = $("#wrapper").position().top + 28;
		var runOnce = false;
		
		var $countryDD = $(".chooserDropdown").eq(0);
		var $currencyDD = $(".chooserDropdown").eq(1);
		$(".chooserDropdown").css("overflow-y", "hidden");
		$(".chooserDropdown").scrollTop(0);

		
		//populate data
		$.each(window.supportedLocales.countries, function (index, value) {
			$countryDD.append('<li data-currency="' + value.currency + '" data-country="' + value.code + '" data-displayname="' + value.name + '"><img class="smallflag" src="' + value.flagURL + '" alt="" />' + value.name + '</li>');
		});
		
		$.each(window.supportedLocales.currencies, function (index, value) {
			$currencyDD.append('<li data-currency="' + value.code + '" data-displayname="' + value.code + '"><span>' + value.code + '</span><span>' + value.name + '</span></li>');
		});
		
		//position selected to top
		
		$countryDD.find("li[data-country='"+window.currentCountry+"']").prependTo($countryDD);
		
		//$currencyDD.find("li[data-currency='"+window.currentCurrency+"']").append("<span id='selectcurrency'>SELECT CURRENCY</span>");
		$currencyDD.find("li[data-currency='"+window.currentCurrency+"']").prependTo($currencyDD);
		
			
		//hover handlers
		var countryHoverOn = function () {
			$(this).stop().animate({"background-color" : "#DEDEDE"}, 100);		
			var hoveringCountry = $(this).data("currency");
			$currencyDD.find("li[data-currency='"+hoveringCountry+"']").prependTo($currencyDD); // preset to country's default currency
			runOnce = true;
		};
		
		var countryHoverOff = function () {
			$(this).stop().animate({"background-color" : "#FFFFFF"}, 100);
		};
		
		var currencyHoverOn = function () {
			$(this).stop().animate({"background-color" : "#DEDEDE"}, 100);			
			var hoveringCurrency = $(this).data("currency");
			/*
			if(!runOnce)
				$countryDD.find("li[data-currency='"+hoveringCurrency+"']").prependTo($countryDD);*/
		};
		
		var currencyHoverOff = function () {
			$(this).stop().animate({"background-color" : "#FFFFFF"}, 100);
		};
		
		$(".chooserTrigger").click(function () {   
			
			var thisTrigger = $(this).attr("id");
			if(thisTrigger == "chooserTriggerFooter") {
				//reposition to bottom
				var pos = $(document).height() - 635;
				$("#contextChooser").css({"top" : pos + "px", "left" : "670px"});
				$("#contextChooser").data("pos", "footer");
				
			}
			else {
				$("#contextChooser").css({"top" : init_top + "px", "left" : init_left + "px"});
				$("#contextChooser").data("pos", "header");
			}
					
			$("#contextChooser").fadeToggle();   //Commented to Turn off BF Temporarily
			
		});
		
		$(".chooserDropdown").click(function () {
			var $dd = $(this);
			
			if($dd.data("state") == "open")
			{	
				$dd.animate({"height": "44px"}, 200);
				$dd.data("state", "closed"); 
				$dd.css("overflow-y", "hidden");	
			}
			else
			{
				if($dd.is($currencyDD))
				{
					if($countryDD.find("li").first().data("country") == "US") return false;
				}
				$dd.css("overflow-y", "scroll");	
				
				$(".chooserDropdown").css({"height": "44px"});
				
				//dropdown hover
				$countryDD.find("li").hover(countryHoverOn, countryHoverOff);	
				$currencyDD.find("li").hover(currencyHoverOn, currencyHoverOff);
				
				$dd.animate({"height": "308px"}, 200);
				$dd.data("state", "open"); 
			}
			
			//unbind keypress
			$(document).unbind("keypress.myKeyPress");
			//bind keypress
			$(document).bind("keypress.myKeyPress", function (event) {
				var trg = 0;
				if(event.which > 96)
					trg = event.which-32;
				else
					trg = event.which;
				var $found = $dd.find("li[data-displayname^='"+String.fromCharCode(trg)+"']");
				$dd.animate({
				    scrollTop: $found.offset().top - $dd.offset().top + $dd.scrollTop()
				}, 200);
				//console.log($dd.html());
				//console.log(event.which + ", " + $found.text());
			});
			
		});
		
		//onclick for each li
		$countryDD.find("li").click(function () {
			var selectedCountry = $(this).data("country");	
			var selectedCurrency = $(this).data("currency");
			if(selectedCountry != window.currentCountry && selectedCountry != $countryDD.find("li").first().data("country")) // i.e. DIFFERENT COUNTRY
			{
				//unbind hover events
				$countryDD.find("li").unbind('mouseenter mouseleave');
				$currencyDD.find("li").unbind('mouseenter mouseleave');
			}
			//unbind keypress
			$(document).unbind("keypress.myKeyPress");
			$(this).prependTo($countryDD); // stick to top
			$countryDD.scrollTop(0);
			$countryDD.css("overflow-y", "hidden");
			
			$currencyDD.find("li[data-currency='"+selectedCurrency+"']").prependTo($currencyDD); //set the default currency for that country
		});
		
		$currencyDD.find("li").click(function () {
			var selectedCurrency = $(this).data("currency");
			if(selectedCurrency != window.currentCurrency && selectedCurrency != $currencyDD.find("li").first().data("currency")) // i.e. DIFFERENT CURRENCY
			{
				//unbind hover events
				$countryDD.find("li").unbind('mouseenter mouseleave');
				$currencyDD.find("li").unbind('mouseenter mouseleave');
			}
			//unbind keypress
			$(document).unbind("keypress.myKeyPress");
			$(this).prependTo($currencyDD);
			$currencyDD.scrollTop(0);
			

			$currencyDD.css("overflow-y", "hidden");

			
			/* IM oVER IT - AMB
			if(!runOnce)
				$countryDD.find("li[rel='"+selCur+"']").prependTo($countryDD);*/
		});
		
		$("#btnSaveContext").click(function () {
			if($("#cbChooseUSD").is(':checked'))
				window.location.href = window.manualLocaleUrl + "?country=USA&currency=USD";	//UNSUPPORTED so session data will be erased
			else
				window.location.href = window.manualLocaleUrl + "?country=" + $countryDD.find("li").first().data("country") + "&currency=" + $currencyDD.find("li").first().data("currency");
		});
		
		
		//clickout handler
		$(document).mouseup(function (e)
		{
		    var container = $("#contextChooser");

		    if (!container.is(e.target)
		        && container.has(e.target).length === 0)
		    {
		        $(document).unbind("keypress.myKeyPress");
		        $(".chooserDropdown").find("li").unbind('mouseenter mouseleave');
		        $(".chooserDropdown").scrollTop(0);
		        $(".chooserDropdown").css("overflow-y", "hidden");
		        $(".chooserDropdown").css({"height": "44px"}, 200);
		        $(".chooserDropdown").data("state", "closed"); 
		        container.hide();
		    }
		});
		
	}
}