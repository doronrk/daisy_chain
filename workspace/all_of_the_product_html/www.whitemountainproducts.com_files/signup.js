
/**********************************************************************************************************************
 * 	signup.js acts as a way for us to safely add functionality to app.js without having to actually modify it
 * 
 * 	NOTE: ALL INTEGRATION SPECIFIC LOGIC SHOULD GO IN ITS RESPECTIVE CARTRIDGE
 * 
 *********************************************************************************************************************/
// A place to override individual app.js functions
// An example of a common application will be to override an init function
// This approach is used when you want to leave the existing functionality in place and execute from within the same scope
// also preserves any prototype properties that are setup for that function.
(function () { 
	
 
    /****** app.lstrak ******/
    app.lstrak = {
		init: function() {	
			
			function IsEmail(email) {
				  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				  return regex.test(email);
			}
			
			$('#email-alert-signup').live('submit', function(e) {
				e.preventDefault();
				
				var $localeInput = $('<input id="customerlocale" name="customerlocale" type="hidden">');
				if (app.resources && app.resources.LOCALE && app.resources.LOCALE !== "default")
					$localeInput.val(app.resources.LOCALE);
				$('#email-alert-signup').append($localeInput);
				
				if (IsEmail($('#email-alert-address').val())){
				$.ajax({
				    type: "POST",
					url: app.urls.emailSignUp,
					data: jQuery("#email-alert-signup").serialize()
					})
					.done(function(responseData) {					
						var $modal = $(document.createElement('div')).append($.trim(responseData)).attr({
    	                	'class': 'lstrak-dialog'
    	                });    	                
    	                var options = {
	                		width: 'auto',
	                		height: 'auto',
	                		close: app.lstrak.onClose
            			};
    	
    	                var modal = app.dialog.create({target: $modal, options: options});
    	                modal.dialog("open");
					})
					.fail(function (xhr, textStatus) {
						var $modal = $(document.createElement('div')).append(textStatus).attr({
    	                	'class': 'lstrak-dialog'
    	                });    	                
    	                var options = {
	                		width: 'auto',
	                		height: 'auto',
	                		close: app.lstrak.onClose
            			};
    	
    	                var modal = app.dialog.create({target: $modal, options: options});
    	                modal.dialog("open");
						
					})
					.always(function(){			
						$('#email-alert-address').val('');
						$('#email-alert-address').blur();
					});
				}
			});
			
			$('#email-alert-signup2').live('submit', function(e) {
				e.preventDefault();
				
				var $localeInput = $('<input id="customerlocale" name="customerlocale" type="hidden">');
				if (app.resources && app.resources.LOCALE && app.resources.LOCALE !== "default")
					$localeInput.val(app.resources.LOCALE);
				$('#email-alert-signup2').append($localeInput);
				
				if (IsEmail($('#email-alert-address2').val())){
				$.ajax({
				    type: "POST",
					url: app.urls.emailSignUp,
					data: jQuery("#email-alert-signup2").serialize()
					})
					.done(function(responseData) {					
						var $modal = $(document.createElement('div')).append($.trim(responseData)).attr({
    	                	'class': 'lstrak-dialog'
    	                });    	                
    	                var options = {
	                		width: 'auto',
	                		height: 'auto',
	                		close: app.lstrak.onClose
            			};
    	
    	                var modal = app.dialog.create({target: $modal, options: options});
    	                modal.dialog("open");
					})
					.fail(function (xhr, textStatus) {
						var $modal = $(document.createElement('div')).append(textStatus).attr({
    	                	'class': 'lstrak-dialog'
    	                });    	                
    	                var options = {
	                		width: 'auto',
	                		height: 'auto',
	                		close: app.lstrak.onClose
            			};
    	
    	                var modal = app.dialog.create({target: $modal, options: options});
    	                modal.dialog("open");
						
					})
					.always(function(){			
						$('#email-alert-address2').val('');
						$('#email-alert-address2').blur();
					});
				}
			});	
			
			$('#social-email-signup').live('submit', function(e) {
				
				e.preventDefault();
				if (IsEmail($('#social-email-address').val())){
				$.ajax({
				    type: "POST",
					url: app.urls.emailSignUp,
					data: jQuery("#social-email-signup").serialize()
					})
					.done(function(responseData) {					
						var $modal = $(document.createElement('div')).append($.trim(responseData)).attr({
    	                	'class': 'lstrak-dialog'
    	                });    	                
    	                var options = {
	                		width: 'auto',
	                		height: 'auto',
	                		close: app.lstrak.onClose
            			};
    	
    	                var modal = app.dialog.create({target: $modal, options: options});
    	                modal.dialog("open");
					})
					.fail(function (xhr, textStatus) {
						var $modal = $(document.createElement('div')).append(textStatus).attr({
    	                	'class': 'lstrak-dialog'
    	                });    	                
    	                var options = {
	                		width: 'auto',
	                		height: 'auto',
	                		close: app.lstrak.onClose
            			};
    	
    	                var modal = app.dialog.create({target: $modal, options: options});
    	                modal.dialog("open");
					})
					.always(function(){			
						$('#social-email-address').val('');
						$('#social-email-address').blur();
					});
				}
			});				
		},
		
		onClose: function() {
			$(this).remove();

		}
    };
    
}) ();

