LogonForm={ajaxMyAccountEnabled:"false",SubmitAjaxLogin:function(form){var ajaxValid=$(form).valid();if(ajaxValid){CheckoutHelperJS.ajaxLogonService(form)}},prepareSubmit:function(form,elements){if(form.sendMeEmail&&form.sendMeEmail.checked){form.receiveEmail.value=true;form.account.value=form.logonId.value;form.optinStatus.value=1}else{form.receiveEmail.value=false;form.account.value=form.logonId.value;form.optinStatus.value=0}if(form.sendMeSMSNotification&&form.sendMeSMSNotification.checked){form.receiveSMSNotification.value=true}else{form.receiveSMSNotification.value=false}if(form.sendMeSMSPreference&&form.sendMeSMSPreference.checked){form.receiveSMS.value=true}else{form.receiveSMS.value=false}if(form.mobileDeviceEnabled!=null&&form.mobileDeviceEnabled.value=="true"){if(!MyAccountDisplay.validateMobileDevice(form)){return}}if(form.birthdayEnabled!=null&&form.birthdayEnabled.value=="true"){if(!MyAccountDisplay.validateBirthday(form)){return}}if(elements!=undefined){if(elements.length!=0){$.each(elements,function(i,v){v.val($.trim(v.val()))})}}var isValid=$(form).valid();if(constants.ajaxParams.country=="AU"){if(form.birthdayEnabled!=null&&form.birthdayEnabled.value=="true"){if($("#WC_PersonalInfoExtension_birth_year").val()!="0"||$("#WC_PersonalInfoExtension_birth_month").val()!="0"||$("#WC_PersonalInfoExtension_birth_date").val()!="0"){}}}if(isValid){form.submit()}else{return false}},setAjaxVar:function(temp){this.ajaxMyAccountEnabled=temp},getAjaxVar:function(){return(this.ajaxMyAccountEnabled)},validateAge:function(form){var birth_year=parseInt(form.birth_year.value);var birth_month=parseInt(form.birth_month.value);var birth_date=parseInt(form.birth_date.value);if(birth_year==0||birth_month==0||birth_date==0){return}var curr_year=parseInt(form.curr_year.value);var curr_month=parseInt(form.curr_month.value);var curr_date=parseInt(form.curr_date.value);if((curr_year-birth_year)<13){alert(MessageHelper.messages.AGE_WARNING_ALERT)}else{if((curr_year-birth_year)==13){if(curr_month<birth_month){alert(MessageHelper.messages.AGE_WARNING_ALERT)}else{if((curr_month==birth_month)&&(curr_date<birth_date)){alert(MessageHelper.messages.AGE_WARNING_ALERT)}}}}},checkAge:function(form){if(form.age.value==1){alert(MessageHelper.messages.AGE_WARNING_ALERT)}},prepareSubmitAjaxRegForm:function(form,elements){$("#optin_18yrs").prop("checked",true);if(globalCountry=="ZA"){var ageVerification=$("#optin_18yrs_checkBox").attr("class");if(ageVerification=="icon redesignIcons-radio"){$("#AjaxUserRegistrationErrorMessage").show();$("#AjaxUserRegistrationErrorMessage").html("Please certify that you are 18 years old or older");return}}if(form.sendMeEmail&&form.sendMeEmail.checked){form.receiveEmail.value=true;form.account.value=form.logonId.value;form.optinStatus.value=1}else{form.receiveEmail.value=false;form.account.value=form.logonId.value;form.optinStatus.value=0}if(form.sendMeSMSNotification&&form.sendMeSMSNotification.checked){form.receiveSMSNotification.value=true}else{form.receiveSMSNotification.value=false}if(form.sendMeSMSPreference&&form.sendMeSMSPreference.checked){form.receiveSMS.value=true}else{form.receiveSMS.value=false}if(form.mobileDeviceEnabled!=null&&form.mobileDeviceEnabled.value=="true"){if(!MyAccountDisplay.validateMobileDevice(form)){return}}if(form.birthdayEnabled!=null&&form.birthdayEnabled.value=="true"){if(!MyAccountDisplay.validateBirthday(form)){return}}if(elements!=undefined){if(elements.length!=0){$.each(elements,function(i,v){v.val($.trim(v.val()))})}}var isValid=$(form).valid();if(constants.ajaxParams.country=="AU"){if(form.birthdayEnabled!=null&&form.birthdayEnabled.value=="true"){if($("#WC_PersonalInfoExtension_birth_year").val()!="0"||$("#WC_PersonalInfoExtension_birth_month").val()!="0"||$("#WC_PersonalInfoExtension_birth_date").val()!="0"){if(!isValidDate(form)){$(".select-wrapper.date").addClass("required");$('<span class="required">Please enter a valid date</span>').insertAfter("#WC_UserRegistrationAddForm_div_54");isValid=false}}}}if(isValid){return true}else{return false}}};