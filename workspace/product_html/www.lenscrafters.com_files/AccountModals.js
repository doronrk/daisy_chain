
$(document).ready(function(){
	AccountModalsJS.setupRegistrationModal();
	AccountModalsJS.setupRegistrationValidation();
	$(".modalSignIn").live("click", function(){
		var f = $("#modalLoginForm");
		if(f.not(':visible')){ //Handle favorites registration modal
			f = $(".modalSignIn:visible").parents('#modalLoginForm');
		}
		f.valid();
		f.submit();
		return false;
	});
	$(".modalRegSubmit").live("click", function(){
		var f = $("#modalRegistrationForm");
		if($('#favModalRegistrationForm').length){ //Handle favorites registration modal
			f = $('#favModalRegistrationForm');
		}
		
		if ($('#temp_logonPassword2').is (':visible'))
		{
			$('#temp_logonPassword2').hide ();
			$('#logonPassword2').show ();
		}
		
		if ($('#temp_logonPasswordVerify2').is (':visible'))
		{
			$('#temp_logonPasswordVerify2').hide ();
			$('#logonPasswordVerify2').show ();
		}
		
		f.valid();
		f.submit();
		return false;
	});
	
});


AccountModalsJS = {
		logonFormSubmit : function(logonForm){
			
			var f = $(logonForm);
			utag_data.form_name = "logon modal";
			utag_data.form_field = error_list;
			if(f.valid()){
				
				var data = f.serializeArray(),
					newData = [],
					originalURL = null;
				
				// since this is a jsonp request, we always set the destination URL to a jsonp-compatible page
				for (var i = 0; i < data.length; i++){
					var d = data[i];
					if (d['name'] == 'URL'){
						originalURL = d['value'];
						
						newData.push({
							name: 'URL',
							value: 'LogonAjaxView'
						});
					}else{
						newData.push(d);
					}
				}
				
				$.ajax({
					url: getAbsoluteURL(true) + 'LogonAjax',
					data: newData,
					dataType: 'jsonp',
					crossDomain: true,
					success: function(data) {
						if(data.passwordExpired && data.passwordExpired == '1') {
							$('#examSignInSection').css('display', 'none').attr('aria-hidden', 'true');
							$('#header-set-a-new-password-modal').attr('aria-hidden', 'true').css("display", "block");
						 }
						else if(data.success) {
							var nextUrl = originalURL;
	
							if (nextUrl.length && nextUrl.charAt(nextUrl.length -1) == '#'){
								nextUrl = nextUrl.substring(0, x.length - 1);
							}
							window.location = nextUrl;
						}
						else {
							$('.examLogOnFailureResponseMessageDiv').html(data.errorMessage);
						}
					},
					error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
						$('.examLogOnFailureResponseMessageDiv').html('Login request failed - please try again later.');
					}
				});
			}
		
		return false;
	
		},
		signInClickEvent : function(){
			$('#registerSection, #signInLink, #ForgotPasswordSection').hide();
			$('.createAccountModalLink, #signInSection').show();
			$('#signInEmail').focus();
			return false;
		},
		/**
		 * Set up the login/register modals
		 */
		setupRegistrationModal : function(){
			
			// create the modals
			var signInModal = $('#signInModal');
			signInModal.dialog({
				modal: true,
				width: 490,
				autoOpen: false,
				open: function(){
					signInModal.find('form').each(function(){
						$(this).validate().resetForm();
					});
				}
			});
			signInModal.find('input[name=URL]').val(document.location.href);
			
			//Modal for the favorites page
			var favSignInModal = $('#favoriteSignInModal');
			favSignInModal.dialog({
				modal: true,
				width: 490,
				autoOpen: false,
				open: function(){
					favSignInModal.find('form').each(function(){
						$(this).validate().resetForm();
					});
				}
			});
			favSignInModal.find('input[name=URL]').val(document.location.href);
			
			//Click handlers for my favorites page sign in and create account links		
			$('#openFavSignIn').on('click',function(e){
				e.preventDefault();
				favSignInModal.dialog('open');
				$('#signInLink').click();
			});
			
			$('#openFavRegister').on('click',function(e){
				e.preventDefault();
				favSignInModal.dialog('open');
				$('.createAccountModalLink').click();
			});			
			
			// the register link in the modal -- hide the sign in portion of the modal
			$('.createAccountModalLink').click(function(){
				$('#signInSection, .createAccountModalLink, #ForgotPasswordSection').hide();
				$('#signInLink, #registerSection').show();
				$('#createEmailAccount').focus();
				return false;
			});
			
			// the sign in link in the modal -- hide the register portion of the modal
			$('#signInLink, .signInLink').click(AccountModalsJS.signInClickEvent);
			$('#examForgotPasswordLink').click(function() {
				$('#signInSection, #createAccountModalLink').hide();
				$('#ForgotPasswordSection').show();
				return false;
			});
			$('.exam-close-reset-password').on('click', function(e){
				e.preventDefault();
				$('#ForgotPasswordSection').hide();
				$('#signInSection').show();
			});
			
			
			$('#modalPasswordResetSubmitButton').click(function() {
				
				if($('#resetPasswordForm').valid()){
					var resetForm= document.resetPasswordForm;
					var params = {};
					params.challengeAnswer = resetForm.challengeAnswer.value
					params.state = resetForm.state.value
					params.URL = resetForm.URL.value
					params.errorViewName = resetForm.errorViewName.value
					params.logonId = resetForm.storeId.value + "|" + resetForm.logonId.value 
					params.email1 = resetForm.logonId.value
					params.emailType = "forgotpassword";
					params.senderEmail = resetForm.logonId.value;
					params.senderName = resetForm.logonId.value;
					params.email1 = resetForm.logonId.value
					params.receiveEmail = "true";
					params.recipientEmail = resetForm.logonId.value;
					params.receiveEmail = "true";
					params.fromName = resetForm.logonId.value;
					params.pdp_18yrs = "true";				
					invokeResetPasswordService(params,false);

				}
				return false;
			});
			
			$('#examSignInModal .cancel').not('.exam-close-reset-password').click(function(e){
				e.preventDefault();
				signInModal.dialog('close');
			});

			$('#favoriteSignInModal .cancel').not('.exam-close-reset-password').click(function(e){
				e.preventDefault();
				favSignInModal.dialog('close');
			});
			
			$('#resetPasswordForm').validate({
				onfocusout: false,
				onkeyup: false,
				onclick: false,
				errorClass: 'required',
				errorElement: 'span',
			
				rules: {
					logonId: {required:true, email:true},
				},
				messages: {
					logonId:{required: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
					email:MessageHelper.messages["ERROR_Logon_model_EmailInvalid"]}
				}
			});
		},
		setupRegistrationValidation : function(){

			var modalLogonParameters = $.extend(true, {}, window.logonParameters);
			var examRegisterParameters = $.extend(true, {}, window.registerParameters);
			var favRegisterParameters = $.extend(true, {}, window.registerParameters);
			examRegisterParameters.rules = {
				logonId	:{required:true,email:true},
				logonIdVerify : {required:true,email:true,equalTo: "#modalRegistrationForm input[name=logonId]"},
				logonPassword : {required:true},
				logonPasswordVerify :{required:true,equalTo :'#modalRegistrationForm input[name=logonPassword]'},
				optin_18yrs : {required:true}
			};
			examRegisterParameters.messages = {
				logonId	:{required:MessageHelper.messages["ERROR_Logon_model_EmailEmpty"],email:MessageHelper.messages['ERROR_Logon_model_EmailInvalid']},
				logonIdVerify : {required:MessageHelper.messages['ERROR_LOGON_MODEL_EMAIL_CONFIRM'],email:MessageHelper.messages['ERROR_LOGON_MODEL_EMAIL_CONFIRM'],equalTo: MessageHelper.messages['ERROR_EMAIL_MISMATCH']},
				logonPassword : {required:MessageHelper.messages['ERROR_PASSWORD_ENTER']},
				logonPasswordVerify :{required:MessageHelper.messages['ERROR_PASSWORD_RE_ENTER'],equalTo : MessageHelper.messages["ERROR_PASSWORD_MISMATCH"]},
				optin_18yrs : {required:MessageHelper.messages['EYE_EXAM_ERROR_NOT_18_YEARS_OLD']}
			};
			
			favRegisterParameters.rules = {
					logonId	:{required:true,email:true},
					logonIdVerify : {required:true,email:true,equalTo: "#favModalRegistrationForm input[name=logonId]"},
					logonPassword : {required:true},
					logonPasswordVerify :{required:true,equalTo :'#favModalRegistrationForm input[name=logonPassword]'},
					optin_18yrs : {required:true}
				};
			favRegisterParameters.messages = {
					logonId	:{required:MessageHelper.messages["ERROR_Logon_model_EmailEmpty"],email:MessageHelper.messages['ERROR_Logon_model_EmailInvalid']},
					logonIdVerify : {required:MessageHelper.messages['ERROR_LOGON_MODEL_EMAIL_CONFIRM'],email:MessageHelper.messages['ERROR_LOGON_MODEL_EMAIL_CONFIRM'],equalTo: MessageHelper.messages['ERROR_EMAIL_MISMATCH']},
					logonPassword : {required:MessageHelper.messages['ERROR_PASSWORD_ENTER']},
					logonPasswordVerify :{required:MessageHelper.messages['ERROR_PASSWORD_RE_ENTER'],equalTo : MessageHelper.messages["ERROR_PASSWORD_MISMATCH"]},
					optin_18yrs : {required:MessageHelper.messages['EYE_EXAM_ERROR_NOT_18_YEARS_OLD']}
				};
			
			modalLogonParameters.rules = {
					logonId	:{required:true,email:true},
					logonPassword : {required:true}};
			modalLogonParameters.messages = {
					logonId	:{required:MessageHelper.messages['ERROR_Logon_model_EmailInvalid']},
					logonPassword : {required:MessageHelper.messages['ERROR_PASSWORD_ENTER']}};
			
			
			// add the submit handlers
			modalLogonParameters.submitHandler = AccountModalsJS.logonFormSubmit;
			examRegisterParameters.submitHandler = window.registerFormSubmit;
			favRegisterParameters.submitHandler = window.registerFormSubmit;
			
			// use global parameters to validate the logon modal 
			$('#modalLoginForm').validate(modalLogonParameters);
			$('#modalRegistrationForm').validate(examRegisterParameters);
			
			//Handle validation for favorites modal
			$('#favoriteSignInModal').find('#modalLoginForm').validate(modalLogonParameters);
			$('#favModalRegistrationForm').validate(favRegisterParameters);
			
			$('#modalRegistrationForm').find('input[type="checkbox"]').on('keyup', function(e){
				if(e.keyCode == 13){
					registerFormSubmit($(this).closest('form'));
				}
			});
		}, // end setupRegistrationValidation
		showLoginModal : function(){
			var signInModal = $('#signInModal');
			$('#registerSection, #signInLink, #ForgotPasswordSection').hide();				
			$('.createAccountModalLink, #examSignInSection, #signInSection').show();
			
			signInModal.dialog('open');				
			$('#signInEmail').focus();				
			$('#ui-dialog-title-examSignInModal').remove();
		} // end showLoginModal
		
}
