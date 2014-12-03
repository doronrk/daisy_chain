var customValidators={passwordGroupReq:function(field){var fieldValue=$(field).val();var isValid=true;if(fieldValue==''){$('.passwordGroupReq').each(function(){var pgrValue=$(this).val();if(pgrValue!=''){isValid=false;}});}
return isValid;},creditCardSecurityCode:function(field){var creditCardNumber=$('#creditCardNumber').val();var isValid=true;if(returnCardType(creditCardNumber)=='American'){isValid=validateRegex(field,'amexCVV');}else{isValid=validateRegex(field,'regCVV');}
return isValid},creditcard:function(field){var creditCardNumber=$(field).val();while(creditCardNumber.indexOf(' ')>0){creditCardNumber=creditCardNumber.replace(' ','');}
$(field).val(creditCardNumber);return validateRegex(field,'creditcard');},changePasswordConfirm:function(field){var newPassword=$('#newPasswordField').val();var confirmPassword=$(field).val();return newPassword==confirmPassword;},greaterThanZero:function(field){var fieldValue=$(field).val();try{var intFieldValue=parseInt(fieldValue);return(fieldValue>0)}catch(e){return false;}},notDefault:function(field){var fieldValue=$(field).val();var defaultValue=$(field).attr('title');return fieldValue!=defaultValue;},confirmMatch:function(field){var fieldValue=$(field).val();var matchId=$(field).attr('confField');var matchValue=$('#'+ matchId).val();return fieldValue==matchValue;},telephone:function(field){var fieldValue=$(field).val();var strippedFieldValue=fieldValue.replace(/[^0-9]/g,'');if(strippedFieldValue.length!=10){if(strippedFieldValue==0){if($(field).is('.req')){return false;}else{$(field).val('');return true;}}else{return false;}}else{var digits=strippedFieldValue.split('');var newFieldValue='('+ digits[0]+ digits[1]+ digits[2]+') '+ digits[3]+ digits[4]+ digits[5]+'-'+ digits[6]+ digits[7]+ digits[8]+ digits[9];$(field).val(newFieldValue);return true;}},telephone1:function(field){var fieldValue=$(field).val();var strippedFieldValue=fieldValue.replace(/[^0-9]/g,'');if(!(strippedFieldValue.length==11||strippedFieldValue.length==12)){if(strippedFieldValue==0){if($(field).is('.req')){return false;}else{$(field).val('');return true;}}else{return false;}}else{$(field).val(strippedFieldValue);return true;}},zipPostalCode:function(field){var fieldValue=$(field).val();var fieldValue=fieldValue.toUpperCase();var strippedFieldValue=fieldValue.replace(/[^0-9A-Z]/g,'');if(strippedFieldValue.length==5){$(field).val(strippedFieldValue);var isValid=validateRegex(field,'zip');return isValid;}else if(strippedFieldValue.length==6){var digits=strippedFieldValue.split('');var newFieldValue=digits[0]+ digits[1]+ digits[2]+' '+ digits[3]+ digits[4]+ digits[5];$(field).val(newFieldValue);var isValid=validateRegex(field,'postalCode');return isValid;}else{if(strippedFieldValue==0){if($(field).is('.req')){return false;}else{$(field).val('');return true;}}else{return false;}}},postalCode:function(field){var fieldValue=$(field).val();var fieldValue=fieldValue.toUpperCase();var strippedFieldValue=fieldValue.replace(/[^0-9A-Z]/g,'');if(strippedFieldValue.length!=6){if(strippedFieldValue==0){if($(field).is('.req')){return false;}else{$(field).val('');return true;}}else{return false;}}else{var digits=strippedFieldValue.split('');var newFieldValue=digits[0]+ digits[1]+ digits[2]+' '+ digits[3]+ digits[4]+ digits[5];$(field).val(newFieldValue);var isValid=validateRegex(field,'postalCode');return isValid;}},zip:function(field){var fieldValue=$(field).val();var strippedFieldValue=fieldValue.replace(/[^-0-9]/g,'');if(strippedFieldValue==0){if($(field).is('.req')){return false;}else{$(field).val('');return true;}}else{$(field).val(strippedFieldValue);var isValid=validateRegex(field,'zip');return isValid;}},email:function(field){var fieldValue=$(field).val();$(field).val(fieldValue.toLowerCase());return validateRegex(field,'email');}};var validationTypeArr=new Array('onlyText','onlyNumbers','email_conf','password_conf','password','datePicker');var ValidationRegexObj={email:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,onlyText:/^([^0-9]*)$/,onlyNumbers:/^\d+$/,password:/((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!\s).{6,})/,telephone:/^(\()?([0-9]{3})(\)|-)?([0-9]{3})(-)?([0-9]{4}|[0-9]{4})$/,zipPostalCode:/(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/i,zip:/^\d{5}(-\d{4})?$/i,postalCode:/(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/i,creditcard:/(^4[0-9]{12}(?:[0-9]{3})?$)|(^5[1-5][0-9]{14}$)|(^3[47][0-9]{13}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)/,datePicker:/((\d{2})|(\d))\/((\d{2})|(\d))\/((\d{4})|(\d{2}))/,amexCVV:/^\d{4}$/,regCVV:/^\d{3}$/};function validateField(field){var isValid=true;var failedHow=null;var hasValidation=false;var fieldVal=$(field).val();$(field).val($.trim(fieldVal));if(isValid){for(var x=0;x<validationTypeArr.length;x++){var className=validationTypeArr[x];if($(field).hasClass(className)){hasValidation=true;isValid=validateRegex(field,className);if(!isValid){failedHow=className;break;}}}}
if(isValid){var classes=$(field).attr('class');if(classes!=null&&classes.length>0){var classList=classes.split(/\s+/)
for(var x=0;x<classList.length;x++){var className=classList[x];var validator=customValidators[className];if(validator){isValid=validator(field);failedHow=className;if(!isValid){break;}}}}}
if(isValid){if($(field).hasClass('req')){hasValidation=true;if(field.type=='radio'||field.type=='checkbox'){var fieldName=$(field).attr('name');var selected=$('input[name="'+fieldName+'"]:checked');isValid=selected.length>0;}else if($(field).val().length==0){isValid=false;failedHow='req'}}}
if(!isValid){handleFieldValidationFailed(field,failedHow);}else if(isValid&&hasValidation){handleFieldValidationSuccess(field);}
if(postFieldValidationMethod){postFieldValidationMethod();}
return isValid;}
function handleFieldValidationFailed(field,failedHow){if($(field).attr('validationHandler')){var vhFunctionName=$(field).attr('validationHandler');vhFunctionName=vhFunctionName+'(field, failedHow)';eval(vhFunctionName);}else{var fieldId=field.id;var blockElement='#'+fieldId;var messageKey=fieldId+'_'+ failedHow;var messageNodeName=fieldId+'_message';var iconNodeName=fieldId+'_icon';var errorMessage=message[messageKey];if(!errorMessage){errorMessage=message[fieldId];}
if(!errorMessage){errorMessage=message[failedHow];}
var messageNode=$('#'+ messageNodeName);var iconNode=$('#'+ iconNodeName);if(iconNode.length>0){$(iconNode).removeClass('valid');$(iconNode).addClass('invalid');}else{$('<div id="'+iconNodeName+'" class="validation_icon invalid"></div>').insertAfter(blockElement);iconNode=$('#'+ iconNodeName);}
if(messageNode.length>0){$(messageNode).html(errorMessage);}else{$('<div id="'+messageNodeName+'" class="validation_message">'+ errorMessage+'</div>').insertAfter('#'+iconNodeName);messageNode=$('#'+ messageNodeName);}
$(field).removeClass('valid');$(field).addClass('invalid');}}
function handleFieldValidationSuccess(field){var fieldId=field.id;var blockElement='#'+fieldId;var messageNodeName=fieldId+'_message';var iconNodeName=fieldId+'_icon';var messageNode=$('#'+ messageNodeName);var iconNode=$('#'+ iconNodeName);if(iconNode.length>0){$(iconNode).removeClass('invalid');$(iconNode).addClass('valid');}else{$('<div id="'+iconNodeName+'" class="validation_icon valid"></div>').insertAfter(blockElement);iconNode=$('#'+ iconNodeName);}
if(messageNode.length>0){$(messageNode).remove();}
$(field).removeClass('invalid');$(field).addClass('valid');}
function validateForm(form){if(!form.nodeName||form.nodeName.toLowerCase()!='form'){form=form[0];}
var formId=form.id;var $inputs=$('#'+ formId+' :input:visible');var isValid=true;$inputs.each(function(){isValid=isValid&validateField(this);})
if(formId=='optimalPaymentsSilentPostForm'){var currentTime=new Date();var currYear=currentTime.getFullYear();var inputYear=$('#expirationYear :selected').text();var inputMonth=$('#expirationMonth :selected').val();if(inputYear!=null&&inputYear!='Year'&&inputMonth!=null&&inputMonth!=''){if(!((inputYear>currYear)||(inputYear==currYear&&inputMonth>currentTime.getMonth()))){handleFieldValidationFailed(document.getElementById('expirationMonth'),'exp');handleFieldValidationFailed(document.getElementById('expirationYear'),'exp');isValid=false;}}}else if(formId=='subscribeForm'){var inputYear=$('#yearSelect :selected').val();var inputMonth=$('#monthSelect :selected').val();var inputDay=$('#daySelect :selected').val();if(inputYear!=null&&inputYear!=''&&inputMonth!=null&&inputMonth!=''&&inputDay!=null&&inputDay!=''){var birthDate=new Date();birthDate.setFullYear(inputYear,(inputMonth- 1),inputDay);var eligibilityDate=new Date();eligibilityDate.setFullYear(eligibilityDate.getFullYear()- 14);if(eligibilityDate<birthDate){if($('#currSiteId').val().match('garage')){handleFieldValidationFailed(document.getElementById('yearSelect'),'ageLimitGrg');handleFieldValidationFailed(document.getElementById('monthSelect'),'ageLimitGrg');handleFieldValidationFailed(document.getElementById('daySelect'),'ageLimitGrg');}else{handleFieldValidationFailed(document.getElementById('yearSelect'),'ageLimit');handleFieldValidationFailed(document.getElementById('monthSelect'),'ageLimit');handleFieldValidationFailed(document.getElementById('daySelect'),'ageLimit');}
isValid=false;}}}
$(form).find(".validation_message:first").show();return isValid;}
function validateRating(ratingId,controller){var rating=$(ratingId).val();if(rating==''||rating=='0'){$(controller).addClass('invalid');return false;}else{$(controller).removeClass('invalid');return true;}}
function validateRegex(field,ruleName){var inputValue=$(field).val();var regex=ValidationRegexObj[ruleName];if(regex!=null&&inputValue!=''){var result=regex.test(inputValue);return result;}else return true;}
function postFieldValidationMethod(){jQuery.colorbox.resize();}
$(document).ready(function(){$(document).on('mouseenter','input.invalid, select.invalid, textarea.invalid, div#myNewsletters2.invalid, div#myNewslettersSms.invalid, form.invalid',function(){$('.validation_message').hide();var fieldId=this.id;var messageId=fieldId+'_message';$('#'+ messageId).show();});$(document).on('mouseleave','input.invalid, select.invalid, textarea.invalid, div#myNewsletters2.invalid, div#myNewslettersSms.invalid, form.invalid',function(){var fieldId=this.id;var messageId=fieldId+'_message';$('#'+ messageId).stop().hide();});})