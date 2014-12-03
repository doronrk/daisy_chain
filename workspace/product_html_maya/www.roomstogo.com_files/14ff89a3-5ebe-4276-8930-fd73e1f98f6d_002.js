			
// Copyright 2006-2014 ClickTale Ltd., US Patent Pending
// PID: 19383
// Generated on: 11/28/2014 3:43:39 AM (UTC 11/28/2014 9:43:39 AM)


;(function(){

	// Safe gaurd from errors
	try {

		// Utils: Using 'Facade' Pattern to provide a persistent interface for DOM.Ready, Selectors, etc..
		var Utils = {};
		
		// Fn: Checks if the browser is supported. 'true' for native or jQuery support. 'false' otherwise
		Utils.BrowserSupported = function (){
			
			// For modern browsers
			if (
					document.readyState			&&
					document.addEventListener	&&
					document.querySelectorAll	
				)	return true;

			
			// Fallback on jQuery
			else if (jQuery) return true;
			
			
			// Browser not supported
			else return false;
		}
		
		/* Early finish if the browser isn't supported */
		if ( !Utils.BrowserSupported() ) return;
		
		// Fn: Attaches 'Handler' to run on DOM.Ready. If DOM.Ready already happend, just runs Handler
		Utils.DOMReady = function ( Handler ){
			
			// Modern browsers
			document.addEventListener			&&
			document.readyState == 'loading'	&&
			document.addEventListener('DOMContentLoaded', Handler, false);
			
			// Modern browsers - after DOM.Ready
			document.addEventListener			&&
			!document.readyState != 'loading'	&&
			Handler();
			
			
			// Fallback on jQuery
			!document.addEventListener	&&
			jQuery						&&
			jQuery( Handler );
		}
		
		// Fn: Adds 'Handler' for 'Event' on 'Element'
		Utils.AddEventHandler = function ( Event, Element, Handler ){
			
			// Modern browsers
			Element.addEventListener &&
			Element.addEventListener( Event, Handler, false );
			
			// Fallback on jQuery
			!Element.addEventListener	&&
			jQuery						&&
			jQuery(Element)[Event](Handler);
		}
		
		// Fn: Runs 'Handler' only when ClickTale is recording (times out after 5 seconds)
		Utils.WhenRecording = function ( Handler ){
			
			// Prepare a timeout counter
			var TimeoutCounter = 0;
			
			// Wait with setup until ClickTale is recording (or cancel after a 5 seconds timeout)
			var Interval = setInterval(function(){
			
				// Timeout after 5 seconds
				if (window.ClickTaleIsRecording && !ClickTaleIsRecording() && ++TimeoutCounter >= 50){
					
					// End the timer for the setup function
					clearInterval( Interval );
					
					// Early finish
					return;
				}
				
				// When ClickTale is recording
				if (window.ClickTaleIsRecording && ClickTaleIsRecording()){
				
					// End the timer
					clearInterval( Interval );
					
					// Run the passed in 'Handler' function
					Handler();
				}
			}, 100);
		}
		

		
		
		
		
		// Fn: Once recording, run the following Setup function
		var Setup = function (){
		
			jQuery(".miniCartLink").click(function(){
			ClickTaleEvent("Viewed bag clicked");
			});
			
			jQuery("#configuratorDropDown").click(function(){
			ClickTaleEvent("Product Configurator clicked");
			});
			
			jQuery("#wishListLink").click(function(){
			ClickTaleEvent("Wish list clicked");
			});
			
			jQuery(".miniCartLink").click(function(){
			var code = "jQuery('#miniCartModal').show();";
			code += "jQuery('#miniCartModal').css('top', '101px');";
			code += "jQuery('#miniCartModal').css('left', '1239.5px');";
			ClickTaleExec(code);
			});
			
			jQuery("#configuratorDropDown").click(function(){
			var code = "jQuery('#configuratorDropDown').click()";
			ClickTaleExec(code);
			});
			
			jQuery(".close").click(function(){
			var code = "jQuery('.close').click()";
			ClickTaleExec(code);
			});
			
			jQuery("#wishListLink").click(function(){
			var code = "jQuery('#wishListLink').click()";
			ClickTaleExec(code);
			});
			
			jQuery("#emailAFriend").click(function(){
			var code = "jQuery('#emailAFriend').click()";
			ClickTaleExec(code);
			});
			
			jQuery(".loadFabricSwatches").click(function(){
			var code = "jQuery('.loadFabricSwatches').click()";
			ClickTaleExec(code);
			});
			
		    jQuery("#shippingInfoSubmit").click(function(){
			if (typeof ClickTaleRegisterFormSubmit == 'function' ){
			var THEFORM = jQuery('#shippingInfoForm').get( 0);
			ClickTaleRegisterFormSubmit ( THEFORM );
			}
	    	});
			
			 jQuery("#deliveryInfoSubmit").click(function(){
			if (typeof ClickTaleRegisterFormSubmit == 'function' ){
			var THEFORM = jQuery('#shippingInfoForm').get( 0);
			ClickTaleRegisterFormSubmit ( THEFORM );
			}
	    	});
			
			 jQuery("#billingInfoFormSubmit").click(function(){
			if (typeof ClickTaleRegisterFormSubmit == 'function' ){
			var THEFORM = jQuery('#billingInfoForm').get( 0);
			ClickTaleRegisterFormSubmit ( THEFORM );
			}
	    	});
		}


		
		// On DOM.Ready
		Utils.DOMReady(function(){
			
			// Make sure ClickTale is recording, and run 'Setup'
			Utils.WhenRecording( Setup );
		});
		
	} catch(e){};
})();




